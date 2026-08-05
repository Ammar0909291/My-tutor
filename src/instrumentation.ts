/**
 * Next.js instrumentation hook — runs once per server process start.
 *
 * Responsible for: automatic Knowledge Asset bootstrap.
 *
 * On every cold start (local dev and Vercel), if the AssetIdentity table
 * has fewer rows than the expected seed total, the authored seed assets
 * (brainSeedAssets + authoredSeedAssets) are inserted as ACTIVE rows so
 * assembleLesson() starts serving authored content immediately — without
 * requiring manual `npm run seed:brain-assets`.
 *
 * REQUIRES `experimental.instrumentationHook: true` in next.config.js on
 * Next.js 14 — without it Next never calls register() and this entire module
 * is dead code in production (see the comment on that flag).
 *
 * Design:
 *  - Fast path: a single COUNT query checked against the expected total.
 *    If rows ≥ expected, exits in < 5 ms. Both the COUNT and the status
 *    convergence below are scoped by seedOwnershipWhere() so the shared
 *    AssetIdentity table's other writers can neither satisfy nor be damaged
 *    by this bootstrap.
 *  - State-convergent, not merely presence-convergent: seed-owned rows left
 *    DRAFT by `seed-knowledge-assets.ts --draft` are promoted to ACTIVE, since
 *    the per-slug dedup below would otherwise skip them forever and they could
 *    never reach the state the serving path requires.
 *  - Partial-seed safe: COUNT < expected triggers a resume run; per-slug
 *    dedup skips already-inserted rows and inserts the missing ones.
 *  - Concurrency safe: the findFirst/create pair below is a TOCTOU window, so
 *    atomicity is enforced in the database by the PARTIAL unique index
 *    asset_identity_seed_slug_key ON ("canonicalSlug")
 *    WHERE "authorId" = 'EDUCATIONAL_BRAIN_SEED'
 *    (prisma/migrations/20260804000000_asset_identity_seed_slug_unique).
 *    A losing racer gets P2002, which is caught per-asset and treated as a
 *    skip, so simultaneous cold starts converge on one complete catalogue
 *    without duplicating rows or aborting each other. The index is scoped to
 *    the seed lineage so the capture path's many-versions-per-slug chain is
 *    unaffected. NOTE: before that migration this claim was false — no unique
 *    constraint existed, so P2002 could never fire and this catch was dead.
 *  - Never blocks request handling — runs in the background after the
 *    server is ready (Next.js calls register() before the first request).
 *  - Opt-out: set DISABLE_ASSET_BOOTSTRAP=true to skip entirely, or
 *    DISABLE_SEED_ACTIVATION=true to keep seeding but leave status alone
 *    (for owners who seeded with --draft to use the admin approval flow).
 */
export async function register() {
  // Only run in the Node.js runtime, not in Edge functions.
  if (process.env.NEXT_RUNTIME !== 'nodejs') return
  if (process.env.DISABLE_ASSET_BOOTSTRAP === 'true') return

  // Kick off in the background — don't await so cold-start latency is
  // unaffected even if the DB is momentarily slow.
  bootstrapAssets().catch((err) =>
    console.error('[instrumentation] asset bootstrap failed (non-fatal):', err?.message ?? err)
  )
}

async function bootstrapAssets() {
  try {
    const { PrismaClient } = await import('@prisma/client')
    const { withPoolParams } = await import('./lib/db/poolConfig')
    // P5 (2026-07-26): this bootstrap ran its own unpooled PrismaClient on
    // every cold start (default connection_limit = CPU count, pool_timeout
    // = 10s), bypassing the P0 pool-sizing fix (poolConfig.ts /
    // connection_limit=15, pool_timeout=20) that src/lib/db/prisma.ts's
    // singleton already applies. That opened an extra unpooled connection
    // at exactly the moment (cold start) request traffic is also spiking —
    // worsening the "Timed out fetching a new connection from the
    // connection pool" errors seen in production. Applying the same pool
    // params here closes that gap without changing any bootstrap behavior.
    const prisma = new PrismaClient({
      ...(withPoolParams(process.env.DATABASE_URL) ? { datasources: { db: { url: withPoolParams(process.env.DATABASE_URL) } } } : {}),
    })

    try {
      // Load seed arrays first so we know the expected total before querying.
      const { SEED_EXPLANATIONS, SEED_PROBES, SEED_LANGUAGE, SEED_AUTHOR_ID, seedCanonicalSlug,
        buildProbeSlugResolver, seedOwnershipWhere } =
        await import('./lib/teaching/assets/brainSeedAssets')
      const { AUTHORED_EXPLANATIONS, AUTHORED_PROBES } =
        await import('./lib/teaching/assets/authoredSeedAssets')
      const { hashContent } = await import('./lib/teaching/assets/similarity')
      const { AssetFamily, AssetStatus, AuthorKind, ExplanationStyle } = await import('@prisma/client')

      const ALL_EXPLANATIONS = [...SEED_EXPLANATIONS, ...AUTHORED_EXPLANATIONS]
      const ALL_PROBES = [...SEED_PROBES, ...AUTHORED_PROBES]
      // ADR 14 §13 (Item 6): ladder rungs get a difficulty segment; singleton
      // slots keep the identity they already have. One resolver drives BOTH
      // the pre-flight check and the write loop so they cannot disagree.
      const probeSlug = buildProbeSlugResolver(ALL_PROBES)

      // ── Step 0: pre-flight duplicate-identity check ────────────────────────
      //
      // Remediation Item 3. Must run before Step 1, not merely before the
      // create loops: Step 1's updateMany is itself a database write, and the
      // contract is that an invalid dataset produces ZERO writes of any kind.
      //
      // Deliberately NOT process.exit() here, unlike the standalone scripts.
      // This module runs inside the Next.js server process via register(); a
      // process.exit would take the whole application down on boot. Refusing
      // to seed and returning is the equivalent outcome for a server hook —
      // no rows written — without turning a data-quality fault into an outage.
      // bootstrapAssets() is already fire-and-forget, so returning here is
      // non-fatal by construction.
      //
      // The report is bounded here (it would otherwise repeat in full on every
      // cold start); the seed scripts print the complete, unbounded list.
      const { validateSeedIdentities, formatSeedIdentityReport, previewOf } =
        await import('./lib/teaching/assets/seedIdentityValidation')
      const identityCheck = validateSeedIdentities([
        ...ALL_EXPLANATIONS.map((e) => ({
          canonicalSlug: seedCanonicalSlug(e.conceptId, e.familyKind, e.gradeBand),
          family: 'EXPLANATION' as const,
          conceptId: e.conceptId,
          subjectSlug: e.subjectSlug,
          familyKind: e.familyKind,
          gradeBand: String(e.gradeBand),
          preview: previewOf(e.content),
          source: e.source,
        })),
        ...ALL_PROBES.map((p) => ({
          canonicalSlug: probeSlug(p),
          family: 'PROBE' as const,
          conceptId: p.conceptId,
          subjectSlug: p.subjectSlug,
          familyKind: p.probeKind,
          gradeBand: String(p.gradeBand),
          preview: previewOf(p.stem),
          source: p.source,
        })),
      ])
      if (!identityCheck.ok) {
        console.error(
          formatSeedIdentityReport(identityCheck, {
            writer: 'instrumentation asset bootstrap',
            maxConflicts: 10,
          }),
        )
        console.error(
          '[instrumentation] asset bootstrap ABORTED before any write — ' +
            'duplicate canonical identities in the seed dataset. No rows created, ' +
            'no statuses converged. Existing rows are untouched and continue to serve.',
        )
        return
      }

      // ── Step 1: converge status on rows this bootstrap already owns ────────
      //
      // Presence is not the same as being served. `create` below writes ACTIVE
      // (this module's contract: seeded assets serve immediately), but the
      // manual script `scripts/brain/seed-knowledge-assets.ts --draft` writes
      // the SAME canonicalSlugs as DRAFT. The per-asset dedup below matches on
      // canonicalSlug alone, so once a DRAFT row exists for a slug the loop
      // skips it forever and the asset can never reach the ACTIVE state
      // findBestExplanation/findBestProbe require — authored content present
      // in the table but permanently unreachable.
      //
      // Converging here makes the bootstrap idempotent on STATE, not merely on
      // presence, which is the whole bug class. Scoped by seedOwnershipWhere()
      // so it can only ever touch rows this bootstrap itself would have
      // written: AI_AUTHORED capture rows keep their admin review gate, other
      // curators are untouched, and script-only subjects (chemistry/biology/
      // computer_science) are out of scope.
      //
      // Opt-out mirrors DISABLE_ASSET_BOOTSTRAP above, for owners who seeded
      // with --draft precisely so they could use the admin approval flow.
      if (process.env.DISABLE_SEED_ACTIVATION !== 'true') {
        const converged = await prisma.assetIdentity.updateMany({
          where: { ...seedOwnershipWhere(), status: AssetStatus.DRAFT } as never,
          data: { status: AssetStatus.ACTIVE },
        })
        if (converged.count > 0) {
          console.log(`[instrumentation] asset bootstrap: activated ${converged.count} seed-owned DRAFT rows`)
        }
      }

      // ── Step 2: completeness guard, scoped to rows this bootstrap owns ─────
      //
      // A bare count() measured the SHARED table, including the unbounded
      // AI_AUTHORED rows the capture path appends after LLM generations. That
      // measured traffic volume, not seed completeness: once captured drafts
      // alone reached the target, every later cold start concluded the
      // catalogue was complete and the authored assets were never inserted.
      // seedOwnershipWhere() fixes that half by scoping to rows this bootstrap
      // owns.
      //
      // The other half is UNITS (Remediation Item 4). This compared
      //     ALL_EXPLANATIONS.length + ALL_PROBES.length   — authored ITEMS
      // against
      //     count(seed-owned rows)                        — stored IDENTITIES
      // which are different quantities. The loops below insert at most one row
      // per canonicalSlug, so the row count can never exceed the number of
      // DISTINCT identities in the dataset. Whenever the dataset carried more
      // items than distinct identities the target was unreachable by
      // construction, the guard could never fire, and every cold start re-ran
      // the full per-item loop forever.
      //
      // Both sides are now distinct canonical identities:
      //   expected — identityCheck.distinctIdentities, the exact set Step 0
      //     just validated and the loops below will attempt to create. Reusing
      //     it keeps one source of truth rather than a second derivation that
      //     could drift.
      //   stored   — a DISTINCT canonicalSlug count, not a row count. Rows and
      //     identities coincide today only because a partial unique index
      //     covers authorId = SEED_AUTHOR_ID; counting distinct slugs states
      //     the invariant directly instead of depending on that index.
      const EXPECTED_IDENTITIES = identityCheck.distinctIdentities
      const storedIdentities = (
        await prisma.assetIdentity.groupBy({
          by: ['canonicalSlug'],
          where: seedOwnershipWhere() as never,
        })
      ).length
      if (storedIdentities >= EXPECTED_IDENTITIES) {
        console.log(
          `[instrumentation] asset bootstrap: ${storedIdentities}/${EXPECTED_IDENTITIES} seed identities present — skipping`
        )
        return
      }

      console.log(
        `[instrumentation] asset bootstrap: ${storedIdentities}/${EXPECTED_IDENTITIES} seed identities present — seeding missing assets...`
      )

      let created = 0
      let skipped = 0

      for (const e of ALL_EXPLANATIONS) {
        const canonicalSlug = seedCanonicalSlug(e.conceptId, e.familyKind, e.gradeBand)
        const dup = await prisma.assetIdentity.findFirst({ where: { canonicalSlug } })
        if (dup) { skipped++; continue }
        try {
          await prisma.assetIdentity.create({
            data: {
              family: AssetFamily.EXPLANATION,
              familyKind: e.familyKind,
              conceptId: e.conceptId,
              language: SEED_LANGUAGE,
              gradeBand: e.gradeBand,
              authorId: SEED_AUTHOR_ID,
              authorKind: AuthorKind.HUMAN_CURATOR,
              status: AssetStatus.ACTIVE,
              version: 1,
              canonicalSlug,
              contentHash: hashContent(e.content),
              tags: [e.subjectSlug, e.familyKind],
              intellectualProperty: 'proprietary',
              curriculumMappings: [],
              incompatibilities: [],
              prerequisites: [],
              explanationAsset: {
                create: {
                  content: e.content,
                  style: ExplanationStyle.CONCRETE,
                  readingLevel: 0,
                  lengthChars: e.content.length,
                  targetedMisconceptions: e.targetedMisconceptions,
                },
              },
            },
          })
          created++
        } catch (createErr: any) {
          // P2002 = concurrent cold start already inserted this slug — safe to skip.
          if (createErr?.code === 'P2002') { skipped++; continue }
          throw createErr
        }
      }

      for (const p of ALL_PROBES) {
        const canonicalSlug = probeSlug(p)
        const dup = await prisma.assetIdentity.findFirst({ where: { canonicalSlug } })
        if (dup) { skipped++; continue }
        try {
          await prisma.assetIdentity.create({
            data: {
              family: AssetFamily.PROBE,
              familyKind: p.probeKind,
              conceptId: p.conceptId,
              language: SEED_LANGUAGE,
              gradeBand: p.gradeBand,
              authorId: SEED_AUTHOR_ID,
              authorKind: AuthorKind.HUMAN_CURATOR,
              status: AssetStatus.ACTIVE,
              version: 1,
              canonicalSlug,
              contentHash: hashContent(p.stem),
              tags: [p.subjectSlug, p.probeKind],
              intellectualProperty: 'proprietary',
              curriculumMappings: [],
              incompatibilities: [],
              prerequisites: [],
              probeAsset: {
                create: {
                  stem: p.stem,
                  choices: p.choices ? (p.choices as unknown as object) : undefined,
                  correctValue: p.correctValue,
                  keywords: [],
                  difficulty: p.difficulty,
                  targetedMisconceptions: p.targetedMisconceptions,
                  requiredVisuals: [],
                },
              },
            },
          })
          created++
        } catch (createErr: any) {
          if (createErr?.code === 'P2002') { skipped++; continue }
          throw createErr
        }
      }

      console.log(
        `[instrumentation] asset bootstrap complete: created=${created} skipped=${skipped} total=${EXPECTED_IDENTITIES}`
      )
    } finally {
      await prisma.$disconnect()
    }
  } catch (err: any) {
    // DB not reachable yet (e.g., slow cold start) — non-fatal; the next cold
    // start will retry. assembleLesson() degrades to Groq in the interim.
    console.warn('[instrumentation] asset bootstrap DB error (will retry on next start):', err?.message)
  }
}
