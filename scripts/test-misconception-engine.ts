/**
 * Standalone test harness for pure functions in misconceptionEngine.ts.
 * No DB, no network. Run with:  npx tsx scripts/test-misconception-engine.ts
 *
 * Covers:
 *   buildMisconceptionBlock — confidence filter (LOW excluded), slice(0,2),
 *     guard text, empty return on all-LOW input.
 *   buildRemediationStrategy — label header, step list, strategy guard.
 */

import {
  buildMisconceptionBlock,
  buildRemediationStrategy,
  type Misconception,
  type MisconceptionConfidence,
} from '../src/lib/school/adaptive/misconceptionEngine'

let pass = 0
let fail = 0
function check(name: string, cond: boolean, extra?: string) {
  if (cond) pass++
  else fail++
  console.log(`[${cond ? '✓ pass' : '✗ FAIL'}] ${name}${extra && !cond ? `  — ${extra}` : ''}`)
}

const makeMisconception = (
  confidence: MisconceptionConfidence,
  type = 'test_type',
  label = 'Test Label',
): Misconception => ({
  type,
  label,
  description: `description for ${type}`,
  confidence,
  evidenceCount: 3,
  remediationSteps: ['Step A', 'Step B', 'Step C'],
})

// ── buildMisconceptionBlock ───────────────────────────────────────────────────

console.log('\n=== buildMisconceptionBlock ===\n')

// Empty input → empty string
check('empty array → empty string', buildMisconceptionBlock([]) === '')

// All LOW confidence → empty string (LOW is filtered out)
check('all LOW confidence → empty string (LOW excluded)',
  buildMisconceptionBlock([makeMisconception('LOW'), makeMisconception('LOW')]) === '')

// Single MEDIUM → non-empty block
const medBlock = buildMisconceptionBlock([makeMisconception('MEDIUM')])
check('single MEDIUM → non-empty block', medBlock.length > 0)
check('MEDIUM block contains "MISCONCEPTION ALERT" header', medBlock.includes('MISCONCEPTION ALERT'))
check('MEDIUM block contains the description', medBlock.includes('description for test_type'))
check('MEDIUM block contains confidence level', medBlock.includes('MEDIUM'))
check('MEDIUM block ends with guard text',
  medBlock.includes('Do not reference this alert explicitly'))

// Single HIGH → non-empty block
const highBlock = buildMisconceptionBlock([makeMisconception('HIGH')])
check('single HIGH → non-empty block', highBlock.length > 0)
check('HIGH block contains "HIGH confidence"', highBlock.includes('HIGH confidence'))

// Mixed LOW + HIGH → LOW item excluded, HIGH item present
const mixed = buildMisconceptionBlock([makeMisconception('LOW', 'low_type'), makeMisconception('HIGH', 'high_type')])
check('mixed LOW+HIGH → LOW item description absent', !mixed.includes('description for low_type'))
check('mixed LOW+HIGH → HIGH item description present', mixed.includes('description for high_type'))

// Three MEDIUM misconceptions → slice(0,2): only first two appear
const three = buildMisconceptionBlock([
  makeMisconception('MEDIUM', 'first'),
  makeMisconception('MEDIUM', 'second'),
  makeMisconception('MEDIUM', 'third'),
])
check('three MEDIUM → first description present', three.includes('description for first'))
check('three MEDIUM → second description present', three.includes('description for second'))
check('three MEDIUM → third description ABSENT (slice(0,2))', !three.includes('description for third'))

// LOW item among HIGH/MEDIUM: LOW must not appear
const lowAmongHigh = buildMisconceptionBlock([
  makeMisconception('HIGH', 'h1'),
  makeMisconception('LOW', 'l1'),
  makeMisconception('MEDIUM', 'm1'),
])
check('LOW item does not appear when HIGH/MEDIUM also present', !lowAmongHigh.includes('description for l1'))

// ── buildRemediationStrategy ──────────────────────────────────────────────────

console.log('\n── buildRemediationStrategy ──\n')

const rem = buildRemediationStrategy(makeMisconception('HIGH', 'algebra_sign', 'Algebra Sign Errors'))
check('remediation block is non-empty', rem.length > 0)
check('remediation block contains label in header', rem.includes('Algebra Sign Errors'))
check('remediation block contains "REMEDIATION STRATEGY" header', rem.includes('REMEDIATION STRATEGY'))
check('remediation block contains first step', rem.includes('- Step A'))
check('remediation block contains second step', rem.includes('- Step B'))
check('remediation block contains third step', rem.includes('- Step C'))
check('remediation block ends with strategy guard',
  rem.includes('do not recite them as a list'))

// Empty remediationSteps → still returns a block (no crash)
const emptySteps: Misconception = { ...makeMisconception('MEDIUM'), remediationSteps: [] }
const remEmpty = buildRemediationStrategy(emptySteps)
check('empty remediationSteps → non-empty block (header still present)', remEmpty.length > 0)
check('empty remediationSteps → guard still present', remEmpty.includes('do not recite them as a list'))

console.log(`\n=== ${pass} passed, ${fail} failed ===\n`)
process.exit(fail === 0 ? 0 : 1)
