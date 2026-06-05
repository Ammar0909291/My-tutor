import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'

const schema = z.object({
  subjectCode: z.string(),
  completedLesson: z.number().int().positive(),
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
    const { subjectCode, completedLesson } = schema.parse(body)

    const existing = await prisma.studentProgress.findUnique({
      where: { userId_subjectCode: { userId: session.user.id, subjectCode } },
    })

    const completedLessons = existing
      ? Array.from(new Set([...existing.completedLessons, completedLesson]))
      : [completedLesson]

    const progress = await prisma.studentProgress.upsert({
      where: { userId_subjectCode: { userId: session.user.id, subjectCode } },
      create: {
        userId: session.user.id,
        subjectCode,
        currentLesson: completedLesson + 1,
        completedLessons,
        lastStudiedAt: new Date(),
      },
      update: {
        currentLesson: Math.max((existing?.currentLesson ?? 1), completedLesson + 1),
        completedLessons,
        lastStudiedAt: new Date(),
        updatedAt: new Date(),
      },
    })

    // Award XP
    await prisma.user.update({
      where: { id: session.user.id },
      data: { xpPoints: { increment: 10 } },
    })

    return NextResponse.json({ success: true, progress })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: err.errors[0].message }, { status: 400 })
    }
    console.error('[PATCH /api/curriculum/progress]', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
