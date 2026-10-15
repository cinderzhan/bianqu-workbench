# 编曲工作台（dsh-bianqu-workbench）

DSH Desktop 的本地工作台插件：**灵感库** —— 给编曲创作者随手记录旋律动机、和声走向、歌词片段、节奏型等灵感，支持搜索、类型/标签筛选与归档；需要 AI 协助时，从面板里按需打开本工作台的 AI 对话。

- 布局：业务整页（`customFrame`），AI 对话按需从右侧抽屉打开，不常驻。
- 数据：灵感条目保存在 DSH 数据目录下的 `bianqu-workbench/ideas.json`（由 `cordis.patch.yml` 的 `root` 指定），卸载插件不会删除数据。
- 本机接口：`/api/bianqu-workbench/` 前缀下的三个接口路径（列表+新建、更新、删除）。
- 工作台身份即本仓库 `cinderzhan/bianqu-workbench`。

## 安装

工作台市场收录后可直接在市场安装。手动安装（与收录源码同一份代码）：

```bash
dsh plugin --profile web add github:cinderzhan/bianqu-workbench
# 完整退出并重新打开 DSH Desktop
```

## 开发

```bash
# 构建客户端（需要 esbuild；可用 ESBUILD_BIN 指定路径）
ESBUILD_BIN=/path/to/esbuild pnpm run build

# 静态检查与单元测试
pnpm run check
pnpm test

# 打包
pnpm pack
```

## 本地打包安装

```bash
dsh plugin --profile web add <打包产物.tgz>
# 按提示完整退出并重新打开 DSH Desktop
```

重启后在左侧栏顶部的工作台切换菜单里选择「编曲工作台」。
