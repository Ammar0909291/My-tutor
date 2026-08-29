/**
 * Civics organizational-chart scene generator (14th parametric generator).
 *
 * Lays out an institution's hierarchy as a tree: an implicit root (the
 * institution itself) at the top, level-1 nodes evenly spaced below it, and
 * level-2 nodes evenly spaced below that, round-robin-assigned to level-1
 * parents. Same architecture as the other generators: extractOrgChartParams
 * (LLM, isolated) → validateOrgChartParams (pure) → buildOrgChartScene (pure,
 * deterministic tree layout) → checkOrgChartConsistency (pure, independent
 * re-derivation safety net).
 *
 * THE PURE HALF LIVES IN `./civicsOrgChart.pure` and is re-exported below, so every
 * importer of this module is unchanged. It was split out so the browser can
 * re-run the builder when a learner varies a parameter; this module reaches
 * the AI client and must stay server-side.
 */

import { generateJSON } from '@/lib/ai/client'


import { OrgChartParams, validateOrgChartParams } from './civicsOrgChart.pure'

export * from './civicsOrgChart.pure'

// ── LLM parameter extraction (NEEDS A LIVE GROQ TEST — isolated) ──────────────

function buildExtractionPrompt(text: string): string {
  return `Read the explanation below and extract the institutional hierarchy being discussed, if present.

Explanation:
"${text}"

Reply with ONLY this JSON, no other text:
{"isOrgChart": true|false, "institutionName": "<string>", "nodes": [{"level": 1|2, "name": "<string>", "role": "<string>"}]}
- isOrgChart is false if the text is not about an institution's hierarchy or organizational structure.
- institutionName is the top-level body (e.g. "the Parliament of India", "the Federal Government").
- nodes is the bodies/roles below it: level 1 for those reporting directly to the institution, level 2 for those reporting to a level-1 body. Use at most 3 levels overall (root + levels 1-2) and at most 7 nodes.
- Do not invent bodies not stated in the text.`
}

/**
 * Extract validated org-chart parameters from text via the LLM, or null. Never throws.
 * NOTE: requires a live Groq-reachable network — verify with a real call later.
 */
export async function extractOrgChartParams(text: string): Promise<OrgChartParams | null> {
  if (!text || !text.trim()) return null
  const raw = await generateJSON(buildExtractionPrompt(text), 300).catch(() => null)
  if (!raw || raw.isOrgChart !== true) return null
  return validateOrgChartParams(raw)
}
