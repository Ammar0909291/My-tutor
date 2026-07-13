# My Tutor — Project Task Breakdown
## Canonical Execution Roadmap

**Version:** 1.0  
**Date:** 2026-07-13  
**Branch:** claude/math-linalg-curriculum-34wonr  
**Status:** Planning document. Nothing in this document grants implementation permission.  
All items gated by Wave 0 remain blocked until (G1) the Curriculum Production Pipeline declares  
Canonical KG v1 frozen AND (G2) the project owner approves each item explicitly in  
`docs/architecture/WAVE_0_APPROVAL_CHECKLIST.md`.

---

## How to read this document

Each task is independently completable, independently reviewable, and independently committable.  
"One session" means a single Claude Code session of approximately 2–4 hours.  
Dependencies are listed as Task IDs. If a task has no dependencies listed, it can start immediately.

**Gating symbols used throughout:**

| Symbol | Meaning |
|---|---|
| 🔴 BLOCKED-G1 | Requires Canonical KG v1 freeze declaration |
| 🔴 BLOCKED-G2 | Requires explicit owner approval in WAVE_0_APPROVAL_CHECKLIST.md |
| 🟡 READY | Can begin immediately (no gate) |
| 🟢 DONE | Already complete |

---

## Current State Snapshot (2026-07-13)

| Subject | KG Concepts | KG Status | Blueprints Done | Blueprints Remaining |
|---|---|---|---|---|
| Mathematics | 908 | frozen v1.0.1 | 146 | 762 |
| Physics | 194 | production | 194 | 0 ✓ COMPLETE |
| Chemistry | 186 | production | 0 | 186 |
| Computer Science | 119 | production | 0 | 119 |
| Biology | 89 | production | 0 | 89 |
| English | 216 | production (unregistered) | 2 | 214 |
| **TOTAL** | **1,712** | | **342** | **1,370** |

CI pipeline: `.github/workflows/validate.yml` exists; KG validator passes 6/6.  
Architecture: v1.0 FROZEN. All 15 completion criteria DONE. 14 ADRs written.  
Implementation: ALL gated on Wave 0. Nothing approved yet.

---

---

# GROUP 1 — EDUCATIONAL BRAIN

*Implementation of the 14 ADRs into the production runtime. Governed by WAVE_0_APPROVAL_CHECKLIST.md.*

---

### EB-01 — English KG Runtime Registration
**Priority:** HIGH (production bug — English learners currently served legacy static graph)  
**Status:** 🔴 BLOCKED-G2  
**Gate item:** W0-2

**Purpose:** Register the English Canonical KG (216 concepts, validator PASS) into the  
runtime registry so English learners receive the same KG-driven teaching path as other subjects.

**Deliverable:**  
- `src/lib/curriculum/knowledgeGraph.ts`: add `'english'` to `SUBJECT_ADAPTERS` and `ID_PREFIX_TO_SUBJECT` (2 lines)  
- Remove `case 'english'` legacy routing (line ~286 in the same file)  
- Verify no remaining references to the legacy static English Knowledge Graph import

**Dependencies:** G2 approval of W0-2  
**Estimated sessions:** 1  
**Acceptance criteria:**  
- English KG loads via the canonical adapter path  
- Validator passes  
- No regression on existing subjects (vitest green, tsc ratchet holds)  
- Legacy static English graph is no longer imported in the runtime path

---

### EB-02 — KG Consumption Gate (ADR 06, W1-1)
**Priority:** HIGH  
**Status:** 🔴 BLOCKED-G1, 🔴 BLOCKED-G2  
**Gate items:** W0-1, W1-1

**Purpose:** Add a 4-part load-time gate in `subjectKgAdapter.ts` that validates KG version,  
status, runtime shape, and surfaces diagnostic metadata — so silent breakage on KG changes  
is impossible.

**Deliverable:**  
- `src/lib/curriculum/subjectKgAdapter.ts`: add schema major-version check, status check,  
  runtime shape validation (8 consumed fields), diagnostic surface  
- Unit tests for the gate (Tier 1, `src/tests/`)

**Dependencies:** W0-1 (freeze scope confirmed)  
**Estimated sessions:** 1  
**Acceptance criteria:**  
- Loading a KG with wrong major version throws a clear error with the version number  
- Loading a KG with status `draft` in production mode throws a clear warning  
- All 6 subject KGs pass the gate  
- Gate adds < 10 ms to cold-start load time

---

### EB-03 — Student Memory Foundation: New Tables (ADR 10 Phase 1, W1-2)
**Priority:** HIGH  
**Status:** 🔴 BLOCKED-G2  
**Gate item:** W1-2

**Purpose:** Create `ConceptMasteryRecord`, `BrainConfig`, `ActiveMisconception` tables  
and a typed `SessionMemory` schema. Additive only — no reader or writer migration yet.

**Deliverable:**  
- `prisma/schema.prisma`: three new models (`ConceptMasteryRecord`, `BrainConfig`, `ActiveMisconception`)  
- `src/lib/student-memory/types.ts`: typed `SessionMemory` schema matching `contextSnapshot` JSONB fields  
- `npx prisma db push` verified  
- Migration notes in `docs/architecture/ADR_10_STUDENT_MEMORY_ARCHITECTURE.md`

**Dependencies:** G2 approval of W1-2  
**Estimated sessions:** 1  
**Acceptance criteria:**  
- `prisma db push` succeeds with zero data loss on existing tables  
- New tables exist with correct field types and indices  
- Zero readers or writers touch the new tables yet (additive phase only)  
- vitest green; tsc ratchet holds

---

### EB-04 — Evidence Engine: appendEvidenceEvent (ADR 13 Phase 1, W1-3)
**Priority:** MEDIUM  
**Status:** 🔴 BLOCKED-G2  
**Gate item:** W1-3

**Purpose:** Wire `appendEvidenceEvent()` as a fire-and-forget call in the chat-route persist  
stage. Append-only; nothing reads the log yet.

**Deliverable:**  
- `src/lib/evidence/appendEvidenceEvent.ts`: function that writes to `EbEvidenceEvent` table  
- `src/app/api/learn/chat/route.ts`: call `appendEvidenceEvent()` in the persist stage (after response sent)  
- Unit test verifying the schema and fire-and-forget non-blocking behavior

**Dependencies:** EB-03 (EbEvidenceEvent table exists via ADR 13 schema; confirm EB-03 or add table in this task if ADR 13 schema is separate)  
**Estimated sessions:** 1  
**Acceptance criteria:**  
- Evidence events are written without blocking the chat response  
- Failure in event writing does not throw to the client  
- Schema matches ADR 13's `EbEvidenceEvent` definition exactly  
- vitest green; tsc ratchet holds

---

### EB-05 — Knowledge Asset Identity Tables (ADR 14 Phase 1, W1-4)
**Priority:** MEDIUM  
**Status:** 🔴 BLOCKED-G2  
**Gate item:** W1-4

**Purpose:** Create empty `AssetIdentity` and three family tables (`ExplanationAsset`,  
`VisualAsset`, `ProbeAsset`). Additive only — nothing is served from these tables yet.

**Deliverable:**  
- `prisma/schema.prisma`: four new models per ADR 14 §4  
- `npx prisma db push` verified

**Dependencies:** G2 approval of W1-4  
**Estimated sessions:** 1  
**Acceptance criteria:**  
- All four tables exist with correct schema  
- `incompatibilities` field present on `AssetIdentity`  
- Lifecycle enum `DRAFT | REVIEW | ACTIVE | DEPRECATED | RETIRED` implemented  
- Zero asset serving logic wired yet (additive phase only)

---

### EB-06 — Library Mode Concept Node Seeding (ADR 08, W2-1)
**Priority:** HIGH  
**Status:** 🔴 BLOCKED-G2  
**Gate item:** W2-1  
**Dependencies:** EB-03

**Purpose:** Wire `currentConceptNodeId` seed-and-persist for Library Mode sessions.  
Currently `contextSnapshot.currentConceptNodeId` has exactly one write site, gated by  
`if (schoolCtx)`. This task extends it to Library Mode so the Teaching Engine's  
`decide()` function fires for both modes.

**Deliverable:**  
- `src/app/api/learn/chat/route.ts`: Library branch (~line 964) writes `currentConceptNodeId`  
  using the Library session's active concept (from `SessionMemory`)  
- `src/lib/student-memory/`: read/write helpers for `SessionMemory.currentConceptNodeId`  
- Tier 2 engine-contract test verifying the decision fires for a Library-mode fixture

**Estimated sessions:** 1  
**Acceptance criteria:**  
- Library sessions produce a `TeachingAction` output from `decide()`  
- School sessions unaffected (no fixture regression)  
- `currentConceptNodeId` persisted across turns in Library Mode

---

### EB-07 — Dynamic Lesson Continuity (ADR 09, W2-2)
**Priority:** MEDIUM  
**Status:** 🔴 BLOCKED-G2  
**Gate item:** W2-2  
**Dependencies:** EB-03

**Purpose:** Add `lessonStageProgress` and `planSignature` to `contextSnapshot` so  
lesson plans persist across turns rather than being recomputed from scratch each turn.

**Deliverable:**  
- `contextSnapshot` schema: add `lessonStageProgress` and `planSignature` keys  
- `src/lib/teaching-engine/lessonComposer.ts` (or equivalent): compute `planSignature` fingerprint;  
  on matching signature, resume rather than replan  
- Tier 2 test verifying a 3-turn session uses stage continuity

**Estimated sessions:** 1  
**Acceptance criteria:**  
- Identical concept + same stage = same plan signature → lesson continues rather than resets  
- Changed concept = new plan signature → fresh plan  
- School-mode lesson plans unaffected

---

### EB-08 — Mastery Level Library Extension (ADR 07, W2-3)
**Priority:** MEDIUM  
**Status:** 🔴 BLOCKED-G2  
**Gate item:** W2-3  
**Dependencies:** EB-03

**Purpose:** Extend canonical `MasteryLevel` to Library Mode; consolidate `learningProfile.ts`  
onto it. Requires the ADR 07 equivalence-validation report first (confirmed behavior-change risk).

**Deliverable:**  
- **Sub-task A (no gate required):** produce the equivalence-validation report comparing  
  `learningProfile.ts` mastery classification against `MasteryLevel` on 20 representative  
  learner state snapshots. Document all divergences. Commit to `docs/architecture/`.  
- **Sub-task B (gated, starts after A + G2):** modify `learningProfile.ts` to delegate to  
  `MasteryLevel`; extend `MasteryLevel` with Library-Mode entry conditions

**Estimated sessions:** 2 (A: 1 session; B: 1 session)  
**Acceptance criteria:**  
- A: report identifies every divergence between old and new classification; divergences resolved  
- B: no fixture regression; tsc clean increment; `learningProfile.ts` no longer contains its own  
  mastery boundary constants

---

### EB-09 — Session Recommendation Reconciler (ADR 11, W2-4)
**Priority:** MEDIUM  
**Status:** 🔴 BLOCKED-G2  
**Gate item:** W2-4  
**Dependencies:** EB-03

**Purpose:** Implement the two-layer recommendation architecture: a deterministic  
Session Recommendation Reconciler (pure function, priority table, `maxSessionSignals` cap)  
and `getTopLibraryRecommendation()`.

**Deliverable:**  
- `src/lib/recommendations/reconciler.ts`: pure function, signal priority table, cap from BrainConfig  
- `src/lib/recommendations/libraryRecommendation.ts`: `getTopLibraryRecommendation()`  
- Integration into chat-route system prompt construction  
- Tier 2 test for signal-conflict fixture (fixture 6, R15)

**Estimated sessions:** 1  
**Acceptance criteria:**  
- Conflicting signals resolved deterministically (not by LLM)  
- Signal count capped at `maxSessionSignals` (from BrainConfig)  
- Library Mode has a recommendation signal  
- Fixture 6 (signal-conflict) flips to PASS

---

### EB-10 — KG Field Exposure: cross_links and mastery_threshold (ADR 05, W2-5)
**Priority:** LOW  
**Status:** 🔴 BLOCKED-G1, 🔴 BLOCKED-G2  
**Gate items:** W0-1, W1-1, W1-2, W2-5  
**Dependencies:** EB-02, EB-03

**Purpose:** Expose `cross_links` and `mastery_threshold` past the adapter so the  
runtime can use per-concept thresholds instead of the flat `ASSESSMENT_PASS_THRESHOLD = 70`.

**Deliverable:**  
- `ConceptNode` and `KnowledgeNode` types: add `crossLinks` and `masteryThreshold` fields  
- `subjectKgAdapter.ts`: surface both fields  
- Replace `ASSESSMENT_PASS_THRESHOLD = 70` with per-concept `BrainConfig` lookup  
- Tier 2 test verifying threshold varies by concept

**Estimated sessions:** 1  
**Acceptance criteria:**  
- `masteryThreshold` (0.35–0.95 per KG) used in all scoring engines  
- `ASSESSMENT_PASS_THRESHOLD` constant removed  
- All 6 KGs load with the new field; validator still passes

---

### EB-11 — Student Memory Migration: Readers (ADR 10 Phase 2, W3-1 part A)
**Priority:** MEDIUM  
**Status:** 🔴 BLOCKED-G2  
**Gate item:** W3-1  
**Dependencies:** EB-03, EB-06, EB-07, EB-08, EB-09 (Wave 2 complete)

**Purpose:** Migrate all mastery readers to read from `ConceptMasteryRecord` (single-writer  
store) while existing `TopicProgress` writers continue in parallel (dual-read phase).

**Deliverable:**  
- All mastery read sites identified and migrated  
- Split-brain check: old and new mastery reads reconciled on a production snapshot

**Estimated sessions:** 1  
**Acceptance criteria:**  
- No fixture regression  
- `masteryConfidence = 0.0` marks all transition-derived scores  
- Dual read produces same result as legacy read for all fixture inputs

---

### EB-12 — Student Memory Migration: Writers (ADR 10 Phase 3, W3-1 part B)
**Priority:** MEDIUM  
**Status:** 🔴 BLOCKED-G2  
**Gate item:** W3-1  
**Dependencies:** EB-11

**Purpose:** Migrate the four `TopicProgress` writers to `ConceptMasteryRecord`.  
Highest-risk wave; must not be combined with other behavior changes.

**Deliverable:**  
- All four `TopicProgress` write sites migrated to `ConceptMasteryRecord`  
- Split-brain confirmed resolved

**Estimated sessions:** 1  
**Acceptance criteria:**  
- No fixture regression  
- `TopicProgress` still exists but is no longer written to by the chat route  
- Old and new mastery representations agree on the production snapshot

---

### EB-13 — Visual Asset Cache (ADR 12 Phases 2-3, W4-2)
**Priority:** HIGH  
**Status:** 🔴 BLOCKED-G2  
**Gate item:** W4-2  
**Dependencies:** EB-05

**Purpose:** Replace text-hash-keyed visual cache with concept-keyed cache  
`(conceptId, renderer, language, gradeBand)`. Move all visual LLM calls to background  
authoring. Fixes R16 (Permanent Rule 9 violation — second LLM call per turn).  
`ENABLE_DYNAMIC_VISUALIZATION` must stay `false` until this lands.

**Deliverable:**  
- `src/lib/teaching/visualCache.ts`: concept-keyed cache using `AssetIdentity`  
- Background authoring queue for visual generation  
- `a11yDescription` field mandatory on every served visual  
- Visual LLM calls removed from the synchronous chat path

**Estimated sessions:** 2  
**Acceptance criteria:**  
- No second LLM call in the synchronous chat path (Permanent Rule 9 satisfied)  
- Concept-keyed cache hit on second request for same concept  
- `a11yDescription` present on all served visuals  
- R16 and R17 both resolved

---

### EB-14 — Knowledge Asset Passive Catalogue (ADR 14 Phase 2, W4-1)
**Priority:** MEDIUM  
**Status:** 🔴 BLOCKED-G2  
**Gate item:** W4-1  
**Dependencies:** EB-05

**Purpose:** Populate the asset catalogue passively — generated content saved as DRAFT;  
`teaching-assets/assets.json` pipeline output ingested as curated source. Nothing served yet.

**Deliverable:**  
- Ingestion script: reads `docs/{subject}/teaching-assets/assets.json`, inserts DRAFT records into `AssetIdentity` tables  
- Chat-route: generated worked examples / explanations saved as DRAFT  
- No serving logic yet

**Estimated sessions:** 1  
**Acceptance criteria:**  
- DRAFT assets accumulate in the database after chat sessions  
- Pipeline assets ingested with correct `provenance` and `canonicalSlug`  
- Nothing is served from the catalogue yet (behaviour identical to today)

---

### EB-15 — Evidence Engine: EWMA Worker + Rollup (ADR 13 Phases 2-3, W4-4)
**Priority:** MEDIUM  
**Status:** 🔴 BLOCKED-G2  
**Gate item:** W4-4  
**Dependencies:** EB-04, EB-09

**Purpose:** Implement the three-tier evidence pipeline: 60s EWMA rolling-window worker,  
nightly authoritative rollup, and bias counters. Wire `assetEffectivenessSignal` into the  
ADR 11 Reconciler.

**Deliverable:**  
- `src/lib/evidence/ewmaWorker.ts`: 60s rolling window, Beta-binomial confidence  
- `src/lib/evidence/nightly.ts`: authoritative rollup, `StrategyEffectivenessScore`  
- `src/lib/evidence/biasCounters.ts`: exploration budget, inverse propensity weighting, misconception-conditional scoring  
- ADR 11 Reconciler wired to `assetEffectivenessSignal`

**Estimated sessions:** 2  
**Acceptance criteria:**  
- EWMA scores update within 60 s of new events  
- Nightly rollup produces stable `StrategyEffectivenessScore` records  
- `assetEffectivenessSignal` correctly gates "revisit" vs. "try different approach" in the Reconciler

---

### EB-16 — Active Asset Serving (ADR 14 Phase 3, W4-3)
**Priority:** MEDIUM  
**Status:** 🔴 BLOCKED-G2  
**Gate item:** W4-3  
**Dependencies:** EB-14, EB-04

**Purpose:** Promote DRAFT → ACTIVE assets and serve them. Skip the LLM call when an  
ACTIVE asset exists for the concept. Enforce `incompatibilities` gate (do not serve assets  
that reinforce active learner misconceptions).

**Deliverable:**  
- Promotion workflow: DRAFT → REVIEW → ACTIVE (manual trigger for now)  
- Chat route: before LLM call, check for ACTIVE asset; serve if present  
- `incompatibilities` lookup against `ActiveMisconception` table

**Estimated sessions:** 1  
**Acceptance criteria:**  
- LLM call skipped when ACTIVE asset exists (per-block)  
- Incompatible assets not served to learners with matching active misconceptions  
- Asset turns byte-stable (same asset served on repeated requests)

---

### EB-17 — Probe Assets + Evidence-Driven Deprecation (ADR 14 Phase 4, W5-1)
**Priority:** LOW  
**Status:** 🔴 BLOCKED-G2  
**Gate item:** W5-1  
**Dependencies:** EB-16, EB-15

**Purpose:** Add ProbeAsset migration and wire the five evidence-driven deprecation triggers  
so assets that underperform are automatically deprecated.

**Deliverable:**  
- ProbeAsset populated from assessment probes in blueprints  
- Five deprecation triggers wired: low outcome rate, misconception prevalence spike, curriculum change, version conflict, manual override  
- Deprecation transitions: ACTIVE → DEPRECATED → RETIRED

**Estimated sessions:** 1  
**Acceptance criteria:**  
- Assets deprecated automatically when `outcomeRate` falls below threshold  
- No RETIRED assets ever served  
- Deprecation log queryable

---

### EB-18 — Legacy TopicProgress Deprecation (ADR 10 Phase 4, W5-2)
**Priority:** LOW  
**Status:** 🔴 BLOCKED-G2  
**Gate item:** W5-2  
**Dependencies:** EB-12

**Purpose:** Remove remaining `TopicProgress` write sites; table becomes read-only for  
historical compatibility then archived.

**Deliverable:**  
- All `TopicProgress` write calls removed  
- Table marked deprecated in schema  
- Migration notes

**Estimated sessions:** 1  
**Acceptance criteria:**  
- No write to `TopicProgress` in the chat route  
- Existing `TopicProgress` data readable for historical reporting  
- vitest green; no fixture regression

---

### EB-19 — Teaching Assets Platform Archive Headers (W5-3)
**Priority:** LOW  
**Status:** 🟡 READY (no gate — documentation-only)

**Purpose:** Add archive-status header comments to the three retired Teaching Assets Platform  
files (`teachingAssets.ts`, `teachingAssetSchema.ts`, `teachingAssetAdapter.ts`) per R19  
mitigation and ADR 14.

**Deliverable:**  
- Three files each get a top-of-file comment: `// ARCHIVED: retired by ADR 14 (2026-07-13). Zero live importers. Do not extend.`

**Estimated sessions:** < 1 (30 minutes)  
**Acceptance criteria:**  
- All three files have the archive header  
- No imports or logic changed

---

---

# GROUP 2 — RUNTIME INTEGRATION

*Wiring the Educational Brain architecture into the live Next.js routes and services.*

---

### RI-01 — P10 Test Seam: Chat Route Extraction (W1-5)
**Priority:** HIGH  
**Status:** 🔴 BLOCKED-G2  
**Gate item:** W1-5

**Purpose:** Refactor the chat route's orchestration into an importable function so Tier 2  
tests can exercise the pipeline without an HTTP server. Test-only refactor — no behavior change.

**Deliverable:**  
- `src/lib/chat/orchestrate.ts`: extract the route handler body into a pure-enough function  
  that test code can import and call it with a mocked LLM  
- Verify the HTTP route still works by calling this function  
- Tier 2 test scaffold: one smoke-test that calls `orchestrate()` with a fixture

**Estimated sessions:** 1  
**Acceptance criteria:**  
- `orchestrate()` is importable with no HTTP context  
- HTTP route delegates to `orchestrate()`  
- Smoke-test passes without network calls  
- No behavior change in production traffic

---

### RI-02 — P10 Test Seam: Provider URL Override (W1-6)
**Priority:** HIGH  
**Status:** 🔴 BLOCKED-G2  
**Gate item:** W1-6

**Purpose:** Add an env-override for provider base URL so the transcript player can serve  
T3a LLM responses over HTTP from a local fixture server.

**Deliverable:**  
- `src/lib/ai/client.ts`: read `TEST_AI_BASE_URL` env var; if set, use as base URL for all AI calls  
- Documentation in `docs/architecture/VALIDATION_FRAMEWORK_P10.md`

**Estimated sessions:** < 1  
**Acceptance criteria:**  
- Setting `TEST_AI_BASE_URL` redirects all LLM calls to that URL  
- Production behavior unchanged when env var is unset  
- No hardcoded test URLs in production code

---

### RI-03 — Tier 2 Engine-Contract Test Suite (P10 Phase 2)
**Priority:** HIGH  
**Status:** 🔴 BLOCKED-G2  
**Gate items:** W1-5, W1-6  
**Dependencies:** RI-01, RI-02

**Purpose:** Build the 15-fixture frozen Tier 2 test suite per `VALIDATION_FRAMEWORK_P10.md`.  
Tests import real engine modules (not replicas). Each fixture is a real-learner-shaped input  
producing a known output verdict.

**Deliverable:**  
- `src/tests/tier2/`: 15 fixture files + test runner  
- Each fixture: input `contextSnapshot`, expected Teaching Action, expected strategy type, expected signal count  
- CI integration: runs on every push/PR  
- Fixture verdicts frozen: a flip = CI failure

**Estimated sessions:** 2  
**Acceptance criteria:**  
- 15 fixtures passing  
- Fixture 6 (R15 signal-conflict) and Fixture 12 (ADR 08 Library-mode gap) both pass after EB-06 and EB-09  
- Replica drift eliminated for all covered modules  
- CI runs the suite on every push

---

### RI-04 — CI Type-Error Ratchet Baseline
**Priority:** HIGH  
**Status:** 🟡 READY

**Purpose:** Capture `scripts/ci/tsc-baseline.txt` from the first hosted CI run  
(currently in bootstrap mode because the baseline file does not exist).

**Deliverable:**  
- Run `npx tsc --noEmit 2>&1 | wc -l` in a clean environment with a generated Prisma client  
- Write the count to `scripts/ci/tsc-baseline.txt`  
- Commit and push

**Estimated sessions:** < 1  
**Acceptance criteria:**  
- `scripts/ci/tsc-baseline.txt` exists and contains a number  
- CI validate workflow exits the ratchet bootstrap mode  
- Any PR that increases the error count fails CI

---

### RI-05 — prerequisiteRecovery Library-Mode Extension
**Priority:** MEDIUM  
**Status:** 🔴 BLOCKED-G2  
**Dependencies:** EB-06

**Purpose:** `prerequisiteRecovery.detectPrerequisiteGap` resolves prerequisite IDs through  
a module-global `KG_BY_ID` keyed on the school KG only. Extend it with a caller-supplied  
corpus map so Library Mode sessions can use it.

**Deliverable:**  
- `src/lib/school/adaptive/prerequisiteRecovery.ts`: add optional `corpusMap` parameter  
- Library Mode call site: pass the subject KG as the corpus map  
- Tier 2 test verifying gap detection for a Library concept

**Estimated sessions:** 1  
**Acceptance criteria:**  
- Library sessions detect prerequisite gaps using their subject KG  
- School sessions unaffected (school KG still default)  
- ADR 02 §7 item 1 resolved

---

### RI-06 — BrainConfig Versioned Policy Store
**Priority:** MEDIUM  
**Status:** 🔴 BLOCKED-G2  
**Dependencies:** EB-03

**Purpose:** Implement `BrainConfig` as a queryable versioned policy store that replaces  
hardcoded constants (`maxSessionSignals`, visual policy, `masteryThreshold` overrides).

**Deliverable:**  
- `BrainConfig` table populated with default values on first deploy  
- `src/lib/brain/config.ts`: typed accessor functions  
- At minimum replace: `ASSESSMENT_PASS_THRESHOLD`, `maxSessionSignals`, visual renderer priority  
- Admin UI endpoint to read current BrainConfig (read-only; no write UI yet)

**Estimated sessions:** 1  
**Acceptance criteria:**  
- All replaced constants removed from source  
- `BrainConfig` defaults match former hardcoded values (no behavior change)  
- Admin can inspect current policy values via API

---

---

# GROUP 3 — TEACHING CONTENT LIBRARY

*The largest body of remaining work. 1,370 Teaching Blueprint Specifications remain  
(out of 1,712 total concepts across 6 subjects). Each blueprint is a 16-section  
Teaching Blueprint Specification per the established template.*

*Naming convention:* `docs/curriculum/blueprints/{prefix}.{domain}.{concept}.md`  
*Commit discipline:* 3 blueprints per commit, push after every commit.

---

## 3A — Mathematics Blueprints (762 remaining of 908)

*Domains ordered by topological dependency. Each task = one domain.*

| Task ID | Domain | Prefix | Concepts | Status |
|---|---|---|---|---|
| CL-MATH-01 | Probability | math.prob | 49 | 🟡 READY — NEXT |
| CL-MATH-02 | Statistics | math.stats | 40 | 🟡 READY |
| CL-MATH-03 | Discrete Mathematics | math.disc | 32 | 🟡 READY |
| CL-MATH-04 | Abstract Algebra | math.abst | 37 | 🟡 READY (6 partial) |
| CL-MATH-05 | Real Analysis | math.real | 30 | 🟡 READY |
| CL-MATH-06 | Complex Analysis | math.cx | 31 | 🟡 READY |
| CL-MATH-07 | Topology | math.top | 23 | 🟡 READY |
| CL-MATH-08 | Measure Theory | math.meas | 13 | 🟡 READY |
| CL-MATH-09 | Functional Analysis | math.fnal | 18 | 🟡 READY |
| CL-MATH-10 | Numerical Analysis | math.num | 16 | 🟡 READY |
| CL-MATH-11 | Optimization | math.opt | 16 | 🟡 READY |
| CL-MATH-12 | Graph Theory | math.graph | 16 | 🟡 READY |
| CL-MATH-13 | Category Theory | math.cat | 15 | 🟡 READY |

**Per-task format:**

---

### CL-MATH-01 — Probability Blueprints
**Priority:** HIGH (next in CURRICULUM_PROGRESS.md queue)  
**Status:** 🟡 READY  
**Purpose:** Author 49 Teaching Blueprint Specifications for all concepts in math.prob.  
**Deliverable:** 49 files: `docs/curriculum/blueprints/math.prob.*.md`  
**Dependencies:** None (Probability domain is marked NEXT in CURRICULUM_PROGRESS.md)  
**Estimated sessions:** 4 (≈ 12 blueprints per session)  
**Acceptance criteria:**  
- All 49 concepts covered (verified against `docs/mathematics/kg/graph.json`)  
- Each blueprint passes the 16-section template check  
- Each ends with `PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.`  
- Topological order respected within the domain  
- CURRICULUM_PROGRESS.md updated to `draft ✓`

---

### CL-MATH-02 — Statistics Blueprints
**Priority:** HIGH  
**Status:** 🟡 READY  
**Purpose:** Author 40 Teaching Blueprint Specifications for math.stats.  
**Deliverable:** 40 files: `docs/curriculum/blueprints/math.stats.*.md`  
**Estimated sessions:** 4  
**Acceptance criteria:** Same as CL-MATH-01 for 40 concepts.

---

### CL-MATH-03 — Discrete Mathematics Blueprints
**Priority:** HIGH  
**Status:** 🟡 READY  
**Purpose:** Author 32 Teaching Blueprint Specifications for math.disc.  
**Deliverable:** 32 files: `docs/curriculum/blueprints/math.disc.*.md`  
**Estimated sessions:** 3  
**Acceptance criteria:** Same template, 32 concepts.

---

### CL-MATH-04 — Abstract Algebra Blueprints
**Priority:** MEDIUM  
**Status:** 🟡 READY (6 partial blueprints exist; complete remaining ~31)  
**Purpose:** Complete the Abstract Algebra domain to 37/37.  
**Deliverable:** Remaining math.abst.*.md files; 37 total when done.  
**Estimated sessions:** 3  
**Acceptance criteria:** 37 blueprints total; existing 6 verified against template.

---

### CL-MATH-05 — Real Analysis Blueprints
**Priority:** MEDIUM  
**Status:** 🟡 READY  
**Deliverable:** 30 files: `docs/curriculum/blueprints/math.real.*.md`  
**Estimated sessions:** 3

---

### CL-MATH-06 — Complex Analysis Blueprints
**Priority:** MEDIUM  
**Status:** 🟡 READY  
**Deliverable:** 31 files: `docs/curriculum/blueprints/math.cx.*.md`  
**Estimated sessions:** 3

---

### CL-MATH-07 — Topology Blueprints
**Priority:** MEDIUM  
**Status:** 🟡 READY  
**Deliverable:** 23 files: `docs/curriculum/blueprints/math.top.*.md`  
**Estimated sessions:** 2

---

### CL-MATH-08 — Measure Theory Blueprints
**Priority:** MEDIUM  
**Status:** 🟡 READY  
**Deliverable:** 13 files: `docs/curriculum/blueprints/math.meas.*.md`  
**Estimated sessions:** 2

---

### CL-MATH-09 — Functional Analysis Blueprints
**Priority:** MEDIUM  
**Status:** 🟡 READY  
**Deliverable:** 18 files: `docs/curriculum/blueprints/math.fnal.*.md`  
**Estimated sessions:** 2

---

### CL-MATH-10 — Numerical Analysis Blueprints
**Priority:** MEDIUM  
**Status:** 🟡 READY  
**Deliverable:** 16 files: `docs/curriculum/blueprints/math.num.*.md`  
**Estimated sessions:** 2

---

### CL-MATH-11 — Optimization Blueprints
**Priority:** MEDIUM  
**Status:** 🟡 READY  
**Deliverable:** 16 files: `docs/curriculum/blueprints/math.opt.*.md`  
**Estimated sessions:** 2

---

### CL-MATH-12 — Graph Theory Blueprints
**Priority:** MEDIUM  
**Status:** 🟡 READY  
**Deliverable:** 16 files: `docs/curriculum/blueprints/math.graph.*.md`  
**Estimated sessions:** 2

---

### CL-MATH-13 — Category Theory Blueprints
**Priority:** LOW  
**Status:** 🟡 READY  
**Deliverable:** 15 files: `docs/curriculum/blueprints/math.cat.*.md`  
**Estimated sessions:** 2

---

## 3B — Chemistry Blueprints (186 concepts, 0 done)

| Task ID | Domain | Concepts Approx | Status |
|---|---|---|---|
| CL-CHEM-01 | Atomic Structure & Periodicity | ~30 | 🟡 READY |
| CL-CHEM-02 | Chemical Bonding | ~28 | 🟡 READY |
| CL-CHEM-03 | Stoichiometry & Reactions | ~25 | 🟡 READY |
| CL-CHEM-04 | Thermodynamics & Thermochemistry | ~22 | 🟡 READY |
| CL-CHEM-05 | Kinetics | ~18 | 🟡 READY |
| CL-CHEM-06 | Equilibrium & Acid-Base | ~22 | 🟡 READY |
| CL-CHEM-07 | Electrochemistry | ~15 | 🟡 READY |
| CL-CHEM-08 | Organic Chemistry | ~26 | 🟡 READY |

*Exact domain boundaries to be determined by reading `docs/chemistry/kg/graph.json`  
at session start. Total: 186 concepts.*

**Per-domain acceptance criteria:** Same 16-section template; topological order;  
PACKAGE_READY signature; CURRICULUM_PROGRESS.md (or equivalent chemistry tracker) updated.

**Total estimated sessions for chemistry:** 16

---

## 3C — Computer Science Blueprints (119 concepts, 0 done)

| Task ID | Domain | Concepts Approx | Status |
|---|---|---|---|
| CL-CS-01 | Foundations & Computation Theory | ~20 | 🟡 READY |
| CL-CS-02 | Data Structures | ~25 | 🟡 READY |
| CL-CS-03 | Algorithms | ~28 | 🟡 READY |
| CL-CS-04 | Systems & Architecture | ~18 | 🟡 READY |
| CL-CS-05 | Programming Paradigms | ~15 | 🟡 READY |
| CL-CS-06 | Networking & Security | ~13 | 🟡 READY |

*Exact domain boundaries from `docs/computer-science/kg/graph.json`.*

**Total estimated sessions for CS:** 10

---

## 3D — Biology Blueprints (89 concepts, 0 done)

| Task ID | Domain | Concepts Approx | Status |
|---|---|---|---|
| CL-BIO-01 | Cell Biology | ~20 | 🟡 READY |
| CL-BIO-02 | Genetics & Molecular Biology | ~22 | 🟡 READY |
| CL-BIO-03 | Evolution & Ecology | ~18 | 🟡 READY |
| CL-BIO-04 | Physiology & Systems | ~16 | 🟡 READY |
| CL-BIO-05 | Biochemistry | ~13 | 🟡 READY |

*Exact domain boundaries from `docs/biology/kg/graph.json`.*

**Total estimated sessions for biology:** 8

---

## 3E — English Blueprints (214 remaining of 216)

| Task ID | Domain | Concepts Approx | Status |
|---|---|---|---|
| CL-ENG-01 | Phonics & Phonemic Awareness | ~18 (2 partial) | 🟡 READY |
| CL-ENG-02 | Vocabulary & Morphology | ~22 | 🟡 READY |
| CL-ENG-03 | Grammar & Syntax | ~28 | 🟡 READY |
| CL-ENG-04 | Reading Comprehension | ~24 | 🟡 READY |
| CL-ENG-05 | Writing | ~26 | 🟡 READY |
| CL-ENG-06 | Literature & Critical Analysis | ~22 | 🟡 READY |
| CL-ENG-07 | Speaking & Listening | ~20 | 🟡 READY |
| CL-ENG-08 | Language & Communication | ~18 | 🟡 READY |
| CL-ENG-09 | Research & Academic Skills | ~16 | 🟡 READY |
| CL-ENG-10 | Media & Digital Literacy | ~14 | 🟡 READY |
| CL-ENG-11 | English Language (EAL) | ~10 | 🟡 READY |
| CL-ENG-12 | Creative Writing | ~12 | 🟡 READY |

*Exact domain boundaries and concept ordering from `docs/english/kg/graph.json` (216 concepts, 12 domains).*  
*Note: English KG is not yet registered in runtime (EB-01). Blueprints can be authored independently.*

**Total estimated sessions for English:** 18

---

## 3F — Teaching Content Sub-Libraries

*These are NOT separate files — they are named sections within each blueprint.  
They are listed here as quality-assurance checklists for blueprint review.*

### CL-LIB-01 — Explanation Library Quality Standard
Each blueprint must contain three explanations (A: intuitive/concrete, B: mathematical/formal, C: historical/discovery).  
**Acceptance criteria per blueprint:**  
- Explanation A uses a sensory or everyday-life anchor  
- Explanation B includes at least one derived equation or worked derivation  
- Explanation C names a real historical figure, date, or experiment

### CL-LIB-02 — Analogy Library Quality Standard
Each blueprint must contain: primary analogy, breaking point (where the analogy fails), anti-analogy (what it is NOT).  
**Acceptance criteria:**  
- Breaking point explicitly names the failure condition  
- Anti-analogy uses a commonly confused alternative and explains why it fails

### CL-LIB-03 — Misconception Library Quality Standard
Each blueprint must contain 4 misconceptions × 6 fields each.  
**6 required fields:** probe question, characteristic phrase, trigger, conflict evidence (P28), bridge (P30), replacement concept (P31), discrimination pairs (P33), S6 repair path.  
**Acceptance criteria:**  
- Probe questions are open-ended (not yes/no)  
- Characteristic phrases are verbatim student language, not paraphrase  
- Conflict evidence cites a specific measurable fact

### CL-LIB-04 — Assessment Library Quality Standard
Each blueprint must contain: mastery gate statement, 4 formative assessments with expected answers and thresholds, confidence calibration protocol, delayed retrieval prompt.  
**Acceptance criteria:**  
- FA questions are non-trivial (cannot be answered by pattern-matching without understanding)  
- Expected answers are specific (not "student understands X")  
- Delayed retrieval is scheduled to a specific number of days out

### CL-LIB-05 — Discovery Lesson Quality Standard
Each blueprint must contain a 5-step inquiry-based lesson.  
**Acceptance criteria:**  
- Step 1 activates prior knowledge without giving away the new concept  
- Steps progress from observation → pattern → explanation → formalisation → open question  
- Timings sum to approximately 50 minutes

### CL-LIB-06 — Transfer Map Quality Standard
Each blueprint must contain near transfer, far transfer, and structural abstraction.  
**Acceptance criteria:**  
- Near transfer: same domain, different surface feature  
- Far transfer: different domain, same underlying structure  
- Structural abstraction: one sentence naming the general principle abstracted from the concept

---

---

# GROUP 4 — VOICE

*Teaching in spoken form. Requires the blueprint library as its primary input.*

---

### VO-01 — Voice Script Template Design
**Priority:** MEDIUM  
**Status:** 🟡 READY  
**Purpose:** Define the canonical structure for a spoken-word teaching script derived  
from a blueprint. A voice script is NOT the same as Section 10 (Voice Teaching) —  
it is a standalone deliverable formatted for text-to-speech or human narration.

**Deliverable:**  
- `docs/curriculum/voice/VOICE_SCRIPT_TEMPLATE.md`: template with fields  
  (Opening hook, Concept spine narration, CPA progression narration, Misconception warning,  
  Assessment check, Closing summary)  
- Spec for timing targets (each script ≤ 8 minutes at 150 words/minute)

**Estimated sessions:** 1  
**Acceptance criteria:**  
- Template is implementable without re-reading the full blueprint  
- Timing formula is documented  
- One worked example voice script for an existing physics concept

---

### VO-02 — Voice Script Production: Physics (194 concepts)
**Priority:** LOW  
**Status:** 🟡 READY (blueprints complete)  
**Dependencies:** VO-01  
**Purpose:** Generate voice scripts for all 194 physics concepts from their blueprints.  
**Deliverable:** 194 files in `docs/curriculum/voice/phys.*.md`  
**Estimated sessions:** 20 (≈ 10 scripts per session)

---

### VO-03 — Voice Script Production: Mathematics (908 concepts)
**Priority:** LOW  
**Status:** Blocked on CL-MATH-01 through CL-MATH-13  
**Dependencies:** VO-01, all math blueprints  
**Estimated sessions:** 91

---

### VO-04 — Voice Delivery Integration
**Priority:** LOW  
**Status:** 🔴 BLOCKED-G2  
**Purpose:** Wire voice scripts into the chat route so the AI response optionally  
includes a narration mode (structured for TTS output).

**Deliverable:**  
- Chat route: `responseFormat=voice` parameter produces TTS-optimised output  
- Pulls from pre-authored voice scripts when available; falls back to generated narration

**Estimated sessions:** 1

---

---

# GROUP 5 — EVIDENCE

*Runtime evidence collection and quality measurement. Tied to ADR 13.*

---

### EV-01 — Evidence Schema Finalisation
**Priority:** HIGH  
**Status:** 🔴 BLOCKED-G2  
**Dependencies:** EB-04 (appendEvidenceEvent wired)  
**Purpose:** Finalise the canonical evidence schema and ensure all six evidence categories  
(correct response, incorrect response, hint requested, explanation revisited, misconception  
probe triggered, session abandoned) are correctly classified at the call site.

**Deliverable:**  
- `src/lib/evidence/categories.ts`: six category constants, classification logic  
- Verify call site in chat route uses correct category per event type

**Estimated sessions:** 1

---

### EV-02 — Misconception Prevalence Dashboard
**Priority:** LOW  
**Status:** 🔴 BLOCKED-G2  
**Dependencies:** EB-15  
**Purpose:** Admin dashboard showing `MisconceptionPrevalence` aggregates:  
which misconceptions are most common per concept, per subject, and overall.

**Deliverable:**  
- Admin API endpoint: `GET /api/admin/evidence/misconceptions`  
- Simple table UI on `/admin` showing top-20 misconceptions by prevalence

**Estimated sessions:** 1

---

### EV-03 — Asset Effectiveness Dashboard
**Priority:** LOW  
**Status:** 🔴 BLOCKED-G2  
**Dependencies:** EB-15  
**Purpose:** Admin view of `StrategyEffectivenessScore` and `EbAssetScore` by concept.

**Deliverable:**  
- Admin API endpoint: `GET /api/admin/evidence/assets`  
- Table showing asset slug, strategy type, outcome rate, confidence interval

**Estimated sessions:** 1

---

---

# GROUP 6 — QA

*Quality assurance, testing, and CI.*

---

### QA-01 — CI Ratchet Baseline Capture
**Priority:** HIGH  
**Status:** 🟡 READY  
*See RI-04 — same task, listed here for cross-reference.*

---

### QA-02 — Vitest Suite Replica Drift Fix
**Priority:** MEDIUM  
**Status:** 🟡 READY  
**Purpose:** The existing 39-file vitest suite tests pure replicas of LLM-adjacent logic  
(not the real modules). For each replica test, either (a) repoint the import to the real  
module if safe, or (b) add a comment documenting why the replica is intentional and add  
a contract test against the real module.

**Deliverable:**  
- Audit of all 39 test files classifying each as `replica` or `direct`  
- Direct tests where safe to convert  
- Documented rationale for remaining replicas

**Estimated sessions:** 1

---

### QA-03 — Tier 2 Test Suite (15 fixtures)
**Priority:** HIGH  
**Status:** 🔴 BLOCKED-G2  
*See RI-03 — same deliverable.*

---

### QA-04 — KG Validator 6-Subject Smoke Test
**Priority:** HIGH  
**Status:** 🟢 DONE (CI workflow exists; all 6 KGs pass)  
*No further action required.*

---

### QA-05 — Blueprint Completeness Validator
**Priority:** MEDIUM  
**Status:** 🟡 READY  
**Purpose:** Script that validates every `.md` file in `docs/curriculum/blueprints/`  
has all 16 sections and ends with the PACKAGE_READY signature.

**Deliverable:**  
- `scripts/ci/validate-blueprints.sh`: counts sections 0–15, checks PACKAGE_READY line  
- Reports missing sections per file  
- Integrated into `.github/workflows/validate.yml`

**Estimated sessions:** 1  
**Acceptance criteria:**  
- Script runs in < 60 s on all 342 current blueprints  
- All current blueprints pass  
- CI fails on any new blueprint with a missing section

---

### QA-06 — Blueprint-KG Coverage Check
**Priority:** MEDIUM  
**Status:** 🟡 READY  
**Purpose:** Script that cross-references `docs/curriculum/blueprints/` against each  
subject's `kg/graph.json` and reports: concepts with blueprints, concepts without,  
blueprints with no matching KG concept.

**Deliverable:**  
- `scripts/ci/blueprint-coverage.sh`  
- Output: per-subject coverage percentage + list of missing concept IDs  
- Integrated into CI (informational, not blocking)

**Estimated sessions:** < 1

---

### QA-07 — End-to-End Session Replay Test
**Priority:** LOW  
**Status:** 🔴 BLOCKED-G2  
**Dependencies:** RI-01, RI-02, RI-03  
**Purpose:** Full session replay tests using the P10 transcript player over HTTP.  
Tier 3 tests per VALIDATION_FRAMEWORK_P10.md.

**Estimated sessions:** 2

---

---

# GROUP 7 — REVIEW

*Architecture review and governance milestones.*

---

### RV-01 — ADR 07 Equivalence-Validation Report
**Priority:** HIGH  
**Status:** 🟡 READY (no code gate — analysis only)  
**Dependencies:** None  
**Purpose:** Pre-requisite for EB-08 (W2-3). Compare mastery classification outputs of  
`learningProfile.ts` vs. canonical `MasteryLevel` across 20 representative learner states.

**Deliverable:**  
- `docs/architecture/ADR_07_EQUIVALENCE_VALIDATION_REPORT.md`  
- Table of 20 learner states × 2 classifications × divergence flag

**Estimated sessions:** 1

---

### RV-02 — Wave 1 Exit Gate Review
**Priority:** HIGH  
**Status:** Triggered after EB-02, EB-03, EB-04, EB-05, RI-01, RI-02 are all complete  
**Purpose:** Verify Wave 1 exit gate: tsc ratchet holds; vitest green; 6-subject KG validation green; zero behavior diff on fixture set.

**Deliverable:**  
- One-page review document confirming each exit criterion with evidence  
- Committed to `docs/architecture/WAVE_1_EXIT_GATE_REVIEW.md`

**Estimated sessions:** < 1

---

### RV-03 — Wave 2 Exit Gate Review
**Priority:** MEDIUM  
**Status:** Triggered after EB-06 through EB-10 complete  
**Purpose:** Verify Wave 2 exit gate: fixture 6 (R15) and fixture 12 (ADR 08) flip to PASS;  
Library-mode fixtures green; School-mode unaffected.

**Deliverable:** `docs/architecture/WAVE_2_EXIT_GATE_REVIEW.md`  
**Estimated sessions:** < 1

---

### RV-04 — Wave 3 Exit Gate Review (highest risk)
**Priority:** MEDIUM  
**Status:** Triggered after EB-11, EB-12  
**Purpose:** Confirm split-brain check — old and new mastery reads reconciled; no fixture regression.

**Deliverable:** `docs/architecture/WAVE_3_EXIT_GATE_REVIEW.md`  
**Estimated sessions:** < 1

---

### RV-05 — Wave 4 Exit Gate Review
**Priority:** MEDIUM  
**Status:** Triggered after EB-13 through EB-16  
**Purpose:** Confirm ADI measurably falls on replay corpus; served-asset turns byte-stable; a11yDescription on every served visual.

**Deliverable:** `docs/architecture/WAVE_4_EXIT_GATE_REVIEW.md`  
**Estimated sessions:** < 1

---

### RV-06 — Wave 5 Closure Review
**Priority:** LOW  
**Status:** Triggered after EB-17, EB-18, EB-19  
**Purpose:** Final implementation closure. Confirm all 21 checklist items resolved.

**Deliverable:** `docs/architecture/WAVE_5_CLOSURE_REVIEW.md`  
**Estimated sessions:** < 1

---

---

# GROUP 8 — DEPLOYMENT

*Infrastructure, release, and operational readiness.*

---

### DP-01 — Environment Variables Audit
**Priority:** HIGH  
**Status:** 🟡 READY  
**Purpose:** Audit all environment variables used in production vs. `.env.example`.  
Identify any variables that are used in code but undocumented.

**Deliverable:**  
- Updated `.env.example` with every used variable, a description, and whether it is required or optional  
- `docs/ENVIRONMENT_VARIABLES.md`: same content with security classification (secret vs. config)

**Estimated sessions:** < 1

---

### DP-02 — Database Migration Safety Playbook
**Priority:** HIGH  
**Status:** 🔴 BLOCKED-G2  
**Dependencies:** EB-03 (first schema change)  
**Purpose:** Before any `prisma db push` runs in production, document the safe migration  
procedure: backup strategy, rollback plan, zero-downtime procedure for additive changes.

**Deliverable:**  
- `docs/MIGRATION_PLAYBOOK.md`

**Estimated sessions:** < 1

---

### DP-03 — Production Readiness Checklist
**Priority:** MEDIUM  
**Status:** 🟡 READY  
**Purpose:** Define what "production-ready" means for the Educational Brain v1.0 implementation:  
Wave gate criteria, performance baselines, error-rate thresholds, rollback triggers.

**Deliverable:**  
- `docs/PRODUCTION_READINESS_CHECKLIST.md`

**Estimated sessions:** < 1

---

### DP-04 — Admin Panel: BrainConfig Read View
**Priority:** LOW  
**Status:** 🔴 BLOCKED-G2  
**Dependencies:** RI-06  
**Purpose:** Admin UI for inspecting the current BrainConfig policy values.

**Deliverable:**  
- `/admin/brain-config` page (read-only)

**Estimated sessions:** 1

---

---

# GROUP 9 — ANALYTICS

*Observability and learning analytics dashboards.*

---

### AN-01 — Learning Analytics Schema
**Priority:** MEDIUM  
**Status:** 🔴 BLOCKED-G2  
**Dependencies:** EB-03  
**Purpose:** Define the read model (views or materialised tables) that power the  
teacher/admin analytics dashboard: per-student mastery progress, concept coverage,  
time-on-task, misconception frequency.

**Deliverable:**  
- `docs/architecture/ANALYTICS_SCHEMA.md`  
- Prisma views or aggregation queries

**Estimated sessions:** 1

---

### AN-02 — Student Progress Dashboard (Teacher View)
**Priority:** MEDIUM  
**Status:** 🔴 BLOCKED-G2  
**Dependencies:** AN-01  
**Purpose:** Teacher-facing view: class roster, per-student mastery by concept, red-flag alerts  
for stuck learners.

**Deliverable:**  
- `/teacher/dashboard` page

**Estimated sessions:** 2

---

### AN-03 — Subject Coverage Analytics
**Priority:** LOW  
**Status:** 🟡 READY  
**Purpose:** Admin view showing blueprint coverage, KG status, and teaching-asset completion  
percentage per subject — drawn from `docs/CANONICAL_CURRICULUM_MANIFEST.json`.

**Deliverable:**  
- `/admin/curriculum` page reading the manifest  
- Auto-refreshes when manifest is updated

**Estimated sessions:** 1

---

### AN-04 — Session Quality Metrics
**Priority:** LOW  
**Status:** 🔴 BLOCKED-G2  
**Dependencies:** EB-15  
**Purpose:** Dashboard showing per-session evidence metrics: strategy distribution,  
hint rate, misconception probe trigger rate, session abandonment rate.

**Estimated sessions:** 1

---

---

# GROUP 10 — STUDENT EXPERIENCE

*Learner-facing features and UX improvements.*

---

### SE-01 — Concept Mastery Progress Indicator
**Priority:** HIGH  
**Status:** 🔴 BLOCKED-G2  
**Dependencies:** EB-08 (MasteryLevel extended to Library Mode)  
**Purpose:** Show learners their mastery level for the current concept (Novice / Developing /  
Proficient / Advanced) and progress toward the next level.

**Deliverable:**  
- Chat UI: mastery badge on the concept header  
- Progress bar showing evidence toward the next mastery level

**Estimated sessions:** 1

---

### SE-02 — Prerequisite Gap Warning
**Priority:** MEDIUM  
**Status:** 🔴 BLOCKED-G2  
**Dependencies:** RI-05 (prerequisiteRecovery Library extension)  
**Purpose:** When a learner starts a concept with unmet prerequisites, show a clear  
"You might want to cover X first" suggestion with a link.

**Deliverable:**  
- Chat route: prerequisite gap detection for Library Mode  
- UI: non-blocking suggestion card in the chat header

**Estimated sessions:** 1

---

### SE-03 — Spaced Repetition Queue
**Priority:** MEDIUM  
**Status:** 🔴 BLOCKED-G2  
**Dependencies:** EB-03, EB-08  
**Purpose:** Surface concepts due for review based on the delayed retrieval schedule  
(Section 13 of each blueprint defines the spaced-repetition schedule).

**Deliverable:**  
- Student dashboard: "Due for review today" section  
- Backend: scheduled job that queries `ConceptMasteryRecord` for due reviews

**Estimated sessions:** 2

---

### SE-04 — Misconception Feedback UI
**Priority:** MEDIUM  
**Status:** 🔴 BLOCKED-G2  
**Dependencies:** EB-04  
**Purpose:** When a misconception is detected (MC probe triggered), show the learner  
the bridge explanation and the discrimination pairs from the blueprint's Misconception Library.

**Deliverable:**  
- Chat response renderer: special "Misconception Alert" card with bridge + discrimination  
- Pulls from the blueprint's Section 4 content (initially static lookup; later from AssetIdentity)

**Estimated sessions:** 1

---

### SE-05 — Library Mode Subject Selection
**Priority:** HIGH  
**Status:** 🟡 READY  
**Purpose:** Let learners browse and select a subject for Library Mode, including the  
now-complete Physics subject and English (pending EB-01).

**Deliverable:**  
- Subject selection UI shows all 6 subjects  
- Physics displayed as fully available  
- English shows as available (after EB-01) or "coming soon" (before)

**Estimated sessions:** 1

---

### SE-06 — Concept Map Visualisation
**Priority:** LOW  
**Status:** 🟡 READY  
**Purpose:** Show learners a visual graph of concept prerequisites and their mastery state  
for the current subject.

**Deliverable:**  
- `/learn/map/[subject]` page: interactive D3 or SVG graph  
- Nodes coloured by mastery level  
- Click a node to start a session on that concept

**Estimated sessions:** 2

---

---

# SUMMARY COUNTS

| Group | Tasks | Ready Now | Gated | Done |
|---|---|---|---|---|
| 1. Educational Brain | 19 | 1 | 18 | 0 |
| 2. Runtime Integration | 6 | 2 | 4 | 0 |
| 3. Teaching Content Library | 39 domain tasks + 6 QA standards | 39 | 0 | Physics ✓ |
| 4. Voice | 4 | 1 | 3 | 0 |
| 5. Evidence | 3 | 0 | 3 | 0 |
| 6. QA | 7 | 3 | 3 | 1 |
| 7. Review | 6 | 1 | 5 | 0 |
| 8. Deployment | 4 | 2 | 2 | 0 |
| 9. Analytics | 4 | 1 | 3 | 0 |
| 10. Student Experience | 6 | 2 | 4 | 0 |

**Total blueprint sessions remaining:**
- Mathematics: 34 sessions (762 concepts)
- Chemistry: 16 sessions (186 concepts)
- Computer Science: 10 sessions (119 concepts)
- Biology: 8 sessions (89 concepts)
- English: 18 sessions (214 concepts)
- **Total: 86 sessions for the Teaching Content Library alone**

---

# RECOMMENDED START ORDER (next 5 tasks)

1. **CL-MATH-01** — Probability blueprints (49 concepts) — ready now, highest-priority content  
2. **QA-05** — Blueprint completeness validator — protects content quality, ready now  
3. **QA-06** — Blueprint-KG coverage check — ready now, <1 session  
4. **RI-04 / QA-01** — CI ratchet baseline capture — ready now, <1 session  
5. **RV-01** — ADR 07 equivalence-validation report — ready now, unblocks EB-08

---

*This document is the canonical execution roadmap. Update task statuses here as work completes.*  
*Do not implement any gated item without the corresponding checkbox checked in WAVE_0_APPROVAL_CHECKLIST.md.*
