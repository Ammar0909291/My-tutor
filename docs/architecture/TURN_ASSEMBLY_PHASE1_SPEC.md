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

### 11.3 Second sample (2026-10-02 13:54, physics, deploy `3caa41f4`)

- **Volume:** 16 graded taps over 4 lessons (errors, significant-figures, vector-addition,
  vector-products). 15 lines parsed, 1 truncated. Tallied with
  `scripts/qa/turnQuality/tallyAssembledTurns.ts`.
- **Results:**

  | Measure | Result |
  | --- | --- |
  | `completionAgreement` | 15/15 |
  | Fallback | 2/15 (13%), both `V1-unparseable` |
  | Regenerated | 6/15 (40%) |
  | Assembled K1 / K2 | 1 / 0 (the K1 is a fallback with no authored rationale) |
  | Served K1 / K2 | 0 / 0 |
  | Shadow call p50 / max | 844 / 1,619 ms |

- **Root cause, from `rawOnFailure`:** the model ignored the JSON instruction and wrote a new
  quiz ("Here's a new question for you: … A) 20 J …", "**Quiz** …"). The slot call sent the
  recent turns as chat, so the model continued the "quiz me" pattern. That also explains the
  high regeneration rate.
- **Fix (next commit):** the slot call sends no history, only one instruction. Every fact the
  slots need is already in its system prompt. Needs a third sample to confirm.

### 11.4 Third sample (2026-10-02 14:33, biology, deploy `6e2d984b`, no-history slot call)

- **Volume:** 16 graded taps over 4 lessons. All 16 lines parsed, none truncated.
- **Results:**

  | Measure | Result |
  | --- | --- |
  | `completionAgreement` | 16/16 |
  | Parse failures | **0** (2 per sample before) |
  | Regenerated | 4/16 (25%; was 40%) |
  | Fallback | 2/16 (12.5%) |
  | Assembled K1 / K2 | 1 / 0 |
  | Shadow call p50 / max | 847 / 1,658 ms |

- **The no-history fix worked for parsing.** Every remaining failure was V5.
- **Two defects found and fixed (next commit):**
  1. **The fallback taught a misconception.** On a wrong answer it rejoined the chosen
     distractor to its own authored continuation: "Fungi and plants are in the same kingdom —
     fungi are simply non-green plants." That would have been stated as fact. Now a wrong
     answer gets no fallback feedback, and the verdict line already carries the correct answer
     and its authored why.
  2. **V5 was too broad.** It checked every earlier card's options, and cards in one lesson
     share the concept's vocabulary. Now only the card shown before the graded one is checked,
     which is exactly the R2 defect. Failed slot text is now logged too (`rawOnFailure` on any
     code).
- **Cumulative over the three samples:**
  - 48 graded turns, 46 parsed;
  - `completionAgreement` 46/46;
  - assembled K2 0;
  - fallback 6/46 (13%), from three causes that are now fixed but not yet re-measured.

### 11.5 Fourth window (2026-10-02 14:56–15:15, deploy `a2a716b4`: no-history call + V5 previous-card + no distractor fallback)

- **Traffic:** an English sampler run plus real mathematics traffic from another account.
- **Coverage caveat:** the window was fetched with a `gate-assessment` filter, so this is a
  subset of the `[assembled-turn]` lines.
- **Results:** 21 lines, all parsed.

  | Measure | Result |
  | --- | --- |
  | `completionAgreement` | 21/21 |
  | Fallback | **0/21** |
  | Regenerated | **0/21** |
  | Assembled K1 / K2 | 0 / 0 |
  | Served K1 / K2 | 0 / 0 |
  | Shadow call p50 / max | 809 / 983 ms |

- **Concepts covered:** eng.phonics (9), math.linalg / calc / func / trig (12).
- **The sampler's English "unauthored" count (19) was its own key mismatch.** The server served
  authored cards (23 `authored-served`). The sampler now also keys on the served question text.
- **Cumulative, all four windows:**
  - 67 parsed graded turns;
  - `completionAgreement` 67/67;
  - assembled K2 0;
  - fallback 6/67 (9%). All 6 came before the fixes; 0/21 after them.
  - The §7 gate needs ≥300, and `waitedMs` (deployed in `0bbd64cb`) is not yet measured.

### 11.6 Fifth window (2026-10-02 15:15–15:30, deploys `a2a716b4` / `0bbd64cb` / `7bc0c8d1`, mathematics sampler + other traffic)

- **Volume:** 24 lines: 21 parsed, 3 truncated by the viewer.
- **Results:**

  | Measure | Result |
  | --- | --- |
  | `completionAgreement` | 21/21 |
  | Fallback | 1/21 (4.8%) |
  | Regenerated | 1/21 |
  | Assembled K1 / K2 | 0 / 0 |
  | Shadow call p50 / max | 783 / 1,812 ms |
  | **`waitedMs` p50 / p95 / max** | **0 / 1 / 1 ms** |

- **Latency (§7) answered:** shadow mode adds no measurable wait to the reply. The slot call always
  finished before the main turn did.
- **The one fallback was a V6 false positive.** Correct feedback on a wrong answer ("…they are
  perfect squares… the choice … is incorrect") was flagged as affirming the wrong answer, because
  the route's broad `CONFIRMS_CORRECT` list matches `perfect`.
  - The denial side had the same risk ("the other options are incorrect").
  - V6 now uses verdict phrases addressed to the learner only (next commit).
- **Cumulative:**
  - 88 parsed graded turns;
  - `completionAgreement` 88/88;
  - assembled K2 0;
  - fallback 7/88 (8%), every one traced to a since-fixed cause.
  - Under the fixes in place by the fifth window, the only fallback was the V6 false positive now
    fixed: 1/42.

### 11.7 Sixth window (2026-10-02 15:43–15:52, deploy `802066f3`: all fixes incl. strict V6; chemistry atomic structure)

- **Volume:** 10 lines on this deployment: 7 parsed, 3 cut by the log viewer. Other lines of the
  16-turn run landed on warm instances of earlier deploys.
- **Results:**

  | Measure | Result |
  | --- | --- |
  | `completionAgreement` | 7/7 |
  | Fallback / regenerated | 0 / 0 |
  | Assembled K1 / K2 | 0 / 0 |
  | `waitedMs` max | 1 ms |

- **Log-line size:** cut lines were 30% of this window. Served and assembled text in the log are
  now 700 characters each (was 1,200), so lines stay parseable.
- **Cumulative:**
  - 95 parsed graded turns;
  - `completionAgreement` 95/95;
  - assembled K2 0.
  - Since the last fix set, `waitedMs` max is 1 ms.

### 11.8 Seventh window (2026-10-02 16:20–16:30, deploy `7409a0c3`, 700-char log lines)

- **Traffic:** a physics mechanics sampler run (free-body, friction, tension, normal force) plus
  8 turns of other mathematics traffic.
- **Results:** 19 lines, **19 parsed, 0 truncated**.

  | Measure | Result |
  | --- | --- |
  | `completionAgreement` | 19/19 |
  | Fallback / regenerated | 0 / 0 |
  | Assembled K1 / K2 | 0 / 0 |
  | Served K2 | 1/19 |
  | Shadow call p50 / max | 916 / 1,205 ms |
  | `waitedMs` max | 0 ms |

- **Cumulative:**
  - 114 parsed graded turns;
  - `completionAgreement` 114/114;
  - assembled K2 0.
  - Since all fixes were in place (windows 6–7): 26/26 clean, 0 fallback.

### 11.9 Windows 8–9 (2026-10-02 16:32–16:51, deploy `0efe34cb`)

- **Window 8 (biology, cell biology, + 5 mathematics):**
  - 13 parsed, 0 truncated, 13/13 clean.
  - The rest of the run landed on the previous deploy, whose log query timed out.
- **Window 9 (chemistry periodic trends, + 3 mathematics):**
  - 19 parsed, 0 truncated, 19/19 clean.
  - Fallback 0, regenerated 0, `waitedMs` max 0 ms.
  - On the same turns the **served** replies had K1 1 and K2 2; the assembled replies had 0 and 0.
- **Cumulative:**
  - **146 parsed graded turns, `completionAgreement` 146/146**, assembled K2 0;
  - since every fix was in place (windows 6–9): **58/58 clean, 0 fallback**;
  - `waitedMs` max 1 ms.
- **§7 gate status:**

  | Requirement | Status |
  | --- | --- |
  | ≥ 300 shadowed graded turns | 146 |
  | Assembled K1/K2 at 0 | met so far |
  | Fallback < 10% | 0% since the fixes |
  | `completionAgreement` 100% | met so far |
  | Latency | no added wait |
  | Owner hand-read of 30 pairs | pending; pairs file ready, predates the last fixes |

### 11.10 Windows 10–11 (2026-10-02 16:51–17:27, deploys `4c1ada8a` / `a412642a`)

- **Window 10 (physics rotational mechanics):**
  - 10 lines read (2 returned inline, 8 from file), 10/10 clean, `waitedMs` 0–1 ms.
  - A telling pair on a wrong answer about rotational KE:
    - **served** drifted into torque from the on-screen figure ("τ = r F sin θ … pick the one
      that correctly describes how the torque is calculated");
    - **assembled** explained why ½mv² misses rotation and worked ½Iω² = 4.5 J.
- **Window 11 (mathematics, foundations + conditional probability):**
  - 10/10 clean.
  - Slot call max 2.8 s; `waitedMs` still 0, because the main turn was slower.
  - The English window between them could not be fetched (log query timed out), so it is not
    counted.
- **Sampler incident:** an English run killed by an outer `timeout` skipped its cleanup and left
  one disposable `qa-shadow-sample` account. Read-only check: exactly one, created 17:01:17.
  - It is not deleted here: that would be a production write outside the app's deletion path;
    owner's call.
  - Fixed in `a412642a`: an internal time budget, plus SIGTERM/SIGINT cleanup.
- **Cumulative:**
  - **166 parsed graded turns, `completionAgreement` 166/166**, assembled K2 0;
  - since all fixes: **78/78 clean, 0 fallback**;
  - `waitedMs` max 1 ms.

### 11.11 Windows 12–13 (2026-10-02 17:27–17:57)

- **Window 12 (chemistry bonding):** 6/6 clean.
- **Window 12b (physics Lagrangian, bounded run used for the egress measurement):** 6/6 clean.
- **Window 13 (chemistry states and solutions, + 6 mathematics):** 11/11 clean.
  - `waitedMs` max 1 ms.
- **Egress (owner's constraint):** measured by `pg_stat_statements` delta, recorded in
  `docs/history/egress-incidents.md`.
  - About 90 rows per chat turn, about 1 MB per bounded sampler run.
  - Shadow mode does no database I/O.
  - The spine-replay leak is still at 0.
- **Cumulative:**
  - **189 parsed graded turns, `completionAgreement` 189/189**, assembled K2 0;
  - **post-fix 101/101 clean, 0 fallback**.

### 11.12 Windows 14–19 (2026-10-03 07:53–08:36, deploys `f553ffb8` → `87f8df31`)

- **Runs:** disposable accounts, cleaned up after each run.
  - Chemistry (foundations, then atomic structure), biology, mathematics, physics (mechanics),
    English twice: phonics, before and after the sampler fix; and a final physics run (forces).
  - The same deploys also carried another session's mathematics QA.
- **Turns:** 118 distinct graded shadow turns. The windows were fetched as they closed,
  combined, and de-duplicated by line.
- **Result:** every gate number held:
  - completion agreement 118/118;
  - fallback 0, regenerations 0, validation codes none;
  - assembled K1 0 and assembled K2 0;
  - `waitedMs` max 1 ms; slot call p50 750 ms, max 1.6 s.
- **The served text** in the same turns had the defects the assembler removes: K1 (stub)
  3/118 and K2 (a question beside the card) 3/118.
- **Sampler fixes, script only:**
  - Cards are now also matched on their option set.
  - Every exported probe array is loaded. English's adult-band probes are exported as
    `ENGLISH_ADULT_BAND_BATCH_1`, which the old `*PROBES` name filter skipped.
  - English went from 2 unmatched cards per run to 0.
  - The cards still unmatched are written by the model during the lesson: an `[MCQ]` tag, not an
    authored probe. Checked against both the seed files and `probe_assets`. Shadow correctly
    never fires on them.
- **Log retention:** Vercel keeps runtime logs for about one hour on this plan. A window has to
  be fetched within the hour.
  - The turns from the 2026-10-02 23:54 and 2026-10-03 00:20 verification runs (about 7) could
    not be fetched, so they are not counted.
- **Cumulative:**
  - **307 parsed graded turns, completion agreement 307/307, assembled K1 and K2 0,
    fallback 0 since all fixes.**
  - The 300-turn condition of the §7 shadow → serve gate is met.
  - **§2's own serve condition is met as well:** completion agreement is 100% over the §7
    sample (307/307). So no separate early fold is needed. The assembled text re-runs the same
    fold, with the text-derived inputs recomputed, and it closed the lesson exactly when the
    served text did.
    - Caveat: only 8 of this window's 118 turns closed a lesson (`completion: true`). The other
      110 show agreement on not closing.
  - The one gate condition left is the owner's: a hand-read of 30 pairs
    (`docs/history/turn-assembly-pairs-2026-10-02.md`), then the separate serve approval
    (§10 item 3).
  - Serve stays off until the owner decides.

### 11.13 SERVE, windows 1–2 (2026-10-03, deploy `0c4cfa8` / dpl_A8Au4zmsDg8Kqib7HdBEqPsXbhF3)

- **Switch:** owner approval 2026-10-03 (§10 item 3). `TURN_ASSEMBLY_MODE` set to `serve`
  (env `JbRbLIiro5FFjyBB`). The deploy of `464f0ea` captured the old value: its 9 lines say
  `served: live`. `0c4cfa8` is the first serve deploy.
- **Runs:** disposable accounts, deleted after each run:
  - chemistry: 10 graded;
  - physics: 12 graded;
  - biology: 12 graded;
  - plus another session's mathematics QA on the same deploy.
- **Graded turns, 49 lines** (`tallyAssembledTurns.ts`):
  - served assembled **49/49**; completion agreement **49/49**;
  - served K1 **0/49**, served K2 **0/49**. Live, the model's own text in the same turns: K1
    1/49, K2 1/49;
  - fallback 0, regenerations 0, validation codes none;
  - slot call p50 715 ms, max 1.25 s; added wait 0 ms.
- **Completion turns:** 3 of 49. Each was verdict, then feedback, then close (§14).
- **Stored row = served text:**
  - read-only SQL found all 25 window-1 texts verbatim as ASSISTANT rows (24 by 120-character
    prefix, 1 by content, after a Unicode-normalisation difference);
  - the card block was present exactly when `cardAttached` was, on every turn that a
    60-character prefix tells apart. One pair shared a prefix and could not be.
- **5xx:** none on the production deployment in the window (`get_runtime_logs`,
  statusCode 5xx).
- **Hand-read of the 25 served texts (window 1):**
  - each is a verdict, then a reason naming the idea, then teaching, then a neutral lead-in
    or the close;
  - no stub, no question.
  - The factual content was not checked (Phase 5).

### 11.14 SERVE, windows 3–6 and the DoD 1 verdict (2026-10-03, deploys `0c4cfa8` → `504579c`)

- **Runs:** disposable accounts, deleted after each run:
  - mathematics 9 graded, English 10;
  - chemistry 11, physics 12 (later lessons, `QA_START` 6 and 8);
  - biology 12, English 12 (`QA_START` 8);
  - plus other sessions' traffic on the same deploys.
- **Graded turns, cumulative (windows 1–6, de-duplicated lines): 103.**
  - served assembled **103/103**; completion agreement **103/103**;
  - served K1 **0/103**, served K2 **0/103**. Live, the model's own text on the same turns:
    K1 2/103, K2 3/103;
  - fallback 0, regenerations 0, validation codes none;
  - slot call p50 735 ms, max 1.38 s; added wait max 1 ms.
- **Stored row = served text plus its card:** read-only SQL over all 103 served texts.
  - 100 found by exact 80-character prefix. In all 100, the card block is present exactly
    when the turn attached one (`cardAttached`). 2 prefixes matched more than one row.
  - The other 3 were found by ASCII fragment ("Prüfer", IPA such as /ɪ/ and /ʊ/). The
    prefix compare missed them on a Unicode-normalisation difference between the log and
    the database. **0 missing.**
- **5xx:** none in production over the 2 hours covering every window
  (`get_runtime_logs statusCode=5xx since=2h`).
- **DoD 1 verdict:** every condition is measured and met on at least 100 served graded turns:
  - served K1 0%, served K2 0%, both under 1%;
  - completion agreement 100%;
  - stored row matches;
  - no new 5xx.
- **Phase-0 SQL, the same 7 days split at the switch (11:37 UTC):**
  - K1 on graded turns: pre-serve 361/2,201 (16.4%), since serve 0/46;
  - K2 beside a card: pre-serve 327/5,168 (6.3%), since serve 1/128.
  - The one K2 is a quoted question inside the teaching ("ask, 'What must have happened just
    before this?'"), so it is a false positive of the heuristic.
  - The SQL's graded-turn detector sees fewer turns than the logs: it needs the card to have
    been appended to the previous row, which a re-offered card is not.

---

## 12. Phase 3 step 2 — turns that attach a card (design, 2026-10-03)

**Owner approval:** Phase 3 for all turn types, given 2026-10-03.

**Scope.** Every turn whose response carries a card (`mcqHoisted !== null`) and whose served text
is not the graded assembled turn (§5). Cases:
- a "quiz me" turn;
- a teaching turn where the gate attaches its card;
- a graded turn where serve fell back to the live reply.

**Defect it targets:** K2, a question in the prose beside a card. The Phase-0 rate was 6.6–11.3%
by subject, and it did not move in 14 days (`turn-quality-baseline-2026-10-02.md`). The existing
gate-contract stage drops a *trailing* question. A question earlier in the prose survives it,
for example a confirm-back ("Does that make sense so far?") before the teaching.

**Assembly** (`src/lib/teaching/attachAssembly.ts`, `assembleAttachTurn(prose, cardQuestion)`). No
model call; deterministic:
1. Prose with no `?` is left exactly as it is.
2. Otherwise:
   - every question **to the learner** is dropped, and so is every home-made option line
     (`dropLearnerQuestions`);
   - a question to the learner is one left hanging (nothing but more questions after it in its
     paragraph), or a confirm-back ("does that make sense", "ready to try", …);
   - a question the prose answers itself is teaching and stays ("Pressure in pascals? That's
     kg/(m·s²)."). See §12.1 for why;
   - the prose ends on exactly one neutral lead-in (`neutralLeadInFor`, which never names a
     topic, the K4 defect). A closing sentence that already announces the card is replaced by
     the lead-in, never stacked with it.
3. A question inside quotation marks is content, not a question to the learner, for example
   English: *The sentence "Where are you going?" is interrogative.* The turn is then left
   untouched and stays K2 in the log, rather than losing teaching content.

**Route** (after the graded serve decision, before save-once):
- **shadow:** log `[assembled-attach]` with K2 and K1 before and after, `changed`, and
  `served: 'live'`. The reply is unchanged.
- **serve:** send the assembled text when it changed. A rhetorical `?` left in it does not block
  serve.
  - Never on a reply to an answer if assembly would create a K1 stub (under 12 words) that was
    not there before. K2 is not traded for K1.
  - Save-once (§6) then stores exactly the served text plus its card.
- One line per card turn, so the denominator is every card turn, not only the changed ones.

**Measure** (`tallyAssembledTurns.ts`, the `[assembled-attach]` section):
- K2 on served card turns;
- changed share;
- K1 created (must be 0).
- Target: K2 on card turns under 3% over at least 100 card turns.

**Tests:**
- `attachAssembly.test.ts` (unit);
- `attachAssemblyRoute.test.ts`, which covers:
  - off: no log line;
  - shadow: byte-identical to off, and the line logged;
  - serve: no `?`, one lead-in, and the stored row equal to the served text plus its card.

### 12.2 DoD 2 verdict — card turns (2026-10-03, deploys `0c4cfa8` → `7defba5`)

- **102 card turns** (`[assembled-attach]`, de-duplicated, all serve deploys).
  - Before assembly, K2 was **12/102 (11.8%)**. That is in line with the Phase-0 baseline of
    6.6–11.3%.
  - Served: **2/102 (2.0%)**, under the 3% target.
  - Both remaining hits are quoted questions inside the teaching, so content and not a
    question to the learner:
    - "ask, 'What must have happened just before this?'";
    - 'the question "which value?" even arise'.
  - **True K2 served: 0/102.**
- Changed 10/102. Hand-read since the rhetorical-question fix (`504579c`), all correct:
  - a bold re-typed card question about the p-orbital figure, removed;
  - a home-made A–D option list re-typed beside the card (convex functions), removed;
  - a bold figure question ("Which label in the figure shows that component?"), removed.
- K1 created on a graded turn: 0.
- The two damaged turns from window 1 (§12.1) are the only defects found, and they are
  fixed.

---

## 13. Phase 3 step 3 — lesson open (baseline, 2026-10-03; design follows)

**Path.** Openings are not chat turns. `POST /api/learn/lesson-init` makes one `routeAI` call
(re-asked once on a navigation refusal), runs its own repairs (unbacked figure reference,
prediction-answer strip, field-line sign, vision direction), and writes one ASSISTANT row with
the lesson's `lessonKey`. No card is attached and nothing is graded, so K1/K2 do not apply.

**Baseline** (read-only SQL, production, last 7 days). An opening is the first row of each
`(sessionId, lessonKey)`, and it is an ASSISTANT row.

| Subject | Openings | 2+ "?" | Navigation refusal | Figure reference | Under 40 words | p50 chars |
| --- | --- | --- | --- | --- | --- | --- |
| physics | 677 | 18 | 3 | 0 | 4 | 1,385 |
| biology | 324 | 6 | 0 | 1 | 0 | 1,471 |
| chemistry | 77 | 2 | 0 | 0 | 0 | 1,490 |
| mathematics | 75 | 8 | 0 | 0 | 0 | 1,266 |
| english | 34 | 2 | 0 | 1 | 0 | 896 |

- **Hand-read of the "2+ ?" class:** 22 openings, about half true.
  - True cases end on two or three questions to the learner. For example `phys.em.ohms-law`:
    "what do you expect to happen to the current? … What would the current be? … What do you
    notice?"
  - The rest are rhetorical or quoted questions inside the teaching ("we ask, 'How much energy
    is transferred each second?'").
- **Estimated true rate:** about 1.5% of openings ask the learner more than one question.
  Navigation refusal is 0.25%, figure reference 0.17%.
- **What this means for the gate.** The opening is the healthiest turn type measured so far.
  An assembled opening must beat these rates in shadow (§7 method, at least 50 turns) before it
  serves. Otherwise it stays model-written, and that is recorded here with the numbers.

### 13.1 Shadow result and decision (2026-10-03, deploys `b87baf2` / `7defba5`)

- **Implementation:**
  - `assembleOpeningTurn`, classifier shared with §12 (`learnerQuestions.ts`);
  - wired into `lesson-init` after every repair;
  - its own switch `TURN_ASSEMBLY_OPEN_MODE`, which defaults to shadow even under global serve
    (`turnTypeMode`).
  - Tests: `openingAssembly.test.ts`, which failed before the module existed.
- **Sample:** **80 openings** (`[assembled-open]`) across all five subjects, from open-only
  sampler runs on disposable accounts plus other sessions' traffic.
- **Result:**
  - openings asking the learner 2+ questions: **live 0/80, assembled 0/80**;
  - changed 0/80;
  - openings with no question to the learner at all: 4/80 (not a check in §13; noted only).
- **Decision (DoD 3 rule: serve only if shadow beats live):** the opening **stays
  model-written**, and `TURN_ASSEMBLY_OPEN_MODE` stays unset (shadow).
  - Shadow did not beat live: it equalled it at 0, because the class it targets is about 1.5%
    of openings in the 7-day baseline (§13), and 80 openings show none of it.
  - The shadow line stays on, so a rise would be visible.

---

## 14. Phase 3 step 4 — completion turns (design, 2026-10-03)

**What the live path sends today.** When a graded answer finalises the lesson, `route.ts`
replaces the whole reply with `buildLessonCloseText(...)` (the deterministic close, ~12079). It
then rewrites the stored row (CL-29).
- So the learner's last answer gets **no verdict and no reason**, only "✓ Lesson finished …".
- This is K1's shape on the most important answer of the lesson. Phase 0 K1 excluded the close
  by design, so it never counted.

**The assembled completion turn is already built.** It is the §5 graded assembly with
`closeText` set:

```
<verdict line>     from the grade
<feedback slot>    why the last answer is right or wrong (validated, V1–V6)
<close>            buildLessonCloseText(...) — no teaching slot, no card
```

`assembleGradedTurn` drops `teaching` and the lead-in when `closeText` is present. Serve (§11.13)
sends it under the same fallback rules. Completion agreement is the gate that matters most
here: the assembled text must close exactly when the live one did.

**Measure.** `[assembled-turn]` lines with `completion: true`:
- the share served assembled;
- assembled K1 (0 expected: the feedback slot is required);
- completion agreement;
- a hand-read that the close still follows the feedback.
- Target: at least 50 completion turns.

**Tests.**
- Already present: `turnAssembly.test.ts` ("completion: …", line ~137). A completing turn is
  verdict, then feedback, then close, with no teaching and no lead-in.
- To add: a route-level serve test for a completing tap. It needs the harness to reach
  mastery, so it is written when the harness supports it. Until then, production
  `completion: true` lines are the evidence.

### 14.1 Result (2026-10-03, serve deploys `0c4cfa8` → `7defba5`)

- **Sample:** **53 completion turns** (`completion: true`). 52 were served assembled; 1 came
  from the shadow-only deploy before the switch. They came from `QA_ALL_RIGHT=1` runs (lessons
  driven to their completing turn) in all five subjects.
- **Completion agreement 53/53.** The assembled text closed the lesson exactly when the live
  one did.
- **Live vs assembled, same turns:**
  - live is the close alone ("That's Apoptosis and Programmed Cell Death finished — nice
    work…"), with no verdict and no reason for the learner's last answer;
  - assembled is verdict, then a reason that names the idea, then the same close. Hand-read,
    `bio.cell.apoptosis`: "Yes, exactly right. / Apoptosis eliminates targeted cells in a
    regulated manner, shaping structures like digits… / That's Apoptosis and Programmed Cell
    Death finished — nice work…".
  - Assembled K1 0/53.
- **Decision:** shadow beat live, so this turn type is served. It already was, as part of the
  graded serve (§11.13). No separate switch.

---

## 15. Phase 3 step 5 — learner questions (baseline, 2026-10-03)

**Definition.** An ASSISTANT row whose previous row is a USER message ending in `?`
(12–400 characters). Read-only SQL, production, last 7 days.

| Subject | Turns | Reply under 12 words | Opens with a verdict | With a card | Card and a `?` in the prose |
| --- | --- | --- | --- | --- | --- |
| physics | 1,783 | 4 | 2 | 30 | 4 |
| mathematics | 145 | 28 | 0 | 67 | 4 |
| chemistry | 94 | 1 | 0 | 11 | 0 |
| english | 66 | 1 | 0 | 7 | 3 |
| biology | 40 | 2 | 0 | 6 | 3 |

- **Hand-read of the mathematics "under 12 words" class:** 12 read, **0 true**.
  - Every one answers a practice request phrased as a question ("can you ask me a
    question?", "next?").
  - The reply is a lead-in plus a card, which is the correct turn.
  - Excluding practice requests, the stub rate on real learner questions is at most 8 of
    2,128 (0.4%).
- A false verdict on a question is 2 of 2,128 (0.1%).
- **Card and a `?` in the prose:** 14 of 121. This is K2, and the §12 attach assembler already
  covers it, because it runs on every card turn whatever the learner said.
- **Decision rule (DoD 3):** an assembled answer must beat these rates in shadow. The measured
  defect rate is already near the floor of what the checks can see, so a slot-filled answer has
  nothing to win on these checks. It would add a model call and risk stiffness on the one
  turn type where free text is the point. Learner questions stay model-written, unless a
  shadow run shows a gain.

### 12.1 First serve window and the rhetorical-question fix (2026-10-03, deploy `0c4cfa8`)

- **Graded turns** (chemistry sampler plus another session's mathematics QA, 25 lines on the
  serve deploy):
  - served assembled 25/25; completion agreement 25/25;
  - served K1 0, served K2 0 (live K2 1/25); fallback 0;
  - added wait 0 ms.
- **Card turns:** 15 lines.
  - Before assembly, K2 was 5/15. Served K2 was 0/15.
  - **Hand-read of the 5 changed turns:**
    - 2 were damaged. The first version dropped every `?` sentence, including questions the
      prose answers itself. "Pressure in pascals? That's kg/(m·s²). Energy in joules?
      kg·m²/s²." became "That's kg/(m·s²). kg·m²/s².", and "A mixture? No fixed ratio —"
      became "No fixed ratio —".
    - 1 left the closing `**` of a dropped bold question ("at 0.**").
    - 2 were correct: a re-typed card question, and a hanging second question.
- **Fix:** drop only questions to the learner (hanging, or a confirm-back). A word-less
  fragment goes with the sentence before it. All four production shapes are now unit tests.

### 15.1 Shadow result and decision (2026-10-03, deploy `7defba5`)

- **Implementation:**
  - `assembleQuestionTurn` (`questionAssembly.ts`): drops a verdict on an ungraded question,
    keeps at most one question back, and never sends a stub;
  - its own switch `TURN_ASSEMBLY_QUESTION_MODE`, shadow by default;
  - every learner question logs `[assembled-question]`. One with a card on screen is logged
    for its checks only, since the attach assembler owns that text.
  - Tests: `questionAssembly.test.ts` and `questionAssemblyRoute.test.ts`, both failing first.
- **Sample:** **52 learner-question turns** (17 with a card on screen), from `QA_ASK` runs
  across physics, mathematics, chemistry, biology and English, on disposable accounts.
- **Live** (the model's reply as served):
  - stub 0/52;
  - verdict on a question 0/52;
  - two or more questions back 1/52.
- **Assembled:** changed 1/52.
  - Hand-read of that one turn: it cut "Same work?" from the contrasting pair "Same work?
    Same power?" (`phys.mech.power`). The learner loses half of a coherent question. **Not a
    gain.**
- **Decision (DoD 3: learner questions may stay model-written if shadow shows no gain):**
  learner questions **stay model-written**, and `TURN_ASSEMBLY_QUESTION_MODE` stays unset
  (shadow).
  - The live defect rates are at the floor the checks can see. The only assembler action seen
    made a reply slightly worse.
  - The shadow line stays on.

---

## 16. Phase 4 — removing repairs (analysis, 2026-10-03)

**Rule (owner, DoD 4):** a repair is deleted only when its log tag shows 0 firings over at least
300 served turns. Its regression test is then rewritten against the assembler. Each deletion is
its own commit.

**What "firing" means under serve.** Every repair still runs on the live draft, before the serve
decision, because the slot result arrives after them. On a graded turn whose assembled text is
served, a repair's output is discarded. Its tag still fires, but the firing has no effect.

**Measured on the first 68 served graded turns** (windows 1–3; tags in the same request as
`[assembled-turn] served: assembled`):

| Tag | Turns | Effect on what the learner got |
| --- | --- | --- |
| `gate-contract` | 21 | none (live draft discarded) |
| `stub-repair` | 4 | none, and each one cost an extra model call |
| `answer-leak` | 2 | none |
| `stale-question` | 1 | none |
| `topic-drift` | 1 | none |

**Not deletable, by the rule as written:**
- **CL-29, the completing-turn row rewrite.** It runs on every completing turn by design.
  Save-once (§6) now does the same write at the end of the turn. But save-once goes through
  `boundedDbCall`, which refuses to start a write near the route deadline. CL-29 runs
  mid-turn, with more budget. Deleting it would reopen the CL-29 defect on deadline-pressed
  turns, so it stays: superseded in the common case, kept as the earlier write.
- Every repair that also acts on **non-graded** turns (`gate-contract`, `stub-repair`,
  `answer-leak`, `topic-drift`, and the visual repairs). They fire on teaching and card turns
  that serve live text, so their firings are not 0.

**Candidates once 300 served graded turns exist with 0 serve fallbacks:** repairs that act on
graded turns only. Today that is `stale-question` (the previous answer quoted on the next
item, R2). A fallback turn (assembly failed, live served) would then lose it. That is the
trade Phase 4 accepts, and the fallback rate decides it: 0 of 375 so far (307 shadow + 68
serve).

### 16.1 Phase 4 verdict at 307 served graded turns (2026-10-03)

**Measured:** 366 chat requests carried a served-assembled graded line, and 338 served live
text (card, question and teaching turns). Counts are de-duplicated requests from every runtime
log window.

| Repair tag | Fired on served-assembled turns (output discarded) | Fired on live-served turns | Acts on |
| --- | --- | --- | --- |
| `gate-contract` | 161 | 146 | every turn type |
| `visual-acknowledgement` | 45 | 30 | every turn type |
| `eng-d11` | 31 | 2 | every English turn |
| `stub-repair` | 21 | 2 | gate-contract and confirm-back stubs, any turn |
| `mcq-reoffer-unbacked-confirmation` | 0 | 17 | re-offer turns (not graded) |
| `remediation-grounding` | 0 | 16 | remediation turns |
| `answer-leak` | 9 | 5 | every card turn |
| `stale-question` | 2 | 0 | **graded correct taps only** |
| `topic-drift`, `figure-reference` | 1 each | 0 | every turn type |

**Deleted: none.** Reasons, by rule:
- **The rule: 0 firings over at least 300 served turns.** No repair the assembler supersedes
  reaches 0. Repairs run on the live draft before the serve decision (§16), so their tags keep
  firing even when their output is discarded.
- **`stale-question` is the only repair that acts on graded turns alone.** Every firing (2/2)
  fell on a served-assembled turn, so it changed nothing a learner saw. It cannot reach 0
  firings by the rule while it runs before assembly.
  - Its only remaining protection is the serve fallback, and that has been **0/316** (0/623
    counting the shadow period).
  - It was also extended twice today by another session (`c414621`, `1d3247c`) on the same
    shared `main`. Deleting code under active work in a parallel session is a coordination
    call, not one for this loop.
- **Every other repair fires on live-served turns** (card, teaching, question), where it still
  protects the learner. Not deletable.
- Repairs with 0 firings in every window (`empty-reply-net`, `completion-claim`,
  `claim-challenge`, …) guard rare failures on paths the assembler does not cover. 0 firings in
  sampler traffic does not show they are unneeded.

**What would make Phase 4 deletions possible (recommended next step, not done):**
1. Run assembly before the graded-only repairs.
2. Skip `stale-question` and the graded branch of `stub-repair` when the assembled turn will
   be served. That also saves their regeneration calls: about 23 extra model calls over 307
   graded turns.
3. Their tags then measure firings on the new path, and a deletion can follow the rule.
