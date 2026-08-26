/**
 * PHASE E — a rhetorical '?' must not starve the assessment cadence.
 *
 * WHAT THIS PINS
 * ────────────────────────────────────────────────────────────────────────────
 * `advanceConversationState`'s counter fold branches on `askedQuestion`, which
 * is literally "the assistant's text contains a ? outside a code fence". PHASE
 * 7N-1(ii) established that the two counters in that branch measure the
 * SYSTEM'S OWN questioning, and narrowed the INCREMENT of
 * `questionsAskedSinceTeach` accordingly — but left two halves behind:
 *
 *   · `questionsAskedSinceTeach` still only RESETS in the no-question branch,
 *     so a model that ends teaching paragraphs with "Why might that happen?"
 *     pins it at 2 forever and `decideNextMoveHeuristic`'s budget gate
 *     (`>= 2 → 'teach'`) fires above the phase switch for the rest of the
 *     concept's life.
 *   · `teachSegmentsSinceQuestion` still ZEROES on any '?', so the GUIDE arm's
 *     own `teachSegmentsSinceQuestion >= 2` can never fire either. PHASE 7H's
 *     comment in that arm describes exactly this and works around it.
 *
 * Measured with the real modules: a chatty model leaves the ladder at GUIDE for
 * eleven consecutive turns with ZERO probes served, against four probes and
 * verified mastery for an otherwise identical model that omits the '?'. That is
 * the runtime depending on model wording for its assessment cadence.
 *
 * The repair reuses the predicate the same file already computes forty lines
 * below (`deliveredAGive`): an unsanctioned question on a turn the engine
 * TAUGHT is folded as a teaching turn. Nothing else moves.
 *
 * THE NEGATIVE HALF MATTERS AS MUCH AS THE POSITIVE HALF. These tests exist as
 * much to prove the anti-interrogation budget still fires, that the delivery
 * phases stay probe-free, and that no acknowledgement, wrong answer or outage
 * template can manufacture mastery.
 */
import { describe, it, expect } from 'vitest'
import {
  advanceConversationState,
  decideNextMove,
  initialConversationState,
  type ConversationState,
  type NextMove,
  type NextMoveContext,
  type TeachingPhase,
  type TurnEvidence,
} from '@/lib/teaching/conversationState'
import {
  closingTurnWithholdsQuestion,
  isMasteryGatePhase,
  isProbeAttachablePhase,
} from '@/lib/teaching/gateAssessment'

const CTX: NextMoveContext = { recoveryTurn: false, workedExampleFirst: false }

const at = (phase: TeachingPhase, over: Partial<ConversationState> = {}): ConversationState => ({
  ...initialConversationState('phys.mech.orbital-mechanics'),
  phase,
  ...over,
})

/** The three turn shapes this whole file is about. */
const teachTurnWithRhetoricalQuestion: TurnEvidence = {
  askedQuestion: true,           // "…Why do you think that happens?"
  questionSanctioned: false,     // the engine decided 'teach'
  deliveredTeaching: true,
  signalCorrect: null,
  recoveryFired: false,
}
const teachTurnPlain: TurnEvidence = {
  ...teachTurnWithRhetoricalQuestion,
  askedQuestion: false,
}
const sanctionedAsk: TurnEvidence = {
  askedQuestion: true,
  questionSanctioned: true,      // the engine decided 'ask'
  deliveredTeaching: false,
  signalCorrect: null,
  recoveryFired: false,
}

// ── 1 · a rhetorical '?' does not count as a real question for cadence ──────

describe('a rhetorical question on a teach turn is folded as teaching', () => {
  it('does not spend the anti-interrogation budget, and clears it', () => {
    const s = advanceConversationState(
      at('GUIDE', { questionsAskedSinceTeach: 2 }),
      teachTurnWithRhetoricalQuestion,
    )
    expect(s.questionsAskedSinceTeach).toBe(0)
  })

  it('counts as a teach segment rather than zeroing the give counter', () => {
    const s = advanceConversationState(
      at('GUIDE', { teachSegmentsSinceQuestion: 1 }),
      teachTurnWithRhetoricalQuestion,
    )
    expect(s.teachSegmentsSinceQuestion).toBe(2)
  })

  it('is indistinguishable from the same teaching turn without the "?"', () => {
    const withQ = advanceConversationState(at('GUIDE'), teachTurnWithRhetoricalQuestion)
    const without = advanceConversationState(at('GUIDE'), teachTurnPlain)
    expect(withQ.questionsAskedSinceTeach).toBe(without.questionsAskedSinceTeach)
    expect(withQ.teachSegmentsSinceQuestion).toBe(without.teachSegmentsSinceQuestion)
  })
})

// ── 2/3 · a genuine engine ask still counts ─────────────────────────────────

describe('a question the engine chose still counts', () => {
  it('spends the budget', () => {
    const s = advanceConversationState(at('CHECK'), sanctionedAsk)
    expect(s.questionsAskedSinceTeach).toBe(1)
    expect(s.teachSegmentsSinceQuestion).toBe(0)
  })

  it('an authored MCQ turn is a sanctioned ask and spends the budget', () => {
    // The route sets questionSanctioned from its own decided move; a served
    // authored probe only ever rides an 'ask' turn.
    let s = at('CHECK')
    s = advanceConversationState(s, { ...sanctionedAsk, signalCorrect: true })
    expect(s.questionsAskedSinceTeach).toBe(1)
    expect(s.correctAtCheck).toBe(1)
  })

  it('two engine asks without a give still trip the budget gate', () => {
    let s = at('CHECK')
    s = advanceConversationState(s, sanctionedAsk)
    s = advanceConversationState(s, sanctionedAsk)
    expect(s.questionsAskedSinceTeach).toBeGreaterThanOrEqual(2)
    expect(decideNextMove(s, CTX)).not.toBe('ask')
  })
})

// ── 4 · the unanswered-probe protection is untouched ────────────────────────

describe('an unanswered question is still protected', () => {
  it('a sanctioned ask with no answer leaves the counters asking, not teaching', () => {
    const s = advanceConversationState(at('GUIDE'), sanctionedAsk)
    expect(s.teachSegmentsSinceQuestion).toBe(0)
    expect(s.correctAtCheck).toBe(0)
    expect(s.correctAtPractice).toBe(0)
  })

  it('never fabricates correctness from a rhetorical question', () => {
    const s = advanceConversationState(at('PRACTICE'), teachTurnWithRhetoricalQuestion)
    expect(s.correctAtCheck).toBe(0)
    expect(s.correctAtPractice).toBe(0)
  })
})

// ── 5 · GUIDE can no longer be starved ──────────────────────────────────────

/** One turn of the real loop. The learner answers whatever the SERVER decided
 *  to ask, and nothing else — a rhetorical '?' poses no question, so it can
 *  produce no graded signal (`answerableTurn`'s rule). */
function drive(opts: {
  turns: number
  writesQuestion: (move: NextMove) => boolean
  answer?: (n: number) => boolean | null
  acknowledgement?: boolean
  degraded?: boolean
}) {
  let s = initialConversationState('phys.mech.orbital-mechanics')
  const trail: Array<{ phase: TeachingPhase; move: NextMove; probe: boolean; gives: number }> = []
  let probes = 0
  for (let n = 1; n <= opts.turns; n++) {
    const move = decideNextMove(s, CTX)
    const probe = move === 'ask' && isProbeAttachablePhase(s.phase)
    if (probe) probes++
    trail.push({ phase: s.phase, move, probe, gives: s.teachSegmentsSinceQuestion })
    s = advanceConversationState(s, {
      askedQuestion: opts.writesQuestion(move) || probe,
      questionSanctioned: move === 'ask',
      deliveredTeaching: move === 'teach' || move === 'show',
      // `??` would read a deliberate `null` (learner did not answer) as "no
      // opinion" and substitute `true` — the instrument would then manufacture
      // exactly the evidence these tests exist to prove cannot be manufactured.
      signalCorrect: move === 'ask' ? (opts.answer ? opts.answer(n) : true) : null,
      recoveryFired: false,
      degradedTurn: opts.degraded === true,
      acknowledgement: opts.acknowledgement === true,
    })
  }
  return { state: s, trail, probes }
}

const CHATTY = (move: NextMove) => true
const TERSE = (move: NextMove) => move === 'ask'

describe('the assessment cadence no longer depends on model wording', () => {
  it('a chatty model reaches mastery, exactly as a terse one does', () => {
    const chatty = drive({ turns: 14, writesQuestion: CHATTY })
    const terse = drive({ turns: 14, writesQuestion: TERSE })
    for (const r of [chatty, terse]) {
      expect(r.probes).toBeGreaterThanOrEqual(3)
      expect(r.state.correctAtCheck).toBeGreaterThanOrEqual(1)
      expect(r.state.correctAtPractice).toBeGreaterThanOrEqual(2)
    }
  })

  it('does not leave the ladder parked at GUIDE', () => {
    const chatty = drive({ turns: 14, writesQuestion: CHATTY })
    const guideRun = chatty.trail.filter((t) => t.phase === 'GUIDE').length
    expect(guideRun).toBeLessThan(6)
  })

  it('still earns every GUIDE question with two gives — not a quiz machine', () => {
    // The pre-existing rule, unchanged: GUIDE asks only once two give-turns
    // have landed since the last question. The counter is global, not
    // GUIDE-scoped — a DEMONSTRATE show counts, and always did — so this
    // asserts the counter, not a position within the phase.
    const { trail } = drive({ turns: 20, writesQuestion: CHATTY })
    const guideAsks = trail.filter((t) => t.phase === 'GUIDE' && t.move === 'ask')
    expect(guideAsks.length).toBeGreaterThan(0)
    for (const t of guideAsks) expect(t.gives).toBeGreaterThanOrEqual(2)
  })
})

// ── 6 · an explicit practice request still opens assessment ─────────────────

describe('an explicit practice request is unchanged', () => {
  it('opens ASK at GUIDE even with the give counter at zero', () => {
    // QL-1 makes ASK illegal until something has been taught, and returns
    // 'show' above the heuristic entirely — so a bare GUIDE state cannot
    // exercise the practice request. Teach first, then ask.
    const s = at('GUIDE', { teachSegmentsSinceQuestion: 0, taughtThisSession: true, demonstrated: true })
    expect(decideNextMove(s, CTX)).toBe('teach')
    expect(decideNextMove(s, { ...CTX, practiceRequested: true })).toBe('ask')
  })
})

// ── 7/8 · the probe-free phases stay probe-free ─────────────────────────────

describe('probe policy is untouched', () => {
  it('OBSERVE and DEMONSTRATE are never probe-attachable', () => {
    expect(isProbeAttachablePhase('OBSERVE')).toBe(false)
    expect(isProbeAttachablePhase('DEMONSTRATE')).toBe(false)
  })

  it('GUIDE/CHECK/PRACTICE remain probe-attachable', () => {
    expect(isProbeAttachablePhase('GUIDE')).toBe(true)
    expect(isMasteryGatePhase('CHECK')).toBe(true)
    expect(isMasteryGatePhase('PRACTICE')).toBe(true)
  })

  it('no probe is served in a delivery phase across a full chatty run', () => {
    const { trail } = drive({ turns: 20, writesQuestion: CHATTY })
    const early = trail.filter((t) => t.probe && (t.phase === 'OBSERVE' || t.phase === 'DEMONSTRATE'))
    expect(early).toHaveLength(0)
  })

  it('CLOSING still withholds a question', () => {
    expect(closingTurnWithholdsQuestion('CLOSING')).toBe(true)
    expect(closingTurnWithholdsQuestion('CORE')).toBe(false)
  })
})

// ── 9/10/11 · nothing manufactures mastery ─────────────────────────────────

describe('mastery still requires real graded evidence', () => {
  it('100 acknowledgements produce c=0 p=0', () => {
    const { state } = drive({
      turns: 100, writesQuestion: CHATTY, acknowledgement: true, answer: () => null,
    })
    expect(state.correctAtCheck).toBe(0)
    expect(state.correctAtPractice).toBe(0)
  })

  it('100 wrong answers produce no mastery', () => {
    const { state } = drive({ turns: 100, writesQuestion: CHATTY, answer: () => false })
    expect(state.correctAtCheck).toBe(0)
    expect(state.correctAtPractice).toBe(0)
  })

  it('100 degraded turns neither teach nor advance', () => {
    const { state } = drive({
      turns: 100, writesQuestion: CHATTY, degraded: true, answer: () => null,
    })
    expect(state.correctAtCheck).toBe(0)
    expect(state.demonstrated).toBe(false)
  })

  it('a degraded outage template carrying a "?" is not folded as a teach segment', () => {
    const prev = at('GUIDE', { teachSegmentsSinceQuestion: 0, questionsAskedSinceTeach: 2 })
    const s = advanceConversationState(prev, { ...teachTurnWithRhetoricalQuestion, degradedTurn: true })
    expect(s.teachSegmentsSinceQuestion).toBe(0)
    expect(s.questionsAskedSinceTeach).toBe(2)
  })
})

// ── backward compatibility ──────────────────────────────────────────────────

describe('callers that omit the optional evidence are unaffected', () => {
  it('evidence without questionSanctioned/deliveredTeaching folds exactly as before', () => {
    const prev = at('GUIDE', { questionsAskedSinceTeach: 2, teachSegmentsSinceQuestion: 3 })
    const s = advanceConversationState(prev, {
      askedQuestion: true, signalCorrect: null, recoveryFired: false,
    })
    // The pre-existing shape: an unsanctioned-unknown question increments and
    // zeroes the give counter.
    expect(s.questionsAskedSinceTeach).toBe(3)
    expect(s.teachSegmentsSinceQuestion).toBe(0)
  })

  it('a question with deliveredTeaching but no sanction verdict is unchanged', () => {
    const prev = at('GUIDE', { questionsAskedSinceTeach: 1 })
    const s = advanceConversationState(prev, {
      askedQuestion: true, deliveredTeaching: true, signalCorrect: null, recoveryFired: false,
    })
    expect(s.questionsAskedSinceTeach).toBe(2)
    expect(s.teachSegmentsSinceQuestion).toBe(0)
  })
})
