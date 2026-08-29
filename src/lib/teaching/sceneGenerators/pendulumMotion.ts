/**
 * Part 2 (option C) — simple pendulum scene generator. SIXTH scene type.
 *
 * LLM extracts only the string length and the amplitude (max swing angle); code
 * computes the bob's arc — every point at distance L from the pivot, symmetric
 * about the vertical — and the small-angle period T = 2π·√(L/g). Correct by
 * construction.
 *
 * Independent geometric checker: each arc point lies at exactly L from the pivot
 * (so the "string" never stretches), the swing is symmetric about the vertical,
 * the lowest point is the equilibrium directly below the pivot, and the period
 * label re-derives from T = 2π·√(L/g).
 *
 * NEW, separate code path — does not touch generateSceneSpec.ts. Pure-formula
 * parts are Groq-free and unit-tested; only extractPendulumParams() calls the LLM.
 *
 * THE PURE HALF LIVES IN `./pendulumMotion.pure` and is re-exported below, so every
 * importer of this module is unchanged. It was split out so the browser can
 * re-run the builder when a learner varies a parameter; this module reaches
 * the AI client and must stay server-side.
 */

import { generateJSON } from '@/lib/ai/client'


import { PendulumParams, validatePendulumParams } from './pendulumMotion.pure'

export * from './pendulumMotion.pure'

// ── LLM parameter extraction (NEEDS A LIVE GROQ TEST — isolated) ──────────────

function buildExtractionPrompt(text: string): string {
  return `Read the explanation below and extract the simple-pendulum parameters, if present.

Explanation:
"${text}"

Reply with ONLY this JSON, no other text:
{"isPendulum": true|false, "length": <number, metres>, "amplitudeDeg": <number, max swing angle from vertical in degrees>}
- isPendulum is false if the text is not about a simple pendulum swinging.
- Use the length and amplitude actually stated; if the amplitude is not given, estimate a small angle like 20. Do not invent a pendulum that isn't there.`
}

/**
 * Extract validated pendulum parameters from text via the LLM, or null.
 * NOTE: requires a live Groq-reachable network — verify with a real call later.
 */
export async function extractPendulumParams(text: string): Promise<PendulumParams | null> {
  if (!text || !text.trim()) return null
  const raw = await generateJSON(buildExtractionPrompt(text), 150).catch((err) => {
    // TEMP DEBUG (scene-extraction debug sprint — remove once diagnosed)
    console.error('[extractPendulumParams DEBUG] generateJSON threw:', err)
    return null
  })
  console.error('[extractPendulumParams DEBUG] raw from generateJSON:', JSON.stringify(raw))
  if (!raw || raw.isPendulum !== true) {
    console.error('[extractPendulumParams DEBUG] -> null: raw falsy or isPendulum !== true (got', JSON.stringify(raw?.isPendulum), ')')
    return null
  }
  const validated = validatePendulumParams(raw)
  if (!validated) console.error('[extractPendulumParams DEBUG] -> null: validatePendulumParams rejected raw:', JSON.stringify(raw))
  return validated
}
