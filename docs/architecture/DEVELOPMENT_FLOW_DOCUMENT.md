# My Tutor — Development Flow Document (DFD)

**Canonical project-state reference.** Reconstructed entirely from
repository evidence (git history, directory structure, committed
artifacts). Every claim below is traceable to a file or commit. This
document is the first thing any future session should read before
proposing work: a recommendation that conflicts with this DFD is
rejected.

**Reconstructed at**: commit `6a72005` (branch
`claude/my-tutor-foundation-KDSUO`).

---

## 0. Why this project exists (the vision)

My Tutor aims to teach like the world's greatest human teacher. The
strategic thesis, stated in `educational-brain/README.md` and sharpened
by the First-Principles Review (`CLAUDE.md`): **explanation quality is a
commodity a general LLM already delivers; the durable moat is authored
teaching knowledge + accumulated learning evidence that no general model
can possess.** The runtime should retrieve authored teaching decisions
and content, using the LLM only as a renderer of surface language.

Evidence: `educational-brain/README.md` (charter), `docs/architecture/
EDUCATIONAL_BRAIN_BIBLE.md`, `CLAUDE.md` (First-Principles Review block).

---

## 1. PROJECT TIMELINE

Chronological, from repository evidence. The pipeline the vision
prescribes — Vision → Curriculum Pipeline → KG → Educational Brain →
Teaching Engine → Runtime → QA → Production — maps onto the actual
milestones below.

### Phase A — Application + Curriculum foundation (pre-session history)
- A working Next.js/Prisma/NextAuth tutoring app exists (auth, learn
  chat, dashboard, school + library modes, voice STT/TTS). Evidence:
  `src/`, commits `a058b40`, `5d43c4c`, `aeab1a7`, `13f742c`.
- **Curriculum Production Pipeline** produces six Canonical Knowledge
  Graphs. Evidence: `docs/{mathematics,physics,english,chemistry,
  biology,computer-science}/kg/graph.json` (math 908 · physics 216 ·
  english 216 · chemistry 186 · biology 89 · CS 119).
- Curriculum-level placement wired (level → entry point). Evidence:
  commit `13f742c`, `src/lib/curriculum/placement.ts`.

### Phase B — Educational Brain architecture (frozen v1.0)
- The Educational Brain **Bible + ADRs 02–14** designed and frozen.
  Evidence: `docs/architecture/EDUCATIONAL_BRAIN_BIBLE.md`,
  `ADR_02…ADR_14`, `ARCHITECTURE_COMPLETION_REPORT_V1.md`.

### Phase C — Educational Brain knowledge authoring (Deliveries 3–15)
Chronological, from git:
- D3 Assessment Design Library (`44b8d96`, `assessment/`)
- D5 Curriculum Integration Layer + 3 seed concept entries (`9252f22`,
  `concepts/`)
- D6 First Lesson Standard (`d1534d2`, `first-lesson/`)
- D7 Teaching Decision Engine (`4965248`, `decision-engine/`)
- D8 Student State Model (`7c2cca4`, `student-state/`)
- D9 Human Tutor Validation & Gap Audit (`201498b`, `validation/`)
- D10 Placement & Category Progression Engine (`cdb4278`, `placement/`)
- **Architecture Audit** — 0/52 layers retrieved at runtime (`d7fd678`,
  `validation/07`)
- **Migration Blueprint V1** — Brain→runtime connection plan (`87264d5`)
- D11 Foundations Library (D1 transcription) (`de9653b`, `foundations/`)
- D12 Teaching Action Library (27 actions) (`e022955`, `teaching-actions/`)
- D13 Misconception Evolution (`2472264`, `misconceptions/`)
- D14 concept entry `eng.phonics.phonemic-awareness` (`7e1b2d8`)
- Corrections 1–4 (voice-channel, decision-matrix, reading-load,
  session-boundary) (`9b78be1`, `6aa764b`, `3db937e`, `e246df1`)
- D15 Evidence Architecture (`377a3f2`, `validation/08`)

### Phase D — Runtime implementation (Wave 0 + Wave 1)
- **Wave 0** (owner-approved G2 exception): AssetIdentity activation +
  evidence capture + first-lesson protocol + placement verification +
  Library-mode Decision Engine. Evidence: `8e1bec5`, `131fa9e`;
  `src/lib/teaching/{signals,firstLessonGuard,placementVerification}.ts`,
  `src/lib/teaching/assets/brainSeedAssets.ts`,
  `scripts/brain/seed-knowledge-assets.ts`.
- **Wave 0 red-team**: 4 defects fixed (`3168f2f`).
- **CTO iterations 1–3**: Library mastery evidence loop + D1-grid routing
  (`e3d46cb`); session lifecycle state machine (`5222e9d`,
  `sessionLifecycle.ts`); deterministic recovery triggering (`6d89ecf`,
  `recoveryGuard.ts`).
- **Wave 1 (Runtime Guardian)**: action-procedure retrieval (`0a26098`,
  `actionProcedures.ts`).

### Phase E — Runtime closure
- **Runtime ↔ Educational Brain Contract** (`3f31db7`).
- **Runtime Maintenance Transition** — runtime frozen, feature-complete
  for the current Brain vision (`ddce091`).

### Phase F — QA + Production pipeline (current)
- **QA framework** (10 docs, `docs/quality/`) (`e313086`).
- **Review R-0001** `eng.phonics.phonemic-awareness` → REVISE 89/100
  (`b11f282`).
- **Production metrics ledger** established (`6a72005`).

---

## 2. CURRENT ARCHITECTURE

```
                         VISION (world-class human teacher; Brain is the moat)
                                     │
   ┌─────────────────────────────────┴──────────────────────────────┐
   │                                                                 │
KNOWLEDGE LAYER (authored)                            EXECUTION LAYER (runtime)
   │                                                                 │
   ├─ Curriculum Production Pipeline ──► 6 Canonical KGs             │
   │     (docs/{subject}/kg/graph.json)   [OWNER: Pipeline]          │
   │            │ concept ids                                        │
   │            ▼                                                    │
   ├─ Educational Brain (frozen v1.0)                                │
   │     Bible + ADRs 02–14  [docs/architecture]                    │
   │     Knowledge tree [educational-brain/]:                        │
   │       assessment · concepts · decision-engine · first-lesson ·  │
   │       foundations · misconceptions · placement · student-state ·│
   │       teaching-actions · validation                             │
   │            │  (keyed 1:1 to KG ids)                             │
   │            ▼                                                    │
   └─ Teaching Blueprints (Pappu authors; per-concept)               │
              │                                                      │
              │  retrieval contract (RUNTIME_EDUCATIONAL_BRAIN_CONTRACT.md)
              ▼                                                      ▼
        ┌──────────────────────── RUNTIME (frozen, maintenance) ───────────────┐
        │ route.ts orchestrator ─ decide() Teaching Engine ─ AssetIdentity     │
        │ signals · firstLessonGuard · placementVerification · sessionLifecycle│
        │ recoveryGuard · actionProcedures · evidence engine (writers live)    │
        │ Placement (placement.ts) · Mastery folds · School+Library modes      │
        │ AI = renderer only                                                   │
        └──────────────────────────────────────────────────────────────────────┘
              │ produces
              ▼
        EVIDENCE (append-only) ──► MASTERY state ──► feeds next teaching
              │
              ▼
   QA / PRODUCTION PIPELINE  [docs/quality/]
     Pappu authors → marks READY FOR REVIEW → reviewer certifies →
     PASS/REVISE/REJECT → accepted enters the Brain
```

Dependency direction: KG ← Educational Brain ← Blueprints ← (retrieval
contract) ← Runtime → Evidence → Mastery → Runtime. Everything is keyed
by canonical KG concept id. QA gates the flow of Blueprints into the
Brain.

---

## 3. CURRENT PROJECT STATE (per subsystem, with evidence)

| Subsystem | State | Evidence |
|---|---|---|
| Application (Next.js/Prisma/Auth/UI/voice) | **MAINTENANCE** | `src/`, app commits |
| Curriculum Production Pipeline | **ACTIVE (external owner)** | 6 KGs in `docs/*/kg/` |
| Canonical Knowledge Graphs (6 subjects) | **COMPLETE / frozen v1-era** | `graph.json` ×6 |
| Educational Brain architecture (Bible + ADRs 02–14) | **FROZEN v1.0** | `ARCHITECTURE_COMPLETION_REPORT_V1.md` |
| EB knowledge tree (10 libraries, Deliveries 3–15) | **ACTIVE authoring** | `educational-brain/*/` |
| Teaching Blueprints (per-concept) | **IN PROGRESS (4 of ~1,340)** | `concepts/**/*.md`: fractions, Newton, letter-sound, phonemic-awareness |
| Teaching Engine `decide()` | **COMPLETE / frozen** | `src/lib/teaching-engine/`, Contract |
| Runtime (Wave 0 + Wave 1) | **FROZEN / MAINTENANCE** | `RUNTIME_MAINTENANCE_TRANSITION.md`, `src/lib/teaching/*` |
| AssetIdentity retrieval pipeline | **COMPLETE (empty catalogue until seeded on real DB)** | `assets/`, `brainSeedAssets.ts`, seed script |
| Evidence Engine — writers | **COMPLETE / live** | `evidence/`, route.ts capture blocks |
| Evidence Engine — readers/aggregators | **NOT STARTED (blocked on production data)** | Transition §3, §7 |
| Runtime ↔ Brain Contract | **COMPLETE / canonical** | `RUNTIME_EDUCATIONAL_BRAIN_CONTRACT.md` |
| QA framework (10 docs) | **COMPLETE** | `docs/quality/` |
| Production review pipeline | **ACTIVE (idle; pull-based)** | `docs/quality/reviews/` |
| Primitive Library | **NOT STARTED (FUTURE construct)** | Contract §10; `PRIMITIVE_USAGE_AUDIT.md` |
| Teaching Protocol Library | **NOT STARTED (FUTURE construct)** | Contract §11; `PROTOCOL_USAGE_AUDIT.md` |
| CPA/PPA construct | **NOT STARTED (FUTURE)** | `CPA_COMPLIANCE_AUDIT.md` |
| Deliveries 1–2 remaining engines (mental-models, discovery, curiosity, cognitive-load, transfer, memory, motivation) | **NOT STARTED (designated EB owners exist)** | `educational-brain/README.md` planned list |

---

## 4. OWNER MATRIX

| Domain | Owner | Notes |
|---|---|---|
| Canonical KGs (structure: ids, prerequisites, difficulty, bloom, domains, board mapping) | **Curriculum Production Pipeline** | External; never edited elsewhere |
| Educational Brain framework + knowledge tree | **Pappu** (author) | Frozen framework v1.0; libraries authored under it |
| Teaching Blueprints (per-concept HOW-to-teach) | **Pappu** (author) | One per KG id |
| Blueprint QA / acceptance / review | **Reviewer ("Mohammad/Mohd")** | `docs/quality/`; pull-based, review-only |
| Runtime, Teaching Engine, evidence writers, session/placement/recovery machines | **Runtime Engineering** (maintenance) | Frozen; changes only per Contract §6 / production evidence |
| AI (LLM) | **Renderer only** | No teaching decisions |
| Cognitive load, motivation, curiosity, discovery, transfer, mental models, memory | **Educational Brain** (designated owners; unwritten) | Do NOT build elsewhere |
| Visual/simulation asset prioritization + model | **ADR 12** | Existing architecture |
| Build/authoring priority | **`concepts/COVERAGE.md` + QA** | Expansion protocol owns this |

Pipeline separation (non-negotiable): **Pappu authors → Reviewer
certifies → accepted enters the Brain.** The reviewer never authors; the
author never self-accepts; runtime never invents teaching.

---

## 5. DUPLICATION AUDIT — systems that already exist (MUST NEVER be rebuilt)

| Existing system | Location | Never rebuild because |
|---|---|---|
| Canonical curriculum / structure | `docs/{subject}/kg/graph.json` | Pipeline-owned single source of truth; a second curriculum layer was proposed and **aborted** as a parallel system |
| Knowledge Graphs (6 subjects) | `docs/*/kg/` | Complete; keyed by canonical ids everything else references |
| Educational Brain framework | `docs/architecture/EDUCATIONAL_BRAIN_BIBLE.md` + ADRs | Frozen v1.0 |
| EB knowledge libraries (10) | `educational-brain/*/` | Authored; extend by reference, never restate |
| Teaching Action catalog (27 actions) | `educational-brain/teaching-actions/` | The action namespace; runtime retrieves it (`actionProcedures.ts`) |
| Misconception taxonomy + repair | `educational-brain/misconceptions/` | Authored; birth types + 7-step repair are canonical |
| First-lesson standard | `educational-brain/first-lesson/` | Authored + wired (`firstLessonGuard.ts`) |
| Placement/progression engine | `educational-brain/placement/` + `placement.ts` + `placementVerification.ts` | Authored + wired |
| Student state / evidence architecture | `student-state/`, `validation/08`, ADR 10/13 | Canonical evidence contracts |
| Runtime execution (Wave 0/1) | `src/lib/teaching/*`, route.ts | Frozen; contract-gated |
| AssetIdentity lifecycle | ADR 14 + `assets/` | Wired end-to-end |
| Runtime ↔ Brain Contract | `RUNTIME_EDUCATIONAL_BRAIN_CONTRACT.md` | The permanent interface |
| QA framework | `docs/quality/` | Complete; validation/scorecard/acceptance |
| Teaching Asset Philosophy | ADR 14 + Evidence Architecture | Canonical |
| Cognitive load / motivation / curiosity / etc. | designated EB owners (unwritten) | Ownership assigned; building elsewhere = duplication |
| Visual/simulation priority + model | ADR 12 | Existing |

---

## 6. CURRENT PHASE (where the project actually is today)

**Production-authoring phase, runtime frozen.**

- The **runtime is complete and frozen** for the current Brain vision
  (`RUNTIME_MAINTENANCE_TRANSITION.md`). It executes authored knowledge
  deterministically and captures evidence; it changes only on a
  production bug or a contract-inexpressible need.
- The **Educational Brain framework is frozen v1.0**; its knowledge tree
  is being authored, and its remaining Delivery 1–2 engines are the
  designated-but-unwritten expansion.
- The **binding constraint is Teaching Blueprint coverage**: 4 of ~1,340
  concepts are authored. The pipes (retrieval, evidence, mastery, QA) are
  built and verified; they are near-empty of content.
- The **QA production pipeline is live and idle**, awaiting
  author-submitted blueprints marked READY FOR REVIEW. One blueprint
  (R-0001) is in REVISE.
- The **evidence readers are intentionally not built** — they would read
  empty tables until real students exist.

In one line: *the machine is built; it now needs authored blueprints
flowing in and real-student evidence flowing back.*

---

## 7. NEXT VALID TASKS (non-duplicating only)

Each is valid because it extends a designated owner and duplicates nothing.

1. **Author Teaching Blueprints** for uncovered KG concepts, in
   `concepts/COVERAGE.md` priority order (entry nodes → blueprint-backed
   → cut-nodes → spine). **Owner: Pappu.** Valid: content the runtime
   already retrieves; the single highest-leverage remaining work.
2. **Review submitted blueprints** through the QA pipeline (PASS/REVISE/
   REJECT), updating the metrics ledger. **Owner: reviewer.** Valid:
   applies the existing framework; no new system.
3. **Revise R-0001** (author side) then re-review — close the one
   in-flight blueprint. Valid: completes an open pipeline item.
4. **Transcribe remaining Delivery 1–2 EB engines** (mental-models,
   discovery, curiosity, cognitive-load, transfer, memory, motivation)
   into their designated `educational-brain/` directories. **Owner: EB
   authoring.** Valid: these have designated owners and are unwritten;
   authoring them is not duplication.
5. **Seed AssetIdentity on a real database** (`npm run seed:brain-assets`)
   and live-verify `provider:'memory'`. **Owner: Runtime maintenance.**
   Valid: activation of an existing wired pipeline, no new code.
6. **When production data exists**: build Evidence Engine readers/
   aggregators. **Owner: Runtime maintenance.** Valid per Transition §7;
   blocked until data exists.
7. **Owner decisions** (not engineering): data governance for minors'
   verbatim capture; snapshot optimistic-concurrency pass. Valid:
   pre-launch prerequisites, flagged in the Transition.

---

## 8. FORBIDDEN WORK (already exists — never propose again)

- ❌ A new curriculum layer / curriculum-context layer / "skeleton" layer
  (proposed and **aborted** as a parallel system — structure is the KG's;
  context is the EB engines'). See the Duplication Audit that killed it.
- ❌ Rebuilding or editing the Knowledge Graphs outside the Pipeline.
- ❌ A new Teaching Engine, orchestrator, student model, assessment
  engine, placement engine, or lesson planner (all exist; Contract §14).
- ❌ New runtime teaching intelligence, prompts-as-pedagogy, or any
  runtime change that alters what/how/when something is taught (Contract
  §14; Transition §4).
- ❌ Re-authoring universal engines already transcribed (Recovery,
  Adaptive Rules, Voice Model, Universal Principles, Teaching Actions,
  Misconceptions) — extend by reference (`concepts/README.md` reuse law).
- ❌ A parallel QA/validation framework (exists in `docs/quality/`).
- ❌ Building cognitive-load / motivation / curiosity content outside
  their designated EB engines.
- ❌ Building Evidence readers against empty tables (blocked on data).
- ❌ Duplicating the Runtime ↔ Brain Contract, the Bible, or ADRs.

---

## 9. PROJECT MAP (one page — read before recommending anything)

```
MY TUTOR — ONE-PAGE MAP
────────────────────────────────────────────────────────────────────
GOAL: teach like the world's best human teacher. Brain = moat, AI = renderer.

FLOW:  Curriculum Pipeline → KGs → Educational Brain → Blueprints
       → (retrieval contract) → Runtime → Evidence → Mastery → repeat
       QA gates Blueprints into the Brain.

STATE:
  KGs (6 subjects) .................. COMPLETE (Pipeline-owned)
  EB framework (Bible/ADRs) ......... FROZEN v1.0
  EB knowledge tree (10 libs) ....... AUTHORING (Deliveries 3–15 done)
  Teaching Blueprints ............... IN PROGRESS — 4 of ~1,340  ← BOTTLENECK
  Runtime (Wave 0+1) ................ FROZEN / MAINTENANCE
  Evidence writers .................. LIVE ; readers NOT STARTED (need data)
  QA + review pipeline .............. COMPLETE + ACTIVE (idle, pull-based)
  Primitives/Protocols/CPA .......... FUTURE (not started, designated)
  Delivery 1–2 remaining engines .... NOT STARTED (designated EB owners)

OWNERS: Pappu authors Brain+Blueprints · Reviewer certifies via docs/quality/
        · Runtime Eng maintains (frozen) · Pipeline owns KGs · AI renders only.

DO NOT REBUILD: KGs, curriculum, Teaching Engine, runtime, student model,
  assessment/placement/lesson engines, QA framework, Contract, the
  transcribed universal engines, ADR 12 visual model. A curriculum-context
  layer was tried and ABORTED as a parallel system — do not retry it.

NEXT VALID WORK: (1) author Blueprints in COVERAGE priority order,
  (2) run them through QA review, (3) transcribe remaining D1–2 engines,
  (4) seed AssetIdentity on real DB, (5) build Evidence readers ONLY once
  production data exists.

CURRENT PHASE: production-authoring; runtime frozen; the machine is built
  and near-empty — it needs blueprints in and real-student evidence back.
────────────────────────────────────────────────────────────────────
```

**This DFD is canonical. Validate every future recommendation against it;
if a recommendation conflicts, reject it.**
