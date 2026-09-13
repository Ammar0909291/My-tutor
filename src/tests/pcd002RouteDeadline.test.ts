/**
 * PCD-002, SECOND CONTRIBUTOR — the request's own wall clock.
 *
 * The provider-chain half was fixed in 6326c91 and is guarded by
 * pcd002ChainDeadline.test.ts; nothing here weakens or re-tests it. This file
 * covers the half that entry named and deliberately left open: `/api/learn/chat`
 * bounded NONE of its ~27 direct Prisma calls, six of them sat inside a
 * 3-attempt retry, and the chain's 45s clock starts at the provider call rather
 * than at the request — so a stalled database, or merely slow DB work before a
 * healthy provider, reproduces the same raw FUNCTION_INVOCATION_TIMEOUT.
 *
 * ── NON-VACUITY ────────────────────────────────────────────────────────────
 * Every timing case asserts an elapsed-time LOWER bound as well as an upper
 * one. A deadline small enough to make the code skip the operation entirely
 * would otherwise pass a "timeout test" without ever timing anything out —
 * the exact way three cases in pcd002ChainDeadline.test.ts first passed
 * vacuously, recorded in that file and not repeated here.
 */
import { describe, it, expect, vi } from 'vitest'
import {
  createRouteDeadline, providerBudgetMs, dbBudgetMs, canAffordDbRetry,
  RouteDeadlineError, CHAT_ROUTE_BUDGET_MS, POST_PROVIDER_RESERVE_MS,
  CHAT_DB_OP_TIMEOUT_MS, MIN_DB_ATTEMPT_MS,
} from '@/lib/net/routeDeadline'
import { boundedDbCall } from '@/lib/db/boundedDbCall'
import { TimeoutError } from '@/lib/net/timeout'
import { AI_CHAIN_DEADLINE_MS } from '@/lib/ai/providers/failoverRouter'
import { readFileSync } from 'fs'

const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
/** A hang that outlives any budget under test — the real failure shape. */
const hang = <T>() => new Promise<T>(() => {})

// ───────────────────────────────────────────────────────────────────────────
describe('the budget arithmetic fits inside the function, with room to answer', () => {
  it('the route budget is strictly under vercel.json maxDuration for this route', () => {
    const vercel = JSON.parse(readFileSync('vercel.json', 'utf8'))
    const maxDuration = vercel.functions['src/app/api/learn/chat/route.ts'].maxDuration
    expect(maxDuration).toBe(60)
    // Not merely "less than": the unclaimed slack covers cold start, body
    // transfer and response serialisation — time the handler never controls.
    expect(CHAT_ROUTE_BUDGET_MS).toBeLessThanOrEqual(maxDuration * 1000 - 5_000)
  })

  it('CRITICAL — provider + DB combined cannot exceed the route budget', () => {
    // The worst case the old code allowed: the chain's full 45s starting AFTER
    // arbitrary DB work. Walk the clock forward and the grant shrinks with it.
    for (const spent of [0, 5_000, 20_000, 40_000, 50_000]) {
      const grant = providerBudgetMs(CHAT_ROUTE_BUDGET_MS - spent, AI_CHAIN_DEADLINE_MS)
      // WHENEVER THE CHAIN IS CALLED it finishes inside the budget with the
      // reserve still intact, so the awaited snapshot/message writes remain
      // affordable afterwards. A zero grant means the request was already too
      // far gone to afford a provider call — the correct answer, and the case
      // the degraded template and the route-level race between them cover.
      if (grant > 0) {
        expect(spent + grant + POST_PROVIDER_RESERVE_MS).toBeLessThanOrEqual(CHAT_ROUTE_BUDGET_MS)
      }
      expect(grant).toBeLessThanOrEqual(Math.max(0, CHAT_ROUTE_BUDGET_MS - spent))
    }
    // past the budget there is nothing to sell
    expect(providerBudgetMs(CHAT_ROUTE_BUDGET_MS - 60_000, AI_CHAIN_DEADLINE_MS)).toBe(0)
  })

  it('a healthy fast request is unaffected — the chain still gets its FULL 45s', () => {
    // The fix in 6326c91 must not be tightened by this one. The budget is
    // derived so that this is an identity, not a near-miss.
    expect(providerBudgetMs(CHAT_ROUTE_BUDGET_MS, AI_CHAIN_DEADLINE_MS)).toBe(AI_CHAIN_DEADLINE_MS)
    expect(CHAT_ROUTE_BUDGET_MS).toBe(AI_CHAIN_DEADLINE_MS + POST_PROVIDER_RESERVE_MS)
  })

  it('when even the reserve is unaffordable the provider is not called at all', () => {
    expect(providerBudgetMs(POST_PROVIDER_RESERVE_MS, AI_CHAIN_DEADLINE_MS)).toBe(0)
    expect(providerBudgetMs(-1_000, AI_CHAIN_DEADLINE_MS)).toBe(0)
  })

  it('a DB slice is min(per-op cap, remaining) and never negative', () => {
    expect(dbBudgetMs(60_000)).toBe(CHAT_DB_OP_TIMEOUT_MS)
    expect(dbBudgetMs(1_500)).toBe(1_500)
    expect(dbBudgetMs(-9_000)).toBe(0)
  })

  it('RETRY CANNOT EXCEED THE GLOBAL DEADLINE — affordability, not a counter', () => {
    expect(canAffordDbRetry(10_000, 300)).toBe(true)
    // backoff alone fits, a useful attempt does not: refuse
    expect(canAffordDbRetry(300 + MIN_DB_ATTEMPT_MS, 300)).toBe(false)
    expect(canAffordDbRetry(0, 300)).toBe(false)
  })

  it('the deadline is a real clock, and expires', () => {
    let t = 1_000
    const d = createRouteDeadline(5_000, () => t)
    expect(d.remainingMs()).toBe(5_000)
    t += 4_000
    expect(d.elapsedMs()).toBe(4_000)
    expect(d.expired()).toBe(false)
    t += 2_000
    expect(d.remainingMs()).toBe(-1_000)
    expect(d.expired()).toBe(true)
  })
})

// ───────────────────────────────────────────────────────────────────────────
describe('boundedDbCall — the operation is bounded by the REQUEST, not by itself', () => {
  it('1. healthy DB — the value is returned and nothing is bounded away', async () => {
    const d = createRouteDeadline(5_000)
    await expect(boundedDbCall(d, 'ok', async () => 'row')).resolves.toBe('row')
  })

  it('2. slow READ — times out inside the budget, and actually waited', async () => {
    const d = createRouteDeadline(600)
    const started = Date.now()
    await expect(boundedDbCall(d, 'chat-session-load', hang)).rejects.toBeInstanceOf(TimeoutError)
    const elapsed = Date.now() - started
    expect(elapsed).toBeGreaterThanOrEqual(500)   // NON-VACUITY: it ran and waited
    expect(elapsed).toBeLessThan(2_000)           // and it did not run to the platform limit
  })

  it('3. slow WRITE — same bound, and no retry is attempted', async () => {
    const d = createRouteDeadline(600)
    let calls = 0
    const started = Date.now()
    await expect(boundedDbCall(d, 'chat-assistant-message', () => { calls++; return hang() }))
      .rejects.toBeInstanceOf(TimeoutError)
    expect(Date.now() - started).toBeGreaterThanOrEqual(500)
    // 8. A TIMED-OUT WRITE CANNOT SILENTLY RETRY INTO DUPLICATE STATE.
    expect(calls).toBe(1)
  })

  it('4. DB unavailable — the real error propagates, never a fabricated value', async () => {
    const d = createRouteDeadline(5_000)
    const err = Object.assign(new Error("Can't reach database server"), { code: 'P1001' })
    await expect(boundedDbCall(d, 'chat-profile-load', () => Promise.reject(err)))
      .rejects.toThrow("Can't reach database")
  })

  it('a read MAY retry when the budget affords it, and the retry really runs', async () => {
    const d = createRouteDeadline(5_000)
    let calls = 0
    const out = await boundedDbCall(d, 'read', async () => {
      calls++
      if (calls === 1) throw Object.assign(new Error('Connection reset'), { code: 'P1017' })
      return 'second'
    }, { retries: 1, backoffMs: 20 })
    expect(out).toBe('second')
    expect(calls).toBe(2)
  })

  it('7. the SAME read refuses that retry when the budget cannot afford it', async () => {
    // Non-vacuous by construction: the FIRST attempt must run and fail, so the
    // refusal is about the retry and not about skipping the operation.
    const d = createRouteDeadline(700)
    let calls = 0
    const started = Date.now()
    await expect(boundedDbCall(d, 'read', async () => {
      calls++
      await sleep(600)
      throw Object.assign(new Error('Connection reset'), { code: 'P1017' })
    }, { retries: 3, backoffMs: 400 })).rejects.toThrow('Connection reset')
    const elapsed = Date.now() - started
    expect(calls).toBe(1)
    expect(elapsed).toBeGreaterThanOrEqual(550)  // the attempt genuinely ran
    expect(elapsed).toBeLessThan(2_000)          // three attempts would be ~3s+
  })

  it('an exhausted request refuses to start work it cannot finish', async () => {
    let t = 0
    const d = createRouteDeadline(1_000, () => t)
    t = 5_000
    let calls = 0
    await expect(boundedDbCall(d, 'late', () => { calls++; return Promise.resolve(1) }))
      .rejects.toBeInstanceOf(TimeoutError)
    expect(calls).toBe(0)
  })

  it('5. a provider that consumed most of the budget leaves DB work only the rest', async () => {
    const d = createRouteDeadline(CHAT_ROUTE_BUDGET_MS, (() => {
      let n = 0
      // arrival, then every later read reports 48s spent (a long provider turn)
      return () => (n++ === 0 ? 0 : 48_000)
    })())
    expect(dbBudgetMs(d.remainingMs())).toBe(7_000)
    expect(dbBudgetMs(d.remainingMs())).toBeLessThan(CHAT_DB_OP_TIMEOUT_MS)
  })
})

// ───────────────────────────────────────────────────────────────────────────
describe('the route is wired to all of it — and both subjects share this path', () => {
  it('the handler is raced against one clock created at the first line', () => {
    expect(ROUTE).toContain('export async function POST(req: Request) {')
    expect(ROUTE).toMatch(/const deadline = createRouteDeadline\(\)/)
    expect(ROUTE).toMatch(/Promise\.race\(\[\s*\n\s*handleChatTurn\(req, deadline\)/)
    // and losing the race answers honestly rather than letting the platform 504
    expect(ROUTE).toContain("kind: 'route_deadline'")
    expect(ROUTE).toContain("outcome: 'route-deadline'")
  })

  it('the provider chain is granted min(chain cap, remaining - reserve)', () => {
    expect(ROUTE).toContain('const aiBudgetMs = providerBudgetMs(deadline.remainingMs(), AI_CHAIN_DEADLINE_MS)')
    // Passed INTO the chain rather than wrapped around it: the chain then stops
    // itself at the right moment using the machinery 6326c91 already built,
    // instead of being abandoned mid-flight from outside. `complete()` takes the
    // MINIMUM of the two, so this can only ever narrow.
    expect(ROUTE).toMatch(/groqModelOverride,\s*\n\s*aiBudgetMs,/)
    const router = readFileSync('src/lib/ai/router.ts', 'utf8')
    expect(router).toContain('.complete(req, chainDeadlineMs)')
    const failover = readFileSync('src/lib/ai/providers/failoverRouter.ts', 'utf8')
    expect(failover).toMatch(/Math\.min\(opts\.deadlineMs \?\? AI_CHAIN_DEADLINE_MS/)
    // a zero grant must SKIP the call, not shrink it to nothing and hang
    expect(ROUTE).toMatch(/if \(aiBudgetMs <= 0\)/)
  })

  it('every DB call on the turn path is bounded — withRetry is gone from this route', () => {
    // withRetry has no reference to any request clock; that is the defect.
    expect(ROUTE).not.toMatch(/\bwithRetry\(/)
    for (const label of [
      'chat-session-load', 'chat-profile-load', 'chat-user-message',
      'chat-assistant-message', 'chat-topic-progress', 'chat-cert-model-flag',
    ]) {
      expect(ROUTE, `${label} must be bounded`).toContain(`'${label}'`)
    }
  })

  it('the MESSAGE writes are not retried — no duplicate turn', () => {
    // Idempotency, checked per write rather than assumed for the class. Neither
    // message row carries a key, so a timeout that had actually committed would
    // duplicate the learner's message and corrupt history order.
    //
    // `chat-topic-progress` is deliberately NOT in this list: it DOES carry a
    // key (`eventId` -> `lastEvidenceMessageId`, guarded inside the increment),
    // so a repeated apply returns 'duplicate'. A first draft of this change
    // grouped it here on a mistaken reading and removed its retry;
    // topicProgressEvidenceAwaited.test.ts caught it, and the distinction is
    // pinned in both directions now.
    for (const label of ['chat-user-message', 'chat-assistant-message']) {
      const at = ROUTE.indexOf(`'${label}'`)
      expect(at).toBeGreaterThan(0)
      expect(ROUTE.slice(at, at + 600)).not.toMatch(/retries:\s*[1-9]/)
    }
    // the retryable one keeps its retry, and says why in place
    const tp = ROUTE.indexOf("'chat-topic-progress'")
    expect(ROUTE.slice(tp, tp + 400)).toMatch(/retries:\s*2/)
  })

  it('the four exhaustion outcomes stay distinguishable in telemetry', () => {
    for (const o of ['provider-deadline', 'db-timeout', 'db-unavailable', 'route-deadline']) {
      expect(ROUTE + readFileSync('src/lib/db/boundedDbCall.ts', 'utf8')).toContain(`'${o}'`)
    }
    expect(ROUTE).toContain('recordBudgetEvent')
  })

  it('PHYSICS and CHEMISTRY run the same shared route — no subject branch here', () => {
    // The defect was recorded in chemistry; the path is shared, so a fix that
    // keyed on a subject would be the wrong fix. Nothing in the budget layer
    // mentions one.
    const budgetLayer = readFileSync('src/lib/net/routeDeadline.ts', 'utf8')
      + readFileSync('src/lib/db/boundedDbCall.ts', 'utf8')
    expect(budgetLayer).not.toMatch(/physics|chemistry|phys\.|chem\./i)
  })
})
