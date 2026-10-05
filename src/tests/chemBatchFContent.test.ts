/**
 * CHEM Batch F (2026-10-05, chemistry real-learner run) — authored cards whose
 * content was wrong or misleading, fixed in chemistrySeedAssets.ts and, where
 * the EB entry carried the same claim, in that entry too.
 * The canonical slugs are unchanged, so production keeps the old rows until an
 * owner-approved scripts/assets/converge-probe-edits.ts run (create-only
 * bootstrap).
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { CHEMISTRY_PROBES } from '@/lib/teaching/assets/chemistrySeedAssets'

const probe = (re: RegExp) => {
  const hits = CHEMISTRY_PROBES.filter((p) => re.test(p.stem))
  expect(hits.length, String(re)).toBe(1)
  return hits[0]
}
const correct = (p: { choices?: Array<{ text: string; isCorrect?: boolean }> }) => p.choices!.find((c) => c.isCorrect)!.text
const EB = (id: string) => readFileSync(`educational-brain/concepts/chemistry/${id}.md`, 'utf8')

describe('Batch F', () => {
  it('CHEM-112: the Ksp card asks whether Ksp alone decides, and keys "No — calculate" (Salt B ≈ 100× more soluble)', () => {
    const p = probe(/Salt A \(1:1 stoichiometry\)/)
    expect(p.stem).toMatch(/just by comparing the two Ksp values\?$/)
    expect(correct(p)).toMatch(/^No — .*Salt B is about 100 times more soluble/)
    expect(p.choices!.find((c) => !c.isCorrect)!.text).toMatch(/^Yes — /)
  })
  it('CHEM-108: the Newman card asks for the total, counting the bond not drawn', () => {
    const p = probe(/Newman projection of ethane the FRONT carbon/)
    expect(p.stem).toMatch(/in total, counting any that are not drawn as a line\?$/)
    expect(correct(p)).toMatch(/^Four — /)
  })
  it('CHEM-147: lead has four stable isotopes — seed and EB', () => {
    const p = probe(/ICP-MS trace of a lead sample/)
    expect(correct(p)).toMatch(/²⁰⁴Pb/)
    expect(correct(p)).not.toMatch(/The three stable ISOTOPES/)
    expect(EB('chem.anal.spectroscopy')).toMatch(/fourth stable isotope, ²⁰⁴Pb/)
  })
  it('CHEM-122: the correct option no longer starts "Not quite —" (verdict read "Not quite — the answer is: Not quite —")', () => {
    expect(correct(probe(/Does equal bond order mean equal bond length/))).toMatch(/^No — bond order predicts the TREND/)
    for (const p of CHEMISTRY_PROBES) for (const c of p.choices ?? []) if (c.isCorrect) expect(c.text, p.stem).not.toMatch(/^Not quite\b/)
  })
  it('CHEM-088: the kelvin is no longer defined by the triple point (2019 SI) — seed and EB', () => {
    expect(correct(probe(/triple point of a substance a RANGE/))).toMatch(/until the 2019 SI redefinition/)
    expect(EB('chem.state.phase-diagram')).not.toMatch(/it is used to define the Kelvin scale\./)
    expect(EB('chem.state.phase-diagram')).toMatch(/until the 2019 SI redefinition/)
  })
})
