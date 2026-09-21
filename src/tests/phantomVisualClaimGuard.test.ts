import { describe, it, expect } from 'vitest'
import { stripPhantomVisualClaims } from '@/lib/teaching/visualRegistry'

/**
 * Grounding-contract defense-in-depth (real-learner QA, 2026-09-21).
 *
 * The VISUAL CONTRACT's NO-FIGURE prompt block already forbids the model
 * from claiming a visual exists when none is attached. This suite locks in
 * the deterministic backstop: real production-style transcripts (Chemistry
 * and English concepts, no curated visual available) where the model
 * ignored that instruction anyway, verbatim or close to it.
 */
describe('stripPhantomVisualClaims', () => {
  it('strips "look at the picture on your screen" (measured, English concept)', () => {
    const text = 'Take a look at the picture on your screen. It shows the five steps a computer follows when it works with language.'
    const result = stripPhantomVisualClaims(text)
    expect(result).not.toMatch(/look at the picture/i)
    expect(result).not.toMatch(/on your screen/i)
  })

  it('strips "the diagram is a simple flow chart" (measured, Chemistry concept)', () => {
    const text = 'The diagram is a simple flow chart. Nitration proceeds by first generating the electrophile.'
    const result = stripPhantomVisualClaims(text)
    expect(result).not.toMatch(/flow chart/i)
    expect(result).toMatch(/electrophile/i) // the real teaching content survives
  })

  it('strips "the image is a process flow diagram" (measured, English concept)', () => {
    const text = 'The image is a process flow diagram. Business messages should lead with the action you want the reader to take.'
    const result = stripPhantomVisualClaims(text)
    expect(result).not.toMatch(/process flow diagram/i)
    expect(result).toMatch(/business messages/i)
  })

  it('strips a future-tense promise that never arrives ("here\'s a diagram")', () => {
    const text = "Here's a diagram that explains the process. Let's continue with the next step."
    const result = stripPhantomVisualClaims(text)
    expect(result).not.toMatch(/here'?s a diagram/i)
    expect(result).toMatch(/next step/i)
  })

  it('leaves legitimate figurative language untouched ("imagine", "picture" as a verb)', () => {
    const text = 'Imagine a ball thrown at an angle. Picture the path it traces through the air.'
    const result = stripPhantomVisualClaims(text)
    expect(result).toBe(text)
  })

  it('leaves ordinary teaching prose with no visual reference untouched', () => {
    const text = 'Viscosity is a fluid\'s internal resistance to flow. Honey is more viscous than water.'
    expect(stripPhantomVisualClaims(text)).toBe(text)
  })

  it('never returns an empty string even if every sentence is a phantom claim', () => {
    const text = 'Look at the diagram on your screen. See the picture attached above.'
    const result = stripPhantomVisualClaims(text)
    expect(result.length).toBeGreaterThan(0)
  })

  it('preserves sentences before and after the stripped one', () => {
    const text = 'First, heat is added to the system. Look at the diagram on your screen showing the boundary. Then work is done on the surroundings.'
    const result = stripPhantomVisualClaims(text)
    expect(result).toMatch(/heat is added/i)
    expect(result).toMatch(/work is done/i)
    expect(result).not.toMatch(/on your screen/i)
  })
})
