/**
 * Validates HAND-AUTHORED reference Three.js scenes for the 3 spec prompts
 * against the same gates the live generator uses (export default, denylist,
 * canvas-via-ref shape, useEffect-with-cleanup shape). These are not LLM
 * output — they're what a competent model SHOULD emit, used as a quality
 * benchmark when the live LLM call cannot run in this sandbox.
 */
const DENYLIST = [
  'fetch(', 'XMLHttpRequest', 'import(', 'require(', 'eval(',
  'document.', 'window.', 'localStorage', 'sessionStorage', 'cookie',
  'setTimeout', 'setInterval', '<script', 'top.', 'parent.',
  '__proto__', 'constructor.constructor',
]
function isSafe(code) {
  const lower = code.toLowerCase()
  return !DENYLIST.some((bad) => lower.includes(bad.toLowerCase()))
}
function gate(name, code) {
  const hasExport = /export\s+default\s+function/.test(code)
  const hasCanvasRef = /React\.createElement\(['"]canvas['"]/.test(code) && /React\.useRef/.test(code)
  const hasEffect = /React\.useEffect/.test(code)
  const hasCleanup = /cancelAnimationFrame/.test(code) && /renderer\.dispose/.test(code)
  const usesTHREE = /\bTHREE\./.test(code)
  const safe = isSafe(code)
  const all = hasExport && hasCanvasRef && hasEffect && hasCleanup && usesTHREE && safe
  console.log(`  ${name.padEnd(28)} export=${hasExport} canvasRef=${hasCanvasRef} effect=${hasEffect} cleanup=${hasCleanup} THREE=${usesTHREE} safe=${safe} → ${all ? 'ACCEPT' : 'REJECT'}`)
  return all
}

import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
const here = dirname(fileURLToPath(import.meta.url))
const refDir = join(here, 'reference-scenes-3d')

const SCENES = ['earth-orbits-sun.js', 'water-molecule.js', 'newtons-first-law.js']

console.log('── Validation of hand-authored reference scenes ──────────────')
let allOk = true
for (const f of SCENES) {
  const code = readFileSync(join(refDir, f), 'utf-8')
  if (!gate(f.replace('.js', ''), code)) allOk = false
}
process.exit(allOk ? 0 : 1)
