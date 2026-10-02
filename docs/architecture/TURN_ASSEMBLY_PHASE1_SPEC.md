# Turn assembly — Phase 1 design spec (graded-answer turns)

**Status: G2 GRANTED 2026-10-02 for §10 items 1–2** (build behind the flag, off by default; run
in shadow). The owner replied "Go" to the explicit G2 request. **Serve (§10 item 3) is NOT
approved** and needs a separate owner decision, made on the §7 numbers. Parent: `TURN_ASSEMBLY_PROPOSAL.md`. Evidence:
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

**Read, 2026-10-02 — the assumption is FALSE as stated.** The ladder fold (`advanceConversationState`
with `turnEvidenceForLadder`, `route.ts` ~9680) does take inputs from the model's own reply:
- `isPriorKnowledgeProbe(cleanText)`;
- the misconception phrase and signal confidence from the model's tag;
- the verifier status;
- filler detection and the teaching-integrity flag;
- `degradedTurn` (provider).

So completion cannot simply be computed before generation. What still needs establishing is
whether those inputs ever change closure on a graded turn. Shadow now logs
`completionAgreement`: the turn re-folded with the text-derived inputs recomputed on the
assembled text, compared with the real result. Serve stays blocked until that is measured at
100% over the §7 sample.

Historical note: the paragraph below is the original draft wording.
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

---

## 11. Shadow v1 as built (2026-10-02) — where it differs from §2–§7

- **Code:**
  - `src/lib/teaching/turnAssembly.ts` (slot prompt, parse, validation V1–V6, fallback, assembly);
  - `src/app/api/learn/chat/route.ts`: the slot call starts after grading, the result is awaited
    and logged just before the response.
- **Tests:**
  - `src/tests/turnAssembly.test.ts`: every code, using production drafts.
  - `src/tests/turnAssemblyShadowRoute.test.ts`: a graded tap in shadow mode serves byte-identical
    text to mode off, and logs `[assembled-turn]`.
- **One regeneration, as §4 specifies (added 2026-10-02, after the first shadow deploy).** A
  failed slot gets one retry naming the failed rule (`retryInstruction`), through the same call
  site.
  - `[assembled-turn]` logs `attempts` (1 or 2), so the logged fallback rate is now the rate
    serve mode would see.
  - The second attempt's `llmCallCount` increment can land after the message row is written, so
    `attempts` in the log is the authoritative count of shadow calls.
- **Completion comes from the end of the turn, not an early fold.** Shadow reads
  `lessonCompletionHoisted` after the turn has finalised. §2's early fold is **not built**, and
  its agreement is **not measured** yet. It must be built and measured before serve.
- **Placement and counting:**
  - The slot call starts just after `llmCallCount` is declared. That is after the gate has
    selected its card, so the "select before any provider call" invariant holds, and before
    every serving branch, so memory-served graded turns are shadowed too.
  - It is counted in `llmCallCount`. On a sampled graded turn the persisted count is therefore
    one higher than without shadow mode.
  - The seven tests that pin the route's provider-call count moved from 6 to 7, each citing
    this approval.
- **Latency:** the slot call starts in parallel with the main turn. The reply waits for it at
  most 1.5 s; a timeout is logged as `event: "timeout"`. Measure the added time from `ms` in the
  log against the turn's own duration.
- **Cost controls:**
  - one extra model call per sampled graded turn;
  - `TURN_ASSEMBLY_SHADOW_RATE` (0–1, default 1) samples graded turns.
- **No concept title** in the slot prompt yet; the question and options carry the topic.
- **Log line `[assembled-turn]`:**
  - `codes` and `fallback`;
  - `live` / `assembled`: K1 and K2 on each text;
  - `liveText` / `assembledText`: tutor text only, 1,200 characters each.
  This is the data for the §7 gates.

### 11.1 Production verification (2026-10-02, deploy of `3b0e18c2`, dpl_9SQSqbgw9LNxQBeHuKjzGXdcuDcm)

- **Setup:** `TURN_ASSEMBLY_MODE=shadow` set for production. `scripts/qa/spiralCloseLive.ts` was
  run on a disposable `qa-*` account (deleted afterwards). It produced 2 graded taps on
  `phys.meas.units`.
- **Both turns logged `[assembled-turn]`:**

  | Turn | Slot call | Main call (parallel) | Validation codes | Fallback |
  | --- | --- | --- | --- | --- |
  | Wrong tap (4.7 µF) | 680 ms | 1.9 s | none | no |
  | Right tap (the newton) | 546 ms | 2.5 s | none | no |

  - Each assembled text was the verdict line, the feedback, then a teaching paragraph.
  - The served replies were the normal ones.
- **Not yet shown:**
  - any rate (2 turns, against the §7 gate of 300 or more);
  - behaviour on other providers;
  - added latency at the 95th percentile.
- **Side finding:** a CL-31 gap found in the same run. "Great, let’s see how well you’ve grasped
  the seven base units" (U+2019 apostrophe) sat above a µF card and was not neutralised. Fixed
  in the next commit; the Phase-0 K4 SQL had the same blind spot and now normalises it.

### 11.2 First sample (2026-10-02 13:23, `scripts/qa/shadowSampleRun.ts`, chemistry, disposable account)

- **Volume:** 16 graded taps over 4 lessons (pure-substances, measurement, significant-figures,
  mole-concept). 16 `[assembled-turn]` lines: 15 parsed, and 1 truncated by the log viewer.
  5 lines came from a warm instance of the previous deploy, so they carry no `attempts`.
- **Of the 15 parsed:**

  | Measure | Result |
  | --- | --- |
  | `completionAgreement` | true 15/15 |
  | Assembled K1 / K2 | 0 / 0 |
  | Served K1 / K2 | 0 / 1 |
  | Validation failures | 2, both `V1-unparseable`, both fell back |
  | Regenerations | 1 attempt on 9 turns, 2 attempts on 1 |
  | Slowest shadow call | 1,573 ms (the regenerated turn) |

- **Fallback rate:** 2/15 = 13%. That is above the §7 bar of under 10%, on a tiny sample.
- **Two fixes from this sample:**
  - The cause of the parse failure is unknown, because raw text was not logged. Now:
    - `rawOnFailure` is logged;
    - the parser accepts a literal line break inside a JSON string, the most common model JSON
      slip. This is unconfirmed as the cause.
  - The fallback read as a fragment ("fixed composition, one formula"), because authored
    rationales are the text after the answer head. It is now rejoined: "Carbon dioxide (CO₂) —
    fixed composition, one formula."
