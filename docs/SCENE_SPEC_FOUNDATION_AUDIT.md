# Scene Specification Foundation — Architecture Audit

Read-only audit preceding the SceneSpec foundation spike. Builds on
`docs/UNIVERSAL_TEACHING_ANIMATION_ENGINE_AUDIT.md`. Determines what is required to represent a
lesson visually **without creating a new `VisualType`**. No existing code is modified by this sprint
beyond purely additive new files.

## Current visual pipeline

```
KnowledgeNode → detectVisual() → VisualType → VisualCard (switch) → bespoke Renderer
                                                         → ThreeDVisual host
                                                         → narration (from tutor text)
                                                         → playback (synchronizedPlayback)
                                                         → mastery
```

Every concept maps to exactly one `VisualType`, which maps to exactly one hand-written component.
The narration/playback/mastery layers below the renderer are already generic (no `VisualType`
branching).

## Current `VisualType` limitations

- **Closed string enum** (50 members). Representing a new lesson visually today requires *adding a
  member* — the type is an identity, not a description. It carries no scene data (no objects, no
  positions, no steps); all of that lives inside the bespoke component the enum routes to.

## Current `VisualCard` limitations

- **Hand-written `switch` (~50 cases) + static imports** of every component, and `VISUAL_STEP_COUNTS`
  with every entry hardcoded to `5`. Adding a visual means editing the switch, the import list, and
  the step-count map. There is no open/registry path and no way to render a *described* scene.

## Current `detectVisual` limitations

- **Keyword `MatchRule` tables → enum**. It selects an identity by substring match; it cannot emit a
  *parameterized description* of what to draw. It is lookup, not generation.

## Existing reusable primitives (audit before adding anything)

| Primitive | Role | Reuse for SceneSpec objects |
|---|---|---|
| `ThreeDVisual` | scene host (Canvas/lights/OrbitControls/reduced-motion/responsive) | the renderer's host — unchanged |
| `Vector3D` | labeled arrow (`start`,`end`,`color`,`label`,`thickness`) | `vector` / `arrow` objects |
| `MolecularNode3D` | labeled sphere (`position`,`radius`,`label`,`color`) | `point` / `node` / `particle` objects |
| `Bond3D` | connector between two points | `bond` objects |
| inline `boxGeometry` mesh | box | `bar` objects |
| `Html` (drei) | label | `label` objects |

**Finding:** the existing primitive vocabulary already covers the minimum object set
(point/node/vector/arrow/bond/label, plus path/trajectory as a series of points). **No new primitive
is required** for the spike.

## Existing reusable narration/playback infrastructure

- `extractNarrationSegments(tutorText)` — splits explanation text into ordered segments
  (deterministic). Narration is **generated from text**, not authored per visual.
- `synchronizedPlayback` (`advance`/`back`/`seek`/`visualStepForSegment`) — maps narration segment
  `i` → `revealStep` `i`, clamped to an integer `stepCount`. **Zero `VisualType` branching.**
- Every visual receives `revealStep: number` and gates its content additively (`show = revealStep >= n`).

**Finding:** any component that (a) accepts `revealStep: number` and (b) reports a `stepCount` can be
driven by the existing narration/playback engine unchanged. A SceneSpec naturally supplies both:
`stepCount = spec.steps.length`, and each step's objects reveal at `revealStep >= stepIndex + 1`.

## What is required to represent a lesson visually without a new `VisualType`

1. **A declarative `SceneSpec` schema** — subject/animation-agnostic data describing a scene as an
   ordered list of steps, each holding scene objects (type + position/endpoints + properties). This
   is the "thing to generate into" that the platform currently lacks.
2. **A generic `SceneSpecRenderer`** — one component that interprets a `SceneSpec` and emits the
   existing primitives, gated by `revealStep` exactly like every Foundation component. This replaces
   "one bespoke component per concept" with "one interpreter for all specs."
3. **Nothing else for the spike** — no `VisualType` member, no `VisualCard` case, no `detectVisual`
   rule, no narration change. A SceneSpec-rendered visual lives entirely outside the enum, proving a
   lesson can be drawn from *data* rather than from a dedicated type.

This sprint builds items 1 and 2 as an isolated spike and proves them by re-expressing one existing
visual (Vector Visualization) as a `SceneSpec`, rendered side-by-side with the original in the dev
demo — with the original and all 50 existing `VisualType`s completely untouched.
