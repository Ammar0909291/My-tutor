/**
 * Offline unit harness for buildGuidedTeachingPrompt in
 * src/lib/school/tutoring/guidedTeachingPrompt.ts. Pure, no DB/network.
 *
 * Run with:  npx tsx scripts/test-guided-teaching-prompt.ts
 */

import { buildGuidedTeachingPrompt } from '../src/lib/school/tutoring/guidedTeachingPrompt'
import type { GuidedTeachingOptions } from '../src/lib/school/tutoring/guidedTeachingPrompt'

let passed = 0
let failed = 0
function check(name: string, cond: boolean) {
  if (cond) { passed++; console.log(`[✓ pass] ${name}`) }
  else { failed++; console.log(`[✗ FAIL] ${name}`) }
}

function opts(overrides: Partial<GuidedTeachingOptions> = {}): GuidedTeachingOptions {
  return {
    board: 'cbse',
    grade: 8,
    subjectSlug: 'mathematics',
    weakTopicTitles: [],
    ...overrides,
  }
}

// ── Header / overall structure ───────────────────────────────────────────────

check('output always starts with the GUIDED TEACHING STRATEGY header',
  buildGuidedTeachingPrompt(opts()).startsWith('\n\nGUIDED TEACHING STRATEGY'))

check('output always includes UNDERSTANDING CHECKS section',
  buildGuidedTeachingPrompt(opts()).includes('UNDERSTANDING CHECKS'))

check('output always includes CONFUSION RECOVERY section',
  buildGuidedTeachingPrompt(opts()).includes('CONFUSION RECOVERY'))

check('output always includes SESSION COMPLETION SIGNAL section',
  buildGuidedTeachingPrompt(opts()).includes('SESSION COMPLETION SIGNAL'))

// ── Grade-depth branching ─────────────────────────────────────────────────────

check('grade 5 (<=6) → simple-language style, mentions "Class 5"',
  buildGuidedTeachingPrompt(opts({ grade: 5 })).includes('Class 5') &&
  buildGuidedTeachingPrompt(opts({ grade: 5 })).includes('very simple language'))

check('grade 7 (<=8) → moderate-terminology style, mentions "Class 7"',
  buildGuidedTeachingPrompt(opts({ grade: 7 })).includes('Class 7') &&
  buildGuidedTeachingPrompt(opts({ grade: 7 })).includes('moderate subject terminology'))

check('grade 9 (<=10) → board-exam-aware style, mentions "Class 9"',
  buildGuidedTeachingPrompt(opts({ grade: 9 })).includes('Class 9') &&
  buildGuidedTeachingPrompt(opts({ grade: 9 })).includes('Board-exam awareness'))

check('grade 11 (>10) → formal academic style, mentions "Class 11"',
  buildGuidedTeachingPrompt(opts({ grade: 11 })).includes('Class 11') &&
  buildGuidedTeachingPrompt(opts({ grade: 11 })).includes('Formal academic tone'))

check('grade 12 → also formal academic style',
  buildGuidedTeachingPrompt(opts({ grade: 12 })).includes('Formal academic tone'))

check('grade boundary 6 → simple-language style (not moderate)',
  buildGuidedTeachingPrompt(opts({ grade: 6 })).includes('very simple language'))

check('grade boundary 10 → board-exam style (not formal academic)',
  buildGuidedTeachingPrompt(opts({ grade: 10 })).includes('Board-exam awareness') &&
  !buildGuidedTeachingPrompt(opts({ grade: 10 })).includes('Formal academic tone'))

// ── checkpointFrequency branching ─────────────────────────────────────────────

check('checkpointFrequency=frequent → "EVERY explanation" wording',
  buildGuidedTeachingPrompt(opts({ checkpointFrequency: 'frequent' })).includes('After EVERY explanation'))

check('checkpointFrequency=reduced → "substantial explanation (roughly 150+ words)" wording',
  buildGuidedTeachingPrompt(opts({ checkpointFrequency: 'reduced' })).includes('150+ words'))

check('checkpointFrequency omitted → defaults to normal (120+ words wording)',
  buildGuidedTeachingPrompt(opts()).includes('120+ words'))

// ── pendingCheckpointRetry / checkpointFailedAgain branching ──────────────────

check('checkpointFailedAgain=true → STILL NOT QUITE THERE block present',
  buildGuidedTeachingPrompt(opts({ checkpointFailedAgain: true })).includes('STILL NOT QUITE THERE'))

check('pendingCheckpointRetry=true (without failedAgain) → RETRY AFTER A MISSED ANSWER block present',
  buildGuidedTeachingPrompt(opts({ pendingCheckpointRetry: true })).includes('RETRY AFTER A MISSED ANSWER'))

check('checkpointFailedAgain=true takes priority over pendingCheckpointRetry when both true',
  buildGuidedTeachingPrompt(opts({ pendingCheckpointRetry: true, checkpointFailedAgain: true })).includes('STILL NOT QUITE THERE') &&
  !buildGuidedTeachingPrompt(opts({ pendingCheckpointRetry: true, checkpointFailedAgain: true })).includes('RETRY AFTER A MISSED ANSWER'))

check('neither pendingCheckpointRetry nor checkpointFailedAgain → neither retry block present',
  !buildGuidedTeachingPrompt(opts()).includes('STILL NOT QUITE THERE') &&
  !buildGuidedTeachingPrompt(opts()).includes('RETRY AFTER A MISSED ANSWER'))

// ── weakTopicTitles branching ─────────────────────────────────────────────────

check('weakTopicTitles empty → no INVISIBLE WEAK-TOPIC REINFORCEMENT section',
  !buildGuidedTeachingPrompt(opts({ weakTopicTitles: [] })).includes('INVISIBLE WEAK-TOPIC REINFORCEMENT'))

check('weakTopicTitles non-empty → INVISIBLE WEAK-TOPIC REINFORCEMENT section present',
  buildGuidedTeachingPrompt(opts({ weakTopicTitles: ['Fractions'] })).includes('INVISIBLE WEAK-TOPIC REINFORCEMENT'))

check('weakTopicTitles with 1 entry → that title mentioned',
  buildGuidedTeachingPrompt(opts({ weakTopicTitles: ['Fractions'] })).includes('Fractions'))

check('weakTopicTitles with 3 entries → only first 2 mentioned (slice(0,2))',
  (() => {
    const out = buildGuidedTeachingPrompt(opts({ weakTopicTitles: ['Alpha', 'Beta', 'Gamma'] }))
    return out.includes('Alpha and Beta') && !out.includes('Gamma')
  })())

// ── exampleFirstBlock subject gating ──────────────────────────────────────────

check('subjectSlug=mathematics → EXAMPLE-FIRST TEACHING block present',
  buildGuidedTeachingPrompt(opts({ subjectSlug: 'mathematics' })).includes('EXAMPLE-FIRST TEACHING'))

check('subjectSlug=science → EXAMPLE-FIRST TEACHING block present',
  buildGuidedTeachingPrompt(opts({ subjectSlug: 'science' })).includes('EXAMPLE-FIRST TEACHING'))

check('subjectSlug=economics → EXAMPLE-FIRST TEACHING block present',
  buildGuidedTeachingPrompt(opts({ subjectSlug: 'economics' })).includes('EXAMPLE-FIRST TEACHING'))

check('subjectSlug=english → no EXAMPLE-FIRST TEACHING block (not in EXAMPLE_FIRST_SUBJECTS)',
  !buildGuidedTeachingPrompt(opts({ subjectSlug: 'english' })).includes('EXAMPLE-FIRST TEACHING'))

check('subjectSlug=mathematics, grade<=8 → relatable-real-life example style',
  buildGuidedTeachingPrompt(opts({ subjectSlug: 'mathematics', grade: 6 })).includes('a relatable, real-life scenario'))

check('subjectSlug=mathematics, grade>8 → real-life OR exam-style example style',
  buildGuidedTeachingPrompt(opts({ subjectSlug: 'mathematics', grade: 10 })).includes('exam-style worked problem'))

// ── chapterObjectives branching ───────────────────────────────────────────────

check('chapterObjectives omitted → no CHAPTER OBJECTIVES section',
  !buildGuidedTeachingPrompt(opts()).includes('CHAPTER OBJECTIVES'))

check('chapterObjectives empty array → no CHAPTER OBJECTIVES section',
  !buildGuidedTeachingPrompt(opts({ chapterObjectives: [] })).includes('CHAPTER OBJECTIVES'))

check('chapterObjectives non-empty → CHAPTER OBJECTIVES section present with bullet points',
  buildGuidedTeachingPrompt(opts({ chapterObjectives: ['Understand fractions', 'Apply ratios'] }))
    .includes('- Understand fractions') &&
  buildGuidedTeachingPrompt(opts({ chapterObjectives: ['Understand fractions', 'Apply ratios'] }))
    .includes('- Apply ratios'))

// ── Determinism / general ─────────────────────────────────────────────────────

check('function is deterministic — same options twice gives identical output',
  buildGuidedTeachingPrompt(opts()) === buildGuidedTeachingPrompt(opts()))

check('blocks are joined with double newline separators between sections',
  buildGuidedTeachingPrompt(opts()).includes('\n\n'))

console.log(`\n=== ${passed} passed, ${failed} failed ===`)
process.exit(failed ? 1 : 0)
