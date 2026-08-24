# PHASE 4 — STEP 0 AUDIT + STEP 1 DESIGN (Series B)
**STATUS: IMPLEMENTED for the RESOLVED path only.** §G's scope note is the binding one: a gap the
KG cannot title is UNCHANGED and still spends the affect budget. That is an owner decision, taken
on the evidence in §B — the frame extension that would close it is Phase 5.

Traced at dca7cdd1. No code was written when this was produced. Every claim below is either a file:line or a MEASURED probe
against the real modules and the real KG.

## A. THE CAUSAL CHAIN, PROVEN END TO END

MEASURED (real `readTurnIntent` / `detectFailureState` / `classifyConversation`):

    "I don't know enough about compound structures"
      -> failureState = 'dont_know'   isDontKnowSignal = true
      -> learnerRequest = null,  isQuestion = false,  ack = false
      -> CUE = RECOVERY

`TurnIntent` carries the PREDICATE ("don't know") and nothing else. The words
"compound structures" are gone at this point and no later stage can recover them.

Then, from source:

  1. route.ts:2576  `decideNextMoveDetailed({ recoveryTurn: true })` -> move forced to 'teach'
  2. Phase-3 arbitration gives the turn to RECOVERY (correctly, given its inputs)
  3. route.ts:6140  **a SYNTHETIC FAILURE is folded into the episode**:
         const syntheticSignal = { correctness: false, confidence: undefined, confusion: true }
         sessionEpisodeHoisted = applySignalToEpisode(sessionEpisodeHoisted, syntheticSignal, …)
     `applySignalToEpisode` increments `visibleFailures` and sets CLOSING at budget
     (2 turns; **1 in lesson one**).
  4. route.ts:6360  `const failureThisTurn = recoveryKeyHoisted !== null || …` -> `sessionFailureCount++`
  5. route.ts:6149  a MistakeRecord is written with **`topicSlug: resolvedConceptId`** —
     the concept being TAUGHT, not the concept the learner named.

**TWO gap statements close the session. In lesson one, ONE does.** The prompt's claimed chain is
confirmed exactly, with line numbers.

Every stage after (1) is behaving correctly. **The defect is that the reading is LOSSY.**
This is the Phase 1 defect class one level deeper: Phase 1 made the message be read ONCE; it did
not make the reading KEEP what it read.

## B. THE DECISIVE EXPERIMENT — resolution needs NO new detector

`resolveRequestedConceptId` does NOT require a request frame. It scans the whole message.
MEASURED against the real chemistry KG, lesson `chem.found.pure-substances`:

    "I don't know enough about the mole concept"    -> chem.found.mole-concept   ✓
    "I need to learn the mole concept first"        -> chem.found.mole-concept   ✓
    "I don't know what the mole concept means"      -> chem.found.mole-concept   ✓
    "I don't understand chemical equilibrium"       -> null   (not a KG title at this strictness)
    "I never learned the periodic table"            -> null
    "I don't know" / "I don't understand"           -> null   (nothing named — correct)

So the RESOLVED path needs **zero new regex**. The runtime already contains a deterministic,
confidence-floored, no-guess resolver that answers this question; nothing ever asks it on a gap
turn.

The strictness is DELIBERATE and must not be relaxed: loosening this resolver is what produced the
L1 qualifier defect ("thermal conductivity" -> electrical resistivity), and CLAUDE.md flags it for
a dedicated session. **Unresolved is therefore the COMMON case, not the edge case**, and the design
must treat it as the default rather than an exception.

## C. THE DETOUR MACHINE ALREADY EXISTS — do not build a second one

The prompt proposes `KnowledgeGapState { status, reportedConcept, resolvedConceptId,
sourceConceptId, relationship, confidence, evidence }`. Roughly 85% of it is `ExcursionState`,
which is live, persisted, and Phase-3-integrated:

  | proposed field    | existing                          | excursion.ts |
  |-------------------|-----------------------------------|--------------|
  | reportedConcept   | `targetTopicTitle`                | :64  "WHAT THE LEARNER CALLED IT" |
  | resolvedConceptId | `targetConceptId`                 | :56 |
  | sourceConceptId   | `returnToConceptId`               | :66  "owed a return. Set once, never nested" |
  | (infinite-detour) | `turns` + MAX_EXCURSION_TURNS     | :68 |
  | (mastery safety)  | `turnCountsForLesson()`           | :430 — a detour turn cannot complete the parent |
  | status            | `active` + `ExcursionTransition`  | :80 |

`ExcursionInput.requestedConceptId` is a documented extension point with a stated CALLER'S
CONTRACT. Building a parallel gap machine would be the "fourth parallel architecture" this phase
forbids. **REUSE.**

What is genuinely missing: (a) nothing ever offers the excursion a gap-derived concept, and
(b) `relationship` — excursion does not care whether the target is a prerequisite; a gap does.

## D. THE SECONDARY PROBLEM IS SHARPER THAN STATED

`remediationCount` (conversationState.ts) — grep gives FOUR references total:
  :136 declaration   :220 initialiser (0)   :616 `prev.remediationCount + 1`   :620 read

**One writer, increment-only. NO reset anywhere.** MEASURED:

    after "explain differently" x2      remed=2  consecFail=2  phase=OBSERVE
    after "Got it"                      remed=2  consecFail=2  phase=DEMONSTRATE
    after CORRECT                       remed=2  consecFail=0  phase=GUIDE
    after CORRECT x3                    remed=2  consecFail=0  phase=PRACTICE  check=1

`consecutiveFailures` DOES reset on success. `remediationCount` never does. So the prompt's
framing ("exited only by graded CORRECT evidence") is too generous: **it is never exited at all**,
short of a concept change resetting the whole ladder. The learner climbs OBSERVE->PRACTICE with
three correct answers and the prompt still reports "Strategies already attempted: 2. Do NOT reuse
any previous approach." forever.

Diagnosis: `remediationCount` is a monotonic TALLY being read as if it were a STATE.

## E. ANSWERS TO THE 26 AUDIT QUESTIONS (condensed; all traced)

 1 Learner knowledge: `ConversationState` (per-concept ladder, snapshot), `TopicProgress`/
   `ConceptMasteryRecord` (durable), `CapabilityState` (operations).
 2 Misconceptions: `MistakeRecord` rows (DB table) aggregated into `snapshot.misconceptions`.
 3 MistakeRecords: CREATED at route.ts:6149 (recovery), practice/assessment submit paths.
   **NEVER updated, NEVER deleted** — `grep mistakeRecord.(delete|update)` = 0 hits.
 4 Remediation cause: `decide()` `decideMode` -> 'remediate' when the concept is weak; AND the
   live signal `remediationTier = conversationState.remediationCount` (`explain_differently`).
   NOTE: `decide()`'s prompt block is SUPPRESSED under the Brain runtime
   (`legacyDecisionBlocksSuppressed()` = `isBrainRuntimeEnabled()`, ACTIVE in production), so the
   LIVE remediation signal is `remediationCount`, not `decide()`'s mode.
 5 Remediation exit: **none** (§D).
 6 Can a learner name a missing prerequisite? Yes, and they do — the runtime discards it (§A).
 7 Where resolved? `resolveRequestedConceptId` (concept/requestedConcept.ts:346) — works on gap
   statements today (§B).
 8 KG prerequisites: `KGNode.prerequisites: string[]` — MEASURED: `chem.found.pure-substances` ->
   `["chem.found.matter"]`.
 9 Can teaching suspend the lesson? YES — the excursion (§C).
10 Return: `returnToConceptId`, restored by `decideExcursion` on satisfaction/turn limit.
11 Unresolvable name: today, nothing. Post-Phase-3 the excursion supports an UNRESOLVED target
   (`targetTopicTitle`), but only from a request frame, which a gap statement is not.
12 Wrong answer without a prerequisite need: `signalCorrect === false` -> `consecutiveFailures++`,
   phase holds/steps down. Untouched by this phase.
13/14/15/16 "I don't know" / "I don't understand" / "…how to do this" / "…what X means":
   MEASURED — all four collapse to `dont_know`/`dont_understand`, all four route to RECOVERY, all
   four spend affect budget. Only (16) can carry a resolvable concept, and only when the learner
   uses the KG's own title.
17 "I need to learn X first": MEASURED `failureState = null`, `CUE = NEUTRAL` — falls through
   ENTIRELY. An explicit prerequisite request is currently invisible to every stage.
18 Difference from distress: `DONT_KNOW_SIGNAL_KEYS = {dont_know, dont_understand, confused}`
   ALREADY partitions explain-me signals from affective ones (give_up/stupid/scared/too_hard/
   cant/frustrated). The partition exists and is a documented single owner; it simply has no
   consequence for the affect budget.
19 "Got it" during remediation: MEASURED — advances the phase, banks nothing, clears nothing.
20/21/22 Safe evidence: acknowledgement is NOT evidence (masteryGate already refuses it);
   resuming needs a graded correct answer; mastery needs `masteryVerifiedStrict`. Untouched.
23 Can remediation raise mastery? No — `remediationCount` never touches `correctAt*`.
24 Can a detour complete the parent? No — `turnCountsForLesson` (excursion.ts:430) already
   forbids it, including on the return turn.
25 Survives stop/close? Yes — `conversationState` persists unconditionally; and it never resets,
   which is the defect.
26 Phase-3 interaction: **the blocking problem.** RECOVERY is the top rung and denies
   PHASE_FRAME/NEXT_MOVE/NEW_QUESTION. A resolved gap turn is a RECOVERY turn today, so the
   tutor would be forbidden from TEACHING the prerequisite it just identified.

## F. DESIGN — the smallest correct change

**PRINCIPLE: a resolved knowledge gap is not distress and is not a new machine. It is a
PREREQUISITE EXCURSION that the runtime currently fails to open, because the reading that would
justify it is thrown away one stage too early.**

F1. NEW, and the only new state: `knowledgeGap.ts`, pure.
      classifyKnowledgeGap({ failureState, message, lessonConceptId, subject })
        -> { reportedText, resolvedConceptId, relationship } | null
    Fires ONLY when `isDontKnowSignal(failureState)` (existing partition, existing owner) AND the
    EXISTING resolver returns a concept id !== the lesson concept. **No regex in this module.**
    Not in `readTurnIntent`: that function is documented PURE and state-free, and its own header
    records `resolveRequestedConceptId` as one of the two readers that could NOT move there
    because they are state-dependent. Honour that boundary.

F2. `relationship`: read `KGNode.prerequisites` — 'prerequisite' if the gap concept is a direct
    prerequisite of the lesson concept, else 'related'. Deterministic, from KG data, one hop, no
    graph walk, no invention.

F3. DETOUR: pass the resolved id to `decideExcursion` as `requestedConceptId` — the existing
    documented input. **Zero change to excursion.ts.** Return, turn limit and the mastery
    boundary all come for free.

F4. AFFECT BUDGET: skip the synthetic failure ONLY when a gap RESOLVED and a detour opened.
    Narrow and symmetric with the carve-out already shipped one line above it
    (`!excursionActiveHoisted`, whose comment argues exactly this case for side-questions).
    A bare "I don't know" still spends budget, exactly as today — the protection is not removed.

F5. MISTAKE RECORD: on a resolved gap, do not write `recovery_signal` against the LESSON concept.
    The learner reported an absent foundation; they did not err on the lesson. Writing it against
    the gap concept instead would fabricate an error they never made, so the correct action is to
    write nothing. This also stops corrupting remediation targeting.

F6. REMEDIATION EXIT (the "Got it" problem): "Got it" is NOT evidence and must not clear anything
    — masteryGate already refuses it and that stays. The real fix is that `remediationCount` has
    no reset: clear it on the SAME evidence that already clears `consecutiveFailures`, a graded
    CORRECT answer. One line, in the existing success branch. Nothing is fabricated: the learner
    demonstrably answered correctly.

F7. PHASE-3 INTEGRATION — one new rung, argued, not assumed:

        KNOWLEDGE_GAP > RECOVERY > LEARNER_REQUEST > CLOSE > COMPLETE > TEACH

    WHY ABOVE RECOVERY, from the repository: recovery's justification is foundations/04 P5, "no
    content into a flooded mind". A learner naming a missing prerequisite is not flooded — the
    affect band is calm, and `DONT_KNOW_SIGNAL_KEYS` already says these signals are a different
    family from give_up/stupid/scared. This is NOT "gap outranks distress"; it is that the turn
    was never distress. Ranking it below RECOVERY would leave the tutor forbidden from teaching
    the prerequisite it just correctly identified (§E q26).
    KNOWLEDGE_GAP denies: SESSION_CLOSE, AUTHORED_PROBE, FILLER_REPAIR.
    It ALLOWS PHASE_FRAME / NEXT_MOVE / NEW_QUESTION — teaching the prerequisite IS the turn.
    The RECOVERY block becomes a consumer of the verdict, like every other block (Phase 3's own
    pattern), instead of being injected unconditionally on `recoveryKeyHoisted`.

    NOT CHANGED: the relative order of RECOVERY / LEARNER_REQUEST / CLOSE / COMPLETE / TEACH, the
    capability model, or any Phase-3 invariant. One rung is inserted at the top; nothing is
    reordered.

## G. WHAT THIS PHASE WILL NOT DO
No new detector and no regex widening (§B proves none is needed for the resolved path).
No second precedence system. No new state machine. No KG/curriculum/Brain/blueprint/schema change.
No mastery-authority change. The UNRESOLVED gap stays exactly as it is today — a recovery turn
that spends budget — because guessing a concept is worse than the current behaviour.


---

## H. WHAT SHIPPED, AND THE TWO PLACES THE DESIGN CHANGED ON CONTACT

1. **The affect-budget carve-out needed NO new code.** §F4 proposed a new exemption. Tracing the
   order of operations showed `excursionActiveHoisted` is set at route.ts ~2177 and the synthetic
   failure is guarded at ~6118 by `!excursionActiveHoisted` — so OPENING the detour already spares
   the budget, via a carve-out whose own comment argues this exact case for side-questions. The
   smallest correct change was therefore to open the detour, not to add an exemption.

2. **The detour gate was one line, not a new machine.** `decideExcursion` opened only on
   `requestedConceptId && (isExplicitTopicRequest || isExplicitCorrection)`. A gap is a third
   qualifying reason for the SAME branch, supplied by the caller under the same documented
   contract `requestedTopicTitle` already uses. It can never redirect the detour, because the
   module requires `knowledgeGapConceptId === requestedConceptId`.

**Adversarial results (measured, §7 of the test suite):** a second gap mid-detour SWITCHES and
keeps the lesson anchor (never nests); a diagram request does not hijack it; satisfaction closes
and returns without completing the lesson; the 40-turn valve still converges.

**One finding recorded rather than fixed:** an explicit stop mid-detour leaves the excursion active,
so the closing SCRIPT is deferred. Pre-existing (Series A Phase 4, live-verified) for every
"explain X" excursion; Phase 4 did not create it but makes it reachable by a second route. Fixing
it means deciding that a session stop closes an excursion outright — an excursion-lifecycle change,
out of scope here.
