import { prisma } from '@/lib/db/prisma'

export interface StreakResult {
  currentStreak: number
  longestStreak: number
  totalActiveDays: number
  isNewDay: boolean
}

// HIGH-7: All day boundaries use IST (Asia/Kolkata, UTC+5:30, no DST).
// Without this, a user studying at 23:45 IST (18:15 UTC) and 00:15 IST next day
// (18:45 UTC) would land on the same UTC date and lose their streak.
const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000

function istDateStr(date: Date): string {
  return new Date(date.getTime() + IST_OFFSET_MS).toISOString().slice(0, 10)
}

function istPrevDay(istDay: string): string {
  const d = new Date(istDay + 'T00:00:00Z')
  d.setUTCDate(d.getUTCDate() - 1)
  return d.toISOString().slice(0, 10)
}

/**
 * Updates StudyStreak for a user based on today's activity.
 * Uses StudyStreak model as the authoritative source (not Profile.streakDays).
 */
export async function updateStudyStreak(userId: string): Promise<StreakResult> {
  const todayStr = istDateStr(new Date())

  const existing = await prisma.studyStreak.findUnique({ where: { userId } })

  if (existing) {
    const lastStr = existing.lastActiveDate ? istDateStr(new Date(existing.lastActiveDate)) : null

    // Already recorded today (IST)
    if (lastStr === todayStr) {
      return {
        currentStreak: existing.currentStreak,
        longestStreak: existing.longestStreak,
        totalActiveDays: existing.totalActiveDays,
        isNewDay: false,
      }
    }

    const yesterdayStr = istPrevDay(todayStr)

    const newStreak = lastStr === yesterdayStr ? existing.currentStreak + 1 : 1
    const newLongest = Math.max(existing.longestStreak, newStreak)
    const newTotal = existing.totalActiveDays + 1

    await prisma.studyStreak.update({
      where: { userId },
      data: {
        currentStreak: newStreak,
        longestStreak: newLongest,
        totalActiveDays: newTotal,
        lastActiveDate: new Date(),
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
      lastActiveDate: new Date(),
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
