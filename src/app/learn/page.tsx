import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { LessonScreen } from '@/components/learn/LessonScreen'

export default async function LearnPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/auth/login')

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      onboardingCompleted: true,
      profile: {
        include: { subjects: { include: { subject: true }, take: 1 } },
      },
    },
  })

  if (!user?.onboardingCompleted && !user?.profile) redirect('/onboarding')

  const profile = user?.profile
  const primarySubject = profile?.subjects[0]?.subject

  if (!profile || !primarySubject) redirect('/dashboard')

  return (
    <LessonScreen
      subjectSlug={primarySubject.slug}
      subjectName={primarySubject.name}
      levelDescription={profile.selfDescription}
      voiceChoice={profile.voiceId ?? 'alexei'}
    />
  )
}
