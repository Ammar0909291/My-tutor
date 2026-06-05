import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { createPayment } from '@/lib/payments/yookassa'
import { PLANS, type PlanKey } from '@/lib/payments/plans'

const PLAN_AMOUNTS: Record<string, number> = {
  basic: 490,
  pro: 990,
  annual: 7900,
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = session.user.id

  const body = await req.json() as { plan?: string }
  const planKey = body.plan as PlanKey
  if (!planKey || !PLAN_AMOUNTS[planKey]) {
    return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
  }

  const amount = PLAN_AMOUNTS[planKey]
  const plan = PLANS[planKey]
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  try {
    const { id: yookassaId, confirmationUrl } = await createPayment(
      amount,
      'RUB',
      `My Tutor — план ${plan.name}`,
      `${appUrl}/payment/success?plan=${planKey}`,
      { userId, plan: planKey },
    )

    await prisma.payment.create({
      data: { userId, yookassaId, plan: planKey, amount, currency: 'RUB', status: 'pending' },
    })

    return NextResponse.json({ success: true, confirmationUrl })
  } catch (err) {
    console.error('[payments/create]', err)
    return NextResponse.json({ error: 'Payment creation failed' }, { status: 500 })
  }
}
