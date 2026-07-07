import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'
import { isSchoolSubject, SCHOOL_SUBJECT_META, isLibraryModeRequest } from '@/lib/school/schoolRouting'
import { MockTestQuiz } from '@/components/school/MockTestQuiz'
import { getLearningNavigatorAction } from '@/lib/school/navigation/learningNavigator'
import { CandyPage } from '@/components/ui/candy'

export default async function MockTestPage({ params, searchParams }: { params: { subject: string }, searchParams?: Record<string, string | string[] | undefined> }) {
  const session = await auth()
  if (!session?.user?.id) redirect('/auth/login')
  if (isLibraryModeRequest(searchParams)) redirect('/dashboard?mode=library')

  const profile = await withRetry(() =>
    prisma.profile.findUnique({
      where: { userId: session.user.id },
      select: { userType: true, educationBoard: true, grade: true },
    })
  )
  if (!profile?.educationBoard || !profile.grade) {
    redirect('/dashboard')
  }

  const { educationBoard: board, grade } = profile
  const subjectSlug = params.subject
  if (!isSchoolSubject(board, subjectSlug)) redirect('/dashboard')

  const m = SCHOOL_SUBJECT_META[subjectSlug] ?? { label: subjectSlug }

  // Sprint CQ: fetch Navigator for post-completion next step
  const navigatorAction = await getLearningNavigatorAction(session.user.id, board, grade).catch(() => null)

  return (
    <CandyPage legacy>
      <MockTestQuiz
        subjectSlug={subjectSlug}
        subjectLabel={m.label}
        backHref={`/school/${subjectSlug}`}
        navigatorAction={navigatorAction}
      />
    </CandyPage>
  )
}
