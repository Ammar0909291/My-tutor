import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { computeLearningEffectiveness } from '@/lib/school/analytics/learningEffectiveness'

/**
 * Sprint EG — Learning Effectiveness Intelligence.
 * GET /api/analytics/learning-effectiveness
 * Returns per-user effectiveness scores and breakdowns.
 * Auth-gated: each user sees only their own data.
 */
export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const report = await computeLearningEffectiveness(session.user.id)
    return NextResponse.json(report)
  } catch (err) {
    console.error('[GET /api/analytics/learning-effectiveness]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
