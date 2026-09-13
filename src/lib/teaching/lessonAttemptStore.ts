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
  args: {
    userId: string; subjectSlug: string; lessonKey: string; lessonTitle?: string | null
    /** Move an existing IN_PROGRESS row's clock to now. Set only when the
     *  caller has decided this is a genuine restart over an ABANDONED attempt
     *  (lessonAttemptStartDecision). Without it the reused row keeps the old
     *  attempt's `startedAt`, and a restart days later reports a duration in
     *  days — measured at 928967 seconds on physics lesson 24. */
    resetStartedAt?: boolean
  },
): Promise<{ id: string; outcome: LessonAttemptOutcome; updatedAt: Date | null }> {
  const existing = await db.lessonAttempt.findFirst({
    where: {
      userId: args.userId,
      subjectSlug: args.subjectSlug,
      lessonKey: args.lessonKey,
      status: 'IN_PROGRESS',
    },
    // Total order, same reason as latestLessonAttempt below.
    orderBy: [{ startedAt: 'desc' }, { id: 'desc' }],
  })
  if (existing) {
    if (!args.resetStartedAt) {
      return { id: existing.id, outcome: toOutcome(existing), updatedAt: existing.updatedAt ?? null }
    }
    const restarted = await db.lessonAttempt.update({
      where: { id: existing.id },
      data: { startedAt: new Date() },
    })
    return { id: restarted.id, outcome: toOutcome(restarted), updatedAt: restarted.updatedAt ?? null }
  }

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
  return { id: created.id, outcome: toOutcome(created), updatedAt: created.updatedAt ?? null }
}

const aggregateData = (outcome: LessonAttemptOutcome) => ({
  conceptsMastered: outcome.conceptsMastered,
  conceptsNeedingReview: outcome.conceptsNeedingReview,
  misconceptionsCorrected: outcome.misconceptionsCorrected,
  teachingAttempts: outcome.teachingAttempts,
  budgetExhaustions: outcome.budgetExhaustions,
  lessonTitle: outcome.lessonTitle,
})

/**
 * Persist a folded outcome.
 *
 * ── THE LOST UPDATE THIS GUARDS (PCD-004B) ────────────────────────────────
 * This used to write the aggregates wholesale, justified as "the pure layer
 * already produced the complete new value, so there is no read-modify race
 * between two writers of the same field". That holds WITHIN one turn and fails
 * ACROSS two: a lesson attempt is (user x subject x lesson) — deliberately, so
 * a lesson can span sessions — so two turns that close DIFFERENT concepts of
 * the same lesson concurrently both read the row, both fold their own concept
 * onto it, and the later write erases the earlier concept. Measured by
 * `lessonAttemptConcurrency.test.ts`'s negative control.
 *
 * ── WHY A REFOLD AND NOT A MERGE ──────────────────────────────────────────
 * Merging two folded outcomes has no single correct answer: `conceptsMastered`
 * and `conceptsNeedingReview` are not independent sets (mastery REMOVES a
 * concept from review), and `teachingAttempts`/`budgetExhaustions` are
 * increments, so unioning the sets and summing the counters double-counts the
 * shared base. Re-folding does not have to guess any of that — it re-applies
 * THIS turn's single concept to the row as it actually is now, which is what
 * `recordConceptOutcome` is already built to do (it is idempotent per concept
 * and returns the attempt unchanged when the concept is already folded).
 *
 * This is `writeSnapshotDelta`'s contract, applied to the same class of
 * problem: conditional write, one retry, caller-supplied re-derivation, and
 * never throws. `updatedAt` is the version — it already exists on the model
 * and is maintained by Prisma, so this needs no migration.
 *
 * Called WITHOUT `opts` it behaves exactly as before, so existing callers and
 * the finalising path are unchanged.
 */
export async function saveLessonAttempt(
  db: Db,
  attemptId: string,
  outcome: LessonAttemptOutcome,
  opts?: {
    /** `updatedAt` as it was when `outcome` was folded. Omit for an
     *  unconditional write (the previous behaviour). */
    expectedUpdatedAt?: Date | null
    /** Re-apply this turn's fold to the row as it actually is. Called at most
     *  once, only when the conditional write found the row had moved. */
    refold?: (fresh: LessonAttemptOutcome) => LessonAttemptOutcome
  },
): Promise<{ applied: boolean; conflicted: boolean }> {
  if (!opts?.expectedUpdatedAt || !opts.refold) {
    await db.lessonAttempt.update({ where: { id: attemptId }, data: aggregateData(outcome) })
    return { applied: true, conflicted: false }
  }

  const first = await db.lessonAttempt.updateMany({
    where: { id: attemptId, updatedAt: opts.expectedUpdatedAt },
    data: aggregateData(outcome),
  })
  if (first.count > 0) return { applied: true, conflicted: false }

  // Another turn committed between our read and this write. Re-read, re-fold
  // OUR concept onto what is actually there, and write once more.
  const fresh = await db.lessonAttempt.findFirst({ where: { id: attemptId } })
  if (!fresh) return { applied: false, conflicted: true }
  const refolded = opts.refold(toOutcome(fresh))
  const second = await db.lessonAttempt.updateMany({
    where: { id: attemptId, updatedAt: fresh.updatedAt },
    data: aggregateData(refolded),
  })
  // A second conflict loses this turn's fold — exactly what the unconditional
  // write did every time — and never fails the turn.
  return { applied: second.count > 0, conflicted: true }
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

/**
 * A3 — the mirror of `markConceptForReview`, for the branch that was missing one.
 *
 * At lesson finalisation the route folds each concept into `conceptsMastered`
 * or `conceptsNeedingReview`. The needs-review branch has a TopicProgress
 * writer (above); the MASTERED branch had none. So a lesson could finish with
 * `verified: true` and `lesson_attempts = COMPLETED` while TopicProgress still
 * read whatever the conversational-evidence writer last left — measured on the
 * first completed mathematics lesson as IN_PROGRESS / 65%, which is that
 * writer's deliberate never-certify output, not a bug in it.
 *
 * WHY THIS DOES NOT LOWER THE MASTERY BAR — it invents no rule and no score:
 *
 *   · It runs ONLY for a concept the completion gate already placed in
 *     `conceptsMastered`, i.e. one that satisfied `masteryVerifiedStrict`
 *     (correctAtCheck >= 1 AND correctAtPractice >= 2 on VERIFIED counters).
 *   · The new status comes from `deriveTopicStatus`, the platform's existing
 *     canonical formula, applied to the masteryPct ALREADY on the row. This
 *     function never writes `masteryPct` — inventing a score is exactly the
 *     thing it must not do, so a row whose score the formula judges too low
 *     stays IN_PROGRESS on its own terms.
 *   · `deriveTopicStatus` refuses to downgrade by construction: anything not
 *     NOT_STARTED/IN_PROGRESS is returned unchanged, so MASTERED is never
 *     reduced to COMPLETED and a concept flagged REVISION is never certified.
 *   · No row is created. Absent a TopicProgress row there is no recorded score
 *     to judge, and manufacturing one would be manufacturing evidence.
 */
export async function markConceptMastered(
  db: Db,
  args: { userId: string; subjectSlug: string; topicSlug: string },
): Promise<void> {
  const key = {
    userId_subjectSlug_topicSlug: {
      userId: args.userId,
      subjectSlug: args.subjectSlug,
      topicSlug: args.topicSlug,
    },
  }
  const existing = await db.topicProgress.findUnique({ where: key })
  if (!existing) return

  const { deriveTopicStatus } = await import('@/lib/mastery/topicMasteryFormula')
  const next = deriveTopicStatus(
    existing.status as Parameters<typeof deriveTopicStatus>[0],
    existing.masteryPct ?? 0,
  )
  if (next === existing.status) return

  await db.topicProgress.update({
    where: key,
    data: { status: next, completedAt: new Date() },
  })
}

/** The most recent attempt for a lesson, for resume and history reads. */
export async function latestLessonAttempt(
  db: Db,
  args: { userId: string; subjectSlug: string; lessonKey: string },
): Promise<LessonAttemptOutcome | null> {
  const row = await db.lessonAttempt.findFirst({
    where: { userId: args.userId, subjectSlug: args.subjectSlug, lessonKey: args.lessonKey },
    // `startedAt` alone is not a total order: two attempts at one lesson
    // created inside the same millisecond sorted arbitrarily, so "the latest
    // attempt" — which the D-0a completion gate reads — could flip between
    // calls. Found by a test that was green alone and red in the full suite.
    // `id` breaks the tie deterministically (cuid is monotonic within a
    // millisecond); it changes nothing when the timestamps differ.
    orderBy: [{ startedAt: 'desc' }, { id: 'desc' }],
  })
  return row ? toOutcome(row) : null
}
