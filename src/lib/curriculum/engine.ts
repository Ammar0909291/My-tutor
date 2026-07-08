import { findLibrarySubject, modulesForLevelSpan, type LevelIndex } from '@/lib/curriculum/subjectCatalog'
import { normalizeToCanonicalLevel, type CurriculumLevel } from '@/lib/curriculum/levels'

export interface Roadmap {
  subject: string
  currentLevel: string
  targetLevel: string | null
  milestones: string[]
}

// Maps the canonical 3-tier level onto subjectCatalog.ts's existing 0-5
// LevelIndex scale so modulesForLevelSpan() — real, per-module authored
// level metadata that already existed but had zero callers — can slice the
// roadmap correctly, instead of guessing. This catalog is a separate,
// coarser module list from the canonical Knowledge Graph that
// /api/curriculum actually serves lessons from (see
// src/lib/curriculum/placement.ts for the KG-accurate version, which is
// what actually determines the learner's lesson/unit position) — this only
// makes the prompt text describing the roadmap consistent with that.
const LEVEL_TO_INDEX: Record<CurriculumLevel, LevelIndex> = {
  beginner: 1,
  intermediate: 2,
  advanced: 3,
}

export function generateRoadmap(
  subjectCode: string,
  currentLevel: string,
  targetLevel: string | null
): Roadmap | null {
  const subject = findLibrarySubject(subjectCode)
  if (!subject) return null
  const levelIndex = LEVEL_TO_INDEX[normalizeToCanonicalLevel(currentLevel)]
  const relevantModules = modulesForLevelSpan(subject, levelIndex, null)
  return {
    subject: subject.name,
    currentLevel,
    targetLevel,
    milestones: relevantModules.map((m) => m.title),
  }
}

export function buildTutorRoadmapContext(roadmap: Roadmap): string {
  const targetLine = roadmap.targetLevel ? ` toward "${roadmap.targetLevel}"` : ''
  const milestones = roadmap.milestones
    .slice(0, 8)
    .map((m, i) => `${i + 1}. ${m}`)
    .join('\n')
  return `LEARNER ROADMAP for ${roadmap.subject} (currently at "${roadmap.currentLevel}"${targetLine}):\n${milestones}\nStay aligned with this sequence — don't skip ahead of the learner's current level.`
}
