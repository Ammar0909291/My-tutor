# Excursion vs. the Mastery Gate — design proposal

**Status:** PROPOSAL — awaiting owner sign-off. Nothing here is implemented.
**Date:** 2026-09-02
**Scope:** runtime teaching loop only. No Educational Brain, KG, curriculum,
authored content, mastery semantics or grading change is proposed.
**Evidence:** `docs/architecture/` sibling audits + the 2026-09-02 real-account
mystery-student run (6 lessons: physics ×2, chemistry ×2, english ×2), measured
three independent ways — production Vercel runtime logs filtered by sessionId,
production Postgres (`spine_events`, `asset_identity`, `probe_assets`), and
offline reproduction driving the real modules with the verbatim transcript.

---

## 1. The decision being asked for

> **Should an active excursion continue to disable authored-probe attachment?**

Today it does, unconditionally, for up to `MAX_EXCURSION_TURNS = 40` turns.
This document argues it should not, proposes a narrower replacement, and names
the three sub-decisions that need a signature.

This is put as a decision rather than a patch because the last six months of
work on this seam has been a sequence of narrow guards, and **each narrowing
created the gap the next run fell into.** That pattern is itself the finding.

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

Every individual step is behaving as designed. The composition is a deadlock.

### 2.3 The contrast that explains the variance

The two lessons that reached mastery (Newton's First Law, States of Matter)
never opened an excursion. Same code, same build, same account, same session.
**The variable was whether the learner happened to name a topic.**

---

## 3. Steelman: what the current design is protecting

`notExcursion` bundles three genuinely different concerns into one boolean:

| # | Concern | Who actually owns it today |
|---|---|---|
| C1 | Don't **spend** a scarce, never-re-asked authored probe on a turn where the learner's attention is elsewhere | `notExcursion` (this term) |
| C2 | Don't **credit** a detour answer to the lesson's mastery | `turnCountsForLesson()` + the fold |
| C3 | Don't **drill past a question** | turn arbitration (`LEARNER_REQUEST` > `TEACH`) and CUE rule D4b |

C2 and C3 already have their own owners, and those owners work. So the gate
term is only really carrying **C1** — and it pays for C1 by removing the only
source of gradeable questions for up to 40 turns.

**The conflation:** the gate's question is *"may a probe attach?"* The
excursion's legitimate concern is *"about WHICH concept?"* Those are different
questions, and the current answer to the second is "none" rather than "the one
the learner is actually on."

---

## 4. Options considered

| Option | Description | Verdict |
|---|---|---|
| **0** | Keep patching exits as they are found | **Rejected.** Six iterations so far; each narrowing produced the next gap (§7). |
| **1** | Scope the *trigger* only: a non-excursion never opens | Necessary, not sufficient — a legitimate detour still kills assessment. |
| **2** | **Retarget** the gate: probes follow the excursion target | **Recommended** (with 1). Preserves C1 exactly, removes the deadlock. |
| **3** | Delete the term entirely | **Rejected.** Burns the lesson's scarce probes on genuinely off-topic turns — C1 is real. |
| **4** | Lower `MAX_EXCURSION_TURNS` from 40 | Palliative. Shortens the deadlock; does not remove it. Consider as a belt-and-braces default. |

---

## 5. Recommended design — four changes, independently shippable

Ordered by value-per-risk. **A and D alone remove most of the measured harm.**

### A. A "detour" to the lesson is not a detour  *(kills the Bohr class outright)*

In `decideExcursion`, before opening: refuse to open when the target is the
lesson itself, or is a sub-topic of it.

- Resolved concept: `requestedConceptId === lessonConceptId` already has a
  branch (`closed-on-lesson`) — see B for why it is unreachable.
- **Unresolved title (the Bohr case, currently unguarded):** do not open when
  the title's content words are covered by the lesson concept's own
  title/description, or by the lesson's immediate KG neighbourhood.

Owner: `excursion.ts`. Does **not** change what an excursion does once open, the
return anchor, or the unresolved-title feature for genuinely off-lesson topics
(`"What is thermal conductivity?"` in a Free-Body-Diagrams lesson still opens —
that is the case Phase 5 was built for and it stays).

### B. Make the two exits that already exist reachable

Both are written, correct, and currently dead for an answering learner:

1. `looksLikeAnswer` (L400) short-circuits **above** `closed-on-lesson` (L415),
   so a learner who answers can never close an excursion — *measured*: the
   Newton's-Second-Law log shows `requested:'phys.mech.newtons-second-law'`
   (the lesson's own concept) with `transition:'continued'`. Move the
   on-lesson check above the answer-hold.
2. `closed-wants-practice` is gated on `state.openedAsKnowledgeGap === true`.
   Its own code comment documents this exact symptom measured on 2026-09-01;
   the fix shipped scoped to knowledge-gap detours only. My literal *"Can you
   give me one more practice question to check I've got it?"* could not close a
   topic-opened excursion. Un-scope it.

### C. Retarget the gate instead of disabling it  *(the actual decision)*

Replace the boolean `notExcursion` with a **target choice**:

- Excursion active **with a resolved concept** → the gate may attach a probe
  **for the excursion target**, selected and excluded from that concept's own
  pool. C1 is preserved exactly: the lesson's probes are not spent.
- Excursion active **with an unresolved title** → attach nothing (no authored
  probe can exist for a concept the curriculum does not have). This is the
  honest Phase 5 stance — the same reason such an excursion draws no figure.
- Credit routing is **unchanged**: `turnCountsForLesson()` still governs whether
  anything reaches the lesson's ladder. A detour answer does not become lesson
  mastery.

### D. The withhold must key on what the gate *did*, not on what the phase *allowed*

`withholdUngradedGateQuestion` is passed
`gateSoughtThisTurn: phaseAllowsProbeHoisted` — computed from phase and move
**only**. It therefore strips the model's question believing *"the gate looked
for a probe and found none"*, when in the measured cases the gate **never ran**
(it was refused on policy). Stripping a good Socratic question because a
*different* subsystem declined is the direct cause of the content-free hold.

The needed signal already exists and is already hoisted:
`gateDeclinedByPolicyHoisted` (`route.ts` L4108, via
`gateRefusedOnPolicy(gateTerms)`). The withhold simply does not consult it.

**This is the smallest, highest-value change in the document** and it is
independent of the excursion decision: it also fixes the English case, where the
hold fired because the probe pool was genuinely exhausted at 2-of-3.

---

## 6. Invariants to pin (falsifiable, one test each)

1. An excursion never opens whose target is the lesson concept, or whose
   unresolved title is covered by the lesson concept.  *(A)*
2. A learner naming the lesson's own concept closes an active excursion, even
   when the message also reads as an answer.  *(B1)*
3. A learner asking to be assessed closes an active excursion, however it was
   opened.  *(B2)*
4. While an excursion with a resolved target is active, an authored probe may
   attach — and it is drawn from the **target's** pool, never the lesson's.  *(C)*
5. `turnCountsForLesson()` is unchanged: no detour turn credits the lesson.  *(C)*
6. The content-free hold is never served on a turn where the gate was refused on
   policy rather than starved of probes.  *(D)*
7. Regression: the Phase 5 off-curriculum case still opens
   (`"What is thermal conductivity?"` inside Free Body Diagrams).  *(A)*

Replay fixture: the two failing sessions above, verbatim, as a transcript test.
The current build fails invariants 1-4 and 6 on that fixture; that is the
acceptance bar.

---

## 7. Why previous fixes did not prevent this

Stated plainly, because it is the reason this is a design decision and not a
seventh guard:

- **The narrowings union to a hole.** `closed-wants-practice` → scoped to
  knowledge-gap. Option-A's re-offer notice → excluded questions, then I4
  further excluded requests and distress. Each exclusion was individually
  justified by a real false positive; their union is a large, common learner
  shape that nothing handles.
- **Ordering beats presence.** `closed-on-lesson` is correct and unreachable.
- **Arbitration never saw it.** `[arbitration] {owner:'TEACH', overridden:[],
  denied:[]}` on the deadlocked turns. Phase 3 arbitrates which *action* owns a
  turn; the excursion is a *state* that removes a capability before arbitration
  is consulted. Phase 3 cannot arbitrate a term it does not own.
- **Enforcement is off.** The Output Verifier ran in `log` mode
  (`[affirm-guard-scope] {outputVerifierFlag:true, verifierMode:'log'}`) and
  the spine records `verifier:rejected` + `verifier:log-only-delivered` on the
  over-dense turns. Detection is good; nothing acts on it. Deliberate
  (`readVerifierMode`: the master flag implies `log`, never `enforce`) — and
  worth revisiting separately, not here.

---

## 8. What this proposal explicitly does NOT change

Mastery/completion semantics · `masteryVerifiedStrict` · the strict counters ·
`unauthored-key-not-certifying` · `gradeMcqAnswer`'s refusal to guess ·
`turnCountsForLesson` · the excursion's return anchor and no-nesting rule ·
the Phase 5 unresolved-title feature for genuinely off-lesson topics ·
the Educational Brain, KG, curriculum, blueprints or any authored content ·
`MAX_EXCURSION_TURNS` (unless Option 4 is separately approved).

---

## 9. Rollout and measurement

Ship **D**, then **A+B**, then **C** — each independently, each measured before
the next. Metrics available today with no new instrumentation:

- rate of `[gate-eligibility] blockedBy:["notExcursion"]` per 100 turns
- rate of `AssistantRendered length: 39` (the hold) per session
- `[gate-assessment] probeFound:false` at CHECK/PRACTICE
- share of graded answers logging `unauthored-key-not-certifying`
- verified-mastery rate on the 60-concept physics harness (existing baseline)

Before/after on the same seed, same account. No claim without both numbers.

---

## 10. Risks

| Risk | Mitigation |
|---|---|
| A's sub-topic test is too broad and suppresses legitimate detours | Invariant 7 is the regression test; start with a conservative containment test (title/description/direct KG neighbours only) |
| C spends the *target's* probes on a learner who leaves immediately | Same exposure the lesson already accepts for its own probes; bounded by the target's own pool |
| B2 closes an excursion the learner wanted to continue | "Quiz me" is a request to be assessed; the lesson is the assessable thing. Reversible if measured wrong |
| D lets through a genuinely ungradeable question | It only restores the model's turn where the gate never looked; the pool-exhausted path is untouched |

---

## 11. Open decisions requiring a signature

1. **Adopt Option 2 (retarget) over Option 3 (delete) or Option 0 (keep patching)?**
   — recommended: yes.
2. **Should an unresolved-title excursion attach nothing (proposed) or be
   prevented from opening at all when the lesson has authored probes?**
   — recommended: attach nothing; keep the feature.
3. **Lower `MAX_EXCURSION_TURNS` from 40 as belt-and-braces?**
   — recommended: yes, to ~8, independently of the above.

Separate from this document, and the two highest-impact items overall:
**english is 0 of 216 (concept, band) pairs at asset contract — no English
lesson can reach mastery today** (physics 261/261, chemistry 186/186,
mathematics 0/47); and `profiles.displayName` for a real learner account is
`'Claude'`, written by an automated QA run.
