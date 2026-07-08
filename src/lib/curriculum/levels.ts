/**
 * CANONICAL learner-level system for curriculum entry/progression.
 *
 * Chosen as canonical (2026-07-08, G2 exception — see project memory) because
 * it is the ONE system, of six independent level enumerations found in the
 * repository, that is actually reachable end-to-end: it's what
 * OnboardingWizard.tsx renders as the level-picker, what gets posted as
 * `currentLevel`, and what's stored on `Profile.currentLevel`. The other
 * five (src/lib/mastery/levels.ts, src/lib/curriculum/subjectCatalog.ts's
 * 6-tier LEVELS, the Prisma `LevelBand` enum + Coach-Placement subsystem,
 * and the onboarding API's 5-value zod enum) are either dead code, cosmetic
 * display-only, or accept values the live UI can never actually produce —
 * see the @deprecated notes on each for specifics. `normalizeToCanonicalLevel`
 * below maps any legacy/wider value onto these 3 tiers so downstream code
 * only ever has to handle one system.
 */
export const CURRICULUM_LEVELS = ['beginner', 'intermediate', 'advanced'] as const
export type CurriculumLevel = typeof CURRICULUM_LEVELS[number]
export type SkillLevel = CurriculumLevel

export interface SkillLevelEntry {
  key: CurriculumLevel
  label: string
  description: string
}

export const SKILL_LEVELS: SkillLevelEntry[] = [
  { key: 'beginner', label: 'Beginner', description: 'Just starting out' },
  { key: 'intermediate', label: 'Intermediate', description: 'Some experience' },
  { key: 'advanced', label: 'Advanced', description: 'Confident knowledge' },
]

export function getLevelLabel(level: string): string {
  return level.charAt(0).toUpperCase() + level.slice(1)
}

/**
 * Maps any value from any of the historical level systems (or free-text
 * from an old profile row) onto the 3 canonical tiers. Never throws —
 * unrecognized input defaults to 'beginner', the safe/inclusive choice.
 */
export function normalizeToCanonicalLevel(raw: string | null | undefined): CurriculumLevel {
  const v = (raw ?? '').trim().toLowerCase()
  if ((CURRICULUM_LEVELS as readonly string[]).includes(v)) return v as CurriculumLevel
  if (v === 'complete_beginner' || v === 'novice') return 'beginner'
  if (v === 'professional' || v === 'expert') return 'advanced'
  return 'beginner'
}

export const MASTERY_THRESHOLD_FOR_PROGRESSION = 0.8
