/**
 * P3 FIX — INTERNAL STAGE/INDEX LEAKAGE (PHASE 8 of residualTagSweep.ts).
 *
 * ── OBSERVED LIVE (real-student English verification, 2026-09) ─────────────
 * Learner-facing text leaked internal PLANNING vocabulary that was never
 * machine markup — no `<!--…-->`, no `[NAME…]`, no bare JSON — so the three
 * pre-existing sweeps in residualTagSweep.ts could not see it at all:
 *
 *   "Question (Stage 1 Observation): What do you notice about…"
 *   "Observation question (Stage 1): In the sentence…"
 *   "Lesson 191 of 216 – Introduction to Computational Linguistics"
 *
 * Root cause: `client.ts`'s QUESTION STAGE POLICY names its own seven-rung
 * pacing ladder, and the CURRENT LESSON block hands the model a
 * "Lesson N of M" header — both intended as planning context, neither
 * previously told NOT to be echoed. Fixed at both levels: the prompt now
 * says so explicitly (advisory), and this deterministic sweep is the
 * durable partner, on the same closed-vocabulary discipline as this file's
 * other three sweeps.
 */
import { describe, it, expect } from 'vitest'
import { stripResidualMachineTags, hasResidualMachineTag } from '@/lib/teaching/residualTagSweep'

describe('internal pacing/numbering labels are stripped, never machine markup', () => {
  it.each([
    [
      'Question (Stage 1 Observation): What do you notice about the sentence?',
      'Question: What do you notice about the sentence?',
    ],
    [
      'Observation question (Stage 1): In the sentence, what do you see?',
      'Observation question: In the sentence, what do you see?',
    ],
    [
      'Stage 1 Observation: What do you notice?',
      'What do you notice?',
    ],
    [
      'Stage 3: Which of these is correct?',
      'Which of these is correct?',
    ],
    [
      '(Stage 6) What is 12 times 8?',
      'What is 12 times 8?',
    ],
    [
      'Lesson 191 of 216 – Introduction to Computational Linguistics',
      'Introduction to Computational Linguistics',
    ],
    [
      'Welcome! Lesson 5 of 216: Prefixes. Today we will learn about prefixes.',
      'Welcome! Prefixes. Today we will learn about prefixes.',
    ],
  ])('%s -> %s', (input, expected) => {
    expect(stripResidualMachineTags(input)).toBe(expected)
  })

  it('reports the leak class via hasResidualMachineTag before stripping', () => {
    expect(hasResidualMachineTag('Question (Stage 1 Observation): What do you notice?')).toBe(true)
    expect(hasResidualMachineTag('Lesson 191 of 216: X')).toBe(true)
  })

  it('reports clean after stripping — the round trip closes', () => {
    const text = 'Question (Stage 1 Observation): What do you notice? Lesson 5 of 216.'
    const clean = stripResidualMachineTags(text)
    expect(hasResidualMachineTag(clean)).toBe(false)
  })
})

describe('negative controls — ordinary lesson prose is never touched', () => {
  it.each([
    'This concept has many real-world applications in engineering.',
    'The heat transfer application here is straightforward.',
    'We covered phase transitions in physics — solid to liquid to gas.',
    'In this lesson we will learn about photosynthesis.',
    'Let\'s calculate the recognition rate for this dataset.',
    'The identification of an unknown compound requires several tests.',
    'Stage lighting is an important part of theatre production.',
    'This is lesson three of the unit on grammar.',
  ])('%s is left byte-identical', (text) => {
    expect(stripResidualMachineTags(text)).toBe(text)
    expect(hasResidualMachineTag(text)).toBe(false)
  })
})

describe('does not interfere with the pre-existing machine-tag sweeps', () => {
  it('a comment-shaped SIGNAL tag is still stripped alongside a stage label', () => {
    const text = 'Stage 1 Observation: Great! <!--SIGNAL correctness="true"-->'
    const clean = stripResidualMachineTags(text)
    expect(clean).not.toContain('Stage 1')
    expect(clean).not.toContain('<!--')
  })

  it('the bracket sweep and the pacing-label sweep coexist cleanly', () => {
    const text = 'Lesson 5 of 216: nice work [ASSESSMENT_RESULT correctness=1]'
    const clean = stripResidualMachineTags(text)
    expect(clean).not.toContain('Lesson 5 of 216')
    expect(clean).not.toContain('[ASSESSMENT_RESULT')
  })
})

describe('total: safe on non-string and empty input', () => {
  it('passes through non-strings unchanged', () => {
    expect(stripResidualMachineTags(undefined as unknown as string)).toBeUndefined()
    expect(stripResidualMachineTags(null as unknown as string)).toBeNull()
  })

  it('handles empty string', () => {
    expect(stripResidualMachineTags('')).toBe('')
    expect(hasResidualMachineTag('')).toBe(false)
  })
})
