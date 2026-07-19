/**
 * Visualization Registry — concept-ID-keyed visual lookup.
 *
 * Maps canonical KG concept IDs to the VisualType(s) already available
 * in the renderer layer (src/components/school/visuals/). This lets the
 * Teaching Engine know what visuals exist for a concept BEFORE the LLM
 * generates text, replacing the title-keyword heuristic with a
 * deterministic concept-level match.
 *
 * Three tiers, checked in order (most specific wins):
 *   1. CONCEPT_VISUALS  — exact concept ID → visual(s)
 *   2. DOMAIN_VISUALS   — domain prefix (e.g. 'phys.mech') → visual(s)
 *   3. detectVisual()   — fallback to existing title-keyword matcher
 *
 * Pure module: no DB, no I/O. The registry is a static data structure
 * built from the intersection of the canonical KGs and the existing
 * renderer inventory.
 */

import type { VisualType } from '@/lib/school/visuals/visualTypes'
import type { SceneGeneratorKind } from './sceneGenerators/sceneRouter'

export interface VisualEntry {
  /** Primary visual (the one decideVisualFirst should prefer). */
  primary: VisualType
  /** All available visuals for this concept, primary first. */
  all: VisualType[]
  /** Parametric scene generator available (separate pipeline). */
  sceneGenerator?: SceneGeneratorKind
}

// ── Tier 1: exact concept ID → visual(s) ─────────────────────────────────────
// Only concepts with a dedicated renderer (not just a domain-level default).

const CONCEPT_VISUALS: Record<string, VisualEntry> = {
  // Physics — Mechanics
  'phys.mech.projectile-motion':      { primary: 'three_projectile_motion', all: ['three_projectile_motion', 'force_diagram'], sceneGenerator: 'projectile' },
  'phys.mech.circular-motion':        { primary: 'three_circular_motion', all: ['three_circular_motion', 'force_diagram'], sceneGenerator: 'circular' },
  'phys.mech.newtons-first-law':      { primary: 'three_newton_forces', all: ['three_newton_forces', 'force_diagram'] },
  'phys.mech.newtons-second-law':     { primary: 'three_newton_forces', all: ['three_newton_forces', 'force_diagram'] },
  'phys.mech.newtons-third-law':      { primary: 'three_newton_forces', all: ['three_newton_forces', 'force_diagram'] },
  'phys.mech.friction':               { primary: 'three_newton_forces', all: ['three_newton_forces', 'force_diagram'] },
  'phys.mech.momentum':               { primary: 'three_momentum_collision', all: ['three_momentum_collision', 'force_diagram'], sceneGenerator: 'collision' },
  'phys.mech.impulse':                { primary: 'three_momentum_collision', all: ['three_momentum_collision', 'force_diagram'], sceneGenerator: 'collision' },
  'phys.mech.collisions':             { primary: 'three_momentum_collision', all: ['three_momentum_collision'], sceneGenerator: 'collision' },
  'phys.mech.pendulum':               { primary: 'three_pendulum_motion', all: ['three_pendulum_motion'], sceneGenerator: 'pendulum' },
  'phys.mech.simple-harmonic-motion': { primary: 'three_pendulum_motion', all: ['three_pendulum_motion'], sceneGenerator: 'pendulum' },
  'phys.mech.torque':                 { primary: 'force_diagram', all: ['force_diagram'], sceneGenerator: 'torque_diagram' },
  // P2 fix: these two keys did not match any real KG concept ID ('phys.mech.
  // gravitation' vs the KG's 'phys.mech.universal-gravitation'; 'phys.mech.
  // satellite-motion' vs the KG's 'phys.mech.satellites') — the entries were
  // correctly authored (right visual, right scene generator) but silently
  // unreachable. Renamed to the real IDs so this already-existing content
  // finally serves the concepts it was written for.
  'phys.mech.universal-gravitation':  { primary: 'force_diagram', all: ['force_diagram'], sceneGenerator: 'gravitation_orbit' },
  'phys.mech.satellites':             { primary: 'force_diagram', all: ['force_diagram'], sceneGenerator: 'gravitation_orbit' },

  // Physics — Mechanics (P2: eliminate broad domain-default dependence).
  // Audit of every phys.mech concept previously resolved ONLY through the
  // 'phys.mech' → force_diagram domain default (see DOMAIN_VISUALS below,
  // which no longer carries a 'phys.mech' entry at all — every concept that
  // legitimately needs force_diagram now has an explicit entry here, so the
  // over-broad default is removed rather than narrowed). Three outcomes per
  // concept, each cited:
  //   (a) force_diagram genuinely fits (force/equilibrium analysis) — kept.
  //   (b) an existing, different visual type fits better — remapped.
  //   (c) no existing visual fits (pure energy/fluids/advanced Lagrangian-
  //       Hamiltonian formalism) — deliberately left OUT of this map, so
  //       lookupConceptVisual returns null and the caller's existing
  //       fallback chain (detectVisual's keyword match, then honest text)
  //       runs instead of a wrong force_diagram substitution.

  // (a) Force/equilibrium analysis — force_diagram is correct.
  'phys.mech.force':                  { primary: 'force_diagram', all: ['force_diagram'] },
  'phys.mech.free-body-diagram':      { primary: 'force_diagram', all: ['force_diagram'] },
  'phys.mech.tension':                { primary: 'force_diagram', all: ['force_diagram'] },
  'phys.mech.normal-force':           { primary: 'force_diagram', all: ['force_diagram'] },
  'phys.mech.inclined-plane':         { primary: 'force_diagram', all: ['force_diagram'] },
  'phys.mech.equilibrium':            { primary: 'force_diagram', all: ['force_diagram'] },
  'phys.mech.conservative-forces':    { primary: 'force_diagram', all: ['force_diagram'] },
  'phys.mech.hookes-law':             { primary: 'force_diagram', all: ['force_diagram'] },
  // Rotational analog of force/dynamics — reuses the existing torque_diagram
  // scene generator (already authored for phys.mech.torque above).
  'phys.mech.rotational-dynamics':    { primary: 'force_diagram', all: ['force_diagram'], sceneGenerator: 'torque_diagram' },

  // (b) A different existing visual type is the better fit.
  // Work is force-times-displacement — best shown as an F–d graph (area
  // under the curve = work), not a static force diagram.
  'phys.mech.work':                   { primary: 'coordinate_plane', all: ['coordinate_plane'] },
  // Angular kinematics (θ/ω/α vs t) is graph-shaped, exactly parallel to
  // linear kinematics-1d/2d above — same reasoning, same visual type.
  'phys.mech.angular-kinematics':     { primary: 'coordinate_plane', all: ['coordinate_plane'] },
  // Rotational/rolling motion concepts pair naturally with the existing
  // circular-motion 3D visual rather than a static force diagram.
  'phys.mech.angular-momentum':       { primary: 'three_circular_motion', all: ['three_circular_motion'] },
  'phys.mech.conservation-of-angular-momentum': { primary: 'three_circular_motion', all: ['three_circular_motion'] },
  'phys.mech.rolling-motion':         { primary: 'three_circular_motion', all: ['three_circular_motion'] },
  // Momentum/collision concepts pair with the existing momentum-collision
  // visual already used by phys.mech.momentum/impulse above — collisions-
  // elastic/inelastic also correctly inherit the 'collision' scene
  // generator the orphaned 'phys.mech.collisions' key was clearly intended
  // for but could never reach (KG has no 'phys.mech.collisions' concept).
  'phys.mech.conservation-of-momentum': { primary: 'three_momentum_collision', all: ['three_momentum_collision'] },
  'phys.mech.collisions-elastic':     { primary: 'three_momentum_collision', all: ['three_momentum_collision'], sceneGenerator: 'collision' },
  'phys.mech.collisions-inelastic':   { primary: 'three_momentum_collision', all: ['three_momentum_collision'], sceneGenerator: 'collision' },
  // Gravitation/orbital concepts pair with the same gravitation_orbit scene
  // as universal-gravitation/satellites above — one visual family for the
  // whole gravitation sub-area.
  'phys.mech.gravitational-field':    { primary: 'force_diagram', all: ['force_diagram'], sceneGenerator: 'gravitation_orbit' },
  'phys.mech.orbital-mechanics':      { primary: 'force_diagram', all: ['force_diagram'], sceneGenerator: 'gravitation_orbit' },
  'phys.mech.keplers-laws':           { primary: 'force_diagram', all: ['force_diagram'], sceneGenerator: 'gravitation_orbit' },
  // 'phys.mech.escape-velocity' was flagged 🔴 Incorrect Mapping by the new
  // visualCoverageValidator: "Escape Velocity" is fundamentally a kinematics/
  // energy-threshold quantity (a scalar speed), not a force-diagram or
  // orbit-shape concept — the P2 pass's own classification of it as
  // gravitation_orbit was already noted as "marginal" at the time. Removed
  // rather than kept on a stretched justification; falls through to Category
  // C (no visualization, honest fallback), consistent with "an incorrect
  // visualization is worse than showing no visualization."

  // (c) No existing visual type fits — deliberately NOT mapped here:
  //   Pure energy quantities/transformations (no force-diagram or graph
  //   convention already established in this registry): kinetic-energy,
  //   potential-energy, work-energy-theorem, conservation-of-energy, power,
  //   gravitational-potential.
  //   Mass-distribution/point concepts with no clear existing-type fit:
  //   moment-of-inertia, center-of-mass.
  //   Fluid mechanics (no pressure/fluid visual type exists in this
  //   registry): stress-strain, pressure-fluids, buoyancy, bernoulli,
  //   surface-tension, viscosity.
  //   Advanced Lagrangian/Hamiltonian formalism (no visual convention
  //   applies): generalized-coordinates, euler-lagrange-equation,
  //   cyclic-coordinates-conservation-laws, hamiltonian, hamiltons-
  //   equations, poisson-brackets, canonical-transformations, hamilton-
  //   jacobi-equation.
  //   These fall through to detectVisual()'s keyword fallback, then to an
  //   honest text/no-visual response — never a substituted force_diagram.

  // Physics — Vectors
  'phys.meas.scalars-vectors':        { primary: 'three_vector_visualization', all: ['three_vector_visualization'], sceneGenerator: 'vector' },
  'phys.meas.vector-addition':        { primary: 'three_vector_visualization', all: ['three_vector_visualization'], sceneGenerator: 'vector' },
  'phys.meas.vector-products':        { primary: 'three_vector_visualization', all: ['three_vector_visualization'] },

  // Physics — Optics
  'phys.opt.reflection':              { primary: 'force_diagram', all: ['force_diagram'], sceneGenerator: 'ray_optics' },
  'phys.opt.refraction':              { primary: 'force_diagram', all: ['force_diagram'], sceneGenerator: 'ray_optics' },
  'phys.opt.mirrors':                 { primary: 'force_diagram', all: ['force_diagram'], sceneGenerator: 'ray_optics' },
  'phys.opt.lenses':                  { primary: 'force_diagram', all: ['force_diagram'], sceneGenerator: 'ray_optics' },
  'phys.opt.ray-diagrams':            { primary: 'force_diagram', all: ['force_diagram'], sceneGenerator: 'ray_optics' },

  // Physics — Electricity
  'phys.em.current':                  { primary: 'circuit_diagram', all: ['circuit_diagram'], sceneGenerator: 'electric_circuit' },
  'phys.em.ohms-law':                 { primary: 'circuit_diagram', all: ['circuit_diagram'], sceneGenerator: 'electric_circuit' },
  'phys.em.series-parallel':          { primary: 'circuit_diagram', all: ['circuit_diagram'], sceneGenerator: 'electric_circuit' },
  'phys.em.kirchhoffs-laws':          { primary: 'circuit_diagram', all: ['circuit_diagram'], sceneGenerator: 'electric_circuit' },
  'phys.em.electric-circuits':        { primary: 'circuit_diagram', all: ['circuit_diagram'], sceneGenerator: 'electric_circuit' },

  // Physics — Kinematics (P0 fix: these are NOT force/dynamics concepts —
  // 'phys.mech.displacement' had no exact entry here, so it fell through to
  // the 'phys.mech' domain-prefix default below, which is force_diagram.
  // That default is correct for dynamics (force, tension, friction) but
  // wrong for pure-kinematics concepts (position/motion description, no
  // force analysis). Exact entries here win before the domain default is
  // ever reached (lookupConceptVisual checks Tier 1 before Tier 2), closing
  // the bug for every kinematics concept in one place rather than only the
  // one reported. number_line fits displacement/velocity/acceleration/
  // relative-motion (all fundamentally "position or its rate of change
  // along a line/path" at this level); kinematics-1d/2d already had a
  // correct sceneGenerator (kinematics_graphs, which renders position/
  // velocity/acceleration-vs-time GRAPHS) but a mismatched static primary
  // (force_diagram) — corrected to coordinate_plane, which is what those
  // graphs actually look like.
  'phys.mech.displacement':           { primary: 'number_line', all: ['number_line'] },
  'phys.mech.velocity':               { primary: 'number_line', all: ['number_line', 'coordinate_plane'] },
  'phys.mech.acceleration':           { primary: 'number_line', all: ['number_line', 'coordinate_plane'] },
  'phys.mech.relative-motion':        { primary: 'number_line', all: ['number_line'] },
  'phys.mech.kinematics-1d':          { primary: 'coordinate_plane', all: ['coordinate_plane'], sceneGenerator: 'kinematics_graphs' },
  'phys.mech.kinematics-2d':          { primary: 'coordinate_plane', all: ['coordinate_plane'], sceneGenerator: 'kinematics_graphs' },

  // Chemistry — Atomic structure
  'chem.found.atomic-theory':         { primary: 'three_atomic_structure', all: ['three_atomic_structure'] },
  'chem.found.atom-structure':        { primary: 'three_atomic_structure', all: ['three_atomic_structure', 'three_electron_shells'] },
  'chem.found.electron-config':       { primary: 'three_electron_shells', all: ['three_electron_shells', 'three_atomic_structure'], sceneGenerator: 'electron_shells' },
  'chem.found.periodic-table':        { primary: 'three_electron_shells', all: ['three_electron_shells'], sceneGenerator: 'periodic_trends' },
  'chem.found.periodic-trends':       { primary: 'three_electron_shells', all: ['three_electron_shells'], sceneGenerator: 'periodic_trends' },

  // Chemistry — Bonding
  'chem.bond.ionic-bond':             { primary: 'three_bond_formation', all: ['three_bond_formation'] },
  'chem.bond.covalent-bond':          { primary: 'three_bond_formation', all: ['three_bond_formation', 'three_molecular_shapes'] },
  'chem.bond.metallic-bond':          { primary: 'three_bond_formation', all: ['three_bond_formation', 'three_crystal_lattice'] },
  'chem.bond.molecular-geometry':     { primary: 'three_molecular_shapes', all: ['three_molecular_shapes'], sceneGenerator: 'molecule' },
  'chem.bond.vsepr':                  { primary: 'three_molecular_shapes', all: ['three_molecular_shapes'], sceneGenerator: 'molecule' },
  'chem.bond.crystal-structures':     { primary: 'three_crystal_lattice', all: ['three_crystal_lattice'], sceneGenerator: 'lattice' },

  // Chemistry — States of matter
  'chem.found.states-of-matter':      { primary: 'three_crystal_lattice', all: ['three_crystal_lattice'] },

  // Biology — Genetics
  'bio.gen.mendels-laws':             { primary: 'food_chain', all: ['food_chain'], sceneGenerator: 'punnett_square' },
  'bio.gen.monohybrid-cross':         { primary: 'food_chain', all: ['food_chain'], sceneGenerator: 'punnett_square' },
  'bio.gen.dihybrid-cross':           { primary: 'food_chain', all: ['food_chain'], sceneGenerator: 'punnett_square' },

  // Biology — Cell biology
  'bio.cell.cell-division':           { primary: 'food_chain', all: ['food_chain'], sceneGenerator: 'cell_division' },
  'bio.cell.mitosis':                 { primary: 'food_chain', all: ['food_chain'], sceneGenerator: 'cell_division' },
  'bio.cell.meiosis':                 { primary: 'food_chain', all: ['food_chain'], sceneGenerator: 'cell_division' },

  // Biology — Molecular biology
  'bio.mol.dna-structure':            { primary: 'food_chain', all: ['food_chain'], sceneGenerator: 'dna_structure' },
  'bio.mol.dna-replication':          { primary: 'food_chain', all: ['food_chain'], sceneGenerator: 'dna_structure' },

  // Biology — Ecology
  'bio.eco.food-chains':              { primary: 'food_chain', all: ['food_chain'], sceneGenerator: 'ecological_pyramid' },
  'bio.eco.energy-flow':              { primary: 'food_chain', all: ['food_chain'], sceneGenerator: 'ecological_pyramid' },
  'bio.eco.ecosystems':               { primary: 'food_chain', all: ['food_chain'] },
  'bio.eco.water-cycle':              { primary: 'water_cycle', all: ['water_cycle'] },

  // Mathematics — Coordinate geometry
  'math.geom.coordinate-geometry':    { primary: 'coordinate_plane', all: ['coordinate_plane', 'three_coordinate_system'], sceneGenerator: 'coordinate_geometry_line' },
  'math.geom.distance-formula':       { primary: 'coordinate_plane', all: ['coordinate_plane'], sceneGenerator: 'coordinate_geometry_line' },
  'math.geom.section-formula':        { primary: 'coordinate_plane', all: ['coordinate_plane'], sceneGenerator: 'coordinate_geometry_line' },
  'math.geom.straight-lines':         { primary: 'coordinate_plane', all: ['coordinate_plane'] },

  // Mathematics — Geometry
  'math.geom.triangles':              { primary: 'geometry_shape', all: ['geometry_shape', 'three_geometric_solids'], sceneGenerator: 'triangle' },
  'math.geom.angle-sum':              { primary: 'geometry_shape', all: ['geometry_shape'], sceneGenerator: 'triangle' },
  'math.geom.congruence':             { primary: 'geometry_shape', all: ['geometry_shape'] },
  'math.geom.similarity':             { primary: 'geometry_shape', all: ['geometry_shape'] },
  'math.geom.circles':                { primary: 'geometry_shape', all: ['geometry_shape'] },
  'math.geom.quadrilaterals':         { primary: 'geometry_shape', all: ['geometry_shape'] },
  'math.geom.polygons':               { primary: 'geometry_shape', all: ['geometry_shape'] },
  'math.geom.area-perimeter':         { primary: 'geometry_shape', all: ['geometry_shape'] },
  'math.geom.surface-area-volume':    { primary: 'three_geometric_solids', all: ['three_geometric_solids', 'geometry_shape'] },
  'math.geom.3d-geometry':            { primary: 'three_geometric_solids', all: ['three_geometric_solids'] },
  'math.geom.transformations':        { primary: 'three_transformations', all: ['three_transformations', 'geometry_shape'] },
  'math.geom.heights-distances':      { primary: 'geometry_shape', all: ['geometry_shape'], sceneGenerator: 'heights_and_distances' },

  // Mathematics — Number system
  'math.arith.fractions':             { primary: 'fraction_bar', all: ['fraction_bar', 'number_line'] },
  'math.arith.decimals':              { primary: 'number_line', all: ['number_line', 'fraction_bar'] },
  'math.arith.percentages':           { primary: 'percentage_grid', all: ['percentage_grid', 'fraction_bar'] },
  'math.arith.integers':              { primary: 'number_line', all: ['number_line'] },
  'math.arith.rational-numbers':      { primary: 'number_line', all: ['number_line', 'fraction_bar'] },
  'math.arith.real-numbers':          { primary: 'number_line', all: ['number_line'] },
  'math.arith.number-line':           { primary: 'number_line', all: ['number_line'] },

  // Mathematics — Algebra (graphing)
  'math.alg.linear-equations':        { primary: 'coordinate_plane', all: ['coordinate_plane'] },
  'math.alg.quadratic-equations':     { primary: 'coordinate_plane', all: ['coordinate_plane'] },
  'math.alg.polynomials':             { primary: 'coordinate_plane', all: ['coordinate_plane'] },
  'math.alg.linear-inequalities':     { primary: 'coordinate_plane', all: ['coordinate_plane', 'number_line'] },

  // Mathematics — Statistics
  'math.stat.mean-median-mode':       { primary: 'number_line', all: ['number_line'], sceneGenerator: 'statistics_bar_chart' },
  'math.stat.frequency-distribution': { primary: 'coordinate_plane', all: ['coordinate_plane'], sceneGenerator: 'statistics_bar_chart' },
  'math.stat.data-representation':    { primary: 'coordinate_plane', all: ['coordinate_plane'], sceneGenerator: 'statistics_bar_chart' },
  'math.stat.probability':            { primary: 'number_line', all: ['number_line'] },

  // Mathematics — Vectors
  'math.vec.vectors':                 { primary: 'three_vector_visualization', all: ['three_vector_visualization'], sceneGenerator: 'vector' },
  'math.vec.vector-operations':       { primary: 'three_vector_visualization', all: ['three_vector_visualization'], sceneGenerator: 'vector' },

  // Mathematics — Calculus
  'math.calc.differentiation':        { primary: 'coordinate_plane', all: ['coordinate_plane'], sceneGenerator: 'calculus_graph' },
  'math.calc.applications-derivative':{ primary: 'coordinate_plane', all: ['coordinate_plane'], sceneGenerator: 'calculus_graph' },
  'math.calc.maxima-minima':          { primary: 'coordinate_plane', all: ['coordinate_plane'], sceneGenerator: 'calculus_graph' },
  'math.calc.integration':            { primary: 'coordinate_plane', all: ['coordinate_plane'] },

  // Mathematics — Trigonometry
  'math.trig.trigonometric-ratios':   { primary: 'geometry_shape', all: ['geometry_shape'] },
  'math.trig.trigonometric-identities':{ primary: 'coordinate_plane', all: ['coordinate_plane', 'geometry_shape'] },

  // Computer Science
  'cs.found.computer-organisation':   { primary: 'three_computer_architecture', all: ['three_computer_architecture'] },
  'cs.found.memory-storage':          { primary: 'three_memory_storage', all: ['three_memory_storage'] },
  'cs.found.number-systems':          { primary: 'three_data_structure', all: ['three_data_structure'] },
  'cs.found.boolean-logic':           { primary: 'three_data_structure', all: ['three_data_structure'], sceneGenerator: 'logic_gate' },
  'cs.ds.arrays':                     { primary: 'three_data_structure', all: ['three_data_structure'] },
  'cs.ds.linked-lists':               { primary: 'three_data_structure', all: ['three_data_structure'] },
  'cs.ds.stacks-queues':              { primary: 'three_data_structure', all: ['three_data_structure'] },
  'cs.algo.sorting':                  { primary: 'three_algorithm_visualization', all: ['three_algorithm_visualization'] },
  'cs.algo.searching':                { primary: 'three_algorithm_visualization', all: ['three_algorithm_visualization'] },
  'cs.net.networking-basics':         { primary: 'three_network_packet_flow', all: ['three_network_packet_flow'] },
  'cs.db.relational-databases':       { primary: 'three_data_structure', all: ['three_data_structure'], sceneGenerator: 'er_diagram' },
}

// ── Tier 2: domain prefix → default visual ───────────────────────────────────
// Checked only when Tier 1 has no exact match. Prefix is matched greedily
// (longest match wins).

interface DomainRule {
  prefix: string
  entry: VisualEntry
}

function domainRule(prefix: string, primary: VisualType, all: VisualType[]): DomainRule {
  return { prefix, entry: { primary, all } }
}

const DOMAIN_VISUALS: DomainRule[] = [
  // Physics domains
  // P2 fix: 'phys.mech' USED TO default to force_diagram for every concept
  // in this domain — correct for dynamics, wrong for the kinematics,
  // energy, fluids, and advanced-formalism concepts also living here (the
  // P0 fix for phys.mech.displacement and this P2 audit's classification
  // of all 45 previously-domain-default-only concepts). That default is
  // now REMOVED, not narrowed: every phys.mech concept for which
  // force_diagram (or another existing visual) is genuinely correct now
  // has an explicit CONCEPT_VISUALS entry above, so the domain default is
  // no longer needed for anything legitimate. Concepts with no suitable
  // existing visual (Bucket C in the CONCEPT_VISUALS comment above) now
  // correctly fall through Tier 2 (a miss) to Tier 3 (detectVisual's
  // keyword match) or an honest no-visual response, instead of silently
  // inheriting an unrelated force diagram. The lookup ALGORITHM (three
  // tiers, checked in this order) is unchanged — only this one row of
  // domain-default DATA was removed.
  domainRule('phys.em',    'circuit_diagram', ['circuit_diagram']),
  domainRule('phys.opt',   'force_diagram', ['force_diagram']),
  domainRule('phys.wave',  'force_diagram', ['force_diagram']),
  domainRule('phys.meas',  'three_vector_visualization', ['three_vector_visualization']),

  // Chemistry domains
  domainRule('chem.bond',  'three_bond_formation', ['three_bond_formation', 'three_molecular_shapes']),
  domainRule('chem.found', 'three_atomic_structure', ['three_atomic_structure']),

  // Biology domains
  domainRule('bio.eco',    'food_chain', ['food_chain', 'water_cycle']),
  domainRule('bio.cell',   'food_chain', ['food_chain']),

  // Mathematics domains
  domainRule('math.geom',  'geometry_shape', ['geometry_shape']),
  domainRule('math.arith', 'number_line', ['number_line']),
  domainRule('math.alg',   'coordinate_plane', ['coordinate_plane']),
  domainRule('math.stat',  'coordinate_plane', ['coordinate_plane']),
  domainRule('math.calc',  'coordinate_plane', ['coordinate_plane']),
  domainRule('math.trig',  'geometry_shape', ['geometry_shape', 'coordinate_plane']),
  domainRule('math.vec',   'three_vector_visualization', ['three_vector_visualization']),

  // Computer Science domains
  domainRule('cs.ds',      'three_data_structure', ['three_data_structure']),
  domainRule('cs.algo',    'three_algorithm_visualization', ['three_algorithm_visualization']),
  domainRule('cs.net',     'three_network_packet_flow', ['three_network_packet_flow']),
  domainRule('cs.found',   'three_computer_architecture', ['three_computer_architecture']),
].sort((a, b) => b.prefix.length - a.prefix.length)

/**
 * Look up visual(s) for a canonical KG concept ID.
 * Returns null when no visual is registered (the caller should fall back
 * to detectVisual's title-keyword match).
 */
export function lookupConceptVisual(conceptId: string | null): VisualEntry | null {
  if (!conceptId) return null

  // Tier 1: exact match
  const exact = CONCEPT_VISUALS[conceptId]
  if (exact) return exact

  // Tier 2: domain prefix (longest match first)
  for (const rule of DOMAIN_VISUALS) {
    if (conceptId.startsWith(rule.prefix)) return rule.entry
  }

  return null
}

/**
 * Get just the primary VisualType for a concept — the value the Teaching
 * Engine's turn directive needs. Returns null for unknown concepts.
 */
export function getConceptVisualType(conceptId: string | null): VisualType | null {
  return lookupConceptVisual(conceptId)?.primary ?? null
}

/**
 * Get the scene generator kind available for a concept (if any).
 * This is separate from the visual type — scene generators run the
 * parametric 3D pipeline (extract→build→validate), while visual types
 * are rendered by the existing component layer.
 */
export function getConceptSceneGenerator(conceptId: string | null): SceneGeneratorKind | null {
  if (!conceptId) return null
  return CONCEPT_VISUALS[conceptId]?.sceneGenerator ?? null
}

// ── Server-authoritative render decision (Phase 2) ────────────────────────────
//
// The registry/detectVisual match only tells the LLM's system prompt what
// visual IS AVAILABLE — the LLM was still free to describe it in prose
// instead of emitting the VISUAL:<type> tag. This mirrors the exact shape
// of the pre-mastery-gate bug (an advisory instruction the model could
// silently ignore). For an EXPLICIT learner diagram/visualize request, the
// render must not depend on LLM compliance — pure decision logic below,
// unit-testable independent of route.ts's IO.

/**
 * True when a visual request must be force-attached to the response
 * server-side, regardless of whether the LLM's own VISUAL:<type> tag
 * fired. Only for explicit learner requests ('diagram') with a known
 * available visual — never overrides a phase-driven visual-first
 * suggestion (those stay advisory, since the learner didn't ask).
 */
export function shouldForceVisualRender(
  learnerRequest: 'diagram' | 'real_life_example' | 'explain_differently' | null,
  availableVisual: VisualType | null,
): boolean {
  return learnerRequest === 'diagram' && availableVisual !== null
}

// P0 (UI/UX sprint): "Tutor Max says a visual is coming, nothing renders."
// Root cause — force-render previously fired only for an explicit STUDENT
// request ('diagram') or 3+ remediation attempts; it never looked at what
// the ASSISTANT's own turn actually said. An LLM turn is free to write
// "here's a visual example..." in prose without emitting the VISUAL:<type>
// tag (or emitting one detectVisual() doesn't recognize), and unless the
// student happened to ask for a diagram first, resolveResponseVisual() had
// nothing to force-render against — the promise in the text and the actual
// attached visual were decided by two completely independent mechanisms
// that never talked to each other. Same deterministic, no-AI-reasoning
// keyword-match pattern as the rest of this file (detectVisual, VECTOR_RE):
// scan the assistant's own cleaned text for a stated visual promise, so the
// force-render path in resolveResponseVisual() also covers "the model
// promised, the registry has something to show" — not just "the student
// asked, the registry has something to show".
const VISUAL_PROMISE_RE = /\b(here'?s|here is|below is|see the|look at the|take a look at|check out the)\b[^.!?\n]{0,40}\b(visual|diagram|graph|chart|illustration|image|figure|plot)\b/i

export function textPromisesUnfulfilledVisual(text: string): boolean {
  return VISUAL_PROMISE_RE.test(text)
}

/**
 * Resolve the final responseVisual for the turn: the LLM's own parsed tag
 * wins when present (it may be a more specific match than the registry
 * default); otherwise, if force-render applies, the available visual is
 * attached deterministically. Returns null when neither applies — the
 * caller's existing "no visual" path (or last-resort text description)
 * is unchanged.
 */
export function resolveResponseVisual(
  llmTag: VisualType | null,
  forceRender: boolean,
  availableVisual: VisualType | null,
): VisualType | null {
  if (llmTag) return llmTag
  if (forceRender && availableVisual) return availableVisual
  return null
}
