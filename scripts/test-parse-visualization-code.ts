/**
 * Offline unit harness for src/lib/teaching/visuals/parseVisualizationCode.ts.
 * Pure string parsing — no LLM, no DB.
 *
 * Run with:  npx tsx scripts/test-parse-visualization-code.ts
 */
import { parseVisualizationCode, stripVisualizationCodeTag } from '../src/lib/teaching/visuals/parseVisualizationCode'

let passed = 0
let failed = 0
function check(name: string, cond: boolean) {
  if (cond) { passed++; console.log(`[✓ pass] ${name}`) }
  else { failed++; console.log(`[✗ FAIL] ${name}`) }
}

// ── Tag present: extracted and trimmed ───────────────────────────────────────
check('extracts code between well-formed tags',
  parseVisualizationCode('[VISUALIZATION_CODE]\nexport default function V(){}\n[/VISUALIZATION_CODE]')
    === 'export default function V(){}')

check('trims surrounding whitespace inside the tag',
  parseVisualizationCode('[VISUALIZATION_CODE]   export default function V(){}   [/VISUALIZATION_CODE]')
    === 'export default function V(){}')

check('case-insensitive tag matching',
  parseVisualizationCode('[visualization_code]export default function V(){}[/visualization_code]')
    === 'export default function V(){}')

check('ignores text before the open tag and after the close tag',
  parseVisualizationCode('preamble\n[VISUALIZATION_CODE]export default function V(){}[/VISUALIZATION_CODE]\ntrailing')
    === 'export default function V(){}')

// ── Tag absent → null ────────────────────────────────────────────────────────
check('no tags at all → null', parseVisualizationCode('export default function V(){}') === null)
check('empty string → null', parseVisualizationCode('') === null)

// ── Malformed tag → null, no throw ──────────────────────────────────────────
check('open tag with no close tag → null, no throw', (() => {
  try { return parseVisualizationCode('[VISUALIZATION_CODE]export default function V(){}') === null }
  catch { return false }
})())

check('close tag with no open tag → null, no throw', (() => {
  try { return parseVisualizationCode('export default function V(){}[/VISUALIZATION_CODE]') === null }
  catch { return false }
})())

check('empty body between tags → null', parseVisualizationCode('[VISUALIZATION_CODE][/VISUALIZATION_CODE]') === null)

check('whitespace-only body between tags → null',
  parseVisualizationCode('[VISUALIZATION_CODE]   \n   [/VISUALIZATION_CODE]') === null)

// ── stripVisualizationCodeTag ───────────────────────────────────────────────
check('strips a well-formed tag pair and its contents',
  stripVisualizationCodeTag('before [VISUALIZATION_CODE]export default function V(){}[/VISUALIZATION_CODE] after')
    === 'before  after')

check('leaves text unchanged when no tag is present',
  stripVisualizationCodeTag('export default function V(){}') === 'export default function V(){}')

console.log(`\n=== ${passed} passed, ${failed} failed ===\n`)
process.exit(failed === 0 ? 0 : 1)
