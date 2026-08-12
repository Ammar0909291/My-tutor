import { describe, it, expect } from 'vitest'
import { probeToMcq } from '@/lib/teaching/gateAssessment'
import { AUTHORED_PROBES } from '@/lib/teaching/assets/authoredSeedAssets'

/**
 * A PROBE SET THAT CANNOT SEPARATE UNDERSTANDING FROM RECALL IS NOT AN
 * ASSESSMENT.
 *
 * ── FOUND IN PRODUCTION, NOT PREDICTED ──────────────────────────────────────
 * Reading a real learner session on `phys.meas.vector-addition` (2026-08-12):
 * every gradeable probe the concept owned used the SAME numbers — the
 * FOUNDATIONAL mcq, the DEVELOPING mcq and the DEVELOPING misconception_probe
 * all asked what 3 N east and 4 N north come to. The live practice sequence
 * then ran 3-4-5, 6-8-10, 30-40-50: every single item a Pythagorean triple,
 * every one answered instantly.
 *
 * A learner who remembers "3 and 4 makes 5" clears CHECK and both PRACTICE
 * gates having understood nothing about vectors. The gate measured recall and
 * reported mastery.
 *
 * ── WHAT THIS TEST PINS ─────────────────────────────────────────────────────
 * Not "probes must be varied" in the abstract — that is unmeasurable. It pins
 * the specific, checkable property that closed this hole: the concept's
 * gradeable set must contain an item whose correct answer is NOT the
 * memorisable one, so the memoriser is caught.
 *
 * Deliberately NOT generalised to every concept. The numeric-fingerprint idea
 * does not survive contact with concepts whose answers are prose, and a
 * sweeping assertion that fails for good reasons trains people to delete it.
 * This guards the case that was actually observed failing, and documents the
 * pattern for authors of the remaining ~100 short concepts.
 */
describe('phys.meas.vector-addition — the gate cannot be cleared by reciting 3-4-5', () => {
  const gradeable = AUTHORED_PROBES.filter(
    (p) => p.conceptId === 'phys.meas.vector-addition'
      && probeToMcq({ stem: p.stem, choices: p.choices ?? null }),
  )

  const correctTextOf = (p: (typeof gradeable)[number]) =>
    (p.choices ?? []).find((c) => c.isCorrect)?.text ?? ''

  it('has gradeable probes at all (anti-vacuity — every assertion below would pass on an empty set)', () => {
    expect(gradeable.length).toBeGreaterThanOrEqual(4)
  })

  it('includes a PARALLEL case, where the memorised answer 5 is WRONG and the answer is 7', () => {
    // The discriminator: same numbers, no right angle. Reciting the triple
    // fails here, which is the whole point.
    const parallel = gradeable.filter((p) => /same way|both .*EAST|pointing EAST and a 4 N force also/i.test(p.stem))
    expect(parallel.length).toBeGreaterThanOrEqual(1)
    expect(correctTextOf(parallel[0])).toMatch(/\b7\s*N\b/)
    // And the memoriser's answer must be present as a trapped distractor,
    // mapped to a misconception, so a wrong answer is diagnostic.
    const recallTrap = (parallel[0].choices ?? []).find((c) => !c.isCorrect && /\b5\s*N\b/.test(c.text))
    expect(recallTrap).toBeDefined()
    expect(recallTrap!.misconceptionId).toBeTruthy()
  })

  it('includes a perpendicular case that is NOT a Pythagorean triple', () => {
    // Guards the assumption the all-triples set taught by accident: that a
    // resultant always comes out a whole number.
    const nonTriple = gradeable.filter((p) => /2 N north and 3 N east|√13|3\.6/i.test(
      p.stem + ' ' + correctTextOf(p),
    ))
    expect(nonTriple.length).toBeGreaterThanOrEqual(1)
    expect(correctTextOf(nonTriple[0])).toMatch(/3\.6|√13/)
  })

  it('the gradeable set holds at least three DISTINCT correct answers', () => {
    /**
     * This is the load-bearing assertion, and the honest accounting of why:
     *
     * The pre-fix gradeable set answered 5 N, 0 N, 5 N, 5 N — so a naive
     * "not every answer is 5" check would have PASSED before the fix (the
     * opposing-forces probe answers 0) and guarded nothing. Counting DISTINCT
     * answers is what actually catches it: pre-fix that set yields {5 N, 0 N}
     * = 2, which fails this assertion. Post-fix it yields 5 / 0 / 7 / 3.6.
     *
     * Three is the number that matters because closing a concept takes three
     * graded correct answers (CHECK 1 + PRACTICE 2). With fewer than three
     * distinct answers available, a learner can in principle satisfy every
     * gate with one memorised value.
     */
    const answers = gradeable.map(correctTextOf)
    const distinct = new Set(
      answers.map((a) => (a.match(/[\d.]+\s*N/)?.[0] ?? a).replace(/\s+/g, '')),
    )
    expect(distinct.size).toBeGreaterThanOrEqual(3)
  })
})
