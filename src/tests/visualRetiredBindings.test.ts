/**
 * M3-B stage B1 — semantically unsafe visuals are retired.
 *
 * The M3-A audit found 29 bindings whose asset depicts a different situation
 * from the concept it was attached to: a food chain for apoptosis, a bulb
 * circuit for a transformer, a crystal lattice for amorphous solids, a circular
 * orbit for Kepler's laws. M1 already established that a wrong figure is worse
 * than none; these tests hold that line for the specific bindings.
 *
 * They deliberately assert NO FIGURE rather than a replacement. Authoring
 * faithful figures for these concepts is later work; showing nothing is the
 * correct state until then.
 */

import { describe, expect, it } from 'vitest'
import { RETIRED_VISUAL_BINDINGS, isRetiredVisualBinding, retirementReason } from '@/lib/teaching/visual/retired'
import { resolveVisual, resolveVisualForTurn } from '@/lib/teaching/visual/resolveVisual'
import { buildVisualContractBlock } from '@/lib/teaching/visual/visualContract'
import { getKGNode } from '@/lib/curriculum/knowledgeGraph'

const RETIRED = Object.keys(RETIRED_VISUAL_BINDINGS)

const ask = (conceptId: string, message = 'explain with diagram') =>
  resolveVisual({ message, lessonConceptId: conceptId, learnerRequest: 'diagram' })

describe('the register itself', () => {
  it('covers exactly the 47 audited concepts', () => {
    // 29 from the M3-A audit (which read concepts holding an EXACT curated
    // row) + 18 from the visual semantic moat sweep, which ran the resolver
    // over all 238 physics and 186 chemistry concepts and read the 51 whose
    // figure identity was WIDENED from a generator kind or a domain prefix
    // rather than declared. See visualSemanticMoatPhysicsChemistry.test.ts
    // for the per-concept evidence.
    expect(RETIRED).toHaveLength(47)
  })

  it('every retired id is a real KG concept — a typo would silently retire nothing', () => {
    for (const id of RETIRED) {
      expect(getKGNode(id), `${id} is not in any canonical KG`).toBeTruthy()
    }
  })

  it('every entry carries its audit evidence, not just a label', () => {
    for (const id of RETIRED) {
      const reason = retirementReason(id)
      expect(reason, id).toBeTruthy()
      // Evidence, not a one-word tag.
      expect(reason!.length, id).toBeGreaterThan(40)
    }
  })

  it('does not retire the two cell-division concepts that have faithful scenes', () => {
    expect(isRetiredVisualBinding('bio.cell.mitosis')).toBe(false)
    expect(isRetiredVisualBinding('bio.cell.meiosis')).toBe(false)
  })
})

describe('every retired concept resolves to NO FIGURE', () => {
  it.each(RETIRED)('%s', (conceptId) => {
    const d = ask(conceptId)
    expect(d.graphical).toBe(false)
    expect(d.payload).toBeNull()
    expect(d.asset).toBeNull()
    expect(d.provenance).toBe('no-figure:retired-binding')
  })

  it.each(RETIRED)('%s — and through the async authority too', async (conceptId) => {
    const d = await resolveVisualForTurn({
      message: 'explain with diagram',
      lessonConceptId: conceptId,
      learnerRequest: 'diagram',
    })
    expect(d.graphical).toBe(false)
    expect(d.asset).toBeNull()
  })

  it('no broader rule can pick a retired concept back up', () => {
    // The register sits ahead of every tier, so retirement survives the curated
    // row, the domain-prefix rule AND the scene generator. These three cover one
    // retired concept from each of those sources.
    for (const id of ['phys.em.lc-circuits', 'bio.cell.apoptosis', 'phys.mech.keplers-laws', 'phys.opt.reflection']) {
      expect(ask(id).graphical, id).toBe(false)
    }
  })

  it('a retired concept stays retired however the learner phrases the request', () => {
    for (const message of [
      'draw it', 'show me a diagram', 'visualise this', 'can I see a picture',
      'explain differently with a ray diagram and a mirror',
    ]) {
      expect(ask('phys.opt.reflection', message).graphical, message).toBe(false)
    }
  })
})

describe('the tutor is never told a figure exists', () => {
  it.each(RETIRED)('%s gets the NO FIGURE contract', (conceptId) => {
    const block = buildVisualContractBlock(ask(conceptId))
    expect(block).toContain('NO FIGURE IS ATTACHED')
    expect(block).not.toContain('A FIGURE IS ALREADY BEING RENDERED')
  })
})

describe('B1 changed only what it was meant to change', () => {
  it('the concepts that shared a retired asset but were faithful are untouched', () => {
    // phys.opt.mirrors shares the concave-mirror scene that phys.opt.reflection
    // was retired for. Mirrors keeps it: for that concept the figure is correct.
    const mirrors = ask('phys.opt.mirrors')
    expect(mirrors.graphical).toBe(true)
    expect(mirrors.asset?.conceptId).toBe('phys.opt.mirrors')

    // Covalent bonding keeps the bond-formation card; ionic and metallic were
    // retired from it because they are different mechanisms.
    expect(ask('chem.bond.covalent-bonding').graphical).toBe(true)
    expect(ask('chem.bond.ionic-bonding').graphical).toBe(false)

    // Ohm's law keeps the circuit scene; the seven component-specific concepts
    // were retired from the bulb card.
    expect(ask('phys.em.ohms-law').graphical).toBe(true)
  })

  it('known-good visuals still resolve exactly as before', () => {
    const newton = ask('phys.mech.newtons-first-law')
    expect(newton.provenance).toBe('registry:phys.mech.newtons-first-law:three_newton_forces')
    const fractions = ask('math.arith.fractions')
    expect(fractions.graphical).toBe(true)
    const mitosis = ask('bio.cell.mitosis')
    expect(mitosis.graphical).toBe(true)
    expect(mitosis.payload?.renderer).toBe('scene')
  })

  it('the historic wrong-visual concepts still receive nothing at all', () => {
    // Unchanged by B1 — they had no asset before and must not have acquired one.
    for (const id of [
      'phys.opt.total-internal-reflection', 'phys.therm.calorimetry', 'phys.therm.first-law',
      'phys.wave.transverse-waves', 'phys.mech.viscosity', 'phys.mech.surface-tension',
      'phys.wave.interference',
    ]) {
      const d = ask(id, 'explain with a ray diagram, like a mirror')
      expect(d.graphical, id).toBe(false)
      expect(d.asset, id).toBeNull()
    }
  })
})
