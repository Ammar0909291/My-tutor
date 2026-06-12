import { prisma } from '@/lib/db/prisma'
import { getBoard } from '@/lib/education'
import { chapterDisplayTitle, SCHOOL_SUBJECT_META } from '@/lib/school/schoolRouting'
import { getSchoolProgressForSubjects } from '@/lib/school/schoolProgress'
import { getRecommendedRevisionChapter } from './weakTopics'
import { ASSESSMENT_PASS_THRESHOLD } from '@/lib/school/assessment/assessmentTypes'

/**
 * Next Best Action engine (Sprint BP) — deterministic priority over existing
 * School Mode data; no AI, no new tables.
 *
 * Priority order:
 *   1. retake_assessment — latest assessment on a chapter failed (<70%) and
 *      the chapter is still incomplete
 *   2. practice_weak    — weak-topic engine has a revision chapter
 *   3. continue_chapter — a subject with study history has an unfinished
 *      current chapter
 *   4. start_next_chapter — everything current is done; move forward
 */

export type NextActionType =
  | 'retake_assessment'
  | 'practice_weak'
  | 'continue_chapter'
  | 'start_next_chapter'

export interface NextBestAction {
  type: NextActionType
  subjectSlug: string
  subjectLabel: string
  chapterId: string
  title: string
  reason: string | null
}

export async function getNextBestAction(
  userId: string,
  board: string,
  grade: number,
): Promise<NextBestAction | null> {
  const slugs = getBoard(board)?.subjects ?? []
  if (slugs.length === 0) return null

  const [progressMap, assessmentRows, revision] = await Promise.all([
    getSchoolProgressForSubjects(userId, board, grade, slugs),
    prisma.practiceSession.findMany({
      where: { userId, subjectSlug: { in: slugs }, kind: 'assessment', completedAt: { not: null } },
      orderBy: { completedAt: 'desc' },
      take: 30,
      select: { subjectSlug: true, chapterId: true, score: true },
    }).catch(() => [] as { subjectSlug: string; chapterId: string | null; score: number | null }[]),
    getRecommendedRevisionChapter(userId, board, grade).catch(() => null),
  ])

  const label = (slug: string) => SCHOOL_SUBJECT_META[slug]?.label ?? slug

  // 1. Failed assessment on a still-incomplete chapter (latest attempt per chapter)
  const latestByChapter = new Map<string, { subjectSlug: string; chapterId: string; score: number }>()
  for (const row of assessmentRows) {
    if (!row.chapterId || typeof row.score !== 'number') continue
    const key = `${row.subjectSlug}:${row.chapterId}`
    if (!latestByChapter.has(key)) latestByChapter.set(key, { subjectSlug: row.subjectSlug, chapterId: row.chapterId, score: row.score })
  }
  for (const attempt of latestByChapter.values()) {
    if (attempt.score >= ASSESSMENT_PASS_THRESHOLD) continue
    const progress = progressMap.get(attempt.subjectSlug)
    const chapter = progress?.chapters.find((c) => c.id === attempt.chapterId)
    if (!chapter || progress!.completedOrders.has(chapter.order)) continue
    return {
      type: 'retake_assessment',
      subjectSlug: attempt.subjectSlug,
      subjectLabel: label(attempt.subjectSlug),
      chapterId: chapter.id,
      title: chapterDisplayTitle(chapter.title),
      reason: `Your last assessment scored ${attempt.score}% — review and retake to complete the chapter.`,
    }
  }

  // 2. Weak-topic revision
  if (revision) {
    return {
      type: 'practice_weak',
      subjectSlug: revision.subjectSlug,
      subjectLabel: revision.subjectLabel,
      chapterId: revision.chapterId,
      title: revision.chapterTitle,
      reason: revision.weakTopicTitles.length > 0
        ? `You recently struggled with ${revision.weakTopicTitles.join(', ')}.`
        : null,
    }
  }

  // 3. Continue an unfinished current chapter (most recently studied subject first)
  const studied = [...progressMap.values()]
    .filter((p) => p.lastStudiedAt)
    .sort((a, b) => (b.lastStudiedAt!.getTime()) - (a.lastStudiedAt!.getTime()))
  for (const p of studied) {
    if (p.completedCount < p.totalCount) {
      return {
        type: 'continue_chapter',
        subjectSlug: p.slug,
        subjectLabel: label(p.slug),
        chapterId: p.position.current.id,
        title: chapterDisplayTitle(p.position.current.title),
        reason: null,
      }
    }
  }

  // 4. Start the next chapter — first subject (by board order) with work remaining
  for (const slug of slugs) {
    const p = progressMap.get(slug)
    if (p && p.completedCount < p.totalCount) {
      return {
        type: 'start_next_chapter',
        subjectSlug: slug,
        subjectLabel: label(slug),
        chapterId: p.position.current.id,
        title: chapterDisplayTitle(p.position.current.title),
        reason: null,
      }
    }
  }

  return null
}

/**
 * Per-chapter recommendation for the chapter workspace (Phase 4):
 * practice → assessment → next chapter, from existing progress details.
 */
export type ChapterNextStep = 'practice' | 'assessment' | 'next_chapter' | null

export function getChapterNextStep(details: {
  practiceStatus: 'not_started' | 'in_progress' | 'mastered'
  assessmentPassed: boolean
}, hasNextChapter: boolean): ChapterNextStep {
  if (details.assessmentPassed) return hasNextChapter ? 'next_chapter' : null
  if (details.practiceStatus === 'not_started') return 'practice'
  return 'assessment'
}

/** Resolve a NextBestAction to its destination URL. */
export function nextActionHref(action: NextBestAction): string {
  const base = `/school/${action.subjectSlug}/chapter/${encodeURIComponent(action.chapterId)}`
  switch (action.type) {
    case 'retake_assessment': return `${base}/assessment`
    case 'practice_weak': return base
    default: return base
  }
}

export const NEXT_ACTION_LABELS: Record<NextActionType, { heading: string; cta: string }> = {
  retake_assessment:  { heading: 'Retake', cta: 'Retake Assessment' },
  practice_weak:      { heading: 'Review', cta: 'Review Weak Areas' },
  continue_chapter:   { heading: 'Continue', cta: 'Continue' },
  start_next_chapter: { heading: 'Start', cta: 'Start Chapter' },
}
