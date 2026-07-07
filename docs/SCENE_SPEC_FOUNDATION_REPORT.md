# Scene Specification Foundation Sprint — Report

Builds the foundation for the transition from `Concept → VisualType → Hardcoded Renderer` toward
`Concept → Scene Specification → Generic Renderer`, **without replacing the current system**. One
phase, additive only. Every existing `VisualType` and visual is untouched and still works.

## What was built

| Item | File | Purpose |
|---|---|---|
| Architecture audit | `docs/SCENE_SPEC_FOUNDATION_AUDIT.md` | pipeline + limitations + what's required to draw a lesson without a new `VisualType` |
| SceneSpec schema | `src/lib/teaching/sceneSpec.ts` | subject/animation-agnostic declarative scene description (pure types + helpers; no React/Three) |
| Generic renderer (spike) | `src/components/school/visuals/SceneSpecRenderer.tsx` | interprets a `SceneSpec` and draws it through the existing primitives, gated by `revealStep` |
| Re-expressed visual | `src/lib/teaching/sceneSpecExamples.ts` | `vectorVisualizationSpec` — the existing Vector Visualization as data, beside the original |
| Dev demo | `src/app/dev/visual-demo/VisualDemo.tsx` | isolated "Scene Specification Prototype" section, existing vs SceneSpec side by side |
| This report | `docs/SCENE_SPEC_FOUNDATION_REPORT.md` | — |

## Schema design (Tasks 2–3)

`SceneSpec { id, title, sceneType, teachingGoal?, cameraDistance?, ariaLabel?, steps[] }`, where each
`SceneStep { narration?, objects[] }` and each `SceneObject { type, position?/from?/to?/points?,
text?, color?, radius?, thickness?, size?, properties? }`.

Object vocabulary (Task 3), each mapping to an **existing** primitive — no new primitive was created:

| Object type | Existing primitive |
|---|---|
| `point` / `node` / `particle` | `MolecularNode3D` |
| `vector` / `arrow` | `Vector3D` |
| `bond` | `Bond3D` (reserved; not in the spike subset) |
| `label` | `Html` |
| `path` / `trajectory` | ordered points → `MolecularNode3D` markers |
| `bar` / `surface` | `boxGeometry` / future height-field (reserved) |

The schema is subject-agnostic (nothing references any subject), animation-agnostic (a step is a
static snapshot; "animation" is the reveal sequence driven by the existing engine), and reusable
across future subjects (the vocabulary is generic geometry).

## Narration compatibility (Task 6) — verified, no changes needed

The spike confirmed the existing reveal/playback contract operates on a SceneSpec **unchanged**:
- `SceneSpecRenderer` accepts `revealStep: number` and reveals objects additively
  (`visibleObjects(spec, revealStep)` returns objects from steps `1..revealStep`) — byte-for-byte the
  same `show = revealStep >= n` gating every Foundation component uses.
- `sceneStepCount(spec) = spec.steps.length` supplies exactly the integer `stepCount` that
  `synchronizedPlayback`/`visualStepForSegment` need.
- `sceneNarration(spec)` yields one narration string per step, matching the existing segment model.

No narration or playback code was modified — the SceneSpec model slots into the existing contract.

## Teaching-engine readiness (Task 7) — architecture only

A future system can generate a `SceneSpec` from `Concept / Teaching Goal / Misconception / Student
Level` **without a dedicated `VisualType`**:
- `teachingGoal` already exists on the spec as a first-class field.
- A `properties` bag and the optional `level`/`misconception` data a future layer would add can drive
  *which steps/objects* a generator emits (e.g. fewer steps for a beginner, an extra "wrong-vs-right"
  contrast step for a misconception) — all expressible as data, all rendered by the same
  `SceneSpecRenderer`, all played by the same narration engine.
- Because selection no longer requires an enum member, a generator can emit a brand-new scene at
  runtime that no `VisualType` describes.

## Validation results (Task 9)

```
npx prisma generate   → Generated Prisma Client v6.19.3 (success)
npx tsc --noEmit       → exit 0, ZERO errors
npm run build           → "✓ Compiled successfully"
runtime smoke test      → npm run dev, GET /dev/visual-demo
                          → ✓ Compiled (1974 modules), HTTP 200, 0 crash markers
                          → "Scene Specification Prototype" section renders both the existing
                            visual and the SceneSpec version side by side
```

Existing visuals still work, existing subjects unaffected, no regressions — the change is purely
additive (3 new source files + 2 demo imports + 1 new demo section).

## Lessons learned / what worked / what failed

**What worked**
- A single ~120-line generic renderer reproduced an existing teaching animation from pure data, with
  identical reveal behaviour, reusing `ThreeDVisual` + `Vector3D` + `MolecularNode3D` + `Html`
  unchanged.
- The existing `revealStep` contract is exactly the right seam: a SceneSpec's step list maps onto it
  directly, so narration/playback need zero changes.
- The 3-primitive vocabulary was sufficient for the chosen visual — confirming the prior audit's
  finding that the primitive layer is the strongest, most general part of the platform.

**What failed / limitations**
- The spike subset only handles point/node/particle/vector/arrow/label/path/trajectory; `bond`,
  `bar`, and `surface` are defined in the schema but not yet rendered (skipped harmlessly).
- `path`/`trajectory` render as discrete markers, not a smooth spline — adequate for the proof, not
  yet production-quality.
- The SceneSpec demo renders standalone (not through `VisualCard`), so it does not yet get the
  `VisualPlaybackControls` UI — by design (no production wiring this phase).
- Per-object animation (e.g. a moving particle within a step) is not expressible; the model captures
  reveal-sequencing, not intra-step motion.

## Is SceneSpec viable?

**Yes.** The spike demonstrates that an existing teaching animation can be represented entirely as
data and rendered by one generic interpreter, while the existing reveal/narration/playback engine
drives it unchanged — and with no impact on any existing `VisualType`. The expensive substrate
(primitives + host + narration + playback) is reused as-is; only the thin generative band (schema +
interpreter) is new. This validates the core hypothesis that My Tutor can move from hardcoded
animations toward concept-driven generated teaching experiences.

## Recommended next sprint

**"SceneSpec Renderer Completion + Registry Bridge."** Extend `SceneSpecRenderer` to the full object
vocabulary (`bond`, `bar`, smooth `path`/`trajectory`, `surface`), and add an *additive* bridge so a
`SceneSpec` can be rendered **through `VisualCard`** (a single registry entry / spec-typed path that
computes `stepCount` from the spec) — giving SceneSpec visuals the production
`VisualPlaybackControls` and narration sync without touching the existing enum or any existing visual.
Re-express 2–3 more existing visuals as specs to harden the schema before any concept→spec generation
work.

## Run locally

```
cp .env.example .env   # set DATABASE_URL, AUTH_SECRET (openssl rand -base64 32), OPENROUTER_API_KEY
npm install
npx prisma db push
npm run dev            # http://localhost:3000  → /dev/visual-demo → "Scene Specification Prototype"
npm run build          # prisma generate && next build
npx tsc --noEmit       # passes with zero errors
```
