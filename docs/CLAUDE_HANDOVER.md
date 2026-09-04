# Claude Handover Ledger

Persistent cross-Claude task ledger, maintained BY Claude. A new Claude should be
able to: `git pull` → read `CLAUDE.md` → read this file → verify current state →
continue from "Next action".

**Evidence rules.** `VERIFIED` = directly supported by repository, test, or
production evidence. `INFERRED` = reasoned, not measured. `UNKNOWN` = not
established. Repository evidence > this file > Claude memory. Never record
secrets, passwords, keys, or tokens here.

**Created 2026-09-04** (T-005). Entries before that date are reconstructed from
`CLAUDE.md` and this session's own measurements; they are marked as such.

---

## CURRENT STATE (update when new evidence contradicts it)

| Item | Value | Status |
|---|---|---|
| Branch | `main` (the only active branch) | VERIFIED |
| HEAD at time of writing | `bdabb62` + uncommitted R3 change (T-005) | VERIFIED |
| Production deployment | `bdabb62` (dpl_5pGSCxKHrS8KoDvZTk7grZteuWX8, READY) | VERIFIED |
| DB statement_timeout / lock_timeout | 30s / 15s, role-level on `postgres` | VERIFIED |
| Physics Tier A attempted | 175 of 238 concepts | VERIFIED |
| Physics Tier A verdicts | 92 CERTIFIED · 82 UNMEASURED · 1 FAILED_INSTRUMENT | VERIFIED |
| Chemistry / Tier B / Tier C | not started | VERIFIED |
| Certification protocol | `full-population-certification-v1`, harness `2.0.0-answer-source` | VERIFIED |
| Answer-source fingerprint | `probes:2750:h5e86a3a9` (unchanged across all batches) | VERIFIED |
| Manifest hash | `571dbcdcf906bf9dd8bef0fbacf81d6236ddfc2bdc87457eb23d410e1162278b` | VERIFIED |

**Untracked, deliberately, by standing owner instruction:**
`scripts/certification/runPhysicsBatch3_4Worker.ts`,
`runPhysicsBatch4_4Worker.ts`, `runPhysicsBatch5_4Worker.ts`, and
`scripts/certification/artifacts/physicsBatch5-4w-*.jsonl`. A repo stop-hook asks
for them on every turn; the owner has repeatedly declined. Do not commit them
without a fresh instruction.

---

## T-001 — Reliability diagnostic (R1/R2/R3/R4 identified)
**Date** 2026-09-04 · **Status** COMPLETED · **Commits** none (read-only)

**Objective.** Root-cause Prisma P2024 pool starvation surfacing as HTTP 500 on
`/api/learn/chat`, and the 42% UNMEASURED rate in physics Tier A.

**Findings (all VERIFIED).**
- **R1** `route.ts` ~L7983-8039: the topic-progress evidence write is awaited
  INSIDE an async IIFE that nothing awaited. A serverless instance freezes once
  its response is sent, so the implicit transaction stayed open holding its row
  lock. Production logs 2026-09-04T12:48:59–12:50:23Z: eight backends blocked on
  ShareLock 1s/9.8s/31s/42s/44s/71s/73s/84s, all on `INSERT INTO topic_progress
  … ON CONFLICT DO NOTHING`, every one the SAME userId and topicSlug.
- **R2** `poolConfig.ts` set `statement_timeout` as a bare URL parameter, which
  the Prisma Postgres connector ignores. Production had `statement_timeout=120000`,
  `lock_timeout=0`, and ZERO `57014` events against an INSERT measured at 83,994 ms.
- **R3** 63 UNMEASURED concepts: 60/63 model-invented MCQ served before any
  authored probe, 2 near-paraphrase, 1 options-mismatch; all 63 hold 5–15
  gradeable authored probes. Not a content gap.
- **R4** `certify.ts` breaks the turn loop on the first unanswerable MCQ.

**Decisions.** R4 deferred (changing the harness's refusal to guess would weaken
every CERTIFIED verdict). R3 escalated to its own investigation (T-004).

---

## T-002 — R1 + R2 implemented and deployed
**Date** 2026-09-04 · **Status** COMPLETED · **Commit** `5964709`

**Work.** 8 lines of behaviour.
- `route.ts`: capture the fire-and-forget IIFE's promise, settle it immediately
  before the reply (not inline — ~1,000 lines of awaited work run in between, so
  it is normally already resolved). `.catch` retained on the launch.
- `poolConfig.ts`: move both timeouts into `options=-c statement_timeout=… -c
  lock_timeout=…`, the only form Postgres adopts; `lock_timeout` bounded for the
  first time.

**Evidence (VERIFIED).** Local PostgreSQL 16 + installed `@prisma/client` 6.19.3:
old form → `statement_timeout=0`, `pg_sleep(5)` ran the full 5,128 ms uncancelled;
`options` form → `15s`/`8s`, cancelled at 1,070 ms with SQLSTATE 57014. Engine
binary scan: `connection_limit`/`pool_timeout`/`socket_timeout`/`pgbouncer`/
`options` present, `statement_timeout` absent.

**Tests.** `poolConfig.test.ts` 7→13; new `topicProgressEvidenceAwaited.test.ts`
(5). Negative control: 8 assertions fail pre-fix, pass post-fix.
Suite 552 files / 11,840 passed / 9 skipped; tsc clean; build clean.

**Production.** Deployed, `/api/health` db:true.

---

## T-003 — R2 made effective in production (role-level timeouts)
**Date** 2026-09-04 · **Status** COMPLETED · **Commit** `bdabb62` (diagnostic only)

**Blocker found (VERIFIED).** After deploying T-002, `/api/health` still read
`2min / 0`. Production connects through Supavisor in TRANSACTION mode
(`.env.example`: port 6543, `?pgbouncer=true`), which accepts the `options`
startup parameter and does not forward it.

**Dedicated app role REJECTED (VERIFIED).** Owner ran, from Windows:
`psql postgresql://authenticator.<ref>@…:6543/postgres` →
`FATAL: (ENOTFOUND) tenant/user authenticator.<ref> not found`. Supavisor routes
only the provisioned `postgres` user, so a custom role is not reachable.

**Applied (owner-authorized, option (a) of three offered).**
```
ALTER ROLE postgres SET statement_timeout = '30s';
ALTER ROLE postgres SET lock_timeout      = '15s';
```
Rollback: `ALTER ROLE postgres RESET statement_timeout; … RESET lock_timeout;`

**Blast radius accepted by owner.** Migrations run as the same `postgres` role
via DIRECT_URL, so a future `prisma migrate deploy` whose DDL cannot take its
lock within 15s will abort and fail the build. Loud, and reversible in one
statement pair. Supabase Studio introspection (max 35s measured) may also
intermittently error.

**Verification (VERIFIED).** `/api/health` 4/4: `statementTimeout "30s"`,
`lockTimeout "15s"`, db true, HTTP 200. NOTE for the next Claude: role settings
apply at CONNECT time, so an existing pooled backend keeps the old values;
verification polling itself kept that backend alive. It only took effect after a
quiet period let the pool drain. Expect the same lag on rollback.

**Also shipped:** `/api/health` now reports `dbTimeouts` (two `current_setting`
reads, read-only, non-fatal, gated behind a successful db check). Guarded by
`healthDbTimeouts.test.ts` (8).

---

## T-004 — Physics Batch 5 + R3 read-only diagnosis
**Date** 2026-09-04 · **Status** COMPLETED · **Commits** none

**Batch 5 (VERIFIED).** 25 concepts systematically sampled from the 63 UNMEASURED
(lessonOrder-sorted, indices 0,2,…,48). 4 workers, 4/7/7/7, serial within worker.
Run `physicsBatch5-4w-1788550977148`, 19:42:57Z→19:50:40Z.
- **19 UNMEASURED (76%) · 6 CERTIFIED (24%) · 0 FAILED_INSTRUMENT · 1 retry**
- 0 P2024, 0 57014, 0 55P03, 0 ShareLock, 0 pool errors, 0 HTTP 5xx
- 26 sessions (25 + 1 retry), 0 ACTIVE afterwards
- replay egress +140,552 rows ≈ 63.6 MB (batch 4: 64.9 MB) — no regression
- DB corroboration: 6 COMPLETED all with `conceptsMastered`, 19 IN_PROGRESS none
  claiming mastery

**Pre-registered prediction FALSIFIED.** Predicted "UNMEASURED at or near 100%";
actual 76%. Investigated rather than continuing.

**Why (VERIFIED).** Not an R3 error — a prediction-shape error. R3 describes a
policy window that PERMITS an invented MCQ; it never claimed the model emits one
every run. Statistics: pure-noise H0 (p=0.423 base rate) rejected, P(≥19 of 25)
= 6.5e-4; deterministic H0 (p=1.00) rejected by any certification at all. Cohort
propensity 0.76, 95% CI [0.59, 0.93].

**R3 control flow (VERIFIED).** `decideModelProbe` returns at step 3
(`phase-does-not-count`, serve TRUE) whenever `isProbeAttachablePhase(phase)` is
false — GUIDE and the mastery gates only — BEFORE availability (step 4) or policy
(step 5) are consulted. At DEMONSTRATE the gate was closed because
`phaseAllowsProbe` required `strugglingOnThisConcept`, so the selector never ran
and `authoredProbesExist` stayed `null`. Batch-5 signature: CERTIFIED 6/6
pendingMcq WITH assetId at PRACTICE/ask; UNMEASURED 18/19 WITHOUT assetId, 15 at
DEMONSTRATE/show + 4 at OBSERVE.

**Classification: (D) combination.**
- (A) INTENTIONAL and mastery-safe — the verified counters increment only in
  `case 'CHECK'` and `case 'PRACTICE'` of the fold, so there is nothing below
  GUIDE to corrupt. Test-pinned, with a recorded reverted prior attempt.
- (C) INSTRUMENTATION MISMATCH — the harness treats an unanswerable MCQ as
  terminal; the product treats it as an ordinary turn a learner answers and moves
  past. This is most of the 42%/76%.
- (B) GENUINE BOUNDED DEFECT — the invented MCQ IS graded next turn against the
  model's own key (`unauthoredKeyGrades`), so a learner can be told wrong-when-
  right on a concept holding 4–6 reviewed probes.

---

## T-005 — R3 implemented: DEMONSTRATE authored-probe substitution
**Date** 2026-09-04 · **Status** COMPLETED (not deployed) · **Commit** see below

**Objective.** Let the ladder gate attach an authored probe at DEMONSTRATE so a
server-keyed item SUBSTITUTES for the model's invented MCQ.

**Change (1 line of behaviour).** `route.ts` `phaseAllowsProbe`:
`(phaseBeforeTurn === 'DEMONSTRATE' && strugglingOnThisConcept)` →
`(phaseBeforeTurn === 'DEMONSTRATE')`; the now-unused `strugglingOnThisConcept`
const removed. OBSERVE untouched. `mayAttachProbeBelowGuide` (pool − 1 ≥ 3) is
now the SOLE guard on the early spend.

**Files.** `src/app/api/learn/chat/route.ts`;
tests amended in place with supersession recorded — `a2LadderGateReachability`,
`e1DemonstrateProbeReachability`, `e1ScopedToStrugglingLearner`,
`masteryReachability`, `gateAssessmentRouteWiring`;
new `src/tests/demonstrateAuthoredProbeSubstitution.test.ts` (29).

**Scope note.** The task named two test files to amend; THREE more carried the
same source pin. Amending all five was completing the authorized change, not
expanding it — no test's historical rationale was deleted.

**Evidence (VERIFIED).** All 19 Batch-5 UNMEASURED concepts hold 4–6 ACTIVE
gradeable probes at the served band and 19/19 clear pool − 1 ≥ 3, so the fix
would actually fire for every one of them.

**Mastery invariant (VERIFIED by test against the real fold).** A DEMONSTRATE
probe answered correctly advances the phase and leaves `verifiedCorrectAtCheck`
and `verifiedCorrectAtPractice` at 0; `masteryVerifiedStrict` false. Thresholds
unchanged (1 check / 2 practice; `CREDITS_REQUIRED_FOR_MASTERY` 3).

**Negative control (VERIFIED).** With `route.ts` reverted, all three primary test
files FAIL (3 tests); with it applied, all pass. The behavioural file initially
passed in BOTH states because its gate mirror was not coupled to the route — a
replica-drift trap — so a "mirror is coupled to the route" block was added and
the control re-run.

**NOT deployed. NO certification traffic run.** Batch 5 was not re-run.

**Remaining risk.** Some pure-teaching DEMONSTRATE turns will now gain an
authored question. Batch 5 says that set is small (15/15 DEMONSTRATE turns
already carried an invented question); it is not empty and is unmeasured post-fix.

---

## PENDING

| ID | Task | Notes |
|---|---|---|
| P-1 | Deploy T-005 and re-run a 25-concept cohort from the same 63 | Pre-register as a RATE with an interval, never "near 100%". Expect UNMEASURED to fall from 76% [0.59, 0.93] toward the OBSERVE-only residue (~16%); FAILED_INSTRUMENT and P2024 stay 0; confirm no concept loses reachability. |
| P-2 | Forward physics coverage | 63 concepts unattempted. Unblocked on infrastructure grounds (R1/R2 verified under load). |
| P-3 | Chemistry Tier A | Not started. 186 concepts. |
| P-4 | R4 (`certify.ts` stopping rule) | DEFERRED. Would need protocol re-freeze. The harness's refusal to guess is what makes CERTIFIED trustworthy — change last, if ever. |
| P-5 | OBSERVE-phase invented MCQs | ~4 of 19 Batch-5 cases. OBSERVE deliberately barred (diagnostic phase; a prior attempt broke 7 tests and was reverted). Owner decision. |
| P-6 | Migration-vs-`lock_timeout` risk from T-003 | Watch the first production deploy carrying a pending migration. Rollback is one statement pair. |
| P-7 | Untracked certification scripts + artifacts | Owner has declined committing them ~10 times. Resolve by committing or `.gitignore`. |

---

## NEXT ACTION FOR THE NEXT CLAUDE

T-005 is committed but **NOT deployed and NOT production-verified**. Next step is
P-1: get owner authorization to push/deploy (pushing `main` deploys production),
then run ONE 25-concept cohort drawn from the existing 63 UNMEASURED with the
prediction pre-registered as a rate + interval. Do not run Chemistry or Tier B/C
first, and do not change R4.
