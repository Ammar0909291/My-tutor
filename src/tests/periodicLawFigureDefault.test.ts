import { describe, expect, it } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'

/**
 * Chemistry QA 2026-10-14 ("Modern Periodic Law"): a pasted session showed Mg vs Si next to a reply that named Na and Cl. The lesson serves the shared canonical
 * figure — Na vs Cl — and Mg/Si is a choice the learner makes with "Try changing values". Pin the canonical pair so a change to it is a decision, not an accident:
 * the tutor is told what is on screen from this asset.
 */
describe('the periodic-law lessons serve the canonical Na vs Cl periodic-trends figure', () => {
  for (const id of ['chem.period.modern-periodic-law', 'chem.period.periodic-properties']) {
    it(id, () => {
      const d = resolveVisual({ message: 'continue', lessonConceptId: id, learnerRequest: null, subject: 'chemistry' } as Parameters<typeof resolveVisual>[0]) as unknown as { asset?: { provenance?: string; payload?: { sceneSpec?: { title?: string } } } }
      expect(d.asset?.payload?.sceneSpec?.title).toBe('Periodic Trends: Na vs Cl')
      expect(d.asset?.provenance).toBe('generator-default')
    })
  }
})
