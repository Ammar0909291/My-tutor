/**
 * A fingerprint of EVERYTHING the resolver serves for physics: for each KG
 * concept, the served payload (scene JSON / card type), its provenance, scope
 * and the concept's own KG row id. The browser audit records it next to its
 * verdicts; `physicsVisualAudit.test.ts` recomputes it and fails if it differs —
 * i.e. a figure, a generator parameter or the concept list changed after the
 * last render audit, so the committed verdicts no longer describe what ships.
 *
 * Renderer changes are NOT in it (that would force a multi-hour re-render for
 * every unrelated UI edit); they are guarded by the unit tests of the shared
 * pieces and by re-running the audit, which the history doc requires.
 */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { resolveVisual } from '../../../src/lib/teaching/visual/resolveVisual'

export function physicsConceptIds(): string[] {
  const g = JSON.parse(readFileSync('docs/physics/kg/graph.json', 'utf8'))
  return (Array.isArray(g) ? g : (g.concepts ?? g.nodes)).map((n: { id: string }) => n.id)
}

/** One sha256 per concept, plus one over all of them (the whole-corpus fingerprint). */
export function servedFingerprints(): { fingerprint: string; fingerprints: Record<string, string>; concepts: number } {
  const all = createHash('sha256')
  const fingerprints: Record<string, string> = {}
  const ids = physicsConceptIds()
  for (const id of ids) {
    const d = resolveVisual({ message: 'show me a diagram', lessonConceptId: id, learnerRequest: 'diagram', subject: 'physics' } as Parameters<typeof resolveVisual>[0])
    const row = JSON.stringify([id, d.provenance, d.asset?.scope ?? null, d.payload])
    fingerprints[id] = createHash('sha256').update(row).digest('hex').slice(0, 16)
    all.update(row)
  }
  return { fingerprint: all.digest('hex'), fingerprints, concepts: ids.length }
}

export function servedFingerprint(): { fingerprint: string; concepts: number } {
  const { fingerprint, concepts } = servedFingerprints()
  return { fingerprint, concepts }
}
