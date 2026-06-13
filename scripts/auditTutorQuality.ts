/**
 * Sprint CM — Tutor Response Quality Audit.
 *
 * Internal validation engine for tutor response quality. Deterministically
 * scores sample tutoring transcripts against the 6 compliance dimensions
 * (teaching style, worked examples, checkpoints, prerequisites, lesson plan,
 * orchestrator). No DB access, no UI.
 *
 * Run with:
 *   npx tsx scripts/auditTutorQuality.ts
 */
import { auditTranscripts, SAMPLE_TRANSCRIPTS } from '../src/lib/school/quality/tutorQualityAudit'

const summary = auditTranscripts(SAMPLE_TRANSCRIPTS)

console.log('═══════════════════════════════════════════════════════════════')
console.log(' TUTOR RESPONSE QUALITY AUDIT (Sprint CM)')
console.log('═══════════════════════════════════════════════════════════════')
console.log(`Generated: ${summary.generatedAt}`)
console.log(`Transcripts audited: ${summary.transcriptCount}`)

console.log('\n--- OVERALL SCORE ---')
console.log(`Overall score: ${summary.overallScore}/100 (${summary.category})`)
console.log('Category breakdown:')
for (const [category, count] of Object.entries(summary.categoryBreakdown)) {
  console.log(`  ${category}: ${count}`)
}

for (const report of summary.reports) {
  console.log(`\n--- TRANSCRIPT: ${report.transcriptLabel} ---`)
  console.log(`Score: ${report.overallScore}/100 (${report.category})`)
  for (const d of report.dimensions) {
    if (!d.applicable) {
      console.log(`  ${d.dimension}: N/A`)
      continue
    }
    console.log(`  ${d.dimension}: ${d.score}/100`)
    for (const c of d.checks) {
      console.log(`    [${c.passed ? 'PASS' : 'FAIL'}] ${c.name}`)
    }
  }
}

console.log('\n--- VIOLATIONS ---')
const allViolations = summary.reports.flatMap((r) => r.violations.map((v) => `[${r.transcriptLabel}] ${v}`))
if (allViolations.length === 0) {
  console.log('NONE')
} else {
  for (const v of allViolations) console.log(`  ${v}`)
}

console.log('\n--- WARNINGS ---')
const allWarnings = summary.reports.flatMap((r) => r.warnings.map((w) => `[${r.transcriptLabel}] ${w}`))
if (allWarnings.length === 0) {
  console.log('NONE')
} else {
  for (const w of allWarnings) console.log(`  ${w}`)
}

console.log('\n--- EXAMPLES (excerpted evidence) ---')
for (const report of summary.reports) {
  const examples = report.dimensions.flatMap((d) => d.checks.filter((c) => c.excerpt))
  if (examples.length === 0) continue
  console.log(`  [${report.transcriptLabel}]`)
  for (const c of examples.slice(0, 3)) {
    console.log(`    ${c.name} (${c.passed ? 'pass' : 'fail'}): "${c.excerpt}"`)
  }
}
