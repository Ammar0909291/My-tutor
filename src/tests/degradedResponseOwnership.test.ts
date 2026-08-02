/**
 * Single-owner lock for learner-facing degraded copy (audit 2026-08-02).
 *
 * The bug this file locks out: production showed TWO different degraded tutor
 * messages for one and the same condition ("every provider failed"), chosen
 * non-deterministically by the error kind of whichever provider happened to be
 * LAST in the failover chain.
 *
 *   · routeAI() caught AITimeoutError and returned a canned string with
 *     provider:'fallback'. The chat route saw success, so its K6 degraded path
 *     never ran and consecutiveOutages never incremented; the CLIENT then
 *     re-threw the soft fallback and rendered its own second ladder
 *     (pickRecoveryMessage — "Sorry, I got cut off there for a second…").
 *   · every OTHER exhaustion threw, reached the canonical K6/K5 path, and
 *     rendered renderOutage() — "Something on my side isn't responding…".
 *
 * The fix makes routeAI a pure failure REPORTER: it never authors
 * learner-facing text, so route.ts's degraded path is the single owner of what
 * an outage says. These tests assert that contract against the REAL router
 * module (not a replica), because a replica is exactly what let the two
 * implementations drift apart unnoticed.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { AITimeoutError, AIEmptyResponseError, AIProviderError } from '@/lib/ai/providers/types'

const complete = vi.fn()

vi.mock('@/lib/ai/providers/failoverRouter', () => ({
  createFailoverRouter: () => ({
    complete: (...args: unknown[]) => complete(...args),
    healthCheck: async () => ({}),
    providerNames: ['gemini'],
  }),
}))
vi.mock('@/lib/ai/budget', () => ({
  consumeAIBudget: async () => {},
  AIBudgetExceededError: class AIBudgetExceededError extends Error {},
}))
vi.mock('@/lib/monitoring', () => ({ captureError: () => {} }))

async function loadRouteAI() {
  // Fresh module each time: getRouter() memoises the router in module scope.
  vi.resetModules()
  return (await import('@/lib/ai/router')).routeAI
}

const MESSAGES = [{ role: 'user' as const, content: 'teach me fractions' }]

describe('routeAI never authors learner-facing degraded copy', () => {
  beforeEach(() => { complete.mockReset() })
  afterEach(() => { vi.restoreAllMocks() })

  it('a timeout at chain exhaustion THROWS (it used to return canned copy)', async () => {
    const routeAI = await loadRouteAI()
    complete.mockRejectedValue(new AITimeoutError('gemini'))
    await expect(routeAI(MESSAGES, 'sys', 'us')).rejects.toBeInstanceOf(AITimeoutError)
  })

  it('an error whose MESSAGE merely contains "timed out" also throws', async () => {
    // The retired branch matched on the message string, so any provider error
    // that happened to mention a timeout was silently converted to fake success.
    const routeAI = await loadRouteAI()
    complete.mockRejectedValue(new Error('upstream request timed out after 30000ms'))
    await expect(routeAI(MESSAGES, 'sys', 'us')).rejects.toThrow(/timed out/)
  })

  it('throws identically for every failure mode — one owner, no error-kind split', async () => {
    const failures: Error[] = [
      new AITimeoutError('gemini'),                                  // timeout
      new AIEmptyResponseError('gemini'),                            // empty response
      new AIProviderError('401 Missing Authentication header', 'openrouter', 401, false),
      new AIProviderError('500 upstream error', 'groq', 500, true),  // retry/failover exhaustion
      new Error('socket hang up'),                                   // malformed/transport
    ]
    for (const err of failures) {
      const routeAI = await loadRouteAI()
      complete.mockRejectedValue(err)
      await expect(routeAI(MESSAGES, 'sys', 'us')).rejects.toBe(err)
    }
  })

  it('never resolves with provider "fallback" — the value the client re-threw on', async () => {
    const routeAI = await loadRouteAI()
    complete.mockRejectedValue(new AITimeoutError('gemini'))
    const result = await routeAI(MESSAGES, 'sys', 'us', 800, 'ru').catch(() => null)
    expect(result).toBeNull()
  })

  it('language no longer changes the failure outcome (routeAI has no copy to localise)', async () => {
    for (const lang of ['en', 'ru', 'hi'] as const) {
      const routeAI = await loadRouteAI()
      complete.mockRejectedValue(new AITimeoutError('gemini'))
      await expect(routeAI(MESSAGES, 'sys', 'us', 800, lang)).rejects.toBeInstanceOf(AITimeoutError)
    }
  })

  it('a successful completion is still passed through untouched', async () => {
    const routeAI = await loadRouteAI()
    complete.mockResolvedValue({ text: 'A fraction is a part of a whole.', provider: 'gemini', finishReason: 'stop' })
    await expect(routeAI(MESSAGES, 'sys', 'us')).resolves.toEqual({
      text: 'A fraction is a part of a whole.', provider: 'gemini', finishReason: 'stop',
    })
  })
})

describe('the two degraded ladders own disjoint conditions', () => {
  it('the server ladder owns AI failure; its copy is distinct from the client ladder', async () => {
    const { renderOutage, chooseFallback } = await import('@/lib/kernel/verifier/templateFallback')
    const { pickRecoveryMessage } = await import('@/lib/learn/tutorRecovery')
    const ctx = { register: 'beginner' as const, learnerText: 'ok' }
    const base = chooseFallback(['SHOW_EASIEST_LEGAL'])

    // Every rung of each ladder is distinct text — so if both ever fire for
    // one condition again, the regression is visible rather than plausible.
    const server = [1, 2, 3].map((n) => renderOutage(n, base, ctx))
    const client = [1, 2].map((n) => pickRecoveryMessage(n, 'en'))
    for (const s of server) for (const c of client) expect(s).not.toBe(c)
  })

  it('the client ladder remains reachable only for transport failure (no server response)', async () => {
    const { isFallbackResponse } = await import('@/lib/learn/tutorRecovery')
    // A degraded turn now reaches the client as a normal, successful turn
    // carrying the SERVER's copy — the client must not re-throw it and
    // substitute its own message.
    expect(isFallbackResponse({ provider: 'degraded' })).toBe(false)
    expect(isFallbackResponse({ provider: 'gemini' })).toBe(false)
    expect(isFallbackResponse({ provider: 'memory' })).toBe(false)
  })
})
