import { test } from 'node:test'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import assert from 'node:assert/strict'
import { createStore, StoreError } from '../dsh/store.js'

async function tempRoot() {
  return mkdtemp(join(tmpdir(), 'bianqu-store-'))
}

test('创建、读取、按条件筛选', async () => {
  const root = await tempRoot()
  try {
    const store = createStore(root)
    const a = await store.create({
      type: 'melody', title: '雨夜副歌动机', content: '6 1 2 3 | 5 - - -，下行解决到主音',
      tags: '副歌，synthwave', musicalKey: 'a 小调', tempo: '92',
    })
    assert.equal(a.type, 'melody')
    assert.deepEqual(a.tags, ['副歌', 'synthwave'])
    assert.equal(a.tempo, 92)

    await store.create({ type: 'chord', title: 'LoFi loop', content: 'ii–V–I–VI，加九音', tags: ['lofi'] })
    await store.create({ type: 'lyric', content: '霓虹把街道拉得很长很长', tags: ['夜色'] })

    assert.equal((await store.list()).length, 3)
    assert.equal((await store.list({ type: 'chord' })).length, 1)
    assert.equal((await store.list({ tag: '夜色' })).length, 1)
    assert.equal((await store.list({ q: 'synthwave 下行' })).length, 1)
    assert.equal((await store.list({ q: '不存在的词' })).length, 0)

    const tags = await store.tags()
    assert.equal(tags.length, 4)
  } finally {
    await rm(root, { recursive: true, force: true })
  }
})

test('更新与归档', async () => {
  const root = await tempRoot()
  try {
    const store = createStore(root)
    const idea = await store.create({ type: 'other', title: '草稿', content: '先记着' })
    const updated = await store.update(idea.id, { title: '改过的标题', tags: ['待定'] })
    assert.equal(updated.title, '改过的标题')
    assert.deepEqual(updated.tags, ['待定'])
    assert.equal(updated.content, '先记着')

    await store.update(idea.id, { archived: true })
    assert.equal((await store.list()).length, 0)
    assert.equal((await store.list({ archived: '1' })).length, 1)
    await store.update(idea.id, { archived: false })
    assert.equal((await store.list()).length, 1)
  } finally {
    await rm(root, { recursive: true, force: true })
  }
})

test('非法输入被拒绝', async () => {
  const root = await tempRoot()
  try {
    const store = createStore(root)
    await assert.rejects(() => store.create({ type: 'nope', title: 'x' }), StoreError)
    await assert.rejects(() => store.create({ type: 'melody' }), StoreError)
    await assert.rejects(() => store.create({ type: 'melody', title: 'x', tempo: 999 }), StoreError)
    await assert.rejects(() => store.update('missing', { title: 'x' }), StoreError)
  } finally {
    await rm(root, { recursive: true, force: true })
  }
})

test('删除后不可再更新；空库读取为空', async () => {
  const root = await tempRoot()
  try {
    const store = createStore(root)
    assert.deepEqual(await store.list(), [])
    const idea = await store.create({ type: 'rhythm', title: '四四拍底鼓反拍军鼓' })
    await store.remove(idea.id)
    assert.deepEqual(await store.list(), [])
    await assert.rejects(() => store.update(idea.id, { title: 'x' }), StoreError)
  } finally {
    await rm(root, { recursive: true, force: true })
  }
})
