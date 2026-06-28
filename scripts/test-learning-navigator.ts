/**
 * Offline unit harness for src/lib/school/navigation/learningNavigator.ts's
 * pure copy/prompt helpers (navigatorTitleForCurrentChapter,
 * buildNavigatorSystemPromptBlock). These take a fully-formed
 * LearningNavigatorAction and do no DB/orchestrator work, so they're
 * exercised directly with hand-built fixtures — no mocking needed.
 *
 * Run with:  npx tsx scripts/test-learning-navigator.ts
 */
import {
  navigatorTitleForCurrentChapter,
  buildNavigatorSystemPromptBlock,
} from '../src/lib/school/navigation/learningNavigator'
import type { LearningNavigatorAction } from '../src/lib/school/navigation/navigatorTypes'

let passed = 0
let failed = 0
function check(name: string, cond: boolean) {
  if (cond) { passed++; console.log(`[✓ pass] ${name}`) }
  else { failed++; console.log(`[✗ FAIL] ${name}`) }
}

function action(overrides: Partial<LearningNavigatorAction>): LearningNavigatorAction {
  return {
    type: 'continue_chapter',
    title: 'Continue',
    description: 'Pick up where you left off in this chapter.',
    reason: 'You were partway through this chapter.',
    urgency: 'low',
    estimatedMinutes: 12,
    expectedOutcome: 'Unlock next chapter',
    href: '/school/physics/chapter/1',
    source: 'chapter',
    ...overrides,
  }
}

// ── navigatorTitleForCurrentChapter ──────────────────────────────────────────
check('continue_chapter on the current chapter page → "Continue This Chapter"',
  navigatorTitleForCurrentChapter(action({ type: 'continue_chapter' })) === 'Continue This Chapter')

check('start_next_chapter on the current chapter page → "Start This Chapter"',
  navigatorTitleForCurrentChapter(action({ type: 'start_next_chapter' })) === 'Start This Chapter')

check('failed_assessment is unambiguous → null',
  navigatorTitleForCurrentChapter(action({ type: 'failed_assessment' })) === null)

check('prerequisite_gap is unambiguous → null',
  navigatorTitleForCurrentChapter(action({ type: 'prerequisite_gap' })) === null)

check('spaced_revision_due is unambiguous → null',
  navigatorTitleForCurrentChapter(action({ type: 'spaced_revision_due' })) === null)

check('weak_topic is unambiguous → null',
  navigatorTitleForCurrentChapter(action({ type: 'weak_topic' })) === null)

check('exam_readiness_risk is unambiguous → null',
  navigatorTitleForCurrentChapter(action({ type: 'exam_readiness_risk' })) === null)

check('mock_test_weakness is unambiguous → null',
  navigatorTitleForCurrentChapter(action({ type: 'mock_test_weakness' })) === null)

check('an unrecognized/daily-plan-only type string → null',
  navigatorTitleForCurrentChapter(action({ type: 'bridge_prerequisite' })) === null)

// ── buildNavigatorSystemPromptBlock ──────────────────────────────────────────
{
  const block = buildNavigatorSystemPromptBlock(action({
    title: 'Practice Weak Topic',
    reason: 'You missed 3 of the last 5 questions on Newton\'s Laws.',
    expectedOutcome: 'Improve topic mastery',
  }))

  check('prompt block includes the action title', block.includes('Practice Weak Topic'))
  check('prompt block includes the reason verbatim', block.includes('You missed 3 of the last 5 questions on Newton\'s Laws.'))
  check('prompt block includes the expected outcome', block.includes('Improve topic mastery'))
  check('prompt block includes the PRIMARY STUDENT GOAL header', block.includes('PRIMARY STUDENT GOAL'))
  check('prompt block instructs the tutor never to force the goal', block.includes('Never force it.'))
  check('prompt block is additive framing, not a directive to push the goal',
    block.includes('Tutor should support the goal naturally'))
}

console.log(`\n=== ${passed} passed, ${failed} failed ===\n`)
process.exit(failed === 0 ? 0 : 1)
