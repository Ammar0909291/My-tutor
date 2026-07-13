import { prisma } from '@/lib/db/prisma'

export function currentWeekString(): string {
  const now = new Date()
  const jan1 = new Date(now.getFullYear(), 0, 1)
  const week = Math.ceil(((now.getTime() - jan1.getTime()) / 86400000 + jan1.getDay() + 1) / 7)
  return `${now.getFullYear()}-W${String(week).padStart(2, '0')}`
}

export interface LeagueTier {
  name: string
  emoji: string
  minXP: number
}

/**
 * League tiers derived purely from weekly XP thresholds — no new table.
 * Used by the dashboard "League" widget alongside /api/leaderboard.
 */
export const LEAGUE_TIERS: LeagueTier[] = [
  { name: 'Bronze League', emoji: '🥉', minXP: 0 },
  { name: 'Silver League', emoji: '🥈', minXP: 100 },
  { name: 'Gold League', emoji: '🏆', minXP: 300 },
  { name: 'Sapphire League', emoji: '💎', minXP: 700 },
  { name: 'Diamond League', emoji: '👑', minXP: 1500 },
]

export function getLeagueForXP(weeklyXP: number): LeagueTier {
  let tier = LEAGUE_TIERS[0]
  for (const t of LEAGUE_TIERS) {
    if (weeklyXP >= t.minXP) tier = t
  }
  return tier
}

/**
 * MED-5: a flashcard only earns XP once per calendar day (UTC), to prevent
 * farming by repeatedly reviewing the same card. Extracted verbatim from
 * src/app/api/flashcards/route.ts PATCH so it can be contract-tested
 * directly instead of via a hand-copied replica.
 */
export function isFlashcardXpAllowed(lastReviewedAt: Date | null, now: Date): boolean {
  const startOfTodayUtc = new Date(now)
  startOfTodayUtc.setUTCHours(0, 0, 0, 0)
  const alreadyReviewedToday = lastReviewedAt !== null && lastReviewedAt >= startOfTodayUtc
  return !alreadyReviewedToday
}

export async function awardXP(userId: string, amount: number): Promise<void> {
  const week = currentWeekString()
  await Promise.all([
    prisma.user.update({ where: { id: userId }, data: { xpPoints: { increment: amount } } }),
    prisma.weeklyXP.upsert({
      where: { userId_week: { userId, week } },
      create: { userId, week, xp: amount },
      update: { xp: { increment: amount } },
    }),
  ])
}
