# Tutor Quality Fix Plan — 14 items

**Status: PROPOSED (2026-09-27). Not yet adopted.** `TUTOR_REMEDIATION_PLAN.md` §11.10 remains the
owner-adopted plan until the owner says otherwise. Items marked **OWNER** need an explicit owner
decision before any code is written (a G2 gate, a paused primitive, a production data write, or
spend).

## Why this plan exists

A real student's physics lesson (`Electric Charge and Conservation`, 2026-09-27) showed defects
even after the recent architecture work. Examples:

- mastery was completed partly by re-tapping an answer the tutor had just revealed;
- an authoring label leaked: "Quick check: DIAGNOSTIC (P4-a, retrieval): …";
- a wrong typed answer ("1.6 × 10⁻²²") was ignored;
- a factual slip ("+2 means two extra electrons added");
- the misconception "sparks fly near the wall" was accepted;
- confirmation glitches ("That's right. … have I got that right?", "Correct — well done. That's
  spot‑on").

**Root cause (structural, not one bug).** The model writes most learner-facing text, and it makes
some mistakes on every turn. At a 3% per-turn defect rate, a 20-turn lesson has about a 45% chance
of at least one defect; at 10% the chance is about 88%. Fixes so far have mostly been
wording-pattern patches: each catches one phrasing, and together they add conflicting layers.
Nothing checks factual truth, and typed answers are not graded.

**Goal.** Not "zero defects", which is unreachable while an LLM writes free text, but a defect
rate that is low, minor and *measured*. Target: "good enough for real students" at 8.5/10
confidence. Estimated today: 4–5/10. These are judgements until item 4 exists.

## The 14 items (in execution order)

### Tier 1 — trust breakers (small, do first)

1. **Stop fake mastery.** — **OWNER** (touches the G2-approved re-ask, `d8df9244`)
   - Conflict: `withheldContinuation` (`gateAssessment.ts`) states the answer on a miss, assuming
     the question is never re-asked. Since 2026-09-24, `allowMissedStem`
     (`teachingActionRepository.ts`) does re-ask it, so the revealed answer can be tapped for
     mastery credit.
   - Recommended fix: a re-asked question stays as practice but never counts toward CHECK or
     PRACTICE mastery.
   - Alternatives: (b) don't reveal the key on a miss; (c) drop the re-ask, which brings back the
     "one miss makes mastery unreachable" defect.
2. **Strip authoring labels on every learner-facing path.**
   - `stripAuthoringLabel` runs only in `probeToMcq`.
   - `assembleLesson` → `formatProbeAsFollowUp` (non-MCQ probes typed into prose) does not strip,
     which is where the "DIAGNOSTIC (P4-a, retrieval):" leak came from.
3. **Never ignore a wrong answer.** *(Partly done 2026-09-28: `V-AFFIRM` now also catches a
   first-person belief that matches an authored misconception and replaces "That's right" with
   the authored correction — see `docs/history/model-ab-test-groq-vs-gemini.md`, follow-up fix.
   Typed-answer grading below is still open.)*
   - Grade typed answers against the authored key (`correctValue` and the probe text) using a
     conservative matcher.
   - On a clear miss, say so plainly and give the authored correction.
   - Guard: an unusual but correct phrasing must never be marked wrong; when unsure, don't grade.

### Tier 2 — measurement and safety net

4. **Daily defect score.**
   - An automated reviewer reads real production transcripts every day and reports defects per
     100 turns, split by type (factual, ignored answer, leak, contradiction, fake mastery) and by
     severity.
   - Calibrate the reviewer against a hand-labelled sample before trusting its numbers.
5. **Pre-deploy gate.**
   - Before a change reaches `main`, simulated students (the `scripts/qa/synthetic/` harness,
     plus content-grounded pickers like `biologyAnswerPicker.ts`) run lessons across a fixed set
     of concepts per subject.
   - The item-4 reviewer scores them; the deploy is blocked if the defect rate rises.
6. **Stop wording patches** except for severe defects. New regex rules over model text only when
   the defect is high-severity and item 4 shows it is frequent.

### Tier 3 — the big levers

7. **Shrink the model's free writing where mistakes hurt most.**
   - Authored text for explanations and wrong-answer feedback (the content already exists in the
     seed corpus and the Educational Brain).
   - The model connects the pieces conversationally and stops re-explaining facts from memory.
   - Risk: the tutor feels scripted. Measure with item 4, not by feel.
8. **Better quizzes.** — **OWNER** for the data write
   - The correct option is the uniquely longest in 71% of Biology 3–4 option items (maths 94%,
     physics 67%).
   - Rebalance distractors. The bootstrap is insert-only (`createMany skipDuplicates`), so
     existing production rows need an owner-authorized DB update.
   - Replace 2-option coin-flip items where possible.
   - Require one explain-in-your-own-words answer before mastery; today three taps can master a
     concept.
   - Already done: option order is shuffled per question (`7a82b277`); before that the correct
     answer was first in 6,280/6,281 items.
9. **Simplify the post-processing layers.**
   - Merge the scattered rewrite and repair steps in `src/app/api/learn/chat/route.ts` (>12k
     lines) into one ordered, individually tested pipeline, and delete dead rules.
   - Fewer layers means fewer conflicts like item 1.
   - Refactor in place; no parallel pipeline (Educational Brain governance rule).

### Tier 4 — correctness and reach

10. **Fact-checking (physics first).** — **OWNER** (the Deterministic Physics Verifier is a
    paused primitive)
    - The only thing that catches a factual slip before the student sees it.
    - Builds on the LOG-only `V-CONTRADICT` checker (`src/lib/kernel/verifier/claims.ts`).
11. **Strongest model only for high-stakes turns** (wrong-answer feedback, explanations). —
    **OWNER** (spend; Groq-first rule)
    - Decide from the owner's A/B model test: same 10 concepts, defects and cost compared.
12. **Remember each student across sessions** (misconceptions, weak spots). — **OWNER** (the
    Durable Learner State primitive is paused)

### Tier 5 — launch discipline

13. **Certify concept by concept.** Serve only concepts that pass the item-4/5 bar; the rest wait.
    Better 50 excellent lessons than 900 shaky ones.
14. **Human in the loop.**
    - A "report a problem" button in the lesson UI.
    - A pilot with 10–20 real students.
    - Weekly teacher review of sampled transcripts.
    - Real students find what simulations miss.

## Confidence (judgement, to be replaced by item-4 measurements)

| State | "Good enough for real students" |
|---|---|
| Today | 4–5 / 10 |
| After items 1–7 | 7 / 10 |
| After all 14 | 8.5 / 10 |
| "Defect-free" (any state) | 2 / 10 — not reachable with an LLM writing free text |

Items 5, 13 and 14 matter most: they catch the defects nobody predicted.

## Known open defects feeding this plan (2026-09-27)

- **Parked WIP, not on `main`** (`38609b7f` on `claude/learner-intent-interpreter-ab-pof2vd`):
  - U+2011 "spot‑on" not recognised as a confirmation, causing doubled praise;
  - wider detection of undelivered-question announcements (unfinished, untested).
- **Seen live, not fixed:**
  - the tutor offers or types a different practice problem while a quiz is on screen;
  - a tapped answer is mirrored back ("did I get that right?") instead of graded;
  - an enzyme lock/key inversion; the "+2 means electrons added" sign error.
- **Model-written quizzes** are served in the model's own order. Position bias is unmeasured,
  because the evidence table does not record answer position.
