/**
 * Authoring Feedback — ADR 13 Phase 2 / validation/08's curriculum-feedback
 * loop turned into events: deterministic reports that tell the AUTHORING side
 * (blueprints + Educational Packages) what the accumulated lesson evidence
 * says needs revision. Pure: analytics + package inspection in, typed report
 * out; never edits a blueprint or a package, never touches the DB.
 *
 * Every finding cites its evidence numbers so a curriculum author can verify
 * the claim before acting — an unexplainable finding is an invented finding
 * (student-state/09's decision-provenance law, applied to authoring).
 */
import type { LearningAnalytics } from './learningAnalytics'
import type { LessonEvidence } from './evidenceReader'

/** What the authoring layer needs to know about a compiled package.
 *  Injected (evidenceLoad.ts provides the brain/packages implementation)
 *  so this module stays fs-free and testable. */
export type PackageInspector = (conceptId: string) => {
  packageId: string
  contentHash: string
  assetKinds: Set<string>
} | null

export interface AuthoringFinding {
  conceptId: string
  subject: string
  kind:
    | 'blueprint_needs_revision'
    | 'weak_misconception'
    | 'weak_probe'
    | 'missing_worked_examples'
    | 'missing_recovery_strategy'
    | 'weak_package'
  severity: 'high' | 'medium'
  evidence: string   // the numbers behind the finding, human-readable
  action: string     // what the author should do
}

export interface AuthoringFeedbackReport {
  generatedFrom: { lessonsAnalyzed: number; conceptsSeen: number }
  findings: AuthoringFinding[]
}

export interface AuthoringThresholds {
  /** probe pass rate at/below which a concept's teaching needs revision */
  failingPassRate: number
  /** minimum probe outcomes before a concept can be flagged at all */
  minSample: number
  /** repeat misconception detections (per remediation stat) to flag repair */
  minRepeatDetections: number
  /** abandoned-lesson rate to flag a drop-off point */
  dropOffRate: number
}

export const DEFAULT_AUTHORING_THRESHOLDS: AuthoringThresholds = {
  failingPassRate: 0.5,
  minSample: 5,
  minRepeatDetections: 2,
  dropOffRate: 0.3,
}

export function buildAuthoringFeedback(
  analytics: LearningAnalytics,
  lessons: LessonEvidence[],
  inspectPackage: PackageInspector,
  thresholds: AuthoringThresholds = DEFAULT_AUTHORING_THRESHOLDS,
): AuthoringFeedbackReport {
  const findings: AuthoringFinding[] = []
  const subjectByConcept = new Map<string, string>()
  for (const l of lessons) subjectByConcept.set(l.conceptId, l.subject)
  const subjectOf = (c: string) => subjectByConcept.get(c) ?? c.split('.')[0]

  // Blueprints needing revision: sustained probe failure.
  for (const c of analytics.mostFailedConcepts) {
    if (c.stat.rate <= thresholds.failingPassRate && c.stat.total >= thresholds.minSample) {
      findings.push({
        conceptId: c.id,
        subject: c.subject,
        kind: 'blueprint_needs_revision',
        severity: c.stat.rate <= thresholds.failingPassRate / 2 ? 'high' : 'medium',
        evidence: `probe pass rate ${(c.stat.rate * 100).toFixed(0)}% over ${c.stat.total} outcomes (${c.stat.failures} failures)`,
        action: 'Review the explanation tiers and worked-example progression in the blueprint; the current teaching sequence is not producing passing probes.',
      })
    }
  }

  // Weak misconceptions: repair that doesn't hold (repeat detections in the
  // same learner across lessons).
  for (const r of analytics.conceptsRequiringRepeatedRemediation) {
    if (r.repeatDetections >= thresholds.minRepeatDetections) {
      findings.push({
        conceptId: r.conceptId,
        subject: subjectOf(r.conceptId),
        kind: 'weak_misconception',
        severity: r.learners > 1 ? 'high' : 'medium',
        evidence: `${r.repeatDetections} repeat detections across ${r.learners} learner(s) in separate lessons — the repair is not holding`,
        action: 'Redesign the misconception repair sequence (collision evidence + replacement) in the blueprint; regrowth after repair means the collision is not landing.',
      })
    }
  }

  // Weak probes: no discrimination at sample size.
  for (const p of analytics.probeEffectiveness) {
    if (!p.discriminates) {
      const direction = p.stat.rate >= 0.5 ? 'everyone passes (too easy or leading)' : 'everyone fails (too hard or miscalibrated)'
      findings.push({
        conceptId: p.conceptId,
        subject: subjectOf(p.conceptId),
        kind: 'weak_probe',
        severity: 'medium',
        evidence: `probe "${p.probe || 'default'}": pass rate ${(p.stat.rate * 100).toFixed(0)}% over ${p.stat.total} outcomes — ${direction}`,
        action: 'Rewrite the probe so it separates understanding from non-understanding; a probe that everyone passes or everyone fails measures nothing.',
      })
    }
  }

  // Missing worked examples / recovery strategies: failure evidence on a
  // concept whose compiled package lacks the corresponding asset kind.
  const failingConcepts = new Set(
    analytics.mostFailedConcepts
      .filter((c) => c.stat.rate <= thresholds.failingPassRate && c.stat.total >= thresholds.minSample)
      .map((c) => c.id),
  )
  const conceptsWithRecoveries = new Set<string>()
  for (const l of lessons) if (l.recoveries.length > 0) conceptsWithRecoveries.add(l.conceptId)

  const inspected = new Set<string>()
  for (const conceptId of [...failingConcepts, ...conceptsWithRecoveries].sort()) {
    if (inspected.has(conceptId)) continue
    inspected.add(conceptId)
    const pkg = inspectPackage(conceptId)
    if (!pkg) continue
    if (failingConcepts.has(conceptId) && !pkg.assetKinds.has('worked_example')) {
      findings.push({
        conceptId,
        subject: subjectOf(conceptId),
        kind: 'missing_worked_examples',
        severity: 'high',
        evidence: `concept is failing at probe level and package ${pkg.packageId} carries zero worked_example assets`,
        action: 'Author worked examples (concrete → abstract progression) in the blueprint; failure without examples to walk through is the most repairable authoring gap.',
      })
    }
    if (conceptsWithRecoveries.has(conceptId) && !pkg.assetKinds.has('session_flow') && !pkg.assetKinds.has('adaptive_rule')) {
      findings.push({
        conceptId,
        subject: subjectOf(conceptId),
        kind: 'missing_recovery_strategy',
        severity: 'medium',
        evidence: `learners hit recovery states on this concept and package ${pkg.packageId} authors neither session_flow nor adaptive_rule assets`,
        action: 'Author a session flow with recovery branches (or adaptive rules) so stuck-learner handling is concept-specific rather than generic.',
      })
    }
  }

  // Weak packages: high drop-off — the strongest churn signature the
  // product produces (decision-engine/07 §8 rule 3).
  for (const d of analytics.dropOffPoints) {
    if (d.rate >= thresholds.dropOffRate) {
      findings.push({
        conceptId: d.conceptId,
        subject: subjectOf(d.conceptId),
        kind: 'weak_package',
        severity: d.rate >= thresholds.dropOffRate * 2 ? 'high' : 'medium',
        evidence: `${d.abandonedLessons} of ${d.totalLessons} lessons ended failure-then-vanish (${(d.rate * 100).toFixed(0)}% drop-off)`,
        action: 'Treat as the top authoring priority for this subject: the concept is losing learners at the terminal-failure point. Audit its entry difficulty, first worked example, and failure handling.',
      })
    }
  }

  // Deterministic ordering: severity, then kind, then concept.
  const severityRank = { high: 0, medium: 1 }
  findings.sort(
    (a, b) =>
      severityRank[a.severity] - severityRank[b.severity] ||
      a.kind.localeCompare(b.kind) ||
      a.conceptId.localeCompare(b.conceptId),
  )

  return {
    generatedFrom: {
      lessonsAnalyzed: analytics.lessonsAnalyzed,
      conceptsSeen: analytics.conceptsSeen,
    },
    findings,
  }
}

/** Deterministic markdown rendering of the report (stable ordering inherited
 *  from buildAuthoringFeedback; no timestamps — same input, same bytes). */
export function renderAuthoringFeedbackMarkdown(report: AuthoringFeedbackReport): string {
  const lines: string[] = []
  lines.push('# Authoring Feedback Report')
  lines.push('')
  lines.push(`Evidence base: ${report.generatedFrom.lessonsAnalyzed} lessons across ${report.generatedFrom.conceptsSeen} concepts.`)
  lines.push('')
  if (report.findings.length === 0) {
    lines.push('No findings — either the evidence base is too small or no authored content is underperforming its thresholds.')
    return lines.join('\n') + '\n'
  }
  lines.push('| Severity | Finding | Concept | Evidence | Action |')
  lines.push('|---|---|---|---|---|')
  for (const f of report.findings) {
    lines.push(`| ${f.severity} | ${f.kind} | ${f.conceptId} | ${f.evidence} | ${f.action} |`)
  }
  return lines.join('\n') + '\n'
}
