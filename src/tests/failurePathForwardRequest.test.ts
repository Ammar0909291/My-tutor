/**
 * "OK, WHAT NEXT" GOT THE LEARNER MARKED WRONG AND DEMOTED.
 *
 * ── MEASURED LIVE ───────────────────────────────────────────────────────────
 * phys.mech.friction, 2026-09-01, disposable account, deployed app, driven as
 * a STRUGGLING learner — one wrong answer, then engagement. The failure path,
 * which four consecutive all-correct runs never touched.
 *
 * The learner answered ONE question wrong at T7 and was correctly demoted.
 * Then, saying "ok, what next" on every following turn:
 *
 *   T8  GUIDE        re-explanation
 *   T9  DEMONSTRATE  <- demoted again, and VERBATIM IDENTICAL to T7's text
 *   T10 DEMONSTRATE  re-explanation
 *   T11 DEMONSTRATE  re-explanation
 *   T12 DEMONSTRATE  re-explanation
 *   T13 "Let's pause Friction Forces here for now. Worth another look later."
 *
 * Thirteen turns, check=0, practice=0, NO gradeable question offered after
 * the wrong answer, and the lesson closed by abandoning them.
 *
 * ── ROOT CAUSE ──────────────────────────────────────────────────────────────
 * Measured against the real predicates:
 *
 *   isLowSignalAcknowledgement('ok, what next')  ->  false
 *   detectFailureState('ok, what next')          ->  null
 *
 * Neither an acknowledgement nor distress, so the ladder had no input at all.
 * Worse: when the tutor's prose HAD asked a question,
 * `shouldSuppressSignalCorrectness` allowed the model's SIGNAL through — it
 * tests whether a question was ASKED, not whether the learner ANSWERED it —
 * so a learner who asked to move on was graded INCORRECT and demoted for it.
 *
 * "next" was already in the forward family. "what next" is the same request;
 * the word "what" simply broke the contiguous-token chain, exactly as "that"
 * did in the acknowledgement defect fixed earlier the same day.
 *
 * ── WHY THIS ONE CHANGE FIXES BOTH SYMPTOMS ─────────────────────────────────
 * With the phrase recognised, the route's signal-null guard discards the
 * model's unverified correctness claim (so no demotion), AND the fold takes
 * its acknowledgement branch (so the delivery phase advances toward CHECK,
 * where authored probes are attachable again).
 *
 * ── A LIMIT, STATED RATHER THAN PAPERED OVER ────────────────────────────────
 * "so what next" is still NOT recognised. Bare "so" is deliberately excluded
 * from the glue list — it is a reasoning connective ("so the answer is 30 N")
 * — and that exclusion is load-bearing. The phrase measured in production was
 * "ok, what next"; inventing further phrasings to chase would be tuning
 * blind, which this codebase has repeatedly measured doing more harm than the
 * gap it closes.
 */
import { describe, it, expect } from 'vitest'
import {
  isLowSignalAcknowledgement, initialConversationState, advanceConversationState,
  type ConversationState,
} from '@/lib/teaching/conversationState'
import { detectFailureState } from '@/lib/teaching/recoveryGuard'

describe('A. the verbatim live message', () => {
  it('"ok, what next" is a request to proceed, not a wrong answer', () => {
    expect(isLowSignalAcknowledgement('ok, what next')).toBe(true)
  })

  it('and it is still not distress — the recovery path must not claim it', () => {
    expect(detectFailureState('ok, what next')).toBeNull()
  })

  for (const m of ['what next', "what's next", 'whats next', 'ok what next']) {
    it(`the same request, spelled differently: ${JSON.stringify(m)}`, () => {
      expect(isLowSignalAcknowledgement(m)).toBe(true)
    })
  }
})

describe('B. a real question is NOT swallowed — the whole risk of this change', () => {
  for (const m of [
    'what next?',                        // the `?` rule already excluded this
    'what is the next force',
    'what is the normal force',
    'what happens next to the box',
    'what next step do i take to find mu',
  ]) {
    it(`stays a question: ${JSON.stringify(m)}`, () => {
      expect(isLowSignalAcknowledgement(m)).toBe(false)
    })
  }
})

describe('C. the forward family it joins is unchanged', () => {
  for (const m of ['next', 'continue', 'go on', 'go ahead', 'ready', "let's go", 'proceed']) {
    it(`unchanged: ${JSON.stringify(m)}`, () => {
      expect(isLowSignalAcknowledgement(m)).toBe(true)
    })
  }
})

describe('D. the fold consequence — no demotion, and the ladder moves', () => {
  // `deliveredTeaching` is what the route supplies on a teach/show turn, and
  // it is load-bearing here: `demonstrated` is set by a GIVE, so without it
  // DEMONSTRATE is absorbing and the ladder stops dead. Modelling the turn
  // without it produced a wrong expectation in the first draft of this test,
  // which is why it is spelled out rather than defaulted.
  const turn = (
    s: ConversationState, message: string, modelClaimed: boolean | null,
    deliveredTeaching = true,
  ) => {
    // The route discards a model correctness claim on an acknowledgement.
    const signalCorrect = isLowSignalAcknowledgement(message) ? null : modelClaimed
    return advanceConversationState(s, {
      askedQuestion: true, signalCorrect, recoveryFired: false, deliveredTeaching,
      acknowledgement: isLowSignalAcknowledgement(message),
    } as Parameters<typeof advanceConversationState>[1])
  }

  it('the model claiming "incorrect" can no longer demote a learner who asked to move on', () => {
    const at = { ...initialConversationState('phys.mech.friction'), phase: 'GUIDE' as const, demonstrated: true }
    expect(turn(at, 'ok, what next', false).phase).not.toBe('DEMONSTRATE')
  })

  it('on teaching turns, repeated requests reach CHECK — where probes attach again', () => {
    let s: ConversationState = initialConversationState('phys.mech.friction')
    for (let i = 0; i < 4; i++) s = turn(s, 'ok, what next', false)
    // OBSERVE -> DEMONSTRATE -> GUIDE -> CHECK, then STOPS. CHECK is a mastery
    // gate and an acknowledgement is not evidence, so it can go no further.
    expect(s.phase).toBe('CHECK')
    expect(s.correctAtCheck).toBe(0)
    expect(s.correctAtPractice).toBe(0)
  })

  it('but a turn that TEACHES NOTHING still stalls at DEMONSTRATE — stated, not fixed', () => {
    // Measured while writing this test, and it corrected a wrong expectation
    // in the first draft. `demonstrated` is set only by a give, so a run of
    // pure question-and-answer with no teaching cannot leave DEMONSTRATE on
    // acknowledgements alone. That is the reachability law working as
    // designed, not a defect this change introduces — recorded so the limit
    // of this fix is not mistaken for its absence.
    let s: ConversationState = initialConversationState('phys.mech.friction')
    for (let i = 0; i < 6; i++) s = turn(s, 'ok, what next', false, false)
    expect(s.phase).toBe('DEMONSTRATE')
  })

  it('a hundred of them still buy no mastery', () => {
    let s: ConversationState = {
      ...initialConversationState('phys.mech.friction'), phase: 'CHECK' as const, demonstrated: true,
    }
    for (let i = 0; i < 100; i++) s = turn(s, 'ok, what next', false)
    expect(s.correctAtCheck).toBe(0)
    expect(s.correctAtPractice).toBe(0)
  })
})
