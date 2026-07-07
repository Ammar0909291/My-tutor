# 06 · AI Integration — where AI belongs, where it doesn't

> *Every AI call must permanently reduce future AI dependency. If a
> call doesn't leave a deterministic artifact behind, it shouldn't
> have been made.*

---

## 1. The principle, stated unambiguously

External LLMs are a **synthesis tool**, used to author new artifacts
(assets, rules, classifications) when no existing artifact fits. They
are **never** a runtime decision-maker for behavior that could be
deterministic. The Brain shrinks the LLM's role with every call.

If a call doesn't produce one of the following:

- A validated **Asset** (Explanation, Visual payload, Probe).
- A new **Classifier Rule** (intent classification, misconception
  detection regex).
- A **Parameter set** that becomes a cache row (parametric scene
  params).
- A **Verdict** that becomes part of a stored decision
  (misconception confirmation, validator pass/fail).

then the call shouldn't have been made.

---

## 2. The current AI surface, audited

From the inventory:

- `generateAIResponse` — chat reply. Called per turn. Output is the
  mascot reply text. **Today, this is the largest AI dependency —
  the assistant reply is regenerated every turn.**
- `generateJSON` — small structured extraction, used by parametric
  scene generators (extract angle/speed/etc), MCQ generators,
  intent classifiers in some paths.
- `summarizeSession` — produces a short summary; called occasionally.
- `chatWithFallback` — wraps generateAIResponse with provider
  fallback (Groq → Yandex → fallback).

Of these, only `generateJSON` already aligns with the "leaves a
deterministic artifact" principle (the JSON often becomes a cached
parameter set). `generateAIResponse` is the principle's biggest
violation: it regenerates content per request, gives the cache no
material to remember, and ties the entire reply text to the live
LLM.

---

## 3. The proposed AI surface, with three call types

The Brain has exactly three runtime AI call types and one offline
AI call type. Every existing call must be reclassified into one of
these four; if it doesn't fit, it must be removed.

### Type A — Asset Authoring (rare, asset-producing)

**When**: Stage 5b of the Decision Pipeline, when no Explanation
asset exists for `(conceptId, language, gradeBand, style)` and the
Brain must produce one to answer the learner.

**Input**: a structured prompt containing the concept's definition,
the learner's grade band and language, style hints, and the
strategy reason for needing a new asset.

**Output**: a *candidate asset*. Validated by doc 01 § 7. If valid,
persisted as an Explanation asset with `provenance='ai_authored'`
and `status='ACTIVE'`. If invalid, fall through to next style or
fall through to the Composition retry with a different prompt.

**Frequency**: trends toward zero as the asset catalogue covers the
concept space. Bounded by `(concept × language × gradeBand × style)`
unique combinations.

**Latency budget**: 2 s. Acceptable because rare AND the result is
permanent (next learner gets retrieval).

**Cost accounting**: every authoring call writes the token cost to
the asset's `costCents` field. Cumulative authoring cost per concept
is visible in the curator queue (concepts where authoring spend has
not yet "paid back" in evidence-weighted usage get flagged).

### Type B — Parameter Extraction (frequent, parameter-producing)

**When**: parametric scene generators (existing `extractProjectileParams`,
`extractCircularParams`, etc.), some probe validators (numeric
answer parsing from free text), some intent disambiguators.

**Input**: the explanation text (or learner text), plus a strict
schema for what to extract.

**Output**: a small JSON object validated against the schema. On
schema fail, return null; on success, cache against the
canonicalized input.

**Frequency**: bounded by the unique-input-canonicalization cache
hit rate. Reasonably frequent at first, decays as the cache covers
the input space.

**Latency budget**: 600 ms.

**The artifact it leaves**: the cached `(canonicalizedInput,
extractedParams)` row. Next identical input → no LLM call.

### Type C — Classification (rare, rule-producing)

**When**: stage 1 Intent's deterministic-classifier-returned-unknown
fallback. Stage 9 Checkpoint's free-text answer evaluation.
Misconception detection on novel mistake phrasings.

**Input**: the text + a finite-enum schema (intent kinds, pass/fail/
partial, misconception ids).

**Output**: a single enum value + a confidence.

**The artifact it leaves**: the `(verbatim text, returned enum)`
pair is appended to a **rule promotion queue**. Once a particular
phrasing has been classified the same way ≥ 5 times by the LLM, the
Brain promotes the (regex, enum) pair into the deterministic
classifier — the next occurrence costs zero LLM calls.

**Frequency**: should asymptote to zero on the most common
phrasings within weeks of deployment.

**Latency budget**: 400 ms.

### Type D — Offline Authoring (slow path, doc 07)

**When**: a curator (human) commissions an LLM-authored asset; the
LLM is given high context (full chapter text, related assets, the
concept's prerequisites and misconceptions) and produces a draft for
human review. Not a runtime call; happens outside the chat flow.

**Output**: a `status='REVIEW'` asset, waiting for a curator's
verdict. No learner sees it until promoted to `ACTIVE`.

**Frequency**: thousands per week at curator capacity; not
correlated with learner traffic.

**Latency budget**: irrelevant (offline).

---

## 4. Where AI does NOT belong — the explicit list

This list is the most important content of this document. The Brain
must never use AI for any of these.

### NOT-AI-1: Choosing which asset to serve

Choosing between two existing Explanation assets is a **ranked
lookup** governed by the Evidence Engine, not an LLM verdict. Asking
an LLM "which of these two explanations is better for this learner"
is expensive, slow, and *worse than the deterministic ranker* —
because the ranker has thousands of learner outcomes; the LLM has
none.

### NOT-AI-2: Deciding pedagogical strategy

Strategy selection (the existing 7-strategy enum, expanding to 12 in
doc 03 § 4) is a deterministic synthesis of five signals. Adding an
LLM to "consult on what strategy to use" is decision-by-vibes, not
by evidence. The strategy table is queryable, testable, A/B-able;
an LLM's strategy choice is none of these.

### NOT-AI-3: Tracking mastery

A learner's mastery score is a numerical update from probe outcomes
(doc 05 § 5). It is not "have an LLM judge whether the student
understood this turn." LLMs are bad at this in three ways:
inconsistent, non-reproducible, and prone to false positives ("the
learner said the right words but doesn't actually get it"). Probes
are explicit because mastery is a measurement, not an opinion.

### NOT-AI-4: Selecting curriculum next steps

The next concept in a curriculum is a graph traversal over
`prerequisite_of` edges filtered by the learner's mastered set. It
is not "ask the LLM what the learner should learn next." The graph
already encodes the answer.

### NOT-AI-5: Composing the response from scratch each turn

The mascot reply is composed from selected Explanation assets +
optional transitional opening (≤ 20 words, with a deterministic
fallback). It is not a fresh LLM generation of "say something nice
about Newton's second law." The asset's content IS the reply text.

### NOT-AI-6: Routing language / locale / persona

Language is selected by the learner's `language` field. Persona is
loaded from the curriculum's configured mascot. These are not LLM
decisions; they're configuration reads.

### NOT-AI-7: Detecting whether a student is frustrated, bored, confident

These are inferred deterministically from interaction patterns (turn
latency, retry count, message length, explicit feedback). An LLM
asked "is this student frustrated" gets ~70 % accuracy and 100 %
non-reproducibility; the deterministic detector gets ~85 % accuracy
and 100 % reproducibility. The Brain prefers the latter.

### NOT-AI-8: Verifying its own output

A second LLM call to "check the first LLM call" is rarely worth its
cost. The Brain uses **deterministic validators** (schema, static
checks, consistency checks per doc 01 § 7) for verification.
LLM-as-judge is reserved for the offline curator-queue path where
human review follows.

---

## 5. The "every AI call shrinks the LLM's role" mechanism, concretely

Each call type produces a permanent artifact that reduces future
calls. This section is the design's most important commitment.

### Type A (Asset Authoring) → grows the asset catalogue

Curve: `LLM_authoring_calls_per_concept_per_month` trends
asymptotically toward zero as `(concept × language × gradeBand ×
style)` cells fill up. Tracked metric.

### Type B (Parameter Extraction) → grows the parameter cache

Curve: `param_extraction_calls / unique_canonicalized_inputs` trends
toward 1.0 (each unique input is extracted exactly once, ever).
Tracked metric.

### Type C (Classification) → grows the deterministic rule set

Curve: `classification_calls_per_intent_kind` halves every quarter
as the most common phrasings are promoted to rules. Tracked metric.

### The aggregate metric

The Brain reports a single **AI Dependency Index** (ADI):

```
ADI = LLM_calls_per_learner_turn (rolling 30-day average)
```

Target: a strictly decreasing function of cumulative learner
exposure. Crossing the curve upward in any monthly window is an
incident; the Brain investigates and either fixes it or accepts it
with explicit justification (e.g., "we expanded to Sanskrit, which
had zero seed assets — ADI bumped 0.5 → 0.7 transiently").

---

## 6. Model choice strategy

The Brain is model-pluggable. Today: Groq's `openai/gpt-oss-20b`.
Tomorrow: any model.

### Selection per call type

| Call type | Today | Why |
|-----------|-------|-----|
| Type A (asset authoring) | Groq, larger context | Quality matters most; latency tolerated |
| Type B (parameter extraction) | Groq small model | Schema-constrained; latency critical |
| Type C (classification) | Groq small model | Schema-constrained; latency critical |
| Type D (offline authoring) | Best available (Anthropic / OpenAI / Groq) | Quality matters most; cost tolerable |

### Fallback chain

`primary -> secondary -> deterministic_fallback`. Currently
`Groq -> Yandex -> rules`. Phase 2 may add additional providers;
the chain is data, not code.

### Evaluation

The Brain runs nightly evaluation of each provider on a fixed set of
held-out asset-authoring prompts. The evaluation measures:
- Validator pass rate (does it produce a valid asset?).
- Cost per accepted asset.
- Latency.
- Subsequent quality score (after evidence accrues for ≥ 30 days).

A provider whose accepted assets score `< 0.4` median over 100
assets in 30 days is dropped from the primary chain.

### No vendor lock-in

The Brain's prompts are stored in `brain.config/prompts/` as
versioned files, model-agnostic where possible. A provider switch
is a config change. The Evidence Engine then tells us whether the
switch was a good idea.

---

## 7. Cost governance

Existing `AiUsageLimit` table (per-call, per-month caps) stays. Phase
1 adds:

- **Per-concept authoring budget**: each concept gets an annual
  authoring budget (default $5 / concept / language / grade /
  year). When exceeded, further authoring requires a curator
  override.
- **Per-learner generation budget**: a single learner cannot
  trigger more than 5 Type-A authoring calls per day. Beyond that,
  the Decision Pipeline falls back to the next-best-ranked existing
  asset (or to a more generic asset at a coarser cell).
- **Daily aggregate ceiling**: enforced at the router level; if
  hit, the Brain short-circuits new authoring and serves
  retrieved-only.

Cost is logged per call to `YandexUsageLog` (existing) and
aggregated per asset, per concept, per learner. Curators see a
"this concept cost $X to teach this month" dashboard.

---

## 8. Failure modes

Five failure modes, each with a specific degradation strategy.

| Failure | Brain's degraded behavior |
|---------|---------------------------|
| Provider timeout | Try secondary provider; if also fails, return retrieved-only result; if no retrieval, return the deterministic fallback ("Let me think about this — try asking it differently?") |
| Provider returns invalid JSON / unparseable | Discard, fall through next call type (e.g., Type A failure → use the next-best alternative asset) |
| Provider returns valid but failed-validator content | Mark `provenance_attempted_at`, fall through, log the failure for the prompt-tuning queue |
| Provider returns valid + validator-passed but the asset gets immediate negative evidence | Soft-deprecate after 50 negative events; promote a replacement |
| Provider unavailable for > 1h | Activate read-only mode globally: no new authoring or classification; serve retrieved content only |

The read-only mode is critical and rarely talked about. It means the
Brain can survive an LLM-provider outage *without learner-visible
breakage*, because retrieved assets are the dominant path.

---

## 9. Prompt management

Every prompt lives in `brain.config/prompts/<call_type>/<name>.md`,
versioned in git. Prompts:

- Have explicit metadata (model, max_tokens, temperature, expected
  output schema, validator binding).
- Are testable in CI against recorded model responses (fixtures).
- Are reviewed in PRs like code.
- Reference assets and graph data by id, not by inline copy (a
  prompt that needs the concept's definition cites
  `{{concept(physics.newton.f_eq_ma).canonical_definition}}` rather
  than pasting the text).

### Why this matters

The existing prompts are inlined in TypeScript strings across multiple
files (the dynamic visualization prompt, the parametric extractor
prompts, the practice generator prompt, the tutor system prompt).
Phase 1 unifies them into one prompts directory so:

- A linguist can review the Hindi tutor prompt without learning
  TypeScript.
- An A/B test is a new file + a row in `BrainConfig.experimentArms`.
- A prompt regression in CI is the diff between two prompt files +
  the diff in their fixture outputs.

---

## 10. Anti-patterns explicitly rejected

- ❌ **"Just let the LLM decide" anywhere on the runtime path**. The
  LLM produces content; it doesn't choose stages, strategies, assets,
  or learner state.
- ❌ **LLM-as-judge in production ranking**. Reserved for offline
  validation gates only.
- ❌ **Wrapping every LLM call in a retry-with-larger-model**. A
  failed call falls to the next call type or to retrieval, not to a
  bigger model. (Type-D offline authoring may use bigger models;
  runtime never does.)
- ❌ **Hidden LLM calls from non-pipeline code paths**. Every LLM
  call is centrally routed through `routeAI`; routes that bypass it
  are forbidden.
- ❌ **Prompt-engineering opacity**. Prompts are not "magic strings";
  they are versioned config files reviewed in PRs.
- ❌ **Treating the LLM provider as a database**. The Brain's
  authoritative state is in Postgres; the LLM is asked the same
  question twice → may get different answers; that's a feature
  (creative variation) for authoring, a bug (non-determinism) for
  decisions.

---

## 11. AI independence roadmap

A concrete, observable, measured path to reducing external AI
dependency.

| Year | Target ADI | Asset catalogue coverage | Notes |
|------|------------|--------------------------|-------|
| Year 1 | 0.30 calls/turn | 60 % of high-traffic concepts have ≥ 1 asset | Bootstrap from existing 614 nodes + LLM authoring |
| Year 2 | 0.10 | 90 % | Most authoring is offline, curator-supervised |
| Year 3 | 0.03 | 99 % | LLM only for truly novel concepts + offline diversification |
| Year 5 | 0.005 | 99.9 % | Brain is operable on-device for English/Hindi K-12 with a local model only for the rare offline calls |

Year 5 is the goal: a Brain that can teach a Class-12 Indian student
the entire CBSE syllabus, in any of three languages, with rare LLM
augmentation that comes from a model the user owns (small local
model running on the user's device). External-API dependency drops
to optional.

---

## 12. Why this design is right for the next 5 years

The four-call-type framework is enforceable in code review (a PR
that adds a new LLM call has to declare which type it is and what
artifact it leaves behind), measurable in production (ADI is one
number, watched per release), and aligned with the principle
("every AI call shrinks the LLM's role").

The decisive property is **the explicit NOT-AI list**. It is rare
for AI-integration documents to commit, in writing, to "here is what
we will not use AI for." Doing so is the only mechanism that
survives organizational pressure: when someone proposes "what if we
LLM the strategy selection," the answer is "see doc 06 § 4 NOT-AI-
2"; that requires a specific architecture-doc amendment, not just a
PR.

The aggregate effect is a system where the Brain *owns* its
behavior. The LLM is a tool, used surgically, in declining frequency,
on a path to optional.
