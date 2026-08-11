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

    // CORRECTED 2026-08-11 from production evidence. These two cases asserted
    // the drift-return instruction — "answer in 1–2 sentences, then steer back
    // to <title>" and "Every question, example, and assessment this turn must
    // serve this concept's goal".
    //
    // Measured across 20 topics / 60 real turns, that instruction steered the
    // learner away from their own question on 33% of turns: "What is entropy?"
    // received one sentence and a redirect, "This makes no sense" was answered
    // about free-body diagrams, and a learner who stated ΔG = ΔH − TΔS
    // correctly was redirected three times instead of advanced.
    //
    // It was also a SECOND authority: `excursion.ts` owns the detour
    // lifecycle, and this block is built ~1400 lines earlier in the route,
    // before that decision exists. The anchor now states the lesson and leaves
    // the detour question to the engine that can actually answer it.
    it('does NOT order a return to the lesson — excursion.ts owns that', () => {
      const block = buildConceptAnchorBlock({
        conceptId: 'eng.phonics.letter-sound',
        title: 'Letter-Sound Correspondence',
        goal: 'Learn letter sounds',
        domain: 'Phonics',
      })
      expect(block).not.toContain('back to Letter-Sound Correspondence')
      expect(block).not.toContain('1–2 sentences')
    })

    it('protects the learner question instead of subordinating it', () => {
      const block = buildConceptAnchorBlock({
        conceptId: 'chem.atomic.structure',
        title: 'Atomic Structure',
        goal: 'Understand atomic structure',
        domain: 'Atomic Chemistry',
      })
      // Still names the lesson — that is the anchor's real job.
      expect(block).toContain('Atomic Structure')
      expect(block).toContain('Understand atomic structure')
      // …and says what to do when the learner asks about something else.
      expect(block).toMatch(/ANSWER THAT QUESTION properly/)
      expect(block).toMatch(/do not refuse it/)
    })
  })
})
