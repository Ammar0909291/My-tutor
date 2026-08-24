/**
 * PHASE 7H — an explicit request to be ASKED is a first-class directive.
 *
 * THE DEFECT, proven live (Phase 7C/7D) and then proven unbounded (7F).
 * `phys.opt.total-internal-reflection` at GUIDE, three reviewed gradeable
 * probes ACTIVE, every safety gate clear. "ok yes lets try practice problem"
 * returned a MODEL-invented question — `probeId: null`,
 * `divergences: ["QUESTION_SHIPPED_WITHOUT_PROBE"]` — and one such question
 * carried a WRONG answer key.
 *
 * Root cause: the GUIDE branch of `decideNextMoveHeuristic` alternates on
 * `teachSegmentsSinceQuestion`, which `advanceConversationState` zeroes on ANY
 * assistant question — including the unreviewed one asked on a `teach` turn.
 * The counter was pinned at 0, so `move` never became `ask`, so
 * `phaseAllowsProbe` never became true, so the gate never opened. Forever.
 *
 * THE INVARIANTS this file pins:
 *
 *   1. An explicit request to be asked is RECOGNISED, and is NOT a
 *      `LearnerRequest` (which would suppress the authored probe — the exact
 *      opposite of what the learner asked for; see turnArbitration's
 *      LEARNER_REQUEST rung and defect D3 / Phase 2 C6).
 *   2. It opens the GUIDE branch — a PREFERENCE, never an entitlement.
 *   3. Recovery, question-refusal, stop, and every downstream gate still win.
 *   4. It is TURN-LOCAL: nothing is folded into ConversationState.
 */
import { describe, it, expect } from 'vitest'
import { asksForPractice, detectLearnerRequest } from '@/lib/teaching/masteryGate'
import { readTurnIntent } from '@/lib/teaching/turnIntent'
import {
  initialConversationState, advanceConversationState, decideNextMove, decideNextMoveDetailed,
  type ConversationState,
} from '@/lib/teaching/conversationState'
import { namedTopicUnknownTo } from '@/lib/teaching/visual/requestedTopic'

const CONCEPT = 'phys.opt.total-internal-reflection'
const TIR_TEXT =
  'Total Internal Reflection and Critical Angle Total internal reflection occurs when ' +
  'light hits a boundary at an angle greater than the critical angle and all light is reflected.'

const guide = (over: Partial<ConversationState> = {}): ConversationState => ({
  ...initialConversationState(CONCEPT),
  phase: 'GUIDE', taughtThisSession: true, demonstrated: true,
  teachSegmentsSinceQuestion: 0, ...over,
})
const ctx = (over: Record<string, unknown> = {}) =>
  ({ recoveryTurn: false, workedExampleFirst: false, ...over }) as never

// ═══════════════════════════════════════════════════════════════════════════
// 1. The detector — positive
// ═══════════════════════════════════════════════════════════════════════════
describe('Phase 7H — an explicit request to be asked is recognised', () => {
  const POSITIVE = [
    'give me a practice problem',
    'give me a practice question',
    'ok yes lets try practice problem',
    'yes please give me a practice problem to solve',
    "let's practice",
    'can we practice',
    'quiz me',
    'test me',
    'can you test me?',
    'ask me a question',
    'ask me another question',
    'give me something to solve',
    'give me one to solve',
    'give me a problem',
  ]
  for (const m of POSITIVE) {
    it(`"${m}" → wantsPractice`, () => {
      expect(asksForPractice(m)).toBe(true)
    })
  }
})

// ═══════════════════════════════════════════════════════════════════════════
// 2. The detector — negative. These must NOT become practice requests.
// ═══════════════════════════════════════════════════════════════════════════
describe('Phase 7H — ordinary turns are not practice requests', () => {
  const NEGATIVE = [
    'got it', 'okay', 'yes', 'I understand',
    "I don't understand", 'explain it again', 'explain this again',
    'make it simpler', 'what is this?', 'what does this mean',
    'show me a diagram', 'can you show me a picture?',
    'give me an example', 'show me a real-life example of this',
    "I'm done", "I'm done for today", 'stop for today',
    // the negated forms — the learner REFUSING a question
    "don't ask me a question", "don't ask me questions",
    'stop asking me questions', 'do not quiz me',
    // legitimate topic requests must stay topic requests
    'teach me entropy', 'explain photosynthesis', "teach me Kirchhoff's laws",
  ]
  for (const m of NEGATIVE) {
    it(`"${m}" → NOT a practice request`, () => {
      expect(asksForPractice(m)).toBe(false)
    })
  }
})

// ═══════════════════════════════════════════════════════════════════════════
// 3. IT MUST NOT BE A LearnerRequest — the 7G trap
// ═══════════════════════════════════════════════════════════════════════════
describe('Phase 7H — a practice request never becomes a LearnerRequest', () => {
  // turnArbitration's LEARNER_REQUEST rung suppresses AUTHORED_PROBE. If a
  // practice request set `learnerRequest`, `learnerRequestActive` would be
  // true and the probe would be DENIED — the opposite of the intent.
  for (const m of ['give me a practice problem', 'quiz me', 'test me', 'ask me a question']) {
    it(`"${m}" leaves learnerRequest null`, () => {
      expect(detectLearnerRequest(m)).toBeNull()
      const intent = readTurnIntent(m, null)
      expect(intent.learnerRequest).toBeNull()
      expect(intent.wantsPractice).toBe(true)
    })
  }

  it('a visual request keeps its LearnerRequest and is not practice', () => {
    const intent = readTurnIntent('show me a diagram', null)
    expect(intent.learnerRequest).toBe('diagram')
    expect(intent.wantsPractice).toBe(false)
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 4. The move engine — the loop is broken
// ═══════════════════════════════════════════════════════════════════════════
describe('Phase 7H — GUIDE opens for an explicit request', () => {
  it('without the request, GUIDE at a zeroed counter still teaches', () => {
    expect(decideNextMove(guide(), ctx())).toBe('teach')
  })

  it('with the request, GUIDE asks — so phaseAllowsProbe can become true', () => {
    expect(decideNextMove(guide(), ctx({ practiceRequested: true }))).toBe('ask')
  })

  it('THE 7F LOOP IS BROKEN: a pinned counter no longer starves the gate', () => {
    // Before this change the identical trace produced `teach` on ALL SIX
    // turns (7F §3) — the gate could never open. Now it opens immediately.
    let state = guide({ teachSegmentsSinceQuestion: 0 })
    const moves: string[] = []
    for (let t = 0; t < 6; t++) {
      moves.push(decideNextMove(state, ctx({ practiceRequested: true })))
      // the model volunteers a question every turn — what production does
      state = advanceConversationState(state, {
        askedQuestion: true, signalCorrect: null, recoveryFired: false,
      }, CONCEPT)
    }
    expect(moves[0]).toBe('ask')
    expect(moves).toContain('ask')
    expect(moves.every((m) => m === 'teach')).toBe(false)
  })

  it('...but the ANTI-INTERROGATION BUDGET still bounds it — preference, not entitlement', () => {
    // `questionsAskedSinceTeach >= 2` is checked BEFORE the phase switch, so a
    // learner who asks to be quizzed forever is still given something after
    // two consecutive questions. This assertion was written the other way
    // round first; the code was right and the test was wrong, so the real
    // behaviour is pinned here rather than the behaviour I expected.
    let state = guide({ teachSegmentsSinceQuestion: 0 })
    const moves: string[] = []
    for (let t = 0; t < 4; t++) {
      moves.push(decideNextMove(state, ctx({ practiceRequested: true })))
      state = advanceConversationState(state, {
        askedQuestion: true, signalCorrect: null, recoveryFired: false,
      }, CONCEPT)
    }
    expect(moves).toEqual(['ask', 'ask', 'teach', 'teach'])
  })

  it('the other phases are untouched by the new signal', () => {
    for (const phase of ['OBSERVE', 'DEMONSTRATE', 'CHECK', 'PRACTICE', 'TRANSFER'] as const) {
      const withReq = decideNextMove(guide({ phase }), ctx({ practiceRequested: true }))
      const without = decideNextMove(guide({ phase }), ctx())
      expect(withReq).toBe(without)
    }
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 5. PRECEDENCE — intent is a preference, gates decide eligibility
// ═══════════════════════════════════════════════════════════════════════════
describe('Phase 7H — everything that should outrank the request still does', () => {
  it('RECOVERY wins: a distressed learner is never handed a quiz', () => {
    const d = decideNextMoveDetailed(guide(), ctx({ practiceRequested: true, recoveryTurn: true }))
    expect(d.move).toBe('teach')
  })

  it('"I don\'t understand, give me a practice problem" is a recovery turn', () => {
    // The detector may read the request; recovery precedence is what protects
    // the learner, and it short-circuits before the heuristic.
    const intent = readTurnIntent("I don't understand, can you give me a practice problem?", null)
    expect(intent.failureState).not.toBeNull()
    const d = decideNextMoveDetailed(guide(), ctx({ practiceRequested: intent.wantsPractice, recoveryTurn: true }))
    expect(d.move).toBe('teach')
  })

  it('QUESTION LEGALITY wins: an ask-suppressed state is not overridden', () => {
    // askSuppressedTurns > 0 (QL-3) removes ASK before the heuristic runs.
    const suppressed = guide({ askSuppressedTurns: 3 })
    const d = decideNextMoveDetailed(suppressed, ctx({ practiceRequested: true }))
    expect(d.move).not.toBe('ask')
  })

  it('a refusal and a request in one message resolves to the refusal', () => {
    expect(asksForPractice("don't ask me a question")).toBe(false)
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 6. TURN-LOCAL — nothing is persisted, nothing is reinterpreted
// ═══════════════════════════════════════════════════════════════════════════
describe('Phase 7H — the signal is turn-local', () => {
  it('does not appear in ConversationState after a fold', () => {
    const next = advanceConversationState(guide(), {
      askedQuestion: true, signalCorrect: null, recoveryFired: false,
    }, CONCEPT)
    expect(JSON.stringify(next)).not.toContain('practiceRequested')
    expect(JSON.stringify(next)).not.toContain('wantsPractice')
  })

  it('does not persist: the next turn without the request teaches again', () => {
    let state = guide({ teachSegmentsSinceQuestion: 0 })
    expect(decideNextMove(state, ctx({ practiceRequested: true }))).toBe('ask')
    state = advanceConversationState(state, {
      askedQuestion: true, signalCorrect: null, recoveryFired: false,
    }, CONCEPT)
    expect(decideNextMove(state, ctx())).toBe('teach')
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 7. PHASE 6 / 7C / 7D REGRESSIONS — must stay closed
// ═══════════════════════════════════════════════════════════════════════════
describe('Phase 7H — earlier fixes remain intact', () => {
  it('"practice problem" still names no topic (Phase 7D)', () => {
    expect(namedTopicUnknownTo('ok yes lets try practice problem', TIR_TEXT)).toBeNull()
  })

  it('discourse deixis still names no topic (Phase 6 P0)', () => {
    expect(namedTopicUnknownTo('explain the main idea please', TIR_TEXT)).toBeNull()
    expect(namedTopicUnknownTo('what is the point of this?', TIR_TEXT)).toBeNull()
  })

  it('a genuine topic request still names its topic', () => {
    expect(namedTopicUnknownTo('explain boiling point', TIR_TEXT)).not.toBeNull()
    expect(namedTopicUnknownTo('explain photosynthesis', TIR_TEXT)).not.toBeNull()
  })
})
