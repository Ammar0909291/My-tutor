/**
 * contractAuditShapeDetection.test.ts
 *
 * ROOT-CAUSE FIX PIN, not a content check. `scripts/assets/contract-audit.ts`'s
 * `load()` classified a content module by the EXPORTED CONST'S NAME
 * (`name.endsWith('EXPLANATIONS')` / `name.endsWith('PROBES')`), the exact
 * naming-based trap `seedCorpusCoverageRatchet.test.ts`'s own header already
 * names ("`ENGLISH_PROBE_BATCH_2` holds probes but its name doesn't contain
 * 'PROBES'") — except that ratchet checks a TypeScript type ANNOTATION in
 * source text, which survives naming; `contract-audit.ts` imports the real
 * runtime value and has no annotation left to read, so its name-based
 * heuristic had no equivalent safety net.
 *
 * MEASURED, 2026-09-17: this silently dropped every
 * `ENGLISH_ADULT_BAND_BATCH_*` (12 files) and `ENGLISH_PROBE_BATCH_*`
 * (10 files) export from every asset-contract measurement this script had
 * ever produced. "english 2/412 pairs at contract" — quoted verbatim in
 * multiple prior CLAUDE.md entries and used to justify treating English as
 * nearly unservable — was an artefact of this bug. The corrected reading is
 * 313/412 (76%).
 *
 * Fixed by classifying on the SHAPE of the first array element instead:
 * a `SeedExplanation` carries `familyKind` and never `probeKind`; a
 * `SeedProbe` carries `probeKind` and never `familyKind` (see
 * brainSeedAssets.ts's own type definitions). This test asserts the fix
 * directly against the real corpus, not a synthetic fixture, so it cannot
 * pass by accident the way a hand-picked example could.
 */
import path from 'path'
import { describe, it, expect } from 'vitest'
import { load, classify } from '../../scripts/assets/contract-audit'

const ASSET_DIR = path.join(process.cwd(), 'src', 'lib', 'teaching', 'assets')

describe('contract-audit.ts content detection — shape-based, not name-based', () => {
  it('classify() reads SeedProbe/SeedExplanation shape, not the variable name', () => {
    expect(classify([{ probeKind: 'mcq', choices: [] }])).toBe('probes')
    expect(classify([{ familyKind: 'core_explanation' }])).toBe('explanations')
    expect(classify([])).toBeNull()
    expect(classify([{ somethingElse: true }])).toBeNull()
  })

  it('a real module whose export name does NOT end in PROBES or EXPLANATIONS is still counted — the exact regression', async () => {
    // englishAdultBandBatch1.ts exports ENGLISH_ADULT_BAND_BATCH_1: SeedProbe[]
    // — a name a suffix-based scan would miss. Import it directly (bypassing
    // load()'s directory scan) to prove classify() reads it correctly in
    // isolation, independent of any other file in the corpus.
    const mod = await import(path.join(ASSET_DIR, 'englishAdultBandBatch1.ts'))
    const value = mod.ENGLISH_ADULT_BAND_BATCH_1
    expect(Array.isArray(value)).toBe(true)
    expect(value.length).toBeGreaterThan(0)
    expect(classify(value)).toBe('probes')
  })

  it('load() over the real corpus includes englishAdultBandBatch1/englishProbeBatch2-shaped content — proves the fix end to end', async () => {
    const { probes } = await load()
    const englishAdultProbes = probes.filter(
      (p) => p.subjectSlug === 'english' && String(p.gradeBand) === 'ADULT',
    )
    // Before the fix this was 0 for every ENGLISH_ADULT_BAND_BATCH_* file —
    // a non-trivial floor here is exactly what would have caught the bug.
    expect(englishAdultProbes.length).toBeGreaterThan(50)
  })

  it('english pairsAtContract is now the corrected, much higher reading — not the pre-fix 2/412', async () => {
    const { explanations, probes } = await load()
    const isGradeable = (p: { choices?: unknown }) => Array.isArray(p.choices) && p.choices.length >= 2
    const taught = new Set(
      explanations
        .filter((e) => e.subjectSlug === 'english')
        .map((e) => `${e.conceptId}::${String(e.gradeBand)}`),
    )
    const gradeableCount = new Map<string, number>()
    for (const p of probes) {
      if (p.subjectSlug !== 'english' || !isGradeable(p)) continue
      const k = `${p.conceptId}::${String(p.gradeBand)}`
      gradeableCount.set(k, (gradeableCount.get(k) ?? 0) + 1)
    }
    const atContract = [...taught].filter((k) => (gradeableCount.get(k) ?? 0) >= 3).length
    // Pre-fix reading was 2. Regression-proof floor, not the exact live
    // number (which will rise as future batches close the remaining gap) —
    // a value this much higher than 2 could only occur if the fix holds.
    expect(atContract).toBeGreaterThan(200)
  })
})
