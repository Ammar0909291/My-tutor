import { getBoard } from '@/lib/education'
import { getSchoolProgressForSubjects } from '@/lib/school/schoolProgress'
import { chapterDisplayTitle, SCHOOL_SUBJECT_META } from '@/lib/school/schoolRouting'

/**
 * Long-Term Learning Roadmaps (Sprint CK) — conceptual chapter progression
 * per subject. Deterministic, reuses existing StudentProgress + TopicProgress
 * (via getSchoolProgressForSubjects). No new tables, no calendar/scheduling.
 *
 * Completion ≠ readiness — this is purely "how far through the chapters" and is
 * kept separate from Exam Readiness (Sprint CE).
 */

export interface RoadmapChapter {
  id: string
  order: number
  title: string
  status: 'completed' | 'current' | 'upcoming'
}

export interface SubjectRoadmap {
  subjectSlug: string
  subjectLabel: string
  completedChapters: RoadmapChapter[]
  currentChapter: RoadmapChapter | null
  nextChapter: RoadmapChapter | null
  remainingChapters: RoadmapChapter[]
  /** Ordered list of every chapter with its status — for compact UI rendering. */
  allChapters: RoadmapChapter[]
  completedCount: number
  totalCount: number
  completionPercent: number
  /** Chapters left to finish the subject (current + remaining). */
  estimatedRemainingSteps: number
}

export interface OverallRoadmap {
  subjects: SubjectRoadmap[]
  overallCompletionPercent: number
}

function label(slug: string): string {
  return SCHOOL_SUBJECT_META[slug]?.label ?? slug
}

export async function getSubjectRoadmap(
  userId: string,
  board: string,
  grade: number,
  subjectSlug: string,
): Promise<SubjectRoadmap | null> {
  const map = await getSchoolProgressForSubjects(userId, board, grade, [subjectSlug]).catch(() => null)
  const progress = map?.get(subjectSlug)
  if (!progress) return null
  return buildSubjectRoadmap(subjectSlug, progress)
}

function buildSubjectRoadmap(
  subjectSlug: string,
  progress: Awaited<ReturnType<typeof getSchoolProgressForSubjects>> extends Map<string, infer V> ? V : never,
): SubjectRoadmap {
  const currentId = progress.position.current.id
  const completedOrders = progress.completedOrders

  const allChapters: RoadmapChapter[] = progress.chapters.map((ch) => {
    let status: RoadmapChapter['status']
    if (completedOrders.has(ch.order)) status = 'completed'
    else if (ch.id === currentId) status = 'current'
    else status = 'upcoming'
    return { id: ch.id, order: ch.order, title: chapterDisplayTitle(ch.title), status }
  })

  const completedChapters = allChapters.filter((c) => c.status === 'completed')
  const currentChapter = allChapters.find((c) => c.status === 'current') ?? null
  const remainingChapters = allChapters.filter((c) => c.status === 'upcoming')
  const nextChapter = progress.position.next
    ? allChapters.find((c) => c.id === progress.position.next!.id) ?? null
    : null

  return {
    subjectSlug,
    subjectLabel: label(subjectSlug),
    completedChapters,
    currentChapter,
    nextChapter,
    remainingChapters,
    allChapters,
    completedCount: progress.completedCount,
    totalCount: progress.totalCount,
    completionPercent: progress.percent,
    estimatedRemainingSteps: Math.max(0, progress.totalCount - progress.completedCount),
  }
}

export async function getOverallRoadmap(
  userId: string,
  board: string,
  grade: number,
): Promise<OverallRoadmap> {
  const slugs = getBoard(board)?.subjects ?? []
  if (slugs.length === 0) return { subjects: [], overallCompletionPercent: 0 }

  const map = await getSchoolProgressForSubjects(userId, board, grade, slugs).catch(() => new Map())
  const subjects: SubjectRoadmap[] = []
  for (const slug of slugs) {
    const progress = map.get(slug)
    if (progress) subjects.push(buildSubjectRoadmap(slug, progress))
  }

  // Overall = total completed chapters / total chapters across subjects
  const totalCompleted = subjects.reduce((s, r) => s + r.completedCount, 0)
  const totalChapters = subjects.reduce((s, r) => s + r.totalCount, 0)
  const overallCompletionPercent = totalChapters > 0 ? Math.round((totalCompleted / totalChapters) * 100) : 0

  return { subjects, overallCompletionPercent }
}

/** Short roadmap phrase for the orchestrator / tutor (e.g. "82% through Mathematics"). */
export function roadmapProgressPhrase(roadmap: SubjectRoadmap): string {
  return `${roadmap.completionPercent}% through ${roadmap.subjectLabel} (${roadmap.completedCount} of ${roadmap.totalCount} chapters)`
}
