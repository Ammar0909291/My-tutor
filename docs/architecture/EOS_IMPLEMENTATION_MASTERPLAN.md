# EOS Implementation Masterplan — v1.0.0

**Document class:** Engineering roadmap — the canonical translation of the
frozen architecture set into executable work. Architecture is frozen; this
document redesigns nothing and decides only ORDER, SCOPE, EFFORT, and GATES.
**Status:** PLAN — no code in this document; every milestone remains
individually G2-gated at start-of-work.
**Sources unified (with their own numbering preserved in §2's cross-map):**
EOS_V2_ARCHITECTURE §17 (M0–M7) · EOS_V2_RUNTIME_SPECIFICATION ·
EDUCATIONAL_BRAIN_COMPILER · CEKR (M0–M5) · OUTCOME_SCIENCE_FRAMEWORK
(M0–M5, R1–R5) · EDUCATIONAL_BRAIN_AUTHORING_SDK (M0–M6) ·
ARCHITECTURE_ISSUE_REGISTER (ISS-01…24).
**Already DONE (recorded, not planned):** Phase A–H teaching runtime
(= EOS M0) and the Evidence Spine (= EOS M1, commit 9de1b75).

Effort units: **ew = engineer-week** (senior full-stack, familiar codebase).
Confidence: ±40% on individual milestones, ±25% on track totals. Estimates
cover engineering only; content AUTHORING hours are flagged separately
because they scale with educators, not engineers.

---

## 1. Program Shape: Four Tracks

```
TRACK H — HARDENING      ship-now fixes protecting real learners (ISS batch)
TRACK K — KERNEL         the runtime becomes the EOS (perceive/decide/render)
TRACK C — CONTENT CHAIN  CEKR store → SDK/DSL → Compiler → packs
TRACK S — SCIENCE        OSF: data layer → analysis → experiments → loop
```

Tracks H and the P1 spec-bug batch unblock everything; K and C run largely
in parallel and JOIN at packs (K4 consumes C4's output); S trails K by one
milestone and joins C at the evidence loop.

---

## 2. Milestone Breakdown (P/K/C/S numbering; cross-map included)

### TRACK H + P — Foundations (first 3 weeks)

**P0 — Learner-protection & hygiene batch** · 2 ew · Smaller-model OK
Contents: ISS-18 (redact/hash verbatims for minors behind flag, default
redact <16), ISS-08 (autonomy negation/anchoring guard + fixtures), ISS-09
(RU/HI recovery + autonomy pattern sets + corpora), ISS-13 (snapshot
version field + conditional update w/ one retry), ISS-14 (read-time tag
strip in history endpoint), ISS-15 (capture CI ratchet baseline), ISS-19a
(history endpoint cursor pagination + rate limit; index deferred to P2).
DB: none (JSON only). API: history endpoint gains cursor params
(backward-compatible). Flags: `REDACT_MINOR_VERBATIMS` (default on).
DoD: all fixtures green; suite green; no behavior change for adult-EN happy
path except protections. Rollback: flags/revert.

**P1 — Spec-bug batch (documents only)** · 1 ew · Frontier recommended
Contents: ISS-01 (6-phase↔10-state normative mapping appendix), ISS-02
(pack pinning binds to EPISODE), ISS-04 (RANDOMIZE rule-effect addendum to
EBC/RS), ISS-05 (BIR-M↔CEKR table), ISS-06 (docs/architecture/README.md
authority index). DoD: appendices merged, register updated.

**P2 — Schema & index pass** · 1 ew · Smaller-model OK
Additive Prisma changes batched once (each individually approved):
Message/LearnSession composite indexes (ISS-19b), `PackRegistry` table
(version, hash, channel, activatedAt), `CohortAssignment` table (learnerId,
experimentId, arm, assignedAt) for S-track. DoD: `db push` clean, zero
runtime reads yet.

### TRACK K — Kernel

**K2 — Capability Memory v1** (= CEKR-cap M1–M3 of CAPABILITY_MODEL_DESIGN)
· 3 ew · Frontier for the attribution edges, smaller-model for plumbing
SIGNAL tag gains optional `capability` attribute (fabrication-forbidden);
spine CapabilityObserved wired from it; snapshot capability map read at
turn start; ONE consumer: the beginner-tuning line + Phase-B foundation
bias read capability states where present (additive; profile-level fallback
kept). Depends: M1 (done). Flags: `ENABLE_CAPABILITY_SIGNALS`.
DoD: capability states accumulate for live learners; legality NOT yet
enforced (that is K4's Band 2); replay shows states rebuild from spine.

**K3 — Kernelization of the chat route** · 6 ew · **Frontier required**
The big one. route.ts (~2,700 lines) split into the RS §1 pipeline stages:
`ingest.ts / sense.ts / models.ts / interrupts.ts / schedule.ts / tsmStep.ts
/ policy.ts / resolve.ts / plan.ts / render.ts / verifyStub.ts / persist.ts`
under `src/lib/kernel/`, with route.ts reduced to the orchestrator calling
stages in order. Behavior-identical refactor verified by golden-transcript
replays of recorded turns (spine events as fixtures). DecisionRecorded
upgraded from provenance-lite to full rule-path. ISS-01 mapping implemented
(6-phase state migrates to 10-state machine per P1 appendix). ISS-10
counter unification (episode budget = escalation source; streak = Phase E;
P1 counter demoted to telemetry). Architecture tests: no LLM import outside
sense/render; every turn emits DecisionRecorded (RS I-2/T-7).
Files split: route.ts. Files migrated: conversationState.ts →
kernel/tsm.ts (with state migration); signals.ts → kernel/sensors/.
Flags: `ENABLE_KERNEL_PIPELINE` (old path kept callable one release).
DoD: pipeline serves 100% of Library traffic behind flag with byte-similar
outputs on the golden set; School Mode untouched; suite + new stage tests
green. Rollback: flag.

**K4 — Policy packs v1 (the K/C join)** · 5 ew (+C4) · Frontier
Kernel Band structure (RS §5) executing compiled packs from C4: Band 0–2
legality (capability gates live HERE, stage ceilings, budgets,
incompatibility), Band 3 dispatch, Band 4 tables (D1 grid + decision
matrix), Band 5–6. Prompt blocks RETIRED per RS §13 inventory as their pack
equivalents activate (strategy block, action-procedure text, hint
philosophy → content payloads). teachingStrategy STRATEGY_INSTRUCTIONS +
actionProcedures.ts PROCEDURES become pack data (files migrate to
`brain/shared/policies/`, code keeps thin loaders). decide() wrapped, then
superseded by Band 4; kept for School Mode until K-parity there.
Depends: K3, C4-minimal, P2 (PackRegistry). Flags: `ENABLE_POLICY_PACKS`
+ per-cohort pack channel. DoD: golden decision tables (RS T-3, ≥200 rows)
pass; replay diff vs pre-pack behavior reviewed and accepted; prompt token
count per turn measurably down. Rollback: pack revert (one decision) or
flag.

**K5 — Output Verifier loop** · 3 ew · Frontier for rule edge-cases
RS §9: 15 rule codes over pack lexicons (EN first; RU/HI lexicons LOG-only
per RS §20 until authored), 2-attempt protocol, template fallback (needs
the 27 generic action templates — a C-track authoring item, 1 authoring-wk).
V-STAGE scoped per subject family (ISS-17). Flags:
`ENABLE_OUTPUT_VERIFIER` (LOG-only mode first, then enforce).
DoD: violation-rate dashboard live; zero false-REJECT on a 500-turn
recorded corpus at enforce-time; RENDER_VIOLATION events flowing to spine.

**K6 — Simulation CI + degraded deterministic mode** · 4 ew · Mixed
Persona automata (6 canonical, RS T-5) runnable headless against the
kernel with stub driver; invariant battery as merge gate. Degraded mode
(RS P-3): template renders + asset serving when driver health fails;
chaos test in CI. Depends: K3 (personas need the pipeline), K5 (templates).
DoD: 10⁴ simulated episodes, zero invariant violations; LLM-outage drill
passes (learner gets teaching-shaped turns).

**K7 — Estimator suite completion** · 6 ew spread · Smaller-model OK per
estimator once contracts fixed
Remaining §4 models added ONLY with a consuming policy each (no model
without a customer): Forgetting (scheduler consumer), Load/WM (Band-2
budget), Velocity (plateau policy), Confidence (calibration probes),
Motivation/Curiosity (anchor selection). Each = fold + tests + one policy
row. Depends: K4.

### TRACK C — Content chain

**C1 — Shared validation library + CEKR store v1** (= CEKR-M1, ISS-03)
· 4 ew · Frontier for the type system, smaller-model for checks
`packages/cekr-validate` (V-1…V-16) + content-addressed store (git-backed
v1: entities as canonical-JSON files + head index) + `Revision` chain.
DB: none (git-backed). DoD: fixture museum passes; the 4 seed concept
entries hand-encoded as CEKR round-trip losslessly.

**C2 — BrainScript parser + CLI + PILOT SLICE** (= SDK-M1+M2, ISS-07)
· 4 ew engineering + ~2 authoring-wk · Mixed
`brain check` / `brain fmt`; Ring 1+2 validation via C1. THE PILOT SLICE
authored by hand: fractions constellation + recovery script library + D1
grid as BrainScript → CEKR. This is simultaneously the DSL usability test
and the compiler's fixture corpus. DoD: pilot compiles to CEKR cleanly;
a teacher-reviewer (human) has edited a file successfully.

**C3 — Importers** (= CEKR-M2) · 3 ew · Smaller-model OK
KG graph.json → Concept cores/edges; assets.json + AssetIdentity → E/D
entities (IMPORTED, DRAFT); coverage dashboard v1 over real data.
Depends: C1. DoD: 1,734 concepts + 789 assets visible in CEKR with
provenance; zero writes to sources.

**C4 — Brain Compiler build pipeline** · 8 ew · **Frontier required**
EBC front-end (loads CEKR snapshots), graph passes + certificates,
validation E-codes, minimal optimization (rule ordering, lexicon automata,
bitsets), pack emission + brain.lock + double-build determinism check.
Scope discipline: enough passes to ship K4's pack needs; set-cover/
dominator optimizations later. Depends: C1, C2 (fixtures), C3 (real
graph). DoD: `brain build physics` emits a pack the K4 kernel loads;
byte-reproducible; T-C fixtures green.

**C5 — Brain IDE (LSP + lenses)** (= SDK-M3+M4) · 8 ew · Mixed
Depends: C2. Parallelizable with K-track entirely.

**C6 — Replay theater** (= SDK-M5) · 4 ew · Depends: K6 + C4.

### TRACK S — Science

**S1 — Research data layer + metric battery** (= OSF-M0+M1) · 3 ew ·
Smaller-model OK. Redaction boundary (builds on P0), pseudonymized
extracts over spine + existing tables, pre-registration registry (docs
process). Depends: M1 (done), P0. DoD: R1 observational atlas queries run.

**S2 — Analysis engine v1** (= OSF-M2) · 5 ew · Frontier for stats
correctness. Learning curves, retention fits, per-asset tables, guardrail
monitors, EvidenceClaim registry; golden datasets with planted effects as
its own test gate. Depends: S1.

**S3 — Experiment machinery** (= OSF-M3) · 4 ew · Mixed
Cohort assignment (P2 table), canary ramps + sequential monitors, rollback
drills. Interim cohorts key on git-SHA until K4 packs exist; full overlay
cohorts after K4. Depends: S1, P2; upgraded by K4.

**S4 — MRT cells** (= OSF-M4) · 2 ew · Depends: P1 (ISS-04 spec), K4, S3.

**S5 — Evidence→CEKR loop** (= CEKR-M5/OSF-M5) · 2 ew · Depends: S2, C1.
EvidenceSummary snapshots written back; authoring queue integration.

### Deferred/parallel odds
LessonScreen split (ISS-23, 3 ew, smaller-model OK, any time after P0);
Golden-thread cross-spec fixture (ISS-24, 1 ew, as soon as C4+K4 exist);
hosted IDE (SDK-M6) and OSF R3 flagship study: out of this plan's horizon.

---

## 3. Dependency Graph

```
            ┌────────── DONE ──────────┐
            M0 (Phases A–H)   M1 (Spine 9de1b75)
                                  │
   P0 ──────┬─────────────────────┤
   P1 ──┐   │                     │
   P2 ─┐│   │                     │
       ││   ▼                     ▼
       ││  K2 (capability mem) ◄──┘
       ││   │
       │└──►K3 (kernelization) ◄─ P1(ISS-01 map)
       │     │
C1 ─► C2 ─► C4 ─────────► K4 (packs) ◄─ P2(PackRegistry)
 │     │     │             │
 │     └►C5  │             ├──► K5 (verifier) ──► K6 (sim+degraded) ──► C6
 │           │             └──► K7 (estimators)
 └─► C3 ─────┘
P0 ─► S1 ─► S2 ─► S5 ◄─ C1
      └───► S3 ◄─ P2      S3+K4+P1 ─► S4
```

**Critical path:** C1 → C2 → C4 → K4 → K5 → K6 (with K3 required before
K4 and parallel to C1–C4). Length ≈ 4+4+8+5+3+4 = **28 ew serialized**,
but K3 (6 ew) overlaps C1–C4 fully, so the one-lane critical path is
max(K3, C1→C2) then C4 → K4 → K5 → K6 ≈ **26–30 ew**.

## 4. Gantt-Style Order (5-engineer reference plan, weeks →)

```
Wk        1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24
Eng A(H/K)P0 P0 K2 K2 K2 K3 K3 K3 K3 K3 K3 K4 K4 K4 K4 K4 K5 K5 K5 K6 K6 K6 K6 buf
Eng B(K)  P1 P2 K3p K3p ────tests/goldens──── K4p K4p K5p K6p K7 K7 K7 K7 K7 K7 buf
Eng C(C)  C1 C1 C1 C1 C2 C2 C2 C2 C4 C4 C4 C4 C4 C4 C4 C4 C6 C6 C6 C6 …C5 cont.
Eng D(C)  C3 C3 C3 C5 C5 C5 C5 C5 C5 C5 C5 (C4 assist) golden-thread ISS-24 …
Eng E(S)  S1 S1 S1 S2 S2 S2 S2 S2 S3 S3 S3 S3 S4 S4 S5 S5 ISS-23 split …
Authoring pilot-slice (wk5-7, educator) → coverage ramp continuous
```

## 5. Timelines

| Team | Elapsed to K6+S4 ("EOS live, measured") | Notes |
|---|---|---|
| **1 engineer** | **18–24 months** | pure serialization ≈ 70 ew of engineering + review latency; morale risk on C4/K3 alone |
| **5 engineers** | **6–7 months** | the reference Gantt above; critical path + 20% integration buffer |
| **20 engineers** | **4–5 months** | critical path–bound: extra heads accelerate C5/K7/S-track/authoring-tooling and CONTENT (where scaling is real), not K3/C4 (Brooks's law); beyond ~8 on core, coordination eats gains |

Total engineering ≈ **70 ew core** (+ ~15 ew for IDE/C5 + deferred items).
Authoring is the true long pole after month 6: coverage from 4% upward
scales with educators via the SDK, not with this plan.

## 6. Model-Tier Assignment (who can build what)

| Smaller models (well-specified, spec-in-hand) | Frontier reasoning required |
|---|---|
| P0 fixes (specs exact in register), P2 schema, C3 importers, S1 extracts, dashboards, lexicon plumbing, K7 estimator folds (contracts fixed), LessonScreen split, test authoring against written DoD | K3 kernelization (behavior-identical decomposition of a 2,700-line organism), C4 compiler semantic passes + determinism, K4 band engine + prompt retirement judgment, K5 verifier false-positive tuning, S2 statistics correctness, ISS-01 state migration, P1 spec bugs |

Rule: frontier designs the seam, smaller models fill behind it; every
smaller-model task must cite the spec section it implements (the specs were
written to make this true).

## 7. Database Changes (complete list)

Done: `SpineEvent` (M1). Planned, all additive, all via `db push`:
P2's `PackRegistry`, `CohortAssignment`, Message/LearnSession indexes.
CEKR store: none (git-backed v1). NO destructive change anywhere in plan.

## 8. API Changes

External contracts unchanged throughout (hard rule). Internal/new:
history endpoint cursor params (P0, compatible); admin endpoints — pack
list/activate (K4), replay/verify (K3), dashboards (S2), experiment
registry (S3). Chat route request/response shape: byte-compatible.

## 9. Runtime Replacements, Deletions, Migrations, Splits

| Action | Target | When |
|---|---|---|
| SPLIT | `src/app/api/learn/chat/route.ts` → kernel stages | K3 |
| SPLIT | `LessonScreen.tsx` → hooks/components | parallel, post-P0 |
| MIGRATE | `conversationState.ts` → kernel TSM (state-mapped) | K3 |
| MIGRATE | `recoveryGuard.ts` scripts / `firstLessonGuard.ts` config / `actionProcedures.ts` / STRATEGY_INSTRUCTIONS → pack data | K4 |
| MIGRATE | `signals.ts` → kernel sensor registry | K3 |
| REPLACE | prompt blocks per RS §13 inventory → intents/payloads/verifier | K4–K5, one block at a time, each behind the pack flag |
| DELETE | replica-tests superseded by real-module stage tests | K3+ |
| DELETE | `src/lib/educationalBrain/*` (archived Eb pipeline) | after K4 parity, own ADR |
| KEEP | `nextBestAction.ts` dead exports | explicitly indefinite per standing owner instruction |

## 10. Testing Strategy per Milestone (DoD gates)

Every milestone ships with: unit tests for its pure core; its RS/EBC/OSF
invariant subset as executable checks; golden fixtures. Specifics:
P0 fixture corpora (incl. RU/HI utterances); K3 golden-transcript replay
(recorded spine turns → byte-similar outputs) + architecture tests (T-7);
K4 golden decision tables (T-3) + replay diff review; K5 500-turn
false-positive corpus; K6 10⁴-episode invariant battery as MERGE GATE
thereafter; C4 double-build determinism (T-C6) + fixture museum; S2 planted-
effect golden datasets; cross-track: the golden thread (ISS-24) live from
K4+C4 onward.

## 11. Rollback & Deployment Strategy

- **Strangler-fig everywhere:** old path kept callable behind each flag for
  ≥1 release. Flags: `ENABLE_EVIDENCE_SPINE`(live) ·
  `REDACT_MINOR_VERBATIMS` · `ENABLE_CAPABILITY_SIGNALS` ·
  `ENABLE_KERNEL_PIPELINE` · `ENABLE_POLICY_PACKS` ·
  `ENABLE_OUTPUT_VERIFIER` (log→enforce two-step) ·
  `ENABLE_DEGRADED_MODE` · `ENABLE_MRT_CELLS` · pack channel per cohort.
- **Activation discipline:** kernel/pack changes activate at EPISODE
  boundaries (P1/ISS-02); packs roll back by registry revert (one
  decision, no deploy); flags roll back instantly; DB changes are additive
  so rollback never migrates down.
- **Canary:** cohort ramp 5→25→100% with S-track monitors from S3 onward;
  before S3, manual golden-transcript spot-checks per release.
- **Migration checkpoints** (go/no-go reviews): after K3 (pipeline parity),
  after C4 (first real pack), after K4 (first pack-driven teaching), after
  K6 (sim gate green), after S3 (first canary-managed rollout). Each
  checkpoint = owner review of the diff dashboard + rollback drill.

## 12. Definition of Done — program level

EOS is "implemented v1" when: all Library turns flow through the kernel
pipeline (K3) executing compiled packs (K4) with verifier enforcement (K5),
surviving simulated-learner CI and LLM-outage drills (K6); capability
gates live (K2+K4); the content chain compiles the pilot-plus subjects from
CEKR (C1–C4) with the SDK usable by a non-engineer educator (C2 evidence);
and the science loop measures it (S1–S4) with at least one pre-registered
experiment completed. School Mode parity is explicitly a SEPARATE follow-on
program.

## 13. Risks

1. **K3 is the load-bearing refactor** — behavior-identical decomposition
   of route.ts; mitigations: golden-transcript harness FIRST, stage-by-
   stage extraction, flag coexistence. Highest-variance estimate in plan.
2. **The K4/C4 join slips if either side redefines the pack format** —
   format is frozen (RS §5.1/EBC §11); any gap is a spec bug, not a design
   conversation.
3. **Pilot-slice authoring reveals DSL friction** (intended!) — budget one
   grammar-revision loop before C4 hardens.
4. **Estimate risk on C4** (compilers always slip) — scope discipline note
   in C4 is normative: pack-needs-only for v1.
5. **Single-owner review bottleneck** — every milestone gated on owner
   approval; batch approvals per checkpoint recommended.
6. **Content remains the moat's long pole** — this plan builds the factory;
   coverage (ISS-07 beyond pilot) needs an educator program the plan can
   only enable.

## 14. Success Metrics

Per release: AI-Decision Ratio ↓ (un-provenanced decisions/turn; from ~1.0
pre-M1 toward 0 in DECIDE by K4); prompt tokens/turn ↓ (target: RS §13's
~330+payload); render-violation rate (K5 SLO ≤5%); simulation invariant
violations = 0 (K6, merge-blocking); replay determinism = byte-identical
(CI); spine coverage (% turns with DecisionRecorded = 100% post-K3);
learner guardrails flat-or-better through every rollout (S3 monitors);
coverage ratchet monotone (C-track); time-to-first-win and
failure-then-vanish improving in the R1 atlas.

---

## 15. Milestone Cross-Map (traceability)

| This plan | Source numbering |
|---|---|
| DONE M0/M1 | EOS §17 M0, M1 |
| P0/P1/P2 | ISS-08/09/13/14/15/18/19, ISS-01/02/04/05/06 |
| K2 | EOS M2 = CAPABILITY_MODEL M1–M3 |
| K3 | EOS M3 (+ISS-01/10) |
| K4 | EOS M4 + RS §5 + EBC §11 consumer |
| K5 | EOS M5 = RS §9 (+ISS-17) |
| K6 | EOS M6 = RS T-5/P-3 |
| K7 | EOS M7 |
| C1 | CEKR-M1 (+ISS-03) |
| C2 | SDK-M1+M2 (+ISS-07 pilot) |
| C3 | CEKR-M2 |
| C4 | EBC build pipeline (CEKR-M4) |
| C5/C6 | SDK-M3/M4, SDK-M5 |
| S1–S5 | OSF-M0…M5 (S5 = CEKR-M5) |

*End of masterplan v1.0.0. Order and gates may be revised by owner decision;
architecture may not — architecture changes route through spec bugs against
the frozen documents.*
