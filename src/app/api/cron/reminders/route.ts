import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { sendStudyReminder } from '@/lib/notifications/email'

// Vercel cron calls this with the CRON_SECRET header for auth
function isAuthorized(req: Request): boolean {
  const secret = process.env.CRON_SECRET
  if (!secret) return true // dev: allow without secret
  const auth = req.headers.get('authorization')
  return auth === `Bearer ${secret}`
}

export async function GET(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)

    // Find users who haven't studied in 2+ days and have email
    const staleProfiles = await prisma.profile.findMany({
      where: {
        lastStudyDate: { lt: twoDaysAgo },
        user: { email: { not: undefined } },
      },
      include: {
        user: { select: { email: true, name: true } },
      },
      take: 200,
    })

    let sent = 0
    await Promise.allSettled(
      staleProfiles.map(async (profile) => {
        const email = profile.user.email
        if (!email) return
        const name = profile.user.name ?? profile.displayName ?? 'Student'
        const lang = profile.teachingLanguage ?? 'en'
        const daysSince = profile.lastStudyDate
          ? Math.floor((Date.now() - new Date(profile.lastStudyDate).getTime()) / (24 * 60 * 60 * 1000))
          : 3
        await sendStudyReminder(email, name, lang, daysSince)
        sent++
      }),
    )

    return NextResponse.json({ success: true, sent })
  } catch (err) {
    console.error('[cron/reminders]', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
