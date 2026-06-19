export interface TopBarData {
  streak: number
  gems: number
  hearts: number
  maxHearts: number
  userRole: 'ADMIN' | 'USER'
}

export interface HeroBannerData {
  greeting: string
  subtitle: string
}

export interface DailyGoalData {
  percent: number
  title: string
  description: string
}

export interface ContinueLessonData {
  emoji: string
  label: string
  title: string
  xpReward: number
  estimatedMinutes: number
  href: string
}

export interface PracticeModeData {
  id: 'tutor' | 'quiz' | 'coach'
  emoji: string
  name: string
  description: string
  badge?: string
  href: string
}

export type SkillNodeStatus = 'done' | 'current' | 'locked'

export interface SkillNodeData {
  id: string
  status: SkillNodeStatus
  emoji?: string
  label?: string
}

export interface LeagueEntry {
  rank: number
  name: string
  xp: number
  avatarLetter: string
  avatarColor: string
  isMe?: boolean
  isTop?: boolean
}

export interface LeagueData {
  name: string
  emoji: string
  subtitle: string
  entries: LeagueEntry[]
}

export interface DailyQuestData {
  id: string
  icon: string
  iconBg: 'q1' | 'q2' | 'q3'
  name: string
  progress: number
  target: number
  unitLabel: string
  gradientFrom: string
  gradientTo: string
}

export interface SubjectCardData {
  slug: string
  name: string
  icon: string
  color: string
  bgColor: string
  currentLesson: number
  lastLessonTitle: string | null
  completionPercent: number
  href: string
}

export interface AchievementData {
  levelName: string
  levelColor: string
  xp: number
  xpToNext: number | null
  certCount: number
  streakDays: number
}

export interface ActivityItem {
  id: string
  subjectIcon: string
  subjectName: string
  title: string | null
  timeStr: string
  bucket: 'today' | 'yesterday' | 'earlier'
}

// School-mode-only content cards (Sprint B Issue 2): rendered as additional
// sections inside the same DashboardV2 shell, never as a separate dashboard.
export interface SchoolExtrasData {
  navigatorAction: import('@/lib/school/navigation/navigatorTypes').LearningNavigatorAction | null
  dailyPlan: {
    subjectSlug: string
    subjectLabel: string
    chapterId: string
    title: string
    estimatedMinutes: number
    reason: string
    priority: string
    href: string
  }[]
  academicJourney: {
    subjectSlug: string
    subjectLabel: string
    completedCount: number
    totalCount: number
    completionPercent: number
  }[] | null
  examReadiness: {
    subjectSlug: string
    subjectLabel: string
    readinessPercent: number
    level: string
  }[] | null
}

export interface DashboardV2Data {
  topBar: TopBarData
  hero: HeroBannerData
  dailyGoal: DailyGoalData
  continueLesson: ContinueLessonData
  practiceModes: PracticeModeData[]
  skillPath: SkillNodeData[]
  league: LeagueData
  dailyQuests: DailyQuestData[]
  subjects: SubjectCardData[]
  achievement: AchievementData
  recentActivity: ActivityItem[]
  /** Present only for SCHOOL_STUDENT profiles; null for Library Mode. */
  school?: SchoolExtrasData | null
}
