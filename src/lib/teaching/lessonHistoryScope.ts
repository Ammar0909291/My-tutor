/**
 * PHASE C — THE MODEL'S TRANSCRIPT IS THE LESSON'S TRANSCRIPT.
 *
 * THE DEFECT. The product has two readers of the same message history and they
 * already disagreed:
 *
 *   GET /api/sessions/history   serves the learner's SCREEN.  Lesson-scoped:
 *       it filters `where.lessonKey`, resolved server-side from
 *       `StudentProgress.activeLessonSlug ?? currentLesson` via lessonKeyFor().
 *   POST /api/learn/chat        serves the MODEL's prompt.    NOT scoped:
 *       the newest 30 non-SYSTEM rows, with `lessonKey` read off the row and
 *       then dropped by the `.map()`.
 *
 * So the model could answer from turns THE LEARNER CANNOT SEE. Measured live
 * on 2026-08-25 with Phase B's state isolation fully in force: a learner left
 * an RMS-voltage question in one lesson, opened a kinematics lesson, typed
 * "230 V", and the tutor replied "Correct! 230 volts is the RMS value for a
 * 325-volt peak sine wave." No evidence was written and no counter moved —
 * Phase B holds — but the lesson was incoherent.
 *
 * This is not new architecture. The scoping decision was already made and
 * already implemented once, in the restore route; this makes the prompt path
 * honour it, using the same `lessonKeyFor()` identity and the same
 * omit-the-clause-when-unresolvable fallback.
 *
 * ── WHY THE FILTER IS APPLIED AFTER THE QUERY, NOT INSIDE IT ────────────────
 *
 * `learnSession.messages` has TWELVE readers in the chat route and only ONE of
 * them has this defect. The other eleven legitimately reason about the
 * SESSION, not the lesson:
 *
 *   messages[0].createdAt      the 30-minute episode boundary (sessionLifecycle)
 *   find(role === ASSISTANT)   last-assistant latency, the prose-MCQ check,
 *                              the filler-repair check, evidence timing
 *   find(role === USER)        the session's opening learner message
 *
 * Narrowing the QUERY would silently change every one of them — a learner who
 * switched lessons would get a fresh episode, a reset affect budget and a
 * broken latency measurement as a side effect of a transcript fix. So the
 * query and all eleven other readers are left exactly as they are, and only
 * the prompt assembly is scoped.
 *
 * ── WHY `take: 30` BEFORE THE FILTER CANNOT STARVE THE LESSON ───────────────
 *
 * The 30 are the NEWEST messages, and the current lesson's own turns are by
 * construction the newest ones in the session. The filter can therefore only
 * ever remove OLDER, foreign-lesson turns — never the current lesson's. The
 * window is "the newest ≤30 messages OF THIS LESSON", which is exactly the
 * intent. A lesson that has just opened legitimately has a short history; that
 * is not degradation, it is the truth.
 *
 * ── UNTAGGED HISTORY: TRACED, NOT GUESSED ──────────────────────────────────
 *
 * `Message.lessonKey` post-dates a large amount of history, so the obvious
 * worry is that a hard cut deletes context. Measured against production before
 * writing this:
 *
 *   by day:      100% untagged on and before 2026-08-12
 *                ~0% untagged from 2026-08-13 onward (0.0-0.6%, a handful of
 *                stragglers from the two known write paths that can drop it)
 *   by session:  290 sessions contain untagged messages
 *                282 of them (97.2%) have ZERO distinct lessonKeys AT ALL
 *                  5 have exactly one
 *                  3 have several
 *
 * So untagged history is a LEGACY CLIFF, not an ongoing stream, and it cannot
 * be safely associated by any available means:
 *
 *   by attempt window   LessonAttempt rows only exist from 2026-08-16, i.e.
 *                       entirely AFTER the cliff. Nothing covers that era.
 *   by tagged neighbour 97.2% of affected sessions have no tagged message to
 *                       interpolate from.
 *   by sole lesson      the same 97.2% have no lessonKey at all, so there is
 *                       no single lesson to inherit.
 *
 * Per the instruction that produced this module: where they cannot be safely
 * associated they are EXCLUDED from the lesson-specific window rather than
 * guessed at. The cost is bounded and benign — a session dormant since
 * ~2026-08-12 that is resumed gets a short or empty prompt history, which is
 * the same shape as a freshly opened lesson (the system prompt still carries
 * lessonCtx, and the snapshot still carries the ladder). The alternative,
 * admitting them, is precisely the bug.
 *
 * ── THE CONSERVATIVE FALLBACK ──────────────────────────────────────────────
 *
 * When THIS TURN has no resolvable lesson key — School Mode, a subject with no
 * curriculum grain, a learner with no StudentProgress row — nothing is scoped
 * and the behaviour is byte-identical to before. Same rule, and the same
 * reasoning, as the restore route's `...(lessonKey ? { lessonKey } : {})`:
 * there is nothing to narrow correctly, and narrowing to a fabricated key
 * would hide the history that does exist rather than protect anything.
 *
 * Pure module: no DB, no I/O, no knowledge of Prisma.
 */

/** The narrow shape this module needs. Structural, so tests drive it with
 *  plain objects and the route passes Prisma rows unchanged. */
export interface ScopableMessage {
  lessonKey?: string | null
}

export type HistoryScopeReason =
  /** This turn has no lesson identity — nothing scoped, behaviour unchanged. */
  | 'unscoped-no-lesson-key'
  /** Scoped to the current lesson. */
  | 'scoped'

export interface HistoryScopeResult<T extends ScopableMessage> {
  messages: T[]
  reason: HistoryScopeReason
  /** How many rows the scope removed. 0 when nothing was scoped. */
  dropped: number
  /** Of those, how many were dropped for carrying NO lesson key at all —
   *  the legacy population. Separated from foreign-lesson drops because they
   *  are different facts with different causes, and conflating them in
   *  telemetry would hide a regression in the write path behind a legacy
   *  number that is expected to be non-zero. */
  droppedUntagged: number
}

/**
 * Narrow a session's messages to the lesson this turn is teaching.
 *
 * `currentLessonKey` MUST be produced by the same expression the message
 * WRITERS use — `lessonKeyFor({ topicSlug: activeLessonSlug, lessonOrder:
 * currentLesson })` — or the comparison below can never match and every turn
 * would silently receive an empty history. That equality is asserted by
 * `lessonHistoryScope.test.ts` against the route's own source, because it is
 * exactly the "two readers of one owner disagreeing about the key" failure
 * this phase exists to end, and a type cannot catch it.
 *
 * Pure and total: never throws, never mutates the input array.
 */
export function scopeHistoryToLesson<T extends ScopableMessage>(
  messages: T[],
  currentLessonKey: string | null,
): HistoryScopeResult<T> {
  if (!currentLessonKey) {
    return {
      messages,
      reason: 'unscoped-no-lesson-key',
      dropped: 0,
      droppedUntagged: 0,
    }
  }

  const kept: T[] = []
  let droppedUntagged = 0
  for (const m of messages) {
    const key = typeof m.lessonKey === 'string' && m.lessonKey ? m.lessonKey : null
    if (key === currentLessonKey) {
      kept.push(m)
      continue
    }
    // Untagged rows are counted separately but treated identically: excluded.
    // See UNTAGGED HISTORY above — association was traced and is not possible.
    if (key === null) droppedUntagged++
  }

  return {
    messages: kept,
    reason: 'scoped',
    dropped: messages.length - kept.length,
    droppedUntagged,
  }
}
