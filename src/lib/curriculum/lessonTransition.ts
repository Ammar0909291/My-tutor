/**
 * Lesson transition — the single decision layer for "what happens next".
 *
 * ─── ROOT CAUSE THIS FILE EXISTS FOR ─────────────────────────────────────────
 *
 * P0-1/2/3 (completing a lesson did not move the learner on). LessonScreen had
 * FOUR transition entry points and only two of them actually transitioned:
 *
 *   handleSkipAnyway      records completion -> finds next -> resets the chat ->
 *                         calls lesson-init                       ✔ transitions
 *   confirmLessonSwitch   same shape                              ✔ transitions
 *   handleLessonComplete  PATCHes /api/curriculum/progress and calls
 *                         setCurriculumProgress — and stops        ✘ NO transition
 *
 * handleLessonComplete is what auto-complete ([LESSON_COMPLETE]), the "Complete
 * lesson" button, and the completion card's "Next lesson" button all call. It
 * advances SERVER progress (currentLesson moves on) but never touches the
 * client's lesson session: messages, lessonStarted, initializedRef and
 * pendingLesson all keep pointing at the lesson just finished, and no
 * lesson-init request is ever made. The learner is left sitting in the
 * completed lesson's chat while the roadmap silently moved ahead.
 *
 * The completion card's own comment shows how the trap reads from inside:
 * "handleLessonComplete is the existing client owner of lesson advancement …
 * Reused rather than adding a second advancement path." It owns PROGRESS
 * advancement. It never owned SESSION advancement. Those are two different
 * things and the difference is invisible at the call site — which is why three
 * separate callers made the same mistake.
 *
 * P0-4 (manual first entry skipped the lesson introduction). startLesson()
 * decided whether to send an opening with `if (data.resumed && restoredAny)
 * return` — i.e. "does this SUBJECT's session have any history?". Lesson
 * introductions are per-LESSON, so any learner with prior history in the
 * subject got no introduction when entering a lesson they had never seen.
 * Resume must be decided from THAT LESSON's own progress, which is what
 * decideLessonEntryMode does.
 *
 * ─── WHY A PURE MODULE ───────────────────────────────────────────────────────
 * These decisions were previously implicit in a 4,600-line React component and
 * therefore untestable. Everything here is a pure function over state the
 * caller already holds; LessonScreen keeps ownership of the side effects.
 * No architecture change, no new store, no schema change.
 */

import type { CurriculumLesson, CurriculumProgress, TopicProgressEntry } from './lessonNavigation'

/** How a lesson should be opened when the learner enters it. */
export type LessonEntryMode =
  /** Never started: full lesson introduction. */
  | 'introduction'
  /** Genuine saved progress in THIS lesson: continue where they left off. */
  | 'resume'
  /** Already completed/mastered: revision. */
  | 'review'
  /** Explicit restart of the lesson the learner is already on. */
  | 'restart'

/**
 * The lesson-init `mode` each entry mode maps to.
 *
 * 'introduction' maps to lesson-init's 'next', whose instruction is
 * `Let's start lesson "X"` — the full opening. The mapping is explicit so the
 * two vocabularies (what we DECIDED vs what the API CALLS it) cannot drift.
 */
export function lessonInitModeFor(entry: LessonEntryMode): 'restart' | 'review' | 'resume' | 'next' {
  switch (entry) {
    case 'introduction': return 'next'
    case 'resume':       return 'resume'
    case 'review':       return 'review'
    case 'restart':      return 'restart'
  }
}

export interface LessonEntryContext {
  lesson: Pick<CurriculumLesson, 'order' | 'topicSlug'>
  progress: CurriculumProgress
  topicProgressMap: Record<string, TopicProgressEntry>
  /** True only when the learner explicitly asked to restart this lesson. */
  explicitRestart?: boolean
}

/**
 * Decide how to enter a lesson.
 *
 * THE RULE THE BUG BROKE: an introduction is the DEFAULT. Resume has to be
 * earned by evidence that this specific lesson was genuinely started —
 * TopicProgress IN_PROGRESS or REVISION for the lesson's own topic. Subject-level
 * chat history is explicitly NOT evidence: it is what the old check used, and
 * it is true for every returning learner regardless of which lesson they open.
 *
 * Ordering matters: an explicit restart outranks everything (the learner asked);
 * completion outranks in-progress (a completed lesson is reviewed, not resumed);
 * and anything unrecognised falls through to 'introduction', because showing an
 * introduction to someone who did not need one is a much smaller failure than
 * dropping a learner into the middle of a lesson they have never seen.
 */
export function decideLessonEntryMode(ctx: LessonEntryContext): LessonEntryMode {
  const { lesson, progress, topicProgressMap, explicitRestart } = ctx

  if (explicitRestart) return 'restart'

  const status = lesson.topicSlug ? topicProgressMap[lesson.topicSlug]?.status : undefined
  const isCompleted =
    status === 'COMPLETED' || status === 'MASTERED' ||
    progress.completedLessons.includes(lesson.order)

  if (isCompleted) return 'review'

  // Genuine, lesson-scoped saved progress — the ONLY thing that earns a resume.
  const startedThisLesson = status === 'IN_PROGRESS' || status === 'REVISION'
  if (startedThisLesson && lesson.order === progress.currentLesson) return 'resume'

  return 'introduction'
}

/** The outcome of finishing a lesson: what to record, and where to go next. */
export interface LessonAdvancePlan {
  /** The lesson to record as completed. */
  completedOrder: number
  /** Whether this counts as mastery (false for an explicit skip). */
  mastered: boolean
  /** The next lesson, or null when the curriculum is finished. */
  next: CurriculumLesson | null
  /** How the next lesson should be opened. Always 'introduction' for a lesson
   *  the learner has never started — which is the whole point of advancing. */
  nextEntryMode: LessonEntryMode | null
  /** True when the learner has reached the end of the curriculum. */
  isFinalLesson: boolean
}

/**
 * Build the plan for advancing past a completed lesson.
 *
 * `progressAfterCompletion` must be the progress returned by the completion
 * PATCH, not the pre-completion snapshot: findNextLesson keys off
 * `currentLesson`, so using stale progress would re-open the lesson that was
 * just finished — the precise off-by-one that makes an "advance" look like a
 * no-op.
 */
export function planLessonAdvance(
  completedOrder: number,
  lessons: CurriculumLesson[],
  progressAfterCompletion: CurriculumProgress,
  topicProgressMap: Record<string, TopicProgressEntry>,
  opts?: { mastered?: boolean },
): LessonAdvancePlan {
  const mastered = opts?.mastered ?? true

  // Prefer the lesson after the one just completed. Falling back to
  // currentLesson+1 covers curricula where progress advanced further (e.g. a
  // placement floor) without assuming the two agree.
  const next =
    lessons.find((l) => l.order === completedOrder + 1) ??
    lessons.find((l) => l.order === progressAfterCompletion.currentLesson + 1) ??
    null

  return {
    completedOrder,
    mastered,
    next,
    nextEntryMode: next
      ? decideLessonEntryMode({ lesson: next, progress: progressAfterCompletion, topicProgressMap })
      : null,
    isFinalLesson: next === null,
  }
}

/**
 * Should entering this lesson replace the on-screen conversation?
 *
 * True whenever the learner is moving to a DIFFERENT lesson than the one the
 * chat is currently showing. This is the check whose absence left a completed
 * lesson's transcript on screen after progress had already moved on.
 */
export function shouldResetConversation(
  fromLessonOrder: number | null | undefined,
  toLessonOrder: number,
): boolean {
  return fromLessonOrder == null || fromLessonOrder !== toLessonOrder
}
