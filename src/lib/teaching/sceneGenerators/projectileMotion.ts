/**
 * Part 2 (option C) — projectile-motion scene generator. FIRST scene type.
 *
 * DESIGN (evidence-driven): tonight's feasibility probe showed the free-form
 * generator (generateSceneSpec.ts) produces confident-but-WRONG geometry on
 * easy cases — including a NON-parabolic projectile trajectory. This module
 * takes the opposite approach: the LLM is NEVER asked to produce coordinates.
 * It only EXTRACTS parameters (launch angle, speed) from the explanation text;
 * the trajectory itself is computed here by the real kinematics formula, so it
 * is parabolic BY CONSTRUCTION.
 *
 * This is a NEW, separate code path. It does NOT touch, import, or re-enable the
 * old free-form generateSceneSpec.ts, and is not wired into production yet.
 *
 * Pure-formula parts (buildProjectileScene, checkProjectileConsistency) need no
 * network and are fully unit-testable. Only extractProjectileParams() calls the
 * LLM (Groq) and must be verified live later — it is clearly isolated below.
 */

import { generateJSON } from '@/lib/ai/client'
import { validateSceneSpec } from '../sceneSpecValidator'
import type { SceneSpec, Vec3 } from '../sceneSpec'
import { round, type ConsistencyResult } from './shared'

// ── Parameters (the ONLY thing the LLM extracts) ─────────────────────────────

export interface ProjectileParams {
  /** Launch angle above the horizontal, in degrees. Physically 0 < θ < 90. */
  angleDegrees: number
  /** Initial speed (m/s), > 0. */
  speed: number
  /** Gravitational acceleration (m/s²); defaults to 9.8. */
  gravity?: number
}

const DEFAULT_GRAVITY = 9.8
/** Target maximum on-screen extent; the trajectory is uniformly scaled to fit this. */
const VISUAL_MAX = 20
const TRAJECTORY_SAMPLES = 25

/**
 * Validate and normalize extracted parameters. Returns null (reject — render no
 * scene) when the values are physically implausible, so a hallucinated angle or
 * speed never reaches the renderer.
 */
export function validateProjectileParams(raw: unknown): ProjectileParams | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>
  const angleDegrees = Number(o.angleDegrees)
  const speed = Number(o.speed)
  const gravity = o.gravity == null ? DEFAULT_GRAVITY : Number(o.gravity)
  if (!Number.isFinite(angleDegrees) || angleDegrees <= 0 || angleDegrees >= 90) return null
  if (!Number.isFinite(speed) || speed <= 0 || speed > 1000) return null
  if (!Number.isFinite(gravity) || gravity <= 0 || gravity > 100) return null
  return { angleDegrees, speed, gravity }
}

// ── Deterministic geometry (real physics, never LLM-generated) ───────────────

interface ProjectileGeometry {
  scale: number
  range: number          // physical range R (m)
  maxHeight: number      // physical max height H (m)
  apex: Vec3             // scaled apex point
  landing: Vec3          // scaled landing point
  launchTip: Vec3        // scaled tip of the launch-velocity arrow
  points: Vec3[]         // scaled trajectory points
}

/** Compute the real parabolic trajectory and key markers from the parameters. */
function computeGeometry(p: ProjectileParams): ProjectileGeometry {
  const g = p.gravity ?? DEFAULT_GRAVITY
  const theta = (p.angleDegrees * Math.PI) / 180
  const vx = p.speed * Math.cos(theta)
  const vy = p.speed * Math.sin(theta)
  const T = (2 * vy) / g
  const range = (p.speed ** 2 * Math.sin(2 * theta)) / g
  const maxHeight = vy ** 2 / (2 * g)

  // Uniform scale preserves the parabola shape AND the range:height ratio while
  // fitting the renderer's coordinate bound.
  const scale = VISUAL_MAX / Math.max(range, maxHeight, 1e-9)

  const points: Vec3[] = []
  for (let i = 0; i < TRAJECTORY_SAMPLES; i++) {
    const t = (T * i) / (TRAJECTORY_SAMPLES - 1)
    const x = vx * t
    const y = vy * t - 0.5 * g * t * t
    points.push([round(x * scale), round(Math.max(y, 0) * scale), 0])
  }

  // A short launch-velocity arrow in the launch direction (fixed visual length).
  const arrowLen = VISUAL_MAX * 0.25
  const launchTip: Vec3 = [round(Math.cos(theta) * arrowLen), round(Math.sin(theta) * arrowLen), 0]

  return {
    scale,
    range,
    maxHeight,
    apex: [round((range / 2) * scale), round(maxHeight * scale), 0],
    landing: [round(range * scale), 0, 0],
    launchTip,
    points,
  }
}

/**
 * Build a structurally- and physically-correct projectile-motion SceneSpec from
 * parameters. Pure, deterministic, no network. The trajectory is parabolic by
 * construction (computed from the kinematics formula, not generated).
 */
export function buildProjectileScene(params: ProjectileParams): SceneSpec {
  const geo = computeGeometry(params)
  const g = params.gravity ?? DEFAULT_GRAVITY

  return {
    id: `projectile-${params.angleDegrees}deg-${params.speed}ms`,
    title: `Projectile Motion at ${params.angleDegrees}° and ${params.speed} m/s`,
    sceneType: 'simulation',
    teachingGoal: 'Show that a projectile follows a parabolic trajectory, rising to a peak then falling symmetrically.',
    cameraDistance: VISUAL_MAX * 2.5,
    ariaLabel: `Parabolic trajectory of a projectile launched at ${params.angleDegrees} degrees with speed ${params.speed} meters per second.`,
    steps: [
      {
        narration: `The projectile launches from the origin at ${params.angleDegrees}° above the horizontal with a speed of ${params.speed} m/s.`,
        objects: [
          { type: 'point', id: 'origin', position: [0, 0, 0], text: 'Launch', color: '#22c55e', radius: 0.4 },
          { type: 'arrow', id: 'v0', from: [0, 0, 0], to: geo.launchTip, color: '#22c55e', text: `${params.speed} m/s` },
        ],
      },
      {
        narration: `Gravity (${round(g, 2)} m/s²) curves the path into a parabola — the horizontal speed stays constant while the vertical speed slows, stops at the peak, then reverses.`,
        objects: [
          { type: 'trajectory', id: 'path', points: geo.points, color: '#3b82f6' },
        ],
      },
      {
        narration: `It reaches a maximum height of about ${round(geo.maxHeight, 2)} m at the midpoint, then lands a horizontal range of about ${round(geo.range, 2)} m away — the path is symmetric about the peak.`,
        objects: [
          { type: 'point', id: 'apex', position: geo.apex, text: `Peak (~${round(geo.maxHeight, 2)} m)`, color: '#f59e0b', radius: 0.4 },
          { type: 'point', id: 'landing', position: geo.landing, text: `Range ~${round(geo.range, 2)} m`, color: '#ef4444', radius: 0.4 },
        ],
      },
    ],
  }
}

// ── Safety-net consistency checker (deterministic; option-(a) layer) ─────────

/**
 * Independently verify that the scene's trajectory really is the parabola the
 * parameters imply. Recomputes expected y from the CLOSED-FORM y(x) relation —
 * a different derivation than the parametric t-sampling used to build it — so a
 * scaling or implementation bug is caught, not just rubber-stamped.
 */
export function checkProjectileConsistency(spec: SceneSpec, params: ProjectileParams): ConsistencyResult {
  const errors: string[] = []
  const g = params.gravity ?? DEFAULT_GRAVITY
  const theta = (params.angleDegrees * Math.PI) / 180

  const path = spec.steps.flatMap((s) => s.objects).find((o) => o.id === 'path')
  const points = path?.points
  if (!points || points.length < 3) {
    return { ok: false, errors: ['no trajectory path with >= 3 points found'] }
  }

  const range = (params.speed ** 2 * Math.sin(2 * theta)) / g
  const maxHeight = params.speed ** 2 * Math.sin(theta) ** 2 / (2 * g)
  const scale = VISUAL_MAX / Math.max(range, maxHeight, 1e-9)
  // In scaled space the closed form becomes:
  //   y_s = x_s·tanθ − g·x_s² / (scale · 2 · v² · cos²θ)
  const k = g / (scale * 2 * params.speed ** 2 * Math.cos(theta) ** 2)
  const expectedY = (xs: number) => xs * Math.tan(theta) - k * xs * xs

  // Tolerance scales with the visual extent (sampling + rounding slack).
  const tol = VISUAL_MAX * 0.02

  // 1. endpoints: start at origin, end at (R, 0).
  const first = points[0]
  const last = points[points.length - 1]
  if (Math.hypot(first[0], first[1]) > tol) errors.push(`trajectory does not start at the launch origin (got [${first}])`)
  if (Math.abs(last[1]) > tol) errors.push(`trajectory does not return to the ground at the end (got y=${last[1]})`)
  if (Math.abs(last[0] - range * scale) > tol) errors.push(`landing x ${last[0]} != expected range ${round(range * scale)}`)

  // 2. x strictly increasing (horizontal velocity constant & positive).
  for (let i = 1; i < points.length; i++) {
    if (points[i][0] <= points[i - 1][0]) { errors.push('horizontal position is not strictly increasing'); break }
  }

  // 3. every interior point matches the closed-form parabola.
  for (const [x, y] of points) {
    if (Math.abs(y - expectedY(x)) > tol) {
      errors.push(`point (${x}, ${y}) deviates from the parabola y(x) (expected y≈${round(expectedY(x))})`)
      break
    }
  }

  // 4. single peak at x ≈ range/2.
  let peakIdx = 0
  for (let i = 1; i < points.length; i++) if (points[i][1] > points[peakIdx][1]) peakIdx = i
  if (Math.abs(points[peakIdx][0] - (range / 2) * scale) > tol * 2) {
    errors.push(`peak is not at the midpoint (peak x=${points[peakIdx][0]}, expected ~${round((range / 2) * scale)})`)
  }

  return { ok: errors.length === 0, errors }
}

// ── LLM parameter extraction (NEEDS A LIVE GROQ TEST — isolated) ──────────────
//
// This is the ONLY part that calls the model, and the ONLY part that needs a
// live network test. It asks the LLM purely to READ values out of the text — a
// comprehension task the probe showed it does well — never to compute geometry.

function buildExtractionPrompt(text: string): string {
  return `Read the explanation below and extract the projectile-motion launch parameters, if present.

Explanation:
"${text}"

Reply with ONLY this JSON, no other text:
{"isProjectile": true|false, "angleDegrees": <number 0-90>, "speed": <number, m/s>}
- isProjectile is false if the text is not describing a projectile/launch/throw with an angle and speed.
- If a value is not explicitly stated, make your best single numeric estimate from the text; do not invent a launch that isn't there.`
}

/**
 * Extract validated projectile parameters from text via the LLM, or null.
 * Returns null when the text isn't projectile motion, the call fails, or the
 * extracted values are physically implausible. Never throws.
 * NOTE: requires a live Groq-reachable network — verify with a real call later.
 */
export async function extractProjectileParams(text: string): Promise<ProjectileParams | null> {
  if (!text || !text.trim()) return null
  const raw = await generateJSON(buildExtractionPrompt(text), 150).catch(() => null)
  if (!raw || raw.isProjectile !== true) return null
  return validateProjectileParams(raw)
}

/**
 * Full pipeline: extract params (LLM) → build scene (deterministic formula) →
 * structural validation → physics consistency check. Returns null unless every
 * stage passes. NEEDS a live Groq test for the extraction stage.
 */
export async function generateProjectileScene(text: string): Promise<SceneSpec | null> {
  const params = await extractProjectileParams(text)
  if (!params) return null
  const spec = buildProjectileScene(params)
  if (!validateSceneSpec(spec).valid) return null
  if (!checkProjectileConsistency(spec, params).ok) return null
  return spec
}
