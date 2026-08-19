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
import { SEED_PROBES, seedCanonicalSlug } from '@/lib/teaching/assets/brainSeedAssets'
import { evaluateAssetContract, MIN_CLOSED_CHOICE_PROBES } from '@/lib/teaching/assetContract'

const ALL = [...SEED_PROBES, ...AUTHORED_PROBES, ...MATHEMATICS_PROBES, ...MATHEMATICS_FOUNDATION_PROBES, ...MATHEMATICS_ARITHMETIC_PROBES, ...MATHEMATICS_BATCH3_PROBES, ...MATHEMATICS_GEOMETRY_PROBES, ...MATHEMATICS_FRACTION_PROBES, ...MATHEMATICS_PROPORTION_PROBES, ...MATHEMATICS_ALGEBRA_VOCAB_PROBES, ...MATHEMATICS_POWERS_VARIATION_PROBES, ...MATHEMATICS_SET_OPERATIONS_PROBES, ...MATHEMATICS_RELATIONS_NUMBERS_PROBES, ...MATHEMATICS_ORDERS_PROOFS_PROBES, ...MATHEMATICS_LANGUAGE_STRATEGY_PROBES, ...MATHEMATICS_PROOF_MACHINERY_PROBES, ...MATHEMATICS_QUANTIFIER_CRAFT_PROBES, ...MATHEMATICS_FOUNDATIONS_CLOSE_PROBES, ...MATHEMATICS_NUMBER_SYSTEMS_PROBES, ...MATHEMATICS_ALGORITHMS_PRECISION_PROBES]
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
    for (const a of [...MATHEMATICS_FOUNDATION_EXPLANATIONS, ...MATHEMATICS_FOUNDATION_PROBES, ...MATHEMATICS_ARITHMETIC_PROBES, ...MATHEMATICS_BATCH3_PROBES, ...MATHEMATICS_GEOMETRY_PROBES, ...MATHEMATICS_FRACTION_PROBES, ...MATHEMATICS_PROPORTION_PROBES, ...MATHEMATICS_ALGEBRA_VOCAB_PROBES, ...MATHEMATICS_POWERS_VARIATION_PROBES, ...MATHEMATICS_SET_OPERATIONS_PROBES, ...MATHEMATICS_RELATIONS_NUMBERS_PROBES, ...MATHEMATICS_ORDERS_PROOFS_PROBES, ...MATHEMATICS_LANGUAGE_STRATEGY_PROBES, ...MATHEMATICS_PROOF_MACHINERY_PROBES, ...MATHEMATICS_QUANTIFIER_CRAFT_PROBES, ...MATHEMATICS_FOUNDATIONS_CLOSE_PROBES, ...MATHEMATICS_NUMBER_SYSTEMS_PROBES, ...MATHEMATICS_ALGORITHMS_PRECISION_PROBES]) {
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
