import { prisma } from '@/lib/db/prisma'

export interface StreakResult {
  currentStreak: number
  longestStreak: number
  totalActiveDays: number
  isNewDay: boolean
}

/**
 * Updates StudyStreak for a user based on today's activity.
 * Uses StudyStreak model as the authoritative source (not Profile.streakDays).
 */
export async function updateStudyStreak(userId: string): Promise<StreakResult> {
  const today = new Date()
  today.setUTCHours(0, 0, 0, 0)
  const todayStr = today.toISOString().slice(0, 10)

  const existing = await prisma.studyStreak.findUnique({ where: { userId } })

  if (existing) {
    const lastStr = existing.lastActiveDate
      ? new Date(existing.lastActiveDate).toISOString().slice(0, 10)
      : null

    // Already recorded today
    if (lastStr === todayStr) {
      return {
        currentStreak: existing.currentStreak,
        longestStreak: existing.longestStreak,
        totalActiveDays: existing.totalActiveDays,
        isNewDay: false,
      }
    }

    const yesterday = new Date(today)
    yesterday.setUTCDate(yesterday.getUTCDate() - 1)
    const yesterdayStr = yesterday.toISOString().slice(0, 10)

    const newStreak = lastStr === yesterdayStr ? existing.currentStreak + 1 : 1
    const newLongest = Math.max(existing.longestStreak, newStreak)
    const newTotal = existing.totalActiveDays + 1

    await prisma.studyStreak.update({
      where: { userId },
      data: {
        currentStreak: newStreak,
        longestStreak: newLongest,
        totalActiveDays: newTotal,
        lastActiveDate: today,
      },
    })

    return { currentStreak: newStreak, longestStreak: newLongest, totalActiveDays: newTotal, isNewDay: true }
  }

  // First ever streak record
  await prisma.studyStreak.create({
    data: {
      userId,
      currentStreak: 1,
      longestStreak: 1,
      totalActiveDays: 1,
      lastActiveDate: today,
    },
  })

  return { currentStreak: 1, longestStreak: 1, totalActiveDays: 1, isNewDay: true }
}

export async function getStudyStreak(userId: string): Promise<StreakResult> {
  const streak = await prisma.studyStreak.findUnique({ where: { userId } })
  if (!streak) return { currentStreak: 0, longestStreak: 0, totalActiveDays: 0, isNewDay: false }
  return {
    currentStreak: streak.currentStreak,
    longestStreak: streak.longestStreak,
    totalActiveDays: streak.totalActiveDays,
    isNewDay: false,
  }
}
