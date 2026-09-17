# Four Primitives — live status

**This is the ONE doc to read to pick this programme up cold, from any session or account.**
Everything else (the per-primitive design docs, CLAUDE.md's own sprawling history) is detail;
this file is the dashboard. **Update this doc — not just CLAUDE.md — in the same commit as any
change that touches one of the four primitives below.** Keep entries terse: one line per batch,
a short paragraph for anything that needs explaining, no restating what the design doc already
says. If this file and CLAUDE.md ever disagree, CLAUDE.md's dated entries are the raw history;
this file is the current-state summary and should be corrected to match reality, not the other
way round.

**Last updated: 2026-09-17.** History, oldest to newest, kept because each correction is itself
evidence about how this programme drifts: (1) 2026-09-16, a "DONE/CLOSED" claim; (2) corrected
same day — that was written from narrower sub-project docs, not V2 itself, and Turn Contract's
I2/I3/I8/I10 were unbuilt; (3) 2026-09-16, direct owner chat instruction — **"you have to
complete all 4 primitives"** — explicit, current authorization at V2's real scope, superseding
the CLOSED framing AND the standing CLAUDE.md deferral note, for these four items only; (4)
2026-09-16/17, under that authorization: ALL FOUR Turn Contract invariants now have
observation-only shipped batches (I2 render receipt, I3/I8/I10 each investigated and either
shipped as telemetry or found to need a schema migration/owner decision before enforcement); a
Physics Verifier numeric-arithmetic measurement pass shipped (thin signal, not a checker); a
Durable Learner State `computeConceptMasteryRecord` + `LEARNER_STATE` log shipped (Batch 6 of
that item's own plan) — see `FOUR_PRIMITIVES_HANDOVER.md` for full per-batch detail, this file
only summarizes; (5) this session (2026-09-17) independently reached the same I3/I8 findings
(the `?? mcqParse.mcq` fallback measurement; the `TurnDelivery.figure.*` permanent-placeholder
blocker) before discovering (via `git fetch`) that a parallel session had already shipped and
pushed equivalent-or-better work — its own draft implementation (`A11` inside
`assertDeliverySatisfiesContract`) was reverted before push once the comparison showed the
already-shipped `MODEL_INVENTED_PROBE_EVENT` covered the same ground more simply. **Read
`FOUR_PRIMITIVES_HANDOVER.md`'s "CURRENT STATE" section for the authoritative, current per-batch
record — it is kept more current than this file during active work; this file is corrected to
match it, not the other way round, per this file's own standing rule above.**

**Current summary, all four primitives:**
- **Turn Contract** — representation migration (Batches 0-8) done; ALL FOUR of I2/I3/I8/I10 now
  have shipped, production-deployed OBSERVATION-ONLY telemetry (I2: `RENDER_RECEIPT_EVENT`; I3:
  `MODEL_INVENTED_PROBE_EVENT`; I8: `LEARNER_REQUEST_EVENT`; I10: client `idempotencyKey` +
  `POSSIBLE_DUPLICATE_TURN_EVENT`). None are enforced. Enforcement for any of them is blocked on
  production log prevalence data (confirmed zero organic traffic as of 2026-09-16 — see
  HANDOVER.md) or an explicit owner decision, not on more engineering. A9/A10 (I1/I4's own shadow
  checks) remain documented-but-unimplemented in `turnDelivery.ts` — found, not fixed, out of
  scope for this item.
- **Physics Verifier** — dimensional slice shadow-retired as before; a NEW numeric/arithmetic-
  consistency measurement pass shipped under the fresh authorization, found thin/inconclusive
  evidence, explicitly did not build a checker. 4 of 6 checks (order-of-magnitude, sign/
  convention, limiting-case, symbolic) remain completely unmeasured.
- **Durable Learner State** — `studentIntelligence.ts` remains canonical for the mastery/decay
  concern; under the fresh authorization, Batches 0-1 of the ORIGINAL ADR-10-table plan were
  executed as a pure, unwired, no-DB-write function (`computeConceptMasteryRecord`) plus a
  shadow log (`LEARNER_STATE`) — this does not reopen the Design C/D fork decision, which stands.
  Batch 2 (the agreement experiment) is blocked: it would need a new per-turn DB read, which the
  2026-08-31 egress-incident rule forbids adding just to "measure this."
- **Learner-Move Interpreter** — unchanged, genuinely done.

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
| 1 | **Turn Contract** | `TYPED_TURN_CONTRACT_DESIGN.md` | 🟡 **Representation migration done; I2/I3/I8/I10 all have shipped observation-only telemetry (2026-09-16/17); none enforced, blocked on production data/owner decision.** |
| 2 | **Deterministic Physics Verifier** (dimensional slice) | `DETERMINISTIC_PHYSICS_VERIFIER_DESIGN.md` | 🟡 **Dimensional slice shadow-retired (2026-09-16); a numeric/arithmetic-consistency measurement pass shipped 2026-09-17 (thin signal, no checker built). 4 of 6 checks (order-of-magnitude, sign/convention, limiting-case, symbolic) unmeasured.** |
| 3 | **Closed-taxonomy Learner-Move Interpreter** | `LEARNER_MOVE_INTERPRETER_DESIGN.md` | ✅ **DONE** — fully migrated, per its own stated scope |
| 4 | **Durable per-concept learner state** | `DURABLE_LEARNER_STATE_AUDIT.md` | 🟡 **Design D/`studentIntelligence.ts` still canonical (fork not reopened); Batches 0-1 of the original ADR-10-table plan executed as a pure, unwired function + shadow log (2026-09-16). Batch 2 blocked on a new per-turn DB read the egress-incident rule forbids adding just to measure.** |

---

## 1. Turn Contract — 🟡 representation migration done; I2/I3/I8/I10 all shadow-shipped, none
## enforced

**What it is:** two typed objects — `TurnContract` (compiled once, pre-model) and `TurnDelivery`
(compiled once, post-model) — plus a self-consistency assertion function
(`assertDeliverySatisfiesContract`) that checks a turn's post-model delivery against its own
pre-model contract. **Read this section before trusting "DONE" on this primitive again** — an
earlier version of this file said "fully migrated" without qualification, which two independent
audits (CLAUDE.md's "CORRECTION" entry, and this session's re-verification before building on it)
both found to be an overclaim in different, specific ways.

**What "fully migrated" actually means, verified this session by reading the code, not the
commit messages.** All 9 batches landed and pass their own tests, but:
- `route.ts`'s original 116 `…Hoisted` mutable locals are still **117** today (one net new since
  the design doc's baseline) — Batch 8's own commit message says so: it deleted 1 of 116, and
  reasons explicitly that the other 115 "can never become deletable... because the compile-input
  construction remains a permanent reader." Route.ts's actual decision logic still reads and
  writes those locals directly; the compiled objects are named `turnContractShadow` /
  `turnDeliveryShadow` in the code, and genuinely are shadow-only — grepping for reads of either
  finds 7 total, almost all inside the assertion/comparison logic itself. One confirmed real
  consumer migration exists (Batch 4: `mcqToServe()` collapsed from 6 call sites to 1).
- So the accurate claim is: **a frozen, type-checked, self-consistency-checking observer now runs
  on every real turn and checks A1-A8 live (`CONTRACT_ASSERT` log line on any violation)** — which
  is genuinely valuable and is what closed I1, I4, I5, I6, I9's *checkable* form — but the
  contract is not yet the thing route.ts's branches actually read from.
- **A9/A10 are documented as implemented but are not.** The module's own docblock says "A9 and A10
  ... are still checked and reported here" — grepped for `'A9'`/`'A10'` across `src/`: zero
  matches. Not fixed this session (I1/I4 territory, not I2/I3/I8/I10); flagged here so the next
  session doesn't inherit the same false belief this one almost did.

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

**`TYPED_TURN_CONTRACT_DESIGN.md`'s own definition of done (§12) is met** — that document
explicitly scoped itself to the representation migration and explicitly excluded I2/I7/I10 (§5.1),
and never addressed I3/I8 at all (an omission the "CORRECTION" CLAUDE.md entry identified). No
further *representation* batches are planned. **`PHYSICS_TEACHER_MIGRATION_ARCHITECTURE.md`
§4.1's own definition of done (all 10 invariants) is NOT met** — that is the work below.

### I2 / I3 / I8 / I10 — the four invariants the representation migration never covered

**All four now have shipped, production-deployed, observation-only telemetry**, under the
2026-09-16 owner authorization ("you have to complete all 4 primitives"). Full per-batch detail
is in `FOUR_PRIMITIVES_HANDOVER.md`'s "CURRENT STATE" section — this is a summary, not a
duplicate:

| Invariant | Status | Shipped |
|---|---|---|
| **I2** (render receipt) | 🟡 Shadow, unenforced | `deriveRenderId`/`checkRenderReceipt` (`mcq.ts`, `renderReceipt.ts`), client sends `renderedMcqId`, server logs `RENDER_RECEIPT_EVENT` on a mismatch only. Nothing reads the result. |
| **I3** (corpus-only artifact) | 🟡 Shadow, unenforced | `[learn/chat] MODEL_INVENTED_PROBE_EVENT` whenever a served question has no `assetId`. Investigated first: I3 enforced literally would remove assessment for every below-asset-contract concept (biology/CS at 0%), conflicting with an existing deliberate product decision — not a safe default. |
| **I8** (request satisfied/declined) | 🟡 Shadow, unenforced, diagram only | `[learn/chat] LEARNER_REQUEST_EVENT` — for `diagram`, includes `figureDelivered: visualFired` (a real, correctly-timed signal — see the note below on why this session's own attempt at the same check via `TurnDelivery.figure.*` would have false-positived). `explain_differently`/`real_life_example` are logged with no verification signal — none exists without prose analysis. |
| **I10** (idempotency) | 🟡 Shadow, unenforced | Client generates a stable `crypto.randomUUID()` per logical send; server logs `[learn/chat] POSSIBLE_DUPLICATE_TURN_EVENT` via a content-match heuristic against recent messages (imprecise by design — the real fix needs a persisted, unique-constrained key, a schema migration, deliberately not attempted as a shadow batch). |

**A near-miss worth recording**: this session (2026-09-17) independently reached the I3 and I8
findings above — including the exact same `TurnDelivery.figure.*` permanent-placeholder blocker
for I8/diagram (`compileTurnDelivery` runs at route.ts L6791, before the real figure resolution
at L9415) — and had a draft I3 shadow check (`A11` in `assertDeliverySatisfiesContract`) ready to
commit before fetching `origin/main` and finding the work above already shipped. The parallel
session's I8/diagram solution sidesteps the figure-placeholder blocker entirely by reading
`visualFired` (the real, correctly-timed local) directly in `route.ts`, rather than trying to
build the check inside `TurnDelivery`'s own (permanently inert) figure fields — the better
approach, confirmed by direct comparison. The draft `A11` was reverted before push (commit
`464dbb9`) rather than landed alongside the equivalent, simpler, already-deployed
`MODEL_INVENTED_PROBE_EVENT`.

**Next action if resumed:** all four are shadow-complete. Enforcement for any of them needs
production log data (currently zero — confirmed by direct Vercel query, see HANDOVER.md) or an
explicit owner decision made without waiting for data. I10's real fix additionally needs a schema
migration (a `Message.idempotencyKey` column), separately gated on the observation data justifying
that cost.

---

## 2. Deterministic Physics Verifier — 🟡 dimensional slice shadow-retired; numeric measured 2026-09-17, thin

**UPDATE, 2026-09-17 (under the 2026-09-16 owner reauthorization — "you have to complete all 4
primitives" — which reopened this item):** a numeric/arithmetic-consistency measurement pass ran
(`scripts/qa/physicsNumericProbe.ts`) — checking whether a stated numeric identity like "50 km +
20 km = 70 km" actually computes correctly, which needs zero authored physics content (unlike a
true numeric-tolerance check, which does). First run's detector missed a real identity written in
prose-digit form ("3 m + 2 m = 5 m") — the same false-negative class the dimensional check's own
measurement hit once before; corrected and re-run. Result: 1 of 8 replies contained a checkable
identity, only under an explicit "check the arithmetic" prompt, and it was correct. **Verdict:
real but far too thin a sample to design a checker from.** Not built. See
`FOUR_PRIMITIVES_HANDOVER.md`'s Batch 7 entry and `DETERMINISTIC_PHYSICS_VERIFIER_DESIGN.md` §6.6
for full detail. The remaining 4 of 6 checks (order-of-magnitude, sign/convention, limiting-case,
symbolic) are still completely unmeasured.

### Dimensional slice — ✅ DONE, shadow retired as terminal state (history below, unaffected by the above)

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

**A second, independent live window ran concurrently** (a different Claude account, picking up the
same queued Batch 7 prompt at effectively the same time — exactly the collision this file's own
"how to keep this file honest" check exists to catch, caught here on reconciliation). 33 of the
expected 52 lines retained (worse than either window above, same retention limitation). Gate
distribution: `no-assertion-frame` 15, `no-binding` 10, `no-extraction` 8 — again 0 core-reached.
Its own offline cross-check against 9 real sentences from that window's transcript surfaced a
**fourth gap**, distinct from the three above: (4) a bold callout naming the equation with no
colon anywhere ("Here's the equation that ties the three quantities together: **F = ma** (…)")
clears extraction and Batch 7's trim cleanly, but fails Gate C's own core five-phrase whitelist —
not the colon-marker sub-list gap 2 describes, since there is no colon to widen a colon-marker list
against; this is the base `ASSERTED_PREFIX_RE`-style whitelist itself.

**`violationFound:true` remains 0 across all four live windows combined (36 + 50 + 50 + 33 = 169
lines).** Batch 5 (enforcement) remains unwarranted on this evidence — unchanged verdict from
§6.2/§6.4. Three of the four named gaps (1, 2, 4) trace back to Gate C's assertion-frame
conservatism, only one (3) to Gate A — Gate C, not Gate A, now looks like the higher-leverage next
target if the owner authorizes further widening.

**DECIDED, 2026-09-16 (direct owner instruction to close out this primitive): retire the shadow as
its terminal state — option (b) above.** Four live windows, 169 lines, 0 violations, and the
dimension-checking core reached exactly once (1/169, a correct abstain). This is precisely the
outcome the design doc's own §7 steel man names and pre-authorizes as a valid stop: *"If Batch 4
shows the rule never fires on real generated prose, the correct outcome is to stop, keep the
corpus, and write two more hand guards instead. That is a real possible outcome of this plan and
the plan should not be run by anyone unwilling to accept it."* Every further gate-widening
candidate found (four of them, across Batches 6/7) narrows the target rather than broadening it —
each is a more specific, rarer prose shape than the last, with no evidence any of them would ever
surface a genuine violation rather than another correct abstain. Continuing to chase them has no
defined stopping point and trades against Gate A/C's own conservatism for a capability that, after
four honest attempts, has never once found anything wrong.

**What this means concretely:** Batch 5 (enforcement) is not merely deferred — it is DECLINED,
absent a genuinely new trigger (a real dimensional error surfacing in production traffic, reported
through the ordinary defect-finding channels this repo already uses, not through further
manufactured gate-widening campaigns). The shadow code (`dimensionalVerifier.ts`,
`physicsDimTelemetry.ts`, the `PHYSICS_DIM={…}` log line in both routes) is NOT removed — it is
zero-cost, already deployed, fully tested (66 tests, full corpus 912/25/240), and costs nothing to
leave running per §7's own "worst case, the rule never fires" framing. `dimensions.ts` and
`dimensionBindings.ts` stay as a reusable corpus/algebra layer per §7's "keep the corpus" clause,
available to a future hand-guard (`fieldLineSignGuard`/`visionDirectionGuard`-style) if a real
defect is ever found. The four named-but-unfixed Gate A/C gaps stay recorded in §6.5 as historical
evidence, not as a queue — no future session should pick one up as a "next batch" without a new,
real trigger.

**Next action if resumed (dimensional slice):** none — closed at its designed instrumentation-only
terminal state. **For the primitive as a whole:** the numeric check above needs a larger sample
before any design decision; order-of-magnitude/sign-convention/limiting-case/symbolic have not
been measured at all yet.

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

## 4. Durable per-concept learner state — 🟡 fork decided (Design D canonical); Batches 0-1 of the
## original table plan executed anyway, under the fresh authorization, as a pure function + shadow log

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

**DECIDED, 2026-09-16 (direct owner instruction to close out this primitive): adopt the audit's
own §8 recommendation as final.** The fork is resolved — `studentIntelligence.ts` (Design D,
derived, `Storage: NONE`, live in production via `/api/learner/review-queue`) is canonical for the
mastery/decay concern ADR 10's Store 2 was proposed to address. `ConceptMasteryRecord` and
`ActiveMisconception` stay unwritten — not deferred, not half-built, CLOSED. §7.1-7.2 of the audit
are close to decisive on their own (the one recorded incident of this bug class is inside a single
surface's counter split, not the cross-surface fragmentation this design targets, and would not
have been caught by it; the read-consistency benefit is already delivered live, for free).
ADR 10 marked PARTIALLY SUPERSEDED (its header updated directly) — the 6-store map and the
`RetentionMetric`/`ReviewSchedule`/`BrainConfig` findings remain current and unaffected; only the
Store 2 (`ConceptMasteryRecord`) proposal is superseded.

**What would reopen this:** a genuinely NEW reason to want cross-learner queryability (the one gap
the audit's §7.7/§8.2 leaves open and Design D cannot answer) — and even then, per §13.2, running
the originally-proposed Batches 0-2 experiment would not by itself validate a build, because
Batch 0's own spec computes Design C's score from the same inputs and decay law Design D already
uses, so an "agreement experiment" between them would agree trivially by construction. A future
build attempt needs either a genuinely different Design C or an explicit acceptance that
queryability alone justifies the second-source-of-truth risk — not a rerun of the original plan.

**UPDATE, 2026-09-17 (under the 2026-09-16 owner reauthorization):** Batches 0-1 of the
ORIGINAL `DURABLE_LEARNER_STATE_AUDIT.md` §6 plan (a direct-write "Design C" table) — both
zero-risk, no DB write — were executed anyway, since they serve either fork equally (neither
writes anything). Shipped: `src/lib/teaching/conceptMasteryRecord.ts`
(`computeConceptMasteryRecord`), a pure function that calls `masteryVerifiedStrict` directly
(never reimplements it, so it cannot independently diverge the way the plain-vs-verified counter
split already did once) and derives a continuous 0-1 `masteryScore`; `decayedScore` and
`ActiveMisconception` deliberately out of scope (decay is READ-time, HIGH risk; misconceptions
need Evidence Engine tables that have 0 writers). Wired at the existing persist site — logs
`[learn/chat] LEARNER_STATE={...}`, no DB write, nothing reads it, nothing changes what is
persisted/graded/served. **This does NOT reopen the fork decision** — Design D
(`studentIntelligence.ts`) remains canonical. Batch 2 (the agreement experiment) is confirmed
blocked: `buildStudentIntelligence` has zero call sites in the chat route today, and wiring it in
to run the comparison would add a genuinely new per-turn DB read — exactly what the 2026-08-31
egress-incident rule forbids adding just to measure something.

**Next action if resumed:** the fork is closed; do not reopen without a genuinely new Design C or
an explicit queryability requirement (unchanged from above). Batch 2 stays blocked until either
(a) an owner accepts the new per-turn DB read cost, or (b) an offline comparison script (reading
accumulated `LEARNER_STATE` logs against a periodic `buildStudentIntelligence` snapshot, not wired
into the hot path) is built instead.

---

## Programme-level status

**One of four primitives is genuinely closed (Learner-Move Interpreter). The other three each
have real, shipped, observation-only work under the 2026-09-16 owner reauthorization, and each is
now blocked on the SAME two things: production log data (currently zero — no organic traffic) or
an explicit owner decision made without waiting for it.** This is the current, re-verified state
as of 2026-09-17 — read `FOUR_PRIMITIVES_HANDOVER.md`'s "CURRENT STATE" section for the full
per-batch record; this section is a summary.

- **Learner-Move Interpreter** — fully shipped and closed, no open items.
- **Turn Contract** — the representation migration (Batches 0-8) is done and genuinely valuable
  (A1-A8 self-consistency checking runs live on every turn), but is a shadow layer, not a
  consumer migration — route.ts's decisions still come from the original mutable locals. **All
  four of I2/I3/I8/I10 now have shipped, production-deployed observation-only telemetry** (see
  §1's table). None are enforced. Enforcement needs production prevalence data or an owner call;
  I10's real fix additionally needs a schema migration.
- **Physics Verifier** — the dimensional slice's instrumentation (Batches 0-3, 6, 7) is closed at
  its terminal state exactly as before (Batch 5 enforcement declined, 2026-09-16). Under the
  reauthorization, a numeric/arithmetic-consistency measurement pass ran 2026-09-17 — thin
  evidence (1 checkable identity in 8 replies, correct), no checker built. 4 of 6 checks remain
  completely unmeasured.
- **Durable Learner State** — the Design C/D fork remains decided (`studentIntelligence.ts`
  canonical, `ConceptMasteryRecord`/`ActiveMisconception` unwritten, ADR 10 partially superseded).
  Under the reauthorization, Batches 0-1 of the original (now-superseded-as-canonical, but
  zero-risk) table plan were executed anyway as a pure function + shadow log
  (`computeConceptMasteryRecord`, `LEARNER_STATE`). This does not reopen the fork. Batch 2 stays
  blocked on a new per-turn DB read the egress-incident rule forbids adding just to measure.
- **A confirmed, direct query of production (2026-09-16, Vercel runtime logs, project
  `prj_FwjmRdthApGhwdQY7FyDYThD7WJD`): zero lines for any of the shadow markers this programme has
  shipped, over the prior 24h.** This matches every other finding elsewhere in this repo — the app
  has essentially no organic learner traffic. So "blocked on production data" is not a "wait a few
  days" situation; it needs either real traffic to start (outside this programme's control) or an
  explicit owner decision made without data.

**If picking this up cold**: read `FOUR_PRIMITIVES_HANDOVER.md` first — it is the live queue and is
kept more current than this file during active work. Every remaining increment across all three
open primitives needs one of the two unblocks above, not more engineering from a session assuming
it can find a new safe batch. Re-check production log volume before assuming this is still true —
traffic conditions could change — but manufacturing further shadow-only batches against zero
traffic produces busywork, not information. **Before starting new work on any of the four, `git
fetch origin main` and re-read the current state of both this file and `FOUR_PRIMITIVES_HANDOVER.md`
first** — this session (2026-09-17) nearly duplicated already-shipped I3/I8 work because it started
from a stale local checkout; only a fetch before writing code caught it.
