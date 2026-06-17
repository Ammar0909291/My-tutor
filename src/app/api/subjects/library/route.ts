import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import type { Lang } from '@/lib/i18n'
import { CATEGORY_LABELS, VISIBLE_SUBJECT_LIBRARY, levelLabel, categoryLabel, localizedSubjectName, localizedSubjectDescription, type SubjectCategory } from '@/lib/curriculum/subjectCatalog'

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

  // Only active enrollments count as "enrolled" — a removed (isActive: false)
  // subject should show as available to add again, not stuck as enrolled.
  const enrolled = new Map(
    (profile?.subjects ?? []).filter((ps) => ps.isActive).map((ps) => [ps.subject.slug, ps]),
  )

  const lang = (profile?.teachingLanguage ?? 'en') as Lang

  const categories = (Object.keys(CATEGORY_LABELS) as SubjectCategory[]).map((category) => ({
    category,
    label: categoryLabel(category, lang),
    subjects: VISIBLE_SUBJECT_LIBRARY.filter((s) => s.category === category).map((s) => {
      const ps = enrolled.get(s.slug)
      return {
        slug: s.slug,
        name: localizedSubjectName(s, lang),
        icon: s.icon,
        description: localizedSubjectDescription(s, lang),
        moduleCount: s.modules.length,
        enrolled: !!ps,
        currentLevel: ps ? ps.currentLevelIndex : null,
        currentLevelLabel: ps ? levelLabel(ps.currentLevelIndex, lang) : null,
        targetLevel: ps?.targetLevelIndex ?? null,
        progressPercent: ps ? ps.progressPercent : 0,
        estimatedHoursLeft: ps?.estimatedHoursLeft ?? null,
      }
    }),
  }))

  return NextResponse.json({ success: true, categories })
}
