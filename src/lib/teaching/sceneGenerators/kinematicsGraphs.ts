/**
 * Kinematics graphs scene generator (15th parametric generator) — closes the
 * "Kinematics graphs (x-t, v-t, a-t)" gap noted in
 * docs/VISUAL_COVERAGE_GAP_ANALYSIS.md. Plots position-time, velocity-time,
 * and acceleration-time graphs for uniformly accelerated motion from the
 * standard kinematic equations (x = x0 + u*t + 1/2*a*t^2, v = u + a*t,
 * a = constant). Same architecture as the other generators:
 * extractKinematicsParams (LLM, isolated) → validateKinematicsParams (pure) →
 * buildKinematicsGraphScene (pure, deterministic sampling) →
 * checkKinematicsConsistency (pure, independent re-derivation safety net).
 */

import { generateJSON } from '@/lib/ai/client'
import type { SceneObject, SceneSpec, Vec3 } from '../sceneSpec'
import { round, strictNumber, type ConsistencyResult } from './shared'

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

interface SampledCurve {
  ts: number[]
  xs: number[]
  vs: number[]
  sxTime: number
  sxPos: number
  sxVel: number
}

function sampleCurves(p: KinematicsParams): SampledCurve {
  const ts: number[] = []
  for (let i = 0; i <= CURVE_SAMPLES; i++) ts.push((i / CURVE_SAMPLES) * p.duration)
  const xs = ts.map((t) => positionAt(p, t))
  const vs = ts.map((t) => velocityAt(p, t))

  const sxTime = VISUAL_MAX / Math.max(p.duration, 1e-9)
  const sxPos = VISUAL_MAX / Math.max(...xs.map(Math.abs), 1e-9)
  const sxVel = VISUAL_MAX / Math.max(...vs.map(Math.abs), 1e-9)

  return { ts, xs, vs, sxTime, sxPos, sxVel }
}

/** Build a 3-step kinematics SceneSpec: position-time, then velocity-time, then acceleration-time. */
export function buildKinematicsGraphScene(params: KinematicsParams): SceneSpec {
  const s = sampleCurves(params)

  const positionPoints: Vec3[] = s.ts.map((t, i) => [round(t * s.sxTime), round(s.xs[i] * s.sxPos), 0])
  const velocityPoints: Vec3[] = s.ts.map((t, i) => [round(t * s.sxTime), round(s.vs[i] * s.sxVel), 0])
  // Acceleration is constant — a flat line across the same time domain, scaled
  // by its own bound (or 1 if acceleration is exactly 0, to avoid a 0/0 scale).
  const sxAccel = VISUAL_MAX / Math.max(Math.abs(params.acceleration), 1e-9)
  const accelerationPoints: Vec3[] = [
    [0, round(params.acceleration * sxAccel), 0],
    [round(VISUAL_MAX), round(params.acceleration * sxAccel), 0],
  ]

  return {
    id: `kinematics-${params.initialVelocity}-${params.acceleration}-${params.duration}`,
    title: `Kinematics graphs for u=${params.initialVelocity} m/s, a=${params.acceleration} m/s²`,
    sceneType: 'plot',
    teachingGoal: 'Show how position, velocity, and acceleration each vary with time under constant acceleration.',
    cameraDistance: VISUAL_MAX * 3,
    ariaLabel: 'Three graphs: position vs time, velocity vs time, and acceleration vs time, for uniformly accelerated motion.',
    steps: [
      {
        narration: `This is the position-time graph: x = ${params.initialPosition} + ${params.initialVelocity}t + 0.5(${params.acceleration})t², a ${params.acceleration === 0 ? 'straight line' : params.acceleration > 0 ? 'curve bending upward' : 'curve bending downward'} since acceleration is ${params.acceleration === 0 ? 'zero' : 'constant and non-zero'}.`,
        objects: [{ type: 'path', id: 'position-curve', points: positionPoints, color: '#3b82f6' }],
      },
      {
        narration: `This is the velocity-time graph: v = ${params.initialVelocity} + ${params.acceleration}t — ${params.acceleration === 0 ? 'a flat line, since velocity is constant' : 'a straight line, since velocity changes at a constant rate'}.`,
        objects: [{ type: 'path', id: 'velocity-curve', points: velocityPoints, color: '#22c55e' }],
      },
      {
        narration: `This is the acceleration-time graph: a flat line at a = ${params.acceleration} m/s², since acceleration is constant throughout.`,
        objects: [{ type: 'path', id: 'acceleration-curve', points: accelerationPoints, color: '#f59e0b' }],
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
  const tolPos = VISUAL_MAX * 0.02
  const tolVel = VISUAL_MAX * 0.02

  if (position.points.length !== s.ts.length) {
    errors.push(`position-curve has ${position.points.length} points, expected ${s.ts.length}`)
  } else {
    for (let i = 0; i < s.ts.length; i++) {
      const expected: Vec3 = [round(s.ts[i] * s.sxTime), round(s.xs[i] * s.sxPos), 0]
      if (Math.abs(position.points[i][0] - expected[0]) > tolPos || Math.abs(position.points[i][1] - expected[1]) > tolPos) {
        errors.push(`position-curve point ${i} (${position.points[i][0]}, ${position.points[i][1]}) does not match re-derived (${expected[0]}, ${expected[1]})`)
      }
    }
  }

  if (velocity.points.length !== s.ts.length) {
    errors.push(`velocity-curve has ${velocity.points.length} points, expected ${s.ts.length}`)
  } else {
    for (let i = 0; i < s.ts.length; i++) {
      const expected: Vec3 = [round(s.ts[i] * s.sxTime), round(s.vs[i] * s.sxVel), 0]
      if (Math.abs(velocity.points[i][0] - expected[0]) > tolVel || Math.abs(velocity.points[i][1] - expected[1]) > tolVel) {
        errors.push(`velocity-curve point ${i} (${velocity.points[i][0]}, ${velocity.points[i][1]}) does not match re-derived (${expected[0]}, ${expected[1]})`)
      }
    }
  }

  const sxAccel = VISUAL_MAX / Math.max(Math.abs(params.acceleration), 1e-9)
  const expectedAccelY = round(params.acceleration * sxAccel)
  if (acceleration.points.length !== 2) {
    errors.push(`acceleration-curve has ${acceleration.points.length} points, expected 2 (a flat line)`)
  } else if (Math.abs(acceleration.points[0][1] - expectedAccelY) > tolVel || Math.abs(acceleration.points[1][1] - expectedAccelY) > tolVel) {
    errors.push(`acceleration-curve y-values (${acceleration.points[0][1]}, ${acceleration.points[1][1]}) do not match re-derived constant ${expectedAccelY}`)
  } else if (acceleration.points[0][1] !== acceleration.points[1][1]) {
    errors.push('acceleration-curve is not flat (its two y-values differ)')
  }

  return { ok: errors.length === 0, errors }
}

// ── LLM parameter extraction (NEEDS A LIVE GROQ TEST — isolated) ──────────────

function buildExtractionPrompt(text: string): string {
  return `Read the explanation below and extract the uniformly-accelerated-motion kinematics scenario being discussed, if present.

Explanation:
"${text}"

Reply with ONLY this JSON, no other text:
{"isKinematicsGraph": true|false, "initialVelocity": <number>, "acceleration": <number>, "duration": <number>, "initialPosition": <number>}
- isKinematicsGraph is false if the text is not about plotting position/velocity/acceleration vs. time for constant-acceleration motion.
- initialVelocity (m/s), acceleration (m/s^2, signed — negative for deceleration), duration (seconds, the time window to plot, must be > 0), initialPosition (m, default 0 if unstated).
- Do not invent values not stated in the text; use sensible defaults only if truly unstated (e.g. initialPosition: 0, duration: a reasonable window such as 10).`
}

/**
 * Extract validated kinematics-graph parameters from text via the LLM, or null. Never throws.
 * NOTE: requires a live Groq-reachable network — verify with a real call later.
 */
export async function extractKinematicsParams(text: string): Promise<KinematicsParams | null> {
  if (!text || !text.trim()) return null
  const raw = await generateJSON(buildExtractionPrompt(text), 250).catch(() => null)
  if (!raw || raw.isKinematicsGraph !== true) return null
  return validateKinematicsParams(raw)
}
