/**
 * Practice Targets API — Educational Intelligence Sprint 2, Task 4.
 *
 * GET only: returns the authenticated user's `RevisionProfile` and
 * `RevisionRecommendations` (Sprint 1, reused unmodified) plus the new
 * priority-banded `PracticeTargetPlan` (Sprint 2, Tasks 2/3). Read-only —
 * the only new Prisma read is `TopicProgress.attempts`, added to the
 * existing Sprint 1 `TopicProgress` query. Used only by the dev-only
 * Practice Intelligence Viewer (Task 4); no production UI calls it this
 * sprint.
 */
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { getRevisionProfile } from '@/lib/intelligence/revisionProfile'
import { generateRevisionRecommendations } from '@/lib/intelligence/revisionRecommendations'
import { generatePracticeTargets } from '@/lib/intelligence/practiceTargets'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const profile = await getRevisionProfile(session.user.id)

  const studentProgressRows = await prisma.studentProgress.findMany({
    where: { userId: session.user.id },
    select: { subjectCode: true, lastStudiedAt: true },
  })
  const recommendations = generateRevisionRecommendations(profile, studentProgressRows)

  const attemptsRows = await prisma.topicProgress.findMany({
    where: { userId: session.user.id },
    select: { subjectSlug: true, topicSlug: true, attempts: true },
  })
  const targets = generatePracticeTargets(profile, attemptsRows)

  return NextResponse.json({ profile, recommendations, targets })
}
