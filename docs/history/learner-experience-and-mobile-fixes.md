# Learner-Experience Remediation & Mobile Fixes (history)

> Extracted verbatim from CLAUDE.md during the 2026-09-17 memory-file
> collapse (CLAUDE.md kept to <500 lines of live rules). Dated entries below
> are historical record — read them for context, not as live instructions.
> Live rules remain in CLAUDE.md; see docs/history/INDEX.md for the full map.

## Learner-experience remediation (2026-08-11, production-verified)
- **L1 — the dropped qualifier.** "What is thermal conductivity?" resolved to `phys.em.resistivity`
  ("Resistivity and Conductivity"), i.e. ELECTRICAL conductivity: the learner asked about heat and
  the engine handed the tutor a concept about current. Cause: `deriveTitleComponents` admits a
  one-word conjunct of a compound title when that word occurs in exactly ONE title across all
  1,775 concepts. "Conductivity" clears that bar because the corpus has no thermal-conductivity
  concept — corpus uniqueness is a claim about the KG's COMPLETENESS and was being read as a claim
  about the world. Fix (`conceptIndex.ts`): a one-word TITLE_COMPONENT match is dropped when the
  token immediately in front of it is a qualifier the corpus assigns, unambiguously (exactly one
  domain), to a DIFFERENT domain. Corpus-derived, no phrase list, nothing mentioning heat.
  Measured across every "<word> <conjunct>" phrase occurring in the corpus: 461 phrases, 49
  affected, most of them the same defect elsewhere ("scope resolution" and "collision resolution"
  were being answered with the physics concept "Vector Addition and Resolution"). Never applies
  above TITLE_COMPONENT, which is why "orbital hybridisation" is untouched (chem.bond.hybridization
  matches on its FULL title and its text contains no "orbital" — any rule demanding the qualifier
  appear in the matched concept would have broken it). **"thermal conductivity" now resolves to
  NOTHING**: the physics KG genuinely has no such concept, and `phys.therm.heat-transfer` is a
  different thing. Adding it is Curriculum Pipeline work, deliberately not faked with an alias.
  Guard: `src/tests/qualifiedConceptResolution.test.ts`.
- **L3 — the requested form.** In an Ohm's Law lesson, "Can you graph this?", "show me a graph of
  this", "can you draw a diagram" and "show me an animation" all attached the identical curated
  `electric_circuit` scene. The circuit is the RIGHT curated figure and keeps its authority —
  nothing was removed, demoted or reordered, and a medium noun never overrides the tier order.
  What harmed the learner was the tutor then presenting that circuit as the graph it had been
  asked for. `requestedVisualForm()` (`masteryGate.ts`) reports plot/motion for unmistakable forms
  only; `buildVisualContractBlock` DECLARES the mismatch instead of resolving it.
  **Production-verified**: "Can you graph this?" now answers "I don't have a graph of this, but
  here is the circuit it describes…". Guard: `src/tests/requestedVisualForm.test.ts`.
- **L4 — UI density: the earlier number was wrong.** The previously reported "~112 desktop
  controls" was an instrument error — it counted every interactive element in the DOM, including
  the Play/"Read more" buttons on 100 scrolled-off earlier messages. Measured against the
  VIEWPORT on the real account: 44 controls at 1280, 28 at 1024, 48 at 768, and mobile 390 renders
  correctly. Dense, but not a crisis, so NO structural redesign was made and none is proposed on
  this evidence. What the measurement did surface: a hardcoded Russian noun in an aria-label
  (`${t('nav_previous')} урок` → "Previous урок" in English and "Pichla урок" in Hindi; fixed with
  a real `nav_previous_lesson` key in all three language blocks), seven simultaneous buttons all
  reading "Prerequisites needed ▼" with no indication of which lesson (now carry the lesson title
  + aria-expanded + a 24px hit area), and two 22×22 glyph-only maximize buttons announced as "⊞"
  (now 26×26 with aria-label). Guard: `src/tests/lessonNavigationLabels.test.ts`.
- **L2 — verified passing, deliberately untouched** per instruction. Question-form recall
  ("What happens during electrolysis?", "Why does light bend…", "What causes friction?", "How does
  a catalyst work?") is closed by the WEAK detector family (`isTopicQuestion`), which governs
  `requestTargetsSomethingElse` only. Adding those forms to the STRONG family was measured first
  and rejected: it made "why does temperature change it?" evict the figure being read.
- **CLOSED 2026-08-11 (commit `317e872`) — see "Unresolved-topic excursion" below.** The item as
  originally written follows, unedited, because its diagnosis was exactly right.
- **OPEN, and the most important one — question protection is resolution-dependent.** Measured in
  production AFTER this deploy: "What is thermal conductivity?" in a Free Body Diagram lesson gets
  one correct sentence about heat, then "Now, let's connect this back to our current lesson on Free
  Body Diagrams" — the exact forced steer-back P0-1 was meant to end. The P0-1 rule is present and
  correct in both `client.ts` and `conceptAnchor.ts`, but the DETERMINISTIC protection is the
  excursion lifecycle, and `decideExcursion` opens only on a resolved KG `requestedConceptId`. So
  when a learner names a topic the curriculum does not contain, the protection disappears exactly
  when it is most needed — and L1's fix makes that case MORE common, since it now correctly
  resolves such topics to nothing instead of to a wrong concept. Closing it means letting an
  excursion target a topic the KG does not have (the same shape `requestedTopic.ts` already gives
  the visual engine), which touches excursion state, persistence and the visual target — not a
  small change, and NOT attempted as a prompt patch.
- Full suite 291 files / 6,276 passed / 9 skipped; `npx tsc --noEmit` clean; `npm run build`
  clean. Commits `348b1f6`, `1e8bcff` on `main`, deployed (`dpl_J1hdYo4Z…`, READY, aliased to
  my-tutor-flame.vercel.app).


## Unresolved-topic excursion (2026-08-11, commit `317e872` on `main`)
- **Closes the OPEN item above.** An excursion may now target a TITLE when it cannot target a KG
  id, so the deterministic protection no longer switches itself off for the questions that need it
  most. `ExcursionState` gains `targetTopicTitle`; exactly one of it and `targetConceptId` is set
  while an excursion runs. The lifecycle is unchanged and keyed to neither — the lesson is still
  the return anchor, no nesting, confusion still does not close it, satisfaction still does, the
  turn limit still applies, and `turnCountsForLesson` still freezes the lesson's ladder. The one
  thing an unresolved excursion cannot do is name a curriculum concept, so it draws no figure and
  claims no asset.
- **Recall and restraint pull against each other, and both are measured.** Opening needs a wider
  net than `isExplicitTopicRequest`: it matches "explain X"/"teach me X" but NOT "What causes
  friction?" or "How does a catalyst work?". Widening alone is dangerous — across 31 risky
  phrasings, "What is the answer?", "What is the next step?", "What is the formula?", "What is my
  score?" and "How do I solve this?" all NAME something the lesson does not mention and would each
  have split a lesson in half. `namedTopicUnknownTo()` (in `requestedTopic.ts`, extracted from
  `requestTargetsSomethingElse` so ONE definition serves the visual layer and the Teaching Engine)
  applies three filters: it is a name at all; it is not purely a medium noun or lesson machinery
  (`DISCOURSE_NOUNS`, the measured sibling of `isMediumWord` — **one real word is enough to
  survive it**, so "chemical formula" and "first law" are unaffected); and it shares no vocabulary
  with the topic ALREADY being taught, which is what keeps "why?", "I am lost" and every in-lesson
  follow-up exactly where they are. `excursion.ts` stays KG-free and pure: the third filter needs
  the curriculum's text, so the ROUTE applies it and the caller's contract is documented on the
  `requestedTopicTitle` field.
- **No figure is relabelled.** Directive rule (6) read "any figure attached belongs to <target>"
  for every excursion; on an unresolved-topic excursion that was false — no figure of that topic
  can exist, so any figure present is the paused lesson's, and the clause told the model to
  relabel it. It now splits on whether a concept exists. The route also passes the visual resolver
  `lessonConceptId: null` on those turns, so a NEW lesson figure cannot be introduced while the
  tutor answers about something else; a figure already on screen is still left to continuity and
  keeps its own identity.
- **Measured offline against the real resolver and the real KG** (`unresolvedTopicExcursion.test.ts`,
  46 cases): all five production questions — thermal conductivity, moles, why light bends, what
  causes friction, how a catalyst works — open an excursion with `transition: 'started'`, target
  the learner's own words, and anchor the return to the lesson. 30 of 31 restraint phrasings stay
  put; follow-ups continue the excursion; "got it, thanks" closes it; a second topic switches
  without nesting.
- **PRE-EXISTING defect found, NOT fixed (out of scope):** "what is the point of this?" resolves to
  `math.geom.point` via `resolveRequestedConceptId` — a resolver false positive that predates this
  change and takes the RESOLVED path, so it opened a (wrong) excursion before this commit too.
  Touching the resolver is what produced the L1 qualifier defect; flagged for a dedicated session.
- **Production learner verification NOT performed — BLOCKED on credentials.** No account password
  is available to this session, `DATABASE_URL` is unset, and Supabase MCP lists 0 projects, so a
  throwaway account could be created but never cleaned up. Vercel SSO protection is ON for
  `*.vercel.app` (`all_except_custom_domains`); `my-tutor-flame.vercel.app` is the unprotected
  learner-facing alias and answers 200. Everything above is offline measurement against the real
  modules, not a live-session transcript.
- Suite 292 files / 6,322 passed / 9 skipped; `npx tsc --noEmit` clean; `npm run build` clean.

- **AssetIdentity state, read directly from production this session** (supersedes the older
  counts above): 1,589 ACTIVE HUMAN_CURATOR EXPLANATION rows over **683 of 1,775 concepts
  (38.5%)**, 1,533 ACTIVE PROBE rows over 604 concepts, 10 ACTIVE VISUAL. Per subject (explanation
  concepts): physics 238/238, english 216/216, chemistry 186/186, mathematics 43/908, biology 0,
  computer_science 0. Biology and CS remain the only subjects with no authored serving content.


## Mathematics readiness build (2026-08-18, autonomous — acting-CTO authority granted)
- **Run `npx tsx scripts/math/state.ts` before touching this subject.** It prints KG /
  Blueprint / Educational Brain / generation-readiness counts from source. Three figures in
  this file were stale at once when it was written (Blueprints recorded 529/908, actually
  908/908; EB 224, actually 257; math.geom 56/69, actually certified) and decisions were being
  made on all three. Do not hand-count and do not trust the numbers below over the script.
- **The asset contract** (`src/lib/teaching/assetContract.ts`, v1): >= 1 explanation and
  >= 3 closed-choice probes per served band. Three is the mastery bar itself
  (correctAtCheck >= 1 plus correctAtPractice >= 2) with no re-asking — the minimum that lets a
  perfect learner finish without the model volunteering a question. Measured 2026-08-18:
  **0 of 43** serving mathematics concepts met it (40 held two probes, 3 held one). Physics
  meets it at ~3.13 per concept, so the shortfall is a property of the seed template, not of
  the subject.
- **Why lessons could not close.** With the pool dry at PRACTICE the turn is handed to the
  model, whose `<!--MCQ-->` tag is an advisory prompt rule; when it asks in prose instead,
  `shouldSuppressSignalCorrectness` correctly refuses to record correctness for a question with
  no server answer key. Measured compliance across two full lessons: 3 of 7 opportunities.
  `withholdUngradedGateQuestion` (gateAssessment.ts) now withholds the QUESTION and keeps the
  TEACHING on such turns — a backstop for a concept below contract, never the cure.
- **Blueprints are NOT a learner-facing corpus** — the correction that reshaped the plan.
  908/908 is a FILE count. 908/908 carry a Misconception Registry (2,595 rows, median 3) and
  that is genuine; but of 2,205 parsed "explanation" blocks, 728 are Learning Objectives or
  Mastery statements written ABOUT the student, and only **199 concepts** carry a real
  `Core Explanation` (69 of them on the 245 spine). Serving assets must be AUTHORED for ~675
  concepts, grounded in the misconception registry — offline and batched, so Permanent Rule 9
  (one LLM call per turn) is untouched. Full detail:
  `docs/architecture/MATHEMATICS_BUILD_STATUS.md`.
- **Certification is the harness, never a count** (`scripts/math/certify.ts`, drives the REAL
  endpoint). Asserts D1 taught-before-quizzed, D2 every counted question gradeable, D3
  CHECK->TRANSFER without unbounded repetition, D4 mastery agrees across stores, D6 no
  referenced-but-missing figure and no malformed LaTeX. D5 (band) needs a database.
  It refuses the engineering account outright, and reports **DIRTY-STATE** rather than PASS
  when a session carries prior mastery into turn 1 — `/api/sessions` resumes any ACTIVE session
  from the last 24h and `mode: 'restart'` does not clear the ladder, so isolation cannot be
  assumed. First real result: `math.geom.slope` PASS in 6 turns, verified, from a clean start.
- **Content shipped**: `mathematicsSeedAssets.ts`, 18 authored closed-choice probes taking all
  10 serving `math.arith` concepts to >= 3 gradeable questions per served band. DRAFT only —
  promotion stays human, through `/api/admin/knowledge-assets`.
- **First complete certification, 2026-08-19**: all 43 serving concepts run as real lessons
  against the deployed app — **36/43 PASS, 43/43 reached verified mastery**. Every concept
  COMPLETED; the failures are quality flags on the way through, not learners left stuck. The 7
  remaining are all `D2-ungradeable` and are the contract gap, because the 58 authored probes are
  in git and unseeded. Falsifiable prediction recorded: seeding clears all seven — diff against
  `docs/architecture/MATHEMATICS_CERTIFICATION_2026-08-19.json`. Two real product defects were
  fixed on the way (the ungradeable-question class; the OPENING turn comes from
  `/api/learn/lesson-init`, which has no visual pipeline at all and had no figure gate, so a
  learner's first contact with a lesson could be an instruction to read a figure that was never
  attached). The harness itself needed SIX corrections in the same period, all the same root
  cause — built from a model of the product rather than from the product. Read the captured turn
  before believing a verdict.
- **Seeding cannot be done from a session — verified, not assumed (2026-08-19)**: the Supabase MCP
  surface is a READ-ONLY transaction (`25006: cannot execute CREATE TABLE in a read-only
  transaction`), so no amount of batching helps. It needs a real `DATABASE_URL`, and one
  idempotent run of `npx tsx scripts/brain/seed-knowledge-assets.ts --draft` finishes it.
- **Still blocked, and these set the cost curve**: no provider key here (so the ~675 concepts
  that need authored content cannot be generated in this environment) and no `DATABASE_URL`
  (so nothing can be seeded — `npx tsx scripts/brain/seed-knowledge-assets.ts --draft` is
  idempotent and finishes it in one run wherever that exists).


## Chemistry made servable (2026-08-19)

- **The blocking defect, measured**: chemistry held exactly **2** ACTIVE closed-choice probes per
  concept for all 186 concepts, against an asset contract of **3** (`correctAtCheck >= 1` plus
  `correctAtPractice >= 2`, and the gate never re-asks a spent probe). **0 of 186 concepts were at
  contract, so no chemistry lesson could reach mastery.** The other 314 probes were authored, in
  git (`chemistrySeedAssets.ts` carries 372 explanations + 687 probes), and unreachable — the only
  writer that had ever seeded them is `scripts/brain/seed-knowledge-assets.ts`, which needs a
  `DATABASE_URL` no session in this environment has ever had.
- **Now**: `chem.%` holds **687/687 ACTIVE probes over 186/186 concepts at >= 3**, plus 372
  explanations over 186 concepts. Verified against production: 0 duplicate canonicalSlugs, 0
  hollow identities (probe or explanation), 0 non-ACTIVE rows, every probe 2-3 choices with
  **exactly one** `isCorrect` — 687/687 gradeable.
- **How, and why it is durable**: chemistry joined `BOOTSTRAP_SEED_SUBJECTS` and the cold-start
  bootstrap's corpus (`src/instrumentation.ts`), so the content is written by the one writer that
  DOES have database access. Seeding by hand through the Supabase MCP was rejected on cost: the
  SQL has to pass through the session context twice (once read, once as the tool argument), about
  320 KB for the checkpoint probes alone.
- **Four real defects were found on the way, each measured before it was fixed:**
  1. **The completeness guard measured the wrong set.** It compared this corpus (4,144 identities)
     against a DISTINCT-slug count over every seed-owned row in the table (4,219) — rows written
     historically by the script, whose corpus includes files the hook does not import. The guard
     was already satisfied with 314 chemistry probes absent; only hollow-row repairs kept the run
     alive, and once those finished it would have skipped forever. Presence and hollowness are now
     an intersection of the existing prefetch with the slugs the corpus declares.
  2. **The seed corpora were being compiled into the EDGE bundle.** Next compiles
     `instrumentation.ts` for both runtimes; the `NEXT_RUNTIME !== 'nodejs'` guard is a RUNTIME
     guard, and the edge runtime has no code splitting, so webpack inlined every `await import()`
     regardless of reachability. Deploy `dpl_7HZgvv4M` failed with
     `NOW_SANDBOX_WORKER_MAX_MIDDLEWARE_SIZE` (1.17 MB vs a 1 MB limit);
     `edge-instrumentation.js` gzipped to 1,124,399 bytes carrying 372 chemistry concept ids.
     `next.config.js` now substitutes `src/instrumentation.edge.ts` for the edge compilation only.
     **Middleware 1.2 MB -> 79.7 kB** — this budget had already been hit once before, by edge
     source maps, which is what the neighbouring `config.devtool = false` line is for.
  3. **The bootstrap never had wall-clock.** Every cold start logged `Socket timeout` on the run's
     FIRST query, while `EXPLAIN ANALYZE` of that exact query against production measured
     **10.025 ms** (4,219 rows, seq scan of a 5,386-row table) with 18/60 connections in use. The
     database was never slow: `register()` fired the run without awaiting it, and a serverless
     instance FREEZES once its response is sent — `/api/health` returns in ~200 ms. It now awaits
     under a deadline (`ASSET_BOOTSTRAP_DEADLINE_MS`, 12s) so progress is deterministic instead of
     incidental to how long some unrelated request happened to take. Also fixed en route: the hook
     ran its OWN PrismaClient, so each instance opened two pools of `connection_limit=15` against
     a `max_connections=60` database — it now uses the app singleton.
  4. **40 sequential nested creates could not fit in a slice.** First cold start with real
     wall-clock wrote **three** assets with the budget nowhere near spent. The loops now plan in
     memory and flush with `createMany` — four round trips instead of forty; `skipDuplicates`
     (ON CONFLICT DO NOTHING against the seed lineage's partial unique index) replaces the
     per-asset P2002 catch, and the flush reads back which of its own ids landed before writing
     content rows, because a skipped row belongs to a racer under a different `assetId`. Budget
     40 -> 150, since batched it bounds payload rather than latency. Convergence then took **two
     cold starts**: 382 -> 572 -> 687.
- **Known cost, stated rather than discovered later**: `register()` now awaits, so every cold start
  pays a fixed few seconds (Prisma connect + evaluating 1.37 MB of seed source + validating 4,144
  identities) before the guard returns, even when there is nothing to do. A persisted
  completeness marker would remove it and is NOT in this change.
- **Reported honestly**: an early 24-way request burst fired to force cold starts exhausted the
  connection pool and took `/api/health` to `db:false` for about five minutes. That is the same
  failure at larger scale, and it is why the connection diagnosis above is measurement rather than
  theory. Later rounds used 5 concurrent requests with a health check between each.
- **NOT verified this session**: no chemistry lesson was certified end to end.
  `scripts/math/certify.ts` refuses `suaibamr@gmail.com` by name (it is the engineering account,
  not a learner), and it is the only account this session has credentials for. Everything above is
  measured against production data and the real modules — not a learner transcript.
- **Biology and computer_science remain script-only and at 0 rows** (432 and 476 authored items).
  They were deliberately left out of the bootstrap corpus: their corpora have not been measured
  against the asset contract, and adding them would have turned "make chemistry servable" into
  "seed everything".


## Mobile lesson navigation fixed (2026-08-19)

- **Reported symptom**: on the mobile web lesson screen, the Previous/Next lesson controls
  did not move to the next or previous lesson.
- **Reproduced with production data, not theory** — Chromium cannot reach the app through this
  sandbox's egress proxy (four flag combinations all `ERR_CONNECTION_RESET`), so instead the real
  account's `GET /api/curriculum?subject=chemistry` payload was read and the REAL
  `findNextLesson`/`findPreviousLesson` were run against it. That payload:
  `currentLesson=1`, `completedLessons=[]`, `activeLessonSlug='chem.found.pure-substances'`
  (the open lesson is order 3). The shipped functions answered `next -> order 2 "States of
  Matter"` (BEHIND the open lesson) and `prev -> null` (a null renders the button `disabled`).
  So "Previous" did nothing and "Next" went BACKWARDS — the symptom exactly.
- **Cause**: both functions anchored on `progress.currentLesson`, a COMPLETION counter that only
  advances when a lesson is recorded complete/skipped. The lesson actually open is
  `resolveActiveLesson()` (honours `activeLessonSlug`). They diverge the moment a learner opens a
  lesson ahead of their recorded progress — the ordinary case. NOT mobile-only (logic is shared
  with desktop); mobile is just where a side-by-side backwards jump is unmistakable.
- **Fix, two commits**:
  1. `94f8c1b` — `findNextLesson`/`findPreviousLesson` resolve their anchor from
     `resolveActiveLesson` inside the functions (not via an optional caller param, which is how
     the two ideas of "current" drifted apart). The same wrong anchor one line above, in
     LessonScreen's tutor POSITION line (`order === currentLesson`), was fixed to
     `resolveActiveLesson` too — the model was being told "Lesson 1 of 186. Today: Nature of
     Matter" while teaching lesson 3.
  2. `7ca5d4b` — the anchor only moves if something writes `activeLessonSlug` on switch, and
     nothing did on the client. `callLessonInit` sent `topicSlug` to the SERVER but never wrote
     it back to local state, so a second tap of "Next" re-opened the same lesson until the next
     chat turn's `data.lessonOrder` sync cleared the slug — and lesson-init renders an opening
     WITHOUT a chat turn, which is the exact window the buttons live in. It now writes the target
     slug + `lastLessonTitle` into local progress on success and bumps `progressGenerationRef`
     (the skip/complete/restart contract, so an in-flight chat response can't clobber it).
- **Evidence the tests are real**: the 58 pre-existing `lessonNavigation.test.ts` cases pass in
  BOTH the broken and fixed states — every fixture omits `activeLessonSlug`, which is exactly why
  the suite never caught this. 7 new cases built from the production payload FAIL (4 of them) with
  the anchor temporarily reverted and pass with the fix; `lessonSwitchAnchor.test.ts` reproduces
  the "second tap re-opens the same lesson" defect as a passing test so the client sync isn't
  decorative. Re-confirmed against the live payload post-deploy: `next -> 4`, `prev -> 2`.
- **NOT verified**: an actual on-device browser tap (proxy blocks Chromium here). Everything is
  measured against the real production API payload and the real modules, plus source assertions
  that the client performs the write. Full suite 374 files / 8,273 passed / 9 skipped; tsc clean;
  build clean. Deployed `dpl_FJE9TBEGkTAdrc4pBD2KNLMZiNZp` READY on `7ca5d4b`.


