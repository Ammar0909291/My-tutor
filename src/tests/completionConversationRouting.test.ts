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
  isQuestionAnnouncement,
} from '@/lib/teaching/lessonCompletion'
import { isGenuineQuestion } from '@/lib/understanding/readers/conversationReader'
import { detectFailureState } from '@/lib/teaching/recoveryGuard'

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

/**
 * F2 — production evidence (real black-box session, two different physics
 * lessons, one pre-existing-completion and one completed fresh in-session):
 * "I still dont understand this" / "hmm i dont understand this" /
 * "i dont understand this" / "I have one question" were each served the
 * byte-identical canned reflection question instead of being treated as new
 * intent, because none of isGenuineQuestion/requestedConceptId/
 * requestedTopicTitle/excursionActive fire on a plain confusion statement or
 * a bare announcement. See lessonCompletionRespectsNewIntentHoisted in
 * route.ts for the full signal and lessonCompletion.ts's
 * isQuestionAnnouncement() doc comment for why the fix is split across two
 * existing/new signals instead of one phrase list.
 */
describe('F2 fix — help-seeking statements after completion', () => {
  it('detectFailureState (recoveryGuard.ts, already computed every turn as recoveryKeyHoisted) classifies the confusion-statement family as a genuine failure state', () => {
    expect(detectFailureState('I still dont understand this')).not.toBeNull()
    expect(detectFailureState('hmm i dont understand this')).not.toBeNull()
    expect(detectFailureState('i dont understand this')).not.toBeNull()
    expect(detectFailureState("I don't understand this")).not.toBeNull()
    expect(detectFailureState("I'm confused")).not.toBeNull()
  })

  it('isQuestionAnnouncement recognizes an explicit "I have a/one question" announcement — the one production phrase the other five signals all miss', () => {
    expect(isQuestionAnnouncement('I have one question')).toBe(true)
    expect(isQuestionAnnouncement('I have a question')).toBe(true)
    expect(isQuestionAnnouncement("I've got a question")).toBe(true)
    expect(isQuestionAnnouncement('I have some questions')).toBe(true)
  })

  it('isQuestionAnnouncement does NOT fire on an ordinary acknowledgement — the negative-control requirement', () => {
    for (const m of ['ok', 'thanks', 'got it', 'okay, understood', 'Ok', 'Got it thanks']) {
      expect(isQuestionAnnouncement(m)).toBe(false)
    }
  })

  it('detectFailureState does NOT fire on an ordinary acknowledgement either — both new signals respect the negative control', () => {
    for (const m of ['ok', 'thanks', 'got it', 'okay, understood', 'Ok', 'Got it thanks']) {
      expect(detectFailureState(m)).toBeNull()
    }
  })

  it('the combined new-intent predicate (mirroring route.ts\'s OR chain) is true for every reproduced production failure', () => {
    const isNewIntentAfterCompletion = (message: string) =>
      isGenuineQuestion(message) || detectFailureState(message) !== null || isQuestionAnnouncement(message)

    expect(isNewIntentAfterCompletion('I still dont understand this')).toBe(true)
    expect(isNewIntentAfterCompletion('hmm i dont understand this')).toBe(true)
    expect(isNewIntentAfterCompletion('i dont understand this')).toBe(true)
    expect(isNewIntentAfterCompletion('I have one question')).toBe(true)
    expect(isNewIntentAfterCompletion("I'm confused")).toBe(true)
  })

  it('the combined predicate is false for a genuine acknowledgement — closing the lesson must still work', () => {
    const isNewIntentAfterCompletion = (message: string) =>
      isGenuineQuestion(message) || detectFailureState(message) !== null || isQuestionAnnouncement(message)

    for (const m of ['ok', 'thanks', 'got it', 'okay, understood']) {
      expect(isNewIntentAfterCompletion(m)).toBe(false)
    }
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

  it('the signal considers excursion state, requested concept/topic, and genuine-question detection', () => {
    const signalAt = ROUTE.indexOf('lessonCompletionRespectsNewIntentHoisted = excursionDecision.state.active')
    const window = ROUTE.slice(signalAt, signalAt + 400)
    expect(window).toContain('requestedConceptIdThisTurn')
    expect(window).toContain('requestedTopicTitleThisTurn')
    expect(window).toContain('isGenuineQuestion(message)')
  })

  it('F2 fix: the signal also considers recoveryKeyHoisted (an already-computed, generic distress/failure-state signal) and isQuestionAnnouncement (the one narrowly-scoped, completion-only detector added for this fix)', () => {
    const signalAt = ROUTE.indexOf('lessonCompletionRespectsNewIntentHoisted = excursionDecision.state.active')
    const window = ROUTE.slice(signalAt, signalAt + 400)
    expect(window).toContain('recoveryKeyHoisted !== null')
    expect(window).toContain('isQuestionAnnouncement(message)')
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
