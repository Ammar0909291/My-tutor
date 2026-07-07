import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'

// Accept selected option indices from the client — never score or total.
// Score is computed server-side against the questions stored at generate time.
const submitSchema = z.object({
  subjectCode: z.string(),
  answers: z.array(z.number().int().min(0).max(3)),
})

const PASS_THRESHOLD = 0.7

function genCertificateCode(): string {
  return `MT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
}

type StoredQuestion = {
  question: string
  options: string[]
  correctIndex: number
  explanation?: string
}

/**
 * GET /api/final-assessment?subject=X — status check: is the final assessment
 * unlocked (subject fully completed), has the learner already taken it, and
 * has a certificate already been issued.
 */
export async function GET(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const subjectCode = searchParams.get('subject')
  if (!subjectCode) return NextResponse.json({ success: false, error: 'subject param required' }, { status: 400 })

  try {
    const [progress, result, certificate] = await Promise.all([
      prisma.studentProgress.findUnique({
        where: { userId_subjectCode: { userId: session.user.id, subjectCode } },
      }),
      prisma.finalAssessmentResult.findUnique({
        where: { userId_subjectCode: { userId: session.user.id, subjectCode } },
        // Exclude stored questions so correctIndex is never leaked via GET
        select: { id: true, score: true, totalQuestions: true, passed: true, takenAt: true },
      }),
      prisma.subjectCertificate.findUnique({
        where: { userId_subjectCode: { userId: session.user.id, subjectCode } },
      }),
    ])

    return NextResponse.json({
      success: true,
      unlocked: !!progress?.isCompleted,
      completedAt: progress?.completedAt ?? null,
      result,
      certificate,
    })
  } catch (err) {
    console.error('[GET /api/final-assessment]', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * POST /api/final-assessment — grade a final assessment. The client supplies
 * only the selected option indices (answers[]); the server loads the questions
 * it stored at generate time and computes the score. Client-supplied score
 * values are never accepted. A score >= 70% passes and issues a
 * SubjectCertificate (idempotent per user/subject).
 */
export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const { subjectCode, answers } = submitSchema.parse(body)

    // Load server-stored questions (written by /generate)
    const stored = await prisma.finalAssessmentResult.findUnique({
      where: { userId_subjectCode: { userId: session.user.id, subjectCode } },
    })
    if (!stored?.questions) {
      return NextResponse.json(
        { success: false, error: 'No assessment found. Call /api/final-assessment/generate first.' },
        { status: 400 }
      )
    }

    const storedQuestions = stored.questions as StoredQuestion[]
    const total = storedQuestions.length

    if (answers.length !== total) {
      return NextResponse.json(
        { success: false, error: `Expected ${total} answers, received ${answers.length}` },
        { status: 400 }
      )
    }

    // Server-side score computation — client cannot influence this
    const score = answers.filter((a, i) => a === storedQuestions[i].correctIndex).length
    const passed = total > 0 && score / total >= PASS_THRESHOLD

    const progress = await prisma.studentProgress.findUnique({
      where: { userId_subjectCode: { userId: session.user.id, subjectCode } },
    })
    if (!progress?.isCompleted) {
      return NextResponse.json({ success: false, error: 'Subject not completed yet' }, { status: 403 })
    }

    const result = await prisma.finalAssessmentResult.upsert({
      where: { userId_subjectCode: { userId: session.user.id, subjectCode } },
      create: { userId: session.user.id, subjectCode, score, totalQuestions: total, passed },
      update: { score, totalQuestions: total, passed, takenAt: new Date() },
    })

    let certificate = null
    if (passed) {
      const [user, subject] = await Promise.all([
        prisma.user.findUnique({
          where: { id: session.user.id },
          select: { name: true, profile: { select: { displayName: true } } },
        }),
        prisma.subject.findUnique({ where: { slug: subjectCode }, select: { name: true } }),
      ])
      const recipientName = user?.profile?.displayName ?? user?.name ?? 'Student'
      const subjectName = subject?.name ?? subjectCode
      const scorePct = Math.round((score / total) * 100)

      certificate = await prisma.subjectCertificate.upsert({
        where: { userId_subjectCode: { userId: session.user.id, subjectCode } },
        create: {
          userId: session.user.id,
          subjectCode,
          subjectName,
          certificateCode: genCertificateCode(),
          recipientName,
          totalLessons: progress.completedLessons.length,
          score: scorePct,
        },
        update: { score: scorePct, recipientName, subjectName },
      })
    }

    return NextResponse.json({ success: true, passed, result, certificate })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: err.errors[0].message }, { status: 400 })
    }
    console.error('[POST /api/final-assessment]', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
