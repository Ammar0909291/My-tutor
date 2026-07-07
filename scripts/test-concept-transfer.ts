/**
 * Standalone test harness for conceptTransfer.ts pure functions:
 *   1. isApplicationQuestion marker-regex logic (re-implemented inline — fn is not exported).
 *   2. buildTransferReasoningBlock — pure string builder.
 *   3. generateTransferPrompt — pure context-lookup builder.
 *
 * No DB, no network. Run with:  npx tsx scripts/test-concept-transfer.ts
 */

import { buildTransferReasoningBlock, generateTransferPrompt } from '../src/lib/school/adaptive/conceptTransfer'
import type { TransferProfile } from '../src/lib/school/adaptive/conceptTransfer'

// ── 1. isApplicationQuestion (inline re-implementation) ───────────────────────

const APPLICATION_MARKERS: RegExp[] = [
  /\b(cost|price|discount|sale|tax|profit|loss|interest|budget|earn|spend|pay|buy|sell|shop)\b/i,
  /\b(recipe|ingredient|cook|bake|litre|kg|kilogram|gram|metre|centimetre|kilometre)\b/i,
  /\b(sita|anita|priya|rahul|student|farmer|shopkeeper|doctor|worker|person|friend)\b/i,
  /\b(a (boy|girl|man|woman|child|family|group|class|team))\b/i,
  /\b(train|car|bus|bicycle|bike|journey|travel|speed|distance|time|reach)\b/i,
  /\b(garden|field|floor|room|wall|fence|land|plot|area of the)\b/i,
  /\b(bulb|battery|circuit|wire|switch|device|appliance|household|current flows|voltage across)\b/i,
  /\b(ball|throws?|drops?|falls?|slides?|moves? along|projectile)\b/i,
  /\b(temperature of|heats? up|cools? down|boils|melts)\b/i,
  /\b(rewrite|edit the following|improve this|spot the error|identify the mistake)\b/i,
  /\b(read the passage|according to the text|what does the author)\b/i,
  /\b(explain why|what caused|consequence|impact|effect of|led to|resulted in)\b/i,
  /\b(locate on|identify the region|compare the|describe how)\b/i,
  /\b(real.?world|everyday|in real life|in this situation|in this case|given that)\b/i,
  /\b(how much (does|will|would|did)|what (is|was|will be) the (total|final|cost|price|amount))\b/i,
  /if\b.{5,60}\bhow\b/i,
]

function hasRamNameMarker(text: string): boolean {
  const rx = /\bram\b/gi
  let m: RegExpExecArray | null
  while ((m = rx.exec(text)) !== null) {
    if (m[0] !== 'RAM') return true
  }
  return false
}

function isApplicationQuestion(text: string): boolean {
  return hasRamNameMarker(text) || APPLICATION_MARKERS.some((rx) => rx.test(text))
}

let pass = 0
let fail = 0
function check(name: string, cond: boolean) {
  if (cond) pass++
  else fail++
  console.log(`[${cond ? '✓ pass' : '✗ FAIL'}] ${name}`)
}

console.log('\n=== conceptTransfer isApplicationQuestion harness ===\n')

// REGRESSION — the bug this harness locks down.
check(
  'REGRESSION — "What is the difference between RAM and ROM?" (cs.memory_storage) is NOT application',
  isApplicationQuestion('What is the difference between RAM and ROM?') === false,
)
check(
  'REGRESSION — "Define RAM." stays routine',
  isApplicationQuestion('Define RAM.') === false,
)

// Genuine name usage still detected.
check(
  'genuine — "Ram has 5 apples and gives away 2" is application (name)',
  isApplicationQuestion('Ram has 5 apples and gives away 2. How many are left?') === true,
)
check(
  'genuine — lowercase "ram" mid-sentence still detected (name typed lowercase)',
  isApplicationQuestion('ram bought 3 kg of rice') === true,
)

// Other markers unaffected.
check(
  'genuine — shop/price marker still fires',
  isApplicationQuestion('A shopkeeper gives a 20% discount on a ₹500 item.') === true,
)
check(
  'genuine — routine recall question is NOT application',
  isApplicationQuestion('What is the formula for the area of a circle?') === false,
)
check(
  'genuine — routine calculation is NOT application',
  isApplicationQuestion('Calculate 25% of 80.') === false,
)

console.log(`\n=== isApplicationQuestion: ${pass} passed, ${fail} failed ===\n`)

// ── 2. buildTransferReasoningBlock ────────────────────────────────────────────

let p2 = 0, f2 = 0
function check2(name: string, cond: boolean, extra?: string) {
  if (cond) p2++; else f2++
  console.log(`[${cond ? '✓ pass' : '✗ FAIL'}] ${name}${extra && !cond ? `  — ${extra}` : ''}`)
}

console.log('\n── buildTransferReasoningBlock ──\n')

check2('null profile → empty string', buildTransferReasoningBlock(null) === '')

const make = (level: TransferProfile['level']): TransferProfile => ({
  level, confidence: 'high',
  routinePassRate: 80, applicationPassRate: 60,
  applicationTotal: 5, routineTotal: 5,
  explanation: 'test', insight: '',
})

const strong = buildTransferReasoningBlock(make('TRANSFER_STRONG'))
check2('TRANSFER_STRONG block non-empty', strong.length > 0)
check2('TRANSFER_STRONG contains level line', strong.includes('TRANSFER_STRONG'))
check2('TRANSFER_STRONG contains challenge/extension hint',
  strong.toLowerCase().includes('challenge') || strong.toLowerCase().includes('extension'))
check2('TRANSFER_STRONG ends with guard',
  strong.includes('Do not reference this block directly'))

const weak = buildTransferReasoningBlock(make('TRANSFER_WEAK'))
check2('TRANSFER_WEAK block non-empty', weak.length > 0)
check2('TRANSFER_WEAK contains word-problem/real-world hint',
  weak.toLowerCase().includes('word problem') || weak.toLowerCase().includes('real-world') || weak.toLowerCase().includes('real world'))
check2('TRANSFER_WEAK ends with guard',
  weak.includes('Do not reference this block directly'))

const dev = buildTransferReasoningBlock(make('TRANSFER_DEVELOPING'))
check2('TRANSFER_DEVELOPING block non-empty', dev.length > 0)
check2('TRANSFER_DEVELOPING ends with guard',
  dev.includes('Do not reference this block directly'))

// ── 3. generateTransferPrompt ─────────────────────────────────────────────────

console.log('\n── generateTransferPrompt ──\n')

check2('empty nodeIds → empty string', generateTransferPrompt('mathematics', []) === '')
check2('unknown node IDs → empty string',
  generateTransferPrompt('mathematics', ['random.topic.xyz']) === '')

const fracPrompt = generateTransferPrompt('mathematics', ['fractions.part_whole'])
check2('fractions node → non-empty prompt', fracPrompt.length > 0)
check2('fractions prompt contains subject slug', fracPrompt.includes('mathematics'))
check2('fractions prompt lists contexts (at least one "- " bullet)', fracPrompt.includes('- '))
check2('fractions prompt capped at ≤5 bullet lines',
  (fracPrompt.match(/^- /gm) ?? []).length <= 5)

const multiPrompt = generateTransferPrompt('physics', ['physics.forces.newton', 'physics.electricity.resistance'])
check2('two matching patterns → non-empty prompt', multiPrompt.length > 0)

console.log(`\n=== buildTransferReasoningBlock/generateTransferPrompt: ${p2} passed, ${f2} failed ===\n`)
console.log(`=== TOTAL: ${pass + p2} passed, ${fail + f2} failed ===\n`)
process.exit((fail + f2) === 0 ? 0 : 1)
