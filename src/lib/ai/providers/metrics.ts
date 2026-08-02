interface ProviderMetrics {
  requests: number
  successes: number
  failures: number
  timeouts: number
  rateLimits: number
  emptyResponses: number
  totalLatencyMs: number
  lastErrorAt: string | null
  lastSuccessAt: string | null
  // P10 — token accounting. Previously NOTHING in the runtime captured token
  // usage: the providers returned only {text, finishReason, provider} and
  // discarded the usage metadata the SDK already supplies. Without these, no
  // token, cost or cost-per-lesson figure can be anything but a guess.
  promptTokens: number
  completionTokens: number
  /** Latency samples, newest last, capped — enough to derive p50/p95, which a
   *  running total alone cannot give. */
  latencySamples: number[]
}

/** Cap the sample ring so a long-lived process cannot grow without bound. */
export const MAX_LATENCY_SAMPLES = 500

const metrics = new Map<string, ProviderMetrics>()

function ensure(provider: string): ProviderMetrics {
  let m = metrics.get(provider)
  if (!m) {
    m = { requests: 0, successes: 0, failures: 0, timeouts: 0, rateLimits: 0, emptyResponses: 0, totalLatencyMs: 0, lastErrorAt: null, lastSuccessAt: null, promptTokens: 0, completionTokens: 0, latencySamples: [] }
    metrics.set(provider, m)
  }
  return m
}

export function recordRequest(provider: string): void {
  ensure(provider).requests += 1
}

export function recordSuccess(provider: string, latencyMs: number, usage?: TokenUsage | null): void {
  const m = ensure(provider)
  m.successes += 1
  m.totalLatencyMs += latencyMs
  m.lastSuccessAt = new Date().toISOString()
  m.latencySamples.push(latencyMs)
  if (m.latencySamples.length > MAX_LATENCY_SAMPLES) {
    m.latencySamples.splice(0, m.latencySamples.length - MAX_LATENCY_SAMPLES)
  }
  // Usage is optional: a provider that does not report it simply contributes
  // nothing, rather than contributing a fabricated zero-cost turn.
  if (usage) {
    m.promptTokens += usage.promptTokens ?? 0
    m.completionTokens += usage.completionTokens ?? 0
  }
}

/** Token counts as reported BY THE PROVIDER — never estimated locally. */
export interface TokenUsage {
  promptTokens?: number
  completionTokens?: number
}

/** Nearest-rank percentile over the retained samples. */
function percentile(sorted: number[], p: number): number {
  if (sorted.length === 0) return 0
  const idx = Math.min(sorted.length - 1, Math.ceil((p / 100) * sorted.length) - 1)
  return sorted[Math.max(0, idx)]
}

export function recordFailure(provider: string, kind: 'timeout' | 'rateLimit' | 'emptyResponse' | 'error'): void {
  const m = ensure(provider)
  m.failures += 1
  m.lastErrorAt = new Date().toISOString()
  if (kind === 'timeout') m.timeouts += 1
  if (kind === 'rateLimit') m.rateLimits += 1
  if (kind === 'emptyResponse') m.emptyResponses += 1
}

let totalFailovers = 0
export function recordFailover(): void { totalFailovers += 1 }

/** Per-provider derived view: the figures an audit actually needs. */
export interface ProviderSummary {
  requests: number
  successes: number
  failures: number
  avgLatencyMs: number
  p50LatencyMs: number
  p95LatencyMs: number
  promptTokens: number
  completionTokens: number
  totalTokens: number
  avgPromptTokens: number
  avgCompletionTokens: number
  /** True when the provider reported no usage at all — so callers can tell
   *  "zero tokens" apart from "not measured", which is the exact ambiguity
   *  that made previous cost claims unreliable. */
  tokensMeasured: boolean
}

export function snapshotProviderMetrics(): {
  providers: Record<string, ProviderMetrics>
  summary: Record<string, ProviderSummary>
  failovers: number
} {
  const providers: Record<string, ProviderMetrics> = {}
  const summary: Record<string, ProviderSummary> = {}
  for (const [name, m] of metrics) {
    providers[name] = { ...m, latencySamples: [...m.latencySamples] }
    const sorted = [...m.latencySamples].sort((a, b) => a - b)
    const totalTokens = m.promptTokens + m.completionTokens
    summary[name] = {
      requests: m.requests,
      successes: m.successes,
      failures: m.failures,
      avgLatencyMs: m.successes === 0 ? 0 : Math.round(m.totalLatencyMs / m.successes),
      p50LatencyMs: percentile(sorted, 50),
      p95LatencyMs: percentile(sorted, 95),
      promptTokens: m.promptTokens,
      completionTokens: m.completionTokens,
      totalTokens,
      avgPromptTokens: m.successes === 0 ? 0 : Math.round(m.promptTokens / m.successes),
      avgCompletionTokens: m.successes === 0 ? 0 : Math.round(m.completionTokens / m.successes),
      tokensMeasured: totalTokens > 0,
    }
  }
  return { providers, summary, failovers: totalFailovers }
}

export function resetProviderMetrics(): void {
  metrics.clear()
  totalFailovers = 0
}
