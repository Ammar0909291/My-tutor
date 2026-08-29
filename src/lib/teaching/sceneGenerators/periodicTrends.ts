/**
 * Periodic-trends scene generator (26th parametric generator), closing the
 * "Periodic table / periodicity trends" gap noted in
 * docs/VISUAL_COVERAGE_GAP_ANALYSIS.md.
 *
 * Like electronShells.ts, this is DATA-driven, not formula-driven: atomic
 * radius and Pauling electronegativity are curated, textbook-fixed reference
 * values (Z = 1-20, main-group elements with a defined electronegativity —
 * noble gases are excluded since they have none on the Pauling scale). The
 * LLM only EXTRACTS which two elements are meant; code looks up their real
 * values and compares them, correct by construction (never invented).
 *
 * Same architecture as the other generators: extractPeriodicTrendParams
 * (LLM, isolated) → validatePeriodicTrendParams (pure) →
 * buildPeriodicTrendScene (pure, deterministic lookup + comparison) →
 * checkPeriodicTrendConsistency (pure, independent re-derivation safety net).
 *
 * THE PURE HALF LIVES IN `./periodicTrends.pure` and is re-exported below, so every
 * importer of this module is unchanged. It was split out so the browser can
 * re-run the builder when a learner varies a parameter; this module reaches
 * the AI client and must stay server-side.
 */

import { generateJSON } from '@/lib/ai/client'


import { ELEMENTS, PeriodicTrendParams, validatePeriodicTrendParams } from './periodicTrends.pure'

export * from './periodicTrends.pure'

// ── LLM parameter extraction (NEEDS A LIVE GROQ TEST — isolated) ────────────

function buildExtractionPrompt(text: string): string {
  const symbols = ELEMENTS.map((e) => e.symbol).join(', ')
  return `Read the explanation below and extract the two elements being compared for a periodic-trend question (atomic radius / electronegativity), if present.

Explanation:
"${text}"

Reply with ONLY this JSON, no other text:
{"isPeriodicTrend": true|false, "element1Symbol": "<symbol>", "element2Symbol": "<symbol>"}
- isPeriodicTrend is false if the text is not about comparing two main-group elements' periodic trends.
- Each symbol must be one of: ${symbols} (these are the only elements with curated reference data). If either element mentioned isn't in this list, set isPeriodicTrend to false.`
}

/**
 * Extract validated periodic-trend parameters from text via the LLM, or null. Never throws.
 * NOTE: requires a live Groq-reachable network — verify with a real call later.
 */
export async function extractPeriodicTrendParams(text: string): Promise<PeriodicTrendParams | null> {
  if (!text || !text.trim()) return null
  const raw = await generateJSON(buildExtractionPrompt(text), 150).catch(() => null)
  if (!raw || raw.isPeriodicTrend !== true) return null
  return validatePeriodicTrendParams(raw)
}
