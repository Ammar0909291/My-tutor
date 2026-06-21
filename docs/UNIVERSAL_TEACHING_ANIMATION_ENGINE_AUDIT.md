# Universal Teaching Animation Engine — Audit

Read-only audit assessing how close the current architecture is to a **Universal Teaching Animation
Engine** that generates visualizations dynamically from concept specifications, rather than from
lesson-specific visual files. No code was modified.

Evidence base: 6 subjects, 50 `VisualType` members (31 `three_*`), 35 Foundation components
(revealStep-gated), 24 Interactive components (state-driven), plus the narration/playback/mastery
layers.

## Task 1 — Current visual architecture map

```
Knowledge Node (subjectSlug, chapterTitle, lessonTitle)
   │   [HARDCODED] keyword MatchRule tables, one per subject
   ▼
detectVisual()  →  VisualType | null
   │   [HARDCODED] closed enum (50 members); subject gate VISUAL_SUBJECTS
   ▼
VisualType (string enum)
   │   [HARDCODED] one big switch (~50 cases) + static imports + VISUAL_STEP_COUNTS (all = 5)
   ▼
VisualCard  →  dispatches to one bespoke Renderer component
   │   renders inside ↓
ThreeDVisual (universal host: Canvas/lights/OrbitControls)   [REUSABLE]
   │
Renderer (per-type component; Foundation = revealStep-gated, Interactive = useState-driven)
   │
Narration  ← extractNarrationSegments(tutorText)   [GENERATED from text, not from the visual]
   │   [REUSABLE] zero VisualType branching
   ▼
Playback (synchronizedPlayback)  — maps narration segment i → revealStep i   [REUSABLE, generic over stepCount]
   │
Mastery (useControlMastery / createMasteryEmitter)  — single 'quantum_interactive' bucket   [REUSABLE]
```

**Hardcoded decision points:** `detectVisual()`'s per-subject keyword tables; `VISUAL_SUBJECTS`
gate; the `VisualType` enum; `VisualCard`'s `switch` + static imports; `VISUAL_STEP_COUNTS` (every
entry hardcoded to `5`); `VISUAL_META`; and each Foundation component's scene constants.

**Generated decision points:** narration segments (`extractNarrationSegments` splits tutor
explanation text deterministically — already concept/text-driven, not authored per visual); playback
timing (derived purely from segment count); and each Interactive component's scene (a pure
`useMemo`/derived function of its `useState` parameters).

**Reusable layers (zero per-subject change across 6 subjects):** `ThreeDVisual`; the
narration/playback engine (`synchronizedPlayback` + `narrationProgress` + `extractNarrationSegments`,
confirmed to have **no `VisualType` branching** — operates purely on an integer `stepCount`);
`SimulationControlPanel`; `GuidedSimulationMode`; `useControlMastery`; and the core primitives
(`Vector3D`, `MolecularNode3D`, `Bond3D`).

## Task 2 — Visual classification audit

| Class | Count | Which | Reasoning |
|---|---|---|---|
| **A. Hardcoded Demo** | 35 (all Foundation) | every `*3D.tsx` (e.g. `ProjectileMotion3D`, `StatisticalDistribution3D`, `MolecularShapes3D`, `Correlation3D`) | Props are `{ revealStep }` only; the scene is built from in-file constants. Reveal-sequenced, but the *content* is fixed — no external data drives the geometry. |
| **B. Parameterized Visualization** | 24 (all Interactive) | every `*Interactive3D.tsx` (e.g. `ProjectileMotionInteractive3D`, `NetworkPacketFlowInteractive3D`) | Scene is a pure function of `useState` parameters (85 `useState` calls across the 24). `ProjectileMotionInteractive3D` already computes its arc from angle/velocity/gravity — genuinely data-driven. |
| **C. Potential Visualization Generator** | 3 (subset, dual-listed) | `ParticleSystem3D` (generic particle engine), the surface height-field builder in `SurfaceVisualization3D` (renders any `z = f(x,y)`), `MachineLearningPipeline3D` (renders a scene from a `STAGES[]` data array) | Each already maps a *data structure* (particle array / height function / stage list) to a scene generically — the seed of a spec-driven renderer. |

Across all six subjects, every Foundation visual is class A and every Interactive visual is class B —
a clean, consistent split. No subject breaks the pattern.

## Task 3 — Parameterization audit

| Visual family | Current inputs | Potential inputs | How data-driven today |
|---|---|---|---|
| Projectile (Foundation) | `revealStep` only | angle, velocity, gravity, mass | ~0% external — but the *Interactive* twin already takes angle/velocity/gravity |
| Statistical distribution | `revealStep` | mean, spread, skew, sample size, bin counts | ~0% external; internal `COUNTS[]`/`BINS[]` constants are parameterizable in principle |
| Molecular shapes | `revealStep` | atom list, bond list, electron pairs, geometry | ~0% external |
| Correlation | `revealStep` | point set, correlation coefficient, direction | ~0% external; `XS[]`/`JITTER[]` constants |
| ML pipeline | `revealStep` | stage list, labels | partially — renders from a `STAGES[]` array (closest Foundation visual to data-driven) |
| Any Interactive twin | `useState` params + `highlightedControlId` | same, but supplied by a caller rather than local UI | **high** — scene = `useMemo(fn(params))` |

**Finding:** the Interactive layer has *already proven* "parameters → generated scene" works per
concept. The remaining gap is that (a) Foundation visuals keep their data as in-file constants, and
(b) Interactive visuals own their parameter set as local UI state — **no component accepts an
external concept-specification object**. The data-drivenness exists; it is just not externalised into
a shared input format.

## Task 4 — Reusable primitive map

| Primitive | Classification | Concepts it can support (estimate) |
|---|---|---|
| `ThreeDVisual` | Reusable today (universal host) | all — every one of the 59 components renders through it |
| `Vector3D` | Reusable today | axes, vectors, arrows, trend lines, field/force/flow directions — 8+ subjects |
| `MolecularNode3D` | Reusable today | atoms, points, nodes, particles, cluster members, pipeline stages, graph vertices — 8+ subjects |
| `Bond3D` | Reusable today | bonds, edges, links, connectors, pipeline arrows — 6+ subjects |
| inline `boxGeometry` (de-facto primitive) | Reusable today | bars, cells, histogram bars, memory tiers, sorting bars — 5+ subjects |
| `ParticleSystem3D` | Reusable with small extension (animated, currently unused) | scatter clouds, gas/diffusion, sampling — 3+ subjects, once a static/declarative mode is added |
| `ForceArrow3D` | Subject-specific (thin wrapper over `Vector3D`) | mechanics force diagrams only |

**Strong signal of generality:** the two newest subjects (Computer Science, Data Science) required
**zero new primitives** — `Vector3D` + `MolecularNode3D` + `Bond3D` + `boxGeometry` covered all 10
of their visuals. Three generic primitives + the host now cover all 6 subjects / 35 Foundation
visuals. This is the single best piece of evidence that a small primitive vocabulary can express a
"universal" visual space.

## Task 5 — Concept-to-visual feasibility audit

Target: `Concept → Scene Specification → Generated Visualization`.

| Example | Input | Today | Gap to "generated" |
|---|---|---|---|
| Projectile motion | angle, velocity, gravity | bespoke component computes arc from local state | needs the inputs to arrive as an external spec, not local `useState` |
| Fractions | numerator, denominator, operation | bespoke 2D `fraction_bar` component | needs a declarative spec + generic interpreter |
| Molecular geometry | atoms, bonds, electron pairs | bespoke `MolecularShapes3D` with hardcoded atoms | needs an atom/bond list → generic node+bond renderer (primitives already exist!) |

**Architectural gaps (the four that matter):**
1. **No SceneSpec schema** — there is no declarative data type describing "a scene" (nodes, arrows,
   bars, curves, reveal steps) independent of a React component.
2. **No generic spec→scene interpreter** — there is no single `<SceneSpecRenderer spec>` that walks a
   spec and emits primitives; today each concept is its own component.
3. **`detectVisual()` is concept→enum, not concept→spec** — it returns one of a closed set of
   `VisualType` strings, not a parameterized description.
4. **`VisualCard` dispatch is a closed switch/enum** — adding a generated visual means editing the
   enum + switch; there is no open registry or spec-driven path.

Crucially, the *building blocks* below the gap (primitives, host, narration, playback) are already
generic, so the gap is concentrated entirely in the **selection + description + dispatch** band.

## Task 6 — Teaching strategy integration audit

Current: `Lesson → Visual`. Target: `Misconception → Teaching Goal → Teaching Action → Generated
Visualization`.

**A concept→strategy layer already exists.** `src/lib/visuals/teachingStrategy.ts` exposes
`selectTeachingStrategy(content, concept) → VisualTeachingStrategy { visualization: VisualEngine }`
and `planVisualTeaching(content) → TeachingPlan`. It is already consumed by the Learn chat route,
Practice/Assessment/Mock quizzes, and the daily-plan adaptive layer.

**But the output is too coarse.** `VisualEngine` is a 5-value bucket
(`'graph' | 'number_line' | 'geometry' | 'process_flow' | 'quantum_interactive' | null`) — it picks a
*category*, not a parameterized **Teaching Action**. There is no link from a strategy to a concrete
scene; the 3D pipeline (`detectVisual` → `VisualType`) runs on a *separate*, keyword-based track and
is not driven by `teachingStrategy`.

**Verdict:** the architecture *supports the direction* (a strategy layer exists and is already wired
into the learning surfaces), but the "Teaching Action → Generated Visualization" edge is missing: the
strategy emits an engine bucket, and the visual is selected independently by keyword. Unifying them
(strategy emits a SceneSpec consumed by a generic renderer) is the integration work.

## Task 7 — Misconception adaptation audit

Today: **one concept → exactly one visual → exactly 5 fixed reveal steps.** There is no
beginner/advanced variant and no misconception-correction variant; `VISUAL_STEP_COUNTS` is uniformly
`5` and each `VisualType` maps to a single component with a single hardcoded reveal script.

Feasibility:
- **Learner level** (beginner vs advanced) — feasible *only once visuals are spec-driven*: a spec
  could carry a `level` field selecting which/how-many reveal steps render. Blocked today by the
  one-component-per-type design.
- **Misconception type** — feasible with a spec carrying a `misconception` field that swaps in a
  "contrast the wrong vs right model" reveal sequence. The misconception data already exists at
  runtime (`MistakeRecord`, per CLAUDE.md) and the Interactive audits already enumerate per-concept
  misconceptions — but nothing routes them into visual selection.
- **Teaching objective** — same: feasible once a spec can encode the objective.

**Verdict:** adaptation is **architecturally blocked today** (fixed component + fixed steps) but
**cleanly feasible** under a SceneSpec model, because the narration/playback layer already accepts an
arbitrary `stepCount` and arbitrary segment text — variant scripts would "just work" through the
existing playback engine.

## Task 8 — Narration generation audit

This is the **most ready** layer. Narration is **already generated, not authored per visual**:
- `extractNarrationSegments(tutorText, visualType?)` splits the tutor's explanation into ordered
  segments by paragraph/sentence boundaries — deterministic, no AI call, **driven by the explanation
  text**. The `visualType` argument is *descriptive only* (stored on the timeline, never branched on).
- `synchronizedPlayback` (`advance`/`back`/`seek`/`visualStepForSegment`) maps narration segment `i`
  → visual `revealStep` `i`, clamped to the visual's `stepCount`. It contains **zero `VisualType`
  branching** — it is fully generic over a single integer.
- `VisualCard` drives any visual's `revealStep` from this machinery identically.

**Verdict:** narration can already be generated from something other than a hand-authored, visual-
specific script — it is generated from the tutor's concept explanation today. The only residual
coupling is that `stepCount` comes from the hardcoded `VISUAL_STEP_COUNTS` (always `5`); a spec-driven
engine would instead compute `stepCount` from the number of reveal steps in the SceneSpec. No other
narration change is needed to support generated scenes.

## Task 9 — Universal Animation Engine readiness score

| Dimension | Score | Justification |
|---|---|---|
| **Primitive readiness** | **8 / 10** | 3 generic primitives + host + `boxGeometry` cover all 6 subjects / 35 Foundation visuals; the two newest subjects needed **zero** new primitives. Minor gap: `ParticleSystem3D` needs a static mode; `ForceArrow3D` is redundant. |
| **Scene generation readiness** | **4 / 10** | Interactive layer proves "params → scene" per concept (24 components), but there is **no declarative SceneSpec schema and no generic interpreter** — every concept is still a bespoke component. |
| **Narration readiness** | **8 / 10** | Already generated from tutor text; fully generic over `stepCount`; zero `VisualType` coupling. Only `stepCount` is hardcoded. |
| **Teaching strategy readiness** | **5 / 10** | `teachingStrategy.ts` exists and is wired into the learning surfaces, but emits a coarse engine bucket, not a parameterized action, and is not connected to the 3D pipeline. |
| **Misconception adaptation readiness** | **2 / 10** | One fixed visual + 5 fixed steps per concept; no level/misconception variants; blocked by the one-component-per-type design (though feasible under a spec model). |
| **Scalability** | **6 / 10** | Additive pattern proven across 6 subjects, but `detectVisual` tables + `VisualType` enum + `VisualCard` switch + `VISUAL_STEP_COUNTS` all grow linearly and are hand-maintained (flagged High in the Universal 3D audit). |

**Composite readiness ≈ 5.5 / 10** — the *rendering substrate* (primitives, host, narration,
playback, mastery) is strong (7–8), while the *generative substrate* (scene spec, concept→spec
mapping, strategy→visual wiring, adaptation) is early (2–5). The platform is a mature **library of
parameterized animations**, not yet a **generator** — but the expensive, reusable half is already
built.
