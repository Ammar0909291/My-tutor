/**
 * PHYSICS CHECK 3 — does the STEM actually diagnose the misconception it is
 * tagged with?
 *
 * The three-check discipline this campaign runs per concept is:
 *   1. probe count within one grade band
 *   2. every documented blueprint misconception has a probe
 *   3. the stem, read against the blueprint's own text, DIAGNOSES the
 *      misconception assigned to it
 *
 * Checks 1 and 2 are structural and already guarded. Check 3 is not
 * mechanically decidable, and it is the one that finds the damaging defects:
 * in chemistry it found 75 mis-tagged concepts and 25 hollow ones that every
 * count, join, breadth and uniqueness test reported as clean. It had never
 * been run on physics.
 *
 * FIRST PHYSICS FINDING — `phys.meas.vector-products`, 2026-08-14.
 *
 * The probe tagged MC-SCALAR-MULTIPLY ("multiplying two vectors just
 * multiplies their magnitudes") asked how much work you do pushing a wall that
 * does not move. A learner who HOLDS that misconception computes
 * |F| x |d| = F x 0 = 0 — the correct answer. The probe cannot separate them,
 * so the misconception passed unseen while the concept measured as covered.
 *
 * And the distractor it was mapped to ("a large positive amount, proportional
 * to how hard you pushed") describes "effort = work", which this blueprint does
 * not register. Selecting it wrote MISCONCEPTION_DETECTED for
 * MC-SCALAR-MULTIPLY and sent the learner into a cos-theta repair for a
 * problem that is actually about displacement. A mis-tag is worse than a gap:
 * a gap teaches nothing, a mis-tag teaches the wrong thing.
 *
 * The discriminator is the blueprint's own Diagnostic Battery DB-2:
 *     "6" (magnitudes only, no cos) -> SIGNAL:MISCONCEPTION:MC-SCALAR-MULTIPLY
 * which requires a NON-ZERO angle, so that the correct answer and the
 * misconception's answer differ. 3 N x 2 m at 60 degrees gives 3 J against 6 J.
 *
 * These tests pin the property, not the wording: a probe claiming a
 * misconception must offer a distractor that a holder of it would actually
 * choose, and that distractor must differ from the correct answer.
 */
import { describe, it, expect } from 'vitest'
import { AUTHORED_PROBES } from '@/lib/teaching/assets/authoredSeedAssets'

type Choice = { text: string; isCorrect?: boolean; misconceptionId?: string }
type Probe = {
  conceptId: string
  probeKind: string
  stem: string
  choices?: Choice[]
  targetedMisconceptions?: string[]
}

const physics = (AUTHORED_PROBES as unknown as Probe[]).filter((p) => p.conceptId.startsWith('phys.'))
const forConcept = (id: string) => physics.filter((p) => p.conceptId === id)

describe('the wall probe no longer claims a misconception it cannot detect', () => {
  const wall = forConcept('phys.meas.vector-products').find((p) => p.stem.includes('heavy wall'))

  it('exists and is still served', () => {
    expect(wall).toBeDefined()
  })

  it('claims no misconception', () => {
    expect(wall!.targetedMisconceptions ?? []).toEqual([])
  })

  it('maps no distractor to a misconception id', () => {
    const mapped = (wall!.choices ?? []).filter((c) => c.misconceptionId)
    expect(mapped).toEqual([])
  })
})

describe('MC-SCALAR-MULTIPLY is carried by a probe that can actually separate it', () => {
  // Choice-bearing carriers only. A short_answer or checkpoint may claim a
  // misconception with no distractor at all — it is graded on keywords or by a
  // human, so "which option would a holder pick" is not a question about it.
  // The defect being pinned here is specifically an MCQ-shaped probe whose
  // options cannot separate the misconception from the correct answer.
  const carriers = forConcept('phys.meas.vector-products').filter(
    (p) =>
      p.choices?.length &&
      (p.targetedMisconceptions ?? []).some((m) => m.endsWith(':MC-SCALAR-MULTIPLY')),
  )

  it('at least one probe claims it', () => {
    expect(carriers.length).toBeGreaterThanOrEqual(1)
  })

  it('every carrier offers a distractor a holder of the misconception would pick', () => {
    for (const p of carriers) {
      const distractor = (p.choices ?? []).find(
        (c) => !c.isCorrect && c.misconceptionId?.endsWith(':MC-SCALAR-MULTIPLY'),
      )
      expect(distractor, `${p.probeKind} has no MC-SCALAR-MULTIPLY distractor`).toBeDefined()
    }
  })

  it('the misconception answer DIFFERS from the correct answer', () => {
    // The whole defect: on the wall stem both were "zero". The bare magnitude
    // product (6) and the dot product (3) must not coincide.
    for (const p of carriers) {
      const correct = (p.choices ?? []).find((c) => c.isCorrect)
      const wrong = (p.choices ?? []).find((c) => c.misconceptionId?.endsWith(':MC-SCALAR-MULTIPLY'))
      expect(correct!.text).not.toBe(wrong!.text)
      // Stated numerically so a future reword cannot quietly reintroduce a
      // stem whose two answers agree.
      expect(correct!.text).toContain('3 J')
      expect(wrong!.text).toContain('6 J')
    }
  })

  it('uses a probeKind that does not re-identify an existing slot', () => {
    // Physics production holds exactly one seeded identity for this concept,
    // `misconception_probe:en:high`. Adding a second probe to an occupied
    // (conceptId, probeKind, gradeBand) slot appends a difficulty segment to
    // BOTH, re-identifying the existing row. A free kind cannot do that.
    const kinds = forConcept('phys.meas.vector-products').map((p) => p.probeKind)
    expect(kinds.filter((k) => k === 'step_check')).toHaveLength(1)
    expect(kinds).not.toContain('true_false')
  })
})

describe('a probe must not assert the misconception its concept repairs', () => {
  /**
   * `phys.meas.units` TRANSFER probe, found 2026-08-14. It asked "What SI BASE
   * unit should be used for volume?" and expected "m³". Volume has no SI base
   * unit — there are exactly seven, and m³ is DERIVED from the metre.
   *
   * That is not a wording slip in this concept. Its own MC-3 is "Common Units
   * (Litre, Centimetre, Hour) Are SI Base Units", whose observable symptom the
   * blueprint states as "Student classifies L, cm, or hr as SI base units; or
   * states SI has more than 7 base units." The mastery gate was asserting the
   * belief the concept exists to repair. The probe carries no tag, so no
   * structural check could see it — only reading the stem against the
   * blueprint does.
   */
  const SI_BASE_UNITS = ['metre', 'meter', 'kilogram', 'second', 'ampere', 'kelvin', 'mole', 'candela']

  it('the units transfer probe no longer calls a derived unit a base unit', () => {
    const probe = forConcept('phys.meas.units').find((p) => p.stem.startsWith('TRANSFER:') && /volume/i.test(p.stem))
    expect(probe, 'the transfer probe must still exist').toBeDefined()
    expect(probe!.stem).not.toMatch(/SI base unit should be used for volume/i)
    // It still teaches the distinction rather than dodging it.
    expect(probe!.stem).toMatch(/which SI base unit is it built from/i)
  })

  it('no physics probe names a non-base unit AS an SI base unit', () => {
    const offenders: string[] = []
    for (const p of physics) {
      const text = [p.stem, (p as { correctValue?: string }).correctValue ?? '',
        ...(p.choices ?? []).map((c) => c.text)].join(' | ')
      // Only inspect probes that make a base-unit claim at all.
      if (!/\bbase unit\b/i.test(text)) continue
      // A claim of the form "<X> ... base unit" where the sentence also asserts
      // a derived unit IS one. The corrected probe passes because it says
      // "DERIVED unit built from the base unit metre".
      const assertsDerivedAsBase =
        /\b(m³|cubic met(re|er)|litre|liter|newton|joule|watt|pascal|hertz|volt|ohm)\b[^.]{0,60}\bis an? SI base unit\b/i.test(text) ||
        /\bSI base unit (?:for|of) (volume|force|energy|power|pressure|frequency|charge)\b/i.test(text)
      if (assertsDerivedAsBase) offenders.push(`${p.conceptId}: ${p.stem.slice(0, 90)}`)
    }
    expect(offenders).toEqual([])
  })

  it('the seven base units are what the corpus actually treats as base', () => {
    // Non-vacuity: the sort-test probe genuinely asks the question, so the
    // guard above is checking a live property rather than an empty set.
    const sort = forConcept('phys.meas.units').find((p) => /which ONE of these is an SI base unit/i.test(p.stem))
    expect(sort).toBeDefined()
    const correct = (sort!.choices ?? []).find((c) => c.isCorrect)
    expect(SI_BASE_UNITS.some((u) => correct!.text.toLowerCase().includes(u))).toBe(true)
  })
})

describe('a claimed misconception always has a distractor to detect it', () => {
  // The general form of the defect, across every physics probe that carries a
  // choice list. A probe may legitimately claim a misconception without
  // choices (short_answer, checkpoint) — those are graded by a human or by
  // keywords, not by a distractor — so only choice-bearing probes are checked.
  it('no choice-bearing physics probe claims a misconception it maps to no option', () => {
    const orphans: string[] = []
    for (const p of physics) {
      if (!p.choices?.length) continue
      const mapped = new Set(p.choices.map((c) => c.misconceptionId).filter(Boolean) as string[])
      for (const claimed of p.targetedMisconceptions ?? []) {
        if (!mapped.has(claimed)) orphans.push(`${p.conceptId} [${p.probeKind}] claims ${claimed}`)
      }
    }
    // Measured at ZERO across all 238 physics concepts, so it is asserted
    // strictly rather than as a ceiling. A loose bound here would have been
    // vacuous, which is worse than no test.
    expect(orphans).toEqual([])
  })

  it('is non-vacuous — physics probes with choices and claims do exist', () => {
    const relevant = physics.filter((p) => p.choices?.length && (p.targetedMisconceptions ?? []).length)
    expect(relevant.length).toBeGreaterThan(200)
  })

  // WHAT THIS FILE CANNOT DO, stated so the number above is not mistaken for
  // a clean bill of health. The structural check passes at zero and DID pass
  // at zero while the wall probe was mis-tagged: that probe carried a properly
  // formed misconceptionId on a distractor, so every count, join, breadth and
  // mapping test read it as correct. Only reading the stem against the
  // blueprint's text exposes it. 222 physics concepts are auditable that way
  // and 1 has been audited. The remaining 221 are not certified by this file.
})
