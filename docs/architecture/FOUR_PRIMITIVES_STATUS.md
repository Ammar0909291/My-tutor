# Four Primitives — live status

**This is the ONE doc to read to pick this programme up cold, from any session or account.**
Everything else (the per-primitive design docs, CLAUDE.md's own sprawling history) is detail;
this file is the dashboard. **Update this doc — not just CLAUDE.md — in the same commit as any
change that touches one of the four primitives below.** Keep entries terse: one line per batch,
a short paragraph for anything that needs explaining, no restating what the design doc already
says. If this file and CLAUDE.md ever disagree, CLAUDE.md's dated entries are the raw history;
this file is the current-state summary and should be corrected to match reality, not the other
way round.

**Last updated:** 2026-09-16, after the Physics Verifier's Batch 7 fix + live re-observation window
(§6.4 of its design doc) and the Durable Learner State investigation addendum (§13).

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
| 2 | **Deterministic Physics Verifier** (dimensional slice) | `DETERMINISTIC_PHYSICS_VERIFIER_DESIGN.md` | 🟡 **Batch 7 shipped + re-observed live — trailing-parenthetical Gate A defect fixed and proven (unit test), but 0/50 core-reached this run** — three further, adjacent, unfixed Gate A/C gaps found and reported from real transcript text; still 0/136 violations across all three live windows combined |
| 3 | **Closed-taxonomy Learner-Move Interpreter** | `LEARNER_MOVE_INTERPRETER_DESIGN.md` | ✅ **DONE** — fully migrated, per its own stated scope |
| 4 | **Durable per-concept learner state** | `DURABLE_LEARNER_STATE_AUDIT.md` | ⚪ **AUDITED + INVESTIGATED FURTHER — recommend CLOSE, not build, fork still owner's to decide** — see below |

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

## 2. Deterministic Physics Verifier (dimensional slice) — 🟡 Batch 7 shipped + re-observed live

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

**Batch 4 — the manufactured observation window — is now COMPLETE, in two passes.**

- §6.1 (commit `6869d49`) was an incidental 14-line sample (residue of the two live-verification
  sessions above, not a deliberate campaign) — 0/14 fired, inconclusive on its own.
- §6.2 (commits `b3846f0` + `9a60a80`) is the real deliberate campaign the design doc's Batch 4
  row calls for: a disposable QA account driven through 4 `phys.mech.*` lessons, 32 chat turns
  every one deliberately phrased to elicit an equation assertion ("what's the formula for net
  force?", "show me F=ma", worked-example requests, etc.), read from real production
  `PHYSICS_DIM=` logs isolated to that session.

**Result: `violationFound:true` — 0 of 36, even on a campaign purpose-built to elicit it.** Gate
distribution: `no-binding` 12 (a genuine, separate finding — "equation" repeatedly misresolved to
the unbound `math.alg.equation`, the same resolver/excursion class as `545819a`/`624b469`, not a
verifier defect), `no-extraction` 14 (colon-prefixed and LaTeX-bracketed equations Gate A can't
extract by design), `no-assertion-frame` 10 (equations that extract but aren't phrased in one of
Gate C's three whitelisted frames). **Zero lines ever reached the dimension-checking core**
(`parse-failure`/`unbound-symbol`/`consistent`/`violation`) across either pass.

**Verdict, stated plainly per the design doc's own §6.2: Batch 5 (enforcement) is NOT warranted
on this evidence.** The model writes correct physics (F=ma, p=mv, KE=½mv² all appeared, zero
content errors observed) but almost never in the specific shape Gates A+C were deliberately built
conservative enough to require — and that conservatism is working exactly as designed, at the
cost of suppressing nearly every true positive too. Two honest paths remain, neither taken:
loosen Gate A/C to admit colon-prefixed/LaTeX equations (raises the false-positive risk, needs a
fresh corpus re-validation) — or accept this as the resting state and retire the shadow as a
permanently-dormant-but-cheap instrument, matching §7's own steel-man recommendation.

**Owner decision (2026-09-16): loosen the gates, re-validate.** Done — **Batch 6** (§6.3 of the
design doc), shadow-only, zero route/behaviour change:
- `normalizeLatex` — LaTeX markup (`\vec{F}`, `\sum`, `\,` spacing, `\(...\)`/`\[...\]` delimiters)
  now reaches the same plain-text extraction pipeline, span-aware (whitespace collapses only
  inside a recognized math span, since LaTeX math mode is whitespace-insignificant — found
  necessary from the REAL captured Gemini T1 transcript, which writes `\( F = m a \)` with a plain
  decorative space that `dimensions.ts`'s zero-whitespace implicit-multiplication rule would
  otherwise reject).
- `COLON_FORWARD_DECLARATION_RE` — a closed whitelist of explicit forward-declaration phrases
  ("in symbols", "in equation form", "as an equation", "(this) is written as", etc., shared
  verbatim between Gate A and Gate C) admits "In equation form, this is written as: F = ma" while
  a bare label ("Mirror: 1/v + 1/u = 1/f.") still excludes — matches none of the phrases.
- **Validated against real captured production text**, not invented fixtures — the exact strings
  from this session's own Groq-vs-Gemini provider-comparison run (§1 above) and §6.2's own quoted
  examples. 55 new tests, full corpus re-validated (912 `CORRECT_CONTROLS` / 25 `REJECTION_CASES`
  / 10×24 `MUST_NOT_FIRE_CONTROLS` — still 0 false fires).
- **A third, unrelated pre-existing Gate A limitation was found and reported, not fixed**: the
  real T1 sentence's trailing parenthetical still overcaptures into the RHS and fails to parse —
  proven unrelated to LaTeX (reproduces on plain text with zero backslashes) — out of this
  batch's stated scope.
- **Not done that batch**: the widened gate's real fire rate had NOT been re-measured against live
  traffic — Batch 6's own validation was the offline corpus, not a fresh manufactured observation
  campaign.

**Live re-observation run (2026-09-16, §6.4 of the design doc).** Same `scripts/qa/
physicsDimBatch4Drive.ts` driver, same 4 `phys.mech.*` lessons, extended to 12 eliciting turns/
lesson (added 4 phrasings targeting LaTeX/colon-marker shapes specifically). 50 `PHYSICS_DIM`
lines read from production (2 of the expected 52 missing from the log query's own return window,
not a product issue). Gate distribution: `no-binding` 16, `no-extraction` 18,
`no-assertion-frame` 15, `parse-failure` 0, **`unbound-symbol` 1**, `consistent` 0, `violation` 0.

**The core is now reachable, proven once.** Before Batch 6: 0/36 lines ever got past the two
pre-checks. After: 1/50 reached `unbound-symbol` — the transcript shows the exact Batch-6 shape
firing (`"In symbols: \[ \Sigma \mathbf{F} = m\,\mathbf{a} \]"`), correctly extracted (LaTeX
normalization) and correctly assertion-framed (colon marker), then correctly ABSTAINED by Gate B
because the resolved concept that turn was `phys.mech.momentum`, whose binding doesn't include
`F`/`a` (those belong to `newtons-second-law`) — a correct per-concept-scoped abstain on real
input, not a near-miss. `violationFound:true` remains 0/86 across both live windows combined.

**Verdict: the widening works mechanically on real prose, but the absolute fire rate (2%) is far
too low to claim Batch 5's own precondition is met.** Batch 5 (enforcement) needs a non-zero
VIOLATION rate with zero false positives — this run adds evidence the pipeline *can* be reached,
not that it fires often enough to matter. **Not built this session, per the design doc's own
gating rule.**

**Batch 7 — the trailing-parenthetical Gate A defect is fixed (2026-09-16, §6.5 of the design
doc).** Reproduced first against the exact real T1 sentence, then closed with an additive
whitelist trim in `extractEquationCandidates`: a trailing `" (...)"` clause is stripped from the
RHS only when a space precedes the `"("`, the content carries no arithmetic-operator character,
and it carries at least one true English word — proven both by unit test (the real T1 sentence now
reaches `consistent`) and by full corpus re-validation (912/25/240, zero regressions).

**Live re-observation against the deployed fix: 0/50 core-reached, stated plainly, not padded.**
Same campaign shape, run against commit `b7f753d` (deployment READY before the drive started).
Gate distribution: `no-binding` 16, `no-extraction` 16, `no-assertion-frame` 18, rest 0. The fix is
real and unit-proven, but this particular live window's model output did not happen to reproduce
the *exact* fixed shape. Traced against the actual transcript (not conjectured), three further,
adjacent Gate A/C gaps were found and reported, none fixed this batch (deliberately, to keep this
batch's own scope narrow): (1) a trailing parenthetical followed by more prose in the same
sentence — the RHS's 60-char cap swallows past it before Batch 7's trim gets a chance to fire;
(2) real colon-marker phrasings ("right after:", "acting on the body:", "…velocity:") outside
Batch 6's six-phrase whitelist; (3) a parenthetical whose own interior contains an excluded
character (a period before the closing paren), which truncates the RHS capture to an *unbalanced*
fragment Batch 7's trim correctly declines to touch (it requires a balanced, closed parenthetical
by design — guessing at an unclosed clause's intended end would be exactly the blacklist-shaped
guess §5.3 exists to avoid).

**`violationFound:true` remains 0 across all three live windows combined (36 + 50 + 50 = 136
lines).** Batch 5 (enforcement) remains unwarranted on this evidence — unchanged verdict from
§6.2/§6.4.

**Next action if resumed:** still an owner-level decision, not an execution task — either
(a) keep widening gates opportunistically (three further named, evidenced candidates now queued:
the "more prose after the parenthetical" gap, the colon-marker whitelist gap, the
excluded-character-inside-parenthetical gap — none attempted yet), or (b) treat three live windows
at effectively 0% violation rate as the steel-man's (§7) predicted outcome and retire the shadow as
a permanently-dormant instrument. Do not build Batch 5 speculatively either way.

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

**Investigated further (2026-09-16, owner-requested, `DURABLE_LEARNER_STATE_AUDIT.md` §13).**
Closed the audit's own flagged "not verified" gaps via direct production queries (Supabase MCP):
confirmed `concept_mastery_records`/`active_misconceptions` genuinely 0 rows in production, and
confirmed real evidence volume exists (43,144 `evidence_events`, 1,354 `topic_progress` rows / 25
users, 3,340 `mistake_records`) — the decision isn't moot for lack of data. Two new findings:
1. **Design D is not uniformly fresh.** `studentIntelligence.ConceptState.masteryPct` forwards
   `TopicProgress` verbatim rather than recomputing it — and a real account's 12 highest-evidence
   topics all show `TopicProgress` frozen (`status='COMPLETED'`, unchanged) for up to 10 days while
   `evidence_events` activity continued. Design D's OTHER fields (`probePassRate`,
   `forgettingRisk`) are genuinely fresh; `masteryPct`/`masteryStatus` are not — corrects §5's
   comparison table, doesn't reverse its conclusion. A stored `ConceptMasteryRecord` would not
   fix this either (checked: ADR 10's own schema is upsert-in-place, not an append-only ledger —
   same staleness exposure either way).
2. **§6 Batch 0's own spec pre-empts Batch 2's ability to decide the fork.** Batch 0 instructs
   building Design C's score from the SAME inputs and decay law Design D already uses (correctly
   rejecting ADR 10's original, unevidenced Bayesian model). But that means Batch 2's "agreement
   experiment" would show near-zero disagreement BY CONSTRUCTION, not by genuine empirical
   validation — two identical formulas over identical inputs agree trivially. Running Batches 0-2
   as currently scoped cannot actually settle the fork; only §5's already-known tradeoff table
   (queryability vs. no duplicate state) can, absent building a genuinely different Design C.

**The fork itself is still NOT decided** — this was investigation, not a decision, per the
owner's own framing of the request. §8's original recommendation (close as scoped; mark ADR 10
partially superseded; run Batches 0-2 only if queryability is explicitly wanted, understanding
now that doing so needs a genuinely different Design C to be informative) still stands as the
audit's position.

**Next action if resumed:** read `DURABLE_LEARNER_STATE_AUDIT.md` §5, §7, and now §13 in full
before doing anything else. This is a one-session audit-and-decide (which mechanism is
canonical), not a build. Do not start writing `ConceptMasteryRecord` rows without resolving that
fork first — doing so would create the second-source-of-truth risk the audit specifically warns
about, and per §13.3, do not treat a same-formula Batches-0-2 run as having settled it.

---

## Programme-level status

Two of four primitives fully shipped and closed (Turn Contract, Learner-Move Interpreter). Two
are owner-directed investigations, neither fully closed:
- **Physics Verifier** — owner chose "loosen the gates, re-validate" (2026-09-16). Batch 6
  shipped, offline-validated, deployed, AND live re-observed (§6.4): the widened mechanism is
  confirmed reachable on real prose (1/50 lines reached `unbound-symbol`, correctly abstaining).
  Batch 7 (§6.5) closed the specific trailing-parenthetical Gate A defect §6.3/§6.4 had named but
  not fixed — proven by unit test against the real captured sentence, zero corpus regressions —
  then re-ran the live campaign against the deployed fix: 0/50 core-reached this time, and three
  further, adjacent, unfixed Gate A/C gaps were found and reported from the real transcript
  (trailing-paren-plus-more-prose, an uncovered colon-marker phrasing, an excluded-character-
  inside-parenthetical truncation). Violation rate is still 0/136 across all three live windows
  combined — too low, on its own terms, to justify Batch 5. What remains is an owner call (§2's
  "next action": keep opportunistically widening gates against the three newly-queued candidates,
  or retire the shadow per §7's steel man), not more execution.
- **Durable Learner State** — owner chose "investigate further before deciding" (2026-09-16).
  Investigation done (§13 of the audit doc): closed the audit's own flagged unknowns against real
  production data, found Design D is not uniformly fresh, and found the audit's own proposed
  Batches 0-2 experiment can't actually discriminate the fork as currently specified. **The fork
  itself is still undecided** — this was investigation, not a decision, by explicit instruction.

**If picking this up cold with no other instruction**, both remaining open items are now owner
decisions, not execution tasks: (a) Physics Verifier — keep widening gates opportunistically vs.
retire the shadow (§2's "next action"); (b) Durable Learner State — decide the fork directly from
§5's tradeoff table (now corrected by §13), or commission a genuinely different Design C if an
empirical answer is still wanted (§13.3). Neither should be defaulted into by an agent.
