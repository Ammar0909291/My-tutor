/**
 * PCD-002 (physics/chemistry real-student defect audit) — a raw
 * `FUNCTION_INVOCATION_TIMEOUT` body observed hitting `/api/learn/chat` was
 * traced to a QA-harness artifact: `scripts/qa/*.ts` call the endpoint with
 * plain, unbounded `fetch`, unlike the real browser client, which already
 * bounds the equivalent chat call at 50_000ms (below the server's own
 * 60_000ms maxDuration) and retries a dropped/aborted attempt
 * (`aiTimeoutBudget.test.ts` pins that contract). A genuine learner on the
 * real product already gets a graceful, warm recovery message on that path —
 * never a raw platform error.
 *
 * `callLessonInit` (lesson open/restart/review/next) had no such bound: a
 * bare `fetch` with no client-side timeout, so a genuinely stalled network
 * request (not just a slow server, which the server's own limit and error
 * handling already cover) could hold the lesson-opening screen in its
 * loading state indefinitely. This closes that one asymmetry with the chat
 * call by reusing the same `fetchWithTimeout` helper, bounded under the
 * server's own budget.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const ROUTE_BUDGET_MS =
  JSON.parse(readFileSync(join(process.cwd(), 'vercel.json'), 'utf8'))
    .functions['src/app/api/learn/lesson-init/route.ts'].maxDuration * 1000

function readScreen(): string {
  return readFileSync(join(process.cwd(), 'src/components/learn/LessonScreen.tsx'), 'utf8')
}

describe('callLessonInit is bounded by a client-side timeout', () => {
  it('uses fetchWithTimeout, not a bare fetch, for /api/learn/lesson-init', () => {
    const screen = readScreen()
    const call = screen.match(/fetchWithTimeout\('\/api\/learn\/lesson-init'[\s\S]*?\}, (\d+)\)/)
    expect(call, 'could not locate a bounded /api/learn/lesson-init call').not.toBeNull()
  })

  it('the bound sits under the server route\'s own maxDuration', () => {
    const screen = readScreen()
    const call = screen.match(/fetchWithTimeout\('\/api\/learn\/lesson-init'[\s\S]*?\}, (\d+)\)/)!
    const clientTimeoutMs = Number(call[1])
    expect(clientTimeoutMs).toBeGreaterThan(0)
    expect(clientTimeoutMs).toBeLessThan(ROUTE_BUDGET_MS)
  })

  it('a timed-out or failed call still lands on the warm recovery text, never a raw error', () => {
    const screen = readScreen()
    const callSite = screen.indexOf("fetchWithTimeout('/api/learn/lesson-init'")
    expect(callSite).toBeGreaterThan(-1)
    const nextCatch = screen.indexOf('} catch (err) {', callSite)
    expect(nextCatch).toBeGreaterThan(callSite)
    const catchBody = screen.slice(nextCatch, nextCatch + 400)
    expect(catchBody).toContain("t('lesson_load_error')")
  })
})
