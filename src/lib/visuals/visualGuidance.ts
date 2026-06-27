/**
 * Visual Guidance — Visual Learning Sprint P, Tasks 2/3.
 *
 * Turns Sprint N/O's `VisualLearningProfile` / `detectVisualWeaknesses()` /
 * `buildVisualLearningRecommendations()` output into short, learner-facing
 * sentences — comparing a student's strongest visual type against each
 * weak one. Pure functions, no Prisma dependency, no writes, no
 * scoring/grading/XP semantics. Does not modify any of the Sprint M–O
 * visual mastery modules it reads from (see
 * docs/VISUAL_ADAPTIVE_EXPERIENCE_AUDIT.md) and is not wired into any
 * quiz component or production UI this sprint — dev-viewer only (Task 4).
 */
import type { VisualMasteryEngine } from './visualMastery'
import type { VisualLearningProfile } from './visualMasteryProfile'
import type { VisualWeaknessEntry } from './visualMasteryProfile'
import type { VisualLearningRecommendation } from './visualMasteryRecommendations'

/** Example (per the Sprint P brief): `{ visualType: "process_flow", status: "needs_improvement", message: "You perform better with graphs than process flows. Consider reviewing more process-flow activities." }`. */
export interface VisualGuidance {
  visualType: VisualMasteryEngine
  status: 'needs_improvement' | 'strong'
  message: string
}

/** completionRatePct at/above this counts as a "strong" visual type for comparison purposes. */
export const VISUAL_STRENGTH_THRESHOLD_PCT = 75

const VISUAL_TYPE_LABEL: Record<VisualMasteryEngine, string> = {
  graph: 'graphs',
  number_line: 'number lines',
  geometry: 'geometry visuals',
  process_flow: 'process flows',
  quantum_interactive: 'quantum physics visuals',
  classical_mechanics_interactive: 'classical mechanics visuals',
}

function labelFor(visualType: VisualMasteryEngine): string {
  return VISUAL_TYPE_LABEL[visualType] ?? visualType
}

/**
 * Task 3 — generates learner-facing guidance from already-computed Sprint
 * N/O outputs. Never recomputes weakness detection or recommendations
 * itself (both passed in), so it can never drift from those modules'
 * thresholds. No scoring, no grading, no XP — every field is plain text or
 * a status label.
 */
export function generateVisualGuidance(
  profile: VisualLearningProfile,
  weaknesses: VisualWeaknessEntry[],
  recommendations: VisualLearningRecommendation[]
): VisualGuidance[] {
  const strongTypes = (Object.entries(profile) as [VisualMasteryEngine, NonNullable<VisualLearningProfile[VisualMasteryEngine]>][])
    .filter(([, entry]) => entry.completionRatePct !== null && entry.completionRatePct >= VISUAL_STRENGTH_THRESHOLD_PCT)
    .sort((a, b) => (b[1].completionRatePct ?? 0) - (a[1].completionRatePct ?? 0))

  const guidance: VisualGuidance[] = []

  for (const weak of weaknesses) {
    const recommendation = recommendations.find((r) => r.visualType === weak.visualType)
    const strongest = strongTypes.find(([visualType]) => visualType !== weak.visualType)
    const suggestion = recommendation?.recommendation ?? `Practice more ${weak.visualType} activities`

    const message = strongest
      ? `You perform better with ${labelFor(strongest[0])} than ${labelFor(weak.visualType)}. Consider reviewing more ${weak.visualType}-based activities.`
      : `${suggestion}.`

    guidance.push({ visualType: weak.visualType, status: 'needs_improvement', message })
  }

  for (const [visualType, entry] of strongTypes) {
    guidance.push({
      visualType,
      status: 'strong',
      message: `Strong performance with ${labelFor(visualType)} (${entry.completionRatePct}% completion).`,
    })
  }

  return guidance
}
