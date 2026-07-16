/**
 * The canonical learner-level system for curriculum entry/progression is
 * CurriculumLevel in src/lib/curriculum/levels.ts — use that instead.
 *
 * This file's earlier MASTERY_LEVELS/MasteryLevel/getMasteryLabel/
 * getMasteryPercent/SKILL_LEVELS/SkillLevel exports (confirmed 2026-07-08,
 * re-confirmed via a fresh repo-wide search: zero importers anywhere) were
 * removed 2026-07-16 as dead code. Only MASTERY_THRESHOLD_FOR_PROGRESSION
 * remains — a distinct, unrelated concept (a mastery-decay threshold, not a
 * curriculum level) still imported by src/lib/analytics/coachInsights.ts.
 */

// A mastery-decay threshold for coach insights — unrelated to curriculum-
// entry level selection.
export const MASTERY_THRESHOLD_FOR_PROGRESSION = 0.8
