/**
 * THE VISUAL SEMANTIC MOAT — PHYSICS AND CHEMISTRY SWEEP.
 *
 * ── WHAT THIS MEASURES THAT NOTHING ELSE DID ────────────────────────────────
 * The existing visual tests assert that the resolver returns a figure, that a
 * figure's identity matches the concept it claims, that layout is safe, and
 * that generated figures pass the critic. None of them asks the only question
 * that matters to a learner: does the figure teach what the tutor is claiming?
 *
 * The resolver's `provenance` field is where that becomes findable, because it
 * records how a figure's identity was ESTABLISHED: `curated` and `generator`
 * DECLARE it for the concept, while `domain-default` and `generator-default`
 * WIDEN it from a domain prefix or a generator kind. Running the real resolver
 * over all 238 physics and all 186 chemistry concepts found 51 widened
 * bindings and 54 declared ones. All 105 were read against what they paint.
 *
 * ── THE LINE, AND THE CORRECTION THAT PRODUCED IT ───────────────────────────
 * The sweep's first pass retired 21 bindings. Cross-checking against `scope.ts`
 * then showed EVERY ONE was already demoted — 4 sat in INSUFFICIENT_FOR_CONCEPT
 * and the rest resolved through a domain rule, so `scopeForAsset` had already
 * given them scope 'domain' and `visualContract` was already introducing them
 * as "a GENERAL ILLUSTRATION for this topic — NOT a figure of X", with hard
 * limits against reading anything off them. That was a stricter rule than the
 * same pass applied elsewhere: it had explicitly declined to retire a bare
 * coordinate plane bound to phys.therm.carnot-cycle, on exactly the grounds
 * that the contract already makes it inert. 13 of the 21 were reversed.
 *
 * The rule that survives, and that this file pins:
 *
 *   INERT   — thin, or on-topic but unspecific. The contract governs the
 *             tutor's words and the picture teaches nothing either way.
 *             DEMOTE (scope 'domain'), keep rendering.
 *
 *   HARMFUL — depicts the very position the concept exists to REFUTE. Wording
 *             cannot fix this: the learner's eyes take the claim off the image
 *             however carefully it is introduced, and what gets reinforced is
 *             the concept's own documented misconception. RETIRE.
 *
 * ── WHY SUPPRESSION AND NOT SUBSTITUTION, FOR THE HARMFUL SET ───────────────
 * No figure is a successful outcome; a wrong figure is not. Each retirement
 * leaves the binding intact in CONCEPT_VISUALS / DOMAIN_VISUALS so a faithful
 * figure can replace it later without rediscovering that one was wanted.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual, restoreVisualSession } from '@/lib/teaching/visual/resolveVisual'
import { RETIRED_VISUAL_BINDINGS, isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { isInsufficientForConcept } from '@/lib/teaching/visual/scope'
import { buildVisualContractBlock } from '@/lib/teaching/visual/visualContract'
import { getKnowledgeGraph, getAllNodes } from '@/lib/curriculum/knowledgeGraph'

const turn = (conceptId: string, message: string, subject: string) =>
  resolveVisual({ message, lessonConceptId: conceptId, subject } as never)

/** Does the tutor contract claim this figure IS a figure of the concept? */
const claimsToBeTheConcept = (conceptId: string, subject: string) => {
  const d = turn(conceptId, 'show me a diagram of this', subject)
  if (!d.graphical) return false
  return !buildVisualContractBlock(d).includes('GENERAL ILLUSTRATION')
}

/**
 * HARMFUL — retired. Each string is the position the figure depicts and the
 * concept refutes; it is the claim a reviewer can check without re-running the
 * audit.
 */
const REFUTED_BY_ITS_OWN_FIGURE: ReadonlyArray<readonly [string, string, string]> = [
  ['chemistry', 'chem.bond.polar-molecules',
    'the card is labelled "shared pair" — EQUAL sharing, which is a non-polar bond'],
  ['chemistry', 'chem.bond.intermolecular',
    'an intramolecular bond, for forces the concept must teach are NOT bonds'],
  ['chemistry', 'chem.bond.resonance',
    'one localised structure, which is the picture resonance says is insufficient'],
  ['chemistry', 'chem.bond.coordinate-bond',
    '"shared pair" is the ordinary covalent case the concept is defined against'],
  ['chemistry', 'chem.bond.mo-theory',
    'a localised pair is the valence-bond picture MO theory exists to replace'],
  ['chemistry', 'chem.atomic.orbitals',
    'circular shell RINGS assert "an orbital is an orbit" — the concept\'s own documented misconception'],
  ['chemistry', 'chem.atomic.quantum-mech-model',
    'sharp shells at definite radii state the position the model refutes'],
  ['chemistry', 'chem.solid.defects',
    'a PERFECT lattice, for a concept defined entirely by departures from perfection'],
]

const SEMANTIC_DEFECTS = REFUTED_BY_ITS_OWN_FIGURE

describe('every semantic defect found in the sweep stays suppressed', () => {
  it.each(SEMANTIC_DEFECTS)('%s / %s — %s', (subject, conceptId) => {
    expect(isRetiredVisualBinding(conceptId)).toBe(true)
    // The evidence must be present and specific, so a future reader can
    // re-check the call rather than trusting the label.
    expect(RETIRED_VISUAL_BINDINGS[conceptId].length).toBeGreaterThan(60)
    expect(turn(conceptId, 'Can you explain this?', subject).graphical).toBe(false)
  })

  /**
   * THE FOUR ENTRY PATHS. Retirement is checked before every tier, so all four
   * must agree — an explicit request is the one most likely to be treated as
   * an override, and a restored session is the one that bypasses the live
   * decision entirely.
   */
  it.each(SEMANTIC_DEFECTS)('%s / %s stays suppressed on every entry path', (subject, conceptId) => {
    // 1. fresh turn, no request
    expect(turn(conceptId, 'Tell me about this topic.', subject).graphical).toBe(false)
    // 2. explicit request for a diagram
    for (const ask of ['Give me a diagram', 'show me a diagram of this', 'Can you draw this?', 'show me a picture']) {
      const d = turn(conceptId, ask, subject)
      expect(d.graphical, `${conceptId} answered "${ask}" with a figure`).toBe(false)
      expect(d.asset).toBeNull()
    }
    // 3. a follow-up turn, which is where a held figure would persist
    expect(turn(conceptId, 'why?', subject).graphical).toBe(false)
    // 4. refresh / history restoration — a hand-edited or stale snapshot
    //    naming the retired concept must not re-mount the figure.
    expect(restoreVisualSession({
      conceptId, representation: 'labelled_figure', renderer: 'card',
      returnToConceptId: null, turns: 1,
    })).toBeNull()
  })
})

/**
 * THE INERT SET — demoted, not retired.
 *
 * These are the 13 the first pass over-called, plus the ones it correctly left
 * alone. Every one still renders and every one is introduced as a GENERAL
 * ILLUSTRATION, so no claim is made on it. Retiring them would delete a
 * harmless picture and teach nothing — and it would contradict a measured,
 * recorded decision in scope.ts: withholding these on an explicit request was
 * tried and rejected because it blanked excursions.
 */
const INERT_BUT_RENDERING: ReadonlyArray<readonly [string, string, string]> = [
  // reversed from the first pass — already demoted before it touched them
  ['physics', 'phys.opt.refraction',        'a lens image construction; a lens works BY refraction, so on-topic'],
  ['physics', 'phys.wave.shm-energy',       'a pendulum IS a simple-harmonic system; it simply prints no energy'],
  ['physics', 'phys.mech.gravitational-field', 'an orbit; gravitation, without the field lines'],
  ['physics', 'phys.mech.kinematics-2d',    '1-D kinematics graphs; kinematics, one dimension short'],
  ['chemistry', 'chem.bond.hybridization',  'a bond, for a concept about how bonding orbitals are built'],
  ['chemistry', 'chem.atomic.electromagnetic-radiation', 'an atom; thin, but it asserts nothing about waves'],
  ['chemistry', 'chem.atomic.atomic-spectra', 'an atom; the rings do not claim spectra are continuous'],
  ['chemistry', 'chem.atomic.photoelectric-effect', 'an atom; no surface or photon, but nothing contradicted'],
  ['chemistry', 'chem.period.classification', 'electron shells; later physics than the classification taught'],
  ['chemistry', 'chem.solid.properties',    'a lattice; solids do have lattices, it simply carries no band structure'],
  // moved from a claim to a demotion (were on the STRONG contract)
  ['physics', 'phys.mech.displacement',     'a bare -5..5 number line; no start, no end, no path'],
  ['physics', 'phys.mech.tension',          'a force diagram with no string, rope or tension arrow'],
  ['physics', 'phys.em.emf',                'the bulb circuit; V = E - Ir needs r drawn inside the cell'],
  // correctly left alone by the first pass
  ['physics', 'phys.therm.carnot-cycle',    'an empty x-y plane; the case that set the standard'],
  ['physics', 'phys.mech.acceleration',     'the same number line as displacement, already demoted'],
  ['physics', 'phys.mech.work',             'an empty x-y plane where an F-d area is required'],
]

describe('the inert set is demoted, not suppressed', () => {
  it.each(INERT_BUT_RENDERING)('%s / %s still renders — %s', (subject, conceptId) => {
    expect(isRetiredVisualBinding(conceptId), `${conceptId} was retired`).toBe(false)
    expect(turn(conceptId, 'show me a diagram of this', subject).graphical, conceptId).toBe(true)
  })

  it.each(INERT_BUT_RENDERING)('%s / %s makes no claim on the concept', (subject, conceptId) => {
    // The whole basis for keeping them. If any of these ever starts claiming
    // to BE a figure of its concept, the reason it was safe has gone.
    expect(claimsToBeTheConcept(conceptId, subject), `${conceptId} now claims to be the concept`).toBe(false)
  })

  it('the three moved off the strong contract are demoted at the source', () => {
    // Recorded in INSUFFICIENT_FOR_CONCEPT rather than fixed at the call site,
    // so the demotion holds for every entry path at once.
    for (const id of ['phys.mech.displacement', 'phys.mech.tension', 'phys.em.emf']) {
      expect(isInsufficientForConcept(id), id).toBe(true)
    }
  })

  it('phys.em.emf is demoted while its seven siblings stay retired', () => {
    // All eight sit on the same "battery, switch, bulb, resistor" card. Seven
    // require a component the card does not contain AND cannot be read as the
    // concept at all; emf is about the battery the card does draw, just
    // without internal resistance. Thin, not wrong — the same verdict
    // phys.em.resistivity already carries.
    for (const id of [
      'phys.em.wheatstone-bridge', 'phys.em.potentiometer', 'phys.em.rc-circuits',
      'phys.em.self-inductance', 'phys.em.mutual-inductance', 'phys.em.ac-basics',
      'phys.em.lc-circuits',
    ]) {
      expect(isRetiredVisualBinding(id), id).toBe(true)
    }
    expect(isRetiredVisualBinding('phys.em.emf')).toBe(false)
    expect(isInsufficientForConcept('phys.em.emf')).toBe(true)
    expect(isInsufficientForConcept('phys.em.resistivity')).toBe(true)
  })

  it('every generator-tier binding is faithful and untouched', () => {
    // The clean tier: 12 of 12 hand-authored concept-specific scenes. Named
    // individually so a change that quietly widens or retires one fails here.
    for (const id of [
      'phys.meas.vector-products', 'phys.mech.collisions-inelastic', 'phys.mech.satellites',
      'phys.mech.surface-tension', 'phys.mech.viscosity', 'phys.therm.calorimetry',
      'phys.therm.first-law', 'phys.wave.transverse-waves', 'phys.wave.interference',
      'phys.opt.mirrors', 'phys.opt.total-internal-reflection', 'phys.em.kirchhoffs-laws',
    ]) {
      const d = turn(id, 'show me a diagram of this', 'physics')
      expect(d.graphical, id).toBe(true)
      expect(d.asset?.provenance, id).toBe('generator')
      expect(d.asset?.conceptId, id).toBe(id)
      expect(claimsToBeTheConcept(id, 'physics'), id).toBe(true)
    }
  })
})

/**
 * ROUND 4 — WHAT IS INSIDE THE FIGURES THAT LEGITIMATELY CLAIM THEIR CONCEPT.
 *
 * Rounds 1-3 asked which figure is attached. This one reads the CONTENT of the
 * ~50 that carry the STRONG contract: for scenes every narration line, label
 * and computed quantity; for cards the contract's own "WHAT THE LEARNER SEES"
 * description, which is what the tutor is actually told the picture contains.
 *
 * The authored scenes came out numerically correct — every printed quantity
 * was re-derived by hand and matched: R = 5 at 53.1° for A=3, B=4 at right
 * angles; dot 6 and cross 10.39 for |A|=3, |B|=4 at 60°; range 40.82 m and
 * peak 10.2 m for 20 m/s at 45°; v1f = -0.33 and v2f = 4.67 for the elastic
 * pair; 12 V over 30 Ω giving 0.4 A in series and over 6.67 Ω giving 1.8 A in
 * parallel; v = 3074 m/s and T = 86181 s at geostationary radius. Those are
 * asserted below as a sample, so a change to a generator that breaks the
 * arithmetic fails here rather than reaching a learner.
 *
 * The defects were on the CARD side, where the description is a fixed string
 * per visual type and the same card serves several concepts.
 */
describe('round 4 — figure content, not figure choice', () => {
  const sceneTextOf = (conceptId: string, subject = 'physics') => {
    const d = turn(conceptId, 'show me a diagram of this', subject)
    const spec = (d.asset?.payload as { sceneSpec?: Record<string, unknown> } | undefined)?.sceneSpec
    expect(spec, `${conceptId} has no scene`).toBeDefined()
    return JSON.stringify(spec)
  }

  it('the authored scenes print quantities that are actually correct', () => {
    // Re-derived independently; each pair is (concept, a value the physics
    // requires). A generator regression that silently changes a number cannot
    // be caught by any structural check — only by knowing the answer.
    const cases: Array<[string, string[]]> = [
      ['phys.meas.vector-addition',    ['5', '53.1']],            // 3,4 at 90° -> 5 at 53.13°
      ['phys.meas.vector-products',    ['6', '10.39', '60']],     // 3·4·cos60=6, 3·4·sin60=10.392
      ['phys.mech.projectile-motion',  ['40.82', '10.2']],        // 20 m/s at 45°: R=v²/g, H=v²/4g
      ['phys.mech.circular-motion',    ['8']],                    // v²/r = 16/2
      ['phys.mech.collisions-elastic', ['-0.33', '4.67']],        // m1=2,u1=3; m2=1,u2=-2
      ['phys.mech.collisions-inelastic', ['1.33']],               // (6-2)/3
      ['phys.mech.torque',             ['20']],                   // 2·10·sin90
      ['phys.mech.satellites',         ['3074', '86181']],        // √(GM/r), 2πr/v at r=42164 km
      ['phys.em.kirchhoffs-laws',      ['6.67', '1.8']],          // 10∥20, 12/6.67
    ]
    for (const [conceptId, values] of cases) {
      const text = sceneTextOf(conceptId)
      for (const v of values) expect(text, `${conceptId} lost ${v}`).toContain(v)
    }
  })

  it('the mirror and the lens disagree in sign, which is the correct behaviour', () => {
    // Same u and f, same magnification, opposite image distance: the Cartesian
    // convention puts a real mirror image at v = -15 (same side as the object)
    // and a real lens image at v = +15 (the far side). A generator that made
    // them agree would have dropped the convention.
    expect(sceneTextOf('phys.opt.mirrors')).toContain('-15cm')
    expect(sceneTextOf('phys.opt.lenses')).toContain('15cm')
    expect(sceneTextOf('phys.opt.lenses')).not.toContain('-15cm')
    for (const id of ['phys.opt.mirrors', 'phys.opt.lenses']) {
      expect(sceneTextOf(id), id).toContain('-0.5')
    }
  })

  it('friction is served a figure that contains friction', () => {
    // THE REPAIR. NewtonForces3D draws exactly two labelled vectors, Fg and N;
    // there is no friction anywhere in it, and phys.mech.friction was bound to
    // it as PRIMARY while ForceDiagram — which draws a labelled Friction arrow
    // — sat second in the same row. Only the order was wrong.
    const d = turn('phys.mech.friction', 'show me a diagram of this', 'physics')
    expect(d.graphical).toBe(true)
    expect((d.asset?.payload as { visualType?: string } | undefined)?.visualType).toBe('force_diagram')
    // And it keeps the strong contract, because now it has earned it.
    expect(claimsToBeTheConcept('phys.mech.friction', 'physics')).toBe(true)
  })

  it('two quantum concepts stopped claiming a card that lacks their subject', () => {
    // The wave_function card is ψ(x) and |ψ(x)|² on static axes: correct for
    // phys.qm.wave-function, and silent about time for the TIME-DEPENDENT
    // Schrödinger equation. The energy_level_diagram draws transitions but not
    // which are allowed, which is what selection rules are.
    expect(isInsufficientForConcept('phys.qm.schrodinger-equation')).toBe(true)
    expect(isInsufficientForConcept('phys.qm.selection-rules')).toBe(true)
    expect(claimsToBeTheConcept('phys.qm.schrodinger-equation', 'physics')).toBe(false)
    expect(claimsToBeTheConcept('phys.qm.selection-rules', 'physics')).toBe(false)
    // Their siblings on the same two cards are correct and keep the claim.
    expect(claimsToBeTheConcept('phys.qm.wave-function', 'physics')).toBe(true)
    expect(claimsToBeTheConcept('phys.mod.atomic-spectra', 'physics')).toBe(true)
    expect(claimsToBeTheConcept('phys.mod.bohr-model', 'physics')).toBe(true)
  })
})

/**
 * ROUND 5 — THE FRICTION PATTERN, HUNTED ACROSS THE REGISTRY.
 *
 * Round 4's repair was a row whose `all` list already named a better-fitting
 * visual than its `primary`. This round swept every physics and chemistry
 * binding carrying more than one visual, looking for the same shape.
 *
 * It found a STRUCTURAL version of it. `chem.bond.hybridization` and
 * `chem.bond.bond-parameters` had NO exact row at all, so they inherited the
 * chem.bond DOMAIN rule and were served its primary — BondFormation3D, whose
 * entire content is two spheres, "shared pair" and "Stable molecule AB". The
 * domain rule's own `all` names `three_molecular_shapes` second, and that card
 * draws a tetrahedral molecule with "109.5° tetrahedral angles" labelled.
 *
 * A domain rule cannot select per concept, so the better visual was listed and
 * unreachable — the friction defect, with the ordering error one tier up.
 * Hybridization IS the geometry of the hybrid orbital set, and a bond ANGLE is
 * one of the three bond parameters, so both are strictly better served there.
 *
 * The subtlety: adding an exact row PROMOTES a concept from 'domain-default'
 * to concept scope, which would hand it the strong contract. The card shows
 * only the sp3 case and shows neither bond length nor enthalpy, so both were
 * added to INSUFFICIENT_FOR_CONCEPT at the same time. Net effect: the picture
 * improves, the claim does not move. That pairing is what these tests pin.
 */
describe('round 5 — better visual reachable, claim unchanged', () => {
  const visualOf = (conceptId: string) => {
    const d = turn(conceptId, 'show me a diagram of this', 'chemistry')
    expect(d.graphical, conceptId).toBe(true)
    return (d.asset?.payload as { visualType?: string } | undefined)?.visualType
  }

  it.each(['chem.bond.hybridization', 'chem.bond.bond-parameters'])(
    '%s is served the shapes card, not the generic A-B bond', (conceptId) => {
      expect(visualOf(conceptId)).toBe('three_molecular_shapes')
    })

  it.each(['chem.bond.hybridization', 'chem.bond.bond-parameters'])(
    '%s gained a better picture WITHOUT gaining a claim', (conceptId) => {
      // The whole point of pairing the rebind with a scope entry. If a future
      // change drops the scope entry, the concept silently starts asserting
      // that a tetrahedral CH4 IS a figure of hybridization in general.
      expect(isInsufficientForConcept(conceptId), conceptId).toBe(true)
      expect(claimsToBeTheConcept(conceptId, 'chemistry'), conceptId).toBe(false)
    })

  it('the concepts the bond-formation card genuinely fits keep it', () => {
    // Two spheres sharing a pair IS covalent bonding. It is not hybridization
    // and not bond parameters, which is the whole finding.
    expect(visualOf('chem.bond.covalent-bonding')).toBe('three_bond_formation')
    expect(claimsToBeTheConcept('chem.bond.covalent-bonding', 'chemistry')).toBe(true)
  })

  it('VSEPR still outranks both with its own authored scene', () => {
    // chem.bond.vsepr owns a molecule GENERATOR (water, bent, 104.5°), which
    // sits above every card tier. Rebinding two of its neighbours onto the
    // shapes card must not disturb it.
    const d = turn('chem.bond.vsepr', 'show me a diagram of this', 'chemistry')
    expect((d.asset?.payload as { renderer?: string } | undefined)?.renderer).toBe('scene')
    expect(claimsToBeTheConcept('chem.bond.vsepr', 'chemistry')).toBe(true)
  })
})

/**
 * THE OVER-SUPPRESSION CONTROL.
 *
 * Suppression is cheap to apply and expensive to notice: retiring one concept
 * too many silently removes a correct figure, and no learner-visible error
 * follows. These are the members of the SAME shared scenes and domain rules
 * that were inspected and KEPT, with the reason. If a future sweep widens a
 * rule and takes these with it, this fails.
 */
const MUST_STILL_RENDER: ReadonlyArray<readonly [string, string, string]> = [
  ['physics', 'phys.opt.lenses',            'the shared ray_optics scene IS the thin-lens case, u/f/v/m all printed'],
  ['physics', 'phys.wave.pendulum',         'the shared pendulum scene IS a simple pendulum with its period'],
  ['physics', 'phys.mech.torque',           'the torque diagram prints r, F, theta and the resulting moment'],
  ['physics', 'phys.mech.collisions-elastic', 'the collision scene IS a 1-D elastic collision with both final velocities'],
  ['physics', 'phys.meas.vector-addition',  'the vector scene IS a resultant construction, |R| and angle printed'],
  ['physics', 'phys.em.dc-circuits',        'the series half of "Series and Parallel Circuits", drawn correctly and labelled honestly — incomplete, not false'],
  ['chemistry', 'chem.atomic.bohr-model',   'quantised circular orbits round a nucleus is exactly this card'],
  ['chemistry', 'chem.bond.vsepr',          'the molecule scene prints water, bent, 104.5 degrees'],
  ['chemistry', 'chem.solid.crystal-systems', 'the lattice scene names FCC and its 4 atoms per cell'],
]

describe('the correct figures were not suppressed with them', () => {
  it.each(MUST_STILL_RENDER)('%s / %s still renders — %s', (subject, conceptId) => {
    expect(isRetiredVisualBinding(conceptId)).toBe(false)
    const d = turn(conceptId, 'show me a diagram of this', subject)
    expect(d.graphical, `${conceptId} lost its figure`).toBe(true)
    expect(d.asset?.conceptId).toBe(conceptId)
  })
})

/**
 * THE STANDING INVARIANT.
 *
 * The register is consulted before every tier, so nothing downstream — a
 * curated row, a domain prefix rule, a scene generator, an approved asset —
 * may reintroduce a retired concept. Asserted over the WHOLE register rather
 * than the nineteen, so a later addition inherits the guarantee for free.
 */
describe('no retired binding can be reached through any tier', () => {
  it('every retired concept resolves to no figure, whatever is asked', () => {
    const asked: string[] = []
    for (const conceptId of Object.keys(RETIRED_VISUAL_BINDINGS)) {
      for (const message of ['', 'explain this', 'give me a diagram', 'draw it']) {
        const d = resolveVisual({ message, lessonConceptId: conceptId, subject: null } as never)
        if (d.graphical) asked.push(`${conceptId} <- "${message}"`)
      }
    }
    expect(asked).toEqual([])
  })

  it('the register only names concepts that really exist in a canonical KG', () => {
    // A typo'd id suppresses nothing and reads as coverage. Checked against
    // the live graphs rather than a copy.
    const known = new Set<string>()
    for (const subject of ['physics', 'chemistry', 'biology', 'computer_science', 'mathematics', 'english']) {
      const graph = getKnowledgeGraph(subject)
      if (graph) for (const node of getAllNodes(graph)) known.add(node.id)
    }
    const unknown = Object.keys(RETIRED_VISUAL_BINDINGS).filter((id) => !known.has(id))
    expect(unknown).toEqual([])
  })
})

/**
 * THE RATCHET ON WIDENED IDENTITY.
 *
 * Not every widened binding is wrong, so this is not zero and is not meant to
 * be. It is a ceiling: a new domain rule or a new generator KIND may not
 * silently take on more concepts than the sweep inspected. Raising it requires
 * inspecting the additions the same way — which is the point.
 */
describe('widened-identity bindings do not grow unaudited', () => {
  const widened = (subject: string) => {
    const graph = getKnowledgeGraph(subject)
    if (!graph) return []
    return getAllNodes(graph)
      .map((node) => resolveVisual({ message: 'explain this', lessonConceptId: node.id, subject } as never))
      .filter((d) => d.graphical && (d.asset?.provenance === 'domain-default' || d.asset?.provenance === 'generator-default'))
  }

  it('physics: 23 widened bindings, all inspected', () => {
    // 23 generator-default and 0 domain-default. None was retired in the end
    // — all four physics retirements were reversed as inert. Every one was
    // read against what it paints, and every one is demoted or faithful.
    expect(widened('physics').length).toBeLessThanOrEqual(23)
  })

  it('chemistry: 20 widened bindings, all inspected', () => {
    // 23 domain-default and 5 generator-default before the sweep; eight
    // retired as harmful, six reversed as inert.
    expect(widened('chemistry').length).toBeLessThanOrEqual(20)
  })
})
