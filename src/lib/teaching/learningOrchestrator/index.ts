/**
 * Learning Orchestrator barrel — decision layer between Student Intelligence
 * and the Educational Brain. Pure core in learningOrchestrator.ts; this file
 * adds the thin loaders that build its inputs from existing systems:
 *
 *   curriculum  — the subject's canonical KG via the EXISTING adapter
 *                 (subjectKgAdapter/knowledgeGraph registry; entry order via
 *                 the placement module's difficulty-tag convention)
 *   profile     — loadStudentIntelligence (Student Intelligence layer)
 *   packages    — artifactPackageIndex (Evidence Loop's brain/packages index)
 *
 * Not wired into any serving path — consuming a LearningIntent in route.ts
 * is a runtime change and stays G2-gated.
 */
export * from './learningOrchestrator'

import { createSubjectAdapter } from '@/lib/curriculum/subjectKgAdapter'
import { artifactPackageIndex } from '../evidence/evidenceLoad'
import { loadStudentIntelligence } from '../studentIntelligence'
import { orchestrate } from './learningOrchestrator'
import type { CurriculumConcept, LearningIntent, OrchestratorThresholds } from './learningOrchestrator'

/** The subject's concepts in authored (entry) order with prerequisites —
 *  exactly the two fields the orchestrator consumes, from the existing KG
 *  adapter. Returns [] for non-KG subjects (orchestrator then has no
 *  curriculum to advance along, and says so in its rationale). */
export function buildCurriculumContext(subject: string): CurriculumConcept[] {
  try {
    // The adapter reads docs/{subject}/kg/graph.json lazily and throws for
    // subjects without a canonical KG — those get an empty curriculum here
    // (the orchestrator still handles remediation/review/calibration, it
    // just has no frontier to advance along).
    return createSubjectAdapter(subject).getNodes().map((n) => ({
      conceptId: n.id,
      prerequisites: n.prerequisites ?? [],
    }))
  } catch {
    return []
  }
}

/** Load profile + curriculum + package index and produce the learner's
 *  LearningIntent for one subject. Read-only end to end. */
export async function loadLearningIntent(
  userId: string,
  subject: string,
  options?: { now?: Date; thresholds?: OrchestratorThresholds },
): Promise<LearningIntent> {
  const profile = await loadStudentIntelligence(userId, { now: options?.now })
  return orchestrate(
    profile,
    {
      curriculum: buildCurriculumContext(subject),
      packageIndex: artifactPackageIndex,
    },
    options?.thresholds,
  )
}
