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

  // LOOP-FIX-2: require profile to exist before redirecting back to /dashboard.
  // If onboardingCompleted=true but profile=null (data integrity gap), the
  // dashboard page's !user?.profile check fires → redirect('/onboarding') →
  // and this line fires back → redirect('/dashboard') → infinite loop.
  // With the profile guard, a profile-less user sees the onboarding form and
  // can complete it properly instead of bouncing forever.
  if (user?.onboardingCompleted && user?.profile) redirect('/dashboard')

  return <OnboardingWizard userName={user?.name ?? session.user.name} />
}
