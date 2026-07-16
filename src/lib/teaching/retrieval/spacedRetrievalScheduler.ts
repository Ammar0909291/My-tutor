/**
 * Spaced Retrieval Scheduler — Claude Recommendation #8.
 *
 * Determines WHICH mastered concepts are due for a memory-maintenance
 * review, WHEN next, and in WHAT PRIORITY ORDER — proactively, instead of
 * waiting for the student to ask. Produces SCHEDULING DATA ONLY: no review
 * lesson content, no system-prompt text, no teaching decisions. A future
 * consumer (the Learning Orchestrator, once built) decides what to DO with
 * this queue; this module only decides WHAT and WHEN.
 *
 * Reuses, never duplicates:
 *   - Student Intelligence (buildStudentIntelligence / loadStudentIntelligence)
 *     for conceptStates (mastered flag, forgettingRisk, lastEvidenceAt,
 *     probePassRate, subject) and activeMisconceptions — the SAME derived
 *     learner model the Learning Orchestrator is meant to consume, not a
 *     second one. No new learner-model table, no new evidence schema.
 *   - The Evidence Loop + TopicProgress, transitively, through Student
 *     Intelligence's existing loader chain (loadEvidenceCorpus →
 *     readLessonEvidence → buildStudentIntelligence) — this module never
 *     queries the database directly.
 *   - Student Intelligence's own forgetting-curve law
 *     (effectiveHalfLifeDays, extracted from forgettingRisk as a pure,
 *     behavior-preserving refactor) to invert the SAME decay formula that
 *     already produced ConceptState.forgettingRisk, rather than inventing
 *     a second decay model.
 *   - Educational Packages' hasPackageArtifact() existence probe
 *     (packageRuntime/loader.ts, read-only, no content read) to flag
 *     whether a compiled package exists for a concept — informational
 *     only; this module never loads, compiles, or generates lesson
 *     content. Injected as a dependency so the pure core stays
 *     deterministic and I/O-free.
 *
 * Subject-generic by construction: every field this module reads
 * (conceptId, subject, mastered, forgettingRisk, probePassRate,
 * lastEvidenceAt) already flows from the canonical KG adapter platform via
 * LessonEvidence/EvidenceEvent, so a new subject needs zero changes here —
 * "support retrieval scheduling across all future subjects" falls out of
 * reusing Student Intelligence rather than being separately implemented.
 *
 * Pure core (scheduleReviews) + one impure loader (loadReviewQueue),
 * mirroring the convention already established by evidenceReader.ts /
 * studentIntelligence/index.ts / spineSignals.ts.
 */
import {
  effectiveHalfLifeDays,
  type StudentIntelligence,
} from '../studentIntelligence/studentIntelligence'
import { loadStudentIntelligence } from '../studentIntelligence'

export type MaintenanceStatus = 'stable' | 'at_risk' | 'overdue' | 'critical'

export interface ScheduledReview {
  conceptId: string
  subject: string
  /** Anchor evidence timestamp this schedule was computed from — the SAME
   *  timestamp Student Intelligence's forgettingRisk used for this concept. */
  lastEvidenceAt: Date
  /** 0–1, verbatim from Student Intelligence's ConceptState — never
   *  recomputed here. */
  forgettingRisk: number
  /** Days; the concept-specific half-life forgettingRisk was scaled to
   *  (via effectiveHalfLifeDays, same law, same inputs). */
  effectiveHalfLifeDays: number
  /** The date at which this concept's forgetting risk is projected to
   *  cross reviewRiskThreshold, given no further practice. */
  nextReviewAt: Date
  /** True when nextReviewAt fell before the start of the current
   *  calendar day (options.now's day). */
  overdue: boolean
  daysOverdue: number
  /** From Student Intelligence's activeMisconceptions — true when this
   *  concept currently has an unresolved (non-dormant) misconception. */
  hasActiveMisconception: boolean
  /** Whether a compiled Educational Package exists for this concept
   *  (existence only, never content). Null when the core was called
   *  without a package-availability lookup (e.g. in unit tests). */
  hasEducationalPackage: boolean | null
  /** Composite ordering score — NOT a probability; higher sorts first. */
  priority: number
  maintenanceStatus: MaintenanceStatus
}

export interface ReviewQueue {
  overdue: ScheduledReview[]
  dueToday: ScheduledReview[]
  upcoming: ScheduledReview[]
  /** Every scheduled review, priority-ordered (highest priority first). */
  all: ScheduledReview[]
}

export interface SpacedRetrievalOptions {
  /** Read-time clock — required for determinism, same law as
   *  StudentIntelligenceOptions.now: nothing in this module reads
   *  Date.now() directly. */
  now: Date
  /** Forgetting-risk threshold (0–1) that defines "due for review".
   *  Default 0.3 — review before retention drops below ~70%. */
  reviewRiskThreshold?: number
  /** MUST match the forgettingHalfLifeDays the StudentIntelligence profile
   *  passed to scheduleReviews was built with, or nextReviewAt will
   *  silently drift from the risk that profile actually reports. Default
   *  mirrors StudentIntelligenceOptions' own default (30 days). */
  baseHalfLifeDays?: number
  /** Optional cheap existence probe for compiled Educational Packages
   *  (e.g. packageRuntime/loader.ts's hasPackageArtifact). Injected so the
   *  pure core stays deterministic/I/O-free; omit in tests. */
  packageAvailability?: (conceptId: string) => boolean
}

const DEFAULT_REVIEW_RISK_THRESHOLD = 0.3
const DEFAULT_BASE_HALF_LIFE_DAYS = 30
const DAY_MS = 86_400_000

/** Inverts the forgetting-curve law: risk(dt) = 1 − 2^(−dt/halfLife).
 *  Solving for dt at risk = threshold gives
 *  dt = halfLife · log2(1 / (1 − threshold)). */
function daysToRiskThreshold(halfLifeDays: number, threshold: number): number {
  return halfLifeDays * Math.log2(1 / (1 - threshold))
}

function computePriority(
  risk: number, overdue: boolean, daysOverdue: number, hasActiveMisconception: boolean,
): number {
  let score = risk
  if (overdue) score += Math.min(daysOverdue / 30, 1) * 0.5
  if (hasActiveMisconception) score += 0.3
  return Math.min(2, score)
}

function computeMaintenanceStatus(
  risk: number, overdue: boolean, daysOverdue: number, threshold: number,
): MaintenanceStatus {
  if (overdue && (risk >= 0.6 || daysOverdue >= 14)) return 'critical'
  if (overdue) return 'overdue'
  if (risk >= threshold * 0.7) return 'at_risk'
  return 'stable'
}

function byPriorityDesc(a: ScheduledReview, b: ScheduledReview): number {
  return b.priority - a.priority
    || a.nextReviewAt.getTime() - b.nextReviewAt.getTime()
    || a.conceptId.localeCompare(b.conceptId)
}

/**
 * Pure: turns one Student Intelligence profile into a prioritized review
 * queue. Only concepts already marked `mastered` are eligible — concepts
 * still being actively taught are not maintenance targets (this module
 * doesn't re-derive that boundary; it simply respects the flag Student
 * Intelligence already computed, consistent with the Educational Brain's
 * never-reteach-while-still-learning placement rules).
 *
 * Deterministic: same profile + same options.now → byte-identical queue.
 * No I/O, no Date.now(), no randomness.
 */
export function scheduleReviews(
  profile: StudentIntelligence,
  options: SpacedRetrievalOptions,
): ReviewQueue {
  const threshold = options.reviewRiskThreshold ?? DEFAULT_REVIEW_RISK_THRESHOLD
  const baseHalfLife = options.baseHalfLifeDays ?? DEFAULT_BASE_HALF_LIFE_DAYS
  const now = options.now

  const activeMisconceptionConcepts = new Set(profile.activeMisconceptions.map((m) => m.conceptId))

  const startOfToday = new Date(now)
  startOfToday.setHours(0, 0, 0, 0)
  const endOfToday = new Date(startOfToday.getTime() + DAY_MS)

  const reviews: ScheduledReview[] = profile.conceptStates
    .filter((c) => c.mastered)
    .map((c) => {
      const halfLife = effectiveHalfLifeDays(c.probePassRate, baseHalfLife)
      const dtDays = daysToRiskThreshold(halfLife, threshold)
      const nextReviewAt = new Date(c.lastEvidenceAt.getTime() + dtDays * DAY_MS)
      const overdue = nextReviewAt.getTime() < startOfToday.getTime()
      const daysOverdue = overdue ? Math.floor((now.getTime() - nextReviewAt.getTime()) / DAY_MS) : 0
      const hasActiveMisconception = activeMisconceptionConcepts.has(c.conceptId)
      return {
        conceptId: c.conceptId,
        subject: c.subject,
        lastEvidenceAt: c.lastEvidenceAt,
        forgettingRisk: c.forgettingRisk,
        effectiveHalfLifeDays: halfLife,
        nextReviewAt,
        overdue,
        daysOverdue,
        hasActiveMisconception,
        hasEducationalPackage: options.packageAvailability ? options.packageAvailability(c.conceptId) : null,
        priority: computePriority(c.forgettingRisk, overdue, daysOverdue, hasActiveMisconception),
        maintenanceStatus: computeMaintenanceStatus(c.forgettingRisk, overdue, daysOverdue, threshold),
      }
    })
    .sort((a, b) => a.conceptId.localeCompare(b.conceptId))

  const overdueList = reviews.filter((r) => r.overdue)
  const dueToday = reviews.filter((r) => !r.overdue && r.nextReviewAt.getTime() < endOfToday.getTime())
  const upcoming = reviews.filter((r) => !r.overdue && r.nextReviewAt.getTime() >= endOfToday.getTime())

  return {
    overdue: [...overdueList].sort(byPriorityDesc),
    dueToday: [...dueToday].sort(byPriorityDesc),
    upcoming: [...upcoming].sort(
      (a, b) => a.nextReviewAt.getTime() - b.nextReviewAt.getTime() || a.conceptId.localeCompare(b.conceptId),
    ),
    all: [...reviews].sort(byPriorityDesc),
  }
}

// ── Impure loader (the only impure export in this file) ──────────────────────

/**
 * Loads one learner's Student Intelligence profile (reusing its existing
 * loader chain) and schedules reviews from it. Read-only; never throws —
 * a StudentIntelligence load failure propagates as an empty profile the
 * same way loadStudentIntelligence's own callers would see it.
 */
export async function loadReviewQueue(
  userId: string,
  options?: Partial<SpacedRetrievalOptions>,
): Promise<ReviewQueue> {
  const now = options?.now ?? new Date()
  const profile = await loadStudentIntelligence(userId, { now })

  let packageAvailability = options?.packageAvailability
  if (!packageAvailability) {
    try {
      const { hasPackageArtifact } = await import('@/lib/curriculum/packageRuntime/loader')
      packageAvailability = hasPackageArtifact
    } catch {
      // Educational Package Runtime unavailable in this environment —
      // degrade to hasEducationalPackage: null for every review, never fatal.
    }
  }

  return scheduleReviews(profile, { ...options, now, packageAvailability })
}
