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
import { lookupConceptVisualBinding } from '@/lib/teaching/visualRegistry'

const RETIRED = Object.keys(RETIRED_VISUAL_BINDINGS)

const ask = (conceptId: string, message = 'explain with diagram') =>
  resolveVisual({ message, lessonConceptId: conceptId, learnerRequest: 'diagram' })

describe('the register itself', () => {
  it('covers exactly the 43 audited concepts', () => {
    // 29 from the M3-A audit + 8 from the visual semantic moat sweep, which
    // ran the resolver over all 238 physics and 186 chemistry concepts and
    // read all 105 bindings that render.
    //
    // The sweep's first pass added 21 and then reversed 13 of them: every one
    // was ALREADY demoted by scope.ts to "a GENERAL ILLUSTRATION — NOT a
    // figure of X", so retiring it removed a picture that made no claim. The
    // 8 that remain depict the very position their concept exists to refute —
    // a perfect lattice for crystal DEFECTS, shell rings for ORBITALS, a
    // covalent bond for INTERmolecular forces — which no wording can fix.
    //
    // +6 (2026-09-24, Biology visual coverage inventory): the inventory ran
    // the real resolver over all 199 current Biology KG concepts and found six
    // more bio.cell concepts, authored after the original 12-concept sweep
    // above, silently inheriting the identical wrong 'bio.cell' -> food_chain
    // domain default — the same defect class, found by the same method.
    expect(RETIRED).toHaveLength(43)
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

  it('the twelve original bio.cell retirements behave exactly as before the six new ones were added', () => {
    // Explicit, named check (not just the parameterized RETIRED loop above)
    // that adding six new entries to the same Record did not disturb the
    // twelve that were already there — same suppression, same evidence.
    for (const id of [
      'bio.cell.cell-theory', 'bio.cell.prokaryotic-cell', 'bio.cell.eukaryotic-cell',
      'bio.cell.cell-membrane-transport', 'bio.cell.nucleus-chromosomes',
      'bio.cell.mitochondria-energy', 'bio.cell.chloroplast-structure',
      'bio.cell.endomembrane-system', 'bio.cell.cytoskeleton', 'bio.cell.cell-cycle',
      'bio.cell.cell-signalling', 'bio.cell.apoptosis',
    ]) {
      expect(isRetiredVisualBinding(id), id).toBe(true)
      expect(ask(id).graphical, id).toBe(false)
    }
  })

  it('the historic wrong-visual concepts are not served on an off-topic request', () => {
    // CORRECTED in visual round 2. This previously read "they had no asset
    // before and must not have acquired one", which is no longer true and had
    // stopped describing what the test does: all seven have since been given
    // faithful, concept-specific generator scenes by the M4 pilot (calorimetry
    // prints "heat lost = heat gained"; total-internal-reflection prints
    // sin(theta_c) = n2/n1). That is an improvement, not a regression.
    //
    // The assertion still passes, and still guards something real, but it is a
    // DIFFERENT guarantee: the message below explicitly names a ray diagram and
    // a mirror, i.e. a topic other than the lesson, so requestTargetsSomethingElse
    // withholds any new figure. Left in place under its true description —
    // a guard that passes for a reason its comment denies is worse than no guard.
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

/**
 * The six bio.cell concepts found by the 2026-09-24 Biology visual coverage
 * inventory — the SAME defect as the twelve concepts retired above (a food
 * chain card, ecosystem-level energy flow, silently inherited via the
 * 'bio.cell' -> food_chain DOMAIN_VISUALS default for subcellular topics that
 * were authored after the original sweep and never checked against it).
 *
 * These tests name the six concepts explicitly, rather than relying only on
 * the parameterized RETIRED loops above, so a future edit that accidentally
 * drops one of the six ids from RETIRED_VISUAL_BINDINGS fails loudly here
 * even if it never breaks the generic loop.
 */
describe('the six newly-retired bio.cell concepts (2026-09-24 inventory)', () => {
  const NEW_RETIREMENTS = [
    'bio.cell.anaerobic-respiration-fermentation',
    'bio.cell.cancer-biology-hallmarks',
    'bio.cell.cell-adhesion-tissue-organization',
    'bio.cell.cell-junctions-extracellular-matrix',
    'bio.cell.cytoskeleton-motility',
    'bio.cell.membrane-transport-energetics',
  ]

  it.each(NEW_RETIREMENTS)('%s — A: isRetiredVisualBinding is true', (conceptId) => {
    expect(isRetiredVisualBinding(conceptId)).toBe(true)
  })

  it.each(NEW_RETIREMENTS)('%s — B: no longer resolves to the food_chain fallback through the resolver', (conceptId) => {
    // The underlying DOMAIN_VISUALS row is untouched by design (retired.ts's
    // own contract: "Nothing is removed from CONCEPT_VISUALS, DOMAIN_VISUALS
    // or CONCEPT_SCENES") — lookupConceptVisualBinding still finds it...
    const binding = lookupConceptVisualBinding(conceptId)
    expect(binding?.entry.primary, conceptId).toBe('food_chain')
    // ...but the ACTUAL resolver, which checks retirement before any tier,
    // never reaches that row and serves no figure at all.
    const d = ask(conceptId)
    expect(d.graphical, conceptId).toBe(false)
    expect(d.payload, conceptId).toBeNull()
    expect(d.provenance, conceptId).toBe('no-figure:retired-binding')
  })

  it('D: an unrelated Biology concept legitimately using ITS OWN domain fallback is unaffected', () => {
    // After these six retirements, EVERY bio.cell concept is either retired
    // (18 of 20) or served by its own exact Tier 0 generator (bio.cell.mitosis,
    // bio.cell.meiosis) — none legitimately falls through to the bio.cell
    // domain default any more, so there is no remaining bio.cell control to
    // pick (confirmed by running lookupConceptVisualBinding over all 20
    // bio.cell KG concepts). Per the task's own fallback instruction, the
    // control is instead a concept from a DIFFERENT Biology domain that
    // legitimately uses ITS OWN, separate domain-default row
    // ('bio.eco' -> food_chain, a different DOMAIN_VISUALS entry entirely) —
    // confirming that retiring six bio.cell ids left the bio.eco rule, and
    // every concept resolved through it, completely untouched.
    for (const id of ['bio.eco.population-ecology', 'bio.eco.community-ecology']) {
      expect(isRetiredVisualBinding(id), id).toBe(false)
      const binding = lookupConceptVisualBinding(id)
      expect(binding?.tier, id).toBe('domain')
      expect(binding?.scope, id).toBe('bio.eco')
      expect(binding?.entry.primary, id).toBe('food_chain')
      const d = ask(id)
      expect(d.graphical, id).toBe(true)
      expect(d.provenance, id).toBe(`registry:domain-default:bio.eco:food_chain`)
    }
  })

  it('the two cell-division concepts still resolve through their own Tier 0 generator, untouched', () => {
    // Regression guard specific to this change: bio.cell.mitosis/meiosis sit
    // in the same domain as the six new retirements and must not have been
    // affected by editing a Record that is keyed by concept id, not by domain.
    for (const id of ['bio.cell.mitosis', 'bio.cell.meiosis']) {
      expect(isRetiredVisualBinding(id), id).toBe(false)
      const d = ask(id)
      expect(d.graphical, id).toBe(true)
      expect(d.payload?.renderer, id).toBe('scene')
    }
  })
})
