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

**R3 is implemented and validated (commit `77eb7df`) — do NOT redo it.**

The exact next step is **P-1**: with R3 deployed to production, run exactly ONE
25-concept Physics cohort drawn from the 38 concepts of the original 63-concept
UNMEASURED pool that Batch 5 did NOT touch (a clean sample, no Batch-5
contamination; the 6 that certified in Batch 5 now carry COMPLETED lesson
attempts and would confound a re-run).

Pre-registered prediction, to be recorded BEFORE execution and judged as a RATE
WITH AN INTERVAL, never as "near 100%" (the error that falsified Batch 5):
- UNMEASURED falls substantially from the 76% [0.59, 0.93] pre-fix rate toward
  the OBSERVE-only residue (~16%, i.e. 4 of 25)
- FAILED_INSTRUMENT = 0
- P2024 = 0
- no concept loses ladder reachability

Stop after that single cohort and report measured vs inferred vs unknown.

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

## 10. Handover History

| Date | Session | Action | Result |
|---|---|---|---|
| 2026-08-xx | Reliability program | R1/R2 timeout investigation | Established original connection timeout request was not effective through Supavisor. |
| 2026-08-xx | Reliability program | R2 role defaults | `postgres` role set to 30s statement / 15s lock timeout; fresh production connections verified. |
| 2026-09-03 | Physics certification | Real-account audit | NO-GO due to refraction/X-ray and photoelectric/max-KE excursion failures; resolver fix followed. |
| 2026-09-04 | Physics certification | Batch-5 executed + R3 diagnosis | 19/25 UNMEASURED, 6 CERTIFIED; infra clean; pre-registered prediction falsified at 76% (prediction-shape error, not an R3 error); smallest fix identified. |
| 2026-09-04 | R3 implementation (T-005) | Implemented + validated | Commit `77eb7df`; 554 files / 11,877 passed; tsc + build clean; negative control passes. NOT deployed at time of commit. |
| 2026-09-04 | R3 deployment + P-1 | Push to `main`, production deploy, single 25-concept cohort | In progress — see §9. |

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
