/**
 * Remediation Item 4 — the cold-start bootstrap's completeness guard must
 * compare like-for-like quantities.
 *
 * The guard decides whether seeding can be skipped. It previously compared
 *
 *     ALL_EXPLANATIONS.length + ALL_PROBES.length      authored ITEMS
 *   against
 *     count(seed-owned rows)                            stored IDENTITIES
 *
 * Different units. The seeding loops insert at most one row per
 * canonicalSlug, so the stored side is bounded by the number of DISTINCT
 * identities in the dataset. Any dataset carrying more items than distinct
 * identities therefore set a target the guard could never reach, and every
 * cold start re-ran the full per-item loop forever.
 *
 * Both sides are now distinct canonical identities. These tests pin the
 * arithmetic as a property of the validator (no database required) and lock
 * the source so the units cannot silently regress.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  validateSeedIdentities, type SeedIdentityInput,
} from '@/lib/teaching/assets/seedIdentityValidation'

function item(slug: string): SeedIdentityInput {
  return {
    canonicalSlug: slug,
    family: 'PROBE',
    conceptId: 'c',
    subjectSlug: 'physics',
    familyKind: 'mcq',
    gradeBand: 'HIGH',
    preview: slug,
  }
}

/** Rows the seeding loops can create: one per distinct canonicalSlug. */
const maxCreatableRows = (items: SeedIdentityInput[]) =>
  new Set(items.map((i) => i.canonicalSlug)).size

describe('completeness guard arithmetic', () => {
  it('OLD units were unreachable whenever a dataset carried duplicates', () => {
    // Reproduces the defect as a property, without naming a corpus size.
    const colliding = [item('a'), item('a'), item('b')]
    const oldTarget = colliding.length // items
    const ceiling = maxCreatableRows(colliding) // rows the loops can create
    expect(ceiling).toBeLessThan(oldTarget)
    // => `stored >= oldTarget` can never become true. That is the bug.
  })

  it('NEW units are reachable for the same dataset', () => {
    const colliding = [item('a'), item('a'), item('b')]
    const newTarget = validateSeedIdentities(colliding).distinctIdentities
    expect(newTarget).toBe(maxCreatableRows(colliding))
    // => once every identity is stored, `stored >= newTarget` holds exactly.
  })

  it('on a validated dataset the target equals the item count — no behaviour change', () => {
    // Step 0 admits only duplicate-free datasets, where distinct === items.
    // So for everything that actually reaches the guard, the new target is
    // numerically identical to the old one: this fix corrects the UNITS and
    // removes a latent trap, it does not alter seeding of valid input.
    const clean = [item('a'), item('b'), item('c')]
    const v = validateSeedIdentities(clean)
    expect(v.ok).toBe(true)
    expect(v.distinctIdentities).toBe(v.totalItems)
    expect(v.distinctIdentities).toBe(maxCreatableRows(clean))
  })

  it('the target is exactly the rows the loops will create, for any input', () => {
    for (const set of [
      [],
      [item('a')],
      [item('a'), item('b')],
      [item('a'), item('a')],
      [item('a'), item('a'), item('a'), item('b')],
    ]) {
      expect(validateSeedIdentities(set).distinctIdentities).toBe(maxCreatableRows(set))
    }
  })
})

describe('structural lock — bootstrap guard source', () => {
  const src = readFileSync(join(process.cwd(), 'src/instrumentation.ts'), 'utf8')
  const stripComments = (s: string) =>
    s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^[ \t]*\/\/.*$/gm, '')
  const code = stripComments(src)

  it('compares distinct identities on BOTH sides', () => {
    expect(code).toContain('identityCheck.distinctIdentities')
    expect(code).toMatch(/groupBy\(\{\s*by:\s*\['canonicalSlug'\]/)
  })

  it('no longer sums array lengths as the completeness target', () => {
    expect(code).not.toContain('EXPECTED_TOTAL')
    expect(code).not.toMatch(/ALL_EXPLANATIONS\.length\s*\+\s*ALL_PROBES\.length/)
  })

  it('counts distinct slugs, not rows, on the stored side', () => {
    // A row count equals the identity count only because a partial unique
    // index covers authorId = SEED_AUTHOR_ID. Counting distinct slugs states
    // the invariant directly instead of depending on that index.
    //
    // NARROWED 2026-08-12, deliberately, and the reason matters. This
    // previously banned `assetIdentity.count(` outright. That was a proxy for
    // the real invariant — "the COMPLETENESS measure is a distinct-slug count"
    // — and the proxy became wrong when a SECOND, unrelated count was added:
    // the hollow-identity check (identities whose content row is missing),
    // which is a row count by nature and is not a completeness measure at all.
    //
    // Banning the whole method would have forced the hollow check to be
    // written worse, or the repair to be dropped — so the assertion is
    // sharpened to say what it always meant, rather than relaxed.
    const storedAssignment = code.match(/const storedIdentities\s*=\s*\([\s\S]{0,240}?\)\.length/)
    expect(storedAssignment, 'storedIdentities must be a distinct-slug groupBy length').not.toBeNull()
    expect(storedAssignment![0]).toMatch(/groupBy\(\{\s*by:\s*\['canonicalSlug'\]/)
    expect(storedAssignment![0]).not.toMatch(/\.count\(/)

    // Any count() that IS present must be the hollow-identity check, never a
    // second completeness measure that could disagree with the first.
    for (const m of code.matchAll(/assetIdentity\.count\(/g)) {
      const preceding = code.slice(Math.max(0, m.index! - 220), m.index!)
      expect(preceding, 'the only permitted assetIdentity.count is the hollow-identity check')
        .toMatch(/hollowIdentities/)
    }
  })

  it('duplicate validation still runs before the guard and before every write', () => {
    const validate = code.indexOf('validateSeedIdentities(')
    expect(validate).toBeGreaterThan(-1)
    for (const write of ['updateMany', 'groupBy', 'create']) {
      const at = code.indexOf(`prisma.assetIdentity.${write}`)
      expect(at, `guard/write ${write} must follow validation`).toBeGreaterThan(validate)
    }
  })
})
