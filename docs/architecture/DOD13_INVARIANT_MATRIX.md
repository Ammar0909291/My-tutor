# DoD #13 — Adversarial Invariant Matrix

The mission's Definition-of-Done #13: a consolidated, OFFLINE adversarial proving
matrix that drives the **real** fold / gates / predicates through every recurring
("Tutor Max") failure class and asserts, per class, that the architecture *prevents*
the defect — not that a detector notices it after the fact.

This document is the map. It is deliberately **not** a new test that re-implements
what the suite already proves — the mission forbids duplicating the large existing
suite. Its job is to make the enforcement legible in one place: for each historical
failure class, the single OWNER of the decision, the INVARIANT that owner enforces,
and the falsifiable TEST that pins it. A future session reads this to answer one
question — *"is this class of bug still architecturally possible?"* — by citation,
and to see immediately if any class has slipped to detection-only or lost its pin.

**Reading rule.** "Never confuse 'we fixed this bug' with 'the architecture no
longer permits this class of bug.'" A row earns **PREVENTED** only when a test
drives the real module through reachable states and asserts the bad state cannot
arise. A row is **DETECTED** when the only guard is a post-hoc check that can be
outvoted; those are called out explicitly and are candidates for future
consolidation, never quietly counted as safe.

Method and history: `ARCHITECTURE_REPAIR_LEDGER.md`. Census: `OWNERSHIP_CENSUS_2026-09-01.md`.
Post-hoc rewrite classification: `POSTHOC_REPAIR_CENSUS.md`.

---

## The matrix

| # | Failure class (the "Tutor Max" defect) | Single owner | Invariant enforced | Enforcing test(s) | State |
|---|---|---|---|---|---|
| 1 | **Mastery certified by one authority, refused by another** — record/payload say "mastered" for a lesson the completion gate would not complete | `conceptMasteryVerdict` (masteryGate.ts) = `masteryVerifiedStrict` | completion gate ≡ client payload ≡ permanent record, for **every** state (reachable or not) | `masteryVerdictSingleOwner.test.ts` (512-state grid, `payload===record===gate===owner`); `masteryAuthorityAgrees.test.ts` (three-way bidirectional) | **PREVENTED** |
| 2 | **Mastery reached out of order** — PRACTICE credit before a CHECK credit; TRANSFER with zero graded evidence | `advanceConversationState` fold (conversationState.ts) | through the real fold `correctAtPractice≥1 ⟹ correctAtCheck≥1`; TRANSFER ⟹ practice≥2; `{check:0,practice:2}` and evidence-free TRANSFER are UNREACHABLE | `foldReachabilityInvariant.test.ts` (negative/ordering); `masteryLadderReachable.test.ts` (positive path) | **PREVENTED** |
| 3 | **An acknowledgement buys mastery** — "got it" / "go" / "next" credited as a correct answer | fold acknowledgement branch, keyed on `isLowSignalAcknowledgement` | an acknowledgement moves delivery phases only; never a gate counter, never a demotion | `acknowledgementAdvance.test.ts` (mastery-counter guards + route-order replay through real `detectFailureState`); `acknowledgementOwnership.test.ts` | **PREVENTED** |
| 4 | **"I understand" demotes the learner** — model self-reports incorrect on a turn the server never graded; fold takes its `failed` branch | route signal-null guard, keyed on the **ladder** predicate `isLowSignalAcknowledgement` (not the narrow `isBareAcknowledgement`) | an ungraded acknowledgement at CHECK/PRACTICE/TRANSFER holds the phase; a genuine wrong answer still demotes | `acknowledgementNeverDemotes.test.ts` (verbatim live turn through the real fold + structural wiring assertion) | **PREVENTED** |
| 5 | **A question ships on a turn that must not ask one** — a post-generation ADD puts a new question on a RECOVERY / CLOSE / LEARNER_REQUEST turn | `turnArbitration` (`RECOVERY > LEARNER_REQUEST > CLOSE > COMPLETE > TEACH`) | both post-model question-ADD sites (filler-repair, completion-nudge) sit inside an arbitration-gated block; the arbiter is arbitrated once per turn | `questionAddArbitration.test.ts`; `turnArbitration.test.ts`; `gateEligibilityTelemetry.test.ts` | **PREVENTED** |
| 6 | **Two stage machines disagree** — an executor step advances while the canonical phase demotes on the same evidence | canonical `ConversationState.phase`; the executor step is DERIVED (`teachingStepIndexForPhase`) | one stage pointer; the derived step is monotonic across the ladder and never runs a second advance | `stageProgressionOwnership.test.ts`; `dispatcher.test.ts` | **PREVENTED** |
| 7 | **Asked for a graph, handed a circuit** — a request for one visual FORM answered by a different curated figure, presented as the thing asked for | `buildVisualContractBlock` (declares mismatch); `requestedVisualForm` reports FORM only | a form request never overrides tier order; a mismatch is DECLARED ("I don't have a graph of this, but here is…"), not silently resolved | `requestedVisualForm.test.ts`; `visualMediumDisambiguation.test.ts` | **PREVENTED** |
| 8 | **Learner-request re-derived by competing readers** — diagram / explain-differently / example decided in more than one place | `detectLearnerRequest` via `turnIntent.learnerRequest` (route Phase-1 read) | the teaching-action KIND has one authoritative read per turn; the visual-form and topic-request predicates answer different, complementary questions | `turnIntentAuthority.test.ts` (+ measured/preserved: ledger slice 6) | **PREVENTED** |
| 9 | **A named knowledge gap recorded against the wrong concept** — "I don't know enough about the mole concept" spends the affect budget and files a MistakeRecord against the LESSON concept, discarding the named object | `knowledgeGap.ts` (resolved gap → prerequisite excursion; `KNOWLEDGE_GAP` rung atop the arbiter) | a resolved gap opens a detour for the NAMED concept and is not graded as failure of the lesson concept; distress alone does not spend the graded budget | `knowledgeGap.test.ts`; `affectBudgetSpiral.test.ts`; `mistakeRecord.test.ts` | **PREVENTED** |
| 10 | **The lesson explanation is repeated verbatim** — a later model turn reproduces the authored explanation word-for-word | `buildTeachingMemoryBlock` (`explanationsServed` no-repeat, at the same authority as analogies/visuals/probes) | every already-served artefact, explanations included, carries an explicit do-not-repeat | `teachingMemory.test.ts` | **PREVENTED** |
| 11 | **A detour corrupts the paused lesson** — an excursion advances or demotes the lesson ladder, nests, or fails to return | excursion lifecycle (excursion.ts; `turnCountsForLesson` freezes the lesson ladder) | a detour freezes the lesson's ladder, does not nest, returns to the lesson anchor; confusion does not close it, satisfaction does; unresolved-topic detours claim no concept/figure | `excursionLessonPause.test.ts`; `unresolvedTopicExcursion.test.ts`; `knowledgeGapExcursionCloses.test.ts` | **PREVENTED** |
| 12 | **Recovery demotes below the floor or is out-argued** — a recovery turn strands the learner or loses to a lower-priority action | recovery preempts via the arbiter (`RECOVERY` at the ladder top; `phaseDown` floors at DEMONSTRATE once shown) | recovery preempts everything; the demotion floor holds; a repeated acknowledgement is never reclassified as frustration | `acknowledgementAdvance.test.ts` (recovery-preempts + route-order); `recoveryDetectionCoverageGap.test.ts` | **PREVENTED** |
| 13 | **A false `[LESSON_COMPLETE]` ships** — the model claims completion in prose on a lesson the gate refuses | `gateLessonCompletion` → `conceptMasteryVerdict`; `enforceStance` strips the false claim; fail-closed strips on gate error | completion is owned by the gate; a prose completion claim on an unmastered concept is stripped, not honoured; a gate error fails closed | `completionClaimInProse.test.ts`; `stanceEnforcement.test.ts`; `lessonCompletion.test.ts` | **PREVENTED** |
| 14 | **Correctness recorded for an ungraded question** — the model asks in prose (no server answer key) and its self-reported grade is folded as evidence | `shouldSuppressSignalCorrectness` / `withholdUngradedGateQuestion` (gateAssessment.ts) | a question with no server answer key records no correctness and, at the gate, withholds the question while keeping the teaching | `gateAssessmentIsServerOwned.test.ts`; `answerableTurnEvidenceGuard.test.ts` | **PREVENTED** |
| 15 | **A free-response answer certifies mastery on the model's self-report** — a prose answer the model marks correct (signalVerification CLEAN, no server key) banks a VERIFIED credit and certifies strict mastery | fold `verified` = `evidence.serverGraded === true` (conversationState.ts); `masteryVerifiedStrict` fallback gated on `!sawModernGrading` | a verified credit requires positive server-grade provenance (`gradeMcqAnswer` against an authored key); a modern prose-only lesson cannot slip through the legacy plain-counter fallback | `freeResponseCannotVerifyMastery.test.ts`; `strictMastery.test.ts`; `inventedKeyCannotVerify.test.ts` | **PREVENTED** |
| 16 | **A learner QUESTION is graded as an answer** — the tutor asked a gradeable question, the learner replies with a question, and the model's self-reported correctness banks evidence / advances the ladder / could ride an already-earned mastery into a close | signal-finalization seam (route.ts): the acknowledgement guard's sibling, the learner-question guard, reusing `detectLearnerQuestion`; completion still owned by `gateLessonCompletion` → `conceptMasteryVerdict` | a learner question with no resolved server grade drops the model's `correctness` (undefined, never false — no fabrication); the fold banks no plain or verified credit; completion needs verified mastery a question cannot supply; confusion survives so the question routes to teaching | `questionOnlyTurnCannotComplete.test.ts` | **PREVENTED** |

---

## What this proves, and what it does not

**Status (after slices 10–11): all 16 matrix classes PREVENTED**, by construction,
driven through the real modules — every row above. The only remaining DoD #13
detection-only site is deliberately NOT a matrix row: the TUTOR emitting a
question-only CLOSING turn (see below), a tutor-output presentation choice left
unrewritten under the never-fabricate rule — it is not an unauthorized
mastery/completion path (completion authorization stays gated by rows 13 and 16).
The mastery verdict (1) and its reachability premise (2) are the load-bearing pair —
slice 1's single-owner merge is only sound because the fold makes the out-of-order
mastery shapes unreachable, and rows 1–2 pin both halves so neither can drift without
the other's test failing first. Row 15 (slice 10) closed what was previously the one
class the architecture did not prevent — a free-response self-report certifying
mastery — by requiring positive server-grade provenance for a verified credit rather
than the absence of red flags. The design turned out NOT to need a new
answer-verification subsystem (the Phase 5 framing): the machinery existed; the defect
was that `verified` was defined by absence.

**One DETECTION-only choice remains, deliberate and documented — not silently counted
as prevented. Note it is about the TUTOR's OUTPUT, not a learner turn** (the
learner-question case is row 16, PREVENTED):

- **Tutor question-only closing turn** (`POSTHOC_REPAIR_CENSUS.md` Finding 2, route
  6766 else). When the TUTOR's whole closing turn is a single question, it ships
  unchanged and is logged, because the only enforcement alternative is fabricating a
  closing sentence, which the never-fabricate rule forbids. The honest enforcement is
  upstream (stop the model producing a question-only close) or a non-fabricating
  fallback to authored close copy — not a rewrite here, and an owner decision.
  Distinct from row 16: that is the LEARNER replying with a question (now prevented
  from becoming evidence); this is the TUTOR ending on a bare question.

**Narrow residual on row 15 (not a false-positive risk):** a concept with genuinely
zero server-gradeable probe coverage can no longer FALSELY certify (it is refused),
but it also cannot certify at all until it has probe coverage — which is correct
(there is no ground truth to verify against) and is content work tracked by the asset
campaigns, not an architecture gap.

**Not in this matrix, by mission rule:** the visual layer's internal ownership is
PRESERVED, not reopened (ledger slice 6); rows 7–8 pin only the request/availability
seam that faces the learner, which is where the reachable defect (L3) lived.

## Maintenance

- A new recurring-defect class gets a row here the moment it is measured and pinned —
  the row is the deliverable, the test is the enforcement.
- If any **PREVENTED** row's cited test is deleted or weakened to a source-string
  match that no longer drives the real module, the row drops to **DETECTED** and moves
  to the section above until re-pinned. A green suite with a hollowed-out test is the
  exact "we fixed the bug" illusion this matrix exists to refuse.
- Do NOT re-run a 60-concept live sweep to "re-validate" these — they are offline
  invariants against the real pure modules by design (mission rule). A live run
  re-confirms behaviour; it does not prove the architecture forbids the class.
