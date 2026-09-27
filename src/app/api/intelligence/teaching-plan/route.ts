/**
 * Teaching Plan API — Educational Intelligence Sprint 5, Task 4.
 *
 * GET only: returns the authenticated user's Sprint 4 difficulty `profile`
 * + LOW/MEDIUM/HIGH `difficulties`, the Sprint 4 adaptation `recommendations`,
 * and the new Sprint 5 `teachingPlan`. Read-only — never writes anything,
 * never touches Tutor Max / curriculum / grading / XP. Used only by the
 * dev-only Teaching Plan Viewer (Task 5); no production UI calls it, and
 * nothing consumes the plan this sprint.
 */
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { detectLearningDifficulties } from '@/lib/intelligence/learningDifficultyProfile'
import { getTeachingPlans } from '@/lib/intelligence/teachingPlan'
import { withRequestMemo } from '@/lib/db/requestMemo'

async function handleGET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { difficultyProfile, adaptations, teachingPlan } = await getTeachingPlans(session.user.id)
  const difficulties = detectLearningDifficulties(difficultyProfile)

  return NextResponse.json({
    profile: difficultyProfile,
    difficulties,
    recommendations: adaptations,
    teachingPlan,
  })
}

// One read per distinct query across this handler's loaders (egress, requestMemo.ts).
export function GET(...args: Parameters<typeof handleGET>) {
  return withRequestMemo(() => handleGET(...args))
}
