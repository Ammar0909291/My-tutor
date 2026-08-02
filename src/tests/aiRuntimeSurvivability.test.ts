/**
 * OBJECTIVE 1 — the runtime must never die silently.
 *
 * Every teaching turn must end in EITHER a valid provider response OR the
 * degraded fallback. These tests pin the three defects that broke that
 * guarantee, each backed by production evidence gathered 2026-08-02 from the
 * Vercel runtime logs of prj_FwjmRdthApGhwdQY7FyDYThD7WJD.
 *
 * PRODUCTION EVIDENCE — the prompt is NOT the cause. 34 of 34 Gemini attempts
 * in the six hours before the fix returned outcome=ok, carrying the FULL
 * teaching prompt:
 *   [ai/attempt] provider=gemini model=gemini-3.5-flash-lite outcome=ok
 *     elapsed_ms=940  http_status=200 finish_reason=STOP prompt_tokens=7098
 *   [ai/attempt] ... elapsed_ms=925  ... prompt_tokens=7123
 *   [ai/attempt] ... elapsed_ms=1685 ... prompt_tokens=7147
 * A ~7k-token teaching prompt answers in about one second. Prompt size,
 * history size and output budget are therefore excluded as owners.
 *
 * PRODUCTION EVIDENCE — the real failure is the function being killed:
 *   "Vercel Runtime Timeout Error: Task timed out after 60 seconds"
 *   count=42 users=6 first=2026-07-15T11:41:39Z last=2026-08-02T15:33:56Z
 *   routes=/api/learn/chat, /api/learn/lesson-init, /api/curriculum/progress,
 *          /api/sessions/end
 *   (the same cluster also carries "Task timed out after 30 seconds")
 * A killed lambda emits no response body at all: no Gemini answer, and no
 * degraded template either.
 */
import { describe, it, expect, vi } from 'vitest'
import { readFileSync } from 'node:fs'
import { createFailoverRouter } from '@/lib/ai/providers/failoverRouter'
import { AITimeoutError } from '@/lib/ai/providers/types'
import type { AIProvider } from '@/lib/ai/providers/types'

const REQ = {
  messages: [{ role: 'user' as const, content: 'teach me' }],
  systemPrompt: 's', maxTokens: 2048, temperature: 0.7,
}

function stubProvider(name: string, behaviour: () => Promise<any>): AIProvider & { calls: number } {
  const p: any = {
    name, model: `${name}-m`, calls: 0,
    async complete() { p.calls++; return behaviour() },
    async healthCheck() { return true },
  }
  return p
}

/** Provider timeout constants, read from the source rather than restated. */
function timeoutOf(file: string): number {
  const src = readFileSync(`src/lib/ai/providers/${file}`, 'utf8')
  const m = src.match(/const TIMEOUT_MS = ([\d_]+)/)
  if (!m) throw new Error(`no TIMEOUT_MS in ${file}`)
  return Number(m[1].replace(/_/g, ''))
}

/** Route function budgets, read from vercel.json rather than restated. */
function budgetOf(routePath: string): number {
  const cfg = JSON.parse(readFileSync('vercel.json', 'utf8'))
  const entry = cfg.functions[routePath]
  if (!entry) throw new Error(`no vercel.json entry for ${routePath}`)
  return entry.maxDuration * 1000
}

describe('the provider chain must finish inside every route budget it runs on', () => {
  const chainWorstCase =
    timeoutOf('gemini.ts') + timeoutOf('openrouter.ts') + timeoutOf('groq.ts')

  it('the chain worst case is bounded and known', () => {
    // 20_000 + 8_000 + 8_000. If a provider timeout is raised, this test is the
    // thing that notices the chain no longer fits a route budget.
    expect(chainWorstCase).toBe(36_000)
  })

  it('fits /api/learn/chat with room for the degraded path to render', () => {
    const budget = budgetOf('src/app/api/learn/chat/route.ts')
    expect(chainWorstCase).toBeLessThan(budget)
    expect(budget - chainWorstCase).toBeGreaterThanOrEqual(10_000)
  })

  it('fits /api/learn/lesson-init — the lesson-startup path', () => {
    // REGRESSION: this route carried maxDuration 30 while running the identical
    // chain, so 36_000 > 30_000 and the lambda was killed before the chain
    // could even finish failing. Production logged the 30-second variant of the
    // timeout error on this route.
    const budget = budgetOf('src/app/api/learn/lesson-init/route.ts')
    expect(chainWorstCase).toBeLessThan(budget)
    expect(budget - chainWorstCase).toBeGreaterThanOrEqual(10_000)
  })

  it('no same-provider retry is added back — it did not fit either', () => {
    // gemini + backoff + gemini = 20_000 + 500 + 20_000 = 40_500, which fits
    // 60_000 but NOT lesson-init's former 30_000. The chain is a straight walk.
    const src = readFileSync('src/lib/ai/router.ts', 'utf8')
    expect(src).toContain('disableSameProviderRetry: true')
  })
})

describe('routeAI reports failure — it never absorbs one', () => {
  it('a timeout at chain exhaustion THROWS so the caller can degrade', async () => {
    vi.resetModules()
    vi.doMock('@/lib/ai/providers/failoverRouter', () => ({
      createFailoverRouter: () => ({
        complete: async () => { throw new AITimeoutError('gemini') },
        healthCheck: async () => ({}), providerNames: ['gemini'],
      }),
    }))
    vi.doMock('@/lib/ai/budget', () => ({
      consumeAIBudget: async () => {},
      AIBudgetExceededError: class extends Error {},
    }))
    vi.doMock('@/lib/monitoring', () => ({ captureError: () => {} }))

    const { routeAI } = await import('@/lib/ai/router')
    await expect(routeAI(REQ.messages, 's', 'us')).rejects.toBeInstanceOf(AITimeoutError)
    vi.doUnmock('@/lib/ai/providers/failoverRouter')
    vi.doUnmock('@/lib/ai/budget')
    vi.doUnmock('@/lib/monitoring')
    vi.resetModules()
  })

  it('never returns provider "fallback" with canned learner-facing copy', () => {
    // The swallowed-timeout branch reported failure as SUCCESS, so the caller's
    // degraded path never ran and lesson-init persisted the canned string as
    // the lesson opening.
    const src = readFileSync('src/lib/ai/router.ts', 'utf8')
    expect(src).not.toContain("provider: 'fallback'")
    expect(src).not.toContain("en: 'Taking longer than usual. Please try again.'")
  })
})

describe('a successful provider response is unchanged', () => {
  it('passes text, provider and finishReason straight through', async () => {
    const gemini = stubProvider('gemini', async () => ({
      text: 'A pure substance is uniform throughout.',
      finishReason: 'STOP', provider: 'gemini',
      usage: { promptTokens: 7098, completionTokens: 32 },
    }))
    const router = createFailoverRouter({ providers: [gemini], disableSameProviderRetry: true })
    const r = await router.complete(REQ as never)
    expect(r.text).toBe('A pure substance is uniform throughout.')
    expect(r.finishReason).toBe('STOP')
    expect(gemini.calls).toBe(1)
  })
})

describe('the degraded fallback is reachable and is teaching-shaped', () => {
  it('degradedTurn produces servable text and a distinguishable provider', async () => {
    const { degradedTurn } = await import('@/lib/eos-runtime')
    const d = degradedTurn({ register: 'beginner', learnerText: 'start the lesson' })
    expect(d.text.length).toBeGreaterThan(0)
    expect(d.provider).toBe('degraded')
    expect(d.finishReason).toBe('template')
  })

  it('lesson-init serves the degraded template instead of 500 / silence', () => {
    const src = readFileSync('src/app/api/learn/lesson-init/route.ts', 'utf8')
    // The route now catches provider failure and reuses the SAME template the
    // chat route serves, rather than throwing to its generic 500 handler.
    expect(src).toContain('degradedTurn')
    expect(src).toMatch(/catch \(aiError\)/)
    // Budget exhaustion is deliberately still a 429, not an outage.
    expect(src).toContain('AIBudgetExceededError')
  })

  it('lesson-init still persists the turn, so the transcript stays coherent', () => {
    const src = readFileSync('src/app/api/learn/lesson-init/route.ts', 'utf8')
    const degradedAt = src.indexOf('degradedTurn')
    const persistAt = src.indexOf('prisma.message.create')
    expect(degradedAt).toBeGreaterThan(-1)
    expect(persistAt).toBeGreaterThan(degradedAt) // persist happens after
  })
})
