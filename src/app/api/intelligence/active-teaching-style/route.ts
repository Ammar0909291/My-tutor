/**
 * Active Teaching Style API — Educational Intelligence Sprint 11, Task 4.
 *
 * GET only: returns the authenticated learner's active `teachingStyle`
 * (difficulty + weighted methods + priorities) and a plain-English
 * `explanation` of why Tutor Max teaches this way. Read-only — never writes,
 * never changes any intelligence, Tutor Max, curriculum, grading, or XP.
 * Visibility only.
 */
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getActiveTeachingStyle } from '@/lib/intelligence/activeTeachingStyle'
import { withRequestMemo } from '@/lib/db/requestMemo'

async function handleGET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { teachingStyle, explanation } = await getActiveTeachingStyle(session.user.id)
  return NextResponse.json({ teachingStyle, explanation })
}

// One read per distinct query across this handler's loaders (egress, requestMemo.ts).
export function GET(...args: Parameters<typeof handleGET>) {
  return withRequestMemo(() => handleGET(...args))
}
