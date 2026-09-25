/**
 * Scene generator activation — canonical parameters.
 *
 * The repository contains 29 deterministic, textbook-standard scene generators
 * (~330 KB in src/lib/teaching/sceneGenerators/). Every one of their BUILDERS is
 * pure: given parameters, it returns a SceneSpec with no network, no LLM and no
 * randomness. They have never rendered for a learner for two reasons:
 *
 *   1. the only entry point routed by keyword-matching the model's own prose, and
 *   2. every parameter EXTRACTOR calls the LLM, so the whole family sat behind a
 *      flag that would have added a second model round-trip to every visual turn.
 *
 * This module removes both obstacles. `visualRegistry.ts` already records which
 * generator each concept should use — `getConceptSceneGenerator()`, 60 bindings,
 * fully unit-tested, and until now with zero production callers. Pairing that
 * binding with a canonical parameter set per generator gives a real,
 * parameter-driven, concept-appropriate scene with NO LLM call at all.
 *
 * ON THE PARAMETERS: these are textbook canonical values — a 45° launch (maximum
 * range), a 3-4-5 vector pair, a 30-60-90 triangle. They are chosen so the
 * FIGURE TEACHES THE GENERAL CASE, which is what a diagram in a textbook does.
 * They are not extracted from the learner's numbers; when a learner asks about
 * their own specific values the tutor works those in words against this figure.
 * That is a deliberate trade of specificity for determinism, zero latency, and
 * zero hallucination risk.
 */

import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { fitSceneToFrame } from './layout'
import { canonicalParametricScene } from './parametricScenes'
import { buildVectorProductsScene } from '@/lib/teaching/sceneGenerators/vectorProducts'
import { buildCollisionScene } from '@/lib/teaching/sceneGenerators/momentumCollision'
import { buildRayOpticsScene } from '@/lib/teaching/sceneGenerators/rayOptics'
import { buildCircuitScene } from '@/lib/teaching/sceneGenerators/electricCircuit'
import { buildGravitationOrbitScene } from '@/lib/teaching/sceneGenerators/gravitationOrbit'
import {
  buildCalorimetryScene, buildFirstLawScene, buildSurfaceTensionScene,
  buildTotalInternalReflectionScene, buildTransverseWaveScene,
  buildViscosityScene, buildWaveInterferenceScene,
} from '@/lib/teaching/sceneGenerators/physicsPilot'
import { buildCalculusGraphScene } from '@/lib/teaching/sceneGenerators/calculusGraph'
import { buildStatisticsBarChartScene } from '@/lib/teaching/sceneGenerators/statisticsBarChart'
import { buildCellDivisionScene } from '@/lib/teaching/sceneGenerators/cellDivision'
import { buildTimelineScene } from '@/lib/teaching/sceneGenerators/historicalTimeline'
import { buildOrgChartScene } from '@/lib/teaching/sceneGenerators/civicsOrgChart'
import { buildDemographicPyramidScene } from '@/lib/teaching/sceneGenerators/demographicPyramid'
import { buildElectrochemicalCellScene, type ElectrochemicalCellParams } from '@/lib/teaching/sceneGenerators/electrochemicalCell'
import { buildEnergyCycleScene } from '@/lib/teaching/sceneGenerators/energyCycle'
import { buildCoordinationComplexScene, type CoordinationComplexDef } from '@/lib/teaching/sceneGenerators/coordinationComplex'
import { buildSystemBoundaryScene, buildFirstLawScene as buildChemFirstLawScene } from '@/lib/teaching/sceneGenerators/chemistrySystemScenes'
import { buildCellStructureScene } from '@/lib/teaching/sceneGenerators/cellStructure'
import { buildCellPathwayScene } from '@/lib/teaching/sceneGenerators/cellPathway'
import { buildCellHubScene } from '@/lib/teaching/sceneGenerators/cellHub'
import { buildCellComparisonScene } from '@/lib/teaching/sceneGenerators/cellComparison'
import { buildDNAReplicationScene } from '@/lib/teaching/sceneGenerators/dnaReplication'

/**
 * A canonical figure from the variable registry.
 *
 * These kinds keep their textbook parameters in `parametricScenes.ts` — the
 * same table the learner's sliders move — so there is one source of truth for
 * "the canonical case" instead of two that can drift. The scene comes back
 * STAMPED with its kind and values, which is what lets the frame offer controls
 * without any concept-specific wiring.
 */
function fromRegistry(kind: string): SceneSpec {
  const spec = canonicalParametricScene(kind)
  if (!spec) throw new Error(`canonical parametric scene missing for kind: ${kind}`)
  return spec
}

/** Every generator kind the registry can name, bound to a canonical build. */
const CANONICAL_SCENES: Record<string, () => SceneSpec> = {
  // ── physics ──
  projectile:      () => fromRegistry('projectile'),
  circular:        () => fromRegistry('circular'),
  pendulum:        () => fromRegistry('pendulum'),
  // Head-on, both bodies moving: a stationary target (u2 = 0) draws a
  // zero-length velocity vector, which the scene validator correctly rejects.
  collision:       () => fromRegistry('collision'),
  torque_diagram:  () => fromRegistry('torque_diagram'),
  electric_dipole: () => fromRegistry('electric_dipole'),
  gravitation_orbit: () => fromRegistry('gravitation_orbit'),
  ray_optics:      () => fromRegistry('ray_optics'),
  electric_circuit: () => fromRegistry('electric_circuit'),
  kinematics_graphs: () => fromRegistry('kinematics_graphs'),

  // ── mathematics ──
  vector:   () => fromRegistry('vector'),  // the 3-4-5 case
  triangle: () => fromRegistry('triangle'),
  calculus_graph: () => fromRegistry('calculus_graph'),
  coordinate_geometry_line: () => fromRegistry('coordinate_geometry_line'),
  heights_and_distances: () => fromRegistry('heights_and_distances'),
  statistics_bar_chart: () => buildStatisticsBarChartScene({
    chartTitle: 'Marks scored',
    bars: [
      { label: '0-10', frequency: 2 }, { label: '10-20', frequency: 5 },
      { label: '20-30', frequency: 9 }, { label: '30-40', frequency: 4 },
    ],
  }),

  // ── chemistry ──
  electron_shells:  () => fromRegistry('electron_shells'),
  lattice:          () => fromRegistry('lattice'),
  molecule:         () => fromRegistry('molecule'),
  periodic_trends:  () => fromRegistry('periodic_trends'),

  // ── biology ──
  punnett_square:     () => fromRegistry('punnett_square'),
  ecological_pyramid: () => fromRegistry('ecological_pyramid'),
  dna_structure:      () => fromRegistry('dna_structure'),
  cell_division:      () => fromRegistry('cell_division'),

  // ── computer science ──
  logic_gate: () => fromRegistry('logic_gate'),
  er_diagram: () => fromRegistry('er_diagram'),

  // ── humanities (generators exist; registry may bind them later) ──
  historical_timeline: () => buildTimelineScene({
    events: [
      { year: 1857, event: 'First War of Independence' },
      { year: 1885, event: 'Indian National Congress founded' },
      { year: 1947, event: 'Independence' },
    ],
  }),
  civics_org_chart: () => buildOrgChartScene({
    institutionName: 'Government',
    nodes: [
      { level: 1, name: 'Legislature', role: 'Makes laws' },
      { level: 1, name: 'Executive', role: 'Implements laws' },
      { level: 1, name: 'Judiciary', role: 'Interprets laws' },
    ],
  }),
  demographic_pyramid: () => buildDemographicPyramidScene({
    regionName: 'Population',
    bands: [
      { label: '0-14', malePct: 30, femalePct: 28 },
      { label: '15-64', malePct: 55, femalePct: 54 },
      { label: '65+', malePct: 15, femalePct: 18 },
    ],
  }),
  economics_curves: () => fromRegistry('economics_curves'),
}

/**
 * PER-CONCEPT PARAMETERS — the requested concept, not just its generator kind,
 * determines what is drawn.
 *
 * One canonical parameter set per generator kind was too coarse: several
 * concepts share a generator but need a different instance of it, and the
 * kind-level default silently taught the wrong case. Observed:
 *
 *   phys.opt.reflection / .mirrors  -> ray_optics, whose default is a CONVEX
 *       LENS. A learner asking about reflection was shown refraction.
 *   phys.mech.collisions-inelastic  -> collision, whose default is ELASTIC.
 *   bio.cell.meiosis                -> cell_division, whose default is MITOSIS.
 *
 * A concept may also map to `null` here, which means "this generator cannot
 * faithfully draw this concept" — the resolver then falls through to the
 * concept's VisualCard rather than showing a figure of something else.
 */
const CONCEPT_SCENES: Record<string, () => SceneSpec | null> = {
  // The ONLY concept bound to the 'electric_dipole' generator kind (Physics
  // Interactive Lesson Upgrade) — a concept-owned figure, not a kind default
  // shared across several concepts, so it is registered here rather than in
  // CANONICAL_SCENES: two charges, p = qd, the field, the forces, and the
  // torque τ = pE sinθ, built specifically for phys.em.electric-dipole.
  'phys.em.electric-dipole': () => fromRegistry('electric_dipole'),

  // Reflection and mirrors are mirror problems, not lens problems.
  'phys.opt.reflection': () => buildRayOpticsScene({ opticsType: 'concave_mirror', objectDistance: 30, focalLength: 10, objectHeight: 5 }),
  'phys.opt.mirrors':    () => buildRayOpticsScene({ opticsType: 'concave_mirror', objectDistance: 30, focalLength: 10, objectHeight: 5 }),

  // The inelastic concept must show the inelastic case — the carts stick.
  'phys.mech.collisions-inelastic': () => buildCollisionScene({ m1: 2, m2: 1, u1: 3, u2: -2, collisionType: 'perfectly_inelastic' }),

  // Meiosis is not mitosis; the generator already models both.
  'bio.cell.meiosis': () => buildCellDivisionScene({ divisionType: 'meiosis' }),

  // ── Orphan-census promotion: a figure chosen FOR this concept ─────────────
  // calculus_graph's kind default is x^2 - 4x + 3 on [-1, 5] — a parabola with
  // exactly ONE critical point. For "Critical Points" that teaches half the
  // idea: it shows a minimum and never shows that critical points come in
  // kinds. The cubic x^3 - 3x on [-2.5, 2.5] has TWO, a maximum at x = -1 and a
  // minimum at x = +1, and the generator derives and labels both (its title
  // reads "2 critical points" where the default reads "1").
  //
  // This is what promotion is supposed to mean: the concept OWNS an instance
  // that teaches it better than the shared default, so its provenance becomes
  // 'generator' and it earns concept scope instead of being declared into it.
  // The four other concepts wired by the same census are deliberately NOT here
  // — see scope.ts for why each keeps its demotion.
  'math.calc.critical-points': () => buildCalculusGraphScene({
    functionType: 'polynomial', coefficients: [1, 0, -3, 0], domainMin: -2.5, domainMax: 2.5,
  }),

  // The Punnett generator is single-gene by construction (genotypes are two
  // alleles). A dihybrid cross drawn as a monohybrid square teaches the wrong
  // thing, so no scene is produced and the concept's card is used instead.
  'bio.gen.dihybrid-cross': () => null,

  // ── M3-B stage B2: kind-defaults split into the concept's own case ────────
  // Both reuse an existing generator with different parameters. No generator
  // was modified and no new geometry was written; the cases the audit found
  // that DO need new geometry are recorded as "requires authoring" instead of
  // being approximated here.

  // Kirchhoff's laws were drawn as the kind default: a SERIES loop of two
  // resistors. A series loop has no junction, so KCL — current in equals
  // current out at a node — cannot be demonstrated on it at all. The parallel
  // configuration has junctions, and the generator already narrates the total
  // current "split across the branches", which is the current law itself.
  // (phys.em.dc-circuits keeps the series default: it is the concept's other
  // half, and the two now draw genuinely different circuits.)
  'phys.em.kirchhoffs-laws': () => buildCircuitScene({
    components: [
      { type: 'resistor', value: 10, unit: 'ohm' },
      { type: 'resistor', value: 20, unit: 'ohm' },
    ],
    connection: 'parallel',
    voltage: 12,
  }),

  // "Artificial Satellites and Geostationary Orbits" was drawn at the generator's
  // default 7,000 km radius — a low Earth orbit with a 97-minute period, which is
  // the one orbit a geostationary satellite is not in. Using the real
  // geostationary radius makes the generator derive T ≈ 23.9 h (the sidereal
  // day) from v = sqrt(GM/r), so the defining property of the concept is what
  // the figure actually shows.
  'phys.mech.satellites': () => buildGravitationOrbitScene({
    centralMass: 5.97e24,
    orbitRadius: 4.2164e7,
  }),

  // ── M4 Physics visual authoring pilot ────────────────────────────────────
  // The seven concepts the visualization programme started from. Each had NO
  // figure — correctly, since the only figures ever offered for them were
  // keyword-matched from the tutor's prose (a concave mirror for total internal
  // reflection, a two-cart collision for calorimetry, a projectile parabola for
  // viscosity) and M1 removed that path. These are authored replacements: plain
  // SceneSpecs built only from primitives SceneSpecRenderer paints, resolved
  // through the same registry -> admission -> contract path as everything else.
  // ── the vector family's third claim ──────────────────────────────────────
  // Components, addition and PRODUCTS are three different geometric claims,
  // and all five concepts naming them shared one `three_vector_visualization`
  // card — a single vector resolved into x/y/z components. The card is at
  // least adjacent for the first two (both also carry a `vector` generator
  // binding, which outranks it and draws the addition case). For products it
  // was the only tier that fired, so a learner asking to see the dot product
  // was shown components: no second vector, no angle, no projection.
  //
  // Same repair as `phys.opt.reflection` above, one layer up — the concept
  // gets its own instance rather than the family's shared default. It is a
  // CONCEPT_SCENES override rather than a new generator kind because the
  // registry row names no generator at all, and this table is consulted
  // before the kind is.
  'phys.meas.vector-products': buildVectorProductsScene,

  'phys.opt.total-internal-reflection': buildTotalInternalReflectionScene,
  'phys.wave.transverse-waves':         buildTransverseWaveScene,
  'phys.wave.interference':             buildWaveInterferenceScene,
  'phys.therm.calorimetry':             buildCalorimetryScene,
  'phys.therm.first-law':               buildFirstLawScene,
  'phys.mech.viscosity':                buildViscosityScene,
  'phys.mech.surface-tension':          buildSurfaceTensionScene,

  // ── Chemistry Visual Coverage programme (2026-09) ─────────────────────────
  // chem.thermo / chem.coord / chem.elect had NO curated visual of any kind
  // (visualRegistry.ts's own comment recorded the gap). Every entry below is
  // a genuinely reusable archetype, not a concept-specific hack — see
  // electrochemicalCell.ts / energyCycle.ts / coordinationComplex.ts /
  // chemistrySystemScenes.ts for why each archetype is scientifically
  // appropriate for every concept bound to it.

  // Archetype A — one electrochemical-cell generator serves every galvanic
  // and electrolytic concept in chem.elect, plus cell thermodynamics.
  // `electricCircuit`'s resistor/capacitor model cannot represent any of
  // these (no electrode, no electrolyte, no half-reaction).
  'chem.elect.galvanic-cell': () => buildElectrochemicalCellScene(DANIELL_CELL),
  'chem.thermo.cell-thermo': () => buildElectrochemicalCellScene({
    ...DANIELL_CELL, name: 'Daniell Cell — ΔG = −nFE',
  }),
  'chem.elect.standard-electrode': () => buildElectrochemicalCellScene({
    cellType: 'galvanic',
    anode: { material: 'Zn', ion: 'Zn2+', standardPotential: -0.76 },
    cathode: { material: 'Pt, H2(g)', ion: 'H+', standardPotential: 0 },
    electronsTransferred: 2,
    name: 'Zinc vs. Standard Hydrogen Electrode',
  }),
  'chem.elect.nernst': () => buildElectrochemicalCellScene({
    cellType: 'galvanic',
    anode: { material: 'Zn', ion: 'Zn2+', standardPotential: -0.76, concentration: 1.0 },
    cathode: { material: 'Cu', ion: 'Cu2+', standardPotential: 0.34, concentration: 0.01 },
    electronsTransferred: 2,
    name: 'Daniell Cell at Non-Standard Concentrations',
  }),
  'chem.elect.concentration-cell': () => buildElectrochemicalCellScene({
    cellType: 'galvanic',
    anode: { material: 'Cu', ion: 'Cu2+', standardPotential: 0.34, concentration: 0.001 },
    cathode: { material: 'Cu', ion: 'Cu2+', standardPotential: 0.34, concentration: 1.0 },
    electronsTransferred: 2,
    name: 'Copper Concentration Cell',
  }),
  'chem.elect.electrolysis': () => buildElectrochemicalCellScene({
    cellType: 'electrolytic',
    anode: { material: 'C (graphite)', ion: 'Cl-' },
    cathode: { material: 'Fe (steel)', ion: 'Na+' },
    electronsTransferred: 2,
    externalVoltage: 4,
    name: 'Electrolysis of Molten NaCl',
  }),
  'chem.elect.industrial': () => buildElectrochemicalCellScene({
    cellType: 'electrolytic',
    anode: { material: 'Cu (pure, impure at cathode)', ion: 'Cu2+' },
    cathode: { material: 'object to be plated', ion: 'Cu2+' },
    electronsTransferred: 2,
    externalVoltage: 2,
    name: 'Copper Electroplating',
  }),
  'chem.elect.batteries': () => buildElectrochemicalCellScene({
    cellType: 'galvanic',
    divided: false, // a real dry cell has one paste electrolyte, not two half-cells with a salt bridge
    anode: { material: 'Zn (case)', ion: 'Zn2+' },
    cathode: { material: 'MnO2 / carbon rod', ion: 'NH4+' },
    electronsTransferred: 2,
    name: 'Zinc–Carbon Dry Cell (Primary Battery)',
  }),

  // Archetype B — one energy-level/cycle generator serves Hess's Law, the
  // Born–Haber cycle, and Crystal Field Theory's splitting diagram.
  'chem.thermo.enthalpy': () => buildEnergyCycleScene({
    title: "Hess's Law: Combustion of Carbon",
    startLabel: 'C(s) + O2(g)',
    unit: 'kJ/mol',
    paths: [
      { name: 'Direct', steps: [{ label: 'CO2(g)', delta: -393.5, deltaLabel: 'ΔH = −393.5 kJ/mol' }] },
      { name: 'Via CO(g)', steps: [
        { label: 'CO(g) + ½O2(g)', delta: -110.5, deltaLabel: 'ΔH1 = −110.5 kJ/mol' },
        { label: 'CO2(g)', delta: -283.0, deltaLabel: 'ΔH2 = −283.0 kJ/mol' },
      ] },
    ],
  }),
  'chem.thermo.bond-enthalpy': () => buildEnergyCycleScene({
    title: 'Born–Haber Cycle: Formation of NaCl',
    startLabel: 'Na(s) + ½Cl2(g)',
    unit: 'kJ/mol',
    paths: [
      { name: 'Direct', steps: [{ label: 'NaCl(s)', delta: -411, deltaLabel: 'ΔHf° = −411 kJ/mol' }] },
      { name: 'Via ions', steps: [
        { label: 'Na(g) + ½Cl2(g)', delta: 107, deltaLabel: 'sublimation ΔHsub = +107' },
        { label: 'Na+(g) + e− + ½Cl2(g)', delta: 496, deltaLabel: 'ionization IE = +496' },
        { label: 'Na+(g) + e− + Cl(g)', delta: 122, deltaLabel: 'dissociation ½ΔHdiss = +122' },
        { label: 'Na+(g) + Cl−(g)', delta: -349, deltaLabel: 'electron affinity EA = −349' },
        { label: 'NaCl(s)', delta: -787, deltaLabel: 'lattice energy U = −787' },
      ] },
    ],
  }),
  'chem.coord.cft': () => buildEnergyCycleScene({
    title: 'Crystal Field Splitting: [Ti(H2O)6]3+',
    startLabel: 't2g (lower set)',
    unit: 'Δo units',
    paths: [{ name: 'Splitting', steps: [{ label: 'eg (upper set)', delta: 1, deltaLabel: 'Δo (octahedral splitting)' }] }],
    occupancy: [{ levelLabel: 't2g (lower set)', dots: 1 }, { levelLabel: 'eg (upper set)', dots: 0 }],
  }),

  // Archetype D — coordination geometry, extending the same visual grammar
  // as the existing VSEPR `molecule` generator (never modified) with the two
  // geometries school VSEPR doesn't need: octahedral and square planar.
  'chem.coord.werner':       () => buildCoordinationComplexScene(HEXAAMMINECOBALT),
  'chem.coord.nomenclature': () => buildCoordinationComplexScene(HEXAAMMINECOBALT),
  'chem.coord.bonding':      () => buildCoordinationComplexScene({
    ...HEXAAMMINECOBALT, name: 'Hexaamminecobalt(III) — sp3d2 / d2sp3 Hybridization',
  }),
  'chem.coord.isomerism': () => buildCoordinationComplexScene(CISPLATIN),
  // Cisplatin's biological activity is literally cis/trans-dependent — the
  // isomerism figure IS the applications figure, not a decorative reuse.
  'chem.coord.applications': () => buildCoordinationComplexScene({
    ...CISPLATIN, name: 'Cisplatin — the Isomer That Works as a Drug',
  }),

  // Archetype E — reuse of the statistics_bar_chart generator's GEOMETRY with
  // chemistry comparison data.
  //
  // PCD-040: the data here was always chemistry-appropriate (13.0 vs 18.8 is
  // the real chelate effect), but the generator's CHROME was not. It titled the
  // figure "Frequency Distribution", called 18.8 "the mode — the most
  // frequently occurring category", and reported a mean over "31.8
  // observations" — of which there are none, because log Kf is a magnitude and
  // not a count. The tutor read that narration and taught from it. Both
  // bindings now declare what the bar heights ARE, which switches the
  // generator to comparison chrome; the numbers are untouched.
  'chem.coord.stability': () => buildStatisticsBarChartScene({
    chartTitle: 'log Kf: the chelate effect',
    quantity: { name: 'log Kf', kind: 'magnitude' },
    bars: [
      { label: '[Cu(NH3)4]2+ (monodentate)', frequency: 13.0 },
      { label: '[Cu(EDTA)]2− (chelate)', frequency: 18.8 },
    ],
  }),
  'chem.thermo.heat-capacities': () => buildStatisticsBarChartScene({
    chartTitle: 'Molar heat capacities (J/mol·K)',
    quantity: { name: 'molar heat capacity (J/mol·K)', kind: 'magnitude' },
    bars: [
      { label: 'Monatomic Cv', frequency: 12.47 },
      { label: 'Monatomic Cp', frequency: 20.79 },
      { label: 'Diatomic Cv', frequency: 20.79 },
      { label: 'Diatomic Cp', frequency: 29.10 },
    ],
  }),

  // PCD-041 — ONE AUTHORITATIVE FORMULATION, because there was none.
  //
  // `chem.dblock.lanthanides` had no curated binding, so every figure request
  // fell through to GENERATION, and each turn generated independently. One
  // session served TWO contradictory lines for the same trend: -2.857x+342.849
  // at T2/T4 (a ~40 pm drop across the series) and y=-0.5x+200 at T10 (~7 pm).
  // Neither is anywhere in this repository — both were invented at the turn —
  // and neither matches the real contraction of ~17 pm.
  //
  // A curated binding outranks generation, so authoring one is the fix: the
  // learner now gets the same figure every turn, built from Shannon ionic radii
  // (CN = 6, Ln3+), which is a published reference series and not an
  // approximation fitted at runtime. La3+ 103.2 -> Lu3+ 86.1 pm is a 17.1 pm
  // contraction; the six elements are a representative spread across La-Lu,
  // monotonic, and within this generator's 12-bar bound.
  //
  // Magnitude mode for the same reason as the two bindings above (PCD-040):
  // a radius is not a count, so no frequency/mode/mean claim may be made of it.
  'chem.dblock.lanthanides': () => buildStatisticsBarChartScene({
    chartTitle: 'Lanthanide contraction: ionic radius of Ln3+ (pm), La to Lu',
    quantity: { name: 'ionic radius (pm, Shannon, CN=6)', kind: 'magnitude' },
    bars: [
      { label: 'La3+ 103.2 pm', frequency: 103.2 },
      { label: 'Ce3+ 101.0 pm', frequency: 101.0 },
      { label: 'Nd3+ 98.3 pm', frequency: 98.3 },
      { label: 'Gd3+ 93.8 pm', frequency: 93.8 },
      { label: 'Ho3+ 90.1 pm', frequency: 90.1 },
      { label: 'Lu3+ 86.1 pm', frequency: 86.1 },
    ],
  }),

  // Archetype C — the system-boundary/energy-balance diagram.
  'chem.thermo.system': () => buildSystemBoundaryScene('closed'),
  'chem.thermo.first-law': () => buildChemFirstLawScene(100, -40),

  // ══ BIOLOGY CELL VISUAL REPLACEMENT (2026-09-24) ═════════════════════════
  //
  // Faithful, concept-specific replacements for the 18 bio.cell concepts
  // retired.ts suppresses from the wrong 'bio.cell' -> food_chain domain
  // default (the retired.ts entries and this campaign's own read-only design
  // inventory name each concept's exact defect). Every scene below is built
  // from ONE of four small, reusable, parameter-driven generators —
  // buildCellStructureScene (a labelled organelle/cell diagram),
  // buildCellPathwayScene (a real sequence or cycle, optionally branching),
  // buildCellHubScene (independent coexisting categories under one heading),
  // buildCellComparisonScene (two or more contrasted categories) — never 18
  // bespoke renderers. Every name, part list, stage list, spoke list and
  // group list below is transcribed directly from the concept's own
  // canonical KG description (docs/biology/kg/graph.json); nothing is
  // invented, extracted by keyword, or borrowed from a different concept.
  //
  // bio.cell.cell-theory is the one exception: it is HISTORICAL, not
  // structural or procedural, so it reuses the existing buildTimelineScene
  // generator (already imported above for the civics/history domain) rather
  // than any of the four new ones — the concept's own description IS a
  // timeline (Schleiden & Schwann, then Virchow).
  'bio.cell.cell-theory': () => buildTimelineScene({
    events: [
      { year: 1838, event: 'Schleiden and Schwann: all living things are made of one or more cells' },
      { year: 1855, event: 'Virchow: cells arise only from pre-existing cells' },
    ],
  }),

  'bio.cell.prokaryotic-cell': () => buildCellStructureScene({
    conceptId: 'bio.cell.prokaryotic-cell',
    subject: 'Prokaryotic Cell Structure',
    boundaryLabel: 'Cell wall',
    teachingGoal: 'Name the structures of a prokaryotic cell and note the absence of membrane-bound organelles.',
    parts: [
      { name: 'Plasma membrane', description: 'encloses the cytoplasm just inside the cell wall' },
      { name: 'Nucleoid', description: 'the region where the circular DNA sits, unbound by a nuclear membrane' },
      { name: 'Ribosomes', description: 'carry out protein synthesis, scattered through the cytoplasm' },
      { name: 'Plasmid', description: 'a small circular DNA molecule separate from the nucleoid' },
      { name: 'Flagella', description: 'whip-like structures used for movement' },
      { name: 'Pili', description: 'hair-like structures used for attachment and DNA transfer' },
    ],
  }),

  // Compartmentalisation, not an exhaustive organelle catalogue — the
  // concept's own emphasis, per its KG description ("compartmentalisation as
  // an organisational principle"). Plant-only and animal-only organelles are
  // named explicitly as the point of contrast; organelles common to both are
  // grouped once rather than repeated per side.
  'bio.cell.eukaryotic-cell': () => buildCellComparisonScene({
    conceptId: 'bio.cell.eukaryotic-cell',
    title: 'Eukaryotic Cell Structure',
    teachingGoal: 'Contrast plant and animal cells while recognising the compartmentalised organelles they share.',
    groups: [
      { label: 'Shared by both', description: 'both cell types compartmentalise their functions into membrane-bound organelles', items: ['Plasma membrane', 'Membrane-bound nucleus', 'Cytoplasm with organelles'] },
      { label: 'Plant cell only', description: 'plant cells add structures animal cells lack', items: ['Cell wall', 'Chloroplast', 'Large central vacuole'] },
      { label: 'Animal cell only', description: 'animal cells lack a wall, chloroplast, or large vacuole', items: ['No cell wall', 'No chloroplast', 'Small/no vacuole'] },
    ],
  }),

  'bio.cell.cell-membrane-transport': () => buildCellComparisonScene({
    conceptId: 'bio.cell.cell-membrane-transport',
    title: 'Cell Membrane and Transport',
    teachingGoal: 'Distinguish passive transport, active transport and bulk transport across the fluid mosaic membrane.',
    groups: [
      { label: 'Passive transport', description: 'moves down the concentration gradient, no energy required', items: ['Diffusion', 'Osmosis', 'Facilitated diffusion'] },
      { label: 'Active transport', description: 'moves against the gradient, requires ATP', items: ['Sodium-potassium pump'] },
      { label: 'Bulk transport', description: 'moves material in bulk across the membrane in vesicles', items: ['Endocytosis', 'Exocytosis'] },
    ],
  }),

  'bio.cell.nucleus-chromosomes': () => buildCellStructureScene({
    conceptId: 'bio.cell.nucleus-chromosomes',
    subject: 'Nucleus and Chromosomes',
    boundaryLabel: 'Nuclear envelope',
    teachingGoal: 'Locate the nucleolus and chromatin inside the nucleus, and name the parts of a chromosome.',
    parts: [
      { name: 'Nucleolus', description: 'a dense region inside the nucleus where ribosomes are assembled' },
      { name: 'Chromatin', description: 'the loosely packed form of DNA and protein filling the nucleus' },
      { name: 'Centromere', description: 'the constriction point joining sister chromatids of a condensed chromosome' },
      { name: 'Telomere', description: 'the protective cap at each end of a chromosome' },
      { name: 'Sister chromatids', description: 'the two identical copies of a replicated chromosome' },
    ],
  }),

  'bio.cell.mitochondria-energy': () => buildCellStructureScene({
    conceptId: 'bio.cell.mitochondria-energy',
    subject: 'Mitochondria and Energy Organelles',
    boundaryLabel: 'Outer membrane',
    teachingGoal: 'Locate the cristae and matrix inside the mitochondrion as the site of aerobic respiration.',
    parts: [
      { name: 'Inner membrane', description: 'folds inward, separating the matrix from the intermembrane space' },
      { name: 'Cristae', description: 'the folds of the inner membrane, increasing surface area for respiration' },
      { name: 'Matrix', description: 'the innermost fluid space, site of the citric acid cycle' },
    ],
  }),

  'bio.cell.chloroplast-structure': () => buildCellStructureScene({
    conceptId: 'bio.cell.chloroplast-structure',
    subject: 'Chloroplast Structure',
    boundaryLabel: 'Outer membrane',
    teachingGoal: 'Locate the thylakoids, grana and stroma inside the chloroplast as the site of photosynthesis.',
    parts: [
      { name: 'Inner membrane', description: 'encloses the stroma just inside the outer membrane' },
      { name: 'Thylakoid', description: 'a flattened, membrane-bound sac where chlorophyll captures light' },
      { name: 'Granum', description: 'a stack of thylakoids' },
      { name: 'Stroma', description: 'the fluid space surrounding the grana, site of the light-independent reactions' },
    ],
  }),

  // A REAL linear pathway (synthesis -> modification -> packaging ->
  // destination), grounded exactly in the concept's own KG description.
  'bio.cell.endomembrane-system': () => buildCellPathwayScene({
    conceptId: 'bio.cell.endomembrane-system',
    title: 'Endomembrane System',
    teachingGoal: 'Trace a protein from synthesis through modification, packaging and secretion.',
    stages: [
      { name: 'Rough ER', description: 'ribosomes on the rough endoplasmic reticulum synthesise the protein' },
      { name: 'Smooth ER', description: 'the smooth endoplasmic reticulum synthesises lipids and processes the protein further' },
      { name: 'Golgi apparatus', description: 'modifies, sorts and packages the protein into vesicles' },
      { name: 'Vesicle', description: 'buds off from the Golgi, carrying its cargo to its destination' },
      { name: 'Lysosome / secretion', description: 'the vesicle becomes a lysosome or fuses with the plasma membrane to secrete its contents' },
    ],
  }),

  // Three coexisting filament TYPES, not three steps — the same
  // list-is-not-a-process rule that already governs this file's process_flow
  // guidance for bio.physio.homeostasis-thermoregulation.
  'bio.cell.cytoskeleton': () => buildCellHubScene({
    conceptId: 'bio.cell.cytoskeleton',
    hubLabel: 'Cytoskeleton',
    title: 'Cytoskeleton and Cell Motility',
    teachingGoal: 'Distinguish the three cytoskeletal filament types by their roles.',
    spokes: [
      { name: 'Microfilaments', description: 'actin filaments giving the cell shape and enabling movement' },
      { name: 'Microtubules', description: 'hollow tubes directing intracellular transport and cell division' },
      { name: 'Intermediate filaments', description: 'rope-like fibres providing mechanical strength' },
    ],
  }),

  // DNA replication was served the dna_structure KIND default — a static
  // base-pairing ladder with no fork, no new strands and no enzymes, demoted in
  // scope.ts for exactly that. This is its own authored figure: one replication
  // fork drawn only from the KG description and the concept's EB entry (see
  // dnaReplication.pure.ts). The registry row keeps `sceneGenerator:
  // 'dna_structure'`, so that generator stays bound and reachable; this table
  // is consulted before the kind, so the concept now draws its own case.
  'bio.mol.dna-replication': buildDNAReplicationScene,

  // The cell cycle is a genuine CYCLE — the concept's own KG description
  // names the ordered phases and their checkpoints.
  'bio.cell.cell-cycle': () => buildCellPathwayScene({
    conceptId: 'bio.cell.cell-cycle',
    title: 'The Cell Cycle',
    teachingGoal: 'Order the phases of the cell cycle and locate its regulatory checkpoints.',
    cyclic: true,
    stages: [
      { name: 'G1', description: 'the cell grows and carries out its normal functions' },
      { name: 'S', description: 'DNA is replicated' },
      { name: 'G2', description: 'the cell prepares for division, checked by the G2 checkpoint' },
      { name: 'M', description: 'mitosis and cytokinesis divide the cell in two' },
    ],
  }),

  'bio.cell.cell-signalling': () => buildCellPathwayScene({
    conceptId: 'bio.cell.cell-signalling',
    title: 'Cell Signalling',
    teachingGoal: 'Trace a signal from the signalling molecule to the cell’s response.',
    stages: [
      { name: 'Signal molecule', description: 'a signalling molecule is released by a signalling cell' },
      { name: 'Receptor', description: 'the signal binds a specific receptor on the target cell' },
      { name: 'Signal transduction', description: 'the bound receptor triggers a transduction pathway, often via second messengers' },
      { name: 'Cellular response', description: 'the pathway produces the target cell’s response' },
    ],
  }),

  // The intrinsic and extrinsic pathways are two INDEPENDENT triggers that
  // converge on the same executioner-caspase continuation — a branching
  // START, not a single flattened line (the same principle already applied
  // to bio.physio.homeostasis-thermoregulation's hot/cold response fix).
  'bio.cell.apoptosis': () => buildCellPathwayScene({
    conceptId: 'bio.cell.apoptosis',
    title: 'Apoptosis and Programmed Cell Death',
    teachingGoal: 'Trace both the intrinsic and extrinsic triggers of apoptosis to the shared caspase cascade.',
    branchStart: [
      { name: 'Intrinsic pathway', description: 'cytochrome c release from mitochondria, regulated by the Bcl-2 family, forms the apoptosome.' },
      { name: 'Extrinsic pathway', description: 'death receptors on the cell surface recruit FADD to activate initiator caspases.' },
    ],
    stages: [
      { name: 'Caspase cascade', description: 'initiator caspases activate executioner caspases' },
      { name: 'Cell death', description: 'executioner caspases produce the hallmark morphological changes of apoptosis' },
    ],
  }),

  'bio.cell.anaerobic-respiration-fermentation': () => buildCellComparisonScene({
    conceptId: 'bio.cell.anaerobic-respiration-fermentation',
    title: 'Anaerobic Respiration and Fermentation',
    teachingGoal: 'Contrast the ATP yield and products of aerobic and anaerobic pathways when oxygen is limiting.',
    groups: [
      { label: 'Aerobic respiration', description: 'oxygen present, high ATP yield', items: ['Full breakdown of glucose', 'High ATP yield'] },
      { label: 'Lactic acid fermentation', description: 'oxygen limited, occurs in animal muscle and lactic acid bacteria', items: ['Glucose -> lactic acid', 'Low ATP yield'] },
      { label: 'Alcoholic fermentation', description: 'oxygen absent, occurs in yeast', items: ['Glucose -> ethanol + CO2', 'Low ATP yield'] },
    ],
  }),

  // The Hanahan-Weinberg hallmarks are seven independent, coexisting
  // hallmarks of an integrative framework — a hub, not a sequence, matching
  // the concept's own KG description exactly.
  'bio.cell.cancer-biology-hallmarks': () => buildCellHubScene({
    conceptId: 'bio.cell.cancer-biology-hallmarks',
    hubLabel: 'Hallmarks of Cancer',
    title: 'Hallmarks of Cancer',
    teachingGoal: 'Name the Hanahan-Weinberg hallmarks as independent breakdowns of normally regulated cell behaviour.',
    spokes: [
      { name: 'Sustained proliferative signalling', description: 'the cell drives its own division continuously' },
      { name: 'Evasion of growth suppressors', description: 'the cell ignores signals that would normally stop division' },
      { name: 'Resistance to apoptosis', description: 'the cell evades programmed cell death' },
      { name: 'Replicative immortality', description: 'the cell divides without the normal limit on cell divisions' },
      { name: 'Angiogenesis induction', description: 'the tumour induces new blood vessels to supply itself' },
      { name: 'Invasion and metastasis', description: 'cells invade nearby tissue and spread to distant sites' },
      { name: 'Metabolic reprogramming', description: 'the cell rewires its metabolism to support rapid growth' },
    ],
  }),

  // Loss of adhesion (EMT) is one shared event that leads to two different
  // outcomes depending on context — a branching END, the mirror image of
  // apoptosis's branching START above.
  'bio.cell.cell-adhesion-tissue-organization': () => buildCellPathwayScene({
    conceptId: 'bio.cell.cell-adhesion-tissue-organization',
    title: 'Cell Adhesion and Tissue Organisation',
    teachingGoal: 'Trace how the same loss of cell adhesion underlies both normal development and pathological invasion.',
    stages: [
      { name: 'Adhesion molecules', description: 'cadherins, selectins and integrins hold cells together and to the matrix' },
      { name: 'Epithelial-mesenchymal transition', description: 'cells reversibly lose adhesion and polarity' },
    ],
    branchEnd: [
      { name: 'Normal development', description: 'the same loss of adhesion drives gastrulation and wound healing.' },
      { name: 'Pathological invasion', description: 'the same loss of adhesion underlies cancer cells invading nearby tissue.' },
    ],
  }),

  'bio.cell.cell-junctions-extracellular-matrix': () => buildCellComparisonScene({
    conceptId: 'bio.cell.cell-junctions-extracellular-matrix',
    title: 'Cell Junctions and the Extracellular Matrix',
    teachingGoal: 'Distinguish the junctions that connect cells from the matrix that surrounds them.',
    groups: [
      { label: 'Cell junctions', description: 'structures connecting adjacent cells', items: ['Tight junctions (seal)', 'Desmosomes (anchor)', 'Gap junctions (communicate)'] },
      { label: 'Extracellular matrix', description: 'the structural and signalling scaffold outside the cell', items: ['Collagen', 'Proteoglycans', 'Fibronectin', 'Integrin receptors'] },
    ],
  }),

  'bio.cell.cytoskeleton-motility': () => buildCellComparisonScene({
    conceptId: 'bio.cell.cytoskeleton-motility',
    title: 'Cytoskeletal Motility',
    teachingGoal: 'Distinguish actin-based crawling from the two opposite-direction microtubule motor proteins.',
    groups: [
      { label: 'Actin-myosin crawling', description: 'drives cell crawling, distinct from muscle contraction', items: ['Cell migration'] },
      { label: 'Kinesin', description: 'a microtubule motor protein carrying cargo outward', items: ['Cargo transport toward the cell periphery'] },
      { label: 'Dynein', description: 'a microtubule motor protein carrying cargo inward, also driving the 9+2 axoneme beat', items: ['Cargo transport toward the cell centre', 'Cilia/flagella beating'] },
    ],
  }),

  'bio.cell.membrane-transport-energetics': () => buildCellComparisonScene({
    conceptId: 'bio.cell.membrane-transport-energetics',
    title: 'Energetics of Membrane Transport',
    teachingGoal: 'Reason about transport direction from its free-energy cost along the electrochemical gradient.',
    groups: [
      { label: 'Passive transport', description: 'moves down the electrochemical gradient, no free-energy cost', items: ['No ATP required'] },
      { label: 'Primary active transport', description: 'ATP directly drives movement against the gradient', items: ['ATP-driven pumps'] },
      { label: 'Secondary active transport', description: 'uses an existing gradient, set up by primary active transport, to move a second solute', items: ['Symport', 'Antiport'] },
    ],
  }),

  // ══ BIOLOGY END-USER-READY VISUAL GAP FIX (2026-09-25) ══
  //
  // Two Biology concepts had NO static (Tier 0/1) visual binding at all
  // (hasBinding:false) and relied entirely on Tier 3 live generation — which,
  // measured live in production (real-learner QA, 2026-09-24, disposable-
  // account-equivalent driving of the deployed app), got stuck rejecting the
  // SAME regenerated candidate on every explicit "show me a diagram" request
  // (`no-figure:critic-reject-cached`, then `no-figure:retry-identical-figure`
  // on the explicit-request retry — see photosynthesisVisualServingLedger.
  // test.ts's own 2026-09-23 finding for bio.plant.photosynthesis, and the
  // 2026-09-24 QA transcript for bio.immuno.immune-disorders, which showed the
  // identical symptom on a second, unrelated concept). A deterministic
  // Tier-0 scene sidesteps this failure mode entirely — Tier 0 is checked
  // before Tier 3 is ever consulted, so neither concept depends on the
  // generator/critic loop converging any more.
  //
  // Both scenes reuse the existing generic pathway/comparison generators
  // (no new generator authored) and are grounded strictly in what each
  // concept's own Educational Brain entry says is ACTUALLY TAUGHT — not the
  // raw KG description's fuller scope. Both EB entries explicitly flag extra
  // KG-description detail (photosystems I/II and C4/CAM for photosynthesis;
  // organ transplant rejection for immune disorders) as an untaught content
  // gap ("Curriculum Feedback"), so neither is drawn here — showing it would
  // depict something the lesson's own words never actually say.
  'bio.plant.photosynthesis': () => buildCellPathwayScene({
    conceptId: 'bio.plant.photosynthesis',
    title: 'Photosynthesis: Two Coupled Stages',
    teachingGoal: 'The Calvin cycle depends on the ATP/NADPH the light reactions produce, not on light directly.',
    stages: [
      { name: 'Light-Dependent Reactions', description: 'In the thylakoid membranes, chlorophyll absorbs light energy and splits water (photolysis), releasing O2 as a by-product and producing ATP and NADPH.' },
      { name: 'Calvin Cycle', description: 'In the stroma, the ATP and NADPH from stage one drive CO2 fixation: CO2 combines with RuBP via the enzyme RuBisCO, is reduced to G3P used to build glucose, and RuBP is regenerated to keep the cycle running.' },
    ],
  }),

  'bio.immuno.immune-disorders': () => buildCellComparisonScene({
    conceptId: 'bio.immuno.immune-disorders',
    title: 'Immune Disorders: Three Failure Modes',
    teachingGoal: 'Autoimmune disease and allergy are BOTH overactivity problems (misdirected or overreacting); only immunodeficiency is underactivity — none of the three is a generic "weak immune system."',
    groups: [
      { label: 'Autoimmune disease', description: 'tolerance failure — T and B cells attack the body’s own tissue', items: ['Type 1 diabetes (pancreatic β-cells)', 'Rheumatoid arthritis (joints)', 'Multiple sclerosis (myelin)', 'Lupus (multiple organs)'] },
      { label: 'Allergy', description: 'Type I hypersensitivity — an IgE-mediated overreaction to a harmless antigen', items: ['Sensitisation: IgE binds mast cells, no symptoms', 'Re-exposure: cross-linking triggers degranulation', 'Anaphylaxis: the severe, systemic form'] },
      { label: 'Immunodeficiency', description: 'the immune system fails to defend against real pathogens', items: ['Primary: genetic (e.g. SCID)', 'Secondary: acquired (e.g. HIV destroys CD4⁺ T cells, causing AIDS)'] },
    ],
  }),

  // ══ BIOLOGY VISUAL COVERAGE CAMPAIGN (2026-09-25) ══
  //
  // Live diagnostic sweep (16 concepts, one per Biology domain, driven
  // against the real deployed app) found roughly 3 in 4 of Biology's 161
  // concepts with NO static Tier 0/1 binding get permanently stuck: an
  // explicit "show me a diagram" request never produces a figure, on
  // repeated distinct phrasings across a fresh session — the identical
  // failure shape already fixed for bio.plant.photosynthesis and
  // bio.immuno.immune-disorders above, just far more widespread than those
  // two isolated cases suggested. This section works through the affected
  // concepts in KG order, in batches, each grounded strictly in that
  // concept's own Educational Brain "Core Understanding" (never the raw KG
  // description alone, and never inventing structure the EB entry does not
  // state), reusing the four existing generators — no new generator, no
  // per-concept bespoke rendering code.
  //
  // Batch 1 (bio.found, 8 concepts; bio.mol, 4 concepts):
  'bio.found.what-is-biology': () => buildCellHubScene({
    conceptId: 'bio.found.what-is-biology',
    hubLabel: 'Biology',
    title: "Biology's Branches Are Entry Angles, Not Separate Subjects",
    teachingGoal: 'A real biological question routinely needs more than one branch at once — they are angles on one object (life), not independent silos.',
    spokes: [
      { name: 'Botany', description: 'the study of plants' },
      { name: 'Zoology', description: 'the study of animals' },
      { name: 'Microbiology', description: 'the study of microorganisms' },
      { name: 'Physiology', description: 'how living systems function' },
      { name: 'Ecology', description: 'how organisms interact with each other and their environment' },
      { name: 'Genetics', description: 'how traits are inherited and change across generations' },
    ],
  }),

  'bio.found.characteristics-of-life': () => buildCellHubScene({
    conceptId: 'bio.found.characteristics-of-life',
    hubLabel: 'Is it alive?',
    title: 'The Seven Characteristics of Life',
    teachingGoal: 'Life is the JOINT presence of all seven properties, not any single one — a candidate lacking even one core property (fire has no cells, no homeostasis, no heredity) is not alive.',
    spokes: [
      { name: 'Cellular organisation', description: 'built from one or more cells' },
      { name: 'Metabolism', description: 'chemical reactions that acquire and use energy' },
      { name: 'Homeostasis', description: 'actively maintaining a stable internal state' },
      { name: 'Growth', description: 'an orderly, genetically directed increase in size or complexity' },
      { name: 'Reproduction', description: 'the lineage’s capacity to produce offspring' },
      { name: 'Response to stimuli', description: 'detecting and reacting to environmental signals' },
      { name: 'Heredity and evolution', description: 'transmitting, and sometimes changing, genetically encoded information' },
    ],
  }),

  'bio.found.classification-need': () => buildCellPathwayScene({
    conceptId: 'bio.found.classification-need',
    title: 'The Taxonomic Hierarchy: Increasingly Exclusive at Each Step',
    teachingGoal: 'Placing two organisms close together in the hierarchy is a testable hypothesis about shared ancestry, not a bookkeeping convenience.',
    stages: [
      { name: 'Domain', description: 'the broadest, most inclusive rank' },
      { name: 'Kingdom', description: 'e.g. Animalia' },
      { name: 'Phylum', description: 'e.g. Chordata' },
      { name: 'Class', description: 'e.g. Mammalia' },
      { name: 'Order', description: 'e.g. Carnivora' },
      { name: 'Family', description: 'e.g. Felidae' },
      { name: 'Genus', description: 'e.g. Panthera — species sharing a genus predict shared biology (lions and tigers can hybridise)' },
      { name: 'Species', description: 'the most specific, most exclusive rank' },
    ],
  }),

  'bio.found.five-kingdom': () => buildCellComparisonScene({
    conceptId: 'bio.found.five-kingdom',
    title: "Whittaker's Five Kingdoms",
    teachingGoal: 'Cell type, body organisation, and nutrition mode decide placement — not visual resemblance (fungi resemble plants but are placed separately).',
    groups: [
      { label: 'Monera', description: 'prokaryotic — separated from the other four by cell type alone', items: ['Prokaryotic'] },
      { label: 'Protista', description: 'eukaryotic, unicellular', items: ['Unicellular'] },
      { label: 'Fungi', description: 'eukaryotic, multicellular, absorptive heterotrophs with chitin walls', items: ['Chitin cell walls', 'Absorptive heterotroph'] },
      { label: 'Plantae', description: 'eukaryotic, multicellular, autotrophs with cellulose walls and chlorophyll', items: ['Cellulose cell walls', 'Autotroph'] },
    ],
  }),

  'bio.found.binomial-nomenclature': () => buildCellStructureScene({
    conceptId: 'bio.found.binomial-nomenclature',
    subject: 'Scientific Name Format',
    boundaryLabel: 'Homo sapiens',
    teachingGoal: 'The genus may be abbreviated after its first use; the species epithet is NEVER used alone — it only identifies anything within its genus.',
    parts: [
      { name: 'Genus: Homo', description: 'capitalised; may be abbreviated to H. after its first full use in a document' },
      { name: 'species: sapiens', description: 'lowercase; never used alone, and never capitalised' },
      { name: 'Whole name italicised', description: 'the entire binomial is italicised (or underlined by hand)' },
    ],
  }),

  'bio.found.viruses-viroids-lichens': () => buildCellComparisonScene({
    conceptId: 'bio.found.viruses-viroids-lichens',
    title: 'Viruses, Viroids and Lichens: Three Different Things',
    teachingGoal: 'These three sit outside the five-kingdom system for entirely different reasons — conflating them is a category error.',
    groups: [
      { label: 'Virus', description: 'acellular — a nucleic-acid genome in a protein capsid, inert until it hijacks a host cell', items: ['DNA or RNA genome, never both', 'Protein capsid', 'No metabolism outside a host'] },
      { label: 'Viroid', description: 'simpler than a virus — naked, circular RNA with no protein coat at all', items: ['Naked circular RNA', 'No capsid', 'Plant disease only'] },
      { label: 'Lichen', description: 'not acellular or viral — a genuine mutualistic symbiosis of two full organisms', items: ['Fungus: structure and water retention', 'Alga or cyanobacterium: photosynthetic sugars'] },
    ],
  }),

  'bio.found.microscopy-basics': () => buildCellComparisonScene({
    conceptId: 'bio.found.microscopy-basics',
    title: 'Magnification vs. Resolution: Two Independent Properties',
    teachingGoal: 'Increasing magnification past the resolution limit only enlarges the existing blur — it reveals no new detail.',
    groups: [
      { label: 'Light microscope', description: 'limited by the wavelength of visible light', items: ['Resolution ceiling ≈ 200 nm'] },
      { label: 'Electron microscope', description: 'uses electrons, a much shorter effective wavelength', items: ['Resolution ≈ 0.1 nm — 2000× finer', 'Resolves a membrane or organelle’s internal architecture'] },
    ],
  }),

  'bio.found.biomes-levels-of-organisation': () => buildCellPathwayScene({
    conceptId: 'bio.found.biomes-levels-of-organisation',
    title: 'Levels of Biological Organisation',
    teachingGoal: 'Each level has emergent properties genuinely absent below it — a heart can pump; no single heart cell can.',
    stages: [
      { name: 'Molecules', description: 'the chemical building blocks' },
      { name: 'Organelles', description: 'specialised structures within a cell' },
      { name: 'Cell', description: 'the basic unit of life' },
      { name: 'Tissue', description: 'a group of similar cells working together' },
      { name: 'Organ', description: 'e.g. the heart — can pump; no single cell below this level can' },
      { name: 'Organ system', description: 'organs working together, e.g. the circulatory system' },
      { name: 'Organism', description: 'a complete individual living thing' },
      { name: 'Population', description: 'all individuals of ONE species sharing an area' },
      { name: 'Community', description: 'adds every OTHER species sharing that same area' },
      { name: 'Ecosystem', description: 'adds the non-living, abiotic environment on top of the community' },
      { name: 'Biome', description: 'a large region defined by its climate and dominant ecosystem type' },
      { name: 'Biosphere', description: 'all life on Earth, together' },
    ],
  }),

  'bio.mol.biomolecule-types': () => buildCellComparisonScene({
    conceptId: 'bio.mol.biomolecule-types',
    title: 'The Four Classes of Biomolecule',
    teachingGoal: 'Lipids carry an essential structural role (membranes), not merely an energy-storage role.',
    groups: [
      { label: 'Carbohydrates', description: 'monosaccharide monomers; short-term energy and structural support', items: ['C, H, O'] },
      { label: 'Proteins', description: 'amino acid monomers (20 types); catalysis, structure, transport, immune defence', items: ['C, H, O, N, (S)'] },
      { label: 'Lipids', description: 'glycerol + fatty acids, not a true polymer; membranes, energy storage, signalling', items: ['C, H, O'] },
      { label: 'Nucleic acids', description: 'nucleotide monomers; storing and transmitting genetic information', items: ['C, H, O, N, P'] },
    ],
  }),

  'bio.mol.carbohydrates-lipids': () => buildCellComparisonScene({
    conceptId: 'bio.mol.carbohydrates-lipids',
    title: 'Carbohydrates and Lipids',
    teachingGoal: 'Starch and cellulose share the identical glucose monomer — they differ in digestibility purely because of bond geometry (alpha vs. beta), not monomer identity.',
    groups: [
      { label: 'Carbohydrates', description: 'a size-based hierarchy: mono-, di-, and polysaccharides', items: ['Monosaccharides: glucose, fructose, galactose', 'Disaccharides: maltose, sucrose, lactose', 'Starch/glycogen (α-linked, digestible energy storage)', 'Cellulose (β-linked, indigestible plant structure)'] },
      { label: 'Lipids', description: 'defined by a shared PROPERTY — hydrophobicity — not a shared structure', items: ['Triglycerides: energy storage', 'Phospholipids: the cell membrane bilayer', 'Steroids: e.g. cholesterol', 'Waxes: water-repellent coatings'] },
    ],
  }),

  'bio.mol.proteins-structure': () => buildCellPathwayScene({
    conceptId: 'bio.mol.proteins-structure',
    title: 'The Four Levels of Protein Structure',
    teachingGoal: 'Denaturation is the loss of secondary/tertiary/quaternary structure, WITHOUT necessarily breaking the primary sequence itself.',
    stages: [
      { name: 'Primary', description: 'the linear sequence of amino acids, set directly by the gene' },
      { name: 'Secondary', description: 'local folding patterns — the alpha-helix and beta-sheet' },
      { name: 'Tertiary', description: 'the overall 3D fold of one complete chain — fully determines a single-chain protein’s functional shape' },
      { name: 'Quaternary', description: 'assembly of MULTIPLE chains — e.g. haemoglobin’s four globin chains together' },
    ],
  }),

  'bio.mol.enzymes': () => buildCellComparisonScene({
    conceptId: 'bio.mol.enzymes',
    title: 'Competitive vs. Non-Competitive Enzyme Inhibition',
    teachingGoal: 'The diagnostic test: does adding more substrate restore activity? Only competitive inhibition is reversed this way.',
    groups: [
      { label: 'Competitive inhibition', description: 'the inhibitor resembles the substrate and competes for the SAME active site', items: ['Reversible by adding more substrate'] },
      { label: 'Non-competitive inhibition', description: 'the inhibitor binds a DIFFERENT (allosteric) site, changing the active site indirectly', items: ['NOT reversed by adding more substrate'] },
    ],
  }),

  // Batch 2 (bio.mol, 4 concepts; bio.gen, 6 concepts; bio.evo, 2 concepts):
  'bio.mol.nucleic-acid-structure': () => buildCellComparisonScene({
    conceptId: 'bio.mol.nucleic-acid-structure',
    title: 'DNA vs. RNA',
    teachingGoal: 'A always pairs with T (or U in RNA); G always pairs with C — obligate base pairing is why %A = %T and %G = %C in double-stranded DNA (Chargaff’s rules).',
    groups: [
      { label: 'DNA', description: 'double helix, antiparallel strands held by base pairing', items: ['Sugar: deoxyribose', 'Bases: A, T, G, C', 'Double-stranded'] },
      { label: 'RNA', description: 'typically single-stranded; three types (mRNA, tRNA, rRNA)', items: ['Sugar: ribose', 'Bases: A, U, G, C', 'Usually single-stranded'] },
    ],
  }),

  'bio.mol.transcription': () => buildCellPathwayScene({
    conceptId: 'bio.mol.transcription',
    title: 'Transcription: DNA to mRNA',
    teachingGoal: 'Only ONE DNA strand (the template) is read, 3′→5′, to build RNA 5′→3′ — with U substituted everywhere DNA would use T.',
    stages: [
      { name: 'Initiation', description: 'RNA polymerase binds the promoter, guided by transcription factors; the helix unwinds locally' },
      { name: 'Elongation', description: 'RNA polymerase reads the template strand 3′→5′ and builds the RNA chain 5′→3′' },
      { name: 'Termination', description: 'RNA polymerase reaches the terminator, detaches, and releases the transcript' },
      { name: 'RNA processing (eukaryotes)', description: 'a 5′ cap and poly-A tail are added; introns are spliced out, leaving only exons in the mature mRNA' },
    ],
  }),

  'bio.mol.translation-genetic-code': () => buildCellPathwayScene({
    conceptId: 'bio.mol.translation-genetic-code',
    title: 'Translation: mRNA to Protein',
    teachingGoal: 'mRNA carries the code (codons); tRNA carries amino acids and matches its anticodon to the codon — it does not itself carry "the code."',
    stages: [
      { name: 'Initiation', description: 'the ribosome assembles at the start codon (AUG); initiator tRNA carrying methionine binds the P site' },
      { name: 'Elongation', description: 'a tRNA with a complementary anticodon enters the A site; a peptide bond forms; the ribosome moves one codon forward' },
      { name: 'Termination', description: 'a stop codon (UAA, UAG, or UGA) enters the A site; a release factor cleaves the finished polypeptide' },
    ],
  }),

  'bio.mol.gene-regulation': () => buildCellComparisonScene({
    conceptId: 'bio.mol.gene-regulation',
    title: 'The lac Operon: Negative-Feedback Regulation',
    teachingGoal: 'The operon switches off by default and switches on only when its specific substrate signal (lactose) is present.',
    groups: [
      { label: 'Lactose absent', description: 'the repressor binds the operator, physically blocking RNA polymerase', items: ['Operon genes: OFF'] },
      { label: 'Lactose present', description: 'allolactose binds and inactivates the repressor, releasing RNA polymerase', items: ['Operon genes: ON'] },
    ],
  }),

  'bio.gen.gene-interactions': () => buildCellComparisonScene({
    conceptId: 'bio.gen.gene-interactions',
    title: 'Extensions of Mendelism',
    teachingGoal: 'These are precise, distinct departures from simple dominance — not interchangeable "exceptions to Mendel."',
    groups: [
      { label: 'Incomplete dominance', description: 'the heterozygote is an intermediate BLEND of both homozygous phenotypes', items: ['Neither allele fully dominant'] },
      { label: 'Codominance', description: 'BOTH alleles are fully expressed side by side, not blended', items: ['AB blood type: both A and B antigens present'] },
      { label: 'Multiple alleles', description: 'more than two allelic variants circulate in the population', items: ['ABO blood group: Iᴬ, Iᴮ, i → 4 phenotypes'] },
      { label: 'Epistasis', description: 'one gene’s expression masks a DIFFERENT gene entirely', items: ['Labrador coat colour: ee at the E locus masks the B locus'] },
    ],
  }),

  'bio.gen.chromosomal-theory-linkage': () => buildCellComparisonScene({
    conceptId: 'bio.gen.chromosomal-theory-linkage',
    title: 'Gene Linkage: Distance Predicts Recombination Frequency',
    teachingGoal: 'Recombination frequency is directly proportional to physical distance — this is the basis of gene mapping (1 centimorgan = 1% recombination).',
    groups: [
      { label: 'Tightly linked genes', description: 'located very close together on the same chromosome', items: ['Recombine only rarely (strong linkage)'] },
      { label: 'Loosely linked / unlinked genes', description: 'located far apart, or on different chromosomes entirely', items: ['Recombine ≈ 50% of the time, like Mendel’s independent assortment'] },
    ],
  }),

  'bio.gen.pedigree-human-genetics': () => buildCellComparisonScene({
    conceptId: 'bio.gen.pedigree-human-genetics',
    title: 'Four Pedigree Inheritance Patterns',
    teachingGoal: 'Each child’s outcome is an INDEPENDENT probabilistic event — one affected child does not change the next child’s probability.',
    groups: [
      { label: 'Autosomal dominant', description: 'appears in every generation; affects males and females equally', items: ['One copy of the allele is enough to show it'] },
      { label: 'Autosomal recessive', description: 'can skip generations via unaffected carriers', items: ['Affects males and females equally'] },
      { label: 'X-linked recessive', description: 'affected individuals are predominantly male (hemizygosity)', items: ['Affected father → all daughters are carriers, no sons affected'] },
      { label: 'X-linked dominant', description: 'appears every generation, like autosomal dominance, but with the same sex asymmetry', items: ['Affected father → all daughters affected, no sons'] },
    ],
  }),

  'bio.gen.mutations': () => buildCellComparisonScene({
    conceptId: 'bio.gen.mutations',
    title: 'Gene Mutations vs. Chromosomal Mutations',
    teachingGoal: 'Most mutations are neutral or harmful; a small fraction are beneficial — severity depends on type and location, not on whether a mutation occurred at all.',
    groups: [
      { label: 'Gene mutations', description: 'affect a single gene’s sequence', items: ['Substitution: silent, missense, or nonsense', 'Frameshift: insertion/deletion not a multiple of three'] },
      { label: 'Chromosomal mutations', description: 'affect chromosome number or large-scale structure', items: ['Aneuploidy: trisomy 21, Turner, Klinefelter', 'Structural: translocation, deletion, inversion, duplication'] },
    ],
  }),

  'bio.gen.population-genetics': () => buildCellHubScene({
    conceptId: 'bio.gen.population-genetics',
    hubLabel: 'Hardy-Weinberg Equilibrium',
    title: 'Four Forces That Disturb Hardy-Weinberg Equilibrium',
    teachingGoal: 'Dominance describes expression in heterozygotes — it says nothing about frequency trend or fitness; a dominant allele does not "win" over time.',
    spokes: [
      { name: 'Natural selection', description: 'differential survival/reproduction changes allele frequencies' },
      { name: 'Mutation', description: 'introduces new alleles into the population' },
      { name: 'Gene flow (migration)', description: 'moves alleles between populations' },
      { name: 'Genetic drift', description: 'random sampling variation, strongest in small populations (bottleneck, founder effects)' },
    ],
  }),

  'bio.gen.genetic-engineering': () => buildCellPathwayScene({
    conceptId: 'bio.gen.genetic-engineering',
    title: 'The Recombinant DNA Workflow',
    teachingGoal: 'Using the SAME restriction enzyme on both the gene of interest and the vector is precisely what guarantees their sticky ends are complementary.',
    stages: [
      { name: 'Cut', description: 'the gene of interest and the vector are cut with the SAME restriction enzyme, producing complementary sticky ends' },
      { name: 'Ligate', description: 'DNA ligase seals the fragments together into recombinant DNA' },
      { name: 'Transform', description: 'the recombinant DNA is introduced into host cells' },
      { name: 'Select', description: 'cells that took up the recombinant DNA are selected, e.g. via an antibiotic-resistance marker' },
    ],
  }),

  'bio.evo.origin-of-life': () => buildCellPathwayScene({
    conceptId: 'bio.evo.origin-of-life',
    title: 'Origin of Life: Chemical Evolution',
    teachingGoal: '"Origin of life" and "evolution" are distinct questions: origin-of-life explains how the first self-replicating units arose; evolution explains what happened after.',
    stages: [
      { name: 'Simple inorganic molecules', description: 'water, ammonia, methane, CO2 in the early atmosphere and oceans' },
      { name: 'Simple organic molecules form', description: 'energised by lightning, UV radiation, or hydrothermal heat (Miller–Urey: amino acids form spontaneously)' },
      { name: 'RNA World', description: 'RNA can both store genetic information AND catalyse reactions (as a ribozyme), resolving the DNA/protein chicken-and-egg problem' },
      { name: 'Membrane enclosure', description: 'a self-copying molecule becomes enclosed in a lipid membrane, forming a bounded, self-contained unit' },
      { name: 'Natural selection begins', description: 'selection acts on variation between these bounded units — life, as biology defines it, has begun' },
    ],
  }),

  'bio.evo.evidence-for-evolution': () => buildCellHubScene({
    conceptId: 'bio.evo.evidence-for-evolution',
    hubLabel: 'Evolution',
    title: 'Five Independent Lines of Evidence for Evolution',
    teachingGoal: 'Five completely different branches of science converge on the same conclusion — they could have contradicted each other, but instead consistently agree.',
    spokes: [
      { name: 'Fossil record', description: 'older rock layers hold simpler organisms; transitional forms like Archaeopteryx and Tiktaalik bridge major transitions' },
      { name: 'Comparative anatomy', description: 'homologous structures (a human arm, a bat wing, a whale flipper) share the same bones despite different functions' },
      { name: 'Comparative embryology', description: 'vertebrate embryos across very different adult forms look strikingly similar early on' },
      { name: 'Biogeography', description: 'island species resemble nearby mainland species more than other islands’ species under similar climates' },
      { name: 'Molecular biology', description: 'DNA/protein sequence similarity tracks evolutionary relatedness (cytochrome c: 0 differences human–chimp, 45 human–yeast)' },
    ],
  }),

  // Batch 3 (bio.evo, 3 concepts; bio.physio, 8 concepts — bio.plant.plant-
  // respiration confirmed already working via Tier 3 live in the diagnostic
  // sweep, so it is deliberately left unauthored here):
  'bio.evo.natural-selection': () => buildCellPathwayScene({
    conceptId: 'bio.evo.natural-selection',
    title: 'Natural Selection: Four Necessary Conditions',
    teachingGoal: '"Fitness" means reproductive success in the CURRENT environment specifically — not strength, speed, or any generic superiority.',
    stages: [
      { name: 'Variation', description: 'individuals within the population differ in heritable traits' },
      { name: 'Heredity', description: 'that variation is passed from parents to offspring' },
      { name: 'Differential reproduction', description: 'some heritable variants confer greater survival/reproductive success in the current environment' },
      { name: 'Time', description: 'across many generations, the population’s trait frequencies shift toward the more successful variants' },
    ],
  }),

  'bio.evo.modern-synthesis-speciation': () => buildCellComparisonScene({
    conceptId: 'bio.evo.modern-synthesis-speciation',
    title: 'Allopatric vs. Sympatric Speciation',
    teachingGoal: 'Geographic isolation can persist even after the physical barrier is removed — genetic divergence itself, not just the barrier, now prevents interbreeding.',
    groups: [
      { label: 'Allopatric speciation', description: 'a geographic barrier separates populations, which diverge independently', items: ['Mountain range or body of water'] },
      { label: 'Sympatric speciation', description: 'reproductive isolation arises WITHOUT a geographic barrier', items: ['Polyploidy in plants (single-generation isolation)', 'Assortative mating', 'Niche specialisation'] },
    ],
  }),

  'bio.evo.human-evolution': () => buildCellPathwayScene({
    conceptId: 'bio.evo.human-evolution',
    title: 'Hominin Milestones in Chronological Order',
    teachingGoal: 'Humans evolved from a common ancestor SHARED with chimpanzees, not from chimpanzees themselves — evolution is not a ladder with humans at the top.',
    stages: [
      { name: 'Bipedalism', description: '≈ 4 million years ago, Australopithecus afarensis (“Lucy”) — hands freed for tool use, before brain size increased' },
      { name: 'Brain expansion', description: '≈ 2 million years ago, Homo habilis, associated with the first stone tools' },
      { name: 'Homo erectus', description: '≈ 1.9 million years ago — first hominin to leave Africa, controlled fire' },
      { name: 'Homo sapiens', description: '≈ 300,000 years ago in Africa; behaviourally modern traits appear later, ≈ 100,000–70,000 years ago' },
      { name: 'Out of Africa', description: '≈ 60,000–70,000 years ago, migration out of Africa and interbreeding with Neanderthals/Denisovans' },
    ],
  }),

  'bio.physio.digestive-system': () => buildCellPathwayScene({
    conceptId: 'bio.physio.digestive-system',
    title: 'The Digestive Tract: One Tube, Different Jobs by Region',
    teachingGoal: 'Digestion and absorption are not the same process, and they are not evenly distributed along the tube.',
    stages: [
      { name: 'Mouth', description: 'salivary amylase begins starch digestion at near-neutral pH' },
      { name: 'Stomach', description: 'pepsin works at pH 1–2; acid denatures proteins and activates pepsin — almost nothing is absorbed here' },
      { name: 'Small intestine', description: 'most chemical digestion AND essentially all nutrient absorption, via villi/microvilli' },
      { name: 'Large intestine', description: 'reabsorbs water and minerals; resident bacteria produce vitamin K and some B vitamins — no significant digestion here' },
    ],
  }),

  'bio.physio.respiratory-system': () => buildCellComparisonScene({
    conceptId: 'bio.physio.respiratory-system',
    title: 'Ventilation vs. Gas Exchange: Two Separate Mechanisms',
    teachingGoal: 'The lungs are passive elastic bags — they expand only because muscles create a pressure difference; they do not expand themselves.',
    groups: [
      { label: 'Ventilation (breathing)', description: 'mechanical, muscle-driven', items: ['Diaphragm contracts → thorax volume up → pressure drops → air flows in'] },
      { label: 'Gas exchange (at the alveoli)', description: 'diffusion-driven, requires no additional energy', items: ['O2 in, CO2 out, each down its own concentration gradient'] },
    ],
  }),

  'bio.physio.circulatory-system': () => buildCellComparisonScene({
    conceptId: 'bio.physio.circulatory-system',
    title: 'Double Circulation: Two Loops, One Heart',
    teachingGoal: 'Arteries carry blood AWAY from the heart, veins carry it TOWARD the heart — a direction-based rule, not an oxygen-content rule (the pulmonary artery carries deoxygenated blood).',
    groups: [
      { label: 'Pulmonary circulation', description: 'right ventricle → lungs → left atrium; blood loses CO2, gains O2', items: ['Pulmonary artery carries DEOXYGENATED blood'] },
      { label: 'Systemic circulation', description: 'left ventricle → body tissues → right atrium; O2 delivered, CO2 collected', items: ['Left side: high pressure, reaches the whole body'] },
    ],
  }),

  'bio.physio.excretory-system': () => buildCellPathwayScene({
    conceptId: 'bio.physio.excretory-system',
    title: 'The Nephron: Three Sequential Processes',
    teachingGoal: 'Selectivity comes from REABSORPTION, not filtration — glucose and urea are filtered together, non-selectively, then glucose is reclaimed afterward.',
    stages: [
      { name: 'Ultrafiltration', description: 'high blood pressure in the glomerulus forces small molecules (water, glucose, urea, ions) into the Bowman’s capsule — non-selective' },
      { name: 'Selective reabsorption', description: 'essentially all glucose, most water, and useful ions are actively reabsorbed back into the blood' },
      { name: 'Secretion', description: 'some substances (H⁺ ions, certain drugs) are actively secreted directly into the tubule' },
    ],
  }),

  'bio.physio.nervous-system': () => buildCellPathwayScene({
    conceptId: 'bio.physio.nervous-system',
    title: 'The Action Potential: An Ion-Driven Cycle',
    teachingGoal: 'A stronger stimulus does NOT produce a bigger impulse (all-or-nothing) — it produces MORE impulses per unit time (frequency coding).',
    cyclic: true,
    stages: [
      { name: 'Resting potential', description: '≈ −70 mV, inside negative relative to outside' },
      { name: 'Depolarisation', description: 'voltage-gated Na⁺ channels open, Na⁺ floods in, inside becomes positive (≈ +40 mV)' },
      { name: 'Repolarisation', description: 'K⁺ channels open, K⁺ flows out, restoring the negative internal charge' },
      { name: 'Restoration', description: 'the Na⁺/K⁺ pump restores the original resting potential, ready for the next impulse' },
    ],
  }),

  'bio.physio.endocrine-system': () => buildCellComparisonScene({
    conceptId: 'bio.physio.endocrine-system',
    title: 'Insulin vs. Glucagon: An Antagonistic Pair',
    teachingGoal: 'Insulin does not destroy glucose — it signals cells to absorb it and the liver to store it as glycogen. Glucose is used or stored, never destroyed.',
    groups: [
      { label: 'Insulin', description: 'lowers blood glucose', items: ['Signals cells to absorb glucose', 'Signals the liver to store glucose as glycogen'] },
      { label: 'Glucagon', description: 'raises blood glucose', items: ['Signals the liver to convert glycogen back into glucose'] },
    ],
  }),

  'bio.physio.musculoskeletal-system': () => buildCellPathwayScene({
    conceptId: 'bio.physio.musculoskeletal-system',
    title: 'The Sliding Filament Mechanism',
    teachingGoal: 'The A band stays constant: the filaments themselves do not shorten — actin SLIDES over myosin, increasing their overlap.',
    stages: [
      { name: 'Calcium release', description: 'nerve stimulation releases Ca²⁺ from the sarcoplasmic reticulum' },
      { name: 'Binding sites exposed', description: 'Ca²⁺ moves the troponin-tropomyosin system, exposing actin’s myosin-binding sites' },
      { name: 'Myosin pulls actin', description: 'myosin binds actin and pulls it inward using ATP' },
      { name: 'Sarcomere shortens', description: 'Z-lines move closer, H zone and I band narrow — but the A band stays constant' },
    ],
  }),

  'bio.physio.immune-system-intro': () => buildCellComparisonScene({
    conceptId: 'bio.physio.immune-system-intro',
    title: 'Innate vs. Adaptive Immunity',
    teachingGoal: 'Immunological memory is the entire mechanism vaccination exploits — training adaptive immunity to make memory cells without the disease occurring first.',
    groups: [
      { label: 'Innate immunity', description: 'fast, non-specific, reacts identically to any pathogen within minutes to hours', items: ['Physical barriers, inflammation, fever', 'Phagocytes, natural killer cells'] },
      { label: 'Adaptive immunity', description: 'slow (days to weeks), specific to ONE pathogen', items: ['B cells: antibodies', 'T cells: coordinate response, destroy infected cells', 'Immunological memory'] },
    ],
  }),

  // Batch 4 (bio.plant, 3 concepts; bio.repro, 5 concepts; bio.dev, 3
  // concepts; bio.micro, 1 concept):
  'bio.plant.plant-water-relations': () => buildCellPathwayScene({
    conceptId: 'bio.plant.plant-water-relations',
    title: 'The Cohesion-Tension Mechanism',
    teachingGoal: 'Water is not pumped up the plant — no pump exists anywhere. Removing the leaves stops water movement almost immediately, because the pulling force is lost.',
    stages: [
      { name: 'Transpiration', description: 'water evaporates from leaf stomata, creating tension — a pulling force — at the top of the xylem' },
      { name: 'Cohesion and adhesion', description: 'water molecules stick to each other (cohesion) and to the xylem walls (adhesion), moving as one unbroken column' },
      { name: 'Water enters the roots', description: 'osmosis pulls water from the soil (higher water potential) into root hair cells (lower water potential)' },
    ],
  }),

  'bio.plant.mineral-nutrition': () => buildCellComparisonScene({
    conceptId: 'bio.plant.mineral-nutrition',
    title: 'Macronutrients vs. Micronutrients',
    teachingGoal: 'Plants do not "feed from soil" for bulk mass — that comes from CO2 and water. Soil minerals are essential in small quantities for specific molecules.',
    groups: [
      { label: 'Macronutrients', description: 'needed in large amounts', items: ['Nitrogen: amino acids, proteins, chlorophyll', 'Phosphorus: nucleic acids, ATP', 'Potassium: enzyme activation, guard cells', 'Magnesium: the central atom in chlorophyll'] },
      { label: 'Micronutrients', description: 'needed only in trace amounts', items: ['Iron (enzyme cofactor)', 'Manganese, zinc, copper, boron, molybdenum'] },
    ],
  }),

  'bio.plant.plant-growth-hormones': () => buildCellComparisonScene({
    conceptId: 'bio.plant.plant-growth-hormones',
    title: 'The Five Plant Hormones',
    teachingGoal: '"Auxins always promote growth" is false — the same concentration that promotes shoot elongation INHIBITS root elongation.',
    groups: [
      { label: 'Auxins (IAA)', description: 'cell elongation in shoot tips; redistributes with light and gravity', items: ['Phototropism: migrates to the shaded side'] },
      { label: 'Gibberellins', description: 'stem elongation, seed germination, breaking dormancy', items: [] },
      { label: 'Cytokinins', description: 'cell division; delays leaf senescence', items: [] },
      { label: 'Abscisic acid', description: 'the "stress hormone" — stomatal closure, dormancy', items: [] },
      { label: 'Ethylene', description: 'a GAS, not a liquid signal — fruit ripening, abscission', items: [] },
    ],
  }),

  'bio.repro.asexual-reproduction': () => buildCellComparisonScene({
    conceptId: 'bio.repro.asexual-reproduction',
    title: 'Six Methods of Asexual Reproduction',
    teachingGoal: '"Clones" sharing identical nuclear DNA are not identical in every respect — epigenetics, mitochondrial DNA, and environment can still differ (Dolly the sheep).',
    groups: [
      { label: 'Binary fission', description: 'one parent cell divides into two equal daughter cells', items: ['Bacteria'] },
      { label: 'Budding', description: 'a new individual forms as a physical outgrowth, then detaches', items: ['Yeast, Hydra'] },
      { label: 'Fragmentation', description: 'a broken-off piece regenerates into a complete new individual', items: ['Starfish, flatworms'] },
      { label: 'Sporulation', description: 'spores germinate into new individuals', items: ['Fungi, ferns'] },
      { label: 'Vegetative propagation', description: 'new plants grow from non-reproductive structures', items: ['Potato tubers, strawberry stolons'] },
      { label: 'Parthenogenesis', description: 'an unfertilised egg develops directly into an adult', items: ['Some insects and reptiles'] },
    ],
  }),

  'bio.repro.sexual-reproduction-plants': () => buildCellPathwayScene({
    conceptId: 'bio.repro.sexual-reproduction-plants',
    title: 'Double Fertilisation: Two Fusions, Two Products',
    teachingGoal: 'This is genuinely a DOUBLE event producing two distinct products from two separate fusions — not one fertilisation event with one outcome.',
    stages: [
      { name: 'Pollen tube delivers two sperm nuclei', description: 'after pollination, the pollen tube grows down the style to reach the ovule' },
    ],
    branchEnd: [
      { name: 'Sperm 1 + egg cell', description: 'forms the diploid zygote' },
      { name: 'Sperm 2 + polar nuclei', description: 'forms the TRIPLOID endosperm, the seed’s food store' },
    ],
  }),

  'bio.repro.human-reproductive-system': () => buildCellPathwayScene({
    conceptId: 'bio.repro.human-reproductive-system',
    title: 'The Menstrual Cycle',
    teachingGoal: 'Ovulation timing tracks the LH surge, not a fixed "day 14" — fertilisation occurs in the Fallopian tube, not the uterus.',
    cyclic: true,
    stages: [
      { name: 'Follicular phase', description: 'FSH stimulates follicle maturation; oestrogen rises' },
      { name: 'LH surge and ovulation', description: 'rising oestrogen triggers the LH surge, causing the mature follicle to rupture and release the egg' },
      { name: 'Luteal phase', description: 'the ruptured follicle becomes the corpus luteum, secreting progesterone to maintain the uterine lining' },
      { name: 'Menstruation', description: 'if fertilisation does not occur, the corpus luteum degenerates, progesterone drops, and the lining sheds' },
    ],
  }),

  'bio.repro.fertilisation-development': () => buildCellPathwayScene({
    conceptId: 'bio.repro.fertilisation-development',
    title: 'Early Embryonic Development',
    teachingGoal: 'Maternal and fetal blood do NOT mix in a healthy pregnancy — the placenta is a selectively permeable barrier, not an open connection.',
    stages: [
      { name: 'Fertilisation', description: 'capacitation, acrosome reaction, and cortical reaction (preventing polyspermy) in the Fallopian tube' },
      { name: 'Cleavage', description: 'the zygote divides by mitosis without growing, forming a morula then a blastocyst' },
      { name: 'Implantation', description: 'the blastocyst embeds in the uterine wall, around day 6–10' },
      { name: 'Gastrulation', description: 'the three germ layers form: ectoderm, mesoderm, endoderm' },
      { name: 'Neurulation', description: 'the neural plate folds into the neural tube' },
      { name: 'Organogenesis', description: 'major organs form by roughly week 8, marking the transition to fetus' },
    ],
  }),

  'bio.repro.reproductive-health': () => buildCellComparisonScene({
    conceptId: 'bio.repro.reproductive-health',
    title: 'Contraceptive Methods by Mechanism',
    teachingGoal: 'Condoms provide the ONLY STI protection among contraceptive methods — every other method prevents pregnancy only.',
    groups: [
      { label: 'Barrier', description: 'physically prevents sperm from reaching the egg', items: ['Condoms, diaphragm — the only STI protection'] },
      { label: 'Hormonal', description: 'prevents ovulation (primary mechanism), alters cervical mucus', items: ['The pill, patch, injection, implant'] },
      { label: 'IUD', description: 'copper (toxic to sperm) or hormonal', items: [] },
      { label: 'Emergency contraception', description: 'high-dose progesterone to DELAY ovulation', items: ['Not an abortifacient — does not end an existing pregnancy'] },
    ],
  }),

  'bio.dev.gametogenesis-fertilisation-dev': () => buildCellComparisonScene({
    conceptId: 'bio.dev.gametogenesis-fertilisation-dev',
    title: 'Spermatogenesis vs. Oogenesis: The 4-vs-1 Asymmetry',
    teachingGoal: 'An "unfertilised egg" has NOT completed meiosis — it is a secondary oocyte arrested at metaphase II; fertilisation triggers meiosis II to finish.',
    groups: [
      { label: 'Spermatogenesis', description: 'runs continually; equal cytokinesis', items: ['4 functional sperm per primary spermatocyte'] },
      { label: 'Oogenesis', description: 'begins before birth; UNEQUAL cytokinesis concentrates cytoplasm into one cell', items: ['1 functional egg + 2–3 polar bodies per primary oocyte'] },
    ],
  }),

  'bio.dev.morphogenesis-differentiation': () => buildCellPathwayScene({
    conceptId: 'bio.dev.morphogenesis-differentiation',
    title: 'From Morphogen Gradient to Sculpted Tissue',
    teachingGoal: 'Differentiation is NOT gene loss — all somatic cells carry identical genomes; cloning experiments proved this. It is a matter of gene EXPRESSION, not presence.',
    stages: [
      { name: 'Morphogen gradient', description: 'a signal (e.g. Sonic Hedgehog) diffuses outward; concentration tells each cell where it sits' },
      { name: 'Determination', description: 'transcription factors lock in cell identity by silencing alternative gene programs' },
      { name: 'Physical sculpting', description: 'cell shape changes, differential adhesion, and apoptosis (e.g. interdigital cell death forms fingers)' },
    ],
  }),

  'bio.dev.stem-cells-regeneration': () => buildCellComparisonScene({
    conceptId: 'bio.dev.stem-cells-regeneration',
    title: 'Stem Cell Potency: A Narrowing Hierarchy',
    teachingGoal: 'Potency — the BREADTH of differentiation — is not uniform across all "stem cells."',
    groups: [
      { label: 'Totipotent', description: 'the early zygote — can form any tissue AND extra-embryonic tissue (placenta)', items: [] },
      { label: 'Pluripotent', description: 'embryonic stem cells — all three germ layers, but NOT extra-embryonic tissue', items: [] },
      { label: 'Multipotent', description: 'adult stem cells — only a defined, related subset of cell types', items: ['Haematopoietic stem cells → all blood cell lineages only'] },
    ],
  }),

  'bio.micro.microbial-diversity': () => buildCellComparisonScene({
    conceptId: 'bio.micro.microbial-diversity',
    title: 'Five Categories of Microorganism',
    teachingGoal: 'Fewer than a thousand of the many millions of microbial species cause human disease — the vast majority are harmless or beneficial.',
    groups: [
      { label: 'Bacteria', description: 'prokaryotes, the most abundant and diverse group', items: [] },
      { label: 'Archaea', description: 'prokaryotes, deeply divergent from bacteria; often extremophiles', items: [] },
      { label: 'Fungi', description: 'eukaryotes, including moulds and yeasts', items: [] },
      { label: 'Protozoa', description: 'unicellular eukaryotes', items: ['Amoeba, Paramecium, Plasmodium'] },
      { label: 'Algae', description: 'photosynthetic eukaryotes', items: ['Chlorella'] },
    ],
  }),

  // Batch 5 (bio.micro, 3 concepts; bio.immuno, 3 concepts; bio.biotech, 4
  // concepts; bio.bioinfo, 2 concepts):
  'bio.micro.microbial-growth-culture': () => buildCellPathwayScene({
    conceptId: 'bio.micro.microbial-growth-culture',
    title: 'The Four-Phase Bacterial Growth Curve',
    teachingGoal: 'Stationary phase does not mean bacteria stopped reproducing — division continues, exactly balanced by an equal rate of death.',
    stages: [
      { name: 'Lag phase', description: 'bacteria adjust biochemically to the new medium — no net population growth yet' },
      { name: 'Exponential (log) phase', description: 'bacteria divide at maximum rate via binary fission — numbers increase geometrically' },
      { name: 'Stationary phase', description: 'nutrients deplete and waste accumulates; the population plateaus because cell death equals cell division' },
      { name: 'Death (decline) phase', description: 'deaths exceed divisions as resources are exhausted' },
    ],
  }),

  'bio.micro.microbes-in-human-welfare': () => buildCellHubScene({
    conceptId: 'bio.micro.microbes-in-human-welfare',
    hubLabel: 'Beneficial Microbes',
    title: 'Microbes in Human Welfare',
    teachingGoal: '"Microbes = germs = bad" is deeply wrong — fewer than a thousand of many thousands of known microbial species cause human disease.',
    spokes: [
      { name: 'Food production', description: 'Lactobacillus (yogurt, cheese); Saccharomyces yeast (bread, wine, beer)' },
      { name: 'Industrial biotechnology', description: 'antibiotics (Penicillium), vitamins, enzymes, biofuels' },
      { name: 'Agriculture', description: 'Rhizobium fixes atmospheric nitrogen in legume root nodules' },
      { name: 'Bioremediation', description: 'Pseudomonas breaks down oil-spill hydrocarbons' },
      { name: 'Medicine', description: 'engineered E. coli produces human insulin' },
    ],
  }),

  'bio.micro.pathogenic-microbes': () => buildCellComparisonScene({
    conceptId: 'bio.micro.pathogenic-microbes',
    title: 'Pathogen Categories Require Different Treatments',
    teachingGoal: 'Antibiotics work by targeting bacterial cell walls and 70S ribosomes — features viruses (and human cells) simply do not have.',
    groups: [
      { label: 'Bacteria', description: 'prokaryotes — treatable with antibiotics', items: ['TB, cholera, pneumonia'] },
      { label: 'Viruses', description: 'not cells — antibiotics have nothing to target', items: ['Influenza, HIV, measles — need antivirals/vaccines'] },
      { label: 'Fungi', description: 'eukaryotes — harder to target selectively (share machinery with human cells)', items: ["Athlete's foot, candidiasis"] },
      { label: 'Protists', description: 'eukaryotic pathogens', items: ['Malaria (Plasmodium), sleeping sickness (Trypanosoma)'] },
      { label: 'Prions', description: 'misfolded proteins, no nucleic acid — essentially untreatable', items: ['CJD, BSE'] },
    ],
  }),

  'bio.immuno.innate-adaptive-immunity': () => buildCellComparisonScene({
    conceptId: 'bio.immuno.innate-adaptive-immunity',
    title: 'Innate and Adaptive Immunity Cooperate, Not Hand Off',
    teachingGoal: 'Dendritic cells are the specific bridge: they perform innate-style phagocytosis, then present antigens to T cells, activating the adaptive response.',
    groups: [
      { label: 'Innate immunity', description: 'fast (minutes–hours), non-specific', items: ['PRRs bind PAMPs — absent from human cells', 'Phagocytes, NK cells, inflammation'] },
      { label: 'Adaptive immunity', description: 'slow (days–weeks), highly specific, retains memory', items: ['B cells → antibodies', 'T helper (CD4⁺), cytotoxic (CD8⁺), regulatory T cells', 'MHC displays peptides for T cell recognition'] },
    ],
  }),

  'bio.immuno.antibody-structure-function': () => buildCellComparisonScene({
    conceptId: 'bio.immuno.antibody-structure-function',
    title: 'The Five Antibody Classes',
    teachingGoal: 'Antibodies do not directly kill pathogens — they neutralise, opsonise, activate complement, or agglutinate; other mechanisms do the killing.',
    groups: [
      { label: 'IgM', description: 'the first responder, assembled as a pentamer', items: [] },
      { label: 'IgG', description: 'the most abundant class — the ONLY class that crosses the placenta', items: [] },
      { label: 'IgA', description: 'found in mucosal secretions and breast milk', items: [] },
      { label: 'IgE', description: 'parasite defense and allergic responses', items: [] },
      { label: 'IgD', description: 'functions as a B cell receptor', items: [] },
    ],
  }),

  'bio.immuno.vaccination-immunisation': () => buildCellComparisonScene({
    conceptId: 'bio.immuno.vaccination-immunisation',
    title: 'Five Vaccine Types',
    teachingGoal: 'mRNA vaccines cannot alter DNA: the mRNA is degraded within days, never enters the nucleus, and human cells lack reverse transcriptase.',
    groups: [
      { label: 'Live-attenuated', description: 'a weakened but living pathogen — strong immunity, unsafe for immunocompromised patients', items: ['MMR, chickenpox'] },
      { label: 'Inactivated', description: 'a killed pathogen — safer, weaker response, needs boosters', items: ['Flu shot, polio IPV'] },
      { label: 'Subunit/protein', description: 'just one antigen protein, not the whole pathogen', items: ['Hepatitis B'] },
      { label: 'Toxoid', description: 'an inactivated bacterial toxin', items: ['Tetanus, diphtheria'] },
      { label: 'mRNA', description: 'instructs cells to manufacture the antigen themselves', items: ['COVID-19 (Pfizer/Moderna)'] },
    ],
  }),

  'bio.biotech.biotech-principles': () => buildCellHubScene({
    conceptId: 'bio.biotech.biotech-principles',
    hubLabel: 'Why Biotechnology Works',
    title: 'Three Principles Behind Modern Biotechnology',
    teachingGoal: 'The universal genetic code guarantees a human gene inserted into a bacterium is correctly translated — no species-specific re-coding needed.',
    spokes: [
      { name: 'Every cell contains the same genetic code', description: 'any cell can express any gene given the right regulatory signals' },
      { name: 'The genetic code is universal', description: 'the same codons specify the same amino acids across all known life' },
      { name: 'Microorganisms as living factories', description: 'bacteria and yeast grow rapidly and cheaply, and can overproduce a desired protein' },
    ],
  }),

  'bio.biotech.biotech-process-applications': () => buildCellComparisonScene({
    conceptId: 'bio.biotech.biotech-process-applications',
    title: 'Biotechnology Applications',
    teachingGoal: 'Cutting (restriction enzymes) and joining (DNA ligase) are two distinct, sequential steps performed by two different enzymes.',
    groups: [
      { label: 'Fermentation', description: 'microorganisms as living factories for therapeutic products', items: ['Recombinant human insulin (1982), erythropoietin, vaccines'] },
      { label: 'Transgenic crops', description: 'the same recombinant-DNA toolkit applied to plants', items: ['Bt toxin genes for pest resistance'] },
      { label: 'Gene therapy', description: 'delivers corrective DNA via viral vectors or lipid nanoparticles', items: ['Some viral vectors integrate into the genome; mRNA vaccines do not'] },
      { label: 'PCR', description: 'exponentially amplifies even tiny DNA samples', items: ['Diagnostics, forensics, pathogen detection'] },
    ],
  }),

  'bio.biotech.genomics-proteomics': () => buildCellComparisonScene({
    conceptId: 'bio.biotech.genomics-proteomics',
    title: 'Genomics vs. Proteomics: Why the Proteome Is Bigger Than the Genome',
    teachingGoal: 'Sequencing a genome is a starting point for investigation, not an endpoint of understanding.',
    groups: [
      { label: 'Genomics', description: 'large-scale study of the genome sequence', items: ['≈ 20,000 human protein-coding genes', 'RNA-seq measures gene expression'] },
      { label: 'Proteomics', description: 'large-scale study of the resulting proteins', items: ['Several hundred thousand distinct protein variants', 'Alternative splicing + post-translational modification explain the gap'] },
    ],
  }),

  'bio.biotech.crispr-genome-editing': () => buildCellComparisonScene({
    conceptId: 'bio.biotech.crispr-genome-editing',
    title: 'CRISPR Repair Pathways: NHEJ vs. HDR',
    teachingGoal: 'NHEJ is the DEFAULT pathway — standard Cas9 editing without a donor template reliably produces a knockout, not a precise correction.',
    groups: [
      { label: 'NHEJ', description: 'non-homologous end joining — fast, error-prone, the default when no donor template is supplied', items: ['Produces a knockout (loss of function)'] },
      { label: 'HDR', description: 'homology-directed repair — uses a donor template for a precise edit', items: ['Produces a knock-in', 'Only during S/G2 phase; less efficient than NHEJ'] },
    ],
  }),

  'bio.bioinfo.bioinformatics-intro': () => buildCellHubScene({
    conceptId: 'bio.bioinfo.bioinformatics-intro',
    hubLabel: 'Bioinformatics',
    title: 'Four Core Analytical Tasks in Bioinformatics',
    teachingGoal: 'A BLAST E-value is a probability that a match arose by chance — it is NOT percent sequence identity.',
    spokes: [
      { name: 'Sequence alignment', description: 'finding similarity to infer homology, function, or evolutionary distance' },
      { name: 'Annotation', description: 'assigning biological meaning to genomic features' },
      { name: 'Variant calling', description: 'identifying SNPs, indels, and copy-number variants against a reference genome' },
      { name: 'Structural prediction', description: 'now transformed by AlphaFold2’s deep-learning approach' },
    ],
  }),

  'bio.bioinfo.sequence-alignment': () => buildCellComparisonScene({
    conceptId: 'bio.bioinfo.sequence-alignment',
    title: 'Global vs. Local Sequence Alignment',
    teachingGoal: 'A gap in an alignment is a HYPOTHESISED evolutionary insertion/deletion — not missing data or low sequencing quality.',
    groups: [
      { label: 'Global alignment', description: 'Needleman-Wunsch — aligns the FULL length of both sequences end to end', items: [] },
      { label: 'Local alignment', description: 'Smith-Waterman — finds the best-matching sub-region only', items: ['BLAST/DIAMOND heuristically approximate this at scale'] },
    ],
  }),

  // Batch 6 (bio.bioinfo, 2 concepts; bio.sys, 4 concepts; bio.div, 6
  // concepts):
  'bio.bioinfo.phylogenetics-computational': () => buildCellPathwayScene({
    conceptId: 'bio.bioinfo.phylogenetics-computational',
    title: 'The Phylogenetics Workflow',
    teachingGoal: 'Every tip of a fully resolved tree has been evolving for EXACTLY the same time since the root — no tip is "more primitive" than another.',
    stages: [
      { name: 'Align sequences', description: 'the starting multiple sequence alignment' },
      { name: 'Choose an evolutionary model', description: 'e.g. GTR for DNA — model selection picks the SIMPLEST model that fits' },
      { name: 'Infer a tree', description: 'distance-based, parsimony, maximum likelihood, or Bayesian methods' },
      { name: 'Assess confidence', description: 'bootstrap values (ML) or posterior probabilities (Bayesian)' },
    ],
  }),

  'bio.bioinfo.structural-bioinformatics': () => buildCellComparisonScene({
    conceptId: 'bio.bioinfo.structural-bioinformatics',
    title: 'What AlphaFold2 Predicts — and What It Doesn’t',
    teachingGoal: '"The protein-structure problem is solved" is incorrect — AlphaFold2 predicts one static conformation, not the full functional picture.',
    groups: [
      { label: 'What it predicts well', description: 'the single lowest-energy conformation of an isolated protein', items: ['Near-experimental accuracy for many protein families'] },
      { label: 'What it does NOT capture', description: 'reliably', items: ['Conformational ensembles (multiple functional states)', 'Ligand-bound states (induced fit)', 'Intrinsically disordered regions', 'Protein complexes (fully)'] },
    ],
  }),

  'bio.sys.systems-biology-intro': () => buildCellHubScene({
    conceptId: 'bio.sys.systems-biology-intro',
    hubLabel: 'Emergent Network Behaviour',
    title: 'Four Key Concepts in Systems Biology',
    teachingGoal: 'A phenomenon like the circadian clock is not located "in" any single gene — it exists in the feedback TOPOLOGY among interacting genes.',
    spokes: [
      { name: 'Feedback loops', description: 'negative feedback dampens perturbations; positive feedback amplifies them' },
      { name: 'Modularity', description: 'networks organise into sub-networks that can be rewired somewhat independently' },
      { name: 'Robustness vs. fragility', description: 'robust to many perturbations, but fragile at specific hub points ("bow-tie" topology)' },
      { name: 'Emergence', description: 'system-level behaviour that cannot be predicted from any single component alone' },
    ],
  }),

  'bio.sys.gene-regulatory-networks': () => buildCellComparisonScene({
    conceptId: 'bio.sys.gene-regulatory-networks',
    title: 'Three Recurring Network Motifs',
    teachingGoal: 'A GRN is NOT a static wiring diagram — the same topology can produce different output depending on initial conditions and reaction rates.',
    groups: [
      { label: 'Feedforward loop', description: 'filters out transient signals, preventing brief noise from triggering a response', items: [] },
      { label: 'Autoregulation', description: 'a transcription factor activates or represses its OWN gene, tuning response speed', items: [] },
      { label: 'Bistable toggle switch', description: 'two transcription factors mutually repress each other', items: ['Underlies binary cell-fate decisions'] },
    ],
  }),

  'bio.sys.metabolic-network-modelling': () => buildCellComparisonScene({
    conceptId: 'bio.sys.metabolic-network-modelling',
    title: 'Flux Balance Analysis vs. Kinetic Models',
    teachingGoal: 'FBA is NOT a dynamic simulation — it finds a steady-state flux distribution; it does not track concentrations changing over time.',
    groups: [
      { label: 'Flux Balance Analysis (FBA)', description: 'linear programming; needs only stoichiometry, no enzyme kinetics', items: ['Predicts gene essentiality', 'Does NOT model dynamics, thermodynamics, or saturation'] },
      { label: 'Kinetic models', description: 'ordinary differential equations with mechanistic rate laws', items: ['Used when temporal dynamics and saturation matter'] },
    ],
  }),

  'bio.sys.synthetic-biology': () => buildCellPathwayScene({
    conceptId: 'bio.sys.synthetic-biology',
    title: 'Synthetic Biology: Three Levels of Design',
    teachingGoal: '"Life created from scratch" conflates genome SYNTHESIS (transplanted into an existing cell) with generating a living cell from non-living chemistry — the latter has never been achieved.',
    stages: [
      { name: 'Parts', description: 'standardised BioBrick promoters, ribosome-binding sites, coding sequences, terminators' },
      { name: 'Devices', description: 'genetic circuits — toggle switches, oscillators, logic gates — implementing computational functions' },
      { name: 'Systems', description: 'engineered metabolic pathways (artemisinin), biosensors, cell-based therapies' },
    ],
  }),

  'bio.div.three-domain-system': () => buildCellComparisonScene({
    conceptId: 'bio.div.three-domain-system',
    title: "Woese's Three Domains",
    teachingGoal: 'Archaea are actually MORE closely related to Eukarya than to Bacteria, despite sharing the same basic prokaryotic cell structure as Bacteria.',
    groups: [
      { label: 'Bacteria', description: 'prokaryotic; deeply divergent from Archaea despite shared cell structure', items: [] },
      { label: 'Archaea', description: 'prokaryotic in structure, but molecularly closer to Eukarya', items: ['Similar RNA polymerases, histone-like proteins'] },
      { label: 'Eukarya', description: 'has a nucleus and membrane-bound organelles', items: [] },
    ],
  }),

  'bio.div.endosymbiotic-theory': () => buildCellComparisonScene({
    conceptId: 'bio.div.endosymbiotic-theory',
    title: 'Endosymbiotic Theory: Two Independent Origins',
    teachingGoal: 'Mitochondrial DNA is molecularly most similar to alpha-proteobacterial DNA, not to the eukaryotic nuclear genome — direct evidence of its bacterial origin.',
    groups: [
      { label: 'Mitochondria', description: 'descended from an alpha-proteobacterium', items: ['Circular DNA, 70S ribosomes, binary fission, double membrane'] },
      { label: 'Chloroplasts', description: 'descended from a cyanobacterium — ancestrally photosynthetic', items: ['Circular DNA, 70S ribosomes, binary fission, double membrane'] },
    ],
  }),

  'bio.div.protist-diversity': () => buildCellHubScene({
    conceptId: 'bio.div.protist-diversity',
    hubLabel: 'Protista (a catch-all, not a natural group)',
    title: 'Protist Diversity: Polyphyletic by Definition',
    teachingGoal: '"Protists are simple, primitive organisms" is false — "primitive" means ANCESTRAL, not simple, and protists are not ancestral to anything in particular.',
    spokes: [
      { name: 'Amoebae', description: 'heterotrophic, amoeboid movement' },
      { name: 'Algae', description: 'photosynthetic' },
      { name: 'Diatoms', description: 'photosynthetic, silica cell walls' },
      { name: 'Foraminifera', description: 'shelled, mostly marine' },
      { name: 'Plasmodium', description: 'the malaria parasite — a complex, multi-host life cycle' },
    ],
  }),

  'bio.div.fungal-biology': () => buildCellComparisonScene({
    conceptId: 'bio.div.fungal-biology',
    title: 'Three Ecological Roles of Fungi',
    teachingGoal: 'Fungi are the sister group to ANIMALS (Opisthokonta), not plants — despite their plant-like stationary growth habit.',
    groups: [
      { label: 'Decomposers', description: 'break down dead organic matter, recycling nutrients', items: [] },
      { label: 'Pathogens', description: 'cause disease in plants, animals, or other fungi', items: [] },
      { label: 'Mycorrhizal partners', description: 'symbiotic associations with plant roots, extending root surface area', items: [] },
    ],
  }),

  'bio.div.plant-diversity-alternation-of-generations': () => buildCellPathwayScene({
    conceptId: 'bio.div.plant-diversity-alternation-of-generations',
    title: 'The Trend Toward Sporophyte Dominance',
    teachingGoal: 'Reducing the gametophyte to a microscopic, protected structure removes the need for a water film for sperm to swim — freeing seed plants to colonise dry land.',
    stages: [
      { name: 'Mosses', description: 'the gametophyte is dominant (the visible green plant); the sporophyte is a small, dependent stalk' },
      { name: 'Ferns', description: 'dominance reverses — the large fern IS the sporophyte; the gametophyte is a tiny, independent prothallus' },
      { name: 'Seed plants', description: 'the gametophyte is microscopic and entirely dependent on the sporophyte (pollen grain, embryo sac)' },
    ],
  }),

  'bio.div.cladistics-phylogenetic-thinking': () => buildCellComparisonScene({
    conceptId: 'bio.div.cladistics-phylogenetic-thinking',
    title: 'Monophyletic, Paraphyletic, and Polyphyletic Groups',
    teachingGoal: 'Dolphins are more closely related to hippos than to fish — a fish-like body shape evolved convergently and does not reflect close common ancestry.',
    groups: [
      { label: 'Monophyletic (a true clade)', description: 'a common ancestor together with ALL of its descendants', items: [] },
      { label: 'Paraphyletic', description: 'a common ancestor plus only SOME of its descendants', items: [] },
      { label: 'Polyphyletic', description: 'unrelated lineages grouped by superficial similarity, no exclusive common ancestor', items: [] },
    ],
  }),

  // Batch 7 (bio.micro, 2 concepts; bio.mol, 5 concepts; bio.gen, 1 concept;
  // bio.evo, 2 concepts; bio.immuno, 1 concept; bio.behav, 1 concept):
  'bio.micro.viral-replication': () => buildCellComparisonScene({
    conceptId: 'bio.micro.viral-replication',
    title: 'Lytic vs. Lysogenic Cycle',
    teachingGoal: 'Viruses do not reproduce — they replicate by commandeering the host’s ribosomes, energy, and raw materials. Outside a host, a virus is genuinely inert.',
    groups: [
      { label: 'Lytic cycle', description: 'attach → inject → hijack host machinery → assemble → lyse the cell', items: ['Releases hundreds of progeny virions'] },
      { label: 'Lysogenic cycle', description: 'the genome integrates as a prophage, replicating silently with the host', items: ['Bacteriophage λ — excises and turns lytic under cellular stress'] },
    ],
  }),

  'bio.micro.horizontal-gene-transfer': () => buildCellComparisonScene({
    conceptId: 'bio.micro.horizontal-gene-transfer',
    title: 'Three Mechanisms of Horizontal Gene Transfer',
    teachingGoal: 'Resistance mutations pre-exist at low frequency BEFORE antibiotic exposure — the antibiotic selects for them, it does not cause them.',
    groups: [
      { label: 'Transformation', description: 'a bacterium takes up naked DNA directly from its environment', items: [] },
      { label: 'Transduction', description: 'DNA is carried between bacteria by a bacteriophage', items: [] },
      { label: 'Conjugation', description: 'direct cell-to-cell transfer via a pilus', items: [] },
    ],
  }),

  'bio.mol.epigenetics': () => buildCellHubScene({
    conceptId: 'bio.mol.epigenetics',
    hubLabel: 'Cell-Type-Specific Gene Expression',
    title: 'Three Epigenetic Mechanisms',
    teachingGoal: 'Transgenerational epigenetic inheritance is real but limited in mammals — most marks are erased during gametogenesis and embryogenesis.',
    spokes: [
      { name: 'DNA methylation', description: 'a methyl group on cytosine at CpG sites generally silences nearby genes' },
      { name: 'Histone modification', description: 'acetylation loosens chromatin and activates genes; methylation condenses and silences' },
      { name: 'Non-coding RNA regulation', description: 'ncRNAs contribute an additional regulatory layer' },
    ],
  }),

  'bio.mol.noncoding-rna': () => buildCellComparisonScene({
    conceptId: 'bio.mol.noncoding-rna',
    title: 'Five Classes of Non-Coding RNA',
    teachingGoal: '"Junk DNA" is a wrong, outdated label — ENCODE found over 80% of the human genome shows measurable biochemical activity.',
    groups: [
      { label: 'rRNA', description: 'forms ribosome structure and provides its catalytic activity', items: [] },
      { label: 'tRNA', description: 'the amino acid adaptor molecule used in translation', items: [] },
      { label: 'miRNA', description: 'binds mRNA, triggering degradation or translational repression', items: ['Each regulates hundreds of genes'] },
      { label: 'siRNA', description: 'mechanistically similar to miRNA, typically exogenous (RNAi)', items: [] },
      { label: 'lncRNA', description: 'diverse functions, including whole-chromosome regulation', items: ['Xist silences an entire X chromosome'] },
    ],
  }),

  'bio.mol.signal-transduction-pathways': () => buildCellPathwayScene({
    conceptId: 'bio.mol.signal-transduction-pathways',
    title: 'Signal Transduction: Reception to Response',
    teachingGoal: 'A single receptor-binding event can activate THOUSANDS of downstream molecules — the effect compounds at each step of the relay.',
    stages: [
      { name: 'Reception', description: 'the signal molecule (hormone, growth factor, neurotransmitter) binds a receptor' },
      { name: 'Transduction', description: 'relay molecules amplify and route the message onward (e.g. cAMP → PKA, or Ras → MAP kinase)' },
      { name: 'Response', description: 'a change in gene expression, enzyme activation, or cytoskeletal rearrangement' },
    ],
  }),

  'bio.mol.dna-damage-repair': () => buildCellComparisonScene({
    conceptId: 'bio.mol.dna-damage-repair',
    title: 'Matching DNA Damage Type to Repair Pathway',
    teachingGoal: 'The largest source of mutations is spontaneous chemistry (deamination, depurination, replication errors), not radiation or toxic chemicals.',
    groups: [
      { label: 'Base excision repair (BER)', description: 'fixes small base modifications', items: [] },
      { label: 'Nucleotide excision repair (NER)', description: 'removes bulky lesions such as UV thymine dimers', items: [] },
      { label: 'Mismatch repair (MMR)', description: 'corrects replication errors', items: ['MLH1/MSH2 mutations → Lynch syndrome'] },
      { label: 'HR and NHEJ', description: 'repair double-strand breaks — the most severe damage type', items: ['BRCA1/2 mutations disable HR → breast/ovarian cancer risk'] },
    ],
  }),

  'bio.mol.bioenergetics': () => buildCellComparisonScene({
    conceptId: 'bio.mol.bioenergetics',
    title: 'Reaction Coupling: Exergonic Drives Endergonic',
    teachingGoal: 'Living systems are OPEN systems — building ordered structures locally does not violate the second law, since total entropy (cell + surroundings) still increases.',
    groups: [
      { label: 'Exergonic reaction', description: 'ΔG < 0 — energy-releasing, spontaneous', items: ['ATP hydrolysis: ΔG ≈ −30.5 kJ/mol'] },
      { label: 'Endergonic reaction', description: 'ΔG > 0 — energy-requiring, non-spontaneous alone', items: ['Coupled to an exergonic reaction to proceed'] },
    ],
  }),

  'bio.gen.transposable-elements': () => buildCellComparisonScene({
    conceptId: 'bio.gen.transposable-elements',
    title: 'Class I vs. Class II Transposable Elements',
    teachingGoal: 'Most TEs are NOT actively transposing — they are silenced by DNA methylation and piRNA pathways, since unchecked transposition causes chromosome instability.',
    groups: [
      { label: 'Class I (retrotransposons)', description: 'copy-and-paste via an RNA intermediate', items: ['INCREASES copy number — original stays in place'] },
      { label: 'Class II (DNA transposons)', description: 'cut-and-paste — the transposase excises and reinserts', items: ['Relocates — does NOT reliably increase copy number'] },
    ],
  }),

  'bio.evo.molecular-evolution': () => buildCellComparisonScene({
    conceptId: 'bio.evo.molecular-evolution',
    title: 'Purifying Selection vs. Neutral Evolution',
    teachingGoal: '"Evolution is always driven by natural selection" is wrong at the molecular level — most sequence changes are neutral, fixed by genetic drift.',
    groups: [
      { label: 'Strongly conserved sequences', description: 'under purifying (negative) selection — any change is deleterious and eliminated', items: ['Histone H4: nearly identical from yeast to humans'] },
      { label: 'Highly variable regions', description: 'evolve neutrally — changes carry little fitness consequence', items: ['Fixed by genetic drift, not selection'] },
    ],
  }),

  'bio.evo.evo-devo': () => buildCellComparisonScene({
    conceptId: 'bio.evo.evo-devo',
    title: 'What Drives Morphological Evolution?',
    teachingGoal: 'Mouse Pax6 expressed in a fly produces a FLY eye, not a mouse eye — the conserved signal is received by the fly’s own downstream genes.',
    groups: [
      { label: 'Regulatory region changes', description: 'controlling WHERE and WHEN a conserved gene is expressed', items: ['The actual driver of most major morphological change', 'Limb loss in snakes, eye reduction in cave fish'] },
      { label: 'Protein-coding sequence changes', description: 'changes to the gene itself', items: ['NOT the typical explanation for major morphological change'] },
    ],
  }),

  'bio.immuno.mhc-antigen-presentation': () => buildCellComparisonScene({
    conceptId: 'bio.immuno.mhc-antigen-presentation',
    title: 'MHC Class I vs. Class II',
    teachingGoal: 'Transplant rejection happens because T cells perceive the donor’s MHC as foreign (MHC restriction) — not because of a generic "overreaction."',
    groups: [
      { label: 'MHC class I', description: 'on ALL nucleated cells; presents INSIDE-the-cell peptides', items: ['Detected by cytotoxic T cells (CD8⁺)', 'Leads to destruction of the infected cell'] },
      { label: 'MHC class II', description: 'only on professional antigen-presenting cells; presents EXTRACELLULAR antigens', items: ['Detected by helper T cells (CD4⁺)', 'Coordinates the broader adaptive response'] },
    ],
  }),

  'bio.behav.animal-cognition': () => buildCellComparisonScene({
    conceptId: 'bio.behav.animal-cognition',
    title: "Morgan's Canon: Prefer the Simpler Explanation",
    teachingGoal: 'A simpler explanation must be actively ruled out before concluding a more complex cognitive process (like theory of mind) is genuinely operating.',
    groups: [
      { label: 'Simpler explanation', description: 'learned behavioural rules, associative learning, instinct', items: ['Preferred by Morgan’s Canon when it suffices'] },
      { label: 'Complex explanation', description: 'understanding, theory of mind, flexible problem-solving', items: ['Only concluded when simpler mechanisms cannot account for the behaviour'] },
    ],
  }),

  // Batch 8 (bio.behav, 8 concepts; bio.bioinfo, 3 concepts; bio.biotech, 1
  // concept):
  'bio.behav.animal-communication': () => buildCellComparisonScene({
    conceptId: 'bio.behav.animal-communication',
    title: 'Three Signal Modalities',
    teachingGoal: 'A signal’s honesty comes SPECIFICALLY from its being costly to produce (the handicap principle) — not despite that cost.',
    groups: [
      { label: 'Visual signals', description: 'rapid, detailed, but need line of sight and short range', items: [] },
      { label: 'Auditory signals', description: 'travel far, around obstacles, work in the dark', items: [] },
      { label: 'Chemical (pheromone) signals', description: 'persist over time, travel far, but transmit slowly', items: [] },
    ],
  }),

  'bio.behav.foraging-behavior': () => buildCellComparisonScene({
    conceptId: 'bio.behav.foraging-behavior',
    title: 'Risk-Sensitive Foraging',
    teachingGoal: 'The marginal value theorem predicts an animal should leave a patch while food STILL remains, once the current intake rate drops to the habitat average.',
    groups: [
      { label: 'Secure energy state', description: 'adequate reserves', items: ['Risk-AVERSE: prefers a predictable, lower-variance food source'] },
      { label: 'Desperate energy state', description: 'insufficient reserves to survive on the "safe" option', items: ['Risk-PRONE: prefers the higher-variance "gamble"'] },
    ],
  }),

  'bio.behav.human-behavioral-ecology-evolutionary-psych': () => buildCellComparisonScene({
    conceptId: 'bio.behav.human-behavioral-ecology-evolutionary-psych',
    title: 'Two Inheritance Systems, Different Speeds',
    teachingGoal: 'An evolutionary explanation being logically coherent is NOT the same as it being the actual explanation — each claim needs its own evidence.',
    groups: [
      { label: 'Genetic evolution', description: 'requires MULTIPLE generations of differential reproduction to spread', items: [] },
      { label: 'Cultural evolution', description: 'spreads via teaching, imitation, communication — can change within a single generation', items: ['Operates alongside, not instead of, genetic evolution'] },
    ],
  }),

  'bio.behav.innate-behavior-instinct': () => buildCellComparisonScene({
    conceptId: 'bio.behav.innate-behavior-instinct',
    title: 'Reflex vs. Fixed Action Pattern',
    teachingGoal: 'A fixed action pattern is not spontaneous — it requires a specific sign stimulus to release it, then runs to completion largely independent of feedback.',
    groups: [
      { label: 'Simple reflex', description: 'direct, single-muscle-group stimulus-response, minimal neural processing', items: ['E.g. the knee-jerk reflex'] },
      { label: 'Fixed action pattern', description: 'complex, coordinated, multi-step sequence, triggered by a sign stimulus', items: ['E.g. courtship display, nest-building', 'Stereotyped and largely unmodifiable once triggered'] },
    ],
  }),

  'bio.behav.kin-selection-altruism': () => buildCellComparisonScene({
    conceptId: 'bio.behav.kin-selection-altruism',
    title: 'Kin Selection vs. Reciprocal Altruism',
    teachingGoal: "Hamilton's rule (rB > C): a costly act toward a close relative can be favoured even when the same act toward a stranger would not be.",
    groups: [
      { label: 'Kin selection', description: 'favoured when relatedness-weighted benefit (rB) exceeds cost (C)', items: ['Depends on shared genes (inclusive fitness)'] },
      { label: 'Reciprocal altruism', description: 'cooperation between NON-relatives, expecting future reciprocation', items: ['Requires repeated interactions and individual recognition', 'Does NOT rely on shared genes'] },
    ],
  }),

  'bio.behav.learning-and-behavior': () => buildCellComparisonScene({
    conceptId: 'bio.behav.learning-and-behavior',
    title: 'Four Forms of Learning',
    teachingGoal: 'Classical conditioning links stimulus-TO-stimulus; operant conditioning links behaviour-TO-consequence — a qualitatively different association.',
    groups: [
      { label: 'Habituation', description: 'non-associative — decreased response to a repeated, inconsequential stimulus', items: [] },
      { label: 'Classical conditioning', description: 'associates a neutral stimulus with one that already triggers a response', items: ["Pavlov's dogs"] },
      { label: 'Operant conditioning', description: 'associates a behaviour with its consequence (reward/punishment)', items: [] },
      { label: 'Imprinting', description: 'occurs ONLY during a narrow critical period', items: [] },
    ],
  }),

  'bio.behav.mating-systems-sexual-selection': () => buildCellComparisonScene({
    conceptId: 'bio.behav.mating-systems-sexual-selection',
    title: 'Intrasexual vs. Intersexual Selection',
    teachingGoal: 'A trait can be favoured by sexual selection even while reducing survival — the peacock’s tail persists because its mating benefit outweighs its survival cost.',
    groups: [
      { label: 'Intrasexual selection', description: 'competition BETWEEN members of the same sex for mates', items: ['Favours body size, weapons, aggression'] },
      { label: 'Intersexual selection', description: 'mate choice exercised by one sex over the other', items: ['Favours ornamentation, courtship displays'] },
    ],
  }),

  'bio.behav.social-behavior-eusociality': () => buildCellStructureScene({
    conceptId: 'bio.behav.social-behavior-eusociality',
    subject: 'Eusociality',
    boundaryLabel: 'Eusociality (all three required together)',
    teachingGoal: 'No single feature alone qualifies a species as eusocial — all three must be present together.',
    parts: [
      { name: 'Reproductive division of labour', description: 'only a small subset (queens) reproduce; workers do not' },
      { name: 'Overlapping generations', description: 'offspring remain in the natal colony with their parents' },
      { name: 'Cooperative brood care', description: 'individuals other than the parents care for offspring not their own' },
    ],
  }),

  'bio.bioinfo.comparative-genomics': () => buildCellComparisonScene({
    conceptId: 'bio.bioinfo.comparative-genomics',
    title: 'Orthologs vs. Paralogs',
    teachingGoal: 'The distinguishing criterion: was the divergence produced by SPECIATION (orthologs) or by DUPLICATION within one genome (paralogs)?',
    groups: [
      { label: 'Orthologs', description: 'genes in DIFFERENT species, diverged via a SPECIATION event', items: ['Typically retain the same function'] },
      { label: 'Paralogs', description: 'genes WITHIN the same genome, diverged via a GENE DUPLICATION event', items: ['Can diverge toward different specialised functions'] },
    ],
  }),

  'bio.bioinfo.genome-sequencing-technologies': () => buildCellComparisonScene({
    conceptId: 'bio.bioinfo.genome-sequencing-technologies',
    title: 'Short-Read vs. Long-Read Sequencing',
    teachingGoal: 'Higher coverage means each position is confirmed by multiple independent reads, allowing random sequencing errors to be statistically identified and corrected.',
    groups: [
      { label: 'Short-read', description: 'many short fragments, highly accurate per base', items: ['Struggles with long repetitive regions'] },
      { label: 'Long-read', description: 'fewer, much longer reads, can span repetitive regions', items: ['Lower per-base accuracy than short-read'] },
    ],
  }),

  'bio.bioinfo.multiomics-statistical-genomics': () => buildCellPathwayScene({
    conceptId: 'bio.bioinfo.multiomics-statistical-genomics',
    title: 'From Transcript to Metabolite: Three Omics Layers',
    teachingGoal: 'Testing 10,000 genes with NO real effects at p < 0.05 would still be expected to produce ≈ 500 false positives by pure chance — why correction is required.',
    stages: [
      { name: 'Transcriptomics (RNA-seq)', description: 'which genes are being transcribed, and at what level' },
      { name: 'Proteomics', description: 'which proteins are actually present — can differ from transcript levels' },
      { name: 'Metabolomics', description: 'the resulting small-molecule metabolic state' },
    ],
  }),

  'bio.biotech.agricultural-forensic-biotechnology': () => buildCellComparisonScene({
    conceptId: 'bio.biotech.agricultural-forensic-biotechnology',
    title: 'Marker-Assisted Breeding vs. DNA Fingerprinting',
    teachingGoal: 'Even a perfect STR match with perfect chain-of-custody still requires statistical interpretation to state its evidentiary strength correctly.',
    groups: [
      { label: 'Marker-assisted breeding', description: 'non-transgenic — uses genetic markers to select among conventionally cross-bred individuals', items: [] },
      { label: 'DNA fingerprinting (STR profiling)', description: 'compares short-tandem-repeat counts across multiple loci', items: ['Requires chain-of-custody AND statistical interpretation'] },
    ],
  }),

  // Batch 9 (bio.biotech, 2 concepts; bio.dev, 3 concepts; bio.div, 6
  // concepts):
  'bio.biotech.bioprocess-engineering': () => buildCellPathwayScene({
    conceptId: 'bio.biotech.bioprocess-engineering',
    title: 'Downstream Processing: Three Sequential Steps',
    teachingGoal: 'Scale-up introduces genuinely NEW engineering challenges (surface-area-to-volume ratio drops) — it is not a proportional resizing of an already-solved problem.',
    stages: [
      { name: 'Cell separation', description: 'removes the cultured cells from the surrounding culture medium' },
      { name: 'Purification', description: 'isolates the desired product from other unwanted components' },
      { name: 'Formulation', description: 'prepares the purified product into its final, stable, usable form' },
    ],
  }),

  'bio.biotech.gene-therapy-detail': () => buildCellComparisonScene({
    conceptId: 'bio.biotech.gene-therapy-detail',
    title: 'Viral vs. Non-Viral Gene Therapy Vectors',
    teachingGoal: 'This is a genuine trade-off — not "viral is better" or "non-viral is safer" as absolute statements.',
    groups: [
      { label: 'Viral vectors', description: 'higher delivery efficiency', items: ['Risk: immune response, insertional mutagenesis'] },
      { label: 'Non-viral vectors', description: 'lower safety risk (no viral components)', items: ['Typically lower delivery efficiency'] },
    ],
  }),

  'bio.dev.aging-senescence-biology': () => buildCellComparisonScene({
    conceptId: 'bio.dev.aging-senescence-biology',
    title: 'Cellular Senescence vs. Apoptosis',
    teachingGoal: 'A senescent cell stops dividing but remains ALIVE and metabolically active — genuinely different from apoptosis, where the cell is dismantled and eliminated.',
    groups: [
      { label: 'Senescence', description: 'permanent, irreversible proliferative arrest — the cell stays alive', items: ['Often secretes inflammatory signals (SASP)'] },
      { label: 'Apoptosis', description: 'programmed cell death — the cell is actively dismantled and removed', items: [] },
    ],
  }),

  'bio.dev.organogenesis': () => buildCellPathwayScene({
    conceptId: 'bio.dev.organogenesis',
    title: 'Reciprocal Induction: A Two-Way Signalling Loop',
    teachingGoal: 'Neither tissue layer could produce the correct organ structure alone — the organ emerges from the back-and-forth exchange itself.',
    cyclic: true,
    stages: [
      { name: 'Epithelium signals mesenchyme', description: 'instructing it to differentiate in a specific way' },
      { name: 'Mesenchyme signals back to epithelium', description: 'refining or redirecting its further development' },
    ],
  }),

  'bio.dev.regeneration-biology': () => buildCellComparisonScene({
    conceptId: 'bio.dev.regeneration-biology',
    title: 'Regenerative Capacity Varies — But Shares One Mechanism: Blastema Formation',
    teachingGoal: 'Mammals are not LACKING the machinery — they evolved to favour rapid scarring over slower, more extensive blastema-based regrowth.',
    groups: [
      { label: 'Planarians', description: 'whole-body regeneration from a small fragment', items: [] },
      { label: 'Axolotls', description: 'regenerate entire limbs (bone, muscle, nerve, skin)', items: [] },
      { label: 'Zebrafish', description: 'regenerate fin AND heart tissue', items: [] },
      { label: 'Mammals', description: 'favour rapid scarring over blastema-based regrowth', items: ['Trade-off: fast wound closure vs. full structural restoration'] },
    ],
  }),

  'bio.div.animal-body-plans-symmetry': () => buildCellComparisonScene({
    conceptId: 'bio.div.animal-body-plans-symmetry',
    title: 'Three Body Cavity Types',
    teachingGoal: 'A true coelom (completely lined by mesoderm) gives organs space to develop and move independently of the body wall.',
    groups: [
      { label: 'Acoelomate', description: 'no significant body cavity — solid mesodermal tissue fills the space', items: [] },
      { label: 'Pseudocoelomate', description: 'a body cavity only PARTIALLY lined by mesoderm', items: [] },
      { label: 'Coelomate', description: 'a TRUE coelom — completely lined by mesoderm', items: [] },
    ],
  }),

  'bio.div.arthropod-diversity': () => buildCellComparisonScene({
    conceptId: 'bio.div.arthropod-diversity',
    title: 'Four Arthropod Classes',
    teachingGoal: 'Moulting is the direct, necessary solution to the growth constraint the rigid exoskeleton itself creates — not an unrelated co-occurring trait.',
    groups: [
      { label: 'Insecta', description: 'three-part body (head, thorax, abdomen), 3 pairs of legs', items: [] },
      { label: 'Arachnida', description: 'two-part body (cephalothorax, abdomen), 4 pairs of legs', items: [] },
      { label: 'Crustacea', description: 'predominantly aquatic, 2 pairs of antennae', items: [] },
      { label: 'Myriapoda', description: 'many segments, 1–2 pairs of legs per segment', items: [] },
    ],
  }),

  'bio.div.chordate-vertebrate-diversity': () => buildCellStructureScene({
    conceptId: 'bio.div.chordate-vertebrate-diversity',
    subject: 'Phylum Chordata',
    boundaryLabel: 'Chordate embryonic hallmarks',
    teachingGoal: 'These four features are defining because they appear during EMBRYONIC development — many are later modified or lost in the adult (e.g. the notochord is replaced by the vertebral column).',
    parts: [
      { name: 'Notochord', description: 'a flexible, rod-like structure providing longitudinal support' },
      { name: 'Dorsal hollow nerve cord', description: 'runs along the back — develops into the spinal cord and brain' },
      { name: 'Pharyngeal slits', description: 'openings used for filter-feeding or respiration in some chordates' },
      { name: 'Post-anal tail', description: 'extends beyond the anus' },
    ],
  }),

  'bio.div.echinoderm-deuterostome-diversity': () => buildCellStructureScene({
    conceptId: 'bio.div.echinoderm-deuterostome-diversity',
    subject: 'Echinodermata',
    boundaryLabel: 'Echinodermata (a deuterostome, despite its adult form)',
    teachingGoal: 'Pentaradial symmetry is SECONDARILY DERIVED — echinoderms evolved from a bilateral ancestor and re-evolved radial symmetry; their larvae are bilateral.',
    parts: [
      { name: 'Deuterostome development', description: 'the blastopore becomes the anus — the shared signature linking echinoderms to chordates' },
      { name: 'Pentaradial symmetry', description: 'secondarily derived, not ancestral — larvae are bilateral' },
      { name: 'Water vascular system', description: 'a unique hydraulic system for locomotion, feeding, and gas exchange' },
      { name: 'Endoskeleton', description: 'internal, calcium-carbonate ossicles — unlike an arthropod’s external exoskeleton' },
    ],
  }),

  'bio.div.fish-amphibian-diversity': () => buildCellComparisonScene({
    conceptId: 'bio.div.fish-amphibian-diversity',
    title: 'Three Fish Groups by Jaw and Skeleton',
    teachingGoal: 'Amphibians achieved a PARTIAL water-to-land transition — adults tolerate land, but reproduction remains tied to water (no amniotic egg).',
    groups: [
      { label: 'Jawless fish', description: 'lack true jaws — the most ancestral condition', items: ['Lampreys, hagfish'] },
      { label: 'Cartilaginous fish', description: 'true jaws, skeleton made of cartilage', items: ['Sharks, rays'] },
      { label: 'Bony fish', description: 'true jaws AND a bony skeleton', items: ['The most numerous and diverse group'] },
    ],
  }),

  'bio.div.invertebrate-diversity-major-phyla': () => buildCellComparisonScene({
    conceptId: 'bio.div.invertebrate-diversity-major-phyla',
    title: 'Six Invertebrate Phyla by Defining Feature',
    teachingGoal: 'Classifying a specimen requires checking the SPECIFIC combination of symmetry, germ layers, body cavity, and the phylum’s own unique feature — not rote name memorisation.',
    groups: [
      { label: 'Porifera', description: 'cellular-grade organisation — no true tissues', items: ['Sponges'] },
      { label: 'Cnidaria', description: 'radial symmetry, nematocyst stinging cells', items: ['Jellyfish, corals'] },
      { label: 'Platyhelminthes', description: 'triploblastic, acoelomate, flattened body', items: ['Flatworms'] },
      { label: 'Nematoda', description: 'pseudocoelomate', items: ['Roundworms'] },
      { label: 'Annelida', description: 'true segmentation, full coelom', items: ['Segmented worms'] },
      { label: 'Mollusca', description: 'foot, visceral mass, mantle — widest body-plan diversity', items: ['Snails, cephalopods'] },
    ],
  }),

  'bio.div.mammalian-diversity': () => buildCellComparisonScene({
    conceptId: 'bio.div.mammalian-diversity',
    title: 'Three Mammalian Reproductive Strategies',
    teachingGoal: 'These are THREE different solutions within the SAME clade — not a linear progression from "primitive" to "advanced."',
    groups: [
      { label: 'Monotremes', description: 'lay eggs — still fully mammalian (hair, mammary glands, endothermy)', items: ['Platypus, echidna'] },
      { label: 'Marsupials', description: 'live but developmentally immature young, finishing development in a pouch', items: ['Kangaroos, opossums'] },
      { label: 'Placental mammals', description: 'longer internal development, nourished via a placenta', items: [] },
    ],
  }),

  // Batch 10 (bio.div, 1 concept; bio.evo, 4 concepts; bio.found, 2
  // concepts; bio.gen, 3 concepts; bio.immuno, 2 concepts):
  'bio.div.reptile-bird-diversity': () => buildCellHubScene({
    conceptId: 'bio.div.reptile-bird-diversity',
    hubLabel: 'Powered flight demands three things',
    title: "Bird Adaptations All Trace to Flight's Functional Demands",
    teachingGoal: 'Each bird adaptation is not an unconnected feature — it traces to one of three specific functional demands of powered flight.',
    spokes: [
      { name: 'Low body mass', description: 'lightweight, often hollow (pneumatic) bones and a fused, reinforced skeleton' },
      { name: 'Efficient oxygen delivery', description: 'unidirectional airflow with air sacs extracts oxygen more efficiently than tidal breathing' },
      { name: 'High sustained energy output', description: 'a high metabolic rate powers the substantial energy flight demands' },
    ],
  }),

  'bio.evo.coevolution-species-interactions': () => buildCellComparisonScene({
    conceptId: 'bio.evo.coevolution-species-interactions',
    title: 'Coevolution vs Parallel Adaptation',
    teachingGoal: "Genuine coevolution requires each species' change to be a RESPONSE TO the other species' change — not merely two species independently adapting to a shared environment.",
    groups: [
      { label: 'Coevolution (reciprocal)', description: 'each species evolution influences, and responds to, the other', items: ['Predator-prey arms race', 'Host-parasite arms race', 'Mutualistic pollinator specialisation'] },
      { label: 'Parallel adaptation (independent)', description: 'both species respond to the same external pressure, not to each other', items: ['Similar traits from a shared environment', 'No reciprocal influence between species'] },
    ],
  }),

  'bio.evo.convergent-evolution-homoplasy': () => buildCellComparisonScene({
    conceptId: 'bio.evo.convergent-evolution-homoplasy',
    title: 'Homoplasy: Two Ways Similarity Can Mislead',
    teachingGoal: 'Not every similarity reflects shared ancestry — homoplasy looks like evidence of close relationship but is not, and convergent and parallel evolution produce it two different ways.',
    groups: [
      { label: 'Convergent evolution', description: 'independent origin in lineages with no recent shared ancestor with that trait', items: ['Marsupial vs placental body forms', 'Camera eye in vertebrates and cephalopods'] },
      { label: 'Parallel evolution', description: 'shared ancestor, but the trait evolved separately in each lineage after diverging', items: ['Similar ancestral starting condition', 'Independently pushed to a similar solution'] },
    ],
  }),

  'bio.evo.macroevolution-extinction': () => buildCellComparisonScene({
    conceptId: 'bio.evo.macroevolution-extinction',
    title: 'Two Models of Evolutionary Tempo',
    teachingGoal: 'Both models share the same underlying mechanisms (mutation, selection, drift) — they differ only in their claim about the pattern and pacing of change over time.',
    groups: [
      { label: 'Phyletic gradualism', description: 'morphological change accumulates slowly and continuously', items: ['Steady, gradual change', 'No distinct bursts'] },
      { label: 'Punctuated equilibrium', description: 'long stasis, punctuated by rapid bursts of change around speciation', items: ['Long periods of stasis', 'Rapid change near speciation events'] },
    ],
  }),

  'bio.evo.phylogeography-biogeography': () => buildCellComparisonScene({
    conceptId: 'bio.evo.phylogeography-biogeography',
    title: 'Vicariance vs Dispersal',
    teachingGoal: 'The same disjunct distribution can arise from two alternative histories — telling them apart requires evidence, such as whether divergence timing matches a barrier forming.',
    groups: [
      { label: 'Vicariance', description: 'a formerly continuous range is later split by a new barrier', items: ['Population present before the barrier', 'Barrier arises and divides it'] },
      { label: 'Dispersal', description: 'individuals cross an already-existing barrier to colonise new ground', items: ['Barrier already present', 'Individuals cross it to colonise'] },
    ],
  }),

  'bio.found.scientific-method-in-biology': () => buildCellPathwayScene({
    conceptId: 'bio.found.scientific-method-in-biology',
    title: 'The Scientific Method: Testing Explanations Against Evidence',
    teachingGoal: 'A falsified hypothesis is not a failed experiment — it is a genuine result that narrows the space of possible explanations, exactly as a confirmed hypothesis does.',
    stages: [
      { name: 'Observation', description: 'prompts a specific, testable hypothesis' },
      { name: 'Controlled experiment', description: 'varies one independent variable, holds control variables constant, measures the dependent variable against a control group' },
      { name: 'Statistical evaluation', description: 'checks sample size and whether the result could plausibly be due to chance' },
      { name: 'Replication and peer review', description: 'independent researchers reproduce the result; experts scrutinise methods before publication' },
    ],
  }),

  'bio.found.unifying-themes-in-biology': () => buildCellHubScene({
    conceptId: 'bio.found.unifying-themes-in-biology',
    hubLabel: 'Four themes recur across every branch of biology',
    title: 'Four Unifying Themes in Biology',
    teachingGoal: 'These are not independent trivia but a small, recurring set of lenses — the same organising patterns appear again and again across every biology topic.',
    spokes: [
      { name: 'Structure-function relationship', description: 'form is shaped by, and explains, function, at every scale' },
      { name: 'Evolution as central theory', description: 'nothing in biology makes sense except in the light of evolution' },
      { name: 'Homeostasis', description: 'organisms actively maintain a stable internal environment despite external change' },
      { name: 'Energy flow and matter cycling', description: 'energy flows one-way and is lost as heat; matter cycles indefinitely' },
    ],
  }),

  'bio.gen.conservation-genetics': () => buildCellHubScene({
    conceptId: 'bio.gen.conservation-genetics',
    hubLabel: 'Effective size (Ne) is smaller than census size (N) because:',
    title: 'Why Effective Population Size Is Smaller Than Census Size',
    teachingGoal: 'A population that looks numerically healthy by census count can still be genetically vulnerable if its effective population size is much smaller.',
    spokes: [
      { name: 'Unequal sex ratios', description: 'genetic contribution concentrates in fewer breeding individuals than the total count suggests' },
      { name: 'Variance in reproductive success', description: 'a few individuals produce most offspring, narrowing diversity faster than headcount suggests' },
      { name: 'Population fluctuations', description: 'a past bottleneck dominates genetic effects even after the population later recovers in count' },
    ],
  }),

  'bio.gen.genetic-testing-counseling': () => buildCellComparisonScene({
    conceptId: 'bio.gen.genetic-testing-counseling',
    title: 'Carrier Screening vs Prenatal Diagnostic Testing',
    teachingGoal: "These serve distinct purposes at distinct times: carrier screening assesses parental risk before or independent of a pregnancy; prenatal testing directly assesses the fetus once a pregnancy is established.",
    groups: [
      { label: 'Carrier screening', description: 'tests prospective parents before or early in pregnancy for recessive-allele risk', items: ['Assesses parental risk', 'Performed before/independent of pregnancy'] },
      { label: 'Prenatal diagnostic testing', description: 'directly assesses the fetus during an established pregnancy', items: ['Amniocentesis (15-20 weeks)', 'Chorionic villus sampling (10-13 weeks)', 'Non-invasive prenatal testing (maternal blood, screening only)'] },
    ],
  }),

  'bio.gen.quantitative-genetics-heritability': () => buildCellComparisonScene({
    conceptId: 'bio.gen.quantitative-genetics-heritability',
    title: 'Broad-Sense vs Narrow-Sense Heritability',
    teachingGoal: 'Heritability is a population-specific statistic, not a fixed property of a trait — the same trait can have a different heritability value in a different population or environment.',
    groups: [
      { label: 'Broad-sense heritability (H2)', description: 'captures all genetic variance: additive, dominance and epistatic effects together', items: ['Additive effects', 'Dominance effects', 'Epistatic (gene-gene) effects'] },
      { label: 'Narrow-sense heritability (h2)', description: 'captures only additive genetic variance — the part that predictably transmits to offspring', items: ['Additive effects only', 'Predicts response to selection'] },
    ],
  }),

  'bio.immuno.cancer-immunology-immunotherapy': () => buildCellComparisonScene({
    conceptId: 'bio.immuno.cancer-immunology-immunotherapy',
    title: 'Two Mechanistically Different Cancer Immunotherapies',
    teachingGoal: 'Checkpoint inhibitors restore an already-existing but suppressed T-cell capability; CAR-T therapy engineers a new recognition capability entirely — these are not variations of the same idea.',
    groups: [
      { label: 'Checkpoint inhibitors', description: 'block PD-1/PD-L1 or CTLA-4 to release the brake tumours exploit', items: ['Restores existing T-cell capability', 'Does not attack the tumour directly'] },
      { label: 'CAR-T cell therapy', description: "engineers the patient's own T cells with a chimeric antigen receptor", items: ['Extract, engineer, reinfuse T cells', 'Creates a new recognition capability'] },
    ],
  }),

  'bio.immuno.cytokines-immune-signaling': () => buildCellHubScene({
    conceptId: 'bio.immuno.cytokines-immune-signaling',
    hubLabel: 'Cytokines: the molecular language of immune signalling',
    title: 'Three Cytokine Classes, Three Distinct Roles',
    teachingGoal: 'Cytokine storm is not an exotic new mechanism — it is the same normal signalling machinery operating in a severely dysregulated, excessive way.',
    spokes: [
      { name: 'Interleukins', description: 'signal between leukocytes — activate T cells, promote inflammation, or suppress immune activity' },
      { name: 'Interferons', description: 'signal neighbouring uninfected cells to activate antiviral defences before they too are infected' },
      { name: 'Tumour necrosis factor (TNF)', description: 'a pro-inflammatory cytokine that can directly induce apoptosis in target cells' },
    ],
  }),

  // Batch 11 (bio.immuno, 1 concept; bio.micro, 4 concepts; bio.mol, 4
  // concepts; bio.neuro, 3 concepts):
  'bio.immuno.t-cell-development-tolerance': () => buildCellPathwayScene({
    conceptId: 'bio.immuno.t-cell-development-tolerance',
    title: 'T Cell Selection in the Thymus: Two Sequential Tests',
    teachingGoal: 'The distinguishing test between these stages is not simply binding self-MHC or not, but the STRENGTH of binding: too weak means death by neglect, appropriately moderate means survival, too strong to self-antigen means death by negative selection.',
    stages: [
      { name: 'Positive selection', description: 'rescues T cells whose receptor binds self-MHC with at least weak-to-moderate affinity' },
      { name: 'Negative selection', description: 'eliminates surviving T cells whose receptor binds self-antigen too strongly' },
      { name: 'Peripheral tolerance', description: 'regulatory T cells and anergy catch weakly self-reactive cells that escape the thymus' },
    ],
  }),

  'bio.micro.antimicrobial-resistance': () => buildCellHubScene({
    conceptId: 'bio.micro.antimicrobial-resistance',
    hubLabel: 'How bacteria resist antibiotics: three molecular mechanisms',
    title: 'Three Molecular Mechanisms of Antibiotic Resistance',
    teachingGoal: 'Resistance is SELECTED, not induced, by the drug — the antibiotic kills susceptible bacteria and lets already-resistant individuals survive and spread, often via horizontal gene transfer.',
    spokes: [
      { name: 'Efflux pumps', description: 'actively pump the antibiotic back out of the cell before it reaches an effective concentration' },
      { name: 'Enzymatic drug inactivation', description: 'bacterial enzymes like beta-lactamases chemically destroy the antibiotic molecule' },
      { name: 'Target-site modification', description: 'alters the molecule the antibiotic binds, so it can no longer act even if it reaches the target' },
    ],
  }),

  'bio.micro.archaea-extremophiles': () => buildCellHubScene({
    conceptId: 'bio.micro.archaea-extremophiles',
    hubLabel: 'Extremophile categories match a specific extreme condition',
    title: 'Four Extremophile Categories, Four Distinct Stressors',
    teachingGoal: 'Each category is tied to a distinct specific stressor, not an interchangeable label for organisms living in harsh places — each has molecular adaptations tailored to that specific stress.',
    spokes: [
      { name: 'Thermophiles', description: 'tolerate high-temperature environments' },
      { name: 'Halophiles', description: 'tolerate high-salt environments' },
      { name: 'Acidophiles', description: 'tolerate low pH, highly acidic environments' },
      { name: 'Piezophiles', description: 'tolerate high-pressure environments, such as deep ocean trenches' },
    ],
  }),

  'bio.micro.human-microbiome-detail': () => buildCellHubScene({
    conceptId: 'bio.micro.human-microbiome-detail',
    hubLabel: 'Microbiome-host interactions: three distinct mechanisms',
    title: 'Three Distinct Microbiome-Host Interactions',
    teachingGoal: 'These are genuinely different mechanisms, not three descriptions of the same underlying process — dysbiosis disrupts them and links the microbiome to metabolic and inflammatory disease.',
    spokes: [
      { name: 'Nutrient synthesis', description: 'gut bacteria synthesise compounds the host cannot produce, such as certain vitamins and short-chain fatty acids' },
      { name: 'Immune system training', description: 'exposure to diverse microbes helps the immune system learn to distinguish harmless from harmful' },
      { name: 'Gut-brain signalling', description: 'microbial metabolites and vagus-nerve signals can influence the nervous system' },
    ],
  }),

  'bio.micro.microbial-metabolism-diversity': () => buildCellHubScene({
    conceptId: 'bio.micro.microbial-metabolism-diversity',
    hubLabel: 'Alternative metabolic strategies enable survival without light, oxygen, or organic carbon',
    title: 'Metabolic Versatility: Three Strategies Behind Extremophile Survival',
    teachingGoal: 'This metabolic versatility is the specific, causal basis of extremophile survival — each strategy avoids depending on a resource unavailable in that extreme environment.',
    spokes: [
      { name: 'Chemoautotrophy', description: 'derives energy from oxidising inorganic chemicals, such as hydrogen sulfide or ammonia, not light' },
      { name: 'Anoxygenic photosynthesis', description: 'purple and green sulfur bacteria use light with a non-water electron donor and release no oxygen' },
      { name: 'Anaerobic respiration', description: 'uses nitrate, sulfate, or carbon dioxide as the terminal electron acceptor in place of oxygen' },
    ],
  }),

  'bio.mol.alternative-splicing-rna-diversity': () => buildCellHubScene({
    conceptId: 'bio.mol.alternative-splicing-rna-diversity',
    hubLabel: 'One pre-mRNA, multiple mature mRNAs',
    title: 'Four Ways Alternative Splicing Creates Protein Diversity',
    teachingGoal: 'Because a single gene can generate multiple distinct transcripts, the total number of proteins an organism produces is far larger than its raw gene count would suggest.',
    spokes: [
      { name: 'Exon skipping', description: 'a particular exon is excluded from some mature mRNA versions but included in others' },
      { name: 'Intron retention', description: 'a particular intron is retained, becoming part of the final coding sequence' },
      { name: 'Alternative splice sites', description: 'the exact boundary position used for a splicing cut shifts where an exon begins or ends' },
      { name: 'Mutually exclusive exons', description: 'only one of two or more alternative exons is ever included in a single mature mRNA' },
    ],
  }),

  'bio.mol.chromatin-structure-genome-organization': () => buildCellPathwayScene({
    conceptId: 'bio.mol.chromatin-structure-genome-organization',
    title: 'DNA Packaging: Increasingly Higher-Order Levels',
    teachingGoal: 'Genome architecture is a genuine regulatory constraint, not passive packaging — an enhancer can influence a distant gene only if chromatin looping brings them into physical proximity in 3D space.',
    stages: [
      { name: 'Nucleosome', description: 'a histone octamer with DNA wound around it, linked by short stretches of linker DNA — "beads on a string"' },
      { name: 'Higher-order folding', description: 'nucleosomes fold further into 30 nm fibres and additional loops' },
      { name: 'Topologically associating domains', description: 'CTCF and cohesin anchor chromatin loops, bringing distant DNA points into close physical proximity' },
    ],
  }),

  'bio.mol.metabolic-regulation-integration': () => buildCellComparisonScene({
    conceptId: 'bio.mol.metabolic-regulation-integration',
    title: 'Insulin vs Glucagon: Reciprocal Metabolic Control',
    teachingGoal: 'Hormonal control ensures the body never runs opposing pathways at once — metabolism shifts between two distinct, coherent operating modes depending on blood glucose.',
    groups: [
      { label: 'Insulin (fed state)', description: 'released when blood glucose is high', items: ['Promotes glycolysis', 'Promotes glycogen synthesis', 'Suppresses gluconeogenesis and glycogen breakdown'] },
      { label: 'Glucagon (fasted state)', description: 'released when blood glucose is low', items: ['Promotes gluconeogenesis', 'Promotes glycogen breakdown', 'Suppresses glycolysis and glycogen synthesis'] },
    ],
  }),

  'bio.mol.protein-quality-control-autophagy': () => buildCellHubScene({
    conceptId: 'bio.mol.protein-quality-control-autophagy',
    hubLabel: 'Four distinct routes for degrading proteins that cannot be rescued',
    title: 'Four Mechanistically Distinct Protein Degradation Routes',
    teachingGoal: 'Proteostasis collapse in neurodegenerative disease reflects a failure of this overall quality-control capacity, not an isolated increase in misfolding events.',
    spokes: [
      { name: 'Macroautophagy', description: 'a double-membrane autophagosome engulfs damaged material and fuses with a lysosome' },
      { name: 'Microautophagy', description: 'the lysosome membrane directly engulfs small portions of cytoplasm at its surface' },
      { name: 'Chaperone-mediated autophagy', description: 'chaperones recognise a targeting sequence and deliver individual proteins across the lysosomal membrane' },
      { name: 'Ubiquitin-proteasome system', description: 'ubiquitin tags mark unwanted proteins for degradation by the proteasome' },
    ],
  }),

  'bio.neuro.audition-vestibular-system': () => buildCellPathwayScene({
    conceptId: 'bio.neuro.audition-vestibular-system',
    title: 'Sound Transmission Through the Ear',
    teachingGoal: "The cochlea and vestibular apparatus rely on the same hair-cell mechanotransduction mechanism, but serve completely different functions: hearing versus balance.",
    stages: [
      { name: 'Outer ear', description: 'the pinna and ear canal collect and channel sound waves toward the eardrum' },
      { name: 'Middle ear', description: 'three small bones mechanically amplify and transmit the vibrations inward' },
      { name: 'Inner ear (cochlea)', description: 'hair-cell mechanotransduction converts mechanical vibration into an electrical signal, tonotopically coded by frequency' },
    ],
  }),

  'bio.neuro.autonomic-stress-physiology': () => buildCellPathwayScene({
    conceptId: 'bio.neuro.autonomic-stress-physiology',
    title: 'The HPA Axis: The Slower Hormonal Stress Response',
    teachingGoal: 'The same cortisol response that is adaptive when brief becomes damaging when activated chronically — this cumulative cost is called allostatic load.',
    stages: [
      { name: 'Hypothalamus', description: 'releases a releasing hormone signalling the pituitary gland' },
      { name: 'Pituitary gland', description: 'releases a hormone signalling the adrenal glands' },
      { name: 'Adrenal glands', description: 'release cortisol into the bloodstream, mobilising energy and reprioritising resources' },
    ],
  }),

  'bio.neuro.brain-regional-organization': () => buildCellStructureScene({
    conceptId: 'bio.neuro.brain-regional-organization',
    subject: 'Cerebral Cortex',
    boundaryLabel: 'Cortical surface',
    teachingGoal: 'The four lobes are a further subdivision within the forebrain, operating at a different structural scale than the forebrain/midbrain/hindbrain scheme — not a competing classification of the same structures.',
    parts: [
      { name: 'Frontal lobe', description: 'planning, decision-making, and voluntary movement initiation' },
      { name: 'Parietal lobe', description: 'sensory integration and spatial processing' },
      { name: 'Temporal lobe', description: 'auditory processing and aspects of memory and language' },
      { name: 'Occipital lobe', description: 'visual processing' },
    ],
  }),
}

const DANIELL_CELL: ElectrochemicalCellParams = {
  cellType: 'galvanic',
  anode: { material: 'Zn', ion: 'Zn2+', standardPotential: -0.76 },
  cathode: { material: 'Cu', ion: 'Cu2+', standardPotential: 0.34 },
  electronsTransferred: 2,
  name: 'Daniell Cell',
}

const HEXAAMMINECOBALT: CoordinationComplexDef = {
  name: 'Hexaamminecobalt(III) ion',
  centralMetal: 'Co',
  charge: '3+',
  geometry: 'octahedral',
  ligands: [{ formula: 'NH3', count: 6 }],
  coordinationNumber: 6,
}

const CISPLATIN: CoordinationComplexDef = {
  name: 'Cisplatin',
  centralMetal: 'Pt',
  charge: '',
  geometry: 'square_planar',
  ligands: [{ formula: 'NH3', count: 2 }, { formula: 'Cl', count: 2 }],
  isomer: 'cis',
  coordinationNumber: 4,
}

/**
 * Build the canonical scene for a concept, falling back to its generator kind's
 * default parameters.
 *
 * Returns null for an unknown kind, a concept explicitly mapped to null, or a
 * throwing builder, so the caller falls back to the concept's VisualCard
 * exactly as before — activation can never make a concept less visual than it
 * already was.
 */
export function buildCanonicalScene(kind: string | null, conceptId?: string | null): SceneSpec | null {
  const override = conceptId ? CONCEPT_SCENES[conceptId] : undefined
  if (override) {
    try {
      return frame(override())
    } catch {
      return null
    }
  }
  if (!kind) return null
  const build = CANONICAL_SCENES[kind]
  if (!build) return null
  try {
    return frame(build())
  } catch {
    return null
  }
}

/**
 * THE FRAMING BOUNDARY — the single place every deterministic scene passes
 * through on its way to the resolver, and therefore the only place framing
 * needs to be applied.
 *
 * Each builder chooses `cameraDistance` from a constant of its own with no
 * relation to the geometry it just produced: `VISUAL_MAX * 2.5` here,
 * `Math.max(qMax, price) * 2.5` there, and one literal 500. Measured across the
 * corpus, 20 of 36 scenes filled under half their frame — the Vector Addition
 * figure a learner was actually shown occupied 6.6% of the canvas, pushed into
 * one quadrant, which is why its correct labels and correct geometry were
 * nonetheless unreadable.
 *
 * `fitSceneToFrame` re-frames ONLY a scene that measures badly, by a rigid
 * translation plus a camera distance derived from the geometry's own extent.
 * A well-framed scene is returned unchanged, so the seven hand-tuned M4 pilot
 * figures (56-64% fill) are byte-identical. Nothing is scaled, relabelled or
 * reordered — every distance and angle in the figure survives exactly.
 */
function frame(scene: SceneSpec | null): SceneSpec | null {
  return scene ? fitSceneToFrame(scene) : null
}

/** Concepts with their own parameters — for coverage tests. */
export const CONCEPT_SCENE_OVERRIDES = Object.keys(CONCEPT_SCENES)

/** Generator kinds with canonical parameters — for coverage tests. */
export const ACTIVATED_SCENE_KINDS = Object.keys(CANONICAL_SCENES)
