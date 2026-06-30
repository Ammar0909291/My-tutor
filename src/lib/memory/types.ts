import type { TrackLevel, LearningSpeed, FatigueLevel } from '@/lib/teaching-engine/types'

export type { TrackLevel, LearningSpeed, FatigueLevel }

// ── Concept-level mastery ─────────────────────────────────────────────────────

export interface WeakConcept {
  slug: string
  masteryPct: number   // 1–69 — at or above 70 the concept is no longer weak
  attempts: number
  lastScore?: number
}

// ── Misconception record ──────────────────────────────────────────────────────
// Inferred from repeated MistakeRecord entries for the same (topic, category).
// confidence thresholds: LOW = 2 occurrences, MEDIUM = 3–4, HIGH = 5+

export interface DetectedMisconception {
  topicSlug: string    // concept / KG-node slug
  category: string     // mistake category from MistakeRecord (e.g. "arithmetic_error")
  confidence: 'LOW' | 'MEDIUM' | 'HIGH'
  evidence: number     // raw count of supporting MistakeRecord rows in the last 30 days
}

// ── Retention state per topic ─────────────────────────────────────────────────
// Populated from RetentionMetric rows. Phase 2D adds decay computation.

export interface TopicRetentionState {
  masteryScore: number      // 0–100
  confidenceScore: number   // 0–100
  decayScore: number        // forgetting-curve decay factor, 0–100 (0 = fully retained)
  reviewCount: number
  lastReviewedAt?: Date
  daysUntilReview?: number  // filled by the Adaptive Engine (Phase 2D)
}

// ── Full learner memory snapshot ──────────────────────────────────────────────
// Computed once per tutor turn, held in-process only (never serialised to a
// new DB table — reads exclusively from existing tables).

export interface LearnerMemory {
  userId: string
  subjectSlug: string
  subjectId: string          // Subject.id UUID (needed for joins in RetentionMetric etc.)

  // Concept mastery state (from TopicProgress)
  masteredConcepts: string[]        // status COMPLETED or MASTERED
  inProgressConcepts: string[]      // status IN_PROGRESS or REVISION
  weakConcepts: WeakConcept[]       // 0 < masteryPct < 70, sorted ascending

  // Misconceptions inferred from recent MistakeRecord patterns
  activeMisconceptions: DetectedMisconception[]

  // Learning preferences (from LearningProfile)
  learningSpeed: LearningSpeed
  confidenceLevel: number            // 0–100, used as retention_score in Teaching Engine
  preferredStyle: 'VISUAL' | 'PRACTICAL' | 'THEORETICAL' | 'BALANCED'

  // Retention by topic slug (from RetentionMetric, daysUntilReview from ReviewSchedule)
  retentionByTopic: Record<string, TopicRetentionState>

  // Topics whose ReviewSchedule.nextReviewAt falls within the next 7 days,
  // sorted soonest-first (Phase 2D — Adaptive Engine)
  dueForReview: string[]

  // Derived fields consumed by Teaching Engine
  trackLevel: TrackLevel
  fatigueLevel: FatigueLevel

  // Learning history signals
  recentTopics: string[]     // up to 5 most recently active topic slugs
  successRate: number        // 0–100, derived from SubjectAnalytics.trend
  errorPatterns: string[]    // weak topic slugs from SubjectAnalytics
  timeOnTask: number         // seconds in current session (estimated from message count)
  lastStudyDate?: Date

  computedAt: Date
}

// ── Minimal projection for Teaching Engine ────────────────────────────────────
// Passed to decide() instead of full LearnerMemory to keep the hot-path lean.
// All field names align with StudentState and LearningHistory interfaces.

export interface TeachingMemorySnapshot {
  // → StudentState fields
  trackLevel: TrackLevel
  masteredConcepts: string[]
  weakConcepts: string[]           // slugs only
  misconceptions: string[]         // topicSlugs of MEDIUM/HIGH-confidence misconceptions
  retentionScore: number           // 0–100 (= confidenceLevel)
  learningSpeed: LearningSpeed
  fatigueLevel: FatigueLevel
  // → LearningHistory fields
  recentlyAttempted: string[]
  successRate: number              // 0–100
  timeOnTask: number               // seconds
  errorPatterns: string[]
  // → Phase 2D: review scheduling signal
  dueForReview: string[]           // topic slugs overdue for spaced-repetition review
}
