import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { generateJSON } from '@/lib/ai/client'
import { prisma } from '@/lib/db/prisma'
import { checkRateLimit, rateLimitResponse } from '@/lib/rateLimit'

const schema = z.object({
  subjectCode: z.string(),
  subjectName: z.string(),
  lessonTitles: z.array(z.string()).min(1),
  lang: z.enum(['ru', 'en', 'hi']).default('en'),
})

type GeneratedQuestion = {
  question: string
  options: string[]
  correctIndex: number
  explanation?: string
}

/**
 * POST /api/final-assessment/generate — generates a 10-question final
 * assessment for a fully-completed subject. Questions (including correctIndex)
 * are stored server-side so the POST /api/final-assessment grading endpoint
 * can compute the score without trusting client-supplied values. Only the
 * question text and options are returned to the client — correctIndex is
 * never sent.
 */
export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const { allowed } = await checkRateLimit(`rl:final-assessment:${session.user.id}`, 5, 300)
  if (!allowed) return rateLimitResponse()

  try {
    const body = await req.json()
    const { subjectCode, subjectName, lessonTitles, lang } = schema.parse(body)

    const progress = await prisma.studentProgress.findUnique({
      where: { userId_subjectCode: { userId: session.user.id, subjectCode } },
    })
    if (!progress?.isCompleted) {
      return NextResponse.json({ success: false, error: 'Subject not completed yet' }, { status: 403 })
    }

    const langInstruction = lang === 'ru' ? 'in Russian' : lang === 'hi' ? 'in Hindi' : 'in English'
    const topics = lessonTitles.length <= 12
      ? lessonTitles
      : Array.from({ length: 12 }, (_, i) => lessonTitles[Math.round(i * (lessonTitles.length - 1) / 11)])

    const prompt = `Generate exactly 10 multiple choice questions for a final assessment covering the "${subjectName}" course. The course covers these topics: ${topics.join(', ')}. Questions should test understanding across the whole course, from beginner to advanced topics. ${langInstruction}.
Return ONLY a JSON array:
[{"question":"...","options":["a","b","c","d"],"correctIndex":0,"explanation":"..."}]`

    const result = await generateJSON(prompt, 2500)
    const questions = Array.isArray(result) ? (result as GeneratedQuestion[]) : []
    if (questions.length === 0) {
      return NextResponse.json({ success: false, error: 'Failed to generate assessment' }, { status: 502 })
    }

    // Persist questions server-side (with correctIndex) so grading is done
    // server-side — the client never receives correctIndex.
    await prisma.finalAssessmentResult.upsert({
      where: { userId_subjectCode: { userId: session.user.id, subjectCode } },
      create: {
        userId: session.user.id,
        subjectCode,
        score: 0,
        totalQuestions: questions.length,
        passed: false,
        questions,
      },
      update: {
        questions,
        score: 0,
        totalQuestions: questions.length,
        passed: false,
        takenAt: new Date(),
      },
    })

    // Strip correctIndex before returning to the client
    const clientQuestions = questions.map(({ question, options }) => ({ question, options }))
    return NextResponse.json({ success: true, questions: clientQuestions })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: err.errors[0].message }, { status: 400 })
    }
    console.error('[POST /api/final-assessment/generate]', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
