/**
 * LLM-DEPENDENCY INSTRUMENTATION (Phase 1) — wiring guard.
 *
 * ── WHY THIS IS A SOURCE-LEVEL TEST ────────────────────────────────────────
 * route.ts needs auth, a database and a live model, so it cannot be booted
 * here — the same constraint `signalEvidenceRouteWiring`-style tests already
 * work around by asserting against the real route source. What matters for
 * instrumentation is not a return value but that the counter is incremented at
 * EVERY provider call site and that the payload reaches the message write. A
 * missed increment does not fail anything at runtime; it silently
 * under-reports, which is the exact failure mode that made the dependency
 * audit estimate instead of measure.
 *
 * This asserts the two properties that cannot be checked any other way without
 * production traffic:
 *   1. every routeAI() call site in the chat route is counted
 *   2. the instrumentation payload is on the message create
 *
 * It deliberately does NOT assert teaching behaviour — Phase 1 changes none.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'

const ROUTE = readFileSync(
  join(process.cwd(), 'src/app/api/learn/chat/route.ts'),
  'utf8',
)

describe('Phase 1 instrumentation — every provider call is counted', () => {
  it('the chat route increments llmCallCount at EVERY routeAI() call site', () => {
    // Count real invocations, not the word in prose/comments: `routeAI(` with
    // an `await` in front is the call, and the route has three (primary
    // generation, definition-agreement repair, verifier-gate re-render).
    const callSites = ROUTE.match(/await routeAI\(/g) ?? []
    const increments = ROUTE.match(/llmCallCount\+\+/g) ?? []

    expect(callSites.length).toBeGreaterThan(0)
    // Exact equality, not >=: a spare increment over-reports the dependency
    // just as badly as a missing one under-reports it. If a future edit adds a
    // provider call, this fails until it is counted — which is the point.
    expect(increments.length).toBe(callSites.length)
  })

  it('llmCallCount starts at zero, so a memory- or degraded-served turn reports 0', () => {
    expect(ROUTE).toMatch(/let llmCallCount = 0/)
  })
})

describe('Phase 1 instrumentation — the payload reaches the write', () => {
  it('the assistant message create carries the instrumentation payload', () => {
    expect(ROUTE).toMatch(/const dependencyInstrumentation = \{/)
    expect(ROUTE).toMatch(/\.\.\.dependencyInstrumentation,/)
  })

  it('all four measured fields are populated from values the turn already has', () => {
    for (const field of [
      'teachingDecision: dispatchPlanHoisted?.decision',
      'dispatchExecutor: dispatchPlanHoisted?.executor',
      'memoryFallbackReason: memoryFallbackReasonCode',
      'llmCallCount,',
    ]) {
      expect(ROUTE).toContain(field)
    }
  })

  it("the initialised 'none' fallback reason is stored as NULL, not as the string", () => {
    // "no reason was recorded" and "a reason was recorded" must stay
    // distinguishable in the distribution query, otherwise every memory-served
    // turn reads as a fallback that never happened.
    expect(ROUTE).toMatch(/memoryFallbackReasonCode === 'none' \? null : memoryFallbackReasonCode/)
  })

  it('the write still degrades to a create WITHOUT the new columns', () => {
    // The pre-existing fail-open pattern: a turn must never fail because a
    // deploy has not applied a column yet. Instrumentation is never worth
    // losing a learner's turn over.
    const createCalls = ROUTE.match(/prisma\.message\.create\(\{/g) ?? []
    expect(createCalls.length).toBeGreaterThanOrEqual(2)
  })
})

describe('Phase 1 instrumentation — no teaching behaviour was added', () => {
  it('adds no provider call of its own', () => {
    // Three call sites is the pre-Phase-1 count. Instrumentation that measured
    // dependency by adding a call would be self-defeating.
    // H3 (2026-08-27): 3 -> 4. The fourth is the remediation output floor's
    // single regeneration — a reviewed, deliberate call site, counted here
    // exactly as this guard intends. It fires only when a remediation turn's
    // draft explained nothing at all, and it never loops (one attempt, then a
    // deterministic branch). See remediationOutputContract.test.ts.
    expect((ROUTE.match(/await routeAI\(/g) ?? []).length).toBe(4)
  })
})
