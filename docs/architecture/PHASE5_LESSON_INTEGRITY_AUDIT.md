# Phase 5 — Lesson Integrity, Evidence & Progression: Read-Only Audit

Series B, Phase 5. Written before any fix in this phase, per the phase's own
instruction ("do not modify anything during this audit"); the two Case-G
regex fixes and the Case-D streak fix described later in this document were
applied after this audit was drafted, and this document was updated to
record them rather than rewritten to hide the order of work.

Central invariant under audit:

> THE TUTOR MUST NEVER ADVANCE A LEARNER ON UNVERIFIED OR INCORRECT
> EVIDENCE, AND MUST NEVER GET STUCK IN A STATE THAT HAS NO VALID NEXT
> ACTION.

Scope discipline carried over from Phases 1-4 (all COMPLETE, not reopened
here): Track K / EOS canonical ladder untouched; Phase 3 arbitration is the
only precedence system; Phase 4's `ExcursionState`/`knowledgeGap.ts` are the
only detour mechanism; no new parallel state machine.

## 1. Lesson phase

- **Owner:** `ConversationState.phase` (`conversationState.ts`), one of
  `OBSERVE→DEMONSTRATE→GUIDE→CHECK→PRACTICE→TRANSFER`.
- **Readers:** `gateAssessment.ts` (`isMasteryGatePhase`,
  `isProbeAttachablePhase`), `masteryGate.ts`, `signalVerification.ts`
  (advanced-phase bare-content/latency checks), the TURN DIRECTIVE prompt
  builder, `turnArbitration.ts` consumers, `selectQuestionStage`.
- **Writers:** exactly one — `advanceConversationState`'s phase-transition
  switch, called once per turn from two sites in `route.ts` (the primary
  fold at ~5443, gated off during an excursion; the fallback fold at ~6715
  when the primary path did not run).
- **Persistence:** `contextSnapshot.conversationState.phase`, round-tripped
  by `readConversationState`/spread over `initialConversationState` — a
  concept change or unreadable shape resets to `OBSERVE`.
- **Authority:** single-writer. No other module mutates `phase` directly.
- **Possible conflicts:** none found. The one documented near-miss (A2b in
  `conversationState.ts`'s own comments) is a *measurement*, deliberately
  not wired into the reset decision, not a live conflict.

## 2. Question eligibility

- **Owner:** `gateAssessment.ts` (`isMasteryGatePhase` = CHECK/PRACTICE,
  `isProbeAttachablePhase` = GUIDE + mastery-gate phases) combined with
  `turnArbitration.ts`'s `NEW_QUESTION`/`AUTHORED_PROBE` capabilities.
- **Readers:** the MCQ-attach site in `route.ts`, `withholdUngradedGateQuestion`,
  `withholdClosingProseQuestion`, `closingTurnWithholdsQuestion`.
- **Writers:** none — this is a pure predicate over phase + arbitration
  verdict, not stored state.
- **Persistence:** none (recomputed every turn from `conversationStateHoisted.phase`
  and `turnArbitrationHoisted`).
- **Authority:** `turnArbitration.ts` is the single precedence authority
  (Phase 3); `gateAssessment.ts` decides *where in the ladder* a question may
  be sought, arbitration decides *whether this turn is allowed to ask at
  all*. Both must agree; neither overrides the other silently — a losing
  capability is *absent* from the prompt, per Phase 3's design.
- **Possible conflicts:** none found beyond the two Phase 3 live-verification
  defects already fixed and closed (CONVERSATION block header, RECOVERY-turn
  MCQ withholding) — not reopened here.

## 3. Question correctness

- **Owner:** `mcq.ts`'s `gradeMcqAnswer`/`resolveMcqChoice` — the ONLY
  ground-truth grading path in the codebase (deterministic exact/near
  match against a server-stored `correctIndex`).
- **Readers:** `route.ts` (`mcqGradeHoisted`, computed early, gated on
  `!isBareAcknowledgement(message)`), which OVERRIDES the model's
  self-reported `teachingSignal.correctness` when it resolves — "ground
  truth beats self-report" (route.ts ~4397-4416, confirmed by direct read).
- **Writers of the *pending* MCQ itself:** `conversationStateUpdate.pendingMcq
  = mcqHoisted`, written at route.ts ~6507 — AFTER all arbitration/withhold
  logic has resolved the FINAL served MCQ for the turn, so it cannot go
  stale (Case F, confirmed by tracing all 7 `pendingMcq` read/write sites).
- **Persistence:** `contextSnapshot.conversationState.pendingMcq`.
- **Authority, in order:** (1) deterministic MCQ grading when a pending MCQ
  exists — wins outright; (2) `signalVerification.ts`'s self-consistency
  check (CONTRADICTED flips the tag to match the model's own text; SUSPICIOUS
  flags but does not block phase advancement, only strict-mastery evidence);
  (3) `answerableTurn.ts`'s `shouldSuppressSignalCorrectness` — suppresses
  `correctness` entirely when no pending MCQ exists and the prior assistant
  turn posed nothing answerable (closes the "no question at all" sub-case);
  (4) `isBareAcknowledgement` — nulls the WHOLE signal object outright when
  the learner's message is a bare acknowledgement, regardless of what the
  prior turn asked.
- **Possible conflicts / residual gap (STILL UNKNOWN, not fixed):** a
  genuinely free-response (non-MCQ) prose calculation question, below asset-
  contract probe coverage, where the model's self-report is internally
  self-consistent (so `signalVerification` reports CLEAN) but factually
  wrong — e.g. the model miscalculates the collision result and confidently
  says "correct!". Closing this structurally would need either full probe
  coverage (protected content work, out of scope) or a new independent
  answer-verification subsystem (explicitly forbidden — "another parallel
  state machine" / "making the model answer better"). Reported honestly as a
  residual gap under the existing 3-tier defense, not fixed.

## 4. Learner evidence

- **Owner:** `TurnEvidence` (the options object passed once per turn to
  `advanceConversationState`) — the single fold point for everything a turn
  is allowed to claim happened.
- **Readers:** `advanceConversationState` only; every other consumer reads
  the *resulting* `ConversationState`, never `TurnEvidence` directly.
- **Writers:** `route.ts`, assembling `TurnEvidence` from
  `teachingSignal`/`mcqGradeHoisted`/`recoveryKeyHoisted`/`learnerRequestHoisted`/
  `signalVerificationStatusHoisted`/etc. — all already-computed, already-
  gated hoisted values; `TurnEvidence` itself performs no detection.
- **Persistence:** not persisted directly — only its FOLDED effect on
  `ConversationState` is persisted.
- **Authority:** single fold function, single writer.
- **Possible conflicts:** none found. Phase 5 adds one new field,
  `fillerTurnDetected` (Case D), following the exact same fold discipline as
  every existing field.

## 5. Remediation

- **Owner:** `ConversationState.remediationCount` /
  `ConversationState.consecutiveFailures`, written inside
  `advanceConversationState`'s `learnerRequest === 'explain_differently'`
  branch (open/increment) and the graded-correct success branch (Phase 4
  fix: `next.remediationCount = 0` on the same evidence that already clears
  `consecutiveFailures`).
- **Readers:** `decideNextMove`/`decideNextMoveHeuristic` (struggle-based
  next-move selection), `recoveryGuard.ts`'s escalation ladders,
  `turnArbitration.ts` (RECOVERY authority).
- **Writers:** `advanceConversationState` only.
- **Persistence:** rides `contextSnapshot.conversationState`.
- **Authority:** single writer; Phase 4 closed the "never exits" defect
  (previously one writer, zero resets). Re-verified in this phase (Case C)
  via direct tests on the real fold function — OPEN→wrong stays open,
  OPEN→correct closes, OPEN→acknowledgement neither closes nor fabricates
  mastery.
- **Possible conflicts:** none found. `masteryGate.ts`'s `CompletionGateOptions.
  excursionActive` and remediation state are independent axes — a
  remediation loop and an excursion can theoretically coexist (a learner in
  remediation who then asks an off-lesson question) but neither can
  authorize the other's gate.

## 6. Mastery evidence

- **Owner:** `ConversationState.correctAtCheck`/`correctAtPractice` (raw,
  phase-advancing, unconditional on `signal.correctness === true`) and
  `verifiedCorrectAtCheck`/`verifiedCorrectAtPractice` (gated on
  `signalVerification` status CLEAN or absent — feed `masteryVerifiedStrict`,
  the completion authority).
- **Readers:** `masteryGate.ts` (`masteryVerified`, `masteryVerifiedStrict`),
  `gateLessonCompletion`, the TURN DIRECTIVE.
- **Writers:** `advanceConversationState`'s CHECK/PRACTICE phase-advancement
  switch.
- **Persistence:** rides `contextSnapshot.conversationState`.
- **Authority:** two-tier by design — raw counters drive the TEACHING
  ladder (may over-advance on a SUSPICIOUS-but-unverified signal, a
  deliberate anti-over-blocking tradeoff), verified counters drive
  COMPLETION (never advance on anything less than CLEAN verification).
  Re-verified directly in this phase (Case E): an unverified-only signal
  with `signalContradictions > 0` cannot satisfy `masteryVerifiedStrict`
  even when raw counters are saturated.
- **Possible conflicts:** the one already-fixed and closed conflict is the
  detour-attribution defect gateLessonCompletion's own doc comment
  describes ("THE LESSON IS PAUSED, SO IT CANNOT FINISH") — not reopened.

## 7. Lesson completion

- **Owner:** `masteryGate.ts`'s `gateLessonCompletion` — the single
  authority for the `[LESSON_COMPLETE]` tag.
- **Readers:** the client's completion PATCH is driven by whether this tag
  survives into the served text.
- **Writers:** the LLM emits the tag (advisory); `gateLessonCompletion`
  strips it unless `!excursionActive && masteryVerifiedStrict(state)`.
- **Persistence:** the STRIPPED tag never reaches persistence; an
  authorized tag drives `StudentProgress`/`TopicProgress` writes downstream
  (school-mode-adjacent code, not re-audited here — out of scope, no
  Educational Brain / curriculum touch).
- **Authority:** single gate function, checked BEFORE any evidence test —
  no amount of evidence overrides an active excursion.
- **Possible conflicts:** none found; re-verified directly in this phase
  (Case E tests): excursion-active suppresses even with fully verified
  mastery; no-excursion + verified mastery authorizes.

## 8. Acknowledgement

- **Owner:** `masteryGate.ts`'s `isBareAcknowledgement` (whole-message,
  punctuation-tolerant, phrase-list + emoji-only detection).
- **Readers:** `route.ts` (nulls the ENTIRE `teachingSignal` object outright
  for a bare-acknowledgement turn, at ~4372-4373 — the strongest of the four
  correctness guards, independent of whether the prior turn asked an
  answerable question), `advanceConversationState`'s `acknowledgement`
  evidence field (advances DELIVERY phases only — OBSERVE→DEMONSTRATE→
  GUIDE→CHECK — never the mastery gates).
- **Writers:** none — pure predicate.
- **Persistence:** none directly; its EFFECT (a nulled signal, or a
  delivery-phase-only advance) is what persists.
- **Authority:** single detector, single consumer path. Re-verified
  directly in this phase (Case B): 10 consecutive acknowledgement turns
  move neither `correctAtCheck`/`correctAtPractice` nor
  `masteryVerifiedStrict`.
- **Possible conflicts:** none found.

## 9. Progression

- **Owner:** the composite of items 1 (phase), 6 (mastery evidence), and 7
  (completion) above — there is no separate "progression" store; it is the
  read-out of those three.
- **Readers:** the dashboard/curriculum layer (out of scope — no
  curriculum/schema change here).
- **Writers:** same as items 1/6/7.
- **Persistence:** same as items 1/6/7.
- **Authority:** unchanged from items 1/6/7 — no new authority introduced.
- **Possible conflicts:** none found beyond what items 1/6/7 already cover.

## 10. Stop

- **Owner:** `turnIntent.ts`'s `readTurnIntent` (`wantsToStop`, sourced from
  `sessionLifecycle.ts`'s `detectExplicitFinishRequest`) for THIS-TURN
  detection; `sessionLifecycle.ts`'s `episodeNeedsPersist`/`deriveEpisode`/
  `forceClosing` for CROSS-TURN persistence (Series B Phase 1, "stop
  persistence," commit `ceb7bd3` — COMPLETE, not reopened).
- **Readers:** `turnArbitration.ts` (CLOSE authority), the TURN DIRECTIVE.
- **Writers:** `sessionLifecycle.ts`'s episode-derivation functions;
  persisted only when the derived episode genuinely diverges from the
  stored one (`next !== persisted` by construction — `deriveEpisode`
  returns `prev` itself when nothing changed).
- **Persistence:** `contextSnapshot.sessionEpisode` (or equivalent — Phase 1's
  own scope, not re-derived here).
- **Authority:** `turnIntent.ts` explicitly records `STOP_AND_QUESTION`/
  `STOP_AND_REQUEST` as CONTRADICTIONS but does not resolve them (Phase 1
  scope: "no 'stop beats question', no resolution of disagreement" — that
  resolution is `turnArbitration.ts`'s CLOSE-vs-others precedence, Phase 3).
- **Possible conflicts:** by design, `turnIntent.ts` only RECORDS the
  stop-vs-question/request conflict; `turnArbitration.ts` resolves it. Both
  are Phase-1/2/3 territory, already COMPLETE. Nothing new found or
  touched.

## 11. Prerequisite detour (excursion)

- **Owner:** `excursion.ts`'s `ExcursionState`/`decideExcursion` (Phase 4
  reused this unmodified machine rather than building a new one; Phase 4
  added exactly one new input, `knowledgeGapConceptId`, gated on equaling
  the resolver's own `requestedConceptId`).
- **Readers:** the visual target resolver (never draws a lesson figure
  mid-detour unless the detour targets a KG concept), `masteryGate.ts`'s
  `CompletionGateOptions.excursionActive`, `advanceConversationState`'s
  caller (`route.ts` freezes the fold entirely — `conversationStateAfterTurnHoisted
  = excursionActiveHoisted ? conversationStateHoisted : advanceConversationState(...)`).
- **Writers:** `decideExcursion` only.
- **Persistence:** `contextSnapshot.visualSession` (or the excursion's own
  snapshot key — Phase 4/prior scope).
- **Authority:** single machine, `turnCountsForLesson()` prevents
  mastery/completion attribution during a detour; `MAX_EXCURSION_TURNS = 40`
  safety valve; `returnToConceptId` anchors the return.
- **Possible conflicts:** Case D's fix interacts here only incidentally —
  `fillerRepairStreak` is frozen during an excursion exactly like every
  other `ConversationState` counter, since the fold is skipped wholesale
  (documented, not a new inconsistency). No other conflict found.

## 12. Visual request

- **Owner:** `visual/resolveVisualTarget.ts`'s `resolveVisualTarget` /
  `requestTargetsSomethingElse`, fed by `concept/requestedConcept.ts`'s
  `resolveRequestedConceptId` (the SAME concept-resolution authority
  `decideExcursion` uses — "two consumers see the same answer by
  construction," per that module's own docblock).
- **Readers:** the visual-contract prompt block, `masteryGate.ts`'s
  `requestedVisualForm`.
- **Writers:** none new — a pure resolver over the message + lesson
  context.
- **Persistence:** `contextSnapshot.visualSession` (topic/figure identity),
  out of this phase's scope to modify (protected: visual assets).
- **Authority:** single resolver, shared with the excursion layer by
  construction — cannot disagree about "what topic was named" by
  architecture, not by convention.
- **Possible conflicts:** none found. The Case-G `TOPIC_REQUEST_RE` fix
  (item 2 below) widens WHICH REQUESTS this resolver recognises as
  "explicit," but does not change resolution authority or introduce a
  second source of truth — `isExplicitTopicRequest` in `excursion.ts` and
  the visual layer's own request-detection both read the exact same
  regex, so the fix is visible to both consumers identically.

---

## Findings requiring a fix (both applied, both minimal, both tested)

### Case D — filler-repair statelessness (genuine defect, FIXED)

The filler-repair mechanism (route.ts, gated by `shouldRepairFillerTurn` +
`detectFillerTurn`) replaced a content-free turn with ONE fixed sentence,
with NO cross-turn memory of having already fired. A model stuck producing
filler received the byte-identical canned sentence forever — the literal
shape Case D forbids.

Fix: `ConversationState.fillerRepairStreak` (new counter, folds like every
sibling consecutive-counter in the file) + `shouldApplyFillerRepair`
(bounds the EXISTING repair at `FILLER_REPAIR_STREAK_CAP = 2` consecutive
filler-shaped turns, then steps back and lets the model's own text stand
rather than force a third identical robotic question). No second repair
mechanism invented; no new copy. See `fillerRepairStreak.test.ts`.

### Case G item 3 — recoveryGuard `dont_know` intensifier gap (genuine defect, FIXED)

`recoveryGuard.ts`'s bare `dont_know` pattern (`I ... know`) was the ONE
negated-verb pattern in the file with no optional intensifier group, while
ten sibling patterns already carry one (scared: really|so; the sibling
`dont_understand` pattern at the same file: really|just; its "get it"
variant: still; confused: so|really|totally). "I still don't know enough
about the mole concept" and "I really don't know how to start" matched
nothing. Found live during Phase 4 verification (recorded there as R3,
explicitly deferred to this phase).

Fix: added `(?:really\s+|still\s+|just\s+)?` to the one outlier pattern —
words already used elsewhere in the same file, no new vocabulary invented.
See `recoveryGuardIntensifier.test.ts`.

### Case G item 2 — `TOPIC_REQUEST_RE` missing "need to learn" (genuine defect, FIXED)

`visual/session.ts`'s `TOPIC_REQUEST_RE` (shared verbatim by
`isExplicitTopicRequest` in `excursion.ts` and the visual layer) recognised
"I want to learn X" but not "I need to learn X" — the same modal request
with a different auxiliary. "I need to learn compound structures first"
could not open an excursion via the ordinary explicit-topic-request path.

Fix: added `need` as a synonym of `want` in the existing alternation — a
narrow, measured widening of an already production-measured regex (this
file's own "40-topic production run" precedent), not a new frame. See
`topicRequestNeedToLearn.test.ts`.

## Case G items correctly left AS-IS (verified, not assumed)

- Item 1 / item 5 (unresolved named concept, e.g. "compound structures"):
  the KG genuinely has no such title (checked directly against
  `docs/chemistry/kg/graph.json`) — `resolveRequestedConceptId` correctly
  returns null rather than guessing, consistent with the L1 defect-fix's
  established "never guess" philosophy (see CLAUDE.md's L1 entry:
  "thermal conductivity now resolves to NOTHING... deliberately not faked
  with an alias").
- Item 4 ("I really don't understand this"): correctly classified as
  distress (`dont_understand`, already matched before this phase — line 184
  already carried the intensifier group), and correctly produces no gap
  since "this" names no concept — nothing to detour to.
- Item 6 (bare "I don't know"): correctly classified as distress, correctly
  produces no gap for the same reason.

All four verified via direct execution against the real KG and the real
resolver (see `phase5CaseCharacterization.test.ts`'s Case G section), not
inferred from reading the source alone.

---

## Adversarial review (Step 8)

Each scenario traced against the real modules, not guessed. Verdicts are
PROVEN (executed against real code in this session), VERIFIED-BY-DESIGN
(existing, already-production docblock/architecture directly answers the
question, re-confirmed by reading, not re-executed), or INFERRED
(architecture strongly suggests safety but was not exhaustively traced
through every route.ts branch — flagged honestly rather than claimed).

1. **Topic-change mid-remediation.** A learner with `remediationCount > 0`
   asks an unrelated question ("actually, what is entropy?"). `decideExcursion`'s
   open condition has no remediation-state exclusion — it opens exactly as
   it would on any other turn. Because the fold is skipped wholesale while
   `excursionActiveHoisted` is true, `remediationCount` is neither
   incremented nor reset by the detour; it resumes exactly where it was on
   return. **VERIFIED-BY-DESIGN** (audit items 5 and 11 above; remediation
   and excursion are independent axes of `ConversationState`, and only the
   excursion axis freezes during a detour).

2. **Prerequisite-of-a-prerequisite.** Mid-detour to concept B (a
   prerequisite of lesson A), the learner reports not knowing C (a
   prerequisite of B). `excursion.ts`'s own docblock is explicit: "NO
   NESTING, EVER. A second off-lesson question during an excursion REPLACES
   the target and keeps the original `returnToConceptId`" — so the chain is
   always `A → B → C → A`, never `A → B → C → B → A`. **VERIFIED-BY-DESIGN.**
   One genuine but non-blocking finding: `classifyKnowledgeGap`'s
   `lessonPrerequisites` input (route.ts ~2143-2149) is always computed from
   `excursionLessonConceptId` — the ORIGINAL lesson A's prerequisites, not
   B's — so C would be labeled `relationship: 'related'` rather than
   `'prerequisite'` even though it genuinely is a prerequisite of the
   CURRENT excursion target B. This does not affect `gapOpensThisConcept`
   (which only compares concept ids, never reads `relationship`), so no
   wrong excursion, no wrong progression, no fabricated evidence results —
   it is a cosmetic/telemetry label only. Not fixed: correcting it would mean
   plumbing the excursion's live target through to the gap classifier, a
   larger change than this single-label inaccuracy warrants, and no
   Completion Criterion depends on the label's accuracy. Reported, not
   patched.

3. **Diagram request during remediation.** `learnerRequest === 'diagram'`
   increments `diagramRequests` only — it carries no `signalCorrect` value
   by construction (the detector that recognises "show me a diagram" is not
   the detector that grades an answer), so it cannot close remediation or
   fabricate mastery no matter when it occurs. **VERIFIED-BY-DESIGN**, and
   PROVEN indirectly: `phase5CaseCharacterization.test.ts`'s Case B/C tests
   already establish that only `signalCorrect === true` evidence moves
   mastery or closes remediation.

4. **"I'm done" during a prerequisite detour.** `wantsToStop` is CLOSE-layer
   authority (Phase 1-3, unchanged); `gateLessonCompletion`'s
   `!opts?.excursionActive` gate is unconditional — it does not distinguish
   WHY `[LESSON_COMPLETE]` was attempted (a genuine finish vs. a stop-driven
   one). **PROVEN** in `phase5CaseCharacterization.test.ts`'s Case E tests
   (excursion-active suppresses completion even with fully verified
   mastery) — the same protection covers a stop-during-detour without any
   stop-specific code path.

5. **Provider failure during a detour.** A degraded turn's evidence
   discipline (`degradedTurn` guarding `demonstrated`/`taughtThisSession`,
   PROVEN in Case E) is orthogonal to excursion persistence — `excursion.ts`
   has no `degradedTurn` parameter and does not read provider state at all;
   the excursion's own persisted snapshot key is written independent of
   whether the turn's TEXT came from a real generation or an outage
   template. **INFERRED**: no coupling was found by reading both modules,
   but this was not exercised against a live degraded-provider turn in this
   session (Gemini/Groq quota exhaustion during a real excursion is
   external, non-reproducible state — see CLAUDE.md's 2026-08-19
   certification note on rate-limit-bounded live testing). Reported as
   INFERRED, not claimed PROVEN.

6. **General sweep — can Case D's new `fillerRepairStreak` get stuck, survive
   too long, or conflict with Phase-3 arbitration?** No. It resets on any
   turn where `detectFillerTurn` is false OR the block does not run at all
   (an `assembled`/memory-served turn, which never reaches the filler-repair
   site — `fillerDetectedHoisted` stays at its default `false`, correctly
   resetting the streak on the next real fold). It freezes during an
   excursion exactly like every other counter (audit item 11). It sits
   STRICTLY AFTER the `turnArbitrationHoisted.allows('FILLER_REPAIR')` check
   in `route.ts` — arbitration decides whether the repair mechanism may act
   AT ALL this turn; the cap only bounds repeated identical application
   GIVEN that arbitration already allowed it. Two independent, layered
   gates, no conflict. **PROVEN** (`fillerRepairStreak.test.ts`).

---

## Live verification (disposable QA account, deployed app)

`scripts/qa/phase5-lesson-integrity.ts`, one disposable account
(`qa-phase5integrity-…@mytutor-qa.invalid`), three real subject sessions
(Physics, Chemistry, English), against `https://my-tutor-flame.vercel.app`.
Account deleted afterwards; `cleanup: {"deleted":true,"reloginBlocked":true}`
confirmed. Never the real user account (`liveAccount.ts`'s
`FORBIDDEN_ACCOUNTS` enforces this structurally).

**Physics — wrong answer → remediation → correct recovery, plus repeated
acknowledgements.** A real CHECK-phase MCQ appeared ("a puck on frictionless
ice…"); answering it wrong (`"It stops"` against `correctIndex: 1`) left
`check`/`practice` at `0/0` (A-1 PASS) and did not authorize
`[LESSON_COMPLETE]` (A-2 PASS). Four consecutive acknowledgements
("ok"/"got it"/"sure"/"thanks") never moved `checkCorrect`/`practiceCorrect`
off `0` even as the DELIVERY phase legitimately advanced `OBSERVE → DEMONSTRATE
→ GUIDE` (B-1 PASS — the exact Case-B distinction: delivery phases may
advance on acknowledgement, mastery gates never do) and rendered four
genuinely distinct texts, not one repeated canned line (D-1 PASS). A
follow-up gradeable MCQ did not surface within the bounded engagement budget
after the remediation request, so A-3 (correct-answer recovery) is
**UNMEASURED this run**, not failed — the underlying mechanism
(`gradeMcqAnswer`, ground-truth-overrides-self-report) is independently
PROVEN offline in `phase5CaseCharacterization.test.ts`'s Case A section.

**Chemistry — knowledge gap → prerequisite detour → return.** "I don't know
enough about the mole concept" produced a 1,493-character explanation of the
mole (marshmallow-count analogy through to Avogadro's number) — mole
language present (G-2 PASS) — and left `mastery.verified: false` for the
parent lesson throughout (G-3 PASS). "ok, I understand the mole concept now,
let's go back to mixtures" correctly returned to mixtures language (G-4
PASS), and no turn in the sequence authorized `[LESSON_COMPLETE]` (G-5
PASS).

**One live finding required correcting the TEST, not the product — reported
honestly rather than hidden.** The gap turn's response ALSO carried an
attached MCQ (`"A unit of mass" / "A unit of amount of substance" / "The
number of atoms in a molecule" / "The volume of a gas at STP"`, i.e. a
question about the MOLE — the gap concept itself, not the parent lesson).
This script's G-1 check, copied verbatim from `phase4-knowledge-gap.ts`'s own
G-1 ("the gap turn is not answered with a graded question"), asserted no MCQ
at all and therefore read FAIL. On inspection this is not a defect: G-1's
original wording described what Phase 4's own live run happened to observe
at the time, not a permanent invariant — teach-then-check about the concept
the learner just named, in the same turn, is exactly the intended
GUIDE/CHECK-phase behaviour (`isProbeAttachablePhase`), not the "quiz-first"
anti-pattern (asking BEFORE teaching) the First Lesson Standard warns
against. The invariants that actually matter for Case G — the reply teaches
the NAMED concept (G-2), and no PARENT-lesson mastery is fabricated (G-3) —
both independently PASSED. Recorded here rather than silently adjusting the
script and re-running, per this project's standing rule that a captured turn
is read before a verdict is believed.

**English — misunderstanding → remediation → acknowledgement → valid
continuation.** "I don't get it" produced a fresh worked example with no
mastery fabricated (C-B1 PASS). The following "ok, got it" was served
`provider: "memory"` (curated Explanation Memory content, not an LLM call)
and still left `check`/`practice` at `0/0` (C-B2 PASS) — confirming the
acknowledgement guard holds even for a non-generated turn. "What comes
next?" then received a genuine, on-topic follow-up question ("If we delete
the first sound in the word 'cat,' what word do we get?"), proving the
tutor was not stuck (C-B3 PASS).

**Overall: 11 PASS, 1 UNMEASURED (budget-bounded, mechanism proven
offline), 1 FAIL-then-recalibrated (test defect, not product defect, fully
explained above).** No genuine live regression found.
