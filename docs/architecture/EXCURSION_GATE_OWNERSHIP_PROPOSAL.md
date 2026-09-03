# Excursion vs. the Mastery Gate — design proposal

**Status:** **APPROVED AND SHIPPED** — R1-R4 implemented in `98939a0`, deployed
and production-verified 2026-09-02 (§12). The RETARGET DESIGN (§6) is
permanently withdrawn. Fuzzy sub-topic containment (§5-R3) was NOT implemented
and remains held pending measurement.
**Date:** 2026-09-02 · **Revision 4** (r3 + the sign-off, the R4 ruling, and the
production-verification record)
**Scope:** runtime teaching loop only. No Educational Brain, KG, curriculum,
authored content, mastery semantics or grading change is proposed.
**Evidence:** the 2026-09-02 real-account mystery-student run (6 lessons:
physics ×2, chemistry ×2, english ×2), measured three independent ways —
production Vercel runtime logs filtered by sessionId, production Postgres
(`spine_events`, `asset_identity`, `probe_assets`), and offline reproduction
driving the real modules with the verbatim transcript.

### Revision history
- **r1** proposed *retargeting* the gate to the excursion's concept.
- **r2** withdrew that after adversarial review; corrected three other items.
- **r3** (this) is the consolidated, consistent document. It also fixes a
  labelling hazard in r2: r1 called the retarget design **"Change C"**, and r2
  reused the letter *C* for an adopted change. **One scheme is used here:
  adopted changes are R1-R4; the withdrawn design is called the RETARGET
  DESIGN throughout and has no letter.**

> **If you are looking for "Option C" / "Change C":** that is the RETARGET
> DESIGN. It is **permanently withdrawn** — see §6. It is not deferred, not
> conditional, and must not be revived without the fold problem in §6 being
> solved first.

---

## 1. The decision being asked for

> **Should an active excursion continue to disable authored-probe attachment?**

Today it does, unconditionally, for up to `MAX_EXCURSION_TURNS = 40` turns.

Revision 1 answered *"no — retarget the gate."* That answer was wrong (§6).

**This revision answers: the block itself stays.** What must change is that
excursions *open when they should not*, *cannot close when they should*, and are
*allowed to run far too long*. The remedy is four exact changes and one
permanent deletion — smaller, duller and safer than r1.

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

### 2.3 MEASURED vs UNMEASURED — read this before quoting any number

**MEASURED** (production, reproducible):
- the two deadlocks above, turn by turn, with byte-level confirmation
- offline reproduction of both against the real modules with verbatim messages
- 5 authored probes existed and 0 attached in Bohr
- asset contract by subject: physics 261/261, chemistry 186/186,
  **english 0/216**, mathematics 0/47

**UNMEASURED — and must not be asserted:**
- **how often real learners hit this deadlock.** Excursion transitions are
  log-only and cannot be derived retrospectively.
- The contrast in §2.1 (the two lessons that mastered never opened an
  excursion) is **n=2 vs n=2**, uncontrolled for turn count, message length and
  learner style. The tester deliberately probed and challenged, and therefore
  rarely produced the satisfaction signal (`"ok, got it"`) that closes an
  excursion — a signal ordinary learners emit constantly. **The tester's style
  may itself be the reason the deadlocks ran 5-7 turns.**

No claim in this document asserts a population frequency for the excursion
failure. §9 step 0 exists to obtain one.

### 2.4 Prevalence of the ADJACENT grading failure  *(MEASURED)*

30 days of production answers (`spine_events`, `AnswerObserved`):

| outcome | count | share |
|---|---|---|
| ungradeable (`correct: null`) | 166 | **4.4%** |
| graded correct | 3,042 | 80.9% |
| graded wrong | 554 | 14.7% |
| **total** | **3,762** | |

This measures the compound answer-and-question turn ("1 — the net force. But
can we do a numbers problem?"), which is **not** part of this design (§13-a).
It is recorded here only to keep r1's over-weighting of it from recurring: it
is ~4% of answers, not the dominant failure.

---

## 3. Steelman: what the current design protects

`notExcursion` bundles protections that have different owners.
*(Labelled P1-P3 to avoid collision with the changes in §5.)*

| # | Protection | Who owns it today |
|---|---|---|
| P1 | Don't **spend** a scarce, never-re-asked authored probe on a turn where the learner's attention is elsewhere | `notExcursion` (this term) |
| P2 | Don't **credit** a detour answer to the lesson's mastery | the fold — see below |
| P3 | Don't **drill past a question** | arbitration (`LEARNER_REQUEST` > `TEACH`), CUE rule D4b |

**P2's owner is stronger than r1 realised, and it is what killed r1's design.**
`route.ts` L6836:

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
| Keep patching exits as found | status quo | Rejected — six iterations; each narrowing produced the next gap (§8) |
| Make the already-written exits reachable | → **R1** | **Adopt — strongest item** |
| Bound the excursion (`MAX_EXCURSION_TURNS` 40 → 6) | → **R2** | **Adopt** — promoted from "palliative" |
| Refuse a self-excursion (`target === lesson`) | → **R3** | **Adopt**, exact form only |
| Scope the ungraded-question withhold | → **R4** | **Adopt**, narrowly |
| **RETARGET the gate to the excursion's concept** | r1's headline | **PERMANENTLY WITHDRAWN — §6** |
| Delete `notExcursion` entirely | — | Rejected — P1 is real |

---

## 5. Recommended design — four exact changes (R1-R4)

Each is independently shippable and independently reversible.
**None widens a predicate. None adds new grading behaviour. None can bank a
false grade.**

### R1. Make the two exits that already exist reachable  *(strongest item)*

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

**This invents no predicate, widens no detector, adds no state, and changes no
grading.** It only lets already-agreed exits fire.

### R2. Bound the excursion — `MAX_EXCURSION_TURNS` 40 → 6

**Rationale.** A detour that has not resolved in six turns is not a detour. The
constant is currently 40, which is longer than most whole lessons; in both
measured deadlocks the safety valve was ~35 turns away and therefore played no
part. This change diagnoses nothing — it caps the blast radius of every failure
in this seam, **including ones not yet found**, which is precisely its value
given the unmeasured prevalence in §2.3.

**Trade-offs, stated plainly:**
- *Cost:* a genuinely long, legitimate detour is returned to the lesson at turn
  6 rather than being followed indefinitely. The learner is not abandoned — the
  excursion closes by *returning to the lesson*, which is the anchor it always
  held; and nothing stops them asking again, which re-opens a fresh detour.
- *Benefit:* the worst case for any excursion defect drops from 40 turns to 6,
  bounding the two deadlocks measured here and any not yet identified.
- *Risk of over-tightening:* a value below ~4 would start truncating ordinary
  two-or-three-turn clarifications. 6 leaves headroom above the longest
  legitimate detour observed (5 turns, Newton's Second Law).
- *Reversibility:* one constant, no behavioural coupling, instantly revertible.
- *Why not lower:* 6 is chosen over 4 deliberately — the cost of truncating a
  real detour is a worse learner experience than the cost of two extra blocked
  turns.

### R3. A self-excursion never opens  *(exact, not heuristic)*

Refuse to open an excursion whose target **is the lesson concept**
(`requestedConceptId === lessonConceptId`). An identity comparison, not a
similarity judgement.

**Deliberately NOT included — held, not adopted:** r1 also proposed refusing
when an unresolved TITLE is "covered by" the lesson's description, i.e. lexical
containment. That is a shape test standing in for a semantic judgement — the
exact systemic fault this investigation named elsewhere (`readsAsProse` =
length + first character; `looksLikeAQuestion` = trailing `?`). It would
acquire its own false-positive tail and its own narrowing, continuing the very
pattern §8 identifies as the root problem. **Held pending measurement; not part
of this proposal.**

**Consequence, stated honestly:** the Bohr case (`'emission lines work'`, an
unresolved title, `requestedConceptId === null`) is **not** closed by R3. R3
closes only the resolved self-excursion. Bohr is closed in practice by R1 and
bounded by R2.

### R4. Scope the ungraded-question withhold — `notExcursion` and starvation only

`withholdUngradedGateQuestion` receives
`gateSoughtThisTurn: phaseAllowsProbeHoisted`, computed from phase and move
**only**. It therefore strips the model's question believing *"the gate looked
and found none"*, when in the measured cases the gate **never ran**. Stripping
a good Socratic question because a different subsystem declined is the direct
cause of the content-free hold.

**Explicitly scoped.** r1 proposed consulting `gateDeclinedByPolicyHoisted`.
That is too broad: `gateRefusedOnPolicy()` returns true when **any** term but
`hasMemoryState` is false — including `notClosingTurn` and
`arbitrationAllowsProbe`, which exist precisely to stop questions. Using it
would ship a question on a CLOSING turn and undo
`closingTurnWithholdsQuestion`.

**RULED AND SHIPPED (owner decision, 2026-09-02).** The wording of this section
in r3 was ambiguous about which of two conditions the EXCEPTION covers, and the
implementation stopped on it rather than guess. The ruling:

- **The exception applies to `notExcursion` ONLY.** When the gate was blocked
  before the selector ran, the question is not stripped.
- **Probe STARVATION continues to withhold, unchanged.** When the gate ran and
  found nothing, stripping the ungradeable question is this function's whole
  purpose. `englishAssetContractP1.test.ts` pins that behaviour as correct and
  honest ("no ungradeable question is served and no mastery is fabricated"),
  and the real remedy for starvation is content, not runtime — see §13-e
  (english is 0 of 216 pairs at asset contract).

A generic "declined by policy" condition **must not be used.** Every other
decline reason — `notClosingTurn`, `arbitrationAllowsProbe`, and starvation —
keeps today's behaviour byte-for-byte, pinned by the negative controls in
§7-6 and by `excursionExitsR1R4.test.ts`.

R4 changes *which turns keep the model's own question*. It does **not** change
grading, keys, counters, or what any answer is worth.

---

## 6. PERMANENTLY WITHDRAWN: the RETARGET DESIGN

*(r1's headline; called "Change C" in r1 and informally "Option C". No adopted
change in this document carries that letter.)*

**What it proposed:** while an excursion is active, let the gate attach a probe
drawn from the *excursion target's* pool, on the claim that "credit routing is
unchanged."

**Why it is unsafe — this is the operative reason and it is permanent:**

> **Authored probes would be recorded as ASKED while the excursion FREEZES THE
> FOLD, so the evidence is burned without certification.**

Concretely:
1. `recordMcqAsked()` appends the probe's fingerprint to `mcqAsked`. That list
   is append-only; a spent probe is never re-asked.
2. The fold is a no-op while an excursion is active (§3, `route.ts` L6836) — no
   phase advance, no mastery credit, no counters moved.
3. Net effect: a reviewed, never-re-asked authored probe is **consumed for
   zero evidence**, and is **missing from that concept's pool** when the learner
   later studies it as a lesson. Strictly worse than the status quo.
4. Independently, it violates `certify.ts`'s **D1 (taught before quizzed)** —
   the excursion target is by definition a concept the learner has just named
   and has *not* been taught this session.

**Status: withdrawn permanently, not deferred.** It must not be revived unless
the fold problem is solved first — i.e. unless some component is made an actual
consumer of detour-turn evidence. That is a different and larger design.

**The transferable lesson:** in this runtime, *attaching a question* and
*crediting its answer* are separately owned. Any future design that moves one
must state what happens to the other. r1's diagnosis ("the gate and the
excursion disagree about which concept") was correct; the prescription did not
follow from it, because it fixed which question is asked and ignored where the
answer goes.

---

## 7. Invariants to pin (falsifiable, one test each)

1. A learner naming the lesson's own concept closes an active excursion, even
   when the message also reads as an answer.  *(R1)*
2. A learner asking to be assessed closes an active excursion, however it was
   opened.  *(R1)*
3. No excursion survives more than `MAX_EXCURSION_TURNS` turns, and that
   constant is ≤ 8.  *(R2)*
4. An excursion never opens whose target **is** the lesson concept.  *(R3)*
5. The content-free hold is never served on a turn where the gate was blocked
   by `notExcursion`, or where the gate ran and was starved.  *(R4)*
6. **Negative control:** a CLOSING turn still withholds a question, and an
   arbitration-denied turn still withholds a question. R4 changes neither.  *(R4)*
7. **Negative control:** no authored probe is attached on a turn whose fold is
   a no-op — the invariant the RETARGET DESIGN would have broken.  *(§6)*
8. Regression: the Phase 5 off-curriculum case still opens
   (`"What is thermal conductivity?"` inside Free Body Diagrams).
9. Regression: `turnCountsForLesson()` is unchanged — no detour turn credits
   the lesson.

Replay fixture: the two failing sessions in §2.1, verbatim, as a transcript
test. The current build fails 1-5 on that fixture; that is the acceptance bar.

---

## 8. Why previous fixes did not prevent this

- **The narrowings union to a hole.** `closed-wants-practice` → scoped to
  knowledge-gap. Option-A's re-offer notice → excluded questions, then I4
  further excluded requests and distress. **Each exclusion was individually
  justified by a real measured harm** (the "tap a choice" lead-in firing at a
  confused learner mid-remediation; a hedge banked as a committed answer).
  Their union is a common learner shape nothing handles.
  Note the asymmetry that argues *against* simply widening them back: silence
  costs a turn and is recoverable; a false grade writes permanent evidence.
  **Every change in §5 is chosen to avoid trading in that direction** — R1
  re-enables agreed exits, R2 is a constant, R3 is an identity check, R4 only
  decides whether the model's own text survives.
- **Ordering beats presence.** `closed-on-lesson` is correct and unreachable.
- **Arbitration never saw it.** `[arbitration] {owner:'TEACH', overridden:[],
  denied:[]}` on the deadlocked turns. Phase 3 arbitrates which *action* owns a
  turn; the excursion is a *state* that removes a capability before arbitration
  is consulted. Phase 3 cannot arbitrate a term it does not own.

---

## 9. Rollout and measurement

**Step 0 — measure prevalence (§2.3).** Add an excursion-lifecycle counter
(opened / closed-by-reason / turns-held) before or alongside behaviour changes.
The tester's sample is n=4 and may be unrepresentative. If the population rate
proves negligible, ship R2 only and stop.

Then **R1 → R2 → R3 → R4**, each measured before the next. Metrics available
today with no new instrumentation:

- `[gate-eligibility] blockedBy:["notExcursion"]` per 100 turns
- `AssistantRendered length: 39` (the hold) per session
- `[gate-assessment] probeFound:false` at CHECK/PRACTICE
- share of graded answers logging `unauthored-key-not-certifying`
- verified-mastery rate on the 60-concept physics harness (existing baseline)

Before/after on the same seed and account. No claim without both numbers.

---

## 10. What this proposal explicitly does NOT change

Mastery/completion semantics · `masteryVerifiedStrict` · the strict counters ·
`unauthored-key-not-certifying` · `gradeMcqAnswer` and every grading rule ·
`turnCountsForLesson` and the excursion fold no-op · the excursion's return
anchor and no-nesting rule · the Phase 5 unresolved-title feature for genuinely
off-lesson topics · CLOSING-turn and arbitration withholding · the Educational
Brain, KG, curriculum, blueprints or any authored content.

---

## 11. Risks

| Risk | Mitigation |
|---|---|
| R1 closes an excursion the learner wanted to continue | "Quiz me" is a request to be assessed; the lesson is the assessable thing. Reversible |
| R2 (6 turns) cuts off a legitimate long detour | The excursion closes by *returning to the lesson*, not by abandoning the learner; the learner can re-ask. Tune on the step-0 counter |
| R3 does not close the Bohr (unresolved-title) case | Acknowledged in §5-R3; R1 and R2 cover it. Do **not** paper over it with a containment heuristic |
| R4 lets through a genuinely ungradeable question | Scoped to two named conditions; §7-6 is the negative control |
| The whole seam is over-fitted to one tester's style | §9 step 0 exists for exactly this; §2.3 forbids asserting a frequency |

---

## 12. Decisions — SIGNED OFF AND SHIPPED (2026-09-02)

All three were approved and implemented in commit `98939a0`, deployed as
`dpl_2NJMD6m8…` on SHA `98939a08`.

1. **Adopt R1-R4, RETARGET DESIGN permanently withdrawn?** — YES. Shipped.
2. **`MAX_EXCURSION_TURNS` 40 → 6?** — YES, 6. Shipped.
3. **Ship immediately and measure alongside?** — YES. Shipped; §9 step-0
   prevalence instrumentation remains outstanding.
4. **R4's scope (the one item implementation stopped on)** — ruled
   `notExcursion` ONLY; starvation keeps withholding. See §5-R4.

### Production verification, 2026-09-02 (deployed app, real account)
| case | result |
|---|---|
| lesson concept named | `transition:'none'`, `notExcursion:true` — no detour, gate live |
| genuine excursion | `transition:'started'` → `phys.mech.acceleration` — feature intact |
| 6-turn bound | `transition:'closed-turn-limit'`; target and figure returned to the lesson |
| finish request mid-detour | `closed-satisfied`; arbitration `owner:'CLOSE'` denied `AUTHORED_PROBE`; `notClosingTurn:false` intact |
| practice request mid-detour | `closed-wants-practice` on a TOPIC-opened detour — impossible before R1.2 |
| answer-shaped turn naming the lesson concept (R1.1) | verified 2026-09-03 on `dpl_9MGjvcXAwR96uNie3SEY97D8BceC`: detour open on `phys.mech.kinetic-energy` (03:10:31 `transition:'started'`, `notExcursion:false`), then `"So linear momentum is just mass times velocity, and it is a vector."` → 03:11:21 `requested:'phys.mech.momentum'`, `transition:'closed-on-lesson'`, `active:false`; next turn 03:12:01 `notExcursion:true` — assessment eligibility restored |
| normal probe path | two distinct authored probes graded correct; `check:1 practice:2`; `verified:true`, lesson COMPLETE |

**Zero content-free holds** across the whole run. The two `gate-contract`
withholds that fired were on non-excursion turns and kept their teaching
(230→193 and 255→203 chars) — R4 did not over-reach.

**Observed, pre-existing, NOT fixed:** `[mcq-reoffer-disambiguation]` fired on
"Ok I am done for today, thanks." The Option-A guard (route.ts ~L8918, commit
`00e53ac`) excludes bare acks, practice requests, questions, `failureState` and
`learnerRequest` — but not `wantsToStop`. Untouched by R1-R4; possibly more
reachable now that probes attach more often. Separate decision.

### Still outstanding from this document
- §9 step 0: excursion-lifecycle prevalence counter (opened / closed-by-reason /
  turns-held). The population rate of this failure remains UNMEASURED (§2.3).
- ~~R1.1's answer-shaped close is pinned offline but was not hit live.~~
  **CLOSED 2026-09-03** — hit live, see the last row of the table above. Three
  earlier attempts were discarded rather than reported: a concurrent session was
  driving the same account, and because `StudentProgress.activeLessonSlug` is
  per-USER, the lesson pointer moved mid-run and the detour closed as
  `closed-lesson-changed` instead. A contaminated run is not evidence.

---

## 13. Out of scope — separate decisions, deliberately not bundled here

Each is real, evidenced elsewhere, and **must be decided on its own merits**.
Bundling any of them into this design would repeat the pattern §8 identifies.

- **(a) Compound-answer grading.** `resolveMcqChoice`'s question precondition
  refuses "1 — the net force. But can we do a numbers problem?" (4.4% of
  answers, §2.4), and the I1/I4 re-offer notice is suppressed for the same
  messages. Any change here touches grading and carries permanent-false-evidence
  risk. **Not part of this design.**
- **(b) Figure-description enforcement.** `stripUnbackedFigureReferences` is
  no-figure-only, so a figure that is present but *wrongly described* is
  unguarded (measured: an acceleration number-line narrated as a "3D
  Newton's-laws simulation").
- **(c) `readsAsProse`.** A shape test admitting KG syllabus fragments into
  learner-facing text (measured verbatim in chemistry).
- **(d) Output Verifier enforcement.** Deployed in `log` mode; the spine records
  `verifier:rejected` + `verifier:log-only-delivered` on over-dense turns.
  Promoting to `enforce` means template substitution and needs its own rollout.
- **(e) English authoring.** **0 of 216 (concept, band) pairs at asset
  contract — no English lesson can reach mastery today** (physics 261/261,
  chemistry 186/186, mathematics 0/47). Content work, not runtime. Probably the
  single highest-impact item on the platform.
- **(f) Profile data contamination.** `profiles.displayName` for a real learner
  account is `'Claude'`, written by an automated QA run. One UPDATE, plus
  stopping QA runs writing to real learner profiles.
