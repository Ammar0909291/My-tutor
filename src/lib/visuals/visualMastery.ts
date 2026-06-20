/**
 * VisualMasterySignal — Visual Learning Sprint K (Analytics & Mastery
 * Tracking, Task 3).
 *
 * A purely additive, in-memory data model: describes a single observation
 * of a student's interaction with one visual. It is intentionally NOT
 * wired into any renderer, component, or API route this sprint (see
 * docs/VISUAL_LEARNING_SPRINT_K_REPORT.md, Task 2 — the architecture for
 * *emitting* these signals from the four renderers is designed, not built).
 *
 * No database dependency, no React dependency, no AI dependency — pure
 * data + a couple of pure helper functions, mirroring the existing
 * deterministic style of teachingStrategy.ts / visualConceptDetector.ts.
 */
import type { VisualEngine } from './teachingStrategy'

/** Which surface the visual was shown on. Mirrors the four sites wired in Sprint I. */
export type VisualMasterySource = 'learn' | 'practice' | 'assessment' | 'mock'

/** A signal always refers to a visual that was actually rendered — `null` (TeachingStrategy's "no visualization") never produces a signal in the first place. */
export type VisualMasteryEngine = Exclude<VisualEngine, null>

/**
 * One observation of a student's interaction with one visual.
 *
 * Every field below already has a known, deterministic source today (see
 * docs/VISUAL_MASTERY_AUDIT.md, Section 4) — this type just gives that
 * already-computed information a stable shape to travel in, once a future
 * sprint wires up the emission described in Task 2.
 */
export interface VisualMasterySignal {
  /** The detected concept this visual was teaching, e.g. "linear_equation", "fraction_comparison". Free text — not a curriculum ID, since detection is keyword/regex-based, not curriculum-linked (see VISUAL_INTEGRATION_AUDIT.md). */
  concept: string
  /** Which of the four existing engines rendered it. Never a new engine type. */
  visualType: VisualMasteryEngine
  /** The visual was rendered on screen at all. */
  shown: boolean
  /** The student dragged/reordered/manipulated the visual (only meaningful when spec.interactive is true). */
  interacted: boolean
  /** A challenge existed AND the student's live state was checked against it at least once. */
  challengeAttempted: boolean
  /** The challenge's target was met. Mirrors each renderer's own `challengeMet`/`isCorrect` boolean exactly. */
  challengeCompleted: boolean
  /** ISO-8601 timestamp of the observation. */
  observedAt: string
  /** Optional context — present when the visual was shown inside a Practice/Assessment/Mock session rather than a free-form Learn chat turn. */
  source?: VisualMasterySource
  subjectSlug?: string
  topicSlug?: string
  sessionId?: string
}

/** Build a VisualMasterySignal from the pieces a future renderer-level emitter would already have on hand (the spec it rendered, the strategy that produced it, and the live challengeMet boolean it already computes today). Defaults observedAt to now(); every other field is explicit. */
export function buildVisualMasterySignal(input: {
  concept: string
  visualType: VisualMasteryEngine
  shown: boolean
  interacted?: boolean
  challengeAttempted?: boolean
  challengeCompleted: boolean
  observedAt?: string
  source?: VisualMasterySource
  subjectSlug?: string
  topicSlug?: string
  sessionId?: string
}): VisualMasterySignal {
  return {
    concept: input.concept,
    visualType: input.visualType,
    shown: input.shown,
    interacted: input.interacted ?? false,
    challengeAttempted: input.challengeAttempted ?? false,
    challengeCompleted: input.challengeCompleted,
    observedAt: input.observedAt ?? new Date().toISOString(),
    ...(input.source ? { source: input.source } : {}),
    ...(input.subjectSlug ? { subjectSlug: input.subjectSlug } : {}),
    ...(input.topicSlug ? { topicSlug: input.topicSlug } : {}),
    ...(input.sessionId ? { sessionId: input.sessionId } : {}),
  }
}

/** Aggregate counts per visual engine — the shape a future analytics dashboard (e.g. /api/analytics/learning-effectiveness) would read. Pure function over an in-memory array; does not assume any persistence layer. */
export interface VisualMasteryAggregate {
  visualType: VisualMasteryEngine
  shownCount: number
  interactedCount: number
  challengeAttemptedCount: number
  challengeCompletedCount: number
  /** challengeCompletedCount / challengeAttemptedCount, or null when no attempts were observed. */
  masteryRate: number | null
}

export function summarizeVisualMastery(signals: VisualMasterySignal[]): VisualMasteryAggregate[] {
  const byType = new Map<VisualMasteryEngine, VisualMasterySignal[]>()
  for (const s of signals) {
    const bucket = byType.get(s.visualType) ?? []
    bucket.push(s)
    byType.set(s.visualType, bucket)
  }
  return Array.from(byType.entries()).map(([visualType, bucket]) => {
    const shownCount = bucket.filter((s) => s.shown).length
    const interactedCount = bucket.filter((s) => s.interacted).length
    const challengeAttemptedCount = bucket.filter((s) => s.challengeAttempted).length
    const challengeCompletedCount = bucket.filter((s) => s.challengeCompleted).length
    return {
      visualType,
      shownCount,
      interactedCount,
      challengeAttemptedCount,
      challengeCompletedCount,
      masteryRate: challengeAttemptedCount > 0 ? challengeCompletedCount / challengeAttemptedCount : null,
    }
  })
}
