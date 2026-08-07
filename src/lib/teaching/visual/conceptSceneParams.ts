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
import { buildProjectileScene } from '@/lib/teaching/sceneGenerators/projectileMotion'
import { buildTriangleScene } from '@/lib/teaching/sceneGenerators/triangleAngleSum'
import { buildVectorScene } from '@/lib/teaching/sceneGenerators/vectorAddition'
import { buildCircularScene } from '@/lib/teaching/sceneGenerators/circularMotion'
import { buildPendulumScene } from '@/lib/teaching/sceneGenerators/pendulumMotion'
import { buildCollisionScene } from '@/lib/teaching/sceneGenerators/momentumCollision'
import { buildRayOpticsScene } from '@/lib/teaching/sceneGenerators/rayOptics'
import { buildCircuitScene } from '@/lib/teaching/sceneGenerators/electricCircuit'
import { buildKinematicsGraphScene } from '@/lib/teaching/sceneGenerators/kinematicsGraphs'
import { buildTorqueScene } from '@/lib/teaching/sceneGenerators/torqueDiagram'
import { buildGravitationOrbitScene } from '@/lib/teaching/sceneGenerators/gravitationOrbit'
import { buildCalculusGraphScene } from '@/lib/teaching/sceneGenerators/calculusGraph'
import { buildCoordinateGeometryLineScene } from '@/lib/teaching/sceneGenerators/coordinateGeometryLine'
import { buildHeightsAndDistancesScene } from '@/lib/teaching/sceneGenerators/heightsAndDistances'
import { buildStatisticsBarChartScene } from '@/lib/teaching/sceneGenerators/statisticsBarChart'
import { buildPunnettSquareScene } from '@/lib/teaching/sceneGenerators/punnettSquare'
import { buildEcologicalPyramidScene } from '@/lib/teaching/sceneGenerators/ecologicalPyramid'
import { buildDNAStructureScene } from '@/lib/teaching/sceneGenerators/dnaStructure'
import { buildCellDivisionScene } from '@/lib/teaching/sceneGenerators/cellDivision'
import { buildLogicGateScene } from '@/lib/teaching/sceneGenerators/logicGate'
import { buildERDiagramScene } from '@/lib/teaching/sceneGenerators/erDiagram'
import { buildPeriodicTrendScene } from '@/lib/teaching/sceneGenerators/periodicTrends'
import { buildTimelineScene } from '@/lib/teaching/sceneGenerators/historicalTimeline'
import { buildOrgChartScene } from '@/lib/teaching/sceneGenerators/civicsOrgChart'
import { buildDemographicPyramidScene } from '@/lib/teaching/sceneGenerators/demographicPyramid'
import { buildEconomicsCurveScene } from '@/lib/teaching/sceneGenerators/economicsCurves'
import { buildElectronShellScene, lookupElement } from '@/lib/teaching/sceneGenerators/electronShells'
import { buildLatticeScene, lookupLattice } from '@/lib/teaching/sceneGenerators/crystalLattice'
import { buildMoleculeScene, lookupMolecule } from '@/lib/teaching/sceneGenerators/moleculeGeometry'

/**
 * The def-table generators (element / lattice / molecule) own their own data and
 * expose a pure lookup. Using it keeps their canonical values in ONE place —
 * theirs — instead of copying textbook constants into a second table here.
 */
function mustLookup<T>(def: T | null): T {
  if (!def) throw new Error('canonical scene lookup failed')
  return def
}

/** Every generator kind the registry can name, bound to a canonical build. */
const CANONICAL_SCENES: Record<string, () => SceneSpec> = {
  // ── physics ──
  projectile:      () => buildProjectileScene({ angleDegrees: 45, speed: 20 }),
  circular:        () => buildCircularScene({ radius: 2, speed: 4 }),
  pendulum:        () => buildPendulumScene({ length: 1, amplitudeDeg: 15 }),
  // Head-on, both bodies moving: a stationary target (u2 = 0) draws a
  // zero-length velocity vector, which the scene validator correctly rejects.
  collision:       () => buildCollisionScene({ m1: 2, m2: 1, u1: 3, u2: -2, collisionType: 'elastic' }),
  torque_diagram:  () => buildTorqueScene({ leverLength: 2, force: 10, angleDeg: 90 }),
  gravitation_orbit: () => buildGravitationOrbitScene({ centralMass: 5.97e24, orbitRadius: 7.0e6 }),
  ray_optics:      () => buildRayOpticsScene({ opticsType: 'convex_lens', objectDistance: 30, focalLength: 10, objectHeight: 5 }),
  electric_circuit: () => buildCircuitScene({
    components: [
      { type: 'resistor', value: 10, unit: 'ohm' },
      { type: 'resistor', value: 20, unit: 'ohm' },
    ],
    connection: 'series',
    voltage: 12,
  }),
  kinematics_graphs: () => buildKinematicsGraphScene({ initialVelocity: 0, acceleration: 2, duration: 5, initialPosition: 0 }),

  // ── mathematics ──
  vector:   () => buildVectorScene({ aMag: 3, aAngleDeg: 0, bMag: 4, bAngleDeg: 90 }),  // the 3-4-5 case
  triangle: () => buildTriangleScene({ angleA: 60, angleB: 60 }),
  calculus_graph: () => buildCalculusGraphScene({ functionType: 'polynomial', coefficients: [1, -4, 3], domainMin: -1, domainMax: 5 }),
  coordinate_geometry_line: () => buildCoordinateGeometryLineScene({ x1: 0, y1: 0, x2: 4, y2: 3 }),
  heights_and_distances: () => buildHeightsAndDistancesScene({ distance: 30, angleOfElevation: 30 }),
  statistics_bar_chart: () => buildStatisticsBarChartScene({
    chartTitle: 'Marks scored',
    bars: [
      { label: '0-10', frequency: 2 }, { label: '10-20', frequency: 5 },
      { label: '20-30', frequency: 9 }, { label: '30-40', frequency: 4 },
    ],
  }),

  // ── chemistry ──
  electron_shells:  () => buildElectronShellScene(mustLookup(lookupElement('Na'))),
  lattice:          () => buildLatticeScene(mustLookup(lookupLattice('fcc'))),
  molecule:         () => buildMoleculeScene(mustLookup(lookupMolecule('water'))),
  periodic_trends:  () => buildPeriodicTrendScene({ element1Symbol: 'Na', element2Symbol: 'Cl' }),

  // ── biology ──
  punnett_square:     () => buildPunnettSquareScene({ parent1Genotype: 'Aa', parent2Genotype: 'Aa' }),
  ecological_pyramid: () => buildEcologicalPyramidScene({ trophicLevels: ['Producers', 'Herbivores', 'Carnivores'], baseEnergy: 10000 }),
  dna_structure:      () => buildDNAStructureScene({ sequence: 'ATGC' }),
  cell_division:      () => buildCellDivisionScene({ divisionType: 'mitosis' }),

  // ── computer science ──
  logic_gate: () => buildLogicGateScene({ gateType: 'AND', inputs: [true, false] }),
  er_diagram: () => buildERDiagramScene({
    entities: [
      { name: 'Student', attributes: ['id', 'name'] },
      { name: 'Course', attributes: ['code', 'title'] },
    ],
    relationships: [{ from: 'Student', to: 'Course', cardinality: 'many-to-many' }],
  }),

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
  economics_curves: () => buildEconomicsCurveScene({
    curveType: 'both', shiftDirection: 'none',
    equilibriumPrice: 50, equilibriumQuantity: 100,
  }),
}

/**
 * Build the canonical scene for a registry-named generator kind.
 *
 * Returns null for an unknown kind or a throwing builder, so the caller falls
 * back to the concept's VisualCard exactly as before — activation can never
 * make a concept less visual than it already was.
 */
export function buildCanonicalScene(kind: string | null): SceneSpec | null {
  if (!kind) return null
  const build = CANONICAL_SCENES[kind]
  if (!build) return null
  try {
    return build()
  } catch {
    return null
  }
}

/** Generator kinds with canonical parameters — for coverage tests. */
export const ACTIVATED_SCENE_KINDS = Object.keys(CANONICAL_SCENES)
