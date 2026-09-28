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

describe('answer-report frames (unit 2, phys.mech.moment-of-inertia)', () => {
  it('"So you selected option A … Is that right?" is a confirm-back', () => {
    const r = stripConfirmBack('So you selected option A, ½ M R², as the moment of inertia for a solid cylinder about its central axis. Is that right?')
    expect(r).toEqual({ text: '', stripped: true })
  })
  it.each(['you chose', 'you picked', 'you answered', 'you went with'])('"%s …, right?" too', (f) => {
    expect(stripConfirmBack(`So ${f} 20 m/s. Is that correct?`).stripped).toBe(true)
  })
  it('an authored stem ending "Is that right?" with no frame is untouched', () => {
    const q = 'A student claims the net force is zero. Is that right?'
    expect(stripConfirmBack(q)).toEqual({ text: q, stripped: false })
  })
})

describe('"you\'re indicating" (unit 1 pass 3, phys.mech.kinematics-1d r2 s5)', () => {
  it('the confirm-back goes, the teaching question stays', () => {
    const r = stripConfirmBack("So you're indicating you're ready for me to keep going. Is that right? When you say the ball is going up, how do you decide whether the displacement s should be taken as positive or negative?")
    expect(r.stripped).toBe(true)
    expect(r.text).toBe('When you say the ball is going up, how do you decide whether the displacement s should be taken as positive or negative?')
  })
})

describe('"I hear you saying … Is that an accurate summary …?" (unit 3, phys.therm.second-law r1 s5)', () => {
  it('is a confirm-back', () => {
    const r = stripConfirmBack('So I hear you saying that the first law already prevents it, making the second law unnecessary. Is that an accurate summary of your thinking?')
    expect(r).toEqual({ text: '', stripped: true })
  })
})

describe('"have I understood you correctly?" (unit 3, phys.opt.single-slit r2 s7)', () => {
  it('is a confirm-back', () => {
    expect(stripConfirmBack('So you’re saying that the secondary bright bands are brighter than the central bright band—have I understood you correctly?'))
      .toEqual({ text: '', stripped: true })
  })
})
