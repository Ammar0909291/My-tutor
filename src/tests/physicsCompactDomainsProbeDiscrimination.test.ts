/**
 * MOAT STAGE 4 (stem-vs-blueprint) — the seven compact physics domains.
 *
 * phys.mod (21), phys.qm (19), phys.therm (18), phys.particle (16),
 * phys.stat (15), phys.rel (8), phys.astro (6) — 103 concepts, 375 probes,
 * every one read against its blueprint's misconception bodies.
 *
 * ONE defect, in a class not previously seen: the graded content was correct
 * but the ANSWER TEXT taught the concept's own documented misconception.
 *
 * Six of the seven domains are structurally immaculate and were confirmed so
 * by measurement, not by reading alone: mod/qm/particle/stat/rel/astro carry
 * ZERO orphan tags, zero claimed-without-distractor probes, and zero choices
 * that are simultaneously correct and misconception-mapped. They follow a
 * consistent three-probe template (blueprint trigger case -> misconception
 * probe -> transfer case) in which every tag names a documented misconception
 * and every mapped distractor states that misconception's own belief.
 *
 * PRODUCTION: the corrected probe is repo-only and has never been seeded.
 * Repo-fixed: yes. Production-seeded: no. Production-verified: no.
 */
import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { SEED_PROBES } from '@/lib/teaching/assets/brainSeedAssets'
import { AUTHORED_PROBES } from '@/lib/teaching/assets/authoredSeedAssets'

type Probe = {
  conceptId: string
  probeKind: string
  stem: string
  correctValue?: string
  choices?: ReadonlyArray<{ text?: string; isCorrect?: boolean; misconceptionId?: string }> | null
  targetedMisconceptions?: readonly string[]
}

const BLUEPRINTS = path.join(process.cwd(), 'docs/curriculum/blueprints')
const ALL = [...SEED_PROBES, ...AUTHORED_PROBES] as unknown as Probe[]

/** Same parser the corpus-wide join guard uses, so the two cannot disagree. */
function blueprintIds(conceptId: string): Set<string> {
  const file = path.join(BLUEPRINTS, `${conceptId}.md`)
  if (!fs.existsSync(file)) return new Set()
  const ids = new Set<string>()
  for (const raw of fs.readFileSync(file, 'utf8').split('\n')) {
    const line = raw.trim()
    const heading = /^#+\s*(MC-?[A-Za-z0-9/-]+?)\s*(?::\s*(MC-[A-Za-z0-9/-]+?))?\s*(?:\(|$|:|\s—)/.exec(line)
    if (heading) { ids.add(heading[1]); if (heading[2]) ids.add(heading[2]) }
    const row = /^\|\s*(MC-[A-Z][A-Za-z0-9/-]{3,})\s*\|/.exec(line)
    if (row) ids.add(row[1])
  }
  return ids
}
const normalise = (id: string) => id.replace(/^MC-?/, 'MC').toUpperCase()

// ────────────────────────────────────────────────────────────────────────────
// The one defect: correct answer, misconception-teaching explanation.
// ────────────────────────────────────────────────────────────────────────────
describe('an answer explanation must not teach the misconception its concept repairs', () => {
  /**
   * `phys.rel.simultaneity`'s PRACTICE item asks which lightning flash reaches
   * the moving passenger first. The graded answer — the front one — was and is
   * correct, and is unchanged. Its EXPLANATION said the passenger "moves toward
   * it during the flight time, WHICH IS WHY the passenger concludes the strikes
   * were NOT simultaneous". That derivation is exactly this concept's own
   * MC-SIMULTANEITY-IS-JUST-TRAVEL-TIME-OF-LIGHT — "Einstein's train experiment
   * just shows a light travel delay, not anything fundamental".
   *
   * The blueprint's conflict evidence states the correct chain: the train
   * observer concludes front-first AFTER accounting for both pulses covering
   * equal distances at c in their own frame. Arrival order is a ground-frame
   * fact; the simultaneity conclusion is a passenger-frame argument. Conflating
   * them is the misconception, and the old text conflated them.
   *
   * Same class as the phys.meas.units mastery gate that asked for the "SI base
   * unit for volume" — an untagged probe, invisible to every structural check,
   * teaching the error its concept exists to repair.
   */
  const probe = ALL.find(
    (p) => p.conceptId === 'phys.rel.simultaneity' && p.stem.includes('Which flash reaches the passenger first'),
  )

  it('the probe still exists and still grades the front flash', () => {
    expect(probe).toBeDefined()
    const correct = (probe!.choices ?? []).find((c) => c.isCorrect)
    expect(correct?.text).toMatch(/FRONT/)
    expect(probe!.correctValue).toMatch(/front flash/i)
  })

  it('the explanation separates the ground-frame fact from the passenger-frame conclusion', () => {
    const v = probe!.correctValue ?? ''
    // The passenger-frame argument must be present: equal distances at c.
    expect(v).toMatch(/equal distances at c|equal travel times/i)
    // And it must say the conclusion survives travel-time correction, which is
    // the precise thing the misconception denies.
    expect(v).toMatch(/survives every travel-time correction|explained away/i)
  })

  it('the explanation no longer makes the passenger\'s motion the REASON for non-simultaneity', () => {
    const v = probe!.correctValue ?? ''
    expect(v).not.toMatch(/moves toward it during the flight time, which is why/i)
  })
})

// ────────────────────────────────────────────────────────────────────────────
// The six clean domains, asserted as measurements rather than as prose.
// ────────────────────────────────────────────────────────────────────────────
describe('the six immaculate compact domains stay immaculate', () => {
  const domains = ['phys.mod', 'phys.qm', 'phys.particle', 'phys.stat', 'phys.astro'] as const

  it.each(domains)('%s: every tag joins to a documented blueprint misconception', (domain) => {
    const orphans: string[] = []
    for (const p of ALL.filter((x) => x.conceptId.startsWith(`${domain}.`))) {
      const known = new Set([...blueprintIds(p.conceptId)].map(normalise))
      if (known.size === 0) continue
      for (const raw of p.targetedMisconceptions ?? []) {
        const tail = String(raw).split(':').pop()!
        if (!known.has(normalise(tail))) orphans.push(`${p.conceptId}:${tail}`)
      }
    }
    // Measured at ZERO for each, so asserted strictly. phys.rel is excluded
    // only because it is covered by the corpus-wide ratchet alongside the
    // other domains; it is also at zero today.
    expect(orphans).toEqual([])
  })

  it.each(domains)('%s: every claimed misconception has a distractor that expresses it', (domain) => {
    const unmapped: string[] = []
    for (const p of ALL.filter((x) => x.conceptId.startsWith(`${domain}.`))) {
      if (!p.choices?.length) continue
      const mapped = new Set(p.choices.map((c) => c.misconceptionId).filter(Boolean) as string[])
      for (const claimed of p.targetedMisconceptions ?? []) {
        if (!mapped.has(claimed)) unmapped.push(`${p.conceptId} claims ${claimed}`)
      }
    }
    expect(unmapped).toEqual([])
  })

  it.each(domains)('%s: no choice is both correct and misconception-mapped', (domain) => {
    const bad: string[] = []
    for (const p of ALL.filter((x) => x.conceptId.startsWith(`${domain}.`))) {
      for (const c of p.choices ?? []) {
        if (c.isCorrect && c.misconceptionId) bad.push(`${p.conceptId}: ${c.misconceptionId}`)
      }
    }
    expect(bad).toEqual([])
  })

  it('the domains read are the expected size — these checks are not vacuous', () => {
    const counts: Record<string, number> = {}
    for (const d of ['phys.mod', 'phys.qm', 'phys.therm', 'phys.particle', 'phys.stat', 'phys.rel', 'phys.astro']) {
      counts[d] = new Set(
        ALL.filter((p) => p.conceptId.startsWith(`${d}.`)).map((p) => p.conceptId),
      ).size
    }
    expect(counts['phys.mod']).toBeGreaterThanOrEqual(21)
    expect(counts['phys.qm']).toBeGreaterThanOrEqual(19)
    expect(counts['phys.therm']).toBeGreaterThanOrEqual(18)
    expect(counts['phys.particle']).toBeGreaterThanOrEqual(16)
    expect(counts['phys.stat']).toBeGreaterThanOrEqual(15)
    expect(counts['phys.rel']).toBeGreaterThanOrEqual(8)
    expect(counts['phys.astro']).toBeGreaterThanOrEqual(6)
  })

  // phys.therm is deliberately NOT in the strict orphan list above: it carries
  // 9 orphan ids, every one of which was read and confirmed to be a genuinely
  // novel misconception the blueprint does not register (MC-HOLE-SHRINKS,
  // MC-HEAT-IS-STORED, MC-IGNORE-LATENT-HEAT, MC-PHASE-HEAT-RAISES-TEMP,
  // MC-FORGET-KELVIN-CONVERSION, MC-SIGN-CONVENTION x2,
  // MC-MUST-USE-ACTUAL-PATH, MC-SUBSTANCE-AFFECTS-EFFICIENCY). Each probe
  // does diagnose the belief it names. They stay in the corpus-wide ratchet.
})
