import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'
import { getSchoolChapters } from '@/lib/school/schoolRouting'
import { evaluateMockTest } from '@/lib/school/exams/mockTestEngine'
import { ALL_KG_NODES } from '@/lib/education'
import type { PracticeQuestion, PracticeAnswer } from '@/lib/school/practice/practiceTypes'

const schema = z.object({
  sessionId: z.string(),
  answers: z
    .array(z.object({ questionId: z.string(), value: z.union([z.number(), z.boolean(), z.string()]) }))
    .min(1)
    .max(60),
  // HIGH-9: startedAt removed — server derives it from createdAt (see below).
})

const nodeMap = new Map(ALL_KG_NODES.map((n) => [n.id, n.title]))

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 })

  const { sessionId, answers } = parsed.data

  const ps = await withRetry(() => prisma.practiceSession.findUnique({
    where: { id: sessionId },
    select: { userId: true, subjectSlug: true, kind: true, questions: true, completedAt: true, createdAt: true },
  }))
  if (!ps || ps.userId !== session.user.id) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (ps.kind !== 'mock') return NextResponse.json({ error: 'Not a mock session' }, { status: 400 })
  // HIGH-8: early exit for sequential-replay case (optimisation; real guard is the atomic UPDATE below).
  if (ps.completedAt) return NextResponse.json({ error: 'Already submitted' }, { status: 409 })

  const profile = await withRetry(() => prisma.profile.findUnique({
    where: { userId: session.user.id },
    select: { educationBoard: true, grade: true },
  }))
  if (!profile?.educationBoard || !profile?.grade) {
    return NextResponse.json({ error: 'Profile incomplete' }, { status: 400 })
  }

  const { educationBoard: board, grade } = profile
  const questions = ps.questions as unknown as PracticeQuestion[]
  const typedAnswers: PracticeAnswer[] = answers.map((a) => ({ questionId: a.questionId, value: a.value }))
  const chapters = getSchoolChapters(board, ps.subjectSlug, grade)
  // HIGH-9: always use server-stored createdAt — never the client-supplied value.
  const startedAt = ps.createdAt

  const result = evaluateMockTest(sessionId, questions, typedAnswers, chapters, startedAt)

  // Resolve node IDs → titles
  result.strongTopicTitles = result.strongTopicIds.map((id: string) => nodeMap.get(id) ?? id).filter(Boolean)
  result.weakTopicTitles = result.weakTopicIds.map((id: string) => nodeMap.get(id) ?? id).filter(Boolean)

  // HIGH-8: atomic claim — only ONE concurrent request can win this UPDATE.
  // If 0 rows affected the session was already claimed; return 409, no side-effects.
  const claimed = await withRetry(() => prisma.practiceSession.updateMany({
    where: { id: sessionId, completedAt: null },
    data: { completedAt: new Date(), score: result.score },
  }))
  if (claimed.count === 0) return NextResponse.json({ error: 'Already submitted' }, { status: 409 })

  // Record weak topics as mistake records for exam readiness + future planning
  if (result.weakTopicIds.length > 0) {
    await Promise.all(
      result.weakTopicIds.map((nodeId: string) =>
        prisma.mistakeRecord.create({
          data: {
            userId: session.user.id,
            subjectSlug: ps.subjectSlug,
            topicSlug: nodeId,
            sessionId,
            category: 'mock_test',
            questionId: nodeId,
          },
        }).catch(() => null)
      )
    )
  }

  // Sprint CD: fire-and-forget streak + achievement check
  Promise.resolve().then(async () => {
    const { updateStudyStreak } = await import('@/lib/school/achievements/streakEngine')
    const { checkAndUnlockAchievements } = await import('@/lib/school/achievements/achievementEngine')
    await updateStudyStreak(session.user.id)
    await checkAndUnlockAchievements(session.user.id, board, grade)
  }).catch(() => {})

  // Sprint CE: compute updated readiness after mock
  let updatedReadinessPercent: number | undefined
  try {
    const { getExamReadinessForSubject } = await import('@/lib/school/adaptive/examReadiness')
    const updated = await getExamReadinessForSubject(session.user.id, board, grade, ps.subjectSlug)
    updatedReadinessPercent = updated.readinessPercent
  } catch { /* non-fatal */ }

  return NextResponse.json({ ...result, updatedReadinessPercent })
}
