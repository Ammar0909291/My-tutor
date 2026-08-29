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
 *
 * THE PURE HALF LIVES IN `./coordinateGeometryLine.pure` and is re-exported below, so every
 * importer of this module is unchanged. It was split out so the browser can
 * re-run the builder when a learner varies a parameter; this module reaches
 * the AI client and must stay server-side.
 */

import { generateJSON } from '@/lib/ai/client'


import { CoordinateGeometryParams, validateCoordinateGeometryParams } from './coordinateGeometryLine.pure'

export * from './coordinateGeometryLine.pure'

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
