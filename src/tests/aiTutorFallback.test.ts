/**
 * aiTutorFallback.test.ts
 *
 * Tests for AI tutor error handling.
 * The AI client (src/lib/ai/client.ts) uses Groq/llama-3.1-8b-instant.
 *
 * We test:
 * - When AI returns null/undefined → caller receives empty string
 * - Error message sanitization (no raw error details leaked)
 * - Safe fallback values
 * - Input validation that route handlers perform before calling AI
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { z } from 'zod'

// ── Simulated AI response handling ────────────────────────────────────────────

/** Mirrors the return in generateAIResponse: response.choices[0]?.message?.content ?? '' */
function extractAIContent(response: unknown): string {
  if (response === null || response === undefined) return ''
  if (typeof response !== 'object') return ''
  const r = response as Record<string, unknown>
  const choices = r['choices']
  if (!Array.isArray(choices) || choices.length === 0) return ''
  const choice = choices[0] as Record<string, unknown>
  const message = choice['message'] as Record<string, unknown> | undefined
  return (message?.['content'] as string) ?? ''
}

/** Safe error handler: returns a generic message, never raw error details. */
function handleAIError(error: unknown): { success: false; error: string } {
  if (error instanceof Error) {
    // Never expose raw error message to client
    const isRateLimit = error.message.toLowerCase().includes('rate limit') ||
      error.message.toLowerCase().includes('429')
    if (isRateLimit) {
      return { success: false, error: 'Rate limit reached. Please try again later.' }
    }
  }
  return { success: false, error: 'AI service temporarily unavailable' }
}

/** Validates learn/chat route input (message length bounds from route schema). */
const chatSchema = z.object({
  sessionId: z.string(),
  message: z.string().min(1).max(8000),
})

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('AI content extraction — null/undefined handling', () => {
  it('null response → empty string', () => {
    expect(extractAIContent(null)).toBe('')
  })

  it('undefined response → empty string', () => {
    expect(extractAIContent(undefined)).toBe('')
  })

  it('empty choices array → empty string', () => {
    expect(extractAIContent({ choices: [] })).toBe('')
  })

  it('choices[0].message.content undefined → empty string', () => {
    expect(extractAIContent({ choices: [{ message: {} }] })).toBe('')
  })

  it('choices[0].message.content null → empty string', () => {
    expect(extractAIContent({ choices: [{ message: { content: null } }] })).toBe('')
  })

  it('valid response → returns content string', () => {
    const response = { choices: [{ message: { content: 'Hello, I am your tutor!' } }] }
    expect(extractAIContent(response)).toBe('Hello, I am your tutor!')
  })

  it('malformed response (no choices key) → empty string', () => {
    expect(extractAIContent({ data: 'something' })).toBe('')
  })
})

describe('AI error handling — safe error messages', () => {
  it('generic error → returns safe generic message, not raw error', () => {
    const err = new Error('Internal server error: connection refused to 10.0.0.1:5432')
    const result = handleAIError(err)
    expect(result.success).toBe(false)
    expect(result.error).not.toContain('10.0.0.1')
    expect(result.error).not.toContain('connection refused')
  })

  it('rate limit error → returns rate limit message', () => {
    const err = new Error('Error 429: rate limit exceeded')
    const result = handleAIError(err)
    expect(result.success).toBe(false)
    expect(result.error.toLowerCase()).toContain('rate limit')
  })

  it('non-Error thrown → returns generic message', () => {
    const result = handleAIError('string error')
    expect(result.success).toBe(false)
    expect(result.error).toBe('AI service temporarily unavailable')
  })

  it('null thrown → returns generic message', () => {
    const result = handleAIError(null)
    expect(result.success).toBe(false)
    expect(result.error).toBe('AI service temporarily unavailable')
  })
})

describe('learn/chat route input validation', () => {
  it('valid input passes schema', () => {
    const result = chatSchema.safeParse({ sessionId: 'sess-123', message: 'Hello' })
    expect(result.success).toBe(true)
  })

  it('empty message fails validation', () => {
    const result = chatSchema.safeParse({ sessionId: 'sess-123', message: '' })
    expect(result.success).toBe(false)
  })

  it('message over 8000 chars fails validation', () => {
    const result = chatSchema.safeParse({ sessionId: 'sess-123', message: 'a'.repeat(8001) })
    expect(result.success).toBe(false)
  })

  it('message exactly 8000 chars passes validation', () => {
    const result = chatSchema.safeParse({ sessionId: 'sess-123', message: 'a'.repeat(8000) })
    expect(result.success).toBe(true)
  })

  it('missing sessionId fails validation', () => {
    const result = chatSchema.safeParse({ message: 'Hello' })
    expect(result.success).toBe(false)
  })

  it('message=1 char passes validation', () => {
    const result = chatSchema.safeParse({ sessionId: 'sess-1', message: '?' })
    expect(result.success).toBe(true)
  })
})

describe('AI response JSON parsing safety', () => {
  function safeParsJSON(text: string): unknown {
    try {
      return JSON.parse(text)
    } catch {
      return null
    }
  }

  it('valid JSON → parsed object', () => {
    const result = safeParsJSON('{"score": 85}')
    expect(result).toEqual({ score: 85 })
  })

  it('malformed JSON → null (not thrown)', () => {
    const result = safeParsJSON('{invalid json}')
    expect(result).toBeNull()
  })

  it('empty string → null', () => {
    const result = safeParsJSON('')
    expect(result).toBeNull()
  })

  it('truncated JSON → null', () => {
    const result = safeParsJSON('{"partial":')
    expect(result).toBeNull()
  })
})
