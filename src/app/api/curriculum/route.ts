import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { generateJSON, buildCurriculumPrompt } from '@/lib/ai/client'
import { prisma } from '@/lib/db/prisma'
import type { Curriculum } from '@/types'

const schema = z.object({ subjectSlug: z.string() })

export async function GET(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const subject = searchParams.get('subject')
  if (!subject) return NextResponse.json({ success: false, error: 'subject param required' }, { status: 400 })

  try {
    const [lessons, progress] = await Promise.all([
      prisma.curriculum.findMany({
        where: { subjectCode: subject },
        orderBy: { order: 'asc' },
      }),
      prisma.studentProgress.findUnique({
        where: { userId_subjectCode: { userId: session.user.id, subjectCode: subject } },
      }),
    ])

    return NextResponse.json({
      success: true,
      lessons,
      progress: progress ?? { currentLesson: 1, completedLessons: [] },
    })
  } catch (err) {
    console.error('[GET /api/curriculum]', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const { subjectSlug } = schema.parse(body)

    const [profile, subject] = await Promise.all([
      prisma.profile.findUnique({ where: { userId: session.user.id } }),
      prisma.subject.findUnique({ where: { slug: subjectSlug } }),
    ])

    if (!profile) return NextResponse.json({ success: false, error: 'Profile not found' }, { status: 404 })
    if (!subject) return NextResponse.json({ success: false, error: 'Subject not found' }, { status: 404 })

    const prompt = buildCurriculumPrompt(subject.name, profile.selfDescription)

    const curriculum = await generateJSON(prompt) as Curriculum
    if (!curriculum) return NextResponse.json({ success: false, error: 'Failed to generate curriculum' }, { status: 502 })

    const learningPath = await prisma.learningPath.create({
      data: {
        userId: session.user.id,
        subjectId: subject.id,
        title: curriculum.title,
        curriculum,
        totalSteps: curriculum.steps.length,
      },
    })

    return NextResponse.json({ success: true, data: learningPath })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: err.errors[0].message }, { status: 400 })
    }
    console.error('[curriculum]', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
