import { describe, it, expect } from 'vitest'
import { renderFallback, renderOutage, chooseFallback } from '@/lib/kernel/verifier/templateFallback'

/**
 * Regression tests for the production transcript in which every provider
 * failed and the learner received SIX byte-identical replies while typing
 * "Got it", "Just start the damn lesson already" and "I don't understand,
 * explain differently".
 */

const ctx = { register: 'beginner' as const, learnerText: 'Got it' }
const BASE = chooseFallback(['SHOW_EASIEST_LEGAL'])

describe('outage escalation — never the same text twice', () => {
  it('the first outage still uses the existing template (no behaviour change)', () => {
    expect(renderOutage(1, BASE, ctx)).toBe(renderFallback(BASE, ctx))
  })

  it('the second outage does NOT repeat the first', () => {
    expect(renderOutage(2, BASE, ctx)).not.toBe(renderOutage(1, BASE, ctx))
  })

  it('the third does not repeat the second', () => {
    expect(renderOutage(3, BASE, ctx)).not.toBe(renderOutage(2, BASE, ctx))
  })

  it('six consecutive outages never produce six identical replies', () => {
    const texts = [1, 2, 3, 4, 5, 6].map((n) => renderOutage(n, BASE, ctx))
    expect(new Set(texts).size).toBeGreaterThan(1)
    // The exact observed failure: the first two must differ.
    expect(texts[0]).not.toBe(texts[1])
  })

  it('stops pretending to teach by the third turn, and says so plainly', () => {
    const third = renderOutage(3, BASE, ctx)
    expect(third).toMatch(/isn't responding|not responding/i)
    expect(third).toMatch(/try again/i)
  })

  it('never blames the learner', () => {
    const third = renderOutage(3, BASE, ctx)
    expect(third).toMatch(/isn't anything you did/i)
  })

  it('reassures that progress is safe', () => {
    expect(renderOutage(3, BASE, ctx)).toMatch(/progress is saved/i)
  })

  it('is stable for any further outage count', () => {
    expect(renderOutage(9, BASE, ctx)).toBe(renderOutage(3, BASE, ctx))
  })

  it('treats junk counts as the first outage rather than throwing', () => {
    expect(renderOutage(0, BASE, ctx)).toBe(renderOutage(1, BASE, ctx))
    expect(renderOutage(-5, BASE, ctx)).toBe(renderOutage(1, BASE, ctx))
    expect(renderOutage(Number.NaN, BASE, ctx)).toBe(renderOutage(1, BASE, ctx))
  })

  it('never asks a question — outage templates must stay verifier-clean', () => {
    for (const n of [1, 2, 3]) expect(renderOutage(n, BASE, ctx)).not.toContain('?')
  })

  it('never echoes the learner text back', () => {
    const angry = { register: 'beginner' as const, learnerText: 'Just start the damn lesson already' }
    for (const n of [1, 2, 3]) {
      expect(renderOutage(n, BASE, angry)).not.toContain('damn')
    }
  })
})

describe('existing templates unchanged (no regression)', () => {
  it('renderFallback still returns each template', () => {
    expect(renderFallback('SHOW_EASIEST_LEGAL', ctx)).toMatch(/one small step together/)
    expect(renderFallback('ECHO_MICROWIN', ctx)).toMatch(/good start/)
    expect(renderFallback('WARM_CLOSE', ctx)).toMatch(/good place to stop/)
  })

  it('chooseFallback still honours the chain and defaults safely', () => {
    expect(chooseFallback(['ECHO_MICROWIN'])).toBe('ECHO_MICROWIN')
    expect(chooseFallback([])).toBe('WARM_CLOSE')
  })
})
