/**
 * An authored key that contradicted itself.
 *
 * MEASURED LIVE 2026-10-01 (real account, chem.found.mole-concept): "Which
 * contains more molecules: 2g of H₂ or 32g of O₂?" was served as
 *   32g of O₂ / 2g of H₂ / 2g of H₂ contains more
 * with "2g of H₂ contains more" as the key. Its authored text read "2g of H₂
 * contains more — … they're EQUAL": the head (what is served) said the opposite
 * of the working, and the true answer — the same number — was not an option.
 */
import { describe, it, expect } from 'vitest'
import { probeToMcq } from '@/lib/teaching/gateAssessment'
import { CHEMISTRY_PROBES } from '@/lib/teaching/assets/chemistrySeedAssets'

const item = CHEMISTRY_PROBES.find((p) => p.stem.startsWith('Which contains more molecules: 2g of H₂'))!

describe('the H₂ / O₂ mole item', () => {
  it('serves "the same number" as the key', () => {
    const m = probeToMcq(item)!
    expect(m.options[m.correctIndex]).toBe('They contain the same number')
  })

  it('no served option says H₂ contains more and is keyed correct', () => {
    const m = probeToMcq(item)!
    expect(m.options[m.correctIndex]).not.toMatch(/contains more/)
    expect(new Set(m.options).size).toBe(3)
  })
})
