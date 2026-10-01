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

// Arrow scales (world units per physical unit). Proportional within a run AND
// across runs, so "twice the mass, half the arrow" can be seen. Large enough to
// read at lesson width: the default run (F = 10 N, a = 5 m/s², v up to ≈ 14 m/s)
// gives arrows of 4, 5 and up to ≈ 7 units against the 20-unit track. Beyond
// MAX_ARROW an arrow is drawn at the cap and its label says so, rather than the
// frame growing to fit an arrow few runs ever reach (measured before: 0.1 units
// per m/s² drew the default run's arrows a few pixels long). The force arrow is
// never capped (20 N × 0.4 = 8).
const FORCE_SCALE = 0.4
const ACCEL_SCALE = 1
const VELOCITY_SCALE = 0.5
const MAX_ARROW = 8
const ARROW_THICKNESS = 0.16

// The v–t graph under the track. Axes are FIXED (not fitted to the run) so the
// slopes of different runs can be compared: a steeper line is a larger a.
const GRAPH_Y0 = -8.5
const GRAPH_T_MAX = NEWTON_MAX_TICKS * NEWTON_FIXED_DT // 10 s
const GRAPH_V_MAX = 45 // m/s — above the largest reachable speed (≈ 40.8)
const GRAPH_WIDTH = NEWTON_TRACK_M // 20 units for 10 s
const GRAPH_HEIGHT = 6
const GRAPH_SAMPLE_TICKS = 5 // one trace point per 0.1 s
const MIN_TRACE_POINTS = 8

// The fixed box every frame lives in. Every arrow starts AT the block and points
// the way the block goes (free-body style), so nothing extends behind the start
// line but the mass label and the graph's axis labels. Right: the force arrow
// ahead of a heavy block that has just crossed the line (20.8 + 0.78 + 8).
const FLOOR_X0 = -5
const FLOOR_X1 = 30
const TOP_Y = 5.8
const BOTTOM_Y = GRAPH_Y0 - 0.9

// One row per arrow, far enough apart that each label can sit by its own arrow
// (measured at 1.0-unit spacing: the label solver pushed them off their rows).
const Y_ACCEL = 2.5
const Y_VELOCITY = 4.3
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

/** A drawn arrow length for a value, and whether it had to be capped. */
export function newtonArrowLength(value: number, scale: number): { length: number; capped: boolean } {
  const raw = value * scale
  return raw > MAX_ARROW ? { length: MAX_ARROW, capped: true } : { length: round(raw), capped: false }
}
export const NEWTON_ARROW_SCALES = { force: FORCE_SCALE, acceleration: ACCEL_SCALE, velocity: VELOCITY_SCALE, max: MAX_ARROW } as const

/** Where the run is: before it starts, under way, or over. */
export type NewtonPhase = 'start' | 'moving' | 'finished'
export function newtonPhaseAt(p: NewtonParams, tick: number): NewtonPhase {
  const s = newtonStateAt(p, tick)
  if (s.tick === 0) return 'start'
  return s.tick >= newtonTerminalTick(p) ? 'finished' : 'moving'
}

/**
 * What the figure says is happening, true of THIS tick. Before the run it
 * states only the inputs — never the acceleration, the answer the learner is
 * about to find out by experiment (ADR 16: predict → experiment → observe).
 */
function whatIsHappening(p: NewtonParams, phase: NewtonPhase, s: NewtonState): string {
  const F = fmt(p.force, 0)
  const m = fmt(p.mass, 1)
  if (phase === 'start') {
    return p.force > 0
      ? `A net force of ${F} N is ready to push the ${m} kg block from rest. Make a prediction, then run the experiment.`
      : `No net force is applied to the ${m} kg block. Run the experiment to see what it does.`
  }
  if (s.a === 0) return `No net force acts on the ${m} kg block, so it stays at rest.`
  if (phase === 'moving') {
    return `The block is speeding up: after ${fmt(s.t, 2)} s it has moved ${fmt(s.x, 2)} m and reached ${fmt(s.v, 2)} m/s.`
  }
  return s.x >= NEWTON_TRACK_M
    ? `The block reached the end of the track after ${fmt(s.t, 2)} s, moving at ${fmt(s.v, 2)} m/s.`
    : `After ${fmt(s.t, 2)} s the block has moved ${fmt(s.x, 2)} m and reached ${fmt(s.v, 2)} m/s.`
}

/**
 * The figure at a tick. Tick 0 is the static figure (the block at rest on the
 * start line), and it is exactly what the parametric registry builds.
 *
 * ── THE ANSWER IS NOT IN THE FIGURE BEFORE THE RUN ──────────────────────────
 * At tick 0 nothing states or encodes the acceleration: no acceleration arrow
 * (its LENGTH is the answer too), no "a =" label, no F / m in the narration,
 * title or description. Only the inputs — the force and the mass — are shown.
 * The acceleration appears once the block is moving, i.e. once it has been
 * observed. Measured before this rule: setting m = 4 kg printed
 * "a = 2.50 m/s²" in the header and on the canvas before Run was pressed.
 *
 * ── LIVE NUMBERS LIVE IN ONE PLACE ──────────────────────────────────────────
 * The running time and speed are NOT drawn as canvas labels. The DOM readouts
 * beside the controls show them; a second copy inside the canvas is painted a
 * render frame later and was measured disagreeing with them mid-run (8.1 vs
 * 8.4 m/s). The canvas carries geometry — the block, the arrows, the graph —
 * and the labels that stay constant through a run.
 */
export function buildNewtonScene(p: NewtonParams, tick = 0): SceneSpec {
  const s = newtonStateAt(p, tick)
  const phase = newtonPhaseAt(p, tick)
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
    // v–t axes, with enough scale to compare runs: both axis names (with their
    // units), the origin, and the two axis ends as bare tick numbers. The ends
    // carry NO unit on purpose: the tutor reads every label on the figure, and
    // "10 s" beside "45 m/s" was read live as a data point ("after 10 seconds it
    // reaches 45 m/s") on an empty graph.
    { ...line([0, GRAPH_Y0, 0], [GRAPH_WIDTH, GRAPH_Y0, 0], ROLE.reference), id: 'graph-t-axis' },
    { ...line([0, GRAPH_Y0, 0], [0, GRAPH_Y0 + GRAPH_HEIGHT, 0], ROLE.reference), id: 'graph-v-axis' },
    { ...label('t (s)', [GRAPH_WIDTH / 2, BOTTOM_Y, 0], ROLE.reference), id: 'graph-t-label' },
    { ...label('v (m/s)', [-2.6, GRAPH_Y0 + GRAPH_HEIGHT / 2, 0], ROLE.reference), id: 'graph-v-label' },
    { ...label('0', [-0.6, GRAPH_Y0 - 0.6, 0], ROLE.reference), id: 'graph-origin' },
    { ...label(fmt(GRAPH_T_MAX, 0), [GRAPH_WIDTH, GRAPH_Y0 - 0.6, 0], ROLE.reference), id: 'graph-t-max' },
    { ...label(String(GRAPH_V_MAX), [-1.2, GRAPH_Y0 + GRAPH_HEIGHT, 0], ROLE.reference), id: 'graph-v-max' },
  ]

  const body: SceneObject[] = [
    { type: 'node', id: 'block', position: [x, r, 0], color: ROLE.ink, radius: r },
    { ...label(`m = ${fmt(p.mass, 1)} kg`, [round(x - r - 1.9), r, 0], ROLE.ink), id: 'mass-label' },
  ]
  if (p.force * FORCE_SCALE >= MIN_ARROW) {
    // The net force on the block, drawn from the block in the direction it acts.
    const len = newtonArrowLength(p.force, FORCE_SCALE).length
    const to: Vec3 = [round(x + r + len), r, 0]
    body.push({ type: 'arrow', id: 'force', from: [round(x + r), r, 0], to, color: ROLE.input, thickness: ARROW_THICKNESS })
    body.push({ ...label(`F = ${fmt(p.force, 0)} N`, [round(x + r + len / 2), r + 0.8, 0], ROLE.input), id: 'force-label' })
  }
  if (phase !== 'start' && s.a > 0) {
    const arrow = newtonArrowLength(s.a, ACCEL_SCALE)
    if (arrow.length >= MIN_ARROW) {
      body.push({ type: 'arrow', id: 'acceleration', from: [x, Y_ACCEL, 0], to: [round(x + arrow.length), Y_ACCEL, 0], color: ROLE.output, thickness: ARROW_THICKNESS })
    }
    body.push({ ...label(`a = ${fmt(s.a, 2)} m/s²${arrow.capped ? ' (arrow capped)' : ''}`, [round(x + arrow.length / 2), Y_ACCEL + 0.8, 0], ROLE.output), id: 'acceleration-label' })
  }
  if (phase !== 'start') {
    const arrow = newtonArrowLength(s.v, VELOCITY_SCALE)
    if (arrow.length >= MIN_ARROW) {
      body.push({ type: 'arrow', id: 'velocity', from: [x, Y_VELOCITY, 0], to: [round(x + arrow.length), Y_VELOCITY, 0], color: ROLE.result, thickness: ARROW_THICKNESS })
    }
  }

  // The v–t trace so far, and the current point on it. Object ids double as the
  // legend's names when an object carries no caption, so they are written for
  // the learner (measured in the browser: 'vt-now' surfaced as "Vt now").
  const trace: Vec3[] = []
  for (let k = 0; k <= s.tick; k += GRAPH_SAMPLE_TICKS) trace.push(graphPoint(k * NEWTON_FIXED_DT, s.a * k * NEWTON_FIXED_DT))
  // The description may only claim a line that is actually drawn (measured: the
  // tutor, reading this text, described a v–t line the learner could not see).
  const graphDrawn = trace.length >= MIN_TRACE_POINTS
  if (graphDrawn) {
    body.push({ type: 'path', id: 'velocity-time-graph', points: trace, color: ROLE.result })
  }
  body.push({ type: 'node', id: 'current-velocity', position: graphPoint(s.t, s.v), color: ROLE.result, radius: 0.18 })

  const happening = whatIsHappening(p, phase, s)
  const F = fmt(p.force, 0)
  const m = fmt(p.mass, 1)
  return {
    id: `newton-second-law-${p.force}-${p.mass}-${s.tick}`,
    // "Name: givens" — the frame splits it, so the header shows the name and the
    // two INPUTS. Never the acceleration: that is the result of the experiment.
    title: `Newton's second law: F = ${F} N, m = ${m} kg`,
    sceneType: 'simulation',
    teachingGoal: 'Find out by experiment how the net force and the mass together decide how quickly the block speeds up.',
    ariaLabel: phase === 'start'
      ? `A block of mass ${m} kg at rest at the start of a frictionless 20 m track, with a net force of ${F} N ready to push it. `
        + 'Below the track, an empty velocity–time graph that will record the motion once the experiment runs.'
      : s.a > 0
        ? `A block of mass ${m} kg on a frictionless 20 m track, pushed by a net force of ${F} N. `
          + `After ${fmt(s.t, 2)} s it is ${fmt(s.x, 2)} m from the start, moving at ${fmt(s.v, 2)} m/s and accelerating at ${fmt(s.a, 2)} m/s². `
          + (graphDrawn
            ? 'The velocity–time graph below shows its speed rising in a straight line.'
            : 'The velocity–time graph below has only just started recording.')
        : `A block of mass ${m} kg on a frictionless 20 m track with no net force on it. It stays at rest, and the velocity–time graph stays flat.`,
    steps: [
      {
        narration: 'A frictionless 20 m track. Below it, a velocity–time graph records the motion: its time axis runs '
          + `from 0 to ${fmt(GRAPH_T_MAX, 0)} s and its speed axis from 0 to ${GRAPH_V_MAX} m/s. `
          + (graphDrawn ? 'The line on it is this run so far.' : phase === 'start' ? 'It stays empty until the experiment runs.' : 'This run has only just started on it.'),
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

export interface NewtonReadout {
  key: 't' | 'x' | 'v' | 'a_measured' | 'force' | 'mass'
  label: string
  value: number
  unit: string
  /** A shorter header for the runs table. */
  tableLabel?: string
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
  if (s.t > 0) out.push({ key: 'a_measured', label: 'a (measured, Δv/Δt)', value: s.v / s.t, unit: 'm/s²', tableLabel: 'a (measured)' })
  out.push({ key: 'force', label: 'F', value: p.force, unit: 'N' })
  out.push({ key: 'mass', label: 'm', value: p.mass, unit: 'kg' })
  return out
}
