/**
 * MOAT STAGE 4 (stem-vs-blueprint) — phys.wave and phys.opt, the final two
 * physics domains. 32 concepts, 241 probes.
 *
 * SEVEN defects. Five renames, and TWO content defects in mastery gates — the
 * more serious kind, because a gate is where a learner is certified:
 *
 *   phys.wave.beats  a graded answer that was FACTUALLY WRONG and
 *                    self-contradictory, failing a learner who reasoned right.
 *   phys.opt.dispersion  a graded answer whose stated mechanism contradicted
 *                    its own premise on the technical meaning of "deviation".
 *
 * Plus a defect in the INSTRUMENT rather than the corpus: the orphan ratchet's
 * id parser excluded `=`, so `phys.opt.single-slit:MC-M=0-IS-DARK` had been
 * counted as an orphan for the whole life of that guard while being a
 * perfectly good join.
 *
 * PRODUCTION: none of the seven is live; all repo-only, never seeded.
 * Repo-fixed: yes. Production-seeded: no. Production-verified: no.
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

const allIds = (probes: Probe[]) =>
  probes.flatMap((p) => [
    ...(p.targetedMisconceptions ?? []),
    ...((p.choices ?? []).map((c) => c.misconceptionId).filter(Boolean) as string[]),
  ])

const find = (conceptId: string, needle: string) => {
  const hits = physics.filter((p) => p.conceptId === conceptId && p.stem.includes(needle))
  expect(hits, `no probe in ${conceptId} matching ${JSON.stringify(needle)}`).toHaveLength(1)
  return hits[0]
}

// ────────────────────────────────────────────────────────────────────────────
// The two mastery-gate content defects. These are the ones that cost a learner
// a certification, not just a repair.
// ────────────────────────────────────────────────────────────────────────────
describe('a mastery gate must not grade a wrong answer', () => {
  /**
   * phys.wave.beats: "3 beats/s against a 196 Hz reference, then 5 beats/s
   * after tightening. Was she above or below?"
   *
   * The old graded answer: "beats increasing after tightening means she moved
   * FURTHER from the reference — since tightening only raises pitch, her
   * original frequency must have been BELOW the reference (flat), ~193 Hz."
   *
   * Those two clauses contradict each other. If raising the pitch moved her
   * further from 196, she was already above it. The sharp branch (199 -> 201)
   * gives 5 beats directly; the flat branch (193 -> 201) requires crossing the
   * reference, so she would have moved TOWARD it first, not "further".
   *
   * This concept's own P4-b probe states the two-branch fact plainly ("5
   * beats, one fork at 440: the other is 435 OR 445"), so the corpus already
   * contradicted this gate internally.
   */
  it('the beats gate names both branches instead of asserting a single wrong one', () => {
    const p = find('phys.wave.beats', '3 beats/s between an open string')
    const v = p.correctValue ?? ''
    expect(v).toMatch(/193/)
    expect(v).toMatch(/199/)
    // the old self-contradiction must be gone
    expect(v).not.toMatch(/must have been below the reference/i)
    expect(v).not.toMatch(/moved further from the reference — since tightening/i)
    // and the discriminating observation must be stated
    expect(v).toMatch(/beats had DROPPED on tightening|dropped on tightening/i)
  })

  it('the sibling probe that corroborated the error still states the two-branch fact', () => {
    // Non-vacuity: if this probe were edited away, the argument above loses its
    // in-corpus corroboration and the gate could silently regress.
    const p = find('phys.wave.beats', 'Two tuning forks give 5 beats per second')
    expect(p.correctValue).toMatch(/435/)
    expect(p.correctValue).toMatch(/445/)
  })

  /**
   * phys.opt.dispersion: red is the outer band of a primary rainbow. The
   * conclusion was right; the stated mechanism was not. "Deviation angle" is
   * the specific quantity D (red ~137.6°, violet ~139.4°) and red's D is
   * SMALLER. The viewing angle from the anti-solar point is 180° − D, which is
   * what is larger for red. The old answer said red "bends less … resulting in
   * a LARGER overall deviation angle", contradicting its own premise.
   */
  it('the rainbow gate distinguishes deviation D from the anti-solar viewing angle', () => {
    const p = find('phys.opt.dispersion', 'red appears at 42° and violet at 40°')
    const v = p.correctValue ?? ''
    expect(v).toMatch(/deviated LESS|deviation is D/i)
    expect(v).toMatch(/180° − D|180° - D/)
    expect(v).not.toMatch(/resulting in a larger overall deviation angle/i)
  })
})

// ────────────────────────────────────────────────────────────────────────────
// Five renames.
// ────────────────────────────────────────────────────────────────────────────
describe('phys.wave / phys.opt renames rejoined to their blueprint ids', () => {
  const retired = [
    'phys.wave.pendulum:MC-HEAVIER-SWINGS-DIFFERENTLY',
    'phys.wave.interference:MC-ENERGY-DESTROYED-AT-MINIMA',
    'phys.opt.lens-power:MC-IGNORE-LENS-SEPARATION',
    'phys.opt.lenses:MC-POWER-ADDITIVE-ALWAYS',
    'phys.opt.polarization:MC-INTERMEDIATE-FILTER-ONLY-BLOCKS',
  ]
  const adopted = [
    'phys.wave.pendulum:MC-PENDULUM-PERIOD-DEPENDS-ON-MASS',
    'phys.wave.interference:MC-INTERFERENCE-DESTROYS-ENERGY',
    'phys.opt.lens-power:MC-POWER-ADDS-FOR-SEPARATED-LENSES',
    'phys.opt.lenses:MC-POWER-SEPARATED',
    'phys.opt.polarization:MC-CROSSED-POLARIZERS-MEANS-ZERO-ALWAYS',
  ]

  it.each(retired)('%s is gone from the whole physics corpus', (id) => {
    expect(allIds(physics)).not.toContain(id)
  })

  it.each(adopted)('%s is carried by at least one probe', (id) => {
    expect(allIds(physics)).toContain(id)
  })

  it('the retired ids are gone from provenance strings too, not just tags', () => {
    // A `source:` line citing an id that no longer exists misleads the next
    // reader as surely as a wrong tag misleads the runtime.
    const sources = [...SEED_PROBES, ...AUTHORED_PROBES]
      .filter((p) => p.conceptId.startsWith('phys.'))
      .map((p) => (p as unknown as { source?: string }).source ?? '')
      .join('\n')
    for (const id of retired) {
      expect(sources).not.toContain(`— ${id.split(':')[1]},`)
    }
  })
})

// ────────────────────────────────────────────────────────────────────────────
// The instrument defect.
// ────────────────────────────────────────────────────────────────────────────
describe('an id containing "=" is not an orphan', () => {
  it('phys.opt.single-slit still targets MC-M=0-IS-DARK', () => {
    // The blueprint documents `### MC-2: MC-M=0-IS-DARK`. The orphan ratchet's
    // parser excluded `=` from its id character class, so the descriptive half
    // parsed as the truncated `MC-M` and this correct tag was counted as an
    // orphan for the whole life of that guard. Corpus was right; instrument
    // was wrong. Pinned so the character class cannot silently narrow again.
    expect(allIds(physics)).toContain('phys.opt.single-slit:MC-M=0-IS-DARK')
  })
})

describe('the phys.wave / phys.opt Stage 4 pass is measured, not assumed', () => {
  it('reads a real corpus of the expected size', () => {
    const wave = physics.filter((p) => p.conceptId.startsWith('phys.wave.'))
    const opt = physics.filter((p) => p.conceptId.startsWith('phys.opt.'))
    expect(new Set(wave.map((p) => p.conceptId)).size).toBeGreaterThanOrEqual(17)
    expect(new Set(opt.map((p) => p.conceptId)).size).toBeGreaterThanOrEqual(15)
    expect(wave.length + opt.length).toBeGreaterThanOrEqual(235)
  })
})
