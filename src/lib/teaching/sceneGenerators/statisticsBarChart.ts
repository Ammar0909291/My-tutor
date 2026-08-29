/**
 * Statistics bar-chart scene generator (22nd parametric generator), closing
 * the "School-level statistics charts (bar/frequency)" gap noted in
 * docs/VISUAL_COVERAGE_GAP_ANALYSIS.md. Shows a frequency distribution as
 * vertical bars, one per category, and derives the mean (via Σ(value×freq)/Σfreq)
 * and the modal category (highest frequency) from the data — the LLM extracts
 * only the raw category labels and frequencies. Same architecture as the other
 * generators: extractStatisticsParams (LLM, isolated) → validateStatisticsParams
 * (pure) → buildStatisticsBarChartScene (pure, deterministic layout) →
 * checkStatisticsConsistency (pure, independent re-derivation safety net).
 *
 * THE PURE HALF LIVES IN `./statisticsBarChart.pure` and is re-exported below, so every
 * importer of this module is unchanged. It was split out so the browser can
 * re-run the builder when a learner varies a parameter; this module reaches
 * the AI client and must stay server-side.
 */

import { generateJSON } from '@/lib/ai/client'


import { StatisticsParams, validateStatisticsParams } from './statisticsBarChart.pure'

export * from './statisticsBarChart.pure'

// ── LLM parameter extraction (NEEDS A LIVE GROQ TEST — isolated) ──────────────

function buildExtractionPrompt(text: string): string {
  return `Read the explanation below and extract the frequency-distribution / bar-chart data being discussed, if present.

Explanation:
"${text}"

Reply with ONLY this JSON, no other text:
{"isStatisticsChart": true|false, "chartTitle": <string>, "bars": [{"label": <string>, "frequency": <number>}, ...]}
- isStatisticsChart is false if the text is not about a frequency distribution / bar chart / tally of categories with counts.
- bars must have 2 to 12 entries, each with a category label and its frequency (count), in the order given in the text.
- Use the values actually stated in the text; do not invent numbers.`
}

/**
 * Extract validated statistics-bar-chart parameters from text via the LLM, or null. Never throws.
 * NOTE: requires a live Groq-reachable network — verify with a real call later.
 */
export async function extractStatisticsParams(text: string): Promise<StatisticsParams | null> {
  if (!text || !text.trim()) return null
  const raw = await generateJSON(buildExtractionPrompt(text), 400).catch(() => null)
  if (!raw || raw.isStatisticsChart !== true) return null
  return validateStatisticsParams(raw)
}
