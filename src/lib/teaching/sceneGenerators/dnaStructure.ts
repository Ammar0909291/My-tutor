/**
 * DNA double-helix base-pairing scene generator (28th parametric generator),
 * closing the remaining "DNA/chromosome" half of the "Genetics (Punnett
 * squares, DNA/chromosome)" gap noted in docs/VISUAL_COVERAGE_GAP_ANALYSIS.md
 * (the Punnett-square half is already covered by punnettSquare.ts).
 *
 * Formula-driven: given one DNA strand's base sequence, the complementary
 * strand is derived by the fixed Watson-Crick base-pairing rule
 * (A pairs with T, G pairs with C) — never invented, never LLM-generated.
 * Same architecture as the other generators: extractDNAStructureParams
 * (LLM, isolated) → validateDNAStructureParams (pure) →
 * buildDNAStructureScene (pure, deterministic pairing) →
 * checkDNAStructureConsistency (pure, independent re-derivation safety net).
 *
 * THE PURE HALF LIVES IN `./dnaStructure.pure` and is re-exported below, so every
 * importer of this module is unchanged. It was split out so the browser can
 * re-run the builder when a learner varies a parameter; this module reaches
 * the AI client and must stay server-side.
 */

import { generateJSON } from '@/lib/ai/client'


import { DNAStructureParams, validateDNAStructureParams } from './dnaStructure.pure'

export * from './dnaStructure.pure'

// ── LLM parameter extraction (NEEDS A LIVE GROQ TEST — isolated) ────────────

function buildExtractionPrompt(text: string): string {
  return `Read the explanation below and extract the DNA base sequence (using letters A, T, G, C) being discussed, if present.

Explanation:
"${text}"

Reply with ONLY this JSON, no other text:
{"isDNASequence": true|false, "sequence": "<string of A/T/G/C letters, 2-12 bases>"}
- isDNASequence is false if the text is not about a specific DNA base sequence.
- sequence must use only the letters A, T, G, C and be the sequence actually stated in the text — do not invent one.`
}

/**
 * Extract validated DNA-structure parameters from text via the LLM, or null. Never throws.
 * NOTE: requires a live Groq-reachable network — verify with a real call later.
 */
export async function extractDNAStructureParams(text: string): Promise<DNAStructureParams | null> {
  if (!text || !text.trim()) return null
  const raw = await generateJSON(buildExtractionPrompt(text), 150).catch(() => null)
  if (!raw || raw.isDNASequence !== true) return null
  return validateDNAStructureParams(raw)
}
