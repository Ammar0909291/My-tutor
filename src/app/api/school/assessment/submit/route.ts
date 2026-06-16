import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { evaluateChapterAssessment } from '@/lib/school/assessment/evaluateAssessment'
import { getSchoolChapters, getChapterPosition, schoolSubjectCode, chapterDisplayTitle } from '@/lib/school/schoolRouting'
import { withRetry } from '@/lib/db/withRetry'
import type { PracticeQuestion, PracticeAnswer } from '@/lib/school/practice/practiceTypes'
import { ASSESSMENT_PASS_THRESHOLD } from '@/lib/school/assessment/assessmentTypes'

const schema = z.object({
  sessionId: z.string(),
  answers: z
    .array(z.object({ questionId: z.string(), value: z.union([z.number(), z.boolean(), z.string()]) }))
    .min(1)
    .max(20),
})

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 })

  const { sessionId, answers } = parsed.data

  const ps = await prisma.practiceSession.findUnique({
    where: { id: sessionId },
    select: { userId: true, subjectSlug: true, chapterId: true, kind: true, questions: true, completedAt: true },
  })
  if (!ps || ps.userId !== session.user.id) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (ps.kind !== 'assessment') return NextResponse.json({ error: 'Not an assessment session' }, { status: 400 })
  // HIGH-8: early exit for the sequential-replay case (optimisation only;
  // the real atomic guard is the conditional UPDATE below).
  if (ps.completedAt) return NextResponse.json({ error: 'Already submitted' }, { status: 409 })

  const profile = await prisma.profile.findUnique({
    where: { userId: session.user.id },
    select: { educationBoard: true, grade: true },
  })
  if (!profile?.educationBoard || !profile?.grade) {
    return NextResponse.json({ error: 'Profile incomplete' }, { status: 400 })
  }

  const chapters = getSchoolChapters(profile.educationBoard, ps.subjectSlug, profile.grade)
  const chapter = chapters.find((c) => c.id === ps.chapterId)
  if (!chapter) return NextResponse.json({ error: 'Chapter not found' }, { status: 404 })

  // Determine next chapter for recommendation
  const chapterIdx = chapters.findIndex((c) => c.id === ps.chapterId)
  const nextChapterRaw = chapterIdx >= 0 && chapterIdx < chapters.length - 1 ? chapters[chapterIdx + 1] : null
  const nextChapter = nextChapterRaw ? { id: nextChapterRaw.id, title: chapterDisplayTitle(nextChapterRaw.title) } : null

  const questions = ps.questions as unknown as PracticeQuestion[]
  const result = evaluateChapterAssessment(sessionId, questions, answers as PracticeAnswer[], nextChapter)

  // HIGH-8: atomic claim — only ONE concurrent request can win this UPDATE.
  // If 0 rows affected the session was already claimed; return 409, no side-effects.
  const claimed = await prisma.practiceSession.updateMany({
    where: { id: sessionId, completedAt: null },
    data: { completedAt: new Date(), score: result.accuracyPercent },
  })
  if (claimed.count === 0) return NextResponse.json({ error: 'Already submitted' }, { status: 409 })

  // If passed: mark chapter complete in StudentProgress
  if (result.passed && ps.chapterId) {
    const code = schoolSubjectCode(profile.educationBoard, ps.subjectSlug, profile.grade)
    const existing = await withRetry(() => prisma.studentProgress.findUnique({
      where: { userId_subjectCode: { userId: session.user.id, subjectCode: code } },
      select: { completedLessons: true },
    }))
    const orders = new Set(existing?.completedLessons ?? [])
    orders.add(chapter.order)
    const completedLessons = [...orders].sort((a, b) => a - b)
    const pos = getChapterPosition(chapters, completedLessons)!
    const progressData = {
      completedLessons,
      currentLesson: pos.current.order,
      completionPercent: pos.percent,
      isCompleted: pos.completedCount === pos.totalCount,
      completedAt: pos.completedCount === pos.totalCount ? new Date() : null,
      lastLessonTitle: chapterDisplayTitle(pos.current.title),
      lastStudiedAt: new Date(),
    }
    await withRetry(() => prisma.studentProgress.upsert({
      where: { userId_subjectCode: { userId: session.user.id, subjectCode: code } },
      update: progressData,
      create: { userId: session.user.id, subjectCode: code, ...progressData, completedAt: progressData.completedAt ?? undefined },
    }))
  }

  // Sync TopicProgress for all chapter KG nodes
  if (chapter.kgNodeIds.length > 0) {
    const existing = await prisma.topicProgress.findMany({
      where: { userId: session.user.id, subjectSlug: ps.subjectSlug, topicSlug: { in: chapter.kgNodeIds } },
      select: { topicSlug: true, status: true },
    })
    const alreadyMastered = new Set(existing.filter((r) => r.status === 'MASTERED').map((r) => r.topicSlug))
    const newStatus = result.passed ? 'MASTERED' : 'IN_PROGRESS'
    const nodesToUpdate = chapter.kgNodeIds.filter((id) => !alreadyMastered.has(id))

    await Promise.all(
      nodesToUpdate.map((nodeId) =>
        prisma.topicProgress.upsert({
          where: { userId_subjectSlug_topicSlug: { userId: session.user.id, subjectSlug: ps.subjectSlug, topicSlug: nodeId } },
          create: {
            userId: session.user.id, subjectSlug: ps.subjectSlug, topicSlug: nodeId,
            status: newStatus, masteryPct: result.accuracyPercent, attempts: 1,
            lastScore: result.accuracyPercent, completedAt: result.passed ? new Date() : null,
          },
          update: {
            status: newStatus, masteryPct: result.accuracyPercent, lastScore: result.accuracyPercent,
            attempts: { increment: 1 }, completedAt: result.passed ? new Date() : undefined,
          },
        }),
      ),
    )
  }

  // Weak topic detection
  if (result.weakNodeIds.length > 0) {
    await Promise.all(
      result.weakNodeIds.map((nodeId) =>
        prisma.mistakeRecord.create({
          data: {
            userId: session.user.id, subjectSlug: ps.subjectSlug,
            topicSlug: nodeId, sessionId, category: 'chapter_assessment', questionId: nodeId,
          },
        }).catch(() => {}),
      ),
    )
  }

  // Sprint CD: fire-and-forget achievement check after assessment
  Promise.resolve().then(async () => {
    const { updateStudyStreak } = await import('@/lib/school/achievements/streakEngine')
    const { checkAndUnlockAchievements } = await import('@/lib/school/achievements/achievementEngine')
    await updateStudyStreak(session.user.id)
    await checkAndUnlockAchievements(session.user.id, profile.educationBoard!, profile.grade!)
  }).catch(() => {})

  return NextResponse.json(result)
}
