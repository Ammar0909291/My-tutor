/**
 * Offline unit harness for getMomentumPriorityWeight + buildMomentumBlock in
 * src/lib/school/adaptive/learningMomentum.ts. Pure, no DB/network.
 *
 * Run with:  npx tsx scripts/test-learning-momentum.ts
 */

import { getMomentumPriorityWeight, buildMomentumBlock } from '../src/lib/school/adaptive/learningMomentum'
import type { MomentumLevel, MomentumProfile } from '../src/lib/school/adaptive/learningMomentum'

let passed = 0
let failed = 0
function check(name: string, cond: boolean) {
  if (cond) { passed++; console.log(`[✓ pass] ${name}`) }
  else { failed++; console.log(`[✗ FAIL] ${name}`) }
}

function profile(overrides: Partial<MomentumProfile> = {}): MomentumProfile {
  return {
    level: 'STABLE_MOMENTUM',
    score: 20,
    insight: '📈 Stable Momentum',
    insightDetail: 'Your learning progress is steady.',
    explanation: 'Student is maintaining steady participation — no major engagement concerns.',
    ...overrides,
  }
}

const ALL_LEVELS: MomentumLevel[] = [
  'STRONG_MOMENTUM', 'STABLE_MOMENTUM', 'DECLINING_MOMENTUM', 'DISENGAGEMENT_RISK',
]

// ── getMomentumPriorityWeight ───────────────────────────────────────────────

check('DISENGAGEMENT_RISK + never studied → 2',
  getMomentumPriorityWeight('DISENGAGEMENT_RISK', false) === 2)

check('DECLINING_MOMENTUM + never studied → 1',
  getMomentumPriorityWeight('DECLINING_MOMENTUM', false) === 1)

check('STABLE_MOMENTUM + never studied → 0',
  getMomentumPriorityWeight('STABLE_MOMENTUM', false) === 0)

check('STRONG_MOMENTUM + never studied → 0',
  getMomentumPriorityWeight('STRONG_MOMENTUM', false) === 0)

check('DISENGAGEMENT_RISK + already studied → 0 (no penalty for continuation)',
  getMomentumPriorityWeight('DISENGAGEMENT_RISK', true) === 0)

check('DECLINING_MOMENTUM + already studied → 0 (no penalty for continuation)',
  getMomentumPriorityWeight('DECLINING_MOMENTUM', true) === 0)

check('STABLE_MOMENTUM + already studied → 0',
  getMomentumPriorityWeight('STABLE_MOMENTUM', true) === 0)

check('STRONG_MOMENTUM + already studied → 0',
  getMomentumPriorityWeight('STRONG_MOMENTUM', true) === 0)

check('weight is always one of {0,1,2} across all level/hasStudiedBefore combos',
  ALL_LEVELS.every((level) =>
    [true, false].every((hasStudied) => {
      const w = getMomentumPriorityWeight(level, hasStudied)
      return w === 0 || w === 1 || w === 2
    })
  ))

check('only DISENGAGEMENT_RISK and DECLINING_MOMENTUM (and only when !hasStudiedBefore) produce a nonzero weight',
  ALL_LEVELS.every((level) =>
    [true, false].every((hasStudied) => {
      const w = getMomentumPriorityWeight(level, hasStudied)
      if (w === 0) return true
      return !hasStudied && (level === 'DISENGAGEMENT_RISK' || level === 'DECLINING_MOMENTUM')
    })
  ))

check('DISENGAGEMENT_RISK penalty is strictly greater than DECLINING_MOMENTUM penalty (both unstudied)',
  getMomentumPriorityWeight('DISENGAGEMENT_RISK', false) > getMomentumPriorityWeight('DECLINING_MOMENTUM', false))

check('function is pure/deterministic — repeated calls give same result',
  getMomentumPriorityWeight('DISENGAGEMENT_RISK', false) === getMomentumPriorityWeight('DISENGAGEMENT_RISK', false))

// ── buildMomentumBlock ───────────────────────────────────────────────────────

check('block is non-empty for any level',
  ALL_LEVELS.every((level) => buildMomentumBlock(profile({ level })).length > 0))

check('block contains header LEARNING MOMENTUM',
  buildMomentumBlock(profile()).includes('LEARNING MOMENTUM'))

check('block includes the level name in the Status line',
  buildMomentumBlock(profile({ level: 'STRONG_MOMENTUM' })).includes('STRONG_MOMENTUM'))

check('block includes the numeric score',
  buildMomentumBlock(profile({ score: 42 })).includes('42'))

check('block includes the explanation text',
  buildMomentumBlock(profile({ explanation: 'unique-explanation-marker' })).includes('unique-explanation-marker'))

check('STRONG_MOMENTUM → tutor approach mentions maintaining challenge level',
  buildMomentumBlock(profile({ level: 'STRONG_MOMENTUM' })).includes('Maintain current challenge level'))

check('STABLE_MOMENTUM → tutor approach mentions current teaching pace',
  buildMomentumBlock(profile({ level: 'STABLE_MOMENTUM' })).includes('Continue current teaching pace'))

check('DECLINING_MOMENTUM → tutor approach mentions reducing cognitive load',
  buildMomentumBlock(profile({ level: 'DECLINING_MOMENTUM' })).includes('Reduce cognitive load'))

check('DISENGAGEMENT_RISK → tutor approach mentions celebrating every correct answer',
  buildMomentumBlock(profile({ level: 'DISENGAGEMENT_RISK' })).includes('Celebrate every correct answer'))

check('every level produces a DISTINCT tutor-approach line (no shared fallback text)',
  new Set(ALL_LEVELS.map((level) => buildMomentumBlock(profile({ level })))).size === ALL_LEVELS.length)

check('block ends with the do-not-reference-directly instruction',
  buildMomentumBlock(profile()).includes('Do not reference this momentum status directly to the student.'))

check('function is deterministic — same profile twice gives same output',
  buildMomentumBlock(profile()) === buildMomentumBlock(profile()))

console.log(`\n=== ${passed} passed, ${failed} failed ===`)
process.exit(failed ? 1 : 0)
