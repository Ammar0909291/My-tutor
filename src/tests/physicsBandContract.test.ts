/**
 * PHYSICS SERVING CONTRACT, MEASURED PER (concept, gradeBand).
 *
 * Physics was the subject `assetContract.ts` cites as ALREADY meeting the bar —
 * "745 closed-choice probes across 238 concepts, ~3.13 each" — and it used that
 * to argue the shortfall elsewhere was a seed-template property rather than a
 * subject property. That per-CONCEPT average was true and hid 23 short pairs,
 * 21 of them with zero gradeable probes at the band being taught, across the
 * first eleven concepts a physics learner ever meets.
 *
 * `matcher.ts` scores an adjacent band at 60 against a threshold of 65, so an
 * off-band probe is REFUSED. A MIDDLE learner was taught force and could not be
 * asked a single gradeable question about it.
 *
 * This file is the guard mathematics has had since 2026-08-19 and physics did
 * not. It scans the assets DIRECTORY rather than an import list, so a module
 * that is authored and then forgotten cannot hide from it.
 */
import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync } from 'fs'
import path from 'path'
import { MIN_EXPLANATIONS, MIN_CLOSED_CHOICE_PROBES } from '../lib/teaching/assetContract'

const ASSET_DIR = path.join(__dirname, '..', 'lib', 'teaching', 'assets')
const SEED_SCRIPT = path.join(__dirname, '..', '..', 'scripts', 'brain', 'seed-knowledge-assets.ts')
const BOOTSTRAP = path.join(__dirname, '..', 'instrumentation.ts')
const SUBJECT = 'physics'

let cached: Promise<{ explanations: any[]; probes: any[]; assetModules: string[] }> | null = null
const loadAssets = () => (cached ??= (async () => {
  const files = readdirSync(ASSET_DIR).filter((f) => f.endsWith('.ts') && !f.endsWith('.test.ts'))
  const explanations: any[] = []; const probes: any[] = []; const assetModules: string[] = []
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
})())

const key = (c: string, b: unknown) => `${c}::${String(b)}`
const isGradeable = (p: any) => Array.isArray(p.choices) && p.choices.length >= 2

describe('physics serving contract, per (concept, band)', () => {
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
    expect(taught.size).toBeGreaterThan(250)
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
    expect(MIN_EXPLANATIONS).toBe(1)
  }, 30_000)

  it('no two physics assets claim the same canonical identity', async () => {
    const { probes } = await loadAssets()
    const slugs = probes.filter((p) => p.subjectSlug === SUBJECT)
      .map((p) => `${p.conceptId}:${p.probeKind}:en:${String(p.gradeBand).toLowerCase()}:${String(p.difficulty).toLowerCase()}`)
    const seen = new Set<string>()
    expect(slugs.filter((s) => (seen.has(s) ? true : (seen.add(s), false)))).toEqual([])
  }, 30_000)

  it('the band-gap module is registered with BOTH writers, not just the script', async () => {
    // Chemistry's 314 probes were authored, in git, and unreachable for months
    // because the only writer that had ever seeded them needs a DATABASE_URL no
    // session in this environment has. The cold-start bootstrap is the writer
    // that actually reaches production, and physics content lives in
    // authoredSeedAssets, which is already in its corpus — so omitting these
    // from it would reproduce that failure exactly.
    expect(readFileSync(SEED_SCRIPT, 'utf-8')).toContain('PHYSICS_BAND_GAP_PROBES')
    const boot = readFileSync(BOOTSTRAP, 'utf-8')
    expect(boot).toContain("assets/physicsBandGapAssets")
    expect(boot).toContain('...PHYSICS_BAND_GAP_PROBES]')
  })

  it('the seed script imports every asset module on disk', async () => {
    const { assetModules } = await loadAssets()
    const script = readFileSync(SEED_SCRIPT, 'utf-8')
    expect(assetModules.filter((m) => !script.includes(`assets/${m}'`))).toEqual([])
  }, 30_000)
})

/**
 * The arithmetic, RE-DERIVED rather than read back.
 *
 * A wrong number in a teaching asset is worse than a missing one, because it is
 * believed — and a distractor that is accidentally CORRECT punishes the careful
 * learner. This corpus has shipped that defect twice before (an 11-rule
 * distractor that was a valid alternative method; an octahedron Euler count
 * that evaluated correctly). Every quantitative probe in the band-gap set is
 * recomputed here from its own premises.
 */
describe('the physics band-gap probes are arithmetically true', () => {
  const load = async () => {
    const { PHYSICS_BAND_GAP_PROBES } = await import('../lib/teaching/assets/physicsBandGapAssets')
    return PHYSICS_BAND_GAP_PROBES as any[]
  }
  const find = (probes: any[], fragment: string) => {
    const hit = probes.filter((p) => p.stem.includes(fragment))
    expect(hit.length, `expected exactly one probe containing "${fragment}"`).toBe(1)
    return hit[0]
  }
  const correctText = (p: any) => p.choices.find((c: any) => c.isCorrect).text

  it('acceleration: Δv/Δt = (30 − 12)/6 = 3 m/s², and the 5 distractor is v/t', async () => {
    const p = find(await load(), 'from 12 m/s to 30 m/s in 6 seconds')
    expect((30 - 12) / 6).toBe(3)
    expect(30 / 6).toBe(5)               // the named MC-ACCELERATION-IS-SPEED slip
    expect(correctText(p)).toContain('3 m/s²')
    expect(p.choices.filter((c: any) => c.isCorrect)).toHaveLength(1)
  })

  it('velocity: 4 km in 2 minutes is 120 km/h, and the lap displacement is zero', async () => {
    const p = find(await load(), 'one full lap of a 4 km circuit in 2 minutes')
    expect(4 / (2 / 60)).toBe(120)
    expect(correctText(p)).toContain('120 km/h')
    expect(correctText(p)).toContain('zero')
  })

  it('displacement: 8 east then 3 west is +5, while the DISTANCE is 11', async () => {
    const p = find(await load(), 'walk 8 m east, then 3 m west')
    expect(8 - 3).toBe(5)
    expect(8 + 3).toBe(11)               // the distance, offered as the distractor
    expect(correctText(p)).toBe('5 m east')
    expect(p.choices.some((c: any) => !c.isCorrect && c.text.startsWith('11 m'))).toBe(true)
  })

  it("Newton's Second Law: 3000/1500 = 2 but 300/60 = 5 — the cyclist wins", async () => {
    const p = find(await load(), 'A 1500 kg car and a 60 kg cyclist')
    expect(3000 / 1500).toBe(2)
    expect(300 / 60).toBe(5)
    expect(5).toBeGreaterThan(2)
    expect(correctText(p)).toContain('cyclist')
  })

  it('net force: 20 N forward against 8 N friction is 12 N, not 20 and not 8', async () => {
    const p = find(await load(), 'push a box forward with 20 N')
    expect(20 - 8).toBe(12)
    expect(correctText(p)).toContain('12 N')
  })

  it('momentum: lorry 1000 × 2 = 2000 beats ball 0.1 × 50 = 5', async () => {
    const p = find(await load(), 'A 1000 kg lorry rolls at 2 m/s')
    expect(1000 * 2).toBe(2000)
    expect(0.1 * 50).toBe(5)
    expect(2000).toBeGreaterThan(5)
    expect(correctText(p)).toContain('lorry')
  })

  it('momentum: 4 × 3 = 12, and the 7 distractor is the additive slip', async () => {
    const p = find(await load(), 'A 4 kg skateboard rolls at 3 m/s')
    expect(4 * 3).toBe(12)
    expect(4 + 3).toBe(7)
    expect(correctText(p)).toBe('12 kg·m/s')
  })

  it('momentum: +6 and −6 sum to zero, while adding magnitudes gives the 12 distractor', async () => {
    const p = find(await load(), 'A 2 kg ball moving right at 3 m/s')
    expect(2 * 3 + -2 * 3).toBe(0)
    expect(Math.abs(2 * 3) + Math.abs(-2 * 3)).toBe(12)
    expect(correctText(p)).toContain('Zero')
  })

  it('kinematics: v = 0 + 2(5) = 10 and s = ½(2)(25) = 25, with 50 as the rectangle error', async () => {
    const p = find(await load(), 'accelerates uniformly from rest at 2 m/s² for 5 s')
    const v = 0 + 2 * 5
    const s = 0 * 5 + 0.5 * 2 * 5 ** 2
    expect(v).toBe(10)
    expect(s).toBe(25)
    expect(v * 5).toBe(50)               // the whole rectangle instead of the triangle
    expect(correctText(p)).toContain('25 m')
  })

  it('kinetic energy: doubling v quadruples ½mv², it does not double it', async () => {
    const p = find(await load(), 'A car doubles its speed')
    const ke = (m: number, v: number) => 0.5 * m * v ** 2
    expect(ke(1, 2) / ke(1, 1)).toBe(4)
    expect(correctText(p)).toContain('quadruples')
  })

  it('kinetic energy: (−5)² equals (+5)², so the energy cannot be negative', async () => {
    const p = find(await load(), 'moves LEFTWARD at 5 m/s')
    expect((-5) ** 2).toBe(5 ** 2)
    expect((-5) ** 2).toBeGreaterThan(0)
    expect(correctText(p)).toContain('No')
  })

  it("Hooke's law: 2 N → 4 cm means 6 N → 12 cm, not 8", async () => {
    const p = find(await load(), 'stretches 4 cm when you hang a 2 N weight')
    const k = 2 / 0.04                   // N/m from the stated data point
    expect(6 / k).toBeCloseTo(0.12, 10)  // metres
    expect(6 / k).not.toBeCloseTo(0.08, 10)
    expect(correctText(p)).toBe('12 cm')
  })

  it('every probe has exactly one correct choice and at least two choices', async () => {
    for (const p of await load()) {
      expect(Array.isArray(p.choices), p.stem).toBe(true)
      expect(p.choices.length, p.stem).toBeGreaterThanOrEqual(2)
      expect(p.choices.filter((c: any) => c.isCorrect).length, p.stem).toBe(1)
    }
  })

  it('every distractor misconceptionId is one the concept already carries', async () => {
    // A misconception id pointing at the wrong repair is worse than none —
    // this corpus has shipped that defect once already.
    const probes = await load()
    const { AUTHORED_PROBES } = await import('../lib/teaching/assets/authoredSeedAssets')
    const known = new Map<string, Set<string>>()
    for (const p of AUTHORED_PROBES as any[]) {
      if (p.subjectSlug !== SUBJECT) continue
      const set = known.get(p.conceptId) ?? new Set<string>()
      for (const m of p.targetedMisconceptions ?? []) set.add(m)
      for (const c of p.choices ?? []) if (c.misconceptionId) set.add(c.misconceptionId)
      known.set(p.conceptId, set)
    }
    const unknown: string[] = []
    for (const p of probes) {
      const set = known.get(p.conceptId) ?? new Set<string>()
      for (const id of [...(p.targetedMisconceptions ?? []),
        ...p.choices.map((c: any) => c.misconceptionId).filter(Boolean)]) {
        if (!set.has(id)) unknown.push(`${p.conceptId}: ${id}`)
      }
    }
    expect([...new Set(unknown)]).toEqual([])
  })
})
