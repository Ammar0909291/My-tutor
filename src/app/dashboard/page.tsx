import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'
import { DashboardV2 } from '@/components/dashboard/v2/DashboardV2'
import { getDashboardV2Data } from '@/lib/dashboard/getDashboardV2Data'

export default async function DashboardPage({ searchParams }: { searchParams?: { mode?: string } }) {
  // ── DIAGNOSTIC INSTRUMENTATION — remove after root cause confirmed ──────────
  const t0 = Date.now()
  console.log('[DIAG:dashboard] STEP 1 — page entered')

  // eslint-disable-next-line prefer-const
  let session: { user?: { id?: string } } | null = null
  try {
    session = await auth() as any
    console.log('[DIAG:dashboard] STEP 2 — auth() completed', {
      hasSession: !!session,
      hasUser: !!session?.user,
      userId: session?.user?.id ?? 'MISSING',
    })
  } catch (err: any) {
    console.error('[DIAG:dashboard] STEP 2 FAILED — auth() threw', err?.message ?? err)
    throw err
  }

  if (!session?.user?.id) {
    console.log('[DIAG:dashboard] STEP 2b — no userId, redirecting to login')
    redirect('/auth/login')
  }
  const userId = session!.user!.id!

  console.log('[DIAG:dashboard] STEP 3 — fetching user+profile from DB')
  let dbUser: { onboardingCompleted: boolean; profile: { userType: string; educationBoard: string | null; grade: string | null } | null } | null = null
  try {
    dbUser = await withRetry(() => prisma.user.findUnique({
      where: { id: userId },
      select: {
        onboardingCompleted: true,
        profile: { select: { userType: true, educationBoard: true, grade: true } },
      },
    })) as any
    console.log('[DIAG:dashboard] STEP 3 complete — user found:', !!dbUser, 'profile:', !!dbUser?.profile)
  } catch (err: any) {
    console.error('[DIAG:dashboard] STEP 3 FAILED — prisma.user.findUnique threw', {
      code: err?.code,
      message: err?.message,
      meta: err?.meta,
    })
    throw err
  }

  if (!dbUser?.profile) {
    console.log('[DIAG:dashboard] STEP 3b — no profile, redirecting to onboarding')
    redirect('/onboarding')
  }
  if (!dbUser!.onboardingCompleted) {
    console.log('[DIAG:dashboard] STEP 4 — auto-healing onboardingCompleted flag')
    try {
      await withRetry(() => prisma.user.update({ where: { id: userId }, data: { onboardingCompleted: true } }))
      console.log('[DIAG:dashboard] STEP 4 complete — flag healed')
    } catch (err: any) {
      console.error('[DIAG:dashboard] STEP 4 FAILED — prisma.user.update threw', {
        code: err?.code, message: err?.message,
      })
      throw err
    }
  }

  const wantsLibrary = searchParams?.mode === 'library'
  const wantsSchool = searchParams?.mode === 'school'
  const modeOverride = wantsLibrary ? 'library' : wantsSchool ? 'school' : undefined

  console.log('[DIAG:dashboard] STEP 5 — calling getDashboardV2Data', { modeOverride })
  let data: Awaited<ReturnType<typeof getDashboardV2Data>>
  try {
    data = await getDashboardV2Data(userId, modeOverride)
    console.log('[DIAG:dashboard] STEP 6 — getDashboardV2Data completed in', Date.now() - t0, 'ms')
  } catch (err: any) {
    console.error('[DIAG:dashboard] STEP 5 FAILED — getDashboardV2Data threw', {
      code: err?.code,
      message: err?.message,
      meta: err?.meta,
      stack: err?.stack?.split('\n').slice(0, 8).join('\n'),
    })
    throw err
  }

  console.log('[DIAG:dashboard] STEP 7 — rendering DashboardV2')
  return <DashboardV2 data={data} />
  // ── END DIAGNOSTIC INSTRUMENTATION ──────────────────────────────────────────
}
