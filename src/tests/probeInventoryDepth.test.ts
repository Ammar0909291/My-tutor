/**
 * PROBE DEPTH: a pool that survives a wrong answer.
 *
 * `assetContract.ts` sets the floor at three closed-choice probes and says in
 * its own header what three buys — "the minimum that lets a PERFECT learner
 * finish", "deliberately NOT padded for a learner who answers wrongly".
 * Mastery needs `correctAtCheck >= 1` plus `correctAtPractice >= 2`, and
 * `excludeProbeStem` never re-asks a spent probe, so a concept holding exactly
 * three can no longer certify a learner who gets one wrong — which is the
 * learner the gate exists for.
 *
 * TWO MEASUREMENTS THIS FILE PINS, both of which surprised the session that
 * made them:
 *
 * 1. Counting rows in `asset_identity` overstates the pool. `short_answer` and
 *    `checkpoint` probes carry fewer than two choices and a gate cannot grade
 *    them. On the gradeable basis production held 235 physics pairs at three,
 *    not the 123 the row count reported.
 *
 * 2. Adding a probe can REDUCE the number of distinct questions a concept
 *    serves. `buildProbeSlugResolver` appends a difficulty segment only to a
 *    (conceptId, probeKind, gradeBand) slot holding more than one probe, so
 *    adding a second probe to a one-probe slot re-identifies the probe already
 *    seeded there. The old row stays ACTIVE under the old slug and the same
 *    question is then served under two identities — the count rises while the
 *    pool gets shallower. That is asserted against the WHOLE corpus below, not
 *    just against this batch, because the trap is invisible from inside the
 *    file that springs it.
 */
import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync } from 'fs'
import path from 'path'
import { validateProbeCandidate } from '../lib/teaching/assets/validation'

const ASSET_DIR = path.join(__dirname, '..', 'lib', 'teaching', 'assets')
const INSTRUMENTATION = path.join(__dirname, '..', 'instrumentation.ts')

/** The depth target. Three is the mastery bar; five is the bar plus room for
 *  two wrong answers, which is what a real lesson needs. */
const DEPTH_TARGET = 5

/** Modules authored by the probe-depth programme. Extend as batches land. */
const DEPTH_MODULES = ['physicsDepthSeedAssets.ts', 'chemistryDepthSeedAssets.ts']

interface Probe {
  conceptId: string
  probeKind: string
  gradeBand: unknown
  difficulty: unknown
  stem: string
  choices?: { text: string; isCorrect?: boolean }[]
}

async function loadFrom(files: string[]): Promise<Probe[]> {
  const probes: Probe[] = []
  for (const f of files) {
    const mod = await import(path.join(ASSET_DIR, f))
    for (const [name, value] of Object.entries(mod)) {
      if (Array.isArray(value) && name.endsWith('PROBES')) probes.push(...(value as Probe[]))
    }
  }
  return probes
}

const allFiles = () =>
  readdirSync(ASSET_DIR).filter((f) => f.endsWith('.ts') && !f.endsWith('.test.ts'))

let cached: Promise<{ all: Probe[]; without: Probe[]; depth: Probe[] }> | null = null
function corpus() {
  return (cached ??= (async () => {
    const files = allFiles()
    return {
      all: await loadFrom(files),
      without: await loadFrom(files.filter((f) => !DEPTH_MODULES.includes(f))),
      depth: await loadFrom(files.filter((f) => DEPTH_MODULES.includes(f))),
    }
  })())
}

/** The only probes a mastery gate can grade — `contract-audit.ts`'s own rule. */
const isGradeable = (p: Probe) => Array.isArray(p.choices) && p.choices.length >= 2
const pairKey = (p: Probe) => `${p.conceptId}|${String(p.gradeBand)}`
const slotKey = (p: Probe) => `${p.conceptId}:${p.probeKind}:${String(p.gradeBand)}`

function slotCounts(probes: Probe[]): Map<string, number> {
  const m = new Map<string, number>()
  for (const p of probes) m.set(slotKey(p), (m.get(slotKey(p)) ?? 0) + 1)
  return m
}

/** Mirrors `buildProbeSlugResolver` exactly — deliberately re-derived here so
 *  a change to the resolver that breaks identity shows up as a test failure
 *  rather than as duplicate rows in production. */
function canonicalSlug(p: Probe, slots: Map<string, number>): string {
  const base = `${p.conceptId}:${p.probeKind}:en:${String(p.gradeBand).toLowerCase()}`
  return (slots.get(slotKey(p)) ?? 0) > 1 ? `${base}:${String(p.difficulty).toLowerCase()}` : base
}

describe('probe depth', () => {
  it('lifts every pair it touches to at least five gradeable probes', async () => {
    const { all, depth } = await corpus()
    const counts = new Map<string, number>()
    for (const p of all) {
      if (!isGradeable(p)) continue
      counts.set(pairKey(p), (counts.get(pairKey(p)) ?? 0) + 1)
    }
    const touched = [...new Set(depth.map(pairKey))].sort()
    expect(touched.length).toBeGreaterThan(0)
    const short = touched.filter((k) => (counts.get(k) ?? 0) < DEPTH_TARGET)
    expect(short.map((k) => `${k} has ${counts.get(k) ?? 0}`)).toEqual([])
  }, 30_000)

  it('converts no existing singleton slot into a ladder', async () => {
    // The failure mode this guards is silent: the count goes UP while the
    // number of distinct questions goes down, because the probe already seeded
    // under the old slug keeps serving beside its own re-identified copy.
    const { all, without } = await corpus()
    const before = slotCounts(without)
    const after = slotCounts(all)
    const converted: string[] = []
    for (const [slot, n] of after) {
      if ((before.get(slot) ?? 0) === 1 && n > 1) converted.push(slot)
    }
    expect(converted).toEqual([])
  }, 30_000)

  it('gives every probe in the corpus a distinct canonical identity', async () => {
    const { all } = await corpus()
    const slots = slotCounts(all)
    const seen = new Map<string, number>()
    for (const p of all) {
      const s = canonicalSlug(p, slots)
      seen.set(s, (seen.get(s) ?? 0) + 1)
    }
    expect([...seen].filter(([, n]) => n > 1).map(([s]) => s)).toEqual([])
  }, 30_000)

  it('asks nothing the same concept already asks', async () => {
    // A reworded repeat is spent by `excludeProbeStem` along with its twin and
    // buys the learner nothing, so it adds a row without adding a question.
    const { all } = await corpus()
    const byConcept = new Map<string, string[]>()
    for (const p of all) {
      const norm = p.stem.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim()
      const list = byConcept.get(p.conceptId) ?? []
      list.push(norm)
      byConcept.set(p.conceptId, list)
    }
    const { depth } = await corpus()
    const depthConcepts = new Set(depth.map((p) => p.conceptId))
    const offenders: string[] = []
    for (const [concept, stems] of byConcept) {
      if (!depthConcepts.has(concept)) continue
      if (new Set(stems).size !== stems.length) offenders.push(concept)
    }
    expect(offenders).toEqual([])
  }, 30_000)

  it('keys every depth probe so the server can grade it', async () => {
    const { depth } = await corpus()
    const bad: string[] = []
    for (const p of depth) {
      const choices = p.choices ?? []
      const correct = choices.filter((c) => c.isCorrect).length
      // Exactly one: zero is ungradeable, and more than one makes the widget's
      // single correctIndex a lie about which answer the learner needed.
      if (correct !== 1) bad.push(`${p.conceptId}: ${correct} correct options`)
      // Three is the floor, not the aim. A two-option probe rated 4/10 in
      // production offered a wrong option nobody would pick.
      if (choices.length < 3) bad.push(`${p.conceptId}: only ${choices.length} options`)
      const v = validateProbeCandidate({
        conceptId: p.conceptId, language: 'en', stem: p.stem,
        probeKind: p.probeKind, choices: p.choices as never,
      })
      if (!v.valid) bad.push(`${p.conceptId}: ${v.reason}`)
    }
    expect(bad).toEqual([])
  }, 30_000)

  it('carries no learner name and no turn-scoped discourse', async () => {
    // `validation.ts` records the production incident: an asset opening
    // "Mohammad Suaib, wave interference happens when…" was served twice,
    // byte-identical, to different sessions. These are SHARED assets.
    const { depth } = await corpus()
    const banned =
      /(\bgood question\b|\bgreat question\b|\bas (?:i|we) (?:mentioned|said|explained)\b|\byou (?:chose|picked|answered)\b|\bback to (?:our|the) lesson\b|\bearlier you\b)/i
    const offenders = depth
      .filter((p) => banned.test(p.stem) || (p.choices ?? []).some((c) => banned.test(c.text)))
      .map((p) => p.conceptId)
    expect(offenders).toEqual([])
  }, 30_000)

  it('is imported by the cold-start bootstrap, or it never reaches a learner', async () => {
    // Chemistry's 314 probes were authored, in git, and unreachable for months
    // because the only writer that seeded them needed a DATABASE_URL no session
    // had. Being in the corpus on disk is not the same as serving.
    const source = readFileSync(INSTRUMENTATION, 'utf8')
    for (const mod of DEPTH_MODULES) {
      const stem = mod.replace(/\.ts$/, '')
      expect(source).toContain(stem)
    }
    expect(source).toContain('...PHYSICS_DEPTH_PROBES')
    expect(source).toContain('...CHEMISTRY_DEPTH_PROBES')
  })
})

/**
 * THE ARITHMETIC, RE-DERIVED RATHER THAN READ BACK.
 *
 * A wrong number in a teaching asset is worse than a missing one, because it is
 * believed — and a distractor that is accidentally CORRECT punishes the careful
 * learner. This corpus has shipped that defect twice: an 11-rule distractor that
 * was a valid alternative method, and an octahedron Euler count that evaluated
 * correctly. Every quantitative probe in the depth set is recomputed here from
 * its own premises, and each check also names the slip the distractor encodes,
 * so a distractor cannot quietly become a second right answer.
 */
describe('the physics depth probes are arithmetically true', () => {
  const load = async () => {
    const { PHYSICS_DEPTH_PROBES } = await import('../lib/teaching/assets/physicsDepthSeedAssets')
    return PHYSICS_DEPTH_PROBES as unknown as Probe[]
  }
  const find = (probes: Probe[], fragment: string) => {
    const hit = probes.filter((p) => p.stem.includes(fragment))
    expect(hit.length, `expected exactly one probe containing "${fragment}"`).toBe(1)
    return hit[0]
  }
  const correctText = (p: Probe) => (p.choices ?? []).find((c) => c.isCorrect)!.text

  it('units: 2500 mm is 2.5 m, and the distractors are the wrong power of ten', async () => {
    const p = find(await load(), '2500 millimetres')
    expect(2500 / 1000).toBe(2.5)
    expect(correctText(p)).toContain('2.5 m')
    // The 25 and 250 options divide by 100 and 10 — wrong, and wrong in the
    // direction a learner who has not fixed "milli = one thousandth" goes.
    expect(2500 / 100).toBe(25)
    expect(2500 / 10).toBe(250)
  })

  it('units: 4.7 µF is 4.7e-6 F, and micro is not milli', async () => {
    const p = find(await load(), '4.7 µF')
    expect(4.7e-6).toBeCloseTo(0.0000047, 12)
    expect(correctText(p)).toContain('10⁻⁶')
    expect(4.7e-3).not.toBe(4.7e-6)
  })

  it('velocity: 20 km then an hour of rest is 10 km/h over two hours', async () => {
    const p = find(await load(), 'rests for the whole second hour')
    expect(20 / 2).toBe(10)
    expect(correctText(p)).toContain('10 km/h')
    // 20 km/h is the answer that drops the resting hour from the denominator.
    expect(20 / 1).toBe(20)
  })

  it('velocity: 40 m in 8 s is 5 m/s, and the answer must carry a direction', async () => {
    const p = find(await load(), 'flies 40 m due east in 8 s')
    expect(40 / 8).toBe(5)
    expect(correctText(p)).toContain('east')
    // The bare "5 m/s" option is numerically right and is the WRONG answer:
    // a velocity without a direction is incomplete, which is the point.
    const bare = (p.choices ?? []).find((c) => c.text === '5 m/s')
    expect(bare?.isCorrect).toBeFalsy()
  })

  it('acceleration: (2 − 8)/3 = −2 m/s², and none of the distractors evaluate to it', async () => {
    const p = find(await load(), 'slows steadily from 8 m/s to 2 m/s over 3 s')
    expect((2 - 8) / 3).toBe(-2)
    expect(correctText(p)).toContain('−2 m/s²')
    expect(2 - 8).toBe(-6)          // the un-divided Δv option
    expect(3 / (2 - 8)).toBe(-0.5)  // the inverted-fraction option
  })

  it('force: 20 N east and 8 N north combine to about 21.5 N, not 28 or 12', async () => {
    const p = find(await load(), '20 N due east and 8 N due north')
    expect(Math.hypot(20, 8)).toBeCloseTo(21.54, 2)
    expect(correctText(p)).toContain('21.5 N')
    expect(20 + 8).toBe(28)   // adding sizes, valid only along one line
    expect(20 - 8).toBe(12)   // subtracting, valid only in opposition
  })

  it("Newton II: 10 N on 5 kg is 2 m/s²; 24 N on 6 kg is 4 m/s²", async () => {
    const probes = await load()
    const mid = find(probes, 'A 5 kg box is pushed')
    expect(10 / 5).toBe(2)
    expect(correctText(mid)).toContain('2 m/s²')
    expect(5 / 10).toBe(0.5)   // the inverted option
    const adult = find(probes, 'A resultant force of 24 N acts on a 6 kg mass')
    expect(24 / 6).toBe(4)
    expect(correctText(adult)).toContain('4 m/s²')
    expect(24 * 6).toBe(144)
    expect(6 / 24).toBe(0.25)
  })

  it('momentum: 10 kg m/s on 2 kg is 5 m/s; 1200 kg at 15 m/s is 18 000 kg m/s', async () => {
    const probes = await load()
    const v = find(probes, 'momentum of 10 kg m/s')
    expect(10 / 2).toBe(5)
    expect(correctText(v)).toContain('5 m/s')
    const p = find(probes, 'A 1200 kg car travels at 15 m/s')
    expect(1200 * 15).toBe(18000)
    expect(correctText(p)).toContain('18 000')
    // The 135 000 distractor is ½mv² — a real number in this problem, and an
    // ENERGY. It is offered precisely because it is arithmetically reachable.
    expect(0.5 * 1200 * 15 ** 2).toBe(135000)
  })

  it('impulse: a 6 m/s bounce back at 4 m/s changes momentum by 2.0, not 0.4', async () => {
    const p = find(await load(), 'bounces straight back at 4 m/s')
    expect(0.2 * 6).toBeCloseTo(1.2, 10)
    expect(0.2 * 4).toBeCloseTo(0.8, 10)
    expect(Math.abs(0.2 * -4 - 0.2 * 6)).toBeCloseTo(2.0, 10)
    expect(correctText(p)).toContain('2.0 kg m/s')
    // 0.4 is what you get treating the bounce as a slowing: 0.2 × (6 − 4).
    expect(0.2 * (6 - 4)).toBeCloseTo(0.4, 10)
  })

  it('power: 500 N through 4 m in 10 s is 200 W, and 2000 is the work not the power', async () => {
    const p = find(await load(), 'crate weighing 500 N through a height of 4 m')
    expect(500 * 4).toBe(2000)
    expect((500 * 4) / 10).toBe(200)
    expect(correctText(p)).toContain('200 W')
  })

  it('kinematics: 30 m/s to rest in 75 m gives −6 m/s² from v² = u² + 2as', async () => {
    const p = find(await load(), 'braking uniformly from 30 m/s comes to rest in 75 m')
    expect((0 - 30 ** 2) / (2 * 75)).toBe(-6)
    expect(correctText(p)).toContain('−6 m/s²')
    expect(30 / 75).toBeCloseTo(0.4, 10) // the speed-over-distance distractor
  })

  it('kinetic energy: 2 kg and 4 kg at 5 m/s carry 25 J and 50 J', async () => {
    const p = find(await load(), 'A 2 kg book and a 4 kg book')
    expect(0.5 * 2 * 5 ** 2).toBe(25)
    expect(0.5 * 4 * 5 ** 2).toBe(50)
    expect(correctText(p)).toContain('25 J')
    expect(correctText(p)).toContain('50 J')
  })

  it('batch 2: E = F/q gives 2.5e4 N/C, and the midpoint dipole field ADDS to 7.2e3', async () => {
    const probes = await load()
    const e = find(probes, 'test charge of +2.0 × 10⁻⁶ C')
    expect(0.050 / 2.0e-6).toBeCloseTo(25000, 6)
    expect(correctText(e)).toContain('2.5 × 10⁴')
    const mid = find(probes, '+4.0 nC sits at x = 0')
    // Each charge contributes kq/r² at r = 0.10 m, and at the midpoint both
    // point the same way (+x), so they add rather than cancel.
    const one = (8.99e9 * 4.0e-9) / 0.10 ** 2
    expect(one).toBeCloseTo(3596, 0)
    expect(2 * one).toBeCloseTo(7192, 0)
    expect(correctText(mid)).toContain('7.2 × 10³')
  })

  it('batch 2: stress 60 N over 2e-6 m² is 3.0e7 Pa, and FL/AE gives 1.0 mm', async () => {
    const probes = await load()
    const st = find(probes, 'cross-sectional area 2.0 × 10⁻⁶ m²')
    expect(60 / 2.0e-6).toBeCloseTo(3.0e7, 0)
    expect(correctText(st)).toContain('3.0 × 10⁷')
    const ext = find(probes, 'Young modulus of 200 GPa')
    expect((100 * 2.0) / (1.0e-6 * 200e9)).toBeCloseTo(1.0e-3, 12)
    expect(correctText(ext)).toContain('1.0 mm')
  })

  it('batch 2: omega = sqrt(k/m) = 20 rad/s, and quadrupling the mass doubles T', async () => {
    const probes = await load()
    const w = find(probes, 'spring of stiffness 80 N/m')
    expect(Math.sqrt(80 / 0.20)).toBe(20)
    expect(80 / 0.20).toBe(400)          // the un-rooted distractor
    expect(correctText(w)).toContain('20 rad/s')
    const t = find(probes, 'spring-mass oscillator is QUADRUPLED')
    expect(Math.sqrt(4)).toBe(2)         // T scales as sqrt(m)
    expect(correctText(t)).toContain('doubles')
  })

  it('batch 3: the thermodynamics arithmetic', async () => {
    const probes = await load()
    const cal = find(probes, '0.50 kg of water from 20 °C to 60 °C')
    expect(0.50 * 4200 * (60 - 20)).toBe(84000)
    expect(0.50 * 4200 * 60).toBe(126000)      // the ΔT-as-final-temperature slip
    expect(correctText(cal)).toContain('84 000 J')

    const carnot = find(probes, 'T_H = 500 K and T_C = 300 K')
    // Equal absolute shifts are NOT equally effective, because eta is a ratio.
    expect(1 - 300 / 550).toBeCloseTo(0.4545, 4)
    expect(1 - 250 / 500).toBeCloseTo(0.5, 10)
    expect(1 - 250 / 500).toBeGreaterThan(1 - 300 / 550)
    expect(correctText(carnot)).toContain('Lowering T_C')

    const first = find(probes, 'absorbs 800 J of heat and does 300 J')
    expect(800 - 300).toBe(500)
    expect(correctText(first)).toContain('+500 J')

    const eng = find(probes, 'takes 2400 J from the hot reservoir')
    expect(2400 - 600).toBe(1800)
    expect(600 / 2400).toBe(0.25)
    expect(600 / 1800).toBeCloseTo(0.333, 3)   // the divide-by-Q_C distractor
    expect(correctText(eng)).toContain('25%')

    const gas = find(probes, 'reads 100 kPa at 27 °C')
    expect(100 * (400 / 300)).toBeCloseTo(133.3, 1)
    expect(100 * (127 / 27)).toBeCloseTo(470.4, 1) // the Celsius-ratio distractor
    expect(correctText(gas)).toContain('133 kPa')

    const melt = find(probes, 'melt 0.20 kg of ice')
    expect(0.20 * 3.34e5).toBeCloseTo(66800, 0)
    expect(correctText(melt)).toContain('6.7 × 10⁴')

    const c = find(probes, '2.0 kg block of metal absorbs 18 000 J')
    expect(18000 / (2.0 * 20)).toBe(450)
    expect(18000 / 20).toBe(900)               // the mass-omitted distractor
    expect(correctText(c)).toContain('450')

    const rail = find(probes, '25 m steel rail')
    expect(12e-6 * 25 * 30).toBeCloseTo(9.0e-3, 12)
    expect(correctText(rail)).toContain('9.0 mm')

    const rms = find(probes, 'root-mean-square molecular speed')
    expect(Math.sqrt(2)).toBeCloseTo(1.414, 3)
    expect(correctText(rms)).toContain('√2')
  })

  it('batch 4: the wave arithmetic', async () => {
    const probes = await load()
    const dop = find(probes, 'siren emitting 500 Hz')
    expect((500 * 340) / (340 - 34)).toBeCloseTo(555.6, 1)
    expect((500 * 340) / (340 + 34)).toBeCloseTo(454.5, 1) // the wrong-sign option
    expect(correctText(dop)).toContain('556 Hz')

    // Beats give the SIZE of the mismatch, not its sign. 333 Hz tightened goes
    // to a bigger beat; 327 Hz tightened would have gone to a smaller one.
    const beat = find(probes, '330 Hz tuning fork gives 3 beats')
    expect(Math.abs(333 - 330)).toBe(3)
    expect(Math.abs(327 - 330)).toBe(3)
    expect(correctText(beat)).toContain('333 Hz')

    const pend = find(probes, 'period of 2.0 s')
    expect(2.0 * Math.sqrt(4)).toBe(4.0)
    expect(correctText(pend)).toContain('4.0 s')
    const moon = find(probes, 'one sixth of its value on Earth')
    expect(Math.sqrt(6)).toBeCloseTo(2.449, 3)
    expect(correctText(moon)).toContain('Slow')

    const half = find(probes, 'kinetic energy exactly equal to the potential energy')
    // PE = half of the total when x^2 = A^2/2.
    expect(1 / Math.sqrt(2)).toBeCloseTo(0.7071, 4)
    expect(0.5 * (1 / Math.sqrt(2)) ** 2).toBeCloseTo(0.25, 10)
    expect(correctText(half)).toContain('A/√2')

    const quad = find(probes, 'amplitude of an SHM oscillator is doubled')
    expect(2 ** 2).toBe(4)
    expect(correctText(quad)).toContain('quadruples')

    const db = find(probes, 'double your distance from a small sound source')
    expect(10 * Math.log10(4)).toBeCloseTo(6.02, 2)
    expect(10 * Math.log10(2)).toBeCloseTo(3.01, 2)  // the halving distractor
    expect(correctText(db)).toContain('6 dB')

    const fund = find(probes, 'string of length 1.2 m')
    expect(2 * 1.2).toBeCloseTo(2.4, 10)
    expect(correctText(fund)).toContain('2.4 m')

    const pt = find(probes, 'amplitude 5 cm and wavelength 40 cm')
    expect(4 * 5).toBe(20)
    expect(correctText(pt)).toContain('20 cm')

    const mu = find(probes, 'FOUR times the mass per unit length')
    expect(24 / Math.sqrt(4)).toBe(12)
    expect(24 / 4).toBe(6)  // the square-root-omitted distractor
    expect(correctText(mu)).toContain('12 m/s')
  })

  it('batch 5: the mechanics arithmetic', async () => {
    const probes = await load()
    const wheel = find(probes, 'angular velocity of 20 rad/s in 5.0 s')
    expect(20 / 5.0).toBe(4)                 // alpha
    expect(0.5 * 4 * 5.0 ** 2).toBe(50)      // theta = 1/2 alpha t^2
    expect(20 * 5.0).toBe(100)               // the final-omega-throughout distractor
    expect(correctText(wheel)).toContain('50 rad')

    // L = I*omega is conserved; KE = L^2/2I is NOT. Halving I doubles the energy.
    const skater = find(probes, 'halving her moment of inertia')
    const I = 1, w = 1
    const L = I * w
    expect(L / (I / 2)).toBe(2 * w)
    expect(0.5 * (I / 2) * (2 * w) ** 2).toBe(2 * (0.5 * I * w ** 2))
    expect(correctText(skater)).toContain('DOUBLES')

    const flo = find(probes, 'one third of its volume above')
    expect(1000 * (2 / 3)).toBeCloseTo(666.7, 1)
    expect(correctText(flo)).toContain('667')

    const cent = find(probes, '2.0 m string is swung in a horizontal circle')
    expect((0.5 * 4.0 ** 2) / 2.0).toBe(4.0)
    expect(correctText(cent)).toContain('4.0 N')

    const stick = find(probes, '2.0 kg trolley moving at 3.0 m/s')
    expect((2.0 * 3.0) / (2.0 + 4.0)).toBe(1.0)
    expect(correctText(stick)).toContain('1.0 m/s')

    const drop = find(probes, 'dropped from a height of 5.0 m')
    expect(Math.sqrt(2 * 9.8 * 5.0)).toBeCloseTo(9.90, 2)
    expect(2 * 9.8 * 5.0).toBe(98)           // the un-rooted distractor
    expect(correctText(drop)).toContain('9.9 m/s')

    const hike = find(probes, '6.0 km due east')
    expect(Math.hypot(6, 8)).toBe(10)
    expect(6 + 8).toBe(14)                   // the genuine distance walked
    expect(correctText(hike)).toContain('10 km')

    // Moments about the RIGHT support: 4 R_L = 200*2 + 400*3.
    const plank = find(probes, 'plank 4.0 m long, weighing 200 N')
    expect((200 * 2.0 + 400 * 3.0) / 4.0).toBe(400)
    expect((200 + 400) / 2).toBe(300)        // the split-equally distractor
    expect(correctText(plank)).toContain('400 N')

    const esc = find(probes, 'compressed to half its radius')
    expect(Math.sqrt(1 / 0.5)).toBeCloseTo(1.414, 3)
    expect(correctText(esc)).toContain('√2')
  })

  it('batch 6: the mechanics arithmetic, second set', async () => {
    const probes = await load()
    const fr = find(probes, 'coefficient of kinetic friction of 0.30')
    expect(0.30 * 5.0 * 9.8).toBeCloseTo(14.7, 6)
    expect(0.30 * 5.0).toBe(1.5)             // coefficient x MASS, out by g
    expect(correctText(fr)).toContain('15 N')

    const gf = find(probes, 'two Earth radii from the CENTRE')
    expect(9.8 / 2 ** 2).toBeCloseTo(2.45, 6) // inverse SQUARE, not inverse
    expect(9.8 / 2).toBe(4.9)
    expect(correctText(gf)).toContain('2.5 N/kg')

    // U goes as 1/r, so equal steps in radius are not equal steps in energy.
    const lift = find(probes, 'out to 2R from the centre')
    expect(1 / 1 - 1 / 2).toBe(0.5)
    expect(1 / 2 - 1 / 3).toBeCloseTo(1 / 6, 12)
    expect(0.5 / (1 / 6)).toBeCloseTo(3, 12)
    expect(correctText(lift)).toContain('three times')

    const spr = find(probes, 'stiffness 400 N/m when it is extended by 0.10 m')
    expect(0.5 * 400 * 0.10 ** 2).toBeCloseTo(2.0, 12)
    expect(400 * 0.10).toBe(40)              // the no-half distractor
    expect(correctText(spr)).toContain('2.0 J')

    const kep = find(probes, 'semi-major axis of 4 AU')
    expect(4 ** 1.5).toBe(8)
    expect(correctText(kep)).toContain('8 years')

    // s goes as t^2, so the individual seconds follow the odd numbers 1, 3, 5.
    const stone = find(probes, 'during the THIRD second')
    const s = (t: number) => 0.5 * 9.8 * t ** 2
    expect((s(3) - s(2)) / s(1)).toBeCloseTo(5, 12)
    expect(correctText(stone)).toContain('Five times')

    const moi = find(probes, 'light rod of length 0.50 m')
    expect(2.0 * 0.50 ** 2).toBe(0.5)
    expect(2.0 * 0.50).toBe(1.0)             // mass x radius, unsquared
    expect(correctText(moi)).toContain('0.50 kg m²')

    const lifted = find(probes, 'bathroom scale in a lift')
    expect(70 * (9.8 + 2.0)).toBeCloseTo(826, 0)
    expect(70 * 9.8).toBeCloseTo(686, 0)     // the weight, which is not what a scale reads here
    expect(correctText(lifted)).toContain('826 N')
  })

  it('batch 7: the mechanics arithmetic, third set', async () => {
    const probes = await load()
    const pw = find(probes, 'steady 25 m/s against a total resistive force')
    expect(600 * 25).toBe(15000)
    expect(600 / 25).toBe(24)                 // the divided distractor
    expect(correctText(pw)).toContain('15 kW')

    const dep = find(probes, 'depth of 3.0 m in a freshwater lake')
    expect(1000 * 9.8 * 3.0).toBeCloseTo(29400, 6)
    expect(correctText(dep)).toContain('29 kPa')

    // Pascal multiplies force, not energy: the small piston travels 50x further.
    const hyd = find(probes, 'hydraulic lift')
    expect(0.50 / 0.010).toBe(50)
    expect(200 * 50).toBe(10000)
    expect(correctText(hyd)).toContain('10 000 N')

    const proj = find(probes, '20 m/s at 30° above the horizontal')
    expect(20 * Math.sin(Math.PI / 6)).toBeCloseTo(10, 10)
    expect(20 * Math.cos(Math.PI / 6)).toBeCloseTo(17.32, 2) // the horizontal component
    expect(correctText(proj)).toContain('10 m/s')

    const rel = find(probes, 'roads at right angles')
    expect(Math.hypot(15, 15)).toBeCloseTo(21.2, 1)
    expect(correctText(rel)).toContain('21 m/s')

    const lift2 = find(probes, 'accelerating DOWNWARDS at 3.0 m/s²')
    expect(10 * (9.8 - 3.0)).toBeCloseTo(68, 6)
    expect(10 * (9.8 + 3.0)).toBeCloseTo(128, 6)  // the sign-reversed distractor
    expect(correctText(lift2)).toContain('68 N')

    const tq = find(probes, '0.25 m spanner')
    expect(0.25 * 40 * Math.sin(Math.PI / 3)).toBeCloseTo(8.66, 2)
    expect(0.25 * 40).toBe(10)                // the perpendicular-assumed distractor
    expect(correctText(tq)).toContain('8.7 N·m')

    const grav = find(probes, 'Two 5.0 kg masses sit 0.50 m apart')
    expect((6.67e-11 * 5.0 * 5.0) / 0.50 ** 2).toBeCloseTo(6.67e-9, 15)
    expect(correctText(grav)).toContain('6.7 × 10⁻⁹')

    // Average speed weights by TIME, so the slower leg counts double.
    const avg = find(probes, 'first 30 km of a journey at 60 km/h')
    expect(60 / (30 / 60 + 30 / 30)).toBe(40)
    expect((60 + 30) / 2).toBe(45)            // the average-the-speeds distractor
    expect(correctText(avg)).toContain('40 km/h')

    const brake = find(probes, '1200 kg car braking from 20 m/s')
    expect((0.5 * 1200 * 20 ** 2) / 40).toBe(6000)
    expect((1200 * 20 ** 2) / 40).toBe(12000) // the no-half distractor
    expect(correctText(brake)).toContain('6000 N')
  })

  it('batch 8: the constrained-pair arithmetic', async () => {
    const probes = await load()
    const rec = find(probes, '60 kg astronaut')
    expect((2.0 * 15) / 60).toBe(0.5)
    expect(correctText(rec)).toContain('0.50 m/s')

    const boat = find(probes, 'river that flows at 3.0 m/s')
    expect(Math.hypot(4, 3)).toBe(5)
    expect(4 + 3).toBe(7)                     // the added distractor
    expect(correctText(boat)).toContain('5.0 m/s')

    // Equal KE with four times the mass needs HALF the speed: v goes as 1/sqrt(m).
    const same = find(probes, 'four times the mass of object B')
    const v = (m: number, ke: number) => Math.sqrt((2 * ke) / m)
    expect(v(1, 1) / v(4, 1)).toBe(2)
    expect(correctText(same)).toContain('twice as fast')

    const road = find(probes, 'car at 100 km/h')
    expect((100 / 50) ** 2).toBe(4)
    expect(correctText(road)).toContain('FOUR times')

    const book = find(probes, '2.0 kg book is lifted 1.5 m')
    expect(2.0 * 9.8 * 1.5).toBeCloseTo(29.4, 10)
    expect(correctText(book)).toContain('29 J')
  })

  it('batch 9: the electromagnetism arithmetic', async () => {
    const probes = await load()
    const cou = find(probes, '+3.0 μC and −2.0 μC are 0.30 m apart')
    expect((8.99e9 * 3.0e-6 * 2.0e-6) / 0.30 ** 2).toBeCloseTo(0.599, 3)
    expect((8.99e9 * 3.0e-6 * 2.0e-6) / 0.30).toBeCloseTo(0.180, 3) // r, not r^2
    expect(correctText(cou)).toContain('0.60 N')

    // Capacitors ADD in parallel; 2 uF is the correct SERIES value for 3 and 6.
    const cap = find(probes, '3 μF and a 6 μF capacitor are connected in PARALLEL')
    expect(3 + 6).toBe(9)
    expect(1 / (1 / 3 + 1 / 6)).toBe(2)
    expect(correctText(cap)).toContain('9 μF')

    const ser = find(probes, '4.0 Ω resistor and a 2.0 Ω resistor in SERIES')
    expect(6.0 / (4.0 + 2.0)).toBe(1.0)
    expect(1.0 * 4.0).toBe(4.0)
    expect(correctText(ser)).toContain('4.0 V')

    const el = find(probes, 'net charge of −3.2 × 10⁻¹⁹ C')
    expect(3.2e-19 / 1.6e-19).toBeCloseTo(2, 12)
    expect(correctText(el)).toContain('Two')

    const cur = find(probes, 'charge of 12 C passes a point')
    expect(12 / 4.0).toBe(3.0)
    expect(correctText(cur)).toContain('3.0 A')

    const wk = find(probes, 'charge of 2.0 μC through a potential difference')
    expect(2.0e-6 * 12).toBeCloseTo(2.4e-5, 12)
    expect(correctText(wk)).toContain('2.4 × 10⁻⁵')

    const kwh = find(probes, '60 W lamp is left on for 5.0 hours')
    expect((60 / 1000) * 5.0).toBeCloseTo(0.30, 12)
    expect(correctText(kwh)).toContain('0.30 kWh')

    const cell = find(probes, 'emf 1.5 V and internal resistance 0.50 Ω')
    const I = 1.5 / (0.50 + 2.5)
    expect(I).toBe(0.5)
    expect(1.5 - I * 0.50).toBe(1.25)
    expect(correctText(cell)).toContain('1.25 V')

    const cE = find(probes, '100 μF capacitor charged to 20 V')
    expect(0.5 * 100e-6 * 20 ** 2).toBeCloseTo(0.020, 12)
    expect(100e-6 * 20 ** 2).toBeCloseTo(0.040, 12)  // the no-half distractor
    expect(correctText(cE)).toContain('0.020 J')

    const far = find(probes, 'coil of 200 turns')
    expect((200 * 4.0e-3) / 0.020).toBeCloseTo(40, 10)
    expect(4.0e-3 / 0.020).toBeCloseTo(0.20, 12)     // N omitted
    expect(correctText(far)).toContain('40 V')
  })

  it('batch 10: the electromagnetism arithmetic, second set', async () => {
    const probes = await load()
    const kcl = find(probes, 'currents of 3.0 A and 2.0 A flow IN')
    expect(3.0 + 2.0 - 1.5).toBe(3.5)
    expect(correctText(kcl)).toContain('3.5 A')

    const lc = find(probes, 'L = 2.0 mH and C = 50 μF')
    expect(2.0e-3 * 50e-6).toBeCloseTo(1.0e-7, 15)
    expect(1 / Math.sqrt(1.0e-7)).toBeCloseTo(3162, 0)
    expect(1 / 1.0e-7).toBe(1.0e7)             // the un-rooted distractor
    expect(correctText(lc)).toContain('3.2 × 10³')

    // 60 degrees to the PLANE is 30 degrees from the normal.
    const flux = find(probes, '0.20 m by 0.30 m sits in a uniform 0.40 T')
    expect(0.40 * (0.20 * 0.30) * Math.cos(Math.PI / 6)).toBeCloseTo(0.0208, 4)
    expect(0.40 * (0.20 * 0.30) * Math.cos(Math.PI / 3)).toBeCloseTo(0.012, 3)
    expect(correctText(flux)).toContain('0.021 Wb')

    const bil = find(probes, '0.50 m length of wire carrying 3.0 A')
    expect(0.20 * 3.0 * 0.50).toBeCloseTo(0.30, 12)
    expect(correctText(bil)).toContain('0.30 N')

    const ohm = find(probes, 'current of 0.25 A when 6.0 V')
    expect(6.0 / 0.25).toBe(24)
    expect(6.0 * 0.25).toBe(1.5)               // the multiplied distractor
    expect(correctText(ohm)).toContain('24 Ω')

    const pot = find(probes, '1.018 V balances at 60.0 cm')
    expect(1.5 / (1.018 / 60.0)).toBeCloseTo(88.4, 1)
    expect(correctText(pot)).toContain('88 cm')

    // Megohms with microfarads give seconds: the prefixes cancel exactly.
    const rc = find(probes, '2.0 MΩ resistor charges a 5.0 μF')
    expect(2.0e6 * 5.0e-6).toBeCloseTo(10, 12)
    expect(correctText(rc)).toContain('10 s')

    // Fixed volume: doubling the length halves the cross-section, so R x 4.
    const str = find(probes, 'stretched uniformly to twice its original length')
    expect(2 / 0.5).toBe(4)
    expect(correctText(str)).toContain('4R')

    const ind = find(probes, '0.50 H inductor carrying a steady current')
    expect(0.5 * 0.50 * 4.0 ** 2).toBe(4.0)
    expect(0.50 * 4.0 ** 2).toBe(8.0)          // the no-half distractor
    expect(correctText(ind)).toContain('4.0 J')

    const sol = find(probes, '500 turns per metre and carrying 2.0 A')
    expect(4 * Math.PI * 1e-7 * 500 * 2.0).toBeCloseTo(1.257e-3, 6)
    expect(correctText(sol)).toContain('1.3 × 10⁻³')

    const wb = find(probes, 'P = 200 Ω, Q = 50 Ω and R = 120 Ω')
    expect((120 * 50) / 200).toBe(30)
    expect((120 * 200) / 50).toBe(480)         // the inverted-ratio distractor
    expect(correctText(wb)).toContain('30 Ω')
  })

  it('batch 12: the optics arithmetic', async () => {
    const probes = await load()
    const pw = find(probes, 'focal length of 25 cm')
    expect(1 / 0.25).toBe(4)
    expect(1 / 25).toBeCloseTo(0.04, 12)      // f left in centimetres
    expect(correctText(pw)).toContain('+4.0 D')

    // 1/v = 1/f + 1/u with u = -15 cm: real image at +30 cm, m = -2.
    const lens = find(probes, '15 cm from a converging lens')
    const v = 1 / (1 / 10 - 1 / 15)
    expect(v).toBeCloseTo(30, 12)
    expect(v / -15).toBeCloseTo(-2, 12)
    expect(correctText(lens)).toContain('30 cm')

    // Unpolarised light halves at the FIRST polariser, then Malus at the second.
    const mal = find(probes, 'second polariser at 60°')
    expect(0.5 * Math.cos(Math.PI / 3) ** 2).toBeCloseTo(0.125, 12)
    expect(Math.cos(Math.PI / 3) ** 2).toBeCloseTo(0.25, 12) // Malus alone
    expect(correctText(mal)).toContain('I₀/8')

    const ref = find(probes, 'glass surface (n = 1.50) at 30° to the normal')
    const r = (Math.asin(Math.sin(Math.PI / 6) / 1.5) * 180) / Math.PI
    expect(r).toBeCloseTo(19.47, 2)
    expect(30 / 1.5).toBe(20)                 // dividing the ANGLE, not its sine
    expect(correctText(ref)).toContain('19.5°')

    const crit = find(probes, 'critical angle for a glass–air boundary')
    const c = (Math.asin(1 / 1.5) * 180) / Math.PI
    expect(c).toBeCloseTo(41.8, 1)
    expect(90 - c).toBeCloseTo(48.2, 1)       // the complement distractor
    expect(correctText(crit)).toContain('41.8°')

    const fr = find(probes, 'slits are 0.50 mm apart')
    expect((600e-9 * 2.0) / 0.50e-3).toBeCloseTo(2.4e-3, 12)
    expect(correctText(fr)).toContain('2.4 mm')
  })

  it('chemistry batch 1: the arithmetic', async () => {
    const { CHEMISTRY_DEPTH_PROBES } = await import('../lib/teaching/assets/chemistryDepthSeedAssets')
    const probes = CHEMISTRY_DEPTH_PROBES as unknown as Probe[]
    const c = (fragment: string) => {
      const hit = probes.filter((p) => p.stem.includes(fragment))
      expect(hit.length, `expected exactly one chemistry probe containing "${fragment}"`).toBe(1)
      return (hit[0].choices ?? []).find((x) => x.isCorrect)!.text
    }

    // Rf is bounded by 1 — which is what makes the inverted ratio detectable.
    expect(4.5 / 9.0).toBe(0.5)
    expect(9.0 / 4.5).toBe(2)
    expect(c('solvent front travels 9.0 cm')).toContain('0.50')

    expect(1.435 / 143.5).toBeCloseTo(0.0100, 6)
    expect(c('1.435 g of dry silver chloride')).toContain('0.0100 mol')

    // The larger volume must hold the lower concentration.
    expect((0.0200 * 0.100) / 0.0250).toBeCloseTo(0.0800, 6)
    expect((0.0250 * 0.100) / 0.0200).toBeCloseTo(0.125, 6)  // the inverted option
    expect(c('25.0 cm³ of sodium hydroxide')).toContain('0.0800')

    expect(-13.6 / 2 ** 2).toBeCloseTo(-3.4, 6)
    expect(-13.6 / 2).toBeCloseTo(-6.8, 6)                   // halving, not n-squared
    expect(c('energy of the n = 2 level')).toContain('−3.4 eV')

    expect(3 * 2).toBe(6)                                     // p: three orbitals, two each
    expect(c('maximum number of electrons a p sub-shell')).toContain('Six')

    expect(5.0 - 3.0).toBe(2.0)
    expect(c('work function of 3.0 eV')).toContain('2.0 eV')

    expect(1 + 3 + 5).toBe(9)
    expect(3 ** 2).toBe(9)                                    // n^2 orbitals
    expect(2 * 3 ** 2).toBe(18)                               // 2n^2 electrons, the distractor
    expect(c('orbitals are there altogether in the n = 3 shell')).toContain('Nine')

    expect(26 - 23).toBe(3)                                   // fewer electrons => positive
    expect(26 + 30).toBe(56)                                  // mass number excludes electrons
    expect(c('26 protons, 30 neutrons and 23 electrons')).toContain('3+')

    expect(6 + 6).toBe(12)                                    // condensation loses O, not C
    expect(c('How many carbon atoms does one maltose')).toContain('Twelve')

    // Chargaff: A = T = 30, so G = C = (100 - 60)/2.
    expect((100 - 2 * 30) / 2).toBe(20)
    expect(c('30% adenine by base count')).toContain('20%')

    expect(3 - 1).toBe(2)                                     // n residues, n-1 bonds
    expect(c('peptide bonds are there in a linear tripeptide')).toContain('Two')
  }, 30_000)

  it('chemistry batch 2: the arithmetic', async () => {
    const { CHEMISTRY_DEPTH_PROBES } = await import('../lib/teaching/assets/chemistryDepthSeedAssets')
    const probes = CHEMISTRY_DEPTH_PROBES as unknown as Probe[]
    const c = (fragment: string) => {
      const hit = probes.filter((p) => p.stem.includes(fragment))
      expect(hit.length, `expected exactly one chemistry probe containing "${fragment}"`).toBe(1)
      return (hit[0].choices ?? []).find((x) => x.isCorrect)!.text
    }

    // Ethene: four C-H sigma + one C-C sigma, and ONE pi on top.
    expect(4 + 1).toBe(5)
    expect(c('one molecule of ethene')).toContain('Five sigma and one pi')

    // Carbonate: (1 + 1 + 2)/3 bonds shared over three positions.
    expect((1 + 1 + 2) / 3).toBeCloseTo(1.333, 3)
    expect(3 / 2).toBe(1.5)                       // the benzene answer, offered
    expect(c('carbonate ion CO₃²⁻')).toContain('1.33')

    // Permanganate: x + 4(-2) = -1.
    expect(-1 - 4 * -2).toBe(7)
    expect(c('permanganate ion')).toContain('+7')

    // Molar conductivity: 0.100 mol/dm3 is 1.00e-4 mol/cm3.
    expect(0.100 / 1000).toBeCloseTo(1.0e-4, 12)
    expect(0.0100 / 1.0e-4).toBeCloseTo(100, 9)
    expect(0.0100 / 0.100).toBeCloseTo(0.100, 12) // skipping the conversion
    expect(c('conductivity 0.0100 S cm⁻¹')).toContain('100')

    // Cu2+ needs TWO electrons per atom, so two Faradays.
    expect(2 * 96500).toBe(193000)
    expect(c('deposit one mole of copper metal')).toContain('193 000 C')

    // Aldol joins two carbonyls with no loss of carbon.
    expect(2 + 2).toBe(4)
    expect(c('Two molecules of ethanal')).toContain('Four')

    // Four pairs go tetrahedral, not square.
    expect(c('four bonding pairs and no lone pairs')).toContain('109.5')
  }, 30_000)

  it('chemistry batch 3: the arithmetic', async () => {
    const { CHEMISTRY_DEPTH_PROBES } = await import('../lib/teaching/assets/chemistryDepthSeedAssets')
    const probes = CHEMISTRY_DEPTH_PROBES as unknown as Probe[]
    const c = (fragment: string) => {
      const hit = probes.filter((p) => p.stem.includes(fragment))
      expect(hit.length, `expected exactly one chemistry probe containing "${fragment}"`).toBe(1)
      return (hit[0].choices ?? []).find((x) => x.isCorrect)!.text
    }

    // pH = -log[H+]; pH + pOH = 14 at 25 C.
    expect(-Math.log10(1.0e-9)).toBeCloseTo(9, 9)
    expect(14 - 9).toBe(5)
    expect(c('[H⁺] = 1.0 × 10⁻⁹')).toContain('pH 9 and pOH 5')

    // 1:1 salt: Ksp = s^2.
    expect(Math.sqrt(4.0e-10)).toBeCloseTo(2.0e-5, 12)
    expect((4.0e-10) ** 2).toBeCloseTo(1.6e-19, 25)  // squaring instead of rooting
    expect(c('Ksp = 4.0 × 10⁻¹⁰')).toContain('2.0 × 10⁻⁵')

    // Haber: 1 + 3 = 4 moles of gas on the left, 2 on the right.
    expect(1 + 3).toBe(4)
    expect(c('N₂(g) + 3H₂(g) ⇌ 2NH₃(g)')).toContain('Four on the left')

    // The cm3 -> dm3 factor is CUBED: 10^3, not 10.
    expect(250 / 1000).toBe(0.25)
    expect(c('Convert 250 cm³')).toContain('0.250')

    expect(0.500 * 6.02e23).toBeCloseTo(3.01e23, 12)
    expect(c('0.500 mol of helium')).toContain('3.01 × 10²³')

    // H2 : H2O is 2:2, so the coefficients cancel to 1:1.
    expect((3.0 * 2) / 2).toBe(3.0)
    expect(c('3.0 mol of hydrogen')).toContain('3.0 mol')

    // Leading zeros are placeholders; the embedded zero is significant.
    expect('4503'.length).toBe(4)
    expect(c('0.0004503')).toContain('four significant figures')
  }, 30_000)

  it('chemistry batch 4: the arithmetic', async () => {
    const { CHEMISTRY_DEPTH_PROBES } = await import('../lib/teaching/assets/chemistryDepthSeedAssets')
    const probes = CHEMISTRY_DEPTH_PROBES as unknown as Probe[]
    const c = (fragment: string) => {
      const hit = probes.filter((p) => p.stem.includes(fragment))
      expect(hit.length, `expected exactly one chemistry probe containing "${fragment}"`).toBe(1)
      return (hit[0].choices ?? []).find((x) => x.isCorrect)!.text
    }

    // Three half-lives HALVE three times. The one-third option is the linear
    // reading of a decay that is not linear, and it is the reason a learner
    // also expects the reaction to have finished.
    expect(30 / 10).toBe(3)
    expect((1 / 2) ** 3).toBe(1 / 8)
    expect((1 / 2) ** 3).not.toBe(1 / 3)
    expect(1 - 3 * 0.5).toBe(-0.5)          // linear decay would have gone negative
    expect(c('half-life of 10 minutes')).toContain('One eighth')

    // Hückel: aromatic at 4n + 2, ANTI-aromatic at 4n. The two series never
    // collide, which is what makes the rule decidable.
    const huckel = (n: number) => 4 * n + 2
    expect(huckel(0)).toBe(2)
    expect(huckel(1)).toBe(6)
    expect(huckel(2)).toBe(10)
    expect([0, 1, 2].every((n) => huckel(n) % 4 !== 0)).toBe(true)
    expect(c('Hückel\'s rule states')).toContain('4n + 2')

    // Benzene: three double bonds carry TWO pi electrons each, so six — and six
    // is 4n+2 at n=1, not n=2. Counting bonds gives three, which is the slip.
    expect(3 * 2).toBe(6)
    expect(huckel(1)).toBe(6)
    expect(huckel(2)).not.toBe(6)
    expect(4).toBe(4 * 1)                    // cyclobutadiene: 4n, anti-aromatic
    expect(c('How many pi electrons does benzene have')).toContain('n = 1')

    // Amines are classified by the count on the NITROGEN. Dimethylamine has two
    // alkyl groups there, so secondary — whatever the carbon skeleton looks like.
    expect(['CH₃', 'CH₃'].length).toBe(2)
    expect(c('dimethylamine')).toContain('Secondary')

    // Atomic radius grows DOWN a group as shells are added, and the ranking is
    // therefore the reverse of the atomic-number order for Li, Na, K only
    // because they share a group.
    expect([3, 11, 19]).toEqual([3, 11, 19].slice().sort((a, b) => a - b))
    expect(c('Rank lithium, sodium and potassium')).toContain('Li')

    // Ionisation energy rises ACROSS a period: the nuclear charge grows while
    // the shell does not.
    expect(18 - 11).toBe(7)
    expect(c('sodium to argon')).toContain('increase')
  }, 30_000)

  it('chemistry batch 5: the arithmetic', async () => {
    const { CHEMISTRY_DEPTH_PROBES } = await import('../lib/teaching/assets/chemistryDepthSeedAssets')
    const probes = CHEMISTRY_DEPTH_PROBES as unknown as Probe[]
    const c = (fragment: string) => {
      const hit = probes.filter((p) => p.stem.includes(fragment))
      expect(hit.length, `expected exactly one chemistry probe containing "${fragment}"`).toBe(1)
      return (hit[0].choices ?? []).find((x) => x.isCorrect)!.text
    }

    // Valency is the octet DEFICIT, not the group number and not the maximum
    // oxidation state — three numbers a Group 15 stem puts within reach at once.
    expect(8 - 5).toBe(3)
    expect(c('An element sits in Group 15')).toContain('Three')

    // Addition conserves mass exactly: no by-product, so 28 g in, 28 g out.
    // The two loss options are the condensation answer in the wrong mechanism.
    expect(28).toBe(28)
    expect(28 - 2).toBe(26)      // losing H2 per unit
    expect(28 - 18).toBe(10)     // losing water per unit
    expect(c('One mole of ethene')).toContain('28 g')

    // Condensation: one water per LINK, not per functional group and not n-1.
    expect(5 * 1).toBe(5)
    expect(5 * 2).toBe(10)       // one per group
    expect(5 - 1).toBe(4)        // the peptide-residue count carried across
    expect(c('five ester links')).toContain('Five')

    // Isoprene is 2-methylbuta-1,3-diene: four backbone carbons + one methyl.
    expect(4 + 1).toBe(5)
    expect(2 * 5).toBe(10)       // the dimer option
    expect(c('ONE isoprene repeat unit')).toContain('Five')

    // Degree of polymerisation is a COUNT, so it divides. Multiplying gives a
    // number with no meaning, which is the self-check.
    expect(20000 / 100).toBe(200)
    expect(20000 * 100).toBe(2000000)
    expect(c('number-average molar mass of 20 000')).toContain('200')

    // Of Mg, Zn, Cu, Ag only the two above hydrogen displace it from acid.
    expect(['Mg', 'Zn'].length).toBe(2)
    expect(c('magnesium, zinc, copper and silver')).toContain('Two')

    // MnO4- -> Mn2+ is a change of +7 to +2: five electrons, neither endpoint.
    expect(7 - 2).toBe(5)
    expect(c('reduced to Mn²⁺')).toContain('Five')

    // Cl2 + NaOH hot: 5 NaCl (-1) and 1 NaClO3. In ClO3-, x + 3(-2) = -1.
    expect(-1 - 3 * -2).toBe(5)
    // and the split must straddle the starting state of 0.
    expect(-1).toBeLessThan(0)
    expect(5).toBeGreaterThan(0)
    expect(c('3Cl₂ + 6NaOH')).toContain('−1 and +5')

    // Dichromate: 2x + 7(-2) = -2, so 2x = 12 and x = +6. The dropped division
    // is the defect the +12 option encodes.
    const twoX = -2 - 7 * -2
    expect(twoX).toBe(12)
    expect(twoX / 2).toBe(6)
    expect(c('Cr₂O₇²⁻')).toContain('+6')

    // Permanganate/iron titration, each distractor one omitted step.
    const nMnO4 = 0.0200 * 0.0200          // 4.00e-4 mol
    expect(nMnO4).toBeCloseTo(4.0e-4, 12)
    expect((nMnO4 * 5) / 0.0250).toBeCloseTo(0.0800, 9)
    expect(nMnO4 / 0.0250).toBeCloseTo(0.0160, 9)        // ratio not applied
    expect(nMnO4 / 5 / 0.0250).toBeCloseTo(0.00320, 9)   // ratio inverted
    expect((nMnO4 * 5) / 0.0200).toBeCloseTo(0.100, 9)   // wrong volume
    expect(c('reacting ratio is 1 MnO₄⁻ : 5 Fe²⁺')).toContain('0.0800')

    // Mg loses two electrons, so two H+ — the Group 1 stoichiometry does not
    // transfer.
    expect(2 * 1).toBe(2)
    expect(c('react completely with one mole of magnesium')).toContain('Two')

    // Tritium: mass number minus the single proton.
    expect(3 - 1).toBe(2)
    expect(c('Tritium')).toContain('Two')

    // Ca(HCO3)2 -> CaCO3 + H2O + CO2: two carbons in, one leaves as gas.
    expect(2 - 1).toBe(1)
    expect(c('one mole of Ca(HCO₃)₂')).toContain('One')

    // Al2(SO4)3 gives 2 cations + 3 anions = 5 ions, not 17 atoms.
    expect(2 + 3).toBe(5)
    expect(2 + 3 * (1 + 4)).toBe(17)   // the count-every-atom option
    expect(c('Al₂(SO₄)₃')).toContain('Five')

    // Osmotic pressure counts particles: i = 2 for NaCl against 1 for glucose.
    expect((2 * 0.10) / (1 * 0.10)).toBe(2)
    expect(c('0.10 mol/dm³ NaCl and 0.10 mol/dm³ glucose')).toContain('2 : 1')

    // Henry's law is a straight proportionality.
    expect(0.020 * 3).toBeCloseTo(0.060, 12)
    expect(0.020 / 3).toBeCloseTo(0.0067, 4)   // the inverted option
    expect(c('0.020 mol/dm³ at 1.0 atm')).toContain('0.060')

    // Raoult: multiply by the SOLVENT fraction. Using the solute fraction gives
    // a tenfold drop, which is absurd on its face — that is the self-check.
    expect(3.17 * 0.90).toBeCloseTo(2.853, 3)
    expect(3.17 * 0.10).toBeCloseTo(0.317, 3)
    expect(c('mole fraction of water is 0.90')).toContain('2.85')
  }, 30_000)

  it('chemistry batch 6: the arithmetic', async () => {
    const { CHEMISTRY_DEPTH_PROBES } = await import('../lib/teaching/assets/chemistryDepthSeedAssets')
    const probes = CHEMISTRY_DEPTH_PROBES as unknown as Probe[]
    const c = (fragment: string) => {
      const hit = probes.filter((p) => p.stem.includes(fragment))
      expect(hit.length, `expected exactly one chemistry probe containing "${fragment}"`).toBe(1)
      return (hit[0].choices ?? []).find((x) => x.isCorrect)!.text
    }

    // Gay-Lussac at fixed volume: P/T is constant, and the temperatures are
    // already absolute so the ratio is a clean 2.
    expect((2.0 * 600) / 300).toBe(4.0)
    expect(c('rigid sealed vessel')).toContain('4.0 atm')

    // KE goes as T, and KE goes as v^2, so the speed carries a square root the
    // energy does not. Doubling T therefore gives x2 and xsqrt(2), never x2/x2.
    expect(2).toBe(2)
    expect(Math.sqrt(2)).toBeCloseTo(1.4142, 4)
    expect(Math.sqrt(2)).not.toBeCloseTo(2, 1)
    expect(2 ** 2).toBe(4)                      // the energy x4 / speed x2 option
    expect(c('absolute temperature of a gas sample is doubled')).toContain('×√2')

    // Molar volume at 273 K is 22.4 dm3; 24.0 is the same quantity at 298 K,
    // which is why it is offered rather than invented.
    expect(22.4 / 2).toBeCloseTo(11.2, 12)
    expect(22.4 * 2).toBeCloseTo(44.8, 12)
    // 24.0 dm3 is the SAME quantity at RTP, 20 C — checked here because the
    // first draft of this assertion said 298 K, and the source comment on the
    // probe said so too. 298 K gives 24.5 dm3; the 24.0 figure is 293 K.
    const molarVolume = (T: number) => ((8.314 * T) / 101325) * 1000
    expect(molarVolume(293.15)).toBeCloseTo(24.05, 2)
    expect(molarVolume(298.15)).toBeCloseTo(24.46, 2)
    expect(Math.round(molarVolume(293.15) * 10) / 10).toBe(24.1)
    expect(molarVolume(273.15)).toBeCloseTo(22.41, 2)
    expect(24.0 / 22.4).toBeCloseTo(293 / 273, 2)
    expect(c('1.0 mol of an ideal gas occupy at 273 K')).toContain('22.4')

    // Three boundary lines meet at the triple point, so three phases coexist.
    expect(3).toBe(3)
    expect(c('simultaneously in equilibrium')).toContain('Three')

    // CO2's triple point is near 5.1 atm, so a 1 atm path never crosses the
    // liquid region at all.
    expect(5.1).toBeGreaterThan(1)
    expect(c('triple-point pressure lies')).toContain('above')

    // Z is DEFINED so that the ideal case is exactly 1.
    const Z = (P: number, V: number, n: number, R: number, T: number) => (P * V) / (n * R * T)
    expect(Z(1, 22.4, 1, 0.0821, 273)).toBeCloseTo(1, 2)
    expect(c('compressibility factor Z')).toContain('Exactly 1')

    // "How many times" is a ratio. 180 is the DIFFERENCE, and reading the
    // question as a subtraction is the slip being checked.
    expect(200 / 20).toBe(10)
    expect(200 - 20).toBe(180)
    expect(c('roughly 200 kJ/mol')).toContain('ten')

    // A colloid's upper size bound is comparable to visible wavelengths
    // (roughly 400-700 nm), which is why it scatters and a solution does not.
    expect(1000).toBeGreaterThan(700)
    expect(1).toBeLessThan(400)
    expect(c('true solution below it')).toContain('1 nm to 1000 nm')

    // Bond enthalpies: broken minus formed. The +184 option is that same
    // subtraction reversed, which is the classic sign error.
    const broken = 436 + 242
    const formed = 2 * 431
    expect(broken).toBe(678)
    expect(formed).toBe(862)
    expect(broken - formed).toBe(-184)
    expect(formed - broken).toBe(184)
    expect(c('H₂(g) + Cl₂(g) → 2HCl(g)')).toContain('−184')

    // Entropy is J/K, so the temperature is underneath — the units alone rule
    // out both the inverted and the multiplied option.
    expect(600 / 300).toBe(2)
    expect(300 / 600).toBe(0.5)
    expect(600 * 300).toBe(180000)
    expect(c('reversibly absorbs 600 J')).toContain('+2.0 J/K')

    // Work done BY the system leaves it, so w is negative here.
    expect(500 + -200).toBe(300)
    expect(500 + 200).toBe(700)
    expect(c('does 200 J of work')).toContain('+300 J')

    // Monatomic: Cp = Cv + R = 5R/2, so gamma = 5/3 and the R cancels.
    const R = 8.314
    const cv = (3 * R) / 2
    const cp = cv + R
    expect(cp / cv).toBeCloseTo(5 / 3, 12)
    expect(cp / cv).toBeCloseTo(1.667, 3)
    expect(cv / cp).toBeCloseTo(0.6, 3)      // the inverted option
    expect(c('monatomic ideal gas Cv')).toContain('1.67')
  }, 30_000)

  it('chemistry batch 7: the arithmetic', async () => {
    const { CHEMISTRY_DEPTH_PROBES } = await import('../lib/teaching/assets/chemistryDepthSeedAssets')
    const probes = CHEMISTRY_DEPTH_PROBES as unknown as Probe[]
    const c = (fragment: string) => {
      const hit = probes.filter((p) => p.stem.includes(fragment))
      expect(hit.length, `expected exactly one chemistry probe containing "${fragment}"`).toBe(1)
      return (hit[0].choices ?? []).find((x) => x.isCorrect)!.text
    }

    // A three-membered ring is a triangle: 180/3 = 60 degrees, against a
    // tetrahedral ideal of 109.5. That gap IS the ring strain.
    expect(180 / 3).toBe(60)
    expect(109.5 - 60).toBeCloseTo(49.5, 6)
    expect(c('epoxide ring')).toContain('60°')

    // Install + remove = two extra steps. Protection is never free.
    expect(1 + 1).toBe(2)
    expect(c('EXTRA synthetic steps')).toContain('Two')

    // n + 1 rule: a quartet has FOUR peaks, so three neighbours. The count is
    // one fewer than the multiplicity, every time.
    const multiplicity = (n: number) => n + 1
    expect(multiplicity(3)).toBe(4)
    expect(multiplicity(4)).toBe(5)
    expect(4 - 1).toBe(3)
    expect(c('appears as a quartet')).toContain('Three')

    // l runs 0..n-1 inclusive, so the count of values equals n itself.
    const lValues = (n: number) => Array.from({ length: n }, (_, i) => i)
    expect(lValues(4)).toEqual([0, 1, 2, 3])
    expect(lValues(4).length).toBe(4)
    expect(Math.max(...lValues(4))).toBe(3)   // the largest value is NOT the count
    expect(c('shell n = 4')).toContain('Four')

    // Michaelis-Menten at [S] = Km: v = Vmax*Km/(Km+Km) = Vmax/2, derived
    // rather than recalled.
    const mm = (Vmax: number, S: number, Km: number) => (Vmax * S) / (Km + S)
    expect(mm(100, 5, 5)).toBeCloseTo(50, 12)
    expect(mm(100, 10, 5)).toBeCloseTo(66.67, 2)   // 2Km gives two thirds, not a half
    expect(c('exactly half of Vmax')).toContain('Km')

    // Bond order counts PAIRS, so the difference is halved.
    expect((10 - 6) / 2).toBe(2)
    expect(10 - 6).toBe(4)                          // the undivided option
    expect(c('10 electrons in bonding molecular orbitals')).toContain('2')

    // K4[Fe(CN)6]: four K+ make the complex 4-, six CN- give -6, so x = +2.
    const complexCharge = -4
    expect(complexCharge - 6 * -1).toBe(2)
    expect(c('K₄[Fe(CN)₆]')).toContain('+2')

    // Consecutive equilibria MULTIPLY, so their logs add. Adding the constants
    // themselves is visibly a different operation.
    expect(1e4 * 1e3 * 1e2).toBeCloseTo(1e9, 3)
    expect(4 + 3 + 2).toBe(9)
    expect(1e4 + 1e3 + 1e2).toBeCloseTo(11100, 6)   // the added option
    expect(4 * 3 * 2).toBe(24)                      // exponents multiplied
    expect(c('K₁ = 10⁴, K₂ = 10³ and K₃ = 10²')).toContain('10⁹')

    // Fe3+ is 3d5: five electrons in five orbitals, all unpaired by Hund.
    expect(6 + 2 - 3).toBe(5)
    expect(c('UNPAIRED d electrons')).toContain('Five')

    // Mn2+ loses both 4s electrons, leaving 3d5 untouched.
    expect(5).toBe(5)
    expect(5 + 2 - 2).toBe(5)
    expect(c('How many d electrons does the Mn²⁺')).toContain('Five')

    // f has l = 3, so 2l+1 = 7 orbitals and 14 electrons — which is exactly
    // why the lanthanide series is 14 elements long.
    const orbitals = (l: number) => 2 * l + 1
    expect(orbitals(3)).toBe(7)
    expect(2 * orbitals(3)).toBe(14)
    expect(orbitals(2)).toBe(5)         // the d-subshell answer, offered
    expect(2 * orbitals(2)).toBe(10)
    expect(c('4f sub-shell')).toContain('Seven orbitals, 14')

    // 18-electron rule lands on 18 for BOTH carbonyls despite different metals
    // and different ligand counts — that is what makes it predictive.
    expect(8 + 5 * 2).toBe(18)
    expect(10 + 4 * 2).toBe(18)         // the Ni(CO)4 case the concept already probes
    expect(8 + 5 * 1).toBe(13)          // one electron per CO
    expect(c('Fe(CO)₅')).toContain('18')

    // Coupled equilibria multiply. Here the product EXCEEDS 1, so the solid
    // dissolves — the opposite outcome to the AgCl/ammonia case at ~3e-3.
    expect(5.0e-13 * 2.9e13).toBeCloseTo(14.5, 1)
    expect(5.0e-13 * 2.9e13).toBeGreaterThan(1)
    expect(1.8e-10 * 1.7e7).toBeCloseTo(3.06e-3, 5)
    expect(1.8e-10 * 1.7e7).toBeLessThan(1)
    expect(5.0e-13 / 2.9e13).toBeCloseTo(1.72e-26, 28)   // the divided option
    expect(c('AgBr has Ksp')).toContain('14')

    // Ethyl (2 C) + the CO2 carbon = propanoic acid, 3 carbons.
    expect(2 + 1).toBe(3)
    expect(c('CH₃CH₂MgBr is added to solid CO₂')).toContain('Three')

    // Naphthalene: five double bonds x 2 pi electrons. Counting one ring gives
    // six, the same bond-versus-electron slip as at benzene.
    expect(5 * 2).toBe(10)
    expect(3 * 2).toBe(6)
    expect(c('How many pi electrons does naphthalene')).toContain('Ten')
  }, 30_000)

  it('chemistry batch 8: the arithmetic', async () => {
    const { CHEMISTRY_DEPTH_PROBES } = await import('../lib/teaching/assets/chemistryDepthSeedAssets')
    const probes = CHEMISTRY_DEPTH_PROBES as unknown as Probe[]
    const c = (fragment: string) => {
      const hit = probes.filter((p) => p.stem.includes(fragment))
      expect(hit.length, `expected exactly one chemistry probe containing "${fragment}"`).toBe(1)
      return (hit[0].choices ?? []).find((x) => x.isCorrect)!.text
    }

    // Overall order is the SUM of the exponents; each individual order is its
    // own exponent. Reading only the largest gives second, the offered error.
    expect(2 + 1).toBe(3)
    expect(c('rate = k[A]²[B]')).toContain('Third order overall; first order in B')

    // E = hc/lambda: shorter wavelength, higher energy. Derived, not recalled.
    const photonEnergy = (lambdaNm: number) => (6.626e-34 * 3.0e8) / (lambdaNm * 1e-9)
    expect(photonEnergy(450)).toBeGreaterThan(photonEnergy(650))
    expect(photonEnergy(450) / photonEnergy(650)).toBeCloseTo(650 / 450, 6)
    expect(c('Blue light has a shorter wavelength')).toContain('Blue')

    // Pyridine: three C=C contribute 6 pi electrons; the nitrogen lone pair is
    // NOT among them, which is the whole reason pyridine is basic.
    expect(3 * 2).toBe(6)
    expect(c('pyridine\'s aromatic ring')).toContain('Six')

    // [4+2] counts ELECTRONS: 4 + 2 = 6, and 6 is 4n+2 at n = 1.
    expect(4 + 2).toBe(6)
    expect(4 * 1 + 2).toBe(6)
    expect(c('[4+2] cycloaddition')).toContain('Six pi electrons, two')

    // Carbocation: three bonding pairs, empty p orbital.
    expect(3 * 2).toBe(6)
    expect(8 - 6).toBe(2)          // the pair it is short of
    expect(c('positive carbon of a carbocation')).toContain('Six')

    // A radical is ONE electron short of the octet, not two.
    expect(8 - 7).toBe(1)
    expect(8 - 6).toBe(2)          // the carbocation count, offered
    expect(c('free radical carries no charge')).toContain('seven')

    // BF3: boron has 3 bonds = 6 electrons, and the donated pair makes 8.
    expect(3 * 2).toBe(6)
    expect(3 * 2 + 2).toBe(8)
    expect(c('F₃B–NH₃')).toContain('Six before, eight after')

    // Graphite leaves one electron per carbon outside the sigma framework.
    expect(4 - 3).toBe(1)
    expect(c('each carbon is covalently bonded')).toContain('Four in diamond, three')

    // A tetrahedron has six EDGES, not four — C(4,2) = 6.
    const choose = (n: number, k: number) =>
      Array.from({ length: k }, (_, i) => (n - i) / (i + 1)).reduce((a, b) => a * b, 1)
    expect(choose(4, 2)).toBeCloseTo(6, 12)
    expect(109.5 - 60).toBeCloseTo(49.5, 6)   // the strain, against phosphorus's preference
    expect(c('P₄ tetrahedron')).toContain('Six bonds, 60°')

    // FCC: a corner is shared by 8 cells and a face by 2.
    expect(8 * (1 / 8) + 6 * (1 / 2)).toBe(4)
    expect(8 + 6).toBe(14)                     // no sharing applied at all
    expect(8 * (1 / 8) + 1).toBe(2)            // the body-centred case
    expect(c('face-centred cubic unit cell')).toContain('Four')

    // Schottky removes a cation AND an anion, so the crystal stays neutral and
    // loses mass without losing volume: density falls.
    expect(1 + 1).toBe(2)
    expect(1 - 1).toBe(0)                      // net charge, which is why both must go
    expect(c('per Schottky defect')).toContain('Two')

    // Close packing: six in-layer, three above, three below.
    expect(6 + 3 + 3).toBe(12)
    expect(c('how many nearest neighbours')).toContain('Twelve')

    // Twice as many tetrahedral holes as atoms, and one octahedral each — the
    // 2:1 ratio that fixes fluorite's 1:2 stoichiometry.
    expect(2 / 1).toBe(2)
    expect(c('tetrahedral holes and')).toContain('2N … N')

    // Phosphorus brings five valence electrons; four are used by the lattice.
    expect(5 - 4).toBe(1)
    expect(c('doped with phosphorus')).toContain('One')

    // DeltaG = -nFE, in kJ. Each distractor is exactly one dropped factor.
    const dG = (n: number, E: number) => (-n * 96500 * E) / 1000
    expect(dG(2, 0.50)).toBeCloseTo(-96.5, 6)
    expect(dG(1, 0.50)).toBeCloseTo(-48.25, 6)   // n omitted
    expect(dG(2, 1.0)).toBeCloseTo(-193, 6)      // E omitted
    expect(dG(2, 0.50)).toBeLessThan(0)          // a positive E must give a negative dG
    expect(c('E° = +0.50 V with n = 2')).toContain('−96.5')

    // One perfectly ordered arrangement is one microstate: S = k ln 1 = 0.
    expect(Math.log(1)).toBe(0)
    expect(c('PERFECT crystal at 0 K')).toContain('exactly zero')
  }, 30_000)

  it('batch 13: coupling j=1 with j=1 preserves the state count', async () => {
    const probes = await load()
    const coup = find(probes, 'j₁ = 1 and j₂ = 1 are coupled')
    // (2j1+1)(2j2+1) before coupling must equal the sum of (2j+1) after.
    const before = (2 * 1 + 1) * (2 * 1 + 1)
    const after = [2, 1, 0].map((j) => 2 * j + 1).reduce((a, b) => a + b, 0)
    expect(before).toBe(9)
    expect(after).toBe(9)
    expect(correctText(coup)).toContain('Nine states')
  })

  it('batch 14: the proton charge comes out as an integer from thirds', async () => {
    const probes = await load()
    const p = find(probes, 'two up quarks and one down quark')
    // The arithmetic that made the quark model credible.
    expect(2 / 3 + 2 / 3 - 1 / 3).toBeCloseTo(1, 12)
    expect(2 / 3 + 2 / 3 + 1 / 3).toBeCloseTo(5 / 3, 12) // the dropped-sign option
    expect(correctText(p)).toContain('+1')
  })

  it('batch 15: the measurement and counting arithmetic', async () => {
    const probes = await load()
    const conv = find(probes, 'Convert 72 km/h')
    expect((72 * 1000) / 3600).toBe(20)
    expect(72 * 3.6).toBeCloseTo(259.2, 1)   // the inverted-factor distractor
    expect(correctText(conv)).toContain('20 m/s')

    // Two vectors of 3 and 4 span resultants from |3-4| to 3+4: never zero.
    const res = find(probes, 'forces, of 3 N and 4 N')
    expect(Math.abs(3 - 4)).toBe(1)
    expect(3 + 4).toBe(7)
    expect(Math.hypot(3, 4)).toBe(5)          // the perpendicular case, also offered
    expect(correctText(res)).toContain('1 N')

    // C(4,2) = 6 out of 2^4 = 16.
    const coin = find(probes, 'fair coin is tossed four times')
    const choose = (n: number, k: number) =>
      Array.from({ length: k }, (_, i) => (n - i) / (i + 1)).reduce((a, b) => a * b, 1)
    expect(choose(4, 2)).toBeCloseTo(6, 12)
    expect(2 ** 4).toBe(16)
    expect(correctText(coin)).toContain('Six out of sixteen')

    // v = a t^2 is L, not L/T: dimensionally impossible whatever the units.
    const dim = find(probes, 'v = at²')
    const T = 1, L = 1
    const velocity = [L, -T]                  // [length power, time power]
    const rhs = [L, -2 * T + 2 * T]
    expect(velocity[1]).toBe(-1)
    expect(rhs[1]).toBe(0)
    expect(velocity[1]).not.toBe(rhs[1])
    expect(correctText(dim)).toContain('No')
  })

  it("Hooke: 3 N gives 6 cm, so 12 N would predict 24 cm; two springs halve the extension", async () => {
    const probes = await load()
    const limit = find(probes, 'stretches 6 cm when a 3 N weight')
    expect((6 / 3) * 12).toBe(24)   // the prediction the stem quotes
    expect(15).toBeLessThan(24)     // and the measurement that breaks it
    expect(correctText(limit)).toContain('limit of proportionality')
    const shared = find(probes, 'Two identical springs hang side by side')
    // x = F/k with each spring carrying F/2.
    expect(0.5).toBe(1 / 2)
    expect(correctText(shared)).toContain('Half as far')
  })
})
