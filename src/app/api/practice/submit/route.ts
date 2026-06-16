import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'
import { checkRateLimit, rateLimitResponse } from '@/lib/rateLimit'
import { generateCoachInsights } from '@/lib/analytics/coachInsights'

const schema = z.object({
  subjectSlug: z.string().min(1),
  topicSlug: z.string().min(1),
  questions: z.array(z.object({
    question: z.string(),
    correctIndex: z.number().optional(),
  })).max(100).default([]),
  correct: z.array(z.boolean()).min(1).max(100),
  idempotencyKey: z.string().max(128).optional(),
})

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = session.user.id

  const { allowed } = await checkRateLimit(`rl:practice-submit:${userId}`, 30, 60)
  if (!allowed) return rateLimitResponse()

  try {
    const body = await req.json()
    const { subjectSlug, topicSlug, questions, correct, idempotencyKey } = schema.parse(body)

    const total = correct.length
    const correctCount = correct.filter(Boolean).length
    const score = Math.round((correctCount / total) * 100)

    const storedQuestions = correct.map((isCorrect, i) => ({
      question: questions[i]?.question ?? null,
      correct: isCorrect,
    }))

    // HIGH-6: if idempotencyKey is supplied the DB unique constraint is the
    // atomic guard — two concurrent requests with the same key cannot both
    // succeed; the second one hits P2002 and we return 409, no side-effects.
    let practiceSession
    try {
      practiceSession = await withRetry(() => prisma.practiceSession.create({
        data: {
          userId,
          subjectSlug,
          topicSlug,
          questions: storedQuestions,
          completedAt: new Date(),
          score,
          ...(idempotencyKey ? { idempotencyKey } : {}),
        },
      }))
    } catch (e: unknown) {
      if ((e as { code?: string })?.code === 'P2002') {
        return NextResponse.json({ error: 'Already submitted' }, { status: 409 })
      }
      throw e
    }

    const mistakeIndexes = correct
      .map((isCorrect, i) => (isCorrect ? -1 : i))
      .filter((i) => i >= 0)

    if (mistakeIndexes.length > 0) {
      await withRetry(() => prisma.mistakeRecord.createMany({
        data: mistakeIndexes.map((i) => ({
          userId,
          subjectSlug,
          topicSlug,
          sessionId: practiceSession.id,
          category: topicSlug,
          questionId: `${practiceSession.id}-${i}`,
        })),
      }))
    }

    // MED-10: wrap mastery read-compute-write in a transaction to prevent two
    // concurrent submissions from both reading the old masteryPct and both
    // writing a stale (lower) value.
    const topicProgress = await withRetry(() => prisma.$transaction(async (tx) => {
      const key = { userId_subjectSlug_topicSlug: { userId, subjectSlug, topicSlug } }
      const existing = await tx.topicProgress.findUnique({ where: key })
      const masteryPct = existing ? Math.round((existing.masteryPct + score) / 2) : score
      let status = existing?.status ?? 'IN_PROGRESS'
      if (status === 'NOT_STARTED' || status === 'IN_PROGRESS') {
        status = masteryPct >= 80 ? 'MASTERED' : masteryPct >= 50 ? 'COMPLETED' : 'IN_PROGRESS'
      }
      return tx.topicProgress.upsert({
        where: key,
        create: { userId, subjectSlug, topicSlug, status, masteryPct, attempts: 1, lastScore: score },
        update: { status, masteryPct, attempts: { increment: 1 }, lastScore: score },
      })
    }))

    // Refresh Smart Coach insights from the freshly-written TopicProgress/
    // MistakeRecord/PracticeSession data. Best-effort — never fails the
    // practice submission.
    await generateCoachInsights(userId).catch((err) => console.error('[practice/submit] coach insights', err))

    // Drop the cached learner-intelligence profile so the tutor's next chat
    // turn reflects this practice session immediately (Sprint AP cache).
    try {
      const { invalidateLearnerProfileCache } = await import('@/lib/ai/learnerProfile')
      invalidateLearnerProfileCache(userId)
    } catch { /* cache invalidation is best-effort */ }

    return NextResponse.json({
      success: true,
      score,
      correctCount,
      total,
      topicProgress: { status: topicProgress.status, masteryPct: topicProgress.masteryPct },
    })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors[0].message }, { status: 400 })
    }
    console.error('[practice/submit]', err)
    return NextResponse.json({ error: 'Failed to submit practice results' }, { status: 500 })
  }
}
