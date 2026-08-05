/**
 * Remediation Item 3 — pre-flight duplicate-identity validation for the seed
 * writers.
 *
 * Two things are covered here:
 *   1. the validator's own behaviour, against synthetic fixtures; and
 *   2. STRUCTURAL LOCKS asserting each writer calls it before its first
 *      database write. (2) is the part that actually guarantees "zero rows
 *      written on failure" — a validator that runs after a create is useless,
 *      and only source ordering can prove it does not.
 *
 * Deliberately uses synthetic fixtures rather than asserting the live corpus
 * is currently colliding: that fact is already ratcheted in
 * brainSeedAssets.test.ts, and duplicating it here would make Item 5's
 * clean-up fail two files instead of updating one.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  validateSeedIdentities, formatSeedIdentityReport, previewOf,
  type SeedIdentityInput,
} from '@/lib/teaching/assets/seedIdentityValidation'

function item(over: Partial<SeedIdentityInput> = {}): SeedIdentityInput {
  return {
    canonicalSlug: 'phys.mech.force:mcq:en:high',
    family: 'PROBE',
    conceptId: 'phys.mech.force',
    subjectSlug: 'physics',
    familyKind: 'mcq',
    gradeBand: 'HIGH',
    preview: 'a probe stem',
    ...over,
  }
}

describe('validateSeedIdentities', () => {
  it('passes a clean dataset — seeding proceeds normally', () => {
    const v = validateSeedIdentities([
      item({ canonicalSlug: 'a:mcq:en:high' }),
      item({ canonicalSlug: 'b:mcq:en:high' }),
      item({ canonicalSlug: 'c:mcq:en:high' }),
    ])
    expect(v.ok).toBe(true)
    expect(v.conflicts).toEqual([])
    expect(v.totalItems).toBe(3)
    expect(v.distinctIdentities).toBe(3)
    expect(v.discardedItems).toBe(0)
  })

  it('passes an empty dataset', () => {
    const v = validateSeedIdentities([])
    expect(v.ok).toBe(true)
    expect(v.discardedItems).toBe(0)
  })

  it('fails when two assets claim one identity, and counts the discards', () => {
    const v = validateSeedIdentities([
      item({ canonicalSlug: 'dup:mcq:en:high', preview: 'first' }),
      item({ canonicalSlug: 'dup:mcq:en:high', preview: 'second' }),
      item({ canonicalSlug: 'unique:mcq:en:high' }),
    ])
    expect(v.ok).toBe(false)
    expect(v.conflicts).toHaveLength(1)
    expect(v.conflicts[0].canonicalSlug).toBe('dup:mcq:en:high')
    expect(v.conflicts[0].items).toHaveLength(2)
    expect(v.totalItems).toBe(3)
    expect(v.distinctIdentities).toBe(2)
    expect(v.discardedItems).toBe(1)
  })

  it('counts n-1 discards for an n-way collision', () => {
    const v = validateSeedIdentities([
      item({ canonicalSlug: 'x:mcq:en:high', preview: '1' }),
      item({ canonicalSlug: 'x:mcq:en:high', preview: '2' }),
      item({ canonicalSlug: 'x:mcq:en:high', preview: '3' }),
      item({ canonicalSlug: 'x:mcq:en:high', preview: '4' }),
    ])
    expect(v.discardedItems).toBe(3)
    expect(v.conflicts[0].items).toHaveLength(4)
  })

  it('detects a collision ACROSS families, matching the writers\' family-agnostic dedup', () => {
    // The writers run findFirst({ where: { canonicalSlug } }) with no family
    // predicate, so an explanation and a probe on one slug collide too.
    const v = validateSeedIdentities([
      item({ canonicalSlug: 'same:kind:en:high', family: 'EXPLANATION', familyKind: 'core_explanation' }),
      item({ canonicalSlug: 'same:kind:en:high', family: 'PROBE', familyKind: 'mcq' }),
    ])
    expect(v.ok).toBe(false)
    expect(v.discardedItems).toBe(1)
  })

  it('preserves writer iteration order inside a conflict — index 0 is the winner', () => {
    const v = validateSeedIdentities([
      item({ canonicalSlug: 'd:mcq:en:high', preview: 'would be KEPT' }),
      item({ canonicalSlug: 'd:mcq:en:high', preview: 'would be DISCARDED' }),
    ])
    expect(v.conflicts[0].items[0].preview).toBe('would be KEPT')
    expect(v.conflicts[0].items[1].preview).toBe('would be DISCARDED')
  })
})

describe('formatSeedIdentityReport — deterministic and actionable', () => {
  const colliding = [
    item({ canonicalSlug: 'zzz:mcq:en:high', preview: 'z-first' }),
    item({ canonicalSlug: 'zzz:mcq:en:high', preview: 'z-second' }),
    item({ canonicalSlug: 'aaa:mcq:en:high', preview: 'a-first', source: 'blueprints/aaa.md' }),
    item({ canonicalSlug: 'aaa:mcq:en:high', preview: 'a-second' }),
  ]

  it('is byte-identical across repeated runs', () => {
    const a = formatSeedIdentityReport(validateSeedIdentities(colliding))
    const b = formatSeedIdentityReport(validateSeedIdentities(colliding))
    expect(a).toBe(b)
  })

  it('orders conflicts by canonicalSlug regardless of input order', () => {
    const forward = formatSeedIdentityReport(validateSeedIdentities(colliding))
    const reversed = formatSeedIdentityReport(validateSeedIdentities([...colliding].reverse()))
    expect(forward.indexOf('aaa:mcq:en:high')).toBeLessThan(forward.indexOf('zzz:mcq:en:high'))
    // Same conflict set, same ordering — only within-group order differs.
    expect(reversed.indexOf('aaa:mcq:en:high')).toBeLessThan(reversed.indexOf('zzz:mcq:en:high'))
  })

  it('names every duplicate identity, every conflicting asset, and the total', () => {
    const r = formatSeedIdentityReport(validateSeedIdentities(colliding))
    expect(r).toContain('aaa:mcq:en:high')
    expect(r).toContain('zzz:mcq:en:high')
    for (const p of ['a-first', 'a-second', 'z-first', 'z-second']) expect(r).toContain(p)
    expect(r).toContain('KEPT')
    expect(r).toContain('DISCARDED')
    expect(r).toContain('blueprints/aaa.md')
    expect(r).toContain('2 duplicate identities')
    expect(r).toContain('2 assets would be discarded')
    expect(r).toContain('0 rows written')
  })

  it('bounds the listing when asked, and says how many were omitted', () => {
    const r = formatSeedIdentityReport(validateSeedIdentities(colliding), { maxConflicts: 1 })
    expect(r).toContain('aaa:mcq:en:high')
    expect(r).toContain('1 further duplicate identities not shown')
    // The totals stay complete even when the listing is truncated.
    expect(r).toContain('2 duplicate identities')
  })

  it('reports a pass compactly', () => {
    const r = formatSeedIdentityReport(validateSeedIdentities([item()]))
    expect(r).toContain('PASSED')
    expect(r).not.toContain('DISCARDED')
  })
})

describe('previewOf', () => {
  it('flattens whitespace and truncates long bodies', () => {
    expect(previewOf('  a\n\n  b   c ')).toBe('a b c')
    const long = previewOf('x'.repeat(500))
    expect(long.length).toBeLessThanOrEqual(89)
    expect(long.endsWith('…')).toBe(true)
  })
})

/**
 * The guarantee that matters: validation runs before the FIRST write in every
 * writer. Asserted against source order, because nothing else can prove it.
 */
describe('structural lock — validation precedes every database write', () => {
  const read = (p: string) => readFileSync(join(process.cwd(), p), 'utf8')
  /** Same idiom as aiProviderChainTruth.test.ts: assertions about live code
   *  must never be satisfied — or broken — by explanatory prose. */
  const stripComments = (src: string) =>
    src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^[ \t]*\/\/.*$/gm, '')

  const SCRIPTS = [
    'scripts/brain/seed-knowledge-assets.ts',
    'scripts/brain/seed-physics-assets.ts',
  ]

  it.each(SCRIPTS)('%s validates before its first assetIdentity.create', (path) => {
    const src = read(path)
    const validate = src.indexOf('validateSeedIdentities(')
    const firstWrite = src.indexOf('prisma.assetIdentity.create')
    expect(validate).toBeGreaterThan(-1)
    expect(firstWrite).toBeGreaterThan(-1)
    expect(validate).toBeLessThan(firstWrite)
  })

  it.each(SCRIPTS)('%s exits non-zero on a duplicate dataset', (path) => {
    const src = read(path)
    const validate = src.indexOf('if (!identityCheck.ok)')
    expect(validate).toBeGreaterThan(-1)
    const block = src.slice(validate, validate + 400)
    expect(block).toContain('formatSeedIdentityReport')
    expect(block).toContain('process.exit(1)')
  })

  it('instrumentation validates before updateMany AND before create', () => {
    const src = read('src/instrumentation.ts')
    const validate = src.indexOf('validateSeedIdentities(')
    const updateMany = src.indexOf('prisma.assetIdentity.updateMany')
    const create = src.indexOf('prisma.assetIdentity.create')
    expect(validate).toBeGreaterThan(-1)
    // updateMany is a write too — validating only before create would still
    // mutate rows on an invalid dataset.
    expect(validate).toBeLessThan(updateMany)
    expect(validate).toBeLessThan(create)
  })

  it('instrumentation aborts by returning, never by killing the server process', () => {
    // register() runs inside the Next.js server; killing the process here
    // would turn a data-quality fault into an application outage. Asserted
    // against CODE ONLY — the surrounding comment names the hazard by hand.
    const src = read('src/instrumentation.ts')
    expect(stripComments(src)).not.toMatch(/process\s*\.\s*exit/)
    const guard = src.indexOf('if (!identityCheck.ok)')
    expect(guard).toBeGreaterThan(-1)
    expect(src.slice(guard, guard + 700)).toContain('return')
  })

  it('no writer silently skips duplicates any more — the dedup remains, the silence does not', () => {
    // The per-item findFirst/continue is still correct RE-RUN idempotency and
    // is intentionally retained. What changed is that a colliding dataset can
    // no longer reach it.
    for (const path of [...SCRIPTS, 'src/instrumentation.ts']) {
      const src = read(path)
      expect(src).toContain('canonicalSlug')
      expect(src.indexOf('validateSeedIdentities(')).toBeGreaterThan(-1)
    }
  })
})
