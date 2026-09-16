# Four Primitives — live status

**This is the ONE doc to read to pick this programme up cold, from any session or account.**
Everything else (the per-primitive design docs, CLAUDE.md's own sprawling history) is detail;
this file is the dashboard. **Update this doc — not just CLAUDE.md — in the same commit as any
change that touches one of the four primitives below.** Keep entries terse: one line per batch,
a short paragraph for anything that needs explaining, no restating what the design doc already
says. If this file and CLAUDE.md ever disagree, CLAUDE.md's dated entries are the raw history;
this file is the current-state summary and should be corrected to match reality, not the other
way round.

**Last updated:** 2026-09-16, against `main` @ `6869d49`.

---

## Where this came from

`docs/architecture/PHYSICS_TEACHER_MIGRATION_ARCHITECTURE.md` (V2, audited-not-adopted, see
CLAUDE.md's entry for it) §4 names four missing primitives as the actual gap between this
codebase and a genuinely correctness-checked, state-driven teaching runtime — deliberately
**not** a rewrite, and explicitly rejecting the composed-verifier / CRDT / five-role-LLM ideas
V1 proposed. Each primitive gets migrated shadow-first, in small batches, on `main`, following
the same discipline every batched migration in this repo uses (Learner-Move Interpreter's own
design doc calls it out by name): land inert, observe on real traffic, widen a consumer at a
time, never let a single batch be a large behavioural jump.

The four (§4.1-§4.4 of the V2 doc), in the order this programme has actually worked them:

| # | Primitive | Design doc | Status |
|---|---|---|---|
| 1 | **Turn Contract** | `TYPED_TURN_CONTRACT_DESIGN.md` | ✅ **DONE** — fully migrated |
| 2 | **Deterministic Physics Verifier** (dimensional slice) | `DETERMINISTIC_PHYSICS_VERIFIER_DESIGN.md` | 🟡 **PAUSED at Batch 4** — shadow deployed, real observation campaign not yet run |
| 3 | **Closed-taxonomy Learner-Move Interpreter** | `LEARNER_MOVE_INTERPRETER_DESIGN.md` | ✅ **DONE** — fully migrated, per its own stated scope |
| 4 | **Durable per-concept learner state** | `DURABLE_LEARNER_STATE_AUDIT.md` | ⚪ **AUDITED — recommend CLOSE, not build** — see below |

---

## 1. Turn Contract — ✅ DONE

**What it is:** replaces `route.ts`'s 116 `…Hoisted` local variables (the informal, scattered
"what did this turn decide" state) with two typed objects — `TurnContract` (compiled once,
pre-model) and `TurnDelivery` (compiled once, post-model) — plus an assertion function checking
10 invariants (A1-A10) the old scattered-locals shape could not check at all.

**All 9 batches landed**, in order, each its own commit:

| Batch | Commit | What |
|---|---|---|
| 0 | `aeeb346` | Types + compilers, unconsumed |
| 1 | `fa21933` | Populate + shadow-assert in `route.ts`, reads nothing |
| 2 | `6e5d412` | Provenance cluster (19 locals) — logging-only, zero branch risk |
| 3 | `4bfc509` | Answer-verdict cluster (6 locals) → `ServerGrade` |
| 4 | `896339a` | Question-artifact cluster (12 locals) → `contract.assessment` / `delivery.question` — gated on A6 (persist/response divergence) being clean in shadow first |
| 5 | `6bfea25` | Figure cluster (5 locals + 3 derived) → `contract.figure` / `delivery.figure` |
| 6 | `b2f0239` | Authority cluster (12 locals) → `contract.authority` |
| 7a | `5775062` | Episode cluster → `contract.episode` |
| 7b | `b688e3b` | Capability cluster → `contract.capability` |
| 7c | `32b2126` | Ladder cluster → `contract.ladder` (the highest-risk batch — deliberately last, done with everything else landed and the harness green) |
| 8 pt1 | `d2917fe` | Residue cluster (identity, placement, strategy, liveness counters, etc.) |
| 8 pt2 | `f0e1acb` | Deletion sweep — every now-unreferenced `Hoisted` declaration removed |

**Design doc's own definition of done is met.** No further batches are planned for this
primitive under the current design. If a future session finds a real defect this contract should
have caught but didn't, that's a new finding against A1-A10, not a reason to reopen the batch
plan — check the assertion set (`assertDeliverySatisfiesContract`) first.

**Next action if resumed:** none scheduled. This primitive is closed.

---

## 2. Deterministic Physics Verifier (dimensional slice) — 🟡 PAUSED at Batch 4

**What it is:** a physics-specific correctness check — dimensional analysis only (no numeric
tolerance, no sign convention, no symbolic/CAS checking; all three explicitly deferred, see the
design doc §5.7) — that can reject a dimensionally-inconsistent equation a model states,
**shadow-only today: it rejects nothing, it only logs.**

**Batches 0-3 landed** (design doc's own batch numbering, which is offset by one from the
implementation column's "Batch N" references — read the commit list, not the table, to avoid
the same confusion a prior session hit):

| Batch | Commit | What |
|---|---|---|
| 0 | `dcbb0ac` | `dimensions.ts` — 7-exponent dimension algebra + expression parser, unit tests only, zero route change |
| 1 | `e89db3f` | Manufactured corpus — 149 authored equations as correct controls + seeded broken variants as rejection cases + Error-Analysis-shape must-not-fire controls |
| 2 | `6ebf754` | `dimensionBindings.ts` for `phys.mech.*` only — every symbol hand-bound, every `canonical` copied from existing authored text |
| 3 | `7193d07` | The rule itself, shadowed in both `chat` and `lesson-init` routes — emits `PHYSICS_DIM={…}` per turn, consumes nothing, repairs nothing, no DB write |

**Two real defects were found and fixed as a byproduct of live-verifying Batch 3** (unrelated to
the verifier's own logic — found while driving real lessons to observe the shadow log):
`545819a` (resolver: "the equation" misresolved to Hamilton's Equations across domains) and
`624b469` (excursion: the same phrase opened an unresolved-topic excursion via a separate code
path). Both are closed, tested, deployed.

**Batch 4 — the manufactured observation window — is NOT properly done.** Design doc: "Drive N
real physics lessons end-to-end against the deployed app on a disposable QA account,
`phys.mech.*` only, and read the shadow lines. **This is the batch that decides whether Item 3
[this primitive] continues** — if the rule never fires on real generated prose, say so and
stop." What exists instead (§6.1 of the design doc, added 2026-09-16, commit `6869d49`) is an
**incidental** 14-line sample — the residue of the two live-verification sessions above, not a
deliberate campaign:

- `violationFound:true` on **0 of 14**.
- Gate breakdown: `no-binding` 4 (off-domain concepts, correct), `no-extraction` 5,
  `no-assertion-frame` 5.
- **Zero lines reached the actual dimension-checking core** (`parse-failure` /
  `unbound-symbol` / `consistent` / `violation`) — every observed turn fell through one of the
  two pre-checks before the built machinery was ever exercised.

This does **not** license a "the rule never fires, stop" verdict — the sample wasn't generated by
turns designed to elicit an equation assertion. It also doesn't license proceeding to Batch 5 —
the design doc's own gate ("Batch 4 shows a non-zero fire rate and zero false positives") is
simply unmeasured.

**Next action if resumed:** run the real Batch 4. Disposable QA account
(`qa-*@mytutor-qa.invalid` convention, delete + verify re-login blocked afterward), drive it
through several `phys.mech.newtons-second-law` / `phys.mech.free-body-diagram` lessons with
turns that actually ask for an equation ("what's the formula for net force?", "show me F=ma",
worked-example requests — not incidental prose), then re-read production `PHYSICS_DIM=` logs via
Vercel MCP scoped to that session window. Report the real fire rate, gate distribution, and a
manual true/false-positive read of every `violationFound:true` line. That result is what decides
whether Batch 5 (enforcement — first learner-visible change, `phys.mech.*` only) is even worth
proposing. Do not build Batch 5 speculatively; do not conclude "stop" from an incidental sample
either.

---

## 3. Closed-taxonomy Learner-Move Interpreter — ✅ DONE

**What it is:** a single `readLearnerMove` reading (stage A + stage B) replacing three
independently-existing, partially-overlapping taxonomies of "what did the learner just do" —
with a genuine `UNINTERPRETABLE` class and a confidence gate, so downstream authority
(`turnArbitration`) reads one graded signal instead of re-deriving it per consumer.

**All 7 batches landed** (design doc §8, numbered 0-6; commits use 0-7 because batch 6 — "one
rung per commit" — split into two commits, one per rung):

| Batch | Commit | What |
|---|---|---|
| 0 | `9b798da` | `learnerMove.ts` + purity guard (fails the build on a regex literal / phrase array / non-detector import in the module), unconsumed |
| 1 | `221bcdd` | Shadow — `LEARNER_MOVE={…}` log line, reads nothing |
| 2 | `2b2d3c5` | Agreement assertion vs. existing layers, still shadow |
| 3 | `20d9981` | Wire the 7 orphan detectors (`isSatisfactionSignal`, `isClaimChallenge`, `detectStatedInability`, `detectNavigationRequest`, `detectAutonomyRequest`, `isExplicitCorrection`, `isReturnRequest`) into the reading — still shadow, nothing consumes it yet |
| 4 | `7b1c8d7` | First consumer: `TURN_EVENT` carries `move` from the reading |
| 5 | `d1af0d1` | Second consumer: steering prompt blocks read `reading.has(...)` (confidence ≥ 0.6), each proven equivalent to its old single-detector source |
| 6 | `0799355` | Authority rung 1/2: RECOVERY input to `turnArbitration` (confidence ≥ 0.8) |
| 7 | `73758b0` | Authority rung 2/2: LEARNER_REQUEST input to `turnArbitration` |

**Follow-up fix, same programme:** `78fef2b` — closed the design doc's own §4.4 reported-not-fixed
gap (widened `recoveryGuard.ts`'s `dont_understand` patterns to match `conversationDecision.ts`'s
`CONFUSION_RE`, as a separate, evidenced change, exactly as the design doc said it should be).

**Design doc's own definition of done is met** — both authority rungs it names (RECOVERY,
LEARNER_REQUEST) are migrated; no further rungs are named as in scope. `333a310` (the design
doc's own creation commit) is titled "composable, but the scope inverts" — read its §0 Verdict
if extending this primitive to a new consumer is being considered; it explains why the natural
instinct (migrate the biggest detector first) is backwards here.

**Next action if resumed:** none scheduled. This primitive is closed. A new detector or a new
authority rung could be added later following the same one-batch-per-addition discipline, but
nothing currently pending calls for it.

---

## 4. Durable per-concept learner state — ⚪ AUDITED, recommend CLOSE (not built)

**What it is:** ADR 10's `ConceptMasteryRecord` / `ActiveMisconception` model — durable,
per-concept mastery and misconception tracking, replacing `TopicProgress`'s 4 independent
runtime writers with one.

**What actually happened (`b3b0c83`, 2026-09-16):** before committing to a 3-4 session build,
this session's predecessor applied the same discipline that stopped the Physics Verifier at
Batch 4 — checked whether the premise still holds — and found it materially stale:

- The schema ADR 10 asks for **already exists**, field-for-field, shipped in migration
  `20260707120000_sync_untracked_schema_drift` (2026-07-07) — **five days after ADR 10 was
  written.** No schema work remains.
- A live reader already exists (`route.ts:1754`, labelled "W2-3 (ADR 10 Phase 2b)") and has been
  returning `null` since it was written.
- **The real finding:** a *second*, independent mechanism (`studentIntelligence.ts`, header
  explicitly says `Storage: NONE`) already implements durable-learner-state *semantics* through a
  different path. Writing ADR 10's tables now would not be inert — there's a live, unsuppressed
  consumer path to the system prompt — so the risk is a **second source of truth**, not a
  half-built no-op.
- The one recorded real mastery-divergence incident in this repo was **inside one surface** (the
  plain-vs-verified counter split within `ConversationState`), not the cross-surface
  fragmentation ADR 10 diagnoses — so `ConceptMasteryRecord` would not even have prevented the
  one incident on record.

**Recommendation, stated plainly in the audit doc: do not commission Item 4 as scoped.** The real
open question is an owner-level fork — which of the two already-existing mechanisms
(`ConceptMasteryRecord`/`ActiveMisconception` schema, or `studentIntelligence.ts`'s live derived
model) is canonical — not "should we build the tables." If that fork resolves toward the derived
model (which the audit's §7 argues it should), this item should be marked **closed**, not
deferred, and ADR 10 marked partially superseded.

**Next action if resumed:** read `DURABLE_LEARNER_STATE_AUDIT.md` §5 and §7 in full before doing
anything else. This is a one-session audit-and-decide (which mechanism is canonical), not a
build. Do not start writing `ConceptMasteryRecord` rows without resolving that fork first — doing
so would create the second-source-of-truth risk the audit specifically warns about.

---

## Programme-level status

Two of four primitives fully shipped and closed (Turn Contract, Learner-Move Interpreter). One
paused on a measurement gate, not a decision (Physics Verifier — needs the real Batch 4 run).
One audited and recommended for closure rather than a build (Durable Learner State — needs an
owner-level fork decision, not more engineering).

**If picking this up cold with no other instruction**, the single highest-value next action is
running the real Physics Verifier Batch 4 observation window (see §2 above) — it's the one item
blocked on execution rather than a decision only a human can make.
