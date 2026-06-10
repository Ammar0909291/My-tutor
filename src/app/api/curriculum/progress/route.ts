import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { awardXP } from '@/lib/xp'

const schema = z.object({
  subjectCode: z.string(),
  completedLesson: z.number().int().positive(),
  totalLessons: z.number().int().positive().optional(),
})

export async function GET(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const subjectCode = searchParams.get('subject')
  if (!subjectCode) return NextResponse.json({ success: false, error: 'subject param required' }, { status: 400 })

  try {
    const progress = await prisma.studentProgress.findUnique({
      where: { userId_subjectCode: { userId: session.user.id, subjectCode } },
    })
    return NextResponse.json({ success: true, progress: progress ?? { currentLesson: 1, completedLessons: [] } })
  } catch (err) {
    console.error('[GET /api/curriculum/progress]', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const { subjectCode, completedLesson, totalLessons } = schema.parse(body)

    const existing = await prisma.studentProgress.findUnique({
      where: { userId_subjectCode: { userId: session.user.id, subjectCode } },
    })

    const completedLessons = existing
      ? Array.from(new Set([...existing.completedLessons, completedLesson]))
      : [completedLesson]

    // Sprint N — derive subject completion fields when the client tells us
    // how many lessons the subject has in total.
    const completionPercent = totalLessons
      ? Math.min(100, Math.round((completedLessons.length / totalLessons) * 100))
      : (existing?.completionPercent ?? 0)
    const isCompleted = totalLessons ? completedLessons.length >= totalLessons : (existing?.isCompleted ?? false)
    const completedAt = isCompleted ? (existing?.completedAt ?? new Date()) : null

    const progress = await prisma.studentProgress.upsert({
      where: { userId_subjectCode: { userId: session.user.id, subjectCode } },
      create: {
        userId: session.user.id,
        subjectCode,
        currentLesson: completedLesson + 1,
        completedLessons,
        lastStudiedAt: new Date(),
        completionPercent,
        isCompleted,
        completedAt,
      },
      update: {
        currentLesson: Math.max((existing?.currentLesson ?? 1), completedLesson + 1),
        completedLessons,
        lastStudiedAt: new Date(),
        updatedAt: new Date(),
        completionPercent,
        isCompleted,
        completedAt,
      },
    })

    // Award XP (updates both all-time and weekly leaderboard)
    await awardXP(session.user.id, 10)

    return NextResponse.json({ success: true, progress })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: err.errors[0].message }, { status: 400 })
    }
    console.error('[PATCH /api/curriculum/progress]', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
