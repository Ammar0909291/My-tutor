/**
 * Method Effectiveness API — Educational Intelligence Sprint 8, Task 6.
 *
 * GET only: returns the authenticated user's per-method effectiveness
 * `methods`, `rankings` (best→worst), `preferredMethods` (strongest/weakest),
 * and advisory `insights`. Read-only — never writes, never changes teaching
 * plans / Tutor Max / curriculum / grading / XP / schema. Used only by the
 * dev-only Method Effectiveness Viewer (Task 7).
 */
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getMethodEffectivenessProfile } from '@/lib/intelligence/methodEffectiveness'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { methods, rankings, preferredMethods, insights } = await getMethodEffectivenessProfile(session.user.id)
  return NextResponse.json({ methods, rankings, preferredMethods, insights })
}
