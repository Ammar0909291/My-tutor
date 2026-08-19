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
import { selectCurrentLesson } from '@/lib/teaching/progressionIntegrity'

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
  /** Persisted Active Lesson — the topicSlug the learner explicitly selected.
   *  `currentLesson` is a monotonic furthest-progress counter and cannot
   *  represent a move BACK to an earlier lesson, so the client must resolve
   *  through this first (via selectCurrentLesson) or it will display a
   *  different lesson than the server is teaching after a page reload.
   *  Optional: absent/NULL means "no explicit selection", the pre-existing
   *  behaviour. */
  activeLessonSlug?: string | null
  completedLessons: number[]
  isCompleted?: boolean
  completedAt?: string | null
  completionPercent?: number
  /** Subject Prelude (P1) — when the learner finished this subject's prelude.
   *  Optional and read ONLY by the prelude gate; no lesson-progression or
   *  mastery computation consults it. Absent for learners who predate it,
   *  which correctly reads as "not yet seen". */
  preludeViewedAt?: string | null
}

/**
 * Resolve the lesson the learner is on, client-side, using the SAME canonical
 * selector the server uses (`selectCurrentLesson`). This is an adapter, not a
 * second selector: it only supplies the `topicSlug: string` shape the selector
 * requires (CurriculumLesson's topicSlug is optional, and legacy c/cpp rows
 * genuinely have none) and then delegates. No precedence logic lives here.
 *
 * The client has no topic_progress rows in this shape, so the selector's
 * middle tier is empty and precedence reduces to
 * activeLessonSlug -> currentLesson -> first lesson — the server's answer in
 * every case where the two previously diverged.
 */
export function resolveActiveLesson(
  lessons: readonly CurriculumLesson[],
  progress: CurriculumProgress,
): CurriculumLesson | null {
  if (lessons.length === 0) return null
  const withSlug = lessons.filter(
    (l): l is CurriculumLesson & { topicSlug: string } => typeof l.topicSlug === 'string',
  )
  const selected = selectCurrentLesson(withSlug, progress.currentLesson, [], progress.activeLessonSlug)
  if (selected) return selected
  // Legacy curriculums with no topicSlug anywhere: unchanged prior behaviour.
  return lessons.find((l) => l.order === progress.currentLesson) ?? lessons[0] ?? null
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
 * NEXT AND PREVIOUS ARE RELATIVE TO THE LESSON ON SCREEN.
 *
 * ── THE DEFECT (measured in production, 2026-08-19) ─────────────────────────
 * Both functions anchored on `progress.currentLesson`. That field is a
 * COMPLETION counter — it advances when a lesson is recorded complete or
 * skipped. The lesson actually OPEN is `resolveActiveLesson()`, which honours
 * `progress.activeLessonSlug`. A learner may open any unlocked lesson, so the
 * two diverge as soon as someone reads ahead — which is the ordinary case, not
 * an edge case.
 *
 * Read from the real account against production chemistry (186 lessons):
 *
 *   progress.currentLesson   1
 *   progress.activeLessonSlug 'chem.found.pure-substances'
 *   resolveActiveLesson()    order 3, "Pure Substances and Mixtures"
 *
 *   findNextLesson()   -> order 2  "States of Matter"   ← BEHIND the open lesson
 *   findPreviousLesson() -> null                        ← button rendered disabled
 *
 * So "Next" walked the learner BACKWARDS, and "Previous" did nothing at all
 * because a null result renders the control `disabled`. Anchored on the open
 * lesson the same payload gives next = 4 and previous = 2.
 *
 * ── THE FIX ─────────────────────────────────────────────────────────────────
 * The anchor is resolved HERE, from `resolveActiveLesson`, rather than being
 * passed in by each caller. Three call sites read these functions and all three
 * want the same thing; an optional parameter would have let any of them keep
 * the old behaviour by omission, which is exactly how the two ideas of "current"
 * drifted apart. `resolveActiveLesson` already falls back to
 * `progress.currentLesson` when there is no active slug, so behaviour is
 * unchanged for a learner sitting on their recorded lesson.
 *
 * This is NOT a mobile-only defect — the logic is shared — but the mobile
 * control row is where it was reported, because there the two buttons sit side
 * by side and a backwards jump is unmistakable.
 */
function anchorOrder(
  lessons: readonly CurriculumLesson[],
  progress: CurriculumProgress,
): number {
  return resolveActiveLesson(lessons, progress)?.order ?? progress.currentLesson
}

/**
 * The previous lesson for "Previous Lesson" navigation: the nearest
 * completed lesson before the one on screen. Falls back to the immediate
 * prior lesson by order (even if not recorded as completed — e.g. a
 * legacy row) so the button still has somewhere to go; returns null only
 * when there is genuinely no earlier lesson.
 */
export function findPreviousLesson(
  lessons: CurriculumLesson[],
  progress: CurriculumProgress,
): CurriculumLesson | null {
  const anchor = anchorOrder(lessons, progress)
  const completedBefore = lessons
    .filter((l) => l.order < anchor && progress.completedLessons.includes(l.order))
    .sort((a, b) => b.order - a.order)
  if (completedBefore.length > 0) return completedBefore[0]
  return lessons.find((l) => l.order === anchor - 1) ?? null
}

/** The immediate next lesson by order after the one on screen, regardless of
 * lock state — lock state is a separate, explicit check
 * (canAdvanceToNextLesson) so the panel can still DISPLAY the next lesson's
 * title while disabling navigation into it. */
export function findNextLesson(
  lessons: CurriculumLesson[],
  progress: CurriculumProgress,
): CurriculumLesson | null {
  return lessons.find((l) => l.order === anchorOrder(lessons, progress) + 1) ?? null
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
