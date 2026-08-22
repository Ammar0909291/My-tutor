/**
 * Visual scope — what an asset is entitled to CLAIM (M3-B stage B4).
 *
 * M2 answered "whose asset is this?" and stopped concept A being served concept
 * B's figure. It did not answer the softer question the M3-A audit exposed: an
 * asset can belong to the right concept and still not depict it. 372 of the 467
 * remaining figures are a single card shared across an entire KG domain — one
 * bare coordinate plane for all 76 calculus concepts, one triangle-and-circle
 * card for all 67 geometry concepts. Those figures are real, on-topic and
 * sometimes useful, but they do not show the concept, and the tutor contract was
 * introducing every one of them as "a figure of <concept>".
 *
 * That sentence was the last remaining false claim in the pipeline. Scope
 * removes it without removing the picture:
 *
 *   'concept'  the figure depicts THIS concept. The tutor may teach from it and
 *              name its parts: "this diagram shows …".
 *   'domain'   the figure is a general illustration related to the topic but not
 *              specific to this concept. It still renders — a learner looking at
 *              a coordinate plane while learning about limits is not harmed — but
 *              the tutor must introduce it as what it is and must not claim it
 *              demonstrates the concept.
 *
 * Scope is decided from the M3-A audit, never from words. No lexical match, no
 * prefix match and no title similarity can promote an asset to concept scope.
 */

import type { AssetProvenance } from './asset'

export type VisualScope = 'concept' | 'domain'

/**
 * Assets that belong to their concept but do not depict it.
 *
 * Every entry is an M3-A "C — generic/insufficient" verdict on an asset whose
 * identity is otherwise declared: the figure is real and on-topic, and it is
 * missing the thing that defines the concept. Twelve of them are the same
 * cases stage B2 recorded as requiring authoring; the rest are curated cards
 * whose content is thinner than the concept they were bound to.
 *
 * These are NOT retirements. The figure keeps rendering — it is only barred
 * from being introduced as a figure OF the concept.
 */
export const INSUFFICIENT_FOR_CONCEPT: ReadonlySet<string> = new Set([
  // ── generator figures missing the concept's defining element ─────────────
  'phys.opt.refraction',             // lens image construction; no boundary, normal or angles i/r
  'phys.meas.scalars-vectors',       // vector addition; no scalar quantity is drawn
  'phys.mech.kinematics-2d',         // 1D graphs for a 2D concept
  'phys.mech.impulse',               // before/after velocities; no force-time or labelled Δp
  'phys.mech.rotational-dynamics',   // torque diagram; no moment of inertia, no angular acceleration
  'phys.mech.universal-gravitation', // an orbit; never the inverse-square force between two masses
  'phys.mech.gravitational-field',   // an orbit; the concept is field LINES
  'phys.wave.shm-energy',            // pendulum geometry; no KE/PE split
  'phys.em.electric-current',        // lumped circuit; no drift velocity or charge carriers
  'chem.period.modern-periodic-law', // two elements compared; not the table or the law
  'bio.mol.dna-replication',         // static Watson-Crick pairing; no replication fork

  // ── curated cards thinner than the concept they were bound to ────────────
  // phys.meas.vector-products was HERE ("one vector; dot/cross need two and
  // their product") and has been removed: it now resolves to an authored
  // dot/cross figure via CONCEPT_SCENES, which outranks the card, so the
  // verdict no longer describes what the concept renders. This is the
  // intended exit from this set — repair the figure, then drop the entry.
  'phys.mech.velocity',              // static number line cannot show a rate
  'phys.mech.acceleration',          // static number line cannot show a rate of a rate
  'phys.mech.relative-motion',       // one number line; the concept needs two frames
  'phys.mech.newtons-third-law',     // forces on ONE body; the third law needs a pair on two
  'phys.mech.inclined-plane',        // force diagram with no incline drawn
  'phys.mech.work',                  // empty x-y plane; work is the area under an F-d curve
  'phys.mech.conservative-forces',   // static forces cannot show path-independence
  'phys.mech.angular-kinematics',    // empty x-y plane; no θ/ω/α curves
  'phys.mech.angular-momentum',      // centripetal-force card; L = r × p is not drawn
  'phys.mech.conservation-of-angular-momentum', // no before/after spin-rate change
  'phys.mech.hookes-law',            // no spring, no extension-vs-force relation
  'phys.therm.ideal-gas-law',        // empty x-y plane where a P-V diagram is required
  'phys.therm.thermodynamic-processes', // empty x-y plane; no labelled P-V paths
  'phys.therm.carnot-cycle',         // empty x-y plane; no closed four-stage cycle
  'phys.em.resistivity',             // bulb circuit; ρ = RA/L needs conductor geometry

  // ── MATHEMATICS: the sweep never reached it (P1 audit) ───────────────────
  // Every entry above came from the physics/chemistry semantic-moat sweep, and
  // this set contained no mathematics id at all — the only moat suite in the
  // repo is visualSemanticMoatPhysicsChemistry. So the identical defect the
  // sweep found and demoted in physics was still standing in mathematics, on
  // the STRONG contract, where the tutor may introduce the figure as "a
  // diagram of <concept>".
  //
  // These two are the same shape as 'phys.mech.work' and
  // 'phys.therm.carnot-cycle' immediately above: coordinate_plane with NO
  // scene generator, i.e. an empty grid, bound to a concept whose whole
  // content is the curve that is not drawn. Demoted, not retired — the same
  // remedy, so mathematics now carries the verdict physics already carries.
  //
  // Deliberately NOT demoted, and worth stating so the omission reads as a
  // decision: 'math.arith.number-line' and 'math.arith.decimals' are also bare
  // number lines, and for them the canvas IS the concept — a number line is a
  // faithful figure of the number line. They keep concept scope.
  'math.alg.quadratic-equation',     // empty x-y plane; no parabola is drawn
  'math.alg.polynomial',             // empty x-y plane; no polynomial curve is drawn

  // ── added by the visual semantic moat sweep ──────────────────────────────
  // Three concept-level rows that were carrying the STRONG contract ("a
  // <representation> of <concept> is attached") while pointing at a generic
  // card. They are thin, not wrong, so they are demoted here rather than
  // retired — the same verdict phys.em.resistivity and phys.mech.inclined-plane
  // already carry for the same reason. The demotion is what stops the false
  // claim; the picture still renders.
  'phys.mech.displacement',          // bare -5..5 number line; no start, no end, no path
  'phys.mech.tension',               // force diagram with no string, rope or tension arrow
  'phys.em.emf',                     // bulb circuit; V = E - I*r needs r drawn inside the cell
  // Found by asserting the condition rather than assuming it: B2's own
  // "requires authoring" list already recorded this one as needing a lens
  // COMBINATION, but it was never demoted, so it kept claiming to BE a figure
  // of the concept while showing the shared single-lens instance.
  'phys.opt.lens-power',             // one lens; P = P1 + P2 needs a combination
  // Round 4 read the contract's own "WHAT THE LEARNER SEES" text for every
  // card-backed figure carrying the STRONG contract, and compared it with the
  // concept's claim. Two named a thing the card's own description does not
  // contain.
  'phys.qm.schrodinger-equation',    // a static ψ(x); the TIME-DEPENDENT equation shows no time and no equation
  'phys.qm.selection-rules',         // transitions are drawn, but not which are allowed, and no probabilities
  // Round 5 rebound these two from the chem.bond domain default onto the
  // molecular-shapes card, which is strictly more relevant (it labels
  // 109.5° tetrahedral angles rather than showing an abstract A-B pair).
  // Adding an exact registry row would otherwise PROMOTE them from
  // 'domain-default' to concept scope and hand them a claim the card cannot
  // support, so they are recorded here to keep the contract exactly as
  // honest as it was. The picture improves; the claim does not.
  'chem.bond.hybridization',         // only the sp3 case is drawn; sp and sp2 are not
  'chem.bond.bond-parameters',       // the angle is labelled; bond length and enthalpy are not

  // ── Round 6: the generator-default blind spot ────────────────────────────
  // Found by driving a real production lesson, then asking why a figure that
  // is NOT concept-owned was still claiming concept scope.
  //
  // `asset.ts`'s IDENTITY_STRENGTH declares BOTH shared-figure provenances
  // 'derived' — the concept's identity is widened from the kind rather than
  // declared:
  //     'domain-default':    'derived'
  //     'generator-default': 'derived'
  // but `scopeForAsset` below demotes only the first. So a concept that names
  // a generator KIND without authoring its own parameters is served that
  // kind's ONE shared canonical scene and told to introduce it as a figure of
  // itself. 20 concepts are in that position.
  //
  // They are NOT demoted as a class, because for nine of them the shared
  // instance genuinely IS the concept — an elastic-collision scene for
  // `collisions-elastic`, a thin-lens ray diagram for `lenses`, a projectile
  // at 45° for `projectile-motion`. Demoting those would lose real teaching
  // value for no gain, which is the mistake rounds 1-2 of this sweep already
  // made once by over-retiring.
  //
  // The seven below were judged individually, scene title against the KG's own
  // description, and each shows ONE INSTANCE of something the concept defines
  // more broadly. The remaining generator-default concepts are pinned by
  // `visualGeneratorDefaultScope.test.ts` so a new one cannot appear silently.
  'phys.mech.momentum',              // an elastic COLLISION; p = mv is never drawn
  'phys.wave.shm',                   // a pendulum — one (small-angle) instance; F = -kx is not shown
  'phys.em.ohms-law',                // a series network with R_total; V = IR is not the figure
  'phys.em.dc-circuits',             // series only; the concept is series AND parallel
  'chem.atomic.electronic-config',   // one Na shell diagram; no Aufbau, Hund, Pauli or Cr/Cu anomaly
  'chem.period.periodic-properties', // Na vs Cl only; no diagonal relationships, no Li/Be anomalies
  'chem.solid.crystal-systems',      // one FCC unit cell; the concept is SEVEN systems + Bravais lattices
  // Deliberately NOT added, and recorded so the judgement is auditable:
  // chem.bond.vsepr renders water bent at 104.5°, which genuinely shows the
  // lone-pair effect the concept is built on. It is one of the three molecules
  // the KG names, not a figure of something else.
])

/**
 * Decide an asset's scope.
 *
 * Two rules, in order, and neither consults any text:
 *
 *  1. A DOMAIN-PREFIX binding is a domain illustration, always. The rule names
 *     a prefix ('math.arith'), so the figure was chosen for a whole domain and
 *     cannot be specific to any one concept in it. There is deliberately no
 *     allowlist promoting individual concepts back out: a domain rule that
 *     happens to suit one of its members is still a domain rule, and giving it
 *     concept scope would reintroduce exactly the guesswork M2 removed.
 *  2. Otherwise the asset is concept-scoped unless the audit recorded it as
 *     insufficient above.
 */
export function scopeForAsset(provenance: AssetProvenance, conceptId: string): VisualScope {
  if (provenance === 'domain-default') return 'domain'
  if (INSUFFICIENT_FOR_CONCEPT.has(conceptId)) return 'domain'
  return 'concept'
}

/**
 * Did the audit find this concept's figure missing the thing that defines it?
 *
 * The membership test, exposed so the authoring backlog can be asserted rather
 * than only described. It is deliberately NOT wired into selection: withholding
 * these figures on an explicit request was measured and rejected — it blanked
 * excursions ("Teach me vectors with diagram" resolved to nothing) and
 * contradicted the recorded decision that these concepts KEEP their generic
 * figure, demoted in wording by `scopeForAsset` above, until a faithful one is
 * authored. See `vectorProductVisualSelection.test.ts`.
 */
export function isInsufficientForConcept(conceptId: string | null | undefined): boolean {
  return Boolean(conceptId) && INSUFFICIENT_FOR_CONCEPT.has(conceptId as string)
}
