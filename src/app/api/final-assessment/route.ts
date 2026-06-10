import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'

const submitSchema = z.object({
  subjectCode: z.string(),
  score: z.number().int().min(0),
  total: z.number().int().positive(),
})

const PASS_THRESHOLD = 0.7

function genCertificateCode(): string {
  return `MT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
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
 * POST /api/final-assessment — submit a final-assessment score. Subject must
 * already be marked completed (StudentProgress.isCompleted). A score >= 70%
 * passes and issues a SubjectCertificate (idempotent per user/subject).
 */
export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const { subjectCode, score, total } = submitSchema.parse(body)

    const progress = await prisma.studentProgress.findUnique({
      where: { userId_subjectCode: { userId: session.user.id, subjectCode } },
    })
    if (!progress?.isCompleted) {
      return NextResponse.json({ success: false, error: 'Subject not completed yet' }, { status: 403 })
    }

    const passed = (score / total) >= PASS_THRESHOLD

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
