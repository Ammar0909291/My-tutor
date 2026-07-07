/**
 * Standalone test harness for detectLanguageConfidence — the keyword-based
 * confidence-language classifier in confidenceCalibration.ts. Pure, no DB/network.
 * Run with:  npx tsx scripts/test-confidence-calibration.ts
 *
 * Focus: the negation-guard fix. Bare HIGH phrases ('sure', 'clear to me') must
 * NOT fire inside the very common LOW expressions "not sure" / "not clear to me",
 * while genuine HIGH/LOW signal is still detected.
 */

import { detectLanguageConfidence, detectConfidenceCalibration, buildConfidenceCalibrationBlock, type ConfidenceLevel } from '../src/lib/school/adaptive/confidenceCalibration'

type Case = { name: string; texts: string[]; expect: ConfidenceLevel }

const CASES: Case[] = [
  // Negation-guard regressions (the bug this harness exists to lock down)
  { name: 'REGRESSION — "not sure" is LOW, not polluted toward NEUTRAL', texts: ['I am not sure about this', "I'm not sure, this is confusing"], expect: 'LOW' },
  { name: 'REGRESSION — "not clear to me" is LOW', texts: ['This is not clear to me at all', 'still not clear'], expect: 'LOW' },

  // Genuine HIGH still detected
  { name: 'genuine HIGH — confident phrases', texts: ['this is easy, I understand it', 'makes sense, got it'], expect: 'HIGH' },
  { name: 'genuine HIGH — "sure, I get it" (un-negated sure)', texts: ['sure, this is obvious and simple'], expect: 'HIGH' },

  // Genuine LOW
  { name: 'genuine LOW — confused/struggling', texts: ['I am confused and struggling', 'this is difficult'], expect: 'LOW' },

  // Insufficient evidence
  { name: 'NEUTRAL — no signal', texts: ['The capital of France is Paris.'], expect: 'NEUTRAL' },
  { name: 'NEUTRAL — empty input', texts: [], expect: 'NEUTRAL' },
  { name: 'NEUTRAL — balanced high/low', texts: ['this is easy but I am confused'], expect: 'NEUTRAL' },
]

let pass = 0
let fail = 0

console.log('\n=== confidenceCalibration.detectLanguageConfidence harness ===\n')

for (const c of CASES) {
  const got = detectLanguageConfidence(c.texts)
  const ok = got === c.expect
  if (ok) pass++
  else fail++
  console.log(`[${ok ? '✓ pass' : '✗ FAIL'}] ${c.name}`)
  console.log(`  texts:    ${JSON.stringify(c.texts)}`)
  console.log(`  expected: ${c.expect}   got: ${got}`)
  console.log('')
}

// ── detectConfidenceCalibration — pure 3×3 mapping, zero test coverage ──────
function check(name: string, cond: boolean, extra?: string) {
  if (cond) pass++
  else fail++
  console.log(`[${cond ? '✓ pass' : '✗ FAIL'}] ${name}${extra && !cond ? `  — ${extra}` : ''}`)
}

console.log('\n── detectConfidenceCalibration ──\n')

// The two non-trivial cases (overconfident and underconfident)
check('HIGH confidence + WEAK performance → OVERCONFIDENT',
  detectConfidenceCalibration('HIGH', 'WEAK') === 'OVERCONFIDENT')
check('LOW confidence + STRONG performance → UNDERCONFIDENT',
  detectConfidenceCalibration('LOW', 'STRONG') === 'UNDERCONFIDENT')

// Everything else → WELL_CALIBRATED
check('HIGH + STRONG → WELL_CALIBRATED',
  detectConfidenceCalibration('HIGH', 'STRONG') === 'WELL_CALIBRATED')
check('HIGH + MIXED → WELL_CALIBRATED',
  detectConfidenceCalibration('HIGH', 'MIXED') === 'WELL_CALIBRATED')
check('LOW + WEAK → WELL_CALIBRATED',
  detectConfidenceCalibration('LOW', 'WEAK') === 'WELL_CALIBRATED')
check('LOW + MIXED → WELL_CALIBRATED',
  detectConfidenceCalibration('LOW', 'MIXED') === 'WELL_CALIBRATED')
// NEUTRAL short-circuits to WELL_CALIBRATED regardless of performance
check('NEUTRAL + STRONG → WELL_CALIBRATED (NEUTRAL always well-calibrated)',
  detectConfidenceCalibration('NEUTRAL', 'STRONG') === 'WELL_CALIBRATED')
check('NEUTRAL + WEAK → WELL_CALIBRATED',
  detectConfidenceCalibration('NEUTRAL', 'WEAK') === 'WELL_CALIBRATED')

// ── buildConfidenceCalibrationBlock — pure string builder ────────────────────
console.log('\n── buildConfidenceCalibrationBlock ──\n')

// null or UNCERTAIN profile → empty string (tutor sees nothing)
check('null profile → empty string',
  buildConfidenceCalibrationBlock(null) === '')
check('UNCERTAIN calibration → empty string',
  buildConfidenceCalibrationBlock({
    calibration: 'UNCERTAIN', confidenceLevel: 'NEUTRAL',
    explanation: '', insight: '', insightDetail: '',
  }) === '')

// OVERCONFIDENT block contains the strategy keyword
const overBlock = buildConfidenceCalibrationBlock({
  calibration: 'OVERCONFIDENT', confidenceLevel: 'HIGH',
  explanation: 'student appears confident but shows gaps', insight: '', insightDetail: '',
})
check('OVERCONFIDENT block is non-empty', overBlock.length > 0)
check('OVERCONFIDENT block contains "OVERCONFIDENT" status line',
  overBlock.includes('OVERCONFIDENT'))
check('OVERCONFIDENT block contains challenge-question strategy hint',
  overBlock.toLowerCase().includes('challenge') || overBlock.toLowerCase().includes('verify'))

// UNDERCONFIDENT block contains the encouragement strategy
const underBlock = buildConfidenceCalibrationBlock({
  calibration: 'UNDERCONFIDENT', confidenceLevel: 'LOW',
  explanation: 'student performs well but lacks confidence', insight: '', insightDetail: '',
})
check('UNDERCONFIDENT block is non-empty', underBlock.length > 0)
check('UNDERCONFIDENT block contains "UNDERCONFIDENT" status line',
  underBlock.includes('UNDERCONFIDENT'))
check('UNDERCONFIDENT block contains positive-reinforcement hint',
  underBlock.toLowerCase().includes('confidence') || underBlock.toLowerCase().includes('acknowledge'))

// WELL_CALIBRATED block present and does NOT emit overconfident/underconfident strategy text
const wellBlock = buildConfidenceCalibrationBlock({
  calibration: 'WELL_CALIBRATED', confidenceLevel: 'HIGH',
  explanation: 'aligned', insight: '', insightDetail: '',
})
check('WELL_CALIBRATED block is non-empty (block still surfaces for the tutor)',
  wellBlock.length > 0)
check('WELL_CALIBRATED block does NOT contain overconfident-specific strategy',
  !wellBlock.includes('gaps') && !wellBlock.includes('challenge questions'))

// safety: block always ends with the "do not reference directly" guard
check('every non-empty block ends with the direct-reference guard',
  [overBlock, underBlock, wellBlock].every((b) =>
    b.includes('Do not reference this calibration assessment directly')))

console.log(`\n=== ${pass} passed, ${fail} failed ===\n`)
process.exit(fail === 0 ? 0 : 1)
