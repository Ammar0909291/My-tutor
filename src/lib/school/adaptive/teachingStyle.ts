/**
 * Teaching Style Detection (Sprint BX).
 * Deterministic inference from existing practice/assessment/checkpoint/mistake data.
 * No new tables. No AI calls. No onboarding questions.
 *
 * Four styles:
 *   STEP_BY_STEP  — student struggles; needs granular breakdown + frequent checks
 *   VISUAL_FIRST  — student engages with visual/diagram-heavy content; spatial learner
 *   EXAMPLE_FIRST — student scores higher after seeing worked examples first
 *   THEORY_FIRST  — student grasps concepts quickly; prefers concise explanations
 */

import { prisma } from '@/lib/db/prisma'
import { getCheckpointPassRate } from '@/lib/school/checkpoints/checkpointStats'
import type { DifficultyMode } from './learningProfile'

export type TeachingStyle =
  | 'STEP_BY_STEP'
  | 'VISUAL_FIRST'
  | 'EXAMPLE_FIRST'
  | 'THEORY_FIRST'

export interface TeachingStyleResult {
  style: TeachingStyle
  /** 'low' → don't show chip; 'medium'/'high' → show chip on chapter workspace */
  confidence: 'low' | 'medium' | 'high'
  /** Human-readable label for the UI chip */
  label: string
}

const STYLE_LABELS: Record<TeachingStyle, string> = {
  STEP_BY_STEP:  'Step-by-Step',
  VISUAL_FIRST:  'Visual Learner',
  EXAMPLE_FIRST: 'Example-First',
  THEORY_FIRST:  'Concept-First',
}

const LOOKBACK_DAYS = 60

/**
 * Derive teaching style from usage signals.
 * Priority order (highest → lowest):
 *   1. Stored last-successful style from session snapshot (highest trust)
 *   2. Difficulty mode already computed (guided → STEP_BY_STEP; advanced → THEORY_FIRST)
 *   3. Practice accuracy signal (>85% → THEORY_FIRST; subject signal for visual)
 *   4. Checkpoint + mistake signal (high mistakes + low checkpoint → STEP_BY_STEP)
 *   5. Subject-type heuristic (mathematics → EXAMPLE_FIRST default)
 */
export async function detectTeachingStyle(
  userId: string,
  subjectSlug: string,
  preferredDifficulty: DifficultyMode,
  lastSuccessfulStyle?: string | null,
): Promise<TeachingStyleResult> {
  // 1. Trust stored successful style if present and still valid
  if (lastSuccessfulStyle && STYLE_LABELS[lastSuccessfulStyle as TeachingStyle]) {
    const style = lastSuccessfulStyle as TeachingStyle
    return { style, confidence: 'high', label: STYLE_LABELS[style] }
  }

  const since = new Date(Date.now() - LOOKBACK_DAYS * 86400000)

  const [practiceSessions, mistakeRows, checkpointStats] = await Promise.all([
    prisma.practiceSession.findMany({
      where: { userId, subjectSlug, completedAt: { not: null }, createdAt: { gte: since } },
      select: { score: true, kind: true },
    }).catch(() => [] as { score: number | null; kind: string }[]),
    prisma.mistakeRecord.findMany({
      where: { userId, createdAt: { gte: since } },
      select: { topicSlug: true },
    }).catch(() => [] as { topicSlug: string }[]),
    getCheckpointPassRate(userId),
  ])

  const practiceScores = practiceSessions
    .filter((s) => s.kind === 'practice' && typeof s.score === 'number')
    .map((s) => s.score as number)

  const avgPracticeScore = practiceScores.length > 0
    ? practiceScores.reduce((a, b) => a + b, 0) / practiceScores.length
    : null

  const highMistakes = mistakeRows.length > 10
  const lowCheckpoints = checkpointStats.passRate !== null && checkpointStats.passRate < 50
  const highCheckpoints = checkpointStats.passRate !== null && checkpointStats.passRate >= 80
  const highPracticeAccuracy = avgPracticeScore !== null && avgPracticeScore >= 85
  const lowPracticeAccuracy = avgPracticeScore !== null && avgPracticeScore < 60

  // 2. Difficulty-mode override when strongly guided/advanced
  if (preferredDifficulty === 'guided' || (highMistakes && lowCheckpoints)) {
    const confidence = (highMistakes && lowCheckpoints) ? 'high' : 'medium'
    return { style: 'STEP_BY_STEP', confidence, label: STYLE_LABELS.STEP_BY_STEP }
  }

  if (preferredDifficulty === 'advanced' && highCheckpoints && highPracticeAccuracy) {
    return { style: 'THEORY_FIRST', confidence: 'high', label: STYLE_LABELS.THEORY_FIRST }
  }

  // 3. Practice accuracy without strong checkpoint signal
  if (highPracticeAccuracy && practiceScores.length >= 3) {
    // High accuracy with sufficient data — student picks up quickly; theory-first
    return { style: 'THEORY_FIRST', confidence: 'medium', label: STYLE_LABELS.THEORY_FIRST }
  }

  if (lowPracticeAccuracy && practiceScores.length >= 3) {
    // Low practice accuracy — needs more worked examples
    return { style: 'EXAMPLE_FIRST', confidence: 'medium', label: STYLE_LABELS.EXAMPLE_FIRST }
  }

  // 4. Subject heuristic — VISUAL_FIRST for science (diagrams heavy),
  //    EXAMPLE_FIRST for mathematics (procedures), default STEP_BY_STEP for English/SST
  if (subjectSlug === 'science') {
    return { style: 'VISUAL_FIRST', confidence: 'low', label: STYLE_LABELS.VISUAL_FIRST }
  }
  if (subjectSlug === 'mathematics') {
    return { style: 'EXAMPLE_FIRST', confidence: 'low', label: STYLE_LABELS.EXAMPLE_FIRST }
  }

  // 5. Fallback: not enough data
  return { style: 'STEP_BY_STEP', confidence: 'low', label: STYLE_LABELS.STEP_BY_STEP }
}

/** System prompt block for the detected teaching style. */
export function buildTeachingStyleBlock(result: TeachingStyleResult): string {
  const instructions: Record<TeachingStyle, string> = {
    STEP_BY_STEP: `PREFERRED TEACHING STYLE — STEP BY STEP:
This student learns best when concepts are broken into small, numbered steps.
- Present ONE idea per paragraph. Never combine two concepts in a single sentence.
- After each logical step, confirm: "Does that part make sense?" before moving on.
- Use numbered lists for any multi-step process (calculations, procedures, reasoning chains).
- Avoid long explanatory paragraphs; prefer 2–3 short sentences per step.
- Celebrate small wins to maintain confidence.`,

    VISUAL_FIRST: `PREFERRED TEACHING STYLE — VISUAL FIRST:
This student responds well to visual and spatial explanations.
- Lead with a diagram, chart description, or visual analogy before the formal definition.
- When a visual aid is available (VISUAL tag), prioritise including it.
- Describe spatial relationships explicitly: "imagine this as a circle divided into parts…"
- Use relatable real-world objects as stand-ins for abstract concepts.
- Only after the visual/analogy is clear, introduce formal vocabulary.`,

    EXAMPLE_FIRST: `PREFERRED TEACHING STYLE — EXAMPLE FIRST:
This student learns by seeing a worked example before the general rule.
- Always start with a concrete, worked example — THEN explain the underlying concept.
- Show the full solution process step by step (do not skip steps).
- After the example, generalise: "So the rule is…"
- Offer a second, slightly varied example so the student can spot the pattern.
- Introduce formal definitions only after the student has seen the pattern in action.`,

    THEORY_FIRST: `PREFERRED TEACHING STYLE — CONCEPT FIRST:
This student grasps abstract ideas quickly and prefers concise explanations.
- State the concept or theorem clearly and precisely at the start.
- Follow with a brief derivation or reasoning chain (1–3 steps max).
- One focused example is sufficient — do not over-explain.
- Avoid excessive repetition; trust the student to connect ideas independently.
- Challenge them with follow-up: "Can you see why this must be true for all cases?"`,
  }

  return `\n\nPREFERRED TEACHING STYLE — ${result.style} (confidence: ${result.confidence}):\n${instructions[result.style]}`
}
