/**
 * Retest Candidates API — Educational Intelligence Sprint 3, Task 4.
 *
 * GET only: returns the authenticated user's `RevisionProfile` and
 * `PracticeTargetPlan` (Sprints 1/2, reused unmodified) plus the new
 * priority-banded `RetestCandidatePlan` (Sprint 3, Tasks 2/3). Read-only —
 * no new Prisma reads are needed beyond what Sprint 2's pipeline already
 * fetches. Used only by the dev-only Retest Intelligence Viewer (Task 4);
 * no production UI calls it this sprint.
 */
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { getRevisionProfile } from '@/lib/intelligence/revisionProfile'
import { generatePracticeTargets } from '@/lib/intelligence/practiceTargets'
import { generateRetestCandidates } from '@/lib/intelligence/retestCandidates'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const profile = await getRevisionProfile(session.user.id)

  const attemptsRows = await prisma.topicProgress.findMany({
    where: { userId: session.user.id },
    select: { subjectSlug: true, topicSlug: true, attempts: true },
  })
  const targets = generatePracticeTargets(profile, attemptsRows)
  const retestCandidates = generateRetestCandidates(targets)

  return NextResponse.json({ profile, targets, retestCandidates })
}
