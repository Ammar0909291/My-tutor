import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'

const schema = z.object({
  voiceId: z.string().max(100).optional(),
  teachingLanguage: z.enum(['ru', 'en', 'hi']).optional(),
  country: z.enum(['ru', 'in', 'global']).optional(),
  voiceSpeed: z.union([
    z.literal(0.5), z.literal(0.75), z.literal(1.0), z.literal(1.25), z.literal(1.5),
  ]).optional(),
})

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const profile = await prisma.profile.findUnique({ where: { userId: session.user.id } })

  return NextResponse.json({
    success: true,
    data: {
      voiceId: profile?.voiceId ?? 'male',
      teachingLanguage: profile?.teachingLanguage ?? 'en',
      country: (profile as any)?.country ?? 'global',
      voiceSpeed: profile?.voiceSpeed ?? 1.0,
    },
  })
}

export async function PATCH(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const { voiceId, teachingLanguage, country, voiceSpeed } = schema.parse(body)

    const data: { voiceId?: string; teachingLanguage?: 'ru' | 'en' | 'hi'; country?: string; voiceSpeed?: number } = {}
    if (voiceId !== undefined) data.voiceId = voiceId
    if (teachingLanguage !== undefined) data.teachingLanguage = teachingLanguage
    if (country !== undefined) data.country = country
    if (voiceSpeed !== undefined) data.voiceSpeed = voiceSpeed

    if (Object.keys(data).length === 0) return NextResponse.json({ success: true })

    const userId = session.user.id
    await prisma.profile.upsert({
      where: { userId },
      update: data,
      create: {
        userId,
        displayName: session.user.name ?? 'Student',
        selfDescription: 'Beginner',
        voiceId: data.voiceId ?? 'male',
        teachingLanguage: data.teachingLanguage ?? 'en',
        country: data.country ?? 'global',
        voiceSpeed: data.voiceSpeed ?? 1.0,
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
