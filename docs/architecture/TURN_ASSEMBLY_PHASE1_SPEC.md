# Turn assembly — Phase 1 design spec (graded-answer turns)

**Status: DESIGN ONLY. Awaiting owner G2.** No runtime code may be written from this document
until the owner approves it explicitly. Parent: `TURN_ASSEMBLY_PROPOSAL.md`. Evidence:
`docs/history/turn-quality-baseline-2026-10-02.md`.

**Date:** 2026-10-02. **Measured against:** `main` after `3860bc1c`.

---

## 1. Scope

Phase 1 covers **graded-answer turns only**: the learner's message is an answer to the pending
card, and the server has graded it against an authored key. In the shipped Typed Turn Contract
that is `contract.inbound.grade !== null` and `mayStateVerdict` true (`gradeForVerdict` in
`route.ts`).

Why start here:
- These turns carry the two largest high-precision defect classes in the baseline:
  - **K1:** a reply to an answer with no reason, 15–27% by subject over 14 days;
  - **K2:** a question in the prose beside a card, 7–11%.
- Every fact the turn needs is already decided before the model call.

Out of scope, and unchanged:
- grading (GB+);
- the mastery ladder and evidence writes;
- probe selection;
- figures;
- the KG and Educational Brain content;
- every other turn type.

---

## 2. What is decided before any text is written

Every input below already exists on `TurnContract` (`src/lib/teaching/turnContract.ts`), except
the last.

| Fact | Source today |
| --- | --- |
| The graded question, the learner's option, correct or not | `contract.inbound.pendingProbe`, `contract.inbound.grade` |
| The correct option text | the pending MCQ's `correctIndex` |
| The authored rationale or misconception for the chosen option | the probe's `choices[].misconceptionId`, explanation assets |
| The next card, if any | `contract.assessment.gateProbe` |
| A deterministic lead-in for that card | `renderGateLeadIn` (`gateAssessmentRenderer.ts`) |
| **Whether this answer completes the lesson** | **Decided at turn end today** (`shouldFinalizeLesson` after the fold, `route.ts` ~11 800) |

**The one structural change.** Completion must be known before assembly. The fold that decides
it appears to depend only on the stored state plus this turn's grade, and the grade is known
before generation. If so, the fold can run before generation, with its result kept for the
existing end-of-turn write.

**Not verified.** No one has yet read the fold for hidden inputs from later in the turn. Until
the early fold is shown to give the same answer as the end-of-turn fold on the same turns, it is
a **shadow-only assumption**. Phase 2 logs both and counts disagreements.

---

## 3. The model's job: two slots, nothing else

One model call, the same `routeAI` chain and the same provider order. The prompt carries:
- the graded question;
- the learner's option;
- the server's verdict;
- the correct option;
- the authored rationale, if one exists;
- the lesson's recent teaching (scoped history, as today).

It does **not** carry the next card. The owner's G2 decision of 2026-09-24 keeps the selected
question hidden from the model, and this spec keeps that.

The model returns JSON:

```json
{ "feedback": "…", "teaching": "…" }
```

| Slot | Rule |
| --- | --- |
| `feedback` | Required. 1–3 sentences: why the learner's option is right or wrong, naming the idea. No question. Must not restate the verdict word; the server writes that. |
| `teaching` | Optional, null allowed. At most one short paragraph that moves the lesson on. No question. Must not work the next card's problem; the model cannot see it. |

---

## 4. Validation (server, deterministic)

Each slot is checked:

| Code | Rejects |
| --- | --- |
| V1 | Not JSON, or a missing or misnamed key |
| V2 | A `?` anywhere |
| V3 | Option-list lines (`A) …`) or an inline option run |
| V4 | `feedback` under 8 words or over 80; `teaching` over 120 words |
| V5 | The text of an option from an earlier card that is not in this card (the R2 signature) |
| V6 | A verdict word that contradicts the grade (for example "correct" when the grade is wrong) |

On a failure:
1. One regeneration, naming the failed code.
2. If it fails again, use a fallback. `feedback` comes from the authored rationale for the chosen
   option. Without one, it is the deterministic line "The answer is <correct option>." with no
   invented reason. `teaching` is dropped.

Every failure and fallback is logged with its code, so the rates are measurable.

---

## 5. Assembly (server)

```
<verdict line>          from the grade: "Correct." / "Not quite — the answer is: <correct option>"
<feedback slot>
<teaching slot>         if present and valid
<lead-in>               renderGateLeadIn(next card)  — only when a card follows
<card>                  the gate-selected card, unchanged
— or, when this answer completes the lesson —
<close>                 buildLessonCloseText(...)    — no teaching slot, no card
```

The verdict line and the close come from code that is already shipped. The lead-in comes from
the deterministic renderer, which knows the card, so it cannot name the wrong topic.

---

## 6. One write

The assembled text is the delivered text. The assistant row is written once, after assembly,
with `appendMcqToHistoryText` as today. No later stage may change `cleanText` on an assembled
turn.

This retires, for this turn type only, the class that CL-29 fixed by a second write.

---

## 7. Rollout

| Mode | Flag `TURN_ASSEMBLY_MODE` | What learners get | What is logged |
| --- | --- | --- | --- |
| off (default) | unset | today's reply | nothing new |
| shadow | `shadow` | today's reply | `[assembled-turn]`: the assembled text, validation codes, fallback used, completion agreement (§2), K1/K2 checks on both texts |
| serve | `serve` | the assembled text | the same log line |

- **Cost of shadow:** one extra model call per graded turn, a 7th `routeAI` call site. Latency
  for the learner is unchanged if the call runs after the response is sent; whether the runtime
  allows that has to be checked.

**Exit gates.** Each one is measured with the Phase-0 SQL plus the new log line, and reported as
numbers.

- **shadow → serve:**
  - on at least 300 shadowed graded turns, the assembled text has K1 and K2 at 0 by construction
    (anything else is a bug in the assembler);
  - the fallback rate is under 10%;
  - completion agreement is 100%;
  - a hand-read of 30 pairs finds the assembled turn no worse in a majority. The owner reads
    them.
- **After serve:**
  - K1 and K2 on graded turns in production fall to below 1%;
  - Z1 and Z2 stay at 0;
  - otherwise, return to off.

---

## 8. Tests (before any code is merged)

- Unit: the validator, one test per code V1–V6 with a real failing text from production
  (anonymised).
- Unit: the assembler for correct with a card, wrong with a card, completion, and the fallback
  path.
- Harness (`turnHarness.ts`): a graded turn in shadow mode leaves the served reply byte-identical
  to mode off.
- Harness: in serve mode the stored row equals the delivered text.

---

## 9. Unknowns (stated, not assumed)

1. **How often each provider returns valid JSON for this prompt** (Groq gpt-oss-120b, Gemini,
   OpenRouter, YandexGPT). The only evidence is that figure generation already parses model JSON
   in production. Shadow mode measures it.
2. **Whether the early fold always agrees with the end-of-turn fold.** Shadow mode measures it.
3. **Whether assembled turns read as stiff.** This needs the owner's hand-read; no automatic check
   exists.
4. **Whether the shadow call can run after the response is sent** on this Vercel runtime.

---

## 10. What the owner is asked to approve (G2)

1. Building §2–§8 behind `TURN_ASSEMBLY_MODE` (default off) for graded-answer turns only.
2. Running it in **shadow** in production.
   - Cost: one extra model call per graded turn.
   - Nothing changes for learners.
3. A separate later approval to switch to **serve**, given the §7 numbers.
