/**
 * Personalized Teaching Plan Weighting — Educational Intelligence Sprint 9,
 * Tasks 2/3/4/5.
 *
 * Reorders a Teaching Plan's `recommendedMethods` to prefer methods that have
 * proven effective for the learner (Sprint 8) and de-emphasize those that have
 * not. ORDERING ONLY — never adds/removes a method, never changes difficulty,
 * practice/revision/retest priorities. Pure functions, no writes, no schema
 * change. Does NOT modify Sprints 1–8 (read-only consumer). See
 * docs/EDUCATIONAL_INTELLIGENCE_PLAN_WEIGHTING_AUDIT.md.
 */
import { getTeachingPlans } from './teachingPlan'
import type { TeachingPlan, TeachingMethod } from './teachingPlan'
import {
  getMethodEffectivenessProfile,
  type PreferredTeachingMethods,
  type MethodEffectiveness,
} from './methodEffectiveness'
import type { EffectivenessLevel } from './adaptationEffectiveness'

/** Example (per the Sprint 9 brief): `{ method, effectiveness, weight }`. */
export interface TeachingMethodWeight {
  method: TeachingMethod
  effectiveness: EffectivenessLevel | 'uncertain' | 'unknown'
  weight: number
}

/** A Teaching Plan whose `recommendedMethods` have been reordered by effectiveness weight. */
export interface WeightedTeachingPlan extends TeachingPlan {
  /** The pre-weighting method order (TeachingPlan.recommendedMethods becomes the weighted order). */
  originalMethods: TeachingMethod[]
  weights: TeachingMethodWeight[]
}

const WEIGHT_BY_LEVEL: Record<EffectivenessLevel, number> = {
  high: 1.5, medium: 1.2, low: 0.8, regression: 0.5,
}

/** Resolves a method's weight from Sprint 8 evidence (preferring confident per-method levels). */
function resolveWeight(
  method: TeachingMethod,
  preferred: PreferredTeachingMethods,
  methods: MethodEffectiveness[]
): TeachingMethodWeight {
  const me = methods.find((m) => m.method === method)
  if (me && me.confident) return { method, effectiveness: me.effectiveness, weight: WEIGHT_BY_LEVEL[me.effectiveness] }
  if (me && !me.confident) return { method, effectiveness: 'uncertain', weight: 1.0 }
  if (preferred.strongestMethods.includes(method)) return { method, effectiveness: 'high', weight: 1.3 }
  if (preferred.weakestMethods.includes(method)) return { method, effectiveness: 'low', weight: 0.7 }
  return { method, effectiveness: 'unknown', weight: 1.0 }
}

/**
 * Task 3/4 — reorders one plan's methods by effectiveness weight. Stable:
 * equal-weight methods keep their original relative order, so neutral/unknown
 * methods don't churn. Never removes a method; the difficulty/priority fields
 * are passed through untouched.
 */
export function applyMethodWeighting(
  plan: TeachingPlan,
  preferred: PreferredTeachingMethods,
  methods: MethodEffectiveness[] = []
): WeightedTeachingPlan {
  const originalMethods = [...plan.recommendedMethods]
  const weights = originalMethods.map((m) => resolveWeight(m, preferred, methods))
  const weightByMethod = new Map(weights.map((w) => [w.method, w.weight]))

  // Stable sort by weight desc: decorate with original index, sort, undecorate.
  const reordered = originalMethods
    .map((method, index) => ({ method, index }))
    .sort((a, b) => (weightByMethod.get(b.method)! - weightByMethod.get(a.method)!) || (a.index - b.index))
    .map((x) => x.method)

  return { ...plan, recommendedMethods: reordered, originalMethods, weights }
}

export type WeightingAction = 'prioritized' | 'deprioritized' | 'retained_low_confidence'

/** Example (per the Sprint 9 brief): "Worked examples prioritized due to strong effectiveness." */
export interface PlanWeightingInsight {
  method: TeachingMethod
  action: WeightingAction
  message: string
}

const METHOD_LABEL: Record<TeachingMethod, string> = {
  step_by_step: 'Step-by-step instruction',
  worked_examples: 'Worked examples',
  visual_explanation: 'Visual explanation',
  guided_practice: 'Guided practice',
  more_revision: 'Extra revision',
  more_retesting: 'Retesting',
  analogy_based: 'Analogy-based teaching',
  standard_instruction: 'Standard instruction',
}

/**
 * Task 5 — global advisory insights about how the weighting affected methods.
 * Derived from the Sprint 8 evidence, not from any single plan. Recommendations
 * only; pure.
 */
export function generatePlanWeightingInsights(
  preferred: PreferredTeachingMethods,
  methods: MethodEffectiveness[]
): PlanWeightingInsight[] {
  const insights: PlanWeightingInsight[] = []
  for (const method of preferred.strongestMethods) {
    insights.push({ method, action: 'prioritized', message: `${METHOD_LABEL[method]} prioritized due to strong effectiveness.` })
  }
  for (const method of preferred.weakestMethods) {
    const me = methods.find((m) => m.method === method)
    const why = me && me.averageImprovement < 0 ? 'negative effectiveness' : 'weak effectiveness'
    insights.push({ method, action: 'deprioritized', message: `${METHOD_LABEL[method]} deprioritized due to ${why}.` })
  }
  for (const me of methods) {
    if (!me.confident) {
      insights.push({ method: me.method, action: 'retained_low_confidence', message: `${METHOD_LABEL[me.method]} retained but confidence remains low.` })
    }
  }
  return insights
}

export interface WeightedTeachingPlanProfile {
  originalPlan: TeachingPlan[]
  weightedPlan: WeightedTeachingPlan[]
  insights: PlanWeightingInsight[]
}

/** Task 3/5 — pure profile builder over existing S5 plans + S8 evidence. */
export function buildWeightedTeachingPlanProfile(
  plans: TeachingPlan[],
  preferred: PreferredTeachingMethods,
  methods: MethodEffectiveness[]
): WeightedTeachingPlanProfile {
  return {
    originalPlan: plans,
    weightedPlan: plans.map((p) => applyMethodWeighting(p, preferred, methods)),
    insights: generatePlanWeightingInsights(preferred, methods),
  }
}

/**
 * Task 3/6 — loads the user's S5 teaching plans and S8 method-effectiveness
 * profile and builds the weighted plans. Read-only; reuses both wrappers. Does
 * not mutate any plan in the database (there is none — plans are derived).
 */
export async function getWeightedTeachingPlanProfile(userId: string): Promise<WeightedTeachingPlanProfile> {
  const { teachingPlan } = await getTeachingPlans(userId)
  const { preferredMethods, methods } = await getMethodEffectivenessProfile(userId)
  return buildWeightedTeachingPlanProfile(teachingPlan, preferredMethods, methods)
}
