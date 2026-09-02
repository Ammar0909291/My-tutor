/**
 * A KEY THE MODEL WROTE MUST NEVER REACH THE *VERIFIED* COUNTERS.
 *
 * ── THE DEFECT, MEASURED AGAINST THE REAL MODULES ───────────────────────────
 * `advanceConversationState` computed
 *
 *   const verified = signalVerificationStatus === 'CLEAN' || undefined
 *
 * reading only the model's self-report and never `evidence.unauthoredKey`. So
 * a grade against an answer key THE MODEL INVENTED incremented
 * `verifiedCorrectAtCheck` / `verifiedCorrectAtPractice` — the two counters
 * `masteryVerifiedStrict` exists to trust — provided the model also reported
 * CLEAN, which a model confident enough to invent a key generally does.
 *
 * A lesson in which EVERY graded item's key was invented measured:
 *
 *   check 1 / practice 2       verifiedCheck 1 / verifiedPractice 2
 *   unauthoredKeyGrades 4
 *   masteryVerifiedStrict  TRUE
 *   launderedEvidence      FALSE
 *   conceptOutcome.status  'mastered'
 *
 * A full false certification, on nothing but the model's own arithmetic. This
 * is not hypothetical: production logs `unauthored-key-not-certifying` on real
 * physics lessons, and an earlier run recorded a model keying 7.9 N where
 * μ·mg·cos30 = 10.4 N — a value not even among its own four options.
 *
 * ── AND IT DEFEATED THE GUARD WRITTEN FOR IT, CIRCULARLY ────────────────────
 * `launderedEvidence` asks "was a key invented AND is strict mastery unmet?".
 * Strict mastery was met BY the invented grades it is meant to distrust, so
 * the guard returned false exactly when it was needed. It only ever bit in the
 * narrower case where an invented grade ALSO failed signal verification —
 * which is how it appeared to work when it was written.
 *
 * ── WHAT IS DELIBERATELY UNCHANGED ──────────────────────────────────────────
 * The PLAIN counters still advance and the ladder still moves, so a lesson
 * does not stall on an invented question — that is what `unauthoredKeyGrades`
 * records separately, "counted, never credited". Only the STRICT counters
 * change, and they now mean what their name says: evidence from a key the
 * SERVER owns.
 */
import { describe, it, expect } from 'vitest'
import {
  initialConversationState, advanceConversationState, type ConversationState,
} from '@/lib/teaching/conversationState'
import {
  masteryVerifiedStrict, launderedEvidence, buildMasterySummary,
} from '@/lib/teaching/masteryGate'
import { conceptOutcome } from '@/lib/teaching/lessonSummary'

const ev = (o: Record<string, unknown>) => o as Parameters<typeof advanceConversationState>[1]

/** Four correct graded answers, all keyed as `invented`, all self-reported CLEAN. */
function lesson(invented: boolean): ConversationState {
  let s: ConversationState = initialConversationState('phys.mech.friction')
  s = advanceConversationState(s, ev({ askedQuestion: false, signalCorrect: null, recoveryFired: false, acknowledgement: true }))
  s = advanceConversationState(s, ev({ askedQuestion: false, signalCorrect: null, recoveryFired: false, acknowledgement: true, deliveredTeaching: true }))
  for (const _ of [1, 2, 3, 4]) {
    s = advanceConversationState(s, ev({
      askedQuestion: true, signalCorrect: true, recoveryFired: false,
      // An authored key IS a server-owned grade; an invented one is not.
      // Thread 1's `serverGraded` requirement closes the invented-key case by a
      // second, independent road (no server grade) alongside `unauthoredKey`.
      unauthoredKey: invented, serverGraded: !invented, signalVerificationStatus: 'CLEAN',
    }))
  }
  return s
}

const payloadVerified = (s: ConversationState) =>
  buildMasterySummary(s, { completionSuppressed: false, gatePending: false }).verified

// ═══════════════════════════════════════════════════════════════════════════
// A. THE FALSE CERTIFICATION IS CLOSED
// ═══════════════════════════════════════════════════════════════════════════
describe('A. a lesson graded entirely on invented keys certifies nothing', () => {
  const s = lesson(true)

  it('the verified counters stay at zero', () => {
    expect(s.verifiedCorrectAtCheck ?? 0).toBe(0)
    expect(s.verifiedCorrectAtPractice ?? 0).toBe(0)
  })

  it('the strict authority refuses it', () => {
    expect(masteryVerifiedStrict(s)).toBe(false)
  })

  it('the guard is no longer defeated by the evidence it distrusts', () => {
    expect(s.unauthoredKeyGrades).toBe(4)
    expect(launderedEvidence(s)).toBe(true)
  })

  it('and neither the record nor the payload claims mastery', () => {
    expect(conceptOutcome(s, 'Friction Forces').status).toBe('needs_review')
    expect(payloadVerified(s)).toBe(false)
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// B. THE LADDER STILL MOVES — an invented question must not stall a lesson
// ═══════════════════════════════════════════════════════════════════════════
describe('B. the plain counters and the phase are deliberately untouched', () => {
  const s = lesson(true)

  it('the learner still reaches TRANSFER and is not stuck', () => {
    expect(s.phase).toBe('TRANSFER')
  })

  it('the plain counters still advance — counted, never credited', () => {
    expect(s.correctAtCheck).toBe(1)
    expect(s.correctAtPractice).toBe(2)
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// C. NO REGRESSION FOR AN ORDINARY LESSON — the case that must not break
// ═══════════════════════════════════════════════════════════════════════════
describe('C. an authored lesson certifies exactly as before', () => {
  const s = lesson(false)

  it('verified counters track the plain ones', () => {
    expect(s.verifiedCorrectAtCheck).toBe(1)
    expect(s.verifiedCorrectAtPractice).toBe(2)
  })

  it('strict mastery is met, the guard is inert, both authorities agree', () => {
    expect(masteryVerifiedStrict(s)).toBe(true)
    expect(launderedEvidence(s)).toBe(false)
    expect(conceptOutcome(s, 'Friction Forces').status).toBe('mastered')
    expect(payloadVerified(s)).toBe(true)
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// D. A MIXED LESSON IS JUDGED ON THE AUTHORED EVIDENCE ALONE
// ═══════════════════════════════════════════════════════════════════════════
describe('D. mixed evidence', () => {
  it('an invented grade at CHECK cannot be laundered by authored practice', () => {
    let s: ConversationState = initialConversationState('phys.mech.friction')
    s = advanceConversationState(s, ev({ askedQuestion: false, signalCorrect: null, recoveryFired: false, acknowledgement: true }))
    s = advanceConversationState(s, ev({ askedQuestion: false, signalCorrect: null, recoveryFired: false, acknowledgement: true, deliveredTeaching: true }))
    // GUIDE -> CHECK (credits nothing), then an INVENTED grade AT CHECK,
    // then two authored PRACTICE grades.
    s = advanceConversationState(s, ev({ askedQuestion: true, signalCorrect: true, recoveryFired: false, unauthoredKey: false, signalVerificationStatus: 'CLEAN' }))
    s = advanceConversationState(s, ev({ askedQuestion: true, signalCorrect: true, recoveryFired: false, unauthoredKey: true, signalVerificationStatus: 'CLEAN' }))
    s = advanceConversationState(s, ev({ askedQuestion: true, signalCorrect: true, recoveryFired: false, unauthoredKey: false, signalVerificationStatus: 'CLEAN' }))
    s = advanceConversationState(s, ev({ askedQuestion: true, signalCorrect: true, recoveryFired: false, unauthoredKey: false, signalVerificationStatus: 'CLEAN' }))
    // The CHECK credit came from an invented key, so strict mastery is unmet
    // however much authored practice follows.
    expect(s.verifiedCorrectAtCheck ?? 0).toBe(0)
    expect(masteryVerifiedStrict(s)).toBe(false)
    expect(conceptOutcome(s, 'Friction Forces').status).toBe('needs_review')
  })
})
