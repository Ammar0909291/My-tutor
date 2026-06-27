/**
 * Offline unit harness for getLessonPlanCardItems in
 * src/lib/school/adaptive/lessonPlanner.ts. Pure, no DB/network.
 *
 * Run with:  npx tsx scripts/test-lesson-plan-card-items.ts
 *
 * Focus: the windowing fix. When there are more than 4 items, the window
 * must always show exactly 4 (when at least 4 exist) while keeping the
 * current concept visible — including when current sits near the END of the
 * list, where the old code (start = currentIdx - 1, uncapped) could return
 * fewer than 4 items even though earlier items existed to fill the window.
 */

import { getLessonPlanCardItems } from '../src/lib/school/adaptive/lessonPlanner'
import type { LessonPlan, ConceptStatus } from '../src/lib/school/adaptive/lessonPlanner'

let passed = 0
let failed = 0
function check(name: string, cond: boolean) {
  if (cond) { passed++; console.log(`[✓ pass] ${name}`) }
  else { failed++; console.log(`[✗ FAIL] ${name}`) }
}

function concept(title: string, status: ConceptStatus['status']): ConceptStatus {
  return { nodeId: title, title, status }
}

function plan(overrides: Partial<LessonPlan> = {}): LessonPlan {
  return {
    currentChapter: 'Test Chapter',
    currentConcept: null,
    masteredConcepts: [],
    remainingConcepts: [],
    nextConcept: null,
    recommendedCheckpoint: false,
    recommendedPractice: false,
    estimatedCompletion: 0,
    ...overrides,
  }
}

// ── Empty plan → empty array ─────────────────────────────────────────────
check('empty plan → empty array', getLessonPlanCardItems(plan()).length === 0)

// ── At or below 4 items → all returned unchanged, order preserved ────────
{
  const p = plan({
    masteredConcepts: [concept('A', 'mastered')],
    currentConcept: concept('B', 'current'),
    remainingConcepts: [concept('C', 'remaining')],
  })
  const result = getLessonPlanCardItems(p)
  check('3 items → all 3 returned', result.length === 3)
  check('3 items → order preserved (mastered, current, remaining)',
    result[0].title === 'A' && result[1].title === 'B' && result[2].title === 'C')
}
{
  const p = plan({
    masteredConcepts: [concept('A', 'mastered'), concept('B', 'mastered')],
    currentConcept: concept('C', 'current'),
    remainingConcepts: [concept('D', 'remaining')],
  })
  check('exactly 4 items → all 4 returned', getLessonPlanCardItems(p).length === 4)
}

// ── No current concept, >4 items → first 4 returned ───────────────────────
{
  const p = plan({
    masteredConcepts: [concept('A', 'mastered'), concept('B', 'mastered')],
    remainingConcepts: [concept('C', 'remaining'), concept('D', 'remaining'), concept('E', 'remaining')],
  })
  const result = getLessonPlanCardItems(p)
  check('no current, 5 items → exactly 4 returned', result.length === 4)
  check('no current, 5 items → first 4 in order', result.map((r) => r.title).join(',') === 'A,B,C,D')
}

// ── REGRESSION: current near the START of a >4 list ────────────────────────
{
  const p = plan({
    currentConcept: concept('A', 'current'),
    remainingConcepts: [concept('B', 'remaining'), concept('C', 'remaining'), concept('D', 'remaining'), concept('E', 'remaining')],
  })
  const result = getLessonPlanCardItems(p)
  check('current at index 0, 5 total → exactly 4 returned', result.length === 4)
  check('current at index 0, 5 total → window is A,B,C,D', result.map((r) => r.title).join(',') === 'A,B,C,D')
}

// ── current in the MIDDLE of a >4 list → 1-before-current window ──────────
{
  const p = plan({
    masteredConcepts: [concept('A', 'mastered'), concept('B', 'mastered')],
    currentConcept: concept('C', 'current'),
    remainingConcepts: [concept('D', 'remaining'), concept('E', 'remaining'), concept('F', 'remaining')],
  })
  const result = getLessonPlanCardItems(p)
  check('current in middle (idx 2 of 6) → exactly 4 returned', result.length === 4)
  check('current in middle → window is B,C,D,E (1 before current)', result.map((r) => r.title).join(',') === 'B,C,D,E')
}

// ── REGRESSION: current near/at the END of a >4 list ───────────────────────
// Before the fix: start = currentIdx - 1 (uncapped) could overrun the array
// and return fewer than 4 items even though earlier items exist to fill it.
{
  const p = plan({
    masteredConcepts: [
      concept('A', 'mastered'), concept('B', 'mastered'), concept('C', 'mastered'), concept('D', 'mastered'),
    ],
    currentConcept: concept('E', 'current'),
  })
  const result = getLessonPlanCardItems(p)
  check('current is the LAST item (idx 4 of 5) → exactly 4 returned (not 2)', result.length === 4)
  check('current is the LAST item → window is B,C,D,E', result.map((r) => r.title).join(',') === 'B,C,D,E')
}
{
  const p = plan({
    masteredConcepts: [
      concept('A', 'mastered'), concept('B', 'mastered'), concept('C', 'mastered'),
      concept('D', 'mastered'), concept('E', 'mastered'),
    ],
    currentConcept: concept('F', 'current'),
  })
  const result = getLessonPlanCardItems(p)
  check('current is the LAST item of 6 → exactly 4 returned (not 2)', result.length === 4)
  check('current is the LAST item of 6 → window is C,D,E,F', result.map((r) => r.title).join(',') === 'C,D,E,F')
}

// ── Status labels are preserved correctly in the output ───────────────────
{
  const p = plan({
    masteredConcepts: [concept('A', 'mastered')],
    currentConcept: concept('B', 'current'),
    remainingConcepts: [concept('C', 'remaining')],
  })
  const result = getLessonPlanCardItems(p)
  check('status labels preserved', result[0].status === 'mastered' && result[1].status === 'current' && result[2].status === 'remaining')
}

// ── Window count is always min(4, total) whenever a current concept exists ─
// `all` is built as [...mastered, current, ...remaining], so to place current
// at a given index within `all`, mastered must have exactly that many items.
for (const total of [5, 6, 7, 8]) {
  for (let currentIdx = 0; currentIdx < total; currentIdx++) {
    const mastered = Array.from({ length: currentIdx }, (_, i) => concept(`m${i}`, 'mastered'))
    const remaining = Array.from({ length: total - 1 - currentIdx }, (_, i) => concept(`r${i}`, 'remaining'))
    const p = plan({
      masteredConcepts: mastered,
      currentConcept: concept('CUR', 'current'),
      remainingConcepts: remaining,
    })
    const result = getLessonPlanCardItems(p)
    check(`total=${total}, currentIdx=${currentIdx} → window length is exactly 4`, result.length === 4)
    check(`total=${total}, currentIdx=${currentIdx} → current is still in the window`,
      result.some((r) => r.title === 'CUR'))
  }
}

console.log(`\n=== ${passed} passed, ${failed} failed ===`)
process.exit(failed ? 1 : 0)
