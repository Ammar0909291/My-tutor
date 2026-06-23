/**
 * Part 2 (option C) — uniform circular motion scene generator. FIFTH scene type.
 *
 * LLM extracts only the radius and speed; code computes the circular path, the
 * tangential velocity (perpendicular to the radius) and the centripetal
 * acceleration (toward the centre, magnitude v²/r) — correct by construction.
 *
 * Independent geometric checker: every path point lies at distance r from the
 * centre; the velocity is perpendicular to the radius (dot product ≈ 0); the
 * acceleration points exactly at the centre; and a_c = v²/r is re-derived.
 *
 * NEW, separate code path — does not touch generateSceneSpec.ts. Pure-formula
 * parts are Groq-free and unit-tested; only extractCircularParams() calls the LLM.
 *
 * Note on units: distance (the circle) and the velocity/acceleration arrows have
 * different units, so the arrows use fixed VISUAL lengths for direction only —
 * their true magnitudes are shown as labels (standard physics-diagram practice).
 * The checker therefore validates DIRECTIONS geometrically and MAGNITUDES via the
 * a_c = v²/r label, never arrow length.
 */

import { generateJSON } from '@/lib/ai/client'
import { validateSceneSpec } from '../sceneSpecValidator'
import type { SceneSpec, Vec3 } from '../sceneSpec'
import { round, type ConsistencyResult } from './shared'

// ── Parameters (the ONLY thing the LLM extracts) ─────────────────────────────

export interface CircularParams {
  /** Circle radius (m), > 0. */
  radius: number
  /** Constant speed (m/s), > 0. */
  speed: number
}

const VISUAL_MAX = 16
const ARROW = VISUAL_MAX * 0.4
/** Validate/normalize extracted parameters; null (reject) if implausible. */
export function validateCircularParams(raw: unknown): CircularParams | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>
  const radius = Number(o.radius)
  const speed = Number(o.speed)
  if (!Number.isFinite(radius) || !Number.isFinite(speed)) return null
  if (radius <= 0 || radius > 1000 || speed <= 0 || speed > 1000) return null
  return { radius, speed }
}

// ── Deterministic geometry ───────────────────────────────────────────────────

const CIRCLE_SAMPLES = 32
/** Particle sits at θ0 = 0 (the +x point) for a clear, readable tangent/centripetal pair. */
const THETA0 = 0

interface CircularGeometry {
  scale: number
  centripetal: number    // a_c = v²/r (physical)
  circle: Vec3[]
  particle: Vec3
  velFrom: Vec3
  velTo: Vec3
  accFrom: Vec3
  accTo: Vec3
}

function computeGeometry(p: CircularParams): CircularGeometry {
  const scale = VISUAL_MAX / p.radius
  const R = p.radius * scale

  const circle: Vec3[] = []
  for (let i = 0; i < CIRCLE_SAMPLES; i++) {
    const a = (2 * Math.PI * i) / CIRCLE_SAMPLES
    circle.push([round(R * Math.cos(a)), round(R * Math.sin(a)), 0])
  }
  // close the loop for a clean ring
  circle.push(circle[0])

  const particle: Vec3 = [round(R * Math.cos(THETA0)), round(R * Math.sin(THETA0)), 0]
  // Tangent (CCW motion): perpendicular to radius → (−sinθ, cosθ).
  const tang = [-Math.sin(THETA0), Math.cos(THETA0)]
  // Centripetal: toward centre → −radial unit = (−cosθ, −sinθ).
  const rad = [-Math.cos(THETA0), -Math.sin(THETA0)]

  return {
    scale,
    centripetal: p.speed ** 2 / p.radius,
    circle,
    particle,
    velFrom: particle,
    velTo: [round(particle[0] + tang[0] * ARROW), round(particle[1] + tang[1] * ARROW), 0],
    accFrom: particle,
    accTo: [round(particle[0] + rad[0] * ARROW), round(particle[1] + rad[1] * ARROW), 0],
  }
}

/** Build a uniform-circular-motion SceneSpec. Pure, deterministic. */
export function buildCircularScene(params: CircularParams): SceneSpec {
  const geo = computeGeometry(params)
  return {
    id: `circular-r${params.radius}-v${params.speed}`,
    title: `Uniform Circular Motion: a_c = v²/r ≈ ${round(geo.centripetal, 2)} m/s²`,
    sceneType: 'simulation',
    teachingGoal: 'Show that in uniform circular motion the velocity is tangential while the acceleration points to the centre (centripetal, v²/r).',
    cameraDistance: VISUAL_MAX * 2.6,
    ariaLabel: `A particle moving on a circle of radius ${params.radius} at speed ${params.speed}, with a tangential velocity and a centripetal acceleration of about ${round(geo.centripetal, 2)} meters per second squared toward the centre.`,
    steps: [
      {
        narration: `A particle moves at a constant speed of ${params.speed} m/s around a circle of radius ${params.radius} m.`,
        objects: [
          { type: 'point', id: 'center', position: [0, 0, 0], text: 'centre', color: '#94a3b8', radius: 0.3 },
          { type: 'path', id: 'circle', points: geo.circle, color: '#64748b' },
          { type: 'node', id: 'particle', position: geo.particle, text: 'particle', color: '#3b82f6', radius: 0.5 },
        ],
      },
      {
        narration: `Its velocity is tangential — perpendicular to the radius — and constant in magnitude (${params.speed} m/s).`,
        objects: [
          { type: 'vector', id: 'velocity', from: geo.velFrom, to: geo.velTo, color: '#22c55e', text: `v = ${params.speed} m/s` },
        ],
      },
      {
        narration: `But the direction keeps changing, so there is an acceleration pointing to the centre — the centripetal acceleration, a_c = v²/r ≈ ${round(geo.centripetal, 2)} m/s².`,
        objects: [
          { type: 'vector', id: 'acceleration', from: geo.accFrom, to: geo.accTo, color: '#ef4444', text: `a_c = ${round(geo.centripetal, 2)} m/s²`, properties: { magnitude: round(geo.centripetal, 6) } },
        ],
      },
    ],
  }
}

// ── Safety-net consistency checker (independent geometric derivation) ────────

export function checkCircularConsistency(spec: SceneSpec, params: CircularParams): ConsistencyResult {
  const errors: string[] = []
  const objs = spec.steps.flatMap((s) => s.objects)
  const center = objs.find((o) => o.id === 'center')?.position
  const circle = objs.find((o) => o.id === 'circle')?.points
  const particle = objs.find((o) => o.id === 'particle')?.position
  const vel = objs.find((o) => o.id === 'velocity')
  const acc = objs.find((o) => o.id === 'acceleration')
  if (!center || !circle || !particle || !vel?.from || !vel?.to || !acc?.from || !acc?.to) {
    return { ok: false, errors: ['missing centre, circle, particle, velocity or acceleration'] }
  }

  const scale = VISUAL_MAX / params.radius
  const R = params.radius * scale
  const tol = VISUAL_MAX * 0.02

  // 1. every circle point lies at distance R from the centre.
  for (const [x, y] of circle) {
    if (Math.abs(Math.hypot(x - center[0], y - center[1]) - R) > tol) {
      errors.push(`a circle point is not at radius R (got ${round(Math.hypot(x, y), 3)}, expected ${round(R, 3)})`)
      break
    }
  }

  // 2. the particle is on the circle.
  if (Math.abs(Math.hypot(particle[0], particle[1]) - R) > tol) errors.push('particle is not on the circle')

  // 3. velocity ⊥ radius (dot product of velocity direction with radial ≈ 0).
  const radial = [particle[0] - center[0], particle[1] - center[1]]
  const vDir = [vel.to[0] - vel.from[0], vel.to[1] - vel.from[1]]
  const dot = radial[0] * vDir[0] + radial[1] * vDir[1]
  const perpErr = Math.abs(dot) / (Math.hypot(...radial as [number, number]) * Math.hypot(...vDir as [number, number]) || 1)
  if (perpErr > 0.02) errors.push(`velocity is not perpendicular to the radius (cosθ=${round(perpErr, 4)})`)

  // 4. acceleration points to the centre (antiparallel to the radial direction).
  const aDir = [acc.to[0] - acc.from[0], acc.to[1] - acc.from[1]]
  const aDotR = radial[0] * aDir[0] + radial[1] * aDir[1]
  const aCos = aDotR / (Math.hypot(...radial as [number, number]) * Math.hypot(...aDir as [number, number]) || 1)
  if (aCos > -0.98) errors.push(`acceleration does not point to the centre (cosθ=${round(aCos, 4)}, expected ≈ −1)`)

  // 5. a_c = v²/r re-derived independently from the label magnitude.
  const expected = params.speed ** 2 / params.radius
  const labelled = Number((acc.properties as Record<string, unknown> | undefined)?.magnitude)
  if (!Number.isFinite(labelled) || Math.abs(labelled - expected) > 0.01 * Math.max(1, expected)) {
    errors.push(`centripetal magnitude ${labelled} != v²/r ${round(expected, 4)}`)
  }

  return { ok: errors.length === 0, errors }
}

// ── LLM parameter extraction (NEEDS A LIVE GROQ TEST — isolated) ──────────────

function buildExtractionPrompt(text: string): string {
  return `Read the explanation below and extract the circular-motion parameters, if present.

Explanation:
"${text}"

Reply with ONLY this JSON, no other text:
{"isCircularMotion": true|false, "radius": <number, metres>, "speed": <number, m/s>}
- isCircularMotion is false if the text is not about an object moving in a circle at constant speed.
- Use the radius and speed actually stated; do not invent values.`
}

/**
 * Extract validated circular-motion parameters from text via the LLM, or null.
 * NOTE: requires a live Groq-reachable network — verify with a real call later.
 */
export async function extractCircularParams(text: string): Promise<CircularParams | null> {
  if (!text || !text.trim()) return null
  const raw = await generateJSON(buildExtractionPrompt(text), 150).catch(() => null)
  if (!raw || raw.isCircularMotion !== true) return null
  return validateCircularParams(raw)
}

/**
 * Full pipeline: extract (LLM) → build (formula) → structural validation →
 * independent consistency check. Returns null unless every stage passes.
 * Extraction stage NEEDS a live Groq test.
 */
export async function generateCircularScene(text: string): Promise<SceneSpec | null> {
  const params = await extractCircularParams(text)
  if (!params) return null
  const spec = buildCircularScene(params)
  if (!validateSceneSpec(spec).valid) return null
  if (!checkCircularConsistency(spec, params).ok) return null
  return spec
}
