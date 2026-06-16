import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'
import { DashboardV2 } from '@/components/dashboard/v2/DashboardV2'
import { getDashboardV2Data } from '@/lib/dashboard/getDashboardV2Data'
import { SchoolDashboard, type SchoolSubjectProgress } from '@/components/dashboard/SchoolDashboard'
import { getGradeSubjects } from '@/lib/school/schoolRouting'
import { getSchoolProgressForSubjects } from '@/lib/school/schoolProgress'
import { getRecommendedRevisionChapter } from '@/lib/school/adaptive/weakTopics'
import { getNextBestAction } from '@/lib/school/adaptive/nextBestAction'
import { getDailyStudyPlan } from '@/lib/school/adaptive/dailyPlan'
import { getStudyStreak } from '@/lib/school/achievements/streakEngine'
import { getRecentAchievement } from '@/lib/school/achievements/achievementEngine'
import { getExamReadinessForAllSubjects } from '@/lib/school/adaptive/examReadiness'
import { getLearningNavigatorAction } from '@/lib/school/navigation/learningNavigator'
import { getOverallRoadmap } from '@/lib/school/roadmap/learningRoadmap'

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/auth/login')
  const userId = session.user.id

  // Lightweight profile check to route school students to the full SchoolDashboard
  const profileCheck = await prisma.profile.findUnique({
    where: { userId },
    select: { userType: true, educationBoard: true, grade: true, displayName: true, streakDays: true },
  })

  if (!profileCheck) redirect('/onboarding')

  if (profileCheck.userType === 'SCHOOL_STUDENT' && profileCheck.educationBoard && profileCheck.grade) {
    const board = profileCheck.educationBoard
    const grade = profileCheck.grade
    const schoolSlugs = getGradeSubjects(board, grade)

    const [
      userRow,
      recentSessions,
      progressMap,
      revisionRaw,
      pendingAssessmentRow,
      nextAction,
      dailyPlan,
      streakData,
      recentAchievement,
      examReadinessSummary,
      navigatorAction,
      overallRoadmap,
    ] = await withRetry(() => Promise.all([
      prisma.user.findUnique({ where: { id: userId }, select: { name: true, xpPoints: true } }),
      prisma.learnSession.findMany({
        where: { userId },
        orderBy: { startedAt: 'desc' },
        take: 10,
        include: { subject: { select: { name: true, slug: true } } },
      }),
      getSchoolProgressForSubjects(userId, board, grade, schoolSlugs),
      getRecommendedRevisionChapter(userId, board, grade).catch(() => null),
      prisma.practiceSession.findFirst({
        where: { userId, subjectSlug: { in: schoolSlugs }, kind: 'assessment', completedAt: null },
        orderBy: { createdAt: 'desc' },
        select: { subjectSlug: true, chapterId: true },
      }).catch(() => null),
      getNextBestAction(userId, board, grade).catch(() => null),
      getDailyStudyPlan(userId, board, grade).catch(() => [] as Awaited<ReturnType<typeof getDailyStudyPlan>>),
      getStudyStreak(userId).catch(() => null),
      getRecentAchievement(userId).catch(() => null),
      getExamReadinessForAllSubjects(userId, board, grade).catch(() => null),
      getLearningNavigatorAction(userId, board, grade).catch(() => null),
      getOverallRoadmap(userId, board, grade).catch(() => null),
    ]))

    // Suppress revision card when the navigator already points at the same chapter
    const revision = revisionRaw && nextAction?.chapterId === revisionRaw.chapterId ? null : revisionRaw

    const subjects: SchoolSubjectProgress[] = schoolSlugs.map((slug) => {
      const row = progressMap.get(slug)
      return {
        slug,
        completionPercent: row?.percent ?? 0,
        completedCount: row?.completedCount ?? 0,
        totalCount: row?.totalCount ?? 0,
        lastChapterTitle: row?.lastChapterTitle ?? null,
        lastStudiedAt: row?.lastStudiedAt ?? null,
      }
    })

    const startOfToday = new Date(); startOfToday.setHours(0, 0, 0, 0)
    const studiedToday = recentSessions.some((s) => s.startedAt >= startOfToday)
    const pendingAssessment = pendingAssessmentRow?.chapterId
      ? { subjectSlug: pendingAssessmentRow.subjectSlug, chapterId: pendingAssessmentRow.chapterId }
      : null

    return (
      <SchoolDashboard
        displayName={profileCheck.displayName ?? userRow?.name ?? 'Student'}
        board={board}
        grade={grade}
        streakDays={profileCheck.streakDays ?? 0}
        xpPoints={userRow?.xpPoints ?? 0}
        studiedToday={studiedToday}
        subjects={subjects}
        revision={revision}
        nextAction={nextAction}
        pendingAssessment={pendingAssessment}
        dailyPlan={dailyPlan}
        momentum={streakData
          ? { currentStreak: streakData.currentStreak, longestStreak: streakData.longestStreak, recentAchievement }
          : null}
        examReadiness={examReadinessSummary?.subjects.map((s) => ({
          subjectSlug: s.subjectSlug,
          subjectLabel: s.subjectLabel,
          readinessPercent: s.readinessPercent,
          level: s.level,
        })) ?? null}
        navigatorAction={navigatorAction}
        academicJourney={overallRoadmap?.subjects.map((r) => ({
          subjectSlug: r.subjectSlug,
          subjectLabel: r.subjectLabel,
          completedCount: r.completedCount,
          totalCount: r.totalCount,
          completionPercent: r.completionPercent,
        })) ?? null}
      />
    )
  }

  // Library student — candy v2 dashboard with all educational intelligence restored
  const data = await getDashboardV2Data(userId)
  return <DashboardV2 data={data} />
}
