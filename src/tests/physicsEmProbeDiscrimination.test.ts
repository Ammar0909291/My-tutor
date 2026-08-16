/**
 * MOAT STAGE 4 (stem-vs-blueprint) — the phys.em domain pass.
 *
 * 35 concepts / 192 probes read, each tagged stem taken against its
 * blueprint's misconception body. FIVE defects, in two of the classes the
 * phys.mech pass established (see physicsMechProbeDiscrimination.test.ts for
 * the class taxonomy). phys.em is materially cleaner than phys.mech: no
 * crossed pairs, no false tags, and no probe that asserts the misconception
 * its own concept repairs.
 *
 * PRODUCTION: none of the five is live. Checked against asset_identity ⋈
 * probe_assets for all five concepts — the corrected probes are repo-only and
 * have never been seeded. Repo-fixed: yes. Production-seeded: no.
 * Production-verified: no.
 */
import { describe, it, expect } from 'vitest'
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

const physics = [...SEED_PROBES, ...AUTHORED_PROBES].filter((p) =>
  p.conceptId.startsWith('phys.'),
) as unknown as Probe[]
const em = physics.filter((p) => p.conceptId.startsWith('phys.em.'))

const allIds = (probes: Probe[]) =>
  probes.flatMap((p) => [
    ...(p.targetedMisconceptions ?? []),
    ...((p.choices ?? []).map((c) => c.misconceptionId).filter(Boolean) as string[]),
  ])

const find = (conceptId: string, needle: string) => {
  const hits = em.filter((p) => p.conceptId === conceptId && p.stem.includes(needle))
  expect(hits, `no phys.em probe in ${conceptId} matching ${JSON.stringify(needle)}`).toHaveLength(1)
  return hits[0]
}

// ────────────────────────────────────────────────────────────────────────────
// CLASS 1 — a second name for a misconception the same blueprint documents.
// ────────────────────────────────────────────────────────────────────────────
describe('phys.em class 1: renamed misconceptions rejoined to their blueprint id', () => {
  /**
   * All three sat on mastery-gate checkpoints, which carry no choices — so
   * the "claimed misconception has a distractor" guard could never see them,
   * and the id simply failed to join, leaving the detection unrepairable.
   * Each was confirmed from the blueprint's trigger-signal prose:
   *
   *   capacitance  MC-SERIES-PARALLEL-SWAP
   *                  -> MC-SERIES-CAPACITORS-ADD-DIRECTLY
   *     trigger: "applies C_eq = C1 + C2 for capacitors in series (confusing
   *     with resistors in parallel or capacitors in parallel)" — the swap.
   *   electric-current  MC-ELECTRON-DIRECTION-CONFUSION
   *                  -> MC-ELECTRONS-MOVE-FROM-PLUS-TO-MINUS
   *     trigger names it outright: "...or confuses conventional current
   *     direction with electron flow direction".
   *   electrical-power  MC-SAME-RESISTOR-DISSIPATES-MORE-BOTH-CONFIGS
   *                  -> MC-HIGH-RESISTANCE-ELEMENTS-ALWAYS-DISSIPATE-MORE-POWER
   *     trigger: "'more resistance = more power dissipation' WITHOUT
   *     specifying whether series or parallel", and its conflict evidence is
   *     the series-versus-parallel comparison this checkpoint asks for.
   */
  const retired = [
    'phys.em.capacitance:MC-SERIES-PARALLEL-SWAP',
    'phys.em.electric-current:MC-ELECTRON-DIRECTION-CONFUSION',
    'phys.em.electrical-power:MC-SAME-RESISTOR-DISSIPATES-MORE-BOTH-CONFIGS',
  ]
  const adopted = [
    'phys.em.capacitance:MC-SERIES-CAPACITORS-ADD-DIRECTLY',
    'phys.em.electric-current:MC-ELECTRONS-MOVE-FROM-PLUS-TO-MINUS',
    'phys.em.electrical-power:MC-HIGH-RESISTANCE-ELEMENTS-ALWAYS-DISSIPATE-MORE-POWER',
  ]

  it.each(retired)('%s is gone from the whole physics corpus', (id) => {
    expect(allIds(physics)).not.toContain(id)
  })

  it.each(adopted)('%s is carried by at least one probe', (id) => {
    expect(allIds(physics)).toContain(id)
  })

  it('the three retagged checkpoints are the ones that moved', () => {
    // Ties the ids above to the specific stems, so a future edit that removes
    // the checkpoint entirely fails here rather than passing vacuously.
    expect(find('phys.em.capacitance', 'Three 6 μF capacitors').targetedMisconceptions).toEqual([
      'phys.em.capacitance:MC-SERIES-CAPACITORS-ADD-DIRECTLY',
    ])
    expect(
      find('phys.em.electric-current', 'direction of conventional current in the external wire')
        .targetedMisconceptions,
    ).toEqual(['phys.em.electric-current:MC-ELECTRONS-MOVE-FROM-PLUS-TO-MINUS'])
    expect(
      find('phys.em.electrical-power', 'in series across 100 V').targetedMisconceptions,
    ).toEqual(['phys.em.electrical-power:MC-HIGH-RESISTANCE-ELEMENTS-ALWAYS-DISSIPATE-MORE-POWER'])
  })
})

// ────────────────────────────────────────────────────────────────────────────
// CLASS 4/5 — the stem varies a quantity the tagged belief says nothing
// about, and the distractor states a different belief again.
// ────────────────────────────────────────────────────────────────────────────
describe('phys.em class 4/5: the probe now varies what its tag is about', () => {
  it('resistivity: the item varies LENGTH, which is what its tag is about', () => {
    // MC-LONGER-WIRE-HAS-LOWER-RESISTANCE is "more wire = more path = easier
    // to conduct". Applied to AREA — all the old item varied — that same
    // intuition yields the CORRECT answer, so the holder scored right.
    const p = find('phys.em.resistivity', 'Wire A is the same wire made TWICE AS LONG')
    expect(p.targetedMisconceptions).toEqual([
      'phys.em.resistivity:MC-LONGER-WIRE-HAS-LOWER-RESISTANCE',
    ])
    const mapped = (p.choices ?? []).find(
      (c) => c.misconceptionId === 'phys.em.resistivity:MC-LONGER-WIRE-HAS-LOWER-RESISTANCE',
    )
    // The mapped distractor must predict LOWER resistance for the longer wire
    // — that is the belief. If it only talks about area, the tag is unusable.
    expect(mapped?.text).toMatch(/longer wire gives electrons more path/i)
    expect(mapped?.text).toMatch(/R\/2/)
    // and the correct answer must separate the two directions explicitly
    expect(p.correctValue).toMatch(/2R/)
    expect(p.correctValue).toMatch(/R\/2/)
  })

  it('solenoid: the item varies RADIUS, which is what its tag is about', () => {
    // MC-SOLENOID-FIELD-DEPENDS-ON-RADIUS is "a wider solenoid has a stronger
    // field". The old item held radius fixed, so the belief made no
    // prediction at all and could not be scored.
    const p = find('phys.em.solenoid', 'double its radius')
    expect(p.targetedMisconceptions).toEqual([
      'phys.em.solenoid:MC-SOLENOID-FIELD-DEPENDS-ON-RADIUS',
    ])
    const mapped = (p.choices ?? []).find(
      (c) => c.misconceptionId === 'phys.em.solenoid:MC-SOLENOID-FIELD-DEPENDS-ON-RADIUS',
    )
    expect(mapped?.text).toMatch(/wider solenoid produces a stronger field/i)
    // The N-versus-n error is real and is kept as an unmapped third option,
    // not deleted and not mis-attributed to the radius belief.
    const nVsBigN = (p.choices ?? []).find((c) => /total number of turns/i.test(c.text ?? ''))
    expect(nVsBigN).toBeDefined()
    expect(nVsBigN?.misconceptionId).toBeUndefined()
  })

  it('a mapped distractor never claims the correct answer', () => {
    // General property across phys.em, asserted strictly because it measures
    // zero: no choice may be simultaneously correct and diagnose a
    // misconception. A probe that did would certify the belief.
    const bad: string[] = []
    for (const p of em) {
      for (const c of p.choices ?? []) {
        if (c.isCorrect && c.misconceptionId) bad.push(`${p.conceptId}: ${c.misconceptionId}`)
      }
    }
    expect(bad).toEqual([])
  })
})

describe('the phys.em Stage 4 pass is measured, not assumed', () => {
  it('reads a real corpus of the expected size', () => {
    expect(new Set(em.map((p) => p.conceptId)).size).toBeGreaterThanOrEqual(35)
    expect(em.length).toBeGreaterThanOrEqual(185)
  })

  // NOT CERTIFIED BY THIS FILE: the eight phys.em ids that remain orphaned are
  // genuinely novel misconceptions their blueprints do not register
  // (MC-INDUCTION-POLARITY, MC-INSULATORS-CANNOT-BE-ATTRACTED,
  // MC-FIELDS-ALWAYS-ADD, MC-DIAMETER-LINEAR-NOT-SQUARE,
  // MC-BALANCE-MEANS-MAX-CURRENT, MC-Q-CONSTANT-REGARDLESS-OF-BATTERY,
  // MC-SIGN-CONVENTION-EV, MC-K-CONSTANT-REGARDLESS-OF-DRIVER-R). Each was
  // read and each probe DOES diagnose the belief it names — the gap is that
  // the blueprint never registered it, which is Curriculum Pipeline work.
})
