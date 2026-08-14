/**
 * THE VISUAL SEMANTIC MOAT — PHYSICS AND CHEMISTRY SWEEP.
 *
 * ── WHAT THIS MEASURES THAT NOTHING ELSE DID ────────────────────────────────
 * The existing visual tests assert that the resolver returns a figure, that a
 * figure's identity matches the concept it claims, that layout is safe, and
 * that generated figures pass the critic. None of them asks the only question
 * that matters to a learner: does the figure teach what the tutor is claiming?
 *
 * A figure can be structurally perfect and semantically false. The resolver's
 * own provenance field is where that becomes findable, because it records how
 * a figure's identity was ESTABLISHED:
 *
 *   curated            a human wrote a row for THIS concept
 *   generator          the concept owns its scene parameters
 *   generator-default  the concept named only a generator KIND, and is served
 *                      that kind's SHARED canonical scene
 *   domain-default     a domain prefix rule matched; the binding names
 *                      'chem.bond', not the concept
 *
 * The last two WIDEN a figure's identity instead of declaring it, which is
 * exactly where "right subject, wrong thing" lives. Running the real resolver
 * over all 238 physics and all 186 chemistry concepts found 51 such bindings;
 * reading what each actually paints found 18 that depict a different thing.
 *
 * A nineteenth, phys.em.dc-circuits, was proposed and REJECTED: its figure is
 * labelled "Series circuit" for a concept named "Series and Parallel
 * Circuits", which is incomplete but not false, and the bar in this file is
 * "depicts a DIFFERENT thing". It is pinned in the keep-list below.
 *
 * Every one is pinned below BY ITS EVIDENCE, not by a count — a revert fails
 * here naming the specific concept.
 *
 * ── WHY SUPPRESSION AND NOT SUBSTITUTION ────────────────────────────────────
 * No figure is a successful outcome; a wrong figure is not. Each retirement
 * leaves the binding intact in CONCEPT_VISUALS / DOMAIN_VISUALS so a faithful
 * figure can replace it later without rediscovering that one was wanted.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual, restoreVisualSession } from '@/lib/teaching/visual/resolveVisual'
import { RETIRED_VISUAL_BINDINGS, isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { getKnowledgeGraph, getAllNodes } from '@/lib/curriculum/knowledgeGraph'

const turn = (conceptId: string, message: string, subject: string) =>
  resolveVisual({ message, lessonConceptId: conceptId, subject } as never)

/**
 * The eighteen found by this sweep, each with the single fact that condemns
 * it. The string is not decoration: it is the claim a reviewer can check
 * against the figure without re-running the audit.
 */
const SEMANTIC_DEFECTS: ReadonlyArray<readonly [string, string, string]> = [
  // physics — a shared canonical scene served to a member it does not depict
  ['physics', 'phys.opt.refraction',
    'served a convex-lens image-formation diagram; Snell\'s law needs an interface, a normal and two angles'],
  ['physics', 'phys.wave.shm-energy',
    'served a pendulum whose only quantity is the period; the concept is the KE/PE exchange'],
  ['physics', 'phys.mech.gravitational-field',
    'served an orbiting satellite; the title names field lines, which are not in the figure'],
  ['physics', 'phys.mech.kinematics-2d',
    'served the ONE-dimensional kinematics plot'],

  // chemistry — the chem.bond domain rule, one covalent-bond card for seven concepts
  ['chemistry', 'chem.bond.hybridization',      'no orbital and no geometry in a two-sphere card'],
  ['chemistry', 'chem.bond.mo-theory',          'a localised shared pair is the picture MO theory replaces'],
  ['chemistry', 'chem.bond.polar-molecules',    'the card\'s label is "shared pair" — equal sharing, i.e. non-polar'],
  ['chemistry', 'chem.bond.intermolecular',     'an intramolecular bond, for forces that are explicitly not bonds'],
  ['chemistry', 'chem.bond.resonance',          'one structure, where resonance needs at least two'],
  ['chemistry', 'chem.bond.coordinate-bond',    '"shared pair" is the ordinary covalent contrast case'],

  // chemistry — the chem.atomic domain rule, one shell diagram for six concepts
  ['chemistry', 'chem.atomic.electromagnetic-radiation', 'an atom, for a concept about waves and the spectrum'],
  ['chemistry', 'chem.atomic.atomic-spectra',   'continuous rings, where the discreteness is the observation'],
  ['chemistry', 'chem.atomic.orbitals',         'shell RINGS for a concept about orbital SHAPES'],
  ['chemistry', 'chem.atomic.photoelectric-effect', 'an isolated atom; no surface, photon, or threshold'],
  ['chemistry', 'chem.atomic.quantum-mech-model', 'sharp shells state the position the concept refutes'],

  // chemistry — the chem.period and chem.solid domain rules
  ['chemistry', 'chem.period.classification',   'electron shells, historically posterior to the classification taught'],
  ['chemistry', 'chem.solid.defects',           'a PERFECT lattice, for a concept defined by departures from it'],
  ['chemistry', 'chem.solid.properties',        'a static neutral lattice carries no band structure and no spins'],
]

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

  it('physics: 19 widened bindings, all inspected', () => {
    // 23 generator-default and 0 domain-default before the sweep; four
    // retired. Every survivor was read against what it paints and is
    // generic-but-not-wrong, not unexamined.
    expect(widened('physics').length).toBeLessThanOrEqual(19)
  })

  it('chemistry: 14 widened bindings, all inspected', () => {
    // 23 domain-default and 5 generator-default before the sweep; fourteen
    // retired.
    expect(widened('chemistry').length).toBeLessThanOrEqual(14)
  })
})
