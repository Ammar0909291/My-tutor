import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { currentWeekString } from '@/lib/xp'

// Standard competition ranking ("1224"): ties share the same rank, and the
// next distinct value's rank is its 1-based position in the (already
// descending-sorted) list — matching the `count(strictly greater) + 1`
// formula used for myRank above.
function denseRank<T>(items: T[], xpOf: (item: T) => number, index: number): number {
  let firstOccurrence = index
  while (firstOccurrence > 0 && xpOf(items[firstOccurrence - 1]) === xpOf(items[index])) {
    firstOccurrence--
  }
  return firstOccurrence + 1
}

export async function GET(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const mode = searchParams.get('mode') ?? 'week' // 'week' | 'alltime'

  try {
    if (mode === 'week') {
      const week = currentWeekString()

      const top = await prisma.weeklyXP.findMany({
        where: { week, user: { isDeleted: false } },
        orderBy: { xp: 'desc' },
        take: 10,
        include: { user: { select: { id: true, name: true, image: true } } },
      })

      const myEntry = await prisma.weeklyXP.findFirst({
        where: { userId: session.user.id, week, user: { isDeleted: false } },
      })
      const myRank = myEntry
        ? (await prisma.weeklyXP.count({ where: { week, xp: { gt: myEntry.xp }, user: { isDeleted: false } } })) + 1
        : null

      return NextResponse.json({
        success: true,
        week,
        entries: top.map((e, i) => ({
          rank: denseRank(top, (x) => x.xp, i),
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
      where: { isDeleted: false },
      orderBy: { xpPoints: 'desc' },
      take: 10,
      select: { id: true, name: true, image: true, xpPoints: true },
    })

    const me = await prisma.user.findUnique({ where: { id: session.user.id }, select: { xpPoints: true, isDeleted: true } })
    const myRank = me && !me.isDeleted
      ? (await prisma.user.count({ where: { xpPoints: { gt: me.xpPoints }, isDeleted: false } })) + 1
      : null

    return NextResponse.json({
      success: true,
      entries: top.map((u, i) => ({
        rank: denseRank(top, (x) => x.xpPoints, i),
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
