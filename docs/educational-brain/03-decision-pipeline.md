# 03 · The Decision Pipeline — how the Brain decides what to do next

> *Every learner turn is a series of small, typed, observable
> decisions. The Brain composes them; it never improvises.*

---

## 1. What this document specifies

The chain of stages, in order, that runs for every learner turn
(every chat message, every quiz answer, every checkpoint). Phase 1's
job is to design the chain; Phase 2 builds it. The current 1,400-line
inline orchestration in `src/app/api/learn/chat/route.ts` is the
*input* to this design — every behavior it provides must be expressible
in the new pipeline, and every gap it leaves should be closed.

---

## 2. Three candidate designs for the pipeline shape

### Design A — Linear function pipeline (current shape, formalized)

A sequence of pure-ish functions called in order, each accepting and
returning a `TurnContext` object. Each stage may set fields, never
unset them.

```
intentStage(ctx) -> ctx
retrievalStage(ctx) -> ctx
strategyStage(ctx) -> ctx
visualStage(ctx) -> ctx
probeStage(ctx) -> ctx
narrationStage(ctx) -> ctx
persistStage(ctx) -> ctx
```

- ✅ Trivial to reason about; one happy path.
- ✅ Trivial to test (give each stage a fixture `ctx`, assert output
  `ctx`).
- ❌ Stages that need to peek "ahead" or short-circuit ("I already
  have a cached complete answer, skip everything") are awkward.
- ❌ Doesn't model branches (school-mode vs personal-tutor mode have
  genuinely different sub-pipelines).

### Design B — Stage DAG with declared dependencies

Each stage declares which `ctx` fields it reads and which it writes.
A scheduler runs them in topological order, allowing independent
stages to run in parallel.

- ✅ Maximally parallel; latency drops on multi-core servers.
- ✅ Stages become more isolated (you can't accidentally depend on
  something not declared).
- ❌ Heavy machinery for a 6–10 stage pipeline. Premature.
- ❌ Most stages have a hard dependency on the prior stage
  (`strategy` depends on `retrieval`, which depends on `intent`); the
  DAG collapses to nearly linear.

### Design C — Linear pipeline + named SHORT-CIRCUITS + optional BRANCH stages

Design A's clarity, plus two relaxations: (1) any stage may set
`ctx.shortCircuit = '<reason>'` to skip remaining stages and go
straight to persist; (2) certain stages may yield a branch label
(`'school' | 'personal_tutor' | 'recovery'`) that switches which
later stages run.

- ✅ Keeps Design A's mental model.
- ✅ Handles the real-world cases A struggles with.
- ✅ Branches are explicit, named, finite — not a tangle of
  conditionals.
- ✅ Failure mode of any stage is identical to "stage set
  `shortCircuit='stage_failed'`" — the safety net is unified.

### Choice — Design C

The pipeline is small (~10 stages), the parallelism opportunities are
weak, and the cases that need flexibility have a clean name
("short-circuit on cache hit", "branch on school mode"). Design C is
Design A with the two relaxations that match real life.

---

## 3. The TurnContext object

Single object that flows through the pipeline. Every stage reads it,
writes new fields, never mutates existing fields. Treat as immutable
in spirit (TypeScript-wise: builder pattern OR a new object per
stage; Phase 2 chooses).

```text
TurnContext {
  // Inputs (set by the router before stage 1)
  turnId                 UUID
  userId                 string
  sessionId              UUID
  language               'en' | 'hi' | 'ru' | 'sa' | …
  curriculumId           string | null   (e.g., 'cbse_class_10_science_2025')
  conversationMode       'school' | 'personal_tutor' | 'placement' | 'review'
  userMessage            { text, attachments }
  recentMessages         Message[]       (last 30 turns for LLM context)
  receivedAt             timestamp

  // Set by intentStage
  intent                 IntentClassification
  topicSurfaces          ConceptId[]      (concepts the message touches)
  studentEmotion         'engaged' | 'frustrated' | 'confident' | 'confused' | null
  questionShape          'definitional' | 'procedural' | 'why' | 'meta' | 'off_topic'

  // Set by retrievalStage
  candidateConcept       ConceptId | null
  conceptContext         Concept (loaded) + immediate graph neighborhood
  candidateAssets        {
    explanations: AssetIdentity[]    (ranked)
    visuals: AssetIdentity[]
    probes: AssetIdentity[]
  }
  learnerMemorySnapshot  LearnerMemory   (see doc 05)

  // Set by strategyStage
  pedagogicalStrategy    TeachingStrategyType   (existing 7-strategy enum, expanded)
  policyDecisions        { visualPolicy, probePolicy, hintPolicy, depthPolicy }
  selectedExplanation    AssetIdentity | null
  generationRequest      GenerationRequest | null   (when no asset suffices)

  // Set by visualStage
  selectedVisual         AssetIdentity | null
  generatedVisual        VisualPayload | null      (transient; persisted only after evidence)
  visualFallbackTrail    string[]                  (which engines were tried)

  // Set by probeStage
  selectedProbe          AssetIdentity | null
  inlinePractice         InlinePracticeQuestion | null

  // Set by narrationStage
  composedReply          { text, references[], citations[] }

  // Set by checkpointStage (only on student responses to prior probes)
  checkpointEvaluation   CheckpointResult | null

  // Set by persistStage
  persistedRecords       { messageId, evidenceIds[], practiceSessionId? }

  // Cross-cutting
  shortCircuit           string | null      (set by any stage)
  branch                 'school' | 'personal_tutor' | 'recovery' | …
  observability          ObservabilityRecord (every stage appends a span)
}
```

The `TurnContext` is the only place state crosses stage boundaries.
This is the unit-test contract: a fixture is "a `TurnContext` at the
start of stage X"; the assertion is "stage X applied to that fixture
returns this `TurnContext`."

---

## 4. The pipeline, stage by stage

```
                ┌────────────────────────────┐
   ┌──────────► │  0. Frame                  │   (router; no logic)
   │            │     gather inputs into ctx │
   │            └──────────────┬─────────────┘
   │                           ▼
   │            ┌────────────────────────────┐
   │            │  1. Intent                 │
   │            │     classify the turn      │
   │            └──────────────┬─────────────┘
   │                           ▼
   │            ┌────────────────────────────┐
   │            │  2. Retrieval              │
   │            │     graph + asset lookup   │
   │            └──────────────┬─────────────┘
   │                           ▼
   │            ┌────────────────────────────┐
   │            │  3. Memory                 │
   │            │     load learner snapshot  │
   │            └──────────────┬─────────────┘
   │                           ▼
   │            ┌────────────────────────────┐
   │            │  4. Strategy               │
   │            │     pick teaching policy   │
   │            └──────────────┬─────────────┘
   │                           ▼
   │            ┌────────────────────────────┐
   │            │  5. Composition            │ ◄── short-circuit:
   │            │     pick or author asset   │     cache hit, off-topic
   │            └──────────────┬─────────────┘
   │                           ▼
   │            ┌────────────────────────────┐
   │            │  6. Visual                 │
   │            │     pick / generate visual │
   │            └──────────────┬─────────────┘
   │                           ▼
   │            ┌────────────────────────────┐
   │            │  7. Probe                  │
   │            │     pick a check probe     │
   │            └──────────────┬─────────────┘
   │                           ▼
   │            ┌────────────────────────────┐
   │            │  8. Narration              │
   │            │     compose the reply text │
   │            └──────────────┬─────────────┘
   │                           ▼
   │            ┌────────────────────────────┐
   │            │  9. Checkpoint             │  (only if last turn was probe)
   │            │     evaluate student reply │
   │            └──────────────┬─────────────┘
   │                           ▼
   │            ┌────────────────────────────┐
   │            │ 10. Persist + Evidence     │
   │            │     write + emit events    │
   │            └──────────────┬─────────────┘
   │                           ▼
   └──────────  next turn ◄────┘
```

### Stage 1 — Intent

**Input**: `userMessage`, `recentMessages`.

**Output**: `intent`, `topicSurfaces`, `studentEmotion`,
`questionShape`.

**Determinism first**: a deterministic classifier (regex + keyword
+ recent-turn context) handles the easy cases:

- Greetings, "thanks", "got it" → `acknowledgement` (short-circuit
  to a one-line affirmation).
- A reply matching the prior probe's expected answer shape →
  `probe_response` (skip ahead to stage 9).
- A message containing a strong concept keyword (e.g., "newton's
  second law") → `concept_question`, `topicSurfaces` = those
  concepts.

**AI as last resort**: when the deterministic classifier returns
`unknown`, an LLM call classifies into the same finite enum. The
LLM's classification + the verbatim message becomes a new
deterministic rule (see doc 06, "every AI call shrinks the LLM's
role"), so the same phrasing never costs an LLM call again.

### Stage 2 — Retrieval

**Input**: `topicSurfaces`, `language`, `gradeBand` (from learner
profile), `curriculumId`.

**Output**: `candidateConcept` (the single concept the rest of the
pipeline treats as the topic), `conceptContext` (the concept plus
immediate graph neighborhood), `candidateAssets`.

Two strategies, applied in order:

- **Symbolic**: if `topicSurfaces` has exactly one concept, that's
  the `candidateConcept`. Done.
- **Disambiguation**: if `topicSurfaces` has 2+, pick the one most
  recent in the learner's curriculum context (last-touched in the
  curriculum view), or the one that matches the conversation mode
  (school mode prefers the current chapter's concept).

Asset retrieval is then four indexed reads (per family + per kind),
returning top-K ranked candidates. **No LLM call**.

### Stage 3 — Memory

**Input**: `userId`, `candidateConcept`, `language`.

**Output**: `learnerMemorySnapshot` — a snapshot of:

- Mastery score + confidence for `candidateConcept` and its
  prerequisites.
- Active misconceptions (with confidence).
- Recent activity (last N turns on this concept).
- Style preferences (from `LearningProfile`).
- Coaching mode (from `Profile.currentLevel`, `LearningGoal`).
- Active session state (current worked example, etc.).

This is the read path of doc 05. It's deliberately a separate stage
from Retrieval — Retrieval is concept-centric, Memory is learner-
centric, and a learner with no mastery context yet (first session
ever) must still flow through cleanly.

### Stage 4 — Strategy

**Input**: `intent`, `learnerMemorySnapshot`, `candidateConcept`,
`conceptContext`.

**Output**: `pedagogicalStrategy`, `policyDecisions`.

This is the existing `school/adaptive/teachingStrategy.ts` logic,
made first-class. It synthesizes the 5 signals already implemented
(mastery, misconception, concept transfer, confidence calibration,
learning momentum) into ONE strategy enum.

Phase 1 expands the enum from 7 to 12 by adding:
- `INITIAL_INSTRUCTION` — first time the learner sees this concept
- `RETRIEVAL_PRACTICE` — concept previously mastered; reactivate
- `WORKED_EXAMPLE_GUIDED` — learner is mid-worked-example
- `INDEPENDENT_PRACTICE` — learner is ready to attempt unaided
- `META_REFLECTION` — invite the learner to summarize their
  understanding (high-leverage Bloom-level move)

Each strategy carries `policyDecisions`:
- `visualPolicy: 'always' | 'when_available' | 'never' | 'minimal'`
- `probePolicy: 'mandatory' | 'optional' | 'suppress'`
- `hintPolicy: 'volunteer' | 'on_request' | 'suppress'`
- `depthPolicy: 'definition_only' | 'definition_plus_example' |
  'full_with_application' | 'derivation'`

The policies *constrain* the later stages — they don't force a
specific asset, they declare which asset properties are acceptable.

### Stage 5 — Composition

**Input**: `policyDecisions`, `candidateAssets.explanations`,
`learnerMemorySnapshot`, `pedagogicalStrategy`.

**Output**: `selectedExplanation` OR `generationRequest`.

The retrieval order:

1. **Filter** candidate explanations against:
   - `language` matches `ctx.language`
   - `gradeBand` matches learner's grade band
   - `incompatibilities` doesn't intersect learner's active
     misconceptions
   - asset's `prerequisites` are mastered (or accept some unmastered
     if `pedagogicalStrategy = PREREQUISITE_RECOVERY`)
2. **Rank** the filtered list by:
   - `qualityScore × qualityConfidence`
   - Style match to learner's `LearningProfile.preferredLearningStyle`
   - Bloom level match to `policyDecisions.depthPolicy`
3. **Select** the top-ranked asset. If none survive filtering:
4. **Generation request** — populate a `GenerationRequest` with the
   concept, language, gradeBand, style hints, and the strategy
   reason; pass to stage 5b.

#### Stage 5b — Generation (only when stage 5 produces no asset)

LLM call. The output goes through the validator chain (doc 01 § 7)
and, on pass, becomes a new asset in `status='ACTIVE'` (with a small
`qualityScore` penalty until evidence accumulates) AND is used for
this turn. So even the generation case ends up retrieving an asset —
the asset was just authored 200 ms ago.

This is the heart of "every AI call shrinks the LLM's role" — the
next learner asking the same concept in the same language and grade
gets a retrieval, not a generation.

### Stage 6 — Visual

**Input**: `policyDecisions.visualPolicy`, `candidateAssets.visuals`,
`selectedExplanation`, `conceptContext`.

**Output**: `selectedVisual` OR `generatedVisual` (transient).

Skip entirely if `visualPolicy = 'never'`. Otherwise:

1. Try existing Visual asset retrieval (the equivalent of the current
   `planVisualTeaching` deterministic path).
2. If no asset, attempt parametric scene generation (the current
   `generateRoutedScene`) — formula-derived geometry, asset-cached on
   first success.
3. If no parametric match, attempt dynamic generation (the current
   `generateVisualizationCode` 3D-Three.js / 2D-recharts fallback).
4. If everything fails, `selectedVisual = null` — render nothing
   rather than wrong.

Each fallback step appends to `visualFallbackTrail` so observability
can show which path won.

### Stage 7 — Probe

**Input**: `policyDecisions.probePolicy`, `candidateAssets.probes`,
`pedagogicalStrategy`, `learnerMemorySnapshot`.

**Output**: `selectedProbe`, `inlinePractice`.

Skip if `probePolicy = 'suppress'`. Otherwise:

- **Mandatory**: pick a probe targeted at the most-confidence-deficient
  misconception, or, absent that, a probe matching the concept and
  the current depth policy.
- **Optional**: probabilistic — emit a probe ~30% of turns when the
  strategy is `INITIAL_INSTRUCTION` or `RETRIEVAL_PRACTICE`.

The selection itself is a ranked lookup over Probe assets, filtered
to match the current learner's state.

### Stage 8 — Narration

**Input**: `selectedExplanation`, `selectedVisual`, `selectedProbe`,
`composedReply` parts.

**Output**: `composedReply` — the actual mascot text.

The naive implementation pastes the Explanation asset's `content`
verbatim. The realistic implementation composes:

```text
[opening transition, contextual]
[explanation asset content]
[reference to the visual, if one]
[probe stem, if one]
```

The opening transition is the only piece that varies per turn. It is
the *only* place where the Brain may use an LLM at runtime in stage
8, and even there, the LLM is gated to "ONE sentence, ≤ 20 words,
transitional only" — a budget the deterministic fallback can fill
(e.g., "Here's how that works.").

Critically, the **explanation text itself is not regenerated**. The
asset's content is used verbatim. The system tone, persona, and
language are all the asset's own; the runtime just composes.

This is a sharp departure from current behavior. It's the highest-
impact change for AI cost and consistency.

### Stage 9 — Checkpoint

Runs only when `intent.classifier = probe_response`. Evaluates the
student's reply against the prior probe's `correctValue` /
`tolerance` / `keywords`.

Output `checkpointEvaluation`:
```text
{
  probeId, passed (boolean), confidence,
  detectedMisconceptions: [misconceptionId],
  partialCreditRationale: string | null,
  recommendedFollowUp: 'continue' | 'reteach' | 'simpler_probe' | 'escalate_to_curator'
}
```

This is the existing `evaluateCheckpoint.ts` made first-class.

### Stage 10 — Persist + Evidence

The pipeline's only side-effect stage. Writes:

- `Message` for the turn (user + assistant).
- `EvidenceRecord`s — one per asset shown, weighted by stage
  (explanation shown = weight 0.1; probe answered correctly = weight
  1.0; misconception detected = weight 0.7; learner revisited the
  same concept within 48h = weight 0.3 negative on the prior
  explanation).
- `LearningCheckpoint` if stage 9 ran.
- `PracticeSession` updates if a probe was shown.
- Updates to `LearnerMemory` (current concept, mastery delta, active
  misconception updates).
- Emits `TurnCompleted` event → Evidence Engine workers (doc 04)
  consume asynchronously.

---

## 5. Branches

`ctx.branch` is set by stage 1 or 4. Three branches in Phase 1; more
may be added later as orthogonal extensions.

### Branch `school`

Active when the user is enrolled in a `Curriculum` and the turn is
within a school-mode session. Adds:

- Stage 2 retrieval scopes asset candidates to the current `Module`'s
  concepts.
- Stage 4 strategy considers checkpoint frequency from the
  curriculum's `checkpointFrequency` field.
- Stage 7 probe selection biases toward `targetedMisconceptions` that
  are in the curriculum's known misconception list.

### Branch `personal_tutor`

The default branch. No curriculum constraint. Asset retrieval is
unconstrained by module; the only filters are language, grade band,
learner profile.

### Branch `recovery`

Set when stage 4 produces `pedagogicalStrategy =
PREREQUISITE_RECOVERY` (the learner attempted something with a
missing prerequisite). The pipeline switches to:

- Stage 2 retrieval = the missing prerequisite, not the originally-
  asked concept.
- Stage 8 narration wraps the recovery in a contextualizing sentence
  ("Before we get back to X, let's quickly cover Y, which X depends
  on.").
- After persistence, the original concept is queued for re-attempt
  next turn.

---

## 6. Short-circuits

Any stage may set `ctx.shortCircuit = '<reason>'` to skip the rest
of the pipeline (except stage 10, which always runs to persist
observability).

Allowed reasons:
- `'cache_hit_full_turn'` — turn-level cache match (rare; only when
  the same `(userId, conceptId, recentContextHash)` was seen).
- `'off_topic'` — intent classified as off-topic; produce a
  curriculum-aware redirect.
- `'acknowledgement'` — produce a one-line affirmation; no asset
  needed.
- `'rate_limit'` — too many turns / minute; produce a "slow down"
  reply.
- `'stage_failed'` — any stage failed in a way that can't be
  recovered; produce a fallback response.

---

## 7. Observability

Every stage appends a span to `ctx.observability`:

```text
{
  stage: 'retrieval',
  startedAt, durationMs,
  inputs:  hash of read fields (for cache invalidation)
  outputs: { fieldName: 'set' | 'null' | 'short_circuit', meta }
  errors:  [{ kind, message, recovered }]
}
```

The full `observability` is persisted on every turn (cheap; structured
JSON of ~2 KB) and is queryable for:

- "How often does stage 5 require generation?" (= 1 − asset-hit rate)
- "Which concepts have the highest generation cost?" (= concepts where
  retrieval failures concentrate)
- "What's the average latency of stage 6 across visual policies?"

The observability record is also what powers Evidence Engine queries
(doc 04) — every emitted Evidence row knows which strategy, which
asset, which fallback trail produced the turn.

---

## 8. Latency budget

Per-turn end-to-end target: **< 600 ms** for a retrieval turn,
**< 2.5 s** for a turn that requires generation.

Per-stage budgets:

| Stage | Budget | Notes |
|-------|--------|-------|
| Frame | 5 ms | router only |
| Intent | 10 ms deterministic; 800 ms when LLM falls through | LLM rare |
| Retrieval | 20 ms | indexed DB reads + graph in-memory |
| Memory | 30 ms | mostly cached |
| Strategy | 5 ms | pure function |
| Composition | 50 ms retrieval; 2000 ms when generating | generation rare |
| Visual | 100 ms retrieval; 1500 ms when generating dynamic | generation rare |
| Probe | 20 ms | indexed read |
| Narration | 50 ms | string composition; opening LLM is optional |
| Checkpoint | 200 ms | LLM-judged free-text answers; deterministic for MCQ |
| Persist | 100 ms | async event emission |

The point is not the specific numbers — it's that **each stage has
an explicit budget**, and **the orchestrator enforces it**. A stage
that exceeds its budget short-circuits (with a logged warning) rather
than blowing the turn.

---

## 9. Error handling

Every stage is wrapped:

```text
try {
  ctx = stage(ctx)
} catch (err) {
  ctx.observability.append({stage: name, error: err, recovered: true})
  ctx.shortCircuit = ctx.shortCircuit ?? 'stage_failed'
}
```

A stage that throws is functionally identical to a stage that
returns `null` for its outputs. The pipeline never propagates
exceptions to the response — it always produces a `composedReply`,
even if degraded.

Degradation order (most to least preferred):

1. Stage X failed → use the output of the stage's deterministic
   fallback (e.g., visual stage falls back through trail).
2. No fallback available → produce the asset-based response without
   the failed stage's contribution (e.g., probe-stage failure → no
   probe this turn).
3. Composition failed entirely → return a fixed "I'm having trouble
   right now — could you rephrase?" reply. (Should be rare; logged
   loudly.)

---

## 10. Anti-patterns explicitly rejected

- ❌ **One giant orchestrator function** (current state). Phase 1's
  pipeline is N small modules.
- ❌ **Per-stage caching policies**. Caching is a Memory + Evidence
  concern, not a pipeline concern. Stages are stateless.
- ❌ **Stages reading the database directly for cross-stage state**.
  The `TurnContext` is the only inter-stage channel.
- ❌ **LLM calls deciding orchestration**. Stage selection, branch
  selection, short-circuit selection are deterministic. LLMs only
  produce content; they never choose the pipeline shape.
- ❌ **"Just one more LLM call to be sure"**. If a deterministic
  rule fails, the pipeline moves to a deterministic fallback, not a
  second LLM call. A second LLM call to validate the first is almost
  never worth its cost.
- ❌ **Hiding the strategy in the prompt**. The pedagogical strategy
  is an explicit field, observable in logs, testable in fixtures.
- ❌ **Conflating "strategy" and "prompt template"**. Strategy is
  what the Brain *decides*; the prompt template is what the LLM
  *sees* — and only matters for the rare LLM-bearing stages.

---

## 11. Why this design is right for the next 5 years

The pipeline shape is small (~10 stages), the contracts are typed,
the boundaries are explicit. Adding a new capability is one new
stage or one new branch — never a new tangle of conditionals in the
chat route.

The decisive property is **observability per stage**: when something
goes wrong in production, every turn has a structured
`observability` record that names which stage produced which output.
The current code's "no scene rendered" silently produces nothing;
the Phase 1 pipeline's failure is "stage 6 visual short-circuited at
asset retrieval; asset filter rejected all 4 candidates because
gradeBand mismatch."

The decisive property for AI cost is **stage 5's "generation
produces an asset" rule**: every generation enriches the asset
catalogue, so the asset-hit rate trends upward over time as the
catalogue covers more concepts. We measure that trend explicitly
(doc 04, "the LLM-call-per-asset-served curve must trend
asymptotically toward zero") and reject any architectural change
that breaks it.
