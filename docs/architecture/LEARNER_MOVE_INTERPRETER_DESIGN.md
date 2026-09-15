# The Learner-Move Interpreter — design brief

**Status:** DESIGN ONLY. No runtime code was written or changed. Four temporary measurement
files were created under `src/tests/`, run, and deleted; nothing else in the tree was touched.

**Scope:** `docs/architecture/PHYSICS_TEACHER_MIGRATION_ARCHITECTURE.md` §4.3.
`docs/architecture/TUTOR_REMEDIATION_PLAN.md` §2 Item 4.2.

**Date:** 2026-09-15. **Branch:** `main`. **Measured against:** `f0e1acb`.

---

## 0. Verdict

The central question was: **can a closed-taxonomy learner-move interpreter be built by
composition over the existing detectors — deleting nothing — rather than by reimplementing their
logic from a clean taxonomy?**

**Yes — and the strongest evidence is that it has already been done three times in this
repository, by composition, and is live in production today.** What does not exist is a *fourth*
classifier. What does not exist is any type connecting the three that do.

But the answer comes with two firm rejections and one sharp narrowing, each independently
sufficient:

1. **§4.3's Layer 2 — "constrained classifier … the open question, the objective, the last two
   turns, must return spans" — is a second model call making a decision.** The Educational Brain
   Bible states the governing rule verbatim: *"any design that requires a second LLM call to make
   a **decision** (as opposed to render text) is **rejected on sight**"* (Permanent Rule 9,
   `EDUCATIONAL_BRAIN_BIBLE.md` L85-88). This is not a judgement call and not mine to overrule.
2. **§4.3's taxonomy is single-label, and single-label is measurably lossy.** Across a 62-message
   corpus of real phrasings harvested from this repo's own detector test suites, **56% fire more
   than one detector**, and on the 28-message cross-layer corpus the multi-label reading carries
   more than one label on **6 of 28 (21%)**. `readTurnIntent`'s own docblock already refuses to
   collapse them, with a stated reason and a worked example. A single-label taxonomy would have
   to discard, on one turn in five, information the runtime currently reads at 27 separate sites.
3. **The narrowing:** the interpreter's real surface is **13 grep-visible detectors, not 63 or
   71**. The remaining 58 read the tutor's text, a feature flag, or session state — they are not
   in scope and never were. Objection 9.5's arithmetic is measuring the wrong set (§2).

So: **PROCEED, with the scope inverted.** Not "one classifier with a closed output space", but
**one reconciliation layer with a closed output space, computed by folding the readings that
already exist.** It calls a model zero times, reimplements zero regexes, deletes zero detectors,
and its taxonomy is multi-label with a first-class `UNINTERPRETABLE`.

This is the same trade the Turn Contract made — representation over rewrite — and it is
available for the same reason: the knowledge is already in the code, correctly, and the defect is
that nothing names it in one place.

---

## 1. Re-derivation with my own methodology

The handoff supplied three figures. All three reproduce exactly against `f0e1acb`:

```
grep -oE "^export function (is|detect|should|has)[A-Za-z]+" \
  src/lib/teaching/*.ts src/lib/understanding/*.ts | wc -l      → 71
grep -rE "^\s*(export\s+)?const\s+\w+_RE\s*=" \
  src/lib/teaching/*.ts src/lib/understanding/*.ts | wc -l      → 89
wc -l src/app/api/learn/chat/route.ts                            → 11981
```

Turn Contract state, for context on what precedent is available:

```
grep -cE "^\s*(let|const)\s+\w*Hoisted\b" src/app/api/learn/chat/route.ts   → 115
```

116 at design time, 115 now. `f0e1acb`'s own commit message states the reason: *"99 of 116 appear
[in the compile-input construction] by name and are therefore structurally retained by the
architecture itself."* The Turn Contract shipped as a **pure addition** — nine batches, one
deletion. That is the precedent this design is asked to match, and it is a good one.

---

## 2. What objection 9.5 is actually counting

The grep that produces 71 is wrong in **both directions**, and the correction is the single most
important number in this brief.

### 2.1 Over-broad: 58 of the 71 are not about the learner's message at all

Every one of the 71 signatures was extracted and partitioned by what it actually reads:

| Bucket | Count | Examples |
|---|---:|---|
| **LEARNER MESSAGE** | **13** | `detectFailureState`, `detectLearnerRequest`, `isBareAcknowledgement`, `detectLearnerQuestion`, `isClaimChallenge`, `detectStatedInability`, `isSatisfactionSignal`, `detectExplicitFinishRequest`, `detectNavigationRequest`, `detectAutonomyRequest`, `isLowSignalAcknowledgement`, `isVerbatimPendingOption`, `isMirrorTurn` |
| TUTOR TEXT | 8 | `detectFillerTurn`, `isEmissionTheoryClaim`, `hasProseMultipleChoice`, `hasResidualMachineTag`, `isPriorKnowledgeProbe`, `isInvertedFieldLineClaim`, `isQuestionAnnouncement`, `shouldSuppressSignalCorrectness` |
| FEATURE FLAG | 3 | `isAttemptCaptureEnabled`, `isAiSceneGenerationEnabled`, `isBrainRuntimeEnabled` |
| STATE / HISTORY / PHASE / COUNTER | 47 | `hasDemonstratedMastery`, `isMasteryGatePhase`, `hasAskedMcq`, `shouldReleaseHeldProbe`, `isNewEpisode`, `hasStalled`, … |

**82% of the set the objection counts is outside the interpreter's scope by construction.** A
learner-move interpreter cannot re-learn `shouldReleaseHeldProbe`'s knowledge, because
`shouldReleaseHeldProbe` does not read the learner's message — it reads a counter.

The same applies to the 89 `_RE` constants: they include the tutor-text guards' regexes
(`asciiDiagramGuard`, `figureReference`, `visionDirectionGuard`, `residualTagSweep`) and the
machine-tag parsers, none of which an interpreter touches.

### 2.2 Under-inclusive: the prefix filter misses real message readers

`^export function (is|detect|should|has)` misses every message reader named otherwise. An
independent scan of **all** of `src/lib/**/*.ts` for exported functions taking a parameter named
`message` / `learnerMessage` / `learnerText` / `utterance` found **48**, including these, all
invisible to the handoff's grep:

`asksForPractice` · `requestedVisualForm` · `isGenuineQuestion` (it lives in
`understanding/readers/`, which the glob `understanding/*.ts` does not reach) · `engagesPendingOptions`
· `resolveMcqChoice` · `gradeMcqAnswer` · `matchTopicRequest` · `matchTopicQuestion` ·
`isTopicQuestion` · `isExplicitTopicRequest` · `isExplicitCorrection` · `isReturnRequest` ·
`looksLikeAnswer` · `extractRequestedTopic` · `namedTopicUnknownTo` · `requestedTopicIdentity` ·
`resolveRequestedConceptId` · `answersProseQuestion` · `classifyConversation` · `readConversation`

**So the honest surface is neither 63 nor 71.** It is roughly **30 genuine learner-message
readers**, of which about a third are *extractors* or *graders* (`resolveMcqChoice`,
`extractRequestedTopic`, `stripAddressTokens`) rather than classifiers, and several are already
**aggregators of the others**.

---

## 3. The primitive already exists — three times

This is the finding that decides the design, and it was not visible from the greps.

### 3.1 `readTurnIntent` — a MULTI-LABEL composition layer

`src/lib/teaching/turnIntent.ts` (194 lines). Its own header states the design this brief was
asked to produce:

> *"This module is the single place the message is READ. It calls the EXISTING detectors — it does
> not reimplement, replace or tune any of them — exactly once each, and hands the results to
> everything downstream. … Consequently this file changes no behaviour. Every consumer receives
> the same value the same detector gave it before, because it IS the same detector call with the
> same inputs — only hoisted to one place and shared."*

It composes six detectors (`detectFailureState`, `isGenuineQuestion`,
`detectExplicitFinishRequest`, `detectLearnerRequest`, `requestedVisualForm`, `asksForPractice`),
records `conflicts` instead of resolving them, and exposes `ambiguous` — a precursor of
`UNINTERPRETABLE`. Read at **27 sites** in `route.ts` across all 8 fields:

```
8 turnIntent.wantsPractice   5 turnIntent.learnerRequest   4 turnIntent.failureState
3 turnIntent.isQuestion      3 turnIntent.ambiguous        2 turnIntent.wantsToStop
1 turnIntent.visualForm      1 turnIntent.message
```

It also documents its own exclusions, and they are the analogue of the Turn Contract's D4
GENERATE→DETECT→REPAIR carve-out that the handoff predicted:

> *"Two raw-text readers could NOT be moved without changing behaviour … `resolveRequestedConceptId`
> needs `excursionLessonConceptId` … `namedTopicUnknownTo` needs the text of the lesson AND of any
> currently-active excursion … Both are state-dependent, not pure text reads."*

### 3.2 `readConversation` → `StudentIntent` — a SINGLE-LABEL closed taxonomy **with the confidence gate already built**

`src/lib/understanding/readers/conversationReader.ts`. `StudentIntent` is a closed 6-member set
(`understanding/types.ts:55`) with an explicit `'unknown'` member, and every value is wrapped in
`Sourced<T>` — **value + source + confidence 0..1**:

```ts
export interface Sourced<T> { value: T; source: ProvenanceSource; confidence: number }
```

Its assignment ladder is literally titled *"Intent ladder — most reliable existing detector first,
heuristics after"*, and it composes, with attributed provenance and calibrated confidence:

```
recoveryKey                 → 'expressing_distress'  src=recoveryGuard          conf=0.9
isBareAcknowledgement       → 'acknowledging'        src=masteryGate            conf=0.85
helpRequestKind !== null    → 'requesting_help'      src=masteryGate            conf=0.8
tentativeAnswer             → 'answering'            src=conversationHeuristic  conf=0.7
isQuestion                  → 'asking_question'      src=conversationHeuristic  conf=0.7
lastAssistantAskedQuestion  → 'answering'            src=conversationHeuristic  conf=0.6
else                        → 'unknown'              src=unavailable            conf=0
```

**§4.3 Layer 3 ("confidence gate") is not a gap. It shipped.** So did §4.3's demand that "the
existing distress/request detectors become features" — except this version keeps their provenance,
which is strictly better than erasing it.

### 3.3 `classifyConversation` → `ConversationDecisionType` — a 12-member single-label closed taxonomy

`src/lib/teaching/conversationDecision.ts`. Header: *"Pure function — no I/O, no side effects, **no
model calls**."* Members: `CONFUSION` · `REPHRASE_REQUEST` · `DIRECT_QUESTION` · `SUCCESS` ·
`FRUSTRATION` · `BOREDOM` · `CONFIDENCE` · `CURIOSITY` · `ACKNOWLEDGEMENT` · `TENTATIVE_ANSWER` ·
`RECOVERY` · `NEUTRAL`. It overlaps §4.3's proposed taxonomy substantially, consumes (3.2)'s
outputs, and resolves precedence with a documented ladder.

**And it contains the single best piece of evidence for objection 9.5 anywhere in the repository —
because it is the one layer that *did* reimplement a detector.** Its own header, verbatim:

> *"This test decides WHICH of the two remediation directives below the model receives, and it was
> a second, narrower copy of exactly the pattern H1 fixed in masteryGate: it recognised
> "don't understand" but not "i not understand", "i cannot understand", "i am not getting it".
> Every learner who wrote their confusion in non-standard English therefore fell through to
> REPHRASE_REQUEST — "the student asked for a different approach" — when what they had actually
> said was "I am lost"."*

A closed taxonomy that re-derived one detector's logic instead of calling it drifted, and the
drift reached learners. That is objection 9.5, demonstrated, in this repo, on this primitive. **It
is the reason this design calls detectors rather than owning patterns** — and it is why §5 rejects
the rewrite shape rather than merely preferring composition.

---

## 4. Four measurements

All four were produced by running the **real modules** through temporary vitest files (created,
run, deleted; see §11). Corpus: real learner phrasings harvested from this repo's own detector
test suites — `turnIntentAuthority`, `recoveryGuard`, `recoveryGuardIntensifier`,
`unresolvedTopicExcursion`, `topicModifierShape`, `excursionExitsR1R4`, `masteryGate`,
`crossSubjectTemporalConnective`, `qualifiedConceptResolution`, `conceptExcursion` — plus the
utterances quoted verbatim inside the detectors' own incident comments.

### 4.1 Detector co-firing: 56% of real messages fire more than one detector

19 message-only detectors × 62 messages:

| detectors firing | messages |
|---:|---:|
| 0 | 5 |
| 1 | 22 |
| 2 | 15 |
| 3 | 18 |
| 4 | 1 |
| 6 | 1 |

**MULTI-FIRE = 35/62 (56%). ZERO-FIRE = 5/62.**

The worst case is the one `detectLearnerRequest`'s own body was rewritten for:

```
6  "I do not understand. Can you show me a picture?"
   failureState, dontKnow, learnerRequest, genuineQuestion, learnerQuestion, topicQuestion
```

All five zero-fire messages are bare answers — `"the anode"`, `"A"`, `"B"`,
`"static friction"`, `"the mole concept"`. They are not a detection gap: an answer is resolved by
`resolveMcqChoice(message, pendingProbe)`, which needs the pending probe. See §4.3.

### 4.2 A single label loses information on one turn in five

Running all three layers over one corpus of 28:

| message | multi-label (A) | `StudentIntent` (B) | `ConversationDecisionType` (C) |
|---|---|---|---|
| `"I am lost"` | `distress:confused` **+** `request:explain_differently` | `expressing_distress` (0.9) | `RECOVERY` |
| `"I do not understand. Can you show me a picture?"` | `distress:dont_understand` **+** `question` **+** `request:diagram` | `expressing_distress` (0.9) | `RECOVERY` |
| `"can you show me a picture?"` | `question` **+** `request:diagram` | `requesting_help` (0.8) | `REPHRASE_REQUEST` |
| `"I'm done for today, but why does it bend?"` | `stop` **+** `question` | `asking_question` (0.7) | `DIRECT_QUESTION` |

**6 of 28 (21%)** carry more than one label. Row 2 is the decisive one: the multi-label reading
keeps `request:diagram`; both single-label readings collapse to distress and **drop the diagram
request** — which is precisely the defect `detectLearnerRequest`'s body documents and fixes:

> *"'I do not understand. Can you show me a picture?' matched the confusion rule first and was
> classified explain_differently, so `purpose` stayed 'explain' and the engine was never asked for
> a figure. The learner had already said HOW to fix the confusion; treating the vaguer half of
> their sentence as the whole of it discards the specific instruction they gave."*

**This is not currently a learner-facing defect** — `route.ts` reads `turnIntent.learnerRequest`
directly, so the diagram request survives at runtime. It is a defect of *representation*: the two
single-label layers cannot express what the multi-label layer knows. Any interpreter that replaced
A with a single label would convert a representation gap into a live regression.

### 4.3 The taxonomy is not a function of the message alone

`namedTopicUnknownTo(message, taughtText)` run against a Free-Body-Diagrams lesson:

```
"What is thermal conductivity?"               → "thermal conductivity"     (a topic question)
"What causes friction?"                       → null                       (friction IS the lesson)
"How does a catalyst work?"                   → "catalyst work"
"What is the answer?"   / "What is my score?" → null                       (task questions)
```

All of these fire the **identical** message-only signature (`genuineQuestion`, `learnerQuestion`,
`topicQuestion`). What separates §4.3's `QUESTION_ABOUT_TOPIC` from `QUESTION_ABOUT_TASK` is the
lesson's own text — and `"What causes friction?"` changes category when the lesson changes. The
same holds for `ANSWER_ATTEMPT`, which needs the pending probe.

**Consequence for the design:** the interpreter must be **two-stage** — a pure message-only fold,
and a state-dependent refinement — for exactly the reason the Turn Contract split into
`TurnContract` (pre-model) and `TurnDelivery` (post-model). `turnIntent.ts` already named this
boundary and declined to cross it.

### 4.4 A live cross-layer inconsistency, found by this analysis

`conversationDecision.ts` records being widened to catch non-standard-English confusion. Its
sibling was not. Running the **exact phrasings its header names** through both layers:

| message | `detectFailureState` | `classifyConversation` |
|---|---|---|
| `"sir i not understand this"` | **null** | `CONFUSION` |
| `"i not understand"` | **null** | `CONFUSION` |
| `"i cannot understand"` | **null** | `CONFUSION` |
| `"i can not understand"` | **null** | `CONFUSION` |
| `"i couldn't understand"` | **null** | `CONFUSION` |
| `"i am not getting it"` | **null** | `CONFUSION` |
| `"i'm not getting it"` | **null** | `CONFUSION` |
| `"not able to understand"` | **null** | `CONFUSION` |
| `"i am very weak in this"` | **null** | `CONFUSION` |
| *control:* `"i don't understand"` | `dont_understand` | `RECOVERY` |
| *control:* `"I am lost"` | `confused` | `RECOVERY` |

**9 of 9.** One layer was fixed; the sibling that feeds the authority ladder was not.

**What this costs, stated precisely and not inflated.** `turnArbitration`'s
`TURN_AUTHORITY_ORDER` is `KNOWLEDGE_GAP > RECOVERY > LEARNER_REQUEST > CLOSE > COMPLETE >
LEARNER_QUESTION > TEACH`. `recoveryKeyHoisted` (= `turnIntent.failureState`) is what claims the
RECOVERY rung. These learners still get help — `detectLearnerRequest` fires
`explain_differently`, so LEARNER_REQUEST (rung 3) claims the turn and remediation happens. What
they do **not** get is the RECOVERY rung (rung 2): the authored recovery script, and the affect
handling that rides with it. It is a **tier** difference, not a silent failure, and it lands on
learners writing in non-standard English.

**Reported, not fixed** — this is a design session, and widening a detector is a behaviour change
requiring its own evidence and its own commit. It is logged as an open finding in §12. What
matters for the design is *how it was found*: by asking one question of two layers at once. A
reconciliation layer asks that question on every turn, automatically.

---

## 5. Why §4.3 as scoped must be rejected

### 5.1 Layer 2 is a second model call making a decision — rejected on sight

`EDUCATIONAL_BRAIN_BIBLE.md` L80-88, verbatim:

> **"Decisions are deterministic. Only the words are generated.**
> Every engine upstream of the AI Router is deterministic, pure (or read-then-pure), and produces
> structured output, not prose. The AI Router is the **only** probabilistic component in the
> entire system (Permanent Rule 9). This is the load-bearing design constraint of the whole
> platform — every ADR's "Selected design" must preserve it, and any design that requires a second
> LLM call to make a *decision* (as opposed to render text) is **rejected on sight**."

§4.3's Layer 2 is a classifier that decides how to read the learner. That is a decision. Its own
cost-control note (*"Layer 2 runs only when the priors are inconclusive and a consequence is
pending"*) concedes it is a provider call and merely bounds its frequency — which is not what
Rule 9 asks. The precedent is on the record: `generateVisualizationCode.ts` is flagged in the
Bible's own engine table as violating Rule 9 and is **off by default**.

### 5.2 Objection 9.5 is correct, and §3.3 is its proof

The objection's claim — that reimplementing detection logic from a clean taxonomy re-learns
production knowledge on learners — is not speculative here. `CONFUSION_RE` is a second, narrower
copy of a masteryGate pattern; it drifted; the drift reached learners; the header says so. One
reimplementation, one incident. §4.3 proposes a taxonomy whose members
(`CONFUSION`/`NOT_KNOWING`/`REQUEST`/`ACKNOWLEDGEMENT`/`STOP`/`DEFERRAL`/`SELF_CORRECTION`/…)
would each need the same decision made again.

### 5.3 Layer 4 (revisability) needs state that does not exist

*"Recorded; a contradicting next turn revises the plan."* An interpretation history is new
per-session state. The Turn Contract's non-goals forbade a DB migration for the same reason, and
this brief keeps that. **Deferred, not designed.**

### 5.4 What survives from §4.3

| §4.3 element | Verdict |
|---|---|
| Closed output space | **KEEP** — but multi-label (§4.2) |
| First-class `UNINTERPRETABLE` | **KEEP** — the single best idea in §4.3; `NEUTRAL`/`'unknown'` are silent fallbacks today, not declared outcomes |
| Layer 1 — exact priors | **ALREADY BUILT** — that is what the 13 detectors are |
| Layer 2 — constrained classifier | **REJECT** — Permanent Rule 9 (§5.1) + objection 9.5 (§5.2) |
| Layer 3 — confidence gate | **ALREADY BUILT** — `Sourced<T>` (§3.2); extend, do not replace |
| Layer 4 — revisability | **DEFER** — new state (§5.3) |
| "`resolveMcqChoice` is not loosened" | **KEEP verbatim** |
| "`engagesPendingOptions` … is exactly the right shape" | **KEEP** — inverted-default is the house rule |
| "existing detectors become features, **not independent authorities**" | **REJECT the second half.** Their authority is where the knowledge lives. Keep them authoritative; make the *composition* the new thing |

---

## 6. The design: `readLearnerMove`

One new pure module, `src/lib/teaching/learnerMove.ts`. It calls existing detectors and folds
their outputs. It owns **no regex, no phrase list, no threshold on text**. Structurally asserted,
the way `turnProgress.test.ts` asserts C1-C4 against its own source.

```ts
/**
 * THE LEARNER-MOVE READING — one closed, multi-label reading of what the
 * learner just did, folded from the detectors that already decide it.
 *
 * ── WHAT THIS IS NOT ────────────────────────────────────────────────────────
 * It is NOT a classifier. It contains no regex, no phrase list, and no
 * text threshold, and `learnerMovePurity.test.ts` fails the build if one
 * appears. Every member below is set from an EXISTING detector's return
 * value. The one reimplementation this repository has on record —
 * `conversationDecision.CONFUSION_RE`, "a second, narrower copy of exactly
 * the pattern H1 fixed in masteryGate" — drifted and reached learners. That
 * is the whole reason this module composes instead of deciding.
 *
 * It is also NOT an authority. `turnArbitration` decides who owns the turn;
 * this decides only what was read. Wiring a precedence rule in here would
 * create a second copy of TURN_AUTHORITY_ORDER, which is the defect Phase 3
 * removed.
 */

/** Closed. Adding a member requires a measured production case, not an argument. */
export type LearnerMoveKind =
  | 'ANSWER_ATTEMPT'        // resolveMcqChoice / looksLikeAnswer — state-dependent (stage B)
  | 'QUESTION_ABOUT_TOPIC'  // isGenuineQuestion + namedTopicUnknownTo — state-dependent (stage B)
  | 'QUESTION_ABOUT_TASK'   // isGenuineQuestion, no named topic outside the lesson
  | 'HELP_REQUEST'          // detectLearnerRequest  (diagram | real_life_example | explain_differently)
  | 'PRACTICE_REQUEST'      // asksForPractice — deliberately NOT a HELP_REQUEST; see turnIntent.wantsPractice
  | 'DISTRESS'              // detectFailureState
  | 'NOT_KNOWING'           // isDontKnowSignal(detectFailureState(...))
  | 'ACKNOWLEDGEMENT'       // isBareAcknowledgement / isLowSignalAcknowledgement
  | 'SATISFACTION'          // isSatisfactionSignal            (wired into no taxonomy today)
  | 'CLAIM_CHALLENGE'       // isClaimChallenge                (wired into no taxonomy today)
  | 'STATED_INABILITY'      // detectStatedInability           (wired into no taxonomy today)
  | 'NAVIGATION'            // detectNavigationRequest         (wired into no taxonomy today)
  | 'AUTONOMY'              // detectAutonomyRequest           (wired into no taxonomy today)
  | 'CORRECTION'            // isExplicitCorrection            (wired into no taxonomy today)
  | 'RETURN_TO_LESSON'      // isReturnRequest                 (wired into no taxonomy today)
  | 'STOP'                  // detectExplicitFinishRequest
  | 'UNINTERPRETABLE'       // see below — a CORRECT outcome, never a fallback

/** One reading, with the detector that produced it and how far it can be trusted. */
export interface LearnerMoveSignal {
  readonly kind: LearnerMoveKind
  /** The exact detector. Reuses understanding/types.ts's ProvenanceSource vocabulary. */
  readonly source: string
  /** 0..1, carried from `Sourced<T>`'s existing calibration where one exists. */
  readonly confidence: number
  /** The detector's own richer return value, unflattened (LearnerRequest, FailureStateKey, …). */
  readonly detail?: string | null
}

export interface LearnerMoveReading {
  readonly message: string
  /** EVERY reading that fired. Ordered by confidence, never truncated to one. */
  readonly signals: readonly LearnerMoveSignal[]
  /** Convenience predicate; never a substitute for reading `signals`. */
  readonly has: (k: LearnerMoveKind) => boolean
  /**
   * TRUE when NOTHING fired — not when the fold "wasn't sure".
   *
   * A first-class, declared outcome. §4.3's own argument, which this repo
   * has already validated once: the visual generator bent LISTS into
   * process_flows until `{"type":"none"}` gave the closed set an exit.
   * `ConversationDecisionType.NEUTRAL` and `StudentIntent.'unknown'` are
   * today's silent fallbacks — they are returned both when nothing fired
   * AND when something fired that the ladder had no rung for. This splits
   * those two.
   */
  readonly uninterpretable: boolean
  /** turnIntent.conflicts, carried through unchanged. Recorded, never resolved. */
  readonly conflicts: readonly TurnIntentConflict[]
  /** turnIntent.ambiguous, carried through unchanged. */
  readonly ambiguous: boolean
  /** Which stage produced this. Stage A is pure; stage B saw lesson/probe state. */
  readonly stage: 'message-only' | 'state-refined'
}
```

### 6.1 Two stages, because §4.3's own categories demand it

```ts
/** STAGE A — pure, message-only. Cacheable. Zero state, zero I/O, zero model calls. */
export function readLearnerMove(intent: TurnIntent, extra: MessageOnlyDetectorOutputs): LearnerMoveReading

/**
 * STAGE B — refine with state the message alone cannot supply (§4.3 of this brief).
 * Splits QUESTION_ABOUT_TASK → QUESTION_ABOUT_TOPIC when a topic outside the lesson is named,
 * and adds ANSWER_ATTEMPT when a probe is pending and the reply engages its options.
 * Monotone: it may ADD or REFINE a signal, never remove one.
 */
export function refineLearnerMove(
  reading: LearnerMoveReading,
  state: { pendingProbe: TutorMCQ | null; taughtText: string | null; lessonConceptId: string | null },
): LearnerMoveReading
```

`refineLearnerMove` calls `namedTopicUnknownTo`, `engagesPendingOptions` and `looksLikeAnswer` —
unchanged, and **never `resolveMcqChoice`**, whose strictness is untouched and whose output
remains grading's sole input.

### 6.2 The confidence gate

Not a new mechanism. `Sourced<T>`'s existing calibration is carried through unchanged
(recoveryGuard 0.9, masteryGate 0.85/0.8, heuristics 0.7/0.6, unavailable 0). The gate is one
declared threshold **read by consumers, applied by none of them privately**:

| Consequence of acting on the reading | Required |
|---|---|
| Irreversible (anything feeding grading or mastery) | **Never.** This reading is not an input to grading. `gradeMcqAnswer` and `masteryVerifiedStrict` are untouched |
| Authority (which `turnArbitration` rung claims the turn) | ≥ 0.8, i.e. a named detector, never a heuristic |
| Steering (prompt blocks, register, pacing) | ≥ 0.6 |
| Below 0.6, or `uninterpretable` | Defer to **exactly today's behaviour** — every existing call site still stands |

The last row is what makes this safe: the interpreter adds a reading. It never removes the path
that exists.

### 6.3 What this is NOT allowed to do

`turnArbitration` already owns precedence and says so — *"This array is the single statement of
precedence in the runtime — there is deliberately no second copy, and every consuming site reads
the verdict rather than re-deriving a private subset of this order."* `LearnerMoveReading` maps to
that vocabulary; it does not rank. A `kind` → authority mapping lives in `turnArbitration`, or
nowhere.

---

## 7. Out of scope — the analogue of the Turn Contract's D4 carve-out

Five families stay exactly where they are and are **not** interpreter members:

| Family | Why it is excluded |
|---|---|
| **Tutor-text guards** (8) — `figureReference`, `asciiDiagramGuard`, `visionDirectionGuard`, `fieldLineSignGuard`, `proseMcqGuard`, `residualTagSweep`, `detectFillerTurn`, `isPriorKnowledgeProbe` | They read what the **tutor** said. A learner-move interpreter has no opinion on them |
| **Graders** — `resolveMcqChoice`, `gradeMcqAnswer` | §4.3's own rule, kept verbatim: not loosened. A false grade writes permanent false evidence |
| **Extractors** — `extractRequestedTopic`, `learnerGroundingText`, `stripAddressTokens`, `requestedTopicIdentity` | They return text, not a category. They *feed* stage B; they are not members of it |
| **Repair passes** — `stripFabricatedAttribution`, `isMirrorTurn`, `stripCompletionOnBareAcknowledgement` | They rewrite the reply. Post-model, and `TurnDelivery`'s territory, not this one |
| **State predicates** (47) | They read counters, phases and history, not the message |

---

## 8. Migration: seven batches

Same discipline as the Turn Contract: one commit each, independently revertable, shadow before
consumption, nothing deleted before every consumer has moved.

| # | Batch | Content | Precondition | Risk |
|---|---|---|---|---|
| **0** | **Module + purity guard, unconsumed** | `learnerMove.ts` (types + both stage functions) and `learnerMovePurity.test.ts`, which **fails the build if the module contains a regex literal, a phrase array, or an import from anything but a detector module**. Zero `route.ts` change | — | none |
| **1** | **Shadow** | Compute stage A + stage B in `route.ts` beside the existing reads; emit one `LEARNER_MOVE={…}` line per turn (the `TURN_EVENT` / `CONTRACT_ASSERT` / `EXCURSION_EVENT` convention). **Read nothing.** No DB write — the 2026-08-31 egress incident is the standing reason | — | none: nothing consumes it |
| **2** | **Agreement assertion, still shadow** | Log a violation when the reading and an existing layer disagree — the §4.4 shape. **Hold here for a real observation window.** This batch's output is the evidence base for every batch after it | Batch 1 landed | none |
| **3** | **Wire the 7 orphan detectors into the reading — still shadow** | `isSatisfactionSignal`, `isClaimChallenge`, `detectStatedInability`, `detectNavigationRequest`, `detectAutonomyRequest`, `isExplicitCorrection`, `isReturnRequest` are today in **no** taxonomy layer (measured §3). Adding them to the *reading* changes no behaviour, because nothing reads the reading yet | Batch 2 quiet | none |
| **4** | **First consumer: telemetry** | `TURN_EVENT` carries `move` from the reading instead of re-deriving. Observability only — a wrong value costs a log line | Batch 2 shows agreement | low |
| **5** | **Second consumer: steering blocks** | Prompt blocks currently keyed on a single detector read `reading.has(...)` instead. Confidence ≥ 0.6. Each must be **provably equivalent**: same boolean, same value, new source | Batch 4 landed | medium — prompt text changes are learner-visible |
| **6** | **Authority inputs — one rung at a time** | The RECOVERY / LEARNER_REQUEST inputs to `turnArbitration` read the reading. Confidence ≥ 0.8. **One rung per commit.** §4.4's gap is *reported here, fixed separately* — widening `detectFailureState` is its own change with its own evidence | Batch 5 landed, one full window quiet | **highest** — authority is what decides the turn |

Nothing deletes `readTurnIntent`, `readConversation` or `classifyConversation`. All three keep
their consumers. If the programme stops after Batch 2, the repository is strictly better off: it
has an instrument that finds §4.4-class inconsistencies automatically, and has changed nothing.

---

## 9. Non-goals

1. **Deletes or weakens no detector and no regex.** Not one. The module is forbidden from
   containing a pattern of its own, and Batch 0's purity test enforces it.
2. **Changes no teaching decision's behaviour.** Batches 0-3 are unconsumed by construction;
   4-6 require provable equivalence per call site.
3. **Does not touch grading, mastery certification, or the K5 verifier.** `resolveMcqChoice`,
   `gradeMcqAnswer`, `masteryVerifiedStrict`, `conceptMasteryVerdict` unchanged.
   `masteryCounterInvariant.test.ts`'s 49,152-state proof must still pass unmodified.
4. **Re-enables no verifier flag.** `ENABLE_OUTPUT_VERIFIER` / `ENABLE_EOS_RUNTIME` stay unset;
   `vAffirm` and `V-CHALLENGE` stay exactly as they are.
5. **Makes no model call.** Permanent Rule 9. The module has no provider import and cannot
   acquire one without failing Batch 0's purity test.
6. **Touches no curriculum, KG, Educational Brain or Blueprint content, in any subject.**
7. **Adds no DB migration, table, column or snapshot key.** The reading is per-request and
   in-memory; shadow output is a log line.
8. **Creates no second precedence order.** `turnArbitration.TURN_AUTHORITY_ORDER` stays the
   single statement.
9. **Does not fix §4.4.** The 9/9 coverage gap is reported as an open finding; widening a
   detector is a behaviour change needing its own commit and its own evidence.
10. **Does not build §4.3's Layers 2 or 4.** Rejected and deferred respectively, with reasons.

---

## 10. Risks

| Risk | Why it is real | Mitigation |
|---|---|---|
| The module grows a regex | Every future incident will want one added "just here" | Batch 0's purity test fails the build. The precedent for this enforcement is `turnProgress.test.ts`'s C1-C4 |
| Multi-label pushes the decision downstream | Consumers may each invent their own collapse | The gate table (§6.2) is the only declared collapse, and `turnArbitration` owns precedence. A consumer inventing a private rule is the defect Phase 3 removed — call it out in review |
| A fourth taxonomy in practice | Three exist; adding a reading could make four | Batches 4-6 move consumers ONTO the reading. If the programme stops at Batch 3, the reading is observability only — which is a defensible resting state, not a half-built rewrite |
| Batch 6 changes authority | Authority decides the turn | One rung per commit, ≥0.8, after a quiet window, with §4.4's inconsistencies resolved first |
| Zero traffic weakens the shadow phase | The same objection (TUTOR_REMEDIATION_PLAN §9.2) that weakens the Turn Contract's A6 | Batches 0-3 are also runnable offline against the corpora in §4; state that plainly rather than claiming a production window that may not arrive |

---

## 11. What was verified, and what was not

**Verified** — all against `f0e1acb`, all re-runnable:

* The three handoff figures (71 / 89 / 11981) reproduce exactly.
* The 71 partitioned by input type: 13 / 8 / 3 / 47. Every signature extracted and bucketed.
* The prefix grep is under-inclusive: an independent scan found 48 exported functions taking a
  learner-message parameter, including `asksForPractice`, `isGenuineQuestion`,
  `engagesPendingOptions`, `looksLikeAnswer` — all invisible to it.
* `readTurnIntent` read at 27 sites across all 8 fields in `route.ts`.
* Detector co-firing: 62-message corpus, 35 multi-fire (56%), 5 zero-fire.
* Single-label loss: 6/28 (21%).
* State dependency: `namedTopicUnknownTo` returns a topic for `"What is thermal conductivity?"`
  and `null` for `"What causes friction?"` **against the same lesson text**.
* The §4.4 inconsistency: **9/9**, with two controls passing.
* `TURN_AUTHORITY_ORDER` verified at `turnArbitration.ts:219`.
* Permanent Rule 9 quoted verbatim from `EDUCATIONAL_BRAIN_BIBLE.md` L80-88.
* 7 of 8 sampled message detectors appear in **none** of the three taxonomy modules.
* Turn Contract precedent: 115 `Hoisted` remain of 116; `f0e1acb`'s message states why.

**Method note.** Four temporary vitest files were created under `src/tests/`, executed against
the real modules, and **deleted before commit** (`git status` clean at commit time). They imported
production modules; they modified none. `npm install` was run to obtain the toolchain.

**NOT verified, and not claimed:**

* **No production traffic was inspected**; no live session was driven; no learner was observed.
  Every measurement is the real modules run offline against a corpus assembled from this repo's
  own test suites and incident comments.
* **The corpus is not a random sample of production traffic.** It over-represents phrasings
  someone already found interesting enough to write a test for. The 56% and 21% figures are
  therefore **not** population estimates — they establish that the multi-label case is common and
  load-bearing, not its exact prevalence.
* **The full suite was not run** and `tsc --noEmit` was not run, because no source file was
  changed. An executor must establish both baselines before Batch 0.
* **§4.4's learner-facing cost is reasoned from the arbitration order, not observed.** That
  `detectFailureState` returns null is measured; that the turn therefore lands on LEARNER_REQUEST
  rather than RECOVERY follows from `TURN_AUTHORITY_ORDER` and `recoveryKeyHoisted`'s wiring,
  which I read but did not execute end to end.

---

## 12. Open findings, reported not fixed

1. **`detectFailureState` misses 9/9 non-standard-English confusion phrasings** that its sibling
   layer was explicitly widened for (§4.4). Affects learners writing in non-standard English;
   costs them the RECOVERY rung, not remediation itself. Needs its own commit, its own evidence,
   and a check against `recoveryGuardIntensifier.test.ts`'s existing pins.
2. **`isSatisfactionSignal` has zero consumers outside its own module.** It fires on
   `"got it, thanks"` — which both other layers read as `unknown` / `NEUTRAL`. Either it is dead
   or its result is being lost; the reading would settle which.
3. **`turnIntent.ambiguous`'s docblock says "Nothing else reads it"** beyond `decideExcursion`.
   There are now two consumers (`excursion.ts:345`, `sessionLifecycle.ts:545`). Stale comment.
4. **`ConversationDecisionType.NEUTRAL` and `StudentIntent.'unknown'` conflate two outcomes** —
   "nothing fired" and "something fired that the ladder had no rung for". §4.3's own
   `{"type":"none"}` precedent says these should be distinct.

---

## 13. Relationship to existing documents, and governance

* `PHYSICS_TEACHER_MIGRATION_ARCHITECTURE.md` §4.3 — this is that proposal, **inverted**: the
  closed taxonomy and the first-class `UNINTERPRETABLE` are kept; the classifier that would
  produce them is rejected (Rule 9), and the composition that already produces most of them is
  made explicit instead.
* `TYPED_TURN_CONTRACT_DESIGN.md` §11.1 — its judgement is **confirmed, with its own caveat
  honoured**. It said objection 9.5 "is correct and decisive AGAINST 4.2". It is: §3.3 is the
  in-repo proof. What §11.1 could not know, because it was scoped to 4.1, is that 4.2 has a
  second shape — composition — to which 9.5 does not apply, for exactly the reason §11.1 gave for
  4.1: *"deletes no detector, no regex, and no override."* This design deletes none.
* `TUTOR_REMEDIATION_PLAN.md` §2.0 lists **"DEFERRED: the four primitives (Item 4) — not
  scheduled."** As with the Turn Contract, **producing this brief does not change that.**
  Executing Batch 0 needs a separate owner decision under the standing G1/G2 rule in `CLAUDE.md`.
  What this brief adds to that decision is: the composable form is ~1 module and 7 small batches,
  not the 3-4 sessions Item 4.2 was costed at as a rewrite; and Batches 0-3 deliver an instrument
  that finds §4.4-class defects with zero behaviour change.
* `EDUCATIONAL_BRAIN_BIBLE.md` — **not reopened.** Permanent Rule 9 is applied, not amended. No
  engine's responsibility changes, so no ADR is superseded.
* `PHASE3_ARBITRATION_AUDIT.md` — `turnArbitration` is consumed and deferred to, never
  reimplemented.

---

## 14. Definition of done for the design

- [x] The central question answered explicitly, with evidence, not assumed
- [x] Own methodology used to re-derive the figures; the handoff's grep shown wrong in both
      directions and corrected
- [x] Inventory: every detector partitioned by input type; incident evidence read as primary
      source; overlap and contradiction measured by running the real modules
- [x] Closed taxonomy designed, with `UNINTERPRETABLE` first-class and a confidence gate that
      reuses the calibration already shipped
- [x] Composition mechanism designed, deleting nothing, calling no model
- [x] Out-of-scope families named — the analogue of the Turn Contract's D4 carve-out
- [x] Shadow-first migration reusing the proven `CONTRACT_ASSERT` pattern
- [x] Explicit non-goals, risks, and a separation of verified from unverified
- [x] Open findings reported rather than fixed

**Not done, by design:** no `learnerMove.ts`, no taxonomy implementation, no `route.ts` change,
and no fix for the §4.4 gap. Those are Batch 0 and a separate commit respectively.
