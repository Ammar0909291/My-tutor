/**
 * Phase 1 (presentational) prop shapes for the gamified dashboard, shaped to
 * match what the Phase 2 `/api/dashboard` aggregator will return — see
 * design/dashboard-approved.html for the visual source of truth.
 */

export interface TopBarData {
  streak: number
  gems: number
  hearts: number
  maxHearts: number
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

export interface DashboardV2Data {
  topBar: TopBarData
  hero: HeroBannerData
  dailyGoal: DailyGoalData
  continueLesson: ContinueLessonData
  practiceModes: PracticeModeData[]
  skillPath: SkillNodeData[]
  league: LeagueData
  dailyQuests: DailyQuestData[]
}
