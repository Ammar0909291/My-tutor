# Mathematics Interactive Layer — Audit

Reviewed the Quantum Interactive Layer, the Classical Mechanics Interactive Layer, and the
Mathematics 3D Foundation Sprint before building any interactive component, to determine which
controls, mastery signals, and misconceptions are meaningful for Mathematics.

## Quantum / Classical Mechanics Interactive Layers (reference pattern)

- Components (`PendulumInteractive3D.tsx`, `AtomicStructureInteractive3D.tsx`, etc.) share one
  shape: local `useState` per parameter → derived values via `useMemo` → a `Scene` reading live
  state inside `ThreeDVisual` → `SimulationControlPanel` driving the same state → a
  `createMasteryEmitter({ visualType: 'quantum_interactive', ... })` wired to every control change
  → an optional `highlightedControlId` prop forwarded from `GuidedSimulationMode`. **This exact
  pattern is reused for all five Mathematics interactive components.**

## Mathematics 3D Foundation Sprint (base components, unmodified)

`CoordinateSystem3D`, `VectorVisualization3D`, `SurfaceVisualization3D`, `GeometricSolids3D`,
`Transformations3D` and the `Vector3D`/`MolecularNode3D` primitives they're built from are reused
as-is by the interactive versions below (new live-state `Scene` functions, not modifications to the
Foundation files).

## Controls needed

| Simulation | Controls | Rationale |
|---|---|---|
| Coordinate system | X, Y, Z coordinate (sliders) | Directly explores how each axis value moves a point and builds the projection lines |
| Vector visualization | vector X, Y, Z (sliders) | Explores how component changes affect magnitude and direction |
| Surface visualization | surface type (dropdown: paraboloid / saddle / plane) | Explores how the algebraic form of z = f(x, y) determines the surface's shape |
| Geometric solids | shape selector (dropdown: cube / sphere / cylinder / cone), scale (slider) | Explores how dimensions drive volume and surface area, and the volume-scales-as-cube misconception |
| Transformations | translation, rotation, scaling (sliders) | Explores how each transformation independently changes a shape's position/orientation/size |

## Meaningful mastery signals

Each interaction (slider drag, dropdown change) emits a `VisualMasterySignal` via
`createMasteryEmitter`, with `interacted: true` and `challengeAttempted: true` on every change, and
`challengeCompleted: true` once the student has touched enough distinct controls to have explored
the concept (2–3 distinct controls per simulation, matching the threshold style already used by
`PendulumInteractive3D`/`AtomicStructureInteractive3D`). No new signal shape, no new
`VisualMasteryEngine` value — all five reuse `'quantum_interactive'`.

## Misconceptions explorable interactively

- **"A coordinate point's position doesn't relate to its individual X/Y/Z values."** Coordinate
  System Interactive lets a student move one axis slider at a time and watch only that projection
  line move, isolating each axis's contribution to the point's position.
- **"A vector's magnitude is just one of its components."** Vector Visualization Interactive shows
  the magnitude readout recompute live from all three components, countering the idea that changing
  one component alone determines length.
- **"All 3D surfaces look like a flat plane tilted in space."** Surface Visualization Interactive
  contrasts a paraboloid, a saddle, and a plane built from the same grid, showing curvature is a
  property of the function, not just the viewing angle.
- **"Doubling a shape's scale doubles its volume."** Geometric Solids Interactive's volume/surface
  area readout updates with the cube of the scale factor, directly countering this misconception
  while the shape visibly grows.
- **"Translation, rotation, and scaling are interchangeable / produce the same kind of change."**
  Transformations Interactive lets a student isolate each transformation independently and compare
  it against the unmoved original shape.

## Verdict

`SimulationControlPanel`, `GuidedSimulationMode`, `createMasteryEmitter`, `ThreeDVisual`, and the
Visual Mastery architecture are all directly reusable for Mathematics with zero modification — the
same precedent Chemistry already established for Quantum/Classical Mechanics' pattern. Task 2–6
build five new interactive components following this exact shape; no new control types, mastery
engine values, or persistence paths were needed.
