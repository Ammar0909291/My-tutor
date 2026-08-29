/**
 * Economics supply/demand curve scene generator (12th parametric generator).
 *
 * Linear supply (upward-sloping, fixed unit slope) and demand (downward-
 * sloping, fixed unit slope) lines anchored through the given equilibrium
 * point, with an optional shift of one or both curves to a new equilibrium.
 * Same architecture as the other generators: extractEconomicsParams (LLM,
 * isolated) → validateEconomicsParams (pure) → buildEconomicsCurveScene
 * (pure, deterministic layout) → checkEconomicsConsistency (pure,
 * independent re-derivation safety net).
 *
 * THE PURE HALF LIVES IN `./economicsCurves.pure` and is re-exported below, so every
 * importer of this module is unchanged. It was split out so the browser can
 * re-run the builder when a learner varies a parameter; this module reaches
 * the AI client and must stay server-side.
 */

import { generateJSON } from '@/lib/ai/client'


import { EconomicsParams, validateEconomicsParams } from './economicsCurves.pure'

export * from './economicsCurves.pure'

// ── LLM parameter extraction (NEEDS A LIVE GROQ TEST — isolated) ──────────────

function buildExtractionPrompt(text: string): string {
  return `Read the explanation below and extract the supply/demand curve scenario being discussed, if present.

Explanation:
"${text}"

Reply with ONLY this JSON, no other text:
{"isEconomicsCurve": true|false, "curveType": "supply"|"demand"|"both", "shiftDirection": "left"|"right"|"none", "equilibriumPrice": <positive number>, "equilibriumQuantity": <positive number>}
- isEconomicsCurve is false if the text is not about a supply and/or demand curve and its equilibrium.
- curveType is which curve(s) the text describes shifting ("both" if neither is singled out).
- shiftDirection is "none" if the text only describes the initial equilibrium with no shift.
- Use the equilibrium price/quantity actually stated in the text; do not invent values.`
}

/**
 * Extract validated economics curve parameters from text via the LLM, or null. Never throws.
 * NOTE: requires a live Groq-reachable network — verify with a real call later.
 */
export async function extractEconomicsParams(text: string): Promise<EconomicsParams | null> {
  if (!text || !text.trim()) return null
  const raw = await generateJSON(buildExtractionPrompt(text), 200).catch(() => null)
  if (!raw || raw.isEconomicsCurve !== true) return null
  return validateEconomicsParams(raw)
}
