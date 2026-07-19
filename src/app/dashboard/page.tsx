import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'
import { withTimeout } from '@/lib/net/timeout'
import { DashboardV2 } from '@/components/dashboard/v2/DashboardV2'
import { getDashboardV2Data } from '@/lib/dashboard/getDashboardV2Data'

export default async function DashboardPage() {
  console.log('[D1] auth start')
  const session = await auth()
  console.log('[D2] auth complete', { id: session?.user?.id ?? 'MISSING' })

  if (!session?.user?.id) redirect('/auth/login')
  const userId = session.user.id

  console.log('[D3] user fetch start')
  // P0 (infinite "Loading your dashboard…"): bound the DB-bound work. A prisma
  // query can hang without throwing (pool exhaustion, a stalled connection),
  // and this is a server component — a never-resolving await keeps loading.tsx
  // on screen forever. On timeout we throw, which surfaces the app-wide
  // error.tsx boundary (with its Retry) — a recoverable state, never infinite.
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
    // Same P0 hang class as the user fetch above — this update was missing
    // its withTimeout wrapper, so a stalled/pool-exhausted connection here
    // could keep this server component (and loading.tsx) hanging forever
    // even though the fetch above it was correctly bounded.
    await withTimeout(withRetry(() => prisma.user.update({ where: { id: userId }, data: { onboardingCompleted: true } })), 12000, 'dashboard-onboarding-heal')
  }

  console.log('[D5] dashboard data start')
  const data = await withTimeout(getDashboardV2Data(userId), 18000, 'dashboard-data')
  console.log('[D6] dashboard data complete')

  console.log('[D7] render start')
  return <DashboardV2 data={data} />
}
