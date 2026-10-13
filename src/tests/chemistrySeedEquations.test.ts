/**
 * R1 (Chemistry visual closure, 2026-10-09) — a grading probe taught an UNBALANCED half-equation.
 *
 * The Hall-Héroult anode probe (`chem.indelec.electrolysis`, MC-2) named `C + O²⁻ → CO₂ + 4e⁻` as the
 * correct answer — a learner who writes the balanced equation was being told the unbalanced one is right.
 * Two oxide ions are needed (charge 2 × (−2) = −4 on the left, 4e⁻ = −4 on the right; one C and two O
 * each side). The figure gate already FAILs that string (chemistryFigureAudit.test.ts); this pins the
 * SEED CORPUS to the same standard: every equation the audit's reaction-scheme validator can parse, in
 * every authored chemistry explanation and probe, balances in atoms and charge.
 */
import { describe, expect, it } from 'vitest'
import { CHEMISTRY_EXPLANATIONS, CHEMISTRY_PROBES } from '@/lib/teaching/assets/chemistrySeedAssets'
import * as depth from '@/lib/teaching/assets/chemistryDepthSeedAssets'
import { validateReactionSchemes, type TextItem } from '@/lib/teaching/visual/chemistryFigureAudit.pure'

function collectArrowTexts(): TextItem[] {
  const items: TextItem[] = []
  const walk = (where: string, o: unknown): void => {
    if (typeof o === 'string') { if (o.includes('→')) items.push({ text: o, where, kind: 'other' }); return }
    if (Array.isArray(o)) { o.forEach((x, i) => walk(`${where}[${i}]`, x)); return }
    if (o && typeof o === 'object') for (const [k, v] of Object.entries(o)) walk(`${where}.${k}`, v)
  }
  CHEMISTRY_EXPLANATIONS.forEach((e, i) => walk(`explanation:${e.conceptId}#${i}`, e))
  CHEMISTRY_PROBES.forEach((p, i) => walk(`probe:${p.conceptId}#${i}`, p))
  for (const [name, value] of Object.entries(depth)) {
    if (Array.isArray(value)) value.forEach((p, i) => walk(`depth:${name}#${i}`, p))
  }
  return items
}

describe('chemistry seed corpus — equations balance (R1)', () => {
  const texts = collectArrowTexts()

  it('finds a non-trivial number of equations to check (the scan is not vacuous)', () => {
    const equations = texts.reduce((n, t) => n + validateReactionSchemes([t]).equations, 0)
    expect(equations).toBeGreaterThan(50)
  })

  it('no authored explanation or probe states an unbalanced equation or charge', () => {
    const failures: string[] = []
    for (const t of texts) {
      for (const f of validateReactionSchemes([t]).findings) {
        if (f.severity === 'FAIL') failures.push(`${t.where}: ${f.code} ${f.detail}`)
      }
    }
    expect(failures).toEqual([])
  })

  it('the Hall-Héroult anode probe names the BALANCED half-equation, and the old form is gone', () => {
    const probe = CHEMISTRY_PROBES.find((p) => p.correctValue?.includes('They are consumed'))
    expect(probe, 'the anode probe must exist').toBeTruthy()
    expect(probe!.correctValue).toBe('They are consumed: C + 2O²⁻ → CO₂ + 4e⁻')
    const choice = probe!.choices?.find((c) => c.isCorrect)
    expect(choice?.text).toContain('C + 2O²⁻ → CO₂ + 4e⁻')
    expect(JSON.stringify(probe)).not.toContain('C + O²⁻ → CO₂')
  })
})
