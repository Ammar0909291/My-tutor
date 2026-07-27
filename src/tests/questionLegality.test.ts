/**
 * Question Legality — Band 2 invariant tests.
 *
 * Every test below is a REPLAY of a specific turn from the Henry's Law
 * transcript (Lesson 44, chem.sol.solubility, 2026-07-27) that the live system
 * got wrong. A passing suite means those exact turns are now structurally
 * impossible, not merely discouraged by prompt wording.
 */

import { describe, it, expect } from 'vitest'
import {
  questionLegality,
  answerableSource,
  phaseAfterConcludedDiagnostic,
  foldAskSuppression,
  foldLegalityMetrics,
  initialLegalityMetrics,
  LEARNER_DIRECTIVE_SUPPRESSION_TURNS,
} from '@/lib/teaching/questionLegality'
import {
  initialConversationState,
  advanceConversationState,
  decideNextMove,
  decideNextMoveDetailed,
  buildTurnDirective,
  type ConversationState,
} from '@/lib/teaching/conversationState'

const S = (over: Partial<ConversationState> = {}): ConversationState => ({
  ...initialConversationState('chem.sol.solubility'),
  ...over,
})

const CTX = { recoveryTurn: false, workedExampleFirst: false }

// ── QL-1 · ANSWERABLE SOURCE ────────────────────────────────────────────────

describe('QL-1 — every question must have an answerable source', () => {
  it('blocks ASK on turn one of a fresh concept (the Henry\'s Law opening)', () => {
    // Transcript turn 1: "Have you seen bubbles in a fizzy drink?" — asked
    // before anything about solubility had been said.
    const v = questionLegality(S())
    expect(v.askLegal).toBe(false)
    expect(v.reason).toBe('QL1_NO_ANSWERABLE_SOURCE')
  })

  it('forces SHOW rather than ASK when nothing has been taught', () => {
    const d = decideNextMoveDetailed(S(), CTX)
    expect(d.move).toBe('show')
    expect(d.blockedReason).toBe('QL1_NO_ANSWERABLE_SOURCE')
  })

  it('permits ASK once an anchor has been shown in OBSERVE', () => {
    // The OBSERVE design is "show an anchor, THEN ask what they notice".
    // The anchor is the source; a give in OBSERVE must therefore unblock ASK.
    const afterAnchor = advanceConversationState(S(), {
      askedQuestion: false, signalCorrect: null, recoveryFired: false,
    })
    expect(afterAnchor.taughtThisSession).toBe(true)
    expect(answerableSource(afterAnchor)).toBe('taught_this_session')
    expect(questionLegality(afterAnchor).askLegal).toBe(true)
  })

  it('permits ASK with evidenced prior knowledge and nothing yet taught', () => {
    // Socratic diagnosis of a returning learner is legitimate: there IS
    // something to diagnose. The layer must not block real diagnostic work.
    const v = questionLegality(S(), { hasEvidencedPriorKnowledge: true })
    expect(v.askLegal).toBe(true)
    expect(answerableSource(S(), { hasEvidencedPriorKnowledge: true })).toBe('evidenced_prior')
  })

  it('counts a correct answer this session as evidence of a source', () => {
    expect(answerableSource(S({ correctAtCheck: 1 }))).toBe('evidenced_prior')
  })

  it('does not treat a gentle question as exempt — softness is not a source', () => {
    // The transcript's questions were all gentle. Gentleness is orthogonal.
    expect(questionLegality(S({ phase: 'OBSERVE' })).askLegal).toBe(false)
  })
})

// ── QL-2 · NON-ANSWERS CONCLUDE THE DIAGNOSTIC ──────────────────────────────

describe('QL-2 — repeated non-answers conclude the diagnostic', () => {
  it('blocks ASK after two consecutive non-answers', () => {
    const v = questionLegality(S({ taughtThisSession: true, consecutiveDontKnows: 2 }))
    expect(v.askLegal).toBe(false)
    expect(v.reason).toBe('QL2_DIAGNOSTIC_CONCLUDED')
  })

  it('blocks ASK after even ONE non-answer — you never answer "I don\'t know" with a question', () => {
    // Threshold discovered by the replay test below: blocking only at 2 let a
    // probe through immediately after the learner's first non-answer, which is
    // the exact move foundations/01's dont_know script forbids.
    const v = questionLegality(S({ taughtThisSession: true, consecutiveDontKnows: 1 }))
    expect(v.askLegal).toBe(false)
    expect(v.rationale).toMatch(/feedback about the question, not about them/)
  })

  it('distinguishes a non-answer from a wrong answer — wrong answers may be followed up', () => {
    // A wrong answer is informative; misconception repair depends on being
    // able to probe it. Only NON-answers block.
    const wrongButAnswered = S({ taughtThisSession: true, consecutiveFailures: 1, consecutiveDontKnows: 0 })
    expect(questionLegality(wrongButAnswered).askLegal).toBe(true)
  })

  it('TRANSITIONS the phase out of OBSERVE — not merely the move', () => {
    // The original defect: forcing 'show' while the phase stayed at OBSERVE
    // let the observation question return on the very next turn.
    expect(phaseAfterConcludedDiagnostic('OBSERVE', 2)).toBe('DEMONSTRATE')
    expect(phaseAfterConcludedDiagnostic('OBSERVE', 1)).toBe('OBSERVE')
    // Later phases keep their own drop-one-floor-DEMONSTRATE handling.
    expect(phaseAfterConcludedDiagnostic('PRACTICE', 5)).toBe('PRACTICE')
  })

  it('end-to-end: two "I don\'t know"s leave OBSERVE for good', () => {
    let s = S()
    for (const _ of [1, 2]) {
      s = advanceConversationState(s, {
        askedQuestion: true, signalCorrect: null, recoveryFired: true, dontKnowSignal: true,
      })
    }
    expect(s.consecutiveDontKnows).toBe(2)
    expect(s.phase).toBe('DEMONSTRATE')
    expect(decideNextMove(s, CTX)).not.toBe('ask')
  })

  it('a bare acknowledgement between two non-answers does not break the chain', () => {
    let s = S()
    s = advanceConversationState(s, { askedQuestion: true, signalCorrect: null, recoveryFired: true, dontKnowSignal: true })
    s = advanceConversationState(s, { askedQuestion: false, signalCorrect: null, recoveryFired: false })
    s = advanceConversationState(s, { askedQuestion: true, signalCorrect: null, recoveryFired: true, dontKnowSignal: true })
    expect(s.consecutiveDontKnows).toBe(2)
    expect(decideNextMove(s, CTX)).not.toBe('ask')
  })
})

// ── QL-3 · EXPLICIT LEARNER DIRECTIVES OVERRIDE, AND STICK ──────────────────

describe('QL-3 — explicit learner directives override strategy and persist', () => {
  it('blocks ASK while suppression is active', () => {
    const v = questionLegality(S({ taughtThisSession: true, askSuppressedTurns: 3 }))
    expect(v.askLegal).toBe(false)
    expect(v.reason).toBe('QL3_LEARNER_DIRECTIVE_ACTIVE')
  })

  it('outranks the other two invariants (learner statement is ground truth)', () => {
    const v = questionLegality(S({ askSuppressedTurns: 1, consecutiveDontKnows: 9 }))
    expect(v.reason).toBe('QL3_LEARNER_DIRECTIVE_ACTIVE')
  })

  it('persists for several turns, not one — the observed regression', () => {
    // Transcript: the plea was obeyed for exactly one turn, then the tutor
    // reverted to observation questions on the very next turn.
    let s = advanceConversationState(S({ taughtThisSession: true }), {
      askedQuestion: false, signalCorrect: null, recoveryFired: true, learnerIssuedDirective: true,
    })
    expect(s.askSuppressedTurns).toBe(LEARNER_DIRECTIVE_SUPPRESSION_TURNS)
    for (let i = 1; i < LEARNER_DIRECTIVE_SUPPRESSION_TURNS; i++) {
      s = advanceConversationState(s, { askedQuestion: false, signalCorrect: null, recoveryFired: false })
      expect(decideNextMove(s, CTX)).not.toBe('ask')
    }
    // …and eventually decays, so the tutor is not muted forever.
    s = advanceConversationState(s, { askedQuestion: false, signalCorrect: null, recoveryFired: false })
    expect(s.askSuppressedTurns).toBe(0)
    expect(questionLegality(s).askLegal).toBe(true)
  })

  it('decays by exactly one per turn and never goes negative', () => {
    expect(foldAskSuppression(undefined, false)).toBe(0)
    expect(foldAskSuppression(0, false)).toBe(0)
    expect(foldAskSuppression(2, false)).toBe(1)
    expect(foldAskSuppression(1, true)).toBe(LEARNER_DIRECTIVE_SUPPRESSION_TURNS)
  })

  it('emits the one-clause self-correction on the turn the directive arrives', () => {
    const d = buildTurnDirective({
      state: S({ askSuppressedTurns: 3 }), nextMove: 'show', maxParagraphs: 4,
      workedExampleFirst: false, visualType: null, directiveJustIssued: true,
    })
    expect(d).toMatch(/owning it in ONE short clause/)
    const without = buildTurnDirective({
      state: S({ askSuppressedTurns: 3 }), nextMove: 'show', maxParagraphs: 4,
      workedExampleFirst: false, visualType: null,
    })
    expect(without).not.toMatch(/owning it in ONE short clause/)
  })
})

// ── The whole transcript, replayed ──────────────────────────────────────────

describe('Henry\'s Law transcript replay — the failure cannot recur', () => {
  it('never produces two ASK turns before anything is taught', () => {
    // Drive the machine the way the live session went: question, non-answer,
    // question, non-answer, "?" … and assert ASK is never legal.
    let s = S()
    const moves: string[] = []
    for (let turn = 0; turn < 8; turn++) {
      const d = decideNextMoveDetailed(s, CTX)
      moves.push(d.move)
      // Model the learner: they cannot answer, so every turn is a non-answer.
      s = advanceConversationState(s, {
        askedQuestion: d.move === 'ask',
        signalCorrect: null,
        recoveryFired: true,
        dontKnowSignal: true,
      })
    }
    expect(moves.filter((m) => m === 'ask')).toHaveLength(0)
    expect(moves[0]).toBe('show') // teaching starts on turn one, not turn eight
  })

  it('surfaces the reason in the directive rather than a bare prohibition', () => {
    const d = decideNextMoveDetailed(S(), CTX)
    const directive = buildTurnDirective({
      state: S(), nextMove: d.move, maxParagraphs: 4, workedExampleFirst: false,
      visualType: null, legalityRationale: d.rationale,
    })
    expect(directive).toMatch(/QUESTIONS ARE NOT LEGAL THIS TURN/)
    expect(directive).toMatch(/no source to answer from/)
  })
})

// ── Measurement (test 2: automatically measurable) ──────────────────────────

describe('legality metrics', () => {
  it('counts the violation that matters: kernel said do not ask, model asked', () => {
    let m = initialLegalityMetrics()
    m = foldLegalityMetrics(m, { decidedMove: 'show', askedQuestion: true, blockedReason: 'QL1_NO_ANSWERABLE_SOURCE' })
    expect(m.askViolations).toBe(1)
    expect(m.ql1Blocks).toBe(1)
    expect(m.gives).toBe(1)
  })

  it('does not count a question on a turn where ASK was the decided move', () => {
    const m = foldLegalityMetrics(initialLegalityMetrics(), {
      decidedMove: 'ask', askedQuestion: true, blockedReason: null,
    })
    expect(m.askViolations).toBe(0)
    expect(m.asks).toBe(1)
  })

  it('tracks give:ask as a monitored ratio, never as a gate', () => {
    let m = initialLegalityMetrics()
    m = foldLegalityMetrics(m, { decidedMove: 'show', askedQuestion: false, blockedReason: null })
    m = foldLegalityMetrics(m, { decidedMove: 'teach', askedQuestion: false, blockedReason: null })
    m = foldLegalityMetrics(m, { decidedMove: 'ask', askedQuestion: true, blockedReason: null })
    expect(m.gives).toBe(2)
    expect(m.asks).toBe(1)
    // No assertion on the ratio's value: the correct value is per-activity and
    // must be measured against a human baseline, not asserted from a constant.
  })
})

// ── Regression: the layer is subtractive only ───────────────────────────────

describe('Band 2 is subtractive only', () => {
  it('never turns a give into an ask', () => {
    const states: ConversationState[] = [
      S({ taughtThisSession: true, phase: 'DEMONSTRATE' }),
      S({ taughtThisSession: true, phase: 'GUIDE', consecutiveFailures: 3 }),
      S({ taughtThisSession: true, phase: 'CHECK', questionsAskedSinceTeach: 5 }),
    ]
    for (const s of states) {
      const heuristicOnly = decideNextMove({ ...s, askSuppressedTurns: 0, consecutiveDontKnows: 0 }, CTX)
      if (heuristicOnly !== 'ask') {
        expect(decideNextMoveDetailed(s, CTX).move).not.toBe('ask')
      }
    }
  })

  it('leaves recovery turns untouched — recovery already forbids questions', () => {
    const d = decideNextMoveDetailed(S(), { ...CTX, recoveryTurn: true })
    expect(d.move).toBe('teach')
    expect(d.blockedReason).toBeNull()
  })
})
