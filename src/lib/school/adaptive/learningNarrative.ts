/**
 * Longitudinal Learning Narrative Engine (Sprint CX).
 *
 * Every other adaptive engine answers "what is the student RIGHT NOW?".
 * This engine answers "how did the student BECOME that?" — it compares a
 * recent window against an earlier window to surface improvement, recovery,
 * plateau, and regression patterns the tutor can acknowledge.
 *
 * Classification (trend over time, not a single-session snapshot):
 *   RAPID_IMPROVEMENT — strong gains across assessments / checkpoints / mistakes
 *   STEADY_PROGRESS   — consistent moderate gains
 *   RECOVERY_PHASE    — was weak earlier, now improving again
 *   PLATEAU           — little measurable change
 *   REGRESSION_RISK   — performance declining, mistakes rising, momentum slowing
 *
 * Windows: "recent" = last 7 days, "earlier" = days 8–30. Deterministic.
 * Reuses existing tables only — no new schema, no AI.
 * Returns null when there is not enough longitudinal evidence to be meaningful.
 */

import { prisma } from '@/lib/db/prisma'
import { ASSESSMENT_PASS_THRESHOLD } from '@/lib/school/assessment/assessmentTypes'

// ── Public types ──────────────────────────────────────────────────────────────

export type LearningTrend =
  | 'RAPID_IMPROVEMENT'
  | 'STEADY_PROGRESS'
  | 'RECOVERY_PHASE'
  | 'PLATEAU'
  | 'REGRESSION_RISK'

export interface NarrativeSignals {
  /** recent assessment/practice avg score (0–100) or null when no recent data. */
  recentScore: number | null
  /** earlier assessment/practice avg score (0–100) or null when no earlier data. */
  earlierScore: number | null
  /** recent checkpoint pass rate (0–100) or null. */
  recentCheckpointRate: number | null
  /** earlier checkpoint pass rate (0–100) or null. */
  earlierCheckpointRate: number | null
  /** mistakes per day in the recent window. */
  recentMistakeRate: number
  /** mistakes per day in the earlier window. */
  earlierMistakeRate: number
  /** True when the earlier window shows genuinely weak performance. */
  earlierWasWeak: boolean
  /** Count of distinct evidence points available across both windows. */
  evidenceCount: number
}

export interface LearningNarrative {
  trend: LearningTrend
  /** 1–2 sentence student-facing story. */
  story: string
  /** Tutor-facing one-line summary. */
  summary: string
  /** Compact label for the chapter page card. */
  insight: string
}

// ── Window constants ──────────────────────────────────────────────────────────

const RECENT_DAYS = 7
const EARLIER_DAYS = 30   // earlier window = days RECENT_DAYS..EARLIER_DAYS
const MIN_EVIDENCE = 4    // minimum evidence points across both windows

// A meaningful delta threshold (percentage points) to avoid reacting to noise.
const STRONG_DELTA = 15
const MODERATE_DELTA = 6
const WEAK_PERFORMANCE = 50

// ── Internal helpers ──────────────────────────────────────────────────────────

function avg(nums: number[]): number | null {
  if (nums.length === 0) return null
  return Math.round(nums.reduce((a, b) => a + b, 0) / nums.length)
}

function inRecent(d: Date, now: number): boolean {
  return now - new Date(d).getTime() <= RECENT_DAYS * 86400000
}

function inEarlier(d: Date, now: number): boolean {
  const age = now - new Date(d).getTime()
  return age > RECENT_DAYS * 86400000 && age <= EARLIER_DAYS * 86400000
}

// ── Signal collection ─────────────────────────────────────────────────────────

async function collectSignals(
  userId: string,
  subjectSlug: string,
  chapterId: string,
  kgNodeIds: string[],
): Promise<NarrativeSignals> {
  const now = Date.now()
  const since30 = new Date(now - EARLIER_DAYS * 86400000)

  const [scoreRows, checkpointRows, mistakeRows] = await Promise.all([
    // Assessment + practice scores (chapter scoped), with timestamps for windowing.
    prisma.practiceSession.findMany({
      where: { userId, subjectSlug, chapterId, completedAt: { not: null, gte: since30 } },
      select: { score: true, completedAt: true },
      orderBy: { completedAt: 'asc' },
    }).catch(() => [] as { score: number | null; completedAt: Date | null }[]),

    prisma.learningCheckpoint.findMany({
      where: { userId, subjectSlug, chapterId, createdAt: { gte: since30 } },
      select: { passed: true, createdAt: true },
    }).catch(() => [] as { passed: boolean; createdAt: Date }[]),

    kgNodeIds.length > 0
      ? prisma.mistakeRecord.findMany({
          where: { userId, subjectSlug, topicSlug: { in: kgNodeIds }, createdAt: { gte: since30 } },
          select: { createdAt: true },
        }).catch(() => [] as { createdAt: Date }[])
      : Promise.resolve([] as { createdAt: Date }[]),
  ])

  // ── Scores split by window ──────────────────────────────────────────────────
  const recentScores: number[] = []
  const earlierScores: number[] = []
  for (const r of scoreRows) {
    if (r.score === null || r.completedAt === null) continue
    if (inRecent(r.completedAt, now)) recentScores.push(r.score)
    else if (inEarlier(r.completedAt, now)) earlierScores.push(r.score)
  }

  // ── Checkpoints split by window ─────────────────────────────────────────────
  let recentCpPass = 0, recentCpTotal = 0, earlierCpPass = 0, earlierCpTotal = 0
  for (const c of checkpointRows) {
    if (inRecent(c.createdAt, now)) { recentCpTotal++; if (c.passed) recentCpPass++ }
    else if (inEarlier(c.createdAt, now)) { earlierCpTotal++; if (c.passed) earlierCpPass++ }
  }
  const recentCheckpointRate = recentCpTotal > 0 ? Math.round((recentCpPass / recentCpTotal) * 100) : null
  const earlierCheckpointRate = earlierCpTotal > 0 ? Math.round((earlierCpPass / earlierCpTotal) * 100) : null

  // ── Mistakes split by window (per-day rate) ─────────────────────────────────
  let recentMistakes = 0, earlierMistakes = 0
  for (const m of mistakeRows) {
    if (inRecent(m.createdAt, now)) recentMistakes++
    else if (inEarlier(m.createdAt, now)) earlierMistakes++
  }
  const recentMistakeRate = recentMistakes / RECENT_DAYS
  const earlierMistakeRate = earlierMistakes / (EARLIER_DAYS - RECENT_DAYS)

  // ── Earlier weakness anchor ─────────────────────────────────────────────────
  const earlierScoreAvg = avg(earlierScores)
  const earlierWasWeak =
    (earlierScoreAvg !== null && earlierScoreAvg < WEAK_PERFORMANCE) ||
    (earlierCheckpointRate !== null && earlierCheckpointRate < WEAK_PERFORMANCE) ||
    (earlierScoreAvg !== null && earlierScoreAvg < ASSESSMENT_PASS_THRESHOLD)

  const evidenceCount =
    recentScores.length + earlierScores.length + recentCpTotal + earlierCpTotal

  return {
    recentScore: avg(recentScores),
    earlierScore: earlierScoreAvg,
    recentCheckpointRate,
    earlierCheckpointRate,
    recentMistakeRate,
    earlierMistakeRate,
    earlierWasWeak,
    evidenceCount,
  }
}

// ── Trend classification (pure, exported) ─────────────────────────────────────

/**
 * Deterministically classifies a longitudinal learning trend from windowed
 * signals. Prefers trends over snapshots — a delta is only meaningful when
 * both windows have data.
 */
export function classifyLearningTrend(signals: NarrativeSignals): LearningTrend {
  // Compose an improvement score from whatever deltas are available.
  const deltas: number[] = []

  if (signals.recentScore !== null && signals.earlierScore !== null) {
    deltas.push(signals.recentScore - signals.earlierScore)
  }
  if (signals.recentCheckpointRate !== null && signals.earlierCheckpointRate !== null) {
    deltas.push(signals.recentCheckpointRate - signals.earlierCheckpointRate)
  }
  // Mistake trend: fewer mistakes now is positive. Scale per-day rate into
  // a comparable points delta (1 mistake/day swing ≈ 12 points). Only fold it
  // in when the swing is itself meaningful — a near-flat mistake count must not
  // dilute genuine gains on assessments or checkpoints.
  const mistakeDelta = Math.max(-25, Math.min(25, (signals.earlierMistakeRate - signals.recentMistakeRate) * 12))
  if (Math.abs(mistakeDelta) >= MODERATE_DELTA) {
    deltas.push(mistakeDelta)
  }

  // No comparable deltas → cannot tell a story; treat as plateau.
  if (deltas.length === 0) return 'PLATEAU'

  const improvement = deltas.reduce((a, b) => a + b, 0) / deltas.length

  // REGRESSION_RISK — clear decline.
  if (improvement <= -MODERATE_DELTA) return 'REGRESSION_RISK'

  // RECOVERY_PHASE — was genuinely weak earlier, now trending up.
  if (signals.earlierWasWeak && improvement >= MODERATE_DELTA) return 'RECOVERY_PHASE'

  // RAPID_IMPROVEMENT — strong broad gains.
  if (improvement >= STRONG_DELTA) return 'RAPID_IMPROVEMENT'

  // STEADY_PROGRESS — consistent moderate gains.
  if (improvement >= MODERATE_DELTA) return 'STEADY_PROGRESS'

  // Otherwise little measurable change.
  return 'PLATEAU'
}

// ── Narrative text ────────────────────────────────────────────────────────────

const TREND_META: Record<LearningTrend, { story: string; summary: string; insight: string }> = {
  RAPID_IMPROVEMENT: {
    story:   'You have made significant progress recently and are mastering concepts faster than before.',
    summary: 'Student has improved rapidly across recent sessions — assessments and understanding are climbing.',
    insight: '📈 Strong Recent Growth',
  },
  STEADY_PROGRESS: {
    story:   'You have consistently improved over recent learning sessions. Keep up the steady work.',
    summary: 'Student is making consistent, healthy progress with stable momentum.',
    insight: '📈 Steady Progress',
  },
  RECOVERY_PHASE: {
    story:   'You struggled earlier but are now rebuilding understanding successfully. The recovery is real.',
    summary: 'Student was previously weak on this material but has shown clear improvement over recent sessions.',
    insight: '📈 Bouncing Back',
  },
  PLATEAU: {
    story:   'Your progress is stable right now. A little extra challenge may help accelerate growth.',
    summary: 'Student performance is stable with little measurable change — a nudge in challenge may help.',
    insight: '📈 Steady, Room to Grow',
  },
  REGRESSION_RISK: {
    story:   'Recent performance suggests some concepts may need reinforcement. A short review will help you get back on track.',
    summary: 'Student performance has been slipping recently — assessments down and/or mistakes up. Reinforcement advised.',
    insight: '⚠ Needs Reinforcement',
  },
}

// ── Public API ─────────────────────────────────────────────────────────────────

/**
 * Returns a longitudinal learning narrative for a chapter, or null when there
 * is insufficient evidence across the two time windows to tell a meaningful story.
 */
export async function getLearningNarrative(
  userId: string,
  _board: string,
  _grade: number,
  subjectSlug: string,
  chapterId: string,
  kgNodeIds: string[] = [],
): Promise<LearningNarrative | null> {
  const signals = await collectSignals(userId, subjectSlug, chapterId, kgNodeIds)

  // Need enough longitudinal evidence — and at least one comparable window pair.
  if (signals.evidenceCount < MIN_EVIDENCE) return null
  const hasScorePair = signals.recentScore !== null && signals.earlierScore !== null
  const hasCheckpointPair = signals.recentCheckpointRate !== null && signals.earlierCheckpointRate !== null
  const hasMistakeSignal = signals.recentMistakeRate > 0 || signals.earlierMistakeRate > 0
  if (!hasScorePair && !hasCheckpointPair && !hasMistakeSignal) return null

  const trend = classifyLearningTrend(signals)
  const meta = TREND_META[trend]

  return {
    trend,
    story: meta.story,
    summary: meta.summary,
    insight: meta.insight,
  }
}

// ── Tutor integration ─────────────────────────────────────────────────────────

/**
 * Builds the LEARNING NARRATIVE system prompt block for the tutor.
 * Returns empty string when the narrative is null (insufficient evidence).
 */
export function buildLearningNarrativeBlock(narrative: LearningNarrative | null): string {
  if (!narrative) return ''

  const lines: string[] = ['\n\nLEARNING NARRATIVE']
  lines.push(`Classification: ${narrative.trend}`)
  lines.push(`Summary: ${narrative.summary}`)

  switch (narrative.trend) {
    case 'RAPID_IMPROVEMENT':
      lines.push('Tutor should: acknowledge the strong progress, reinforce what is working, and keep the challenge level rising so momentum is not wasted.')
      break
    case 'STEADY_PROGRESS':
      lines.push('Tutor should: recognise the consistent effort, sustain the current pace, and reinforce successful strategies.')
      break
    case 'RECOVERY_PHASE':
      lines.push('Tutor should: acknowledge the improvement after an earlier struggle, reinforce the strategies that are working, and maintain momentum without dwelling on past difficulty.')
      break
    case 'PLATEAU':
      lines.push('Tutor should: introduce slightly more challenge or a fresh angle to reignite growth, while keeping the student confident.')
      break
    case 'REGRESSION_RISK':
      lines.push('Tutor should: gently reinforce recently slipping concepts, rebuild confidence with achievable wins, and avoid overwhelming the student.')
      break
  }

  lines.push('Reference growth, recovery, or struggle naturally when relevant — do not quote this block verbatim to the student.')
  return lines.join('\n')
}
