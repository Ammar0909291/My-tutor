/**
 * Standalone test harness for evaluatePracticeSession / scoreOne — pure functions,
 * no DB, no network. Run with:  npx tsx scripts/test-evaluate-practice-answer.ts
 *
 * Covers MCQ/true_false exact match, short-answer keyword threshold, and the
 * zero-keywords regression: an empty keywords array (reachable from the fallback
 * template generator in generateChapterPractice.ts when topic has no words >2 chars)
 * must not make a short-answer question permanently unpassable.
 */

import { evaluatePracticeSession } from '../src/lib/school/practice/evaluatePracticeAnswer'
import type { PracticeQuestion, PracticeAnswer } from '../src/lib/school/practice/practiceTypes'

type Case = {
  name: string
  question: PracticeQuestion
  answer: PracticeAnswer
  expectCorrect: boolean
}

const CASES: Case[] = [
  {
    name: 'mcq correct',
    question: { id: 'q1', type: 'mcq', nodeId: 'n1', question: 'Q', options: ['a', 'b', 'c', 'd'], correctIndex: 1, explanation: '' },
    answer: { questionId: 'q1', value: 1 },
    expectCorrect: true,
  },
  {
    name: 'mcq incorrect',
    question: { id: 'q1', type: 'mcq', nodeId: 'n1', question: 'Q', options: ['a', 'b', 'c', 'd'], correctIndex: 1, explanation: '' },
    answer: { questionId: 'q1', value: 0 },
    expectCorrect: false,
  },
  {
    name: 'true_false correct',
    question: { id: 'q2', type: 'true_false', nodeId: 'n1', question: 'Q', correct: true, explanation: '' },
    answer: { questionId: 'q2', value: true },
    expectCorrect: true,
  },
  {
    name: 'short_answer with keywords — meets threshold and length',
    question: { id: 'q3', type: 'short_answer', nodeId: 'n1', question: 'Q', sampleAnswer: '', keywords: ['photosynthesis', 'sunlight', 'glucose', 'oxygen'] },
    answer: { questionId: 'q3', value: 'Photosynthesis uses sunlight to make glucose.' },
    expectCorrect: true,
  },
  {
    name: 'short_answer with keywords — below threshold',
    question: { id: 'q3', type: 'short_answer', nodeId: 'n1', question: 'Q', sampleAnswer: '', keywords: ['photosynthesis', 'sunlight', 'glucose', 'oxygen'] },
    answer: { questionId: 'q3', value: 'Plants are green and nice.' },
    expectCorrect: false,
  },
  {
    name: 'short_answer with keywords — too short even with hits',
    question: { id: 'q3', type: 'short_answer', nodeId: 'n1', question: 'Q', sampleAnswer: '', keywords: ['sun'] },
    answer: { questionId: 'q3', value: 'sun' },
    expectCorrect: false,
  },
  {
    name: 'REGRESSION — empty keywords array, substantive answer now passes',
    question: { id: 'q5', type: 'short_answer', nodeId: 'n1', question: 'Q', sampleAnswer: '', keywords: [] },
    answer: { questionId: 'q5', value: 'This chapter covers the main topic in good detail.' },
    expectCorrect: true,
  },
  {
    name: 'REGRESSION — empty keywords array, answer too short still fails',
    question: { id: 'q5', type: 'short_answer', nodeId: 'n1', question: 'Q', sampleAnswer: '', keywords: [] },
    answer: { questionId: 'q5', value: 'short' },
    expectCorrect: false,
  },
  {
    name: 'unanswered question counts as incorrect, no throw',
    question: { id: 'q6', type: 'mcq', nodeId: 'n1', question: 'Q', options: ['a', 'b', 'c', 'd'], correctIndex: 0, explanation: '' },
    answer: { questionId: 'NOT_THIS_ONE', value: 0 },
    expectCorrect: false,
  },
]

let pass = 0
let fail = 0

console.log('\n=== evaluatePracticeAnswer harness ===\n')

for (const c of CASES) {
  const result = evaluatePracticeSession('s1', [c.question], [c.answer])
  const review = result.review.find((r) => r.questionId === c.question.id)
  const got = review?.isCorrect ?? false
  const ok = got === c.expectCorrect

  if (ok) pass++
  else fail++

  console.log(`[${ok ? '✓ pass' : '✗ FAIL'}] ${c.name}`)
  console.log(`  expected: isCorrect=${c.expectCorrect}`)
  console.log(`  got:      isCorrect=${got}`)
  console.log('')
}

console.log(`=== ${pass} passed, ${fail} failed (of ${CASES.length}) ===\n`)
process.exit(fail === 0 ? 0 : 1)
