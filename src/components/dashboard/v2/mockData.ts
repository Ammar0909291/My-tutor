import { getLeagueForXP } from '@/lib/xp'
import type { DashboardV2Data } from './types'

/**
 * Phase 1 mock data — values match design/dashboard-approved.html exactly.
 * Phase 2 will replace this with a call to GET /api/dashboard.
 */
export const MOCK_DASHBOARD_DATA: DashboardV2Data = {
  topBar: {
    streak: 7,
    gems: 350,
    hearts: 5,
    maxHearts: 5,
  },
  hero: {
    greeting: 'Good evening, Alex! 🌙',
    subtitle: "You're on a 7-day streak. Let's keep the fire going!",
  },
  dailyGoal: {
    percent: 65,
    title: 'Daily Goal 🎯',
    description: '2 of 3 lessons done — one more to hit your goal!',
  },
  continueLesson: {
    emoji: '🐍',
    label: 'Python · Lesson 4',
    title: 'Functions & Scope',
    xpReward: 10,
    estimatedMinutes: 5,
    href: '#',
  },
  practiceModes: [
    { id: 'tutor', emoji: '👨‍🏫', name: 'Tutor', description: 'Live lesson with code', href: '#' },
    { id: 'quiz', emoji: '🎯', name: 'Quiz', description: 'Test your skills', badge: 'NEW', href: '#' },
    { id: 'coach', emoji: '🧭', name: 'Coach', description: 'Your study plan', href: '#' },
  ],
  skillPath: [
    { id: 'n1', status: 'done' },
    { id: 'n2', status: 'done' },
    { id: 'n3', status: 'current', emoji: '🐍' },
    { id: 'n4', status: 'locked', emoji: '🔒' },
    { id: 'n5', status: 'locked', emoji: '🔒' },
  ],
  league: {
    ...(() => {
      const tier = getLeagueForXP(350)
      return { name: tier.name, emoji: tier.emoji }
    })(),
    subtitle: "You're #3 this week!",
    entries: [
      { rank: 1, name: 'Priya', xp: 820, avatarLetter: 'P', avatarColor: '#FF5FA2', isTop: true },
      { rank: 2, name: 'Rahul', xp: 640, avatarLetter: 'R', avatarColor: '#3B9EFF', isTop: true },
      { rank: 3, name: 'You', xp: 350, avatarLetter: 'A', avatarColor: '#8B5CF6', isMe: true },
      { rank: 4, name: 'Maxim', xp: 290, avatarLetter: 'M', avatarColor: '#58CC02' },
    ],
  },
  dailyQuests: [
    { id: 'q1', icon: '⚡', iconBg: 'q1', name: 'Earn 30 XP', progress: 21, target: 30, unitLabel: 'XP', gradientFrom: '#FFC800', gradientTo: '#FF9600' },
    { id: 'q2', icon: '💬', iconBg: 'q2', name: 'Ask 5 questions', progress: 2, target: 5, unitLabel: 'questions', gradientFrom: '#3B9EFF', gradientTo: '#2B7FD9' },
    { id: 'q3', icon: '🎯', iconBg: 'q3', name: 'Complete a quiz', progress: 0, target: 1, unitLabel: 'quiz', gradientFrom: '#FF5FA2', gradientTo: '#FF4B4B' },
  ],
}
