/**
 * Electric circuit scene generator (15th parametric generator).
 *
 * Series or parallel resistor networks: computes total resistance, total
 * current, and per-resistor current/voltage-drop via Ohm's law, then lays
 * the components out evenly spaced around a loop (battery + resistors).
 * Same architecture as the other generators: extractCircuitParams (LLM,
 * isolated) → validateCircuitParams (pure) → buildCircuitScene (pure,
 * deterministic Ohm's-law computation + loop layout) → checkCircuitConsistency
 * (pure, independent re-derivation safety net verifying KVL/KCL).
 *
 * Distinct from the existing 'circuit_diagram' VisualType (school visuals
 * detector): that path is the free-form/legacy visual pipeline; this module
 * is the deterministic SceneSpec parametric generator, gated behind
 * ENABLE_PARAMETRIC_SCENE_GENERATION like the other 14 generators here.
 *
 * THE PURE HALF LIVES IN `./electricCircuit.pure` and is re-exported below, so every
 * importer of this module is unchanged. It was split out so the browser can
 * re-run the builder when a learner varies a parameter; this module reaches
 * the AI client and must stay server-side.
 */

import { generateJSON } from '@/lib/ai/client'


import { CircuitParams, validateCircuitParams } from './electricCircuit.pure'

export * from './electricCircuit.pure'

// ── LLM parameter extraction (NEEDS A LIVE GROQ TEST — isolated) ──────────────

function buildExtractionPrompt(text: string): string {
  return `Read the explanation below and extract the circuit being discussed, if present.

Explanation:
"${text}"

Reply with ONLY this JSON, no other text:
{"isCircuit": true|false, "components": [{"type": "resistor"|"battery"|"capacitor", "value": <number>, "unit": "<string>"}], "connection": "series"|"parallel", "voltage": <positive number>}
- isCircuit is false if the text is not about a resistor circuit and its current/voltage.
- components must include at least one resistor; use the values actually stated in the text.
- voltage is the source/battery voltage.
- Do not invent component values not stated in the text.`
}

/**
 * Extract validated circuit parameters from text via the LLM, or null. Never throws.
 * NOTE: requires a live Groq-reachable network — verify with a real call later.
 */
export async function extractCircuitParams(text: string): Promise<CircuitParams | null> {
  if (!text || !text.trim()) return null
  const raw = await generateJSON(buildExtractionPrompt(text), 300).catch(() => null)
  if (!raw || raw.isCircuit !== true) return null
  return validateCircuitParams(raw)
}
