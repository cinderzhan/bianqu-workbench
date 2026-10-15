// 界面样式：颜色优先用宿主设计变量（--dsw-alias-*），全部带兜底值。
// 响应式以业务根容器宽度为准（container query），不依赖整窗断点。
export const css = `
.bq-root{position:relative;display:flex;flex-direction:column;height:100%;min-height:0;min-width:0;
  overflow:hidden;container-type:inline-size;box-sizing:border-box;
  color:var(--dsw-alias-label-primary,#17191c);background:var(--dsw-alias-bg-base,#fff);
  font-family:inherit;font-size:13px;line-height:1.6}
.bq-root *,.bq-root *::before,.bq-root *::after{box-sizing:border-box}
.bq-root button,.bq-root input,.bq-root textarea{font-family:inherit;color:inherit;box-sizing:border-box}
.bq-root button{cursor:pointer}
.bq-root button:disabled{opacity:.55;cursor:default}
.bq-root :focus-visible{outline:2px solid var(--dsw-alias-state-business-primary,#5b6cff);outline-offset:2px}

/* ── 顶部工具栏：宿主的紧凑头部约定（data-dsh-workbench-toolbar）── */
.bq-toolbar{flex:none;display:flex;align-items:center;flex-wrap:wrap;gap:8px;
  min-height:48px;padding:6px 16px 6px 16px;
  border-bottom:1px solid var(--dsw-alias-border-l2,#dfe1e4)}
.bq-title{flex:none;display:flex;align-items:baseline;gap:8px;min-width:0}
.bq-title h1{margin:0;font-size:15px;font-weight:650;white-space:nowrap}
.bq-title small{color:var(--dsw-alias-label-tertiary,#8a8e91);font-size:11px;white-space:nowrap}
.bq-search{flex:1 1 160px;min-width:120px;max-width:340px;display:flex}
.bq-search input{width:100%;min-width:0;height:30px;padding:0 10px;font-size:12px;
  border:1px solid var(--dsw-alias-border-l2,#dfe1e4);border-radius:8px;
  background:var(--dsw-alias-bg-layer-1,#fff);outline:0}
.bq-search input:focus{border-color:var(--dsw-alias-state-business-primary,#5b6cff)}
.bq-toolbar-acts{flex:none;display:flex;align-items:center;gap:8px;margin-left:auto}
.bq-btn{height:30px;padding:0 12px;border:1px solid var(--dsw-alias-border-l2,#dfe1e4);border-radius:8px;
  background:var(--dsw-alias-bg-layer-1,#fff);font-size:12px;white-space:nowrap}
.bq-btn:hover{background:var(--dsw-alias-interactive-bg-hover,#f1f2f4)}
.bq-btn[data-primary="true"]{border-color:var(--dsw-alias-state-business-primary,#5b6cff);
  background:var(--dsw-alias-state-business-primary,#5b6cff);color:#fff;font-weight:600}
.bq-btn[data-primary="true"]:hover{filter:brightness(.94);background:var(--dsw-alias-state-business-primary,#5b6cff)}

/* ── 筛选行 ── */
.bq-filters{flex:none;display:flex;align-items:center;gap:6px;flex-wrap:wrap;
  padding:8px 16px;border-bottom:1px solid var(--dsw-alias-border-l2,#dfe1e4)}
.bq-chip{height:26px;padding:0 10px;border:1px solid var(--dsw-alias-border-l2,#dfe1e4);border-radius:999px;
  background:transparent;color:var(--dsw-alias-label-secondary,#6f7578);font-size:11px;white-space:nowrap}
.bq-chip:hover{background:var(--dsw-alias-interactive-bg-hover,#f1f2f4);color:var(--dsw-alias-label-primary,#17191c)}
.bq-chip[data-on="true"]{border-color:var(--dsw-alias-state-business-primary,#5b6cff);
  background:color-mix(in srgb,var(--dsw-alias-state-business-primary,#5b6cff) 12%,transparent);
  color:var(--dsw-alias-state-business-primary,#5b6cff)}
.bq-filters .bq-sep{flex:1}
.bq-count{flex:none;color:var(--dsw-alias-label-tertiary,#8a8e91);font-size:11px;white-space:nowrap}

/* ── 卡片流 ── */
.bq-main{flex:1;min-height:0;overflow-y:auto;overflow-x:hidden;padding:14px 16px 24px}
.bq-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(240px,100%),1fr));gap:12px}
.bq-card{display:flex;flex-direction:column;gap:8px;min-width:0;padding:12px;
  border:1px solid var(--dsw-alias-border-l2,#dfe1e4);border-radius:12px;
  background:var(--dsw-alias-bg-layer-1,#fff)}
.bq-card-top{display:flex;align-items:center;gap:8px;min-width:0}
.bq-badge{flex:none;padding:1px 8px;border-radius:999px;font-size:10px;line-height:18px;white-space:nowrap}
.bq-badge[data-type="melody"]{background:#e8f0ff;color:#3b5bdb}
.bq-badge[data-type="chord"]{background:#f3ecff;color:#7048e8}
.bq-badge[data-type="lyric"]{background:#fff0e8;color:#d9480f}
.bq-badge[data-type="rhythm"]{background:#e6fcf0;color:#0b8a5f}
.bq-badge[data-type="other"]{background:#f1f2f4;color:#6f7578}
.bq-card-title{margin:0;font-size:13px;font-weight:600;min-width:0;overflow-wrap:anywhere}
.bq-card-content{margin:0;font-size:12px;color:var(--dsw-alias-label-secondary,#6f7578);
  overflow-wrap:anywhere;white-space:pre-wrap;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden}
.bq-card-meta{display:flex;flex-wrap:wrap;gap:4px 10px;color:var(--dsw-alias-label-tertiary,#8a8e91);font-size:10px}
.bq-card-tags{display:flex;flex-wrap:wrap;gap:4px}
.bq-tag{padding:0 7px;border-radius:999px;background:var(--dsw-alias-interactive-bg-hover,#f1f2f4);
  color:var(--dsw-alias-label-secondary,#6f7578);font-size:10px;line-height:18px;overflow-wrap:anywhere}
.bq-card-acts{display:flex;flex-wrap:wrap;gap:6px;margin-top:auto;padding-top:4px;
  border-top:1px solid var(--dsw-alias-border-l2,#dfe1e4)}
.bq-act{border:0;background:transparent;padding:3px 6px;border-radius:6px;font-size:11px;
  color:var(--dsw-alias-label-secondary,#6f7578);white-space:nowrap}
.bq-act:hover{background:var(--dsw-alias-interactive-bg-hover,#f1f2f4);color:var(--dsw-alias-label-primary,#17191c)}
.bq-act[data-danger="true"]:hover{background:color-mix(in srgb,var(--dsw-alias-state-error-primary,#d64541) 12%,transparent);
  color:var(--dsw-alias-state-error-primary,#d64541)}

/* ── 空状态与提示 ── */
.bq-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;
  min-height:240px;text-align:center;color:var(--dsw-alias-label-secondary,#6f7578);font-size:12px;line-height:1.8}
.bq-empty .bq-mark{font-size:34px;line-height:1}
.bq-empty strong{color:var(--dsw-alias-label-primary,#17191c);font-size:14px}
.bq-notice{margin:10px 16px 0;padding:8px 12px;border-radius:8px;font-size:12px;
  border:1px solid color-mix(in srgb,var(--dsw-alias-state-error-primary,#d64541) 40%,transparent);
  color:var(--dsw-alias-state-error-primary,#d64541);
  background:color-mix(in srgb,var(--dsw-alias-state-error-primary,#d64541) 8%,transparent)}

/* ── 编辑弹层（限制在工作台区域内）── */
.bq-overlay{position:absolute;inset:0;z-index:20;display:grid;place-items:center;padding:16px;
  background:rgba(20,24,28,.42)}
.bq-dialog{width:min(520px,100%);max-height:100%;overflow-y:auto;padding:16px;border-radius:14px;
  border:1px solid var(--dsw-alias-border-l2,#dfe1e4);background:var(--dsw-alias-bg-layer-1,#fff);
  box-shadow:0 16px 48px rgba(20,24,28,.28);display:flex;flex-direction:column;gap:10px}
.bq-dialog h2{margin:0;font-size:14px}
.bq-field{display:flex;flex-direction:column;gap:4px;min-width:0}
.bq-field label{font-size:11px;color:var(--dsw-alias-label-secondary,#6f7578)}
.bq-field input,.bq-field textarea{width:100%;min-width:0;padding:7px 10px;font-size:12px;
  border:1px solid var(--dsw-alias-border-l2,#dfe1e4);border-radius:8px;background:transparent;outline:0}
.bq-field textarea{min-height:110px;resize:vertical;line-height:1.7}
.bq-field input:focus,.bq-field textarea:focus{border-color:var(--dsw-alias-state-business-primary,#5b6cff)}
.bq-field-row{display:flex;gap:10px;flex-wrap:wrap}
.bq-field-row .bq-field{flex:1;min-width:120px}
.bq-type-row{display:flex;flex-wrap:wrap;gap:6px}
.bq-dialog-acts{display:flex;justify-content:flex-end;gap:8px;margin-top:2px}

/* ── AI 抽屉：右侧滑出，不越过工作台区域 ── */
.bq-drawer{position:absolute;top:0;right:0;bottom:0;z-index:10;width:min(400px,100%);
  display:flex;flex-direction:column;min-width:0;
  border-left:1px solid var(--dsw-alias-border-l2,#dfe1e4);
  background:var(--dsw-alias-bg-base,#fff);box-shadow:-12px 0 32px rgba(20,24,28,.14);
  transition:transform .22s ease,visibility .22s}
.bq-drawer[data-open="false"]{transform:translateX(103%);visibility:hidden}
.bq-drawer-head{flex:none;display:flex;align-items:center;gap:8px;padding:10px 12px;
  border-bottom:1px solid var(--dsw-alias-border-l2,#dfe1e4)}
.bq-drawer-head h2{margin:0;font-size:13px;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.bq-drawer-body{flex:1;min-height:0;display:flex;flex-direction:column}
.bq-drawer-body .bq-ai-tip{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;
  gap:10px;padding:24px;text-align:center;color:var(--dsw-alias-label-secondary,#6f7578);font-size:12px;line-height:1.8}

/* ── 轻提示 ── */
.bq-toast{position:absolute;left:50%;bottom:18px;z-index:30;transform:translate(-50%,6px);
  max-width:min(480px,calc(100% - 32px));padding:8px 14px;border-radius:9px;font-size:12px;
  border:1px solid var(--dsw-alias-border-l2,#dfe1e4);background:var(--dsw-alias-bg-layer-1,#fff);
  box-shadow:0 8px 28px rgba(20,24,28,.2);opacity:0;pointer-events:none;transition:.18s;overflow-wrap:anywhere}
.bq-toast[data-show="true"]{opacity:1;transform:translate(-50%,0)}

/* ── 按业务容器宽度重排 ── */
@container (max-width:720px){
  .bq-toolbar{padding:6px 10px}
  .bq-search{order:3;flex-basis:100%;max-width:none}
  .bq-filters{padding:8px 10px}
  .bq-main{padding:12px 10px 20px}
}
@container (max-width:560px){
  .bq-title small{display:none}
  .bq-drawer{width:100%;border-left:0}
}
`
