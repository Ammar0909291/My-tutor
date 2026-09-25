# Egress Incidents (history)

> Extracted verbatim from CLAUDE.md during the 2026-09-17 memory-file
> collapse (CLAUDE.md kept to <500 lines of live rules). Dated entries below
> are historical record — read them for context, not as live instructions.
> Live rules remain in CLAUDE.md; see docs/history/INDEX.md for the full map.

## Egress incident — two leaks found and fixed (2026-08-31)

**Read this before touching `src/instrumentation.ts` or the capability-cache
hydration in `route.ts`. Both carry fixes that a plausible-looking refactor
would undo.**

The Supabase org hit **50.8 GB against a 5 GB monthly egress quota** (free plan,
cycle 05 Aug – 05 Sep, restriction threatened 02 Sep). Full forensic accounting,
every line attributed:

| source | rows | status |
|---|---|---|
| `spine_events` replay on every chat turn | 106,333,556 | **FIXED** (`8425992`) |
| cold-start asset bootstrap prefetch | ~22,000,000 | **FIXED** (`92f2058`) |
| `pg_timezone_names` | 6,677,268 | NOT app code — Supabase Studio |
| `asset_identity` canonicalSlug groupBy | 3,302,416 | already removed 2026-08-19 |
| `topic_progress` reads | ~5,000,000 | legitimate, deliberately untouched |

**Leak 1 — the spine replay.** A cache-hydration guard could not distinguish
"never checked" from "checked, found nothing", because `readCapabilityState()`
returns `{}` for both and the persist only wrote a NON-empty result. So the
guard never flipped and every turn replayed the learner's entire event log —
220,247 calls returning 106.3M rows from a 44,323-row table. Cost GREW with
conversation length. Fixed by recording the ATTEMPT; a FAILED replay
deliberately does not set the marker, because a failure must be retried, not
remembered as an answer. Pinned by `spineReplayEgress.test.ts`.

**Leak 2 — the bootstrap prefetch.** It read every seed-owned `asset_identity`
row plus two Prisma relation sub-queries (~4,300 rows + relations) on every cold
start to answer a yes/no question. The answer was "nothing to do" every time for
21 hours straight. Replaced with two `COUNT`s returning two rows, reaching the
identical decision. Falls through to the full prefetch on ANY error — a false
"complete" would strand seeding permanently. Pinned by
`bootstrapCheapProbe.test.ts`.

**The count ban was narrowed, not deleted.** `bootstrapCompletenessGuard.test.ts`
banned `assetIdentity.count(` outright as a proxy for "never aggregate over the
WHOLE table". The cheap probe's counts are intersected with `expectedSlugList`,
so they cannot exhibit that defect. The assertion now states the invariant
itself — every count must be corpus-scoped, checked across all matches — which
is strictly stronger than the ban.

**VERIFIED STOPPED, not predicted.** The spine query read 220,247 calls /
106,333,556 rows at 18:55:39Z and the identical figures at 19:38:47Z — 43
minutes, zero executions, against a pre-fix rate of ~390 calls per 15 minutes.
The counter is cumulative and never resets, so a flat counter IS the proof.

**`pg_timezone_names` is Supabase Studio, verified not the MCP** — two
consecutive MCP queries left the counter frozen at 5,583. Every dashboard page
load runs it. Not fixable in this repo; the lever is closing the dashboard tab.

**`topic_progress` deliberately NOT optimised.** Already scoped by
`userId + subjectSlug`; 85 rows is simply a learner's topic count. Narrowing the
select was considered and rejected — those rows are returned in the API response
body and the client consumes them, so it would change the API contract for a
modest byte saving.

**`DISABLE_ASSET_BOOTSTRAP=true` is no longer needed for egress** after leak 2.
Harmless to set. Note that physics seeding has been stalled independently since
2026-08-30 21:34 (zero seed rows written in the 21h before the fix), so
disabling freezes nothing that was going to happen.

**Spent egress cannot be recovered.** The meter reads 50.8 GB until the cycle
resets 05 Sep; a code fix stops accrual, it does not refund. A support request
with this evidence was sent 2026-08-31.


## Egress incident — independent re-audit, both fixes confirmed holding (2026-09-02)

Re-ran the full forensic protocol from scratch (not assuming the 2026-08-31 write-up), this
time with live Supabase MCP access to production (`ywakxiqbevfuxsiwewnw`), which the sessions
that made the original two fixes did not have for verification. Findings below are MEASURED
against production `pg_stat_statements` (lifetime cumulative since project creation, never
reset — `stats_reset: 2026-07-05 15:50:54+00`), not re-derived from the prior write-up.

- **Leak 1 (spine replay) — code fix confirmed present and MEASURED STILL STOPPED.**
  `route.ts`'s `capabilitiesHydrated` marker guard (§2879-2894) and `hydrateFromProjection`
  are unchanged from the 2026-08-31 description. Took three live snapshots of the exact
  production query (`spine_events` `learnerId`+`seq>`, ORDER BY seq ASC): flat at
  **220,735 calls / 106,558,119 rows** across three checks spanning 08:17:55Z → 08:25:41Z
  (~8 minutes) — zero growth in the observation window, run 2 days after the original fix
  shipped. The only drift versus the 2026-08-31 snapshot (220,247/106,333,556) is +488 calls /
  +224,563 rows over the intervening ~36 hours — ≈3.2 calls/hour, ≈470 bytes/row ⇒ roughly
  10 MB/day, consistent with the fix's own design (one paid hydration per genuinely
  never-hydrated session, not per turn) against a measured real session-creation rate of
  ~1 new session/hour over the same window (`learn_sessions.startedAt`, last 48h). This is
  three orders of magnitude below the pre-fix ~23 GB/month rate. **STOPPED — confirmed, not
  assumed.** This also satisfies the precondition the E1 note above was waiting on
  ("do NOT restart it until the new egress rate is confirmed under quota") — a future session
  MAY resume the E1 run on that basis, though restarting it is not this session's call to make.
- **Leak 2 (bootstrap prefetch) — code fix confirmed present; historical counters frozen.**
  `src/instrumentation.ts`'s two-COUNT cheap probe is unchanged. Its exact pre-fix production
  query (`asset_identity` `canonicalSlug` groupBy, tags &&) is **completely frozen** at
  2,606 calls / 11,278,908 rows across every check this session — identical to the 2026-08-31
  figure, i.e. genuinely zero further executions, not just a slow rate.
- **New, not previously reported: two dead query patterns identified as historical, not live.**
  `pg_stat_statements` also shows five `probe_assets`/`explanation_assets` "`WHERE assetId IN
  ($1..$N)`" read-back queries (N ranging 1,592–4,328; ≈23M rows / ≈900 MB lifetime combined).
  Grepped the current codebase (`src/`, `scripts/`) for `probeAsset.findMany`/
  `explanationAsset.findMany` — **zero matches**. These queries do not exist in any code
  currently on `main`; they are residue from an earlier, since-refactored version of the seed
  script's per-asset read-back (superseded by the `createMany`+`skipDuplicates` batched flush
  documented in the 2026-08-19 Chemistry entry). Not fixed because there is nothing left to
  fix — reported so a future session doesn't mistake old counter mass for a live leak.
- **Storage ruled out structurally, not just by row-count**: grepped for `supabase.storage`,
  `createSignedUrl`, `@supabase/supabase-js` across `src/` — zero matches. The app never uses
  Supabase Storage or the supabase-js client; every byte of "Supabase egress" this project can
  produce is Postgres wire-protocol traffic through Prisma. This closes STEP 3/7 of the incident
  protocol definitively rather than by inference.
- **No new polling/retry/SWR patterns found** (`setInterval`, `useSWR`, `refetchInterval`,
  `pollInterval` greps) — the only `setInterval` calls are client-side elapsed-time display
  timers (`LessonScreen.tsx`, `QuizClient.tsx`), not network polling.
- **Security regression check**: Supabase security advisor now reads **0 ERROR, 0 WARN, 114
  INFO** (all routine RLS-enabled-no-policy / unindexed-FK hygiene, matching the app's
  documented `rolbypassrls=true` service-role pattern). The previously-flagged
  `public.lesson_attempts` RLS-disabled regression (noted 2026-08-10) is **no longer present**
  — that table now shows RLS enabled, same as every other table. Not this session's fix; recorded
  as resolved since the CLAUDE.md note calling it out was never updated.
- **Full verification, this session**: `npx tsc --noEmit` clean; full suite 536 files / 11,573
  passed / 9 skipped; `npm run build` clean (middleware 79.7 kB, matching the post-edge-fix
  figure, no regression). 24 pre-existing pinned tests
  (`spineReplayEgress.test.ts`/`bootstrapCheapProbe.test.ts`/`bootstrapCompletenessGuard.test.ts`)
  re-run and pass.
- **No code changes made this session** — both root causes were already fixed and pushed to
  `main` by the 2026-08-31 session; this session's contribution is independent, fresh,
  production-measured confirmation that those fixes hold two days later, plus closing the
  Storage/polling/retry branches of the incident protocol that the original write-up did not
  explicitly rule out. Nothing here contradicts or supersedes the 2026-08-31 entry above.



## EGRESS-4 — full bootstrap prefetch bounded to what its guards read (2026-09-25)
Another session's live `pg_stat_statements` delta check found no active growth in EGRESS-1/2/3,
but showed the full cold-start prefetch (`instrumentation.ts`) running on most cold starts,
because the corpus is rarely converged while campaigns ship many batches a day. The prefetch
read EVERY seed-owned row plus two relation reads, so its cost grew with the table's history.
- Rejected fix: bounding to `expectedSlugs` alone. It drops the manual seeder's 5-segment ladder
  rows from `liveSeedSlugs`, which disarms P-10-FOLLOW-UP-D and re-creates the 45 duplicate
  ACTIVE maths identities (proven by the negative control in `bootstrapPrefetchBound.test.ts`).
- Shipped: `bootstrapPrefetchSlugs` = expected ∪ abandoned ∪ `{base:difficulty}` for singleton
  slots, i.e. exactly what `existing`, `liveAbandoned` and `liveSeedSlugs` look up. Over 30,000
  slugs (Postgres bind cap 65,535) it returns null and the unbounded read is kept. Mutation-checked.
- Expected saving today is small (declared corpus ≈ stored rows). It stops future growth with
  historical rows. Re-measure with the same two-snapshot delta method after deploy.
