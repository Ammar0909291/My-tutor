/**
 * Demographic (population) pyramid scene generator (17th parametric
 * generator), closing the "Population/demographic pyramids" gap noted in
 * docs/VISUAL_COVERAGE_GAP_ANALYSIS.md. Lays out age bands as horizontal
 * bars stacked bottom (youngest) to top (oldest), male population extending
 * left of the central axis and female population extending right — the
 * standard population-pyramid layout used in Geography "Population"
 * chapters. Same architecture as the other generators: extractPyramidParams
 * (LLM, isolated) → validatePyramidParams (pure) → buildDemographicPyramidScene
 * (pure, deterministic bar layout) → checkPyramidConsistency (pure,
 * independent re-derivation safety net).
 *
 * THE PURE HALF LIVES IN `./demographicPyramid.pure` and is re-exported below, so every
 * importer of this module is unchanged. It was split out so the browser can
 * re-run the builder when a learner varies a parameter; this module reaches
 * the AI client and must stay server-side.
 */

import { generateJSON } from '@/lib/ai/client'


import { PyramidParams, validatePyramidParams } from './demographicPyramid.pure'

export * from './demographicPyramid.pure'

// ── LLM parameter extraction (NEEDS A LIVE GROQ TEST — isolated) ──────────────

function buildExtractionPrompt(text: string): string {
  return `Read the explanation below and extract the population-pyramid (demographic) data being discussed, if present.

Explanation:
"${text}"

Reply with ONLY this JSON, no other text:
{"isPyramid": true|false, "regionName": <string>, "bands": [{"label": <string>, "malePct": <number>, "femalePct": <number>}, ...]}
- isPyramid is false if the text is not about age/sex population distribution.
- bands must be ordered youngest-first to oldest-last, 2 to 8 bands.
- malePct/femalePct are percentages (0-100) of population in that band; do not invent values not stated in the text.`
}

/**
 * Extract validated demographic-pyramid parameters from text via the LLM, or null. Never throws.
 * NOTE: requires a live Groq-reachable network — verify with a real call later.
 */
export async function extractPyramidParams(text: string): Promise<PyramidParams | null> {
  if (!text || !text.trim()) return null
  const raw = await generateJSON(buildExtractionPrompt(text), 400).catch(() => null)
  if (!raw || raw.isPyramid !== true) return null
  return validatePyramidParams(raw)
}
