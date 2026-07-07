/**
 * Adaptation Effectiveness API — Educational Intelligence Sprint 7, Task 6.
 *
 * GET only: returns the authenticated user's adaptation-effectiveness
 * `effectiveness` (per-topic before→after mastery vs. teaching methods) and
 * advisory `insights` (per-method). Read-only — never writes, never changes
 * teaching plans / Tutor Max / curriculum / grading / XP / schema. Used only
 * by the dev-only Adaptation Effectiveness Viewer (Task 7).
 */
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getAdaptationEffectivenessProfile } from '@/lib/intelligence/adaptationEffectiveness'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { effectiveness, insights } = await getAdaptationEffectivenessProfile(session.user.id)
  return NextResponse.json({ effectiveness, insights })
}
