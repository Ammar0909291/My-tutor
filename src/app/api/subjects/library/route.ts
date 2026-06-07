import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { CATEGORY_LABELS, SUBJECT_LIBRARY, levelLabel } from '@/lib/curriculum/library'

/**
 * GET /api/subjects/library
 * Returns the full Subject Library (grouped by category) plus, for the
 * signed-in learner, which subjects they're already enrolled in and their
 * independent per-subject level/progress — so the UI can render
 * "Add" vs "Continue" without a second round trip.
 */
export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const profile = await prisma.profile.findUnique({
    where: { userId: session.user.id },
    include: { subjects: { include: { subject: true } } },
  })

  const enrolled = new Map(
    (profile?.subjects ?? []).map((ps) => [ps.subject.slug, ps]),
  )

  const categories = Object.entries(CATEGORY_LABELS).map(([category, label]) => ({
    category,
    label,
    subjects: SUBJECT_LIBRARY.filter((s) => s.category === category).map((s) => {
      const ps = enrolled.get(s.slug)
      return {
        slug: s.slug,
        name: s.name,
        icon: s.icon,
        description: s.description,
        moduleCount: s.modules.length,
        enrolled: !!ps,
        currentLevel: ps ? ps.currentLevelIndex : null,
        currentLevelLabel: ps ? levelLabel(ps.currentLevelIndex) : null,
        targetLevel: ps?.targetLevelIndex ?? null,
        progressPercent: ps ? ps.progressPercent : 0,
        estimatedHoursLeft: ps?.estimatedHoursLeft ?? null,
      }
    }),
  }))

  return NextResponse.json({ success: true, categories })
}
