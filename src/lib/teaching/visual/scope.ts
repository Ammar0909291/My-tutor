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
