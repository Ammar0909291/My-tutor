/**
 * LESSON-INIT EXECUTION TELEMETRY — closing the measurement gap.
 *
 * ── WHY THIS EXISTS ─────────────────────────────────────────────────────────
 * `lesson-init` persisted only `{sessionId, role, content}` (plus lessonKey).
 * It wrote no `provider` and no `llmCallCount`, so EVERY lesson opening was
 * invisible to the Phase 1 instrumentation — while spending exactly one
 * provider call. Measured 2026-08-17: 42 lesson starts against 682 assistant
 * turns (~6.2%), meaning any "% LLM-dependent" computed from `messages` was
 * systematically under-counting by roughly that rate.
 *
 * This is measurement infrastructure only. No teaching behaviour, no new
 * provider call, no lesson-opening replacement (explicitly rejected by CTO
 * judgement — the opening carries genuine teaching content).
 *
 * route.ts / lesson-init need auth, a database and a live model and cannot be
 * booted here, so the wiring is asserted against the real route source, the
 * same approach the existing signal/evidence route-wiring tests take.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'

const REPO = (p: string) => readFileSync(join(process.cwd(), p), 'utf8')
const INIT = REPO('src/app/api/learn/lesson-init/route.ts')
const CHAT = REPO('src/app/api/learn/chat/route.ts')
const SCREEN = REPO('src/components/learn/LessonScreen.tsx')

describe('1-3 — calls are COUNTED, not flagged', () => {
  it('the counter starts at zero and increments at the provider call site', () => {
    expect(INIT).toMatch(/let llmCallCount = 0/)
    expect(INIT).toMatch(/llmCallCount\+\+/)
  })

  it('every routeAI call site in lesson-init is counted — exact equality', () => {
    // A spare increment over-reports the dependency exactly as badly as a
    // missing one under-reports it. If a retry or rerender is ever added here,
    // this fails until it is counted.
    const sites = INIT.match(/await routeAI\(/g) ?? []
    const incs = INIT.match(/llmCallCount\+\+/g) ?? []
    expect(sites.length).toBeGreaterThan(0)
    expect(incs.length).toBe(sites.length)
  })

  it('the count is incremented BEFORE the await, so a thrown chain still records it', () => {
    // The degraded path below the call serves a template, but the attempt was
    // paid for and must appear in the accounting.
    const inc = INIT.indexOf('llmCallCount++')
    const call = INIT.indexOf('await routeAI(')
    expect(inc).toBeGreaterThan(-1)
    expect(inc).toBeLessThan(call)
  })
})

describe('2 — provider and count are persisted on the opening', () => {
  it('the assistant message carries provider and llmCallCount', () => {
    expect(INIT).toMatch(/provider: routed\.provider,\s*\n\s*llmCallCount,/)
  })

  it('the response ships llmCallCount so the client can badge truthfully', () => {
    expect(INIT).toMatch(/success: true, text: routed\.text, provider: routed\.provider,[\s\S]{0,400}llmCallCount,/)
  })

  it('the client reads it off the lesson-init response', () => {
    expect(SCREEN).toContain('llmCallCount: data.llmCallCount')
  })
})

describe('4 — instrumentation introduces no provider call', () => {
  it('lesson-init still has exactly one routeAI call site', () => {
    expect((INIT.match(/await routeAI\(/g) ?? []).length).toBe(1)
  })

  it('the chat route is untouched at three sites', () => {
    expect((CHAT.match(/await routeAI\(/g) ?? []).length).toBe(3)
  })
})

describe('5 — telemetry never breaks a lesson start (fail-open)', () => {
  it('a failed write retries without the telemetry columns', () => {
    // Same rule the chat route already applies: a lesson must never fail to
    // start because of a column a deploy has not applied yet.
    const creates = INIT.match(/prisma\.message\.create\(\{/g) ?? []
    expect(creates.length).toBe(2)
    expect(INIT).toContain('message.create with telemetry failed, retrying without it')
  })

  it('the fallback write still records the lesson identity', () => {
    // Losing lessonKey would break per-lesson history isolation, which is a
    // real learner-facing behaviour, not telemetry.
    expect((INIT.match(/lessonKey: openingLessonKey/g) ?? []).length).toBe(2)
  })
})

describe('6-7 — provenance stays truthful', () => {
  it('a degraded opening is NOT badged AI, even though it spent an attempt', () => {
    // lesson-init attempts routeAI (count 1), the chain fails, and K6's
    // content-free template is served. The TEXT is not model output, so
    // counting alone would label an outage "AI Generated".
    expect(SCREEN).toContain("if (msg.provider === 'degraded') return <MemoryBadge />")
  })

  it('the degraded check precedes the count check', () => {
    const deg = SCREEN.indexOf("msg.provider === 'degraded'")
    const cnt = SCREEN.indexOf('const spent = msg.llmCallCount')
    expect(deg).toBeGreaterThan(-1)
    expect(deg).toBeLessThan(cnt)
  })

  it('no historical backfill is performed anywhere', () => {
    // Rows written before the column existed must stay honestly unattributed
    // rather than retro-labelled with a count nobody recorded.
    for (const src of [INIT, CHAT]) {
      expect(src).not.toMatch(/updateMany[\s\S]{0,200}llmCallCount/)
    }
  })
})

describe('8 — the existing chat instrumentation is unchanged', () => {
  it('chat still counts, persists and ships its own telemetry', () => {
    expect(CHAT).toContain('let llmCallCount = 0')
    expect(CHAT).toContain('const dependencyInstrumentation = {')
    expect(CHAT).toContain('...dependencyInstrumentation,')
  })

  it('the deterministic serving exclusions are untouched', () => {
    expect(CHAT).toContain('servedFromMemory || servedByGateRenderer || servedByLessonComplete')
  })
})
