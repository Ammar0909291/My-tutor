/**
 * Misconception contrast — showing a learner the model they are actually using.
 *
 * THE ARCHITECTURAL PROBLEM THIS SOLVES. A misconception is not a picture; it
 * is a claim about how one quantity depends on another. Rendering one therefore
 * used to look like it needed a bespoke "wrong" figure per misconception —
 * which is a condition table in the renderer, and is why the capability kept
 * being deferred.
 *
 * The parametric layer removes the need for any of that. Once a figure can be
 * re-derived from its parameters, a misconception is expressible as A SECOND
 * PARAMETER SET OF THE SAME SCENE: the learner's belief is applied to the
 * variable it concerns, the generator's own builder draws the consequence, and
 * the two figures are put side by side. No new geometry is authored, nothing is
 * drawn "wrongly", and both figures are equally correct renderings — of two
 * different situations. What is wrong is the learner's expectation that they
 * would look the same.
 *
 * ── IT REFUSES RATHER THAN FABRICATES ───────────────────────────────────────
 * A contrast is only produced when the two parameter sets genuinely yield
 * different figures, checked by re-running the builder — not asserted by
 * whoever registered the misconception. If a scene cannot show the difference,
 * `contrastFor` returns null and the teaching layer says it in words instead.
 * This is the same discipline the rest of the engine applies: a figure that
 * does not depict the claim is worse than no figure.
 *
 * ── REGISTRATION IS DATA, PER GENERATOR KIND ────────────────────────────────
 * Entries below are keyed by generator KIND, never by concept, so every concept
 * bound to that generator inherits them. The teaching layer may also supply a
 * misconception at runtime (from the learner's own misconception ledger) —
 * `contrastFor` takes one as an argument and does not care where it came from.
 *
 * Pure. No React, no I/O.
 */

import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { figureFingerprint } from './sceneAnimation'
import { PARAMETRIC_SCENES, rebuildScene, type SceneParams } from './parametricScenes'

/**
 * What the learner believes about a variable. Every member is a claim that
 * predicts a WRONG FIGURE, which is what makes it drawable.
 *
 *   expects-no-change  "that doesn't matter" — they expect the figure to be
 *                      unchanged when the variable moves
 *   expects-opposite   they expect the effect to run the other way
 *   expects-value      they would set the variable to a specific wrong value
 *
 * A fourth shape — "they expect a change where there is none" — is deliberately
 * absent. Certifying an INVARIANCE from two sampled figures is not the same as
 * establishing it, and a figure that quietly differed would teach the
 * misconception rather than correct it. Those belong in words.
 */
export type MisconceptionBelief = 'expects-no-change' | 'expects-opposite' | 'expects-value'

export interface SceneMisconception {
  /** Stable id, so a contrast survives a re-render and can be logged. */
  id: string
  /** The variable the belief is about. */
  variable: string
  belief: MisconceptionBelief
  /** Required for `expects-value`. */
  value?: number | string
  /** The learner's idea, in the words a learner would use. */
  claim: string
  /** What to ask before revealing. Prediction comes before correction. */
  prompt: string
  /** The correction, shown only after the reveal. */
  correction: string
}

export interface MisconceptionContrast {
  misconception: SceneMisconception
  /** The figure the learner's model predicts. */
  believed: SceneSpec
  /** The figure the physics/mathematics actually gives. */
  actual: SceneSpec
  /** The value each side stands for, for labelling. */
  believedValue: number | string
  actualValue: number | string
}

/**
 * The registered misconceptions, per generator kind.
 *
 * Each is a documented, commonly-held idea — not an invented error. They are
 * verified against the real builders by
 * src/tests/misconceptionContrast.test.ts, which fails if a registration stops
 * producing a genuine contrast, so this table cannot rot into fiction.
 */
export const SCENE_MISCONCEPTIONS: Readonly<Record<string, readonly SceneMisconception[]>> = {
  torque_diagram: [
    {
      id: 'torque:angle-irrelevant',
      variable: 'angleDeg',
      belief: 'expects-no-change',
      claim: 'How hard you push is what turns it — the direction you push in does not matter.',
      prompt: 'The same force, applied along the arm instead of across it. Will the turning effect be the same?',
      correction: 'Only the part of the force PERPENDICULAR to the arm turns it. Push straight along the arm and the torque is zero, however hard you push.',
    },
    {
      id: 'torque:distance-irrelevant',
      variable: 'leverLength',
      belief: 'expects-no-change',
      claim: 'It is the same force on the same object, so it should turn it the same amount wherever I push.',
      prompt: 'The same force, applied much closer to the pivot. Same turning effect?',
      correction: 'Torque is force TIMES distance from the pivot. Halve the distance and you halve the turn — which is why a door handle is as far from the hinge as it can be.',
    },
  ],

  projectile: [
    {
      id: 'projectile:steeper-is-further',
      variable: 'angleDegrees',
      belief: 'expects-value',
      value: 80,
      claim: 'Throw it steeper and it will go further.',
      prompt: 'Which launch angle sends it furthest — a steep one, or something shallower?',
      correction: 'Range peaks at 45°. Steeper buys height at the cost of the horizontal distance, and 80° travels barely further than 10°.',
    },
  ],

  vector: [
    {
      id: 'vector:magnitudes-add',
      variable: 'bAngleDeg',
      belief: 'expects-no-change',
      claim: 'To add two vectors you add their lengths — 3 and 4 make 7.',
      prompt: 'The same two vectors, now pointing the same way instead of at right angles. Is the resultant the same length?',
      correction: 'Only vectors pointing the SAME way add as numbers. At right angles 3 and 4 give 5, not 7 — direction is part of the quantity.',
    },
  ],

  circular: [
    {
      id: 'circular:radius-irrelevant',
      variable: 'radius',
      belief: 'expects-no-change',
      claim: 'Going round at the same speed feels the same whatever the size of the circle.',
      prompt: 'The same speed on a much tighter circle. Same acceleration towards the centre?',
      correction: 'Centripetal acceleration is v²/r. Tighten the circle at the same speed and the acceleration rises — which is why a sharp bend throws you harder than a gentle one.',
    },
  ],

  collision: [
    {
      id: 'collision:kinetic-energy-always-conserved',
      variable: 'collisionType',
      belief: 'expects-value',
      value: 'perfectly_inelastic',
      claim: 'Momentum and energy are both always conserved in a collision.',
      prompt: 'The same two bodies, but they stick together. Do they end up moving like the bouncing case?',
      correction: 'Momentum is conserved in BOTH. Kinetic energy is not — in a perfectly inelastic collision the bodies move off together and the missing energy has gone into deformation and heat.',
    },
  ],

  molecule: [
    {
      id: 'molecule:lone-pairs-ignored',
      variable: 'molecule',
      belief: 'expects-value',
      value: 'methane',
      claim: 'Water has two bonds, so the atoms should sit in a straight line — or at least at the same angle as any other central atom.',
      prompt: 'Methane and water both have a central atom with bonds around it. Same shape?',
      correction: 'Lone pairs take up room too, and push harder than bonding pairs. Methane is 109.5° with four bonds; water is squeezed to 104.5° by its two lone pairs.',
    },
  ],

  pendulum: [
    {
      id: 'pendulum:length-irrelevant',
      variable: 'length',
      belief: 'expects-no-change',
      claim: 'A pendulum swings at whatever rate you start it at — the string length is just how big it is.',
      prompt: 'A much longer pendulum, released the same way. Does it swing at the same rate?',
      correction: 'The period depends on the LENGTH — it goes as the square root of it — and not on the mass or how far you pull it back.',
    },
  ],

  electric_circuit: [
    {
      id: 'circuit:parallel-adds-resistance',
      variable: 'connection',
      belief: 'expects-value',
      value: 'parallel',
      claim: 'Adding another resistor always adds resistance, so the current always drops.',
      prompt: 'The same two resistors, now wired side by side instead of end to end. More total resistance, or less?',
      correction: 'In parallel you have given the current a second route, so the total resistance is LESS than either resistor alone and more current flows, not less.',
    },
  ],

  punnett_square: [
    {
      id: 'punnett:ratio-is-universal',
      variable: 'parent1Genotype',
      belief: 'expects-value',
      value: 'AA',
      claim: 'A cross always gives the 3:1 ratio.',
      prompt: 'One parent is now homozygous dominant. Still three to one?',
      correction: 'The 3:1 ratio needs BOTH parents heterozygous. With an AA parent every offspring shows the dominant trait — the ratio is a consequence of the parents, not a law of crosses.',
    },
  ],
}

/** The misconceptions registered for the generator this scene came from. */
export function misconceptionsFor(spec: SceneSpec): readonly SceneMisconception[] {
  const kind = spec.parametric?.kind
  if (!kind) return []
  return (SCENE_MISCONCEPTIONS[kind] ?? []).filter((m) =>
    PARAMETRIC_SCENES[kind]?.variables.some((v) => v.key === m.variable))
}

/**
 * The value the learner's model implies for this variable.
 *
 * `expects-no-change` is contrasted against the far end of the range: the
 * belief is that moving the variable changes nothing, so the strongest
 * refutation is the largest move available. `expects-opposite` mirrors the
 * current value about the midpoint. `expects-value` is stated outright.
 */
function believedValue(kind: string, m: SceneMisconception, current: number | string): number | string | null {
  if (m.belief === 'expects-value') return m.value ?? null

  const variable = PARAMETRIC_SCENES[kind]?.variables.find((v) => v.key === m.variable)
  if (!variable) return null

  if (variable.kind === 'choice') {
    // A choice has no "far end"; only an explicit alternative is meaningful.
    const other = variable.options.find((o) => o.value !== current)
    return other?.value ?? null
  }

  if (typeof current !== 'number') return null
  if (m.belief === 'expects-opposite') {
    return Math.min(variable.max, Math.max(variable.min, variable.min + variable.max - current))
  }
  // expects-no-change: whichever end is further from where we are.
  const distanceToMin = Math.abs(current - variable.min)
  const distanceToMax = Math.abs(variable.max - current)
  return distanceToMax >= distanceToMin ? variable.max : variable.min
}

/**
 * Build the contrast, or refuse.
 *
 * Returns null when the scene is not parametric, when the variable is not one
 * this generator exposes, when either figure fails to build, or — the important
 * one — when the two figures come out THE SAME. A contrast that shows no
 * contrast would teach the learner that their model was right.
 */
export function contrastFor(
  spec: SceneSpec,
  misconception: SceneMisconception,
): MisconceptionContrast | null {
  const kind = spec.parametric?.kind
  const params = spec.parametric?.params
  if (!kind || !params) return null
  if (!PARAMETRIC_SCENES[kind]?.variables.some((v) => v.key === misconception.variable)) return null

  const actualValue = params[misconception.variable]
  if (actualValue === undefined) return null

  const wrong = believedValue(kind, misconception, actualValue)
  if (wrong === null || wrong === actualValue) return null

  const believed = rebuildScene(kind, { ...params, [misconception.variable]: wrong })
  const actual = rebuildScene(kind, params)
  if (!believed || !actual) return null
  if (figureFingerprint(believed) === figureFingerprint(actual)) return null

  return { misconception, believed, actual, believedValue: wrong, actualValue }
}

/**
 * The teaching layer's entry point: given a scene and the id of a
 * misconception the learner is showing, produce the contrast — or nothing.
 *
 * Taking an ID rather than an object is what lets the misconception ledger
 * drive this without importing the visual engine's types.
 */
export function contrastById(spec: SceneSpec, id: string): MisconceptionContrast | null {
  const found = misconceptionsFor(spec).find((m) => m.id === id)
  return found ? contrastFor(spec, found) : null
}

/** Contrasts this figure can honestly offer right now. */
export function availableContrasts(spec: SceneSpec): MisconceptionContrast[] {
  return misconceptionsFor(spec)
    .map((m) => contrastFor(spec, m))
    .filter((c): c is MisconceptionContrast => c !== null)
}

export type { SceneParams }
