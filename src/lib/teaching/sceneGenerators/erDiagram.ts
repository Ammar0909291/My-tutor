/**
 * Entity-relationship (ER) diagram scene generator (25th parametric
 * generator), closing the "SQL / ER diagrams" gap noted in
 * docs/VISUAL_COVERAGE_GAP_ANALYSIS.md. Lays out a database schema's
 * entities (evenly spaced, with their attributes) and the relationships
 * between them (with cardinality labels), by formula — entity positions and
 * edge endpoints are derived, never invented. Same architecture as the other
 * generators: extractERDiagramParams (LLM, isolated) →
 * validateERDiagramParams (pure) → buildERDiagramScene (pure, deterministic
 * layout) → checkERDiagramConsistency (pure, independent re-derivation
 * safety net).
 *
 * THE PURE HALF LIVES IN `./erDiagram.pure` and is re-exported below, so every
 * importer of this module is unchanged. It was split out so the browser can
 * re-run the builder when a learner varies a parameter; this module reaches
 * the AI client and must stay server-side.
 */

import { generateJSON } from '@/lib/ai/client'


import { ERDiagramParams, validateERDiagramParams } from './erDiagram.pure'

export * from './erDiagram.pure'

// ── LLM parameter extraction (NEEDS A LIVE GROQ TEST — isolated) ─────────────

function buildExtractionPrompt(text: string): string {
  return `Read the explanation below and extract the database schema (entities, attributes, and relationships) being discussed, if present.

Explanation:
"${text}"

Reply with ONLY this JSON, no other text:
{"isERDiagram": true|false, "entities": [{"name": "<string>", "attributes": [<1-6 strings>]}], "relationships": [{"from": "<entity name>", "to": "<entity name>", "cardinality": "one-to-one"|"one-to-many"|"many-to-many"}]}
- isERDiagram is false if the text is not about a database schema / entity-relationship model.
- entities has 2-6 items with distinct names; relationships' from/to must reference entity names that appear in entities.
- Use the entities, attributes, and relationships actually stated in the text — do not invent any.`
}

/**
 * Extract validated ER-diagram parameters from text via the LLM, or null. Never throws.
 * NOTE: requires a live Groq-reachable network — verify with a real call later.
 */
export async function extractERDiagramParams(text: string): Promise<ERDiagramParams | null> {
  if (!text || !text.trim()) return null
  const raw = await generateJSON(buildExtractionPrompt(text), 500).catch(() => null)
  if (!raw || raw.isERDiagram !== true) return null
  return validateERDiagramParams(raw)
}
