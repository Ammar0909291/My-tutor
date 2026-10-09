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
 * rediscover that one was ever wanted. buildDecision() judges every tier's
 * asset against this register, so a retired concept cannot be picked up by a
 * curated row, a domain-prefix rule, a scene generator, or anything else — it
 * yields NO FIGURE, which M1 already established as a successful outcome —
 * until a genuinely new, concept-authored figure exists, which is then served
 * with no edit here (see "THE LIFECYCLE" below).
 *
 * WHAT RETIREMENT MEANS (settled 2026-09-24): an ARTIFACT is retired, not the
 * concept. Every tier refuses a retired artifact — the synchronous tiers here
 * and in buildDecision(), the APPROVED and GENERATED tiers in
 * resolveVisualForTurn's serve() — and the broad rules (domain-prefix cards,
 * shared generator defaults) are refused for a retired concept outright. A
 * figure OF the concept with content the retirement never saw — an authored
 * replacement, a human-approved figure, or a generated figure that passed
 * structural validation and the critic — may serve. Evidence this was always
 * the meaning: the register was applied only inside buildDecision() (the
 * synchronous tiers), the async tiers ran on its no-figure result from the
 * start, and the recorded remedy for a retired concept was "a human-reviewed
 * promoted VISUAL asset or generation enablement" (docs/history/
 * qa-and-mastery-fixes.md). No row here is ever removed because a
 * replacement exists: the row is the evidence.
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
  // REMOVED 2026-09-30: 'phys.mech.rolling-motion' ("Rendered the circular-motion
  // card … Rolling without slipping is defined by a contact point and v = ωr")
  // and 'phys.mech.keplers-laws' ("The gravitation generator draws a CIRCULAR
  // orbit …"). Both now own faithful figures — contact point at rest with
  // 2v / v / 0, and an e = 0.5 ellipse with equal-area sectors from Kepler's
  // equation (physicsCoreScenesB7.ts). Coverage: physicsCoreScenesBatch7.test.ts.

  // ── physics: optics ─────────────────────────────────────────────────────
  // REMOVED 2026-09-30: 'phys.opt.reflection' ("Rendered a concave-mirror
  // IMAGE-FORMATION diagram … requires an incident ray, a normal and equal
  // angles; the payload contains none of the three"). It now owns exactly that
  // figure (physicsCoreScenes.ts buildReflectionScene), so — as with the 18
  // bio.cell rows removed 2026-09-24 — the verdict no longer describes what the
  // concept renders. Coverage: physicsCoreScenesBatch1.test.ts.

  // ── physics: electricity ────────────────────────────────────────────────
  // REMOVED 2026-09-30, all seven that rendered the "battery, wires, switch,
  // bulb" card: rc-circuits and ac-basics (batch 4), then wheatstone-bridge
  // ("Requires a four-resistor bridge with a galvanometer"), potentiometer
  // ("Requires a slide wire with a tapping key"), self-inductance ("Requires an
  // inductor"), mutual-inductance ("Requires two magnetically coupled coils")
  // and lc-circuits ("LC oscillation requires an inductor and a capacitor").
  // Each now owns a figure of exactly what its verdict said was missing
  // (physicsCoreScenesB9.ts). Coverage: physicsCoreScenesBatch9.test.ts.
  // No physics concept remains in this register.

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

  // ── biology: the bio.cell domain rule — RESOLVED (2026-09-24) ────────────
  // The 18 bio.cell concepts formerly listed here (the original 12, plus 6
  // more found by the 2026-09-24 Biology visual coverage inventory) all
  // inherited the FOOD CHAIN card — ecosystem-level energy flow — for
  // subcellular topics. Per this file's own documented lifecycle ("a later
  // milestone can replace an entry with a faithful figure rather than having
  // to rediscover that one was ever wanted"), each of the 18 now has its own
  // concept-specific Tier 0 scene (src/lib/teaching/visual/conceptSceneParams.ts
  // CONCEPT_SCENES — buildCellStructureScene / buildCellPathwayScene /
  // buildCellHubScene / buildCellComparisonScene, plus buildTimelineScene for
  // the one historical concept), so the entries were removed rather than left
  // as unreachable dead suppressions: Tier 0 is checked BEFORE Tier 1's
  // domain-default lookup in buildDecision(), so food_chain is now
  // structurally unreachable for all 18 regardless of whether an entry exists
  // here — verified by resolveVisual() itself before this removal (leaving the
  // retirement in place made the new Tier 0 scene provably unreachable,
  // producing 'no-figure:retired-binding' instead of the new figure). The
  // mechanism itself — RETIRED_VISUAL_BINDINGS, isRetiredVisualBinding(),
  // retirementReason(), and its priority over every tier — is unchanged;
  // only the 18 data rows whose underlying defect is now fixed were removed.
  // bio.cell.mitosis and bio.cell.meiosis were never listed here at all, for
  // the identical reason: they already had faithful Tier 0 scenes. Full
  // per-concept design rationale lives as the doc-comment directly above the
  // eighteen new CONCEPT_SCENES entries in conceptSceneParams.ts, and in
  // this commit's own message.

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

  // ── chemistry: domain-default cards judged unfaithful by the 2026-10-09 closure review (R4) ───────────
  // Twelve concepts were served a domain-default card. Each was judged on whether the card depicts the CONCEPT; these six do not.
  'chem.atomic.electromagnetic-radiation':
    'Rendered the nucleus-and-shells atom card (domain default of chem.atomic). Electromagnetic radiation is waves and photons — wavelength, frequency, the spectrum — none of which an atom model contains.',
  'chem.atomic.photoelectric-effect':
    'Rendered the nucleus-and-shells atom card (domain default of chem.atomic). The photoelectric effect is light of a threshold frequency ejecting electrons from a metal surface; the figure shows neither light nor a surface.',
  'chem.period.classification':
    'Rendered the electron-shell card (domain default of chem.period). Early classification (Döbereiner triads, Newlands\' octaves, Mendeleev\'s table) was by atomic mass and properties and PREDATES the electron; a shell diagram is the later explanation, not the concept.',
  'chem.period.electron-affinity':
    'Rendered the electron-shell card (domain default of chem.period). Electron affinity and electronegativity are energies / attractions for an extra or shared electron; the figure carries no energy, no attraction and no second atom.',
  'chem.solid.ionic-solids':
    'Rendered a single-colour simple-cubic lattice (domain default of chem.solid). An ionic crystal (NaCl, CsCl) is TWO ion types in a specific arrangement and coordination; a one-colour monatomic simple cubic lattice states the opposite.',
  'chem.solid.properties':
    'Rendered a simple-cubic lattice (domain default of chem.solid). Electrical and magnetic properties of solids (conductors, semiconductors, para-/ferromagnetism) are about bands and electron spins, not lattice geometry.',

  // ── chemistry: Tier-3 generated figures retired by the 2026-10-09 closure review ──────────────
  // These concepts had NO curated binding; a generated figure was cached in production and would have been served.
  // Each was read by two independent reviewers against authoritative chemistry; the content fingerprint is recorded in
  // RETIRED_ASSET_FINGERPRINTS, so a regenerated figure with new content is a replacement and is judged afresh.
  'chem.found.matter':
    'Tier-3 generated scene (retired 2026-10-09). The compound pair and the mixture pair are drawn with identical geometry (two radius-0.5 spheres 0.5 apart), so the \'chemically bonded\' versus \'not bonded\' distinction the figure exists to show is not in the picture.',
  'chem.state.molar-mass-gas':
    'Tier-3 generated process flow (retired 2026-10-09). \'Calculate molecular mass from empirical formula\' is not a procedure: an empirical formula gives only the empirical-formula mass; the molecular mass needs the measured molar mass (M = dRT/P) and n = M / M_empirical.',
  'chem.equil.titration':
    'Tier-3 generated graph (retired 2026-10-09). pH = 7 + 3 / (1 + exp(-5(x-5))) starts at pH 7.00, has its midpoint at pH 8.5 and plateaus at 10: not an acid-base titration curve (strong acid starts near pH 1, weak acid near 3, equivalence pH set by the salt formed).',
  'chem.sblock.water':
    'Tier-3 generated scene (retired 2026-10-09). H-O-H is drawn at 120.0 degrees for both H2O and D2O (real ~104.5 degrees, two lone pairs on O); the figure also mixes unrelated content (heavy water, hard-water ions, a floating \'Amphoteric\' label).',
  'chem.pblock.group15':
    'Tier-3 generated process flow (retired 2026-10-09). The Haber loop is shown separating unreacted gases by pressure-swing adsorption; after NH3 is condensed the unreacted N2/H2 (single-pass conversion ~15-20 %) are RECYCLED to the reactor. The figure is also the Haber process, not the nitrogen family.',
  'chem.dblock.oxo-species':
    'Tier-3 generated graph (retired 2026-10-09). The equation 10^(x - 1.7) makes [Cr2O7 2-]/[CrO4 2-] RISE with pH; for 2 CrO4 2- + 2 H+ <=> Cr2O7 2- + H2O dichromate dominates in acid and chromate in base, so the ratio must FALL with pH.',
  'chem.org.hybridization':
    'Tier-3 generated scene (retired 2026-10-09). The sp carbon\'s two \'pi\' arrows point to +z and -z (collinear: one p orbital); two pi bonds use perpendicular p orbitals (py and pz).',
  'chem.org.electronic-effects':
    'Tier-3 generated scene (retired 2026-10-09). The \'-I\' arrow runs from the electron-withdrawing group toward the chain; the inductive-effect arrow points TOWARD the withdrawing group, so as drawn it shows +I. The \'M\' arrow is a straight arrow along a sigma bond with no pi system.',
  'chem.hyd.alkynes':
    'Tier-3 generated process flow (retired 2026-10-09). \'Acidic Character: Protonation of the Triple Bond\' is false: the acidity of a terminal alkyne (pKa ~25) is DEPROTONATION of the sp C-H to an acetylide; protonating the triple bond is electrophilic addition.',
  'chem.hyd.arenes':
    'Tier-3 generated process flow (retired 2026-10-09). \'NO2+ from HNO3 & AlCl3\' names the wrong reagent: the nitronium ion comes from HNO3 with concentrated H2SO4; AlCl3 is the Lewis acid of Friedel-Crafts alkylation/acylation and halogenation.',
  'chem.carb.ketones':
    'Tier-3 generated scene (retired 2026-10-09). The \'ketone\' is one bare stick and the \'enol\' an L of two sticks: no C=O, C=C, O-H or R groups, and keto-enol tautomerism (an equilibrium) is drawn as a single one-way arrow.',
  'chem.nitro.amines':
    'Tier-3 generated scene (retired 2026-10-09). \'Basicity primary < secondary < tertiary\' holds only in the gas phase; in water the conjugate-acid pKa values give secondary > primary ~ tertiary (MeNH2 10.66, Me2NH 10.73, Me3N 9.8).',
  'chem.bio.proteins':
    'Tier-3 generated scene (retired 2026-10-09). A disulfide bridge is narrated as secondary structure (it is tertiary); haemoglobin is shown as a single sphere with \'two subunits\' (it is an alpha2-beta2 tetramer); the helix is a straight line and the disulfide lies exactly on the chain.',
  'chem.hyd.polycyclic':
    'Tier-3 generated scene (retired 2026-10-09). A ring labelled \'Furan\' has no oxygen drawn (a distorted five-vertex ring) and no fused/polycyclic system appears, so the figure shows neither of the two things in the concept title.',

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
 * A retired concept refuses its retired assets and every broad rule; only a
 * concept-authored replacement can serve (retiredAssetVerdict).
 */
export function isRetiredVisualBinding(conceptId: string | null | undefined): boolean {
  if (!conceptId) return false
  return Object.prototype.hasOwnProperty.call(RETIRED_VISUAL_BINDINGS, conceptId)
}

/** The audit evidence for a retired binding, for provenance and logging. */
export function retirementReason(conceptId: string): string | null {
  return RETIRED_VISUAL_BINDINGS[conceptId] ?? null
}

// ── THE LIFECYCLE: RETIRE THE ASSET, NOT THE CONCEPT ───────────────────────
//
// THE DEFECT THIS CLOSES. Retirement used to be keyed by concept alone and
// checked before every tier, so it could not tell "the figure we found wrong"
// from "the correct figure authored afterwards". Commit 1f829c0 authored 18
// faithful bio.cell scenes and they were dead code until someone remembered to
// delete the 18 matching rows above by hand (verified then: resolveVisual still
// returned `no-figure:retired-binding` with the new scene already building).
// Keying on concept alone cannot be fixed by "concept-authored beats
// retirement" either: phys.opt.reflection's RETIRED figure is itself a
// concept-authored scene.
//
// So retirement now names the retired ASSETS, by content fingerprint — every
// asset a tier offered for the concept at the moment it was retired (captured
// from the live resolver, 2026-09-24). A retired concept therefore has three
// states, all derived, none remembered by a developer:
//
//   RETIRED            every asset on offer is a retired one        -> no figure
//   REPLACED           a concept-authored asset with NEW content is
//                      offered (a new CONCEPT_SCENES entry, a re-pointed
//                      curated row)                                  -> served
//   (never)            a broad rule — a domain-prefix card or a shared
//                      generator kind's default instance — for a
//                      retired concept                               -> refused
//
// The bad figure cannot come back under any id (its content is what is
// recorded), a broad rule cannot re-pick the concept, and a real replacement
// needs no edit here. `visualRetirementLifecycle.test.ts` keeps this table and
// RETIRED_VISUAL_BINDINGS in lock-step and reports which rows are REPLACED.
export const RETIRED_ASSET_FINGERPRINTS: Readonly<Record<string, readonly string[]>> = {
  'chem.found.states-of-matter': ['ffdc76ff'], // card:three_crystal_lattice
  'chem.bond.ionic-bonding': ['f4a1f0cb9'], // card:three_bond_formation
  'chem.bond.metallic-bonding': ['f4a1f0cb9'], // card:three_bond_formation
  'chem.solid.amorphous': ['ffdc76ff'], // card:three_crystal_lattice
  'chem.bond.mo-theory': ['f4a1f0cb9'], // card:three_bond_formation
  'chem.bond.polar-molecules': ['f4a1f0cb9'], // card:three_bond_formation
  'chem.bond.intermolecular': ['f4a1f0cb9', 'f3860c52a'], // card:three_bond_formation + Tier-3 generated: intermolecular forces drawn as identical covalent-looking sticks; the H-bond panel has no O or H
  'chem.bond.resonance': ['f4a1f0cb9'], // card:three_bond_formation
  'chem.bond.coordinate-bond': ['f4a1f0cb9'], // card:three_bond_formation
  'chem.atomic.orbitals': ['ff29a2223'], // card:three_atomic_structure
  'chem.atomic.quantum-mech-model': ['ff29a2223', 'f2f1d8837'], // card:three_atomic_structure + Tier-3 generated graph: psi(x)=sin(x) with a "Position (m)" axis over +/-10 m
  'chem.solid.defects': ['ffdc76ff'], // card:three_crystal_lattice
  'cs.found.number-systems': ['fa1791b62'], // card:three_data_structure
  'cs.algo.flowcharts': ['f5c9e4fe6'], // card:three_algorithm_visualization
  'cs.algo.np-completeness': ['f5c9e4fe6'], // card:three_algorithm_visualization
  'chem.atomic.electromagnetic-radiation': ['ff29a2223'], // domain-default card three_atomic_structure
  'chem.atomic.photoelectric-effect': ['ff29a2223'], // domain-default card three_atomic_structure
  'chem.period.classification': ['f8b26bd2'], // domain-default card three_electron_shells
  'chem.period.electron-affinity': ['f8b26bd2'], // domain-default card three_electron_shells
  'chem.solid.ionic-solids': ['ffdc76ff'], // domain-default card three_crystal_lattice
  'chem.solid.properties': ['ffdc76ff'], // domain-default card three_crystal_lattice
  'chem.found.matter': ['fd4ab73b9'], // Tier-3 generated: compound and mixture drawn identically (two half-overlapping spheres each)
  'chem.state.molar-mass-gas': ['fa285b2e2'], // Tier-3 generated flow: "calculate molecular mass from empirical formula" (needs the measured molar mass)
  'chem.equil.titration': ['fda07a237'], // Tier-3 generated graph: a "titration curve" that starts at pH 7 and ends at pH 10
  'chem.sblock.water': ['f46177674'], // Tier-3 generated: H-O-H drawn at 120 degrees (real 104.5) for H2O and D2O
  'chem.pblock.group15': ['f625132ae'], // Tier-3 generated flow: Haber loop separates unreacted gases by pressure-swing adsorption (they are recycled)
  'chem.dblock.oxo-species': ['f4735963e'], // Tier-3 generated graph: dichromate/chromate ratio rises with pH (it falls)
  'chem.org.hybridization': ['f6005d9c3'], // Tier-3 generated: the two pi bonds of sp carbon drawn collinear (they are perpendicular)
  'chem.org.electronic-effects': ['f1d2cf5f1'], // Tier-3 generated: the -I arrow points away from the electron-withdrawing group
  'chem.hyd.alkynes': ['fab861c0a'], // Tier-3 generated flow: terminal-alkyne acidity as "protonation of the triple bond" (it is deprotonation)
  'chem.hyd.arenes': ['f21199c8c'], // Tier-3 generated flow: NO2+ from HNO3 and AlCl3 (it needs concentrated H2SO4)
  'chem.carb.ketones': ['f7cb46efb'], // Tier-3 generated: the "ketone" and "enol" are bare sticks with no C=O, C=C or OH
  'chem.nitro.amines': ['f1af5182e'], // Tier-3 generated: "basicity primary < secondary < tertiary" (gas-phase order, wrong in water)
  'chem.bio.proteins': ['f4a228c14'], // Tier-3 generated: a disulfide bridge as secondary structure; haemoglobin with two subunits (it is a tetramer)
  'chem.hyd.polycyclic': ['f183f0236'], // Tier-3 generated: a ring labelled "furan" with no oxygen and no polycyclic system
}

/** Assets that are never concept-specific, so never a replacement. */
const BROAD_PROVENANCE: ReadonlySet<string> = new Set(['domain-default', 'generator-default'])

export type RetiredAssetVerdict =
  /** The concept is not retired — nothing to decide. */
  | 'not-retired'
  /** The asset is (content-identical to) one that was retired. */
  | 'retired-asset'
  /** A domain-prefix or shared generator default: never a replacement. */
  | 'broad-rule'
  /** A concept-authored asset with content the retirement never saw. */
  | 'replacement'

/**
 * May this asset be served for this concept, given its retirement record?
 * Pure. `fingerprint` is the asset's payload fingerprint (fingerprint.ts).
 */
export function retiredAssetVerdict(
  conceptId: string,
  asset: { provenance: string; fingerprint: string },
  table: Readonly<Record<string, readonly string[]>> = RETIRED_ASSET_FINGERPRINTS,
): RetiredAssetVerdict {
  if (!isRetiredVisualBinding(conceptId) && !Object.prototype.hasOwnProperty.call(table, conceptId)) {
    return 'not-retired'
  }
  if ((table[conceptId] ?? []).includes(asset.fingerprint)) return 'retired-asset'
  if (BROAD_PROVENANCE.has(asset.provenance)) return 'broad-rule'
  return 'replacement'
}
