import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { isSchoolSubject } from '@/lib/school/schoolRouting'
import { generateMockTest, MOCK_TEST_CONFIG, type MockTestType } from '@/lib/school/exams/mockTestEngine'

const schema = z.object({
  subjectSlug: z.string().max(64),
  testType: z.enum(['quick', 'standard', 'full']).default('standard'),
})

function toClientQuestion(q: { id: string; type: string; nodeId: string; question: string; options?: unknown }) {
  const base = { id: q.id, type: q.type, nodeId: q.nodeId, question: q.question }
  if (q.type === 'mcq' && Array.isArray(q.options)) return { ...base, options: q.options }
  return base
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 })

  const { subjectSlug, testType } = parsed.data

  const profile = await prisma.profile.findUnique({
    where: { userId: session.user.id },
    select: { userType: true, educationBoard: true, grade: true },
  })
  if (profile?.userType !== 'SCHOOL_STUDENT' || !profile.educationBoard || !profile.grade) {
    return NextResponse.json({ error: 'Not a school student' }, { status: 403 })
  }

  const { educationBoard: board, grade } = profile
  if (!isSchoolSubject(board, subjectSlug)) {
    return NextResponse.json({ error: 'Invalid subject' }, { status: 400 })
  }

  const { questions, chapterIds } = await generateMockTest(
    session.user.id,
    board,
    subjectSlug,
    grade,
    testType as MockTestType,
  )

  if (questions.length === 0) {
    return NextResponse.json({ error: 'Could not generate questions for this subject' }, { status: 422 })
  }

  const config = MOCK_TEST_CONFIG[testType as MockTestType]

  const ps = await prisma.practiceSession.create({
    data: {
      userId: session.user.id,
      subjectSlug,
      topicSlug: subjectSlug,   // subject-level mock — no single chapter
      chapterId: null,
      kind: 'mock',
      questions: questions as unknown as import('@prisma/client').Prisma.JsonArray,
    },
  })

  return NextResponse.json({
    sessionId: ps.id,
    testType,
    label: config.label,
    estimatedMinutes: config.estimatedMinutes,
    totalQuestions: questions.length,
    chapterIds,
    questions: questions.map(toClientQuestion),
  })
}
