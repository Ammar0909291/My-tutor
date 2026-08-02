import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { AICompletionRequest } from '@/lib/ai/providers/types'

/**
 * P14 regression: the conversation window forwarded to the provider.
 *
 * Production evidence (2026-08-02 audit of the live database): the chat route
 * loads HISTORY_LIMIT=30 messages and hands all of them to routeAI, which then
 * kept only the last SIX — three exchanges. 1501 of 1881 recorded turns
 * (79.8%) were past message 6 in their session, so four turns in five were
 * answered with a truncated view of the conversation. That is the mechanism
 * behind the tutor re-asking questions the learner had already answered.
 *
 * These tests run against the REAL router module (no replica of its logic —
 * only the provider chain underneath it is stubbed), so they cannot drift
 * from the code they protect.
 */

const captured: AICompletionRequest[] = []

vi.mock('@/lib/ai/budget', () => ({
  consumeAIBudget: async () => {},
  AIBudgetExceededError: class extends Error {},
}))

vi.mock('@/lib/ai/providers/failoverRouter', () => ({
  createFailoverRouter: () => ({
    complete: async (req: AICompletionRequest) => {
      captured.push(req)
      return { text: 'ok', finishReason: 'stop', provider: 'gemini' }
    },
  }),
}))

function history(n: number) {
  return Array.from({ length: n }, (_, i) => ({
    role: (i % 2 === 0 ? 'user' : 'assistant') as 'user' | 'assistant',
    content: `turn-${i}`,
  }))
}

describe('provider conversation window', () => {
  beforeEach(() => {
    captured.length = 0
    vi.resetModules()
  })

  it('is 20 messages — the value already established for the other client', async () => {
    const { MAX_HISTORY_MESSAGES } = await import('@/lib/ai/router')
    expect(MAX_HISTORY_MESSAGES).toBe(20)
  })

  it('forwards far more than three exchanges (the defect was 6)', async () => {
    const { routeAI, MAX_HISTORY_MESSAGES } = await import('@/lib/ai/router')
    await routeAI(history(30), 'sys', 'in')
    expect(captured).toHaveLength(1)
    expect(captured[0].messages).toHaveLength(MAX_HISTORY_MESSAGES)
    expect(captured[0].messages.length).toBeGreaterThan(6)
  })

  it('keeps the MOST RECENT turns, never the oldest', async () => {
    const { routeAI } = await import('@/lib/ai/router')
    await routeAI(history(30), 'sys', 'in')
    const msgs = captured[0].messages
    expect(msgs[msgs.length - 1].content).toBe('turn-29')
    expect(msgs[0].content).toBe('turn-10')
  })

  it('a question asked 5 exchanges back still reaches the model', async () => {
    // The exact failure: at slice(-6) this question and its answer were both
    // gone by the time the tutor decided what to ask next, so it re-asked.
    const convo = [
      { role: 'assistant' as const, content: 'What state is water at 150C?' },
      { role: 'user' as const, content: 'Gas' },
      ...history(10),
    ]
    const { routeAI } = await import('@/lib/ai/router')
    await routeAI(convo, 'sys', 'in')
    const texts = captured[0].messages.map((m) => m.content)
    expect(texts).toContain('What state is water at 150C?')
    expect(texts).toContain('Gas')
  })

  it('does not pad a short conversation', async () => {
    const { routeAI } = await import('@/lib/ai/router')
    await routeAI(history(3), 'sys', 'in')
    expect(captured[0].messages).toHaveLength(3)
  })

  it('passes the system prompt through untouched', async () => {
    const { routeAI } = await import('@/lib/ai/router')
    await routeAI(history(8), 'SYSTEM-PROMPT-MARKER', 'in')
    expect(captured[0].systemPrompt).toBe('SYSTEM-PROMPT-MARKER')
  })
})

describe('lib/ai/client uses the shared provider chain', () => {
  beforeEach(() => {
    captured.length = 0
    vi.resetModules()
  })

  it('generateAIResponse routes through the failover router, not a private Groq client', async () => {
    const { generateAIResponse } = await import('@/lib/ai/client')
    const text = await generateAIResponse(history(4), 'sys')
    expect(text).toBe('ok')
    // Reaching the stubbed chain at all is the assertion: before this change
    // the call went straight to groq-sdk and never touched the router.
    expect(captured).toHaveLength(1)
  })

  it('generateAIResponse honours the same 20-message window', async () => {
    const { generateAIResponse } = await import('@/lib/ai/client')
    const { MAX_HISTORY_MESSAGES } = await import('@/lib/ai/router')
    await generateAIResponse(history(30), 'sys')
    expect(captured[0].messages).toHaveLength(MAX_HISTORY_MESSAGES)
  })

  it('generateJSON routes through the failover router and still parses', async () => {
    captured.length = 0
    vi.resetModules()
    vi.doMock('@/lib/ai/providers/failoverRouter', () => ({
      createFailoverRouter: () => ({
        complete: async (req: AICompletionRequest) => {
          captured.push(req)
          return { text: '```json\n[{"a":1}]\n```', finishReason: 'stop', provider: 'gemini' }
        },
      }),
    }))
    const { generateJSON } = await import('@/lib/ai/client')
    await expect(generateJSON('give me json')).resolves.toEqual([{ a: 1 }])
    expect(captured).toHaveLength(1)
    vi.doUnmock('@/lib/ai/providers/failoverRouter')
  })

  it('generateJSON still returns null (never throws) when the whole chain fails', async () => {
    captured.length = 0
    vi.resetModules()
    vi.doMock('@/lib/ai/providers/failoverRouter', () => ({
      createFailoverRouter: () => ({
        complete: async () => { throw new Error('all providers failed') },
      }),
    }))
    const { generateJSON } = await import('@/lib/ai/client')
    await expect(generateJSON('x')).resolves.toBeNull()
    // Pins that null came from the THROWN chain, not from a stub whose text
    // merely failed to parse — without this the test would pass either way.
    expect(captured).toHaveLength(0)
    vi.doUnmock('@/lib/ai/providers/failoverRouter')
  })
})
