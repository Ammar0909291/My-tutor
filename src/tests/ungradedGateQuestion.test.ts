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
import { askedAnswerableQuestion } from '@/lib/teaching/answerableTurn'
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

  it('leaves GUIDE alone when the gate never went looking for a probe this turn (TEACH move)', () => {
    const r = withholdUngradedGateQuestion({
      text: L9_SQUARES, phase: 'GUIDE', hasStructuredMcq: false,
    })
    expect(r.withheld).toBe(false)
    expect(r.text).toBe(L9_SQUARES)
  })

  it('leaves GUIDE alone even with gateSoughtThisTurn explicitly false', () => {
    const r = withholdUngradedGateQuestion({
      text: L9_SQUARES, phase: 'GUIDE', hasStructuredMcq: false, gateSoughtThisTurn: false,
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

describe('withholdUngradedGateQuestion — GUIDE, when the gate sought a probe (the chemistry root cause)', () => {
  // Reproduces the actual production mechanism: `evidenceMoveHoisted === 'ask'`
  // at GUIDE made the gate look for an authored probe (`phaseAllowsProbe`
  // true), none converted (`gateMcqHoisted` stayed null — pool exhaustion or
  // no authored probe), and the model wrote its own ungradeable prose
  // question. GUIDE→CHECK then advanced off that turn's self-reported
  // SIGNAL, with zero withholding, because the guard's old phase check never
  // looked at GUIDE at all.
  it('withholds an ungradeable GUIDE question when the gate sought a probe this turn', () => {
    const r = withholdUngradedGateQuestion({
      text: R3_APPLES, phase: 'GUIDE', hasStructuredMcq: false, gateSoughtThisTurn: true,
    })
    expect(r.withheld).toBe(true)
    expect(r.reason).toBe('no-gradeable-probe')
    expect(r.text).not.toContain('A) 7:4')
    expect(r.text).not.toMatch(/ratio of apples to oranges/i)
  })

  it('also catches a stray question alongside a GUIDE-attached MCQ', () => {
    const attached = 'Which of the following best describes matter?'
    const strayTurn = `Nice work so far.\n\n**Quick check:** How would you describe what happens when ice melts into water?`
    const r = withholdUngradedGateQuestion({
      text: strayTurn,
      phase: 'GUIDE',
      hasStructuredMcq: true,
      attachedMcqQuestion: attached,
      gateSoughtThisTurn: true,
    })
    expect(r.withheld).toBe(true)
    expect(r.reason).toBe('stray-question-alongside-mcq')
  })

  it('leaves a confirmation tail alone at GUIDE even when the gate sought a probe', () => {
    const text = 'A ratio compares two quantities by division.\n\nDoes that make sense so far?'
    const r = withholdUngradedGateQuestion({
      text, phase: 'GUIDE', hasStructuredMcq: false, gateSoughtThisTurn: true,
    })
    expect(r.withheld).toBe(false)
    expect(r.text).toBe(text)
  })
})

describe('withholdUngradedGateQuestion — a stray question alongside an attached MCQ', () => {
  // Verbatim shape of the chemistry CHECK-phase turn from the 2026-08-21
  // certification sweep (`chem.found.matter`): an authored MCQ WAS attached
  // this turn, and the model asked its OWN separate open-ended question
  // anyway, in violation of `buildGateAssessmentBlock`'s "do NOT ask any
  // other question" instruction.
  const ATTACHED_MCQ_QUESTION =
    'Which of the following best describes matter?'
  const STRAY_QUESTION_TURN = `Great, let's build on that.

**Question (Stage 2 – Recognition):** Have you ever seen a situation where two everyday materials can be pulled apart with a magnet, but after heating they become a single solid that no longer responds to the magnet?`

  it('strips a genuinely different question the model asked alongside the attached MCQ', () => {
    const r = withholdUngradedGateQuestion({
      text: STRAY_QUESTION_TURN,
      phase: 'CHECK',
      hasStructuredMcq: true,
      attachedMcqQuestion: ATTACHED_MCQ_QUESTION,
    })
    expect(r.withheld).toBe(true)
    expect(r.reason).toBe('stray-question-alongside-mcq')
    expect(r.text).toContain("Great, let's build on that.")
    expect(r.text).not.toMatch(/Have you ever seen a situation/i)
    expect(r.text).not.toMatch(/\?/)
  })

  it('leaves the turn alone when the prose merely restates the attached MCQ', () => {
    const text = `Here's your question.\n\n${ATTACHED_MCQ_QUESTION}\n\nA) Foo\nB) Bar`
    const r = withholdUngradedGateQuestion({
      text, phase: 'CHECK', hasStructuredMcq: true, attachedMcqQuestion: ATTACHED_MCQ_QUESTION,
    })
    expect(r.withheld).toBe(false)
    expect(r.text).toBe(text)
  })

  it('is backward-compatible: omitting attachedMcqQuestion reproduces the prior no-op', () => {
    const r = withholdUngradedGateQuestion({
      text: STRAY_QUESTION_TURN, phase: 'CHECK', hasStructuredMcq: true,
    })
    expect(r.withheld).toBe(false)
    expect(r.text).toBe(STRAY_QUESTION_TURN)
  })

  it('leaves a pure lead-in (no stray question) alone even with an MCQ attached', () => {
    const text = "Let's check one thing about the states of matter before we go further."
    const r = withholdUngradedGateQuestion({
      text, phase: 'CHECK', hasStructuredMcq: true, attachedMcqQuestion: ATTACHED_MCQ_QUESTION,
    })
    expect(r.withheld).toBe(false)
    expect(r.text).toBe(text)
  })
})

describe('askedAnswerableQuestion / withholdUngradedGateQuestion — self-answered rhetorical "why" (chem.thermo.third-law)', () => {
  // `chem.thermo.third-law` FAILED a chemistry certification sweep with
  // `D2-ungradeable` (2026-08-21) on a turn whose only "question" was a
  // rhetorical one the tutor answered itself in the very next sentence — the
  // same shape a human lecturer uses ("Why is that? Because …"). No MCQ was
  // attached, phase was CHECK both turns, and the served text was reported
  // unchanged, containing the "Why is that?" verbatim.
  const TRAILING = `The Third Law of Thermodynamics states that as a system approaches absolute zero, its entropy approaches a well-defined minimum.

Why is that? Because at absolute zero a perfect crystal has only one possible microstate, so its entropy is exactly zero.`

  const MID_TEXT = `The Third Law of Thermodynamics states that as a system approaches absolute zero, its entropy approaches a well-defined minimum.

Why is that? Because at absolute zero a perfect crystal has only one possible microstate, so its entropy is exactly zero.

This has major implications: it means absolute zero can never actually be reached in a finite number of steps.`

  it('askedAnswerableQuestion does not flag a self-answered rhetorical "why...because"', () => {
    expect(askedAnswerableQuestion(TRAILING)).toBe(false)
    expect(askedAnswerableQuestion(MID_TEXT)).toBe(false)
  })

  it('a genuine "why" question with no self-answer is still flagged', () => {
    expect(askedAnswerableQuestion(
      'Ice floats on water because ice is less dense than liquid water.\n\n'
      + 'Why do you think a metal ring expands when heated?',
    )).toBe(true)
    expect(askedAnswerableQuestion('Why does the sky appear blue during the day?')).toBe(true)
  })

  it('does not withhold — and does not lose the trailing self-answered explanation — at CHECK', () => {
    // Before this fix, the rhetorical pair being the TRAILING paragraph made
    // `dropTrailingQuestion` pop the entire paragraph, deleting the actual
    // physics answer along with the question that answered it in the same
    // breath — a genuine content-loss defect, not a benign no-op.
    const r = withholdUngradedGateQuestion({ text: TRAILING, phase: 'CHECK', hasStructuredMcq: false })
    expect(r.withheld).toBe(false)
    expect(r.reason).toBe('ok')
    expect(r.text).toBe(TRAILING)
  })

  it('does not withhold — reason "ok", not a mislabeled unchanged "withheld" — when the rhetorical pair is mid-turn', () => {
    // Reproduces the production shape exactly: before this fix, `poses` was
    // true (full-text scan) but `dropTrailingQuestion` is tail-anchored and
    // this content is not trailing, so the text came back byte-identical
    // while still reporting `withheld: true` — this is the confirmed root
    // cause of the reported production failure.
    const r = withholdUngradedGateQuestion({ text: MID_TEXT, phase: 'CHECK', hasStructuredMcq: false })
    expect(r.withheld).toBe(false)
    expect(r.reason).toBe('ok')
    expect(r.text).toBe(MID_TEXT)
  })

  it('still withholds when a genuinely ungradeable, non-rhetorical question follows the same shape', () => {
    const text = 'Absolute zero is the theoretical minimum temperature.\n\n'
      + 'Why do you think no real system can ever fully reach it?'
    const r = withholdUngradedGateQuestion({ text, phase: 'CHECK', hasStructuredMcq: false })
    expect(r.withheld).toBe(true)
    expect(r.reason).toBe('no-gradeable-probe')
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
