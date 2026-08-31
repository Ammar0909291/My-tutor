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
    // The stored side is a set of canonical slugs, not a row count. It stopped
    // being a groupBy on 2026-08-19 (see the next test) — the prefetch already
    // reads every seed-owned slug, so the guard intersects that instead of
    // asking the database a question it has already answered.
    expect(code).toMatch(/const expectedSlugs = new Set<string>\(\[/)
    expect(code).toMatch(/for \(const slug of expectedSlugs\) \{/)
  })

  it('no longer sums array lengths as the completeness target', () => {
    expect(code).not.toContain('EXPECTED_TOTAL')
    expect(code).not.toMatch(/ALL_EXPLANATIONS\.length\s*\+\s*ALL_PROBES\.length/)
  })

  it('the stored side counts identities OF THIS CORPUS, not rows in the table', () => {
    // A row count equals the identity count only because a partial unique
    // index covers authorId = SEED_AUTHOR_ID. Counting distinct slugs states
    // the invariant directly instead of depending on that index.
    //
    // REPLACED 2026-08-12's groupBy on 2026-08-19, and the reason is a real
    // defect, not a refactor. The groupBy counted EVERY seed-owned row sharing
    // the subject tags — including rows written by
    // scripts/brain/seed-knowledge-assets.ts, whose corpus contains files this
    // hook does not import. Measured when chemistry was added: expected 4,144,
    // table held 4,219. The guard was already satisfied while 314 chemistry
    // probes were missing, and only the hollow-row repair kept the run alive;
    // once that finished the bootstrap would have skipped forever with the
    // corpus incomplete — the same never-converges failure this file exists to
    // prevent, arrived at from the opposite direction.
    //
    // The measure is now the intersection of the prefetch with the slugs this
    // corpus declares, so foreign seed rows cannot report it done, and the
    // guard and the create loops read the same source of truth.
    const storedAssignment = code.match(/let storedIdentities = 0[\s\S]{0,400}?\n\s*\}/)
    expect(storedAssignment, 'storedIdentities must be derived from expectedSlugs').not.toBeNull()
    expect(storedAssignment![0]).toMatch(/for \(const slug of expectedSlugs\)/)
    expect(storedAssignment![0]).toMatch(/existing\.get\(slug\)/)
    expect(storedAssignment![0]).not.toMatch(/\.count\(/)

    // The guard must not reintroduce an aggregate over the whole table — that
    // is precisely the measure that could disagree with the loops.
    expect(code).not.toMatch(/assetIdentity\.groupBy\(/)

    // NARROWED 2026-08-31, deliberately, and the reason is recorded rather
    // than the assertion deleted.
    //
    // This line used to ban `assetIdentity.count(` outright. That was a proxy
    // for the real invariant — "never measure completeness with an aggregate
    // over the WHOLE TABLE" — and as a proxy it was too broad: it also banned
    // an aggregate INTERSECTED with the slugs this corpus declares, which
    // cannot exhibit the defect, because a foreign seed row is not in
    // expectedSlugList and therefore cannot be counted by it.
    //
    // A cheap counting probe was added during a live egress incident (the org
    // was at 50.8 GB against a 5 GB quota). The full prefetch was reading
    // ~22 million rows across the fleet to answer a yes/no question whose
    // answer had been "nothing to do" every time for 21 hours. Two COUNTs
    // answer it with two rows.
    //
    // So the ban becomes the invariant it was standing in for: EVERY
    // assetIdentity.count() in this file must be scoped to this corpus.
    const counts = [...code.matchAll(/prisma\.assetIdentity\.count\(\{[\s\S]{0,400}?\}\)/g)].map((m) => m[0])
    for (const c of counts) {
      expect(c, 'an assetIdentity.count() must intersect the corpus slugs, never the whole table')
        .toMatch(/canonicalSlug: \{ in: expectedSlugList \}/)
    }

    // And the cheap probe may only SKIP on the same condition the full guard
    // uses. If those two ever diverge, one of them is wrong by construction.
    if (counts.length > 0) {
      expect(code).toMatch(/storedCount >= expectedSlugs\.size && hollowCount === 0/)
      expect(code).toMatch(/storedIdentities >= EXPECTED_IDENTITIES && hollowIdentities === 0/)
    }
  })

  it('duplicate validation still runs before the guard and before every write', () => {
    const validate = code.indexOf('validateSeedIdentities(')
    expect(validate).toBeGreaterThan(-1)
    for (const write of ['updateMany', 'findMany', 'create']) {
      const at = code.indexOf(`prisma.assetIdentity.${write}`)
      expect(at, `guard/write ${write} must follow validation`).toBeGreaterThan(validate)
    }
  })
})
