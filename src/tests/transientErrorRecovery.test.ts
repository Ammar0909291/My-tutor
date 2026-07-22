import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'

/**
 * Structural locks for the P0 "Something went wrong on a network hiccup" fix.
 *
 * Root cause being locked out: Server Components (/learn, /dashboard) let a
 * transient DB timeout/connection failure THROW into the app-wide error
 * boundary (src/app/error.tsx — the global "Something went wrong" page with
 * an Error ID digest). A transient failure is recoverable by definition and
 * must degrade to the inline auto-retrying <ConnectionRecovery /> screen.
 *
 * These tests read the source text (same precedent as
 * servingPathCanonicality.test.ts) because the invariant is about code
 * structure — which failure path each throw site routes to — not about a
 * pure function's output.
 */

const read = (p: string) => readFileSync(join(process.cwd(), p), 'utf8')

const LEARN = read('src/app/learn/page.tsx')
const DASHBOARD = read('src/app/dashboard/page.tsx')
const ERROR_PAGE = read('src/app/error.tsx')
const GLOBAL_ERROR = read('src/app/global-error.tsx')
const RECOVERY = read('src/components/system/ConnectionRecovery.tsx')

describe('learn/page.tsx: transient DB failures degrade, never throw to the global boundary', () => {
  it('imports and renders ConnectionRecovery for a failed user load', () => {
    expect(LEARN).toContain("from '@/components/system/ConnectionRecovery'")
    expect(LEARN).toContain('<ConnectionRecovery retryKey="learn" />')
  })

  it('wraps the critical user load in try/catch instead of an unguarded await', () => {
    // The old, bug-producing shape: `const user = await withTimeout(withRetry(`
    // directly in the page body with no catch.
    expect(LEARN).not.toMatch(/const user = await withTimeout\(withRetry\(/)
    expect(LEARN).toMatch(/user = await loadLearnUser\(session\.user\.id\)/)
    expect(LEARN).toMatch(/catch \(err\) \{\s*\n\s*console\.error\('\[learn\] transient user-load failure/)
  })

  it('degrades pastSessions to [] on transient failure instead of failing the page', () => {
    expect(LEARN).toMatch(/'learn-pastSessions'\)\.catch\(/)
  })

  it('keeps redirect() outside the recovery try/catch (NEXT_REDIRECT must never be swallowed)', () => {
    const tryBlock = LEARN.slice(LEARN.indexOf('user = await loadLearnUser'), LEARN.indexOf('if (userLoadFailed)'))
    expect(tryBlock).not.toContain('redirect(')
  })
})

describe('dashboard/page.tsx: transient DB failures degrade, never throw to the global boundary', () => {
  it('imports and renders ConnectionRecovery for both the user load and the data load', () => {
    expect(DASHBOARD).toContain("from '@/components/system/ConnectionRecovery'")
    expect(DASHBOARD).toContain('<ConnectionRecovery retryKey="dashboard" />')
    expect(DASHBOARD).toContain('<ConnectionRecovery retryKey="dashboard-data" />')
  })

  it('the 18s getDashboardV2Data budget overrun no longer throws unguarded', () => {
    expect(DASHBOARD).not.toMatch(/const data = await withTimeout\(getDashboardV2Data/)
    expect(DASHBOARD).toMatch(/data = await withTimeout\(getDashboardV2Data\(userId\), 18000, 'dashboard-data'\)/)
    expect(DASHBOARD).toMatch(/catch \(err\) \{\s*\n\s*console\.error\('\[dashboard\] transient data-load failure/)
  })

  it('the onboarding-heal update is best-effort (caught), not page-fatal', () => {
    expect(DASHBOARD).toMatch(/'dashboard-onboarding-heal'\)\s*\n?\s*\.catch\(/)
  })

  it('keeps redirect() outside the recovery try/catch', () => {
    const tryBlock = DASHBOARD.slice(DASHBOARD.indexOf('user = await loadDashboardUser'), DASHBOARD.indexOf('if (userLoadFailed)'))
    expect(tryBlock).not.toContain('redirect(')
  })
})

describe('error boundaries: Retry actually retries', () => {
  it('error.tsx Retry re-fetches the server payload (router.refresh + reset in a transition)', () => {
    // reset() alone re-renders against the SAME cached RSC payload for a
    // server-thrown error — the button looks dead. The fix pairs it with
    // router.refresh() inside one transition.
    expect(ERROR_PAGE).toMatch(/startTransition\(\(\) => \{ router\.refresh\(\); reset\(\) \}\)/)
    expect(ERROR_PAGE).not.toMatch(/onClick=\{\(\) => reset\(\)\}/)
  })

  it('global-error.tsx recovers with a hard reload (root layout itself failed)', () => {
    expect(GLOBAL_ERROR).toContain('window.location.reload()')
    expect(GLOBAL_ERROR).not.toMatch(/onClick=\{\(\) => reset\(\)\}/)
  })
})

describe('ConnectionRecovery: bounded auto-retry, manual fallback', () => {
  it('auto-retries with backoff via router.refresh()', () => {
    expect(RECOVERY).toMatch(/AUTO_RETRY_DELAYS_MS = \[3000, 6000, 12000\]/)
    expect(RECOVERY).toContain('router.refresh()')
  })

  it('bounds auto-retry (no infinite refresh loop) and keeps a manual Retry', () => {
    expect(RECOVERY).toMatch(/attempt >= AUTO_RETRY_DELAYS_MS\.length/)
    expect(RECOVERY).toContain('manualRetry')
  })

  it('never uses window.location.href (recovery must not reset navigation)', () => {
    expect(RECOVERY).not.toContain('window.location.href')
  })

  it('chains attempts inside one effect run (a failed refresh does NOT remount, so a single non-chained timer stops after attempt 1)', () => {
    expect(RECOVERY).toMatch(/scheduleNext\(a \+ 1\)/)
  })

  it('uses its own heading, never the crash page\'s "Something went wrong" (users must be able to tell recovery apart from a crash)', () => {
    expect(RECOVERY).toContain("t('connection_recovery_title')")
    expect(RECOVERY).not.toContain("{t('error_title')}")
  })
})
