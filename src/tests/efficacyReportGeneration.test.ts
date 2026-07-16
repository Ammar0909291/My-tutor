/**
 * Efficacy Study Report Generation tests (Claude Recommendation #11,
 * Phase 5): proves the four report renderers produce correct, stable
 * output from an already-built EfficacyStudyReport, handle an empty
 * report gracefully, and never fabricate a number that isn't in the
 * input report.
 */
import { describe, it, expect } from 'vitest'
import type { EfficacyStudyReport } from '@/lib/research/efficacyAnalysis'
import {
  renderResearcherReport, renderEducatorReport, renderExecutiveSummary, renderRawMetricsExport,
} from '@/lib/research/reportGeneration'

const T0 = new Date('2026-01-01T00:00:00Z')
const T1 = new Date('2026-03-01T00:00:00Z')

function emptyReport(): EfficacyStudyReport {
  return {
    generatedAt: T1,
    studyWindow: { start: T0, end: T1 },
    cohort: { participantsIncluded: 0, participantsExcluded: 0, totalLessons: 0 },
    overall: {
      learningGain: [],
      misconceptionRepair: { totalDetected: 0, totalDormant: 0, totalActive: 0, repairRate: 0, meanRegrowths: 0, lowSample: true },
      completion: { totalLessons: 0, completedOrMastered: 0, completionRate: 0, lowSample: true },
      recoverySuccessRates: [],
      averageMasteryTime: [],
      engagement: { learners: 0, meanSessionsPerLearner: null, meanAbandonedRate: null, meanLessonSpanMinutes: null, meanLongestGapDays: null },
    },
    bySubject: [],
    packageEffectiveness: [],
    retentionTrend: null,
    authoringPriorities: [],
    caveats: ['Zero eligible participants — this report contains no findings, not a null result. Check the eligibility criteria and participantUserIds allowlist.'],
  }
}

function populatedReport(): EfficacyStudyReport {
  return {
    generatedAt: T1,
    studyWindow: { start: T0, end: T1 },
    cohort: { participantsIncluded: 40, participantsExcluded: 5, totalLessons: 300 },
    overall: {
      learningGain: [
        { conceptId: 'phys.mech.f1', subject: 'physics', learners: 20, firstHalfOutcomes: 40, secondHalfOutcomes: 40, firstHalfPassRate: 0.4, secondHalfPassRate: 0.8, gain: 0.4, lowSample: false },
        { conceptId: 'phys.mech.f2', subject: 'physics', learners: 3, firstHalfOutcomes: 1, secondHalfOutcomes: 1, firstHalfPassRate: 1, secondHalfPassRate: 0, gain: -1, lowSample: true },
      ],
      misconceptionRepair: { totalDetected: 10, totalDormant: 7, totalActive: 3, repairRate: 0.7, meanRegrowths: 0.5, lowSample: false },
      completion: { totalLessons: 300, completedOrMastered: 210, completionRate: 0.7, lowSample: false },
      recoverySuccessRates: [{ state: 'i_cant_do_this', stat: { successes: 8, failures: 2, total: 10, rate: 0.8 } }],
      averageMasteryTime: [{ conceptId: 'phys.mech.f1', learners: 20, avgMs: 3 * 86_400_000 }],
      engagement: { learners: 40, meanSessionsPerLearner: 6.5, meanAbandonedRate: 0.1, meanLessonSpanMinutes: 12, meanLongestGapDays: 4 },
    },
    bySubject: [
      {
        subject: 'physics', learners: 40, lessonsAnalyzed: 300,
        learningGain: [{ conceptId: 'phys.mech.f1', subject: 'physics', learners: 20, firstHalfOutcomes: 40, secondHalfOutcomes: 40, firstHalfPassRate: 0.4, secondHalfPassRate: 0.8, gain: 0.4, lowSample: false }],
        completion: { totalLessons: 300, completedOrMastered: 210, completionRate: 0.7, lowSample: false },
        averageMasteryTime: [{ conceptId: 'phys.mech.f1', learners: 20, avgMs: 3 * 86_400_000 }],
        recoverySuccessRates: [],
      },
    ],
    packageEffectiveness: [{
      packageId: 'pkg-1', conceptId: 'phys.mech.f1', contentHash: 'sha256:abc', subject: 'physics',
      teachingEffectiveness: { lessons: 40, learners: 20, probePassRate: 0.75, probeOutcomes: 80, strategiesObserved: ['direct_instruction'] },
      evidenceSummary: { probes: 80, misconceptionDetections: 5, recoveries: 2, mistakes: 3 },
      masterySummary: { mastered: 15, progressing: 5, struggling: 0, abandoned: 0, noSignal: 0, avgMasteryPct: 82 },
      failureSummary: { failedProbes: 20, topMisconceptions: [], topRecoveryStates: [] },
      recommendations: ['No evidence-backed weaknesses at current thresholds — keep collecting evidence.'],
    }],
    retentionTrend: {
      baseline: { learnersWithReviews: 20, totalScheduled: 20, totalOverdue: 2, totalDueToday: 1, totalUpcoming: 17, avgForgettingRisk: 0.4, byMaintenanceStatus: { stable: 15, at_risk: 3, overdue: 1, critical: 1 }, topOverdueConcepts: [] },
      followUp: { learnersWithReviews: 20, totalScheduled: 20, totalOverdue: 1, totalDueToday: 1, totalUpcoming: 18, avgForgettingRisk: 0.25, byMaintenanceStatus: { stable: 18, at_risk: 1, overdue: 1, critical: 0 }, topOverdueConcepts: [] },
      avgForgettingRiskDelta: -0.15,
    },
    authoringPriorities: [
      { conceptId: 'phys.mech.f2', subject: 'physics', kind: 'blueprint_needs_revision', severity: 'high', impactScore: 12, evidence: 'probe pass rate 20% over 10 outcomes', action: 'Review the explanation tiers.' },
    ],
    caveats: ['1 of 2 concept(s) in the learning-gain table have fewer than 5 total probe outcomes — flagged lowSample=true, not reliable individually.'],
  }
}

describe('renderResearcherReport', () => {
  it('includes the cohort summary, every learning-gain row, and caveats', () => {
    const md = renderResearcherReport(populatedReport())
    expect(md).toContain('Participants included: 40')
    expect(md).toContain('phys.mech.f1')
    expect(md).toContain('phys.mech.f2')
    expect(md).toContain('Caveats')
    expect(md).toContain('lowSample=true')
  })

  it('reports the retention trend numbers verbatim when present', () => {
    const md = renderResearcherReport(populatedReport())
    expect(md).toContain('-0.150')
  })

  it('states retention trend is not computed when null, rather than omitting the section', () => {
    const report = { ...populatedReport(), retentionTrend: null }
    const md = renderResearcherReport(report)
    expect(md).toContain('Not computed — no follow-up window was supplied')
  })

  it('handles a fully empty report without throwing and states there is nothing to show', () => {
    const md = renderResearcherReport(emptyReport())
    expect(md).toContain('Participants included: 0')
    expect(md).toContain('no concepts with probe evidence')
  })

  it('never invents a p-value or confidence interval — includes the methodology disclaimer', () => {
    const md = renderResearcherReport(populatedReport())
    expect(md).toMatch(/No p-values, confidence intervals, or effect sizes are computed here/)
  })
})

describe('renderEducatorReport', () => {
  it('separates improving concepts from struggling ones using the gain sign and lowSample flag', () => {
    const md = renderEducatorReport(populatedReport())
    expect(md).toContain('phys.mech.f1')
    // phys.mech.f2 has negative gain but is lowSample, so should not appear in either confident list
    expect(md).not.toMatch(/phys\.mech\.f2.*pass rate/)
  })

  it('reports zero students plainly when the cohort is empty', () => {
    const md = renderEducatorReport(emptyReport())
    expect(md).toContain('No students met the study criteria')
  })

  it('surfaces the misconception repair rate in plain language', () => {
    const md = renderEducatorReport(populatedReport())
    expect(md).toContain('7 of 10 detected misconceptions')
  })

  it('lists authoring priorities as actionable items', () => {
    const md = renderEducatorReport(populatedReport())
    expect(md).toContain('phys.mech.f2')
    expect(md).toContain('Review the explanation tiers')
  })
})

describe('renderExecutiveSummary', () => {
  it('reports headline numbers concisely', () => {
    const summary = renderExecutiveSummary(populatedReport())
    expect(summary).toContain('Participants: 40')
    expect(summary).toContain('Lesson completion rate: 70.0%')
    expect(summary).toContain('Misconception repair rate: 70.0%')
    expect(summary).toContain('decreased')
  })

  it('states retention trend is not yet available when null', () => {
    const report = { ...populatedReport(), retentionTrend: null }
    const summary = renderExecutiveSummary(report)
    expect(summary).toContain('not yet available')
  })

  it('handles an empty report without throwing', () => {
    expect(() => renderExecutiveSummary(emptyReport())).not.toThrow()
  })
})

describe('renderRawMetricsExport', () => {
  it('produces valid JSON that round-trips to the same cohort numbers', () => {
    const { json } = renderRawMetricsExport(populatedReport())
    const parsed = JSON.parse(json)
    expect(parsed.cohort.participantsIncluded).toBe(40)
  })

  it('produces a CSV with one header row plus one row per learning-gain concept', () => {
    const { csv } = renderRawMetricsExport(populatedReport())
    const rows = csv.trim().split('\n')
    expect(rows).toHaveLength(3) // header + 2 concepts
    expect(rows[0]).toBe('conceptId,subject,learners,firstHalfOutcomes,secondHalfOutcomes,firstHalfPassRate,secondHalfPassRate,gain,lowSample')
  })

  it('CSV-escapes fields containing commas or quotes', () => {
    const report = populatedReport()
    report.overall.learningGain[0].conceptId = 'weird,concept"id'
    const { csv } = renderRawMetricsExport(report)
    expect(csv).toContain('"weird,concept""id"')
  })

  it('produces an empty-but-valid CSV (header only) for an empty report', () => {
    const { csv } = renderRawMetricsExport(emptyReport())
    expect(csv.trim().split('\n')).toHaveLength(1)
  })

  it('is deterministic — identical report yields byte-identical export', () => {
    const report = populatedReport()
    const a = renderRawMetricsExport(report)
    const b = renderRawMetricsExport(report)
    expect(a.json).toBe(b.json)
    expect(a.csv).toBe(b.csv)
  })
})
