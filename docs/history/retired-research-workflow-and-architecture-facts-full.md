# Retired Research Workflow (full) & Architecture Facts (full original text)

> Extracted verbatim during the 2026-09-17 CLAUDE.md collapse. The live, condensed
> "Architecture facts" section in CLAUDE.md replaces the superseded sub-notes below
> with current-state-only facts; this file keeps the full original text (including
> superseded asides) for anyone who wants the complete history.

## Permanent Research Workflow (RETIRED 2026-07-07 — see override note, kept below for history only)
- **OVERRIDE (2026-07-07, binding, supersedes everything below):** do NOT critique, analyze,
  improve, or rewrite prompts going forward, for research/architecture/science tasks or any other
  kind. No PROMPT IMPROVEMENTS section, no FINAL PROMPT rewrite, no "improved version" substituted
  for what was actually asked. Execute every prompt exactly as given, as-is. This fully retires
  the analyze/improve/rewrite mechanism described below (Steps 1-4 in spirit); it does NOT retire
  ordinary good-faith execution quality (depth, no filler, correctness) — it only stops the
  practice of changing what was asked before doing it.
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
- Next.js 14 App Router, NextAuth v5 (JWT), Prisma + PostgreSQL. **Corrected 2026-07-26 (final
  operations session, verified via direct production query):** the schema is actually managed by
  real Prisma migrations, not `db push` — `prisma/migrations/` contains 10 real migration
  directories on disk, and `vercel.json`'s build command runs `prisma migrate deploy`. Queried
  production's `_prisma_migrations` table directly (Supabase MCP): all 10 migrations are applied
  (`finished_at` populated, `rolled_back_at` null for every row), matching the local directories
  1:1. `prisma migrate deploy` is confirmed a genuine no-op on every deploy — **no drift, resolved,
  not a risk.** (Prior note, 2026-07-26 Engineering Program close-out, is superseded: it had
  flagged this as unverified and originally mis-stated the project as `db push`-only.)
- **AI PROVIDER — GEMINI-ONLY REVERSED, GROQ NOW PRIMARY (owner-authorized, 2026-08-20,
  supersedes the 2026-08-12 Gemini-only entry below, which is kept for history only).** Gemini
  started returning 429 rate-limit errors in production; the 2026-08-12 gemini-only default had
  left nothing to fail over to, so every learner turn was landing on the degraded template — a
  total teaching outage, not a degraded one. `GROQ_API_KEY` had been configured in production the
  whole time and was sitting unused. `isGeminiOnlyMode()` in `src/lib/ai/router.ts` is back to an
  opt-IN diagnostic: unset (or anything other than the exact `AI_PROVIDER_MODE=gemini_only`
  opt-in) uses the full chain. The DEFAULT (non-Russian) chain's internal order is reversed from
  what it was before 2026-08-12: **Groq -> Gemini -> OpenRouter** (`getRouter()`'s `candidates`
  ternary, `src/lib/ai/router.ts` ~L172-184) — Groq primary, Gemini fallback, OpenRouter third
  (its key is unset in production, so it is filtered out exactly as before; nothing about its role
  changes). Gemini is NOT removed — fully wired, second in the chain, reachable the moment Groq
  fails. The Russian chain is untouched: **Yandex -> Gemini -> OpenRouter -> Groq**, in the same
  order as the 2026-08-04 restoration, in its own array so the default-chain reorder cannot leak
  into it. `AI_PROVIDER_MODE=gemini_only` is kept as a diagnostic escape hatch (symmetric with the
  old `failover` opt-out it replaces) in case single-provider isolation is wanted again. Guarded
  by `src/tests/aiDefaultProviderChain.test.ts` (renamed from `aiGeminiOnlyDefault.test.ts`,
  rewritten for the new default), `src/tests/aiGroqPrimaryFailover.test.ts` (new: Groq-first
  selection, no wasted Gemini call on a Groq success, Groq-failure-to-Gemini failover, double-
  failure fallthrough unchanged, no secret in any log/error, `createGeminiProvider` unbroken
  standalone), the updated `AI_PROVIDER_MODE` block in `aiAttemptTelemetry.test.ts`, and updated
  assertions in `aiProviderChainTruth.test.ts`/`aiRussianLanguageRouting.test.ts`.
- **Superseded 2026-08-12 entry, kept for history only:** every turn was served by Gemini
  `gemini-3.5-flash-lite` and nothing else, in every teaching language, via an inverted
  `isGeminiOnlyMode()` (unset meant gemini-only; `AI_PROVIDER_MODE=failover` restored the full
  chain). That inversion is what the 2026-08-20 entry above reverses.
- AI (**YandexGPT restored 2026-08-04 as an intentional product decision; supersedes the
  2026-08-04 "there is NO YandexGPT LLM provider" note below**): provider selection keys off the
  learner's **selected teaching language and NOTHING else** — never their country. Two chains,
  both assembled in `src/lib/ai/router.ts`:
  - `teachingLanguage === 'ru'` → **YandexGPT (`yandexgpt-lite/latest`) -> Gemini
    (`gemini-3.5-flash-lite`) -> OpenRouter -> Groq (`openai/gpt-oss-20b`)**
  - every other language → **Gemini -> OpenRouter -> Groq** (byte-for-byte the prior chain)
  So Russian in India/Poland/Russia all get YandexGPT, and English in Russia gets Gemini.
  `chainKeyForLanguage()` in `router.ts` is the **single provider-selection authority** — it
  takes a language and no country, so nothing else may branch on either to pick a provider.
  Providers with no configured API key are still filtered out; Yandex requires BOTH
  `YANDEX_API_KEY` and `YANDEX_FOLDER_ID` (the folder id forms the model URI), and without them
  the Russian chain simply starts at Gemini. `AI_PROVIDER_MODE=gemini_only` still overrides both
  chains. `routeAI`'s `country` parameter remains **not a routing signal** — logged only, read by
  no provider. **Yandex is also live for Russian text-to-speech** (`/api/tts`, gated on the same
  `lang === 'ru'` signal) — LLM and TTS deliberately share one language signal.
  History: YandexGPT was removed by `52152a18` ("feat(ai): production AI provider layer"), which
  replaced Groq/YandexGPT with Gemini + OpenRouter; `970f46a2` then corrected the stale docs that
  still claimed Russian used it. That removal is now deliberately reversed — but on language, not
  on `country === 'ru'` as the pre-`52152a18` router did. Guarded by
  `src/tests/aiProviderChainTruth.test.ts` and `src/tests/aiRussianLanguageRouting.test.ts`.
  Redis optional (app runs without it).
- KnowledgeNode: `{ id, domain, title, description, difficulty, prerequisites[] }`.
  Misconception data is runtime (`MistakeRecord`), NOT in the static KG type.
- Admin gated by `ADMIN_EMAILS` env var (not a DB flag).
- Canonical Knowledge Graph subjects (generic adapter platform, `src/lib/curriculum/knowledgeGraph.ts`
  + `subjectKgAdapter.ts`, one `docs/{subject}/kg/graph.json` + 2 registry lines per subject, no new
  adapter/validator/Teaching Engine code per subject):
  - mathematics → `docs/mathematics/kg/graph.json` (908 concepts, prefix `math.`)
  - physics → `docs/physics/kg/graph.json` (238 concepts, 12 domains, prefix `phys.`) — 216
    concepts across 11 domains as of 2026-06-29, extended 2026-07-22 with a new Particle Physics
    domain (16 concepts, `phys.particle.*`) and 6 Semiconductor Physics concepts appended to
    Modern Physics (`phys.mod.*`) — see the Physics KG Extension exception record below
  - chemistry → `docs/chemistry/kg/graph.json` (187 concepts, prefix `chem.`)
  - computer_science → `docs/computer-science/kg/graph.json` (119 concepts, prefix `cs.`)
  - biology → `docs/biology/kg/graph.json` (108 concepts, 16 domains, prefix `bio.`) — v2.0.0 frozen 2026-07-22,
    expanded from 89 concepts (15 domains) by adding 19 research-level concepts incl. new bio.div domain;
    see `docs/biology/VALIDATION_REPORT.md` for original validator/smoke-test/regression evidence
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

