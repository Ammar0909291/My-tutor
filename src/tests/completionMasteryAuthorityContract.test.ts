/**
 * P0-A — Completion must not claim mastery without mastery (2026-08-22).
 *
 * TRACE PERFORMED (per the investigation's own required lifecycle):
 *   ConversationState -> mastery evidence -> LessonAttemptOutcome
 *     -> recordConceptOutcome -> isConceptClosed -> lesson finalization
 *     -> completion response/UI
 *
 * FINDING: `isConceptClosed()` does indeed return true on EITHER
 * `hasDemonstratedMastery(state)` OR `evaluateConceptBudget(state).status
 * === 'exhausted'` — exactly as flagged. But "closed" and "mastered" are
 * NOT the same claim downstream, and the semantic contract that keeps them
 * apart is already fully implemented:
 *
 *   - `conceptOutcome()` (lessonSummary.ts) computes
 *     `status: mastered && !budget.markForReview ? 'mastered' : 'needs_review'`
 *     — every budget-exhaustion reason (turns/attempts/failures) sets
 *     `markForReview: true` (conceptBudget.ts's `evaluateConceptBudget`), so
 *     a concept that closes via budget exhaustion is ALWAYS recorded
 *     'needs_review', never 'mastered', regardless of `isConceptClosed`'s
 *     shared true/false gate.
 *   - `recordConceptOutcome()` (lessonAttempt.ts) routes on that same
 *     `outcome.status`, so an exhausted concept is folded into
 *     `conceptsNeedingReview`, never `conceptsMastered`.
 *   - `buildCompletionPayload()` (lessonCompletion.ts) sets
 *     `fullyMastered: summary.complete`, which is `needsReview.length === 0`
 *     — so `fullyMastered` is false whenever ANY concept closed by budget
 *     exhaustion rather than genuine evidence.
 *   - The UI (`LessonScreen.tsx`) renders a DIFFERENT label depending on
 *     `fullyMastered` (`lc_complete` vs `lc_finished`), so a learner is never
 *     told "mastered" for a lesson that only exhausted its budget.
 *   - `markConceptForReview` (not `markConceptMastered`) is the only writer
 *     reached for a budget-exhausted concept — TopicProgress cannot be
 *     silently marked MASTERED by exhaustion either.
 *
 * "Budget exhausted" is therefore an intentional, explicit REVIEW state
 * (P6's "never trap the learner" exit), never a masquerade for mastery —
 * already satisfying requirements 3, 5, 6, 7, 8 of the P0-A task exactly as
 * specified, with no code change required. This file locks that contract in
 * as an explicit regression suite (requirements A-E) so a future change
 * cannot silently reintroduce the conflation.
 */
import { describe, it, expect } from 'vitest'
import { initialConversationState, type ConversationState } from '@/lib/teaching/conversationState'
import { CONCEPT_TURN_BUDGET } from '@/lib/teaching/conceptBudget'
import {
  startLessonAttempt, recordConceptOutcome, summaryFromAttempt, isConceptClosed,
} from '@/lib/teaching/lessonAttempt'
import { buildCompletionPayload, requiredConceptsForLesson, shouldFinalizeLesson } from '@/lib/teaching/lessonCompletion'

function st(id: string, over: Partial<ConversationState> = {}): ConversationState {
  return { ...initialConversationState(id), ...over }
}
const mastered = (id: string) => st(id, { correctAtPractice: 2 })
const exhaustedNoEvidence = (id: string) =>
  st(id, { turnsOnConcept: CONCEPT_TURN_BUDGET, correctAtCheck: 0, correctAtPractice: 0 })
const T0 = new Date('2026-08-22T10:00:00Z')

describe('P0-A — A: genuine mastery -> completion allowed', () => {
  it('a mastered concept closes the lesson as fully mastered', () => {
    let a = recordConceptOutcome(startLessonAttempt('lesson:1', 'Fractions', T0), mastered('c1'))
    a = { ...a, status: 'COMPLETED' as const }
    const payload = buildCompletionPayload(a, summaryFromAttempt(a), 1)
    expect(payload.mastered).toEqual(['c1'])
    expect(payload.needsReview).toEqual([])
    expect(payload.fullyMastered).toBe(true)
  })
})

describe('P0-A — B: budget exhausted + no mastery evidence -> cannot claim mastered', () => {
  it('correctAtCheck=0, correctAtPractice=0, budget exhausted -> never counted as mastered', () => {
    const state = exhaustedNoEvidence('c1')
    expect(state.correctAtCheck).toBe(0)
    expect(state.correctAtPractice).toBe(0)
    const a = recordConceptOutcome(startLessonAttempt('lesson:1', null, T0), state)
    expect(a.conceptsMastered).toEqual([])
    expect(a.conceptsNeedingReview).toEqual(['c1'])
  })
})

describe('P0-A — C: budget exhausted + no mastery -> correct review state, never a false completion claim', () => {
  it('the completion payload reports needsReview honestly and fullyMastered=false', () => {
    const a = recordConceptOutcome(startLessonAttempt('lesson:1', null, T0), exhaustedNoEvidence('c1'))
    const payload = buildCompletionPayload(a, summaryFromAttempt(a), 1)
    expect(payload.mastered).toEqual([])
    expect(payload.needsReview).toEqual(['c1'])
    expect(payload.fullyMastered).toBe(false)
  })
})

describe('P0-A — D: mastery counters and final completion state agree', () => {
  it('a lesson with one mastered and one exhausted concept reports both consistently', () => {
    let a = recordConceptOutcome(startLessonAttempt('lesson:1', null, T0), mastered('c1'))
    a = recordConceptOutcome(a, exhaustedNoEvidence('c2'))
    const summary = summaryFromAttempt(a)
    const payload = buildCompletionPayload(a, summary, 1)
    // The counters (attempt.conceptsMastered/conceptsNeedingReview) and the
    // completion payload must never disagree about which concept is which.
    expect(payload.mastered).toEqual(a.conceptsMastered)
    expect(payload.needsReview).toEqual(a.conceptsNeedingReview)
    expect(payload.mastered).toContain('c1')
    expect(payload.needsReview).toContain('c2')
    expect(payload.fullyMastered).toBe(false)
    // isConceptClosed correctly reports BOTH as closed (the shared gate) —
    // but that shared gate is not what the completion payload reads for its
    // mastery claim, which is the whole point of this contract.
    expect(isConceptClosed(mastered('c1'))).toBe(true)
    expect(isConceptClosed(exhaustedNoEvidence('c2'))).toBe(true)
  })
})

describe('P0-A — E: existing successful completion remains unchanged', () => {
  it('a fully-mastered single-concept lesson finalizes exactly as before', () => {
    const conceptId = 'frac.addition'
    const state = mastered(conceptId)
    expect(isConceptClosed(state)).toBe(true)
    const opened = startLessonAttempt('lesson:3', 'Adding Fractions', T0)
    const folded = recordConceptOutcome(opened, state)
    const required = requiredConceptsForLesson(conceptId)
    expect(shouldFinalizeLesson(required, folded)).toBe(true)
    const payload = buildCompletionPayload(folded, summaryFromAttempt(folded), 3)
    expect(payload.complete).toBe(true)
    expect(payload.fullyMastered).toBe(true)
    expect(payload.mastered).toEqual([conceptId])
    expect(payload.needsReview).toEqual([])
  })
})
