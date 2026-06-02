import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { stripe } from '@/lib/stripe/client'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { origin } = new URL(req.url)
    const subscription = await prisma.subscription.findUnique({ where: { userId: session.user.id } })

    if (!subscription?.stripeCustomerId) {
      return NextResponse.json({ success: false, error: 'No Stripe customer found' }, { status: 400 })
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: subscription.stripeCustomerId,
      return_url: `${origin}/settings`,
    })

    return NextResponse.json({ success: true, url: portalSession.url })
  } catch (err) {
    console.error('[stripe/portal]', err)
    return NextResponse.json({ success: false, error: 'Failed to create portal session' }, { status: 500 })
  }
}
