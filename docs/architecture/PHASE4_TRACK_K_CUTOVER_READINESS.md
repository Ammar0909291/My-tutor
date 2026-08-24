# Phase 4 — Track K / EOS Cutover Readiness

**Document class:** Readiness assessment. Decides nothing; measures
everything it can and names the owner decisions it cannot take.
**Status:** ASSESSMENT COMPLETE · **NOT READY FOR CUTOVER** · three
independent blockers, two of which are one env-var away from *starting* to
clear.
**Companion:** `ISS_01_RESOLUTION_ANALYSIS.md` (objectives A–D).
**Production evidence:** read-only queries against the live database,
2026-08-24. No production data was modified. No production behaviour was
changed by this phase.

---

## 0. The finding that reframes everything below

The working assumption entering Phase 4 was: *"Shadow infrastructure already
exists. Much of Track K is implemented and running in shadow. What remains is
to read the measurements."*

The first half is true. **The second half is not.** Measured directly:

```sql
SELECT count(*) AS snapshots,
       count(*) FILTER (WHERE "contextSnapshot" ? 'kernelParity')       AS k3,
       count(*) FILTER (WHERE "contextSnapshot" ? 'enginePolicyParity') AS k4,
       count(*) FILTER (WHERE "contextSnapshot" ? 'verifierMetrics')    AS k5
FROM learn_sessions WHERE "contextSnapshot" IS NOT NULL;

-- snapshots=716  k3=0  k4=0  k5=0     (latest session updated 2026-08-23 22:21)
```

716 sessions carry a snapshot, 488 carry a ladder, traffic is current — and
**not one turn has ever been observed by the K3 shadow pipeline, the K4 policy
engine, or the K5 verifier.**

`ENABLE_KERNEL_PIPELINE`, `ENABLE_POLICY_PACKS` and `ENABLE_OUTPUT_VERIFIER`
are unset in production. (Environment variables are not readable from this
session; this is inferred from the writers' behaviour — route.ts writes
`kernelParity` on every turn where the shadow pipeline produces a policy, and
there are zero such rows against live traffic.)

So Track K is **implemented and untested against reality**, not "running in
shadow". K4's and K5's gates are not "waiting for enough data" — they are at
**zero turns**, and the measurement has not begun. That is good news
operationally (starting it is a flag flip with no learner-visible effect and
no data risk) and it is essential to state plainly, because "shadow is
running" and "shadow has never run" imply completely different next actions.

One consequence worth naming: **the K4 shadow measurement is nested inside the
`ENABLE_KERNEL_PIPELINE` block** (route.ts — `policyGate` is called from within
`if (process.env.ENABLE_KERNEL_PIPELINE && … !== '0')`). Setting
`ENABLE_POLICY_PACKS=shadow` alone records nothing. Pinned by
`k4PrimaryEntryCriteria.test.ts`.

---

## 1. The three blockers, and what each actually needs

| # | blocker | kind | who clears it |
|---|---|---|---|
| **B1** | ISS-01 ladder reconciliation | pedagogical decision | **owner** — Option A/B/C/D |
| **B2** | K4 `ENABLE_POLICY_PACKS=primary` | measurement + human review | owner enables shadow → engineering reads → owner accepts |
| **B3** | K5 `ENABLE_OUTPUT_VERIFIER=enforce` | false-positive measurement | owner enables log → corpus builds → reviewer adjudicates → owner accepts |

B2 and B3 are **not blocked on engineering**. They are blocked on an owner
turning on two observation-only flags, and then on the review the masterplan
already specifies. B1 is blocked on a decision no amount of measurement can
substitute for.

---

## 2. Objective E — K4 policy engine

### 2.1 What is proven

| claim | evidence | scope |
|---|---|---|
| Band 4 reproduces `decideNextMoveHeuristic` | `ladderParity.test.ts` — 6,912-scenario cross-product of the reachable counter space | complete, offline |
| all seven heuristic gates present and individually decisive | `ladderParity.test.ts` + `k4PrimaryEntryCriteria.test.ts` E1 | complete |
| zero move divergence engine vs adapter | `kernelSimulationEngine.test.ts` — full persona battery | synthetic learners |
| every decision byte-pinned | `goldenDecisionGrid.test.ts` (digest) + `goldenDecisionTable.test.ts` (20 reviewed rows) | complete |
| both phase vocabularies decide the same move | `k4PrimaryEntryCriteria.test.ts` E3 | complete |

The seven gates, confirmed one at a time against both the ladder and the pack,
each naming its own rule id in provenance:

1. two consecutive "I don't know"s → `B4.gate.consecutive-dont-knows.v1`
2. permanent prior-knowledge probe budget → `B4.gate.total-knowledge-probes.v1`
3. semantic loop break (repeated probe *intent*) → `B4.gate.repeated-probe-intent.v1`
4. observe-failure gate → `B4.gate.observe-failures.v1`
5. question budget, not failing → `B4.gate.question-budget.teach.v1`
6. question budget, failing → `B4.gate.question-budget.show.v1`
7. repeated struggle → `B4.repeated-struggle.show.v1`
   (+ the context-driven worked-example-first rule → `B4.worked-example-first.show.v1`)

Stage ceiling: one owner (`getStageCeiling`), asserted by
`goldenDecisionGrid.test.ts`. Vocabulary: BASE_PACK's Band-4 guards accept both
the legacy and canonical names and agree on the move for every phase; the
phase is passed **verbatim** by `policyInputsFromState` because translating
would change the ceiling (CHECK 4 → ASSESS 6), which is a TSM migration
decision, not a gate decision.

### 2.2 The limit of the parity claim — stated honestly

`ladderParity.test.ts` **skips** every scenario where Band-2 legality decided
the turn (`if (ladderBlockedReason(s) !== null) continue`). That is correct for
a Band-4 claim, and it means the engine's agreement with `questionLegality` is
**not** proven — because the engine does not compute it. BASE_PACK says so in
its own comment: the verdict arrives as the `askLegal` input, and "restating
QL-1…QL-4 as pack predicates would put the capability lattice in two places
and guarantee they drift."

**Consequence for the "one decision authority" goal:** promoting K4 to primary
does *not* collapse the runtime to one authority. `questionLegality` remains a
separate authority the engine consumes. That is a defensible design; it is not
what "K4 primary" sounds like, so it is written down here.

### 2.3 Entry criteria for `ENABLE_POLICY_PACKS=primary`

All six must hold. No new gate is proposed; every item is the masterplan's own
or a direct consequence of it.

| | criterion | measurable by |
|---|---|---|
| E-1 | `ENABLE_KERNEL_PIPELINE=1` **and** `ENABLE_POLICY_PACKS=shadow` in production for a sustained window | `scripts/eos/readiness-report.ts` → `sessionsWithEngineParity > 0` |
| E-2 | ≥ 500 turns compared on real traffic | reader → `enginePolicyParity.turnsCompared` |
| E-3 | zero field divergence across that corpus, or every divergence individually explained and accepted | reader → `byField` empty, verdict `READY` |
| E-4 | ISS-01 decided (B1) — the engine's stage ceiling depends on the phase vocabulary, so a primary engine before the ladder decision would bake in the ambiguity | this document + `ISS_01_RESOLUTION_ANALYSIS.md` |
| E-5 | an owner accepts the replay diff — the masterplan's literal wording, "reviewed and accepted" | owner sign-off, recorded |
| E-6 | rollback rehearsed: `ENABLE_POLICY_PACKS` back to `shadow` on a live instance, verified inert | drill |

**Verdict today: NOT READY — at E-1.** Not one turn measured.

### 2.4 The missing reader — now supplied

The K4 gate is a review of `contextSnapshot.enginePolicyParity`, which route.ts
writes and **nothing reads**. This phase supplies the reader:

- `scripts/eos/aggregate.ts` — pure cross-session fold of `kernelParity`,
  `enginePolicyParity`, `verifierMetrics`, plus the persisted-phase census.
  Tested by `src/tests/eosReadinessReader.test.ts` (15 assertions).
- `scripts/eos/readiness-report.ts` — read-only CLI (`--file` for offline,
  database otherwise). Two selected columns, one `findMany`, no writes.

It reports `INSUFFICIENT-DATA` rather than `READY` below 500 turns, and
`INSUFFICIENT-DATA` rather than `READY` when rejects exist but none were
reviewed — because "zero false positives out of zero reviews" is not evidence.

---

## 3. Objective F — K5 output verifier

### 3.1 Architecture already present

- 20 rule codes; `SEVERITY` splits them REJECT / STRIP / LOG. Only the
  **REJECT** set changes behaviour at enforce-time — 12 codes.
- `verify()` is pure, deterministic and total over (draft, context), which is
  what makes a **static recorded corpus** valid indefinitely: a recorded pair
  replays byte-identically and only goes stale when a *rule* changes.
- Two-attempt loop + template fallback (`loop.ts`, `templateFallback.ts`).
- `metrics.ts` already owns the SLO counters **and** the honest distinction
  between an inferred *candidate* and an adjudicated *verdict*.
- Log mode is byte-identical to the un-gated path — not even STRIP is applied
  — so a log-mode canary's behaviour differences are definitively not the
  verifier.

### 3.2 Definitions — fixed, in code

| term | definition |
|---|---|
| **REJECT-eligible** | a rule whose `SEVERITY` is `REJECT`. LOG/STRIP are out of scope; counting them would flatter the gate. |
| **True positive** | a REJECT a human reviewer judges CORRECT: the draft violated the Brain's decision and serving it would have taught worse. |
| **False positive** | a REJECT a human reviewer judges WRONG. This is the number the gate is about, because enforce pays for it with a wasted model call and, on a second failure, a template replacing real teaching. |
| **Candidate** | a log-mode REJECT whose *delivered* draft was followed by a clean learner turn. **Evidence, never a verdict.** |
| **Unreviewed** | a REJECT with no adjudication. Counted as UNKNOWN — never as a true positive. |

Implemented in `src/lib/kernel/verifier/corpus.ts` (pure; zero production
callers) and exercised by `src/tests/k5EnforceGate.test.ts` (29 assertions).

### 3.3 How the corpus is constructed

1. Enable `ENABLE_OUTPUT_VERIFIER=log` in production. Learner-visible
   behaviour is unchanged by construction.
2. Every turn folds into `contextSnapshot.verifierMetrics` (already wired).
3. Each turn's `(draftText, VerifierContext)` pair is captured for replay.
   **Gap:** there is no capture path for the pair today — only the aggregate
   counters. Either capture them, or reconstruct the context from the spine's
   `DecisionRecorded` event; the latter is preferable because it adds no
   writer.
4. A reviewer adjudicates a sample of REJECTs, prioritised by the
   candidate signal (a candidate is the cheapest place to look for a misfire).
5. `evaluateCorpus()` replays; `meetsEnforceGate()` answers go/no-go.

### 3.4 The gate

| constant | value | source |
|---|---|---|
| `minTurns` | 500 | masterplan K5 DoD |
| `maxAdjudicatedFalsePositives` | 0 | masterplan, "zero false-REJECT" |
| `maxRejectRate` | 5% | RS P-3 `cfg:driver.violationSlo` |
| `minReviewedRejects` | 30 (or all, if fewer) | this document — below ~30 reviews a 0/N result is consistent with a >10% true rate |
| `minRealDraftShare` | 80% production/simulation | this document — a corpus of authored fixtures proves the rules match their author |
| every REJECT-eligible code exercised | required | this document — an unexercised rule is one enforce can fire on having never been measured |

The last three are the only invented numbers, and each exists to close a way
of passing the gate without learning anything. The gate **fails on absent
evidence, not only on bad evidence** — 500 perfectly clean turns fail it,
because no rule was exercised.

**No rule was made stricter in this phase.** Making an unmeasured rule
stricter makes it riskier, not safer.

### 3.5 Rollback criteria (enforce mode, once on)

Any one ⇒ set `ENABLE_OUTPUT_VERIFIER` back to `log`. A flag flip; no deploy,
no data migration, because the verifier persists nothing a reader depends on.

| signal | threshold | why |
|---|---|---|
| reject rate | ≥ 10% | twice the RS P-3 SLO — a rule defect, not a model defect |
| **uncorrected share** | ≥ 5% | the number that measures harm: a template is a turn with no teaching |
| adjudicated false positives after enforcement | ≥ 1 | the entry gate required zero |

All three are derivable from the `VerifierMetrics` route.ts already folds — no
new instrument.

### 3.6 The unwired half — the one real gap in K5

| function | wired? |
|---|---|
| `foldVerifierMetrics` | **yes** — route.ts, so the SLO numerator/denominator accumulate |
| `foldFalsePositiveCandidate` | **no production caller** |
| `markAdjudicated` | **no production caller, and no review surface** |

Both are pure, tested functions. The gap is a **caller**, not a mechanism.
Without the first, a flagged turn's successor is never examined and every
reject must be reviewed blind. Without the second, a reviewer's verdict has
nowhere to go. Pinned by `k5EnforceGate.test.ts` §F6, which fails when either
gains a caller — at which point the claim should be updated to name it.

**Deliberately not fixed in this phase.** Wiring `foldFalsePositiveCandidate`
requires carrying "the previous turn was flagged" across turns and reading
distress/non-answer detection — a persisted-state and route change, which is
exactly the "opportunistic route.ts work" this phase forbids. It is specified
here so it can be done as its own small change with its own evidence.

**Verdict today: NOT READY — the corpus has zero source rows** and cannot
begin until log mode is enabled.

---

## 4. Objective G — production safety invariants

Twelve invariants, each with a named owning test file, each asserted live
against the real modules in `src/tests/cutoverSafetyInvariants.test.ts`.

| id | invariant | endangered by a ladder cutover? |
|---|---|---|
| G1 | `masteryVerified()` reachability | **YES** — ISS-01 D2/D4 |
| G2 | mastery thresholds (1, 2) | no |
| G3 | `questionLegality` QL-1…QL-5 | **YES** — QL-2/QL-5 branch on legacy phase names |
| G4 | `firstLessonGuard` hard limits | no |
| G5 | vAffirm safety floor, unconditional | no |
| G6 | `signalVerification` / strict mastery | **YES** — ISS-01 D5c |
| G7 | Evidence Spine, unconditional | no |
| G8 | `advanceConversationState` sole writer | **YES** — S5 is exactly that change |
| G9 | persisted `ConversationState` | **YES** — 8 of 10 canonical names wipe it |
| G10 | degraded-provider protections (P4/F7) | **YES** — ISS-01 D5b |
| G11 | Phase 1 persistence invariant (rederive folds against a fresh snapshot) | no |
| G12 | Phase 3 arbitration invariant (one deterministic authority) | no |

Two are unconditional in production regardless of every EOS flag, and both are
asserted as such:

- **The Evidence Spine** emits on every turn.
- **The vAffirm safety floor** runs ahead of the flagged gate. Its own comment
  records why: it originally lived inside an `else`, so it ran only when the
  full verifier was disabled, and a turn vAffirm rejects deterministically was
  served to a learner unchanged because the full gate was running in log mode.
  *A safety rule whose execution depends on another subsystem's mode is not a
  floor.* One scoped exception, by design: it does not run on turns served
  deterministically (memory / gate renderer / lesson-complete), which are not
  model drafts.

Flag posture, asserted: everything unset ⇒ nothing active; the master flag
implies **observation only** (`shadow` + `log`), never `enforce`/`primary`;
each of those requires its own explicit value.

**No invariant was weakened, and no threshold was changed, in this phase.**

---

## 5. Objective H — shadow / canary / rollback readiness

### 5.1 Four-way classification

**ALREADY IMPLEMENTED**

| item | where |
|---|---|
| shadow kernel pipeline, read-only, error-swallowing | route.ts + `kernel/pipeline.ts` |
| K3 parity observer (field-level, session-folded) | `kernel/parity.ts` |
| K4 policy gate in shadow, fed from the pipeline's own artifacts | `eos-runtime/policyGate.ts` |
| K5 log mode, byte-identical to un-gated | `eos-runtime/verifierGate.ts` |
| verifier SLO metrics folded per session | `verifier/metrics.ts` |
| golden decision tables — 20 reviewed rows + an exhaustive digest grid | `goldenDecisionTable.test.ts`, `goldenDecisionGrid.test.ts` |
| **10⁴-episode invariant battery** — 10,002 episodes / 120,024 turns, zero violations, ~2 s | `kernelSimulation.test.ts` |
| engine-shadow battery — zero move divergence across all personas | `kernelSimulationEngine.test.ts` |
| replay harnesses + drift guard | `transcriptReplay*.test.ts`, `replayDrift.test.ts`, `productionReplay.test.ts` |
| golden thread across CEKR → pack → decision → evidence | `goldenThread.test.ts` |
| degraded deterministic mode (template arm) | `eos-runtime/degradedMode.ts` |
| flag-based rollback for every EOS subsystem | `eos-runtime/flags.ts` |

**READY TO RUN** (exists; needs an owner action or an input)

| item | needs |
|---|---|
| K3/K4 shadow measurement on real traffic | `ENABLE_KERNEL_PIPELINE=1`, `ENABLE_POLICY_PACKS=shadow` |
| K5 log-mode measurement | `ENABLE_OUTPUT_VERIFIER=log` |
| readiness reader | a `DATABASE_URL` — new this phase, offline-tested |
| replay-diff review | shadow data to diff |

**MISSING**

| item | note |
|---|---|
| **cohort / canary infrastructure** | no `CohortAssignment` table, no cohort assignment code. The masterplan's 5→25→100% ramp **does not exist**. Flags are process-wide booleans. |
| **`PackRegistry` table** | `packRegistry` is in-memory and per-process. "Packs roll back by registry revert (one decision, no deploy)" is not implementable today. |
| **episode-boundary activation (ISS-02)** | `readEosFlags()` reads `process.env` at call time, documented as "never cached". Activation is per-**turn**, so a deploy can change a learner's regime mid-lesson. |
| **`foldFalsePositiveCandidate` / `markAdjudicated` callers** | §3.6 |
| **verifier corpus capture** | aggregate counters only; no `(draft, context)` capture path |
| **golden transcripts for the four named conversations** | the harness exists; the transcripts are not in the repository (`transcriptReplayFramework.test.ts` says so explicitly) |
| **readers for `kernelParity` / `verifierMetrics`** | supplied this phase (`scripts/eos/`) |

**BLOCKED BY HUMAN DECISION**

| item | decision |
|---|---|
| ISS-01 Option A/B/C/D | pedagogical |
| K4 primary | replay-diff acceptance |
| K5 enforce | false-positive corpus acceptance |
| retiring `machine.ts` / trimming `phases.ts` | touches `tsmStep.ts`'s declared landing pad and the masterplan's K3 item |
| enabling three observation-only flags in production | operational |

### 5.2 The rollback path, honestly

| change | rollback | reversible? |
|---|---|---|
| any EOS flag | unset it | **yes, instantly** — nothing persisted depends on it |
| K5 enforce → log | flag | yes |
| K4 primary → shadow | flag | yes |
| pack activation | none | **no** — no registry table; a pack change is a deploy |
| **ladder cutover that persists canonical phases** | flag reverts the code, **not the data** | **NO** — 8 of 10 stored canonical values are discarded on read, wiping ladders and revoking earned mastery (`conversationStateMigration.test.ts`) |

That last row is the single most important operational fact in this document.
Under the M1–M4 strategy (`ISS_01_RESOLUTION_ANALYSIS.md` §6.4) it never
arises, because no canonical value is ever written.

### 5.3 Recommended sequence

Each step is individually reversible and none touches learner-visible
behaviour until step 6.

0. **Decide ISS-01** (B1). Everything downstream depends on the phase
   vocabulary.
1. `ENABLE_KERNEL_PIPELINE=1` + `ENABLE_POLICY_PACKS=shadow`. Read-only.
2. Run `scripts/eos/readiness-report.ts` weekly. Burn K3 and K4 divergence to
   zero.
3. `ENABLE_OUTPUT_VERIFIER=log`. Byte-identical output.
4. Wire the two unwired metric folds; build the corpus; adjudicate a sample.
5. Owner reviews the replay diff and the corpus. Accept or reject, recorded.
6. Only then: `primary` / `enforce`, one at a time, with the §3.5 rollback
   criteria armed.
7. Only after 1–6, and only with an explicit decision: S5.

---

## 6. Objective I — architecture consolidation

Six lineages. Classification asserted from the call graph itself in
`src/tests/decisionAuthorityInventory.test.ts`, so "orphan" is a test result
rather than a memory.

| id | lineage | disposition | evidence |
|---|---|---|---|
| **L1** | legacy route + `conversationState` ladder | **KEEP** | the only path that decides a live turn; every gate is calibrated against it |
| **L2** | Brain Runtime (`understanding/*`) | **KEEP** | default ON, but its authority is exactly two forks — `serveFromMemory`, `serveLessonComplete`. Not a competing ladder. |
| **L3** | EOS Track K kernel + policy engine | **SHADOW** | read-only behind `ENABLE_KERNEL_PIPELINE`; intended future authority; promotion gated on measured parity |
| **L4** | canonical TSM (`kernel/tsm/machine.ts`) | **RETIRE** | zero production callers (the sole non-test reference is `kernel/index.ts`'s barrel re-export); ISS-01 D1–D7 |
| **L5** | Teaching Planner / Runtime Executor | **DELETE LATER** | `executeRuntime` has **no** caller; the planner is reachable only through `brainShadow`, itself gated on `BRAIN_RUNTIME_MODE` (default off) |
| **L6** | archived Eb pipeline (`educationalBrain/*`) | **DELETE LATER** | fire-and-forget behind a default-off flag; masterplan already schedules deletion after K4 parity, under its own ADR |

**Nothing is deleted or proposed for deletion in this change.** Deletion
requires proof that the replacement owns the same responsibility, and for L3
that proof is precisely the measurement that has not started.

L4's cut is partial and precisely scoped: `machine.ts` goes; from `phases.ts`,
`legacyToCanonical` / `canonicalToLegacy` / `PHASE_ORDER_10` / `STAGE_CEILING`
go; **`getStageCeiling` and `LEGACY_STAGE_CEILING` stay** — `BASE_PACK` imports
them.

Three properties asserted to hold while more than one lineage exists:

- exactly one module exports `advanceConversationState`;
- every shadow lineage sits inside a swallowing `catch`, so it cannot reach the
  response;
- exactly one module owns a mastery threshold.

**The goal — one eventual decision authority — is not reached by K4 primary
alone.** `questionLegality` remains a separate authority the engine consumes
(§2.2). Reaching one authority requires that consolidation too, and it is not
in scope for this phase.

---

## 7. Objective J — protected content

Untouched, verified by `git status`: Knowledge Graph, Educational Brain,
Blueprints, curriculum, authored teaching assets, visual assets, mastery
thresholds, certification criteria, database schema, provider/model
configuration, detector regexes, transcript-specific guards. No knowledge-gap
architecture and no remediation architecture was created.

---

## 8. Human decisions

### DECISION 1 — ISS-01 (the important one)

Stated in full in `ISS_01_RESOLUTION_ANALYSIS.md` §7. Recommendation:
**Option C** (retire the unwired machine; keep the shipping ladder; re-derive
a 10-state ladder later from the shipping semantics, as a curriculum design
task, if it is genuinely wanted). Not self-executing.

### DECISION 2 — enable the three observation-only flags in production

**QUESTION.** Set `ENABLE_KERNEL_PIPELINE=1`, `ENABLE_POLICY_PACKS=shadow`,
`ENABLE_OUTPUT_VERIFIER=log` in production?

**OPTIONS.** (a) all three now; (b) kernel+policy first, verifier later;
(c) none — leave Track K unmeasured.

**TECHNICAL CONSEQUENCE.** (a)/(b): read-only. The kernel block is wrapped in
a catch that swallows everything; the policy gate returns `ran: false` on any
internal failure; log mode is byte-identical to the un-gated path, not even
applying STRIP. Cost is microseconds of pure computation plus a few counters
on an already-persisted JSON column. (c): K4 and K5 remain permanently
unmeasurable, and Track K's remaining milestones cannot be closed.

**PEDAGOGICAL CONSEQUENCE.** (a)/(b): none — no learner receives a different
turn. This is the whole design intent of the two-step flags. (c): the runtime
keeps accumulating engines nobody can prove are safe to promote, which is how
the current situation arose.

**RECOMMENDED OPTION.** (b), then (a) a week later.

**WHY.** Kernel+policy answer "would the engine have taught the same turn?",
which is the question blocking two milestones, and their measurement is the
cheapest thing in the system. Separating the verifier by a week keeps the
attribution clean: if anything about the service changes, there is exactly one
new variable in play at a time. Note the dependency — `ENABLE_POLICY_PACKS`
alone records nothing without `ENABLE_KERNEL_PIPELINE`.

### DECISION 3 — wire the two unwired verifier metric folds

**QUESTION.** Add production callers for `foldFalsePositiveCandidate` and
`markAdjudicated`?

**OPTIONS.** (a) wire both as a small dedicated change; (b) wire the candidate
fold only, adjudicate out-of-band via the readiness reader; (c) leave both.

**TECHNICAL CONSEQUENCE.** (a) touches route.ts (carrying "previous turn was
flagged" across turns) and adds a small review surface. (b) is about half the
work and keeps the reviewer's workflow in a script. (c) means every K5 reject
must be reviewed blind, which makes a 500-turn corpus far more expensive to
adjudicate.

**PEDAGOGICAL CONSEQUENCE.** None directly — all three are measurement. The
indirect consequence of (c) is that enforce mode gets approved on a thinner
review, which is where a false REJECT reaches a learner as a template.

**RECOMMENDED OPTION.** (b) now, (a) only if the reviewer's workload proves it
necessary.

**WHY.** The candidate signal is what makes adjudication *targeted* rather
than random, and it is the cheaper half. Adjudication itself is a human
activity happening a handful of times a week; it does not need a runtime
writer to be useful. Deliberately not done in this phase: it is a route change
and this phase's rule is not to make one opportunistically.

### DECISION 4 — cohort/canary infrastructure

**QUESTION.** Build the 5→25→100% cohort ramp the masterplan assumes?

**OPTIONS.** (a) build `CohortAssignment` + assignment logic before any
primary/enforce promotion; (b) promote with process-wide flags and rely on
instant rollback; (c) defer until after ISS-01.

**TECHNICAL CONSEQUENCE.** (a) is an additive table plus assignment code and a
flag read that depends on the learner — real work, and it makes every
promotion reversible for 95% of learners by construction. (b) means every
promotion is all-or-nothing, mitigated only by how fast the flag is noticed
and flipped. (c) costs nothing now.

**PEDAGOGICAL CONSEQUENCE.** (b)'s exposure is the whole population for the
duration of the detection window. For K5 enforce specifically, the failure
mode is a learner receiving a template instead of a lesson — recoverable, but
it is the failure mode the ramp exists to bound.

**RECOMMENDED OPTION.** (c) now, (a) before K5 enforce, (b) acceptable for K4
primary.

**WHY.** K4 primary changes which of two decisions — both produced by rules
already proven equivalent offline — drives the turn; if parity is zero across
500 real turns, the residual risk is genuinely small and instant rollback is
proportionate. K5 enforce can replace a lesson with a template, which is a
different class of harm and deserves a bounded blast radius. Doing this before
ISS-01 would build a ramp for a rollout whose content is undecided.

---

## 9. Closure

Phase 4 is an assessment, and the assessment is complete. **The system is not
ready for cutover, and S5 must not proceed.**

**Do not read "tests pass" as "ready for S5".** Everything in this phase is
offline proof and production measurement of *current* state. S5 requires an
owner decision on ISS-01 plus K4/K5 evidence that does not yet exist because
the measurement has never been switched on.

### Exact prerequisites for S5

1. ISS-01 decided and recorded (Decision 1).
2. If the decision is A or B: D4 closed — no absorbing state under the move
   layer, proven by simulation; D5 closed — the evidence vocabulary carries
   `degradedTurn` and the verification status; D6 closed — one ceiling
   authority and `checkEpisode` I-1 shown to still fire; D1/D2/D3/D7 closed.
3. `ladderConformance.test.ts` D2 expectation inverted; its D3 count and
   `ladderReconciliation.test.ts`'s UNEXPLAINED count both at 0.
4. M1–M4 adopted in writing, with the §5.2 rollback asymmetry accepted.
5. K3 parity zero across ≥ 500 real turns.
6. K4 entry criteria E-1…E-6 met.
7. K5 gate met, or S5 explicitly scoped to exclude the verifier.
8. All twelve G-invariants green, with the six endangered ones re-proven under
   the new ladder.
9. Explicit owner approval, recorded.

If the decision is **Option C**, items 2, 3 and 5–7 collapse: there is no
second ladder to reconcile, and S5 as originally specified is withdrawn rather
than satisfied. That is the recommendation.
