/**
 * K4 — Band-4 decision matrix parity against the module it was transcribed
 * from.
 *
 * WHY THIS EXISTS. Before this milestone, Band 4 encoded ONE of the
 * conversation ladder's seven heuristic gates (repeated struggle). The other
 * six — two consecutive "I don't know"s, the permanent prior-knowledge probe
 * gate, the semantic loop break, the observe-failure gate, the hard question
 * budget, worked-example-first — existed only in
 * conversationState.decideNextMoveHeuristic. Every one of them was added
 * because of an observed failure, and a primary-mode engine would have
 * silently dropped all six: the tutor would have gone back to asking a third
 * question without giving anything, and to re-probing prior knowledge
 * forever.
 *
 * So the promotion criterion for K4 primary is not an opinion about whether
 * the pack looks complete. It is this file: for every reachable ladder state,
 * does the pack decide what the ladder decides?
 *
 * The ladder is the authority. Where they differ, the pack is wrong — unless
 * the difference is one of the two documented, intentional additions asserted
 * at the bottom.
 */
import { describe, it, expect } from 'vitest'
import { decide, BASE_PACK } from '@/lib/kernel/policy'
import type { PolicyInputs } from '@/lib/kernel/policy/types'
import {
  decideNextMoveDetailed, type ConversationState, type TeachingPhase,
} from '@/lib/teaching/conversationState'
import { toPolicyMove } from '@/lib/kernel/policyMove'

// ── one state, two representations ──────────────────────────────────────────

interface Scenario {
  key: string
  cs: ConversationState
  workedExampleFirst: boolean
}

const PHASES: TeachingPhase[] = ['OBSERVE', 'DEMONSTRATE', 'GUIDE', 'CHECK', 'PRACTICE', 'TRANSFER']

function baseState(phase: TeachingPhase): ConversationState {
  return {
    phase,
    demonstrated: false,
    taughtThisSession: false,
    consecutiveFailures: 0,
    questionsAskedSinceTeach: 0,
    teachSegmentsSinceQuestion: 0,
    consecutivePriorKnowledgeProbes: 0,
    totalKnowledgeProbes: 0,
    consecutiveDontKnows: 0,
    observeFailures: 0,
    remediationCount: 0,
  } as ConversationState
}

/** The SAME state, expressed as PolicyInputs. This mapping is the contract
 *  the runtime gate implements (policyInputsFromState + the route's
 *  legality/context inputs); stating it once here keeps the parity claim
 *  honest — a mapping written per-assertion could be tuned until it agreed. */
function toInputs(cs: ConversationState, workedExampleFirst: boolean): PolicyInputs {
  return {
    turnId: 't', learnerId: 'L', sessionId: 'S',
    contentRegister: 'intermediate', profileLevel: 'intermediate',
    sessionFailureCount: 0, isFirstLessonContext: false,
    phase: cs.phase, stageCeiling: 2,
    demonstrated: cs.demonstrated === true,
    taughtThisSession: cs.taughtThisSession === true,
    consecutiveFailures: cs.consecutiveFailures ?? 0,
    interruptActive: false, failureStateKey: null, autonomyRequested: false,
    retroWinOwed: false, dueReviewCount: 0, freshBoundary: false,
    lastSignalCorrect: null, lastSignalConfidence: null, currentConceptId: null,
    askLegal: true, askBlockedReason: null,
    consecutiveDontKnows: cs.consecutiveDontKnows ?? 0,
    totalKnowledgeProbes: cs.totalKnowledgeProbes ?? 0,
    consecutivePriorKnowledgeProbes: cs.consecutivePriorKnowledgeProbes ?? 0,
    observeFailures: cs.observeFailures ?? 0,
    questionsAskedSinceTeach: cs.questionsAskedSinceTeach ?? 0,
    teachSegmentsSinceQuestion: cs.teachSegmentsSinceQuestion ?? 0,
    workedExampleFirst,
  }
}

/**
 * The scenario space. Every counter the heuristic reads is varied across its
 * decision boundary (below / at), and the phases across all six. This is a
 * cross-product, not a hand-picked list: a hand-picked list proves parity
 * only where the author already believed it held.
 */
function scenarios(): Scenario[] {
  const out: Scenario[] = []
  for (const phase of PHASES)
    for (const consecutiveDontKnows of [0, 2])
      for (const totalKnowledgeProbes of [0, 2])
        for (const consecutivePriorKnowledgeProbes of [0, 2])
          for (const observeFailures of [0, 2])
            for (const questionsAskedSinceTeach of [0, 1, 2])
              for (const consecutiveFailures of [0, 1, 2])
                for (const teachSegmentsSinceQuestion of [0, 2])
                  for (const demonstrated of [false, true])
                    for (const workedExampleFirst of [false, true]) {
                      const cs = {
                        ...baseState(phase),
                        consecutiveDontKnows, totalKnowledgeProbes,
                        consecutivePriorKnowledgeProbes, observeFailures,
                        questionsAskedSinceTeach, consecutiveFailures,
                        teachSegmentsSinceQuestion, demonstrated,
                      } as ConversationState
                      out.push({
                        key: [phase, `dk${consecutiveDontKnows}`, `tp${totalKnowledgeProbes}`,
                          `cp${consecutivePriorKnowledgeProbes}`, `of${observeFailures}`,
                          `q${questionsAskedSinceTeach}`, `f${consecutiveFailures}`,
                          `ts${teachSegmentsSinceQuestion}`, demonstrated ? 'demo' : '-',
                          workedExampleFirst ? 'wef' : '-'].join('|'),
                        cs, workedExampleFirst,
                      })
                    }
  return out
}

const SCENARIOS = scenarios()

/** The ladder's answer, in the kernel's move vocabulary. Uses the single
 *  owner of that mapping — restating it here would let the test agree with a
 *  stale copy, which is the drift kernel/policyMove.ts was created to end. */
function ladderMove(s: Scenario): string | null {
  const d = decideNextMoveDetailed(s.cs, {
    recoveryTurn: false,
    workedExampleFirst: s.workedExampleFirst,
    legality: { hasEvidencedPriorKnowledge: true },   // ASK legal: this file tests Band 4
  })
  return toPolicyMove({ recoveryKey: null, episodePhase: null, ladderMove: d.move })
}

// ── the parity claim ────────────────────────────────────────────────────────

describe('Band 4 reproduces the conversation ladder', () => {
  it('covers the whole reachable counter space', () => {
    expect(SCENARIOS.length).toBeGreaterThanOrEqual(1000)
    expect(new Set(SCENARIOS.map((s) => s.key)).size).toBe(SCENARIOS.length)
  })

  it('is not vacuous — the space exercises all three ladder outcomes', () => {
    // A parity test over a space where the ladder always answers the same
    // thing proves nothing. ASK is the rarest (108/6912) and that is a
    // property of the sampling, not a defect: every gate is sampled at both
    // sides of its boundary, so half the scenarios trip at least one gate,
    // and any trip forces a give.
    const counts = new Map<string, number>()
    for (const s of SCENARIOS) {
      const m = ladderMove(s) ?? 'null'
      counts.set(m, (counts.get(m) ?? 0) + 1)
    }
    expect([...counts.keys()].sort()).toEqual(['ASK', 'SHOW', 'TEACH'])
    for (const [move, n] of counts) expect(n, `only ${n} × ${move}`).toBeGreaterThan(50)
  })

  it('every transcribed gate is individually exercised and individually decisive', () => {
    // The assertion that makes the parity claim mean something per-rule:
    // for each gate, a state where ONLY that gate trips must move the ladder
    // off its phase default — and the pack must follow it there. A rule the
    // scenario space never isolates is a rule the parity claim does not
    // actually cover.
    const cases: Array<[string, Partial<ConversationState>, string, string]> = [
      ['consecutive-dont-knows', { consecutiveDontKnows: 2 }, 'SHOW', 'B4.gate.consecutive-dont-knows.v1'],
      ['total-knowledge-probes', { totalKnowledgeProbes: 2 }, 'SHOW', 'B4.gate.total-knowledge-probes.v1'],
      ['repeated-probe-intent', { consecutivePriorKnowledgeProbes: 2 }, 'SHOW', 'B4.gate.repeated-probe-intent.v1'],
      ['observe-failures', { observeFailures: 2 }, 'SHOW', 'B4.gate.observe-failures.v1'],
      ['question-budget (not failing)', { questionsAskedSinceTeach: 2 }, 'TEACH', 'B4.gate.question-budget.teach.v1'],
      ['question-budget (failing)', { questionsAskedSinceTeach: 2, consecutiveFailures: 1 }, 'SHOW', 'B4.gate.question-budget.show.v1'],
      ['repeated struggle', { consecutiveFailures: 2 }, 'SHOW', 'B4.repeated-struggle.show.v1'],
    ]
    for (const [name, patch, expected, ruleId] of cases) {
      // OBSERVE's default is ASK, so any gate that fires is visible.
      const cs = { ...baseState('OBSERVE'), ...patch } as ConversationState
      const s: Scenario = { key: name, cs, workedExampleFirst: false }
      expect(ladderMove(s), `${name}: ladder`).toBe(expected)
      const d = decide(BASE_PACK, toInputs(cs, false))
      expect(d.move, `${name}: pack`).toBe(expected)
      expect(d.provenance.map((t) => t.ruleId), `${name}: provenance`).toContain(ruleId)
    }

    // The two context-driven rules, which are not ladder-state counters.
    const wef: Scenario = { key: 'wef', cs: baseState('DEMONSTRATE'), workedExampleFirst: true }
    expect(ladderMove(wef)).toBe('SHOW')
    expect(decide(BASE_PACK, toInputs(wef.cs, true)).provenance.map((t) => t.ruleId))
      .toContain('B4.worked-example-first.show.v1')

    const guideAsk = { ...baseState('GUIDE'), teachSegmentsSinceQuestion: 2 } as ConversationState
    expect(ladderMove({ key: 'guide-ask', cs: guideAsk, workedExampleFirst: false })).toBe('ASK')
    expect(decide(BASE_PACK, toInputs(guideAsk, false)).provenance.map((t) => t.ruleId))
      .toContain('B4.default.guide-ask.v1')
  })

  it('agrees with decideNextMoveHeuristic on EVERY scenario', () => {
    const mismatches: Array<{ key: string; ladder: string | null; pack: string }> = []
    for (const s of SCENARIOS) {
      const pack = decide(BASE_PACK, toInputs(s.cs, s.workedExampleFirst)).move
      const ladder = ladderMove(s)
      if (pack !== ladder) mismatches.push({ key: s.key, ladder, pack })
    }
    // Print the first few so a failure is diagnosable without a rerun.
    expect(mismatches.slice(0, 8), `${mismatches.length}/${SCENARIOS.length} scenarios diverge`).toEqual([])
  })

  it('names the gate that fired, not just the move', () => {
    // Provenance is why the four SHOW gates are separate rules. A tutor that
    // stopped asking because the learner said "I don't know" twice and one
    // that stopped because the probe budget is permanently spent need
    // different follow-ups, and the trace has to tell them apart.
    const dk = decide(BASE_PACK, toInputs({ ...baseState('OBSERVE'), consecutiveDontKnows: 2 } as ConversationState, false))
    const tp = decide(BASE_PACK, toInputs({ ...baseState('OBSERVE'), totalKnowledgeProbes: 2 } as ConversationState, false))
    expect(dk.provenance.map((t) => t.ruleId)).toContain('B4.gate.consecutive-dont-knows.v1')
    expect(tp.provenance.map((t) => t.ruleId)).toContain('B4.gate.total-knowledge-probes.v1')
    expect(dk.move).toBe('SHOW')
    expect(tp.move).toBe('SHOW')
  })

  it('reports no conflict when independent gates agree', () => {
    // Four gates concluding SHOW is agreement, not ambiguity.
    const d = decide(BASE_PACK, toInputs({
      ...baseState('OBSERVE'), consecutiveDontKnows: 2, totalKnowledgeProbes: 2,
      consecutivePriorKnowledgeProbes: 2, observeFailures: 2,
    } as ConversationState, false))
    expect(d.conflicts).toEqual([])
    expect(d.move).toBe('SHOW')
  })

  it('is deterministic across the whole scenario space', () => {
    const run = () => SCENARIOS.map((s) => decide(BASE_PACK, toInputs(s.cs, s.workedExampleFirst)).move).join(',')
    expect(run()).toBe(run())
  })
})

// ── the two intentional additions beyond the ladder ─────────────────────────

describe('what the pack adds to the ladder, on purpose', () => {
  it('the D1 grid decides where the ladder has no opinion', () => {
    // foundations/02 §1. The ladder never reads the previous answer's
    // correctness/confidence — the runtime applies the D1 grid as a PROMPT
    // overlay instead. In the pack it is a Band-4 rule, so it is auditable
    // and it reaches the decision rather than only the wording.
    const fastWrong = decide(BASE_PACK, {
      ...toInputs(baseState('CHECK'), false),
      lastSignalCorrect: false, lastSignalConfidence: 'high',
    })
    expect(fastWrong.move).toBe('TEACH')
    expect(fastWrong.actionClass).toBe('MISCONCEPTION_FIX')

    // …and it does NOT override the hard gates above it: a learner who has
    // said "I don't know" twice gets a demonstration regardless of what the
    // last answer looked like.
    const gated = decide(BASE_PACK, {
      ...toInputs({ ...baseState('CHECK'), consecutiveDontKnows: 2 } as ConversationState, false),
      lastSignalCorrect: false, lastSignalConfidence: 'high',
    })
    expect(gated.move).toBe('SHOW')
  })

  it('covers three D1 quadrants and deliberately leaves the fourth to the TSM', () => {
    const at = (correct: boolean | null, confidence: 'low' | 'medium' | 'high' | null) =>
      decide(BASE_PACK, {
        ...toInputs(baseState('CHECK'), false),
        lastSignalCorrect: correct, lastSignalConfidence: confidence,
      })

    // MISCONCEIVING — the dangerous quadrant: repair, never spot-correct.
    expect(at(false, 'high').actionClass).toBe('MISCONCEPTION_FIX')
    // FRAGILE — hold at the same level, one more of the same type.
    expect(at(true, 'low').actionClass).toBe('REPEAT_SAME_TYPE')
    // CONFUSED / GUESSING — step back; asking again is pushing on hope.
    const confused = at(false, 'low')
    expect(confused.move).toBe('SHOW')
    expect(confused.provenance.map((t) => t.ruleId)).toContain('B4.d1.confused.v1')

    // FLUENT MASTERY is the TSM's advance decision, not a Band-4 move: the
    // phase default carries the turn and no D1 rule fires.
    const fluent = at(true, 'high')
    expect(fluent.provenance.some((t) => t.ruleId.startsWith('B4.d1.'))).toBe(false)
    expect(fluent.move).toBe('ASK')          // CHECK's phase default

    // 'medium' asserts neither side of the confident/hesitant axis, so no
    // quadrant is invented from it.
    expect(at(false, 'medium').provenance.some((t) => t.ruleId.startsWith('B4.d1.'))).toBe(false)
    expect(at(true, 'medium').provenance.some((t) => t.ruleId.startsWith('B4.d1.'))).toBe(false)
  })

  it('a Band-2 illegality still outranks the entire decision matrix', () => {
    const d = decide(BASE_PACK, {
      ...toInputs({ ...baseState('CHECK'), teachSegmentsSinceQuestion: 2 } as ConversationState, false),
      askLegal: false, askBlockedReason: 'QL4_MISSING_CAPABILITY', taughtThisSession: true,
    })
    expect(d.move).toBe('TEACH')
    expect(d.provenance.map((t) => t.ruleId)).toContain('B2.legality.ask-illegal.v1')
  })
})
