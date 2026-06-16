import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { isAdmin } from '@/lib/auth/admin'
import { computePlatformEffectiveness } from '@/lib/school/analytics/learningEffectiveness'

/**
 * Sprint EG — Learning Effectiveness Intelligence (admin aggregate).
 * GET /api/analytics/learning-effectiveness/admin
 * Platform-wide effectiveness report — admin only.
 *
 * MED-3: standardized to use isAdmin(userId) (DB role check) consistent with
 * all other admin routes. The previous ADMIN_EMAILS env-var check diverged
 * from the platform's authoritative admin model.
 */
export async function GET() {
  const session = await auth()
  if (!session?.user?.id || !(await isAdmin(session.user.id))) {
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
