/**
 * Student State — the query shape Explanation Memory and the Teaching Action
 * Repository match candidate assets against. Deliberately derived ONLY from
 * data that already exists on Profile/LearnSession — no schema changes to
 * any existing model, no new required fields on any existing API.
 *
 * grade → GradeBand mapping is a best-effort approximation (ADR 14/13's
 * GradeBand enum predates this file); general learners with no grade set
 * default to ADULT, matching the placeholder already hardcoded at the one
 * live EvidenceEngine call site in route.ts.
 */
import { GradeBand } from '@prisma/client'

export interface StudentState {
  conceptId: string
  subjectSlug: string
  language: string // BCP-47, e.g. "en", "ru", "hi"
  gradeBand: GradeBand
  experienceLevel?: 'beginner' | 'intermediate' | 'expert'
  userMessage: string
}

export interface StudentStateInput {
  conceptId: string
  subjectSlug: string
  teachingLanguage: string
  grade?: number | null
  currentLevel?: string | null
  targetLevel?: string | null
  userMessage: string
}

export function gradeToGradeBand(grade?: number | null): GradeBand {
  if (grade == null) return GradeBand.ADULT
  if (grade <= 2) return GradeBand.EARLY
  if (grade <= 5) return GradeBand.ELEMENTARY
  if (grade <= 8) return GradeBand.MIDDLE
  if (grade <= 12) return GradeBand.HIGH
  return GradeBand.UNDERGRADUATE
}

function inferExperienceLevel(currentLevel?: string | null, targetLevel?: string | null): StudentState['experienceLevel'] {
  const text = `${currentLevel ?? ''} ${targetLevel ?? ''}`.toLowerCase()
  if (/beginner|novice|new to|just starting/.test(text)) return 'beginner'
  if (/expert|advanced|proficient|professional/.test(text)) return 'expert'
  if (/intermediate|some experience|comfortable/.test(text)) return 'intermediate'
  return undefined
}

export function buildStudentState(input: StudentStateInput): StudentState {
  return {
    conceptId: input.conceptId,
    subjectSlug: input.subjectSlug,
    language: input.teachingLanguage,
    gradeBand: gradeToGradeBand(input.grade),
    experienceLevel: inferExperienceLevel(input.currentLevel, input.targetLevel),
    userMessage: input.userMessage,
  }
}
