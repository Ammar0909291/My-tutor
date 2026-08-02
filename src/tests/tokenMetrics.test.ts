import { describe, it, expect, beforeEach } from 'vitest'
import {
  recordRequest, recordSuccess, snapshotProviderMetrics, resetProviderMetrics,
  MAX_LATENCY_SAMPLES,
} from '@/lib/ai/providers/metrics'

/**
 * P10 — the instrumentation that makes a cost baseline possible at all.
 * Before this, token usage was captured nowhere, so every token/cost figure
 * was necessarily a guess. These tests pin that usage is recorded as REPORTED
 * by the provider and that "not measured" stays distinguishable from "zero".
 */

describe('token accounting', () => {
  beforeEach(() => resetProviderMetrics())

  it('records provider-reported usage', () => {
    recordRequest('gemini')
    recordSuccess('gemini', 900, { promptTokens: 1800, completionTokens: 400 })
    const s = snapshotProviderMetrics().summary.gemini
    expect(s.promptTokens).toBe(1800)
    expect(s.completionTokens).toBe(400)
    expect(s.totalTokens).toBe(2200)
    expect(s.tokensMeasured).toBe(true)
  })

  it('accumulates across calls and averages per success', () => {
    recordSuccess('gemini', 100, { promptTokens: 1000, completionTokens: 200 })
    recordSuccess('gemini', 100, { promptTokens: 2000, completionTokens: 400 })
    const s = snapshotProviderMetrics().summary.gemini
    expect(s.totalTokens).toBe(3600)
    expect(s.avgPromptTokens).toBe(1500)
    expect(s.avgCompletionTokens).toBe(300)
  })

  it('distinguishes NOT MEASURED from zero', () => {
    // A provider that reports nothing must not look like a free call.
    recordSuccess('groq', 500)
    const s = snapshotProviderMetrics().summary.groq
    expect(s.totalTokens).toBe(0)
    expect(s.tokensMeasured).toBe(false)
  })

  it('tolerates partial usage without inventing the missing half', () => {
    recordSuccess('gemini', 100, { promptTokens: 500 })
    const s = snapshotProviderMetrics().summary.gemini
    expect(s.promptTokens).toBe(500)
    expect(s.completionTokens).toBe(0)
  })
})

describe('latency distribution', () => {
  beforeEach(() => resetProviderMetrics())

  it('reports mean, p50 and p95 — not just the mean', () => {
    for (const ms of [100, 200, 300, 400, 5000]) recordSuccess('gemini', ms)
    const s = snapshotProviderMetrics().summary.gemini
    expect(s.avgLatencyMs).toBe(1200)
    expect(s.p50LatencyMs).toBe(300)
    expect(s.p95LatencyMs).toBe(5000)
    // The point of percentiles: the mean hides the tail.
    expect(s.p95LatencyMs).toBeGreaterThan(s.p50LatencyMs)
  })

  it('is zero on a provider with no successes', () => {
    recordRequest('gemini')
    const s = snapshotProviderMetrics().summary.gemini
    expect(s.avgLatencyMs).toBe(0)
    expect(s.p95LatencyMs).toBe(0)
  })

  it('caps retained samples so a long process cannot grow unbounded', () => {
    for (let i = 0; i < MAX_LATENCY_SAMPLES + 50; i++) recordSuccess('gemini', i)
    expect(snapshotProviderMetrics().providers.gemini.latencySamples)
      .toHaveLength(MAX_LATENCY_SAMPLES)
  })

  it('keeps the NEWEST samples when capping', () => {
    for (let i = 0; i < MAX_LATENCY_SAMPLES + 10; i++) recordSuccess('gemini', i)
    const samples = snapshotProviderMetrics().providers.gemini.latencySamples
    expect(samples[samples.length - 1]).toBe(MAX_LATENCY_SAMPLES + 9)
  })
})

describe('no regression to existing metrics', () => {
  beforeEach(() => resetProviderMetrics())

  it('still counts requests, successes and failovers', () => {
    recordRequest('gemini')
    recordSuccess('gemini', 100)
    const snap = snapshotProviderMetrics()
    expect(snap.providers.gemini.requests).toBe(1)
    expect(snap.providers.gemini.successes).toBe(1)
    expect(snap.failovers).toBe(0)
  })

  it('the snapshot is a copy — callers cannot mutate live metrics', () => {
    recordSuccess('gemini', 100, { promptTokens: 10 })
    const snap = snapshotProviderMetrics()
    snap.providers.gemini.promptTokens = 999
    snap.providers.gemini.latencySamples.push(123)
    const fresh = snapshotProviderMetrics()
    expect(fresh.providers.gemini.promptTokens).toBe(10)
    expect(fresh.providers.gemini.latencySamples).toHaveLength(1)
  })

  it('reset clears tokens and samples', () => {
    recordSuccess('gemini', 100, { promptTokens: 10, completionTokens: 5 })
    resetProviderMetrics()
    expect(snapshotProviderMetrics().summary.gemini).toBeUndefined()
  })
})
