/**
 * A CORRECT TAP IS NOT MISCONCEPTION EVIDENCE.
 *
 * MEASURED (mathematics production certification, 2026-10-02, disposable QA
 * account, 12/12 concepts verified): two turns each wrote PROBE_OUTCOME `pass`
 * AND MISCONCEPTION_DETECTED, the "misconception" being the correct option the
 * learner tapped — "It is multiplied by 3 too" (math.arith.fraction-addition)
 * and "5 — 9 + 16 = 25" (math.geom.pythagorean-theorem). The server grade
 * replaced the model SIGNAL's correctness; its phrase survived, set
 * misconceptionDetectedThisLesson, and was persisted as evidence.
 *
 * These pin the predicate on the two real authored probes, its narrowness,
 * and its wiring into the grade block of the chat route.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { gradeMcqAnswer, phraseRestatesCorrectChoice, type TutorMCQ } from '@/lib/teaching/mcq'
import { probeToMcq } from '@/lib/teaching/gateAssessment'
import { MATHEMATICS_ARITH_CLOSE_PROBES } from '@/lib/teaching/assets/mathematicsArithCloseAssets'
import { MATHEMATICS_TRIANGLE_TRANSFORM_PROBES } from '@/lib/teaching/assets/mathematicsTriangleTransformAssets'

function served(probes: readonly { stem: string; choices?: { text: string; isCorrect: boolean }[]; conceptId: string }[], stem: string): TutorMCQ {
  const p = probes.find((x) => x.stem === stem)
  if (!p) throw new Error(`probe not found: ${stem}`)
  const mcq = probeToMcq({ stem: p.stem, choices: p.choices ?? null, conceptId: p.conceptId })
  if (!mcq) throw new Error(`probe not servable: ${stem}`)
  return mcq
}

describe('the two production cases', () => {
  it('math.arith.fraction-addition: the tapped correct option is not a misconception phrase', () => {
    const mcq = served(MATHEMATICS_ARITH_CLOSE_PROBES, 'Converting 1/2 into sixths, what happens to the numerator?')
    const tap = mcq.options[mcq.correctIndex]
    const grade = gradeMcqAnswer(tap, mcq)
    expect(grade.correct).toBe(true)
    expect(phraseRestatesCorrectChoice('It is multiplied by 3 too', mcq, grade)).toBe(true)
  })

  it('math.geom.pythagorean-theorem: the option with its working is not a misconception phrase', () => {
    const mcq = served(MATHEMATICS_TRIANGLE_TRANSFORM_PROBES, 'A right triangle has legs 3 and 4. What is the hypotenuse?')
    const tap = mcq.options[mcq.correctIndex]
    const grade = gradeMcqAnswer(tap, mcq)
    expect(grade.correct).toBe(true)
    expect(phraseRestatesCorrectChoice('5 — 9 + 16 = 25', mcq, grade)).toBe(true)
  })
})

describe('narrow by construction', () => {
  const mcq: TutorMCQ = {
    question: 'Converting 1/2 into sixths, what happens to the numerator?',
    options: ['It is multiplied by 3 too', 'It stays 1', 'It becomes 6'],
    correctIndex: 0,
    rationales: ['giving 3/6 — the same factor as the denominator', 'only the bottom changes', 'it copies the denominator'],
  }

  it('keeps a phrase in different words even when the answer was correct', () => {
    const grade = gradeMcqAnswer('It is multiplied by 3 too', mcq)
    expect(phraseRestatesCorrectChoice('you only change the bottom number', mcq, grade)).toBe(false)
  })

  it('keeps the phrase when the tapped option was WRONG — that is what misconception evidence is', () => {
    const grade = gradeMcqAnswer('It stays 1', mcq)
    expect(grade.correct).toBe(false)
    expect(phraseRestatesCorrectChoice('It stays 1', mcq, grade)).toBe(false)
  })

  it('keeps the phrase when nothing was graded', () => {
    expect(phraseRestatesCorrectChoice('It is multiplied by 3 too', mcq, null)).toBe(false)
    expect(phraseRestatesCorrectChoice('It is multiplied by 3 too', mcq, { chosenIndex: null, correct: null })).toBe(false)
  })

  it('no phrase, nothing to drop', () => {
    expect(phraseRestatesCorrectChoice(undefined, mcq, { chosenIndex: 0, correct: true })).toBe(false)
    expect(phraseRestatesCorrectChoice('  —  ', mcq, { chosenIndex: 0, correct: true })).toBe(false)
  })
})

describe('wiring', () => {
  it('the chat route drops the phrase inside the server-grade block, before evidence is written', () => {
    const src = readFileSync('src/app/api/learn/chat/route.ts', 'utf-8')
    const graded = src.indexOf('correctness: mcqGradedThisTurn.correct ?? undefined')
    const guard = src.indexOf('phraseRestatesCorrectChoice(teachingSignal.phrase, pendingMcqHoisted, mcqGradedThisTurn)')
    const ladder = src.indexOf('misconceptionDetected: teachingSignal?.phrase !== undefined')
    const evidence = src.indexOf('category:  EvidenceCategory.MISCONCEPTION_DETECTED')
    expect(graded).toBeGreaterThan(0)
    expect(guard).toBeGreaterThan(graded)
    expect(ladder).toBeGreaterThan(guard)
    expect(evidence).toBeGreaterThan(guard)
  })
})
