# My Tutor — Project History Index

Produced 2026-09-17 during the CLAUDE.md memory-file collapse (15k+ lines → <500 lines of live
rules + this indexed history archive). Every file here is a **verbatim extraction** from the old
CLAUDE.md — nothing was summarized, paraphrased, or dropped; each file's own header names its
exact source. Live, currently-binding rules stayed in `/CLAUDE.md`; everything else — dated batch
logs, incident postmortems, campaign narratives, superseded decisions — lives here.

**How to use this**: if you're picking up a specific piece of work, find its file below and read
it for full context before continuing. If you're adding a new dated entry to an ongoing campaign,
append to the matching file (or create a new one) — never grow `/CLAUDE.md` back into a narrative
log.

| File | Covers |
|---|---|
| `educational-brain-knowledge-base.md` | Educational Brain knowledge tree: Deliveries 1-15, Wave 0, CTO iterations, corrections 1-4, First-Principles Review; and the frozen Educational Brain runtime architecture (ADR 05-14 roadmap, Bible consolidation, Integration & Validation Loop). |
| `curriculum-and-engineering-programs.md` | Physics KG extension (Particle Physics + Semiconductor domains); the "10 educational layers per concept" Curriculum Completion Program batches 1-56 (math.found through math.geom domains); the "Pappu" engineering program close-out (RLS, connection-pool, AI-router fixes); final operations session; AssetIdentity Completion Program global audit; Chemistry AssetIdentity completion. |
| `visualization-engine.md` | The full Visualization Engine build: runtime readiness, generic runtime engine (kill-switch flag inversion, budgets, verdict cache), completion pass (per-session budget, off-curriculum guard), generic coverage closed (runtime-topic identity/grounding), and the later universal interactive-scene upgrade (parametric scenes, explainer/stage layers). |
| `learner-experience-and-mobile-fixes.md` | L1-L4 learner-experience remediation (qualifier-drop resolution, requested-visual-form mismatch, UI density); the unresolved-topic excursion feature; the Mathematics readiness build (asset contract v1, certification harness); Chemistry made servable (687/687 probes); mobile lesson navigation (Previous/Next anchor bug). |
| `architecture-hardening-series-b.md` | Turn arbitration (`turnArbitration.ts`, the single RECOVERY>LEARNER_REQUEST>CLOSE>COMPLETE>TEACH precedence statement) and Phase 4 (knowledge-gap-as-excursion) / Phase 5 (lesson integrity, filler-repair cap, recovery-guard "still" fix) of the same architecture-hardening series. |
| `egress-incidents.md` | The two real Supabase egress leaks (spine-event replay, bootstrap prefetch) that hit 50.8GB against a 5GB quota, their fixes, and the independent production re-audit confirming both stayed fixed. |
| `defect-investigations-i-series.md` | E1 verification run (paused for the egress incident); I1 (MCQ re-offer disambiguation), I4 (GUIDE-phase stall investigation); #1 (confirmation-rate measurement artifact); Excursion R1-R4 (an active excursion no longer silently disables assessment); #3 (C7 verbatim explanation re-serve root cause); the Liveness Programme (turnProgress.ts, the runtime can no longer refuse forever). |
| `MATHEMATICS_EB_CAMPAIGN.md` | The full 92-batch Mathematics Educational Brain completion campaign log (math.found through math.abst, 10 domains certified). The single largest file here — read `scripts/math/state.ts`'s live output before trusting any count quoted in it. |
| `topic-loss-and-physics-v2-architecture.md` | The topic/meaning-loss extractor fix (manner-adverbial modifier heads); the Physics Teacher Migration Architecture V2 audit (evaluated, not adopted — see `docs/architecture/PHYSICS_TEACHER_MIGRATION_ARCHITECTURE.md` for the live design doc). |
| `four-primitives-saga.md` | The full "Four Primitives" governance incident: PROGRAMME CLOSED → OWNER OVERRIDE (later found to itself repeat the deferral-violation incident) → two corrections clarifying the real unbuilt scope. Read this before ever touching Turn Contract / Physics Verifier / Learner-Move Interpreter / Durable Learner State work — and read the live "READ THIS FIRST" section in `/CLAUDE.md` first, since it's the current authoritative summary. |
| `retired-research-workflow-and-architecture-facts-full.md` | The full retired prompt-improvement research workflow (only its override survives, in `/CLAUDE.md`); and the full original "Architecture facts" text including every superseded sub-note (Gemini-only history, pre-2026-08-04 Yandex removal, etc.) that the live condensed version in `/CLAUDE.md` dropped. |
| `repository-branch-policy-superseded.md` | The full repository branch policy including the superseded "KDSUO-as-canonical" interim policy — the live condensed rule is in `/CLAUDE.md`. |
| `mathematics-and-physics-e2e.md` | Mathematics EB serving-asset campaign (257/257 concepts got serving assets) and the Mathematics end-to-end certification pass (43/43 reached verified mastery). |
| `qa-and-mastery-fixes.md` | Root-cause QA of the 3 reference lessons (abandonment, repeated-visual, content-free-filler, phantom-figure fixes); the affect-budget/session-episode fix; the Physics Teachability Program 60-concept certification (with every falsified hypothesis recorded); the Explanation DRAFT queue triage decision; the Physics+Chemistry mastery-ceiling break (79%→95%, probe depth 3→5). |
| `excursion-and-visuals-late.md` | The excursion-prevalence telemetry instrument (observability only, no behavior change) and the Electric Dipole interactive visual (parametric scene generator). |
| `account-safety-and-english-defects.md` | The `suaibamr@gmail.com` forbidden-account restriction revocation; the English open-defect campaign (ENG-D02/D03 exclusion-list trap, D06/D07/D08/D09). |
| `mastery-and-knowledge-exposure-fixes.md` | The claim-challenge mastery-integrity fix (a defended false claim could still certify mastery); the authored-knowledge-reaches-runtime fix (misconception-parser grammar + Core Understanding packing budget); the governing-knowledge-residue ordering fix (packer order, not budget size). |
| `subject-onboarding-and-fix-campaign.md` | The subject-onboarding pipeline architecture audit (confirms the KG→registration→seed-corpus→bootstrap pipeline is already generically hardened for a future subject); and the full running log of the current "fix physics/english/chemistry" campaign, including the `contract-audit.ts` English-undercount bug fix and the account-saturation finding. |
| `synthetic-students.md` | The synthetic-student runner on the physics mechanics launch set (owner decisions 2026-09-24: no boards, no real traffic yet): the tool, how to run it, and each run's findings and fixes. |
| `learner-intent-interpreter-ab-experiment.md` | The 2026-09-25 AI learner-intent interpreter A/B experiment (three live 6×2 runs): design, results, the deterministic fixes it surfaced, cleanup. FINAL: abandoned for production, interpreter removed 2026-09-26, deterministic path retained (A 8/12 → 10/12 → 12/12 first ask). |
| `tutor-max-real-learner-fixes-2026-09-29.md` | Real-learner QA run 1 (5 physics lessons) and the fixes it led to: topic hijack, bare "Not quite", figure completeness, stored text ignoring the learner, picture/practice card, simulation spoilers (prompt block + give-away backstop), lens rays. Also `scripts/qa/learnerReplay.ts`. |
| `tutor-max-real-learner-fixes-2026-09-30-qa2.md` | Real-learner QA run 2 (refraction, circular motion, gas laws, Bohr model): ratings and 12 defects, 5 still open from run 1. |
| `physics-visual-gap-campaign.md` | Physics visual audit (238 concepts: 43 own figure / 32 general / 163 none), batch 1 of authored figures (reflection, Coulomb, E-field, B-field, standing waves, Doppler, energy conservation, heat transfer, buoyancy, Hooke), the authoring-label leak fix, and the queue for later batches. |
| `learner-baseline-2026-09-30-cto-loop.md` | Autonomous CTO loop: 10-session real-browser learner baseline (5 physics, 5 chemistry, real account), the defect clusters, 17 fixes (stub repair, affirm guard vs authored key, Close records mastery, R1 resume, figure colours, simulation controls/spoilers, answer heads, excursion quiz, empty generated graph, lesson-one spiral deadlock, skip-demotes-mastery, completion-card ids, graded-tap confirm-back, H2/O2 key), production verification, and the owner actions left open. |
| `turn-quality-baseline-2026-10-02.md` | Phase 0 of the turn assembly proposal: read-only production baseline. Zero-tolerance checks (grade vs authored key, mastery without evidence), heuristic turn checks K1–K5 with hand-read precision, 14-day trend, and what was not measured. SQL in `scripts/qa/turnQuality/`. |
| `turn-assembly-pairs-2026-10-02.md` | Turn assembly shadow: 30 served-vs-assembled reply pairs (post-fix windows 6–11, four subjects) for the owner's spec §7 hand-read. |
| `turn-assembly-serve-2026-10-03.md` | Turn assembly Phase 3 serve rollout: incident log (the attach assembler cut rhetorical questions, fixed in `504579c`), and an owner security note about a key visible in a Vercel env comment. |
| `launch-readiness-2026-10-03.md` | Launch readiness: per-subject verdicts (physics/biology/chemistry/english), the six launch items with production numbers, the fact-check precision result (0%, stays shadow), owner-only actions, pilot recommendation. |
| `physics-kg-coverage-extension.md` | Coverage-driven physics KG extension (owner exception 2026-10-03): core-tier batches 1–6 (238 → 262 concepts) landed on `main` 2026-10-04, the owner-approved lesson-order remap (359 of 778 physics progress rows), and the drafted batches 7–8. |

## Live pointers (not history — check these first for CURRENT state)
- `/CLAUDE.md` — live rules.
- `docs/architecture/TUTOR_REMEDIATION_PLAN.md` — the current owner-adopted priority plan.
- `docs/architecture/EDUCATIONAL_BRAIN_BIBLE.md` — frozen Educational Brain architecture v1.0.
- `docs/architecture/PHYSICS_TEACHER_MIGRATION_ARCHITECTURE.md` — the audited-not-adopted V2 design.
- `scripts/math/state.ts`, `scripts/physics/state.ts`, `scripts/assets/contract-audit.ts`,
  `scripts/brain/seed-knowledge-assets.ts --draft --dry-run` — regenerate live numbers, never
  trust a count in a history file above (all are snapshots at the time they were written).
