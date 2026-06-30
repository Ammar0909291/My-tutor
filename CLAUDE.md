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

## Educational Brain — Brain of Record (ADR 01, decided 2026-06-30)
- The ONE live teaching-decision system is `src/lib/school/adaptive/*` (18 modules), wired
  synchronously into `src/app/api/learn/chat/route.ts`. It runs for school-student sessions
  (`schoolCtx` truthy) and shapes the actual system prompt the AI tutor receives. General
  learners currently get only `buildKnowledgeGraphContext()` — no adaptive intelligence; this
  asymmetry is the next queued architectural increment, not yet implemented.
- Two other "decide what to teach" implementations exist in the repo but are **archived/dormant,
  never execute against live traffic**: `src/lib/educationalBrain/*` (Eb* pipeline, fire-and-forget,
  gated by `ENABLE_EDUCATIONAL_BRAIN_PIPELINE`, default off) and the canonical-KG Teaching Engine
  stack (`src/lib/teaching-engine/`, `src/lib/curriculum/teachingActionEngine.ts` + sibling files,
  zero live importers). Both carry archive-status header comments at their top. Do not extend them
  expecting production effect.
- Full evidence and rationale: `docs/EDUCATIONAL_BRAIN_CONSOLIDATION.md`.
- **Governance rule**: before starting any new "decide what to teach / what strategy / what mastery
  state" system, grep `src/lib/school/adaptive/` and `src/app/api/learn/chat/route.ts` first and
  explain why extending the Brain of Record in place is insufficient. A new parallel pipeline is
  not an acceptable answer to "the existing one feels architecturally rough" — refactor the live
  system instead.

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
