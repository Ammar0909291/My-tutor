/**
 * Generic Teaching Action schema — the execution layer between a Teaching
 * Decision + Teaching Asset and the generators (LLM, animation engine,
 * graph renderer, simulation engine, assessment generator) that will later
 * render content.
 *
 * This schema does not carry any lesson content, explanation text, or quiz
 * items — only a structured plan describing HOW the concept should be
 * presented. It is subject-agnostic: no field name or enum value here is
 * specific to mathematics, physics, chemistry, biology, or computer science.
 */

import { z } from 'zod'

/**
 * The generic action vocabulary. Every value must work identically for a
 * math theorem, a physics law, a chemical reaction, a biological process,
 * or a CS algorithm — none of these names a subject-specific rendering.
 */
export const TeachingActionType = z.enum([
  'VISUAL_EXPLANATION',
  'INTERACTIVE_DIAGRAM',
  'ANIMATION',
  'SIMULATION',
  'WORKED_EXAMPLE',
  'GUIDED_PROBLEM_SOLVING',
  'SOCRATIC_QUESTIONING',
  'CONCEPT_COMPARISON',
  'TIMELINE',
  'ANALOGY',
  'EXPERIMENT_DEMONSTRATION',
  'PRACTICE_SESSION',
  'RETRIEVAL_PRACTICE',
  'MISCONCEPTION_INTERVENTION',
  'RAPID_REVIEW',
  'ASSESSMENT',
])
export type TeachingActionType = z.infer<typeof TeachingActionType>

/** Broad rendering category a generator can dispatch on without knowing the specific action type. */
export const PresentationMode = z.enum(['visual', 'verbal', 'interactive', 'experiential', 'assessment'])
export type PresentationMode = z.infer<typeof PresentationMode>

export const TrackLevelSchema = z.enum(['T0', 'T1', 'T2', 'T3', 'T4'])

export const TeachingActionSchema = z.object({
  action_id:                z.string().min(1),
  concept_id:                z.string().min(1),
  action_type:               TeachingActionType,
  presentation_mode:         PresentationMode,
  difficulty_level:          TrackLevelSchema,
  estimated_duration:        z.number().int().positive(),   // minutes, pass-through from TeachingDecision
  objective:                 z.string().min(1),
  required_prerequisites:    z.array(z.string()),
  visual_requirements:       z.array(z.string()),            // [] when presentation_mode has no visual component
  interaction_requirements:  z.array(z.string()),             // [] when presentation_mode has no interactive component
  assessment_trigger:        z.boolean(),
  completion_criteria:       z.string().min(1),
})
export type TeachingAction = z.infer<typeof TeachingActionSchema>
