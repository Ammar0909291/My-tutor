import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { SubjectType } from '@prisma/client'
import { findLibrarySubject, type SubjectCategory } from '@/lib/curriculum/subjectCatalog'

const schema = z.object({
  subjectSlug: z.string(),
  targetLevel: z.number().int().min(0).max(5).optional(),
})

const CATEGORY_TO_TYPE: Record<SubjectCategory, SubjectType> = {
  languages: SubjectType.LANGUAGE,
  programming: SubjectType.PROGRAMMING,
  mathematics: SubjectType.MATHEMATICS,
  physics: SubjectType.PHYSICS,
  chemistry: SubjectType.CHEMISTRY,
  biology: SubjectType.BIOLOGY,
  ai: SubjectType.AI,
}

/**
 * POST /api/subjects/enroll
 * Adds a subject from the Subject Library to the learner's active subjects —
 * additive only: existing enrollments and their progress are untouched.
 * This is how a learner "adds a new subject anytime" without going back
 * through onboarding (which remains a single-subject first-time flow).
 */
export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const { subjectSlug, targetLevel } = schema.parse(body)

    const librarySubject = findLibrarySubject(subjectSlug)
    if (!librarySubject) {
      return NextResponse.json({ success: false, error: 'Unknown subject' }, { status: 404 })
    }

    const profile = await prisma.profile.findUnique({ where: { userId: session.user.id } })
    if (!profile) return NextResponse.json({ success: false, error: 'Complete onboarding first' }, { status: 404 })

    // Subjects are shared rows keyed by slug — create on first enrollment by anyone.
    const subject = await prisma.subject.upsert({
      where: { slug: librarySubject.slug },
      update: {},
      create: {
        slug: librarySubject.slug,
        name: librarySubject.name,
        type: CATEGORY_TO_TYPE[librarySubject.category],
        description: librarySubject.description,
      },
    })

    const profileSubject = await prisma.profileSubject.upsert({
      where: { profileId_subjectId: { profileId: profile.id, subjectId: subject.id } },
      update: { isActive: true, ...(targetLevel !== undefined ? { targetLevelIndex: targetLevel } : {}) },
      create: {
        profileId: profile.id,
        subjectId: subject.id,
        currentLevelIndex: 0,
        targetLevelIndex: targetLevel ?? null,
      },
    })

    const existingPath = await prisma.learningPath.findFirst({ where: { userId: session.user.id, subjectId: subject.id } })
    if (!existingPath) {
      await prisma.learningPath.create({
        data: {
          userId: session.user.id,
          subjectId: subject.id,
          title: `${subject.name} Course`,
          curriculum: { generated: false, steps: [], note: 'Will be generated at first lesson' },
          totalSteps: 0,
          isActive: true,
        },
      })
    }

    return NextResponse.json({ success: true, data: { subject, profileSubject } })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: err.errors[0].message }, { status: 400 })
    }
    console.error('[subjects/enroll]', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
