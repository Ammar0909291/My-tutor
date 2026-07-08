/**
 * @deprecated MASTERY_LEVELS/MasteryLevel/getMasteryLabel/getMasteryPercent/
 * SKILL_LEVELS/SkillLevel below are unused dead code (confirmed 2026-07-08 —
 * zero importers anywhere in src/) and are NOT the curriculum-level system.
 * The canonical learner-level system for curriculum entry/progression is
 * CurriculumLevel in src/lib/curriculum/levels.ts — use that instead. This
 * file is kept only because MASTERY_THRESHOLD_FOR_PROGRESSION below (a
 * distinct, unrelated concept — a mastery-decay threshold, not a curriculum
 * level) is still imported by src/lib/analytics/coachInsights.ts.
 */
export const MASTERY_LEVELS = ['novice', 'beginner', 'intermediate', 'advanced', 'expert'] as const
/** @deprecated see file header */
export type MasteryLevel = typeof MASTERY_LEVELS[number]

/** @deprecated see file header */
export function getMasteryLabel(level: MasteryLevel): string {
  return level.charAt(0).toUpperCase() + level.slice(1)
}

/** @deprecated see file header */
export function getMasteryPercent(level: MasteryLevel): number {
  const idx = MASTERY_LEVELS.indexOf(level)
  return Math.round(((idx + 1) / MASTERY_LEVELS.length) * 100)
}

/** @deprecated see file header */
export const SKILL_LEVELS = MASTERY_LEVELS
/** @deprecated see file header */
export type SkillLevel = MasteryLevel

// NOT deprecated — a distinct, still-used concept (mastery-decay threshold
// for coach insights), unrelated to curriculum-entry level selection.
export const MASTERY_THRESHOLD_FOR_PROGRESSION = 0.8
