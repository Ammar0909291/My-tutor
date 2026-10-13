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

## EGRESS-5 — duplicate per-turn topic_progress reads + wide capability replay (2026-09-27)
Production `pg_stat_statements` (lifetime counters; row sizes measured with `pg_column_size`).
- **Found 1 — the per-turn adaptive teaching context re-read `topic_progress` ~6×.**
  `getTutorTeachingContext` → `getWeightedTeachingPlanProfile` calls `getTeachingPlans` twice
  and `getRevisionProfile` three times, and each re-reads the learner's WHOLE all-subjects
  `topic_progress` (plus three identical VISUAL `evidence_records` reads). The three
  all-subjects `topic_progress` queries stood at ~29.7M rows lifetime (≈5M on 2026-08-31), ≈80 B
  per row → roughly 74 MB/day, ~2.2 GB/month.
  **Fix:** `src/lib/db/requestMemo.ts` (AsyncLocalStorage, request-scoped, failed loads evicted,
  nothing shared across requests). `loadUserTopicRows` (one column superset), plus memoized
  `getRevisionProfile`, `getTeachingPlans` and `getVisualLearningProfile`. The chat route wraps
  `getTutorTeachingContext` in `withRequestMemo`; so do the 10 `/api/intelligence/*` GET
  handlers. Result: 1 `topic_progress` read per turn instead of ~6, identical results
  (`intelligenceReadMemo.test.ts`). Expected ~−1.8 GB/month.
- **Found 2 — the EGRESS-2 capability replay fetched every column.** Since EGRESS-2
  (2026-09-23), the type-filtered query ran 1,680 times at ~230 rows per call (heavy learners
  with up to 563 CapabilityObserved events, opening many sessions). A full row is 418 B; the fold
  reads only `seq, type, schemaVersion, payload` (108 B).
  **Fix:** `loadCapabilityEvents` selects those four columns; same pages, filter and order. The
  equivalence test still passes, and a new test pins the select. Expected ~−0.9 GB/month.
- **Checked, not a live leak:** the unfiltered `spine_events` replay counter grew between 09-02
  and 09-23, before EGRESS-2 shipped. No code calls `loadSpineEvents`/`replayStudentView` now.
  The `probe_assets`/`explanation_assets` "IN (…)" reads return one ~30 B id column (bootstrap
  prefetch relations), so they are small in bytes.
- **Re-measure after deploy** with the two-snapshot delta on queryids 628852208896445779,
  444473988123706220, -7522253544637828763 (topic_progress) and 7123691883795881034
  (capability replay).

## 2026-10-02 — Turn-assembly shadow sampling: egress measured, not estimated

The owner asked for egress to stay under the free tier while `scripts/qa/shadowSampleRun.ts`
drove disposable-account sessions to fill the shadow sample.

**Method:** two-snapshot `pg_stat_statements` delta (lifetime counters), the same method as the
entries above. Snapshot 1 at 17:42:26 UTC, snapshot 2 at 17:46:42 UTC, around one bounded sampler
run (physics, 2 lessons, 6 graded taps, about 20 chat requests), plus any other traffic in the
window.

| Measure | Delta |
| --- | --- |
| All statements | +3,571 calls, +1,779 rows returned |
| `spine_events` select (queryid 2599099062474326428, the EGRESS-1 replay) | **+0 calls, +0 rows** |
| `topic_progress` reads (4078834300536363835, 444473988123706220) | +30 calls, +36 rows |
| Every other top-10 statement by lifetime rows | +0 |

- **Rows per turn:** about 90 rows per chat turn. Measured row sizes for today:
  - a message averages 391 bytes;
  - a `contextSnapshot` averages 7.5 KB stored (`pg_column_size`).
- **Egress estimate:** about 1 MB per bounded sampler run. 300 sampled turns would be about
  15 MB, roughly 0.3% of the 5 GB monthly free tier.
- **Shadow mode:** the turn-assembly shadow itself does no database I/O. Its slot call works from
  in-memory facts, and its log goes to Vercel, not Supabase.
- **All of today's traffic** (about 1,800 messages, about 900 chat turns, all accounts): roughly
  30–55 MB. That is about 1–1.6 GB/month if every day looked like today.
- **What this does not measure:** the Supabase billing meter itself. Dashboard page loads also
  count toward it (see the line above about the dashboard's own query). Read the meter in the
  Supabase dashboard to confirm.

## EGRESS-6 — measurement only: per-turn cost and free-tier headroom (2026-10-02)
Owner instruction: "keep egress size under free tier". No leak found; nothing changed in code.
Method: per-table `pg_stat_statements` row deltas (SELECTs grouped by the `FROM "public"."<table>"`
they read), weighted by measured row widths (`pg_column_size`: messages 552 B, spine_events 496 B,
asset_identity 369 B full / 87 B id+slug, topic_progress 190 B, mistake_records 191 B).
- **Every historical leak is still flat.** Over a 22.6-minute window (17:45:47 → 18:08:23 UTC),
  spine replay (2599099062474326428), the bootstrap prefetch and `IN (…)` reads, and the three
  EGRESS-5 `topic_progress` queryids grew by ~0; the three topic_progress totals (29.76M rows) and
  the capability replay (1,680 calls) are unchanged since the 2026-09-27 EGRESS-5 entry.
- **Live cost ≈ 33 KB of DB reads per chat turn.** The window read ≈ 4.3 MB while 262 messages
  (~131 turns) were written — dominated by the bounded history read (`take: 30` messages ≈ 16 KB),
  then asset/explanation/probe retrieval. 155 of the 262 messages came from disposable QA
  accounts; the rest from 3 sessions.
- **Headroom:** 5 GB/month ÷ 33 KB ≈ 150,000 chat turns/month (~5,000/day). A sustained 24/7 load
  equal to this QA-heavy window would project to ~8 GB/month, so the free tier holds for real
  learner volumes well above today's but not for round-the-clock synthetic QA. Keep QA runs bounded
  (a 6-concept weak-learner run ≈ 100 turns ≈ 3.3 MB).
- **Mathematics probe-depth campaign (same day):** +1,833 seed probes. The bounded prefetch
  (EGRESS-4) reads ~11k slugs × 87 B ≈ 1 MB per unconverged cold start; at ~150 rows per cold
  start the new rows converge in ~12 cold starts ≈ 12 MB once. Negligible against 5 GB.

## EGRESS-7 — user report "egress above 5 GB": measured attribution + the one live, growing read removed (2026-10-12)
Owner: "fix egress size which is above 5 GB". Method: the same two-snapshot `pg_stat_statements` delta (lifetime counters,
`stats_reset` 2026-07-05), widths from `pg_column_size` (topic_progress 6/8/14 columns 105/113/191 B, mistake_records 107/194 B,
messages 575 B, asset_identity 388 B, learn_sessions row 6,374 B of which `contextSnapshot` 6,034 B, explanation_assets 699 B,
probe_assets 684 B, spine_events 472 B). The Supabase billing meter itself is NOT readable through the MCP — the dashboard is the
only source for the cycle total, so the cycle figure below is an estimate, not the meter.
- **No historical leak has restarted.** Snapshot 2026-10-09 14:44 → 2026-10-12 15:44: spine replay (2599099062474326428)
  228,732 calls / 110,437,546 rows in both, +0; two of the three EGRESS-5 topic_progress shapes +0 (the per-turn memo holds:
  one read per turn); `pg_timezone_names` (Studio) +0.
- **Where the cycle's bytes went (confirmed from the data, estimated in bytes):** 2026-10-05 → 10-07 the `messages` table took
  73,672 rows (27,676 / 37,316 / 8,680) — about 36,800 chat turns — from twelve heavy synthetic accounts (`test1…test10`,
  `suaibamr5/6`; ~6,000 messages each, 4–5 sessions, 150 topic_progress rows, ~650 mistake_records, 4,100–4,700 evidence_events
  and ~13,000 spine_events each), i.e. the Mathematics (908 lessons) and English (216 lessons) real-learner campaigns. A heavy
  account costs roughly 65–90 KB of database reads per turn (topic_progress 8-column 150 rows ≈ 17 KB, 14-column 46 rows ≈ 9 KB,
  mistake_records ≈ 6 + 11 KB, history 21 messages ≈ 12 KB, session row 6.4 KB, asset lineage ≈ 15 KB) → **≈ 2.4–3.3 GB for those
  three days alone**; with the 10-04/05 `suaibamr` runs, QA accounts and dashboard use the 5 GB cycle quota is plausibly spent.
  Spent egress is not recoverable; the quota resets with the billing cycle.
- **Live rate today is ≈ 29 MB/day (≈ 0.9 GB/month):** the last three days read ≈ 86 MB for 2,350 turns (≈ 36 KB/turn, light
  accounts) — messages history 28 %, asset-lineage reads 17.5 %, learn_sessions row 17 %.
- **Found and fixed — the one live read that grows with use.** `captureGeneratedExplanation` / `captureGeneratedProbe` loaded the
  ENTIRE lineage of a `canonicalSlug` (every version, with its full text) to make a decision that reads exactly two rows (an exact
  `contentHash` duplicate and the highest version), and every non-duplicate capture adds a version. `phys.mech.friction` has 368
  versions (≈ 400 KB per capture); 30,436 AI-authored DRAFT explanations exist; the statement averaged 29 → 48 rows per call
  (≈ 52 KB per capture incl. the child rows) and was ≈ half of the live read volume. Now two single-row reads with a narrow
  `select`; same decision for every candidate (equivalence test against the full lineage) and constant bytes per capture
  (`src/tests/captureLineageEgress.test.ts`, 14 tests, incl. a 368-version lineage and a source pin forbidding `assetIdentity.findMany`
  in both capture functions).
- **Not changed, on purpose:** `messages` history (`take: 30`, the model's context), the session row (`contextSnapshot` is read by
  the turn), topic_progress (one memoized read per turn, EGRESS-5), retrieval (`ACTIVE`, `take: 50`).
- **Observation for the owner (not an egress fix):** the database is 717 MB (spine_events 283 MB, messages 144 MB, evidence_events
  66 MB, learn_sessions 41 MB) and 30,436 never-served DRAFT explanations are 30 % of the identity table. If the project is on the
  free plan, the 500 MB database limit — not only the 5 GB egress — needs a decision (pruning DRAFT lineages / old spine events is
  a data-retention call, not made here).
- **Budget rule for synthetic campaigns:** ~36 KB/turn light account, 65–90 KB/turn heavy account → 1,000 turns ≈ 36–90 MB. A
  campaign of tens of thousands of turns against production must be sized against the remaining quota first.
- **Re-measure after deploy** with the same delta on queryid 1960876089180252044 (canonicalSlug lineage; expect rows per call ≈ 1–2,
  not 48) and the `explanation_assets … IN ($1…$N)` content reads.
- **Interim re-measure, 2026-10-12 21:12 (BEFORE the capture-lineage fix is deployed; `snap4`, 5 h 27 min after `snap3`):** the
  spine replay (2599099062474326428) is still +0 (228,732 calls / 110,437,546 rows); across the 45 heaviest statements the whole
  window read 19,086 rows ≈ 3–4 MB (≈ 17 MB/day), dominated by 45 topic_progress reads of a heavy account (228 rows/call) —
  the read-volume rate stays an order of magnitude under the quota (5 GB ÷ 30 d ≈ 167 MB/day). The capture-lineage statement
  (1960876089180252044) still averages 20 rows/call (+37 calls, +746 rows) because the old code is what is deployed; the post-deploy
  value is recorded in the closure report. The 5 GB figure the owner sees is the cycle total (spent 2026-10-05 → 10-07), not a
  current rate; this window cannot lower it.
- **Post-deploy re-measure, 2026-10-13 11:43 (`snap5`; deployment `dpl_DfiW33EVTKByZMBMRYPkECGoX855`, commit `74f4207`, carrying the EGRESS-7
  fix; 14.5 h after `snap4`, a window that includes ~60 chat turns by this campaign's disposable accounts):** across the 29 heaviest
  statements the window read **5,710 rows** (≈ 1–2 MB — well under 5 MB/day against a 167 MB/day quota share); the spine replay
  (2599099062474326428) and the old whole-lineage statement (1960876089180252044) both **+0 calls / +0 rows**; the topic_progress read
  of a heavy account (444473988123706220) +26 calls / +84 rows (3 rows/call: the QA accounts are light). The bounded replacement
  (`asset_identity WHERE canonicalSlug AND family ORDER BY version DESC LIMIT n`, queryid -4499977664986539268) averages 0.27 rows/call.
  **Honest limit:** capture reads only happen when the tutor authors a new explanation/probe, which is a small share of turns, so this window
  does not exercise the old per-call 20–48-row pattern enough to prove the new 1–2-row value by measurement; what proves it is
  `captureLineageEgress.test.ts` (14 tests: no `findMany`, narrow `select`, a 368-version lineage reads two rows). Re-measure after
  real-learner traffic. The cycle total on the Supabase dashboard (spent 2026-10-05 → 10-07) is not readable through the MCP and cannot be lowered.
