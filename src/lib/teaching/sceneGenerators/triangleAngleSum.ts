/**
 * Part 2 (option C) — triangle angle-sum scene generator. SECOND scene type.
 *
 * Probe failure addressed: the free-form generator produced "a triangle whose
 * vertex positions don't match its claimed angles." Here the LLM only EXTRACTS
 * the two given angles; code places the vertices via the law of sines so the
 * interior angles match the stated angles BY CONSTRUCTION, and the third angle
 * is computed as 180 − A − B (the angle-sum property the scene teaches).
 *
 * NEW, separate code path — does not touch generateSceneSpec.ts. Pure-formula
 * parts are Groq-free and unit-tested; only extractTriangleParams() calls the
 * LLM and needs a live test later.
 */

import { generateJSON } from '@/lib/ai/client'
import { validateSceneSpec } from '../sceneSpecValidator'
import type { SceneSpec, Vec3 } from '../sceneSpec'

// ── Parameters (the ONLY thing the LLM extracts) ─────────────────────────────

export interface TriangleParams {
  /** First given interior angle (degrees), > 0. */
  angleA: number
  /** Second given interior angle (degrees), > 0. A + B must be < 180. */
  angleB: number
}

const VISUAL_MAX = 20
const round = (n: number, dp = 3): number => Math.round(n * 10 ** dp) / 10 ** dp

/** Validate/normalize extracted angles; null (reject) if they can't form a triangle. */
export function validateTriangleParams(raw: unknown): TriangleParams | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>
  const angleA = Number(o.angleA)
  const angleB = Number(o.angleB)
  if (!Number.isFinite(angleA) || !Number.isFinite(angleB)) return null
  if (angleA <= 0 || angleB <= 0) return null
  if (angleA + angleB >= 180) return null
  return { angleA, angleB }
}

// ── Deterministic geometry (law of sines; never LLM-generated) ───────────────

interface TriangleGeometry {
  angleC: number
  A: Vec3
  B: Vec3
  C: Vec3
}

/**
 * Place vertices so the interior angles equal the given angles.
 * A at origin, B on the x-axis (side AB = c, opposite angle C). Vertex C is
 * found from A along a ray at angle A, at distance AC = c·sinB/sinC (law of
 * sines). Uniformly scaled to fit the renderer bound.
 */
function computeGeometry(p: TriangleParams): TriangleGeometry {
  const angleC = 180 - p.angleA - p.angleB
  const a = (p.angleA * Math.PI) / 180
  const c = (angleC * Math.PI) / 180

  const baseC = 1 // side AB length before scaling
  const acLen = (baseC * Math.sin((p.angleB * Math.PI) / 180)) / Math.sin(c)

  const A: [number, number] = [0, 0]
  const B: [number, number] = [baseC, 0]
  const C: [number, number] = [acLen * Math.cos(a), acLen * Math.sin(a)]

  const maxExtent = Math.max(Math.abs(B[0]), Math.abs(C[0]), Math.abs(C[1]), 1e-9)
  const scale = VISUAL_MAX / maxExtent
  const sc = ([x, y]: [number, number]): Vec3 => [round(x * scale), round(y * scale), 0]

  return { angleC, A: sc(A), B: sc(B), C: sc(C) }
}

/** Build a triangle SceneSpec whose vertex positions match the stated angles. Pure. */
export function buildTriangleScene(params: TriangleParams): SceneSpec {
  const geo = computeGeometry(params)
  const midAB: Vec3 = [round((geo.A[0] + geo.B[0]) / 2), round((geo.A[1] + geo.B[1]) / 2 - 1.5), 0]

  return {
    id: `triangle-${params.angleA}-${params.angleB}`,
    title: `Triangle Angle Sum: ${params.angleA}° + ${params.angleB}° + ${round(geo.angleC, 1)}° = 180°`,
    sceneType: 'diagram',
    teachingGoal: 'Show that the three interior angles of a triangle always sum to 180°.',
    cameraDistance: VISUAL_MAX * 2.5,
    ariaLabel: `A triangle with interior angles ${params.angleA}, ${params.angleB} and ${round(geo.angleC, 1)} degrees, summing to 180.`,
    steps: [
      {
        narration: `Start with a triangle. Two of its angles are ${params.angleA}° at vertex A and ${params.angleB}° at vertex B.`,
        objects: [
          { type: 'node', id: 'A', position: geo.A, text: `A (${params.angleA}°)`, color: '#22c55e', radius: 0.4 },
          { type: 'node', id: 'B', position: geo.B, text: `B (${params.angleB}°)`, color: '#3b82f6', radius: 0.4 },
          { type: 'bond', id: 'AB', from: geo.A, to: geo.B, color: '#94a3b8' },
        ],
      },
      {
        narration: `The third vertex C closes the triangle. Its angle is whatever makes the shape close — and that is fixed by the first two.`,
        objects: [
          { type: 'node', id: 'C', position: geo.C, text: `C (${round(geo.angleC, 1)}°)`, color: '#f59e0b', radius: 0.4 },
          { type: 'bond', id: 'AC', from: geo.A, to: geo.C, color: '#94a3b8' },
          { type: 'bond', id: 'BC', from: geo.B, to: geo.C, color: '#94a3b8' },
        ],
      },
      {
        narration: `Adding them up: ${params.angleA}° + ${params.angleB}° + ${round(geo.angleC, 1)}° = 180°. The interior angles of any triangle always sum to 180°.`,
        objects: [
          { type: 'label', id: 'sum', position: midAB, text: `${params.angleA}° + ${params.angleB}° + ${round(geo.angleC, 1)}° = 180°`, color: '#ef4444' },
        ],
      },
    ],
  }
}

// ── Safety-net consistency checker (deterministic) ───────────────────────────

export interface ConsistencyResult {
  ok: boolean
  errors: string[]
}

/** Interior angle (degrees) at vertex `v` given its two neighbours, via dot product. */
function interiorAngle(v: Vec3, n1: Vec3, n2: Vec3): number {
  const u = [n1[0] - v[0], n1[1] - v[1]]
  const w = [n2[0] - v[0], n2[1] - v[1]]
  const dot = u[0] * w[0] + u[1] * w[1]
  const mag = Math.hypot(u[0], u[1]) * Math.hypot(w[0], w[1])
  if (mag === 0) return NaN
  return (Math.acos(Math.max(-1, Math.min(1, dot / mag))) * 180) / Math.PI
}

/**
 * Recompute the interior angles from the actual vertex coordinates (law of
 * cosines via dot product) and confirm they match the stated angles and sum to
 * 180° — exactly the property the probe's free-form output violated.
 */
export function checkTriangleConsistency(spec: SceneSpec, params: TriangleParams): ConsistencyResult {
  const errors: string[] = []
  const objs = spec.steps.flatMap((s) => s.objects)
  const A = objs.find((o) => o.id === 'A')?.position
  const B = objs.find((o) => o.id === 'B')?.position
  const C = objs.find((o) => o.id === 'C')?.position
  if (!A || !B || !C) return { ok: false, errors: ['missing one or more triangle vertices'] }

  const angC = 180 - params.angleA - params.angleB
  const measuredA = interiorAngle(A, B, C)
  const measuredB = interiorAngle(B, A, C)
  const measuredC = interiorAngle(C, A, B)
  const tol = 0.5 // degrees

  if (Math.abs(measuredA - params.angleA) > tol) errors.push(`vertex A angle ${round(measuredA, 2)}° != stated ${params.angleA}°`)
  if (Math.abs(measuredB - params.angleB) > tol) errors.push(`vertex B angle ${round(measuredB, 2)}° != stated ${params.angleB}°`)
  if (Math.abs(measuredC - angC) > tol) errors.push(`vertex C angle ${round(measuredC, 2)}° != computed ${round(angC, 2)}°`)
  if (Math.abs(measuredA + measuredB + measuredC - 180) > tol) {
    errors.push(`interior angles sum to ${round(measuredA + measuredB + measuredC, 2)}°, not 180°`)
  }

  return { ok: errors.length === 0, errors }
}

// ── LLM parameter extraction (NEEDS A LIVE GROQ TEST — isolated) ──────────────

function buildExtractionPrompt(text: string): string {
  return `Read the explanation below and extract two interior angles of the triangle being discussed, if present.

Explanation:
"${text}"

Reply with ONLY this JSON, no other text:
{"isTriangle": true|false, "angleA": <number, degrees>, "angleB": <number, degrees>}
- isTriangle is false if the text is not about a specific triangle's interior angles.
- Give the two angles that are actually stated; do not invent angles. angleA + angleB must be less than 180.`
}

/**
 * Extract validated triangle angles from text via the LLM, or null. Never throws.
 * NOTE: requires a live Groq-reachable network — verify with a real call later.
 */
export async function extractTriangleParams(text: string): Promise<TriangleParams | null> {
  if (!text || !text.trim()) return null
  const raw = await generateJSON(buildExtractionPrompt(text), 150).catch(() => null)
  if (!raw || raw.isTriangle !== true) return null
  return validateTriangleParams(raw)
}

/**
 * Full pipeline: extract (LLM) → build (deterministic) → structural validation →
 * angle consistency check. Returns null unless every stage passes. Extraction
 * stage NEEDS a live Groq test.
 */
export async function generateTriangleScene(text: string): Promise<SceneSpec | null> {
  const params = await extractTriangleParams(text)
  if (!params) return null
  const spec = buildTriangleScene(params)
  if (!validateSceneSpec(spec).valid) return null
  if (!checkTriangleConsistency(spec, params).ok) return null
  return spec
}
