/**
 * PHASE 7N-1(ii) — the anti-interrogation budget counts OUR asks, not the
 * model's.
 *
 * MEASURED IN PRODUCTION on the 7N-2 telemetry build (physics /
 * phys.wave.interference), three consecutive turns:
 *
 *   [ladder] move:'teach' askedQuestion:true mcqAsked:true phaseBefore:'GUIDE'
 *            questionsAskedSinceTeach: 2 -> 3 -> 4   (never decrements)
 *            teachSegmentsSinceQuestion: 0 (pinned)
 *            wantsPractice:true phaseAllowsProbe:false
 *            budgetDeniedRequestedAsk: true
 *   [turn-decision] probeId:null divergences:[QUESTION_SHIPPED_WITHOUT_PROBE]
 *
 * The ENGINE decided 'teach'. The model asked anyway. That spent the budget,
 * which then denied the AUTHORED probe — so the learner was asked five times
 * regardless, but always with UNREVIEWED questions, while three authored
 * gradeable probes for that concept sat unused. One turn even logged
 * `[empty-with-mcq] model wrote no prose but a valid MCQ`: no teaching at all,
 * and it still counted against the teaching budget.
 *
 * THE NARROW FIX: `questionsAskedSinceTeach` feeds exactly one decision (the
 * hard question budget) plus Track K's shadow policy rules, and both reason
 * about the SYSTEM's questioning. Counting output the system never selected is
 * the defect. `teachSegmentsSinceQuestion` is deliberately untouched — it
 * answers a different question ("did the assistant ask and give nothing
 * since"), which is true of a model question too.
 */
import { describe, it, expect } from 'vitest'
import {
  initialConversationState, advanceConversationState, decideNextMove,
  decideNextMoveDetailed, type ConversationState,
} from '@/lib/teaching/conversationState'

const CONCEPT = 'phys.wave.interference'
const guide = (over: Partial<ConversationState> = {}): ConversationState => ({
  ...initialConversationState(CONCEPT),
  phase: 'GUIDE', taughtThisSession: true, demonstrated: true, ...over,
})
const ctx = (over: Record<string, unknown> = {}) =>
  ({ recoveryTurn: false, workedExampleFirst: false, ...over }) as never

/** The model volunteers a question on a turn the engine decided to teach. */
const unsanctioned = (s: ConversationState) => advanceConversationState(s, {
  askedQuestion: true, questionSanctioned: false, signalCorrect: null, recoveryFired: false,
}, CONCEPT)
/** The engine itself decided to ask. */
const sanctioned = (s: ConversationState) => advanceConversationState(s, {
  askedQuestion: true, questionSanctioned: true, signalCorrect: null, recoveryFired: false,
}, CONCEPT)

// ═══════════════════════════════════════════════════════════════════════════
// 1. THE EXACT PRODUCTION SCENARIO
// ═══════════════════════════════════════════════════════════════════════════
describe('Phase 7N-1(ii) — the measured three-turn starvation', () => {
  it('REPRODUCES the old ratchet when questions are treated as sanctioned', () => {
    let s = guide()
    for (let i = 0; i < 3; i++) s = sanctioned(s)
    expect(s.questionsAskedSinceTeach).toBe(3)
    expect(decideNextMove(s, ctx({ practiceRequested: true }))).not.toBe('ask')  // starved
  })

  it('FIXES IT: unsanctioned model questions no longer spend the budget', () => {
    let s = guide()
    for (let i = 0; i < 3; i++) s = unsanctioned(s)
    expect(s.questionsAskedSinceTeach).toBe(0)
    expect(decideNextMove(s, ctx({ practiceRequested: true }))).toBe('ask')
  })

  it('...so the authored gate can open — phaseAllowsProbe needs GUIDE + ask', () => {
    let s = guide()
    for (let i = 0; i < 5; i++) s = unsanctioned(s)
    const move = decideNextMove(s, ctx({ practiceRequested: true }))
    expect(move).toBe('ask')
    expect(s.phase === 'GUIDE' && move === 'ask').toBe(true)   // the gate's condition
  })

  it('an unsanctioned question HOLDS the counter, it does not reset it', () => {
    // Otherwise a model question would hand out a fresh budget every time it
    // spoke out of turn, erasing the engine's own unanswered asks.
    let s = sanctioned(sanctioned(guide()))
    expect(s.questionsAskedSinceTeach).toBe(2)
    s = unsanctioned(s)
    expect(s.questionsAskedSinceTeach).toBe(2)
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 2. BACKWARD COMPATIBILITY — omitting the field changes nothing
// ═══════════════════════════════════════════════════════════════════════════
describe('Phase 7N-1(ii) — the default is byte-identical', () => {
  it('omitting questionSanctioned still increments, exactly as before', () => {
    const s = advanceConversationState(guide(), {
      askedQuestion: true, signalCorrect: null, recoveryFired: false,
    }, CONCEPT)
    expect(s.questionsAskedSinceTeach).toBe(1)
  })

  it('only an explicit false holds it — undefined and true both increment', () => {
    expect(sanctioned(guide()).questionsAskedSinceTeach).toBe(1)
    expect(advanceConversationState(guide(), {
      askedQuestion: true, questionSanctioned: undefined, signalCorrect: null, recoveryFired: false,
    }, CONCEPT).questionsAskedSinceTeach).toBe(1)
  })

  it('a NON-question turn is completely untouched', () => {
    const s = advanceConversationState(guide({ questionsAskedSinceTeach: 2 }), {
      askedQuestion: false, questionSanctioned: false, signalCorrect: null, recoveryFired: false,
    }, CONCEPT)
    expect(s.questionsAskedSinceTeach).toBe(0)
    expect(s.teachSegmentsSinceQuestion).toBe(1)
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 3. teachSegmentsSinceQuestion IS UNCHANGED — QL-1 and the visual layer
// ═══════════════════════════════════════════════════════════════════════════
describe('Phase 7N-1(ii) — the sibling counter is untouched', () => {
  it('ANY question still resets it, sanctioned or not', () => {
    expect(unsanctioned(guide({ teachSegmentsSinceQuestion: 5 })).teachSegmentsSinceQuestion).toBe(0)
    expect(sanctioned(guide({ teachSegmentsSinceQuestion: 5 })).teachSegmentsSinceQuestion).toBe(0)
  })

  it('so "the assistant asked and gave nothing since" stays true for a model question', () => {
    // This is the idiom questionLegality.ts and the three migrated route
    // consumers rely on. If it drifted, the visual layer and RC-D go blind.
    const s = unsanctioned(guide())
    expect((s.teachSegmentsSinceQuestion ?? 0) === 0 && s.taughtThisSession === true).toBe(true)
  })

  it('the GUIDE alternation path still works off it', () => {
    expect(decideNextMove(guide({ teachSegmentsSinceQuestion: 2 }), ctx())).toBe('ask')
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 4. NEGATIVE CONTROLS — everything that must still outrank an ask
// ═══════════════════════════════════════════════════════════════════════════
describe('Phase 7N-1(ii) — preserved precedence', () => {
  const starved = () => { let s = guide(); for (let i=0;i<4;i++) s = unsanctioned(s); return s }

  it('RECOVERY still wins — a distressed learner is never quizzed', () => {
    expect(decideNextMoveDetailed(starved(), ctx({ practiceRequested: true, recoveryTurn: true })).move).toBe('teach')
  })

  it('QL-3 ask-suppression still wins', () => {
    const s = { ...starved(), askSuppressedTurns: 3 }
    expect(decideNextMoveDetailed(s, ctx({ practiceRequested: true })).move).not.toBe('ask')
  })

  it('a FAILING learner still gets a demonstration, not a quiz', () => {
    const s = { ...starved(), consecutiveFailures: 2 }
    expect(decideNextMove(s, ctx({ practiceRequested: true }))).toBe('show')
  })

  it('two "I do not know" in a row still ends discovery', () => {
    // Asserted through decideNextMoveDetailed because question LEGALITY owns
    // this, not the move heuristic: it returns 'teach' with an explicit
    // blockedReason rather than 'show'. My first version expected 'show' and
    // was wrong about which layer answers.
    const s = { ...starved(), consecutiveDontKnows: 2 }
    const d = decideNextMoveDetailed(s, ctx({ practiceRequested: true }))
    expect(d.move).not.toBe('ask')
    expect(d.blockedReason).toBe('QL2_DIAGNOSTIC_CONCLUDED')
  })

  it('the prior-knowledge-probe gates still fire', () => {
    for (const over of [{ totalKnowledgeProbes: 2 }, { consecutivePriorKnowledgeProbes: 2 }]) {
      expect(decideNextMove({ ...starved(), ...over }, ctx({ practiceRequested: true }))).toBe('show')
    }
  })

  it('the OBSERVE failure gate still fires', () => {
    const s = { ...starved(), phase: 'OBSERVE' as const, observeFailures: 2 }
    expect(decideNextMove(s, ctx({ practiceRequested: true }))).toBe('show')
  })

  it('a learner who did NOT ask is still governed by the budget', () => {
    let s = guide()
    for (let i = 0; i < 3; i++) s = sanctioned(s)
    expect(decideNextMove(s, ctx())).not.toBe('ask')
  })

  it('the narrowing never GRANTS an ask outside GUIDE', () => {
    // The meaningful invariant. A starved-but-unsanctioned state has a zeroed
    // budget, so the risk is that some other phase now returns 'ask' where it
    // previously could not. It does not: each phase's own rule still decides.
    // (An earlier version asserted move-equality with a fresh state, which is
    // simply false — the budget legitimately still applies at other phases when
    // the asks WERE sanctioned.)
    for (const phase of ['DEMONSTRATE', 'CHECK', 'PRACTICE', 'TRANSFER'] as const) {
      let s = guide({ phase }); for (let i = 0; i < 3; i++) s = unsanctioned(s)
      const fresh = decideNextMove(guide({ phase }), ctx())
      const after = decideNextMove(s, ctx())
      if (fresh !== 'ask') expect(after).not.toBe('ask')
    }
  })
})

// ═══════════════════════════════════════════════════════════════════════════
// 5. MASTERY INTEGRITY — nothing here touches evidence
// ═══════════════════════════════════════════════════════════════════════════
describe('Phase 7N-1(ii) — no mastery is created or destroyed', () => {
  it('neither counter path moves a mastery counter', () => {
    let s = guide()
    for (let i = 0; i < 6; i++) s = unsanctioned(s)
    expect(s.correctAtCheck).toBe(0)
    expect(s.correctAtPractice).toBe(0)
    expect(s.demonstrated).toBe(true)     // unchanged from the fixture
    expect(s.phase).toBe('GUIDE')         // no phase advance from asking
  })
})
