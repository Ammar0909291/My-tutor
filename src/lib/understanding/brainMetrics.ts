/**
 * Brain Runtime metrics — Milestone 4 observability.
 *
 * In-process counters ONLY (no DB changes, per the milestone rules):
 * they measure, per server process, how the Brain runtime is behaving —
 * total turns, Groq calls vs. Explanation Memory serves, the decision
 * distribution, and fallback count — and are logged each turn as
 * '[learn/chat] BRAIN metrics=...' so shadow/active behavior can be
 * verified from logs alone. Counters reset on process restart; they are
 * an observability surface, never a store of record. Never throws.
 */
import type { DispatchPlan } from './dispatcher'

export interface BrainMetricsSnapshot {
  totalTurns: number
  groqCalls: number
  explanationMemoryServes: number
  activeTurns: number
  shadowTurns: number
  fallbacks: number
  decisions: Record<string, number>
  /** P0 compliance validation — see execution.ts checkBrainCompliance(). */
  complianceChecks: number
  complianceViolations: number
}

const metrics: BrainMetricsSnapshot = {
  totalTurns: 0,
  groqCalls: 0,
  explanationMemoryServes: 0,
  activeTurns: 0,
  shadowTurns: 0,
  fallbacks: 0,
  decisions: {},
  complianceChecks: 0,
  complianceViolations: 0,
}

/** One call per turn, at dispatch time. A null plan counts as a fallback. */
export function recordDispatch(plan: DispatchPlan | null, brainRuntimeActive: boolean): void {
  try {
    metrics.totalTurns += 1
    if (brainRuntimeActive) metrics.activeTurns += 1
    else metrics.shadowTurns += 1
    const key = plan?.decision ?? 'NO_PLAN'
    metrics.decisions[key] = (metrics.decisions[key] ?? 0) + 1
    if (!plan || plan.note.startsWith('FALLBACK')) metrics.fallbacks += 1
  } catch { /* observability never breaks a turn */ }
}

/** One call per turn, at serve time. */
export function recordServe(kind: 'memory' | 'llm'): void {
  try {
    if (kind === 'memory') metrics.explanationMemoryServes += 1
    else metrics.groqCalls += 1
    console.log('[learn/chat] BRAIN metrics=' + JSON.stringify(metrics))
  } catch { /* observability never breaks a turn */ }
}

export function snapshotBrainMetrics(): BrainMetricsSnapshot {
  return { ...metrics, decisions: { ...metrics.decisions } }
}

/**
 * P0 — one call per turn where a Brain decision was reachable (compliant
 * or not). Never silently ignores a violation: always logged, at 'warn'
 * level specifically so it's visually distinct from routine info logs.
 */
export function recordCompliance(result: { compliant: boolean; reason: string }): void {
  try {
    if (result.compliant) {
      metrics.complianceChecks += 1
    } else {
      metrics.complianceChecks += 1
      metrics.complianceViolations += 1
      console.warn('[learn/chat] BRAIN COMPLIANCE VIOLATION: ' + result.reason)
    }
  } catch { /* observability never breaks a turn */ }
}

/** Test hook — counters are process-global. */
export function resetBrainMetrics(): void {
  metrics.totalTurns = 0
  metrics.groqCalls = 0
  metrics.explanationMemoryServes = 0
  metrics.activeTurns = 0
  metrics.shadowTurns = 0
  metrics.fallbacks = 0
  metrics.decisions = {}
  metrics.complianceChecks = 0
  metrics.complianceViolations = 0
}
