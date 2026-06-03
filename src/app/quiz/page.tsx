import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import QuizClient from './QuizClient'

export default async function QuizPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/auth/login')

  const user = await prisma.user.findUnique({
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
  })

  if (!user?.onboardingCompleted) redirect('/onboarding')

  const profile = user.profile
  const primarySubject = profile?.subjects[0]?.subject
  const subject = primarySubject?.name ?? 'программирование'
  const lang = (profile?.teachingLanguage ?? 'en') as 'ru' | 'en' | 'hi'

  return <QuizClient subject={subject} lang={lang} />
}
