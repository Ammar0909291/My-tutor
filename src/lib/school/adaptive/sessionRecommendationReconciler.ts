// W2-4 (ADR 11 §4.2): Session Recommendation Reconciler — pure deterministic function.
// Resolves conflicting in-session recommendation signals before they reach the system prompt.
// Zero I/O, no side effects, no mutation, no randomness.

// Mirrors learningNarrative.ts LearningTrend; structurally compatible (TypeScript structural typing).
export type LearningTrend =
  | 'RAPID_IMPROVEMENT'
  | 'STEADY_PROGRESS'
  | 'RECOVERY_PHASE'
  | 'PLATEAU'
  | 'REGRESSION_RISK'

export interface InSessionSignal {
  source: 'weak_topic' | 'narrative' | 'exam_readiness' | 'spaced_revision' | 'daily_plan'
  topicSlug?: string    // set when the signal is topic-specific (for Rule 4 merge check)
  trend?: LearningTrend // set only by narrative signals
  priority: number      // lower = higher priority; 1 = must-show
  payload: string       // the text block to inject if this signal survives reconciliation
}

export interface SessionRecommendation {
  signals: InSessionSignal[]
  suppressedSignals: Array<{ signal: InSessionSignal; suppressedBy: InSessionSignal }>
  narrativeTrend: LearningTrend | null
  systemPromptBlock: string
}

const DEFAULT_MAX_SESSION_SIGNALS = 3

// ADR 11 §3 signal priority table rules applied in order:
//
// Rule 1: RAPID_IMPROVEMENT or RECOVERY_PHASE narrative suppresses ALL weak_topic signals.
//         Rationale: a student demonstrably improving should not receive "you are weak at X"
//         coaching — the narrative signal is more current evidence.
//
// Rule 4: spaced_revision signal for a topicSlug suppresses a weak_topic signal for the
//         same topicSlug. The two are merged into the single spaced_revision signal
//         ("overdue review + noted weakness") rather than injecting both separately.
//
// Rules 2 & 3 (ADR 11 §3) apply to cross-session signals (failed_assessment,
// continue_chapter) which are outside the Session Recommendation Reconciler's scope;
// those are handled by learningOrchestrator.ts.
export function reconcileSessionSignals(
  signals: InSessionSignal[],
  maxCount: number = DEFAULT_MAX_SESSION_SIGNALS,
): SessionRecommendation {
  const suppressedSignals: Array<{ signal: InSessionSignal; suppressedBy: InSessionSignal }> = []

  // Step 1: extract narrative trend.
  const narrativeSignal = signals.find((s) => s.source === 'narrative')
  const narrativeTrend: LearningTrend | null = narrativeSignal?.trend ?? null

  // Step 2: sort by priority ascending (lower number = higher priority; stable sort).
  const sorted = [...signals].sort((a, b) => a.priority - b.priority)

  // Rule 1 guard: narrative is RAPID_IMPROVEMENT or RECOVERY_PHASE → suppress all weak_topic.
  const narrativeSuppressesWeakTopic =
    narrativeTrend === 'RAPID_IMPROVEMENT' || narrativeTrend === 'RECOVERY_PHASE'

  // Rule 4 guard: collect topicSlugs covered by spaced_revision signals.
  const spacedRevisionSlugs = new Set<string>()
  for (const s of sorted) {
    if (s.source === 'spaced_revision' && s.topicSlug) spacedRevisionSlugs.add(s.topicSlug)
  }

  // Step 3: apply priority table rules to build active signal list.
  const active: InSessionSignal[] = []
  for (const signal of sorted) {
    // Rule 1: suppress weak_topic when narrative trend indicates improvement.
    if (signal.source === 'weak_topic' && narrativeSuppressesWeakTopic) {
      // narrativeSignal is guaranteed non-null when narrativeSuppressesWeakTopic is true.
      suppressedSignals.push({ signal, suppressedBy: narrativeSignal! })
      continue
    }

    // Rule 4: suppress weak_topic when a spaced_revision covers the same topic.
    if (signal.source === 'weak_topic' && signal.topicSlug && spacedRevisionSlugs.has(signal.topicSlug)) {
      const spacedSuppressor = sorted.find(
        (s) => s.source === 'spaced_revision' && s.topicSlug === signal.topicSlug,
      )!
      suppressedSignals.push({ signal, suppressedBy: spacedSuppressor })
      continue
    }

    active.push(signal)
  }

  // Step 4: cap at maxCount; signals beyond the cap are suppressed by the cap sentinel.
  const capped = active.slice(0, maxCount)
  const overLimit = active.slice(maxCount)
  if (overLimit.length > 0) {
    const capSentinel = capped[0]
    for (const signal of overLimit) {
      suppressedSignals.push({ signal, suppressedBy: capSentinel })
    }
  }

  // Step 5: assemble systemPromptBlock from surviving signals in priority order.
  const systemPromptBlock = capped.map((s) => s.payload).join('')

  return { signals: capped, suppressedSignals, narrativeTrend, systemPromptBlock }
}
