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
 *
 * PRODUCTION-VALIDATION NOTE (2026-07-21): this app deploys to Vercel
 * (vercel.json, next.config.js) as Node.js serverless functions, not a
 * single long-lived process. `metrics`/`sessionMetrics` below are scoped
 * to ONE warm serverless instance — concurrent traffic is served by
 * multiple instances, each with its own independent copy of these
 * counters, and a cold start resets them to zero. They are correct and
 * useful as a live, single-instance sanity check (exactly how
 * getSessionBrainMetrics is wired into /api/admin/ops below) but they
 * are NOT a global aggregate across all production traffic — do not
 * build a claim like "X% of turns this week were compliant" on them.
 * The per-turn '[learn/chat] BRAIN_EVENT=...' JSON log line is the
 * only signal here that genuinely covers all traffic, and only if
 * something aggregates Vercel's captured function logs (a log drain
 * or platform outside this repo) — nothing in this repo does that today.
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
  sessionMetrics.clear()
}

// ─── P1 production-validation telemetry ─────────────────────────────────────
// One BrainEvent per tutor turn — a superset of what recordDispatch/
// recordServe/recordCompliance above already track individually, assembled
// once the route knows every outcome for the turn, and (a) folded into a
// per-session running-counter aggregate (same increment-in-place style as
// the process-global `metrics` above — no raw event history retained, so
// memory never grows unbounded with session count/length) and (b) emitted
// as one structured, greppable log line for later analysis. In-process
// only, per the existing milestone rule; never a store of record.

/** Everything measured for one tutor turn — see route.ts's single call site. */
export interface BrainEvent {
  version: 1
  timestamp: string
  sessionId: string
  userId: string
  subjectSlug: string
  brainRuntimeActive: boolean
  /** The Brain's decision this turn, or null if the CUE/Decision Engine didn't run. */
  brainDecision: string | null
  brainRuleId: string | null
  /** null when there was no decision to check compliance against this turn. */
  compliant: boolean | null
  complianceReason: string | null
  explanationMemoryAvailable: boolean
  explanationMemoryHit: boolean
  fallbackReason: string | null
  llmUsed: boolean
  provider: string
  /** Total turn latency (Date.now() - the request's own received-at timestamp). */
  latencyMs: number
  recoveryTriggered: boolean
  recoveryKey: string | null
  frustrationDetected: boolean
  questionLoopDetected: boolean
  directInstructionTriggered: boolean
  /** True when Explanation Memory was available but the Brain's dispatch
   *  plan would route to the LLM instead — the one concrete, cheaply-
   *  computed case where Brain and legacy (assembled !== null) disagree. */
  brainLegacyDisagreement: boolean
  visualFired: boolean
  responseLength: number
}

interface SessionCounters {
  totalTurns: number
  complianceChecked: number
  compliantTurns: number
  explanationMemoryAvailableTurns: number
  explanationMemoryHits: number
  llmTurns: number
  recoveryTurns: number
  frustrationTurns: number
  questionLoopTurns: number
  directInstructionTurns: number
  latencySumMs: number
  latencyCount: number
  disagreements: number
}

function emptySessionCounters(): SessionCounters {
  return {
    totalTurns: 0, complianceChecked: 0, compliantTurns: 0,
    explanationMemoryAvailableTurns: 0, explanationMemoryHits: 0, llmTurns: 0,
    recoveryTurns: 0, frustrationTurns: 0, questionLoopTurns: 0, directInstructionTurns: 0,
    latencySumMs: 0, latencyCount: 0, disagreements: 0,
  }
}

const sessionMetrics = new Map<string, SessionCounters>()

/**
 * One call per turn — folds the event into its session's running counters
 * and emits the structured log line. Never throws (fail-open, matches
 * every other function in this file); a failure here can never affect the
 * turn's response.
 */
export function recordBrainEvent(event: BrainEvent): void {
  try {
    console.log('[learn/chat] BRAIN_EVENT=' + JSON.stringify(event))
  } catch { /* observability never breaks a turn */ }
  try {
    const s = sessionMetrics.get(event.sessionId) ?? emptySessionCounters()
    s.totalTurns += 1
    if (event.compliant !== null) {
      s.complianceChecked += 1
      if (event.compliant) s.compliantTurns += 1
    }
    if (event.explanationMemoryAvailable) s.explanationMemoryAvailableTurns += 1
    if (event.explanationMemoryHit) s.explanationMemoryHits += 1
    if (event.llmUsed) s.llmTurns += 1
    if (event.recoveryTriggered) s.recoveryTurns += 1
    if (event.frustrationDetected) s.frustrationTurns += 1
    if (event.questionLoopDetected) s.questionLoopTurns += 1
    if (event.directInstructionTriggered) s.directInstructionTurns += 1
    if (event.brainLegacyDisagreement) s.disagreements += 1
    if (typeof event.latencyMs === 'number' && Number.isFinite(event.latencyMs)) {
      s.latencySumMs += event.latencyMs
      s.latencyCount += 1
    }
    sessionMetrics.set(event.sessionId, s)
  } catch { /* observability never breaks a turn */ }
}

/** Percentage form of a session's counters — null fields mean "no turns yet". */
export interface SessionBrainMetrics {
  sessionId: string
  totalTurns: number
  compliancePct: number | null
  explanationMemoryPct: number
  llmPct: number
  recoveryPct: number
  frustrationPct: number
  questionLoopPct: number
  directInstructionPct: number
  avgLatencyMs: number | null
  brainLegacyDisagreements: number
  brainLegacyDisagreementPct: number
}

function pct(numerator: number, denominator: number): number {
  return denominator === 0 ? 0 : Math.round((numerator / denominator) * 1000) / 10
}

/**
 * The reusable Brain Health service this milestone asks for — no UI, just
 * a function any future dashboard/route can call. Returns null for a
 * session with no recorded turns (never a fabricated all-zero report).
 */
export function getSessionBrainMetrics(sessionId: string): SessionBrainMetrics | null {
  const s = sessionMetrics.get(sessionId)
  if (!s || s.totalTurns === 0) return null
  return {
    sessionId,
    totalTurns: s.totalTurns,
    compliancePct: s.complianceChecked === 0 ? null : pct(s.compliantTurns, s.complianceChecked),
    explanationMemoryPct: pct(s.explanationMemoryHits, s.totalTurns),
    llmPct: pct(s.llmTurns, s.totalTurns),
    recoveryPct: pct(s.recoveryTurns, s.totalTurns),
    frustrationPct: pct(s.frustrationTurns, s.totalTurns),
    questionLoopPct: pct(s.questionLoopTurns, s.totalTurns),
    directInstructionPct: pct(s.directInstructionTurns, s.totalTurns),
    avgLatencyMs: s.latencyCount === 0 ? null : Math.round(s.latencySumMs / s.latencyCount),
    brainLegacyDisagreements: s.disagreements,
    brainLegacyDisagreementPct: pct(s.disagreements, s.totalTurns),
  }
}
