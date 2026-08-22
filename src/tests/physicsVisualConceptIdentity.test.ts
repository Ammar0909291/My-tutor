/**
 * PHYSICS PRODUCTION-COMPLETENESS AUDIT — visual quality lock.
 *
 * Modeled on src/tests/visualConceptIdentity.test.ts (the chemistry
 * production-incident test), because this fix is the same defect class:
 * DOMAIN_VISUALS asserted "every concept under this prefix is well
 * represented by this one visual" for four physics domains that are
 * actually heterogeneous. Measured directly (not estimated) before the fix:
 * 61 concepts across phys.em/phys.opt/phys.wave/phys.meas were reaching a
 * visual ONLY through a blanket domain default, and the visual was WRONG for
 * most of them — e.g. every phys.em field/magnetism concept (Gauss's Law,
 * Magnetic Field and Field Lines, ...) rendered a circuit_diagram (battery,
 * wires, bulb), and every phys.wave oscillation concept (Doppler Effect,
 * Standing Waves, Beats, ...) rendered a static force_diagram.
 *
 * The fix removed the four blanket defaults, promoted every concept that
 * GENUINELY fits an existing visual to an explicit CONCEPT_VISUALS entry,
 * and left the rest unmapped (falls through to detectVisual's keyword match
 * or an honest no-visual response). It also closed the platform's single
 * largest coverage gap: 14 dedicated quantum-mechanics visual renderers
 * (double_slit, wave_function, potential_well, quantum_tunneling,
 * bloch_sphere, energy_level_diagram, stern_gerlach, and their 3D
 * counterparts) were fully built and wired into VisualCard.tsx but
 * referenced by nothing in this registry — phys.qm had 0/19 concepts
 * visualized despite the content already existing.
 *
 * HONEST ACCOUNTING, not spin: raw coverage went DOWN (112/238 measured
 * coverage before this fix, most of the delta from the wrong domain
 * defaults just removed, down to 77/238 measured after) while WRONG
 * coverage went to zero. A lower, honest number is the correct outcome here
 * — "never show unrelated visuals" was the explicit instruction this fix
 * was written against, and a coverage percentage that counts wrong answers
 * as covered is exactly the statistic that instruction warns against
 * optimizing for.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { lookupConceptVisual, getConceptVisualType } from '@/lib/teaching/visualRegistry'

interface KgConcept { id: string; name: string }
const PHYS: KgConcept[] = JSON.parse(readFileSync('docs/physics/kg/graph.json', 'utf8')).concepts

function domain(id: string) { return id.split('.').slice(0, 2).join('.') }

describe('the production incident concepts — specific known-wrong mappings never fire again', () => {
  // One concept named from each of the four broken domains, chosen because
  // it is the least electricity/optics/wave/vector-like concept in its own
  // domain — the sharpest possible counter-example to the old default.
  const REPORTED: Array<[string, string]> = [
    ['phys.em.gauss-law', 'circuit_diagram'],       // a field law, not a circuit
    ['phys.opt.diffraction', 'force_diagram'],       // a wave phenomenon, not a static force
    ['phys.wave.doppler-effect', 'force_diagram'],   // a frequency shift, not a force
    ['phys.meas.significant-figures', 'three_vector_visualization'], // counting digits, not a vector
  ]

  it.each(REPORTED)('%s never resolves to the old wrong default (%s)', (conceptId, wrongType) => {
    const v = getConceptVisualType(conceptId)
    expect(v).not.toBe(wrongType)
  })

  it('all four resolve to null (honest no-visual), not a different wrong substitution', () => {
    for (const [conceptId] of REPORTED) {
      expect(lookupConceptVisual(conceptId), conceptId).toBeNull()
    }
  })
})

describe('phys.em: the circuit/field split is honoured', () => {
  const FIELD_MAGNETISM = [
    'phys.em.electric-charge', 'phys.em.coulombs-law', 'phys.em.electric-field',
    'phys.em.electric-dipole', 'phys.em.gauss-law', 'phys.em.electric-potential',
    'phys.em.capacitance', 'phys.em.dielectrics', 'phys.em.energy-capacitor',
    'phys.em.magnetic-field', 'phys.em.magnetic-force', 'phys.em.biot-savart',
    'phys.em.amperes-law', 'phys.em.solenoid', 'phys.em.magnetic-materials',
    'phys.em.magnetic-dipole', 'phys.em.magnetic-flux', 'phys.em.faradays-law',
    'phys.em.lenzs-law', 'phys.em.maxwells-equations', 'phys.em.electromagnetic-waves',
  ]
  const CIRCUITS = [
    'phys.em.electric-current', 'phys.em.ohms-law', 'phys.em.dc-circuits',
    'phys.em.kirchhoffs-laws', 'phys.em.resistivity', 'phys.em.wheatstone-bridge',
    'phys.em.potentiometer', 'phys.em.electrical-power', 'phys.em.emf',
    'phys.em.rc-circuits', 'phys.em.lc-circuits', 'phys.em.ac-basics',
    'phys.em.self-inductance', 'phys.em.mutual-inductance',
  ]

  it('every real KG concept in this list is accounted for (no drift from the KG)', () => {
    const em = PHYS.filter((c) => domain(c.id) === 'phys.em').map((c) => c.id)
    expect(em.sort()).toEqual([...FIELD_MAGNETISM, ...CIRCUITS].sort())
  })

  it.each(FIELD_MAGNETISM)('%s has NO circuit visual (it is a field/magnetism concept)', (id) => {
    expect(getConceptVisualType(id)).not.toBe('circuit_diagram')
  })

  it.each(CIRCUITS)('%s correctly gets circuit_diagram (removing the default did not lose real coverage)', (id) => {
    expect(getConceptVisualType(id)).toBe('circuit_diagram')
  })
})

describe('new coverage: dedicated quantum visuals, previously wired but unreferenced', () => {
  const EXPECTED: Array<[string, string]> = [
    ['phys.qm.wave-function', 'wave_function'],
    ['phys.qm.schrodinger-equation', 'wave_function'],
    ['phys.qm.particle-in-box', 'potential_well'],
    ['phys.qm.hydrogen-atom-qm', 'three_hydrogen_orbital'],
    ['phys.qm.spin', 'stern_gerlach'],
    ['phys.qm.quantum-tunneling', 'quantum_tunneling'],
    ['phys.qm.selection-rules', 'energy_level_diagram'],
    ['phys.mod.wave-particle-duality', 'double_slit'],
    ['phys.mod.bohr-model', 'energy_level_diagram'],
    ['phys.mod.atomic-spectra', 'energy_level_diagram'],
  ]
  it.each(EXPECTED)('%s -> %s', (id, type) => {
    expect(getConceptVisualType(id)).toBe(type)
  })

  it('harmonic-oscillator-qm is deliberately NOT mapped to potential_well', () => {
    // potential_well's own description is specifically an infinite SQUARE
    // well — a different potential shape from the parabolic harmonic-
    // oscillator well. Showing the wrong potential shape would misteach the
    // concept, which is worse than showing nothing.
    expect(getConceptVisualType('phys.qm.harmonic-oscillator-qm')).not.toBe('potential_well')
  })
})

describe('new coverage: thermodynamics and statistical mechanics, used conservatively', () => {
  it('the three genuinely graph-shaped thermo concepts get coordinate_plane', () => {
    for (const id of ['phys.therm.ideal-gas-law', 'phys.therm.thermodynamic-processes', 'phys.therm.carnot-cycle']) {
      expect(getConceptVisualType(id)).toBe('coordinate_plane')
    }
  })

  it('probability-basics gets the generic distribution visual', () => {
    expect(getConceptVisualType('phys.stat.probability-basics')).toBe('three_statistical_distribution')
  })

  it('maxwell-boltzmann/fermi-dirac/bose-einstein are NOT mapped to it', () => {
    // The renderer draws a FIXED symmetric bell curve (verified by reading
    // StatisticalDistribution3D.tsx — not parametrized by content). A
    // Maxwell-Boltzmann speed distribution is skewed, and Fermi-Dirac/
    // Bose-Einstein are step-like/divergent occupation functions — none of
    // them look like a bell curve. Mapping them would show the wrong shape.
    for (const id of ['phys.stat.maxwell-boltzmann', 'phys.stat.fermi-dirac', 'phys.stat.bose-einstein']) {
      expect(getConceptVisualType(id)).not.toBe('three_statistical_distribution')
    }
  })
})

describe('intentional zero coverage is documented, not silent', () => {
  it('particle physics, relativity and astrophysics have no visual type on the platform at all', () => {
    // Confirms the premise the registry's own comment states: this is a
    // genuine content gap, not a registry omission. If any of these visual
    // types are ever added, this test starts failing loudly rather than the
    // gap silently persisting.
    const types = readFileSync('src/lib/school/visuals/visualTypes.ts', 'utf8')
    for (const forbidden of [
      /particle.?collision/i, /spacetime/i, /minkowski/i, /stellar/i, /cosmology/i,
    ]) {
      expect(types).not.toMatch(forbidden)
    }
  })

  it('every phys.particle / phys.rel / phys.astro concept resolves to null', () => {
    for (const c of PHYS) {
      if (['phys.particle', 'phys.rel', 'phys.astro'].includes(domain(c.id))) {
        expect(lookupConceptVisual(c.id), c.id).toBeNull()
      }
    }
  })
})

describe('coverage floor — this fix must not regress below its own result', () => {
  it('at least 76 of 238 physics concepts resolve to a visual', () => {
    // A FLOOR, not a target: future content work should raise this number by
    // adding more genuinely-fitting exact entries, never by reintroducing a
    // blanket domain default. Set from this fix's own measured result so a
    // future accidental removal is caught immediately.
    //
    // 77 -> 76 (live P0, Lesson 39): the original floor was measured from a set
    // that INCLUDED 'phys.mech.angular-kinematics' -> coordinate_plane, a
    // binding since proven wrong against production — the tutor taught a
    // rotating wheel while the learner looked at a bare axis grid. Coverage is
    // a proxy for "the learner gets a useful figure", and it stops being that
    // the moment a binding is counted whose figure teaches nothing about its
    // concept. The floor therefore drops by exactly one, for one identified and
    // documented removal, and remains a floor: it still fails on the next
    // accidental deletion. See visualRegistry.test.ts, 'generic-canvas bindings
    // must not stand in for a real figure'.
    const covered = PHYS.filter((c) => lookupConceptVisual(c.id) !== null).length
    expect(covered).toBeGreaterThanOrEqual(76)
    // And the removal really was exactly one: nothing else silently vanished.
    expect(covered).toBe(76)
  })

  it('zero orphan keys and zero duplicates remain physics-specific to this fix', () => {
    // Every new key added by this fix must name a real KG concept — reuses
    // the same universe visualCoverageValidator's integration tests check,
    // scoped to the concepts this fix touched.
    const touched = [
      'phys.opt.lens-power', 'phys.opt.youngs-experiment',
      'phys.em.resistivity', 'phys.em.wheatstone-bridge', 'phys.em.potentiometer',
      'phys.em.electrical-power', 'phys.em.emf', 'phys.em.rc-circuits',
      'phys.em.lc-circuits', 'phys.em.ac-basics', 'phys.em.self-inductance',
      'phys.em.mutual-inductance',
      'phys.qm.wave-function', 'phys.qm.schrodinger-equation', 'phys.qm.particle-in-box',
      'phys.qm.hydrogen-atom-qm', 'phys.qm.spin', 'phys.qm.quantum-tunneling',
      'phys.qm.selection-rules', 'phys.mod.wave-particle-duality', 'phys.mod.bohr-model',
      'phys.mod.atomic-spectra', 'phys.therm.ideal-gas-law',
      'phys.therm.thermodynamic-processes', 'phys.therm.carnot-cycle',
      'phys.stat.probability-basics',
    ]
    const kgIds = new Set(PHYS.map((c) => c.id))
    for (const id of touched) {
      expect(kgIds.has(id), `${id} must be a real KG concept`).toBe(true)
      expect(getConceptVisualType(id), `${id} must resolve to something`).not.toBeNull()
    }
  })
})
