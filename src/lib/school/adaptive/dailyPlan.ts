import { getBoard } from '@/lib/education'
import { chapterDisplayTitle, SCHOOL_SUBJECT_META } from '@/lib/school/schoolRouting'
import { getSchoolProgressForSubjects } from '@/lib/school/schoolProgress'
import { getRecommendedRevisionChapter } from './weakTopics'
import { getDueRevisionsBySubjects } from './spacedRevision'
import { ASSESSMENT_PASS_THRESHOLD } from '@/lib/school/assessment/assessmentTypes'
import { prisma } from '@/lib/db/prisma'

// Sprint CB: imported lazily to avoid circular dependencies
type PrerequisiteChapterTarget = import('./prerequisiteRecovery').PrerequisiteChapterTarget

/**
 * Daily Study Plan (Sprint BQ/CA) — deterministic, no AI, no new tables.
 *
 * Priority:
 *   1. failed assessment   → retake_assessment
 *   2. spaced revision due → review_spaced      (Sprint CA)
 *   3. weak topic revision → practice_weak
 *   4. current chapter     → continue_chapter
 *   5. next chapter        → start_next_chapter
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
  priority: 'retake_assessment' | 'bridge_prerequisite' | 'review_spaced' | 'practice_weak' | 'continue_chapter' | 'start_next_chapter'
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
  if (priority === 'bridge_prerequisite') return 10
  if (priority === 'review_spaced') return 10
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

  const [progressMap, assessmentRows, revision, dueRevisions] = await Promise.all([
    getSchoolProgressForSubjects(userId, board, grade, slugs),
    prisma.practiceSession.findMany({
      where: { userId, subjectSlug: { in: slugs }, kind: 'assessment', completedAt: { not: null } },
      orderBy: { completedAt: 'desc' },
      take: 30,
      select: { subjectSlug: true, chapterId: true, score: true },
    }).catch(() => [] as { subjectSlug: string; chapterId: string | null; score: number | null }[]),
    getRecommendedRevisionChapter(userId, board, grade).catch(() => null),
    getDueRevisionsBySubjects(userId, slugs).catch(() => [] as Awaited<ReturnType<typeof getDueRevisionsBySubjects>>),
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

  // Priority 1b: bridge prerequisite (Sprint CB) — high-confidence gap only, max 1/day
  if (tasks.length < MAX_TASKS) {
    try {
      const { detectPrerequisiteGap, findPrerequisiteChapter } = await import('./prerequisiteRecovery')
      const { getNodesForChapter } = await import('@/lib/education')
      const { getSchoolChapters } = await import('@/lib/school/schoolRouting')
      // Check each subject's current chapter for a high-confidence gap
      const addedPrereqChapterIds = new Set<string>()
      for (const slug of slugs) {
        if (tasks.length >= MAX_TASKS) break
        const p = progressMap.get(slug)
        if (!p) continue
        const currentChapter = p.position.current
        const fullChapter = getSchoolChapters(board, slug, grade).find((c: { id: string }) => c.id === currentChapter.id)
        if (!fullChapter) continue
        const kgNodes = getNodesForChapter(fullChapter)
        const gap = await detectPrerequisiteGap(userId, slug, currentChapter.id, kgNodes)
        if (!gap || gap.confidence !== 'high') continue
        const prereqChapter = findPrerequisiteChapter(board, slug, grade, gap.missingPrereqId)
        if (!prereqChapter || addedPrereqChapterIds.has(prereqChapter.chapterId)) continue
        addedPrereqChapterIds.add(prereqChapter.chapterId)
        addTask({
          subjectSlug: slug,
          subjectLabel: label(slug),
          chapterId: prereqChapter.chapterId,
          title: prereqChapter.chapterTitle,
          estimatedMinutes: taskMinutes('bridge_prerequisite'),
          reason: `Foundation review: "${prereqChapter.missingPrereqTitle}" needed for current chapter`,
          priority: 'bridge_prerequisite',
          href: taskHref(slug, prereqChapter.chapterId, 'bridge_prerequisite'),
        })
      }
    } catch { /* non-fatal */ }
  }

  // Priority 2: spaced revision due (Sprint CA) — map overdue nodes → chapters
  if (dueRevisions.length > 0 && tasks.length < MAX_TASKS) {
    const { getSchoolChapters } = await import('@/lib/school/schoolRouting')
    // Group by subject, find the chapter containing the most overdue node
    const addedRevisionChapterIds = new Set<string>()
    for (const due of dueRevisions) {
      if (tasks.length >= MAX_TASKS) break
      const chapters = getSchoolChapters(board, due.subjectSlug, grade)
      const chapter = chapters.find((c) => c.kgNodeIds.includes(due.nodeId))
      if (!chapter) continue
      if (addedRevisionChapterIds.has(chapter.id)) continue
      addedRevisionChapterIds.add(chapter.id)
      addTask({
        subjectSlug: due.subjectSlug,
        subjectLabel: label(due.subjectSlug),
        chapterId: chapter.id,
        title: chapterDisplayTitle(chapter.title),
        estimatedMinutes: taskMinutes('review_spaced'),
        reason: `Review: ${due.title} — due for memory refresh`,
        priority: 'review_spaced',
        href: taskHref(due.subjectSlug, chapter.id, 'review_spaced'),
      })
    }
  }

  // Priority 3: weak topic revision
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

  // Priority 3 & 4: continue/start chapters sorted by exam readiness ascending
  // (lower readiness subjects get scheduled first — Sprint CE influence)
  let candidateSlugs = slugs.filter((slug) => {
    const p = progressMap.get(slug)
    return p && p.completedCount < p.totalCount
  })
  if (candidateSlugs.length > 1) {
    try {
      const { getExamReadinessForSubject } = await import('./examReadiness')
      const readinessScores = await Promise.all(
        candidateSlugs.map((slug) =>
          getExamReadinessForSubject(userId, board, grade, slug)
            .then((r) => ({ slug, score: r.readinessPercent }))
            .catch(() => ({ slug, score: 50 }))
        )
      )
      const scoreMap = new Map(readinessScores.map((r) => [r.slug, r.score]))
      candidateSlugs = candidateSlugs.sort((a, b) => (scoreMap.get(a) ?? 50) - (scoreMap.get(b) ?? 50))
    } catch { /* non-fatal — fall back to board order */ }

    // Sprint CR+CS+CT+CU: secondary sort by mastery weight with intelligence adjustments
    try {
      const { getMasteryProfile, masteryPriorityWeight } = await import('./masteryIntelligence')
      const { getChapterMisconceptions } = await import('./misconceptionEngine')
      const { evaluateConceptTransfer } = await import('./conceptTransfer')
      const { getConfidenceProfile } = await import('./confidenceCalibration')
      const masteryScores = await Promise.all(
        candidateSlugs.map(async (slug) => {
          const p = progressMap.get(slug)
          const chapter = p?.position.current
          if (!chapter) return { slug, weight: 2 }
          const [profile, misconceptions, transferProfile, confidenceProfile] = await Promise.all([
            getMasteryProfile(userId, board, grade, slug, chapter.id, chapter.kgNodeIds ?? []).catch(() => null),
            getChapterMisconceptions(userId, board, grade, slug, chapter.id, chapter.kgNodeIds ?? []).catch(() => []),
            evaluateConceptTransfer(userId, slug, chapter.id).catch(() => null),
            getConfidenceProfile(userId, slug, chapter.id).catch(() => null),
          ])
          let weight = profile ? masteryPriorityWeight(profile.masteryLevel) : 2
          // FALSE_MASTERY + HIGH misconception → AT_RISK priority (0)
          if (profile?.masteryLevel === 'FALSE_MASTERY' && misconceptions.some((m) => m.confidence === 'HIGH')) {
            weight = 0
          }
          // FALSE_MASTERY + OVERCONFIDENT → AT_RISK priority (0) — student thinks they know but doesn't
          if (profile?.masteryLevel === 'FALSE_MASTERY' && confidenceProfile?.calibration === 'OVERCONFIDENT') {
            weight = 0
          }
          // TRUE_MASTERY + TRANSFER_WEAK → DEVELOPING priority (2) — needs application practice
          if (profile?.masteryLevel === 'TRUE_MASTERY' && transferProfile?.level === 'TRANSFER_WEAK') {
            weight = Math.min(weight, 2)
          }
          // TRUE_MASTERY + UNDERCONFIDENT → keep at 3 (don't hold back well-performing student)
          // (no change needed — already weight 3)
          return { slug, weight }
        })
      )
      const weightMap = new Map(masteryScores.map((r) => [r.slug, r.weight]))
      candidateSlugs = candidateSlugs.sort((a, b) => (weightMap.get(a) ?? 2) - (weightMap.get(b) ?? 2))
    } catch { /* non-fatal — intelligence sort is additive */ }
  }
  for (const slug of candidateSlugs) {
    if (tasks.length >= MAX_TASKS) break
    const p = progressMap.get(slug)
    if (!p) continue
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
