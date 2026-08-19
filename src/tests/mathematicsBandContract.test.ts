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

async function loadAssets(): Promise<Loaded> {
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
  })

  it('no probe is stranded in a band the concept is never taught in', async () => {
    const { explanations, probes } = await loadAssets()
    const taught = new Set(
      explanations.filter((e) => e.subjectSlug === SUBJECT).map((e) => key(e.conceptId, e.gradeBand)),
    )
    const stranded = probes
      .filter((p) => p.subjectSlug === SUBJECT && !taught.has(key(p.conceptId, p.gradeBand)))
      .map((p) => `${p.conceptId} ${String(p.gradeBand)} ${p.probeKind}`)
    expect(stranded).toEqual([])
  })

  it('every concept that is served has an explanation to be taught from', async () => {
    const { explanations, probes } = await loadAssets()
    const explained = new Set(explanations.filter((e) => e.subjectSlug === SUBJECT).map((e) => e.conceptId))
    const probed = new Set(probes.filter((p) => p.subjectSlug === SUBJECT).map((p) => p.conceptId))
    expect([...probed].filter((c) => !explained.has(c))).toEqual([])
    expect(MIN_EXPLANATIONS).toBe(1)
  })

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
  })

  it('the seed script imports every asset module on disk, so none is authored and forgotten', async () => {
    const { assetModules } = await loadAssets()
    const script = readFileSync(SEED_SCRIPT, 'utf-8')
    const unregistered = assetModules.filter((m) => !script.includes(`assets/${m}'`))
    expect(unregistered).toEqual([])
  })
})
