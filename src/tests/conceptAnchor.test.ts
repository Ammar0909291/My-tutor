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

// ENG-D08 / ENG-D22 — the bare example request must be grounded to the anchored
// concept. Both episodes were triggered by a request that named no topic at all
// ("give me an example" / "show me an example please") and were answered with an
// example from another subject (Python) and an adjacent sub-domain (poetry meter
// inside a drama lesson). Every real detector returns null on those messages, so
// the lever is this block. These cases pin the rule's presence and, just as
// importantly, that it did not reintroduce the steer-back regression this block's
// own history records.
describe('ENG-D08/D22 — example requests are grounded to the anchored concept', () => {
  const anchor = buildConceptAnchor(
    'eng.vocab.word-formation-processes',
    'Word Formation Processes',
    'Recognise derivation, compounding, conversion, blending and clipping',
    'Vocabulary',
  )!
  const block = buildConceptAnchorBlock(anchor)

  it('states that an example must be an example OF the anchored concept', () => {
    expect(block).toContain('must be an example OF "Word Formation Processes"')
  })

  it('names the bare request shapes that triggered both measured episodes', () => {
    expect(block).toContain('give me an example')
    expect(block).toContain('show me an example')
  })

  it('forbids the two measured pivots: another subject, another sense of a word', () => {
    expect(block).toMatch(/never read it as a cue to switch subject/i)
    expect(block).toMatch(/different sense of a word that happens to appear in your own explanation/i)
  })

  it('does NOT reintroduce the steer-back rule this block deliberately removed', () => {
    // The removed rule answered an off-topic question in 1-2 sentences and
    // announced a return. Measured cost: 33% of turns steered away from what
    // the learner had just asked. The new rule must not resurrect any of it.
    expect(block).not.toMatch(/1[–-]2 sentences/i)
    expect(block).not.toMatch(/belongs to a different topic/i)
    // The removed rule's actual signature is the MID-QUESTION steer-back
    // ("Good question — now, back to <lesson>"). A bare /back to/ would also
    // match the surviving, correct clause "Come back to this concept once they
    // say they are satisfied", which is a return AFTER satisfaction and is the
    // behaviour the rewrite deliberately kept.
    expect(block).not.toMatch(/now,?\s*back to/i)
    expect(block).toContain('do not announce a return to this lesson while their question is still open')
    // The detour rule it must not contradict is still stated in full.
    expect(block).toContain('ANSWER THAT QUESTION properly and teach it at full standard')
  })

  it('carries the concept title, so the rule is never generic', () => {
    const other = buildConceptAnchorBlock(
      buildConceptAnchor('eng.literature.dramatic-structure', 'Dramatic Structure', 'Acts and scenes', 'Literature')!,
    )
    expect(other).toContain('must be an example OF "Dramatic Structure"')
    expect(other).not.toContain('Word Formation Processes')
  })
})
