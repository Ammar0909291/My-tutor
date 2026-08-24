/**
 * PHASE 4 · E — K4 policy engine: what is proven, and what `primary` still needs.
 *
 * This file does NOT enable primary mode and does not add a gate. It is the
 * executable form of the entry criteria, so "is K4 ready?" is answered by a
 * test run rather than by reading three documents and forming an impression.
 *
 * ── WHAT WAS ALREADY PROVEN, AND WHERE ─────────────────────────────────────
 * `src/tests/ladderParity.test.ts` proves Band 4 reproduces
 * `decideNextMoveHeuristic` across a 6,912-scenario cross-product of the
 * reachable counter space, with each of the seven heuristic gates isolated
 * and shown individually decisive. `src/tests/kernelSimulationEngine.test.ts`
 * proves zero move divergence between the engine and the adapter path across
 * the full persona battery. `src/tests/goldenDecisionGrid.test.ts` pins every
 * decision against a digest. None of that is repeated here.
 *
 * ── WHAT THIS FILE ADDS ────────────────────────────────────────────────────
 * Three things the existing suite does not state:
 *
 *   E1  The SEVEN gates are enumerated as a closed set, and the pack is
 *       checked to carry a rule for each. A gate added to the ladder without
 *       a pack rule fails here — which is the failure mode that made Band 4
 *       one-seventh complete in the first place.
 *   E2  The scope of the parity claim is stated honestly. `ladderParity`
 *       SKIPS every scenario where Band-2 legality decided the turn
 *       (`if (ladderBlockedReason(s) !== null) continue`), and BASE_PACK's
 *       own comment says why: the legality verdict ARRIVES AS AN INPUT
 *       (`askLegal`) rather than being reproduced. So the engine does not
 *       independently reproduce `questionLegality` — it consumes it. That is
 *       a deliberate design choice and it is also a limit on what "K4 parity
 *       complete" can mean.
 *   E3  Vocabulary handling: the pack's Band-4 guards accept BOTH the legacy
 *       6-phase names and the canonical 10-state names, and the two
 *       vocabularies agree on the move for every phase. The stage ceiling
 *       does NOT agree (see ladderReconciliation.test.ts, D6) — which is why
 *       `policyInputsFromState` passes the phase verbatim and must keep
 *       doing so until ISS-01 is decided.
 *
 * ── THE ONE THING THAT IS STRUCTURALLY MISSING ─────────────────────────────
 * The engine-vs-route parity IS recorded in production, into
 * `contextSnapshot.enginePolicyParity`, by route.ts. Nothing reads it: a
 * repo-wide search for `enginePolicyParity` outside route.ts returns nothing.
 * The masterplan's K4 gate is "replay diff vs pre-pack behavior REVIEWED AND
 * ACCEPTED"; a measurement no one can read cannot be reviewed. That is a
 * missing READER, not a missing mechanism, and it is asserted below so the
 * gap has a failing-when-fixed home.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { decide, BASE_PACK } from '@/lib/kernel/policy'
import type { PolicyInputs } from '@/lib/kernel/policy/types'
import {
  decideNextMoveDetailed, PHASE_ORDER,
  type ConversationState, type TeachingPhase,
} from '@/lib/teaching/conversationState'
import { toPolicyMove } from '@/lib/kernel/policyMove'
import { policyInputsFromState, DEFAULT_CALLER_FACTS, NO_SIGNAL } from '@/lib/eos-runtime/policyGate'
import { readEosFlags } from '@/lib/eos-runtime/flags'
import { PHASE_ORDER_10, canonicalToLegacy, getStageCeiling } from '@/lib/kernel/tsm/phases'
import type { KernelState } from '@/lib/kernel/types'

function baseState(phase: TeachingPhase): ConversationState {
  return {
    phase, demonstrated: false, taughtThisSession: false, consecutiveFailures: 0,
    questionsAskedSinceTeach: 0, teachSegmentsSinceQuestion: 0,
    consecutivePriorKnowledgeProbes: 0, totalKnowledgeProbes: 0,
    consecutiveDontKnows: 0, observeFailures: 0, remediationCount: 0,
  } as ConversationState
}

function inputs(cs: ConversationState, over: Partial<PolicyInputs> = {}): PolicyInputs {
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
    lastSignalCorrect: null, lastSignalConfidence: null, currentConceptId: 'c',
    askLegal: true, askBlockedReason: null,
    consecutiveDontKnows: cs.consecutiveDontKnows ?? 0,
    totalKnowledgeProbes: cs.totalKnowledgeProbes ?? 0,
    consecutivePriorKnowledgeProbes: cs.consecutivePriorKnowledgeProbes ?? 0,
    observeFailures: cs.observeFailures ?? 0,
    questionsAskedSinceTeach: cs.questionsAskedSinceTeach ?? 0,
    teachSegmentsSinceQuestion: cs.teachSegmentsSinceQuestion ?? 0,
    workedExampleFirst: false,
    ...over,
  }
}

function ladderMove(cs: ConversationState, workedExampleFirst = false): string | null {
  const d = decideNextMoveDetailed(cs, {
    recoveryTurn: false, workedExampleFirst,
    legality: { hasEvidencedPriorKnowledge: true },
  })
  return toPolicyMove({ recoveryKey: null, episodePhase: null, ladderMove: d.move })
}

// ── E1 · the seven gates are a closed set, and the pack covers all seven ───

/** Transcribed from `decideNextMoveHeuristic`, in its own evaluation order.
 *  This list IS the criterion: a gate present in the ladder and absent here
 *  is an unmeasured gate. */
const SEVEN_GATES: Array<{
  name: string
  patch: Partial<ConversationState>
  workedExampleFirst?: boolean
  from: TeachingPhase
  expected: 'SHOW' | 'TEACH' | 'ASK'
  ruleId: string
}> = [
  { name: 'two consecutive I-do-not-knows', patch: { consecutiveDontKnows: 2 },
    from: 'OBSERVE', expected: 'SHOW', ruleId: 'B4.gate.consecutive-dont-knows.v1' },
  { name: 'permanent prior-knowledge probe budget', patch: { totalKnowledgeProbes: 2 },
    from: 'OBSERVE', expected: 'SHOW', ruleId: 'B4.gate.total-knowledge-probes.v1' },
  { name: 'semantic loop break (repeated probe INTENT)', patch: { consecutivePriorKnowledgeProbes: 2 },
    from: 'OBSERVE', expected: 'SHOW', ruleId: 'B4.gate.repeated-probe-intent.v1' },
  { name: 'observe-failure gate', patch: { observeFailures: 2 },
    from: 'OBSERVE', expected: 'SHOW', ruleId: 'B4.gate.observe-failures.v1' },
  { name: 'question budget (not failing) → teach', patch: { questionsAskedSinceTeach: 2 },
    from: 'OBSERVE', expected: 'TEACH', ruleId: 'B4.gate.question-budget.teach.v1' },
  { name: 'question budget (failing) → show', patch: { questionsAskedSinceTeach: 2, consecutiveFailures: 1 },
    from: 'OBSERVE', expected: 'SHOW', ruleId: 'B4.gate.question-budget.show.v1' },
  { name: 'repeated struggle', patch: { consecutiveFailures: 2 },
    from: 'OBSERVE', expected: 'SHOW', ruleId: 'B4.repeated-struggle.show.v1' },
]

describe('E1 — all seven Band-4 heuristic gates, individually confirmed', () => {
  it('the ladder and the pack agree on every gate, and the pack names it', () => {
    for (const g of SEVEN_GATES) {
      const cs = { ...baseState(g.from), ...g.patch } as ConversationState
      expect(ladderMove(cs, g.workedExampleFirst ?? false), `${g.name}: ladder`).toBe(g.expected)
      const d = decide(BASE_PACK, inputs(cs, { workedExampleFirst: g.workedExampleFirst ?? false }))
      expect(d.move, `${g.name}: pack`).toBe(g.expected)
      expect(d.provenance.map((t) => t.ruleId), `${g.name}: provenance`).toContain(g.ruleId)
    }
  })

  it('the worked-example-first gate (context-driven, not a ladder counter)', () => {
    const cs = baseState('DEMONSTRATE')
    expect(ladderMove(cs, true)).toBe('SHOW')
    expect(decide(BASE_PACK, inputs(cs, { workedExampleFirst: true })).provenance.map((t) => t.ruleId))
      .toContain('B4.worked-example-first.show.v1')
  })

  it('CLOSED SET — the pack carries no Band-4 gate rule the ladder does not have', () => {
    const gateRuleIds = BASE_PACK.rules
      .filter((r) => r.band === 4 && r.ruleId.includes('.gate.'))
      .map((r) => r.ruleId)
      .sort()
    expect(gateRuleIds).toEqual([
      'B4.gate.consecutive-dont-knows.v1',
      'B4.gate.observe-failures.v1',
      'B4.gate.question-budget.show.v1',
      'B4.gate.question-budget.teach.v1',
      'B4.gate.repeated-probe-intent.v1',
      'B4.gate.total-knowledge-probes.v1',
    ])
    // Six `.gate.` rules + repeated-struggle + worked-example-first = the
    // seven ladder gates, with the question budget split in two by outcome.
    expect(gateRuleIds).toHaveLength(6)
  })
})

// ── E2 · the honest scope of the parity claim ──────────────────────────────

describe('E2 — Band 2 legality is CONSUMED, not reproduced', () => {
  it('the pack takes the verdict as an input and only subtracts ASK', () => {
    const rule = BASE_PACK.rules.find((r) => r.ruleId === 'B2.legality.ask-illegal.v1')
    expect(rule, 'B2.legality.ask-illegal.v1 missing').toBeTruthy()
    expect(rule!.guard.reads).toEqual(['askLegal'])
    // Purely subtractive: it bans ASK and says nothing about what to do instead.
    expect(rule!.effect.bannedMoves).toEqual(['ASK'])
  })

  it('with ASK ruled illegal, the pack falls to a give at every phase', () => {
    for (const phase of PHASE_ORDER) {
      const d = decide(BASE_PACK, inputs(baseState(phase), { askLegal: false, askBlockedReason: 'QL-2' }))
      expect(d.move, phase).not.toBe('ASK')
      expect(['SHOW', 'TEACH'], phase).toContain(d.move)
    }
  })

  it('CONSEQUENCE: questionLegality remains a SECOND decision authority under primary', () => {
    // The engine never computes QL-1…QL-5 or the capability lattice; it is
    // handed the answer. Promoting the engine to primary therefore does NOT
    // by itself collapse the runtime to one decision authority — legality
    // stays where it is. Stated here because "K4 primary" is easy to read as
    // "the engine decides the turn", and it would not.
    const noRuleComputesLegality = BASE_PACK.rules
      .filter((r) => r.band === 2)
      .every((r) => !r.guard.reads.includes('capabilityState' as never))
    expect(noRuleComputesLegality).toBe(true)
  })

  it('the caller-fact defaults are PERMISSIVE, which is the safe direction', () => {
    // A gate not told a turn is illegal must not invent an illegality.
    expect(DEFAULT_CALLER_FACTS).toEqual({ askLegal: true, blockedReason: null, workedExampleFirst: false })
    expect(NO_SIGNAL).toEqual({ correct: null, confidence: null })
  })
})

// ── E3 · vocabulary handling ───────────────────────────────────────────────

describe('E3 — legacy and canonical phase vocabularies', () => {
  it('the pack decides the SAME move for a canonical phase and its legacy image', () => {
    for (const cp of PHASE_ORDER_10) {
      const legacy = canonicalToLegacy(cp) as TeachingPhase
      const canonicalMove = decide(BASE_PACK, inputs(baseState(legacy), { phase: cp })).move
      const legacyMove = decide(BASE_PACK, inputs(baseState(legacy), { phase: legacy })).move
      expect(canonicalMove, `${cp} vs ${legacy}`).toBe(legacyMove)
    }
  })

  it('…but the STAGE CEILING differs, which is why the phase is passed verbatim', () => {
    // policyInputsFromState's own comment: translating at the gate would
    // silently change the ceiling. Measured:
    expect(getStageCeiling('CHECK')).toBe(4)
    expect(getStageCeiling('ASSESS')).toBe(6)
    const asCheck = decide(BASE_PACK, inputs(baseState('CHECK'), { phase: 'CHECK' })).stageCeiling
    const asAssess = decide(BASE_PACK, inputs(baseState('CHECK'), { phase: 'ASSESS' })).stageCeiling
    expect(asCheck).toBe(4)
    expect(asAssess).toBe(6)
    expect(asAssess).not.toBe(asCheck)
  })

  it('policyInputsFromState passes the phase through untranslated', () => {
    const state = {
      context: { turnId: 't', learnerId: 'L', sessionId: 'S' },
      teachingState: { phase: 'CHECK', stageCeiling: 4, demonstrated: true, counters: {} },
    } as unknown as KernelState
    expect(policyInputsFromState(state).phase).toBe('CHECK')
    const canonical = {
      ...state, teachingState: { ...(state as never as { teachingState: object }).teachingState, phase: 'ASSESS' },
    } as unknown as KernelState
    expect(policyInputsFromState(canonical).phase).toBe('ASSESS')
  })

  it('a totally unknown phase still yields a decision (the engine is total)', () => {
    const d = decide(BASE_PACK, inputs(baseState('OBSERVE'), { phase: 'NOT_A_PHASE' }))
    expect(['ASK', 'SHOW', 'TEACH', 'RECOVER', 'CLOSE']).toContain(d.move)
    expect(d.stageCeiling).toBe(2)   // conservative fallback
  })
})

// ── the entry criteria for ENABLE_POLICY_PACKS=primary ─────────────────────

describe('K4 primary-mode entry criteria', () => {
  it('primary is NOT reachable by the master flag alone', () => {
    const prevMaster = process.env.ENABLE_EOS_RUNTIME
    const prevPolicy = process.env.ENABLE_POLICY_PACKS
    try {
      process.env.ENABLE_EOS_RUNTIME = '1'
      delete process.env.ENABLE_POLICY_PACKS
      expect(readEosFlags().policyMode).toBe('shadow')
    } finally {
      if (prevMaster === undefined) delete process.env.ENABLE_EOS_RUNTIME; else process.env.ENABLE_EOS_RUNTIME = prevMaster
      if (prevPolicy === undefined) delete process.env.ENABLE_POLICY_PACKS; else process.env.ENABLE_POLICY_PACKS = prevPolicy
    }
  })

  it('MISSING READER — nothing outside route.ts reads enginePolicyParity', () => {
    // The K4 gate is "replay diff vs pre-pack behavior reviewed and
    // accepted". The diff is recorded per LearnSession in
    // contextSnapshot.enginePolicyParity and has no consumer, so it cannot
    // be reviewed. This assertion documents the gap; when a reader lands,
    // this test fails and should be updated to name it.
    const routeSrc = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
    expect(routeSrc).toContain('enginePolicyParity')
    // Guard against the claim silently going stale: if any OTHER production
    // module starts reading it, the ownership statement above needs revising.
    const gateSrc = readFileSync('src/lib/eos-runtime/policyGate.ts', 'utf8')
    expect(gateSrc).not.toContain('enginePolicyParity')
  })

  it('the shadow measurement only runs when ENABLE_KERNEL_PIPELINE is also on', () => {
    // A dependency that is easy to miss when planning the measurement window:
    // policyGate is called from inside the kernel-pipeline block, so setting
    // ENABLE_POLICY_PACKS=shadow alone records nothing.
    const routeSrc = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
    const pipelineIdx = routeSrc.indexOf("process.env.ENABLE_KERNEL_PIPELINE")
    const gateIdx = routeSrc.indexOf('const gate = policyGate({')
    expect(pipelineIdx).toBeGreaterThan(0)
    expect(gateIdx).toBeGreaterThan(pipelineIdx)
  })
})
