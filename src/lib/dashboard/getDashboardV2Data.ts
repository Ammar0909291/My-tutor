import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'
import { getStudyStreak } from '@/lib/school/achievements/streakEngine'
import { getDailyStudyPlan } from '@/lib/school/adaptive/dailyPlan'
import { getSchoolProgressForSubjects } from '@/lib/school/schoolProgress'
import { getSubjectRoadmap, getOverallRoadmap, type RoadmapChapter } from '@/lib/school/roadmap/learningRoadmap'
import { chapterDisplayTitle, SCHOOL_SUBJECT_META } from '@/lib/school/schoolRouting'
import { getUserNavSubjects } from '@/lib/subjects/getUserNavSubjects'
import { getExamReadinessForAllSubjects } from '@/lib/school/adaptive/examReadiness'
import { getLearningNavigatorAction } from '@/lib/school/navigation/learningNavigator'
import { findLibrarySubject } from '@/lib/curriculum/subjectCatalog'
import { isEduBrainEnabled } from '@/lib/curriculum/subjectRollout'
import { getLeagueForXP, currentWeekString } from '@/lib/xp'
import type {
  DashboardV2Data,
  ContinueLessonData,
  PracticeModeData,
  SkillNodeData,
  SkillNodeStatus,
  LeagueEntry,
  SubjectCardData,
  AchievementData,
  ActivityItem,
  DailyQuestData,
  SchoolExtrasData,
} from '@/components/dashboard/v2/types'

const DEFAULT_DAILY_GOAL_LESSONS = 3
const AVATAR_PALETTE = ['#FF5FA2', '#3B9EFF', '#8B5CF6', '#58CC02', '#FFC800', '#FF9600']
const LEADERBOARD_SIZE = 5

const SUBJECT_COLOR_MAP: Record<string, { color: string; bgColor: string }> = {
  c:           { color: 'var(--blue)',   bgColor: 'rgba(59,158,255,0.12)' },
  cpp:         { color: 'var(--blue)',   bgColor: 'rgba(59,158,255,0.12)' },
  python:      { color: 'var(--green)',  bgColor: 'rgba(88,204,2,0.12)' },
  english:     { color: 'var(--yellow)', bgColor: 'rgba(255,200,0,0.12)' },
  javascript:  { color: 'var(--yellow)', bgColor: 'rgba(255,200,0,0.12)' },
  typescript:  { color: 'var(--blue)',   bgColor: 'rgba(59,158,255,0.12)' },
  java:        { color: 'var(--orange)', bgColor: 'rgba(255,150,0,0.12)' },
  russian:     { color: 'var(--purple)', bgColor: 'rgba(139,92,246,0.12)' },
  mathematics: { color: 'var(--blue)',   bgColor: 'rgba(59,158,255,0.12)' },
  physics:     { color: 'var(--purple)', bgColor: 'rgba(139,92,246,0.12)' },
  chemistry:   { color: 'var(--green)',  bgColor: 'rgba(88,204,2,0.12)' },
}
const DEFAULT_SUBJECT_COLORS = { color: 'var(--pink)', bgColor: 'rgba(255,95,162,0.12)' }

export function getLevel(xp: number): { name: string; color: string; next: number | null } {
  if (xp >= 1001) return { name: 'Master',       color: 'var(--yellow)', next: null }
  if (xp >= 601)  return { name: 'Expert',       color: 'var(--blue)',   next: 1001 }
  if (xp >= 301)  return { name: 'Practitioner', color: 'var(--green)',  next: 601 }
  if (xp >= 101)  return { name: 'Student',      color: 'var(--purple)', next: 301 }
  return           { name: 'Novice',              color: 'var(--purple)',   next: 101 }
}

export function dayBucket(date: Date): 'today' | 'yesterday' | 'earlier' {
  const now = new Date()
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const startOfYesterday = new Date(startOfToday.getTime() - 86400000)
  if (date >= startOfToday) return 'today'
  if (date >= startOfYesterday) return 'yesterday'
  return 'earlier'
}

/** IST calendar-day boundaries as UTC Date objects for Prisma filters. */
export function getISTDayBoundsUTC(): { gte: Date; lt: Date } {
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

export function timeOfDayGreeting(name: string): string {
  const hour = parseInt(
    new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kolkata', hour: 'numeric', hourCycle: 'h23' }).format(new Date()),
    10,
  )
  if (hour < 5) return `Still up, ${name}? 🌙`
  if (hour < 12) return `Good morning, ${name}! ☀️`
  if (hour < 17) return `Good afternoon, ${name}! 🌤️`
  return `Good evening, ${name}! 🌙`
}

export function heroSubtitle(streak: number): string {
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

export function buildPracticeModes(tutorHref: string): PracticeModeData[] {
  return [
    { id: 'tutor', emoji: '👨‍🏫', name: 'Tutor', description: 'Live lesson with code', href: tutorHref },
    { id: 'quiz',  emoji: '🎯',   name: 'Quiz',  description: 'Test your skills', badge: 'NEW', href: '/quiz' },
    { id: 'coach', emoji: '🧭',   name: 'Coach', description: 'Your study plan', href: '/coach' },
  ]
}

export function buildSchoolSkillPath(allChapters: RoadmapChapter[], activeEmoji: string): SkillNodeData[] {
  if (allChapters.length === 0) return []
  let idx = allChapters.findIndex((c) => c.status === 'current')
  if (idx === -1) idx = allChapters.length - 1
  const start = Math.max(0, idx - 2)
  const end = Math.min(allChapters.length, start + 5)
  return allChapters.slice(start, end).map((c) => {
    const raw = c.title ?? ''
    const label = raw.length > 16 ? raw.slice(0, 15) + '…' : raw || `Ch. ${c.order}`
    return {
      id: c.id,
      status: c.status === 'completed' ? 'done' : c.status === 'current' ? 'current' : 'locked',
      emoji: c.status === 'current' ? activeEmoji : c.status === 'upcoming' ? '🔒' : undefined,
      label,
    }
  })
}

export function buildLibrarySkillPath(
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
    nodes.push({ id: `lesson-${n}`, status, emoji: status === 'current' ? activeEmoji : status === 'locked' ? '🔒' : undefined, label: `Lesson ${n}` })
  }
  return nodes
}

export async function getDashboardV2Data(userId: string, modeOverride?: 'library' | 'school'): Promise<DashboardV2Data> {
  const istBounds = getISTDayBoundsUTC()
  const week = currentWeekString()

  const [
    user,
    sessionsTodayCount,
    streak,
    myWeeklyXP,
    weeklyTop,
    recentSessions,
    subjectCertCount,
    roadmapCertCount,
    practiceCountToday,
    topicsMastered,
  ] = await withRetry(() => Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        xpPoints: true,
        role: true,
        profile: {
          select: {
            displayName: true,
            userType: true,
            educationBoard: true,
            grade: true,
            subjects: { where: { isActive: true }, include: { subject: true }, orderBy: { createdAt: 'asc' } },
          },
        },
      },
    }),
    // Sprint Stabilization: count actual lesson completions (TopicProgress),
    // not session-end events — a single chat session can complete multiple
    // lessons, and a session can only "end" (and thus count) once.
    prisma.topicProgress.count({ where: { userId, status: { in: ['COMPLETED', 'MASTERED'] }, completedAt: { gte: istBounds.gte, lt: istBounds.lt } } }),
    getStudyStreak(userId),
    prisma.weeklyXP.findUnique({ where: { userId_week: { userId, week } } }),
    prisma.weeklyXP.findMany({
      where: { week, user: { isDeleted: false } },
      orderBy: { xp: 'desc' },
      take: LEADERBOARD_SIZE,
      include: { user: { select: { id: true, name: true } } },
    }),
    prisma.learnSession.findMany({
      where: { userId },
      orderBy: { startedAt: 'desc' },
      take: 10,
      include: { subject: { select: { name: true, slug: true } } },
    }),
    prisma.subjectCertificate.count({ where: { userId } }).catch(() => 0),
    prisma.certificate.count({ where: { userId } }).catch(() => 0),
    prisma.practiceSession.count({ where: { userId, completedAt: { gte: istBounds.gte, lt: istBounds.lt } } }).catch(() => 0),
    prisma.topicProgress.count({ where: { userId, status: 'MASTERED' } }).catch(() => 0),
  ]))

  if (!user) redirect('/auth/login')
  if (!user.profile) redirect('/onboarding')

  const profile = user.profile
  const displayName = profile.displayName ?? user.name ?? 'Student'
  const xp = user.xpPoints ?? 0
  // Cross-system navigation: a learner with board/grade set can view either
  // experience without changing their stored profile or progress data —
  // modeOverride lets the caller (the ?mode= query param on /dashboard)
  // request the non-default view while keeping the same DashboardV2 shell.
  const hasSchoolAccess = !!profile.educationBoard && !!profile.grade
  // UI-visibility: School Mode is hidden from normal navigation, so the
  // default (no ?mode= override) landing experience is always Library Mode
  // regardless of userType. Direct navigation to the existing
  // /dashboard?mode=school URL still works unchanged for already-enrolled
  // school users — School Mode data/logic themselves are untouched.
  const isSchool = modeOverride === 'school' ? hasSchoolAccess : false
  const userRole = (user.role as 'ADMIN' | 'USER') ?? 'USER'

  let continueLesson: ContinueLessonData
  let practiceModes: PracticeModeData[]
  let skillPath: SkillNodeData[]
  let dailyGoalTarget: number
  let subjectCards: SubjectCardData[] = []
  let school: SchoolExtrasData | null = null

  if (isSchool) {
    const board = profile.educationBoard!
    const grade = profile.grade!
    const schoolSlugs = getUserNavSubjects(profile, true).map((s) => s.slug)

    if (schoolSlugs.length === 0) {
      continueLesson = emptyContinueLesson()
      practiceModes = buildPracticeModes('/learn')
      skillPath = []
      dailyGoalTarget = DEFAULT_DAILY_GOAL_LESSONS
    } else {
      const [progressMap, dailyPlan, navigatorAction, examReadinessSummary, overallRoadmap] = await Promise.all([
        withRetry(() => getSchoolProgressForSubjects(userId, board, grade, schoolSlugs)),
        getDailyStudyPlan(userId, board, grade).catch(() => []),
        getLearningNavigatorAction(userId, board, grade).catch(() => null),
        getExamReadinessForAllSubjects(userId, board, grade).catch(() => null),
        getOverallRoadmap(userId, board, grade).catch(() => null),
      ])
      dailyGoalTarget = dailyPlan.length > 0 ? dailyPlan.length : DEFAULT_DAILY_GOAL_LESSONS

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
        practiceModes = buildPracticeModes(href)
      } else {
        continueLesson = emptyContinueLesson()
        practiceModes = buildPracticeModes('/learn')
      }

      const roadmap = await getSubjectRoadmap(userId, board, grade, activeSlug).catch(() => null)
      skillPath = roadmap ? buildSchoolSkillPath(roadmap.allChapters, meta?.icon ?? '📘') : []

      // School subjects as dashboard content cards — same SubjectsGrid V2 component
      // the Library Mode shell already uses; only the data source differs.
      subjectCards = schoolSlugs.map((slug) => {
        const subjMeta = SCHOOL_SUBJECT_META[slug]
        const row = progressMap.get(slug)
        const colors = SUBJECT_COLOR_MAP[slug] ?? DEFAULT_SUBJECT_COLORS
        return {
          slug,
          name: subjMeta?.label ?? slug,
          icon: subjMeta?.icon ?? '📘',
          color: colors.color,
          bgColor: colors.bgColor,
          currentLesson: row?.position.current?.order ?? row?.totalCount ?? 1,
          lastLessonTitle: row?.lastChapterTitle ?? null,
          completionPercent: row?.percent ?? 0,
          href: `/school/${slug}`,
        }
      })

      school = {
        navigatorAction,
        dailyPlan,
        academicJourney: overallRoadmap?.subjects.map((r) => ({
          subjectSlug: r.subjectSlug,
          subjectLabel: r.subjectLabel,
          completedCount: r.completedCount,
          totalCount: r.totalCount,
          completionPercent: r.completionPercent,
        })) ?? null,
        examReadiness: examReadinessSummary?.subjects.map((s) => ({
          subjectSlug: s.subjectSlug,
          subjectLabel: s.subjectLabel,
          readinessPercent: s.readinessPercent,
          level: s.level,
        })) ?? null,
      }
    }
  } else {
    // UI-visibility filter (presentation layer only): only show subjects
    // still in the Educational Brain rollout — enrollment/DB rows for other
    // subjects are untouched and keep working if reached by direct URL.
    const enrolledSubjects = (profile.subjects ?? []).filter((ps) => isEduBrainEnabled(ps.subject.slug))
    const slugs = getUserNavSubjects(profile, false).map((s) => s.slug)
    dailyGoalTarget = DEFAULT_DAILY_GOAL_LESSONS

    const studentProgressList = await withRetry(() => prisma.studentProgress.findMany({
      where: { userId, subjectCode: { in: slugs.length > 0 ? slugs : [''] } },
      select: {
        subjectCode: true,
        currentLesson: true,
        completedLessons: true,
        lastStudiedAt: true,
        lastLessonTitle: true,
        completionPercent: true,
      },
    }))
    const spMap = new Map(studentProgressList.map((sp) => [sp.subjectCode, sp]))

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
      practiceModes = buildPracticeModes(href)
      skillPath = buildLibrarySkillPath(sp, lib?.icon ?? '📘')
    } else {
      continueLesson = emptyContinueLesson()
      practiceModes = buildPracticeModes('/learn')
      skillPath = []
    }

    subjectCards = enrolledSubjects.map((ps) => {
      const slug = ps.subject.slug
      const sp = spMap.get(slug)
      const lib = findLibrarySubject(slug)
      const colors = SUBJECT_COLOR_MAP[slug] ?? DEFAULT_SUBJECT_COLORS
      return {
        slug,
        name: lib?.name ?? ps.subject.name,
        icon: lib?.icon ?? '📘',
        color: colors.color,
        bgColor: colors.bgColor,
        currentLesson: sp?.currentLesson ?? 1,
        lastLessonTitle: sp?.lastLessonTitle ?? null,
        completionPercent: sp?.completionPercent ?? 0,
        href: `/learn?subject=${slug}`,
      }
    })
  }

  // Daily Goal ring
  const sessionsToday = sessionsTodayCount
  const dailyGoalPercent = Math.min(100, Math.round((sessionsToday / dailyGoalTarget) * 100))
  const remaining = Math.max(0, dailyGoalTarget - sessionsToday)
  const dailyGoalDescription = remaining === 0
    ? 'Goal complete! Amazing work today! 🎉'
    : `${sessionsToday} of ${dailyGoalTarget} ${dailyGoalTarget === 1 ? 'lesson' : 'lessons'} done — ${remaining} more to hit your goal!`

  // League
  const myXP = myWeeklyXP?.xp ?? 0
  const tier = getLeagueForXP(myXP)
  const myRank = myWeeklyXP
    ? (await prisma.weeklyXP.count({ where: { week, xp: { gt: myWeeklyXP.xp }, user: { isDeleted: false } } })) + 1
    : null

  const entries: LeagueEntry[] = weeklyTop.map((e, i) => {
    const isMe = e.userId === userId
    const name = isMe ? 'You' : (e.user.name ?? 'Student').split(' ')[0]
    // Standard competition ranking: ties share a rank, the next distinct
    // value's rank is its 1-based position in this descending-sorted list.
    let firstOccurrence = i
    while (firstOccurrence > 0 && weeklyTop[firstOccurrence - 1].xp === e.xp) firstOccurrence--
    return {
      rank: firstOccurrence + 1,
      name,
      xp: e.xp,
      avatarLetter: name.charAt(0).toUpperCase(),
      avatarColor: AVATAR_PALETTE[i % AVATAR_PALETTE.length],
      isMe,
      isTop: i < 3,
    }
  })

  // Achievement Center
  const level = getLevel(xp)
  const totalCerts = (subjectCertCount ?? 0) + (roadmapCertCount ?? 0)
  const achievement: AchievementData = {
    levelName: level.name,
    levelColor: level.color,
    xp,
    xpToNext: level.next,
    certCount: totalCerts,
    streakDays: streak.currentStreak,
  }

  // Recent Activity timeline
  const recentActivity: ActivityItem[] = recentSessions.map((s) => ({
    id: s.id,
    subjectIcon: findLibrarySubject(s.subject.slug)?.icon ?? '📘',
    subjectName: s.subject.name,
    title: (s as any).title ?? null,
    timeStr: s.startedAt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    bucket: dayBucket(s.startedAt),
  }))

  // Real Daily Quests from live data
  const dailyQuests: DailyQuestData[] = [
    {
      id: 'q-lessons',
      icon: '📚',
      iconBg: 'q1',
      name: 'Daily Lessons',
      progress: sessionsToday,
      target: dailyGoalTarget,
      unitLabel: 'lessons',
      gradientFrom: '#FFC800',
      gradientTo: '#FF9600',
    },
    {
      id: 'q-practice',
      icon: '🎯',
      iconBg: 'q2',
      name: 'Practice Sessions',
      progress: practiceCountToday,
      target: 3,
      unitLabel: 'sessions',
      gradientFrom: '#3B9EFF',
      gradientTo: '#1B7EEF',
    },
    {
      id: 'q-mastery',
      icon: '⭐',
      iconBg: 'q3',
      name: 'Topics Mastered',
      progress: Math.min(topicsMastered, 5),
      target: 5,
      unitLabel: 'topics',
      gradientFrom: '#FF5FA2',
      gradientTo: '#FF3F82',
    },
  ]

  return {
    topBar: {
      streak: streak.currentStreak,
      gems: xp,
      hearts: 5,
      maxHearts: 5,
      userRole,
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
    dailyQuests,
    subjects: subjectCards,
    achievement,
    recentActivity,
    school,
  }
}
