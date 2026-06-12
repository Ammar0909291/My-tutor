import { chapterDisplayTitle } from '@/lib/school/schoolRouting'
import { getSchoolSubjectProgress, getChapterProgressDetails } from '@/lib/school/schoolProgress'

/**
 * Personalized study plan (Sprint BP) — a simple ordered list of at most
 * 4 steps for the student's active chapter, derived from existing progress.
 * No calendar, no scheduling, no roadmap.
 */

export interface StudyPlanStep {
  slot: 'Today' | 'Next' | 'Then' | 'After'
  label: string
  href: string
}

const SLOTS: StudyPlanStep['slot'][] = ['Today', 'Next', 'Then', 'After']

export async function getStudyPlan(
  userId: string,
  board: string,
  grade: number,
  subjectSlug: string,
): Promise<StudyPlanStep[]> {
  const progress = await getSchoolSubjectProgress(userId, board, grade, subjectSlug)
  if (!progress) return []

  const current = progress.position.current
  const next = progress.position.next
  const details = await getChapterProgressDetails(
    userId, subjectSlug, current, progress.completedOrders.has(current.order),
  )

  const base = `/school/${subjectSlug}/chapter/${encodeURIComponent(current.id)}`
  const currentTitle = chapterDisplayTitle(current.title)
  const steps: Omit<StudyPlanStep, 'slot'>[] = []

  if (details.questionsAttempted === 0 && !details.completed) {
    steps.push({ label: `Continue ${currentTitle}`, href: base })
  }
  if (details.practiceStatus !== 'mastered') {
    steps.push({ label: `Practice ${currentTitle}`, href: `${base}/practice` })
  }
  if (!details.assessmentPassed) {
    steps.push({ label: 'Take Assessment', href: `${base}/assessment` })
  }
  if (next) {
    steps.push({ label: `Start ${chapterDisplayTitle(next.title)}`, href: `/school/${subjectSlug}/chapter/${encodeURIComponent(next.id)}` })
  }

  return steps.slice(0, 4).map((s, i) => ({ slot: SLOTS[i], ...s }))
}
