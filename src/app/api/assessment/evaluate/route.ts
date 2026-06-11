import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'

/**
 * Evaluate an in-lesson assessment ([ASSESSMENT_RESULT] tag emitted by the
 * tutor) into a mastery score, a promotion decision, and a TopicProgress
 * update. Deterministic checks ([MATH_ANSWER]/[CODE_ANSWER] tags) are blended
 * with the AI-reported scores when present so STEM subjects aren't graded by
 * the model alone.
 */

const schema = z.object({
  subjectSlug: z.string().min(1),
  topicSlug: z.string().min(1),
  correctness: z.number().min(0).max(100),
  reasoning: z.number().min(0).max(100),
  confidence: z.number().min(0).max(100),
  mathChecks: z.array(z.object({ expected: z.number(), got: z.number() })).optional(),
  codeChecks: z.array(z.object({ expected: z.string(), got: z.string() })).optional(),
})

const PROMOTE_AT = 80
const REVIEW_BELOW = 60

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const { subjectSlug, topicSlug, correctness, reasoning, confidence, mathChecks, codeChecks } = schema.parse(body)
    const userId = session.user.id

    // AI-reported component: correctness carries most weight, confidence least
    const aiScore = Math.round(0.5 * correctness + 0.35 * reasoning + 0.15 * confidence)

    // Deterministic component: exact-match ratio over math/code checks
    const checks = [
      ...(mathChecks ?? []).map((c) => Math.abs(c.expected - c.got) < 1e-9),
      ...(codeChecks ?? []).map((c) => c.expected.trim() === c.got.trim()),
    ]
    const hasChecks = checks.length > 0
    const detScore = hasChecks ? Math.round((checks.filter(Boolean).length / checks.length) * 100) : null

    const masteryScore = hasChecks
      ? Math.round(0.6 * (detScore as number) + 0.4 * aiScore)
      : aiScore
    const method = hasChecks ? 'hybrid' : 'ai'

    const decision = masteryScore >= PROMOTE_AT ? 'PROMOTED'
      : masteryScore < REVIEW_BELOW ? 'REVIEW_REQUIRED'
      : 'STAY'

    const explanation = {
      en: decision === 'PROMOTED'
        ? `Mastery score ${masteryScore}/100 — topic mastered! The next topics in your path are now unlocked.`
        : decision === 'REVIEW_REQUIRED'
        ? `Mastery score ${masteryScore}/100 — let's review this topic before moving on. Focus on the questions you missed.`
        : `Mastery score ${masteryScore}/100 — good progress! A bit more practice and you'll master this topic.`,
      ru: decision === 'PROMOTED'
        ? `Оценка освоения ${masteryScore}/100 — тема освоена! Следующие темы открыты.`
        : decision === 'REVIEW_REQUIRED'
        ? `Оценка освоения ${masteryScore}/100 — стоит повторить тему перед тем как двигаться дальше.`
        : `Оценка освоения ${masteryScore}/100 — хороший прогресс! Ещё немного практики.`,
      hi: decision === 'PROMOTED'
        ? `Mastery score ${masteryScore}/100 — topic master ho gaya! Agle topics unlock ho gaye.`
        : decision === 'REVIEW_REQUIRED'
        ? `Mastery score ${masteryScore}/100 — aage badhne se pehle is topic ko revise karein.`
        : `Mastery score ${masteryScore}/100 — accha progress! Thodi aur practice se master ho jayega.`,
    }

    // Persist into TopicProgress (the KG read-side picks this up for tutor context)
    const key = { userId_subjectSlug_topicSlug: { userId, subjectSlug, topicSlug } }
    const existing = await withRetry(() => prisma.topicProgress.findUnique({ where: key }))
    const status = decision === 'PROMOTED'
      ? 'MASTERED' as const
      : existing?.status === 'MASTERED' || existing?.status === 'COMPLETED'
        ? existing.status
        : 'IN_PROGRESS' as const

    const row = await withRetry(() => prisma.topicProgress.upsert({
      where: key,
      update: {
        status,
        masteryPct: masteryScore,
        lastScore: masteryScore,
        attempts: { increment: 1 },
        ...(decision === 'PROMOTED' ? { completedAt: existing?.completedAt ?? new Date() } : {}),
      },
      create: {
        userId,
        subjectSlug,
        topicSlug,
        status,
        masteryPct: masteryScore,
        lastScore: masteryScore,
        attempts: 1,
        ...(decision === 'PROMOTED' ? { completedAt: new Date() } : {}),
      },
    }))

    return NextResponse.json({
      success: true,
      evaluation: {
        masteryScore,
        decision,
        explanation,
        method,
        evidenceBreakdown: hasChecks
          ? { byType: [{ type: 'deterministic', score: detScore, weight: 0.6 }, { type: 'ai', score: aiScore, weight: 0.4 }] }
          : { byType: [{ type: 'ai', score: aiScore, weight: 1 }] },
        retentionNote: null,
      },
      topicProgress: { status: row.status, masteryPct: row.masteryPct },
    })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: err.errors[0].message }, { status: 400 })
    }
    console.error('[assessment/evaluate]', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
