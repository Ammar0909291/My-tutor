import { getBoard } from '@/lib/education'
import { chapterDisplayTitle, SCHOOL_SUBJECT_META } from '@/lib/school/schoolRouting'
import { getSchoolProgressForSubjects } from '@/lib/school/schoolProgress'
import { getRecommendedRevisionChapter } from './weakTopics'
import { ASSESSMENT_PASS_THRESHOLD } from '@/lib/school/assessment/assessmentTypes'
import { prisma } from '@/lib/db/prisma'

/**
 * Daily Study Plan (Sprint BQ) — deterministic, no AI, no new tables.
 *
 * Priority:
 *   1. failed assessment  → retake_assessment
 *   2. weak topic revision → practice_weak
 *   3. current chapter     → continue_chapter
 *   4. next chapter        → start_next_chapter
 *
 * Max 3 tasks. Target total: 30 min (grade 5–6), 45 min (7–8), 60 min (9–12).
 */

export interface DailyTask {
  subjectSlug: string
  subjectLabel: string
  chapterId: string
  title: string
  estimatedMinutes: number
  reason: string
  priority: 'retake_assessment' | 'practice_weak' | 'continue_chapter' | 'start_next_chapter'
  href: string
}

const MAX_TASKS = 3

function targetMinutes(grade: number): number {
  if (grade <= 6) return 30
  if (grade <= 8) return 45
  return 60
}

function taskMinutes(priority: DailyTask['priority']): number {
  if (priority === 'retake_assessment') return 20
  if (priority === 'practice_weak') return 15
  return 15
}

function taskHref(subjectSlug: string, chapterId: string, priority: DailyTask['priority']): string {
  const base = `/school/${subjectSlug}/chapter/${encodeURIComponent(chapterId)}`
  return priority === 'retake_assessment' ? `${base}/assessment` : base
}

export async function getDailyStudyPlan(
  userId: string,
  board: string,
  grade: number,
): Promise<DailyTask[]> {
  const slugs = getBoard(board)?.subjects ?? []
  if (slugs.length === 0) return []

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
  const tasks: DailyTask[] = []
  const usedChapterIds = new Set<string>()
  const budget = targetMinutes(grade)

  function addTask(t: DailyTask): boolean {
    if (tasks.length >= MAX_TASKS) return false
    const spent = tasks.reduce((s, x) => s + x.estimatedMinutes, 0)
    if (spent + t.estimatedMinutes > budget + 10) return false
    if (usedChapterIds.has(t.chapterId)) return false
    tasks.push(t)
    usedChapterIds.add(t.chapterId)
    return true
  }

  // Priority 1: failed assessments (latest attempt per chapter)
  const latestByChapter = new Map<string, { subjectSlug: string; chapterId: string; score: number }>()
  for (const row of assessmentRows) {
    if (!row.chapterId || typeof row.score !== 'number') continue
    const key = `${row.subjectSlug}:${row.chapterId}`
    if (!latestByChapter.has(key)) {
      latestByChapter.set(key, { subjectSlug: row.subjectSlug, chapterId: row.chapterId, score: row.score })
    }
  }
  for (const attempt of latestByChapter.values()) {
    if (attempt.score >= ASSESSMENT_PASS_THRESHOLD) continue
    const progress = progressMap.get(attempt.subjectSlug)
    const chapter = progress?.chapters.find((c) => c.id === attempt.chapterId)
    if (!chapter || progress!.completedOrders.has(chapter.order)) continue
    addTask({
      subjectSlug: attempt.subjectSlug,
      subjectLabel: label(attempt.subjectSlug),
      chapterId: chapter.id,
      title: chapterDisplayTitle(chapter.title),
      estimatedMinutes: taskMinutes('retake_assessment'),
      reason: `Last score: ${attempt.score}% — retake to complete`,
      priority: 'retake_assessment',
      href: taskHref(attempt.subjectSlug, chapter.id, 'retake_assessment'),
    })
  }

  // Priority 2: weak topic revision
  if (revision && tasks.length < MAX_TASKS) {
    addTask({
      subjectSlug: revision.subjectSlug,
      subjectLabel: revision.subjectLabel,
      chapterId: revision.chapterId,
      title: revision.chapterTitle,
      estimatedMinutes: taskMinutes('practice_weak'),
      reason: revision.weakTopicTitles.length > 0
        ? `Weak: ${revision.weakTopicTitles.slice(0, 2).join(', ')}`
        : 'Revision recommended',
      priority: 'practice_weak',
      href: taskHref(revision.subjectSlug, revision.chapterId, 'practice_weak'),
    })
  }

  // Priority 3 & 4: continue/start chapters for each subject in board order
  for (const slug of slugs) {
    if (tasks.length >= MAX_TASKS) break
    const p = progressMap.get(slug)
    if (!p || p.completedCount >= p.totalCount) continue
    const chapter = p.position.current
    const priority = p.lastStudiedAt ? 'continue_chapter' : 'start_next_chapter'
    addTask({
      subjectSlug: slug,
      subjectLabel: label(slug),
      chapterId: chapter.id,
      title: chapterDisplayTitle(chapter.title),
      estimatedMinutes: taskMinutes(priority),
      reason: priority === 'continue_chapter' ? 'Continue where you left off' : 'Start this chapter',
      priority,
      href: taskHref(slug, chapter.id, priority),
    })
  }

  return tasks
}
