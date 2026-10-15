// 编曲工作台 · 灵感库 —— 客户端入口源码。
// 构建产物是自包含的单文件模块（见 scripts/build.mjs），
// 通过 desktopWorkbenches.register 注册业务面板；会话创建、归属登记与恢复由宿主完成。
import { css } from './styles.js'

// 本地身份：本工作台只在本机使用，不发布、不投稿。
const REPOSITORY = 'https://github.com/cinderzhan/bianqu-workbench'

window.__ModuleLoader__.load({
  id: 'dsh-bianqu-workbench',
  factory: (require) => {
    const React = require('react')

    const TYPE_LABELS = {
      melody: '旋律动机',
      chord: '和声走向',
      lyric: '歌词片段',
      rhythm: '节奏型',
      other: '其他',
    }
    const TYPE_ORDER = ['melody', 'chord', 'lyric', 'rhythm', 'other']

    async function api(path, options) {
      const response = await fetch(path, options)
      const result = await response.json().catch(() => ({}))
      if (!response.ok) {
        const error = new Error(result.error || `请求失败（HTTP ${response.status}）`)
        error.status = response.status
        throw error
      }
      return result
    }

    // ── 开场草稿：只是把文字预填进输入框，发送权永远在用户手里。────────────
    let bridge = null
    let pendingDraft = null
    let draftTimer = null

    function fillDraft(sessionId, text) {
      const actx = bridge?.sessions?.scope?.(sessionId)
      const conversation = actx?.get?.('conversation')
      if (!conversation) throw new Error('对话输入不可用')
      const input = conversation.input.for(actx)
      const current = input.state.getSnapshot().draft || ''
      input.setDraft(current.trim() ? `${current}\n\n${text}` : text)
    }

    function queueDraft(sessionId, text) {
      pendingDraft = { sessionId, text, tries: 0 }
      const attempt = () => {
        if (!pendingDraft) return
        try {
          fillDraft(pendingDraft.sessionId, pendingDraft.text)
          pendingDraft = null
        } catch {
          pendingDraft.tries += 1
          if (pendingDraft.tries < 6) draftTimer = setTimeout(attempt, 1500)
        }
      }
      clearTimeout(draftTimer)
      attempt()
    }

    function ideaPrompt(idea) {
      const meta = [
        idea.musicalKey ? `调式：${idea.musicalKey}` : '',
        idea.tempo ? `速度：${idea.tempo} BPM` : '',
      ].filter(Boolean).join('　')
      return [
        `我在编曲工作台里记了一条「${TYPE_LABELS[idea.type] || '灵感'}」，帮我把它发展成具体的编曲思路：`,
        '',
        idea.title ? `标题：${idea.title}` : '',
        meta,
        idea.tags.length ? `标签：${idea.tags.join('、')}` : '',
        '',
        idea.content,
        '',
        '请给出：段落结构建议、和声/织体安排、配器与音色方向，以及下一步可以先做什么。',
      ].filter((line) => line !== '').join('\n')
    }

    // ── 编辑弹层 ─────────────────────────────────────────────────
    function IdeaEditor({ initial, busy, onSave, onClose }) {
      const [type, setType] = React.useState(initial?.type || 'melody')
      const [title, setTitle] = React.useState(initial?.title || '')
      const [content, setContent] = React.useState(initial?.content || '')
      const [tags, setTags] = React.useState((initial?.tags || []).join('，'))
      const [musicalKey, setMusicalKey] = React.useState(initial?.musicalKey || '')
      const [tempo, setTempo] = React.useState(initial?.tempo ? String(initial.tempo) : '')
      const [error, setError] = React.useState('')

      React.useEffect(() => {
        const onKey = (event) => { if (event.key === 'Escape') onClose() }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
      }, [onClose])

      const submit = async () => {
        setError('')
        try {
          await onSave({
            type,
            title: title.trim(),
            content: content.trim(),
            tags,
            musicalKey: musicalKey.trim(),
            tempo: tempo.trim() === '' ? null : tempo.trim(),
          })
        } catch (cause) {
          setError(cause instanceof Error ? cause.message : String(cause))
        }
      }

      return (
        <div className="bq-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
          <div className="bq-dialog" role="dialog" aria-modal="true" aria-label={initial ? '编辑灵感' : '记一条灵感'}>
            <h2>{initial ? '编辑灵感' : '记一条灵感'}</h2>
            <div className="bq-field">
              <label>类型</label>
              <div className="bq-type-row" role="group" aria-label="类型">
                {TYPE_ORDER.map((value) => (
                  <button
                    key={value} type="button" className="bq-chip" data-on={type === value ? 'true' : 'false'}
                    aria-pressed={type === value} onClick={() => setType(value)}
                  >{TYPE_LABELS[value]}</button>
                ))}
              </div>
            </div>
            <div className="bq-field">
              <label htmlFor="bq-edit-title">标题</label>
              <input
                id="bq-edit-title" value={title} maxLength={80} autoFocus
                placeholder="例如：雨夜 synthwave 副歌动机"
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
            <div className="bq-field">
              <label htmlFor="bq-edit-content">内容</label>
              <textarea
                id="bq-edit-content" value={content}
                placeholder="简谱、音名、和弦级数、歌词片段、画面感……想到什么写什么"
                onChange={(event) => setContent(event.target.value)}
              />
            </div>
            <div className="bq-field-row">
              <div className="bq-field">
                <label htmlFor="bq-edit-key">调式（可选）</label>
                <input
                  id="bq-edit-key" value={musicalKey} maxLength={24} placeholder="如 C 大调 / a 小调"
                  onChange={(event) => setMusicalKey(event.target.value)}
                />
              </div>
              <div className="bq-field">
                <label htmlFor="bq-edit-tempo">速度 BPM（可选）</label>
                <input
                  id="bq-edit-tempo" value={tempo} inputMode="numeric" placeholder="20–300"
                  onChange={(event) => setTempo(event.target.value)}
                />
              </div>
            </div>
            <div className="bq-field">
              <label htmlFor="bq-edit-tags">标签（可选，用逗号或空格分隔）</label>
              <input
                id="bq-edit-tags" value={tags} placeholder="如 副歌，lofi，夜色"
                onChange={(event) => setTags(event.target.value)}
              />
            </div>
            {error ? <div className="bq-notice" role="alert">{error}</div> : null}
            <div className="bq-dialog-acts">
              <button type="button" className="bq-btn" onClick={onClose}>取消</button>
              <button type="button" className="bq-btn" data-primary="true" disabled={busy} onClick={submit}>
                {busy ? '保存中…' : '保存'}
              </button>
            </div>
          </div>
        </div>
      )
    }

    // ── 单张灵感卡片 ─────────────────────────────────────────────
    function IdeaCard({ idea, onEdit, onArchive, onRemove, onAsk, confirming, busy }) {
      const meta = [
        idea.musicalKey,
        idea.tempo ? `${idea.tempo} BPM` : '',
        `更新于 ${idea.updatedAt.slice(0, 10)}`,
      ].filter(Boolean)
      return (
        <article className="bq-card">
          <div className="bq-card-top">
            <span className="bq-badge" data-type={idea.type}>{TYPE_LABELS[idea.type] || '其他'}</span>
            <h3 className="bq-card-title">{idea.title || '（无标题）'}</h3>
          </div>
          {idea.content ? <p className="bq-card-content">{idea.content}</p> : null}
          {idea.tags.length
            ? <div className="bq-card-tags">{idea.tags.map((tag) => <span key={tag} className="bq-tag">#{tag}</span>)}</div>
            : null}
          <div className="bq-card-meta">{meta.map((item) => <span key={item}>{item}</span>)}</div>
          <div className="bq-card-acts">
            <button type="button" className="bq-act" onClick={() => onAsk(idea)}>问问 AI</button>
            <button type="button" className="bq-act" onClick={() => onEdit(idea)}>编辑</button>
            <button type="button" className="bq-act" onClick={() => onArchive(idea)}>{idea.archived ? '恢复' : '归档'}</button>
            <button type="button" className="bq-act" data-danger="true" disabled={busy} onClick={() => onRemove(idea)}>
              {confirming ? '再点一次确认删除' : '删除'}
            </button>
          </div>
        </article>
      )
    }

    // ── 业务面板：整页灵感库 + 按需 AI 对话 ───────────────────────
    function BusinessPanel({ service, conversation }) {
      const [ideas, setIdeas] = React.useState([])
      const [allTags, setAllTags] = React.useState([])
      const [loading, setLoading] = React.useState(true)
      const [error, setError] = React.useState('')
      const [query, setQuery] = React.useState('')
      const [debouncedQuery, setDebouncedQuery] = React.useState('')
      const [typeFilter, setTypeFilter] = React.useState('')
      const [tagFilter, setTagFilter] = React.useState('')
      const [showArchived, setShowArchived] = React.useState(false)
      const [editing, setEditing] = React.useState(null)   // null | 'new' | idea
      const [drawerOpen, setDrawerOpen] = React.useState(false)
      const [busy, setBusy] = React.useState(false)
      const [confirmId, setConfirmId] = React.useState('')
      const [toast, setToast] = React.useState('')
      const pendingAskRef = React.useRef(null)

      // 跟踪宿主当前会话：抽屉里的原生会话区只在有本工作台会话时才有内容。
      const [sessionId, setSessionId] = React.useState(() => { try { return service.currentSession() || '' } catch { return '' } })
      React.useEffect(() => {
        const list = service.ctx?.sessions?.list
        if (!list?.subscribe) return
        const update = () => { try { setSessionId(service.currentSession() || '') } catch { /* 忽略 */ } }
        update()
        return list.subscribe(update)
      }, [service])

      React.useEffect(() => {
        if (!toast) return
        const timer = setTimeout(() => setToast(''), 2600)
        return () => clearTimeout(timer)
      }, [toast])
      const showToast = setToast

      React.useEffect(() => {
        const timer = setTimeout(() => setDebouncedQuery(query.trim()), 250)
        return () => clearTimeout(timer)
      }, [query])

      React.useEffect(() => {
        const controller = new AbortController()
        setLoading(true)
        const params = new URLSearchParams()
        if (debouncedQuery) params.set('q', debouncedQuery)
        if (typeFilter) params.set('type', typeFilter)
        if (tagFilter) params.set('tag', tagFilter)
        if (showArchived) params.set('archived', '1')
        api(`/api/bianqu-workbench/ideas${params.size ? `?${params}` : ''}`, { signal: controller.signal })
          .then((result) => { setIdeas(result.ideas); setAllTags(result.tags); setError('') })
          .catch((cause) => { if (!controller.signal.aborted) setError(cause instanceof Error ? cause.message : String(cause)) })
          .finally(() => { if (!controller.signal.aborted) setLoading(false) })
        return () => controller.abort()
      }, [debouncedQuery, typeFilter, tagFilter, showArchived])

      const reload = React.useCallback(async () => {
        const params = new URLSearchParams()
        if (debouncedQuery) params.set('q', debouncedQuery)
        if (typeFilter) params.set('type', typeFilter)
        if (tagFilter) params.set('tag', tagFilter)
        if (showArchived) params.set('archived', '1')
        try {
          const result = await api(`/api/bianqu-workbench/ideas${params.size ? `?${params}` : ''}`)
          setIdeas(result.ideas)
          setAllTags(result.tags)
          setError('')
        } catch (cause) {
          setToast(cause instanceof Error ? cause.message : String(cause))
        }
      }, [debouncedQuery, typeFilter, tagFilter, showArchived])

      const save = async (fields) => {
        setBusy(true)
        try {
          if (editing === 'new') {
            await api('/api/bianqu-workbench/ideas', {
              method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(fields),
            })
            setToast('已记下这条灵感')
          } else if (editing && editing.id) {
            await api('/api/bianqu-workbench/ideas/update', {
              method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ...fields, id: editing.id }),
            })
            setToast('已保存修改')
          }
          setEditing(null)
          await reload()
        } finally {
          setBusy(false)
        }
      }

      const toggleArchive = async (idea) => {
        setBusy(true)
        try {
          await api('/api/bianqu-workbench/ideas/update', {
            method: 'POST', headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ id: idea.id, archived: !idea.archived }),
          })
          setToast(idea.archived ? '已恢复到灵感库' : '已归档')
          await reload()
        } catch (cause) {
          setToast(cause instanceof Error ? cause.message : String(cause))
        } finally {
          setBusy(false)
        }
      }

      const remove = async (idea) => {
        if (confirmId !== idea.id) {
          setConfirmId(idea.id)
          setTimeout(() => setConfirmId((current) => (current === idea.id ? '' : current)), 3000)
          return
        }
        setConfirmId('')
        setBusy(true)
        try {
          await api('/api/bianqu-workbench/ideas/remove', {
            method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id: idea.id }),
          })
          setToast('已删除')
          await reload()
        } catch (cause) {
          setToast(cause instanceof Error ? cause.message : String(cause))
        } finally {
          setBusy(false)
        }
      }

      // 「问问 AI」：打开抽屉；还没有本工作台会话时先引导创建，草稿在会话就绪后预填。
      const ask = async (idea) => {
        setDrawerOpen(true)
        if (idea) pendingAskRef.current = ideaPrompt(idea)
        if (sessionId) {
          if (pendingAskRef.current) {
            queueDraft(sessionId, pendingAskRef.current)
            pendingAskRef.current = null
          }
          return
        }
        try {
          await service.run(service.newSession())
        } catch (cause) {
          setToast(cause instanceof Error ? cause.message : String(cause))
        }
      }

      // 会话创建成功后补填待发草稿。
      React.useEffect(() => {
        if (sessionId && pendingAskRef.current) {
          queueDraft(sessionId, pendingAskRef.current)
          pendingAskRef.current = null
        }
      }, [sessionId])

      const typeChip = (value, label) => (
        <button
          key={value || 'all'} type="button" className="bq-chip" data-on={(typeFilter === value) ? 'true' : 'false'}
          aria-pressed={typeFilter === value}
          onClick={() => setTypeFilter(typeFilter === value ? '' : value)}
        >{label}</button>
      )

      const filtered = !(showArchived || debouncedQuery || typeFilter || tagFilter)

      return (
        <div className="bq-root">
          <header className="bq-toolbar" data-dsh-workbench-toolbar="">
            <div className="bq-title">
              <h1>灵感库</h1>
              <small>编曲工作台</small>
            </div>
            <div className="bq-search">
              <input
                type="search" value={query} placeholder="搜索灵感、标签、调式…"
                aria-label="搜索灵感" onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <div className="bq-toolbar-acts">
              <button type="button" className="bq-btn" onClick={() => ask(null)} aria-expanded={drawerOpen}>AI 编曲助手</button>
              <button type="button" className="bq-btn" data-primary="true" onClick={() => setEditing('new')}>＋ 记一条</button>
            </div>
          </header>
          <div className="bq-filters">
            {typeChip('', '全部')}
            {TYPE_ORDER.map((value) => typeChip(value, TYPE_LABELS[value]))}
            {allTags.slice(0, 8).map(({ tag, count }) => (
              <button
                key={tag} type="button" className="bq-chip" data-on={tagFilter === tag ? 'true' : 'false'}
                aria-pressed={tagFilter === tag} title={`${count} 条`}
                onClick={() => setTagFilter(tagFilter === tag ? '' : tag)}
              >#{tag}</button>
            ))}
            <span className="bq-sep" />
            <button
              type="button" className="bq-chip" data-on={showArchived ? 'true' : 'false'}
              aria-pressed={showArchived} onClick={() => setShowArchived(!showArchived)}
            >{showArchived ? '查看使用中' : '已归档'}</button>
            <span className="bq-count">{loading ? '读取中…' : `${ideas.length} 条`}</span>
          </div>
          {error ? <div className="bq-notice" role="alert">{error}</div> : null}
          <main className="bq-main">
            {!loading && ideas.length === 0
              ? (
                <div className="bq-empty">
                  <span className="bq-mark" aria-hidden="true">♪</span>
                  <strong>{filtered ? '还没有记下任何灵感' : '没有找到符合条件的灵感'}</strong>
                  <p>
                    {filtered
                      ? '旋律动机、和声走向、歌词片段……随手记下来，编曲时翻一翻。'
                      : '换个关键词或筛选条件试试。'}
                  </p>
                  {filtered
                    ? <button type="button" className="bq-btn" data-primary="true" onClick={() => setEditing('new')}>记第一条</button>
                    : null}
                </div>
              )
              : (
                <div className="bq-grid">
                  {ideas.map((idea) => (
                    <IdeaCard
                      key={idea.id} idea={idea} busy={busy}
                      confirming={confirmId === idea.id}
                      onEdit={(item) => setEditing(item)}
                      onArchive={toggleArchive}
                      onRemove={remove}
                      onAsk={ask}
                    />
                  ))}
                </div>
              )}
          </main>
          <aside className="bq-drawer" data-open={drawerOpen ? 'true' : 'false'} aria-label="AI 编曲助手" aria-hidden={!drawerOpen}>
            <div className="bq-drawer-head">
              <h2>AI 编曲助手</h2>
              <button type="button" className="bq-btn" onClick={() => setDrawerOpen(false)}>收起</button>
            </div>
            <div className="bq-drawer-body">
              {sessionId ? null : (
                <div className="bq-ai-tip">
                  <strong>还没有 AI 对话</strong>
                  <p>AI 协助需要一条本工作台的会话。开始对话时，宿主会先请你选择一个文件夹作为工作区；对话只在你确认后才开始。</p>
                  <button
                    type="button" className="bq-btn" data-primary="true"
                    onClick={() => { service.run(service.newSession()).catch((cause) => setToast(cause instanceof Error ? cause.message : String(cause))) }}
                  >开始 AI 对话</button>
                </div>
              )}
              {conversation}
            </div>
          </aside>
          {editing
            ? (
              <IdeaEditor
                initial={editing === 'new' ? null : editing}
                busy={busy}
                onSave={save}
                onClose={() => setEditing(null)}
              />
            )
            : null}
          <div className="bq-toast" data-show={toast ? 'true' : 'false'} role="status">{toast}</div>
        </div>
      )
    }

    function apply(ctx) {
      bridge = { sessions: ctx.sessions }

      ctx.effect(() => {
        const style = document.createElement('style')
        style.dataset.dshPlugin = 'dsh-bianqu-workbench'
        style.textContent = css
        document.head.appendChild(style)
        return () => style.remove()
      }, 'bianqu: styles')

      // 注册业务面板：不提供 id（身份由仓库地址解析）；返回值是注销函数，交给 ctx.effect 管理。
      ctx.effect(() => ctx.desktopWorkbenches.register({
        title: '编曲工作台',
        panelTitle: '灵感库',
        repository: REPOSITORY,
        description: '随手记录旋律动机、和声走向与歌词片段的灵感库，可搜索筛选；需要时再打开 AI 对话继续创作。',
        icon: '♪',
        audience: '编曲创作者',
        category: '音乐',
        customFrame: true,
        headerLayout: 'compact',
      }, BusinessPanel), 'bianqu: register')

      // 会话尚未就绪时没填上的开场草稿：周期性补试，直到填入或插件卸载。
      ctx.effect(() => {
        const timer = setInterval(() => {
          if (!pendingDraft) return
          try {
            fillDraft(pendingDraft.sessionId, pendingDraft.text)
            pendingDraft = null
          } catch { /* 下个周期再试 */ }
        }, 5000)
        return () => { clearInterval(timer); clearTimeout(draftTimer) }
      }, 'bianqu: pending draft retry')
    }

    return { apply, inject: ['desktopWorkbenches', 'sessions'] }
  },
})
