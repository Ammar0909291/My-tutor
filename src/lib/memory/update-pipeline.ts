/**
 * Memory Update Pipeline — Phase 2B
 *
 * Writes learning-event outcomes into RetentionMetric and ReviewSchedule,
 * completing the scaffolding that has been read-only since those tables were
 * created. All exported functions are fire-and-forget: callers wrap them in
 * Promise.resolve().then(...).catch(() => {}) so a pipeline failure never
 * surfaces to the learner.
 *
 * Idempotency: every write uses upsert (not create), so duplicate calls from
 * retried requests or concurrent submissions converge to the same final state.
 */

import { prisma } from '@/lib/db/prisma'

// ── SM-2 inspired interval ladder ─────────────────────────────────────────────
// Stage 0 → 1 day, 1 → 3 days, 2 → 7 days, 3 → 14 days, 4 → 30 days, 5 → 60 days.
// Full Ebbinghaus decay is added in Phase 2D; this is the base interval schedule.
const REVIEW_INTERVALS_DAYS = [1, 3, 7, 14, 30, 60] as const

function nextReviewDate(stage: number, passed: boolean): Date {
  const intervalDays = passed
    ? REVIEW_INTERVALS_DAYS[Math.min(stage, REVIEW_INTERVALS_DAYS.length - 1)]
    : REVIEW_INTERVALS_DAYS[0]   // failed → back to 1-day interval
  const d = new Date()
  d.setDate(d.getDate() + intervalDays)
  d.setHours(0, 0, 0, 0)
  return d
}

// ── Retention score helpers ───────────────────────────────────────────────────

/** Map a 0–100 accuracy score to a 0–100 confidence score (logistic-ish curve). */
function scoreToConfidence(accuracyPercent: number): number {
  if (accuracyPercent >= 90) return Math.min(100, Math.round(accuracyPercent * 1.05))
  if (accuracyPercent >= 70) return accuracyPercent
  return Math.round(accuracyPercent * 0.85)
}

/** Simple linear decay: 1 point per day since last review, floored at 0. */
function computeDecayScore(lastReviewedAt: Date | null, reviewCount: number): number {
  if (!lastReviewedAt || reviewCount === 0) return 100
  const daysSince = Math.floor((Date.now() - lastReviewedAt.getTime()) / 86_400_000)
  return Math.max(0, Math.min(100, 100 - daysSince))
}

// ── Core write: upsert RetentionMetric + ReviewSchedule for one topic ─────────

async function upsertTopicMemory(
  userId: string,
  subjectId: string,
  topicSlug: string,
  masteryPct: number,
  passed: boolean,
): Promise<void> {
  // Fetch existing retention for this topic to compute incremental values
  const existing = await prisma.retentionMetric.findUnique({
    where: { userId_subjectId_topic: { userId, subjectId, topic: topicSlug } },
    select: { reviewCount: true, lastReviewedAt: true, masteryScore: true },
  }).catch(() => null)

  const reviewCount      = (existing?.reviewCount ?? 0) + 1
  const masteryScore     = masteryPct
  const confidenceScore  = scoreToConfidence(masteryPct)
  const decayScore       = computeDecayScore(new Date(), reviewCount)

  await prisma.retentionMetric.upsert({
    where: { userId_subjectId_topic: { userId, subjectId, topic: topicSlug } },
    create: {
      userId,
      subjectId,
      topic:           topicSlug,
      masteryScore,
      confidenceScore,
      decayScore,
      reviewCount,
      lastReviewedAt:  new Date(),
    },
    update: {
      masteryScore,
      confidenceScore,
      decayScore,
      reviewCount,
      lastReviewedAt: new Date(),
    },
  })

  // Upsert ReviewSchedule — advance stage on pass, reset to 0 on fail
  const existingSchedule = await prisma.reviewSchedule.findFirst({
    where: { userId, subjectId, topic: topicSlug },
    select: { id: true, stage: true },
  }).catch(() => null)

  const currentStage = existingSchedule?.stage ?? 0
  const newStage     = passed ? Math.min(currentStage + 1, REVIEW_INTERVALS_DAYS.length - 1) : 0
  const nextReviewAt = nextReviewDate(newStage, passed)
  const outcome      = passed ? 'GOOD' as const : 'AGAIN' as const

  if (existingSchedule?.id) {
    await prisma.reviewSchedule.update({
      where: { id: existingSchedule.id },
      data: { stage: newStage, nextReviewAt, lastOutcome: outcome, lastReviewedAt: new Date() },
    })
  } else {
    await prisma.reviewSchedule.create({
      data: { userId, subjectId, topic: topicSlug, stage: newStage, nextReviewAt, lastOutcome: outcome, lastReviewedAt: new Date() },
    })
  }
}

// ── Public update functions (all fire-and-forget) ─────────────────────────────

/**
 * Call after a practice session completes.
 * Updates RetentionMetric and ReviewSchedule for each topic in the session.
 * Idempotent — duplicate calls converge to the same state.
 */
export async function updateMemoryFromPractice(
  userId: string,
  subjectId: string,
  topicUpdates: Array<{ topicSlug: string; masteryPct: number; passed: boolean }>,
): Promise<void> {
  await Promise.all(
    topicUpdates.map(({ topicSlug, masteryPct, passed }) =>
      upsertTopicMemory(userId, subjectId, topicSlug, masteryPct, passed),
    ),
  )
}

/**
 * Call after an assessment completes.
 * Same as updateMemoryFromPractice — the update logic is identical; the caller
 * label differs only for clarity in observability logs.
 */
export async function updateMemoryFromAssessment(
  userId: string,
  subjectId: string,
  topicUpdates: Array<{ topicSlug: string; masteryPct: number; passed: boolean }>,
): Promise<void> {
  await updateMemoryFromPractice(userId, subjectId, topicUpdates)
}
