/**
 * TeachingPlan — the Teaching Planner's single canonical output contract.
 *
 * The planner sits between Conversation Understanding and every execution
 * subsystem (Explanation Engine, VIE -> ADR 12, assessment, lesson flow).
 * It decides WHICH subsystem should run and on WHAT concept. It never
 * teaches, never renders, never generates explanations, never calls an LLM
 * or a database.
 *
 * Everything here is data + enums. No behaviour lives in this file; the
 * decision rules live in `teachingPlanner.ts`.
 */

// ── Intents ───────────────────────────────────────────────────────────────

/** What the student is actually asking for this turn. Enum members only —
 *  callers must never pass a bare string. */
export const TeachingIntent = {
  CONTINUE_LESSON: 'CONTINUE_LESSON',
  EXPLAIN_CONCEPT: 'EXPLAIN_CONCEPT',
  VISUALIZE_CONCEPT: 'VISUALIZE_CONCEPT',
  COMPARE_CONCEPTS: 'COMPARE_CONCEPTS',
  SOLVE_PROBLEM: 'SOLVE_PROBLEM',
  QUIZ_ME: 'QUIZ_ME',
  REVISE_TOPIC: 'REVISE_TOPIC',
  REAL_WORLD_EXAMPLE: 'REAL_WORLD_EXAMPLE',
  DEFINE_TERM: 'DEFINE_TERM',
  FOLLOW_UP: 'FOLLOW_UP',
  CHANGE_TOPIC: 'CHANGE_TOPIC',
  RETURN_TO_LESSON: 'RETURN_TO_LESSON',
  UNKNOWN: 'UNKNOWN',
} as const
export type TeachingIntent = (typeof TeachingIntent)[keyof typeof TeachingIntent]

/** How this turn relates to the lesson the student is currently inside.
 *  This is the field the investigation proved missing: today's runtime has
 *  no way to express "we are answering something else for a moment". */
export const LessonMode = {
  /** The turn belongs to the active lesson's own concept. */
  IN_LESSON: 'IN_LESSON',
  /** A deliberate, temporary departure — answer, then come back. */
  TEMPORARY_EXCURSION: 'TEMPORARY_EXCURSION',
  /** The student asked to move on for good; no return is owed. */
  LESSON_CHANGED: 'LESSON_CHANGED',
  /** No lesson is active (free chat / Library browsing). */
  NO_LESSON: 'NO_LESSON',
} as const
export type LessonMode = (typeof LessonMode)[keyof typeof LessonMode]

/** The subsystems the planner may schedule, in the order they should run.
 *  These name EXISTING subsystems — the planner introduces no new engine. */
export const ExecutionStep = {
  /** Explanation Engine / Explanation Memory -> LLM voice rendering. */
  EXPLANATION: 'EXPLANATION',
  /** Visualization Intelligence Engine -> VisualIntent -> ADR 12. */
  VISUALIZATION: 'VISUALIZATION',
  /** Assessment / probe generation (quizzes, mastery checks). */
  ASSESSMENT: 'ASSESSMENT',
  /** Worked-solution path for a concrete problem the student posed. */
  WORKED_SOLUTION: 'WORKED_SOLUTION',
  /** Spaced-revision retrieval for an already-taught topic. */
  REVISION: 'REVISION',
  /** Continue the active lesson's own teaching flow. */
  LESSON_FLOW: 'LESSON_FLOW',
  /** Hand control back to the lesson after an excursion. */
  LESSON_RESUME: 'LESSON_RESUME',
} as const
export type ExecutionStep = (typeof ExecutionStep)[keyof typeof ExecutionStep]

// ── Concept resolution port ───────────────────────────────────────────────

/** One candidate concept the resolver matched in the student's message. */
export interface ResolvedConcept {
  conceptId: string
  title: string
  /** 0..1. The planner treats this as opaque; it only ranks by it. */
  confidence: number
}

/**
 * Injected port. The planner does NOT own concept resolution and does not
 * import the Knowledge Graph directly — that keeps it pure, synchronous and
 * trivially testable, and lets the eventual runtime wiring supply whatever
 * KG-backed resolver it already has. Must be deterministic.
 */
export type ConceptResolver = (text: string) => readonly ResolvedConcept[]

// ── Planner inputs ────────────────────────────────────────────────────────

export interface PlannerInputs {
  /** The student's raw message this turn. */
  message: string
  /** The concept the active lesson is teaching, or null when no lesson is
   *  active. This is what today's runtime locks onto unconditionally. */
  activeLessonConceptId: string | null
  /** The concept the previous turn actually addressed, if it differed from
   *  the lesson (i.e. we are already mid-excursion). */
  currentExcursionConceptId?: string | null
  /** Deterministic concept resolution over the message text. Omit to plan
   *  without concept identification (intent is still classified). */
  resolveConcept?: ConceptResolver
  /** The existing `detectLearnerRequest()` signal (masteryGate.ts), passed
   *  in rather than recomputed — the planner reuses that decision, it does
   *  not duplicate it. */
  learnerRequest?: 'diagram' | 'real_life_example' | 'explain_differently' | null
}

// ── The plan ──────────────────────────────────────────────────────────────

/** What each execution subsystem is required to do this turn. */
export interface PlanRequirements {
  explanation: boolean
  visualization: boolean
  assessment: boolean
  workedSolution: boolean
  revision: boolean
}

/** Excursion bookkeeping — the mechanism that makes "answer it, then go
 *  back" expressible instead of implicit. */
export interface ExcursionPlan {
  isExcursion: boolean
  /** The concept to return to once this turn's excursion completes. */
  returnToConceptId: string | null
  /** False for CHANGE_TOPIC: the student moved on deliberately. */
  returnToLesson: boolean
}

export interface TeachingPlan {
  intent: TeachingIntent
  /** The concept this turn is actually about — the lesson's concept when
   *  on-topic, the requested concept when not. Null when unresolved. */
  targetConceptId: string | null
  /** Populated for COMPARE_CONCEPTS (2+ concepts), empty otherwise. */
  comparisonConceptIds: readonly string[]
  lessonMode: LessonMode
  excursion: ExcursionPlan
  requires: PlanRequirements
  /** Ordered subsystems to run. Deterministic for a given plan. */
  executionSequence: readonly ExecutionStep[]
  /** 0..1 — the planner's own confidence in this classification. */
  confidence: number
  /** Human-readable trace of which rules fired, for debugging and for the
   *  "unexplainable decision = invented decision" provenance rule. */
  reasoning: readonly string[]
}
