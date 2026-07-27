/**
 * ISS-18 (masterplan P0) — verbatim redaction for minors.
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import {
  readRedactionMode, shouldRedact, redactedToken, persistableVerbatim,
  MINOR_GRADE_CEILING,
} from '@/lib/teaching/verbatimRedaction'

let saved: string | undefined
beforeEach(() => { saved = process.env.REDACT_MINOR_VERBATIMS; delete process.env.REDACT_MINOR_VERBATIMS })
afterEach(() => { if (saved === undefined) delete process.env.REDACT_MINOR_VERBATIMS; else process.env.REDACT_MINOR_VERBATIMS = saved })

describe('the flag defaults to protecting', () => {
  it('unset ⇒ minors mode — turning protection OFF is the act requiring a decision', () => {
    expect(readRedactionMode()).toBe('minors')
  })

  it('reads off / strict explicitly', () => {
    for (const [raw, mode] of [['off', 'off'], ['0', 'off'], ['false', 'off'], ['strict', 'strict'], ['all', 'strict']] as const) {
      process.env.REDACT_MINOR_VERBATIMS = raw
      expect(readRedactionMode()).toBe(mode)
    }
  })
})

describe('who gets redacted', () => {
  it('minors mode: known minors yes, known adults no', () => {
    expect(shouldRedact('minors', 3)).toBe(true)
    expect(shouldRedact('minors', MINOR_GRADE_CEILING)).toBe(true)
    expect(shouldRedact('minors', MINOR_GRADE_CEILING + 1)).toBe(false)
    expect(shouldRedact('minors', 12)).toBe(false)
  })

  it('minors mode: an UNKNOWN grade is not treated as a minor', () => {
    // Stated so the residual risk is visible rather than implied: a Library
    // learner under 16 with no grade set is NOT covered here. That is what
    // strict mode exists to close.
    expect(shouldRedact('minors', null)).toBe(false)
    expect(shouldRedact('minors', undefined)).toBe(false)
  })

  it('strict mode: redacts unless the learner is a KNOWN adult', () => {
    expect(shouldRedact('strict', null)).toBe(true)
    expect(shouldRedact('strict', undefined)).toBe(true)
    expect(shouldRedact('strict', 3)).toBe(true)
    expect(shouldRedact('strict', 12)).toBe(false)
  })

  it('off mode redacts nobody, including known minors', () => {
    expect(shouldRedact('off', 1)).toBe(false)
    expect(shouldRedact('off', null)).toBe(false)
  })
})

describe('what redaction preserves and what it destroys', () => {
  const phrase = 'heavier things fall faster'

  it('destroys readability — the token is never mistakable for learner text', () => {
    const t = redactedToken(phrase)
    expect(t).toMatch(/^redacted:[0-9a-f]{16}$/)
    expect(t).not.toContain('fall')
  })

  it('preserves cross-learner grouping — identical phrases hash identically', () => {
    expect(redactedToken(phrase)).toBe(redactedToken(phrase))
    // …including across trivial spacing/case differences, matching the
    // normalization learningAnalytics applies when it buckets by phrase.
    expect(redactedToken('  Heavier   Things Fall Faster ')).toBe(redactedToken(phrase))
    // …and distinct phrases stay distinct.
    expect(redactedToken('lighter things fall faster')).not.toBe(redactedToken(phrase))
  })

  it('persistableVerbatim hashes for a minor and passes an adult through', () => {
    expect(persistableVerbatim(phrase, { grade: 4, mode: 'minors' })).toBe(redactedToken(phrase))
    expect(persistableVerbatim(phrase, { grade: 12, mode: 'minors' })).toBe(phrase)
  })

  it('is deterministic and total on edge inputs', () => {
    expect(() => redactedToken('')).not.toThrow()
    expect(persistableVerbatim('', { grade: 4, mode: 'minors' })).toMatch(/^redacted:/)
  })
})
