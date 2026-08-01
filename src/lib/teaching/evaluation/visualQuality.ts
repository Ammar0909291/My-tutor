/**
 * WP-5 — Phase 2 Stage V2: VD-9 offline pedagogical quality evaluation.
 *
 * Phase 2 §17: "Stage V2 — VD-9 offline evaluation. Read-only pedagogical
 * quality scoring over recorded trajectories; establishes the baseline every
 * later stage is judged against."
 *
 * VD-9 (§12) owns PEDAGOGICAL visual quality only — ADR 12 owns technical
 * validation, and VD-9 "introduces no new evidence store". This module
 * therefore reads recorded events and writes nothing.
 *
 * The honest finding this module encodes: all seven VD-9 criteria are scored
 * against a `VisualIntent` — purpose, claim, form class, element budget, CPA
 * rung. That projection is Phase 2 Stage V4 (handoff VH-1), and
 * `TeachingDecision.visual_type` does not exist in the Teaching Engine today.
 * Nothing in the spine records which visual was served, with which intent, or
 * whether one was served at all. Every criterion is therefore NOT_EVALUABLE,
 * and the baseline VD-9 establishes is precisely that measurement is not yet
 * possible. Scoring these criteria from rendered output would be exactly the
 * inference Phase 1 §11.2 forbids.
 *
 * Read-only and pure. Not wired into any runtime path.
 */
import type { SpineEventRecord } from '@/lib/evidence-spine/types'

export type CriterionVerdict = 'PASS' | 'FAIL' | 'NOT_EVALUABLE'

export interface CriterionResult {
  id: string
  name: string
  verdict: CriterionVerdict
  /** The missing input, named, when NOT_EVALUABLE. */
  detail: string
}

export interface VisualQualityReport {
  /** Visuals the trajectory records. Zero on every trajectory today — the
   *  spine has no visual-serving event, which is itself the V1 gap V2 is
   *  meant to be judged against. */
  visualsObserved: number
  criteria: CriterionResult[]
  criteriaEvaluable: number
  /** VD-9's headline metric. null while no visual is recorded — NOT zero:
   *  "no decoration measured" and "decoration rate is 0%" are different
   *  claims, and only one of them is honest today. */
  decorativeRate: number | null
}

const NO_INTENT =
  'Scored against a VisualIntent (purpose, claim, form class, element budget, CPA rung). ' +
  'That projection is Phase 2 Stage V4 / handoff VH-1; `visual_type` does not exist on the ' +
  'Teaching Engine decision, and no visual-serving event exists on the spine.'

const CRITERIA: ReadonlyArray<{ id: string; name: string }> = [
  { id: 'Q1', name: 'Claim fidelity' },
  { id: 'Q2', name: 'Signal-to-decoration' },
  { id: 'Q3', name: 'One-dimension discipline' },
  { id: 'Q4', name: 'Essential-vs-incidental marked' },
  { id: 'Q5', name: 'Load within budget' },
  { id: 'Q6', name: 'CPA placement correct' },
  { id: 'Q7', name: 'Instructional equivalence achievable' },
]

/**
 * Evaluate one trajectory against VD-9's seven criteria.
 *
 * `visualsObserved` counts recorded visual-serving events. The spine's closed
 * catalog has no such type, so this is structurally 0 — the count is here so
 * that when V1 instrumentation lands, this evaluator reports a real number
 * instead of silently continuing to report nothing.
 */
export function evaluateVisualQuality(events: readonly SpineEventRecord[]): VisualQualityReport {
  const visualsObserved = events.filter(e => e.type === 'VisualServed').length

  const criteria: CriterionResult[] = CRITERIA.map(c => ({
    id: c.id,
    name: c.name,
    verdict: 'NOT_EVALUABLE' as const,
    detail: NO_INTENT,
  }))

  return {
    visualsObserved,
    criteria,
    criteriaEvaluable: 0,
    decorativeRate: null,
  }
}
