/**
 * Knowledge Graph -> concept index adapter.
 *
 * The ONLY file in this subsystem that touches the Knowledge Graph. It reuses
 * the existing `getKnowledgeGraph()` / `getAllNodes()` abstractions rather
 * than reading `docs/{subject}/kg/graph.json` directly, so canonical concept
 * ids always come from the one authoritative source.
 *
 * Still no database and no I/O at call time — the KG adapters resolve from
 * in-memory static data. Kept separate from `conceptIndex.ts` so the resolver
 * and the engine stay dependency-free and trivially testable.
 */

import { getKnowledgeGraph, getAllNodes } from '@/lib/curriculum/knowledgeGraph'
import { buildConceptIndex } from './conceptIndex'
import type { ConceptIndexEntry } from './conceptUnderstanding'

/** The subjects with canonical KG coverage (mirrors knowledgeGraph.ts's own
 *  ID_PREFIX_TO_SUBJECT registry). */
export const INDEXED_SUBJECTS: readonly string[] = [
  'mathematics', 'physics', 'chemistry', 'biology', 'computer_science', 'english',
]

/**
 * Build the concept index for one subject, or for every indexed subject when
 * `subjects` is omitted. Deterministic: entries are sorted by conceptId so
 * two builds are always deeply equal.
 */
export function buildConceptIndexFromKnowledgeGraph(
  subjects: readonly string[] = INDEXED_SUBJECTS,
): readonly ConceptIndexEntry[] {
  const entries: ConceptIndexEntry[] = []
  for (const subject of subjects) {
    const graph = getKnowledgeGraph(subject)
    if (!graph) continue
    for (const node of getAllNodes(graph)) {
      entries.push({ conceptId: node.id, title: node.title, subject })
    }
  }
  entries.sort((a, b) => a.conceptId.localeCompare(b.conceptId))
  return buildConceptIndex(entries)
}
