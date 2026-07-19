/**
 * Pure lesson-navigation derivations for the Tutor Max chat panel's
 * Previous/Current/Next Lesson navigation. Shared by the Curriculum
 * Roadmap tree and the Lesson Navigation Panel in LessonScreen.tsx so the
 * "is this lesson locked/completed/current" condition is computed in
 * exactly one place — no duplicated logic, no new lesson state. Every
 * input here (CurriculumLesson[], CurriculumProgress, per-topic
 * TopicProgress, availableTopicSlugs) is data LessonScreen.tsx already
 * fetches from the existing /api/curriculum and /api/topic-progress
 * endpoints.
 */

export interface CurriculumLesson {
  id: string
  subjectCode: string
  unit: number
  unitTitle: string
  lesson: number
  lessonTitle: string
  lessonGoal: string
  order: number
  topicSlug?: string
}

export interface CurriculumProgress {
  currentLesson: number
  completedLessons: number[]
  isCompleted?: boolean
  completedAt?: string | null
  completionPercent?: number
}

export interface TopicProgressEntry {
  status: string
  masteryPct: number
  revisionCount?: number
  lastRevisionAt?: string | null
}

export interface LessonLockContext {
  progress: CurriculumProgress
  topicProgressMap: Record<string, TopicProgressEntry>
  availableTopicSlugs: string[]
}

export interface LessonLockState {
  isCompleted: boolean
  isCurrent: boolean
  isPrevious: boolean
  isMastered: boolean
  isRevision: boolean
  isSkipped: boolean
  /** Not completed/mastered/revision/skipped/current, KG-bound, and not yet
   *  unlocked by prerequisites (per /api/topic-progress's availableNodes). */
  isLocked: boolean
}

/** Same condition the Curriculum Roadmap tree has always used per-row —
 * extracted verbatim so the tree and the nav panel can never disagree. */
export function computeLessonLockState(lesson: CurriculumLesson, ctx: LessonLockContext): LessonLockState {
  const { progress, topicProgressMap, availableTopicSlugs } = ctx
  const isCompleted = progress.completedLessons.includes(lesson.order)
  const isCurrent = lesson.order === progress.currentLesson
  const isPrevious = lesson.order < progress.currentLesson
  const topicData = lesson.topicSlug ? topicProgressMap[lesson.topicSlug] : undefined
  const isKnownAvailable = !lesson.topicSlug || availableTopicSlugs.includes(lesson.topicSlug)
  const isMastered = topicData?.status === 'MASTERED'
  const isRevision = topicData?.status === 'REVISION'
  const isSkipped = topicData?.status === 'SKIPPED'
  // isPrevious excluded here deliberately: the numeric lesson counter
  // (progress.currentLesson) can advance past a topic via the "skip"/
  // soft-advance path (see canAdvanceToNextLesson) without ever writing a
  // COMPLETED/MASTERED/REVISION TopicProgress row for it, so availableNodes
  // (which is derived solely from those rows, see /api/topic-progress)
  // can lag behind currentLesson. A lesson the student has already been
  // moved past can never legitimately still be locked, regardless of
  // whether its TopicProgress row exists yet.
  const isLocked = !isCompleted && !isCurrent && !isPrevious && !isMastered && !isRevision && !isSkipped &&
    lesson.topicSlug !== undefined && !isKnownAvailable &&
    topicData?.status !== 'IN_PROGRESS' && topicData?.status !== 'MASTERED'
  return { isCompleted, isCurrent, isPrevious, isMastered, isRevision, isSkipped, isLocked }
}

/**
 * The previous lesson for "Previous Lesson" navigation: the nearest
 * completed lesson before the current one. Falls back to the immediate
 * prior lesson by order (even if not recorded as completed — e.g. a
 * legacy row) so the button still has somewhere to go; returns null only
 * when there is genuinely no earlier lesson.
 */
export function findPreviousLesson(
  lessons: CurriculumLesson[],
  progress: CurriculumProgress,
): CurriculumLesson | null {
  const completedBefore = lessons
    .filter((l) => l.order < progress.currentLesson && progress.completedLessons.includes(l.order))
    .sort((a, b) => b.order - a.order)
  if (completedBefore.length > 0) return completedBefore[0]
  return lessons.find((l) => l.order === progress.currentLesson - 1) ?? null
}

/** The immediate next lesson by order, regardless of lock state — lock
 * state is a separate, explicit check (canAdvanceToNextLesson) so the
 * panel can still DISPLAY the next lesson's title while disabling
 * navigation into it. */
export function findNextLesson(
  lessons: CurriculumLesson[],
  progress: CurriculumProgress,
): CurriculumLesson | null {
  return lessons.find((l) => l.order === progress.currentLesson + 1) ?? null
}

/**
 * "Next Lesson" may be opened as soon as it exists and isn't gated by an
 * unmet prerequisite — never skip a locked lesson. This intentionally does
 * NOT require the current lesson to already be recorded as completed:
 * [LESSON_COMPLETE] doesn't fire on every turn, and a student should still
 * be able to move forward like turning a page. confirmLessonSwitch advances
 * StudentProgress server-side (mastered=false, "skip") when the student
 * confirms navigating forward without a recorded completion.
 */
export function canAdvanceToNextLesson(
  currentLesson: CurriculumLesson | null,
  nextLesson: CurriculumLesson | null,
  ctx: LessonLockContext,
): boolean {
  if (!currentLesson || !nextLesson) return false
  return !computeLessonLockState(nextLesson, ctx).isLocked
}
