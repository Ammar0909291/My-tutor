/**
 * K6 — headless episode runner (RS T-5).
 *
 * Drives a persona through the REAL kernel stages with a stub driver: no LLM,
 * no DB, no network. The point is that nothing here re-implements a decision —
 * every turn goes through senseStage → commit1 → interruptScan → tsmStep →
 * policyStage, the same code the live route runs in shadow, and the ladder is
 * advanced by advanceConversationState, the same fold the route persists.
 *
 * If this file ever contains a teaching rule, the simulator has stopped
 * testing the runtime and started testing itself.
 */
import { senseStage } from '../stages/sense'
import { commit1Stage } from '../stages/commit1'
import { foldStage } from '../stages/fold'
import { interruptScanStage } from '../stages/interruptScan'
import { tsmStepStage } from '../stages/tsmStep'
import { policyStage, engineDecisionToPolicyDecision } from '../stages/policy'
import { initialState, makeTurnContext } from '../context'
import {
  initialConversationState, advanceConversationState, repliesWithQuestion,
  decideNextMoveDetailed, type ConversationState,
} from '@/lib/teaching/conversationState'
import { detectFailureState, isDontKnowSignal } from '@/lib/teaching/recoveryGuard'
import { rng, type Persona } from './personas'
import { checkEpisode, type EpisodeTurn, type InvariantViolation } from './invariants'

export interface EpisodeOptions {
  persona: Persona
  seed: number
  turns: number
  conceptId?: string
  contentRegister?: 'beginner' | 'intermediate' | 'expert'
  /**
   * Run the K4 POLICY ENGINE in shadow on every turn, alongside the adapter
   * path, and subject ITS decisions to the same invariant battery. The engine
   * is fed from the same kernel artifacts (tsmStep counters, interrupt scan)
   * and the same Band-2 verdict the adapter path derives — so a divergence is
   * attributable to the rules, exactly as in the live route's measurement.
   * Off by default: existing battery results stay byte-identical.
   */
  engineShadow?: boolean
  /**
   * R1 — the ladder input this simulator could not previously express.
   *
   * PRODUCTION derives it once, at route.ts:2756:
   *   snapshotSessionFailureCount >= 2 || strategyHoisted === 'FOUNDATION_REBUILD'
   * and hands it to `decideNextMoveDetailed`, where it gates
   *   `ctx.workedExampleFirst && !state.demonstrated && state.phase !== 'OBSERVE'`.
   *
   * Both of this file's decision call sites hardcoded `false`, so the replay
   * could not reach that gate at any seed, with any persona, for any number of
   * turns — including the OBSERVE deadlock fixed in f2294ae, the most recent
   * defect to have reached real learners.
   *
   * TOLD, NOT RE-DERIVED. The caller supplies the value production computed;
   * duplicating the derivation here would create a second implementation of a
   * rule that must have exactly one, and the two would drift.
   *
   * Off by default, so every existing battery result stays byte-identical.
   */
  workedExampleFirst?: boolean
}

export interface EpisodeResult {
  personaId: string
  seed: number
  turns: EpisodeTurn[]
  violations: InvariantViolation[]
  /** Distribution facts for cross-version comparison (RS T-5: "compare outcome
   *  distributions across versions"). Not assertions — observations. */
  outcome: {
    asks: number
    gives: number
    recoveries: number
    finalPhase: string
    reachedPhase: string[]
  }
  /** Present only when engineShadow was requested. */
  engine?: {
    /** The engine's decisions, run through the SAME invariant battery. */
    violations: InvariantViolation[]
    /** The engine's per-turn decisions, for the C6 replay transcript. Same
     *  objects the battery checked — a transcript rendered from anything else
     *  would not be showing what was verified. */
    turns: EpisodeTurn[]
    /** Turns where the engine's move differed from the adapter path's. */
    moveDivergences: Array<{ turnIndex: number; adapter: string | null; engine: string }>
    turnsCompared: number
  }
}

/** Run ONE episode. Deterministic in (persona, seed, turns). */
export async function runEpisode(opts: EpisodeOptions): Promise<EpisodeResult> {
  const rand = rng(opts.seed)
  const register = opts.contentRegister ?? 'beginner'
  // R1: one binding, read by BOTH decision call sites below, so the adapter
  // path and the engineShadow verdict can never be given different inputs.
  const workedExampleFirst = opts.workedExampleFirst === true
  let cs: ConversationState = initialConversationState(opts.conceptId ?? 'sim.concept')
  const turns: EpisodeTurn[] = []
  const engineTurns: EpisodeTurn[] = []
  const moveDivergences: NonNullable<EpisodeResult['engine']>['moveDivergences'] = []
  const reached = new Set<string>([cs.phase])
  let lastMoveWasAsk = false
  let prevCorrect: boolean | null = null
  let asks = 0, gives = 0, recoveries = 0

  for (let i = 0; i < opts.turns; i++) {
    const pt = opts.persona.turn(rand, i, lastMoveWasAsk)

    // ── the real stages ────────────────────────────────────────────────
    let s = initialState(makeTurnContext({
      learnerId: `sim-${opts.persona.id}`, sessionId: `seed-${opts.seed}`,
      subjectSlug: 'physics', messageLength: pt.message.length, isSchoolMode: false,
      turnId: `t${i}`, receivedAtMs: i,
    }))
    s = await senseStage({ message: pt.message }).run(s)
    s = await commit1Stage.run(s)
    // FOLD carries the register the engine reads; the adapter path receives
    // it as an argument, so both paths see the same value by construction.
    s = await foldStage({
      contentRegister: register, profileLevel: null, sessionFailureCount: 0,
      currentConceptId: opts.conceptId ?? 'sim.concept',
      hasVerifiedPlacement: false, pendingPlacementProbe: null,
      isFirstLessonContext: false,
    }).run(s)
    s = await interruptScanStage.run(s)
    s = await tsmStepStage({ conversationState: cs }).run(s)
    s = await policyStage({
      conversationState: cs,
      legality: {},
      contentRegister: register,
      episodePhase: 'CORE',
      workedExampleFirst,
      actionClass: null,
      availableVisualType: null,
      vocabularyBans: [],
      provenance: [],
    }).run(s)

    const decision = s.policy!
    const recoveryActive = s.interrupt?.active === true
    turns.push({ turnIndex: i, stateBefore: cs, decision, recoveryActive, message: pt.message })

    if (opts.engineShadow) {
      // The Band-2 verdict, from the ladder's own legality call — the same
      // wiring the live route uses (it hoists moveDecision.blockedReason and
      // hands it to the gate). Lazy import: eos-runtime is wiring, and the
      // simulator must not load it for callers that never asked for it.
      const { policyGate } = await import('@/lib/eos-runtime/policyGate')
      const detail = decideNextMoveDetailed(cs, {
        recoveryTurn: recoveryActive, workedExampleFirst, legality: {},
      })
      const gate = policyGate({
        state: s, mode: 'shadow',
        lastSignal: { correct: prevCorrect, confidence: null },
        caller: { askLegal: detail.blockedReason === null, blockedReason: detail.blockedReason },
      })
      if (gate.decision) {
        engineTurns.push({
          turnIndex: i, stateBefore: cs, recoveryActive, message: pt.message,
          decision: engineDecisionToPolicyDecision(gate.decision, {
            learnerId: s.context.learnerId, sessionId: s.context.sessionId, turnId: s.context.turnId,
          }),
        })
        if (gate.decision.move !== decision.move) {
          moveDivergences.push({ turnIndex: i, adapter: decision.move, engine: gate.decision.move })
        }
      }
    }

    if (decision.move === 'ASK') asks++; else gives++
    if (decision.move === 'RECOVER') recoveries++
    lastMoveWasAsk = decision.move === 'ASK'

    // ── advance the ladder with this turn's evidence, as the route does ──
    const recoveryKey = detectFailureState(pt.message)
    // The stub "renders" a turn that obeys the decision — the simulator tests
    // the DECISION plane, so a compliant render is the correct assumption.
    const assistantText = decision.move === 'ASK' ? 'What do you notice here?' : 'Here is how it works.'
    cs = advanceConversationState(cs, {
      askedQuestion: repliesWithQuestion(assistantText),
      signalCorrect: pt.correct,
      recoveryFired: recoveryKey !== null,
      dontKnowSignal: isDontKnowSignal(recoveryKey),
      learnerIssuedDirective: recoveryKey === 'too_many_questions',
    })
    prevCorrect = pt.correct ?? null
    reached.add(cs.phase)
  }

  return {
    personaId: opts.persona.id,
    seed: opts.seed,
    turns,
    violations: checkEpisode(turns),
    outcome: {
      asks, gives, recoveries,
      finalPhase: cs.phase,
      reachedPhase: [...reached],
    },
    ...(opts.engineShadow ? {
      engine: {
        violations: checkEpisode(engineTurns),
        turns: engineTurns,
        moveDivergences,
        turnsCompared: engineTurns.length,
      },
    } : {}),
  }
}

export interface BatteryOptions {
  personas: readonly Persona[]
  episodesPerPersona: number
  turnsPerEpisode: number
  /** Base seed; episode n uses baseSeed + n so a failing episode is
   *  reproducible from its reported seed alone. */
  baseSeed?: number
  /** Also run the K4 engine in shadow on every turn (see EpisodeOptions). */
  engineShadow?: boolean
  /** R1: forwarded to every episode (see EpisodeOptions.workedExampleFirst). */
  workedExampleFirst?: boolean
}

export interface BatteryResult {
  episodes: number
  totalTurns: number
  violations: Array<InvariantViolation & { personaId: string; seed: number }>
  byPersona: Record<string, { episodes: number; asks: number; gives: number; recoveries: number }>
  /** Present only when engineShadow was requested. Same merge-gate contract:
   *  `violations` must be empty for the ENGINE too. */
  engine?: {
    violations: Array<InvariantViolation & { personaId: string; seed: number }>
    turnsCompared: number
    moveDivergences: number
  }
}

/**
 * Run the full battery. This is the merge gate: `violations` must be empty.
 * RS T-5 specifies 10^4 episodes per release candidate; the count is a
 * parameter so CI can run the full set while the unit suite runs a smaller
 * deterministic sample in bounded time.
 */
export async function runBattery(opts: BatteryOptions): Promise<BatteryResult> {
  const base = opts.baseSeed ?? 1
  const violations: BatteryResult['violations'] = []
  const engineViolations: NonNullable<BatteryResult['engine']>['violations'] = []
  const byPersona: BatteryResult['byPersona'] = {}
  let episodes = 0, totalTurns = 0
  let engineTurnsCompared = 0, engineMoveDivergences = 0

  for (const persona of opts.personas) {
    byPersona[persona.id] = { episodes: 0, asks: 0, gives: 0, recoveries: 0 }
    for (let n = 0; n < opts.episodesPerPersona; n++) {
      const seed = base + n
      const r = await runEpisode({
        persona, seed, turns: opts.turnsPerEpisode, engineShadow: opts.engineShadow,
        workedExampleFirst: opts.workedExampleFirst,
      })
      episodes++
      totalTurns += r.turns.length
      byPersona[persona.id].episodes++
      byPersona[persona.id].asks += r.outcome.asks
      byPersona[persona.id].gives += r.outcome.gives
      byPersona[persona.id].recoveries += r.outcome.recoveries
      for (const v of r.violations) violations.push({ ...v, personaId: persona.id, seed })
      if (r.engine) {
        engineTurnsCompared += r.engine.turnsCompared
        engineMoveDivergences += r.engine.moveDivergences.length
        for (const v of r.engine.violations) engineViolations.push({ ...v, personaId: persona.id, seed })
      }
    }
  }
  return {
    episodes, totalTurns, violations, byPersona,
    ...(opts.engineShadow ? {
      engine: {
        violations: engineViolations,
        turnsCompared: engineTurnsCompared,
        moveDivergences: engineMoveDivergences,
      },
    } : {}),
  }
}
