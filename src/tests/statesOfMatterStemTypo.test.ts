/**
 * Served live 2026-10-02 (chem.found.states-of-matter, real account):
 * "…the average separation of the particles ______ and the hold the forces
 * between them have ______." — an ungrammatical stem ("the hold the forces …
 * have weakens"). Concept-specific content correction.
 */
import { describe, it, expect } from 'vitest'
import { CHEMISTRY_DEPTH_PROBES } from '@/lib/teaching/assets/chemistryDepthSeedAssets'

describe('the states-of-matter separation item', () => {
  const item = CHEMISTRY_DEPTH_PROBES.find((p) => p.conceptId === 'chem.found.states-of-matter' && p.stem.startsWith('Going from solid to liquid to gas'))!
  it('reads as a sentence once its blanks are filled with the key', () => {
    expect(item.stem).toBe('Going from solid to liquid to gas, the average separation of the particles ______ and the hold of the forces between them ______.')
    const [a, b] = item.choices!.find((c) => c.isCorrect)!.text.split(' … ')
    const filled = item.stem.replace('______', a).replace('______', b)
    expect(filled).toBe('Going from solid to liquid to gas, the average separation of the particles increases and the hold of the forces between them weakens.')
  })
})
