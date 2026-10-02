# Fixing the tutor turn — the whole approach

**Status:** PROPOSAL ONLY. Nothing here is built or approved.
- Phase 1 changes how a teaching turn is produced. It needs the owner's explicit G2 approval
  before any code is written.
- `TUTOR_REMEDIATION_PLAN.md` §11.10 says to stop and let the owner decide what comes next. This
  document is that decision, put to the owner. It is not a queued work item.

**Date:** 2026-10-02. **Measured against:** `da281f59` (`main`).

---

## 1. Measured facts (re-run the commands before trusting them)

```
wc -l src/app/api/learn/chat/route.ts                    → 13267   (11199 on 2026-09-14)
grep -c "cleanText = " src/app/api/learn/chat/route.ts   → 62      (42 on 2026-09-14)
grep -c "await routeAI(" src/app/api/learn/chat/route.ts → 6       model call sites in one turn
ls src/tests/*.test.ts | wc -l                           → 832
```

The 2026-09-14 numbers come from `TYPED_TURN_CONTRACT_DESIGN.md` §1. They were counted with a
slightly different pattern (`^\s+cleanText = `), so compare the direction, not the exact
difference.

`cleanText` is the reply text. Each `cleanText = …` is a place where the server rewrites what the
model wrote. That count rose from 42 to 62 in 18 days, and the file grew by about 2,000 lines.
Most of that growth is repair code added after live defects were found.

---

## 2. Diagnosis: one architectural defect, many symptoms

**The model writes the whole reply, but the server owns the facts.** The facts are:
- the grade;
- which question card is attached;
- whether the lesson is finished;
- which question is pending.

The two are reconciled after the model has written, by cutting, replacing or regenerating
sentences. Every patch matches one wording. The model produces new wordings, so the patches never
converge.

Evidence from the 2026-10-02 real-account sessions (4 chemistry lessons). Each row is one
symptom of that single defect:

| Symptom seen live | Why the architecture causes it | Patch shipped |
| --- | --- | --- |
| Feedback about the previous question ("How did you arrive at 2.50 dm³?") | The model is told the grade but may ignore it | 5ba7e62a, prompt only |
| A lead-in that names the wrong topic, 4 times in 2 lessons | By owner decision the model cannot see the card it introduces | CL-31, not committed |
| A bare "That's right." / "Let me check your thinking with this." | A cut removes the model's only sentence; the repair is another model call | CL-1, 1b, 28, 30 |
| The saved message differs from what was shown | "Lesson finished" is decided after the message is saved | CL-29 |

`docs/history/` has more examples of the same pattern from earlier dates.

**Not explained by this defect:** factual errors inside teaching prose. One live example: "2.1
has a zero only between non-zero digits". A structural change does not fix this; §4 Phase 5
covers it separately.

---

## 3. What will not fix it

- More concept-by-concept QA. It finds symptoms one session at a time. This is the third pass,
  and it has not converged.
- More text patches in `route.ts`. Each one interacts with the others. CL-1 → CL-1b → CL-28 →
  CL-30 is one chain from this week, each fix exposing the next case.

---

## 4. The approach

### Phase 0 — Baseline, read-only (no approval needed; no production writes)

- Write automatic checks for each defect class and run them over the turns already stored
  (`messages` table plus runtime logs). The checks:
  - a stub reply (under 12 words);
  - a lead-in that doesn't match its card;
  - a reply that names the previous question's answer;
  - a question beside a quiz card;
  - a saved message that differs from what was delivered;
  - a verdict in the prose that contradicts the server grade;
  - a reply that repeats an earlier one.
- **Deliverable:** a per-class rate, the query that produced it, and the number of turns
  examined.
- **Honest limit:** some checks are heuristics. Each one's false-positive rate is estimated by
  hand-reading a sample, and that estimate is reported alongside the rate.

### Phase 1 — Design sign-off (owner G2)

The turn is decided first, then assembled by the server:

1. **Decide** (server, before any model call): the grade, the next step, which card attaches,
   and whether the lesson closes.
2. **Fill slots** (model): it returns structured fields only.
   - `feedback`: why this answer is right or wrong. At most 3 sentences, no question.
   - `teaching`: one paragraph, no question.
   - `reply`: only when the learner asked something.
3. **Validate** (server): each slot is checked for length, question marks, option letters, and
   mention of another item's answer.
   - A failing slot gets one regeneration.
   - If it fails again, the slot is filled from an authored explanation asset, or left out.
4. **Assemble** (server):
   - the verdict line, from the grade;
   - the validated slots;
   - a lead-in written from the card the server chose, so it cannot name the wrong topic;
   - the card itself;
   - a close, on completion.
5. **Save once:** the stored message is exactly what was shown.

This extends the shipped Typed Turn Contract (`TYPED_TURN_CONTRACT_DESIGN.md`) rather than
replacing the pipeline, as `EDUCATIONAL_BRAIN_BIBLE.md` governance requires.

### Phase 2 — Shadow mode, behind a flag

- Build the assembler for **graded-answer turns only**, where most live defects were.
- It runs beside the current path and logs what it would have sent. Learners still get the
  current reply.
- **Exit criterion:** the Phase-0 checks score the shadow output better than the live output on
  the same turns. Slot-validation failure and fallback rates are reported.
- **Unknown until measured:** how reliably each provider returns valid structured output (Groq,
  Gemini, OpenRouter, YandexGPT). If it is not reliable enough, the design changes before
  Phase 3.

### Phase 3 — Serve, one turn type at a time

- Enable for graded-answer turns. Re-run the Phase-0 checks on new production traffic and report
  the before and after rate per class.
- Then extend, in this order, each with the same measure-then-extend gate:
  1. quiz-attach turns;
  2. lesson open;
  3. completion;
  4. learner questions.
- Learner questions stay mostly model-written. They are the least structurable turn type.

### Phase 4 — Remove patches that no longer fire

- A repair stage is deleted only when logs show it has stopped firing on the new path, over a
  stated number of turns.
- Its regression test is kept or rewritten against the assembler.

### Phase 5 — Content correctness (separate track)

- Factual errors in teaching prose need their own check, for example verifying stated facts
  against the concept's authored content.
- That is a separate proposal. This plan does not claim to solve it.

---

## 5. Rules against false claims (binding on whoever executes this)

- Never say "fixed". Report "class X: A% → B% on N production turns", with the query, the commit
  and the test.
- Anything not measured in production is reported as **unverified**, with the reason.
- Failing tests and failing checks are reported with their output, never summarised away.
- No number in this file is trusted later without re-running its command.
- Real-account safety rules in `CLAUDE.md` apply throughout. In particular, no production write
  is ever used to make a metric look better.

---

## 6. What this does NOT promise

- **Zero defects.** The model is not deterministic, so rates go down but do not reach zero.
- **A schedule.** Each phase gate needs real traffic. That is days per gate, not hours.
- **Better tone.** Assembled turns may read more templated. The Phase-2 shadow comparison should
  include a human read of a sample.
- **Content errors.** See Phase 5.
- **Owner-blocked items.** Corrections to production content rows, and the RC-E decision on
  credit for re-asked items, stay with the owner.

---

## 7. Decisions needed from the owner

1. Approve Phase 0 (read-only). No G2 needed, but it is new work under §11.10's stop condition.
2. G2 for Phase 1: the server-assembled turn and the slot schema.
3. CL-31 (blind lead-in neutralisation) is uncommitted on `main`. Push it as an interim fix, or
   drop it in favour of Phase 1, which makes it unnecessary.
