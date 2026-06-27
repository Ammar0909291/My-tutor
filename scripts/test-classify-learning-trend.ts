/**
 * Offline unit harness for classifyLearningTrend in
 * src/lib/school/adaptive/learningNarrative.ts. Pure, no DB/network.
 *
 * Run with:  npx tsx scripts/test-classify-learning-trend.ts
 *
 * Focus: the RAPID_IMPROVEMENT-shadowing fix. RECOVERY_PHASE's threshold
 * (MODERATE_DELTA=6) is lower than RAPID_IMPROVEMENT's (STRONG_DELTA=15), so
 * checking RECOVERY_PHASE first made RAPID_IMPROVEMENT unreachable for any
 * student whose earlier window was weak — even with an enormous recent gain.
 * RAPID_IMPROVEMENT must now be checked first.
 */

import { classifyLearningTrend } from '../src/lib/school/adaptive/learningNarrative'
import type { NarrativeSignals } from '../src/lib/school/adaptive/learningNarrative'

let passed = 0
let failed = 0
function check(name: string, cond: boolean) {
  if (cond) { passed++; console.log(`[✓ pass] ${name}`) }
  else { failed++; console.log(`[✗ FAIL] ${name}`) }
}

function signals(overrides: Partial<NarrativeSignals> = {}): NarrativeSignals {
  return {
    recentScore: null,
    earlierScore: null,
    recentCheckpointRate: null,
    earlierCheckpointRate: null,
    recentMistakeRate: 0,
    earlierMistakeRate: 0,
    earlierWasWeak: false,
    evidenceCount: 10,
    ...overrides,
  }
}

// ── No comparable deltas → PLATEAU ───────────────────────────────────────
check('no signals at all → PLATEAU', classifyLearningTrend(signals()) === 'PLATEAU')

// ── REGRESSION_RISK ───────────────────────────────────────────────────────
check('score delta -15 → REGRESSION_RISK',
  classifyLearningTrend(signals({ recentScore: 40, earlierScore: 55 })) === 'REGRESSION_RISK')
check('boundary delta exactly -6 → REGRESSION_RISK',
  classifyLearningTrend(signals({ recentScore: 44, earlierScore: 50 })) === 'REGRESSION_RISK')
check('earlierWasWeak does not override a clear decline → still REGRESSION_RISK',
  classifyLearningTrend(signals({ recentScore: 40, earlierScore: 55, earlierWasWeak: true })) === 'REGRESSION_RISK')

// ── RECOVERY_PHASE (moderate gain, weak earlier window) ───────────────────
check('earlierWasWeak + moderate gain (delta 10) → RECOVERY_PHASE',
  classifyLearningTrend(signals({ recentScore: 60, earlierScore: 50, earlierWasWeak: true })) === 'RECOVERY_PHASE')
check('earlierWasWeak + gain below threshold (delta 3) → PLATEAU, not RECOVERY_PHASE',
  classifyLearningTrend(signals({ recentScore: 53, earlierScore: 50, earlierWasWeak: true })) === 'PLATEAU')

// ── REGRESSION TEST — RAPID_IMPROVEMENT must win over RECOVERY_PHASE ─────
check('REGRESSION: earlierWasWeak + huge gain (delta 35) → RAPID_IMPROVEMENT, not RECOVERY_PHASE',
  classifyLearningTrend(signals({ recentScore: 85, earlierScore: 50, earlierWasWeak: true })) === 'RAPID_IMPROVEMENT')
check('earlierWasWeak false + huge gain (delta 40) → RAPID_IMPROVEMENT',
  classifyLearningTrend(signals({ recentScore: 90, earlierScore: 50, earlierWasWeak: false })) === 'RAPID_IMPROVEMENT')
check('boundary delta exactly 15 → RAPID_IMPROVEMENT',
  classifyLearningTrend(signals({ recentScore: 65, earlierScore: 50 })) === 'RAPID_IMPROVEMENT')

// ── STEADY_PROGRESS ────────────────────────────────────────────────────────
check('earlierWasWeak false + moderate gain (delta 10) → STEADY_PROGRESS',
  classifyLearningTrend(signals({ recentScore: 65, earlierScore: 55 })) === 'STEADY_PROGRESS')
check('boundary delta exactly 6 → STEADY_PROGRESS',
  classifyLearningTrend(signals({ recentScore: 56, earlierScore: 50 })) === 'STEADY_PROGRESS')

// ── Mistake-rate delta folded in ─────────────────────────────────────────
check('mistake rate alone, meaningful swing (12pt) → STEADY_PROGRESS',
  classifyLearningTrend(signals({ recentMistakeRate: 0, earlierMistakeRate: 1 })) === 'STEADY_PROGRESS')
check('mistake rate swing below threshold (4.8pt) → ignored → PLATEAU',
  classifyLearningTrend(signals({ recentMistakeRate: 0, earlierMistakeRate: 0.4 })) === 'PLATEAU')

// ── Mistake delta clamp at ±25 actually changes the outcome category ─────
{
  // Without the clamp, raw mistake delta would be (0-10)*12 = -120, and
  // averaged with a +44 score delta would give -38 → REGRESSION_RISK.
  // With the clamp at -25, the average becomes (44 + -25) / 2 = 9.5 → STEADY_PROGRESS.
  const s = signals({ recentScore: 94, earlierScore: 50, recentMistakeRate: 10, earlierMistakeRate: 0 })
  check('mistake delta clamps at -25 (not -120) → STEADY_PROGRESS, not REGRESSION_RISK',
    classifyLearningTrend(s) === 'STEADY_PROGRESS')
}

// ── Multi-signal averaging ─────────────────────────────────────────────────
check('two deltas (10, 0) average to 5 → below threshold → PLATEAU',
  classifyLearningTrend(signals({
    recentScore: 70, earlierScore: 60,
    recentCheckpointRate: 80, earlierCheckpointRate: 80,
  })) === 'PLATEAU')
check('two deltas (10, 10) average to 10 → STEADY_PROGRESS',
  classifyLearningTrend(signals({
    recentScore: 70, earlierScore: 60,
    recentCheckpointRate: 90, earlierCheckpointRate: 80,
  })) === 'STEADY_PROGRESS')

console.log(`\n=== ${passed} passed, ${failed} failed ===`)
process.exit(failed ? 1 : 0)
