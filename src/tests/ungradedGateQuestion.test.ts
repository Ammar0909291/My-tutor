/**
 * The `math.found.logic` failure, replayed.
 *
 * Every "REAL TURN" below is verbatim tutor output captured from production on
 * 2026-08-18 (session cmsyuv2tw0001lb04jgzr7jqk, learner claudeTest). Each was
 * answered correctly and each recorded no evidence, because the concept holds
 * two authored closed-choice probes and mastery needs three graded answers.
 */
import { describe, it, expect } from 'vitest'
import { withholdUngradedGateQuestion } from '@/lib/teaching/gateAssessment'
import {
  evaluateAssetContract,
  canCertifyWithoutModelCompliance,
  MIN_CLOSED_CHOICE_PROBES,
} from '@/lib/teaching/assetContract'

// ── verbatim production turns ───────────────────────────────────────────────
const L9_SQUARES = `claudeTest, let's examine another conditional statement: **IF a figure is a square, THEN it is a rectangle.**

Suppose we are given a figure that is **not** a rectangle. Using valid logical deduction, what can we definitively conclude about this figure?

A) The figure is a square because squares and rectangles share four sides.
B) The figure is definitely not a square, because if it were a square, it would have to be a rectangle.
C) The figure might be a square or might not be, because the statement goes only one way.
D) The figure has five sides.`

const R3_APPLES = `claudeTest, excellent! Here is your first practice question.

In a fruit basket, there are 4 apples and 7 oranges. What is the ratio of apples to oranges?

A) 7:4
B) 4:7
C) 4:11
D) 11:4`

describe('withholdUngradedGateQuestion — the Phase B failures', () => {
  it('withholds the ungradeable PRACTICE question and keeps the teaching', () => {
    const r = withholdUngradedGateQuestion({
      text: L9_SQUARES, phase: 'PRACTICE', hasStructuredMcq: false,
    })
    expect(r.withheld).toBe(true)
    expect(r.reason).toBe('no-gradeable-probe')
    // The teaching survives...
    expect(r.text).toContain('IF a figure is a square, THEN it is a rectangle')
    // ...and nothing the learner could answer remains.
    expect(r.text).not.toContain('B) The figure is definitely not a square')
    expect(r.text).not.toMatch(/what can we definitively conclude/i)
  })

  it('withholds an ungradeable CHECK question (the ratios case)', () => {
    const r = withholdUngradedGateQuestion({
      text: R3_APPLES, phase: 'CHECK', hasStructuredMcq: false,
    })
    expect(r.withheld).toBe(true)
    expect(r.text).not.toContain('A) 7:4')
    expect(r.text).not.toMatch(/ratio of apples to oranges/i)
  })

  it('never emits an empty turn when the whole turn was the question', () => {
    const r = withholdUngradedGateQuestion({
      text: 'What is the ratio of 6 to 10?', phase: 'PRACTICE', hasStructuredMcq: false,
    })
    expect(r.withheld).toBe(true)
    expect(r.text.trim().length).toBeGreaterThan(0)
    expect(r.text).not.toMatch(/\?/)
  })
})

describe('withholdUngradedGateQuestion — what it must NOT touch', () => {
  it('leaves the turn alone when a structured MCQ IS attached', () => {
    const r = withholdUngradedGateQuestion({
      text: L9_SQUARES, phase: 'PRACTICE', hasStructuredMcq: true,
    })
    expect(r.withheld).toBe(false)
    expect(r.text).toBe(L9_SQUARES)
  })

  it('leaves GUIDE alone — it advances on a give, not on a graded answer', () => {
    const r = withholdUngradedGateQuestion({
      text: L9_SQUARES, phase: 'GUIDE', hasStructuredMcq: false,
    })
    expect(r.withheld).toBe(false)
    expect(r.text).toBe(L9_SQUARES)
  })

  it.each(['OBSERVE', 'DEMONSTRATE', 'TRANSFER'])('leaves %s alone', (phase) => {
    const r = withholdUngradedGateQuestion({ text: L9_SQUARES, phase, hasStructuredMcq: false })
    expect(r.withheld).toBe(false)
  })

  it('keeps a confirmation tail — "does that make sense?" is not a mastery question', () => {
    const text = 'A ratio compares two quantities by division.\n\nDoes that make sense so far?'
    const r = withholdUngradedGateQuestion({ text, phase: 'PRACTICE', hasStructuredMcq: false })
    expect(r.withheld).toBe(false)
    expect(r.text).toBe(text)
  })

  it('keeps a pure teaching turn untouched', () => {
    const text = 'Simplifying 6:10 to 3:5 changes the terms of the comparison, not the quantities.'
    const r = withholdUngradedGateQuestion({ text, phase: 'CHECK', hasStructuredMcq: false })
    expect(r.withheld).toBe(false)
    expect(r.text).toBe(text)
  })

  it('is idempotent — repairing an already-repaired turn changes nothing', () => {
    const once = withholdUngradedGateQuestion({
      text: L9_SQUARES, phase: 'PRACTICE', hasStructuredMcq: false,
    })
    const twice = withholdUngradedGateQuestion({
      text: once.text, phase: 'PRACTICE', hasStructuredMcq: false,
    })
    expect(twice.text).toBe(once.text)
  })

  it('never throws, whatever it is handed', () => {
    for (const bad of [null, undefined, 42, {}, []]) {
      expect(() =>
        withholdUngradedGateQuestion({
          text: bad as unknown as string, phase: 'PRACTICE', hasStructuredMcq: false,
        }),
      ).not.toThrow()
    }
  })
})

describe('asset contract — the inventory that stops this happening at all', () => {
  it('the two concepts that failed in production are BELOW contract', () => {
    // math.found.logic and math.arith.ratios each hold exactly 2 closed-choice
    // probes and 1 explanation, measured against production 2026-08-18.
    const verdict = evaluateAssetContract({ explanations: 1, closedChoiceProbes: 2 })
    expect(verdict.satisfied).toBe(false)
    expect(verdict.missingClosedChoiceProbes).toBe(1)
    expect(verdict.shortfall).toMatch(/1 closed-choice probe/)
    expect(canCertifyWithoutModelCompliance({ explanations: 1, closedChoiceProbes: 2 })).toBe(false)
  })

  it('three closed-choice probes satisfies it — the mastery bar, not a margin', () => {
    expect(MIN_CLOSED_CHOICE_PROBES).toBe(3)
    const verdict = evaluateAssetContract({ explanations: 1, closedChoiceProbes: 3 })
    expect(verdict.satisfied).toBe(true)
    expect(verdict.shortfall).toBeNull()
  })

  it('open-recall probes never substitute for closed-choice ones', () => {
    const verdict = evaluateAssetContract({
      explanations: 1, closedChoiceProbes: 2, openRecallProbes: 9,
    })
    expect(verdict.satisfied).toBe(false)
    expect(verdict.missingClosedChoiceProbes).toBe(1)
  })

  it('a corrupt reading reports a shortfall rather than certifying', () => {
    for (const bad of [-1, NaN, Infinity, undefined]) {
      expect(
        evaluateAssetContract({
          explanations: 1, closedChoiceProbes: bad as unknown as number,
        }).satisfied,
      ).toBe(false)
    }
  })
})
