import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'

const schema = z.object({
  subjectSlug: z.string(),
  selfDescription: z.string().min(10).max(2000),
  voiceChoice: z.string(),
  teachingLanguage: z.enum(['ru', 'en', 'hi']).default('en'),
})

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  const userId = session.user.id

  try {
    const body = await req.json()
    console.log('[onboarding] body:', JSON.stringify(body))
    const { subjectSlug, selfDescription, voiceChoice, teachingLanguage } = schema.parse(body)
    console.log('[onboarding] parsed ok, userId:', userId, 'subject:', subjectSlug)

    const subject = await prisma.subject.findUnique({ where: { slug: subjectSlug } })
    if (!subject) {
      return NextResponse.json({ success: false, error: 'Subject not found. Run the seed first.' }, { status: 404 })
    }

    const existingProfile = await prisma.profile.findUnique({ where: { userId } })
    if (existingProfile) {
      // Update existing profile with latest voice/language choice
      await prisma.profile.update({
        where: { userId },
        data: { voiceId: voiceChoice, teachingLanguage },
      })
      await prisma.user.update({ where: { id: userId }, data: { onboardingCompleted: true } })
      return NextResponse.json({ success: true, data: existingProfile })
    }

    // Run profile + learning path in a transaction; subscription separately (best-effort)
    const result = await prisma.$transaction(async (tx) => {
      const profile = await tx.profile.create({
        data: {
          userId,
          displayName: session.user.name ?? 'Student',
          selfDescription,
          voiceId: voiceChoice,
          teachingLanguage,
          subjects: { create: { subjectId: subject.id } },
        },
      })

      const learningPath = await tx.learningPath.create({
        data: {
          userId,
          subjectId: subject.id,
          title: `${subject.name} Course`,
          curriculum: { generated: false, steps: [], note: 'Curriculum will be generated at the start of first lesson' },
          totalSteps: 0,
          isActive: true,
        },
      })

      await tx.user.update({ where: { id: userId }, data: { onboardingCompleted: true } })

      return { profile, learningPath }
    })

    // Subscription upsert outside transaction — not critical, don't block onboarding
    try {
      await prisma.subscription.upsert({ where: { userId }, update: {}, create: { userId } })
    } catch (subErr) {
      console.warn('[onboarding] subscription upsert failed (non-fatal):', subErr)
    }

    console.log('[onboarding] success, profileId:', result.profile.id)
    return NextResponse.json({ success: true, data: result })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: err.errors[0].message }, { status: 400 })
    }
    console.error('[onboarding] ERROR:', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
