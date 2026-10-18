/**
 * Fingerprint of the English concepts that serve a STATIC figure (a registry scene, a curated card): per concept, the served payload, its
 * provenance, scope and id — the English twin of scripts/qa/mathVisual/fingerprint.ts, restricted to the concepts that serve one.
 * English used to serve none (every English figure is model-generated at runtime and is covered by the envelope audit, see
 * docs/qa/ENGLISH_VISUAL_VALIDATION.md); `eng.grammar.nouns` is the first with a figure of its own, so the figure a learner is served is
 * audited like a Mathematics figure and `englishStaticFigureAudit.test.ts` fails, naming the concept, when it changes after the audit.
 */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { resolveVisual } from '../../../src/lib/teaching/visual/resolveVisual'

export function englishConceptIds(): string[] {
  const g = JSON.parse(readFileSync('docs/english/kg/graph.json', 'utf8'))
  return (Array.isArray(g) ? g : (g.concepts ?? g.nodes)).map((n: { id: string }) => n.id)
}

export function servedEnglish(id: string) {
  return resolveVisual({ message: 'show me a diagram', lessonConceptId: id, learnerRequest: 'diagram', subject: 'english' } as Parameters<typeof resolveVisual>[0])
}

/** One pass over the English KG: the concepts that serve a static figure, each with its fingerprint (one sha256 per concept, plus one over all of them). */
export function staticFigureFingerprints(): { fingerprint: string; fingerprints: Record<string, string> } {
  const all = createHash('sha256')
  const fingerprints: Record<string, string> = {}
  for (const id of englishConceptIds()) {
    const d = servedEnglish(id)
    if (!d.graphical) continue
    const row = JSON.stringify([id, d.provenance, d.asset?.scope ?? null, d.payload])
    fingerprints[id] = createHash('sha256').update(row).digest('hex').slice(0, 16)
    all.update(row)
  }
  return { fingerprint: all.digest('hex'), fingerprints }
}

/** Ids of the English concepts that serve a static figure. */
export function servedStaticFigureIds(): string[] {
  return Object.keys(staticFigureFingerprints().fingerprints)
}
