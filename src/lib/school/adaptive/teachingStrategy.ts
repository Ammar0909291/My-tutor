/**
 * Adaptive Teaching Strategy Orchestrator (Sprint CW).
 *
 * Synthesises the five adaptive intelligence signals (mastery, misconception,
 * concept transfer, confidence calibration, learning momentum) into ONE
 * unified teaching strategy that the tutor follows for this session.
 *
 * Strategy types (priority order — first match wins):
 *   1. FOUNDATION_REBUILD    — mastery AT_RISK: rebuild from first principles
 *   2. MISCONCEPTION_REPAIR  — HIGH-confidence misconception or FALSE_MASTERY + any misconception
 *   3. MOMENTUM_RECOVERY     — DISENGAGEMENT_RISK or DECLINING_MOMENTUM
 *   4. CONFIDENCE_CORRECTION — OVERCONFIDENT + (FALSE_MASTERY or weak performance)
 *   5. APPLICATION_FOCUS     — TRANSFER_WEAK + solid mastery base
 *   6. CONFIDENCE_BUILDING   — UNDERCONFIDENT (performing well but low self-belief)
 *   7. ACCELERATED_GROWTH    — TRUE_MASTERY + TRANSFER_STRONG + strong momentum
 *
 * Only ONE strategy is active at a time (single source of truth).
 */

import { prisma } from '@/lib/db/prisma'
import type { MasteryLevel } from './masteryIntelligence'
import type { CalibrationLevel } from './confidenceCalibration'
import type { MomentumLevel } from './learningMomentum'
import type { TransferLevel } from './conceptTransfer'

// ── Public types ──────────────────────────────────────────────────────────────

export type TeachingStrategyType =
  | 'FOUNDATION_REBUILD'
  | 'MISCONCEPTION_REPAIR'
  | 'MOMENTUM_RECOVERY'
  | 'CONFIDENCE_CORRECTION'
  | 'APPLICATION_FOCUS'
  | 'CONFIDENCE_BUILDING'
  | 'ACCELERATED_GROWTH'

export interface TeachingStrategy {
  type: TeachingStrategyType
  /** 1 = highest priority, 7 = lowest */
  priority: number
  /** Short explanation of why this strategy was selected. */
  reason: string
  /** Ordered tutor behaviour instructions for the active session. */
  tutorInstructions: string[]
  /** Compact label for the chapter page card. */
  insight: string
  /** One-line sub-text for the chapter page card. */
  insightDetail: string
  /** Same strategy fired 3+ times on this topic with no mastery progress (strategyEffectiveness.ts). */
  staleMate: boolean
}

// ── Strategy metadata ─────────────────────────────────────────────────────────

const STRATEGY_META: Record<
  TeachingStrategyType,
  { priority: number; insight: string; insightDetail: string }
> = {
  FOUNDATION_REBUILD:    { priority: 1, insight: '🏗️ Foundation Rebuild',     insightDetail: 'Core concepts need to be strengthened before moving forward.' },
  MISCONCEPTION_REPAIR:  { priority: 2, insight: '🔧 Misconception Repair',    insightDetail: 'A specific misunderstanding needs to be corrected first.' },
  MOMENTUM_RECOVERY:     { priority: 3, insight: '⚡ Momentum Recovery',       insightDetail: 'Rebuilding study rhythm with small, achievable steps.' },
  CONFIDENCE_CORRECTION: { priority: 4, insight: '⚠ Confidence Correction',   insightDetail: 'Slowing down to verify understanding before moving ahead.' },
  APPLICATION_FOCUS:     { priority: 5, insight: '🎯 Application Focus',       insightDetail: 'Practising real-world uses of what you already know.' },
  CONFIDENCE_BUILDING:   { priority: 6, insight: '💡 Confidence Building',     insightDetail: 'Reinforcing your strengths — you are doing better than you think.' },
  ACCELERATED_GROWTH:    { priority: 7, insight: '🚀 Accelerated Growth',      insightDetail: 'Strong foundations detected — ready for deeper challenges.' },
}

const STRATEGY_INSTRUCTIONS: Record<TeachingStrategyType, string[]> = {
  FOUNDATION_REBUILD: [
    'Start from first principles — do not assume any prior knowledge for this chapter.',
    'Use concrete, everyday examples before introducing formal definitions.',
    'Check understanding with simple closed questions before advancing to the next idea.',
    'Celebrate each correct foundational step explicitly.',
    'Avoid introducing extension material until the baseline is secure.',
  ],
  MISCONCEPTION_REPAIR: [
    'Address the identified misconception early — do not allow it to go unchallenged.',
    'Ask the student to explain their reasoning before correcting — surface the misunderstanding first.',
    'Contrast the wrong mental model with the correct one using a concrete side-by-side example.',
    'Confirm the correction is internalised with a follow-up question before moving on.',
    'Avoid implying carelessness — frame it as a common misunderstanding that has been caught.',
  ],
  MOMENTUM_RECOVERY: [
    'Open with something the student already knows to create an immediate win.',
    'Keep tasks short and completable within this session.',
    'Celebrate every correct answer and any progress, however small.',
    'Avoid introducing new heavy material — consolidate what exists first.',
    'End the session by naming something specific the student achieved today.',
  ],
  CONFIDENCE_CORRECTION: [
    'Probe understanding before accepting surface-level correct answers ("Can you explain why?").',
    'Use "what if" and "why" questions to reveal depth of understanding.',
    'Avoid validating confident but unverified claims — gently challenge assumptions.',
    'Do not signal alarm — keep the tone exploratory, not corrective.',
    'Only confirm mastery after the student demonstrates reasoning, not just recall.',
  ],
  APPLICATION_FOCUS: [
    'Prioritise problems set in real-world or unfamiliar contexts over textbook recall.',
    'Ask the student to transfer the concept to a scenario they have not seen before.',
    'Encourage the student to explain how the concept applies, not just what the answer is.',
    'Acknowledge that application is a higher skill — normalise the extra difficulty.',
    'Link new application examples to the core concept so the connection remains explicit.',
  ],
  CONFIDENCE_BUILDING: [
    'Explicitly acknowledge every correct answer ("That is exactly right — good reasoning").',
    'Remind the student of specific earlier successes when they express doubt.',
    'Reframe difficulty as normal and expected — not a sign of inability.',
    'Build momentum with a series of achievable questions before introducing harder ones.',
    'Avoid immediately correcting minor imprecision — let the student express the idea first.',
  ],
  ACCELERATED_GROWTH: [
    'The student has strong foundations — introduce extension questions and edge cases.',
    'Invite the student to derive or explain concepts rather than just apply them.',
    'Challenge with multi-step or cross-topic problems when appropriate.',
    'Brief acknowledgement of progress is still useful — do not over-praise.',
    'Maintain a brisk pace — avoid re-covering material the student has clearly mastered.',
  ],
}

// Single explicit action directive per strategy (survey: "what teaching
// actions exist beyond visuals" found worked examples/hints/analogies/
// Socratic checks already run as always-on hardcoded layers, independent
// of strategy — strategy only added tone via STRATEGY_INSTRUCTIONS above.
// This sequences which of those existing actions takes priority this turn.
const STRATEGY_ACTION_DIRECTIVE: Record<TeachingStrategyType, string> = {
  FOUNDATION_REBUILD:    'Lead with a worked example before theory.',
  MISCONCEPTION_REPAIR:  'Ask the student to explain their reasoning before you correct anything.',
  MOMENTUM_RECOVERY:     'Give only one small hint. Do not solve it.',
  CONFIDENCE_CORRECTION: 'Open with a real-world analogy first.',
  APPLICATION_FOCUS:     'End this response with the inline practice question provided separately, if one is present.',
  CONFIDENCE_BUILDING:   'Explain directly and clearly. No questions.',
  ACCELERATED_GROWTH:    'Challenge with a harder variant after explaining.',
}

// ── Pure strategy determination ───────────────────────────────────────────────

type TopMisconceptConfidence = 'HIGH' | 'MEDIUM' | 'LOW' | null

// Canonical priority order, used as the final rotation fallback below.
const ALL_STRATEGIES: TeachingStrategyType[] = [
  'FOUNDATION_REBUILD', 'MISCONCEPTION_REPAIR', 'MOMENTUM_RECOVERY',
  'CONFIDENCE_CORRECTION', 'APPLICATION_FOCUS', 'CONFIDENCE_BUILDING', 'ACCELERATED_GROWTH',
]

/**
 * Deterministic priority-based strategy selection.
 * All parameters are nullable — null means "no data".
 *
 * excludeStrategy (docs/STUDENT_MEMORY_AUDIT.md, gap #3): when the
 * strategy-effectiveness reader detects a stalemate — the same strategy
 * fired 3+ times on this topic with no mastery progress — pass the stale
 * dominant strategy here to force rotation to the next-best match instead
 * of repeating it. Optional and additive: omitting it reproduces the
 * original first-match-wins behavior exactly.
 */
export function determineStrategy(
  masteryLevel:            MasteryLevel | null,
  topMisconceptConfidence: TopMisconceptConfidence,
  transferLevel:           TransferLevel | null,
  calibration:             CalibrationLevel | null,
  momentumLevel:           MomentumLevel | null,
  excludeStrategy:         TeachingStrategyType | null = null,
): TeachingStrategyType {
  const candidates: TeachingStrategyType[] = []

  // 1. FOUNDATION_REBUILD — mastery AT_RISK
  if (masteryLevel === 'AT_RISK') candidates.push('FOUNDATION_REBUILD')

  // 2. MISCONCEPTION_REPAIR — HIGH misconception, or FALSE_MASTERY + any misconception
  if (topMisconceptConfidence === 'HIGH') candidates.push('MISCONCEPTION_REPAIR')
  if (masteryLevel === 'FALSE_MASTERY' && topMisconceptConfidence !== null) candidates.push('MISCONCEPTION_REPAIR')

  // 3. MOMENTUM_RECOVERY — disengagement or declining
  if (momentumLevel === 'DISENGAGEMENT_RISK' || momentumLevel === 'DECLINING_MOMENTUM') candidates.push('MOMENTUM_RECOVERY')

  // 4. CONFIDENCE_CORRECTION — overconfident + weak mastery (AT_RISK already excluded above)
  if (calibration === 'OVERCONFIDENT' && masteryLevel === 'FALSE_MASTERY') {
    candidates.push('CONFIDENCE_CORRECTION')
  }

  // 5. APPLICATION_FOCUS — transfer weak + some mastery base
  if (transferLevel === 'TRANSFER_WEAK' && (masteryLevel === 'TRUE_MASTERY' || masteryLevel === 'DEVELOPING')) {
    candidates.push('APPLICATION_FOCUS')
  }

  // 6. CONFIDENCE_BUILDING — underconfident
  if (calibration === 'UNDERCONFIDENT') candidates.push('CONFIDENCE_BUILDING')

  // 7. ACCELERATED_GROWTH — true mastery + strong transfer + strong momentum
  if (
    masteryLevel === 'TRUE_MASTERY' &&
    transferLevel === 'TRANSFER_STRONG' &&
    (momentumLevel === 'STRONG_MOMENTUM' || momentumLevel === 'STABLE_MOMENTUM')
  ) {
    candidates.push('ACCELERATED_GROWTH')
  }

  // Default: Application Focus when mastery is solid but transfer is unclear
  if (masteryLevel === 'TRUE_MASTERY' || masteryLevel === 'DEVELOPING') candidates.push('APPLICATION_FOCUS')

  candidates.push('ACCELERATED_GROWTH')

  if (!excludeStrategy) return candidates[0]

  const rotated = candidates.find((c) => c !== excludeStrategy)
  if (rotated) return rotated

  // Every matching rule produced the excluded (stale) strategy — force
  // rotation to the next strategy in canonical priority order rather than
  // repeating it a 4th time.
  return ALL_STRATEGIES.find((s) => s !== excludeStrategy) ?? excludeStrategy
}

function buildReason(
  type: TeachingStrategyType,
  masteryLevel: MasteryLevel | null,
  topMisconceptConfidence: TopMisconceptConfidence,
  transferLevel: TransferLevel | null,
  calibration: CalibrationLevel | null,
  momentumLevel: MomentumLevel | null,
): string {
  switch (type) {
    case 'FOUNDATION_REBUILD':    return `Mastery level is AT_RISK — foundational gaps detected.`
    case 'MISCONCEPTION_REPAIR':  return topMisconceptConfidence === 'HIGH'
      ? 'A high-confidence misconception was detected.'
      : `FALSE_MASTERY combined with a detected misconception.`
    case 'MOMENTUM_RECOVERY':     return `Engagement signal is ${momentumLevel} — rebuilding rhythm.`
    case 'CONFIDENCE_CORRECTION': return `Student is OVERCONFIDENT but mastery is ${masteryLevel}.`
    case 'APPLICATION_FOCUS':     return `Transfer is WEAK despite ${masteryLevel} mastery — needs application practice.`
    case 'CONFIDENCE_BUILDING':   return 'Student is UNDERCONFIDENT — performance outpaces self-belief.'
    case 'ACCELERATED_GROWTH':    return `TRUE_MASTERY + TRANSFER_STRONG + ${momentumLevel} — ready for deeper challenge.`
  }
}

// ── Public API ─────────────────────────────────────────────────────────────────

/**
 * Fetches all five intelligence signals and returns ONE unified teaching strategy.
 * Non-fatal — each engine failure contributes null to the determination.
 */
export async function getTeachingStrategy(
  userId: string,
  board: string,
  grade: string | number,
  subjectSlug: string,
  chapterId: string,
  kgNodeIds: string[],
): Promise<TeachingStrategy> {
  const [masteryProfile, misconceptions, transferProfile, confidenceProfile, momentumProfile, effectiveness] =
    await Promise.all([
      import('./masteryIntelligence').then(({ getMasteryProfile }) =>
        getMasteryProfile(userId, board, Number(grade), subjectSlug, chapterId, kgNodeIds)
      ).catch(() => null),

      import('./misconceptionEngine').then(({ getChapterMisconceptions }) =>
        getChapterMisconceptions(userId, board, Number(grade), subjectSlug, chapterId, kgNodeIds)
      ).catch(() => [] as { confidence: 'HIGH' | 'MEDIUM' | 'LOW' }[]),

      import('./conceptTransfer').then(({ evaluateConceptTransfer }) =>
        evaluateConceptTransfer(userId, subjectSlug, chapterId)
      ).catch(() => null),

      import('./confidenceCalibration').then(({ getConfidenceProfile }) =>
        getConfidenceProfile(userId, subjectSlug, chapterId)
      ).catch(() => null),

      import('./learningMomentum').then(({ getLearningMomentum }) =>
        getLearningMomentum(userId)
      ).catch(() => null),

      // docs/STUDENT_MEMORY_AUDIT.md gap #3: read back the strategy-event log
      // to detect a stalemate (same strategy repeating with no progress) and
      // feed it into determineStrategy below so it can force a rotation.
      import('./strategyEffectiveness').then(({ getStrategyEffectiveness }) =>
        getStrategyEffectiveness(userId, chapterId, prisma)
      ).catch(() => null),
    ])

  const topMisconceptConfidence = (() => {
    if (!misconceptions || misconceptions.length === 0) return null
    if (misconceptions.some((m) => m.confidence === 'HIGH'))   return 'HIGH'   as const
    if (misconceptions.some((m) => m.confidence === 'MEDIUM')) return 'MEDIUM' as const
    return 'LOW' as const
  })()

  const type = determineStrategy(
    masteryProfile?.masteryLevel ?? null,
    topMisconceptConfidence,
    transferProfile?.level ?? null,
    confidenceProfile?.calibration ?? null,
    momentumProfile?.level ?? null,
    effectiveness?.staleMate ? effectiveness.dominantStrategy : null,
  )

  const meta = STRATEGY_META[type]

  return {
    type,
    priority: meta.priority,
    reason: buildReason(
      type,
      masteryProfile?.masteryLevel ?? null,
      topMisconceptConfidence,
      transferProfile?.level ?? null,
      confidenceProfile?.calibration ?? null,
      momentumProfile?.level ?? null,
    ),
    tutorInstructions: STRATEGY_INSTRUCTIONS[type],
    insight:       meta.insight,
    insightDetail: meta.insightDetail,
    staleMate:     effectiveness?.staleMate ?? false,
  }
}

// ── Tutor integration ─────────────────────────────────────────────────────────

/**
 * Builds the ACTIVE TEACHING STRATEGY system prompt block for the tutor.
 * This replaces per-signal tutor guidance with a single unified directive.
 */
export function buildTeachingStrategyBlock(strategy: TeachingStrategy): string {
  const lines: string[] = ['\n\nACTIVE TEACHING STRATEGY']
  lines.push(`Strategy: ${strategy.type} (priority ${strategy.priority}/7)`)
  lines.push(`Reason: ${strategy.reason}`)
  lines.push('Instructions for this session:')
  for (const instruction of strategy.tutorInstructions) {
    lines.push(`- ${instruction}`)
  }
  lines.push(`Action directive: ${STRATEGY_ACTION_DIRECTIVE[strategy.type]}`)
  lines.push('Apply this strategy throughout the session. Do not reference it by name to the student.')
  return lines.join('\n')
}

// ── Daily plan priority ───────────────────────────────────────────────────────

/**
 * Returns the priority rank for the teaching strategy (1=highest, 7=lowest).
 * Used by the daily plan to further sort chapters when weights are equal.
 */
export function getStrategyPriority(strategy: TeachingStrategy): number {
  return strategy.priority
}
