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
import { SEED_PROBES, seedCanonicalSlug } from '@/lib/teaching/assets/brainSeedAssets'
import { evaluateAssetContract, MIN_CLOSED_CHOICE_PROBES } from '@/lib/teaching/assetContract'

const ALL = [...SEED_PROBES, ...AUTHORED_PROBES, ...MATHEMATICS_PROBES]
const isClosedChoice = (p: { choices?: unknown[] }) => (p.choices?.length ?? 0) >= 2

/** Concepts this batch was written to bring up to contract. */
const COVERED = [
  'math.arith.addition', 'math.arith.subtraction', 'math.arith.multiplication',
  'math.arith.division', 'math.arith.fractions', 'math.arith.fraction-equivalence',
  'math.arith.fraction-multiplication', 'math.arith.order-of-operations',
  'math.arith.ratios', 'math.arith.exponentiation',
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
