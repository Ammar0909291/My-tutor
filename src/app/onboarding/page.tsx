import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { OnboardingWizard } from '@/components/onboarding/OnboardingWizard'

export default async function OnboardingPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/auth/login')

  // Look up by id first; fall back to email in case the JWT userId differs from the DB row
  // (happens when a stale session resolves to a different effectiveUserId during onboarding)
  let user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { onboardingCompleted: true, name: true, profile: { select: { id: true } } },
  })
  if (!user && session.user.email) {
    user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { onboardingCompleted: true, name: true, profile: { select: { id: true } } },
    })
  }

  // Redirect if flag is set OR if profile already exists (handles users from before the migration)
  if (user?.onboardingCompleted || user?.profile) redirect('/dashboard')

  return <OnboardingWizard userName={user?.name ?? session.user.name} />
}
