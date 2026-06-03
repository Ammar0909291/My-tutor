import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'

async function resolveDbUserId(sessionId: string, sessionEmail?: string | null): Promise<string | null> {
  const byId = await prisma.user.findUnique({ where: { id: sessionId }, select: { id: true } })
  if (byId) return byId.id
  if (!sessionEmail) return null
  const byEmail = await prisma.user.findUnique({ where: { email: sessionEmail }, select: { id: true } })
  return byEmail?.id ?? null
}

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const dbUserId = await resolveDbUserId(session.user.id, session.user.email)
    if (!dbUserId) return NextResponse.json({ user: null })
    const user = await prisma.user.findUnique({
      where: { id: dbUserId },
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
    const dbUserId = await resolveDbUserId(session.user.id, session.user.email)
    if (!dbUserId) return NextResponse.json({ error: 'User not found' }, { status: 404 })
    const { name, levelDescription, voicePreference } = await req.json()

    const updates: Record<string, unknown> = {}
    if (name && name.length >= 2 && name.length <= 50) updates.name = name

    const [user] = await Promise.all([
      updates.name
        ? prisma.user.update({ where: { id: dbUserId }, data: { name: updates.name as string } })
        : prisma.user.findUnique({ where: { id: dbUserId } }),
      prisma.profile.updateMany({
        where: { userId: dbUserId },
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
