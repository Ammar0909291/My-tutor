/**
 * Generic Teaching Asset schema — the "HOW to teach" layer.
 *
 * The Knowledge Graph (knowledgeGraph.ts / subjectKgAdapter.ts) already decides
 * WHAT to teach (concept), WHEN (prerequisites/unlocks), and WHY next (Teaching
 * Engine decision). This schema covers HOW: the reusable teaching scaffolding
 * attached to a single concept ID, identical in shape for every subject.
 *
 * Deliberately excludes any subject-specific field (no formula/reaction/code
 * fields) — every field here is generic prose/structure that applies equally
 * to a math theorem, a physics law, a chemical reaction, a biological process,
 * or a CS algorithm. Mirrors the KG's own domain/concept_type convention: this
 * schema holds no curriculum content duplicated from graph.json (no copy of
 * `description`) — only teaching scaffolding keyed by concept_id.
 */

import { z } from 'zod'

export const TeachingAssetStatus = z.enum(['placeholder', 'draft', 'reviewed', 'published'])
export type TeachingAssetStatus = z.infer<typeof TeachingAssetStatus>

export const MisconceptionEntrySchema = z.object({
  misconception: z.string().min(1),
  correction: z.string().min(1),
})
export type MisconceptionEntry = z.infer<typeof MisconceptionEntrySchema>

export const WorkedExampleBlueprintSchema = z.object({
  setup: z.string().min(1),
  steps: z.array(z.string().min(1)).min(1),
  expected_outcome: z.string().min(1),
})
export type WorkedExampleBlueprint = z.infer<typeof WorkedExampleBlueprintSchema>

export const PracticeBlueprintSchema = z.object({
  item_types: z.array(z.string().min(1)).min(1),
  difficulty_progression: z.string().min(1),
  suggested_count: z.number().int().positive(),
})
export type PracticeBlueprint = z.infer<typeof PracticeBlueprintSchema>

export const AssessmentBlueprintSchema = z.object({
  formats: z.array(z.string().min(1)).min(1),
  bloom_alignment: z.string().min(1),
  mastery_signal: z.string().min(1),
})
export type AssessmentBlueprint = z.infer<typeof AssessmentBlueprintSchema>

/** The 10 required teaching dimensions, plus identity/lifecycle metadata. */
export const TeachingAssetSchema = z.object({
  id:                            z.string().min(1),   // `asset.<concept_id>`
  concept_id:                    z.string().min(1),   // FK into the subject's graph.json
  version:                       z.string().min(1),
  status:                        TeachingAssetStatus,

  learning_objective:            z.string().min(1),    // 1
  concept_summary:               z.string().min(1),    // 2
  key_ideas:                     z.array(z.string().min(1)).min(1),                 // 3
  common_misconceptions:         z.array(MisconceptionEntrySchema).min(1),          // 4
  visual_teaching_suggestions:   z.array(z.string().min(1)).min(1),                 // 5
  worked_example_blueprint:      WorkedExampleBlueprintSchema,                       // 6
  practice_blueprint:            PracticeBlueprintSchema,                           // 7
  assessment_blueprint:          AssessmentBlueprintSchema,                         // 8
  real_world_applications:       z.array(z.string().min(1)).min(1),                 // 9
  prerequisite_review_triggers:  z.array(z.string()),                               // 10 (may be empty for root concepts)
})
export type TeachingAsset = z.infer<typeof TeachingAssetSchema>

export const TeachingAssetFileSchema = z.object({
  name: z.string().min(1),
  version: z.string().min(1),
  status: z.string().min(1),
  build_date: z.string().min(1),
  subject: z.string().min(1),
  assets: z.array(TeachingAssetSchema),
})
export type TeachingAssetFile = z.infer<typeof TeachingAssetFileSchema>
