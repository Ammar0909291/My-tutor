/**
 * The captured turn is the test.
 *
 * `PRIME_NUMBER_TURN` below is verbatim tutor output from a real lesson on the
 * test learner's account (math.nt.prime-number, 2026-08-18), on a turn that
 * carried no visual, no visualSpec and no sceneSpec. The learner was told twice
 * to read a number line that did not exist and then asked a question about it.
 */
import { describe, it, expect } from 'vitest'
import { stripUnbackedFigureReferences } from '@/lib/teaching/figureReference'

const PRIME_NUMBER_TURN = `Look at the number line displayed on your screen, which highlights the numbers 2, 3, 5, 7, 11, and 13.

Notice how these specific numbers cannot be formed by multiplying smaller whole numbers together (except for 1 times themselves), making them the fundamental building blocks of all other positive integers.

claudeTest, look at the highlighted points on the number line — why can't the number 2 be divided evenly into any smaller equal groups other than 1 and 2?`

describe('the captured production turn', () => {
  const r = stripUnbackedFigureReferences(PRIME_NUMBER_TURN, false)

  it('strips both references to the figure that was never attached', () => {
    expect(r.stripped).toBe(true)
    expect(r.text).not.toMatch(/on your screen/i)
    expect(r.text).not.toMatch(/look at the highlighted points/i)
    expect(r.removed).toHaveLength(2)
  })

  it('KEEPS the question — the learner is still asked what they were asked', () => {
    expect(r.text).toMatch(/why can't the number 2 be divided evenly/i)
    expect(r.text.trim().endsWith('?')).toBe(true)
  })

  it('keeps the teaching paragraph, which never mentioned a figure', () => {
    expect(r.text).toContain('fundamental building blocks of all other positive integers')
  })

  it('leaves the turn alone when the figure IS attached', () => {
    const withFigure = stripUnbackedFigureReferences(PRIME_NUMBER_TURN, true)
    expect(withFigure.stripped).toBe(false)
    expect(withFigure.text).toBe(PRIME_NUMBER_TURN)
  })
})

describe('what it must not touch', () => {
  it('leaves ordinary teaching prose alone', () => {
    const t = 'A prime number has exactly two divisors: 1 and itself. Notice that 1 fails this test.'
    expect(stripUnbackedFigureReferences(t, false).stripped).toBe(false)
  })

  it('does not fire on "notice" without a figure noun', () => {
    const t = 'Notice how these numbers cannot be formed by multiplying smaller whole numbers.'
    expect(stripUnbackedFigureReferences(t, false).text).toBe(t)
  })

  it('never removes a question, even one that mentions a figure', () => {
    const t = 'What does the diagram on your screen tell you about the slope?'
    const r = stripUnbackedFigureReferences(t, false)
    expect(r.text).toContain('?')
  })

  it('never returns an empty turn when the reference was the whole message', () => {
    const t = 'Look at the diagram on your screen.'
    const r = stripUnbackedFigureReferences(t, false)
    expect(r.text.trim().length).toBeGreaterThan(0)
    expect(r.stripped).toBe(false)
  })

  it('is idempotent', () => {
    const once = stripUnbackedFigureReferences(PRIME_NUMBER_TURN, false)
    const twice = stripUnbackedFigureReferences(once.text, false)
    expect(twice.text).toBe(once.text)
    expect(twice.stripped).toBe(false)
  })

  it('never throws, whatever it is handed', () => {
    for (const bad of [null, undefined, 42, {}, []]) {
      expect(() => stripUnbackedFigureReferences(bad as unknown as string, false)).not.toThrow()
    }
  })

  it('does not mangle a dash used for ordinary emphasis', () => {
    const t = 'A prime — unlike a composite — has exactly two divisors.'
    expect(stripUnbackedFigureReferences(t, false).text).toBe(t)
  })
})
