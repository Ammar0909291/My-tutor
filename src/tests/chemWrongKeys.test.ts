/**
 * CHEM-076 / CHEM-096 / CHEM-091 (2026-10-05): authored answer keys that marked
 * a false statement correct. Production rows read 2026-10-06 (read-only) still
 * held all three wrong keys — the bootstrap is create-only; see
 * scripts/assets/converge-probe-edits.ts for the explicit, reversible update.
 */
import { describe, it, expect } from 'vitest'
import { CHEMISTRY_PROBES } from '@/lib/teaching/assets/chemistrySeedAssets'

const find = (re: RegExp) => CHEMISTRY_PROBES.find((p) => re.test(p.stem))!
const key = (re: RegExp) => (find(re).choices ?? []).find((c) => c.isCorrect)!.text

describe('authored keys say what is true', () => {
  it('CHEM-076: syn addition (OsO4) to cis-but-2-ene gives the MESO diol', () => {
    expect(key(/cis-But-2-ene is treated with OsO4/)).toMatch(/^Meso/)
    expect(find(/cis-But-2-ene is treated with OsO4/).correctValue).toMatch(/^meso/)
  })
  it('CHEM-096: ammine is written before chlorido (alphabetical, a before c)', () => {
    const k = key(/naming \[Co\(NH₃\)₄Cl₂\]⁺/)
    expect(k).toMatch(/^ammine — ligands are cited in ALPHABETICAL order/)
    expect(k).toMatch(/tetraamminedichloridocobalt\(III\)/)
    expect(find(/naming \[Co\(NH₃\)₄Cl₂\]⁺/).correctValue).toMatch(/^ammine first/)
  })
  it('CHEM-091: 2 g H₂ and 32 g O₂ contain the same number of molecules', () => {
    expect(key(/contains more molecules: 2g of H₂/)).toMatch(/^They contain the same number/)
  })
})
