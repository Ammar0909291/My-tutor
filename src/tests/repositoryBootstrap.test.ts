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
import fs from 'node:fs'
import path from 'node:path'
import { seedOwnershipWhere, SEED_AUTHOR_ID, BOOTSTRAP_SEED_SUBJECTS } from '@/lib/teaching/assets/brainSeedAssets'

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

// ─── Seed-bootstrap ownership guard ──────────────────────────────────────────
// Regression cover for the production defect where src/instrumentation.ts's
// cold-start bootstrap decided "already seeded" from a bare
// prisma.assetIdentity.count(). That table has a second, unbounded writer
// (explanationMemory's AI_AUTHORED/DRAFT capture path), so captured drafts
// alone could reach EXPECTED_TOTAL and permanently suppress insertion of the
// authored HUMAN_CURATOR assets — leaving Explanation Memory with nothing
// ACTIVE to serve.

/** Minimal evaluator for the subset of Prisma `where` this guard uses. */
function matchesWhere(
  row: { authorKind: string; authorId: string; tags: string[] },
  where: ReturnType<typeof seedOwnershipWhere>,
): boolean {
  return (
    row.authorKind === where.authorKind &&
    row.authorId === where.authorId &&
    row.tags.some((t) => where.tags.hasSome.includes(t))
  )
}

const seedRow = (subject: string) => ({
  authorKind: 'HUMAN_CURATOR',
  authorId: SEED_AUTHOR_ID,
  tags: [subject, 'core_explanation'],
})

describe('seedOwnershipWhere — bootstrap counts only rows it owns', () => {
  const where = seedOwnershipWhere()

  it('NEGATIVE CONTROL: still matches the rows the bootstrap actually inserts', () => {
    // If this ever went false the guard would read 0 forever and the
    // bootstrap would re-attempt a full seed on every cold start.
    for (const subject of BOOTSTRAP_SEED_SUBJECTS) {
      expect(matchesWhere(seedRow(subject), where)).toBe(true)
    }
  })

  it('excludes AI_AUTHORED live-capture rows (the defect that caused the bug)', () => {
    const captured = { authorKind: 'AI_AUTHORED', authorId: 'SYSTEM_AI', tags: ['physics', 'core_explanation'] }
    expect(matchesWhere(captured, where)).toBe(false)
  })

  it('excludes an AI_AUTHORED row even when attributed to a real user id', () => {
    const captured = { authorKind: 'AI_AUTHORED', authorId: 'user_123', tags: ['physics', 'core_explanation'] }
    expect(matchesWhere(captured, where)).toBe(false)
  })

  it('excludes subjects seeded only by the manual script, not by this bootstrap', () => {
    for (const subject of ['chemistry', 'biology', 'computer_science']) {
      expect(matchesWhere(seedRow(subject), where)).toBe(false)
    }
  })

  it('excludes a HUMAN_CURATOR row authored by anyone other than the seed author', () => {
    const otherCurator = { authorKind: 'HUMAN_CURATOR', authorId: 'admin_42', tags: ['physics', 'core_explanation'] }
    expect(matchesWhere(otherCurator, where)).toBe(false)
  })

  it('an unbounded pile of captured drafts can never satisfy the guard', () => {
    // The exact production scenario: capture rows greatly outnumber the seed
    // corpus. Under the old bare count() this returned "seeded"; the owned
    // count must stay 0.
    const flood = Array.from({ length: 5000 }, () => ({
      authorKind: 'AI_AUTHORED', authorId: 'SYSTEM_AI', tags: ['physics', 'core_explanation'],
    }))
    expect(flood.filter((r) => matchesWhere(r, where)).length).toBe(0)
  })

  it('subject scoping cannot collide with familyKind tag values', () => {
    expect(BOOTSTRAP_SEED_SUBJECTS.some((s) => ['core_explanation', 'mastery_probe'].includes(s))).toBe(false)
  })
})

describe('instrumentation bootstrap wiring', () => {
  const SRC = fs.readFileSync(path.resolve('src/instrumentation.ts'), 'utf8')

  it('uses the ownership-scoped count, never a bare count()', () => {
    expect(SRC).toContain('seedOwnershipWhere()')
    expect(SRC).not.toMatch(/assetIdentity\.count\(\s*\)/)
  })

  it('still seeds authored assets as ACTIVE so Explanation Memory can serve them', () => {
    // findBestExplanation/matcher admit ACTIVE only — DRAFT here would mean
    // a fully-seeded catalogue that still serves nothing.
    expect(SRC).toContain('status: AssetStatus.ACTIVE')
  })
})
