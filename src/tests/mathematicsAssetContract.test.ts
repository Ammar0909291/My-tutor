/**
 * The seed corpus must be able to certify a concept on its own.
 *
 * `math.found.logic` failed for a real learner because the concept held two
 * closed-choice probes and mastery needs three graded answers, so the pool ran
 * dry and the last question fell to the model's discretion. This asserts the
 * arithmetic concepts that serve content now carry enough authored, gradeable
 * questions to reach mastery without that discretion — and fails if anyone
 * removes one.
 */
import { describe, it, expect } from 'vitest'
import { AUTHORED_PROBES } from '@/lib/teaching/assets/authoredSeedAssets'
import { MATHEMATICS_PROBES } from '@/lib/teaching/assets/mathematicsSeedAssets'
import {
  MATHEMATICS_FOUNDATION_EXPLANATIONS,
  MATHEMATICS_FOUNDATION_PROBES,
} from '@/lib/teaching/assets/mathematicsFoundationAssets'
import {
  MATHEMATICS_ARITHMETIC_EXPLANATIONS,
  MATHEMATICS_ARITHMETIC_PROBES,
} from '@/lib/teaching/assets/mathematicsArithmeticFoundations'
import {
  MATHEMATICS_BATCH3_EXPLANATIONS,
  MATHEMATICS_BATCH3_PROBES,
} from '@/lib/teaching/assets/mathematicsBatch3Assets'
import {
  MATHEMATICS_GEOMETRY_EXPLANATIONS,
  MATHEMATICS_GEOMETRY_PROBES,
} from '@/lib/teaching/assets/mathematicsGeometryFoundations'
import {
  MATHEMATICS_FRACTION_EXPLANATIONS,
  MATHEMATICS_FRACTION_PROBES,
} from '@/lib/teaching/assets/mathematicsFractionDecimalAssets'
import {
  MATHEMATICS_PROPORTION_EXPLANATIONS,
  MATHEMATICS_PROPORTION_PROBES,
} from '@/lib/teaching/assets/mathematicsProportionProofAssets'
import {
  MATHEMATICS_ALGEBRA_VOCAB_EXPLANATIONS,
  MATHEMATICS_ALGEBRA_VOCAB_PROBES,
} from '@/lib/teaching/assets/mathematicsAlgebraVocabAssets'
import {
  MATHEMATICS_POWERS_VARIATION_EXPLANATIONS,
  MATHEMATICS_POWERS_VARIATION_PROBES,
} from '@/lib/teaching/assets/mathematicsPowersVariationAssets'
import {
  MATHEMATICS_SET_OPERATIONS_EXPLANATIONS,
  MATHEMATICS_SET_OPERATIONS_PROBES,
} from '@/lib/teaching/assets/mathematicsSetOperationsAssets'
import { SEED_PROBES, seedCanonicalSlug } from '@/lib/teaching/assets/brainSeedAssets'
import { evaluateAssetContract, MIN_CLOSED_CHOICE_PROBES } from '@/lib/teaching/assetContract'

const ALL = [...SEED_PROBES, ...AUTHORED_PROBES, ...MATHEMATICS_PROBES, ...MATHEMATICS_FOUNDATION_PROBES, ...MATHEMATICS_ARITHMETIC_PROBES, ...MATHEMATICS_BATCH3_PROBES, ...MATHEMATICS_GEOMETRY_PROBES, ...MATHEMATICS_FRACTION_PROBES, ...MATHEMATICS_PROPORTION_PROBES, ...MATHEMATICS_ALGEBRA_VOCAB_PROBES, ...MATHEMATICS_POWERS_VARIATION_PROBES, ...MATHEMATICS_SET_OPERATIONS_PROBES]
const isClosedChoice = (p: { choices?: unknown[] }) => (p.choices?.length ?? 0) >= 2

/**
 * EVERY mathematics concept that currently serves content — all 43, not just the
 * spine's. Each must hold >= 3 closed-choice probes at every band it serves, so
 * a perfect learner can reach mastery without the model volunteering a question.
 *
 * Measured against production on 2026-08-18 this list stood at ZERO: 40 concepts
 * held two probes and 3 held one. That is why a learner could answer three
 * PRACTICE questions correctly on math.found.logic and still not finish.
 */
const COVERED = [
  // math.arith
  'math.arith.addition', 'math.arith.subtraction', 'math.arith.multiplication',
  'math.arith.division', 'math.arith.fractions', 'math.arith.fraction-equivalence',
  'math.arith.fraction-multiplication', 'math.arith.order-of-operations',
  'math.arith.ratios', 'math.arith.exponentiation',
  // math.found
  'math.found.integers', 'math.found.logic', 'math.found.natural-numbers',
  'math.found.rational-numbers', 'math.found.set',
  // math.geom
  'math.geom.angle', 'math.geom.circle', 'math.geom.coordinate-plane',
  'math.geom.right-triangle', 'math.geom.similar-triangles', 'math.geom.slope',
  'math.geom.triangle', 'math.geom.vectors-2d',
  // math.nt
  'math.nt.prime-number',
  // math.alg
  'math.alg.equation', 'math.alg.expression', 'math.alg.like-terms',
  'math.alg.linear-equation-1var', 'math.alg.quadratic-equation',
  // math.calc
  'math.calc.limits', 'math.calc.derivative-intro', 'math.calc.chain-rule',
  'math.calc.antiderivatives',
  // math.linalg / abst / func
  'math.linalg.determinant', 'math.linalg.matrix-multiplication',
  'math.abst.group-theory', 'math.func.function-concept',
  // math.prob / trig
  'math.prob.classical-probability', 'math.prob.conditional-probability',
  'math.prob.expected-value', 'math.trig.right-triangle-trig',
  'math.trig.trig-functions', 'math.trig.unit-circle',
]

describe('mathematics seed probes', () => {
  it.each(COVERED)('%s reaches the closed-choice floor at every band it serves', (conceptId) => {
    const mine = ALL.filter((p) => p.conceptId === conceptId && isClosedChoice(p))
    const byBand = new Map<string, number>()
    for (const p of mine) byBand.set(p.gradeBand, (byBand.get(p.gradeBand) ?? 0) + 1)

    expect(byBand.size).toBeGreaterThan(0)
    for (const [band, n] of byBand) {
      const verdict = evaluateAssetContract({ explanations: 1, closedChoiceProbes: n })
      expect(verdict.satisfied, `${conceptId} @ ${band}: only ${n} closed-choice probes`).toBe(true)
      expect(n).toBeGreaterThanOrEqual(MIN_CLOSED_CHOICE_PROBES)
    }
  })

  it('every new probe is gradeable — 2-4 choices, exactly one correct', () => {
    for (const p of MATHEMATICS_PROBES) {
      const n = p.choices?.length ?? 0
      expect(n, p.stem).toBeGreaterThanOrEqual(2)
      expect(n, p.stem).toBeLessThanOrEqual(4)
      expect(p.choices?.filter((c) => c.isCorrect).length, p.stem).toBe(1)
    }
  })

  it('every distractor names the misconception it catches', () => {
    for (const p of MATHEMATICS_PROBES) {
      for (const c of p.choices ?? []) {
        if (c.isCorrect) continue
        expect(c.misconceptionId, `${p.stem} -> "${c.text}"`).toBeTruthy()
      }
    }
  })

  it('no option is filler, a joke, or "none of the above"', () => {
    for (const p of MATHEMATICS_PROBES) {
      for (const c of p.choices ?? []) {
        expect(c.text.trim().length, p.stem).toBeGreaterThan(0)
        expect(c.text).not.toMatch(/none of the above|all of the above/i)
      }
    }
  })

  it('claims a distinct identity — no probe silently displaces another', () => {
    const slugs = ALL.map((p) => seedCanonicalSlug(p.conceptId, p.probeKind, p.gradeBand, p.difficulty))
    const seen = new Set<string>()
    const clashes = slugs.filter((s) => (seen.has(s) ? true : (seen.add(s), false)))
    expect(clashes).toEqual([])
  })

  it('carries a traceable source for every probe', () => {
    for (const p of MATHEMATICS_PROBES) {
      expect(p.source, p.stem).toMatch(/^docs\/curriculum\/blueprints\/math\./)
      expect(p.targetedMisconceptions.length, p.stem).toBeGreaterThan(0)
    }
  })
})

/**
 * The foundations batch — concepts that served the learner NOTHING until now.
 *
 * 221 spine concepts carry a full Educational Brain entry and no serving assets,
 * because an EB entry only reaches a lesson once it is transcribed into
 * AssetIdentity. Among them was `math.found.mathematical-thinking` — the ROOT of
 * the subject, zero prerequisites, the first thing a beginner meets.
 */
describe('mathematics foundations — newly serving concepts', () => {
  const NEW = [
    'math.found.mathematical-thinking', 'math.found.definition',
    'math.found.set-membership', 'math.found.empty-set', 'math.found.subset',
    'math.found.proposition', 'math.found.logical-connectives', 'math.found.truth-table',
  ]

  it.each(NEW)('%s now meets the contract — an explanation and 3 probes', (conceptId) => {
    const explanations = MATHEMATICS_FOUNDATION_EXPLANATIONS.filter((e) => e.conceptId === conceptId)
    const probes = MATHEMATICS_FOUNDATION_PROBES.filter((p) => p.conceptId === conceptId && isClosedChoice(p))
    expect(explanations.length).toBeGreaterThanOrEqual(1)
    const verdict = evaluateAssetContract({
      explanations: explanations.length, closedChoiceProbes: probes.length,
    })
    expect(verdict.satisfied, `${conceptId}: ${verdict.shortfall}`).toBe(true)
  })

  it('the root of the subject is covered', () => {
    expect(NEW).toContain('math.found.mathematical-thinking')
  })

  it('explanations teach — they do not open with a bare definition', () => {
    // A definition-first opening is the most-recorded teaching failure in this
    // project's notes, so the house style anchors first and names second.
    for (const e of MATHEMATICS_FOUNDATION_EXPLANATIONS) {
      expect(e.content.length, e.conceptId).toBeGreaterThan(400)
      expect(e.content, e.conceptId).not.toMatch(/^(A|An|The)\s+\w+\s+is\s+defined\s+as/i)
    }
  })

  it('every probe is gradeable and every distractor names its misconception', () => {
    for (const p of MATHEMATICS_FOUNDATION_PROBES) {
      const n = p.choices?.length ?? 0
      expect(n, p.stem).toBeGreaterThanOrEqual(2)
      expect(n, p.stem).toBeLessThanOrEqual(4)
      expect(p.choices?.filter((c) => c.isCorrect).length, p.stem).toBe(1)
      for (const c of p.choices ?? []) {
        if (!c.isCorrect) expect(c.misconceptionId, `${p.stem} -> "${c.text}"`).toBeTruthy()
      }
    }
  })

  it('every asset cites the Educational Brain entry it came from', () => {
    for (const a of [...MATHEMATICS_FOUNDATION_EXPLANATIONS, ...MATHEMATICS_FOUNDATION_PROBES, ...MATHEMATICS_ARITHMETIC_PROBES, ...MATHEMATICS_BATCH3_PROBES, ...MATHEMATICS_GEOMETRY_PROBES, ...MATHEMATICS_FRACTION_PROBES, ...MATHEMATICS_PROPORTION_PROBES, ...MATHEMATICS_ALGEBRA_VOCAB_PROBES, ...MATHEMATICS_POWERS_VARIATION_PROBES, ...MATHEMATICS_SET_OPERATIONS_PROBES]) {
      expect(a.source).toMatch(/^educational-brain\/concepts\/mathematics\/math\./)
    }
  })
})

/**
 * Early arithmetic — the ground a beginner stands on before anything else.
 * Counting, place value and the number line every later idea gets drawn on.
 * All eight had an Educational Brain entry and served the learner nothing.
 */
describe('mathematics early arithmetic — newly serving concepts', () => {
  const NEW = [
    'math.arith.counting', 'math.arith.counting-sequence', 'math.arith.subitizing',
    'math.arith.place-value', 'math.arith.ones-tens-hundreds', 'math.arith.expanded-form',
    'math.arith.number-line', 'math.arith.ordering',
  ]

  it.each(NEW)('%s now meets the contract', (conceptId) => {
    const explanations = MATHEMATICS_ARITHMETIC_EXPLANATIONS.filter((e) => e.conceptId === conceptId)
    const probes = MATHEMATICS_ARITHMETIC_PROBES.filter((p) => p.conceptId === conceptId && isClosedChoice(p))
    expect(explanations.length, conceptId).toBeGreaterThanOrEqual(1)
    const verdict = evaluateAssetContract({
      explanations: explanations.length, closedChoiceProbes: probes.length,
    })
    expect(verdict.satisfied, `${conceptId}: ${verdict.shortfall}`).toBe(true)
  })

  it('an explanation and its probes agree on the band', () => {
    // A band with probes and no explanation is worse than no band at all: the
    // gate would find questions to ask and nothing to teach from.
    for (const conceptId of NEW) {
      const bands = new Set(MATHEMATICS_ARITHMETIC_EXPLANATIONS
        .filter((e) => e.conceptId === conceptId).map((e) => e.gradeBand))
      for (const p of MATHEMATICS_ARITHMETIC_PROBES.filter((x) => x.conceptId === conceptId)) {
        expect(bands.has(p.gradeBand), `${conceptId} probe at ${p.gradeBand}`).toBe(true)
      }
    }
  })

  it('every probe is gradeable and every distractor names its misconception', () => {
    for (const p of MATHEMATICS_ARITHMETIC_PROBES) {
      expect(p.choices?.filter((c) => c.isCorrect).length, p.stem).toBe(1)
      for (const c of p.choices ?? []) {
        if (!c.isCorrect) expect(c.misconceptionId, `${p.stem} -> "${c.text}"`).toBeTruthy()
      }
    }
  })

  it('the youngest bands keep sentences short — first-lesson/02 register', () => {
    const early = MATHEMATICS_ARITHMETIC_EXPLANATIONS.filter((e) => e.gradeBand === 'EARLY')
    expect(early.length).toBeGreaterThan(0)
    for (const e of early) {
      const sentences = e.content.split(/(?<=[.!?])\s+/).filter((x) => x.trim().length > 0)
      const longest = Math.max(...sentences.map((x) => x.split(/\s+/).length))
      expect(longest, `${e.conceptId} has a ${longest}-word sentence`).toBeLessThanOrEqual(34)
    }
  })
})

/**
 * Third batch — written procedures, and the vocabulary of proof.
 */
describe('mathematics batch 3 — newly serving concepts', () => {
  const NEW = [
    'math.arith.column-addition', 'math.arith.mental-addition',
    'math.arith.multiplication-table', 'math.arith.remainder',
    'math.arith.divisor-dividend', 'math.found.set-equality',
    'math.found.proper-subset', 'math.found.axiom',
  ]

  it.each(NEW)('%s now meets the contract', (conceptId) => {
    const explanations = MATHEMATICS_BATCH3_EXPLANATIONS.filter((e) => e.conceptId === conceptId)
    const probes = MATHEMATICS_BATCH3_PROBES.filter((p) => p.conceptId === conceptId && isClosedChoice(p))
    expect(explanations.length, conceptId).toBeGreaterThanOrEqual(1)
    const verdict = evaluateAssetContract({
      explanations: explanations.length, closedChoiceProbes: probes.length,
    })
    expect(verdict.satisfied, `${conceptId}: ${verdict.shortfall}`).toBe(true)
  })

  it('probes never appear at a band the explanation does not cover', () => {
    for (const conceptId of NEW) {
      const bands = new Set(MATHEMATICS_BATCH3_EXPLANATIONS
        .filter((e) => e.conceptId === conceptId).map((e) => e.gradeBand))
      for (const p of MATHEMATICS_BATCH3_PROBES.filter((x) => x.conceptId === conceptId)) {
        expect(bands.has(p.gradeBand), `${conceptId} probe at ${p.gradeBand}`).toBe(true)
      }
    }
  })

  it('every probe is gradeable and every distractor names its misconception', () => {
    for (const p of MATHEMATICS_BATCH3_PROBES) {
      expect(p.choices?.filter((c) => c.isCorrect).length, p.stem).toBe(1)
      for (const c of p.choices ?? []) {
        if (!c.isCorrect) expect(c.misconceptionId, `${p.stem} -> "${c.text}"`).toBeTruthy()
      }
    }
  })
})

/**
 * ACROSS EVERY BATCH. Written once so a future batch cannot quietly reuse an
 * identity or drop a citation — the seed validator catches collisions, but only
 * for assets that reach it, and only at seed time.
 */
describe('all authored mathematics batches together', () => {
  const ALL_EXPLANATIONS = [
    ...MATHEMATICS_FOUNDATION_EXPLANATIONS,
    ...MATHEMATICS_ARITHMETIC_EXPLANATIONS,
    ...MATHEMATICS_BATCH3_EXPLANATIONS,
    ...MATHEMATICS_GEOMETRY_EXPLANATIONS,
    ...MATHEMATICS_FRACTION_EXPLANATIONS,
    ...MATHEMATICS_PROPORTION_EXPLANATIONS,
    ...MATHEMATICS_ALGEBRA_VOCAB_EXPLANATIONS,
    ...MATHEMATICS_POWERS_VARIATION_EXPLANATIONS,
    ...MATHEMATICS_SET_OPERATIONS_EXPLANATIONS,
  ]
  const ALL_NEW_PROBES = [
    ...MATHEMATICS_FOUNDATION_PROBES,
    ...MATHEMATICS_ARITHMETIC_PROBES,
    ...MATHEMATICS_BATCH3_PROBES,
    ...MATHEMATICS_GEOMETRY_PROBES,
    ...MATHEMATICS_FRACTION_PROBES,
    ...MATHEMATICS_PROPORTION_PROBES,
    ...MATHEMATICS_ALGEBRA_VOCAB_PROBES,
    ...MATHEMATICS_POWERS_VARIATION_PROBES,
    ...MATHEMATICS_SET_OPERATIONS_PROBES,
  ]

  it('no concept is authored twice across batches', () => {
    const ids = ALL_EXPLANATIONS.map((e) => `${e.conceptId}:${e.gradeBand}`)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('every asset cites the Educational Brain entry it came from', () => {
    for (const a of [...ALL_EXPLANATIONS, ...ALL_NEW_PROBES]) {
      expect(a.source, a.conceptId).toMatch(/^educational-brain\/concepts\/mathematics\/math\./)
    }
  })

  it('no explanation opens with a bare definition', () => {
    for (const e of ALL_EXPLANATIONS) {
      expect(e.content, e.conceptId).not.toMatch(/^(A|An|The)\s+\w+(\s+\w+)?\s+is\s+(defined\s+as|a\s+\w+\s+that)/i)
    }
  })
})

/**
 * Geometry's actual beginning. Eight concepts were already served in geometry,
 * and every one of them assumes point, line and plane — which had no serving
 * content at all.
 */
describe('mathematics geometry foundations — newly serving concepts', () => {
  const NEW = [
    'math.geom.point', 'math.geom.line', 'math.geom.line-segment', 'math.geom.ray',
    'math.geom.plane', 'math.geom.angle-types', 'math.geom.angle-measurement',
    'math.geom.perpendicular-lines',
  ]

  it.each(NEW)('%s now meets the contract', (conceptId) => {
    const explanations = MATHEMATICS_GEOMETRY_EXPLANATIONS.filter((e) => e.conceptId === conceptId)
    const probes = MATHEMATICS_GEOMETRY_PROBES.filter((p) => p.conceptId === conceptId && isClosedChoice(p))
    expect(explanations.length, conceptId).toBeGreaterThanOrEqual(1)
    const verdict = evaluateAssetContract({
      explanations: explanations.length, closedChoiceProbes: probes.length,
    })
    expect(verdict.satisfied, `${conceptId}: ${verdict.shortfall}`).toBe(true)
  })

  it('the undefined terms say the drawing is not the object', () => {
    // Pretending the pencil mark IS the point is what leaves a learner believing
    // a line is a thin rectangle. Each of these three must name the gap.
    for (const id of ['math.geom.point', 'math.geom.line', 'math.geom.plane']) {
      const e = MATHEMATICS_GEOMETRY_EXPLANATIONS.find((x) => x.conceptId === id)!
      expect(e.content, id).toMatch(/picture|stands for|drawing|draw/i)
    }
  })

  it('every probe is gradeable and every distractor names its misconception', () => {
    for (const p of MATHEMATICS_GEOMETRY_PROBES) {
      expect(p.choices?.filter((c) => c.isCorrect).length, p.stem).toBe(1)
      for (const c of p.choices ?? []) {
        if (!c.isCorrect) expect(c.misconceptionId, `${p.stem} -> "${c.text}"`).toBeTruthy()
      }
    }
  })
})

/**
 * Fractions, decimals and percentages — the same number in three costumes, and
 * the place where a remembered rule with no reason behind it does most damage.
 */
describe('mathematics fractions and decimals — newly serving concepts', () => {
  const NEW = [
    'math.arith.fraction-reciprocal', 'math.arith.mixed-numbers',
    'math.arith.improper-fractions', 'math.arith.decimal-operations',
    'math.arith.terminating-decimals', 'math.arith.repeating-decimals',
    'math.arith.percentage-calculations', 'math.arith.percentage-change',
  ]

  it.each(NEW)('%s now meets the contract', (conceptId) => {
    const explanations = MATHEMATICS_FRACTION_EXPLANATIONS.filter((e) => e.conceptId === conceptId)
    const probes = MATHEMATICS_FRACTION_PROBES.filter((p) => p.conceptId === conceptId && isClosedChoice(p))
    expect(explanations.length, conceptId).toBeGreaterThanOrEqual(1)
    const verdict = evaluateAssetContract({
      explanations: explanations.length, closedChoiceProbes: probes.length,
    })
    expect(verdict.satisfied, `${conceptId}: ${verdict.shortfall}`).toBe(true)
  })

  it('the rules are given a reason, not just stated', () => {
    // These eight are exactly where "turn it upside down and multiply" gets
    // remembered without meaning and then decays. Each explanation must contain
    // a causal connective, not only an instruction.
    for (const e of MATHEMATICS_FRACTION_EXPLANATIONS) {
      expect(e.content, e.conceptId).toMatch(/\bbecause\b|\bwhich is why\b|\bthat is why\b|\bso that\b/i)
    }
  })

  it('every probe is gradeable and every distractor names its misconception', () => {
    for (const p of MATHEMATICS_FRACTION_PROBES) {
      expect(p.choices?.filter((c) => c.isCorrect).length, p.stem).toBe(1)
      for (const c of p.choices ?? []) {
        if (!c.isCorrect) expect(c.misconceptionId, `${p.stem} -> "${c.text}"`).toBeTruthy()
      }
    }
  })
})

/**
 * Batch 6 — proportional reasoning, and the words results are filed under.
 *
 * The second cluster is the reason this test exists in the shape it does:
 * theorem, lemma, corollary and conjecture read like a difficulty ranking and
 * are not one. Three of the four are proved; exactly one is not. An explanation
 * that leaves that distinction implicit has taught the ranking, so the check
 * below is on the DISTINCTION, not on wording.
 */
describe('mathematics proportion and the vocabulary of results', () => {
  const NEW = [
    'math.arith.proportion', 'math.arith.unit-rate',
    'math.arith.mental-multiplication', 'math.arith.number-base',
    'math.found.theorem', 'math.found.lemma',
    'math.found.corollary', 'math.found.conjecture',
  ]

  it.each(NEW)('%s now meets the contract', (conceptId) => {
    const explanations = MATHEMATICS_PROPORTION_EXPLANATIONS.filter((e) => e.conceptId === conceptId)
    const probes = MATHEMATICS_PROPORTION_PROBES.filter((p) => p.conceptId === conceptId && isClosedChoice(p))
    expect(explanations.length, conceptId).toBeGreaterThanOrEqual(1)
    const verdict = evaluateAssetContract({
      explanations: explanations.length, closedChoiceProbes: probes.length,
    })
    expect(verdict.satisfied, `${conceptId}: ${verdict.shortfall}`).toBe(true)
  })

  it('each result-word explanation says outright whether the thing is proved', () => {
    const RESULT_WORDS = ['math.found.theorem', 'math.found.lemma', 'math.found.corollary', 'math.found.conjecture']
    for (const id of RESULT_WORDS) {
      const e = MATHEMATICS_PROPORTION_EXPLANATIONS.find((x) => x.conceptId === id)
      expect(e, id).toBeDefined()
      expect(e!.content, id).toMatch(/\bproved\b|\bNOT proved\b/)
    }
  })

  it('conjecture is the one taught as unproved, and says so explicitly', () => {
    const e = MATHEMATICS_PROPORTION_EXPLANATIONS.find((x) => x.conceptId === 'math.found.conjecture')!
    expect(e.content).toMatch(/NOT proved/)
  })

  it('cross-multiplication is derived, never asserted', () => {
    // The misconception this batch targets is that cross-multiplying is a rule
    // of its own. The explanation must show where it comes from.
    const e = MATHEMATICS_PROPORTION_EXPLANATIONS.find((x) => x.conceptId === 'math.arith.proportion')!
    expect(e.content).toMatch(/multiplying both sides/i)
  })

  it('every probe is gradeable and every distractor names its misconception', () => {
    for (const p of MATHEMATICS_PROPORTION_PROBES) {
      expect(p.choices?.filter((c) => c.isCorrect).length, p.stem).toBe(1)
      expect(p.choices!.length, p.stem).toBeGreaterThanOrEqual(3)
    }
  })

  it('no two probes for one concept collide on identity', () => {
    const slugs = MATHEMATICS_PROPORTION_PROBES.map((p) => `${p.conceptId}:${p.probeKind}:${p.gradeBand}:${p.difficulty}`)
    expect(new Set(slugs).size).toBe(slugs.length)
  })
})

/**
 * Batch 7 — the parts of an expression, and the exponents that look like
 * exceptions.
 *
 * a^0 = 1 and a^-n = 1/a^n are the two most-decreed facts in school algebra.
 * Both are forced by the quotient rule, and an explanation that states them
 * without that derivation has handed the learner two things to remember
 * instead of one thing to recover. The checks below are on the derivation
 * being present, not on wording.
 */
describe('mathematics algebra vocabulary and exponent edges', () => {
  const NEW = [
    'math.alg.term', 'math.alg.coefficient', 'math.alg.degree',
    'math.alg.inequality', 'math.alg.solution-set',
    'math.arith.exponent-rules', 'math.alg.zero-exponent', 'math.alg.negative-exponent',
  ]

  it.each(NEW)('%s now meets the contract', (conceptId) => {
    const explanations = MATHEMATICS_ALGEBRA_VOCAB_EXPLANATIONS.filter((e) => e.conceptId === conceptId)
    const probes = MATHEMATICS_ALGEBRA_VOCAB_PROBES.filter((p) => p.conceptId === conceptId && isClosedChoice(p))
    expect(explanations.length, conceptId).toBeGreaterThanOrEqual(1)
    const verdict = evaluateAssetContract({
      explanations: explanations.length, closedChoiceProbes: probes.length,
    })
    expect(verdict.satisfied, `${conceptId}: ${verdict.shortfall}`).toBe(true)
  })

  it('the exponent edges are derived from the quotient rule, not decreed', () => {
    const zero = MATHEMATICS_ALGEBRA_VOCAB_EXPLANATIONS.find((e) => e.conceptId === 'math.alg.zero-exponent')!
    // a^5/a^5 is 1 by division and a^0 by subtraction — both readings must appear.
    expect(zero.content).toMatch(/a⁵\/a⁵/)
    expect(zero.content).toMatch(/undefined/)
  })

  it('the negative exponent explanation separates the sign of the exponent from the sign of the value', () => {
    const neg = MATHEMATICS_ALGEBRA_VOCAB_EXPLANATIONS.find((e) => e.conceptId === 'math.alg.negative-exponent')!
    expect(neg.content).toMatch(/not −8|not -8/)
  })

  it('the inequality flip is justified, not asserted', () => {
    const ineq = MATHEMATICS_ALGEBRA_VOCAB_EXPLANATIONS.find((e) => e.conceptId === 'math.alg.inequality')!
    expect(ineq.content).toMatch(/reverses the order/i)
  })

  it('degree is taught as a ceiling on roots, never a count', () => {
    const deg = MATHEMATICS_ALGEBRA_VOCAB_EXPLANATIONS.find((e) => e.conceptId === 'math.alg.degree')!
    expect(deg.content).toMatch(/at most/i)
  })

  it('every probe is gradeable and offers at least three choices', () => {
    for (const p of MATHEMATICS_ALGEBRA_VOCAB_PROBES) {
      expect(p.choices?.filter((c) => c.isCorrect).length, p.stem).toBe(1)
      expect(p.choices!.length, p.stem).toBeGreaterThanOrEqual(3)
    }
  })

  it('no two probes for one concept collide on identity', () => {
    const slugs = MATHEMATICS_ALGEBRA_VOCAB_PROBES.map((p) => `${p.conceptId}:${p.probeKind}:${p.gradeBand}:${p.difficulty}`)
    expect(new Set(slugs).size).toBe(slugs.length)
  })
})

/**
 * Batch 8 — powers and their inverses, variation, and the two reasonings.
 *
 * The inductive-reasoning entry carries the one name collision in this corpus
 * that reverses a concept's meaning: mathematical induction is DEDUCTIVE and
 * certain, while inductive reasoning is neither. An explanation that leaves
 * that unsaid teaches the opposite of the truth by omission, so the check is
 * that it is said outright.
 */
describe('mathematics powers, variation and reasoning', () => {
  const NEW = [
    'math.arith.square-numbers', 'math.arith.cube-numbers',
    'math.arith.square-roots', 'math.arith.estimation',
    'math.arith.direct-variation', 'math.arith.inverse-variation',
    'math.found.deductive-reasoning', 'math.found.inductive-reasoning',
  ]

  it.each(NEW)('%s now meets the contract', (conceptId) => {
    const explanations = MATHEMATICS_POWERS_VARIATION_EXPLANATIONS.filter((e) => e.conceptId === conceptId)
    const probes = MATHEMATICS_POWERS_VARIATION_PROBES.filter((p) => p.conceptId === conceptId && isClosedChoice(p))
    expect(explanations.length, conceptId).toBeGreaterThanOrEqual(1)
    const verdict = evaluateAssetContract({
      explanations: explanations.length, closedChoiceProbes: probes.length,
    })
    expect(verdict.satisfied, `${conceptId}: ${verdict.shortfall}`).toBe(true)
  })

  it('inductive reasoning states that mathematical induction is deductive', () => {
    const ind = MATHEMATICS_POWERS_VARIATION_EXPLANATIONS.find((e) => e.conceptId === 'math.found.inductive-reasoning')!
    expect(ind.content).toMatch(/MATHEMATICAL INDUCTION is not/i)
    expect(ind.content).toMatch(/deductive/i)
  })

  it('deductive reasoning separates valid from true from sound', () => {
    const ded = MATHEMATICS_POWERS_VARIATION_EXPLANATIONS.find((e) => e.conceptId === 'math.found.deductive-reasoning')!
    for (const word of [/\bvalid\b/i, /\btrue\b/i, /\bsound\b/i]) {
      expect(ded.content).toMatch(word)
    }
  })

  it('squaring and cubing are each contrasted with the operation they get absorbed into', () => {
    const sq = MATHEMATICS_POWERS_VARIATION_EXPLANATIONS.find((e) => e.conceptId === 'math.arith.square-numbers')!
    const cu = MATHEMATICS_POWERS_VARIATION_EXPLANATIONS.find((e) => e.conceptId === 'math.arith.cube-numbers')!
    expect(sq.content).toMatch(/doubl/i)
    expect(cu.content).toMatch(/tripl/i)
  })

  it('the two variations are distinguished by what stays constant, not by direction', () => {
    const dv = MATHEMATICS_POWERS_VARIATION_EXPLANATIONS.find((e) => e.conceptId === 'math.arith.direct-variation')!
    const iv = MATHEMATICS_POWERS_VARIATION_EXPLANATIONS.find((e) => e.conceptId === 'math.arith.inverse-variation')!
    expect(dv.content).toMatch(/origin/i)
    expect(iv.content).toMatch(/PRODUCT|product/)
    expect(iv.content).toMatch(/RATIO|ratio/)
  })

  it('every probe is gradeable and offers at least three choices', () => {
    for (const p of MATHEMATICS_POWERS_VARIATION_PROBES) {
      expect(p.choices?.filter((c) => c.isCorrect).length, p.stem).toBe(1)
      expect(p.choices!.length, p.stem).toBeGreaterThanOrEqual(3)
    }
  })

  it('no two probes for one concept collide on identity', () => {
    const slugs = MATHEMATICS_POWERS_VARIATION_PROBES.map((p) => `${p.conceptId}:${p.probeKind}:${p.gradeBand}:${p.difficulty}`)
    expect(new Set(slugs).size).toBe(slugs.length)
  })
})

/**
 * Batch 9 — combining sets, pairing them, carving them up, counting them.
 *
 * Two checks here are about a claim being STATED rather than implied, because
 * both are places where silence teaches the wrong thing: a complement is
 * meaningless without a universal set, and one equivalence class answers to
 * many names.
 */
describe('mathematics set operations, pairs, partitions and cardinality', () => {
  const NEW = [
    'math.found.intersection', 'math.found.complement',
    'math.found.ordered-pair', 'math.found.cartesian-product',
    'math.found.partition', 'math.found.equivalence-class',
    'math.found.finite-set', 'math.found.cardinal-arithmetic',
  ]

  it.each(NEW)('%s now meets the contract', (conceptId) => {
    const explanations = MATHEMATICS_SET_OPERATIONS_EXPLANATIONS.filter((e) => e.conceptId === conceptId)
    const probes = MATHEMATICS_SET_OPERATIONS_PROBES.filter((p) => p.conceptId === conceptId && isClosedChoice(p))
    expect(explanations.length, conceptId).toBeGreaterThanOrEqual(1)
    const verdict = evaluateAssetContract({
      explanations: explanations.length, closedChoiceProbes: probes.length,
    })
    expect(verdict.satisfied, `${conceptId}: ${verdict.shortfall}`).toBe(true)
  })

  it('complement names the universal set as part of the question', () => {
    const c = MATHEMATICS_SET_OPERATIONS_EXPLANATIONS.find((e) => e.conceptId === 'math.found.complement')!
    expect(c.content).toMatch(/universal set/i)
  })

  it('equivalence class says outright that one class has many names', () => {
    const e = MATHEMATICS_SET_OPERATIONS_EXPLANATIONS.find((x) => x.conceptId === 'math.found.equivalence-class')!
    expect(e.content).toMatch(/SAME SET|same set/)
  })

  it('partition distinguishes covering from partitioning', () => {
    const p = MATHEMATICS_SET_OPERATIONS_EXPLANATIONS.find((e) => e.conceptId === 'math.found.partition')!
    expect(p.content).toMatch(/cover/i)
    expect(p.content).toMatch(/disjoint/i)
  })

  it('the ordered pair is contrasted with the set, not merely defined', () => {
    const op = MATHEMATICS_SET_OPERATIONS_EXPLANATIONS.find((e) => e.conceptId === 'math.found.ordered-pair')!
    expect(op.content).toMatch(/same set/i)
  })

  it('cardinal arithmetic separates the continuum hypothesis from countability', () => {
    const c = MATHEMATICS_SET_OPERATIONS_EXPLANATIONS.find((e) => e.conceptId === 'math.found.cardinal-arithmetic')!
    expect(c.content).toMatch(/continuum hypothesis/i)
    expect(c.content).toMatch(/countability|countable/i)
  })

  it('every probe is gradeable and offers at least three choices', () => {
    for (const p of MATHEMATICS_SET_OPERATIONS_PROBES) {
      expect(p.choices?.filter((c) => c.isCorrect).length, p.stem).toBe(1)
      expect(p.choices!.length, p.stem).toBeGreaterThanOrEqual(3)
    }
  })

  it('no two probes for one concept collide on identity', () => {
    const slugs = MATHEMATICS_SET_OPERATIONS_PROBES.map((p) => `${p.conceptId}:${p.probeKind}:${p.gradeBand}:${p.difficulty}`)
    expect(new Set(slugs).size).toBe(slugs.length)
  })
})
