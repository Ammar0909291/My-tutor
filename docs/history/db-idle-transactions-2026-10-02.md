# Idle-in-transaction connections blocked chat turns — 2026-10-02

## What happened (measured)
- **17:59:59 UTC:** a chat turn returned 500 "AI service temporarily unavailable".
  - The real cause was a database write timeout. `chat-assistant-message timed out after 8000ms`
    was logged twice.
  - The label is wrong: this is a DB failure, not an AI failure. That mislabel is still open.
- **18:00:19 UTC:** a 503 from a `chat-session-load` timeout.
- **`pg_stat_activity` at the time:**
  - 8 connections were "idle in transaction", one for up to 658 s, and 2 more were "idle in
    transaction (aborted)". All came through Supavisor.
  - Their last statements were `spine_events` INSERTs, an `explanation_assets` INSERT, an
    aborted `student_progress` INSERT, and plain BEGINs.
  - Locks: 20 held, 0 waiting.
- **Postgres had no idle-transaction limit:** `idle_in_transaction_session_timeout` was 0, which
  means off.

## Cause
- The chat route started several database writes without awaiting them:
  - the evidence-spine append (`spine_events`);
  - `appendEvidenceEvent` (`evidence_events`);
  - generated-lesson capture (`ingestGeneratedLesson` → `explanation_assets` / `probe_assets`);
  - `mistake_records`, `memory_serving_events` and `teaching_strategy_events`;
  - the visual verdict, decline and figure cache writes;
  - the Educational Brain side-car.
- A serverless instance is frozen the moment its response returns. A write still in flight at
  that point keeps its transaction open, and holds its row locks, until something kills the
  connection.
- The same class of bug had already been fixed one write at a time:
  - RC-B: the snapshot write;
  - R1: the topic_progress and student_progress writes.
- These writers were the ones still left.

## Fixes
1. **Database setting.** Owner said "Try again" twice, taken as approval; recorded here.
   - Applied: `ALTER ROLE postgres SET idle_in_transaction_session_timeout = '60s'`.
   - Verified in `pg_roles.rolconfig`.
   - It applies to new connections. A transaction left idle for more than 60 s is now ended by
     Postgres, so frozen instances can no longer hold locks for minutes.
   - Undo: `ALTER ROLE postgres RESET idle_in_transaction_session_timeout`.
   - By the time the setting was applied, the 8 stuck connections had already cleared on their
     own.
2. **Code** (owner: "Yes, do the code fix for the background writes"). New module
   `src/lib/db/pendingWrites.ts`:
   - `withPendingWrites` opens a request scope (AsyncLocalStorage, the same pattern as
     `requestMemo.ts`).
   - `trackWrite(p)` records a write the caller does not await. Outside a scope it does nothing,
     so other routes and tests are unchanged.
   - `settlePendingWrites(capMs)` waits for every recorded write, including writes recorded while
     it waits. It is capped at 3 s per reply and logs `[pending-writes]` when it hits the cap.
   - The chat route's `POST` now runs inside the scope and settles before returning. That covers
     every return path, including the route-deadline 503.
   - Every un-awaited writer listed above now records its promise.
   - Test: `src/tests/backgroundWritesSettledBeforeReply.test.ts`.
     - The spine, evidence and mistake writes are made 250 ms slow.
     - Before the fix, 4 were still running when the turn returned. After it, 0.

## Not changed
- **The cold-start asset bootstrap in `src/instrumentation.ts`.** Fixed afterwards; see
  "Follow-up: the bootstrap starts no DB step after its deadline" below.
- **The 500 "AI service" label on DB timeouts.** Fixed afterwards; see the next section.

## Production verification (2026-10-02 23:54–23:59 UTC)
- **Deployment:** `dpl_6bb4bbdds4FRZ5wLua7StJS5XHDF` at `56076115`, which contains `9c34e612`.
- **Traffic:** a disposable account (`scripts/qa/shadowSampleRun.ts`) drove 2 chemistry lessons
  with 6 graded answers. The account was deleted afterwards (`reloginBlocked: true`).
- **Chat requests:** 16 POSTs to `/api/learn/chat`, all 16 returned 200.
- **`[pending-writes]` warnings:** 0. No reply hit the 3 s cap.
- **Writes landed, one set per turn:**
  - 16 distinct `spine_events` turns (71 rows, 16 `AssistantRendered`);
  - 16 `memory_serving_events`;
  - 23 `evidence_events`.
- **`pg_stat_activity` during the run:** sampled 5 times. Every chat connection's
  "idle in transaction" period was 1.3 s or less.
- **The 60 s limit fired once,** at 23:55:41 UTC: "terminating connection due to
  idle-in-transaction timeout".
  - That backend's last statement was the cold-start bootstrap's two-COUNT completeness probe on
    `asset_identity`. It runs as a batch `$transaction`.
  - The same cold start logged "asset bootstrap: 12000ms boot deadline reached — continuing in the
    background".
  - So the bootstrap still leaves transactions open when its instance freezes. It is now ended
    after 60 s instead of holding locks for minutes, but it remains the one known source.

## Follow-up: a DB timeout is no longer labelled an AI error
- **Cause:** the chat route's inner `catch` turned every error inside a turn into
  500 "AI service temporarily unavailable". That included the 17:59:59 DB write timeout.
- **Fix:** that `catch` now re-throws three kinds of error to the outer handler, which already
  reports them as a retryable 503 with a `kind`:
  - `TimeoutError` from the DB guards; provider timeouts use a separate `AITimeoutError`;
  - `RouteDeadlineError`;
  - DB connection errors (`isDbConnectionError`).
- **Unchanged:**
  - Provider failures never reached that `catch`; they are served as degraded copy with a 200.
  - Any other error keeps the existing 500.
- **Test:** `src/tests/dbTimeoutNotLabelledAiError.test.ts`.
- **The coach route (`src/app/api/coach/route.ts`), checked 2026-10-03:**
  - Its "AI service" `catch` wraps only the provider call, and the route touches no database, so
    that label is accurate.
  - The real mislabel there was the outer `catch`: a body that failed validation, or was not
    JSON, got 500 "Internal server error". It now gets 400 "Invalid request".
  - Test: `src/tests/coachRouteErrorLabels.test.ts`.

## Follow-up: the bootstrap starts no DB step after its deadline (2026-10-03)
- **Cause** (the 23:55:41 kill above):
  - `register()` awaited the bootstrap for 12 s, then let it continue "in the background".
  - The bootstrap began its completeness probe (a batch `$transaction` of two COUNTs) after the
    deadline.
  - The request that cold-started the instance returned, and the instance froze
    mid-transaction.
- **New module `src/lib/db/stopAfterDeadline.ts`:**
  - `stopAfterDeadline(client, run)` wraps the Prisma client. Once `run.abandoned` is set, every
    model method and every `$`-method throws `WorkAbandonedError` before it reaches the database.
  - `runWithDeadline(work, { deadlineMs, settleMs })` marks the run abandoned at the deadline.
    It then waits up to `settleMs` (default 3 s, `ASSET_BOOTSTRAP_SETTLE_MS`) for the step already
    in flight to finish.
  - Outcomes: `finished`, `stopped` or `still-running`. Only `still-running` logs a warning;
    the 60 s Postgres limit stays the backstop for it.
- **The write phase is one group:**
  - It starts only if the deadline has not passed.
  - Once started, it is allowed to finish (`run.flushing`). It writes identity rows, then their
    content rows, and stopping between the two would leave hollow identities.
- **Unchanged:** no query was added or changed, so egress is the same. The two-COUNT probe and the
  bounded prefetch are untouched.
- **Checked against a real `PrismaClient`:**
  - live calls reach the engine;
  - abandoned calls are refused;
  - the write group passes.
- **Tests:**
  - `src/tests/bootstrapStopsAtDeadline.test.ts`.
  - `edgeBundleExcludesSeedCorpora` pins now point at `runWithDeadline`, which is where the race
    and the `unref`'d timer now live.
