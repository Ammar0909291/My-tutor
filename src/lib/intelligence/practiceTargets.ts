/**
 * Practice Targets — Educational Intelligence Sprint 2, Tasks 2/3.
 *
 * Turns Sprint 1's `RevisionProfile` (`weaknesses` + `visualWeaknesses`,
 * both already built — never recomputed here) into a structured,
 * priority-banded practice plan answering "what should the learner
 * practice next?". Pure function, no Prisma dependency, no writes, no
 * curriculum or practice-generation changes. Does not call
 * `revisionRecommendations.ts` — both modules are independent consumers
 * of `RevisionProfile`, the same relationship `visualMasteryRecommendations.ts`
 * and `visualGuidance.ts` have to `visualMasteryProfile.ts`.
 */
import type { RevisionProfile } from './revisionProfile'

export type PracticePriority = 'high' | 'medium' | 'low'

/** Example (per the Sprint 2 brief): `{ topic: "Photosynthesis", reason: "low mastery", priority: "high" }`. */
export interface PracticeTarget {
  topic: string
  reason: string
  priority: PracticePriority
  /** Present for topic-based targets; omitted for visual-based targets. */
  subjectSlug?: string
  topicSlug?: string
  /** Present for visual-based targets; omitted for topic-based targets. */
  visualType?: string
}

export interface PracticeTargetPlan {
  high: PracticeTarget[]
  medium: PracticeTarget[]
  low: PracticeTarget[]
}

/** Below this percentage, a weakness is severe enough to be a high-priority target. */
export const HIGH_PRIORITY_MAX_PCT = 25
/** Below this (and at/above HIGH_PRIORITY_MAX_PCT), a weakness is a medium-priority target. Everything else under the Sprint 1 weakness threshold (50%) is low priority. */
export const MEDIUM_PRIORITY_MAX_PCT = 40

/** Repeated unsuccessful attempts at/above this count escalate a target one priority band — persistent practice isn't closing the gap. */
export const ATTEMPT_ESCALATION_THRESHOLD = 3

function bandFor(pct: number): PracticePriority {
  if (pct < HIGH_PRIORITY_MAX_PCT) return 'high'
  if (pct < MEDIUM_PRIORITY_MAX_PCT) return 'medium'
  return 'low'
}

function escalate(priority: PracticePriority): PracticePriority {
  if (priority === 'low') return 'medium'
  if (priority === 'medium') return 'high'
  return 'high'
}

/** Minimal shape this module needs from a `TopicProgress` row, beyond what `RevisionProfile` already carries — callers may pass full Prisma rows. */
export interface TopicAttemptsRow {
  subjectSlug: string
  topicSlug: string
  attempts: number
}

/**
 * Task 3 — builds a priority-banded practice plan from an already-computed
 * `RevisionProfile`. `attemptsRows` is optional, read-only escalation
 * context only (it never introduces new targets, only raises priority on
 * targets already identified by `profile.weaknesses`).
 */
export function generatePracticeTargets(
  profile: RevisionProfile,
  attemptsRows: TopicAttemptsRow[] = []
): PracticeTargetPlan {
  const attemptsByKey = new Map(attemptsRows.map((r) => [`${r.subjectSlug}:${r.topicSlug}`, r.attempts]))

  const plan: PracticeTargetPlan = { high: [], medium: [], low: [] }

  for (const w of profile.weaknesses) {
    let priority = bandFor(w.masteryPct)
    const attempts = attemptsByKey.get(`${w.subjectSlug}:${w.topicSlug}`) ?? 0
    const escalated = attempts >= ATTEMPT_ESCALATION_THRESHOLD && priority !== 'high'
    if (escalated) priority = escalate(priority)

    plan[priority].push({
      topic: w.title,
      reason: escalated ? 'low mastery, repeated attempts' : 'low mastery',
      priority,
      subjectSlug: w.subjectSlug,
      topicSlug: w.topicSlug,
    })
  }

  for (const v of profile.visualWeaknesses) {
    const priority = bandFor(v.completionRatePct)
    plan[priority].push({
      topic: `${v.visualType} activities`,
      reason: 'weak visual engagement',
      priority,
      visualType: v.visualType,
    })
  }

  return plan
}
