# My Tutor — Project Memory

**This file is LIVE RULES ONLY — under 500 lines by design.** Full project history (every batch,
every incident, every defect investigation, going back to project start) was extracted verbatim
into `docs/history/` on 2026-09-17 and is NOT summarized or lost — see `docs/history/INDEX.md`
for the full map. Nothing here should ever grow back into a multi-thousand-line narrative log:
new dated campaign/batch entries go into the relevant file under `docs/history/` (or a new one),
never into this file. This file only changes when a LIVE, currently-binding rule changes.

## READ THIS FIRST — current owner-adopted priority (binding, added 2026-09-16)
- **`docs/architecture/TUTOR_REMEDIATION_PLAN.md` is the current, owner-adopted priority plan**
  (§11.10 is its final, self-corrected verdict). Read its §2.0 and §11.10 before starting ANY work
  picked up "cold" (no explicit fresh instruction from the user this turn).
- **The "four primitives"** (Typed Turn Contract, Closed-taxonomy Learner-Move Interpreter,
  Deterministic Physics Verifier, Durable per-concept learner state) **are EXPLICITLY DEFERRED, NOT
  SCHEDULED.** Two (Turn Contract, Learner-Move Interpreter) are fully shipped; the other two
  (Physics Verifier, Durable Learner State) are deliberately paused. Do NOT resume any of this on
  your own initiative — at least two independent sessions already did this cold and wasted budget
  on deferred work. Full governance saga (a same-day override that was itself later found to be a
  repeat of this exact incident, plus the corrected real scope of what's actually unbuilt):
  `docs/history/four-primitives-saga.md`. Resume only on an explicit fresh owner instruction.
- **The adopted plan's own stop condition has already been reached**: §11.10 narrows all adopted
  work to §10.1 ("one corpus, one writer" — DONE, `8bcd8407`/`16be9ab8`) → §10.2 (a corpus-wide
  readiness REPORT, never an admission gate — DONE, `d728b372`) → **STOP, get real learner
  traffic, let the owner decide what comes next.** There is currently no queued next item under
  the adopted plan. Do not invent one.
- If genuinely unsure whether a task is in-scope under this plan, ask before proceeding rather
  than defaulting to "continue the last autonomous campaign."

## Reporting preference (ALWAYS follow — updated 2026-07-17)
- After EVERY prompt/task — including non-coding tasks (audits, Q&A, memory updates) — ALWAYS
  produce a **detailed report** at the end of the turn.
- ALWAYS include **git info** in that report: branch worked on, commit hash(es) created this turn,
  push status (pushed to `main` / nothing to push / push failed + why), and current `git status`
  state (clean vs. pending changes) — even when the task was non-coding, state explicitly that no
  git changes were made rather than omitting the section.
- ALWAYS include **running instructions for the local computer** (install, env setup,
  `npx prisma db push`, `npm run dev`, `npm run build`, type-check) in that report when the task
  touched code; otherwise still close with a report summarizing what was done.
- ALWAYS deliver the report as a **single copy-able block of plain text** (a fenced code block),
  so it can be copied in one action. No exceptions — the ENTIRE end-of-turn report goes inside one
  ``` fence, including short/simple-seeming turns (a single commit+push is NOT exempt) and
  long/multi-phase ones (split across multiple responses if needed, each still fully fenced).

## Workflow preference (ALWAYS follow — updated 2026-07-07)
- On EVERY prompt: read and understand it the way the lead developer on this project would.
- Decide yourself what to add or remove from the request as understood — do NOT stop and ask via
  AskUserQuestion for ordinary scope corrections. State plainly, in one short block at the start
  of the reply, exactly what was redefined/applied. Then start working immediately — no
  confirmation round on scope.
- This pre-authorization does NOT extend to: (a) the Educational Brain G1/G2 governance gates
  below (Canonical KG v1 freeze + explicit per-item approval before implementation — still require
  real, separate user sign-off), or (b) genuinely risky/hard-to-reverse actions (force push,
  resets, destructive git ops, anything affecting shared/production state) — those still get
  flagged and confirmed first.
- For research/architecture/science-track prompts specifically: do NOT critique, improve, or
  rewrite the prompt before executing it (retired 2026-07-07; full retired mechanism in
  `docs/history/retired-research-workflow-and-architecture-facts-full.md`). Execute exactly as
  given — this does not loosen the G1/G2 gate below.

## Architecture facts (current state — see `docs/history/retired-research-workflow-and-architecture-facts-full.md` for superseded history)
- Next.js 14 App Router, NextAuth v5 (JWT), Prisma + PostgreSQL. Schema is managed by real Prisma
  migrations (not `db push`) — `vercel.json`'s build runs `prisma migrate deploy`, confirmed a
  genuine no-op against production (`_prisma_migrations` fully applied, no drift).
- **AI provider routing** (`src/lib/ai/router.ts`, `chainKeyForLanguage()` is the single
  selection authority — keys off the learner's selected teaching language and NOTHING else,
  never their country):
  - `teachingLanguage === 'ru'` → **YandexGPT -> Gemini -> OpenRouter -> Groq**
  - every other language → **Groq -> Gemini -> OpenRouter** (Groq primary since 2026-08-20, after
    a Gemini-only mode caused a total outage when Gemini rate-limited)
  - `AI_PROVIDER_MODE=gemini_only` is a diagnostic escape hatch, unset by default (using it again
    risks repeating the 2026-08-20 outage — there is nothing to fail over to). Providers with no
    configured key are filtered out. `routeAI`'s `country` param is logged only, never a routing
    signal. Yandex TTS shares the same `lang==='ru'` signal. Redis optional.
- KnowledgeNode: `{ id, domain, title, description, difficulty, prerequisites[] }`. Misconception
  data is runtime (`MistakeRecord`), not in the static KG type. Admin gated by `ADMIN_EMAILS` env
  var (not a DB flag).
- **Canonical Knowledge Graph subjects** (generic adapter platform,
  `src/lib/curriculum/knowledgeGraph.ts` + `subjectKgAdapter.ts` — one
  `docs/{subject}/kg/graph.json` + 2 registry lines per subject, no new adapter/validator/Teaching
  Engine code per subject; `curriculumKgRegistration.test.ts` fails CI if a KG exists on disk but
  isn't registered):
  - mathematics → `docs/mathematics/kg/graph.json` (908 concepts, prefix `math.`)
  - physics → `docs/physics/kg/graph.json` (238 concepts, 12 domains, prefix `phys.`)
  - chemistry → `docs/chemistry/kg/graph.json` (186 concepts, prefix `chem.`)
  - computer_science → `docs/computer-science/kg/graph.json` (119 concepts, prefix `cs.`)
  - biology → `docs/biology/kg/graph.json` (199 concepts, 18 domains, prefix `bio.` — grew from
    108/16 via the 2026-09-14 KG extension)
  - english → `docs/english/kg/graph.json` (216 concepts, 12 domains, prefix `eng.`) — registered
    and live.
  - Canonical 10-field schema only: `id, name, requires, unlocks, cross_links, difficulty, bloom,
    mastery_threshold, estimated_hours, description` — never add `domain`/`concept_type` to the
    JSON; they're derived at runtime by `inferDomain()`/`inferConceptType()`.
- The Curriculum Production Pipeline (external) is the ONLY authority for Canonical Subject
  Knowledge Graphs — do not modify curriculum/KG files without an explicit, recorded owner
  exception (precedent: the 2026-07-22 Physics KG extension, `docs/history/curriculum-and-engineering-programs.md`).

## Educational Brain governance (read before any teaching-decision or "what to teach next" work)
- **Authoritative reference**: `docs/architecture/EDUCATIONAL_BRAIN_BIBLE.md` (engine map, data
  flow, ADR index). Full architecture v1.0 is FROZEN (all 15 completion criteria DONE,
  `docs/architecture/ARCHITECTURE_COMPLETION_REPORT_V1.md`). Detail docs:
  `EDUCATIONAL_BRAIN_V1.md`, `ENGINE_REFERENCE.md`, `DATA_FLOW.md`, `DEPENDENCY_RULES.md`,
  `EXTENSION_GUIDE.md`, `ARCHITECTURE_DECISIONS.md`. Extend this architecture, don't replace it.
- **Governance rule**: before starting any new "decide what to teach / what strategy / what
  mastery state" system, re-fetch the remote tip, read the architecture freeze, grep
  `src/lib/teaching-engine/`, `src/lib/school/adaptive/`, and `src/app/api/learn/chat/route.ts`,
  and explain why extending the canonical pipeline in place is insufficient. A new parallel
  pipeline is never an acceptable answer to "the existing one feels architecturally rough" —
  refactor the live system instead. Full evidence: `docs/EDUCATIONAL_BRAIN_CONSOLIDATION.md`.
- **G1/G2 gate**: Canonical KG v1 freeze (G1) + explicit per-item user approval (G2) are both
  required before implementing any new Educational Brain runtime capability, with documented
  case-by-case exceptions granted by the owner in chat (precedents recorded in
  `docs/history/` — e.g. ADR 14 Phase 2/3, curriculum-level placement, the Physics KG extension).
  The Workflow preference above never substitutes for this gate.
- `educational-brain/` (repo root) is the permanent authored teaching-science knowledge tree.
  Full delivery history (Deliveries 1-15, Wave 0, CTO iterations, corrections):
  `docs/history/educational-brain-knowledge-base.md`.
- Mathematics Educational Brain completion campaign (10 domains CERTIFIED as of the last check —
  **re-verify with `scripts/math/state.ts`, never trust a number here**): full 92-batch log in
  `docs/history/MATHEMATICS_EB_CAMPAIGN.md`. Standing discipline for continuing it: small bounded
  batches, re-derive the topological frontier fresh each session, validate (KG validator + `tsc`
  + targeted tests + full suite + build) before every commit.

## Account safety (binding)
- `suaibamr@gmail.com` is a normal, usable account for any harness/session — the prior
  forbidden-account restriction was explicitly REVOKED 2026-09-06 (full record:
  `docs/history/account-safety-and-english-defects.md`).
- **`suaibamr@gmail.com` is SATURATED for physics QA** (237/238 concepts already COMPLETED from
  this project's own prior certification work, verified via direct DB query 2026-09-17). Do NOT
  run physics fresh-teach/mastery-reachability QA on this account without first checking
  `topic_progress` for already-COMPLETED concepts — a saturated account produces a confounded
  "0% mastery" result that looks like a grading regression but isn't. Chemistry/English are still
  mostly fresh on this account but will saturate the same way over time. For guaranteed-fresh QA,
  use a disposable account instead (`scripts/qa/liveAccount.ts`'s register→drive→delete lifecycle,
  `qa-*@mytutor-qa.invalid`).
- Never write any real account's password to a file or log it — treat any credential supplied
  live in chat as an ephemeral env var for that invocation only.

## Egress safety (binding — 5 GB/month Supabase quota)
- Two real leaks (spine-event replay on every chat turn; cold-start bootstrap prefetch) hit
  50.8 GB against the 5 GB quota in Aug 2026 and were fixed; both independently re-verified
  stopped as of 2026-09-02. **Read `docs/history/egress-incidents.md` before touching
  `src/instrumentation.ts` or the capability-cache hydration in `route.ts`** — both carry fixes a
  plausible-looking refactor would silently undo (e.g. distinguishing "never checked" from
  "checked, found nothing" in the hydration guard; the two-COUNT cheap bootstrap probe instead of
  a full-table prefetch).
- The bootstrap completeness guard bans `assetIdentity.count(` outright as a proxy for "never
  aggregate over the whole table" — any new completeness check must be corpus-scoped and
  intersected against an explicit expected-slug list, never a bare `count()`.

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
- Branch for current work (canonical): `main`.
- Do NOT create PRs unless explicitly asked. Do NOT push to other branches.
- Do NOT redesign UI, navigation, or touch Hindi/Sanskrit subject architecture.
- **No boards/curricula yet (owner, 2026-09-25):** there is no CBSE, ICSE or any other board mapping in the product. Work subject by subject on the canonical KGs only — never add, assume or optimise for a board/syllabus mapping unless the owner says so.
- **AI provider (owner, 2026-09-25): Groq first, from now on.** Keep the default chain Groq -> Gemini -> OpenRouter; Gemini is fallback only. Never set `AI_PROVIDER_MODE=gemini_only`. If production logs show Groq `spend_limit_reached`, tell the owner (it is a Groq-console/`GROQ_API_KEY` fix, not a code fix).

## Repository branch policy (binding)
- `main` is THE only active working branch. Check out `main`, commit on `main`, push to `main` —
  this OVERRIDES any session-designated feature branch a harness may configure: if a session
  starts on `claude/*`, switch to `main` first (`git checkout main && git fetch origin main &&
  git merge --ff-only origin/main` on a clean tree), then also push the feature branch pointer so
  the harness's own tracking stays in sync (`git push origin HEAD:main && git push origin
  HEAD:<feature-branch>`).
- Never force-push any shared branch, never rebase/rewrite public history, never create a PR
  unless explicitly asked. Pre-2026-07-15 branches (`claude/my-tutor-foundation-KDSUO` and
  siblings) are ARCHIVED read-only snapshots — do not commit to, merge forward, or branch from
  them. Full history: `docs/history/repository-branch-policy-superseded.md`.
- Production deploys from `main`; Vercel Production Branch should point at `main` (owner-only to
  verify/change — no session in this environment has Vercel env-var/branch-config credentials).

## Where to find live subject/asset state (don't trust a number in this file — regenerate it)
- Mathematics: `npx tsx scripts/math/state.ts`
- Physics: `npx tsx scripts/physics/state.ts`
- Asset-contract readiness (all subjects, incl. KG-registered-but-unauthored ones):
  `npx tsx scripts/assets/contract-audit.ts [--subject <name>] [--all]`
- Seed-corpus dry-run (no DB write, confirms no duplicate canonicalSlugs):
  `npx tsx scripts/brain/seed-knowledge-assets.ts --draft --dry-run`

## Current campaign — "fix physics/english/chemistry" (owner-scoped, in progress)
Owner instruction: fix physics, english, chemistry; computer_science/mathematics content work
remains explicitly PAUSED (do not resume without a fresh instruction). Chemistry and physics are
content-complete at asset-contract (186/186, 261/261) — remaining work there is defect-hunting
only. English is at 321/412 asset-contract pairs (91 short, mostly ADULT-band `eng.composition/
communication/linguistics/literature/phonetics/vocab/writing` advanced tiers) — both close the
gap AND defect-hunt the servable 321. Full running log, known-open defects (ASCII-art fallback
figures, the content-free hold, the still-unresolved C7 repeat channel), and the saturated-account
finding above: `docs/history/subject-onboarding-and-fix-campaign.md`.
**Physics master completion pass (2026-09-24)**: 3 grading/assessment defects fixed and verified in
production; remaining items are non-blocking. Details, evidence and the QA harness
(`scripts/qa/physicsProductionRuntimeQa.ts`) are in the same history file's dated section.

## Mathematics asset-contract campaign (PAPPU account, owner-scoped, in progress — un-paused by
## explicit fresh instruction naming Mathematics; CS remains paused above; do not touch Biology,
## owned by the Mohd account on this same shared `main`)
**Full handover, pickup instructions, exact registration mechanics, and current frontier:
`docs/architecture/MATHEMATICS_ASSET_CAMPAIGN_HANDOVER.md` — read it in full before continuing.**
Headline: Mathematics EB is COMPLETE (908/908, do not re-author) but EB completion never meant
servable content — at last measurement 334/908 concepts had actual seed assets (343
concept/gradeBand pairs, all 343 at contract, 0 short, 0 never-quizzable). Three domains taken to
100% this campaign (`math.cat` 15/15, `math.abst` 37/37); `math.alg` opened and advanced to
24/59, the active frontier. Re-measure everything with `npx tsx scripts/assets/contract-audit.ts
--subject mathematics` before trusting any number here — this line will go stale the moment
either campaign pushes again.

## Biology end-user readiness program (2026-09-20, owner-scoped, in progress — un-paused by
## explicit fresh instruction naming Biology; math/CS remain paused above)
Full Wave 0 audit, findings, and next-wave plan: `docs/architecture/BIOLOGY_READINESS_AUDIT.md`
(read this before continuing). Headline: production held 0 EXPLANATION/PROBE rows for biology
despite 108 concepts being authored, because a P-10 abandoned-legacy-slug guard in
`src/instrumentation.ts` had been aborting the ENTIRE cross-subject asset bootstrap (all
subjects, not just biology) on every cold start since >=2026-09-15 — 45 live Mathematics rows,
fixed via the exact reversible status-only precedent in `docs/CLAUDE_HANDOVER.md` §9r/§9s, then
verified via two forced redeploys (bootstrap now runs its real write path instead of aborting).
Probe-depth Batch 1-15 (`biologyDepthSeedAssets.ts`, `bio.found` then `bio.cell` then `bio.mol`
then `bio.physio` then `bio.gen` then `bio.eco` then `bio.evo` then `bio.micro` then `bio.div`
then `bio.plant` then `bio.repro` then `bio.immuno` then `bio.sys` then `bio.biotech` then
`bio.bioinfo`+`bio.dev`) closed the same zero-slack defect physics/chemistry already had:
every one of biology's 108 originally-authored concepts was stuck at 2/3 gradeable probes, so
no biology lesson could ever reach verified mastery — **the entire original 108-concept
probe-depth campaign is now COMPLETE: 108/108 at the 3-probe contract floor.** The 91
2026-09-14-KG-extension concepts remain a SEPARATE, larger, not-yet-started task (see below).
**FORMAL EDUCATIONAL BRAIN AUTHORING IS COMPLETE: 199/199 (2026-09-21).**
Authoring started 2026-09-20 at the KG root, `bio.found.what-is-biology`, and
proceeded in strict KG-prerequisite order across 61 successive batches (each
recomputing the fresh topologically-ready frontier from the prior baseline — see
COVERAGE.md's biology row for the full per-batch concept list and the exhaustive
per-batch authoring history) through all 199 concepts in
`educational-brain/concepts/biology/` (no Blueprint exists for biology as a subject).
89 entries were authored entirely from first principles (see COVERAGE.md's biology
row for the full list); thirty-nine entries record genuine KG-description-vs-seed-
content gaps as Curriculum Feedback rather than fabricating content. The final batch
(from the 197-concept baseline) added `bio.bioinfo.multiomics-statistical-genomics`
and `bio.sys.quantitative-systems-modeling`, both first-principles-authored — the
twenty-seventh consecutive fully zero-seed-content batch, closing out a run that
began at batch 35.
**This formal-EB completion does NOT mean production-servable content.** Two
separate counters exist for this program and must never be conflated: (1) the
ORIGINAL 108-concept probe-depth campaign is COMPLETE (108/108 at the 3-probe
contract floor, tracked in `biologyDepthSeedAssets.ts`'s own header); (2) the
91-concept 2026-09-14 KG-extension pool (`bio.behav`/`bio.neuro` and most concepts
authored from roughly batch 28 onward) had ZERO seed content of any kind — now
un-paused by an explicit fresh owner instruction ("MOHD — BIOLOGY NEXT PHASE",
2026-09-21) naming this exact follow-on work; see the campaign entry immediately
below.

## Biology 91-concept extension asset-seeding campaign (2026-09-21, owner-scoped,
## in progress — un-paused by the explicit "MOHD — BIOLOGY NEXT PHASE" instruction)
Full Phase-1 audit (exact 91-concept enumeration, domain/difficulty/bloom
breakdown, cross-subject-link inventory, architecture decision):
`docs/architecture/BIOLOGY_91_EXTENSION_ASSET_INVENTORY.md`. Headline: the 91
KG-extension concepts all have completed EB entries but zero production content
(`scripts/assets/contract-audit.ts --subject biology` measured 108/199 authored
before this campaign). New file `src/lib/teaching/assets/
biologyExtensionSeedAssets.ts` (wired into `src/instrumentation.ts` and
`scripts/brain/seed-knowledge-assets.ts` exactly where `BIOLOGY_EXPLANATIONS`/
`BIOLOGY_PROBES`/`BIOLOGY_DEPTH_PROBES` already are) holds all 91 concepts'
content, grown batch by batch like `biologyDepthSeedAssets.ts` itself was —
content transcribed directly from each concept's own completed EB entry, in
strict KG-prerequisite order. Every concept ships >= 1 explanation and the full
3-probe contract (mcq + misconception_probe + a genuinely different third
capability, via the unused `short_answer` closed-choice kind) from its FIRST
commit, avoiding the exact 2-probe defect the original 108 needed a later
depth-campaign to fix. Batch 1 (2026-09-21, 3 concepts: `bio.found.scientific-
method-in-biology`, `bio.found.unifying-themes-in-biology` — closing the entire
`bio.found` domain gap — and `bio.behav.innate-behavior-instinct`, the root of
the `bio.behav` domain gap) validated clean: `tsc --noEmit` 0 new errors, dry-run
seed script 0 duplicate identities across the full 8,256-item corpus, contract
audit 111/199 authored, 111/111 at contract, 0 short, 0 never-quizzable. Batch 2
(2026-09-21, 3 concepts: `bio.behav.animal-communication`, `bio.neuro.brain-
regional-organization` — root of the `bio.neuro` domain gap, opening 5 further
concepts — and `bio.div.animal-body-plans-symmetry` — root of the `bio.div`
domain gap) validated clean the same way: `tsc --noEmit` 0 errors, dry-run 0
duplicate identities across 8,271 items, contract audit 114/199 authored,
114/114 at contract, 0 short, 0 never-quizzable. Batch 3 (2026-09-21, 3
concepts: `bio.neuro.neurotransmitter-systems`, `bio.neuro.sensory-
transduction` — both further `bio.neuro` roots — and `bio.div.invertebrate-
diversity-major-phyla` — now ready, opens `bio.div.arthropod-diversity` and
`bio.div.echinoderm-deuterostome-diversity`) validated clean: `tsc --noEmit`
0 errors, dry-run 0 duplicate identities across 8,286 items, contract audit
117/199 authored, 117/117 at contract, 0 short, 0 never-quizzable. Batch 4
(2026-09-21, 3 concepts: `bio.neuro.neural-circuits-computation` — both
prerequisites, batch 3's `bio.neuro.neurotransmitter-systems` and batch 2's
`bio.neuro.brain-regional-organization`, now served — `bio.neuro.vision-
visual-system` — its sole prerequisite, batch 3's `bio.neuro.sensory-
transduction`, now served — and `bio.div.arthropod-diversity` — its sole
prerequisite, batch 3's `bio.div.invertebrate-diversity-major-phyla`, now
served) validated clean: `tsc --noEmit` 0 errors, dry-run 0 duplicate
identities across 8,301 items, contract audit 120/199 authored, 120/120 at
contract, 0 short, 0 never-quizzable, 40/40 targeted vitest suites passing.
Batch 5 (2026-09-21, 3 concepts: `bio.neuro.learning-memory-neurobiology` —
its sole prerequisite, batch 4's `bio.neuro.neural-circuits-computation`, now
served; opens 3 further concepts — `bio.div.echinoderm-deuterostome-diversity`
— its sole prerequisite, batch 3's `bio.div.invertebrate-diversity-major-
phyla`, now served; opens `bio.div.chordate-vertebrate-diversity` — and
`bio.neuro.audition-vestibular-system` — its sole prerequisite, batch 3's
`bio.neuro.sensory-transduction`, now served) validated clean: `tsc --noEmit`
0 errors, dry-run 0 duplicate identities across 8,316 items, contract audit
123/199 authored, 123/123 at contract, 0 short, 0 never-quizzable, 40/40
targeted vitest suites passing. Batch 6 (2026-09-21, 3 concepts:
`bio.div.chordate-vertebrate-diversity` — its sole prerequisite, batch 5's
`bio.div.echinoderm-deuterostome-diversity`, now served; opens 3 further
concepts (`bio.div.fish-amphibian-diversity`, `bio.div.reptile-bird-diversity`,
`bio.div.mammalian-diversity`) — `bio.neuro.cognitive-neuroscience-
consciousness` — both prerequisites, batch 5's `bio.neuro.learning-memory-
neurobiology` and batch 2's `bio.neuro.brain-regional-organization`, now
served — and `bio.behav.learning-and-behavior` — both prerequisites, batch 1's
`bio.behav.innate-behavior-instinct` and batch 5's `bio.neuro.learning-memory-
neurobiology`, now served) validated clean: `tsc --noEmit` 0 errors, dry-run 0
duplicate identities across 8,331 items, contract audit 126/199 authored,
126/126 at contract, 0 short, 0 never-quizzable, 40/40 targeted vitest suites
passing. Batch 7 (2026-09-21, 3 concepts: `bio.behav.animal-cognition` — both
prerequisites, batch 6's `bio.behav.learning-and-behavior` and
`bio.neuro.cognitive-neuroscience-consciousness`, now served — closing the
`bio.behav` domain entirely — `bio.neuro.neurodegenerative-disease` — its sole
prerequisite, batch 5's `bio.neuro.learning-memory-neurobiology`, now served —
and `bio.div.fish-amphibian-diversity` — its sole prerequisite, batch 6's
`bio.div.chordate-vertebrate-diversity`, now served) validated clean:
`tsc --noEmit` 0 errors, dry-run 0 duplicate identities across 8,346 items,
contract audit 129/199 authored, 129/129 at contract, 0 short, 0
never-quizzable, 40/40 targeted vitest suites passing. Batch 8 (2026-09-21, 3
concepts: `bio.div.reptile-bird-diversity` and `bio.div.mammalian-diversity` —
both prerequisite batch 6's `bio.div.chordate-vertebrate-diversity`, now
served, closing the entire vertebrate-diversity chain (fish/amphibian,
reptile/bird, mammalian) opened by that overview — and `bio.neuro.sleep-
circadian-biology` — its sole prerequisite, batch 2's `bio.neuro.brain-
regional-organization`, now served) validated clean: `tsc --noEmit` 0 errors,
dry-run 0 duplicate identities across 8,361 items, contract audit 132/199
authored, 132/132 at contract, 0 short, 0 never-quizzable, 40/40 targeted
vitest suites passing. Batch 9 (2026-09-21, 3 concepts:
`bio.physio.blood-physiology-hemostasis`, `bio.physio.endocrine-disorders-
feedback`, and `bio.physio.integumentary-system` — all three sole-
prerequisite on already-served `bio.physio.circulatory-system` or
`bio.physio.endocrine-system`) validated clean: `tsc --noEmit` 0 errors,
dry-run 0 duplicate identities across 8,376 items, contract audit 135/199
authored, 135/135 at contract, 0 short, 0 never-quizzable, 40/40 targeted
vitest suites passing. Batch 10 (2026-09-21, 3 concepts:
`bio.physio.homeostasis-thermoregulation`, `bio.physio.lymphatic-system-
detail`, and `bio.physio.muscle-physiology-energetics` — all with
prerequisites already served in the original 108) validated clean:
`tsc --noEmit` 0 errors, dry-run 0 duplicate identities across 8,391 items,
contract audit 138/199 authored, 138/138 at contract, 0 short, 0
never-quizzable, 40/40 targeted vitest suites passing. Batch 11 (2026-09-21, 3
concepts: `bio.physio.exercise-physiology` — prerequisites batch 10's
`bio.physio.muscle-physiology-energetics` and already-served
`bio.physio.respiratory-system`, now served — `bio.physio.comparative-
animal-physiology` — prerequisites `bio.physio.respiratory-system` and
`bio.physio.circulatory-system`, both already served — and `bio.plant.plant-
tissue-systems` — its sole prerequisite `bio.cell.eukaryotic-cell`, already
served; opens 4 further concepts (`secondary-growth-anatomy`,
`plant-defense-mechanisms`, `plant-stress-physiology`,
`mycorrhizae-plant-symbioses`)) validated clean: `tsc --noEmit` 0 errors,
dry-run 0 duplicate identities across 8,406 items, contract audit 141/199
authored, 141/141 at contract, 0 short, 0 never-quizzable, 40/40 targeted
vitest suites passing. Batch 12 (2026-09-21, 3 concepts:
`bio.plant.secondary-growth-anatomy` — its sole prerequisite batch 11's
`bio.plant.plant-tissue-systems`, now served — `bio.repro.animal-
reproductive-strategies` — its sole prerequisite `bio.repro.human-
reproductive-system`, already served — and `bio.repro.hormonal-regulation-
reproduction-detail` — prerequisites `bio.repro.human-reproductive-system`
and `bio.physio.endocrine-system`, both already served) validated clean:
`tsc --noEmit` 0 errors, dry-run 0 duplicate identities across 8,421 items,
contract audit 144/199 authored, 144/144 at contract, 0 short, 0
never-quizzable, 40/40 targeted vitest suites passing. Batch 13 (2026-09-21, 3
concepts: `bio.neuro.autonomic-stress-physiology` — prerequisites
`bio.neuro.brain-regional-organization` and `bio.physio.endocrine-system`,
both already served — `bio.plant.seed-germination-dormancy` — its sole
prerequisite `bio.repro.sexual-reproduction-plants`, already served — and
`bio.plant.plant-biotechnology-applications` — prerequisites
`bio.biotech.biotech-process-applications` and `bio.plant.plant-growth-
hormones`, both already served) validated clean: `tsc --noEmit` 0 errors,
dry-run 0 duplicate identities across 8,436 items, contract audit 147/199
authored, 147/147 at contract, 0 short, 0 never-quizzable, 40/40 targeted
vitest suites passing. Batch 14 (2026-09-21, 3 concepts:
`bio.plant.phytochrome-photoperiodic-flowering` — its sole prerequisite
`bio.plant.plant-growth-hormones`, already served — `bio.cell.cytoskeleton-
motility` — its sole prerequisite `bio.cell.cytoskeleton`, already served —
and `bio.cell.membrane-transport-energetics` — prerequisites
`bio.cell.cell-membrane-transport` and `bio.mol.bioenergetics`, both already
served; preserves the KG's `chem.thermo.gibbs` cross-subject link) validated
clean: `tsc --noEmit` 0 errors, dry-run 0 duplicate identities across 8,451
items, contract audit 150/199 authored, 150/150 at contract, 0 short, 0
never-quizzable, 40/40 targeted vitest suites passing. Batch 15 (2026-09-21, 3
concepts: `bio.cell.anaerobic-respiration-fermentation` — its sole
prerequisite `bio.plant.plant-respiration`, already served; preserves the
KG's `chem.redox.oxidation-state` cross-subject link — `bio.mol.metabolic-
regulation-integration` — prerequisites `bio.mol.enzymes` and
`bio.mol.bioenergetics`, both already served; preserves the KG's
`chem.bio.enzyme-kinetics` and `chem.kinet.catalysis` cross-subject links —
and `bio.mol.protein-quality-control-autophagy` — prerequisites
`bio.mol.proteins-structure` and `bio.cell.endomembrane-system`, both already
served) validated clean: `tsc --noEmit` 0 errors, dry-run 0 duplicate
identities across 8,466 items, contract audit 153/199 authored, 153/153 at
contract, 0 short, 0 never-quizzable, 40/40 targeted vitest suites passing.
Batch 16 (2026-09-21, 3 concepts: `bio.cell.cell-junctions-extracellular-
matrix` — its sole prerequisite `bio.cell.cell-membrane-transport`, already
served; opens `bio.cell.cell-adhesion-tissue-organization` — `bio.mol.
alternative-splicing-rna-diversity` — its sole prerequisite
`bio.mol.transcription`, already served — and `bio.sys.quantitative-systems-
modeling` — its sole prerequisite `bio.sys.gene-regulatory-networks`,
already served; preserves the KG's `math.de.ode` and `math.calc.partial-
derivatives` cross-subject links) validated clean: `tsc --noEmit` 0 errors,
dry-run 0 duplicate identities across 8,481 items, contract audit 156/199
authored, 156/156 at contract, 0 short, 0 never-quizzable, 40/40 targeted
vitest suites passing. Batch 17 (2026-09-21, 3 concepts:
`bio.cell.cell-adhesion-tissue-organization` — its sole prerequisite batch
16's `bio.cell.cell-junctions-extracellular-matrix`, now served; opens
`bio.cell.cancer-biology-hallmarks` — `bio.mol.chromatin-structure-genome-
organization` — prerequisites `bio.mol.epigenetics` and
`bio.cell.nucleus-chromosomes`, both already served — and
`bio.micro.microbial-metabolism-diversity` — its sole prerequisite
`bio.micro.microbial-diversity`, already served; opens
`bio.micro.archaea-extremophiles`) validated clean: `tsc --noEmit` 0 errors,
dry-run 0 duplicate identities across 8,496 items, contract audit 159/199
authored, 159/159 at contract, 0 short, 0 never-quizzable, 40/40 targeted
vitest suites passing. Batch 18 (2026-09-21, 3 concepts:
`bio.cell.cancer-biology-hallmarks` — prerequisites `bio.cell.cell-cycle`,
`bio.cell.apoptosis` (both already served) and batch 17's
`bio.cell.cell-adhesion-tissue-organization`, now served — `bio.micro.
archaea-extremophiles` — prerequisites `bio.div.three-domain-system`
(already served) and batch 17's `bio.micro.microbial-metabolism-diversity`,
now served — and `bio.micro.human-microbiome-detail` — prerequisites
`bio.micro.microbial-diversity` and `bio.physio.digestive-system`, both
already served) validated clean: `tsc --noEmit` 0 errors, dry-run 0 duplicate
identities across 8,511 items, contract audit 162/199 authored, 162/162 at
contract, 0 short, 0 never-quizzable, 40/40 targeted vitest suites passing.
Batch 19 (2026-09-21, 3 concepts: `bio.eco.microbial-ecology` — prerequisites
`bio.micro.microbial-diversity` and `bio.eco.ecosystem-structure-function`,
both already served — `bio.immuno.cytokines-immune-signaling` — its sole
prerequisite `bio.immuno.innate-adaptive-immunity`, already served — and
`bio.micro.antimicrobial-resistance` — prerequisites
`bio.micro.pathogenic-microbes` and `bio.micro.horizontal-gene-transfer`,
both already served) validated clean: `tsc --noEmit` 0 errors, dry-run 0
duplicate identities across 8,526 items, contract audit 165/199 authored,
165/165 at contract, 0 short, 0 never-quizzable, 40/40 targeted vitest suites
passing. Batch 20 (2026-09-21, 3 concepts: `bio.gen.quantitative-genetics-
heritability` — sole prerequisite `bio.gen.population-genetics`, already
served — `bio.gen.conservation-genetics` — prerequisites
`bio.gen.population-genetics` and `bio.eco.biodiversity-conservation`, both
already served — and `bio.immuno.t-cell-development-tolerance` — sole
prerequisite `bio.immuno.mhc-antigen-presentation`, already served, opens
`bio.immuno.cancer-immunology-immunotherapy`) validated clean: `tsc --noEmit`
0 errors, dry-run 0 duplicate identities across 8,541 items, contract audit
168/199 authored, 168/168 at contract, 0 short, 0 never-quizzable, 40/40
targeted vitest suites passing. Batch 21 (2026-09-21, 3 concepts:
`bio.eco.population-growth-models-quantitative` — sole prerequisite
`bio.eco.population-ecology`, already served, opens
`bio.eco.predator-prey-dynamics` and `bio.eco.global-change-biology` —
`bio.behav.mating-systems-sexual-selection` — prerequisites
`bio.behav.animal-communication` and `bio.evo.natural-selection`, both
already served, opens `bio.behav.social-behavior-eusociality` — and
`bio.bioinfo.genome-sequencing-technologies` — prerequisites
`bio.bioinfo.bioinformatics-intro` and `bio.biotech.genomics-proteomics`,
both already served, opens `bio.bioinfo.comparative-genomics`) validated
clean: `tsc --noEmit` 0 errors, dry-run 0 duplicate identities across 8,556
items, contract audit 171/199 authored, 171/171 at contract, 0 short, 0
never-quizzable, 40/40 targeted vitest suites passing. Batch 22
(2026-09-21, 3 concepts: `bio.behav.social-behavior-eusociality` — sole
prerequisite batch 21's `bio.behav.mating-systems-sexual-selection`, now
served, opens `bio.behav.kin-selection-altruism` —
`bio.bioinfo.comparative-genomics` — prerequisites batch 21's
`bio.bioinfo.genome-sequencing-technologies` and already-served
`bio.bioinfo.sequence-alignment`, opens
`bio.bioinfo.multiomics-statistical-genomics` — and
`bio.eco.predator-prey-dynamics` — sole prerequisite batch 21's
`bio.eco.population-growth-models-quantitative`, now served; preserves the
KG's `math.de.ode` and `math.de.nonlinear-ode` cross-subject links)
validated clean: `tsc --noEmit` 0 errors, dry-run 0 duplicate identities
across 8,571 items, contract audit 174/199 authored, 174/174 at contract, 0
short, 0 never-quizzable, 40/40 targeted vitest suites passing. Batch 23
(2026-09-21, 3 concepts: `bio.behav.kin-selection-altruism` — prerequisites
batch 22's `bio.behav.social-behavior-eusociality` and already-served
`bio.gen.population-genetics`, opens
`bio.behav.human-behavioral-ecology-evolutionary-psych` —
`bio.immuno.cancer-immunology-immunotherapy` — prerequisites
already-served `bio.immuno.immune-disorders` and batch 20's
`bio.immuno.t-cell-development-tolerance` — and
`bio.eco.global-change-biology` — prerequisites already-served
`bio.eco.environmental-issues` and batch 21's
`bio.eco.population-growth-models-quantitative`, closing the second branch
that batch 21 opened) validated clean: `tsc --noEmit` 0 errors, dry-run 0
duplicate identities across 8,586 items, contract audit 177/199 authored,
177/177 at contract, 0 short, 0 never-quizzable, 40/40 targeted vitest
suites passing. Batch 24 (2026-09-21, 3 concepts — the KG-prerequisite
frontier reached ALL 22 remaining extension concepts simultaneously ready
this batch, so selection prioritised closing entire domains outright:
`bio.bioinfo.multiomics-statistical-genomics` — prerequisites already-
served `bio.bioinfo.structural-bioinformatics` and batch 22's
`bio.bioinfo.comparative-genomics`, CLOSING the entire `bio.bioinfo` domain
gap; preserves the KG's `math.stats.hypothesis-testing` and
`math.stats.chi-squared-test` cross-subject links — `bio.behav.foraging-
behavior` — prerequisites already-served `bio.behav.innate-behavior-
instinct` and `bio.eco.population-ecology`; preserves the KG's
`math.calc.optimization` cross-subject link — and `bio.behav.human-
behavioral-ecology-evolutionary-psych` — prerequisites batch 23's
`bio.behav.kin-selection-altruism` and already-served `bio.evo.human-
evolution`; together with foraging-behavior, CLOSING the entire `bio.behav`
domain gap) validated clean: `tsc --noEmit` 0 errors, dry-run 0 duplicate
identities across 8,601 items, contract audit 180/199 authored, 180/180 at
contract, 0 short, 0 never-quizzable, 40/40 targeted vitest suites passing.
Batch 25 (2026-09-21, 3 concepts — all 19 remaining extension concepts were
simultaneously ready this batch too; selection again prioritised closing a
domain outright: `bio.biotech.agricultural-forensic-biotechnology`,
`bio.biotech.bioprocess-engineering`, and `bio.biotech.gene-therapy-detail`
— prerequisites already-served `bio.biotech.biotech-process-applications`,
`bio.biotech.biotech-principles`, and `bio.biotech.crispr-genome-editing`
respectively — CLOSING the entire remaining `bio.biotech` domain gap)
validated clean: `tsc --noEmit` 0 errors, dry-run 0 duplicate identities
across 8,616 items, contract audit 183/199 authored, 183/183 at contract, 0
short, 0 never-quizzable, 40/40 targeted vitest suites passing. Batch 26
(2026-09-21, 3 concepts — all 16 remaining extension concepts were
simultaneously ready again; selection closed another domain outright:
`bio.dev.aging-senescence-biology`, `bio.dev.organogenesis`, and
`bio.dev.regeneration-biology` — prerequisites already-served
`bio.dev.stem-cells-regeneration` (aging and regeneration) and
`bio.dev.morphogenesis-differentiation` (organogenesis) — CLOSING the
entire remaining `bio.dev` domain gap) validated clean: `tsc --noEmit` 0
errors, dry-run 0 duplicate identities across 8,631 items, contract audit
186/199 authored, 186/186 at contract, 0 short, 0 never-quizzable, 40/40
targeted vitest suites passing. Batch 27 (2026-09-21, 3 concepts — all 13
remaining extension concepts were simultaneously ready again; selection
closed another domain outright: `bio.eco.applied-ecology-ecosystem-
services`, `bio.eco.biogeochemistry-advanced`, and `bio.eco.landscape-
conservation-ecology` — prerequisites already-served `bio.eco.biodiversity-
conservation` (applied-ecology and landscape-conservation) and
`bio.eco.nutrient-cycling` (biogeochemistry) — CLOSING the entire remaining
`bio.eco` domain gap) validated clean: `tsc --noEmit` 0 errors, dry-run 0
duplicate identities across 8,646 items, contract audit 189/199 authored,
189/189 at contract, 0 short, 0 never-quizzable, 40/40 targeted vitest
suites passing. Batch 28 (2026-09-21, 3 concepts — all 10 remaining
extension concepts were simultaneously ready again; selection closed
another domain outright: `bio.plant.mycorrhizae-plant-symbioses`,
`bio.plant.plant-defense-mechanisms`, and `bio.plant.plant-stress-
physiology` — prerequisites already-served `bio.plant.plant-tissue-
systems` (all three), `bio.plant.mineral-nutrition` and `bio.div.fungal-
biology` (mycorrhizae), `bio.mol.signal-transduction-pathways` (plant-
defense, preserving the KG's `chem.org.aromaticity` cross-subject link),
and `bio.plant.plant-water-relations` (plant-stress) — CLOSING the entire
remaining `bio.plant` domain gap) validated clean: `tsc --noEmit` 0
errors, dry-run 0 duplicate identities across 8,661 items, contract audit
192/199 authored, 192/192 at contract, 0 short, 0 never-quizzable, 40/40
targeted vitest suites passing. Batch 29 (2026-09-21, 3 concepts — all 7
remaining extension concepts were simultaneously ready; selected the first
3 of `bio.evo`'s 4 remaining): `bio.evo.coevolution-species-interactions`
— prerequisites already-served `bio.evo.natural-selection` and
`bio.eco.population-ecology` — `bio.evo.convergent-evolution-homoplasy` —
prerequisites already-served `bio.evo.evidence-for-evolution` and
`bio.div.cladistics-phylogenetic-thinking` — and
`bio.evo.macroevolution-extinction` — sole prerequisite already-served
`bio.evo.modern-synthesis-speciation`) validated clean: `tsc --noEmit` 0
errors, dry-run 0 duplicate identities across 8,676 items, contract audit
195/199 authored, 195/195 at contract, 0 short, 0 never-quizzable, 40/40
targeted vitest suites passing. Batch 30 — the FINAL batch of this
campaign (2026-09-21, 4 concepts, all 4 remaining were simultaneously
ready): `bio.evo.phylogeography-biogeography` — prerequisites already-
served `bio.evo.evidence-for-evolution` and `bio.bioinfo.phylogenetics-
computational` — `bio.gen.genetic-testing-counseling` — sole prerequisite
already-served `bio.gen.pedigree-human-genetics` — `bio.neuro.
neurodevelopment` — prerequisites already-served `bio.neuro.brain-
regional-organization` and `bio.dev.morphogenesis-differentiation` — and
`bio.sys.evolutionary-systems-biology` — prerequisites already-served
`bio.sys.gene-regulatory-networks` and `bio.evo.molecular-evolution` —
validated clean: `tsc --noEmit` 0 errors, dry-run 0 duplicate identities
across 8,696 items, contract audit **199/199 authored, 199/199 at
contract, 0 short, 0 never-quizzable**, 40/40 targeted vitest suites
passing.

**CAMPAIGN COMPLETE: Extended 91: 91/91.** All 91 2026-09-14-KG-extension
concepts now have production-ready seed content (2 explanations + full
3-probe contract each), closing the gap this campaign was scoped to close.
Combined with the original 108-concept probe-depth campaign (also
complete, 108/108 at the 3-probe contract floor), the ENTIRE 199-concept
biology KG is now at asset-contract completion: 199/199 authored, 199/199
at contract, 0 short, 0 never-quizzable — re-verify with `npx tsx
scripts/assets/contract-audit.ts --subject biology` before trusting this
number in future sessions. 30 batches total, every one committed and
pushed individually to `main` (batch 1 through this final batch 30) with
clean `tsc --noEmit`, 0 duplicate seed-corpus identities, and 40/40
targeted vitest suites passing at every checkpoint.

**Production convergence (seed corpus → cold-start bootstrap → live
AssetIdentity rows) remains UNVERIFIED against the real database — no
Supabase/DB access was used at any point in this campaign.** Runtime QA
(does a lesson actually reach verified mastery end-to-end for these 91
concepts) and real-learner QA are NOT STARTED. These are the explicit next
steps for whichever future session/initiative picks this up, per the
standing "never claim production verification without querying/verifying
production" rule — do not treat asset-contract completion as equivalent to
confirmed production readiness.

**2026-09-22 update — production convergence verified, 3 batch-split defects found and repaired,
and a CRITICAL runtime-blocking gap discovered.** An owner-authorized SQL-equivalent write (via
`mcp__Supabase__execute_sql` against production project `ywakxiqbevfuxsiwewnw`, generated
verbatim from the same canonical source files, no invented content) applied every
`asset_identity`/`explanation_assets`/`probe_assets` row this campaign and the original 108-concept
campaign had produced. Fresh read-only verification found 3 defects, all traced to one batch
transaction (`b092.sql`) that aborted partway through when concatenated with `b091.sql`: a hollow
`PROBE` identity (`bio.physio.homeostasis-thermoregulation:short_answer:en:high`, identity row
with no `probe_assets` child) and two concepts with ZERO probes at all
(`bio.physio.lymphatic-system-detail`, `bio.physio.muscle-physiology-energetics`). Repaired by
re-running the exact original INSERT statements (idempotent `WHERE NOT EXISTS`/`WHERE EXISTS AND
NOT EXISTS` guards, same canonical text, nothing invented). Re-verification after repair:
**199/199 explanation coverage, 199/199 probe coverage, 0 hollow asset identities, 0 duplicate
canonicalSlugs, 0 cross-subject contamination** — all five required criteria pass.
Phase-2 real-learner runtime QA (`scripts/qa/biologyProductionRuntimeQa.ts`, a disposable-account
harness driving the actual deployed app) then found a **blocking production defect that asset-
contract completion cannot see**: `POST /api/sessions` 404s with `"Subject not found"` for
`subjectSlug=biology`, because the global `subjects` catalog table has rows only for
`english`/`mathematics`/`physics`/`chemistry` — **no `biology` row exists at all**. This is a
different table from the one `GET /api/curriculum?subject=biology` reads (that one serves all 199
lessons fine), so curriculum/KG completeness gave no signal of this. **No real learner can open a
Biology lesson session in production today, regardless of asset-contract completeness.** This was
NOT fixed in this session (inserting into the global `subjects` catalog is a schema/catalog change
outside the 3 named-defect repair scope and needs an explicit owner decision, not a unilateral
session call) — it is the actual next blocker for whichever session picks this up next, ahead of
any further content work on biology.

**2026-09-22 update #2 — dependency audit, `subjects` row unblocked via the app's own upsert (no
SQL/migration), and real Phase-2 runtime QA executed.** A read-only audit traced every dependent
of `subjects.slug` (full trace: session transcript; not written to a separate doc) and found: (a)
`SubjectType.BIOLOGY` and a correct `biology` entry in `src/lib/curriculum/subjectCatalog.ts`
already existed; (b) `/api/subjects/enroll` and `/api/onboarding` already contain a self-healing
`prisma.subject.upsert({where:{slug}, create:{...}})` keyed off `findLibrarySubject(slug)`, which
searches ALL catalog subjects regardless of rollout status — this is the same mechanism that
created the current 4 production rows (`prisma/seed.ts` is stale and unused for this purpose); (c)
the ONLY reason biology had no row is `src/lib/curriculum/subjectRollout.ts`'s
`EDUCATIONAL_BRAIN_SUBJECTS` allowlist excluding it, which hides it from onboarding/enroll/library
UI so the self-healing upsert was never triggered by a real user; (d) that allowlist does NOT
gate the core asset-identity memory-serving pipeline (confirmed zero references to it under
`src/lib/teaching/`) — only 4 supplementary ADR-14-era prompt-injection blocks in
`chat/route.ts`; (e) no billing/entitlement logic keys off which subjects exist. Per owner
instruction, the row was created via the **application endpoint itself** (`POST
/api/subjects/enroll` with `{"subjectSlug":"biology"}`, called from a disposable QA account after
completing onboarding under the already-existing `english` subject) — no raw SQL, no migration,
no source change, `EDUCATIONAL_BRAIN_SUBJECTS` and onboarding/library rollout untouched. Verified
before/after: `subjects` went from 4 rows to 5, the 4 pre-existing rows byte-identical
(same ids/names/types), new row `{slug:"biology", type:"BIOLOGY", name:"Biology"}`.
`scripts/qa/biologyProductionRuntimeQa.ts` then ran successfully end-to-end for the first time
(previously blocked): real sessions, real lesson-init, real multi-turn grading through
`bio.physio.homeostasis-thermoregulation` and `bio.physio.lymphatic-system-detail` (the two
concepts repaired in update #1) plus a visual-grounding check on `bio.plant.photosynthesis`. DB
cross-check (`topic_progress`, `evidence_events`, `lesson_attempts`) confirmed the serving pipeline
is real and honest: `ASSET_SHOWN`/`MISCONCEPTION_DETECTED`/`PROBE_OUTCOME` evidence events fired
correctly (including on the deliberately-wrong answer fed to the harness), `TopicProgress` landed
at `status:REVISION, masteryPct:25` for both concepts (attempts 3 and 7) — **verified MASTERY was
NOT reached in this run**, and critically the tutor's own closing text ("I wasn't able to confirm
it... I'll mark it for a quick follow-up rather than call it fully mastered") matched the DB
exactly — no prose-vs-evidence mismatch found. `bio.plant.photosynthesis` has an ACTIVE visual
asset in the DB but **no turn across 11 turns ever returned a visual/visualSpec/sceneSpec field**;
the tutor correctly never claimed one existed when directly asked ("I don't have a picture I can
display here") — safe behavior, but a real visual-delivery gap distinct from the asset existing.
Two occurrences of `MISCONCEPTION_DETECTED` fired on plain conversational nudges ("I think I
follow so far", "can you give me a practice question") rather than substantive wrong answers —
noted as a possible over-triggering artifact, not investigated further (out of this task's scope).
One harness bug (a null-guard crash in the photosynthesis check) was found and fixed in
`scripts/qa/biologyProductionRuntimeQa.ts` and pushed. Biology is **still not called
production-ready**: the row exists and the pipeline demonstrably works and grades honestly, but
mastery was not observed to complete in this run and the photosynthesis visual gap is unresolved.
`EDUCATIONAL_BRAIN_SUBJECTS` was NOT touched — biology remains excluded from public
onboarding/library/enroll discovery; that rollout decision is still explicitly the owner's to make.

**2026-09-25 update — rollout flipped (owner-authorized), two visual-gap defects fixed, still
being verified.** `EDUCATIONAL_BRAIN_SUBJECTS` now includes `biology` (commit `2fbc6792`,
2026-09-23, a prior session — the onboarding fallback list and `/api/subjects` were confirmed
live-serving biology via direct production read on 2026-09-24). Separately, real-learner QA
against the real deployed app (2026-09-24, disposable-account-equivalent driving of two random
concepts per subject) found the photosynthesis visual gap noted above is NOT a one-concept fluke:
`bio.immuno.immune-disorders` reproduced the identical symptom — `no-figure:critic-reject-cached`
on every turn of a 10-turn session, including an explicit "do you have picture" request, never
serving a diagram. Root cause for both: no Tier 0/1 static visual binding existed for either
concept, so both depended entirely on Tier 3 live generation, which gets stuck re-proposing a
fingerprint-identical candidate to the one already critic-rejected (`no-figure:retry-identical-
figure` on the explicit-request retry — see `photosynthesisVisualServingLedger.test.ts`'s own
2026-09-23 characterization). Fix: a deterministic Tier 0 scene for each concept (reusing the
existing generic `buildCellPathwayScene`/`buildCellComparisonScene` generators from the Biology
cell visual campaign — no new generator authored), grounded strictly in each concept's
Educational Brain "Core Understanding" (not the fuller KG description — both EB entries flag the
extra KG detail as an untaught content gap). Regression coverage: `bioVisualGapFix.test.ts` (20
tests). Still open, NOT fixed in this pass: the 2026-09-24 QA also found one turn on
`bio.immuno.immune-disorders` (an explicit visual request) returned a completely empty tutor
response — root cause not established (no DB/request-ID access in that session to confirm);
flagged for the next session to investigate with production log access.

## Full history index
Every dated campaign, incident, and defect investigation this project has ever recorded is
preserved verbatim (nothing summarized away) under `docs/history/` — see
`docs/history/INDEX.md` for the complete, categorized map. When continuing any of that work,
append to the relevant existing file there, or create a new one; never grow this file back into a
narrative log.
