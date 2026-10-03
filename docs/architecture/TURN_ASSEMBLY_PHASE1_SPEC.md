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
