# The Typed Turn Contract — design brief

**Status:** DESIGN ONLY. No runtime code was written or changed in the session that produced
this document. Nothing here is approved for implementation; it is the executable specification a
later session follows.

**Scope:** `docs/architecture/PHYSICS_TEACHER_MIGRATION_ARCHITECTURE.md` §4.1, narrowed.
`docs/architecture/TUTOR_REMEDIATION_PLAN.md` §2 Item 4.1.

**Date:** 2026-09-14. **Branch:** `main`. **Measured against:** `d3e17ae`.

---

## 0. The one-sentence claim

`handleChatTurn` is a single 11,044-line function whose state is 116 mutable locals; this
document proposes replacing the *representation* of 113 of them with two frozen typed objects —
`TurnContract` (compiled before the model call) and `TurnDelivery` (compiled immediately after
it, before any repair pass) — **without changing what any teaching decision decides.**

---

## 1. The measured baseline

Every number below was produced this session against `d3e17ae`, not carried forward from a prior
document. Re-measure before acting; the commands are given so the executor can.

```
wc -l src/app/api/learn/chat/route.ts                                    → 11199
grep -cE "^\s*(let|const)\s+\w*Hoisted\b" .../route.ts                   → 116
grep -oE "\b\w+Hoisted\b" .../route.ts | sort -u | wc -l                 → 116   (no shadowing)
grep -oE "\b\w+Hoisted\b" .../route.ts | wc -l                           → 1150  (references)
grep -nE "^(export )?(async )?function " .../route.ts                    → 2 functions
grep -cE "^\s+cleanText = " .../route.ts                                 → 42
grep -c "catch {" .../route.ts                                           → 59
```

Structural facts that follow from those numbers:

* `POST` (L130-153) delegates to `handleChatTurn` (L155-11199). **One function, 11,044 lines.**
  All 116 `Hoisted` locals are locals of that single scope, which is why there is no type
  boundary anywhere between "this was set" and "this is safe to read".
* The primary provider call is `await routeAI(...)` at **L5763**. Four further `routeAI` calls
  (L7260, L7407, L7535, L7718) are repair regenerations, all downstream of it.
* `cleanText` is declared at **L6541** and reassigned **42 times**, last at **L10928** — a
  4,387-line repair chain.
* 1150 references / 116 declarations = **9.9 reads per local**, mean read distance measured
  below in the thousands of lines.

### 1.1 The idiom's cost, in this codebase's own words

The declarations are not undocumented — they are *heavily* documented, and the documentation is
the evidence. Three verbatim examples:

> `persistedEpisodeHoisted` — *"Hoisted because the comparison happens ~3,940 lines after the
> value is read, and comparing against the in-request value instead is what discarded an explicit
> stop."* (L1955-1961)

> `phaseAllowsProbeHoisted` — *"Hoisted here (computed alongside `phaseAllowsProbe` ~150 lines
> below, read at the withhold call site ~1600 lines below) so both places agree on exactly which
> turns the gate considered question-eligible."* (L2013-2015)

> L9582 — *"P4: `sessionEpisodeHoisted` may have been updated by the recovery"*

The first is a **shipped defect** whose fix was to hand-introduce a second variable holding the
*before* value. The second is a hand-written note asking a future reader to hold a 1,600-line
invariant in their head. The third is a prose warning that a variable's meaning depends on the
line number at which it is read. All three are the same missing type.

---

## 2. Classification of all 116

Method: for each identifier, every line mentioning it was partitioned into **writes** (the
declaration, or a line matching `\bNAME\s*=[^=>]`) and **reads** (everything else, excluding
comment-only lines). `pre` = reads before L5763; `post` = reads after L5763; `span` = last read
minus declaration line.

Verdict rule, applied mechanically:

| Verdict | Rule | Meaning |
|---|---|---|
| `DEAD` | no reads at all | write-only store; report, do not migrate |
| `RESULT` | has a write after L5763 | not knowable before the model responds → `TurnDelivery` |
| `CONTRACT` | read after L5763, **or** span ≥ 400 lines | set once pre-model, read far away → `TurnContract` |
| `LOCAL` | everything else | genuine local scratch; **leave alone** |

The 400-line span threshold is what separates "reads far from where it is set" from "reads
nearby". It is deliberately generous: a 400-line read distance is already ten times a normal
function.

**Result: 82 CONTRACT · 31 RESULT · 2 DEAD · 1 LOCAL.**

**A known limitation of the counting method, stated so the numbers are not over-trusted.** A line
is skipped as a comment only when its first non-whitespace characters are `//`, `*` or `/*`. A
*trailing* comment on a code line is therefore counted as a read — e.g. `route.ts` L1813,
`recoveryTurn: false, // recoveryKeyHoisted not yet computed`, is counted as a read of
`recoveryKeyHoisted` 155 lines before its declaration. This inflates a few read counts by one or
two and cannot change any verdict (a trailing comment never creates a write, and no local's
verdict turns on a single read). **The verdicts are sound; treat the exact read counts as
approximate.** The executor should re-derive per-field read sites with the editor's own
find-references before migrating that field, not from this table.

### 2.1 The four DEAD / LOCAL verdicts (verified individually)

| Name | Verdict | Evidence |
|---|---|---|
| `libraryLessonPlanHoisted` | **DEAD** | declared L759, written L1242, only other mention is a comment at L9454. Zero reads. |
| `lessonStageProgressHoisted` | **DEAD** | declared L761, written L1902. Zero reads. See §2.2. |
| `lessonPointerHoisted` | **LOCAL** | `const`, 3 reads, all within 13 lines (L415→L428). Pure scratch. **Leave alone.** |
| *(none other)* | | |

### 2.2 A verified architectural finding, reported and NOT fixed

`contextSnapshot.lessonStageProgress` (ADR 09's cross-turn lesson-stage continuity) is **read but
never written, anywhere in `src/`.**

```
route.ts:295-298   snapshotLessonStageProgress = <read from contextSnapshot>
route.ts:761       let lessonStageProgressHoisted = null
route.ts:1902      lessonStageProgressHoisted = { ... }        ← the only write; nothing reads it
grep -rn "lessonStageProgress:" src/                           → 0 writers
```

`src/lib/memory/sessionMemory.ts:43` declares the field's type. `src/tests/
lessonStateIsolation.test.ts:449` lists its key. Neither writes it. Therefore
`snapshotLessonStageProgress` is always `null` at runtime and ADR 09's stage continuity has never
executed.

This is **out of scope** for the Turn Contract (it is a missing feature, not a representation
problem) and must not be "fixed" as part of it. It is recorded here because the classification
pass is what surfaced it, and because deleting `lessonStageProgressHoisted` as "dead code" during
migration would erase the evidence. **Batch 0 deletes neither DEAD local** — see §6.

---

## 3. Five defect classes the contract makes structural

Each is verified against the code this session, with line numbers. These are the justification;
if a reader disagrees with these five, they should disagree with the whole design.

### D1 — The same fact derived twice, by two dynamic imports of one function

`probeKeyIsAuthored(pendingMcqHoisted)` is called at **L6367** and again at **L6429**, each
behind its own `await import('@/lib/teaching/mcq')`, 62 lines apart, to set two booleans that are
exact complements:

```ts
// L6363-6368
gradedAgainstServerKeyHoisted = await (async () => {
  if (!mcqGradedThisTurn || !pendingMcqHoisted) return false
  if (mcqGradedThisTurn.correct === null || mcqGradedThisTurn.correct === undefined) return false
  const { probeKeyIsAuthored } = await import('@/lib/teaching/mcq')
  return probeKeyIsAuthored(pendingMcqHoisted)
})()

// L6427-6431
if (mcqGradedThisTurn && pendingMcqHoisted) {
  const { probeKeyIsAuthored } = await import('@/lib/teaching/mcq')
  if (!probeKeyIsAuthored(pendingMcqHoisted)) { unauthoredKeyGradeHoisted = true; ... }
}
```

`probeKeyIsAuthored` is `typeof mcq?.assetId === 'string' && mcq.assetId.trim() !== ''`
(`mcq.ts:264`). So both booleans are a **pure function of a field already present on the object**.
One typed field — `contract.pendingProbe.keyProvenance: 'authored' | 'model-invented'` — replaces
both derivations and every re-derivation downstream, at zero computational cost.

### D2 — A type that permits a state the code establishes it can never reach

`mcqGradeHoisted: { chosenIndex: number | null; correct: boolean | null } | null` (L803).

There is exactly **one** assignment, at **L2481**:

```ts
const g = gradeMcqAnswer(message, pendingMcqHoisted)
if (g.correct !== null) mcqGradeHoisted = g
```

So `mcqGradeHoisted !== null ⟹ correct is a boolean`. That invariant is established at L2481 and
must hold at L11050, **8,569 lines later** — and the type says nothing about it. The consequence
is visible in the code: the guard at **L6365** (`if (correct === null || correct === undefined)
return false`) is dead, and **four** downstream consumers each re-add the check the type should
have made unnecessary:

```
L7997   justGraded: mcqGradeHoisted && typeof mcqGradeHoisted.correct === 'boolean' && !unauthoredKeyGradeHoisted
L8775   graded:     mcqGradeHoisted && typeof mcqGradeHoisted.correct === 'boolean' && !unauthoredKeyGradeHoisted
```

A discriminated union (`ServerGrade` in §4) makes the invariant the type, and every one of those
local re-guards becomes provably redundant — which is what makes their removal a *provably
equivalent* change, not a judgement call.

### D3 — One variable holding two different facts, distinguished only by line number

Three locals are read before the model call **and overwritten after it**, so a read's meaning
depends on where it sits:

| Name | pre-model reads | overwritten at | post-model reads |
|---|---|---|---|
| `sessionEpisodeHoisted` | 9 (first L2895) | **L9296** | 10 |
| `capabilityStateHoisted` | 5 (first L3251) | **L7575** | 5 |
| `narrativeStateHoisted` | 1 (L3184) | **L8206** | 2 |

`sessionEpisodeHoisted` is the one that has already cost a defect. The route hand-fixed it for
*one* field by introducing `persistedEpisodeHoisted` (L1962) whose docblock names the bug. It
hand-fixed it a second time for the conversation state by introducing
`conversationStateAfterTurnHoisted` (L2179) beside `conversationStateHoisted` (L1993). **The
before/after split is already this codebase's answer; it has simply been applied by hand, twice,
to two of the three fields that need it.** `TurnContract`/`TurnDelivery` is that same split
applied once, by construction, to all of them.

### D4 — "Single owner" functions called six times with mutating inputs

`mcqToServe(mcqHoisted, pendingMcqHoisted, mcqGradeHoisted)` — whose own comment at L6098 calls it
*"the single owner"* — is invoked at **six** sites, each behind its own dynamic import under a
different local alias:

| Line | Alias | Purpose |
|---|---|---|
| 6122 | `mcqToServeForEmptyGuardEarly` | empty-turn guard |
| 7947 | `mcqToServeForWithhold` | ungraded-question withhold |
| 9762 | `mcqToServe` | **snapshot persist** |
| 10705 | `mcqToServeForReoffer` | re-offer detection |
| 10876 | `mcqToServeForEmptyGuard` | empty-turn guard |
| 10914 | `mcqToServeForResponse` | **client payload** |

`mcqHoisted` is assigned at L5950, L5953, L5977, L5994, L6022 **and L10040**. The last one is the
lesson-close block, which sets `mcqHoisted = null` and whose own comment (L10010-10021) explains
that on the finalising turn the model *has already produced a question*.

So L9762 (persist) and L10914 (response) call the same function with the same argument *names* and
**a different value of `mcqHoisted` between them.**

The strongest existing guard on exactly this property,
`src/tests/gateAssessmentRouteWiring.test.ts:86` *("the selected MCQ reaches the response and the
snapshot, unchanged")*, asserts:

```ts
expect(lineOf(/const served = mcqToServe\(mcqHoisted, pendingMcqHoisted, mcqGradeHoisted\)$/)).toBeGreaterThan(0)
expect(lineOf(/mcqForClient\(mcqToServeForResponse\(mcqHoisted, pendingMcqHoisted, mcqGradeHoisted\)\)/)).toBeGreaterThan(0)
```

It matches the **source text** of both expressions. It is structurally incapable of noticing an
assignment between them.

**Honest limit on this finding.** Whether the two sites can actually disagree for a real learner
is *not* established here — the close path requires verified mastery, and
`mcqToServe(null, pending, graded)` returns `null` when `graded` is truthy, so a graded close turn
converges. It is exactly the class of question that cannot be answered by reading either site, and
exactly what the shadow-mode assertion of §5 exists to answer against real traffic. **Do not
report this as a live defect. Do measure it.**

### D5 — An instruction that outlives its artifact

The clearest single statement of the problem is a comment the codebase wrote about itself at
**L10772-10783**:

> *"Measured through the real route (2026-09-13): on the same turn, this guard prepended 'tap the
> choice you mean from the list below' while liveness rung 1 RELEASED the pending probe — so the
> response carried `mcq: null` and there was no list below. Both mechanisms are individually
> right; the contradiction is that this one read the probe before the release and the payload
> reflects it after."*

The fix was a fourth conjunct — `&& probeReleasedThisTurnHoisted !== true` — added to one guard at
one call site. That is the exclusion-list shape this repository has already named and rejected
elsewhere (`genuineUnmappedAttempt`, `DISCOURSE_NOUNS`): the defence is a growing list of
special cases, one per incident, added wherever someone happened to test.

A `TurnDelivery` whose `servedProbe` field is computed **once, at the point the artifact decision
is final**, and read by both the prose guard and the payload, removes the class rather than the
instance.

---

## 4. The types

Two modules. Nothing else in `src/lib/teaching/` moves.

* `src/lib/teaching/turnContract.ts` — `TurnContract`, `compileTurnContract`, the field types.
* `src/lib/teaching/turnDelivery.ts` — `TurnDelivery`, `compileTurnDelivery`,
  `assertDeliverySatisfiesContract`.

### 4.0 Naming — a collision that must be avoided

`docs/architecture/PHYSICS_TEACHER_MIGRATION_ARCHITECTURE.md` §4.1 and the handoff prompt both
call the post-model type `TurnOutcome`. **That name is taken:**

```
src/lib/teaching/turnProgress.ts:79   export type TurnOutcome = 'productive' | 'unproductive' | 'excluded'
```

Both types would be imported into `route.ts`, and `turnProgressHoisted` already destructures
`{ outcome: TurnOutcome }`. `TurnResult` is also taken
(`src/tests/support/turnHarness.ts:77`). Verified free: **`TurnContract`, `TurnDelivery`,
`turnContract`, `assertDeliverySatisfiesContract`** (0 hits each across `src/`).

`TurnDelivery` also reads correctly against `TurnContract`: *the delivery must satisfy the
contract.*

### 4.1 Shared value types

```ts
// src/lib/teaching/turnContract.ts

import type { TutorMCQ } from '@/lib/teaching/mcq'
import type { ConversationState, TeachingPhase } from '@/lib/teaching/conversationState'
import type { TurnArbitration } from '@/lib/teaching/turnArbitration'
import type { SessionEpisode } from '@/lib/teaching/sessionLifecycle'
import type { VisualDecision } from '@/lib/teaching/visual/types'
import type { ExcursionDecision } from '@/lib/teaching/excursion'
import type { KnowledgeGap } from '@/lib/teaching/knowledgeGap'
import type { FailureStateKey } from '@/lib/teaching/recoveryGuard'
import type { LearnerRequest } from '@/lib/teaching/masteryGate'
import type { TeachingHistory } from '@/lib/teaching/teachingHistory'
import type { ObjectiveState } from '@/lib/teaching/objectiveModel'
import type { CapabilityState, CapabilityId } from '@/lib/teaching/capabilityModel'
import type { PlacementVerificationState } from '@/lib/teaching/placementVerification'
import type { QuestionLedger } from '@/lib/teaching/repetitionGuard'
import type { LegalityReason } from '@/lib/teaching/questionLegality'

/**
 * WHERE A GRADED QUESTION'S ANSWER KEY CAME FROM.
 *
 * This is the distinction `unauthoredKeyGradeHoisted` and
 * `gradedAgainstServerKeyHoisted` were each invented to express, separately,
 * 62 lines apart (route.ts L6363 / L6427). It is a pure function of
 * `TutorMCQ.assetId` — `probeKeyIsAuthored` is
 * `typeof assetId === 'string' && assetId.trim() !== ''` — so naming it costs
 * nothing and removes two derivations plus five downstream re-checks.
 *
 * 'authored'       an AssetIdentity probe; `gateAssessment.probeToMcq` is the
 *                  ONLY writer of `assetId`. Server ground truth.
 * 'model-invented' parsed from the model's own <!--MCQ--> tag. Counted, never
 *                  credited (conversationState.ts `unauthoredKeyGrades`).
 */
export type KeyProvenance = 'authored' | 'model-invented'

/** A probe, carrying its provenance so no consumer has to re-derive it. */
export interface IdentifiedProbe {
  readonly mcq: TutorMCQ
  readonly keyProvenance: KeyProvenance
  /** Present iff keyProvenance === 'authored'. */
  readonly assetId: string | null
}

/**
 * THE SERVER'S VERDICT ON THIS TURN'S ANSWER.
 *
 * A discriminated union, deliberately. The route establishes at L2481
 *
 *     if (g.correct !== null) mcqGradeHoisted = g
 *
 * that a non-null grade always carries a boolean — and then states the type as
 * `{ chosenIndex: number | null; correct: boolean | null } | null`, which
 * permits a state the code cannot produce, 8,569 lines from where the
 * invariant is established. Four downstream consumers each re-add
 * `typeof correct === 'boolean'` to compensate. Here the invariant IS the
 * type, so removing those re-guards is provably equivalent, not a judgement.
 *
 * `keyProvenance` rides on the grade rather than beside it, because every
 * measured incident in this area (phys.mech.friction 2026-09-01, the
 * 2026-09-14 "Great job!" finding) is a consumer that had the verdict in hand
 * and not the provenance.
 */
export type ServerGrade =
  | { readonly kind: 'graded'; readonly chosenIndex: number; readonly correct: boolean
      readonly keyProvenance: KeyProvenance }
  | { readonly kind: 'unresolved'; readonly chosenIndex: null; readonly correct: null
      readonly keyProvenance: KeyProvenance }

/** True iff this grade may certify mastery. The ONE definition; see §5 A3. */
export function certifies(g: ServerGrade | null): boolean {
  return g?.kind === 'graded' && g.keyProvenance === 'authored'
}

/** True iff a consumer may state a verdict to the learner with full confidence. */
export function mayStateVerdict(g: ServerGrade | null): boolean {
  return certifies(g)
}
```

### 4.2 `TurnContract`

Every field is `readonly`; the object is `Object.freeze`n by its compiler. Grouped by the
authority that owns it, **not** by declaration order in `route.ts` — grouping by owner is what
makes the batch plan of §6 possible.

```ts
/**
 * THE TURN CONTRACT — everything the server decided BEFORE the model was
 * called, compiled once, frozen, and read by every consumer thereafter.
 *
 * ── WHAT THIS IS NOT ────────────────────────────────────────────────────────
 * It is NOT a decision-maker. Every field is copied from an existing
 * authority — conversationState, masteryGate, turnArbitration, turnProgress,
 * gateAssessment, the visual resolver, excursion, knowledgeGap,
 * recoveryGuard, placementVerification, capabilityModel. This module MUST NOT
 * contain a rule, a threshold, a detector, or a regex. Its whole job is to say
 * WHERE a fact came from and WHEN it was true. A future session adding logic
 * here has turned it into a second teaching engine, which is the failure mode
 * this repository has met before (`src/lib/educationalBrain/*`,
 * `curriculum/teachingActionEngine.ts`).
 *
 * ── WHY FROZEN ──────────────────────────────────────────────────────────────
 * Three locals today are read pre-model and overwritten post-model
 * (`sessionEpisodeHoisted` L9296, `capabilityStateHoisted` L7575,
 * `narrativeStateHoisted` L8206), so a read's meaning depends on its line
 * number. Freezing makes that representable only as two objects, which is what
 * `persistedEpisodeHoisted` and `conversationStateAfterTurnHoisted` already
 * are — by hand, for two fields out of three.
 */
export interface TurnContract {
  // ── IDENTITY ──────────────────────────────────────────────────────────────
  readonly identity: {
    readonly sessionId: string
    readonly userId: string
    readonly subjectSlug: string
    /** PCD-004: resolved ONCE; the five sites that read activeLessonSlug agree. */
    readonly activeLessonSlug: string | null
    readonly lessonKeyThisTurn: string | null
    readonly conceptId: string | null
    /** Library-mode concept identity (ADR 08 §4a). */
    readonly libraryConceptNodeId: string | null
    /** Server-measured at ingress, before any DB work (foundations/03 §7). */
    readonly turnReceivedAt: number
    /** Ephemeral (machine-authored) instruction ⇒ the learner said nothing. */
    readonly learnerAuthoredMessage: string
  }

  // ── AUTHORITY — who owns this turn (turnArbitration.ts, Phase 3) ──────────
  readonly authority: {
    /** Null only on paths that never reach the wave-0 block; consumers fall
     *  back to `arbitrationUnavailable()` exactly as they do today. */
    readonly arbitration: TurnArbitration | null
    readonly recoveryKey: FailureStateKey | null
    readonly firstLessonActive: boolean
    readonly excursion: {
      readonly active: boolean
      readonly decision: ExcursionDecision | null
      readonly teachingTitle: string | null
    }
    readonly knowledgeGap: KnowledgeGap | null
    readonly learnerRequest: LearnerRequest | null
    readonly navigationRequest: boolean
    readonly claimChallengeActive: boolean
  }

  // ── LADDER — the conversation state AS READ (never as folded) ─────────────
  readonly ladder: {
    /** The pre-turn state. The POST-turn state is TurnDelivery.ladderAfter. */
    readonly state: ConversationState | null
    readonly phaseBeforeTurn: TeachingPhase | null
    readonly evidenceMove: string | null
    readonly objective: ObjectiveState | null
    readonly lessonCompletedBefore: boolean
    readonly lessonCompletionRespectsNewIntent: boolean
    readonly conceptPreviouslyMastered: boolean
    readonly teachingHistory: TeachingHistory | null
    readonly questionLedger: QuestionLedger
  }

  // ── EPISODE — session lifecycle (07 §8) ───────────────────────────────────
  readonly episode: {
    /** The episode as DERIVED for this turn. */
    readonly current: SessionEpisode | null
    /** The episode AS STORED at turn start — today's `persistedEpisodeHoisted`,
     *  which exists because comparing against the in-request value discarded an
     *  explicit stop (see its docblock, L1955). */
    readonly persisted: SessionEpisode | null
    readonly fresh: boolean
  }

  // ── INBOUND — what the learner did, read once ─────────────────────────────
  readonly inbound: {
    readonly isBareAck: boolean
    readonly lowSignalAck: boolean
    /** The probe the PREVIOUS turn asked, read back from the snapshot. */
    readonly pendingProbe: IdentifiedProbe | null
    /** This turn's grade of `pendingProbe`. Null when nothing was graded. */
    readonly grade: ServerGrade | null
    readonly priorTurnUnresolvedProseMcq: boolean
  }

  // ── ASSESSMENT — what the gate decided, pre-model ─────────────────────────
  readonly assessment: {
    /** The authored probe the gate selected for THIS turn, or null. */
    readonly gateProbe: IdentifiedProbe | null
    readonly gateLeadIn: string | null
    /** `null` means the selector never ran — ignorance, NOT "none exist". */
    readonly authoredProbesExist: boolean | null
    readonly declinedByPolicy: boolean
    readonly phaseAllowsProbe: boolean
    /** The ORIGINAL isProbeAttachablePhase, never the gate's E1-widened copy. */
    readonly probeWouldCountThisPhase: boolean
    readonly observeAskViolation: boolean
    readonly gateTerms: Readonly<Record<string, boolean>> | null
    readonly legalityBlockedReason: LegalityReason | null
    readonly legalityBlock: string | null
  }

  // ── FIGURE — the visual resolver's verdict, decided pre-model ─────────────
  readonly figure: {
    readonly decision: VisualDecision | null
    readonly availableVisual: string | null
    readonly allowedVisuals: readonly string[] | null
    readonly forceRender: boolean
    readonly generationCountBefore: number
  }

  // ── LIVENESS — counters read from the PRE-turn snapshot (turnProgress.ts) ──
  readonly liveness: {
    readonly priorStagnantTurns: number
    readonly priorProbeStarvedTurns: number
    readonly probeStarvationRelieved: boolean
    readonly arbitrationWasSoleBlocker: boolean
    readonly consecutiveDontKnows: number
    readonly priorConfirmations: number
  }

  // ── PLACEMENT ─────────────────────────────────────────────────────────────
  readonly placement: {
    readonly level: 'intermediate' | 'advanced' | null
    readonly askedProbe: 'below' | 'at' | 'above' | null
    readonly previous: PlacementVerificationState | null
    readonly inherited: boolean
  }

  // ── STRATEGY / BUDGETS — advisory inputs to prompt assembly ───────────────
  readonly strategy: {
    readonly teachingStrategy: unknown | null       // TeachingStrategyType
    readonly outputBias: unknown | null             // OutputBias
    readonly hintBias: unknown | null               // HintBiasKind
    readonly strategyTopicSlug: string | null
    readonly selectedStrategy: number | null
    readonly conversationDecision: unknown | null   // ConversationDecision
    readonly cueDecision: unknown | null            // TeachingDecision
    readonly dispatchPlan: unknown | null           // DispatchPlan
    readonly retrievalCache: unknown | null         // RetrievalCache
    readonly outputLanguageBlock: string
    readonly kernelMaxQuestions: 0 | 1
    readonly routeMaxParagraphs: number | null
    readonly kernelPolicyMove: unknown | null       // MappedMove
    readonly evidenceStageCeiling: number | null
    readonly evidenceWorkedExampleFirst: boolean
    readonly evidenceAutonomy: boolean
    readonly libraryDueRevisionCount: number
    readonly teachingStepUpdate: { teachingStepIndex: number; teachingStepConceptId: string } | null
  }

  // ── CAPABILITY — as read, pre-model ───────────────────────────────────────
  readonly capability: {
    readonly stateBefore: CapabilityState | null
    readonly required: readonly CapabilityId[]
  }

  // ── PROVENANCE — read by nothing, logged only (Phase 0 / EOS M1) ──────────
  readonly provenance: {
    readonly decisionConceptId: string | null
    readonly decisionGranularity: unknown | null    // TeachingLevel
    readonly decisionProbeId: string | null
    readonly kernelParityMetrics: unknown | null
    readonly kernelParityTags: readonly string[]
    readonly enginePolicyParity: unknown | null
    readonly enginePolicyTags: readonly string[]
    readonly signalRepairFired: boolean
    readonly isFirstLessonContext: boolean
  }
}
```

### 4.3 `TurnDelivery`

```ts
// src/lib/teaching/turnDelivery.ts

/**
 * WHAT THE TURN ACTUALLY PRODUCED — compiled ONCE, immediately after the
 * provider call returns and the machine tags are parsed, and BEFORE the first
 * repair pass runs (today: `cleanText = parsed.cleanText`, route.ts L6549).
 *
 * ── WHY A SECOND OBJECT AND NOT MORE CONTRACT FIELDS ──────────────────────
 * §4 of PHYSICS_TEACHER_MIGRATION_ARCHITECTURE establishes that two surfaces
 * are irreducibly GENERATE → DETECT → REPAIR: the `?? mcqParse.mcq` fallback,
 * and prose teaching content. There is no way to know before the call whether
 * the model will invent a question. So the answer is not to eliminate those
 * fields — it is to TYPE them, in an object whose name says they are
 * post-hoc, separate from the object whose name says it was decided in
 * advance.
 *
 * ── `text` IS STILL MUTABLE, DELIBERATELY ─────────────────────────────────
 * 42 repair passes rewrite `cleanText`. Freezing it would be a rewrite of
 * route.ts, which this design explicitly is not. `TurnDelivery` freezes the
 * FACTS the repair passes read (what was graded, what is on screen, what was
 * withheld) — which is what they each re-derive today. The text itself stays a
 * local. A later phase may promote it; this one does not.
 */
export interface TurnDelivery {
  /** The contract this delivery is measured against. */
  readonly contract: TurnContract

  // ── GENERATION ────────────────────────────────────────────────────────────
  readonly generation: {
    readonly provider: string
    readonly llmCallCount: number
    readonly finishReason: string | null
    readonly degraded: boolean
    readonly consecutiveOutages: number
    readonly memory: {
      readonly servingMode: string | null
      readonly confidence: number | null
      readonly assetId: string | null
      readonly conceptId: string | null
      readonly exactGradeMatch: boolean | null
      readonly fallbackUsed: boolean | null
      readonly fallbackReasonCode: string
    }
  }

  // ── QUESTION — the one artifact with a real pre/post split ────────────────
  readonly question: {
    /**
     * Where this turn's question came from. The field the four sequential
     * `mcqHoisted = null` overrides (route.ts L5953, L5977, L5994, L6022) are
     * each a clause of, and which nothing downstream can currently recover
     * without calling `probeKeyIsAuthored` again.
     */
    readonly source: 'gate-authored' | 'model-parsed' | 'none'
    /** Attached THIS turn, after every withhold. Null is a real outcome. */
    readonly attached: IdentifiedProbe | null
    /** The model's own item when it was WITHHELD, so its prose copy can be
     *  stripped too (today `withheldModelMcqHoisted`). */
    readonly withheldModelProbe: TutorMCQ | null
    readonly modelProbeVerdict: string | null
    /** Liveness rung 1 took a probe off the screen this turn. */
    readonly released: boolean
    readonly releasedQuestionText: string | null
    /**
     * THE SINGLE ANSWER to "what question is the learner looking at".
     *
     * `mcqToServe(attached, pending, grade)` is called SIX times in route.ts
     * today (L6122, L7947, L9762, L10705, L10876, L10914), each behind its own
     * dynamic import under a different alias, across a mutation of its first
     * argument at L10040. This field is that value, computed once at the point
     * the artifact decision is final, and read by the snapshot persist, the
     * client payload, the re-offer detector, the empty-turn guards and the
     * question-delivery contract.
     */
    readonly served: TutorMCQ | null
  }

  // ── FIGURE — what is genuinely on the learner's screen ────────────────────
  readonly figure: {
    /** A figure payload was produced by THIS message. */
    readonly attachedThisTurn: boolean
    /** This message INTRODUCED it (session.turns === 0), vs merely holding it. */
    readonly introducedThisTurn: boolean
    /**
     * The learner has a figure — attached now OR held from an earlier turn.
     * `figureReference.ts` and `asciiDiagramGuard.ts` both need exactly this
     * and today share one un-named local (route.ts L8586). Keying either on
     * `attachedThisTurn` alone strips a TRUE reference on every held turn —
     * a defect found by reading the ownership gate, not by a test, because
     * nothing would have failed.
     */
    readonly onScreen: boolean
  }

  // ── VERDICT — what the server knows about the learner's answer ────────────
  readonly verdict: {
    /** Identical to `contract.inbound.grade`; restated so verdict consumers
     *  have one import, and so `assertDeliverySatisfiesContract` has something
     *  to compare (A1 in §5). */
    readonly grade: ServerGrade | null
    readonly signalVerification: 'CLEAN' | 'SUSPICIOUS' | 'CONTRADICTED'
    /** `certifies(grade)` — the positive provenance the VERIFIED mastery
     *  counters require. Duplicated as a field only so the fold's
     *  `TurnEvidence.serverGraded` has a stable source. */
    readonly serverGraded: boolean
    readonly signalSuppressedReason: string | null
    readonly teachingIntegrityFellThrough: boolean
  }

  // ── AFTER — the folded state. NEVER the same field as the contract's. ─────
  readonly after: {
    readonly ladder: ConversationState | null
    readonly episode: SessionEpisode | null
    readonly capability: CapabilityState | null
    readonly capabilityObservations: readonly CapabilityObservation[]
    readonly narrative: unknown | null            // NarrativeState
    readonly frustration: unknown | null          // FrustrationMachine
    readonly frustrationBand: 'calm' | 'strained' | 'flooded' | null
    readonly turnHistoryUpdate: Readonly<Record<string, unknown>> | null
    readonly turnProgress: {
      readonly outcome: import('@/lib/teaching/turnProgress').TurnOutcome
      readonly stagnantTurns: number
      readonly rung: number
      readonly probeHeldTurns: number
    } | null
  }

  // ── COMPLETION ────────────────────────────────────────────────────────────
  readonly completion: {
    readonly payload: unknown | null              // LessonCompletionPayload
    readonly masteryGatePending: boolean
    readonly masteryCompletionSuppressed: boolean
  }

  // ── POST-MODEL PROVENANCE — logged, never branched on ─────────────────────
  readonly provenance: {
    readonly hint: string | null
    readonly fillerDetected: boolean
    readonly stanceViolations: readonly unknown[]   // StanceViolationCode[]
    readonly eosVerifierMetrics: unknown | null
    readonly eosVerifierTags: readonly string[]
    readonly progressionTags: readonly string[]
    readonly attemptVector: unknown | null          // AttemptVectorV2
    readonly adaptationState: unknown | null        // AdaptationStateVector
  }
}
```

> **Note on the `unknown | null` fields.** They are `unknown` in this brief only because their
> concrete `import type` lines are long and add nothing to the argument. **The executor must
> replace every one with the exact type from the corresponding declaration in `route.ts`** — the
> full list of exact annotations is §7. An `unknown` shipped into the real module is a defect.

---

## 5. The assertion function

```ts
// src/lib/teaching/turnDelivery.ts

export interface ContractViolation {
  readonly code: string
  readonly detail: string
}

/**
 * DOES THIS DELIVERY SATISFY ITS CONTRACT?
 *
 * ── IT DOES NOT THROW, AND THAT IS THE DESIGN ─────────────────────────────
 * route.ts serves real learners. A throw here turns a representation bug into
 * a teaching outage. It returns violations; the caller logs one structured
 * line. Every check below is a property this repo believes is ALREADY TRUE, so
 * a violation in production is information, not an error to handle — and the
 * shadow phase (Batch 1) exists precisely to find out whether the beliefs hold
 * before anything depends on them.
 *
 * ── IT IS NOT A VERIFIER ──────────────────────────────────────────────────
 * It checks the turn against ITSELF — that two representations of one fact
 * agree. It never judges teaching quality, factual correctness, or prose. The
 * composed output verifier (src/lib/kernel/verifier/rules.ts, 22 rules) is OFF
 * in production because V-Q2 makes legitimate turns unreachable (route.ts
 * L7101); this must not become a second attempt at it. Every check is TOTAL
 * and DETERMINISTIC: no model call, no DB read, no regex over teaching prose.
 */
export function assertDeliverySatisfiesContract(d: TurnDelivery): ContractViolation[]
```

### 5.1 The invariants

Each names the defect class it closes and whether it is believed already true. **A1-A8 are
believed already true in behaviour**; the contract makes them checkable in one place instead of
distributed across call sites. **A9-A10 are NOT currently guaranteed** and are therefore
shadow-only, permanently, unless a later owner decision promotes them.

| # | Invariant | Closes | Believed true today? |
|---|---|---|---|
| **A1** | `d.verdict.grade` is reference-equal to `d.contract.inbound.grade` | the grade is read at 30 sites; a repair pass must never change it | YES — no write to `mcqGradeHoisted` after L2481 |
| **A2** | `d.question.source === 'gate-authored'` ⟹ `d.question.attached!.keyProvenance === 'authored'` **and** `attached.assetId === d.contract.assessment.gateProbe!.assetId` | serving a model item under the gate's lead-in (D1) | YES |
| **A3** | `d.verdict.serverGraded === certifies(d.verdict.grade)` | the two derivations of D1 disagreeing | YES |
| **A4** | `d.verdict.grade?.keyProvenance === 'model-invented'` ⟹ `d.verdict.signalVerification !== 'CLEAN'` | an invented key certifying mastery (`phys.mech.friction`, 2026-09-01) | YES — route.ts L6431 |
| **A5** | `d.question.released === true` ⟹ `d.question.served === null` | D5, the lead-in that named a list that was not there | YES — L10912, since 2026-09-13 |
| **A6** | The value persisted as `pendingMcq` is reference-equal to `d.question.served` (modulo the release rule) | D4, persist/response divergence; the "seventh defect" | **UNKNOWN** — the strongest existing guard compares source text (§3 D4). *This is the single highest-value thing the shadow phase measures.* |
| **A7** | `d.question.attached !== null` ⟹ `d.contract.authority.arbitration?.allows('NEW_QUESTION') !== false` | recovery/CLOSE turns serving a quiz (Phase 3, measured live) | YES — L6019 |
| **A8** | `d.figure.introducedThisTurn === true` ⟹ `d.figure.attachedThisTurn === true` | a figure claimed as introduced with no payload | YES |
| **A9** | At most one probe is OPEN per session at turn end | a second assessment before the first resolves (§4.1 I1) | **shadow only** |
| **A10** | `d.question.attached !== null` ⟹ the previous turn's served probe is resolved or released | stale-question re-offer (§4.1 I4) | **shadow only** |

Two invariants from `PHYSICS_TEACHER_MIGRATION_ARCHITECTURE` §4.1 are **deliberately excluded**:
**I2** (render receipt before a grade is admitted) and **I10** (idempotency key) both require new
runtime state and would change behaviour. They are that document's own "genuinely new" items and
belong to a later, separately-approved step. **I7** (figure reference resolves to `figure.id`) is
excluded because `figureReference.ts` already enforces its practical form and re-implementing it
here would be the second verifier this design forbids.

### 5.2 Shadow-mode logging

One structured line, matching the existing `*_EVENT` convention (`TURN_EVENT`, `BRAIN_EVENT`,
`EXCURSION_EVENT`). **No DB write** — the 2026-08-31 egress incident is the standing reason.

```
[learn/chat] CONTRACT_ASSERT={"violations":["A6"],"detail":"served=null persisted=abc123",...}
```

Silent when clean, so the line's presence is the signal. Budget ~200 bytes/turn on violation
turns only — a fraction of the ~1 kB `BRAIN_EVENT` that already fires every turn.

---

## 6. The migration: nine batches

**Rules that bind every batch.**

1. `route.ts` serves production. A batch is one commit, independently revertable, and ships only
   after `npx tsc --noEmit` is clean and the full suite passes. Install first: `node_modules` is
   absent in a fresh container.
2. **Never delete a `Hoisted` local in the same batch that introduces its contract field.**
   Populate, then migrate consumers, then delete — three separate steps, and the delete only
   after *every* consumer of that field reads the contract.
3. A consumer change must be **provably equivalent**: same boolean, same value, new source.
   Where equivalence is not provable from the types, leave the consumer alone and say so in the
   commit message.
4. When a pre-existing guard test asserts the old literal, follow this repository's established
   discipline: keep the original assertion verbatim in a dated comment and re-assert the same
   invariant against the new shape. **Delete nothing.** `gateAssessmentRouteWiring.test.ts`,
   `replayDrift.test.ts` and `outstandingProbeStaysOnScreen.test.ts` will all need this.
5. `src/tests/support/turnHarness.ts` is the only test that executes the real route. Every batch
   from 2 onward adds at least one harness case exercising the migrated consumer end to end.

| # | Batch | What moves | Why this order | Size |
|---|---|---|---|---|
| **0** | **Types + compilers, unconsumed** | Create `turnContract.ts` and `turnDelivery.ts` with the full types, `compileTurnContract`, `compileTurnDelivery`, `assertDeliverySatisfiesContract`. Pure modules, zero imports from `route.ts`. Unit tests only. | Nothing in `route.ts` changes. Reviewable in isolation. | ~700 LOC new, 0 changed |
| **1** | **Populate + shadow-assert** | In `route.ts`: build the contract just before L5763; build the delivery just after the tag parse (before L6549, the first `cleanText` rewrite); call the assertion; log `CONTRACT_ASSERT`. **Read nothing from either object.** Every `Hoisted` local stays and every consumer still reads it. | This is the batch that de-risks all the others: real traffic validates the model against reality before anything depends on it. **Hold here until A6 has been observed clean (or its violations diagnosed) across a meaningful sample.** | ~120 lines added to `route.ts`, 0 removed |
| **2** | **Provenance cluster** | `decisionConceptId`, `decisionGranularity`, `decisionProbeId`, `kernelParity*`, `enginePolicy*`, `eosVerifier*`, `progressionTags`, `stanceViolations`, `attemptVector`, `adaptationState`, `gateTerms`, `phaseBeforeTurn`, `legalityBlock`, `signalRepairFired`, `isFirstLessonContext`, `fillerDetected`, `modelProbeVerdict`, `hint`, `signalSuppressedReason` — **19 locals** | These are **read by nothing that branches**; they exist to be logged (`TURN_EVENT`, Phase 0 provenance, EOS spine). Migrating them cannot change a teaching decision, which makes this the batch that proves the mechanism with zero behavioural risk. | 19 locals, ~40 read sites |
| **3** | **Answer-verdict cluster** | `mcqGradeHoisted`, `unauthoredKeyGradeHoisted`, `gradedAgainstServerKeyHoisted`, `signalVerificationStatusHoisted`, `priorConfirmationsHoisted`, `consecutiveDontKnowsHoisted` → `ServerGrade` | The highest-value cluster and the one the brief was commissioned for. Consumers: `answerConfirmation` (L6842), `wrongAnswerCorrection` (L6905), `dontKnowCeiling` (L6930), `attributionGuard` (L8761), `visionDirectionGuard` (L6760), `signalVerification` (L6372), `answerableTurn` (L6470), the fold's `TurnEvidence` (L8165). Collapses D1 and D2 together: `correctForConfirmation` (L6811) becomes `mayStateVerdict(d.verdict.grade) ? d.verdict.grade.correct : null`, and four `typeof correct === 'boolean'` re-guards become provably redundant. | 6 locals, ~55 read sites |
| **4** | **Question-artifact cluster** | `gateMcqHoisted`, `mcqHoisted`, `pendingMcqHoisted`, `withheldModelMcqHoisted`, `authoredProbesExistHoisted`, `gateDeclinedByPolicyHoisted`, `probeWouldCountThisPhaseHoisted`, `observeAskViolationHoisted`, `gateLeadInHoisted`, `probeReleasedThisTurnHoisted`, `releasedProbeQuestionHoisted`, `phaseAllowsProbeHoisted` → `contract.assessment` + `delivery.question` | Depends on Batch 3 (`ServerGrade` is an input to `mcqToServe`). Collapses D4: the six `mcqToServe` aliases become one `delivery.question.served`. The four `mcqHoisted = null` overrides become one `question.source` assignment plus a documented withhold reason. **A6 must be clean before this batch lands** — it is the invariant this batch's correctness rests on. | 12 locals, ~110 read sites — **split into 4a (gate inputs) and 4b (served/persisted) if the diff exceeds one reviewable commit** |
| **5** | **Figure cluster** | `visualDecisionHoisted`, `availableVisualHoisted`, `allowedVisualsHoisted`, `forceVisualRenderHoisted`, `visualGenerationCountHoisted` + the three un-suffixed derived locals (`visualFired` L8551, `figureOnScreen` L8586, `figureIntroducedThisTurn` L8494) → `contract.figure` + `delivery.figure` | Independent of Batches 3-4, so it can run in parallel or be deferred without blocking. Consumers: `figureReference` (L8570), `asciiDiagramGuard` (L8615), `visualAcknowledgement` (L8675), the payload. Gives `onScreen` a name and one owner. **Do not touch the visual resolver's tiers** — §6 of the migration architecture. | 5 locals + 3 derived, ~30 read sites |
| **6** | **Authority cluster** | `turnArbitrationHoisted`, `recoveryKeyHoisted`, `excursionActiveHoisted`, `excursionDecisionHoisted`, `excursionTeachingTitleHoisted`, `knowledgeGapHoisted`, `firstLessonActiveHoisted`, `learnerRequestHoisted`, `navigationRequestHoisted`, `claimChallengeActiveHoisted`, `lowSignalAckHoisted`, `isBareAckHoisted` | `recoveryKeyHoisted` alone has 49 references across a 9,093-line span — the single widest-read local in the file. High read count, but each read is a plain substitution, so the diff is mechanical. | 12 locals, ~130 read sites |
| **7** | **Ladder / episode / capability — the three double-duty splits** | `conversationStateHoisted` + `conversationStateAfterTurnHoisted`, `sessionEpisodeHoisted` + `persistedEpisodeHoisted` + `sessionEpisodeFreshHoisted`, `capabilityStateHoisted`, `narrativeStateHoisted`, `objectiveStateHoisted`, `evidenceMoveHoisted`, `masteryGatePendingHoisted`, `masteryCompletionSuppressedHoisted`, `turnProgressHoisted`, `turnHistoryUpdateHoisted`, `lessonCompletionHoisted`, `frustration*` | **Last on purpose.** These are D3: reads whose meaning depends on line number. Every read must be individually assigned to `contract.ladder.*` or `delivery.after.*`, and getting one wrong is a real behaviour change. Do it with the harness green and all other batches landed, so a regression has nowhere else to hide. `conversationStateHoisted` alone has 78 references. | 15 locals, ~220 read sites — **expect 3-4 commits** |
| **8** | **Residue + deletion sweep** | Everything left: identity, placement, strategy, liveness counters, `libraryConceptNodeId`, `teachingHistory`, `questionLedger`, `retrievalCache`, `lessonKeyThisTurn`, `activeLessonSlug`, `consecutiveOutages`. Then delete every now-unreferenced `Hoisted` declaration. | Deletion is its own commit so a revert is trivial. | ~30 locals |

**Explicitly not in any batch:** `lessonPointerHoisted` (LOCAL — leave it), and the two DEAD
stores (`libraryLessonPlanHoisted`, `lessonStageProgressHoisted`). The DEAD ones are left in place
because deleting them erases the evidence for §2.2, which is an open finding someone must decide
about. Note their status in Batch 8's commit message; do not remove them.

### 6.1 Exit criterion

Per `PHYSICS_TEACHER_MIGRATION_ARCHITECTURE` §9 Step 1: **byte-identical behaviour on a replay
corpus**, plus every one of the ~20 post-hoc overrides expressed as a named clause, plus A1-A8
assertable in one place. The harness (`src/tests/support/turnHarness.ts`) is the instrument; it
already drives the real `POST` with four I/O seams stubbed.

If a batch cannot achieve byte-identical behaviour, **stop and report the divergence**. A
divergence is either a defect the contract found (valuable — write it up) or a migration mistake
(revert). It is never a thing to accept quietly because the new behaviour looks better.

---

## 7. Exact type annotations for every `Hoisted` local

Reference table for the executor. Columns: declaration line, write count, reads before L5763,
reads after L5763, span (last read − declaration), verdict.

| Local | decl | W | pre | post | span | verdict |
|---|---|---|---|---|---|---|
| `lessonPointerHoisted` | 415 | 1 | 3 | 0 | 13 | LOCAL |
| `activeLessonSlugHoisted` | 419 | 1 | 6 | 1 | 8669 | CONTRACT |
| `libraryConceptNodeIdHoisted` | 709 | 2 | 14 | 4 | 8749 | CONTRACT |
| `availableVisualHoisted` | 720 | 3 | 1 | 2 | 5848 | CONTRACT |
| `allowedVisualsHoisted` | 726 | 3 | 0 | 1 | 5843 | CONTRACT |
| `forceVisualRenderHoisted` | 727 | 1 | 1 | 1 | 5840 | CONTRACT |
| `visualDecisionHoisted` | 733 | 4 | 3 | 17 | 10329 | CONTRACT |
| `visualGenerationCountHoisted` | 737 | 2 | 0 | 1 | 9740 | CONTRACT |
| `excursionDecisionHoisted` | 741 | 2 | 4 | 6 | 9748 | CONTRACT |
| `excursionActiveHoisted` | 746 | 2 | 5 | 10 | 10314 | CONTRACT |
| `excursionTeachingTitleHoisted` | 748 | 2 | 3 | 0 | 3075 | CONTRACT |
| `conceptPreviouslyMasteredHoisted` | 749 | 2 | 1 | 0 | 2949 | CONTRACT |
| `libraryDueRevisionCountHoisted` | 758 | 1 | 2 | 0 | 4230 | CONTRACT |
| `libraryLessonPlanHoisted` | 759 | 2 | 0 | 0 | 0 | DEAD |
| `lessonStageProgressHoisted` | 761 | 2 | 0 | 0 | 0 | DEAD |
| `strategyHoisted` | 766 | 2 | 5 | 2 | 8101 | CONTRACT |
| `outputBiasHoisted` | 767 | 2 | 0 | 2 | 8101 | CONTRACT |
| `hintBiasHoisted` | 768 | 2 | 2 | 1 | 5815 | CONTRACT |
| `strategyTopicSlugHoisted` | 774 | 2 | 0 | 1 | 8092 | CONTRACT |
| `hintHoisted` | 777 | 3 | 0 | 2 | 10332 | RESULT |
| `mcqHoisted` | 781 | 8 | 0 | 29 | 10180 | RESULT |
| `pendingMcqHoisted` | 786 | 2 | 13 | 37 | 10250 | CONTRACT |
| `lessonKeyThisTurnHoisted` | 799 | 2 | 1 | 1 | 9049 | CONTRACT |
| `isBareAckHoisted` | 801 | 2 | 1 | 1 | 9930 | CONTRACT |
| `mcqGradeHoisted` | 803 | 2 | 7 | 23 | 10247 | CONTRACT |
| `lessonCompletionHoisted` | 807 | 3 | 0 | 1 | 10340 | RESULT |
| `questionLedgerHoisted` | 811 | 2 | 1 | 1 | 8819 | CONTRACT |
| `consecutiveOutagesHoisted` | 816 | 2 | 0 | 2 | 8824 | RESULT |
| `lessonCompletedHoisted` | 820 | 2 | 3 | 3 | 9088 | CONTRACT |
| `lessonCompletionRespectsNewIntentHoisted` | 828 | 2 | 2 | 1 | 5818 | CONTRACT |
| `teachingHistoryHoisted` | 829 | 3 | 13 | 8 | 9515 | CONTRACT |
| `selectedStrategyHoisted` | 830 | 5 | 4 | 5 | 9487 | CONTRACT |
| `retrievalCacheHoisted` | 831 | 2 | 6 | 0 | 4345 | CONTRACT |
| `conversationDecisionHoisted` | 832 | 2 | 10 | 4 | 6846 | CONTRACT |
| `teachingStepUpdateHoisted` | 848 | 2 | 0 | 2 | 9727 | CONTRACT |
| `placementLevelHoisted` | 1943 | 3 | 0 | 3 | 7563 | CONTRACT |
| `placementAskedProbeHoisted` | 1944 | 2 | 0 | 2 | 7600 | CONTRACT |
| `placementPrevHoisted` | 1946 | 2 | 5 | 3 | 7604 | CONTRACT |
| `placementInheritedHoisted` | 1947 | 2 | 0 | 1 | 7602 | CONTRACT |
| `firstLessonActiveHoisted` | 1951 | 2 | 9 | 6 | 8488 | CONTRACT |
| `sessionEpisodeHoisted` | 1954 | 4 | 9 | 10 | 9002 | RESULT |
| `persistedEpisodeHoisted` | 1962 | 2 | 0 | 1 | 7646 | CONTRACT |
| `sessionEpisodeFreshHoisted` | 1963 | 2 | 2 | 3 | 8495 | CONTRACT |
| `recoveryKeyHoisted` | 1968 | 2 | 21 | 28 | 9093 | CONTRACT |
| `turnArbitrationHoisted` | 1983 | 2 | 8 | 5 | 6282 | CONTRACT |
| `knowledgeGapHoisted` | 1989 | 2 | 6 | 2 | 7709 | CONTRACT |
| `conversationStateHoisted` | 1993 | 2 | 26 | 52 | 9004 | CONTRACT |
| `fillerDetectedHoisted` | 2001 | 2 | 0 | 2 | 8146 | RESULT |
| `phaseAllowsProbeHoisted` | 2016 | 2 | 0 | 4 | 7720 | CONTRACT |
| `gateTermsHoisted` | 2021 | 2 | 0 | 3 | 9012 | CONTRACT |
| `phaseBeforeTurnHoisted` | 2022 | 2 | 0 | 2 | 9005 | CONTRACT |
| `legalityBlockHoisted` | 2023 | 1 | 0 | 1 | 9007 | CONTRACT |
| `modelProbeVerdictHoisted` | 2024 | 2 | 0 | 1 | 9023 | RESULT |
| `releasedProbeQuestionHoisted` | 2031 | 2 | 0 | 1 | 8256 | RESULT |
| `probeReleasedThisTurnHoisted` | 2037 | 2 | 0 | 3 | 8887 | RESULT |
| `priorStagnantTurnsHoisted` | 2042 | 1 | 1 | 2 | 6372 | CONTRACT |
| `priorProbeStarvedTurnsHoisted` | 2047 | 1 | 3 | 2 | 7704 | CONTRACT |
| `probeStarvationRelievedHoisted` | 2048 | 1 | 3 | 1 | 7700 | CONTRACT |
| `arbitrationWasSoleBlockerHoisted` | 2049 | 1 | 2 | 1 | 7688 | CONTRACT |
| `turnProgressHoisted` | 2050 | 2 | 0 | 8 | 8987 | RESULT |
| `signalSuppressedReasonHoisted` | 2056 | 2 | 0 | 1 | 8995 | RESULT |
| `consecutiveDontKnowsHoisted` | 2060 | 2 | 0 | 2 | 4879 | CONTRACT |
| `priorConfirmationsHoisted` | 2066 | 2 | 0 | 2 | 8818 | CONTRACT |
| `evidenceMoveHoisted` | 2073 | 2 | 8 | 17 | 8932 | CONTRACT |
| `decisionConceptIdHoisted` | 2079 | 2 | 1 | 6 | 8872 | CONTRACT |
| `decisionGranularityHoisted` | 2080 | 2 | 0 | 1 | 8877 | CONTRACT |
| `decisionProbeIdHoisted` | 2082 | 2 | 0 | 2 | 8953 | CONTRACT |
| `attemptVectorHoisted` | 2086 | 2 | 0 | 1 | 8345 | RESULT |
| `adaptationStateHoisted` | 2090 | 2 | 0 | 1 | 8344 | RESULT |
| `kernelPolicyMoveHoisted` | 2092 | 2 | 2 | 0 | 1886 | CONTRACT |
| `kernelMaxQuestionsHoisted` | 2093 | 2 | 1 | 0 | 1887 | CONTRACT |
| `routeMaxParagraphsHoisted` | 2094 | 2 | 2 | 0 | 1888 | CONTRACT |
| `kernelParityMetricsHoisted` | 2096 | 2 | 0 | 2 | 7976 | CONTRACT |
| `kernelParityTagsHoisted` | 2098 | 2 | 0 | 1 | 8344 | CONTRACT |
| `enginePolicyParityHoisted` | 2103 | 2 | 0 | 2 | 7973 | CONTRACT |
| `enginePolicyTagsHoisted` | 2105 | 2 | 0 | 1 | 8338 | CONTRACT |
| `frustrationAfterTurnHoisted` | 2107 | 2 | 0 | 3 | 7973 | RESULT |
| `frustrationBandHoisted` | 2109 | 2 | 0 | 1 | 5390 | RESULT |
| `capabilityStateHoisted` | 2123 | 5 | 5 | 5 | 7969 | RESULT |
| `requiredCapabilitiesHoisted` | 2125 | 2 | 4 | 2 | 5443 | CONTRACT |
| `capabilityObservationsHoisted` | 2130 | 3 | 0 | 3 | 8265 | RESULT |
| `legalityBlockedReasonHoisted` | 2139 | 2 | 2 | 2 | 6258 | CONTRACT |
| `evidenceStageCeilingHoisted` | 2141 | 2 | 1 | 2 | 8285 | CONTRACT |
| `evidenceWorkedExampleFirstHoisted` | 2142 | 2 | 0 | 2 | 8283 | CONTRACT |
| `evidenceAutonomyHoisted` | 2143 | 2 | 1 | 2 | 8294 | CONTRACT |
| `navigationRequestHoisted` | 2144 | 2 | 2 | 0 | 1601 | CONTRACT |
| `priorTurnUnresolvedProseMcqHoisted` | 2160 | 2 | 1 | 0 | 1973 | CONTRACT |
| `lowSignalAckHoisted` | 2167 | 2 | 1 | 4 | 7979 | CONTRACT |
| `masteryGatePendingHoisted` | 2177 | 4 | 0 | 1 | 8492 | RESULT |
| `learnerRequestHoisted` | 2178 | 2 | 16 | 6 | 8271 | CONTRACT |
| `conversationStateAfterTurnHoisted` | 2179 | 3 | 0 | 21 | 8819 | RESULT |
| `turnHistoryUpdateHoisted` | 2183 | 2 | 0 | 2 | 8385 | RESULT |
| `progressionTagsHoisted` | 2185 | 2 | 0 | 1 | 8270 | RESULT |
| `signalRepairFiredHoisted` | 2187 | 2 | 0 | 1 | 8269 | CONTRACT |
| `objectiveStateHoisted` | 2192 | 2 | 0 | 7 | 7995 | CONTRACT |
| `narrativeStateHoisted` | 2194 | 3 | 1 | 2 | 8270 | RESULT |
| `masteryCompletionSuppressedHoisted` | 2195 | 4 | 0 | 3 | 8473 | RESULT |
| `stanceViolationsHoisted` | 2199 | 2 | 0 | 1 | 8254 | RESULT |
| `isFirstLessonContextHoisted` | 2527 | 1 | 2 | 0 | 538 | CONTRACT |
| `gateMcqHoisted` | 4292 | 2 | 1 | 6 | 4611 | CONTRACT |
| `authoredProbesExistHoisted` | 4296 | 2 | 0 | 1 | 1637 | CONTRACT |
| `gateDeclinedByPolicyHoisted` | 4297 | 2 | 0 | 1 | 1637 | CONTRACT |
| `probeWouldCountThisPhaseHoisted` | 4331 | 2 | 0 | 1 | 1599 | CONTRACT |
| `observeAskViolationHoisted` | 4337 | 1 | 1 | 1 | 1637 | CONTRACT |
| `withheldModelMcqHoisted` | 4341 | 3 | 0 | 1 | 4479 | RESULT |
| `gateLeadInHoisted` | 4345 | 3 | 2 | 1 | 4563 | CONTRACT |
| `cueDecisionHoisted` | 4924 | 3 | 4 | 7 | 4184 | CONTRACT |
| `dispatchPlanHoisted` | 5137 | 2 | 6 | 6 | 3976 | CONTRACT |
| `claimChallengeActiveHoisted` | 5467 | 2 | 0 | 3 | 1990 | CONTRACT |
| `outputLanguageBlockHoisted` | 5514 | 2 | 1 | 4 | 2208 | CONTRACT |
| `signalVerificationStatusHoisted` | 6322 | 3 | 0 | 3 | 3814 | RESULT |
| `unauthoredKeyGradeHoisted` | 6323 | 2 | 0 | 5 | 2452 | RESULT |
| `gradedAgainstServerKeyHoisted` | 6328 | 2 | 0 | 5 | 4089 | RESULT |
| `eosVerifierMetricsHoisted` | 6977 | 2 | 0 | 2 | 3092 | RESULT |
| `eosVerifierTagsHoisted` | 6979 | 2 | 0 | 2 | 3554 | RESULT |
| `teachingIntegrityFellThroughHoisted` | 6986 | 2 | 0 | 3 | 3163 | RESULT |

---

## 7b. Exact declarations, grouped by verdict

Copy the annotation verbatim when writing the field. Where §4 shows `unknown | null`, the real
type is here.


### 7.1 CONTRACT (82) → TurnContract

```ts
/* L  419 */ const activeLessonSlugHoisted = lessonPointerHoisted.slug
/* L  709 */ let libraryConceptNodeIdHoisted: string | null = null
/* L  720 */ let availableVisualHoisted: string | null = null
/* L  726 */ let allowedVisualsHoisted: readonly string[] | null = null
/* L  727 */ let forceVisualRenderHoisted = false
/* L  733 */ let visualDecisionHoisted: import('@/lib/teaching/visual/types').VisualDecision | null = null
/* L  737 */ let visualGenerationCountHoisted = 0
/* L  741 */ let excursionDecisionHoisted: import('@/lib/teaching/excursion').ExcursionDecision | null = null
/* L  746 */ let excursionActiveHoisted = false
/* L  748 */ let excursionTeachingTitleHoisted: string | null = null
/* L  749 */ let conceptPreviouslyMasteredHoisted = false
/* L  758 */ let libraryDueRevisionCountHoisted = 0
/* L  766 */ let strategyHoisted: import('@/lib/school/adaptive/teachingStrategy').TeachingStrategyType | null = null
/* L  767 */ let outputBiasHoisted: import('@/lib/school/adaptive/teachingOutputBias').OutputBias | null = null
/* L  768 */ let hintBiasHoisted: import('@/lib/school/adaptive/teachingOutputBias').HintBiasKind | null = null
/* L  774 */ let strategyTopicSlugHoisted: string | null = null
/* L  786 */ let pendingMcqHoisted: import('@/lib/teaching/mcq').TutorMCQ | null = null
/* L  799 */ let lessonKeyThisTurnHoisted: string | null = null
/* L  801 */ let isBareAckHoisted = false
/* L  803 */ let mcqGradeHoisted: { chosenIndex: number | null; correct: boolean | null } | null = null
/* L  811 */ let questionLedgerHoisted: import('@/lib/teaching/repetitionGuard').QuestionLedger = { fingerprints: [], recent: [], optionSetFingerprints: [], recentOptionSets: [] }
/* L  820 */ let lessonCompletedHoisted = false
/* L  828 */ let lessonCompletionRespectsNewIntentHoisted = false
/* L  829 */ let teachingHistoryHoisted: import('@/lib/teaching/teachingHistory').TeachingHistory | null = null
/* L  830 */ let selectedStrategyHoisted: number | null = null
/* L  831 */ let retrievalCacheHoisted: import('@/lib/teaching/retrievalCache').RetrievalCache | null = null
/* L  832 */ let conversationDecisionHoisted: import('@/lib/teaching/conversationDecision').ConversationDecision | null = null
/* L  848 */ let teachingStepUpdateHoisted: { teachingStepIndex: number; teachingStepConceptId: string } | null = null
/* L 1943 */ let placementLevelHoisted: 'intermediate' | 'advanced' | null = null
/* L 1944 */ let placementAskedProbeHoisted: 'below' | 'at' | 'above' | null = null
/* L 1946 */ let placementPrevHoisted: import('@/lib/teaching/placementVerification').PlacementVerificationState | null = snapshotPlacement
/* L 1947 */ let placementInheritedHoisted = false
/* L 1951 */ let firstLessonActiveHoisted = false
/* L 1962 */ let persistedEpisodeHoisted: import('@/lib/teaching/sessionLifecycle').SessionEpisode | null = null
/* L 1963 */ let sessionEpisodeFreshHoisted = false
/* L 1968 */ let recoveryKeyHoisted: import('@/lib/teaching/recoveryGuard').FailureStateKey | null = null
/* L 1983 */ let turnArbitrationHoisted: import('@/lib/teaching/turnArbitration').TurnArbitration | null = null
/* L 1989 */ let knowledgeGapHoisted: import('@/lib/teaching/knowledgeGap').KnowledgeGap | null = null
/* L 1993 */ let conversationStateHoisted: import('@/lib/teaching/conversationState').ConversationState | null = null
/* L 2016 */ let phaseAllowsProbeHoisted = false
/* L 2021 */ let gateTermsHoisted: Record<string, boolean> | null = null
/* L 2022 */ let phaseBeforeTurnHoisted: string | null = null
/* L 2023 */ let legalityBlockHoisted: string | null = null
/* L 2042 */ let priorStagnantTurnsHoisted = 0
/* L 2047 */ let priorProbeStarvedTurnsHoisted = 0
/* L 2048 */ let probeStarvationRelievedHoisted = false
/* L 2049 */ let arbitrationWasSoleBlockerHoisted = false
/* L 2060 */ let consecutiveDontKnowsHoisted = 0
/* L 2066 */ let priorConfirmationsHoisted = 0
/* L 2073 */ let evidenceMoveHoisted: string | null = null
/* L 2079 */ let decisionConceptIdHoisted: string | null = null
/* L 2080 */ let decisionGranularityHoisted: import('@/lib/teaching/teachingGranularity').TeachingLevel | null = null
/* L 2082 */ let decisionProbeIdHoisted: string | null = null
/* L 2092 */ let kernelPolicyMoveHoisted: import('@/lib/kernel/policyMove').MappedMove | null = null
/* L 2093 */ let kernelMaxQuestionsHoisted: 0 | 1 = 0
/* L 2094 */ let routeMaxParagraphsHoisted: number | null = null
/* L 2096 */ let kernelParityMetricsHoisted: import('@/lib/kernel/parity').ParityMetrics | null = null
/* L 2098 */ let kernelParityTagsHoisted: string[] = []
/* L 2103 */ let enginePolicyParityHoisted: import('@/lib/kernel/parity').ParityMetrics | null = null
/* L 2105 */ let enginePolicyTagsHoisted: string[] = []
/* L 2125 */ let requiredCapabilitiesHoisted: import('@/lib/teaching/capabilityModel').CapabilityId[] = []
/* L 2139 */ let legalityBlockedReasonHoisted: import('@/lib/teaching/questionLegality').LegalityReason | null = null
/* L 2141 */ let evidenceStageCeilingHoisted: number | null = null
/* L 2142 */ let evidenceWorkedExampleFirstHoisted = false
/* L 2143 */ let evidenceAutonomyHoisted = false
/* L 2144 */ let navigationRequestHoisted = false
/* L 2160 */ let priorTurnUnresolvedProseMcqHoisted = false
/* L 2167 */ let lowSignalAckHoisted = false
/* L 2178 */ let learnerRequestHoisted: import('@/lib/teaching/masteryGate').LearnerRequest | null = null
/* L 2187 */ let signalRepairFiredHoisted = false
/* L 2192 */ let objectiveStateHoisted: import('@/lib/teaching/objectiveModel').ObjectiveState | null = null
/* L 2527 */ const isFirstLessonContextHoisted = isFirstLessonContext({ isSchoolMode: false, currentLevel: profile?.currentLevel, currentLessonOrder: lessonCtx?.currentLesson, completedLessonCount: studentProgress?.completedLessons?.length ?? 0, // The stage machine's phase — the missing "progress within lesson // one" dimension. Without it the protocol re-asserted itself on // every turn and D0c preempted the whole progression ladder. See // isFirstLessonContext()'s own note for the production evidence.
/* L 4292 */ let gateMcqHoisted: import('@/lib/teaching/mcq').TutorMCQ | null = null
/* L 4296 */ let authoredProbesExistHoisted: boolean | null = null
/* L 4297 */ let gateDeclinedByPolicyHoisted = false
/* L 4331 */ let probeWouldCountThisPhaseHoisted = false
/* L 4337 */ let observeAskViolationHoisted = false
/* L 4345 */ let gateLeadInHoisted: string | null = null
/* L 4924 */ let cueDecisionHoisted: import('@/lib/understanding/decisionEngine').TeachingDecision | null = null
/* L 5137 */ let dispatchPlanHoisted: import('@/lib/understanding/dispatcher').DispatchPlan | null = null
/* L 5467 */ let claimChallengeActiveHoisted = false
/* L 5514 */ let outputLanguageBlockHoisted = ''

```

### 7.2 RESULT (31) → TurnDelivery

```ts
/* L  777 */ let hintHoisted: string | null = null
/* L  781 */ let mcqHoisted: import('@/lib/teaching/mcq').TutorMCQ | null = null
/* L  807 */ let lessonCompletionHoisted: import('@/lib/teaching/lessonCompletion').LessonCompletionPayload | null = null
/* L  816 */ let consecutiveOutagesHoisted = 0
/* L 1954 */ let sessionEpisodeHoisted: import('@/lib/teaching/sessionLifecycle').SessionEpisode | null = null
/* L 2001 */ let fillerDetectedHoisted = false
/* L 2024 */ let modelProbeVerdictHoisted: string | null = null
/* L 2031 */ let releasedProbeQuestionHoisted: string | null = null
/* L 2037 */ let probeReleasedThisTurnHoisted = false
/* L 2050 */ let turnProgressHoisted: { outcome: import('@/lib/teaching/turnProgress').TurnOutcome stagnantTurns: number rung: number probeHeldTurns: number } | null = null
/* L 2056 */ let signalSuppressedReasonHoisted: string | null = null
/* L 2086 */ let attemptVectorHoisted: import('@/lib/evidence-spine/types').AttemptVectorV2 | null = null
/* L 2090 */ let adaptationStateHoisted: import('@/lib/teaching/adaptation/asv').AdaptationStateVector | null = null
/* L 2107 */ let frustrationAfterTurnHoisted: import('@/lib/kernel/frustration').FrustrationMachine | null = null
/* L 2109 */ let frustrationBandHoisted: 'calm' | 'strained' | 'flooded' | null = null
/* L 2123 */ let capabilityStateHoisted: import('@/lib/teaching/capabilityModel').CapabilityState | null = null
/* L 2130 */ let capabilityObservationsHoisted: import('@/lib/teaching/capabilityModel').CapabilityObservation[] = []
/* L 2177 */ let masteryGatePendingHoisted = false
/* L 2179 */ let conversationStateAfterTurnHoisted: import('@/lib/teaching/conversationState').ConversationState | null = null
/* L 2183 */ let turnHistoryUpdateHoisted: Record<string, unknown> | null = null
/* L 2185 */ let progressionTagsHoisted: string[] = []
/* L 2194 */ let narrativeStateHoisted: import('@/lib/teaching/narrativeTracker').NarrativeState | null = null
/* L 2195 */ let masteryCompletionSuppressedHoisted = false
/* L 2199 */ let stanceViolationsHoisted: import('@/lib/teaching/stanceEnforcement').StanceViolationCode[] = []
/* L 4341 */ let withheldModelMcqHoisted: import('@/lib/teaching/mcq').TutorMCQ | null = null
/* L 6322 */ let signalVerificationStatusHoisted: 'CLEAN' | 'SUSPICIOUS' | 'CONTRADICTED' = 'CLEAN'
/* L 6323 */ let unauthoredKeyGradeHoisted = false
/* L 6328 */ let gradedAgainstServerKeyHoisted = false
/* L 6977 */ let eosVerifierMetricsHoisted: import('@/lib/kernel/verifier').VerifierMetrics | null = null
/* L 6979 */ let eosVerifierTagsHoisted: string[] = []
/* L 6986 */ let teachingIntegrityFellThroughHoisted = false

```

### 7.3 DEAD (2) → leave in place (see §2.2)

```ts
/* L  759 */ let libraryLessonPlanHoisted: import('@/lib/school/adaptive/lessonPlanner').LessonPlan | null = null
/* L  761 */ let lessonStageProgressHoisted: { conceptId: string; planSignature: string; stageIndex: number; totalStages: number } | null = null

```

### 7.4 LOCAL (1) → leave alone

```ts
/* L  415 */ const lessonPointerHoisted = resolveSessionLessonSlug({ sessionSnapshot: snapshot, activeLessonSlug: studentProgress?.activeLessonSlug ?? null, })
```

---

## 8. Non-goals — restated for whoever executes this

Each of these is a real temptation with a specific reason against it. They are not boilerplate.

1. **Does not change what any teaching decision IS, only what type represents it.** Every field is
   copied from an existing authority. If a value on the contract differs from the value the
   `Hoisted` local held at the same point, that is a migration defect — revert it.

2. **Does not touch grading, mastery certification, or the K5 verifier.** `gradeMcqAnswer`,
   `masteryVerifiedStrict`, `conceptMasteryVerdict`, `probeKeyIsAuthored`,
   `conversationState`'s `verified = evidence.serverGraded === true` — all stay exactly as
   authoritative as they are today. `masteryCounterInvariant.test.ts` proves the counter invariant
   over 49,152 states; **that proof must still pass, unmodified, after every batch.**
   `certifies()` in §4.1 is a *name* for the existing rule, not a new rule.

3. **Does not re-enable any verifier flag and does not add a composed verification pass.**
   `ENABLE_OUTPUT_VERIFIER` / `ENABLE_EOS_RUNTIME` stay unset. `src/lib/kernel/verifier/rules.ts`
   stays off, for the reason recorded at `route.ts` L7097-7101: reusing that gate with a
   deliberately permissive context fails because V-Q2 rejects any TEACH/SHOW/RECOVER/CLOSE draft
   ending in a question, so *"a 'permissive' context is not actually reachable"*. The
   `vAffirm` floor (L7108/L7172) and the `V-CHALLENGE` floor stay exactly as they are.
   `assertDeliverySatisfiesContract` checks the turn against itself, never against the world.

4. **Does not touch curriculum, KG, Educational Brain, or Blueprint content, in any subject.** No
   file under `docs/*/kg/`, `docs/curriculum/blueprints/`, `educational-brain/`, or any
   `*SeedAssets.ts` is opened.

5. **Does not add a DB migration, a table, a column, or a snapshot key.** Both objects are
   in-memory, per-request. The shadow assertion logs a line; it writes nothing. (Standing reason:
   the 2026-08-31 egress incident.)

6. **Does not make `cleanText` immutable.** 42 repair passes rewrite it. Freezing the text is a
   rewrite of `route.ts`; this is not one. `TurnDelivery` freezes the *facts* the passes read, not
   the prose they produce.

7. **Does not delete, weaken, or retarget a guard test.** Where an assertion pins an old literal,
   keep the original verbatim in a dated comment and re-assert the same invariant against the new
   shape — the discipline already used throughout this repository.

8. **Does not fix §2.2.** `lessonStageProgress` having no writer is a real finding and a separate
   decision. Report it; do not repair it inside a refactor.

9. **Does not widen `resolveMcqChoice`, disable the textarea, or change any detector.** Those were
   each considered and rejected on their own merits in earlier sessions (I1, 2026-09-02). Nothing
   here revisits them.

10. **Does not build the V2 primitives this one enables.** The Physics Verifier (§4.2), the
    learner-move interpreter (§4.3) and the durable learner model (§4.4) each need one place to
    attach to, which is why the Turn Contract is first. They are still separately gated.

---

## 9. Risks, stated rather than discovered later

| Risk | Why it is real | Mitigation in this plan |
|---|---|---|
| A batch silently changes behaviour | 1150 read sites; a single mis-assignment in Batch 7 (`contract.ladder` vs `delivery.after`) is a genuine teaching change | Batch 7 is last, with every other batch landed and the harness green; byte-identical replay is the exit criterion |
| The contract becomes a second decision engine | This repository has grown two before (`src/lib/educationalBrain/*`, the deleted `teachingActionEngine.ts`) | `turnContract.ts` MUST import no detector and contain no threshold or regex. Assert it structurally, the way `turnProgress.test.ts` asserts C1-C4 against its own source |
| The assertion function grows into the composed verifier | Every new incident will want a clause here | A1-A10 are closed. Adding A11 requires a measured production violation, not an argument — the same bar `turnProgress` sets for a fourth counter |
| `compileTurnContract` is called before a field is set | 82 fields, assigned across 5,600 lines | Compile at ONE point (just before L5763), where every contract-class local has had its last pre-model write. Batch 1's shadow log reports any field that is null when its `Hoisted` twin is not |
| Batch 4 lands on an unproven A6 | §3 D4 is explicitly unresolved | A6 clean-in-shadow is a **precondition** of Batch 4, written into the batch table |
| Context exhaustion mid-batch | `route.ts` is 11,199 lines; Batch 7 touches ~220 read sites | Nine batches, each one commit. Batches 4 and 7 are pre-authorised to split |

---

## 10. What was verified this session, and what was not

**Verified** (commands and line numbers throughout; re-runnable):

* All counts in §1, measured against `d3e17ae`.
* The classification of all 116 locals (§2, §7), by a mechanical rule stated in full.
* The two DEAD stores, checked individually by `grep` (§2.1) — and `lessonStageProgress` having
  **zero writers in all of `src/`** (§2.2).
* D1: two `probeKeyIsAuthored` call sites, 62 lines apart, and the function's one-line body.
* D2: the single write to `mcqGradeHoisted` at L2481 and its guard, plus the four downstream
  re-guards.
* D3: three double-duty locals, with overwrite lines, and the two hand-made before/after splits
  (`persistedEpisodeHoisted`, `conversationStateAfterTurnHoisted`) that already exist.
* D4: six `mcqToServe` call sites, six aliases, and the `mcqHoisted = null` at L10040 between the
  persist (L9762) and the response (L10914); plus the exact text of the guard test that cannot
  see it.
* D5: the comment at L10772-10783 and the fourth conjunct added to close it.
* Name availability: `TurnContract`, `TurnDelivery`, `turnContract`, `assertDeliverySatisfiesContract`
  → 0 hits. `TurnOutcome` → **taken** (`turnProgress.ts:79`). `TurnResult` → **taken**
  (`turnHarness.ts:77`).
* `src/tests/support/turnHarness.ts` is the only test importing the route module
  (`grep -rl "from '@/app/api/learn/chat/route'" src/tests` → 1 file, of 671 test files).

**NOT verified, and not claimed:**

* **No code was written, compiled, or run.** `node_modules` is absent in this container; no
  `tsc`, no suite, no build. The executor must establish a baseline before Batch 0.
* **No production traffic was inspected** and no live session was driven. Every statement above is
  static analysis of the repository at `d3e17ae`.
* **D4's reachability is open.** Whether the persist and the response can actually disagree for a
  real learner is exactly what A6 in shadow mode is for. It is written up as a question, not a
  defect, and must not be reported as one.
* **The batch sizes are estimates** from read-site counts, not from attempted diffs. Batches 4
  and 7 are the two most likely to need splitting, and the plan says so.

---

## 11. Relationship to existing documents

* `PHYSICS_TEACHER_MIGRATION_ARCHITECTURE.md` §4.1 — this is that proposal, narrowed to the
  representation change and with the naming collision fixed. §4.1's I2, I3, I7, I8 and I10 are
  the "genuinely new" invariants; this design implements **none** of them, because each would
  change behaviour. It implements the checkable form of I1, I4, I5, I6, I9 and adds A2-A4, which
  come from defects measured since that document was written.
* `PHYSICS_TEACHER_MIGRATION_ARCHITECTURE.md` §9 Step 1 — this is that step, planned.
* `PHASE3_ARBITRATION_AUDIT.md` — `turnArbitration` is consumed, never reimplemented.
* `PHASE5_LESSON_INTEGRITY_AUDIT.md` — the grading/evidence architecture it found correct is
  untouched (§8.2).
* `EDUCATIONAL_BRAIN_BIBLE.md` and the ADR set are **not** reopened. This changes no engine's
  responsibility, so no ADR is superseded and the Bible needs no edit. If an executor finds
  themselves editing the Bible, the scope has drifted.
* `TUTOR_REMEDIATION_PLAN.md` — see §11.1; the plan currently **defers** this work.

### 11.1 Governance — this document is not an authorization

`TUTOR_REMEDIATION_PLAN.md` §2.0 currently lists **"DEFERRED: the four primitives (Item 4) —
12-16 sessions, not scheduled"**, and Item 4's own header says *"Deferred by §2.0 on the strength
of §9 objection 5."*

So the plan this design serves has, as of `d3e17ae`, **deferred the whole of Item 4 including
4.1.** Producing this brief does not change that. Executing Batch 0 needs a separate owner
decision, exactly as the standing G1/G2 governance rule in `CLAUDE.md` requires for production
code.

Recorded because the argument for deferral does not obviously transfer, and the next reader
should judge that themselves rather than inherit either conclusion. Objection **9.5** is
*"Item 4 is Chesterton's fence, sixty-three times over"*, and its content is about the
**interpreter** (Item 4.2): *"The 63 detector-shaped predicates and 60 regex constants are ugly
**because** each encodes a real production failure… A clean closed-taxonomy interpreter does not
inherit that knowledge. It re-learns it, in production, on learners."*

That objection is correct and decisive **against 4.2**. Against 4.1 it does not apply on its own
terms: the Turn Contract **deletes no detector, no regex, and no override.** Every one of the ~20
post-hoc overrides survives as a named clause carrying its original comment; §6's rules 3 and 4
forbid dropping either the behaviour or the guard test that pins it. Nothing is re-learned,
because nothing is unlearned.

Against 4.1 the real objections are the ones in §9 of *this* document — chiefly that Batch 7
touches ~220 read sites in the file that serves every learner — plus 9.6 (cost) and 9.2 (zero
traffic, which specifically weakens the shadow phase, since Batch 1 measures A6 against traffic
that may not exist). **An owner weighing this should weigh those, not 9.5.**

### 11.2 A stale figure in two documents

Both `TUTOR_REMEDIATION_PLAN.md` §2 Item 4.1 and `PHYSICS_TEACHER_MIGRATION_ARCHITECTURE.md` §9
describe the surface as **"~40 `…Hoisted` locals plus ~20 post-hoc overrides."** Measured this
session at `d3e17ae`:

```
grep -cE "^\s*(let|const)\s+\w*Hoisted\b" src/app/api/learn/chat/route.ts   → 116
grep -cE "^\s+cleanText = " src/app/api/learn/chat/route.ts                    → 42
```

**116, not ~40 — roughly three times the figure both documents carry**; and 42 `cleanText`
rewrites against "~20 overrides". Neither is corrected in place here (they are other documents'
records of what was true when written, and this repository's convention is to record supersession
rather than rewrite the past). The cost estimates in both were computed from the smaller number.


---

## 12. Definition of done for the design (this document)

- [x] Full TypeScript for both types, with the naming collision identified and avoided
- [x] All 116 `Hoisted` locals classified by a stated mechanical rule, with exact annotations
- [x] The assertion function's invariant list, each mapped to a defect class, each marked
      believed-true or shadow-only
- [x] A numbered batch order, each batch one commit, with a stated dependency and a stated
      precondition where one exists
- [x] Explicit non-goals
- [x] Risks, and a separation of what was verified from what was not

**Not done, by design:** no `route.ts` code, no new module on disk, no test. Those are Batch 0.
