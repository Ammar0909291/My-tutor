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
 *  - One prefetch, not a query per asset: a single indexed read of the seed
 *    lineage answers "does this slug exist, and does it have content" for all
 *    ~2,920 assets at once. The previous per-asset findFirst meant 2,920
 *    sequential round trips, and one socket timeout anywhere in them threw out
 *    of the entire run — measured in production as "2379/2920 seed identities
 *    present" logged for weeks with "complete" never once logged.
 *  - Self-healing: an identity whose CONTENT row is missing gets the child
 *    created rather than being skipped forever. 737 probe and 255 explanation
 *    identities were found ACTIVE-but-hollow, which is what starved the
 *    mastery gate of gradeable probes (E6).
 *  - Per-asset failures are non-fatal and counted, so a flaky database
 *    converges across cold starts instead of restarting from zero each time.
 *  - Concurrency safe: the check/create pair below is a TOCTOU window, so
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
      // NON-FATAL, and this is load-bearing on a flapping pooler. Measured in
      // production 2026-08-12: this updateMany is the FIRST database call the
      // bootstrap makes, and it was failing with
      //   "Can't reach database server at ...pooler.supabase.com:6543"
      // and with P1008 socket timeouts. Because it threw, the run aborted
      // before the seeding and repair steps below were ever reached — so the
      // catalogue could not converge even during the windows when the pooler
      // was healthy again moments later.
      //
      // Status convergence is a nice-to-have (it promotes DRAFT rows a manual
      // --draft seed left behind). Seeding and repairing the catalogue is the
      // point. A failure in the former must not cancel the latter.
      if (process.env.DISABLE_SEED_ACTIVATION !== 'true') {
        try {
          const converged = await prisma.assetIdentity.updateMany({
            where: { ...seedOwnershipWhere(), status: AssetStatus.DRAFT } as never,
            data: { status: AssetStatus.ACTIVE },
          })
          if (converged.count > 0) {
            console.log(`[instrumentation] asset bootstrap: activated ${converged.count} seed-owned DRAFT rows`)
          }
        } catch (convergeErr: any) {
          console.warn(
            '[instrumentation] asset bootstrap: status convergence failed, continuing to seeding:',
            convergeErr?.message ?? convergeErr,
          )
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
      // An identity COUNT is not a completeness check. 737 PROBE and 255
      // EXPLANATION identities were found ACTIVE in production with no content
      // row behind them, so a database can reach the expected identity count
      // and still serve nothing — which is exactly the state that produced E6.
      // Counting hollow identities here is what lets the repair below run at
      // all: without it, the moment storedIdentities reaches EXPECTED the
      // bootstrap returns early and the orphans are unreachable forever.
      //
      // Two indexed COUNTs on a cold start, and only when the identity count
      // already looks complete — so the common healthy path pays for them once
      // and then skips, exactly as before.
      const hollowIdentities = storedIdentities >= EXPECTED_IDENTITIES
        ? (await prisma.assetIdentity.count({
            where: {
              ...(seedOwnershipWhere() as object),
              OR: [
                { family: AssetFamily.PROBE, probeAsset: { is: null } },
                { family: AssetFamily.EXPLANATION, explanationAsset: { is: null } },
              ],
            } as never,
          }))
        : 0

      if (storedIdentities >= EXPECTED_IDENTITIES && hollowIdentities === 0) {
        console.log(
          `[instrumentation] asset bootstrap: ${storedIdentities}/${EXPECTED_IDENTITIES} seed identities present, 0 hollow — skipping`
        )
        return
      }
      if (hollowIdentities > 0) {
        console.warn(
          `[instrumentation] asset bootstrap: ${hollowIdentities} ACTIVE seed identities have NO content row — repairing`
        )
      }

      console.log(
        `[instrumentation] asset bootstrap: ${storedIdentities}/${EXPECTED_IDENTITIES} seed identities present — seeding missing assets...`
      )

      // ── ONE QUERY INSTEAD OF 2,920 ────────────────────────────────────────
      //
      // MEASURED IN PRODUCTION (2026-08-12). The bootstrap logged
      // "2379/2920 seed identities present — seeding missing assets…" on every
      // single request for WEEKS and never once logged "complete". The reason
      // is in the logs beside it:
      //
      //   asset bootstrap DB error (will retry on next start):
      //     Invalid `prisma.assetIdentity.findFirst()` invocation: Socket timeout
      //
      // The loops below did ONE findFirst PER ASSET — 2,920 sequential round
      // trips against a database that intermittently times out. Any single
      // timeout throws out of the whole run, and the next cold start begins
      // again from the top, hits another timeout somewhere in the same 2,920,
      // and dies again. The catalogue could never converge, which is why 737
      // probe identities and 255 explanation identities sat hollow and why the
      // mastery gate had nothing gradeable to serve (E6).
      //
      // The per-asset query was never necessary: every slug is known up front.
      // One indexed read of the seed lineage answers all 2,920 questions at
      // once — does this slug exist, and does it have content — and the loops
      // become pure in-memory decisions with writes only where work is
      // genuinely needed. On a healthy catalogue that is ONE query and zero
      // writes, versus 2,920 queries before.
      //
      // The TOCTOU window is unchanged in kind (it was always there) and is
      // still closed the same way: the partial unique index makes a losing
      // racer fail with P2002, which is caught per-asset as a skip.
      const existing = new Map<string, { assetId: string; hasContent: boolean }>()
      for (const row of await prisma.assetIdentity.findMany({
        where: seedOwnershipWhere() as never,
        select: {
          assetId: true,
          canonicalSlug: true,
          probeAsset: { select: { assetId: true } },
          explanationAsset: { select: { assetId: true } },
        },
      })) {
        // Last write wins on a duplicate slug, which cannot happen under the
        // partial unique index — recorded so the Map's behaviour is stated
        // rather than assumed.
        existing.set(row.canonicalSlug, {
          assetId: row.assetId,
          hasContent: row.probeAsset !== null || row.explanationAsset !== null,
        })
      }

      let created = 0
      let skipped = 0
      // Per-asset write failures. NOT fatal: on a database that intermittently
      // times out, one failed row must not discard the 2,900 that would have
      // succeeded — that all-or-nothing behaviour is precisely why the
      // catalogue never converged. Counted and logged loudly, and the next
      // cold start retries whatever is still missing.
      let failed = 0

      // ── A BOUNDED SLICE PER COLD START ────────────────────────────────────
      //
      // MEASURED: in 24h of production logs, "asset bootstrap complete" appears
      // ZERO times, while "seeding missing assets…" appears on nearly every
      // request. The catalogue has been frozen at 2379/2920 for weeks.
      //
      // The remaining cause, after the resilience fixes, is structural rather
      // than a bug: register() starts this work WITHOUT awaiting it, and a
      // serverless instance freezes once the response is sent. A task needing
      // ~1,500 writes cannot finish inside an invocation that ends in
      // milliseconds — so every cold start redoes the same early work and dies
      // in the same place, making zero net progress forever.
      //
      // Doing LESS is what makes it finish. A bounded slice completes well
      // inside an invocation, and each cold start advances the catalogue by
      // that slice, so it converges over ordinary traffic instead of never.
      // The prefetch above already made "what is still missing" one query, so
      // resuming costs nothing.
      //
      // Deliberately NOT a new seeding path: same loops, same content, same
      // idempotent writes — only an upper bound on how much one invocation
      // attempts. `scripts/brain/seed-knowledge-assets.ts` remains the right
      // tool for seeding the whole catalogue at once.
      const WRITE_BUDGET = Number(process.env.ASSET_BOOTSTRAP_WRITE_BUDGET ?? 40)
      let budgetSpent = 0
      const budgetExhausted = () => budgetSpent >= WRITE_BUDGET
      // Content rows written for an identity that already existed but was
      // hollow. Counted separately from `created` so the log distinguishes
      // "new asset" from "repaired a shell", which are different events.
      let repaired = 0

      // ── HOLLOW IDENTITIES SELF-HEAL ───────────────────────────────────────
      //
      // MEASURED IN PRODUCTION (2026-08-12): 737 of 1,535 PROBE identities and
      // 255 EXPLANATION identities carry status ACTIVE with NO content row
      // behind them. All 737 share one signature — HUMAN_CURATOR /
      // EDUCATIONAL_BRAIN_SEED, every one created on 2026-07-27 — so they came
      // from a single historical seeding event, not from this loop (the nested
      // `create` below is atomic and cannot produce one).
      //
      // WHY IT MATTERED. `findBestProbe` filters on status ACTIVE and then
      // joins content. A hollow identity passes the filter and yields nothing
      // servable, so the mastery gate has no MCQ to attach and the turn goes
      // out as model prose — the E6 defect, measured at 12 occurrences across
      // 6 topics. It is why the repo shows 3-4 gradeable probes for a
      // phys.meas concept while production served 0-1.
      //
      // WHY IT NEVER HEALED. The dup check asked only "does an identity with
      // this canonicalSlug exist?" — an orphan answered yes, so every cold
      // start since has skipped it. Permanent by construction.
      //
      // THE REPAIR. Create the MISSING CHILD for the existing identity rather
      // than deleting and re-creating it: no unique-index conflict on
      // canonicalSlug, no id churn for anything already referencing the asset,
      // and evidence rows keyed on assetId keep pointing at the same asset.
      for (const e of ALL_EXPLANATIONS) {
        if (budgetExhausted()) break
        const canonicalSlug = seedCanonicalSlug(e.conceptId, e.familyKind, e.gradeBand)
        const dup = existing.get(canonicalSlug)
        if (dup) {
          if (!dup.hasContent) {
            try {
              await prisma.explanationAsset.create({
                data: {
                  assetId: dup.assetId,
                  content: e.content,
                  style: ExplanationStyle.CONCRETE,
                  readingLevel: 0,
                  lengthChars: e.content.length,
                  targetedMisconceptions: e.targetedMisconceptions,
                },
              })
              repaired++
              budgetSpent++
            } catch (repairErr: any) {
              // P2002 = a concurrent cold start healed it first. Both outcomes
              // are the desired one.
              if (repairErr?.code !== 'P2002') throw repairErr
            }
          }
          skipped++
          continue
        }
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
          budgetSpent++
        } catch (createErr: any) {
          // P2002 = concurrent cold start already inserted this slug — safe to skip.
          if (createErr?.code === 'P2002') { skipped++; continue }
          failed++
          continue
        }
      }

      // Same repair on the probe side — this is where the 737 live, and where
      // the E6 damage was actually done. See the note above the explanation
      // loop for the full measurement and reasoning.
      for (const p of ALL_PROBES) {
        if (budgetExhausted()) break
        const canonicalSlug = probeSlug(p)
        const dup = existing.get(canonicalSlug)
        if (dup) {
          if (!dup.hasContent) {
            try {
              await prisma.probeAsset.create({
                data: {
                  assetId: dup.assetId,
                  stem: p.stem,
                  choices: p.choices ? (p.choices as unknown as object) : undefined,
                  correctValue: p.correctValue,
                  keywords: [],
                  difficulty: p.difficulty,
                  targetedMisconceptions: p.targetedMisconceptions,
                  requiredVisuals: [],
                },
              })
              repaired++
              budgetSpent++
            } catch (repairErr: any) {
              if (repairErr?.code !== 'P2002') throw repairErr
            }
          }
          skipped++
          continue
        }
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
          budgetSpent++
        } catch (createErr: any) {
          if (createErr?.code === 'P2002') { skipped++; continue }
          failed++
          continue
        }
      }

      console.log(
        `[instrumentation] asset bootstrap slice: created=${created} repaired=${repaired}` +
        ` skipped=${skipped} failed=${failed} spent=${budgetSpent}/${WRITE_BUDGET}` +
        ` total=${EXPECTED_IDENTITIES}` +
        (budgetSpent >= WRITE_BUDGET ? ' — budget spent, the next cold start continues' : ' — nothing left to do') +
        (failed > 0 ? '; some writes failed (likely DB timeouts) and will be retried' : '')
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
