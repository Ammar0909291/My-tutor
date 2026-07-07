/**
 * Teaching Adaptations — Educational Intelligence Sprint 4
 * (Learning Difficulty Intelligence), Task 4.
 *
 * Turns the already-computed `LearningDifficultyProfile` into a list of
 * RECOMMENDED teaching adaptations per struggling topic. Pure function, no
 * Prisma dependency, no writes, no curriculum / Tutor Max / learning-flow
 * changes. RECOMMENDATIONS ONLY — nothing here is executed, scheduled, or
 * applied. Mirrors `revisionRecommendations.ts`'s consumer relationship to
 * `revisionProfile.ts`.
 */
import type { LearningDifficultyEntry, LearningDifficultyProfile } from './learningDifficultyProfile'
import { MASTERY_WEAK_PCT, ATTEMPTS_REPEATED, REVISIONS_REPEATED } from './learningDifficultyProfile'

/** A suggested teaching adaptation. Advisory text only — never executed. */
export type TeachingAdaptation =
  | 'More visual explanation'
  | 'More worked examples'
  | 'More guided practice'
  | 'More revision'
  | 'More retesting'
  | 'Step-by-step learning path'
  | 'Analogy-based teaching'

export interface TeachingAdaptationRecommendation {
  topic: string
  subjectSlug: string
  topicSlug: string
  difficultyLevel: LearningDifficultyEntry['difficultyLevel']
  adaptations: TeachingAdaptation[]
  reason: string
}

/**
 * Task 4 — maps one difficulty entry's signals to recommended adaptations.
 * Deterministic; pure. Only emits for topics with detected difficulty
 * (medium/high) — low-difficulty topics need no adaptation.
 */
export function recommendAdaptationsForEntry(entry: LearningDifficultyEntry): TeachingAdaptation[] {
  const out = new Set<TeachingAdaptation>()

  if (entry.masteryPct < MASTERY_WEAK_PCT) {
    out.add('More worked examples')
    out.add('Step-by-step learning path')
  }
  if (entry.attempts >= ATTEMPTS_REPEATED) {
    out.add('More guided practice')
  }
  if (entry.revisions >= REVISIONS_REPEATED) {
    out.add('More revision')
    if (entry.masteryPct < MASTERY_WEAK_PCT) out.add('More retesting')
  }
  if (entry.retests > 0) {
    out.add('More retesting')
  }
  if (entry.visualWeaknesses.length > 0) {
    out.add('More visual explanation')
    out.add('Analogy-based teaching')
  }
  if (entry.difficultyLevel === 'high') {
    out.add('Step-by-step learning path')
  }

  return [...out]
}

/**
 * Task 4 — builds adaptation recommendations across a whole difficulty
 * profile. Skips low-difficulty topics. Recommendations only.
 */
export function generateTeachingAdaptations(profile: LearningDifficultyProfile): TeachingAdaptationRecommendation[] {
  const recs: TeachingAdaptationRecommendation[] = []
  for (const entry of profile.entries) {
    if (entry.difficultyLevel === 'low') continue
    const adaptations = recommendAdaptationsForEntry(entry)
    if (adaptations.length === 0) continue
    recs.push({
      topic: entry.topic,
      subjectSlug: entry.subjectSlug,
      topicSlug: entry.topicSlug,
      difficultyLevel: entry.difficultyLevel,
      adaptations,
      reason: entry.signals.join(', ') || 'detected learning difficulty',
    })
  }
  return recs
}
