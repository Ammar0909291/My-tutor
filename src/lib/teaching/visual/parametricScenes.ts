/**
 * The variable layer — a figure the learner can change, and watch change.
 *
 * THE ROOT CAUSE THIS CLOSES. Every canonical figure in the product was built
 * from a FROZEN parameter set (`conceptSceneParams.ts`: a 45° launch, a 3-4-5
 * vector pair, a 2 m lever at 90°) on the server, once, and shipped as a
 * finished picture. So the engine could show a relationship but could never
 * demonstrate one: there was no way to raise the force and watch the torque
 * follow, because after generation there were no parameters left — only
 * coordinates. Cause-and-effect, interactive manipulation and predict-then-
 * reveal were all blocked by the same missing layer, not by three separate
 * gaps.
 *
 * This module is that layer. A scene kind registers:
 *
 *   defaults    the canonical, textbook parameter set (the SINGLE source of
 *               truth — `conceptSceneParams` now builds from it)
 *   variables   which of those parameters a learner may move, with bounds,
 *               units, and the CAUSAL CLAIM each one makes
 *   build       the generator's own pure builder, behind its own validator
 *
 * ── IT RE-RUNS THE SAME CODE ────────────────────────────────────────────────
 * A slider does not nudge coordinates. It re-runs the generator — the identical
 * pure function the server used — so an adjusted figure is exactly as correct
 * as the one the learner was handed, and every derived quantity (the torque,
 * the range, the resultant) is re-derived rather than re-scaled. A value the
 * generator's own validator rejects produces NO figure instead of a wrong one.
 *
 * ── WHY IT IS CLIENT-SAFE ───────────────────────────────────────────────────
 * It imports `*.pure` modules only. The generators' LLM extractors reach the
 * provider router, the AI budget and the rate limiter; none of that may enter a
 * browser bundle. `src/tests/sceneGeneratorPurity.test.ts` enforces it.
 *
 * ── NO CONCEPT KNOWS ABOUT THIS ─────────────────────────────────────────────
 * Registration is per GENERATOR KIND, never per concept. Every concept the
 * registry binds to a registered kind becomes interactive at once, and a kind
 * that is not registered simply shows no controls — never a control that does
 * nothing.
 */

import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { fitSceneToFrame } from './layout'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { buildTorqueScene, validateTorqueParams } from '@/lib/teaching/sceneGenerators/torqueDiagram.pure'
import { buildProjectileScene, validateProjectileParams } from '@/lib/teaching/sceneGenerators/projectileMotion.pure'
import { buildVectorScene, validateVectorParams } from '@/lib/teaching/sceneGenerators/vectorAddition.pure'
import { buildCircularScene, validateCircularParams } from '@/lib/teaching/sceneGenerators/circularMotion.pure'
import { buildPendulumScene, validatePendulumParams } from '@/lib/teaching/sceneGenerators/pendulumMotion.pure'
import { buildCollisionScene, validateCollisionParams } from '@/lib/teaching/sceneGenerators/momentumCollision.pure'
import { buildTriangleScene, validateTriangleParams } from '@/lib/teaching/sceneGenerators/triangleAngleSum.pure'
import { buildCoordinateGeometryLineScene, validateCoordinateGeometryParams } from '@/lib/teaching/sceneGenerators/coordinateGeometryLine.pure'
import { buildHeightsAndDistancesScene, validateHeightsAndDistancesParams } from '@/lib/teaching/sceneGenerators/heightsAndDistances.pure'
import { buildKinematicsGraphScene, validateKinematicsParams } from '@/lib/teaching/sceneGenerators/kinematicsGraphs.pure'
import { buildRayOpticsScene, validateRayOpticsParams } from '@/lib/teaching/sceneGenerators/rayOptics.pure'
import { buildMoleculeScene, lookupMolecule } from '@/lib/teaching/sceneGenerators/moleculeGeometry.pure'
import { buildLatticeScene, lookupLattice } from '@/lib/teaching/sceneGenerators/crystalLattice.pure'
import { buildElectronShellScene, lookupElement } from '@/lib/teaching/sceneGenerators/electronShells.pure'
import { buildCalculusGraphScene, validateCalculusParams } from '@/lib/teaching/sceneGenerators/calculusGraph.pure'
import { buildCellDivisionScene, validateCellDivisionParams } from '@/lib/teaching/sceneGenerators/cellDivision.pure'
import { buildEconomicsCurveScene, validateEconomicsParams } from '@/lib/teaching/sceneGenerators/economicsCurves.pure'
import { buildCircuitScene, validateCircuitParams } from '@/lib/teaching/sceneGenerators/electricCircuit.pure'
import { buildGravitationOrbitScene, validateGravitationParams } from '@/lib/teaching/sceneGenerators/gravitationOrbit.pure'
import { buildLogicGateScene, validateLogicGateParams } from '@/lib/teaching/sceneGenerators/logicGate.pure'
import { buildPeriodicTrendScene, validatePeriodicTrendParams } from '@/lib/teaching/sceneGenerators/periodicTrends.pure'
import { buildPunnettSquareScene, validatePunnettParams } from '@/lib/teaching/sceneGenerators/punnettSquare.pure'
import { buildDNAStructureScene, validateDNAStructureParams } from '@/lib/teaching/sceneGenerators/dnaStructure.pure'
import { buildEcologicalPyramidScene, validateEcologicalPyramidParams } from '@/lib/teaching/sceneGenerators/ecologicalPyramid.pure'
import { buildERDiagramScene, validateERDiagramParams } from '@/lib/teaching/sceneGenerators/erDiagram.pure'

/**
 * One variable a learner may move.
 *
 * `effect` is the point of the control, not decoration: a slider with no stated
 * consequence is a toy. It is shown beside the control and read aloud by the
 * accessible description, so the causal claim is available without watching the
 * figure move — which is what makes this usable under reduced motion and with
 * a screen reader.
 */
interface VariableBase {
  key: string
  label: string
  /** What changes when this moves. One clause, learner-facing. */
  effect: string
}

/** A quantity on a continuous range — a slider. */
export interface NumericVariable extends VariableBase {
  kind: 'number'
  min: number
  max: number
  step: number
  unit?: string
}

/**
 * A choice between named cases — a set of buttons.
 *
 * Not every variable is a magnitude. Which molecule, which lattice, which
 * element, elastic versus inelastic: these are the variables that matter in
 * chemistry and in half of mechanics, and a slider cannot express any of them.
 * Without this member the interaction layer would have been physics-only —
 * exactly the per-subject narrowing this engine exists to stop making.
 */
export interface ChoiceVariable extends VariableBase {
  kind: 'choice'
  options: readonly { value: string; label: string }[]
}

export type SceneVariable = NumericVariable | ChoiceVariable

/** The values a scene was built from. Numbers for ranges, names for choices. */
export type SceneParams = Record<string, number | string>

export interface ParametricScene {
  /** The canonical, textbook parameter set this kind's figure is built from. */
  defaults: SceneParams
  /** Only the parameters that make sense to vary for this figure. */
  variables: SceneVariable[]
  /**
   * Re-derive the figure. Returns null when the generator's own validator
   * refuses the values — a figure is never approximated to satisfy a control.
   */
  build: (params: SceneParams) => SceneSpec | null
}

/**
 * Build behind the generator's own validator, so a parameter the generator
 * considers impossible produces no figure rather than a misleading one.
 */
function guarded<P>(
  validate: (raw: unknown) => P | null,
  build: (p: P) => SceneSpec,
  fixed: Record<string, unknown> = {},
): (params: SceneParams) => SceneSpec | null {
  return (params) => {
    const valid = validate({ ...fixed, ...params })
    if (!valid) return null
    try {
      return build(valid)
    } catch {
      // A generator may throw on a combination its validator admits (a
      // degenerate triangle, an empty curve). No figure is the honest result.
      return null
    }
  }
}


/** A flat control value as a number, with the generator's own fallback. */
function num(v: number | string | undefined, fallback: number): number {
  return typeof v === 'number' && Number.isFinite(v) ? v : fallback
}

/**
 * A polynomial whose highest term is zero IS a lower-degree polynomial — the
 * generator rejects a leading zero, so the term is dropped rather than the
 * figure refused. An all-zero set has no curve to draw and stays refused.
 */
function dropLeadingZeros(coefficients: number[]): number[] {
  const first = coefficients.findIndex((c) => c !== 0)
  return first < 0 ? [0] : coefficients.slice(first)
}

/** Elements the trend generator has data for, in periodic order. */
const PERIODIC_CHOICES = ['Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca']
  .map((symbol) => ({ value: symbol, label: symbol }))

/** The three genotype cases a monohybrid cross can take. */
const GENOTYPE_CHOICES = [
  { value: 'AA', label: 'AA' },
  { value: 'Aa', label: 'Aa' },
  { value: 'aa', label: 'aa' },
]

const BIT_CHOICES = [
  { value: '0', label: '0' },
  { value: '1', label: '1' },
]

/** A food chain, longest first; a shorter chain is a prefix of it. */
const TROPHIC_CHAIN = ['Producers', 'Herbivores', 'Carnivores', 'Top carnivores', 'Apex predators']

export const PARAMETRIC_SCENES: Readonly<Record<string, ParametricScene>> = {
  torque_diagram: {
    defaults: { leverLength: 2, force: 10, angleDeg: 90 },
    variables: [
      { key: 'leverLength', label: 'r', kind: 'number', unit: 'm', min: 0.5, max: 6, step: 0.5, effect: 'a longer arm turns the same force into more torque' },
      { key: 'force', label: 'F', kind: 'number', unit: 'N', min: 1, max: 40, step: 1, effect: 'torque grows in direct proportion to the force' },
      { key: 'angleDeg', label: 'θ', kind: 'number', unit: '°', min: 0, max: 180, step: 5, effect: 'only the perpendicular part of the force turns the arm' },
    ],
    build: guarded(validateTorqueParams, buildTorqueScene),
  },

  projectile: {
    defaults: { angleDegrees: 45, speed: 20 },
    variables: [
      { key: 'angleDegrees', label: 'Launch angle', kind: 'number', unit: '°', min: 5, max: 85, step: 5, effect: 'range is greatest at 45°, and equal for angles either side of it' },
      { key: 'speed', label: 'Launch speed', kind: 'number', unit: 'm/s', min: 5, max: 50, step: 1, effect: 'range grows with the SQUARE of the speed, not in proportion to it' },
    ],
    build: guarded(validateProjectileParams, buildProjectileScene),
  },

  vector: {
    defaults: { aMag: 3, aAngleDeg: 0, bMag: 4, bAngleDeg: 90 },
    variables: [
      { key: 'aMag', label: '|a|', kind: 'number', min: 1, max: 10, step: 0.5, effect: 'lengthens the first vector, and the resultant with it' },
      { key: 'aAngleDeg', label: 'a direction', kind: 'number', unit: '°', min: 0, max: 350, step: 10, effect: 'turning a vector changes the resultant even when its length does not' },
      { key: 'bMag', label: '|b|', kind: 'number', min: 1, max: 10, step: 0.5, effect: 'lengthens the second vector' },
      { key: 'bAngleDeg', label: 'b direction', kind: 'number', unit: '°', min: 0, max: 350, step: 10, effect: 'the resultant is largest when the two point the same way, smallest when opposed' },
    ],
    build: guarded(validateVectorParams, buildVectorScene),
  },

  circular: {
    defaults: { radius: 2, speed: 4 },
    variables: [
      { key: 'radius', label: 'Radius', kind: 'number', unit: 'm', min: 0.5, max: 6, step: 0.5, effect: 'a wider circle needs LESS centripetal acceleration at the same speed' },
      { key: 'speed', label: 'Speed', kind: 'number', unit: 'm/s', min: 1, max: 12, step: 0.5, effect: 'acceleration grows with the square of the speed' },
    ],
    build: guarded(validateCircularParams, buildCircularScene),
  },

  pendulum: {
    defaults: { length: 1, amplitudeDeg: 15 },
    variables: [
      { key: 'length', label: 'Length', kind: 'number', unit: 'm', min: 0.2, max: 4, step: 0.1, effect: 'a longer pendulum swings more slowly — period goes as √L' },
      { key: 'amplitudeDeg', label: 'Amplitude', kind: 'number', unit: '°', min: 2, max: 45, step: 1, effect: 'for small swings the period barely changes — that is the whole point' },
    ],
    build: guarded(validatePendulumParams, buildPendulumScene),
  },

  collision: {
    defaults: { m1: 2, m2: 1, u1: 3, u2: -2, collisionType: 'elastic' },
    variables: [
      { key: 'm1', label: 'Mass A', kind: 'number', unit: 'kg', min: 0.5, max: 10, step: 0.5, effect: 'a heavier body changes velocity less in the same collision' },
      { key: 'm2', label: 'Mass B', kind: 'number', unit: 'kg', min: 0.5, max: 10, step: 0.5, effect: 'the mass RATIO decides how the velocities are shared' },
      { key: 'u1', label: 'Velocity A', kind: 'number', unit: 'm/s', min: -10, max: 10, step: 0.5, effect: 'total momentum before the collision equals total momentum after' },
      { key: 'u2', label: 'Velocity B', kind: 'number', unit: 'm/s', min: -10, max: 10, step: 0.5, effect: 'closing speed decides the outcome, not either speed alone' },
      {
        key: 'collisionType', label: 'Collision', kind: 'choice',
        options: [
          { value: 'elastic', label: 'Elastic' },
          { value: 'perfectly_inelastic', label: 'Perfectly inelastic' },
        ],
        effect: 'momentum is conserved in BOTH; kinetic energy only in the elastic case',
      },
    ],
    build: guarded(validateCollisionParams, buildCollisionScene),
  },

  triangle: {
    defaults: { angleA: 60, angleB: 60 },
    variables: [
      { key: 'angleA', label: 'Angle A', kind: 'number', unit: '°', min: 10, max: 160, step: 5, effect: 'the third angle absorbs the change — the three always total 180°' },
      { key: 'angleB', label: 'Angle B', kind: 'number', unit: '°', min: 10, max: 160, step: 5, effect: 'raising one angle must lower another' },
    ],
    build: guarded(validateTriangleParams, buildTriangleScene),
  },

  coordinate_geometry_line: {
    defaults: { x1: 0, y1: 0, x2: 4, y2: 3 },
    variables: [
      { key: 'x1', label: 'x₁', kind: 'number', min: -8, max: 8, step: 1, effect: 'moving an endpoint changes both the slope and the length' },
      { key: 'y1', label: 'y₁', kind: 'number', min: -8, max: 8, step: 1, effect: 'vertical movement changes the rise, and so the slope' },
      { key: 'x2', label: 'x₂', kind: 'number', min: -8, max: 8, step: 1, effect: 'horizontal movement changes the run' },
      { key: 'y2', label: 'y₂', kind: 'number', min: -8, max: 8, step: 1, effect: 'slope is rise over run — watch both terms' },
    ],
    build: guarded(validateCoordinateGeometryParams, buildCoordinateGeometryLineScene),
  },

  heights_and_distances: {
    defaults: { distance: 30, angleOfElevation: 30 },
    variables: [
      { key: 'distance', label: 'Distance', kind: 'number', unit: 'm', min: 5, max: 100, step: 5, effect: 'standing further back lowers the angle to the same object' },
      { key: 'angleOfElevation', label: 'Elevation', kind: 'number', unit: '°', min: 5, max: 80, step: 5, effect: 'height is distance × tan θ — the tangent does the work' },
    ],
    build: guarded(validateHeightsAndDistancesParams, buildHeightsAndDistancesScene),
  },

  kinematics_graphs: {
    defaults: { initialVelocity: 0, acceleration: 2, duration: 5, initialPosition: 0 },
    variables: [
      { key: 'initialVelocity', label: 'u', kind: 'number', unit: 'm/s', min: -10, max: 20, step: 1, effect: 'shifts where the velocity graph starts, not its steepness' },
      { key: 'acceleration', label: 'a', kind: 'number', unit: 'm/s²', min: -5, max: 10, step: 0.5, effect: 'acceleration IS the slope of the velocity graph' },
      { key: 'duration', label: 'Time', kind: 'number', unit: 's', min: 1, max: 12, step: 1, effect: 'displacement is the AREA under the velocity graph' },
    ],
    build: guarded(validateKinematicsParams, buildKinematicsGraphScene, { initialPosition: 0 }),
  },

  ray_optics: {
    defaults: { objectDistance: 30, focalLength: 10, objectHeight: 5, opticsType: 'convex_lens' },
    variables: [
      { key: 'objectDistance', label: 'Object distance', kind: 'number', unit: 'cm', min: 5, max: 60, step: 1, effect: 'crossing the focal point flips the image from real to virtual' },
      { key: 'focalLength', label: 'Focal length', kind: 'number', unit: 'cm', min: 3, max: 30, step: 1, effect: 'a stronger lens (shorter f) bends the rays more sharply' },
      { key: 'objectHeight', label: 'Object height', kind: 'number', unit: 'cm', min: 1, max: 12, step: 1, effect: 'magnification is a ratio — it does not depend on the object height' },
      {
        key: 'opticsType', label: 'Element', kind: 'choice',
        options: [
          { value: 'convex_lens', label: 'Convex lens' },
          { value: 'concave_lens', label: 'Concave lens' },
          { value: 'concave_mirror', label: 'Concave mirror' },
          { value: 'convex_mirror', label: 'Convex mirror' },
        ],
        effect: 'converging elements can form a real image; diverging ones never do',
      },
    ],
    build: guarded(validateRayOpticsParams, buildRayOpticsScene),
  },

  // ── chemistry: the variable is which case, not how much ───────────────────
  // These three generators own curated reference tables and expose a pure
  // lookup, so a choice is re-derived through the generator's own data — no
  // constant is copied here and no geometry is approximated.

  molecule: {
    defaults: { molecule: 'water' },
    variables: [
      {
        key: 'molecule', label: 'Molecule', kind: 'choice',
        options: [
          { value: 'water', label: 'H₂O' },
          { value: 'ammonia', label: 'NH₃' },
          { value: 'methane', label: 'CH₄' },
          { value: 'carbon dioxide', label: 'CO₂' },
          { value: 'hydrogen sulfide', label: 'H₂S' },
          { value: 'boron trifluoride', label: 'BF₃' },
        ],
        effect: 'lone pairs squeeze the bond angle — compare CH₄, NH₃ and H₂O in that order',
      },
    ],
    build: (p) => {
      const def = lookupMolecule(p.molecule)
      return def ? buildMoleculeScene(def) : null
    },
  },

  lattice: {
    defaults: { lattice: 'fcc' },
    variables: [
      {
        key: 'lattice', label: 'Unit cell', kind: 'choice',
        options: [
          { value: 'simple cubic', label: 'Simple cubic' },
          { value: 'bcc', label: 'Body-centred' },
          { value: 'fcc', label: 'Face-centred' },
        ],
        effect: 'corner atoms are shared eight ways — the atoms PER CELL is what changes',
      },
    ],
    build: (p) => {
      const def = lookupLattice(p.lattice)
      return def ? buildLatticeScene(def) : null
    },
  },

  electron_shells: {
    defaults: { element: 'Na' },
    variables: [
      {
        key: 'element', label: 'Element', kind: 'choice',
        options: [
          { value: 'H', label: 'H' }, { value: 'C', label: 'C' }, { value: 'N', label: 'N' },
          { value: 'O', label: 'O' }, { value: 'Ne', label: 'Ne' }, { value: 'Na', label: 'Na' },
          { value: 'Mg', label: 'Mg' }, { value: 'Cl', label: 'Cl' }, { value: 'Ar', label: 'Ar' },
          { value: 'K', label: 'K' }, { value: 'Ca', label: 'Ca' },
        ],
        effect: 'the OUTER shell count is what decides the chemistry, not the total',
      },
    ],
    build: (p) => {
      const def = lookupElement(p.element)
      return def ? buildElectronShellScene(def) : null
    },
  },

  // ── mathematics: the function itself is the variable ──────────────────────
  calculus_graph: {
    defaults: { functionType: 'polynomial', a: 1, b: -4, c: 3, domainMin: -1, domainMax: 5 },
    variables: [
      {
        key: 'functionType', label: 'Function', kind: 'choice',
        options: [
          { value: 'polynomial', label: 'Polynomial' },
          { value: 'trig', label: 'Trigonometric' },
          { value: 'exponential', label: 'Exponential' },
          { value: 'log', label: 'Logarithmic' },
        ],
        effect: 'the FAMILY decides the shape; the coefficients only stretch and shift it',
      },
      { key: 'a', label: 'a', kind: 'number', min: -5, max: 5, step: 0.5, effect: 'the leading coefficient sets how sharply the curve bends' },
      { key: 'b', label: 'b', kind: 'number', min: -8, max: 8, step: 0.5, effect: 'shifts where the turning point sits along x' },
      { key: 'c', label: 'c', kind: 'number', min: -8, max: 8, step: 0.5, effect: 'moves the whole curve up or down without changing its shape' },
      { key: 'domainMin', label: 'x from', kind: 'number', min: -10, max: 0, step: 1, effect: 'the window you look through does not change the function' },
      { key: 'domainMax', label: 'x to', kind: 'number', min: 1, max: 12, step: 1, effect: 'a wider window can reveal behaviour the first view hid' },
    ],
    build: (p) => {
      const type = String(p.functionType)
      const [a, b, c] = [num(p.a, 1), num(p.b, 0), num(p.c, 0)]
      // Each family accepts a DIFFERENT coefficient shape (the generator's own
      // validator enforces it), so the flat controls are mapped rather than
      // passed through. Leading zeros are dropped because a polynomial whose
      // highest term vanishes is a lower-degree polynomial, not an error.
      const coefficients =
        type === 'polynomial' ? dropLeadingZeros([a, b, c])
        : type === 'log' ? [a || 1]
        : [a || 1, b || 1]
      // log is undefined at or below zero, so its window starts above it. That
      // is the function's own domain, not a fudge to make a control work.
      const domainMin = type === 'log' ? Math.max(0.5, num(p.domainMin, 1)) : num(p.domainMin, -1)
      return guarded(validateCalculusParams, buildCalculusGraphScene)({
        functionType: type, coefficients, domainMin, domainMax: num(p.domainMax, 5),
      } as unknown as SceneParams)
    },
  },

  // ── physics: circuits, orbits ─────────────────────────────────────────────
  electric_circuit: {
    defaults: { connection: 'series', voltage: 12, r1: 10, r2: 20 },
    variables: [
      {
        key: 'connection', label: 'Wiring', kind: 'choice',
        options: [
          { value: 'series', label: 'Series' },
          { value: 'parallel', label: 'Parallel' },
        ],
        effect: 'in series the resistances ADD; in parallel the total is LESS than either one',
      },
      { key: 'voltage', label: 'Voltage', kind: 'number', min: 1, max: 48, step: 1, effect: 'current rises in proportion to voltage at fixed resistance' },
      { key: 'r1', label: 'R₁', kind: 'number', min: 1, max: 100, step: 1, effect: 'adding resistance in series always lowers the current' },
      { key: 'r2', label: 'R₂', kind: 'number', min: 1, max: 100, step: 1, effect: 'in parallel, a second path lets MORE current flow, not less' },
    ],
    build: (p) => guarded(validateCircuitParams, buildCircuitScene)({
      connection: String(p.connection),
      voltage: num(p.voltage, 12),
      components: [
        { type: 'resistor', value: num(p.r1, 10), unit: 'ohm' },
        { type: 'resistor', value: num(p.r2, 20), unit: 'ohm' },
      ],
    } as unknown as SceneParams),
  },

  gravitation_orbit: {
    // Presented in the units a learner can actually move: Earth masses and
    // thousands of kilometres. The generator still receives kg and metres.
    defaults: { centralMassEarths: 1, orbitRadiusMm: 7 },
    variables: [
      { key: 'centralMassEarths', label: 'Central mass', kind: 'number', unit: '× Earth', min: 0.1, max: 20, step: 0.1, effect: 'a heavier central body makes the same orbit faster, not slower' },
      { key: 'orbitRadiusMm', label: 'Orbit radius', kind: 'number', unit: 'Mm', min: 7, max: 60, step: 1, effect: 'a wider orbit is slower and takes far longer — period goes as r^(3/2)' },
    ],
    build: (p) => guarded(validateGravitationParams, buildGravitationOrbitScene)({
      centralMass: num(p.centralMassEarths, 1) * 5.97e24,
      orbitRadius: num(p.orbitRadiusMm, 7) * 1e6,
    } as unknown as SceneParams),
  },

  // ── chemistry: which pair of elements ─────────────────────────────────────
  periodic_trends: {
    defaults: { element1Symbol: 'Na', element2Symbol: 'Cl' },
    variables: [
      { key: 'element1Symbol', label: 'Element A', kind: 'choice', options: PERIODIC_CHOICES, effect: 'radius grows DOWN a group and shrinks ACROSS a period' },
      { key: 'element2Symbol', label: 'Element B', kind: 'choice', options: PERIODIC_CHOICES, effect: 'comparing two elements is how a trend becomes visible at all' },
    ],
    build: (p) => guarded(validatePeriodicTrendParams, buildPeriodicTrendScene)({
      element1Symbol: String(p.element1Symbol), element2Symbol: String(p.element2Symbol),
    } as unknown as SceneParams),
  },

  // ── biology ───────────────────────────────────────────────────────────────
  punnett_square: {
    defaults: { parent1Genotype: 'Aa', parent2Genotype: 'Aa' },
    variables: [
      { key: 'parent1Genotype', label: 'Parent 1', kind: 'choice', options: GENOTYPE_CHOICES, effect: 'a homozygous parent can only pass on one allele, so half the grid disappears' },
      { key: 'parent2Genotype', label: 'Parent 2', kind: 'choice', options: GENOTYPE_CHOICES, effect: 'the classic 3:1 ratio needs BOTH parents heterozygous — change one and it goes' },
    ],
    build: (p) => guarded(validatePunnettParams, buildPunnettSquareScene)({
      parent1Genotype: String(p.parent1Genotype), parent2Genotype: String(p.parent2Genotype),
    } as unknown as SceneParams),
  },

  cell_division: {
    defaults: { divisionType: 'mitosis' },
    variables: [
      {
        key: 'divisionType', label: 'Division', kind: 'choice',
        options: [
          { value: 'mitosis', label: 'Mitosis' },
          { value: 'meiosis', label: 'Meiosis' },
        ],
        effect: 'mitosis makes two identical cells; meiosis makes four with half the chromosomes',
      },
    ],
    build: (p) => guarded(validateCellDivisionParams, buildCellDivisionScene)({
      divisionType: String(p.divisionType),
    } as unknown as SceneParams),
  },

  dna_structure: {
    defaults: { sequence: 'ATGC' },
    variables: [
      {
        key: 'sequence', label: 'Sequence', kind: 'choice',
        options: [
          { value: 'ATGC', label: 'ATGC' },
          { value: 'AATT', label: 'AATT' },
          { value: 'GCGC', label: 'GCGC' },
          { value: 'ATGCATGC', label: 'ATGCATGC' },
        ],
        effect: 'A always pairs with T and G with C — the opposite strand is never a free choice',
      },
    ],
    build: (p) => guarded(validateDNAStructureParams, buildDNAStructureScene)({
      sequence: String(p.sequence),
    } as unknown as SceneParams),
  },

  ecological_pyramid: {
    defaults: { levels: '3', baseEnergy: 10000 },
    variables: [
      {
        key: 'levels', label: 'Trophic levels', kind: 'choice',
        options: [
          { value: '3', label: '3 levels' },
          { value: '4', label: '4 levels' },
          { value: '5', label: '5 levels' },
        ],
        effect: 'each level keeps about a tenth of the last, which is why food chains are short',
      },
      { key: 'baseEnergy', label: 'Producer energy', kind: 'number', unit: 'kJ', min: 1000, max: 100000, step: 1000, effect: 'more energy at the bottom does not add a level — the RATIO is what limits the chain' },
    ],
    build: (p) => guarded(validateEcologicalPyramidParams, buildEcologicalPyramidScene)({
      trophicLevels: TROPHIC_CHAIN.slice(0, Math.max(2, Math.min(5, Number(p.levels) || 3))),
      baseEnergy: num(p.baseEnergy, 10000),
    } as unknown as SceneParams),
  },

  // ── computer science ──────────────────────────────────────────────────────
  logic_gate: {
    defaults: { gateType: 'AND', inputA: '1', inputB: '0' },
    variables: [
      {
        key: 'gateType', label: 'Gate', kind: 'choice',
        options: (['AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR', 'XNOR'] as const).map((g) => ({ value: g, label: g })),
        effect: 'NAND and NOR are the inverses of AND and OR — same inputs, flipped output',
      },
      { key: 'inputA', label: 'Input A', kind: 'choice', options: BIT_CHOICES, effect: 'walking every input combination IS the truth table' },
      { key: 'inputB', label: 'Input B', kind: 'choice', options: BIT_CHOICES, effect: 'ignored by NOT, which takes a single input' },
    ],
    build: (p) => {
      const gateType = String(p.gateType)
      const bits = [p.inputA === '1', p.inputB === '1']
      return guarded(validateLogicGateParams, buildLogicGateScene)({
        gateType, inputs: gateType === 'NOT' ? bits.slice(0, 1) : bits,
      } as unknown as SceneParams)
    },
  },

  er_diagram: {
    defaults: { cardinality: 'many-to-many' },
    variables: [
      {
        key: 'cardinality', label: 'Cardinality', kind: 'choice',
        options: [
          { value: 'one-to-one', label: '1 : 1' },
          { value: 'one-to-many', label: '1 : N' },
          { value: 'many-to-many', label: 'N : M' },
        ],
        effect: 'only a many-to-many relationship needs a join table of its own',
      },
    ],
    build: (p) => guarded(validateERDiagramParams, buildERDiagramScene)({
      entities: [
        { name: 'Student', attributes: ['id', 'name'] },
        { name: 'Course', attributes: ['code', 'title'] },
      ],
      relationships: [{ from: 'Student', to: 'Course', cardinality: String(p.cardinality) }],
    } as unknown as SceneParams),
  },

  // ── economics ─────────────────────────────────────────────────────────────
  economics_curves: {
    defaults: { curveType: 'both', shiftDirection: 'none', equilibriumPrice: 50, equilibriumQuantity: 100 },
    variables: [
      {
        key: 'curveType', label: 'Curves', kind: 'choice',
        options: [
          { value: 'both', label: 'Supply & demand' },
          { value: 'supply', label: 'Supply only' },
          { value: 'demand', label: 'Demand only' },
        ],
        effect: 'a price is only settled where the two curves meet — one alone fixes nothing',
      },
      {
        key: 'shiftDirection', label: 'Shift', kind: 'choice',
        options: [
          { value: 'none', label: 'No shift' },
          { value: 'right', label: 'Rightward' },
          { value: 'left', label: 'Leftward' },
        ],
        effect: 'a curve SHIFTING is a different event from moving along it',
      },
      { key: 'equilibriumPrice', label: 'Price', kind: 'number', min: 10, max: 200, step: 10, effect: 'the equilibrium is where the market settles, not where anyone chooses' },
      { key: 'equilibriumQuantity', label: 'Quantity', kind: 'number', min: 20, max: 300, step: 10, effect: 'quantity and price are set together, never one at a time' },
    ],
    build: (p) => guarded(validateEconomicsParams, buildEconomicsCurveScene)({
      curveType: String(p.curveType), shiftDirection: String(p.shiftDirection),
      equilibriumPrice: num(p.equilibriumPrice, 50), equilibriumQuantity: num(p.equilibriumQuantity, 100),
    } as unknown as SceneParams),
  },
}

/**
 * GENERATORS DELIBERATELY NOT REGISTERED, and why.
 *
 * A control is only honest when the thing it moves is a degree of freedom OF
 * THE CONCEPT. For these four the parameters are the CONTENT — the dataset the
 * figure exists to present — so a slider over them would not teach the concept,
 * it would edit the subject matter, and in two cases it would mean inventing
 * data in the visual registry. They keep the teaching frame, the stages, focus
 * and the challenge modes; they simply show no variables.
 *
 *   historical_timeline  the events ARE the history
 *   civics_org_chart     the institutions ARE the structure
 *   demographic_pyramid  the age bands are national data; three plausible
 *                        population shapes would be three fabrications
 *   statistics_bar_chart the bars are the dataset being read, and the figure
 *                        states no statistic that varying them would move
 */
export const UNREGISTERED_BY_DESIGN: Readonly<Record<string, string>> = {
  historical_timeline: 'the events are the content, not a variable of the concept',
  civics_org_chart: 'the institutional structure is the content, not a variable',
  demographic_pyramid: 'its parameter is national age data; alternatives would be fabricated',
  statistics_bar_chart: 'the bars are the dataset, and the figure states no statistic they would move',
}

/** Does this generator kind expose variables a learner may move? */
export function isParametricKind(kind: string | null | undefined): boolean {
  return Boolean(kind && kind in PARAMETRIC_SCENES)
}

/** The variables a kind exposes; empty for a kind with no registered variables. */
export function variablesFor(kind: string | null | undefined): readonly SceneVariable[] {
  return (kind && PARAMETRIC_SCENES[kind]?.variables) || []
}

/** The value a variable falls back to when a scene did not carry one. */
export function defaultValueOf(v: SceneVariable): number | string {
  return v.kind === 'number' ? v.min : v.options[0]?.value ?? ''
}

/**
 * Re-derive a figure from new parameter values, and STAMP the result so the
 * rebuilt scene is itself parametric.
 *
 * The stamp is what makes interaction survive a round trip: whatever path built
 * the scene — the canonical registry, the LLM router, a restore from a
 * snapshot — the spec that comes out carries the kind and the values it was
 * built from, so the next surface to see it knows it can be varied. That is
 * why nothing else in the engine needed a per-generator change.
 */
export function rebuildScene(
  kind: string | null | undefined,
  params: SceneParams,
): SceneSpec | null {
  if (!kind) return null
  const entry = PARAMETRIC_SCENES[kind]
  if (!entry) return null

  const merged = { ...entry.defaults, ...params }
  const built = entry.build(merged)
  if (!built) return null

  // THE SAME FRAMING THE SERVER APPLIES. `buildCanonicalScene` fits every
  // canonical scene to the viewport before serving it; a client rebuild that
  // skipped this step would re-centre and re-zoom the moment a learner touched
  // a slider, so the figure would appear to jump for a reason that has nothing
  // to do with the physics. Fitting is idempotent — an already-framed scene is
  // returned unchanged — so applying it here and there is safe.
  const spec = fitSceneToFrame(built)

  // THE SAME GATE THE SERVER APPLIES, for the same reason.
  //
  // A generator's own validator checks its PARAMETERS; it does not check the
  // scene that comes out. Measured while writing the tests: a collision with
  // one body at rest passes `validateCollisionParams` and then draws a
  // zero-length velocity arrow, which `validateSceneSpec` correctly refuses —
  // a value sitting in the middle of a slider's range. Without this gate, a
  // learner dragging through it would have been shown a degenerate figure.
  // Refusing here means the frame keeps the last good figure instead.
  if (!validateSceneSpec(spec).valid) return null

  // Only the DECLARED variables are carried. Anything a generator needs but
  // does not expose is not the learner's to move, so it must not appear as a
  // parameter the next surface might offer them.
  const carried: SceneParams = {}
  for (const v of entry.variables) {
    const value = merged[v.key]
    if (typeof value === 'number' || typeof value === 'string') carried[v.key] = value
  }
  return {
    ...spec,
    parametric: { kind, params: carried },
    // A spatial figure gets a ground plane and an axis triad unless it has
    // already said otherwise. Confined to DIAGRAM scenes on purpose: a plot
    // draws its own axes, and a process or comparison chart has no spatial
    // frame for a grid to describe. Any generator overrides this by declaring
    // `stage` itself — the spread above keeps an authored value.
    ...(spec.stage || spec.sceneType !== 'diagram' ? null : { stage: { grid: true, axes: true } }),
  }
}

/** The canonical figure for a kind — the textbook case, built from `defaults`. */
export function canonicalParametricScene(kind: string): SceneSpec | null {
  const entry = PARAMETRIC_SCENES[kind]
  return entry ? rebuildScene(kind, entry.defaults) : null
}
