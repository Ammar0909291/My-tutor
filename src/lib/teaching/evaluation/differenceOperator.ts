/**
 * WP-9 — Phase 1 Stage 3: TQ-4's Difference Operator, EVALUATED not enforced.
 *
 * §7.4.2 defines re-teach legality over an intentional change plus its forced
 * consequences:
 *
 *   (L1) exactly ONE primary axis p is declared, and B[p] ≠ A[p]
 *   (L2) p is the axis the recorded diagnosis (§7.3) implicates
 *   (L3) B = closure(A, p, B[p]) — every other axis on which B differs from A
 *        lies in the closure
 *   (L4) B ∉ failedAttempts(learner, concept)
 *   (L5) B satisfies all C-29 legality and all TQ-3 preconditions
 *   B = A is PARAPHRASE and remains ILLEGAL.
 *
 * THIS MODULE EVALUATES. It never filters a candidate, never returns a
 * constraint, and is imported by no runtime path — Stage 3's enforcement half
 * would make an action illegal at turn time, which is a decision authority and
 * is out of WP-9's read-only scope.
 *
 * closure() is TOTAL and PURE, as §7.4.2 requires: every (vector, axis, value)
 * triple has a defined result, and it reads nothing but its arguments so
 * deterministic replay is preserved. Totality is achieved by construction — the
 * dependency table below is consulted for forced consequences, and an axis with
 * no entry forces nothing, which is a defined result rather than a gap.
 *
 * NEVER FAIL ON MISSING INSTRUMENTATION. An unavailable prerequisite returns
 * NOT_EVALUABLE or INSUFFICIENT_EVIDENCE. A vector that never declared an axis
 * is not a vector that changed it, and scoring absence as a violation would
 * manufacture findings out of P1-1's PROXY coverage gaps.
 */
import type { AttemptVectorV2 } from '@/lib/evidence-spine/types'

export const AXES = [
  'channel', 'method', 'representation', 'concreteness',
  'entryPoint', 'granularity', 'agency', 'instance',
] as const
export type Axis = (typeof AXES)[number]

export type LegalityVerdict =
  | 'LEGAL' | 'PARAPHRASE' | 'ILLEGAL'
  | 'NOT_EVALUABLE' | 'INSUFFICIENT_EVIDENCE'

export interface LegalityResult {
  verdict: LegalityVerdict
  /** Which of L1–L5 decided it, when one did. */
  rule: 'L1' | 'L2' | 'L3' | 'L4' | 'L5' | null
  primaryAxis: Axis | null
  /** Axes on which B differs from A, whether or not they are in the closure. */
  changed: Axis[]
  /** Axes present in neither vector — the reason a verdict may be withheld. */
  undeclared: Axis[]
  detail: string
}

/**
 * §7.4.3's axis-dependency matrix, in the CORRECTED form: the three entries the
 * document disproves (METHOD→CHANNEL, METHOD→REPRESENTATION, CHANNEL→METHOD)
 * are `○` and are therefore absent here. Only genuinely forced consequences
 * appear; an axis missing from this table forces nothing, which is what makes
 * closure total without a catch-all.
 *
 * Every entry is a forced consequence stated by §7.4.1's own ordering:
 * concreteness and representation co-vary (a concrete-object representation is
 * enactive; an algebraic one is symbolic), and INSTANCE changes whenever any
 * other axis does — §7.4.3's "Every axis → INSTANCE" column.
 */
const FORCED: Partial<Record<Axis, readonly Axis[]>> = {
  channel: ['instance'],
  method: ['instance'],
  representation: ['concreteness', 'instance'],
  concreteness: ['representation', 'instance'],
  entryPoint: ['instance'],
  granularity: ['instance'],
  agency: ['instance'],
  instance: [],
}

/** The closure set for a primary axis: the axes a change on `p` may force.
 *  Total — an axis with no entry returns the empty set, a defined result. */
export function closureAxes(primaryAxis: Axis): readonly Axis[] {
  return FORCED[primaryAxis] ?? []
}

/**
 * closure(A, p, targetValue) → the legal vector shape. Pure and total.
 *
 * Returns A with `p` set to the target and every forced axis marked as
 * PERMITTED-TO-DIFFER. It does not invent values for the forced axes: knowing
 * that a change is forced is not knowing what it was changed to, and inventing
 * one would be the fabrication §7.4.2's purity requirement rules out.
 */
export function closure(
  from: AttemptVectorV2,
  primaryAxis: Axis,
  targetValue: string,
): { vector: AttemptVectorV2; permittedToDiffer: readonly Axis[] } {
  const vector: AttemptVectorV2 = { ...from, [primaryAxis]: targetValue } as AttemptVectorV2
  return { vector, permittedToDiffer: closureAxes(primaryAxis) }
}

function axisValue(v: AttemptVectorV2, a: Axis): string | undefined {
  return (v as unknown as Record<Axis, string | undefined>)[a]
}

/** Axes on which two vectors differ, counting only axes BOTH declared. An axis
 *  one side never declared is undeclared, not changed. */
export function changedAxes(a: AttemptVectorV2, b: AttemptVectorV2): { changed: Axis[]; undeclared: Axis[] } {
  const changed: Axis[] = []
  const undeclared: Axis[] = []
  for (const ax of AXES) {
    const av = axisValue(a, ax)
    const bv = axisValue(b, ax)
    if (av === undefined || bv === undefined) { undeclared.push(ax); continue }
    if (av !== bv) changed.push(ax)
  }
  return { changed, undeclared }
}

export interface LegalityInputs {
  /** The failed attempt being replaced. */
  from: AttemptVectorV2 | null
  /** The proposed re-teach. */
  to: AttemptVectorV2 | null
  /** The axis the recorded diagnosis implicates (L2). Null when no diagnosis
   *  was recorded — which withholds a verdict rather than inventing one. */
  diagnosisAxis?: Axis | null
  /** L4's set. Absent means the set is unknown, not that it is empty. */
  failedAttempts?: readonly AttemptVectorV2[]
}

/**
 * Evaluate L1–L5 over a captured pair. Read-only: returns a verdict, filters
 * nothing.
 */
export function evaluateReteachLegality(i: LegalityInputs): LegalityResult {
  const base = { primaryAxis: null, changed: [] as Axis[], undeclared: [] as Axis[] }

  if (i.from === null || i.to === null) {
    return { ...base, verdict: 'NOT_EVALUABLE', rule: null,
      detail: 'One or both attempt vectors were never captured. P1-1 is a declared PROXY, so absence is a coverage gap, not a violation.' }
  }

  const { changed, undeclared } = changedAxes(i.from, i.to)

  if (changed.length === 0) {
    // Paraphrase only if enough was declared to say so. With every axis
    // undeclared, "no axis changed" is ignorance, not sameness.
    if (undeclared.length === AXES.length) {
      return { ...base, verdict: 'INSUFFICIENT_EVIDENCE', rule: null, undeclared,
        detail: 'No axis was declared on either vector — indistinguishable from a paraphrase, and not evidence of one.' }
    }
    return { ...base, verdict: 'PARAPHRASE', rule: 'L1', changed, undeclared,
      detail: 'No declared axis differs. B = A is paraphrase and remains illegal (§7.4.2).' }
  }

  if (i.diagnosisAxis === undefined || i.diagnosisAxis === null) {
    return { ...base, verdict: 'NOT_EVALUABLE', rule: 'L2', changed, undeclared,
      detail: 'No recorded diagnosis, so the implicated axis is unknown. Mandatory diagnosis without a record is mandatory fabrication (R5) — withheld.' }
  }

  const primaryAxis = i.diagnosisAxis
  if (!changed.includes(primaryAxis)) {
    return { ...base, verdict: 'ILLEGAL', rule: 'L1', primaryAxis, changed, undeclared,
      detail: `The diagnosis implicates ${primaryAxis}, but B does not differ from A on it (L1).` }
  }

  // L3: every other changed axis must lie in the primary axis's closure.
  const permitted = new Set<Axis>([primaryAxis, ...closureAxes(primaryAxis)])
  const outside = changed.filter((a) => !permitted.has(a))
  if (outside.length > 0) {
    return { ...base, verdict: 'ILLEGAL', rule: 'L3', primaryAxis, changed, undeclared,
      detail: `Changed outside the closure of ${primaryAxis}: ${outside.join(', ')}. An undiagnosable multiple change (P8).` }
  }

  // L4: the candidate must not repeat a known failure.
  if (i.failedAttempts === undefined) {
    return { ...base, verdict: 'NOT_EVALUABLE', rule: 'L4', primaryAxis, changed, undeclared,
      detail: 'The failed-attempt set is unavailable; an unknown set is not an empty one.' }
  }
  const repeats = i.failedAttempts.some((f) => changedAxes(f, i.to!).changed.length === 0)
  if (repeats) {
    return { ...base, verdict: 'ILLEGAL', rule: 'L4', primaryAxis, changed, undeclared,
      detail: 'B is already in the learner\'s failed-attempt set for this concept (L4).' }
  }

  // L5 is C-29 legality and TQ-3 preconditions — neither is recorded, so the
  // verdict stops one rule short rather than claiming a clean pass.
  return { ...base, verdict: 'NOT_EVALUABLE', rule: 'L5', primaryAxis, changed, undeclared,
    detail: 'L1–L4 satisfied. L5 (C-29 legality + TQ-3 preconditions) is not recorded, so full legality is not assertable.' }
}

/**
 * Stage 3's headline measurement, and Stage 1's stated payoff: the paraphrase
 * rate over a trajectory of consecutive re-teach pairs.
 *
 * `rate` is null, never 0, when no pair was decidable — "unmeasured" and
 * "no paraphrase" are different claims.
 */
export interface ParaphraseBaseline {
  pairs: number
  decided: number
  paraphrases: number
  rate: number | null
  notEvaluable: number
  insufficientEvidence: number
}

export function paraphraseBaseline(results: readonly LegalityResult[]): ParaphraseBaseline {
  const decided = results.filter((r) => r.verdict === 'PARAPHRASE' || r.verdict === 'LEGAL' || r.verdict === 'ILLEGAL')
  const paraphrases = results.filter((r) => r.verdict === 'PARAPHRASE').length
  return {
    pairs: results.length,
    decided: decided.length,
    paraphrases,
    rate: decided.length > 0 ? paraphrases / decided.length : null,
    notEvaluable: results.filter((r) => r.verdict === 'NOT_EVALUABLE').length,
    insufficientEvidence: results.filter((r) => r.verdict === 'INSUFFICIENT_EVIDENCE').length,
  }
}
