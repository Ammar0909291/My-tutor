# Durable Per-Concept Learner State — staleness audit of ADR 10

**Status:** AUDIT + CONDITIONAL PLAN. No code, no migration, no implementation. One new file.

**Scope:** `docs/architecture/TUTOR_REMEDIATION_PLAN.md` "Item 4 — Four primitives", sub-item 4.
Source design under audit: `docs/architecture/ADR_10_STUDENT_MEMORY_ARCHITECTURE.md` (Proposed,
2026-07-02, read in full).

**Date:** 2026-09-16. **Branch:** `main`. **Measured against:** `624b469`.

**Sequence:** Items 1-2 shipped. Item 3 stopped after its own Batch 4 when the rule never fired —
the outcome its design doc predicted and prescribed stopping for. This pass applies that same
discipline to Item 4's source material *before* committing design effort.

---

## 0. Central finding, in one sentence

**ADR 10's diagnosis still holds exactly, but its prescription is materially stale: the migration
this item is named for was already shipped on 2026-07-07, and the semantics of the store it
proposes have since been implemented by a different, live mechanism (`studentIntelligence.ts`,
explicitly "Storage: NONE") — so the real question is not "write these tables?" but "which of two
already-existing learner-state mechanisms is canonical?", which is an owner-level fork ADR 10
could not have anticipated and did not decide.**

Four claims audited; **two stale, one inverted, one confirmed**:

| Claim | Verdict |
|---|---|
| "the only item needing a migration" (`TUTOR_REMEDIATION_PLAN`, echoed in the task) | **STALE — the migration is DONE.** Both tables were created in `20260707120000_sync_untracked_schema_drift`, five days after ADR 10 was written, and extended additively in `20260801000000_wp4_persistence_carriers`. Item 4 needs **no** schema change (§1.1) |
| ADR 10 Phase 2b "migrate readers" is future work | **STALE — partly done.** A live reader exists at `route.ts:1754`, labelled "W2-3 (ADR 10 Phase 2b)". It has been returning `null` since it was written (§1.3) |
| Writing the data would be inert ("half-built" risk) | **INVERTED — it would NOT be inert.** There is a live, *unsuppressed* consumer path to the system prompt (§4). The risk is the opposite one: a **second source of truth** (§5) |
| ADR 10's diagnosis — fragmented writers, `TopicProgress` worst | **CONFIRMED, unchanged.** `TopicProgress` still has exactly 4 runtime writers; `RetentionMetric`/`ReviewSchedule` still have exactly 1 each. Single-writer ownership still works where applied (§1.2) |

And, matching Item 3's decisive test — *would this have caught what actually went wrong?*

> The one recorded mastery-divergence incident in this repository
> (`masteryCounterDisplayDivergence.test.ts`, real account, twice) is a divergence **inside one
> surface** — the plain-vs-verified counter split within `ConversationState` — not the
> cross-surface fragmentation ADR 10 diagnoses. **`ConceptMasteryRecord` would not have prevented
> it.** (§7.1)

**Recommendation: do not commission Item 4 as scoped.** Resolve the fork first (§5), which is a
one-session audit-and-decide, not a 3-4 session build. If the fork resolves toward the derived
model — which §7 argues it should — Item 4 as written should be **closed, not deferred**, and ADR
10 marked partially superseded.

---

## 1. Staleness audit

### 1.1 The schema already exists, and matches ADR 10 field-for-field

ADR 10 §4.3 proposes a `ConceptMasteryRecord` interface. The real Prisma model:

| ADR 10 proposed | In `prisma/schema.prisma` | Match |
|---|---|---|
| `userId`, `conceptId` | `@@id([userId, conceptId])` | ✅ |
| `masteryScore: number` (0-1) | `masteryScore Float @default(0)` | ✅ |
| `decayedScore: number` (0-1) | `decayedScore Float @default(0)` | ✅ |
| `masteryConfidence: number` | `masteryConfidence Float @default(0)` | ✅ |
| `masteryLevel: MasteryLevel` | `masteryLevel MasteryLevel @default(NOT_STARTED)` | ✅ |
| `lastProbeOutcome: 'pass'\|'fail'\|'partial'\|null` | `lastProbeOutcome String?` | ✅ |
| `lastSeenAt`, `attemptCount`, `sampleSize` | present | ✅ |
| — | `adaptationState Json?` | **added later** (WP-4 / AH-2) |
| — | `representationDependence String?` | **added later** (WP-4 / VH-8) |

`ActiveMisconception` matches ADR 10 §4.3's interface **exactly** — all nine fields, plus a
`MisconceptionStatus` enum with ADR 10's four states.

Both were created by **`prisma/migrations/20260707120000_sync_untracked_schema_drift/migration.sql`**
(lines 516, 548) — dated 2026-07-07, five days after ADR 10. `vercel.json` runs
`prisma migrate deploy`, and CLAUDE.md records production's `_prisma_migrations` verified
applied 1:1.

The two later columns arrived in `20260801000000_wp4_persistence_carriers`, whose own header is a
model of the discipline this programme uses:

> *"ADDITIVE ONLY. Four nullable columns on two existing tables. No table is created, no column is
> dropped or retyped… and **nothing writes these columns yet**. NULL means 'not yet captured' for
> every one of them."*

**So ADR 10 Phase 2a steps 2 and 3 are complete.** The task's premise — *"the only item needing a
migration"* — is false. Whatever Item 4 becomes, **it is not a migration.**

### 1.2 ADR 10's diagnosis is confirmed, unchanged

Runtime writers today (`src/`, excluding `scripts/` and tests):

| Surface | ADR 10 said | Today | Verdict |
|---|---|---|---|
| `TopicProgress` | "at least four writers… most bug-prone" | **4** (`assessment/evaluate`, `curriculum/progress`, `topic-progress`, `topicProgressEvidence.ts`) | unchanged |
| `RetentionMetric` | "single writer — Permanent Rule 14" | **1** (`memory/update-pipeline.ts`) | **Rule 14 holds** |
| `ReviewSchedule` | "single writer — Permanent Rule 14" | **1** (`memory/update-pipeline.ts`) | **Rule 14 holds** |
| `MistakeRecord` | "`route.ts`, assessment routes" | **4** | unchanged in kind |

ADR 10's core argument — *"single-writer ownership works; scattered ownership fails"* — is still
supported by the code. Nothing here is stale.

### 1.3 The reader exists and has always returned `null`

`src/app/api/learn/chat/route.ts:1744-1760`:

```ts
// W2-3 (ADR 10 Phase 2b): read ConceptMasteryRecord for the active concept.
if (process.env.ENABLE_CONCEPT_MASTERY_READ === '1') {
  try {
    const cmr = await prisma.conceptMasteryRecord.findUnique({ … })
    if (cmr) conceptMasterySnapshot = cmr
  } catch { /* non-fatal: … degrade to existing behavior */ }
}
```

Two gates, each independently sufficient to make it a no-op:

1. `ENABLE_CONCEPT_MASTERY_READ` appears in **no** `.env.example` entry and in no config —
   grep finds it in exactly two places: this line, and a docs table listing flag names.
2. Zero writers, so even with the flag on the query returns `null`.

**Writers, verified:** `grep -rnE "conceptMasteryRecord\.(create|upsert|update|createMany|updateMany)|activeMisconception\.(…)" src/ scripts/` → **0 matches.** Confirmed still true.

### 1.4 ADR 10's six stores, today

| # | Store | ADR 10 | Today | Status |
|---|---|---|---|---|
| 1 | Session Memory | typed `contextSnapshot` fields | `src/lib/memory/sessionMemory.ts` exists, headed *"W1-2 (ADR 10 Phase 1)… **No production code is changed by this file** — it is a type-only addition."* | **scaffold only.** And its `lessonStageProgress` key has zero writers anywhere in `src/` (found by this programme's Turn Contract audit) |
| 2 | Student Memory | `ConceptMasteryRecord` + `ActiveMisconception` | tables exist, **0 writers**; semantics implemented elsewhere (§3) | **superseded in practice** |
| 3 | Knowledge Memory | the KG (ADR 05-06) | live | ✅ — never ADR 10's to build |
| 4 | Teaching Memory | Evidence Engine (ADR 13) | `evidenceEvent` 0 writers / 1 reader · `assetScore` 0/0 · only `evidenceRecord` partly live (2 writers, 4 readers) | **mostly dead** |
| 5 | Brain Memory | `BrainConfig` policy store | model exists, **0 writers and 0 readers** | **fully dead** |
| 6 | Long-term Memory | snapshot worker | no such worker exists anywhere in `src/` or `scripts/` | **absent** |

**Of ADR 10's six stores, one is live (the one it did not design), one is partly live, and four
are dead or absent.** This is not a small drift; it is the architecture largely not having been
built, while the *schema* for it was.

---

## 2. Where a per-concept mastery claim exists today

| Mechanism | Grain | Storage | Live? |
|---|---|---|---|
| `ConversationState.correctAtCheck / correctAtPractice` (+ `verified*` twins) | per concept, **per session** | `contextSnapshot` JSONB | **YES — the authority** |
| `TopicProgress.masteryPct` | per topic slug, durable | Postgres | **YES** — 4 writers, 25 readers |
| `RetentionMetric` / `ReviewSchedule` | per concept, durable | Postgres | YES, single-writer |
| `studentIntelligence` `ConceptState` (incl. `forgettingRisk`) | per concept, durable | **derived on read** | **YES** (§3) |
| `ConceptMasteryRecord` | per concept, durable | Postgres | **NO — 0 writers** |
| `EbLearnerConceptMastery` / `EbLearnerActiveMisconception` | per concept, durable | Postgres | **NO — 0 writers.** A *second* dormant copy of the same idea (§10.1) |

---

## 3. The mastery model: ADR 10 vs. what actually computes mastery

### 3.1 ADR 10's continuous model is not how mastery is decided

ADR 10 §4.3 proposes a Bayesian continuous score:
`masteryScore += step × probeDifficulty × (1 - masteryScore)`, with
`decayedScore = masteryScore × exp(-Δt / halfLife)`.

The live authority is a **counter pair**, not a score (`masteryGate.ts:40-48`):

```ts
export const MASTERY_CHECK_REQUIRED = 1
export const MASTERY_PRACTICE_REQUIRED = 2
export function masteryVerified(state) {
  return state.correctAtCheck >= 1 && state.correctAtPractice >= 2
}
```

with `masteryVerifiedStrict` requiring `verified*` counters, which advance only on
`evidence.serverGraded === true`. That invariant is proved over **49,152 states** in
`masteryCounterInvariant.test.ts`. There is no continuous score, no Bayesian update, no
`probeDifficulty` term, and no threshold — mastery is a **discrete, evidence-gated predicate**.

**These are not the same model, and they are not trivially reconcilable.** ADR 10's is a
regression-capable scalar; the live one is a monotone high-water counter that *deliberately* never
decays within a concept. Populating `masteryScore` requires choosing a derivation from counters
that ADR 10 does not specify and the live code does not imply.

### 3.2 But ADR 10's decay law **is** implemented — under another name

`src/lib/teaching/studentIntelligence/studentIntelligence.ts:189-191`:

```
/** Forgetting risk: 1 − 2^(−Δt/halfLife), with the half-life scaled by how
 *  ... decayedScore law read as risk instead of score. */
```

It cites ADR 10's own law and inverts it. `effectiveHalfLifeDays(passRate, base)` scales the
half-life by observed pass rate (15d at 0%, 45d at 100%, base 30) — **a refinement ADR 10 deferred
to the Evidence Engine.**

And the module's header states the architectural choice explicitly:

> *"**Storage: NONE.** The profile is derived on read from the existing evidence surfaces
> (EvidenceEvent, TeachingStrategyEvent, TopicProgress, MistakeRecord — all via the Evidence
> Reader). **No new tables, no duplicate learner store**; ADR 10's stores remain the runtime
> containers."*

This is the single most important sentence in the audit. A later piece of work implemented ADR
10's Store-2 semantics — per-concept state, decay, misconception activity — and **deliberately
chose not to store them**, while politely deferring to ADR 10's tables it was not populating.

### 3.3 `studentIntelligence` is live in production

```
/api/learner/review-queue  →  loadReviewQueue(userId)
                           →  loadStudentIntelligence(userId, { now })     ← the derived profile
                           →  scheduleReviews(profile, …)
```

`spacedRetrievalScheduler.ts` consumes `profile.activeMisconceptions` (line 164) and
`c.forgettingRisk` (line 178) to rank the review queue; `hasActiveMisconception` adds `+0.3` to
priority. It is also imported by `route.ts`.

**So ADR 10's `ActiveMisconception` semantics are already serving learners — derived from
`MistakeRecord`, not from the table named for them.**

---

## 4. Is anything blocked? The data would **not** be inert

This is the question the task asked to trace concretely, and the answer inverts the expected one.

```
ConceptMasteryRecord.decayedScore
  └─ route.ts:1768  weak_concepts += activeConcept  (when decayedScore < 0.7)
  └─ route.ts:1774  retention_score = decayedScore × 100
       └─ decide(student, concept, history)                       — teaching-engine/index.ts:197
            ├─ decideMode()        reads weak_concepts, retention_score   (lines 43-52)
            └─ selectNextConcept() reads weak_concepts                    (lines 83-87)
                 └─ returns { next_concept, action_type, mode, difficulty, estimated_time, goal }
                      ├─ L1806  TEACHING ENGINE DECISION block   ── SUPPRESSED by default
                      ├─ L1849  buildActionProcedureBlock        ── SUPPRESSED by default
                      ├─ L1892  getTeachingAction(decision, …)   ── runs; its BLOCK suppressed
                      └─ L1915  getLessonPlan(decision, …)
                           └─ L1950/1955  buildLessonPlanBlock(lessonPlan)
                                └─ systemPrompt += …             ── ★ UNCONDITIONAL ★
```

Brace-tracking the `if (!brainOwnsDecisionBlocks) { … }` block puts it at **lines 1798-1852**.
Lines 1892 and 1915 are **outside** it. And `buildLessonPlanBlock`'s injection carries its own
comment: *"Left unconditional (unchanged) rather than risk a dangling Brain directive with nothing
to point at."*

`isBrainRuntimeEnabled()` is documented *"ENABLE_BRAIN_RUNTIME=true by default"*, so the two
suppressed sites are indeed off in production — but the lesson-plan path survives.

**Conclusion: populating `ConceptMasteryRecord` and flipping `ENABLE_CONCEPT_MASTERY_READ` would
reach the learner**, via `decide()` → `getLessonPlan` → `buildLessonPlanBlock`. The "half-built,
written-but-read-by-nothing" risk the master plan's §9 warns about **does not apply here.**

The real risk is the opposite one, and it is worse.

---

## 5. The actual decision: a fork ADR 10 never considered

ADR 10 §3 weighed three designs: **A** keep fragmented surfaces; **B** one monolithic
`LearnerState`; **C** six stores with single-writer ownership (selected).

`studentIntelligence` is **none of them.** It is a fourth design that did not exist in 2026-07:

> **Design D — one DERIVED read-model over the existing surfaces, with no new storage.**

Design D gets ADR 10's *read-consistency* benefit (one object, one definition of per-concept state,
one decay law) **without** its costs (no migration, no dual-write, no single-writer discipline to
enforce across 4 writers, no staleness window, no backfill). It does **not** get ADR 10's
*write-ownership* benefit: `TopicProgress` still has 4 writers, so consumers that read it directly
can still disagree with each other.

**Populating `ConceptMasteryRecord` now, while `studentIntelligence` is live, would create two
durable per-concept mastery representations that can disagree — which is precisely the bug class
ADR 10 was written to eliminate.** That is not a reason never to do it; it is a reason the fork
must be decided *before* any writer is built, and decided by an owner.

| | Design C (ADR 10, stored) | Design D (shipped, derived) |
|---|---|---|
| Migration | **done already** (§1.1) | none needed |
| Writer discipline | must enforce single-writer across 4 existing writers | n/a — nothing is written |
| Staleness | possible (row can lag evidence) | impossible by construction |
| Read cost | one indexed lookup | recompute per read over several tables |
| Query-ability | `WHERE decayedScore < 0.4` across learners — cheap | requires computing every learner's profile |
| Cross-session durability | explicit | implicit in the source surfaces |
| Status | 0 writers, 1 flagged reader | **live in production** |

The honest summary: **Design D is winning on merit and by default.** Design C's one clear
advantage is *queryability across learners* — cohort analytics, "who is about to forget X" — which
no current feature needs.

---

## 6. Conditional plan — ONLY if the fork resolves toward Design C

Not a recommendation (see §8). Recorded so the decision has a costed option on both sides.

**There is no migration batch.** §1.1 established the schema shipped on 2026-07-07. That removes
the irreversible step this item was named for, and with it most of its risk.

| # | Batch | Content | Precondition | Risk |
|---|---|---|---|---|
| **0** | **Reconciliation spec** | Define `masteryScore`/`decayedScore` as a **pure function of the live authority** — `ConversationState`'s verified counters + `studentIntelligence`'s existing `effectiveHalfLifeDays`. **Do not import ADR 10's Bayesian update rule**; it contradicts the counter model (§3.1) and has no evidence behind its constants. Pure module, unit tests only | fork decided | **none** |
| **1** | **Shadow-compute** | Compute the record at the existing persist site; **log it, write nothing**. One `LEARNER_STATE={…}` line per turn (the `TURN_EVENT`/`CONTRACT_ASSERT`/`PHYSICS_DIM` convention). No DB write — the 2026-08-31 egress incident is the standing reason | Batch 0 | **none** |
| **2** | **Agreement assertion** | Log a violation when the computed record disagrees with `studentIntelligence`'s derived profile for the same `(userId, conceptId)`. **This batch is the fork's own evidence** — if the two never disagree, Design C adds nothing but a table | Batch 1 | **none** |
| **3** | **Write, read nothing** | Single writer at the persist stage. `ENABLE_CONCEPT_MASTERY_READ` stays off. The table fills; no code path consults it | Batch 2 quiet; **single-writer rule asserted structurally**, the `turnProgress` C1-C4 precedent | **low** — write-only |
| **4** | **Backfill decision** | Explicitly decide whether to backfill from `TopicProgress`/`EvidenceRecord` or let the table fill forward-only. **Forward-only is the default** — a backfill invents history the evidence does not support | Batch 3 | **medium** if backfilled |
| **5** | **Flip one reader** | Enable `ENABLE_CONCEPT_MASTERY_READ` — separately approved. §4's live path means this **is** learner-visible. Verify on a driven lesson that `buildLessonPlanBlock` output changes as intended and nothing else does | Batch 4; a manufactured observation window (near-zero organic traffic) | **HIGH** — the only learner-affecting batch |
| **6** | **Retire the duplicate** | Either delete `EbLearnerConceptMastery`/`EbLearnerActiveMisconception` or record them as permanently dormant. Leaving three copies of one idea is how §10.1 happened | Batch 5 | **low** |

**`ActiveMisconception` is deliberately absent from every batch.** ADR 10 §14 sequences it after
the Evidence Engine, and §1.4 shows `evidenceEvent` has **0 writers** — the precondition ADR 10
itself set has not been met. Building it now would repeat exactly the mistake this audit found.

---

## 7. Steel man — argue against building this at all

At full strength, matching `TUTOR_REMEDIATION_PLAN` §9-11 and the two prior design passes.

**7.1 The one recorded incident of this bug class would not have been prevented.** Item 3's
decisive test was "0 of 3". Here: `masteryCounterDisplayDivergence.test.ts` records a real,
twice-reported divergence — `checkCorrect 1/1 · practiceCorrect 2/2 · every graded answer correct`
against `mastery.verified false`. Its root cause is the **plain-vs-verified counter split inside
`ConversationState`** — one surface, two counter families — not cross-surface fragmentation.
`ConceptMasteryRecord` sits at a different grain and would not have touched it. **ADR 10's named
bug class has one recorded instance, and ADR 10's design does not address it.**

**7.2 The problem it solves is already solved, by cheaper means.** `studentIntelligence` gives one
consistent per-concept view with a *better* decay law than ADR 10 specified (adaptive half-life vs
fixed), and is live. Design C's remaining advantage is cross-learner queryability, which no
shipped feature requires.

**7.3 Four of ADR 10's six stores are dead — including the one it made a dependency.** ADR 10 §14
sequences `ActiveMisconception` after the Evidence Engine; `evidenceEvent` has 0 writers and
`assetScore` has 0 writers *and* 0 readers. Building Store 2 on top of a Store 4 that does not run
is building the second floor first.

**7.4 The schema being done makes the *remaining* work the risky part, not the safe part.** The
item was costed at "3-4 sessions, the only one needing a migration" — implying the migration was
the hard part. It is done, and what remains is: inventing a score model the live authority does not
imply (§3.1), enforcing single-writer discipline across 4 existing writers, deciding a backfill,
and flipping a flag on a **live, unsuppressed** path into the system prompt (§4). That is the
dangerous half, and it is all that is left.

**7.5 There are already three copies of this idea in the schema.** `ConceptMasteryRecord`,
`EbLearnerConceptMastery`, and the derived `studentIntelligence` profile. Adding a writer to one of
them without retiring the others increases the count of things that can disagree.

**7.6 Zero organic traffic makes Batch 5 unverifiable in the ordinary sense.** Every claim of
"no regression" would rest on manufactured runs, exactly as Items 1-3 had to.

### Does the steel man survive?

**Yes — substantially.** §7.1 and §7.2 together are close to decisive: the design addresses a bug
class with one recorded instance it would not have caught, and the read-consistency benefit is
already delivered by a live mechanism that costs nothing to run.

What survives on the other side is narrow but real:

1. **§4's live path means this is not the "inert data" case** the master plan warns about — if
   built, it would work.
2. **Batches 0-2 are free and settle the fork empirically.** Batch 2 in particular — logging
   disagreement between the computed record and the derived profile — is the *only* way to learn
   whether Design C adds information or just a table. That is a genuine, cheap experiment.
3. **The queryability gap is real** and will be felt the first time anyone asks a cohort question.
   It is simply not being asked today.

---

## 8. Recommendation

**Do not commission Item 4 as scoped (3-4 sessions, migration-led). It is mis-scoped in both
directions: the migration it is named for is done, and the work that remains is riskier than the
costing implies.**

Instead, in order:

1. **Record ADR 10 as PARTIALLY SUPERSEDED** — by the schema that shipped on 2026-07-07 (Phase 2a
   done) and by `studentIntelligence`'s Design D (Store 2 semantics delivered without storage).
   A future reader of ADR 10 today would reasonably conclude none of it is built; half of the
   *schema* is, and the *semantics* are, elsewhere. This is a documentation fix, not a build.
2. **If, and only if, someone wants the queryability**, run Batches 0-2 (§6) as a one-session
   experiment. Batch 2's disagreement log is the decision instrument.
3. **Otherwise, close Item 4 rather than deferring it.** "Deferred" implies the work is queued and
   correct; this audit finds it partly done and partly superseded. `ActiveMisconception` stays
   blocked on the Evidence Engine regardless — ADR 10's own §14 says so, and §1.4 shows that
   precondition is unmet.

This is the same shape as Item 3's outcome — keep what is cheap and informative, decline the
enforcement step — reached by the same method, and it should carry no more stigma. **The evidence
does not support the build, and the last primitive was correctly allowed to stop for exactly that
reason.**

---

## 9. What was verified, and what was not

**Verified** — against `624b469`, all re-runnable:

* Both Prisma models exist and match ADR 10's proposed fields; the two extra columns and their
  originating migration (`20260801000000_wp4_persistence_carriers`, additive-only by its own header).
* Creating migration: `20260707120000_sync_untracked_schema_drift`, lines 516 and 548.
* **Zero writers** for both models across `src/` and `scripts/`.
* The live reader at `route.ts:1754`, its flag, and the flag's absence from `.env.example`.
* Runtime writer counts: `TopicProgress` 4, `RetentionMetric` 1, `ReviewSchedule` 1,
  `MistakeRecord` 4 — Permanent Rule 14 still holds.
* The six stores' status, including `BrainConfig` at **0 writers and 0 readers** and no long-term
  snapshot worker anywhere.
* The live mastery definition (`masteryGate.ts:40-48`) and the absence of any exponential-decay
  mastery computation outside `studentIntelligence`.
* `studentIntelligence.ts`'s "Storage: NONE" header and its `1 − 2^(−Δt/halfLife)` law citing
  ADR 10's own `decayedScore`.
* Its production reachability via `/api/learner/review-queue` → `loadReviewQueue` →
  `loadStudentIntelligence`.
* §4's consumer chain, including brace-tracked block boundaries (1798-1852) proving lines 1892 and
  1915 are outside the suppressed region, and `buildLessonPlanBlock`'s unconditional injection.
* `EbLearnerConceptMastery`/`EbLearnerActiveMisconception` exist with 0 writers.
* `masteryCounterDisplayDivergence.test.ts`'s recorded incident and its stated root cause.

**NOT verified, and not claimed:**

* **No database was reached.** `DATABASE_URL` is unset in this sandbox, so I did not confirm the
  two tables are empty *in production* — only that no code writes them. A row could exist from a
  manual insert; nothing in the repo would produce one.
* **No production traffic inspected, no live session driven, no code run.** No suite, no `tsc` —
  no source file changed.
* **§4's path is traced statically.** I read the call chain and brace-tracked the suppression
  block; I did not execute a turn with a populated row to observe the prompt change. An executor
  must confirm that before Batch 5.
* **"`studentIntelligence` is winning on merit" is a judgement**, not a measurement. Batch 2 of §6
  exists precisely because the two models' agreement has never been measured.
* Whether `/api/learner/review-queue` is called by any live client surface was **not** traced to a
  component; I verified the route exists and its chain is live, not that a learner triggers it.

---

## 10. Open findings, reported not fixed

1. **Three representations of one idea.** `ConceptMasteryRecord`, `EbLearnerConceptMastery`, and
   `studentIntelligence`'s derived `ConceptState`. Two are dead. Nothing marks either as dormant
   in the schema itself.
2. **`BrainConfig` has zero writers and zero readers** — ADR 10's Store 5, fully dead. ADR 10 §14
   Phase 2c names it as the vehicle for retiring `ASSESSMENT_PASS_THRESHOLD`; that constant is
   still hardcoded.
3. **`sessionMemory.ts` is a type-only scaffold** whose `lessonStageProgress` key has zero writers
   — already reported by this programme's Turn Contract audit (§2.2 of that document) and still
   true. ADR 09's stage continuity has never executed.
4. **`evidenceEvent` has 0 writers and 1 reader; `assetScore` has 0 of each.** ADR 13's Evidence
   Engine — a stated precondition of ADR 10 Phase 2d — is not running.
5. **`ENABLE_CONCEPT_MASTERY_READ` is undocumented in `.env.example`** while appearing in a docs
   flag table, so its default is discoverable only by reading `route.ts`.

---

## 11. Relationship to existing documents, and governance

* **`ADR_10_STUDENT_MEMORY_ARCHITECTURE.md`** — not reopened or rewritten. This audit recommends
  marking it **partially superseded** (§8.1): Phase 2a done by migration; Store 2 semantics
  delivered by Design D. Its §1 diagnosis stands and should be preserved.
* **`docs/MY-TUTOR-CANONICAL-BLUEPRINT.md`** §21/§26 already records "schema-complete, zero
  writers, read site always null". This audit **confirms** it and adds what it does not contain:
  the migration date, the field-level diff, the live consumer chain (§4), and the Design D fork (§5).
* **`TUTOR_REMEDIATION_PLAN.md`** §2.0 still lists Item 4 as **"DEFERRED, not scheduled."** This
  audit does not change that by itself and **is not an authorization**; it argues the status should
  become **CLOSED (partly done, partly superseded)** rather than deferred, which is an owner call.
* **Items 1-3's design briefs** — structure, shadow-first batch discipline, the no-DB-write logging
  convention, and the verified/not-verified split are taken from them unchanged.
* **`EDUCATIONAL_BRAIN_BIBLE.md`** — not reopened. No engine's responsibility changes.

---

## 12. Definition of done for this audit

- [x] ADR 10 read in full before any other work
- [x] Every load-bearing claim re-verified against the current codebase; **two stale, one
      inverted, one confirmed**
- [x] Field-by-field diff of the ADR's proposed schema against the real Prisma models, with the
      creating migration identified by name and date
- [x] All six stores' current status established, including work done later under other names
- [x] The mastery model compared against the live authority — and ADR 10's decay law located in
      the module that implements it
- [x] The "would it be inert?" question traced concretely to the system prompt, and **answered
      no**, against the expected answer
- [x] A conditional plan with the honest note that **there is no migration batch**
- [x] Steel man at full strength, with an explicit finding that it substantially survives
- [x] A recommendation that declines the build, and says why that is the same outcome as Item 3
      rather than a failure

**Not done, by design:** no code, no migration, no writer, no `ADR_10` edit. The supersession note
of §8.1 is itself a separate, owner-approved change.
