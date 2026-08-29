/**
 * Cell division (mitosis / meiosis) scene generator (27th parametric
 * generator), closing the "Cell structure & division" gap noted in
 * docs/VISUAL_COVERAGE_GAP_ANALYSIS.md.
 *
 * Like electronShells.ts and periodicTrends.ts, this is DATA-driven, not
 * formula-driven: the stage sequence, per-stage description, daughter-cell
 * count, and resulting ploidy are curated, textbook-fixed biology facts for
 * mitosis and meiosis. The LLM only EXTRACTS which division type is meant;
 * code looks up the real stage data, correct by construction (never
 * invented).
 *
 * Same architecture as the other generators: extractCellDivisionParams
 * (LLM, isolated) → validateCellDivisionParams (pure) →
 * buildCellDivisionScene (pure, deterministic lookup) →
 * checkCellDivisionConsistency (pure, independent re-derivation safety net).
 *
 * THE PURE HALF LIVES IN `./cellDivision.pure` and is re-exported below, so every
 * importer of this module is unchanged. It was split out so the browser can
 * re-run the builder when a learner varies a parameter; this module reaches
 * the AI client and must stay server-side.
 */

import { generateJSON } from '@/lib/ai/client'


import { CellDivisionParams, validateCellDivisionParams } from './cellDivision.pure'

export * from './cellDivision.pure'

// ── LLM parameter extraction (NEEDS A LIVE GROQ TEST — isolated) ────────────

function buildExtractionPrompt(text: string): string {
  return `Read the explanation below and determine whether it is about mitosis or meiosis (cell division), if either.

Explanation:
"${text}"

Reply with ONLY this JSON, no other text:
{"isCellDivision": true|false, "divisionType": "mitosis"|"meiosis"}
- isCellDivision is false if the text is not about mitosis or meiosis.
- divisionType must be exactly "mitosis" or "meiosis" based on which one the text describes.`
}

/**
 * Extract validated cell-division parameters from text via the LLM, or null. Never throws.
 * NOTE: requires a live Groq-reachable network — verify with a real call later.
 */
export async function extractCellDivisionParams(text: string): Promise<CellDivisionParams | null> {
  if (!text || !text.trim()) return null
  const raw = await generateJSON(buildExtractionPrompt(text), 150).catch(() => null)
  if (!raw || raw.isCellDivision !== true) return null
  return validateCellDivisionParams(raw)
}
