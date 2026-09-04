# My Tutor — Claude Handover

> Persistent context for switching between Claude accounts/sessions. Repository evidence and explicit user decisions outrank this file. Keep this document concise, factual, and current.

## 1. Current Mission

My Tutor is in reliability/certification work for the learner-facing AI tutor. Current certification scope is **ONLY Physics + Chemistry**. English and Mathematics are out of scope for this certification effort.

Current immediate mission: resolve the remaining Physics Tier-A certification instrumentation/teaching-policy issue (R3), validate it, then resume controlled production certification.

## 2. Current State

### Repository
- Repository: `Ammar0909291/My-tutor`
- Canonical branch: `main`
- Latest known Git HEAD: `bdabb62f67d7e4db13fa3d11b6ea0e802f2ada76`
- No feature-branch workflow; no force pushes/resets.
- Known standing untracked certification scripts must remain untouched unless explicitly authorized:
  - `scripts/certification/runPhysicsBatch3_4Worker.ts`
  - `scripts/certification/runPhysicsBatch4_4Worker.ts`
- If another untracked Batch-5 artifact exists locally, leave it untouched unless explicitly authorized.

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
- Batch 5 was paused pending R3 diagnosis.

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

## 3. Active Task — R3

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

R3-specific validation still required:
- focused R3 tests
- TypeScript
- relevant/full test suite as appropriate
- production 25-concept cohort only after code/test gate

## 8. Known Problems / Risks

1. Physics Tier-A has a large UNMEASURED population. Current diagnosis says most of the Batch-5 cohort is explained by early model-invented MCQs plus harness terminal classification.
2. Synthetic 60-concept transcript quality was ~6.0/10 against a >=7.5 target. This is a separate quality-improvement target; do not mix it into R3.
3. Earlier 5/58 GUIDE stalls were recoverable but scale confirmation remains separate work.
4. C7 verbatim explanation re-serve was fixed; live repeat effect has not been remeasured.
5. Chemistry remediation campaign remains largely unauthored (13/186); Chemistry certification should account for this readiness gap.
6. Gemini has shown intermittent 503/429 instability; current default chain is Groq -> Gemini -> OpenRouter for non-Russian languages, with Yandex -> Gemini -> OpenRouter -> Groq for Russian. `AI_PROVIDER_MODE=gemini_only` is diagnostic opt-in only.

## 9. Exact Next Step

**Implement and validate R3 exactly as specified above.** Start by inspecting the current `main` code/tests because this handover predates the R3 implementation. If the implementation is already present, do not redo it; verify it against the required tests and current Git state. Only after clean code/test validation run the single pre-registered 25-concept Physics production cohort.

## 10. Handover History

| Date | Session | Action | Result |
|---|---|---|---|
| 2026-08-xx | Reliability program | R1/R2 timeout investigation | Established original connection timeout request was not effective through Supavisor. |
| 2026-08-xx | Reliability program | R2 role defaults | `postgres` role set to 30s statement / 15s lock timeout; fresh production connections verified. |
| 2026-09-03 | Physics certification | Real-account audit | NO-GO due to refraction/X-ray and photoelectric/max-KE excursion failures; resolver fix followed. |
| 2026-09-04 | Physics certification | Batch-5 R3 diagnosis | 19/25 UNMEASURED mostly due early model-invented MCQs; smallest fix identified. |
| Current | Next Claude | R3 implementation/validation | Pending. |

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
