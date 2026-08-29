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
 *
 * THE PURE HALF LIVES IN `./triangleAngleSum.pure` and is re-exported below, so every
 * importer of this module is unchanged. It was split out so the browser can
 * re-run the builder when a learner varies a parameter; this module reaches
 * the AI client and must stay server-side.
 */

import { generateJSON } from '@/lib/ai/client'

import { TriangleParams, validateTriangleParams } from './triangleAngleSum.pure'

export * from './triangleAngleSum.pure'

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
  const raw = await generateJSON(buildExtractionPrompt(text), 150).catch((err) => {
    // TEMP DEBUG (scene-extraction debug sprint — remove once diagnosed)
    console.error('[extractTriangleParams DEBUG] generateJSON threw:', err)
    return null
  })
  console.error('[extractTriangleParams DEBUG] raw from generateJSON:', JSON.stringify(raw))
  if (!raw || raw.isTriangle !== true) {
    console.error('[extractTriangleParams DEBUG] -> null: raw falsy or isTriangle !== true (got', JSON.stringify(raw?.isTriangle), ')')
    return null
  }
  const validated = validateTriangleParams(raw)
  if (!validated) console.error('[extractTriangleParams DEBUG] -> null: validateTriangleParams rejected raw:', JSON.stringify(raw))
  return validated
}
