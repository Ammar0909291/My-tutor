# My Tutor — Claude Handover

> Persistent context for switching between Claude accounts/sessions. Repository evidence and explicit user decisions outrank this file. Keep this document concise, factual, and current.

## 1. Current Mission

My Tutor is in reliability/certification work for the learner-facing AI tutor. Current certification scope is **ONLY Physics + Chemistry**. English and Mathematics are out of scope for this certification effort.

Current immediate mission: resolve the remaining Physics Tier-A certification instrumentation/teaching-policy issue (R3), validate it, then resume controlled production certification.

## 2. Current State

### Repository
- Repository: `Ammar0909291/My-tutor`
- Canonical branch: `main`
- Latest known Git HEAD: `77eb7df` (R3 implemented, T-005) merged with `e8efa5d` (this handover). Prior: `bdabb62`.
- No feature-branch workflow; no force pushes/resets.
- Known standing untracked certification scripts must remain untouched unless explicitly authorized:
  - `scripts/certification/runPhysicsBatch3_4Worker.ts`
  - `scripts/certification/runPhysicsBatch4_4Worker.ts`
  - `scripts/certification/runPhysicsBatch5_4Worker.ts` (VERIFIED present; same standing rule)
- The Batch-5 artifact `scripts/certification/artifacts/physicsBatch5-4w-1788550977148.jsonl` exists locally and is untracked. Leave it untouched unless explicitly authorized. The owner has declined committing these ~11 times; a repo stop-hook asks on every turn. Do not re-litigate.

### Subjects
- Physics: KG 238/238; Educational Brain 238/238; asset contract 238/238; remediation cards 238/238 authored/ACTIVE; major discourse-deixis subject-switching P0 fixed and production-verified; excursion R1-R4 fix shipped/verified.
- Chemistry: KG 186/186; Educational Brain 186/186; asset contract 186/186; P0/excursion fixes production-verified; remediation cards only 13/186 authored and 0 ACTIVE.
- English Educational Brain: 216/216 complete; authoring is complete. Do not treat this as current certification scope.

### Physics Tier-A certification
After Batches 1-4:
- 150/238 concepts attempted.
- 86 CERTIFIED.
- 63 UNMEASURED.
- 1 FAILED_INSTRUMENT.
- Batch 5 EXECUTED 2026-09-04 as a 25-concept diagnostic re-run of the UNMEASURED pool (run `physicsBatch5-4w-1788550977148`): 19 UNMEASURED / 6 CERTIFIED / 0 FAILED_INSTRUMENT / 1 FAILED_INFRASTRUCTURE retry. Infrastructure clean: 0 P2024, 0 57014, 0 55P03, 0 ShareLock, 0 HTTP 5xx; 26 sessions (25+retry), 0 ACTIVE after; replay +140,552 rows ≈ 63.6 MB (batch 4: 64.9 MB). VERIFIED.
- Physics Tier A totals after Batch 5: 175/238 attempted · 92 CERTIFIED · 82 UNMEASURED · 1 FAILED_INSTRUMENT. VERIFIED.
- Physics Tier A totals after P-1 (post-R3): **175/238 attempted · 114 CERTIFIED · 60 UNMEASURED · 1 FAILED_INSTRUMENT.** P-1 re-ran 25 already-attempted concepts, so `attempted` is unchanged; 22 moved UNMEASURED -> CERTIFIED. VERIFIED.
- The Batch-5 pre-registered prediction ("UNMEASURED at or near 100%") was FALSIFIED at 76%. Investigation showed this was a PREDICTION-SHAPE error, not an R3 error: R3 describes a window that PERMITS an invented MCQ, not one that guarantees it. Pure-noise H0 (base rate 0.423) rejected, P(>=19 of 25) = 6.5e-4; deterministic H0 (1.00) rejected by any certification at all. Cohort propensity 0.76, 95% CI [0.59, 0.93]. VERIFIED.

Prior batch results:
- B1: 50 concepts; 28 CERTIFIED / 22 UNMEASURED.
- 4-worker canary: 25; 14 CERTIFIED / 11 UNMEASURED.
- B2: 25; 14 CERTIFIED / 11 UNMEASURED.
- B3: 25; 10 CERTIFIED / 15 UNMEASURED; transient Gemini 503s retried.
- B4: 25; 20 CERTIFIED / 4 UNMEASURED / 1 FAILED_INSTRUMENT; one P2024 HTTP 500.

Latest real-account Physics audit before resolver fix was NO-GO because:
- `phys.opt.refraction` with “ray” triggered an X-rays excursion.
- `phys.mod.photoelectric-effect` with “max KE” triggered a kinetic-energy excursion.
- Both produced zero MCQs/mastery and wrong visuals.
Resolver fix: commit `df318bc`, merged via PR #3; later production SHA reported as `077c22e...`.

### Cross-cutting mastery authority
- `conceptMasteryVerdict()` is the server-authoritative certification/completion/permanent-record/client-summary authority.
- `hasDemonstratedMastery` intentionally answers a different question (“should stop actively teaching”) and must not be conflated with certification verdict.
- Mastery counters only increment at CHECK/PRACTICE with `evidence.serverGraded === true`.
- No mastery-definition change is part of R3.

## 3. R3 — IMPLEMENTED (T-005, 2026-09-04)

**STATUS: code COMPLETE and validated; pushed for production deployment. Production cohort P-1 is the remaining step.**

### Problem
The Batch-5 diagnostic showed a high UNMEASURED rate caused largely by model-invented MCQs appearing before the GUIDE phase rather than by missing authored assets.

Diagnostic cohort:
- 25 concepts examined; 19 UNMEASURED and 6 CERTIFIED.
- Of the 19 UNMEASURED: 15 DEMONSTRATE/show, 3 OBSERVE/show, 1 OBSERVE/ask.
- 18/19 UNMEASURED pending MCQs had no `assetId` and were model-invented.
- All 19 UNMEASURED concepts had 4-6 ACTIVE gradeable probes at the served band.
- 6 CERTIFIED concepts had authored `assetId` MCQs and were PRACTICE/ask.
- Therefore the measured 76% UNMEASURED rate is largely a harness/teaching-flow interaction with early model MCQ frequency, not evidence that content pools are empty.

### Smallest approved R3 change
In the probe gate, relax DEMONSTRATE eligibility from:
`phase === 'DEMONSTRATE' && strugglingOnThisConcept`
to:
`phase === 'DEMONSTRATE'`

Do **NOT** change OBSERVE behavior. The existing `mayAttachProbeBelowGuide(phase, poolSize)` surplus rule remains the early-spend guard.

This is a bounded teaching-policy change. It substitutes an authored probe for an early model-invented MCQ when DEMONSTRATE is eligible and authored capacity exists; it does not redefine mastery.

### Required R3 tests
1. Amend `a2LadderGateReachability.test.ts` source pin in place with explicit supersession/rationale.
2. Update obsolete `e1DemonstrateProbeReachability.test.ts` expectation while preserving OBSERVE/GUIDE rules.
3. DEMONSTRATE with pool >=4 and no failures => authored probe, authored-served, pending MCQ has `assetId`.
4. DEMONSTRATE with pool=3 => early gate refuses; model MCQ can still serve under phase-does-not-count.
5. OBSERVE behavior unchanged.
6. Substitution property test.
7. Authored DEMONSTRATE probe answered correctly advances phase but gives no verified CHECK/PRACTICE mastery credit.
8. Negative control: expected pre-fix failure, passes after fix.

### Production validation after code passes
Run exactly one 25-concept production cohort from the same remaining Physics pool. Pre-register UNMEASURED rate + interval. Expected direction: UNMEASURED should fall toward the OBSERVE-only residue (~16% based on the diagnostic cohort). FAILED_INSTRUMENT/P2024 target: zero. No concept may lose reachability.

Do not resume broad certification until the R3 code/test gate is clean.

### R3 implementation record (VERIFIED)
Commit `77eb7df`. Net behaviour change is four lines out, one in, in
`src/app/api/learn/chat/route.ts`: the `strugglingOnThisConcept` const is removed
and `phaseAllowsProbe`'s DEMONSTRATE disjunct becomes `(phaseBeforeTurn ===
'DEMONSTRATE')`. OBSERVE untouched; GUIDE keeps its `ask` condition;
`mayAttachProbeBelowGuide` (pool - 1 >= 3) is now the SOLE early-spend guard.

FIVE existing tests carried the old source pin — the task named two, the suite
found three more (`e1ScopedToStrugglingLearner`, `masteryReachability`,
`gateAssessmentRouteWiring`). All five amended IN PLACE with the superseding
measurement recorded; no historical rationale deleted. New behavioural coverage:
`src/tests/demonstrateAuthoredProbeSubstitution.test.ts` (29 assertions) driving
the REAL modules end to end.

Validation: 554 files / 11,877 passed / 9 skipped; `tsc --noEmit` clean;
`npm run build` clean (middleware 79.7 kB, unchanged). Negative control: with
`route.ts` reverted, three test files FAIL; applied, all pass.

TRAP RECORDED FOR THE NEXT CLAUDE: the behavioural file initially passed in BOTH
the pre- and post-fix states, because its gate mirror was not coupled to
`route.ts` (the gate condition is inline and not exported) — the replica-drift
class `CLAUDE.md` already warns about. A "mirror is coupled to the route" block
was added and the control re-run. Any future test mirroring an inline route
expression must do the same or it is decorative.

Applicability check (VERIFIED): all 19 Batch-5 UNMEASURED concepts hold 4-6
ACTIVE gradeable probes at the served band and 19/19 clear pool - 1 >= 3, so the
fix fires for every one of them.

Mastery invariant (VERIFIED against the real fold): a DEMONSTRATE probe answered
correctly advances the phase and leaves `verifiedCorrectAtCheck` and
`verifiedCorrectAtPractice` at 0; `masteryVerifiedStrict` false. Thresholds
unchanged (1 check / 2 practice; CREDITS_REQUIRED_FOR_MASTERY 3). This is
structural: the fold increments the verified counters only inside `case 'CHECK'`
and `case 'PRACTICE'`.

Residual risk (INFERRED, unmeasured post-fix): some pure-teaching DEMONSTRATE
turns will now gain an authored question. Batch 5 measured 15/15 DEMONSTRATE
turns already carrying an invented one, so the set is small — not empty.

## 4. Important Technical Findings

### R1/R2 database timeout protection
- R1 independent fix is correct: fire-and-forget promise is captured/settled before response; connection timeout configuration work is separate.
- The original `poolConfig.ts` timeout URL parameters were not actually reaching PostgreSQL through Supavisor transaction pooling.
- Read-only health diagnostic was added in commit `bdabb62...` and showed actual connection settings.
- Supavisor custom-role routing was tested from Windows and returned `(ENOTFOUND) tenant/user authenticator... not found`; do not create a custom app role based on that failed route.
- Production learner-facing Prisma runtime uses role `postgres`.
- 114/114 public tables had RLS enabled with 0 policies; `postgres` has `rolbypassrls=true`, explaining application access.
- Final accepted fallback: role-level PostgreSQL defaults:
  - `statement_timeout = 30s`
  - `lock_timeout = 15s`
- These were applied and independently verified on fresh connections; after quiet pool drain, `/api/health` returned 30s/15s repeatedly.
- Migration risk from the 15s lock timeout was explicitly accepted; rollback is `RESET` of the two role settings, with pool propagation caveat.
- Do not change R1/R2 during R3.

### R3 control flow
- Pre-model `phaseAllowsProbe` runs before the model response.
- Gate eligibility currently covers mastery-gate phases, GUIDE+ask, and DEMONSTRATE only when struggling on this concept.
- `authoredProbesExistHoisted` is only known when selector runs; null means unknown, not “none.”
- Post-model invented-probe guard order includes:
  1. authored served -> withhold
  2. no model probe -> withhold
  3. non-counting phase -> serve
  4. authored probes exist -> withhold
  5. gate declined -> withhold
  6. otherwise serve
- `probeToMcq` is the only writer of `assetId` for authored probes.
- Model-parsed MCQs can persist without `assetId`; these are not server-graded mastery evidence.
- Reordering the invented-probe guard was rejected because it would withhold early model MCQs and recreate the previous passive-lesson/bare-Quick-check behavior.

## 5. Decisions Already Made

- Keep System A (Canonical Curriculum Production Pipeline) and System B (Educational Brain) independent.
- Do not modify Educational Brain, Curriculum Production Pipeline, Knowledge Graphs, ADRs, runtime APIs, or DB schema unless explicitly authorized.
- Certification scope is Physics + Chemistry only.
- Use 4 workers through Physics first, then Chemistry; do not partition workers by subject.
- Keep current 500-row full learner-history replay mechanism unchanged during certification.
- Do not alter certification scripts merely to improve results; evidence must reflect the real current system.
- R3 is the approved smallest change described above; do not broaden it.

## 6. Hard Constraints

- Repository is the single source of truth.
- Evidence > inference.
- Do not invent test results, production state, or completion status.
- No secrets in this file or Git.
- Do not touch the standing untracked certification scripts listed above.
- Do not modify EB/KG/pipeline/ADR/content for this task.
- Do not change mastery definitions or certification authority.
- Do not modify R1/R2 while implementing R3.
- Do not change replay/egress architecture during certification.
- No destructive Git operations, force push, reset, or unrelated cleanup.
- If a broader architecture problem appears, stop and report it rather than silently expanding scope.

## 7. Tests & Validation

Known clean validation before R3:
- Commit `bdabb62...`: 553 files / 11,848 passed / 9 skipped; TypeScript clean; build clean.
- R2 focused validation: 3 focused files / 26 passed; TypeScript clean; build clean.
- Phase-0 clean validation run `phase0-1788494543916`: all 6 controls matched expectations; no active sessions; manifest hash `571dbcfb...`.
- Session cleanup harness fix shipped as `c12b623...` and production-verified.

R3-specific validation COMPLETE (commit `77eb7df`, VERIFIED):
- focused R3 tests: 5 amended files + 1 new file, all pass
- `tsc --noEmit` clean
- full suite 554 files / 11,877 passed / 9 skipped
- `npm run build` clean, middleware 79.7 kB unchanged
- negative control: 3 files fail against pre-fix source, pass after
Remaining: the single pre-registered production 25-concept cohort (P-1).

## 8. Known Problems / Risks

1. Physics Tier-A has a large UNMEASURED population. Current diagnosis says most of the Batch-5 cohort is explained by early model-invented MCQs plus harness terminal classification.
2. Synthetic 60-concept transcript quality was ~6.0/10 against a >=7.5 target. This is a separate quality-improvement target; do not mix it into R3.
3. Earlier 5/58 GUIDE stalls were recoverable but scale confirmation remains separate work.
4. C7 verbatim explanation re-serve was fixed; live repeat effect has not been remeasured.
5. Chemistry remediation campaign remains largely unauthored (13/186); Chemistry certification should account for this readiness gap.
6. Gemini has shown intermittent 503/429 instability; current default chain is Groq -> Gemini -> OpenRouter for non-Russian languages, with Yandex -> Gemini -> OpenRouter -> Groq for Russian. `AI_PROVIDER_MODE=gemini_only` is diagnostic opt-in only.

## 9. Exact Next Step

**R3 is implemented (`77eb7df`), deployed (`b2d1466`) and PRODUCTION-VERIFIED by
P-1 (§9c). Do not redo any of it.**

The next step is an owner decision between:

- **P-2 — forward Physics coverage.** 63 of 238 concepts remain unattempted.
  Infrastructure is verified under 4-worker load (R1/R2) and the teaching-flow
  defect that produced most UNMEASURED verdicts is closed. This is the natural
  continuation.
- **P-1b — re-run the remaining 35 previously-UNMEASURED concepts** (the 60 still
  UNMEASURED minus the 25 just re-tested) to convert them under R3. Expect ~12%
  UNMEASURED, i.e. roughly 4 of 35 remaining as the OBSERVE residue.
- **P-5 — the OBSERVE residue.** Now the dominant remaining cause. OBSERVE is
  barred deliberately (a diagnostic phase; an earlier attempt broke seven
  behavioural tests and was reverted). Changing it is a teaching-policy decision,
  not a bug fix, and needs the same read-only diagnosis R3 received.

Recommendation: P-1b then P-2, leaving P-5 until the residue is the only thing
left. Do not start Chemistry (P-3) until Physics closes.

## 9b. P-1 PRE-REGISTRATION (recorded BEFORE execution, 2026-09-04 ~20:55Z)

Recorded before the run so it cannot be adjusted after seeing results — the
discipline whose absence falsified Batch 5.

**Deployment under test.** Production SHA `b2d1466` (merge of R3 `77eb7df` +
handover `e8efa5d`), deployment `dpl_7KiN5TgViWSpKXui6z7G1WPzk4cE`, READY,
aliased to `my-tutor-flame.vercel.app`. Health before the run: 3/3 HTTP 200,
`db:true`, `statementTimeout "30s"`, `lockTimeout "15s"`. 0 ACTIVE sessions on
all four workers.

**Cohort (25, deterministic).** The original 63-concept UNMEASURED pool minus the
25 Batch 5 touched = 38 remaining; sorted by manifest lessonOrder; first 25 taken.
Chosen over re-running Batch 5's own 25 because 6 of those now carry COMPLETED
lesson attempts, which would put them on the re-teach path and confound the
comparison. Domains: phys.mech 16 · phys.therm 4 · phys.wave 3 · phys.meas 2.

  significant-figures, vector-products, displacement, force, newtons-third-law,
  tension, kinetic-energy, work-energy-theorem, momentum, collisions-elastic,
  torque, angular-momentum, universal-gravitation, escape-velocity,
  stress-strain, bernoulli, cyclic-coordinates-conservation-laws,
  poisson-brackets, zeroth-law, internal-energy, heat-engines, refrigerators,
  damped-oscillations, wave-speed, doppler-effect

**Baselines.** Every one of the 25 returned UNMEASURED on its first attempt
(batches 1-4), so the naive per-concept baseline is 100%. The measured pre-fix
re-run rate on a comparable cohort is Batch 5's **76%, 95% CI [0.59, 0.93]**.

**Predictions.**
1. UNMEASURED falls substantially below the 76% pre-fix rate, toward the
   OBSERVE-only residue. Batch 5's phase split (15 DEMONSTRATE : 4 OBSERVE of 19)
   implies ~4/25 = **16%** if R3 closes every DEMONSTRATE case.
   FALSIFIED IF the observed rate's 95% CI overlaps 0.76, or exceeds it.
2. FAILED_INSTRUMENT = 0.
3. P2024 = 0 (also 57014, 55P03, ShareLock, HTTP 5xx = 0).
4. No concept loses ladder reachability — no CERTIFIED concept regresses and no
   session ends unable to reach CHECK/PRACTICE for want of a probe.
5. Session cleanup exact: sessions created == concepts attempted + retries, and
   0 ACTIVE afterwards.

**Interpretation rule, fixed in advance.** A result between ~16% and ~76% is a
PARTIAL success, not a failure — DEMONSTRATE closing while OBSERVE persists is
the predicted shape. Only an outcome at or above 76% falsifies R3's mechanism.

---

## 9c. P-1 RESULT — R3 CONFIRMED (2026-09-04, run `physicsBatch6-4w-1788555199176`)

**All five pre-registered predictions CONFIRMED. No deviation from the protocol.**

Deployment under test: production SHA `b2d1466`, deployment
`dpl_7KiN5TgViWSpKXui6z7G1WPzk4cE`, READY, aliased to the learner-facing domain.
Run window 20:53:19Z -> 21:06:32Z (13m 13s). Runner SHA recorded in the artifact:
`6dc9476`.

### Headline (VERIFIED)
| | Batch 5 (pre-R3) | P-1 (post-R3) |
|---|---|---|
| UNMEASURED | 19/25 = **76%** | 3/25 = **12%** |
| CERTIFIED | 6/25 = 24% | 22/25 = **88%** |
| FAILED_INSTRUMENT | 0 | 0 |
| retries | 1 | 0 |

Wilson 95% CI for P-1: **[0.042, 0.300]** — does not overlap the pre-fix 0.76
[0.59, 0.93]. P(<= 3 of 25 | p = 0.76) = **2.4e-11**. Two-proportion z = 4.56,
p < 0.001. Prediction 1 CONFIRMED by its own pre-registered falsification rule.

### The mechanism check that matters most (VERIFIED)
Phase at the last recorded decision, from production spine `DecisionRecorded`
joined to `contextSnapshot.pendingMcq` — the same query shape used for Batch 5:

| | Batch 5 | P-1 |
|---|---|---|
| UNMEASURED at DEMONSTRATE | **15** | **0** |
| UNMEASURED at OBSERVE | 4 | **3** |
| CERTIFIED at PRACTICE, pendingMcq authored | 6/6 | 21/22 |

R3 closed the DEMONSTRATE window completely — 15 -> 0. The 3 remaining are all
OBSERVE/ask with an invented pendingMcq: precisely the residue R3 deliberately did
not touch, and within the predicted ~16% (P(<= 3 of 25 | p = 0.16) = 0.42).

### Other predictions
- **FAILED_INSTRUMENT 0** — CONFIRMED. Also 0 retries, 0 errors.
- **P2024 0** — CONFIRMED. Also 0 × 57014, 55P03, ShareLock, connection-pool,
  42P05, 26000, FATAL, slow-query duration lines; 0 HTTP 5xx (241×200, 25×201,
  25×302).
- **No concept loses reachability** — CONFIRMED. 22/22 CERTIFIED are uniform
  (TRANSFER, check 1, practice 2, verified, lessonClosed), 20 in 6 turns and 2 in
  7. `lesson_attempts`: 22 COMPLETED all carrying `conceptsMastered`, 3
  IN_PROGRESS none claiming mastery. Spending a probe early did not starve any
  concept.
- **Session cleanup exact** — CONFIRMED. 25 sessions created for 25 concepts +
  0 retries; **0 ACTIVE** afterwards on all four workers.

### Other observations (VERIFIED)
- Replay egress +297 calls / +142,701 rows ≈ 64.6 MB (Batch 5: 63.6 MB). No
  regression; the per-new-session hydration model is unchanged.
- degradedTurns 0/25. answerSourceFingerprint `probes:2750:h5e86a3a9`, identical
  to every prior batch — same instrument.
- Health before and after: 3/3 and 3/3 HTTP 200, `db:true`, 30s/15s.
- Worker split of the 3 UNMEASURED: all on w1 (3 of its 4 concepts); w2/w3/w4
  were 21/21 CERTIFIED. **UNKNOWN whether this is a w1 property or small-n
  chance** — 3 events is far too few to separate them, and all three are the
  OBSERVE residue, which is concept/model-driven rather than account-driven.
  Do not act on this without more data.
- One CERTIFIED session ended with an invented pendingMcq. Harmless: mastery was
  already earned on authored probes (check 1 / practice 2 / verified), and the
  trailing item was never graded. Noted, not a defect.

### Deviations from the task spec
None. Batch size 25, existing 4-worker runner and protocol, no change to replay
design, worker architecture, mastery definitions, EB/KG/content, or unrelated
code. One new thin dispatcher (`runPhysicsP1_4Worker.ts`) was generated from the
Batch-5 one by substitution only; it is untracked and uncommitted, like its
siblings.

### Status
**R3 VERIFIED IN PRODUCTION.** The remaining UNMEASURED population is now
dominated by the OBSERVE residue, which is a separate, deliberately-deferred
decision (P-5).

---

## 9d. P-1b PRE-REGISTRATION (recorded BEFORE execution, 2026-09-04 ~21:2xZ)

**Objective.** Re-run under R3 every Physics concept whose LATEST verdict is
UNMEASURED, to convert what R3 can convert and isolate what it cannot.

**State verified from artifacts, not assumed.** Reading all seven artifact files
in chronological order and taking the LATEST verdict per concept:
149 distinct concepts attempted · **114 CERTIFIED · 35 UNMEASURED**. The 35 are
this cohort. HEAD `addfe07` == origin/main; production
`dpl_7qT6Df2k1Y9Lx3tBURnpzvQJAnkc` SHA `addfe07` READY (contains R3 `77eb7df`).

**Cohort (35, all still UNMEASURED), by lessonOrder.** phys.meas 4 · phys.mech 13
· phys.therm 3 · phys.wave 2 · phys.opt 1 · phys.em 12.

  dimensions, significant-figures, vector-products, unit-conversion, force,
  newtons-second-law, free-body-diagram, work, potential-energy, power,
  collisions-inelastic, rotational-dynamics, gravitational-potential,
  hookes-law, viscosity, hamiltons-equations, canonical-transformations,
  entropy, carnot-cycle, third-law, forced-oscillations, superposition,
  brewsters-law, electric-dipole, gauss-law, energy-capacitor, ohms-law,
  resistivity, kirchhoffs-laws, electrical-power, magnetic-force, amperes-law,
  solenoid, magnetic-flux, ac-basics

**THIS COHORT IS ENRICHED FOR RESISTANCE — the prediction must not be a flat 12%.**
Stated before running so the result cannot be reinterpreted afterwards. Three
distinct sub-populations:
- **3 concepts already failed POST-R3** (significant-figures, vector-products,
  force) — P-1's OBSERVE residue. Most likely to stay UNMEASURED.
- **19 failed TWICE pre-R3** (the Batch-5 hard core). Batch 5's phase split among
  them was 15 DEMONSTRATE : 4 OBSERVE; R3 closes DEMONSTRATE, so if
  OBSERVE-proneness were a fixed per-concept property ~4 would remain (21%).
  Phase is decided per RUN, not fixed, so the true figure should be lower.
- **13 attempted only ONCE, never re-tested** (12 phys.em + brewsters-law). These
  should behave like P-1's cohort, ~12%.

P-1's 12% was measured on a cohort with none of the first two groups in it. A
naive comparison against it would be wrong.

**Point estimate: ~6 of 35 ≈ 17%** (1.6 from the 13 fresh + ~3 from the 19 + ~2
from the 3 known-residue).

**Decision rule, fixed in advance:**
- **SUCCESS** UNMEASURED <= 30% (<= 10 of 35). R3 is holding on a hard cohort.
- **PARTIAL** 30-50%. R3 helps but something else is also active — investigate
  before any further cohort.
- **FALSIFIED** the Wilson 95% CI lower bound >= 0.50, i.e. materially back
  toward the pre-R3 76%. STOP and investigate; do not run another cohort.
- Any residual UNMEASURED must be checked by MECHANISM (phase at last decision +
  pendingMcq assetId), not by rate alone. A rate improvement with DEMONSTRATE
  cases reappearing would mean R3 is NOT the thing that moved.

**Also predicted:** FAILED_INSTRUMENT = 0 · P2024 = 0 (and 57014, 55P03,
ShareLock, pool, 42P05, 26000, FATAL, HTTP 5xx = 0) · no concept loses ladder
reachability (no CERTIFIED regresses; every certifying session reaches TRANSFER
with check 1 / practice 2) · session cleanup exact (sessions created ==
35 + retries; 0 ACTIVE afterwards).

**Protocol.** Existing 4-worker runner and protocol, unchanged. One cohort of 35.
Worker split 5/10/10/10, preserving the established bias away from w1. No change
to batch semantics, replay/egress, grading, mastery logic, or instrumentation.

**Dispatcher decision (recorded per instruction).** `runPhysicsP1_4Worker.ts`
asserts a 25-concept cohort, so P-1b needs its own thin dispatcher
(`runPhysicsP1b_4Worker.ts`), generated from it by substitution. It is NOT
committed: it imports `runTierA.ts`'s exported `runWithRetry` unchanged, adds no
protocol logic, and the run is fully reproducible from this ledger entry (cohort
list + split + protocol) plus the committed runner. Same standing treatment as
its four siblings. Committing it is tracked as P-7, an open owner decision.

---

## 9e. P-1b RESULT — SUCCESS BAND MET; residual re-diagnosed (2026-09-04/05, run `physicsP1b-4w-1788564223318`)

Window 23:23:43Z -> 23:43:03Z. HEAD `bed04b6` == origin/main at launch;
production `dpl_7qT6Df2k1Y9Lx3tBURnpzvQJAnkc` SHA `addfe07` READY (contains R3
`77eb7df`). Split 5/10/10/10. Fingerprint `probes:2750:h5e86a3a9`.

### Headline (VERIFIED)
**26 CERTIFIED / 9 UNMEASURED = 25.7% UNMEASURED.** Wilson 95% CI
**[0.142, 0.421]**. Pre-registered SUCCESS band was <= 30% -> **MET**;
FALSIFIED required CI lower bound >= 0.50 -> **NOT falsified**. Point estimate
was ~17%; the outcome is above it but inside the band declared in advance.
P(<= 9 of 35 | pre-R3 p=0.76) = 5.1e-10. P(>= 9 of 35 | P-1's p=0.12) = 0.0197 —
i.e. this cohort IS measurably harder than P-1's, exactly as pre-registered.

Per worker: w1 1C/4U · w2 8C/2U · w3 10C/0U · w4 7C/3U. All 26 CERTIFIED are
uniform: finalPhase TRANSFER, check 1, practice 2, verified true, lesson closed.
0 retries · 0 degraded turns · 0 providers failed.

### THE RESIDUAL IS NOT WHAT I FIRST REPORTED — read this before acting on it
Mid-run I recorded an INFERRED hypothesis that the deep-ladder residuals were
caused by **probe-pool exhaustion**, from a production log line
`[gate-assessment] {"phase":"CHECK","probeFound":false}`. **That inference is now
FALSIFIED.** The log window contained several concurrent sessions and that line
belonged to a different one. Every one of the 9 residuals carries an explicit
`unmeasuredReason` in the artifact, and none of them is an empty pool: 8 are
`no-authored-match`, 1 is `options-mismatch`. Do not re-derive the exhaustion
story from that log line.

The 9 split into **three distinct causes** (VERIFIED by comparing each served
question against the production ACTIVE probe catalogue AND the repo corpus):

| # | Cause | Concepts | Owner |
|---|---|---|---|
| 6 | **Model-invented question** — the served question exists in neither the production ACTIVE catalogue nor the repo corpus | dimensions, significant-figures, unit-conversion, gravitational-potential, viscosity, amperes-law | **R4** — explicitly out of scope by owner instruction |
| 2 | **Corpus drift (NEW)** — the served question IS an ACTIVE `HUMAN_CURATOR` probe in production, but its exact stem is ABSENT from the repo corpus the harness indexes | resistivity, solenoid | **INSTRUMENT** — new item P-8 |
| 1 | **options-mismatch** — stem matched an authored probe, served options did not contain the authored answer | vector-products | R4-adjacent |

### Corpus drift, the new finding (VERIFIED, and it is an INSTRUMENT defect)
Two probes served in this run are authored, human-curated, ACTIVE and gradeable
in production, yet the harness answered `no-authored-match`, because production
holds a **stale revision** of the stem:

- `phys.em.resistivity` — production (`HUMAN_CURATOR`, ACTIVE, seeded
  2026-08-14 15:17:17Z): `PRACTICE: Two copper wires have the same length, but
  one has DOUBLE the cross-sectional area. How do their resistances compare?`
  Repo corpus today: `PRACTICE: Start from a copper wire of resistance R. Wire A
  is ... Wire B is the same wire with DOUBLE the cross-sectional area ...` —
  a **different question**. Exact-match count of the production stem in
  `src/lib/teaching/assets/*.ts`: **0**.
- `phys.em.solenoid` — production: `PRACTICE: You hold the current and the TOTAL
  number of turns fixed but stretch a solenoid to twice its length. What happens
  to the internal field?` Repo: `... turns fixed, then stretch a solenoid to
  twice its length AND double its radius.` Exact-match count: **0**.

Label-prefix stripping is NOT the cause and was ruled out: `answerSource.ts`
calls `stripAuthoringLabel` when building the index and
`gateProbeContract.ts` strips on the serving side. The corpus was **edited after
being seeded and never re-seeded**, so the two sides diverged.

**Consequence, stated plainly: `UNMEASURED-no-authored-match` does NOT reliably
mean "the model invented a question."** It means the harness's answer source did
not contain the served stem, which has at least two causes. Every prior cohort's
`no-authored-match` count is therefore an UPPER bound on model-invention, not a
measurement of it. This affects the reading of earlier batches, not their
verdicts (UNMEASURED remains the correct, honest verdict either way).

Bounded magnitude check (VERIFIED, 9 residual concepts only): of their 62 ACTIVE
`HUMAN_CURATOR` probes, 58 prefixes are findable in the repo corpus and 4 are
not. The **population-wide** drift rate across all 238 physics concepts is
**UNKNOWN** — not measured, and deliberately not measured here (out of scope).

### `phys.em.amperes-law` — the one genuine pool exhaustion (VERIFIED state, INFERRED cause)
It spent **all 5** of its authored probes (`teachingHistory.mcqAsked` = 5 entries,
each matching an ACTIVE catalogue stem) and finished at check 2 / practice 1 —
one graded practice answer short of mastery — after which the served question was
model-invented. So exhaustion IS real, in exactly ONE of 35 sessions.
**Whether R3's extra DEMONSTRATE spend caused it is UNKNOWN**: confirming it
needs the per-turn `[gate-assessment]` trace for that session, and the Vercel
runtime-log API returned `ExceedsBillingLimitError` before it could be read.
This is the residual risk that was pre-registered before R3 deployed; it is now
observed once, not explained.

### The other 3 deep-ladder residuals were NOT probe-bound (VERIFIED)
Read from `contextSnapshot`: resistivity spent 2 of 5 probes (check 1),
vector-products 2 of 5 (check 1), solenoid 1 of 5 (check 0). They stopped
because the harness could not answer the question in front of it, not because
the pool was empty.

### 5 OBSERVE residue — unchanged and as designed (VERIFIED)
dimensions, significant-figures, unit-conversion, gravitational-potential,
viscosity: turns = 1, finalPhase DEMONSTRATE, check 0 / practice 0. The very
first served question was unanswerable, so the session stopped on turn 1. This is
R3's deliberately untouched window (P-5).

### Everything else predicted, measured (all VERIFIED)
- **Errors: 0.** P2024, 57014, 55P03, ShareLock, connection-pool, 42P05, 26000,
  FATAL: **0 occurrences each** in Vercel runtime logs for the window. 0 logs at
  `error`/`fatal` level. Query mechanism negative-controlled (an unrelated term
  returns logs), so the zeros are absence, not a broken query.
- **HTTP: 0 5xx.** Status codes for the window: 200 x330, 201 x35, 302 x35.
  Paths: `/api/learn/chat` 186 · `/api/sessions` 35 · `/api/learn/lesson-init` 35
  · `/api/sessions/end` 35 · auth 105 · `/api/health` 3.
- **Sessions: exact.** 35 created (w1 5 / w2 10 / w3 10 / w4 10), matching the
  split with **0 retries**. **0 ACTIVE afterwards** on all four worker accounts;
  `/api/sessions/end` called 35/35.
- **lesson_attempts: 35 rows** — 26 COMPLETED each with exactly 1 concept
  mastered, 9 IN_PROGRESS with 0. **`conceptsNeedingReview` = 0 on all 35** and
  **`budgetExhaustions` = 0 on all 35**: no UNMEASURED session recorded a
  teaching failure or spent its concept budget. Completed durations 74-129 s.
- **No CERTIFIED regressed** and no session lost ladder reachability.
- **Health after: 3/3 HTTP 200, `db:true`, `statementTimeout:"30s"`,
  `lockTimeout:"15s"`** — R2 role defaults still adopted. 0 sessions waiting on a
  lock at time of check.
- **Replay/egress.** 910 spine rows written in the window (w1 67 / w2 270 /
  w3 297 / w4 276). Hydration is once per session (post-`8425992`), so ~35 paid
  replays; the lifetime counter for the replay query reads 226,764 calls /
  109,493,512 rows, versus 220,735 / 106,558,119 documented on 2026-09-02 —
  a delta of +6,029 calls / +2.94M rows spanning **all seven cohorts since**, not
  P-1b alone. **The P-1b-only share is INFERRED at ~190k rows**, dominated by w1,
  whose learner log is 30,773 rows (each of its 5 hydrations replays all of it).
  Not a defect; an efficiency note about using the long-lived engineering account
  as a worker.

### Deviations from the task spec
1. `runPhysicsP1b_4Worker.ts` remains **uncommitted**, per §9d and standing
   instruction. Reproducible from §9d's cohort + split + the committed runner.
2. Vercel runtime-log queries stopped being available mid-collection
   (`ExceedsBillingLimitError`). Everything above was captured before that; the
   one item it blocked is named as UNKNOWN above rather than inferred.

### Status
**SUCCESS band met. R3 continues to hold on a cohort deliberately enriched for
resistance.** The residual is now three named causes rather than one, and one of
them (corpus drift) is an instrument defect that was previously being counted as
a content/model problem. Per the stop condition, no further cohort was started.

---

## 9f. OPEN ITEMS RAISED BY P-1b (owner decision — none acted on)

- **P-8 — DIAGNOSED 2026-09-05, see §9g.** Root cause: asset identity excludes
  content and both seed writers are create-only for ACTIVE rows, so an ACTIVE probe's
  text is frozen in production forever. Physics drift population MEASURED at exactly
  **2 probes** (`phys.em.resistivity`, `phys.em.solenoid`), both rewritten by
  `2c1a393a` two days after they were seeded, on a commit that wrongly stated they
  were never live. Both are known non-discriminating probes still being served.
  Smallest safe fix R-a (deprecate + reseed, existing code) is recorded, NOT applied.
  Also found: 3 duplicate ACTIVE rows from an unstable `canonicalSlug` (P-10).
  Superseded framing follows.
- **P-8 (original framing, superseded) — production/repo probe-corpus drift.** Production
  serves ACTIVE `HUMAN_CURATOR` probes whose exact stems no longer exist in the
  repo corpus, so the harness scores them `no-authored-match`. 2 of 9 residuals
  in this run. Options: re-seed production from the current corpus; or index the
  answer source from production instead of the repo; or reconcile per-concept.
  **Do not change grading or the A-1 answer-source contract to work around it.**
  Population-wide rate is UNMEASURED.
- **P-9 (NEW, product) — single-session probe exhaustion.** `phys.em.amperes-law`
  spent all 5 authored probes and finished one graded practice answer short.
  1 of 35. Whether R3's DEMONSTRATE spend contributed is UNKNOWN (log access
  lapsed). Needs a per-turn trace of one such session before any change.
- **P-5 (existing) — the OBSERVE window.** 5 of 9 residuals. Unchanged.
- **R4 (existing, out of scope by instruction) — model-invented questions.**
  6 of 9 residuals, though see P-8: `no-authored-match` overstates this class.
- **P-10 (NEW, product) — `canonicalSlug` is not stable under corpus growth.**
  Adding a second probe to a slot re-slugs the FIRST probe, and the create-only
  writer then creates a second ACTIVE row for the same question. 3 physics cases
  measured. Over-counts the probe pool the E1 surplus rule reads. Fix is NOT small
  (it changes existing identities) — see §9g R-c.
- **P-7 — CLOSED 2026-09-05 (commit `7aaf45e7`).** Owner chose to commit all
  five (`runPhysicsBatch3/4/5_4Worker.ts`, `runPhysicsP1_4Worker.ts`,
  `runPhysicsP1b_4Worker.ts`), so every Tier A run is now reproducible from the
  repository rather than only from this ledger's cohort lists. Reviewed before
  staging: each imports `runWithRetry` from `runTierA.ts` unchanged and holds no
  protocol, retry, verdict or answer-source logic; no credential or account email
  appears in any of them. `tsc --noEmit` clean. Committed verbatim, so one stale
  prose header remains: `runPhysicsP1b_4Worker.ts` still describes a 25-concept
  Batch 5 cohort in its comment while the code asserts 35. Code correct, comment
  stale — not edited, because the instruction was to commit them, not revise them.

---

## 9g. P-8 DIAGNOSIS — production/repo probe drift: ROOT CAUSE FOUND, POPULATION MEASURED (2026-09-05, READ-ONLY)

Diagnosis only. **No code, production data, grading, matching, seeding, `.gitignore`
or dispatcher was changed.** One read-only `git fetch --unshallow` was performed
(see "an instrument error I made" below).

### ROOT CAUSE (VERIFIED — two code facts, both necessary, together sufficient)

1. **Asset identity excludes content.** `seedCanonicalSlug`
   (`src/lib/teaching/assets/brainSeedAssets.ts:86-94`) returns
   `conceptId:familyKind:en:gradeband[:difficulty]`. The stem is NOT part of the
   identity, so editing a probe's text does not change its `canonicalSlug`.
2. **Both writers are CREATE-ONLY for an ACTIVE row.**
   - `scripts/brain/seed-knowledge-assets.ts:233-269` — `findFirst({canonicalSlug})`;
     `REVIVABLE = {DEPRECATED, RETIRED}`; anything else falls to
     `skipped++ … continue`. An ACTIVE row is never compared and never refreshed.
   - `src/instrumentation.ts:690-700` (cold-start bootstrap) — on an existing slug
     it repairs only a MISSING child row (`!dup.hasContent`) and otherwise
     `skipped++; continue`. It never inspects `stem` or `contentHash`.

   `contentHash` IS written by both writers but is read for reconciliation ONLY in
   the AI capture path (`versioning.ts` `decideCaptureAction`, used by
   `explanationMemory.ts` / `teachingActionRepository.ts`). **Nothing anywhere
   compares a seeded row against the corpus it came from.**

**So: once a probe is seeded ACTIVE, its text is frozen in production forever, and
every later repo edit to that probe is invisible to production.** That is the whole
mechanism. It is not a Studio edit, not a migration, not a generated asset, not a
different branch.

### WHY THE TWO KNOWN ASSETS BECAME STALE (VERIFIED, with the commit)

Both stems were introduced 2026-08-13 (`48c8cf58`, `bd94a620`), seeded to production
**2026-08-14 15:17:17Z / 15:17:33Z** (`HUMAN_CURATOR`, ACTIVE), then **rewritten in
the repo on 2026-08-16 02:37:28Z by `2c1a393a`** — "moat(physics): Stage 4 across all
35 phys.em concepts — 5 defects". Two days after they were already live.

That commit rewrote them because they were measured **pedagogically defective**:
- `phys.em.resistivity` — tagged with "longer wire has lower resistance" but varied
  AREA only, and the same "more room is easier" intuition yields the CORRECT answer
  for area, so a learner holding the misconception scored right. Non-discriminating.
- `phys.em.solenoid` — tagged "a wider solenoid has a stronger field" but held the
  radius FIXED. Same defect class.

**`2c1a393a`'s own commit message states: "Production: none of the five is live; all
repo-only, never seeded." That claim is FALSE and is the proximate cause.** The two
rewritten probes had been seeded 34 hours earlier and are ACTIVE in production today.
Consequence beyond the harness: **production is serving two probes this repository
has already recorded as non-discriminating** — a content-quality issue, not merely a
certification mismatch. (The other three of that commit's five were misconception-id
renames on checkpoint probes; production's rows for those carry the NEW ids and are
DEPRECATED, so they are not part of the live drift.)

### POPULATION — MEASURED, not estimated (physics, all 238 concepts)

Method: normalise every stem identically on both sides (the real
`stripAuthoringLabel` + `normaliseQuestion`), aggregate per concept, compare.
Repo side = the SIX modules `answerSource.ts::loadCorpus` and
`instrumentation.ts` both use. Production side = `authorKind='HUMAN_CURATOR'`
probe rows, ALL statuses.

- Repo physics probes: **1,849**. Production physics seed-owned probe rows:
  **1,852** (1,649 ACTIVE, 203 DEPRECATED; seeded 2026-07-26 → 2026-08-31).
  The difference is exactly the 3 duplicates below — **the arithmetic closes
  with no residue**.
- **231 of 238 concepts are byte-identical** to the current repo corpus.
- 7 flagged. Resolved individually by per-stem multiset diff:

| class | count | concepts |
|---|---|---|
| **TRUE CONTENT DRIFT** (one stem replaced in repo; production keeps the old) | **2** | `phys.em.resistivity`, `phys.em.solenoid` |
| **DUPLICATE ROW** (one question, two ACTIVE identities) | **3** | `phys.mech.displacement`, `phys.mech.hookes-law`, `phys.mech.momentum` |
| comparison artifact (multisets identical; first method's sorted-join differed only by SQL-vs-JS collation) | 2 | `phys.em.dc-circuits`, `phys.therm.refrigerators` |

The 231 figure is SOUND in the safe direction: an identical hash implies an
identical multiset, so collation can only produce false positives, never hide drift.

**So the physics content-drift population is exactly TWO probes — the two already
known. There is no wider drift.**

### A THIRD DEFECT, FOUND WHILE MEASURING (VERIFIED, NEW — not previously recorded)

Three probes exist **twice** in production, both rows ACTIVE, same normalised stem,
different `canonicalSlug` — the 4-segment slug and the 5-segment difficulty-suffixed one:

- `phys.mech.displacement:mcq:en:middle` (2026-07-27) + `…:middle:foundational` (2026-08-25)
- `phys.mech.hookes-law:mcq:en:middle` (2026-07-27) + `…:middle:developing` (2026-08-25)
- `phys.mech.momentum:misconception_probe:en:high` (2026-08-11) + `…:high:developing` (2026-08-13)

Cause (INFERRED from `buildProbeSlugResolver`, `brainSeedAssets.ts:150-164`, and the
dates): the difficulty segment is appended only when MORE THAN ONE probe shares a
base slot. Adding a second probe to a slot therefore CHANGES THE FIRST PROBE'S SLUG
from 4 to 5 segments; the create-only writer finds no row under the new slug and
creates one, while the original row stays ACTIVE. **The slug is not stable under
corpus growth.** Effect: the served pool is over-counted by these rows (the E1
surplus rule `pool − 1 >= 3` counts rows), though `excludeProbeStem`/`hasAskedMcq`
still dedupe by stem so a learner should not see the same question twice.

### THE SYNCHRONISATION CONTRACT — reconstructed, and it is AMBIGUOUS

- **A. Is production supposed to equal the current repo corpus?** **UNKNOWN — no
  document states it.** `answerSource.ts`'s header asserts the harness indexes "the
  SAME authored corpus production was seeded from", and `loadCorpus`'s comment says
  its module list is "deliberately the SAME list `src/instrumentation.ts`'s cold-start
  bootstrap assembles" — both of which ASSUME equality without any mechanism
  enforcing it. ADR 14's lifecycle (DRAFT→REVIEW→ACTIVE→DEPRECATED→RETIRED, at most
  one ACTIVE per `canonicalSlug`) is about review state, not corpus parity.
- **B. If yes, what enforces it?** **Nothing does today.** VERIFIED.
- **C. If no, what is the legitimate revision contract?** The only content-refresh
  path that exists is REVIVAL: `seed-knowledge-assets.ts:235-266` updates `stem`,
  `choices`, `correctValue`, `difficulty`, `targetedMisconceptions`, `contentHash`
  and bumps `version` — but ONLY for a DEPRECATED/RETIRED row. So the de-facto
  contract is "ACTIVE is immutable; change requires deprecate-then-reseed", and
  nothing in the repo says so or automates it.

### REMEDIATION OPTIONS (recorded, NOT implemented — owner decision)

- **R-a — smallest safe fix, uses only existing mechanisms, no new code.** Set the
  two drifted rows to DEPRECATED, then run `scripts/brain/seed-knowledge-assets.ts`.
  The revive path restores them to ACTIVE with the current corrected stems and
  `version+1`. Two rows, reversible, no schema change. **This also fixes the
  content-quality problem, which is the stronger reason to do it.**
- **R-b — detection, so this cannot recur silently.** A CI/test check comparing each
  corpus probe's `contentHash` against production, or an offline drift report. The
  hash is already written on every row; nothing reads it.
- **R-c — make the identity stable under growth** (addresses the duplicates): always
  emit the difficulty segment, or reconcile old 4-segment rows on promotion. This
  changes `canonicalSlug` for existing rows and is NOT small — needs its own design.
- **R-d — REJECTED, do not do this.** Broadening the harness's matcher, indexing the
  answer source from production, or relaxing grading. Any of these would hide a real
  content defect and would breach the A-1 answer-source contract.

### VALIDATION REQUIRED BEFORE ANY REMEDIATION

1. Re-run the exact per-stem multiset comparison used here and confirm the drift set
   is still exactly those two (it is derived from live data and can move).
2. `--dry-run` the seeder first and confirm it reports `revived=2`, `created=0`.
3. Confirm the two revived stems then match the repo exactly, and that
   `phys.em.resistivity` / `phys.em.solenoid` still hold >= 3 gradeable ACTIVE probes
   (asset contract) afterwards.
4. Re-certify only those two concepts and check they leave `UNMEASURED-no-authored-match`.
5. Do NOT touch the 3 duplicates in the same change — different cause, different risk.

### AN INSTRUMENT ERROR I MADE, RECORDED SO IT IS NOT REPEATED

Mid-investigation I ran `git log -S "<production stem>" --all` and concluded the
stems had **"never existed in this repository's git history"**. That was WRONG: this
container's clone was **SHALLOW (63 commits, 2026-09-01 → 2026-09-05)**, so `--all`
searched almost nothing. After `git fetch --unshallow` (3,314 commits, from
2026-05-31) both stems were found immediately, with the commits that added and later
replaced them. **Check `git rev-parse --is-shallow-repository` before trusting any
history-based conclusion in this environment.**

### Effect on the P-1b write-up (§9e)
§9e's stated cause — "the corpus was edited after being seeded and never re-seeded" —
is CONFIRMED, and now has the commit, the timestamps and the code path behind it.
§9e's consequence — `UNMEASURED-no-authored-match` is an UPPER bound on
model-invention — also stands. What §9e could not say, and now can: the physics drift
population is **exactly 2 probes**, so for physics the overstatement is bounded at 2
concepts, not open-ended.

### Not measured
Chemistry and every other subject: **UNKNOWN**. The same create-only mechanism
applies to them, and the same measurement would work, but this task was scoped to
physics and no chemistry comparison was run.

### P-8 status
**DIAGNOSED. Root cause verified in code. Population measured. Nothing remediated.**

---

## 9h. P-8R PRE-REGISTRATION AND **STOP** — remediation blocked at the seeder step (2026-09-05)

**NO PRODUCTION WRITE WAS MADE.** Every precondition below was verified read-only
BEFORE any change, as the task required; one of them fails, and the task's own rule
5 ("if any precondition differs from P-8, STOP") applies. Recorded here in full so
the next session does not re-derive it.

### Pre-registration (what was authorised, recorded before the write boundary)
- Exactly TWO rows, no others:
  - `phys.em.resistivity` — assetId `61582820-e1e2-43cc-ae61-4b167c3316c6`,
    slug `phys.em.resistivity:mcq:en:high:proficient`, ACTIVE, **version 1**,
    contentHash **`hbecff101`**, created/updated 2026-08-14 15:17:17.584,
    HUMAN_CURATOR, 2 choices / exactly 1 correct.
  - `phys.em.solenoid` — assetId `8e90af3e-ca2b-48c5-ad44-16c37b8c69e6`,
    slug `phys.em.solenoid:mcq:en:high:developing`, ACTIVE, **version 1**,
    contentHash **`h3d5dbdf7`**, created/updated 2026-08-14 15:17:33.412,
    HUMAN_CURATOR, 2 choices / exactly 1 correct.
- Repo counterparts carry the SAME canonicalSlug and a DIFFERENT contentHash —
  `h12ea45f5` (resistivity) and `h6045c777` (solenoid) — which is exactly the
  create-only-skip signature P-8 established. **Precondition 2 and 3: MET.**
- Expected transition: ACTIVE -> DEPRECATED -> (seeder revive) -> ACTIVE, version 2,
  contentHash equal to the repo's, stem/choices/correctValue/difficulty/
  targetedMisconceptions all refreshed by `seed-knowledge-assets.ts:235-266`.
- Expected seeder report: **revived=2, created=0**.
- Post-state requirement: each concept retains >= 3 ACTIVE gradeable probes.
  Current ACTIVE gradeable MCQ counts (MEASURED): resistivity **5**, solenoid **5**
  (9 and 5 ACTIVE probe rows respectively). Both would remain >= 3 throughout.
- The 3 duplicate-slug rows (P-10) are explicitly NOT touched.

### Drift set re-confirmed without re-running the whole comparison (VERIFIED)
`asset_identity` for physics seed-owned probes is **immutable since 2026-08-30
21:34:08**: 1,852 rows, `max(updatedAt) = max(createdAt) = 2026-08-30 21:34:08`,
and **0 rows updated since 2026-09-04**. P-8's exhaustive 238-concept comparison ran
against this same unchanged table, so its result — exactly two content-drift probes —
still holds. **Precondition: MET.**

### THE BLOCKING PRECONDITION (VERIFIED — this is why the task stopped)

**The canonical seeder cannot be run from this session, and the cold-start bootstrap
is not a substitute.**

1. **No `DATABASE_URL`.** Unset in this container; no `.env`/`.env.local` exists.
   `scripts/brain/seed-knowledge-assets.ts` constructs `new PrismaClient()` and
   cannot connect. This is the same long-standing environment constraint recorded in
   CLAUDE.md ("Seeding cannot be done from a session"), re-verified today. Neither
   the Supabase MCP surface nor the Vercel MCP surface exposes the Postgres password
   or an env-var read, so the connection string cannot be assembled here either.
2. **The production cold-start bootstrap will NOT heal a DEPRECATED row**, so
   deprecating and waiting is not an alternative route. Two independent reasons,
   both read from code:
   - `src/instrumentation.ts:452-469` builds its `existing` map from
     `seedOwnershipWhere()`, which filters on `authorKind`/`authorId`/`tags` and
     **not on status**. A DEPRECATED row is therefore IN the map, so line 691's
     `dup` branch fires and the row is `skipped` — it is never revived and no
     replacement is created.
   - Even if it tried, the partial unique index
     `asset_identity_seed_slug_key ON ("canonicalSlug") WHERE "authorId" =
     'EDUCATIONAL_BRAIN_SEED'` (migration `20260804000000_...`) is **also
     status-agnostic**, so a second row for that slug would be rejected.
   The bootstrap's only status convergence is `DRAFT -> ACTIVE`
   (`src/instrumentation.ts:297`), which changes status and never content.

**Consequence.** Deprecating the two rows in this session would produce a stable,
NON-self-healing half-state: the two concepts would drop to 8 and 4 ACTIVE probes
(contract still met), the two defective probes would stop serving, and the corrected
probes would never arrive. It would also make the P-8 drift measurement read "0
drift" for the wrong reason — the drifted row removed rather than corrected —
corrupting the very measurement this work depends on. **So the deprecation was NOT
performed**, even though the task authorises it in isolation: half of an authorised
two-step repair is not the authorised repair.

### What was deliberately NOT done instead
Hand-writing the seeder's revive UPDATE through the Supabase MCP would reproduce the
right end state, and prior sessions have written seed content that way. It was not
done here: the task authorises "run the existing canonical seeder", not a
hand-composed production content write, and the rule "do not manually rewrite
stems/content unless the existing seeder itself performs that operation" is at best
ambiguous about a different transport. That is an owner call, not mine — see the
options below.

### OPTIONS FOR THE OWNER (none taken)
- **O-1 (matches P-8 R-a exactly).** Run, from any environment that has a real
  `DATABASE_URL`: deprecate the two `assetId`s named above, then
  `npx tsx scripts/brain/seed-knowledge-assets.ts` (no flags), and confirm it prints
  `revived=2 created=0`. Two rows, reversible, no schema change, no code change.
- **O-2.** Authorise this session to apply the seeder's revive UPDATE verbatim
  through the Supabase MCP — same fields, same version bump, same content, executed
  as two statements instead of by the script. Reaches the identical end state; the
  difference is transport and reviewability, not semantics.
- **O-3.** Defer. The two probes keep serving. They are gradeable and answerable, so
  learners are not blocked; they are simply the two probes this repo already recorded
  as non-discriminating, and the harness will keep reporting those two concepts
  `UNMEASURED-no-authored-match`.

### Certification: NOT performed
The task makes it conditional on "after successful remediation". No remediation
happened, so `phys.em.resistivity` and `phys.em.solenoid` were NOT re-certified, and
their P-1b verdicts stand unchanged (both UNMEASURED).

### State (VERIFIED)
- Git: HEAD == `origin/main`; production health before this work 200 / `db:true` /
  30s / 15s; no infrastructure error observed. Working tree carries only the five
  standing untracked dispatchers, untouched.
- Production `asset_identity`: **unchanged by this task** — still 1,852 physics
  seed-owned probe rows, `max(updatedAt) 2026-08-30 21:34:08`.
- **P-8 remains OPEN** (diagnosed, not remediated). **P-10 and P-7 remain open.**

---

## 9i. O-1 — SECOND STOP: this container still has no DATABASE_URL (2026-09-05)

O-1 was addressed to "an environment that has the real production DATABASE_URL".
**This session is not one, and nothing about that has changed since §9h.**
Step 5 of the task ("confirm DATABASE_URL exists") FAILS, so no production
mutation was attempted. **NO PRODUCTION WRITE WAS MADE.**

### Environment check (VERIFIED, no value printed)
- `DATABASE_URL` — **ABSENT**.
- No `DIRECT_URL`, no `POSTGRES_*`, no `SUPABASE_*`, no `PG*` variable is set.
- Only `.env.example` exists (a committed template, no credentials).
- Nothing sets a database URL in `~/.bashrc`, `~/.profile`, `~/.bash_profile`
  or `/etc/profile.d/`.
So `npx tsx scripts/brain/seed-knowledge-assets.ts` still cannot connect. The
Supabase MCP surface does not expose the Postgres password and the Vercel MCP
surface has no env-var read, so the URL cannot be assembled here either — all
re-verified, not assumed from §9h.

### Targets re-verified, unchanged (VERIFIED)
Both rows are byte-identical to the §9h pre-registration, so that record can be
used as-is when O-1 is finally run:

| assetId | concept | status | ver | contentHash | updatedAt |
|---|---|---|---|---|---|
| `61582820-e1e2-43cc-ae61-4b167c3316c6` | phys.em.resistivity | ACTIVE | 1 | `hbecff101` | 2026-08-14 15:17:17.584 |
| `8e90af3e-ca2b-48c5-ad44-16c37b8c69e6` | phys.em.solenoid | ACTIVE | 1 | `h3d5dbdf7` | 2026-08-14 15:17:33.412 |

Repo targets: `h12ea45f5` (resistivity), `h6045c777` (solenoid).
Production health at check time: HTTP 200, `db:true`, 30s / 15s.
Git: HEAD == `origin/main` == `40640c42`.

### RUNBOOK — paste this where `DATABASE_URL` is real (checked out at `main`)

```
# 1. pre-state (expect: 2 rows, ACTIVE, version 1, hashes hbecff101 / h3d5dbdf7)
psql "$DATABASE_URL" -c "SELECT \"assetId\",\"conceptId\",status,version,\"contentHash\"
  FROM asset_identity WHERE \"assetId\" IN
  ('61582820-e1e2-43cc-ae61-4b167c3316c6','8e90af3e-ca2b-48c5-ad44-16c37b8c69e6');"

# 2. deprecate EXACTLY these two (expect: UPDATE 2)
psql "$DATABASE_URL" -c "UPDATE asset_identity SET status='DEPRECATED',
  \"deprecationReason\"='P-8 corpus drift remediation 2026-09-05'
  WHERE \"assetId\" IN
  ('61582820-e1e2-43cc-ae61-4b167c3316c6','8e90af3e-ca2b-48c5-ad44-16c37b8c69e6');"

# 3. run the canonical seeder UNCHANGED, no flags
npx tsx scripts/brain/seed-knowledge-assets.ts

# 4. REQUIRED result line: revived=2 created=0 (skipped will be large; that is normal)
#    STOP and report if created > 0, or if any row other than these two is revived.

# 5. post-state (expect: ACTIVE, version 2, hashes h12ea45f5 / h6045c777)
psql "$DATABASE_URL" -c "SELECT \"assetId\",\"conceptId\",status,version,\"contentHash\"
  FROM asset_identity WHERE \"assetId\" IN
  ('61582820-e1e2-43cc-ae61-4b167c3316c6','8e90af3e-ca2b-48c5-ad44-16c37b8c69e6');"
```

Rollback if step 4 misbehaves: set both rows back to `status='ACTIVE'`. The
seeder never deletes, so nothing is lost; a wrong revive is corrected by
re-running after fixing the corpus.

Do NOT substitute `--draft` (it would seed DRAFT and the rows would not serve),
and do NOT add flags. The 3 duplicate-slug P-10 rows are untouched by this
sequence because they are not DEPRECATED.

### Alternative, if this session is meant to do it
**O-2 still stands and is one message away**: authorise applying the seeder's
revive UPDATE verbatim through the Supabase MCP — the same fields
(`stem`, `choices`, `correctValue`, `difficulty`, `targetedMisconceptions`,
`contentHash`, `status`, `version+1`) that `seed-knowledge-assets.ts:235-266`
writes, executed as two statements. Identical end state; the difference is
transport and reviewability, not semantics. Without that authorisation the
remediation cannot happen from here at all.

### Certification: NOT performed
Conditional on successful remediation, which did not occur. Both concepts keep
their P-1b verdict (UNMEASURED). Physics Tier-A totals unchanged: 149 attempted,
140 CERTIFIED / 9 UNMEASURED.

### Status
**P-8 remains OPEN** — diagnosed, runbook written, blocked only on an
environment with a real `DATABASE_URL` (or on O-2). **P-7, P-9, P-10 remain
open. P-2 / P-5 not started.**

---

## 9j. O-2 PRE-REGISTRATION — recorded BEFORE the production write (2026-09-05)

Owner authorised O-2: apply the canonical seeder's revive semantics to the two
drifted rows through the Supabase MCP, because O-1's environment does not exist
here. **This section was committed BEFORE any production mutation.**

### A DEFECT FOUND WHILE RE-READING THE SEEDER — READ THIS FIRST (VERIFIED)

**The canonical seeder's revive path cannot run at all. It has never run.**

`scripts/brain/seed-knowledge-assets.ts` calls, in BOTH the explanation revive
(line 165) and the probe revive (line 236):

```
await prisma.assetIdentity.update({ where: { id: existing.id }, … })
```

`AssetIdentity`'s primary key is `assetId` (`prisma/schema.prisma`:
`assetId String @id @default(uuid())`). The generated client's
`AssetIdentityWhereUniqueInput` (node_modules/.prisma/client/index.d.ts:155900)
offers `assetId` and has **no `id` field at all**, so `existing.id` is
`undefined` and the call fails Prisma validation before reaching the database.

It was never caught because **`tsconfig.json` excludes `scripts`**
(`exclude: ["node_modules","vitest.config.ts","src/tests","scripts"]`), verified
with `tsc --listFiles`: the seeder is not in the program.

**Consequences, stated plainly:**
- O-1's expected `revived=2 created=0` was **never achievable**. The runbook in
  §9i would have thrown at its step 4. §9i is corrected by this section.
- Revival — the ONLY content-refresh path the pipeline has (§9g) — has never
  worked. So P-8's drift has no working automated repair today, in any
  environment, with or without `DATABASE_URL`.
- This does NOT block O-2: the seeder's *intended* field updates are stated
  unambiguously in its own `data` block, and the broken part is the row
  SELECTOR, not the semantics. I have the two `assetId`s exactly. So the
  semantics can be reproduced confidently — but they are reproduced from
  INTENT, not from observed behaviour, and that distinction is recorded here
  rather than glossed.
- Raised as **P-11**. Not fixed here: fixing it is a source change, which this
  task forbids.

### Pre-write state (VERIFIED, re-read immediately before this entry)

| field | resistivity `61582820-e1e2-43cc-ae61-4b167c3316c6` | solenoid `8e90af3e-ca2b-48c5-ad44-16c37b8c69e6` |
|---|---|---|
| status / version | ACTIVE / 1 | ACTIVE / 1 |
| canonicalSlug | `phys.em.resistivity:mcq:en:high:proficient` | `phys.em.solenoid:mcq:en:high:developing` |
| contentHash | `hbecff101` | `h3d5dbdf7` |
| tags | `{physics,mcq}` | `{physics,mcq}` |
| deprecationReason | null | null |
| difficulty | PROFICIENT | DEVELOPING |
| choices | 2 | 2 |
| keywords / requiredVisuals | `{}` / `{}` | `{}` / `{}` |

Repo targets: contentHash `h12ea45f5` / `h6045c777`; tags `{physics,mcq}`
(unchanged); difficulty PROFICIENT / DEVELOPING (unchanged);
targetedMisconceptions unchanged; **stem, choices (2 -> 3) and correctValue
change**. Git HEAD == origin/main == `baa471a6`, tree clean. Production health
200 / `db:true` / 30s / 15s.

### Exactly what will be written, and nothing else

Two rows in `asset_identity`, two rows in `probe_assets`. Selected by `assetId`
IN (those two literals) and additionally guarded on the expected pre-state, so a
row that has moved cannot be hit.

Step 1 — reach the revivable state the seeder requires
(`REVIVABLE = {DEPRECATED, RETIRED}`, line 156): `status = 'DEPRECATED'`, nothing
else. `deprecationReason` deliberately left NULL — the seeder's revive never
clears it, so writing one would leave a false reason on a row that ends ACTIVE.

Step 2 — the seeder's revive `data` block, field for field:
- `asset_identity`: `status='ACTIVE'`, `version = version + 1` (1 -> 2),
  `contentHash` = repo hash, `tags = {physics,mcq}`, `updatedAt = now()`
  (Prisma's `@updatedAt` would set it; raw SQL must).
- `probe_assets` (the `upsert.update` branch — FIVE fields only): `stem`,
  `choices`, `correctValue`, `difficulty`, `targetedMisconceptions`.
  `keywords` and `requiredVisuals` appear ONLY in the `create` branch and are
  therefore NOT touched (both are already `{}`).
- Untouched everywhere: `parentVersionId`, `qualityScore`, `qualityConfidence`,
  `sampleSize`, `sourceTraceId`, `intellectualProperty`, `curriculumMappings`,
  `incompatibilities`, `prerequisites`, `createdAt`, `deprecationReason`,
  `tolerance`, `sampleAnswer`, `discriminationScore`.

### Expected result (the pass/fail criteria, fixed in advance)
- Exactly 2 rows updated per statement; 0 rows created; no new `canonicalSlug`.
- Both rows end ACTIVE, version 2, carrying `h12ea45f5` / `h6045c777`, with
  production stems byte-equal to the repo stems.
- Both keep exactly one `isCorrect` choice (3 choices each) — still gradeable.
- resistivity keeps >= 3 ACTIVE gradeable probes (5 before, 5 after);
  solenoid likewise (5 before, 5 after).
- Physics drift comparison afterwards: **0 true content-drift probes**; the 3
  P-10 duplicate-slug cases unchanged and still separate.
- No row outside these two changes: `asset_identity` physics seed rows total
  stays 1,852, and `max(updatedAt)` for every OTHER row stays
  2026-08-30 21:34:08.

### Rollback
Restore from this section: `status='ACTIVE'`, `version=1`,
`contentHash='hbecff101'`/`'h3d5dbdf7'`, and the pre-write stem/choices/
correctValue, which are recorded in production's own history only here — so
**this ledger entry is the rollback source** and is committed before the write
for that reason.

### STOP conditions honoured
Both identities matched exactly; only two rows are addressed; the semantics are
reproducible (see the defect note above for the one caveat); every statement is
verifiable by read-back. Proceeding.

---

## 9k. O-2 REMEDIATION APPLIED AND VALIDATED — physics content drift is ZERO (2026-09-05)

Written through the Supabase MCP, reproducing the canonical seeder's revive
`data` block field for field (see §9j for why the seeder itself cannot run).
**Exactly two `asset_identity` rows and their two `probe_assets` rows changed.**

### The write (MEASURED, each statement read back)
1. `UPDATE asset_identity SET status='DEPRECATED'` guarded on
   `assetId IN (…two…) AND status='ACTIVE' AND version=1 AND
   authorKind='HUMAN_CURATOR' AND contentHash IN ('hbecff101','h3d5dbdf7')`
   -> **RETURNING confirmed exactly 2 rows.** `deprecationReason` left NULL by
   design (the seeder's revive never clears it).
2. Two per-asset CTE statements, each reporting `identities_updated=1`,
   `children_updated=1`, `n_choices=3`:
   - `asset_identity`: `status='ACTIVE'`, `version=version+1`,
     `contentHash` = repo hash, `tags=ARRAY['physics','mcq']`, `updatedAt=now()`
     (Prisma `@updatedAt` equivalent).
   - `probe_assets`: `stem`, `choices`, `correctValue`, `difficulty`,
     `targetedMisconceptions` — the seeder's `upsert.update` branch, five fields.
     `keywords` / `requiredVisuals` NOT touched (create-branch only; both `{}`).

### Before -> after (MEASURED)

| | resistivity `61582820-…c6` | solenoid `8e90af3e-…e6` |
|---|---|---|
| status | ACTIVE -> ACTIVE | ACTIVE -> ACTIVE |
| version | 1 -> **2** | 1 -> **2** |
| contentHash | `hbecff101` -> **`h12ea45f5`** | `h3d5dbdf7` -> **`h6045c777`** |
| choices | 2 -> **3** | 2 -> **3** |
| exactly one `isCorrect` | yes -> **yes** | yes -> **yes** |
| difficulty | PROFICIENT (unchanged) | DEVELOPING (unchanged) |
| targetedMisconceptions | unchanged | unchanged |
| correctValue | replaced by the repo's | replaced by the repo's |
| tags / deprecationReason / parentVersionId / keywords / requiredVisuals | `{physics,mcq}` / null / null / `{}` / `{}` | same |
| updatedAt | 2026-08-14 15:17:17.584 -> 2026-09-05 04:15:59.425 | 2026-08-14 15:17:33.412 -> 2026-09-05 04:16:11.327 |

**Stems are byte-equal to the repo**, checked by md5 + length rather than by eye:
`c7cc45dd53541b73f373f68bc81f896b` / 217 chars (resistivity) and
`32e9473f1254e0d72ceab5d5a419b1a2` / 170 chars (solenoid) on BOTH sides.

The two probes production now serves are the corrected, discriminating ones:
resistivity varies length AND area (the old one varied area only, where the
tagged misconception yields the right answer anyway); solenoid varies length AND
radius (the old one held radius fixed while claiming to test a radius belief).

### Full physics parity re-run (MEASURED, order-independent method)
All 238 concepts, production `HUMAN_CURATOR` probe rows (all statuses) vs the six
corpus modules:

- **identical: 235** (was 231)
- **TRUE CONTENT DRIFT: 0** — the objective, met
- production-has-extra-rows: **3** — `mech.displacement` (14/13),
  `mech.hookes-law` (15/14), `mech.momentum` (19/18): exactly the P-10
  duplicate-slug cases, **untouched and still tracked separately**
- production-missing-rows: 0

235 + 3 = 238. The count rose from P-8's 231 because this run used the
order-independent digest, which does not produce the two collation false
positives (`em.dc-circuits`, `therm.refrigerators`) P-8 recorded and resolved by
per-stem diff. Nothing about those two concepts changed.

### Unrelated-row safety (MEASURED, not asserted)
- Physics seed-owned probe rows: **1,852 before and after** — no row created,
  none deleted, no duplicate slug (2 rows across the two target slugs).
- Rows with `updatedAt` after 2026-08-31: **exactly 2** — the targets.
- `max(updatedAt)` across **every other** physics seed row: still
  **2026-08-30 21:34:08.046**, unchanged.

### Asset contract after the change (MEASURED)
- `phys.em.resistivity`: 9 ACTIVE probes, **5 ACTIVE gradeable closed-choice**
- `phys.em.solenoid`: 5 ACTIVE probes, **5 ACTIVE gradeable closed-choice**
Both >= 3. Unchanged by the remediation (a replacement, not an addition).

### Production health after
4 consecutive `/api/health` calls: HTTP 200, `db:true`,
`statementTimeout 30s`, `lockTimeout 15s`, ~1.1 s each. One earlier probe
returned curl code 000 (a transport-level failure with no HTTP response);
re-checked four times immediately and it did not recur — recorded as transient
rather than quietly dropped.

### Git
Pre-registration `f6033799` (committed BEFORE the write, and the sole source of
the rollback values). HEAD == origin/main. No source file changed by O-2.

---

## 9l. O-2 CERTIFICATION — solenoid CERTIFIED; resistivity blocked by a DIFFERENT, pre-existing seam (2026-09-05)

Protocol unchanged: `runPhysicsO2_2Concept.ts` imports `runTierA.ts`'s exported
`runWithRetry` verbatim and adds no verdict, retry or answer-source logic. Two
workers, one concept each; w1 deliberately unused (its spine log makes every
hydration expensive, §9e). Committed, per the P-7 policy.

### Result — two runs, both against `de879a09`

| run | concept | verdict | turns | phase | check/practice | verified | closed |
|---|---|---|---|---|---|---|---|
| `physicsO2-2c-1788582016781` | **phys.em.solenoid** | **CERTIFIED** | 6 | TRANSFER | 1 / 2 | true | true |
| | phys.em.resistivity | FAILED_INFRASTRUCTURE (retried) | 6 | CHECK | 1 / 0 | false | false |
| `physicsO2-2c-1788582254077` | **phys.em.solenoid** | **CERTIFIED** | 6 | TRANSFER | 1 / 2 | true | true |
| | phys.em.resistivity | FAILED_INFRASTRUCTURE (retried) | 5 | PRACTICE | 1 / 0 | false | false |

**`phys.em.solenoid` moves UNMEASURED -> CERTIFIED, reproducibly.** For that
concept the drift WAS the whole reason it was unmeasured.

### The remediation is verified correct for BOTH concepts, independently of the verdict
- The harness's answer index (`buildAnswerIndex`, real module, fingerprint
  `probes:2750:h5e86a3a9`) now contains **both** remediated stems, unambiguous,
  with the authored correct text. Neither can return `no-authored-match` again.
- Production's stored choices are **byte-identical to the repo**: per-option md5
  matches on all six options (207/107/71 and 198/106/100 chars). An earlier
  aggregate-hash mismatch was **my own query artifact** (`string_agg` with an
  `E''` separator), not a content difference — corrected here rather than left
  standing.
- Production **served the remediated resistivity probe**: runtime log
  `[gate-assessment] {"phase":"CHECK","move":"ask","probeFound":true,
  "converted":true,"assetId":"61582820-e1e2-43cc-ae61-4b167c3316c6"}`.

### `FAILED_INFRASTRUCTURE` on resistivity is a MISCLASSIFICATION (VERIFIED)
**No provider failed.** In the whole run window the Vercel logs contain **zero**
`all providers failed` and **zero** `AIRateLimitError` lines, and every
`[ai/attempt]` reads `provider=groq outcome=ok http_status=200`. What actually
happened, from the captured turn at 04:27:03:

1. groq returned 200 with 632 chars.
2. The learner's answer to the remediated probe came back ungradeable —
   `[mcq-grade] { asked: 'Start from a copper wire of resistance R', chosen: null,
   correct: null }` — and the I1 guard fired
   (`[mcq-reoffer-disambiguation] ungradeable answer against a pending probe`).
3. The model asked its own question instead; the gate declined it
   (`[gate-assessment] {"event":"model-probe-withheld","reason":"gate-declined-by-policy"}`).
4. Stripping that question left the reply EMPTY (`empty response from model,
   finish_reason: stop`), so the route served the degraded template and stamped
   `provider: "degraded"`.
5. The harness reads `isDegradedProvider` and reports FAILED_INFRASTRUCTURE.

So the verdict is honest about "the teaching engine was not exercised" and wrong
about WHY. This is the fourth-blind-spot pattern CLAUDE.md already warns about:
**read the captured turn before believing a verdict.**

**Root cause of the ungradeable submission: UNKNOWN.** It is NOT content
(byte-identical), NOT the answer index (present and unambiguous), and NOT the
provider. Option length alone does not explain it either — solenoid's correct
option is 198 chars and graded fine, twice. It belongs to the I1 / P-9
ungradeable-answer seam, which this task forbids touching. **Not diagnosed
further, not patched.**

**No third attempt was made.** The registered retry policy fired once per run,
twice in total; the cause is not transient, so more attempts would only
manufacture the same evidence.

### Session and attempt hygiene (MEASURED)
- Sessions created in the window: w2 4, w3 2 (two runs x one concept x
  {lesson-init + retry}). **0 ACTIVE afterwards** on both accounts.
- `lesson_attempts`: solenoid (`lesson:142`) **2 x COMPLETED, 1 concept mastered
  each, 0 needing review, 0 budget exhaustions**, 107 s and 82 s. Resistivity
  (`lesson:130`) 1 IN_PROGRESS, 0 mastered, **0 needing review, 0 budget
  exhaustions** — no teaching failure was recorded against it.
- No regression: nothing previously CERTIFIED was re-run or changed.

### Updated Physics Tier-A totals
149 attempted -> **141 CERTIFIED / 8 UNMEASURED**. `phys.em.solenoid` moves
UNMEASURED -> CERTIFIED. `phys.em.resistivity` is **no longer UNMEASURED-by-drift
but is not certified**: its latest verdict is FAILED_INFRASTRUCTURE, which is
neither a certification nor a teaching failure. **No historical
no-authored-match population is reclassified beyond these two concepts.**

### P-8 closure
**P-8 is CLOSED.** Root cause verified (§9g), remediation applied and validated
(§9k), physics content drift measured at **zero**, and one of the two affected
concepts certified. The residue is not drift.

Open: **P-9** (ungradeable-answer seam — now with a second, sharper instance),
**P-10** (3 duplicate-slug rows), **P-11** (the seeder's revive path is dead code:
`where: { id: … }` against an `assetId` primary key, in a file `tsconfig`
excludes). P-2 / P-5 not started. **P-7 closed** (§9f).

---

## 9m. P-9 DIAGNOSIS — the ungradeable-answer seam: ROOT CAUSE FOUND (2026-09-05, READ-ONLY)

Diagnosis only. **No source, test, schema, grading, mastery or production change.
No certification re-run** — the failure reproduces deterministically offline
against the real modules, so no new failed attempt was manufactured.

### ROOT CAUSE (VERIFIED — reproduced with the real grader, not inferred)

**`resolveMcqChoice`'s rule 0a treats letters inside the OPTION TEXT as the
learner labelling a choice.** `src/lib/teaching/mcq.ts:783-797`:

```
for (const m of message.matchAll(/(?:^|[\s(])([a-dA-D])(\s*[.)\],:;-])?(?=\s|$)/g)) { … }
if (labelled.size === 1 && named.size === 1) return [...labelled][0]
if (labelled.size > 1) return null          // <- fires here
```

Rule 0a runs on the RAW message and **before** rule 0, the exact-text match
(`mcq.ts:799`) that a UI tap is supposed to hit — deliberately, because "an
explicit label is the strongest statement of intent a learner can make."

The remediated `phys.em.resistivity` option text begins
`Wire A: 2R (…) … Wire B: R/2 (…)`. Rule 0a sees ` A:` and ` B:` — each a
standalone letter preceded by whitespace, followed by a delimiter from its own
class, followed by whitespace — and reads them as the learner naming TWO
different options. `labelled.size === 2 > 1` ⇒ **`return null`**, before the
exact match can succeed.

**Measured with the real `resolveMcqChoice`, submitting each option verbatim
(exactly what tapping sends):**

| probe | option 0 | option 1 | option 2 |
|---|---|---|---|
| `phys.em.resistivity` (remediated) | **null** | **null** | **null** |
| `phys.em.solenoid` (remediated) | 0 OK | 1 OK | 2 OK |

Rule-0a scan of each correct option: resistivity `named=[A,B,a] labelled=[A:,B:]`;
solenoid `named=[B,B] labelled=[]` — solenoid's "B = mu_0" and "in B at all"
carry no delimiter, so it falls through to the exact match and grades. **That is
the entire difference between the two concepts, and it is not option length**
(198 vs 207 chars), which §9l left as an open possibility and this closes.

**`phys.em.resistivity`'s remediated probe cannot be graded by ANY answer,
including a real learner tapping the correct option in the UI.**

### The remediation EXPOSED this; it did not cause it (VERIFIED)
The pre-remediation probe, recovered from git (`2c1a393a^`), had options
`The thicker one has HALF the resistance — …` / `The thicker one has double the
resistance — …`. Both resolve correctly (0 -> 0, 1 -> 1). The corrected text
introduced the `Wire A:` / `Wire B:` construction, and with it the collision.
So O-2 was right to write it, and the defect is older than O-2.

### FIRST INCORRECT STATE TRANSITION
`resolveMcqChoice(<the option the learner tapped>, pendingMcq)` -> `null`
at `src/lib/teaching/mcq.ts:796`. Everything after that is downstream.

### THE FULL CHAIN, and how many defects it really is
Three distinct issues, one root cause and two amplifiers:

1. **ROOT CAUSE — `mcq.ts:796`.** A valid answer scores `null`, so
   `gradeMcqAnswer` returns null and `[mcq-grade] chosen:null correct:null` is
   logged. No evidence is written. **Correct-by-design given its inputs**: the
   rule cannot tell a learner's label from an author's prose.
2. **AMPLIFIER A — the empty-text guard ignores a probe that is on screen but not
   attached THIS turn.** `route.ts:5366` reads
   `if (!text.trim() && mcqHoisted)`. But twelve lines earlier
   (`route.ts:~5254`) `if (modelProbeWithheld) mcqHoisted = null` — the model's
   own question was declined by policy (`decideModelProbe`, logged
   `model-probe-withheld / gate-declined-by-policy`) because an unanswered probe
   was already displayed (`gate-eligibility … blockedBy:["noUnansweredProbeOnScreen"]`).
   The MCQ tag had already been parsed out of `text`, so `text` was empty and
   `mcqHoisted` was null ⇒ the guard could not fire ⇒
   `degradedTurn()` ⇒ `provider = 'degraded'`.
   The guard's own comment states the rule it breaks: *"a turn's content is its
   text PLUS its structured payloads, and any check for 'nothing here' must look
   at both."* A carried-forward `pendingMcq` — and `withheldModelMcqHoisted`,
   which the route already holds — are structured payloads it does not consult.
3. **AMPLIFIER B — one degraded turn outranks every other signal in the verdict.**
   `scripts/certification/measurementIdentity.ts:111`:
   `if (input.degradedTurns > 0) return 'FAILED_INFRASTRUCTURE'`, ahead of
   everything. So a content defect is reported as an infrastructure outage, and
   `runTierA.ts:217` then spends the one automatic retry on it, which cannot help.

**Root cause vs symptom:** (1) is the defect. (2) mislabels the turn. (3)
mislabels the run. (2) and (3) are each independently wrong and each would
misreport other situations, but neither would have fired without (1).

### Why the empty response is classified as degraded/infrastructure
`route.ts:5373-5378`: empty text with no `mcqHoisted` calls `degradedTurn()` from
`@/lib/eos-runtime`, which returns the outage template and sets
`provider='degraded'`. `isDegradedProvider(provider)` then stamps
`degradedTurn: true` on the ladder gates (`route.ts:6956/7171/8521`), which the
route's own comment says "stops a turn counting as a give". The harness reads
the same flag and applies the precedence at `measurementIdentity.ts:111`.

### SCOPE — does this affect normal learner grading? YES, and it is measured
Ran the real `resolveMcqChoice` over the whole authored corpus, submitting each
correct option verbatim (the tap payload):

- **2,750** gradeable-by-shape probes examined.
- **21 (0.76%)** where the CORRECT option does not resolve to itself — a learner
  who taps the right answer is not graded.
- **4** where EVERY option fails.
- Split by cause: **3 are this rule-0a defect** (`phys.em.resistivity`,
  `chem.equil.solubility`, `chem.bio.nucleic-acids` — all with two labelled
  letters in the option text); **18 have a DIFFERENT cause**, overwhelmingly
  short symbolic options (`+500 J`, `Δx · Δp ≥ ħ/2`, `MgCl₂`, `−3.4 eV`,
  `O₃ … O₂`, `pH 9 and pOH 5`). That second class is real but is NOT this seam
  and was **not** diagnosed here — it is out of P-9's scope and is flagged, not
  guessed at.
- Per subject (broken correct-option): chemistry 16/931, physics 4/1308,
  mathematics 1/83, english 0/428.

This is a **live learner-facing defect, not a harness artifact**: the harness
submits exactly what the UI submits, so a real learner tapping the correct
option on any of those 21 probes gets no credit.

### Can it corrupt certification / mastery accounting?
- **It cannot create false mastery.** The failure direction is always
  *under*-credit: `null` writes no signal, no `TopicProgress` evidence, no gate
  counter. `masteryVerifiedStrict` reads only verified counters.
- **It can and does suppress earned mastery**: the learner's correct answer is
  discarded, `correctAtCheck`/`correctAtPractice` do not advance, the lesson
  cannot close. Measured twice on resistivity (check 1 / practice 0, never
  verified).
- **It corrupts the verdict, not the evidence**: via amplifier B the run is
  labelled FAILED_INFRASTRUCTURE, which is neither a certification nor a teaching
  failure — so the concept is neither certified nor honestly recorded as blocked.

### REGRESSION-TEST DESIGN (designed, NOT implemented, per instruction)
Deterministic, no provider, no database, no network.

1. **`resolveMcqChoice` — author prose must not be read as a learner label.**
   Drive the REAL function with the real remediated `phys.em.resistivity` probe:
   assert each option submitted verbatim resolves to its own index. Add the two
   sibling cases (`chem.equil.solubility`, `chem.bio.nucleic-acids`). Negative
   controls that must KEEP working, or the fix has over-reached: `"A."` alone ->
   0; `"ok i think A. but sir explain"` -> 0 (the 2026-08-25 production case the
   rule exists for); `"A or B, i am not sure"` -> null; `"a lens bends light"`
   -> null.
2. **Corpus guard (the durable one).** Iterate every authored probe the seed
   corpus exposes and assert `resolveMcqChoice(correctOption, mcq) ===
   correctIndex`. Today that fails on 21 probes; ratchet it at the current count
   and drive to 0, so no future authoring can add an ungradeable probe silently.
   This is the test that would have caught O-2's content before it shipped.
3. **Empty-turn guard (amplifier A).** Pure-function test of the branch's
   inputs: text empty + `mcqHoisted === null` + a pending probe on screen must
   NOT produce `provider='degraded'`. Written against the decision inputs, not
   by matching template prose.
4. **Verdict precedence (amplifier B).** `classifyVerdict` with
   `degradedTurns: 1` alongside real graded evidence — assert the verdict
   distinguishes "the provider failed" from "the turn emptied for another
   reason". Requires deciding what the right verdict IS, which is an owner call.

### Confidence
- Root cause, first bad transition, exact file/line: **VERIFIED**, reproduced
  deterministically offline with the real `resolveMcqChoice` and confirmed
  against the captured production turn.
- The three-link chain (null -> withheld -> empty -> degraded -> verdict):
  **VERIFIED** against route.ts source and the captured log lines.
- The 21/2,750 corpus figure and its 3-vs-18 split: **MEASURED**.
- **UNRESOLVED:** the 18 non-rule-0a failures are counted but not explained —
  short/symbolic options are the visible pattern, not a diagnosis. Also
  **UNKNOWN**: whether any of the 21 has ever blocked a real (non-harness)
  learner, since this deployment has essentially no organic traffic.

### Correction to an earlier ledger claim
§9l left the resistivity cause "UNKNOWN … option length does not explain it".
That is now resolved: the cause is rule 0a, and length is confirmed irrelevant.
§9l's facts are otherwise unchanged. **Separately, §9j overstated the rollback:**
it called itself "the rollback source", but it recorded hashes and the choice
COUNT, not the pre-write option TEXT. The true rollback source is git
(`2c1a393a^`), where the pre-remediation options are intact — verified while
investigating.

### EXACT NEXT ACTION (not taken)
Fix (1) — make rule 0a ignore a letter that is part of the option text the
learner is quoting, most cheaply by running the exact-text match BEFORE the
label scan, since a verbatim option match is a stronger statement of intent than
a letter inside it. Then land regression tests 1 and 2. Treat (2) and (3) as
separate, smaller changes. **P-9 remains OPEN; nothing was patched.**

---

## 9n. P-9 ROOT FIX — exact match now runs before the label scan (2026-09-05)

Ordering change only, in one function. Rule 0a is byte-for-byte unchanged; it
simply no longer runs first.

### The fix
`src/lib/teaching/mcq.ts` — the rule 0 EXACT MATCH block (`norm(option) === n`)
moved ABOVE the rule 0a labelled-letter scan, inside `resolveMcqChoice`, after
the `NON_COMMITTAL` guard. 46 insertions / 21 deletions, nearly all comment.
No other file's behaviour is touched: no route, no gate, no mastery, no schema,
no corpus content.

Why this is the right cut: tapping an option sends that option's text verbatim,
so an exact match is the learner saying WHICH option in the only way the UI can
say it. Rule 0a INFERS a choice from letters in the sentence; when the sentence
IS an option, those letters belong to the author.

### The defect was worse than §9m reported — a correction
§9m said the failure direction "is always under-credit … cannot create false
mastery". **That is wrong, and the measurement that proves it was made while
implementing this fix.** Rule 0a returning ONE labelled letter did not return
null — it returned THAT LETTER'S INDEX, which is a different option than the one
tapped. Measured across the corpus before the fix:

| | before | after |
|---|---|---|
| option taps resolving to a DIFFERENT option | **6** | **0** |
| — of which a DISTRACTOR graded as CORRECT (false credit) | **4** | **0** |
| — of which the CORRECT option graded as a distractor | 2 | 0 |
| option taps resolving to null | 47 | 42 |
| correct options unresolvable | 21 | **16** |
| probes where NO option resolves | 4 | **3** |
| of those, caused by rule 0a | 3 | **0** |

The four false-credit cases were `phys.em.dc-circuits`, `phys.mech.impulse`
("A, because it is a much bigger force" -> index 0), `phys.mech.angular-momentum`
("Object A, since it spins faster" -> 0) and `phys.wave.shm-energy`
("At x = A, the point of maximum displacement" -> 0). A learner tapping any of
those distractors was recorded as answering correctly. **So this defect COULD
fabricate mastery evidence, and did so on four probes.** §9m stands otherwise.

The remaining **16** unresolvable correct options are the unrelated symbolic
class (`+500 J`, `MgCl₂`, `Δx · Δp ≥ ħ/2`, `−3.4 eV`, `pH 9 and pOH 5`). **Out
of P-9's scope, untouched, and not hidden** — they are ratcheted by a test.

### Tests added — `src/tests/mcqExactMatchPrecedence.test.ts` (13 cases, new file)
Drives the REAL `resolveMcqChoice` over the REAL corpus modules; nothing is
hand-transcribed, so a future edit to one of these probes is exercised as
written.

1. The three probes rule 0a mis-read (`phys.em.resistivity`,
   `chem.equil.solubility`, `chem.bio.nucleic-acids`): every option must resolve
   to its own index.
2. A FIXTURE guard — `phys.em.resistivity`'s correct option must still carry two
   labelled letters. Without it, test 1 could go green because the content was
   rewritten rather than the parser fixed.
3. Negative controls, all preserved: `"A."` -> 0; `"ok i think A. but sir
   explain"` -> 0 (the 2026-08-25 production case rule 0a exists for);
   `"A or B, i am not sure"` -> null; `"a lens bends light"` -> null;
   `"maybe A. or maybe B."` -> null (two labels in the LEARNER's own sentence
   are still ambiguous); two options normalising alike -> null.
4. **Corpus guard, not ratcheted:** no option anywhere may resolve to a
   DIFFERENT option. The only acceptable number is zero, because this is the
   false-evidence half.
5. **Corpus guard, scoped:** no correct option may be unresolvable *because of
   the labelled-letter rule*. Deliberately not asserted over the other 16 —
   asserting there would either fail for something this fix never claimed to
   address, or invite editing the corpus to make a test pass.
6. **Ratchet:** total unresolvable correct options `<= 16`, and corpus size
   `>= 2750`. It must not grow; lowering it is separate work.

**NEGATIVE CONTROL RUN (the check this repo has been bitten for skipping):**
with `mcq.ts` reverted to pre-fix, **6 of the 13 fail**; the 7 that pass in both
states are exactly the negative controls, which is their job. The suite is not a
mirror of the implementation.

### Validation
- Targeted first: 7 mcq/parser test files, **200 passed**.
- `npx tsc --noEmit` **clean**.
- Full suite **555 files / 11,890 passed / 9 skipped**.
- `npm run build` **clean**, middleware 79.7 kB (unchanged).

### Production validation
Result in §9o below. Deployed as `dpl_HeX9M9r3Pgc5RjnmefRpjM4FqwEA` (SHA
`c850af53`), READY, then ONE run of the established two-concept dispatcher —
no repeated attempts.

### Status
**P-9 root defect FIXED.** Explicitly NOT in this change and still open:
**AMP-A** (`route.ts` empty-turn/degraded classification) and **AMP-B**
(`measurementIdentity.ts` degraded-turn verdict precedence) — both still
mislabel a turn and a run, and both were left alone deliberately.
**P-10** and **P-11** untouched.

---

## 9o. P-9 PRODUCTION VALIDATION — resistivity CERTIFIED on the first run after the fix (2026-09-05)

One run, `physicsO2-2c-1788583912536`, against `dpl_HeX9M9r3Pgc5RjnmefRpjM4FqwEA`
(SHA `c850af53`, READY). Protocol unchanged. No attempt was repeated.

| concept | verdict | turns | phase | check/practice | verified | closed | degraded |
|---|---|---|---|---|---|---|---|
| **phys.em.resistivity** | **CERTIFIED** | 6 | TRANSFER | 1 / 2 | true | true | 0 |
| **phys.em.solenoid** | **CERTIFIED** | 6 | TRANSFER | 1 / 2 | true | true | 0 |

`phys.em.resistivity` goes **FAILED_INFRASTRUCTURE -> CERTIFIED** on the first
attempt after the fix deployed, having failed twice on two separate runs before
it. `failed: []`, `unmeasuredReason: null`, **0 degraded turns** — the empty-turn
and degraded-classification path (AMP-A) was never entered, because the answer
graded instead. That is the causal chain from §9m closed end to end in
production, not just offline.

**Hygiene (MEASURED):** 1 session per worker, **0 ACTIVE afterwards**;
`lesson_attempts` both COMPLETED with 1 concept mastered, **0 needing review, 0
budget exhaustions**, 89 s and 82 s. Health after: 3x HTTP 200, `db:true`,
30s / 15s.

### Updated Physics Tier-A totals
149 attempted -> **142 CERTIFIED / 7 UNMEASURED**. Both P-8 concepts are now
certified. No other concept was re-run and no historical verdict is
reinterpreted.

### Status
**P-9 ROOT DEFECT FIXED AND VALIDATED IN PRODUCTION.**

Still open, deliberately untouched:
- **AMP-A** — `route.ts:5366` treats a turn as empty when its only content is a
  probe carried forward rather than attached this turn, and degrades it. Not
  exercised by this run, but unchanged and still reachable.
- **AMP-B** — `measurementIdentity.ts:111` lets one degraded turn outrank every
  other signal in the verdict.
- **The 16 unrelated unresolvable correct options** (short symbolic text), now
  ratcheted by test so they cannot grow.
- **P-10** (3 duplicate-slug rows), **P-11** (the seeder's revive path is dead
  code).

### Exact next action
Owner's choice between AMP-A, AMP-B, the symbolic-option class, P-10 and P-11.
Recommended first: **AMP-B**, because it is the one that makes every other
failure in this system look like an outage — it is what turned this content
defect into two wasted runs and a wrong diagnosis.

---

## 9p. AMP-B DIAGNOSIS — the precedence rule is correct; its INPUT is not (2026-09-05, READ-ONLY)

Diagnosis only. No source, test or production change; no certification re-run.

### CLASSIFICATION: **VALID BY DESIGN**
`measurementIdentity.ts:111` (`if (input.degradedTurns > 0) return
'FAILED_INFRASTRUCTURE'`) did the right thing with the input it was given. It is
an intentional, documented, tested contract. The wrong verdict on
`phys.em.resistivity` came from the SIGNAL being untrue, and that untruth is
**AMP-A**, not this line. **No fix is warranted here.** One optional hardening
and one dead field are recorded below.

### The verdict state machine
**Inputs** (`classifyVerdict`, a pure function): `instrumentFailed`,
`degradedTurns`, `dirtyState`, `belowContract`, `unmeasuredReason`,
`hardFailures[]`, `verified`, `lessonClosed`, `attempted`.

**Precedence, in source order:**
1. `instrumentFailed` -> FAILED_INSTRUMENT
2. **`degradedTurns > 0` -> FAILED_INFRASTRUCTURE**  <- AMP-B
3. `dirtyState` -> DIRTY_STATE
4. `belowContract` -> FAILED_CONTENT
5. `unmeasuredReason` -> UNMEASURED
6. `hardFailures.length > 0` -> FAILED_PRODUCT
7. `verified && lessonClosed` -> CERTIFIED
8. `!attempted` -> UNMEASURED
9. otherwise -> FAILED_PRODUCT

The stated design (function doc): *"Every category above FAILED_PRODUCT is a
reason the product was never fairly tested, so FAILED_PRODUCT is last. This
ordering is what stops the campaign manufacturing product defects out of the
instrument's own faults."* Rule 2 therefore overrides **rules 3-9** — every
verdict, including CERTIFIED.

### 1-2. What `degradedTurns` is, and every path that can set it
It is **not** a count of turns and **not** measured by the harness. It is a
one-bit re-encoding: `runTierA.ts:179` sets
`degradedTurns = failed.includes('INFRASTRUCTURE-degraded') ? 1 : 0`
(identically at `runPhase0Controls.ts:97`). That string has exactly ONE writer:
`scripts/math/certify.ts:414`, `if (isDegradedProvider(last.provider))`, which
then **`break`s the turn loop**. So a degraded turn is always the LAST turn of
the run.

`isDegradedProvider` tests `provider === 'degraded'`
(`src/lib/eos-runtime/degradedMode.ts`). Every producer of that value in the
product, enumerated:

| # | site | trigger | genuinely infrastructure? |
|---|---|---|---|
| 1 | `route.ts:5114` | every provider in the failover chain threw | **YES** |
| 2 | **`route.ts:5375`** | `!text.trim()` after tag-strip + probe withhold — **AMP-A** | **NO** |
| 3 | `lesson-init/route.ts:464` | every provider threw | **YES** |
| 4 | `kernel/stages/render.ts:49` | provider threw in the kernel render stage | **YES** |

**Three of the four are real outages. Exactly one is not, and it is AMP-A.**

### 3. Does `degradedTurns > 0` necessarily mean infrastructure failure?
**No — but only because of site 2.** Remove site 2 and the answer becomes yes.
The signal is a single overloaded string carrying two different meanings: "no
model answered" (sites 1, 3, 4) and "a model answered, but nothing survived the
turn's own guards" (site 2).

### 4. Can a degraded turn coexist with valid server-graded evidence?
**Yes, and it did — measured.** Both O-2 resistivity records:
`degradedTurns: 1` with `checkCorrect: 1`, reached CHECK/PRACTICE. That credit
was real: production logs show `[gate-assessment] probeFound:true converted:true
assetId:61582820-…` and `[mcq-grade] … correct: true` on earlier turns. So
evidence and a degraded turn are not mutually exclusive, and the run breaks
before the concept can finish.

### 5. What can rule 2 override?
DIRTY_STATE, FAILED_CONTENT, UNMEASURED, FAILED_PRODUCT and **CERTIFIED**. Only
FAILED_INSTRUMENT outranks it.

### 6. Can it hide a teaching/content/grading failure as infrastructure?
**Yes — demonstrated twice, via site 2.** P-9's parser defect (a valid tap
scoring `null`) reached this line as `degradedTurns: 1` and was reported
FAILED_INFRASTRUCTURE on `physicsO2-2c-1788582016781` and `…-1788582254077`.
`runTierA.ts:217` then spent its one automatic retry on a fault a retry cannot
fix, and §9l initially recorded the cause as unknown. **Through sites 1/3/4 it
cannot**: no model output exists, so there is no teaching to misjudge.

### 7. Can it suppress or distort certification accounting?
It **cannot fabricate a pass** — FAILED_INFRASTRUCTURE is never CERTIFIED, and
the safe direction is preserved. What it does is **withhold a verdict and
mislabel the reason**: a concept with real earned evidence is reported as an
outage, so it is neither certified nor honestly recorded as blocked. Cost
measured: 2 runs, 2 retries, one wrong diagnosis.

### 8. Do existing tests establish this precedence? **YES — explicitly**
- `src/tests/certificationMeasurementIdentity.test.ts:42-44` — *"a degraded
  provider outranks a teaching verdict"*: `degradedTurns: 1` +
  `hardFailures: ['D3-unreachable']` -> `FAILED_INFRASTRUCTURE`.
- Also pinned there: FAILED_INSTRUMENT outranks it (`degradedTurns: 3`).

### 9. Is it an intentional documented contract? **YES — in three places**
- `classifyVerdict`'s own doc comment (Protocol v1 §6 precedence).
- `scripts/math/certify.ts:397-413` — *"AN OUTAGE IS NOT A TEACHING VERDICT"*,
  with the measured nine-concept 429 sweep that motivated it.
- `src/tests/certifyOutageClassification.test.ts` — the same header, plus the
  deliberate rule *"an outage stays unmeasured even when the run also recorded
  teaching codes … The outage still wins: those turns cannot be trusted."*

This is not an accident to be corrected. It was written to stop the campaign
manufacturing product defects out of provider faults, and it has done that.

### 10. Smallest safe fix, if one were warranted
**None in `measurementIdentity.ts`.** The correct repair is AMP-A: stop site 2
claiming `provider = 'degraded'` for a turn a model DID author. That restores
the precondition rule 2 already assumes, and no verdict logic changes.

Weakening rule 2 instead — e.g. "degraded only wins when there is no graded
evidence" — would be **the wrong cut**, and the repository already argues why:
under a genuine outage the run breaks mid-concept, so surviving evidence is
partial by construction, and letting it produce a teaching verdict is exactly
the mistake `certify.ts:397-413` records being burned by three times.

### Recorded, not recommended as urgent: `providersSeen` is dead
`ConceptRecord.providersSeen: string[]` exists to corroborate which provider
served a run — precisely the cross-check that would have caught site 2. It is
hardcoded `[]` at BOTH writers (`runTierA.ts:198`, `runPhase0Controls.ts:150`)
and is empty in **240 of 240** artifact records ever written. Populating it, and
having the harness require agreement between the payload's `provider` string and
what it observed, is the only defensible AMP-B-side hardening — a corroboration
improvement, not a precedence change. **Owner decision; not proposed as part of
AMP-A.**

### Regression test design (designed, NOT implemented — no tests were modified)
Pure-function cases against the real `classifyVerdict`:
1. `degradedTurns: 1` with valid graded evidence (`verified: true`,
   `lessonClosed: true`) -> FAILED_INFRASTRUCTURE. **Pins the contract as it
   stands** — this must NOT be "fixed" by AMP-A work.
2. `degradedTurns: 1` with no evidence -> FAILED_INFRASTRUCTURE.
3. `instrumentFailed: true` + `degradedTurns: 1` -> FAILED_INSTRUMENT
   (already covered; keep as the negative control on ordering).
4. A content/grading failure with `degradedTurns: 0` -> FAILED_CONTENT /
   FAILED_PRODUCT / UNMEASURED as the lower rules dictate — the assertion that
   would have failed loudly once AMP-A stops mislabelling such turns.
5. Producer-level, the one that actually matters: a route-shaped case where a
   model DID answer but the reply emptied — assert the payload's `provider` is
   NOT `'degraded'`. **That test belongs to AMP-A**, and it is the test that
   would have prevented this entire misdiagnosis.

### Affected downstream consumers of the verdict
`runTierA.ts:217` (the one automatic retry), the per-run `counts` summary and
`.jsonl` artifacts, every cohort tally in this ledger (§9c/§9e/§9l/§9o), and the
Physics Tier-A totals. None fabricate mastery; all inherit the mislabelled
reason.

### Status / exact next action
**AMP-B: VALID BY DESIGN — no change proposed.** The defect it exposed is
**AMP-A**, still open at `route.ts:5366-5378`: a turn whose only content is a
probe carried forward (not attached this turn) is treated as empty and stamped
degraded, with `withheldModelMcqHoisted` and the pending probe both available
and unconsulted. **Next action: fix AMP-A**, with test 5 above. Then the
optional `providersSeen` corroboration, as an owner decision.
P-10 and P-11 untouched.

---

## 9q. AMP-A FIXED — "on screen" is not "attached this turn" (2026-09-05)

One condition changed in one guard. `measurementIdentity.ts` untouched (AMP-B is
VALID BY DESIGN per §9p and stays exactly as it is).

### Root cause
`src/app/api/learn/chat/route.ts`, the early empty-turn guard, asked
`!text.trim() && mcqHoisted`. **`mcqHoisted` is only the probe attached on THIS
turn.** A probe carried forward — pending, ungraded, still rendered — is equally
on the learner's screen.

Reproduced path (P-9, §9m): groq answered (`outcome=ok http_status=200
chars=632`); the model put its whole turn in the MCQ tag, which parses and
strips first; an unanswered authored probe was already displayed, so
`decideModelProbe` declined the model's question
(`model-probe-withheld / gate-declined-by-policy`) and the route nulled
`mcqHoisted` twelve lines earlier. Text empty + `mcqHoisted` null ⇒ the guard
fell through and stamped `provider = 'degraded'` on a turn a model **had**
answered. AMP-B then did its job correctly on an untrue signal:
FAILED_INFRASTRUCTURE, twice.

**The route already knew better, 3,700 lines later.** A post-strip backstop
(`[empty-post-strip-with-probe]`) uses `mcqToServe(mcqHoisted, pendingMcqHoisted,
mcqGradeHoisted)` for exactly this decision — but it runs long after `provider`
is set, so it repaired the TEXT and never the identity. The two guards disagreed
about what "empty" means.

### The fix
The early guard now reads the same owner the response and the snapshot use:

```
const { mcqToServe: mcqToServeForEmptyGuardEarly } = await import('@/lib/teaching/mcq')
const servedProbeThisTurn = mcqToServeForEmptyGuardEarly(
  mcqHoisted, pendingMcqHoisted, mcqGradeHoisted,
)
if (!text.trim() && servedProbeThisTurn) { … }
else if (!text.trim()) { …degradedTurn()… }
```

No new abstraction: `mcqToServe` already existed and is already what
`response.mcq` (`mcqForClient(mcqToServe(…))`) and `writePendingQuestion` serve.
Both inputs are assigned far upstream (`pendingMcqHoisted` line 2128,
`mcqGradeHoisted` line 2171), so nothing about ordering changed.

**Deliberately NOT widened:** `withheldModelMcqHoisted` is not consulted. A probe
the gate refused is not on screen, and counting it as content would launder a
policy decision this guard has no business reopening. Pinned by test.

### Safety conditions, each verified
- Genuine all-provider failure (`route.ts` catch, `lesson-init`,
  `kernel/stages/render`) — **untouched**; still `provider='degraded'`.
- Genuinely empty turn with nothing on screen — **still degrades**.
- A probe ANSWERED this turn is spent (`mcqToServe` returns null once graded), so
  it is not content for the next turn — **still degrades**. This is the boundary
  that keeps the fix from becoming "never degrade".
- MCQ/model-probe gating unchanged; no gate bypassed; no withheld probe exposed;
  grading and mastery semantics untouched.

### Files changed
- `src/app/api/learn/chat/route.ts` — the guard condition (+ the comment
  explaining what was measured).
- `src/tests/degradedProviderRequiresRealOutage.test.ts` — **new**, 15 cases.
- `src/tests/attemptTagRouteWiring.test.ts` — one assertion updated **in place,
  with the supersession recorded in the file**: it pinned the literal
  `if (!text.trim() && mcqHoisted)`, i.e. it pinned the defect. It now asserts
  the invariant (the guard reads what is served) and still asserts the ORDER,
  which is what that test exists to protect.

### Tests — cases A-D as specified
Drive the REAL `mcqToServe`, `degradedTurn`, `isDegradedProvider` and
`decideModelProbe`.
- **A** empty text + `mcqHoisted` null + pending ungraded probe ⇒ **NOT**
  degraded (plus whitespace-only, attached-probe, and the graded-probe boundary).
- **B** empty text + nothing on screen ⇒ degraded, unchanged; non-empty text
  never touched.
- **C** the real `decideModelProbe` still declines; a withheld model probe is
  NOT treated as content; the served probe is the authored one, never the
  withheld one.
- **D** `degradedTurn` still yields `provider='degraded'`/`finishReason:
  'template'`, and the all-providers-failed catch is upstream and separate.
- Plus 5 route-source wiring pins, including that the guard's condition does not
  read `withheldModelMcqHoisted`.

**Negative control:** with `route.ts` reverted, **4 of 15 fail** — the four
route-wiring assertions. **Stated honestly: the behavioural cases pass in both
states**, because they exercise a mirror of the guard, not the route itself. The
source assertions are what couple the mirror to the route, and they are the half
that fails pre-fix. The test header says so rather than implying deeper coverage
than exists.

### Validation
Targeted (10 files incl. the empty-turn, gate-wiring, reoffer, parser and BOTH
verdict-classifier suites): **172 passed**. `npx tsc --noEmit` **clean**. Full
suite **556 files / 11,905 passed / 9 skipped**. `npm run build` **clean**,
middleware 79.7 kB (unchanged).

### Production validation: deliberately NOT performed, and why
The AMP-A seam needs three things to coincide — an unanswered probe on screen,
the model putting its entire turn in an MCQ tag, and the gate declining that
question. **None of them can be summoned on demand**; they are model behaviour.
Re-running `phys.em.resistivity` would almost certainly just certify again (it
did after the P-9 fix, §9o) and would exercise none of this. That is the
"manufacturing unnecessary failures" the task rules out, so no run was made. The
path is deterministically covered offline, and the next ordinary cohort will
carry the fix.

### Status
**AMP-A FIXED.** AMP-B unchanged and still VALID BY DESIGN.
Open, untouched: `providersSeen` corroboration (§9p, owner decision), the 16
symbolic-option failures (ratcheted, §9n), **P-10** (3 duplicate-slug rows),
**P-11** (the seeder's revive path is dead code).

---

## 9r. P-10 PRE-REGISTRATION — recorded BEFORE the production write (2026-09-05)

Read-only diagnosis complete; all three pairs are unambiguous. Committed before
any mutation, and it is the rollback source (the write is a status change only,
so restoring `status='ACTIVE'` on the three ids below is the whole undo).

### Root mechanism (VERIFIED, corrected against the P-8 hypothesis)
`buildProbeSlugResolver` (`brainSeedAssets.ts:150-164`) appends the difficulty
segment ONLY when more than one probe shares a base slot. Adding a second probe
to a slot therefore **re-slugs the first probe** from 4 segments to 5. Both
seed writers are create-only for an existing row (§9g), so they create the new
5-segment identity and leave the 4-segment one ACTIVE. The slug is not stable
under corpus growth.

**Proved against the current corpus, not assumed.** Running the REAL resolver
over the six modules production is seeded from:

| slug | produced by today's corpus? |
|---|---|
| `phys.mech.displacement:mcq:en:middle` | **NO** |
| `phys.mech.displacement:mcq:en:middle:foundational` | **YES** |
| `phys.mech.hookes-law:mcq:en:middle` | **NO** |
| `phys.mech.hookes-law:mcq:en:middle:developing` | **YES** |
| `phys.mech.momentum:misconception_probe:en:high` | **NO** |
| `phys.mech.momentum:misconception_probe:en:high:developing` | **YES** |

The corpus emits **0 duplicate slugs** of its own, so this is purely production
residue. **The 4-segment rows are the surplus ones** — determined from resolver
output, not from slug shape.

### The three pairs (MEASURED; content is byte-identical within each pair)

| concept | KEEP (canonical) | DEPRECATE (surplus) | shared contentHash |
|---|---|---|---|
| displacement | `2de355c3-664d-47fc-b558-12415b688c38` `…:middle:foundational` created 2026-08-25 | `d9a940d4-b092-4177-bce9-c0793ebee81c` `…:middle` created 2026-07-27 | `hc1a14c77` |
| hookes-law | `c7f78057-8a32-429f-bd3b-642c82353b81` `…:middle:developing` created 2026-08-25 | `5c825c2c-d89a-4369-94d0-52757d4ea559` `…:middle` created 2026-07-27 | `h3189d4a7` |
| momentum | `ff21c488-92e0-44b6-9b4d-d42268cf4f89` `…:high:developing` created 2026-08-13 | `3d652a4f-352c-4375-a669-43c2078ee6c7` `…:high` created 2026-08-11 | `he05deec3` |

Within each pair: identical `contentHash`, identical stem md5 and length,
identical `difficulty`, identical `correctValue`, identical choice count. All
six ACTIVE, version 1, HUMAN_CURATOR.

**The surplus row carries no unique content and no required identity**: the
resolver produces nothing that maps to its slug, and its twin holds byte-identical
content. Deprecating it removes a duplicate serving slot, not a question.

Worth recording because it is easy to misread: the two 2026-07-27 rows carry a
long `deprecationReason` from a **2026-08-18 owner-authorized restoration** —
they were deprecated in error in August and restored. That history is about a
missing content row, not about this duplication, and it does not make them
canonical today.

### Safety checks before writing (all MEASURED)
- Physics seed-owned probe rows: **1,852**.
- Duplicate stem groups physics-wide: **exactly 3** — these, and no others.
- No `canonicalSlug` is used twice (the partial unique index forbids it).
- **0 sessions reference any of the three surplus assetIds** in
  `contextSnapshot` — nothing is mid-question on one, nothing is stranded.
- Coverage before: displacement 13 ACTIVE / 11 gradeable / 12 distinct stems;
  hookes-law 14 / 11 / 13; momentum 18 / 16 / 17. Each loses one ACTIVE ROW and
  **zero distinct questions**; all stay far above the 3-gradeable contract.

### The write
Three guarded statements, one per row: `UPDATE asset_identity SET
status='DEPRECATED', deprecationReason='<P-10 …>' WHERE assetId = <id> AND
status='ACTIVE' AND version=1 AND canonicalSlug=<4-segment> AND
contentHash=<hash>`. Expect exactly 1 row each. **No delete, no content change,
no change to the canonical row, no schema change, no reseed.** Unlike §9j, a
`deprecationReason` IS written here: these rows stay DEPRECATED, so the reason
is the durable record of why, and the seeder's revive path (dead anyway, P-11)
is not in play.

### Expected after
1,852 -> **1,849** physics seed rows; duplicate stem groups 3 -> **0**; true
content drift stays **0**; prod-missing stays **0**; every other physics row
untouched (`max(updatedAt)` elsewhere unchanged).

### Design question, answered as asked
**No source change in this task.** The data remediation is sufficient: the
resolver's instability is a pipeline defect that will re-create this the next
time a slot gains a probe, but nothing in this repair depends on fixing it.
Recorded as **P-10-FOLLOW-UP** rather than silently expanding scope.

---

## 9s. P-10 REMEDIATED — the three duplicate serving slots are closed (2026-09-05)

Three `asset_identity` rows changed status. Nothing else in the database moved.
No delete, no content change, no schema change, no reseed, no source change.

### The write (each statement guarded on assetId + status + version + slug + hash)
All three returned exactly 1 row:

| concept | DEPRECATED (surplus) | still ACTIVE (canonical) |
|---|---|---|
| displacement | `d9a940d4-b092-4177-bce9-c0793ebee81c` `:mcq:en:middle` | `2de355c3-664d-47fc-b558-12415b688c38` `:mcq:en:middle:foundational` |
| hookes-law | `5c825c2c-d89a-4369-94d0-52757d4ea559` `:mcq:en:middle` | `c7f78057-8a32-429f-bd3b-642c82353b81` `:mcq:en:middle:developing` |
| momentum | `3d652a4f-352c-4375-a669-43c2078ee6c7` `:misconception_probe:en:high` | `ff21c488-92e0-44b6-9b4d-d42268cf4f89` `:misconception_probe:en:high:developing` |

Each carries a `deprecationReason` naming the mechanism, the twin that holds the
identical content, and that it is reversible by setting `status='ACTIVE'`.

A fourth statement stamped `updatedAt = now()` on those same three rows, guarded
on `status='DEPRECATED' AND deprecationReason LIKE 'P-10 2026-09-05%'`. **Why,
stated because it was an inconsistency in my own method:** raw SQL does not fire
Prisma's `@updatedAt`, so without it this change would have been invisible to the
`max(updatedAt)` unrelated-row check this programme uses everywhere — including
in §9k, where I did stamp it. Correcting that was worth one extra guarded write.

### One predicted criterion did NOT hold, and it could not have
The task expected physics seed-owned probe rows to go **1852 -> 1849**. They did
not: they are **still 1,852**, because deprecation is not deletion and deletion
was forbidden. The number that moved is the **serving surface**:

| measure | before | after |
|---|---|---|
| physics seed rows, all statuses | 1,852 | **1,852** (unchanged, by design) |
| physics seed rows, ACTIVE | 1,649 | **1,646** |
| duplicate stem groups among ACTIVE | 3 | **0** |
| duplicate stem groups, any status | 3 | 3 (the deprecated originals remain) |

The all-status parity figures from §9k (235 identical / 0 drift / 3 prod-extra)
are therefore **unchanged and must stay unchanged** — a status change cannot move
an all-status digest. Reporting "parity now perfect" would have been false.

### Parity of the SERVING surface, per concept (MEASURED, per-stem hashes)
ACTIVE stems compared against the corpus, hash by hash:

| concept | repo | ACTIVE | duplicate present? | difference |
|---|---|---|---|---|
| displacement | 13 | 12 | **no** (was `0575ff` x2) | `64c933` |
| hookes-law | 14 | 13 | **no** (was `be4fb8` x2) | `fd75b3` |
| momentum | 18 | 17 | **no** (was `a1da56` x2) | `7246a1` |

**Every difference is fully explained and predates this task.** Each is the
concept's MASTERY GATE checkpoint (`…:checkpoint:en:high`), deprecated
**2026-08-12 21:59:37** by the earlier hollow-identity audit — visible in the
same query as a second non-ACTIVE row per concept with that timestamp, beside
the P-10 row at 05:24:47 today. **No drift was introduced and no distinct
question was lost.**

### Coverage (MEASURED) — rows fell, questions did not
| concept | ACTIVE probes | ACTIVE gradeable | **distinct ACTIVE stems** |
|---|---|---|---|
| displacement | 13 -> 12 | 11 -> 10 | **12 -> 12** |
| hookes-law | 14 -> 13 | 11 -> 10 | **13 -> 13** |
| momentum | 18 -> 17 | 16 -> 15 | **17 -> 17** |

The distinct-stem count is the one that matters and it is unchanged: what was
removed is a duplicate slot, not a question. All three remain far above the
3-gradeable asset contract.

### Unrelated-row safety (MEASURED, not asserted)
Rows with `updatedAt` after the write began: **exactly 3**, and the query names
them — the three intended assetIds. `learn_sessions` touched: **0**.
`lesson_attempts`: **0**. `topic_progress`: **0**. Non-physics seed assets:
**0**. `max(updatedAt)` across every other physics seed row: 2026-09-05
04:16:11.327, i.e. the O-2 solenoid write, unmoved. Before writing, **0 sessions
referenced any of the three surplus assetIds**, so nothing was mid-question on
one.

### Certification
Not re-run, correctly: no probe content changed, so no verdict can move. No
historical verdict is reinterpreted. Physics Tier-A totals stand at **142
CERTIFIED / 7 UNMEASURED**.

### Validation
No source or test file was changed, so `tsc`/suite/build were not re-run — there
is nothing new for them to check. Production health after: 3x HTTP 200,
`db:true`, 30s / 15s.

### P-10-FOLLOW-UP (open, NOT actioned — deliberately out of this task)
The data is clean; **the mechanism is not fixed**. `buildProbeSlugResolver` still
re-slugs the first probe of a slot from 4 segments to 5 the moment a second probe
joins it, and both seed writers are create-only, so **the next authoring batch
that adds a probe to an existing slot will create this again**. Options, none
taken: make the difficulty segment unconditional (changes existing identities —
not small); or have the seeder reconcile an old 4-segment row when it emits the
5-segment one. This is a pipeline design decision and belongs to its own task.

### Status
**P-10 REMEDIATED.** Open: **P-10-FOLLOW-UP** (above), **P-11** (the seeder's
revive path is dead code), `providersSeen` corroboration (§9p), and the 16
symbolic-option grading failures (ratcheted, §9n).

---

## 10. Handover History

| Date | Session | Action | Result |
|---|---|---|---|
| 2026-08-xx | Reliability program | R1/R2 timeout investigation | Established original connection timeout request was not effective through Supavisor. |
| 2026-08-xx | Reliability program | R2 role defaults | `postgres` role set to 30s statement / 15s lock timeout; fresh production connections verified. |
| 2026-09-03 | Physics certification | Real-account audit | NO-GO due to refraction/X-ray and photoelectric/max-KE excursion failures; resolver fix followed. |
| 2026-09-04 | Physics certification | Batch-5 executed + R3 diagnosis | 19/25 UNMEASURED, 6 CERTIFIED; infra clean; pre-registered prediction falsified at 76% (prediction-shape error, not an R3 error); smallest fix identified. |
| 2026-09-04 | R3 implementation (T-005) | Implemented + validated | Commit `77eb7df`; 554 files / 11,877 passed; tsc + build clean; negative control passes. NOT deployed at time of commit. |
| 2026-09-04 | R3 deployment + P-1 | Push to `main` (`b2d1466`), production deploy, single 25-concept cohort | COMPLETE. UNMEASURED 76% -> 12%; DEMONSTRATE residue 15 -> 0; all five predictions confirmed; infra clean. See §9c. |
| 2026-09-04/05 | P-1b | 35-concept UNMEASURED re-run under R3 | 26 CERTIFIED / 9 UNMEASURED (25.7%), SUCCESS band met; residual re-diagnosed into 3 causes; corpus drift (P-8) newly found. |
| 2026-09-05 | P-8 | Read-only diagnosis of production/repo probe drift | Root cause verified (identity excludes content + create-only writers). Physics drift = exactly 2 probes; 3 duplicate rows found (P-10). Nothing remediated. See §9g. |
| 2026-09-05 | P-8R | Attempt remediation of the two drifted probes | STOPPED at the write boundary: no DATABASE_URL, so the canonical seeder cannot run, and the bootstrap cannot revive a DEPRECATED row (status-agnostic prefetch + partial unique index). No production write. See §9h. |
| 2026-09-05 | O-1 | Complete the P-8 remediation from a DATABASE_URL environment | STOPPED: this container still has no DATABASE_URL (re-verified). No production write. Copy-paste runbook recorded for an environment that does. See §9i. |
| 2026-09-05 | P-7 | Commit the five untracked batch dispatchers | CLOSED. Owner authorised; committed verbatim as `7aaf45e7`. Working tree now clean. |
| 2026-09-05 | O-2 | Apply the P-8 remediation via Supabase MCP, then certify the two concepts | Both rows revived to v2 with repo content; physics content drift measured at ZERO; solenoid UNMEASURED -> CERTIFIED (twice); resistivity blocked by the pre-existing ungradeable-answer seam, misreported as FAILED_INFRASTRUCTURE. P-8 CLOSED. See 9j/9k/9l. |
| 2026-09-05 | P-9 | Diagnose the ungradeable-answer seam (read-only) | ROOT CAUSE FOUND: resolveMcqChoice rule 0a reads `Wire A:`/`Wire B:` in the option TEXT as two learner labels and returns null before the exact match. 21 of 2,750 corpus probes have an ungradeable correct option (3 this cause, 18 another). Two amplifiers identified. Nothing patched. See §9m. |
| 2026-09-05 | P-9 fix | Exact-match precedence in resolveMcqChoice + regression tests | Ordering-only change; rule 0a unchanged. Corpus mis-attributions 6 -> 0 (4 were false credit), rule-0a nulls 3 -> 0, unrelated symbolic class 16 left ratcheted. 13 new tests, 6 fail pre-fix. Suite 11,890 pass, tsc + build clean. See §9n. |
| 2026-09-05 | P-9 validation | One production run after deploying the fix | BOTH CERTIFIED. resistivity FAILED_INFRASTRUCTURE -> CERTIFIED first attempt, 6 turns to TRANSFER, check 1 / practice 2, 0 degraded turns. Physics Tier-A now 142 CERTIFIED / 7 UNMEASURED. See §9o. |
| 2026-09-05 | AMP-B | Diagnose the degradedTurns verdict precedence (read-only) | VALID BY DESIGN — documented in 3 places and pinned by an existing test. 3 of the 4 producers of provider='degraded' are real outages; the 4th is AMP-A. No fix proposed here; the repair is AMP-A. Recorded: providersSeen is hardcoded [] in 240/240 records. See §9p. |
| 2026-09-05 | AMP-A fix | Empty-turn guard reads what is served, not what was attached | route.ts guard now uses mcqToServe(mcqHoisted, pendingMcqHoisted, mcqGradeHoisted), matching the post-strip backstop 3,700 lines later. 15 new tests (A-D), one pre-existing assertion updated in place. Suite 11,905 pass, tsc + build clean. Production run deliberately not manufactured. See §9q. |
| 2026-09-05 | P-10 | Deprecate the 3 duplicate ACTIVE seed rows | Done. Surplus rows identified by running the real slug resolver, not by slug shape. ACTIVE duplicates 3 -> 0; distinct questions unchanged; all-status row count deliberately unchanged at 1,852 (deprecation is not deletion). Exactly 3 rows touched; 0 sessions/attempts/progress. Mechanism NOT fixed — P-10-FOLLOW-UP. See §9r/§9s. |

## 11. Do Not Rediscover

Do not repeat these investigations unless new evidence directly contradicts them:
- Supavisor custom-role routing attempt and rejection.
- Whether `poolConfig.ts` URL timeout parameters actually reached PostgreSQL.
- Whether R2 role defaults are effective on fresh/quiet production connections.
- The Batch-5 early-MCQ/R3 diagnosis described above.
- The previously rejected invented-guard reordering approach.
- Old E1 60-concept validation design.
- Affirm-guard investigation.

## 12. Handover Protocol

Every Claude session working on My Tutor must:
1. Read `CLAUDE.md` and this file before substantive work.
2. Verify current Git state and reconcile this file against repository evidence.
3. Work only within the active scope.
4. Before handoff, update this file with verified results, exact commit SHA, unresolved issues, and ONE exact next step.
5. Mark facts as VERIFIED / INFERRED / UNKNOWN where ambiguity exists.
6. Never put credentials, tokens, passwords, or secrets here.
