import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'
import { withTimeout } from '@/lib/net/timeout'
import { DashboardV2 } from '@/components/dashboard/v2/DashboardV2'
import { getDashboardV2Data } from '@/lib/dashboard/getDashboardV2Data'
import { DashboardError } from '@/components/dashboard/DashboardError'

export default async function DashboardPage() {
  console.log('[D1] auth start')
  const session = await auth()
  console.log('[D2] auth complete', { id: session?.user?.id ?? 'MISSING' })

  if (!session?.user?.id) redirect('/auth/login')
  const userId = session.user.id

  try {
    console.log('[D3] user fetch start')
    const user = await withTimeout(withRetry(() => prisma.user.findUnique({
      where: { id: userId },
      select: {
        onboardingCompleted: true,
        profile: { select: { userType: true } },
      },
    })), 12000, 'dashboard-user')
    console.log('[D4] user fetch complete', { found: !!user, profile: !!user?.profile })

    if (!user?.profile) redirect('/onboarding')
    if (!user.onboardingCompleted) {
      await withTimeout(withRetry(() => prisma.user.update({ where: { id: userId }, data: { onboardingCompleted: true } })), 12000, 'dashboard-onboarding-heal').catch(() => {})
    }

    console.log('[D5] dashboard data start')
    const data = await withTimeout(getDashboardV2Data(userId), 18000, 'dashboard-data')
    console.log('[D6] dashboard data complete')

    return <DashboardV2 data={data} />
  } catch (error: any) {
    console.error('[Dashboard] Failed to load:', error.message)
    return <DashboardError message={error.message} />
  }
}
