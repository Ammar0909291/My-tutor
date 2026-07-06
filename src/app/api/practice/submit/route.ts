import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'
import { checkRateLimit, rateLimitResponse } from '@/lib/rateLimit'
import { generateCoachInsights } from '@/lib/analytics/coachInsights'
import { computeMasteryPct, deriveTopicStatus } from '@/lib/mastery/topicMasteryFormula'
import { buildPracticeMistakeRecords } from '@/lib/mistakeRecords'
import { practiceSubmitSchema } from '@/lib/practiceSubmitSchema'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = session.user.id

  const { allowed } = await checkRateLimit(`rl:practice-submit:${userId}`, 30, 60)
  if (!allowed) return rateLimitResponse()

  try {
    const body = await req.json()
    const { subjectSlug, topicSlug, questions, correct, idempotencyKey } = practiceSubmitSchema.parse(body)

    const total = correct.length
    const correctCount = correct.filter(Boolean).length
    const score = Math.round((correctCount / total) * 100)

    const storedQuestions = correct.map((isCorrect, i) => ({
      question: questions[i]?.question ?? null,
      correct: isCorrect,
    }))

    // HIGH-6 / CRITICAL-5 (Sprint D): if idempotencyKey is supplied the DB
    // unique constraint is the atomic dedup guard — two concurrent requests
    // with the same key cannot both succeed; the second hits P2002 and we
    // return 409, no side-effects. The session create and its MistakeRecord
    // batch now run in one transaction so an interruption between them can't
    // leave a "submitted" session with no recorded mistakes — and, since the
    // create rolls back too, a retry with the same idempotencyKey can still
    // succeed instead of permanently hitting "Already submitted".
    let practiceSession
    try {
      practiceSession = await withRetry(() => prisma.$transaction(async (tx) => {
        const ps = await tx.practiceSession.create({
          data: {
            userId,
            subjectSlug,
            topicSlug,
            questions: storedQuestions,
            completedAt: new Date(),
            score,
            ...(idempotencyKey ? { idempotencyKey } : {}),
          },
        })
        const mistakeRecords = buildPracticeMistakeRecords(correct, userId, subjectSlug, topicSlug, ps.id)
        if (mistakeRecords.length > 0) {
          await tx.mistakeRecord.createMany({ data: mistakeRecords })
        }
        return ps
      }))
    } catch (e: unknown) {
      if ((e as { code?: string })?.code === 'P2002') {
        return NextResponse.json({ error: 'Already submitted' }, { status: 409 })
      }
      throw e
    }

    // MED-10: wrap mastery read-compute-write in a transaction to prevent two
    // concurrent submissions from both reading the old masteryPct and both
    // writing a stale (lower) value.
    const topicProgress = await withRetry(() => prisma.$transaction(async (tx) => {
      const key = { userId_subjectSlug_topicSlug: { userId, subjectSlug, topicSlug } }
      const existing = await tx.topicProgress.findUnique({ where: key })
      const masteryPct = computeMasteryPct(existing?.masteryPct ?? null, score)
      const status = deriveTopicStatus(existing?.status ?? 'IN_PROGRESS', masteryPct)
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
