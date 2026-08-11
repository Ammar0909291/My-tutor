/**
 * THE DROPPED QUALIFIER — a learner's adjective is part of what they named.
 *
 * ── MEASURED IN PRODUCTION, 2026-08-11 ──────────────────────────────────────
 *   learner: "What is thermal conductivity?"
 *   resolved: phys.em.resistivity — "Resistivity and Conductivity"
 *
 * which is ELECTRICAL conductivity. The learner asked about heat and the
 * engine handed the tutor a concept about electric current. This is the worst
 * class of resolution failure the product has: not a missing figure, not a
 * missing excursion, but a confident answer to a different question.
 *
 * ── WHY ─────────────────────────────────────────────────────────────────────
 * `deriveTitleComponents` admits a one-word conjunct of a compound title when
 * that word occurs in exactly ONE title across all 1,775 concepts.
 * "Conductivity" clears that bar — because the corpus has no thermal
 * conductivity concept, not because the word is unambiguous in physics.
 * Corpus uniqueness is a claim about the KG's completeness, and it was being
 * read as a claim about the world.
 *
 * ── THE RULE, AND WHY IT IS NOT A SPECIAL CASE ──────────────────────────────
 * A one-word conjunct match is dropped when the word immediately in front of
 * it in the learner's message is a qualifier the corpus assigns, unambiguously,
 * to a DIFFERENT domain. Both halves are corpus-derived and measured, never
 * authored: no phrase list, no concept list, nothing mentioning heat.
 *
 * The "unambiguously" half is what keeps it honest. A word used by two or more
 * domains is ordinary vocabulary and is no evidence at all — which is why
 * "real eigenvalues", "electron microscopy", "absolute temperature" and
 * "multiple input" all still resolve. Measured across every "<word> <conjunct>"
 * phrase occurring in the corpus itself: 461 phrases, 49 affected, and most of
 * those are this same defect in another subject.
 *
 * ── WHAT IT DELIBERATELY DOES NOT DO ────────────────────────────────────────
 * It never applies above TITLE_COMPONENT. A full-title match is direct
 * evidence and is not second-guessed — the counter-cases at the bottom of this
 * file are the proof, and "orbital hybridisation" is the one that constrains
 * the design: chem.bond.hybridization's title and description contain no
 * "orbital", so any rule that demanded the qualifier appear in the matched
 * concept's own text would have broken it.
 *
 * It also never invents a destination. After this fix "thermal conductivity"
 * resolves to NOTHING, because the physics KG genuinely has no thermal
 * conductivity concept — phys.therm.heat-transfer is the nearest, and it is a
 * different thing. The turn then stays in the lesson and the tutor answers the
 * question on its merits, which is a degradation; being taught electrical
 * resistivity was a failure. Adding the missing concept is Curriculum Pipeline
 * work and is reported, not faked here.
 */
import { describe, it, expect } from 'vitest'
import { conceptIndex, resolveRequestedConceptId } from '@/lib/teaching/concept/requestedConcept'
import { resolveConceptMatches } from '@/lib/teaching/concept/conceptIndex'

const index = conceptIndex()
const top = (message: string, subject = 'physics') =>
  resolveConceptMatches(message, index, subject)[0] ?? null

describe('a qualifier the learner wrote is part of the topic they named', () => {
  it.each([
    'What is thermal conductivity?',
    'Explain thermal conductivity.',
    'thermal conductivity',
    'Why does thermal conductivity matter?',
  ])('never answers %s with an electrical concept', message => {
    const m = top(message)
    expect(m?.conceptId, `${message} -> ${m?.conceptId}`).not.toBe('phys.em.resistivity')
    // And it does not silently substitute some other electricity concept.
    expect(m?.conceptId?.startsWith('phys.em.') ?? false).toBe(false)
  })

  it('still resolves the unqualified word it legitimately owns', () => {
    expect(top('What is conductivity?')?.conceptId).toBe('phys.em.resistivity')
  })

  it('still resolves the qualifier that AGREES with the concept', () => {
    // "electrical" is used by phys.em's own titles, so it is not evidence of
    // a different topic. This is the case a blunter rule would have lost.
    expect(top('What is electrical conductivity?')?.conceptId).toBe('phys.em.resistivity')
  })

  it('closes the same defect in another subject, with no rule about that subject', () => {
    // "Vector Addition and Resolution" owns the conjunct "Resolution".
    // A computer-science learner typing "scope resolution" was being handed
    // a physics concept about adding vectors.
    const m = top('what is scope resolution', 'computer_science')
    expect(m?.conceptId).not.toBe('phys.meas.vector-addition')
  })
})

describe('ordinary vocabulary is not evidence — these must keep resolving', () => {
  // Every one of these is a "<qualifier> <one-word conjunct>" phrase, i.e. it
  // reaches the same code path. They survive because the qualifier is used by
  // more than one domain in the corpus.
  it.each([
    ['real eigenvalues', 'mathematics', 'math.linalg.eigenvalues'],
    ['electron microscopy', 'biology', 'bio.found.microscopy-basics'],
    ['absolute temperature', 'physics', 'phys.therm.temperature'],
  ])('%s still resolves', (message, subject, conceptId) => {
    const m = top(`what is ${message}`, subject)
    expect(m?.conceptId, `${message} -> ${m?.conceptId}`).toBe(conceptId)
  })

  it('an unqualified conjunct is untouched at every position', () => {
    expect(top('explain Viscosity diagram')?.conceptId).toBe('phys.mech.viscosity')
    expect(top('teach me capillarity')?.conceptId).toBe('phys.mech.surface-tension')
  })
})

describe('the tiers above TITLE_COMPONENT are never second-guessed', () => {
  it.each([
    // THE constraining case: chem.bond.hybridization's title is "Hybridization"
    // and its description says nothing about orbitals. A rule demanding the
    // qualifier appear in the concept's own text would have broken this.
    ['Explain orbital hybridisation.', 'chemistry', 'chem.bond.hybridization'],
    ['What is angular momentum?', 'physics', 'phys.mech.angular-momentum'],
    ['What is specific heat capacity?', 'physics', 'phys.therm.specific-heat'],
    ['Explain magnetic flux.', 'physics', 'phys.em.magnetic-flux'],
    ['what is potential energy', 'physics', 'phys.mech.potential-energy'],
  ])('%s resolves on its own full title', (message, subject, conceptId) => {
    expect(top(message, subject)?.conceptId).toBe(conceptId)
  })
})

describe('end to end through the request resolver', () => {
  const LESSON = 'phys.mech.free-body-diagram'

  it('a thermal question does not become an electrical excursion', () => {
    expect(resolveRequestedConceptId('What is thermal conductivity?', LESSON, 'physics'))
      .not.toBe('phys.em.resistivity')
  })

  it('the lesson concept itself is unaffected', () => {
    expect(resolveRequestedConceptId('What is a free body diagram?', LESSON, 'physics'))
      .toBe(LESSON)
  })
})
