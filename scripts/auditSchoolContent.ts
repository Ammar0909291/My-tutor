/**
 * Sprint CL — Content Quality & Curriculum Integrity audit.
 *
 * Internal validation engine for educational content quality. Deterministic
 * by default; pass --ai-sample to additionally exercise chapter summary,
 * revision notes, practice, and assessment generation for a small sample of
 * chapters (requires DATABASE_URL + an AI provider key).
 *
 * Run with:
 *   npx tsx scripts/auditSchoolContent.ts
 *   npx tsx scripts/auditSchoolContent.ts --ai-sample
 */
import {
  buildAuditReport,
  pickAISampleChapters,
  type AISampleResult,
} from '../src/lib/school/quality/contentQualityAudit'
import { BOARD_CATALOGS } from '../src/lib/education'
import { SCHOOL_SUBJECT_META } from '../src/lib/school/schoolRouting'

const subjectLabel = (slug: string) => SCHOOL_SUBJECT_META[slug]?.label ?? slug

const report = buildAuditReport(['cbse', 'up_board'])

console.log('═══════════════════════════════════════════════════════════════')
console.log(' CONTENT QUALITY & CURRICULUM INTEGRITY AUDIT (Sprint CL)')
console.log('═══════════════════════════════════════════════════════════════')
console.log(`Generated: ${report.generatedAt}`)
console.log(`Boards audited: ${report.boardIds.join(', ')}`)

console.log('\n--- OVERALL COVERAGE ---')
console.log(`Total chapters: ${report.overall.totalChapters}`)
console.log(`Coverage: ${report.overall.coveragePercent}% (avg score ${report.overall.averageScore}/100)`)
console.log(`  Fully covered (100): ${report.overall.fullyCovered}`)
console.log(`  Minor gaps    (80) : ${report.overall.minorGaps}`)
console.log(`  Needs review  (50) : ${report.overall.needsReview}`)
console.log(`  Broken        (0)  : ${report.overall.broken}`)

for (const board of report.boards) {
  console.log(`\n--- BOARD: ${board.boardId.toUpperCase()} ---`)
  console.log(`Total chapters: ${board.totalChapters} | Coverage: ${board.coveragePercent}%`)

  console.log('Subject coverage:')
  for (const s of board.subjects) {
    console.log(`  ${subjectLabel(s.subjectSlug)}: ${s.coveragePercent}% — ${s.totalChapters} chapters (${s.fullyCovered} full / ${s.minorGaps} minor / ${s.needsReview} review / ${s.broken} broken)`)
  }

  console.log('Grade coverage:')
  for (const g of board.grades) {
    console.log(`  ${subjectLabel(g.subjectSlug)} G${g.grade}: ${g.coveragePercent}% (${g.totalChapters} chapters)`)
  }
}

console.log('\n--- BROKEN CHAPTERS ---')
if (report.brokenChapters.length === 0) {
  console.log('NONE')
} else {
  for (const c of report.brokenChapters) {
    console.log(`  [${c.boardId}/${c.subjectSlug} G${c.grade}] ${c.chapterId} ("${c.chapterTitle}"): ${c.issues.join('; ')}`)
  }
}

console.log('\n--- DEEP VALIDATION ---')
const dv = report.deepValidation
console.log(`Duplicate chapter IDs: ${dv.duplicateChapterIds.length === 0 ? 'NONE' : dv.duplicateChapterIds.join(', ')}`)
console.log(`Empty chapter mappings (no KG nodes): ${dv.emptyChapterMappings.length === 0 ? 'NONE' : dv.emptyChapterMappings.join(', ')}`)
console.log(`Broken subject references (bad KG node ids): ${dv.brokenSubjectReferences.length === 0 ? 'NONE' : JSON.stringify(dv.brokenSubjectReferences, null, 2)}`)
console.log(`Missing roadmap references (bad title/order): ${dv.missingRoadmapReferences.length === 0 ? 'NONE' : dv.missingRoadmapReferences.join(', ')}`)
console.log(`Missing revision-note support: ${dv.missingRevisionNoteSupport.length === 0 ? 'NONE' : dv.missingRevisionNoteSupport.join(', ')}`)
if (dv.orphanKgNodes.length === 0) {
  console.log('Orphan KG nodes: NONE')
} else {
  console.log('Orphan KG nodes:')
  for (const r of dv.orphanKgNodes) {
    console.log(`  ${r.subject}: ${r.unusedNodes.length} unused — ${r.unusedNodes.map((n) => n.id).join(', ')}`)
  }
}

console.log('\n--- WARNINGS ---')
if (report.warnings.length === 0) {
  console.log('NONE')
} else {
  for (const w of report.warnings) console.log(`  ${w}`)
}

// ── Optional AI quality sampling ─────────────────────────────────────────────

async function runAISampling() {
  console.log('\n--- AI QUALITY SAMPLING ---')

  const { getChapterContent } = await import('../src/lib/school/chapterContent')
  const { getRevisionNotes } = await import('../src/lib/school/revision/revisionNotes')
  const { generateChapterPractice } = await import('../src/lib/school/practice/generateChapterPractice')
  const { generateChapterAssessment } = await import('../src/lib/school/assessment/generateChapterAssessment')

  const catalogs = BOARD_CATALOGS.filter((c) => report.boardIds.includes(c.boardId))
  const sample = pickAISampleChapters(catalogs, 4)
  const results: AISampleResult[] = []

  for (const task of sample) {
    const subjectName = subjectLabel(task.subjectSlug)
    const errors: string[] = []

    let chapterSummaryOk = false
    try {
      const content = await getChapterContent(task.boardId, task.subjectSlug, subjectName, task.grade, task.chapter)
      chapterSummaryOk = content.summary.trim().length > 0 && content.objectives.length > 0
    } catch (e) {
      errors.push(`chapterSummary: ${(e as Error).message}`)
    }

    let revisionNotesOk = false
    try {
      const notes = await getRevisionNotes('quick', task.boardId, task.subjectSlug, subjectName, task.grade, task.chapter)
      revisionNotesOk = notes.type === 'quick' && notes.keyConcepts.length > 0
    } catch (e) {
      errors.push(`revisionNotes: ${(e as Error).message}`)
    }

    let practiceGenerationOk = false
    try {
      const questions = await generateChapterPractice(task.boardId, task.subjectSlug, subjectName, task.grade, task.chapter)
      practiceGenerationOk = questions.length >= 3
    } catch (e) {
      errors.push(`practice: ${(e as Error).message}`)
    }

    let assessmentGenerationOk = false
    try {
      const questions = await generateChapterAssessment(task.boardId, task.subjectSlug, subjectName, task.grade, task.chapter)
      assessmentGenerationOk = questions.length >= 3
    } catch (e) {
      errors.push(`assessment: ${(e as Error).message}`)
    }

    const result: AISampleResult = {
      boardId: task.boardId,
      subjectSlug: task.subjectSlug,
      grade: task.grade,
      chapterId: task.chapter.id,
      chapterSummaryOk,
      revisionNotesOk,
      practiceGenerationOk,
      assessmentGenerationOk,
      errors,
    }
    results.push(result)

    console.log(`  [${result.boardId}/${result.subjectSlug} G${result.grade}] ${result.chapterId}`)
    console.log(`    summary=${result.chapterSummaryOk} revision=${result.revisionNotesOk} practice=${result.practiceGenerationOk} assessment=${result.assessmentGenerationOk}`)
    if (result.errors.length > 0) console.log(`    errors: ${result.errors.join(' | ')}`)
  }

  const allOk = results.every((r) => r.chapterSummaryOk && r.revisionNotesOk && r.practiceGenerationOk && r.assessmentGenerationOk)
  console.log(`\nAI sampling result: ${allOk ? 'ALL OK' : 'SOME CHECKS FAILED'} (${results.length} chapters sampled)`)
}

if (process.argv.includes('--ai-sample')) {
  runAISampling().catch((e) => {
    console.error('AI sampling failed:', e)
    process.exitCode = 1
  })
} else {
  console.log('\n(AI quality sampling skipped — pass --ai-sample to verify live generation for a small sample of chapters)')
}
