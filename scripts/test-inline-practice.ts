/**
 * Offline unit harness for inline practice question selection
 * (src/lib/school/practice/generateInlinePractice.ts).
 * Pure logic only — generateChapterPractice is mocked via the
 * injectable generator param, and PracticeSession lookups are mocked
 * via a fake prisma object. No real AI call or DB needed.
 *
 * Run with:  npx tsx scripts/test-inline-practice.ts
 */
import { generateInlinePractice, parseInlinePracticeTag } from '../src/lib/school/practice/generateInlinePractice'
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

// Mock Prisma: practiceSession.findFirst returns `session` regardless of
// the where-clause it's called with — the where-clause shape itself is
// exercised by tsc (the real PracticeSession model), not re-verified here.
function mockPrisma(session: { questions: unknown } | null) {
  return {
    practiceSession: {
      findFirst: async (_args: unknown) => session,
    },
  } as any
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
    const result = await generateInlinePractice('cbse', 'science', 'Science', 8, chapterStub, undefined, undefined, mockGenerator([]))
    check('empty question list → null', result === null)
  }

  // ── Only non-MCQ questions → null (no usable inline question) ──────────
  {
    const result = await generateInlinePractice('cbse', 'science', 'Science', 8, chapterStub, undefined, undefined, mockGenerator([trueFalse, shortAnswer]))
    check('no MCQ present → null', result === null)
  }

  // ── Single MCQ → returned with correct fields ───────────────────────────
  {
    const result = await generateInlinePractice('cbse', 'science', 'Science', 8, chapterStub, undefined, undefined, mockGenerator([mcq1]))
    check('single MCQ → question text passed through', result?.question === 'What is 2 + 2?')
    check('single MCQ → options passed through unchanged', JSON.stringify(result?.options) === JSON.stringify(['3', '4', '5', '6']))
    check('single MCQ → answer resolved from correctIndex 1', result?.answer === '4')
  }

  // ── Multiple MCQs → picks the FIRST one, not the last ───────────────────
  {
    const result = await generateInlinePractice('cbse', 'science', 'Science', 8, chapterStub, undefined, undefined, mockGenerator([mcq1, mcq2]))
    check('multiple MCQs → picks the first MCQ', result?.question === 'What is 2 + 2?')
  }

  // ── Mixed array → skips leading non-MCQ types, finds the MCQ ────────────
  {
    const result = await generateInlinePractice('cbse', 'science', 'Science', 8, chapterStub, undefined, undefined, mockGenerator([trueFalse, shortAnswer, mcq2]))
    check('mixed array → finds MCQ after non-MCQ entries', result?.question === 'What is the capital of France?')
    check('mixed array → answer resolved from correctIndex 2', result?.answer === 'Paris')
  }

  // ── correctIndex 0 resolves to the first option ─────────────────────────
  {
    const zeroIndexMCQ: MCQQuestion = { ...mcq1, correctIndex: 0 }
    const result = await generateInlinePractice('cbse', 'science', 'Science', 8, chapterStub, undefined, undefined, mockGenerator([zeroIndexMCQ]))
    check('correctIndex 0 → resolves to first option', result?.answer === '3')
  }

  // ── correctIndex 3 (last option) resolves correctly ─────────────────────
  {
    const lastIndexMCQ: MCQQuestion = { ...mcq1, correctIndex: 3 }
    const result = await generateInlinePractice('cbse', 'science', 'Science', 8, chapterStub, undefined, undefined, mockGenerator([lastIndexMCQ]))
    check('correctIndex 3 → resolves to last option', result?.answer === '6')
  }

  // ── Generator rejecting/throwing propagates (caller's job to .catch) ────
  {
    let threw = false
    try {
      await generateInlinePractice('cbse', 'science', 'Science', 8, chapterStub, undefined, undefined, async () => { throw new Error('AI failure') })
    } catch {
      threw = true
    }
    check('generator throwing propagates to caller', threw === true)
  }

  // ── CACHE: no userId/prisma supplied → AI generator path used directly ──
  {
    const generatorCalls: number[] = []
    const gen = async (..._args: any[]) => { generatorCalls.push(1); return [mcq1] }
    const result = await generateInlinePractice('cbse', 'science', 'Science', 8, chapterStub, undefined, undefined, gen)
    check('no userId/prisma → skips cache, calls generator', generatorCalls.length > 0 && result?.question === 'What is 2 + 2?')
  }

  // ── CACHE HIT: recent PracticeSession with an MCQ → no AI call ──────────
  {
    const generatorCalls: number[] = []
    const gen = async (..._args: any[]) => { generatorCalls.push(1); return [mcq2] }
    const prisma = mockPrisma({ questions: [trueFalse, mcq1] })
    const result = await generateInlinePractice('cbse', 'science', 'Science', 8, chapterStub, 'user-1', prisma, gen)
    check('cache hit → does not call the AI generator', generatorCalls.length === 0)
    check('cache hit → returns the MCQ from the cached session', result?.question === 'What is 2 + 2?')
  }

  // ── CACHE MISS: no session found → falls through to AI generation ───────
  {
    const generatorCalls: number[] = []
    const gen = async (..._args: any[]) => { generatorCalls.push(1); return [mcq2] }
    const prisma = mockPrisma(null)
    const result = await generateInlinePractice('cbse', 'science', 'Science', 8, chapterStub, 'user-1', prisma, gen)
    check('cache miss (no session) → calls the AI generator', generatorCalls.length > 0)
    check('cache miss → returns the freshly generated MCQ', result?.question === 'What is the capital of France?')
  }

  // ── CACHE present but with no usable MCQ → falls through to AI ──────────
  {
    const generatorCalls: number[] = []
    const gen = async (..._args: any[]) => { generatorCalls.push(1); return [mcq2] }
    const prisma = mockPrisma({ questions: [trueFalse, shortAnswer] })
    const result = await generateInlinePractice('cbse', 'science', 'Science', 8, chapterStub, 'user-1', prisma, gen)
    check('cached session has no MCQ → falls through to AI generator', generatorCalls.length > 0)
    check('fallback after non-MCQ cache → returns the AI-generated MCQ', result?.question === 'What is the capital of France?')
  }

  // ── CACHE lookup itself throwing (DB hiccup) is swallowed → falls to AI ──
  {
    const generatorCalls: number[] = []
    const gen = async (..._args: any[]) => { generatorCalls.push(1); return [mcq1] }
    const throwingPrisma = { practiceSession: { findFirst: async () => { throw new Error('DB down') } } } as any
    const result = await generateInlinePractice('cbse', 'science', 'Science', 8, chapterStub, 'user-1', throwingPrisma, gen)
    check('cache lookup throwing → non-fatal, falls through to AI generator', generatorCalls.length > 0 && result?.question === 'What is 2 + 2?')
  }

  // ── parseInlinePracticeTag (Sprint W gap fix) — strips the control tag ──
  check('tag at end of text, on its own line → stripped, text trimmed',
    parseInlinePracticeTag('Great work! Try this next.\n[INLINE_PRACTICE]') === 'Great work! Try this next.')
  check('tag inline mid-sentence → stripped, surrounding text kept',
    parseInlinePracticeTag('Before [INLINE_PRACTICE] after') === 'Before  after')
  check('tag is case-insensitive',
    parseInlinePracticeTag('Done. [inline_practice]') === 'Done.')
  check('multiple occurrences → all stripped',
    parseInlinePracticeTag('[INLINE_PRACTICE] middle [INLINE_PRACTICE]') === 'middle')
  check('no tag present → text returned unchanged (just trimmed)',
    parseInlinePracticeTag('  Nothing to strip here.  ') === 'Nothing to strip here.')
  check('empty string → empty string',
    parseInlinePracticeTag('') === '')

  console.log(`\n=== ${passed} passed, ${failed} failed ===`)
  process.exit(failed ? 1 : 0)
}

run()
