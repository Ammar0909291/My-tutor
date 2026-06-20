/**
 * Weighted Teaching Plan API — Educational Intelligence Sprint 9, Task 6.
 *
 * GET only: returns the authenticated user's `originalPlan` (Sprint 5),
 * `weightedPlan` (methods reordered by Sprint 8 effectiveness), and weighting
 * `insights`. Read-only — never writes, never changes teaching plans in place,
 * Tutor Max, curriculum, grading, XP, or schema. Used only by the dev-only
 * Weighted Teaching Plan Viewer (Task 7).
 */
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getWeightedTeachingPlanProfile } from '@/lib/intelligence/methodWeighting'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { originalPlan, weightedPlan, insights } = await getWeightedTeachingPlanProfile(session.user.id)
  return NextResponse.json({ originalPlan, weightedPlan, insights })
}
