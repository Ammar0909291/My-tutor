/**
 * Teaching Method Effectiveness — Educational Intelligence Sprint 8,
 * Tasks 2/3/4/5.
 *
 * Ranks teaching methods by observed learner improvement, by re-aggregating
 * the Sprint 7 per-topic `AdaptationEffectiveness[]` BY METHOD. No new
 * measurement — it reuses Sprint 7's deltas and `classifyEffectiveness()`.
 * INTELLIGENCE ONLY — pure functions, no writes, no schema change, no
 * teaching-plan / Tutor Max / curriculum / grading / XP changes. See
 * docs/EDUCATIONAL_INTELLIGENCE_METHOD_EFFECTIVENESS_AUDIT.md.
 */
import {
  getAdaptationEffectivenessProfile,
  classifyEffectiveness,
  HIGH_IMPROVEMENT_MIN,
  MEDIUM_IMPROVEMENT_MIN,
  MIN_SAMPLE_FOR_CONFIDENCE,
  type AdaptationEffectiveness,
  type EffectivenessLevel,
} from './adaptationEffectiveness'
import type { TeachingMethod } from './teachingPlan'

/** Example (per the Sprint 8 brief): `{ method, topicsUsed, averageImprovement, effectiveness }`. */
export interface MethodEffectiveness {
  method: TeachingMethod
  topicsUsed: number
  averageImprovement: number
  effectiveness: EffectivenessLevel
  /** False when topicsUsed < MIN_SAMPLE_FOR_CONFIDENCE — ranking is shown but not trusted for preferences. */
  confident: boolean
}

/** Example (per the Sprint 8 brief): `{ strongestMethods: [...], weakestMethods: [...] }`. */
export interface PreferredTeachingMethods {
  strongestMethods: TeachingMethod[]
  weakestMethods: TeachingMethod[]
}

export type MethodInsightAssessment = 'highly_effective' | 'effective' | 'limited' | 'negative' | 'uncertain'

export interface MethodEffectivenessInsight {
  method: TeachingMethod
  assessment: MethodInsightAssessment
  message: string
}

export interface MethodEffectivenessProfile {
  methods: MethodEffectiveness[]
  /** Method names ranked best→worst by averageImprovement. */
  rankings: TeachingMethod[]
  preferredMethods: PreferredTeachingMethods
  insights: MethodEffectivenessInsight[]
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
 * Task 2/3 — aggregates Sprint 7 per-topic effectiveness by method and ranks
 * methods best→worst by average improvement. Pure: no I/O.
 */
export function buildMethodEffectiveness(effectiveness: AdaptationEffectiveness[]): MethodEffectiveness[] {
  const byMethod = new Map<TeachingMethod, number[]>()
  for (const e of effectiveness) {
    for (const m of e.teachingMethods) {
      const list = byMethod.get(m) ?? []
      list.push(e.improvement)
      byMethod.set(m, list)
    }
  }

  const methods: MethodEffectiveness[] = []
  for (const [method, improvements] of byMethod) {
    const topicsUsed = improvements.length
    const averageImprovement = Math.round(improvements.reduce((s, n) => s + n, 0) / topicsUsed)
    methods.push({
      method,
      topicsUsed,
      averageImprovement,
      effectiveness: classifyEffectiveness(averageImprovement),
      confident: topicsUsed >= MIN_SAMPLE_FOR_CONFIDENCE,
    })
  }

  // Ranking: strongest average first; ties broken by larger sample.
  methods.sort((a, b) => b.averageImprovement - a.averageImprovement || b.topicsUsed - a.topicsUsed)
  return methods
}

/**
 * Task 4 — derives the learner's strongest/weakest methods. Only confident
 * methods (enough topics) are eligible, so a single outlier topic cannot label
 * a method best or worst. Pure.
 */
export function buildPreferredTeachingMethods(methods: MethodEffectiveness[]): PreferredTeachingMethods {
  const confident = methods.filter((m) => m.confident)
  const strongestMethods = confident
    .filter((m) => m.averageImprovement >= MEDIUM_IMPROVEMENT_MIN)
    .map((m) => m.method)
  const weakestMethods = confident
    .filter((m) => m.averageImprovement < MEDIUM_IMPROVEMENT_MIN)
    .sort((a, b) => a.averageImprovement - b.averageImprovement)
    .map((m) => m.method)
  return { strongestMethods, weakestMethods }
}

/** Task 5 — per-method advisory insight. Recommendations only; pure. */
export function generateMethodInsights(methods: MethodEffectiveness[]): MethodEffectivenessInsight[] {
  return methods.map((m) => {
    const label = METHOD_LABEL[m.method]
    let assessment: MethodInsightAssessment
    let message: string
    if (!m.confident) {
      assessment = 'uncertain'
      message = `${label} requires more evidence (only ${m.topicsUsed} topic${m.topicsUsed === 1 ? '' : 's'} measured so far).`
    } else if (m.averageImprovement < 0) {
      assessment = 'negative'
      message = `${label} shows a negative trend — review where it is applied.`
    } else if (m.averageImprovement >= HIGH_IMPROVEMENT_MIN) {
      assessment = 'highly_effective'
      message = `${label} appears highly effective (avg +${m.averageImprovement}% mastery).`
    } else if (m.averageImprovement >= MEDIUM_IMPROVEMENT_MIN) {
      assessment = 'effective'
      message = `${label} consistently improves mastery (avg +${m.averageImprovement}% mastery).`
    } else {
      assessment = 'limited'
      message = `${label} shows limited improvement (avg +${m.averageImprovement}% mastery).`
    }
    return { method: m.method, assessment, message }
  })
}

/** Task 3 — full profile builder over Sprint 7 effectiveness. Pure. */
export function buildMethodEffectivenessProfile(effectiveness: AdaptationEffectiveness[]): MethodEffectivenessProfile {
  const methods = buildMethodEffectiveness(effectiveness)
  return {
    methods,
    rankings: methods.map((m) => m.method),
    preferredMethods: buildPreferredTeachingMethods(methods),
    insights: generateMethodInsights(methods),
  }
}

/**
 * Task 3/6 — loads the user's Sprint 7 adaptation effectiveness and builds
 * their method-effectiveness profile. Read-only; reuses Sprint 7's wrapper
 * (no new measurement).
 */
export async function getMethodEffectivenessProfile(userId: string): Promise<MethodEffectivenessProfile> {
  const { effectiveness } = await getAdaptationEffectivenessProfile(userId)
  return buildMethodEffectivenessProfile(effectiveness)
}
