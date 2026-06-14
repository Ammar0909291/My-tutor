export interface SkillLevelEntry {
  key: string
  label: string
  description: string
}

export const SKILL_LEVELS: SkillLevelEntry[] = [
  { key: 'beginner', label: 'Beginner', description: 'Just starting out' },
  { key: 'intermediate', label: 'Intermediate', description: 'Some experience' },
  { key: 'advanced', label: 'Advanced', description: 'Confident knowledge' },
]

export type SkillLevel = string

export const CURRICULUM_LEVELS = ['beginner', 'intermediate', 'advanced'] as const
export type CurriculumLevel = typeof CURRICULUM_LEVELS[number]

export function getLevelLabel(level: string): string {
  return level.charAt(0).toUpperCase() + level.slice(1)
}

export const MASTERY_THRESHOLD_FOR_PROGRESSION = 0.8
