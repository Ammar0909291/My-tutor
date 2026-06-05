import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { currentWeekString } from '@/lib/xp'

export async function GET(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const mode = searchParams.get('mode') ?? 'week' // 'week' | 'alltime'

  try {
    if (mode === 'week') {
      const week = currentWeekString()

      const top = await prisma.weeklyXP.findMany({
        where: { week },
        orderBy: { xp: 'desc' },
        take: 10,
        include: { user: { select: { id: true, name: true, image: true } } },
      })

      const myEntry = await prisma.weeklyXP.findUnique({
        where: { userId_week: { userId: session.user.id, week } },
      })
      const myRank = myEntry
        ? (await prisma.weeklyXP.count({ where: { week, xp: { gt: myEntry.xp } } })) + 1
        : null

      return NextResponse.json({
        success: true,
        week,
        entries: top.map((e, i) => ({
          rank: i + 1,
          userId: e.user.id,
          name: (e.user.name ?? 'Student').split(' ')[0],
          image: e.user.image,
          xp: e.xp,
        })),
        myRank,
        myXP: myEntry?.xp ?? 0,
      })
    }

    // All-time
    const top = await prisma.user.findMany({
      orderBy: { xpPoints: 'desc' },
      take: 10,
      select: { id: true, name: true, image: true, xpPoints: true },
    })

    const me = await prisma.user.findUnique({ where: { id: session.user.id }, select: { xpPoints: true } })
    const myRank = me
      ? (await prisma.user.count({ where: { xpPoints: { gt: me.xpPoints } } })) + 1
      : null

    return NextResponse.json({
      success: true,
      entries: top.map((u, i) => ({
        rank: i + 1,
        userId: u.id,
        name: (u.name ?? 'Student').split(' ')[0],
        image: u.image,
        xp: u.xpPoints,
      })),
      myRank,
      myXP: me?.xpPoints ?? 0,
    })
  } catch (err) {
    console.error('[leaderboard]', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
