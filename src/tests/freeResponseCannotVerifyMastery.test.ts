/**
 * THREAD 1 — a free-response answer the model self-grades cannot certify mastery.
 *
 * ── THE DEFECT (Phase 5 residual; the one class the DoD #13 matrix listed as
 *    NOT prevented) ─────────────────────────────────────────────────────────
 * The verified counters (`verifiedCorrectAtCheck`/`verifiedCorrectAtPractice`)
 * are the completion authority (`masteryVerifiedStrict`). The fold USED to grant
 * a verified credit whenever `signalVerificationStatus` was CLEAN (or undefined)
 * and the grade was not against a MODEL-INVENTED key — both ABSENCE tests. A
 * genuinely free-response prose answer has NO answer key at all, so the
 * invented-key test passes vacuously; the model self-reports correctness; and
 * signalVerification returns CLEAN for any plausible, non-bare, non-hedged,
 * non-instant wrong answer. So a WRONG free-response answer the model marked
 * correct banked a verified credit and could certify strict mastery on nothing
 * but the model's self-report.
 *
 * ── THE FIX ─────────────────────────────────────────────────────────────────
 * A verified credit now requires POSITIVE provenance — `serverGraded === true`,
 * meaning the correctness came from `gradeMcqAnswer` against an AUTHORED probe's
 * stored key (route: `gradedAgainstServerKey`). And a MODERN prose-only session
 * (which is state-shape-identical to a pre-feature snapshot) can no longer slip
 * through `masteryVerifiedStrict`'s legacy plain-counter fallback, because the
 * fold marks it `sawModernGrading`.
 *
 * This file drives the REAL fold and the REAL gate and asserts the architecture
 * now PREVENTS the class, for both a pure-prose lesson and a mixed one.
 */
import { describe, it, expect } from 'vitest'
import {
  initialConversationState, advanceConversationState, type ConversationState, type TurnEvidence,
} from '@/lib/teaching/conversationState'
import { masteryVerifiedStrict, conceptMasteryVerdict } from '@/lib/teaching/masteryGate'

const ev = (o: Partial<TurnEvidence>) => o as TurnEvidence

/** Open the delivery phases the way a real lesson does, landing at CHECK. */
function opened(): ConversationState {
  let s = initialConversationState('phys.mech.friction')
  s = advanceConversationState(s, ev({ askedQuestion: false, signalCorrect: null, recoveryFired: false, acknowledgement: true }))
  s = advanceConversationState(s, ev({ askedQuestion: false, signalCorrect: null, recoveryFired: false, acknowledgement: true, deliveredTeaching: true }))
  s = advanceConversationState(s, ev({ askedQuestion: false, signalCorrect: null, recoveryFired: false, acknowledgement: true }))
  return s
}

/** A prose answer the model marks correct — clean self-report, NO server grade. */
const proseCorrect = ev({
  askedQuestion: true, signalCorrect: true, recoveryFired: false,
  signalVerificationStatus: 'CLEAN', serverGraded: false,
})
/** The same, but graded against an authored probe key. */
const serverCorrect = ev({
  askedQuestion: true, signalCorrect: true, recoveryFired: false,
  signalVerificationStatus: 'CLEAN', serverGraded: true,
})

describe('a self-graded prose answer banks the plain credit but never the verified one', () => {
  it('at CHECK: plain moves, verified does not', () => {
    const next = advanceConversationState({ ...opened(), phase: 'CHECK' }, proseCorrect)
    expect(next.correctAtCheck).toBe(1)
    expect(next.verifiedCorrectAtCheck).toBe(0)
  })

  it('a server-graded answer at the same phase DOES bank the verified credit', () => {
    const next = advanceConversationState({ ...opened(), phase: 'CHECK' }, serverCorrect)
    expect(next.correctAtCheck).toBe(1)
    expect(next.verifiedCorrectAtCheck).toBe(1)
  })
})

describe('a lesson answered ENTIRELY through self-graded prose cannot certify', () => {
  // Walk a full ladder on prose only: plain counters reach the bar
  // (check>=1, practice>=2) but no verified evidence exists.
  function proseOnlyLesson(): ConversationState {
    let s = { ...opened(), phase: 'CHECK' as const }
    s = advanceConversationState(s, proseCorrect) // CHECK -> PRACTICE
    s = advanceConversationState(s, proseCorrect) // PRACTICE (1)
    s = advanceConversationState(s, proseCorrect) // PRACTICE (2) -> TRANSFER
    return s
  }

  it('the plain ladder reached the bar (the lesson did not stall)', () => {
    const s = proseOnlyLesson()
    expect(s.correctAtCheck).toBeGreaterThanOrEqual(1)
    expect(s.correctAtPractice).toBeGreaterThanOrEqual(2)
  })

  it('but strict mastery is REFUSED — no server-verified evidence, and the modern-grading marker denies the legacy plain-counter fallback', () => {
    const s = proseOnlyLesson()
    expect(s.verifiedCorrectAtCheck).toBe(0)
    expect(s.verifiedCorrectAtPractice).toBe(0)
    expect(s.sawModernGrading).toBe(true)
    expect(masteryVerifiedStrict(s)).toBe(false)
    expect(conceptMasteryVerdict(s)).toBe(false)
  })
})

describe('a mixed lesson is certified on the server-graded evidence alone', () => {
  it('one prose credit plus THREE server grades certifies; swapping any server grade for prose does not', () => {
    // CHECK on a server grade, two PRACTICE on server grades -> verified 1/2.
    let s = { ...opened(), phase: 'CHECK' as const }
    s = advanceConversationState(s, serverCorrect) // CHECK verified -> PRACTICE
    s = advanceConversationState(s, serverCorrect) // PRACTICE verified (1)
    s = advanceConversationState(s, serverCorrect) // PRACTICE verified (2) -> TRANSFER
    expect(s.verifiedCorrectAtCheck).toBe(1)
    expect(s.verifiedCorrectAtPractice).toBe(2)
    expect(masteryVerifiedStrict(s)).toBe(true)

    // Now the same shape but the CHECK credit was prose: verified check 0.
    let p = { ...opened(), phase: 'CHECK' as const }
    p = advanceConversationState(p, proseCorrect)  // CHECK plain-only -> PRACTICE
    p = advanceConversationState(p, serverCorrect) // PRACTICE verified (1)
    p = advanceConversationState(p, serverCorrect) // PRACTICE verified (2) -> TRANSFER
    expect(p.verifiedCorrectAtCheck).toBe(0)
    expect(masteryVerifiedStrict(p)).toBe(false)
  })
})

describe('a genuinely pre-feature session is unaffected (behavior-preserving)', () => {
  it('plain counters with no modern-grading marker still certify via the legacy fallback', () => {
    // A raw snapshot from before verified counters / serverGraded existed: it
    // never went through the modern fold, so sawModernGrading is false and the
    // plain-counter fallback still applies — exactly as before this change.
    const legacy: ConversationState = {
      ...initialConversationState('phys.mech.friction'),
      phase: 'TRANSFER', correctAtCheck: 1, correctAtPractice: 2,
      verifiedCorrectAtCheck: 0, verifiedCorrectAtPractice: 0,
      sawModernGrading: false,
    }
    expect(masteryVerifiedStrict(legacy)).toBe(true)
  })
})
