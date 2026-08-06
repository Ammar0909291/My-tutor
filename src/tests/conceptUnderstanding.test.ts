/**
 * Concept Understanding Engine tests.
 *
 * The load-bearing case remains the investigation's: while Calorimetry is the
 * active lesson, "Explain Newton's Second Law" must resolve to Newton's Second
 * Law and report offTopic — not inherit the lesson concept.
 */
import { describe, it, expect } from 'vitest'
import {
  understandConcepts,
} from '@/lib/teaching/concept/conceptUnderstandingEngine'
import {
  buildConceptIndex, resolveConceptMatches, normalizeToTokens, singularize, deriveAcronym,
} from '@/lib/teaching/concept/conceptIndex'
import { buildConceptIndexFromKnowledgeGraph } from '@/lib/teaching/concept/conceptIndexSource'
import {
  ExtractionMethod, type ConceptIndexEntry, type ConceptUnderstandingInputs,
} from '@/lib/teaching/concept/conceptUnderstanding'

const CALORIMETRY = 'phys.therm.calorimetry'
const NEWTON_2 = 'phys.mech.newtons-second-law'
const MOMENTUM = 'phys.mech.momentum'
const KINETIC = 'phys.mech.kinetic-energy'

const INDEX: readonly ConceptIndexEntry[] = buildConceptIndex([
  { conceptId: CALORIMETRY, title: 'Calorimetry', subject: 'physics' },
  { conceptId: NEWTON_2, title: "Newton's Second Law", subject: 'physics' },
  { conceptId: MOMENTUM, title: 'Linear Momentum', subject: 'physics' },
  { conceptId: KINETIC, title: 'Kinetic Energy', subject: 'physics' },
  { conceptId: 'math.geom.triangle', title: 'Triangle', subject: 'mathematics' },
])

const inLesson = (message: string, over: Partial<ConceptUnderstandingInputs> = {}): ConceptUnderstandingInputs => ({
  message,
  activeLessonConceptId: CALORIMETRY,
  index: INDEX,
  ...over,
})

describe('Concept Understanding · normalization primitives', () => {
  it('singularizes conservatively', () => {
    expect(singularize('vectors')).toBe('vector')
    expect(singularize('properties')).toBe('property')
    expect(singularize('mass')).toBe('mass')
    expect(singularize('radius')).toBe('radius')
    expect(singularize('gas')).toBe('gas')
  })

  it('strips possessives, punctuation and case', () => {
    expect(normalizeToTokens("Newton's Second Law!")).toEqual(['newton', 'second', 'law'])
    expect(normalizeToTokens('kinetic-energy')).toEqual(['kinetic', 'energy'])
  })

  it('derives acronyms only from multi-word titles', () => {
    expect(deriveAcronym('Simple Harmonic Motion')).toBe('SHM')
    expect(deriveAcronym('Triangle')).toBeNull()
  })
})

describe('Concept Understanding · exact concept', () => {
  it('resolves an exact KG title', () => {
    const r = understandConcepts(inLesson("Explain Newton's Second Law"))
    expect(r.primaryConceptId).toBe(NEWTON_2)
    expect(r.extractionMethod).toBe(ExtractionMethod.EXACT_TITLE)
    expect(r.confidence).toBe(0.95)
  })

  it('resolves a literal concept id at full confidence', () => {
    const r = understandConcepts(inLesson(`teach me ${NEWTON_2}`))
    expect(r.primaryConceptId).toBe(NEWTON_2)
    expect(r.extractionMethod).toBe(ExtractionMethod.CONCEPT_ID)
    expect(r.confidence).toBe(1.0)
  })
})

describe('Concept Understanding · alias', () => {
  it('resolves a registered alias', () => {
    const r = understandConcepts(inLesson('what is F=ma'))
    expect(r.primaryConceptId).toBe(NEWTON_2)
    expect(r.extractionMethod).toBe(ExtractionMethod.ALIAS)
  })

  it('resolves an alias phrased differently from the title', () => {
    const r = understandConcepts(inLesson('explain the second law of motion'))
    expect(r.primaryConceptId).toBe(NEWTON_2)
  })
})

describe('Concept Understanding · normalized spelling', () => {
  it('matches without the possessive apostrophe and with odd casing', () => {
    const r = understandConcepts(inLesson('explain NEWTONS second law'))
    expect(r.primaryConceptId).toBe(NEWTON_2)
    expect(r.extractionMethod).toBe(ExtractionMethod.NORMALIZED_TITLE)
  })

  it('matches a curly apostrophe', () => {
    const r = understandConcepts(inLesson('explain Newton’s Second Law'))
    expect(r.primaryConceptId).toBe(NEWTON_2)
  })

  it('matches plural/singular differences', () => {
    const r = understandConcepts(inLesson('tell me about triangles'))
    expect(r.primaryConceptId).toBe('math.geom.triangle')
  })
})

describe('Concept Understanding · comparison', () => {
  it('returns a comparison pair with primary and secondary', () => {
    const r = understandConcepts(inLesson('difference between Linear Momentum and Kinetic Energy'))
    expect(r.comparisonConceptIds).toHaveLength(2)
    expect(r.comparisonConceptIds).toContain(MOMENTUM)
    expect(r.comparisonConceptIds).toContain(KINETIC)
    expect(r.primaryConceptId).toBe(r.comparisonConceptIds[0])
    expect(r.secondaryConceptIds).toContain(r.comparisonConceptIds[1])
  })

  it('does not report a comparison when only one concept is named', () => {
    const r = understandConcepts(inLesson('compare Linear Momentum to something'))
    expect(r.comparisonConceptIds).toEqual([])
  })

  it('does not report a comparison without comparison framing', () => {
    const r = understandConcepts(inLesson('explain Linear Momentum and Kinetic Energy'))
    expect(r.comparisonConceptIds).toEqual([])
    // Both are still recognised as mentioned: one is primary (deterministic
    // tie-break picks the lower conceptId), the other lands in secondary.
    expect([r.primaryConceptId, ...r.secondaryConceptIds].sort()).toEqual([KINETIC, MOMENTUM].sort())
  })
})

describe('Concept Understanding · ambiguity', () => {
  const AMBIGUOUS: readonly ConceptIndexEntry[] = buildConceptIndex([
    { conceptId: 'phys.mech.force', title: 'Force', subject: 'physics' },
    { conceptId: 'phys.em.force', title: 'Force', subject: 'physics' },
    { conceptId: CALORIMETRY, title: 'Calorimetry', subject: 'physics' },
  ])

  it('surfaces every competing candidate instead of guessing silently', () => {
    const r = understandConcepts({ message: 'explain Force', activeLessonConceptId: CALORIMETRY, index: AMBIGUOUS })
    expect(r.ambiguityDetected).toBe(true)
    expect(r.ambiguityCandidates.map(c => c.conceptId).sort()).toEqual(['phys.em.force', 'phys.mech.force'])
  })

  it('reduces confidence when ambiguous rather than reporting false certainty', () => {
    const ambiguous = understandConcepts({ message: 'explain Force', activeLessonConceptId: CALORIMETRY, index: AMBIGUOUS })
    const unambiguous = understandConcepts(inLesson("explain Newton's Second Law"))
    expect(ambiguous.confidence).toBeLessThan(unambiguous.confidence)
  })

  it('still names a primary, and excludes the competing readings from secondary', () => {
    const r = understandConcepts({ message: 'explain Force', activeLessonConceptId: CALORIMETRY, index: AMBIGUOUS })
    expect(r.primaryConceptId).toBe('phys.em.force') // deterministic tie-break: conceptId asc
    expect(r.secondaryConceptIds).not.toContain('phys.mech.force')
  })

  it('reports no ambiguity for an unambiguous match', () => {
    const r = understandConcepts(inLesson("explain Newton's Second Law"))
    expect(r.ambiguityDetected).toBe(false)
    expect(r.ambiguityCandidates).toEqual([])
  })
})

describe('Concept Understanding · off-topic vs lesson concept', () => {
  it('flags an off-topic concept during an active lesson', () => {
    const r = understandConcepts(inLesson("Explain Newton's Second Law with visualization."))
    expect(r.primaryConceptId).toBe(NEWTON_2)
    expect(r.offTopic).toBe(true)
    expect(r.currentLessonReferenced).toBe(false)
  })

  it('does not flag off-topic when the lesson concept itself is named', () => {
    const r = understandConcepts(inLesson('explain Calorimetry again'))
    expect(r.primaryConceptId).toBe(CALORIMETRY)
    expect(r.offTopic).toBe(false)
    expect(r.currentLessonReferenced).toBe(true)
  })

  it('cannot be off-topic when no lesson is active', () => {
    const r = understandConcepts({ message: "explain Newton's Second Law", activeLessonConceptId: null, index: INDEX })
    expect(r.offTopic).toBe(false)
  })

  it('falls back to the lesson concept explicitly and at low confidence', () => {
    const r = understandConcepts(inLesson('ok go on then'))
    expect(r.primaryConceptId).toBe(CALORIMETRY)
    expect(r.extractionMethod).toBe(ExtractionMethod.LESSON_CONTEXT)
    expect(r.confidence).toBe(0.5)
  })
})

describe('Concept Understanding · follow-up reference', () => {
  it('resolves a back-reference from supplied context only', () => {
    const r = understandConcepts(inLesson('explain it again', { context: { previousConceptId: NEWTON_2 } }))
    expect(r.primaryConceptId).toBe(NEWTON_2)
    expect(r.extractionMethod).toBe(ExtractionMethod.CONVERSATION_REFERENCE)
    expect(r.offTopic).toBe(true)
  })

  it('falls back to the lesson when no context is supplied', () => {
    const r = understandConcepts(inLesson('explain it again'))
    expect(r.primaryConceptId).toBe(CALORIMETRY)
    expect(r.extractionMethod).toBe(ExtractionMethod.LESSON_CONTEXT)
  })

  it('a named concept always outranks a back-reference', () => {
    const r = understandConcepts(inLesson("explain Linear Momentum again", { context: { previousConceptId: NEWTON_2 } }))
    expect(r.primaryConceptId).toBe(MOMENTUM)
  })

  it('is unresolved with no concept, no context and no lesson', () => {
    const r = understandConcepts({ message: 'hmm ok', activeLessonConceptId: null, index: INDEX })
    expect(r.primaryConceptId).toBeNull()
    expect(r.extractionMethod).toBe(ExtractionMethod.UNRESOLVED)
    expect(r.confidence).toBe(0)
  })
})

describe('Concept Understanding · determinism and confidence ordering', () => {
  it('identical inputs produce a deeply-equal result', () => {
    const inputs = inLesson("Explain Newton's Second Law with visualization.")
    expect(understandConcepts(inputs)).toEqual(understandConcepts(inputs))
  })

  it('ranks matches by confidence descending', () => {
    const r = understandConcepts(inLesson('Linear Momentum and Kinetic Energy'))
    const confidences = r.matches.map(m => m.confidence)
    expect([...confidences].sort((a, b) => b - a)).toEqual(confidences)
  })

  it('orders extraction methods CONCEPT_ID > EXACT_TITLE > ALIAS > NORMALIZED_TITLE > ACRONYM', () => {
    const byId = understandConcepts(inLesson(`explain ${NEWTON_2}`)).confidence
    const byTitle = understandConcepts(inLesson("explain Newton's Second Law")).confidence
    const byAlias = understandConcepts(inLesson('explain F=ma')).confidence
    const byNormalized = understandConcepts(inLesson('explain NEWTONS second law')).confidence
    expect(byId).toBeGreaterThan(byTitle)
    expect(byTitle).toBeGreaterThan(byAlias)
    expect(byAlias).toBeGreaterThan(byNormalized)
  })

  it('does not mutate its inputs', () => {
    const inputs = inLesson("explain Newton's Second Law")
    const before = JSON.stringify(inputs)
    understandConcepts(inputs)
    expect(JSON.stringify(inputs)).toBe(before)
  })

  it('always records reasoning', () => {
    expect(understandConcepts(inLesson("explain Newton's Second Law")).reasoning.length).toBeGreaterThan(0)
    expect(understandConcepts(inLesson('ok')).reasoning.length).toBeGreaterThan(0)
  })

  it('resolveConceptMatches returns [] for an empty message', () => {
    expect(resolveConceptMatches('   ', INDEX)).toEqual([])
  })
})

describe('Concept Understanding · real Knowledge Graph index', () => {
  it('builds deterministically from the live KG and resolves a real concept', () => {
    const index = buildConceptIndexFromKnowledgeGraph(['physics'])
    expect(index.length).toBeGreaterThan(200)
    expect(buildConceptIndexFromKnowledgeGraph(['physics'])).toEqual(index)

    const r = understandConcepts({ message: 'explain Calorimetry', activeLessonConceptId: null, index })
    expect(r.primaryConceptId).toBe(CALORIMETRY)
  })

  it('uses only canonical KG concept ids — never invents one', () => {
    const index = buildConceptIndexFromKnowledgeGraph(['physics'])
    expect(index.every(e => e.conceptId.startsWith('phys.'))).toBe(true)
  })
})
