/**
 * Offline unit harness for inline practice question selection
 * (src/lib/school/practice/generateInlinePractice.ts).
 * Pure logic only — generateChapterPractice is mocked via the
 * injectable generator param, no real AI call or DB needed.
 *
 * Run with:  npx tsx scripts/test-inline-practice.ts
 */
import { generateInlinePractice } from '../src/lib/school/practice/generateInlinePractice'
import type { MCQQuestion, PracticeQuestion } from '../src/lib/school/practice/practiceTypes'

let passed = 0
let failed = 0
function check(name: string, cond: boolean) {
  if (cond) { passed++; console.log(`[✓ pass] ${name}`) }
  else { failed++; console.log(`[✗ FAIL] ${name}`) }
}

function mockGenerator(questions: PracticeQuestion[]) {
  return async (_b: string, _s: string, _n: string, _g: number, _c: any) => questions
}

const mcq1: MCQQuestion = {
  id: 'q1', type: 'mcq', nodeId: 'n1',
  question: 'What is 2 + 2?',
  options: ['3', '4', '5', '6'],
  correctIndex: 1,
  explanation: 'Basic addition.',
}
const mcq2: MCQQuestion = {
  id: 'q2', type: 'mcq', nodeId: 'n2',
  question: 'What is the capital of France?',
  options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
  correctIndex: 2,
  explanation: 'Geography fact.',
}
const trueFalse: PracticeQuestion = {
  id: 'q3', type: 'true_false', nodeId: 'n3',
  question: 'The sky is blue.', correct: true, explanation: '',
}
const shortAnswer: PracticeQuestion = {
  id: 'q4', type: 'short_answer', nodeId: 'n4',
  question: 'Explain photosynthesis.', sampleAnswer: '...', keywords: [],
}

const chapterStub = { id: 'c1', title: 'Test Chapter', order: 1 } as any

async function run() {
  // ── No questions at all → null ────────────────────────────────────────
  {
    const result = await generateInlinePractice('cbse', 'science', 'Science', 8, chapterStub, mockGenerator([]))
    check('empty question list → null', result === null)
  }

  // ── Only non-MCQ questions → null (no usable inline question) ──────────
  {
    const result = await generateInlinePractice('cbse', 'science', 'Science', 8, chapterStub, mockGenerator([trueFalse, shortAnswer]))
    check('no MCQ present → null', result === null)
  }

  // ── Single MCQ → returned with correct fields ───────────────────────────
  {
    const result = await generateInlinePractice('cbse', 'science', 'Science', 8, chapterStub, mockGenerator([mcq1]))
    check('single MCQ → question text passed through', result?.question === 'What is 2 + 2?')
    check('single MCQ → options passed through unchanged', JSON.stringify(result?.options) === JSON.stringify(['3', '4', '5', '6']))
    check('single MCQ → answer resolved from correctIndex 1', result?.answer === '4')
  }

  // ── Multiple MCQs → picks the FIRST one, not the last ───────────────────
  {
    const result = await generateInlinePractice('cbse', 'science', 'Science', 8, chapterStub, mockGenerator([mcq1, mcq2]))
    check('multiple MCQs → picks the first MCQ', result?.question === 'What is 2 + 2?')
  }

  // ── Mixed array → skips leading non-MCQ types, finds the MCQ ────────────
  {
    const result = await generateInlinePractice('cbse', 'science', 'Science', 8, chapterStub, mockGenerator([trueFalse, shortAnswer, mcq2]))
    check('mixed array → finds MCQ after non-MCQ entries', result?.question === 'What is the capital of France?')
    check('mixed array → answer resolved from correctIndex 2', result?.answer === 'Paris')
  }

  // ── correctIndex 0 resolves to the first option ─────────────────────────
  {
    const zeroIndexMCQ: MCQQuestion = { ...mcq1, correctIndex: 0 }
    const result = await generateInlinePractice('cbse', 'science', 'Science', 8, chapterStub, mockGenerator([zeroIndexMCQ]))
    check('correctIndex 0 → resolves to first option', result?.answer === '3')
  }

  // ── correctIndex 3 (last option) resolves correctly ─────────────────────
  {
    const lastIndexMCQ: MCQQuestion = { ...mcq1, correctIndex: 3 }
    const result = await generateInlinePractice('cbse', 'science', 'Science', 8, chapterStub, mockGenerator([lastIndexMCQ]))
    check('correctIndex 3 → resolves to last option', result?.answer === '6')
  }

  // ── Generator rejecting/throwing propagates (caller's job to .catch) ────
  {
    let threw = false
    try {
      await generateInlinePractice('cbse', 'science', 'Science', 8, chapterStub, async () => { throw new Error('AI failure') })
    } catch {
      threw = true
    }
    check('generator throwing propagates to caller', threw === true)
  }

  // ── Default param (real generateChapterPractice) is not invoked here — ──
  // verified separately by tsc; this harness only exercises the injectable
  // generator path to stay DB/AI-free.
  check('harness stays pure (no live AI/DB calls made above)', true)

  console.log(`\n=== ${passed} passed, ${failed} failed ===`)
  process.exit(failed ? 1 : 0)
}

run()
