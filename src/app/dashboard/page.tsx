import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'
import { withTimeout } from '@/lib/net/timeout'
import { DashboardV2 } from '@/components/dashboard/v2/DashboardV2'
import { getDashboardV2Data } from '@/lib/dashboard/getDashboardV2Data'
import { ConnectionRecovery } from '@/components/system/ConnectionRecovery'

// Bounded, retried user load — extracted so the recoverable-failure handling
// below can type itself off this function's return type.
function loadDashboardUser(userId: string) {
  return withTimeout(withRetry(() => prisma.user.findUnique({
    where: { id: userId },
    select: {
      onboardingCompleted: true,
      profile: { select: { userType: true } },
    },
  })), 12000, 'dashboard-user')
}

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
  // on screen forever. The timeout converts the hang into a rejection — and
  // (P0, global-error fix) that rejection now degrades to the inline
  // auto-retrying ConnectionRecovery screen instead of throwing into the
  // app-wide error boundary ("Something went wrong", Error ID: <digest>).
  // A transient DB blip is recoverable by definition — it must never take
  // down the whole app shell. redirect() stays OUTSIDE the try so
  // NEXT_REDIRECT control-flow is never swallowed.
  let user: Awaited<ReturnType<typeof loadDashboardUser>> | undefined
  let userLoadFailed = false
  try {
    user = await loadDashboardUser(userId)
  } catch (err) {
    console.error('[dashboard] transient user-load failure, showing recovery screen:', err)
    userLoadFailed = true
  }
  if (userLoadFailed) return <ConnectionRecovery retryKey="dashboard" />
  console.log('[D4] user fetch complete', { found: !!user, profile: !!user?.profile })

  if (!user?.profile) redirect('/onboarding')
  if (!user.onboardingCompleted) {
    // Same P0 hang class as the user fetch above — timeout-bounded, and
    // best-effort: this flag heal is not worth the page. A transient failure
    // here is swallowed (the flag heals on the next successful visit); it
    // must not throw to the global error boundary.
    await withTimeout(withRetry(() => prisma.user.update({ where: { id: userId }, data: { onboardingCompleted: true } })), 12000, 'dashboard-onboarding-heal')
      .catch((err) => console.error('[dashboard] onboarding-heal failed (non-fatal):', err))
  }

  console.log('[D5] dashboard data start')
  // Same recoverable-degradation contract as the user fetch above: an 18s
  // budget overrun under real production DB latency was the single most
  // frequently observed producer of the global error page (see
  // getDashboardV2Data's own comment about this exact boundary).
  let data: Awaited<ReturnType<typeof getDashboardV2Data>>
  try {
    data = await withTimeout(getDashboardV2Data(userId), 18000, 'dashboard-data')
  } catch (err) {
    console.error('[dashboard] transient data-load failure, showing recovery screen:', err)
    return <ConnectionRecovery retryKey="dashboard-data" />
  }
  console.log('[D6] dashboard data complete')

  console.log('[D7] render start')
  return <DashboardV2 data={data} />
}
