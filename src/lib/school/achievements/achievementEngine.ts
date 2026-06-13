import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'
import { SCHOOL_ACHIEVEMENTS } from './achievementTypes'
import { ASSESSMENT_PASS_THRESHOLD } from '@/lib/school/assessment/assessmentTypes'
import { getSchoolProgressForSubjects } from '@/lib/school/schoolProgress'
import { getBoard } from '@/lib/education'

export interface UnlockedAchievement {
  slug: string
  title: string
  icon: string
}

/**
 * Upserts the 10 school achievement definitions into the Achievement table.
 * Safe to call on every deploy or on-demand.
 */
export async function ensureAchievements(): Promise<void> {
  for (const def of SCHOOL_ACHIEVEMENTS) {
    await prisma.achievement.upsert({
      where: { slug: def.slug },
      update: { title: def.title, description: def.description, icon: def.icon, tier: def.tier, category: def.category },
      create: def,
    })
  }
}

/**
 * Checks which achievements a user has earned but not yet unlocked.
 * Returns the newly unlocked achievements (does NOT re-unlock already unlocked ones).
 */
export async function checkAndUnlockAchievements(
  userId: string,
  board: string,
  grade: number,
): Promise<UnlockedAchievement[]> {
  const slugs = getBoard(board)?.subjects ?? []

  const [
    achievements,
    userAchievements,
    completedChaptersCount,
    assessmentRows,
    practiceRows,
    streak,
    progressMap,
  ] = await Promise.all([
    withRetry(() => prisma.achievement.findMany({ where: { slug: { in: SCHOOL_ACHIEVEMENTS.map((a) => a.slug) } } })),
    withRetry(() => prisma.userAchievement.findMany({ where: { userId }, select: { achievementId: true } })),
    // Count completed StudentProgress rows (completedAt not null)
    withRetry(() =>
      prisma.studentProgress.count({
        where: { userId, completedAt: { not: null } },
      })
    ).catch(() => 0),
    // Assessments
    withRetry(() =>
      prisma.practiceSession.findMany({
        where: { userId, kind: 'assessment', completedAt: { not: null } },
        select: { score: true },
      })
    ).catch(() => [] as { score: number | null }[]),
    // Practice sessions (non-assessment)
    withRetry(() =>
      prisma.practiceSession.findMany({
        where: { userId, kind: { not: 'assessment' }, completedAt: { not: null } },
        select: { score: true },
      })
    ).catch(() => [] as { score: number | null }[]),
    // Streak
    withRetry(() => prisma.studyStreak.findUnique({ where: { userId } })).catch(() => null),
    // Progress for subject_explorer
    slugs.length > 0
      ? getSchoolProgressForSubjects(userId, board, grade, slugs).catch(() => new Map())
      : Promise.resolve(new Map()),
  ])

  const unlockedIds = new Set(userAchievements.map((u) => u.achievementId))
  const achievementBySlug = new Map(achievements.map((a) => [a.slug, a]))

  const passedAssessments = assessmentRows.filter(
    (r) => typeof r.score === 'number' && r.score >= ASSESSMENT_PASS_THRESHOLD
  ).length

  const highScoreAssessments = assessmentRows.filter(
    (r) => typeof r.score === 'number' && r.score >= 85
  ).length

  const highScorePractice = practiceRows.filter(
    (r) => typeof r.score === 'number' && r.score >= 80
  ).length

  const currentStreak = streak?.currentStreak ?? 0
  const totalActiveDays = streak?.totalActiveDays ?? 0

  // subject_explorer: every subject has at least one progress row
  const startedSubjects = slugs.length > 0
    ? slugs.filter((s) => {
        const p = progressMap.get(s)
        return p && p.lastStudiedAt != null
      }).length
    : 0
  const allSubjectsStarted = slugs.length > 0 && startedSubjects >= slugs.length

  const earned: string[] = []

  const check = (slug: string, condition: boolean) => {
    const def = achievementBySlug.get(slug)
    if (!def) return
    if (unlockedIds.has(def.id)) return
    if (condition) earned.push(slug)
  }

  check('first_chapter_completed', completedChaptersCount >= 1)
  check('first_assessment_passed', passedAssessments >= 1)
  check('five_chapters_completed', completedChaptersCount >= 5)
  check('ten_chapters_completed', completedChaptersCount >= 10)
  check('assessment_master', highScoreAssessments >= 5)
  check('practice_master', highScorePractice >= 10)
  check('seven_day_streak', currentStreak >= 7)
  check('thirty_day_streak', currentStreak >= 30)
  check('consistency_champion', totalActiveDays >= 20)
  check('subject_explorer', allSubjectsStarted)

  if (earned.length === 0) return []

  // Unlock newly earned achievements
  const toUnlock = earned
    .map((slug) => achievementBySlug.get(slug))
    .filter(Boolean) as typeof achievements

  await Promise.all(
    toUnlock.map((a) =>
      prisma.userAchievement
        .create({ data: { userId, achievementId: a.id } })
        .catch(() => null) // ignore duplicate race conditions
    )
  )

  return toUnlock.map((a) => ({ slug: a.slug, title: a.title, icon: a.icon }))
}

/**
 * Returns the most recently unlocked achievement for a user (for dashboard display).
 */
export async function getRecentAchievement(userId: string): Promise<UnlockedAchievement | null> {
  const row = await withRetry(() =>
    prisma.userAchievement.findFirst({
      where: { userId },
      orderBy: { unlockedAt: 'desc' },
      include: { achievement: { select: { slug: true, title: true, icon: true } } },
    })
  ).catch(() => null)
  if (!row) return null
  return { slug: row.achievement.slug, title: row.achievement.title, icon: row.achievement.icon }
}
