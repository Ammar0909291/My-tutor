export const MASTERY_LEVELS = ['novice', 'beginner', 'intermediate', 'advanced', 'expert'] as const
export type MasteryLevel = typeof MASTERY_LEVELS[number]

export function getMasteryLabel(level: MasteryLevel): string {
  return level.charAt(0).toUpperCase() + level.slice(1)
}

export function getMasteryPercent(level: MasteryLevel): number {
  const idx = MASTERY_LEVELS.indexOf(level)
  return Math.round(((idx + 1) / MASTERY_LEVELS.length) * 100)
}

export const SKILL_LEVELS = MASTERY_LEVELS
export type SkillLevel = MasteryLevel
export const MASTERY_THRESHOLD_FOR_PROGRESSION = 0.8
