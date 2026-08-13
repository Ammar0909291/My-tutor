/**
 * THE MASTERY GATE'S QUESTION IS THE SERVER'S, NOT THE MODEL'S.
 *
 * ── THE DEFECT ──────────────────────────────────────────────────────────────
 * `scripts/audit/engine-sweep.ts`, six physics topics against production:
 * **E6 × 17** — a question asked at CHECK or PRACTICE with no MCQ tag — and
 * **0 of 6 topics reached `verified`**. CHECK and PRACTICE advance only on
 * graded correctness; the only deterministic grader needs a declared answer
 * key; producing that key was the model's choice. A learner could answer the
 * gate question perfectly and the gate stayed shut.
 *
 * The prompt lever was tried FIRST and is not what fixed it: the gate clause in
 * `buildMcqInstruction` states the requirement in capitals and explains the
 * consequence, and the sweep after it still found E6 × 17.
 *
 * ── THE FIX THESE TESTS PIN ─────────────────────────────────────────────────
 * The assessment already existed, reviewed, in the moat. The server now selects
 * it (`findBestProbe`), converts it (`probeToMcq`), attaches it as the turn's
 * real MCQ, and tells the model to write only the lead-in.
 *
 * Three properties are load-bearing and each is asserted below:
 *   1. conversion REFUSES anything it cannot grade honestly;
 *   2. the authored corpus actually converts — measured against the real
 *      seed data, not a fixture, because a fix that covers 3 concepts and a
 *      fix that covers 238 are different fixes;
 *   3. an exhausted corpus falls back instead of re-asking.
 */
import { describe, it, expect } from 'vitest'
import { probeToMcq, isMasteryGatePhase, buildGateAssessmentBlock } from '@/lib/teaching/gateAssessment'
import { AUTHORED_PROBES } from '@/lib/teaching/assets/authoredSeedAssets'
import { CHEMISTRY_PROBES } from '@/lib/teaching/assets/chemistrySeedAssets'
import { BIOLOGY_PROBES } from '@/lib/teaching/assets/biologySeedAssets'
import { CS_PROBES } from '@/lib/teaching/assets/csSeedAssets'

import { gradeMcqAnswer } from '@/lib/teaching/mcq'

/** The shape the measurement needs — narrower than SeedProbe on purpose. */
type SeedProbeLike = {
  conceptId: string
  stem: string
  gradeBand: unknown
  choices?: ReadonlyArray<{ text: string; isCorrect: boolean }> | null
}

const probe = (choices: Array<{ text: string; isCorrect: boolean }>, stem = 'Which unit is SI base for temperature?') =>
  ({ stem, choices })

describe('probeToMcq refuses what it cannot grade', () => {
  it('refuses a probe with no choices — a short_answer item is not an MCQ', () => {
    expect(probeToMcq({ stem: 'Explain why averaging does not remove a systematic error.', choices: null })).toBeNull()
  })

  it('refuses fewer than two choices — one option is not a question', () => {
    expect(probeToMcq(probe([{ text: 'kelvin', isCorrect: true }]))).toBeNull()
  })

  it('refuses more than four — the fifth cannot be rendered, and dropping it could drop the answer', () => {
    expect(probeToMcq(probe(
      ['a', 'b', 'c', 'd', 'e'].map((t, i) => ({ text: t, isCorrect: i === 4 })),
    ))).toBeNull()
  })

  it('refuses a probe with NO correct choice — every answer would grade wrong', () => {
    expect(probeToMcq(probe([
      { text: 'kelvin', isCorrect: false },
      { text: 'celsius', isCorrect: false },
    ]))).toBeNull()
  })

  it('refuses a probe with TWO correct choices — a right answer would be marked wrong', () => {
    expect(probeToMcq(probe([
      { text: 'kelvin', isCorrect: true },
      { text: 'K', isCorrect: true },
      { text: 'celsius', isCorrect: false },
    ]))).toBeNull()
  })

  it('refuses duplicate options — parseMcqTag rejects these too, for the same reason', () => {
    expect(probeToMcq(probe([
      { text: 'kelvin', isCorrect: true },
      { text: ' Kelvin ', isCorrect: false },
    ]))).toBeNull()
  })

  it('refuses an empty option text and an empty stem', () => {
    expect(probeToMcq(probe([{ text: 'kelvin', isCorrect: true }, { text: '  ', isCorrect: false }]))).toBeNull()
    expect(probeToMcq(probe([{ text: 'a', isCorrect: true }, { text: 'b', isCorrect: false }], '  '))).toBeNull()
  })
})

describe('probeToMcq reads the authored key, never the prose', () => {
  it('takes correctIndex from isCorrect, in presentation order', () => {
    const m = probeToMcq(probe([
      { text: 'degree Celsius (°C)', isCorrect: false },
      { text: 'kelvin (K)', isCorrect: true },
      { text: 'degree Fahrenheit (°F)', isCorrect: false },
    ]))
    expect(m).not.toBeNull()
    expect(m!.correctIndex).toBe(1)
    expect(m!.options).toEqual(['degree Celsius (°C)', 'kelvin (K)', 'degree Fahrenheit (°F)'])
  })

  /**
   * WHY `correctValue` IS NOT CONSULTED. The real authored row for
   * phys.meas.units carries `correctValue: "kelvin"` while its choice reads
   * `"kelvin (K)"`. Matching those would be a string-similarity guess about
   * which option is right — the exact class of silent mis-grade the MCQ grader
   * was built to avoid. `isCorrect` is unambiguous.
   */
  it('is unaffected by a correctValue that does not equal any option text', () => {
    const m = probeToMcq({
      stem: 'Which of these is the SI base unit for temperature?',
      choices: [
        { text: 'kelvin (K)', isCorrect: true },
        { text: 'degree Celsius (°C)', isCorrect: false },
      ],
      // deliberately present and deliberately not equal to the option text
      ...({ correctValue: 'kelvin' } as object),
    })
    expect(m!.correctIndex).toBe(0)
  })
})

describe('the converted MCQ is gradeable end to end', () => {
  it('tapping the correct option grades correct; tapping a distractor grades wrong', () => {
    const m = probeToMcq(probe([
      { text: 'degree Celsius (°C)', isCorrect: false },
      { text: 'kelvin (K)', isCorrect: true },
    ]))!
    expect(gradeMcqAnswer('kelvin (K)', m)).toEqual({ chosenIndex: 1, correct: true })
    expect(gradeMcqAnswer('degree Celsius (°C)', m)).toEqual({ chosenIndex: 0, correct: false })
  })
})

/**
 * THE COVERAGE MEASUREMENT.
 *
 * Run against the REAL seed corpus, because "the server can select the
 * assessment" is only true where an assessment exists. Physics is the subject
 * under audit; if this number ever falls, the gate silently reverts to the
 * model's discretion for the concepts that dropped out, which is the defect.
 */
describe('the authored corpus actually converts', () => {
  const physics = AUTHORED_PROBES.filter((p) => p.subjectSlug === 'physics')
  const conceptsWithGradeable = new Set(
    physics
      .filter((p) => probeToMcq({ stem: p.stem, choices: p.choices ?? null }))
      .map((p) => p.conceptId),
  )
  const allConcepts = new Set(physics.map((p) => p.conceptId))

  it('every physics concept with an authored probe has at least one GRADEABLE one', () => {
    expect(allConcepts.size).toBeGreaterThanOrEqual(238)
    expect(conceptsWithGradeable.size).toBe(allConcepts.size)
  })

  it('refusals are all non-MCQ probe kinds — no mcq item is being silently dropped', () => {
    const refusedMcqKind = physics.filter(
      (p) => p.probeKind === 'mcq' && !probeToMcq({ stem: p.stem, choices: p.choices ?? null }),
    )
    expect(refusedMcqKind).toEqual([])
  })

  /**
   * THE SHORTFALL, now CLOSED — kept as the guard that it stays closed.
   *
   * Closing a concept needs THREE graded correct answers (CHECK 1 + PRACTICE
   * 2, per MASTERY_CHECK_REQUIRED / MASTERY_PRACTICE_REQUIRED). This test was
   * written when most physics concepts carried only two gradeable authored
   * probes, so the deterministic path ran dry mid-lesson on the majority of
   * them and the last gate fell back to the model. It was a CONTENT gap
   * (author a third probe), not a code one, and it has now been authored out:
   * all 238 physics concepts reach three.
   *
   * `excludeProbeStem` and the model fallback are still live code — they
   * cover repeat visits and any subject that has not reached three yet.
   */
  it('records how many concepts run dry before the gate closes', () => {
    const counts = new Map<string, number>()
    for (const p of physics) {
      if (!probeToMcq({ stem: p.stem, choices: p.choices ?? null })) continue
      counts.set(p.conceptId, (counts.get(p.conceptId) ?? 0) + 1)
    }
    const short = [...counts.values()].filter((n) => n < 3).length
    // Pinned as a MAXIMUM: authoring more probes must never fail this test,
    // losing them must. Ratcheted 145 -> 139 (six phys.mech concepts) -> 131
    // (five phys.therm: carnot-cycle, entropy, heat-engines, refrigerators,
    // third-law; three phys.wave: beats, forced-oscillations, interference)
    // -> 117 (six phys.astro + eight phys.rel) -> 103 (fourteen phys.opt)
    // -> 88 (all fifteen phys.stat) -> 72 (all sixteen phys.particle)
    // -> 53 (all nineteen phys.qm) -> 32 (all twenty-one phys.mod)
    // -> 16 (phys.em electrostatics + DC) -> 0 (phys.em magnetism + AC).
    // ZERO: every physics concept now reaches three gradeable probes. The
    // ratchet form is kept deliberately — it now reads as "never regress".
    expect(short).toBe(0)
    expect(counts.size).toBe(conceptsWithGradeable.size)
  })

  /**
   * THE COUNT ABOVE IS BLIND TO GRADE BAND, AND THAT HID A REAL GAP.
   *
   * `findBestProbe` scores gradeBand, so the three probes a concept needs must
   * be reachable by ONE learner. A concept holding UNDERGRADUATE=2 + HIGH=1
   * counts as 3 above, yet neither learner ever gets three and the last gate
   * still falls back to the model.
   *
   * Found by auditing band distribution rather than totals: four concepts were
   * in this state — phys.mech.hookes-law (pre-existing, MIDDLE=1/HIGH=2) and
   * three created while authoring this very batch, by putting a HIGH probe on
   * concepts whose siblings were all UNDERGRADUATE. All four are fixed; this
   * test stops the mistake being made again, in either direction.
   */
  it('every covered concept reaches three gradeable probes WITHIN a single grade band', () => {
    const byConcept = new Map<string, Map<string, number>>()
    for (const p of physics) {
      if (!probeToMcq({ stem: p.stem, choices: p.choices ?? null })) continue
      if (!byConcept.has(p.conceptId)) byConcept.set(p.conceptId, new Map())
      const bands = byConcept.get(p.conceptId)!
      const band = String(p.gradeBand)
      bands.set(band, (bands.get(band) ?? 0) + 1)
    }

    const splitOnly: string[] = []
    for (const [conceptId, bands] of byConcept) {
      const total = [...bands.values()].reduce((a, b) => a + b, 0)
      if (total < 3) continue // genuinely short — already counted by the ratchet above
      if (![...bands.values()].some((n) => n >= 3)) {
        splitOnly.push(`${conceptId} (${[...bands].map(([b, n]) => `${b}=${n}`).join(' ')})`)
      }
    }

    expect(splitOnly).toEqual([])
  })
})

describe('only the two evidence-gated phases are gates', () => {
  it('CHECK and PRACTICE are gates; the delivery phases and TRANSFER are not', () => {
    expect(isMasteryGatePhase('CHECK')).toBe(true)
    expect(isMasteryGatePhase('PRACTICE')).toBe(true)
    for (const p of ['OBSERVE', 'DEMONSTRATE', 'GUIDE', 'TRANSFER', null, undefined, '']) {
      expect(isMasteryGatePhase(p), String(p)).toBe(false)
    }
  })
})

describe('the prompt block asks for a lead-in, not a question', () => {
  const block = buildGateAssessmentBlock({
    question: 'Which of these is the SI base unit for temperature?',
    options: ['kelvin (K)', 'degree Celsius (°C)'],
    correctIndex: 0,
  })

  it('quotes the question as context so the lead-in can be about THIS question', () => {
    expect(block).toContain('Which of these is the SI base unit for temperature?')
  })

  it('forbids the model writing a competing question or its own tag', () => {
    expect(block).toMatch(/do NOT ask any other question/i)
    expect(block).toMatch(/do NOT emit an MCQ tag/i)
    expect(block).toMatch(/do NOT restate the question/i)
  })

  it('never leaks the mechanism to the learner', () => {
    expect(block).toMatch(/never mention/i)
  })

  it('does not list the options — the learner reads those as buttons', () => {
    expect(block).not.toContain('degree Celsius')
  })
})

/**
 * THE SAME MEASUREMENT, FOR THE SUBJECTS THE GUARD NEVER SAW.
 *
 * ── THE GAP THIS CLOSES ─────────────────────────────────────────────────────
 * Everything above filters `AUTHORED_PROBES` on `subjectSlug === 'physics'`.
 * Chemistry, biology and computer science do not live in `AUTHORED_PROBES` at
 * all — they are separate exported arrays in their own seed files, and every
 * seed writer concatenates them (`scripts/brain/seed-knowledge-assets.ts`,
 * `src/instrumentation.ts`). So the ratchet has been measuring one of four
 * corpora while reporting on "the authored corpus".
 *
 * Measured when this was written, with the identical probeToMcq filter:
 *   chemistry         186 concepts, 169 short of three
 *   biology           108 concepts, 108 short of three
 *   computer_science  119 concepts, 119 short of three
 *
 * Biology and CS carry EXACTLY two gradeable probes on every single concept —
 * the same shape physics was in before the third-probe pass. Their gate runs
 * dry on the last check for every concept they have, and nothing in the suite
 * said so.
 *
 * Pinned as MAXIMA, exactly like the physics ratchet: authoring more probes
 * must never fail this test, losing them must.
 */
describe('the non-physics authored corpora convert too', () => {
  const corpora: ReadonlyArray<readonly [string, readonly SeedProbeLike[], number]> = [
    // [subject, probes, concepts still short of three gradeable probes]
    // chemistry: 186 -> 169 (chem.env, chem.sblock, chem.anal, chem.surface)
    //            -> 149 (chem.redox, chem.dblock, chem.nitro, chem.poly)
    ['chemistry', CHEMISTRY_PROBES, 149],
    ['biology', BIOLOGY_PROBES, 108],
    ['computer_science', CS_PROBES, 119],
  ]

  it.each(corpora)('%s: every concept with a probe has a GRADEABLE one', (_s, probes) => {
    const all = new Set(probes.map((p) => p.conceptId))
    const gradeable = new Set(
      probes
        .filter((p) => probeToMcq({ stem: p.stem, choices: p.choices ?? null }))
        .map((p) => p.conceptId),
    )
    expect(gradeable.size).toBe(all.size)
  })

  it.each(corpora)('%s: concepts short of three, ratcheted', (_s, probes, ceiling) => {
    const counts = new Map<string, number>()
    for (const p of probes) {
      if (!probeToMcq({ stem: p.stem, choices: p.choices ?? null })) continue
      counts.set(p.conceptId, (counts.get(p.conceptId) ?? 0) + 1)
    }
    const short = [...counts.values()].filter((n) => n < 3).length
    expect(short).toBeLessThanOrEqual(ceiling)
  })

  /**
   * The band-aware form, for the same reason it exists on the physics side: a
   * concept split UNDERGRADUATE=2 / HIGH=1 passes the raw count while no
   * single learner ever reaches three. Authoring a third probe into the wrong
   * band would satisfy the ratchet above and fix nothing.
   */
  it.each(corpora)('%s: three within ONE band, ratcheted the same way', (_s, probes, ceiling) => {
    const byConcept = new Map<string, Map<string, number>>()
    for (const p of probes) {
      if (!probeToMcq({ stem: p.stem, choices: p.choices ?? null })) continue
      if (!byConcept.has(p.conceptId)) byConcept.set(p.conceptId, new Map())
      const bands = byConcept.get(p.conceptId)!
      const band = String(p.gradeBand)
      bands.set(band, (bands.get(band) ?? 0) + 1)
    }
    const short = [...byConcept.values()].filter(
      (bands) => ![...bands.values()].some((n) => n >= 3),
    ).length
    expect(short).toBeLessThanOrEqual(ceiling)
  })
})

/**
 * MISCONCEPTION BREADTH — the dimension every count-based ratchet is blind to.
 *
 * ── HOW THIS WAS FOUND ──────────────────────────────────────────────────────
 * Chemistry batch 2 turned up two concepts (`chem.dblock.oxo-species`,
 * `chem.nitro.heterocycles`) whose BOTH probes pointed at MC1, leaving MC2 with
 * no diagnostic at all. On a probe count they looked identical to every other
 * covered concept. Sweeping all four corpora for the pattern found it is not
 * rare:
 *
 *   computer_science   88 of 119 concepts   (74%)
 *   biology            25 of 108            (23%)
 *   chemistry           7 of 186            (4%)
 *   physics             6 of 238  ->  1 after the breadth batch
 *
 * ── WHY IT MATTERS ──────────────────────────────────────────────────────────
 * A concept can satisfy "three gradeable probes" and still test exactly one
 * misconception three times. A learner holding a DIFFERENT documented
 * misconception passes every check the concept offers, and the gate closes on
 * an error that was written down in the blueprint.
 *
 * ── WHAT THIS TEST IS AND IS NOT ────────────────────────────────────────────
 * It is a CANDIDATE signal, not a verdict. It cannot read blueprints, so it
 * cannot know how many misconceptions a concept actually has. Five of the six
 * physics hits were genuine; the sixth, `phys.mech.velocity`, documents only
 * ONE misconception, so three probes on it is correct authoring and it stays
 * in the count forever. Any number here must be confirmed against the concept's
 * blueprint before it is treated as a gap.
 *
 * Pinned as maxima. Losing breadth must fail; gaining it must not.
 */
describe('misconception breadth across every authored corpus', () => {
  const breadthCorpora: ReadonlyArray<readonly [string, readonly SeedProbeLike[], number]> = [
    // [subject, probes, concepts whose gradeable probes share ONE misconception]
    ['physics', AUTHORED_PROBES.filter((p) => p.subjectSlug === 'physics'), 1],
    ['chemistry', CHEMISTRY_PROBES, 7],
    ['biology', BIOLOGY_PROBES, 25],
    ['computer_science', CS_PROBES, 88],
  ]

  const narrowConcepts = (probes: readonly SeedProbeLike[]) => {
    const byConcept = new Map<string, { probes: number; mcs: Set<string> }>()
    for (const p of probes) {
      if (!probeToMcq({ stem: p.stem, choices: p.choices ?? null })) continue
      let entry = byConcept.get(p.conceptId)
      if (!entry) { entry = { probes: 0, mcs: new Set() }; byConcept.set(p.conceptId, entry) }
      entry.probes += 1
      for (const m of (p as { targetedMisconceptions?: readonly string[] }).targetedMisconceptions ?? []) {
        entry.mcs.add(m)
      }
    }
    return [...byConcept.entries()]
      .filter(([, e]) => e.probes >= 2 && e.mcs.size < 2)
      .map(([c]) => c)
  }

  it.each(breadthCorpora)('%s: concepts testing a single misconception, ratcheted', (_s, probes, ceiling) => {
    expect(narrowConcepts(probes).length).toBeLessThanOrEqual(ceiling)
  })

  /**
   * A probe carrying NO targeted misconception is legitimate — the physics
   * corpus uses prerequisite DIAGNOSTIC probes that deliberately carry none.
   * What must never happen is a CONCEPT whose entire gradeable set carries
   * none, because then a wrong answer is not diagnostic of anything.
   */
  it.each(breadthCorpora)('%s: no concept is left with zero targeted misconceptions', (_s, probes) => {
    const byConcept = new Map<string, Set<string>>()
    for (const p of probes) {
      if (!probeToMcq({ stem: p.stem, choices: p.choices ?? null })) continue
      if (!byConcept.has(p.conceptId)) byConcept.set(p.conceptId, new Set())
      const set = byConcept.get(p.conceptId)!
      for (const m of (p as { targetedMisconceptions?: readonly string[] }).targetedMisconceptions ?? []) set.add(m)
    }
    expect([...byConcept.entries()].filter(([, s]) => s.size === 0).map(([c]) => c)).toEqual([])
  })
})
