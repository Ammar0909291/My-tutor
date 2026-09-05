/**
 * Next.js instrumentation hook — runs once per server process start.
 *
 * Responsible for: automatic Knowledge Asset bootstrap.
 *
 * On every cold start (local dev and Vercel), if the AssetIdentity table
 * has fewer rows than the expected seed total, the authored seed assets
 * (brainSeedAssets + authoredSeedAssets + chemistrySeedAssets) are inserted
 * as ACTIVE rows so assembleLesson() starts serving authored content
 * immediately — without requiring manual `npm run seed:brain-assets`.
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

  // ── WHY THIS IS AWAITED, WITH A DEADLINE ──────────────────────────────────
  //
  // It was fire-and-forget, "so cold-start latency is unaffected". That is
  // why the catalogue never converged, and the reason is stated a few lines
  // below in this same file: a serverless instance FREEZES once its response
  // is sent. Nothing cancels the background work — it is simply suspended
  // mid-flight, and when the instance thaws for the next request the socket
  // it was waiting on is gone.
  //
  // MEASURED 2026-08-19. Every cold start logged
  //   asset bootstrap DB error (will retry on next start): ... Socket timeout
  // on the run's FIRST query. EXPLAIN ANALYZE of that exact query against
  // production: 10.025 ms, 4,219 rows, seq scan on a 5,386-row table. The
  // database was never slow. `/api/health` returns in about 200 ms, and the
  // instance froze inside that window — so the work had no wall-clock to
  // finish in, no matter how few writes it attempted.
  //
  // Awaiting a BOUNDED slice makes progress deterministic instead of
  // incidental to how long some unrelated request happened to take. The
  // deadline is the safety property: a slow or unreachable database delays
  // boot by at most this long, never indefinitely, and the write budget
  // caps the work itself. If the deadline wins, the run is abandoned exactly
  // as before and the next cold start resumes from the prefetch — the
  // partial progress is already committed, because each asset is its own
  // write.
  //
  // Cost: once the catalogue is complete the guard exits after that one 10 ms
  // read, so the steady state is a single indexed query per cold start.
  // MEASURED at 5000ms: the deadline was reached on every cold start with only
  // a handful of rows written, because almost all of it goes to FIXED cost
  // before any write — Prisma engine connect, evaluating 1.37 MB of seed source,
  // and validating 4,144 canonical identities. Raising it buys write time, not
  // idle time, and since the writes are batched the marginal cost of a larger
  // slice is a bigger INSERT payload rather than more round trips.
  const deadlineMs = Number(process.env.ASSET_BOOTSTRAP_DEADLINE_MS ?? 12000)
  let onDeadline: ReturnType<typeof setTimeout> | undefined
  await Promise.race([
    bootstrapAssets().catch((err) =>
      console.error('[instrumentation] asset bootstrap failed (non-fatal):', err?.message ?? err)
    ),
    new Promise<void>((resolve) => {
      onDeadline = setTimeout(() => {
        console.warn(
          `[instrumentation] asset bootstrap: ${deadlineMs}ms boot deadline reached — ` +
            'continuing in the background; the next cold start resumes',
        )
        resolve()
      }, deadlineMs)
      // Never hold the process open on account of this timer.
      onDeadline.unref?.()
    }),
  ])
  if (onDeadline) clearTimeout(onDeadline)
}

async function bootstrapAssets() {
  try {
    // ONE POOL PER PROCESS, NOT TWO.
    //
    // P5 (2026-07-26) gave this bootstrap's OWN PrismaClient the same pool
    // params as the app's singleton, which fixed the params but left the
    // second client. A serverless instance therefore opened two pools of
    // connection_limit=15 against a database whose max_connections is 60 —
    // so four warm instances can exhaust it, and a cold start is exactly the
    // moment both pools are being filled at once.
    //
    // MEASURED 2026-08-19, production, on this hook's FIRST query:
    //   asset bootstrap DB error (will retry on next start):
    //     Invalid `prisma.assetIdentity.groupBy()` invocation: Socket timeout
    // and after the guard was rewritten, the same failure moved to
    // findMany — i.e. it is not the query. asset_identity holds 5,386 rows;
    // no read of it costs seconds. It is connection acquisition.
    //
    // The singleton is already constructed with withPoolParams (see
    // src/lib/db/prisma.ts), so this keeps the P5 fix and drops the extra
    // pool. It is also why there is no $disconnect below: the client belongs
    // to the application, not to this run.
    const { prisma, withRetry } = await import('./lib/db/prisma')

    {
      // Load seed arrays first so we know the expected total before querying.
      const { SEED_EXPLANATIONS, SEED_PROBES, SEED_LANGUAGE, SEED_AUTHOR_ID, seedCanonicalSlug,
        buildProbeSlugResolver, abandonedLegacyProbeSlugs, SEED_REVIVABLE_STATUSES,
        seedOwnershipWhere } =
        await import('./lib/teaching/assets/brainSeedAssets')
      const { AUTHORED_EXPLANATIONS, AUTHORED_PROBES } =
        await import('./lib/teaching/assets/authoredSeedAssets')
      // Chemistry joined this bootstrap's corpus 2026-08-19. See the ownership
      // note in brainSeedAssets.ts: its 314 unseeded probes were authored, in
      // git, and unreachable, because the only writer that had ever seeded them
      // is a script needing a DATABASE_URL no session here has. Production held
      // exactly 2 gradeable probes per concept for all 186 chemistry concepts
      // against an asset contract of 3, so no chemistry lesson could reach
      // mastery. Biology and computer_science remain script-only — their
      // corpora have not been measured against the contract.
      const { CHEMISTRY_EXPLANATIONS, CHEMISTRY_PROBES } =
        await import('./lib/teaching/assets/chemistrySeedAssets')
      // Physics band-gap probes joined 2026-08-25. The cross-subject contract
      // audit found 21 (concept, band) pairs — units, velocity, acceleration,
      // force, all three of Newton's laws, momentum, impulse, power at MIDDLE
      // and ADULT — taught with ZERO gradeable probes at the band being
      // served, because every probe for them is authored at HIGH and
      // matcher.ts REFUSES an adjacent band (60 against a threshold of 65).
      // The rest of physics is in authoredSeedAssets, which is already in this
      // corpus; leaving these out would repeat chemistry's exact failure —
      // authored, in git, and unreachable.
      const { PHYSICS_BAND_GAP_PROBES } =
        await import('./lib/teaching/assets/physicsBandGapAssets')
      // Physics probe-DEPTH probes joined 2026-08-30. Re-counting the contract
      // on the gradeable basis (joining probe_assets and requiring >= 2
      // choices, which is what a gate can actually grade) found 235 physics
      // (concept, band) pairs holding exactly three closed-choice probes.
      // Three is the mastery bar itself — one wrong answer and the pool can no
      // longer supply correctAtCheck >= 1 plus correctAtPractice >= 2, because
      // excludeProbeStem never re-asks a spent probe. So the learner who needs
      // remediation is exactly the learner the concept then refuses to
      // certify. This file lifts those pairs clear of that edge; leaving it
      // out of the corpus would repeat chemistry's exact failure — authored,
      // in git, and unreachable.
      const { PHYSICS_DEPTH_PROBES } =
        await import('./lib/teaching/assets/physicsDepthSeedAssets')
      // Chemistry probe-depth probes joined 2026-08-30. Session A's chemistry
      // baseline reproduced the physics mastery ceiling almost exactly — mean
      // 2.82 keyed probes served, tail 1.8 turns when mastered against 8.3
      // when not — so the zero-slack pool is not subject-specific.
      const { CHEMISTRY_DEPTH_PROBES } =
        await import('./lib/teaching/assets/chemistryDepthSeedAssets')
      const { hashContent } = await import('./lib/teaching/assets/similarity')
      const { AssetFamily, AssetStatus, AuthorKind, ExplanationStyle } = await import('@prisma/client')

      const ALL_EXPLANATIONS = [...SEED_EXPLANATIONS, ...AUTHORED_EXPLANATIONS, ...CHEMISTRY_EXPLANATIONS]
      const ALL_PROBES = [...SEED_PROBES, ...AUTHORED_PROBES, ...CHEMISTRY_PROBES, ...PHYSICS_BAND_GAP_PROBES,
        ...PHYSICS_DEPTH_PROBES, ...CHEMISTRY_DEPTH_PROBES]
      // ADR 14 §13 (Item 6): ladder rungs get a difficulty segment; singleton
      // slots keep the identity they already have. One resolver drives BOTH
      // the pre-flight check and the write loop so they cannot disagree.
      const probeSlug = buildProbeSlugResolver(ALL_PROBES)

      // The exact set of canonical identities THIS corpus declares. The
      // completeness guard below intersects the table against it so that seed
      // rows belonging to a different corpus cannot report this one as done.
      const expectedSlugs = new Set<string>([
        ...ALL_EXPLANATIONS.map((e) => seedCanonicalSlug(e.conceptId, e.familyKind, e.gradeBand)),
        ...ALL_PROBES.map((p) => probeSlug(p)),
      ])

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
      //
      // RETRIED, because this single read is now the whole run's gate. It was
      // failing in production with "Socket timeout" on a 5,386-row table —
      // connection acquisition, not query cost — and one such failure threw
      // out of the entire cold start, which is the never-converges shape this
      // block already describes. withRetry's isRetryable() already classifies
      // socket timeouts and pool-acquisition failures as transient.
      // ── Step 0.6: THE CHEAP COMPLETENESS PROBE ─────────────────────────────
      //
      // MEASURED 2026-08-31, during a live egress incident (the org was at
      // 50.8 GB against a 5 GB monthly quota):
      //
      //   asset_identity prefetch   2,606 calls   11,278,908 rows
      //   + probe_assets sub-select 1,838 calls    4,771,827 rows
      //   + explanation_assets      1,812 calls    2,884,704 rows
      //                                          ~22 MILLION rows
      //
      // Those three are ONE query as written below — Prisma issues a relation
      // `select` as its own statement — and together they were the largest
      // remaining egress line after the spine-replay fix.
      //
      // Every one of those rows was read to answer a YES/NO question, and for
      // at least the last 21 hours the answer has been NO every single time:
      // zero seed rows were written in that window while the prefetch ran on
      // every cold start. The bootstrap was paying ~4,300 rows plus two
      // relation reads to discover it had nothing to do.
      //
      // So ask the question directly. Two COUNTs return two rows and decide
      // exactly what the full prefetch decided:
      //
      //   stored  — how many of the slugs THIS corpus declares exist at all
      //   hollow  — how many of those carry no content row of either kind
      //
      // The condition below is character-for-character the one the full guard
      // applies further down; this only reaches it sooner and cheaper. When it
      // does NOT fire, nothing is skipped — the original prefetch runs exactly
      // as before and the original guard decides again.
      //
      // WHY IT IS SAFE TO BE WRONG HERE: a false "complete" would strand
      // seeding, so the whole probe is wrapped in a try/catch that FALLS
      // THROUGH to the existing path on any error. A failed cheap probe costs
      // one wasted round trip; it can never substitute its own failure for a
      // completeness answer. That is the same rule the spine fix used — a
      // failed replay is retried, never remembered as a result.
      //
      // The intersection with `expectedSlugs` is not optional. Counting every
      // seed-owned row instead is the exact defect this file already carries a
      // long comment about: rows written by the standalone script for corpora
      // this hook does not import once satisfied the guard while 314 chemistry
      // probes were absent.
      try {
        const expectedSlugList = [...expectedSlugs]
        const ownership = seedOwnershipWhere() as Record<string, unknown>
        const [storedCount, hollowCount] = await withRetry(() =>
          prisma.$transaction([
            prisma.assetIdentity.count({
              where: { ...ownership, canonicalSlug: { in: expectedSlugList } } as never,
            }),
            prisma.assetIdentity.count({
              where: {
                ...ownership,
                canonicalSlug: { in: expectedSlugList },
                probeAsset: { is: null },
                explanationAsset: { is: null },
              } as never,
            }),
          ]),
        )
        if (storedCount >= expectedSlugs.size && hollowCount === 0) {
          console.log(
            `[instrumentation] asset bootstrap: ${storedCount}/${expectedSlugs.size} seed identities present, 0 hollow — skipping (cheap probe: 2 rows read, not ~${expectedSlugs.size})`,
          )
          return
        }
        console.log(
          `[instrumentation] asset bootstrap: cheap probe says ${storedCount}/${expectedSlugs.size} present, ${hollowCount} hollow — full prefetch needed`,
        )
      } catch (err) {
        // Fall through to the full prefetch. Never treat a failed probe as an
        // answer in either direction.
        console.warn('[instrumentation] asset bootstrap: cheap completeness probe failed, falling back to full prefetch', err)
      }

      const existing = new Map<string, { assetId: string; hasContent: boolean }>()
      // ── Step 0.8: THE ABANDONED-LEGACY-SLUG GUARD (P-10-FOLLOW-UP-B) ───────
      //
      // `buildProbeSlugResolver` gives a (conceptId, probeKind, gradeBand) slot
      // the plain 4-segment slug until a SECOND probe joins it, at which point
      // every probe in that slot — including one already seeded — moves to the
      // 5-segment difficulty slug. The base slug then names no probe in this
      // corpus, but the row seeded under it is untouched: the loops below look
      // a probe up by ITS OWN resolved slug, find nothing, and create a second
      // row. Production ends up serving one question under two ACTIVE
      // identities. That is P-10, measured three times in physics
      // (docs/CLAUDE_HANDOVER.md §9r/§9s), remediated by hand, and this is the
      // writer that would recreate it — the manual seeder's Guard 3 cannot,
      // because it is not the writer that runs in production.
      //
      // COSTS NOTHING EXTRA TO ASK. The prefetch below already reads every
      // seed-owned row, unfiltered by slug, so the abandoned row is ALREADY in
      // the result set — it is simply keyed under a slug no loop looks up. The
      // only addition is `status` on the existing select (one scalar column on
      // a query that was already running): no new query, no new round trip, no
      // new connection, nothing added to the cheap-probe fast path, which
      // returns before any of this. The egress incident of 2026-08-31 is the
      // reason that distinction is spelled out rather than assumed.
      //
      // The detector is imported, never re-implemented: one definition of
      // "which slugs did this corpus abandon", shared with the manual seeder.
      // It is computed HERE rather than beside the resolver above so that a
      // cold start with nothing to do does not pay for it at all.
      const abandonedSlugs = abandonedLegacyProbeSlugs(ALL_PROBES)
      const liveAbandoned: Array<{ assetId: string; canonicalSlug: string; status: string }> = []
      for (const row of await withRetry(() => prisma.assetIdentity.findMany({
        where: seedOwnershipWhere() as never,
        select: {
          assetId: true,
          canonicalSlug: true,
          status: true,
          probeAsset: { select: { assetId: true } },
          explanationAsset: { select: { assetId: true } },
        },
      }))) {
        // Last write wins on a duplicate slug, which cannot happen under the
        // partial unique index — recorded so the Map's behaviour is stated
        // rather than assumed.
        existing.set(row.canonicalSlug, {
          assetId: row.assetId,
          hasContent: row.probeAsset !== null || row.explanationAsset !== null,
        })
        // Live == not revivable. A DEPRECATED/RETIRED row under an abandoned
        // slug is the RESOLVED state (it is what the P-10 remediation left
        // behind), so it must not block a legitimate ladder from seeding.
        if (abandonedSlugs.has(row.canonicalSlug) && !SEED_REVIVABLE_STATUSES.includes(row.status)) {
          liveAbandoned.push({ assetId: row.assetId, canonicalSlug: row.canonicalSlug, status: row.status })
        }
      }

      if (liveAbandoned.length > 0) {
        // Same failure semantics as Step 0's duplicate-identity check, and for
        // the same reason: this runs inside the Next.js server process via
        // register(), so a process.exit would turn a data-quality fault into a
        // boot outage. Refusing to seed and returning is the equivalent
        // outcome for a server hook — nothing created, nothing renamed,
        // nothing deleted, existing rows still serving — and bootstrapAssets()
        // is awaited under a deadline rather than trusted to finish, so
        // returning early is a normal exit, not an error path.
        //
        // WHERE THIS SITS, STATED PLAINLY. Step 1's status convergence
        // (seed-owned DRAFT -> ACTIVE) has already run by now, because the only
        // way to decide this question earlier would be a second query, and the
        // whole point of the design is that it costs none. That is sound: the
        // defect being prevented is a CREATE, and convergence creates nothing.
        // It cannot manufacture a duplicate identity; it can only change the
        // status of a row that already exists — which it would equally have
        // done before this guard existed. So the reachable states are strictly
        // a subset of the pre-guard ones, minus the duplicate.
        //
        // Bounded, like the identity report: an unbounded list would repeat in
        // full on every cold start.
        const shown = liveAbandoned.slice(0, 10)
        console.error(
          `[instrumentation] asset bootstrap ABORTED before any write — ${liveAbandoned.length} seed-owned ` +
            'identity/identities are still live under a canonicalSlug this corpus no longer produces, ' +
            'because that slot was promoted to a difficulty ladder. Seeding would create a SECOND ' +
            'ACTIVE identity for the same question (the P-10 defect). No rows created; nothing ' +
            'renamed or deleted; everything already stored continues to serve.',
        )
        for (const r of shown) {
          console.error(`  ${r.status} ${r.canonicalSlug} (assetId ${r.assetId})`)
        }
        if (liveAbandoned.length > shown.length) {
          console.error(`  … and ${liveAbandoned.length - shown.length} more not shown.`)
        }
        console.error(
          '  Resolve by deprecating these rows (docs/CLAUDE_HANDOVER.md §9r/§9s records the P-10 ' +
            'precedent: a status change only, no delete, reversible), after which this bootstrap ' +
            'resumes on the next cold start.',
        )
        return
      }


      // ── THE COMPLETENESS GUARD MEASURES THIS CORPUS, NOT THE TABLE ────────
      //
      // It used to compare `identityCheck.distinctIdentities` (the corpus) to a
      // DISTINCT canonicalSlug count over every seed-owned row in the table.
      // Those are different sets, and the table's is the larger one: rows
      // seeded historically by `scripts/brain/seed-knowledge-assets.ts` — whose
      // corpus includes files this hook does not import (the mathematics batch
      // assets, biology, computer_science) — carry the same authorKind,
      // authorId and subject tags, so they COUNT toward the guard while being
      // invisible to the loops below.
      //
      // MEASURED 2026-08-19, adding chemistry: expected 4,144, stored 4,219.
      // The guard was already satisfied while 314 chemistry probes were absent.
      // Only the 388 hollow identities kept the run alive; the moment those
      // were repaired the bootstrap would have returned early on every cold
      // start thereafter and those 314 probes would never have been created —
      // the same never-converges failure mode as the historical bugs above,
      // reached from the opposite direction.
      //
      // Both figures now come from the SAME prefetch, intersected with the
      // slugs this corpus actually declares, so "present" and "hollow" mean
      // "present in what we are here to seed". Foreign seed rows can no longer
      // satisfy the guard, and the two extra aggregate queries this replaced
      // are gone — the prefetch already holds the answer.
      const EXPECTED_IDENTITIES = identityCheck.distinctIdentities
      let storedIdentities = 0
      let hollowIdentities = 0
      for (const slug of expectedSlugs) {
        const row = existing.get(slug)
        if (!row) continue
        storedIdentities++
        if (!row.hasContent) hollowIdentities++
      }

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
      //
      // 40 was chosen when each asset cost its own round trip. Batched, 150
      // rows is the same four statements — so the budget now bounds payload
      // size rather than latency, and the catalogue converges in a couple of
      // cold starts instead of dozens.
      const WRITE_BUDGET = Number(process.env.ASSET_BOOTSTRAP_WRITE_BUDGET ?? 150)
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
      // ── PLAN IN MEMORY, THEN WRITE IN BATCHES ─────────────────────────────
      //
      // MEASURED 2026-08-19, first cold start that got real wall-clock: three
      // assets written inside a 5-second boot deadline, with the log reading
      //   asset bootstrap: 3830/4144 seed identities present — seeding...
      //   asset bootstrap: 5000ms boot deadline reached
      // The 40-write budget was nowhere near spent. Each asset was a nested
      // create — an identity and its content row in one implicit transaction —
      // so 40 assets meant 40 sequential round trips to a database in another
      // region, and the deadline arrived long before the budget did. At three
      // per cold start the remaining 314 chemistry probes need a hundred cold
      // starts.
      //
      // The loops below therefore decide everything first, touching nothing,
      // and the writes go out as a handful of createMany statements. Same
      // content, same idempotence, same budget — four round trips instead of
      // forty.
      //
      // WHAT REPLACES THE NESTED CREATE'S ATOMICITY. createMany cannot nest, so
      // an identity and its content row are now two statements, and an
      // interruption between them leaves exactly the hollow identity this file
      // already knows how to repair — the self-heal below is not a new
      // dependency, it is the same one, and it now covers this path too. Ids
      // are generated here rather than by the database, which is what lets the
      // content rows name their parents without reading them back by slug.
      //
      // WHAT REPLACES PER-ASSET FAILURE ISOLATION. A failed statement now costs
      // its whole batch rather than one asset. The batch is bounded by the
      // write budget, every statement is idempotent, and each flush is caught
      // separately so one failure does not discard the others — so the worst
      // case is that one cold start advances less, not that progress is lost.
      const { randomUUID } = await import('node:crypto')

      type Row = Record<string, unknown>
      const newIdentities: Row[] = []
      const newExplanationChildren = new Map<string, Row>()
      const newProbeChildren = new Map<string, Row>()
      const repairExplanations: Row[] = []
      const repairProbes: Row[] = []

      for (const e of ALL_EXPLANATIONS) {
        if (budgetExhausted()) break
        const canonicalSlug = seedCanonicalSlug(e.conceptId, e.familyKind, e.gradeBand)
        const child = (assetId: string): Row => ({
          assetId,
          content: e.content,
          style: ExplanationStyle.CONCRETE,
          readingLevel: 0,
          lengthChars: e.content.length,
          targetedMisconceptions: e.targetedMisconceptions,
        })
        const dup = existing.get(canonicalSlug)
        if (dup) {
          if (!dup.hasContent) {
            repairExplanations.push(child(dup.assetId))
            budgetSpent++
          }
          skipped++
          continue
        }
        const assetId = randomUUID()
        newIdentities.push({
          assetId,
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
        })
        newExplanationChildren.set(assetId, child(assetId))
        budgetSpent++
      }

      // Same planning on the probe side — this is where the hollow identities
      // live, and where the E6 damage was actually done. See the note above the
      // explanation loop for the full measurement and reasoning.
      for (const p of ALL_PROBES) {
        if (budgetExhausted()) break
        const canonicalSlug = probeSlug(p)
        const child = (assetId: string): Row => ({
          assetId,
          stem: p.stem,
          choices: p.choices ? (p.choices as unknown as object) : undefined,
          correctValue: p.correctValue,
          keywords: [],
          difficulty: p.difficulty,
          targetedMisconceptions: p.targetedMisconceptions,
          requiredVisuals: [],
        })
        const dup = existing.get(canonicalSlug)
        if (dup) {
          if (!dup.hasContent) {
            repairProbes.push(child(dup.assetId))
            budgetSpent++
          }
          skipped++
          continue
        }
        const assetId = randomUUID()
        newIdentities.push({
          assetId,
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
        })
        newProbeChildren.set(assetId, child(assetId))
        budgetSpent++
      }

      // ── THE FLUSH ─────────────────────────────────────────────────────────
      //
      // skipDuplicates is ON CONFLICT DO NOTHING, which is what makes a
      // concurrent cold start harmless: the partial unique index on the seed
      // lineage rejects a second row for a slug, and the loser simply writes
      // nothing. It is the same guarantee the per-asset P2002 catch gave, moved
      // into the statement.
      const flush = async (what: string, run: () => Promise<{ count: number }>) => {
        try {
          return (await withRetry(run)).count
        } catch (err: any) {
          console.warn(`[instrumentation] asset bootstrap: ${what} failed (retried on next cold start):`, err?.message ?? err)
          return null
        }
      }

      if (repairExplanations.length) {
        const n = await flush('explanation repair', () =>
          prisma.explanationAsset.createMany({ data: repairExplanations as never, skipDuplicates: true }))
        if (n === null) failed += repairExplanations.length
        else repaired += n
      }
      if (repairProbes.length) {
        const n = await flush('probe repair', () =>
          prisma.probeAsset.createMany({ data: repairProbes as never, skipDuplicates: true }))
        if (n === null) failed += repairProbes.length
        else repaired += n
      }

      if (newIdentities.length) {
        const n = await flush('identity insert', () =>
          prisma.assetIdentity.createMany({ data: newIdentities as never, skipDuplicates: true }))
        if (n === null) {
          failed += newIdentities.length
        } else {
          // WHICH OF OUR IDS ACTUALLY LANDED. skipDuplicates reports a count,
          // not a set, and a row skipped as a duplicate belongs to a racer
          // under a DIFFERENT assetId — so writing our content row against our
          // id would violate the foreign key. One indexed read settles it.
          const ourIds = newIdentities.map((r) => r.assetId as string)
          const landed = new Set(
            (await withRetry(() => prisma.assetIdentity.findMany({
              where: { assetId: { in: ourIds } },
              select: { assetId: true },
            }))).map((r) => r.assetId),
          )
          skipped += ourIds.length - landed.size

          const explData = [...newExplanationChildren].filter(([id]) => landed.has(id)).map(([, d]) => d)
          const probeData = [...newProbeChildren].filter(([id]) => landed.has(id)).map(([, d]) => d)
          if (explData.length) {
            const c = await flush('explanation content', () =>
              prisma.explanationAsset.createMany({ data: explData as never, skipDuplicates: true }))
            if (c === null) failed += explData.length
            else created += c
          }
          if (probeData.length) {
            const c = await flush('probe content', () =>
              prisma.probeAsset.createMany({ data: probeData as never, skipDuplicates: true }))
            if (c === null) failed += probeData.length
            else created += c
          }
        }
      }

      console.log(
        `[instrumentation] asset bootstrap slice: created=${created} repaired=${repaired}` +
        ` skipped=${skipped} failed=${failed} spent=${budgetSpent}/${WRITE_BUDGET}` +
        ` total=${EXPECTED_IDENTITIES}` +
        (budgetSpent >= WRITE_BUDGET ? ' — budget spent, the next cold start continues' : ' — nothing left to do') +
        (failed > 0 ? '; some writes failed (likely DB timeouts) and will be retried' : '')
      )
    }
  } catch (err: any) {
    // DB not reachable yet (e.g., slow cold start) — non-fatal; the next cold
    // start will retry. assembleLesson() degrades to Groq in the interim.
    console.warn('[instrumentation] asset bootstrap DB error (will retry on next start):', err?.message)
  }
}
