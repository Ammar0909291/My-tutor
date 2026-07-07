/**
 * Revision Profile API — Educational Intelligence Sprint 1, Task 2/3/4.
 *
 * GET only: returns the authenticated user's `RevisionProfile` (Task 2)
 * and `RevisionRecommendations` (Task 3). Read-only — never writes to
 * TopicProgress, StudentProgress, or EvidenceRecord. Used only by the
 * dev-only Revision Intelligence Viewer (Task 4); the route itself is a
 * normal authenticated route like every other route in the app, but no
 * production UI calls it this sprint.
 */
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { getRevisionProfile } from '@/lib/intelligence/revisionProfile'
import { generateRevisionRecommendations } from '@/lib/intelligence/revisionRecommendations'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const profile = await getRevisionProfile(session.user.id)

  const studentProgressRows = await prisma.studentProgress.findMany({
    where: { userId: session.user.id },
    select: { subjectCode: true, lastStudiedAt: true },
  })
  const recommendations = generateRevisionRecommendations(profile, studentProgressRows)

  return NextResponse.json({ profile, recommendations })
}
