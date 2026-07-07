# Mathematics 3D Foundation — Architecture Audit

Reviewed the Universal 3D Educational Framework and the Quantum Physics, Classical Mechanics, and
Chemistry 3D implementations before building any Mathematics component, to determine which existing
primitives and patterns can be reused.

## Universal 3D framework

- `ThreeDVisual.tsx` — the shared React Three Fiber scene host (camera, lighting, responsive
  layout, reduced-motion-gated `OrbitControls`). Fully subject-agnostic. **Reused unchanged** by all
  five Mathematics components.
- `VisualCard.tsx` — generic dispatcher: `VISUAL_STEP_COUNTS` + a `switch` on `VisualType`. No
  subject-specific logic. **Extended** (not redesigned) with five new `case`/`VISUAL_STEP_COUNTS`
  entries, mirroring the Quantum/Mechanics/Chemistry entries exactly.
- `useTeachingPlayback` / `synchronizedPlayback.ts` / `VisualPlaybackControls` — operate purely on
  `stepCount` and narration/timer progress, with zero `VisualType` branching. **Untouched.**

## Quantum / Classical Mechanics / Chemistry 3D implementations (reference pattern)

- Every component follows the same shape: a `Scene` function reading `revealStep` to gate JSX
  sections (`showX = revealStep >= n`), wrapped by an exported component rendering
  `<ThreeDVisual revealStep cameraDistance ariaLabel><Scene .../></ThreeDVisual>`. **Reused verbatim**
  for all five Mathematics components.
- `Vector3D.tsx` (Classical Mechanics 3D Foundation Sprint) — a labeled arrow between two 3D points,
  already explicitly designed as subject-independent (its own doc comment calls out reuse by future
  subjects needing a labeled vector). **Reused directly** by `VectorVisualization3D.tsx` and as the
  axis-arrow primitive in `CoordinateSystem3D.tsx`.
- `MolecularNode3D.tsx` / `Bond3D.tsx` (Chemistry 3D Foundation Sprint) — labeled-sphere and
  multi-strand-cylinder primitives. Not directly applicable to Mathematics' coordinate/surface/solid
  content, so no new dependency on them was introduced; precedent shows primitives are reused only
  where they fit, not forced.

## Reusable primitives identified

| Primitive | Source | Reuse in this sprint |
|---|---|---|
| `ThreeDVisual` | 3D Educational Engine Foundation Sprint | Host for all 5 new components, unchanged |
| `VisualCard` dispatch contract | Sprint BW / R.1 | Extended with 5 new types, no redesign |
| `Vector3D` | Classical Mechanics 3D Foundation Sprint | Reused for axis arrows (`CoordinateSystem3D`) and the vector arrow (`VectorVisualization3D`) |
| `Html` (drei) label pattern | `Vector3D.tsx` | Reused for axis/point/contour labels |
| `Scene`-gated-by-`revealStep` shape | Quantum/Mechanics/Chemistry 3D | Reused verbatim for all 5 components |

No existing primitive needed modification. No new detection architecture, narration architecture,
or playback architecture was required.

## Verdict

The Universal 3D Engine, `VisualCard`, narration/playback infrastructure, the
`Scene`-gated-by-`revealStep` authoring pattern, and the `Vector3D` primitive are all directly
reusable for Mathematics with zero modification. No new subject-independent primitive was needed
this sprint — `Vector3D` alone covers the geometric needs of axes and vectors; surfaces and solids
are built from plain Three.js geometries inside each component's own `Scene`, exactly as
`ProjectileMotion3D`/`CircularMotion3D` build their own scene-specific meshes on top of `Vector3D`.
