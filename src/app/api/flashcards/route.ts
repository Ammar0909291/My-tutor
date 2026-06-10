import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const userId = session.user.id
    const cards = await prisma.flashcard.findMany({
      where: { userId, nextReview: { lte: new Date() } },
      orderBy: { nextReview: 'asc' },
      take: 20,
    })
    return NextResponse.json({ success: true, cards })
  } catch (err) {
    console.error('[flashcards GET]', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

const patchSchema = z.object({ id: z.string(), remembered: z.boolean() })

export async function PATCH(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const { id, remembered } = patchSchema.parse(body)

    const now = new Date()
    const nextReview = new Date(now)
    nextReview.setDate(nextReview.getDate() + (remembered ? 3 : 1))

    await prisma.flashcard.update({
      where: { id, userId: session.user.id },
      data: {
        nextReview,
        reviewCount: { increment: 1 },
        easy: remembered,
      },
    })

    // +2 XP per card reviewed
    await prisma.user.update({
      where: { id: session.user.id },
      data: { xpPoints: { increment: 2 } },
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[flashcards PATCH]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
