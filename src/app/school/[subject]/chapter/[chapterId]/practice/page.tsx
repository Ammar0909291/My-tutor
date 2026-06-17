import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'
import { getSchoolChapters, isSchoolSubject, chapterDisplayTitle, isLibraryModeRequest } from '@/lib/school/schoolRouting'
import { PracticeQuiz } from '@/components/school/PracticeQuiz'
import { getLearningNavigatorAction } from '@/lib/school/navigation/learningNavigator'
import { CandyPage } from '@/components/ui/candy'

export default async function ChapterPracticePage({ params, searchParams }: { params: { subject: string; chapterId: string }, searchParams?: Record<string, string | string[] | undefined> }) {
  const session = await auth()
  if (!session?.user?.id) redirect('/auth/login')
  if (isLibraryModeRequest(searchParams)) redirect('/dashboard?mode=library')

  const profile = await withRetry(() =>
    prisma.profile.findUnique({
      where: { userId: session.user.id },
      select: { userType: true, educationBoard: true, grade: true },
    }),
  )
  if (!profile?.educationBoard || !profile.grade) redirect('/dashboard')

  const { educationBoard: board, grade } = profile
  const subjectSlug = params.subject
  if (!isSchoolSubject(board, subjectSlug)) redirect('/dashboard')

  const chapters = getSchoolChapters(board, subjectSlug, grade)
  const chapter = chapters.find((c) => c.id === params.chapterId)
  if (!chapter) redirect(`/school/${subjectSlug}`)

  // Sprint CQ: fetch Navigator for post-completion next step
  const navigatorAction = await getLearningNavigatorAction(session.user.id, board, grade).catch(() => null)

  return (
    <CandyPage legacy>
      <PracticeQuiz
        subjectSlug={subjectSlug}
        chapterId={chapter.id}
        chapterTitle={chapterDisplayTitle(chapter.title)}
        navigatorAction={navigatorAction}
      />
    </CandyPage>
  )
}
