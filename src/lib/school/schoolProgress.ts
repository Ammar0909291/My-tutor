import { prisma } from '@/lib/db/prisma'
import type { Chapter } from '@/lib/education'
import { getSchoolChapters, getChapterPosition, schoolSubjectCode, type ChapterPosition } from '@/lib/school/schoolRouting'

/**
 * School progress (Sprint BJ) — thin computation layer over the two existing
 * progress systems; no new tables.
 *
 * A chapter counts as COMPLETED when either:
 *   • it was explicitly marked complete (its `order` is in the namespaced
 *     StudentProgress.completedLessons), or
 *   • every kgNodeId of the chapter is COMPLETED/MASTERED in TopicProgress
 *     (written by the existing assessment flow during tutoring).
 *
 * Status model for the UI: completed ✓ / in-progress (= current chapter) /
 * not started. The current chapter is the first uncompleted one.
 */

const DONE_STATUSES = new Set(['COMPLETED', 'MASTERED'])

export interface SchoolSubjectProgressFull {
  slug: string
  chapters: Chapter[]
  completedOrders: Set<number>
  position: ChapterPosition
  completedCount: number
  totalCount: number
  percent: number
  lastStudiedAt: Date | null
  lastChapterTitle: string | null
}

/** Completed orders = explicit marks ∪ chapters whose KG nodes are all mastered. */
export function deriveCompletedOrders(
  chapters: Chapter[],
  explicitOrders: number[],
  masteredNodeIds: Set<string>,
): Set<number> {
  const completed = new Set(explicitOrders)
  for (const ch of chapters) {
    if (completed.has(ch.order)) continue
    if (ch.kgNodeIds.length > 0 && ch.kgNodeIds.every((id) => masteredNodeIds.has(id))) {
      completed.add(ch.order)
    }
  }
  return completed
}

export async function getSchoolSubjectProgress(
  userId: string,
  board: string,
  grade: number,
  slug: string,
): Promise<SchoolSubjectProgressFull | null> {
  const chapters = getSchoolChapters(board, slug, grade)
  if (chapters.length === 0) return null

  const [sp, topicRows] = await Promise.all([
    prisma.studentProgress.findUnique({
      where: { userId_subjectCode: { userId, subjectCode: schoolSubjectCode(board, slug, grade) } },
      select: { completedLessons: true, lastStudiedAt: true, lastLessonTitle: true },
    }).catch(() => null),
    prisma.topicProgress.findMany({
      where: { userId, subjectSlug: slug, status: { in: ['COMPLETED', 'MASTERED'] } },
      select: { topicSlug: true, status: true },
    }).catch(() => [] as { topicSlug: string; status: string }[]),
  ])

  const masteredNodeIds = new Set(topicRows.filter((r) => DONE_STATUSES.has(r.status)).map((r) => r.topicSlug))
  const completedOrders = deriveCompletedOrders(chapters, sp?.completedLessons ?? [], masteredNodeIds)
  const position = getChapterPosition(chapters, [...completedOrders])!

  return {
    slug,
    chapters,
    completedOrders,
    position,
    completedCount: position.completedCount,
    totalCount: position.totalCount,
    percent: position.percent,
    lastStudiedAt: sp?.lastStudiedAt ?? null,
    lastChapterTitle: sp?.lastLessonTitle ?? null,
  }
}

export async function getSchoolProgressForSubjects(
  userId: string,
  board: string,
  grade: number,
  slugs: string[],
): Promise<Map<string, SchoolSubjectProgressFull>> {
  const results = await Promise.all(slugs.map((slug) => getSchoolSubjectProgress(userId, board, grade, slug)))
  const map = new Map<string, SchoolSubjectProgressFull>()
  results.forEach((r, i) => { if (r) map.set(slugs[i], r) })
  return map
}
