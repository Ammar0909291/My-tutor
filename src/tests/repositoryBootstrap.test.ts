/**
 * Pure-function tests for the repository bootstrap infrastructure:
 * similarity/dedup, versioning decisions, and ranking. No Prisma, no DB —
 * matching this suite's existing DB-independent convention.
 */
import { describe, it, expect } from 'vitest'
import { jaccardSimilarity, hashContent, DUPLICATE_SIMILARITY_THRESHOLD } from '@/lib/teaching/assets/similarity'
import { decideCaptureAction, type LineageAsset } from '@/lib/teaching/assets/versioning'
import { rankAsset, computeFreshness, parseManualPriority, type RankableAsset } from '@/lib/teaching/assets/ranking'
import { AssetStatus } from '@prisma/client'

describe('jaccardSimilarity', () => {
  it('is 1 for identical text', () => {
    expect(jaccardSimilarity('gravity pulls objects down', 'gravity pulls objects down')).toBe(1)
  })

  it('is high for a lightly reworded duplicate (same vocabulary, different order/connectors)', () => {
    // Jaccard compares token SETS, not stems — "toward"/"towards" would count
    // as different tokens, so this deliberately reuses the same word forms
    // to isolate what the threshold is meant to catch: an LLM regenerating
    // near-identical wording, not paraphrase detection via morphology.
    const a = 'Gravity is a force that pulls objects toward the center of the Earth.'
    const b = 'Gravity pulls objects toward the center of the Earth — it is a force.'
    expect(jaccardSimilarity(a, b)).toBeGreaterThanOrEqual(DUPLICATE_SIMILARITY_THRESHOLD)
  })

  it('is low for genuinely different content', () => {
    const a = 'Gravity is a force that pulls objects toward the Earth.'
    const b = 'Velocity is speed combined with a direction of travel.'
    expect(jaccardSimilarity(a, b)).toBeLessThan(DUPLICATE_SIMILARITY_THRESHOLD)
  })

  it('treats two empty/stopword-only strings as identical (both empty sets)', () => {
    expect(jaccardSimilarity('the a an', 'is are to')).toBe(1)
  })
})

describe('hashContent', () => {
  it('is deterministic', () => {
    expect(hashContent('hello world')).toBe(hashContent('hello world'))
  })

  it('differs for different content (no length-only collisions)', () => {
    // Same length, different content — the old probe hash (`p${stem.length}`)
    // would have collided here; the shared hasher must not.
    expect(hashContent('cat')).not.toBe(hashContent('dog'))
  })
})

describe('decideCaptureAction', () => {
  it('starts a new lineage when nothing exists yet', () => {
    const decision = decideCaptureAction('brand new content', hashContent('brand new content'), [])
    expect(decision.action).toBe('new-lineage')
  })

  it('skips an exact duplicate by content hash', () => {
    const content = 'Velocity is speed with a direction.'
    const lineage: LineageAsset[] = [{ assetId: 'a1', contentHash: hashContent(content), content, version: 1 }]
    const decision = decideCaptureAction(content, hashContent(content), lineage)
    expect(decision).toMatchObject({ action: 'skip-duplicate', matchedAssetId: 'a1' })
  })

  it('skips a near-duplicate (punctuation/case variant) of the latest version', () => {
    const original = 'Velocity is speed combined with a direction of travel.'
    const reworded = 'VELOCITY is speed combined, with a direction of travel!'
    const lineage: LineageAsset[] = [{ assetId: 'a1', contentHash: hashContent(original), content: original, version: 1 }]
    const decision = decideCaptureAction(reworded, hashContent(reworded), lineage)
    expect(decision.action).toBe('skip-duplicate')
  })

  it('creates a new version linked to the latest when meaningfully different', () => {
    const original = 'Velocity is speed with a direction.'
    const improved = 'Velocity combines both speed and direction — for example, 60 km/h north is a different velocity than 60 km/h south.'
    const lineage: LineageAsset[] = [{ assetId: 'a1', contentHash: hashContent(original), content: original, version: 1 }]
    const decision = decideCaptureAction(improved, hashContent(improved), lineage)
    expect(decision).toMatchObject({ action: 'new-version', parentVersionId: 'a1', nextVersion: 2 })
  })

  it('versions off the latest version, not an older one', () => {
    const v1 = 'Velocity is speed with a direction.'
    const v2 = 'Velocity combines both speed and direction of travel for a moving object.'
    const v3Candidate = 'Something completely unrelated about photosynthesis in plants.'
    const lineage: LineageAsset[] = [
      { assetId: 'a1', contentHash: hashContent(v1), content: v1, version: 1 },
      { assetId: 'a2', contentHash: hashContent(v2), content: v2, version: 2 },
    ]
    const decision = decideCaptureAction(v3Candidate, hashContent(v3Candidate), lineage)
    expect(decision).toMatchObject({ action: 'new-version', parentVersionId: 'a2', nextVersion: 3 })
  })
})

describe('computeFreshness', () => {
  it('is 1.0 for a brand-new asset', () => {
    const now = new Date('2026-07-07T00:00:00Z')
    expect(computeFreshness(now, now)).toBeCloseTo(1, 5)
  })

  it('decays toward 0 as age increases', () => {
    const now = new Date('2026-07-07T00:00:00Z')
    const oneYearAgo = new Date('2025-07-07T00:00:00Z')
    const fresh = computeFreshness(now, now)
    const old = computeFreshness(oneYearAgo, now)
    expect(old).toBeLessThan(fresh)
    expect(old).toBeGreaterThan(0)
  })
})

describe('parseManualPriority', () => {
  it('reads a priority:<n> tag', () => {
    expect(parseManualPriority(['physics', 'priority:4'])).toBe(4)
  })

  it('defaults to 0 when no priority tag is present', () => {
    expect(parseManualPriority(['physics', 'core_explanation'])).toBe(0)
  })

  it('ignores an out-of-range value', () => {
    expect(parseManualPriority(['priority:9'])).toBe(0)
  })
})

describe('rankAsset', () => {
  function makeAsset(overrides: Partial<RankableAsset> = {}): RankableAsset {
    return {
      assetId: 'a1',
      status: AssetStatus.ACTIVE,
      qualityScore: 0.5,
      qualityConfidence: 0.5,
      tags: ['physics'],
      createdAt: new Date(),
      updatedAt: new Date(),
      ...overrides,
    }
  }

  it('ranks a manually-prioritized asset above an equally-good unprioritized one', () => {
    const prioritized = rankAsset(makeAsset({ assetId: 'p', tags: ['physics', 'priority:5'] }), 0)
    const normal = rankAsset(makeAsset({ assetId: 'n' }), 0)
    expect(prioritized.compositeScore).toBeGreaterThan(normal.compositeScore)
  })

  it('ranks higher usage above lower usage, all else equal', () => {
    const popular = rankAsset(makeAsset({ assetId: 'pop' }), 1000)
    const unused = rankAsset(makeAsset({ assetId: 'unused' }), 0)
    expect(popular.compositeScore).toBeGreaterThan(unused.compositeScore)
  })

  it('exposes approvalDateProxy only for ACTIVE assets', () => {
    const active = rankAsset(makeAsset({ status: AssetStatus.ACTIVE }), 0)
    const draft = rankAsset(makeAsset({ status: AssetStatus.DRAFT }), 0)
    expect(active.factors.approvalDateProxy).not.toBeNull()
    expect(draft.factors.approvalDateProxy).toBeNull()
  })

  it('never exceeds 100', () => {
    const maxed = rankAsset(makeAsset({ tags: ['priority:5'], qualityScore: 1, qualityConfidence: 1 }), 1_000_000)
    expect(maxed.compositeScore).toBeLessThanOrEqual(100)
  })
})
