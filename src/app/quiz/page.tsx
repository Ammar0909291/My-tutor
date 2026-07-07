import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'
import QuizClient from './QuizClient'

export default async function QuizPage() {
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

  // Auto-heal: a Profile can exist while the onboardingCompleted flag is
  // stale (e.g. an interrupted resubmission) — match /learn's behavior so
  // pages don't disagree on what "onboarding complete" means and bounce a
  // fully-onboarded user back into the wizard.
  if (!user?.onboardingCompleted) {
    if (user?.profile) {
      await withRetry(() => prisma.user.update({ where: { id: session.user.id }, data: { onboardingCompleted: true } }))
    } else {
      redirect('/onboarding')
    }
  }

  const profile = user.profile
  const primarySubject = profile?.subjects[0]?.subject
  const subject = primarySubject?.name ?? 'программирование'
  const lang = (profile?.teachingLanguage ?? 'en') as 'ru' | 'en' | 'hi'

  return <QuizClient subject={subject} lang={lang} />
}
