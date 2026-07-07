/**
 * Seam-test harness for /api/admin/strategy-insights/route.ts.
 *
 * The route's GET() has no params (imports `prisma`/`auth` directly at module
 * scope), so it can't be imported and exercised with a mock client. This
 * harness reproduces the route's exact aggregation algorithm — stalemate
 * run-length detection, visualFireRate, dominantStrategy tie-break, and the
 * auth-guard status codes — as pure local helpers mirroring route.ts line for
 * line, and tests those. Any drift between this file and route.ts should be
 * caught by re-reading route.ts alongside this file.
 *
 * Run with:  npx tsx scripts/test-strategy-insights.ts
 */

let pass = 0
let fail = 0
function check(name: string, cond: boolean) {
  if (cond) pass++
  else fail++
  console.log(`[${cond ? '✓ pass' : '✗ FAIL'}] ${name}`)
}

console.log('\n=== strategy-insights route logic harness ===\n')

// ── Mirrors route.ts's per-group aggregation (chronological ascending input) ─
const STALEMATE_RUN_LENGTH = 3

interface Ev { strategy: string; visualFired: boolean; outputBias: string }

function aggregate(groupEvents: Ev[]) {
  const counts = new Map<string, number>()
  for (const e of groupEvents) counts.set(e.strategy, (counts.get(e.strategy) ?? 0) + 1)
  // groupEvents is chronological ascending — >= breaks count ties by recency.
  let dominantStrategy = groupEvents[0].strategy
  let maxCount = 0
  for (const e of groupEvents) {
    const count = counts.get(e.strategy) ?? 0
    if (count >= maxCount) {
      maxCount = count
      dominantStrategy = e.strategy
    }
  }

  let stalemateCount = 0
  let runStrategy: string | null = null
  let runLength = 0
  for (const e of groupEvents) {
    if (e.strategy === runStrategy) {
      runLength++
    } else {
      runStrategy = e.strategy
      runLength = 1
    }
    if (runLength === STALEMATE_RUN_LENGTH) stalemateCount++
  }

  const visualFireRate = groupEvents.filter((e) => e.visualFired).length / groupEvents.length
  return { dominantStrategy, stalemateCount, visualFireRate: Math.round(visualFireRate * 100) / 100 }
}

function ev(strategy: string, visualFired = false, outputBias = 'NEUTRAL'): Ev {
  return { strategy, visualFired, outputBias }
}

// ── stalemateCount: 3+ consecutive same-strategy runs ────────────────────────
check('exactly 3 in a row → 1 stalemate',
  aggregate([ev('A'), ev('A'), ev('A')]).stalemateCount === 1)
check('2 in a row (below threshold) → 0 stalemates',
  aggregate([ev('A'), ev('A')]).stalemateCount === 0)
check('4 in a row → still counted once per run, not per event past 3',
  aggregate([ev('A'), ev('A'), ev('A'), ev('A')]).stalemateCount === 1)
check('two separate 3-runs (A,A,A,B,B,B) → 2 stalemates',
  aggregate([ev('A'), ev('A'), ev('A'), ev('B'), ev('B'), ev('B')]).stalemateCount === 2)
check('alternating strategy (no run reaches 3) → 0 stalemates',
  aggregate([ev('A'), ev('B'), ev('A'), ev('B'), ev('A'), ev('B')]).stalemateCount === 0)
check('run broken then restarted (A,A,B,A,A,A) → 1 stalemate, only the second run',
  aggregate([ev('A'), ev('A'), ev('B'), ev('A'), ev('A'), ev('A')]).stalemateCount === 1)

// ── visualFireRate ────────────────────────────────────────────────────────────
check('all visuals fired → rate 1',
  aggregate([ev('A', true), ev('A', true)]).visualFireRate === 1)
check('none fired → rate 0',
  aggregate([ev('A', false), ev('A', false)]).visualFireRate === 0)
check('1 of 3 fired → rate rounds to 0.33',
  aggregate([ev('A', true), ev('A', false), ev('A', false)]).visualFireRate === 0.33)
check('2 of 3 fired → rate rounds to 0.67',
  aggregate([ev('A', true), ev('A', true), ev('A', false)]).visualFireRate === 0.67)

// ── dominantStrategy: plain majority and tie-break-by-recency ────────────────
check('clear majority (A:3, B:1) → A wins',
  aggregate([ev('A'), ev('B'), ev('A'), ev('A')]).dominantStrategy === 'A')
check('count tie (A:2, B:2), B occurs later chronologically → B wins (recency)',
  aggregate([ev('A'), ev('A'), ev('B'), ev('B')]).dominantStrategy === 'B')
check('count tie (A:2, B:2), A occurs later chronologically → A wins (recency)',
  aggregate([ev('B'), ev('B'), ev('A'), ev('A')]).dominantStrategy === 'A')
check('three-way tie, C occurs last → C wins (recency)',
  aggregate([ev('A'), ev('B'), ev('C')]).dominantStrategy === 'C')
check('non-tied higher-count strategy never displaced by a later lower-count one',
  aggregate([ev('A'), ev('A'), ev('A'), ev('B')]).dominantStrategy === 'A')

// ── Empty event window → empty insights (mirrors the route's early return) ──
function buildInsights(events: Ev[]) {
  if (events.length === 0) return []
  return [aggregate(events)]
}
check('empty events array → empty insights list', buildInsights([]).length === 0)

// ── Auth guard status codes (mirrors GET()'s session/isAdmin branching) ─────
function authStatus(session: { user?: { id: string } } | null, isAdminFn: (id: string) => boolean): number {
  if (!session?.user) return 401
  if (!isAdminFn(session.user.id)) return 403
  return 200
}
check('no session → 401', authStatus(null, () => true) === 401)
check('session present, not admin → 403', authStatus({ user: { id: 'u1' } }, () => false) === 403)
check('session present, admin → 200', authStatus({ user: { id: 'u1' } }, () => true) === 200)

console.log(`\n=== ${pass} passed, ${fail} failed ===\n`)
process.exit(fail === 0 ? 0 : 1)
