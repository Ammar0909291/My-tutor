/**
 * AN OUTAGE IS NOT A TEACHING VERDICT.
 *
 * A nine-concept certification sweep exhausted the provider's rate limit
 * partway through. Every concept after that point reported an IDENTICAL
 * failure — 24 turns, phase still OBSERVE, checkCorrect 0, practiceCorrect 0 —
 * and production logs for the same window showed why:
 *
 *   [ai/attempt] provider=gemini http_status=429 error_name=AIRateLimitError
 *   [ai/router]  all providers failed: Rate limit exceeded on gemini
 *   [learn/chat] all providers down — serving degraded template (RS P-3)
 *
 * The teaching engine was never reached. Reported as D3-unreachable, that
 * would have sent someone to fix a mastery ladder that had not run — the
 * failure mode this harness has already been burned by three times.
 */
import { describe, it, expect } from 'vitest'
import { classifyOutcome } from '../../scripts/math/certify'
import { isDegradedProvider } from '../lib/eos-runtime/degradedMode'

describe('the harness reads the product’s own name for a degraded turn', () => {
  it('agrees with the single owner of that string', () => {
    expect(isDegradedProvider('degraded')).toBe(true)
    expect(isDegradedProvider('memory')).toBe(false)
    expect(isDegradedProvider('gemini')).toBe(false)
    expect(isDegradedProvider(null)).toBe(false)
    expect(isDegradedProvider(undefined)).toBe(false)
  })
})

describe('outcomes are three buckets, not two', () => {
  it('a clean run passes', () => {
    expect(classifyOutcome({ pass: true, failed: [] })).toBe('pass')
  })

  it('a real teaching failure is a teaching failure', () => {
    expect(classifyOutcome({ pass: false, failed: ['D2-ungradeable'] })).toBe('teaching-failure')
    expect(classifyOutcome({ pass: false, failed: ['D3-unreachable', 'D4-not-verified'] }))
      .toBe('teaching-failure')
  })

  it('an outage is UNMEASURED — never counted against the engine', () => {
    expect(classifyOutcome({ pass: false, failed: ['INFRASTRUCTURE-degraded'] })).toBe('unmeasured')
  })

  it('an outage stays unmeasured even when the run also recorded teaching codes', () => {
    // The run breaks at the outage, but codes raised on earlier turns survive
    // in the same array. The outage still wins: those turns cannot be trusted.
    expect(classifyOutcome({
      pass: false,
      failed: ['D3-unreachable', 'D4-not-verified', 'INFRASTRUCTURE-degraded'],
    })).toBe('unmeasured')
  })

  it('never reports a degraded run as a pass', () => {
    expect(classifyOutcome({ pass: true, failed: ['INFRASTRUCTURE-degraded'] })).toBe('unmeasured')
  })
})
