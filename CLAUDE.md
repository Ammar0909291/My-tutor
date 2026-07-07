# My Tutor — Project Memory

## Reporting preference (ALWAYS follow)
- After EVERY prompt/task — including non-coding tasks (audits, Q&A, memory updates) — ALWAYS
  produce a **detailed report** at the end of the turn.
- ALWAYS include **running instructions for the local computer** (install, env setup,
  `npx prisma db push`, `npm run dev`, `npm run build`, type-check) in that report when the task
  touched code; otherwise still close with a report summarizing what was done.
- ALWAYS deliver the report as a **single copy-able block of plain text** (a fenced code block),
  so it can be copied in one action. No exceptions. This means the ENTIRE end-of-turn report —
  not just code/commands inside it — goes inside one ``` fence. Markdown headers/tables/checklists
  outside a fence do NOT satisfy this; wrap the whole thing.

## Workflow preference (ALWAYS follow — updated 2026-07-07, supersedes the prior version below)
- On EVERY prompt: first read and understand it the way the lead developer on this project would
  — what it actually needs, what it touches, what's ambiguous or missing.
- Then decide yourself what to add or remove from the request as understood (scope corrections,
  missing pieces, unnecessary parts) — do NOT stop and ask the user via AskUserQuestion for this.
  State plainly, in one short block at the start of the reply, exactly what was redefined/applied.
- Then immediately start working (building) on the prompt as redefined — no waiting for a
  confirmation round on scope.
- This is a standing, explicit pre-authorization to proceed without a scope-confirmation pause —
  it does NOT extend to: (a) the Educational Brain G1/G2 governance gates elsewhere in this file
  (Canonical KG v1 freeze + explicit per-item approval before implementation — those still require
  real, separate user sign-off, no exceptions via this preference), or (b) genuinely risky/hard-to-
  reverse actions (force push, resets, destructive git ops, anything affecting shared/production
  state) — those still get flagged and confirmed first, per standing safety practice.
- Prior version (2026-07-07, superseded): propose additions/removals and WAIT for the user's
  answer before implementing. Replaced because it added a confirmation round-trip the user wants
  removed for ordinary scope decisions.

## Permanent Research Workflow (MANDATORY for every research/architecture/science task — added 2026-07-07)
- Scope: applies to research, architecture, and science-track prompts (the Master Teaching
  Science / Decision Science / architecture-review series) — distinct from ordinary build/dev
  tasks, which follow the Workflow preference above. This does NOT touch or loosen the
  Educational Brain G1/G2 production-code governance gate elsewhere in this file — a "final
  prompt" rewrite is a text-level improvement to a research question, never authorization to
  implement production code without separate, explicit per-item sign-off.
- Role for these tasks: not a prompt executor — Chief Architect / Chief Educational Scientist /
  Chief Learning Researcher / Chief Systems Thinker. Improve both the prompt and the project's
  architecture; never blindly execute a prompt that can be improved. Discover the best truth;
  don't defend prior design decisions just because they're prior.
- Before executing: critically analyze the prompt — missing areas, weak/incorrect/hidden
  assumptions, better ordering/terminology/scope, missing research questions, redundancy,
  anything deserving deeper investigation. Challenge it as a peer Chief Architect would; don't
  agree just because it was suggested.
- Produce a PROMPT IMPROVEMENTS section (Added / Removed / Modified / Unchanged, each with
  reasoning) before executing.
- Then show the FINAL PROMPT — the rewritten version incorporating every improvement. Don't pause
  for approval on this text-level rewrite; assume approval unless an improvement would
  fundamentally change the objective (flag that explicitly rather than silently substituting a
  different objective).
- Execute ONLY the final (improved) prompt, never the original once it's been improved. No
  permission-seeking language at all for this — not "may I proceed," not a soft narrated pause,
  not even a preamble framed as asking. State the final prompt and go straight to executing it.
- Once a FINAL PROMPT has been produced and executed for a given research topic (e.g. the Master
  Teacher Decision Science taxonomy), that becomes the canonical, latest version of the work. If
  the same or a near-identical prompt is sent again later, do not restart Step 1-2 from scratch —
  recognize it's already been through this improvement cycle, and either re-present the already-
  improved version or push it further with genuinely new discoveries, never regress to re-doing
  the same analysis or re-deriving an already-superseded flat/unmerged structure.
- Continuous discovery: keep questioning conclusions while researching; apply a better
  architecture/taxonomy/framework the moment it emerges, without waiting for a new prompt.
- Whenever research changes a conclusion from an earlier phase, produce an ARCHITECTURAL
  REVISIONS section: previous assumption, new discovery, why the old idea was incomplete, why the
  new one is better, impact on previous phases, whether previous documents need updating. Truth
  over consistency with prior phases.
- Reason, where appropriate, as a multidisciplinary panel (education, cognitive science,
  neuroscience, psychology, learning science, instructional design, curriculum design, human
  tutoring, linguistics, math/science education, AI, knowledge engineering, systems architecture,
  HCI) — let the disciplines disagree, then synthesize the strongest conclusion.
- Output quality: no filler; depth over length; one profound discovery beats fifty shallow
  observations; always surface Biggest Discovery, Biggest Weakness, Biggest Risk, Biggest
  Opportunity, and Biggest Architectural Improvement.
- Ultimate objective for this track: not completing tasks — discovering and designing the world's
  greatest AI teacher. Every research phase should permanently improve My Tutor's architecture;
  write every document as permanent research-library material, worth reading years later.

## Architecture facts
- Next.js 14 App Router, NextAuth v5 (JWT), Prisma + PostgreSQL (`db push`, no migration files).
- AI: Groq primary (`openai/gpt-oss-20b`), YandexGPT fallback (Russia only, `country === 'ru'`;
  itself falls back to Groq on missing credentials or any error). Redis optional (app runs without it).
- KnowledgeNode: `{ id, domain, title, description, difficulty, prerequisites[] }`.
  Misconception data is runtime (`MistakeRecord`), NOT in the static KG type.
- Admin gated by `ADMIN_EMAILS` env var (not a DB flag).
- Canonical Knowledge Graph subjects (generic adapter platform, `src/lib/curriculum/knowledgeGraph.ts`
  + `subjectKgAdapter.ts`, one `docs/{subject}/kg/graph.json` + 2 registry lines per subject, no new
  adapter/validator/Teaching Engine code per subject):
  - mathematics → `docs/mathematics/kg/graph.json` (908 concepts, prefix `math.`)
  - physics → `docs/physics/kg/graph.json` (194 concepts, prefix `phys.`)
  - chemistry → `docs/chemistry/kg/graph.json` (187 concepts, prefix `chem.`)
  - computer_science → `docs/computer-science/kg/graph.json` (119 concepts, prefix `cs.`)
  - biology → `docs/biology/kg/graph.json` (89 concepts, prefix `bio.`) — shipped 2026-06-29,
    see `docs/biology/VALIDATION_REPORT.md` for full validator/smoke-test/regression evidence
  - english → `docs/english/kg/graph.json` (216 concepts, 12 domains, prefix `eng.`) — authored by
    the Curriculum Production Pipeline 2026-07-03/04, validator PASS 216/216 reachable, but **NOT
    yet registered** in the runtime registry (`knowledgeGraph.ts` `SUBJECT_ADAPTERS`/
    `ID_PREFIX_TO_SUBJECT` have 5 subjects; `case 'english'` still routes to the legacy static
    `ENGLISH_KNOWLEDGE_GRAPH`). Registration is the standard 2-line change but is production code
    → gated on explicit user approval (Wave 0 approval item, recorded 2026-07-04).
  - Chemistry count correction (2026-07-04): 186 concepts per validator + dashboard (was
    recorded as 187 here).
  - Canonical 10-field schema only: `id, name, requires, unlocks, cross_links, difficulty, bloom,
    mastery_threshold, estimated_hours, description` — never add `domain`/`concept_type` to the
    JSON; they're derived at runtime by `inferDomain()`/`inferConceptType()`.
  - **Curriculum Production Pipeline status (read from repo 2026-07-04, commit d622336):**
    Mathematics KG **v1.0.1 status=frozen** (first subject to reach the freeze state ADR 06's
    gate checks); Physics teaching assets 100% (194/194), English 100% (216/216), Mathematics
    41.7% (379/908, 8/24 domains), Chemistry/Biology/CS not started. Campaign overall
    `1.0.0-draft`, `subjects_complete: 0` — the full Canonical Subject Freeze has NOT been
    declared, so implementation Wave 0 remains closed (and user approval is still required
    regardless). Authoritative dashboards: `docs/CURRICULUM_PROGRESS.md` (auto-generated),
    `docs/CANONICAL_CURRICULUM_MANIFEST.json` (includes per-KG sha256 + status). Pipeline asset
    format (`docs/{subject}/teaching-assets/assets.json`: concept-keyed, carries `provenance`,
    `status`, worked-example/assessment/visual blueprints) is compatible with ADR 14's
    AssetIdentity catalogue — it is a curated *source* for ADR 14 Phase 2 population, not a
    competing asset model.

## Educational Brain — architecture (frozen 2026-06-30, read before any teaching-decision work)
- **Authoritative reference (read this FIRST)**: `docs/architecture/EDUCATIONAL_BRAIN_BIBLE.md` —
  the single living master document (complete engine map, all flows, scalability/versioning/
  validation strategy, risk register, glossary, ADR index). Created 2026-06-30 as the top-level
  synthesis; every ADR from ADR 08 onward must update it. It indexes, and is backed by, the detail
  set: `EDUCATIONAL_BRAIN_V1.md`, `ENGINE_REFERENCE.md`, `DATA_FLOW.md`, `DEPENDENCY_RULES.md`,
  `EXTENSION_GUIDE.md`, `ARCHITECTURE_DECISIONS.md` — the full frozen architecture, 65-step
  chat-route data flow, per-engine contracts, and 15 permanent rules. Read the Bible first, then
  the detail doc named for whatever you're touching; extend this architecture, don't replace it.
- Canonical pipeline core (KG → Student Memory → `src/lib/teaching-engine/index.ts` `decide()` →
  Teaching Action Generator → Dynamic Lesson Composer) runs for **every** chat turn, school or
  general/Library. The `src/lib/school/adaptive/*` cluster splits in two by board/grade coupling
  (see `docs/architecture/ADR_02_GENERAL_LEARNER_DIAGNOSTIC_LAYER.md` for the function-by-function
  evidence): the synthesized 7-type teaching strategy (`teachingStrategy.getTeachingStrategy()`,
  itself folding in mastery, misconception confidence, concept transfer, confidence calibration,
  momentum, and stalemate detection) plus spaced revision now run for **both** school and
  general/Library sessions (`route.ts:294` school branch, `route.ts:964` Library branch, ADR 02,
  implemented 2026-06-30) — board/grade params on those functions are unused plumbing, verified by
  reading bodies. `nextBestAction`/`dailyPlan`/`examReadiness` remain school-only — they genuinely
  walk a board/grade curriculum syllabus tree with no Library equivalent. `lessonPlanner.buildLessonPlan()`
  also now runs for both (`route.ts` ~1019, ADR 02 §7 follow-up #1, implemented 2026-06-30) — it only
  reads `.id`/`.title` off each node, so a `CurriculumNode` satisfies it with a trivial inline mapping.
  `prerequisiteRecovery.detectPrerequisiteGap` remains school-only and is NOT a simple shape-reconciliation
  case: it resolves prerequisite ids through a module-global `KG_BY_ID` keyed on the canonical school KG
  only, which a Library subject's node slugs can never match — wiring it needs a signature change
  (caller-supplied corpus map) that touches the live school call site too, deferred (ADR 02 §7 item 1).
- One system is **archived/dormant, never executes against live traffic** — do not extend it
  expecting production effect: `src/lib/educationalBrain/*` (Eb* pipeline, fire-and-forget, gated
  by `ENABLE_EDUCATIONAL_BRAIN_PIPELINE`, default off, carries an archive-status header comment).
  `src/lib/curriculum/teachingActionEngine.ts` (a duplicate, zero-caller "HOW to teach" decision
  engine, confusingly similar to the live `src/lib/teaching-engine/index.ts`) was confirmed
  genuinely dead and **deleted 2026-06-30** — see `docs/architecture/ADR_03_RETIRE_ORPHANED_TEACHING_ACTION_ENGINE.md`.
  Its Teaching Assets Platform siblings (`teachingAssetSchema.ts`/`teachingAssetAdapter.ts`/
  `teachingAssets.ts`, real curriculum content for all 5 subjects) remain — still zero live
  importers, left untouched as an explicit open question, not this session's to decide.
- `src/lib/school/adaptive/nextBestAction.ts` is a split file: its namesake `getNextBestAction()`
  (5-tier engine), `nextActionHref()`, and its own `NEXT_ACTION_LABELS` export are confirmed
  zero-caller dead code (their one plausible consumer, `src/components/dashboard/SchoolDashboard.tsx`,
  is itself a confirmed-orphaned, unrendered component — the live `/dashboard` route renders
  `DashboardV2` instead, which sources recommendations via `learningOrchestrator.ts`). The file's
  fourth export, `getChapterNextStep()`, remains genuinely live (`route.ts`, the chapter workspace
  page) and must not be touched. A surgical-removal **proposal** (not executed, and per explicit
  user instruction will **stay unexecuted indefinitely** — documentation-only is the final state)
  is written up in `docs/architecture/ADR_04_NEXT_BEST_ACTION_RETIREMENT_PROPOSAL.md`.
- **Priority pivot (2026-06-30):** dead-code/duplication auditing (the ADR 03/04 pattern) is
  deprioritized. Current priority is forward-looking Educational Brain system design: Knowledge
  Graph consumption, Teaching Action Intelligence, Student Memory evolution, Dynamic Lesson
  Composition, Evidence Engine, Recommendation Intelligence, Mastery Engine, Visualization
  selection, Simulation architecture, Assessment architecture, Beginner→Intermediate→Expert
  progression, entrance examination framework, curriculum mapping architecture, AI independence
  strategy, long-term scalability. Don't propose/execute further cleanup unless it blocks one of
  these. First finding under this pivot: two of the canonical KG's 10 authored fields
  (`cross_links`, `mastery_threshold`) are parsed by `subjectKgAdapter.ts` but never exposed past
  it — neither `ConceptNode` nor `KnowledgeNode` carries them, and `mastery_threshold` (which
  varies 0.35–0.95 across mathematics's 908 concepts) has zero runtime effect because every
  scoring engine reads the flat `ASSESSMENT_PASS_THRESHOLD = 70` constant instead. 3-phase
  resolution **proposed, not executed** in
  `docs/architecture/ADR_05_KNOWLEDGE_GRAPH_CONSUMPTION_ARCHITECTURE.md`.
- **Second pivot / strict architecture-only mode (2026-06-30, binding):** ADR 05 accepted as
  documentation only — its Phase 1 (exposing `cross_links`/`mastery_threshold`/any other new
  Canonical KG field) must NOT be implemented until BOTH (a) the external Curriculum Production
  Pipeline freezes the Canonical Knowledge Graph v1 specification, AND (b) the user explicitly
  re-approves. Until then: no adapter functions, no runtime/route/schema/production-code changes
  of any kind without explicit per-item user approval — architecture/documentation only. The user
  specified an 8-item forward-architecture roadmap to execute in order, one full ADR (evidence +
  options comparison + trade-offs + specs + migration + scalability-to-millions + backward-compat
  with Educational Brain v1) per turn, implementation deferred for all 8:
  1. KG Consumption Pipeline — **done**, see `docs/architecture/ADR_06_KG_CONSUMPTION_PIPELINE.md`
     (proposes a 4-part load-time gate — schema major-version check, status check, runtime shape
     validation of the 8 already-consumed fields, diagnostic-only metadata surface — because today
     every `docs/{subject}/kg/graph.json`'s wrapper metadata, `{name, version, status, build_date,
     statistics, domains}`, is silently discarded by `subjectKgAdapter.ts`'s `getRaw()`, which keeps
     only `.concepts`, and zero runtime validation or CI wiring exists for the KG validator script).
  2. Mastery Intelligence Architecture — **done**, see
     `docs/architecture/ADR_07_MASTERY_INTELLIGENCE_ARCHITECTURE.md`
     (found five non-unified mastery/progression representations —
     `MasteryLevel` school-only classification, `TopicProgress.masteryPct`
     independently re-classified by `learningProfile.ts` with a hardcoded
     `70`, dormant `EbLearnerConceptMastery` float score, frozen `TrackLevel`
     T0-T4, and the placement-exam subsystem's `LevelBand` enum — none
     reconciled with another; designates `MasteryLevel` as canonical and
     proposes, without implementing, extending it to Library Mode,
     consolidating `learningProfile.ts` onto it, and a cross-vocabulary
     mapping table; new Finding 8 in `ARCHITECTURE_DECISIONS.md`).
  3. Teaching Action Intelligence — **done**, see
     `docs/architecture/ADR_08_TEACHING_ACTION_INTELLIGENCE.md`
     (found the concrete `decide()` → Teaching Action Generator → Dynamic
     Lesson Composer chain is mode-agnostic by construction but
     School-Mode-only in practice — its trigger field,
     `contextSnapshot.currentConceptNodeId`, has exactly one write site
     in `src/`, gated by `if (schoolCtx)`; formally distinguished this
     "Action" layer from `teachingStrategy.ts`'s 7-value "Posture" layer
     and proposes, without implementing, a Library-mode seed-and-persist
     extension; new Finding 9 in `ARCHITECTURE_DECISIONS.md`).
  4. Dynamic Lesson Composition — **done**, see
     `docs/architecture/ADR_09_DYNAMIC_LESSON_COMPOSITION.md`
     (found `composeLessonPlan()` recomputes the full `LessonPlan` from
     scratch every turn with zero persisted cross-turn stage continuity,
     despite `buildLessonPlanBlock()`'s own prompt text framing itself as
     a "multi-turn pacing guide"; proposes, without implementing,
     generalizing the already-proven Worked Examples tag-emit/parse/
     persist/resume pattern (`workedExamples.ts`) via a new
     `contextSnapshot.lessonStageProgress` key and a `planSignature`
     continuation/replan fingerprint computed in calling code; new
     Finding 10 in `ARCHITECTURE_DECISIONS.md`).
  Items 5-8 below are **superseded** by the 15-item v1.0 completion
  criteria in the Gap Analysis Discipline rule immediately below — kept
  here only as a historical record of the original roadmap framing.
  5. Student Memory Evolution — **DONE**, ADR 10.
  6. Recommendation Intelligence — **DONE**, ADR 11.
  7. Visualization & Simulation Architecture — **DONE**, ADR 12.
  8. AI Independence Roadmap — **DONE** (consolidation into Bible §6.9).
- **Architecture Gap Analysis Discipline (2026-06-30, binding, supersedes
  the fixed "one ADR per roadmap item" assumption above):** the objective
  is no longer to produce as many ADRs as possible — it is to finish
  Educational Brain Architecture v1.0, defined by 15 completion criteria
  (Bible §10.2: KG consumption, Mastery Intelligence, Teaching Action
  Intelligence, Dynamic Lesson Composition, Student Memory, Recommendation
  Intelligence, Visualization & Simulation Architecture, Assessment &
  Mastery Validation, Evidence Engine, AI Independence Strategy,
  Curriculum Mapping Strategy, Knowledge Asset Lifecycle, Scalability
  Strategy, Validation & Quality Assurance, Implementation Governance).
  Before every new ADR, perform an Architecture Gap Analysis: (1) is a
  major capability still required for the Educational Brain to function
  as a complete world-class teaching system, (2) is it fundamental enough
  that undocumented implementation risks a redesign, (3) is it not
  already fully covered by the Bible, an existing ADR, or any other
  architecture document in the repo. Write a new ADR **only if all three
  are YES**; otherwise update the Bible, consolidate, eliminate
  duplication, cross-reference, and strengthen guidance instead — a topic
  being discussable is never sufficient reason for a new ADR. When all 15
  items read DONE: freeze v1.0, mark remaining ADR ideas as future
  enhancements (not v1 requirements), produce the final Bible and the
  final Architecture Completion Report, then stop automatically. A
  pre-existing, previously unindexed 11-chapter proposal document set
  (`docs/educational-brain/*`) and a live scene-generation/simulation
  subsystem (`src/lib/teaching/sceneGenerators/*`) were discovered
  mid-session, overlapping several of the 15 items and absent from the
  Bible's engine map. **Reconciliation complete (2026-07-02):** both
  were audited. `docs/educational-brain/*` is a complementary Phase 2
  implementation blueprint — not superseded, not conflicting; ch03
  explicitly treats live `route.ts` as input; Knowledge Asset model is
  the content-layer refinement the live chain is designed to serve.
  `sceneGenerators/*` is live flag-gated code, now documented in Bible
  §3 as Engines 36-41. **Gap Analysis complete (2026-07-02):** 5 new
  ADRs warranted — ADR 10 (Student Memory), ADR 11 (Recommendation
  Intelligence), ADR 12 (Visualization & Simulation Architecture), ADR
  13 (Evidence Engine), ADR 14 (Knowledge Asset Lifecycle). 6 items need
  Bible consolidation only (§6.11 Assessment, §2/§6.9 AI Independence,
  §6.4 Curriculum Mapping, §6.10 Scalability, §6.12 Validation & QA,
  §10.1 Governance). Full evidence in Bible §10.2.
  **ADR 10 complete (2026-07-02):** Student Memory Architecture. Eight
  fragmented memory surfaces redesigned as six formally owned stores
  (Session/Student/Knowledge/Teaching/Brain/Long-term) with single-writer
  invariant. Key proposals: `ConceptMasteryRecord` table (mastery/decay
  split: `masteryScore` vs. `decayedScore = masteryScore × exp(-Δt/halfLife)`),
  `BrainConfig` versioned policy store (replaces hardcoded constants),
  `ActiveMisconception` table (replaces scattered MistakeRecord reads),
  `SessionMemory` typed schema (formalizes `contextSnapshot` JSONB fields).
  4-phase additive migration (add→migrate readers→migrate writers→deprecate).
  Bible updated: §3 row #6, §6.5, §7 (R9 partially resolved, R14 added), §9 ADR index.
  Full design: `docs/architecture/ADR_10_STUDENT_MEMORY_ARCHITECTURE.md`.
  **ADR 11 complete (2026-07-02):** Recommendation Intelligence. Identified
  two structurally distinct purposes conflated in the live cluster: Cross-Session
  Planner (`learningOrchestrator.ts`, 8-priority chain, Dashboard-only) vs.
  In-Session Signal Injection (`weakTopics`/`narrative`/`dailyPlan`/`examReadiness`,
  system-prompt only). Key finding: conflicting signals for the same topic (weak_topic
  vs. RAPID_IMPROVEMENT narrative) are currently resolved probabilistically by the LLM,
  not deterministically by the Brain. Library Mode has no recommendation tier.
  Proposed: Two-layer architecture — Session Recommendation Reconciler (pure function,
  deterministic signal priority table, `maxSessionSignals = 3` cap from BrainConfig)
  + `getTopLibraryRecommendation()` (subject-only, reads TeachingMemorySnapshot).
  Evidence Engine hook point (ADR 13) designed in: `assetEffectivenessSignal` gates
  "revisit" vs. "try different approach." Bible: §3 row #23, §6.7, §7 R15, §9 updated.
  Full design: `docs/architecture/ADR_11_RECOMMENDATION_INTELLIGENCE.md`.
  **ADR 12 complete (2026-07-02):** Visualization & Simulation Architecture.
  Confirmed 7 competing visual pipelines (not 6 as ch08 counted — Engine 42
  Dynamic Visualization `generateVisualizationCode.ts` was unindexed). Two live
  architectural violations: P2 violation (no concept-keyed persistent cache;
  VisualizationCache keys on text hash not conceptId), and Permanent Rule 9
  violation when ENABLE_DYNAMIC_VISUALIZATION=true (second LLM call per turn).
  Also: two uncoordinated decision points (Teaching Engine visual_type pre-LLM
  vs. visualizationDecision.ts post-hoc). Proposed: Visual Asset Model — typed
  renderers, concept-keyed cache `(conceptId, renderer, language, gradeBand)`,
  background authoring for all LLM-visual calls (zero extra LLM calls per turn
  after first-time authoring), mandatory a11yDescription, Visual Policy from
  BrainConfig. Bible: §3 Engine 42 added, §6.8, §7 R16/R17, §9 updated.
  Full design: `docs/architecture/ADR_12_VISUALIZATION_SIMULATION_ARCHITECTURE.md`.
  **ADR 13 complete (2026-07-02):** Evidence Engine. Confirmed two existing
  evidence schemas are orthogonal — `EvidenceRecord` (per-learner mastery ledger,
  Student Memory Store 2) vs. `EbEvidenceEvent`/`EbAssetScore` (per-asset cross-
  student quality log, Teaching Memory Store 4). `EbEvidenceEvent` schema already
  matches ch04's design (conceptId, category, outcome, strength, contextHash).
  Adopted `EbEvidenceEvent`/`EbAssetScore` as canonical Evidence Engine tables,
  wired directly into Teaching pipeline's persist stage (not via dormant Eb* pipeline).
  Three-tier chain: append-only log → 60s EWMA rolling-window worker → nightly
  authoritative rollup. Six evidence categories, Beta-binomial confidence, three
  bias counters (exploration budget, inverse propensity weighting, misconception-
  conditional scoring). New tables: StrategyEffectivenessScore, MisconceptionPrevalence,
  CuratorQueueEntry. Single-writer rule for all Evidence Engine output tables.
  ADR 11 integration point implemented: assetEffectivenessSignal derives from EbAssetScore.
  R9 fully resolved (confirmed orthogonal). Bible: §6.6, §7 R18, §9 updated.
  Full design: `docs/architecture/ADR_13_EVIDENCE_ENGINE.md`.
  **Educational Brain Architecture v1.0 COMPLETE (2026-07-02):** All 15
  completion criteria done. Six Bible consolidation items completed in one
  pass: (8) Assessment & Mastery Validation → Bible §6.13 added; (10) AI
  Independence Strategy → Bible §6.9 expanded with P1-P10 + Type A/B/C
  call taxonomy + ADI concept; (11) Curriculum Mapping → Bible §6.4
  expanded with board/grade→concept view layer; (13) Scalability → Bible
  §6.10 expanded with ch09 100M-learner targets + cost model; (14)
  Validation & QA → Bible §6.12 expanded with P10 + cross-cutting rule;
  (15) Governance → Bible §10.1 expanded with 9 Chief Architect rules.
  §0 TOC updated (13 §6 subsections). All 15 §10.2 criteria read DONE.
  **Final Architecture Completion Report DONE (2026-07-02):**
  `docs/architecture/ARCHITECTURE_COMPLETION_REPORT_V1.md` — durable v1.0
  completion record: criteria/ADR status tables, cross-ADR dependency
  graph, five-wave dependency-ordered implementation sequence (Wave 0
  process gates → Wave 1 additive foundations + Wave 1b P10 fixture
  harness → Wave 2 engine extensions → Wave 3 memory migration (R14) →
  Wave 4 asset-model activation (P2/ADI payoff, fixes R16) → Wave 5
  closure), implementation-gating risks, readiness assessment. Synthesis
  only; Bible primacy applies.
- **Third pivot / Integration & Validation Loop (2026-07-02, binding):**
  v1.0 is FROZEN. The Curriculum Production Pipeline runs independently
  and remains the ONLY authority for Canonical KGs. Standing mission: do
  NOT build curriculum, do NOT redesign the Brain, do NOT modify
  curriculum/KG files, production runtime, routes, schemas, or teaching
  assets, and do NOT reopen completed ADRs without strong evidence.
  Instead, loop: audit → pick ONE highest-value integration-preparation
  task (implementation specs, migration/rollout planning, validation/QA
  frameworks, testing strategy, dependency analysis, risk analysis,
  observability planning, version compatibility, developer guides,
  checklists) → verify zero curriculum overlap → complete it → validate →
  update Bible/memory only if required → commit → push → repeat. Stop
  immediately if a task would modify curriculum, redesign frozen
  architecture, require the KG v1 freeze, need a major architectural
  decision, or need user approval. Report after each completed task, then
  continue. Every task must reduce implementation risk without
  interfering with curriculum production.
  Loop iterations completed so far:
  (1) 2026-07-02 — `docs/architecture/ARCHITECTURE_COMPLETION_REPORT_V1.md`
  committed (durable v1.0 record + cross-ADR dependency graph + five-wave
  sequence).
  (2) 2026-07-02 — `docs/architecture/VALIDATION_FRAMEWORK_P10.md`
  committed (Wave 1b spec: 3 test tiers, LLM transcript seam, 4 assertion
  surfaces, 15-fixture frozen set, CI plan). Verified findings: the
  39-file vitest suite tests pure REPLICAS of LLM-adjacent logic, not the
  real modules (replica-drift risk); `.github/workflows/` doesn't exist —
  nothing runs in CI (extends R6).
  (3) 2026-07-02 — CI baseline measured, spec amended: vitest GREEN
  (506/507, ~10 s, needs no DB and no generated Prisma client);
  `tsc --noEmit` NOT clean (662 errors/98 files with ungenerated client;
  clean baseline smaller but nonzero) → CI type gate redesigned as a
  ratchet (fail only on count increase), not zero-error. Note:
  `prisma generate` fails on engine download in sandboxed envs
  (ECONNRESET) — type baselines differ by environment.
  (4) 2026-07-04 — Curriculum Pipeline sync at d622336: English KG
  authored (216 concepts, PASS) but NOT registered in runtime registry →
  R20 + Wave 0 approval item; Mathematics KG v1.0.1 FROZEN (first
  subject at ADR 06's freeze state; campaign still 1.0.0-draft → Wave 0
  gate not met); all 6 KGs re-validated PASS; pipeline asset format
  confirmed compatible with ADR 14 (curated source for Phase 2, not a
  competing model); superseded banners on SYSTEM_AUDIT.md +
  project-memory/NEXT_ACTION.md; P10 spec CI step 4 corrected to 6
  subjects with file-path CLI usage.
  (5) 2026-07-04 — CI gate BUILT (P10 §6 steps 1–4):
  `.github/workflows/validate.yml` + `scripts/ci/tsc-ratchet.sh` — npm ci
  → type-error ratchet (bootstrap mode until `scripts/ci/tsc-baseline.txt`
  is captured from the first hosted run) → vitest hard gate → 6-subject KG
  validator on every push/PR. R6 → Mitigated (CI half). Ratchet exercised
  in all 3 modes locally; 6/6 KGs PASS; vitest 506/507. Test scaffolding
  only — no production code.
  (6) 2026-07-04 — `docs/architecture/WAVE_0_APPROVAL_CHECKLIST.md`
  created: the G2 approval instrument — 21 gated items (W0-1…W5-3, plus
  W5-4 already done) from
  ADRs 05-14 + R20 + P10 GATED seams, each with stable ID, source,
  dependencies, approval checkbox. NOTHING approved; checking a box +
  committing (`governance: approve <IDs>`) is the approval act. Use these
  IDs in future implementation commits.
  (7) 2026-07-04 — **LOOP STOPPED at its designed terminal state.** After
  a fresh repo read (no pipeline movement past d622336-era commits; docs
  verified in sync), no meaningful non-implementation work remains: every
  remaining task requires production implementation (Tier 2 tests /
  transcript harness / fixtures / all 21 checklist items), the Canonical
  KG v1 freeze (G1), explicit user approval (G2), or an external event
  (first hosted CI run to capture `scripts/ci/tsc-baseline.txt`).
  Preparation readiness is 100% of what is reachable without those gates.
  Do NOT restart this loop to hunt for tasks — resume work only when one
  of these unblocks: (a) pipeline pushes new KG/asset output → re-run
  6-subject validation + doc sync; (b) owner checks boxes in
  WAVE_0_APPROVAL_CHECKLIST.md → implement approved items in dependency
  order; (c) first hosted CI run → commit the ratchet baseline; (d) a
  directive explicitly re-permits building test scaffolding → build Tier
  2 tests + transcript harness per VALIDATION_FRAMEWORK_P10.md §7.
  (8) 2026-07-07 — **G2 exception granted: ADR 14 Phase 2/3 implemented**
  ("Explanation Memory" + "Teaching Action Repository", explicit owner
  chat instruction, out of the normal G1/G2 sequence — G1 KG-freeze still
  not declared). Discovered mid-task that W1-3 (Evidence Engine Phase 1)
  and W1-4 (AssetIdentity + three family tables, empty) were ALREADY
  implemented in the codebase (`src/lib/teaching/evidence/evidenceEngine.ts`,
  `src/lib/teaching/assets/assetIdentity.ts`) despite their checklist boxes
  reading unchecked — checklist corrected to match reality rather than
  building a duplicate schema. Built on top, EXPLANATION + PROBE families
  only (VISUAL intentionally untouched — ADR 12/W4-2 territory): Student
  State builder (`studentState.ts`, grade→GradeBand mapping), a pure
  confidence matcher (`matcher.ts`, calibrated so a freshly human-approved
  ACTIVE asset with zero accumulated evidence clears the default threshold
  on concept+language+gradeBand fit alone — qualityScore/qualityConfidence
  are Evidence-Engine-owned per the schema's single-writer invariant and
  can only ever add bonus confidence, never gate a floor), capture
  (`explanationMemory.ts`/`teachingActionRepository.ts`, DRAFT after every
  LLM generation), an admin review endpoint
  (`/api/admin/knowledge-assets`, DB-role-gated, approve/reject), and
  `assembleLesson()` wired into `route.ts` immediately before the LLM
  call. Live-verified end-to-end via local Postgres + direct HTTP calls:
  DRAFT is never served; after admin approval the real chat endpoint
  returns `provider: "memory"` with the exact stored content and the LLM
  is never invoked; combined explanation+quiz assembly works; with the
  catalogue empty (today's real state — nothing was pre-populated per the
  task's own "do not populate thousands of explanations now" instruction)
  the LLM path is provably unchanged from before this build. Scope: only
  physics/mathematics/english (the three live curriculums).
  **ADR 14 complete (2026-07-02):** Knowledge Asset Lifecycle. Confirmed all
  generated content (worked examples, explanations, visual specs, probes) is
  discarded per-turn — a P2 violation at the content layer. `teachingAssets.ts`/
  `teachingAssetSchema.ts`/`teachingAssetAdapter.ts` confirmed ORPHANED (zero live
  importers) and formally retired by ADR 14 (NOT the implementation path for the
  Knowledge Asset model). Selected design: three-family `AssetIdentity` model
  (ExplanationAsset, VisualAsset per ADR 12, ProbeAsset) with shared identity table
  carrying `incompatibilities` field (prevents serving assets that reinforce active
  learner misconceptions). Lifecycle: DRAFT→REVIEW→ACTIVE→DEPRECATED→RETIRED; only
  ACTIVE served; at most one ACTIVE per `canonicalSlug`. Five evidence-driven
  deprecation triggers. Four-phase additive migration (schema → passive catalogue →
  active retrieval → probe assets). Phase 2 endgame: LLM becomes voice-renderer,
  not content-generator. R9 note: not applicable (ADR 14 introduces its own
  asset-identity schema, fully compatible with ADR 13 Evidence Engine). R19 added
  (orphaned Teaching Assets Platform files remain on disk post-retirement). Bible:
  §3 row #35, §6.3, §7 R19, §9 ADR 14 row added.
  Full design: `docs/architecture/ADR_14_KNOWLEDGE_ASSET_LIFECYCLE.md`.
- **Chief Educational Brain Architect mode + per-ADR discipline (2026-06-30, binding, refined
  same day):** the Curriculum Production Pipeline is the ONLY authority for Canonical Subject
  Knowledge Graphs — do not interfere with it, generate subject knowledge, generate teaching
  assets, implement runtime features, modify production code/routes/schemas, expose new Canonical
  KG fields, or redesign stable architecture without strong evidence. The job here is producing
  the complete Educational Brain Architecture as one unified design — treat every engine as part
  of one organism, never design isolated systems — that will eventually become the official
  implementation blueprint. Every ADR must answer: **"How does this make the Educational Brain
  think and teach more like a world-class human teacher?"** — if the answer is weak, redesign the
  ADR. **Before starting each ADR**: read the Educational Brain Bible
  (`docs/architecture/EDUCATIONAL_BRAIN_BIBLE.md`), re-read every previous ADR, re-read this
  project-memory set, re-read the current master architecture documents, verify the proposed
  design doesn't conflict with existing architecture, and if it does, explain + resolve + update
  the Bible before continuing — never allow contradictory ADRs, duplicated systems, or overlapping
  responsibilities; always prefer one elegant system over multiple similar ones; if an ADR makes a
  previous one obsolete, mark the old ADR superseded in the Bible's ADR index rather than leaving
  two conflicting answers. **Every ADR uses this 14-section template** (current, as of the
  2026-06-30 refinement — ADRs 02-07 used a 13-section predecessor, not superseded by the template
  change alone, see Bible §9 template note): Problem, Evidence, Alternative designs, Selected
  design, Trade-offs, Scalability, AI independence impact, Backward compatibility, Validation
  strategy, Migration strategy, Relationship to previous ADRs, Relationship to the Canonical
  Knowledge Graph, Relationship to the Teaching Engine, Future implementation plan. Do not
  implement anything and do not request implementation approval inside an ADR — implementation
  begins only after the Curriculum Production Pipeline declares Canonical Knowledge Graph v1
  frozen AND the user explicitly approves. Don't revisit solved problems without new evidence;
  don't prioritize repository cleanup/minor refactoring/dead-code/naming over architecture unless
  it blocks the roadmap. **Every completed ADR must update the Bible** (at minimum: ADR index,
  relevant flow section, risk register if applicable) — an ADR that doesn't update the Bible isn't
  finished. Continue autonomously through the 8-item roadmap above; when all 8 ADRs are complete,
  stop and produce one final **Architecture Completion Report** (Bible summary, ADR index,
  architecture summary, complete engine dependency map, remaining implementation work, known
  risks, readiness assessment for implementation) — not due yet, only 4 of 8 roadmap items done as
  of ADR 09.
- Full evidence, governance rule, and a corrected map of what's live vs. dormant:
  `docs/EDUCATIONAL_BRAIN_CONSOLIDATION.md`. **Governance rule**: before starting any new "decide
  what to teach / what strategy / what mastery state" system, re-fetch the remote tip, read the
  architecture freeze above, grep `src/lib/teaching-engine/`, `src/lib/school/adaptive/`, and
  `src/app/api/learn/chat/route.ts`, and explain why extending the canonical pipeline in place is
  insufficient. A new parallel pipeline is not an acceptable answer to "the existing one feels
  architecturally rough" — refactor the live system instead.

## Run locally
```
cp .env.example .env   # set DATABASE_URL, AUTH_SECRET (openssl rand -base64 32), GROQ_API_KEY
                        # optional: YANDEX_API_KEY, YANDEX_FOLDER_ID (Russia-only fallback)
npm install
npx prisma db push
npm run dev            # http://localhost:3000
npm run build          # prisma generate && next build
npx tsc --noEmit       # pre-existing stripe/subscription errors are expected on feature branches
```

## Constraints
- Branch for current work (canonical): `claude/my-tutor-foundation-KDSUO`.
- Do NOT create PRs unless explicitly asked. Do NOT push to other branches.
- Do NOT redesign UI, navigation, or touch Hindi/Sanskrit subject architecture.
