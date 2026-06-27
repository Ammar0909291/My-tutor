/**
 * Gravitation / orbital motion scene generator (21st parametric generator),
 * closing the "Gravitation (orbits, escape velocity)" gap noted in
 * docs/VISUAL_COVERAGE_GAP_ANALYSIS.md. Extends the uniform-circular-motion
 * pattern (circularMotion.ts) to a satellite in circular orbit around a
 * central mass: the LLM extracts only the central mass and orbit radius;
 * code derives orbital speed (v = sqrt(GM/r)), orbital period
 * (T = 2πr/v), and escape velocity (v_esc = sqrt(2GM/r) = v·√2) — correct
 * by construction. Same architecture as the other generators:
 * extractGravitationParams (LLM, isolated) → validateGravitationParams
 * (pure) → buildGravitationOrbitScene (pure, deterministic layout) →
 * checkGravitationConsistency (pure, independent re-derivation safety net).
 */

import { generateJSON } from '@/lib/ai/client'
import type { SceneSpec, Vec3 } from '../sceneSpec'
import { round, strictNumber, type ConsistencyResult } from './shared'

// ── Parameters (the ONLY thing the LLM extracts) ─────────────────────────────

export interface GravitationParams {
  /** Mass of the central body (kg), e.g. ~5.97e24 for Earth. */
  centralMass: number
  /** Orbit radius from the centre of the central body (m), > 0. */
  orbitRadius: number
}

const G = 6.674e-11
const MASS_MIN = 1e15
const MASS_MAX = 1e32
const RADIUS_MIN = 1e3
const RADIUS_MAX = 1e13
const VISUAL_MAX = 16
const ARROW = VISUAL_MAX * 0.4

export function validateGravitationParams(raw: unknown): GravitationParams | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>

  const centralMass = strictNumber(o.centralMass)
  const orbitRadius = strictNumber(o.orbitRadius)

  if (!Number.isFinite(centralMass) || centralMass < MASS_MIN || centralMass > MASS_MAX) return null
  if (!Number.isFinite(orbitRadius) || orbitRadius < RADIUS_MIN || orbitRadius > RADIUS_MAX) return null

  return { centralMass, orbitRadius }
}

// ── Deterministic geometry (orbital mechanics; never LLM-generated) ──────────

const CIRCLE_SAMPLES = 32
const THETA0 = 0

interface OrbitGeometry {
  orbitalSpeed: number
  orbitalPeriod: number
  escapeVelocity: number
  scale: number
  circle: Vec3[]
  satellite: Vec3
  velFrom: Vec3
  velTo: Vec3
}

function computeGeometry(p: GravitationParams): OrbitGeometry {
  const orbitalSpeed = Math.sqrt((G * p.centralMass) / p.orbitRadius)
  const orbitalPeriod = (2 * Math.PI * p.orbitRadius) / orbitalSpeed
  const escapeVelocity = orbitalSpeed * Math.sqrt(2)

  const scale = VISUAL_MAX / p.orbitRadius
  const R = p.orbitRadius * scale

  const circle: Vec3[] = []
  for (let i = 0; i < CIRCLE_SAMPLES; i++) {
    const a = (2 * Math.PI * i) / CIRCLE_SAMPLES
    circle.push([round(R * Math.cos(a)), round(R * Math.sin(a)), 0])
  }
  circle.push(circle[0])

  const satellite: Vec3 = [round(R * Math.cos(THETA0)), round(R * Math.sin(THETA0)), 0]
  const tang = [-Math.sin(THETA0), Math.cos(THETA0)]

  return {
    orbitalSpeed,
    orbitalPeriod,
    escapeVelocity,
    scale,
    circle,
    satellite,
    velFrom: satellite,
    velTo: [round(satellite[0] + tang[0] * ARROW), round(satellite[1] + tang[1] * ARROW), 0],
  }
}

/** Build a 3-step gravitation-orbit SceneSpec: central body + orbit, then orbital velocity, then period/escape-velocity label. */
export function buildGravitationOrbitScene(params: GravitationParams): SceneSpec {
  const geo = computeGeometry(params)
  const labelPos: Vec3 = [0, round(-VISUAL_MAX * 0.7), 0]

  return {
    id: `gravitation-${params.centralMass}-${params.orbitRadius}`,
    title: `Orbital Motion: v ≈ ${round(geo.orbitalSpeed, 1)} m/s, T ≈ ${round(geo.orbitalPeriod, 1)} s`,
    sceneType: 'simulation',
    teachingGoal: 'Show how a satellite\'s orbital speed and period follow from the central mass and orbit radius via v = √(GM/r), and how this relates to escape velocity.',
    cameraDistance: VISUAL_MAX * 2.6,
    ariaLabel: `A satellite in circular orbit of radius ${params.orbitRadius} meters around a central body of mass ${params.centralMass} kilograms, with orbital speed ${round(geo.orbitalSpeed, 1)} meters per second.`,
    steps: [
      {
        narration: `A satellite orbits a central body of mass ${params.centralMass} kg at a radius of ${params.orbitRadius} m.`,
        objects: [
          { type: 'node', id: 'centralBody', position: [0, 0, 0], text: 'M', color: '#f59e0b', radius: 0.6 },
          { type: 'path', id: 'orbit', points: geo.circle, color: '#64748b' },
          { type: 'node', id: 'satellite', position: geo.satellite, text: 'satellite', color: '#3b82f6', radius: 0.4 },
        ],
      },
      {
        narration: `Gravity supplies the centripetal force, so v = √(GM/r) = ${round(geo.orbitalSpeed, 1)} m/s, tangential to the orbit.`,
        objects: [
          { type: 'vector', id: 'velocity', from: geo.velFrom, to: geo.velTo, color: '#22c55e', text: `v = ${round(geo.orbitalSpeed, 1)} m/s`, properties: { magnitude: round(geo.orbitalSpeed, 6) } },
        ],
      },
      {
        narration: `The orbital period is T = 2πr/v ≈ ${round(geo.orbitalPeriod, 1)} s. To leave orbit entirely, the satellite would need the escape velocity, v_esc = v√2 ≈ ${round(geo.escapeVelocity, 1)} m/s.`,
        objects: [
          { type: 'label', id: 'orbitLabel', position: labelPos, text: `T = ${round(geo.orbitalPeriod, 1)} s, v_esc = ${round(geo.escapeVelocity, 1)} m/s`, color: '#ef4444', properties: { period: round(geo.orbitalPeriod, 6), escapeVelocity: round(geo.escapeVelocity, 6) } },
        ],
      },
    ],
  }
}

// ── Safety-net consistency checker (deterministic, independent re-derivation) ─

export function checkGravitationConsistency(spec: SceneSpec, params: GravitationParams): ConsistencyResult {
  const errors: string[] = []
  const objs = spec.steps.flatMap((s) => s.objects)

  const centralBody = objs.find((o) => o.id === 'centralBody')?.position
  const orbit = objs.find((o) => o.id === 'orbit')?.points
  const satellite = objs.find((o) => o.id === 'satellite')?.position
  const velocity = objs.find((o) => o.id === 'velocity')
  const orbitLabel = objs.find((o) => o.id === 'orbitLabel')
  if (!centralBody || !orbit || !satellite || !velocity?.from || !velocity?.to || !orbitLabel) {
    return { ok: false, errors: ['missing one or more of centralBody/orbit/satellite/velocity/orbitLabel'] }
  }

  const scale = VISUAL_MAX / params.orbitRadius
  const R = params.orbitRadius * scale
  const tol = VISUAL_MAX * 0.02

  for (const [x, y] of orbit) {
    if (Math.abs(Math.hypot(x - centralBody[0], y - centralBody[1]) - R) > tol) {
      errors.push(`an orbit point is not at radius R (got ${round(Math.hypot(x, y), 3)}, expected ${round(R, 3)})`)
      break
    }
  }
  if (Math.abs(Math.hypot(satellite[0], satellite[1]) - R) > tol) errors.push('satellite is not on the orbit')

  const radial = [satellite[0] - centralBody[0], satellite[1] - centralBody[1]]
  const vDir = [velocity.to[0] - velocity.from[0], velocity.to[1] - velocity.from[1]]
  const dot = radial[0] * vDir[0] + radial[1] * vDir[1]
  const perpErr = Math.abs(dot) / (Math.hypot(...(radial as [number, number])) * Math.hypot(...(vDir as [number, number])) || 1)
  if (perpErr > 0.02) errors.push(`orbital velocity is not perpendicular to the radius (cosθ=${round(perpErr, 4)})`)

  const expectedSpeed = Math.sqrt((G * params.centralMass) / params.orbitRadius)
  const expectedPeriod = (2 * Math.PI * params.orbitRadius) / expectedSpeed
  const expectedEscape = expectedSpeed * Math.sqrt(2)

  const labelledSpeed = Number((velocity.properties as Record<string, unknown> | undefined)?.magnitude)
  if (!Number.isFinite(labelledSpeed) || Math.abs(labelledSpeed - expectedSpeed) > 0.01 * Math.max(1, expectedSpeed)) {
    errors.push(`orbital speed ${labelledSpeed} != re-derived v=√(GM/r) ${round(expectedSpeed, 4)}`)
  }

  const orbitProps = orbitLabel.properties as Record<string, unknown> | undefined
  const labelledPeriod = Number(orbitProps?.period)
  const labelledEscape = Number(orbitProps?.escapeVelocity)
  if (!Number.isFinite(labelledPeriod) || Math.abs(labelledPeriod - expectedPeriod) > 0.01 * Math.max(1, expectedPeriod)) {
    errors.push(`orbital period ${labelledPeriod} != re-derived T=2πr/v ${round(expectedPeriod, 4)}`)
  }
  if (!Number.isFinite(labelledEscape) || Math.abs(labelledEscape - expectedEscape) > 0.01 * Math.max(1, expectedEscape)) {
    errors.push(`escape velocity ${labelledEscape} != re-derived v√2 ${round(expectedEscape, 4)}`)
  }

  return { ok: errors.length === 0, errors }
}

// ── LLM parameter extraction (NEEDS A LIVE GROQ TEST — isolated) ──────────────

function buildExtractionPrompt(text: string): string {
  return `Read the explanation below and extract the orbital-motion / gravitation scenario being discussed, if present.

Explanation:
"${text}"

Reply with ONLY this JSON, no other text:
{"isGravitationOrbit": true|false, "centralMass": <number, kg>, "orbitRadius": <number, meters>}
- isGravitationOrbit is false if the text is not about a satellite/planet/moon orbiting a central body under gravity.
- centralMass is the mass of the body being orbited (e.g. Earth ≈ 5.97e24 kg), orbitRadius is the orbit's radius from the centre of that body.
- Use the values actually stated in the text; do not invent numbers (use well-known constants like Earth's mass only if the text names Earth and gives no other value).`
}

/**
 * Extract validated gravitation-orbit parameters from text via the LLM, or null. Never throws.
 * NOTE: requires a live Groq-reachable network — verify with a real call later.
 */
export async function extractGravitationParams(text: string): Promise<GravitationParams | null> {
  if (!text || !text.trim()) return null
  const raw = await generateJSON(buildExtractionPrompt(text), 200).catch(() => null)
  if (!raw || raw.isGravitationOrbit !== true) return null
  return validateGravitationParams(raw)
}
