/**
 * K3 — the parity observer.
 *
 * The masterplan's K3 Definition of Done is "byte-similar outputs on the
 * golden set", and its #1 stated risk mitigation is the golden-transcript
 * harness. The shadow pipeline was already running on every Library turn and
 * producing a KernelState — and nothing compared it to anything. An
 * observation with no observer proves nothing, so the DoD was unmeasurable.
 *
 * This module is that comparison, and nothing else. It is:
 *   • PURE — a function of two decision records, no I/O, no clock, no env
 *   • READ-ONLY — it can never change a turn; it has no path to the response
 *   • CHEAP — field equality over a handful of scalars
 *
 * It creates no authority: route.ts remains the decision-maker, the pipeline
 * remains shadow, and this only answers "did they agree?".
 *
 * PROMOTION CRITERION. Shadow → primary is a data decision, not a judgement
 * call: promote when `divergences` is zero across a representative corpus.
 * Until then every non-zero field here names a stage whose extraction is not
 * yet behaviour-identical, which is exactly the list K3 must burn down.
 */
import type { PolicyMove } from './types'

/** The decision fields that must match for a stage extraction to be
 *  behaviour-identical. Deliberately small: these are the fields that change
 *  what the learner receives. Anything not here is not a behavioural fact. */
export interface DecisionFacts {
  move: PolicyMove | null
  stageCeiling: number | null
  maxQuestions: 0 | 1
  maxNewTerms: number
  /** Added when stage 8 was promoted to derive it. Until then the route used
   *  responseBudget() while the shadow adapter was passed a hardcoded null —
   *  a permanent divergence the field set did not measure. Measuring a field
   *  only after both sides derive it is the wrong order; this is the
   *  correction. */
  maxParagraphs: number | null
  phase: string | null
  recoveryActive: boolean
}

export type ParityField = keyof DecisionFacts

export interface ParityResult {
  agree: boolean
  /** Field-level differences, stable order, ready to log. */
  divergences: Array<{ field: ParityField; route: unknown; kernel: unknown }>
}

const FIELDS: ParityField[] = [
  'move', 'stageCeiling', 'maxQuestions', 'maxNewTerms', 'maxParagraphs',
  'phase', 'recoveryActive',
]

/** Compare the route's decision against the shadow pipeline's. Pure. */
export function compareDecisions(route: DecisionFacts, kernel: DecisionFacts): ParityResult {
  const divergences: ParityResult['divergences'] = []
  for (const field of FIELDS) {
    if (route[field] !== kernel[field]) {
      divergences.push({ field, route: route[field], kernel: kernel[field] })
    }
  }
  return { agree: divergences.length === 0, divergences }
}

// ── Session-scoped counters (ride the existing snapshot persist) ────────────

export interface ParityMetrics {
  /** Turns on which both paths produced a decision — the denominator. */
  turnsCompared: number
  /** Turns where every field matched. */
  turnsAgreed: number
  /** Per-field divergence counts. Sparse; absent key means zero. A field
   *  that never diverges is a stage that is already safe to promote. */
  byField: Partial<Record<ParityField, number>>
}

export function initialParityMetrics(): ParityMetrics {
  return { turnsCompared: 0, turnsAgreed: 0, byField: {} }
}

/** Total: never throws; tolerates a legacy or partial stored shape. */
export function readParityMetrics(raw: unknown): ParityMetrics {
  if (raw && typeof raw === 'object') {
    const r = raw as Partial<ParityMetrics>
    return {
      turnsCompared: r.turnsCompared ?? 0,
      turnsAgreed: r.turnsAgreed ?? 0,
      byField: { ...(r.byField ?? {}) },
    }
  }
  return initialParityMetrics()
}

/** Fold one compared turn. Pure. */
export function foldParityMetrics(
  prev: ParityMetrics | undefined,
  result: ParityResult,
): ParityMetrics {
  const m = readParityMetrics(prev)
  m.turnsCompared += 1
  if (result.agree) m.turnsAgreed += 1
  for (const d of result.divergences) {
    m.byField[d.field] = (m.byField[d.field] ?? 0) + 1
  }
  return m
}

/** Agreement rate, suppressed below a minimum sample so one early turn cannot
 *  read as 0% or 100% parity on a dashboard. */
export function agreementRate(m: ParityMetrics, minSample = 20): number | null {
  if (m.turnsCompared < minSample) return null
  return m.turnsAgreed / m.turnsCompared
}

/** Compact tags for the existing evidence-tag array — reuses the persistence
 *  path already carrying verifier tags rather than adding a second one. */
export function parityTags(result: ParityResult): string[] {
  if (result.agree) return []
  return ['kernel:parity:diverged', ...result.divergences.map((d) => `kernel:parity:${d.field}`)]
}
