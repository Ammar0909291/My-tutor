/**
 * Failure Analytics Dashboard — Claude Recommendation #9.
 *
 * Surfaces actionable educational intelligence from the EXISTING Evidence
 * Loop and analytics layers. This module is a REPORTING layer only: it
 * assembles, cross-tabulates, and ranks outputs that already exist
 * elsewhere in the codebase — it computes no probe pass rates, no
 * misconception counts, no mastery/decay math a second time. Everything
 * that already has a home keeps living there; this file is the missing
 * piece that was never built: nothing previously combined
 * computeLearningAnalytics / buildAuthoringFeedback / buildPackageFeedback
 * / the Spaced Retrieval Scheduler / spineSignals' worked-example
 * effectiveness into one dashboard, and nothing ranked authoring findings
 * by actual impact magnitude rather than a 2-band severity tag.
 *
 * Reuses, never duplicates:
 *   - Learning Analytics (learningAnalytics.ts) — mostFailedConcepts,
 *     mostCommonMisconceptions, recoverySuccessRates,
 *     conceptsRequiringRepeatedRemediation, dropOffPoints all pass through
 *     verbatim; probeEffectiveness is only RE-SORTED (weakest first), the
 *     underlying rate/discrimination numbers are untouched.
 *   - Authoring Feedback (authoringFeedback.ts) — buildAuthoringFeedback's
 *     findings pass through verbatim (generatedFrom + findings list); this
 *     module never recomputes a finding, it only re-ranks the SAME findings
 *     by a numeric impact score joined back onto the SAME analytics numbers
 *     that produced them.
 *   - Educational Package Feedback (packageFeedback.ts) —
 *     buildPackageFeedback's per-package reports pass through verbatim as
 *     "package effectiveness".
 *   - The Evidence Spine's worked-example-effectiveness view
 *     (spineSignals.ts) — computeWorkedExampleEffectiveness passes through
 *     verbatim when spine decisions are available; this is the FIRST live
 *     consumer (previously computed and tested, never wired to a caller).
 *   - The Spaced Retrieval Scheduler (retrieval/spacedRetrievalScheduler.ts)
 *     — per-learner ReviewQueue objects are aggregated into cross-learner
 *     review queue statistics; scheduleReviews() itself is never
 *     reimplemented, only its outputs are rolled up.
 *   - Student Intelligence (buildStudentIntelligence) — the impure loader
 *     builds one profile per learner directly from the ALREADY-LOADED
 *     evidence corpus (no per-learner DB round trip) to produce the
 *     ReviewQueue inputs above.
 *   - Educational Packages (packageRuntime/loader.ts's hasPackageArtifact,
 *     evidenceLoad.ts's artifactPackageInspector) — existence/inspection
 *     only, never content generation.
 *
 * Genuinely new (small, additive, reporting-only):
 *   - aggregateReviewQueueStats: cross-learner rollup of ReviewQueue[].
 *   - rankAuthoringPriorities: joins AuthoringFeedbackReport findings back
 *     onto the LearningAnalytics numbers that produced them to compute a
 *     numeric impact score (severity weight × evidence magnitude), so
 *     "rank everything by impact" is a real ranking, not just a severity
 *     band tie-broken alphabetically.
 *   - findConceptsNeedingMoreProbes: a new cross-tabulation of
 *     probeEffectiveness (grouped by conceptId) flagging concepts that
 *     have real teaching volume but only zero/one distinct probe variant
 *     authored — the one Authoring Insight bullet nothing existing
 *     computed (weak_probe flags a BAD probe; this flags a MISSING one).
 *
 * Pure core (buildFailureAnalyticsDashboard) + one impure loader
 * (loadFailureAnalyticsDashboard), mirroring the convention already
 * established by evidenceReader.ts / studentIntelligence/index.ts /
 * spineSignals.ts / retrieval/spacedRetrievalScheduler.ts.
 *
 * Build reporting only — this module never edits a blueprint, a package,
 * a lesson, or any runtime teaching decision. No lesson content is
 * generated anywhere in this file.
 */
import {
  computeLearningAnalytics,
  type LearningAnalytics,
  type ConceptFailureStat,
  type MisconceptionStat,
  type RecoveryStat,
  type ProbeEffectivenessStat,
  type RemediationStat,
  type DropOffStat,
} from '../evidence/learningAnalytics'
import {
  buildAuthoringFeedback,
  type AuthoringFeedbackReport,
  type AuthoringFinding,
  type AuthoringThresholds,
  type PackageInspector,
  DEFAULT_AUTHORING_THRESHOLDS,
} from '../evidence/authoringFeedback'
import { buildPackageFeedback, type PackageFeedback } from '../evidence/packageFeedback'
import type { LessonEvidence } from '../evidence/evidenceReader'
import type { WorkedExampleEffectiveness } from '../evidence/spineSignals'
import type { ReviewQueue, MaintenanceStatus } from '../retrieval/spacedRetrievalScheduler'

// ── Review queue statistics (new: cross-learner rollup) ──────────────────────

export interface LearnerReviewQueue {
  userId: string
  queue: ReviewQueue
}

export interface ReviewQueueStats {
  learnersWithReviews: number
  totalScheduled: number
  totalOverdue: number
  totalDueToday: number
  totalUpcoming: number
  avgForgettingRisk: number | null
  byMaintenanceStatus: Record<MaintenanceStatus, number>
  /** Concepts overdue for the most learners, most-overdue-days first. */
  topOverdueConcepts: Array<{ conceptId: string; subject: string; learners: number; maxDaysOverdue: number }>
}

/** Pure: rolls up per-learner ReviewQueue objects (already produced by
 *  scheduleReviews) into cross-learner review-queue statistics. Never
 *  recomputes a schedule, a forgetting risk, or a priority — only counts
 *  and averages what's already there. */
export function aggregateReviewQueueStats(learnerQueues: LearnerReviewQueue[]): ReviewQueueStats {
  let totalOverdue = 0, totalDueToday = 0, totalUpcoming = 0
  let riskSum = 0, riskCount = 0
  const byStatus: Record<MaintenanceStatus, number> = { stable: 0, at_risk: 0, overdue: 0, critical: 0 }
  const byConcept = new Map<string, { subject: string; learners: Set<string>; maxDaysOverdue: number }>()

  for (const { userId, queue } of learnerQueues) {
    totalOverdue += queue.overdue.length
    totalDueToday += queue.dueToday.length
    totalUpcoming += queue.upcoming.length
    for (const r of queue.all) {
      riskSum += r.forgettingRisk
      riskCount++
      byStatus[r.maintenanceStatus]++
      if (r.overdue) {
        const cur = byConcept.get(r.conceptId) ?? { subject: r.subject, learners: new Set<string>(), maxDaysOverdue: 0 }
        cur.learners.add(userId)
        cur.maxDaysOverdue = Math.max(cur.maxDaysOverdue, r.daysOverdue)
        byConcept.set(r.conceptId, cur)
      }
    }
  }

  const topOverdueConcepts = [...byConcept.entries()]
    .map(([conceptId, v]) => ({ conceptId, subject: v.subject, learners: v.learners.size, maxDaysOverdue: v.maxDaysOverdue }))
    .sort((a, b) => b.learners - a.learners || b.maxDaysOverdue - a.maxDaysOverdue || a.conceptId.localeCompare(b.conceptId))

  return {
    learnersWithReviews: learnerQueues.filter((lq) => lq.queue.all.length > 0).length,
    totalScheduled: learnerQueues.reduce((sum, lq) => sum + lq.queue.all.length, 0),
    totalOverdue,
    totalDueToday,
    totalUpcoming,
    avgForgettingRisk: riskCount > 0 ? riskSum / riskCount : null,
    byMaintenanceStatus: byStatus,
    topOverdueConcepts,
  }
}

// ── Authoring priorities (new: impact-ranked view over existing findings) ────

export interface AuthoringPriority {
  conceptId: string
  subject: string
  kind: AuthoringFinding['kind']
  severity: AuthoringFinding['severity']
  /** severity weight × evidence magnitude — an ordering score, not a
   *  probability. Ties broken by conceptId then kind for reproducibility. */
  impactScore: number
  evidence: string
  action: string
}

const SEVERITY_WEIGHT: Record<AuthoringFinding['severity'], number> = { high: 2, medium: 1 }

/** Joins one AuthoringFinding back onto the SAME LearningAnalytics arrays
 *  that produced it to recover a numeric magnitude (evidence volume), never
 *  duplicating the pass-rate/count math itself — just reading it back out. */
function findingMagnitude(f: AuthoringFinding, analytics: LearningAnalytics): number {
  switch (f.kind) {
    case 'blueprint_needs_revision': {
      const c = analytics.mostFailedConcepts.find((x) => x.id === f.conceptId)
      return c ? c.stat.failures : 1
    }
    case 'weak_misconception': {
      const r = analytics.conceptsRequiringRepeatedRemediation.find((x) => x.conceptId === f.conceptId)
      return r ? r.repeatDetections * Math.max(1, r.learners) : 1
    }
    case 'weak_probe': {
      const total = analytics.probeEffectiveness
        .filter((x) => x.conceptId === f.conceptId)
        .reduce((sum, x) => sum + x.stat.total, 0)
      return total > 0 ? total : 1
    }
    case 'weak_package': {
      const d = analytics.dropOffPoints.find((x) => x.conceptId === f.conceptId)
      return d ? d.abandonedLessons : 1
    }
    case 'missing_worked_examples':
    case 'missing_recovery_strategy': {
      const c = analytics.mostFailedConcepts.find((x) => x.id === f.conceptId)
      return c ? c.stat.failures : 1
    }
    default:
      return 1
  }
}

/** Pure: re-ranks an AuthoringFeedbackReport's findings by a real impact
 *  score (severity weight × evidence magnitude) instead of just the
 *  severity band buildAuthoringFeedback already sorts by — so, e.g., a
 *  "high" finding affecting 50 learners outranks a "high" finding
 *  affecting 2. The underlying findings/evidence/action text are passed
 *  through unchanged; only the ordering and the added impactScore are new. */
export function rankAuthoringPriorities(
  report: AuthoringFeedbackReport,
  analytics: LearningAnalytics,
): AuthoringPriority[] {
  return report.findings
    .map((f) => ({
      conceptId: f.conceptId,
      subject: f.subject,
      kind: f.kind,
      severity: f.severity,
      impactScore: SEVERITY_WEIGHT[f.severity] * findingMagnitude(f, analytics),
      evidence: f.evidence,
      action: f.action,
    }))
    .sort(
      (a, b) =>
        b.impactScore - a.impactScore ||
        a.conceptId.localeCompare(b.conceptId) ||
        a.kind.localeCompare(b.kind),
    )
}

// ── Concepts needing more mastery probes (new: probe-variety gap finder) ─────

export interface ProbeCoverageGap {
  conceptId: string
  subject: string
  /** distinct probe/placement keys observed for this concept (0 or 1 = gap) */
  distinctProbes: number
  totalOutcomes: number
}

/** Pure: flags concepts with real teaching volume (≥ minOutcomesToFlag probe
 *  outcomes) but at most one distinct probe variant ever asked — a coverage
 *  gap distinct from probeEffectiveness's "weak_probe" (a BAD probe); this
 *  is a MISSING one. Reads analytics.probeEffectiveness's already-computed
 *  per-(concept,probe) totals; computes nothing about pass rates itself. */
export function findConceptsNeedingMoreProbes(
  analytics: LearningAnalytics,
  lessons: LessonEvidence[],
  minOutcomesToFlag = 5,
): ProbeCoverageGap[] {
  const subjectByConcept = new Map<string, string>()
  for (const l of lessons) subjectByConcept.set(l.conceptId, l.subject)

  const byConcept = new Map<string, { probes: Set<string>; total: number }>()
  for (const p of analytics.probeEffectiveness) {
    const cur = byConcept.get(p.conceptId) ?? { probes: new Set<string>(), total: 0 }
    cur.probes.add(p.probe)
    cur.total += p.stat.total
    byConcept.set(p.conceptId, cur)
  }

  return [...byConcept.entries()]
    .filter(([, v]) => v.probes.size <= 1 && v.total >= minOutcomesToFlag)
    .map(([conceptId, v]) => ({
      conceptId,
      subject: subjectByConcept.get(conceptId) ?? conceptId.split('.')[0],
      distinctProbes: v.probes.size,
      totalOutcomes: v.total,
    }))
    .sort((a, b) => b.totalOutcomes - a.totalOutcomes || a.conceptId.localeCompare(b.conceptId))
}

// ── Weakest mastery probes (new: re-sort only, zero recomputation) ──────────

/** Non-discriminating probes first (a quality failure regardless of rate),
 *  then ascending pass rate (harder/most-failed next), then descending
 *  sample size (more confidently weak), then a stable id tiebreak. */
function byWeakestProbeFirst(a: ProbeEffectivenessStat, b: ProbeEffectivenessStat): number {
  if (a.discriminates !== b.discriminates) return a.discriminates ? 1 : -1
  return (
    a.stat.rate - b.stat.rate ||
    b.stat.total - a.stat.total ||
    a.conceptId.localeCompare(b.conceptId) ||
    a.probe.localeCompare(b.probe)
  )
}

// ── The dashboard ─────────────────────────────────────────────────────────────

export interface FailureAnalyticsDashboard {
  generatedFrom: { lessonsAnalyzed: number; conceptsSeen: number; learnersSeen: number }
  mostFailedConcepts: ConceptFailureStat[]
  mostCommonMisconceptions: MisconceptionStat[]
  recoverySuccessRates: RecoveryStat[]
  weakestMasteryProbes: ProbeEffectivenessStat[]
  conceptsRequiringRepeatedRemediation: RemediationStat[]
  highestDropOff: DropOffStat[]
  reviewQueueStats: ReviewQueueStats
  packageEffectiveness: PackageFeedback[]
  /** null when no Evidence Spine decisions were supplied — an enrichment,
   *  never a requirement (spine data may not exist for every deployment). */
  workedExampleEffectiveness: WorkedExampleEffectiveness | null
  /** The untouched authoring-feedback report (findings + generatedFrom),
   *  passed through verbatim for full traceability. */
  authoringFindings: AuthoringFeedbackReport
  authoringPriorities: AuthoringPriority[]
  conceptsNeedingMoreProbes: ProbeCoverageGap[]
}

/**
 * Pure: assembles the full Failure Analytics Dashboard from already-loaded
 * evidence + already-scheduled reviews. Deterministic — same inputs, same
 * dashboard, byte-identical; no I/O, no Date.now(), no randomness.
 */
export function buildFailureAnalyticsDashboard(
  lessons: LessonEvidence[],
  learnerReviewQueues: LearnerReviewQueue[],
  inspectPackage: PackageInspector,
  workedExampleEffectiveness: WorkedExampleEffectiveness | null = null,
  thresholds: AuthoringThresholds = DEFAULT_AUTHORING_THRESHOLDS,
): FailureAnalyticsDashboard {
  const analytics = computeLearningAnalytics(lessons)
  const authoringFindings = buildAuthoringFeedback(analytics, lessons, inspectPackage, thresholds)
  const packageEffectiveness = buildPackageFeedback(lessons, inspectPackage)

  return {
    generatedFrom: {
      lessonsAnalyzed: analytics.lessonsAnalyzed,
      conceptsSeen: analytics.conceptsSeen,
      learnersSeen: new Set(lessons.map((l) => l.userId)).size,
    },
    mostFailedConcepts: analytics.mostFailedConcepts,
    mostCommonMisconceptions: analytics.mostCommonMisconceptions,
    recoverySuccessRates: analytics.recoverySuccessRates,
    weakestMasteryProbes: [...analytics.probeEffectiveness].sort(byWeakestProbeFirst),
    conceptsRequiringRepeatedRemediation: analytics.conceptsRequiringRepeatedRemediation,
    highestDropOff: analytics.dropOffPoints,
    reviewQueueStats: aggregateReviewQueueStats(learnerReviewQueues),
    packageEffectiveness,
    workedExampleEffectiveness,
    authoringFindings,
    authoringPriorities: rankAuthoringPriorities(authoringFindings, analytics),
    conceptsNeedingMoreProbes: findConceptsNeedingMoreProbes(analytics, lessons),
  }
}

// ── Impure loader (the only impure export in this file) ──────────────────────

export interface LoadDashboardOptions {
  since?: Date
  now?: Date
}

/**
 * Loads the full evidence corpus ONCE (reusing the Evidence Loop), derives
 * one Student Intelligence profile + review queue per learner directly
 * from that already-loaded corpus (no per-learner DB round trip), enriches
 * with worked-example effectiveness via the Evidence Spine (best-effort),
 * and assembles the dashboard. Read-only throughout; never throws — a
 * missing enrichment source (spine, packages) degrades that one field to
 * null rather than failing the whole report.
 */
export async function loadFailureAnalyticsDashboard(
  options: LoadDashboardOptions = {},
): Promise<FailureAnalyticsDashboard> {
  const now = options.now ?? new Date()

  const { loadEvidenceCorpus, artifactPackageInspector } = await import('../evidence/evidenceLoad')
  const { readLessonEvidence } = await import('../evidence/evidenceReader')
  const { buildStudentIntelligence } = await import('../studentIntelligence/studentIntelligence')
  const { scheduleReviews } = await import('../retrieval/spacedRetrievalScheduler')

  const corpus = await loadEvidenceCorpus({ since: options.since })
  const lessons = readLessonEvidence(corpus)

  let packageAvailability: ((conceptId: string) => boolean) | undefined
  try {
    const { hasPackageArtifact } = await import('@/lib/curriculum/packageRuntime/loader')
    packageAvailability = hasPackageArtifact
  } catch {
    // Educational Package Runtime unavailable in this environment — degrade
    // to hasEducationalPackage: null on every scheduled review, never fatal.
  }

  const lessonsByUser = new Map<string, LessonEvidence[]>()
  for (const l of lessons) {
    const arr = lessonsByUser.get(l.userId) ?? []
    arr.push(l)
    lessonsByUser.set(l.userId, arr)
  }

  const learnerReviewQueues: LearnerReviewQueue[] = []
  for (const [userId, userLessons] of lessonsByUser) {
    const profile = buildStudentIntelligence(userId, userLessons, { now })
    learnerReviewQueues.push({ userId, queue: scheduleReviews(profile, { now, packageAvailability }) })
  }

  let workedExampleEffectiveness: WorkedExampleEffectiveness | null = null
  try {
    const { mapTurnsToLessons, computeLessonSpineSignals, attachSpineSignals, computeWorkedExampleEffectiveness, loadSpineDecisions } =
      await import('../evidence/spineSignals')
    const turnIds = [...new Set(corpus.events.map((e) => e.turnId).filter((t): t is string => t !== null))]
    const decisions = await loadSpineDecisions(turnIds)
    const turnToLesson = mapTurnsToLessons(corpus.events)
    const signals = computeLessonSpineSignals(decisions, turnToLesson)
    const enriched = attachSpineSignals(lessons, signals)
    workedExampleEffectiveness = computeWorkedExampleEffectiveness(enriched)
  } catch {
    // Evidence Spine unavailable or empty — dashboard still assembles
    // fully, just without this one enrichment.
  }

  return buildFailureAnalyticsDashboard(lessons, learnerReviewQueues, artifactPackageInspector, workedExampleEffectiveness)
}
