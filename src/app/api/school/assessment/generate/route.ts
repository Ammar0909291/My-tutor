import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { getSchoolChapters, isSchoolSubject, SCHOOL_SUBJECT_META } from '@/lib/school/schoolRouting'
import { generateChapterAssessment } from '@/lib/school/assessment/generateChapterAssessment'
import type { PracticeQuestion } from '@/lib/school/practice/practiceTypes'
import { captureError } from '@/lib/monitoring'

const schema = z.object({
  subjectSlug: z.string().max(64),
  chapterId: z.string().max(128),
})

function toClientQuestion(q: PracticeQuestion) {
  const base = { id: q.id, type: q.type, nodeId: q.nodeId, question: q.question }
  if (q.type === 'mcq') return { ...base, options: q.options }
  return base
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 })

  const { subjectSlug, chapterId } = parsed.data

  const profile = await prisma.profile.findUnique({
    where: { userId: session.user.id },
    select: { userType: true, educationBoard: true, grade: true },
  })
  if (!profile?.educationBoard || !profile.grade) {
    return NextResponse.json({ error: 'Not a school student' }, { status: 403 })
  }

  const { educationBoard: board, grade } = profile
  if (!isSchoolSubject(board, subjectSlug)) {
    return NextResponse.json({ error: 'Invalid subject' }, { status: 400 })
  }

  const chapters = getSchoolChapters(board, subjectSlug, grade)
  const chapter = chapters.find((c) => c.id === chapterId)
  if (!chapter) return NextResponse.json({ error: 'Chapter not found' }, { status: 404 })

  const subjectName = SCHOOL_SUBJECT_META[subjectSlug]?.label ?? subjectSlug

  try {
    const questions = await generateChapterAssessment(board, subjectSlug, subjectName, grade, chapter)

    const ps = await prisma.practiceSession.create({
      data: {
        userId: session.user.id,
        subjectSlug,
        topicSlug: chapterId,
        chapterId,
        kind: 'assessment',
        questions: questions as unknown as import('@prisma/client').Prisma.JsonArray,
      },
    })

    return NextResponse.json({
      sessionId: ps.id,
      chapterTitle: chapter.title,
      questions: questions.map(toClientQuestion),
      estimatedMinutes: Math.ceil(questions.length * 1.5),
      totalQuestions: questions.length,
    })
  } catch (error: any) {
    console.error('[assessment/generate]', error)
    captureError(error, { route: 'api/school/assessment/generate', tags: { subjectSlug } })
    return NextResponse.json({ error: 'Could not generate assessment questions. Please try again.' }, { status: 500 })
  }
}
