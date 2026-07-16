/**
 * Educational Efficacy Study — Report Generation (Claude Recommendation #11,
 * Phase 5). Pure, deterministic renderers over an already-built
 * `EfficacyStudyReport` (efficacyAnalysis.ts) — no I/O, no fresh
 * timestamps (uses `report.generatedAt`), no invented numbers. Mirrors the
 * existing renderAuthoringFeedbackMarkdown/renderPackageFeedbackMarkdown
 * convention (authoringFeedback.ts / packageFeedback.ts) rather than
 * introducing a new rendering approach.
 *
 * Four outputs, each reading the SAME report object:
 *   - Researcher report  — full detail, methodology caveats, every
 *     per-concept/per-subject row, intended for the person running the
 *     statistical analysis.
 *   - Educator report    — plain-language, actionable, "what's working /
 *     what needs attention", no raw statistics jargon.
 *   - Executive summary  — 10-15 lines, headline numbers only.
 *   - Raw metrics export — JSON (the full report) + CSV (a flat
 *     per-concept table) for import into external statistical software
 *     (R / Python / SPSS), per the protocol's explicit decision not to
 *     implement inferential statistics in this codebase.
 */
import type { EfficacyStudyReport, LearningGainStat } from './efficacyAnalysis'

function pct(n: number | null): string {
  return n === null ? 'n/a' : `${(n * 100).toFixed(1)}%`
}

function fmtDate(d: Date): string {
  return d.toISOString().slice(0, 10)
}

// ── Researcher report ─────────────────────────────────────────────────────────

/** Full-detail markdown for the person running the statistical analysis —
 *  every number the report carries, with sample-size caveats surfaced
 *  inline rather than buried. */
export function renderResearcherReport(report: EfficacyStudyReport): string {
  const lines: string[] = []
  lines.push('# My Tutor Efficacy Study — Researcher Report')
  lines.push('')
  lines.push(`Generated: ${report.generatedAt.toISOString()}`)
  lines.push(`Study window: ${fmtDate(report.studyWindow.start)} to ${fmtDate(report.studyWindow.end)}`)
  lines.push('')
  lines.push('## Cohort')
  lines.push(`- Participants included: ${report.cohort.participantsIncluded}`)
  lines.push(`- Participants excluded (did not meet inclusion criteria): ${report.cohort.participantsExcluded}`)
  lines.push(`- Total lessons analyzed: ${report.cohort.totalLessons}`)
  lines.push('')
  if (report.caveats.length > 0) {
    lines.push('## Caveats (read before interpreting any number below)')
    for (const c of report.caveats) lines.push(`- ${c}`)
    lines.push('')
  }

  lines.push('## Overall learning gain (H1)')
  lines.push('Per-concept probe pass rate, first half of attempts vs. second half, across the whole cohort.')
  lines.push('')
  lines.push('| Concept | Subject | Learners | First-half n | First-half rate | Second-half n | Second-half rate | Gain | Low sample |')
  lines.push('|---|---|---|---|---|---|---|---|---|')
  for (const g of report.overall.learningGain) {
    lines.push(
      `| ${g.conceptId} | ${g.subject} | ${g.learners} | ${g.firstHalfOutcomes} | ${pct(g.firstHalfPassRate)} | ${g.secondHalfOutcomes} | ${pct(g.secondHalfPassRate)} | ${g.gain === null ? 'n/a' : pct(g.gain)} | ${g.lowSample ? 'yes' : 'no'} |`,
    )
  }
  if (report.overall.learningGain.length === 0) lines.push('| (no concepts with probe evidence) | | | | | | | | |')
  lines.push('')

  const mr = report.overall.misconceptionRepair
  lines.push('## Misconception repair rate (H2)')
  lines.push(`- Total misconceptions detected: ${mr.totalDetected}`)
  lines.push(`- Repaired (dormant — a later passing probe exists): ${mr.totalDormant}`)
  lines.push(`- Still active: ${mr.totalActive}`)
  lines.push(`- Repair rate: ${pct(mr.repairRate)}`)
  lines.push(`- Mean regrowths per misconception: ${mr.meanRegrowths.toFixed(2)}`)
  if (mr.lowSample) lines.push(`- **Low sample** (< ${5} detections) — treat as preliminary.`)
  lines.push('')

  lines.push('## Recovery success (H3)')
  lines.push('| Recovery state | Successes | Failures | Total | Rate |')
  lines.push('|---|---|---|---|---|')
  for (const r of report.overall.recoverySuccessRates) {
    lines.push(`| ${r.state} | ${r.stat.successes} | ${r.stat.failures} | ${r.stat.total} | ${pct(r.stat.rate)} |`)
  }
  if (report.overall.recoverySuccessRates.length === 0) lines.push('| (no recovery events recorded) | | | | |')
  lines.push('')

  if (report.retentionTrend) {
    const rt = report.retentionTrend
    lines.push('## Retention trend (H4)')
    lines.push(`- Baseline avg forgetting risk: ${rt.baseline.avgForgettingRisk === null ? 'n/a' : rt.baseline.avgForgettingRisk.toFixed(3)}`)
    lines.push(`- Follow-up avg forgetting risk: ${rt.followUp.avgForgettingRisk === null ? 'n/a' : rt.followUp.avgForgettingRisk.toFixed(3)}`)
    lines.push(`- Delta (negative = improved retention): ${rt.avgForgettingRiskDelta === null ? 'n/a' : rt.avgForgettingRiskDelta.toFixed(3)}`)
    lines.push('')
  } else {
    lines.push('## Retention trend (H4)')
    lines.push('Not computed — no follow-up window was supplied for this run. Re-run with `followUpWindow` set to a later period to compute this.')
    lines.push('')
  }

  lines.push('## Time to mastery')
  lines.push('| Concept | Learners | Mean days to mastery |')
  lines.push('|---|---|---|')
  for (const m of report.overall.averageMasteryTime) {
    lines.push(`| ${m.conceptId} | ${m.learners} | ${(m.avgMs / 86_400_000).toFixed(1)} |`)
  }
  if (report.overall.averageMasteryTime.length === 0) lines.push('| (no learners reached mastery yet) | | |')
  lines.push('')

  const en = report.overall.engagement
  lines.push('## Cohort engagement')
  lines.push(`- Learners: ${en.learners}`)
  lines.push(`- Mean sessions per learner: ${en.meanSessionsPerLearner?.toFixed(1) ?? 'n/a'}`)
  lines.push(`- Mean abandoned-lesson rate: ${pct(en.meanAbandonedRate)}`)
  lines.push(`- Mean lesson span (minutes): ${en.meanLessonSpanMinutes?.toFixed(1) ?? 'n/a'}`)
  lines.push(`- Mean longest inter-session gap (days): ${en.meanLongestGapDays?.toFixed(1) ?? 'n/a'}`)
  lines.push('')

  lines.push('## Subject effectiveness (H5, part 1)')
  for (const s of report.bySubject) {
    lines.push(`### ${s.subject}`)
    lines.push(`- Learners: ${s.learners}; lessons analyzed: ${s.lessonsAnalyzed}`)
    lines.push(`- Completion rate: ${pct(s.completion.completionRate)} (${s.completion.completedOrMastered}/${s.completion.totalLessons})${s.completion.lowSample ? ' — low sample' : ''}`)
    lines.push(`- Concepts with learning-gain data: ${s.learningGain.length}`)
    lines.push('')
  }

  lines.push('## Package effectiveness (H5, part 2)')
  lines.push('| Package | Concept | Learners | Probe pass rate | Mastered | Abandoned |')
  lines.push('|---|---|---|---|---|---|')
  for (const p of report.packageEffectiveness) {
    lines.push(
      `| ${p.packageId} | ${p.conceptId} | ${p.teachingEffectiveness.learners} | ${pct(p.teachingEffectiveness.probePassRate)} | ${p.masterySummary.mastered} | ${p.masterySummary.abandoned} |`,
    )
  }
  if (report.packageEffectiveness.length === 0) lines.push('| (no concepts with a compiled Educational Package have evidence yet) | | | | | |')
  lines.push('')

  lines.push('## Authoring priorities (context, ranked by impact)')
  lines.push('| Concept | Kind | Severity | Impact score | Evidence |')
  lines.push('|---|---|---|---|---|')
  for (const a of report.authoringPriorities.slice(0, 20)) {
    lines.push(`| ${a.conceptId} | ${a.kind} | ${a.severity} | ${a.impactScore.toFixed(1)} | ${a.evidence} |`)
  }
  if (report.authoringPriorities.length === 0) lines.push('| (no authoring findings at current thresholds) | | | | |')
  lines.push('')
  lines.push('## Methodology note')
  lines.push('This report contains descriptive statistics only. No p-values, confidence intervals, or effect sizes are computed here — use the raw metrics export (CSV/JSON) with dedicated statistical software for inferential analysis, per the study protocol §12.')

  return lines.join('\n') + '\n'
}

// ── Educator report ───────────────────────────────────────────────────────────

/** Plain-language, actionable summary for an educator/curriculum owner —
 *  no statistical jargon, no raw rate tables; just "what's working, what
 *  needs attention". */
export function renderEducatorReport(report: EfficacyStudyReport): string {
  const lines: string[] = []
  lines.push('# My Tutor — Educator Summary')
  lines.push('')
  lines.push(`Covering ${fmtDate(report.studyWindow.start)} to ${fmtDate(report.studyWindow.end)}, ${report.cohort.participantsIncluded} student(s).`)
  lines.push('')

  if (report.cohort.participantsIncluded === 0) {
    lines.push('No students met the study criteria in this window yet — nothing to report.')
    return lines.join('\n') + '\n'
  }

  const improving = report.overall.learningGain.filter((g) => g.gain !== null && g.gain > 0 && !g.lowSample)
  const struggling = report.overall.learningGain.filter((g) => g.gain !== null && g.gain <= 0 && !g.lowSample)

  lines.push('## What is working')
  if (improving.length > 0) {
    lines.push(`Students showed improving performance on ${improving.length} concept(s), including:`)
    for (const g of improving.slice(0, 5)) lines.push(`- **${g.conceptId}** (${g.subject}): pass rate up ${pct(g.gain)}`)
  } else {
    lines.push('Not enough evidence yet to confirm improvement on any concept — check back after more usage.')
  }
  lines.push('')

  lines.push('## What needs attention')
  if (struggling.length > 0) {
    for (const g of struggling.slice(0, 5)) {
      lines.push(`- **${g.conceptId}** (${g.subject}): pass rate ${g.gain !== null && g.gain < 0 ? `down ${pct(Math.abs(g.gain))}` : 'flat'} across the study window`)
    }
  } else {
    lines.push('No concept showed a decline at reliable sample sizes.')
  }
  lines.push('')

  const mr = report.overall.misconceptionRepair
  lines.push('## Misconceptions')
  if (mr.totalDetected > 0) {
    lines.push(`${mr.totalDormant} of ${mr.totalDetected} detected misconceptions (${pct(mr.repairRate)}) were resolved — a later correct answer was observed after the misconception was caught.`)
    if (mr.meanRegrowths > 0.3) lines.push(`Some misconceptions came back after appearing resolved (avg ${mr.meanRegrowths.toFixed(1)} regrowths) — worth revisiting the repair approach for those concepts.`)
  } else {
    lines.push('No misconceptions detected in this window.')
  }
  lines.push('')

  lines.push('## Top concepts to prioritize for content improvement')
  if (report.authoringPriorities.length > 0) {
    for (const a of report.authoringPriorities.slice(0, 5)) {
      lines.push(`- **${a.conceptId}**: ${a.action}`)
    }
  } else {
    lines.push('No specific concept was flagged for authoring attention at current thresholds.')
  }

  return lines.join('\n') + '\n'
}

// ── Executive summary ─────────────────────────────────────────────────────────

/** 10-15 line headline snapshot — the numbers a non-technical stakeholder
 *  would want first. */
export function renderExecutiveSummary(report: EfficacyStudyReport): string {
  const lines: string[] = []
  lines.push('# My Tutor Efficacy Study — Executive Summary')
  lines.push('')
  lines.push(`Window: ${fmtDate(report.studyWindow.start)} – ${fmtDate(report.studyWindow.end)}`)
  lines.push(`Participants: ${report.cohort.participantsIncluded} (${report.cohort.participantsExcluded} excluded by criteria)`)
  lines.push(`Lessons analyzed: ${report.cohort.totalLessons}`)
  lines.push('')

  const gains = report.overall.learningGain.filter((g) => g.gain !== null)
  const meanGain = gains.length > 0 ? gains.reduce((s, g) => s + (g.gain as number), 0) / gains.length : null
  lines.push(`Mean learning gain across ${gains.length} concept(s): ${meanGain === null ? 'n/a' : pct(meanGain)}`)
  lines.push(`Lesson completion rate: ${pct(report.overall.completion.completionRate)}`)
  lines.push(`Misconception repair rate: ${pct(report.overall.misconceptionRepair.repairRate)}`)
  if (report.retentionTrend?.avgForgettingRiskDelta !== undefined && report.retentionTrend?.avgForgettingRiskDelta !== null) {
    const delta = report.retentionTrend.avgForgettingRiskDelta
    lines.push(`Retention trend: forgetting risk ${delta < 0 ? 'decreased' : 'increased'} by ${Math.abs(delta).toFixed(3)} between baseline and follow-up`)
  } else {
    lines.push('Retention trend: not yet available (requires a follow-up window run)')
  }
  lines.push('')
  lines.push(`Caveats: ${report.caveats.length > 0 ? report.caveats.length + ' — see the researcher report for details' : 'none'}`)

  return lines.join('\n') + '\n'
}

// ── Raw metrics export (CSV + JSON) ──────────────────────────────────────────

function csvEscape(v: string | number | boolean | null): string {
  const s = v === null ? '' : String(v)
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

function learningGainToCsv(rows: LearningGainStat[]): string {
  const header = ['conceptId', 'subject', 'learners', 'firstHalfOutcomes', 'secondHalfOutcomes', 'firstHalfPassRate', 'secondHalfPassRate', 'gain', 'lowSample']
  const lines = [header.join(',')]
  for (const r of rows) {
    lines.push(
      [r.conceptId, r.subject, r.learners, r.firstHalfOutcomes, r.secondHalfOutcomes, r.firstHalfPassRate, r.secondHalfPassRate, r.gain, r.lowSample]
        .map(csvEscape)
        .join(','),
    )
  }
  return lines.join('\n') + '\n'
}

export interface RawMetricsExport {
  /** The complete report, JSON-serialized (Dates as ISO strings). */
  json: string
  /** A flat per-concept learning-gain table for import into R/Python/SPSS. */
  csv: string
}

/** Pure: serializes the report for external statistical analysis. This is
 *  the only place inferential statistics should be computed — per the
 *  protocol's explicit decision not to implement significance testing in
 *  this codebase. */
export function renderRawMetricsExport(report: EfficacyStudyReport): RawMetricsExport {
  return {
    json: JSON.stringify(report, null, 2),
    csv: learningGainToCsv(report.overall.learningGain),
  }
}
