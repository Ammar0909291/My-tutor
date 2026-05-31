import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'

const schema = z.object({
  subjectSlug: z.string(),
  selfDescription: z.string().min(10).max(2000),
  voiceChoice: z.string(),
})

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  const userId = session.user.id

  try {
    const body = await req.json()
    const { subjectSlug, selfDescription, voiceChoice } = schema.parse(body)

    const subject = await prisma.subject.findUnique({ where: { slug: subjectSlug } })
    if (!subject) {
      return NextResponse.json({ success: false, error: 'Subject not found. Run the seed first.' }, { status: 404 })
    }

    const existingProfile = await prisma.profile.findUnique({ where: { userId } })
    if (existingProfile) {
      // Backfill the flag for users who completed onboarding before this column existed
      await prisma.user.update({ where: { id: userId }, data: { onboardingCompleted: true } })
      return NextResponse.json({ success: true, data: existingProfile })
    }

    // Run all writes in a transaction
    const result = await prisma.$transaction(async (tx) => {
      const profile = await tx.profile.create({
        data: {
          userId,
          displayName: session.user.name ?? 'Студент',
          selfDescription,
          voiceId: voiceChoice,
          subjects: { create: { subjectId: subject.id } },
        },
      })

      // Placeholder learning path — curriculum generated on first lesson
      const learningPath = await tx.learningPath.create({
        data: {
          userId,
          subjectId: subject.id,
          title: `Курс по ${subject.name}`,
          curriculum: {
            generated: false,
            steps: [],
            note: 'Curriculum will be generated at the start of first lesson',
          },
          totalSteps: 0,
          isActive: true,
        },
      })

      // Mark onboarding done + ensure subscription record
      await Promise.all([
        tx.user.update({
          where: { id: userId },
          data: { onboardingCompleted: true },
        }),
        tx.subscription.upsert({
          where: { userId },
          update: {},
          create: { userId },
        }),
      ])

      return { profile, learningPath }
    })

    return NextResponse.json({ success: true, data: result })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: err.errors[0].message }, { status: 400 })
    }
    console.error('[onboarding]', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
