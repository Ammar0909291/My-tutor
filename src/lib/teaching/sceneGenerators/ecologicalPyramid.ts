/**
 * Ecological (energy) pyramid scene generator (23rd parametric generator),
 * closing the "Ecology (energy pyramid, nutrient cycles)" gap noted in
 * docs/VISUAL_COVERAGE_GAP_ANALYSIS.md. Builds a trophic-level energy pyramid
 * from a list of trophic-level labels and the producer-level energy input,
 * deriving every level's available energy by formula (the 10% law — only
 * ~10% of energy transfers to the next trophic level, never invented). Same
 * architecture as the other generators: extractEcologicalPyramidParams (LLM,
 * isolated) → validateEcologicalPyramidParams (pure) →
 * buildEcologicalPyramidScene (pure, deterministic pyramid) →
 * checkEcologicalPyramidConsistency (pure, independent re-derivation safety net).
 *
 * THE PURE HALF LIVES IN `./ecologicalPyramid.pure` and is re-exported below, so every
 * importer of this module is unchanged. It was split out so the browser can
 * re-run the builder when a learner varies a parameter; this module reaches
 * the AI client and must stay server-side.
 */

import { generateJSON } from '@/lib/ai/client'


import { EcologicalPyramidParams, validateEcologicalPyramidParams } from './ecologicalPyramid.pure'

export * from './ecologicalPyramid.pure'

// ── LLM parameter extraction (NEEDS A LIVE GROQ TEST — isolated) ──────────────

function buildExtractionPrompt(text: string): string {
  return `Read the explanation below and extract the trophic-level energy pyramid being discussed, if present.

Explanation:
"${text}"

Reply with ONLY this JSON, no other text:
{"isEcologicalPyramid": true|false, "trophicLevels": [<2 to 5 strings, producer level first>], "baseEnergy": <positive number>}
- isEcologicalPyramid is false if the text is not about an energy pyramid / trophic levels / food chain energy flow.
- trophicLevels must be ordered starting from the producer level (e.g. ["Producers","Herbivores","Carnivores"]).
- baseEnergy is the energy value stated for the producer (first) level; use the number actually stated in the text, do not invent one.`
}

/**
 * Extract validated ecological-pyramid parameters from text via the LLM, or null. Never throws.
 * NOTE: requires a live Groq-reachable network — verify with a real call later.
 */
export async function extractEcologicalPyramidParams(text: string): Promise<EcologicalPyramidParams | null> {
  if (!text || !text.trim()) return null
  const raw = await generateJSON(buildExtractionPrompt(text), 150).catch(() => null)
  if (!raw || raw.isEcologicalPyramid !== true) return null
  return validateEcologicalPyramidParams(raw)
}
