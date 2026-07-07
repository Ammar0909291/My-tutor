import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { getBoard } from '@/lib/education'

export async function GET() {
  try {
    const session = await auth()

    if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // MED-1: explicit select allowlist so no future column leaks automatically.
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true, name: true, email: true, image: true,
        onboardingCompleted: true, xpPoints: true, referralCode: true,
        createdAt: true, updatedAt: true,
        profile: true,
        _count: { select: { learnSessions: true } },
      },
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
    const { name, levelDescription, voicePreference, educationBoard, grade } = await req.json()

    // LOW-1: trim before length check so whitespace-only strings are rejected.
    const trimmedName = typeof name === 'string' ? name.trim() : ''
    const nameValid = trimmedName.length >= 2 && trimmedName.length <= 50
    if (nameValid) {
      await prisma.user.update({ where: { id: session.user.id }, data: { name: trimmedName } })
    }

    const profileData: Record<string, unknown> = {}
    // The dashboard greeting, avatar, and lesson screen all render
    // profile.displayName — so a name change must update displayName too,
    // otherwise the new name persists to user.name but never reaches the header.
    if (nameValid) profileData.displayName = trimmedName
    if (levelDescription !== undefined) profileData.selfDescription = levelDescription
    if (voicePreference !== undefined) profileData.voiceId = voicePreference

    // School fields (Sprint BF) — only accepted together so board/grade can't
    // get out of sync; validated against the education board registry.
    if (educationBoard !== undefined || grade !== undefined) {
      const boardDef = typeof educationBoard === 'string' ? getBoard(educationBoard) : undefined
      if (!boardDef) {
        return NextResponse.json({ error: 'Unknown board' }, { status: 400 })
      }
      if (typeof grade !== 'number' || !boardDef.grades.includes(grade)) {
        return NextResponse.json({ error: `Grade must be one of ${boardDef.grades.join(', ')} for ${boardDef.shortName}` }, { status: 400 })
      }
      profileData.userType = 'SCHOOL_STUDENT'
      profileData.educationBoard = boardDef.id
      profileData.grade = grade
    }

    if (Object.keys(profileData).length > 0) {
      await prisma.profile.upsert({
        where: { userId: session.user.id },
        update: profileData,
        create: {
          userId: session.user.id,
          displayName: name || 'Student',
          selfDescription: (levelDescription as string) || '',
          voiceId: (voicePreference as string) || 'female',
        },
      })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true, name: true, email: true, image: true,
        onboardingCompleted: true, xpPoints: true, referralCode: true,
        createdAt: true, updatedAt: true,
        profile: true,
        _count: { select: { learnSessions: true } },
      },
    })
    return NextResponse.json({ success: true, user })
  } catch (err) {
    console.error('[profile PATCH]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
