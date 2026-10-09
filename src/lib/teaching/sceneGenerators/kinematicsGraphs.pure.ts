/**
 * kinematicsGraphs — the PURE half (geometry, validation, consistency check).
 *
 * Split out of the module of the same name, whose remaining half is the LLM
 * parameter extractor. The split has ONE purpose: these builders must be
 * runnable in a BROWSER, so a learner can vary a parameter and see the figure
 * re-derived by the identical code that produced the one they were given.
 * `@/lib/ai/client` reaches the provider router, the AI budget and the rate
 * limiter — a server graph that must never enter a client bundle.
 *
 * Nothing about the geometry, the formulae or the checks changed in the split.
 * The original module re-exports everything here, so every existing importer
 * — the router, the harness scripts, the tests — is untouched.
 *
 * Purity is enforced by src/tests/sceneGeneratorPurity.test.ts, not by this
 * comment.
 */

import type { SceneObject, SceneSpec, Vec3 } from '../sceneSpec'
import { round, strictNumber, type ConsistencyResult } from './shared'
import { arrow, label as textLabel, ROLE } from './visualDesign'

// ── Parameters (the ONLY thing the LLM extracts) ─────────────────────────────

export interface KinematicsParams {
  /** Initial velocity (u), m/s. */
  initialVelocity: number
  /** Constant acceleration (a), m/s^2. */
  acceleration: number
  /** Duration to plot over (t), seconds — must be > 0. */
  duration: number
  /** Initial position (x0), m — defaults to 0 if unstated. */
  initialPosition: number
}

const VELOCITY_BOUND = 100
const ACCELERATION_BOUND = 50
const DURATION_BOUND = 120
const POSITION_BOUND = 1000
const VISUAL_MAX = 14
const CURVE_SAMPLES = 30

export function validateKinematicsParams(raw: unknown): KinematicsParams | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>

  const initialVelocity = strictNumber(o.initialVelocity)
  const acceleration = strictNumber(o.acceleration)
  const duration = strictNumber(o.duration)
  const initialPosition = o.initialPosition === undefined ? 0 : strictNumber(o.initialPosition)

  if (!Number.isFinite(initialVelocity) || Math.abs(initialVelocity) > VELOCITY_BOUND) return null
  if (!Number.isFinite(acceleration) || Math.abs(acceleration) > ACCELERATION_BOUND) return null
  if (!Number.isFinite(duration) || duration <= 0 || duration > DURATION_BOUND) return null
  if (!Number.isFinite(initialPosition) || Math.abs(initialPosition) > POSITION_BOUND) return null

  return { initialVelocity, acceleration, duration, initialPosition }
}

// ── Deterministic math (pure leaf functions; never LLM-generated) ────────────

function positionAt(p: KinematicsParams, t: number): number {
  return p.initialPosition + p.initialVelocity * t + 0.5 * p.acceleration * t * t
}

function velocityAt(p: KinematicsParams, t: number): number {
  return p.initialVelocity + p.acceleration * t
}

/** Build a 3-step kinematics SceneSpec: position-time, then velocity-time, then acceleration-time. */
/**
 * WRITE THE EQUATION THE WAY A TEACHER WOULD WRITE IT.
 *
 * The first version of these labels interpolated every term unconditionally,
 * so a runner starting from rest at the origin got:
 *
 *     x–t: x = 0 + 0t + 0.5(2)t²
 *
 * Every character of that is TRUE and three of its terms are noise. Measured
 * in a live production lesson: the tutor read it out to the learner verbatim,
 * backticks and all, because the contract correctly tells it to use the
 * figure's own words — so a sloppy label becomes sloppy teaching directly.
 *
 * Zero terms are dropped, a unit coefficient is left implicit (1t² is t²), and
 * a negative term is joined with a real minus sign rather than "+ -".
 */
function polynomial(terms: (string | null)[]): string {
  const kept = terms.filter((t): t is string => t !== null && t.length > 0)
  if (kept.length === 0) return '0'
  // The LEADING term takes the same real minus sign as a joined one, so a
  // single expression never mixes "-2" with "− 4t".
  const head = kept[0].startsWith('-') ? `−${kept[0].slice(1)}` : kept[0]
  return kept.slice(1).reduce((acc, t) => (t.startsWith('-') ? `${acc} − ${t.slice(1)}` : `${acc} + ${t}`), head)
}

/** A coefficient attached to a variable: 0 drops the term, ±1 leaves it implicit. */
function term(coefficient: number, variable: string): string | null {
  const c = round(coefficient)
  if (c === 0) return null
  if (c === 1) return variable
  if (c === -1) return `-${variable}`
  return `${c}${variable}`
}

/** A bare constant: 0 drops the term. */
export function constant(value: number): string | null {
  const v = round(value)
  return v === 0 ? null : String(v)
}

/**
 * THREE GRAPHS, EACH WITH ITS OWN AXES.
 *
 * Position, velocity and acceleration used to be three curves normalised to the
 * SAME ±14 box and drawn on one unlabelled plane: no axes, no units, no scale,
 * and the acceleration line always sat at the top whatever its value. Measured
 * in Chromium at 390px: three coloured lines and a stack of equations in the
 * corner, nothing saying what either axis was. A learner could not read a value
 * off it or tell that the curves were on different scales — which they were.
 *
 * Now each quantity is its own small graph, stacked, sharing ONE time scale so
 * "when" lines up across them, with an axis arrow each way, the axis names with
 * units, and the end values written on the axes. Each y-range always includes 0
 * and the zero line is where the time axis is drawn, so a negative velocity
 * visibly goes below the axis.
 */
const PANEL_W = 20          // length of every time axis, scene units
const AXIS_X = -10          // x of the vertical axes
const PANEL_H = 7           // height of each graph's value range
/** Bottom edge of the three graphs, top to bottom: x–t, v–t, a–t. */
const PANEL_BOTTOMS = [8, -3.5, -15] as const

interface Panel {
  key: 'position' | 'velocity' | 'acceleration'
  bottom: number
  lo: number
  hi: number
  /** Scene y for a value. */
  y: (v: number) => number
}

function panelFor(key: Panel['key'], i: number, values: number[]): Panel {
  let lo = Math.min(0, ...values)
  let hi = Math.max(0, ...values)
  if (hi - lo < 1e-9) { lo = -1; hi = 1 } // a value that is 0 throughout still gets a drawn range
  const bottom = PANEL_BOTTOMS[i]
  return { key, bottom, lo, hi, y: (v) => bottom + ((v - lo) / (hi - lo)) * PANEL_H }
}

interface Layout {
  ts: number[]
  xs: number[]
  vs: number[]
  /** Scene units per second — one scale for all three graphs. */
  sxTime: number
  panels: [Panel, Panel, Panel]
}

function sampleCurves(p: KinematicsParams): Layout {
  const ts: number[] = []
  for (let i = 0; i <= CURVE_SAMPLES; i++) ts.push((i / CURVE_SAMPLES) * p.duration)
  const xs = ts.map((t) => positionAt(p, t))
  const vs = ts.map((t) => velocityAt(p, t))
  const sxTime = PANEL_W / Math.max(p.duration, 1e-9)
  return {
    ts, xs, vs, sxTime,
    panels: [
      panelFor('position', 0, xs),
      panelFor('velocity', 1, vs),
      panelFor('acceleration', 2, [p.acceleration]),
    ],
  }
}

/** A number as it would be written on an axis: no float noise, no trailing zeros. */
function tick(v: number): string {
  const r = round(v, 2)
  return (Object.is(r, -0) ? 0 : r).toString().replace('-', '−')
}

const AXIS_UNITS = { position: 'x (m)', velocity: 'v (m/s)', acceleration: 'a (m/s²)' } as const

/** The panel's axes, their names and the end values written on them. */
function axisObjects(panel: Panel, duration: number): SceneObject[] {
  const zero = panel.y(0)
  const top = panel.bottom + PANEL_H
  const end = AXIS_X + PANEL_W
  const out: SceneObject[] = [
    arrow([AXIS_X, zero, 0], [end, zero, 0], ROLE.reference),
    arrow([AXIS_X, panel.bottom, 0], [AXIS_X, top, 0], ROLE.reference),
    textLabel('t (s)', [round(end + 2.4), round(zero), 0], ROLE.ink, 'detail'),
    textLabel(AXIS_UNITS[panel.key], [AXIS_X, round(top + 1.3), 0], ROLE.ink, 'detail'),
    textLabel(tick(duration), [end, round(zero - 1.2), 0], ROLE.ink, 'detail'),
    textLabel(tick(panel.hi), [AXIS_X - 1.9, round(top), 0], ROLE.ink, 'detail'),
  ]
  // 0 is named wherever the time axis does not run along the bottom edge.
  if (panel.lo < 0) {
    out.push(textLabel('0', [AXIS_X - 1.2, round(zero), 0], ROLE.ink, 'detail'))
    out.push(textLabel(tick(panel.lo), [AXIS_X - 1.9, panel.bottom, 0], ROLE.ink, 'detail'))
  } else {
    out.push(textLabel('0', [AXIS_X - 1.2, round(zero), 0], ROLE.ink, 'detail'))
  }
  return out
}

/**
 * The curve's equation, as the graph's title. It rides the top of its own graph
 * (not the curve's end), so it can never sit on the line it names, and
 * `fromScene` — which reads LABELS — can still name which curve is which.
 */
function curveLabel(id: string, panel: Panel, text: string, color: string): SceneObject {
  return {
    type: 'label',
    id,
    position: [2.5, round(panel.bottom + PANEL_H + 1.3), 0] as Vec3,
    text,
    color,
    properties: { labels: id.replace(/-label$/, '') },
  }
}

/** Build a 3-step kinematics SceneSpec: position-time, then velocity-time, then acceleration-time. */
export function buildKinematicsGraphScene(params: KinematicsParams): SceneSpec {
  const s = sampleCurves(params)
  const [pos, vel, acc] = s.panels

  const at = (t: number, panel: Panel, v: number): Vec3 => [round(AXIS_X + t * s.sxTime), round(panel.y(v)), 0]
  const positionPoints: Vec3[] = s.ts.map((t, i) => at(t, pos, s.xs[i]))
  const velocityPoints: Vec3[] = s.ts.map((t, i) => at(t, vel, s.vs[i]))
  // Acceleration is constant — a flat line across the same time domain.
  const accelerationPoints: Vec3[] = [at(0, acc, params.acceleration), at(params.duration, acc, params.acceleration)]

  return {
    id: `kinematics-${params.initialVelocity}-${params.acceleration}-${params.duration}`,
    title: `Kinematics graphs for u=${params.initialVelocity} m/s, a=${params.acceleration} m/s²`,
    sceneType: 'plot',
    teachingGoal: 'Show how position, velocity, and acceleration each vary with time under constant acceleration.',
    cameraDistance: VISUAL_MAX * 3,
    ariaLabel: 'Three graphs, each with its own axes: position vs time, velocity vs time, and acceleration vs time, for uniformly accelerated motion.',
    steps: [
      {
        narration: `This is the position-time graph: x = ${params.initialPosition} + ${params.initialVelocity}t + 0.5(${params.acceleration})t², a ${params.acceleration === 0 ? 'straight line' : params.acceleration > 0 ? 'curve bending upward' : 'curve bending downward'} since acceleration is ${params.acceleration === 0 ? 'zero' : 'constant and non-zero'}.`,
        objects: [
          ...axisObjects(pos, params.duration),
          { type: 'path', id: 'position-curve', points: positionPoints, color: '#3b82f6' },
          curveLabel('position-curve-label', pos, `x–t: x = ${polynomial([constant(params.initialPosition), term(params.initialVelocity, 't'), term(params.acceleration / 2, 't²')])}`, '#3b82f6'),
        ],
      },
      {
        narration: `This is the velocity-time graph: v = ${params.initialVelocity} + ${params.acceleration}t — ${params.acceleration === 0 ? 'a flat line, since velocity is constant' : 'a straight line, since velocity changes at a constant rate'}.`,
        objects: [
          ...axisObjects(vel, params.duration),
          { type: 'path', id: 'velocity-curve', points: velocityPoints, color: '#22c55e' },
          curveLabel('velocity-curve-label', vel, `v–t: v = ${polynomial([constant(params.initialVelocity), term(params.acceleration, 't')])}`, '#22c55e'),
        ],
      },
      {
        narration: `This is the acceleration-time graph: a flat line at a = ${params.acceleration} m/s², since acceleration is constant throughout.`,
        objects: [
          ...axisObjects(acc, params.duration),
          { type: 'path', id: 'acceleration-curve', points: accelerationPoints, color: '#f59e0b' },
          curveLabel('acceleration-curve-label', acc, `a–t: a = ${params.acceleration} m/s² (constant)`, '#f59e0b'),
        ],
      },
    ],
  }
}

// ── Safety-net consistency checker (deterministic, independent re-derivation) ─

export function checkKinematicsConsistency(spec: SceneSpec, params: KinematicsParams): ConsistencyResult {
  const errors: string[] = []
  const objs = spec.steps.flatMap((s) => s.objects)

  const position = objs.find((o) => o.id === 'position-curve')
  const velocity = objs.find((o) => o.id === 'velocity-curve')
  const acceleration = objs.find((o) => o.id === 'acceleration-curve')
  if (!position || !position.points) return { ok: false, errors: ['missing position-curve object'] }
  if (!velocity || !velocity.points) return { ok: false, errors: ['missing velocity-curve object'] }
  if (!acceleration || !acceleration.points) return { ok: false, errors: ['missing acceleration-curve object'] }

  const s = sampleCurves(params)
  const [pos, vel, acc] = s.panels
  const at = (t: number, panel: Panel, v: number): Vec3 => [round(AXIS_X + t * s.sxTime), round(panel.y(v)), 0]
  const tolPos = PANEL_H * 0.02
  const tolVel = PANEL_H * 0.02

  if (position.points.length !== s.ts.length) {
    errors.push(`position-curve has ${position.points.length} points, expected ${s.ts.length}`)
  } else {
    for (let i = 0; i < s.ts.length; i++) {
      const expected: Vec3 = at(s.ts[i], pos, s.xs[i])
      if (Math.abs(position.points[i][0] - expected[0]) > tolPos || Math.abs(position.points[i][1] - expected[1]) > tolPos) {
        errors.push(`position-curve point ${i} (${position.points[i][0]}, ${position.points[i][1]}) does not match re-derived (${expected[0]}, ${expected[1]})`)
      }
    }
  }

  if (velocity.points.length !== s.ts.length) {
    errors.push(`velocity-curve has ${velocity.points.length} points, expected ${s.ts.length}`)
  } else {
    for (let i = 0; i < s.ts.length; i++) {
      const expected: Vec3 = at(s.ts[i], vel, s.vs[i])
      if (Math.abs(velocity.points[i][0] - expected[0]) > tolVel || Math.abs(velocity.points[i][1] - expected[1]) > tolVel) {
        errors.push(`velocity-curve point ${i} (${velocity.points[i][0]}, ${velocity.points[i][1]}) does not match re-derived (${expected[0]}, ${expected[1]})`)
      }
    }
  }

  const expectedAccelY = at(0, acc, params.acceleration)[1]
  if (acceleration.points.length !== 2) {
    errors.push(`acceleration-curve has ${acceleration.points.length} points, expected 2 (a flat line)`)
  } else if (Math.abs(acceleration.points[0][1] - expectedAccelY) > tolVel || Math.abs(acceleration.points[1][1] - expectedAccelY) > tolVel) {
    errors.push(`acceleration-curve y-values (${acceleration.points[0][1]}, ${acceleration.points[1][1]}) do not match re-derived constant ${expectedAccelY}`)
  } else if (acceleration.points[0][1] !== acceleration.points[1][1]) {
    errors.push('acceleration-curve is not flat (its two y-values differ)')
  }

  return { ok: errors.length === 0, errors }
}

