import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { SubjectType, type Subject } from '@prisma/client'
import { findLibrarySubject, type SubjectCategory } from '@/lib/curriculum/subjectCatalog'
import { normalizeToCanonicalLevel } from '@/lib/curriculum/levels'
import { getBoard } from '@/lib/education'
import { captureError } from '@/lib/monitoring'
import { schoolOnboardingSchema } from '@/lib/schoolOnboardingSchema'
import { shouldSkipSchoolOnboarding } from '@/lib/schoolOnboardingGuard'

// CRITICAL-3 (Sprint D): the old check matched any error whose message
// contained "Unique constraint", which could mask an unrelated write
// conflict (e.g. referralCode) as an "email already belongs to another
// row" case and silently resolve onboarding writes to the wrong user.
// Require the specific Prisma P2002-on-email signature before falling
// back to the existing-account-by-email resolution.
function isEmailUniqueConflict(err: unknown): boolean {
  const e = err as { code?: string; meta?: { target?: string[] | string } } | null
  if (!e || e.code !== 'P2002') return false
  const target = e.meta?.target
  return Array.isArray(target) ? target.includes('email') : target === 'email'
}

const CATEGORY_TO_TYPE: Record<SubjectCategory, SubjectType> = {
  languages: SubjectType.LANGUAGE,
  programming: SubjectType.PROGRAMMING,
  mathematics: SubjectType.MATHEMATICS,
  physics: SubjectType.PHYSICS,
  chemistry: SubjectType.CHEMISTRY,
  biology: SubjectType.BIOLOGY,
  ai: SubjectType.AI,
  computer_science: SubjectType.COMPUTER_SCIENCE,
}

const generalSchema = z.object({
  userType: z.literal('GENERAL_LEARNER').optional(),
  subjectSlug: z.string().optional(),
  subjectSlugs: z.array(z.string()).optional(),
  currentLevel: z.enum(['complete_beginner', 'beginner', 'intermediate', 'advanced', 'professional']).default('beginner'),
  // LOW-1: trim so 10 spaces doesn't pass as a valid description.
  selfDescription: z.string().trim().min(10, 'Please describe your learning goals (min 10 characters)').max(2000),
  voiceChoice: z.string(),
  teachingLanguage: z.enum(['ru', 'en', 'hi']).default('en'),
}).refine((b) => (b.subjectSlugs && b.subjectSlugs.length > 0) || !!b.subjectSlug, {
  message: 'At least one subject is required', path: ['subjectSlugs'],
})

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  const userId = session.user.id

  try {
    const body = await req.json()

    if (body?.userType === 'SCHOOL_STUDENT') {
      return handleSchoolStudent(session.user, userId, schoolOnboardingSchema.parse(body))
    }

    const parsed = generalSchema.parse(body)
    // Normalize onto the 3 canonical tiers (src/lib/curriculum/levels.ts) at
    // the point of storage — the wizard only ever sends beginner/intermediate/
    // advanced, but the schema still accepts two wider legacy values; storing
    // the normalized form means every downstream reader of Profile.currentLevel
    // only ever has to handle one system.
    const currentLevel = normalizeToCanonicalLevel(parsed.currentLevel)
    const { selfDescription, voiceChoice, teachingLanguage } = parsed
    // Accept either the legacy single `subjectSlug` or the new multi-select `subjectSlugs` — dedupe and keep order.
    const subjectSlugs = Array.from(new Set([
      ...(parsed.subjectSlugs ?? []),
      ...(parsed.subjectSlug ? [parsed.subjectSlug] : []),
    ]))

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
      if (isEmailUniqueConflict(upsertErr)) {
        // JWT session userId is absent from DB but email belongs to another account.
        // Do NOT silently merge — require the user to sign in again with a fresh session.
        console.warn('[onboarding] session userId absent from DB — session stale, sign-in required')
        return NextResponse.json({ success: false, error: 'Session expired. Please sign in again.' }, { status: 401 })
      }
      throw upsertErr
    }

    // Find/create each selected subject — same resolution as /api/subjects/enroll so the
    // full Subject Library (not just the original 4 seeded subjects) works at onboarding.
    const subjects: Subject[] = []
    for (const slug of subjectSlugs) {
      let subj = await prisma.subject.findUnique({ where: { slug } })
      if (!subj) {
        const librarySubject = findLibrarySubject(slug)
        if (!librarySubject) {
          return NextResponse.json({ success: false, error: `Invalid subject slug: ${slug}` }, { status: 400 })
        }
        subj = await prisma.subject.upsert({
          where: { slug: librarySubject.slug },
          update: {},
          create: {
            slug: librarySubject.slug,
            name: librarySubject.name,
            type: CATEGORY_TO_TYPE[librarySubject.category],
            description: librarySubject.description,
          },
        })
      }
      subjects.push(subj)
    }
    if (subjects.length === 0) {
      return NextResponse.json({ success: false, error: 'At least one subject is required' }, { status: 400 })
    }
    const subject = subjects[0]

    const existingProfile = await prisma.profile.findUnique({
      where: { userId: effectiveUserId },
      include: { subjects: true },
    })
    if (existingProfile) {
      // CRITICAL-2 (Sprint D): these writes used to run as separate, non-
      // transactional statements. An interrupted request between any two of
      // them (timeout, transient DB error) could leave a fully-valid Profile
      // committed while onboardingCompleted never flips to true — pages that
      // strictly gate on that flag (coach, quiz) would then bounce an
      // already-onboarded user back into the wizard. Wrapping in a single
      // transaction makes the resubmission all-or-nothing.
      await prisma.$transaction(async (tx) => {
        await tx.profile.update({
          where: { userId: effectiveUserId },
          data: { selfDescription, voiceId: voiceChoice, teachingLanguage, currentLevel },
        })
        // Ensure every selected subject is linked + has a learning path (may be missing if onboarding was interrupted)
        const linkedIds = new Set(existingProfile.subjects.map((s) => s.subjectId))
        for (const subj of subjects) {
          if (!linkedIds.has(subj.id)) {
            await tx.profileSubject.create({ data: { profileId: existingProfile.id, subjectId: subj.id } })
          }
          const existingPath = await tx.learningPath.findFirst({ where: { userId: effectiveUserId, subjectId: subj.id } })
          if (!existingPath) {
            await tx.learningPath.create({
              data: {
                userId: effectiveUserId,
                subjectId: subj.id,
                title: `${subj.name} Course`,
                curriculum: { generated: false, steps: [], note: 'Will be generated at first lesson' },
                totalSteps: 0,
                isActive: true,
              },
            })
          }
        }
        await tx.user.update({ where: { id: effectiveUserId }, data: { onboardingCompleted: true } })
      })
      return NextResponse.json({ success: true })
    }

    // Run profile + learning paths in a transaction; subscription separately (best-effort)
    const result = await prisma.$transaction(async (tx) => {
      const profile = await tx.profile.create({
        data: {
          userId: effectiveUserId,
          displayName: session.user.name ?? 'Student',
          selfDescription,
          currentLevel,
          voiceId: voiceChoice,
          teachingLanguage,
          subjects: { create: subjects.map((s) => ({ subjectId: s.id })) },
        },
      })

      const learningPaths = await Promise.all(subjects.map((s) => tx.learningPath.create({
        data: {
          userId: effectiveUserId,
          subjectId: s.id,
          title: `${s.name} Course`,
          curriculum: { generated: false, steps: [], note: 'Will be generated at first lesson' },
          totalSteps: 0,
          isActive: true,
        },
      })))

      await tx.user.update({ where: { id: effectiveUserId }, data: { onboardingCompleted: true } })

      return { profile, learningPaths }
    })

    // Subscription upsert outside transaction — not critical, don't block onboarding
    try {
      await prisma.subscription.upsert({ where: { userId: effectiveUserId }, update: {}, create: { userId: effectiveUserId } })
    } catch (subErr) {
      console.warn('[onboarding] subscription upsert failed (non-fatal):', subErr)
    }

    console.log('[onboarding] success')
    return NextResponse.json({ success: true, data: result })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: err.errors[0].message }, { status: 400 })
    }
    // CRITICAL-9 (Sprint D): never echo raw error text (Prisma constraint
    // names, field names, internal messages) back to the client — log full
    // detail server-side only, return a generic message.
    console.error('[onboarding] ERROR:', err)
    captureError(err, { route: 'api/onboarding' })
    return NextResponse.json({ success: false, error: 'Could not complete onboarding. Please try again.' }, { status: 500 })
  }
}

async function handleSchoolStudent(
  sessionUser: { name?: string | null; email?: string | null },
  userId: string,
  parsed: z.infer<typeof schoolOnboardingSchema>,
) {
  const { board, grade, teachingLanguage } = parsed

  const boardDef = getBoard(board)
  if (!boardDef) {
    return NextResponse.json({ success: false, error: `Unknown board: ${board}` }, { status: 400 })
  }
  if (!boardDef.grades.includes(grade)) {
    return NextResponse.json({ success: false, error: `Grade ${grade} is not offered by ${boardDef.shortName}` }, { status: 400 })
  }

  // Same stale-JWT guard as the general path — reject instead of silently merging accounts.
  let effectiveUserId = userId
  try {
    await prisma.user.upsert({
      where: { id: userId },
      update: { name: sessionUser.name ?? undefined },
      create: {
        id: userId,
        email: sessionUser.email ?? `${userId}@mytutor.local`,
        name: sessionUser.name ?? 'Student',
      },
    })
  } catch (upsertErr: unknown) {
    if (isEmailUniqueConflict(upsertErr)) {
      console.warn('[onboarding] session userId absent from DB — session stale, sign-in required')
      return NextResponse.json({ success: false, error: 'Session expired. Please sign in again.' }, { status: 401 })
    }
    throw upsertErr
  }

  const schoolFields = {
    userType: 'SCHOOL_STUDENT' as const,
    educationBoard: boardDef.id,
    grade,
    teachingLanguage,
    country: 'in',
  }

  await prisma.$transaction(async (tx) => {
    const existing = await tx.profile.findUnique({ where: { userId: effectiveUserId } })
    const user = await tx.user.findUnique({ where: { id: effectiveUserId }, select: { onboardingCompleted: true } })

    if (shouldSkipSchoolOnboarding(existing, user?.onboardingCompleted)) {
      // LOW-4: guard against silent data loss — do not overwrite board/grade for a
      // fully-completed school onboarding. Return without error so the client can
      // redirect to the dashboard as if onboarding had just completed.
      return
    }

    if (existing) {
      await tx.profile.update({ where: { userId: effectiveUserId }, data: schoolFields })
    } else {
      await tx.profile.create({
        data: {
          userId: effectiveUserId,
          displayName: sessionUser.name ?? 'Student',
          selfDescription: `Class ${grade} student (${boardDef.shortName})`,
          ...schoolFields,
        },
      })
    }
    await tx.user.update({ where: { id: effectiveUserId }, data: { onboardingCompleted: true } })
  })

  try {
    await prisma.subscription.upsert({ where: { userId: effectiveUserId }, update: {}, create: { userId: effectiveUserId } })
  } catch (subErr) {
    console.warn('[onboarding] subscription upsert failed (non-fatal):', subErr)
  }

  console.log('[onboarding] success')
  return NextResponse.json({ success: true })
}
