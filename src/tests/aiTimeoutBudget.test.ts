import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { createFailoverRouter } from '@/lib/ai/providers/failoverRouter'
import { AITimeoutError } from '@/lib/ai/providers/types'
import type { AICompletionRequest, AICompletionResult, AIProvider } from '@/lib/ai/providers/types'

/**
 * SEV-1 regression guard: Tutor Max stopped responding because the AI failover
 * chain could not finish inside `api/learn/chat`'s function budget.
 *
 * The failing arithmetic was:
 *
 *     gemini attempt 1   30_000 ms
 *   + retry backoff         500 ms   (AITimeoutError.retryable === true, and
 *   + gemini attempt 2   30_000 ms    providers[0] is the one tier that retries)
 *   ---------------------------------
 *   = 60_500 ms  >  60_000 ms  (vercel.json maxDuration for the route)
 *
 * The lambda was killed 500 ms INSIDE the second Gemini attempt, so failover to
 * Groq was never reached and the degraded response never rendered.
 *
 * These tests read the REAL constants and the REAL config rather than replicas,
 * because a replica is exactly how this drifted out of sync unnoticed.
 */

const REPO_ROOT = join(__dirname, '..', '..')

function readSource(relPath: string): string {
  return readFileSync(join(REPO_ROOT, relPath), 'utf8')
}

/** Pull a `const TIMEOUT_MS = <number>` out of a provider module's source.
 *  The constant is module-private by design; reading it here avoids widening
 *  production API surface purely for a test. */
function timeoutOf(relPath: string): number {
  const src = readSource(relPath)
  const m = src.match(/const\s+TIMEOUT_MS\s*=\s*([0-9_]+)/)
  if (!m) throw new Error(`no TIMEOUT_MS found in ${relPath}`)
  return Number(m[1].replace(/_/g, ''))
}

const GEMINI_TIMEOUT_MS = timeoutOf('src/lib/ai/providers/gemini.ts')
const OPENROUTER_TIMEOUT_MS = timeoutOf('src/lib/ai/providers/openrouter.ts')
const GROQ_TIMEOUT_MS = timeoutOf('src/lib/ai/providers/groq.ts')

const RETRY_BACKOFF_MS = Number(
  readSource('src/lib/ai/providers/failoverRouter.ts')
    .match(/const\s+RETRY_BACKOFF_MS\s*=\s*([0-9_]+)/)![1].replace(/_/g, ''),
)

const ROUTE_BUDGET_MS =
  JSON.parse(readSource('vercel.json')).functions['src/app/api/learn/chat/route.ts'].maxDuration * 1000

/** Worst case the chain can spend before route.ts regains control: every
 *  provider in the chain burns its full timeout, one after the other. */
const WORST_CASE_CHAIN_MS = GEMINI_TIMEOUT_MS + OPENROUTER_TIMEOUT_MS + GROQ_TIMEOUT_MS

function stubProvider(
  name: string,
  behaviour: () => Promise<AICompletionResult>,
): AIProvider & { calls: number } {
  const p = {
    name,
    model: `${name}-test-model`,
    calls: 0,
    async complete(_req: AICompletionRequest) { p.calls++; return behaviour() },
    async healthCheck() { return true },
  }
  return p as AIProvider & { calls: number }
}

const REQ: AICompletionRequest = {
  messages: [{ role: 'user', content: 'hi' }],
  systemPrompt: 'sys',
  maxTokens: 800,
  temperature: 0.7,
}

const ok = (provider: string): AICompletionResult =>
  ({ text: 'answer', provider, finishReason: 'stop' } as AICompletionResult)

describe('SEV-1: AI timeout budget fits the function budget', () => {
  // ── Requirement 1: worst case < route timeout, STRICTLY ───────────────────
  it('the whole provider chain fits inside the route budget, strictly', () => {
    expect(WORST_CASE_CHAIN_MS).toBeLessThan(ROUTE_BUDGET_MS)
  })

  it('leaves real headroom for pre-AI work and the degraded render', () => {
    // Not just "under" — under with room for the awaited prisma reads before
    // the call and route.ts's degraded render after it.
    expect(ROUTE_BUDGET_MS - WORST_CASE_CHAIN_MS).toBeGreaterThanOrEqual(10_000)
  })

  it('the retired 2x-primary budget would NOT have fit (the actual bug)', () => {
    const retired = 30_000 + RETRY_BACKOFF_MS + 30_000
    expect(retired).toBe(60_500)
    expect(retired).toBeGreaterThan(ROUTE_BUDGET_MS)
  })

  it('even WITH a same-provider retry the current constants would still fit', () => {
    // Defence in depth: if the retry is ever re-enabled, the constants alone
    // must not put the route back over budget.
    const withRetry = GEMINI_TIMEOUT_MS + RETRY_BACKOFF_MS + WORST_CASE_CHAIN_MS
    expect(withRetry).toBeLessThan(ROUTE_BUDGET_MS)
  })

  // ── Requirement 2: failover executes before the lambda dies ───────────────
  it('a Gemini timeout fails over to the next provider on the FIRST failure', async () => {
    const gemini = stubProvider('gemini', () => Promise.reject(new AITimeoutError('gemini')))
    const groq = stubProvider('groq', async () => ok('groq'))
    const router = createFailoverRouter({
      providers: [gemini, groq],
      disableSameProviderRetry: true,
    })

    const result = await router.complete(REQ)

    expect(gemini.calls).toBe(1)          // no second 20s attempt
    expect(groq.calls).toBe(1)            // failover actually ran
    expect(result.provider).toBe('groq')  // a learner-visible answer
  })

  it('pays no retry backoff on the way to failover', async () => {
    const gemini = stubProvider('gemini', () => Promise.reject(new AITimeoutError('gemini')))
    const groq = stubProvider('groq', async () => ok('groq'))
    const router = createFailoverRouter({
      providers: [gemini, groq],
      disableSameProviderRetry: true,
    })

    const started = Date.now()
    await router.complete(REQ)
    expect(Date.now() - started).toBeLessThan(RETRY_BACKOFF_MS)
  })

  it('the production chain really disables the same-provider retry', () => {
    // The bug was that this mitigation existed but was wired ONLY into the
    // gemini_only diagnostic branch. Assert it on the production chain too.
    const src = readSource('src/lib/ai/router.ts')
    const occurrences = src.match(/disableSameProviderRetry:\s*true/g) ?? []
    expect(occurrences.length).toBeGreaterThanOrEqual(2)
  })

  // ── Requirement 3: the degraded response can always render ────────────────
  it('total chain exhaustion still leaves time for the degraded render', async () => {
    const gemini = stubProvider('gemini', () => Promise.reject(new AITimeoutError('gemini')))
    const groq = stubProvider('groq', () => Promise.reject(new AITimeoutError('groq')))
    const router = createFailoverRouter({
      providers: [gemini, groq],
      disableSameProviderRetry: true,
    })

    // Every provider failed -> complete() rejects, which is what hands control
    // back to route.ts's degraded path. It must REJECT, not hang.
    await expect(router.complete(REQ)).rejects.toBeInstanceOf(AITimeoutError)
    expect(gemini.calls).toBe(1)
    expect(groq.calls).toBe(1)

    // And it must reject with the budget still unspent.
    expect(GEMINI_TIMEOUT_MS + GROQ_TIMEOUT_MS).toBeLessThan(ROUTE_BUDGET_MS)
  })

  it('the client waits longer than the server can take, but less than the lambda', () => {
    // If the client aborts first, the learner never sees the degraded response
    // the server is still producing — and the client retry loop spawns a second
    // full server pipeline for one learner turn.
    const screen = readSource('src/components/learn/LessonScreen.tsx')
    const call = screen.match(/fetchWithTimeout\('\/api\/learn\/chat'[\s\S]*?\}, (\d+)\)/)
    expect(call, 'could not locate the /api/learn/chat fetch timeout').not.toBeNull()
    const clientTimeoutMs = Number(call![1])

    expect(clientTimeoutMs).toBeGreaterThan(WORST_CASE_CHAIN_MS)
    expect(clientTimeoutMs).toBeLessThan(ROUTE_BUDGET_MS)
  })

  // ── Requirement 4: successful Gemini calls are unchanged ──────────────────
  it('a successful Gemini call is served by Gemini, in one attempt', async () => {
    const gemini = stubProvider('gemini', async () => ok('gemini'))
    const groq = stubProvider('groq', async () => ok('groq'))
    const router = createFailoverRouter({
      providers: [gemini, groq],
      disableSameProviderRetry: true,
    })

    const result = await router.complete(REQ)

    expect(result.provider).toBe('gemini')
    expect(gemini.calls).toBe(1)
    expect(groq.calls).toBe(0)   // fallback never touched on the happy path
  })

  it('Gemini keeps the largest share of the budget as the primary tier', () => {
    expect(GEMINI_TIMEOUT_MS).toBeGreaterThan(GROQ_TIMEOUT_MS)
    expect(GEMINI_TIMEOUT_MS).toBeGreaterThan(OPENROUTER_TIMEOUT_MS)
  })

  // ── Requirement 5: nothing outside timeout handling moved ─────────────────
  it('a non-retryable failure still fails over exactly as before', async () => {
    const gemini = stubProvider('gemini', () => Promise.reject(new Error('404 model not found')))
    const groq = stubProvider('groq', async () => ok('groq'))
    const router = createFailoverRouter({
      providers: [gemini, groq],
      disableSameProviderRetry: true,
    })

    const result = await router.complete(REQ)
    expect(gemini.calls).toBe(1)
    expect(result.provider).toBe('groq')
  })

  it('provider ORDER is untouched: Gemini first, Groq last', () => {
    // Scoped to the main `candidates` array specifically — the 2026-08-21
    // A/B certification override (router.ts's per-request early-return
    // branch, ABOVE this array in the file) intentionally lists Groq first
    // within its own one-off array, since the whole point of that branch is
    // to try the overridden Groq model first for that single request. That
    // is a different array from the one this test pins; searching the whole
    // file (as this test previously did) picked up the override block's
    // earlier `key: GROQ_API_KEY` occurrence instead.
    const src = readSource('src/lib/ai/router.ts')
    const candidatesStart = src.indexOf('const candidates: Array<')
    expect(candidatesStart).toBeGreaterThan(-1)
    const scoped = src.slice(candidatesStart)
    const gi = scoped.indexOf('key: GEMINI_API_KEY')
    const oi = scoped.indexOf('key: OPENROUTER_API_KEY')
    const qi = scoped.indexOf('key: GROQ_API_KEY')
    expect(gi).toBeGreaterThan(-1)
    expect(gi).toBeLessThan(oi)
    expect(oi).toBeLessThan(qi)
  })
})
