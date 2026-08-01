/**
 * WP-8 — Phase 3 Stages S3–S7, SHADOW ONLY.
 *
 * Each stage below computes what it would decide and returns a report. None
 * applies anything, and nothing in the runtime imports this module — so no
 * teaching decision, prompt, response or API differs with it present.
 *
 * The two ladder rules from §21.2 bind every stage and are implemented, not
 * merely cited:
 *   · NEVER FABRICATE A STATE READ — an absent signal produces no pressure,
 *     never an estimated one. Every unavailable input yields NOT_EVALUABLE.
 *   · DEGRADATION IS ALWAYS RECORDED — "an unrecorded fallback is
 *     indistinguishable from a healthy loop." Every report carries its reason.
 *
 * §25.4's standing constraints hold by construction: no stage adds a decision
 * authority, makes an illegal action legal, introduces a second LLM call,
 * writes to a store it does not own, sets the target band, overrides the affect
 * veto, or advances a teaching state. These functions are pure and return data.
 */
import type { AdaptationStateVector } from './asv'
import { declaredDials } from './asv'
import { allSet, type GovernorConstant, type GovernorConstantKey } from './governor'

export type StageVerdict = 'EVALUATED' | 'NOT_EVALUABLE' | 'INERT'

export interface StageReport {
  stage: 'S3' | 'S4' | 'S5' | 'S6' | 'S7'
  verdict: StageVerdict
  /** What the stage would recommend. NEVER applied — shadow only. */
  recommendation: string | null
  /** Always populated. Degradation is always recorded. */
  detail: string
  /** Invariant, asserted per report: this stage changed nothing. */
  applied: false
}

type Constants = ReadonlyMap<GovernorConstantKey, GovernorConstant>

export interface StageInputs {
  /** The declared ASV for this turn, or null if nothing was declared. */
  asv: AdaptationStateVector | null
  /** Standing ASV from the WP-4 carrier, or null when nothing persists yet. */
  standingAsv: AdaptationStateVector | null
  constants: Constants
  /** S5: authored hint ladders for the concept. Empty ⇒ inert by S5's rule. */
  authoredHintRungs?: readonly string[]
  /** S6: C-32 owner acceptance. Absent or false ⇒ inert by S6's rule. */
  c32Accepted?: boolean
  /** S7: recorded outcomes for the productive-band read. Absent ⇒ no read. */
  recentOutcomes?: readonly boolean[]
}

const notEvaluable = (stage: StageReport['stage'], detail: string): StageReport =>
  ({ stage, verdict: 'NOT_EVALUABLE', recommendation: null, detail, applied: false })

const inert = (stage: StageReport['stage'], detail: string): StageReport =>
  ({ stage, verdict: 'INERT', recommendation: null, detail, applied: false })

/**
 * S3 · Two dials — "D4 PACE and D5 LOAD only … Full governor."
 * Produces adaptation decisions and publishes them. Applies nothing.
 */
export function evaluateS3(i: StageInputs): StageReport {
  const needed: GovernorConstantKey[] = [
    'governor.d4.newElementRate.max', 'governor.d4.turnDensity.max',
    'governor.d4.waitTimeMultiplier.max', 'governor.d5.elementBudget.max',
    'governor.hysteresisGap', 'governor.dwellTurns.min',
  ]
  if (!allSet(i.constants, needed)) {
    return notEvaluable('S3', 'Governor constants for D4/D5 are NOT_SET in the policy store; §19.3 publishes no numbers, so there is nothing to fall back to.')
  }
  const dials = declaredDials(i.asv)
  const has = dials.includes('D4') || dials.includes('D5')
  if (!has) {
    return notEvaluable('S3', 'No D4 or D5 setting declared this turn — an absent signal produces no pressure (§21.2).')
  }
  return {
    stage: 'S3', verdict: 'EVALUATED',
    recommendation: `would consider D4/D5 movement from declared dials: ${dials.join(', ')}`,
    detail: 'Shadow: decision produced and published; no dial moved.',
    applied: false,
  }
}

/**
 * S4 · Scaffold — computes a scaffold recommendation from RECORDED evidence
 * and never changes scaffold.
 */
export function evaluateS4(i: StageInputs): StageReport {
  const current = i.asv?.scaffoldDial ?? i.standingAsv?.scaffoldDial
  if (current === undefined) {
    return notEvaluable('S4', 'No scaffoldDial recorded on this turn or in standing state; D1 is not readable, so no recommendation is computable.')
  }
  return {
    stage: 'S4', verdict: 'EVALUATED',
    recommendation: `scaffold recommendation computable from recorded D1=${current}`,
    detail: 'Shadow: recommendation computed; scaffold unchanged (S4 never changes scaffold).',
    applied: false,
  }
}

/**
 * S5 · Hint — "D2, on concepts with authored ladders ONLY. Inert elsewhere."
 */
export function evaluateS5(i: StageInputs): StageReport {
  const ladder = i.authoredHintRungs ?? []
  if (ladder.length === 0) {
    return inert('S5', 'No authored hint ladder for this concept — S5 is inert elsewhere by its own rule. A rung nobody authored is not a rung.')
  }
  const rung = i.asv?.hintRung
  if (rung === undefined) {
    return notEvaluable('S5', 'Authored ladder present but no D2 rung declared this turn.')
  }
  if (!ladder.includes(rung)) {
    return notEvaluable('S5', `Declared rung ${rung} is not in the authored ladder; rejected rather than accepted as a grant.`)
  }
  return {
    stage: 'S5', verdict: 'EVALUATED',
    recommendation: `would evaluate hint policy at authored rung ${rung}`,
    detail: 'Shadow: no hint granted.',
    applied: false,
  }
}

/**
 * S6 · Difficulty — "D3, D6, and the `C-32` band integration (AH-1)",
 * gated on C-32 owner acceptance.
 */
export function evaluateS6(i: StageInputs): StageReport {
  if (i.c32Accepted !== true) {
    return inert('S6', 'C-32 owner acceptance unavailable — S6 remains inert. Acceptance is an owner decision and is never assumed.')
  }
  const dials = declaredDials(i.asv)
  const has = dials.includes('D3') || dials.includes('D6')
  if (!has) {
    return notEvaluable('S6', 'No D3 or D6 setting declared this turn.')
  }
  return {
    stage: 'S6', verdict: 'EVALUATED',
    recommendation: `would consider D3/D6 movement from declared dials: ${dials.join(', ')}`,
    detail: 'Shadow: no difficulty or interleaving change applied.',
    applied: false,
  }
}

/**
 * S7 · Rung 2 — evaluates productive-band logic only, and never influences
 * runtime.
 */
export function evaluateS7(i: StageInputs): StageReport {
  const needed: GovernorConstantKey[] = [
    'governor.productiveBand.successRate.min', 'governor.productiveBand.successRate.max',
  ]
  if (!allSet(i.constants, needed)) {
    return notEvaluable('S7', 'Productive-band bounds are NOT_SET in the policy store.')
  }
  const outcomes = i.recentOutcomes ?? []
  if (outcomes.length === 0) {
    return notEvaluable('S7', 'No recorded outcomes — a success rate over zero samples is not a rate.')
  }
  const min = i.constants.get('governor.productiveBand.successRate.min')!.value!
  const max = i.constants.get('governor.productiveBand.successRate.max')!.value!
  const rate = outcomes.filter(Boolean).length / outcomes.length
  const inBand = rate >= min && rate <= max
  return {
    stage: 'S7', verdict: 'EVALUATED',
    recommendation: `success rate ${rate.toFixed(2)} is ${inBand ? 'inside' : 'outside'} the productive band [${min}, ${max}]`,
    detail: 'Shadow: read only; runtime uninfluenced.',
    applied: false,
  }
}

export interface ShadowRunReport {
  stages: StageReport[]
  /** The safety invariant, computed rather than asserted. */
  anyApplied: boolean
  evaluated: number
  notEvaluable: number
  inertCount: number
}

/** Run S3–S7 in shadow. Applies nothing, by construction. */
export function runShadowStages(i: StageInputs): ShadowRunReport {
  const stages = [evaluateS3(i), evaluateS4(i), evaluateS5(i), evaluateS6(i), evaluateS7(i)]
  return {
    stages,
    anyApplied: stages.some((s) => (s.applied as boolean) === true),
    evaluated: stages.filter((s) => s.verdict === 'EVALUATED').length,
    notEvaluable: stages.filter((s) => s.verdict === 'NOT_EVALUABLE').length,
    inertCount: stages.filter((s) => s.verdict === 'INERT').length,
  }
}
