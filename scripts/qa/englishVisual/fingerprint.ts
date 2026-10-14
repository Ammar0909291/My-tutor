/**
 * Fingerprint of the English fixtures (one sha256 per fixture id over its spec) — the analogue of scripts/qa/mathVisual/fingerprint.ts. English serves no
 * static figure, so what the audit pins is the fixture set; a changed fixture builder, a changed English asset wording or a changed schema limit
 * invalidates exactly the fixtures it touches. Renderer / CSS changes are NOT in it (they would force a re-render for every UI edit); the shared
 * renderers have their own tests and docs/history/english-visual-validation.md requires a re-run when they change.
 */
import { createHash } from 'node:crypto'
import { buildFixtures } from './buildFixtures'

export function fixtureFingerprints(): { fingerprint: string; fingerprints: Record<string, string>; ids: string[] } {
  const all = createHash('sha256')
  const fingerprints: Record<string, string> = {}
  const fx = buildFixtures()
  for (const f of fx) {
    const row = JSON.stringify([f.id, f.kind, f.spec])
    fingerprints[f.id] = createHash('sha256').update(row).digest('hex').slice(0, 16)
    all.update(row)
  }
  return { fingerprint: all.digest('hex'), fingerprints, ids: fx.map((f) => f.id) }
}
