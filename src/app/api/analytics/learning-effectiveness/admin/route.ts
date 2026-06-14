import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { computePlatformEffectiveness } from '@/lib/school/analytics/learningEffectiveness'

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? '').split(',').map((e) => e.trim()).filter(Boolean)

/**
 * Sprint EG — Learning Effectiveness Intelligence (admin aggregate).
 * GET /api/analytics/learning-effectiveness/admin
 * Platform-wide effectiveness report — admin only.
 */
export async function GET() {
  const session = await auth()
  const email = session?.user?.email ?? ''
  if (!session?.user?.id || !ADMIN_EMAILS.includes(email)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const report = await computePlatformEffectiveness()
    return NextResponse.json(report)
  } catch (err) {
    console.error('[GET /api/analytics/learning-effectiveness/admin]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
