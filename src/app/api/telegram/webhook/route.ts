import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { sendTelegramMessage } from '@/lib/notifications/telegram'

// Pending email verifications: chatId → waiting for email reply
const pending = new Map<string, boolean>()

export async function POST(req: Request) {
  if (!process.env.TELEGRAM_BOT_TOKEN) {
    return NextResponse.json({ ok: false }, { status: 503 })
  }

  try {
    const body = await req.json()
    const msg = body?.message
    if (!msg) return NextResponse.json({ ok: true })

    const chatId = String(msg.chat?.id)
    const text = (msg.text ?? '').trim()

    if (text === '/start') {
      pending.set(chatId, true)
      await sendTelegramMessage(
        chatId,
        '👋 <b>My Tutor</b>\n\nTo connect reminders, please reply with the email address you used to register.',
      )
      return NextResponse.json({ ok: true })
    }

    if (pending.get(chatId)) {
      const email = text.toLowerCase()
      const user = await prisma.user.findUnique({ where: { email } })

      if (!user) {
        await sendTelegramMessage(chatId, '❌ Email not found. Please check the spelling and try again.')
        return NextResponse.json({ ok: true })
      }

      await prisma.user.update({ where: { id: user.id }, data: { telegramChatId: chatId } })
      pending.delete(chatId)

      const name = user.name ?? 'there'
      await sendTelegramMessage(
        chatId,
        `✅ <b>Connected!</b>\n\nHi ${name}! You'll now receive study reminders here when you haven't practiced in a while.\n\n🔥 Keep learning: ${process.env.NEXT_PUBLIC_APP_URL || 'https://mytutor.app'}/learn`,
      )
      return NextResponse.json({ ok: true })
    }

    // Unknown command
    await sendTelegramMessage(chatId, 'Send /start to connect your My Tutor account.')
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[telegram/webhook]', err)
    return NextResponse.json({ ok: true }) // always 200 to Telegram
  }
}
