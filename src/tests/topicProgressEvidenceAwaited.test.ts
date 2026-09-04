import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'

/**
 * R1 — THE EVIDENCE WRITE MUST NOT OUTLIVE THE RESPONSE.
 *
 * ── THE MEASURED FAILURE ────────────────────────────────────────────────────
 * Production Supabase postgres logs, 2026-09-04T12:48:59–12:50:23Z, during the
 * Tier A physics certification run. Eight backends blocked on ShareLock waiting
 * for one learner's own uncommitted `topic_progress` row:
 *
 *   INSERT INTO "public"."topic_progress" (...) ON CONFLICT DO NOTHING
 *   $2 = <one learner id>  $3 = 'physics'  $4 = 'phys.em.mutual-inductance'
 *   waits: 1s · 9.8s · 31.2s · 42.5s · 43.6s · 71.5s · 72.7s · 84.0s
 *   all released within 20 ms of each other
 *
 * EVERY blocked statement in that window carried the SAME userId and the SAME
 * topicSlug — this was one learner's turns blocking on each other, not four
 * concurrent workers colliding. `ON CONFLICT DO NOTHING` still waits on an
 * UNCOMMITTED conflicting tuple, so the open transaction from turn N blocked
 * turn N+1. Downstream: the client gave up at socket_timeout, `withRetry`
 * re-issued (each eventId appears twice in the logs, ~41 s apart), each retry
 * added another blocked backend holding a pool slot, and the starved pool
 * surfaced as Prisma P2024 → HTTP 500 on an unrelated query in the same
 * request (`topicProgress.findMany`, the one member of route.ts's 5-wide
 * Promise.all with neither withRetry nor .catch).
 *
 * ── THE CAUSE, AND WHY IT LOOKED CORRECT ────────────────────────────────────
 * The write is `await`ed — but INSIDE an async IIFE that nothing awaited. A
 * serverless instance freezes once its response is sent, so the implicit
 * transaction stayed open with its row lock held. route.ts states this exact
 * rule ~L299 for a sibling write ("an un-awaited write on a serverless runtime
 * can be reclaimed the moment this invocation ends"); it simply was not applied
 * here.
 *
 * ── WHAT THESE TESTS PIN ────────────────────────────────────────────────────
 * That the promise is CAPTURED rather than discarded, and SETTLED before the
 * response is returned. They are source assertions because the defect is a
 * property of the request lifecycle — a frozen serverless instance — which no
 * in-process test can reproduce. They deliberately do NOT pin where the settle
 * happens beyond "before the reply", so the write may keep running concurrently
 * with the ~1,000 lines of awaited work between the two points.
 */
const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf-8')

describe('R1 — the topic-progress evidence write is settled before the reply', () => {
  it('captures the IIFE promise instead of discarding it', () => {
    expect(ROUTE).toMatch(/let topicProgressEvidenceWrite: Promise<void> \| null = null/)
    expect(ROUTE).toMatch(/topicProgressEvidenceWrite = \(async \(\) => \{/)
  })

  it('keeps a .catch on the launch, so the unhandled window before the settle is safe', () => {
    // Between the launch and the settle the promise has no handler attached by
    // the await yet; a rejection there (a failed dynamic import, say) would be
    // an unhandled rejection. The catch is not redundant with the await.
    expect(ROUTE).toMatch(/\}\)\(\)\.catch\(\(\) => \{\}\)/)
  })

  it('awaits it before the response is returned', () => {
    const capture = ROUTE.indexOf('topicProgressEvidenceWrite = (async () => {')
    const settle = ROUTE.indexOf('await topicProgressEvidenceWrite')
    const reply = ROUTE.indexOf('return NextResponse.json({\n        success: true, text: cleanText, provider,')
    expect(capture).toBeGreaterThan(0)
    expect(settle).toBeGreaterThan(capture)
    expect(reply).toBeGreaterThan(settle)
  })

  it('settling can never fail the turn', () => {
    // The write is non-fatal by contract (its own .then/.catch report the
    // outcome and swallow it). Awaiting it must not introduce a throw path
    // that the fire-and-forget version did not have.
    const settle = ROUTE.indexOf('await topicProgressEvidenceWrite')
    const window = ROUTE.slice(settle - 200, settle + 200)
    expect(window).toMatch(/try \{ await topicProgressEvidenceWrite \} catch/)
  })

  it('the write it guards is still the idempotent, retried one — semantics unchanged', () => {
    // If this ever stops being withRetry(applyTopicProgressEvidence(...)), the
    // double-count protection this fix relies on is gone and awaiting it is no
    // longer obviously safe.
    expect(ROUTE).toMatch(/await withRetry\(\(\) => applyTopicProgressEvidence\(prisma, \{/)
  })
})
