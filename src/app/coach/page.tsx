import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'
import CoachChat from './CoachChat'
import { t } from '@/lib/i18n'

export default async function CoachPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/auth/login')

  const user = await withRetry(() => prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      onboardingCompleted: true,
      profile: {
        select: {
          teachingLanguage: true,
          subjects: { include: { subject: true }, orderBy: { createdAt: 'asc' }, take: 1 },
        },
      },
    },
  }))

  if (!user?.onboardingCompleted) redirect('/onboarding')

  const profile = user.profile
  const teachingLanguage = (profile?.teachingLanguage ?? 'en') as 'ru' | 'en' | 'hi'
  const primarySubject = profile?.subjects[0]?.subject
  const subject = primarySubject?.name ?? t(teachingLanguage, 'coach_default_subject')

  return <CoachChat subject={subject} teachingLanguage={teachingLanguage} />
}
