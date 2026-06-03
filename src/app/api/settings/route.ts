import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'

const schema = z.object({
  voiceId: z.string().optional(),
  teachingLanguage: z.enum(['ru', 'en', 'hi']).optional(),
})

async function resolveDbUserId(sessionId: string, sessionEmail?: string | null): Promise<string | null> {
  const byId = await prisma.user.findUnique({ where: { id: sessionId }, select: { id: true } })
  if (byId) return byId.id
  if (!sessionEmail) return null
  const byEmail = await prisma.user.findUnique({ where: { email: sessionEmail }, select: { id: true } })
  return byEmail?.id ?? null
}

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const dbUserId = await resolveDbUserId(session.user.id, session.user.email)
  if (!dbUserId) return NextResponse.json({ success: true, data: { voiceId: 'male', teachingLanguage: 'en', subscriptionStatus: 'FREE', freeSessionUsed: false } })

  const [profile, subscription] = await Promise.all([
    prisma.profile.findUnique({ where: { userId: dbUserId } }),
    prisma.subscription.findUnique({ where: { userId: dbUserId } }),
  ])

  return NextResponse.json({
    success: true,
    data: {
      voiceId: profile?.voiceId ?? 'male',
      teachingLanguage: profile?.teachingLanguage ?? 'en',
      subscriptionStatus: subscription?.status ?? 'FREE',
      freeSessionUsed: subscription?.freeSessionUsed ?? false,
    },
  })
}

export async function PATCH(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const { voiceId, teachingLanguage } = schema.parse(body)

    const data: { voiceId?: string; teachingLanguage?: 'ru' | 'en' | 'hi' } = {}
    if (voiceId !== undefined) data.voiceId = voiceId
    if (teachingLanguage !== undefined) data.teachingLanguage = teachingLanguage

    if (Object.keys(data).length === 0) return NextResponse.json({ success: true })

    const dbUserId = await resolveDbUserId(session.user.id, session.user.email)
    if (!dbUserId) return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 })

    await prisma.profile.upsert({
      where: { userId: dbUserId },
      update: data,
      create: {
        userId: dbUserId,
        displayName: session.user.name ?? 'Student',
        selfDescription: 'Beginner',
        voiceId: data.voiceId ?? 'male',
        teachingLanguage: data.teachingLanguage ?? 'en',
      },
    })
    return NextResponse.json({ success: true })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: err.errors[0].message }, { status: 400 })
    }
    console.error('[settings/PATCH]', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
