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
import { GradeBand, ProbeDifficulty } from '@prisma/client'

export interface StudentState {
  conceptId: string
  subjectSlug: string
  language: string // BCP-47, e.g. "en", "ru", "hi"
  gradeBand: GradeBand
  experienceLevel?: 'beginner' | 'intermediate' | 'expert'
  /**
   * Which rung of a difficulty ladder suits this learner right now
   * (ADR 14 §13 — Remediation Item 6). Optional: when absent, difficulty
   * contributes nothing to scoring and selection behaves exactly as it did
   * before ladders existed.
   */
  targetDifficulty?: ProbeDifficulty
  userMessage: string
}

/**
 * Derive the target ladder rung from signals StudentState ALREADY carries.
 *
 * ADR 14 §13 names TeachingDecision.bloom_level as the upstream source, but
 * that would require threading a new value in through route.ts's prompt
 * assembly. experienceLevel (already inferred from Profile.currentLevel /
 * targetLevel) and gradeBand (already mapped from Profile.grade) express the
 * same "how demanding should this be" signal and are already present at every
 * call site, so no serving code, prompt or schema has to change to make
 * difficulty a live ranking signal.
 *
 * Returns undefined when there is no signal at all, which keeps scoring
 * identical to pre-Item-6 behaviour rather than guessing a rung.
 */
export function resolveTargetDifficulty(
  experienceLevel?: StudentState['experienceLevel'],
  gradeBand?: GradeBand,
): ProbeDifficulty | undefined {
  if (experienceLevel === 'beginner') return ProbeDifficulty.FOUNDATIONAL
  if (experienceLevel === 'intermediate') return ProbeDifficulty.DEVELOPING
  if (experienceLevel === 'expert') return ProbeDifficulty.PROFICIENT
  // No self-reported level: fall back to the band's typical demand. EARLY and
  // ELEMENTARY learners get the foundational rung; UNDERGRADUATE the
  // proficient one. MIDDLE/HIGH/ADULT span the whole ladder, so they stay
  // unset rather than being pushed to a rung on no evidence.
  if (gradeBand === GradeBand.EARLY || gradeBand === GradeBand.ELEMENTARY) return ProbeDifficulty.FOUNDATIONAL
  if (gradeBand === GradeBand.UNDERGRADUATE) return ProbeDifficulty.PROFICIENT
  return undefined
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

export function inferExperienceLevel(currentLevel?: string | null, targetLevel?: string | null): StudentState['experienceLevel'] {
  const text = `${currentLevel ?? ''} ${targetLevel ?? ''}`.toLowerCase()
  if (/beginner|novice|new to|just starting/.test(text)) return 'beginner'
  if (/expert|advanced|proficient|professional/.test(text)) return 'expert'
  if (/intermediate|some experience|comfortable/.test(text)) return 'intermediate'
  return undefined
}

/**
 * A single, subject-agnostic "how plain should the language be" signal for
 * prompt-building, derived only from fields that already exist on Profile —
 * no new schema, no per-subject special-casing. Library/general learners are
 * classified from their self-reported currentLevel/targetLevel (the same
 * signal inferExperienceLevel already uses); School Mode learners (who
 * rarely set those) fall back to grade; with no signal at all, defaults to
 * the safest option — plain language — matching onboarding's own default.
 */
export function resolveContentRegister(input: {
  grade?: number | null
  currentLevel?: string | null
  targetLevel?: string | null
}): 'beginner' | 'intermediate' | 'expert' {
  const fromLevel = inferExperienceLevel(input.currentLevel, input.targetLevel)
  if (fromLevel) return fromLevel
  if (input.grade != null) {
    if (input.grade <= 5) return 'beginner'
    if (input.grade <= 12) return 'intermediate'
    return 'expert'
  }
  return 'beginner'
}

export function buildStudentState(input: StudentStateInput): StudentState {
  const gradeBand = gradeToGradeBand(input.grade)
  const experienceLevel = inferExperienceLevel(input.currentLevel, input.targetLevel)
  return {
    conceptId: input.conceptId,
    subjectSlug: input.subjectSlug,
    language: input.teachingLanguage,
    gradeBand,
    experienceLevel,
    targetDifficulty: resolveTargetDifficulty(experienceLevel, gradeBand),
    userMessage: input.userMessage,
  }
}
