import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'

// Real cross-session "minutes studied today", summed from StudySession rows
// written on session end (see /api/sessions/end). Backs the Learn window's
// "Today's Goal" ring — previously a client-only proxy of the current
// session's elapsed time, reset to 0 on every page load.
export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  try {
    const startOfDay = new Date()
    startOfDay.setHours(0, 0, 0, 0)

    const result = await prisma.studySession.aggregate({
      where: { userId: session.user.id, date: { gte: startOfDay } },
      _sum: { minutes: true },
    })

    return NextResponse.json({ success: true, minutesToday: result._sum.minutes ?? 0 })
  } catch (err) {
    console.error('[GET /api/study-time/today]', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
