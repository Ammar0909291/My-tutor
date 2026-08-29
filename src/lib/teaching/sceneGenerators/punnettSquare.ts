/**
 * Punnett-square (monohybrid cross) scene generator (19th parametric
 * generator), closing the "Genetics (Punnett squares, DNA/chromosome)" gap
 * noted in docs/VISUAL_COVERAGE_GAP_ANALYSIS.md. Builds the classic 2x2
 * monohybrid-cross grid from two parent genotypes for a single gene with two
 * alleles, deriving every offspring genotype and the resulting phenotype
 * ratio by formula (never invented). Same architecture as the other
 * generators: extractPunnettParams (LLM, isolated) → validatePunnettParams
 * (pure) → buildPunnettSquareScene (pure, deterministic grid) →
 * checkPunnettConsistency (pure, independent re-derivation safety net).
 *
 * THE PURE HALF LIVES IN `./punnettSquare.pure` and is re-exported below, so every
 * importer of this module is unchanged. It was split out so the browser can
 * re-run the builder when a learner varies a parameter; this module reaches
 * the AI client and must stay server-side.
 */

import { generateJSON } from '@/lib/ai/client'


import { PunnettParams, validatePunnettParams } from './punnettSquare.pure'

export * from './punnettSquare.pure'

// ── LLM parameter extraction (NEEDS A LIVE GROQ TEST — isolated) ──────────────

function buildExtractionPrompt(text: string): string {
  return `Read the explanation below and extract the two parent genotypes for the monohybrid genetic cross being discussed, if present.

Explanation:
"${text}"

Reply with ONLY this JSON, no other text:
{"isPunnettSquare": true|false, "parent1Genotype": <2-letter string>, "parent2Genotype": <2-letter string>}
- isPunnettSquare is false if the text is not about a single-gene (monohybrid) genetic cross.
- Each genotype is exactly two letters of the SAME letter (e.g. "Aa", "AA", "aa") — use the letter actually stated in the text, do not invent one.`
}

/**
 * Extract validated Punnett-square parameters from text via the LLM, or null. Never throws.
 * NOTE: requires a live Groq-reachable network — verify with a real call later.
 */
export async function extractPunnettParams(text: string): Promise<PunnettParams | null> {
  if (!text || !text.trim()) return null
  const raw = await generateJSON(buildExtractionPrompt(text), 150).catch(() => null)
  if (!raw || raw.isPunnettSquare !== true) return null
  return validatePunnettParams(raw)
}
