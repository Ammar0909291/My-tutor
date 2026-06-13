/**
 * Sprint CN — Educational Content Validation Engine.
 *
 * Internal validation engine for generated educational content quality.
 * Deterministically scores hand-authored sample artifacts (chapter
 * summaries, revision notes, practice questions, assessments, mock tests)
 * against the Sprint CN validation rules for CBSE + UP Board sample
 * chapters. No DB access, no AI calls, no UI.
 *
 * Run with:
 *   npx tsx scripts/auditEducationalContent.ts
 *
 * Optional: pass --sample-ai to additionally generate a small set of
 * real artifacts (via the existing BL/CI/BN/BO generators) for 2 CBSE +
 * 2 UP Board sample chapters and validate those too (requires
 * DATABASE_URL + an AI provider key).
 *
 *   npx tsx scripts/auditEducationalContent.ts --sample-ai
 */
import {
  runSampleValidation,
  summarizeValidation,
  validateAssessment,
  validateChapterSummary,
  validateMockTest,
  validatePracticeQuestions,
  validateRevisionNotes,
  type ContentValidationReport,
  type ContentValidationSummary,
  type MockTestSample,
} from '../src/lib/school/quality/contentValidation'
import { BOARD_CATALOGS } from '../src/lib/education'
import { pickAISampleChapters } from '../src/lib/school/quality/contentQualityAudit'
import { SCHOOL_SUBJECT_META } from '../src/lib/school/schoolRouting'
import type { PracticeQuestion } from '../src/lib/school/practice/practiceTypes'

function printSummary(title: string, summary: ContentValidationSummary) {
  console.log(`\n--- ${title} ---`)
  console.log(`Artifacts: ${summary.artifactCount} | Overall score: ${summary.overallScore}/100 (${summary.category})`)
  console.log('Category breakdown:')
  for (const [cat, count] of Object.entries(summary.categoryBreakdown)) {
    console.log(`  ${cat}: ${count}`)
  }

  for (const r of summary.reports) {
    console.log(`\n  [${r.artifactType}] ${r.label}`)
    console.log(`  Score: ${r.score}/100 (${r.category})`)
    for (const c of r.checks) {
      console.log(`    [${c.passed ? 'PASS' : 'FAIL'}] ${c.name}: ${c.detail}`)
    }
  }

  console.log('\n  Failures:')
  const allFailures = summary.reports.flatMap((r) => r.failures.map((f) => `[${r.label}] ${f}`))
  if (allFailures.length === 0) console.log('    NONE')
  else for (const f of allFailures) console.log(`    ${f}`)

  console.log('\n  Warnings:')
  const allWarnings = summary.reports.flatMap((r) => r.warnings.map((w) => `[${r.label}] ${w}`))
  if (allWarnings.length === 0) console.log('    NONE')
  else for (const w of allWarnings) console.log(`    ${w}`)

  console.log('\n  Recommendations:')
  const allRecs = [...new Set(summary.reports.flatMap((r) => r.recommendations))]
  if (allRecs.length === 0) console.log('    NONE')
  else for (const rec of allRecs) console.log(`    - ${rec}`)
}

console.log('═══════════════════════════════════════════════════════════════')
console.log(' EDUCATIONAL CONTENT VALIDATION ENGINE (Sprint CN)')
console.log('═══════════════════════════════════════════════════════════════')

const deterministic = runSampleValidation()
console.log(`Generated: ${deterministic.generatedAt}`)
printSummary('DETERMINISTIC VALIDATION (hand-authored samples, CBSE + UP Board)', deterministic)

// ── Optional AI sample validation ────────────────────────────────────────────

async function runAISampleValidation() {
  const { getChapterContent } = await import('../src/lib/school/chapterContent')
  const { getRevisionNotes } = await import('../src/lib/school/revision/revisionNotes')
  const { generateChapterPractice } = await import('../src/lib/school/practice/generateChapterPractice')
  const { generateChapterAssessment } = await import('../src/lib/school/assessment/generateChapterAssessment')

  const cbseCatalogs = BOARD_CATALOGS.filter((c) => c.boardId === 'cbse')
  const upCatalogs = BOARD_CATALOGS.filter((c) => c.boardId === 'up_board')
  const sample = [...pickAISampleChapters(cbseCatalogs, 2), ...pickAISampleChapters(upCatalogs, 2)]

  const reports: ContentValidationReport[] = []
  const practiceSets: { chapterId: string; questions: PracticeQuestion[] }[] = []

  for (const task of sample) {
    const catalog = BOARD_CATALOGS.find((c) => c.boardId === task.boardId && c.subjectSlug === task.subjectSlug)
    const subjectName = catalog?.subjectName ?? SCHOOL_SUBJECT_META[task.subjectSlug]?.label ?? task.subjectSlug
    const label = `${task.boardId.toUpperCase()} G${task.grade} ${task.subjectSlug} — "${task.chapter.title}"`

    const content = await getChapterContent(task.boardId, task.subjectSlug, subjectName, task.grade, task.chapter)
    reports.push(validateChapterSummary(content, task.chapter, `${label} (AI chapter summary)`))

    const notes = await getRevisionNotes('quick', task.boardId, task.subjectSlug, subjectName, task.grade, task.chapter)
    reports.push(validateRevisionNotes(notes, `${label} (AI revision notes)`))

    const practice = await generateChapterPractice(task.boardId, task.subjectSlug, subjectName, task.grade, task.chapter)
    reports.push(validatePracticeQuestions(practice, `${label} (AI practice set)`))
    practiceSets.push({ chapterId: task.chapter.id, questions: practice })

    const assessment = await generateChapterAssessment(task.boardId, task.subjectSlug, subjectName, task.grade, task.chapter)
    reports.push(validateAssessment(assessment, task.chapter, `${label} (AI assessment)`))
  }

  if (practiceSets.length >= 2) {
    const [a, b] = practiceSets
    const mockSample: MockTestSample = {
      questions: [
        ...a.questions.map((q) => ({ ...q, id: `${a.chapterId}__${q.id}` })),
        ...b.questions.map((q) => ({ ...q, id: `${b.chapterId}__${q.id}` })),
      ],
      chapterIds: [a.chapterId, b.chapterId],
      weakTopicIds: a.questions[0] ? [a.questions[0].nodeId] : [],
    }
    reports.push(validateMockTest(mockSample, 'AI-generated mock test sample (combined from 2 sampled chapters)'))
  }

  printSummary('AI-GENERATED SAMPLE VALIDATION (--sample-ai)', summarizeValidation(reports))
}

if (process.argv.includes('--sample-ai')) {
  runAISampleValidation().catch((e) => {
    console.error('AI sample validation failed:', e)
    process.exitCode = 1
  })
} else {
  console.log('\n(AI-generated content validation skipped — pass --sample-ai to validate a small set of live-generated artifacts across CBSE + UP Board)')
}
