import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'

const schema = z.object({
  voiceId: z.string().optional(),
  teachingLanguage: z.enum(['ru', 'en', 'hi']).optional(),
})

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const [profile, subscription] = await Promise.all([
    prisma.profile.findUnique({ where: { userId: session.user.id } }),
    prisma.subscription.findUnique({ where: { userId: session.user.id } }),
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

    if (Object.keys(data).length === 0) {
      return NextResponse.json({ success: true })
    }

    await prisma.profile.update({ where: { userId: session.user.id }, data })
    return NextResponse.json({ success: true })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: err.errors[0].message }, { status: 400 })
    }
    console.error('[settings/PATCH]', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
