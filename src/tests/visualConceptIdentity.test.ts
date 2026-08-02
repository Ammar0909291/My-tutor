/**
 * PRODUCTION INCIDENT — the visualization did not match the concept taught.
 *
 * Observed in production (chemistry):
 *   Mole Concept      -> generic 3D atom model
 *   Mixtures          -> generic 3D atom model
 *   Pure substances   -> generic 3D atom model
 *   Dissolving        -> generic 3D atom model
 *
 * ROOT CAUSE — the Tier-2 domain fallback in lookupConceptVisual().
 * A domain rule asserts "every concept under this prefix is well represented
 * by this visual". DOMAIN_VISUALS carried domainRule('chem.found',
 * 'three_atomic_structure'). chem.found is the FOUNDATIONS domain and is
 * deliberately heterogeneous: 8 concepts, exactly one of which is about atoms.
 * Only chem.found.states-of-matter had an exact entry, so the other seven fell
 * through to Tier 2 and were all rendered with the atom model.
 *
 * These tests are driven by the REAL canonical Knowledge Graph, not a
 * hand-written concept list, so a future KG concept added under a
 * heterogeneous domain is covered automatically.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { lookupConceptVisual, getConceptVisualType } from '@/lib/teaching/visualRegistry'
import { detectVisual } from '@/lib/school/visuals/detectVisual'

interface KgConcept { id: string; name: string }
function kg(subject: string): KgConcept[] {
  const path = `docs/${subject}/kg/graph.json`
  return JSON.parse(readFileSync(path, 'utf8')).concepts as KgConcept[]
}

const CHEM = kg('chemistry')
const chemFound = CHEM.filter((c) => c.id.startsWith('chem.found'))

/** Visuals that depict atomic/subatomic structure. */
const ATOMIC_VISUALS = new Set(['three_atomic_structure', 'three_electron_shells'])

/** A concept is legitimately atomic only if its NAME says so. */
function isAtomicConcept(name: string): boolean {
  return /\batom|subatomic|electron|nucleus|orbital|periodic\b/i.test(name)
}

describe('the production incident concepts', () => {
  const REPORTED = [
    'chem.found.mole-concept',      // "Mole Concept and Avogadro's Number"
    'chem.found.pure-substances',   // "Pure Substances and Mixtures" (mixtures, dissolving)
    'chem.found.stoichiometry',
    'chem.found.significant-figures',
  ]

  it.each(REPORTED)('%s is never given an atomic-structure visual', (conceptId) => {
    const v = getConceptVisualType(conceptId)
    if (v !== null) expect(ATOMIC_VISUALS.has(v)).toBe(false)
  })

  it('none of them falls back to an atom model through detectVisual either', () => {
    // Removing the domain rule sends these to detectVisual's title keyword
    // match. That must not reintroduce the same wrong visual.
    for (const id of REPORTED) {
      const concept = CHEM.find((c) => c.id === id)!
      const v = getConceptVisualType(id)
        ?? detectVisual({ subjectSlug: 'chemistry', chapterTitle: '', lessonTitle: concept.name })
      if (v !== null) expect(ATOMIC_VISUALS.has(v), `${id} -> ${v}`).toBe(false)
    }
  })
})

describe('visualization follows concept identity', () => {
  it('no chem.found concept gets an atomic visual unless it is about atoms', () => {
    expect(chemFound.length).toBeGreaterThan(0)
    for (const c of chemFound) {
      const v = getConceptVisualType(c.id)
      if (v && ATOMIC_VISUALS.has(v)) {
        expect(isAtomicConcept(c.name), `${c.id} ("${c.name}") -> ${v}`).toBe(true)
      }
    }
  })

  it('a domain default never contradicts a concept that has its own entry', () => {
    // states-of-matter has an exact crystal-lattice entry; a domain rule must
    // never be what answers for it.
    expect(getConceptVisualType('chem.found.states-of-matter')).toBe('three_crystal_lattice')
  })

  it('the domains that ARE visually uniform keep their defaults', () => {
    // The fix removes one unsound assertion; it must not disarm the sound ones.
    expect(getConceptVisualType('chem.atomic.atomic-theory')).toBe('three_atomic_structure')
    expect(getConceptVisualType('chem.period.periodic-properties')).toBe('three_electron_shells')
    expect(getConceptVisualType('chem.solid.crystal-systems')).toBe('three_crystal_lattice')
    expect(getConceptVisualType('chem.bond.ionic-bonding')).toBe('three_bond_formation')
  })

  it('an unmapped concept returns null rather than an unrelated visual', () => {
    // "no visual" is a correct answer; a wrong visual never is.
    expect(lookupConceptVisual('chem.thermo.enthalpy')).toBeNull()
    expect(lookupConceptVisual('chem.found.mole-concept')).toBeNull()
  })
})

describe('visualization changes when the lesson changes', () => {
  it('two different concepts never silently share one domain-default visual', () => {
    // The defect signature: distinct lessons rendering the identical visual
    // because a single domain rule answered for all of them.
    const answers = chemFound.map((c) => getConceptVisualType(c.id))
    const nonNull = answers.filter((v): v is string => v !== null)
    // Every chem.found concept that still resolves does so from its OWN entry,
    // so there can be no repeated domain-default answer across the domain.
    expect(new Set(nonNull).size).toBe(nonNull.length)
  })

  it('moving from States of Matter to Mole Concept changes the visual', () => {
    const a = getConceptVisualType('chem.found.states-of-matter')
    const b = getConceptVisualType('chem.found.mole-concept')
    expect(a).not.toBe(b)
  })
})

describe('the same concept always resolves to the same visual', () => {
  it('lookup is pure and stable across repeated calls', () => {
    for (const c of chemFound) {
      const first = getConceptVisualType(c.id)
      for (let i = 0; i < 3; i++) expect(getConceptVisualType(c.id)).toBe(first)
    }
  })

  it('a null concept id never resolves to a visual', () => {
    expect(lookupConceptVisual(null)).toBeNull()
    expect(getConceptVisualType(null)).toBeNull()
  })
})
