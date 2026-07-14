# My Tutor — Architectural Governance Registry

**Permanent governance document. Read this BEFORE starting any work.**
Its single purpose: **no future work ever duplicates an existing system
again.** Reconstructed from all active branches (evidence-based, no
assumptions). Read-only governance — it modifies no runtime, Educational
Brain, curriculum, or content.

**Reconstructed at**: `1e9ec4d` (foundation) with cross-branch inspection
of `math-linalg-curriculum-34wonr`, `physics-curriculum-production-2x8byo`,
`session-23jc7k`, `compassionate-newton-xlKPq`, `gracious-allen-33nd9`.

**Owner shorthand**: **Pappu** = Educational-Brain/curriculum/blueprint
authoring · **Mohammad** = runtime/execution/QA · **Pipeline** =
Curriculum Production · **Ops** = deployment · **Protected** =
do-not-touch subsystems.

**Branch reality (quantified)**:
| Branch | blueprints | educational-brain/*.md | teaching *.ts | Role |
|---|---|---|---|---|
| `foundation-KDSUO` | 0 | **93** | **64** | prose knowledge tree + Wave 0/1 runtime + QA |
| `math-linalg-curriculum` | **8** | 12 | 41 | primitive framework + blueprints |
| `physics-curriculum-production` | 0 | 12 | 41 | physics KG + Edge deployment fixes |
| `session-23jc7k` | 0 | — | — | ADR 14 schema seed (superseded) |
| `compassionate-newton` / `gracious-allen` | 0 | — | — | Edge middleware bundle fixes |

---

## 1. Complete Ownership Registry

| Subsystem | Purpose | Owner | Canonical branch | Canonical directory | Status | Allowed editors | Forbidden editors | Source of truth |
|---|---|---|---|---|---|---|---|---|
| Project Vision | Charter, moat thesis | Mohammad | foundation | `educational-brain/README.md`, `docs/architecture/EDUCATIONAL_BRAIN_BIBLE.md`, `CLAUDE.md` | FROZEN | Mohammad | all others | the Bible |
| Curriculum Production Pipeline | KG + master-curriculum generation | Pipeline (Pappu-run) | `math-linalg-curriculum`, `physics-curriculum-production` | `docs/{subject}/kg/`, `docs/*CURRICULUM*`, `CURRICULUM_PROGRESS.md` | ACTIVE (per-subject branches) | Pipeline | Mohammad, Runtime | `graph.json` + progress dashboards |
| Knowledge Graphs (6) | Canonical concept structure | Pipeline | any curriculum branch | `docs/{subject}/kg/graph.json` | FROZEN v1.0 | Pipeline only | **everyone** | `graph.json` |
| Board Curriculum | Board/grade/chapter syllabi | School-mode | foundation | `src/lib/education/cbse*Catalog.ts`, `up*Catalog.ts` | MAINTENANCE | Mohammad (careful) | Pappu | catalog files |
| School Mode | Board-driven teaching flow | School-mode | foundation | `src/lib/school/*` | MAINTENANCE | Mohammad | Pappu | code |
| Library Mode | KG-driven teaching flow | Mohammad | foundation | `src/app/api/learn/chat/route.ts` + `src/lib/teaching/*` | FROZEN (Wave 0/1) | Mohammad | Pappu | Contract + route.ts |
| Educational Brain Philosophy | "encode teaching not content"; AI-Removal Test | **CONTESTED** | both | Pappu `docs/curriculum/TEACHING_ASSET_PHILOSOPHY.md`; Mohammad `educational-brain/README` + Contract §4 | DUPLICATED | reconcile | — | **to be ratified** |
| Primitive Library | ~91 atomic teaching primitives | **Pappu** | `math-linalg-curriculum` | `docs/curriculum/PRIMITIVE_LIBRARY.md` | ACTIVE | Pappu | Mohammad | that file |
| Teaching Composition Grammar | primitive→action→protocol language | **Pappu** | `math-linalg-curriculum` | `docs/curriculum/TEACHING_COMPOSITION_GRAMMAR.md` | ACTIVE | Pappu | Mohammad | that file |
| Teaching Blueprint Specification | concept→blueprint authoring contract | **Pappu** | `math-linalg-curriculum` | `docs/curriculum/TEACHING_BLUEPRINT_SPECIFICATION.md` | ACTIVE | Pappu | Mohammad | that file |
| Teaching Blueprints (per concept) | full teachable spec per KG id | **CONTESTED** | both | Pappu `docs/curriculum/blueprints/` (8); Mohammad `educational-brain/concepts/` (4) | DUPLICATED (2 formats) | reconcile | — | **to be ratified** |
| Teaching Actions | the teaching-move catalog | **CONTESTED** | both | Pappu grammar compounds; Mohammad `educational-brain/teaching-actions/` (27) + `src/lib/teaching/actionProcedures.ts` | DUPLICATED | reconcile | — | to be ratified |
| Misconception Engine | birth taxonomy + repair | **CONTESTED** | both | Mohammad `educational-brain/misconceptions/`; Pappu grammar + blueprint fields | DUPLICATED | reconcile | — | to be ratified |
| Assessment Engine | probes/gates | Mohammad (design) + Pappu (blueprint fields) | both | `educational-brain/assessment/`; blueprint `assessment_blueprint` | PARTIAL DUP | reconcile | — | to be ratified |
| CPA / PPA | concrete→pictorial→abstract | **Pappu** | `math-linalg-curriculum` | `docs/curriculum/TEACHING_COMPOSITION_GRAMMAR.md` (CPA state machine) | ACTIVE | Pappu | Mohammad | grammar file |
| Protocols | one execution path per student state | **Pappu** | `math-linalg-curriculum` | `docs/curriculum/protocols/` | ACTIVE | Pappu | Mohammad | protocol files |
| Decision Engine | teaching state machine, decision matrix, action selector | **Mohammad** | foundation | `educational-brain/decision-engine/` | FROZEN | Mohammad | Pappu | those files |
| Teaching Engine (`decide()`) | per-turn mode/action decision | **Mohammad** | foundation | `src/lib/teaching-engine/` | FROZEN | Mohammad | Pappu | code + Contract |
| Runtime (Wave 0/1) | orchestration + execution | **Mohammad** | foundation | `src/app/api/learn/chat/route.ts`, `src/lib/teaching/*` | FROZEN / MAINTENANCE | Mohammad | Pappu | Contract |
| Evidence writers | append-only signal capture | Mohammad | foundation | `src/lib/teaching/evidence/`, route capture | LIVE | Mohammad | Pappu | ADR 13 |
| Mastery | rows + folds | Mohammad | foundation | route mastery blocks, `ConceptMasteryRecord` | LIVE | Mohammad | Pappu | ADR 10 |
| Review scheduling | spaced review | Mohammad | foundation | `src/lib/school/adaptive/spacedRevision`, `sessionLifecycle.ts` | LIVE | Mohammad | Pappu | code |
| Recommendation | dashboard cross-session planner | Mohammad | foundation | `learningOrchestrator.ts` | MAINTENANCE | Mohammad | Pappu | ADR 11 |
| Visualization / Simulation | scenes, diagrams, sims | Mohammad / Visual | foundation | `src/lib/teaching/sceneGenerators/` (31), `visuals/`, `generateVisualizationCode.ts` | LIVE (flag-gated) | Mohammad | Pappu | ADR 12 |
| QA / Validation | blueprint validation + scorecard | **Mohammad** | foundation | `docs/quality/` | COMPLETE | Mohammad | Pappu | that dir |
| Production Review | accept/revise/reject pipeline | Mohammad (reviewer) | foundation | `docs/quality/reviews/` | ACTIVE (idle) | reviewer | authors self-accepting | review log |
| Deployment | Vercel/Edge, bundle, middleware | **Ops** | `compassionate-newton`, `gracious-allen`, `physics-curriculum` | `next.config`, middleware, `docs/*STABILIZATION*` | scattered | Ops | Pappu | those branches |
| ADRs / Architecture | design records | Mohammad | foundation | `docs/architecture/` (ADR 02–14, Bible, Contract, DFD) | FROZEN v1.0 | Mohammad | Pappu | that dir |
| DORMANT: Eb pipeline | archived decision pipeline | none | foundation | `src/lib/educationalBrain/*` | DORMANT | **nobody** | everyone | ADR (do-not-extend) |
| DORMANT: Teaching Assets Platform | orphaned asset system | none | foundation | `src/lib/curriculum/teachingAsset{s,Schema,Adapter}.ts` | ORPHANED | **nobody** | everyone | ADR 14 (retired) |
| PROTECTED: Hindi/Sanskrit | subject architecture | Protected | foundation | `src/lib/education/hindi/`, `cbseSanskritCatalog.ts` | PROTECTED | nobody without owner sign-off | all | CLAUDE.md |

---

## 2. Duplication Report

| Subsystem | Branch A (Pappu) | Branch B (Mohammad) | Duplicated responsibility | Risk | Recommended owner | Action |
|---|---|---|---|---|---|---|
| Teaching Blueprints | `docs/curriculum/blueprints/*` (engine-executable, V-1…V-20, 8 concepts) | `educational-brain/concepts/*` (prose, TEMPLATE.md, 4 concepts) | full per-concept teaching spec | **CRITICAL** — two sources of truth for the same concepts | **Pappu's format canonical** (engine-executable) | **MERGE**: Pappu canonical; Mohammad's concept prose becomes *source knowledge* feeding blueprints, not competing blueprints |
| Teaching Actions | Composition Grammar named compounds (from primitives) | `teaching-actions/` 27-action catalog + `actionProcedures.ts` | the teaching-move definition | HIGH | Primitive substrate (Pappu) | **MERGE**: 27 actions become named compounds over primitives |
| Misconception Engine | grammar + blueprint `common_misconceptions` | `misconceptions/` birth taxonomy + 7-step repair | misconception detection/repair | HIGH | one owner via blueprint fields | **MERGE** (dedupe; keep taxonomy as reference) |
| Assessment | blueprint `assessment_blueprint` | `assessment/` design library | probe/gate spec | MEDIUM | blueprint fields (Pappu) + QA (Mohammad) | **MERGE** |
| AI Removal Test | Asset-Philosophy §2 + Primitive Library | Contract §4 + QA `AI_REMOVAL_AUDIT` | the same named test, twice | MEDIUM | one canonical statement | **MERGE** (single test, referenced by both) |
| Blueprint validation scheme | in-blueprint `V-1…V-20` | QA `V1…V32` | validation numbering | MEDIUM | `docs/quality/` (Mohammad) | **MERGE** into one scheme |
| EB Philosophy | `TEACHING_ASSET_PHILOSOPHY.md` | `educational-brain/README` + validation/08 | the charter | LOW | one canonical charter | **MERGE** |
| Curriculum-context layer | (Pappu's real `docs/curriculum/`) | (Mohammad's aborted `docs/curriculum/`) | curriculum annotation | already resolved | Pappu | **DELETE** (Mohammad's was aborted, never committed) ✓ done |
| ADR 14 schema seed | — | foundation Wave 0 (`assets/`) | knowledge-asset schema | LOW | foundation | **ARCHIVE** `session-23jc7k` (superseded) |
| Edge/deploy fixes | `physics-curriculum` | `compassionate-newton`, `gracious-allen` | same middleware bundle fix ×3 | MEDIUM | Ops, one branch | **MERGE** into trunk, **ARCHIVE** the rest |

---

## 3. Do-Not-Rebuild Registry

Consult before ANY work. If it's here and "Never rebuild = YES", extend
by reference or route feedback to the owner — never re-implement.

| Name | Owner | Branch | Directory | Status | Never rebuild? |
|---|---|---|---|---|---|
| Knowledge Graphs (6) | Pipeline | curriculum branches | `docs/{subject}/kg/` | FROZEN | **YES** |
| Primitive Library | Pappu | math-linalg | `docs/curriculum/PRIMITIVE_LIBRARY.md` | ACTIVE | **YES** |
| Composition Grammar | Pappu | math-linalg | `docs/curriculum/TEACHING_COMPOSITION_GRAMMAR.md` | ACTIVE | **YES** |
| Blueprint Specification | Pappu | math-linalg | `docs/curriculum/TEACHING_BLUEPRINT_SPECIFICATION.md` | ACTIVE | **YES** |
| Teaching Asset Philosophy | Pappu | math-linalg | `docs/curriculum/TEACHING_ASSET_PHILOSOPHY.md` | ACTIVE | **YES** |
| Educational Brain tree | Mohammad | foundation | `educational-brain/` | FROZEN framework | **YES** (extend by reference) |
| Decision Engine | Mohammad | foundation | `educational-brain/decision-engine/` | FROZEN | **YES** |
| Teaching Engine / Runtime | Mohammad | foundation | `src/lib/teaching*`, route.ts | FROZEN | **YES** |
| AssetIdentity pipeline | Mohammad | foundation | `src/lib/teaching/assets/` | COMPLETE | **YES** |
| Evidence / Mastery / Session / Recovery | Mohammad | foundation | `src/lib/teaching/*` | LIVE | **YES** |
| QA framework | Mohammad | foundation | `docs/quality/` | COMPLETE | **YES** |
| Runtime ↔ Brain Contract | Mohammad | foundation | `docs/architecture/RUNTIME_EDUCATIONAL_BRAIN_CONTRACT.md` | CANONICAL | **YES** |
| ADRs / Bible | Mohammad | foundation | `docs/architecture/` | FROZEN | **YES** |
| Visualization / Simulation | Mohammad | foundation | `sceneGenerators/`, `visuals/` | LIVE | **YES** |
| School Mode + board catalogs | School-mode | foundation | `src/lib/school/`, `education/*Catalog` | MAINTENANCE | **YES** |
| Curriculum-context layer | — | — | (do not create) | ABORTED | **YES — never build** |
| Eb pipeline / Teaching Assets Platform | none | foundation | `src/lib/educationalBrain/`, `curriculum/teachingAsset*` | DORMANT | **YES — never extend** |
| Hindi/Sanskrit architecture | Protected | foundation | `education/hindi/`, `cbseSanskrit*` | PROTECTED | **YES — do not touch** |

---

## 4. Owner Responsibility Matrix

**Pappu (Educational Brain / Authoring)**
- OWNS: Primitive Library · Composition Grammar · Blueprint Specification ·
  Teaching Asset Philosophy · Teaching Blueprints (`docs/curriculum/`) ·
  Protocols · CPA grammar · Curriculum Production (KGs, master curricula).
- MUST NEVER MODIFY: `src/` runtime · Decision/Teaching Engine · Evidence/
  Mastery/Session · QA framework · the Contract · ADRs.

**Mohammad (Runtime / Execution / QA)**
- OWNS: Runtime (route.ts, Wave 0/1) · Teaching + Decision Engine ·
  AssetIdentity · Evidence/Mastery/Review/Recovery · Visualization ·
  Recommendation · School Mode · QA framework + review pipeline · ADRs ·
  Bible · Contract · DFD · this registry.
- MUST NEVER MODIFY: `docs/curriculum/` authoring framework · Primitive
  Library · Blueprints · Protocols · KGs.

**Pipeline (Curriculum Production)**
- OWNS: `docs/{subject}/kg/graph.json`, master curricula, progress dashboards.
- MUST NEVER MODIFY: anything downstream (Brain, runtime, QA).

**Ops (Deployment)**
- OWNS: Vercel/Edge config, middleware bundling, stabilization.
- MUST NEVER MODIFY: Brain, runtime pedagogy, curriculum.

**Future engineers**
- OWN: nothing by default. MUST read this registry + the Contract + the
  DFD first, then work ONLY within an assigned owner's territory, to the
  Contract's interface. Never create a system already listed here.

---

## 5. Recommended Cleanup Plan (ordered)

1. **Ratify the canonical blueprint format** (recommend Pappu's engine-
   executable one). Owner decision. Until ratified, the "CONTESTED" rows
   have no source of truth.
2. **Establish one trunk.** Merge `math-linalg-curriculum` (authoring) and
   `foundation` (execution+QA) onto a single trunk; from then on use
   short-lived branches that merge per-deliverable. Long-lived divergent
   branches created this whole problem.
3. **Dedupe the 5 seams** (blueprints, actions, misconceptions, AI-Removal,
   validation scheme) to the single owners in §2's Duplication Report.
4. **Reconcile `docs/curriculum/` ownership** to Pappu; Mohammad's aborted
   layer is already deleted (never committed).
5. **Merge deployment fixes** into trunk from ONE branch; **archive**
   `compassionate-newton`, `gracious-allen`, `session-23jc7k`.
6. **Wire the runtime to the canonical blueprint format** (Mohammad),
   replacing prose-procedure retrieval.

---

## 6. Highest-Risk Areas

1. **Two blueprint formats for the same concepts** (CRITICAL) — the active
   source-of-truth conflict; every day of parallel authoring widens it.
2. **No single trunk** (CRITICAL) — long-lived divergent branches are the
   root cause; without a trunk the registry alone cannot prevent recurrence.
3. **`docs/curriculum/` path contention** (HIGH) — one account already
   nearly re-created it; a hard ownership lock is required.
4. **Silent divergence of shared concepts** (HIGH) — AI-Removal Test,
   validation scheme, teaching-action definition each authored twice and
   drifting.
5. **Dormant look-alikes** (MEDIUM) — `src/lib/educationalBrain/` can be
   mistaken for the live Brain and extended.

---

## Final question — could another engineer accidentally duplicate work?

**TODAY: YES.** Proof: (a) the source-of-truth for Blueprints, Teaching
Actions, Misconceptions, Assessment, AI-Removal, and the validation scheme
is **not yet ratified** — two branches legitimately hold competing
versions, so a new engineer reading either branch believes it is
canonical; (b) there is **no single trunk** — the two frameworks live on
separate long-lived branches, invisible to each other, which is exactly
how the fork formed; (c) `docs/curriculum/` has already been double-claimed
once.

**AFTER the §5 cleanup: NO** — provably, because: (1) one ratified blueprint
format = one source of truth for the contested rows; (2) one trunk with
short-lived branches = no invisible parallel framework can accumulate;
(3) this registry's §3 Do-Not-Rebuild list + §4 owner locks are consulted
before any work; (4) the Runtime ↔ Brain Contract makes the two owners
depend only on each other's *interface*, never internals. Duplication
becomes impossible by construction, not by vigilance.

**This registry is canonical governance. No future work may create a
system listed in §3 or violate the owner locks in §4.**
