import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'
import { getStudyStreak } from '@/lib/school/achievements/streakEngine'
import { getUserNavSubjects } from '@/lib/subjects/getUserNavSubjects'
import { findLibrarySubject } from '@/lib/curriculum/subjectCatalog'
import { isEduBrainEnabled } from '@/lib/curriculum/subjectRollout'
import { getKnowledgeGraph } from '@/lib/curriculum/knowledgeGraph'
import { computeCurriculumEntryOrder } from '@/lib/curriculum/placement'
import { normalizeToCanonicalLevel } from '@/lib/curriculum/levels'
import { getLeagueForXP, currentWeekString } from '@/lib/xp'
import { t, type Lang } from '@/lib/i18n'
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

// Maps xp.ts's canonical English LeagueTier.name (its stable identifier) to
// the display translation key — mirrors AchievementCenter's LEVEL_NAME_KEY
// pattern: the source of truth stays a stable English enum-like value,
// localization happens only at render/response-shaping time.
const LEAGUE_NAME_KEY: Record<string, import('@/lib/i18n').TranslationKey> = {
  'Bronze League': 'dashx_league_bronze',
  'Silver League': 'dashx_league_silver',
  'Gold League': 'dashx_league_gold',
  'Sapphire League': 'dashx_league_sapphire',
  'Diamond League': 'dashx_league_diamond',
}

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

export function timeOfDayGreeting(name: string, lang: Lang = 'en'): string {
  const hour = parseInt(
    new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kolkata', hour: 'numeric', hourCycle: 'h23' }).format(new Date()),
    10,
  )
  const key = hour < 5 ? 'dashx_greeting_night' : hour < 12 ? 'dashx_greeting_morning' : hour < 17 ? 'dashx_greeting_afternoon' : 'dashx_greeting_evening'
  return t(lang, key).replace('{name}', name)
}

export function heroSubtitle(streak: number, lang: Lang = 'en'): string {
  if (streak >= 2) return t(lang, 'dashx_subtitle_streak_n').replace('{streak}', String(streak))
  if (streak === 1) return t(lang, 'dashx_subtitle_streak_1')
  return t(lang, 'dashx_subtitle_streak_0')
}

function emptyContinueLesson(lang: Lang = 'en'): ContinueLessonData {
  return {
    emoji: '🚀',
    label: t(lang, 'dashx_empty_continue_label'),
    title: t(lang, 'dashx_empty_continue_title'),
    xpReward: 10,
    estimatedMinutes: 5,
    href: '/library',
  }
}

export function buildPracticeModes(tutorHref: string, lang: Lang = 'en'): PracticeModeData[] {
  return [
    { id: 'tutor', emoji: '👨‍🏫', name: t(lang, 'dashx_mode_tutor_name'), description: t(lang, 'dashx_mode_tutor_desc'), href: tutorHref },
    { id: 'quiz',  emoji: '🎯',   name: t(lang, 'dashx_mode_quiz_name'),  description: t(lang, 'dashx_mode_quiz_desc'), badge: t(lang, 'dashx_mode_quiz_badge'), href: '/quiz' },
    { id: 'coach', emoji: '🧭',   name: t(lang, 'dashx_mode_coach_name'), description: t(lang, 'dashx_mode_coach_desc'), href: '/coach' },
  ]
}

export function buildLibrarySkillPath(
  sp: { currentLesson: number; completedLessons: number[] } | undefined,
  activeEmoji: string,
  lang: Lang = 'en',
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
    nodes.push({ id: `lesson-${n}`, status, emoji: status === 'current' ? activeEmoji : status === 'locked' ? '🔒' : undefined, label: t(lang, 'dashx_lesson_n').replace('{n}', String(n)) })
  }
  return nodes
}

export async function getDashboardV2Data(userId: string): Promise<DashboardV2Data> {
  const istBounds = getISTDayBoundsUTC()
  const week = currentWeekString()

  console.log('[Q1] batch start')
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
  ] = await (async () => {
    try {
      return await withRetry(() => Promise.all([
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
            currentLevel: true,
            educationBoard: true,
            grade: true,
            teachingLanguage: true,
            subjects: { where: { isActive: true }, include: { subject: true }, orderBy: { createdAt: 'asc' } },
          },
        },
      },
    }),
    // Sprint Stabilization: count actual lesson completions (TopicProgress),
    // not session-end events — a single chat session can complete multiple
    // lessons, and a session can only "end" (and thus count) once.
    prisma.topicProgress.count({ where: { userId, status: { in: ['COMPLETED', 'MASTERED'] }, completedAt: { gte: istBounds.gte, lt: istBounds.lt } } }).catch((err) => {
      if (err?.code !== 'P1001' && err?.code !== 'P1002' && err?.code !== 'P1008' && err?.code !== 'P1017') {
        console.error('[dashboard] topic_progress (today) unavailable:', err?.code, err?.message)
      }
      return 0
    }),
    // Analytics tables (study_streaks, weekly_xp) were added in a later
    // schema migration. Guard against production DBs where prisma db push
    // has not yet been run — P2021 (table does not exist) must not crash
    // the dashboard. Connection errors (P1001/P1008) still bubble up via
    // withRetry so transient outages aren't silently hidden.
    getStudyStreak(userId).catch((err) => {
      if (err?.code !== 'P1001' && err?.code !== 'P1002' && err?.code !== 'P1008' && err?.code !== 'P1017') {
        console.error('[dashboard] study_streaks unavailable — run prisma db push:', err?.message ?? err)
      }
      return { currentStreak: 0, longestStreak: 0, totalActiveDays: 0, isNewDay: false }
    }),
    prisma.weeklyXP.findUnique({ where: { userId_week: { userId, week } } }).catch((err) => {
      if (err?.code !== 'P1001' && err?.code !== 'P1002' && err?.code !== 'P1008' && err?.code !== 'P1017') {
        console.error('[dashboard] weekly_xp unavailable — run prisma db push:', err?.message ?? err)
      }
      return null
    }),
    prisma.weeklyXP.findMany({
      where: { week, user: { isDeleted: false } },
      orderBy: { xp: 'desc' },
      take: LEADERBOARD_SIZE,
      include: { user: { select: { id: true, name: true } } },
    }).catch((err) => {
      if (err?.code !== 'P1001' && err?.code !== 'P1002' && err?.code !== 'P1008' && err?.code !== 'P1017') {
        console.error('[dashboard] weekly_xp leaderboard unavailable — run prisma db push:', err?.message ?? err)
      }
      return []
    }),
    prisma.learnSession.findMany({
      where: { userId },
      orderBy: { startedAt: 'desc' },
      take: 10,
      include: { subject: { select: { name: true, slug: true } } },
    }).catch((err) => {
      if (err?.code !== 'P1001' && err?.code !== 'P1002' && err?.code !== 'P1008' && err?.code !== 'P1017') {
        console.error('[dashboard] learn_sessions unavailable — run prisma db push:', err?.message ?? err)
      }
      return []
    }),
    prisma.subjectCertificate.count({ where: { userId } }).catch(() => 0),
    prisma.certificate.count({ where: { userId } }).catch(() => 0),
    prisma.practiceSession.count({ where: { userId, completedAt: { gte: istBounds.gte, lt: istBounds.lt } } }).catch(() => 0),
      prisma.topicProgress.count({ where: { userId, status: 'MASTERED' } }).catch(() => 0),
      ]))
    } catch (err: any) {
      console.error('[FAILED Q1] batch', err?.code, err?.message, err?.meta)
      throw err
    }
  })()
  console.log('[Q1 OK] batch complete')

  if (!user) redirect('/auth/login')
  if (!user.profile) redirect('/onboarding')

  const profile = user.profile
  const displayName = profile.displayName ?? user.name ?? 'Student'
  const dashLang: Lang = (profile.teachingLanguage as Lang | null) ?? 'en'
  const xp = user.xpPoints ?? 0
  const userRole = (user.role as 'ADMIN' | 'USER') ?? 'USER'

  let continueLesson: ContinueLessonData
  let practiceModes: PracticeModeData[]
  let skillPath: SkillNodeData[]
  const dailyGoalTarget = DEFAULT_DAILY_GOAL_LESSONS
  let subjectCards: SubjectCardData[] = []

  // UI-visibility filter: only show subjects in the Educational Brain rollout.
  const enrolledSubjects = (profile.subjects ?? []).filter((ps) => isEduBrainEnabled(ps.subject.slug))
  const slugs = getUserNavSubjects(profile, false).map((s) => s.slug)

  // Q2 (studentProgress) and Q3 (rank, below) are mutually independent —
  // Q2 needs only Q1's `slugs`, Q3 needs only Q1's `myWeeklyXP` — but were
  // previously two sequential round-trips. Running them in parallel removes
  // one full DB round-trip of latency from the critical path, directly
  // reducing how often getDashboardV2Data's 18s withTimeout budget
  // (dashboard/page.tsx) gets exceeded under real production DB latency —
  // a timeout there throws and surfaces the app-wide error.tsx boundary
  // ("Something went wrong"), which is what this was found investigating.
  console.log('[Q2] studentProgress')
  let studentProgressList: { subjectCode: string; currentLesson: number; completedLessons: number[]; lastStudiedAt: Date | null; lastLessonTitle: string | null; completionPercent: number }[] = []
  const studentProgressPromise = withRetry(() => prisma.studentProgress.findMany({
    where: { userId, subjectCode: { in: slugs.length > 0 ? slugs : [''] } },
    select: {
      subjectCode: true,
      currentLesson: true,
      completedLessons: true,
      lastStudiedAt: true,
      lastLessonTitle: true,
      completionPercent: true,
    },
  })).then((rows) => { console.log('[Q2 OK] studentProgress', rows.length); return rows }).catch((err: any) => {
    console.error('[FAILED Q2] studentProgress', err?.code, err?.message, err?.meta)
    return []
  })
  console.log('[Q3] rank')
  const rankPromise = myWeeklyXP
    ? prisma.weeklyXP.count({ where: { week, xp: { gt: myWeeklyXP.xp }, user: { isDeleted: false } } }).then((n) => { console.log('[Q3 OK] rank', n + 1); return n + 1 }).catch((err) => { console.error('[FAILED Q3] rank', err?.code, err?.message); return null })
    : (console.log('[Q3 SKIP] no weeklyXP row'), Promise.resolve(null))
  const [studentProgressResolved, myRank] = await Promise.all([studentProgressPromise, rankPromise])
  studentProgressList = studentProgressResolved
  const spMap = new Map(studentProgressList.map((sp) => [sp.subjectCode, sp]))

  const curriculumLevel = normalizeToCanonicalLevel(profile.currentLevel)
  const defaultCurrentLesson = (slug: string): number => {
    const graph = getKnowledgeGraph(slug)
    return graph ? computeCurriculumEntryOrder(graph, curriculumLevel) : 1
  }

  const activePs = [...enrolledSubjects].sort((a, b) => {
    const ta = spMap.get(a.subject.slug)?.lastStudiedAt?.getTime() ?? 0
    const tb = spMap.get(b.subject.slug)?.lastStudiedAt?.getTime() ?? 0
    return tb - ta
  })[0] ?? null

  if (activePs) {
    const slug = activePs.subject.slug
    const sp = spMap.get(slug)
    const lib = findLibrarySubject(slug)
    const lessonNum = sp?.currentLesson ?? defaultCurrentLesson(slug)
    const href = `/learn?subject=${slug}`
    continueLesson = {
      emoji: lib?.icon ?? '📘',
      label: `${lib?.name ?? activePs.subject.name} · ${t(dashLang, 'dashx_lesson_n').replace('{n}', String(lessonNum))}`,
      title: sp?.lastLessonTitle ?? t(dashLang, 'dashx_lesson_n').replace('{n}', String(lessonNum)),
      xpReward: 10,
      estimatedMinutes: 5,
      href,
    }
    practiceModes = buildPracticeModes(href, dashLang)
    skillPath = buildLibrarySkillPath(sp ?? { currentLesson: lessonNum, completedLessons: [] }, lib?.icon ?? '📘', dashLang)
  } else {
    continueLesson = emptyContinueLesson(dashLang)
    practiceModes = buildPracticeModes('/learn', dashLang)
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
      currentLesson: sp?.currentLesson ?? defaultCurrentLesson(slug),
      lastLessonTitle: sp?.lastLessonTitle ?? null,
      completionPercent: sp?.completionPercent ?? 0,
      href: `/learn?subject=${slug}`,
    }
  })

  // Daily Goal ring
  const sessionsToday = sessionsTodayCount
  const dailyGoalPercent = Math.min(100, Math.round((sessionsToday / dailyGoalTarget) * 100))
  const remaining = Math.max(0, dailyGoalTarget - sessionsToday)
  const dailyGoalDescription = remaining === 0
    ? t(dashLang, 'dashx_daily_goal_complete')
    : t(dashLang, 'dashx_daily_goal_progress')
        .replace('{done}', String(sessionsToday))
        .replace('{target}', String(dailyGoalTarget))
        .replace('{remaining}', String(remaining))

  // League
  const myXP = myWeeklyXP?.xp ?? 0
  const tier = getLeagueForXP(myXP)

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
      name: t(dashLang, 'dashx_quest_lessons_name'),
      progress: sessionsToday,
      target: dailyGoalTarget,
      unitLabel: t(dashLang, 'dashx_quest_lessons_unit'),
      gradientFrom: '#FFC800',
      gradientTo: '#FF9600',
    },
    {
      id: 'q-practice',
      icon: '🎯',
      iconBg: 'q2',
      name: t(dashLang, 'dashx_quest_practice_name'),
      progress: practiceCountToday,
      target: 3,
      unitLabel: t(dashLang, 'dashx_quest_practice_unit'),
      gradientFrom: '#3B9EFF',
      gradientTo: '#1B7EEF',
    },
    {
      id: 'q-mastery',
      icon: '⭐',
      iconBg: 'q3',
      name: t(dashLang, 'dashx_quest_mastery_name'),
      progress: Math.min(topicsMastered, 5),
      target: 5,
      unitLabel: t(dashLang, 'dashx_quest_mastery_unit'),
      gradientFrom: '#FF5FA2',
      gradientTo: '#FF3F82',
    },
  ]

  console.log('[Q4] returning data')
  return {
    topBar: {
      streak: streak.currentStreak,
      gems: xp,
      hearts: 5,
      maxHearts: 5,
      userRole,
    },
    hero: {
      greeting: timeOfDayGreeting(displayName, dashLang),
      subtitle: heroSubtitle(streak.currentStreak, dashLang),
    },
    dailyGoal: {
      percent: dailyGoalPercent,
      title: t(dashLang, 'dashx_daily_goal_title'),
      description: dailyGoalDescription,
    },
    continueLesson,
    practiceModes,
    skillPath,
    league: {
      name: t(dashLang, LEAGUE_NAME_KEY[tier.name] ?? 'dashx_league_bronze'),
      emoji: tier.emoji,
      subtitle: myRank ? t(dashLang, 'dashx_leaderboard_rank').replace('{rank}', String(myRank)) : t(dashLang, 'dashx_leaderboard_join'),
      entries,
    },
    dailyQuests,
    subjects: subjectCards,
    achievement,
    recentActivity,
  }
}
