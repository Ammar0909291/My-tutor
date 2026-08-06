/**
 * Phases 1 + 4 — shadow execution and legacy comparison.
 *
 * Runs the completed Brain alongside the legacy runtime and captures its
 * artifacts. It MUST NOT affect the production response: it produces data for
 * comparison and nothing else, never throws, and is invoked only behind
 * `BRAIN_RUNTIME_MODE`.
 *
 * No new architecture — this composes existing pieces in their existing order:
 *   Concept Understanding -> Teaching Planner -> Execution Planner
 *   -> Prompt Orchestrator -> Prompt Builder -> provider adapter
 *
 * The provider adapter is invoked but NO LLM CALL IS MADE in shadow mode.
 */

import { understandConcepts } from '../concept/conceptUnderstandingEngine'
import { buildConceptIndexFromKnowledgeGraph } from '../concept/conceptIndexSource'
import { planTeachingTurn } from '../planner/teachingPlanner'
import { planExecution } from '../execution/executionPlanner'
import { ExecutionStepKind } from '../execution/executionPlan'
import { orchestrateTeachingGeneration } from '../generation/teachingPromptOrchestrator'
import { buildPromptPackage } from '../generation/promptBuilder'
import { toProviderRequest } from '../generation/providerAdapter'
import type { ConceptUnderstanding, ConceptIndexEntry } from '../concept/conceptUnderstanding'
import type { TeachingPlan } from '../planner/teachingPlan'
import type { ExecutionPlan } from '../execution/executionPlan'
import type { TeachingGenerationRequest } from '../generation/teachingGenerationRequest'
import type { PromptPackage } from '../generation/promptPackage'
import type { ProviderRequest } from '../generation/providerAdapter'

// ── Concept index memoisation ─────────────────────────────────────────────
// Building the index walks every KG concept. It is pure and immutable, so one
// build per process is correct and keeps shadow mode off the request's
// critical path cost.
const indexCache = new Map<string, readonly ConceptIndexEntry[]>()

export function conceptIndexFor(subjectSlug: string): readonly ConceptIndexEntry[] {
  const cached = indexCache.get(subjectSlug)
  if (cached) return cached
  const built = buildConceptIndexFromKnowledgeGraph([subjectSlug])
  indexCache.set(subjectSlug, built)
  return built
}

// ── Shadow capture ────────────────────────────────────────────────────────

export interface ShadowInputs {
  message: string
  activeLessonConceptId: string | null
  subjectSlug: string
  language: string
  previousConceptId?: string | null
  learnerRequest?: 'diagram' | 'real_life_example' | 'explain_differently' | null
}

export interface ShadowCapture {
  concepts: ConceptUnderstanding
  teachingPlan: TeachingPlan
  executionPlan: ExecutionPlan
  generationRequest: TeachingGenerationRequest
  promptPackage: PromptPackage
  providerRequest: ProviderRequest
}

/**
 * Run the Brain and capture every artifact. Returns null on any failure —
 * shadow mode must be invisible to the learner, so a fault here can never
 * surface as a broken turn.
 */
export function captureShadow(inputs: ShadowInputs): ShadowCapture | null {
  try {
    const concepts = understandConcepts({
      message: inputs.message,
      activeLessonConceptId: inputs.activeLessonConceptId,
      index: conceptIndexFor(inputs.subjectSlug),
      context: { previousConceptId: inputs.previousConceptId ?? null },
    })

    const teachingPlan = planTeachingTurn({
      message: inputs.message,
      activeLessonConceptId: inputs.activeLessonConceptId,
      learnerRequest: inputs.learnerRequest ?? null,
      // Reuses Concept Understanding's own matches — never a second resolution.
      resolveConcept: () => concepts.matches.map(m => ({
        conceptId: m.conceptId, title: m.title, confidence: m.confidence,
      })),
    })

    const executionPlan = planExecution({ plan: teachingPlan, concepts })
    const generationRequest = orchestrateTeachingGeneration({
      executionPlan, teachingPlan, concepts,
      studentMessage: inputs.message,
      language: inputs.language,
      previousConceptId: inputs.previousConceptId ?? null,
      learnerRequest: inputs.learnerRequest ?? null,
    })
    const promptPackage = buildPromptPackage({ request: generationRequest })
    const providerRequest = toProviderRequest(promptPackage, inputs.message)

    return { concepts, teachingPlan, executionPlan, generationRequest, promptPackage, providerRequest }
  } catch {
    return null
  }
}

// ── Phase 4 · comparison ──────────────────────────────────────────────────

/** What the legacy runtime decided this turn, read from values route.ts has
 *  already computed. Nothing is recomputed here. */
export interface LegacyDecision {
  /** The lesson-locked concept the legacy path used. */
  conceptId: string | null
  /** Whether the legacy path resolved any visual for this turn. */
  visualResolved: boolean
  /** The legacy learner-request signal. */
  learnerRequest: string | null
}

export const MismatchKind = {
  CONCEPT_SELECTION: 'CONCEPT_SELECTION',
  VISUALIZATION_REQUEST: 'VISUALIZATION_REQUEST',
  ASSESSMENT_REQUEST: 'ASSESSMENT_REQUEST',
  LESSON_CONTINUATION: 'LESSON_CONTINUATION',
  PROMPT_GENERATION: 'PROMPT_GENERATION',
} as const
export type MismatchKind = (typeof MismatchKind)[keyof typeof MismatchKind]

export interface Mismatch {
  kind: MismatchKind
  legacy: string
  brain: string
  /** Why the two differ, stated plainly. */
  note: string
}

/**
 * Compare the legacy decision against the Brain's. Pure and read-only —
 * comparison never changes production behaviour.
 *
 * A mismatch is not automatically a defect: the whole point of the Brain is
 * that it decides differently on off-topic turns. The note says which.
 */
export function compareToLegacy(legacy: LegacyDecision, shadow: ShadowCapture): Mismatch[] {
  const out: Mismatch[] = []

  const brainConcept = shadow.teachingPlan.targetConceptId
  if (legacy.conceptId !== brainConcept) {
    out.push({
      kind: MismatchKind.CONCEPT_SELECTION,
      legacy: legacy.conceptId ?? 'none',
      brain: brainConcept ?? 'none',
      note: shadow.concepts.offTopic
        ? 'Expected divergence: the learner named a concept other than the active lesson, which the legacy path cannot represent.'
        : 'Unexpected divergence: the turn is on-topic, so both paths should agree.',
    })
  }

  const brainWantsVisual = shadow.generationRequest.visualization.required
  if (legacy.visualResolved !== brainWantsVisual) {
    out.push({
      kind: MismatchKind.VISUALIZATION_REQUEST,
      legacy: String(legacy.visualResolved),
      brain: String(brainWantsVisual),
      note: 'Legacy resolves a visual from lesson context; the Brain requires one only when the turn asked for it.',
    })
  }

  const brainWantsAssessment = shadow.generationRequest.assessment.required
  if (brainWantsAssessment) {
    out.push({
      kind: MismatchKind.ASSESSMENT_REQUEST,
      legacy: 'not represented',
      brain: 'required',
      note: 'The legacy path has no explicit assessment decision to compare against.',
    })
  }

  if (shadow.teachingPlan.excursion.isExcursion) {
    out.push({
      kind: MismatchKind.LESSON_CONTINUATION,
      legacy: 'stays in lesson',
      brain: `excursion, returns to ${shadow.teachingPlan.excursion.returnToConceptId ?? 'unknown'}`,
      note: 'Legacy has no excursion concept; it always continues the active lesson.',
    })
  }

  if (shadow.promptPackage.sections.length === 0) {
    out.push({
      kind: MismatchKind.PROMPT_GENERATION,
      legacy: 'assembled',
      brain: 'empty',
      note: 'The Brain produced no prompt sections — a genuine defect, not an expected divergence.',
    })
  }

  return out
}

/** One-line summary suitable for a production log. Never includes learner
 *  text — only decisions. */
export function summariseShadow(shadow: ShadowCapture, mismatches: readonly Mismatch[]): string {
  const steps = shadow.executionPlan.orderedSteps
    .map(s => s.kind)
    .filter(k => k !== ExecutionStepKind.WAIT_FOR_STUDENT)
    .join('>')
  return `[brain/shadow] intent=${shadow.teachingPlan.intent}` +
    ` concept=${shadow.teachingPlan.targetConceptId ?? 'none'}` +
    ` mode=${shadow.executionPlan.executionMode}` +
    ` steps=${steps || 'none'}` +
    ` prompt=${shadow.promptPackage.packageId}` +
    ` mismatches=${mismatches.length}` +
    (mismatches.length > 0 ? ` kinds=${mismatches.map(m => m.kind).join(',')}` : '')
}
