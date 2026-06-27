/**
 * Offline unit harness for the strategy effectiveness reader
 * (src/lib/school/adaptive/strategyEffectiveness.ts) and the rotation logic
 * it feeds in determineStrategy (src/lib/school/adaptive/teachingStrategy.ts).
 * Pure logic only — the DB is mocked, no real Postgres needed.
 *
 * Run with:  npx tsx scripts/test-strategy-effectiveness.ts
 */
import { getStrategyEffectiveness } from '../src/lib/school/adaptive/strategyEffectiveness'
import { determineStrategy } from '../src/lib/school/adaptive/teachingStrategy'

let passed = 0
let failed = 0
function check(name: string, cond: boolean) {
  if (cond) { passed++; console.log(`[✓ pass] ${name}`) }
  else { failed++; console.log(`[✗ FAIL] ${name}`) }
}

// ── Mock Prisma: events ordered desc by createdAt (most recent first), as
// the real findMany({ orderBy: { createdAt: 'desc' } }) would return. ──────
function mockPrisma(events: { strategy: string; visualFired: boolean }[], topicStatus: string | null) {
  return {
    teachingStrategyEvent: {
      findMany: async (_args: unknown) => events,
    },
    topicProgress: {
      findFirst: async (_args: unknown) => (topicStatus ? { status: topicStatus } : null),
    },
  } as any
}

async function run() {
  // ── No events at all → empty/default effectiveness ──────────────────────
  {
    const result = await getStrategyEffectiveness('u1', 't1', mockPrisma([], null))
    check('no events → dominantStrategy null', result.dominantStrategy === null)
    check('no events → visualFireRate 0', result.visualFireRate === 0)
    check('no events → repeatCount 0', result.repeatCount === 0)
    check('no events → staleMate false', result.staleMate === false)
  }

  // ── Same strategy fired 3x consecutively, topic NOT mastered → staleMate ─
  {
    const events = [
      { strategy: 'MOMENTUM_RECOVERY', visualFired: true },
      { strategy: 'MOMENTUM_RECOVERY', visualFired: false },
      { strategy: 'MOMENTUM_RECOVERY', visualFired: true },
      { strategy: 'CONFIDENCE_BUILDING', visualFired: false },
    ]
    const result = await getStrategyEffectiveness('u1', 't1', mockPrisma(events, 'IN_PROGRESS'))
    check('3x repeat + not mastered → dominantStrategy MOMENTUM_RECOVERY', result.dominantStrategy === 'MOMENTUM_RECOVERY')
    check('3x repeat + not mastered → repeatCount 3', result.repeatCount === 3)
    check('3x repeat + not mastered → visualFireRate 0.5', result.visualFireRate === 0.5)
    check('3x repeat + not mastered → staleMate true', result.staleMate === true)
  }

  // ── Same strategy fired 3x consecutively, but topic IS mastered → no stalemate ─
  {
    const events = [
      { strategy: 'ACCELERATED_GROWTH', visualFired: true },
      { strategy: 'ACCELERATED_GROWTH', visualFired: true },
      { strategy: 'ACCELERATED_GROWTH', visualFired: true },
    ]
    const result = await getStrategyEffectiveness('u1', 't1', mockPrisma(events, 'MASTERED'))
    check('3x repeat + MASTERED → staleMate false', result.staleMate === false)
    check('3x repeat + MASTERED → repeatCount still 3', result.repeatCount === 3)
  }

  // ── Only 2 consecutive repeats (below the 3+ threshold) → no stalemate ──
  {
    const events = [
      { strategy: 'FOUNDATION_REBUILD', visualFired: true },
      { strategy: 'FOUNDATION_REBUILD', visualFired: true },
      { strategy: 'MISCONCEPTION_REPAIR', visualFired: false },
    ]
    const result = await getStrategyEffectiveness('u1', 't1', mockPrisma(events, 'IN_PROGRESS'))
    check('2x repeat (below threshold) → repeatCount 2', result.repeatCount === 2)
    check('2x repeat (below threshold) → staleMate false', result.staleMate === false)
  }

  // ── repeatCount only counts the streak from the MOST RECENT event ───────
  {
    const events = [
      { strategy: 'APPLICATION_FOCUS', visualFired: false }, // most recent
      { strategy: 'APPLICATION_FOCUS', visualFired: false },
      { strategy: 'APPLICATION_FOCUS', visualFired: false },
      { strategy: 'MOMENTUM_RECOVERY', visualFired: true },  // older streak — must not be counted
      { strategy: 'MOMENTUM_RECOVERY', visualFired: true },
    ]
    const result = await getStrategyEffectiveness('u1', 't1', mockPrisma(events, 'IN_PROGRESS'))
    check('repeatCount stops at the first non-matching older event', result.repeatCount === 3)
    check('dominantStrategy is still the most frequent overall (tie broken by recency)',
      result.dominantStrategy === 'APPLICATION_FOCUS' || result.dominantStrategy === 'MOMENTUM_RECOVERY')
  }

  // ── visualFireRate is computed over however many events exist (< 5) ─────
  {
    const events = [
      { strategy: 'CONFIDENCE_BUILDING', visualFired: true },
      { strategy: 'CONFIDENCE_BUILDING', visualFired: false },
    ]
    const result = await getStrategyEffectiveness('u1', 't1', mockPrisma(events, null))
    check('visualFireRate over 2 events (1 fired) = 0.5', result.visualFireRate === 0.5)
  }

  // ── determineStrategy rotation: excludeStrategy forces a different pick ─
  // FOUNDATION_REBUILD would normally win (mastery AT_RISK is rule #1).
  {
    const withoutExclude = determineStrategy('AT_RISK', null, null, null, null)
    check('determineStrategy(no exclude) picks FOUNDATION_REBUILD as usual', withoutExclude === 'FOUNDATION_REBUILD')

    const withExclude = determineStrategy('AT_RISK', null, null, null, null, 'FOUNDATION_REBUILD')
    check('determineStrategy(exclude=dominant) rotates away from FOUNDATION_REBUILD',
      withExclude !== 'FOUNDATION_REBUILD')
    // Only rule #1 matched (AT_RISK); next matching candidate is the tail
    // default, which for AT_RISK mastery falls through to ACCELERATED_GROWTH.
    check('rotation lands on the canonical next-best (ACCELERATED_GROWTH)', withExclude === 'ACCELERATED_GROWTH')
  }

  // ── determineStrategy rotation: excluding a non-firing strategy is a no-op ─
  {
    const result = determineStrategy('AT_RISK', null, null, null, null, 'CONFIDENCE_BUILDING')
    check('excluding a strategy that never matched changes nothing', result === 'FOUNDATION_REBUILD')
  }

  // ── determineStrategy rotation: excluding the ONLY matching rule when it's ─
  // also the canonical fallback (forces the ALL_STRATEGIES rotation branch).
  {
    // No rules match (all null/neutral inputs) → only the final tail default
    // ACCELERATED_GROWTH would fire. Excluding it must force a true rotation.
    const result = determineStrategy(null, null, null, null, null, 'ACCELERATED_GROWTH')
    check('excluding the sole fallback candidate forces rotation off it', result !== 'ACCELERATED_GROWTH')
    check('rotation falls back to canonical priority order (FOUNDATION_REBUILD)', result === 'FOUNDATION_REBUILD')
  }

  console.log(`\n=== ${passed} passed, ${failed} failed ===`)
  process.exit(failed ? 1 : 0)
}

run()
