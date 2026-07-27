/**
 * K4 — the policy gate: the Policy Engine's FIRST production consumer.
 *
 * ROOT CAUSE THIS FIXES. K4 shipped a complete 7-band engine (`decide`), a
 * base pack covering bands 0–6, a TSM, and a pack registry that assembles
 * BASE_PACK + compiled C4 overlays into a runtime pack. Every one of them
 * was correct, pure and tested — and had zero callers outside the test
 * suite. `enginePolicyStage` was never constructed; `packRegistry
 * .runtimePack()` was never read; the route loaded compiled packs into a
 * registry it then never consulted. A decision engine nothing calls decides
 * nothing, so K4's Definition of Done ("replay diff vs pre-pack behaviour
 * reviewed and accepted") was not merely unmet — it was unmeasurable, in
 * exactly the way K3's DoD was before the parity observer existed.
 *
 * This module is that caller, and nothing else. It is:
 *   • PURE — a function of one KernelState plus the previous turn's signal
 *   • READ-ONLY in shadow — it has no path to the response or the DB
 *   • TOTAL — any internal failure returns `ran: false`, never throws
 *
 * INPUT PROVENANCE. The inputs are derived from the shadow pipeline's OWN
 * artifacts (view / interrupt / agenda / teachingState), not re-gathered
 * from the route. That is deliberate: if the engine read a second copy of
 * the turn's facts, a parity divergence could mean "the rules disagree" OR
 * "the two input paths drifted", and the measurement could not tell you
 * which. Reading one set of artifacts makes every divergence attributable
 * to the rules — which is the only thing the measurement is for.
 *
 * ── Why primary is not reachable yet, and what blocks it ─────────────────
 * PRIMARY mode would make the engine's `move` drive the turn. It cannot,
 * today, and the blocker is in code rather than in judgement:
 *
 *   buildTurnDirective() takes `nextMove: NextMove`, and
 *   conversationState.ts declares `NextMove = 'teach' | 'show' | 'ask'`.
 *   The engine emits PolicyMove, and kernel/policyMove.ts maps
 *   (recoveryKey, episodePhase, ladderMove) → 5 values including RECOVER
 *   and CLOSE. Those two have NO ladder preimage: policyMove.ts documents
 *   that decideNextMove() returns 'teach' on a recovery turn and that
 *   CLOSING lives entirely in the session machine. So PolicyMove → NextMove
 *   is not invertible, and a primary engine could only drive the prompt
 *   builder by inventing a ladder move the ladder would not have produced.
 *
 * The masterplan already owns that unification: K3's "Files migrated:
 * conversationState.ts → kernel/tsm.ts (with state migration)". Until it
 * lands, honouring "one decision authority" means the engine is measured,
 * not half-installed — a turn whose move comes from the ladder and whose
 * budgets come from the engine has two authorities, which is worse than
 * having one that is merely older.
 */
import type { KernelState } from '@/lib/kernel/types'
import type { EnginePolicyDecision, PolicyInputs } from '@/lib/kernel/policy/types'
import { decide } from '@/lib/kernel/policy'
import { packRegistry } from '@/lib/brain-compiler'
import { readEosFlags, type PolicyMode } from './flags'

/** The D1-grid inputs (Band 4). They live on the previous turn's SIGNAL
 *  tag, which the kernel does not carry as an artifact, so the caller
 *  supplies them. `null` is a legitimate value — it means the previous
 *  turn produced no answer to read, and the grid rules correctly do not
 *  fire. Fabrication is forbidden here exactly as it is at the sensor. */
export interface LastSignalFacts {
  correct: boolean | null
  confidence: 'low' | 'medium' | 'high' | null
}

export const NO_SIGNAL: LastSignalFacts = { correct: null, confidence: null }

/**
 * The Band-2 legality verdict, from questionLegality.ts via the ladder.
 * Carried in for the same reason the signal is: the kernel does not hold it
 * as an artifact, and the caller has already computed it. Re-deriving it
 * here would put "may this turn ask a question" in two places.
 *
 * The default is LEGAL. A gate that has not been told a turn is illegal must
 * not invent an illegality — the conservative direction for a legality
 * filter is to permit and let the measurement show the divergence, never to
 * silently suppress a question the runtime allowed.
 */
export interface AskLegalityFacts {
  askLegal: boolean
  blockedReason: string | null
}

export const ASK_LEGAL: AskLegalityFacts = { askLegal: true, blockedReason: null }

/**
 * KernelState → PolicyInputs. Total: every field has a defined value even
 * on a partially-populated state, because a policy engine that throws on a
 * missing artifact is a policy engine that takes the turn down.
 *
 * Phase is passed VERBATIM. BASE_PACK's Band-4 guards already accept both
 * the legacy 6-phase names conversationState.ts emits and the canonical
 * 10-state names (`i.phase === 'GUIDE' || i.phase === 'GUIDED'`), and
 * getStageCeiling() is total over both vocabularies. Translating here
 * would silently change the ceiling — legacyToCanonical maps CHECK→ASSESS,
 * whose canonical ceiling is 6 where the legacy CHECK ceiling is 4 — and
 * that is a TSM migration decision, not a gate decision.
 */
export function policyInputsFromState(
  state: KernelState,
  lastSignal: LastSignalFacts = NO_SIGNAL,
  legality: AskLegalityFacts = ASK_LEGAL,
): PolicyInputs {
  const { context, view, interrupt, agenda, teachingState } = state
  return {
    turnId: context.turnId,
    learnerId: context.learnerId,
    sessionId: context.sessionId,
    contentRegister: view?.contentRegister ?? 'intermediate',
    profileLevel: view?.profileLevel ?? null,
    sessionFailureCount: view?.sessionFailureCount ?? 0,
    isFirstLessonContext: view?.isFirstLessonContext === true,
    phase: teachingState?.phase ?? 'OBSERVE',
    stageCeiling: teachingState?.stageCeiling ?? 2,
    demonstrated: teachingState?.demonstrated === true,
    taughtThisSession: teachingState?.taughtThisSession === true,
    consecutiveFailures: teachingState?.consecutiveFailures ?? 0,
    interruptActive: interrupt?.active === true,
    failureStateKey: interrupt?.failureStateKey ?? null,
    autonomyRequested: interrupt?.autonomyRequested === true,
    retroWinOwed: agenda?.obligations.retroWinOwed === true,
    dueReviewCount: agenda?.obligations.dueReviewCount ?? 0,
    freshBoundary: agenda?.freshBoundary === true,
    lastSignalCorrect: lastSignal.correct,
    lastSignalConfidence: lastSignal.confidence,
    currentConceptId: agenda?.activeConceptId ?? view?.currentConceptId ?? null,
    askLegal: legality.askLegal,
    askBlockedReason: legality.blockedReason,
  }
}

export interface PolicyGateResult {
  mode: PolicyMode
  /** Did the engine actually produce a decision this turn? */
  ran: boolean
  decision: EnginePolicyDecision | null
  /** The assembled pack's version string — BASE_PACK's, joined with every
   *  activated C4 overlay, so a divergence can be attributed to a pack. */
  packVersion: string | null
  ruleCount: number
  /** Number of Band-3 rules in the runtime pack — the one number that says
   *  whether authored content is reaching policy at all (0 until a C4 pack
   *  is activated with ACTIVE content). */
  band3Rules: number
  error?: string
}

const OFF: PolicyGateResult = {
  mode: 'off', ran: false, decision: null, packVersion: null, ruleCount: 0, band3Rules: 0,
}

/**
 * Run the engine over the runtime pack. Total — never throws.
 *
 * The pack is `packRegistry.runtimePack()`, NOT BASE_PACK: the registry is
 * the declared owner of "which rules are active this process" (it already
 * merges BASE_PACK with the activated overlays in insertion order). Reading
 * BASE_PACK directly here would mean compiled C4 packs are loaded and then
 * ignored — which is the bug this module exists to end.
 */
export function policyGate(args: {
  state: KernelState
  lastSignal?: LastSignalFacts
  legality?: AskLegalityFacts
  /** Override for tests; production reads the flag. */
  mode?: PolicyMode
}): PolicyGateResult {
  const mode = args.mode ?? readEosFlags().policyMode
  if (mode === 'off') return OFF
  try {
    const pack = packRegistry.runtimePack()
    const decision = decide(pack, policyInputsFromState(
      args.state, args.lastSignal ?? NO_SIGNAL, args.legality ?? ASK_LEGAL,
    ))
    return {
      mode, ran: true, decision,
      packVersion: pack.packVersion,
      ruleCount: pack.rules.length,
      band3Rules: pack.rules.filter((r) => r.band === 3).length,
    }
  } catch (err) {
    // Fail-closed on the DECISION, fail-open on the TURN: the engine is
    // shadow, so returning no decision costs one measurement and nothing else.
    return { ...OFF, mode, error: err instanceof Error ? err.message : String(err) }
  }
}
