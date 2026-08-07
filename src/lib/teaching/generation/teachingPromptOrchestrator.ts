/**
 * Teaching Prompt Orchestrator.
 *
 * Consumes an `ExecutionPlan` and produces exactly ONE
 * `TeachingGenerationRequest` — the structured input for a single teaching
 * generation. It replaces the multi-dispatcher execution model: the plan's
 * steps are FOLDED into one request rather than dispatched as separate calls.
 *
 * It does NOT write prompts. It produces structured data; prompt construction
 * is a separate downstream concern. Pure, synchronous, deterministic — no LLM,
 * no database, no Prisma, no rendering, no runtime integration.
 *
 * Nothing upstream is redesigned: the Execution Planner, Teaching Planner,
 * Concept Understanding, VIE and VKR are all consumed exactly as they exist.
 */

import { ExecutionStepKind, type ExecutionPlan } from '../execution/executionPlan'
import { TeachingIntent, type TeachingPlan } from '../planner/teachingPlan'
import type { ConceptUnderstanding } from '../concept/conceptUnderstanding'
import { lookupVisualKnowledge } from '../visualKnowledgeRegistry'
import { buildVisualIntentFromRegistry } from '../visualIntelligenceEngine'
import type {
  TeachingGenerationRequest, ConceptDirective, LessonDirective,
  ExplanationRequirement, VisualizationDirective, AssessmentRequirement,
  WorkedExampleRequirement, RevisionRequirement, MisconceptionDirective,
  ResponseConstraints, ConversationContextRef, ExecutionMetadata,
} from './teachingGenerationRequest'

export interface OrchestratorInputs {
  executionPlan: ExecutionPlan
  teachingPlan: TeachingPlan
  /** Concept Understanding's result, when available — read for ambiguity and
   *  concept identity. Never re-resolved here. */
  concepts?: ConceptUnderstanding | null
  studentMessage: string
  /** Learner-facing output language (BCP-47). */
  language?: string
  previousConceptId?: string | null
  learnerRequest?: 'diagram' | 'real_life_example' | 'explain_differently' | null
}

/** Steps that are never folded into the generation, with the reason. */
const NON_GENERATION_STEPS: Readonly<Record<string, string>> = {
  [ExecutionStepKind.UNDERSTAND]: 'concept understanding already ran upstream',
  [ExecutionStepKind.WAIT_FOR_STUDENT]: 'control flow, not content',
  [ExecutionStepKind.LESSON_RESUME]: 'expressed as lesson.mustReturnToLesson',
  [ExecutionStepKind.LESSON_FLOW]: 'expressed as lesson context',
}

/** FNV-1a — deterministic, no clock, no randomness. */
function deterministicId(parts: readonly string[]): string {
  let hash = 0x811c9dc5
  const input = parts.join('|')
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i)
    hash = Math.imul(hash, 0x01000193) >>> 0
  }
  return `gen_${hash.toString(16).padStart(8, '0')}`
}

function hasStep(plan: ExecutionPlan, kind: ExecutionStepKind): boolean {
  return plan.orderedSteps.some(s => s.kind === kind)
}

// ── Section builders ──────────────────────────────────────────────────────

function buildConcept(inputs: OrchestratorInputs): ConceptDirective {
  const { teachingPlan, concepts } = inputs
  const conceptId = teachingPlan.targetConceptId
  const knowledge = lookupVisualKnowledge(conceptId)
  const matched = concepts?.matches.find(m => m.conceptId === conceptId)
  return {
    conceptId,
    title: matched?.title ?? (knowledge ? conceptId : null),
    comparisonConceptIds: teachingPlan.comparisonConceptIds,
    ambiguous: concepts?.ambiguityDetected ?? false,
    ambiguityCandidateIds: concepts?.ambiguityCandidates.map(c => c.conceptId) ?? [],
  }
}

function buildLesson(inputs: OrchestratorInputs): LessonDirective {
  const { teachingPlan, executionPlan } = inputs
  return {
    lessonMode: teachingPlan.lessonMode,
    executionMode: executionPlan.executionMode,
    activeLessonConceptId: teachingPlan.excursion.returnToConceptId
      ?? (teachingPlan.excursion.isExcursion ? null : teachingPlan.targetConceptId),
    isExcursion: teachingPlan.excursion.isExcursion,
    resumeConceptId: executionPlan.resumeInstruction.resumeConceptId,
    mustReturnToLesson: executionPlan.resumeInstruction.shouldResume
      && teachingPlan.excursion.returnToLesson,
  }
}

function buildExplanation(inputs: OrchestratorInputs): ExplanationRequirement {
  const { executionPlan, teachingPlan } = inputs
  const knowledge = lookupVisualKnowledge(teachingPlan.targetConceptId)
  return {
    required: hasStep(executionPlan, ExecutionStepKind.EXPLAIN),
    learningObjectives: knowledge?.learningObjectives ?? [],
    prerequisiteConceptIds: knowledge?.prerequisiteMappings.map(p => p.conceptId) ?? [],
    definitionOnly: teachingPlan.intent === TeachingIntent.DEFINE_TERM,
  }
}

function buildVisualization(inputs: OrchestratorInputs): VisualizationDirective {
  const { executionPlan, teachingPlan } = inputs
  const required = hasStep(executionPlan, ExecutionStepKind.VISUALIZE)
  const conceptId = teachingPlan.targetConceptId
  const knowledge = lookupVisualKnowledge(conceptId)
  return {
    required,
    // The VIE is consumed as it exists; renderer selection stays downstream.
    intent: required ? buildVisualIntentFromRegistry(conceptId) : null,
    emphasisTargets: required ? knowledge?.emphasisTargets ?? [] : [],
    narrationRecommendations: required ? knowledge?.narrationRecommendations ?? [] : [],
    accessibilityRequirement: required ? knowledge?.accessibilityGuidance ?? null : null,
  }
}

function buildAssessment(inputs: OrchestratorInputs): AssessmentRequirement {
  const { executionPlan, teachingPlan } = inputs
  const required = hasStep(executionPlan, ExecutionStepKind.ASSESS)
  const knowledge = lookupVisualKnowledge(teachingPlan.targetConceptId)
  return {
    required,
    assessmentHints: required ? knowledge?.assessmentHints ?? [] : [],
    mustNotRevealAnswer: required,
    expectsStudentResponse: hasStep(executionPlan, ExecutionStepKind.WAIT_FOR_STUDENT),
  }
}

function buildWorkedExample(plan: ExecutionPlan): WorkedExampleRequirement {
  const required = hasStep(plan, ExecutionStepKind.WORKED_EXAMPLE)
  return { required, showSteps: required }
}

function buildRevision(plan: ExecutionPlan): RevisionRequirement {
  const required = hasStep(plan, ExecutionStepKind.REVISION)
  return { required, retrievalFirst: required }
}

function buildMisconceptions(inputs: OrchestratorInputs): readonly MisconceptionDirective[] {
  const knowledge = lookupVisualKnowledge(inputs.teachingPlan.targetConceptId)
  return knowledge?.misconceptionMappings.map(m => ({
    misconception: m.misconception,
    guardance: m.guardance,
  })) ?? []
}

function buildConstraints(inputs: OrchestratorInputs, assessment: AssessmentRequirement): ResponseConstraints {
  const { executionPlan } = inputs
  const asking = assessment.required || executionPlan.deferredSteps.length > 0
    || hasStep(executionPlan, ExecutionStepKind.ASK_DISAMBIGUATION)
  return {
    maxTeachingActions: 1,
    maxQuestions: asking ? 1 : 0,
    mustEndWithQuestion: asking,
    // An assessment must not be answered by the same turn that asks it.
    mustNotReveal: assessment.required ? assessment.assessmentHints : [],
    language: inputs.language ?? 'en',
  }
}

function buildMetadata(inputs: OrchestratorInputs): ExecutionMetadata {
  const { executionPlan, teachingPlan } = inputs
  const folded: ExecutionStepKind[] = []
  const excluded: string[] = []
  for (const step of executionPlan.orderedSteps) {
    const reason = NON_GENERATION_STEPS[step.kind]
    if (reason) excluded.push(`${step.kind}: ${reason}`)
    else if (!folded.includes(step.kind)) folded.push(step.kind)
  }
  return {
    executionId: executionPlan.executionId,
    teachingIntent: teachingPlan.intent,
    foldedSteps: folded,
    excludedSteps: excluded,
    reasoning: [
      `Folded ${folded.length} plan step(s) into ONE generation request (single-generation runtime model).`,
      ...executionPlan.diagnostics,
    ],
  }
}

// ── Entry point ───────────────────────────────────────────────────────────

/**
 * Convert an ExecutionPlan into exactly ONE TeachingGenerationRequest.
 *
 * Every plan produces exactly one request regardless of how many steps it
 * carries — that is the architectural point of the single-generation model,
 * and it is asserted in the tests.
 */
export function orchestrateTeachingGeneration(
  inputs: OrchestratorInputs,
): TeachingGenerationRequest {
  const concept = buildConcept(inputs)
  const lesson = buildLesson(inputs)
  const explanation = buildExplanation(inputs)
  const visualization = buildVisualization(inputs)
  const assessment = buildAssessment(inputs)
  const workedExample = buildWorkedExample(inputs.executionPlan)
  const revision = buildRevision(inputs.executionPlan)
  const misconceptions = buildMisconceptions(inputs)
  const constraints = buildConstraints(inputs, assessment)
  const metadata = buildMetadata(inputs)

  const conversation: ConversationContextRef = {
    previousConceptId: inputs.previousConceptId ?? null,
    studentMessage: inputs.studentMessage,
    learnerRequest: inputs.learnerRequest ?? null,
  }

  return {
    requestId: deterministicId([
      inputs.executionPlan.executionId,
      concept.conceptId ?? 'none',
      ...metadata.foldedSteps,
    ]),
    concept,
    lesson,
    explanation,
    visualization,
    assessment,
    workedExample,
    revision,
    misconceptions,
    constraints,
    conversation,
    metadata,
    disambiguationRequested: hasStep(inputs.executionPlan, ExecutionStepKind.ASK_DISAMBIGUATION),
  }
}
