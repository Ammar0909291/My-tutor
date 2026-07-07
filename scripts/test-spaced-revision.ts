/**
 * Offline unit harness for getRevisionBadge + buildRevisionBlock in
 * src/lib/school/adaptive/spacedRevision.ts. Pure, no DB/network.
 *
 * Run with:  npx tsx scripts/test-spaced-revision.ts
 */

import { getRevisionBadge, buildRevisionBlock } from '../src/lib/school/adaptive/spacedRevision'
import type { RevisionState } from '../src/lib/school/adaptive/spacedRevision'

let passed = 0
let failed = 0
function check(name: string, cond: boolean) {
  if (cond) { passed++; console.log(`[✓ pass] ${name}`) }
  else { failed++; console.log(`[✗ FAIL] ${name}`) }
}

function state(overrides: Partial<RevisionState> = {}): RevisionState {
  return {
    nodeId: 'n1',
    subjectSlug: 'mathematics',
    title: 'Node 1',
    lastMasteredAt: null,
    nextReviewAt: null,
    reviewStrength: 0,
    reviewCount: 0,
    isDue: false,
    ...overrides,
  }
}

// ── getRevisionBadge ───────────────────────────────────────────────────────

check('empty states → null', getRevisionBadge([]) === null)

check('single state, not due, no mastery → null',
  getRevisionBadge([state()]) === null)

check('single state isDue=true → review_due',
  getRevisionBadge([state({ isDue: true })]) === 'review_due')

check('multiple states, one isDue=true → review_due',
  getRevisionBadge([state({ isDue: false }), state({ isDue: true }), state({ isDue: false })]) === 'review_due')

check('lastMasteredAt now → recently_mastered',
  getRevisionBadge([state({ lastMasteredAt: new Date() })]) === 'recently_mastered')

check('lastMasteredAt 1 day ago → recently_mastered',
  getRevisionBadge([state({ lastMasteredAt: new Date(Date.now() - 1 * 86400000) })]) === 'recently_mastered')

check('lastMasteredAt exactly 3 days ago (boundary, inclusive) → recently_mastered',
  getRevisionBadge([state({ lastMasteredAt: new Date(Date.now() - 3 * 86400000) })]) === 'recently_mastered')

check('lastMasteredAt 4 days ago (past boundary) → null',
  getRevisionBadge([state({ lastMasteredAt: new Date(Date.now() - 4 * 86400000) })]) === null)

check('lastMasteredAt null → null (no mastery signal)',
  getRevisionBadge([state({ lastMasteredAt: null })]) === null)

check('isDue=true takes priority over recently_mastered when both present',
  getRevisionBadge([state({ isDue: true, lastMasteredAt: new Date() })]) === 'review_due')

check('isDue=false, lastMasteredAt old AND none recent → null',
  getRevisionBadge([
    state({ lastMasteredAt: new Date(Date.now() - 10 * 86400000) }),
    state({ lastMasteredAt: new Date(Date.now() - 30 * 86400000) }),
  ]) === null)

check('mix of old-mastered and one recently-mastered → recently_mastered',
  getRevisionBadge([
    state({ lastMasteredAt: new Date(Date.now() - 10 * 86400000) }),
    state({ lastMasteredAt: new Date(Date.now() - 1 * 86400000) }),
  ]) === 'recently_mastered')

check('many states all false/null → null',
  getRevisionBadge([state(), state(), state(), state()]) === null)

// ── buildRevisionBlock ─────────────────────────────────────────────────────

check('empty dueStates → empty string', buildRevisionBlock([]) === '')

check('single due state → non-empty string',
  buildRevisionBlock([state({ title: 'Fractions' })]).length > 0)

check('single due state → contains concept title',
  buildRevisionBlock([state({ title: 'Fractions' })]).includes('Fractions'))

check('single due state → header present',
  buildRevisionBlock([state({ title: 'Fractions' })]).includes('DUE FOR REVIEW'))

check('two states → both titles joined with comma',
  buildRevisionBlock([state({ title: 'Fractions' }), state({ title: 'Decimals' })]).includes('Fractions, Decimals'))

check('four states → only first 3 titles included (slice(0,3))',
  buildRevisionBlock([
    state({ title: 'Alpha' }), state({ title: 'Beta' }), state({ title: 'Gamma' }), state({ title: 'Zeta' }),
  ]).includes('Alpha, Beta, Gamma') &&
  !buildRevisionBlock([
    state({ title: 'Alpha' }), state({ title: 'Beta' }), state({ title: 'Gamma' }), state({ title: 'Zeta' }),
  ]).includes('Zeta'))

check('exactly 3 states → all 3 included',
  buildRevisionBlock([
    state({ title: 'A' }), state({ title: 'B' }), state({ title: 'C' }),
  ]).includes('A, B, C'))

check('block mentions recall instruction',
  buildRevisionBlock([state({ title: 'X' })]).includes('recall'))

check('block does not instruct re-teaching from scratch',
  buildRevisionBlock([state({ title: 'X' })]).includes('Do NOT re-teach'))

check('block limits exchanges per concept',
  buildRevisionBlock([state({ title: 'X' })]).includes('3-4 exchanges'))

check('block is deterministic — same input twice gives same output',
  buildRevisionBlock([state({ title: 'X' })]) === buildRevisionBlock([state({ title: 'X' })]))

check('single-char title still works correctly',
  buildRevisionBlock([state({ title: 'Z' })]).includes('Concepts: Z'))

console.log(`\n=== ${passed} passed, ${failed} failed ===`)
process.exit(failed ? 1 : 0)
