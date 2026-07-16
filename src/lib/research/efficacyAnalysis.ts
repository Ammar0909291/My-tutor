/**
 * Educational Efficacy Study — Analysis Pipeline (Claude Recommendation #11,
 * Phase 4). Turns real evidence into the descriptive statistics the study
 * protocol (docs/research/EFFICACY_STUDY_PROTOCOL.md) defines. This module
 * NEVER fabricates, simulates, or estimates data — every number is computed
 * from real `LessonEvidence`/`StudentIntelligence`/evidence-loop rows an
 * operator supplies; an empty input produces an honestly-empty report, never
 * a placeholder.
 *
 * Reuses, never duplicates (see the protocol's §11 reuse map):
 *   - Learning Analytics — averageMasteryTime, recoverySuccessRates,
 *     probeEffectiveness, mostFailedConcepts, mostCommonMisconceptions
 *     pass through verbatim.
 *   - Student Intelligence — buildStudentIntelligence's ConceptState /
 *     MisconceptionState / EngagementPattern are the source for the new
 *     cohort-level rollups below (learning gain, misconception repair,
 *     aggregated engagement) — this module never recomputes forgetting
 *     risk, mastery, or misconception activity itself.
 *   - Spaced Retrieval Scheduler — scheduleReviews/ReviewQueueStats feed
 *     the retention-trend comparison; the decay law itself is untouched.
 *   - Failure Analytics Dashboard — buildPackageFeedback and
 *     rankAuthoringPriorities pass through verbatim for package
 *     effectiveness / authoring-priority context.
 *
 * Genuinely new here: cohort/eligibility filtering, learning-gain
 * (first-half vs second-half probe pass rate), misconception-repair-rate
 * rollup, lesson-completion rollup, cohort engagement aggregation,
 * two-window retention-trend comparison, and per-subject slicing — all
 * small compositions over already-computed numbers, never new telemetry.
 *
 * Pure core (buildEfficacyStudyReport, computeLearningGain, etc.) + one
 * impure loader (loadEfficacyStudyReport), matching the convention already
 * established by every other evidence module in this codebase.
 */
import { computeLearningAnalytics, type LearningAnalytics, type MasteryTimeStat, type RecoveryStat } from '../teaching/evidence/learningAnalytics'
import { buildAuthoringFeedback, DEFAULT_AUTHORING_THRESHOLDS, type PackageInspector } from '../teaching/evidence/authoringFeedback'
import { buildPackageFeedback, type PackageFeedback } from '../teaching/evidence/packageFeedback'
import { rankAuthoringPriorities, type AuthoringPriority } from '../teaching/dashboard/failureAnalyticsDashboard'
import type { LessonEvidence } from '../teaching/evidence/evidenceReader'
import { buildStudentIntelligence, type StudentIntelligence, type EngagementPattern } from '../teaching/studentIntelligence/studentIntelligence'
import { scheduleReviews, type ReviewQueue } from '../teaching/retrieval/spacedRetrievalScheduler'
import { aggregateReviewQueueStats, type LearnerReviewQueue, type ReviewQueueStats } from '../teaching/dashboard/failureAnalyticsDashboard'

// ── Eligibility / cohort filtering ───────────────────────────────────────────

export interface StudyEligibilityCriteria {
  /** Explicit, operator-supplied, consented participant list. Required —
   *  this module never treats "everyone in the evidence corpus" as the
   *  cohort (see protocol §6/§10: no consent field exists in the schema,
   *  so the allowlist IS the consent boundary). An empty array is valid
   *  (yields an honestly-empty report) but is never defaulted to "all". */
  participantUserIds: string[]
  studyStart: Date
  studyEnd: Date
  /** Inclusion floor: a learner needs at least this many distinct lessons
   *  (userId, sessionId, conceptId episodes) in the window to count.
   *  Default 3 (protocol §5). */
  minLessonsPerLearner?: number
  /** Restrict to specific subjects; omit to include all. */
  subjects?: string[]
}

const DEFAULT_MIN_LESSONS_PER_LEARNER = 3
/** Below this many probe outcomes, a concept-level stat is flagged as a
 *  low-confidence caveat rather than silently trusted (protocol §7/§9). */
export const MIN_SAMPLE = 5

/** Pure: applies the study's inclusion/exclusion criteria to a raw
 *  LessonEvidence corpus. Returns the eligible subset plus counts of what
 *  was excluded and why — nothing is silently dropped without being
 *  reflected in the report's cohort summary. */
export function filterEligibleLessons(
  lessons: LessonEvidence[],
  criteria: StudyEligibilityCriteria,
): { eligible: LessonEvidence[]; participantsIncluded: number; participantsExcluded: number } {
  const participantSet = new Set(criteria.participantUserIds)
  const subjectSet = criteria.subjects ? new Set(criteria.subjects) : null
  const minLessons = criteria.minLessonsPerLearner ?? DEFAULT_MIN_LESSONS_PER_LEARNER

  const inWindow = lessons.filter((l) => {
    if (!participantSet.has(l.userId)) return false
    if (subjectSet && !subjectSet.has(l.subject)) return false
    if (l.firstEventAt.getTime() < criteria.studyStart.getTime()) return false
    if (l.firstEventAt.getTime() > criteria.studyEnd.getTime()) return false
    return true
  })

  const lessonCountByUser = new Map<string, number>()
  for (const l of inWindow) lessonCountByUser.set(l.userId, (lessonCountByUser.get(l.userId) ?? 0) + 1)

  const eligibleUsers = new Set(
    [...lessonCountByUser.entries()].filter(([, count]) => count >= minLessons).map(([userId]) => userId),
  )

  return {
    eligible: inWindow.filter((l) => eligibleUsers.has(l.userId)),
    participantsIncluded: eligibleUsers.size,
    participantsExcluded: participantSet.size - eligibleUsers.size,
  }
}

// ── Learning gain ─────────────────────────────────────────────────────────────

export interface LearningGainStat {
  conceptId: string
  subject: string
  learners: number
  firstHalfOutcomes: number
  secondHalfOutcomes: number
  firstHalfPassRate: number | null
  secondHalfPassRate: number | null
  /** secondHalfPassRate − firstHalfPassRate; null if either half has zero
   *  probe outcomes (never fabricated as 0). */
  gain: number | null
  /** True when firstHalfOutcomes + secondHalfOutcomes < MIN_SAMPLE — this
   *  row should be read as a low-confidence signal, not a finding. */
  lowSample: boolean
}

/** Pure: for each concept, splits every probe outcome across the WHOLE
 *  cohort into first-half/second-half by time order and compares pass
 *  rates — the same "compare halves of an observation window" pattern
 *  Student Intelligence already uses for confidence/latency trends,
 *  applied here to probe correctness instead. Concepts with zero probe
 *  evidence are omitted (nothing to measure), not reported as zero gain. */
export function computeLearningGain(lessons: LessonEvidence[]): LearningGainStat[] {
  const byConcept = new Map<string, { subject: string; learners: Set<string>; probes: Array<{ at: number; passed: boolean }> }>()
  for (const l of lessons) {
    if (l.probes.length === 0) continue
    const cur = byConcept.get(l.conceptId) ?? { subject: l.subject, learners: new Set<string>(), probes: [] }
    cur.learners.add(l.userId)
    for (const p of l.probes) cur.probes.push({ at: p.occurredAt.getTime(), passed: p.passed })
    byConcept.set(l.conceptId, cur)
  }

  const out: LearningGainStat[] = []
  for (const [conceptId, v] of byConcept) {
    const ordered = [...v.probes].sort((a, b) => a.at - b.at)
    const mid = Math.floor(ordered.length / 2)
    const firstHalf = ordered.slice(0, mid)
    const secondHalf = ordered.slice(mid)
    const rate = (xs: Array<{ passed: boolean }>) => (xs.length > 0 ? xs.filter((x) => x.passed).length / xs.length : null)
    const firstHalfPassRate = rate(firstHalf)
    const secondHalfPassRate = rate(secondHalf)
    out.push({
      conceptId,
      subject: v.subject,
      learners: v.learners.size,
      firstHalfOutcomes: firstHalf.length,
      secondHalfOutcomes: secondHalf.length,
      firstHalfPassRate,
      secondHalfPassRate,
      gain: firstHalfPassRate !== null && secondHalfPassRate !== null ? secondHalfPassRate - firstHalfPassRate : null,
      lowSample: ordered.length < MIN_SAMPLE,
    })
  }
  return out.sort((a, b) => a.conceptId.localeCompare(b.conceptId))
}

// ── Misconception repair rate ─────────────────────────────────────────────────

export interface MisconceptionRepairStat {
  totalDetected: number
  totalDormant: number
  totalActive: number
  /** totalDormant / totalDetected; 0 when totalDetected is 0 (never null —
   *  this is a count-based rate, not a probe rate, so 0/0 is a real 0). */
  repairRate: number
  meanRegrowths: number
  lowSample: boolean
}

/** Pure: rolls up Student Intelligence's per-learner misconception ledger
 *  (already computed — activity/regrowths are never recomputed here)
 *  across a cohort of profiles. */
export function computeMisconceptionRepairRate(profiles: StudentIntelligence[]): MisconceptionRepairStat {
  let dormant = 0, active = 0, regrowthSum = 0, count = 0
  for (const p of profiles) {
    for (const m of p.misconceptionHistory) {
      count++
      if (m.activity === 'dormant') dormant++
      else active++
      regrowthSum += m.regrowths
    }
  }
  return {
    totalDetected: count,
    totalDormant: dormant,
    totalActive: active,
    repairRate: count > 0 ? dormant / count : 0,
    meanRegrowths: count > 0 ? regrowthSum / count : 0,
    lowSample: count < MIN_SAMPLE,
  }
}

// ── Lesson completion ─────────────────────────────────────────────────────────

export interface LessonCompletionStat {
  totalLessons: number
  completedOrMastered: number
  completionRate: number
  lowSample: boolean
}

/** Pure: rolls up the Evidence Reader's own outcome classification
 *  (`mastered`/`progressing` count as completed; `struggling`/`abandoned`/
 *  `no_signal` do not) — reuses the classification verbatim, never
 *  re-derives it. */
export function computeLessonCompletionRate(lessons: LessonEvidence[]): LessonCompletionStat {
  const withSignal = lessons.filter((l) => l.outcome !== 'no_signal')
  const completed = withSignal.filter((l) => l.outcome === 'mastered' || l.outcome === 'progressing').length
  return {
    totalLessons: withSignal.length,
    completedOrMastered: completed,
    completionRate: withSignal.length > 0 ? completed / withSignal.length : 0,
    lowSample: withSignal.length < MIN_SAMPLE,
  }
}

// ── Cohort engagement ─────────────────────────────────────────────────────────

export interface CohortEngagement {
  learners: number
  meanSessionsPerLearner: number | null
  meanAbandonedRate: number | null
  meanLessonSpanMinutes: number | null
  meanLongestGapDays: number | null
}

/** Pure: aggregates per-learner EngagementPattern (already computed by
 *  Student Intelligence) into a cohort mean. Learners with a null field
 *  (insufficient evidence for that field) are excluded from that field's
 *  mean rather than treated as zero. */
export function aggregateEngagement(profiles: StudentIntelligence[]): CohortEngagement {
  const mean = (xs: Array<number | null>) => {
    const vals = xs.filter((x): x is number => x !== null)
    return vals.length > 0 ? vals.reduce((a, b) => a + b, 0) / vals.length : null
  }
  const engagements: EngagementPattern[] = profiles.map((p) => p.engagement)
  return {
    learners: profiles.length,
    meanSessionsPerLearner: mean(engagements.map((e) => e.sessionsObserved)),
    meanAbandonedRate: mean(engagements.map((e) => e.abandonedRate)),
    meanLessonSpanMinutes: mean(engagements.map((e) => e.meanLessonSpanMinutes)),
    meanLongestGapDays: mean(engagements.map((e) => e.longestGapDays)),
  }
}

// ── Retention trend (two-window comparison) ──────────────────────────────────

export interface RetentionTrend {
  baseline: ReviewQueueStats
  followUp: ReviewQueueStats
  /** followUp.avgForgettingRisk − baseline.avgForgettingRisk; negative
   *  means retention improved (risk went down). Null if either window
   *  has no scheduled reviews to average. */
  avgForgettingRiskDelta: number | null
}

/** Pure: compares two ALREADY-COMPUTED ReviewQueueStats snapshots (one per
 *  time window) — reuses aggregateReviewQueueStats's own output type,
 *  never recomputes the decay law. Per protocol §8/§10, generating a real
 *  trend requires running this analysis pipeline twice, weeks apart, on
 *  real data — this function only performs the (trivial, honest)
 *  subtraction once both snapshots exist. */
export function computeRetentionTrend(baseline: ReviewQueueStats, followUp: ReviewQueueStats): RetentionTrend {
  return {
    baseline,
    followUp,
    avgForgettingRiskDelta:
      baseline.avgForgettingRisk !== null && followUp.avgForgettingRisk !== null
        ? followUp.avgForgettingRisk - baseline.avgForgettingRisk
        : null,
  }
}

// ── Subject effectiveness ─────────────────────────────────────────────────────

export interface SubjectEffectiveness {
  subject: string
  learners: number
  lessonsAnalyzed: number
  learningGain: LearningGainStat[]
  completion: LessonCompletionStat
  averageMasteryTime: MasteryTimeStat[]
  recoverySuccessRates: RecoveryStat[]
}

function buildSubjectEffectiveness(lessons: LessonEvidence[]): SubjectEffectiveness[] {
  const bySubject = new Map<string, LessonEvidence[]>()
  for (const l of lessons) {
    const arr = bySubject.get(l.subject) ?? []
    arr.push(l)
    bySubject.set(l.subject, arr)
  }
  const out: SubjectEffectiveness[] = []
  for (const [subject, subjectLessons] of [...bySubject.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    const analytics = computeLearningAnalytics(subjectLessons)
    out.push({
      subject,
      learners: new Set(subjectLessons.map((l) => l.userId)).size,
      lessonsAnalyzed: subjectLessons.length,
      learningGain: computeLearningGain(subjectLessons),
      completion: computeLessonCompletionRate(subjectLessons),
      averageMasteryTime: analytics.averageMasteryTime,
      recoverySuccessRates: analytics.recoverySuccessRates,
    })
  }
  return out
}

// ── Caveats (data-driven honesty, never a fabricated confidence claim) ───────

function buildCaveats(
  participantsIncluded: number,
  learningGain: LearningGainStat[],
  misconceptionRepair: MisconceptionRepairStat,
  completion: LessonCompletionStat,
): string[] {
  const caveats: string[] = []
  if (participantsIncluded === 0) {
    caveats.push('Zero eligible participants — this report contains no findings, not a null result. Check the eligibility criteria and participantUserIds allowlist.')
    return caveats
  }
  if (participantsIncluded < 34) {
    caveats.push(`Cohort size (${participantsIncluded}) is below the planning target of ~34 for a medium effect size at power 0.8 (protocol §7) — treat any gain/rate below as preliminary.`)
  }
  const lowSampleConcepts = learningGain.filter((g) => g.lowSample).length
  if (lowSampleConcepts > 0) {
    caveats.push(`${lowSampleConcepts} of ${learningGain.length} concept(s) in the learning-gain table have fewer than ${MIN_SAMPLE} total probe outcomes — flagged lowSample=true, not reliable individually.`)
  }
  if (misconceptionRepair.lowSample) {
    caveats.push(`Misconception repair rate is based on only ${misconceptionRepair.totalDetected} detection(s) — below the ${MIN_SAMPLE}-sample floor.`)
  }
  if (completion.lowSample) {
    caveats.push(`Lesson completion rate is based on only ${completion.totalLessons} lesson(s) — below the ${MIN_SAMPLE}-sample floor.`)
  }
  return caveats
}

// ── The study report ──────────────────────────────────────────────────────────

export interface EfficacyStudyReport {
  generatedAt: Date
  studyWindow: { start: Date; end: Date }
  cohort: { participantsIncluded: number; participantsExcluded: number; totalLessons: number }
  overall: {
    learningGain: LearningGainStat[]
    misconceptionRepair: MisconceptionRepairStat
    completion: LessonCompletionStat
    recoverySuccessRates: RecoveryStat[]
    averageMasteryTime: MasteryTimeStat[]
    engagement: CohortEngagement
  }
  bySubject: SubjectEffectiveness[]
  packageEffectiveness: PackageFeedback[]
  retentionTrend: RetentionTrend | null
  authoringPriorities: AuthoringPriority[]
  caveats: string[]
}

/**
 * Pure: assembles the complete Efficacy Study Report from an
 * already-eligibility-filtered lesson corpus and already-built
 * per-learner Student Intelligence profiles. Deterministic — same inputs,
 * same report, byte-identical; no I/O, no Date.now() (the caller supplies
 * `generatedAt`).
 */
export function buildEfficacyStudyReport(
  eligibleLessons: LessonEvidence[],
  profiles: StudentIntelligence[],
  participantsIncluded: number,
  participantsExcluded: number,
  inspectPackage: PackageInspector,
  generatedAt: Date,
  studyWindow: { start: Date; end: Date },
  retentionTrend: RetentionTrend | null = null,
): EfficacyStudyReport {
  const analytics = computeLearningAnalytics(eligibleLessons)
  const learningGain = computeLearningGain(eligibleLessons)
  const misconceptionRepair = computeMisconceptionRepairRate(profiles)
  const completion = computeLessonCompletionRate(eligibleLessons)
  const authoringReport = buildAuthoringFeedback(analytics, eligibleLessons, inspectPackage, DEFAULT_AUTHORING_THRESHOLDS)

  return {
    generatedAt,
    studyWindow,
    cohort: {
      participantsIncluded,
      participantsExcluded,
      totalLessons: eligibleLessons.length,
    },
    overall: {
      learningGain,
      misconceptionRepair,
      completion,
      recoverySuccessRates: analytics.recoverySuccessRates,
      averageMasteryTime: analytics.averageMasteryTime,
      engagement: aggregateEngagement(profiles),
    },
    bySubject: buildSubjectEffectiveness(eligibleLessons),
    packageEffectiveness: buildPackageFeedback(eligibleLessons, inspectPackage),
    retentionTrend,
    authoringPriorities: rankAuthoringPriorities(authoringReport, analytics),
    caveats: buildCaveats(participantsIncluded, learningGain, misconceptionRepair, completion),
  }
}

// ── Impure loader (the only impure export in this file) ──────────────────────

export interface LoadEfficacyStudyOptions {
  criteria: StudyEligibilityCriteria
  now?: Date
  /** Optional second window for the retention trend (protocol §8). Both
   *  windows are analyzed with the SAME eligibility criteria except for
   *  the date range. Omit to skip the retention-trend comparison. */
  followUpWindow?: { start: Date; end: Date }
}

/**
 * Loads the evidence corpus (reusing the Evidence Loop), filters to the
 * eligible cohort, builds one Student Intelligence profile per included
 * learner directly from the already-loaded corpus (no per-learner DB
 * round trip — same pattern as the Failure Analytics Dashboard's loader),
 * and assembles the full report. Read-only throughout.
 */
export async function loadEfficacyStudyReport(options: LoadEfficacyStudyOptions): Promise<EfficacyStudyReport> {
  const now = options.now ?? new Date()

  const { loadEvidenceCorpus, artifactPackageInspector } = await import('../teaching/evidence/evidenceLoad')
  const { readLessonEvidence } = await import('../teaching/evidence/evidenceReader')

  const corpus = await loadEvidenceCorpus({})
  const allLessons = readLessonEvidence(corpus)

  const { eligible, participantsIncluded, participantsExcluded } = filterEligibleLessons(allLessons, options.criteria)

  const lessonsByUser = new Map<string, LessonEvidence[]>()
  for (const l of eligible) {
    const arr = lessonsByUser.get(l.userId) ?? []
    arr.push(l)
    lessonsByUser.set(l.userId, arr)
  }
  const profiles: StudentIntelligence[] = [...lessonsByUser.entries()].map(([userId, userLessons]) =>
    buildStudentIntelligence(userId, userLessons, { now }),
  )

  let retentionTrend: RetentionTrend | null = null
  if (options.followUpWindow) {
    let packageAvailability: ((conceptId: string) => boolean) | undefined
    try {
      const { hasPackageArtifact } = await import('@/lib/curriculum/packageRuntime/loader')
      packageAvailability = hasPackageArtifact
    } catch { /* degrade gracefully */ }

    const followUpCriteria: StudyEligibilityCriteria = {
      ...options.criteria,
      studyStart: options.followUpWindow.start,
      studyEnd: options.followUpWindow.end,
    }
    const followUpFiltered = filterEligibleLessons(allLessons, followUpCriteria)
    const baselineQueues: LearnerReviewQueue[] = profiles.map((p) => ({
      userId: p.userId,
      queue: scheduleReviews(p, { now, packageAvailability }) as ReviewQueue,
    }))
    const followUpByUser = new Map<string, LessonEvidence[]>()
    for (const l of followUpFiltered.eligible) {
      const arr = followUpByUser.get(l.userId) ?? []
      arr.push(l)
      followUpByUser.set(l.userId, arr)
    }
    const followUpQueues: LearnerReviewQueue[] = [...followUpByUser.entries()].map(([userId, userLessons]) => ({
      userId,
      queue: scheduleReviews(buildStudentIntelligence(userId, userLessons, { now }), { now, packageAvailability }),
    }))
    retentionTrend = computeRetentionTrend(
      aggregateReviewQueueStats(baselineQueues),
      aggregateReviewQueueStats(followUpQueues),
    )
  }

  return buildEfficacyStudyReport(
    eligible,
    profiles,
    participantsIncluded,
    participantsExcluded,
    artifactPackageInspector,
    now,
    { start: options.criteria.studyStart, end: options.criteria.studyEnd },
    retentionTrend,
  )
}
