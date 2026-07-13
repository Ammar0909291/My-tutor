import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { isAdmin } from '@/lib/auth/admin'
import { sendTestEmail } from '@/lib/email'
import { checkRateLimit, rateLimitResponse, getClientIp } from '@/lib/rateLimit'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!(await isAdmin(session.user.id))) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  // Admin-only, but still bounded — this triggers a real SMTP connection.
  const { allowed } = await checkRateLimit(`rl:admin-test-email:${getClientIp(req)}`, 5, 900)
  if (!allowed) return rateLimitResponse()

  const body = await req.json().catch(() => ({}))
  const to = typeof body.to === 'string' ? body.to.trim() : session.user.email
  if (!to || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
    return NextResponse.json({ error: 'Invalid recipient email' }, { status: 400 })
  }

  const diagnostics = await sendTestEmail(to)
  return NextResponse.json({ to, ...diagnostics })
}
