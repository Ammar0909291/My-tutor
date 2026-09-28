/**
 * The confirm-back ("So you're saying … Is that right?") is removed wherever
 * it sits, and the teaching around it kept. Shapes are the production text of
 * Physics Unit-1 certification pass 1 (2026-09-28).
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { stripConfirmBack } from '@/lib/teaching/attributionGuard'

describe('removed', () => {
  it('server prefix + paraphrase + request -> only the verdict stays', () => {
    const t = "That's right. You said that 0.00420 has three significant figures (the leading zeros don't count, but the trailing zero after the decimal does) and that 4002 has four significant figures because the embedded zero is significant. Is that right?"
    expect(stripConfirmBack(t)).toEqual({ text: "That's right.", stripped: true })
  })

  it('a request followed by teaching keeps the teaching', () => {
    const t = "That's right. So you're saying that −2 m/s² means the acceleration points opposite the positive direction. Is that right? When we talk about acceleration we treat it as a vector."
    expect(stripConfirmBack(t).text).toBe("That's right. When we talk about acceleration we treat it as a vector.")
  })

  it('after "continue": the whole mirror goes (the caller supplies the fallback)', () => {
    const t = "So you'd like to keep moving forward with the lesson—have I got that right? Let me know if that's correct."
    expect(stripConfirmBack(t)).toEqual({ text: '', stripped: true })
    expect(stripConfirmBack("I take it you'd like me to keep moving forward with the lesson. Is that right?").text).toBe('')
  })

  it('", right?" + "please let me know if that\'s what you meant" (pass 1, velocity)', () => {
    const t = "So you're saying that the average velocity for the round-trip journey is the same as the average speed, right? Please let me know if that's what you meant."
    expect(stripConfirmBack(t).text).toBe('')
  })

  it('mirror mid-paragraph with later teaching paragraphs', () => {
    const t = "So you're saying the larger object must contain more heat because of its size—have I got that right?\n\nNow let's see how heat and temperature differ."
    expect(stripConfirmBack(t).text).toBe("Now let's see how heat and temperature differ.")
  })
})

describe('left alone', () => {
  it.each([
    'A student says: "If you make a wave bigger, it must also get longer." Is that right?',
    'Multiplying 0.4 by 0.5 gives 0.2, which is smaller than both. Is that right?',
    'Do you mean the first-order or the second-order term?',
    "That's correct — the drone's average velocity is 5 metres per second due east.",
    'Friction opposes relative motion. What happens if you double the normal force?',
  ])('%s', (t) => expect(stripConfirmBack(t)).toEqual({ text: t, stripped: false }))
})

describe('route wiring', () => {
  it('runs after the verdict repair and supplies a fallback when a turn empties', () => {
    const route = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
    const verdict = route.indexOf('repairMirrorWithVerdict({')
    const strip = route.indexOf('stripConfirmBack(cleanText)')
    expect(verdict).toBeGreaterThan(0)
    expect(strip).toBeGreaterThan(verdict)
    expect(route.slice(strip, strip + 1200)).toContain('conceptFallbackText')
  })
})
