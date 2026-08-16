/**
 * MOAT STAGE 2 — every DOCUMENTED misconception must have a probe.
 *
 * S4 asked whether a probe diagnoses the misconception it names. S2 asks the
 * prior question: does the misconception have a probe at all? An undiagnosed
 * misconception is invisible — the learner holds it, nothing ever asks, and
 * the authored repair beneath it never runs.
 *
 * MEASURED, not assumed: 550 of physics' 604 documented misconceptions carried
 * a probe; 54 did not, across 53 concepts. The gap is systematic. phys.mod,
 * phys.qm, phys.stat, phys.rel and phys.astro were authored to a three-probe
 * template (blueprint trigger case -> misconception probe -> transfer case)
 * while their blueprints document FOUR misconceptions, so the fourth was never
 * reached — which is why MC-4 alone accounts for 39 of the 54.
 *
 * This file ratchets the residue and pins the batch authored so far.
 */
import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { SEED_PROBES } from '@/lib/teaching/assets/brainSeedAssets'
import { AUTHORED_PROBES } from '@/lib/teaching/assets/authoredSeedAssets'
import { CHEMISTRY_PROBES } from '@/lib/teaching/assets/chemistrySeedAssets'

const BLUEPRINTS = path.join(process.cwd(), 'docs/curriculum/blueprints')
const normalise = (id: string) => id.replace(/^MC-?/, 'MC').toUpperCase()

/**
 * Misconception GROUPS, not ids. A blueprint heading may name one
 * misconception twice — `### MC-2: MC-M=0-IS-DARK` — and a probe may target
 * either half. Counting those as two misconceptions would report a probed
 * misconception as unprobed, so each heading contributes ONE group.
 */
function misconceptionGroups(conceptId: string): string[][] {
  const file = path.join(BLUEPRINTS, `${conceptId}.md`)
  if (!fs.existsSync(file)) return []
  const groups: string[][] = []
  for (const raw of fs.readFileSync(file, 'utf8').split('\n')) {
    const line = raw.trim()
    const heading = /^#+\s*(MC-?[A-Za-z0-9/=-]+?)\s*(?::\s*(MC-[A-Za-z0-9/=-]+?))?\s*(?:\(|$|:|\s—)/.exec(line)
    if (heading) groups.push(heading[2] ? [heading[1], heading[2]] : [heading[1]])
    const row = /^\|\s*(MC-[A-Z][A-Za-z0-9/=-]{3,})\s*\|/.exec(line)
    if (row) groups.push([row[1]])
  }
  const seen = new Set<string>()
  return groups.filter((g) => {
    const k = normalise(g[0])
    if (seen.has(k)) return false
    seen.add(k)
    return true
  })
}

function coverage(probes: ReadonlyArray<{ conceptId: string; targetedMisconceptions?: readonly string[] }>) {
  const concepts = [...new Set(probes.map((p) => p.conceptId))]
  let documented = 0
  const unprobed: string[] = []
  for (const conceptId of concepts) {
    const groups = misconceptionGroups(conceptId)
    if (!groups.length) continue
    const tagged = new Set(
      probes
        .filter((p) => p.conceptId === conceptId)
        .flatMap((p) => (p.targetedMisconceptions ?? []).map((t) => normalise(String(t).split(':').pop()!))),
    )
    for (const g of groups) {
      documented++
      if (!g.some((id) => tagged.has(normalise(id)))) unprobed.push(`${conceptId}:${g[0]}`)
    }
  }
  return { documented, unprobed }
}

const physics = [...SEED_PROBES, ...AUTHORED_PROBES].filter((p) => p.conceptId.startsWith('phys.'))

describe('S2 — physics misconception coverage ratchet', () => {
  it('unprobed documented misconceptions do not exceed the known residue', () => {
    // RATCHET. 54 -> 39 (phys.mod) -> 27 (phys.qm) -> 19 (phys.stat) ->
    // 12 (phys.rel, 7 concepts). Ratchets only go DOWN. phys.rel is now at
    // ZERO too. The remaining 12 are astro 6, opt 3, meas 2, mech 1.
    expect(coverage(physics).unprobed.length).toBeLessThanOrEqual(12)
  })

  it('chemistry S2 stays complete at zero unprobed', () => {
    // Measured at 537/537. Asserted strictly rather than as a ceiling: a
    // regression here would be a real loss, not a slower ratchet.
    expect(coverage(CHEMISTRY_PROBES).unprobed).toEqual([])
  })

  it('is non-vacuous — the corpus really is being read', () => {
    const { documented } = coverage(physics)
    expect(documented).toBeGreaterThanOrEqual(600)
  })
})

describe('S2 — the phys.mod batch stays covered', () => {
  /**
   * SLOT SAFETY is the load-bearing property here, not the coverage number.
   * canonicalSlug is conceptId:probeKind:lang:band[:difficulty], and difficulty
   * is appended only to slots holding MORE than one probe. Adding a probe to an
   * occupied singleton slot therefore RE-IDENTIFIES an existing production row.
   * Every probe in this batch went into `true_false`, free in all 53 targets,
   * so each stays a fresh singleton — the technique chemistrySeedAssets.ts
   * already documents ("probeKind 'true_false' keeps this slot a SINGLETON").
   */
  const covered: ReadonlyArray<readonly [string, string]> = [
    ['phys.mod.atomic-spectra', 'MC-4'],
    ['phys.mod.binding-energy', 'MC-4'],
    ['phys.mod.bohr-model', 'MC-4'],
    ['phys.mod.compton-effect', 'MC-4'],
    ['phys.mod.de-broglie', 'MC-4'],
    ['phys.mod.nuclear-fission', 'MC-3'],
    ['phys.mod.nuclear-fusion', 'MC-4'],
    ['phys.mod.nuclear-models', 'MC-3'],
    ['phys.mod.nuclear-reactions', 'MC-4'],
    ['phys.mod.photoelectric-effect', 'MC-4'],
    ['phys.mod.photons', 'MC-4'],
    ['phys.mod.radioactive-decay', 'MC-4'],
    ['phys.mod.radioactivity', 'MC-4'],
    ['phys.mod.wave-particle-duality', 'MC-4'],
    ['phys.mod.x-rays', 'MC-4'],
  ]

  it.each(covered)('%s %s now has a probe that claims it', (conceptId, mc) => {
    const ids = physics
      .filter((p) => p.conceptId === conceptId)
      .flatMap((p) => p.targetedMisconceptions ?? [])
    expect(ids).toContain(`${conceptId}:${mc}`)
  })

  it.each(covered)('%s: the new probe sits in a FREE singleton slot', (conceptId) => {
    // The defect this prevents: adding a probe to an occupied (kind, band)
    // slot silently re-identifies a row that may already be seeded.
    const mine = physics.filter((p) => p.conceptId === conceptId) as ReadonlyArray<{
      probeKind: string
      gradeBand: string
    }>
    const slots = new Map<string, number>()
    for (const p of mine) {
      const k = `${p.probeKind}|${p.gradeBand}`
      slots.set(k, (slots.get(k) ?? 0) + 1)
    }
    for (const [k, n] of slots) if (k.startsWith('true_false|')) expect(n, k).toBe(1)
  })

  it('every new probe diagnoses its misconception with a mapped distractor', () => {
    // S2 coverage without S4 quality would just be a number. Each new probe
    // must offer a wrong option that STATES the tagged belief, so it can
    // actually detect it rather than merely name it.
    const failures: string[] = []
    for (const [conceptId, mc] of covered) {
      const p = physics.find(
        (x) =>
          x.conceptId === conceptId &&
          (x as unknown as { probeKind: string }).probeKind === 'true_false',
      ) as unknown as { choices?: ReadonlyArray<{ isCorrect?: boolean; misconceptionId?: string }> } | undefined
      if (!p) { failures.push(`${conceptId}: no true_false probe`); continue }
      const mapped = (p.choices ?? []).filter((c) => c.misconceptionId === `${conceptId}:${mc}`)
      if (!mapped.length) failures.push(`${conceptId}: no distractor mapped to ${mc}`)
      if (mapped.some((c) => c.isCorrect)) failures.push(`${conceptId}: mapped the CORRECT choice`)
    }
    expect(failures).toEqual([])
  })
})

describe('S2 — the phys.qm batch stays covered', () => {
  /**
   * phys.qm reached ZERO unprobed with this batch — the first physics domain
   * to do so under S2. Every one of these twelve concepts held exactly
   * mcq×2 + misconception_probe×1 and nothing in `true_false`, so each new
   * probe lands in a free slot and stays a SINGLETON, leaving every existing
   * canonicalSlug untouched (see the slot-safety note in the block above).
   */
  const covered: ReadonlyArray<readonly [string, string]> = [
    ['phys.qm.harmonic-oscillator-qm', 'MC-4'],
    ['phys.qm.hydrogen-atom-qm', 'MC-4'],
    ['phys.qm.operators', 'MC-4'],
    ['phys.qm.particle-in-box', 'MC-4'],
    ['phys.qm.pauli-exclusion', 'MC-4'],
    ['phys.qm.perturbation-theory', 'MC-4'],
    ['phys.qm.quantum-tunneling', 'MC-4'],
    ['phys.qm.schrodinger-equation', 'MC-4'],
    ['phys.qm.selection-rules', 'MC-4'],
    ['phys.qm.spin', 'MC-4'],
    ['phys.qm.uncertainty-principle', 'MC-4'],
    ['phys.qm.wave-function', 'MC-4'],
  ]

  it('phys.qm has NO unprobed documented misconception left', () => {
    // Asserted strictly, not as a ceiling: this domain is complete, and a
    // regression here would be a real loss rather than a slower ratchet.
    const left = coverage(physics).unprobed.filter((u) => u.startsWith('phys.qm.'))
    expect(left).toEqual([])
  })

  it.each(covered)('%s %s now has a probe that claims it', (conceptId, mc) => {
    const ids = physics
      .filter((p) => p.conceptId === conceptId)
      .flatMap((p) => p.targetedMisconceptions ?? [])
    expect(ids).toContain(`${conceptId}:${mc}`)
  })

  it.each(covered)('%s: the new probe sits in a FREE singleton slot', (conceptId) => {
    const mine = physics.filter((p) => p.conceptId === conceptId) as ReadonlyArray<{
      probeKind: string
      gradeBand: string
    }>
    const slots = new Map<string, number>()
    for (const p of mine) {
      const k = `${p.probeKind}|${p.gradeBand}`
      slots.set(k, (slots.get(k) ?? 0) + 1)
    }
    for (const [k, n] of slots) if (k.startsWith('true_false|')) expect(n, k).toBe(1)
  })

  it('every new probe diagnoses its misconception with a mapped distractor', () => {
    // Coverage without diagnosis would just be a number: each probe must offer
    // a WRONG option that states the tagged belief, so it can detect it.
    const failures: string[] = []
    for (const [conceptId, mc] of covered) {
      const p = physics.find(
        (x) =>
          x.conceptId === conceptId &&
          (x as unknown as { probeKind: string }).probeKind === 'true_false',
      ) as unknown as { choices?: ReadonlyArray<{ isCorrect?: boolean; misconceptionId?: string }> } | undefined
      if (!p) { failures.push(`${conceptId}: no true_false probe`); continue }
      const mapped = (p.choices ?? []).filter((c) => c.misconceptionId === `${conceptId}:${mc}`)
      if (!mapped.length) failures.push(`${conceptId}: no distractor mapped to ${mc}`)
      if (mapped.some((c) => c.isCorrect)) failures.push(`${conceptId}: mapped the CORRECT choice`)
    }
    expect(failures).toEqual([])
  })
})

describe('S2 — the phys.stat batch stays covered', () => {
  /**
   * phys.stat reached ZERO unprobed with this batch, and is the third physics
   * domain to do so under S2 after phys.mod and phys.qm. All eight remaining
   * concepts held exactly mcq × 2 + misconception_probe × 1 and nothing in
   * `true_false`, verified before authoring; every new probe lands in a free
   * slot and stays a SINGLETON, leaving every existing canonicalSlug
   * untouched (see the slot-safety note in the batches above).
   */
  const covered: ReadonlyArray<readonly [string, string]> = [
    ['phys.stat.boltzmann-factor', 'MC-4'],
    ['phys.stat.bose-einstein', 'MC-3'],
    ['phys.stat.entropy-statistical', 'MC-2'],
    ['phys.stat.fermi-dirac', 'MC-3'],
    ['phys.stat.free-energy', 'MC-3'],
    ['phys.stat.maxwell-boltzmann', 'MC-2'],
    ['phys.stat.partition-function', 'MC-3'],
    ['phys.stat.probability-basics', 'MC-4'],
  ]

  it('phys.stat has NO unprobed documented misconception left', () => {
    // Asserted strictly, not as a ceiling: this domain is complete, and a
    // regression here would be a real loss rather than a slower ratchet.
    const left = coverage(physics).unprobed.filter((u) => u.startsWith('phys.stat.'))
    expect(left).toEqual([])
  })

  it.each(covered)('%s %s now has a probe that claims it', (conceptId, mc) => {
    const ids = physics
      .filter((p) => p.conceptId === conceptId)
      .flatMap((p) => p.targetedMisconceptions ?? [])
    expect(ids).toContain(`${conceptId}:${mc}`)
  })

  it.each(covered)('%s: the new probe sits in a FREE singleton slot', (conceptId) => {
    const mine = physics.filter((p) => p.conceptId === conceptId) as ReadonlyArray<{
      probeKind: string
      gradeBand: string
    }>
    const slots = new Map<string, number>()
    for (const p of mine) {
      const k = `${p.probeKind}|${p.gradeBand}`
      slots.set(k, (slots.get(k) ?? 0) + 1)
    }
    for (const [k, n] of slots) if (k.startsWith('true_false|')) expect(n, k).toBe(1)
  })

  it('every new probe diagnoses its misconception with a mapped distractor', () => {
    // The same S4-in-miniature check the prior batches carry: each new probe
    // must offer a WRONG option that STATES the tagged belief, so it can
    // detect it rather than merely name it.
    const failures: string[] = []
    for (const [conceptId, mc] of covered) {
      const p = physics.find(
        (x) =>
          x.conceptId === conceptId &&
          (x as unknown as { probeKind: string }).probeKind === 'true_false',
      ) as unknown as { choices?: ReadonlyArray<{ isCorrect?: boolean; misconceptionId?: string }> } | undefined
      if (!p) { failures.push(`${conceptId}: no true_false probe`); continue }
      const mapped = (p.choices ?? []).filter((c) => c.misconceptionId === `${conceptId}:${mc}`)
      if (!mapped.length) failures.push(`${conceptId}: no distractor mapped to ${mc}`)
      if (mapped.some((c) => c.isCorrect)) failures.push(`${conceptId}: mapped the CORRECT choice`)
    }
    expect(failures).toEqual([])
  })
})

describe('S2 — the phys.rel batch stays covered', () => {
  /**
   * phys.rel reached ZERO unprobed with this batch, the fourth physics
   * domain to do so under S2 after phys.mod, phys.qm and phys.stat. All
   * seven remaining concepts held exactly mcq × 2 + misconception_probe × 1
   * and nothing in `true_false`, verified before authoring; every new probe
   * lands in a free slot and stays a SINGLETON, leaving every existing
   * canonicalSlug untouched (see the slot-safety note in the batches above).
   */
  const covered: ReadonlyArray<readonly [string, string]> = [
    ['phys.rel.length-contraction', 'MC-4'],
    ['phys.rel.lorentz-transform', 'MC-4'],
    ['phys.rel.mass-energy', 'MC-4'],
    ['phys.rel.postulates', 'MC-4'],
    ['phys.rel.relativistic-momentum', 'MC-4'],
    ['phys.rel.spacetime', 'MC-3'],
    ['phys.rel.time-dilation', 'MC-3'],
  ]

  it('phys.rel has NO unprobed documented misconception left', () => {
    const left = coverage(physics).unprobed.filter((u) => u.startsWith('phys.rel.'))
    expect(left).toEqual([])
  })

  it.each(covered)('%s %s now has a probe that claims it', (conceptId, mc) => {
    const ids = physics
      .filter((p) => p.conceptId === conceptId)
      .flatMap((p) => p.targetedMisconceptions ?? [])
    expect(ids).toContain(`${conceptId}:${mc}`)
  })

  it.each(covered)('%s: the new probe sits in a FREE singleton slot', (conceptId) => {
    const mine = physics.filter((p) => p.conceptId === conceptId) as ReadonlyArray<{
      probeKind: string
      gradeBand: string
    }>
    const slots = new Map<string, number>()
    for (const p of mine) {
      const k = `${p.probeKind}|${p.gradeBand}`
      slots.set(k, (slots.get(k) ?? 0) + 1)
    }
    for (const [k, n] of slots) if (k.startsWith('true_false|')) expect(n, k).toBe(1)
  })

  it('every new probe diagnoses its misconception with a mapped distractor', () => {
    const failures: string[] = []
    for (const [conceptId, mc] of covered) {
      const p = physics.find(
        (x) =>
          x.conceptId === conceptId &&
          (x as unknown as { probeKind: string }).probeKind === 'true_false',
      ) as unknown as { choices?: ReadonlyArray<{ isCorrect?: boolean; misconceptionId?: string }> } | undefined
      if (!p) { failures.push(`${conceptId}: no true_false probe`); continue }
      const mapped = (p.choices ?? []).filter((c) => c.misconceptionId === `${conceptId}:${mc}`)
      if (!mapped.length) failures.push(`${conceptId}: no distractor mapped to ${mc}`)
      if (mapped.some((c) => c.isCorrect)) failures.push(`${conceptId}: mapped the CORRECT choice`)
    }
    expect(failures).toEqual([])
  })
})
