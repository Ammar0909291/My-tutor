import type { AchievementCategory } from '@prisma/client'

export interface AchievementDef {
  slug: string
  category: AchievementCategory
  title: string
  description: string
  icon: string
  tier: number
}

export const SCHOOL_ACHIEVEMENTS: AchievementDef[] = [
  {
    slug: 'first_chapter_completed',
    category: 'LEARNING',
    title: 'First Chapter Completed',
    description: 'Completed your first chapter',
    icon: '📖',
    tier: 1,
  },
  {
    slug: 'first_assessment_passed',
    category: 'LEARNING',
    title: 'First Assessment Passed',
    description: 'Passed your first chapter assessment',
    icon: '✅',
    tier: 1,
  },
  {
    slug: 'five_chapters_completed',
    category: 'LEARNING',
    title: 'Chapter Explorer',
    description: 'Completed 5 chapters',
    icon: '🗺️',
    tier: 2,
  },
  {
    slug: 'ten_chapters_completed',
    category: 'LEARNING',
    title: 'Chapter Master',
    description: 'Completed 10 chapters',
    icon: '🏅',
    tier: 3,
  },
  {
    slug: 'assessment_master',
    category: 'LEARNING',
    title: 'Assessment Master',
    description: 'Scored 85%+ on 5 assessments',
    icon: '🎯',
    tier: 3,
  },
  {
    slug: 'practice_master',
    category: 'LEARNING',
    title: 'Practice Master',
    description: 'Completed 10 practice sessions with 80%+ score',
    icon: '💪',
    tier: 2,
  },
  {
    slug: 'seven_day_streak',
    category: 'STREAKS',
    title: 'Week Warrior',
    description: '7-day learning streak',
    icon: '🔥',
    tier: 2,
  },
  {
    slug: 'thirty_day_streak',
    category: 'STREAKS',
    title: 'Thirty Day Champion',
    description: '30-day learning streak',
    icon: '⚡',
    tier: 4,
  },
  {
    slug: 'consistency_champion',
    category: 'STREAKS',
    title: 'Consistency Champion',
    description: '20 total active learning days',
    icon: '🏆',
    tier: 3,
  },
  {
    slug: 'subject_explorer',
    category: 'SUBJECTS',
    title: 'Subject Explorer',
    description: 'Started learning all subjects',
    icon: '🌟',
    tier: 2,
  },
]
