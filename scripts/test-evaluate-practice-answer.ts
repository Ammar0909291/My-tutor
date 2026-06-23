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

// ── Session-level output tests (untested above) ───────────────────────────────
function check(name: string, cond: boolean, extra?: string) {
  if (cond) pass++
  else fail++
  console.log(`[${cond ? '✓ pass' : '✗ FAIL'}] ${name}${extra && !cond ? `  — ${extra}` : ''}`)
}

const mcqQ = (id: string, correctIndex: number, nodeId = 'n1'): PracticeQuestion =>
  ({ id, type: 'mcq', nodeId, question: 'Q', options: ['a','b','c','d'], correctIndex, explanation: '' })
const ans = (qId: string, value: number | boolean | string): PracticeAnswer => ({ questionId: qId, value })

console.log('\n── session-level outputs ──\n')

// Zero-question session must not divide by zero
const emptyResult = evaluatePracticeSession('s0', [], [])
check('zero questions — accuracyPercent is 0 (no divide-by-zero)', emptyResult.accuracyPercent === 0)
check('zero questions — masteryStatus is needs_practice', emptyResult.masteryStatus === 'needs_practice')
check('zero questions — correctCount is 0', emptyResult.correctCount === 0)
check('zero questions — weakNodeIds is empty', emptyResult.weakNodeIds.length === 0)

// 4/4 correct → mastered (meets both MASTERY_THRESHOLD=80 and MIN_QUESTIONS_FOR_MASTERY=4)
const perfect = evaluatePracticeSession('s1',
  [mcqQ('a',0), mcqQ('b',1), mcqQ('c',2), mcqQ('d',3)],
  [ans('a',0), ans('b',1), ans('c',2), ans('d',3)])
check('4/4 correct → masteryStatus=mastered', perfect.masteryStatus === 'mastered',
  `got ${perfect.masteryStatus}`)
check('4/4 correct → accuracyPercent=100', perfect.accuracyPercent === 100)
check('4/4 correct → correctCount=4', perfect.correctCount === 4)
check('4/4 correct → weakNodeIds empty', perfect.weakNodeIds.length === 0)

// 3/3 all correct but below MIN_QUESTIONS_FOR_MASTERY=4 → NOT mastered
const shortPerfect = evaluatePracticeSession('s2',
  [mcqQ('a',0), mcqQ('b',1), mcqQ('c',2)],
  [ans('a',0), ans('b',1), ans('c',2)])
check('3/3 correct but total<4 → NOT mastered (MIN_QUESTIONS_FOR_MASTERY guard)',
  shortPerfect.masteryStatus !== 'mastered', `got ${shortPerfect.masteryStatus}`)

// 3/5 correct = 60% → good_progress
const medResult = evaluatePracticeSession('s3',
  [mcqQ('a',0,'n1'), mcqQ('b',0,'n1'), mcqQ('c',0,'n2'), mcqQ('d',0,'n2'), mcqQ('e',0,'n3')],
  [ans('a',0), ans('b',0), ans('c',0), ans('d',1), ans('e',1)])
check('3/5 correct → good_progress', medResult.masteryStatus === 'good_progress',
  `got ${medResult.masteryStatus}`)
check('3/5 correct → accuracyPercent=60', medResult.accuracyPercent === 60)

// 1/5 correct = 20% → needs_practice
const weakResult = evaluatePracticeSession('s4',
  [mcqQ('a',0,'n1'), mcqQ('b',0,'n2'), mcqQ('c',0,'n2'), mcqQ('d',0,'n3'), mcqQ('e',0,'n3')],
  [ans('a',0), ans('b',1), ans('c',1), ans('d',1), ans('e',1)])
check('1/5 correct → needs_practice', weakResult.masteryStatus === 'needs_practice',
  `got ${weakResult.masteryStatus}`)

// weakNodeIds accumulates nodeIds of every wrong or missing question (deduped)
check('wrong questions accumulate correct nodeIds in weakNodeIds',
  weakResult.weakNodeIds.length === 2 &&
  weakResult.weakNodeIds.includes('n2') &&
  weakResult.weakNodeIds.includes('n3'),
  `got ${JSON.stringify(weakResult.weakNodeIds)}`)

// 4/5 correct = 80% = exactly MASTERY_THRESHOLD, total >= MIN_QUESTIONS → mastered
const edgeResult = evaluatePracticeSession('s5',
  [mcqQ('a',0), mcqQ('b',0), mcqQ('c',0), mcqQ('d',0), mcqQ('e',0)],
  [ans('a',0), ans('b',0), ans('c',0), ans('d',0), ans('e',1)])
check('4/5 = 80% exactly at MASTERY_THRESHOLD → mastered', edgeResult.masteryStatus === 'mastered',
  `got ${edgeResult.masteryStatus}`)

console.log(`\n=== ${pass} passed, ${fail} failed (of ${CASES.length + 14}) ===\n`)
process.exit(fail === 0 ? 0 : 1)
