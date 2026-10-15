(() => {
  // src/styles.js
  var css = `
.bq-root{position:relative;display:flex;flex-direction:column;height:100%;min-height:0;min-width:0;
  overflow:hidden;container-type:inline-size;box-sizing:border-box;
  color:var(--dsw-alias-label-primary,#17191c);background:var(--dsw-alias-bg-base,#fff);
  font-family:inherit;font-size:13px;line-height:1.6}
.bq-root *,.bq-root *::before,.bq-root *::after{box-sizing:border-box}
.bq-root button,.bq-root input,.bq-root textarea{font-family:inherit;color:inherit;box-sizing:border-box}
.bq-root button{cursor:pointer}
.bq-root button:disabled{opacity:.55;cursor:default}
.bq-root :focus-visible{outline:2px solid var(--dsw-alias-state-business-primary,#5b6cff);outline-offset:2px}

/* \u2500\u2500 \u9876\u90E8\u5DE5\u5177\u680F\uFF1A\u5BBF\u4E3B\u7684\u7D27\u51D1\u5934\u90E8\u7EA6\u5B9A\uFF08data-dsh-workbench-toolbar\uFF09\u2500\u2500 */
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

/* \u2500\u2500 \u7B5B\u9009\u884C \u2500\u2500 */
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

/* \u2500\u2500 \u5361\u7247\u6D41 \u2500\u2500 */
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

/* \u2500\u2500 \u7A7A\u72B6\u6001\u4E0E\u63D0\u793A \u2500\u2500 */
.bq-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;
  min-height:240px;text-align:center;color:var(--dsw-alias-label-secondary,#6f7578);font-size:12px;line-height:1.8}
.bq-empty .bq-mark{font-size:34px;line-height:1}
.bq-empty strong{color:var(--dsw-alias-label-primary,#17191c);font-size:14px}
.bq-notice{margin:10px 16px 0;padding:8px 12px;border-radius:8px;font-size:12px;
  border:1px solid color-mix(in srgb,var(--dsw-alias-state-error-primary,#d64541) 40%,transparent);
  color:var(--dsw-alias-state-error-primary,#d64541);
  background:color-mix(in srgb,var(--dsw-alias-state-error-primary,#d64541) 8%,transparent)}

/* \u2500\u2500 \u7F16\u8F91\u5F39\u5C42\uFF08\u9650\u5236\u5728\u5DE5\u4F5C\u53F0\u533A\u57DF\u5185\uFF09\u2500\u2500 */
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

/* \u2500\u2500 AI \u62BD\u5C49\uFF1A\u53F3\u4FA7\u6ED1\u51FA\uFF0C\u4E0D\u8D8A\u8FC7\u5DE5\u4F5C\u53F0\u533A\u57DF \u2500\u2500 */
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

/* \u2500\u2500 \u8F7B\u63D0\u793A \u2500\u2500 */
.bq-toast{position:absolute;left:50%;bottom:18px;z-index:30;transform:translate(-50%,6px);
  max-width:min(480px,calc(100% - 32px));padding:8px 14px;border-radius:9px;font-size:12px;
  border:1px solid var(--dsw-alias-border-l2,#dfe1e4);background:var(--dsw-alias-bg-layer-1,#fff);
  box-shadow:0 8px 28px rgba(20,24,28,.2);opacity:0;pointer-events:none;transition:.18s;overflow-wrap:anywhere}
.bq-toast[data-show="true"]{opacity:1;transform:translate(-50%,0)}

/* \u2500\u2500 \u6309\u4E1A\u52A1\u5BB9\u5668\u5BBD\u5EA6\u91CD\u6392 \u2500\u2500 */
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
`;

  // src/client.jsx
  var REPOSITORY = "https://github.com/cinderzhan/bianqu-workbench";
  window.__ModuleLoader__.load({
    id: "dsh-bianqu-workbench",
    factory: (require2) => {
      const React = require2("react");
      const TYPE_LABELS = {
        melody: "\u65CB\u5F8B\u52A8\u673A",
        chord: "\u548C\u58F0\u8D70\u5411",
        lyric: "\u6B4C\u8BCD\u7247\u6BB5",
        rhythm: "\u8282\u594F\u578B",
        other: "\u5176\u4ED6"
      };
      const TYPE_ORDER = ["melody", "chord", "lyric", "rhythm", "other"];
      async function api(path, options) {
        const response = await fetch(path, options);
        const result = await response.json().catch(() => ({}));
        if (!response.ok) {
          const error = new Error(result.error || `\u8BF7\u6C42\u5931\u8D25\uFF08HTTP ${response.status}\uFF09`);
          error.status = response.status;
          throw error;
        }
        return result;
      }
      let bridge = null;
      let pendingDraft = null;
      let draftTimer = null;
      function fillDraft(sessionId, text) {
        const actx = bridge?.sessions?.scope?.(sessionId);
        const conversation = actx?.get?.("conversation");
        if (!conversation) throw new Error("\u5BF9\u8BDD\u8F93\u5165\u4E0D\u53EF\u7528");
        const input = conversation.input.for(actx);
        const current = input.state.getSnapshot().draft || "";
        input.setDraft(current.trim() ? `${current}

${text}` : text);
      }
      function queueDraft(sessionId, text) {
        pendingDraft = { sessionId, text, tries: 0 };
        const attempt = () => {
          if (!pendingDraft) return;
          try {
            fillDraft(pendingDraft.sessionId, pendingDraft.text);
            pendingDraft = null;
          } catch {
            pendingDraft.tries += 1;
            if (pendingDraft.tries < 6) draftTimer = setTimeout(attempt, 1500);
          }
        };
        clearTimeout(draftTimer);
        attempt();
      }
      function ideaPrompt(idea) {
        const meta = [
          idea.musicalKey ? `\u8C03\u5F0F\uFF1A${idea.musicalKey}` : "",
          idea.tempo ? `\u901F\u5EA6\uFF1A${idea.tempo} BPM` : ""
        ].filter(Boolean).join("\u3000");
        return [
          `\u6211\u5728\u7F16\u66F2\u5DE5\u4F5C\u53F0\u91CC\u8BB0\u4E86\u4E00\u6761\u300C${TYPE_LABELS[idea.type] || "\u7075\u611F"}\u300D\uFF0C\u5E2E\u6211\u628A\u5B83\u53D1\u5C55\u6210\u5177\u4F53\u7684\u7F16\u66F2\u601D\u8DEF\uFF1A`,
          "",
          idea.title ? `\u6807\u9898\uFF1A${idea.title}` : "",
          meta,
          idea.tags.length ? `\u6807\u7B7E\uFF1A${idea.tags.join("\u3001")}` : "",
          "",
          idea.content,
          "",
          "\u8BF7\u7ED9\u51FA\uFF1A\u6BB5\u843D\u7ED3\u6784\u5EFA\u8BAE\u3001\u548C\u58F0/\u7EC7\u4F53\u5B89\u6392\u3001\u914D\u5668\u4E0E\u97F3\u8272\u65B9\u5411\uFF0C\u4EE5\u53CA\u4E0B\u4E00\u6B65\u53EF\u4EE5\u5148\u505A\u4EC0\u4E48\u3002"
        ].filter((line) => line !== "").join("\n");
      }
      function IdeaEditor({ initial, busy, onSave, onClose }) {
        const [type, setType] = React.useState(initial?.type || "melody");
        const [title, setTitle] = React.useState(initial?.title || "");
        const [content, setContent] = React.useState(initial?.content || "");
        const [tags, setTags] = React.useState((initial?.tags || []).join("\uFF0C"));
        const [musicalKey, setMusicalKey] = React.useState(initial?.musicalKey || "");
        const [tempo, setTempo] = React.useState(initial?.tempo ? String(initial.tempo) : "");
        const [error, setError] = React.useState("");
        React.useEffect(() => {
          const onKey = (event) => {
            if (event.key === "Escape") onClose();
          };
          window.addEventListener("keydown", onKey);
          return () => window.removeEventListener("keydown", onKey);
        }, [onClose]);
        const submit = async () => {
          setError("");
          try {
            await onSave({
              type,
              title: title.trim(),
              content: content.trim(),
              tags,
              musicalKey: musicalKey.trim(),
              tempo: tempo.trim() === "" ? null : tempo.trim()
            });
          } catch (cause) {
            setError(cause instanceof Error ? cause.message : String(cause));
          }
        };
        return /* @__PURE__ */ React.createElement("div", { className: "bq-overlay", role: "presentation", onMouseDown: (event) => {
          if (event.target === event.currentTarget) onClose();
        } }, /* @__PURE__ */ React.createElement("div", { className: "bq-dialog", role: "dialog", "aria-modal": "true", "aria-label": initial ? "\u7F16\u8F91\u7075\u611F" : "\u8BB0\u4E00\u6761\u7075\u611F" }, /* @__PURE__ */ React.createElement("h2", null, initial ? "\u7F16\u8F91\u7075\u611F" : "\u8BB0\u4E00\u6761\u7075\u611F"), /* @__PURE__ */ React.createElement("div", { className: "bq-field" }, /* @__PURE__ */ React.createElement("label", null, "\u7C7B\u578B"), /* @__PURE__ */ React.createElement("div", { className: "bq-type-row", role: "group", "aria-label": "\u7C7B\u578B" }, TYPE_ORDER.map((value) => /* @__PURE__ */ React.createElement(
          "button",
          {
            key: value,
            type: "button",
            className: "bq-chip",
            "data-on": type === value ? "true" : "false",
            "aria-pressed": type === value,
            onClick: () => setType(value)
          },
          TYPE_LABELS[value]
        )))), /* @__PURE__ */ React.createElement("div", { className: "bq-field" }, /* @__PURE__ */ React.createElement("label", { htmlFor: "bq-edit-title" }, "\u6807\u9898"), /* @__PURE__ */ React.createElement(
          "input",
          {
            id: "bq-edit-title",
            value: title,
            maxLength: 80,
            autoFocus: true,
            placeholder: "\u4F8B\u5982\uFF1A\u96E8\u591C synthwave \u526F\u6B4C\u52A8\u673A",
            onChange: (event) => setTitle(event.target.value)
          }
        )), /* @__PURE__ */ React.createElement("div", { className: "bq-field" }, /* @__PURE__ */ React.createElement("label", { htmlFor: "bq-edit-content" }, "\u5185\u5BB9"), /* @__PURE__ */ React.createElement(
          "textarea",
          {
            id: "bq-edit-content",
            value: content,
            placeholder: "\u7B80\u8C31\u3001\u97F3\u540D\u3001\u548C\u5F26\u7EA7\u6570\u3001\u6B4C\u8BCD\u7247\u6BB5\u3001\u753B\u9762\u611F\u2026\u2026\u60F3\u5230\u4EC0\u4E48\u5199\u4EC0\u4E48",
            onChange: (event) => setContent(event.target.value)
          }
        )), /* @__PURE__ */ React.createElement("div", { className: "bq-field-row" }, /* @__PURE__ */ React.createElement("div", { className: "bq-field" }, /* @__PURE__ */ React.createElement("label", { htmlFor: "bq-edit-key" }, "\u8C03\u5F0F\uFF08\u53EF\u9009\uFF09"), /* @__PURE__ */ React.createElement(
          "input",
          {
            id: "bq-edit-key",
            value: musicalKey,
            maxLength: 24,
            placeholder: "\u5982 C \u5927\u8C03 / a \u5C0F\u8C03",
            onChange: (event) => setMusicalKey(event.target.value)
          }
        )), /* @__PURE__ */ React.createElement("div", { className: "bq-field" }, /* @__PURE__ */ React.createElement("label", { htmlFor: "bq-edit-tempo" }, "\u901F\u5EA6 BPM\uFF08\u53EF\u9009\uFF09"), /* @__PURE__ */ React.createElement(
          "input",
          {
            id: "bq-edit-tempo",
            value: tempo,
            inputMode: "numeric",
            placeholder: "20\u2013300",
            onChange: (event) => setTempo(event.target.value)
          }
        ))), /* @__PURE__ */ React.createElement("div", { className: "bq-field" }, /* @__PURE__ */ React.createElement("label", { htmlFor: "bq-edit-tags" }, "\u6807\u7B7E\uFF08\u53EF\u9009\uFF0C\u7528\u9017\u53F7\u6216\u7A7A\u683C\u5206\u9694\uFF09"), /* @__PURE__ */ React.createElement(
          "input",
          {
            id: "bq-edit-tags",
            value: tags,
            placeholder: "\u5982 \u526F\u6B4C\uFF0Clofi\uFF0C\u591C\u8272",
            onChange: (event) => setTags(event.target.value)
          }
        )), error ? /* @__PURE__ */ React.createElement("div", { className: "bq-notice", role: "alert" }, error) : null, /* @__PURE__ */ React.createElement("div", { className: "bq-dialog-acts" }, /* @__PURE__ */ React.createElement("button", { type: "button", className: "bq-btn", onClick: onClose }, "\u53D6\u6D88"), /* @__PURE__ */ React.createElement("button", { type: "button", className: "bq-btn", "data-primary": "true", disabled: busy, onClick: submit }, busy ? "\u4FDD\u5B58\u4E2D\u2026" : "\u4FDD\u5B58"))));
      }
      function IdeaCard({ idea, onEdit, onArchive, onRemove, onAsk, confirming, busy }) {
        const meta = [
          idea.musicalKey,
          idea.tempo ? `${idea.tempo} BPM` : "",
          `\u66F4\u65B0\u4E8E ${idea.updatedAt.slice(0, 10)}`
        ].filter(Boolean);
        return /* @__PURE__ */ React.createElement("article", { className: "bq-card" }, /* @__PURE__ */ React.createElement("div", { className: "bq-card-top" }, /* @__PURE__ */ React.createElement("span", { className: "bq-badge", "data-type": idea.type }, TYPE_LABELS[idea.type] || "\u5176\u4ED6"), /* @__PURE__ */ React.createElement("h3", { className: "bq-card-title" }, idea.title || "\uFF08\u65E0\u6807\u9898\uFF09")), idea.content ? /* @__PURE__ */ React.createElement("p", { className: "bq-card-content" }, idea.content) : null, idea.tags.length ? /* @__PURE__ */ React.createElement("div", { className: "bq-card-tags" }, idea.tags.map((tag) => /* @__PURE__ */ React.createElement("span", { key: tag, className: "bq-tag" }, "#", tag))) : null, /* @__PURE__ */ React.createElement("div", { className: "bq-card-meta" }, meta.map((item) => /* @__PURE__ */ React.createElement("span", { key: item }, item))), /* @__PURE__ */ React.createElement("div", { className: "bq-card-acts" }, /* @__PURE__ */ React.createElement("button", { type: "button", className: "bq-act", onClick: () => onAsk(idea) }, "\u95EE\u95EE AI"), /* @__PURE__ */ React.createElement("button", { type: "button", className: "bq-act", onClick: () => onEdit(idea) }, "\u7F16\u8F91"), /* @__PURE__ */ React.createElement("button", { type: "button", className: "bq-act", onClick: () => onArchive(idea) }, idea.archived ? "\u6062\u590D" : "\u5F52\u6863"), /* @__PURE__ */ React.createElement("button", { type: "button", className: "bq-act", "data-danger": "true", disabled: busy, onClick: () => onRemove(idea) }, confirming ? "\u518D\u70B9\u4E00\u6B21\u786E\u8BA4\u5220\u9664" : "\u5220\u9664")));
      }
      function BusinessPanel({ service, conversation }) {
        const [ideas, setIdeas] = React.useState([]);
        const [allTags, setAllTags] = React.useState([]);
        const [loading, setLoading] = React.useState(true);
        const [error, setError] = React.useState("");
        const [query, setQuery] = React.useState("");
        const [debouncedQuery, setDebouncedQuery] = React.useState("");
        const [typeFilter, setTypeFilter] = React.useState("");
        const [tagFilter, setTagFilter] = React.useState("");
        const [showArchived, setShowArchived] = React.useState(false);
        const [editing, setEditing] = React.useState(null);
        const [drawerOpen, setDrawerOpen] = React.useState(false);
        const [busy, setBusy] = React.useState(false);
        const [confirmId, setConfirmId] = React.useState("");
        const [toast, setToast] = React.useState("");
        const pendingAskRef = React.useRef(null);
        const [sessionId, setSessionId] = React.useState(() => {
          try {
            return service.currentSession() || "";
          } catch {
            return "";
          }
        });
        React.useEffect(() => {
          const list = service.ctx?.sessions?.list;
          if (!list?.subscribe) return;
          const update = () => {
            try {
              setSessionId(service.currentSession() || "");
            } catch {
            }
          };
          update();
          return list.subscribe(update);
        }, [service]);
        React.useEffect(() => {
          if (!toast) return;
          const timer = setTimeout(() => setToast(""), 2600);
          return () => clearTimeout(timer);
        }, [toast]);
        const showToast = setToast;
        React.useEffect(() => {
          const timer = setTimeout(() => setDebouncedQuery(query.trim()), 250);
          return () => clearTimeout(timer);
        }, [query]);
        React.useEffect(() => {
          const controller = new AbortController();
          setLoading(true);
          const params = new URLSearchParams();
          if (debouncedQuery) params.set("q", debouncedQuery);
          if (typeFilter) params.set("type", typeFilter);
          if (tagFilter) params.set("tag", tagFilter);
          if (showArchived) params.set("archived", "1");
          api(`/api/bianqu-workbench/ideas${params.size ? `?${params}` : ""}`, { signal: controller.signal }).then((result) => {
            setIdeas(result.ideas);
            setAllTags(result.tags);
            setError("");
          }).catch((cause) => {
            if (!controller.signal.aborted) setError(cause instanceof Error ? cause.message : String(cause));
          }).finally(() => {
            if (!controller.signal.aborted) setLoading(false);
          });
          return () => controller.abort();
        }, [debouncedQuery, typeFilter, tagFilter, showArchived]);
        const reload = React.useCallback(async () => {
          const params = new URLSearchParams();
          if (debouncedQuery) params.set("q", debouncedQuery);
          if (typeFilter) params.set("type", typeFilter);
          if (tagFilter) params.set("tag", tagFilter);
          if (showArchived) params.set("archived", "1");
          try {
            const result = await api(`/api/bianqu-workbench/ideas${params.size ? `?${params}` : ""}`);
            setIdeas(result.ideas);
            setAllTags(result.tags);
            setError("");
          } catch (cause) {
            setToast(cause instanceof Error ? cause.message : String(cause));
          }
        }, [debouncedQuery, typeFilter, tagFilter, showArchived]);
        const save = async (fields) => {
          setBusy(true);
          try {
            if (editing === "new") {
              await api("/api/bianqu-workbench/ideas", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(fields)
              });
              setToast("\u5DF2\u8BB0\u4E0B\u8FD9\u6761\u7075\u611F");
            } else if (editing && editing.id) {
              await api("/api/bianqu-workbench/ideas/update", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ ...fields, id: editing.id })
              });
              setToast("\u5DF2\u4FDD\u5B58\u4FEE\u6539");
            }
            setEditing(null);
            await reload();
          } finally {
            setBusy(false);
          }
        };
        const toggleArchive = async (idea) => {
          setBusy(true);
          try {
            await api("/api/bianqu-workbench/ideas/update", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({ id: idea.id, archived: !idea.archived })
            });
            setToast(idea.archived ? "\u5DF2\u6062\u590D\u5230\u7075\u611F\u5E93" : "\u5DF2\u5F52\u6863");
            await reload();
          } catch (cause) {
            setToast(cause instanceof Error ? cause.message : String(cause));
          } finally {
            setBusy(false);
          }
        };
        const remove = async (idea) => {
          if (confirmId !== idea.id) {
            setConfirmId(idea.id);
            setTimeout(() => setConfirmId((current) => current === idea.id ? "" : current), 3e3);
            return;
          }
          setConfirmId("");
          setBusy(true);
          try {
            await api("/api/bianqu-workbench/ideas/remove", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({ id: idea.id })
            });
            setToast("\u5DF2\u5220\u9664");
            await reload();
          } catch (cause) {
            setToast(cause instanceof Error ? cause.message : String(cause));
          } finally {
            setBusy(false);
          }
        };
        const ask = async (idea) => {
          setDrawerOpen(true);
          if (idea) pendingAskRef.current = ideaPrompt(idea);
          if (sessionId) {
            if (pendingAskRef.current) {
              queueDraft(sessionId, pendingAskRef.current);
              pendingAskRef.current = null;
            }
            return;
          }
          try {
            await service.run(service.newSession());
          } catch (cause) {
            setToast(cause instanceof Error ? cause.message : String(cause));
          }
        };
        React.useEffect(() => {
          if (sessionId && pendingAskRef.current) {
            queueDraft(sessionId, pendingAskRef.current);
            pendingAskRef.current = null;
          }
        }, [sessionId]);
        const typeChip = (value, label) => /* @__PURE__ */ React.createElement(
          "button",
          {
            key: value || "all",
            type: "button",
            className: "bq-chip",
            "data-on": typeFilter === value ? "true" : "false",
            "aria-pressed": typeFilter === value,
            onClick: () => setTypeFilter(typeFilter === value ? "" : value)
          },
          label
        );
        const filtered = !(showArchived || debouncedQuery || typeFilter || tagFilter);
        return /* @__PURE__ */ React.createElement("div", { className: "bq-root" }, /* @__PURE__ */ React.createElement("header", { className: "bq-toolbar", "data-dsh-workbench-toolbar": "" }, /* @__PURE__ */ React.createElement("div", { className: "bq-title" }, /* @__PURE__ */ React.createElement("h1", null, "\u7075\u611F\u5E93"), /* @__PURE__ */ React.createElement("small", null, "\u7F16\u66F2\u5DE5\u4F5C\u53F0")), /* @__PURE__ */ React.createElement("div", { className: "bq-search" }, /* @__PURE__ */ React.createElement(
          "input",
          {
            type: "search",
            value: query,
            placeholder: "\u641C\u7D22\u7075\u611F\u3001\u6807\u7B7E\u3001\u8C03\u5F0F\u2026",
            "aria-label": "\u641C\u7D22\u7075\u611F",
            onChange: (event) => setQuery(event.target.value)
          }
        )), /* @__PURE__ */ React.createElement("div", { className: "bq-toolbar-acts" }, /* @__PURE__ */ React.createElement("button", { type: "button", className: "bq-btn", onClick: () => ask(null), "aria-expanded": drawerOpen }, "AI \u7F16\u66F2\u52A9\u624B"), /* @__PURE__ */ React.createElement("button", { type: "button", className: "bq-btn", "data-primary": "true", onClick: () => setEditing("new") }, "\uFF0B \u8BB0\u4E00\u6761"))), /* @__PURE__ */ React.createElement("div", { className: "bq-filters" }, typeChip("", "\u5168\u90E8"), TYPE_ORDER.map((value) => typeChip(value, TYPE_LABELS[value])), allTags.slice(0, 8).map(({ tag, count }) => /* @__PURE__ */ React.createElement(
          "button",
          {
            key: tag,
            type: "button",
            className: "bq-chip",
            "data-on": tagFilter === tag ? "true" : "false",
            "aria-pressed": tagFilter === tag,
            title: `${count} \u6761`,
            onClick: () => setTagFilter(tagFilter === tag ? "" : tag)
          },
          "#",
          tag
        )), /* @__PURE__ */ React.createElement("span", { className: "bq-sep" }), /* @__PURE__ */ React.createElement(
          "button",
          {
            type: "button",
            className: "bq-chip",
            "data-on": showArchived ? "true" : "false",
            "aria-pressed": showArchived,
            onClick: () => setShowArchived(!showArchived)
          },
          showArchived ? "\u67E5\u770B\u4F7F\u7528\u4E2D" : "\u5DF2\u5F52\u6863"
        ), /* @__PURE__ */ React.createElement("span", { className: "bq-count" }, loading ? "\u8BFB\u53D6\u4E2D\u2026" : `${ideas.length} \u6761`)), error ? /* @__PURE__ */ React.createElement("div", { className: "bq-notice", role: "alert" }, error) : null, /* @__PURE__ */ React.createElement("main", { className: "bq-main" }, !loading && ideas.length === 0 ? /* @__PURE__ */ React.createElement("div", { className: "bq-empty" }, /* @__PURE__ */ React.createElement("span", { className: "bq-mark", "aria-hidden": "true" }, "\u266A"), /* @__PURE__ */ React.createElement("strong", null, filtered ? "\u8FD8\u6CA1\u6709\u8BB0\u4E0B\u4EFB\u4F55\u7075\u611F" : "\u6CA1\u6709\u627E\u5230\u7B26\u5408\u6761\u4EF6\u7684\u7075\u611F"), /* @__PURE__ */ React.createElement("p", null, filtered ? "\u65CB\u5F8B\u52A8\u673A\u3001\u548C\u58F0\u8D70\u5411\u3001\u6B4C\u8BCD\u7247\u6BB5\u2026\u2026\u968F\u624B\u8BB0\u4E0B\u6765\uFF0C\u7F16\u66F2\u65F6\u7FFB\u4E00\u7FFB\u3002" : "\u6362\u4E2A\u5173\u952E\u8BCD\u6216\u7B5B\u9009\u6761\u4EF6\u8BD5\u8BD5\u3002"), filtered ? /* @__PURE__ */ React.createElement("button", { type: "button", className: "bq-btn", "data-primary": "true", onClick: () => setEditing("new") }, "\u8BB0\u7B2C\u4E00\u6761") : null) : /* @__PURE__ */ React.createElement("div", { className: "bq-grid" }, ideas.map((idea) => /* @__PURE__ */ React.createElement(
          IdeaCard,
          {
            key: idea.id,
            idea,
            busy,
            confirming: confirmId === idea.id,
            onEdit: (item) => setEditing(item),
            onArchive: toggleArchive,
            onRemove: remove,
            onAsk: ask
          }
        )))), /* @__PURE__ */ React.createElement("aside", { className: "bq-drawer", "data-open": drawerOpen ? "true" : "false", "aria-label": "AI \u7F16\u66F2\u52A9\u624B", "aria-hidden": !drawerOpen }, /* @__PURE__ */ React.createElement("div", { className: "bq-drawer-head" }, /* @__PURE__ */ React.createElement("h2", null, "AI \u7F16\u66F2\u52A9\u624B"), /* @__PURE__ */ React.createElement("button", { type: "button", className: "bq-btn", onClick: () => setDrawerOpen(false) }, "\u6536\u8D77")), /* @__PURE__ */ React.createElement("div", { className: "bq-drawer-body" }, sessionId ? null : /* @__PURE__ */ React.createElement("div", { className: "bq-ai-tip" }, /* @__PURE__ */ React.createElement("strong", null, "\u8FD8\u6CA1\u6709 AI \u5BF9\u8BDD"), /* @__PURE__ */ React.createElement("p", null, "AI \u534F\u52A9\u9700\u8981\u4E00\u6761\u672C\u5DE5\u4F5C\u53F0\u7684\u4F1A\u8BDD\u3002\u5F00\u59CB\u5BF9\u8BDD\u65F6\uFF0C\u5BBF\u4E3B\u4F1A\u5148\u8BF7\u4F60\u9009\u62E9\u4E00\u4E2A\u6587\u4EF6\u5939\u4F5C\u4E3A\u5DE5\u4F5C\u533A\uFF1B\u5BF9\u8BDD\u53EA\u5728\u4F60\u786E\u8BA4\u540E\u624D\u5F00\u59CB\u3002"), /* @__PURE__ */ React.createElement(
          "button",
          {
            type: "button",
            className: "bq-btn",
            "data-primary": "true",
            onClick: () => {
              service.run(service.newSession()).catch((cause) => setToast(cause instanceof Error ? cause.message : String(cause)));
            }
          },
          "\u5F00\u59CB AI \u5BF9\u8BDD"
        )), conversation)), editing ? /* @__PURE__ */ React.createElement(
          IdeaEditor,
          {
            initial: editing === "new" ? null : editing,
            busy,
            onSave: save,
            onClose: () => setEditing(null)
          }
        ) : null, /* @__PURE__ */ React.createElement("div", { className: "bq-toast", "data-show": toast ? "true" : "false", role: "status" }, toast));
      }
      function apply(ctx) {
        bridge = { sessions: ctx.sessions };
        ctx.effect(() => {
          const style = document.createElement("style");
          style.dataset.dshPlugin = "dsh-bianqu-workbench";
          style.textContent = css;
          document.head.appendChild(style);
          return () => style.remove();
        }, "bianqu: styles");
        ctx.effect(() => ctx.desktopWorkbenches.register({
          title: "\u7F16\u66F2\u5DE5\u4F5C\u53F0",
          panelTitle: "\u7075\u611F\u5E93",
          repository: REPOSITORY,
          description: "\u968F\u624B\u8BB0\u5F55\u65CB\u5F8B\u52A8\u673A\u3001\u548C\u58F0\u8D70\u5411\u4E0E\u6B4C\u8BCD\u7247\u6BB5\u7684\u7075\u611F\u5E93\uFF0C\u53EF\u641C\u7D22\u7B5B\u9009\uFF1B\u9700\u8981\u65F6\u518D\u6253\u5F00 AI \u5BF9\u8BDD\u7EE7\u7EED\u521B\u4F5C\u3002",
          icon: "\u266A",
          audience: "\u7F16\u66F2\u521B\u4F5C\u8005",
          category: "\u97F3\u4E50",
          customFrame: true,
          headerLayout: "compact"
        }, BusinessPanel), "bianqu: register");
        ctx.effect(() => {
          const timer = setInterval(() => {
            if (!pendingDraft) return;
            try {
              fillDraft(pendingDraft.sessionId, pendingDraft.text);
              pendingDraft = null;
            } catch {
            }
          }, 5e3);
          return () => {
            clearInterval(timer);
            clearTimeout(draftTimer);
          };
        }, "bianqu: pending draft retry");
      }
      return { apply, inject: ["desktopWorkbenches", "sessions"] };
    }
  });
})();
