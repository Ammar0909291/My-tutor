/**
 * Integration-shaped offline harness: strategyEffectiveness.ts's stalemate
 * detection -> determineStrategy()'s rotation -> route.ts's inline-practice
 * trigger condition, chained end-to-end through mocked DB responses.
 *
 * The unit-level pieces already have dedicated coverage
 * (test-strategy-effectiveness.ts: 21 assertions, test-inline-practice.ts:
 * 19 assertions). This harness instead exercises the SEAM between them:
 * does a detected stalemate actually flow into determineStrategy's
 * excludeStrategy param, and does it actually flip route.ts's
 * "should we attach an inline practice question this turn" decision —
 * reproduced here as a pure boolean, not a live route.ts call (route.ts
 * needs a real HTTP/DB/Groq round-trip, out of scope for an offline
 * harness; this checks the same condition it evaluates).
 *
 * Run with:  npx tsx scripts/test-stalemate-integration.ts
 */
import { getStrategyEffectiveness } from '../src/lib/school/adaptive/strategyEffectiveness'
import { determineStrategy } from '../src/lib/school/adaptive/teachingStrategy'
import type { TeachingStrategyType } from '../src/lib/school/adaptive/teachingStrategy'

let passed = 0
let failed = 0
function check(name: string, cond: boolean) {
  if (cond) { passed++; console.log(`[✓ pass] ${name}`) }
  else { failed++; console.log(`[✗ FAIL] ${name}`) }
}

function mockPrisma(events: { strategy: string; visualFired: boolean }[], topicStatus: string | null) {
  return {
    teachingStrategyEvent: { findMany: async (_args: unknown) => events },
    topicProgress: { findFirst: async (_args: unknown) => (topicStatus ? { status: topicStatus } : null) },
  } as any
}

// Mirrors route.ts's actual gate (src/app/api/learn/chat/route.ts):
//   if (teachingStrategy.type === 'APPLICATION_FOCUS' || teachingStrategy.staleMate) { ... }
function inlinePracticeWouldFire(strategyType: TeachingStrategyType, staleMate: boolean): boolean {
  return strategyType === 'APPLICATION_FOCUS' || staleMate
}

async function run() {
  // ── SEAM 1: detected stalemate flows into determineStrategy's exclusion ──
  {
    // 3x FOUNDATION_REBUILD in a row, topic not mastered → staleMate=true,
    // dominantStrategy=FOUNDATION_REBUILD (matches test-strategy-effectiveness.ts's
    // own fixture so this is a known-good stalemate signal, not a fresh claim).
    const events = [
      { strategy: 'FOUNDATION_REBUILD', visualFired: true },
      { strategy: 'FOUNDATION_REBUILD', visualFired: false },
      { strategy: 'FOUNDATION_REBUILD', visualFired: true },
    ]
    const effectiveness = await getStrategyEffectiveness('u1', 't1', mockPrisma(events, 'IN_PROGRESS'))
    check('fixture sanity: staleMate detected', effectiveness.staleMate === true)
    check('fixture sanity: dominantStrategy is FOUNDATION_REBUILD', effectiveness.dominantStrategy === 'FOUNDATION_REBUILD')

    // Same signals that produced FOUNDATION_REBUILD as the dominant strategy
    // (mastery AT_RISK) — without the stalemate, determineStrategy would
    // repeat it. Feeding effectiveness.dominantStrategy in as excludeStrategy
    // (exactly as getTeachingStrategy() does) must force a rotation.
    const excludeStrategy = effectiveness.staleMate ? effectiveness.dominantStrategy : null
    check('excludeStrategy is populated from the stale dominant strategy', excludeStrategy === 'FOUNDATION_REBUILD')

    const withoutStalemate = determineStrategy('AT_RISK', null, null, null, null, null)
    const withStalemate = determineStrategy('AT_RISK', null, null, null, null, excludeStrategy)
    check('without stalemate signal, AT_RISK still picks FOUNDATION_REBUILD', withoutStalemate === 'FOUNDATION_REBUILD')
    check('with stalemate signal, rotation moves off FOUNDATION_REBUILD', withStalemate !== 'FOUNDATION_REBUILD')
  }

  // ── SEAM 1b: no stalemate (only 2 repeats) → no exclusion, no rotation ──
  {
    const events = [
      { strategy: 'MOMENTUM_RECOVERY', visualFired: true },
      { strategy: 'MOMENTUM_RECOVERY', visualFired: true },
    ]
    const effectiveness = await getStrategyEffectiveness('u1', 't1', mockPrisma(events, 'IN_PROGRESS'))
    check('below-threshold repeat → staleMate false', effectiveness.staleMate === false)
    const excludeStrategy = effectiveness.staleMate ? effectiveness.dominantStrategy : null
    check('no stalemate → excludeStrategy stays null', excludeStrategy === null)
    const result = determineStrategy(null, null, null, null, 'DECLINING_MOMENTUM', excludeStrategy)
    check('no stalemate → MOMENTUM_RECOVERY fires undisturbed', result === 'MOMENTUM_RECOVERY')
  }

  // ── SEAM 2: staleMate flips the inline-practice gate even when the ──────
  // rotated strategy ISN'T APPLICATION_FOCUS (mirrors route.ts's `||`).
  {
    const events = [
      { strategy: 'CONFIDENCE_BUILDING', visualFired: false },
      { strategy: 'CONFIDENCE_BUILDING', visualFired: false },
      { strategy: 'CONFIDENCE_BUILDING', visualFired: false },
    ]
    const effectiveness = await getStrategyEffectiveness('u1', 't1', mockPrisma(events, null))
    check('3x repeat, no progress row → staleMate true', effectiveness.staleMate === true)

    const rotated = determineStrategy(null, null, null, 'UNDERCONFIDENT', null, effectiveness.dominantStrategy)
    check('rotated strategy is not the stale CONFIDENCE_BUILDING', rotated !== 'CONFIDENCE_BUILDING')
    check(
      'inline-practice gate fires because staleMate=true, even though rotated type != APPLICATION_FOCUS',
      inlinePracticeWouldFire(rotated, effectiveness.staleMate) === true,
    )
  }

  // ── SEAM 2b: gate also fires on APPLICATION_FOCUS alone, no stalemate ───
  {
    check(
      'inline-practice gate fires on APPLICATION_FOCUS regardless of staleMate',
      inlinePracticeWouldFire('APPLICATION_FOCUS', false) === true,
    )
    check(
      'inline-practice gate stays closed when neither condition holds',
      inlinePracticeWouldFire('CONFIDENCE_BUILDING', false) === false,
    )
  }

  console.log(`\n=== ${passed} passed, ${failed} failed ===`)
  process.exit(failed ? 1 : 0)
}

run()
