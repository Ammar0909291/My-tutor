/**
 * Lesson attempt (P6.5) — the single owner of lesson-scoped outcomes.
 *
 * WHY A NEW ENTITY (the ownership decision, made after surveying what exists):
 *
 *   LearnSession   is (learner x chat session). A session is resumed for up to
 *                  24h and can span several lessons, while one lesson can span
 *                  several sessions. Wrong grain in both directions.
 *   TopicProgress  is (learner x topic), one row, OVERWRITTEN in place. It is
 *                  the right owner of a concept's CURRENT status — and it stays
 *                  that owner — but it structurally cannot record what happened
 *                  during one particular attempt, because the next attempt
 *                  overwrites it.
 *   StudentProgress is (learner x subject); it owns which lesson numbers are
 *                  complete, and keeps owning that.
 *   LearningPath   is curriculum, not outcome.
 *
 * No existing row has the grain (learner x lesson x attempt), and the required
 * facts — start/finish, duration, budget exhaustion, summary evidence — have
 * nowhere to live. That is the justification the brief asked for.
 *
 * WHAT THIS DOES NOT DO: it does not duplicate concept state. The authoritative
 * current status of a concept remains TopicProgress (status MASTERED/REVISION,
 * revisionCount) — the existing review owner, reused rather than replaced. The
 * id lists here are a record of what THIS attempt demonstrated, which is
 * inherently time-scoped and unrecoverable once TopicProgress is overwritten.
 * Evidence, not state.
 *
 * This file is pure. All Prisma access lives in lessonAttemptStore.ts, so the
 * outcome logic stays unit-testable without a database.
 */

import type { ConversationState } from './conversationState'
import { evaluateConceptBudget, hasDemonstratedMastery } from './conceptBudget'
import { conceptOutcome, buildLessonSummary, type ConceptOutcome, type LessonSummary } from './lessonSummary'

export type LessonAttemptStatusValue = 'IN_PROGRESS' | 'COMPLETED' | 'ABANDONED'

/** The lesson-level outcome record, independent of Prisma types so the pure
 *  layer never imports the client. */
export interface LessonAttemptOutcome {
  lessonKey: string
  lessonTitle: string | null
  status: LessonAttemptStatusValue
  startedAt: Date
  completedAt: Date | null
  durationSeconds: number | null
  conceptsMastered: string[]
  conceptsNeedingReview: string[]
  misconceptionsCorrected: string[]
  teachingAttempts: number
  budgetExhaustions: number
}

/**
 * Stable lesson identity within a subject. Curriculum-ordered subjects address
 * lessons by order number; topic-addressed ones by slug. One key format, so a
 * lesson cannot be recorded under two identities.
 */
export function lessonKeyFor(input: { topicSlug?: string | null; lessonOrder?: number | null }): string | null {
  const slug = input.topicSlug?.trim()
  if (slug) return slug
  if (typeof input.lessonOrder === 'number' && Number.isFinite(input.lessonOrder) && input.lessonOrder > 0) {
    return `lesson:${Math.floor(input.lessonOrder)}`
  }
  return null
}

/** A fresh attempt. */
export function startLessonAttempt(
  lessonKey: string,
  lessonTitle: string | null,
  now: Date,
): LessonAttemptOutcome {
  return {
    lessonKey,
    lessonTitle,
    status: 'IN_PROGRESS',
    startedAt: now,
    completedAt: null,
    durationSeconds: null,
    conceptsMastered: [],
    conceptsNeedingReview: [],
    misconceptionsCorrected: [],
    teachingAttempts: 0,
    budgetExhaustions: 0,
  }
}

/**
 * Fold ONE finished concept into the attempt. Called when a concept closes —
 * either mastered, or with its teaching budget spent (P6). Idempotent per
 * concept: recording the same concept twice does not double-count it, so a
 * retry or a duplicated turn cannot inflate the outcome.
 */
export function recordConceptOutcome(
  attempt: LessonAttemptOutcome,
  state: ConversationState,
  title?: string | null,
): LessonAttemptOutcome {
  const conceptId = state.conceptId
  if (!conceptId) return attempt

  const outcome = conceptOutcome(state, title)
  const budget = evaluateConceptBudget(state)

  const mastered = new Set(attempt.conceptsMastered)
  const review = new Set(attempt.conceptsNeedingReview)
  const corrected = new Set(attempt.misconceptionsCorrected)

  // Already folded — nothing to add, and counters must not advance again.
  if (mastered.has(conceptId) || review.has(conceptId)) return attempt

  if (outcome.status === 'mastered') {
    mastered.add(conceptId)
    // A concept that was mastered is no longer pending review, even if an
    // earlier attempt at it had been flagged.
    review.delete(conceptId)
  } else {
    review.add(conceptId)
  }
  if (outcome.misconceptionsCorrected) corrected.add(conceptId)

  return {
    ...attempt,
    conceptsMastered: [...mastered],
    conceptsNeedingReview: [...review],
    misconceptionsCorrected: [...corrected],
    teachingAttempts: attempt.teachingAttempts + 1 + (state.remediationCount ?? 0),
    budgetExhaustions: attempt.budgetExhaustions + (budget.reason !== null ? 1 : 0),
  }
}

/**
 * Close the attempt. Duration is denormalised here so analytics never has to
 * recompute it, and is clamped at zero so a clock skew cannot store a negative.
 */
export function completeLessonAttempt(
  attempt: LessonAttemptOutcome,
  now: Date,
): LessonAttemptOutcome {
  if (attempt.status === 'COMPLETED') return attempt
  const seconds = Math.max(0, Math.round((now.getTime() - attempt.startedAt.getTime()) / 1000))
  return { ...attempt, status: 'COMPLETED', completedAt: now, durationSeconds: seconds }
}

/**
 * The lesson summary, rebuilt from the PERSISTED outcome rather than from
 * conversation state or model memory. This is what makes the summary honest
 * across a refresh: the evidence outlives the session.
 */
export function summaryFromAttempt(attempt: LessonAttemptOutcome): LessonSummary {
  const outcomes: ConceptOutcome[] = [
    ...attempt.conceptsMastered.map((id): ConceptOutcome => ({
      conceptId: id,
      title: id,
      status: 'mastered',
      misconceptions: attempt.misconceptionsCorrected.includes(id) ? [id] : [],
      misconceptionsCorrected: attempt.misconceptionsCorrected.includes(id),
    })),
    ...attempt.conceptsNeedingReview.map((id): ConceptOutcome => ({
      conceptId: id,
      title: id,
      status: 'needs_review',
      misconceptions: [],
      misconceptionsCorrected: false,
    })),
  ]
  return buildLessonSummary(outcomes)
}

/**
 * Is the lesson finished? True when every concept the attempt touched has
 * closed AND at least one concept was attempted. Deliberately server-side:
 * the client never decides this.
 */
export function isLessonFinished(
  attempt: LessonAttemptOutcome,
  remainingConceptIds: string[],
): boolean {
  const touched = attempt.conceptsMastered.length + attempt.conceptsNeedingReview.length
  return touched > 0 && remainingConceptIds.length === 0
}

/**
 * Should the current concept be folded into the attempt now? True when it has
 * either been mastered or run out of budget — the two ways P6 lets a concept
 * close. Keeps the fold trigger in one place so the caller cannot invent a
 * third closing condition.
 */
export function isConceptClosed(state: ConversationState): boolean {
  if (!state.conceptId) return false
  return hasDemonstratedMastery(state) || evaluateConceptBudget(state).status === 'exhausted'
}
