/**
 * A fingerprint of EVERYTHING the resolver serves for Mathematics: per KG concept, the served payload (scene JSON / card type), its
 * provenance, scope and id. The render audit records it next to its verdicts; `mathVisualAudit.test.ts` recomputes it and fails
 * (naming the concepts) when a figure, a generator parameter or the concept list changed after the last render audit. Renderer / CSS
 * changes are NOT in it (they would force a multi-hour re-render for every unrelated UI edit): the shared pieces are guarded by their
 * own tests and the history doc requires a re-run when they change. Twin of scripts/qa/physicsVisual/fingerprint.ts (subject 'mathematics').
 */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { resolveVisual } from '../../../src/lib/teaching/visual/resolveVisual'

export function mathematicsConceptIds(): string[] {
  const g = JSON.parse(readFileSync('docs/mathematics/kg/graph.json', 'utf8'))
  return (Array.isArray(g) ? g : (g.concepts ?? g.nodes)).map((n: { id: string }) => n.id)
}

/** One sha256 per concept, plus one over all of them. */
export function servedFingerprints(): { fingerprint: string; fingerprints: Record<string, string>; concepts: number } {
  const all = createHash('sha256')
  const fingerprints: Record<string, string> = {}
  const ids = mathematicsConceptIds()
  for (const id of ids) {
    const d = resolveVisual({ message: 'show me a diagram', lessonConceptId: id, learnerRequest: 'diagram', subject: 'mathematics' } as Parameters<typeof resolveVisual>[0])
    const row = JSON.stringify([id, d.provenance, d.asset?.scope ?? null, d.payload])
    fingerprints[id] = createHash('sha256').update(row).digest('hex').slice(0, 16)
    all.update(row)
  }
  return { fingerprint: all.digest('hex'), fingerprints, concepts: ids.length }
}
