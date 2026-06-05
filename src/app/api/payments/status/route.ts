import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getPaymentStatus } from '@/lib/payments/yookassa'

export async function GET(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const paymentId = searchParams.get('id')
  if (!paymentId) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

  try {
    const status = await getPaymentStatus(paymentId)
    return NextResponse.json({ status })
  } catch (err) {
    console.error('[payments/status]', err)
    return NextResponse.json({ error: 'Failed to fetch status' }, { status: 500 })
  }
}
