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
 *
 * THE PURE HALF LIVES IN `./circularMotion.pure` and is re-exported below, so every
 * importer of this module is unchanged. It was split out so the browser can
 * re-run the builder when a learner varies a parameter; this module reaches
 * the AI client and must stay server-side.
 */

import { generateJSON } from '@/lib/ai/client'


import { CircularParams, validateCircularParams } from './circularMotion.pure'

export * from './circularMotion.pure'

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
  const raw = await generateJSON(buildExtractionPrompt(text), 150).catch((err) => {
    // TEMP DEBUG (scene-extraction debug sprint — remove once diagnosed)
    console.error('[extractCircularParams DEBUG] generateJSON threw:', err)
    return null
  })
  console.error('[extractCircularParams DEBUG] raw from generateJSON:', JSON.stringify(raw))
  if (!raw || raw.isCircularMotion !== true) {
    console.error('[extractCircularParams DEBUG] -> null: raw falsy or isCircularMotion !== true (got', JSON.stringify(raw?.isCircularMotion), ')')
    return null
  }
  const validated = validateCircularParams(raw)
  if (!validated) console.error('[extractCircularParams DEBUG] -> null: validateCircularParams rejected raw:', JSON.stringify(raw))
  return validated
}
