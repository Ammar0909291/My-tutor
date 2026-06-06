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

    // JWT sessions outlive DB records. If the session userId doesn't exist in the DB
    // but the email does (different row), resolve to the existing user's id.
    let effectiveUserId = userId
    try {
      await prisma.user.upsert({
        where: { id: userId },
        update: { name: session.user.name ?? undefined },
        create: {
          id: userId,
          email: session.user.email ?? `${userId}@mytutor.local`,
          name: session.user.name ?? 'Student',
        },
      })
    } catch (upsertErr: unknown) {
      if (upsertErr instanceof Error && upsertErr.message.includes('Unique constraint')) {
        // Email already belongs to a different DB row — find that user and use their id
        const byEmail = session.user.email
          ? await prisma.user.findUnique({ where: { email: session.user.email } })
          : null
        if (!byEmail) throw upsertErr
        console.warn('[onboarding] session userId mismatch — resolved to existing user', byEmail.id)
        effectiveUserId = byEmail.id
      } else {
        throw upsertErr
      }
    }

    // Find subject — fall back to upsert with slug so onboarding works without seed
    let subject = await prisma.subject.findUnique({ where: { slug: subjectSlug } })
    if (!subject) {
      const SLUG_TO_TYPE: Record<string, 'C'|'CPP'|'PYTHON'|'ENGLISH'> = {
        c: 'C', cpp: 'CPP', python: 'PYTHON', english: 'ENGLISH',
      }
      const type = SLUG_TO_TYPE[subjectSlug]
      if (!type) {
        return NextResponse.json({ success: false, error: 'Invalid subject slug' }, { status: 400 })
      }
      subject = await prisma.subject.upsert({
        where: { slug: subjectSlug },
        update: {},
        create: { slug: subjectSlug, name: subjectSlug.charAt(0).toUpperCase() + subjectSlug.slice(1), type },
      })
    }

    const existingProfile = await prisma.profile.findUnique({ where: { userId: effectiveUserId } })
    if (existingProfile) {
      await prisma.profile.update({
        where: { userId: effectiveUserId },
        data: { selfDescription, voiceId: voiceChoice, teachingLanguage },
      })
      await prisma.user.update({ where: { id: effectiveUserId }, data: { onboardingCompleted: true } })
      return NextResponse.json({ success: true })
    }

    // Run profile + learning path in a transaction; subscription separately (best-effort)
    const result = await prisma.$transaction(async (tx) => {
      const profile = await tx.profile.create({
        data: {
          userId: effectiveUserId,
          displayName: session.user.name ?? 'Student',
          selfDescription,
          voiceId: voiceChoice,
          teachingLanguage,
          subjects: { create: { subjectId: subject!.id } },
        },
      })

      const learningPath = await tx.learningPath.create({
        data: {
          userId: effectiveUserId,
          subjectId: subject!.id,
          title: `${subject!.name} Course`,
          curriculum: { generated: false, steps: [], note: 'Will be generated at first lesson' },
          totalSteps: 0,
          isActive: true,
        },
      })

      await tx.user.update({ where: { id: effectiveUserId }, data: { onboardingCompleted: true } })

      return { profile, learningPath }
    })

    // Subscription upsert outside transaction — not critical, don't block onboarding
    try {
      await prisma.subscription.upsert({ where: { userId: effectiveUserId }, update: {}, create: { userId: effectiveUserId } })
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
    const errMsg = err instanceof Error ? err.message : String(err)
    console.error('[onboarding] FULL ERROR:', errMsg)
    return NextResponse.json({ success: false, error: errMsg }, { status: 500 })
  }
}
