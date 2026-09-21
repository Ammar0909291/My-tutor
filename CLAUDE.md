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
Formal EB
authoring started 2026-09-20 at the KG root, `bio.found.what-is-biology`, then continued in
strict KG-prerequisite order through 173 concepts total (`educational-brain/concepts/biology/`,
no Blueprint exists for biology as a subject; 63 entries — see COVERAGE.md's biology row
for the full list of ZERO-seed-content concepts authored from first principles — and
thirty-nine entries record genuine KG-description-vs-seed-content gaps as Curriculum
Feedback rather than fabricating content).
Authored via 52 successive batches of 3, each recomputing the fresh topologically-ready
frontier from the prior baseline — see COVERAGE.md's biology row for the full per-batch
concept list; the latest batch (from the 170-concept baseline) added
`bio.cell.cancer-biology-hallmarks`, `bio.div.invertebrate-diversity-major-phyla`, and
`bio.plant.secondary-growth-anatomy` (all 3 first-principles-authored — 0 of 20 frontier
candidates had seed content, the EIGHTEENTH consecutive fully zero-content batch) —
**EB is 173/199** (only 26 concepts remain).
**First-principles authoring remains the settled default mode** for continuing this
campaign from the current 199-concept KG frontier (eighteen consecutive zero-content
batches since batch 35) — continuation should still re-check each fresh frontier for
any remaining seed-content-backed concepts (a handful may still surface, as batch 30's
2-of-46 showed), but should not expect them as the norm. The 91-concept 2026-09-14
KG-extension pool remains a SEPARATE, larger, not-yet-started task; no unilateral
decision to switch to it has been made, and this determination (continuing
first-principles authoring of the current frontier rather than switching tasks) has
now been applied consistently across twenty-four batches (28 through 52) without a
stop-and-ask, per the Workflow preference's authorization for ordinary scope
continuations — a future session may still revisit this call, particularly once the
current frontier is fully exhausted of authorable concepts.
These
two
counters are tracked and reported SEPARATELY, never conflated — see `COVERAGE.md`'s biology row. The 91 concepts from the 2026-09-14 KG extension still have zero
seed content of any kind. Continue via the audit doc's own §11 priority order for probe-depth,
and strict KG-prerequisite order (not alphabetical) for EB authoring.

## Full history index
Every dated campaign, incident, and defect investigation this project has ever recorded is
preserved verbatim (nothing summarized away) under `docs/history/` — see
`docs/history/INDEX.md` for the complete, categorized map. When continuing any of that work,
append to the relevant existing file there, or create a new one; never grow this file back into a
narrative log.
