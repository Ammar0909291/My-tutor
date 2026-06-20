/**
 * Visual Learning Recommendations — Visual Learning Sprint O, Tasks 2/3.
 *
 * Turns Sprint N's `VisualLearningProfile` / `detectVisualWeaknesses()`
 * output into a small, typed list of `VisualLearningRecommendation`
 * objects — informational text only. Pure functions, no Prisma
 * dependency, no writes, no scoring/grading semantics, and no influence
 * on question generation, curriculum, or recommendation ordering anywhere
 * else in the app (see docs/VISUAL_RECOMMENDATION_AUDIT.md). Sprint N's
 * `visualMasteryProfile.ts` is read but never modified by this module.
 */
import {
  detectVisualWeaknesses,
  VISUAL_WEAKNESS_THRESHOLD_PCT,
  type VisualLearningProfile,
} from './visualMasteryProfile'
import type { VisualMasteryEngine } from './visualMastery'

/** Example (per the Sprint O brief): `{ visualType: "process_flow", reason: "completion rate below 50%", recommendation: "Practice more process-flow activities" }`. */
export interface VisualLearningRecommendation {
  visualType: VisualMasteryEngine
  reason: string
  recommendation: string
}

/** Friendly, hand-written suggestion text per visual type — avoids a generic "practice more X" for every engine. */
const RECOMMENDATION_TEXT: Record<VisualMasteryEngine, string> = {
  graph: 'Practice more graph-reading activities',
  number_line: 'Practice more number-line activities',
  geometry: 'Practice more geometry activities',
  process_flow: 'Practice more process-flow activities',
}

/**
 * Task 2/3 — builds recommendations from an already-computed profile.
 * Delegates weakness detection to Sprint N's `detectVisualWeaknesses()`
 * (not reimplemented here) and maps each weak entry to a recommendation.
 * Pure function: same profile in, same recommendations out, every time.
 */
export function buildVisualLearningRecommendations(
  profile: VisualLearningProfile,
  thresholdPct: number = VISUAL_WEAKNESS_THRESHOLD_PCT
): VisualLearningRecommendation[] {
  const weaknesses = detectVisualWeaknesses(profile, thresholdPct)

  return weaknesses.map((w) => ({
    visualType: w.visualType,
    reason: `completion rate below ${thresholdPct}% (${w.completionRatePct}%, ${w.completed}/${w.shown})`,
    recommendation: RECOMMENDATION_TEXT[w.visualType] ?? `Practice more ${w.visualType} activities`,
  }))
}
