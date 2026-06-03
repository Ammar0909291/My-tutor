import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        profile: true,
        subscription: true,
        _count: { select: { learnSessions: true } }
      }
    })
    return NextResponse.json({ user })
  } catch (err) {
    console.error('[profile GET]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const { name, levelDescription, voicePreference } = await req.json()

    const updates: Record<string, unknown> = {}
    if (name && name.length >= 2 && name.length <= 50) updates.name = name

    const [user] = await Promise.all([
      updates.name
        ? prisma.user.update({ where: { id: session.user.id }, data: { name: updates.name as string } })
        : prisma.user.findUnique({ where: { id: session.user.id } }),
      prisma.profile.updateMany({
        where: { userId: session.user.id },
        data: {
          ...(levelDescription ? { selfDescription: levelDescription } : {}),
          ...(voicePreference ? { voiceId: voicePreference } : {}),
        }
      })
    ])
    return NextResponse.json({ success: true, user })
  } catch (err) {
    console.error('[profile PATCH]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
