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
  - Canonical 10-field schema only: `id, name, requires, unlocks, cross_links, difficulty, bloom,
    mastery_threshold, estimated_hours, description` — never add `domain`/`concept_type` to the
    JSON; they're derived at runtime by `inferDomain()`/`inferConceptType()`.

## Educational Brain — architecture (frozen 2026-06-30, read before any teaching-decision work)
- **Authoritative reference**: `docs/architecture/EDUCATIONAL_BRAIN_V1.md` (+ `ENGINE_REFERENCE.md`,
  `DATA_FLOW.md`, `DEPENDENCY_RULES.md`, `EXTENSION_GUIDE.md`, `ARCHITECTURE_DECISIONS.md`) — the
  full frozen architecture, 65-step chat-route data flow, per-engine contracts, and 15 permanent
  rules. Read this set before changing or extending the Educational Brain; extend it, don't replace it.
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
  3. Teaching Action Intelligence — not started.
  4. Dynamic Lesson Composition — not started.
  5. Student Memory Evolution — not started.
  6. Recommendation Intelligence — not started.
  7. Visualization & Simulation Architecture — not started.
  8. AI Independence Roadmap — not started.
- **Chief Educational Brain Architect mode + per-ADR discipline (2026-06-30, binding):** the
  Curriculum Production Pipeline is the ONLY authority for Canonical Subject Knowledge Graphs —
  do not interfere with it, generate subject knowledge, implement runtime features, modify
  production code/schemas, expose new Canonical KG fields, or redesign stable architecture without
  strong evidence. The job here is producing the complete Educational Brain Architecture as one
  unified design that will eventually become the official implementation blueprint. **Before
  starting each ADR**: re-read every previous ADR, re-read this project-memory set, re-read the
  current master architecture documents, verify the proposed design doesn't conflict with existing
  architecture, and if it does, explain + resolve + update the master architecture before
  continuing — never allow contradictory ADRs, duplicated systems, or overlapping responsibilities;
  always prefer one elegant system over multiple similar ones. **Every ADR uses this 13-section
  template**: Problem, Evidence, Alternative designs, Chosen architecture, Trade-offs, Scalability,
  AI independence impact, Backward compatibility, Validation strategy, Migration strategy,
  Relationship to previous ADRs, Relationship to the Canonical Knowledge Graph, Future
  implementation plan. Do not implement anything and do not request implementation approval inside
  an ADR — implementation begins only after the Curriculum Production Pipeline declares Canonical
  Knowledge Graph v1 frozen AND the user explicitly approves. Don't revisit solved problems without
  new evidence; don't prioritize repository cleanup/minor refactoring/dead-code/naming over
  architecture unless it blocks the roadmap. Continue autonomously through the 8-item roadmap above;
  when all 8 ADRs are complete, stop and produce one final **Architecture Completion Report**
  (overall architecture summary, complete engine map, component dependency diagram in text, ADR
  index, remaining implementation work, known risks, readiness assessment for implementation) — not
  due yet, only 2 of 8 roadmap items done as of ADR 07.
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
