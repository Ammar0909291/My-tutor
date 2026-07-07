# 08 · Visualization Strategy — how knowledge becomes visible

> *A scene is not a separate kind of teaching; it's an asset the
> Brain retrieves like any other. The renderer is plumbing; the
> Visual asset is the meaning.*

---

## 1. What this document specifies

How Knowledge Assets connect to the visual layer — SceneSpec,
animations, simulations, interactive widgets, graphs, diagrams, and
demonstrative experiments — without duplicating the knowledge itself.

The current codebase has *six different visual pipelines* (VisualSpec
deterministic, SceneSpec deterministic, parametric scene router,
AI-driven SceneSpec, dynamic React engine 2D, dynamic React engine
3D Three.js). Phase 1 unifies them under one consistent architecture
without abandoning their proven strengths.

---

## 2. The principle

A Visual is **content**, just like an Explanation. It is authored,
versioned, validated, ranked, evidence-tracked. The Decision
Pipeline retrieves it the same way (stage 6); only its *rendering*
differs from text.

This is the asset model from doc 01 § 3.2 applied to the visual
layer. The reason it matters: the current code re-derives a visual
on every chat turn (for parametric scenes, every time someone asks
about projectile motion the LLM re-extracts angle and speed; the
dynamic engine regenerates code from scratch every turn for the
same concept). That's wasteful and inconsistent. The Phase 1 view:
a visual is authored once (perhaps by an LLM that the validator
then proves correct), then served from cache forever for that
concept-language-grade tuple.

---

## 3. Three candidate designs

### Design A — Five separate engines, all live (current state)

Keep VisualSpec, SceneSpec, parametric router, AI SceneSpec, dynamic
React engine — each a separate pipeline, each independently
generates its own output, each cached separately.

- ✅ Familiar; no rewrite.
- ❌ The orchestration is ad-hoc (which pipeline wins for what
  concept?); every new concept type requires touching multiple
  engines.
- ❌ No unified ranking / evidence — a parametric scene and a
  dynamic-engine scene compete for the same display slot, ranked
  by code order, not data.
- ❌ "Per-engine cache" means a popular concept is cached in five
  different schemas with five different invalidation rules.

### Design B — One mega-engine that decides everything

A single visual generator that picks the rendering technology
based on the concept and produces a unified output.

- ✅ Conceptually clean.
- ❌ Mega-engines are notorious for becoming the very 1,400-line
  inline orchestration the project is trying to leave behind.
- ❌ Forced to keep multiple renderers in scope inside one module —
  high coupling.
- ❌ The valuable property of the existing pipelines (deterministic
  output for a class of concepts) is lost if everything goes through
  one funnel.

### Design C — Visual Asset model + multiple typed renderers + pluggable authoring backends

- A `Visual` asset (doc 01 § 3.2) has a `renderer` field
  (`'katex' | 'recharts' | 'three' | 'custom'`) and a typed
  `specPayload`.
- The Decision Pipeline's stage 6 retrieves Visual assets by
  concept and language, picks the best-ranked, dispatches by
  `renderer` to the appropriate React component (existing engines
  become *renderers*, not orchestrators).
- Authoring backends (parametric, dynamic-LLM, hand-curated,
  template-driven) **produce Visual assets** and exit. They don't
  decide what to show.

- ✅ Each existing engine becomes one well-defined module instead of
  a competing pipeline.
- ✅ One ranking, one evidence model, one cache (the asset
  catalogue).
- ✅ Adding a new renderer (e.g., Vega-Lite) is one new
  `renderer` value + one React component.
- ✅ Adding a new authoring backend (e.g., a physics-simulation
  template engine) is producing Visual assets — pluggable, doesn't
  touch the runtime.

### Choice — Design C

Design C is the asset model applied to visuals. The five existing
engines become two layers: *authoring backends* (which produce
assets) and *renderers* (which display them). Neither layer needs to
know about the other; both are observable in isolation.

---

## 4. Visual asset families (the five `renderer` types)

Each renderer type has its own typed `specPayload`. Phase 1
specifies the contract for each.

### 4.1 `katex` — formula / equation rendering

Payload: a LaTeX string. Renderer: KaTeX (already integrated in the
codebase via the recent BUG 2 fix).

```text
specPayload {
  latex: 'F_\\text{net} = m\\mathbf{a}'
  displayMode: true | false
}
```

Authoring: usually template-driven from `Concept.canonicalFormula`.
Validation: KaTeX parser must accept the string.

### 4.2 `recharts` — 2D charts

Payload: a typed VisualSpec (the existing union — number_line,
graph, geometry, process_flow, …). Renderer: existing
recharts-based React components.

Authoring: deterministic (`visualSpecBuilder.ts` already does
this), template-driven (from `Concept.modality` and the concept's
canonical data), or LLM-authored via the dynamic engine's 2D
fallback prompt.

### 4.3 `three` — 3D scenes

Payload: a SceneSpec (the existing union) OR a dynamic-React-
component string. Renderer: the existing 3D viewer + the iframe
sandbox (for dynamic components).

Authoring:
- Parametric (existing) for the 9-30 well-defined scene types:
  the LLM extracts parameters, deterministic code builds the
  scene. The output is a SceneSpec stored as a Visual asset.
- AI-driven (existing dynamic engine, just upgraded to Three.js):
  the LLM authors a full React component. The output is the
  component string stored as a Visual asset.
- Hand-curated (new): a curator authors a SceneSpec or component
  directly via the curator UI.

### 4.4 `animation` — timeline-based pre-rendered animations

Payload: a timeline of keyframes (a JSON spec for a deterministic
animation engine; not yet implemented in this codebase). Renderer:
a new animation player component (Phase 3+).

This family is in the model but not yet implemented; included so the
asset schema accommodates it from day one.

### 4.5 `interactive_widget` — bounded interactives

Payload: a parameterized widget definition (e.g., "draggable
slope-intercept line with target slope = 2"). Renderer: a generic
widget renderer + per-widget React component.

Existing example: the `interactive` and `challenge` flags on the
`graph` VisualSpec already support draggable slope/intercept. Phase
1 generalizes the pattern.

---

## 5. The Decision Pipeline's stage 6, reframed

In Design C, stage 6 (Visual) is *just* asset retrieval, with
fallback to authoring on miss:

```
1. Filter candidate Visual assets by (conceptId, language,
   gradeBand, policyDecisions.visualPolicy.acceptedRenderers).
2. Rank by qualityScore × qualityConfidence + style match.
3. Top-ranked asset wins; return it (and its renderer).
4. On miss (no candidates pass filter), descend the authoring
   backends in this order, stopping on first success:
   a. Template-driven (for assets whose template applies).
   b. Parametric (if a parametric rule matches the concept).
   c. Dynamic 3D Three.js (current upgraded engine).
   d. Dynamic 2D recharts (current fallback).
   Each successful authoring produces a NEW Visual asset (status
   ACTIVE, low qualityScore prior) and uses that asset for this
   turn. Next learner gets retrieval.
5. On all-backend miss, return null. The lesson proceeds without
   a visual.
```

This means **the dynamic engine's output is itself an asset that
becomes a permanent part of the catalogue**. The current behavior
(regenerate per turn) is the violation of doc 01 § P2 ("Assets, not
generations"). Fixing it is the highest-leverage change in the
visual layer.

---

## 6. Validation — visual assets are not exempt

Every Visual asset passes the doc-01 § 7 three-layer validation,
adapted per renderer:

| Renderer | Layer 1 (schema) | Layer 2 (static) | Layer 3 (consistency) |
|----------|------------------|------------------|----------------------|
| `katex` | LaTeX parseable | symbols within concept's typical vocabulary | matches `Concept.canonicalFormula` when defined |
| `recharts` | VisualSpec Zod | renderer can mount it | data values match concept's typical ranges |
| `three` (SceneSpec) | SceneSpec Zod | structural validator (existing `validateSceneSpec`) | independent recomputation (existing `checkProjectileConsistency` etc.) |
| `three` (dynamic React) | export-default check, denylist (current) | iframe mount test, RAF cleanup gate (current `looksComplete3D`) | LLM-judged "does this depict the concept correctly?" before promotion — manual for first release, automated Phase 3+ |
| `animation` | timeline schema | each keyframe valid; timing within bounds | last keyframe matches concept's expected end state |
| `interactive_widget` | widget definition | parameters within ranges | interaction state space is finite + non-trivial |

The existing parametric scene generators' consistency checks (Layer
3) are unusually strong — they re-derive geometry by a *different*
method and assert agreement. This pattern should be replicated to
new authoring backends where possible.

---

## 7. Accessibility

Every Visual asset carries a mandatory `a11yDescription` — a textual
description sufficient for a learner without vision (or with
images disabled) to understand what the visual conveys.

This is mandatory at the schema level. A Visual asset with empty
`a11yDescription` fails Layer 1 validation.

The `a11yDescription` is also used by:

- The Decision Pipeline's narration stage to weave a contextual
  reference into the reply text ("In the diagram, the green arrow
  is the velocity — always tangent to the orbit").
- Screen-reader output.
- Text-only fallback when WebGL is unavailable.

The current codebase has accessibility descriptions on some assets
and not others; Phase 1 makes them mandatory.

---

## 8. How Visual relates to Explanation

A Visual asset *complements* an Explanation; it doesn't replace
or contain it. A learner sees both:

- The Explanation provides the text ("Newton's second law says the
  net force on an object equals its mass times its acceleration").
- The Visual provides the picture (a 3D box receiving a force
  arrow with the acceleration vector growing).

The two assets are independently ranked. The Decision Pipeline's
narration stage composes them in a fixed template:

```
{{explanation}}

{{a11yDescription / visual reference sentence}}

[VISUAL inline]
```

A learner who asks for "just the answer in text" disables visuals
(a learner-profile preference) and only the Explanation is composed.

---

## 9. How Visual relates to Probe

Probes can reference visuals (e.g., a probe asking "in the diagram,
which arrow represents centripetal force?" requires a specific
visual to be shown first). When a Probe asset's `requiredVisuals`
field is non-empty, stage 7 (Probe) forces stage 6 (Visual) to have
mounted that specific visual; if the visual is unavailable, the
probe is skipped.

This is the structural constraint that prevents the disconnected-
probe-and-visual bug (asking about a diagram that isn't on screen).

---

## 10. Without duplicating educational knowledge

The point of having Knowledge Assets *separate from* the Knowledge
Graph is that the same concept (Newton's second law) gets:

- One Concept vertex (the meaning).
- One canonical Explanation (per language × grade band).
- Multiple ranked Explanations (alternatives, styles).
- Multiple Visuals (a static formula KaTeX, a 3D animation, a 2D
  graph of F vs a).
- Multiple Probes (different difficulties, different targeted
  misconceptions).

None of these *duplicate* the concept; they each *teach* the
concept from a different angle. The concept is the vertex; the
assets are content attached to it.

The contrast with current code: the existing engines each contain
fragments of "what is Newton's second law" — the visual spec
builder has rules for "force diagram"; the parametric router has
the projectile scene generator; the buildSceneSpec has the
`vectorScene`. These fragments live in code, not in data. Phase 1
moves them into data, where they can be curated, versioned, and
ranked.

---

## 11. Per-renderer fallback within a single asset slot

When the top-ranked Visual asset can't render (e.g., the 3D viewer
is unavailable, the learner's device is too slow for WebGL), the
pipeline falls back through alternative-renderer assets for the
same concept:

- 1st choice: `three` SceneSpec (best for learners with capable
  devices).
- 2nd choice: `recharts` 2D representation (works on every device).
- 3rd choice: `katex` formula only.
- 4th choice: `a11yDescription` of the highest-ranked Visual
  rendered as plain text.

The choice criterion is *availability and learner preference*, not
quality — a `recharts` asset rated 0.7 is preferred over a `three`
asset rated 0.9 when WebGL is unavailable. The Decision Pipeline
checks `ctx.deviceCapabilities` (a new field set by stage 0 Frame)
to know what's available.

---

## 12. Authoring backends, summarized

| Backend | Output type | Frequency | Cost |
|---------|-------------|-----------|------|
| Template-driven (from Concept fields) | mostly `katex`, simple `recharts` | high (whenever a template matches) | zero |
| Parametric (the 9-30 existing generators) | `three` SceneSpec | moderate (LLM call to extract params; cheap and bounded) | low |
| Dynamic LLM (Three.js or recharts) | `three` dynamic React, `recharts` LineChart, etc. | rare (only when nothing else covers) | high (full LLM call) |
| Hand-curated | any | low (curator effort) | curator time |

The acquisition pipeline (doc 07) feeds the same authoring backends
in its **stage 3 Authoring**. So the same backends produce assets
both at offline-acquisition time (in bulk) and at runtime (for an
in-the-moment cover-the-gap). Both paths produce assets that the
Decision Pipeline retrieves.

---

## 13. Evidence on Visual assets, revisited

From doc 04 § 4, Visual asset effectiveness scoring is weighted
*lower* than Explanation or Probe (because attribution is harder).
This document adds the practical mechanisms:

- **Direct feedback**: the existing "Got it" / "Not clear" buttons
  attach to the visual when one is shown; clicking "Not clear" with
  a visual present feeds `LEARNER_FEEDBACK` evidence on that
  specific Visual asset.
- **Re-ask attribution**: if a learner re-asks the same concept
  within 48h *and* the previous turn had a Visual, the re-ask is
  partial-negative evidence on the Visual (not on the Explanation
  — the Visual is the more likely culprit because it's the more
  variable element).
- **A11y fallback signal**: if a learner toggles "show me the text
  description instead," that's negative evidence on the Visual.
- **Engagement signal** (Phase 3+): time-on-visual + interaction
  count for interactive widgets — informative but not yet weighted
  in the engine.

---

## 14. Anti-patterns explicitly rejected

- ❌ **Regenerating a Visual on every turn** (current state for
  dynamic engine and parametric). Fix in Phase 2.
- ❌ **A single mega-renderer**. Five renderers is fine; six is
  fine; one is too few.
- ❌ **Picking the renderer at the asset author's whim**. The
  renderer is determined by what's appropriate for the content,
  recorded in the asset, and used by the pipeline.
- ❌ **No accessibility description**. Schema-mandatory; missing =
  invalid asset.
- ❌ **Visuals contradicting the explanation**. Layer 3 validation
  catches this — visuals are checked against
  `Concept.canonicalFormula` / `Concept.canonicalDefinition`.
- ❌ **Treating "the visual didn't render" as an error**. It's a
  null in the response. The learner gets text. Graceful degradation
  is the contract.
- ❌ **Hidden visual-quality signals in the chat route**. Evidence
  goes through the Evidence Engine, not through ad-hoc instrumentation.

---

## 15. Migration from the current engines

Phase 2 migrates each existing pipeline to the asset model:

| Current engine | Migration |
|----------------|-----------|
| `visualSpec.ts` + `visualSpecBuilder.ts` | becomes template-driven authoring backend. Outputs Visual assets (`renderer='recharts'`). |
| `buildSceneSpec.ts` | becomes template-driven authoring backend. Outputs Visual assets (`renderer='three'`). The bare-word VECTOR_RE issue (fixed in commit `64fdbd6`) becomes a validation rule: the asset's targeted concept must really be a vector-addition concept. |
| `sceneGenerators/sceneRouter.ts` (parametric router) | becomes parametric authoring backend. Each routed generator produces a Visual asset cached per `(conceptId, extractedParams)`. The router *itself* is unchanged. |
| `generateSceneSpec.ts` (AI scene gen) | the rare authoring path; output becomes an asset, validated. |
| `generateVisualizationCode.ts` (dynamic engine) | becomes dynamic-LLM authoring backend. Output (Three.js React component or recharts component) is stored as a Visual asset; subsequent learners with the same concept get retrieval. |

No engine is deleted; each is reframed.

---

## 16. Why this design is right for the next 5 years

The single biggest property: **a visual is authored once, ranked
forever**. The current state — five engines, each regenerating per
turn — is unsustainable economically and inconsistent
pedagogically (two learners asking the same question see two
different visuals).

Phase 1's asset-model approach inherits the strengths of every
existing engine (parametric is mathematically correct; dynamic
covers the long tail; deterministic is fast for the common cases)
without their weaknesses (orchestration ambiguity, regeneration
cost, no unified ranking).

The decisive property is **the asset catalogue compounds**. Year 1's
1,000 hand-curated visuals + 9,000 parametric-cached visuals +
50,000 dynamic-authored-then-validated visuals become Year 2's
serving cache. Year 3, the catalogue covers > 95 % of learner
visual requests via retrieval; LLM authoring trends toward only
genuinely novel concepts.

That same trend is what drives the AI Dependency Index toward
0.005 by Year 5 (doc 06 § 11). The visual layer is one of the two
biggest contributors (the other being the Explanation layer); both
must move from regeneration to retrieval for the Brain to become
AI-independent.
