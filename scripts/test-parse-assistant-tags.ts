/**
 * Offline unit harness for the assistant-text control-tag parsers
 * (src/lib/school/tutoring/parseAssistantTags.ts). Pure functions, no
 * React/fetch/DOM — extracted from LessonScreen.tsx's sendMessage (Sprint W
 * gap D follow-up: this logic drove mastery scoring and lesson-progress
 * advancement with zero prior test coverage).
 *
 * Run with:  npx tsx scripts/test-parse-assistant-tags.ts
 */
import { parseLessonCompletionTag, parseMathCodeAnswerTags, parseAssessmentResultTag } from '../src/lib/school/tutoring/parseAssistantTags'

let passed = 0
let failed = 0
function check(name: string, cond: boolean) {
  if (cond) { passed++; console.log(`[✓ pass] ${name}`) }
  else { failed++; console.log(`[✗ FAIL] ${name}`) }
}

// ── parseLessonCompletionTag ────────────────────────────────────────────
{
  const r = parseLessonCompletionTag('Great job today! [LESSON_COMPLETE]')
  check('tag present at end → hasCompletion true', r.hasCompletion === true)
  check('tag present at end → stripped and trimmed', r.cleanText === 'Great job today!')
}
{
  const r = parseLessonCompletionTag('[lesson_complete] Onward to the next one.')
  check('tag matching is case-insensitive', r.hasCompletion === true)
  check('case-insensitive tag stripped, leading space trimmed', r.cleanText === 'Onward to the next one.')
}
{
  const r = parseLessonCompletionTag('Let\'s talk about what makes a lesson complete.')
  check('ordinary prose mentioning "lesson complete" → NOT a false positive', r.hasCompletion === false)
  check('no tag present → text unchanged', r.cleanText === 'Let\'s talk about what makes a lesson complete.')
}
{
  const r = parseLessonCompletionTag('')
  check('empty string → hasCompletion false', r.hasCompletion === false)
  check('empty string → cleanText empty', r.cleanText === '')
}

// ── parseMathCodeAnswerTags ──────────────────────────────────────────────
{
  const r = parseMathCodeAnswerTags('Nice work. [MATH_ANSWER expected=4 got=4]')
  check('single MATH_ANSWER tag → one mathCheck extracted', r.mathChecks.length === 1)
  check('MATH_ANSWER expected/got parsed as numbers', r.mathChecks[0].expected === 4 && r.mathChecks[0].got === 4)
  check('MATH_ANSWER tag stripped from cleanText', r.cleanText === 'Nice work.')
  check('no CODE_ANSWER present → codeChecks empty', r.codeChecks.length === 0)
}
{
  const r = parseMathCodeAnswerTags('[MATH_ANSWER expected=-3.5 got=-3.5]')
  check('negative decimal values parsed correctly', r.mathChecks[0].expected === -3.5 && r.mathChecks[0].got === -3.5)
}
{
  const r = parseMathCodeAnswerTags('Run the code. [CODE_ANSWER expected="42" got="41"]')
  check('single CODE_ANSWER tag → one codeCheck extracted', r.codeChecks.length === 1)
  check('CODE_ANSWER expected/got parsed as strings', r.codeChecks[0].expected === '42' && r.codeChecks[0].got === '41')
  check('CODE_ANSWER tag stripped from cleanText', r.cleanText === 'Run the code.')
}
{
  const r = parseMathCodeAnswerTags('[MATH_ANSWER expected=1 got=1] then [CODE_ANSWER expected="a" got="a"]')
  check('mixed MATH_ANSWER + CODE_ANSWER tags both extracted', r.mathChecks.length === 1 && r.codeChecks.length === 1)
  check('mixed tags both stripped from cleanText', r.cleanText === 'then')
}
{
  const r = parseMathCodeAnswerTags('[MATH_ANSWER expected=1 got=1] [MATH_ANSWER expected=2 got=3]')
  check('multiple MATH_ANSWER tags → both collected in order', r.mathChecks.length === 2 && r.mathChecks[0].got === 1 && r.mathChecks[1].got === 3)
}
{
  const r = parseMathCodeAnswerTags('No tags here at all.')
  check('no tags present → cleanText returned unchanged (no trim-only mutation)', r.cleanText === 'No tags here at all.')
  check('no tags present → both arrays empty', r.mathChecks.length === 0 && r.codeChecks.length === 0)
}

// ── parseAssessmentResultTag ─────────────────────────────────────────────
{
  const r = parseAssessmentResultTag('[ASSESSMENT_RESULT correctness=8 reasoning=7 confidence=9]')
  check('tag matched → assessment non-null', r.assessment !== null)
  check('correctness/reasoning/confidence parsed as integers', r.assessment?.correctness === 8 && r.assessment?.reasoning === 7 && r.assessment?.confidence === 9)
  check('tag stripped → cleanText empty', r.cleanText === '')
}
{
  const r = parseAssessmentResultTag('Good attempt! [assessment_result correctness=3 reasoning=4 confidence=5] Keep going.')
  check('tag matching is case-insensitive', r.assessment !== null)
  check('surrounding text on both sides preserved after stripping', r.cleanText === 'Good attempt!  Keep going.')
}
{
  const r = parseAssessmentResultTag('No assessment tag in this turn.')
  check('no tag present → assessment null', r.assessment === null)
  check('no tag present → cleanText unchanged', r.cleanText === 'No assessment tag in this turn.')
}

// ── Integration semantics: sequential application mirrors LessonScreen.tsx ──
// (lesson-completion strip → math/code strip → assessment strip, each
// operating on the previous step's output, exactly as wired in sendMessage)
{
  const raw = 'Correct! [MATH_ANSWER expected=10 got=10] [ASSESSMENT_RESULT correctness=9 reasoning=8 confidence=9] [LESSON_COMPLETE]'
  const step1 = parseLessonCompletionTag(raw)
  const step2 = parseMathCodeAnswerTags(step1.cleanText)
  const step3 = parseAssessmentResultTag(step2.cleanText)
  check('chained parse: lesson completion detected', step1.hasCompletion === true)
  check('chained parse: math check survives the chain', step2.mathChecks.length === 1 && step2.mathChecks[0].got === 10)
  check('chained parse: assessment survives the chain', step3.assessment?.correctness === 9)
  check('chained parse: final cleanText has all three tags stripped', step3.cleanText === 'Correct!')
}

console.log(`\n=== ${passed} passed, ${failed} failed ===`)
process.exit(failed ? 1 : 0)
