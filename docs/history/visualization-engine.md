# Visualization Engine (history)

> Extracted verbatim from CLAUDE.md during the 2026-09-17 memory-file
> collapse (CLAUDE.md kept to <500 lines of live rules). Dated entries below
> are historical record — read them for context, not as live instructions.
> Live rules remain in CLAUDE.md; see docs/history/INDEX.md for the full map.

## Visualization Engine — runtime readiness (2026-08-10)
- **Outcome audit trail is live.** New additive table `visual_generation_outcome` (Prisma model
  `VisualGenerationOutcome`, migration `20260810120000_visual_generation_outcome`, applied to
  production via Supabase MCP and registered in `_prisma_migrations` so `prisma migrate deploy`
  stays a no-op; RLS enabled, matching the standing all-public-tables posture). Every generation
  attempt is recorded with the artefact — the accepted figure, or the raw model output that was
  rejected. `prismaGenerationOutcomeSink` in `src/lib/teaching/visual/generationOutcomeStore.ts`
  is wired into `route.ts`; accepted figures also write an AssetIdentity(VISUAL) + VisualAsset
  pair, always DRAFT, deduped by content hash. No code path promotes to ACTIVE.
- **The review loop now has both ends.** `/api/admin/knowledge-assets` gained a `visual` family
  (it knew only explanation/probe), and `resolveVisualForTurn` gained an APPROVED tier between
  CURATED and GENERATED that serves ACTIVE visual assets. The approved figure is RE-VALIDATED via
  `validateGeneratedFigure`, never trusted on approval alone — writing the test found an approved
  photosynthesis figure being admitted for a linear function, because admission compares the
  identity the resolver itself supplies.
- **First real cohort, 17 provider calls total (gemini-3.5-flash-lite).** 8 concepts, one per
  subject family: all 8 accepted, and reading them found 3 confidently wrong in the same way — a
  LIST or CLASSIFICATION drawn as an ordered `process_flow` (the seven SI base units; matter's
  taxonomy; the characteristics of life). Cause: the closed set had no exit, so a concept that is
  none of the five forms gets bent into the nearest, and `process_flow` is bendiest (6 of 8 chose
  it). Fix: a sixth answer, `{"type":"none"}` → rejection reason `no-suitable-form`, stated in the
  prompt as a CORRECT and expected outcome, plus an explicit "a list is not a process" rule.
  Re-measured: all 3 decline, the kinetic-energy control is unchanged. **Honest trade-off:** the
  rule also now declines 3 concepts that arguably ARE ordered (mathematical thinking; phonemic
  awareness; data-types reassignment) — acceptance went 8/8 → 2/5. Erring toward decline matches
  this engine's stance, but it is a real swing and was NOT tuned away on 8 data points.
- **Production state:** `visualization_cache` 2 warm rows, `asset_identity` 2 VISUAL DRAFTs
  awaiting review (math.func.linear-function, phys.mech.kinetic-energy — both graphs),
  `visual_generation_outcome` 8 rows. 1,279 of 1,775 concepts (72%) are uncurated, i.e. the real
  surface generation serves — domain-default registry bindings cover far more concepts than the
  "26.7% get a figure" figure implied, so generation never fires for them.
- **The critic (2026-08-10, later session) — generated figures are now self-validated.**
  `src/lib/teaching/visual/figureCritic.ts`. Two layers: STATIC (free, deterministic —
  equation compiles and varies, number-line highlights in range, scene layout safe at every
  viewport, figure carries words the tutor can speak from) and JUDGED (one model call, separate
  prompt never shown the generation rules, answering relevance / correctness / explanatoryValue).
  Five dimensions; `promote` needs all five to pass; ANY `unsure` — including an unreachable or
  unreadable judge — resolves to HOLD, never promote. The critic never repairs.
  **Calibrated before being trusted** (`scripts/visual/calibrate-critic.ts`): 6 hand-judged cases,
  6/6 agreement, 0 known-bad promoted. It also gates the on-turn `auto` path, so the one route
  that serves a figure the moment it is generated cannot serve an unvetted one.
- **Vetted cohort pipeline** (`scripts/visual/vet-cohort.ts`): generate → STATIC → judge → decide,
  offline. 40 concepts, one per subject family: **40 generation calls + 14 judge calls** (the judge
  is skipped for figures the generator declined). Result: 26 declined by the generator
  (`no-suitable-form`), 4 rejected by the critic, 1 rejected by reviewer override
  (`cs.prog.python-basics` — conflated interpreter internals with `print()`/`input()` usage; the
  critic had passed it, so its precision is NOT 100%), 9 promoted. The critic's best catch: a
  figure titled "Gravitational Potential Energy U(h) = mgh" plotting `-0.5x^2 + 8`.
- **Production is SERVING, with no Vercel change needed.** 10 ACTIVE visual assets
  (`asset_identity` family=VISUAL), 11 `visual_assets`, 10 warm `visualization_cache` rows,
  48 `visual_generation_outcome` rows. Integrity verified: 0 concepts with two ACTIVE, 0 orphan
  identities. **Key architectural fact:** the APPROVED tier does NOT consult
  `ENABLE_AI_SCENE_GENERATION` or the allowlist — an ACTIVE visual asset is reviewed content, in
  the same class as a curated binding, and serves regardless. The env flags gate GENERATION only.
  To stop a served figure, set its asset to DEPRECATED (one statement).

## Visualization Engine — generic runtime engine (2026-08-10, later session)
- **Eligibility stopped being a list.** `flag.ts` inverted: `ENABLE_AI_SCENE_GENERATION` is now a
  KILL SWITCH (only `false`/`0`/`off`/`no` disables; unset permits), and `VISUAL_AI_SCENE_ALLOWLIST`
  is an OPTIONAL NARROWING — empty no longer means "nothing". **Empty does NOT mean unrestricted**:
  four independent conditions bound generation — kill switch, optional narrowing, GROUNDING
  (`topicIdentity.MIN_GROUNDING_CHARS`, a topic with no describable text cannot be drawn or judged),
  and BUDGETS. `VISUAL_AI_SCENE_AUTO` is replaced by `VISUAL_AI_SCENE_REVIEW_ONLY` (opt-in hold
  list); default policy is `auto` = generate → judge → serve what passes.
- **Source-agnostic topic identity** (`topicIdentity.ts`). Identity was `getKGNode(id) ?? null`, so a
  topic outside the KG could never get a figure at any setting. Now: KG first, else a runtime
  identity from title + grounding text, id = `topic:<sha1(normalised title)>` so the same topic
  always hits the same cache row. Carries `provenance`, which reaches the tutor contract as
  `engine-runtime-topic` — the figure is real but is NOT presented as course material.
  Route grounding comes from `lessonCtx.lessonTitle` / `lessonGoal` (the "Subject Library subjects
  without a knowledge graph" case route.ts already names).
- **Budgets replaced the allowlist's blast-radius job** (`generationBudget.ts`): perSession 6,
  perDay 500, counted from `visual_generation_outcome` where `cached=false` (shared across
  instances; an in-memory counter bounds one lambda i.e. nothing). **An unreadable count is treated
  as EXHAUSTED** — a safety bound fails in the safe direction. Verified against production: the
  reader's query returns 48 for the last 24h.
- **Verdict cache** (`verdictCache.ts`) — the answer to per-turn judging cost, and the reason
  critic-PASS→ACTIVE was REJECTED by the owner and reverted. Stores only a PASS, under
  `scene:v1:verdict:<id>`, invalidated by changed grounding hash, changed figure fingerprint, or
  90-day TTL. **A PASS means eligible-to-serve, never proven, and NOTHING promotes to ACTIVE —
  that stays human-only through `/api/admin/knowledge-assets`.**
- **One deadline** (`turnDeadline.ts`, 9s) covering generate + validate + judge; each stage gets
  what remains. Expiry before the judge ABANDONS the figure (never serves it unjudged); the
  generation still populates the cache for the next learner.
- **Deterministic LaTeX check** added to the critic's STATIC layer after the real pipeline returned
  a title `Kinetic Energy ($E_k = \frac{1}{2}mv^2$ ...)` — these renderers print LaTeX, they do not
  typeset it, and the judge passed it because it can read what the notation means.
- **VERIFIED END TO END with the real model** (`scripts/visual/verify-runtime-path.ts`, 4 calls):
  an OFF-CURRICULUM topic (no KG node, no allowlist entry) generated a correct process flow,
  was judged and served — and **turn 2 cost 0 provider calls** and served the identical figure.
  Same for a KG concept. This is the property that makes thousands of topics affordable.
- Production integrity re-verified: 10 ACTIVE visuals, 0 DRAFT, 0 concepts with two ACTIVE,
  0 orphan identities, 48 outcome rows.


## Visualization Engine — completion pass (2026-08-10, later session)
- **The per-session budget was never enforced.** `resolveVisualForTurn` accepted
  `sessionGenerationCount`; route.ts never passed it, and `checkBudgets` skips the session cap
  when it is undefined — so the 500/day cap was the only bound. Wired via `contextSnapshot`
  (per-session by construction, no migration): the decision now reports `generationSpent`, and
  the count advances ONLY on a turn that actually made a provider call (cached / approved /
  declined all cost nothing). A corrupt or negative stored count reads as the cap, not zero.
- **The engine drew the LESSON when the learner asked about something else.** Measured in a
  `phys.meas.units` lesson: "Explain Kubernetes pod scheduling" -> target `phys.meas.units`,
  origin `lesson-concept`. No downstream gate can catch this — they all ask "is this a good
  figure of the concept it claims", and it is; the CLAIM is wrong. New rule
  (`requestTargetsSomethingElse`, `resolveVisualTarget.ts`): on the FALLBACK only, on an explicit
  request only, and only with positive evidence a different topic was named (>=2 topic-shaped
  words sharing NO vocabulary with the concept that would be drawn) -> NO FIGURE. Withholds a NEW
  figure only; a held one stays with continuity. Not a teaching decision, excursion lifecycle
  untouched. Measured on 22 real phrasings (`visualOffCurriculumRequest.test.ts`).
  **Still open (reported, not guessed):** DRAWING that off-KG topic needs a title AND grounding
  text; the platform has no description of an arbitrary learner-named topic, so the engine
  declines. A learner-named off-KG topic becomes drawable the moment a grounding source exists.
- **Critic calibration 6 -> 28 hand-judged cases**, including `cs.prog.python-basics` (the
  recorded miss) which is now REJECTED with an accurate reason. Best run: precision 100%,
  recall 81.8%, **DANGEROUS FALSE ACCEPTS 0**. Recall varies run to run (54.5%-81.8%) because
  the PROVIDER times out, not because the critic changed — the calibration pass now runs with
  `budgetMs: 0`, and a timed-out judge is reported as a timeout instead of "unreadable shape".
- **Grounding excludes nothing**: 1775/1775 KG concepts across all 6 subjects clear the
  40-char floor (`scripts/visual/measure-grounding.ts`, no provider, no DB).
- **The 2-turn runtime harness was lying, in both directions.** Its in-process cache stub
  applied `getCachedVisualization`'s `renderCount` bump as a content write, storing `undefined`
  — so every cache HIT destroyed the row and the script measured free/paid/free/paid. Fixed to
  merge like Prisma; extended to 4 turns because 2 cannot tell "cache broken" from "turn 1 held".
  **Re-verified against the real model:** KG concept -> turn 1 generate+judge (2 calls), turns
  2-4 **0 calls**, identical figure. Off-KG topic (no KG node, no allowlist) -> deadline expiry
  on a slow provider (16s generation vs the 9s turn deadline) = NO FIGURE and the lesson
  continues, then generate+judge, then **0 calls** for every later turn, identical figure.
- **Production verification BLOCKED, not passed:** Supabase MCP lists 0 projects this session,
  so no DB state could be read; Vercel runtime logs show **zero requests in 24h**, so there is
  no production traffic to inspect. Generation also remains disabled in production until a human
  sets the env vars (unchanged from the previous session's note below).


## Visualization Engine — generic coverage closed (2026-08-10, final pass)
- **A topic the curriculum has never heard of can now be drawn.** Two things are needed and the
  KG was quietly supplying both: a NAME (identity/cache/provenance) and TEXT (to draw from and be
  judged against). `requestedTopic.ts` obtains both for an off-KG topic — the name from the
  request itself (`extractRequestedTopic`, stops at the end of the clause, looks nothing up), the
  text from the LEARNER'S OWN WORDS only (this turn + their earlier messages about the same
  topic). **Never the model's**: judging generated output against generated prose asks a model
  whether it agrees with itself. Enforced structurally — a test fails if the module ever reads
  assistant text.
- **A request is not a description.** "Explain Kubernetes pod scheduling" is 33 chars, below the
  grounding floor → `no-figure:requested-topic-not-grounded`, 0 provider calls. Padding with the
  title does not help: substance counts content words that are NOT the topic's own name.
  Grounding does NOT certify the learner is right — the critic's `correctness` judges the figure
  against the world, so a faithful drawing of a misconception is rejected there.
- **Generated figures now survive a refresh.** A KG figure restores by RE-DERIVING (deterministic).
  A runtime topic has nothing to derive from and its id is a hash of its title — so every
  generated figure returned null from restore and vanished on reload. The topic's words now ride
  `contextSnapshot.visualSession.topic`, and `restoreRuntimeTopicSession` reads the figure back
  from the cache it was already written to: **no model call**, re-validated, and gated on the
  stored PASS (missing/expired/different-figure ⇒ restores nothing). Carrying the words is safe
  because the id is a hash of them — a hand-edited snapshot cannot attach a description to a
  cached figure.
- **VERIFIED, real model, provider calls counted** (`scripts/visual/verify-runtime-path.ts`, now
  4 cases × 4 turns): KG concept → 2 calls then **0,0,0**, identical figure. Requested off-KG
  topic inside a PHYSICS lesson → a "Kubernetes Pod Scheduling Lifecycle" process flow (NOT
  physics), then **0,0,0**. Ungrounded request → **0 calls on every turn**, declines.
- **Generated figures measured in a browser** (the two real payloads added to `/dev/visual-2d`):
  0 below the 10px floor, 0 collisions, 0 clipped, 0 hidden — both themes × 390/768/1280.
- **Scalability proved structurally** (`visualGenericScalability.test.ts`): 1000 unseen topics →
  1000 distinct stable ids; one topic asked 5 ways → 1 cache row; no engine module branches on a
  concept id (curated tiers excluded by name); kill switch still stops everything at once.
- **Production**: latest deployment READY on this work; **Supabase MCP lists 0 projects, so DB
  integrity is UNVERIFIED this session**; Vercel runtime logs show no traffic to inspect.

- **STILL BLOCKED (generation only, not serving) — the one thing that keeps this OFF for learners:** Vercel environment
  variables cannot be set from this session (the Vercel MCP surface exposes projects/deployments/
  logs/docs but no env-var tool, and there is no `VERCEL_TOKEN` in the sandbox). Generation stays
  disabled in production until a human sets `ENABLE_AI_SCENE_GENERATION=true` and
  `VISUAL_AI_SCENE_ALLOWLIST` (leave `VISUAL_AI_SCENE_AUTO` EMPTY, so policy resolves to
  `reviewed` and nothing reaches a learner unreviewed).
- **Unrelated production finding, NOT changed:** Supabase security advisor shows exactly one
  ERROR — `public.lesson_attempts` has RLS disabled, a regression from the documented
  0-ERROR baseline. Left alone deliberately: unrelated to this work and it alters shared
  production security config on an unfamiliar table. Needs an owner decision.


## Visual Engine — universal interactive upgrade (2026-08-29)
- **Read `src/lib/teaching/visual/parametricScenes.ts` before touching any scene generator.**
  It is now the single source of truth for "the canonical case": `conceptSceneParams.ts`'s
  numeric/lookup entries build FROM it, so a textbook parameter set has one definition, not two.
- **Root cause found by inspection, not from the failing examples**: `SceneSpec` is a DRAWING
  format and `conceptSceneParams` froze every canonical figure at build time from a constant
  parameter set. After generation there were no parameters left — only coordinates. Cause-and-
  effect, interactive manipulation, predict-then-reveal, focus, practice mode and adaptive
  complexity were ALL blocked by that one missing layer, not by six separate gaps. Scene
  identity/continuity across turns (`visual/session.ts`) and request intelligence
  (`visual/visualNeed.ts`) were already implemented and were NOT the problem — do not rebuild them.
- **Four additive layers, none concept-specific.** (1) CONTRACT: `explainer`, `parametric`,
  `stage` on the scene; `intent`, `focus`, `predict` on the step, which is now also a teaching
  stage — every field optional, so a scene declaring none behaves exactly as before.
  (2) `visual/explainer.ts` — header, givens, result chip, colour legend, panels, key insight,
  DERIVED from what the scene already declares. **It may restate, never invent**; the guard test
  asserts every printed fragment is traceable to the source spec. Authored fields win
  field-by-field. (3) `visual/sceneStage.ts` — reveal + focus + challenge as one pure function;
  withholding is decided from the SEMANTIC PALETTE (a label coloured `result` is the answer in
  any subject), which is why practice/assess work for scenes nobody wrote them for. Geometry is
  NEVER withheld; focus dims, never deletes. (4) `visual/parametricScenes.ts` — 14 generator
  kinds across physics/maths/chemistry declare their variables and the causal claim each makes;
  a control re-runs the generator's own pure builder, so an adjusted figure is exactly as correct
  as the one it replaced.
- **The whole generator family is now split into `*.pure` halves** (28 modules). The LLM extractor
  was the only thing tying them to the provider router / AI budget / rate limiter, which is what
  made client-side re-derivation impossible. Fixed once, not 28 times. `sceneGeneratorPurity.test.ts`
  asserts it — a single `@/lib/ai` import in a `.pure` module breaks the build's guarantee.
- **`SceneSpecFigure` is now a 3-line seam** onto `ExplainerFigure`. LessonScreen and the dev
  harnesses were untouched, which is why the frame reached every scene figure at once.
- **Six real defects found and fixed, four of them only visible in a browser** (dev harness
  `/dev/physics-pilot`, extended with the parametric concepts): the camera never followed a
  rebuilt scene (`<Canvas camera>` applies at mount only — `CameraDistanceSync` in
  `ThreeDVisual`); the torque generator divided metres and newtons by the same normaliser, so
  raising the force shrank the lever toward nothing; the result chip printed the answer that
  practice mode was hiding; stage decor was placed at a radius instead of the content box, so the
  axis triad fell outside the frame; `rebuildScene` skipped `fitSceneToFrame`; and a generator's
  parameter validator does not check the scene that comes OUT (a collision with one body at rest
  passes validation and draws a zero-length arrow) — rebuilds now pass `validateSceneSpec` and the
  frame holds the last good figure.
- **NOT done, reported not hidden**: meaningful animation (scenes are still static snapshots with
  additive reveal); misconception-contrast visuals (the engine could express one as a second
  parameter set, but the teaching layer supplies no misconception→variable mapping — that is the
  architectural blocker); representation transitions; adaptive complexity keyed to learner level;
  the visual-generation progress state. **No real-account learner QA was run** — this environment
  has no `QA_EMAIL`/`QA_PASSWORD` and no `DATABASE_URL`; verification was Chromium against the
  real components on the dev harness plus offline runs of the real modules.



## 2026-09-24 — Visual architecture hardening (commit 9a2e2da + QA harness)

Forensic audit + fix of the visual decision path. Changes:
- **Retirement lifecycle by asset, not by concept.** `retired.ts` keeps all 25
  `RETIRED_VISUAL_BINDINGS` rows (evidence) and adds `RETIRED_ASSET_FINGERPRINTS`
  (content fingerprints of every asset each tier offered at retirement). Tier −1 in
  `resolveVisual` now refuses only a retired asset or a broad (domain-default /
  generator-default) one; a concept-authored asset with new content is served with no
  edit to `retired.ts`. `fingerprint.ts` is the single `figureFingerprint` definition.
- **No wrong-domain fallback.** `DOMAIN_CARD_HOME` + `domainRuleIsFaithful`: a domain
  rule whose card does not belong to that domain yields no figure (only one existed:
  `bio.cell → food_chain`, row kept, now refused).
- **Scene representation** falls back to the exact binding or the scene type, never an
  unrelated domain card (18 `bio.cell` scenes were labelled `food_chain`).
- **One source of "what can be shown".** route.ts derives `availableVisual`/`allowed`
  only from the V2 decision; legacy keyword detection no longer feeds the prompt.
- **Honest served state.** `turnRecord.ts` → one `[learn/chat] VISUAL_TURN=` log per turn
  (tier, assetId, representation, scope, reason, generationSpent, served-from-response,
  onScreen, heldTurns); TURN_EVENT `visualServed` now reads the response, not the decision.
- Invariants: `visualArchitectureInvariants.test.ts` (50), `visualRetirementLifecycle.test.ts`.
  Full suite 714/714 files, 14,761 passed; tsc 0; build OK. Census unchanged except the
  18 representation labels (1866 concepts, 517 graphical, 25 retired no-figure).

Production QA (`scripts/qa/visualArchitectureProductionQa.ts`, disposable account, deleted,
deployment dpl_2vtJEr9vSsxtPAmdo4xr6PnyC1Ng): 21/21 chat turns — response fields,
`VISUAL_TURN` and TURN_EVENT `visualServed` agree (10 served / 11 not). Tier 0 concept
(apoptosis, process), Tier 0 kind (projectile), Tier 1 curated (particle-in-box), Tier 1
domain (limits), Tier 2 approved (stoichiometry), Tier 3 cache hit ×2 with
generationSpent=false (specific-heat), retired lc-circuits → no figure + "I don't have a
picture", retired reflection → retired mirror scene not served (a Tier-3 generated graph was),
replaced cell-cycle → replacement scene. English path skipped (wrong concept id in harness).
Remaining, non-blocking: telemetry `representation` for a domain card still carries the
inferred label (`motion_graph` for math.calc.limits; learner prose already says "figure");
an approved Tier-2 figure is unreachable for a concept that has a domain default (fix needs a
per-turn DB read — egress); legacy `detectVisual` still computed for telemetry only.

## 2026-09-24 — Visual lifecycle finalization (commit e09200f)

Closed the two ambiguities the hardening pass left open.
- **Retirement = retire an ARTIFACT (Option 1), now enforced on every tier.** Evidence it
  was always the meaning: the register was applied only inside `buildDecision()` (sync
  tiers) and the async approved/generated tiers ran on its no-figure result from the start;
  `qa-and-mastery-fixes.md` names "a human-reviewed promoted VISUAL asset or generation
  enablement" as the remedy for a retired concept; PHASE6 P2 §5 gives generation its own
  semantic gate (the critic). The gap closed: `serve()` (approved + generated) now refuses
  a retired artifact by content fingerprint (`no-figure:retired-asset`), and any serve()
  refusal of a generated figure now corrects the served ledger. No register row removed
  (25 remain). Documented in `retired.ts` "WHAT RETIREMENT MEANS".
- **Approved beats a subject-wide card (precedence by specificity).** Evidence: approved
  figures are "reviewed content, in the same class as a curated binding" (this file,
  2026-08-10); a domain-default card is a general illustration (scope 'domain'). Exact
  curated cards and Tier 0 scenes still win; a subject-wide card is never replaced by a
  generated figure. Measured before changing: 367 concepts resolve to a subject-wide card;
  production has 10 ACTIVE visual assets, 0 of them on those 367 (latent defect, no
  production concept changes behaviour today).
- **No per-turn DB read added.** `hasActiveVisualFigure` is an in-process index (one
  conceptId-only `findMany` of ACTIVE VISUAL rows per lambda per 10 min; unreadable → empty
  for 60 s, card kept). `findActiveVisualFigure` is read only for a subject-wide concept the
  index lists (0 today).
- `VISUAL_TURN` gains `retirement` (none|suppressed|replacement) and `cacheHit`.
- Tests: `visualLifecycleFinalization.test.ts` (23; 4 fail against the previous resolver).
  Full suite 715/715 files, 14,784 passed, 9 skipped; tsc 0; build OK.
- **Production QA (deployment dpl_B1ny6RQVYqBZizPJgfFmserdAGTk, disposable account, deleted).**
  25 chat turns across 12 paths incl. two REAL English concepts (`eng.phonics.blending-segmenting`
  → tier2-approved served; `eng.grammar.word-classes-overview` → honest "I don't have a picture",
  `no-figure:deadline-before-generation` then `declined-cached`). Response fields, `VISUAL_TURN`
  and TURN_EVENT `visualServed` agree on all 25 (11 served / 14 not). `retirement` observed live:
  lc-circuits `suppressed` (reason from a later tier), reflection `replacement` (tier3 cached).
  The approved-beats-subject-wide path has no production concept (measured 0) so it is proven by
  tests only; math.calc.limits kept its card (index says none).
- **Defect found by the QA and fixed (follow-up commit):** a critic-reject retry on an explicit
  request makes a provider call, but `generationSpent` was taken from the first (cached) result,
  so VISUAL_TURN logged `generationSpent=false` and the per-session generation budget never
  counted the retry (lc-circuits: `no-figure:retry-structurally-invalid`). Now counted.

## 2026-09-24 — Biology: bio.mol.dna-replication gets a replication-fork figure

The concept was served the `dna_structure` kind default (a static Watson-Crick ladder with a
GC-content label; `scope.ts` had demoted it: "no replication fork"). It now owns an authored
figure, `sceneGenerators/dnaReplication.pure.ts`, registered in `CONCEPT_SCENES` — the same
mechanism as the 18 bio.cell scenes; no resolver, retirement or precedence change. Content is
drawn only from the KG description and the concept's EB entry (which prescribes "a replication
fork with both template strands' 5′/3′ ends labelled"): helicase at the fork, antiparallel
templates with 3′/5′ ends, one primer + continuous leading strand growing toward the fork,
Okazaki fragments built away from the fork each with a primer (oldest primer already replaced),
DNA polymerase, primase, ligase at a nick, "semiconservative". Nothing outside the concept
(no topoisomerase / SSB / clamp). Fitted to the tutor contract's caps (6 stages, 14 texts —
`visualSemantics.ts`) so every text drawn is one the tutor is told about; passes the
`layout.ts` authoring gate at desktop/tablet/mobile and a Chromium render with measured label
boxes (390px, 1280px). Registry row untouched (`dna_structure` stays bound and its shared
instance unchanged); the `INSUFFICIENT_FOR_CONCEPT` verdict and the B2 "requires authoring"
entry were removed as their documented exit; two ledger counts updated with the reason (override
table 56 → 57, authoring queue 48 → 47). Tests: `dnaReplicationVisual.test.ts`.
Production QA (`scripts/qa/dnaReplicationProductionQa.ts`, two disposable accounts, both deleted;
deployments dpl_5noHraz3295k6ZW6jZVdENGc7Aad then dpl_J9YwkHWTVA2k8LUHPHNfp9vELPXy): the fork
figure served on the normal turn, the explicit request and the diagram follow-up, held on the plain
turn; no base-pairing ladder, no food chain; bio.mol.transcription afterwards got no figure (no
leakage). VISUAL_TURN matched the response on all 10 turns of each run. Run 1 found the tutor
saying Okazaki fragments are extended "toward the fork" with the next primer "further back" —
stage 5's narration now states the direction and primer order outright (26f8e6a); run 2's
follow-up and plain turns state it correctly. Open, model prose only: the tutor still embellishes
the figure's appearance ("little motor", "orange block" for the helicase dot) despite the
contract's rule against naming unlisted colours/shapes; ASCII-art remnants on no-figure turns
(transcription, nucleic-acid-structure, photosynthesis) are the known-open defect.
