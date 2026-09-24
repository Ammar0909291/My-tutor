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
