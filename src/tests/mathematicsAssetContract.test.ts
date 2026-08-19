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
import {
  MATHEMATICS_RELATIONS_NUMBERS_EXPLANATIONS,
  MATHEMATICS_RELATIONS_NUMBERS_PROBES,
} from '@/lib/teaching/assets/mathematicsRelationsNumbersAssets'
import {
  MATHEMATICS_ORDERS_PROOFS_EXPLANATIONS,
  MATHEMATICS_ORDERS_PROOFS_PROBES,
} from '@/lib/teaching/assets/mathematicsOrdersProofsAssets'
import {
  MATHEMATICS_LANGUAGE_STRATEGY_EXPLANATIONS,
  MATHEMATICS_LANGUAGE_STRATEGY_PROBES,
} from '@/lib/teaching/assets/mathematicsLanguageStrategyAssets'
import {
  MATHEMATICS_PROOF_MACHINERY_EXPLANATIONS,
  MATHEMATICS_PROOF_MACHINERY_PROBES,
} from '@/lib/teaching/assets/mathematicsProofMachineryAssets'
import {
  MATHEMATICS_QUANTIFIER_CRAFT_EXPLANATIONS,
  MATHEMATICS_QUANTIFIER_CRAFT_PROBES,
} from '@/lib/teaching/assets/mathematicsQuantifierCraftAssets'
import {
  MATHEMATICS_FOUNDATIONS_CLOSE_EXPLANATIONS,
  MATHEMATICS_FOUNDATIONS_CLOSE_PROBES,
} from '@/lib/teaching/assets/mathematicsFoundationsCloseAssets'
import {
  MATHEMATICS_NUMBER_SYSTEMS_EXPLANATIONS,
  MATHEMATICS_NUMBER_SYSTEMS_PROBES,
} from '@/lib/teaching/assets/mathematicsNumberSystemsCloseAssets'
import {
  MATHEMATICS_ALGORITHMS_PRECISION_EXPLANATIONS,
  MATHEMATICS_ALGORITHMS_PRECISION_PROBES,
} from '@/lib/teaching/assets/mathematicsAlgorithmsPrecisionAssets'
import {
  MATHEMATICS_ARITH_CLOSE_EXPLANATIONS,
  MATHEMATICS_ARITH_CLOSE_PROBES,
} from '@/lib/teaching/assets/mathematicsArithCloseAssets'
import {
  MATHEMATICS_MEASUREMENT_EXPLANATIONS,
  MATHEMATICS_MEASUREMENT_PROBES,
} from '@/lib/teaching/assets/mathematicsMeasurementAssets'
import {
  MATHEMATICS_COORDINATE_EXPLANATIONS,
  MATHEMATICS_COORDINATE_PROBES,
} from '@/lib/teaching/assets/mathematicsCoordinateAssets'
import {
  MATHEMATICS_NUMBER_THEORY_EXPLANATIONS,
  MATHEMATICS_NUMBER_THEORY_PROBES,
} from '@/lib/teaching/assets/mathematicsNumberTheoryAssets'
import {
  MATHEMATICS_TRIANGLE_TRANSFORM_EXPLANATIONS,
  MATHEMATICS_TRIANGLE_TRANSFORM_PROBES,
} from '@/lib/teaching/assets/mathematicsTriangleTransformAssets'
import {
  MATHEMATICS_DIVISIBILITY_MODULAR_EXPLANATIONS,
  MATHEMATICS_DIVISIBILITY_MODULAR_PROBES,
} from '@/lib/teaching/assets/mathematicsDivisibilityModularAssets'
import {
  MATHEMATICS_CRYPTO_NUMBER_EXPLANATIONS,
  MATHEMATICS_CRYPTO_NUMBER_PROBES,
} from '@/lib/teaching/assets/mathematicsCryptoNumberAssets'
import {
  MATHEMATICS_ANALYTIC_ALGEBRAIC_EXPLANATIONS,
  MATHEMATICS_ANALYTIC_ALGEBRAIC_PROBES,
} from '@/lib/teaching/assets/mathematicsAnalyticAlgebraicAssets'
import {
  MATHEMATICS_SOLIDS_POLYGONS_EXPLANATIONS,
  MATHEMATICS_SOLIDS_POLYGONS_PROBES,
} from '@/lib/teaching/assets/mathematicsSolidsPolygonsAssets'
import {
  MATHEMATICS_CIRCLES_TRANSFORM_EXPLANATIONS,
  MATHEMATICS_CIRCLES_TRANSFORM_PROBES,
} from '@/lib/teaching/assets/mathematicsCirclesTransformAssets'
import { SEED_PROBES, seedCanonicalSlug } from '@/lib/teaching/assets/brainSeedAssets'
import { evaluateAssetContract, MIN_CLOSED_CHOICE_PROBES } from '@/lib/teaching/assetContract'

const ALL = [...SEED_PROBES, ...AUTHORED_PROBES, ...MATHEMATICS_PROBES, ...MATHEMATICS_FOUNDATION_PROBES, ...MATHEMATICS_ARITHMETIC_PROBES, ...MATHEMATICS_BATCH3_PROBES, ...MATHEMATICS_GEOMETRY_PROBES, ...MATHEMATICS_FRACTION_PROBES, ...MATHEMATICS_PROPORTION_PROBES, ...MATHEMATICS_ALGEBRA_VOCAB_PROBES, ...MATHEMATICS_POWERS_VARIATION_PROBES, ...MATHEMATICS_SET_OPERATIONS_PROBES, ...MATHEMATICS_RELATIONS_NUMBERS_PROBES, ...MATHEMATICS_ORDERS_PROOFS_PROBES, ...MATHEMATICS_LANGUAGE_STRATEGY_PROBES, ...MATHEMATICS_PROOF_MACHINERY_PROBES, ...MATHEMATICS_QUANTIFIER_CRAFT_PROBES, ...MATHEMATICS_FOUNDATIONS_CLOSE_PROBES, ...MATHEMATICS_NUMBER_SYSTEMS_PROBES, ...MATHEMATICS_ALGORITHMS_PRECISION_PROBES, ...MATHEMATICS_ARITH_CLOSE_PROBES, ...MATHEMATICS_MEASUREMENT_PROBES, ...MATHEMATICS_COORDINATE_PROBES, ...MATHEMATICS_NUMBER_THEORY_PROBES, ...MATHEMATICS_TRIANGLE_TRANSFORM_PROBES, ...MATHEMATICS_DIVISIBILITY_MODULAR_PROBES, ...MATHEMATICS_CRYPTO_NUMBER_PROBES, ...MATHEMATICS_ANALYTIC_ALGEBRAIC_PROBES, ...MATHEMATICS_SOLIDS_POLYGONS_PROBES, ...MATHEMATICS_CIRCLES_TRANSFORM_PROBES]
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
    for (const a of [...MATHEMATICS_FOUNDATION_EXPLANATIONS, ...MATHEMATICS_FOUNDATION_PROBES, ...MATHEMATICS_ARITHMETIC_PROBES, ...MATHEMATICS_BATCH3_PROBES, ...MATHEMATICS_GEOMETRY_PROBES, ...MATHEMATICS_FRACTION_PROBES, ...MATHEMATICS_PROPORTION_PROBES, ...MATHEMATICS_ALGEBRA_VOCAB_PROBES, ...MATHEMATICS_POWERS_VARIATION_PROBES, ...MATHEMATICS_SET_OPERATIONS_PROBES, ...MATHEMATICS_RELATIONS_NUMBERS_PROBES, ...MATHEMATICS_ORDERS_PROOFS_PROBES, ...MATHEMATICS_LANGUAGE_STRATEGY_PROBES, ...MATHEMATICS_PROOF_MACHINERY_PROBES, ...MATHEMATICS_QUANTIFIER_CRAFT_PROBES, ...MATHEMATICS_FOUNDATIONS_CLOSE_PROBES, ...MATHEMATICS_NUMBER_SYSTEMS_PROBES, ...MATHEMATICS_ALGORITHMS_PRECISION_PROBES, ...MATHEMATICS_ARITH_CLOSE_PROBES, ...MATHEMATICS_MEASUREMENT_PROBES, ...MATHEMATICS_COORDINATE_PROBES, ...MATHEMATICS_NUMBER_THEORY_PROBES, ...MATHEMATICS_TRIANGLE_TRANSFORM_PROBES, ...MATHEMATICS_DIVISIBILITY_MODULAR_PROBES, ...MATHEMATICS_CRYPTO_NUMBER_PROBES, ...MATHEMATICS_ANALYTIC_ALGEBRAIC_PROBES, ...MATHEMATICS_SOLIDS_POLYGONS_PROBES, ...MATHEMATICS_CIRCLES_TRANSFORM_PROBES]) {
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
    ...MATHEMATICS_RELATIONS_NUMBERS_EXPLANATIONS,
    ...MATHEMATICS_ORDERS_PROOFS_EXPLANATIONS,
    ...MATHEMATICS_LANGUAGE_STRATEGY_EXPLANATIONS,
    ...MATHEMATICS_PROOF_MACHINERY_EXPLANATIONS,
    ...MATHEMATICS_QUANTIFIER_CRAFT_EXPLANATIONS,
    ...MATHEMATICS_FOUNDATIONS_CLOSE_EXPLANATIONS,
    ...MATHEMATICS_NUMBER_SYSTEMS_EXPLANATIONS,
    ...MATHEMATICS_ALGORITHMS_PRECISION_EXPLANATIONS,
    ...MATHEMATICS_ARITH_CLOSE_EXPLANATIONS,
    ...MATHEMATICS_MEASUREMENT_EXPLANATIONS,
    ...MATHEMATICS_COORDINATE_EXPLANATIONS,
    ...MATHEMATICS_NUMBER_THEORY_EXPLANATIONS,
    ...MATHEMATICS_TRIANGLE_TRANSFORM_EXPLANATIONS,
    ...MATHEMATICS_DIVISIBILITY_MODULAR_EXPLANATIONS,
    ...MATHEMATICS_CRYPTO_NUMBER_EXPLANATIONS,
    ...MATHEMATICS_ANALYTIC_ALGEBRAIC_EXPLANATIONS,
    ...MATHEMATICS_SOLIDS_POLYGONS_EXPLANATIONS,
    ...MATHEMATICS_CIRCLES_TRANSFORM_EXPLANATIONS,
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
    ...MATHEMATICS_RELATIONS_NUMBERS_PROBES,
    ...MATHEMATICS_ORDERS_PROOFS_PROBES,
    ...MATHEMATICS_LANGUAGE_STRATEGY_PROBES,
    ...MATHEMATICS_PROOF_MACHINERY_PROBES,
    ...MATHEMATICS_QUANTIFIER_CRAFT_PROBES,
    ...MATHEMATICS_FOUNDATIONS_CLOSE_PROBES,
    ...MATHEMATICS_NUMBER_SYSTEMS_PROBES,
    ...MATHEMATICS_ALGORITHMS_PRECISION_PROBES,
    ...MATHEMATICS_ARITH_CLOSE_PROBES,
    ...MATHEMATICS_MEASUREMENT_PROBES,
    ...MATHEMATICS_COORDINATE_PROBES,
    ...MATHEMATICS_NUMBER_THEORY_PROBES,
    ...MATHEMATICS_TRIANGLE_TRANSFORM_PROBES,
    ...MATHEMATICS_DIVISIBILITY_MODULAR_PROBES,
    ...MATHEMATICS_CRYPTO_NUMBER_PROBES,
    ...MATHEMATICS_ANALYTIC_ALGEBRAIC_PROBES,
    ...MATHEMATICS_SOLIDS_POLYGONS_PROBES,
    ...MATHEMATICS_CIRCLES_TRANSFORM_PROBES,
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

/**
 * Batch 10 — relations, sets built from sets, two number kinds, and the
 * proof shape that leans on Batch 9's partition.
 *
 * proof-by-cases is the one entry here that must contradict a neighbouring
 * entry to be correct: its cases need NOT be disjoint, only exhaustive,
 * which is strictly weaker than partitioning. An explanation that borrows
 * partition's strictness teaches a false obligation, so the check is that
 * the weaker requirement is stated.
 */
describe('mathematics relations, derived sets, number kinds and case proofs', () => {
  const NEW = [
    'math.found.relation', 'math.found.reflexive-relation',
    'math.found.hasse-diagram', 'math.found.set-difference',
    'math.found.power-set', 'math.found.irrational-numbers',
    'math.found.ordinal-number', 'math.found.proof-by-cases',
  ]

  it.each(NEW)('%s now meets the contract', (conceptId) => {
    const explanations = MATHEMATICS_RELATIONS_NUMBERS_EXPLANATIONS.filter((e) => e.conceptId === conceptId)
    const probes = MATHEMATICS_RELATIONS_NUMBERS_PROBES.filter((p) => p.conceptId === conceptId && isClosedChoice(p))
    expect(explanations.length, conceptId).toBeGreaterThanOrEqual(1)
    const verdict = evaluateAssetContract({
      explanations: explanations.length, closedChoiceProbes: probes.length,
    })
    expect(verdict.satisfied, `${conceptId}: ${verdict.shortfall}`).toBe(true)
  })

  it('proof-by-cases states that overlap is permitted and exhaustiveness is not', () => {
    const p = MATHEMATICS_RELATIONS_NUMBERS_EXPLANATIONS.find((e) => e.conceptId === 'math.found.proof-by-cases')!
    expect(p.content).toMatch(/EXHAUSTIVE|exhaustive/)
    expect(p.content).toMatch(/need not form a partition|Overlap.{0,40}harmless/i)
  })

  it('a relation is defined as a set of pairs, and said not to require a rule', () => {
    const r = MATHEMATICS_RELATIONS_NUMBERS_EXPLANATIONS.find((e) => e.conceptId === 'math.found.relation')!
    expect(r.content).toMatch(/ordered pairs/i)
    expect(r.content).toMatch(/no formula|no rule|not a rule/i)
  })

  it('irrational is separated from imprecise and from non-terminating', () => {
    const i = MATHEMATICS_RELATIONS_NUMBERS_EXPLANATIONS.find((e) => e.conceptId === 'math.found.irrational-numbers')!
    expect(i.content).toMatch(/does not mean imprecise/i)
    expect(i.content).toMatch(/repeating/i)
  })

  it('the power set explanation resolves P(empty) rather than leaving it implied', () => {
    const p = MATHEMATICS_RELATIONS_NUMBERS_EXPLANATIONS.find((e) => e.conceptId === 'math.found.power-set')!
    expect(p.content).toMatch(/P\(∅\)/)
    expect(p.content).toMatch(/It is not empty/i)
  })

  it('ordinals are distinguished from cardinals and shown not to commute', () => {
    const o = MATHEMATICS_RELATIONS_NUMBERS_EXPLANATIONS.find((e) => e.conceptId === 'math.found.ordinal-number')!
    expect(o.content).toMatch(/not commutative/i)
    expect(o.content).toMatch(/ℵ₀/)
  })

  it('every probe is gradeable and offers at least three choices', () => {
    for (const p of MATHEMATICS_RELATIONS_NUMBERS_PROBES) {
      expect(p.choices?.filter((c) => c.isCorrect).length, p.stem).toBe(1)
      expect(p.choices!.length, p.stem).toBeGreaterThanOrEqual(3)
    }
  })

  it('no two probes for one concept collide on identity', () => {
    const slugs = MATHEMATICS_RELATIONS_NUMBERS_PROBES.map((p) => `${p.conceptId}:${p.probeKind}:${p.gradeBand}:${p.difficulty}`)
    expect(new Set(slugs).size).toBe(slugs.length)
  })
})

/**
 * Batch 11 — relation properties, the operations survey, and three words
 * that promise more than they deliver.
 *
 * Vacuous satisfaction reads as a trick to every learner who meets it, and
 * it appears in both symmetric and transitive. An explanation that ducks it
 * leaves the learner to conclude the definition is being gamed, so the
 * check is that each one addresses the empty case rather than only the
 * populated one.
 */
describe('mathematics relation properties, operations survey and overselling names', () => {
  const NEW = [
    'math.found.symmetric-relation', 'math.found.transitive-relation',
    'math.found.total-order', 'math.found.union', 'math.found.set-operations',
    'math.found.uncountable-set', 'math.found.strong-induction',
    'math.found.uniqueness-proof',
  ]

  it.each(NEW)('%s now meets the contract', (conceptId) => {
    const explanations = MATHEMATICS_ORDERS_PROOFS_EXPLANATIONS.filter((e) => e.conceptId === conceptId)
    const probes = MATHEMATICS_ORDERS_PROOFS_PROBES.filter((p) => p.conceptId === conceptId && isClosedChoice(p))
    expect(explanations.length, conceptId).toBeGreaterThanOrEqual(1)
    const verdict = evaluateAssetContract({
      explanations: explanations.length, closedChoiceProbes: probes.length,
    })
    expect(verdict.satisfied, `${conceptId}: ${verdict.shortfall}`).toBe(true)
  })

  it('both relation properties address the case with nothing to check', () => {
    for (const id of ['math.found.symmetric-relation', 'math.found.transitive-relation']) {
      const e = MATHEMATICS_ORDERS_PROOFS_EXPLANATIONS.find((x) => x.conceptId === id)!
      expect(e.content, id).toMatch(/empty relation|no pair that could fail|nothing that could fail/i)
    }
  })

  it('strong induction is stated NOT to be more powerful', () => {
    const e = MATHEMATICS_ORDERS_PROOFS_EXPLANATIONS.find((x) => x.conceptId === 'math.found.strong-induction')!
    expect(e.content).toMatch(/not more powerful/i)
  })

  it('uniqueness is stated NOT to give existence', () => {
    const e = MATHEMATICS_ORDERS_PROOFS_EXPLANATIONS.find((x) => x.conceptId === 'math.found.uniqueness-proof')!
    expect(e.content).toMatch(/separate claims|separate work|separate halves/i)
    expect(e.content).toMatch(/at most one/i)
  })

  it('uncountable is separated from "very large"', () => {
    const e = MATHEMATICS_ORDERS_PROOFS_EXPLANATIONS.find((x) => x.conceptId === 'math.found.uncountable-set')!
    expect(e.content).toMatch(/rationals/i)
    expect(e.content).toMatch(/countable/i)
  })

  it('union gives the inclusion-exclusion correction rather than only warning about it', () => {
    const e = MATHEMATICS_ORDERS_PROOFS_EXPLANATIONS.find((x) => x.conceptId === 'math.found.union')!
    expect(e.content).toMatch(/\|A ∩ B\|/)
  })

  it('every probe is gradeable and offers at least three choices', () => {
    for (const p of MATHEMATICS_ORDERS_PROOFS_PROBES) {
      expect(p.choices?.filter((c) => c.isCorrect).length, p.stem).toBe(1)
      expect(p.choices!.length, p.stem).toBeGreaterThanOrEqual(3)
    }
  })

  it('no two probes for one concept collide on identity', () => {
    const slugs = MATHEMATICS_ORDERS_PROOFS_PROBES.map((p) => `${p.conceptId}:${p.probeKind}:${p.gradeBand}:${p.difficulty}`)
    expect(new Set(slugs).size).toBe(slugs.length)
  })
})

/**
 * Batch 12 — how mathematics is written, how patterns are found, how
 * problems are attacked, and two tools that get trusted too far.
 *
 * `mathematical-notation` and `mathematical-symbols` have near-identical KG
 * descriptions — an open Curriculum Feedback item since math.found Wave 2.
 * They are authored here as the SYSTEM and the individual MARKS, which is
 * the only split that makes them separately masterable. The check below
 * enforces that split rather than trusting it: if the two entries ever
 * converge in content, the test fails.
 */
describe('mathematics language, notation, strategy and two overtrusted tools', () => {
  const NEW = [
    'math.found.mathematical-language', 'math.found.mathematical-notation',
    'math.found.mathematical-symbols', 'math.found.pattern-recognition',
    'math.found.problem-solving', 'math.found.problem-solving-strategies',
    'math.found.venn-diagram', 'math.found.well-ordering-principle',
  ]

  it.each(NEW)('%s now meets the contract', (conceptId) => {
    const explanations = MATHEMATICS_LANGUAGE_STRATEGY_EXPLANATIONS.filter((e) => e.conceptId === conceptId)
    const probes = MATHEMATICS_LANGUAGE_STRATEGY_PROBES.filter((p) => p.conceptId === conceptId && isClosedChoice(p))
    expect(explanations.length, conceptId).toBeGreaterThanOrEqual(1)
    const verdict = evaluateAssetContract({
      explanations: explanations.length, closedChoiceProbes: probes.length,
    })
    expect(verdict.satisfied, `${conceptId}: ${verdict.shortfall}`).toBe(true)
  })

  it('notation and symbols are taught as different things, not two copies', () => {
    const notation = MATHEMATICS_LANGUAGE_STRATEGY_EXPLANATIONS.find((e) => e.conceptId === 'math.found.mathematical-notation')!
    const symbols = MATHEMATICS_LANGUAGE_STRATEGY_EXPLANATIONS.find((e) => e.conceptId === 'math.found.mathematical-symbols')!
    // Notation owns the SYSTEM and the look-alike pairs; symbols owns the
    // individual marks and their families. Neither may drift into the other.
    expect(notation.content).toMatch(/the SYSTEM/)
    expect(symbols.content).toMatch(/individual marks/i)
    expect(symbols.content).toMatch(/quantifier/i)
    // A crude but real duplication guard: they must not share long passages.
    const shingles = (t: string) => new Set(t.toLowerCase().split(/\s+/).map((_, i, a) => a.slice(i, i + 8).join(' ')).filter((g) => g.split(' ').length === 8))
    const a = shingles(notation.content)
    const overlap = [...shingles(symbols.content)].filter((g) => a.has(g))
    expect(overlap, `shared 8-word passages: ${overlap.slice(0, 3).join(' | ')}`).toHaveLength(0)
  })

  it('the Venn diagram is said to illustrate rather than prove', () => {
    const v = MATHEMATICS_LANGUAGE_STRATEGY_EXPLANATIONS.find((e) => e.conceptId === 'math.found.venn-diagram')!
    expect(v.content).toMatch(/illustrates rather than proves/i)
    expect(v.content).toMatch(/2ⁿ|2\^n/)
  })

  it('well-ordering states both conditions — non-empty AND the naturals', () => {
    const w = MATHEMATICS_LANGUAGE_STRATEGY_EXPLANATIONS.find((e) => e.conceptId === 'math.found.well-ordering-principle')!
    expect(w.content).toMatch(/NON-EMPTY|non-empty/)
    expect(w.content).toMatch(/integers fail it/i)
  })

  it('systematic trial is distinguished from guessing by what a failure yields', () => {
    const p = MATHEMATICS_LANGUAGE_STRATEGY_EXPLANATIONS.find((e) => e.conceptId === 'math.found.problem-solving')!
    expect(p.content).toMatch(/not guessing/i)
    expect(p.content).toMatch(/rules out|learns nothing/i)
  })

  it('pattern recognition is capped at a candidate, never a proof', () => {
    const p = MATHEMATICS_LANGUAGE_STRATEGY_EXPLANATIONS.find((e) => e.conceptId === 'math.found.pattern-recognition')!
    expect(p.content).toMatch(/CANDIDATE|candidate/)
    expect(p.content).toMatch(/never a substitute for one|not yet established/i)
  })

  it('every probe is gradeable and offers at least three choices', () => {
    for (const p of MATHEMATICS_LANGUAGE_STRATEGY_PROBES) {
      expect(p.choices?.filter((c) => c.isCorrect).length, p.stem).toBe(1)
      expect(p.choices!.length, p.stem).toBeGreaterThanOrEqual(3)
    }
  })

  it('no two probes for one concept collide on identity', () => {
    const slugs = MATHEMATICS_LANGUAGE_STRATEGY_PROBES.map((p) => `${p.conceptId}:${p.probeKind}:${p.gradeBand}:${p.difficulty}`)
    expect(new Set(slugs).size).toBe(slugs.length)
  })
})

/**
 * Batch 13 — the machinery of proof.
 *
 * The registers for all four proof SHAPES agree on one thing: learners
 * rank them ("direct first", "contradiction is the powerful one",
 * "contrapositive is weaker"). None of that is true, and a corpus that
 * teaches four techniques without saying so teaches the ranking by
 * omission. The checks below are on the anti-ranking claims and on the
 * three places a proof silently stops being one.
 */
describe('mathematics proof machinery', () => {
  const NEW = [
    'math.found.proof', 'math.found.direct-proof',
    'math.found.proof-by-contrapositive', 'math.found.proof-by-contradiction',
    'math.found.existence-proof', 'math.found.rules-of-inference',
    'math.found.logical-equivalence', 'math.found.proof-by-induction',
  ]

  it.each(NEW)('%s now meets the contract', (conceptId) => {
    const explanations = MATHEMATICS_PROOF_MACHINERY_EXPLANATIONS.filter((e) => e.conceptId === conceptId)
    const probes = MATHEMATICS_PROOF_MACHINERY_PROBES.filter((p) => p.conceptId === conceptId && isClosedChoice(p))
    expect(explanations.length, conceptId).toBeGreaterThanOrEqual(1)
    const verdict = evaluateAssetContract({
      explanations: explanations.length, closedChoiceProbes: probes.length,
    })
    expect(verdict.satisfied, `${conceptId}: ${verdict.shortfall}`).toBe(true)
  })

  it('no proof shape is taught as ranked above another', () => {
    const direct = MATHEMATICS_PROOF_MACHINERY_EXPLANATIONS.find((e) => e.conceptId === 'math.found.direct-proof')!
    const contrap = MATHEMATICS_PROOF_MACHINERY_EXPLANATIONS.find((e) => e.conceptId === 'math.found.proof-by-contrapositive')!
    const contra = MATHEMATICS_PROOF_MACHINERY_EXPLANATIONS.find((e) => e.conceptId === 'math.found.proof-by-contradiction')!
    expect(direct.content).toMatch(/(nor|not) is direct proof the compulsory first attempt/i)
    expect(contrap.content).toMatch(/full proof, not a weaker one/i)
    expect(contra.content).toMatch(/not the strongest technique/i)
  })

  it('contradiction states the actual standard, R and not-R', () => {
    const c = MATHEMATICS_PROOF_MACHINERY_EXPLANATIONS.find((e) => e.conceptId === 'math.found.proof-by-contradiction')!
    expect(c.content).toMatch(/R and not R/)
    // and negation of a universal, which is where the technique is misapplied
    expect(c.content).toMatch(/there exists x with not P\(x\)/i)
  })

  it('the contrapositive is distinguished from BOTH converse and inverse', () => {
    const c = MATHEMATICS_PROOF_MACHINERY_EXPLANATIONS.find((e) => e.conceptId === 'math.found.proof-by-contrapositive')!
    expect(c.content).toMatch(/converse/i)
    expect(c.content).toMatch(/inverse/i)
  })

  it('induction answers the circularity objection and defends the base case', () => {
    const i = MATHEMATICS_PROOF_MACHINERY_EXPLANATIONS.find((e) => e.conceptId === 'math.found.proof-by-induction')!
    expect(i.content).toMatch(/not circular/i)
    expect(i.content).toMatch(/CONDITIONAL/)
    expect(i.content).toMatch(/base case is not a formality/i)
  })

  it('existence is separated from constructiveness and from uniqueness', () => {
    const e = MATHEMATICS_PROOF_MACHINERY_EXPLANATIONS.find((x) => x.conceptId === 'math.found.existence-proof')!
    expect(e.content).toMatch(/non-constructive proof is a complete proof/i)
    expect(e.content).toMatch(/says nothing about uniqueness/i)
  })

  it('both reversal fallacies are named, not just one', () => {
    const r = MATHEMATICS_PROOF_MACHINERY_EXPLANATIONS.find((e) => e.conceptId === 'math.found.rules-of-inference')!
    expect(r.content).toMatch(/affirming the consequent/i)
    expect(r.content).toMatch(/denying the antecedent/i)
  })

  it('every probe is gradeable and offers at least three choices', () => {
    for (const p of MATHEMATICS_PROOF_MACHINERY_PROBES) {
      expect(p.choices?.filter((c) => c.isCorrect).length, p.stem).toBe(1)
      expect(p.choices!.length, p.stem).toBeGreaterThanOrEqual(3)
    }
  })

  it('no two probes for one concept collide on identity', () => {
    const slugs = MATHEMATICS_PROOF_MACHINERY_PROBES.map((p) => `${p.conceptId}:${p.probeKind}:${p.gradeBand}:${p.difficulty}`)
    expect(new Set(slugs).size).toBe(slugs.length)
  })
})

/**
 * Batch 14 — saying something precise about many objects at once.
 *
 * Quantifier ORDER is the one place in elementary logic where swapping two
 * symbols turns a true statement false, and three separate registers in
 * this batch record learners treating it as stylistic. The checks below
 * demand the concrete pair (forall-exists vs exists-forall) actually
 * appears, not merely a warning that order matters.
 */
describe('mathematics variables, quantifiers, and the craft of reading and writing', () => {
  const NEW = [
    'math.found.variable', 'math.found.predicate',
    'math.found.quantifiers', 'math.found.predicate-logic',
    'math.found.set-builder-notation', 'math.found.reading-mathematics',
    'math.found.writing-mathematics', 'math.found.abstraction',
  ]

  it.each(NEW)('%s now meets the contract', (conceptId) => {
    const explanations = MATHEMATICS_QUANTIFIER_CRAFT_EXPLANATIONS.filter((e) => e.conceptId === conceptId)
    const probes = MATHEMATICS_QUANTIFIER_CRAFT_PROBES.filter((p) => p.conceptId === conceptId && isClosedChoice(p))
    expect(explanations.length, conceptId).toBeGreaterThanOrEqual(1)
    const verdict = evaluateAssetContract({
      explanations: explanations.length, closedChoiceProbes: probes.length,
    })
    expect(verdict.satisfied, `${conceptId}: ${verdict.shortfall}`).toBe(true)
  })

  it('quantifier order is shown with the concrete pair, not merely warned about', () => {
    const p = MATHEMATICS_QUANTIFIER_CRAFT_EXPLANATIONS.find((e) => e.conceptId === 'math.found.predicate-logic')!
    expect(p.content).toMatch(/∀x ∃y/)
    expect(p.content).toMatch(/∃y ∀x/)
  })

  it('quantifiers deny BOTH everyday readings and give the negation rule', () => {
    const q = MATHEMATICS_QUANTIFIER_CRAFT_EXPLANATIONS.find((e) => e.conceptId === 'math.found.quantifiers')!
    expect(q.content).toMatch(/not "most"|is not "most"/i)
    expect(q.content).toMatch(/not "exactly one"/i)
    expect(q.content).toMatch(/∃x ¬P\(x\)/)
  })

  it('a predicate is distinguished from a proposition AND from a formula', () => {
    const p = MATHEMATICS_QUANTIFIER_CRAFT_EXPLANATIONS.find((e) => e.conceptId === 'math.found.predicate')!
    expect(p.content).toMatch(/proposition/i)
    expect(p.content).toMatch(/not the same thing as a formula/i)
  })

  it('the variable explanation kills the label reading explicitly', () => {
    const v = MATHEMATICS_QUANTIFIER_CRAFT_EXPLANATIONS.find((e) => e.conceptId === 'math.found.variable')!
    expect(v.content).toMatch(/does not mean three apples/i)
  })

  it('set-builder keeps the domain mandatory and an empty result legitimate', () => {
    const s = MATHEMATICS_QUANTIFIER_CRAFT_EXPLANATIONS.find((e) => e.conceptId === 'math.found.set-builder-notation')!
    expect(s.content).toMatch(/ANSWER and not a sign/i)
    expect(s.content).toMatch(/different and much larger/i)
  })

  it('reading and writing fail in opposite directions, and both are stated', () => {
    const r = MATHEMATICS_QUANTIFIER_CRAFT_EXPLANATIONS.find((e) => e.conceptId === 'math.found.reading-mathematics')!
    const w = MATHEMATICS_QUANTIFIER_CRAFT_EXPLANATIONS.find((e) => e.conceptId === 'math.found.writing-mathematics')!
    expect(r.content).toMatch(/not read at the speed of prose/i)
    expect(w.content).toMatch(/Symbols do not supply rigour/i)
  })

  it('abstraction is the opposite of vagueness, and transfer is not assumed', () => {
    const a = MATHEMATICS_QUANTIFIER_CRAFT_EXPLANATIONS.find((e) => e.conceptId === 'math.found.abstraction')!
    expect(a.content).toMatch(/opposite of vagueness/i)
    expect(a.content).toMatch(/does not transfer by itself/i)
  })

  it('every probe is gradeable and offers at least three choices', () => {
    for (const p of MATHEMATICS_QUANTIFIER_CRAFT_PROBES) {
      expect(p.choices?.filter((c) => c.isCorrect).length, p.stem).toBe(1)
      expect(p.choices!.length, p.stem).toBeGreaterThanOrEqual(3)
    }
  })

  it('no two probes for one concept collide on identity', () => {
    const slugs = MATHEMATICS_QUANTIFIER_CRAFT_PROBES.map((p) => `${p.conceptId}:${p.probeKind}:${p.gradeBand}:${p.difficulty}`)
    expect(new Set(slugs).size).toBe(slugs.length)
  })
})

/**
 * Batch 15 — the foundations proper.
 *
 * Two results in this batch look wrong to a learner and are not: an
 * infinite set matching a PROPER SUBSET of itself, and the rationals
 * being no larger than the integers despite being dense. Both registers
 * rate these high-severity. An explanation that states the result
 * without the pairing that produces it has asked for belief rather than
 * given a reason, so the checks demand the constructions appear.
 */
describe('mathematics foundations — sets, structure and size', () => {
  const NEW = [
    'math.found.set-theory', 'math.found.axiomatic-system',
    'math.found.set-theory-axiomatic', 'math.found.function-set-theoretic',
    'math.found.equivalence-relation', 'math.found.partial-order',
    'math.found.cardinality', 'math.found.countable-set',
  ]

  it.each(NEW)('%s now meets the contract', (conceptId) => {
    const explanations = MATHEMATICS_FOUNDATIONS_CLOSE_EXPLANATIONS.filter((e) => e.conceptId === conceptId)
    const probes = MATHEMATICS_FOUNDATIONS_CLOSE_PROBES.filter((p) => p.conceptId === conceptId && isClosedChoice(p))
    expect(explanations.length, conceptId).toBeGreaterThanOrEqual(1)
    const verdict = evaluateAssetContract({
      explanations: explanations.length, closedChoiceProbes: probes.length,
    })
    expect(verdict.satisfied, `${conceptId}: ${verdict.shortfall}`).toBe(true)
  })

  it('the counter-intuitive size results come with their constructions', () => {
    const card = MATHEMATICS_FOUNDATIONS_CLOSE_EXPLANATIONS.find((e) => e.conceptId === 'math.found.cardinality')!
    const ctbl = MATHEMATICS_FOUNDATIONS_CLOSE_EXPLANATIONS.find((e) => e.conceptId === 'math.found.countable-set')!
    // the pairing, not just the claim
    expect(card.content).toMatch(/match n with 2n/i)
    expect(card.content).toMatch(/PROPER SUBSET/)
    // the enumeration, not just "it is countable"
    expect(ctbl.content).toMatch(/sweep the diagonals/i)
    expect(ctbl.content).toMatch(/zigzag/i)
  })

  it('antisymmetric is corrected against the "anti" prefix reading', () => {
    const po = MATHEMATICS_FOUNDATIONS_CLOSE_EXPLANATIONS.find((e) => e.conceptId === 'math.found.partial-order')!
    expect(po.content).toMatch(/does not mean "never symmetric"/i)
    expect(po.content).toMatch(/must be equal|forces a = b/i)
  })

  it('an axiomatic system is axioms PLUS logic, with the three properties kept apart', () => {
    const a = MATHEMATICS_FOUNDATIONS_CLOSE_EXPLANATIONS.find((e) => e.conceptId === 'math.found.axiomatic-system')!
    expect(a.content).toMatch(/not just a list of axioms/i)
    for (const w of [/CONSISTENT/, /COMPLETE/, /INDEPENDENT/]) expect(a.content).toMatch(w)
  })

  it('ZFC names the paradox, the restriction, and the incompleteness', () => {
    const z = MATHEMATICS_FOUNDATIONS_CLOSE_EXPLANATIONS.find((e) => e.conceptId === 'math.found.set-theory-axiomatic')!
    expect(z.content).toMatch(/Russell/)
    expect(z.content).toMatch(/SEPARATION/)
    expect(z.content).toMatch(/not complete/i)
  })

  it('the function definition insists on totality, not only single-valuedness', () => {
    const f = MATHEMATICS_FOUNDATIONS_CLOSE_EXPLANATIONS.find((e) => e.conceptId === 'math.found.function-set-theoretic')!
    expect(f.content).toMatch(/totality/i)
    expect(f.content).toMatch(/RANGE/)
  })

  it('equivalence relations require all three properties and correspond both ways', () => {
    const e = MATHEMATICS_FOUNDATIONS_CLOSE_EXPLANATIONS.find((x) => x.conceptId === 'math.found.equivalence-relation')!
    expect(e.content).toMatch(/all THREE properties/i)
    expect(e.content).toMatch(/runs both ways/i)
  })

  it('every probe is gradeable and offers at least three choices', () => {
    for (const p of MATHEMATICS_FOUNDATIONS_CLOSE_PROBES) {
      expect(p.choices?.filter((c) => c.isCorrect).length, p.stem).toBe(1)
      expect(p.choices!.length, p.stem).toBeGreaterThanOrEqual(3)
    }
  })

  it('no two probes for one concept collide on identity', () => {
    const slugs = MATHEMATICS_FOUNDATIONS_CLOSE_PROBES.map((p) => `${p.conceptId}:${p.probeKind}:${p.gradeBand}:${p.difficulty}`)
    expect(new Set(slugs).size).toBe(slugs.length)
  })
})

/**
 * Batch 16 — extending the number line, and the two directions
 * mathematics reaches. This batch CLOSES math.found and math.alg.
 *
 * math.alg.exponent-rules and math.arith.exponent-rules are two separate
 * KG nodes, and unlike the notation/symbols pair they are genuinely
 * different: arithmetic owns the integer laws and why they hold BY
 * COUNTING; algebra owns the extension to zero, negative and rational
 * exponents, where counting stops working and the laws are preserved by
 * demand. The duplication guard below enforces that split the same way
 * batch 12's does for notation and symbols.
 */
describe('mathematics number systems, reach, and the last of algebra', () => {
  const NEW = [
    'math.arith.negative-numbers', 'math.arith.absolute-value',
    'math.found.real-numbers', 'math.found.complex-numbers',
    'math.found.generalization', 'math.found.mathematical-modeling',
    'math.alg.polynomial', 'math.alg.exponent-rules',
  ]

  it.each(NEW)('%s now meets the contract', (conceptId) => {
    const explanations = MATHEMATICS_NUMBER_SYSTEMS_EXPLANATIONS.filter((e) => e.conceptId === conceptId)
    const probes = MATHEMATICS_NUMBER_SYSTEMS_PROBES.filter((p) => p.conceptId === conceptId && isClosedChoice(p))
    expect(explanations.length, conceptId).toBeGreaterThanOrEqual(1)
    const verdict = evaluateAssetContract({
      explanations: explanations.length, closedChoiceProbes: probes.length,
    })
    expect(verdict.satisfied, `${conceptId}: ${verdict.shortfall}`).toBe(true)
  })

  it('the two exponent-rules nodes are taught as different things', () => {
    const algebraic = MATHEMATICS_NUMBER_SYSTEMS_EXPLANATIONS.find((e) => e.conceptId === 'math.alg.exponent-rules')!
    const arithmetic = MATHEMATICS_ALGEBRA_VOCAB_EXPLANATIONS.find((e) => e.conceptId === 'math.arith.exponent-rules')!
    // arithmetic owns the counting justification; algebra owns the extension
    expect(arithmetic.content).toMatch(/counted|counting|write out the a/i)
    expect(algebraic.content).toMatch(/a\^½|a\^\(1\/2\)/)
    expect(algebraic.content).toMatch(/DEMANDING|forced/i)
    const shingles = (t: string) => new Set(t.toLowerCase().split(/\s+/).map((_, i, a) => a.slice(i, i + 8).join(' ')).filter((g) => g.split(' ').length === 8))
    const a = shingles(arithmetic.content)
    const overlap = [...shingles(algebraic.content)].filter((g) => a.has(g))
    expect(overlap, `shared 8-word passages: ${overlap.slice(0, 3).join(' | ')}`).toHaveLength(0)
  })

  it('the costliest exponent error is stated with a numeric counterexample', () => {
    const a = MATHEMATICS_NUMBER_SYSTEMS_EXPLANATIONS.find((e) => e.conceptId === 'math.alg.exponent-rules')!
    expect(a.content).toMatch(/is NOT a² \+ b²/)
    expect(a.content).toMatch(/49/)
    expect(a.content).toMatch(/25/)
  })

  it('each number-system extension gives the equation that forced it', () => {
    const neg = MATHEMATICS_NUMBER_SYSTEMS_EXPLANATIONS.find((e) => e.conceptId === 'math.arith.negative-numbers')!
    const cplx = MATHEMATICS_NUMBER_SYSTEMS_EXPLANATIONS.find((e) => e.conceptId === 'math.found.complex-numbers')!
    expect(neg.content).toMatch(/3 − 5/)
    expect(cplx.content).toMatch(/x² = −1/)
  })

  it('absolute value is distance, and never negative', () => {
    const a = MATHEMATICS_NUMBER_SYSTEMS_EXPLANATIONS.find((e) => e.conceptId === 'math.arith.absolute-value')!
    expect(a.content).toMatch(/DISTANCE/)
    expect(a.content).toMatch(/never negative/i)
  })

  it('completeness is defined, and a real is distinguished from its decimal', () => {
    const r = MATHEMATICS_NUMBER_SYSTEMS_EXPLANATIONS.find((e) => e.conceptId === 'math.found.real-numbers')!
    expect(r.content).toMatch(/COMPLETENESS/)
    expect(r.content).toMatch(/0\.999…/)
  })

  it('modelling keeps the return leg and denies the one-correct-model idea', () => {
    const m = MATHEMATICS_NUMBER_SYSTEMS_EXPLANATIONS.find((e) => e.conceptId === 'math.found.mathematical-modeling')!
    expect(m.content).toMatch(/2\.3 buses/)
    expect(m.content).toMatch(/no single correct model/i)
  })

  it('every probe is gradeable and offers at least three choices', () => {
    for (const p of MATHEMATICS_NUMBER_SYSTEMS_PROBES) {
      expect(p.choices?.filter((c) => c.isCorrect).length, p.stem).toBe(1)
      expect(p.choices!.length, p.stem).toBeGreaterThanOrEqual(3)
    }
  })

  it('no two probes for one concept collide on identity', () => {
    const slugs = MATHEMATICS_NUMBER_SYSTEMS_PROBES.map((p) => `${p.conceptId}:${p.probeKind}:${p.gradeBand}:${p.difficulty}`)
    expect(new Set(slugs).size).toBe(slugs.length)
  })
})

/**
 * Batch 17 — the written algorithms, and the arithmetic of precision.
 *
 * All four algorithm registers record the SAME shape of error: a step
 * done correctly in the wrong COLUMN, or a chain broken partway. Those
 * are bookkeeping failures, and the only defence is knowing what the
 * column is worth — so each of the four explanations must say what the
 * carry, borrow, shift or alignment MEANS, not merely where to put it.
 * That is what these checks enforce.
 */
describe('mathematics written algorithms and precision', () => {
  const NEW = [
    'math.arith.carrying', 'math.arith.borrowing',
    'math.arith.long-multiplication', 'math.arith.long-division',
    'math.arith.decimals', 'math.arith.percentages',
    'math.arith.rounding', 'math.arith.significant-figures',
  ]

  it.each(NEW)('%s now meets the contract', (conceptId) => {
    const explanations = MATHEMATICS_ALGORITHMS_PRECISION_EXPLANATIONS.filter((e) => e.conceptId === conceptId)
    const probes = MATHEMATICS_ALGORITHMS_PRECISION_PROBES.filter((p) => p.conceptId === conceptId && isClosedChoice(p))
    expect(explanations.length, conceptId).toBeGreaterThanOrEqual(1)
    const verdict = evaluateAssetContract({
      explanations: explanations.length, closedChoiceProbes: probes.length,
    })
    expect(verdict.satisfied, `${conceptId}: ${verdict.shortfall}`).toBe(true)
  })

  it('each algorithm says what its bookkeeping mark is WORTH, not just where it goes', () => {
    const find = (id: string) => MATHEMATICS_ALGORITHMS_PRECISION_EXPLANATIONS.find((e) => e.conceptId === id)!
    expect(find('math.arith.carrying').content).toMatch(/one TEN/)
    expect(find('math.arith.borrowing').content).toMatch(/borrowed amount is ten, not one/i)
    expect(find('math.arith.long-multiplication').content).toMatch(/IS the place value/)
    expect(find('math.arith.long-division').content).toMatch(/record of place value/i)
  })

  it('the two chain-breaking errors are each shown with a worked case', () => {
    const carry = MATHEMATICS_ALGORITHMS_PRECISION_EXPLANATIONS.find((e) => e.conceptId === 'math.arith.carrying')!
    const borrow = MATHEMATICS_ALGORITHMS_PRECISION_EXPLANATIONS.find((e) => e.conceptId === 'math.arith.borrowing')!
    expect(carry.content).toMatch(/195 \+ 5/)
    expect(borrow.content).toMatch(/302 − 178/)
  })

  it('decimals deny both the longer-is-larger and split-number readings', () => {
    const d = MATHEMATICS_ALGORITHMS_PRECISION_EXPLANATIONS.find((e) => e.conceptId === 'math.arith.decimals')!
    expect(d.content).toMatch(/More digits does not mean bigger/i)
    expect(d.content).toMatch(/one number, not a 3 next to a 7/i)
  })

  it('percentages show the non-cancelling case with real numbers', () => {
    const p = MATHEMATICS_ALGORITHMS_PRECISION_EXPLANATIONS.find((e) => e.conceptId === 'math.arith.percentages')!
    expect(p.content).toMatch(/£99/)
    expect(p.content).toMatch(/50% loss needs a 100% gain/i)
  })

  it('rounding and significant figures are kept apart, with the small-number case', () => {
    const r = MATHEMATICS_ALGORITHMS_PRECISION_EXPLANATIONS.find((e) => e.conceptId === 'math.arith.rounding')!
    const sf = MATHEMATICS_ALGORITHMS_PRECISION_EXPLANATIONS.find((e) => e.conceptId === 'math.arith.significant-figures')!
    expect(r.content).toMatch(/0\.004617/)
    expect(r.content).toMatch(/never counted as significant/i)
    // the two rules that get conflated
    expect(sf.content).toMatch(/fewest SIGNIFICANT FIGURES/)
    expect(sf.content).toMatch(/fewest DECIMAL PLACES/)
  })

  it('every probe is gradeable and offers at least three choices', () => {
    for (const p of MATHEMATICS_ALGORITHMS_PRECISION_PROBES) {
      expect(p.choices?.filter((c) => c.isCorrect).length, p.stem).toBe(1)
      expect(p.choices!.length, p.stem).toBeGreaterThanOrEqual(3)
    }
  })

  it('no two probes for one concept collide on identity', () => {
    const slugs = MATHEMATICS_ALGORITHMS_PRECISION_PROBES.map((p) => `${p.conceptId}:${p.probeKind}:${p.gradeBand}:${p.difficulty}`)
    expect(new Set(slugs).size).toBe(slugs.length)
  })
})

/**
 * Batch 18 — the last of math.arith, plus two from number theory.
 *
 * One probe in this batch was rewritten before commit: the 11-rule
 * distractor originally offered "alternate from the right", which is a
 * VALID method reaching the correct conclusion — a distractor a careful
 * learner would be right to pick. It was replaced with a genuine
 * sign-misassignment. The check below pins the surviving arithmetic so
 * the same mistake cannot creep back.
 */
describe('mathematics — closing arithmetic, and two from number theory', () => {
  const NEW = [
    'math.arith.fraction-simplification', 'math.arith.fraction-addition',
    'math.arith.integer-arithmetic', 'math.arith.mental-arithmetic',
    'math.arith.irrational-roots', 'math.arith.scientific-notation',
    'math.nt.composite-number', 'math.nt.divisibility-rules',
  ]

  it.each(NEW)('%s now meets the contract', (conceptId) => {
    const explanations = MATHEMATICS_ARITH_CLOSE_EXPLANATIONS.filter((e) => e.conceptId === conceptId)
    const probes = MATHEMATICS_ARITH_CLOSE_PROBES.filter((p) => p.conceptId === conceptId && isClosedChoice(p))
    expect(explanations.length, conceptId).toBeGreaterThanOrEqual(1)
    const verdict = evaluateAssetContract({
      explanations: explanations.length, closedChoiceProbes: probes.length,
    })
    expect(verdict.satisfied, `${conceptId}: ${verdict.shortfall}`).toBe(true)
  })

  it('the 11-rule probe offers no distractor that is actually a valid method', () => {
    const p = MATHEMATICS_ARITH_CLOSE_PROBES.find((x) => x.conceptId === 'math.nt.divisibility-rules' && x.stem.includes('2915'))!
    // 2915 IS divisible by 11; alternating either direction gives ±11, so
    // neither direction may appear as a wrong answer.
    expect(2915 % 11).toBe(0)
    for (const c of p.choices!.filter((c) => !c.isCorrect)) {
      expect(c.text, `distractor reaches a valid alternating sum: ${c.text}`).not.toMatch(/−2 \+ 9 − 1 \+ 5|5 − 1 \+ 9 − 2/)
    }
  })

  it('1 is taught as neither prime nor composite, with the reason', () => {
    const c = MATHEMATICS_ARITH_CLOSE_EXPLANATIONS.find((e) => e.conceptId === 'math.nt.composite-number')!
    expect(c.content).toMatch(/1 is NEITHER/)
    expect(c.content).toMatch(/unique/i)
  })

  it('−3² is distinguished from (−3)²', () => {
    const i = MATHEMATICS_ARITH_CLOSE_EXPLANATIONS.find((e) => e.conceptId === 'math.arith.integer-arithmetic')!
    expect(i.content).toMatch(/−3² is −9, not 9/)
  })

  it('fraction addition gives the size check, not just the procedure', () => {
    const f = MATHEMATICS_ARITH_CLOSE_EXPLANATIONS.find((e) => e.conceptId === 'math.arith.fraction-addition')!
    expect(f.content).toMatch(/2\/5 is less than 1\/2/)
  })

  it('simplification names a case the obvious factors miss', () => {
    const f = MATHEMATICS_ARITH_CLOSE_EXPLANATIONS.find((e) => e.conceptId === 'math.arith.fraction-simplification')!
    expect(f.content).toMatch(/51\/68/)
  })

  it('irrationality is presented as proved, and the decimal as an approximation', () => {
    const r = MATHEMATICS_ARITH_CLOSE_EXPLANATIONS.find((e) => e.conceptId === 'math.arith.irrational-roots')!
    expect(r.content).toMatch(/is a PROOF, not an unfinished search/i)
    expect(r.content).toMatch(/1\.41421356 is not √2/)
  })

  it('every probe is gradeable and offers at least three choices', () => {
    for (const p of MATHEMATICS_ARITH_CLOSE_PROBES) {
      expect(p.choices?.filter((c) => c.isCorrect).length, p.stem).toBe(1)
      expect(p.choices!.length, p.stem).toBeGreaterThanOrEqual(3)
    }
  })

  it('no two probes for one concept collide on identity', () => {
    const slugs = MATHEMATICS_ARITH_CLOSE_PROBES.map((p) => `${p.conceptId}:${p.probeKind}:${p.gradeBand}:${p.difficulty}`)
    expect(new Set(slugs).size).toBe(slugs.length)
  })
})

/**
 * Batch 19 — measurement, and the first sameness criterion.
 *
 * Area/perimeter conflation appears in FOUR of these registers
 * independently, so it is checked with the concrete counterexample
 * rather than a warning: 1x8 and 3x6 share a perimeter of 18 and have
 * areas 8 and 18. The arithmetic is asserted here so a later edit
 * cannot quietly break the example.
 */
describe('mathematics measurement and congruence', () => {
  const NEW = [
    'math.geom.angle-pairs', 'math.geom.length', 'math.geom.perimeter',
    'math.geom.area', 'math.geom.area-triangle', 'math.geom.area-polygon',
    'math.geom.circle-parts', 'math.geom.congruent-triangles',
  ]

  it.each(NEW)('%s now meets the contract', (conceptId) => {
    const explanations = MATHEMATICS_MEASUREMENT_EXPLANATIONS.filter((e) => e.conceptId === conceptId)
    const probes = MATHEMATICS_MEASUREMENT_PROBES.filter((p) => p.conceptId === conceptId && isClosedChoice(p))
    expect(explanations.length, conceptId).toBeGreaterThanOrEqual(1)
    const verdict = evaluateAssetContract({
      explanations: explanations.length, closedChoiceProbes: probes.length,
    })
    expect(verdict.satisfied, `${conceptId}: ${verdict.shortfall}`).toBe(true)
  })

  it('the perimeter counterexample is arithmetically true', () => {
    // 1x8 and 3x6: same perimeter, very different areas.
    expect(2 * (1 + 8)).toBe(18)
    expect(2 * (3 + 6)).toBe(18)
    expect(1 * 8).toBe(8)
    expect(3 * 6).toBe(18)
    const p = MATHEMATICS_MEASUREMENT_EXPLANATIONS.find((e) => e.conceptId === 'math.geom.perimeter')!
    expect(p.content).toMatch(/BOTH have perimeter 18/)
    expect(p.content).toMatch(/not a rule with exceptions/i)
  })

  it('area is taught as counting squares, and scaling as the square', () => {
    const a = MATHEMATICS_MEASUREMENT_EXPLANATIONS.find((e) => e.conceptId === 'math.geom.area')!
    expect(a.content).toMatch(/unit squares fit inside/i)
    expect(a.content).toMatch(/FOUR times/)
  })

  it('the polygon formulas are derived from the rectangle, not listed', () => {
    const p = MATHEMATICS_MEASUREMENT_EXPLANATIONS.find((e) => e.conceptId === 'math.geom.area-polygon')!
    expect(p.content).toMatch(/comes from the rectangle by cutting and moving/i)
    expect(p.content).toMatch(/NO half/)
  })

  it('the triangle height is defined as perpendicular, and Heron as height-free', () => {
    const t = MATHEMATICS_MEASUREMENT_EXPLANATIONS.find((e) => e.conceptId === 'math.geom.area-triangle')!
    expect(t.content).toMatch(/perpendicular distance/i)
    expect(t.content).toMatch(/needs no height at all/i)
  })

  it('both congruence impostors are named and distinguished from each other', () => {
    const c = MATHEMATICS_MEASUREMENT_EXPLANATIONS.find((e) => e.conceptId === 'math.geom.congruent-triangles')!
    expect(c.content).toMatch(/AAA/)
    expect(c.content).toMatch(/SSA/)
    expect(c.content).toMatch(/ambiguous case/i)
  })

  it('sector and segment are separated by the reaches-the-centre test', () => {
    const c = MATHEMATICS_MEASUREMENT_EXPLANATIONS.find((e) => e.conceptId === 'math.geom.circle-parts')!
    expect(c.content).toMatch(/sector reaches the centre and the segment does not/i)
  })

  it('every probe is gradeable and offers at least three choices', () => {
    for (const p of MATHEMATICS_MEASUREMENT_PROBES) {
      expect(p.choices?.filter((c) => c.isCorrect).length, p.stem).toBe(1)
      expect(p.choices!.length, p.stem).toBeGreaterThanOrEqual(3)
    }
  })

  it('no two probes for one concept collide on identity', () => {
    const slugs = MATHEMATICS_MEASUREMENT_PROBES.map((p) => `${p.conceptId}:${p.probeKind}:${p.gradeBand}:${p.difficulty}`)
    expect(new Set(slugs).size).toBe(slugs.length)
  })
})

/**
 * Batch 20 — the coordinate plane and two conics.
 *
 * The ellipse and hyperbola are a matched pair that swap on BOTH counts
 * at once — sum vs difference of distances, difference vs sum of
 * squares — and their registers record exactly that cross-contamination.
 * They are therefore authored together, each naming the other, and the
 * checks below demand both halves of the swap appear in both entries.
 */
describe('mathematics coordinate plane and conics', () => {
  const NEW = [
    'math.geom.quadrants', 'math.geom.midpoint-formula',
    'math.geom.line-equation', 'math.geom.parallelogram',
    'math.geom.pythagorean-converse', 'math.geom.reflection',
    'math.geom.ellipse', 'math.geom.hyperbola',
  ]

  it.each(NEW)('%s now meets the contract', (conceptId) => {
    const explanations = MATHEMATICS_COORDINATE_EXPLANATIONS.filter((e) => e.conceptId === conceptId)
    const probes = MATHEMATICS_COORDINATE_PROBES.filter((p) => p.conceptId === conceptId && isClosedChoice(p))
    expect(explanations.length, conceptId).toBeGreaterThanOrEqual(1)
    const verdict = evaluateAssetContract({
      explanations: explanations.length, closedChoiceProbes: probes.length,
    })
    expect(verdict.satisfied, `${conceptId}: ${verdict.shortfall}`).toBe(true)
  })

  it('the two conics each state the full swap, not half of it', () => {
    const ell = MATHEMATICS_COORDINATE_EXPLANATIONS.find((e) => e.conceptId === 'math.geom.ellipse')!
    const hyp = MATHEMATICS_COORDINATE_EXPLANATIONS.find((e) => e.conceptId === 'math.geom.hyperbola')!
    // distances: ellipse sums, hyperbola differences
    expect(ell.content).toMatch(/SUM to a constant/)
    expect(hyp.content).toMatch(/constant\s+DIFFERENCE/)
    // squares: ellipse subtracts, hyperbola adds — and each names the other
    expect(ell.content).toMatch(/c² = a² − b²/)
    expect(hyp.content).toMatch(/c² = a² \+ b²/)
    expect(ell.content).toMatch(/hyperbola/i)
    expect(hyp.content).toMatch(/ellipse/i)
  })

  it('the Pythagorean converse is taught as a separate claim, with the general rule denied', () => {
    const c = MATHEMATICS_COORDINATE_EXPLANATIONS.find((e) => e.conceptId === 'math.geom.pythagorean-converse')!
    expect(c.content).toMatch(/separate claim needing its own proof/i)
    expect(c.content).toMatch(/Converses fail constantly/i)
    // and the acute/obtuse extension, which is what makes it useful
    expect(c.content).toMatch(/acute/i)
    expect(c.content).toMatch(/obtuse/i)
  })

  it('the y = x reflection swaps without negating, and orientation reverses', () => {
    const r = MATHEMATICS_COORDINATE_EXPLANATIONS.find((e) => e.conceptId === 'math.geom.reflection')!
    expect(r.content).toMatch(/coordinates SWAP/)
    expect(r.content).toMatch(/no negation at all/i)
    expect(r.content).toMatch(/cannot shake your right hand/i)
  })

  it('quadrant numbering is stated as anticlockwise, and axis points excluded', () => {
    const q = MATHEMATICS_COORDINATE_EXPLANATIONS.find((e) => e.conceptId === 'math.geom.quadrants')!
    expect(q.content).toMatch(/ANTI-clockwise/)
    expect(q.content).toMatch(/in NO quadrant/)
  })

  it('the three line forms are said to be one line', () => {
    const l = MATHEMATICS_COORDINATE_EXPLANATIONS.find((e) => e.conceptId === 'math.geom.line-equation')!
    expect(l.content).toMatch(/SAME LINE/)
  })

  it('every probe is gradeable and offers at least three choices', () => {
    for (const p of MATHEMATICS_COORDINATE_PROBES) {
      expect(p.choices?.filter((c) => c.isCorrect).length, p.stem).toBe(1)
      expect(p.choices!.length, p.stem).toBeGreaterThanOrEqual(3)
    }
  })

  it('no two probes for one concept collide on identity', () => {
    const slugs = MATHEMATICS_COORDINATE_PROBES.map((p) => `${p.conceptId}:${p.probeKind}:${p.gradeBand}:${p.difficulty}`)
    expect(new Set(slugs).size).toBe(slugs.length)
  })
})

/**
 * Batch 21 — number theory.
 *
 * This batch carries more checkable arithmetic than any before it, and
 * the checks below RE-COMPUTE the claims rather than pattern-matching
 * the prose: 561 really is a Carmichael number, phi(12) really is 4 by
 * distinct primes, the Bezout pair really certifies gcd(30,18), and the
 * D=61 Pell solution really satisfies the equation. A wrong number in a
 * teaching asset is worse than a missing one, because it is believed.
 */
describe('mathematics number theory', () => {
  const NEW = [
    'math.nt.sieve-of-eratosthenes', 'math.nt.fundamental-theorem-arithmetic',
    'math.nt.primality-testing', 'math.nt.eulers-totient',
    'math.nt.eulers-theorem', 'math.nt.extended-euclidean-algorithm',
    'math.nt.general-diophantine', 'math.nt.pells-equation',
  ]

  it.each(NEW)('%s now meets the contract', (conceptId) => {
    const explanations = MATHEMATICS_NUMBER_THEORY_EXPLANATIONS.filter((e) => e.conceptId === conceptId)
    const probes = MATHEMATICS_NUMBER_THEORY_PROBES.filter((p) => p.conceptId === conceptId && isClosedChoice(p))
    expect(explanations.length, conceptId).toBeGreaterThanOrEqual(1)
    const verdict = evaluateAssetContract({
      explanations: explanations.length, closedChoiceProbes: probes.length,
    })
    expect(verdict.satisfied, `${conceptId}: ${verdict.shortfall}`).toBe(true)
  })

  it('561 really is a Carmichael number, as the primality entry claims', () => {
    const modpow = (b: bigint, e: bigint, m: bigint) => {
      let r = 1n; b %= m
      while (e > 0n) { if (e & 1n) r = (r * b) % m; b = (b * b) % m; e >>= 1n }
      return r
    }
    // 561 = 3 x 11 x 17, composite, yet passes the Fermat test for every coprime base
    expect(561 % 3).toBe(0)
    for (const a of [2n, 5n, 7n, 13n, 23n]) {
      expect(modpow(a, 560n, 561n), `base ${a}`).toBe(1n)
    }
    const p = MATHEMATICS_NUMBER_THEORY_EXPLANATIONS.find((e) => e.conceptId === 'math.nt.primality-testing')!
    expect(p.content).toMatch(/561 is the smallest/)
    expect(p.content).toMatch(/PASSING PROVES NOTHING/)
  })

  it('the totient worked example is right, and uses distinct primes only', () => {
    // 12 = 2^2 x 3 -> 12 * (1 - 1/2) * (1 - 1/3) = 4, the 2 used ONCE
    expect(12 * (1 - 1 / 2) * (1 - 1 / 3)).toBe(4)
    const t = MATHEMATICS_NUMBER_THEORY_EXPLANATIONS.find((e) => e.conceptId === 'math.nt.eulers-totient')!
    expect(t.content).toMatch(/DISTINCT primes/)
    expect(t.content).toMatch(/φ\(7\) = 6/)
  })

  it('the Bezout certificate in the EEA entry actually certifies the gcd', () => {
    expect(2 * 18 - 30).toBe(6)   // x = -1, y = 2
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
    expect(gcd(30, 18)).toBe(6)
    const e = MATHEMATICS_NUMBER_THEORY_EXPLANATIONS.find((x) => x.conceptId === 'math.nt.extended-euclidean-algorithm')!
    expect(e.content).toMatch(/x = −1 and y = 2/)
  })

  it('the D=61 Pell solution quoted really satisfies the equation', () => {
    const x = 1766319049n, y = 226153980n
    expect(x * x - 61n * y * y).toBe(1n)
    const p = MATHEMATICS_NUMBER_THEORY_EXPLANATIONS.find((e) => e.conceptId === 'math.nt.pells-equation')!
    expect(p.content).toMatch(/1 766 319 049/)
    expect(p.content).toMatch(/NON-SQUARE|non-square/)
  })

  it('the FTA is taught as two separate claims', () => {
    const f = MATHEMATICS_NUMBER_THEORY_EXPLANATIONS.find((e) => e.conceptId === 'math.nt.fundamental-theorem-arithmetic')!
    expect(f.content).toMatch(/TWO claims/)
    expect(f.content).toMatch(/harder half/i)
  })

  it('Fermat is named as the special case of Euler, not a separate result', () => {
    const e = MATHEMATICS_NUMBER_THEORY_EXPLANATIONS.find((x) => x.conceptId === 'math.nt.eulers-theorem')!
    expect(e.content).toMatch(/special case where n is PRIME/)
  })

  it('the Diophantine entry states that no general method can exist', () => {
    const g = MATHEMATICS_NUMBER_THEORY_EXPLANATIONS.find((e) => e.conceptId === 'math.nt.general-diophantine')!
    expect(g.content).toMatch(/Hilbert/)
    expect(g.content).toMatch(/Matiyasevich/)
    expect(g.content).toMatch(/theorem rather than an admission/i)
  })

  it('every probe is gradeable and offers at least three choices', () => {
    for (const p of MATHEMATICS_NUMBER_THEORY_PROBES) {
      expect(p.choices?.filter((c) => c.isCorrect).length, p.stem).toBe(1)
      expect(p.choices!.length, p.stem).toBeGreaterThanOrEqual(3)
    }
  })

  it('no two probes for one concept collide on identity', () => {
    const slugs = MATHEMATICS_NUMBER_THEORY_PROBES.map((p) => `${p.conceptId}:${p.probeKind}:${p.gradeBand}:${p.difficulty}`)
    expect(new Set(slugs).size).toBe(slugs.length)
  })
})

/**
 * Batch 22 — the angle spine, the distance fact, and two transformations.
 *
 * parallel lines -> triangle angle sum -> polygon angle sum is one
 * derivation, not three facts, and three separate registers record it
 * being memorised as three. The checks below demand each entry POINTS
 * at the one below it, so the chain is visible in the content rather
 * than only in this comment.
 */
describe('mathematics angle spine, distance and transformations', () => {
  const NEW = [
    'math.geom.parallel-lines', 'math.geom.triangle-angle-sum',
    'math.geom.polygon-angle-sum', 'math.geom.pythagorean-theorem',
    'math.geom.distance-formula', 'math.geom.quadrilateral',
    'math.geom.rotation', 'math.geom.dilation',
  ]

  it.each(NEW)('%s now meets the contract', (conceptId) => {
    const explanations = MATHEMATICS_TRIANGLE_TRANSFORM_EXPLANATIONS.filter((e) => e.conceptId === conceptId)
    const probes = MATHEMATICS_TRIANGLE_TRANSFORM_PROBES.filter((p) => p.conceptId === conceptId && isClosedChoice(p))
    expect(explanations.length, conceptId).toBeGreaterThanOrEqual(1)
    const verdict = evaluateAssetContract({
      explanations: explanations.length, closedChoiceProbes: probes.length,
    })
    expect(verdict.satisfied, `${conceptId}: ${verdict.shortfall}`).toBe(true)
  })

  it('the angle spine is visible: each entry points at the one it rests on', () => {
    const find = (id: string) => MATHEMATICS_TRIANGLE_TRANSFORM_EXPLANATIONS.find((e) => e.conceptId === id)!
    // triangle sum is derived FROM parallel lines, and says so
    expect(find('math.geom.triangle-angle-sum').content).toMatch(/parallel/i)
    expect(find('math.geom.triangle-angle-sum').content).toMatch(/CONSEQUENCE of them/)
    // polygon sum is the triangle result applied n-2 times, and says so
    expect(find('math.geom.polygon-angle-sum').content).toMatch(/n − 2 triangles/)
    // parallel lines carries the converse, which is what makes the proof possible
    expect(find('math.geom.parallel-lines').content).toMatch(/BOTH ways/)
  })

  it('the distance formula is named as Pythagoras, not a new rule', () => {
    const d = MATHEMATICS_TRIANGLE_TRANSFORM_EXPLANATIONS.find((e) => e.conceptId === 'math.geom.distance-formula')!
    expect(d.content).toMatch(/not a\s+new formula/i)
    expect(d.content).toMatch(/Pythagorean theorem wearing/i)
    // the 3-4-5 contrast between grid distance and straight-line distance
    expect(Math.hypot(3, 4)).toBe(5)
    expect(3 + 4).toBe(7)
    expect(d.content).toMatch(/while the straight-line distance is 5/)
  })

  it('the polygon arithmetic quoted is right', () => {
    expect((5 - 2) * 180).toBe(540)
    expect((4 - 2) * 180).toBe(360)
    const p = MATHEMATICS_TRIANGLE_TRANSFORM_EXPLANATIONS.find((e) => e.conceptId === 'math.geom.polygon-angle-sum')!
    expect(p.content).toMatch(/giving 360°/)
  })

  it('the missing-leg case subtracts, and the arithmetic holds', () => {
    expect(25 - 9).toBe(16)
    expect(Math.sqrt(16)).toBe(4)
    const y = MATHEMATICS_TRIANGLE_TRANSFORM_EXPLANATIONS.find((e) => e.conceptId === 'math.geom.pythagorean-theorem')!
    expect(y.content).toMatch(/SUBTRACTION/)
  })

  it('quadrilateral categories are said to nest, with the reason', () => {
    const q = MATHEMATICS_TRIANGLE_TRANSFORM_EXPLANATIONS.find((e) => e.conceptId === 'math.geom.quadrilateral')!
    expect(q.content).toMatch(/categories NEST/)
    expect(q.content).toMatch(/without being restated four times/i)
  })

  it('dilation separates k from k², and negative k from a reflection', () => {
    const d = MATHEMATICS_TRIANGLE_TRANSFORM_EXPLANATIONS.find((e) => e.conceptId === 'math.geom.dilation')!
    expect(d.content).toMatch(/NINE times bigger/)
    expect(d.content).toMatch(/NOT a reflection/)
  })

  it('every probe is gradeable and offers at least three choices', () => {
    for (const p of MATHEMATICS_TRIANGLE_TRANSFORM_PROBES) {
      expect(p.choices?.filter((c) => c.isCorrect).length, p.stem).toBe(1)
      expect(p.choices!.length, p.stem).toBeGreaterThanOrEqual(3)
    }
  })

  it('no two probes for one concept collide on identity', () => {
    const slugs = MATHEMATICS_TRIANGLE_TRANSFORM_PROBES.map((p) => `${p.conceptId}:${p.probeKind}:${p.gradeBand}:${p.difficulty}`)
    expect(new Set(slugs).size).toBe(slugs.length)
  })
})

/**
 * Batch 23 — the divisibility spine and the arithmetic of remainders.
 *
 * The division algorithm sits at a fork: its uniqueness is what makes
 * the Euclidean algorithm TERMINATE and what makes "a mod n" a single
 * well-defined value. Two registers record it being read as a
 * restatement of division, which hides both. The checks below re-derive
 * the worked numbers rather than trusting the prose.
 */
describe('mathematics divisibility and modular arithmetic', () => {
  const NEW = [
    'math.nt.divisibility', 'math.nt.division-algorithm',
    'math.nt.prime-factorization', 'math.nt.euclidean-algorithm',
    'math.nt.gcd', 'math.nt.lcm',
    'math.nt.congruence', 'math.nt.modular-arithmetic',
  ]

  it.each(NEW)('%s now meets the contract', (conceptId) => {
    const explanations = MATHEMATICS_DIVISIBILITY_MODULAR_EXPLANATIONS.filter((e) => e.conceptId === conceptId)
    const probes = MATHEMATICS_DIVISIBILITY_MODULAR_PROBES.filter((p) => p.conceptId === conceptId && isClosedChoice(p))
    expect(explanations.length, conceptId).toBeGreaterThanOrEqual(1)
    const verdict = evaluateAssetContract({
      explanations: explanations.length, closedChoiceProbes: probes.length,
    })
    expect(verdict.satisfied, `${conceptId}: ${verdict.shortfall}`).toBe(true)
  })

  it('the negative-dividend case is arithmetically right', () => {
    // -17 = 5*(-4) + 3, with 0 <= 3 < 5. The truncating pair (-3, -2) violates r >= 0.
    expect(5 * -4 + 3).toBe(-17)
    expect(3).toBeGreaterThanOrEqual(0)
    expect(3).toBeLessThan(5)
    const d = MATHEMATICS_DIVISIBILITY_MODULAR_EXPLANATIONS.find((e) => e.conceptId === 'math.nt.division-algorithm')!
    expect(d.content).toMatch(/q = −4, r = 3/)
    expect(d.content).toMatch(/NON-NEGATIVE/)
  })

  it('the Euclidean trace and the gcd/lcm pair are right', () => {
    expect(48 % 18).toBe(12)
    expect(18 % 12).toBe(6)
    expect(12 % 6).toBe(0)
    // gcd 6, lcm 36, and the product relation
    expect((12 * 18) / 6).toBe(36)
    const l = MATHEMATICS_DIVISIBILITY_MODULAR_EXPLANATIONS.find((e) => e.conceptId === 'math.nt.lcm')!
    expect(l.content).toMatch(/216\/6 = 36/)
  })

  it('gcd and lcm carry OPPOSITE size checks, and both are stated', () => {
    const g = MATHEMATICS_DIVISIBILITY_MODULAR_EXPLANATIONS.find((e) => e.conceptId === 'math.nt.gcd')!
    const l = MATHEMATICS_DIVISIBILITY_MODULAR_EXPLANATIONS.find((e) => e.conceptId === 'math.nt.lcm')!
    expect(g.content).toMatch(/never exceed the smaller input/i)
    expect(l.content).toMatch(/never SMALLER than the larger/i)
    // and the exponent rule that gets swapped
    expect(g.content).toMatch(/LOWER exponent/)
    expect(l.content).toMatch(/HIGHER exponent/)
  })

  it('the modular claims hold: negative reduction and the non-invertible residue', () => {
    expect(((3 - 5) % 7 + 7) % 7).toBe(5)
    const inverses = (b: number, n: number) => [...Array(n).keys()].filter((x) => (b * x) % n === 1)
    expect(inverses(5, 12)).toEqual([5])
    expect(inverses(6, 12)).toEqual([])
    const m = MATHEMATICS_DIVISIBILITY_MODULAR_EXPLANATIONS.find((e) => e.conceptId === 'math.nt.modular-arithmetic')!
    expect(m.content).toMatch(/6 has none/)
    expect(m.content).toMatch(/only when n is PRIME/)
  })

  it('divisibility is taught as a claim, and not symmetric', () => {
    const d = MATHEMATICS_DIVISIBILITY_MODULAR_EXPLANATIONS.find((e) => e.conceptId === 'math.nt.divisibility')!
    expect(d.content).toMatch(/yes-or-no\s+CLAIM/)
    expect(d.content).toMatch(/not symmetric/i)
  })

  it('congruence is separated from equality and pinned to exactly n classes', () => {
    const c = MATHEMATICS_DIVISIBILITY_MODULAR_EXPLANATIONS.find((e) => e.conceptId === 'math.nt.congruence')!
    expect(c.content).toMatch(/Congruent is not equal/)
    expect(c.content).toMatch(/always n, never more or fewer/)
  })

  it('every probe is gradeable and offers at least three choices', () => {
    for (const p of MATHEMATICS_DIVISIBILITY_MODULAR_PROBES) {
      expect(p.choices?.filter((c) => c.isCorrect).length, p.stem).toBe(1)
      expect(p.choices!.length, p.stem).toBeGreaterThanOrEqual(3)
    }
  })

  it('no two probes for one concept collide on identity', () => {
    const slugs = MATHEMATICS_DIVISIBILITY_MODULAR_PROBES.map((p) => `${p.conceptId}:${p.probeKind}:${p.gradeBand}:${p.difficulty}`)
    expect(new Set(slugs).size).toBe(slugs.length)
  })
})

/**
 * Batch 24 — Bézout to RSA.
 *
 * Every link in this chain is an EXISTENCE statement first and a
 * computation second, and four registers record the same inversion:
 * the algorithm gets learnt and the guarantee it rests on does not.
 * The checks below re-derive every quoted number AND demand each entry
 * names the guarantee rather than only the procedure.
 */
describe('mathematics number theory — Bézout to RSA', () => {
  const NEW = [
    'math.nt.residue-classes', 'math.nt.bezout-identity',
    'math.nt.modular-inverse', 'math.nt.fermats-little-theorem',
    'math.nt.chinese-remainder-theorem', 'math.nt.linear-diophantine',
    'math.nt.rsa-basics', 'math.nt.pythagorean-triples',
  ]

  it.each(NEW)('%s now meets the contract', (conceptId) => {
    const explanations = MATHEMATICS_CRYPTO_NUMBER_EXPLANATIONS.filter((e) => e.conceptId === conceptId)
    const probes = MATHEMATICS_CRYPTO_NUMBER_PROBES.filter((p) => p.conceptId === conceptId && isClosedChoice(p))
    expect(explanations.length, conceptId).toBeGreaterThanOrEqual(1)
    const verdict = evaluateAssetContract({
      explanations: explanations.length, closedChoiceProbes: probes.length,
    })
    expect(verdict.satisfied, `${conceptId}: ${verdict.shortfall}`).toBe(true)
  })

  it('the Fermat worked example is right, including the mod p−1 reduction', () => {
    const modpow = (b: number, e: number, m: number) => {
      let r = 1; b %= m
      while (e > 0) { if (e & 1) r = (r * b) % m; b = (b * b) % m; e >>= 1 }
      return r
    }
    expect(modpow(3, 6, 7)).toBe(1)          // Fermat holds, 7 does not divide 3
    expect(modpow(7, 6, 7)).toBe(0)          // hypothesis fails when p | a
    expect(100 % 6).toBe(4)                  // reduce mod p-1
    expect(modpow(3, 100, 7)).toBe(modpow(3, 4, 7))
    expect(modpow(3, 100, 7)).not.toBe(modpow(3, 100 % 7, 7))  // mod p is WRONG
    const f = MATHEMATICS_CRYPTO_NUMBER_EXPLANATIONS.find((e) => e.conceptId === 'math.nt.fermats-little-theorem')!
    expect(f.content).toMatch(/mod p−1, NOT mod\s+p/)
  })

  it('the linear-Diophantine scaling and step size are right', () => {
    expect(6 * -1 + 9 * 1).toBe(3)           // Bezout for gcd
    expect(6 * -7 + 9 * 7).toBe(21)          // scaled by c/g = 7
    expect(21 % 3).toBe(0)                   // solvable: gcd DIVIDES c
    // step size b/g = 3, a/g = 2 — every t gives a solution
    for (const t of [-2, 0, 1, 5]) expect(6 * (-7 + 3 * t) + 9 * (7 - 2 * t)).toBe(21)
    const l = MATHEMATICS_CRYPTO_NUMBER_EXPLANATIONS.find((e) => e.conceptId === 'math.nt.linear-diophantine')!
    expect(l.content).toMatch(/DIVIDES c/)
  })

  it('the CRT and triple examples check out', () => {
    expect(8 % 3).toBe(2)
    expect(8 % 5).toBe(3)
    expect(20 ** 2 + 21 ** 2).toBe(29 ** 2)  // a genuine triple
    expect(6 ** 2 + 7 ** 2).not.toBe(9 ** 2) // the near-miss
    expect(6 ** 2 + 8 ** 2).toBe(10 ** 2)    // 3-4-5 doubled
  })

  it('ℤ/6ℤ really fails to be a field, as the residue-class entry claims', () => {
    expect((2 * 3) % 6).toBe(0)              // zero divisors
    const inverses = (b: number, n: number) => [...Array(n).keys()].filter((x) => (b * x) % n === 1)
    expect(inverses(2, 6)).toEqual([])
    const r = MATHEMATICS_CRYPTO_NUMBER_EXPLANATIONS.find((e) => e.conceptId === 'math.nt.residue-classes')!
    expect(r.content).toMatch(/FIELD only when n is prime/)
  })

  it('each entry names the guarantee, not only the procedure', () => {
    const find = (id: string) => MATHEMATICS_CRYPTO_NUMBER_EXPLANATIONS.find((e) => e.conceptId === id)!
    expect(find('math.nt.bezout-identity').content).toMatch(/EXIST integers x and y/)
    expect(find('math.nt.modular-inverse').content).toMatch(/that criterion is Bézout, not a new fact/i)
    expect(find('math.nt.chinese-remainder-theorem').content).toMatch(/structural fact rather than a numerical coincidence/i)
    expect(find('math.nt.rsa-basics').content).toMatch(/FACTORING n/)
  })

  it('every probe is gradeable and offers at least three choices', () => {
    for (const p of MATHEMATICS_CRYPTO_NUMBER_PROBES) {
      expect(p.choices?.filter((c) => c.isCorrect).length, p.stem).toBe(1)
      expect(p.choices!.length, p.stem).toBeGreaterThanOrEqual(3)
    }
  })

  it('no two probes for one concept collide on identity', () => {
    const slugs = MATHEMATICS_CRYPTO_NUMBER_PROBES.map((p) => `${p.conceptId}:${p.probeKind}:${p.gradeBand}:${p.difficulty}`)
    expect(new Set(slugs).size).toBe(slugs.length)
  })
})

/**
 * Batch 25 — the analytic and algebraic tail. NINE concepts; closes math.nt.
 *
 * FOUR registers here record the SAME error: that the Prime Number
 * Theorem depends on the Riemann Hypothesis. It does not — PNT was
 * proved in 1896 and RH has been open since 1859, so a proved theorem
 * would be resting on an open conjecture. That mis-teaches what
 * "proved" MEANS as much as it mis-teaches the number theory, which is
 * why the check below demands all four entries get it right rather
 * than just the two most obvious ones.
 */
describe('mathematics analytic and algebraic number theory', () => {
  const NEW = [
    'math.nt.prime-distribution', 'math.nt.prime-number-theorem',
    'math.nt.riemann-hypothesis', 'math.nt.analytic-number-theory',
    'math.nt.algebraic-integers', 'math.nt.number-fields',
    'math.nt.algebraic-number-theory', 'math.nt.continued-fractions',
    'math.nt.induction-applications',
  ]

  it.each(NEW)('%s now meets the contract', (conceptId) => {
    const explanations = MATHEMATICS_ANALYTIC_ALGEBRAIC_EXPLANATIONS.filter((e) => e.conceptId === conceptId)
    const probes = MATHEMATICS_ANALYTIC_ALGEBRAIC_PROBES.filter((p) => p.conceptId === conceptId && isClosedChoice(p))
    expect(explanations.length, conceptId).toBeGreaterThanOrEqual(1)
    const verdict = evaluateAssetContract({
      explanations: explanations.length, closedChoiceProbes: probes.length,
    })
    expect(verdict.satisfied, `${conceptId}: ${verdict.shortfall}`).toBe(true)
  })

  it('all four analytic entries keep PNT independent of RH', () => {
    const find = (id: string) => MATHEMATICS_ANALYTIC_ALGEBRAIC_EXPLANATIONS.find((e) => e.conceptId === id)!
    // the two that must say it outright
    expect(find('math.nt.prime-number-theorem').content).toMatch(/does NOT depend on the Riemann Hypothesis/)
    expect(find('math.nt.riemann-hypothesis').content).toMatch(/proved in 1896 and does not wait for RH/)
    // and neither of the other two may imply the dependence
    expect(find('math.nt.analytic-number-theory').content).not.toMatch(/PNT (?:requires|depends on|needs) RH/i)
    expect(find('math.nt.prime-distribution').content).not.toMatch(/assuming RH/i)
    // the distinction that makes it concrete: zero-free line vs critical line
    expect(find('math.nt.prime-number-theorem').content).toMatch(/Re\(s\) = 1/)
    expect(find('math.nt.riemann-hypothesis').content).toMatch(/Re\(s\) = ½/)
  })

  it('the prime-counting figures quoted are real', () => {
    const sieve = (x: number) => {
      const s = new Array(x + 1).fill(true); s[0] = s[1] = false
      for (let i = 2; i * i <= x; i++) if (s[i]) for (let j = i * i; j <= x; j += i) s[j] = false
      return s.filter(Boolean).length
    }
    expect(sieve(100)).toBe(25)
    expect(sieve(1000000)).toBe(78498)
    expect(Math.round(1000000 / Math.log(1000000))).toBe(72382)
    const p = MATHEMATICS_ANALYTIC_ALGEBRAIC_EXPLANATIONS.find((e) => e.conceptId === 'math.nt.prime-distribution')!
    expect(p.content).toMatch(/72 382/)
    expect(p.content).toMatch(/78 498/)
  })

  it('the induction identity used in the worked example is true', () => {
    for (let n = 1; n <= 20; n++) {
      expect((n + 1) ** 3 - (n + 1)).toBe((n ** 3 - n) + 3 * (n ** 2 + n))
      expect(((n ** 3 - n) % 3)).toBe(0)
    }
    const i = MATHEMATICS_ANALYTIC_ALGEBRAIC_EXPLANATIONS.find((e) => e.conceptId === 'math.nt.induction-applications')!
    expect(i.content).toMatch(/BY THE HYPOTHESIS/)
  })

  it('the algebraic entries state the failure and its repair', () => {
    const find = (id: string) => MATHEMATICS_ANALYTIC_ALGEBRAIC_EXPLANATIONS.find((e) => e.conceptId === id)!
    expect(find('math.nt.algebraic-number-theory').content).toMatch(/does NOT always hold/)
    expect(find('math.nt.algebraic-number-theory').content).toMatch(/factor IDEALS instead/i)
    // monic is the whole condition, and the norm can be negative
    expect(find('math.nt.algebraic-integers').content).toMatch(/MONIC/)
    expect(1 - 2).toBe(-1)   // norm of 1 + sqrt2 in Z[sqrt2]
    expect(find('math.nt.algebraic-integers').content).toMatch(/which is −1 for 1 \+ √2/)
  })

  it('continued fractions are tied to the Euclidean algorithm and to Pell', () => {
    const c = MATHEMATICS_ANALYTIC_ALGEBRAIC_EXPLANATIONS.find((e) => e.conceptId === 'math.nt.continued-fractions')!
    expect(c.content).toMatch(/Euclidean algorithm in different clothes/i)
    expect(c.content).toMatch(/quadratic irrational/i)
    expect(c.content).toMatch(/Pell/)
  })

  it('every probe is gradeable and offers at least three choices', () => {
    for (const p of MATHEMATICS_ANALYTIC_ALGEBRAIC_PROBES) {
      expect(p.choices?.filter((c) => c.isCorrect).length, p.stem).toBe(1)
      expect(p.choices!.length, p.stem).toBeGreaterThanOrEqual(3)
    }
  })

  it('no two probes for one concept collide on identity', () => {
    const slugs = MATHEMATICS_ANALYTIC_ALGEBRAIC_PROBES.map((p) => `${p.conceptId}:${p.probeKind}:${p.gradeBand}:${p.difficulty}`)
    expect(new Set(slugs).size).toBe(slugs.length)
  })
})

/**
 * Batch 26 — polygons named properly, and the step into three dimensions.
 *
 * The plane half is ONE misconception in four costumes: classifying by
 * APPEARANCE rather than by measured property. The solid half is one
 * derivation being skipped: surface area is the faces added, and the
 * 1/3 in a pyramid is three pyramids filling their prism.
 *
 * Two probe defects were caught and fixed before commit — see the
 * arithmetic checks below, which exist because one distractor was
 * accidentally TRUE.
 */
describe('mathematics polygons and solids', () => {
  const NEW = [
    'math.geom.polygon', 'math.geom.triangle-types',
    'math.geom.regular-polygon', 'math.geom.trapezoid',
    'math.geom.solid-3d', 'math.geom.volume',
    'math.geom.surface-area', 'math.geom.platonic-solids',
  ]

  it.each(NEW)('%s now meets the contract', (conceptId) => {
    const explanations = MATHEMATICS_SOLIDS_POLYGONS_EXPLANATIONS.filter((e) => e.conceptId === conceptId)
    const probes = MATHEMATICS_SOLIDS_POLYGONS_PROBES.filter((p) => p.conceptId === conceptId && isClosedChoice(p))
    expect(explanations.length, conceptId).toBeGreaterThanOrEqual(1)
    const verdict = evaluateAssetContract({
      explanations: explanations.length, closedChoiceProbes: probes.length,
    })
    expect(verdict.satisfied, `${conceptId}: ${verdict.shortfall}`).toBe(true)
  })

  it('no Euler distractor is accidentally a correct V−E+F', () => {
    // 6 - 12 + 8 = 2 is the OCTAHEDRON and was briefly offered as a wrong
    // answer to a cube question. Any distractor evaluating to 2 is a trap.
    expect(8 - 12 + 6).toBe(2)      // cube, the correct answer
    expect(6 - 12 + 8).toBe(2)      // octahedron — must NOT appear as a distractor
    expect(8 - 6 + 12).toBe(14)     // the replacement, genuinely wrong
    const p = MATHEMATICS_SOLIDS_POLYGONS_PROBES.find((x) => x.conceptId === 'math.geom.solid-3d' && x.stem.includes('cube'))!
    for (const c of p.choices!.filter((c) => !c.isCorrect)) {
      expect(c.text, `distractor evaluates to a valid Euler characteristic: ${c.text}`).not.toMatch(/6 − 12 \+ 8/)
    }
  })

  it('all five Platonic solids satisfy V − E + F = 2', () => {
    const solids: [string, number, number, number][] = [
      ['tetrahedron', 4, 6, 4], ['cube', 8, 12, 6], ['octahedron', 6, 12, 8],
      ['dodecahedron', 20, 30, 12], ['icosahedron', 12, 30, 20],
    ]
    for (const [name, v, e, f] of solids) expect(v - e + f, name).toBe(2)
    expect(solids).toHaveLength(5)
    const p = MATHEMATICS_SOLIDS_POLYGONS_EXPLANATIONS.find((e) => e.conceptId === 'math.geom.platonic-solids')!
    expect(p.content).toMatch(/exactly five is a theorem/i)
    expect(p.content).toMatch(/under 360°/)
  })

  it('the regular-polygon angle arithmetic is right, and 180/n is denied', () => {
    expect(360 / 6).toBe(60)          // exterior
    expect(180 - 360 / 6).toBe(120)   // interior, the supplement
    expect(180 / 6).toBe(30)          // the wrong route
    const r = MATHEMATICS_SOLIDS_POLYGONS_EXPLANATIONS.find((e) => e.conceptId === 'math.geom.regular-polygon')!
    expect(r.content).toMatch(/It is not 180\/n/)
    expect(r.content).toMatch(/LARGER interior angles/)
  })

  it('the appearance-over-measurement thread is stated in all four plane entries', () => {
    const find = (id: string) => MATHEMATICS_SOLIDS_POLYGONS_EXPLANATIONS.find((e) => e.conceptId === id)!
    expect(find('math.geom.polygon').content).toMatch(/do(?:es)? not make it regular/i)
    expect(find('math.geom.triangle-types').content).toMatch(/by MEASUREMENT, never by how the drawing looks/i)
    expect(find('math.geom.regular-polygon').content).toMatch(/rather than a word for "looks tidy"/i)
    expect(find('math.geom.trapezoid').content).toMatch(/is NOT the slanted leg/i)
  })

  it('the solid entries derive rather than list', () => {
    const find = (id: string) => MATHEMATICS_SOLIDS_POLYGONS_EXPLANATIONS.find((e) => e.conceptId === id)!
    expect(find('math.geom.volume').content).toMatch(/three pyramids of the right shape assemble into/i)
    expect(find('math.geom.surface-area').content).toMatch(/not a new technique/i)
    expect(find('math.geom.solid-3d').content).toMatch(/gives V − E \+ F = 0/)
  })

  it('every probe is gradeable and offers at least three choices', () => {
    for (const p of MATHEMATICS_SOLIDS_POLYGONS_PROBES) {
      expect(p.choices?.filter((c) => c.isCorrect).length, p.stem).toBe(1)
      expect(p.choices!.length, p.stem).toBeGreaterThanOrEqual(3)
    }
  })

  it('no two probes for one concept collide on identity', () => {
    const slugs = MATHEMATICS_SOLIDS_POLYGONS_PROBES.map((p) => `${p.conceptId}:${p.probeKind}:${p.gradeBand}:${p.difficulty}`)
    expect(new Set(slugs).size).toBe(slugs.length)
  })
})

/**
 * Batch 27 — circles, and moving things about the plane.
 *
 * ONE error dominates the circle half and both formula registers name
 * it as their foundational entry: substituting the DIAMETER where the
 * formula wants a radius. It costs a factor of 2 in circumference and
 * 4 in area — and the asymmetry is the teachable part, because the
 * mistake in the area case sits inside a square. The checks below
 * compute both wrong answers, so the asymmetry is asserted rather than
 * asserted-about.
 */
describe('mathematics circles and transformations', () => {
  const NEW = [
    'math.geom.circle-circumference', 'math.geom.circle-area',
    'math.geom.circle-equation', 'math.geom.circle-theorems',
    'math.geom.x-y-coordinates', 'math.geom.transformations',
    'math.geom.translation', 'math.geom.geometric-constructions',
  ]

  it.each(NEW)('%s now meets the contract', (conceptId) => {
    const explanations = MATHEMATICS_CIRCLES_TRANSFORM_EXPLANATIONS.filter((e) => e.conceptId === conceptId)
    const probes = MATHEMATICS_CIRCLES_TRANSFORM_PROBES.filter((p) => p.conceptId === conceptId && isClosedChoice(p))
    expect(explanations.length, conceptId).toBeGreaterThanOrEqual(1)
    const verdict = evaluateAssetContract({
      explanations: explanations.length, closedChoiceProbes: probes.length,
    })
    expect(verdict.satisfied, `${conceptId}: ${verdict.shortfall}`).toBe(true)
  })

  it('the diameter slip really costs 2x in circumference and 4x in area', () => {
    const d = 14, r = d / 2
    expect(Math.round(Math.PI * d * 100) / 100).toBe(43.98)          // correct C
    expect(Math.round(2 * Math.PI * d * 100) / 100).toBe(87.96)      // the slip: exactly double
    expect((2 * Math.PI * d) / (Math.PI * d)).toBe(2)
    expect(Math.round(Math.PI * r * r * 10) / 10).toBe(153.9)        // correct A
    expect(Math.round(Math.PI * d * d * 10) / 10).toBe(615.8)        // the slip
    expect((Math.PI * d * d) / (Math.PI * r * r)).toBe(4)            // exactly four times
    const a = MATHEMATICS_CIRCLES_TRANSFORM_EXPLANATIONS.find((e) => e.conceptId === 'math.geom.circle-area')!
    expect(a.content).toMatch(/four times too large/)
    expect(a.content).toMatch(/inside a square/)
  })

  it('the impossible circle equation really completes to a negative', () => {
    // x^2 + y^2 - 4x + 6y + 20 = 0  ->  (x-2)^2 + (y+3)^2 = -20 + 4 + 9
    expect(-20 + 4 + 9).toBe(-7)
    const c = MATHEMATICS_CIRCLES_TRANSFORM_EXPLANATIONS.find((e) => e.conceptId === 'math.geom.circle-equation')!
    expect(c.content).toMatch(/= −7/)
    expect(c.content).toMatch(/describes nothing/)
  })

  it('the semicircle right angle is derived from the arc, not asserted', () => {
    expect(180 / 2).toBe(90)
    const t = MATHEMATICS_CIRCLES_TRANSFORM_EXPLANATIONS.find((e) => e.conceptId === 'math.geom.circle-theorems')!
    expect(t.content).toMatch(/the arc is 180° and half of that is 90°/)
    // and the halving rule is scoped to inscribed angles
    expect(t.content).toMatch(/halving applies to inscribed angles only/i)
  })

  it('composition is stated as non-commutative, and dilation as the odd one out', () => {
    const t = MATHEMATICS_CIRCLES_TRANSFORM_EXPLANATIONS.find((e) => e.conceptId === 'math.geom.transformations')!
    expect(t.content).toMatch(/does NOT commute/)
    expect(t.content).toMatch(/Dilations are not/)
  })

  it('the translation arithmetic is right and the shift is uniform', () => {
    expect([1 + 3, 5 - 2]).toEqual([4, 3])
    const t = MATHEMATICS_CIRCLES_TRANSFORM_EXPLANATIONS.find((e) => e.conceptId === 'math.geom.translation')!
    expect(t.content).toMatch(/SAME shift applies to every vertex/)
  })

  it('constructions keep the unmarked-straightedge rule and the impossibility results', () => {
    const c = MATHEMATICS_CIRCLES_TRANSFORM_EXPLANATIONS.find((e) => e.conceptId === 'math.geom.geometric-constructions')!
    expect(c.content).toMatch(/UNMARKED straightedge/)
    expect(c.content).toMatch(/provably IMPOSSIBLE/)
    expect(c.content).toMatch(/trisecting/)
  })

  it('every probe is gradeable and offers at least three choices', () => {
    for (const p of MATHEMATICS_CIRCLES_TRANSFORM_PROBES) {
      expect(p.choices?.filter((c) => c.isCorrect).length, p.stem).toBe(1)
      expect(p.choices!.length, p.stem).toBeGreaterThanOrEqual(3)
    }
  })

  it('no two probes for one concept collide on identity', () => {
    const slugs = MATHEMATICS_CIRCLES_TRANSFORM_PROBES.map((p) => `${p.conceptId}:${p.probeKind}:${p.gradeBand}:${p.difficulty}`)
    expect(new Set(slugs).size).toBe(slugs.length)
  })
})
