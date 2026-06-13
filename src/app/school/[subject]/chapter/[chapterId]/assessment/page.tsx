import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'
import { getSchoolChapters, isSchoolSubject, chapterDisplayTitle } from '@/lib/school/schoolRouting'
import { AssessmentQuiz } from '@/components/school/AssessmentQuiz'
import { getWeakTopicsForSubject } from '@/lib/school/adaptive/weakTopics'
import { getLearningNavigatorAction } from '@/lib/school/navigation/learningNavigator'

export default async function ChapterAssessmentPage({ params }: { params: { subject: string; chapterId: string } }) {
  const session = await auth()
  if (!session?.user?.id) redirect('/auth/login')

  const profile = await withRetry(() =>
    prisma.profile.findUnique({
      where: { userId: session.user.id },
      select: { userType: true, educationBoard: true, grade: true },
    }),
  )
  if (profile?.userType !== 'SCHOOL_STUDENT' || !profile.educationBoard || !profile.grade) redirect('/dashboard')

  const { educationBoard: board, grade } = profile
  const subjectSlug = params.subject
  if (!isSchoolSubject(board, subjectSlug)) redirect('/dashboard')

  const chapters = getSchoolChapters(board, subjectSlug, grade)
  const chapter = chapters.find((c) => c.id === params.chapterId)
  if (!chapter) redirect(`/school/${subjectSlug}`)

  // Sprint BO: non-blocking guidance when this chapter has weak topics
  // Sprint CQ: fetch Navigator for post-completion next step (parallel)
  const [weakTopics, navigatorAction] = await Promise.all([
    getWeakTopicsForSubject(session.user.id, subjectSlug).catch(() => []),
    getLearningNavigatorAction(session.user.id, board, grade).catch(() => null),
  ])
  const hasWeakTopics = weakTopics.some((t) => chapter.kgNodeIds.includes(t.nodeId))

  return (
    <AssessmentQuiz
      subjectSlug={subjectSlug}
      chapterId={chapter.id}
      chapterTitle={chapterDisplayTitle(chapter.title)}
      recommendPractice={hasWeakTopics}
      navigatorAction={navigatorAction}
    />
  )
}
