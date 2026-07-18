/**
 * Regression tests — Tutor Max failure recovery (src/lib/learn/tutorRecovery.ts).
 *
 * Stability sprint P0 (failure loop): a soft AI fallback must be recognised as
 * a failure (not shown raw), and the recovery copy must escalate once failures
 * repeat so the student never sees the same sentence loop.
 */
import { describe, it, expect } from 'vitest'
import { isFallbackResponse, pickRecoveryMessage } from '@/lib/learn/tutorRecovery'

describe('isFallbackResponse', () => {
  it('flags a provider:fallback response', () => {
    expect(isFallbackResponse({ provider: 'fallback' })).toBe(true)
  })

  it('does not flag a real provider response', () => {
    expect(isFallbackResponse({ provider: 'groq' })).toBe(false)
    expect(isFallbackResponse({ provider: 'memory' })).toBe(false)
  })

  it('is safe on null/undefined/empty', () => {
    expect(isFallbackResponse(null)).toBe(false)
    expect(isFallbackResponse(undefined)).toBe(false)
    expect(isFallbackResponse({})).toBe(false)
  })
})

describe('pickRecoveryMessage', () => {
  it('shows the warm first-failure line on a single failure', () => {
    expect(pickRecoveryMessage(1, 'en')).toContain('cut off')
  })

  it('escalates to a different message on repeated failures — never the same loop', () => {
    const first = pickRecoveryMessage(1, 'en')
    const repeated = pickRecoveryMessage(2, 'en')
    expect(repeated).not.toBe(first)
    expect(repeated.toLowerCase()).toContain('connection problem')
  })

  it('returns localized copy for every supported language', () => {
    for (const lang of ['en', 'ru', 'hi'] as const) {
      expect(pickRecoveryMessage(1, lang).length).toBeGreaterThan(0)
      expect(pickRecoveryMessage(3, lang).length).toBeGreaterThan(0)
      expect(pickRecoveryMessage(3, lang)).not.toBe(pickRecoveryMessage(1, lang))
    }
  })
})
