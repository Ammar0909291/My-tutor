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
- Two systems are **archived/dormant, never execute against live traffic** — do not extend them
  expecting production effect: `src/lib/educationalBrain/*` (Eb* pipeline, fire-and-forget, gated
  by `ENABLE_EDUCATIONAL_BRAIN_PIPELINE`, default off) and `src/lib/curriculum/teachingActionEngine.ts`
  + its Teaching Assets Platform siblings (zero live importers — **not** the same file as the live
  `src/lib/teaching-engine/index.ts`, which has a confusingly similar name). Both carry
  archive-status header comments at their top.
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
