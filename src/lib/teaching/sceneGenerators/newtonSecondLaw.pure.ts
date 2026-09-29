/**
 * newtonSecondLaw — the PURE time model and its figure (ADR 16, Newton POC).
 *
 * A block of mass m starts at rest on a straight, frictionless 20 m track and
 * is pushed by a constant net force F. Nothing else acts on it, so
 *
 *   a = F / m        v(t) = a·t        x(t) = ½·a·t²
 *
 * ── TIME IS A TICK, NOT A FRAME ─────────────────────────────────────────────
 * The state is a pure function of (params, tick), with t = tick · FIXED_DT.
 * The closed form is used directly, so there is no integration error and no
 * dependence on frame rate: a 30 fps host and a 144 fps host reach identical
 * states at the same tick. The wall clock only ever decides HOW MANY ticks
 * have passed (see `visual/simulationControl.ts`).
 *
 * ── ONE FRAME FOR THE WHOLE RUN ─────────────────────────────────────────────
 * Every object that moves stays inside a fixed box that the floor line and two
 * static labels span. The figure's extent is therefore identical at every
 * tick and for every (F, m) in range, so `fitSceneToFrame` applies the same
 * transform to every frame and the camera never re-zooms while the block
 * moves. `src/tests/newtonSecondLawSimulation.test.ts` asserts it.
 *
 * ── NOT ROUTED, NOT EXTRACTED ───────────────────────────────────────────────
 * There is no LLM extractor and no keyword route for this kind. It is an
 * authored experiment, bound to a concept only through the visual registry
 * (ADR 16 gate G3), which keeps sceneRouter's rule that open-ended free-body
 * extraction is out of scope.
 *
 * Pure: no React, no timers, no I/O. Purity is enforced by
 * src/tests/sceneGeneratorPurity.test.ts.
 */

import type { SceneObject, SceneSpec, Vec3 } from '../sceneSpec'
import { round, strictNumber } from './shared'
import { ROLE, label, line } from './visualDesign'

// ── Parameters ──────────────────────────────────────────────────────────────

export interface NewtonParams {
  /** Net applied force, N. */
  force: number
  /** Mass of the block, kg. */
  mass: number
}

export const NEWTON_FORCE_RANGE = { min: 0, max: 20 } as const
export const NEWTON_MASS_RANGE = { min: 0.5, max: 10 } as const
/** Track length, m. */
export const NEWTON_TRACK_M = 20
/** Fixed simulation tick, s. */
export const NEWTON_FIXED_DT = 0.02
/** Hard stop: 10 s. A run that never reaches the end of the track ends here. */
export const NEWTON_MAX_TICKS = 500

export function validateNewtonParams(raw: unknown): NewtonParams | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>
  const force = strictNumber(o.force)
  const mass = strictNumber(o.mass)
  if (!Number.isFinite(force) || !Number.isFinite(mass)) return null
  if (force < NEWTON_FORCE_RANGE.min || force > NEWTON_FORCE_RANGE.max) return null
  if (mass < NEWTON_MASS_RANGE.min || mass > NEWTON_MASS_RANGE.max) return null
  return { force, mass }
}

// ── State ───────────────────────────────────────────────────────────────────

export interface NewtonState {
  tick: number
  /** s */
  t: number
  /** m, from the start line */
  x: number
  /** m/s */
  v: number
  /** m/s², constant for the run */
  a: number
}

const accelerationOf = (p: NewtonParams): number => p.force / p.mass
const positionAt = (a: number, tick: number): number => 0.5 * a * (tick * NEWTON_FIXED_DT) ** 2

/**
 * The tick on which the run ends: the FIRST tick at which the block has
 * reached the end of the track, or the hard stop, whichever comes first. A
 * block that is never pushed (F = 0) stays at rest and ends at the hard stop.
 */
export function newtonTerminalTick(p: NewtonParams): number {
  const a = accelerationOf(p)
  if (a <= 0) return NEWTON_MAX_TICKS
  let k = Math.ceil(Math.sqrt((2 * NEWTON_TRACK_M) / a) / NEWTON_FIXED_DT)
  // The square root is a float; settle on the exact first tick either way.
  while (k > 0 && positionAt(a, k - 1) >= NEWTON_TRACK_M) k -= 1
  while (positionAt(a, k) < NEWTON_TRACK_M) k += 1
  return Math.min(k, NEWTON_MAX_TICKS)
}

/** The state at a tick, clamped to [0, terminal tick]. Closed form, exact. */
export function newtonStateAt(p: NewtonParams, tick: number): NewtonState {
  const end = newtonTerminalTick(p)
  const k = Math.max(0, Math.min(end, Math.floor(Number.isFinite(tick) ? tick : 0)))
  const a = accelerationOf(p)
  const t = k * NEWTON_FIXED_DT
  return { tick: k, t, x: positionAt(a, k), v: a * t, a }
}

// ── Figure ──────────────────────────────────────────────────────────────────

// Arrow scales (world units per physical unit). Chosen so the largest value
// in range (F 20 N, a 40 m/s², v ≈ 40.8 m/s) stays inside the fixed box.
const FORCE_SCALE = 0.2
const ACCEL_SCALE = 0.1
const VELOCITY_SCALE = 0.1

// The v–t graph under the track. Axes are FIXED (not fitted to the run) so the
// slopes of different runs can be compared: a steeper line is a larger a.
const GRAPH_Y0 = -7.5
const GRAPH_T_MAX = NEWTON_MAX_TICKS * NEWTON_FIXED_DT // 10 s
const GRAPH_V_MAX = 45 // m/s — above the largest reachable speed (≈ 40.8)
const GRAPH_WIDTH = NEWTON_TRACK_M // 20 units for 10 s
const GRAPH_HEIGHT = 5
const GRAPH_SAMPLE_TICKS = 5 // one trace point per 0.1 s
const MIN_TRACE_POINTS = 8

// The fixed box every frame lives in.
const FLOOR_X0 = -6
const FLOOR_X1 = 26
const TOP_Y = 4.4
const BOTTOM_Y = GRAPH_Y0 - 0.9

const Y_ACCEL = 2.1
const Y_VELOCITY = 3.1
/**
 * Shortest arrow drawn. Below this an arrow is invisible and, once rounded, can
 * collapse to zero length, which validateSceneSpec rightly refuses (measured:
 * F = 1 N on 7 kg gives a 0.0003-unit velocity arrow on tick 1). The value is
 * still stated by its label.
 */
const MIN_ARROW = 0.05

const graphPoint = (t: number, v: number): Vec3 => [
  round((t / GRAPH_T_MAX) * GRAPH_WIDTH),
  round(GRAPH_Y0 + (v / GRAPH_V_MAX) * GRAPH_HEIGHT),
  0,
]

const fmt = (n: number, dp: number): string => (Math.round(n * 10 ** dp) / 10 ** dp).toFixed(dp)

/** The block's drawn size grows gently with mass, so heavier reads heavier. */
export function newtonBlockRadius(mass: number): number {
  return round(0.35 + 0.2 * Math.cbrt(mass))
}

/**
 * The figure at a tick. Tick 0 is the static figure (the block at rest on the
 * start line), and it is exactly what the parametric registry builds.
 */
export function buildNewtonScene(p: NewtonParams, tick = 0): SceneSpec {
  const s = newtonStateAt(p, tick)
  const r = newtonBlockRadius(p.mass)
  const x = round(s.x)

  const apparatus: SceneObject[] = [
    // The floor spans the fixed box; the track is the part between the lines.
    { ...line([FLOOR_X0, 0, 0], [FLOOR_X1, 0, 0], ROLE.reference), id: 'floor' },
    { ...line([0, -0.5, 0], [0, 1, 0], ROLE.reference), id: 'start-line' },
    { ...line([NEWTON_TRACK_M, -0.5, 0], [NEWTON_TRACK_M, 1, 0], ROLE.reference), id: 'finish-line' },
    { ...label('frictionless track', [NEWTON_TRACK_M / 2, TOP_Y, 0], ROLE.reference), id: 'track-caption' },
    { ...label('0 m', [0, -1.1, 0], ROLE.reference), id: 'start-label' },
    { ...label(`${NEWTON_TRACK_M} m`, [NEWTON_TRACK_M, -1.1, 0], ROLE.reference), id: 'finish-label' },
    // v–t axes.
    { ...line([0, GRAPH_Y0, 0], [GRAPH_WIDTH, GRAPH_Y0, 0], ROLE.reference), id: 'graph-t-axis' },
    { ...line([0, GRAPH_Y0, 0], [0, GRAPH_Y0 + GRAPH_HEIGHT, 0], ROLE.reference), id: 'graph-v-axis' },
    { ...label('t (s)', [GRAPH_WIDTH / 2, BOTTOM_Y, 0], ROLE.reference), id: 'graph-t-label' },
    { ...label('v (m/s)', [-2.6, GRAPH_Y0 + GRAPH_HEIGHT / 2, 0], ROLE.reference), id: 'graph-v-label' },
    { ...label(`${fmt(GRAPH_T_MAX, 0)} s`, [GRAPH_WIDTH, GRAPH_Y0 - 0.6, 0], ROLE.reference), id: 'graph-t-max' },
  ]

  const body: SceneObject[] = [
    { type: 'node', id: 'block', position: [x, r, 0], color: ROLE.ink, radius: r },
    { ...label(`m = ${fmt(p.mass, 1)} kg`, [x, r + 0.8, 0], ROLE.ink), id: 'mass-label' },
  ]
  if (p.force * FORCE_SCALE >= MIN_ARROW) {
    // A push from behind: the arrow ends at the block.
    const from: Vec3 = [round(x - r - p.force * FORCE_SCALE), r, 0]
    body.push({ type: 'arrow', id: 'force', from, to: [round(x - r), r, 0], color: ROLE.input, thickness: 0.055 })
    body.push({ ...label(`F = ${fmt(p.force, 0)} N`, [round(from[0]), r + 0.6, 0], ROLE.input), id: 'force-label' })
  }
  if (s.a * ACCEL_SCALE >= MIN_ARROW) {
    body.push({ type: 'arrow', id: 'acceleration', from: [x, Y_ACCEL, 0], to: [round(x + s.a * ACCEL_SCALE), Y_ACCEL, 0], color: ROLE.output, thickness: 0.055 })
  }
  if (s.a > 0) {
    body.push({ ...label(`a = ${fmt(s.a, 2)} m/s²`, [x, Y_ACCEL + 0.5, 0], ROLE.output), id: 'acceleration-label' })
  }
  if (s.v * VELOCITY_SCALE >= MIN_ARROW) {
    body.push({ type: 'arrow', id: 'velocity', from: [x, Y_VELOCITY, 0], to: [round(x + s.v * VELOCITY_SCALE), Y_VELOCITY, 0], color: ROLE.result, thickness: 0.055 })
  }
  body.push({ ...label(`v = ${fmt(s.v, 1)} m/s`, [x, Y_VELOCITY + 0.5, 0], ROLE.result), id: 'velocity-label' })
  body.push({ ...label(`t = ${fmt(s.t, 2)} s`, [FLOOR_X0 + 1.5, TOP_Y, 0], ROLE.ink), id: 'time-label' })

  // The v–t trace so far, and the current point on it.
  const trace: Vec3[] = []
  for (let k = 0; k <= s.tick; k += GRAPH_SAMPLE_TICKS) trace.push(graphPoint(k * NEWTON_FIXED_DT, s.a * k * NEWTON_FIXED_DT))
  if (trace.length >= MIN_TRACE_POINTS) {
    body.push({ type: 'path', id: 'vt-trace', points: trace, color: ROLE.result })
  }
  body.push({ type: 'node', id: 'vt-now', position: graphPoint(s.t, s.v), color: ROLE.result, radius: 0.18 })

  return {
    id: `newton-second-law-${p.force}-${p.mass}-${s.tick}`,
    title: `Newton's second law — F = ${fmt(p.force, 0)} N, m = ${fmt(p.mass, 1)} kg, a = ${fmt(s.a, 2)} m/s²`,
    sceneType: 'simulation',
    teachingGoal: 'Show that a constant net force gives a constant acceleration, a = F / m: more force, more acceleration; more mass, less.',
    ariaLabel:
      `A block of mass ${fmt(p.mass, 1)} kg on a frictionless 20 m track, `
      + (s.a > 0
        ? `pushed by a net force of ${fmt(p.force, 0)} N, so it accelerates at ${fmt(s.a, 2)} m/s². `
        : 'with no net force on it, so it does not accelerate. ')
      + `At t = ${fmt(s.t, 2)} s it is ${fmt(s.x, 2)} m from the start, moving at ${fmt(s.v, 2)} m/s. `
      + 'Below the track, a velocity–time graph whose slope is the acceleration.',
    steps: [
      {
        narration: 'A block rests on a frictionless 20 m track. Below it, a velocity–time graph will record its motion.',
        intent: 'establish',
        objects: apparatus,
      },
      {
        narration: s.a > 0
          ? `A constant net force of ${fmt(p.force, 0)} N pushes the ${fmt(p.mass, 1)} kg block, so its acceleration is F / m = ${fmt(s.a, 2)} m/s². Its speed grows steadily: the v–t line is straight, and its slope is the acceleration.`
          : `No net force acts on the ${fmt(p.mass, 1)} kg block, so its acceleration is F / m = 0: it stays at rest, and the v–t line stays flat on the axis.`,
        intent: 'relate',
        objects: body,
      },
    ],
  }
}

// ── Readouts ────────────────────────────────────────────────────────────────

export interface NewtonReadout {
  key: 't' | 'x' | 'v' | 'a_measured' | 'force' | 'mass'
  label: string
  value: number
  unit: string
}

/**
 * What the learner can read off the run at a tick. The acceleration is shown
 * as a MEASUREMENT (Δv/Δt from the start, where v = 0) — the learner infers
 * a = F/m from data rather than being handed it — and only once time has
 * passed, since Δv/Δt is undefined at t = 0.
 */
export function newtonReadouts(p: NewtonParams, tick: number): NewtonReadout[] {
  const s = newtonStateAt(p, tick)
  const out: NewtonReadout[] = [
    { key: 't', label: 't', value: s.t, unit: 's' },
    { key: 'x', label: 'x', value: s.x, unit: 'm' },
    { key: 'v', label: 'v', value: s.v, unit: 'm/s' },
  ]
  if (s.t > 0) out.push({ key: 'a_measured', label: 'a (measured, Δv/Δt)', value: s.v / s.t, unit: 'm/s²' })
  out.push({ key: 'force', label: 'F', value: p.force, unit: 'N' })
  out.push({ key: 'mass', label: 'm', value: p.mass, unit: 'kg' })
  return out
}
