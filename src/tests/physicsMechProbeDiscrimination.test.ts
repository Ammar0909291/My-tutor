/**
 * MOAT STAGE 4 (stem-vs-blueprint) — the phys.mech domain pass.
 *
 * ── WHY THIS FILE EXISTS ────────────────────────────────────────────────────
 * Every structural check over this corpus was green while the defects below
 * were live. Ids joined, distractors mapped, breadth was covered, counts read
 * healthy. Stage 4 is the one check that cannot be automated in the general
 * case: read each probe's stem against its blueprint's misconception body and
 * ask whether a learner who HOLDS that misconception could still answer
 * correctly. If yes, the probe cannot detect what it claims to detect.
 *
 * 60 concepts / 420 probes read. 12 defects in 5 classes. This file pins one
 * guard per CLASS, plus every individual correction, so a revert fails with
 * the specific id or stem rather than a count.
 *
 * ── PRODUCTION REALITY, STATED PLAINLY ──────────────────────────────────────
 * Queried directly. Of the twelve, exactly ONE is live: the
 * `phys.mech.newtons-first-law:mcq:en:high:proficient` row is ACTIVE in
 * production carrying `M1` — an id that joins to no blueprint entry, so the
 * detection fires and the repair can never resolve. Every other defective
 * probe is repo-only and has never been seeded. The fix here is AT SOURCE:
 * the production row still carries `M1` and will keep carrying it, because the
 * seed script skips identities that already exist and this campaign makes no
 * production writes. Re-seeding that one row is owner-gated work.
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

const mech = physics.filter((p) => p.conceptId.startsWith('phys.mech.'))

/** Every misconception id a probe claims OR maps to a distractor. */
const allIds = (probes: Probe[]) =>
  probes.flatMap((p) => [
    ...(p.targetedMisconceptions ?? []),
    ...((p.choices ?? []).map((c) => c.misconceptionId).filter(Boolean) as string[]),
  ])

const find = (conceptId: string, needle: string) => {
  const hits = mech.filter((p) => p.conceptId === conceptId && p.stem.includes(needle))
  expect(hits, `no phys.mech probe in ${conceptId} matching ${JSON.stringify(needle)}`).toHaveLength(1)
  return hits[0]
}

// ────────────────────────────────────────────────────────────────────────────
// CLASS 1 — a probe renames a misconception its own blueprint documents.
// ────────────────────────────────────────────────────────────────────────────
describe('class 1: a second name for a misconception the blueprint already documents', () => {
  /**
   * `MISCONCEPTION_DETECTED` is written against the id. An id that joins to no
   * blueprint entry has no bridge_text and no replacement_text to run, so the
   * learner is DETECTED and then NOT REPAIRED. Five such ids in phys.mech were
   * confirmed — by reading the blueprint's own trigger-signal prose, never by
   * token similarity, which the ledger already records as having failed once
   * (MC-SUVAT-UNIVERSAL and MC-APPLIES-ALWAYS are the same belief and share no
   * words).
   *
   *   conservative-forces  MC-PATH-MATTERS -> MC-PATH-INDEPENDENCE-HARD
   *     whose trigger signal is verbatim "gravity does more work when you fall
   *     a longer path (e.g. along a ramp vs vertically)". NOTE: the id
   *     MC-PATH-MATTERS is legitimate on phys.mech.conservation-of-energy,
   *     which does document it — only the conservative-forces copies moved.
   *   kinematics-2d        MC-AXES-NOT-INDEPENDENT -> MC-AXES-COUPLED
   *     same blueprint, same horizontal-throw-from-a-cliff conflict evidence.
   *   projectile-motion    MC-MASS-AFFECTS-FALL -> MC-HEAVIER-FALLS-FASTER
   *     trigger signal: "a heavier ball reaches the ground first when thrown
   *     horizontally" — the orphan-tagged probe is that scenario exactly.
   *   relative-motion      MC-SCALAR-VECTOR-ADDITION -> MC-FRAMES-ADD-SPEEDS
   *     trigger signal: "always adds magnitudes of velocities regardless of
   *     direction", and its discrimination pair is the perpendicular case.
   *   newtons-first-law    M1 -> MC-1
   *     MC-1's repair chain ends at P32 "spaceship with engines off"; the
   *     M1-tagged probe is the spaceship-engine-cuts-out item. This is the one
   *     that is live in production (see the header).
   *
   * Retagging changes no canonicalSlug — the slug is
   * conceptId:probeKind:gradeBand[:difficulty] — so no seeded identity is
   * stranded and no probe slot is re-identified.
   */
  const retired = [
    'phys.mech.conservative-forces:MC-PATH-MATTERS',
    'phys.mech.kinematics-2d:MC-AXES-NOT-INDEPENDENT',
    'phys.mech.projectile-motion:MC-MASS-AFFECTS-FALL',
    'phys.mech.relative-motion:MC-SCALAR-VECTOR-ADDITION',
    'phys.mech.newtons-first-law:M1',
  ]
  const adopted = [
    'phys.mech.conservative-forces:MC-PATH-INDEPENDENCE-HARD',
    'phys.mech.kinematics-2d:MC-AXES-COUPLED',
    'phys.mech.projectile-motion:MC-HEAVIER-FALLS-FASTER',
    'phys.mech.relative-motion:MC-FRAMES-ADD-SPEEDS',
    'phys.mech.newtons-first-law:MC-1',
  ]

  it.each(retired)('%s is gone from the whole physics corpus', (id) => {
    expect(allIds(physics)).not.toContain(id)
  })

  it.each(adopted)('%s is carried by at least one probe', (id) => {
    expect(allIds(physics)).toContain(id)
  })

  it('MC-PATH-MATTERS survives where it is legitimate (conservation-of-energy)', () => {
    // Guards against over-correction by find-and-replace: the same id name is
    // documented on a DIFFERENT concept and must not have been swept up.
    expect(allIds(physics)).toContain('phys.mech.conservation-of-energy:MC-PATH-MATTERS')
  })
})

// ────────────────────────────────────────────────────────────────────────────
// CLASS 2 — a crossed pair: two ids both documented, the probe carried the
// wrong one. Structurally invisible: the id joins, so every join test passes.
// ────────────────────────────────────────────────────────────────────────────
describe('class 2: a documented id attached to the other documented misconception', () => {
  it('the normal-force Third-Law probe diagnoses MC-NORMAL-IS-REACTION, not the magnitude belief', () => {
    const p = find('phys.mech.normal-force', 'Is the normal force the Third-Law reaction')
    expect(p.targetedMisconceptions).toEqual(['phys.mech.normal-force:MC-NORMAL-IS-REACTION'])
    const wrong = (p.choices ?? []).find((c) => !c.isCorrect)
    expect(wrong?.misconceptionId).toBe('phys.mech.normal-force:MC-NORMAL-IS-REACTION')
  })

  it('the magnitude belief keeps the probes that genuinely test magnitude', () => {
    // Non-vacuity: MC-NORMAL-EQUALS-WEIGHT must not have been emptied out.
    // Its real carriers are the incline / flat-vs-incline / dip-and-hill items.
    const carriers = mech.filter((p) =>
      (p.targetedMisconceptions ?? []).includes('phys.mech.normal-force:MC-NORMAL-EQUALS-WEIGHT'),
    )
    expect(carriers.length).toBeGreaterThanOrEqual(3)
    // and none of them is a Third-Law-pairing question
    for (const c of carriers) expect(c.stem).not.toMatch(/Third-Law reaction/i)
  })
})

// ────────────────────────────────────────────────────────────────────────────
// CLASS 3 — the distractor expresses a belief the tag does not name, and no
// id on this concept names it either. Untagged rather than retargeted.
// ────────────────────────────────────────────────────────────────────────────
describe('class 3: a tag whose distractor expresses no misconception of that concept', () => {
  const cases: ReadonlyArray<readonly [string, string, string]> = [
    // [conceptId, stem fragment, the false tag that was removed]
    ['phys.mech.kinetic-energy', 'A 10 N force pulls a 3 kg box 5 m', 'MC-KE-LINEAR'],
    ['phys.mech.work-energy-theorem', 'A 5 kg cart moves at 6 m/s (KE?)', 'MC-PARTIAL-WORK'],
  ]

  it.each(cases)('%s prerequisite diagnostic claims nothing it cannot detect', (concept, frag) => {
    const p = find(concept, frag)
    expect(p.targetedMisconceptions ?? []).toEqual([])
    for (const c of p.choices ?? []) expect(c.misconceptionId).toBeUndefined()
  })

  it.each(cases)('%s: the real misconception %s keeps carriers that do detect it', (concept, _frag, mc) => {
    // Untagging must not silently drop a documented misconception's coverage.
    const id = `${concept}:${mc}`
    const carriers = mech.filter((p) => (p.targetedMisconceptions ?? []).includes(id))
    expect(carriers.length).toBeGreaterThanOrEqual(2)
  })
})

// ────────────────────────────────────────────────────────────────────────────
// CLASS 4 — the stem does not discriminate: a holder of the tagged
// misconception reaches the graded-correct answer without abandoning it.
// This is the class the phys.meas wall probe belonged to.
// ────────────────────────────────────────────────────────────────────────────
describe('class 4: a stem a misconception-holder could answer correctly', () => {
  it('acceleration retrieval now asks about the zero-velocity instant, not just opposite directions', () => {
    // Old stem asked only "can a and v point in opposite directions?" — a
    // holder of "momentarily at rest means no acceleration" answers that
    // correctly, because the ball-thrown-up example is about the RISE.
    const p = find('phys.mech.acceleration', 'Distinguish acceleration and velocity')
    expect(p.targetedMisconceptions).toContain(
      'phys.mech.acceleration:MC-ZERO-VELOCITY-ZERO-ACCELERATION',
    )
    expect(p.stem).toMatch(/zero velocity and non-zero acceleration at the same instant/i)
    expect(p.correctValue).toMatch(/zero velocity does not mean zero acceleration/i)
  })

  it('the canonical-transformations example is now one the misconception gets WRONG', () => {
    // The sharpest form of this class: the old example (Q=2q, P=p/2) really is
    // canonical, so "any smooth coordinate change is canonical" produced the
    // correct verdict and was graded right. Q=2q, P=2p is equally "just a
    // scaling" and is NOT canonical.
    const p = find('phys.mech.canonical-transformations', 'is canonical because it’s just a scaling')
    expect(p.stem).toContain('Q=2q, P=2p')
    expect(p.stem).not.toContain('P=p/2 is canonical')
    expect(p.correctValue).toMatch(/REFUTE/)
    expect(p.correctValue).toMatch(/4≠1|4 ≠ 1/)
  })

  it('the circular-motion retrieval item now requires direction and the real agent', () => {
    // A centrifugal-force believer computes ω, v and |F| identically. The
    // belief is about direction and about which object exerts the force.
    const p = find('phys.mech.circular-motion', 'moves in a horizontal circle of radius 0.5 m')
    expect(p.targetedMisconceptions).toContain('phys.mech.circular-motion:MC-CENTRIFUGAL-REAL')
    expect(p.stem).toMatch(/which way that force points/i)
    expect(p.stem).toMatch(/outward force/i)
    expect(p.correctValue).toMatch(/INWARD/)
    expect(p.correctValue).toMatch(/No outward force acts on the mass/i)
  })

  it('the Hamilton-Jacobi item now asks the question the belief gets wrong', () => {
    // Verifying a candidate S against the PDE is pure differentiation, which a
    // holder of "S is just the action along a known path" performs perfectly.
    const p = find('phys.mech.hamilton-jacobi-equation', 'verify that S=px−p²t/(2m)')
    expect(p.targetedMisconceptions).toContain(
      'phys.mech.hamilton-jacobi-equation:MC-HJ-S-IS-ACTION',
    )
    expect(p.stem).toMatch(/need to know the particle's trajectory in advance/i)
    expect(p.correctValue).toMatch(/No trajectory was needed/i)
  })
})

// ────────────────────────────────────────────────────────────────────────────
// CLASS 5 — the tag is right for the stem, but the distractor TEXT states a
// different misconception, so the wrong repair runs on a correct detection.
// ────────────────────────────────────────────────────────────────────────────
describe('class 5: a distractor that states a different misconception than its tag', () => {
  it('the satellite distractor expresses MC-4 (applies only at rest), not MC-1 (needs force to keep moving)', () => {
    const p = find('phys.mech.newtons-first-law', 'A satellite travels at 7,000 m/s')
    expect(p.targetedMisconceptions).toEqual(['phys.mech.newtons-first-law:MC-4'])
    const wrong = (p.choices ?? []).find((c) => !c.isCorrect)
    expect(wrong?.misconceptionId).toBe('phys.mech.newtons-first-law:MC-4')
    // MC-4's belief: the law is about objects at rest.
    expect(wrong?.text).toMatch(/about objects at rest/i)
    // MC-1's belief, which this distractor used to state, must be gone from it.
    expect(wrong?.text).not.toMatch(/needs thrust to maintain/i)
  })
})

// ────────────────────────────────────────────────────────────────────────────
// Non-vacuity, and the honest limit of this file.
// ────────────────────────────────────────────────────────────────────────────
describe('the phys.mech Stage 4 pass is measured, not assumed', () => {
  it('reads a real corpus of the expected size', () => {
    // 60 concepts / 420 probes at the time of the pass. Bounds, not equalities,
    // so authoring can continue — but a collapse to a stub corpus fails here,
    // which is what would otherwise make every assertion above vacuous.
    expect(new Set(mech.map((p) => p.conceptId)).size).toBeGreaterThanOrEqual(60)
    expect(mech.length).toBeGreaterThanOrEqual(400)
  })

  // WHAT THIS FILE DOES NOT CERTIFY. Stage 4 asks one question per probe and
  // it was asked of all 420 in phys.mech. It says nothing about the other
  // phys.* domains: 8 concepts (phys.meas) and 60 (phys.mech) of 222
  // blueprint-backed physics concepts have now been read this way. It also
  // says nothing about whether the corrected corpus reaches a learner — that
  // is Stage 8, and production carries 2 of these 12 corrections' concepts at
  // all, with the M1 row still wrong.
})
