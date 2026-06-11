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
  })).default([]),
  correct: z.array(z.boolean()).min(1),
})

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = session.user.id

  const { allowed } = await checkRateLimit(`rl:practice-submit:${userId}`, 30, 60)
  if (!allowed) return rateLimitResponse()

  try {
    const body = await req.json()
    const { subjectSlug, topicSlug, questions, correct } = schema.parse(body)

    const total = correct.length
    const correctCount = correct.filter(Boolean).length
    const score = Math.round((correctCount / total) * 100)

    const storedQuestions = correct.map((isCorrect, i) => ({
      question: questions[i]?.question ?? null,
      correct: isCorrect,
    }))

    const practiceSession = await withRetry(() => prisma.practiceSession.create({
      data: {
        userId,
        subjectSlug,
        topicSlug,
        questions: storedQuestions,
        completedAt: new Date(),
        score,
      },
    }))

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

    const existing = await withRetry(() => prisma.topicProgress.findUnique({
      where: { userId_subjectSlug_topicSlug: { userId, subjectSlug, topicSlug } },
    }))

    const masteryPct = existing ? Math.round((existing.masteryPct + score) / 2) : score

    let status = existing?.status ?? 'IN_PROGRESS'
    if (status === 'NOT_STARTED' || status === 'IN_PROGRESS') {
      status = masteryPct >= 80 ? 'MASTERED' : masteryPct >= 50 ? 'COMPLETED' : 'IN_PROGRESS'
    }

    const topicProgress = await withRetry(() => prisma.topicProgress.upsert({
      where: { userId_subjectSlug_topicSlug: { userId, subjectSlug, topicSlug } },
      create: { userId, subjectSlug, topicSlug, status, masteryPct, attempts: 1, lastScore: score },
      update: { status, masteryPct, attempts: { increment: 1 }, lastScore: score },
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
    console.error('[practice/submit]', err)
    return NextResponse.json({ error: 'Failed to submit practice results' }, { status: 500 })
  }
}
