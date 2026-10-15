// 编曲工作台 · 服务端入口：只注册本工作台自己的本机接口（/api/bianqu-workbench/ 前缀），
// 灵感数据写在 cordis.patch.yml 配置的数据目录里，卸载工作台不会删除这些数据。
import Schema from '@deepseek-ai/schemastery'
import { createStore, StoreError } from './store.js'

export const name = 'dsh-bianqu-workbench'
export const inject = ['connection']
export const Config = Schema.object({ root: Schema.string().required() })

const MAX_BODY = 256 * 1024

async function readPayload(request) {
  const contentLength = Number(request.headers.get('content-length'))
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY) throw new StoreError('请求内容过大。', 413)
  const reader = request.body?.getReader()
  if (!reader) throw new StoreError('需要 JSON 请求体。')
  const chunks = []
  let length = 0
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      length += value.length
      if (length > MAX_BODY) {
        await reader.cancel()
        throw new StoreError('请求内容过大。', 413)
      }
      chunks.push(value)
    }
    try {
      return JSON.parse(Buffer.concat(chunks).toString('utf8'))
    } catch {
      throw new StoreError('请求体不是有效的 JSON。')
    }
  } finally {
    reader.releaseLock()
  }
}

const respond = (data, status = 200) =>
  Response.json(data, { status, headers: { 'cache-control': 'no-store' } })

const fail = (error) => respond(
  { error: error instanceof StoreError ? error.message : '灵感库服务暂时不可用。' },
  error instanceof StoreError ? error.status : 500,
)

export function apply(ctx, config) {
  const store = createStore(config.root)

  // 注意：exact 路由按路径唯一注册，同一路径的 GET/POST 合并在一条里按方法分发。
  ctx.connection.fetch.register({
    path: '/api/bianqu-workbench/ideas',
    methods: ['GET', 'POST'],
    requestBody: 'buffered',
    async fetch(request) {
      try {
        if (request.method === 'POST') {
          return respond({ idea: await store.create(await readPayload(request)) }, 201)
        }
        const params = new URL(request.url).searchParams
        const [ideas, tags] = await Promise.all([
          store.list({
            q: params.get('q') || '',
            type: params.get('type') || '',
            tag: params.get('tag') || '',
            archived: params.get('archived') || '',
          }),
          store.tags(),
        ])
        return respond({ ideas, tags })
      } catch (error) {
        return fail(error)
      }
    },
  })

  ctx.connection.fetch.register({
    path: '/api/bianqu-workbench/ideas/update',
    methods: ['POST'],
    requestBody: 'buffered',
    async fetch(request) {
      try {
        const payload = await readPayload(request)
        if (!payload || typeof payload.id !== 'string' || !payload.id) throw new StoreError('缺少要更新的灵感 id。')
        return respond({ idea: await store.update(payload.id, payload) })
      } catch (error) {
        return fail(error)
      }
    },
  })

  ctx.connection.fetch.register({
    path: '/api/bianqu-workbench/ideas/remove',
    methods: ['POST'],
    requestBody: 'buffered',
    async fetch(request) {
      try {
        const payload = await readPayload(request)
        if (!payload || typeof payload.id !== 'string' || !payload.id) throw new StoreError('缺少要删除的灵感 id。')
        return respond(await store.remove(payload.id))
      } catch (error) {
        return fail(error)
      }
    },
  })
}
