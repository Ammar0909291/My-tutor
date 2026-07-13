import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { isFlashcardXpAllowed } from '@/lib/xp'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const userId = session.user.id
    const now = new Date()
    const startOfToday = new Date(now)
    startOfToday.setHours(0, 0, 0, 0)

    const [cards, total, due, studiedToday] = await Promise.all([
      prisma.flashcard.findMany({
        where: { userId, nextReview: { lte: now } },
        orderBy: { nextReview: 'asc' },
        take: 20,
      }),
      prisma.flashcard.count({ where: { userId } }),
      prisma.flashcard.count({ where: { userId, nextReview: { lte: now } } }),
      prisma.flashcard.count({ where: { userId, lastReviewedAt: { gte: startOfToday } } }),
    ])

    return NextResponse.json({ success: true, cards, stats: { total, due, studiedToday } })
  } catch (err) {
    console.error('[flashcards GET]', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

const RATING_INTERVAL_DAYS: Record<'hard' | 'medium' | 'easy', number> = {
  hard: 1,
  medium: 3,
  easy: 7,
}

const patchSchema = z.object({
  id: z.string(),
  rating: z.enum(['hard', 'medium', 'easy']),
})

export async function PATCH(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const { id, rating } = patchSchema.parse(body)

    const now = new Date()
    const nextReview = new Date(now)
    nextReview.setDate(nextReview.getDate() + RATING_INTERVAL_DAYS[rating])

    // MED-5: read current card to detect whether it's been reviewed today before
    // awarding XP. XP is only granted once per card per calendar day (UTC) to
    // prevent infinite farming by replaying the same card.
    const card = await prisma.flashcard.findUnique({
      where: { id, userId: session.user.id },
      select: { lastReviewedAt: true },
    })
    if (!card) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })

    const xpAllowed = isFlashcardXpAllowed(card.lastReviewedAt, now)

    await prisma.flashcard.update({
      where: { id, userId: session.user.id },
      data: {
        nextReview,
        reviewCount: { increment: 1 },
        easy: rating === 'easy',
        lastReviewedAt: now,
      },
    })

    // +2 XP only on the first review of this card today (MED-5 farm guard).
    if (xpAllowed) {
      await prisma.user.update({
        where: { id: session.user.id },
        data: { xpPoints: { increment: 2 } },
      })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: err.errors[0].message }, { status: 400 })
    }
    console.error('[flashcards PATCH]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
