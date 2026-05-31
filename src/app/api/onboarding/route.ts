import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'

const schema = z.object({
  displayName: z.string().min(2).max(80),
  subjectSlug: z.string(),
  selfDescription: z.string().min(10).max(2000),
  voiceId: z.string().optional(),
})

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { displayName, subjectSlug, selfDescription, voiceId } = schema.parse(body)

    const subject = await prisma.subject.findUnique({ where: { slug: subjectSlug } })
    if (!subject) {
      return NextResponse.json({ success: false, error: 'Subject not found' }, { status: 404 })
    }

    // Check subjects table is seeded
    const existing = await prisma.profile.findUnique({ where: { userId: session.user.id } })
    if (existing) {
      return NextResponse.json({ success: false, error: 'Profile already exists' }, { status: 409 })
    }

    const profile = await prisma.profile.create({
      data: {
        userId: session.user.id,
        displayName,
        selfDescription,
        voiceId,
        subjects: {
          create: { subjectId: subject.id },
        },
      },
    })

    // Ensure subscription record exists
    await prisma.subscription.upsert({
      where: { userId: session.user.id },
      update: {},
      create: { userId: session.user.id },
    })

    return NextResponse.json({ success: true, data: profile })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: err.errors[0].message }, { status: 400 })
    }
    console.error('[onboarding]', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
