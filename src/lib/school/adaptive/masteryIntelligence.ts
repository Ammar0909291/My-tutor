/**
 * Mastery Intelligence Engine (Sprint CR).
 *
 * Distinguishes TRUE mastery from surface-level performance by cross-referencing
 * multiple independent signals. Reuses all existing tables — no new schema.
 *
 * Classification:
 *   TRUE_MASTERY   — passed assessment + healthy in-session signals + stable retention
 *   DEVELOPING     — learning in progress, improving, not enough evidence yet
 *   FALSE_MASTERY  — passed assessment but contradicting evidence (poor checkpoints,
 *                    recurring mistakes, fading retention)
 *   AT_RISK        — failing assessments, poor checkpoints, high mistake severity
 *
 * All DB calls are non-fatal. Missing data moves the classification toward DEVELOPING.
 */

import { prisma } from '@/lib/db/prisma'
import { ASSESSMENT_PASS_THRESHOLD } from '@/lib/school/assessment/assessmentTypes'

// ── Public types ──────────────────────────────────────────────────────────────

export type MasteryLevel = 'TRUE_MASTERY' | 'DEVELOPING' | 'FALSE_MASTERY' | 'AT_RISK'
export type MasteryConfidence = 'high' | 'medium' | 'low'
export type MasteryRisk = 'none' | 'low' | 'medium' | 'high'

export interface MasteryProfile {
  masteryLevel: MasteryLevel
  confidence: MasteryConfidence
  riskLevel: MasteryRisk
  /** One-sentence human explanation of the classification. */
  explanation: string
  /** Bullet-point evidence items that drove the classification. */
  evidence: string[]
  /** Composite retention score 0–100 (higher = better retained). */
  retentionScore: number
  /** Compact chapter insight for UI display. */
  insight: string
}

// ── Internal signal types ─────────────────────────────────────────────────────

interface AssessmentSignal {
  attempted: boolean
  passed: boolean
  latestScore: number | null
  attemptCount: number
  /** True if multiple attempts show improving trend. */
  improving: boolean
}

interface CheckpointSignal {
  passRate: number | null    // null = no checkpoints yet
  total: number
}

interface MistakeSignal {
  severity: number           // Σ (weight × recency) across chapter nodes
  recentCount: number        // mistakes in last 14 days
}

interface RevisionSignal {
  /** Average revision stage across mastered nodes (0 = never revised, 5 = fully retained). */
  avgStage: number
  /** True if any node is overdue for spaced revision. */
  anyDue: boolean
  masteredNodeCount: number
}

// ── Constants ─────────────────────────────────────────────────────────────────

const MISTAKE_LOOKBACK_DAYS = 30
const CHECKPOINT_LOOKBACK_DAYS = 14
const MISTAKE_WEIGHTS: Record<string, number> = {
  chapter_assessment: 3,
  chapter_practice: 2,
}
const DEFAULT_MISTAKE_WEIGHT = 1

// ── Signal collectors ─────────────────────────────────────────────────────────

async function collectAssessmentSignal(
  userId: string,
  subjectSlug: string,
  chapterId: string,
): Promise<AssessmentSignal> {
  const rows = await prisma.practiceSession.findMany({
    where: {
      userId,
      subjectSlug,
      chapterId,
      kind: 'assessment',
      completedAt: { not: null },
    },
    orderBy: { completedAt: 'desc' },
    take: 10,
    select: { score: true },
  }).catch(() => [] as { score: number | null }[])

  if (rows.length === 0) return { attempted: false, passed: false, latestScore: null, attemptCount: 0, improving: false }

  const scores = rows.map((r) => r.score ?? 0)
  const latestScore = scores[0]
  const passed = latestScore >= ASSESSMENT_PASS_THRESHOLD

  // Improving: last attempt higher than second-to-last
  const improving = scores.length >= 2 && scores[0] > scores[1]

  return { attempted: true, passed, latestScore, attemptCount: rows.length, improving }
}

async function collectCheckpointSignal(
  userId: string,
  subjectSlug: string,
  chapterId: string,
): Promise<CheckpointSignal> {
  const since = new Date(Date.now() - CHECKPOINT_LOOKBACK_DAYS * 86400000)
  const rows = await prisma.learningCheckpoint.findMany({
    where: { userId, subjectSlug, chapterId, createdAt: { gte: since } },
    select: { passed: true },
  }).catch(() => [] as { passed: boolean }[])

  if (rows.length === 0) return { passRate: null, total: 0 }
  const passed = rows.filter((r) => r.passed).length
  return { passRate: Math.round((passed / rows.length) * 100), total: rows.length }
}

async function collectMistakeSignal(
  userId: string,
  subjectSlug: string,
  kgNodeIds: string[],
): Promise<MistakeSignal> {
  if (kgNodeIds.length === 0) return { severity: 0, recentCount: 0 }

  const since = new Date(Date.now() - MISTAKE_LOOKBACK_DAYS * 86400000)
  const recentCutoff = new Date(Date.now() - 14 * 86400000)

  const rows = await prisma.mistakeRecord.findMany({
    where: {
      userId,
      subjectSlug,
      topicSlug: { in: kgNodeIds },
      createdAt: { gte: since },
    },
    select: { category: true, createdAt: true },
  }).catch(() => [] as { category: string; createdAt: Date }[])

  let severity = 0
  let recentCount = 0
  for (const r of rows) {
    const weight = MISTAKE_WEIGHTS[r.category] ?? DEFAULT_MISTAKE_WEIGHT
    const ageMs = Date.now() - new Date(r.createdAt).getTime()
    const ageDays = ageMs / 86400000
    const recency = ageDays <= 7 ? 2.0 : ageDays <= 14 ? 1.5 : 1.0
    severity += weight * recency
    if (new Date(r.createdAt) >= recentCutoff) recentCount++
  }

  return { severity, recentCount }
}

async function collectRevisionSignal(
  userId: string,
  subjectSlug: string,
  kgNodeIds: string[],
): Promise<RevisionSignal> {
  if (kgNodeIds.length === 0) return { avgStage: 0, anyDue: false, masteredNodeCount: 0 }

  const rows = await prisma.topicProgress.findMany({
    where: {
      userId,
      subjectSlug,
      topicSlug: { in: kgNodeIds },
      status: { in: ['COMPLETED', 'MASTERED', 'REVISION'] },
    },
    select: { revisionCount: true, lastRevisionAt: true, completedAt: true },
  }).catch(() => [] as { revisionCount: number; lastRevisionAt: Date | null; completedAt: Date | null }[])

  if (rows.length === 0) return { avgStage: 0, anyDue: false, masteredNodeCount: 0 }

  const REVIEW_INTERVALS_DAYS = [1, 3, 7, 14, 30, 90]
  let anyDue = false
  let totalStage = 0

  for (const row of rows) {
    const stage = Math.min(row.revisionCount ?? 0, 5)
    totalStage += stage
    // Check if overdue: use lastRevisionAt or completedAt + stage interval
    const lastActivity = row.lastRevisionAt ?? row.completedAt
    if (lastActivity) {
      const intervalDays = REVIEW_INTERVALS_DAYS[stage] ?? 90
      const nextDue = new Date(lastActivity.getTime() + intervalDays * 86400000)
      if (nextDue <= new Date()) anyDue = true
    }
  }

  return {
    avgStage: totalStage / rows.length,
    anyDue,
    masteredNodeCount: rows.length,
  }
}

// ── Retention score ───────────────────────────────────────────────────────────

function computeRetentionScore(
  assessment: AssessmentSignal,
  checkpoint: CheckpointSignal,
  mistake: MistakeSignal,
  revision: RevisionSignal,
): number {
  let score = 50 // neutral baseline

  // Assessment contribution (+/-30 points)
  if (assessment.attempted) {
    if (assessment.passed) {
      score += assessment.latestScore !== null
        ? Math.round(((assessment.latestScore - ASSESSMENT_PASS_THRESHOLD) / (100 - ASSESSMENT_PASS_THRESHOLD)) * 20) + 10
        : 10
    } else {
      score -= assessment.latestScore !== null
        ? Math.round(((ASSESSMENT_PASS_THRESHOLD - assessment.latestScore) / ASSESSMENT_PASS_THRESHOLD) * 20) + 5
        : 15
      if (assessment.improving) score += 5  // partial credit for improvement trend
    }
  }

  // Checkpoint contribution (+/-20 points)
  if (checkpoint.passRate !== null && checkpoint.total >= 3) {
    if (checkpoint.passRate >= 80) score += 15
    else if (checkpoint.passRate >= 60) score += 5
    else if (checkpoint.passRate < 50) score -= 15
    else score -= 5
  }

  // Mistake contribution (+/-20 points)
  if (mistake.severity === 0) score += 10
  else if (mistake.severity <= 3) score -= 5
  else if (mistake.severity <= 6) score -= 12
  else score -= 20

  // Revision/retention contribution (+/-10 points)
  if (revision.masteredNodeCount > 0) {
    if (revision.avgStage >= 3) score += 8
    else if (revision.avgStage >= 1) score += 3
    if (revision.anyDue) score -= 8
  }

  return Math.max(0, Math.min(100, Math.round(score)))
}

// ── Classification ────────────────────────────────────────────────────────────

function classify(
  assessment: AssessmentSignal,
  checkpoint: CheckpointSignal,
  mistake: MistakeSignal,
  revision: RevisionSignal,
  retentionScore: number,
): { level: MasteryLevel; confidence: MasteryConfidence; riskLevel: MasteryRisk } {
  const hasCheckpointData = checkpoint.passRate !== null && checkpoint.total >= 3
  const checkpointPoor = hasCheckpointData && checkpoint.passRate! < 55
  const checkpointGood = !hasCheckpointData || checkpoint.passRate! >= 65
  const mistakeHigh = mistake.severity > 6
  const mistakeMedium = mistake.severity > 3

  // AT_RISK: clear failure signals
  if (assessment.attempted && !assessment.passed) {
    if (mistakeHigh || checkpointPoor || assessment.attemptCount >= 2) {
      return {
        level: 'AT_RISK',
        confidence: assessment.attemptCount >= 2 ? 'high' : 'medium',
        riskLevel: 'high',
      }
    }
    // Single failure — not enough evidence for AT_RISK, could still be DEVELOPING
    return { level: 'AT_RISK', confidence: 'medium', riskLevel: 'high' }
  }

  // No assessment taken yet — DEVELOPING or AT_RISK based on other signals
  if (!assessment.attempted) {
    if (checkpointPoor && mistakeHigh) {
      return { level: 'AT_RISK', confidence: 'low', riskLevel: 'medium' }
    }
    return { level: 'DEVELOPING', confidence: 'low', riskLevel: mistakeMedium ? 'medium' : 'low' }
  }

  // Assessment passed — now distinguish TRUE_MASTERY from FALSE_MASTERY
  const falseMasterySignals: string[] = []
  if (checkpointPoor) falseMasterySignals.push('poor_checkpoint')
  if (mistakeHigh) falseMasterySignals.push('high_mistakes')
  if (retentionScore < 45) falseMasterySignals.push('low_retention')
  if (revision.anyDue && revision.masteredNodeCount >= 2) falseMasterySignals.push('fading_revision')

  if (falseMasterySignals.length >= 2) {
    return {
      level: 'FALSE_MASTERY',
      confidence: falseMasterySignals.length >= 3 ? 'high' : 'medium',
      riskLevel: 'high',
    }
  }
  if (falseMasterySignals.length === 1) {
    return {
      level: 'FALSE_MASTERY',
      confidence: 'medium',
      riskLevel: 'medium',
    }
  }

  // TRUE_MASTERY: passed + no contradicting signals
  if (checkpointGood && !mistakeMedium && retentionScore >= 65) {
    return {
      level: 'TRUE_MASTERY',
      confidence: hasCheckpointData && revision.avgStage >= 2 ? 'high' : 'medium',
      riskLevel: 'none',
    }
  }

  // Default: passed but mixed signals → DEVELOPING
  return { level: 'DEVELOPING', confidence: 'medium', riskLevel: 'low' }
}

// ── Evidence builder ──────────────────────────────────────────────────────────

function buildEvidence(
  assessment: AssessmentSignal,
  checkpoint: CheckpointSignal,
  mistake: MistakeSignal,
  revision: RevisionSignal,
): string[] {
  const ev: string[] = []

  if (!assessment.attempted) {
    ev.push('Assessment not yet taken')
  } else {
    ev.push(`Assessment: ${assessment.latestScore ?? '?'}% (${assessment.passed ? 'passed' : 'failed'}, ${assessment.attemptCount} attempt${assessment.attemptCount === 1 ? '' : 's'})`)
    if (assessment.improving) ev.push('Score trend: improving')
  }

  if (checkpoint.passRate !== null && checkpoint.total >= 3) {
    ev.push(`In-session checkpoints: ${checkpoint.passRate}% pass rate (${checkpoint.total} checks)`)
  } else {
    ev.push('In-session checkpoints: insufficient data')
  }

  if (mistake.recentCount === 0) {
    ev.push('Recent mistakes: none in last 14 days')
  } else {
    ev.push(`Recent mistakes: ${mistake.recentCount} in last 14 days (severity ${Math.round(mistake.severity)})`)
  }

  if (revision.masteredNodeCount > 0) {
    ev.push(`Spaced revision: ${revision.masteredNodeCount} topic(s) tracked, avg stage ${revision.avgStage.toFixed(1)}/5${revision.anyDue ? ' — one or more overdue' : ''}`)
  } else {
    ev.push('Spaced revision: no nodes tracked yet')
  }

  return ev
}

// ── Explanation + insight strings ────────────────────────────────────────────

function buildExplanation(level: MasteryLevel, assessment: AssessmentSignal, mistake: MistakeSignal, checkpoint: CheckpointSignal): string {
  switch (level) {
    case 'TRUE_MASTERY':
      return 'Assessment passed with consistent in-session understanding and stable retention — genuine mastery confirmed.'
    case 'FALSE_MASTERY':
      if (checkpoint.passRate !== null && checkpoint.passRate < 55)
        return 'Assessment passed, but in-session understanding checks suggest the material has not been deeply internalized.'
      if (mistake.severity > 6)
        return 'Assessment passed, but recurring mistakes on the same topics indicate surface-level learning.'
      return 'Assessment passed, but multiple signals suggest knowledge may not be stable — review recommended.'
    case 'AT_RISK':
      if (!assessment.attempted)
        return 'No assessment attempted yet, and early signals indicate the student may be struggling.'
      return `Assessment not yet passed (${assessment.latestScore ?? '?'}%) — active support needed.`
    case 'DEVELOPING':
      if (!assessment.attempted)
        return 'Learning is in progress — assessment not yet taken. Building towards mastery.'
      return assessment.improving
        ? 'Showing improvement — continuing to build understanding.'
        : 'Partial progress — needs more practice and review before mastery.'
  }
}

const INSIGHT_STRINGS: Record<MasteryLevel, string> = {
  TRUE_MASTERY:  '✓ Strong Mastery',
  DEVELOPING:    '⟳ Understanding Developing',
  FALSE_MASTERY: '⚠ Appears Memorized — Review Recommended',
  AT_RISK:       '⚠ Needs Active Support',
}

// ── Public API ─────────────────────────────────────────────────────────────────

/**
 * Returns a mastery profile for a specific chapter, synthesized from
 * assessment history, in-session checkpoints, mistake records, and
 * spaced-revision signals. All queries are non-fatal.
 */
export async function getMasteryProfile(
  userId: string,
  board: string,
  grade: number,
  subjectSlug: string,
  chapterId: string,
  kgNodeIds: string[] = [],
): Promise<MasteryProfile> {
  const [assessment, checkpoint, mistake, revision] = await Promise.all([
    collectAssessmentSignal(userId, subjectSlug, chapterId),
    collectCheckpointSignal(userId, subjectSlug, chapterId),
    collectMistakeSignal(userId, subjectSlug, kgNodeIds),
    collectRevisionSignal(userId, subjectSlug, kgNodeIds),
  ])

  const retentionScore = computeRetentionScore(assessment, checkpoint, mistake, revision)
  const { level, confidence, riskLevel } = classify(assessment, checkpoint, mistake, revision, retentionScore)

  return {
    masteryLevel: level,
    confidence,
    riskLevel,
    explanation: buildExplanation(level, assessment, mistake, checkpoint),
    evidence: buildEvidence(assessment, checkpoint, mistake, revision),
    retentionScore,
    insight: INSIGHT_STRINGS[level],
  }
}

// ── Tutor system prompt integration ──────────────────────────────────────────

/**
 * Builds the MASTERY INTELLIGENCE system prompt block for the tutor.
 * Guides teaching strategy based on the true mastery classification.
 * Non-prescriptive — the tutor adapts naturally rather than following a script.
 */
export function buildMasteryIntelligenceBlock(profile: MasteryProfile): string {
  const lines: string[] = ['\n\nMASTERY INTELLIGENCE']
  lines.push(`Classification: ${profile.masteryLevel} (confidence: ${profile.confidence}, retention score: ${profile.retentionScore}/100)`)
  lines.push(`Summary: ${profile.explanation}`)

  switch (profile.masteryLevel) {
    case 'TRUE_MASTERY':
      lines.push('Teaching approach: The student has demonstrated genuine mastery. You may increase challenge, introduce extension problems, ask deeper "why" and "what if" reasoning questions, and skip over basic explanations they already know.')
      break
    case 'FALSE_MASTERY':
      lines.push('Teaching approach: The student appears to have passed the assessment but evidence suggests surface-level learning. Verify understanding by asking the student to explain concepts in their own words, apply knowledge to unfamiliar situations, or identify WHY an answer is correct. Avoid assuming mastery — probe gently before moving on.')
      break
    case 'AT_RISK':
      lines.push('Teaching approach: The student is struggling with this chapter. Reinforce fundamentals before introducing new material. Slow the pace. Revisit prerequisite ideas if needed. Use simple worked examples first. Check understanding at every step with low-stakes questions.')
      break
    case 'DEVELOPING':
      lines.push('Teaching approach: The student is in the process of building understanding. Maintain an encouraging pace, use progressive questioning (start simple, build up), and celebrate partial understanding while gently pushing toward deeper grasp.')
      break
  }

  lines.push('Do not reference this block directly to the student — use it only to calibrate your teaching approach.')
  return lines.join('\n')
}

// ── Daily plan prioritization helper ─────────────────────────────────────────

/**
 * Returns a numeric sort weight for daily plan chapter tie-breaking.
 * Lower weight = higher priority (chapters with learning risk get scheduled first).
 *
 * Used ONLY for tie-breaking among `continue_chapter` / `start_next_chapter` tasks
 * when multiple subjects are competing for the same plan slot.
 */
export function masteryPriorityWeight(level: MasteryLevel): number {
  switch (level) {
    case 'AT_RISK':      return 0
    case 'FALSE_MASTERY': return 1
    case 'DEVELOPING':   return 2
    case 'TRUE_MASTERY': return 3
  }
}
