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
import { interruptScanStage } from '../stages/interruptScan'
import { tsmStepStage } from '../stages/tsmStep'
import { policyStage } from '../stages/policy'
import { initialState, makeTurnContext } from '../context'
import {
  initialConversationState, advanceConversationState, repliesWithQuestion,
  type ConversationState,
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
}

/** Run ONE episode. Deterministic in (persona, seed, turns). */
export async function runEpisode(opts: EpisodeOptions): Promise<EpisodeResult> {
  const rand = rng(opts.seed)
  const register = opts.contentRegister ?? 'beginner'
  let cs: ConversationState = initialConversationState(opts.conceptId ?? 'sim.concept')
  const turns: EpisodeTurn[] = []
  const reached = new Set<string>([cs.phase])
  let lastMoveWasAsk = false
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
    s = await interruptScanStage.run(s)
    s = await tsmStepStage({ conversationState: cs }).run(s)
    s = await policyStage({
      conversationState: cs,
      legality: {},
      contentRegister: register,
      episodePhase: 'CORE',
      workedExampleFirst: false,
      actionClass: null,
      availableVisualType: null,
      vocabularyBans: [],
      provenance: [],
    }).run(s)

    const decision = s.policy!
    const recoveryActive = s.interrupt?.active === true
    turns.push({ turnIndex: i, stateBefore: cs, decision, recoveryActive })

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
  }
}

export interface BatteryOptions {
  personas: readonly Persona[]
  episodesPerPersona: number
  turnsPerEpisode: number
  /** Base seed; episode n uses baseSeed + n so a failing episode is
   *  reproducible from its reported seed alone. */
  baseSeed?: number
}

export interface BatteryResult {
  episodes: number
  totalTurns: number
  violations: Array<InvariantViolation & { personaId: string; seed: number }>
  byPersona: Record<string, { episodes: number; asks: number; gives: number; recoveries: number }>
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
  const byPersona: BatteryResult['byPersona'] = {}
  let episodes = 0, totalTurns = 0

  for (const persona of opts.personas) {
    byPersona[persona.id] = { episodes: 0, asks: 0, gives: 0, recoveries: 0 }
    for (let n = 0; n < opts.episodesPerPersona; n++) {
      const seed = base + n
      const r = await runEpisode({ persona, seed, turns: opts.turnsPerEpisode })
      episodes++
      totalTurns += r.turns.length
      byPersona[persona.id].episodes++
      byPersona[persona.id].asks += r.outcome.asks
      byPersona[persona.id].gives += r.outcome.gives
      byPersona[persona.id].recoveries += r.outcome.recoveries
      for (const v of r.violations) violations.push({ ...v, personaId: persona.id, seed })
    }
  }
  return { episodes, totalTurns, violations, byPersona }
}
