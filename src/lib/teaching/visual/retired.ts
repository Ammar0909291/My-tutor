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

  // ══ VISUAL SEMANTIC MOAT, ROUND 2 (physics + chemistry sweep) ═══════════
  //
  // The M3-A audit inspected concepts that had an EXACT curated row. This
  // round ran the real resolver over all 238 physics and all 186 chemistry
  // concepts and looked at what provenance each figure actually carried:
  //
  //     curated            42   a human wrote a row for THIS concept
  //     generator          12   the concept owns its scene parameters
  //     generator-default  28   the concept names only a generator KIND and
  //                             is served that kind's SHARED canonical scene
  //     domain-default     23   a domain prefix rule matched; the binding
  //                             names 'chem.bond', not the concept
  //
  // The last two tiers are where a figure's identity is WIDENED rather than
  // declared, so they are exactly where a figure can be of the right subject
  // and the wrong thing. Every one of the 51 was inspected against what it
  // actually paints — for scenes, the emitted objects and labels; for cards,
  // the component's own rendered labels. The entries below are the ones that
  // depict a DIFFERENT thing, on the same high bar as the rest of this file:
  // a tutor teaching the concept against the figure would be saying something
  // false. Generic-but-not-wrong figures were deliberately left in place and
  // are listed in the audit ledger instead.

  // ── physics: shared canonical scenes serving the wrong member ───────────
  'phys.opt.refraction':
    'The ray_optics generator\'s shared instance is a CONVEX LENS image-formation ' +
    'diagram (u=30cm, f=10cm -> v=15cm). "Refraction and Snell\'s Law" requires an ' +
    'interface between two media, an incident ray, a normal, and the two angles ' +
    'related by n1 sin(theta1) = n2 sin(theta2). The payload contains no interface, ' +
    'no normal, no angle and no refractive index — the same evidence that retired ' +
    'phys.opt.reflection above.',
  'phys.wave.shm-energy':
    'The pendulum generator\'s shared instance prints exactly one quantity: the PERIOD, ' +
    'T = 2*pi*sqrt(L/g) ~ 2.01 s. "Energy in Simple Harmonic Motion" is about the ' +
    'KE/PE exchange (E = kA^2/2, KE = k(A^2 - x^2)/2). No energy of any kind appears ' +
    'in the figure.',
  // phys.em.dc-circuits was proposed for retirement in this round and is
  // deliberately NOT retired, recorded here so the call is not re-litigated:
  // its figure asserts "Series circuit — R_total = 30 ohm" for a concept named
  // "Series and Parallel Circuits", which is INCOMPLETE but not false — the
  // series half is drawn correctly and labelled honestly. The bar in this file
  // is "depicts a DIFFERENT thing", and half of a concept, correctly named, is
  // not that. Closing it properly needs a combined series-parallel topology,
  // which the electric_circuit generator cannot express (its Connection type
  // is 'series' | 'parallel', one or the other), so the fix is authoring, not
  // suppression. Tracked in the audit ledger.
  'phys.mech.gravitational-field':
    'The gravitation_orbit generator\'s shared instance is an orbiting satellite ' +
    'labelled with orbital speed and period. "Gravitational Field and Field Lines" ' +
    'requires the radial field lines the title names and the field strength ' +
    'g = GM/r^2; the figure contains neither, and an orbit is a trajectory, not a field.',
  'phys.mech.kinematics-2d':
    'Served the kinematics_graphs shared instance, which is the ONE-dimensional case ' +
    '(u=0 m/s, a=2 m/s^2, single axis). Two-dimensional kinematics is defined by the ' +
    'independence of the x and y components, which a 1-D plot cannot show — the figure ' +
    'is literally the concept the learner is being moved on from.',

  // ── chemistry: the chem.bond domain rule ───────────────────────────────
  // Seven concepts inherited BondFormation3D, whose complete content is two
  // spheres A and B, one label "shared pair", and one label "Stable molecule
  // AB" — a single, symmetric, localised covalent bond forming.
  // (chem.bond.ionic-bonding and chem.bond.metallic-bonding were already
  // retired above for the same card; chem.bond.bond-parameters is left in
  // place as generic-but-not-wrong, since it IS a bond.)
  'chem.bond.hybridization':
    'The card shows two spheres and a shared pair. Hybridization is the mixing of s and ' +
    'p orbitals into sp/sp2/sp3 sets with 180/120/109.5 degree geometry; no orbital and ' +
    'no geometry appears.',
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
  'chem.atomic.electromagnetic-radiation':
    'Rendered an atom. Electromagnetic radiation is a wave characterised by wavelength, ' +
    'frequency and c = f*lambda, plus the spectrum ordering; the figure contains no wave ' +
    'and no spectrum.',
  'chem.atomic.atomic-spectra':
    'Rendered an atom with continuous shell rings. An atomic spectrum is a set of DISCRETE ' +
    'lines at particular wavelengths — the discreteness is the whole observation, and it ' +
    'is absent.',
  'chem.atomic.orbitals':
    'Rendered circular SHELL RINGS for a concept about orbital SHAPES (spherical s, ' +
    'dumbbell p, four-lobed d). "An orbital is an orbit" is the single most documented ' +
    'misconception in this area, and this figure asserts it.',
  'chem.atomic.photoelectric-effect':
    'Rendered an isolated atom. The photoelectric effect requires incident photons, a ' +
    'metal SURFACE, ejected electrons and a threshold frequency; none of the four is in ' +
    'the figure.',
  'chem.atomic.quantum-mech-model':
    'Rendered sharp circular shells — definite paths at definite radii. The quantum ' +
    'mechanical model replaces exactly that with probability densities and orbital ' +
    'clouds, so the figure states the position the concept refutes.',

  // ── chemistry: the chem.period and chem.solid domain rules ─────────────
  'chem.period.classification':
    'Rendered labelled electron shells. "Early Classification of Elements" is about ' +
    'Doebereiner\'s triads, Newlands\' octaves and Mendeleev\'s table — arrangements of ' +
    'elements, historically prior to any knowledge of electron shells.',
  'chem.solid.defects':
    'Rendered a PERFECT FCC lattice. A crystal defect is by definition a vacancy, an ' +
    'interstitial or a substitution — a departure from that perfection. The figure shows ' +
    'the absence of the thing being taught.',
  'chem.solid.properties':
    'Rendered a static lattice of neutral spheres. "Electrical and Magnetic Properties" ' +
    'requires band structure or magnetic domain alignment; neither is representable in ' +
    'the card, which carries no electrons and no spins.',

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
