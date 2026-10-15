// 客户端构建：把 src/client.jsx 打成宿主模块加载器要求的单文件。
// esbuild 通过环境变量 ESBUILD_BIN 或 PATH 提供（构建期工具，不进安装包）。
import { spawnSync } from 'node:child_process'

const esbuild = process.env.ESBUILD_BIN || 'esbuild'
const result = spawnSync(esbuild, [
  'src/client.jsx',
  '--bundle',
  '--outfile=lib/client.js',
  '--format=iife',
  '--jsx=transform',
], { stdio: 'inherit' })

if (result.error) {
  console.error(`找不到 esbuild：${result.error.message}\n请用 ESBUILD_BIN 指定 esbuild 可执行文件路径，或先把 esbuild 放到 PATH。`)
  process.exit(1)
}
process.exit(result.status ?? 1)
