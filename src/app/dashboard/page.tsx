import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'
import { DashboardV2 } from '@/components/dashboard/v2/DashboardV2'
import { getDashboardV2Data } from '@/lib/dashboard/getDashboardV2Data'

export default async function DashboardPage() {
  console.log('[D1] auth start')
  const session = await auth()
  console.log('[D2] auth complete', { id: session?.user?.id ?? 'MISSING' })

  if (!session?.user?.id) redirect('/auth/login')
  const userId = session.user.id

  console.log('[D3] user fetch start')
  const user = await withRetry(() => prisma.user.findUnique({
    where: { id: userId },
    select: {
      onboardingCompleted: true,
      profile: { select: { userType: true } },
    },
  }))
  console.log('[D4] user fetch complete', { found: !!user, profile: !!user?.profile })

  if (!user?.profile) redirect('/onboarding')
  if (!user.onboardingCompleted) {
    await withRetry(() => prisma.user.update({ where: { id: userId }, data: { onboardingCompleted: true } }))
  }

  console.log('[D5] dashboard data start')
  const data = await getDashboardV2Data(userId)
  console.log('[D6] dashboard data complete')

  console.log('[D7] render start')
  return <DashboardV2 data={data} />
}
