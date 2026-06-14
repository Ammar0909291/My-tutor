/**
 * Learning Momentum Engine (Sprint CV).
 *
 * Detects whether a student is building, maintaining, declining, or at risk
 * of disengaging, so the tutor and daily plan can adapt before drop-off
 * happens rather than after.
 *
 * Classification:
 *   STRONG_MOMENTUM      — consistent recent activity, healthy streak
 *   STABLE_MOMENTUM      — moderate activity, steady progress
 *   DECLINING_MOMENTUM   — activity dropping, streak weakening
 *   DISENGAGEMENT_RISK   — very little recent activity, streak collapsed
 *
 * Scoring:
 *   Five independent signals are scored and summed. Each signal is
 *   non-fatal — missing data contributes 0 rather than blocking detection.
 *
 *   1. Streak health       (StudyStreak)
 *   2. Activity recency    (StudyStreak.lastActiveDate)
 *   3. Practice frequency  (PracticeSession count — 7d vs 30d)
 *   4. In-session activity (LearningCheckpoint count — 7d)
 *   5. Topic progress      (TopicProgress updates — 7d vs 30d)
 *
 * Thresholds (score → classification):
 *   >= 40  STRONG_MOMENTUM
 *   >= 15  STABLE_MOMENTUM
 *   >= -10 DECLINING_MOMENTUM
 *   <  -10 DISENGAGEMENT_RISK
 */

import { prisma } from '@/lib/db/prisma'

// ── Public types ──────────────────────────────────────────────────────────────

export type MomentumLevel =
  | 'STRONG_MOMENTUM'
  | 'STABLE_MOMENTUM'
  | 'DECLINING_MOMENTUM'
  | 'DISENGAGEMENT_RISK'

export interface MomentumProfile {
  level: MomentumLevel
  score: number
  /** Short label for chapter page card. */
  insight: string
  /** One-line body for chapter page card. */
  insightDetail: string
  /** Tutor-facing explanation (used in LEARNING MOMENTUM block). */
  explanation: string
}

// ── Insight strings ───────────────────────────────────────────────────────────

const INSIGHTS: Record<MomentumLevel, { insight: string; detail: string }> = {
  STRONG_MOMENTUM:    { insight: '🔥 Strong Learning Momentum',  detail: 'You are consistently making progress.' },
  STABLE_MOMENTUM:    { insight: '📈 Stable Momentum',           detail: 'Your learning progress is steady.' },
  DECLINING_MOMENTUM: { insight: '⚠ Momentum Slowing',          detail: 'Recent learning activity has decreased.' },
  DISENGAGEMENT_RISK: { insight: '⚠ Engagement Risk',           detail: 'Try completing a small learning task today.' },
}

const EXPLANATIONS: Record<MomentumLevel, string> = {
  STRONG_MOMENTUM:    'Student is actively and consistently engaging with learning material.',
  STABLE_MOMENTUM:    'Student is maintaining steady participation — no major engagement concerns.',
  DECLINING_MOMENTUM: 'Student activity has been decreasing over the past two weeks. Early intervention is valuable.',
  DISENGAGEMENT_RISK: 'Student shows very low recent activity. At risk of dropping off entirely. Immediate encouragement needed.',
}

// ── Scoring constants ─────────────────────────────────────────────────────────

// Score thresholds for classification
const STRONG_THRESHOLD      =  40
const STABLE_THRESHOLD      =  15
const DECLINING_THRESHOLD   = -10
// below DECLINING_THRESHOLD → DISENGAGEMENT_RISK

// ── Internal helpers ──────────────────────────────────────────────────────────

function daysSince(date: Date | null | undefined): number | null {
  if (!date) return null
  return (Date.now() - new Date(date).getTime()) / 86400000
}

function countInWindow(timestamps: Date[], windowDays: number): number {
  const cutoff = Date.now() - windowDays * 86400000
  return timestamps.filter((d) => new Date(d).getTime() >= cutoff).length
}

// ── Signal scorers ────────────────────────────────────────────────────────────

function scoreStreak(currentStreak: number, longestStreak: number): number {
  let s = 0
  if (currentStreak >= 7) s += 25
  else if (currentStreak >= 3) s += 15
  else if (currentStreak >= 1) s += 5
  else s -= 10                                   // streak at zero

  // Streak decay: current vs best (>50% of best = healthy)
  if (longestStreak > 0 && currentStreak < longestStreak * 0.3) s -= 10

  return s
}

function scoreRecency(lastActiveDate: Date | null | undefined): number {
  const days = daysSince(lastActiveDate)
  if (days === null) return -5
  if (days <= 1)  return 15
  if (days <= 3)  return  8
  if (days <= 7)  return  0
  if (days <= 14) return -15
  return -30                                     // >14 days inactive
}

function scorePracticeFrequency(sessions7d: number, sessions30d: number): number {
  let s = 0
  // Absolute 7-day frequency
  if (sessions7d >= 5) s += 20
  else if (sessions7d >= 3) s += 10
  else if (sessions7d >= 1) s += 0
  else s -= 15

  // Trend: 7-day rate vs prior 23-day rate
  const rate7   = sessions7d / 7
  const rate23  = Math.max(0, sessions30d - sessions7d) / 23
  if (rate23 > 0) {
    if (rate7 >= rate23 * 1.2) s += 10          // accelerating
    else if (rate7 <= rate23 * 0.5) s -= 10     // decelerating
  }

  return s
}

function scoreCheckpoints(checkpoints7d: number): number {
  if (checkpoints7d >= 5) return 10
  if (checkpoints7d >= 2) return  5
  if (checkpoints7d === 0) return -5
  return 0
}

function scoreTopicProgress(updates7d: number, updates30d: number): number {
  let s = 0
  if (updates7d >= 3) s += 10
  else if (updates7d >= 1) s += 5

  if (updates7d === 0 && updates30d === 0) s -= 10
  else if (updates7d === 0 && updates30d > 0) s -= 5  // 30d activity but 7d dead
  return s
}

// ── Public API ─────────────────────────────────────────────────────────────────

/**
 * Returns a learning momentum profile for a student.
 * All DB queries are non-fatal — missing data contributes 0 to the score.
 */
export async function getLearningMomentum(userId: string): Promise<MomentumProfile> {
  const now = Date.now()
  const since7d  = new Date(now -  7 * 86400000)
  const since30d = new Date(now - 30 * 86400000)

  const [streak, practiceSessions, checkpoints, topicProgressUpdates] = await Promise.all([
    prisma.studyStreak.findUnique({
      where: { userId },
      select: { currentStreak: true, longestStreak: true, lastActiveDate: true },
    }).catch(() => null),

    prisma.practiceSession.findMany({
      where: { userId, completedAt: { not: null, gte: since30d } },
      select: { completedAt: true },
      orderBy: { completedAt: 'desc' },
    }).catch(() => [] as { completedAt: Date | null }[]),

    prisma.learningCheckpoint.findMany({
      where: { userId, createdAt: { gte: since7d } },
      select: { createdAt: true },
    }).catch(() => [] as { createdAt: Date }[]),

    prisma.topicProgress.findMany({
      where: { userId, updatedAt: { gte: since30d } },
      select: { updatedAt: true },
    }).catch(() => [] as { updatedAt: Date }[]),
  ])

  // ── Compute signal scores ─────────────────────────────────────────────────

  const streakScore = streak
    ? scoreStreak(streak.currentStreak, streak.longestStreak)
    : -5

  const recencyScore = scoreRecency(streak?.lastActiveDate)

  const practiceTimestamps = practiceSessions
    .map((s) => s.completedAt)
    .filter((d): d is Date => d !== null)
  const sessions7d  = countInWindow(practiceTimestamps, 7)
  const sessions30d = practiceSessions.length
  const practiceScore = scorePracticeFrequency(sessions7d, sessions30d)

  const checkpointScore = scoreCheckpoints(checkpoints.length)

  const topicTimestamps = topicProgressUpdates.map((r) => r.updatedAt)
  const topicUpdates7d  = countInWindow(topicTimestamps, 7)
  const topicUpdates30d = topicProgressUpdates.length
  const topicScore = scoreTopicProgress(topicUpdates7d, topicUpdates30d)

  const totalScore = streakScore + recencyScore + practiceScore + checkpointScore + topicScore

  // ── Classification ────────────────────────────────────────────────────────

  const level: MomentumLevel =
    totalScore >= STRONG_THRESHOLD    ? 'STRONG_MOMENTUM'    :
    totalScore >= STABLE_THRESHOLD    ? 'STABLE_MOMENTUM'    :
    totalScore >= DECLINING_THRESHOLD ? 'DECLINING_MOMENTUM' :
                                        'DISENGAGEMENT_RISK'

  return {
    level,
    score: totalScore,
    insight:       INSIGHTS[level].insight,
    insightDetail: INSIGHTS[level].detail,
    explanation:   EXPLANATIONS[level],
  }
}

// ── Tutor integration ─────────────────────────────────────────────────────────

/**
 * Builds the LEARNING MOMENTUM system prompt block for the tutor.
 */
export function buildMomentumBlock(profile: MomentumProfile): string {
  const lines: string[] = ['\n\nLEARNING MOMENTUM']
  lines.push(`Status: ${profile.level} (score: ${profile.score})`)
  lines.push(`Context: ${profile.explanation}`)

  switch (profile.level) {
    case 'STRONG_MOMENTUM':
      lines.push('Tutor approach: Student is progressing consistently. Maintain current challenge level. You may introduce slightly harder material or extension questions. Acknowledge progress briefly — do not over-praise.')
      break
    case 'STABLE_MOMENTUM':
      lines.push('Tutor approach: Student is maintaining participation. Continue current teaching pace. Create small positive moments to sustain momentum without overwhelming.')
      break
    case 'DECLINING_MOMENTUM':
      lines.push('Tutor approach: Student activity is decreasing. Create small wins — ask questions the student can answer confidently. Reduce cognitive load. Reinforce what the student already knows before introducing new material. Avoid dwelling on what has not been done.')
      break
    case 'DISENGAGEMENT_RISK':
      lines.push('Tutor approach: Student may be at risk of stopping entirely. Prioritise achievable, short tasks. Celebrate every correct answer. Ask low-stakes, engaging questions. Reconnect the student with progress they have already made. Avoid pressure or volume of content that feels overwhelming.')
      break
  }

  lines.push('Do not reference this momentum status directly to the student.')
  return lines.join('\n')
}

// ── Daily plan priority weight ────────────────────────────────────────────────

/**
 * Returns a priority weight for daily plan chapter sorting.
 * When DISENGAGEMENT_RISK, start_next_chapter tasks get deprioritized
 * relative to continuation tasks (prefer familiar ground over new starts).
 *
 * Lower weight = higher priority. A penalty of 1 pushes "new chapter start"
 * past all continuation tasks when engagement is at risk.
 */
export function getMomentumPriorityWeight(
  level: MomentumLevel,
  hasStudiedBefore: boolean,
): number {
  // Only DISENGAGEMENT_RISK and DECLINING_MOMENTUM influence chapter selection.
  // Prefer chapters the student has started over brand-new ones.
  if (!hasStudiedBefore) {
    if (level === 'DISENGAGEMENT_RISK')  return 2  // deprioritize new starts heavily
    if (level === 'DECLINING_MOMENTUM')  return 1  // mild deprioritization
  }
  return 0                                           // no momentum adjustment
}
