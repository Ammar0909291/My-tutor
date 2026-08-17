/**
 * MEASUREMENT ACCURACY — the fallback reason must name the REAL blocker.
 *
 * ── THE MEASURED DEFECT ─────────────────────────────────────────────────────
 * Production, 2026-08-17, across every instrumented turn since Phase 1 shipped:
 * 36 provider calls, of which **14 (39%) were labelled `confidence_failed`** —
 * by a distance the largest identifiable blocker after `brain_decision`, and
 * therefore the obvious next optimization target ("relax the matcher's
 * threshold").
 *
 * It was a mislabel. The already-read guard sets `assembled = null` when the
 * learner has already been shown that explanation this concept — correct
 * teaching behaviour, and it records `'Already served this concept'`. But the
 * block immediately below it is keyed on `!assembled`, so it ran too and
 * OVERWROTE the reason with one derived from a count query. An already-served
 * concept has ACTIVE assets by definition, so `activeCount > 0` always held and
 * the reason always resolved to `'Confidence failed'`.
 *
 * The threshold was never the blocker. Acting on that number would have tuned
 * a matcher that was working, and would not have removed a single call.
 *
 * This is instrumentation only — which string is recorded. No decision, no
 * provider call and no served text depends on it.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'

const ROUTE = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')

describe('the already-served guard reports itself, not the confidence path', () => {
  it('the count-derived reason is skipped when the already-served guard fired', () => {
    // The whole defect in one condition. Without `!alreadyServedThisConcept`
    // the count query below runs on a turn whose blocker is already known.
    expect(ROUTE).toContain('if (!assembled && !alreadyServedThisConcept) {')
  })

  it('the guard sets the flag at the same place it nulls the assembly', () => {
    const flagDecl = ROUTE.indexOf('let alreadyServedThisConcept = false')
    const flagSet = ROUTE.indexOf('alreadyServedThisConcept = true')
    const reason = ROUTE.indexOf("memoryFallbackReason = 'Already served this concept'")
    expect(flagDecl).toBeGreaterThan(-1)
    expect(flagSet).toBeGreaterThan(flagDecl)
    // The flag and the reason are set together, so they cannot drift apart.
    expect(Math.abs(reason - flagSet)).toBeLessThan(200)
  })

  it('the flag is declared BEFORE the block that reads it', () => {
    expect(ROUTE.indexOf('let alreadyServedThisConcept = false'))
      .toBeLessThan(ROUTE.indexOf('if (!assembled && !alreadyServedThisConcept) {'))
  })
})

describe('the reason survives the snake_case mapping', () => {
  it("'Already served this concept' maps to its own code, not the no_asset default", () => {
    // Before this fix the string could never reach the mapping at all. Now it
    // can, and without an explicit arm it would fall through to `no_asset` —
    // a second, quieter mislabel replacing the first.
    expect(ROUTE).toContain(
      "memoryFallbackReason === 'Already served this concept' ? 'already_served'",
    )
  })

  it('every reason string the route can set has a mapping arm', () => {
    // Structural: catches a future reason being added upstream and silently
    // collapsing into `no_asset`, which is how this class of defect starts.
    const set = [...ROUTE.matchAll(/memoryFallbackReason = '([^']+)'/g)].map((m) => m[1])
    const mapped = [...ROUTE.matchAll(/memoryFallbackReason === '([^']+)'/g)].map((m) => m[1])
    expect(set.length).toBeGreaterThan(5)
    for (const reason of new Set(set)) expect(mapped).toContain(reason)
  })
})

describe('nothing but the label changed', () => {
  it('no provider call site was added or removed', () => {
    expect((ROUTE.match(/await routeAI\(/g) ?? []).length).toBe(3)
  })

  it('the already-served guard still blocks the re-serve itself', () => {
    // The teaching behaviour this guard exists for: the same stored
    // explanation was served verbatim on three consecutive turns in
    // production before it existed.
    expect(ROUTE).toContain('hasServedExplanation(teachingHistoryHoisted, explanationId)')
    expect(ROUTE).toContain('assembled = null')
  })

  it('the confidence/no-asset distinction is still drawn for turns that need it', () => {
    expect(ROUTE).toContain("activeCount === 0 ? 'No asset'")
    expect(ROUTE).toContain("activeCount > 0 ? 'Confidence failed'")
  })
})
