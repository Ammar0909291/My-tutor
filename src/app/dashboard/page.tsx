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

export default async function DashboardPage({ searchParams }: { searchParams?: { mode?: string } }) {
  const session = await auth()
  if (!session?.user?.id) redirect('/auth/login')
  const userId = session.user.id

  // Lightweight profile check to route school students to the full SchoolDashboard
  const profileCheck = await prisma.profile.findUnique({
    where: { userId },
    select: { userType: true, educationBoard: true, grade: true, displayName: true, streakDays: true },
  })

  if (!profileCheck) redirect('/onboarding')

  // Cross-system navigation (Stabilization Sprint): a SCHOOL_STUDENT can opt
  // into viewing the Library/General experience via ?mode=library without
  // changing their stored profile, curriculum, or progress data. Default
  // landing behavior (no query param) is unchanged.
  const wantsLibrary = searchParams?.mode === 'library'
  // Dual Learning Modes: a GENERAL_LEARNER who has opted into School Mode
  // (via /modes, board/grade set without changing userType) keeps Library as
  // their default landing experience and enters School Mode explicitly with
  // ?mode=school. A SCHOOL_STUDENT keeps the existing reverse default.
  const wantsSchool = searchParams?.mode === 'school'
  const hasSchoolAccess = !!profileCheck.educationBoard && !!profileCheck.grade
  const isSchoolStudent = profileCheck.userType === 'SCHOOL_STUDENT'
  const showSchoolDashboard = hasSchoolAccess && (isSchoolStudent ? !wantsLibrary : wantsSchool)

  if (showSchoolDashboard && profileCheck.educationBoard && profileCheck.grade) {
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
    // Sprint Stabilization: count only genuinely COMPLETED sessions toward
    // today's goal — opening and immediately closing a lesson must not count.
    const studiedToday = recentSessions.some((s) => s.status === 'COMPLETED' && !!s.endedAt && s.endedAt >= startOfToday)
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
  const isSchoolAccountInLibraryMode = wantsLibrary && isSchoolStudent && hasSchoolAccess
  const isGeneralLearnerWithSchoolAccess = !isSchoolStudent && hasSchoolAccess
  return (
    <>
      {isSchoolAccountInLibraryMode && (
        <div style={{ textAlign: 'center', padding: '8px 0', fontSize: 12 }}>
          <a href="/dashboard" style={{ color: 'var(--candy-purple, #8B5CF6)', fontWeight: 700, textDecoration: 'none' }}>
            ← Back to School Mode
          </a>
        </div>
      )}
      {isGeneralLearnerWithSchoolAccess && (
        <div style={{ textAlign: 'center', padding: '8px 0', fontSize: 12 }}>
          <a href="/dashboard?mode=school" style={{ color: 'var(--candy-purple, #8B5CF6)', fontWeight: 700, textDecoration: 'none' }}>
            🎒 Switch to School Mode
          </a>
        </div>
      )}
      <DashboardV2 data={data} />
    </>
  )
}
