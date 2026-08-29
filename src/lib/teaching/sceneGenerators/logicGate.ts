/**
 * Logic-gate scene generator (24th parametric generator), closing the
 * "Logic gates / flowcharts" gap noted in docs/VISUAL_COVERAGE_GAP_ANALYSIS.md.
 * Builds the gate symbol, its input lines, and its computed output from a
 * gate type and a set of boolean inputs, deriving the output strictly by the
 * gate's truth-table definition (never invented). Same architecture as the
 * other generators: extractLogicGateParams (LLM, isolated) →
 * validateLogicGateParams (pure) → buildLogicGateScene (pure, deterministic
 * truth-table evaluation) → checkLogicGateConsistency (pure, independent
 * re-derivation safety net).
 *
 * THE PURE HALF LIVES IN `./logicGate.pure` and is re-exported below, so every
 * importer of this module is unchanged. It was split out so the browser can
 * re-run the builder when a learner varies a parameter; this module reaches
 * the AI client and must stay server-side.
 */

import { generateJSON } from '@/lib/ai/client'


import { LogicGateParams, validateLogicGateParams } from './logicGate.pure'

export * from './logicGate.pure'

// ── LLM parameter extraction (NEEDS A LIVE GROQ TEST — isolated) ─────────────

function buildExtractionPrompt(text: string): string {
  return `Read the explanation below and extract the logic gate being discussed, if present.

Explanation:
"${text}"

Reply with ONLY this JSON, no other text:
{"isLogicGate": true|false, "gateType": "AND"|"OR"|"NOT"|"NAND"|"NOR"|"XOR"|"XNOR", "inputs": [<booleans>]}
- isLogicGate is false if the text is not about a logic gate / boolean circuit.
- inputs has exactly 1 boolean for NOT, exactly 2 booleans for every other gate type — use the values actually stated in the text, do not invent any.`
}

/**
 * Extract validated logic-gate parameters from text via the LLM, or null. Never throws.
 * NOTE: requires a live Groq-reachable network — verify with a real call later.
 */
export async function extractLogicGateParams(text: string): Promise<LogicGateParams | null> {
  if (!text || !text.trim()) return null
  const raw = await generateJSON(buildExtractionPrompt(text), 150).catch(() => null)
  if (!raw || raw.isLogicGate !== true) return null
  return validateLogicGateParams(raw)
}
