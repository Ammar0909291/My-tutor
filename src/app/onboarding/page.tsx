import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { OnboardingWizard } from '@/components/onboarding/OnboardingWizard'

export default async function OnboardingPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/auth/login')

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { onboardingCompleted: true, name: true, profile: { select: { id: true } } },
  })

  if (user?.onboardingCompleted) redirect('/dashboard')

  return <OnboardingWizard userName={user?.name ?? session.user.name} />
}
