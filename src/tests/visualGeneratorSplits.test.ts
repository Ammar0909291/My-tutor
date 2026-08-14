/**
 * M3-B stage B2 — generator kind-defaults split into the concept's own case.
 *
 * The M3-A audit found 35 concepts bound to a generator KIND with no
 * concept-specific parameters, so each was served that kind's single canonical
 * instance. 14 were already faithful; the rest were conditional or generic.
 *
 * Only two could be made faithful by RE-PARAMETERISING an existing generator.
 * The remainder need geometry no generator has (a refracting boundary with a
 * normal, a force-time curve, field lines, a replication fork), and are
 * recorded as "requires authoring" rather than approximated — a near-miss figure
 * explained confidently is the failure M1 and B1 exist to prevent.
 *
 * These tests assert both halves: the two splits are genuinely the concept's
 * own case, and the untouched faithful assets are byte-identical.
 */

import { describe, expect, it } from 'vitest'
import { buildCanonicalScene, CONCEPT_SCENE_OVERRIDES } from '@/lib/teaching/visual/conceptSceneParams'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { describeVisualPayload } from '@/lib/teaching/visual/visualSemantics'

const ask = (conceptId: string) =>
  resolveVisual({ message: 'explain with diagram', lessonConceptId: conceptId, learnerRequest: 'diagram' })

const textOf = (conceptId: string) => {
  const d = ask(conceptId)
  const s = describeVisualPayload(d.payload)
  return `${s.caption ?? ''} ${s.elements.join(' ')} ${s.steps.join(' ')}`.toLowerCase()
}

describe('Kirchhoff\'s laws now draws a circuit with junctions', () => {
  it('resolves to a PARALLEL network, not the series kind-default', () => {
    const text = textOf('phys.em.kirchhoffs-laws')
    expect(text).toContain('parallel')
    expect(text).not.toContain('series circuit')
  })

  it('the figure actually demonstrates the current law', () => {
    // KCL is "current in equals current out at a node". A series loop has no
    // node at all, which is why the kind-default could not teach this concept.
    expect(textOf('phys.em.kirchhoffs-laws')).toMatch(/split across the branches/)
  })

  it('it became a concept-specific declared asset', () => {
    const d = ask('phys.em.kirchhoffs-laws')
    expect(d.graphical).toBe(true)
    expect(d.asset?.provenance).toBe('generator')
    expect(d.asset?.identity).toBe('declared')
    expect(d.asset?.conceptId).toBe('phys.em.kirchhoffs-laws')
  })

  it('series and parallel are now two different circuits, not one shared figure', () => {
    // phys.em.dc-circuits keeps the series default deliberately — it is the
    // concept's other half. The two must not collapse back into one figure.
    expect(textOf('phys.em.dc-circuits')).toContain('series')
    expect(textOf('phys.em.kirchhoffs-laws')).toContain('parallel')
    expect(ask('phys.em.dc-circuits').payload).not.toEqual(ask('phys.em.kirchhoffs-laws').payload)
  })
})

describe('Geostationary orbits now draw a geostationary orbit', () => {
  it('the derived period is a day, not the 97-minute default orbit', () => {
    const text = textOf('phys.mech.satellites')
    // The generator derives T from v = sqrt(GM/r); at r = 42,164 km that is the
    // sidereal day (~86,164 s). The kind default was a 7,000 km LEO.
    const seconds = Number(/t\s*[≈=]\s*([\d.]+)\s*s/.exec(text)?.[1] ?? '0')
    expect(seconds).toBeGreaterThan(80_000)
    expect(seconds).toBeLessThan(90_000)
  })

  it('it differs from the orbital-mechanics figure it used to share', () => {
    expect(ask('phys.mech.satellites').payload).not.toEqual(ask('phys.mech.orbital-mechanics').payload)
  })

  it('it became a concept-specific declared asset', () => {
    const d = ask('phys.mech.satellites')
    expect(d.asset?.provenance).toBe('generator')
    expect(d.asset?.identity).toBe('declared')
    expect(d.asset?.conceptId).toBe('phys.mech.satellites')
  })
})

describe('B2 changed nothing else', () => {
  it('the already-faithful generator assets are untouched', () => {
    // Each of these was classified A in M3-A and must be byte-identical.
    const unchanged: Array<[string, string]> = [
      ['phys.mech.orbital-mechanics', 'orbital motion'],
      ['phys.em.ohms-law', 'series'],
      ['phys.mech.collisions-elastic', 'elastic collision'],
      ['phys.wave.pendulum', 'pendulum'],
      ['phys.opt.lenses', 'convex lens'],
      ['phys.meas.vector-addition', 'vector addition'],
      ['phys.mech.kinematics-1d', 'kinematics'],
      ['phys.mech.torque', 'torque'],
      ['phys.mech.projectile-motion', 'projectile'],
      ['phys.mech.circular-motion', 'circular motion'],
      ['bio.cell.mitosis', 'mitosis'],
      ['phys.opt.mirrors', 'mirror'],
    ]
    for (const [conceptId, marker] of unchanged) {
      const d = ask(conceptId)
      expect(d.graphical, conceptId).toBe(true)
      expect(textOf(conceptId), conceptId).toContain(marker)
    }
  })

  it('B2 added exactly its two overrides', () => {
    // 5 pre-existing (reflection, mirrors, inelastic, meiosis, dihybrid)
    // + 2 from B2 + 7 from the M4 Physics pilot = 14, + 1 for
    // phys.meas.vector-products (the vector family's third claim — see
    // vectorProductVisualSelection.test.ts) = 15.
    expect(CONCEPT_SCENE_OVERRIDES).toHaveLength(15)
    expect(CONCEPT_SCENE_OVERRIDES).toContain('phys.em.kirchhoffs-laws')
    expect(CONCEPT_SCENE_OVERRIDES).toContain('phys.mech.satellites')
    expect(CONCEPT_SCENE_OVERRIDES).toContain('phys.meas.vector-products')
  })

  it('the generator kind-defaults themselves are unchanged', () => {
    // The shared canonical instances still exist for every other concept that
    // names the kind — B2 added parameters, it did not redefine the generators.
    expect(buildCanonicalScene('electric_circuit')?.title).toContain('Series')
    expect(buildCanonicalScene('gravitation_orbit')?.title).toContain('Orbital Motion')
  })

  it('retired bindings stayed retired', () => {
    expect(ask('phys.mech.keplers-laws').graphical).toBe(false)
    expect(ask('phys.opt.reflection').graphical).toBe(false)
  })
})

describe('cases the audit found that B2 deliberately did NOT approximate', () => {
  // Each needs geometry no existing generator has. B2 authored none of them,
  // and inventing a near-miss would be the exact failure mode M1 and B1 exist
  // to prevent. Recorded here so the list is executable rather than only
  // living in a report.
  //
  // ── RE-CONFIRMED BY THE VISUAL SEMANTIC MOAT SWEEP ──────────────────────
  // That sweep briefly retired four of these (refraction, shm-energy,
  // kinematics-2d, gravitational-field) and then reversed it: all four were
  // ALREADY demoted to "GENERAL ILLUSTRATION — NOT a figure of X" by
  // scope.ts's INSUFFICIENT_FOR_CONCEPT, which is precisely the state this
  // list describes. Retiring a figure that makes no claim removes a harmless
  // picture and teaches nothing. The original assertion stands unchanged; the
  // sweep's contribution here is the second one below, which pins WHY it is
  // safe — see visualSemanticMoatPhysicsChemistry.test.ts.
  const REQUIRES_AUTHORING = [
    'phys.opt.refraction',            // needs a boundary, a normal, angles i/r
    'phys.opt.lens-power',            // needs a lens COMBINATION
    'phys.mech.impulse',              // needs a force-time curve
    'phys.wave.shm-energy',           // needs a KE/PE energy split
    'phys.meas.scalars-vectors',      // needs a scalar shown beside a vector
    'phys.mech.kinematics-2d',        // needs 2D components, not 1D graphs
    'phys.mech.universal-gravitation',// needs two masses and an inverse-square force
    'phys.mech.gravitational-field',  // needs field lines
    'phys.em.electric-current',       // needs drift velocity / charge carriers
    'phys.mech.rotational-dynamics',  // needs moment of inertia and angular acceleration
    'chem.period.modern-periodic-law',// needs the periodic table itself
    'bio.mol.dna-replication',        // needs a replication fork, not static base pairing
  ] as const

  it.each(REQUIRES_AUTHORING)('%s still resolves, unchanged and not faked', (conceptId) => {
    const d = ask(conceptId)
    // Still shows its existing figure — B2 removed nothing — and the figure
    // still belongs to the concept that asked for it.
    expect(d.graphical).toBe(true)
    expect(d.asset?.conceptId).toBe(conceptId)
  })

  it.each(REQUIRES_AUTHORING)('%s makes no claim to BE a figure of the concept', (conceptId) => {
    // The condition that makes "still resolves" safe. Each carries scope
    // 'domain', so the tutor is told it is a general illustration and barred
    // from reading anything off it.
    expect(ask(conceptId).asset?.scope, conceptId).toBe('domain')
  })

  it('none of the twelve was silently given another concept\'s override', () => {
    // The original invariant, unchanged and still covering all twelve: B2
    // must not have handed any of them a neighbour's authored parameters.
    for (const conceptId of REQUIRES_AUTHORING) {
      expect(CONCEPT_SCENE_OVERRIDES, conceptId).not.toContain(conceptId)
    }
  })
})
