// 灵感库存储：一个 JSON 文件承载全部灵感条目，原子写入（临时文件 + rename）。
// 纯逻辑与接口无关，方便用 node:test 直接自测。
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { randomUUID } from 'node:crypto'

export const SCHEMA_VERSION = 1

export const IDEA_TYPES = ['melody', 'chord', 'lyric', 'rhythm', 'other']
export const IDEA_TYPE_LABELS = {
  melody: '旋律动机',
  chord: '和声走向',
  lyric: '歌词片段',
  rhythm: '节奏型',
  other: '其他',
}

const now = () => new Date().toISOString()
const text = (value, max) => String(value ?? '').trim().slice(0, max)

export class StoreError extends Error {
  constructor(message, status = 400) {
    super(message)
    this.status = status
  }
}

function normalizeTags(value) {
  if (value === undefined || value === null) return []
  const list = Array.isArray(value) ? value : String(value).split(/[,，\s]+/)
  const tags = []
  for (const item of list) {
    const tag = text(item, 24)
    if (tag && !tags.includes(tag)) tags.push(tag)
    if (tags.length >= 12) break
  }
  return tags
}

function normalizeTempo(value) {
  if (value === undefined || value === null || value === '') return null
  const bpm = Math.round(Number(value))
  if (!Number.isFinite(bpm)) return null
  if (bpm < 20 || bpm > 300) throw new StoreError('速度（BPM）需要在 20 到 300 之间。')
  return bpm
}

function normalizeFields(input, existing = {}) {
  const type = input.type === undefined ? existing.type : input.type
  if (!IDEA_TYPES.includes(type)) throw new StoreError('未知的灵感类型。')
  const title = input.title === undefined ? existing.title : text(input.title, 80)
  const content = input.content === undefined ? existing.content : text(input.content, 4000)
  if (!title && !content) throw new StoreError('标题和内容至少填一项。')
  return {
    type,
    title,
    content,
    tags: input.tags === undefined ? (existing.tags || []) : normalizeTags(input.tags),
    musicalKey: input.musicalKey === undefined ? (existing.musicalKey || '') : text(input.musicalKey, 24),
    tempo: input.tempo === undefined ? (existing.tempo ?? null) : normalizeTempo(input.tempo),
    archived: input.archived === undefined ? !!existing.archived : !!input.archived,
  }
}

function normalizeIdea(raw) {
  if (!raw || typeof raw !== 'object') return null
  if (typeof raw.id !== 'string' || !raw.id) return null
  if (!IDEA_TYPES.includes(raw.type)) return null
  return {
    id: raw.id,
    type: raw.type,
    title: text(raw.title, 80),
    content: text(raw.content, 4000),
    tags: normalizeTags(raw.tags),
    musicalKey: text(raw.musicalKey, 24),
    tempo: Number.isFinite(raw.tempo) ? raw.tempo : null,
    archived: !!raw.archived,
    createdAt: raw.createdAt || now(),
    updatedAt: raw.updatedAt || raw.createdAt || now(),
  }
}

function matches(idea, { q, type, tag, archived }) {
  if (!!idea.archived !== archived) return false
  if (type && idea.type !== type) return false
  if (tag && !idea.tags.includes(tag)) return false
  if (q) {
    const haystack = [idea.title, idea.content, idea.musicalKey, ...idea.tags, IDEA_TYPE_LABELS[idea.type]]
      .join('\n').toLowerCase()
    const words = q.toLowerCase().split(/\s+/).filter(Boolean)
    if (!words.every((word) => haystack.includes(word))) return false
  }
  return true
}

export function createStore(root) {
  const file = join(root, 'ideas.json')
  // 串行化写操作，避免并发写坏文件。
  let queue = Promise.resolve()
  const enqueue = (task) => {
    const run = queue.then(task, task)
    queue = run.catch(() => {})
    return run
  }

  async function read() {
    let raw
    try {
      raw = await readFile(file, 'utf8')
    } catch (error) {
      if (error && error.code === 'ENOENT') return []
      throw new StoreError('读取灵感库失败。', 500)
    }
    let data
    try {
      data = JSON.parse(raw)
    } catch {
      throw new StoreError('灵感库数据文件损坏，未做任何改动。', 500)
    }
    const list = Array.isArray(data?.ideas) ? data.ideas : []
    return list.map(normalizeIdea).filter(Boolean)
  }

  async function write(ideas) {
    await mkdir(root, { recursive: true })
    const temp = `${file}.${process.pid}.tmp`
    await writeFile(temp, JSON.stringify({ schemaVersion: SCHEMA_VERSION, ideas }, null, 2))
    await rename(temp, file)
  }

  return {
    file,
    async list(filters = {}) {
      const ideas = await read()
      const query = {
        q: text(filters.q, 120),
        type: IDEA_TYPES.includes(filters.type) ? filters.type : '',
        tag: text(filters.tag, 24),
        archived: filters.archived === true || filters.archived === '1' || filters.archived === 'true',
      }
      return ideas
        .filter((idea) => matches(idea, query))
        .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    },
    async tags() {
      const ideas = await read()
      const counts = new Map()
      for (const idea of ideas) {
        if (idea.archived) continue
        for (const tag of idea.tags) counts.set(tag, (counts.get(tag) || 0) + 1)
      }
      return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([tag, count]) => ({ tag, count }))
    },
    create(input) {
      return enqueue(async () => {
        const ideas = await read()
        const fields = normalizeFields(input || {})
        const stamp = now()
        const idea = { id: randomUUID(), ...fields, createdAt: stamp, updatedAt: stamp }
        ideas.push(idea)
        await write(ideas)
        return idea
      })
    },
    update(id, input) {
      return enqueue(async () => {
        const ideas = await read()
        const index = ideas.findIndex((idea) => idea.id === id)
        if (index < 0) throw new StoreError('这条灵感不存在，可能已被删除。', 404)
        const next = { ...ideas[index], ...normalizeFields(input || {}, ideas[index]), updatedAt: now() }
        ideas[index] = next
        await write(ideas)
        return next
      })
    },
    remove(id) {
      return enqueue(async () => {
        const ideas = await read()
        const index = ideas.findIndex((idea) => idea.id === id)
        if (index < 0) throw new StoreError('这条灵感不存在，可能已被删除。', 404)
        ideas.splice(index, 1)
        await write(ideas)
        return { removed: id }
      })
    },
  }
}
