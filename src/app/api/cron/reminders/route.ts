import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { sendStudyReminder } from '@/lib/notifications/email'
import { sendTelegramMessage } from '@/lib/notifications/telegram'

function isAuthorized(req: Request): boolean {
  const secret = process.env.CRON_SECRET
  if (!secret) return true
  return req.headers.get('authorization') === `Bearer ${secret}`
}

export async function GET(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)

    const staleProfiles = await prisma.profile.findMany({
      where: { lastStudyDate: { lt: twoDaysAgo } },
      include: { user: { select: { id: true, email: true, name: true, telegramChatId: true } } },
      take: 200,
    })

    let sent = 0
    await Promise.allSettled(
      staleProfiles.map(async (profile) => {
        const { email, name, telegramChatId } = profile.user
        const displayName = name ?? profile.displayName ?? 'Student'
        const lang = profile.teachingLanguage ?? 'en'
        const daysSince = profile.lastStudyDate
          ? Math.floor((Date.now() - new Date(profile.lastStudyDate).getTime()) / (24 * 60 * 60 * 1000))
          : 3

        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
        const reminderText: Record<string, string> = {
          ru: `🔥 Привет, ${displayName}! Ты не занимался ${daysSince} дня. Репетитор ждёт: ${appUrl}/learn`,
          en: `🔥 Hi ${displayName}! You haven't studied for ${daysSince} days. Your tutor is waiting: ${appUrl}/learn`,
          hi: `🔥 Namaste ${displayName}! ${daysSince} din se padhai nahi ki. Tutor wait kar raha hai: ${appUrl}/learn`,
        }

        await Promise.allSettled([
          email ? sendStudyReminder(email, displayName, lang, daysSince) : Promise.resolve(),
          telegramChatId ? sendTelegramMessage(telegramChatId, reminderText[lang] ?? reminderText.en) : Promise.resolve(),
        ])
        sent++
      }),
    )

    return NextResponse.json({ success: true, sent })
  } catch (err) {
    console.error('[cron/reminders]', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
