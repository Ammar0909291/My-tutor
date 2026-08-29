/**
 * Calculus function-graph scene generator (13th parametric generator).
 *
 * Samples a function across a domain, finds its critical points (where
 * f'(x)=0, via bisection on a fine grid), and marks them on the rendered
 * curve. Same architecture as the other generators: extractCalculusParams
 * (LLM, isolated) → validateCalculusParams (pure) → buildCalculusGraphScene
 * (pure, deterministic sampling + root-finding) → checkCalculusConsistency
 * (pure, independent re-derivation safety net).
 *
 * THE PURE HALF LIVES IN `./calculusGraph.pure` and is re-exported below, so every
 * importer of this module is unchanged. It was split out so the browser can
 * re-run the builder when a learner varies a parameter; this module reaches
 * the AI client and must stay server-side.
 */

import { generateJSON } from '@/lib/ai/client'


import { CalculusParams, validateCalculusParams } from './calculusGraph.pure'

export * from './calculusGraph.pure'

// ── LLM parameter extraction (NEEDS A LIVE GROQ TEST — isolated) ──────────────

function buildExtractionPrompt(text: string): string {
  return `Read the explanation below and extract the function and domain being discussed, if present.

Explanation:
"${text}"

Reply with ONLY this JSON, no other text:
{"isFunctionGraph": true|false, "functionType": "polynomial"|"trig"|"exponential"|"log", "coefficients": [<numbers>], "domainMin": <number>, "domainMax": <number>}
- isFunctionGraph is false if the text is not about graphing a specific function or finding its critical points.
- coefficients: for polynomial, highest-degree term first (e.g. x^2-4x+3 is [1,-4,3]); for trig, [amplitude, frequency] for amplitude*sin(frequency*x); for exponential, [a, b] for a*e^(b*x); for log, [a] for a*ln(x).
- Do not invent values not stated in the text; use sensible defaults only if the domain is unstated (e.g. [-10, 10], or [1, 10] for log).`
}

/**
 * Extract validated calculus-graph parameters from text via the LLM, or null. Never throws.
 * NOTE: requires a live Groq-reachable network — verify with a real call later.
 */
export async function extractCalculusParams(text: string): Promise<CalculusParams | null> {
  if (!text || !text.trim()) return null
  const raw = await generateJSON(buildExtractionPrompt(text), 250).catch(() => null)
  if (!raw || raw.isFunctionGraph !== true) return null
  return validateCalculusParams(raw)
}
