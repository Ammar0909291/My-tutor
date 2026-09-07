/**
 * TURN_EVENT — one structured line per turn, so the next failure is READ
 * rather than rediscovered from source.
 *
 * ── WHY ────────────────────────────────────────────────────────────────────
 * The two P0 chemistry sessions could not be diagnosed from what production
 * recorded. `[gate-eligibility]` (added by Phase 7Q for exactly this reason)
 * carries the gate's own terms and is genuinely the best line this runtime
 * emits — but it is one of ~20 pretty-printed object logs per turn, none of
 * which carry session identity, and nothing joins the gate's decision to what
 * the model then did, to whether anything was graded, or to whether the lesson
 * moved at all. So "the tutor got stuck" had to be re-derived by reading 9,626
 * lines of route.
 *
 * Three fields on this line would have identified both P0s without opening a
 * file: `blockedBy`, `modelOfferedProseMcq`, and `stagnantTurns`.
 *
 * ── AND THE NUMBER THIS RUNTIME ALREADY DECIDED WAS THE IMPORTANT ONE ──────
 * questionLegality.ts defines `askViolations` and documents it as "the single
 * most diagnostic number the teaching runtime produces: it is the rate at which
 * the model overrides the kernel". `foldLegalityMetrics` computes it. Measured
 * 2026-09-07: `grep -rn foldLegalityMetrics src/app` returns ZERO. It has never
 * been computed in production. This module carries it per turn.
 *
 * ── COST AND PRIVACY ───────────────────────────────────────────────────────
 * One compact JSON line (~300 bytes), modelled on `EXCURSION_EVENT=` and
 * `BRAIN_EVENT=`. Platform log volume, NEVER a database write — this project is
 * under a 5 GB Supabase egress quota after a 50.8 GB incident, and observability
 * must never be the thing that breaks it. No learner text, no model text: every
 * field is a boolean, an enum, a count or an opaque id.
 */

export const TURN_EVENT_PREFIX = '[learn/chat] TURN_EVENT='

export interface TurnEvent {
  version: 1
  sessionId: string
  /** Collapses duplicate delivery of one execution's line at aggregation time:
   *  count distinct turnKey, not rows. Same convention as EXCURSION_EVENT. */
  turnKey: string
  conceptId: string | null
  subjectSlug: string | null

  // ── what the kernel decided ──────────────────────────────────────────────
  phaseBefore: string | null
  phaseAfter: string | null
  decidedMove: 'teach' | 'show' | 'ask' | null
  /** Why ASK was removed from the legal set, if it was. */
  legalityBlock: string | null

  // ── whether an assessment was due, and what happened to it ───────────────
  gateEligible: boolean
  /** The gate's own terms that were FALSE, in declaration order. The field to
   *  read first, and the one that answers "why was there no question". */
  blockedBy: string[]
  selectedProbeId: string | null
  pendingProbeId: string | null
  /** Turns this pending probe has been on screen without being graded. The
   *  L1 latch is visible as this number climbing while blockedBy contains
   *  noUnansweredProbeOnScreen. */
  probeHeldTurns: number

  // ── what the model did with the contract ─────────────────────────────────
  modelOfferedTaggedMcq: boolean
  /** THE BLIND CHANNEL. Enforcement keys on the `<!--MCQ-->` tag, so a model
   *  that asks a multiple-choice question in prose performs an educational act
   *  no guard sees. Detected here for the first time. */
  modelOfferedProseMcq: boolean
  /** decideModelProbe's verdict — served, withheld, and on what grounds. */
  modelProbeVerdict: string | null
  /** The kernel said do not ask, and the rendered reply asked anyway. */
  askViolation: boolean

  // ── what became authoritative ────────────────────────────────────────────
  gradeSource: 'server-key' | 'none'
  gradedCorrect: boolean | null
  /** Why the model's self-reported correctness was dropped, if it was. */
  signalSuppressedReason: string | null
  masteryCounterMoved: boolean
  verifiedMastery: boolean

  // ── liveness ─────────────────────────────────────────────────────────────
  turnOutcome: 'productive' | 'unproductive' | 'excluded' | null
  stagnantTurns: number
  escalationRung: number

  // ── context ──────────────────────────────────────────────────────────────
  provider: string | null
  degraded: boolean
  excursionActive: boolean
  recoveryFired: boolean
  visualServed: boolean
}

/**
 * Build the event. Every argument is a fact the turn has already computed, so
 * this module derives and never fetches. Unknowns are explicit nulls rather
 * than omitted keys — a missing field and a false field must not look the same
 * to an aggregation query.
 */
export function buildTurnEvent(i: Partial<TurnEvent> & { sessionId: string; turnKey: string }): TurnEvent {
  return {
    version: 1,
    sessionId: i.sessionId,
    turnKey: i.turnKey,
    conceptId: i.conceptId ?? null,
    subjectSlug: i.subjectSlug ?? null,
    phaseBefore: i.phaseBefore ?? null,
    phaseAfter: i.phaseAfter ?? null,
    decidedMove: i.decidedMove ?? null,
    legalityBlock: i.legalityBlock ?? null,
    gateEligible: i.gateEligible ?? false,
    blockedBy: i.blockedBy ?? [],
    selectedProbeId: i.selectedProbeId ?? null,
    pendingProbeId: i.pendingProbeId ?? null,
    probeHeldTurns: i.probeHeldTurns ?? 0,
    modelOfferedTaggedMcq: i.modelOfferedTaggedMcq ?? false,
    modelOfferedProseMcq: i.modelOfferedProseMcq ?? false,
    modelProbeVerdict: i.modelProbeVerdict ?? null,
    askViolation: i.askViolation ?? false,
    gradeSource: i.gradeSource ?? 'none',
    gradedCorrect: i.gradedCorrect ?? null,
    signalSuppressedReason: i.signalSuppressedReason ?? null,
    masteryCounterMoved: i.masteryCounterMoved ?? false,
    verifiedMastery: i.verifiedMastery ?? false,
    turnOutcome: i.turnOutcome ?? null,
    stagnantTurns: i.stagnantTurns ?? 0,
    escalationRung: i.escalationRung ?? 0,
    provider: i.provider ?? null,
    degraded: i.degraded ?? false,
    excursionActive: i.excursionActive ?? false,
    recoveryFired: i.recoveryFired ?? false,
    visualServed: i.visualServed ?? false,
  }
}

export function recordTurnEvent(event: TurnEvent): void {
  try {
    console.log(TURN_EVENT_PREFIX + JSON.stringify(event))
  } catch { /* observability never breaks a turn */ }
}
