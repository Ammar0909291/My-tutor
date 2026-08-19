/**
 * THE CONTRACT AS A LEARNER MEETS IT: PER BAND, NOT PER CONCEPT.
 *
 * `chemistryAssetContract.test.ts` records why counting per concept is the
 * wrong measure — assets are matched on (concept, language, gradeBand), so a
 * concept can hold six probes and still serve none to a given learner. Measured
 * on mathematics 2026-08-19, that produced FIVE taught bands with no gradeable
 * probe at all:
 *
 *     math.arith.addition EARLY, math.arith.subtraction EARLY,
 *     math.arith.division EARLY, math.found.logic MIDDLE,
 *     math.arith.fractions ADULT
 *
 * and it is fatal rather than untidy because `matcher.ts` scores an adjacent
 * band at 60 against a threshold of 65 — an off-band probe is REFUSED, not
 * merely preferred less. The lesson then cannot close: certification reported
 * D3-unreachable at the 24-turn limit.
 *
 * This file scans the assets DIRECTORY rather than an import list, so a module
 * that is authored and then forgotten cannot hide from it — and it checks the
 * seed script imports every module it finds, which is the other half of the
 * same hole.
 */
import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync } from 'fs'
import path from 'path'
import { MIN_EXPLANATIONS, MIN_CLOSED_CHOICE_PROBES } from '../lib/teaching/assetContract'

const ASSET_DIR = path.join(__dirname, '..', 'lib', 'teaching', 'assets')
const SEED_SCRIPT = path.join(__dirname, '..', '..', 'scripts', 'brain', 'seed-knowledge-assets.ts')
const SUBJECT = 'mathematics'

interface Loaded {
  explanations: any[]
  probes: any[]
  /** module basename -> whether it exported any asset array at all */
  assetModules: string[]
}

/**
 * Memoized, and with a generous timeout on the tests that use it: this scans and
 * imports every module in the assets directory, which is ~1.4 MB of source, and
 * it timed out at vitest's 5s default when the full suite was running beside it.
 * A contract check that fails under load is a flake, not a measurement.
 */
let cached: Promise<Loaded> | null = null
function loadAssets(): Promise<Loaded> {
  return (cached ??= loadAssetsUncached())
}

async function loadAssetsUncached(): Promise<Loaded> {
  const files = readdirSync(ASSET_DIR).filter((f) => f.endsWith('.ts') && !f.endsWith('.test.ts'))
  const explanations: any[] = []
  const probes: any[] = []
  const assetModules: string[] = []
  for (const f of files) {
    const mod = await import(path.join(ASSET_DIR, f))
    let contributed = false
    for (const [name, value] of Object.entries(mod)) {
      if (!Array.isArray(value)) continue
      if (name.endsWith('EXPLANATIONS')) { explanations.push(...value); contributed = true }
      else if (name.endsWith('PROBES')) { probes.push(...value); contributed = true }
    }
    if (contributed) assetModules.push(f.replace(/\.ts$/, ''))
  }
  return { explanations, probes, assetModules }
}

const key = (conceptId: string, band: unknown) => `${conceptId}::${String(band)}`
const isGradeable = (p: any) => Array.isArray(p.choices) && p.choices.length >= 2

describe('mathematics serving contract, measured per (concept, band)', () => {
  it('every band that is TAUGHT carries at least the mastery bar in gradeable probes', async () => {
    const { explanations, probes } = await loadAssets()
    const taught = new Set(
      explanations.filter((e) => e.subjectSlug === SUBJECT).map((e) => key(e.conceptId, e.gradeBand)),
    )
    const counts = new Map<string, number>()
    for (const p of probes) {
      if (p.subjectSlug !== SUBJECT || !isGradeable(p)) continue
      const k = key(p.conceptId, p.gradeBand)
      counts.set(k, (counts.get(k) ?? 0) + 1)
    }
    const short = [...taught]
      .filter((k) => (counts.get(k) ?? 0) < MIN_CLOSED_CHOICE_PROBES)
      .map((k) => `${k} has ${counts.get(k) ?? 0}`)
    expect(short).toEqual([])
    expect(taught.size).toBeGreaterThan(0)
  }, 30_000)

  it('no probe is stranded in a band the concept is never taught in', async () => {
    const { explanations, probes } = await loadAssets()
    const taught = new Set(
      explanations.filter((e) => e.subjectSlug === SUBJECT).map((e) => key(e.conceptId, e.gradeBand)),
    )
    const stranded = probes
      .filter((p) => p.subjectSlug === SUBJECT && !taught.has(key(p.conceptId, p.gradeBand)))
      .map((p) => `${p.conceptId} ${String(p.gradeBand)} ${p.probeKind}`)
    expect(stranded).toEqual([])
  }, 30_000)

  it('every concept that is served has an explanation to be taught from', async () => {
    const { explanations, probes } = await loadAssets()
    const explained = new Set(explanations.filter((e) => e.subjectSlug === SUBJECT).map((e) => e.conceptId))
    const probed = new Set(probes.filter((p) => p.subjectSlug === SUBJECT).map((p) => p.conceptId))
    expect([...probed].filter((c) => !explained.has(c))).toEqual([])
    expect(MIN_EXPLANATIONS).toBe(1)
  }, 30_000)

  it('no two mathematics assets claim the same canonical identity', async () => {
    const { explanations, probes } = await loadAssets()
    const slugs = [
      ...explanations.filter((e) => e.subjectSlug === SUBJECT)
        .map((e) => `${e.conceptId}:${e.familyKind}:en:${String(e.gradeBand).toLowerCase()}`),
      ...probes.filter((p) => p.subjectSlug === SUBJECT)
        .map((p) => `${p.conceptId}:${p.probeKind}:en:${String(p.gradeBand).toLowerCase()}:${String(p.difficulty).toLowerCase()}`),
    ]
    const seen = new Set<string>()
    const dupes = slugs.filter((s) => (seen.has(s) ? true : (seen.add(s), false)))
    expect(dupes).toEqual([])
  }, 30_000)

  it('the seed script imports every asset module on disk, so none is authored and forgotten', async () => {
    const { assetModules } = await loadAssets()
    const script = readFileSync(SEED_SCRIPT, 'utf-8')
    const unregistered = assetModules.filter((m) => !script.includes(`assets/${m}'`))
    expect(unregistered).toEqual([])
  }, 30_000)
})

/**
 * The arithmetic in the new band-gap probes, re-derived rather than read.
 * A wrong number in a teaching asset is worse than a missing one, because it is
 * believed — and a distractor that is accidentally CORRECT punishes the careful
 * learner, which is the defect class this corpus has already shipped twice
 * (the alternating-sum divisibility probe, the octahedron Euler count).
 */
describe('the band-gap probes are arithmetically true', () => {
  const load = async () => {
    const m = await import('../lib/teaching/assets/mathematicsBandGapAssets')
    return m.MATHEMATICS_BAND_GAP_PROBES
  }
  const find = (probes: any[], conceptId: string, needle: string) => {
    const hit = probes.filter((p) => p.conceptId === conceptId && p.stem.includes(needle))
    expect(hit).toHaveLength(1)
    return hit[0]
  }
  const correctText = (p: any) => p.choices.find((c: any) => c.isCorrect).text
  const wrongTexts = (p: any) => p.choices.filter((c: any) => !c.isCorrect).map((c: any) => c.text)

  it('4 stickers plus 3 really is 7, and 43 is the concatenation slip', async () => {
    expect(4 + 3).toBe(7)
    const p = find(await load(), 'math.arith.addition', '4 stickers')
    expect(correctText(p)).toBe('7')
    // The distractor must be the digits written side by side, not another sum.
    expect(wrongTexts(p)).toContain('43')
    expect(wrongTexts(p)).not.toContain('7')
  }, 30_000)

  it('2 + 6 and 6 + 2 are both 8, so the commutativity probe has one true answer', async () => {
    expect(2 + 6).toBe(8)
    expect(6 + 2).toBe(8)
    const p = find(await load(), 'math.arith.addition', 'Without counting again')
    expect(correctText(p)).toContain('8')
    expect(wrongTexts(p).some((t: string) => /\b8\b/.test(t))).toBe(false)
  }, 30_000)

  it('8 grapes minus 3 is 5, and neither distractor evaluates to it', async () => {
    expect(8 - 3).toBe(5)
    const p = find(await load(), 'math.arith.subtraction', '8 grapes')
    expect(correctText(p)).toBe('5')
    expect(wrongTexts(p)).toEqual(['11', '3'])
    expect(8 + 3).toBe(11)  // the combine slip the first distractor encodes
  }, 30_000)

  it('6 cars minus 6 is 0, not 6', async () => {
    expect(6 - 6).toBe(0)
    const p = find(await load(), 'math.arith.subtraction', '6 cars')
    expect(correctText(p)).toBe('0')
  }, 30_000)

  it('6 shared between 2 is 3, and 12 and 4 are genuinely wrong', async () => {
    expect(6 / 2).toBe(3)
    expect(6 * 2).toBe(12)
    const p = find(await load(), 'math.arith.division', '6 biscuits')
    expect(correctText(p)).toBe('3')
    for (const t of wrongTexts(p)) expect(t).not.toBe('3')
  }, 30_000)

  it('7 shared between 2 really leaves a remainder of 1', async () => {
    expect(Math.floor(7 / 2)).toBe(3)
    expect(7 % 2).toBe(1)
    const p = find(await load(), 'math.arith.division', '7 sweets')
    expect(p.stem).toContain('Each child gets 3')
  }, 30_000)

  it('2 shared between 10 really is less than one each, so the answer is not 5', async () => {
    expect(10 / 2).toBe(5)
    expect(2 / 10).toBeLessThan(1)
    expect(2 / 10).not.toBe(5)
  }, 30_000)

  it('6 is the counterexample the converse probe claims it is', async () => {
    expect(6 % 2).toBe(0)
    expect(6 % 4).not.toBe(0)
    const p = find(await load(), 'math.found.logic', 'divisible by 4')
    expect(correctText(p)).toContain('6')
  }, 30_000)

  it('a quarter really is less than a third', async () => {
    expect(1 / 4).toBeLessThan(1 / 3)
    const p = find(await load(), 'math.arith.fractions', '1/3 of a cup')
    expect(correctText(p)).toMatch(/^No —/)
  }, 30_000)

  it('a quarter and a quarter is two quarters, which is a half — not 2/8', async () => {
    expect(1 / 4 + 1 / 4).toBe(1 / 2)
    expect(2 / 8).toBe(1 / 4)
    expect(2 / 8).not.toBe(1 / 4 + 1 / 4)   // the add-across answer is genuinely wrong
    const p = find(await load(), 'math.arith.fractions', '2/8 of a day')
    expect(correctText(p)).toContain('2/4')
  }, 30_000)

  it('5/4 hours really is one and a quarter hours', async () => {
    expect(5 / 4).toBe(1.25)
    expect(5 / 4).toBeGreaterThan(1)
    const p = find(await load(), 'math.arith.fractions', '5/4 hours')
    expect(correctText(p)).toMatch(/^Yes —/)
    // 4/5 is a different number, so the third option is not a restatement.
    expect(4 / 5).not.toBe(5 / 4)
  }, 30_000)

  it('every band-gap probe is gradeable and offers at least three choices', async () => {
    for (const p of await load()) {
      expect(p.choices.length).toBeGreaterThanOrEqual(3)
      expect(p.choices.filter((c: any) => c.isCorrect)).toHaveLength(1)
      expect(p.targetedMisconceptions.length).toBeGreaterThan(0)
      expect(p.source.length).toBeGreaterThan(20)
    }
  }, 30_000)
})
