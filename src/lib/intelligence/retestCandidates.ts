/**
 * Retest Candidates — Educational Intelligence Sprint 3, Tasks 2/3.
 *
 * Turns Sprint 2's already-computed `PracticeTargetPlan` (itself built
 * from Sprint 1's `RevisionProfile` — neither recomputed here) into a
 * priority-banded list of retest candidates, answering "what should be
 * re-evaluated after practice?". Pure function, no Prisma dependency,
 * no writes, no grading or assessment-generation changes. Reuses each
 * target's existing `priority` as its `retestPriority` directly — no
 * new mastery system, no new percentage thresholds.
 */
import type { PracticeTarget, PracticeTargetPlan, PracticePriority } from './practiceTargets'

export type RetestPriority = PracticePriority

/** Example (per the Sprint 3 brief): `{ topic: "Photosynthesis", reason: "high-priority weakness", retestPriority: "high" }`. */
export interface RetestCandidate {
  topic: string
  reason: string
  retestPriority: RetestPriority
  /** Present for topic-based candidates; omitted for visual-based candidates. */
  subjectSlug?: string
  topicSlug?: string
  /** Present for visual-based candidates; omitted for topic-based candidates. */
  visualType?: string
}

export interface RetestCandidatePlan {
  high: RetestCandidate[]
  medium: RetestCandidate[]
  low: RetestCandidate[]
}

const REASON_BY_PRIORITY: Record<RetestPriority, string> = {
  high: 'high-priority weakness',
  medium: 'medium-priority weakness',
  low: 'low-priority weakness',
}

function toCandidate(target: PracticeTarget): RetestCandidate {
  return {
    topic: target.topic,
    reason: REASON_BY_PRIORITY[target.priority],
    retestPriority: target.priority,
    subjectSlug: target.subjectSlug,
    topicSlug: target.topicSlug,
    visualType: target.visualType,
  }
}

/**
 * Task 3 — builds a priority-banded retest candidate plan directly from
 * Sprint 2's `PracticeTargetPlan`. Every existing practice target becomes
 * exactly one retest candidate in the same priority band — this module
 * reuses Sprint 1's weakness signals and Sprint 2's priorities, it never
 * recomputes mastery percentages or invents a new severity scale.
 */
export function generateRetestCandidates(targets: PracticeTargetPlan): RetestCandidatePlan {
  return {
    high: targets.high.map(toCandidate),
    medium: targets.medium.map(toCandidate),
    low: targets.low.map(toCandidate),
  }
}
