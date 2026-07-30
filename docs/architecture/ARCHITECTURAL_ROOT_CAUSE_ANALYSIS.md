# Architectural Root Cause Analysis — Tutor Max Failure Classes

**Date**: 2026-07-30
**Scope**: The entire `route.ts` chat turn pipeline and its teaching-decision subsystems
**Method**: Full pipeline mapping (22 stages), ownership analysis at every boundary

---

## 1. The Single Architectural Root Cause

**Every seemingly different Tutor Max failure traces to one structural property:**

> **The runtime has no independent verification of the LLM's observation of the learner.**
>
> The LLM is simultaneously the observer (SIGNAL tag), the teacher (response text),
> and the implicit validator (its own text is parsed for compliance) — three roles that
> must be independent for a teaching system to be sound, collapsed into one actor.

This is not a bug. It is a **missing invariant**: the system was designed without the
architectural property that an observer and the actor being observed must be different
entities, or at minimum, the observer's claims must be independently verifiable.

### Why this single cause produces an entire class of failures

Every downstream system in the pipeline is a pure function of the SIGNAL tag:

```
LLM emits <!--SIGNAL correctness="true" ...-->
    │
    ├─► parseSignalTag() extracts correctness/confidence/confusion
    │       │
    │       ├─► advanceConversationState({ signalCorrect: ... })
    │       │       │
    │       │       ├─► phase advances (OBSERVE→DEMONSTRATE→...→TRANSFER)
    │       │       ├─► correctAtCheck increments
    │       │       ├─► correctAtPractice increments
    │       │       └─► consecutiveFailures resets
    │       │
    │       ├─► masteryVerified(state) checks correctAtCheck ≥ 1 && correctAtPractice ≥ 2
    │       │       │
    │       │       └─► gateLessonCompletion() authorizes or strips [LESSON_COMPLETE]
    │       │
    │       ├─► TopicProgress.upsert (score 65 or 25)
    │       │
    │       └─► MistakeRecord.create (if confident + wrong → misconception)
    │
    └─► If LLM OMITS the tag: signalCorrect = null
            │
            ├─► No phase advance (ever)
            ├─► No mastery accumulation (ever)
            ├─► Lesson cannot complete (ever)
            └─► Freeze-breaker fires after N missing signals (RC-D patch)
```

**The LLM is both judge and executor.** When it:
- **Omits the tag**: the lesson stalls permanently (RC-D)
- **Emits correctness="true" on a wrong answer**: mastery advances on false evidence
- **Emits correctness="false" on a correct answer**: the learner is punished for being right
- **Emits confidence="high" on a wrong answer**: writes a MistakeRecord (misconception signal)
  that may be false, altering future teaching strategy

None of these failure modes is detectable by the runtime. There is no second opinion,
no cross-check, no audit trail that compares the LLM's claim against reality.

---

## 2. Missing Invariants

### INV-1: Observer Independence
**Statement**: The entity that observes learner correctness must not be the same entity
that decides what to teach next based on that observation.

**Current violation**: The LLM both grades the answer (SIGNAL) and teaches (response).
Its grading directly determines its next teaching move via the phase ladder.

**Consequence**: The LLM can (and does) game its own grading to produce a smoother
narrative — marking ambiguous answers as correct to avoid disrupting its teaching flow,
or omitting the tag entirely when it cannot decide.

### INV-2: Evidence Requires Source Diversity
**Statement**: Progression evidence (mastery) must come from at least two independent
sources before it can authorize advancement.

**Current violation**: `masteryVerified()` checks `correctAtCheck ≥ 1 && correctAtPractice ≥ 2`,
but ALL three evidence points come from the same source: `teachingSignal.correctness`.
Three data points from one source is one data point, not three.

**Consequence**: A single systematic bias in SIGNAL emission (e.g., the LLM tends to
mark short answers as correct) propagates through all three checks simultaneously.

### INV-3: Structural Compliance ≠ Semantic Compliance
**Statement**: Verifying that the LLM's response CONTAINS a question mark is not
equivalent to verifying that the LLM ASKED a meaningful question.

**Current violation**: `repliesWithQuestion()` checks for `?` in the text (after stripping
code fences). `stanceEnforcement.ts` uses this to verify the LLM complied with an
`ask` move. But "Isn't that interesting?" satisfies the check while being zero-value
as a mastery probe.

**Consequence**: The UNSUPPORTED_EXPLANATION violation can be bypassed by any rhetorical
question, and the runtime has no way to distinguish a genuine mastery probe from a
rhetorical flourish.

### INV-4: Phase Advancement Must Be Monotonically Justified
**Statement**: Each phase transition must be backed by evidence that was not available
at the previous phase.

**Current violation**: `correctAtCheck` and `correctAtPractice` are high-water marks —
they never decrease. But the EVIDENCE feeding them can be systematically biased (the
same LLM, on the same concept, using the same assessment patterns). A learner who gives
the same ambiguous answer three times gets three "correct" signals and mastery, even
though no new evidence was generated.

**Consequence**: The phase ladder and mastery gate give a false sense of rigor. The
thresholds (1 check + 2 practice) are numerically precise but epistemically hollow
when all evidence comes from one judge.

### INV-5: Tag Absence Must Have Bounded Impact
**Statement**: A missing control tag from the LLM must not cause unbounded state
corruption.

**Current violation**: When the SIGNAL tag is absent, `signalCorrect = null`. The
`advanceConversationState()` function treats this as "not failed, not succeeded" —
the phase stays put, no counters change. Over multiple turns, this is indistinguishable
from a permanent stall. The freeze-breaker (`needsSignalRepair()`) exists as a patch
for this, but it fires AFTER the damage (wasted turns, frustrated learner).

**Consequence**: The system's response to "I don't know what happened" is "do nothing
forever" — the worst possible failure mode for a teaching system.

---

## 3. Missing Feedback Loops

### LOOP-1: No Signal Quality Measurement
The system captures the SIGNAL tag but never measures whether its claims are consistent
with observable evidence. Measurable but unchecked:
- Does `correctness="true"` correlate with the learner's subsequent performance?
- Does `confidence="high"` from the SIGNAL correlate with the learner actually being
  confident (e.g., fast response, no hedging)?
- Does `confusion="true"` predict a subsequent recovery event?

None of these feedback paths exist. The SIGNAL is trusted unconditionally.

### LOOP-2: No Phase-Velocity Anomaly Detection
The system tracks `turnsInCurrentPhase` but never acts on it (it is "used to detect
stale teaching loops" per the comment, but no code reads it for enforcement). A learner
stuck at OBSERVE for 15 turns is invisible to any enforcement mechanism.

### LOOP-3: No Cross-Turn Evidence Consistency Check
Turn N's SIGNAL says `correctness="true"`. Turn N+1's response starts with "As we
discussed, you were confused about..." — contradicting the signal. No mechanism detects
or resolves this contradiction.

### LOOP-4: No Mastery-to-Retention Feedback
`masteryVerified()` authorizes completion. But there is no mechanism to check whether
the learner retained the concept in subsequent sessions. The mastery decision is
irrevocable within the session and has no cross-session audit.

---

## 4. Ownership Violations

### OWN-1: LLM Owns Observation Truth (Critical)
**Who should own it**: The server (deterministic code).
**Who actually owns it**: The LLM (via SIGNAL tag).
**Consequence**: The entire evidence chain is advisory, not authoritative.

### OWN-2: LLM Owns Question Quality (High)
**Who should own it**: The server (structural verification that the question tests the
target concept at the target Bloom level).
**Who actually owns it**: The LLM (the server only checks for `?`).
**Consequence**: `stanceEnforcement`'s UNSUPPORTED_EXPLANATION check is structurally
bypassable.

### OWN-3: LLM Owns Teaching Compliance (Medium)
**Who should own it**: The server (verify the response matches the decided move).
**Who actually owns it**: Partially the server (move decision is server-side), partially
the LLM (execution of that move is unchecked beyond `?` presence).
**Consequence**: `decideNextMove()` returns `ask` but the LLM teaches instead, adding
a trailing `?` for compliance. The server cannot tell.

### OWN-4: Dual State Advancement (Medium)
**Who should own it**: One system, writing once.
**Who actually owns it**: Two code paths in route.ts can call `advanceConversationState()` —
the primary path at line ~2747 and a fallback at line ~3460. While guarded by
`conversationStateAfterTurnHoisted` being null for the fallback, this dual-path structure
is fragile: any refactor that changes the hoisted variable's initialization could cause
a double-fold.

---

## 5. Architectural Redesign

### Design Principle
**Move from "trust and parse" to "verify and bound."**

The LLM's SIGNAL tag cannot be eliminated (it is the only input in a text-only channel —
see `foundations/03 §7`'s availability table). But its IMPACT can be bounded:

1. **Bound the damage of a wrong signal** (defensive verification)
2. **Bound the damage of a missing signal** (bounded absence impact)
3. **Create independent evidence where the channel permits** (server-side measurement)
4. **Make ownership explicit and enforceable** (structural separation)

### 5.1 — Signal Verification Layer (New: `signalVerification.ts`)

A pure function that cross-checks the LLM's SIGNAL claim against independently
measurable evidence before allowing it to drive state changes:

- **Response-time verification**: If the learner responded in < 2 seconds to a
  multi-step question, `correctness="true"` is suspicious. Flag (don't override —
  see below) as `verificationStatus: 'SUSPICIOUS'`.
- **Consistency verification**: If the LLM's own response text contradicts its
  signal (e.g., response says "not quite" but signal says `correctness="true"`),
  flag as `verificationStatus: 'CONTRADICTED'`.
- **Bare-content verification**: If the learner's message is extremely short (< 3
  words) and doesn't contain any technical terms or numbers, a `correctness="true"`
  signal is suspicious for CHECK/PRACTICE phases.
- **Phase-appropriate verification**: A `correctness="true"` at PRACTICE must involve
  the learner demonstrating the concept, not just acknowledging. If the learner's
  message shows no work (no numbers, no steps, no reasoning), flag.

**Key design decision**: Verification FLAGS but does not OVERRIDE. A flagged signal
still advances the state (to avoid over-blocking), but flagged evidence does not
count toward mastery. This preserves the teaching flow while requiring clean evidence
for the mastery gate.

### 5.2 — Bounded Absence Protocol (Enhancement to `progressionIntegrity.ts`)

Replace the current "do nothing forever" response to missing signals with a
bounded protocol:

- Turn 1 missing: Normal — continue teaching.
- Turn 2 consecutive missing: `needsSignalRepair()` fires (existing freeze-breaker).
- Turn 3 consecutive missing: **Automatic phase grant** — advance the phase by one
  if the LLM has been teaching (not asking). Rationale: if the LLM taught something
  and the learner engaged with it, the lesson should progress even without a formal
  signal. The phase grant is FLAGGED as `grantedWithoutSignal` so it does not count
  toward mastery.

### 5.3 — Evidence Provenance Tracking (Enhancement to `ConversationState`)

Add a `evidenceQuality` field tracking how each mastery-relevant counter was earned:

- `correctAtCheck` and `correctAtPractice` already exist as numbers.
- Add `verifiedCorrectAtCheck` and `verifiedCorrectAtPractice` — counters that
  increment ONLY when the signal passed verification (no flags).
- `masteryVerified()` continues to use the original counters (teaching flow).
- A new `masteryVerifiedStrict()` uses only verified counters (completion authority).
- Completion authority (`gateLessonCompletion`) switches to `masteryVerifiedStrict()`.

This means: the teaching flow (phase advancement, next-move decisions) is unchanged,
but COMPLETION requires clean evidence. The learner can progress through the phases
with any evidence, but cannot COMPLETE the lesson without verified evidence.

### 5.4 — Turn Parity Observer (Enhancement to route.ts)

A deterministic post-LLM check that compares what the server DECIDED against what
the LLM ACTUALLY DID:

- Server decided `ask` → response must contain a substantive question (not just `?`)
- Server decided `teach` → response should not be primarily questions
- Server decided `show` → response should contain concrete content (not filler)

This is NOT enforcement (that would require re-rendering the turn). It is
**measurement**: a `parityViolation` counter in the snapshot that accumulates
structural evidence of LLM non-compliance. This counter feeds into signal
verification — a high parity-violation rate reduces trust in the SIGNAL.

### 5.5 — Response Contradiction Detector

A deterministic text-analysis function that checks whether the LLM's response text
contradicts its own SIGNAL claim:

- `correctness="true"` but response contains: "not quite", "that's not right",
  "let me correct", "actually", "close but", "almost"
- `correctness="false"` but response contains: "exactly right", "perfect",
  "well done", "that's correct"

When a contradiction is detected, the SIGNAL is overridden by the text evidence.
Rationale: the response text is what the learner sees and what the LLM "meant" —
the SIGNAL tag is an afterthought that the LLM sometimes gets wrong.

---

## 6. Why This Redesign Prevents Future Classes of Bugs

The redesign eliminates the class by making the architectural property explicit:

**Before**: One actor (LLM), three roles (observer, teacher, validator), zero verification.
Any single-point failure in the LLM's observation cascades through the entire pipeline
undetected.

**After**: One actor (LLM) still performs observation (unavoidable in a text channel),
but:
1. Its observations are **cross-checked** against independent evidence (response time,
   text consistency, content analysis)
2. Its observations have **bounded impact** — flagged observations cannot authorize
   completion
3. Its absence has **bounded duration** — missing signals trigger automatic recovery
   within 3 turns, not infinity
4. Its compliance is **measured** — parity violations accumulate as a trust metric

The invariant "no single unverifiable claim can authorize irreversible progression"
is now structurally enforced, not assumed.

---

## 7. Validation Strategy

1. **Unit tests**: Every new pure function (signal verification, contradiction
   detection, bounded absence) is tested with the existing vitest framework.
2. **Integration test**: A multi-turn simulated conversation where the LLM's
   SIGNAL deliberately contradicts its text, verifying that the contradiction
   detector catches it and the mastery gate refuses completion.
3. **Regression tests**: The existing 690+ test suite continues to pass — all
   changes are additive (new fields, new checks), never modify existing logic.
4. **Telemetry**: The new counters (`verifiedCorrectAtCheck`,
   `verifiedCorrectAtPractice`, `parityViolations`, `signalContradictions`)
   are persisted to the snapshot, enabling production analysis of signal quality.

## 8. Regression Strategy

1. **Zero behavioral change for the teaching flow**: Phase advancement, next-move
   decisions, response budgets, recovery guard — all use the SAME evidence path as
   before. Nothing is removed.
2. **Completion gate is strictly TIGHTER**: `masteryVerifiedStrict()` is a subset of
   `masteryVerified()`. Any conversation that completed before will still complete,
   unless the signal was contradicted — which was a false completion anyway.
3. **Bounded absence is strictly BETTER than unbounded stall**: The existing
   freeze-breaker behavior is preserved as-is for turns 1-2. The new turn-3
   auto-grant only fires when the alternative is permanent stall.
4. **All new fields have safe defaults**: Missing fields in persisted state
   default to 0/false, so existing sessions continue without migration.

---

## 9. The Answer

**Q: Why did all of these seemingly different bugs exist?**

**A: Because the architecture lacked the invariant that progression evidence must be
independently verifiable before it can authorize irreversible state changes.**

The SIGNAL tag gave the system a proxy for observation, but the proxy was never
verified, its absence was never bounded, and its contradictions were never detected.
Every bug was a different manifestation of this one missing property:
- RC-D (stall on missing signal): unbounded absence impact
- False mastery: unverified signal driving completion
- Filler turns: LLM non-compliance with server decisions, unmeasured
- Question loops: observation questions repeating because the signal didn't fire
- Hollow advancement: acknowledgements counted as evidence (fixed by bare-ack guard,
  but the STRUCTURAL issue — unverified evidence — remained)

The fix is not another guard for another symptom. The fix is the invariant itself:
**verify before you trust, bound what you cannot verify, measure what you cannot bound.**
