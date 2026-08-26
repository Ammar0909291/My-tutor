/**
 * PHASE B — THE PENDING QUESTION HAS A LESSON.
 *
 * THE P0 THIS CLOSES, measured against main at c6bf801. `contextSnapshot.
 * pendingMcq` stores the question the tutor asked LAST turn so the NEXT turn
 * can grade the learner's reply against its stored `correctIndex`. It was
 * stored as `{question, options, correctIndex}` and nothing else — no lesson,
 * no concept, no attempt. Every other per-turn store in this runtime is either
 * keyed (conversationState / teachingHistory / objectiveState all reset on a
 * concept change) or explicitly retired at lesson open (sessionEpisode,
 * sessionFailureCount, visualSession). The pending question was neither, and
 * it is the one store whose staleness writes PERMANENT EVIDENCE.
 *
 * The chain, every link verified in source:
 *
 *   lesson A, last turn   route.ts persists pendingMcq = A's question
 *   learner opens lesson B  lesson-init clears episode + visual + ladder;
 *                           pendingMcq is not in that delta, so it survives
 *   lesson B, first turn  route.ts hoists pendingMcq (no identity to check)
 *                         -> gradeMcqAnswer(B's first message, A's question)
 *                         -> mcqGrade drives the SIGNAL, the ladder and
 *                            TopicProgress evidence for concept B
 *
 * A learner's opening sentence in a new lesson was graded against a question
 * from a lesson they had left. A wrong grade there is worse than a missing
 * one: it spends the affect budget, drops the phase, and banks a
 * PROBE_OUTCOME the learner never produced — the exact harm the grader work
 * in c6bf801 argues against from the other direction.
 *
 * TWO RULES, TWO SCOPES, AND NEITHER IS "CLEAR ON EVERY TURN".
 *
 *   LESSON SWITCH  — handled HERE, by identity. The stored question carries
 *     the lesson it was asked in; a reply is graded only when the lesson still
 *     matches. This covers every route into another lesson, including the ones
 *     that open no new attempt (mode 'next' onto a lesson that already has an
 *     IN_PROGRESS row clears nothing at lesson-init), and it needs no
 *     cooperation from any caller.
 *
 *   NEW ATTEMPT    — handled by attemptIsolation.ts, because a restart keeps
 *     the SAME lesson key, so identity alone cannot see it. That reset is
 *     scoped to the moment lesson-init has already decided to open an attempt.
 *
 * WHAT DELIBERATELY SURVIVES: a RESUME. The learner reads an MCQ, refreshes
 * the page, and answers it. The widget re-renders from this very key and the
 * answer must still grade. A blind clear at lesson open would break that, and
 * that is why the reset is scoped to an opened attempt rather than to the
 * lesson-init call.
 *
 * LEGACY ROWS. A snapshot written before this module existed carries no
 * `lessonKey`. Such a row is treated as matching, so behaviour for a session
 * already in flight is byte-identical to before — and it self-heals on the
 * very next turn, because route.ts rewrites this key unconditionally on every
 * turn. The genuine cross-lesson path is closed by the attempt reset in the
 * same change, so the legacy window is not the leak.
 *
 * Pure module: no DB, no I/O. Owns the PENDING state only — the MCQ shape and
 * the grader stay in mcq.ts, untouched.
 */

import type { TutorMCQ } from './mcq'

/** The stored shape. `lessonKey` is optional only so a pre-Phase-B row parses;
 *  every write from this module sets it (or an explicit null in School Mode,
 *  which has no lesson key at all). */
export interface PendingQuestion extends TutorMCQ {
  lessonKey: string | null
}

/** Structural validation of the three fields the grader needs. Split out so
 *  the identity check below reads as one idea rather than two. */
function isWellFormed(raw: unknown): raw is Record<string, unknown> {
  if (!raw || typeof raw !== 'object') return false
  const p = raw as { question?: unknown; options?: unknown; correctIndex?: unknown }
  return typeof p.question === 'string'
    && Array.isArray(p.options)
    && p.options.every((o) => typeof o === 'string')
    && typeof p.correctIndex === 'number'
    && p.correctIndex >= 0
    && p.correctIndex < p.options.length
}

/**
 * Read back the question this turn is allowed to grade against.
 *
 * Returns null when the stored question belongs to a different lesson — the
 * reply is then treated exactly as it would be if the tutor had asked nothing,
 * which is the truth: nothing was asked in THIS lesson.
 *
 * `currentLessonKey` is null in School Mode and on any turn with no resolved
 * lesson. A null on BOTH sides matches (nothing changed); a null on one side
 * only does not, because that IS a change of lesson identity.
 */
export function readPendingQuestion(
  raw: unknown,
  currentLessonKey: string | null,
): TutorMCQ | null {
  if (!isWellFormed(raw)) return null
  const p = raw as {
    question: string; options: string[]; correctIndex: number
    lessonKey?: unknown; assetId?: unknown
  }

  // Legacy row (key absent entirely) — see LEGACY ROWS above.
  const stored = typeof p.lessonKey === 'string' ? p.lessonKey
    : p.lessonKey === null ? null
      : undefined
  if (stored !== undefined && stored !== currentLessonKey) return null

  // PHASE F: restore the authored identity when the stored row has one. Read
  // defensively — every row written before this change has no assetId, and a
  // legacy row must restore and grade exactly as it always did.
  const assetId = typeof p.assetId === 'string' && p.assetId ? p.assetId : undefined
  return {
    question: p.question,
    options: p.options,
    correctIndex: p.correctIndex,
    ...(assetId ? { assetId } : {}),
  }
}

/**
 * The value to persist. Returns null when this turn asked nothing — the same
 * unconditional "write null so a stale MCQ can never grade an unrelated later
 * message" contract route.ts already had, now carrying the lesson it belongs
 * to.
 */
export function writePendingQuestion(
  mcq: TutorMCQ | null,
  currentLessonKey: string | null,
): PendingQuestion | null {
  if (!mcq) return null
  return {
    question: mcq.question,
    options: mcq.options,
    correctIndex: mcq.correctIndex,
    lessonKey: currentLessonKey,
    // PHASE F: persist the authored identity across the turn boundary. Written
    // conditionally so a model-generated question stores exactly the shape it
    // always did — the row stays anonymous, which is the contract.
    ...(mcq.assetId ? { assetId: mcq.assetId } : {}),
  }
}

/**
 * Retire the pending question for a NEW ATTEMPT. A delta for
 * writeSnapshotDelta, which merges — the key is retired with an explicit null,
 * and readPendingQuestion already reads a non-object as "nothing pending", so
 * no reader changes.
 */
export function clearPendingQuestionForNewAttempt(): Record<string, unknown> {
  return { pendingMcq: null }
}
