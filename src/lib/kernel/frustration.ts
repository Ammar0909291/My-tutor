/**
 * K7 — the Frustration machine (RS §4.14), the fast affect variable.
 *
 * WHY THIS ESTIMATOR AND NOT THE OTHERS. The masterplan's K7 rule is "no
 * model without a customer", and its stop-condition twin is "no model whose
 * detection needs behavioral baselines this environment cannot have".
 * Frustration is the one §4 estimator that clears both bars today:
 *
 *   · its triggers are ABSOLUTE — one failure, two failures in a
 *     three-turn window, a recovery-guard utterance — not deviations from a
 *     personal baseline (Motivation §4.13, Velocity, Forgetting all need
 *     baselines or decay data that only production traffic can supply);
 *   · its customer already exists and already reads the output shape: the
 *     K5 verifier's affect band (V-praise bans hollow praise under
 *     strained/flooded), previously derived by an ad-hoc floor in
 *     buildContext.ts. That floor is now this machine's band mapping — one
 *     owner instead of an estimator and a shortcut that could drift.
 *
 * §4.14 verbatim: CALM → STRAINED (1 failure or 1 mild utterance) →
 * FLOODED (strong utterance, or ≥2 failures in 3 turns, or spiral
 * signature) → recovering (Recovery ACTIVE) → CALM (after banked win + 1
 * clean turn). STRAINED tightens budgets; FLOODED = Band 0.
 *
 * HONEST LIMIT — utterance strength. The spec splits utterances into mild
 * (STRAINED) and strong (FLOODED). The runtime has no strength classifier:
 * recoveryGuard returns a failure-state key without a tier, and the spine
 * emitter records strength 'unknown'. Inventing a second lexicon here would
 * create a duplicate owner of utterance semantics, so v1 treats EVERY
 * recovery-guard utterance as the FLOODED trigger — the conservative
 * direction (the runtime already treats every such utterance as a Band-0
 * preempt), explicitly revisitable when a strength owner exists.
 *
 * Pure. Deterministic. State rides the session snapshot like every other
 * session-scoped counter — no new store, no new writer.
 */

export type FrustrationState = 'CALM' | 'STRAINED' | 'FLOODED' | 'RECOVERING'

export interface FrustrationMachine {
  state: FrustrationState
  /** Failure bits for the last 3 turns, newest first (the §4.14 window). */
  recentFailures: boolean[]
  /** RECOVERING exit needs a banked win THEN a clean turn (§4.14). */
  winBanked: boolean
}

export interface FrustrationEvidence {
  /** This turn's answer was wrong (SIGNAL correctness false). null = no
   *  answer to read; never counted as a failure (fabrication forbidden). */
  failed: boolean | null
  /** The recovery guard classified this turn's message as a failure-state
   *  utterance. Doubles as "Recovery is ACTIVE this turn". */
  recoveryFired: boolean
  /** This turn's answer was correct — the banked win RECOVERING waits for. */
  succeeded: boolean
}

export function initialFrustration(): FrustrationMachine {
  return { state: 'CALM', recentFailures: [], winBanked: false }
}

/** Total: tolerates a legacy or partial stored shape (same contract as
 *  readParityMetrics — snapshot fields must never take a turn down). */
export function readFrustration(raw: unknown): FrustrationMachine {
  if (raw && typeof raw === 'object') {
    const r = raw as Partial<FrustrationMachine>
    const state = r.state === 'STRAINED' || r.state === 'FLOODED' || r.state === 'RECOVERING' ? r.state : 'CALM'
    return {
      state,
      recentFailures: Array.isArray(r.recentFailures) ? r.recentFailures.slice(0, 3).map(Boolean) : [],
      winBanked: r.winBanked === true,
    }
  }
  return initialFrustration()
}

/** One turn's transition. Pure fold: state' = step(state, evidence). */
export function stepFrustration(m: FrustrationMachine, e: FrustrationEvidence): FrustrationMachine {
  const recentFailures = [e.failed === true, ...m.recentFailures].slice(0, 3)
  const failuresInWindow = recentFailures.filter(Boolean).length

  // Recovery ACTIVE overrides everything — the Recovery Engine owns the turn
  // and this machine records that it does (§4.14: "recovering (Recovery
  // ACTIVE)"). Entering recovery clears any previously banked win: the win
  // must come AFTER the flood, not be remembered from before it.
  if (e.recoveryFired) {
    return { state: 'RECOVERING', recentFailures, winBanked: false }
  }

  if (m.state === 'RECOVERING') {
    // Exit path: banked win + 1 clean turn (§4.14). A clean turn = no
    // failure and no utterance this turn.
    if (m.winBanked && e.failed !== true) return { state: 'CALM', recentFailures: [], winBanked: false }
    if (e.succeeded) return { state: 'RECOVERING', recentFailures, winBanked: true }
    return { state: 'RECOVERING', recentFailures, winBanked: false }
  }

  // FLOODED: ≥2 failures inside the 3-turn window. (The strong-utterance
  // trigger is subsumed by recoveryFired above — see the header's honest
  // limit.) FLOODED drains back through STRAINED, not straight to CALM.
  if (failuresInWindow >= 2) return { state: 'FLOODED', recentFailures, winBanked: false }
  if (m.state === 'FLOODED') {
    return e.succeeded
      ? { state: 'STRAINED', recentFailures, winBanked: false }
      : { state: 'FLOODED', recentFailures, winBanked: false }
  }

  // STRAINED: one failure (§4.14's absolute trigger).
  if (e.failed === true) return { state: 'STRAINED', recentFailures, winBanked: false }
  if (m.state === 'STRAINED') {
    // A success releases the strain; a neutral turn (no answer) holds it.
    return e.succeeded
      ? { state: 'CALM', recentFailures, winBanked: false }
      : { state: 'STRAINED', recentFailures, winBanked: false }
  }

  return { state: 'CALM', recentFailures, winBanked: false }
}

/** The customer mapping: machine state → the verifier's affect band
 *  (VerifierContext.affectBand). RECOVERING maps to flooded — the learner
 *  is still inside the failure state the Recovery Engine is treating, and
 *  praise-band/budget caution must not relax until the exit criteria hold. */
export function affectBandOf(state: FrustrationState): 'calm' | 'strained' | 'flooded' {
  switch (state) {
    case 'CALM': return 'calm'
    case 'STRAINED': return 'strained'
    case 'FLOODED': case 'RECOVERING': return 'flooded'
  }
}
