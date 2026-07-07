# Teaching Strategy Engine — Architecture Specification

> Status: FINAL spec (architecture only — no implementation).
> Target file for integration: `src/app/api/learn/chat/route.ts`.
> Backbone lens: **strategy-to-action-bridge**, with grafts from **minimal-resolver**
> (pure synchronous resolver, single-source-of-truth) and **policy-taxonomy**
> (fired-rule trace + `contextSnapshot` persistence for observability/anti-thrash).

---

## 1. Purpose & Scope

### Purpose
Today the My Tutor chat route already *computes* a single unified teaching strategy per
turn (`getTeachingStrategy()` at `route.ts:495-498`) and injects it into the system prompt
(`buildTeachingStrategyBlock()` at `route.ts:498`). That strategy object is then **discarded**
before the post-AI output pipeline runs. The pipeline that decides whether a turn carries a
2D visual or a 3D scene (`route.ts:1118-1162`) is a *separate, purely text/keyword-driven*
stage that never sees the pedagogical strategy.

This spec defines a **Teaching Strategy Engine** that closes that gap by making the
already-computed strategy the explicit, single source of pedagogical truth for the turn, and
by letting it cast an **advisory bias** over the output-attachment pipeline — so that *how* we
teach (strategy) and *what artifact* we attach (visual/scene/text) are consistent, instead of
the artifact decision being blind to strategy.

It does this **additively**: it does not replace `determineStrategy()`, `getTeachingStrategy()`,
`buildTeachingStrategyBlock()`, the visual pipeline, or `getNextBestAction()`.

### In scope
- One explicit "Student State → Strategy → Action" decision flow, documented and testable.
- Surfacing the existing per-turn `TeachingStrategy` to the output pipeline via a hoisted const
  (idiomatic to this file).
- A pure, synchronous mapping from the existing 7-strategy taxonomy to an **advisory output bias**
  that *arbitrates candidates already produced* by the existing pipeline (never fabricates one).
- A machine-assertable selection trace (`firedRuleIndex`) and snapshot persistence for tests and
  cross-turn stability.

### Non-goals (explicit)
- **No UI or navigation redesign.** The chat screen, dashboard, and routing are untouched.
- **No changes to Hindi/Sanskrit subject architecture.**
- **No "what chapter/lesson next" changes.** That is `getNextBestAction()`
  (`src/lib/school/adaptive/nextBestAction.ts`), used by the dashboard, and stays out of the
  chat route entirely.
- **No new LLM calls, no new DB tables, no migration.** Reuses existing engines and the existing
  `learnSession.contextSnapshot` JSON.
- **Spec only.** Illustrative TypeScript type sketches appear below; no function bodies ship here.

---

## 2. Current State (file/line facts)

### 2.1 Strategy is computed, then thrown away
- `route.ts:488-501` — the "Unified Teaching Strategy" block (Sprint CW). Inside a non-fatal
  `try { … } catch { /* non-fatal */ }`:
  - `const teachingStrategy = await getTeachingStrategy(...)` (`495-497`)
  - `systemPrompt += buildTeachingStrategyBlock(teachingStrategy)` (`498`)
  - The `teachingStrategy` const is **block-scoped inside this `try`**. It never escapes to the
    output pipeline ~620 lines later.
- `src/lib/school/adaptive/teachingStrategy.ts`:
  - `determineStrategy(...)` (`:126-169`) is a **pure, nullable-input, ordered, first-match-wins**
    function over a **7-strategy** union `TeachingStrategyType` (`:28-35`). It already collapses all
    five adaptive signals (mastery, misconception, transfer, confidence, momentum) into one type.
  - `getTeachingStrategy(...)` (`:198-261`) does a `Promise.all` of the five engines (`:206-227`)
    and returns `TeachingStrategy` (`:37-49`): `{ type, priority, reason, tutorInstructions[],
    insight, insightDetail }`.
  - `buildTeachingStrategyBlock(strategy)` (`:269-279`) emits the `ACTIVE TEACHING STRATEGY` prompt
    block.

### 2.2 Strategy is otherwise implicit across ~20 prompt blocks
In SCHOOL MODE (`route.ts:274-739`) ~20 specialized blocks each append guidance to `systemPrompt`,
each wrapped in its own non-fatal `try/catch` (curriculum scope `288-305`, checkpoint eval
`314-384`, student status `388-414`, mastery `416-429`, misconception `431-445`, transfer `447-460`,
confidence `462-477`, momentum `479-486`, **unified strategy `488-501`**, narrative `503-516`,
daily plan `518-529`, guided teaching `531-548`, learning profile `550-570`, worked examples
`572-597`, navigator `599-613`, lesson plan `615-638`, spaced revision `640-649`, prerequisite
recovery `651-669`, exam readiness `671-683`, mock-test `685-709`, revision notes `711-722`,
visual aids `724-738`). The *effective* strategy the LLM follows is the sum of these; only block
`488-501` names it explicitly.

### 2.3 Output-type attachment is a separate, post-AI, text-driven pipeline
After the AI call (`route.ts:1051-1069`), the deterministic output pipeline (`1075-1162`):
- strips the tutor's `VISUAL:<type>` tag → `responseVisual` (`1075-1087`),
- `planVisualTeaching(cleanText).spec` → 2D visual `detectedVisualSpec` (`1118-1120`),
- `buildSceneSpec(cleanText)` → deterministic 3D `detectedSceneSpec`, only if no 2D fired
  (`1127-1132`),
- `generateRoutedScene(cleanText)` (parametric 3D, flag-gated, `1144-1148`),
- `generateSceneSpec(cleanText)` (AI 3D, flag-gated, off by default, `1158-1162`).
- **Final invariant** (`1171-1173`): if any deterministic spec fired, suppress the tutor's own
  `VISUAL:<type>` tag — "never two visuals for one explanation".

Every one of these takes `cleanText` (or a flag) as input. **None takes a strategy parameter.**
There is currently no seam through which the pedagogical strategy can influence the artifact choice.

Note on module location: the consumed `planVisualTeaching()` (and the helper `selectTeachingStrategy()`
whose name collides with the adaptive side) are **both exported from
`src/lib/visuals/teachingStrategy.ts`** (`:191-217`), which is a *different* file from the adaptive
`src/lib/school/adaptive/teachingStrategy.ts` that owns `getTeachingStrategy`/`determineStrategy`. The
two same-named modules are why the new bias helper must be deliberately co-located on the adaptive side
(Section 5b). `planVisualTeaching()` returns `TeachingPlan { strategy, spec }`; its `spec` is the
object whose `interactive` / `challenge` fields define "optional" in Section 4 — read by the route, not
by importing the visuals module.

### 2.4 State already available before line 498
- Hoist precedents declared at `route.ts:268-270`: `learnerProfHoisted`, `lessonPlanHoisted`,
  `prereqGapHoisted` (all `let … = null`, surfaced out of the `if (schoolCtx)` block so later
  snapshot writes at `1183-1207` can read them).
- `learnerProf` / `learnerProfHoisted` are **assigned at `route.ts:316-317`** (inside the
  checkpoint block `314-384`) via `buildLearningProfile(...)`, which runs **before** the strategy
  block at `488`. `learnerProf.preferredLearningStyle` (`'VISUAL'|'PRACTICAL'|'THEORETICAL'|
  'BALANCED'`) is therefore in scope at line 498. (The line-554 statement is a `??` *re-use*, not
  the first assignment.)
- `learnSession.contextSnapshot` JSON is persisted at `route.ts:1183-1212` and already holds
  `lastSuccessfulTeachingStyle`, `currentConceptNodeId`, `lastPrerequisiteGap`,
  `currentWorkedExample`, etc.

### 2.5 The gap, stated precisely
There is **no single explicit "strategy → action" step**. Strategy is computed then dropped; the
artifact decision is keyword-only and strategy-blind. Closing the gap requires *surfacing the
existing strategy object* to the existing pipeline and giving the pipeline an *advisory arbiter* —
not a new strategy system.

---

## 3. Decision Flow: Student State → Strategy → Action

```
                         ┌──────────────────────────────────────────────┐
                         │  STUDENT STATE  (already loaded per request)   │
                         │                                                │
   masteryLevel ─────────┤ MasteryProfile.masteryLevel                    │
   topMisconception ─────┤ Misconception[].confidence (HIGH/MED/LOW)      │
   transferLevel ────────┤ ConceptTransfer.level                          │
   calibration ──────────┤ ConfidenceProfile.calibration                  │
   momentumLevel ────────┤ LearningMomentum.level                         │
   preferredLearningStyle┤ LearningProfile.preferredLearningStyle         │
                         └───────────────────────┬────────────────────────┘
                                                 │
                       getTeachingStrategy()  (route.ts:495-498, EXISTING)
                       → determineStrategy()  ordered first-match-wins (7 rules)
                                                 │
                                                 ▼
                         ┌──────────────────────────────────────────────┐
                         │   STRATEGY  (single source of pedagogical truth)│
                         │   TeachingStrategy { type, priority, reason }   │
                         │   + firedRuleIndex (NEW, machine-assertable)    │
                         └───────────────────────┬────────────────────────┘
                       ┌─────────────────────────┴─────────────────────────┐
                       ▼                                                     ▼
        (A) PROMPT DIRECTIVE  (EXISTING)                  (B) OUTPUT BIAS  (NEW, advisory)
        buildTeachingStrategyBlock(strategy)              deriveOutputBias(strategy.type)
        → systemPrompt += …  (route.ts:498)               → 'PROMOTE'|'SUPPRESS_OPTIONAL'|'NEUTRAL'
                       │                                                     │
                       ▼                                                     │
                  routeAI(...)  (route.ts:1051-1069)                         │
                       │                                                     │
                       ▼                                                     ▼
        ┌─────────────────────────────────────────────────────────────────────────────┐
        │  OUTPUT-ATTACHMENT PIPELINE  (route.ts:1118-1173, EXISTING, text-driven)       │
        │                                                                                │
        │  planVisualTeaching(cleanText) → detectedVisualSpec                            │
        │  buildSceneSpec(cleanText)     → detectedSceneSpec   (if no 2D)                │
        │  generateRoutedScene / generateSceneSpec (flag-gated)                          │
        │                                                                                │
        │  ── NEW advisory arbitration (between candidate detection and the guard) ──    │
        │     • PROMOTE          : if NO deterministic spec fired, do NOT suppress the    │
        │                          tutor's own VISUAL tag (loosen suppression only)       │
        │     • SUPPRESS_OPTIONAL: drop an OPTIONAL deterministic visual — i.e. one whose   │
        │                          spec has interactive===false && no challenge payload —   │
        │                          UNLESS the student explicitly asked for one (keyword in  │
        │                          `message`); REQUIRED (interactive/challenge) visuals stay │
        │     • NEUTRAL          : today's behavior, unchanged                            │
        │                                                                                │
        │  Final invariant (route.ts:1171-1173, UNTOUCHED):                              │
        │     if (detectedVisualSpec || detectedSceneSpec) responseVisual = null          │
        └─────────────────────────────────────────────────────────────────────────────┘
                                                 │
                                                 ▼
                    Response JSON { success, text, visual?, sceneSpec?, provider }
```

**Action selection clarification.** The engine does **not** invent a new teaching action. The nine
existing actions (text chat, 2D visual, 3D scene, practice, assessment, checkpoint, revision-notes
hint, quiz, flashcards) remain selected exactly as today. The engine only (a) confirms strategy as
the single pedagogical truth that drives the prompt, and (b) casts an *advisory bias* over which of
the **already-produced** visual/scene candidates survives. "Strategy → action" here means
"strategy biases artifact arbitration", not "strategy fabricates new actions".

---

## 4. Strategy Taxonomy (ordered, with exact state fields and resulting actions)

The taxonomy is the **existing** `TeachingStrategyType` union and the **existing**
`determineStrategy()` priority rules (`teachingStrategy.ts:126-169`). It is reproduced verbatim — no
strategy is added, renamed, or dropped (notably `CONFIDENCE_BUILDING` is retained). The only new
column is **Output Bias**, the advisory mapping this engine introduces.

**Definition of an "optional" deterministic visual (predicate over existing fields).** Several rows
below say `SUPPRESS_OPTIONAL` *drops an OPTIONAL deterministic visual*. "Optional" is **not** a new
data field — it is a pure predicate read off the artifact `planVisualTeaching()` already returns.
`planVisualTeaching(cleanText)` returns `TeachingPlan { strategy, spec }`
(`src/lib/visuals/teachingStrategy.ts:191-217`); when a 2D visual fires, `spec` is a `VisualSpec`
carrying `spec.interactive` (mirrored from `strategy.interaction`, `:216`) and an **optional**
`spec.challenge` payload (present only when `strategy.assessment`, `:213,217`). We define:

> A detected 2D visual is **OPTIONAL** ⟺ `detectedVisualSpec.interactive === false`
> **AND** `detectedVisualSpec.challenge` is absent (no `challenge` payload). A visual that is
> interactive **or** carries a `challenge` is **REQUIRED** (interaction/assessment-critical) and is
> **never** dropped by `SUPPRESS_OPTIONAL`.

This predicate reads only fields that already exist on the returned `TeachingPlan.spec`; it persists
nothing. It is the single definition of "optional" used everywhere in this spec, and is listed as new
(pure) logic in Section 5(b)/(c).

| # (firedRuleIndex) | Strategy | Trigger — exact state fields & condition | Existing prompt directive (tutorInstructions) | Output Bias (NEW, advisory) |
|---|---|---|---|---|
| 1 | `FOUNDATION_REBUILD` | `MasteryProfile.masteryLevel === 'AT_RISK'` | First principles, concrete examples, simple checks | **PROMOTE** — first-principles teaching benefits from a visual; if the tutor offered one and no deterministic spec fired, let its `VISUAL:` tag survive |
| 2 | `MISCONCEPTION_REPAIR` | `Misconception[].confidence` top = `'HIGH'`, **or** `masteryLevel === 'FALSE_MASTERY'` && any misconception present | Surface reasoning first, contrast wrong vs right model | **PROMOTE** — a side-by-side contrast visual aids correction |
| 3 | `MOMENTUM_RECOVERY` | `LearningMomentum.level ∈ {'DISENGAGEMENT_RISK','DECLINING_MOMENTUM'}` | Short completable tasks, open with a known win | **SUPPRESS_OPTIONAL** — keep turns light; drop an OPTIONAL visual (`spec.interactive === false && !spec.challenge`) unless the student explicitly asked for one (keyword in `message`) |
| 4 | `CONFIDENCE_CORRECTION` | `ConfidenceProfile.calibration === 'OVERCONFIDENT'` && `masteryLevel === 'FALSE_MASTERY'` | Probe "why", challenge unverified claims | **SUPPRESS_OPTIONAL** — an OPTIONAL (`spec.interactive === false && !spec.challenge`), unrequested diagram is noise while probing reasoning |
| 5 | `APPLICATION_FOCUS` | `ConceptTransfer.level === 'TRANSFER_WEAK'` && `masteryLevel ∈ {'TRUE_MASTERY','DEVELOPING'}` (also the solid-mastery default) | Real-world transfer problems, novel scenarios | **NEUTRAL** — keep today's keyword behavior |
| 6 | `CONFIDENCE_BUILDING` | `ConfidenceProfile.calibration === 'UNDERCONFIDENT'` | Acknowledge correctness, recall earlier wins | **SUPPRESS_OPTIONAL** — reassurance turns stay focused; drop OPTIONAL (`spec.interactive === false && !spec.challenge`) visuals, honor explicit requests |
| 7 | `ACCELERATED_GROWTH` | `masteryLevel === 'TRUE_MASTERY'` && `transferLevel === 'TRANSFER_STRONG'` && `momentumLevel ∈ {'STRONG_MOMENTUM','STABLE_MOMENTUM'}` (also the terminal fallback) | Extension/edge cases, derivations, brisk pace | **NEUTRAL** |

**Learning-style cross-modulation (advisory, ships in v1).** `learnerProf.preferredLearningStyle`
is in scope at line 498 (assigned at `316-317`). It nudges the bias **without overriding strategy**:
- `'VISUAL'`: a `NEUTRAL` bias is upgraded toward `PROMOTE`; a `SUPPRESS_OPTIONAL` bias is softened to
  `NEUTRAL` (never below, never overriding an explicit `PROMOTE`/`SUPPRESS` derived from strategy).
- `'PRACTICAL'` / `'THEORETICAL'`: no change to artifact bias in v1 (these bias *prompt prose* only).
- `'BALANCED'` / `null`: strategy default applies unchanged.

`firedRuleIndex` is the 1-based row number above (1 = highest priority). It is the rule that
`determineStrategy` matched, computed by re-evaluating the same ordered predicates over the same
inputs — making the priority table directly unit-assertable.

---

## 5. What Already Exists vs What Is New

### (a) Existing engines / state / actions reused VERBATIM (no edits)
- `getTeachingStrategy()`, `determineStrategy()`, `buildTeachingStrategyBlock()`,
  `TeachingStrategy`, `TeachingStrategyType` — `src/lib/school/adaptive/teachingStrategy.ts`.
- All five signal engines invoked inside `getTeachingStrategy` (`masteryIntelligence`,
  `misconceptionEngine`, `conceptTransfer`, `confidenceCalibration`, `learningMomentum`).
- `learnerProf` / `learnerProfHoisted` and `LearningProfile.preferredLearningStyle`
  (`learningProfile.ts`), already assigned at `route.ts:316-317`.
- The entire output pipeline functions: `planVisualTeaching`, `buildSceneSpec`,
  `generateRoutedScene`, `generateSceneSpec`, and the `parseVisualTag` result `responseVisual`.
- The `route.ts:1171-1173` "never two visuals" guard — **remains the final, authoritative arbiter**.
- `getNextBestAction()` — untouched, out of the chat route.
- `learnSession.contextSnapshot` JSON write site (`route.ts:1183-1212`).

### (b) New LOGIC (pure, no I/O)
- `deriveOutputBias(strategyType, preferredLearningStyle?) → OutputBias` — a **pure synchronous
  switch** over the 7 `TeachingStrategyType` values returning `'PROMOTE' | 'SUPPRESS_OPTIONAL' |
  'NEUTRAL'` plus a `reason`. No `await`, no DB, cannot stall the turn.
- `firedRuleIndex(...)` — a pure helper returning the 1-based matched-rule index for the same
  ordered predicates `determineStrategy` uses (for trace/tests).
- **`isOptionalVisual(spec) → boolean`** — a **pure** predicate that classifies a detected 2D
  `VisualSpec` as OPTIONAL ⟺ `spec.interactive === false && !spec.challenge` (REQUIRED otherwise; see
  the definition in Section 4). It reads **only fields already present** on the `TeachingPlan.spec`
  that `planVisualTeaching()` returns (`src/lib/visuals/teachingStrategy.ts:191-217`) — no new
  persisted data, no I/O. This is the classification `SUPPRESS_OPTIONAL` consults.
- A small arbitration step in the pipeline that *applies* the bias to candidates already produced
  (loosen/restore suppression; drop OPTIONAL visuals — per `isOptionalVisual` — unless explicitly
  requested). It reads the hoisted strategy + bias and `message`; it produces no new artifact.
- **Co-location decision:** all three helpers live in the **existing**
  `src/lib/school/adaptive/teachingStrategy.ts` (the adaptive side), NOT in
  `src/lib/visuals/teachingStrategy.ts`. This matters precisely because the **consumed**
  `planVisualTeaching()` *and* the colliding `selectTeachingStrategy()` are **both exported from
  `src/lib/visuals/teachingStrategy.ts`** (verified `:191-217` and `:196-224`) — the same module the
  visuals-side naming overlaps with. Placing `deriveOutputBias` / `isOptionalVisual` on the adaptive
  side keeps the output-bias mapping pedagogical and avoids importing into / colliding with that
  visuals module (the predicate only reads the plain `spec` object the route already holds).

### (c) New DATA / schema
**None that requires migration.** Note the new *logic* is not limited to the pure switch: it is
`deriveOutputBias`, `firedRuleIndex`, **and** the `isOptionalVisual` predicate (all listed in (b),
all pure and reading only fields that already exist on `TeachingStrategy` / `TeachingPlan.spec`).
None of them introduces persisted data. Reuses existing state only:
- The selected strategy type + `firedRuleIndex` are persisted into the **existing**
  `learnSession.contextSnapshot` JSON (new keys `lastStrategyType`, `lastStrategyRuleIndex`) at the
  existing snapshot-write site (`route.ts:1183-1212`), using the existing spread pattern. Used as a
  **soft cross-turn tie-break** to reduce strategy thrash (advisory only; never overrides a
  higher-priority rule firing on fresh signals).
- An optional, ignorable `strategyDecision` field MAY be added to the response JSON for debugging
  (Section 8). It is populated entirely from fields that already exist on `TeachingStrategy`.

---

## 6. Integration Point — ONE additive insertion in `route.ts`

### Single insertion point: inside the existing strategy block, `route.ts:488-501`
The engine attaches at exactly one place: the existing non-fatal `try` that already computes
`teachingStrategy`. We **append** to that block; we do not rewrite or remove any line in it.

Conceptually, the block changes from:

```ts
// route.ts:488-501 (EXISTING — unchanged lines shown for context)
try {
  const { getTeachingStrategy, buildTeachingStrategyBlock } = await import('@/lib/school/adaptive/teachingStrategy')
  // … existing chapter/kgNodeIds derivation …
  const teachingStrategy = await getTeachingStrategy(/* … */)
  systemPrompt += buildTeachingStrategyBlock(teachingStrategy)   // existing, unchanged
} catch {
  // non-fatal
}
```

to (the only added lines are the two `+++`):

```ts
try {
  const { getTeachingStrategy, buildTeachingStrategyBlock,
          deriveOutputBias } = await import('@/lib/school/adaptive/teachingStrategy')   // +++ add import
  // … existing chapter/kgNodeIds derivation (unchanged) …
  const teachingStrategy = await getTeachingStrategy(/* … */)
  systemPrompt += buildTeachingStrategyBlock(teachingStrategy)   // existing, unchanged

  strategyHoisted = teachingStrategy                              // +++ surface to pipeline
  outputBiasHoisted = deriveOutputBias(                           // +++ pure, sync, no await
    teachingStrategy.type,
    learnerProf?.preferredLearningStyle,                          // in scope (assigned at 316-317)
  )
} catch {
  // non-fatal — strategy + bias context is purely additive
}
```

Two `let` hoist declarations are added next to the existing `268-270` precedent block:

```ts
// route.ts ~268-270 (alongside learnerProfHoisted / lessonPlanHoisted / prereqGapHoisted)
let strategyHoisted: import('@/lib/school/adaptive/teachingStrategy').TeachingStrategy | null = null   // +++
let outputBiasHoisted: import('@/lib/school/adaptive/teachingStrategy').OutputBias | null = null       // +++
```

The pipeline arbitration reads those hoisted values. It is a small *additive* sub-step placed
**between candidate detection (`1118-1162`) and the existing final guard (`1171-1173`)**, and it
only relaxes or tightens suppression of *already-computed* candidates:

```ts
// route.ts, inserted after 1162 and before the 1171-1173 guard (advisory; guard stays last)
if (outputBiasHoisted && outputBiasHoisted.kind !== 'NEUTRAL') {
  // applyOutputBias(...) — pure: under SUPPRESS_OPTIONAL may drop an OPTIONAL detectedVisualSpec,
  // where OPTIONAL ⟺ isOptionalVisual(spec) i.e. spec.interactive === false && !spec.challenge
  // (interactive/challenge specs are REQUIRED and never dropped); or under PROMOTE refrain from
  // suppressing responseVisual. Never fabricates a spec. Honors explicit student keyword requests.
  // The 1171-1173 invariant still runs unchanged afterwards.
}
```

### Proof this is additive
- **No existing line is removed or rewritten.** `buildTeachingStrategyBlock(teachingStrategy)` still
  runs; the prompt block is unchanged. The new statements are appends inside the same `try`, plus
  two new `let` declarations, plus one new conditional sub-step.
- **Graceful degradation, like its siblings.** The strategy-side additions live inside the existing
  `488-501` non-fatal `try`; if anything throws, `strategyHoisted`/`outputBiasHoisted` stay `null`
  and the pipeline behaves exactly as today. The pipeline sub-step is itself null-guarded
  (`if (outputBiasHoisted && …)`), so the SUBJECT_LIBRARY / non-school path — where the strategy
  block never runs and `strategyHoisted` stays `null` — is treated as `NEUTRAL` (today's behavior).
- **The strongest existing invariant is preserved.** The `1171-1173` "never two visuals" guard is
  untouched and still executes last, so the engine can never produce a double visual.
- **Behavior change is bounded.** Under `NEUTRAL` (the most common case and the default for any
  failure or non-school session) there is **zero** behavior change.

---

## 7. Engine Interface (conceptual sketch — no bodies)

```ts
// src/lib/school/adaptive/teachingStrategy.ts  (EXTEND the existing module)

/** Advisory bias the strategy casts over the (already-produced) output candidates. */
export type OutputBiasKind = 'PROMOTE' | 'SUPPRESS_OPTIONAL' | 'NEUTRAL'

export interface OutputBias {
  kind: OutputBiasKind
  /** 1-based index of the priority rule that fired (1 = highest). For trace/tests. */
  firedRuleIndex: number
  /** Human-readable justification, e.g. "FOUNDATION_REBUILD → visuals aid first principles". */
  reason: string
}

/**
 * Pure, synchronous. Maps the already-selected strategy type (+ optional learning style)
 * to an advisory output bias. No I/O, no await. Never returns a spec.
 */
export function deriveOutputBias(
  strategyType: TeachingStrategyType,
  preferredLearningStyle?: 'VISUAL' | 'PRACTICAL' | 'THEORETICAL' | 'BALANCED' | null,
): OutputBias

/**
 * Pure predicate. Classifies a detected 2D visual spec (the `spec` from
 * planVisualTeaching().spec, src/lib/visuals/teachingStrategy.ts:191-217) as OPTIONAL.
 * OPTIONAL ⟺ spec.interactive === false && spec.challenge is absent. REQUIRED otherwise.
 * Reads only fields already present on the spec; no I/O, no new data.
 */
export function isOptionalVisual(
  spec: { interactive?: boolean; challenge?: unknown } | null | undefined,
): boolean

/** Optional debug payload returnable as an ignorable JSON field on the chat response. */
export interface StrategyOutputDecision {
  strategyType: TeachingStrategyType   // from TeachingStrategy.type
  priority: number                     // from TeachingStrategy.priority
  firedRuleIndex: number
  bias: OutputBiasKind
  reason: string                       // from OutputBias.reason
  chosenOutput: 'text' | 'visual2d' | 'scene3d'   // the artifact actually attached this turn
}
```

The output-pipeline arbitration is a thin `let`-mutating step in `route.ts` only; it has no new
public function beyond the pure helpers above. (Implementation deferred to the PR.)

---

## 8. Observability & Testing

### Logging / returning
- On any non-fatal failure inside the `488-501` block, add a `console.warn('[learn/chat] teaching
  strategy bias skipped:', err)` (mirroring the sibling blocks at `547`/`569`, which log rather than
  swallow silently). This resolves the silent-masking concern of the empty `catch`.
- Persist `lastStrategyType` and `lastStrategyRuleIndex` into the existing `contextSnapshot` JSON at
  `route.ts:1183-1212` (no migration). This makes the selected strategy auditable per session and
  feeds the soft anti-thrash tie-break.
- Optionally attach `strategyDecision: StrategyOutputDecision` to the response JSON. It is an
  additive, optional field the UI ignores — used for debugging which bias fired and what artifact
  was attached.

### Unit tests (mirroring the sibling adaptive engines, which test pure functions directly)
- **`deriveOutputBias`** — exhaustive over all 7 `TeachingStrategyType` values × the 4 learning
  styles + `null`, asserting `{ kind, firedRuleIndex }`. Pure, so no mocks required (same pattern as
  `determineStrategy`'s existing testability).
- **`firedRuleIndex` parity** — for a representative signal matrix, assert the returned index matches
  the rule `determineStrategy` actually selects, including the two fallback rows (5 and 7).
- **Cross-modulation** — assert `'VISUAL'` upgrades `NEUTRAL`→`PROMOTE` and softens
  `SUPPRESS_OPTIONAL`→`NEUTRAL`, and never overrides a strategy-derived `PROMOTE`/`SUPPRESS`.
- **`isOptionalVisual` predicate** — assert it returns `true` for a spec with
  `interactive === false` and no `challenge`, and `false` for either `interactive === true` or a
  present `challenge` payload (REQUIRED). Pure, no mocks — same pattern as the other helpers.
- **Arbitration semantics** (pure-input fixtures): PROMOTE leaves a deterministic spec untouched and
  only relaxes `responseVisual` suppression when no deterministic spec fired; SUPPRESS_OPTIONAL drops
  a spec for which `isOptionalVisual(spec)` is `true` (`interactive === false && !challenge`) but
  leaves a REQUIRED (interactive or challenge-bearing) spec in place, and is overridden by an explicit
  keyword in `message`; the `1171-1173` guard still nulls `responseVisual` whenever a deterministic
  spec exists.
- **Degradation** — `null` strategy / `null` bias ⇒ pipeline output identical to current behavior
  (golden-output assertions for the SUBJECT_LIBRARY/non-school path).

---

## 9. Risks & Open Questions

1. **Advisory mapping is a hypothesis, not evidence.** The strategy→bias table (PROMOTE for
   FOUNDATION_REBUILD/MISCONCEPTION_REPAIR; SUPPRESS_OPTIONAL for pacing/confidence strategies) is a
   plausible default, not validated. *Mitigation:* ship behind a log-then-decide gate — the
   `strategyDecision` payload and snapshot keys let us observe real distributions before tuning, and
   `NEUTRAL` rows mean most turns are unaffected.

2. **PROMOTE widens an LLM-controlled rendering surface.** Letting the tutor's `VISUAL:<type>` tag
   survive under PROMOTE (only when no deterministic spec fired) can render a lower-quality single
   visual that would be suppressed today. *Mitigation:* PROMOTE never *adds* a second visual (the
   `1171-1173` guard stands), and applies only in the no-deterministic-spec case.

3. **SUPPRESS_OPTIONAL false-negatives.** Dropping an OPTIONAL visual under MOMENTUM_RECOVERY /
   CONFIDENCE_* could remove a genuinely useful diagram. *Mitigation:* "optional" is a **defined,
   testable predicate** — `isOptionalVisual(spec)` ⟺ `spec.interactive === false && !spec.challenge`
   (Section 4) — so only non-interactive, non-assessment visuals are eligible; REQUIRED visuals
   (interactive, or carrying a `challenge` payload) are **never** dropped, and explicit student
   keyword requests always win. Open question: the precision of the "explicit request" keyword
   heuristic on `message` is unproven and needs measurement; the residual risk is that the
   `interactive`/`challenge` flags are imperfect proxies for "pedagogically essential."

4. **Two adjacent strategy-derived prompt artifacts.** The existing `ACTIVE TEACHING STRATEGY` block
   (`498`) remains; this engine adds no second prompt block (it only adds an output bias). To avoid
   block bloat, the engine deliberately does **not** restate strategy guidance into the prompt —
   the prompt-side remains exactly the single existing block. *Contract:* no new `systemPrompt +=`
   from this engine.

5. **Cross-module coupling.** The historically-separated `school/adaptive/teachingStrategy.ts` and
   `visuals/teachingStrategy.ts` modules become indirectly related (adaptive strategy now influences
   visual arbitration). *Mitigation:* the mapping lives entirely on the adaptive side and the visuals
   module is not imported or modified; the relationship is one-way (strategy type → bias), so the
   "keep them apart" intent of the visuals header is honored at the code level.

6. **Open question — anti-thrash strength.** Should the snapshot tie-break ever *prevent* a switch to
   a freshly-fired higher-priority strategy? Spec'd answer: **no** — fresh signals always win; the
   snapshot only breaks ties between equally-ranked outcomes. To be confirmed once turn-over-turn
   strategy stability is observed in the logs.

7. **Open question — should `PRACTICAL`/`THEORETICAL` styles ever bias artifacts?** v1 says no (prose
   only). Revisit if logging shows visual-artifact mismatch for those learners.
