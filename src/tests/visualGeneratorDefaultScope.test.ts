/**
 * THE GENERATOR-DEFAULT BLIND SPOT.
 *
 * `asset.ts` declares two provenances as 'derived' identity — the concept's
 * identity is widened from something shared rather than declared for it:
 *
 *     IDENTITY_STRENGTH['domain-default']    = 'derived'
 *     IDENTITY_STRENGTH['generator-default'] = 'derived'
 *
 * `scopeForAsset` demotes the first to 'domain' scope, so the tutor contract
 * introduces it as "a GENERAL ILLUSTRATION — NOT a figure of <concept>". It
 * says nothing about the second. A concept that names a generator KIND but
 * authors no parameters of its own is therefore served that kind's ONE shared
 * canonical scene AND told to introduce it as a figure of itself.
 *
 * Found on 2026-08-14 by driving a real production lesson and then asking why
 * a figure that is not concept-owned still claimed concept scope. The clearest
 * case: `chem.solid.crystal-systems` — KG description "Seven crystal systems;
 * Bravais lattices" — is served a scene titled "Face-Centred Cubic (FCC) unit
 * cell", under the STRONG contract.
 *
 * These concepts are NOT demoted as a class. For most of them the shared
 * instance genuinely IS the concept (an elastic-collision scene for
 * `collisions-elastic`, a thin-lens ray diagram for `lenses`). Seven that were
 * judged individually — scene title against the KG's own description — are now
 * listed in INSUFFICIENT_FOR_CONCEPT.
 *
 * What this file does is stop the gap growing in the dark: the concepts still
 * claiming concept scope from a SHARED generator scene are enumerated, and the
 * list may only ever SHRINK — by authoring concept parameters (promoting the
 * figure to 'generator'), or by demoting the claim. A new one appearing fails
 * here rather than reaching a learner.
 */
import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import { getConceptSceneGenerator } from '@/lib/teaching/visualRegistry'
import { buildCanonicalScene, CONCEPT_SCENE_OVERRIDES } from '@/lib/teaching/visual/conceptSceneParams'
import { INSUFFICIENT_FOR_CONCEPT, scopeForAsset } from '@/lib/teaching/visual/scope'
import { RETIRED_VISUAL_BINDINGS } from '@/lib/teaching/visual/retired'
import { IDENTITY_STRENGTH } from '@/lib/teaching/visual/asset'

const KGS = [
  'docs/chemistry/kg/graph.json',
  'docs/physics/kg/graph.json',
  'docs/mathematics/kg/graph.json',
  'docs/biology/kg/graph.json',
  'docs/computer-science/kg/graph.json',
  'docs/english/kg/graph.json',
]

function allConceptIds(): string[] {
  const ids: string[] = []
  for (const f of KGS) {
    for (const c of JSON.parse(fs.readFileSync(f, 'utf8')).concepts as { id: string }[]) ids.push(c.id)
  }
  return ids
}

/** Concepts served a SHARED generator scene (kind default, not concept-owned). */
function generatorDefaultConcepts(): string[] {
  return allConceptIds().filter((id) => {
    if (id in RETIRED_VISUAL_BINDINGS) return false
    if (CONCEPT_SCENE_OVERRIDES.includes(id)) return false      // owns its parameters
    return buildCanonicalScene(getConceptSceneGenerator(id), id) !== null
  })
}

describe('the two shared-figure provenances are both derived identity', () => {
  it('domain-default and generator-default are declared the same strength', () => {
    expect(IDENTITY_STRENGTH['domain-default']).toBe('derived')
    expect(IDENTITY_STRENGTH['generator-default']).toBe('derived')
  })

  it('a domain-default asset can never claim concept scope', () => {
    // The rule that already exists, pinned so the asymmetry below is a
    // deliberate exception and not an accident of ordering.
    expect(scopeForAsset('domain-default', 'phys.mech.projectile-motion')).toBe('domain')
  })
})

describe('the seven judged over-claims are demoted', () => {
  // Each was compared, scene title against the KG's own description, and shows
  // ONE INSTANCE of something the concept defines more broadly.
  it.each([
    ['phys.mech.momentum', 'an elastic collision scene; p = mv is never drawn'],
    ['phys.wave.shm', 'a pendulum: one small-angle instance, not F = -kx'],
    ['phys.em.ohms-law', 'a series network with R_total, not V = IR'],
    ['phys.em.dc-circuits', 'series only; the concept is series AND parallel'],
    ['chem.atomic.electronic-config', 'one Na shell diagram; no Aufbau/Hund/Pauli'],
    ['chem.period.periodic-properties', 'Na vs Cl only; no diagonal relationships'],
    ['chem.solid.crystal-systems', 'one FCC cell; the concept is seven systems'],
  ])('%s is domain-scoped (%s)', (conceptId) => {
    expect(INSUFFICIENT_FOR_CONCEPT.has(conceptId)).toBe(true)
    expect(scopeForAsset('generator-default', conceptId)).toBe('domain')
  })
})

describe('the remaining gap is enumerated and may only shrink', () => {
  // Concept scope here is a POSITIVE judgement: the shared instance genuinely
  // depicts the concept. Anything new must be judged the same way before it is
  // added, which is why this list is exact rather than a ceiling.
  const JUDGED_GENUINE = [
    'bio.cell.mitosis',
    'chem.bond.vsepr',
    'cs.found.boolean-logic',
    'math.geom.distance-formula',
    'phys.mech.circular-motion',
    'phys.mech.collisions-elastic',
    'phys.mech.kinematics-1d',
    'phys.mech.orbital-mechanics',
    'phys.mech.projectile-motion',
    'phys.mech.torque',
    'phys.meas.vector-addition',
    'phys.opt.lenses',
    'phys.wave.pendulum',
  ]

  it('no generator-default concept claims concept scope unless judged genuine', () => {
    const claiming = generatorDefaultConcepts()
      .filter((id) => scopeForAsset('generator-default', id) === 'concept')
      .sort()
    expect(claiming).toEqual([...JUDGED_GENUINE].sort())
  })

  it('the enumeration is non-vacuous', () => {
    expect(generatorDefaultConcepts().length).toBeGreaterThanOrEqual(20)
  })
})
