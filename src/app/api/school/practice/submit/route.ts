import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { evaluatePracticeSession } from '@/lib/school/practice/evaluatePracticeAnswer'
import { getSchoolChapters } from '@/lib/school/schoolRouting'
import type { PracticeQuestion, PracticeAnswer } from '@/lib/school/practice/practiceTypes'

const schema = z.object({
  sessionId: z.string(),
  answers: z
    .array(z.object({ questionId: z.string(), value: z.union([z.number(), z.boolean(), z.string()]) }))
    .min(1)
    .max(10),
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
    select: { userId: true, subjectSlug: true, chapterId: true, questions: true, completedAt: true },
  })
  if (!ps || ps.userId !== session.user.id) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  if (ps.completedAt) return NextResponse.json({ error: 'Already submitted' }, { status: 409 })

  const questions = ps.questions as unknown as PracticeQuestion[]
  const result = evaluatePracticeSession(sessionId, questions, answers as PracticeAnswer[])

  // Atomic completion — only the first concurrent submission wins. updateMany with
  // completedAt: null is the atomic guard; a count of 0 means a concurrent request
  // already committed, so MistakeRecord creation below is unreachable for the loser.
  const updated = await prisma.practiceSession.updateMany({
    where: { id: sessionId, completedAt: null },
    data: { completedAt: new Date(), score: result.accuracyPercent },
  })
  if (updated.count === 0) return NextResponse.json({ error: 'Already submitted' }, { status: 409 })

  // Mastery integration — only for chapter practice sessions
  if (ps.chapterId) {
    const profile = await prisma.profile.findUnique({
      where: { userId: session.user.id },
      select: { educationBoard: true, grade: true },
    })
    if (profile?.educationBoard && profile?.grade) {
      const chapters = getSchoolChapters(profile.educationBoard, ps.subjectSlug, profile.grade)
      const chapter = chapters.find((c) => c.id === ps.chapterId)
      if (chapter?.kgNodeIds.length) {
        // Fetch existing mastery — never downgrade a MASTERED node
        const existing = await prisma.topicProgress.findMany({
          where: { userId: session.user.id, subjectSlug: ps.subjectSlug, topicSlug: { in: chapter.kgNodeIds } },
          select: { topicSlug: true, status: true },
        })
        const alreadyMastered = new Set(existing.filter((r) => r.status === 'MASTERED').map((r) => r.topicSlug))
        const nodesToUpdate = chapter.kgNodeIds.filter((id) => !alreadyMastered.has(id))

        const newStatus = result.masteryStatus === 'mastered' ? 'MASTERED' : 'IN_PROGRESS'
        await Promise.all(
          nodesToUpdate.map((nodeId) =>
            prisma.topicProgress.upsert({
              where: { userId_subjectSlug_topicSlug: { userId: session.user.id, subjectSlug: ps.subjectSlug, topicSlug: nodeId } },
              create: {
                userId: session.user.id,
                subjectSlug: ps.subjectSlug,
                topicSlug: nodeId,
                status: newStatus,
                masteryPct: result.accuracyPercent,
                attempts: 1,
                lastScore: result.accuracyPercent,
                completedAt: newStatus === 'MASTERED' ? new Date() : null,
              },
              update: {
                status: newStatus,
                masteryPct: result.accuracyPercent,
                lastScore: result.accuracyPercent,
                attempts: { increment: 1 },
                completedAt: newStatus === 'MASTERED' ? new Date() : undefined,
              },
            }),
          ),
        )
      }
    }
  }

  // Weak topic detection — store MistakeRecord per incorrect node
  if (result.weakNodeIds.length > 0 && ps.chapterId) {
    await Promise.all(
      result.weakNodeIds.map((nodeId) =>
        prisma.mistakeRecord.create({
          data: {
            userId: session.user.id,
            subjectSlug: ps.subjectSlug,
            topicSlug: nodeId,
            sessionId,
            category: 'chapter_practice',
            questionId: nodeId,
          },
        }).catch(() => {}),
      ),
    )
  }

  // Phase 2B: fire-and-forget memory update — re-fetches profile/subject inside block
  // because `chapter` and `profile` are scoped to the mastery-integration block above.
  Promise.resolve().then(async () => {
    if (!ps.chapterId) return
    const [subject, prof] = await Promise.all([
      prisma.subject.findUnique({ where: { slug: ps.subjectSlug }, select: { id: true } }),
      prisma.profile.findUnique({ where: { userId: session.user.id }, select: { educationBoard: true, grade: true } }),
    ])
    if (!subject || !prof?.educationBoard || !prof?.grade) return
    const chapters = getSchoolChapters(prof.educationBoard, ps.subjectSlug, prof.grade)
    const ch = chapters.find((c) => c.id === ps.chapterId)
    if (!ch?.kgNodeIds.length) return
    const { updateMemoryFromPractice } = await import('@/lib/memory/update-pipeline')
    await updateMemoryFromPractice(
      session.user.id,
      subject.id,
      ch.kgNodeIds.map((nodeId) => ({
        topicSlug: nodeId,
        masteryPct: result.accuracyPercent,
        passed: result.masteryStatus === 'mastered',
      })),
    )
  }).catch(() => {})

  return NextResponse.json(result)
}
