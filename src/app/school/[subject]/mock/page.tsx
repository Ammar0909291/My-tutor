import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'
import { isSchoolSubject, SCHOOL_SUBJECT_META } from '@/lib/school/schoolRouting'
import { MockTestQuiz } from '@/components/school/MockTestQuiz'

export default async function MockTestPage({ params }: { params: { subject: string } }) {
  const session = await auth()
  if (!session?.user?.id) redirect('/auth/login')

  const profile = await withRetry(() =>
    prisma.profile.findUnique({
      where: { userId: session.user.id },
      select: { userType: true, educationBoard: true, grade: true },
    })
  )
  if (profile?.userType !== 'SCHOOL_STUDENT' || !profile.educationBoard || !profile.grade) {
    redirect('/dashboard')
  }

  const { educationBoard: board } = profile
  const subjectSlug = params.subject
  if (!isSchoolSubject(board, subjectSlug)) redirect('/dashboard')

  const m = SCHOOL_SUBJECT_META[subjectSlug] ?? { label: subjectSlug }

  return (
    <MockTestQuiz
      subjectSlug={subjectSlug}
      subjectLabel={m.label}
      backHref={`/school/${subjectSlug}`}
    />
  )
}
