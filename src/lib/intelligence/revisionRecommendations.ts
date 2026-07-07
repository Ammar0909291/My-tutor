/**
 * Revision Recommendation Engine — Educational Intelligence Sprint 1, Task 3.
 *
 * Turns Task 2's `RevisionProfile` (built from `TopicProgress` mastery
 * signals and Sprint N's `VisualLearningProfile`/weaknesses) plus
 * `StudentProgress` recency rows into learner-facing "Review" and
 * "Practice" recommendation lists — informational text only. Pure
 * function, no Prisma dependency, no writes, no scoring/grading/XP
 * semantics, and no automatic assignment of anything — recommendations
 * only, exactly as the brief requires. Never recomputes weakness
 * detection itself (already done in `revisionProfile.ts`).
 */
import type { RevisionProfile } from './revisionProfile'

/** Minimal shape this module needs from a `StudentProgress` row — callers may pass full Prisma rows. */
export interface StudentProgressRow {
  subjectCode: string
  lastStudiedAt: Date
}

/** Example (per the Sprint 1 brief): "Review: Photosynthesis, Water Cycle, Linear Equations". */
export interface ReviewRecommendation {
  subjectSlug: string
  topicSlug: string
  title: string
  masteryPct: number
  /** Days since the matching `StudentProgress.subjectCode` was last studied; null if no matching row (different identifier namespace — see audit). */
  daysSinceLastStudied: number | null
}

/** Friendly activity label per visual type — distinct from the raw recommendation sentence in visualMasteryRecommendations.ts. */
const PRACTICE_ACTIVITY_LABEL: Record<string, string> = {
  graph: 'Graph Activities',
  number_line: 'Number Line Activities',
  geometry: 'Geometry Activities',
  process_flow: 'Process Flow Activities',
}

/** Example (per the Sprint 1 brief): "Practice: Process Flow Activities, Graph Activities". */
export interface PracticeRecommendation {
  visualType: string
  label: string
  completionRatePct: number
}

export interface RevisionRecommendations {
  review: ReviewRecommendation[]
  practice: PracticeRecommendation[]
}

function daysSince(date: Date): number {
  return Math.floor((Date.now() - date.getTime()) / 86400000)
}

/**
 * Task 3 — builds recommendations from an already-computed
 * `RevisionProfile`. `studentProgressRows` is optional, read-only
 * recency context only (it never gates which topics appear — only
 * annotates them), since `TopicProgress.subjectSlug` and
 * `StudentProgress.subjectCode` are different identifier namespaces
 * that only sometimes coincide (see
 * docs/EDUCATIONAL_INTELLIGENCE_REVISION_AUDIT.md).
 */
export function generateRevisionRecommendations(
  profile: RevisionProfile,
  studentProgressRows: StudentProgressRow[] = []
): RevisionRecommendations {
  const lastStudiedBySubject = new Map(studentProgressRows.map((r) => [r.subjectCode, r.lastStudiedAt]))

  const review: ReviewRecommendation[] = profile.recommendedRevisionTopics.map((t) => {
    const lastStudiedAt = lastStudiedBySubject.get(t.subjectSlug) ?? null
    return {
      subjectSlug: t.subjectSlug,
      topicSlug: t.topicSlug,
      title: t.title,
      masteryPct: t.masteryPct,
      daysSinceLastStudied: lastStudiedAt ? daysSince(lastStudiedAt) : null,
    }
  })

  const practice: PracticeRecommendation[] = profile.visualWeaknesses.map((w) => ({
    visualType: w.visualType,
    label: PRACTICE_ACTIVITY_LABEL[w.visualType] ?? `${w.visualType} Activities`,
    completionRatePct: w.completionRatePct,
  }))

  return { review, practice }
}
