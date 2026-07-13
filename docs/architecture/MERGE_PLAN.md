# MY TUTOR — PRE-MERGE AUDIT & MERGE PLAN

**Status:** PLANNING ONLY — no merge, no commits, no pushes executed.  
**Date:** 2026-07-13  
**Author:** Claude Code (pre-merge audit)  
**Approval required before any merge begins.**

---

## EXECUTIVE SUMMARY

| Metric | Count |
|---|---|
| Total differing files | 645 |
| Files only on math-linalg (KEEP ML) | 354 |
| Files only on physics-recovery (KEEP PR) | 210 |
| Files on both but different | 81 |
| **Of the 81 shared-different:** | |
| → KEEP math-linalg | 4 blueprint conflicts → ML wins |
| → KEEP physics-recovery | 0 |
| → MANUAL MERGE | 13 (route.ts, schema, CLAUDE.md, levels.ts, prisma.ts, engine.ts, knowledgeGraph.ts, subjectCatalog.ts, ADR_08, WAVE_0_APPROVAL_CHECKLIST, package.json, .env.example, docs/physics/kg/graph.json) |
| → AUTO MERGE (additive, no conflict) | 64 (UI pages, test files, shared docs) |
| → DROP | 0 (nothing is discarded; all content is preserved somewhere) |
| Merge risk | **HIGH on 4 files, MEDIUM on 9 files, LOW on remaining 72** |

---

## CANONICAL BRANCH

**`claude/math-linalg-curriculum-34wonr`** — this is the merge TARGET.  
**`claude/physics-blueprint-recovery-y97qth`** — this is the merge SOURCE.

The merge is: `git checkout claude/math-linalg-curriculum-34wonr && git merge claude/physics-blueprint-recovery-y97qth`

Common ancestor commit: `f152927` — `feat(math.linalg): complete Linear Algebra domain — 61/61 concepts, PASS`

---

## SECTION 1 — FILES ONLY ON MATH-LINALG (354 files → KEEP ML)

All 354 files are new additions on math-linalg that do not exist on physics-recovery. A merge brings them forward automatically with no conflict. Classification: **AUTO MERGE / KEEP ML**.

### 1A — Blueprint library (339 files)

All blueprint files in `docs/curriculum/blueprints/` that exist only on math-linalg. These are the authoritative Teaching Blueprint Specifications produced during the curriculum authoring campaign. They will arrive on the merged branch untouched.

**Physics blueprints (264 files):** `phys.astro.*` (6), `phys.em.*` (35), `phys.meas.*` (8), `phys.mech.*` (53), `phys.mod.*` (15), `phys.opt.*` (15), `phys.qm.*` (12), `phys.rel.*` (8), `phys.stat.*` (8), `phys.therm.*` (18), `phys.wave.*` (17), `phys.mech.collisions.md` (extra/orphaned, preserved as-is).

**Mathematics blueprints (72 files):** `math.abst.*` (6), `math.alg.*` (18), `math.arith.*` (17), `math.calc.*` (14), `math.cx.*` (3), `math.de.*` (1), `math.disc.counting-principles.md` (1), `math.found.*` (29), `math.func.*` (3), `math.geom.*` (18), `math.linalg.*` (8), `math.nt.*` (3), `math.prob.*` (10 — see below for the 4 conflicts), `math.seq.*` (5), `math.stats.*` (1), `math.trig.*` (5).

**English blueprints (2 files):** `eng.phonics.letter-sound-correspondence.md`, `eng.phonics.phonemic-awareness.md`.

**Risk:** NONE. These are new files with no counterpart on physics-recovery.

### 1B — Curriculum documentation (8 files)

| File | Classification | Risk |
|---|---|---|
| `docs/curriculum/BLUEPRINT_CLASSIFICATION_SCHEMA.md` | KEEP ML | NONE |
| `docs/curriculum/EDUCATIONAL_BRAIN_STABILIZATION_REPORT.md` | KEEP ML | NONE |
| `docs/curriculum/EDUCATIONAL_BRAIN_VALIDATION_REPORT.md` | KEEP ML | NONE |
| `docs/curriculum/PRIMITIVE_LIBRARY.md` | KEEP ML | NONE |
| `docs/curriculum/TEACHING_ASSET_PHILOSOPHY.md` | KEEP ML | NONE |
| `docs/curriculum/TEACHING_BLUEPRINT_SPECIFICATION.md` | KEEP ML | NONE |
| `docs/curriculum/TEACHING_COMPOSITION_GRAMMAR.md` | KEEP ML | NONE |
| `docs/curriculum/TIER1_MATHEMATICS.md` | KEEP ML | NONE |

### 1C — Architecture documentation (3 files)

| File | Classification | Risk |
|---|---|---|
| `docs/architecture/EDUCATIONAL_BRAIN_PRIMITIVE_ARCHITECTURE.md` | KEEP ML | NONE |
| `docs/architecture/PROJECT_TASK_BREAKDOWN.md` | KEEP ML | NONE |
| `docs/architecture/TEACHING_PRIMITIVE_ARCHITECTURE.md` | KEEP ML | NONE |

### 1D — Runtime code (1 file) — CRITICAL

| File | Type | Classification | Risk | Reasoning |
|---|---|---|---|---|
| `src/lib/curriculum/blueprintLoader.ts` | TypeScript module | **KEEP ML** | **HIGH** | This is the Phase 1C/1D/2 implementation — the blueprint content injection system. It does not exist on physics-recovery at all. Without it, the blueprint library has no runtime consumer. It must arrive via the merge with zero modification. |

### 1E — Other (3 files)

| File | Classification | Risk |
|---|---|---|
| `docs/THREE_SUBJECT_EDUCATIONAL_BRAIN_ROADMAP.md` | KEEP ML | NONE |
| `docs/mathematics/validation/DISC_VALIDATION_REPORT.md` | KEEP ML | NONE |
| `docs/curriculum/protocols/math.func.function-concept.md` | KEEP ML | NONE |

---

## SECTION 2 — FILES ONLY ON PHYSICS-RECOVERY (210 files → KEEP PR)

All 210 files are new additions on physics-recovery. A merge brings them forward automatically with no conflict. Classification: **AUTO MERGE / KEEP PR**.

### 2A — Educational Brain knowledge tree (137 files)

These are the authored knowledge documents from Deliveries 3–8 of the Educational Brain knowledge base. They exist only on physics-recovery and represent significant authored work.

| Directory | Files | Content |
|---|---|---|
| `educational-brain/assessment/` | 11 | Assessment Design Library (Delivery 3) |
| `educational-brain/concepts/` | 5 | Curriculum Integration Layer spec + 3 seed entries (Delivery 5) |
| `educational-brain/concepts/physics/` | 67 | Physics concept entries (phys.em.*, phys.meas.*, phys.mech.*, phys.opt.*, phys.therm.*, phys.wave.*) |
| `educational-brain/concepts/mathematics/` | 1 | math.arith.fractions seed entry |
| `educational-brain/concepts/english/` | 1 | eng.phonics.letter-sound-correspondence seed entry |
| `educational-brain/decision-engine/` | 9 | Teaching Decision Engine (Delivery 7) |
| `educational-brain/first-lesson/` | 9 | First Lesson Standard (Delivery 6) |
| `educational-brain/student-state/` | 11 | Student State Model (Delivery 8) |
| `educational-brain/README.md` | 1 | Root README |
| `educational-brain/mathematics/` | 3 | Math curriculum YAML files |

**Risk:** NONE. No counterpart on math-linalg.

### 2B — Runtime source code (51 files) — CRITICAL

These are substantial runtime additions on physics-recovery. They do not exist on math-linalg and must be preserved.

**Teaching assets pipeline — `src/lib/teaching/assets/` (15 files):**

| File | Purpose | Risk |
|---|---|---|
| `assetIdentity.ts` | ADR 14 AssetIdentity schema + family tables | HIGH — ties to new DB tables |
| `captureTracker.ts` | Rate-limits DRAFT captures per conceptId | MEDIUM |
| `explanationMemory.ts` | Captures DRAFT explanations after LLM generation | HIGH — wired into route.ts |
| `index.ts` | Barrel export for the pipeline | HIGH — route.ts imports from here |
| `lessonDecomposition.ts` | Decomposes LLM output into constituent assets | MEDIUM |
| `matcher.ts` | Pure confidence matcher for asset retrieval | HIGH — drives assembleLesson() |
| `pipeline.ts` | Orchestration entry point | HIGH |
| `probeExtraction.ts` | Extracts probe questions from generated content | MEDIUM |
| `ranking.ts` | Ranks candidate assets by confidence | MEDIUM |
| `repositoryStats.ts` | Stats endpoint helper | LOW |
| `similarity.ts` | Semantic similarity scoring | MEDIUM |
| `studentState.ts` | Builds StudentState from profile/session | HIGH — drives matcher |
| `teachingActionRepository.ts` | Captures teaching actions as DRAFT | HIGH |
| `validation.ts` | Asset content validation | MEDIUM |
| `versioning.ts` | Asset version management | MEDIUM |

**Evidence engine — `src/lib/teaching/evidence/` (1 file):**

| File | Purpose | Risk |
|---|---|---|
| `evidenceEngine.ts` | `appendEvidenceEvent()` + GradeBand/EvidenceCategory types | HIGH — imported in route.ts |

**Curriculum additions — `src/lib/curriculum/` (4 files):**

| File | Purpose | Risk |
|---|---|---|
| `libraryConceptResolver.ts` | Maps subject catalog slugs to canonical KG node IDs | HIGH — referenced in ADR_08 note |
| `placement.ts` | Level-appropriate curriculum entry point computation | HIGH — wired into /api/curriculum |
| `resolveCurriculumSource.ts` | Resolves which KG or catalog source to use per session | HIGH |
| `subjectRollout.ts` | Feature-flag gating per subject (`isEduBrainEnabled`) | HIGH — imported in route.ts |

**Auth additions — `src/lib/auth/` (3 files):**

| File | Purpose | Risk |
|---|---|---|
| `banGuard.ts` | Banned-user guard middleware | MEDIUM |
| `email.ts` | Email verification flow | MEDIUM |
| `resetToken.ts` | Password reset token management | MEDIUM |

**Other src additions (28 files):**

| File | Purpose | Risk |
|---|---|---|
| `src/lib/ai/coachSchema.ts` | Zod schema for coach API | LOW |
| `src/lib/lessonProgress.ts` | Lesson progress helper | MEDIUM |
| `src/lib/mastery/topicMasteryFormula.ts` | Mastery formula | MEDIUM |
| `src/lib/memory/sessionMemory.ts` | Session memory typed schema | HIGH |
| `src/lib/mistakeRecords.ts` | MistakeRecord helpers | MEDIUM |
| `src/lib/practiceSubmitSchema.ts` | Zod schema | LOW |
| `src/lib/quizSchema.ts` | Zod schema | LOW |
| `src/lib/registerSchema.ts` | Zod schema | LOW |
| `src/lib/school/adaptive/sessionRecommendationReconciler.ts` | ADR 11 reconciler | HIGH |
| `src/lib/schoolOnboardingGuard.ts` | Guard for school onboarding | MEDIUM |
| `src/lib/schoolOnboardingSchema.ts` | Zod schema | LOW |
| `src/lib/settingsSchema.ts` | Zod schema | LOW |
| `src/lib/text/ipaSanitizer.ts` | IPA notation sanitizer for contentRegister | HIGH — imported in route.ts |
| `src/app/api/admin/knowledge-assets/route.ts` | Admin review endpoint (approve/reject assets) | HIGH |
| `src/app/api/admin/knowledge-assets/report/route.ts` | Admin asset stats report | MEDIUM |
| `src/app/api/admin/test-email/route.ts` | Admin email test endpoint | LOW |
| `src/app/api/curriculum/bookmark/route.ts` | Lesson bookmark API | MEDIUM |
| `src/app/api/study-time/today/route.ts` | Study time tracker | LOW |
| `src/components/admin/TestEmailPanel.tsx` | Admin UI panel | LOW |
| `src/tests/` (9 new files) | New unit tests | MEDIUM |

**Risk:** NONE for file preservation (no counterpart on math-linalg). HIGH for integration after merge — these files import from each other and from route.ts, which has conflicts (see Section 4).

### 2C — E2E testing (3 files)

| File | Classification | Risk |
|---|---|---|
| `e2e/README.md` | KEEP PR | NONE |
| `e2e/learn-window.spec.ts` | KEEP PR | NONE |
| `e2e/seed-test-user.ts` | KEEP PR | NONE |
| `playwright.config.ts` | KEEP PR | NONE |

### 2D — Blueprint files authored today (2 files) — SPECIAL CASE

| File | Classification | Risk | Reasoning |
|---|---|---|---|
| `docs/curriculum/blueprints/math.prob.classical-probability.md` | **KEEP PR (pending rewrite)** | MEDIUM | Unique content — does not exist on math-linalg. However, it was authored in 16-section new-format while all other math.prob.* blueprints on math-linalg use Component-format. Content is educationally valid. **Must be rewritten into Component-format** before or after merge to match the library standard. |
| `docs/curriculum/blueprints/math.prob.combinatorial-probability.md` | **KEEP PR (pending rewrite)** | MEDIUM | Same situation as above. Unique content. Must be rewritten into Component-format. |

### 2E — Mathematics domain manifests and chapter docs (28 files)

| Directory | Files | Classification | Risk | Reasoning |
|---|---|---|---|---|
| `docs/mathematics/chapters/` (9 files) | cat.md, cx.md, fnal.md, graph.md, meas.md, num.md, opt.md, real.md, top.md | KEEP PR | LOW | Chapter summaries for domains not yet documented on math-linalg. Additive. |
| `docs/mathematics/domains/` (19 files) | manifests + summaries + validation reports for math.cat, math.cx, math.disc, math.fnal, math.graph, math.meas, math.num, math.opt, math.real, math.top | KEEP PR | LOW | Domain manifests from the curriculum pipeline. Additive. |
| `docs/mathematics/validation/` (4 files) | CX, GRAPH, MEAS, NUM, FNAL validation reports | KEEP PR | LOW | Additive. |

### 2F — Scripts (4 files)

| File | Classification | Risk |
|---|---|---|
| `scripts/test-physics-lagrangian-smoke.ts` | KEEP PR | LOW |
| `scripts/test-physics-qm-advanced-smoke.ts` | KEEP PR | LOW |
| `scripts/test-physics-stat-advanced-smoke.ts` | KEEP PR | LOW |
| `scripts/verify-phase2-library-progression.ts` | KEEP PR | LOW |

### 2G — Database migration (1 file)

| File | Classification | Risk | Reasoning |
|---|---|---|---|
| `prisma/migrations/20260707120000_sync_untracked_schema_drift/migration.sql` | **KEEP PR** | **HIGH** | This migration creates all the new Eb* and ADR 14 tables at the DB layer. It does not exist on math-linalg. After merge, this migration file arrives and must be deployed via `prisma migrate deploy` to sync production. The schema itself is covered in Section 4 (prisma/schema.prisma manual merge). |

---

## SECTION 3 — FILES ON BOTH BRANCHES BUT DIFFERENT (81 files)

### 3A — FOUR BLUEPRINT CONFLICTS → KEEP MATH-LINALG

These 4 files exist on both branches with incompatible content. The math-linalg versions are richer, longer, and use the established Component-format for the math.prob.* library.

| File | ML Lines / Format | PR Lines / Format | Unique educational content on PR? | Decision |
|---|---|---|---|---|
| `docs/curriculum/blueprints/math.prob.sample-space.md` | 384 lines, Component-format with full TA-A01–A05 probe set, MAMR routing, P76 mode | 186 lines, 16-section new-format authored today | No — PR version covers the same content with less depth | **KEEP ML** |
| `docs/curriculum/blueprints/math.prob.event.md` | 321 lines, Component-format | 196 lines, 16-section new-format | No — PR covers the same concepts less deeply | **KEEP ML** |
| `docs/curriculum/blueprints/math.prob.probability-axioms.md` | 565 lines, Component-format with full TA sequence | 204 lines, 16-section new-format | No — PR covers the same axioms and theorems less deeply | **KEEP ML** |
| `docs/curriculum/blueprints/math.prob.probability-measure.md` | 516 lines, Component-format | 205 lines, 16-section new-format | No — same concept, less depth | **KEEP ML** |

**Merge instruction:** During conflict resolution on these 4 files, accept the math-linalg version unconditionally (`git checkout origin/claude/math-linalg-curriculum-34wonr -- <file>`). The PR versions carry no unique educational content that is not already present in greater depth on math-linalg.

**Format note:** The PR versions were authored in 16-section new-format before discovering that math-linalg uses Component-format for all math.prob.* blueprints. The ML Component-format versions are the library standard and should survive.

---

### 3B — MANUAL MERGE FILES (13 files)

These files exist on both branches with substantive differences from both sides that must be preserved. A naive "accept one side" resolution would lose real work.

---

#### `src/app/api/learn/chat/route.ts` — MANUAL MERGE — RISK: CRITICAL

**The most complex merge in the repository.**

| Feature | math-linalg (ML) | physics-recovery (PR) | Decision |
|---|---|---|---|
| Phase 1A: kgCurrentConceptId hoisting | ✅ Present | ❌ Absent | **KEEP — ML owns this** |
| Phase 1B: TAG + LessonComposer for Library Mode | ✅ Present | ❌ Absent | **KEEP — ML owns this** |
| Phase 1C: Blueprint Retrieval (`loadBlueprint`) | ✅ Present (line 1303) | ❌ Absent | **KEEP — ML owns this** |
| Phase 1D: Blueprint Content Injection (`buildBlueprintContextBlock`) | ✅ Present (line 1309) | ❌ Absent | **KEEP — ML owns this** |
| `activeConceptId = snapshotCurrentConceptId ?? kgCurrentConceptId` | ✅ Present (line 1292) | ❌ Absent | **KEEP — ML owns this** |
| Phase 1A snapshot persist (`kgCurrentConceptId → currentConceptNodeId`) | ✅ Present (line 1799) | ❌ Absent | **KEEP — ML owns this** |
| ADR 14 asset pipeline (`assembleLesson`, `ingestGeneratedLesson`) | ❌ Absent | ✅ Present | **MERGE — PR adds this** |
| Evidence Engine (`appendEvidenceEvent`) | ❌ Absent | ✅ Present | **MERGE — PR adds this** |
| IPA notation sanitizer (`stripIpaNotation`, `contentRegister`) | ❌ Absent | ✅ Present | **MERGE — PR adds this** |
| Lesson stage progress (W2-2, `snapshotLessonStageProgress`) | ❌ Absent | ✅ Present | **MERGE — PR adds this** |
| Session Recommendation Reconciler (`pendingSignals`) | ❌ Absent | ✅ Present | **MERGE — PR adds this** |
| `resolvedConceptId` (Explanation Memory concept ID tracking) | ❌ Absent | ✅ Present | **MERGE — PR adds this** |
| `libraryConceptNodeIdHoisted` + `libraryLessonPlanHoisted` | ❌ Absent | ✅ Present | **MERGE — PR adds this** |
| `ebEnabled = isEduBrainEnabled(subjectCode)` | ❌ Absent | ✅ Present | **MERGE — PR adds this** |
| `subjectCatalog.ts` import (ML uses `libraryConceptResolver.ts`) | Different code path | Different code path | **VERIFY both paths** |

**Merge strategy:** Use math-linalg as the base. Surgically add the PR-only features into their correct position. The features are architecturally additive (they do not modify the Phase 1A–2 logic; they add the asset pipeline layer around it). The critical insertion points are:
1. **Imports block** (top of file): add `appendEvidenceEvent/GradeBand/EvidenceCategory`, `assembleLesson/buildStudentState/ingestGeneratedLesson/isExplanationMemoryEnabled/resolveContentRegister`, `stripIpaNotation`, `isEduBrainEnabled`.
2. **After snapshot read** (~line 75 ML): add `snapshotLessonStageProgress` parsing and `ebEnabled` computation.
3. **After `resolvedConceptId`** (ML has `resolvedConceptId` = null; PR tracks `currentLesson.topicSlug` into it): in the KG-backed lesson block on ML, `resolvedConceptId` needs to be set from `kgCurrentConceptId`.
4. **Before `buildTutorSystemPrompt`**: add `contentRegister = resolveContentRegister(...)` and pass it in.
5. **Hoisted variables** (~line 313 ML): add `lessonStageProgressHoisted`, `libraryConceptNodeIdHoisted`, `libraryLessonPlanHoisted`, `pendingSignals`.
6. **Library mode concept tracking block** (~line 1087 ML): `libraryConceptNodeIdHoisted` logic from PR.
7. **Before the LLM call**: add `assembleLesson(memoryState)` check.
8. **After the LLM response** (persist stage): add `ingestGeneratedLesson()`, `appendEvidenceEvent()`, lesson stage continuity persist.
9. **Signal injection** (weak topics / narrative / daily plan): add `pendingSignals` reconciler path.

**Risk:** CRITICAL. This file is 2068 lines (PR) and 1892 lines (ML). A merge conflict here will be large. Manual line-by-line reconciliation is required. No automated resolution.

---

#### `prisma/schema.prisma` — MANUAL MERGE — RISK: HIGH

**Tables only on math-linalg:** None (all ML tables also exist on PR).

**Tables only on physics-recovery (must be added to ML):**

| Table | Purpose | Action |
|---|---|---|
| `LessonBookmark` | Lesson bookmarking feature | ADD |
| `ConceptMasteryRecord` | ADR 10 mastery tracking with decay | ADD |
| `MasteryLevel` enum | Canonical mastery levels (NOT_STARTED → MASTERED) | ADD |
| `BrainConfig` | ADR 10 versioned policy store | ADD |
| `MisconceptionStatus` enum | DOMINANT / UNDER_LOAD / RESIDUAL / DORMANT_VERIFIED | ADD |
| `ActiveMisconception` | ADR 10 live misconception ledger | ADD |
| `AssetFamily` enum | EXPLANATION / VISUAL / PROBE | ADD |
| `AuthorKind` enum | HUMAN_CURATOR / AI_AUTHORED / etc. | ADD |
| `AssetStatus` enum | DRAFT / REVIEW / ACTIVE / DEPRECATED / RETIRED | ADD |
| `GradeBand` enum | k_5 / g_6_8 / g_9_10 / g_11_12 / undergrad / postgrad | ADD |
| `ExplanationStyle` enum | ANALOGY / FORMAL / CONCRETE / etc. | ADD |
| `ProbeDifficulty` enum | EASY / MEDIUM / HARD | ADD |
| `VisualRenderer` enum | Renderer types | ADD |
| `EvidenceCategory` enum | PROBE_RESPONSE / etc. | ADD |
| `AssetIdentity` | ADR 14 central asset table | ADD |
| `ExplanationAsset` | ADR 14 explanation family | ADD |
| `VisualAsset` | ADR 14 visual family | ADD |
| `ProbeAsset` | ADR 14 probe family | ADD |
| `EvidenceEvent` | ADR 13 evidence log | ADD |

**Tables on both (no schema changes expected, verify):** All ~90 existing Eb* and core tables.

**Changes to existing table relations on PR:** `User` model gains `conceptMasteryRecords`, `activeMisconceptions`, `lessonBookmarks` relations.

**Proposed union schema:** Accept PR's `schema.prisma` as the merge winner — it is a strict superset of ML's schema (all ML tables exist on PR plus 9 new tables). The migration file `20260707120000_sync_untracked_schema_drift/migration.sql` (PR-only) covers the new tables and must arrive with the schema.

**Merge instruction:** Accept the physics-recovery version of `prisma/schema.prisma` unconditionally during merge resolution. It is a verified superset.

---

#### `CLAUDE.md` — MANUAL MERGE — RISK: MEDIUM

**What physics-recovery adds (not on math-linalg):**
- Full "Workflow preference (ALWAYS follow)" section (updated 2026-07-07)
- Full "Permanent Research Workflow (RETIRED 2026-07-07)" section with override note
- Multiple Architecture facts updates (subjectRollout.ts, libraryConceptResolver.ts, placement.ts, English KG registration, ADR 14 implementation details, loop iteration 8 and 9)
- WAVE_0_APPROVAL_CHECKLIST updates (W1-3, W1-4, W4-1, W4-3 marked done)

**What math-linalg adds (not on physics-recovery):**
- The Phase 1A/1B/1C/1D/2 implementation facts in Architecture facts section
- PROJECT_TASK_BREAKDOWN.md reference
- Blueprint Specification facts

**Merge instruction:** Manual merge. Use PR as base (it has the more recent workflow preferences). Surgically add the ML-specific facts about Phases 1A–2 blueprint injection, blueprintLoader.ts, and PROJECT_TASK_BREAKDOWN.md into the Architecture facts section.

**Risk:** MEDIUM. The sections added by each branch are distinct; interleaving is required but there is no logical conflict.

---

#### `src/lib/curriculum/levels.ts` — MANUAL MERGE — RISK: MEDIUM

**ML adds:** `normalizeToCanonicalLevel()` function, `SkillLevel = CurriculumLevel` type alias, enriched JSDoc explaining the canonical level system, the `LEVEL_TO_INDEX` map in `engine.ts` (different file but related).

**PR has:** The base `CURRICULUM_LEVELS` and `CurriculumLevel` definitions (same values).

**Difference:** ML refactored the file — moved `SkillLevel` definition, added `normalizeToCanonicalLevel()`. PR has an earlier version of the same file.

**Merge instruction:** Accept ML version. It is a strict superset of PR's version — all PR content is present on ML with additions. `normalizeToCanonicalLevel()` is used by `engine.ts` (ML-only) so must be preserved.

---

#### `src/lib/db/prisma.ts` — MANUAL MERGE — RISK: MEDIUM

**PR adds:**
- Expanded `ENSURE_COLUMN_STATEMENTS` array (role enum + voiceSpeed column added to the auto-migrate block)
- Comment explaining the Supabase IPv4 production incident
- For-loop iteration over statements with individual try/catch per statement

**ML has:** Earlier version with single `$executeRaw` for country column only.

**Merge instruction:** Accept PR version. It is strictly more robust (per-statement error isolation, additional columns that prevent production login failures). PR version is a superset that fixes a confirmed production incident.

---

#### `src/lib/curriculum/knowledgeGraph.ts` — MANUAL MERGE — RISK: MEDIUM

**ML adds:** English KG registered in `SUBJECT_ADAPTERS` and `ID_PREFIX_TO_SUBJECT`; corrected physics count (216 vs 194) and chemistry count (186 vs 187); legacy `SCIENCE_KNOWLEDGE_GRAPH`/`ENGLISH_KNOWLEDGE_GRAPH` fallbacks removed from the comment.

**PR has:** Earlier version without English KG registration; 194 physics concepts listed.

**Physics KG count discrepancy note:** PR's `docs/physics/kg/graph.json` has 216 concepts; ML has 194. The KG was expanded on PR (see Section 3B physics KG entry below). After merge the 216-concept KG arrives and the knowledgeGraph.ts comment should read 216.

**Merge instruction:** Accept ML version as base, then verify the physics concept count in comments is updated to 216 after the physics KG file is merged from PR.

---

#### `src/lib/curriculum/engine.ts` — MANUAL MERGE — RISK: MEDIUM

**ML adds:** `normalizeToCanonicalLevel()` import from `levels.ts`; `modulesForLevelSpan()` import from `subjectCatalog.ts`; `LEVEL_TO_INDEX` map; `generateRoadmap()` now uses `levelIndex` to filter modules to the learner's level.

**PR has:** Earlier version that returns all modules regardless of level.

**Merge instruction:** Accept ML version. The ML change is additive (new imports, new local constant, one additional function call). It cannot conflict with anything PR adds since PR doesn't modify this file.

---

#### `src/lib/curriculum/subjectCatalog.ts` — MANUAL MERGE — RISK: LOW

**Difference:** ML uses `modulesForLevelSpan()` which is either added to or already in `subjectCatalog.ts`. Diff is 37 lines.

**Merge instruction:** Accept ML version. Check that `modulesForLevelSpan` and `LevelIndex` exports are present and consistent with `engine.ts`.

---

#### `docs/architecture/ADR_08_TEACHING_ACTION_INTELLIGENCE.md` — MANUAL MERGE — RISK: LOW

**PR adds:** Implementation detail note — "module.nodes[0]?.slug must NOT be used as the initial currentConceptNodeId — use resolveLibraryEntryConceptId() from libraryConceptResolver.ts instead."

**ML has:** Base ADR without this implementation note.

**Merge instruction:** Accept PR version. The added note is an important implementation correction that should be preserved.

---

#### `docs/architecture/WAVE_0_APPROVAL_CHECKLIST.md` — MANUAL MERGE — RISK: LOW

**PR changes:** W1-3 and W1-4 marked `[x]` (already implemented). W4-1 and W4-3 marked `[x]` with detailed approval notes.

**ML has:** All four items as `[ ]` (not yet checked).

**Merge instruction:** Accept PR version. The PR reflects actual implementation state (W1-3/W1-4 discovered-already-done, W4-1/W4-3 approved by user). ML version is stale relative to what was built.

---

#### `package.json` — MANUAL MERGE — RISK: LOW

**PR adds:** `"e2e:seed"` and `"e2e"` scripts.

**ML has:** `"test": "vitest run"` (no trailing comma on that last line in ML; PR adds comma + new scripts).

**Merge instruction:** Accept PR version. It is ML + two new scripts. No dependency version conflicts detected.

---

#### `.env.example` — MANUAL MERGE — RISK: LOW

**PR:** Updated for Supabase provider (IPv4 pooler instructions, new DATABASE_URL format, old Neon instructions demoted to comments).

**ML:** Earlier version targeting Neon only.

**Merge instruction:** Accept PR version. It adds Supabase as the primary provider (reflecting the actual production switch) and preserves Neon as a commented alternative. This is strictly more informative.

---

#### `docs/physics/kg/graph.json` — MANUAL MERGE — RISK: MEDIUM

**PR:** 216 physics concepts (version 1.0.0).  
**ML:** 194 physics concepts (version 1.0.0).

**What changed:** 22 new physics concepts added on physics-recovery (likely the phys.meas/mech domains that were expanded during the blueprint recovery campaign).

**Unique content:** The 22 additional concepts in PR are not present on ML at all.

**Merge instruction:** Accept PR version. It is the more complete KG. After merge, update the `knowledgeGraph.ts` comment from 194 to 216. Any blueprint files for these 22 new concepts should also exist on the merged branch (they are in the ML blueprint library or in the PR additions).

---

### 3C — AUTO MERGE — LOW RISK (64 files)

These files differ between branches but the changes are additive and non-conflicting. Git's 3-way merge should handle them automatically. Manual review recommended post-merge but not required pre-merge.

**UI / page files (13 files):**

| File | Nature of diff | Expected resolution |
|---|---|---|
| `src/app/admin/ops/page.tsx` | One side adds TestEmailPanel | AUTO |
| `src/app/admin/settings/page.tsx` | One side adds new settings section | AUTO |
| `src/app/auth/login/page.tsx` | Minor additions | AUTO |
| `src/app/auth/signup/page.tsx` | Minor additions | AUTO |
| `src/app/dashboard/page.tsx` | Minor additions | AUTO |
| `src/app/modes/ModesPicker.tsx` | Minor additions | AUTO |
| `src/app/page.tsx` | Minor additions | AUTO |
| `src/app/settings/page.tsx` | Minor additions | AUTO |
| `src/components/dashboard/v2/DashboardV2.tsx` | Dashboard additions | AUTO |
| `src/components/learn/LessonScreen.tsx` | Learn screen additions | AUTO |
| `src/components/onboarding/OnboardingWizard.tsx` | Onboarding additions | AUTO |
| `src/components/school/MarkChapterCompleteButton.tsx` | Minor | AUTO |
| `src/styles/tokens.css` | Token additions | AUTO |

**API route files (13 files) — additive changes on one or both sides:**

| File | Nature of diff | Expected resolution |
|---|---|---|
| `src/app/api/auth/forgot-password/route.ts` | Auth additions | AUTO |
| `src/app/api/auth/register/route.ts` | Register additions | AUTO |
| `src/app/api/auth/reset-password/route.ts` | Reset additions | AUTO |
| `src/app/api/coach/route.ts` | Coach additions | AUTO |
| `src/app/api/curriculum/progress/route.ts` | Progress additions | AUTO |
| `src/app/api/curriculum/route.ts` | Curriculum additions | AUTO |
| `src/app/api/flashcards/route.ts` | Flashcard additions | AUTO |
| `src/app/api/onboarding/route.ts` | Onboarding additions | AUTO |
| `src/app/api/practice/submit/route.ts` | Practice additions | AUTO |
| `src/app/api/quiz/generate/route.ts` | Quiz additions | AUTO |
| `src/app/api/school/assessment/submit/route.ts` | School assessment | AUTO |
| `src/app/api/school/mock/submit/route.ts` | School mock | AUTO |
| `src/app/api/school/progress/route.ts` | School progress | AUTO |
| `src/app/api/sessions/end/route.ts` | Session end | AUTO |
| `src/app/api/settings/route.ts` | Settings additions | AUTO |

**Library files (8 files):**

| File | Nature of diff | Expected resolution |
|---|---|---|
| `src/lib/ai/client.ts` | AI client additions | AUTO |
| `src/lib/auth/admin.ts` | Admin auth additions | AUTO |
| `src/lib/auth/config.ts` | Auth config additions | AUTO |
| `src/lib/dashboard/getDashboardV2Data.ts` | Dashboard additions | AUTO |
| `src/lib/email.ts` | Email lib additions | AUTO |
| `src/lib/i18n.ts` | i18n additions | AUTO |
| `src/lib/mastery/levels.ts` | Mastery levels additions | AUTO |
| `src/lib/school/adaptive/lessonComposer.ts` | Lesson composer additions | AUTO |
| `src/lib/school/adaptive/weakTopics.ts` | Weak topics additions | AUTO |
| `src/lib/subjects/getUserNavSubjects.ts` | Subject nav additions | AUTO |
| `src/lib/tts-cleaner.ts` | TTS cleaner additions | AUTO |
| `src/lib/xp.ts` | XP additions | AUTO |

**Test files (14 files) — both branches added tests to the existing suite:**

All 14 shared-but-different test files (`src/tests/adminAuthorization.test.ts`, `authEmail.test.ts`, `inputBounds.test.ts`, `masteryFormula.test.ts`, `mistakeRecord.test.ts`, `newStudentJourney.test.ts`, `progressAggregation.test.ts`, `recommendationEngine.test.ts`, `resetPassword.test.ts`, `roleEnforcement.test.ts`, `schoolOnboarding.test.ts`, `streakEngine.test.ts`, `topicProgress.test.ts`, `xpIdempotency.test.ts`).

Expected resolution: AUTO. Both branches extend existing tests; neither should delete tests the other adds.

**Generated/tracked docs (6 files):**

| File | Nature of diff | Expected resolution |
|---|---|---|
| `docs/CANONICAL_CURRICULUM_MANIFEST.json` | Updated checksums/counts | Accept PR (more recent) |
| `docs/CURRICULUM_PROGRESS.md` | Updated commit hash | Accept PR (more recent) |
| `docs/GLOBAL_PROGRESS.md` | Updated progress | Accept PR (more recent) |
| `docs/mathematics/CURRICULUM_PROGRESS.md` | Updated progress | Accept PR (more recent) |
| `docs/mathematics/MATHEMATICS_MANIFEST.json` | ML: 100% completion; PR: earlier state | **Accept ML** — ML shows 908/908 (100%), PR shows 572/908. |
| `docs/mathematics/chapters/disc.md` | Discrete chapter additions | AUTO |
| `docs/mathematics/domains/math.disc-manifest.json` | Disc manifest update | AUTO |
| `docs/mathematics/domains/math.prob-manifest.json` | Prob manifest update | AUTO |
| `docs/mathematics/teaching-assets/assets.json` | Teaching assets additions | AUTO |
| `scripts/pipeline/generate-mathematics-manifest.py` | Pipeline script update | AUTO |

---

## SECTION 4 — DATABASE: PRISMA SCHEMA UNION

### Tables only on math-linalg
*None.* All ML tables also exist on PR.

### Tables only on physics-recovery (must be added to merged branch)

| Table | New Enums Required | ADR Source |
|---|---|---|
| `LessonBookmark` | None | Bookmark feature |
| `ConceptMasteryRecord` | `MasteryLevel` (NOT_STARTED, INTRODUCED, DEVELOPING, PROFICIENT, MASTERED) | ADR 10 |
| `BrainConfig` | None | ADR 10 |
| `ActiveMisconception` | `MisconceptionStatus` (ACTIVE, REPAIR_IN_PROGRESS, REPAIRED, ESCALATED) | ADR 10 |
| `AssetIdentity` | `AssetFamily`, `AuthorKind`, `AssetStatus`, `GradeBand` | ADR 14 |
| `ExplanationAsset` | `ExplanationStyle` | ADR 14 |
| `VisualAsset` | `VisualRenderer` | ADR 14 |
| `ProbeAsset` | `ProbeDifficulty` | ADR 14 |
| `EvidenceEvent` | `EvidenceCategory` | ADR 13 |

### Tables on both (no changes required)
All ~90 shared Eb*, core application, and legacy tables. No structural differences detected between the two schema versions for these tables.

### Proposed union schema approach
Accept `prisma/schema.prisma` from physics-recovery as the merge winner. It is a strict superset (all ML tables + 9 new tables + new enums + 3 User relation additions). No ML-only table exists, so no content is lost.

### Post-merge database action required
Run `prisma migrate deploy` against production (or `prisma db push` for development) to create the 9 new tables. The migration file `20260707120000_sync_untracked_schema_drift/migration.sql` handles this and arrives via the merge automatically.

---

## SECTION 5 — ROUTE.TS FEATURE MATRIX

### `src/app/api/learn/chat/route.ts`

| Feature | In math-linalg | In physics-recovery | Decision |
|---|---|---|---|
| Phase 1A: kgCurrentConceptId hoisting for Library Mode | ✅ | ❌ | **KEEP** |
| Phase 1A: First-turn currentConceptNodeId snapshot persist | ✅ | ❌ | **KEEP** |
| Phase 1B: TAG + LessonComposer for KG-backed Library sessions | ✅ | ❌ | **KEEP** |
| Phase 1C: `loadBlueprint(activeConceptId)` — blueprint metadata retrieval | ✅ | ❌ | **KEEP** |
| Phase 1D: `loadBlueprintContent()` + `buildBlueprintContextBlock()` injection | ✅ | ❌ | **KEEP** |
| `activeConceptId = snapshotCurrentConceptId ?? kgCurrentConceptId` | ✅ | ❌ | **KEEP** |
| Phase 2: All 194 physics blueprints activated via Component-format parser | ✅ (via blueprintLoader.ts) | ❌ | **KEEP** |
| `assembleLesson()` — ADR 14 asset retrieval before LLM call | ❌ | ✅ | **MERGE** |
| `buildStudentState()` — student context for asset matcher | ❌ | ✅ | **MERGE** |
| `ingestGeneratedLesson()` — DRAFT capture after LLM response | ❌ | ✅ | **MERGE** |
| `isExplanationMemoryEnabled()` gate | ❌ | ✅ | **MERGE** |
| `appendEvidenceEvent()` — ADR 13 evidence logging | ❌ | ✅ | **MERGE** |
| `resolveContentRegister()` — beginner/standard content register | ❌ | ✅ | **MERGE** |
| `stripIpaNotation()` — IPA removal for non-phonics sessions | ❌ | ✅ | **MERGE** |
| `isEduBrainEnabled(subjectCode)` — per-subject feature gate | ❌ | ✅ | **MERGE** |
| `snapshotLessonStageProgress` — W2-2 lesson continuity reading | ❌ | ✅ | **MERGE** |
| `lessonStageProgressHoisted` — W2-2 lesson continuity writing | ❌ | ✅ | **MERGE** |
| `libraryConceptNodeIdHoisted` — Library Mode concept tracking | ❌ | ✅ | **MERGE** |
| `libraryLessonPlanHoisted` — Library Mode lesson plan tracking | ❌ | ✅ | **MERGE** |
| `resolvedConceptId` — Explanation Memory concept ID tracking | ❌ | ✅ | **MERGE** |
| Session Recommendation Reconciler (`pendingSignals`) — ADR 11 | ❌ | ✅ | **MERGE** |
| `ebEnabled` gate on asset capture | ❌ | ✅ | **MERGE** |
| NOTATION RULES contentRegister-gated block | ❌ | ✅ | **MERGE** |
| Phase 2F: Teaching Action Intelligence advisory | ✅ | ✅ | **SAME — no conflict** |
| Phase 3A: Teaching Action Generator | ✅ | ✅ | **SAME — no conflict** |
| Phase 3B: Dynamic Lesson Composer | ✅ | ✅ | **SAME — no conflict** |
| Phase 2H: Assessment intelligence | ✅ | ✅ | **SAME — no conflict** |
| Phase 4: Weak node recovery instruction | ✅ | ✅ | **SAME — no conflict** |
| Phase 6: Chapter node title objectives | ✅ | ✅ | **SAME — no conflict** |

**Features to REMOVE:** None. No feature present on either branch should be removed.

---

## SECTION 6 — MERGE RISK ASSESSMENT

### Risk Level Summary

| Risk Level | Files | Examples |
|---|---|---|
| CRITICAL | 1 | `src/app/api/learn/chat/route.ts` (2068 lines, 22 features to merge) |
| HIGH | 10 | `prisma/schema.prisma`, `src/lib/teaching/assets/*`, `src/lib/teaching/evidence/evidenceEngine.ts`, `blueprintLoader.ts` (preserve ML's version), `libraryConceptResolver.ts`, `subjectRollout.ts`, `prisma/migrations/20260707120000*` |
| MEDIUM | 9 | `CLAUDE.md`, `levels.ts`, `prisma.ts`, `engine.ts`, `knowledgeGraph.ts`, `docs/physics/kg/graph.json`, `src/lib/curriculum/resolveCurriculumSource.ts`, `src/lib/school/adaptive/sessionRecommendationReconciler.ts`, `src/lib/memory/sessionMemory.ts` |
| LOW | 61 | UI files, test files, doc files, scripts |

### Biggest Risks

1. **route.ts**: 22 features from two independent development tracks must be correctly interleaved. Any import order error, missing variable, or wrong insertion point will break the chat endpoint — the application's most critical path.

2. **Schema + migration**: The 9 new tables must arrive with their migration file. If the schema arrives without the migration being run, `prisma generate` will reference types that don't exist in the DB.

3. **blueprintLoader.ts preservation**: This file exists only on ML. If the merge is run with ML as source (incorrect), it will be lost. Confirmed: merge direction is PR INTO ML (ML is the checkout target), so blueprintLoader.ts is preserved.

4. **Physics KG count change (194 → 216)**: After merge, `knowledgeGraph.ts` comment needs updating. Blueprint coverage for the 22 new concepts must be verified.

---

## SECTION 7 — RECOMMENDED MERGE ORDER

After approval, execute in this sequence to minimize risk:

1. **Verify branch states:** Confirm both branches are at expected HEAD commits before any merge command.

2. **Checkout math-linalg:** `git checkout claude/math-linalg-curriculum-34wonr`

3. **Dry-run the merge:** `git merge --no-commit --no-ff claude/physics-blueprint-recovery-y97qth` to stage all conflicts without committing.

4. **Resolve in priority order:**
   a. `prisma/schema.prisma` — accept PR (superset schema)
   b. `docs/curriculum/blueprints/math.prob.{sample-space,event,probability-axioms,probability-measure}.md` — accept ML for all 4
   c. `src/app/api/learn/chat/route.ts` — manual surgical merge (highest risk — do this alone, no other changes in flight)
   d. `CLAUDE.md` — manual merge (use PR as base, add ML Phase 1A–2 facts)
   e. All remaining 9 MANUAL MERGE files — per-file instructions in Section 3B
   f. All AUTO MERGE files — accept git's resolution, spot-check

5. **Run `prisma generate`** to verify the merged schema is valid.

6. **Run `npx tsc --noEmit`** to catch any TypeScript errors from the merged codebase.

7. **Run `vitest`** — target: 630+ pass (the combined suite of both branches), 0 failures.

8. **Commit the merge** with a message documenting what was merged and the conflict resolutions applied.

9. **Push** to `claude/math-linalg-curriculum-34wonr`.

10. **Post-merge:** Rewrite `docs/curriculum/blueprints/math.prob.classical-probability.md` and `docs/curriculum/blueprints/math.prob.combinatorial-probability.md` from 16-section new-format into Component-format to match the rest of the math.prob.* library.

---

## SECTION 8 — BLUEPRINT CONTENT SAFETY SUMMARY

| Concern | Status |
|---|---|
| 329 math-linalg-only blueprints lost? | **NO** — all arrive via merge (KEEP ML section) |
| 194 physics blueprints (Component-format) lost? | **NO** — all on math-linalg, arrive via merge |
| 4 conflicting math.prob blueprints: ML versions survive? | **YES** — ML is richer (Component-format, 2–3× longer). PR versions have no unique content. |
| 2 new PR blueprints (classical-probability, combinatorial-probability) kept? | **YES** — these are added to the merged branch. Rewrite into Component-format required. |
| 67 educational-brain/concepts/physics/*.md entries kept? | **YES** — all arrive via merge (KEEP PR section) |
| Any blueprint with unique educational content dropped? | **NO** |

---

*Document complete. No code changes made. Awaiting approval to proceed with merge.*
