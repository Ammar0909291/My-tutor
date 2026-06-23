/**
 * Standalone test harness for detectLanguageConfidence — the keyword-based
 * confidence-language classifier in confidenceCalibration.ts. Pure, no DB/network.
 * Run with:  npx tsx scripts/test-confidence-calibration.ts
 *
 * Focus: the negation-guard fix. Bare HIGH phrases ('sure', 'clear to me') must
 * NOT fire inside the very common LOW expressions "not sure" / "not clear to me",
 * while genuine HIGH/LOW signal is still detected.
 */

import { detectLanguageConfidence, type ConfidenceLevel } from '../src/lib/school/adaptive/confidenceCalibration'

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

console.log(`=== ${pass} passed, ${fail} failed (of ${CASES.length}) ===\n`)
process.exit(fail === 0 ? 0 : 1)
