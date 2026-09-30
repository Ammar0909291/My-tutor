/**
 * "Looking at this diagram, what do you notice…" with no figure on screen
 * (real-learner run 2, production 2026-09-30, phys.opt.refraction): the
 * pointer clause is removed and the question kept.
 */
import { describe, it, expect } from 'vitest'
import { stripUnbackedFigureReferences } from '@/lib/teaching/figureReference'

describe('a direct-pointer clause before a comma', () => {
  it('production sentence 1', () => {
    const r = stripUnbackedFigureReferences('Looking at this diagram, what do you notice about how the incident ray, the normal line, and the water surface relate to each other?', false)
    expect(r.stripped).toBe(true)
    expect(r.text).toBe('What do you notice about how the incident ray, the normal line, and the water surface relate to each other?')
  })

  it('production sentence 2, after a bold label', () => {
    const r = stripUnbackedFigureReferences('In the wave picture, the same thing happens.\n\n**Question:** Looking at the sketch, what do you notice about the angle the incident ray makes with the normal?', false)
    expect(r.stripped).toBe(true)
    expect(r.text).not.toMatch(/sketch/)
    expect(r.text).toContain('What do you notice about the angle')
  })

  it('left alone when a figure IS on screen', () => {
    const t = 'Looking at this diagram, what do you notice about the arrow?'
    expect(stripUnbackedFigureReferences(t, true).text).toBe(t)
  })

  it('a conceptual clause with no figure noun is left alone', () => {
    const t = 'Looking at the numbers, what do you notice about the pattern?'
    expect(stripUnbackedFigureReferences(t, false).stripped).toBe(false)
  })
})
