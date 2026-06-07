import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { generateJSON, buildCurriculumPrompt } from '@/lib/ai/client'
import { prisma } from '@/lib/db/prisma'
import type { Curriculum } from '@/types'
import { findLibrarySubject, renderCurriculumTree } from '@/lib/curriculum/library'

const schema = z.object({ subjectSlug: z.string() })

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

    // If this subject has a known curriculum tree (Subject Library), point the
    // generator at it so it follows prerequisites instead of inventing structure.
    const librarySubject = findLibrarySubject(subjectSlug)
    const treeBlock = librarySubject ? renderCurriculumTree(librarySubject) : null
    const prompt = buildCurriculumPrompt(subject.name, profile.selfDescription, treeBlock)

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
