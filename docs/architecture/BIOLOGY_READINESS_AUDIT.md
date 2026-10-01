# Biology End-User Readiness — Wave 0 Audit (2026-09-20)

**Read this before starting any further Biology wave.** It replaces guessed or
carried-forward numbers with numbers measured this session, against the real
KG, the real seed corpus, and the real production database. Where a number
could not be verified, that is stated explicitly rather than estimated.

## 0. Standing context

This audit runs under an explicit, fresh owner instruction ("MY TUTOR —
BIOLOGY END-USER READINESS PROGRAM") that supersedes CLAUDE.md's prior
"biology/computer_science/mathematics content work is explicitly PAUSED"
note for **Biology specifically** (not for Mathematics or Computer Science,
neither of which this instruction named). CLAUDE.md's "Current campaign"
section has been updated to record this.

The task's own non-negotiable rules govern everything below: reuse existing
architecture (never invent a parallel one), never modify Physics/Chemistry/
Mathematics/English content without a proven shared-infrastructure defect,
never touch the canonical Biology KG's existing 199 concepts, no ad-hoc
production manipulation of certification/mastery, evidence over inference.

## 1. THE HEADLINE FINDING — a shared-infrastructure defect was blocking

**Before any content work, production held ZERO EXPLANATION and ZERO PROBE
rows for Biology** (`asset_identity` table, verified via direct Supabase
query), despite `biologySeedAssets.ts` (108 concepts, 216 explanations, 216
probes) having been wired into the automatic cold-start bootstrap on
2026-09-14 (`src/instrumentation.ts`, commit for §10.1 "corpus/writer
unification"). Root cause, traced and proven, not assumed:

- `src/instrumentation.ts` carries a P-10-FOLLOW-UP-B guard: if ANY seed-owned
  probe identity is still `ACTIVE` under a "base" (4-segment) `canonicalSlug`
  that a later corpus growth has since promoted to a 5-segment,
  difficulty-suffixed slug, the **entire bootstrap aborts before any write —
  for every subject, not just the one that caused it.**
- Reproduced live: computing `abandonedLegacyProbeSlugs()` against the real,
  current combined corpus (all 43 asset modules imported by both
  `src/instrumentation.ts` and `scripts/brain/seed-knowledge-assets.ts`)
  found **926 abandoned base slugs**, of which a direct database query found
  **exactly 45 still `ACTIVE`** — matching the code's own 2026-09-15 comment
  ("45 abandoned base slugs are currently LIVE... fires on EVERY cold start,
  forever, until that content lands") to the digit. This proves the block had
  been static and silently firing on every single production cold start for
  **at least 5 days**, not merely a biology-specific problem.
- All 45 were Mathematics rows (`authorId='EDUCATIONAL_BRAIN_SEED'`), each a
  singleton probe whose slot had since grown a second, difficulty-ladder
  sibling — none were duplicate content (each pair holds two genuinely
  different questions, e.g. `math.arith.fractions:misconception_probe:en:
  middle` held one "chocolate bar" comparison and the corpus separately
  defines a "1/4+1/4=2/8" question at a different difficulty — deprecating the
  live row does not delete a question the corpus still defines; it lets the
  bootstrap create both, once unblocked).

**Fix applied** (status-only, reversible, following the exact precedent
methodology recorded in `docs/CLAUDE_HANDOVER.md` §9r/§9s): after verifying
**0 learner sessions referenced any of the 45 assetIds** (`learn_sessions.
contextSnapshot` full-text search), all 45 were set to
`status='DEPRECATED'` with a `deprecationReason` naming the mechanism and its
reversibility (`UPDATE ... SET status='ACTIVE'` restores any of them). No
content changed, no row deleted, no schema changed, no reseed run.

**Verified working, not merely applied**: two production redeploys (same
commit, no code change beyond this turn's own additions) were triggered to
force fresh cold starts. Runtime logs confirm the bootstrap no longer aborts
with the P-10 error — it now runs its real write path and hits its own
12-second boot deadline (`[instrumentation] asset bootstrap: 12000ms boot
deadline reached — continuing in the background; the next cold start
resumes`), which is the documented, by-design behaviour for a large
first-convergence run (the Chemistry precedent needed two cold starts for a
much smaller 314-probe gap; the combined corpus here is 7,897 items across
six subjects, so this will converge gradually across further cold starts as
the app receives traffic — exactly the "self-healing... converges across
cold starts instead of restarting from zero" design already documented in
that file's own header).

**This is a shared-infrastructure fix, not a Mathematics content change**: no
Mathematics KG, Blueprint, or Educational Brain file was touched; the fix
targets the platform's own asset-bootstrap guard using the exact mechanism
the codebase's own authors already designed for this defect class, at a
larger scale (45 rows vs. the precedent's 3).

## 2. Canonical KG — COMPLETE, unaffected

- 199/199 concepts, 18 domains, version 3.0.0. KG validator: PASS, 199/199
  reachable, 0 failures/warnings (re-verified this session, unchanged from
  the prior session's extension work).
- Runtime registration intact: `SUBJECT_ADAPTERS.biology`,
  `ID_PREFIX_TO_SUBJECT['bio']`, both confirmed present in
  `src/lib/curriculum/knowledgeGraph.ts`.
- **Fixed this session** (additive, biology-only, zero risk to other
  subjects): `DOMAIN_LABEL_I18N`/`domainLabel()`'s domain-name map was
  missing entries for the two domains added in the prior session's KG
  extension (`bio.neuro`, `bio.behav`) — they fell back to a titlecased raw
  segment ("Neuro", "Behav") rather than a proper name. Added "Neuroscience"
  / "Behavioral Biology" plus Russian/Hindi translations, matching the exact
  existing pattern for all 16 other `bio.*` domains. Also corrected two stale
  code comments recording the pre-extension concept/domain counts (89 → 199,
  and the missing "18 domains").

## 3. Curriculum / teaching overlay — mostly already provided by generic infra

No dedicated "curriculum overlay" artifact exists for any subject as a
separate file — the platform's existing generic mechanism IS the overlay:
- Each KG concept's own `difficulty` field (foundational → developing →
  proficient → advanced → expert → research) is the de-facto zero-to-advanced
  progression axis, already reused generically by `placement.ts` for
  level-appropriate entry ordering — this already works for Biology with no
  further code, since it derives from data already on every concept.
- `requires`/`unlocks` already state prerequisite structure (KG validator
  confirms 0 cycles, 199/199 reachable, so a valid topological teaching order
  already exists mechanically).
- A generic **subject prelude** system already covers Biology
  (`subjectPrelude.ts`: `'biology'` is one of the six core subjects, with its
  own authored big-question hook, "What makes something alive?").
- No separate blueprint or KG file was created for the requested 19-stage
  "teaching spine" — per the task's own explicit instruction ("teaching
  stages, NOT permission to invent 19 new KG domains"), the 18 real domains
  already map onto that spine closely (e.g. bio.found→Foundations,
  bio.mol→Molecular Information, bio.neuro→Neuroscience, bio.behav→Behavior);
  no separate mapping file was authored this session, since one is not
  required by any consumer found in the codebase.
- **Not yet done**: a systematic per-concept audit of "mathematical
  requirements / chemistry requirements / prerequisite concepts from other
  subjects" beyond what already exists as `cross_links` (16 entries, added in
  the prior session's KG extension, all verified against the live Chemistry/
  Mathematics KGs). Deeper cross-subject dependency auditing is future work.

## 4. Educational Brain — 0/199, unchanged

`educational-brain/concepts/biology/` does not exist. 0 formal EB entries.
0 Biology entries in `docs/curriculum/blueprints/`. This matches the task's
own stated baseline exactly. Not started this session (see §11, next steps).

## 5. Seed teaching corpus — 108/199 authored, now 8/108 at asset contract

Measured via `npx tsx scripts/assets/contract-audit.ts --subject biology`
(the project's own generic, subject-agnostic audit tool, reused as-is):

| measure | before this session | after this session |
|---|---|---|
| KG concepts | 199 | 199 |
| concepts with ANY authored seed content | 108 | 108 |
| (concept, band) pairs AT the 3-probe contract | **0** | **8** |
| pairs short of contract | 108 | 100 |
| pairs never quizzable at all | 0 | 0 |

**Root cause of the "0 at contract" figure**: every one of the 108
originally-authored concepts held exactly 2 gradeable probes (1 `mcq` + 1
`misconception_probe`), one short of the 3-probe floor
(`correctAtCheck >= 1` plus `correctAtPractice >= 2`, and a spent probe is
never re-asked) — the identical defect class already fixed for Physics and
Chemistry (`physicsDepthSeedAssets.ts`, `chemistryDepthSeedAssets.ts`). **No
Biology lesson could ever reach verified mastery before this fix.**

**Fixed this session, Batch 1 of the probe-depth programme**:
`src/lib/teaching/assets/biologyDepthSeedAssets.ts` — one additional,
newly-authored, PROFICIENT-difficulty probe for each of the 8 `bio.found`
concepts, each testing application/transfer (a capability neither existing
probe tests), cross-checked against each concept's own already-authored core
explanation so no new biological claim is introduced. Used `probeKind:
'short_answer'` (unused anywhere in `biologySeedAssets.ts`) specifically to
open a brand-new `(conceptId, probeKind, gradeBand)` slot rather than adding
a second probe to an existing singleton `mcq`/`misconception_probe` slot —
doing the latter would trigger `buildProbeSlugResolver`'s difficulty-ladder
promotion and recreate the exact P-10 defect just fixed in §1, this time for
Biology's own slugs. Wired into both writers
(`scripts/brain/seed-knowledge-assets.ts` and `src/instrumentation.ts`), so
it reaches production automatically via the (now-unblocked) bootstrap.

The remaining 100 of the 108 originally-authored concepts, and the 91
concepts from the prior session's KG extension (0 seed content of any kind),
remain open — see §11.

**91/199 concepts have ZERO seed content** — the 91 new concepts from the
prior session's KG extension (`bio.neuro`, `bio.behav`, and the expansions to
the 16 pre-existing domains). These need full authoring (explanation + ≥3
probes per band), not a depth fix. This is the single largest remaining
content gap.

## 6. Teaching-assets pipeline file — correctly excluded, not miscounted

`docs/biology/teaching-assets/assets.json`: `status: "placeholder"`
(literally, in the file's own header field), 89 entries. Confirmed this is a
Curriculum-Production-Pipeline-owned artifact class, structurally unrelated
to `AssetIdentity`/seed corpus content, and is correctly NOT counted by
`contract-audit.ts` or by this audit's §5 figures. Per the task's own
instruction ("Do not count placeholder files as completed teaching
content"), this is not treated as coverage.

## 7. Assessment/probe architecture — reused as-is, one real defect avoided

The existing generic `AssetIdentity`/`SeedProbe`/`assetContract.ts` /
`gateAssessment.ts`/`probeToMcq` machinery was reused without modification
for Biology's new content — no new schema, no new grading path, no new
probe-kind concept. `probeToMcq` requires a non-empty stem, 2-4 choices, no
empty/duplicate option text, and exactly one correct choice, regardless of
`probeKind` label — verified directly and matched by every new probe (4
choices, exactly 1 correct, each).

One defect class was proactively avoided rather than discovered live: adding
a probe to biology's existing singleton `mcq`/`misconception_probe` slots
would have silently re-triggered the exact P-10 abandoned-slug mechanism
fixed in §1. Using an unused `probeKind` per concept avoided it structurally.
Guarded going forward by `src/tests/probeInventoryDepth.test.ts`, extended
this session to support a **per-module depth target** (`DEPTH_TARGETS`,
replacing the previous single global `DEPTH_TARGET = 5`) so Biology's
honestly-smaller Batch 1 target (3, the bare contract floor) is checked
correctly rather than either failing against physics/chemistry's 5-probe
stretch target or being silently unchecked. Physics and Chemistry's own
existing target (5) is unchanged.

## 8. Misconception infrastructure — informal but real

Biology's seed corpus embeds a lightweight, per-concept misconception ID
scheme inline (`${CONCEPT}:M1`, `:M2`, …) — 211 distinct references measured
in `biologySeedAssets.ts`. This is NOT the formal Blueprint "Misconception
Registry" pattern Physics/Chemistry/Mathematics/English use (Biology has 0
Blueprints), but it is real, structured, and already wired through
`targetedMisconceptions` on both explanations and probes. The generic runtime
`MistakeRecord`/`ActiveMisconception` writers in
`src/app/api/learn/chat/route.ts` are subject-agnostic and require no
Biology-specific code.

## 9. Visual infrastructure — minimal curated coverage, generic engine available

- `visualKnowledgeRegistry.ts`: 11 `bio.*` entries (curated bindings).
- `conceptSceneParams.ts` (parametric scene generators): 2 `bio.*` entries.
- Production `asset_identity` VISUAL family for `bio.*`: 2 rows (1 DRAFT, 1
  ACTIVE), both `AI_AUTHORED` — i.e. organically captured by the generic
  runtime scene-generation engine on some real or test turn, not hand-curated.
- The platform's **generic runtime visual-generation engine**
  (`src/lib/teaching/visual/*`, extensively documented in
  `docs/history/visualization-engine.md`) already covers concepts with no
  curated binding at all, subject to `ENABLE_AI_SCENE_GENERATION` (currently
  set in this project's Vercel environment, confirmed via
  `mcp__Vercel__filter_project_envs`, though its value was not decrypted).
  This means a full 199-concept "visual census" is not strictly a
  prerequisite for basic visual functioning — the generic engine is the
  intended long-tail answer, per this project's own architecture — but a
  proper NO-VISUAL-NEEDED / EXISTING-VALID / VISUAL-REQUIRED /
  REQUIRES-REPAIR classification per concept has not been done this session
  and remains open (see §11).

## 10. Production/bootstrap path, runtime routing, mastery/certification

- **Bootstrap wiring**: confirmed correct and now unblocked (§1). Biology's
  content will converge into production automatically across further cold
  starts — no further manual seeding action is required for what is already
  authored.
- **Runtime routing**: `biology` is registered exactly like every other
  subject in `SUBJECT_ADAPTERS`; `/api/curriculum?subject=biology` uses the
  same generic KG-driven code path as Physics/Chemistry/Mathematics/English
  (no biology-specific branching exists or is needed).
- **QA/test infrastructure**: both `scripts/qa/strugglingLearnerHarness.ts`
  and `scripts/qa/referenceLessons.ts` are already generic and
  subject-parametrized (`<subject>` CLI argument, calling the real
  `/api/curriculum?subject=<subject>` endpoint) — no new harness is needed
  for Biology; running a real-learner QA campaign (Wave 8) can reuse these
  directly once enough seed content exists to make the results meaningful.
- **Certification**: `scripts/certification/*` and `scripts/math/certify.ts`
  are Mathematics/Physics-specific in their current form (account-safety
  rules, per-subject assumptions); no Biology-equivalent exists yet. This is
  explicitly deferred to a later wave (§11) rather than built speculatively
  ahead of having enough content to certify.
- **Mastery/certification schema**: fully generic, subject-agnostic already;
  no changes made or needed.

## 11. What remains — honest, unfinished, not inflated

Per the task's own instruction not to inflate completion:

```
BIOLOGY (Wave 0 complete, Wave 1 partial, Wave 2/3 batch 1 of many)
KG:              199/199
Curriculum:      generic infra reused; no dedicated overlay artifact needed/built
EB:              0/199
Assessment:      8/108 authored concepts at contract (100 short); 91/199 concepts have 0 content
Teaching assets: N/A (pipeline-owned placeholder, not this program's artifact)
Visuals:         11 curated + 2 organic AI-generated; full census NOT done
Production:      bootstrap UNBLOCKED (was 100% blocked for ALL subjects); convergence in progress
Runtime:         PASS (generic infra confirmed working, no biology-specific defect found)
Real learner QA: 0 concepts (not started — content too sparse yet to be meaningful)
Certified:       0/199 (no certification mechanism exists for biology yet)
P0: 1 found, 1 FIXED (the cross-subject bootstrap block)
P1: 1 found, partially addressed (probe-depth zero-slack — 8/108 fixed this session)
P2: 0 formally logged this session (visual census, EB authoring gap — tracked as scope, not defects)
P3: 2 fixed (domain-label map gap, stale doc comments)
```

Next wave, in priority order (matches the task's own wave structure and this
program's own "one bounded batch, continue across sessions" discipline,
identical to how the Mathematics EB campaign and the Physics/Chemistry
probe-depth programmes were run):

1. **Continue Wave 3** (probe-depth): the remaining 100 of 108
   originally-authored concepts, domain by domain (`bio.cell` next, 14
   concepts), using the exact same `short_answer`-slot pattern.
2. **Start Wave 2** (Educational Brain): author `educational-brain/concepts/
   biology/` entries against `EDUCATIONAL_BRAIN_STANDARD.md`, starting from
   Biology's own zero-prerequisite entry node (`bio.found.what-is-biology`),
   reusing Mathematics/Physics/Chemistry/English's established authoring
   discipline (misconception registry first, then core understanding,
   worked examples, transfer).
3. **Author the 91 zero-content concepts** from the prior KG extension —
   full explanation + probe-depth authoring, not a depth fix.
4. **Visual census** (Wave 5): a genuine per-concept classification (NO
   VISUAL NEEDED / EXISTING VALID / VISUAL REQUIRED / REQUIRES REPAIR),
   reusing the generic visual engine rather than hand-authoring 199 curated
   bindings.
5. **Real-learner QA** (Wave 8) once enough content exists for a lesson to
   plausibly reach mastery — reuse `strugglingLearnerHarness.ts` as-is.
6. **Certification** (Wave 10): a Biology-equivalent of `scripts/math/
   certify.ts`/`scripts/physics/state.ts`, built only once enough content
   exists for certification to mean something.

## 12. Validation performed this session

- KG validator: PASS, 199/199 reachable (unchanged).
- `npx tsc --noEmit`: clean.
- `npx vitest run`: 701 test files passed, 14473 tests passed / 9 skipped.
- `npm run build`: succeeded (middleware 79.7 kB, no edge-bundle regression).
- `npx tsx scripts/brain/seed-knowledge-assets.ts --draft --dry-run`: 0
  duplicate-identity errors across the full 7,897-item combined corpus
  (was 7,889 before this session's 8 new probes).
- `npx tsx scripts/assets/contract-audit.ts --subject biology`: confirms
  8/108 at contract (was 0/108).
- Production: 45 P-10-blocking rows deprecated and verified cleared (0
  remain live); 0 learner sessions were referencing them; two forced
  redeploys confirm the bootstrap now runs its real write path instead of
  aborting.

No Physics, Chemistry, Mathematics, or English **content** file was
modified. The one shared-infrastructure production data change (§1) is
fully reversible, was proven necessary before being applied, and unblocks
every subject's content pipeline, not only Biology's.
