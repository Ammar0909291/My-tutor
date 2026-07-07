/**
 * Unified Learning Navigator (Sprint CO).
 *
 * Presentation + enrichment layer ONLY — no new recommendation logic, no new
 * prioritization rules, no DB writes.
 *
 * Decision flow:
 *   1. Call the Sprint CG Learning Orchestrator (`getTopRecommendation`).
 *      It already implements the 8-tier priority order:
 *        1. failed_assessment      5. exam_readiness_risk
 *        2. prerequisite_gap       6. mock_test_weakness
 *        3. spaced_revision_due    7. continue_chapter
 *        4. weak_topic             8. start_next_chapter
 *      The orchestrator DECIDES which action wins; this module never
 *      re-implements or reorders that logic.
 *   2. If the orchestrator returns a recommendation, enrich it with display
 *      metadata (title, description, urgency, estimated minutes, expected
 *      outcome, source) from a static lookup table. `reason` and `href` are
 *      passed through unchanged from the orchestrator.
 *   3. If the orchestrator returns null (e.g. a brand-new student with no
 *      progress signals yet), fall back to the first task of the Sprint
 *      BQ/CA Daily Plan (`getDailyStudyPlan`) and enrich it the same way.
 *   4. If both are empty, return null — callers hide the navigator card.
 *
 * Consumed by: dashboard, subject page, chapter page, focus mode, and the
 * tutor system prompt (`buildNavigatorSystemPromptBlock`).
 */

import {
  getTopRecommendation,
  type LearningRecommendation,
  type RecommendationType,
} from '@/lib/school/adaptive/learningOrchestrator'
import { getDailyStudyPlan, type DailyTask } from '@/lib/school/adaptive/dailyPlan'

// Re-export client-safe types from the types file so existing server-side
// callers (`import { LearningNavigatorAction } from './learningNavigator'`)
// keep working without modification.
export type {
  NavigatorUrgency,
  NavigatorSource,
  LearningNavigatorAction,
} from './navigatorTypes'
export { NAVIGATOR_URGENCY_COLORS } from './navigatorTypes'

import type {
  NavigatorUrgency,
  NavigatorSource,
  LearningNavigatorAction,
} from './navigatorTypes'

// ── Orchestrator recommendation enrichment ──────────────────────────────────

interface ActionEnrichment {
  title: string
  description: string
  estimatedMinutes: number
  expectedOutcome: string
  urgency: NavigatorUrgency
  source: NavigatorSource
}

// Deterministic enrichment table — one entry per orchestrator RecommendationType.
// Estimated minutes per the Sprint CO spec (exam_readiness_risk was not given an
// explicit value upstream; 10 min matches the other "medium" review-style actions).
const RECOMMENDATION_ENRICHMENT: Record<RecommendationType, ActionEnrichment> = {
  failed_assessment: {
    title: 'Retake Assessment',
    description: 'Retake the chapter assessment to demonstrate mastery and complete this chapter.',
    estimatedMinutes: 10,
    expectedOutcome: 'Pass the chapter assessment',
    urgency: 'high',
    source: 'assessment',
  },
  prerequisite_gap: {
    title: 'Review Foundation',
    description: 'Review the foundational chapter this topic depends on before continuing.',
    estimatedMinutes: 5,
    expectedOutcome: 'Close a prerequisite gap',
    urgency: 'high',
    source: 'prerequisite',
  },
  spaced_revision_due: {
    title: 'Quick Revision',
    description: 'Quickly revisit a concept that is due for memory reinforcement.',
    estimatedMinutes: 8,
    expectedOutcome: 'Improve topic mastery',
    urgency: 'medium',
    source: 'revision',
  },
  weak_topic: {
    title: 'Practice Weak Topic',
    description: 'Practice targeted questions on a topic you have recently struggled with.',
    estimatedMinutes: 10,
    expectedOutcome: 'Improve topic mastery',
    urgency: 'medium',
    source: 'weak_topic',
  },
  exam_readiness_risk: {
    title: 'Improve Exam Readiness',
    description: 'Focus on this subject to raise your overall exam readiness.',
    estimatedMinutes: 10,
    expectedOutcome: 'Increase exam readiness',
    urgency: 'medium',
    source: 'exam_readiness',
  },
  mock_test_weakness: {
    title: 'Review Mock Weak Areas',
    description: 'Review the topic flagged as a weakness in your recent mock test.',
    estimatedMinutes: 15,
    expectedOutcome: 'Improve topic mastery',
    urgency: 'medium',
    source: 'mock_test',
  },
  continue_chapter: {
    title: 'Continue',
    description: 'Pick up where you left off in this chapter.',
    estimatedMinutes: 12,
    expectedOutcome: 'Unlock next chapter',
    urgency: 'low',
    source: 'chapter',
  },
  start_next_chapter: {
    title: 'Start Next Chapter',
    description: 'Begin this new chapter and start building momentum.',
    estimatedMinutes: 15,
    expectedOutcome: 'Unlock next chapter',
    urgency: 'low',
    source: 'chapter',
  },
}

function enrichRecommendation(rec: LearningRecommendation): LearningNavigatorAction {
  const e = RECOMMENDATION_ENRICHMENT[rec.type]
  return {
    type: rec.type,
    title: e.title,
    description: e.description,
    reason: rec.reason,
    urgency: e.urgency,
    estimatedMinutes: e.estimatedMinutes,
    expectedOutcome: e.expectedOutcome,
    href: rec.href,
    source: e.source,
    subjectSlug: rec.subjectSlug,
    chapterId: rec.chapterId,
  }
}

// ── Daily Plan fallback enrichment ───────────────────────────────────────────
// Used only when the orchestrator has no recommendation at all (e.g. a
// brand-new student with no progress/assessment/revision signals yet).

const DAILY_TASK_ENRICHMENT: Record<DailyTask['priority'], Omit<ActionEnrichment, 'source'>> = {
  retake_assessment: RECOMMENDATION_ENRICHMENT.failed_assessment,
  bridge_prerequisite: RECOMMENDATION_ENRICHMENT.prerequisite_gap,
  review_spaced: RECOMMENDATION_ENRICHMENT.spaced_revision_due,
  practice_weak: RECOMMENDATION_ENRICHMENT.weak_topic,
  continue_chapter: RECOMMENDATION_ENRICHMENT.continue_chapter,
  start_next_chapter: RECOMMENDATION_ENRICHMENT.start_next_chapter,
}

function enrichDailyTask(task: DailyTask): LearningNavigatorAction {
  const e = DAILY_TASK_ENRICHMENT[task.priority]
  return {
    type: task.priority,
    title: e.title,
    description: e.description,
    reason: task.reason,
    urgency: e.urgency,
    estimatedMinutes: task.estimatedMinutes,
    expectedOutcome: e.expectedOutcome,
    href: task.href,
    source: 'daily_plan',
    subjectSlug: task.subjectSlug,
    chapterId: task.chapterId,
  }
}

// ── Public API ────────────────────────────────────────────────────────────

/**
 * Returns the single "Recommended Next Action" for the student, enriched for
 * display. The Sprint CG orchestrator decides WHICH action wins; this
 * function only adds presentation metadata. Returns null when there is
 * nothing to recommend (hide the navigator card entirely).
 */
export async function getLearningNavigatorAction(
  userId: string,
  board: string,
  grade: number,
): Promise<LearningNavigatorAction | null> {
  const rec = await getTopRecommendation(userId, board, grade).catch(() => null)
  if (rec) return enrichRecommendation(rec)

  const tasks = await getDailyStudyPlan(userId, board, grade).catch(() => [] as DailyTask[])
  if (tasks.length > 0) return enrichDailyTask(tasks[0])

  return null
}

// ── Copy helpers (Sprint CO.1) ────────────────────────────────────────────────

/**
 * "Continue Learning" / "Start Next Chapter" read as if they point somewhere
 * else when the navigator's target IS the page the student is already on.
 * Returns a context-aware label for that case, or null if the action's own
 * title is unambiguous regardless of where it's shown.
 */
export function navigatorTitleForCurrentChapter(action: LearningNavigatorAction): string | null {
  if (action.type === 'continue_chapter') return 'Continue This Chapter'
  if (action.type === 'start_next_chapter') return 'Start This Chapter'
  return null
}

// ── Tutor system prompt integration ──────────────────────────────────────────

/**
 * Builds the "PRIMARY STUDENT GOAL" system prompt block for the tutor.
 * Additive only — the tutor is told to support the goal naturally and never
 * force it on the student.
 */
export function buildNavigatorSystemPromptBlock(action: LearningNavigatorAction): string {
  return `\n\nPRIMARY STUDENT GOAL

Current recommended action: ${action.title}
Reason: ${action.reason}
Expected outcome: ${action.expectedOutcome}
Tutor should support the goal naturally.

Never force it.`
}
