/**
 * Student Intelligence barrel — the persistent learner model layer.
 *
 *   Student ▶ [Student Intelligence] ▶ Learning Orchestrator ▶ Educational
 *   Brain ▶ Educational Package ▶ Tutor Max
 *
 * Pure core: buildStudentIntelligence (studentIntelligence.ts).
 * Loader: loadStudentIntelligence — reuses the Evidence Loop's read-only
 * corpus loader; no storage of its own, the profile is derived on read.
 */
export * from './studentIntelligence'

import { loadEvidenceCorpus } from '../evidence/evidenceLoad'
import { readLessonEvidence } from '../evidence/evidenceReader'
import { buildStudentIntelligence } from './studentIntelligence'
import type { StudentIntelligence, StudentIntelligenceOptions } from './studentIntelligence'

/**
 * Load one learner's Student Intelligence profile from the live evidence
 * tables (read-only). `now` defaults to the current clock here — the pure
 * builder itself never reads time.
 */
export async function loadStudentIntelligence(
  userId: string,
  options?: Partial<StudentIntelligenceOptions>,
): Promise<StudentIntelligence> {
  const corpus = await loadEvidenceCorpus({ userId })
  const lessons = readLessonEvidence(corpus)
  return buildStudentIntelligence(userId, lessons, { now: options?.now ?? new Date(), ...options })
}
