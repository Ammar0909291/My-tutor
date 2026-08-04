/**
 * P20 — Production AssetIdentity Activation.
 *
 * Locks in the two defects that together made 495/495 authored physics
 * explanations present in production yet unreachable by the serving path:
 *
 *   D1 (root cause) — src/instrumentation.ts had never executed in
 *      production. On Next.js 14 the instrumentation hook is opt-in
 *      (config-shared.js defaults it to false); without
 *      `experimental.instrumentationHook: true` the file is excluded from the
 *      build (build/index.js) and register() is never called
 *      (next-server.js). The module compiled, type-checked and unit-tested
 *      cleanly while being dead code in every deployment.
 *
 *   D2 (why enabling alone is insufficient) — the bootstrap's per-asset dedup
 *      matches on canonicalSlug ONLY. Rows written as DRAFT by
 *      `seed-knowledge-assets.ts --draft` occupy those slugs, so the loop
 *      skipped them forever and they could never reach the ACTIVE state
 *      findBestExplanation/findBestProbe require.
 *
 * No DB — matching this suite's DB-independent convention. The ownership
 * predicate is tested by evaluating its Prisma `where` semantics against rows
 * shaped exactly like the ones verified in production.
 */
import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import { createRequire } from 'module'
import { seedOwnershipWhere, BOOTSTRAP_SEED_SUBJECTS, SEED_AUTHOR_ID } from '@/lib/teaching/assets/brainSeedAssets'

// ── D1: the root cause must stay fixed ───────────────────────────────────────

describe('P20 D1 — the instrumentation hook is enabled', () => {
  // next.config.js is CommonJS and lives outside the TS rootDir, so it is
  // loaded through createRequire rather than an import.
  const nextConfig: { experimental?: { instrumentationHook?: boolean } } =
    createRequire(import.meta.url)('../../next.config.js')

  it('next.config.js enables experimental.instrumentationHook', () => {
    // THE regression guard for this whole class. If this is ever removed or
    // flipped, src/instrumentation.ts silently stops running in production
    // again — no error, no log, no failing build. Everything else in this
    // file would still pass while production served zero authored assets.
    expect(nextConfig.experimental?.instrumentationHook).toBe(true)
  })

  it('src/instrumentation.ts still exports register() for Next to call', () => {
    // The flag is only half the contract: Next calls a named `register`
    // export. Renaming it would be as silent a failure as disabling the flag.
    const src = fs.readFileSync(path.join(process.cwd(), 'src/instrumentation.ts'), 'utf8')
    expect(src).toMatch(/export\s+async\s+function\s+register\s*\(/)
  })
})

// ── D2: ownership predicate ──────────────────────────────────────────────────

/**
 * Evaluates the subset of Prisma `where` semantics seedOwnershipWhere() uses
 * (scalar equality + `tags.hasSome`) against a plain row. Keeps the test
 * honest about what the predicate will actually match server-side without
 * requiring a database.
 */
function matches(where: ReturnType<typeof seedOwnershipWhere>, row: {
  authorKind: string; authorId: string; tags: string[]
}): boolean {
  if (row.authorKind !== where.authorKind) return false
  if (row.authorId !== where.authorId) return false
  return where.tags.hasSome.some((t) => row.tags.includes(t))
}

// Rows shaped exactly as verified in the production table.
const PHYSICS_SEED = { authorKind: 'HUMAN_CURATOR', authorId: SEED_AUTHOR_ID, tags: ['physics', 'core_explanation'] }
const PHYSICS_PROBE_SEED = { authorKind: 'HUMAN_CURATOR', authorId: SEED_AUTHOR_ID, tags: ['physics', 'checkpoint'] }
const MATH_SEED = { authorKind: 'HUMAN_CURATOR', authorId: SEED_AUTHOR_ID, tags: ['mathematics', 'core_explanation'] }
const CHEM_SEED = { authorKind: 'HUMAN_CURATOR', authorId: SEED_AUTHOR_ID, tags: ['chemistry', 'core_explanation'] }
const AI_CAPTURE = { authorKind: 'AI_AUTHORED', authorId: 'llm', tags: ['physics', 'core_explanation'] }
const OTHER_CURATOR = { authorKind: 'HUMAN_CURATOR', authorId: 'SOME_OTHER_CURATOR', tags: ['physics', 'core_explanation'] }

describe('P20 D2 — seedOwnershipWhere selects exactly the bootstrap corpus', () => {
  const where = seedOwnershipWhere()

  it('matches the physics explanation rows that were stuck DRAFT', () => {
    expect(matches(where, PHYSICS_SEED)).toBe(true)
  })

  it('matches physics probe rows (probeKind tag, not familyKind)', () => {
    // Probes are tagged [subjectSlug, probeKind] — 'checkpoint' here. The
    // predicate must key on the SUBJECT tag, not assume an explanation kind.
    expect(matches(where, PHYSICS_PROBE_SEED)).toBe(true)
  })

  it('matches mathematics seed rows', () => {
    expect(matches(where, MATH_SEED)).toBe(true)
  })

  it('NEGATIVE CONTROL: never matches an AI_AUTHORED capture row', () => {
    // The single most important exclusion. AI_AUTHORED rows are governed by
    // the admin review flow (reviewExplanationAsset). If the bootstrap could
    // reach them it would auto-approve unreviewed LLM output into the serving
    // path — silently converting a review gate into a no-op.
    expect(matches(where, AI_CAPTURE)).toBe(false)
  })

  it('NEGATIVE CONTROL: never matches another curator’s rows', () => {
    expect(matches(where, OTHER_CURATOR)).toBe(false)
  })

  it('NEGATIVE CONTROL: never matches chemistry (manual-script-only subject)', () => {
    // Chemistry shares authorKind AND authorId with the bootstrap corpus —
    // the subject tag is the only thing separating them, which is exactly why
    // it is part of the predicate.
    expect(matches(where, CHEM_SEED)).toBe(false)
  })

  it('scopes to exactly the three subjects the bootstrap seeds', () => {
    expect([...BOOTSTRAP_SEED_SUBJECTS].sort()).toEqual(['english', 'mathematics', 'physics'])
    expect(where.tags.hasSome.sort()).toEqual(['english', 'mathematics', 'physics'])
  })

  it('a subject tag can never be satisfied by a familyKind value', () => {
    // Rows are tagged [subjectSlug, familyKind]. If any familyKind ever
    // collided with a subject slug, the predicate would match foreign rows.
    const familyKinds = ['core_explanation', 'checkpoint', 'worked_example', 'misconception_probe']
    for (const k of familyKinds) {
      expect(BOOTSTRAP_SEED_SUBJECTS as readonly string[]).not.toContain(k)
    }
  })
})

// ── D2: the bootstrap must use the predicate, not a bare count ───────────────

describe('P20 D2 — instrumentation.ts uses ownership-scoped queries', () => {
  const src = fs.readFileSync(path.join(process.cwd(), 'src/instrumentation.ts'), 'utf8')

  it('the completeness guard is scoped, never a bare count()', () => {
    // A bare count() measures the shared table — including the unbounded
    // AI_AUTHORED capture rows — so it reports traffic volume, not seed
    // completeness, and eventually suppresses seeding permanently.
    expect(src).not.toMatch(/assetIdentity\.count\(\s*\)/)
    expect(src).toMatch(/assetIdentity\.count\(\s*\{\s*where:\s*seedOwnershipWhere\(\)/)
  })

  it('converges seed-owned DRAFT rows to ACTIVE', () => {
    expect(src).toMatch(/updateMany/)
    expect(src).toMatch(/seedOwnershipWhere\(\),\s*status:\s*AssetStatus\.DRAFT/)
  })

  it('NEGATIVE CONTROL: convergence is scoped — no unscoped status updateMany', () => {
    // Guards against the fix degrading into "activate every DRAFT row", which
    // would swallow the AI_AUTHORED review gate along with it.
    const updateManyCalls = src.match(/updateMany\(\{[\s\S]*?\}\)/g) ?? []
    expect(updateManyCalls.length).toBeGreaterThan(0)
    for (const call of updateManyCalls) {
      expect(call).toMatch(/seedOwnershipWhere\(\)/)
    }
  })

  it('activation is opt-out-able without disabling seeding entirely', () => {
    expect(src).toMatch(/DISABLE_SEED_ACTIVATION/)
    expect(src).toMatch(/DISABLE_ASSET_BOOTSTRAP/)
  })
})
