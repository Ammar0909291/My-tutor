/**
 * THE DISPLAYED MASTERY COUNTERS AND THE AUTHORITATIVE VERDICT READ DIFFERENT
 * EVIDENCE. THIS FILE PROVES IT, DETERMINISTICALLY, THROUGH THE REAL MODULES.
 *
 * REPORTED (real account, twice, phys.qm.uncertainty-principle and
 * phys.mech.conservation-of-momentum):
 *
 *     checkCorrect 1/1 · practiceCorrect 2/2 · every graded answer correct
 *     mastery.verified false · mastered [] · needsReview [concept]
 *     fullyMastered false
 *
 * WHY IT IS NOT A CONTRADICTION IN THE ENGINE. `MasterySummary.checkCorrect` /
 * `.practiceCorrect` are `state.correctAtCheck` / `.correctAtPractice` — the
 * PLAIN counters, which advance on the model's own SIGNAL. `.verified` is
 * `conceptMasteryVerdict`, which (once `sawModernGrading` is set) reads only
 * `verifiedCorrectAtCheck` / `verifiedCorrectAtPractice`, and those advance
 * ONLY on `evidence.serverGraded === true` — correctness produced by
 * `gradeMcqAnswer` against an AUTHORED probe's stored `correctIndex`.
 *
 * So a lesson taught through free-response PROSE questions satisfies the
 * displayed counters and cannot satisfy the verdict — by design, and correctly:
 * nothing in that session was ever graded by the server. The defect is that the
 * payload renders one evidence identity beside a verdict computed from another,
 * with nothing in it that explains the gap.
 *
 * These tests DO NOT assert the desired behaviour. They pin the CURRENT,
 * measured behaviour so a fix can be proven to change exactly this and nothing
 * else. Nothing here loosens the gate.
 */
import { describe, it, expect } from 'vitest'
import {
  initialConversationState,
  advanceConversationState,
  type ConversationState,
  type TurnEvidence,
} from '@/lib/teaching/conversationState'
import { conceptMasteryVerdict, buildMasterySummary, masteryVerifiedStrict } from '@/lib/teaching/masteryGate'
import { conceptOutcome, buildLessonSummary } from '@/lib/teaching/lessonSummary'

/** A correct answer. `serverGraded` is the ONLY axis varied across these cases. */
function correctAnswer(serverGraded: boolean | undefined): TurnEvidence {
  return {
    askedQuestion: true,
    signalCorrect: true,
    recoveryFired: false,
    questionSanctioned: true,
    signalVerificationStatus: 'CLEAN',
    serverGraded,
  }
}

/** Drives the REAL fold from CHECK, the phase at which grading begins. */
function driveFromCheck(conceptId: string, turns: TurnEvidence[]): ConversationState {
  let s: ConversationState = { ...initialConversationState(conceptId), phase: 'CHECK', demonstrated: true }
  for (const t of turns) s = advanceConversationState(s, t)
  return s
}

describe('mastery counter / verdict divergence', () => {
  it('REPRODUCES the reported shape exactly: prose-graded session, counters met, verdict false', () => {
    const state = driveFromCheck('phys.qm.uncertainty-principle', [
      correctAnswer(false), correctAnswer(false), correctAnswer(false),
    ])

    // The plain counters reach the bar, and the ladder reaches TRANSFER.
    expect(state.phase).toBe('TRANSFER')
    expect(state.correctAtCheck).toBe(1)
    expect(state.correctAtPractice).toBe(2)

    // The verified counters — the only ones the verdict reads — never moved.
    expect(state.verifiedCorrectAtCheck).toBe(0)
    expect(state.verifiedCorrectAtPractice).toBe(0)

    // The legacy fallback is correctly declined: the session DID see modern
    // grading (serverGraded was supplied, as false), so it is not pre-feature.
    expect(state.sawModernGrading).toBe(true)
    expect(state.signalContradictions).toBe(0)
    expect(state.unauthoredKeyGrades).toBe(0)
    expect(masteryVerifiedStrict(state)).toBe(false)

    // THE PAYLOAD THE LEARNER SEES: requirements met beside verified false.
    const payload = buildMasterySummary(state, { completionSuppressed: false, gatePending: false })
    expect(payload.checkCorrect).toBe(payload.checkRequired)
    expect(payload.practiceCorrect).toBe(payload.practiceRequired)
    expect(payload.verified).toBe(false)

    // THE PERMANENT RECORD, matching the report field for field.
    const outcome = conceptOutcome(state, 'Heisenberg’s Uncertainty Principle')
    const summary = buildLessonSummary([outcome])
    expect(outcome.status).toBe('needs_review')
    expect(summary.mastered).toHaveLength(0)
    expect(summary.needsReview.map((o) => o.conceptId)).toEqual(['phys.qm.uncertainty-principle'])
    expect(summary.complete).toBe(false)

    // The honest reason ALREADY EXISTS on the outcome and is true here. It is
    // the one field that distinguishes this from an ordinary needs_review, and
    // it is the anchor any fix should build on rather than replace.
    expect(outcome.answeredButUnverified).toBe(true)
  })

  it('reproduces on the second reported concept, and on a MIXED session (check tapped, practice prose)', () => {
    const mixed = driveFromCheck('phys.mech.conservation-of-momentum', [
      correctAnswer(true), correctAnswer(false), correctAnswer(false),
    ])
    expect(mixed.correctAtCheck).toBe(1)
    expect(mixed.correctAtPractice).toBe(2)
    expect(mixed.verifiedCorrectAtCheck).toBe(1)
    expect(mixed.verifiedCorrectAtPractice).toBe(0)
    expect(conceptMasteryVerdict(mixed)).toBe(false)
    expect(conceptOutcome(mixed, 'Conservation of Momentum').answeredButUnverified).toBe(true)
  })

  it('CONTROL — an identical session graded against authored keys certifies', () => {
    const state = driveFromCheck('phys.qm.uncertainty-principle', [
      correctAnswer(true), correctAnswer(true), correctAnswer(true),
    ])
    expect(state.verifiedCorrectAtCheck).toBe(1)
    expect(state.verifiedCorrectAtPractice).toBe(2)
    expect(conceptMasteryVerdict(state)).toBe(true)
    expect(conceptOutcome(state, 'Uncertainty Principle').status).toBe('mastered')
    // A mastered concept has nothing to explain — the honest-reason field is
    // only ever meaningful for needs_review.
    expect(conceptOutcome(state, 'Uncertainty Principle').answeredButUnverified).toBe(false)
  })

  it('CONTROL — the pre-feature legacy fallback still certifies, so this is not a fallback regression', () => {
    const state = driveFromCheck('x', [
      correctAnswer(undefined), correctAnswer(undefined), correctAnswer(undefined),
    ])
    expect(state.sawModernGrading).toBe(false)
    expect(conceptMasteryVerdict(state)).toBe(true)
  })

  it('the divergence is caused by serverGraded ALONE — no other evidence axis differs', () => {
    const prose = driveFromCheck('c', [correctAnswer(false), correctAnswer(false), correctAnswer(false)])
    const graded = driveFromCheck('c', [correctAnswer(true), correctAnswer(true), correctAnswer(true)])
    // Same ladder, same plain counters, same absence of red flags.
    expect(prose.phase).toBe(graded.phase)
    expect(prose.correctAtCheck).toBe(graded.correctAtCheck)
    expect(prose.correctAtPractice).toBe(graded.correctAtPractice)
    expect(prose.signalContradictions).toBe(graded.signalContradictions)
    expect(prose.unauthoredKeyGrades).toBe(graded.unauthoredKeyGrades)
    expect(prose.teachingIntegrityUncertain).toBe(graded.teachingIntegrityUncertain)
    // Differing ONLY in the verified counters, and therefore in the verdict.
    expect(conceptMasteryVerdict(prose)).toBe(false)
    expect(conceptMasteryVerdict(graded)).toBe(true)
  })

  it('the verified counters can never exceed the plain ones (the fix must not break this)', () => {
    for (const a of [true, false, undefined]) {
      for (const b of [true, false, undefined]) {
        for (const c of [true, false, undefined]) {
          const s = driveFromCheck('c', [correctAnswer(a), correctAnswer(b), correctAnswer(c)])
          expect(s.verifiedCorrectAtCheck).toBeLessThanOrEqual(s.correctAtCheck)
          expect(s.verifiedCorrectAtPractice).toBeLessThanOrEqual(s.correctAtPractice)
        }
      }
    }
  })
})
