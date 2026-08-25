# Phase C — Lesson-Scoped Conversation History: the investigation

**Status: INVESTIGATION ONLY. Nothing here is implemented.** No product code was
written for this document. It exists so that the decision Phase C needs is made
against measurement rather than intuition, and so the next session does not
re-derive what this one already read.

Prerequisite: Phase B is closed (see `PHASE_B_STATE_ISOLATION_AUDIT.md`). Phase B
isolated per-attempt STATE. This is about the TRANSCRIPT, which is a different
owner and a different fix.

---

## 1. The finding, and a correction to Phase B's own report

Phase B's closure report listed this as an open item and described it as *"the
learner can scroll up and see it too"*. **That was wrong, and the correction
makes the defect worse rather than milder.**

The product has TWO readers of the same message history, and they already
disagree:

| Reader | Serves | Lesson-scoped? |
|---|---|---|
| `GET /api/sessions/history` | the learner's SCREEN | **YES** — filters `where.lessonKey`, resolved server-side from `StudentProgress.activeLessonSlug ?? currentLesson` via the shared `lessonKeyFor()` |
| `POST /api/learn/chat` | the MODEL's prompt | **NO** — `messages: { orderBy: { createdAt: 'desc' }, take: 30 }`, then `.map()` keeps only `role` and `content`; `lessonKey` is read from the row and discarded |

The restore route's own closing comment names the split explicitly:

> *"AI context is built independently in /api/learn/chat (capped at 30) — this
> limit only [applies to display]"*

So the model reacts to turns **the learner cannot see**. That is not a
transcript the two parties share; it is a private one the model alone holds.

This is the same shape Phase B fixed twice — *two readers of one owner
disagreeing about the key* — at a third site. The scoping decision has already
been made and implemented once; the prompt path simply does not honour it.

## 2. Measured live

Reproduced on the deployed app (`5689658`), real learner account, a real lesson
switch, with Phase B's state isolation fully in force:

```
lesson A leaves an MCQ:  "What is the RMS voltage of a sinusoidal waveform
                          whose peak voltage is 325 volts?"   (correct: 230 V)
learner opens lesson B   (Kinematics in One Dimension)
learner's first message  "230 V"

runtime:  NO [mcq-grade] line          <- Phase B holds; nothing graded
          [ladder] OBSERVE -> OBSERVE, check 0, practice 0
tutor:    "Correct! 230 volts is the RMS value for a 325-volt peak sine wave."
```

No evidence was written, no counter moved, no probe consumed. The **state** was
isolated exactly as Phase B intends. The **prose** was not, because lesson A's
question was in the prompt's 30-message window.

## 3. Exposure, measured against production

Windowed at the chat route's own `HISTORY_LIMIT = 30`, non-SYSTEM messages,
newest first, per session:

| | |
|---|---|
| sessions sampled | 597 |
| **sessions whose prompt window spans MORE THAN ONE lesson** | **89 (14.9%)** |
| messages in those windows | 8,566 |
| messages carrying no `lessonKey` at all | 2,961 (34.6%) |

That last row is the load-bearing constraint on any fix: **a third of the
history has no lesson identity**, because `Message.lessonKey` post-dates it.
A naive `where: { lessonKey }` on the prompt path would silently delete a third
of the context for those learners — turning a coherence bug into an amnesia bug.
The restore route already handles this by omitting the clause entirely
(`...(lessonKey ? { lessonKey } : {})`) rather than matching `null`, which is a
precedent worth reading before designing anything.

## 4. What already exists and must NOT be rebuilt

- `Message.lessonKey` — on the schema, indexed (`@@index([lessonKey])`), and
  written by BOTH routes (`/api/learn/chat` at the assistant write,
  `/api/learn/lesson-init` at the opening write). The data is there and unused
  by the prompt path.
- `lessonKeyFor()` — the single lesson-identity function, already shared by
  `LessonAttempt`, the restore route, and (as of Phase B) the pending question.
  Phase C must not introduce a second scheme.
- The restore route's resolution order (`activeLessonSlug` ahead of
  `currentLesson`) and its documented reasoning about REVIEW of an earlier
  lesson. Any prompt-side scoping should reuse that answer, not re-derive it.

## 5. The questions Phase C has to answer

These are genuinely open and at least two are product decisions, not
engineering ones. They are stated rather than pre-answered.

1. **Hard cut, or carry a bridge?** Does lesson B's prompt see zero turns from
   lesson A, or a short summary of where the learner left off? A hard cut is
   simpler and matches the screen; a bridge is what a human tutor does
   ("last time we did units — today, motion"). The lesson-init opening prompt
   already tries to do this job from `lessonCtx`, so a bridge may be redundant.
2. **What happens to the 34.6% with no `lessonKey`?** Options: leave them
   unscoped (restore-route precedent, keeps context, keeps the bug for them);
   backfill from `Message.createdAt` against `LessonAttempt` windows (a
   migration, and attempts only cover lessons opened since 2026-08-16); or
   treat "no key" as belonging to the current lesson (wrong, but bounded).
3. **Does the excursion need an exception?** An open excursion deliberately
   teaches an off-lesson topic. Its turns are written under the LESSON's key
   (the excursion never moves `activeLessonSlug` — by design, see
   `excursion.ts`), so scoping by lesson key keeps them. Probably a non-issue,
   but it must be checked rather than assumed.
4. **Does a RESTART want its own history?** Phase B decided a restart is a
   fresh ATTEMPT for state. Should it also be a fresh transcript for the
   prompt, or should the model remember the attempt the learner just abandoned?
   Note the learner's screen currently keeps it (the restore route scopes by
   lesson, not by attempt), so making the prompt attempt-scoped would open a NEW
   asymmetry in the opposite direction.
5. **Is 30 still the right window** once it is lesson-scoped? A 30-message
   window that is now guaranteed on-topic carries strictly more useful context
   than one that is not; that may argue for leaving it, or for lowering it.

## 6. What this is NOT

- Not a state-isolation defect. Phase B's acceptance criterion is met: no
  learner action in lesson B is *interpreted using transient state* from lesson
  A. This is what the model can *read*, which is a different channel.
- Not a correctness or evidence defect. Measured: no grade, no counter, no
  probe, no `topic-progress-evidence` row from the foreign question. It is a
  teaching-quality and coherence problem.
- Not urgent in the way the Phase B P0 was. Nothing false is written to a
  learner's permanent record by it.

## 7. Suggested first step, when Phase C is authorised

Read `/api/sessions/history`'s resolution block and `/api/learn/chat`'s
`historyMessages` assembly side by side, decide Q1 and Q2 above (they are the
only two that gate any code), and treat the fix as *making the prompt reader
honour a scoping the product already implements* — not as new architecture.
