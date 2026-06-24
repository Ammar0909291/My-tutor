/**
 * Standalone test harness for pure functions in masteryIntelligence.ts.
 * No DB, no network. Run with:  npx tsx scripts/test-mastery-intelligence.ts
 *
 * Covers:
 *   buildMasteryIntelligenceBlock — 4-branch switch (TRUE_MASTERY / FALSE_MASTERY /
 *     AT_RISK / DEVELOPING), evidence slicing, guard text.
 *   buildStudentFacingEvidence — returns ≤2 non-technical strings per level.
 *   masteryPriorityWeight — tie-break ordering guarantee.
 */

import {
  buildMasteryIntelligenceBlock,
  buildStudentFacingEvidence,
  masteryPriorityWeight,
  type MasteryProfile,
  type MasteryLevel,
} from '../src/lib/school/adaptive/masteryIntelligence'

let pass = 0
let fail = 0
function check(name: string, cond: boolean, extra?: string) {
  if (cond) pass++
  else fail++
  console.log(`[${cond ? '✓ pass' : '✗ FAIL'}] ${name}${extra && !cond ? `  — ${extra}` : ''}`)
}

const makeProfile = (level: MasteryLevel, retentionScore = 70): MasteryProfile => ({
  masteryLevel: level,
  confidence: 'medium',
  riskLevel: 'low',
  explanation: 'test explanation',
  evidence: ['evidence item 1', 'evidence item 2', 'evidence item 3'],
  retentionScore,
  insight: 'test insight',
})

// ── buildMasteryIntelligenceBlock ─────────────────────────────────────────────

console.log('\n=== buildMasteryIntelligenceBlock ===\n')

// Common structure
const trueBlock = buildMasteryIntelligenceBlock(makeProfile('TRUE_MASTERY', 95))
check('TRUE_MASTERY block is non-empty', trueBlock.length > 0)
check('TRUE_MASTERY block contains classification header', trueBlock.includes('TRUE_MASTERY'))
check('TRUE_MASTERY block contains retention score', trueBlock.includes('95/100'))
check('TRUE_MASTERY block contains explanation', trueBlock.includes('test explanation'))
check('TRUE_MASTERY block contains evidence (sliced to ≤2)', trueBlock.includes('evidence item 1') && trueBlock.includes('evidence item 2'))
check('TRUE_MASTERY block does NOT include 3rd evidence item (slice(0,2))', !trueBlock.includes('evidence item 3'))
check('TRUE_MASTERY strategy mentions challenge or extension',
  trueBlock.toLowerCase().includes('challenge') || trueBlock.toLowerCase().includes('extension'))
check('TRUE_MASTERY ends with direct-reference guard',
  trueBlock.includes('Do not reference this block directly'))

// FALSE_MASTERY branch — verify strategy differs
const falseBlock = buildMasteryIntelligenceBlock(makeProfile('FALSE_MASTERY', 55))
check('FALSE_MASTERY block non-empty', falseBlock.length > 0)
check('FALSE_MASTERY block contains classification', falseBlock.includes('FALSE_MASTERY'))
check('FALSE_MASTERY strategy mentions verifying understanding',
  falseBlock.toLowerCase().includes('verify') || falseBlock.toLowerCase().includes('explain') || falseBlock.toLowerCase().includes('probe'))
check('FALSE_MASTERY ends with guard', falseBlock.includes('Do not reference this block directly'))

// AT_RISK branch
const atRiskBlock = buildMasteryIntelligenceBlock(makeProfile('AT_RISK', 20))
check('AT_RISK block non-empty', atRiskBlock.length > 0)
check('AT_RISK block contains classification', atRiskBlock.includes('AT_RISK'))
check('AT_RISK strategy mentions fundamentals or pacing',
  atRiskBlock.toLowerCase().includes('fundamental') || atRiskBlock.toLowerCase().includes('pace') || atRiskBlock.toLowerCase().includes('reinforce'))
check('AT_RISK ends with guard', atRiskBlock.includes('Do not reference this block directly'))

// DEVELOPING branch
const devBlock = buildMasteryIntelligenceBlock(makeProfile('DEVELOPING', 50))
check('DEVELOPING block non-empty', devBlock.length > 0)
check('DEVELOPING block contains classification', devBlock.includes('DEVELOPING'))
check('DEVELOPING strategy mentions encouraging or progressive',
  devBlock.toLowerCase().includes('encour') || devBlock.toLowerCase().includes('progress'))
check('DEVELOPING ends with guard', devBlock.includes('Do not reference this block directly'))

// Profile with NO evidence items — evidence section omitted gracefully
const noEvidence = buildMasteryIntelligenceBlock({
  ...makeProfile('TRUE_MASTERY'), evidence: [],
})
check('empty evidence → block still non-empty (no crash)', noEvidence.length > 0)
check('empty evidence → no stray "MASTERY EVIDENCE:" header', !noEvidence.includes('MASTERY EVIDENCE:'))

// ── buildStudentFacingEvidence ────────────────────────────────────────────────

console.log('\n── buildStudentFacingEvidence ──\n')

for (const level of ['TRUE_MASTERY', 'FALSE_MASTERY', 'AT_RISK', 'DEVELOPING'] as MasteryLevel[]) {
  const items = buildStudentFacingEvidence(makeProfile(level))
  check(`${level} → returns exactly 2 items`, items.length === 2)
  check(`${level} → both items are non-empty strings`, items.every((s) => typeof s === 'string' && s.length > 0))
}

// ── masteryPriorityWeight ─────────────────────────────────────────────────────

console.log('\n── masteryPriorityWeight ──\n')

check('AT_RISK has lowest weight (0)', masteryPriorityWeight('AT_RISK') === 0)
check('FALSE_MASTERY < DEVELOPING', masteryPriorityWeight('FALSE_MASTERY') < masteryPriorityWeight('DEVELOPING'))
check('DEVELOPING < TRUE_MASTERY', masteryPriorityWeight('DEVELOPING') < masteryPriorityWeight('TRUE_MASTERY'))
check('TRUE_MASTERY has highest weight (3)', masteryPriorityWeight('TRUE_MASTERY') === 3)
// All four weights are distinct (total ordering guarantee)
const weights = (['AT_RISK', 'FALSE_MASTERY', 'DEVELOPING', 'TRUE_MASTERY'] as MasteryLevel[]).map(masteryPriorityWeight)
check('all four weights are distinct', new Set(weights).size === 4)

console.log(`\n=== ${pass} passed, ${fail} failed ===\n`)
process.exit(fail === 0 ? 0 : 1)
