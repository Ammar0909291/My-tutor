/**
 * Single-generation runtime contracts.
 *
 *   ExecutionPlan -> Teaching Prompt Orchestrator -> TeachingGenerationRequest
 *                 -> (prompt construction, separate concern) -> ONE LLM CALL
 *                 -> TeachingGenerationResponse -> VIE -> ADR 12 -> Renderer
 *
 * This supersedes the multi-dispatcher execution model: the Brain orchestrates
 * PROMPT ASSEMBLY, not LLM execution. Exactly one generation request is
 * produced per turn, whatever the plan contains.
 *
 * STRUCTURED DATA ONLY. Nothing here is prompt text and nothing here builds
 * prompt text — prompt construction is a separate concern downstream. Fields
 * carry ids, enums, booleans and authored knowledge (objectives, misconception
 * statements) that a prompt builder consumes; they are never sentences written
 * for the model.
 */

import type { VisualIntent } from '../visualIntent'
import type { ExecutionMode, ExecutionStepKind } from '../execution/executionPlan'
import type { TeachingIntent, LessonMode } from '../planner/teachingPlan'

// ── Concept ───────────────────────────────────────────────────────────────

export interface ConceptDirective {
  /** The concept this generation is about. Null only when unresolved. */
  conceptId: string | null
  /** Authored KG title, when known — identity, not prose. */
  title: string | null
  /** Populated for comparisons; includes the primary, as ranked. */
  comparisonConceptIds: readonly string[]
  /** True when the concept could not be resolved unambiguously. */
  ambiguous: boolean
  /** Competing readings to offer the learner. Empty unless ambiguous. */
  ambiguityCandidateIds: readonly string[]
}

// ── Lesson context ────────────────────────────────────────────────────────

export interface LessonDirective {
  lessonMode: LessonMode
  executionMode: ExecutionMode
  /** The lesson's own concept, which may differ from the target. */
  activeLessonConceptId: string | null
  /** True when this turn temporarily leaves the lesson. */
  isExcursion: boolean
  /** Where control returns afterwards, when a return is owed. */
  resumeConceptId: string | null
  /** Whether the generation must close by returning to the lesson. */
  mustReturnToLesson: boolean
}

// ── Pedagogical payload (authored knowledge, from the VKR) ────────────────

export interface MisconceptionDirective {
  /** The learner belief to guard against, as authored. */
  misconception: string
  /** What the generation must do to avoid reinforcing it. */
  guardance: string
}

/** The visualization contract. Carries the VIE's `VisualIntent` — never a
 *  renderer, a VisualType, or an ADR 12 identifier. Renderer selection stays
 *  downstream and deterministic. */
export interface VisualizationDirective {
  required: boolean
  intent: VisualIntent | null
  /** Plain-language recommendations from the VKR, for the prompt builder. */
  emphasisTargets: readonly string[]
  narrationRecommendations: readonly string[]
  accessibilityRequirement: string | null
}

export interface ExplanationRequirement {
  required: boolean
  learningObjectives: readonly string[]
  /** Concepts the learner is assumed to hold already. */
  prerequisiteConceptIds: readonly string[]
  /** True when the turn is a definition request rather than a full teach. */
  definitionOnly: boolean
}

export interface AssessmentRequirement {
  required: boolean
  /** Authored probe prompts from the VKR. */
  assessmentHints: readonly string[]
  /** The generation must not give away the answer it is about to ask for. */
  mustNotRevealAnswer: boolean
  /** True when the turn ends by waiting on the learner. */
  expectsStudentResponse: boolean
}

export interface WorkedExampleRequirement {
  required: boolean
  /** Step-by-step working is expected, not just a result. */
  showSteps: boolean
}

export interface RevisionRequirement {
  required: boolean
  /** Retrieval-first: prompt recall before re-teaching. */
  retrievalFirst: boolean
}

// ── Response constraints ──────────────────────────────────────────────────

/** Hard limits the single generation must respect. Deterministic values, not
 *  advice — a prompt builder turns these into whatever wording it uses. */
export interface ResponseConstraints {
  /** At most one teaching action per turn. */
  maxTeachingActions: number
  /** Ceiling on questions asked in one turn. */
  maxQuestions: number
  /** True when the turn must end on a question. */
  mustEndWithQuestion: boolean
  /** Claims the response must not state (e.g. an assessment's answer). */
  mustNotReveal: readonly string[]
  /** Learner-facing output language (BCP-47). */
  language: string
}

// ── Conversation + metadata ───────────────────────────────────────────────

/** Read-only reference to conversation state. This layer does not own it. */
export interface ConversationContextRef {
  /** The concept the previous turn addressed. */
  previousConceptId: string | null
  /** The learner's message this turn. */
  studentMessage: string
  /** Existing detectLearnerRequest() signal, passed through unchanged. */
  learnerRequest: 'diagram' | 'real_life_example' | 'explain_differently' | null
}

export interface ExecutionMetadata {
  /** The ExecutionPlan this request was derived from. */
  executionId: string
  teachingIntent: TeachingIntent
  /** Plan steps folded into this single generation. */
  foldedSteps: readonly ExecutionStepKind[]
  /** Steps deliberately NOT folded, with the reason — e.g. UNDERSTAND, which
   *  already ran, and WAIT_FOR_STUDENT, which is control flow. */
  excludedSteps: readonly string[]
  /** Provenance trace. */
  reasoning: readonly string[]
}

// ── The request ───────────────────────────────────────────────────────────

/** Everything required for ONE teaching generation. */
export interface TeachingGenerationRequest {
  /** Deterministic content-derived id. */
  requestId: string
  concept: ConceptDirective
  lesson: LessonDirective
  explanation: ExplanationRequirement
  visualization: VisualizationDirective
  assessment: AssessmentRequirement
  workedExample: WorkedExampleRequirement
  revision: RevisionRequirement
  misconceptions: readonly MisconceptionDirective[]
  constraints: ResponseConstraints
  conversation: ConversationContextRef
  metadata: ExecutionMetadata
  /** True when this turn asks the learner to disambiguate instead of teaching. */
  disambiguationRequested: boolean
}

// ── Response contract ─────────────────────────────────────────────────────

/**
 * The structured result expected back from ONE generation. Declared here as a
 * contract only — no LLM is implemented, called, or parsed in this iteration.
 */
export interface TeachingGenerationResponse {
  requestId: string
  /** The learner-facing teaching text. */
  content: string
  /** Set when the generation produced an assessment item. */
  assessment?: {
    question: string
    options?: readonly string[]
    /** Never shown to the learner; consumed by the grading path. */
    expectedAnswer?: string
  }
  /**
   * Whether the generation actually taught toward a visual. The VIE and ADR 12
   * run AFTER this, deterministically — the model does not select a renderer,
   * a VisualType, or an asset. It only reports whether its content assumes a
   * visual is present.
   */
  visualReferenced: boolean
  /** Set when the response asks the learner to pick among candidates. */
  disambiguationOffered?: readonly string[]
  /** True when the response handed control back to the lesson. */
  returnedToLesson: boolean
}

/** Structural validation of a response against the request that produced it.
 *  Returns the reasons it is invalid; empty means well-formed. Never judges
 *  teaching quality — that is not a structural property. */
export function validateTeachingGenerationResponse(
  request: TeachingGenerationRequest,
  response: TeachingGenerationResponse,
): string[] {
  const problems: string[] = []

  if (response.requestId !== request.requestId) {
    problems.push(`requestId mismatch: response ${response.requestId} does not match request ${request.requestId}`)
  }
  if (typeof response.content !== 'string' || response.content.trim() === '') {
    problems.push('content is required and must be non-empty')
  }
  if (request.assessment.required && !response.assessment) {
    problems.push('assessment was required but the response carries none')
  }
  if (!request.assessment.required && response.assessment) {
    problems.push('response carries an assessment that was not requested')
  }
  if (request.disambiguationRequested && !response.disambiguationOffered?.length) {
    problems.push('disambiguation was requested but no candidates were offered')
  }
  if (request.lesson.mustReturnToLesson && !response.returnedToLesson) {
    problems.push('an excursion was open; the response did not return to the lesson')
  }
  for (const claim of request.constraints.mustNotReveal) {
    if (claim && response.content.toLowerCase().includes(claim.toLowerCase())) {
      problems.push(`response reveals a withheld claim: "${claim}"`)
    }
  }
  return problems
}
