/**
 * A word from another subject put that subject's figure on screen.
 *
 * MEASURED LIVE 2026-10-01 (phys.mech.friction, real account, deploy
 * 9b33ba0b): "i think friction is bigger when the surface area is bigger,
 * right?" resolved "surface area" to math.geom.surface-area. The Teaching
 * Engine opened no excursion (transition none), yet the visual layer drew the
 * maths geometry-shapes card beside the friction lesson
 * (FIGURE_CONCEPT_MISMATCH), and the tutor described "an arrow on the block"
 * that was not on screen.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'

const MSG = 'i think friction is bigger when the surface area is bigger, right?'

describe('a cross-subject mention without an excursion', () => {
  it('draws the lesson, not the mentioned maths concept', () => {
    const d = resolveVisual({ message: MSG, lessonConceptId: 'phys.mech.friction', excursionActive: false, subject: 'physics' })
    expect(d.conceptId).toBe('phys.mech.friction')
    expect(d.excursion).toBe(false)
    expect(String(d.provenance)).not.toContain('math.geom')
  })

  it('an excursion the Teaching Engine opened is still drawn', () => {
    const d = resolveVisual({ message: 'can you explain surface area?', lessonConceptId: 'phys.mech.friction', excursionActive: true, subject: 'physics' })
    expect(d.conceptId).toBe('math.geom.surface-area')
  })
})
