/**
 * Chemistry distractors were served with their own error written on them.
 *
 * MEASURED LIVE 2026-10-01 (real account, chem.found.mole-concept, phone):
 * "How many atoms are there in 0.500 mol of helium gas?" was served as
 *   0.500 / 6.02 × 10²³ — one Avogadro number regardless of the amount /
 *   3.01 × 10²³ / 1.20 × 10²⁴ — dividing by 0.500 instead of multiplying
 * The per-option answer-head split was physics-only, so a chemistry item with
 * working on SOME options was served whole. Chemistry now gets the same split.
 */
import { describe, it, expect } from 'vitest'
import { probeToMcq } from '@/lib/teaching/gateAssessment'
import { CHEMISTRY_DEPTH_PROBES } from '@/lib/teaching/assets/chemistryDepthSeedAssets'

const helium = CHEMISTRY_DEPTH_PROBES.find((p) => p.stem.startsWith('How many atoms are there in 0.500 mol of helium gas'))!

describe('the production item', () => {
  it('is on file with working on two distractors only', () => {
    expect(helium).toBeTruthy()
    expect(helium.choices!.filter((c) => / — /.test(c.text))).toHaveLength(2)
  })

  it('is served as answer heads, the errors kept as rationales', () => {
    const m = probeToMcq(helium)!
    expect(m.options.some((o) => / — /.test(o))).toBe(false)
    expect([...m.options].sort()).toEqual(['0.500', '1.20 × 10²⁴', '3.01 × 10²³', '6.02 × 10²³'])
    expect(m.options[m.correctIndex]).toBe('3.01 × 10²³')
    expect(m.rationales!.join(' ')).toContain('dividing by 0.500 instead of multiplying')
  })
})
