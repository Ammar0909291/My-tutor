/**
 * Part 2 (option C) — vector addition scene generator. FOURTH scene type.
 *
 * Same pattern as the first three: the LLM only EXTRACTS the two vectors'
 * magnitudes and directions; the resultant and all coordinates are computed in
 * code (R = A + B, parallelogram law), correct by construction.
 *
 * Independent-derivation checker: the scene is BUILT by component addition; the
 * checker re-verifies the resultant's magnitude via the LAW OF COSINES
 * (|R|² = a² + b² + 2ab·cos(β−α)) — a different formula — and confirms tip-to-tail
 * closure. Two separate derivations agreeing is the safety net.
 *
 * NEW, separate code path — does not touch generateSceneSpec.ts. Pure-formula
 * parts are Groq-free and unit-tested; only extractVectorParams() calls the LLM.
 *
 * THE PURE HALF LIVES IN `./vectorAddition.pure` and is re-exported below, so every
 * importer of this module is unchanged. It was split out so the browser can
 * re-run the builder when a learner varies a parameter; this module reaches
 * the AI client and must stay server-side.
 */

import { generateJSON } from '@/lib/ai/client'

import { VectorParams, validateVectorParams } from './vectorAddition.pure'

export * from './vectorAddition.pure'

// ── LLM parameter extraction (NEEDS A LIVE GROQ TEST — isolated) ──────────────

function buildExtractionPrompt(text: string): string {
  return `Read the explanation below and extract the two vectors being added, if present.

Explanation:
"${text}"

Reply with ONLY this JSON, no other text:
{"isVectorAddition": true|false, "aMag": <number>, "aAngleDeg": <number, degrees CCW from east/+x>, "bMag": <number>, "bAngleDeg": <number>}
- isVectorAddition is false if the text is not about adding two vectors.
- Convert compass/word directions to degrees CCW from east (east=0, north=90, west=180, south=270).
- Use the magnitudes and directions actually stated; do not invent vectors.`
}

/**
 * Extract validated vector parameters from text via the LLM, or null. Never throws.
 * NOTE: requires a live Groq-reachable network — verify with a real call later.
 */
export async function extractVectorParams(text: string): Promise<VectorParams | null> {
  if (!text || !text.trim()) return null
  const raw = await generateJSON(buildExtractionPrompt(text), 150).catch((err) => {
    // TEMP DEBUG (scene-extraction debug sprint — remove once diagnosed)
    console.error('[extractVectorParams DEBUG] generateJSON threw:', err)
    return null
  })
  console.error('[extractVectorParams DEBUG] raw from generateJSON:', JSON.stringify(raw))
  if (!raw || raw.isVectorAddition !== true) {
    console.error('[extractVectorParams DEBUG] -> null: raw falsy or isVectorAddition !== true (got', JSON.stringify(raw?.isVectorAddition), ')')
    return null
  }
  const validated = validateVectorParams(raw)
  if (!validated) console.error('[extractVectorParams DEBUG] -> null: validateVectorParams rejected raw:', JSON.stringify(raw))
  return validated
}
