/**
 * Teaching Action Engine — deterministic execution layer.
 *
 * decideAction() turns (StudentState, TeachingDecision, TeachingAsset,
 * ConceptNode) into a single TeachingAction: a structured plan describing
 * HOW the concept should be presented. It is pure and deterministic — no
 * I/O, no LLM calls, no randomness — exactly like decide() in
 * src/lib/teaching-engine/index.ts, which this layer consumes but never
 * modifies.
 *
 * Subject independence: every branch below keys off generic signals already
 * present on ConceptNode/TeachingDecision/TeachingAsset (concept_type, bloom,
 * mode, difficulty, prerequisites, estimated_hours, asset blueprint shapes).
 * None of it inspects concept_id content or any subject-specific vocabulary.
 *
 * ARCHIVED — ORPHANED, ZERO LIVE IMPORTERS.
 * Nothing under src/app/ or src/components/ imports this module or
 * src/lib/teaching-engine/index.ts. The live teaching-decision system is
 * src/lib/school/adaptive/*, wired into src/app/api/learn/chat/route.ts.
 * See docs/EDUCATIONAL_BRAIN_CONSOLIDATION.md for the full evidence and
 * decision. Kept in place (not deleted) as a reference implementation —
 * do not build new features on top of this stack without amending that ADR.
 */

import type { StudentState, TeachingDecision, ConceptNode } from '../teaching-engine/types'
import type { TeachingAsset } from './teachingAssetSchema'
import type { TeachingAction, TeachingActionType, PresentationMode } from './teachingActionSchema'

// ── Presentation-mode classification ──────────────────────────────────────

const VISUAL_TYPES = new Set<TeachingActionType>([
  'VISUAL_EXPLANATION', 'INTERACTIVE_DIAGRAM', 'ANIMATION', 'SIMULATION', 'TIMELINE',
])
const INTERACTIVE_TYPES = new Set<TeachingActionType>([
  'SOCRATIC_QUESTIONING', 'GUIDED_PROBLEM_SOLVING', 'CONCEPT_COMPARISON',
  'PRACTICE_SESSION', 'RETRIEVAL_PRACTICE', 'MISCONCEPTION_INTERVENTION', 'RAPID_REVIEW',
])

function presentationModeFor(actionType: TeachingActionType): PresentationMode {
  if (actionType === 'ASSESSMENT') return 'assessment'
  if (actionType === 'EXPERIMENT_DEMONSTRATION') return 'experiential'
  if (VISUAL_TYPES.has(actionType)) return 'visual'
  if (INTERACTIVE_TYPES.has(actionType)) return 'interactive'
  return 'verbal' // WORKED_EXAMPLE, ANALOGY
}

// ── Base action-type table: (engine action_type, concept_type) → TeachingActionType ──

const BASE_TABLE: Record<TeachingDecision['action_type'], Record<ConceptNode['concept_type'], TeachingActionType>> = {
  VISUAL_EXPLANATION: {
    visual:          'ANIMATION',
    conceptual:      'VISUAL_EXPLANATION',
    application:     'INTERACTIVE_DIAGRAM',
    problem_solving: 'VISUAL_EXPLANATION',
  },
  STEP_BY_STEP_GUIDED: {
    visual:          'ANIMATION',
    conceptual:      'WORKED_EXAMPLE',
    application:     'WORKED_EXAMPLE',
    problem_solving: 'GUIDED_PROBLEM_SOLVING',
  },
  INTERACTIVE_QUESTIONING: {
    visual:          'INTERACTIVE_DIAGRAM',
    conceptual:      'SOCRATIC_QUESTIONING',
    application:     'CONCEPT_COMPARISON',
    problem_solving: 'SOCRATIC_QUESTIONING',
  },
  PROBLEM_SOLVING_SESSION: {
    visual:          'SIMULATION',
    conceptual:      'GUIDED_PROBLEM_SOLVING',
    application:     'PRACTICE_SESSION',
    problem_solving: 'PRACTICE_SESSION',
  },
  // MISCONCEPTION_FIX and RAPID_REVIEW are resolved before the table is consulted.
  MISCONCEPTION_FIX: { visual: 'MISCONCEPTION_INTERVENTION', conceptual: 'MISCONCEPTION_INTERVENTION', application: 'MISCONCEPTION_INTERVENTION', problem_solving: 'MISCONCEPTION_INTERVENTION' },
  RAPID_REVIEW:       { visual: 'RAPID_REVIEW', conceptual: 'RAPID_REVIEW', application: 'RAPID_REVIEW', problem_solving: 'RAPID_REVIEW' },
}

// ── Action-type resolution ────────────────────────────────────────────────

function resolveActionType(
  student: StudentState,
  decision: TeachingDecision,
  asset: TeachingAsset,
  concept: ConceptNode,
): TeachingActionType {
  // 1. A flagged misconception always gets a direct intervention.
  if (decision.action_type === 'MISCONCEPTION_FIX') return 'MISCONCEPTION_INTERVENTION'

  // 2. Accelerating into a high-order Bloom level means checking mastery
  //    before advancing, not teaching more.
  if (decision.mode === 'accelerate' && (concept.bloom === 'evaluate' || concept.bloom === 'create')) {
    return 'ASSESSMENT'
  }

  // 3. Remediation always gets fully scaffolded guided solving, regardless
  //    of the base action type decide() chose.
  if (decision.mode === 'remediate') return 'GUIDED_PROBLEM_SOLVING'

  // 4. Review: low retention needs active recall, not a passive pass.
  if (decision.action_type === 'RAPID_REVIEW') {
    return student.retention_score < 70 ? 'RETRIEVAL_PRACTICE' : 'RAPID_REVIEW'
  }

  // 5. A concept with no prerequisites has nothing to build on yet —
  //    bridge it with an analogy before any other treatment.
  if (decision.mode === 'teach' && concept.prerequisites.length === 0) return 'ANALOGY'

  // 6. A conceptual concept that takes a long time to learn is usually a
  //    multi-stage process — present it as a sequence.
  if (concept.concept_type === 'conceptual' && (concept.estimated_hours ?? 0) >= 5) return 'TIMELINE'

  // 7. An applied concept with multiple real-world applications is best
  //    grounded in a concrete demonstration.
  if (concept.concept_type === 'application' && concept.bloom === 'apply' && asset.real_world_applications.length >= 2) {
    return 'EXPERIMENT_DEMONSTRATION'
  }

  // 8. Otherwise, use the generic action-type × concept-type table.
  let resolved = BASE_TABLE[decision.action_type][concept.concept_type]

  // 9. Accelerating learners need independent practice, not guided hand-holding.
  if (decision.mode === 'accelerate' && resolved === 'GUIDED_PROBLEM_SOLVING') resolved = 'PRACTICE_SESSION'

  return resolved
}

// ── Field builders ────────────────────────────────────────────────────────

function visualRequirementsFor(mode: PresentationMode, asset: TeachingAsset): string[] {
  return mode === 'visual' || mode === 'experiential' ? asset.visual_teaching_suggestions : []
}

function interactionRequirementsFor(mode: PresentationMode, asset: TeachingAsset): string[] {
  return mode === 'interactive' || mode === 'assessment' ? asset.practice_blueprint.item_types : []
}

// ── Public API ────────────────────────────────────────────────────────────

export function decideAction(
  student: StudentState,
  decision: TeachingDecision,
  asset: TeachingAsset,
  concept: ConceptNode,
): TeachingAction {
  const action_type = resolveActionType(student, decision, asset, concept)
  const presentation_mode = presentationModeFor(action_type)

  return {
    action_id:               `action.${concept.id}.${action_type}`,
    concept_id:              concept.id,
    action_type,
    presentation_mode,
    difficulty_level:        decision.difficulty,
    estimated_duration:      decision.estimated_time,
    objective:               asset.learning_objective,
    required_prerequisites:  concept.prerequisites,
    visual_requirements:     visualRequirementsFor(presentation_mode, asset),
    interaction_requirements: interactionRequirementsFor(presentation_mode, asset),
    assessment_trigger:      action_type === 'ASSESSMENT' || decision.mode === 'accelerate',
    completion_criteria:     asset.assessment_blueprint.mastery_signal,
  }
}
