import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'

// Persists the Learn window's bookmark button — previously a client-only Set
// that reset on every page load/refresh.

export async function GET(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const subjectCode = searchParams.get('subject')
  if (!subjectCode) return NextResponse.json({ success: false, error: 'subject param required' }, { status: 400 })

  try {
    const rows = await prisma.lessonBookmark.findMany({
      where: { userId: session.user.id, subjectCode },
      select: { lessonOrder: true },
    })
    return NextResponse.json({ success: true, bookmarkedLessons: rows.map((r) => r.lessonOrder) })
  } catch (err) {
    console.error('[GET /api/curriculum/bookmark]', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

const toggleSchema = z.object({
  subjectCode: z.string(),
  lessonOrder: z.number().int().positive(),
})

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const { subjectCode, lessonOrder } = toggleSchema.parse(body)

    const existing = await prisma.lessonBookmark.findUnique({
      where: { userId_subjectCode_lessonOrder: { userId: session.user.id, subjectCode, lessonOrder } },
    })

    if (existing) {
      await prisma.lessonBookmark.delete({ where: { id: existing.id } })
      return NextResponse.json({ success: true, bookmarked: false })
    }

    await prisma.lessonBookmark.create({
      data: { userId: session.user.id, subjectCode, lessonOrder },
    })
    return NextResponse.json({ success: true, bookmarked: true })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: err.errors[0].message }, { status: 400 })
    }
    console.error('[POST /api/curriculum/bookmark]', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
