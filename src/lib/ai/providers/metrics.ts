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
}

const metrics = new Map<string, ProviderMetrics>()

function ensure(provider: string): ProviderMetrics {
  let m = metrics.get(provider)
  if (!m) {
    m = { requests: 0, successes: 0, failures: 0, timeouts: 0, rateLimits: 0, emptyResponses: 0, totalLatencyMs: 0, lastErrorAt: null, lastSuccessAt: null }
    metrics.set(provider, m)
  }
  return m
}

export function recordRequest(provider: string): void {
  ensure(provider).requests += 1
}

export function recordSuccess(provider: string, latencyMs: number): void {
  const m = ensure(provider)
  m.successes += 1
  m.totalLatencyMs += latencyMs
  m.lastSuccessAt = new Date().toISOString()
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

export function snapshotProviderMetrics(): { providers: Record<string, ProviderMetrics>; failovers: number } {
  const providers: Record<string, ProviderMetrics> = {}
  for (const [name, m] of metrics) providers[name] = { ...m }
  return { providers, failovers: totalFailovers }
}

export function resetProviderMetrics(): void {
  metrics.clear()
  totalFailovers = 0
}
