# Excursion vs. the Mastery Gate — design proposal

**Status:** PROPOSAL — awaiting owner sign-off. Nothing here is implemented.
**Date:** 2026-09-02 · **Revision 2** (see §6 — revision 1's headline design was
withdrawn after adversarial review found it would destroy authored probes)
**Scope:** runtime teaching loop only. No Educational Brain, KG, curriculum,
authored content, mastery semantics or grading change is proposed.
**Evidence:** the 2026-09-02 real-account mystery-student run (6 lessons:
physics ×2, chemistry ×2, english ×2), measured three independent ways —
production Vercel runtime logs filtered by sessionId, production Postgres
(`spine_events`, `asset_identity`, `probe_assets`), and offline reproduction
driving the real modules with the verbatim transcript.

---

## 1. The decision being asked for

> **Should an active excursion continue to disable authored-probe attachment?**

Today it does, unconditionally, for up to `MAX_EXCURSION_TURNS = 40` turns.

Revision 1 answered "no — retarget the gate to the excursion's concept."
**That answer was wrong and is withdrawn (§6).** This revision answers: *the
block itself can stay; what must change is that excursions open when they
should not, cannot close when they should, and are allowed to run far too long.*

The remedy is now four exact changes and one deletion — smaller, duller and
safer than revision 1.

---

## 2. What was measured

### 2.1 Two lessons died on this term, in subjects that are 100% at contract

`gateTerms.notExcursion` is a hard AND-term on the authored-probe gate
(`route.ts` ~L4084-4103). While an excursion is active the gate cannot attach a
reviewed probe — regardless of how many exist.

**Newton's Second Law** (`cmtkg1u74…`), 5 authored closed-choice probes available:

| time | learner turn | excursion | gate |
|---|---|---|---|
| 18:44:30 | "Can you give me a real number problem to try?" | none | **eligible**, probe attached |
| 18:45:18 | "1 again. But what's the actual acceleration for that crate…?" | **started** → `phys.mech.acceleration` | blocked |
| 18:45:39 → 18:47:04 | 5 further turns | `continued` (turns 1→5) | `blockedBy:["notExcursion"]` ×5 |

Three of those five turns were served
`"Let's stay with this idea for a moment."` — confirmed at byte level in the
spine (`AssistantRendered length: 39`).

**Bohr Model** (`cmtkgdnkg…`), 5 authored closed-choice probes available:

```
[excursion] lesson: 'chem.atomic.bohr-model'
            requestedTopic:  'emission lines work'
            unresolvedTopic: 'emission lines work'
            transition: 'started'   returnTo: 'chem.atomic.bohr-model'
```

Seven consecutive turns `blockedBy:["notExcursion"]`, and **zero
`[gate-assessment]` lines** — no authored probe was ever offered in a lesson
whose concept holds five. Every question was model-authored; all three grades
logged `unauthored-key-not-certifying`. Correct answers banked no credit.

The learner's message was *"Can we move on to how the emission lines work?"*
Emission lines **are the subject matter of the Bohr-model lesson.** The KG has
no separate node for them, so `resolveRequestedConceptId` returned null and the
Phase 5 unresolved-TITLE path opened a "detour" to the lesson the learner was
already in. The extractor even captured the trailing verb: `emission lines work`.

### 2.2 The full Bohr deadlock, end to end

1. Excursion opens on an unresolved title that is the lesson's own sub-topic.
2. `turnCountsForLesson()` returns `false` while active → **the lesson ladder
   freezes**; the lesson never leaves DEMONSTRATE.
3. `notExcursion:false` → the gate attaches nothing, despite 5 probes.
4. At DEMONSTRATE, `probeWouldCountThisPhase` is false, so `decideModelProbe`
   returns `{serve:true, reason:'phase-does-not-count'}` — deliberately, to
   avoid passive lessons.
5. So the model asks its own questions, they grade against an unauthored key,
   and `unauthored-key-not-certifying` correctly refuses to certify.
6. Result: seven turns of quizzing, zero mastery progress, no way out except an
   explicit "got it, thanks" or 40 turns.

Every individual step behaves as designed. The composition is a deadlock.

### 2.3 The contrast — and its honest limits

The two lessons that reached mastery (Newton's First Law, States of Matter)
never opened an excursion. Same code, same build, same account, same session.

**Do not over-read this.** It is n=2 vs n=2, uncontrolled for turn count,
message length, or learner style. The tester deliberately probed and challenged
and so rarely produced the satisfaction signal that closes an excursion
(`"ok, got it"`), which real learners produce constantly. **The population rate
of this deadlock is UNMEASURED** — excursion transitions are log-only, so it
cannot be derived retrospectively. §9 makes measuring it step 0.

### 2.4 Prevalence of the adjacent grading failure  *(MEASURED)*

30 days of production answers (`spine_events`, `AnswerObserved`):

| outcome | count | share |
|---|---|---|
| ungradeable (`correct: null`) | 166 | **4.4%** |
| graded correct | 3,042 | 80.9% |
| graded wrong | 554 | 14.7% |
| **total** | **3,762** | |

The compound answer-and-question turn ("1 — the net force. But can we do a
numbers problem?") is real and reproducible, but it is ~4% of answers, not the
dominant failure. Revision 1 over-weighted it because the tester types answers
with follow-ups attached.

---

## 3. Steelman: what the current design is protecting

`notExcursion` bundles concerns that have different owners:

| # | Concern | Who owns it today |
|---|---|---|
| C1 | Don't **spend** a scarce, never-re-asked authored probe on a turn where the learner's attention is elsewhere | `notExcursion` (this term) |
| C2 | Don't **credit** a detour answer to the lesson's mastery | the fold — see below |
| C3 | Don't **drill past a question** | arbitration (`LEARNER_REQUEST` > `TEACH`), CUE rule D4b |

**C2's owner is stronger than revision 1 realised, and it is what killed
revision 1's design.** `route.ts` L6836:

```
conversationStateAfterTurnHoisted = excursionActiveHoisted
  ? conversationStateHoisted            // unchanged
  : advanceConversationState(...)
```

> *"Paused means paused — no phase advance, no mastery credit, no counters moved."*

During an excursion the ConversationState fold is a **no-op**. There is no
consumer for probe evidence produced on a detour turn. Any design that attaches
a probe during an excursion therefore banks nothing — while `recordMcqAsked`
still marks it spent, permanently.

---

## 4. Options

| Option | Description | Verdict |
|---|---|---|
| **0** | Keep patching exits as they are found | Rejected — six iterations; each narrowing produced the next gap (§8) |
| **1** | Scope the *trigger*: a self-excursion never opens | **Adopt** (exact form only, §5-A) |
| **2** | Make the already-written exits reachable | **Adopt — now the strongest item** (§5-B) |
| **3** | Retarget the gate to the excursion's concept | **WITHDRAWN — see §6.** Would destroy probes |
| **4** | Bound the excursion: `MAX_EXCURSION_TURNS` 40 → ~6 | **Adopt.** Promoted from "palliative": exact, trivial, reversible, and it bounds unknown-unknowns in this seam |
| **5** | Delete the term entirely | Rejected — C1 is real |

---

## 5. Recommended design — four exact changes

Ordered by value-per-risk. Each is independently shippable and independently
reversible. **None widens a predicate; none can bank a false grade.**

### A. A self-excursion never opens  *(exact, not heuristic)*

Refuse to open an excursion whose target **is the lesson concept**. This is an
identity comparison, not a similarity judgement.

**Deliberately NOT included:** revision 1 also proposed refusing when an
unresolved TITLE is "covered by" the lesson's description — i.e. lexical
containment. That is a shape test standing in for a semantic judgement, which
is the exact systemic fault this investigation named elsewhere
(`readsAsProse` = length + first character; `looksLikeAQuestion` = trailing
`?`). It would acquire its own false-positive tail and its own narrowing. It is
dropped here and may be reconsidered only with measurement behind it.

**Consequence, stated honestly:** the Bohr case (`'emission lines work'`, an
unresolved title) is **not** fully closed by A alone. It is closed in practice
by B and bounded by Option 4.

### B. Make the two exits that already exist reachable  *(strongest item)*

Both are written, correct, and currently dead for a learner who answers:

1. `looksLikeAnswer` (L400) short-circuits **above** `closed-on-lesson` (L415),
   so answering can never close an excursion — *measured*: the
   Newton's-Second-Law log shows `requested:'phys.mech.newtons-second-law'`
   (the lesson's own concept) with `transition:'continued'`. Move the
   on-lesson check above the answer-hold.
2. `closed-wants-practice` is gated on `state.openedAsKnowledgeGap === true`.
   Its own comment documents this exact symptom measured on 2026-09-01; the fix
   shipped scoped to knowledge-gap detours only. The tester's literal *"Can you
   give me one more practice question to check I've got it?"* could not close a
   topic-opened excursion. Un-scope it.

This invents no predicate, widens no detector, and adds no new state. It only
lets already-agreed exits fire.

### C. Bound the excursion  *(Option 4)*

`MAX_EXCURSION_TURNS` 40 → ~6. A detour that has not resolved in six turns is
not a detour. This does not diagnose anything; it caps the blast radius of
every failure in this seam, including ones not yet found.

### D. The withhold must key on WHY the gate declined — narrowly

`withholdUngradedGateQuestion` receives
`gateSoughtThisTurn: phaseAllowsProbeHoisted`, computed from phase and move
**only**. It therefore strips the model's question believing *"the gate looked
and found none"*, when in the measured cases the gate **never ran**. Stripping
a good Socratic question because a different subsystem declined is the direct
cause of the content-free hold.

**Scoped, unlike revision 1.** Revision 1 proposed consulting
`gateDeclinedByPolicyHoisted`. That is too broad: `gateRefusedOnPolicy()`
returns true when **any** term but `hasMemoryState` is false — including
`notClosingTurn` and `arbitrationAllowsProbe`, which exist precisely to stop
questions. Using it would ship a question on a CLOSING turn and undo
`closingTurnWithholdsQuestion`.

D therefore applies **only** where stripping is affirmatively wrong:
- the gate was blocked by `notExcursion`, and
- the gate was starved (`probeFound:false` — the English case).

Every other decline reason keeps today's behaviour exactly.

---

## 6. WITHDRAWN: revision 1's headline design (retarget the gate)

Recorded rather than deleted, because the reason is the most useful finding in
this document.

**Revision 1 proposed:** while an excursion is active, let the gate attach a
probe drawn from the *excursion target's* pool, claiming "credit routing is
unchanged."

**Why it is wrong:**

1. **It would destroy probes for zero evidence.** The fold is a no-op during an
   excursion (§3). `recordMcqAsked` still records the fingerprint, and that
   list is append-only — the probe is spent permanently. Net effect: a reviewed,
   never-re-asked probe is consumed, nothing is banked, and it is missing from
   that concept's pool when the learner later studies it as a lesson. Strictly
   worse than the status quo.
2. **It violates taught-before-quizzed.** `certify.ts` asserts D1 ("the opening
   turn teaches, it does not quiz"). The excursion target is by definition a
   concept the learner has just named and has *not* been taught this session.
3. **The diagnosis was right and the prescription did not follow from it.**
   "The gate and the excursion disagree about which concept" is true; retargeting
   fixed *which question is asked* and ignored *where the answer goes*.

Lesson for the next revision of anything in this seam: in this runtime,
attaching a question and crediting its answer are separately owned, and a design
that moves one must state what happens to the other.

---

## 7. Invariants to pin (falsifiable, one test each)

1. An excursion never opens whose target **is** the lesson concept.  *(A)*
2. A learner naming the lesson's own concept closes an active excursion, even
   when the message also reads as an answer.  *(B1)*
3. A learner asking to be assessed closes an active excursion, however it was
   opened.  *(B2)*
4. No excursion survives more than `MAX_EXCURSION_TURNS` turns, and that
   constant is ≤ 8.  *(C)*
5. The content-free hold is never served on a turn where the gate was blocked
   by `notExcursion`.  *(D)*
6. A CLOSING turn still withholds a question — D changes nothing there.  *(D,
   negative control)*
7. Regression: the Phase 5 off-curriculum case still opens
   (`"What is thermal conductivity?"` inside Free Body Diagrams).
8. Regression: `turnCountsForLesson()` is unchanged — no detour turn credits
   the lesson.
9. Regression: no authored probe is attached on a turn whose fold is a no-op.
   *(the invariant revision 1 would have broken)*

Replay fixture: the two failing sessions above, verbatim, as a transcript test.
The current build fails 1-5 on that fixture; that is the acceptance bar.

---

## 8. Why previous fixes did not prevent this

- **The narrowings union to a hole.** `closed-wants-practice` → scoped to
  knowledge-gap. Option-A's re-offer notice → excluded questions, then I4
  further excluded requests and distress. **Each exclusion was individually
  justified by a real measured harm** (the "tap a choice" lead-in firing at a
  confused learner mid-remediation; a hedge banked as a committed answer).
  Their union is a common learner shape nothing handles. Note the asymmetry
  that argues *against* simply widening them back: silence costs a turn and is
  recoverable; a false grade writes permanent evidence. Every change in §5 is
  chosen to avoid trading in that direction.
- **Ordering beats presence.** `closed-on-lesson` is correct and unreachable.
- **Arbitration never saw it.** `[arbitration] {owner:'TEACH', overridden:[],
  denied:[]}` on the deadlocked turns. Phase 3 arbitrates which *action* owns a
  turn; the excursion is a *state* that removes a capability before arbitration
  is consulted. Phase 3 cannot arbitrate a term it does not own.
- **Enforcement is off.** The Output Verifier ran in `log` mode
  (`[affirm-guard-scope] {outputVerifierFlag:true, verifierMode:'log'}`); the
  spine records `verifier:rejected` + `verifier:log-only-delivered` on the
  over-dense turns. Deliberate (`readVerifierMode`: the master flag implies
  `log`, never `enforce`) — worth revisiting separately, not here.

---

## 9. Rollout and measurement

**Step 0 — measure prevalence first (§2.3).** Add an excursion-lifecycle
counter (opened / closed-by-reason / turns-held) before shipping behaviour
changes. The tester's sample is n=4 and may be unrepresentative of learners who
naturally emit satisfaction signals. If the population rate is negligible,
ship C only and stop.

Then B → C → A → D, each measured before the next. Metrics available today
with no new instrumentation:

- `[gate-eligibility] blockedBy:["notExcursion"]` per 100 turns
- `AssistantRendered length: 39` (the hold) per session
- `[gate-assessment] probeFound:false` at CHECK/PRACTICE
- share of graded answers logging `unauthored-key-not-certifying`
- verified-mastery rate on the 60-concept physics harness (existing baseline)

Before/after on the same seed and account. No claim without both numbers.

---

## 10. What this proposal explicitly does NOT change

Mastery/completion semantics · `masteryVerifiedStrict` · the strict counters ·
`unauthored-key-not-certifying` · `gradeMcqAnswer`'s refusal to guess ·
`turnCountsForLesson` and the excursion fold no-op · the excursion's return
anchor and no-nesting rule · the Phase 5 unresolved-title feature for genuinely
off-lesson topics · CLOSING-turn withholding · the Educational Brain, KG,
curriculum, blueprints or any authored content.

---

## 11. Risks

| Risk | Mitigation |
|---|---|
| B2 closes an excursion the learner wanted to continue | "Quiz me" is a request to be assessed; the lesson is the assessable thing. Reversible |
| C (6 turns) cuts off a legitimate long detour | The detour ends by returning to the lesson, not by abandoning the learner; tune on the step-0 counter |
| D lets through a genuinely ungradeable question | Scoped to two decline reasons; invariant 6 is the negative control |
| A does not close the Bohr (unresolved-title) case | Acknowledged in §5-A; B and C cover it. Do not paper over with a containment heuristic |
| The whole seam is over-fitted to one tester's style | Step 0 exists for exactly this |

---

## 12. Open decisions requiring a signature

1. **Adopt the revised set (A, B, C, D) and treat Option 3 as withdrawn?**
   — recommended: yes.
2. **`MAX_EXCURSION_TURNS`: 40 → 6, or → 8?** — recommended: 6.
3. **Gate the whole package behind step-0 prevalence measurement, or ship B and
   C immediately (both are exact and reversible) and measure alongside?**
   — recommended: ship B and C, measure alongside.

Separate from this document, and the two highest-impact items overall:
**english is 0 of 216 (concept, band) pairs at asset contract — no English
lesson can reach mastery today** (physics 261/261, chemistry 186/186,
mathematics 0/47); and `profiles.displayName` for a real learner account is
`'Claude'`, written by an automated QA run.
