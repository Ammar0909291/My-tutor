import { describe, it, expect } from 'vitest'
import { buildConceptAnchor, buildConceptAnchorBlock } from '@/lib/teaching/conceptAnchor'

describe('conceptAnchor', () => {
  describe('buildConceptAnchor', () => {
    it('returns null when conceptId is missing', () => {
      expect(buildConceptAnchor(null, 'Title', 'Goal', 'Unit')).toBeNull()
      expect(buildConceptAnchor(undefined, 'Title', 'Goal', 'Unit')).toBeNull()
    })

    it('returns null when lessonTitle is missing', () => {
      expect(buildConceptAnchor('phys.mech.forces', null, 'Goal', 'Unit')).toBeNull()
      expect(buildConceptAnchor('phys.mech.forces', undefined, 'Goal', 'Unit')).toBeNull()
    })

    it('builds anchor with all fields', () => {
      const anchor = buildConceptAnchor('phys.mech.forces', 'Forces', 'Understand forces', 'Mechanics')
      expect(anchor).toEqual({
        conceptId: 'phys.mech.forces',
        title: 'Forces',
        goal: 'Understand forces',
        domain: 'Mechanics',
      })
    })

    it('uses title as goal fallback', () => {
      const anchor = buildConceptAnchor('math.arith.addition', 'Addition', null, null)
      expect(anchor).toEqual({
        conceptId: 'math.arith.addition',
        title: 'Addition',
        goal: 'Addition',
        domain: null,
      })
    })
  })

  describe('buildConceptAnchorBlock', () => {
    it('includes concept title and goal', () => {
      const block = buildConceptAnchorBlock({
        conceptId: 'phys.mech.forces',
        title: 'Forces',
        goal: 'Understand forces',
        domain: 'Mechanics',
      })
      expect(block).toContain('CONCEPT ANCHOR')
      expect(block).toContain('"Forces"')
      expect(block).toContain('Understand forces')
      expect(block).toContain('(Mechanics)')
    })

    it('omits domain parenthetical when null', () => {
      const block = buildConceptAnchorBlock({
        conceptId: 'math.arith.addition',
        title: 'Addition',
        goal: 'Learn addition',
        domain: null,
      })
      expect(block).toContain('"Addition"')
      expect(block).not.toContain('(null)')
      expect(block).not.toContain('()')
    })

    it('includes drift-return instruction with concept title', () => {
      const block = buildConceptAnchorBlock({
        conceptId: 'eng.phonics.letter-sound',
        title: 'Letter-Sound Correspondence',
        goal: 'Learn letter sounds',
        domain: 'Phonics',
      })
      expect(block).toContain('back to Letter-Sound Correspondence')
      expect(block).toContain('1–2 sentences')
    })

    it('states all assessments must serve the concept goal', () => {
      const block = buildConceptAnchorBlock({
        conceptId: 'chem.atomic.structure',
        title: 'Atomic Structure',
        goal: 'Understand atomic structure',
        domain: 'Atomic Chemistry',
      })
      expect(block).toContain('Every question, example, and assessment')
      expect(block).toContain("this concept's goal")
    })
  })
})
