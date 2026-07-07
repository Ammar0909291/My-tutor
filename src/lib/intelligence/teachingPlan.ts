/**
 * Adaptive Teaching Plan — Educational Intelligence Sprint 5, Tasks 2/3.
 *
 * Decides HOW a learner should be taught per topic by synthesizing the
 * already-derived outputs of Sprints 1–4 into one coherent `TeachingPlan`.
 * Pure synthesis — no new analysis, no new mastery system, no writes, no
 * Tutor Max / prompt / curriculum / grading / XP coupling. The plan is
 * produced read-only and consumed NOWHERE this sprint. Mirrors the consumer
 * architecture of `practiceTargets.ts` / `learningDifficultyProfile.ts`.
 */
import { prisma } from '@/lib/db/prisma'
import { getRevisionProfile } from './revisionProfile'
import { generatePracticeTargets, type PracticeTargetPlan, type PracticePriority } from './practiceTargets'
import { generateRetestCandidates, type RetestCandidatePlan } from './retestCandidates'
import {
  buildLearningDifficultyProfile,
  type LearningDifficultyProfile,
  type DifficultyLevel,
} from './learningDifficultyProfile'
import {
  generateTeachingAdaptations,
  type TeachingAdaptation,
  type TeachingAdaptationRecommendation,
} from './teachingAdaptations'

/** Stable teaching-method vocabulary (normalized from Sprint 4's adaptation phrases). */
export type TeachingMethod =
  | 'step_by_step'
  | 'worked_examples'
  | 'visual_explanation'
  | 'guided_practice'
  | 'more_revision'
  | 'more_retesting'
  | 'analogy_based'
  | 'standard_instruction'

export type RevisionPriority = 'high' | 'medium' | 'low'
export type RetestPriorityLevel = 'high' | 'medium' | 'low' | 'none'

/** Example (per the Sprint 5 brief): `{ topic, difficultyLevel, recommendedMethods, practiceIntensity, revisionPriority, retestPriority }`. */
export interface TeachingPlan {
  topic: string
  subjectSlug: string
  topicSlug: string
  difficultyLevel: DifficultyLevel
  recommendedMethods: TeachingMethod[]
  practiceIntensity: PracticePriority
  revisionPriority: RevisionPriority
  retestPriority: RetestPriorityLevel
}

/** Normalizes one Sprint 4 adaptation phrase to the stable method vocabulary. */
const ADAPTATION_TO_METHOD: Record<TeachingAdaptation, TeachingMethod> = {
  'More worked examples': 'worked_examples',
  'Step-by-step learning path': 'step_by_step',
  'More guided practice': 'guided_practice',
  'More revision': 'more_revision',
  'More retesting': 'more_retesting',
  'More visual explanation': 'visual_explanation',
  'Analogy-based teaching': 'analogy_based',
}

/** Difficulty-tier baseline methods (the brief's HIGH/MEDIUM/LOW examples). */
const BASELINE_METHODS: Record<DifficultyLevel, TeachingMethod[]> = {
  high: ['step_by_step', 'worked_examples', 'visual_explanation'],
  medium: ['worked_examples', 'guided_practice'],
  low: ['standard_instruction'],
}

function bandOf(
  key: string,
  plan: { high: { subjectSlug?: string; topicSlug?: string }[]; medium: { subjectSlug?: string; topicSlug?: string }[]; low: { subjectSlug?: string; topicSlug?: string }[] }
): 'high' | 'medium' | 'low' | null {
  const inBand = (list: { subjectSlug?: string; topicSlug?: string }[]) =>
    list.some((x) => x.subjectSlug && x.topicSlug && `${x.subjectSlug}:${x.topicSlug}` === key)
  if (inBand(plan.high)) return 'high'
  if (inBand(plan.medium)) return 'medium'
  if (inBand(plan.low)) return 'low'
  return null
}

/**
 * Task 3 — builds a per-topic teaching plan from already-computed Sprint 1–4
 * outputs. Pure function: no Prisma, no I/O, no recomputation of any input.
 */
export function generateTeachingPlan(
  difficultyProfile: LearningDifficultyProfile,
  adaptations: TeachingAdaptationRecommendation[],
  practiceTargets: PracticeTargetPlan,
  retestPlan: RetestCandidatePlan,
  recommendedRevisionKeys: Set<string>
): TeachingPlan[] {
  const adaptationsByKey = new Map(adaptations.map((a) => [`${a.subjectSlug}:${a.topicSlug}`, a.adaptations]))

  return difficultyProfile.entries.map((entry) => {
    const key = `${entry.subjectSlug}:${entry.topicSlug}`

    // recommendedMethods = difficulty-tier baseline + normalized Sprint 4 adaptations (deduped, stable order).
    const methods: TeachingMethod[] = [...BASELINE_METHODS[entry.difficultyLevel]]
    for (const phrase of adaptationsByKey.get(key) ?? []) {
      const method = ADAPTATION_TO_METHOD[phrase]
      if (method && !methods.includes(method)) methods.push(method)
    }

    const practiceBand = bandOf(key, practiceTargets) ?? 'low'
    const retestBand = bandOf(key, retestPlan)

    const tierPriority: RevisionPriority = entry.difficultyLevel === 'high' ? 'high' : entry.difficultyLevel === 'medium' ? 'medium' : 'low'
    const revisionPriority: RevisionPriority = recommendedRevisionKeys.has(key) ? 'high' : tierPriority

    return {
      topic: entry.topic,
      subjectSlug: entry.subjectSlug,
      topicSlug: entry.topicSlug,
      difficultyLevel: entry.difficultyLevel,
      recommendedMethods: methods,
      practiceIntensity: practiceBand,
      revisionPriority,
      retestPriority: retestBand ?? 'none',
    }
  })
}

/**
 * Task 3/4 — loads a user's Sprint 1–4 intelligence and produces their
 * teaching plans. Reuses the existing wrappers/builders; the only Prisma
 * read it adds is the `TopicProgress` query shared with the difficulty
 * profile (same columns). Read-only.
 */
export async function getTeachingPlans(userId: string): Promise<{
  difficultyProfile: LearningDifficultyProfile
  adaptations: TeachingAdaptationRecommendation[]
  teachingPlan: TeachingPlan[]
}> {
  const revisionProfile = await getRevisionProfile(userId)

  const topicRows = await prisma.topicProgress.findMany({
    where: { userId },
    select: {
      subjectSlug: true, topicSlug: true, status: true,
      masteryPct: true, attempts: true, revisionCount: true, lastScore: true,
    },
  })

  const practiceTargets = generatePracticeTargets(
    revisionProfile,
    topicRows.map((r) => ({ subjectSlug: r.subjectSlug, topicSlug: r.topicSlug, attempts: r.attempts }))
  )
  const retestPlan = generateRetestCandidates(practiceTargets)
  const difficultyProfile = buildLearningDifficultyProfile(topicRows, revisionProfile, retestPlan)
  const adaptations = generateTeachingAdaptations(difficultyProfile)

  const recommendedRevisionKeys = new Set(
    revisionProfile.recommendedRevisionTopics.map((t) => `${t.subjectSlug}:${t.topicSlug}`)
  )

  const teachingPlan = generateTeachingPlan(difficultyProfile, adaptations, practiceTargets, retestPlan, recommendedRevisionKeys)
  return { difficultyProfile, adaptations, teachingPlan }
}
