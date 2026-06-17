import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'

const schema = z.object({
  subjectSlug: z.string(),
})

/**
 * POST /api/subjects/unenroll
 * Removes a subject from the learner's active subject list — soft-deactivate
 * only (ProfileSubject.isActive = false). Progress, sessions, and history
 * are never deleted, so re-enrolling via /api/subjects/enroll reactivates
 * the same record with everything intact.
 */
export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const { subjectSlug } = schema.parse(body)

    const profile = await prisma.profile.findUnique({ where: { userId: session.user.id } })
    if (!profile) return NextResponse.json({ success: false, error: 'Complete onboarding first' }, { status: 404 })

    const subject = await prisma.subject.findUnique({ where: { slug: subjectSlug } })
    if (!subject) return NextResponse.json({ success: false, error: 'Unknown subject' }, { status: 404 })

    const profileSubject = await prisma.profileSubject.findUnique({
      where: { profileId_subjectId: { profileId: profile.id, subjectId: subject.id } },
    })
    if (!profileSubject || !profileSubject.isActive) {
      return NextResponse.json({ success: false, error: 'Subject is not active' }, { status: 404 })
    }

    await prisma.profileSubject.update({
      where: { profileId_subjectId: { profileId: profile.id, subjectId: subject.id } },
      data: { isActive: false },
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: err.errors[0].message }, { status: 400 })
    }
    console.error('[subjects/unenroll]', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
