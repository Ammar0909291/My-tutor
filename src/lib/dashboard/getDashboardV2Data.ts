import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'
import { getStudyStreak } from '@/lib/school/achievements/streakEngine'
import { getDailyStudyPlan } from '@/lib/school/adaptive/dailyPlan'
import { getSchoolProgressForSubjects } from '@/lib/school/schoolProgress'
import { getSubjectRoadmap, type RoadmapChapter } from '@/lib/school/roadmap/learningRoadmap'
import { getGradeSubjects, chapterDisplayTitle, SCHOOL_SUBJECT_META } from '@/lib/school/schoolRouting'
import { findLibrarySubject } from '@/lib/curriculum/subjectCatalog'
import { getLeagueForXP, currentWeekString } from '@/lib/xp'
import { MOCK_DASHBOARD_DATA } from '@/components/dashboard/v2/mockData'
import type {
  DashboardV2Data,
  ContinueLessonData,
  PracticeModeData,
  SkillNodeData,
  SkillNodeStatus,
  LeagueEntry,
} from '@/components/dashboard/v2/types'

// No daily-plan equivalent exists for library subjects, and a school day's
// plan can occasionally be empty (everything complete) — fall back to the
// "3 lessons" goal shown in the approved mockup.
const DEFAULT_DAILY_GOAL_LESSONS = 3
const AVATAR_PALETTE = ['#FF5FA2', '#3B9EFF', '#8B5CF6', '#58CC02', '#FFC800', '#FF9600']
const LEADERBOARD_SIZE = 5

/** IST (Asia/Kolkata) calendar-day boundaries, expressed as UTC Date objects for Prisma filters. */
function getISTDayBoundsUTC(): { gte: Date; lt: Date } {
  const now = new Date()
  const istDate = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now)
  const gte = new Date(`${istDate}T00:00:00+05:30`)
  const lt = new Date(gte.getTime() + 24 * 60 * 60 * 1000)
  return { gte, lt }
}

function timeOfDayGreeting(name: string): string {
  const hour = parseInt(
    new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kolkata', hour: 'numeric', hourCycle: 'h23' }).format(new Date()),
    10,
  )
  if (hour < 5) return `Still up, ${name}? 🌙`
  if (hour < 12) return `Good morning, ${name}! ☀️`
  if (hour < 17) return `Good afternoon, ${name}! 🌤️`
  return `Good evening, ${name}! 🌙`
}

function heroSubtitle(streak: number): string {
  if (streak >= 2) return `You're on a ${streak}-day streak. Let's keep the fire going!`
  if (streak === 1) return "You're on a 1-day streak. Keep it up!"
  return "Let's start a streak today!"
}

function emptyContinueLesson(): ContinueLessonData {
  return {
    emoji: '🚀',
    label: 'Get started',
    title: 'Pick a subject to begin your journey',
    xpReward: 10,
    estimatedMinutes: 5,
    href: '/library',
  }
}

function buildPracticeModes(tutorHref: string, quizHref: string): PracticeModeData[] {
  return [
    { id: 'tutor', emoji: '👨‍🏫', name: 'Tutor', description: 'Live lesson with code', href: tutorHref },
    { id: 'quiz', emoji: '🎯', name: 'Quiz', description: 'Test your skills', badge: 'NEW', href: quizHref },
    { id: 'coach', emoji: '🧭', name: 'Coach', description: 'Your study plan', href: '/coach' },
  ]
}

/** Window the roadmap's chapter list to (up to) 5 nodes centered on the current chapter. */
function buildSchoolSkillPath(allChapters: RoadmapChapter[], activeEmoji: string): SkillNodeData[] {
  if (allChapters.length === 0) return []
  let idx = allChapters.findIndex((c) => c.status === 'current')
  if (idx === -1) idx = allChapters.length - 1
  const start = Math.max(0, idx - 2)
  const end = Math.min(allChapters.length, start + 5)
  return allChapters.slice(start, end).map((c) => ({
    id: c.id,
    status: c.status === 'completed' ? 'done' : c.status === 'current' ? 'current' : 'locked',
    emoji: c.status === 'current' ? activeEmoji : c.status === 'upcoming' ? '🔒' : undefined,
  }))
}

/** 5-node window of lesson numbers centered on the learner's current lesson. */
function buildLibrarySkillPath(
  sp: { currentLesson: number; completedLessons: number[] } | undefined,
  activeEmoji: string,
): SkillNodeData[] {
  const current = sp?.currentLesson ?? 1
  const completed = new Set(sp?.completedLessons ?? [])
  const start = Math.max(1, current - 2)
  const nodes: SkillNodeData[] = []
  for (let n = start; n < start + 5; n++) {
    let status: SkillNodeStatus
    if (n === current) status = 'current'
    else if (n < current || completed.has(n)) status = 'done'
    else status = 'locked'
    nodes.push({ id: `lesson-${n}`, status, emoji: status === 'current' ? activeEmoji : status === 'locked' ? '🔒' : undefined })
  }
  return nodes
}

export async function getDashboardV2Data(userId: string): Promise<DashboardV2Data> {
  const istBounds = getISTDayBoundsUTC()
  const week = currentWeekString()

  const [user, sessionsTodayCount, streak, myWeeklyXP, weeklyTop] = await withRetry(() => Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        xpPoints: true,
        profile: {
          select: {
            displayName: true,
            userType: true,
            educationBoard: true,
            grade: true,
            subjects: { include: { subject: true }, orderBy: { createdAt: 'asc' } },
          },
        },
      },
    }),
    prisma.learnSession.count({ where: { userId, startedAt: { gte: istBounds.gte, lt: istBounds.lt } } }),
    getStudyStreak(userId),
    prisma.weeklyXP.findUnique({ where: { userId_week: { userId, week } } }),
    prisma.weeklyXP.findMany({
      where: { week },
      orderBy: { xp: 'desc' },
      take: LEADERBOARD_SIZE,
      include: { user: { select: { id: true, name: true } } },
    }),
  ]))

  if (!user) redirect('/auth/login')
  if (!user.profile) redirect('/onboarding')

  const profile = user.profile
  const displayName = profile.displayName ?? user.name ?? 'Student'
  const isSchool = profile.userType === 'SCHOOL_STUDENT' && !!profile.educationBoard && !!profile.grade

  let continueLesson: ContinueLessonData
  let practiceModes: PracticeModeData[]
  let skillPath: SkillNodeData[]
  let dailyGoalTarget: number

  if (isSchool) {
    const board = profile.educationBoard!
    const grade = profile.grade!
    const schoolSlugs = getGradeSubjects(board, grade)

    if (schoolSlugs.length === 0) {
      continueLesson = emptyContinueLesson()
      practiceModes = buildPracticeModes('/learn', '/learn')
      skillPath = []
      dailyGoalTarget = DEFAULT_DAILY_GOAL_LESSONS
    } else {
      const [progressMap, dailyPlan] = await Promise.all([
        withRetry(() => getSchoolProgressForSubjects(userId, board, grade, schoolSlugs)),
        getDailyStudyPlan(userId, board, grade).catch(() => []),
      ])
      dailyGoalTarget = dailyPlan.length > 0 ? dailyPlan.length : DEFAULT_DAILY_GOAL_LESSONS

      // Active subject = most recently studied, falling back to the first grade subject.
      let activeSlug = schoolSlugs[0]
      let bestTime = -Infinity
      for (const slug of schoolSlugs) {
        const t = progressMap.get(slug)?.lastStudiedAt?.getTime() ?? -1
        if (t > bestTime) { bestTime = t; activeSlug = slug }
      }

      const meta = SCHOOL_SUBJECT_META[activeSlug]
      const activeProgress = progressMap.get(activeSlug)
      const chapter = activeProgress?.position.current

      if (chapter) {
        const href = `/learn?subject=${activeSlug}&chapter=${encodeURIComponent(chapter.id)}`
        continueLesson = {
          emoji: meta?.icon ?? '📘',
          label: `${meta?.label ?? activeSlug} · Chapter ${chapter.order}`,
          title: chapterDisplayTitle(chapter.title),
          xpReward: 10,
          estimatedMinutes: 15,
          href,
        }
        practiceModes = buildPracticeModes(href, `${href}&practice=1`)
      } else {
        continueLesson = emptyContinueLesson()
        practiceModes = buildPracticeModes('/learn', '/learn')
      }

      const roadmap = await getSubjectRoadmap(userId, board, grade, activeSlug).catch(() => null)
      skillPath = roadmap ? buildSchoolSkillPath(roadmap.allChapters, meta?.icon ?? '📘') : []
    }
  } else {
    const enrolledSubjects = profile.subjects ?? []
    const slugs = enrolledSubjects.map((ps) => ps.subject.slug)
    dailyGoalTarget = DEFAULT_DAILY_GOAL_LESSONS

    const studentProgressList = await withRetry(() => prisma.studentProgress.findMany({
      where: { userId, subjectCode: { in: slugs.length > 0 ? slugs : [''] } },
      select: { subjectCode: true, currentLesson: true, completedLessons: true, lastStudiedAt: true, lastLessonTitle: true },
    }))
    const spMap = new Map(studentProgressList.map((sp) => [sp.subjectCode, sp]))

    // Active subject = most recently studied, falling back to the first enrolled subject.
    const activePs = [...enrolledSubjects].sort((a, b) => {
      const ta = spMap.get(a.subject.slug)?.lastStudiedAt?.getTime() ?? 0
      const tb = spMap.get(b.subject.slug)?.lastStudiedAt?.getTime() ?? 0
      return tb - ta
    })[0] ?? null

    if (activePs) {
      const slug = activePs.subject.slug
      const sp = spMap.get(slug)
      const lib = findLibrarySubject(slug)
      const lessonNum = sp?.currentLesson ?? 1
      const href = `/learn?subject=${slug}`
      continueLesson = {
        emoji: lib?.icon ?? '📘',
        label: `${lib?.name ?? activePs.subject.name} · Lesson ${lessonNum}`,
        title: sp?.lastLessonTitle ?? `Lesson ${lessonNum}`,
        xpReward: 10,
        estimatedMinutes: 5,
        href,
      }
      practiceModes = buildPracticeModes(href, `${href}&practice=1`)
      skillPath = buildLibrarySkillPath(sp, lib?.icon ?? '📘')
    } else {
      continueLesson = emptyContinueLesson()
      practiceModes = buildPracticeModes('/learn', '/learn')
      skillPath = []
    }
  }

  // Daily Goal ring
  const sessionsToday = sessionsTodayCount
  const dailyGoalPercent = Math.min(100, Math.round((sessionsToday / dailyGoalTarget) * 100))
  const remaining = Math.max(0, dailyGoalTarget - sessionsToday)
  const dailyGoalDescription = remaining === 0
    ? 'Goal complete! Amazing work today! 🎉'
    : `${sessionsToday} of ${dailyGoalTarget} ${dailyGoalTarget === 1 ? 'lesson' : 'lessons'} done — ${remaining} more to hit your goal!`

  // League — replicates /api/leaderboard's week-mode query, fed into getLeagueForXP for the tier label.
  const myXP = myWeeklyXP?.xp ?? 0
  const tier = getLeagueForXP(myXP)
  const myRank = myWeeklyXP
    ? (await prisma.weeklyXP.count({ where: { week, xp: { gt: myWeeklyXP.xp } } })) + 1
    : null

  const entries: LeagueEntry[] = weeklyTop.map((e, i) => {
    const isMe = e.userId === userId
    const name = isMe ? 'You' : (e.user.name ?? 'Student').split(' ')[0]
    return {
      rank: i + 1,
      name,
      xp: e.xp,
      avatarLetter: name.charAt(0).toUpperCase(),
      avatarColor: AVATAR_PALETTE[i % AVATAR_PALETTE.length],
      isMe,
      isTop: i < 3,
    }
  })

  return {
    topBar: {
      streak: streak.currentStreak,
      gems: user.xpPoints ?? 0,
      hearts: 5,
      maxHearts: 5,
    },
    hero: {
      greeting: timeOfDayGreeting(displayName),
      subtitle: heroSubtitle(streak.currentStreak),
    },
    dailyGoal: {
      percent: dailyGoalPercent,
      title: 'Daily Goal 🎯',
      description: dailyGoalDescription,
    },
    continueLesson,
    practiceModes,
    skillPath,
    league: {
      name: tier.name,
      emoji: tier.emoji,
      subtitle: myRank ? `You're #${myRank} this week!` : 'Earn XP this week to join the leaderboard!',
      entries,
    },
    dailyQuests: MOCK_DASHBOARD_DATA.dailyQuests,
  }
}
