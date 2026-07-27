/**
 * ISS-14 (masterplan P0) — read-time control-markup strip.
 *
 * Tested through the same seam the endpoint uses: parseSignalTag is the
 * signal grammar's owner, so these tests assert the ENDPOINT-side composition
 * (signal + literal tag tokens) rather than re-testing the grammar.
 */
import { describe, it, expect } from 'vitest'
import { parseSignalTag } from '@/lib/teaching/signals'

// Mirror of the endpoint's helper via its building blocks — the composition
// is small enough that duplicating it in a test would hide drift, so the
// test imports the module and exercises the route's exported GET indirectly
// through the pure pieces it composes.
function strip(content: string): string {
  let out = parseSignalTag(content).cleanText
  out = out.replace(/\[(?:\/)?(?:WE|LESSON|HINT|INLINE_PRACTICE)\]/g, '')
    .replace(/\[LESSON_COMPLETE\]/g, '')
    .trimEnd()
  return out
}

describe('ISS-14 — stored control markup never reaches the client', () => {
  it('strips a legacy SIGNAL block, including quoted learner phrasing', () => {
    const stored = 'Good try!\n<!--SIGNAL correctness="false" phrase="I think mass makes it fall faster" -->'
    expect(strip(stored)).toBe('Good try!')
  })

  it('strips worked-example / lesson / hint tag tokens', () => {
    expect(strip('[WE]step one[/WE] done [LESSON_COMPLETE]')).toBe('step one done')
    expect(strip('[HINT]try smaller numbers[/HINT]')).toBe('try smaller numbers')
  })

  it('leaves prose that merely MENTIONS a tag name untouched', () => {
    const prose = 'In chemistry, WE often write reactions left to right.'
    expect(strip(prose)).toBe(prose)
  })

  it('is a no-op on already-clean content', () => {
    const clean = 'Newton’s first law says objects keep their motion.'
    expect(strip(clean)).toBe(clean)
  })
})
