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
import { gradeMcqAnswer } from '@/lib/teaching/mcq'

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
   * THE PREDICTED SHORTFALL, recorded rather than hidden.
   *
   * Closing a concept needs THREE graded correct answers (CHECK 1 + PRACTICE
   * 2, per MASTERY_CHECK_REQUIRED / MASTERY_PRACTICE_REQUIRED). Most physics
   * concepts carry only two gradeable authored probes, so the deterministic
   * path runs dry mid-lesson on the majority of them and the last gate falls
   * back to the model. That is why `excludeProbeStem` exists and why the
   * fallback path is not dead code — and it is a CONTENT gap (author a third
   * probe), not a code one.
   */
  it('records how many concepts run dry before the gate closes', () => {
    const counts = new Map<string, number>()
    for (const p of physics) {
      if (!probeToMcq({ stem: p.stem, choices: p.choices ?? null })) continue
      counts.set(p.conceptId, (counts.get(p.conceptId) ?? 0) + 1)
    }
    const short = [...counts.values()].filter((n) => n < 3).length
    // Pinned as a MAXIMUM: authoring more probes must never fail this test,
    // losing them must. Ratcheted 145 -> 139 when a third gradeable MCQ was
    // authored for the six phys.mech concepts the audit reaches next
    // (newtons-first-law, kinetic-energy, potential-energy,
    // conservation-of-momentum, conservation-of-angular-momentum,
    // kinematics-2d). Tighten this number whenever more are authored.
    expect(short).toBeLessThanOrEqual(139)
    expect(counts.size).toBe(conceptsWithGradeable.size)
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
