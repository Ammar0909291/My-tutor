# My Tutor — Canonical Blueprint

> **Status.** Created 2026-08-23 by the Phase 3 architecture migration. This file
> did not previously exist under this or any similar name — the Phase 3 brief
> asked for it to be read first, and its absence is recorded here rather than
> silently worked around.
>
> **Scope.** This document holds ONE thing: the runtime's **decision ownership**.
> It is not a system overview. `docs/architecture/EDUCATIONAL_BRAIN_BIBLE.md`
> remains the authoritative engine map; `docs/ARCHITECTURE_REFERENCE.md` and the
> ADR set remain authoritative for their own subjects. Nothing here supersedes
> them.

---

## 1. The architectural rule

> **An authoritative reading is CONSUMED by everything downstream of it.
> A component that consumes an authoritative reading may not re-derive it.**

Re-deriving is not merely duplicated work. Two calls to the same detector agree
on a *value* while knowing nothing of each other's *interpretation* — and
interpretation is where this runtime's decisions actually live.

## 2. Decision ownership

Ownership is **per concern**, and deliberately so. There is no single
`EducationalDecision` object, because the concerns below are genuinely
different truths — merging them would produce a god object that obscures
ownership rather than establishing it.

| Concern | Owner | Produced at | May downstream change it? |
|---|---|---|---|
| Learner intent (question / stop / request / distress / visual form / ambiguity) | `teaching/turnIntent.readTurnIntent` | top of the chat handler, unconditionally | **No.** Consumed only. |
| Teaching context (target concept or topic; excursion lifecycle) | `teaching/excursion.decideExcursion` | route.ts, excursion block | **No.** Single call, single decision. |
| Lesson attribution (does this turn's evidence belong to the lesson?) | `teaching/excursion.turnCountsForLesson` | derived from the decision above | **No.** One boolean, read everywhere. |
| Lesson completion | `teaching/masteryGate.gateLessonCompletion` | post-model | **No.** Server-side; the model's `[LESSON_COMPLETE]` tag is stripped unless server-held mastery authorises it. |
| Signal trust | `teaching/signalVerification` | post-model | Flags, never overrides. Flagged evidence cannot reach strict mastery. |
| Teaching action | `understanding/decisionEngine.decideTeaching` → `understanding/dispatcher.planDispatch` | before the model call | The legacy Teaching Engine `decide()` still RUNS, but its prompt block is suppressed by `legacyDecisionBlocksSuppressed()` so only one voice carries decision authority. |
| Teaching granularity | `teaching/teachingGranularity.decideTeachingGranularity` | route.ts | Single producer. |
| Visual selection | `teaching/visual/resolveVisual.resolveVisualForTurn` | before the model call | Selection is distinct from rendering; see §4. |

## 3. Decision lifecycle

```
learner turn
  -> readTurnIntent            ONE authoritative reading of the message
  -> decideExcursion           ONE teaching context  (HOLDs when ambiguous)
  -> granularity / visual / gate blocks   (all consume the above)
  -> understandStudentTurn -> decideTeaching -> planDispatch
  -> execution (served from state, or the model as renderer)
  -> post-model gates          (completion, signal verification, repair)
  -> evidence / persistence
```

**Invariants**

1. `readTurnIntent` is called exactly once per turn, unconditionally, before any
   educational action is selected.
2. An **ambiguous** turn holds the current teaching context: no excursion opens,
   closes or switches (Phase 2). The two structural safety valves — lesson
   changed, turn limit — deliberately outrank ambiguity.
3. Mastery attribution is derived from the context decision, never re-decided.
4. The model may not author educational state. Completion is gated server-side;
   a claimed signal is verified, and a flagged one cannot reach strict mastery.
5. A repair or fallback layer must consult the upstream decisions before
   overwriting a response (`shouldRepairFillerTurn` reads closing / recovery /
   new-intent for exactly this reason).

## 4. What must stay separate

Single ownership is the goal; one giant function is not. These pairs are
different truths and are kept apart on purpose:

- **learner evidence** ≠ **teaching intent**
- **visual selection** ≠ **visual rendering**
- **provider output** ≠ **educational state**
- **persistence** ≠ **decision-making**

## 5. Change history

- **Phase 1** — established `turnIntent` as the single reading of the learner's
  message. Behaviour-neutral hoist of five detectors.
- **Phase 2** — gave `TurnIntent.ambiguous` its first authority: an ambiguous
  turn HOLDs the teaching context, at one boundary inside `decideExcursion`.
  Narrowed `ambiguous` to genuine contradictions (stop-vs-question,
  stop-vs-request); distress alongside a request is one coherent intent, not a
  contradiction.
- **Phase 3** — audit found ownership already coherent per concern, with **one**
  live violation: the CUE's `readConversation` consumed `recoveryKey` but
  re-derived `isGenuineQuestion()` and `detectLearnerRequest()` from the raw
  message. Migrated to consume both. Behaviour-neutral (the values were already
  identical); the point is that the reading can no longer diverge in *meaning*
  now that `turnIntent` carries whole-turn properties no single detector sees.
