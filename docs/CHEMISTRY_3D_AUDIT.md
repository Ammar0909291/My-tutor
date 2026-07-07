# Chemistry 3D Foundation — Architecture Audit

Reviewed the Universal 3D Educational Framework, the Quantum Physics 3D implementation, and the
Classical Mechanics 3D implementation before building any Chemistry component, to determine which
existing primitives and patterns can be reused unchanged.

## Universal 3D framework

- `ThreeDVisual.tsx` — the shared React Three Fiber scene host (camera, lighting, responsive
  layout, reduced-motion-gated `OrbitControls`). Fully subject-agnostic: takes `children`,
  `revealStep`, `ariaLabel`, `cameraDistance`. **Reused unchanged** by all five Chemistry
  components, exactly as Quantum and Classical Mechanics already do.
- `VisualCard.tsx` — generic dispatcher: `VISUAL_STEP_COUNTS` (per-`VisualType` step count) +
  a `switch` on `VisualType` rendering the matching component with `revealStep={playback.revealStep}`.
  No subject-specific logic. **Extended** (not redesigned) with five new `case` entries and five new
  `VISUAL_STEP_COUNTS` entries, mirroring the existing quantum/mechanics entries exactly.
- `useTeachingPlayback` / `synchronizedPlayback.ts` / `VisualPlaybackControls` — operate purely on
  `stepCount` and narration/timer progress, with zero `VisualType` branching. **Untouched.**

## Quantum 3D implementation (reference pattern)

- Components (`DoubleSlit3D.tsx`, `BlochSphere3D.tsx`, etc.) follow an identical shape: a `Scene`
  function reading `revealStep` to gate JSX sections (`showX = revealStep >= n`), wrapped by an
  exported component that renders `<ThreeDVisual revealStep cameraDistance ariaLabel><Scene .../></ThreeDVisual>`.
  **This exact shape was reused for all five Chemistry components.**

## Classical Mechanics 3D implementation (reference pattern)

- Same `Scene`-gated-by-`revealStep` shape as Quantum (e.g. `ProjectileMotion3D.tsx`).
- Introduced two new subject-independent geometric primitives in its own Foundation Sprint:
  `Vector3D.tsx` (labeled arrow between two points) and `ForceArrow3D.tsx`. These proved the
  pattern of building small, curriculum-free 3D primitives once and reusing them across multiple
  simulation components — the same pattern Task 2 of this sprint applies for Chemistry
  (`MolecularNode3D`, `Bond3D`).

## Reusable primitives identified

| Primitive | Source | Reuse in this sprint |
|---|---|---|
| `ThreeDVisual` | 3D Educational Engine Foundation Sprint | Host for all 5 new components, unchanged |
| `VisualCard` dispatch contract | Sprint BW / R.1 | Extended with 5 new types, no redesign |
| `Html` (drei) label pattern | `Vector3D.tsx` | Reused for atom/bond/shell labels |
| `Scene`-gated-by-`revealStep` shape | Quantum 3D, Mechanics 3D | Reused verbatim for all 5 components |
| Quaternion-aligned cylinder (bond/vector shaft) | `Vector3D.tsx` | Reused (adapted) inside the new `Bond3D` primitive |

No existing primitive needed modification. No new detection architecture, narration architecture,
or playback architecture was required — every reuse point above is additive.

## Verdict

The Universal 3D Engine, `VisualCard`, narration/playback infrastructure, and the
`Scene`-gated-by-`revealStep` authoring pattern proven by Quantum Physics and Classical Mechanics
are all directly reusable for Chemistry with zero modification beyond `VisualCard`'s additive
dispatch-table entries. Task 2 builds two new subject-independent primitives
(`MolecularNode3D`, `Bond3D`) following the exact precedent set by `Vector3D`/`ForceArrow3D`.
