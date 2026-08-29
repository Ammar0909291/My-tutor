/**
 * Trigonometry — heights & distances scene generator (16th parametric
 * generator), closing the "Math: trigonometry (heights & distances)" gap
 * noted in docs/VISUAL_COVERAGE_GAP_ANALYSIS.md. Extends the right-triangle
 * pattern from triangleAngleSum.ts to the classic angle-of-elevation problem:
 * an observer at ground level sights the top of a vertical object at a known
 * horizontal distance; height = distance * tan(angle of elevation). Same
 * architecture as the other generators:
 * extractHeightsAndDistancesParams (LLM, isolated) →
 * validateHeightsAndDistancesParams (pure) →
 * buildHeightsAndDistancesScene (pure, deterministic right-triangle layout) →
 * checkHeightsAndDistancesConsistency (pure, independent re-derivation
 * safety net).
 *
 * THE PURE HALF LIVES IN `./heightsAndDistances.pure` and is re-exported below, so every
 * importer of this module is unchanged. It was split out so the browser can
 * re-run the builder when a learner varies a parameter; this module reaches
 * the AI client and must stay server-side.
 */

import { generateJSON } from '@/lib/ai/client'


import { HeightsAndDistancesParams, validateHeightsAndDistancesParams } from './heightsAndDistances.pure'

export * from './heightsAndDistances.pure'

// ── LLM parameter extraction (NEEDS A LIVE GROQ TEST — isolated) ──────────────

function buildExtractionPrompt(text: string): string {
  return `Read the explanation below and extract the angle-of-elevation heights-and-distances scenario being discussed, if present.

Explanation:
"${text}"

Reply with ONLY this JSON, no other text:
{"isHeightsAndDistances": true|false, "distance": <number>, "angleOfElevation": <number>}
- isHeightsAndDistances is false if the text is not about finding a height or distance using an angle of elevation/depression and a right triangle.
- distance (meters, the known horizontal distance from the observer to the foot of the object), angleOfElevation (degrees, strictly between 0 and 90).
- Do not invent values not stated in the text.`
}

/**
 * Extract validated heights-and-distances parameters from text via the LLM, or null. Never throws.
 * NOTE: requires a live Groq-reachable network — verify with a real call later.
 */
export async function extractHeightsAndDistancesParams(text: string): Promise<HeightsAndDistancesParams | null> {
  if (!text || !text.trim()) return null
  const raw = await generateJSON(buildExtractionPrompt(text), 200).catch(() => null)
  if (!raw || raw.isHeightsAndDistances !== true) return null
  return validateHeightsAndDistancesParams(raw)
}
