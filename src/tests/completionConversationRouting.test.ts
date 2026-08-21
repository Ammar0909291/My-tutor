/**
 * ROOT-CAUSE FIX — completion must not lock the conversation.
 *
 * Production evidence (Physics Lesson 33, Linear Momentum):
 *   A) a valid in-topic follow-up ("...what would their total momentum be?")
 *      answered with "You've already finished Linear Momentum... Press
 *      'Start next lesson'".
 *   B) "Explain thermodynamics" (cross-topic) ignored — same static
 *      reflection question repeated instead.
 *   C) "What is radiation" (cross-topic) — same reflection question.
 *   D) "What is the 55th element of the periodic table" (cross-subject) —
 *      same reflection question.
 *   E) The identical reflection text regardless of message content.
 *
 * Root cause: `lessonCompleted` was read as "no further content decision
 * may run for the rest of the conversation", with neither branch (D0a's
 * deterministic close, nor the always-injected "do NOT teach/ask" prompt
 * block feeding the filler-detector swap) ever inspecting the learner's new
 * message. decisionEngine.test.ts pins the Decision-Engine-level fix
 * (newIntentAfterCompletion yields D0a). This file pins:
 *   (1) the new pure prompt builder used to lift the block for genuine new
 *       intent, and
 *   (2) route.ts's WIRING — the new-intent signal is computed once excursion
 *       detection has run, is fed into the CUE understanding exactly like
 *       lessonCompleted, and gates the filler-detector swap — so a real
 *       answer is never overwritten with the canned reflection template.
 * This repo's existing convention for pinning route.ts-level invariants
 * that a full request-level harness doesn't exist for (see
 * lessonCompletionFinality.test.ts) is source-structure assertions against
 * the route file; this file follows the same idiom.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import {
  buildLessonCompleteBlock, buildLessonCompleteContinuationOverrideBlock,
} from '@/lib/teaching/lessonCompletion'
import { isGenuineQuestion } from '@/lib/understanding/readers/conversationReader'

const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')

describe('isGenuineQuestion — generic, subject-agnostic detector', () => {
  it('TEST GROUP A.1 — recognizes a valid in-topic follow-up question', () => {
    expect(isGenuineQuestion(
      'If a truck is moving at 30km/hr weighing 3 tons, and another truck is '
      + 'moving at 45km/hr but weighs 2 tons, what would be their total momentum?',
    )).toBe(true)
  })

  it('TEST GROUP A.2/A.3 — recognizes cross-topic and cross-subject questions', () => {
    expect(isGenuineQuestion('What is radiation')).toBe(true)
    expect(isGenuineQuestion('What is the 55th element of the periodic table')).toBe(true)
  })

  it('does not mark a bare acknowledgement or continuation request as a genuine question', () => {
    for (const m of ['Got it', 'Continue', 'Next', 'Go', 'Yes', 'OK', "I'm ready"]) {
      expect(isGenuineQuestion(m)).toBe(false)
    }
  })

  it('is empty-safe', () => {
    expect(isGenuineQuestion('')).toBe(false)
    expect(isGenuineQuestion('   ')).toBe(false)
  })
})

describe('buildLessonCompleteContinuationOverrideBlock — the override addendum', () => {
  it('instructs the model to actually answer, not refuse or repeat the close', () => {
    const block = buildLessonCompleteContinuationOverrideBlock()
    expect(block).toMatch(/answer it directly/i)
    expect(block).not.toMatch(/do NOT ask another question/i)
  })

  it('still forbids reopening the completed lesson as unfinished', () => {
    const block = buildLessonCompleteContinuationOverrideBlock()
    expect(block).toMatch(/do NOT treat.*unfinished/i)
    expect(block).toMatch(/do NOT reopen its mastery tracking/i)
  })

  it('the base completion block is unchanged — still forbids teaching/asking by default', () => {
    const block = buildLessonCompleteBlock()
    expect(block).toMatch(/do NOT teach anything new/i)
    expect(block).toMatch(/do NOT ask another question/i)
  })
})

describe('route.ts wiring — new-intent signal reaches every consumer', () => {
  it('the new-intent signal is computed after excursion detection has run', () => {
    const excursionAt = ROUTE.indexOf('excursionDecisionHoisted = excursionDecision')
    const signalAt = ROUTE.indexOf('lessonCompletionRespectsNewIntentHoisted = excursionDecision.state.active')
    expect(excursionAt).toBeGreaterThan(-1)
    expect(signalAt).toBeGreaterThan(excursionAt)
  })

  it('the signal considers excursion state, requested concept/topic, and genuine-question detection — not message phrase matching', () => {
    const signalAt = ROUTE.indexOf('lessonCompletionRespectsNewIntentHoisted = excursionDecision.state.active')
    const window = ROUTE.slice(signalAt, signalAt + 400)
    expect(window).toContain('requestedConceptIdThisTurn')
    expect(window).toContain('requestedTopicTitleThisTurn')
    expect(window).toContain('isGenuineQuestion(message)')
  })

  it('the override block is only injected when the signal is true', () => {
    const signalAt = ROUTE.indexOf('lessonCompletionRespectsNewIntentHoisted = excursionDecision.state.active')
    const window = ROUTE.slice(signalAt, signalAt + 700)
    expect(window).toContain('if (lessonCompletionRespectsNewIntentHoisted)')
    expect(window).toContain('buildLessonCompleteContinuationOverrideBlock')
  })

  it('the CUE input carries the new-intent signal exactly like lessonCompleted', () => {
    const cueAt = ROUTE.indexOf('lessonCompleted: lessonCompletedHoisted,')
    expect(cueAt).toBeGreaterThan(-1)
    expect(ROUTE.slice(cueAt, cueAt + 200)).toContain('newIntentAfterCompletion: lessonCompletionRespectsNewIntentHoisted')
  })

  it('the filler-detector swap (the repeated-reflection-question defect) is gated on the new-intent signal', () => {
    // This is the exact site that produced the byte-identical reflection
    // text for thermodynamics / radiation / periodic-table messages.
    const swapAt = ROUTE.indexOf("what's one thing you notice or find surprising about what we just covered?")
    expect(swapAt).toBeGreaterThan(-1)
    const guardWindow = ROUTE.slice(Math.max(0, swapAt - 800), swapAt)
    expect(guardWindow).toContain('!lessonCompletionRespectsNewIntentHoisted')
  })

  it('the deterministic SERVE_LESSON_COMPLETE close still exists and is still driven by the decision engine, not deleted', () => {
    // D0a was NOT deleted — it still governs turns with no new intent.
    expect(ROUTE).toContain('serveLessonComplete = dispatchPlanHoisted.executor === \'LESSON_COMPLETE\'')
  })
})
