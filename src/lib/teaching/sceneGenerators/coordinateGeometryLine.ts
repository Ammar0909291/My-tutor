/**
 * Coordinate-geometry straight-line scene generator (18th parametric
 * generator), closing the "Math: coordinate geometry (straight lines)" gap
 * noted in docs/VISUAL_COVERAGE_GAP_ANALYSIS.md. Plots two given points,
 * the line segment joining them, and the three quantities the CBSE
 * "Coordinate Geometry" chapter builds around: the distance between them
 * (distance formula), their midpoint (section formula at the midpoint), and
 * the slope of the line. Same architecture as the other generators:
 * extractCoordinateGeometryParams (LLM, isolated) →
 * validateCoordinateGeometryParams (pure) → buildCoordinateGeometryLineScene
 * (pure, deterministic layout) → checkCoordinateGeometryConsistency (pure,
 * independent re-derivation safety net).
 */

import { generateJSON } from '@/lib/ai/client'
import type { SceneSpec, Vec3 } from '../sceneSpec'
import { round, strictNumber, type ConsistencyResult } from './shared'

// ── Parameters (the ONLY thing the LLM extracts) ─────────────────────────────

export interface CoordinateGeometryParams {
  x1: number
  y1: number
  x2: number
  y2: number
}

const COORD_BOUND = 1000
const VISUAL_MAX = 14

export function validateCoordinateGeometryParams(raw: unknown): CoordinateGeometryParams | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>

  const x1 = strictNumber(o.x1)
  const y1 = strictNumber(o.y1)
  const x2 = strictNumber(o.x2)
  const y2 = strictNumber(o.y2)

  for (const v of [x1, y1, x2, y2]) {
    if (!Number.isFinite(v) || Math.abs(v) > COORD_BOUND) return null
  }
  if (x1 === x2 && y1 === y2) return null // distinct points required

  return { x1, y1, x2, y2 }
}

// ── Deterministic geometry (distance/section/slope formulas; never LLM-generated) ─

interface LineGeometry {
  distance: number
  midpoint: { x: number; y: number }
  slope: number | null // null = vertical line (undefined slope)
  scale: number
  P: Vec3
  Q: Vec3
  M: Vec3
}

function computeGeometry(p: CoordinateGeometryParams): LineGeometry {
  const dx = p.x2 - p.x1
  const dy = p.y2 - p.y1
  const distance = Math.sqrt(dx * dx + dy * dy)
  const midpoint = { x: (p.x1 + p.x2) / 2, y: (p.y1 + p.y2) / 2 }
  const slope = dx === 0 ? null : dy / dx

  const maxExtent = Math.max(Math.abs(p.x1), Math.abs(p.y1), Math.abs(p.x2), Math.abs(p.y2), 1e-9)
  const scale = VISUAL_MAX / maxExtent
  const sc = (x: number, y: number): Vec3 => [round(x * scale), round(y * scale), 0]

  return { distance, midpoint, slope, scale, P: sc(p.x1, p.y1), Q: sc(p.x2, p.y2), M: sc(midpoint.x, midpoint.y) }
}

/** Build a 3-step coordinate-geometry SceneSpec: the two points, the line + midpoint, then the distance/slope labels. */
export function buildCoordinateGeometryLineScene(params: CoordinateGeometryParams): SceneSpec {
  const geo = computeGeometry(params)
  const slopeText = geo.slope === null ? 'undefined (the line is vertical)' : round(geo.slope, 3).toString()
  const labelPos: Vec3 = [geo.M[0], geo.M[1] + 2, 0]

  return {
    id: `coord-geo-${params.x1}-${params.y1}-${params.x2}-${params.y2}`,
    title: `Coordinate Geometry: P(${params.x1}, ${params.y1}) and Q(${params.x2}, ${params.y2})`,
    sceneType: 'diagram',
    teachingGoal: 'Show how the distance, midpoint, and slope of the line joining two points are computed from their coordinates.',
    cameraDistance: VISUAL_MAX * 2.5,
    ariaLabel: `Two points P at (${params.x1}, ${params.y1}) and Q at (${params.x2}, ${params.y2}), joined by a line segment, with their midpoint marked.`,
    steps: [
      {
        narration: `Plot the two points: P(${params.x1}, ${params.y1}) and Q(${params.x2}, ${params.y2}).`,
        objects: [
          { type: 'node', id: 'P', position: geo.P, text: `P(${params.x1}, ${params.y1})`, color: '#3b82f6', radius: 0.4 },
          { type: 'node', id: 'Q', position: geo.Q, text: `Q(${params.x2}, ${params.y2})`, color: '#22c55e', radius: 0.4 },
        ],
      },
      {
        narration: `The line segment PQ has midpoint M = ((${params.x1}+${params.x2})/2, (${params.y1}+${params.y2})/2) = (${round(geo.midpoint.x, 2)}, ${round(geo.midpoint.y, 2)}).`,
        objects: [
          { type: 'bond', id: 'PQ', from: geo.P, to: geo.Q, color: '#94a3b8' },
          { type: 'node', id: 'M', position: geo.M, text: `M(${round(geo.midpoint.x, 2)}, ${round(geo.midpoint.y, 2)})`, color: '#f59e0b', radius: 0.3 },
        ],
      },
      {
        narration: `By the distance formula, PQ = ${round(geo.distance, 2)} units. The slope of PQ is ${slopeText}.`,
        objects: [
          { type: 'label', id: 'formula', position: labelPos, text: `PQ = ${round(geo.distance, 2)}, slope = ${slopeText}`, color: '#ef4444' },
        ],
      },
    ],
  }
}

// ── Safety-net consistency checker (deterministic, independent re-derivation) ─

export function checkCoordinateGeometryConsistency(spec: SceneSpec, params: CoordinateGeometryParams): ConsistencyResult {
  const errors: string[] = []
  const objs = spec.steps.flatMap((s) => s.objects)

  const P = objs.find((o) => o.id === 'P')?.position
  const Q = objs.find((o) => o.id === 'Q')?.position
  const M = objs.find((o) => o.id === 'M')?.position
  if (!P || !Q || !M) return { ok: false, errors: ['missing one or more of P/Q/M'] }

  const geo = computeGeometry(params)
  const tol = VISUAL_MAX * 0.02

  if (Math.abs(P[0] - geo.P[0]) > tol || Math.abs(P[1] - geo.P[1]) > tol) errors.push(`P (${P[0]}, ${P[1]}) does not match re-derived (${geo.P[0]}, ${geo.P[1]})`)
  if (Math.abs(Q[0] - geo.Q[0]) > tol || Math.abs(Q[1] - geo.Q[1]) > tol) errors.push(`Q (${Q[0]}, ${Q[1]}) does not match re-derived (${geo.Q[0]}, ${geo.Q[1]})`)
  if (Math.abs(M[0] - geo.M[0]) > tol || Math.abs(M[1] - geo.M[1]) > tol) errors.push(`M (${M[0]}, ${M[1]}) does not match re-derived (${geo.M[0]}, ${geo.M[1]})`)

  // M must actually be the midpoint of the plotted P and Q (not just a stored claim).
  const measuredMidX = (P[0] + Q[0]) / 2
  const measuredMidY = (P[1] + Q[1]) / 2
  if (Math.abs(M[0] - measuredMidX) > tol || Math.abs(M[1] - measuredMidY) > tol) {
    errors.push(`M (${M[0]}, ${M[1]}) is not the midpoint of plotted P and Q (${round(measuredMidX, 3)}, ${round(measuredMidY, 3)})`)
  }

  return { ok: errors.length === 0, errors }
}

// ── LLM parameter extraction (NEEDS A LIVE GROQ TEST — isolated) ──────────────

function buildExtractionPrompt(text: string): string {
  return `Read the explanation below and extract the two coordinate-geometry points being discussed, if present.

Explanation:
"${text}"

Reply with ONLY this JSON, no other text:
{"isCoordinateGeometry": true|false, "x1": <number>, "y1": <number>, "x2": <number>, "y2": <number>}
- isCoordinateGeometry is false if the text is not about the distance, midpoint, or slope between two specific Cartesian points.
- Use the two points actually stated in the text; do not invent coordinates. The two points must be distinct.`
}

/**
 * Extract validated coordinate-geometry parameters from text via the LLM, or null. Never throws.
 * NOTE: requires a live Groq-reachable network — verify with a real call later.
 */
export async function extractCoordinateGeometryParams(text: string): Promise<CoordinateGeometryParams | null> {
  if (!text || !text.trim()) return null
  const raw = await generateJSON(buildExtractionPrompt(text), 200).catch(() => null)
  if (!raw || raw.isCoordinateGeometry !== true) return null
  return validateCoordinateGeometryParams(raw)
}
