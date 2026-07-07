/**
 * Copies the UMD/global-script builds of the libraries the dynamic
 * visualization sandbox (src/components/learn/DynamicVisualRenderer.tsx)
 * loads inside its sandboxed iframe — React, ReactDOM, react-is (a recharts
 * peer dependency), Recharts, d3, mathjs, and Three.js (3D primary path) —
 * from node_modules into public/vendor/dynamic-visuals/, so the sandboxed
 * iframe (a separate, cookie-less, same-process-but-not-same-origin
 * document) can <script src> them without reaching out to a third-party CDN
 * at runtime.
 *
 * Three.js since v0.150 ships only ES modules (no UMD), so three.module.min.js
 * is loaded via <script type="module"> and re-exposed on window.THREE inside
 * the iframe. It imports './three.core.min.js' as a sibling file, so BOTH
 * files must land in the same directory and keep their original names.
 *
 * Run automatically via the "postinstall" npm script — never hand-edit the
 * output directory (see .gitignore).
 */

import { copyFileSync, mkdirSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const outDir = join(root, 'public', 'vendor', 'dynamic-visuals')

const files = [
  ['node_modules/react/umd/react.production.min.js', 'react.production.min.js'],
  ['node_modules/react-dom/umd/react-dom.production.min.js', 'react-dom.production.min.js'],
  ['node_modules/react-is/umd/react-is.production.min.js', 'react-is.production.min.js'],
  ['node_modules/recharts/umd/Recharts.js', 'recharts.production.js'],
  ['node_modules/d3/dist/d3.min.js', 'd3.min.js'],
  ['node_modules/mathjs/lib/browser/math.js', 'mathjs.js'],
  // Three.js — module + its sibling core chunk. Names MUST stay as-is so
  // the relative `import './three.core.min.js'` inside three.module.min.js
  // resolves to a same-directory sibling file at the served URL.
  ['node_modules/three/build/three.module.min.js', 'three.module.min.js'],
  ['node_modules/three/build/three.core.min.js', 'three.core.min.js'],
]

mkdirSync(outDir, { recursive: true })

let missing = 0
for (const [src, destName] of files) {
  const srcPath = join(root, src)
  if (!existsSync(srcPath)) {
    console.error(`[copy-dynamic-visual-vendor] MISSING: ${src} — dynamic visualization sandbox will not load until this dependency is installed.`)
    missing++
    continue
  }
  copyFileSync(srcPath, join(outDir, destName))
}

if (missing > 0) {
  console.error(`[copy-dynamic-visual-vendor] ${missing} vendor file(s) missing — see above.`)
  process.exitCode = 0 // never fail install/build over this optional sandbox feature
} else {
  console.log(`[copy-dynamic-visual-vendor] copied ${files.length} vendor files to public/vendor/dynamic-visuals/`)
}
