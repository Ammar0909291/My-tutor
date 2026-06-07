import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'

export async function DELETE() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  const userId = session.user.id

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, isDeleted: true },
    })

    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 })
    }
    if (user.isDeleted) {
      return NextResponse.json({ success: false, error: 'Account already deleted' }, { status: 400 })
    }

    // Rename email so the original address is free for future registration.
    // Format: deleted_<timestamp>_<originalEmail>
    const tombstone = `deleted_${Date.now()}_${user.email}`

    await prisma.$transaction([
      // Soft-delete the user and free the email
      prisma.user.update({
        where: { id: userId },
        data: {
          isDeleted: true,
          deletedAt: new Date(),
          email: tombstone,
          // Clear the session so any existing JWT can't be re-healed to this account
          emailVerified: null,
        },
      }),
      // Invalidate all database sessions
      prisma.authSession.deleteMany({ where: { userId } }),
    ])

    console.log(`[delete-account] Soft-deleted user ${userId}, email renamed to ${tombstone}`)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[delete-account]', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
