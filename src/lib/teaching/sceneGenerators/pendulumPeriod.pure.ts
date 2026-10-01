/**
 * pendulumPeriod — the PURE time model and its figure (ADR 16, second pilot).
 *
 * A bob on a light, inextensible string of length L is released from rest at an
 * angle A to one side of the vertical. Gravity alone acts (g = 9.8 m/s², no air
 * resistance), so the exact equation of motion is
 *
 *   θ'' = −(g / L) · sin θ        θ(0) = A,  θ'(0) = 0
 *
 * The mass of the bob cancels out of this equation; it is a learner control
 * precisely so that a fair test can show it makes no difference.
 *
 * ── THE EXACT EQUATION, NOT THE SMALL-ANGLE FORMULA ─────────────────────────
 * The model integrates the full nonlinear equation (sin θ, not θ) with a
 * fixed-step fourth-order Runge–Kutta at PENDULUM_FIXED_DT. That makes the
 * "the swing angle barely matters" result honest: for swings up to the 30° cap
 * the period is within 2% of 2π√(L/g), and the run SHOWS that small
 * difference instead of a formula hiding it. The formula itself is never shown
 * before the learner has run the experiment.
 *
 * ── THE PERIOD IS MEASURED, NOT COMPUTED ────────────────────────────────────
 * A full swing ends when the bob comes back to the side it was released from:
 * the angular velocity crosses from positive to negative. The crossing time is
 * interpolated between ticks, and the readout is the time for one swing
 * averaged over the swings completed so far — a measurement of the run, the
 * same way Newton's acceleration readout is Δv/Δt.
 *
 * ── TIME IS A TICK, NOT A FRAME ─────────────────────────────────────────────
 * The state is a pure function of (params, tick): the trajectory for a given
 * (L, A) is integrated once from t = 0 with a fixed step and memoised, so a
 * 30 fps host and a 144 fps host read identical states at the same tick.
 *
 * ── ONE FRAME FOR THE WHOLE RUN, AT TRUE SCALE ──────────────────────────────
 * Every length is drawn at the same scale (PENDULUM_SCALE units per metre), so
 * a 2 m pendulum is drawn eight times as long as a 0.25 m one — the static
 * generator scales every pendulum to the same size, which hides exactly what
 * this experiment is about. Static apparatus spans a fixed box, so the camera
 * never re-zooms during a run or between runs.
 *
 * ── NOT ROUTED, NOT EXTRACTED ───────────────────────────────────────────────
 * No LLM extractor and no keyword route: an authored experiment, bound to one
 * concept only through the visual registry.
 *
 * Pure: no React, no timers, no I/O. Purity is enforced by
 * src/tests/sceneGeneratorPurity.test.ts.
 */

import type { SceneObject, SceneSpec, Vec3 } from '../sceneSpec'
import { round, strictNumber } from './shared'
import { ROLE, label, line } from './visualDesign'

// ── Parameters ──────────────────────────────────────────────────────────────

export interface PendulumPeriodParams {
  /** String length, m. */
  length: number
  /** Release angle from the vertical, degrees. */
  amplitudeDeg: number
  /** Mass of the bob, kg. It does not enter the equation of motion. */
  mass: number
}

export const PENDULUM_LENGTH_RANGE = { min: 0.25, max: 2 } as const
/** Capped at 30°: the small-angle regime the concept is about (period within 2% of 2π√(L/g)). */
export const PENDULUM_AMPLITUDE_RANGE = { min: 5, max: 30 } as const
export const PENDULUM_MASS_RANGE = { min: 0.1, max: 1 } as const
export const PENDULUM_GRAVITY = 9.8
/** Fixed simulation tick, s. */
export const PENDULUM_FIXED_DT = 0.01
/** Hard stop: 10 s. */
export const PENDULUM_MAX_TICKS = 1000
/** A run ends when the bob has completed this many full swings. */
export const PENDULUM_SWINGS_PER_RUN = 3

export function validatePendulumPeriodParams(raw: unknown): PendulumPeriodParams | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>
  const length = strictNumber(o.length)
  const amplitudeDeg = strictNumber(o.amplitudeDeg)
  const mass = strictNumber(o.mass)
  if (![length, amplitudeDeg, mass].every(Number.isFinite)) return null
  if (length < PENDULUM_LENGTH_RANGE.min || length > PENDULUM_LENGTH_RANGE.max) return null
  if (amplitudeDeg < PENDULUM_AMPLITUDE_RANGE.min || amplitudeDeg > PENDULUM_AMPLITUDE_RANGE.max) return null
  if (mass < PENDULUM_MASS_RANGE.min || mass > PENDULUM_MASS_RANGE.max) return null
  return { length, amplitudeDeg, mass }
}

// ── The trajectory ──────────────────────────────────────────────────────────

interface Trajectory {
  /** θ at every tick, rad. */
  theta: Float64Array
  /** θ' at every tick, rad/s. */
  omega: Float64Array
  /** Interpolated times at which each full swing completed, s. */
  swingEnds: number[]
}

const TRAJECTORY_CACHE = new Map<string, Trajectory>()
const CACHE_LIMIT = 32

/**
 * Integrate the exact equation once, from t = 0, for the whole 10 s. Depends
 * on (L, A) only — the mass cancels — so the same trajectory serves every mass.
 */
function trajectoryOf(p: PendulumPeriodParams): Trajectory {
  const key = `${p.length}|${p.amplitudeDeg}`
  const cached = TRAJECTORY_CACHE.get(key)
  if (cached) return cached

  const k = PENDULUM_GRAVITY / p.length
  const h = PENDULUM_FIXED_DT
  const theta = new Float64Array(PENDULUM_MAX_TICKS + 1)
  const omega = new Float64Array(PENDULUM_MAX_TICKS + 1)
  const swingEnds: number[] = []
  let th = (p.amplitudeDeg * Math.PI) / 180
  let om = 0
  theta[0] = th
  omega[0] = om
  const f = (x: number) => -k * Math.sin(x)
  for (let i = 1; i <= PENDULUM_MAX_TICKS; i += 1) {
    const k1t = om, k1o = f(th)
    const k2t = om + (h / 2) * k1o, k2o = f(th + (h / 2) * k1t)
    const k3t = om + (h / 2) * k2o, k3o = f(th + (h / 2) * k2t)
    const k4t = om + h * k3o, k4o = f(th + h * k3t)
    const nextTh = th + (h / 6) * (k1t + 2 * k2t + 2 * k3t + k4t)
    const nextOm = om + (h / 6) * (k1o + 2 * k2o + 2 * k3o + k4o)
    // Back at the release side: θ' goes from + to − (released at +A, moving −).
    if (om > 0 && nextOm <= 0) swingEnds.push((i - 1) * h + h * (om / (om - nextOm)))
    th = nextTh
    om = nextOm
    theta[i] = th
    omega[i] = om
  }
  const trajectory = { theta, omega, swingEnds }
  if (TRAJECTORY_CACHE.size >= CACHE_LIMIT) TRAJECTORY_CACHE.delete(TRAJECTORY_CACHE.keys().next().value as string)
  TRAJECTORY_CACHE.set(key, trajectory)
  return trajectory
}

/**
 * The tick on which the run ends: the first tick at or after the moment the
 * bob completes its third full swing, or the 10 s hard stop.
 */
export function pendulumTerminalTick(p: PendulumPeriodParams): number {
  const ends = trajectoryOf(p).swingEnds
  const end = ends[PENDULUM_SWINGS_PER_RUN - 1]
  if (end === undefined) return PENDULUM_MAX_TICKS
  return Math.min(PENDULUM_MAX_TICKS, Math.ceil(end / PENDULUM_FIXED_DT - 1e-9))
}

export interface PendulumState {
  tick: number
  /** s */
  t: number
  /** Angle from the vertical, rad; positive is the release side. */
  theta: number
  /** rad/s */
  omega: number
  /** Full swings completed by this tick. */
  swings: number
  /** Measured time for one swing (average over completed swings), s; null before the first. */
  periodMeasured: number | null
}

/** The state at a tick, clamped to [0, terminal tick]. */
export function pendulumStateAt(p: PendulumPeriodParams, tick: number): PendulumState {
  const traj = trajectoryOf(p)
  const end = pendulumTerminalTick(p)
  const k = Math.max(0, Math.min(end, Math.floor(Number.isFinite(tick) ? tick : 0)))
  const t = k * PENDULUM_FIXED_DT
  let swings = 0
  while (swings < traj.swingEnds.length && traj.swingEnds[swings] <= t + 1e-9) swings += 1
  return {
    tick: k,
    t,
    theta: traj.theta[k],
    omega: traj.omega[k],
    swings,
    periodMeasured: swings > 0 ? traj.swingEnds[swings - 1] / swings : null,
  }
}

// ── Figure ──────────────────────────────────────────────────────────────────

/** World units per metre of string. The same for every length: true scale. */
export const PENDULUM_SCALE = 4
const DEG = Math.PI / 180

// The θ–t trace, right of the pendulum. Fixed axes, so traces of different runs
// compare directly: more peaks in the same 10 s is a shorter swing.
const TRACE_X0 = 7
const TRACE_WIDTH = 10 // 10 s → 1 unit per second
const TRACE_Y0 = -4
const TRACE_HALF_HEIGHT = 2.5 // ±30°
const TRACE_SAMPLE_TICKS = 5
const MIN_TRACE_POINTS = 8
const ARC_SAMPLES = 16

// The fixed box: the support beam spans x ∈ [−5, 5] at y = 0; the dashed rest
// line reaches below the longest string plus its bob; the trace axes and their
// labels close the right side.
const SUPPORT_HALF = 5
const REST_LINE_BOTTOM = -(PENDULUM_LENGTH_RANGE.max * PENDULUM_SCALE) - 0.9

const tracePoint = (t: number, thetaRad: number): Vec3 => [
  round(TRACE_X0 + (t / (PENDULUM_MAX_TICKS * PENDULUM_FIXED_DT)) * TRACE_WIDTH),
  round(TRACE_Y0 + (thetaRad / (PENDULUM_AMPLITUDE_RANGE.max * DEG)) * TRACE_HALF_HEIGHT),
  0,
]

const bobPosition = (lengthM: number, thetaRad: number): Vec3 => [
  round(lengthM * PENDULUM_SCALE * Math.sin(thetaRad)),
  round(-lengthM * PENDULUM_SCALE * Math.cos(thetaRad)),
  0,
]

const fmt = (n: number, dp: number): string => (Math.round(n * 10 ** dp) / 10 ** dp).toFixed(dp)

/** The bob's drawn size grows gently with its mass, so heavier reads heavier. */
export function pendulumBobRadius(mass: number): number {
  return round(0.2 + 0.15 * Math.cbrt(mass))
}

export type PendulumPhase = 'start' | 'moving' | 'finished'
export function pendulumPhaseAt(p: PendulumPeriodParams, tick: number): PendulumPhase {
  const s = pendulumStateAt(p, tick)
  if (s.tick === 0) return 'start'
  return s.tick >= pendulumTerminalTick(p) ? 'finished' : 'moving'
}

/**
 * What the figure says is happening, true of THIS tick. Before the release it
 * states only the set-up — never a period, the quantity the learner is about
 * to measure.
 */
function whatIsHappening(p: PendulumPeriodParams, phase: PendulumPhase, s: PendulumState): string {
  const L = fmt(p.length, 2)
  const A = fmt(p.amplitudeDeg, 0)
  if (phase === 'start') {
    return `The bob is held ${A}° to the side on a ${L} m string. Make a prediction, then release it.`
  }
  const swings = s.swings === 1 ? '1 full swing' : `${s.swings} full swings`
  if (phase === 'moving') {
    return s.swings === 0
      ? `The bob has been swinging for ${fmt(s.t, 2)} s and has not yet come back to where it started.`
      : `After ${fmt(s.t, 2)} s the bob has made ${swings}.`
  }
  return `The bob made ${swings} in ${fmt(s.t, 2)} s.`
}

/**
 * The figure at a tick. Tick 0 is the static figure (the bob held at its
 * release angle), and it is exactly what the parametric registry builds.
 *
 * ── THE ANSWER IS NOT IN THE FIGURE BEFORE THE RUN ──────────────────────────
 * At tick 0 nothing states the period: not the title, the labels, the
 * narration, the panel or the description. Only the set-up — length, release
 * angle, mass — is shown.
 *
 * ── LIVE NUMBERS LIVE IN ONE PLACE ──────────────────────────────────────────
 * The running time, swing count and measured period are DOM readouts, never
 * canvas labels (the Newton pilot measured a canvas copy lagging the readouts).
 * Canvas labels stay constant through a run. Axis ends are bare tick numbers,
 * so no pair of labels can be read as a measurement.
 */
export function buildPendulumPeriodScene(p: PendulumPeriodParams, tick = 0): SceneSpec {
  const s = pendulumStateAt(p, tick)
  const phase = pendulumPhaseAt(p, tick)
  const traj = trajectoryOf(p)
  const A = p.amplitudeDeg * DEG
  const r = pendulumBobRadius(p.mass)
  const pivot: Vec3 = [0, 0, 0]
  const bob = bobPosition(p.length, s.theta)
  const release = bobPosition(p.length, A)
  const swingArc: Vec3[] = []
  for (let i = 0; i <= ARC_SAMPLES; i += 1) swingArc.push(bobPosition(p.length, -A + (2 * A * i) / ARC_SAMPLES))
  const traceEnd = TRACE_X0 + TRACE_WIDTH

  const apparatus: SceneObject[] = [
    { ...line([-SUPPORT_HALF, 0, 0], [SUPPORT_HALF, 0, 0], ROLE.reference), id: 'support' },
    { ...line(pivot, [0, REST_LINE_BOTTOM, 0], ROLE.reference), id: 'rest-line' },
    { ...label('lowest point', [0, REST_LINE_BOTTOM - 0.5, 0], ROLE.reference), id: 'rest-caption' },
    // θ–t axes: name (with unit), the two axis ends as bare numbers, and ±30.
    { ...line([TRACE_X0, TRACE_Y0, 0], [traceEnd, TRACE_Y0, 0], ROLE.reference), id: 'trace-t-axis' },
    { ...line([TRACE_X0, TRACE_Y0 - TRACE_HALF_HEIGHT, 0], [TRACE_X0, TRACE_Y0 + TRACE_HALF_HEIGHT, 0], ROLE.reference), id: 'trace-angle-axis' },
    { ...label('t (s)', [TRACE_X0 + TRACE_WIDTH / 2, TRACE_Y0 - TRACE_HALF_HEIGHT - 0.9, 0], ROLE.reference), id: 'trace-t-label' },
    { ...label('angle (°)', [TRACE_X0 + 1.6, TRACE_Y0 + TRACE_HALF_HEIGHT + 0.7, 0], ROLE.reference), id: 'trace-angle-label' },
    { ...label('0', [TRACE_X0 - 0.5, TRACE_Y0 - 0.5, 0], ROLE.reference), id: 'trace-origin' },
    { ...label('10', [traceEnd, TRACE_Y0 - 0.5, 0], ROLE.reference), id: 'trace-t-max' },
    { ...label(String(PENDULUM_AMPLITUDE_RANGE.max), [TRACE_X0 - 0.6, TRACE_Y0 + TRACE_HALF_HEIGHT, 0], ROLE.reference), id: 'trace-angle-max' },
    { ...label(`−${PENDULUM_AMPLITUDE_RANGE.max}`, [TRACE_X0 - 0.7, TRACE_Y0 - TRACE_HALF_HEIGHT, 0], ROLE.reference), id: 'trace-angle-min' },
    // The arc the bob swings along, from the release angle to the same angle
    // on the other side. Static: it is the set-up, not a result.
    { type: 'path', id: 'swing-arc', points: swingArc, color: ROLE.input },
  ]

  const body: SceneObject[] = [
    { type: 'bond', id: 'string', from: pivot, to: bob, color: ROLE.ink },
    { type: 'node', id: 'bob', position: bob, color: ROLE.ink, radius: r },
    { ...label(`${fmt(p.mass, 1)} kg`, [round(bob[0] + r + 1), bob[1], 0], ROLE.ink), id: 'mass-label' },
    { ...label(`L = ${fmt(p.length, 2)} m`, [round(bob[0] / 2 - 1.6), round(bob[1] / 2), 0], ROLE.ink), id: 'length-label' },
    // Kept below the support for every length, so it never widens the fixed box.
    { ...label(`${fmt(p.amplitudeDeg, 0)}°`, [round(release[0] / 2 + 0.9), round(Math.min(release[1] / 2 + 0.6, -0.4)), 0], ROLE.input), id: 'angle-label' },
  ]

  // The angle–time trace so far, and the current point on it.
  const trace: Vec3[] = []
  for (let k = 0; k <= s.tick; k += TRACE_SAMPLE_TICKS) trace.push(tracePoint(k * PENDULUM_FIXED_DT, traj.theta[k]))
  // The description may only claim a line that is actually drawn.
  const traceDrawn = trace.length >= MIN_TRACE_POINTS
  if (traceDrawn) body.push({ type: 'path', id: 'angle-time-trace', points: trace, color: ROLE.result })
  body.push({ type: 'node', id: 'current-angle', position: tracePoint(s.t, s.theta), color: ROLE.result, radius: 0.15 })

  const happening = whatIsHappening(p, phase, s)
  const L = fmt(p.length, 2)
  const Adeg = fmt(p.amplitudeDeg, 0)
  const m = fmt(p.mass, 1)
  return {
    id: `pendulum-period-${p.length}-${p.amplitudeDeg}-${p.mass}-${s.tick}`,
    // "Name: givens" — the set-up only. Never a period: that is what the run measures.
    title: `Simple pendulum: L = ${L} m, ${Adeg}° swing, ${m} kg bob`,
    sceneType: 'simulation',
    teachingGoal: 'Find out by experiment which of the string length, the swing angle and the mass decide how long one swing takes.',
    ariaLabel: phase === 'start'
      ? `A ${m} kg bob on a ${L} m string, held ${Adeg} degrees to one side of the vertical below a fixed support. `
        + 'To the right, an empty graph of angle against time that will record the swing once it is released.'
      : `A ${m} kg bob on a ${L} m string swinging ${Adeg} degrees either side of the vertical. `
        + `After ${fmt(s.t, 2)} s it has made ${s.swings} full ${s.swings === 1 ? 'swing' : 'swings'}. `
        + (traceDrawn ? 'The graph to the right shows its angle rising and falling over time.' : 'The graph to the right has only just started recording.'),
    steps: [
      {
        narration: 'A bob hangs from a fixed support; the vertical line marks its lowest point. To the right, a graph records its angle '
          + `over time: the time axis runs from 0 to 10 s and the angle axis from −${PENDULUM_AMPLITUDE_RANGE.max}° to ${PENDULUM_AMPLITUDE_RANGE.max}°. `
          + (traceDrawn ? 'The line on it is this run so far.' : phase === 'start' ? 'It stays empty until the bob is released.' : 'This run has only just started on it.'),
        intent: 'establish',
        objects: apparatus,
      },
      {
        narration: happening,
        intent: 'relate',
        objects: body,
      },
    ],
    // The panel says exactly what is true of this tick, and nothing more.
    explainer: { panels: [{ heading: "What's happening?", body: happening }] },
  }
}

// ── Readouts ────────────────────────────────────────────────────────────────

export interface PendulumReadout {
  key: 't' | 'angle' | 'swings' | 'period_measured' | 'length' | 'amplitudeDeg' | 'mass'
  label: string
  value: number
  unit: string
  dp: number
  tableLabel?: string
}

/**
 * What the learner can read off the run at a tick. The time for one swing is
 * a MEASUREMENT of the run — the average over the swings completed so far —
 * shown only once one full swing has happened.
 */
export function pendulumReadouts(p: PendulumPeriodParams, tick: number): PendulumReadout[] {
  const s = pendulumStateAt(p, tick)
  const out: PendulumReadout[] = [
    { key: 't', label: 't', value: s.t, unit: 's', dp: 2 },
    { key: 'angle', label: 'angle', value: s.theta / DEG, unit: '°', dp: 1 },
    { key: 'swings', label: 'full swings', value: s.swings, unit: '', dp: 0 },
  ]
  if (s.periodMeasured !== null) {
    out.push({ key: 'period_measured', label: 'time for one swing (measured)', value: s.periodMeasured, unit: 's', dp: 2, tableLabel: 'one swing (measured)' })
  }
  out.push({ key: 'length', label: 'L', value: p.length, unit: 'm', dp: 2 })
  out.push({ key: 'amplitudeDeg', label: 'swing angle', value: p.amplitudeDeg, unit: '°', dp: 0 })
  out.push({ key: 'mass', label: 'm', value: p.mass, unit: 'kg', dp: 1 })
  return out
}
