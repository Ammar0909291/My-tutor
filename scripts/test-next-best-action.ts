/**
 * Standalone test harness for pure functions in nextBestAction.ts.
 * No DB, no network. Run with:  npx tsx scripts/test-next-best-action.ts
 *
 * Covers:
 *   getChapterNextStep — 3-state learning path machine.
 *   nextActionHref — URL builder for all 4 action types.
 *   NEXT_ACTION_LABELS — all 4 entries present with non-empty heading + cta.
 */

import {
  getChapterNextStep,
  nextActionHref,
  NEXT_ACTION_LABELS,
  type NextBestAction,
  type NextActionType,
} from '../src/lib/school/adaptive/nextBestAction'

let pass = 0
let fail = 0
function check(name: string, cond: boolean, extra?: string) {
  if (cond) pass++
  else fail++
  console.log(`[${cond ? '✓ pass' : '✗ FAIL'}] ${name}${extra && !cond ? `  — ${extra}` : ''}`)
}

// ── getChapterNextStep ────────────────────────────────────────────────────────

console.log('\n=== getChapterNextStep ===\n')

// Assessment passed + has next chapter → next_chapter
check('assessmentPassed + hasNextChapter → next_chapter',
  getChapterNextStep({ practiceStatus: 'not_started', assessmentPassed: true }, true) === 'next_chapter')

// Assessment passed + no next chapter → null (end of subject)
check('assessmentPassed + no next chapter → null',
  getChapterNextStep({ practiceStatus: 'mastered', assessmentPassed: true }, false) === null)

// Assessment NOT passed + practice not_started → practice first
check('not passed + practice=not_started → practice',
  getChapterNextStep({ practiceStatus: 'not_started', assessmentPassed: false }, true) === 'practice')
check('not passed + practice=not_started → practice (no next chapter same result)',
  getChapterNextStep({ practiceStatus: 'not_started', assessmentPassed: false }, false) === 'practice')

// Assessment NOT passed + practice in_progress → assessment
check('not passed + practice=in_progress → assessment',
  getChapterNextStep({ practiceStatus: 'in_progress', assessmentPassed: false }, true) === 'assessment')

// Assessment NOT passed + practice mastered → assessment (mastered counts as done → move to assess)
check('not passed + practice=mastered → assessment',
  getChapterNextStep({ practiceStatus: 'mastered', assessmentPassed: false }, true) === 'assessment')

// ── nextActionHref ────────────────────────────────────────────────────────────

console.log('\n── nextActionHref ──\n')

const makeAction = (type: NextActionType, chapterId = 'ch1'): NextBestAction => ({
  type,
  subjectSlug: 'mathematics',
  subjectLabel: 'Mathematics',
  chapterId,
  title: 'Test Chapter',
  reason: null,
})

const base = '/school/mathematics/chapter/ch1'

check('retake_assessment → base/assessment',
  nextActionHref(makeAction('retake_assessment')) === `${base}/assessment`)
check('practice_weak → base (no suffix)',
  nextActionHref(makeAction('practice_weak')) === base)
check('continue_chapter → base (default)',
  nextActionHref(makeAction('continue_chapter')) === base)
check('start_next_chapter → base (default)',
  nextActionHref(makeAction('start_next_chapter')) === base)

// chapterId with special chars is percent-encoded
const encodedAction = makeAction('continue_chapter', 'ch 1/a')
check('chapterId with space/slash is percent-encoded',
  nextActionHref(encodedAction).includes(encodeURIComponent('ch 1/a')))

// ── NEXT_ACTION_LABELS ────────────────────────────────────────────────────────

console.log('\n── NEXT_ACTION_LABELS ──\n')

const expectedTypes: NextActionType[] = ['retake_assessment', 'practice_weak', 'continue_chapter', 'start_next_chapter']
for (const type of expectedTypes) {
  const entry = NEXT_ACTION_LABELS[type]
  check(`${type} entry exists`, entry !== undefined)
  check(`${type} heading is non-empty`, typeof entry?.heading === 'string' && entry.heading.length > 0)
  check(`${type} cta is non-empty`, typeof entry?.cta === 'string' && entry.cta.length > 0)
}

console.log(`\n=== ${pass} passed, ${fail} failed ===\n`)
process.exit(fail === 0 ? 0 : 1)
