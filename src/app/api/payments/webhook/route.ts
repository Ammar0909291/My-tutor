import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { sendStudyReminder } from '@/lib/notifications/email'

function planExpiry(plan: string): Date {
  const now = new Date()
  if (plan === 'annual') {
    now.setFullYear(now.getFullYear() + 1)
  } else {
    now.setMonth(now.getMonth() + 1)
  }
  return now
}

export async function POST(req: Request) {
  try {
    const body = await req.json() as {
      event: string
      object: {
        id: string
        status: string
        metadata?: Record<string, string>
      }
    }

    if (body.event === 'payment.succeeded') {
      const { id: yookassaId, metadata } = body.object
      const userId = metadata?.userId
      const plan = metadata?.plan

      if (!userId || !plan) {
        return NextResponse.json({ ok: true })
      }

      await prisma.payment.updateMany({
        where: { yookassaId },
        data: { status: 'succeeded' },
      })

      await prisma.subscription.upsert({
        where: { userId },
        create: {
          userId,
          plan,
          planExpiresAt: planExpiry(plan),
          lessonsThisMonth: 0,
          monthResetAt: new Date(),
        },
        update: {
          plan,
          planExpiresAt: planExpiry(plan),
          lessonsThisMonth: 0,
          monthResetAt: new Date(),
        },
      })

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { email: true, name: true },
      })
      if (user?.email) {
        const planNames: Record<string, string> = { basic: 'Basic', pro: 'Pro', annual: 'Pro Годовой' }
        await sendStudyReminder(user.email, user.name ?? 'Student', 'ru', 0).catch(() => {})
        console.log(`[webhook] Plan ${planNames[plan]} activated for ${user.email}`)
      }
    }

    if (body.event === 'payment.canceled') {
      const { id: yookassaId } = body.object
      await prisma.payment.updateMany({
        where: { yookassaId },
        data: { status: 'canceled' },
      })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[payments/webhook]', err)
    return NextResponse.json({ ok: true })
  }
}
