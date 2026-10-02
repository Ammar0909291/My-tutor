# Turn-quality baseline — Phase 0 (2026-10-02)

Phase 0 of `docs/architecture/TURN_ASSEMBLY_PROPOSAL.md`.
- **Read-only.** Every number here comes from server-side SQL run through the Supabase MCP tool
  against production (`ywakxiqbevfuxsiwewnw`). Only counts and small samples were returned. No
  row was written.
- **Window:** the 14 days ending 2026-10-02 ~07:00 UTC.
- **Turn checks:** `scripts/qa/turnQuality/turn-checks.sql`. Re-run it rather than trusting the
  numbers below.

## Traffic in the window

| Subject | Assistant turns | from real-looking accounts | from `qa-*@mytutor-qa.invalid` |
| --- | --- | --- | --- |
| physics | 12,514 | 784 (8 accounts) | 11,730 (722 accounts) |
| biology | 3,052 | 351 (3) | 2,701 (46) |
| chemistry | 935 | 444 (8) | 491 (44) |
| english | 571 | 325 (6) | 246 (17) |
| mathematics | 182 | 32 (2) | 150 (14) |

About 89% of turns come from disposable QA accounts. The pipeline is the same one real learners
get, but the learner side is scripted. "Real-looking" means any address that is not a QA
domain; it includes the owner's own testing.

## Zero-tolerance checks

### Z1 — a recorded grade disagrees with the authored key

Scope: PROBE_OUTCOME events where the learner's message is exactly the text of one authored
choice.

| Subject | Graded events | Matched to a key | Right tap recorded fail | Wrong tap recorded pass |
| --- | --- | --- | --- | --- |
| physics | 3,863 | 3,532 | 0 | 0 |
| biology | 826 | 806 | **1** | 0 |
| chemistry | 219 | 150 | 0 | 0 |
| english | 113 | 99 | 0 | 0 |
| mathematics | 4 | 4 | 0 | 0 |

- **The one disagreement** was on `bio.plant.plant-biotechnology-applications`, 2026-09-27
  13:12. The learner tapped the correct option; it was recorded `fail|confusion=true` and the
  reply said "Not quite — the answer is: <the option they tapped>".
- It **predates GB+** (choice-only grading, merged 2026-09-29, fa77ed50). After GB+ there are 0
  disagreements.
- **Not covered:** taps that did not match an authored choice exactly (about 9%), and free-text
  answers.

### Z2 — mastery recorded without graded evidence

Scope: `topic_progress` rows that became MASTERED or COMPLETED in the window, counted by the
PROBE_OUTCOME passes behind them (same user and concept, up to the completion time).

- **453 of 453 have 3 or more passes. 0 have fewer.**
- **Caveat:** a pass may be an option-(c) re-ask. RC-E is still an owner decision, and this
  check does not separate re-asks.

### Z3 — progress lost

**Not measured.** `topic_progress` keeps no history. A demotion such as CL-17 (skip demoting
MASTERED) cannot be seen after the fact. Measuring it needs an audit trail, which is new work.

## Turn-quality checks (heuristics)

| Check | What it counts | Hand-read precision |
| --- | --- | --- |
| K1 | A reply to a tapped answer with under 12 words of prose, excluding the lesson close | **12/12** true: no reason given, including an empty reply and "Select the correct answer from the options below:" with no card |
| K2 | A question mark in the prose beside a card | **12/12** true: about half re-type the card's question (asked twice); the rest ask a second, different question or a confirm-back |
| K3 | A reply to a tap that quotes the learner's previous answer and not this one (R2) | **~3/8**: the rest are shared topic words. Weak; the count is not a rate |
| K4 | The closing sentence announces the card | Mostly the server's own neutral stub. About **2/15** name a wrong topic. Use only the sample estimate |
| K5 | The same prose (over 120 chars) sent twice in a session | not yet sampled |

### Counts by subject (all accounts)

| Subject | Graded turns | K1 stub on graded | Turns with card | K2 question beside card | K5 repeated |
| --- | --- | --- | --- | --- | --- |
| physics | 2,030 | 317 (15.6%) | 4,976 | 327 (6.6%) | 37 |
| biology | 884 | 238 (26.9%) | 915 | 77 (8.4%) | 81 |
| chemistry | 188 | 28 (14.9%) | 327 | 37 (11.3%) | 12 |
| english | 85 | 4 (4.7%) | 166 | 14 (8.4%) | 15 |
| mathematics | 9 | 0 | 25 | 8 | 0 |

### Trend (all subjects)

| Period | Graded turns | K1 stub on graded | Turns with card | K2 question beside card |
| --- | --- | --- | --- | --- |
| 09-18 … 09-24 | 471 | 25.1% | 640 | 9.8% |
| 09-25 … 09-28 | 2,493 | 17.9% | 5,452 | 6.8% |
| 09-29 … 09-30 | 102 | 16.7% | 151 | 9.3% |
| 10-01 … 10-02 | 130 | **3.8%** | 166 | 10.2% |

**K1 has fallen since 10-01.** That window includes the stub repairs CL-1, CL-1b and CL-28. CL-30
went live during it, so its effect is only partly visible. 130 graded turns is a small sample:
treat 3.8% as provisional.

**K2 has not moved in 14 days.** No fix so far reaches it. It is the largest open class with
high precision.

## Also seen

- `MISCONCEPTION_DETECTED` events whose recorded text is a request, not an answer: "quiz me" ×7,
  "can you quiz me on this" ×8. A misconception is being recorded for a request.
  - Biology QA noted the same on 2026-09-22.
  - Not yet sized across all such texts.

## Not measured, and why

- **Saved text vs. shown text:** the database stores only one of the two. CL-29 fixed the known
  case (the completing turn).
- **Factual errors in tutor prose:** needs a content check (proposal Phase 5).
- **Option-length and answer-head cues:** content audits exist (CL-13, CL-14, CL-18); not
  repeated here.

## What this says about Phase 1

The two largest high-precision classes are structural:
- **K1:** the model gives no reason after an answer.
- **K2:** the model types a question beside a card.

In the proposal's assembled turn, the model's slots may not contain questions, and feedback is a
required, validated slot. Both classes then become validation failures with a fallback, instead
of text to patch.

This supports Phase 1, but it does not prove it. Phase 2 shadow mode must show the rates drop on
the same turns.

## Release bar (point 2): proposed, for the owner to set

The bar is the owner's decision. These are proposed values, so the verdict below can be checked.

| Tier | Class | Proposed bar |
| --- | --- | --- |
| Zero tolerance | Z1 grade vs authored key (after GB+) | 0 |
| Zero tolerance | Z2 mastery with fewer than 3 graded passes | 0 |
| Rare | K1 stub reply to a tapped answer | under 5% of graded turns |
| Rare | K2 question beside a card | under 3% of turns with a card |
| Tolerable | K4 wrong-topic lead-in, wording | tracked only |

**Verdict against the proposed bar (14 days, all accounts):**

| Subject | Z1 | Z2 | K1 (bar under 5%) | K2 (bar under 3%) | Meets bar |
| --- | --- | --- | --- | --- | --- |
| physics | 0 | 0 | 15.6% | 6.6% | **no** |
| biology | 0 after GB+ | 0 | 26.9% | 8.4% | **no** |
| chemistry | 0 | 0 | 14.9% | 11.3% | **no** |
| english | 0 | 0 | 4.7% (85 graded) | 8.4% | **no** (K2) |
| mathematics | 0 | 0 | 0 of 9 | 8 of 25 | **no data to judge** |

- **Every subject passes zero-tolerance. None passes the rare-class bar over the 14-day window.**
- Across all subjects since 2026-10-01, K1 is 3.8% on 130 graded turns. That would pass if it
  holds, but the sample is too small to call. K2 fails in every period.
- **Per-lesson gating is not possible from this data.** Most lessons have only a few graded turns
  in 14 days. A per-lesson verdict needs either more traffic or scripted QA runs per lesson.
- Hiding subjects or lessons is a product change (`EDUCATIONAL_BRAIN_SUBJECTS` and the rollout
  lists). It is the owner's call and was not made here.
