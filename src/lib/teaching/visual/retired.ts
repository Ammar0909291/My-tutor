/**
 * Retired visual bindings — assets that depict something other than the concept
 * they were attached to (M3-B stage B1).
 *
 * The M3-A audit inspected what every graphical concept would ACTUALLY paint —
 * for scenes, every object and label; for cards, the card's own declared
 * content — and compared it against what the concept requires. 29 bindings were
 * found to render a different situation entirely. Each is listed here with the
 * specific evidence.
 *
 * This is a SUPPRESSION register, not a deletion. Nothing is removed from
 * CONCEPT_VISUALS, DOMAIN_VISUALS or CONCEPT_SCENES: those tables stay intact
 * so the binding remains visible, reviewable and reversible, and so a later
 * milestone can replace an entry with a faithful figure rather than having to
 * rediscover that one was ever wanted. The register is consulted BEFORE any
 * tier in buildDecision(), so a retired concept cannot be picked up by a
 * curated row, a domain-prefix rule, a scene generator, or anything else — it
 * yields NO FIGURE, which M1 already established as a successful outcome.
 *
 * The bar for entry is deliberately high: not "generic", not "thin", not
 * "could be better" — the asset must depict a DIFFERENT thing, such that a
 * tutor teaching the concept against it would be saying something false.
 * Generic-but-not-wrong illustrations are out of scope here and are handled as
 * domain illustrations in stage B4.
 */

/** conceptId -> why its binding was retired. Evidence, not a label. */
export const RETIRED_VISUAL_BINDINGS: Readonly<Record<string, string>> = {
  // ── physics: mechanics ──────────────────────────────────────────────────
  'phys.mech.rolling-motion':
    'Rendered the circular-motion card (an orbiting body on a closed path). Rolling ' +
    'without slipping is defined by a contact point and v = ωr; an orbit shows neither.',
  'phys.mech.keplers-laws':
    'The gravitation generator draws a CIRCULAR orbit of fixed radius. Kepler\'s first ' +
    'law states orbits are ellipses with the star at a focus, so the figure contradicts ' +
    'the law it was attached to.',

  // ── physics: optics ─────────────────────────────────────────────────────
  'phys.opt.reflection':
    'Rendered a concave-mirror IMAGE-FORMATION diagram, byte-identical to the one for ' +
    'phys.opt.mirrors. "Reflection and Laws of Reflection" requires an incident ray, a ' +
    'normal and equal angles; the payload contains none of the three.',

  // ── physics: electricity ────────────────────────────────────────────────
  // All seven rendered the same "battery, wires, switch, bulb" card, which does
  // not contain the component that defines the concept.
  'phys.em.wheatstone-bridge':
    'Requires a four-resistor bridge with a galvanometer; the card is a single-loop bulb circuit.',
  'phys.em.potentiometer':
    'Requires a slide wire with a tapping key; neither is in the card.',
  'phys.em.rc-circuits':
    'Requires a capacitor and a charging/discharging curve; the card has neither.',
  'phys.em.self-inductance':
    'Requires an inductor; the card contains no inductive element.',
  'phys.em.mutual-inductance':
    'Requires two magnetically coupled coils (a transformer); the card is a bulb circuit.',
  'phys.em.ac-basics':
    'Peak and RMS values require an AC source and a sinusoid; the card is a DC loop.',
  'phys.em.lc-circuits':
    'LC oscillation requires an inductor and a capacitor; the card contains neither.',

  // ── chemistry ───────────────────────────────────────────────────────────
  'chem.found.states-of-matter':
    'Rendered a crystal lattice, which depicts the solid state only and actively ' +
    'misrepresents liquids and gases — the contrast the concept exists to teach.',
  'chem.bond.ionic-bonding':
    'The bond-formation card animates electron SHARING between two atoms. Ionic bonding ' +
    'is electron TRANSFER producing oppositely charged ions.',
  'chem.bond.metallic-bonding':
    'The same card animates a discrete two-atom bond. Metallic bonding is a delocalised ' +
    'electron sea over a lattice of cations.',
  'chem.solid.amorphous':
    'Rendered a perfect FCC lattice. Amorphous solids are defined by the ABSENCE of ' +
    'long-range order, so the figure asserts the opposite of the concept.',

  // ── biology: the bio.cell domain rule ───────────────────────────────────
  // Every concept under bio.cell inherited the FOOD CHAIN card — ecosystem-level
  // energy flow — for subcellular topics. (bio.cell.mitosis and bio.cell.meiosis
  // are NOT retired: both have their own faithful cell-division scenes.)
  'bio.cell.cell-theory':             'Rendered a food chain (ecosystem energy flow) for a subcellular concept.',
  'bio.cell.prokaryotic-cell':        'Rendered a food chain; no cell structure is depicted.',
  'bio.cell.eukaryotic-cell':         'Rendered a food chain; no cell structure is depicted.',
  'bio.cell.cell-membrane-transport': 'Rendered a food chain; no membrane or transport mechanism is depicted.',
  'bio.cell.nucleus-chromosomes':     'Rendered a food chain; no nucleus or chromosome is depicted.',
  'bio.cell.mitochondria-energy':     'Rendered a food chain. Cellular respiration and ecosystem energy flow are different scales entirely.',
  'bio.cell.chloroplast-structure':   'Rendered a food chain; no chloroplast structure is depicted.',
  'bio.cell.endomembrane-system':     'Rendered a food chain; no organelle system is depicted.',
  'bio.cell.cytoskeleton':            'Rendered a food chain; no cytoskeletal filament is depicted.',
  'bio.cell.cell-cycle':              'Rendered a food chain; the cycle phases are not depicted.',
  'bio.cell.cell-signalling':         'Rendered a food chain; no receptor or signalling cascade is depicted.',
  'bio.cell.apoptosis':               'Rendered a food chain; programmed cell death is not depicted.',

  // ══ VISUAL SEMANTIC MOAT SWEEP (physics + chemistry) ════════════════════
  //
  // The M3-A audit inspected concepts holding an EXACT curated row. This sweep
  // ran the real resolver over all 238 physics and all 186 chemistry concepts
  // and read what each figure ACTUALLY paints — for scenes the emitted objects
  // and labels, for cards the component's own rendered labels.
  //
  // ── THE LINE, AND A CORRECTION TO HOW IT WAS FIRST DRAWN ────────────────
  // The sweep's first pass retired 21 bindings. Cross-checking them against
  // `scope.ts` showed that EVERY ONE was already demoted: 4 sat in
  // INSUFFICIENT_FOR_CONCEPT and the rest resolved through a domain-prefix
  // rule, so `scopeForAsset` had already given them scope 'domain' and
  // `visualContract` was already introducing them as "a GENERAL ILLUSTRATION
  // for this topic — NOT a figure of X", with hard limits against reading
  // anything off them. Retiring those was applying a stricter rule than the
  // same pass applied elsewhere (it explicitly declined to retire a bare
  // coordinate plane bound to phys.therm.carnot-cycle, on the grounds that the
  // contract already makes it inert). 13 of the 21 were reversed.
  //
  // The rule that survives, stated so it is not re-derived differently again:
  //
  //   A demoted general illustration is INERT when it is merely thin, or
  //   on-topic but unspecific. The contract governs the tutor's words and the
  //   picture teaches nothing either way.
  //
  //   It is HARMFUL, and belongs HERE, when it depicts the very position the
  //   concept exists to REFUTE. Wording cannot fix that one: the learner's
  //   eyes take the claim off the image no matter how carefully the tutor
  //   introduces it, and the concept's own documented misconception is what
  //   is being reinforced.
  //
  // Everything below meets the second test. The reversed 13 are recorded in
  // the audit ledger with the same evidence, demoted rather than suppressed:
  // 3 of them (phys.mech.displacement, phys.mech.tension, phys.em.emf) were
  // on the STRONG contract and were moved into INSUFFICIENT_FOR_CONCEPT, so
  // they are now demoted rather than claimed — the same treatment the M3-A
  // audit gave phys.em.resistivity and phys.mech.inclined-plane, which are
  // thin in exactly the same way.
  //
  // phys.em.dc-circuits was also proposed and rejected: its figure asserts
  // "Series circuit — R_total = 30 ohm" for a concept named "Series and
  // Parallel Circuits", which is INCOMPLETE but not false, and the
  // electric_circuit generator's Connection type is 'series' | 'parallel',
  // one or the other, so a combined network is authoring work.

  // ── chemistry: the chem.bond domain rule ───────────────────────────────
  // Seven concepts inherited BondFormation3D, whose complete content is two
  // spheres A and B, one label "shared pair", and one label "Stable molecule
  // AB" — a single, symmetric, localised covalent bond forming.
  // (chem.bond.ionic-bonding and chem.bond.metallic-bonding were already
  // retired above for the same card; chem.bond.bond-parameters is left in
  // place as generic-but-not-wrong, since it IS a bond.)
  'chem.bond.mo-theory':
    'The card shows a LOCALISED shared pair between two atoms — which is the valence-bond ' +
    'picture molecular orbital theory exists to replace. MO theory requires a bonding/' +
    'antibonding energy-level diagram and delocalised orbitals over the whole molecule.',
  'chem.bond.polar-molecules':
    'The card\'s own label is "shared pair" — EQUAL sharing between two symmetric atoms, ' +
    'i.e. a non-polar bond. Polarity is UNEQUAL sharing and needs partial charges and a ' +
    'dipole arrow. The figure depicts the negative case of the concept.',
  'chem.bond.intermolecular':
    'The card animates an INTRAmolecular covalent bond forming. Intermolecular forces act ' +
    'BETWEEN separate molecules and are explicitly not bonds — serving this figure ' +
    'reinforces the exact misconception the concept has to dismantle.',
  'chem.bond.resonance':
    'Resonance requires at least two contributing structures joined by a double-headed ' +
    'arrow. The card shows one structure with one localised pair, which is the picture ' +
    'resonance says is insufficient.',
  'chem.bond.coordinate-bond':
    'A coordinate bond is defined by BOTH electrons coming from ONE atom. The card is ' +
    'labelled "shared pair" between A and B — the ordinary covalent case, which is ' +
    'precisely the contrast the concept is taught against.',

  // ── chemistry: the chem.atomic domain rule ─────────────────────────────
  // Six concepts inherited AtomicStructure3D — a nucleus with circular shell
  // rings, captioned "Completed atom". (chem.atomic.bohr-model is NOT retired:
  // quantised circular orbits around a nucleus is exactly what that card is,
  // and it is the one member the shared figure genuinely serves.
  // chem.atomic.quantum-numbers is left in place as generic-but-not-wrong,
  // since the shells do depict the principal quantum number n.)
  'chem.atomic.orbitals':
    'Rendered circular SHELL RINGS for a concept about orbital SHAPES (spherical s, ' +
    'dumbbell p, four-lobed d). "An orbital is an orbit" is the single most documented ' +
    'misconception in this area, and this figure asserts it.',
  'chem.atomic.quantum-mech-model':
    'Rendered sharp circular shells — definite paths at definite radii. The quantum ' +
    'mechanical model replaces exactly that with probability densities and orbital ' +
    'clouds, so the figure states the position the concept refutes.',

  // ── chemistry: the chem.period and chem.solid domain rules ─────────────
  'chem.solid.defects':
    'Rendered a PERFECT FCC lattice. A crystal defect is by definition a vacancy, an ' +
    'interstitial or a substitution — a departure from that perfection. The figure shows ' +
    'the absence of the thing being taught.',

  // ── computer science ────────────────────────────────────────────────────
  'cs.found.number-systems':
    'Rendered the 3D data-structures card (arrays, linked lists, stacks, queues). Number ' +
    'systems are binary/octal/hexadecimal representations — an unrelated topic.',
  'cs.algo.flowcharts':
    'Rendered the 3D sorting animation. The concept is the flowchart notation itself, ' +
    'which does not appear in the figure.',
  'cs.algo.np-completeness':
    'Rendered the 3D sorting animation — a polynomial-time procedure — for a concept ' +
    'about intractability.',
}

/**
 * Is this concept's visual binding retired?
 *
 * Consulted before every tier, so retirement cannot be undone by falling
 * through to a broader rule.
 */
export function isRetiredVisualBinding(conceptId: string | null | undefined): boolean {
  if (!conceptId) return false
  return Object.prototype.hasOwnProperty.call(RETIRED_VISUAL_BINDINGS, conceptId)
}

/** The audit evidence for a retired binding, for provenance and logging. */
export function retirementReason(conceptId: string): string | null {
  return RETIRED_VISUAL_BINDINGS[conceptId] ?? null
}
