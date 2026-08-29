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
