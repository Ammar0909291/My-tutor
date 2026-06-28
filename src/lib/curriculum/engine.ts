import { findLibrarySubject } from '@/lib/curriculum/subjectCatalog'

export interface Roadmap {
  subject: string
  currentLevel: string
  targetLevel: string | null
  milestones: string[]
}

export function generateRoadmap(
  subjectCode: string,
  currentLevel: string,
  targetLevel: string | null
): Roadmap | null {
  const subject = findLibrarySubject(subjectCode)
  if (!subject) return null
  return {
    subject: subject.name,
    currentLevel,
    targetLevel,
    milestones: subject.modules.map((m) => m.title),
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
