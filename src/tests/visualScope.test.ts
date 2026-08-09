/**
 * M3-B stage B4 — honest domain illustrations.
 *
 * M2 stopped concept A being served concept B's asset. It did not stop an asset
 * that belongs to the right concept from being INTRODUCED as something it is
 * not. 372 of the 467 remaining figures are one card shared across a whole KG
 * domain — a bare coordinate plane for all 76 calculus concepts, one
 * triangle-and-circle card for all 67 geometry concepts — and the contract was
 * introducing each of them as "a figure of <concept>".
 *
 * Scope separates the two claims. The picture still renders; only the false
 * sentence is gone. These tests hold that line.
 */

import { describe, expect, it } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { buildVisualContractBlock } from '@/lib/teaching/visual/visualContract'
import { scopeForAsset, INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'
import { getKGNode } from '@/lib/curriculum/knowledgeGraph'

const ask = (conceptId: string) =>
  resolveVisual({ message: 'explain with diagram', lessonConceptId: conceptId, learnerRequest: 'diagram' })

const contract = (conceptId: string) => buildVisualContractBlock(ask(conceptId))

describe('scope is decided by provenance and audit, never by words', () => {
  it('a domain-prefix binding is always a domain illustration', () => {
    expect(scopeForAsset('domain-default', 'math.calc.limits')).toBe('domain')
    expect(scopeForAsset('domain-default', 'anything.at.all')).toBe('domain')
  })

  it('curated, generator and engine assets are concept-scoped by default', () => {
    expect(scopeForAsset('curated', 'phys.mech.newtons-first-law')).toBe('concept')
    expect(scopeForAsset('generator', 'phys.opt.mirrors')).toBe('concept')
    expect(scopeForAsset('engine', 'anything')).toBe('concept')
  })

  it('an audited-insufficient asset is demoted regardless of provenance', () => {
    expect(scopeForAsset('curated', 'phys.therm.carnot-cycle')).toBe('domain')
    expect(scopeForAsset('generator-default', 'phys.opt.refraction')).toBe('domain')
  })

  it('every audited-insufficient id is a real KG concept', () => {
    for (const id of INSUFFICIENT_FOR_CONCEPT) {
      expect(getKGNode(id), `${id} is not in any canonical KG`).toBeTruthy()
    }
  })

  it('the B2 splits were not demoted — they were fixed, not flagged', () => {
    expect(INSUFFICIENT_FOR_CONCEPT.has('phys.em.kirchhoffs-laws')).toBe(false)
    expect(ask('phys.em.kirchhoffs-laws').asset?.scope).toBe('concept')
    expect(ask('phys.mech.satellites').asset?.scope).toBe('concept')
  })
})

describe('a domain illustration still renders', () => {
  const DOMAIN_CASES = [
    'math.calc.limits',
    'math.geom.circle-theorems',
    'math.arith.long-division',
    'math.alg.quadratic-equations',
    'math.stat.mean-median-mode',
    'chem.atomic.isotopes',
    'cs.algo.dynamic-programming',
    'bio.eco.nutrient-cycling',
  ]

  it.each(DOMAIN_CASES)('%s keeps its picture', (conceptId) => {
    const d = ask(conceptId)
    if (!getKGNode(conceptId)) return          // tolerate KG drift in the sample
    expect(d.graphical).toBe(true)
    expect(d.payload).not.toBeNull()
    expect(d.asset?.scope).toBe('domain')
  })
})

describe('a domain illustration cannot claim to be the concept', () => {
  it('the contract says GENERAL ILLUSTRATION and explicitly denies the claim', () => {
    const block = contract('math.calc.limits')
    expect(block).toContain('GENERAL ILLUSTRATION')
    expect(block).toContain('NOT a figure of')
    expect(block).toContain('Do NOT say "this diagram shows')
  })

  it('it never asserts the figure IS a figure of the concept', () => {
    for (const id of ['math.calc.limits', 'math.geom.circle-theorems', 'math.arith.long-division']) {
      const title = getKGNode(id)?.title
      if (!title) continue
      const block = contract(id)
      expect(block, id).not.toContain(`A labelled_figure of "${title}"`)
      expect(block, id).not.toContain(`of "${title}" is attached to THIS response`)
    }
  })

  it('it does not tell the model the figure leads the explanation', () => {
    const block = contract('math.calc.limits')
    expect(block).toContain('Your WORDS carry this explanation')
    expect(block).not.toContain('the figure leads, the words support it')
  })

  it('a concept-scoped figure keeps the full teaching contract', () => {
    const block = contract('phys.mech.newtons-first-law')
    expect(block).toContain('is attached to THIS response')
    expect(block).toContain('the figure leads, the words support it')
    expect(block).not.toContain('GENERAL ILLUSTRATION')
  })

  it('an audited-insufficient curated card is demoted in the contract too', () => {
    // The Carnot cycle was rendering an EMPTY coordinate plane while the
    // contract introduced it as "a figure of the Carnot Cycle".
    const block = contract('phys.therm.carnot-cycle')
    expect(block).toContain('GENERAL ILLUSTRATION')
    expect(block).not.toContain('the figure leads, the words support it')
  })
})

describe('the three acceptable states, and nothing else', () => {
  it('every graphical concept is either concept-scoped or domain-scoped', () => {
    for (const id of [
      'phys.mech.newtons-first-law', 'math.calc.limits', 'phys.opt.mirrors',
      'phys.therm.carnot-cycle', 'bio.cell.mitosis', 'math.arith.fractions',
    ]) {
      const d = ask(id)
      if (!d.graphical) continue
      expect(['concept', 'domain'], id).toContain(d.asset!.scope)
      // And the asset always belongs to the concept that asked for it.
      expect(d.asset!.conceptId, id).toBe(id)
    }
  })

  it('the historical failures now receive their OWN concept figure', () => {
    // These seven had no asset through M1-M3; the M4 pilot authored one for each.
    // What must never change is that whatever they receive belongs to them and
    // is not a general illustration standing in for a concept figure.
    for (const id of [
      'phys.opt.total-internal-reflection', 'phys.therm.calorimetry',
      'phys.wave.interference', 'phys.mech.viscosity', 'phys.therm.first-law',
      'phys.wave.transverse-waves', 'phys.mech.surface-tension',
    ]) {
      const d = ask(id)
      expect(d.graphical, id).toBe(true)
      expect(d.asset!.conceptId, id).toBe(id)
      expect(d.asset!.scope, id).toBe('concept')
      expect(buildVisualContractBlock(d), id).not.toContain('NO FIGURE IS ATTACHED')
    }
  })

  it('a concept that genuinely has no asset still receives no figure', () => {
    const d = ask('phys.mech.kinetic-energy')
    expect(d.graphical).toBe(false)
    expect(d.asset).toBeNull()
    expect(buildVisualContractBlock(d)).toContain('NO FIGURE IS ATTACHED')
  })

  it('a retired binding is still not a domain illustration in disguise', () => {
    // B1 retirement outranks scope: the asset depicted a different situation,
    // so it must not come back as "a general illustration" either.
    for (const id of ['bio.cell.apoptosis', 'cs.found.number-systems', 'phys.opt.reflection']) {
      expect(ask(id).graphical, id).toBe(false)
    }
  })
})

describe('the critical invariant', () => {
  it('concept A never gets a figure introduced as A that depicts something else', () => {
    // Sweep: for every sampled concept, whichever of the three states applies,
    // the contract's claim must match the asset's scope.
    const sample = [
      'phys.mech.newtons-first-law', 'phys.opt.mirrors', 'phys.em.ohms-law',
      'math.calc.limits', 'math.geom.circle-theorems', 'math.arith.long-division',
      'phys.therm.carnot-cycle', 'phys.opt.refraction', 'bio.cell.mitosis',
      'phys.mech.kinetic-energy', 'bio.cell.apoptosis',
    ]
    for (const id of sample) {
      const d = ask(id)
      const block = buildVisualContractBlock(d)
      if (!d.graphical) {
        expect(block, id).toContain('NO FIGURE IS ATTACHED')
      } else if (d.asset!.scope === 'domain') {
        expect(block, id).toContain('GENERAL ILLUSTRATION')
        expect(block, id).toContain('NOT a figure of')
      } else {
        expect(block, id).toContain('is attached to THIS response')
        expect(d.asset!.conceptId, id).toBe(id)
      }
    }
  })
})
