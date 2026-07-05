// W1-2 (ADR 10 Phase 1): Typed schema for the LearnSession.contextSnapshot JSONB field.
//
// Single writer: the Persist stage (route.ts turn-close block).
// Readers: all stages within the same turn.
//
// Existing contextSnapshot fields are preserved here verbatim so that
// callers can migrate from `Record<string, unknown>` to this type incrementally.
// No production code is changed by this file — it is a type-only addition.

export type LessonStageProgressKey =
  | 'introduction'
  | 'worked_example'
  | 'practice'
  | 'probe'
  | 'consolidation'

export interface SessionMemory {
  // ── Existing fields (already written by route.ts) ────────────────────────

  memoryContext?: string
  lastSuccessfulTeachingStyle?: string

  // Current KG-node the learner is working on
  currentConceptNodeId?: string | null
  nextConceptNodeId?: string | null

  // Prerequisite gap detected in the previous turn
  lastPrerequisiteGap?: string | null

  // School mode: chapter the session is scoped to
  schoolChapterId?: string | null

  // Worked example in progress (cleared when the example resolves)
  currentWorkedExample?: {
    concept: string
    currentStep: number
    stepCount: number
  } | null

  // ── New fields (ADR 09: lesson stage continuity) ──────────────────────────

  // Which stage of the lesson plan the current turn is executing
  lessonStageProgress?: LessonStageProgressKey | null

  // ── New fields (probe lifecycle) ──────────────────────────────────────────

  // Set after the probe is emitted; cleared when the learner answers
  pendingProbeId?: string | null
  // Knowledge Asset id of the probe asset (future: ADR 14 Phase 3)
  pendingProbeAssetId?: string | null

  // ── New fields (in-session misconception tracking) ────────────────────────

  // Misconceptions newly detected this session, not yet persisted to
  // ActiveMisconception. Cleared when persisted at turn close.
  activeMisconceptionsThisSession?: Array<{
    topicSlug: string
    category: string
    detectedAt: number // Date.now() timestamp
  }>

  // ── New fields (anti-repetition and pacing signals) ───────────────────────

  // Asset ids shown in recent turns (prevents showing the same visual twice)
  recentAssetIds?: string[]

  // Count of turns since the last probe was presented
  turnsSinceLastProbe?: number

  // Count of turns since the concept changed
  turnsSinceConceptChange?: number
}
