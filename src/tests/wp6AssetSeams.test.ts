/**
 * WP-6 — EH-1 (authored demand reaches the work queue) and EH-2 (sufficiency
 * vector as a read model). The load-bearing assertion is backward
 * compatibility: with no demand supplied, buildWorkQueue is the old function.
 */
import { describe, it, expect } from 'vitest'
import {
  buildWorkQueue, recommendationFor,
  type ConceptQualityStats, type AuthoredDemand,
} from '@/lib/teaching/assets/contentQualityDashboard'
import { summarizeSufficiency, type SufficiencyVector } from '@/lib/teaching/assets/sufficiency'

function stats(o: Partial<ConceptQualityStats> & { conceptId: string }): ConceptQualityStats {
  return {
    subject: 'physics', totalServed: 0, exactMatchCount: 0, gradeFallbackCount: 0,
    confidenceFallbackCount: 0, groqFallbackCount: 0, averageConfidence: null,
    lastServed: null, assetCount: 0, authoredCoverage: false,
    exactMatchRate: 0, gradeFallbackRate: 0, confidenceFallbackRate: 0, groqFallbackRate: 0,
    ...o,
  }
}

describe('WP-6 · EH-1 — authored demand reaches the queue', () => {
  const neverServed = stats({ conceptId: 'phys.a' })
  // authoredCoverage true, so classifyProblem reaches the groqFallbackRate
  // branch rather than short-circuiting on 'no_authored_asset'.
  const served = stats({
    conceptId: 'phys.b', totalServed: 40, groqFallbackCount: 40, groqFallbackRate: 1,
    assetCount: 2, authoredCoverage: true,
  })

  it('is byte-identical to the previous function when no demand is supplied', () => {
    const withoutArg = buildWorkQueue([neverServed, served])
    const withEmpty = buildWorkQueue([neverServed, served], 50, [])
    expect(withoutArg).toEqual(withEmpty)
    // The never-served concept is still invisible without declared demand —
    // that is the pre-existing behaviour EH-1 documents, not a regression.
    expect(withoutArg.map((i) => i.conceptId)).toEqual(['phys.b'])
    expect(withoutArg[0].demandCount).toBeUndefined()
  })

  it('surfaces a never-served concept once a phase declares a defect', () => {
    const demand: AuthoredDemand[] = [
      { conceptId: 'phys.a', subject: 'physics', source: 'phase1_asset_absent' },
    ]
    const q = buildWorkQueue([neverServed, served], 50, demand)
    const a = q.find((i) => i.conceptId === 'phys.a')
    expect(a).toBeDefined()
    expect(a!.problem).toBe('authored_demand')
    expect(a!.recommendation).toBe('AUTHOR_FIRST_ASSET')
    expect(a!.demandCount).toBe(1)
    expect(a!.demandSources).toEqual(['phase1_asset_absent'])
  })

  it('does not let declared demand override an observed telemetry problem', () => {
    const q = buildWorkQueue([served], 50, [
      { conceptId: 'phys.b', subject: 'physics', source: 'phase3_authoring_flag' },
    ])
    expect(q[0].problem).toBe('groq_fallback')   // telemetry wins
    expect(q[0].demandCount).toBe(1)             // demand still recorded
  })

  it('ranks observed demand above declared demand within the shared band', () => {
    const q = buildWorkQueue(
      [stats({ conceptId: 'phys.c', totalServed: 5 }), neverServed],
      50,
      [{ conceptId: 'phys.a', subject: 'physics', source: 'phase2_visual_coverage' }],
    )
    expect(q[0].conceptId).toBe('phys.c')        // no_authored_asset, 5 requests
    expect(q[1].conceptId).toBe('phys.a')        // authored_demand, 1 defect
  })

  it('counts repeated defects and deduplicates their sources', () => {
    const q = buildWorkQueue([neverServed], 50, [
      { conceptId: 'phys.a', subject: 'physics', source: 'phase1_asset_absent' },
      { conceptId: 'phys.a', subject: 'physics', source: 'phase1_asset_absent' },
      { conceptId: 'phys.a', subject: 'physics', source: 'phase2_visual_coverage' },
    ])
    expect(q[0].demandCount).toBe(3)
    expect(q[0].demandSources).toEqual(['phase1_asset_absent', 'phase2_visual_coverage'])
  })

  it('does not drop a defect for a concept missing from the stats array', () => {
    const q = buildWorkQueue([], 50, [
      { conceptId: 'phys.z', subject: 'physics', source: 'phase1_asset_absent' },
    ])
    expect(q.map((i) => i.conceptId)).toEqual(['phys.z'])
    expect(q[0].requests).toBe(0)
  })

  it('leaves recommendationFor unchanged for telemetry-only classification', () => {
    expect(recommendationFor(neverServed)).toBe('NO_ACTION')
    expect(recommendationFor(served)).toBe('AUTHOR_FIRST_ASSET')
  })
})

describe('WP-6 · EH-2 — sufficiency vector', () => {
  const v = (id: string, expl: number, vis: number): SufficiencyVector => ({
    conceptId: id, subject: 'physics',
    teaching: { state: 'DELEGATED', detail: '' },
    adaptive: { state: 'NOT_MEASURABLE', detail: '' },
    visual: { state: 'MEASURED', assetCount: vis, sufficient: vis > 0, detail: '' },
    explanation: { state: 'MEASURED', assetCount: expl, sufficient: expl > 0, detail: '' },
  })

  it('never computes a teaching value — it stays delegated to EBC', () => {
    const s = summarizeSufficiency('physics', [v('a', 3, 0)])
    expect(s.teaching).toBe('DELEGATED')
    expect(s.adaptive).toBe('NOT_MEASURABLE')
  })

  it('surfaces concepts the scalar metric calls covered but that have no visual', () => {
    const s = summarizeSufficiency('physics', [v('a', 2, 0), v('b', 1, 1), v('c', 0, 0)])
    expect(s.explanationCovered).toBe(2)
    expect(s.visualCovered).toBe(1)
    expect(s.coveredButNoVisual).toBe(1)   // 'a'
  })

  it('reports the same explanation numerator coveragePercent already uses', () => {
    const s = summarizeSufficiency('physics', [v('a', 1, 0), v('b', 0, 5)])
    expect(s.concepts).toBe(2)
    expect(s.explanationCovered).toBe(1)   // assetCount > 0 over EXPLANATION
  })
})
