import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { referralCode: true, freeSessionsExtra: true },
  })

  const referralCount = await prisma.referral.count({
    where: { referrerId: session.user.id, used: true },
  })

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  return NextResponse.json({
    success: true,
    code: user?.referralCode ?? null,
    link: user?.referralCode ? `${appUrl}/join?ref=${user.referralCode}` : null,
    referralCount,
    freeSessionsExtra: user?.freeSessionsExtra ?? 0,
  })
}

const applySchema = z.object({ code: z.string().min(1).max(20) })

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  try {
    const { code } = applySchema.parse(await req.json())

    // Find referrer by code
    const referrer = await prisma.user.findUnique({ where: { referralCode: code } })
    if (!referrer) return NextResponse.json({ success: false, error: 'Invalid referral code' }, { status: 404 })
    if (referrer.id === session.user.id) return NextResponse.json({ success: false, error: 'Cannot use your own code' }, { status: 400 })

    // Check not already referred
    const me = await prisma.user.findUnique({ where: { id: session.user.id }, select: { referredBy: true } })
    if (me?.referredBy) return NextResponse.json({ success: false, error: 'Already applied a referral code' }, { status: 400 })

    await Promise.all([
      prisma.user.update({ where: { id: session.user.id }, data: { referredBy: referrer.id, freeSessionsExtra: { increment: 1 } } }),
      prisma.user.update({ where: { id: referrer.id }, data: { freeSessionsExtra: { increment: 1 } } }),
      prisma.referral.create({ data: { referrerId: referrer.id, referredId: session.user.id, code, used: true, usedAt: new Date() } }),
    ])

    return NextResponse.json({ success: true, message: 'Referral applied — both you and your friend got +1 free session!' })
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ success: false, error: err.errors[0].message }, { status: 400 })
    console.error('[referral POST]', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
