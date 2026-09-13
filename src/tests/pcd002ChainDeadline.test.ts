/**
 * PCD-002 — the provider chain could outlive the function that calls it.
 *
 * `/api/learn/chat` has maxDuration 60s (vercel.json). The chain's worst case,
 * from this repository's own provider constants:
 *
 *   default   groq 8 + 0.5 backoff + groq 8 + gemini 20 + openrouter 8  = 44.5s
 *   russian   yandex 15 + 0.5 + yandex 15 + gemini 20 + openrouter 8
 *               + groq 8                                                = 66.5s
 *
 * The Russian chain exceeds the whole function budget before a single database
 * read. When the PLATFORM kills the invocation there is no exception to catch,
 * so the degraded template the route carefully prepares never runs and the
 * learner gets a raw 504 with the session ended — PCD-002 exactly.
 *
 * These tests bound the chain in milliseconds rather than waiting out real
 * timeouts, and assert the property that matters: the chain RETURNS CONTROL
 * inside its budget, so the caller still has time to degrade gracefully.
 */
import { describe, it, expect, vi } from 'vitest'
import { createFailoverRouter, AI_CHAIN_DEADLINE_MS } from '@/lib/ai/providers/failoverRouter'
import { AIProviderError } from '@/lib/ai/providers/types'
import type { AIProvider } from '@/lib/ai/providers/types'

const req = { messages: [{ role: 'user' as const, content: 'hi' }], maxTokens: 256 }

/** A provider that hangs for `ms` — the shape a real timeout has. */
const slow = (name: string, ms: number): AIProvider => ({
  name, model: `${name}-model`,
  complete: () => new Promise((resolve) =>
    setTimeout(() => resolve({ text: 'late', usage: {}, model: name } as any), ms)),
  healthCheck: async () => true,
})

const instantFail = (name: string, retryable = false): AIProvider => ({
  name, model: `${name}-model`,
  complete: async () => { throw new AIProviderError(`${name} down`, name, 500, retryable) },
  healthCheck: async () => true,
})

const ok = (name: string): AIProvider => ({
  name, model: `${name}-model`,
  complete: async () => ({ text: 'served', usage: {}, model: name } as any),
  healthCheck: async () => true,
})

describe('PCD-002 — the chain is bounded by wall clock', () => {
  it('the budget sits inside the function budget, with room to persist and respond', () => {
    expect(AI_CHAIN_DEADLINE_MS).toBeLessThan(60_000)
    expect(60_000 - AI_CHAIN_DEADLINE_MS).toBeGreaterThanOrEqual(10_000)
  })

  it('RETURNS rather than running past the deadline — the whole defect', async () => {
    // Three providers that would each hang far past the budget: 15s of chain
    // against a 1.5s budget. The deadline must exceed MIN_ATTEMPT_MS, or the
    // chain short-circuits before starting and the race is never exercised —
    // an earlier draft of this test made exactly that mistake and passed
    // vacuously.
    const router = createFailoverRouter({
      providers: [slow('a', 5_000), slow('b', 5_000), slow('c', 5_000)],
      deadlineMs: 1_500,
    })
    const start = Date.now()
    await expect(router.complete(req as any)).rejects.toThrow()
    const elapsed = Date.now() - start
    expect(elapsed).toBeGreaterThanOrEqual(1_000)   // it really did attempt
    expect(elapsed).toBeLessThan(4_000)             // and did NOT run 15s
  }, 20_000)

  it('bounds the LAST attempt too, not just the gaps between tiers', async () => {
    // Checking the clock only between providers still lets the attempt already
    // started overshoot by its own full timeout. One slow provider proves the
    // race is per-attempt.
    const router = createFailoverRouter({ providers: [slow('only', 5_000)], deadlineMs: 1_500 })
    const start = Date.now()
    await expect(router.complete(req as any)).rejects.toThrow(/deadline/i)
    const elapsed = Date.now() - start
    expect(elapsed).toBeGreaterThanOrEqual(1_000)   // the attempt was started
    expect(elapsed).toBeLessThan(4_000)             // and cut off, not awaited
  }, 20_000)

  it('budgets the same-provider retry, the largest avoidable cost in the chain', async () => {
    const primary = instantFail('primary', true)
    const spy = vi.spyOn(primary, 'complete')
    // Above MIN_ATTEMPT_MS so the FIRST attempt runs, but below
    // backoff + MIN_ATTEMPT_MS so the retry cannot be afforded.
    const router = createFailoverRouter({ providers: [primary], deadlineMs: 1_200 })
    await expect(router.complete(req as any)).rejects.toThrow(/primary down/)
    expect(spy).toHaveBeenCalledTimes(1)
  }, 10_000)
})

describe('negative controls — a healthy turn is completely unaffected', () => {
  it('the primary answering immediately is served, deadline irrelevant', async () => {
    const router = createFailoverRouter({ providers: [ok('groq'), ok('gemini')] })
    const r = await router.complete(req as any)
    expect(r.text).toBe('served')
  })

  it('ordinary failover still happens when there is time', async () => {
    const router = createFailoverRouter({
      providers: [instantFail('groq'), ok('gemini')],
      deadlineMs: 10_000,
    })
    const r = await router.complete(req as any)
    expect(r.model).toBe('gemini')
  })

  it('the same-provider retry still runs when the budget allows it', async () => {
    const primary = instantFail('groq', true)
    const spy = vi.spyOn(primary, 'complete')
    const router = createFailoverRouter({ providers: [primary, ok('gemini')], deadlineMs: 10_000 })
    const r = await router.complete(req as any)
    expect(spy).toHaveBeenCalledTimes(2)   // first attempt + budgeted retry
    expect(r.model).toBe('gemini')
  }, 10_000)

  it('a genuine provider failure is still reported as itself, not as a deadline', async () => {
    // The caller distinguishes these: the route serves the degraded template
    // either way, but the telemetry must not relabel an outage as slowness.
    const router = createFailoverRouter({
      providers: [instantFail('groq'), instantFail('gemini')],
      deadlineMs: 10_000,
    })
    await expect(router.complete(req as any)).rejects.toThrow(/gemini down/)
  })
})
