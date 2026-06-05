import { prisma } from '@/lib/db/prisma'

export function currentWeekString(): string {
  const now = new Date()
  const jan1 = new Date(now.getFullYear(), 0, 1)
  const week = Math.ceil(((now.getTime() - jan1.getTime()) / 86400000 + jan1.getDay() + 1) / 7)
  return `${now.getFullYear()}-W${String(week).padStart(2, '0')}`
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
