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
