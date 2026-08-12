/**
 * A LESSON MUST BE COMPLETABLE.
 *
 * ── THE MEASURED FAILURE ────────────────────────────────────────────────────
 * Corpus audit, driving Topic 2 (`phys.meas.dimensions`) toward its mastery
 * gate. Clean session, real production, real learner account, every answer
 * correct and confirmed as correct by the tutor:
 *
 *   turn 1  "a dimension is the type of quantity, like length is L, not the
 *            unit we measure it in"                     → phase OBSERVE, 0, 0
 *   turn 2  "yes, i am ready"                           → phase OBSERVE, 0, 0
 *   turn 3  "the dimension of area is L squared, because it is length times
 *            length"                                    → phase OBSERVE, 0, 0
 *
 * The ladder never moved. `correctAtCheck` only increments at phase CHECK and
 * `correctAtPractice` only at PRACTICE, so a ladder that cannot climb means
 * `masteryVerifiedStrict` can never be true and NO LESSON IS EVER COMPLETABLE
 * — which matches `completedLessons: []` across the whole audit.
 *
 * ── THE ROOT CAUSE, REPRODUCED WITH NO PROVIDER AND NO DATABASE ─────────────
 * `demonstrated` was set only inside the `else` of `if (askedQuestion)` — i.e.
 * the code equated ASKING with NOT TEACHING. Good tutoring does both in one
 * breath: explain, then end on a question, which is what every measured
 * production turn did. So `demonstrated` was never set, and DEMONSTRATE→GUIDE
 * is gated on it.
 *
 * An earlier fix (the "reachability law" in conversationState.ts) had already
 * found DEMONSTRATE absorbing and hoisted the transition out of the `succeeded`
 * branch — but left it gated on this flag, so the freeze survived in a
 * different form. That is why this file asserts REACHABILITY end to end rather
 * than any single transition: a test on one edge is exactly what let the
 * previous repair look complete.
 *
 * ── WHAT THIS FIX DOES NOT DO ───────────────────────────────────────────────
 * It does not lower the mastery bar. `demonstrated` asserts that the TEACHER
 * delivered, never that the learner learned. The learner gates still move only
 * on real correct answers, and the tests below pin that explicitly.
 */
import { describe, it, expect } from 'vitest'
import {
  initialConversationState,
  advanceConversationState,
  decideNextMove,
} from '@/lib/teaching/conversationState'
import type { ConversationState } from '@/lib/teaching/conversationState'
import { masteryVerifiedStrict, MASTERY_PRACTICE_REQUIRED } from '@/lib/teaching/masteryGate'

const CONCEPT = 'phys.meas.dimensions'

type Turn = {
  signalCorrect?: boolean | null
  askedQuestion?: boolean
  deliveredTeaching?: boolean
  degradedTurn?: boolean
  acknowledgement?: boolean
}

function play(turns: Turn[]): ConversationState {
  let s = initialConversationState(CONCEPT)
  for (const t of turns) {
    s = advanceConversationState(s, {
      askedQuestion: true,
      signalCorrect: null,
      recoveryFired: false,
      learnerRequest: null,
      misconceptionDetected: false,
      isPriorKnowledgeProbe: false,
      ...t,
    })
  }
  return s
}

/** The real shape of a tutoring turn: it teaches AND ends on a question. */
const TEACH_AND_ASK: Turn = { signalCorrect: true, askedQuestion: true, deliveredTeaching: true }

describe('the ladder reaches mastery on the shape real turns actually have', () => {
  it('a learner who answers correctly can complete a lesson', () => {
    // THE ANTI-REGRESSION ANCHOR. Every other assertion in this file could
    // pass while the product remained uncompletable; this one cannot.
    const s = play(Array(8).fill(TEACH_AND_ASK))
    expect(s.phase).toBe('TRANSFER')
    expect(s.correctAtCheck).toBeGreaterThanOrEqual(1)
    expect(s.correctAtPractice).toBeGreaterThanOrEqual(MASTERY_PRACTICE_REQUIRED)
    expect(masteryVerifiedStrict(s)).toBe(true)
  })

  it('DEMONSTRATE is not absorbing when the turn taught and asked', () => {
    // The exact edge the earlier repair left gated. Named separately so a
    // future regression says WHICH rung froze, not merely "not completable".
    const s = play([TEACH_AND_ASK, TEACH_AND_ASK])
    expect(s.phase).not.toBe('DEMONSTRATE')
    expect(s.demonstrated).toBe(true)
  })

  it('the engine itself decides `show` at DEMONSTRATE, so the fix engages', () => {
    // Without this, the fix would depend on a move the engine never chooses —
    // correct in isolation and inert in production.
    const stuck = { ...initialConversationState(CONCEPT), phase: 'DEMONSTRATE' as const, demonstrated: false }
    expect(decideNextMove(stuck, {} as never)).toBe('show')
  })
})

describe('the mastery bar is unchanged', () => {
  it('teaching alone never grants mastery — only correct answers do', () => {
    // Eight delivered teach turns with NO correct answer. Delivery phases may
    // advance; the gates must not.
    const s = play(Array(8).fill({ signalCorrect: null, askedQuestion: true, deliveredTeaching: true }))
    expect(s.correctAtCheck).toBe(0)
    expect(s.correctAtPractice).toBe(0)
    expect(masteryVerifiedStrict(s)).toBe(false)
  })

  it('acknowledgements still cannot buy mastery', () => {
    const s = play(Array(10).fill({ acknowledgement: true, askedQuestion: false }))
    expect(masteryVerifiedStrict(s)).toBe(false)
    expect(s.correctAtPractice).toBe(0)
  })

  it('wrong answers do not climb', () => {
    const s = play(Array(6).fill({ signalCorrect: false, askedQuestion: true, deliveredTeaching: true }))
    expect(masteryVerifiedStrict(s)).toBe(false)
  })
})

describe('the outage guard still holds', () => {
  it('a degraded template is not a give, however many turns run', () => {
    // A content-free outage template must never satisfy DEMONSTRATE→GUIDE nor
    // tell QL-1 a source exists to answer from.
    const s = play(Array(8).fill({ ...TEACH_AND_ASK, degradedTurn: true }))
    expect(s.demonstrated).toBe(false)
    expect(s.taughtThisSession).toBe(false)
    expect(masteryVerifiedStrict(s)).toBe(false)
  })
})

describe('callers that do not supply the field are unaffected', () => {
  it('omitting deliveredTeaching reproduces the previous behaviour exactly', () => {
    // Backward compatibility is asserted, not assumed: `undefined` must behave
    // as it did before the field existed, so every existing call site and test
    // keeps its meaning.
    const s = play(Array(8).fill({ signalCorrect: true, askedQuestion: true }))
    expect(s.phase).toBe('DEMONSTRATE')
    expect(s.demonstrated).toBe(false)
  })

  it('a silent teach turn is still a give, as it always was', () => {
    const s = play([
      { signalCorrect: true, askedQuestion: true },
      { askedQuestion: false },
      { signalCorrect: true, askedQuestion: true },
      { signalCorrect: true, askedQuestion: true },
      { signalCorrect: true, askedQuestion: true },
      { signalCorrect: true, askedQuestion: true },
    ])
    expect(masteryVerifiedStrict(s)).toBe(true)
  })
})
