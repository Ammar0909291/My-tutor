import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'

/**
 * GET /api/practice/analysis?subject=<slug>&topic=<slug?>
 * Aggregates the learner's practice history into the AnalysisData shape
 * consumed by InsightsPanel ("Practice Insights" section) and LessonScreen's
 * practice button (recommendedDifficulty / recommendedFocusCategories).
 *
 * Sources: PracticeSession (scores) and MistakeRecord (categories/gaps).
 * The optional `topic` param narrows the performance stats (recentScores,
 * avgScore, sessionCount); mistake-derived data stays subject-wide because
 * knowledge gaps are inherently cross-topic.
 */
export async function GET(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = session.user.id

  const { searchParams } = new URL(req.url)
  const subjectSlug = searchParams.get('subject')
  const topicSlug = searchParams.get('topic')
  if (!subjectSlug) return NextResponse.json({ error: 'subject required' }, { status: 400 })

  try {
    const sessionWhere = {
      userId,
      subjectSlug,
      completedAt: { not: null },
      ...(topicSlug ? { topicSlug } : {}),
    }

    const [sessions, sessionCount, mistakes] = await Promise.all([
      withRetry(() => prisma.practiceSession.findMany({
        where: sessionWhere,
        orderBy: { createdAt: 'desc' },
        take: 20,
        select: { score: true },
      })),
      withRetry(() => prisma.practiceSession.count({ where: sessionWhere })),
      withRetry(() => prisma.mistakeRecord.findMany({
        where: { userId, subjectSlug },
        select: { category: true, topicSlug: true },
        orderBy: { createdAt: 'desc' },
        take: 500,
      })),
    ])

    const recentScores = sessions
      .map((s) => s.score)
      .filter((s): s is number => s !== null)
      .slice(0, 10)
    const avgScore = recentScores.length > 0
      ? Math.round(recentScores.reduce((a, b) => a + b, 0) / recentScores.length)
      : null

    // Mistake categories ranked by frequency
    const categoryCounts = new Map<string, number>()
    for (const m of mistakes) {
      categoryCounts.set(m.category, (categoryCounts.get(m.category) ?? 0) + 1)
    }
    const totalMistakes = mistakes.length
    const categories = [...categoryCounts.entries()]
      .map(([category, count]) => ({
        category,
        count,
        pct: totalMistakes > 0 ? Math.round((count / totalMistakes) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count)

    // Knowledge gaps: repeated mistakes on the same topic+category
    const gapCounts = new Map<string, { topicSlug: string; mistakeCategory: string; frequency: number }>()
    for (const m of mistakes) {
      const key = `${m.topicSlug}::${m.category}`
      const existing = gapCounts.get(key)
      if (existing) existing.frequency += 1
      else gapCounts.set(key, { topicSlug: m.topicSlug, mistakeCategory: m.category, frequency: 1 })
    }
    const gaps = [...gapCounts.values()]
      .filter((g) => g.frequency >= 2)
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 10)

    const recommendedDifficulty: 1 | 2 | 3 = avgScore === null ? 2
      : avgScore >= 80 ? 3
      : avgScore >= 50 ? 2
      : 1

    return NextResponse.json({
      success: true,
      categories,
      gaps,
      recommendedDifficulty,
      recommendedFocusCategories: categories.slice(0, 3).map((c) => c.category),
      recentScores,
      avgScore,
      sessionCount,
      totalMistakes,
      allCategories: [...categoryCounts.keys()],
    })
  } catch (err) {
    console.error('[practice/analysis]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
