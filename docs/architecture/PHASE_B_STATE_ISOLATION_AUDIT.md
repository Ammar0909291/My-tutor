# Phase B — Lesson-State Isolation: the audit

Read this before touching any per-turn store in `contextSnapshot`.

Committed for the reason Phase 3's audit was: when a session's evidence is not
in the repository, the next session re-derives it, badly. Every row below was
read from source at `c6bf801` (the Phase A grader commit) and, where it says
so, measured against production.

---

## 1. The four boundaries

These are not interchangeable, and clearing at the wrong one destroys real
progress. Every fix in Phase B names exactly one.

| Boundary | Trigger | Who enforces it | Clears |
|---|---|---|---|
| **RESUME SAME ATTEMPT** | a refresh, a reconnect, the next turn | nobody — by design | nothing |
| **CONCEPT SWITCH** | the turn's concept ≠ the stored concept | the readers themselves (`readConversationState`, `readTeachingHistory`, `readObjectiveState`, `readNarrativeState`) | that store, on read |
| **LESSON SWITCH** | a different lesson key / lesson concept | identity checks: `readPendingQuestion`'s lesson key, `decideExcursion`'s `closed-lesson-changed` | nothing is deleted; stale state is simply not readable |
| **NEW ATTEMPT** | lesson-init opened an attempt AND the mode is not `resume` | `attemptIsolation.clearTransientStateForNewAttempt()` | 6 keys, listed below |

A **lesson switch does not always open an attempt.** `mode: 'next'` onto a
lesson that already has an `IN_PROGRESS` row opens nothing, so the reset does
not fire. This is why identity, not clearing, is the primary defence for the
pending question — and it is the case the live verification was built around.

---

## 2. State inventory

Every value that survives between turns. `OWNER` is the module that defines the
shape; `KEY` is what makes it belong to something.

| State | Snapshot key | Owner | Key | Reset on new lesson | Reset on restart | Reset on concept switch | Risk if stale |
|---|---|---|---|---|---|---|---|
| Pending MCQ / probe answer key | `pendingMcq` | `pendingQuestion.ts` *(new)* | lesson key *(new)* | not readable (identity) | yes (attempt) | n/a — lesson-keyed | **P0.** grades a foreign message, writes permanent evidence |
| Concept ladder | `conversationState` | `conversationState.ts` | `conceptId` | yes (read) | yes (attempt, 7L) | yes | mastery/phase carried across lessons |
| Teaching ledger (strategies, probes asked, explanations served, visuals shown) | `teachingHistory` | `teachingHistory.ts` | `conceptId` | yes (read) | yes (attempt) *(new)* | yes | fresh attempt starts with everything spent; old lesson's probes marked used |
| Excursion | `excursion` | `excursion.ts` | `returnToConceptId` vs lesson | yes (`closed-lesson-changed`) | yes (attempt) *(new)* | yes | attempt opens mid-detour on a side topic |
| Objective | `objectiveState` | `objectiveModel.ts` | `objectiveId` | yes (read) | yes (attempt) *(new)* | yes | `completedAt` locks a fresh attempt from assessment (LOG-only today) |
| Narrative arc | `narrativeState` | `narrativeTracker.ts` | `conceptId` *(new)* | yes (read) *(new)* | yes (attempt) *(new)* | yes *(new)* | new lesson's arc reported complete before it began |
| Session episode | `sessionEpisode` | `sessionLifecycle.ts` | — | yes (lesson open, 7K) | yes | no | a CLOSING phase inherited into a new lesson |
| Session failure count | `sessionFailureCount` | `sessionLifecycle.ts` | — | yes (lesson open, 7K) | yes | no | affect budget already spent on arrival |
| Visual session | `visualSession` | `visual/session.ts` | `conceptId` + lesson open | yes (lesson open) | yes | yes | "look at the figure on your screen" when there is none |
| Lesson stage progress | `lessonStageProgress` | route (ADR 09) | `conceptId` + `planSignature` | yes (both must match) | no | yes | none reachable — flag-gated (`ENABLE_LESSON_STAGE_CONTINUITY`) and double-keyed |
| Question ledger | `questionLedger` | `repetitionGuard.ts` | — (session-wide, **deliberate**) | no | no | no | intentionally persistent — see §4 |
| Placement verification | `placementVerification` | `placementVerification.ts` | — (outlives a lesson) | no | no | no | intentionally persistent |
| Pending placement probe | `pendingPlacementProbe` | route + placement machine | own ask/answer turn machine | no | no | no | intentionally persistent |
| Learner memory | `memoryContext` | cross-session memory | — | no | no | no | intentionally persistent |
| Turn history / metrics / RRM | `turnHistory`, `verifierMetrics`, `kernelParity`, `enginePolicyParity`, `progressionMetrics`, `renderedRealityLog` | various | — | no | no | no | telemetry; no teaching decision reads them as truth |
| Concept pointer | `currentConceptNodeId` | route | — | written at turn END | no | n/a | **a turn behind** — see §3.2 |

*(new)* = introduced or changed by Phase B.

---

## 3. The defects, and why each happened

### 3.1 `pendingMcq` had no identity and no reset owner — P0

Root cause: **missing identity**, compounded by **a reset boundary nobody
owned**. Every sibling store was either keyed or explicitly retired at lesson
open. This one was neither, and it is the only store whose staleness writes
permanent evidence.

Production exposure, measured before the fix: **102** sessions carried a live
`pendingMcq`, **0** of them any lesson identity, and **38** of those sessions
had messages under more than one lesson key — the population in which the leak
is structurally reachable.

Fixed on both axes: a lesson key on the stored value (`pendingQuestion.ts`),
plus membership in the new-attempt reset.

### 3.2 The teaching ledger was read under a stale concept id

Root cause: **wrong key precedence**, found by the live run rather than by
reading. `currentConceptNodeId` is written at the END of a turn, so on turn one
of a switched-to lesson it still names the previous one. Verbatim from
production:

```
[ladder-reset] snapshotCurrentConceptId: 'phys.em.ac-basics'        <- lesson A
               libraryConceptNodeId:     'phys.mech.kinematics-1d'  <- lesson B
```

`memConceptId` read the snapshot value first, so `readTeachingHistory` matched
lesson A's ledger and lesson A's used strategies, shown visuals and asked MCQs
went into lesson B's prompt. This one site was the outlier: the route already
uses `libraryConceptNodeIdHoisted ?? snapshotCurrentConceptId ?? resolvedConceptId`
at `currentConceptForMastery` and `activeConceptIdForDecide`, and the *other*
reader of this same store in the same turn uses `convConceptId`, which is that
expression. Two readers of one owner disagreeing about the key is how it drifted.

### 3.3 `narrativeState` had no key at all

Root cause: **wrong keying**. The module's own first line calls what it tracks
"the LESSON's teaching arc" and its milestones "monotonic — once reached, never
reverted". Both are true of a lesson and were being applied to a session.

### 3.4 Four stores survived a restart

Root cause: **the concept-change reset cannot see a restart** — same concept,
same lesson key. Phase 7L identified this for the ladder; `teachingHistory`,
`excursion`, `objectiveState` and `narrativeState` have the identical lifecycle
and were missed.

### 3.5 `resume` could clear a mid-lesson ladder

Root cause: **the reset was gated on the wrong fact.** `openedNewAttempt` and
"the learner started again" come apart for `mode: 'resume'` on a lesson with no
attempt row (sessions predating attempt-at-lesson-start, 2026-08-16). Opening
the row is right; clearing is not. Now gated on `attemptIsFreshStart`.

---

## 4. What deliberately survives, and why

Clearing these would be a regression, not a fix.

- **`questionLedger`** — anti-repetition across the SESSION. Clearing it lets
  the tutor re-ask a question the learner answered minutes ago in the same
  sitting.
- **`memoryContext`** — cross-session learner memory. Not per-attempt in any
  sense.
- **`placementVerification` / `pendingPlacementProbe`** — a placement decision
  outlives any one lesson, and the probe has its own ask-turn/answer-turn
  machine.
- **`sessionEpisode` / `sessionFailureCount` / `visualSession`** — cleared at
  the WIDER "lesson opened" boundary, which a resume also crosses. Moving them
  behind the attempt gate would reintroduce the "look at the figure on your
  screen" defect on every refresh.
- **Everything on a RESUME.** The learner reads an MCQ, refreshes, and answers
  it — the widget re-renders from `pendingMcq`. Verified live: after a
  `mode: 'resume'` lesson-init, the answer still graded and the phase advanced
  GUIDE → CHECK.

---

## 5. Live evidence

One session, one pending question, two lessons. The proof is the presence and
absence of the same log line.

```
RESUME of lesson A   [mcq-grade] correct: true
                     [ladder] GUIDE -> CHECK
                     [topic-progress-evidence] phys.meas.units

SWITCH to lesson B   (no [mcq-grade] line at all)
                     [ladder] correctness: null, OBSERVE -> OBSERVE, check 0, practice 0
                     (no [topic-progress-evidence] line)
                     [turn-decision] probeId: null
                     [excursion] active: false, transition: 'none'
                     [visual-v2] continuity: 'no-active-session'
                     [ladder-reset] reason: 'concept-changed'
```

The lesson B turn's message was, verbatim, the correct answer to lesson A's
question, typed as the learner's first message in lesson B.

---

## 6. Open, reported not fixed

**The conversation transcript is not lesson-scoped.** On the lesson B turn
above the model's prose still said *"Correct! 230 volts is the RMS value for a
325-volt peak sine wave"* — because lesson A's question is in the shared message
history the prompt carries, and the learner can scroll up and see it too. No
evidence was written, no counter moved, no probe was consumed: this is not
transient-state contamination, it is history scoping, and closing it means
deciding what a lesson switch should do to the visible transcript. That is a
product decision, not a state-isolation defect, and it is the natural Phase C.

**`objectiveState`'s consequence is LOG-only today.** The S2 verifier rules it
feeds are additive and do not gate. It is cleared because the value is
demonstrably false about the attempt it describes, and because those rules exist
to be promoted — not because a behaviour defect was measured.
