/**
 * Offline unit harness for src/lib/school/exams/mockTestEngine.ts's pure
 * grading/validation logic: validateQuestion (exported as part of this
 * task — zero behavior change), evaluateMockTest, buildMockTestInsightsBlock.
 * No DB, no LLM — these operate on plain question/answer arrays.
 *
 * Run with:  npx tsx scripts/test-mock-test-engine.ts
 */
import { validateQuestion, evaluateMockTest, buildMockTestInsightsBlock } from '../src/lib/school/exams/mockTestEngine'
import type { PracticeQuestion, PracticeAnswer } from '../src/lib/school/practice/practiceTypes'
import type { Chapter } from '../src/lib/education'

let passed = 0
let failed = 0
function check(name: string, cond: boolean) {
  if (cond) { passed++; console.log(`[✓ pass] ${name}`) }
  else { failed++; console.log(`[✗ FAIL] ${name}`) }
}

// ── validateQuestion: well-formed AI output ──────────────────────────────
{
  const q = validateQuestion(
    { id: 'q1', type: 'mcq', nodeId: 'n1', question: 'What is 2+2?', options: ['3', '4', '5', '6'], correctIndex: 1, explanation: 'Basic addition' },
    ['n1', 'n2'],
  )
  check('valid MCQ parses correctly', q?.type === 'mcq' && (q as any).options.length === 4)
}

check('MCQ with the wrong option count is rejected',
  validateQuestion({ id: 'q1', type: 'mcq', nodeId: 'n1', question: 'Q?', options: ['a', 'b', 'c'], correctIndex: 0 }, ['n1']) === null)

{
  const q = validateQuestion({ id: 'q2', type: 'true_false', nodeId: 'n1', question: 'Is the sky blue?', correct: true, explanation: 'Yes' }, ['n1'])
  check('valid true_false parses correctly', q?.type === 'true_false')
}

check('true_false with correct omitted defaults to true (per obj.correct !== false)',
  (validateQuestion({ id: 'q2', type: 'true_false', nodeId: 'n1', question: 'Q?' }, ['n1']) as any)?.correct === true)

{
  const q = validateQuestion({ id: 'q3', type: 'short_answer', nodeId: 'n1', question: 'Explain photosynthesis', sampleAnswer: 'Plants convert light to energy', keywords: ['light', 'energy'] }, ['n1'])
  check('valid short_answer parses correctly', q?.type === 'short_answer')
}

check('an unrecognized question type is rejected', validateQuestion({ id: 'q4', type: 'essay', nodeId: 'n1', question: 'Q?' }, ['n1']) === null)
check('missing id is rejected', validateQuestion({ type: 'mcq', nodeId: 'n1', question: 'Q?', options: ['a', 'b', 'c', 'd'] }, ['n1']) === null)
check('missing question text is rejected', validateQuestion({ id: 'q1', type: 'mcq', nodeId: 'n1', options: ['a', 'b', 'c', 'd'] }, ['n1']) === null)
check('a non-object input is rejected, no throw', validateQuestion('not an object', ['n1']) === null)
check('null input is rejected, no throw', validateQuestion(null, ['n1']) === null)

check('a nodeId not in the allowed list falls back to the first allowed nodeId',
  (validateQuestion({ id: 'q1', type: 'mcq', nodeId: 'bogus', question: 'Q?', options: ['a', 'b', 'c', 'd'], correctIndex: 0 }, ['n1', 'n2']) as any)?.nodeId === 'n1')

// ── evaluateMockTest: strong/weak topic classification + chapter breakdown ──
function mcq(id: string, nodeId: string, correctIndex: number): PracticeQuestion {
  return { id, type: 'mcq', nodeId, question: 'Q', options: ['a', 'b', 'c', 'd'], correctIndex, explanation: '' }
}

{
  const questions: PracticeQuestion[] = [
    mcq('q1', 'topicA', 0), mcq('q2', 'topicA', 0), mcq('q3', 'topicA', 0), mcq('q4', 'topicA', 0), // all correct → strong
    mcq('q5', 'topicB', 0), mcq('q6', 'topicB', 0), // both wrong → weak
  ]
  const answers: PracticeAnswer[] = [
    { questionId: 'q1', value: 0 }, { questionId: 'q2', value: 0 }, { questionId: 'q3', value: 0 }, { questionId: 'q4', value: 0 },
    { questionId: 'q5', value: 1 }, { questionId: 'q6', value: 1 },
  ]
  const chapters: Chapter[] = [
    { id: 'ch1', order: 1, title: 'Chapter A', kgNodeIds: ['topicA'] },
    { id: 'ch2', order: 2, title: 'Chapter B', kgNodeIds: ['topicB'] },
  ]
  const result = evaluateMockTest('sess1', questions, answers, chapters, new Date(Date.now() - 60_000))

  check('a topic answered 100% correct is classified strong', result.strongTopicIds.includes('topicA'))
  check('a topic answered 0% correct is classified weak', result.weakTopicIds.includes('topicB'))
  check('overall score reflects 4/6 correct', result.score === Math.round((4 / 6) * 100))
  check('chapter breakdown reports per-chapter correctness', result.chapterBreakdown.find((b) => b.chapterId === 'ch1')?.correct === 4)
  check('timeTakenSeconds is computed from startedAt', result.timeTakenSeconds >= 59 && result.timeTakenSeconds <= 61)
}

{
  // A topic at exactly 60% (3/5) is neither strong (>=75%) nor weak (<50%)
  const questions: PracticeQuestion[] = [mcq('q1', 'topicC', 0), mcq('q2', 'topicC', 0), mcq('q3', 'topicC', 0), mcq('q4', 'topicC', 0), mcq('q5', 'topicC', 0)]
  const answers: PracticeAnswer[] = [
    { questionId: 'q1', value: 0 }, { questionId: 'q2', value: 0 }, { questionId: 'q3', value: 0 },
    { questionId: 'q4', value: 1 }, { questionId: 'q5', value: 1 },
  ]
  const result = evaluateMockTest('sess2', questions, answers, [], new Date())
  check('a mid-range topic (60% correct) is neither strong nor weak',
    !result.strongTopicIds.includes('topicC') && !result.weakTopicIds.includes('topicC'))
}

// ── buildMockTestInsightsBlock ───────────────────────────────────────────
check('no strong or weak topics → empty block (nothing to say)',
  buildMockTestInsightsBlock('Mathematics', 80, [], []) === '')

{
  const block = buildMockTestInsightsBlock('Mathematics', 72, ['Algebra', 'Geometry'], ['Trigonometry'])
  check('block includes the subject label and score', block.includes('Mathematics') && block.includes('72%'))
  check('block lists strong topics', block.includes('Strong: Algebra, Geometry'))
  check('block lists weak topics', block.includes('Weak: Trigonometry'))
  check('block instructs the tutor not to re-teach strong topics from scratch', block.includes('Do not re-teach'))
}

console.log(`\n=== ${passed} passed, ${failed} failed ===\n`)
process.exit(failed === 0 ? 0 : 1)
