/**
 * Lesson Progress — the learner-facing view of the teaching ladder.
 *
 * P1: show progress through
 *   Introduction → Explanation → Examples → Guided Practice → Mastery Check → Summary
 *
 * Reuse-first: the runtime ALREADY owns a six-state lesson ladder —
 * `ConversationState.phase` (conversationState.ts `PHASE_ORDER`:
 * OBSERVE → DEMONSTRATE → GUIDE → CHECK → PRACTICE → TRANSFER), advanced
 * deterministically by advanceConversationState() and already serialized to
 * the client every turn as `mastery.phase` (masteryGate.buildMasterySummary).
 * So no new state, no new persistence, and no new advancement rule is
 * introduced here — progress advances automatically because the phase it
 * renders already does. This module is a pure presentation mapping.
 *
 * The phase order is duplicated as PROGRESS_PHASE_ORDER rather than imported
 * from conversationState.ts on purpose: that module pulls in the question
 * legality + capability engines, which have no business in the client bundle.
 * lessonProgress.test.ts asserts the two lists are identical, so the copy can
 * never silently drift from the real ladder.
 */

export type ProgressPhase =
  | 'OBSERVE' | 'DEMONSTRATE' | 'GUIDE' | 'CHECK' | 'PRACTICE' | 'TRANSFER'

export const PROGRESS_PHASE_ORDER: ProgressPhase[] = [
  'OBSERVE', 'DEMONSTRATE', 'GUIDE', 'CHECK', 'PRACTICE', 'TRANSFER',
]

export interface LessonStage {
  phase: ProgressPhase
  /** Learner-facing label — deliberately plain language, never the engine's
   *  internal phase name. */
  label: string
  /** Compact label for narrow viewports. */
  short: string
}

/**
 * Ordinal mapping onto the six requested stage names. The engine's ladder and
 * the learner-facing arc are the same length and the same order, so this is a
 * positional relabel, not a reinterpretation:
 *   OBSERVE      the learner meets the idea .............. Introduction
 *   DEMONSTRATE  the teacher shows/explains it ........... Explanation
 *   GUIDE        worked examples with support ............ Examples
 *   CHECK        first supported attempt (mastery gate 1)  Guided Practice
 *   PRACTICE     independent attempt (mastery gate 2) .... Mastery Check
 *   TRANSFER     consolidation / applying it elsewhere ... Summary
 */
export const LESSON_STAGES: LessonStage[] = [
  { phase: 'OBSERVE', label: 'Introduction', short: 'Intro' },
  { phase: 'DEMONSTRATE', label: 'Explanation', short: 'Explain' },
  { phase: 'GUIDE', label: 'Examples', short: 'Examples' },
  { phase: 'CHECK', label: 'Guided Practice', short: 'Guided' },
  { phase: 'PRACTICE', label: 'Mastery Check', short: 'Mastery' },
  { phase: 'TRANSFER', label: 'Summary', short: 'Summary' },
]

export function isProgressPhase(value: unknown): value is ProgressPhase {
  return typeof value === 'string' && (PROGRESS_PHASE_ORDER as string[]).includes(value)
}

/** 0-based index of a phase in the arc; -1 when unrecognised. */
export function stageIndexForPhase(phase: unknown): number {
  if (!isProgressPhase(phase)) return -1
  return PROGRESS_PHASE_ORDER.indexOf(phase)
}

export interface LessonProgress {
  stageIndex: number
  stage: LessonStage
  totalStages: number
  /** 0-100, monotonic with stageIndex. Mastery-verified pins to 100. */
  percent: number
  complete: boolean
}

/**
 * Build the render model. Returns null when there is no trustworthy phase yet
 * (before the first turn, or an unrecognised value) — the caller renders
 * nothing rather than a misleading "0% / Introduction" bar for a lesson that
 * has not started.
 *
 * `masteryVerified` comes from the same server-authoritative payload
 * (`mastery.verified`). It is the ONLY way to reach 100%: reaching the last
 * stage means the summary is being delivered, not that mastery was proven.
 * That keeps the bar honest about the anti-hollow-advancement rule rather
 * than implying completion the engine has not granted.
 */
export function buildLessonProgress(
  phase: unknown,
  masteryVerified = false,
): LessonProgress | null {
  const stageIndex = stageIndexForPhase(phase)
  if (stageIndex < 0) return null
  const total = LESSON_STAGES.length
  const percent = masteryVerified
    ? 100
    : Math.round(((stageIndex + 1) / total) * 100)
  return {
    stageIndex,
    stage: LESSON_STAGES[stageIndex],
    totalStages: total,
    percent,
    complete: masteryVerified,
  }
}
