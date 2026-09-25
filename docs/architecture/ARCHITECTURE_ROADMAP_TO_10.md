# My Tutor — Architecture Roadmap to 10 (with steel man)

**Status: PLAN ONLY — nothing here is approved or scheduled.** Written 2026-09-24 at `main` d8df924,
from a read-only authority-map audit and an architecture score of the live code. Items marked
**OWNER** need explicit owner approval before any code (CLAUDE.md G1/G2; Phase 6 reopens the closed
"four primitives" scope). The adopted plan's stop condition ("get real learner traffic") still
stands; this roadmap runs alongside it, not instead of it.

Published page: https://claude.ai/artifact/7WkPcHFt4C5XUm2WLkcrsu

Read in this order: **§0 owner decisions** → §1 where we are → §2 what 10 means → **§5 the revised
plan (the one to follow)** → §4 why it was revised. §3 is the full item list that §5 schedules.

---

## 0. Owner decisions recorded since the first version (2026-09-24)

- **No school boards.** The product is organised by subject and concept map only. Board mappings
  (CBSE, UP Board, …) are out of scope, not deferred.
  - The leftover board code joins item 6.5 (dormant systems): School Mode
    (`SCHOOL_MODE_ENABLED = false`), `src/lib/education/cbse*Catalog.ts` and
    `upSocialScienceCatalog.ts`, `Profile.educationBoard`, the board-keyed chapter caches, and the
    out-of-date admin settings text.
  - Those catalogs map chapters to 51 legacy topic IDs that do not exist in the live maths map, so
    they could not be switched back on anyway.
  - The Hindi/Sanskrit catalogs stay untouched (CLAUDE.md constraint).
- **No real traffic yet.** The product is not yet good enough to put in front of learners.
  - Until it is, "real traffic" in this plan means synthetic-student runs on a small launch set of
    topics (new items 0.7 and 0.8).
  - Real learners are invited only onto topics that pass the scorecard.
- **Content today** (`scripts/assets/contract-audit.ts --all`, seed corpus):

  | Subject | Topics with content | At contract |
  |---|---|---|
  | Physics | 238 / 238 | all |
  | Chemistry | 186 / 186 | all |
  | Biology | 199 / 199 | all |
  | English | 216 / 216 | 409 of 412 topic–level pairs |
  | Maths | 761 / 908 (147 have none) | all authored pairs |
  | Computer science (not learner-visible) | 119 / 119 | 30 |

  - Candidate launch set: a 20–30 topic path through physics mechanics (`phys.mech.*`, 60 topics,
    foundational → expert). It has complete content and the most visuals and prior QA.
  - The choice is the owner's (0.8).

## 1. Where we are: 4/10 for reliability and defect resistance

The decision core is sound and should be preserved. The score is pulled down by the edges:

1. **The durable learner record has no single gate.** `TopicProgress` is written at 10 sites in 6
   modules; four act on claims sent by the browser. The worst is in the normal UI flow:
   the Practice panel (`LessonScreen.tsx:5067`) shows questions whose answer keys the model wrote
   (`api/quiz/generate`). The browser marks them (`PracticePanel.tsx:86`), and `api/practice/submit`
   trusts the resulting `correct[]`; 80% or more sets MASTERED (`deriveTopicStatus`).
2. **Model tags carry facts into durable state.**
   - `[SIGNAL]` correctness becomes `PROBE_OUTCOME` evidence (`route.ts` ~L10426).
   - `[SIGNAL]`'s misconception phrase always becomes `MISCONCEPTION_DETECTED` (~L10466).
   - Neither row records who graded it.
   - The browser acts on `[LESSON_COMPLETE]` in the reply text (`LessonScreen.tsx:2288`) as well as
     on the structured `lessonComplete` field (L2200).
3. **The reply is correct by repair, not by construction.** There are 60 text-rewrite sites after
   generation, and the output verifier runs in log mode. It would reject 55% of replies
   (15,744 verified turns).
4. **The turn is one 12,620-line function.** It has 120 mutable `…Hoisted` locals, 325 dynamic
   imports and 72 `systemPrompt +=` sites. What a value means depends on line order.
5. **The commit is not a unit.**
   - `route.ts` has no transactions; about 10 writes, several not awaited.
   - The session snapshot delta is `Record<string, unknown>`, with 14 hand-mirrored conflict
     re-folds (the C7 defect class).
6. **No real turn can be replayed.** The per-turn logs record decisions only: not the inputs, the
   model draft, or the state before the turn.

Already strong, and preserved by every step below:
- server-owned graded questions (`gateAssessment`, `findBestProbe`, `probeToMcq`) with
  deterministic grading (`gradeMcqAnswer`/`resolveMcqChoice`);
- verified vs plain counters (an invented key cannot certify);
- one mastery verdict (`conceptMasteryVerdict`) read by the reply, the completion gate and the
  record;
- one owner of the served question (`mcqToServe`) and one writer of figures (`resolveVisualForTurn`);
- single-writer stores (`writeSnapshotDelta`, `appendEvidenceEvent`, `lessonAttemptStore`);
- pure deciders (`turnArbitration`, `questionLegality`);
- TurnContract/TurnDelivery (batches 1–3 live);
- `turnHarness.ts`, which runs the real route;
- egress discipline.

## 2. What "10" means (all must hold for 4 consecutive weeks on real traffic; before launch, on synthetic-student runs over the launch set)

| # | Criterion |
|---|---|
| C1 | Every durable learner-state write goes through a server authority and carries provenance. Zero writes based on correctness sent by the browser. |
| C2 | Every checkable fact the learner sees is server-owned: question, key, grade, verdict, completion, figure identity/labels, computable numbers. The model never supplies a fact through a tag. |
| C3 | Every post-generation change to the reply is a named, counted clause. Verifier rules are enforced only where measured net benefit is positive. |
| C4 | For every migrated cluster, downstream stages read facts from the typed contract, never from a mutable local. |
| C5 | One commit step per turn: ordered, awaited for learner state, idempotent, with a typed delta. Conflict re-folds are generated from the same fold. |
| C6 | Sampled real turns replay deterministically, and the replay corpus gates every change. |
| C7 | The lesson opening has the same guarantees as a chat turn. |
| C8 | Content is verified before it ships (lints as gates) and watched once live (per-question statistics). |
| C9 | Invariants I1–I11 are asserted in CI and in production shadow; the trust/state invariants alert at more than 0. |
| C10 | False mastery = 0; invented-key questions served at contract = 0; learner-visible defect rate below a threshold set from the Phase 0 baseline. |
| C11 | No dormant or duplicate pipeline exists without a named owner decision. |
| C12 | The owner of any fact can be found from one authority map generated from the code. |

**Limit on the ambition.** Model prose will never be defect-free. A 10 means the remaining defects
are low-stakes wording, are caught within a day, and can never reach the learner record.

### Replay invariants (referenced by C6/C9)

| # | Invariant |
|---|---|
| I1 | Determinism: the same replay record gives byte-identical text, question, figure, delta and writes. |
| I2 | Question provenance: a served question has an `assetId`, or is flagged model-invented. A model-invented key never moves the verified counters. |
| I3 | Grade provenance: every mastery-counter change and `PROBE_OUTCOME` names its `gradeSource`. |
| I4 | Completion: `lessonComplete.complete` ⇒ `conceptMasteryVerdict(after)` and no excursion is open. The text and the field agree. |
| I5 | Monotone: no write lowers `masteryPct` or demotes MASTERED/COMPLETED. |
| I6 | One commit: the state change is exactly the declared delta plus the declared writes. Nothing is written after the response. |
| I7 | No answer before the question: `dropAnswerLeaks(final text, served question)` finds nothing. |
| I8 | Figure truth: no figure pointer when there is no figure; colour words are a subset of the scene's colours. |
| I9 | Feedback: the verdict phrase matches the grade. |
| I10 | Each authored question yields at most one correct credit per attempt. A re-ask happens only via `mcqReasked`, once. |
| I11 | Replay capture adds zero reads on the serving path. |

## 3. The full item list (unrevised; §5 schedules it)

Sizes are relative: S small, M medium, L large.

### Phase 0 — Measure first (no behaviour change)
- **0.1 Replay capture (`TurnReplayRecord` v1).**
  - Behind a flag, owner/QA accounts first; write-only; 14-day retention; zero serving-path reads.
  - Records: inputs, the snapshot before the turn, reads, flags, one clock value, model drafts,
    response, delta, writes.
  - Size L. **OWNER** (new storage).
- **0.2 Replay loader for `turnHarness.ts`.** Seeds the in-memory store and returns the recorded
  drafts in order. Done when at least 95% of turns replay byte-identical on the same commit. Size M.
- **0.3 Remove non-determinism.** The 20 `Date` usages in `route.ts` become one turn clock; pin
  query and iteration orders. Size M.
- **0.4 Invariant module I1–I11.** Run on replays in CI and as a production shadow
  (`INVARIANT_VIOLATION`). Size M.
- **0.5 Baseline dashboard**, from Vercel logs plus aggregate-only SQL:
  - defects per 100 turns, and per AI provider
  - false-completion attempts
  - invented-key questions served
  - evidence that comes only from the model's `[SIGNAL]` tag
  - verifier would-reject per rule
  - how often each rewrite clause fires

  Size S.
- **0.6 Verifier precision table.** Adjudicate a sample per rule from `[verifier-log]` lines.
  Size M, recurring.
- **0.7 Synthetic students and scorecard.**
  - Model-driven personas: a beginner with the topic's known misconceptions, a careless student,
    a strong student, a confused student who asks for examples and diagrams, and an off-track
    student.
  - They run on disposable accounts, extending `scripts/qa/learnerPilot.ts`, `studentTurn.ts` and
    `liveAccount.ts`.
  - Code checks every turn: does the verdict wording match the grade; was the answer leaked; did
    anything repeat; did the lesson get stuck; was mastery reached.
  - A model-based marker scores factual errors and whether feedback matches what the student said.
    It is spot-checked for accuracy.
  - Scorecard per topic: mastery reach rate, turns to mastery, defects per 100 turns.
  - Egress and token budget: measure per turn on the first small run, then set a weekly cap.
  - Size L.
- **0.8 Launch set.** 20–30 topics along one prerequisite path in one subject. A topic is ready
  when every persona can reach mastery and three runs show zero critical defects: false praise, a
  wrong fact, a leaked answer, or a stuck lesson. Size S. **OWNER** (choice).

### Phase 1 — Close the trust boundary (C1)
- **1.1 Practice panel: keys on the server.**
  - Reuse the `api/final-assessment/generate` pattern: store the questions with `correctIndex` on
    the server; the browser sends the chosen index; the server grades.
  - Model-written keys never set MASTERED.
  - Size M. **OWNER**.
- **1.2** The same for the standalone `/quiz` page. Size S.
- **1.3 `api/assessment/evaluate`.** Remove the write based on browser-sent scores. Delete the dead
  `[ASSESSMENT_RESULT]` protocol from the prompt (`route.ts` L1589–1611): the model is told to emit
  it and the server then strips it. Size S. **OWNER**.
- **1.4 `api/topic-progress` PATCH `complete` requires server evidence** (LessonAttempt COMPLETED,
  or a recorded verified verdict). start/skip/start_revision/resume are unchanged. Size S.
- **1.5 `api/curriculum/progress` PATCH.** `mastered` stops defaulting to `true`, and completion
  requires server evidence. Size S.
- **1.6** `api/visual-mastery/persist` rows are marked browser-reported and never count toward
  mastery. Size S.
- **1.7 One gate module for learner-record writes**, with a CI ratchet that forbids direct writes
  elsewhere. Size M.
- **1.8** `masteryPct` never goes down, and MASTERED/COMPLETED are never demoted, enforced in that
  gate. Size S.

### Phase 2 — Evidence provenance (C1/C9)
- **2.1** Add `gradeSource` (`server-key` | `model-key` | `model-claim`) to every `PROBE_OUTCOME`.
  Size S.
- **2.2 `MISCONCEPTION_DETECTED` only from server-graded taps on authored distractors**
  (`choices[].misconceptionId`) or authored detectors. `[SIGNAL]` phrases become telemetry.
  Size M. **OWNER**.
- **2.3** `[SIGNAL]` correctness never becomes evidence as fact. Whether it may still move the phase
  ladder is an owner decision. Size S. **OWNER**.
- **2.4** Evidence readers (`studentIntelligence.ts`, learner profile, revision) weight or filter
  by provenance. Size M.

### Phase 3 — Facts out of the prose (C2)
- **3.1 One completion channel.** The browser acts on `data.lessonComplete` only, and the server
  stops passing `[LESSON_COMPLETE]` to it. Size M.
- **3.2 Server-written verdict line** after every graded answer: the grade plus the option the
  learner actually chose. The model writes the explanation after it. Size M. **OWNER**.
- **3.3 Claims about the learner's answer are checked** (fixes "I see you identified N₂"). Size M.
- **3.4 Written policy for model-written questions.** Never at contract. Below contract they are
  served, labelled unverified, and never certify. Size S. **OWNER**.
- **3.5 Figure facts.** The resolver publishes each figure's elements (labels, colours, direction);
  claims about them are checked. Size L.
- **3.6 Computed numbers** in worked examples, from server templates (needs 8.4). Size L.
- **3.7** The remaining tags (VISUAL, HINT, ATTEMPT) stay proposals checked against server lists.
  Size S.

### Phase 4 — Verify by contract (C3)
- **4.1** Each of the 60 rewrite sites becomes a named clause in `TurnDelivery`, with a CI ratchet
  against unnamed rewrites. Size L.
- **4.2 Per-rule enforcement** in `verifierGate.ts`, from measured precision (needs 0.6). Size M.
- **4.3 Regeneration budget of 1**, aware of the turn deadline. The fallback always teaches
  (authored explanation or KG description), never a content-free hold. Size M.
- **4.4** Retire clauses that never fire over 8 weeks. Size S, recurring.
- **4.5** Replace the 72 prompt-append sites with one prompt builder compiled from `TurnContract`
  (needs 6.1). Size L.

### Phase 5 — State and commit (C5)
- **5.1** A typed `SnapshotDelta`. Size M.
- **5.2** Conflict re-folds generated from the same fold, replacing the 14 hand-written ones.
  Property test: the primary fold equals the re-fold. Size M.
- **5.3 Commit module.** Ordered, awaited learner-state writes:
  assistant message → LessonAttempt → TopicProgress (via 1.7) → evidence → snapshot → replay record.
  Idempotent by `turnId`. Size L.
- **5.4** A turn status on the early-saved user message (pending/committed). Size S.
- **5.5** A per-session version check against duplicate submits. Size S.
- **5.6 Deliberately not one long DB transaction.** The `topic_progress` row-lock incident (R1)
  blocked 8 backends for up to 84 seconds.

### Phase 6 — Consolidate the chat route (C4/C11)
- **6.1** Typed Turn Contract batches 4b–8 (`TYPED_TURN_CONTRACT_DESIGN.md` §6), each byte-identical
  on the replay corpus. Size L. **OWNER**.
- **6.2** Stage extraction as a result of 6.1: load / contract / decide / artifacts / generate /
  deliver / commit become modules. Size L.
- **6.3** Delete the `…Hoisted` locals as their consumers move, and delete dead code (e.g.
  `stripCompletionOnBareAcknowledgement`, which has no caller). Size M.
- **6.4** One composition function for the deciders, with written precedence and property tests.
  The deciders themselves are unchanged. Size M.
- **6.5** Decide the dormant systems: kernel pipeline, `Eb*` tables, `educationalBrain`,
  `teachingActionEngine`, and the School Mode / board leftovers (§0; Hindi/Sanskrit untouched).
  Size M. **OWNER**.

### Phase 7 — One pipeline for lesson openings (C7)
- **7.1** `lesson-init` runs the same stages as a turn with no learner message. Size M.

### Phase 8 — Content integrity (C8)
- **8.1** `probeOptionQuality` becomes a CI gate for new content; the existing corpus is
  ratcheted. Size S.
- **8.2 Lint for distractors that carry their own explanation** ("— dividing by the coefficient
  of 2"). Size M.
- **8.3 Per-question statistics from `PROBE_OUTCOME`** (the `assetId` is now carried): solve rate
  and pick rate per distractor. Inverted discrimination is flagged, since it usually means a wrong
  key. Size M.
- **8.4** Question templates with computed keys for the launch set. Size L. **OWNER**.
- **8.5** An answer-key audit of the launch set. Size M.
- **8.6** At least 5 gradeable questions per concept per level for the launch set. Size M.

### Phase 9 — Tests that protect behaviour (C6/C9)
- **9.1** A replay gate in CI. Size M.
- **9.2** No new tests that match `route.ts` source text (ratchet); migrate existing ones as their
  code moves. Size L.
- **9.3** Property tests for the invariants. Size M.
- **9.4** Nightly live QA on disposable accounts over a fixed concept set, egress-aware. Size M.

### Phase 10 — Operations (C9/C12)
- **10.1** Production alarms on trust/state invariants. Size S.
- **10.2** A registry of every `ENABLE_*` flag. Size S.
- **10.3** A replay gate before promotion, and rolling release for turn changes. Size M.
- **10.4** Targets reviewed monthly. Size S.
- **10.5** An authority map generated from the code and checked in CI. Size M.

## 4. Steel man

### 4.1 The strongest case for the roadmap
1. **Every item traces to a measured defect or a measured structural fact** from the audit. Nothing
   in it comes from general taste.
2. **Risk falls step by step.**
   - Silent record corruption is closed first, while it is cheap.
   - Measurement comes next.
   - Structural refactors come last, only behind a replay gate that proves each one changes
     nothing.
3. **No parallel pipeline.** Every step extends an existing owner: TurnContract, `turnHarness`,
   `writeSnapshotDelta`, the mastery gate, `lessonAttemptStore`. That complies with CLAUDE.md.
4. **"10" is a set of checkable criteria**, so progress can be measured and argued about with data.
5. **It covers all three sources of defects:** the learner record (integrity), the reply
   (visible quality) and the content (questions and keys).

### 4.2 Objections, tested

| # | Objection | Verdict | Change to the plan |
|---|---|---|---|
| O1 | Wrong time. There are no real learners yet, and the adopted plan says stop and get traffic. | **Partly survives.** A record that can be corrupted makes outcome data meaningless, so closing the trust boundary and measuring are prerequisites for trustworthy traffic. Everything beyond them is not. | Split into tiers (§5). Tier B/C items start only when baseline data points at them. |
| O2 | Full-state replay is too expensive: `route.ts` touches 18 models directly and 35 transitively. | **Partly survives.** `turnHarness` already answers unmodelled models with benign defaults. Replay tests the pipeline given a draft; prompt changes still need live evaluation. | 0.1 v1 captures only the harness's 6 modelled stores plus drafts; measure the byte-identical rate and widen only where it falls short. |
| O3 | Closing the progress endpoints will break the UI. | **Mostly rejected, with evidence.** Of 7 browser PATCHes to `api/topic-progress`, only one is `complete` (`LessonScreen.tsx` L2299), fired by the server-gated tag. The others (start, skip ×3, start_revision, resume) are learner intents and stay. The lesson-complete buttons already check the server's `masteryState.verified` in the browser (L4374); the server just doesn't re-check. | 1.4/1.5 are defence in depth with almost no UI change. **1.1 is the one hole the normal flow reaches, so it goes first.** |
| O4 | A server-written verdict line makes the tutor robotic. | **Rejected.** Feedback research separates verification (right/wrong) from elaboration. The server line is one short sentence stating the grade and the learner's own choice; the elaboration stays generated. The seam risk is real. | The model receives the verdict as input and is told not to restate it. |
| O5 | Phase 6 reopens scope that has cost budget twice, and the period of reading facts two ways creates D1-class defects. | **Survives.** A long function is not itself a defect; implicit contracts are. | Phase 6 becomes defect-driven: migrate a contract cluster only when a replayed defect traces to it, with no campaign to finish every batch. C4 is reworded to cover migrated clusters only. |
| O6 | Enforcing rules at 95% precision still harms, through latency and fallbacks. | **Partly survives.** | Enforce by expected net benefit: precision × severity against the cost of the fallback. Regenerate only for high-severity rules; measure p95 latency. |
| O7 | Content defects are underweighted, and Phase 8 comes too late. | **Survives.** Wrong keys, answer-revealing options and thin pools block mastery and mislead directly, today. | 8.1–8.3 move into Tier A. They are cheap: lints and statistics. |
| O8 | The launch subject is assumed. | **Resolved by owner decision.** There are no school boards. The launch set is a path of topics in one subject (0.8). | 3.6 and 8.4–8.6 target the launch set and wait until the owner picks it. |
| O9 | The criteria for 10 need traffic that doesn't exist, and the thresholds are arbitrary. | **Partly survives.** | Thresholds are set from the Phase 0 baseline. Until real traffic exists, the 4-week window runs on the nightly QA set and is labelled synthetic. |
| O10 | Cost: capture storage, nightly QA tokens, egress. | **Partly survives.** Capture writes are ingress; offline reads are egress. | Sample small, keep a fixed small QA set, and state a budget per item. |
| O11 | Awaiting every learner-state write adds latency. | **Partly survives.** R1 shows awaiting is sometimes required for correctness anyway. | 5.3 awaits learner-state writes only; telemetry stays asynchronous; measure p95 before and after. |
| O12 | Checking figure facts is expensive for a minority of turns. | **Survives.** | 3.5 moves to Tier C, only if the dashboard shows figure-claim defects above threshold. |
| O13 | The plan is dozens of sessions long, and may be left half-done. | **Partly survives.** | Every item ships and reverts independently, and the tiers are ordered by value. Stopping after any tier still leaves the system better. |
| O14 | Why not redesign from scratch? | **Rejected.** The core authorities are proven and carry their measured failure history in code and tests. A redesign would have to re-learn each of those defects. | None. |

## 5. The revised plan (the one to follow)

**Tier A — before or with the first real learners (expected ≈ 6/10)**
- 0.7 – 0.8 synthetic students, scorecard and launch set — **first**: how quality is measured
  without real learners
- 8.1 – 8.3 content lints as gates, and per-question statistics
- 3.2 / 3.3 server verdict line and answer-claim check (moved up: wrong feedback is one of the top
  visible defects)
- 1.1 Practice-panel keys on the server (the one trust hole the normal UI reaches; must close
  before real learners arrive)
- 1.2 the `/quiz` page
- 1.3 retire the browser-scored evaluate write and the dead prompt protocol
- 1.4 / 1.5 completion requires server evidence (defence in depth)
- 1.7 learner-record gate + ratchet; 1.8 monotone
- 2.1 `gradeSource`; 2.2 misconceptions from graded distractors
- 3.1 one completion channel
- 0.1 (v1, test accounts only, so the synthetic runs become the replay corpus) + 0.2 replay
  capture and loader; 0.5 baseline dashboard

**Tier B — once the baseline shows where defects are (expected ≈ 8/10)**
- 0.3 / 0.4 determinism and invariants; 0.6 verifier precision
- 3.4 model-question policy
- 4.1 named clauses; 4.2 enforcement by net benefit; 4.3 regeneration budget + teaching fallback
- 5.1 – 5.5 typed delta, generated re-folds, commit module
- 7.1 lesson-opening parity
- 9.1 – 9.4 replay gate, property tests, nightly QA; 10.1 – 10.4 operations

**Tier C — only when data traces defects to them (expected ≈ 9–9.5/10)**
- 6.1 – 6.4 contract migration, cluster by cluster, driven by defects
- 4.5 prompt builder
- 3.5 figure facts
- 3.6 + 8.4 – 8.6 computed items for the launch set, once it is picked
- 6.5 decision on dormant systems
- 10.5 authority map generated from code

**10/10** = C1–C12 green for 4 consecutive weeks on real traffic, with real learners invited only
onto topics that pass the 0.7 scorecard.

**Hard dependencies**
- 4.2 needs 0.6
- 6.1 needs 0.2 and 9.1
- 4.5 needs 6.1
- 3.6 needs 8.4
- 5.3 needs 1.7

## 6. What not to do on the way
- Don't rewrite `route.ts` in one go, build a TurnPlan god object, or add a parallel pipeline.
- Don't merge the deciders into one engine.
- Don't wrap the whole turn in one DB transaction.
- Don't enforce the verifier globally before its precision is known.
- Don't hide every fact from the model: it loses coherence. Give it the facts and verify its
  claims.
- Don't add a new learner store. Durable Learner State is closed, and `studentIntelligence.ts` is
  canonical.
- Don't add subjects or 3D/SceneSpec scope before C1–C3 hold for the launch set.
- Don't rebuild school-board mappings: out of scope by owner decision.
- Don't touch egress-sensitive code (the `instrumentation.ts` bootstrap, the hydration guard, spine
  replay) without reading `docs/history/egress-incidents.md`.

## 7. Governance
- **OWNER approval** (learner-facing assessment/progress behaviour): 1.1, 1.3, 2.2, 2.3, 3.2,
  3.4, 8.4.
- **OWNER instruction** (reopens the closed primitives scope): 6.1.
- **OWNER decision:** 0.1 storage, 6.5 dormant systems (now including the board leftovers), and
  the launch set (0.8).
- Nothing in this document is approval. It is the proposal the owner approves item by item.

## 8. Evidence index
- `src/app/api/learn/chat/route.ts`
  - scale: 12,620 lines; 120 `…Hoisted` locals; 325 dynamic imports; 72 `systemPrompt +=` sites;
    60 post-generation rewrites; 14 `snapshotRederivers.push`; 0 `$transaction`
  - L308 user message saved; L1589–1611 `[ASSESSMENT_RESULT]` prompt; L6228 `parseSignalTag`
  - L7488–7510 `shouldSuppressSignalCorrectness`; L7895–8010 feedback patches
  - L9571–9577 completion fail-closed; L10333 `stripResidualMachineTags`
  - L10420–10480 evidence events; L10889 snapshot delta; L11195–11270 lesson-attempt outcome
  - ~L11931 `writeSnapshotDelta`; L11955 unawaited `StudentProgress` upsert
- `src/components/learn/LessonScreen.tsx`
  - L2200 `lessonComplete`; L2288 tag parse
  - L2299 / 2699 / 2735 / 2906 / 2934 / 2951 / 3682 topic-progress PATCHes
  - L2333 evaluate; L4374 and L5772 completion buttons; L5067 Practice panel
- `src/components/learn/PracticePanel.tsx` L86 (graded in the browser), L106–113 (submit)
- `src/app/api/`: `practice/submit`, `quiz/generate`, `final-assessment/generate`,
  `assessment/evaluate`, `topic-progress` (PATCH), `curriculum/progress` (PATCH)
- `src/lib/mastery/topicMasteryFormula.ts` `deriveTopicStatus`
- `src/lib/teaching/`
  - `masteryGate.ts`: `conceptMasteryVerdict`, `gateLessonCompletion`
  - `turnArbitration.ts`; `lessonAttemptStore.ts`; `topicProgressEvidence.ts`
  - `residualTagSweep.ts`; `assetContract.ts`; `assets/probeOptionQuality.ts`
  - `turnContract.ts`, `turnDelivery.ts`, `turnTelemetry.ts`, `turnDecision.ts`
  - `evidence/evidenceEngine.ts`; `visual/resolveVisual.ts`
- `src/lib/db/snapshotWrite.ts`; `src/tests/support/turnHarness.ts` (19 test files; 173 harness and
  contract tests passing); `src/tests/productionReplay.test.ts` (hand-built inputs, not a real
  replay)
- `docs/architecture/RUNTIME_ARCHITECTURE_MAP.md`,
  `docs/architecture/TYPED_TURN_CONTRACT_DESIGN.md` §6, `docs/history/four-primitives-saga.md`
