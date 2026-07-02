# ADR 12 · Visualization & Simulation Architecture

**Status:** Proposed (documentation only — implementation blocked on Canonical KG v1 freeze and explicit user approval)
**Date:** 2026-07-02
**Supersedes:** nothing — first ADR on visualization architecture
**Superseded by:** —

---

## 1. Problem

The Educational Brain's visual tier has seven competing visual-generation pipelines with no unified
ranking model, no evidence-based selection, and a systematic P2 violation (re-generating the same
visual representation on every turn instead of caching it as a reusable asset).

**The concrete failure class:**

- A student who asks about projectile motion five times in one session sees five independently
  generated parametric scenes (or, if the flag is off, five keyword-heuristic fallbacks). The
  Brain has zero memory that it already produced a correct scene for this concept.
- A student in a different session gets a *different* scene for the same concept because a
  different keyword matched on a slightly differently worded explanation.
- The tutor's system prompt says `visual_type: simulation` (decided by the Teaching Engine before
  any explanation is generated), but the post-LLM pipeline produces a `diagram` because
  `visualizationDecision.ts` classified the generated explanation text differently. Two
  independent decision points disagree; the later one silently wins.

**Seven confirmed visual pathways (all wired into `route.ts`, confirmed by reading the file):**

| # | Engine | File | Flag | Mode | Output |
|---|---|---|---|---|---|
| 1 | Legacy VisualSpec (pre-LLM) | `school/visuals/detectVisual.ts` (Engine 32) | Always-on | Both | `VisualType` enum → legacy React component |
| 2 | Visualization Decision | `teaching/visualizationDecision.ts` (Engine 36) | Always-on | Both (post-LLM) | `VisualCategory` suggestion (post-hoc, advisory only in v1) |
| 3 | Deterministic Scene Builder | `teaching/buildSceneSpec.ts` (Engine 37) | Always-on fallback | Both (post-LLM) | `SceneSpec` JSON |
| 4 | Parametric Scene Router + 29 generators | `teaching/sceneGenerators/sceneRouter.ts` (Engines 38-39) | `ENABLE_PARAMETRIC_SCENE_GENERATION` | Both (post-LLM) | `SceneSpec` JSON |
| 5 | AI SceneSpec | `teaching/generateSceneSpec.ts` (Engine 40) | `ENABLE_AI_SCENE_GENERATION` | Both (post-LLM) | `SceneSpec` JSON |
| 6 | Dynamic Visualization — 3D Three.js | `teaching/visuals/generateVisualizationCode.ts` | `ENABLE_DYNAMIC_VISUALIZATION` | Both (post-LLM) | React component string |
| 7 | Dynamic Visualization — 2D recharts fallback | Same file, 2D retry path | Same flag | Both | React component string |

**Three additional architectural gaps confirmed by reading the live code:**

1. **P2 violation (Assets-not-generations):** No pathway caches its output keyed by concept —
   every turn triggers fresh generation or keyword evaluation. `visualizationCache.ts` exists
   in the codebase (`teaching/visuals/visualizationCache.ts`) but only caches per-session, not
   per-concept persistently (it wraps `prisma.visualizationCache.findFirst` keyed by the
   generated text hash, not by `conceptId`). A persistent concept-keyed cache is entirely absent.

2. **Permanent Rule 9 violation (when enabled):** `generateVisualizationCode.ts` calls
   `generateAIResponse()` at `teaching/visuals/generateVisualizationCode.ts:27` — a second LLM
   call per turn when `ENABLE_DYNAMIC_VISUALIZATION` is true. This makes the Dynamic
   Visualization Engine a *second probabilistic component* in the system, contradicting
   Permanent Rule 9 ("the AI Router is the only probabilistic component"). It is also a content
   decision (what to render), not a text rendering call — making it a pedagogical decision
   delegated to a probabilistic component, violating Permanent Rule 10.

3. **Two uncoordinated visual decision points:** The Teaching Engine's `TeachingDecision.visual_type`
   field (decided before the LLM call, based on the learning objective and concept node, ADR 08)
   and `visualizationDecision.ts`'s post-hoc classification (decided after the LLM call, based on
   the generated explanation text) are independent. Neither reads the other. Code order determines
   which "wins."

---

## 2. Evidence

**Seven pathways confirmed from `route.ts` imports and grep:**
- `route.ts:14` — `buildSceneSpec` (always-on fallback)
- `route.ts:15` — `generateSceneSpec`, `isAiSceneGenerationEnabled` (flag-gated, dormant)
- `route.ts:16` — `generateRoutedScene`, `isParametricSceneGenerationEnabled`, `routeSceneGenerator`
- `route.ts:17` — `generateVisualizationCode`, `isDynamicVisualizationEnabled`
- `route.ts:835, 854` — `detectVisual`, `buildVisualsSystemBlock` (both School and Library modes)
- `route.ts:1493–1555` — parametric → deterministic → AI SceneSpec cascade
- `route.ts:1597` — `generateVisualizationCode()` called when flag is true

**P2 violation confirmed:** `visualizationCache.ts` found at
`src/lib/teaching/visuals/visualizationCache.ts` — it uses `Prisma.VisualizationCache` table
but keys on `code` (generated text hash), not on a concept-language-gradeBand tuple. There is no
lookup like "has this concept ever been visualized before — reuse that."

**Permanent Rule 9 violation confirmed:** `generateVisualizationCode.ts:27`:
```typescript
import { generateAIResponse } from '@/lib/ai/client'
```
`generateAIResponse()` is the LLM call. This is a second LLM call when
`ENABLE_DYNAMIC_VISUALIZATION === 'true'` — not the one in `route.ts:~1700+`.

**Teaching Engine `visual_type` field:**
`TeachingDecision` (from `src/lib/teaching-engine/types.ts`) contains a `visual_type` field
computed by `decide()` before any LLM call, from the concept node and learning context.
`visualizationDecision.ts` runs post-LLM and produces a `VisualCategory` value for the same
turn — a second, independent visual-type decision. Confirmed by reading both files.

**`docs/educational-brain/08-visualization-strategy.md` (ch08) analysis:**
Ch08 formally names six competing pipelines (slightly different enumeration: VisualSpec
deterministic, SceneSpec deterministic, parametric scene router, AI-driven SceneSpec, dynamic
React 2D, dynamic React 3D). Its Design C proposes unifying them under a Visual Asset model
with typed `renderer` field and multiple authoring backends. ADR 12 adopts this design,
extending it with the seventh pipeline (Dynamic Visualization), the Permanent Rule 9 fix, and
the two-decision-point coordination fix.

---

## 3. Alternative designs

### Design A — Status quo + flag management

Document the seven pipelines, establish flag-governance rules for which combinations are valid,
and accept the re-generation and P2 violation as a known cost.

*Rejected*: the P2 violation means that re-generation happens every turn regardless of flag state
(the always-on paths: VisualSpec/detectVisual, buildSceneSpec). The Permanent Rule 9 violation
is a live architectural fault that can surface silently via config. Documentation alone does not
fix either.

### Design B — Single unified pipeline with one code path

Replace the seven pathways with a single call that produces one visual per turn, selecting the
generation method by a priority-ranked config table.

*Rejected*: the existing pathways have real value at different concept-granularities (VisualSpec
works at the chapter-curriculum level; parametric works for specific physics/chemistry/math
concept types; the deterministic heuristic is the universal fallback). Collapsing them into one
pipeline discards these well-tested strengths.

### Design C — Visual Asset Model with typed renderers and two authoring layers (selected)

Formalize two layers:

**Authoring layer** (not per-turn) — produces `VisualAsset` records, stores them:
- Parametric generators (existing, 29 types): `extract(LLM) → build(deterministic) → validate → cache`
- Dynamic visualization (existing, 3D/2D): `generate(LLM) → validate → cache` — now background-only
- Deterministic heuristic builder (existing `buildSceneSpec`): `keyword-match → cache`
- Curator UI (future): hand-curated `VisualAsset` records

**Retrieval layer** (per-turn) — checks cache first, falls back to authoring on miss:
- Input: `(conceptId, renderer, language, gradeBand)`
- Lookup: `VisualizationCache` keyed by `(conceptId, renderer)` — concept-keyed, not text-hash-keyed
- On hit: serve the cached `VisualAsset` directly (no LLM, no generation, zero I/O)
- On miss: invoke the authoring layer as a synchronous (for deterministic paths) or background
  (for LLM paths) task; serve the result immediately; persist it for next time

This directly fixes:
- P2 violation: a concept's visual is authored once and served forever
- Permanent Rule 9: the Dynamic Visualization LLM call moves to an offline/background authoring
  task, not an inline per-turn second LLM call
- Two-decision-point problem: the Visual Policy (pre-LLM, from Teaching Engine `visual_type`)
  determines the `renderer` to query; `visualizationDecision.ts` is retired (its signal is
  subsumed by the concept-keyed lookup)

---

## 4. Selected design

**Design C — Visual Asset Model with typed renderers.**

### 4.1 VisualAsset type

```typescript
interface VisualAsset {
  id: string
  conceptId: string        // KG concept slug
  renderer: VisualRenderer // see §4.2
  specPayload: unknown     // typed by renderer (SceneSpec | VisualSpec | ComponentString | LatexString)
  language: string         // 'en' | 'hi' | ... — multilingual per P7
  gradeBand: GradeBand     // maps to KG concept's difficulty level
  authorKind: 'parametric' | 'dynamic_llm' | 'deterministic' | 'curator'
  qualityScore: number     // 0–1 prior; updated by Evidence Engine (ADR 13)
  a11yDescription: string  // mandatory — empty string fails Layer 1 validation
  status: 'draft' | 'active' | 'deprecated'
  createdAt: Date
}
```

### 4.2 VisualRenderer enum

```typescript
type VisualRenderer =
  | 'katex'               // LaTeX formula — KaTeX React component
  | 'scene_spec'          // SceneSpec JSON — existing SceneRenderer.tsx
  | 'visual_spec'         // VisualSpec JSON — existing legacy visual components
  | 'dynamic_component'   // React component string — existing sandboxed iframe
  | 'animation'           // Keyframe timeline — Phase 3+
  | 'interactive_widget'  // Bounded interactive — Phase 3+
```

### 4.3 Visual Policy (replaces the two-decision-point problem)

The Teaching Engine's `TeachingDecision.visual_type` field maps to `VisualRenderer` via a
**Visual Policy table** stored in `BrainConfig` (ADR 10 §4.5):

```typescript
visualPolicyByStrategy: {
  [strategy: string]: {
    acceptedRenderers: VisualRenderer[]  // ordered: first match in cache wins
    skipVisualization: boolean
  }
}
```

Example: strategy `WORKED_EXAMPLE` → `acceptedRenderers: ['scene_spec', 'visual_spec']`, never
`dynamic_component` (too much cognitive load alongside a step-by-step). Strategy
`EXPLORATION` → `acceptedRenderers: ['dynamic_component', 'scene_spec', 'interactive_widget']`.

The per-turn pipeline becomes:
1. `decide()` outputs `visual_type` → mapped to accepted renderers via Visual Policy.
2. For each accepted renderer in order, query `VisualizationCache` by `(conceptId, renderer)`.
3. First cache hit → return the `VisualAsset`. Done.
4. On full miss → invoke the highest-priority authoring backend for `renderer[0]`.
5. Authoring result → write to `VisualizationCache`, return `VisualAsset` for this turn.

`visualizationDecision.ts` (Engine 36) is now relegated to a **diagnostic/observability** role:
it continues running but its output is logged for A/B comparison against the policy-driven
selection, not used to gate production rendering. It is formally retired from the production
visual decision path.

### 4.4 Permanent Rule 9 compliance — Dynamic Visualization redesign

`generateVisualizationCode.ts`'s `generateAIResponse()` call is moved from the inline per-turn
path to a **background authoring task**:

- **Inline path (per-turn, synchronous):** only deterministic routes — `buildSceneSpec()` and
  parametric generators (where the LLM extraction step is already sunk into the parametric
  pipeline's own `extract()` phase, which does call an LLM to extract parameters, but this
  is already the case today). The result is returned synchronously.
- **Background authoring (asynchronous, not per-turn):** when no deterministic path produces
  a result and the concept has no cached asset, a background job invokes
  `generateVisualizationCode()`. The current turn receives no dynamic visual (falls back to
  text-only). The generated asset is cached. Subsequent requests for the same concept receive
  the cached asset with zero LLM cost.

This is the P2 principle (Assets-not-generations) applied to the LLM call itself: the LLM
generates an asset *once*; the asset is served forever. The per-turn LLM call (the Groq/Yandex
call in `route.ts`) remains the sole probabilistic component in the per-turn path.

**Exception:** the parametric generators' `extract()` phase calls an LLM to extract numeric
parameters from the generated text (e.g., extract `angle=45, speed=30` from "a projectile
launched at 45° with initial speed 30 m/s"). This sub-call is an LLM call inside the existing
per-turn path. It is accepted as a known temporary state pending the Visual Asset model:
once a concept's parameters are extracted and stored in `VisualAsset.specPayload`, no future
extraction is needed for the same concept — the extraction LLM call occurs at most once per
concept, same as the Dynamic Visualization authoring.

### 4.5 a11y as a first-class requirement

Every `VisualAsset` carries a mandatory `a11yDescription` field (cannot be empty string —
Layer 1 validation rejects it). The `a11yDescription` is used by:
- The Narration stage: weaves a contextual reference into the reply text (per ch08 §8).
- The visual tier fallback: shown when WebGL is unavailable or the user's visual preference is
  `THEORETICAL`.
- Screen-reader output.

Current state: `a11yDescription` is absent from the live `SceneSpec` and `VisualSpec` schemas.
Adding it is Phase 1 of this ADR's migration.

### 4.6 Five validator layers (per renderer)

Every authoring backend runs three validation layers before writing a `VisualAsset` to cache:

| Renderer | Layer 1 (schema) | Layer 2 (static render) | Layer 3 (consistency) |
|---|---|---|---|
| `katex` | LaTeX parseable by KaTeX | Symbols within concept's vocabulary | Matches `ConceptNode.canonicalFormula` when defined |
| `scene_spec` | Existing `validateSceneSpec()` | Structural constraints | Independent recomputation (existing `check*Consistency` functions) |
| `visual_spec` | VisualSpec Zod schema | Component can mount | Data values within concept's typical ranges |
| `dynamic_component` | Export-default present; denylist pass | Iframe mount test + RAF cleanup gate | Manual curator review before status → `active` |
| `interactive_widget` | Widget definition schema | Parameters within bounds | State space finite + non-trivial |

The `dynamic_component` manual curator review gate (Layer 3) is the one non-automated step.
It keeps `status = 'draft'` until a curator marks it `active` — draft assets are served in
development only. This satisfies P5 (Bounded-blast-radius) for LLM-generated code.

---

## 5. Trade-offs

**"Miss on first access" cost:** when a concept has no cached visual, the current turn falls
back to text-only (for LLM-authoring paths). This is a deliberate trade: correctness and
Permanent Rule 9 compliance over convenience. The fallback is invisible to the student — the
lesson continues without a visual and one is generated for next time.

**Cache invalidation:** a `VisualAsset` is invalidated when the KG concept node changes
significantly (e.g., a corrected `estimated_hours` or `description`). The invalidation signal
is the KG version gate (ADR 06) — a KG version bump triggers a configurable partial cache clear
for affected `conceptId`s. Full strategy to be specified in implementation plan.

**Parametric `extract()` LLM sub-call:** as noted in §4.4, this is a per-turn LLM call today.
It is accepted as a temporary state; its output (extracted parameters) should be stored in the
`VisualAsset.specPayload` table so that future turns for the same concept skip extraction
entirely. This is part of the Phase 2 migration.

---

## 6. Scalability

**Cache-hit path is O(1):** a single `VisualizationCache` lookup by `(conceptId, renderer,
language, gradeBand)` — a composite index. Constant cost regardless of student count.

**Authoring path is bounded:** the background `generateVisualizationCode()` call runs at most
once per `(conceptId, renderer)` pair across the entire system. With ~1,400 concepts across
five KGs, the total LLM call budget for visual authoring is bounded at ~1,400 × renderers
(~5,000 calls) — not per-student, not per-turn.

**`a11yDescription` at scale:** stored as a text field in `VisualAsset`, written once at
authoring time. Zero per-turn cost.

---

## 7. AI independence impact

This ADR is the highest-leverage AI independence improvement in the visual layer:

- **Before:** every turn for a popular concept (projectile motion, Newton's laws) calls a
  parametric `extract()` LLM and potentially a `generateVisualizationCode()` LLM.
- **After:** zero LLM calls for any concept whose `VisualAsset` is cached. A fully populated
  cache makes the entire visual tier AI-independent. P2 (Assets-not-generations) and P9
  (every-AI-call-reduces-future-dependency) are both satisfied.

The Dynamic Visualization LLM call moves from "every turn" to "once per concept" — this is
exactly the AI independence trajectory P9 prescribes.

---

## 8. Backward compatibility

**`detectVisual()` / VisualSpec:** the legacy pathway remains intact during migration. It is
now explicitly the `visual_spec` renderer in the asset model. Existing components that render
`VisualType` values are unchanged; they become renderers in the new model.

**`SceneSpec` pipeline:** unchanged. The existing `validateSceneSpec()`, `buildSceneSpec()`,
and the 29 parametric generators remain as authoring backends. They now write to
`VisualizationCache` after generation rather than discarding their output.

**Route.ts visual cascade:** unchanged in Phase 1 (three-flag cascade still runs). Phase 2
introduces the concept-keyed cache lookup as a pre-step before the cascade; Phase 3 replaces
the cascade with the full asset model retrieval.

---

## 9. Validation strategy

**`VisualAsset` schema validation:**
- Zod schema; must pass at authoring time.
- `a11yDescription.length > 0` enforced by schema.
- `qualityScore` must be 0–1.

**Per-renderer Layer 3 consistency tests:**
- `scene_spec`: existing `checkProjectileConsistency()` etc. are the baseline. New scene types
  must add an equivalent independent recomputation test before `authorKind = 'parametric'`
  is used.
- `dynamic_component`: manual curator approval gate keeps unchecked code off the live path.

**Cache correctness:**
- Unit test: write a `VisualAsset` for `conceptId = 'phys.mechanics.projectile'`, read it back,
  assert identity.
- Integration test: simulate a chat turn for the concept; assert no LLM call for the visual
  (only the main Groq call); assert the returned visual matches the cached asset.

**Permanent Rule 9 compliance test:**
- A test fixture that stubs `generateAIResponse` to throw if called more than once per turn.
  The per-turn path (without background authoring) should never trigger this stub.

---

## 10. Migration strategy

**Phase 1 (additive, no behavior change):**
1. Extend `VisualizationCache` table: add `conceptId`, `renderer`, `language`, `gradeBand`,
   `a11yDescription` columns. Existing `code` column remains for backward compat.
2. Extend `SceneSpec` and `VisualSpec` schemas to include `a11yDescription` (optional for
   now — mandatory in Phase 2).
3. Add `VisualAsset` TypeScript type. No behavior change.

**Phase 2 (concept-keyed cache lookup before the cascade):**
1. Modify `route.ts` visual cascade: before the existing three-flag cascade, query
   `VisualizationCache` by `(conceptId, renderer, language, gradeBand)`.
2. On hit: skip the cascade, use cached `VisualAsset`. Measure cache hit rate.
3. After successful generation: write result to `VisualizationCache` with the new columns.
4. `a11yDescription` becomes mandatory: any path that doesn't produce one fails validation,
   falls back to text-only rather than serving a visual without a11y.

**Phase 3 (background authoring + Permanent Rule 9 fix):**
1. Move `generateVisualizationCode()` to a background job (e.g., a Vercel background function
   or a queue backed by Redis). The per-turn path never calls `generateAIResponse()` for visuals.
2. The parametric `extract()` LLM sub-call moves to the same background authoring path: on
   first turn for a concept, extract and cache; on subsequent turns, read from cache.
3. `visualizationDecision.ts` (Engine 36) moves to observability/logging only — no longer
   gates production rendering.

**Phase 4 (Visual Policy + BrainConfig):**
1. Add `visualPolicyByStrategy` to `BrainConfig` (ADR 10 §4.5).
2. The Visual Policy drives renderer selection, replacing the hard-coded cascade order.

---

## 11. Relationship to previous ADRs

**ADR 08 (Teaching Action Intelligence):** `TeachingDecision.visual_type` was identified as the
pre-LLM visual decision in ADR 08. ADR 12 now formally connects it to the Visual Policy table
(§4.3 above) and declares `visualizationDecision.ts` (the post-hoc equivalent) as a diagnostic
tool rather than a production gate. The pre-LLM decision is canonical; the post-hoc classifier
is observability.

**ADR 09 (Dynamic Lesson Composition):** the Worked Examples sub-system emits a `[WE:...]` tag
that persists to `contextSnapshot.currentWorkedExample`. The Visual Asset model should carry a
similar concept-turn-binding signal: when a `VisualAsset` is served for a specific concept on
turn N, the next turn can reference it by asset ID rather than re-selecting. This is a
`contextSnapshot.currentVisualAssetId` field — a direct extension of ADR 09's pattern.

**ADR 10 (Student Memory Architecture):** `BrainConfig` (ADR 10 §4.5) owns the
`visualPolicyByStrategy` table that governs Visual Policy. The `VisualizationCache` table is
in the Knowledge Memory store (Store 3, ADR 10 §4.3) — a concept-scoped, not student-scoped,
cache.

**ADR 11 (Recommendation Intelligence):** the Evidence Engine integration point in ADR 11 uses
an `assetEffectivenessSignal` per topic. ADR 12 is the ADR that defines what a "visual asset"
is — a required definition for ADR 13's Evidence Engine to produce asset-level quality scores.

**ADR 14 (Knowledge Asset Lifecycle):** Visual assets are one of the three Knowledge Asset
families (Explanation, Visual, Probe) specified in ADR 14. The `VisualAsset` type above is
a sub-schema of the `AssetIdentity` table ADR 14 will design. ADR 12 specifies the visual-
specific fields; ADR 14 specifies the shared identity, versioning, and lifecycle fields.

---

## 12. Relationship to the Canonical Knowledge Graph

`VisualAsset.conceptId` is a KG concept slug (e.g., `phys.mechanics.projectile`). The cache
key `(conceptId, renderer, language, gradeBand)` inherits the KG's slug namespace — the same
slug stability guarantee that the KG Consumption gate (ADR 06) is designed to enforce also
protects cache key stability. A slug rename in the KG must trigger a cache migration (not just
an invalidation) — this is captured in the risk register (R16, §13).

`gradeBand` is derived from `ConceptNode.difficulty` (already available at runtime via the
Generic Subject Adapter) — no new KG fields required.

---

## 13. Relationship to the Teaching Engine

`TeachingDecision.visual_type` (Engine 10) is the primary input to the Visual Policy (§4.3).
The Visual tier is explicitly a **leaf dependency** in the engine DAG: every other tier can
call into it; it calls into nothing (Permanent Rule, `DEPENDENCY_RULES.md`). ADR 12 preserves
this: the `VisualAsset` retrieval step is invoked by `route.ts` after the full Teaching chain
has run, exactly as it is today — the decision to visualize is made by `decide()`, the retrieval
is performed by the Visual tier in response.

The Teaching Engine's `visual_type` field is the only input the Visual tier may receive from
the Teaching chain. The Visual tier may not read `TeachingDecision`, `TeachingAction`, or
`LessonPlan` — only the single `visual_type` field projected from `TeachingDecision`.

---

## 14. Future implementation plan

When implementation is approved:

1. **`src/lib/teaching/visualAsset.ts`** — new file: `VisualAsset` type, `VisualRenderer` enum,
   `visualAssetSchema` Zod, `a11yDescription` validation, `VisualPolicyTable` type.
2. **`src/lib/teaching/visualizationCache.ts`** — extend existing file: add concept-keyed
   `findByConcept(conceptId, renderer, language, gradeBand)` and `upsertForConcept()` functions.
3. **Prisma schema** — extend `VisualizationCache` table with `conceptId`, `renderer`,
   `language`, `gradeBand`, `a11yDescription`, `qualityScore`, `status` columns.
4. **`src/app/api/learn/chat/route.ts`** — Phase 2 change: add concept-keyed lookup before
   visual cascade; add cache-write after any successful generation path.
5. **`src/lib/teaching/visualizationDecision.ts`** — downgrade to observability: add a logging
   wrapper; remove it from the production decision gate.
6. **Background authoring job** — Phase 3: `src/lib/teaching/visuals/authoringQueue.ts`,
   enqueues `generateVisualizationCode()` calls for uncached concepts.
7. **Add `Finding 12`** to `ARCHITECTURE_DECISIONS.md` (seven uncoordinated visual pipelines,
   P2 violation, Permanent Rule 9 violation).
8. **Add Engine 42** to Bible §3: Dynamic Visualization Engine
   (`teaching/visuals/generateVisualizationCode.ts`, DORMANT when
   `ENABLE_DYNAMIC_VISUALIZATION` is off but imported unconditionally at route.ts:17).

How does this make the Educational Brain think and teach more like a world-class human teacher?
A world-class teacher remembers which diagram they used for projectile motion last week and uses
the same one again — not because they're lazy, but because consistency aids long-term memory.
The Visual Asset model gives the Brain exactly this: a persistent, concept-keyed visual memory
that makes teaching both more consistent and more efficient over time.
