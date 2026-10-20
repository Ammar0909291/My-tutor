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
  // chem.bond.ionic-bonding — RESOLVED (2026-10-07, CHEM-095): the bond-formation
  // card animated electron SHARING; the concept now owns an electron-TRANSFER
  // scene (conceptSceneParams.ts CONCEPT_SCENES). Removed from both tables, as
  // the bio.cell rows below were, because the retirement would otherwise make
  // the new Tier 0 scene unreachable.
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
  // REMOVED 2026-10-20: 'chem.bond.mo-theory' ("The card shows a LOCALISED shared pair between two atoms — the valence-bond picture
  // molecular orbital theory exists to replace. MO theory requires a bonding/antibonding energy-level diagram"). It now owns exactly
  // that figure (moDiagram.ts: H₂ with σ below the two 1s levels and σ* above, paired electrons in σ, bond order derived from them),
  // so — as with the physics rows above — the verdict no longer describes what the concept renders. Coverage: moDiagram.test.ts.
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
  'chem.bond.metallic-bonding': ['f4a1f0cb9'], // card:three_bond_formation
  'chem.solid.amorphous': ['ffdc76ff'], // card:three_crystal_lattice
  'chem.bond.polar-molecules': ['f4a1f0cb9'], // card:three_bond_formation
  'chem.bond.intermolecular': ['f4a1f0cb9'], // card:three_bond_formation
  'chem.bond.resonance': ['f4a1f0cb9'], // card:three_bond_formation
  'chem.bond.coordinate-bond': ['f4a1f0cb9'], // card:three_bond_formation
  'chem.atomic.orbitals': ['ff29a2223'], // card:three_atomic_structure
  'chem.atomic.quantum-mech-model': ['ff29a2223'], // card:three_atomic_structure
  'chem.solid.defects': ['ffdc76ff'], // card:three_crystal_lattice
  'cs.found.number-systems': ['fa1791b62'], // card:three_data_structure
  'cs.algo.flowcharts': ['f5c9e4fe6'], // card:three_algorithm_visualization
  'cs.algo.np-completeness': ['f5c9e4fe6'], // card:three_algorithm_visualization
}

// ── RETIRED GENERATED FIGURES (Chemistry visual closure, 2026-10-09) ────────────────────────────────
//
// A different thing from the register above. RETIRED_VISUAL_BINDINGS records that a concept's BINDING (a card, a generator
// default) was judged wrong — the register this repository's semantic-moat doctrine governs, pinned at 14 audited concepts
// (visualRetiredBindings.test.ts). This table records that one specific GENERATED (Tier 3) figure — a cached LLM figure, named by
// its content fingerprint — was read by two independent reviewers against authoritative chemistry and found WRONG. The concept
// itself is not retired: no binding is touched, no broad rule is affected, and a regenerated figure with new content is judged
// afresh (it is simply not in this table). Consulted only through `retiredAssetVerdict`, i.e. for asset serving on every tier.
//
// Fingerprints are `figureFingerprint(asset.payload)` of the validated, typeset, repaired payload, exactly as `resolveVisual` takes them
// (verdictCache.ts); `chemistryClosureGates.test.ts` rebuilds each from the committed production snapshot
// (docs/qa/chemistry-visual-audit/tier23-snapshot) and fails if any stops matching.
export interface RetiredGeneratedFigure { fingerprint: string; reason: string }
export const RETIRED_GENERATED_FIGURES: Readonly<Record<string, readonly RetiredGeneratedFigure[]>> = {
  'chem.found.matter': [{ fingerprint: 'fd4ab73b9', reason: 'compound and mixture drawn identically (two half-overlapping spheres each): the bonded / not-bonded distinction the figure exists to show is not in the picture' }],
  'chem.atomic.quantum-mech-model': [{ fingerprint: 'f2f1d8837', reason: 'psi(x) = sin(x) on a "Position (m)" axis over -10 m..+10 m: an unbounded wave of constant amplitude on a metre scale, not an atomic wavefunction (~1e-10 m, normalisable)' }],
  'chem.bond.intermolecular': [{ fingerprint: 'f3860c52a', reason: 'three geometrically identical panels (two unlabelled spheres joined by a stick) draw intermolecular attractions as covalent-looking bonds; the hydrogen-bond panel contains no O or H' }],
  'chem.state.molar-mass-gas': [{ fingerprint: 'fa285b2e2', reason: '"calculate molecular mass from empirical formula" is not a procedure: the empirical formula gives only the empirical-formula mass; the molecular mass needs the measured molar mass (M = dRT/P) and n = M / M_empirical' }],
  'chem.equil.titration': [{ fingerprint: 'fda07a237', reason: 'pH = 7 + 3/(1 + exp(-5(x-5))) starts at pH 7.00, has its midpoint at pH 8.5 and plateaus at 10: not an acid-base titration curve (a strong acid starts near pH 1, a weak acid near 3)' }],
  'chem.sblock.water': [{ fingerprint: 'f46177674', reason: 'H-O-H drawn at 120 degrees for both H2O and D2O (real ~104.5 degrees, two lone pairs on O); mixes unrelated content (heavy water, hard-water ions, a floating "Amphoteric" label)' }],
  'chem.pblock.group15': [{ fingerprint: 'f625132ae', reason: 'the Haber loop separates unreacted gases by pressure-swing adsorption; after NH3 is condensed the unreacted N2/H2 (single-pass conversion ~15-20 %) are recycled to the reactor — and the figure is the Haber process, not the nitrogen family' }],
  'chem.dblock.oxo-species': [{ fingerprint: 'f4735963e', reason: '10^(x - 1.7) makes [Cr2O7 2-]/[CrO4 2-] rise with pH; for 2 CrO4 2- + 2 H+ <=> Cr2O7 2- + H2O dichromate dominates in acid, so the ratio must fall with pH' }],
  'chem.org.hybridization': [{ fingerprint: 'f6005d9c3', reason: 'the two pi bonds of sp carbon are drawn collinear (+z and -z: one p orbital); two pi bonds use perpendicular p orbitals (py and pz)' }],
  'chem.org.electronic-effects': [{ fingerprint: 'f1d2cf5f1', reason: 'the "-I" arrow points away from the electron-withdrawing group (the inductive arrow points toward it), so as drawn it shows +I; the "M" arrow runs along a sigma bond with no pi system' }],
  'chem.hyd.alkynes': [{ fingerprint: 'fab861c0a', reason: '"Acidic Character: Protonation of the Triple Bond" is false: terminal-alkyne acidity (pKa ~25) is deprotonation of the sp C-H to an acetylide' }],
  'chem.hyd.arenes': [{ fingerprint: 'f21199c8c', reason: '"NO2+ from HNO3 & AlCl3" names the wrong reagent: nitronium comes from HNO3 with concentrated H2SO4; AlCl3 is the Friedel-Crafts / halogenation Lewis acid' }],
  'chem.carb.ketones': [{ fingerprint: 'f7cb46efb', reason: 'the "ketone" and "enol" are bare sticks with no C=O, C=C, O-H or R groups, and keto-enol tautomerism (an equilibrium) is drawn as a single one-way arrow' }],
  'chem.nitro.amines': [{ fingerprint: 'f1af5182e', reason: '"basicity primary < secondary < tertiary" is the gas-phase order; in water the conjugate-acid pKa values give secondary > primary ~ tertiary (MeNH2 10.66, Me2NH 10.73, Me3N 9.8)' }],
  'chem.bio.proteins': [{ fingerprint: 'f4a228c14', reason: 'a disulfide bridge is narrated as secondary structure (it is tertiary); haemoglobin is a single sphere with "two subunits" (an alpha2-beta2 tetramer); the helix is a straight line' }],
  'chem.hyd.polycyclic': [{ fingerprint: 'f183f0236', reason: 'a ring labelled "furan" with no oxygen drawn (a distorted five-vertex ring) and no fused / polycyclic system: neither thing in the concept title is shown' }],
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
  // One specific generated figure found wrong by review — refused by content on every tier, with the concept itself untouched.
  // Only for the real table: a caller passing its own table is asking a question about THAT table.
  if (table === RETIRED_ASSET_FINGERPRINTS && (RETIRED_GENERATED_FIGURES[conceptId] ?? []).some((r) => r.fingerprint === asset.fingerprint)) {
    return 'retired-asset'
  }
  if (!isRetiredVisualBinding(conceptId) && !Object.prototype.hasOwnProperty.call(table, conceptId)) {
    return 'not-retired'
  }
  if ((table[conceptId] ?? []).includes(asset.fingerprint)) return 'retired-asset'
  if (BROAD_PROVENANCE.has(asset.provenance)) return 'broad-rule'
  return 'replacement'
}
