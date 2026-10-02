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
- **The cold-start asset bootstrap in `src/instrumentation.ts`.** It is still fire-and-forget at
  `register()` and has its own boot deadline. It may also have left an `explanation_assets`
  transaction open. Read `docs/history/egress-incidents.md` before touching it.
- **The 500 "AI service" label on DB timeouts.** It is still open.
