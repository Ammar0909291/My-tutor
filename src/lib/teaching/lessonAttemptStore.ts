/**
 * Lesson attempt persistence (P6.5) — the only place LessonAttempt rows are
 * read or written.
 *
 * Split from lessonAttempt.ts so the outcome logic stays pure and unit-testable
 * without a database, matching how the evidence engine and asset layers are
 * already organised.
 *
 * Single-writer rule: this module owns lesson-scoped outcome rows. Concept-level
 * review status is NOT written here — it belongs to TopicProgress, the existing
 * review owner that teachingPlan.ts and teachingAdaptations.ts already read.
 * markConceptForReview() below updates that existing owner rather than starting
 * a second review queue.
 */

import type { PrismaClient } from '@prisma/client'
import {
  type LessonAttemptOutcome, completeLessonAttempt, startLessonAttempt, summaryFromAttempt,
} from './lessonAttempt'

type Db = Pick<PrismaClient, 'lessonAttempt' | 'topicProgress'>

function toOutcome(row: {
  lessonKey: string
  lessonTitle: string | null
  status: string
  startedAt: Date
  completedAt: Date | null
  durationSeconds: number | null
  conceptsMastered: string[]
  conceptsNeedingReview: string[]
  misconceptionsCorrected: string[]
  teachingAttempts: number
  budgetExhaustions: number
}): LessonAttemptOutcome {
  return {
    lessonKey: row.lessonKey,
    lessonTitle: row.lessonTitle,
    status: row.status as LessonAttemptOutcome['status'],
    startedAt: row.startedAt,
    completedAt: row.completedAt,
    durationSeconds: row.durationSeconds,
    conceptsMastered: [...row.conceptsMastered],
    conceptsNeedingReview: [...row.conceptsNeedingReview],
    misconceptionsCorrected: [...row.misconceptionsCorrected],
    teachingAttempts: row.teachingAttempts,
    budgetExhaustions: row.budgetExhaustions,
  }
}

/**
 * The open attempt for this lesson, creating one if none exists. This is the
 * RESUME path: a refresh re-enters here and gets the same row back, so the
 * outcome survives without any client-held state.
 */
export async function openLessonAttempt(
  db: Db,
  args: { userId: string; subjectSlug: string; lessonKey: string; lessonTitle?: string | null },
): Promise<{ id: string; outcome: LessonAttemptOutcome }> {
  const existing = await db.lessonAttempt.findFirst({
    where: {
      userId: args.userId,
      subjectSlug: args.subjectSlug,
      lessonKey: args.lessonKey,
      status: 'IN_PROGRESS',
    },
    orderBy: { startedAt: 'desc' },
  })
  if (existing) return { id: existing.id, outcome: toOutcome(existing) }

  const seed = startLessonAttempt(args.lessonKey, args.lessonTitle ?? null, new Date())
  const created = await db.lessonAttempt.create({
    data: {
      userId: args.userId,
      subjectSlug: args.subjectSlug,
      lessonKey: seed.lessonKey,
      lessonTitle: seed.lessonTitle,
      status: 'IN_PROGRESS',
      startedAt: seed.startedAt,
    },
  })
  return { id: created.id, outcome: toOutcome(created) }
}

/** Persist a folded outcome. Overwrites the aggregates wholesale — the pure
 *  layer already produced the complete new value, so there is no read-modify
 *  race between two writers of the same field. */
export async function saveLessonAttempt(
  db: Db,
  attemptId: string,
  outcome: LessonAttemptOutcome,
): Promise<void> {
  await db.lessonAttempt.update({
    where: { id: attemptId },
    data: {
      conceptsMastered: outcome.conceptsMastered,
      conceptsNeedingReview: outcome.conceptsNeedingReview,
      misconceptionsCorrected: outcome.misconceptionsCorrected,
      teachingAttempts: outcome.teachingAttempts,
      budgetExhaustions: outcome.budgetExhaustions,
      lessonTitle: outcome.lessonTitle,
    },
  })
}

/**
 * Close the lesson: status, completion time, duration, and the summary
 * evidence the tutor is allowed to verbalise. Returns the finalised outcome
 * and the summary built FROM IT — never from model memory.
 */
export async function finalizeLessonAttempt(
  db: Db,
  attemptId: string,
  outcome: LessonAttemptOutcome,
  now = new Date(),
) {
  const completed = completeLessonAttempt(outcome, now)
  const summary = summaryFromAttempt(completed)
  await db.lessonAttempt.update({
    where: { id: attemptId },
    data: {
      status: 'COMPLETED',
      completedAt: completed.completedAt,
      durationSeconds: completed.durationSeconds,
      conceptsMastered: completed.conceptsMastered,
      conceptsNeedingReview: completed.conceptsNeedingReview,
      misconceptionsCorrected: completed.misconceptionsCorrected,
      teachingAttempts: completed.teachingAttempts,
      budgetExhaustions: completed.budgetExhaustions,
      summaryEvidence: {
        mastered: summary.mastered.map((o) => o.conceptId),
        needsReview: summary.needsReview.map((o) => o.conceptId),
        corrected: summary.corrected.map((o) => o.conceptId),
        complete: summary.complete,
        totalConcepts: summary.totalConcepts,
      },
    },
  })
  return { outcome: completed, summary }
}

/**
 * Flag a concept for future review in the EXISTING owner (TopicProgress), not
 * in a second queue. Uses the REVISION status and revisionCount that
 * teachingPlan.ts and teachingAdaptations.ts already consume, so a concept
 * flagged here is picked up by the spaced-revision machinery unchanged.
 *
 * Never downgrades a concept that is already COMPLETED or MASTERED — a spent
 * budget on a later attempt must not erase earned mastery.
 */
export async function markConceptForReview(
  db: Db,
  args: { userId: string; subjectSlug: string; topicSlug: string },
): Promise<void> {
  const existing = await db.topicProgress.findUnique({
    where: {
      userId_subjectSlug_topicSlug: {
        userId: args.userId,
        subjectSlug: args.subjectSlug,
        topicSlug: args.topicSlug,
      },
    },
  })
  if (existing && (existing.status === 'COMPLETED' || existing.status === 'MASTERED')) return

  await db.topicProgress.upsert({
    where: {
      userId_subjectSlug_topicSlug: {
        userId: args.userId,
        subjectSlug: args.subjectSlug,
        topicSlug: args.topicSlug,
      },
    },
    update: {
      status: 'REVISION',
      revisionCount: { increment: 1 },
      lastRevisionAt: new Date(),
    },
    create: {
      userId: args.userId,
      subjectSlug: args.subjectSlug,
      topicSlug: args.topicSlug,
      status: 'REVISION',
      revisionCount: 1,
      lastRevisionAt: new Date(),
    },
  })
}

/** The most recent attempt for a lesson, for resume and history reads. */
export async function latestLessonAttempt(
  db: Db,
  args: { userId: string; subjectSlug: string; lessonKey: string },
): Promise<LessonAttemptOutcome | null> {
  const row = await db.lessonAttempt.findFirst({
    where: { userId: args.userId, subjectSlug: args.subjectSlug, lessonKey: args.lessonKey },
    orderBy: { startedAt: 'desc' },
  })
  return row ? toOutcome(row) : null
}
