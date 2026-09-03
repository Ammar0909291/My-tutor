/**
 * RESOLVER SAFETY - the two confirmed production false positives, and the
 * behaviour that must survive fixing them.
 *
 * These drive the REAL resolver against the REAL Knowledge Graph. That is
 * deliberate, and it is the reason both defects reached production: the
 * existing 35-case `conceptExcursion.test.ts` builds its own index, and
 * neither failing message appears anywhere in the suite, so nothing was
 * watching either path.
 *
 * -- DEFECT 1 - "ray" in a refraction lesson resolved to X-RAYS -------------
 * `subjectLocalReading`'s own title normaliser replaced every non-alphanumeric
 * with a SPACE and then stripped trailing plurals, so
 *
 *     "X-Rays and Their Properties"  ->  "x ray and their propertie"
 *
 * manufactured a standalone word "ray" that the title does not contain. The
 * selector then took the SHORTEST qualifying same-subject title, and the
 * manufactured match (25 chars) beat the genuine one, "Nature of Light: Ray
 * and Wave Models" (35 chars). Measured live: the learner asked to see light
 * bending, and the engine opened an X-ray excursion and drew an X-ray figure.
 *
 * Swapping in the SHARED tokenizer does NOT fix this - measured:
 * `normalizeToTokens('X-Rays and Their Properties')` is
 * `[x, ray, and, their, property]`, i.e. it manufactures the same token. The
 * fix is hyphen INTEGRITY, which neither normaliser had.
 *
 * -- DEFECT 2 - "KE" in a photoelectric lesson resolved to KINETIC ENERGY ---
 * `CONCEPT_ALIASES` carried the two-character alias 'ke'. "KE" is the
 * photoelectric effect's OWN governing formula (KE_max = hf - work function),
 * so the learner was asking about the lesson, and a 0.9-confidence ALIAS match
 * sent them somewhere else. The ACRONYM tier already refuses a surface form
 * this short - `deriveAcronym` requires >= 3 letters, after a recorded
 * incident where a two-letter acronym matched the ordinary words "DO NOT" -
 * and the hand-authored alias table simply bypassed that floor.
 *
 * Both are evidence-standard failures, which is why each fix is an evidence
 * rule rather than a rule about the words "ray" and "KE".
 */

import { describe, it, expect } from 'vitest'
import {
  resolveRequestedConceptId,
  conceptIndex,
  idPrefix,
} from '@/lib/teaching/concept/requestedConcept'
import {
  resolveConceptMatches,
  normalizeToTokens,
  CONCEPT_ALIASES,
} from '@/lib/teaching/concept/conceptIndex'

const REFRACTION = 'phys.opt.refraction'
const PHOTOELECTRIC = 'phys.mod.photoelectric-effect'

describe('R1 - ordinary lesson vocabulary must not open a wrong excursion', () => {
  // The exact production message, plus three further phrasings so the test
  // pins the CLASS and not one string.
  it.each([
    'can you draw diagram of ray bending please',
    'show me the ray diagram',
    'draw the ray for me',
    'can you show a ray picture please',
  ])('%s -> never phys.mod.x-rays', (message) => {
    expect(resolveRequestedConceptId(message, REFRACTION)).not.toBe('phys.mod.x-rays')
  })

  it('resolves to the legitimate physics ray concept, never a foreign geometry one', () => {
    const got = resolveRequestedConceptId(
      'can you draw diagram of ray bending please', REFRACTION,
    )
    // `phys.opt.nature-of-light` - "Nature of Light: Ray and Wave Models" - is
    // the only physics title that genuinely contains the standalone word, and
    // it is refraction's own declared KG prerequisite.
    expect(got).toBe('phys.opt.nature-of-light')
    expect(idPrefix(got!)).toBe('phys')
  })
})

describe('R2 - a two-character alias is not evidence of a topic switch', () => {
  it('"what is max KE of electron" does not travel to kinetic energy', () => {
    expect(resolveRequestedConceptId('what is max KE of electron', PHOTOELECTRIC)).toBeNull()
  })

  it('the alias tier no longer offers "ke" as a match at all', () => {
    const matches = resolveConceptMatches('what is max KE of electron', conceptIndex(), 'phys')
    expect(matches.map(m => m.conceptId)).not.toContain('phys.mech.kinetic-energy')
  })
})

describe('R3-R5 - legitimate excursions still work', () => {
  it('R3 - naming kinetic energy in full still resolves, and via EXACT_TITLE', () => {
    expect(resolveRequestedConceptId('Can you explain kinetic energy?', PHOTOELECTRIC))
      .toBe('phys.mech.kinetic-energy')
    // Pin the PATH, not only the answer: this case must never silently start
    // depending on an alias again.
    const matches = resolveConceptMatches('Can you explain kinetic energy?', conceptIndex(), 'phys')
    expect(matches.find(m => m.conceptId === 'phys.mech.kinetic-energy')?.method)
      .toBe('EXACT_TITLE')
  })

  it('R4 - an explicit X-ray request still reaches X-rays', () => {
    expect(resolveRequestedConceptId('can you explain X-rays', REFRACTION)).toBe('phys.mod.x-rays')
  })

  it('R5 - same-subject and cross-subject switches are unchanged', () => {
    expect(resolveRequestedConceptId('explain entropy', 'phys.mech.free-body-diagram'))
      .toBe('phys.therm.entropy')
    expect(resolveRequestedConceptId('explain photosynthesis', REFRACTION))
      .toBe('bio.plant.photosynthesis')
  })
})

describe('R6 - ANTI-REGRESSION: subject-local readings that must not move', () => {
  // Every row here is a case that a BROADER candidate design (replacing the
  // shortest-title selector with a naming/ambiguity rule) was measured to
  // break while fixing "ray". Without this block a future "improvement"
  // repeats that silently. Values are the measured pre-change behaviour.
  it.each([
    ['teach me vector', REFRACTION, 'phys.meas.scalars-vectors'],
    ['what is a vector', REFRACTION, 'phys.meas.scalars-vectors'],
    ['explain reflection', REFRACTION, 'phys.opt.reflection'],
    ['what is reflection', REFRACTION, 'phys.opt.reflection'],
    ['explain resonance', 'chem.bond.vsepr', 'chem.bond.resonance'],
    ['explain hydrogen', REFRACTION, 'phys.mod.bohr-model'],
    ['explain field', REFRACTION, 'phys.em.electric-field'],
  ])('%s (lesson %s) -> %s', (message, lesson, expected) => {
    expect(resolveRequestedConceptId(message, lesson)).toBe(expected)
  })
})

describe('R7 - chemistry vocabulary is unaffected', () => {
  it.each([
    ['what state is this in', 'chem.state.gas-laws'],
    ['what is a cell', 'chem.elect.galvanic-cell'],
    ['what is a bond', 'chem.bond.vsepr'],
    ['tell me about the shell', 'chem.atomic.quantum-numbers'],
  ])('%s stays on the lesson (null)', (message, lesson) => {
    expect(resolveRequestedConceptId(message, lesson)).toBeNull()
  })

  it('a genuinely named chemistry concept still resolves', () => {
    expect(resolveRequestedConceptId('what is bond enthalpy', 'chem.bond.vsepr'))
      .toBe('chem.thermo.bond-enthalpy')
  })

  it('CHEMISTRY REGRESSION - "ideal" no longer matches inside "Non-ideal Solutions"', () => {
    // chem.sol.activity is titled "Activity and Non-ideal Solutions". Splitting
    // the hyphen produced a standalone "ideal", i.e. a match on the NEGATION of
    // the word the learner used. The same defect as X-Rays, opposite polarity.
    expect(resolveRequestedConceptId('explain ideal', 'chem.bond.vsepr'))
      .not.toBe('chem.sol.activity')
  })
})

describe('R8 - the hyphen rule generalises past the four measured examples', () => {
  // 92 of the 1,775 KG titles carry an intra-word hyphen (NP-Completeness,
  // Cauchy-Riemann, Letter-Sound Correspondence, Subject-Verb Agreement, ...).
  // Each is a latent instance of defect 1. These are the members the resolver
  // can actually reach from a same-subject lesson, measured before the change.
  it('a hyphenated compound is not readable by its right-hand half alone', () => {
    expect(resolveRequestedConceptId('explain completeness', 'cs.algo.algorithms'))
      .not.toBe('cs.algo.np-completeness')
  })

  it('a hyphenated compound is not readable by its left-hand half alone', () => {
    // phys.qm.s-matrix-basics is titled with the compound "S-Matrix"; bare
    // "matrix" must not read it.
    expect(resolveRequestedConceptId('explain matrix', 'phys.qm.hydrogen-atom-qm'))
      .not.toBe('phys.qm.s-matrix-basics')
  })

  it('the shared tokenizer is NOT the fix, and is not being changed', () => {
    // Recorded so nobody re-proposes it: the shared tokenizer manufactures the
    // very same token, which is why the change is local to the subject-local
    // reading's own normaliser.
    expect(normalizeToTokens('X-Rays and Their Properties')).toContain('ray')
  })
})

describe('R9 - the alias floor is an invariant of the table, not a deletion', () => {
  it('no registered alias normalises to a single token shorter than 3 characters', () => {
    const violations: string[] = []
    for (const [conceptId, list] of Object.entries(CONCEPT_ALIASES)) {
      for (const alias of list) {
        const tokens = normalizeToTokens(alias)
        if (tokens.length === 1 && tokens[0].length < 3) violations.push(`${conceptId}: "${alias}"`)
      }
    }
    expect(violations, violations.join(', ')).toHaveLength(0)
  })

  it('the built index carries no sub-3-character single-token alias', () => {
    const bad = conceptIndex().flatMap(e =>
      (e.aliases ?? [])
        .filter(a => {
          const t = normalizeToTokens(a)
          return t.length === 1 && t[0].length < 3
        })
        .map(a => `${e.conceptId}:${a}`))
    expect(bad, bad.join(', ')).toHaveLength(0)
  })

  it('multi-token and >=3-character aliases are untouched', () => {
    const secondLaw = conceptIndex().find(e => e.conceptId === 'phys.mech.newtons-second-law')
    expect(secondLaw?.aliases).toContain('f=ma')
    expect(secondLaw?.aliases).toContain('second law of motion')
    const fractions = conceptIndex().find(e => e.conceptId === 'math.arith.fractions')
    expect(fractions?.aliases).toContain('fraction')
    const firstLaw = conceptIndex().find(e => e.conceptId === 'phys.mech.newtons-first-law')
    expect(firstLaw?.aliases).toContain('law of inertia')
  })
})
