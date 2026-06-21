# Chemistry 3D Interactive Layer — Audit

Reviewed the Quantum Interactive Layer, the Classical Mechanics Interactive Layer, and the
Chemistry Foundation Sprint before building any interactive component, to determine which controls,
mastery signals, and misconceptions are meaningful for Chemistry.

## Quantum Interactive Layer (reference pattern)

- Components (`QuantumTunnelingInteractive3D.tsx`, `BlochSphereInteractive3D.tsx`, etc.) share one
  shape: local `useState` per parameter → derived physics via `useMemo` → a `Scene` reading live
  state inside `ThreeDVisual` → `SimulationControlPanel` driving the same state → a `createMasteryEmitter`
  wired to every control change → an optional `highlightedControlId` prop forwarded from
  `GuidedSimulationMode`.

## Classical Mechanics Interactive Layer (reference pattern)

- Identical structure to Quantum (e.g. `PendulumInteractive3D.tsx`): sliders/dropdowns drive a live
  `Scene`, `onMasteryEvent`/`masteryContext` are optional pass-through props, and every component
  reuses `createMasteryEmitter({ visualType: 'quantum_interactive', ... })` — the existing generic
  "3D interactive" mastery bucket, not a new `VisualEngine` value. **This exact pattern was reused
  for all five Chemistry interactive components.**

## Chemistry Foundation Sprint (base components, unmodified)

`AtomicStructure3D`, `ElectronShells3D`, `MolecularShapes3D`, `BondFormation3D`,
`CrystalLattice3D` and the `MolecularNode3D`/`Bond3D` primitives they're built from are reused
as-is by the interactive versions below (new live-state `Scene` functions, not modifications to the
Foundation files).

## Controls needed

| Simulation | Controls | Rationale |
|---|---|---|
| Atomic structure | proton count, neutron count, electron count (sliders) | Directly explores the proton-defines-element misconception and ion formation |
| Electron shells | atomic number (slider), shell display mode (dropdown) | Explores shell-filling order (K before L before M) |
| Molecular shapes | molecule type (dropdown: linear / trigonal planar / tetrahedral) | Explores how electron-domain geometry sets bond angle |
| Bond formation | bond type (dropdown: ionic / covalent / metallic) | Explores the misconception that "bonding" is one mechanism — contrasts transfer vs. sharing vs. delocalization |
| Crystal lattice | lattice size (slider), lattice type (dropdown: simple cubic / body-centered) | Explores how a single unit cell repeats into a macroscopic crystal |

## Meaningful mastery signals

Each interaction (slider drag, dropdown change) emits a `VisualMasterySignal` via
`createMasteryEmitter`, with `interacted: true` and `challengeAttempted: true` on every change, and
`challengeCompleted: true` once the student has touched enough distinct controls to have explored
the concept (2–3 distinct controls per simulation, matching the threshold style already used by
`PendulumInteractive3D`/`ProjectileMotionInteractive3D`). No new signal shape, no new
`VisualMasteryEngine` value — all five reuse `'quantum_interactive'`.

## Misconceptions explorable interactively

- **"Changing neutrons changes the element."** Atomic Structure Interactive lets students change
  neutron count while watching the atomic number (proton count) stay fixed and the mass number
  change — directly counters this misconception.
- **"All atoms with the same proton count are neutral."** Changing electron count independently of
  proton count produces a nonzero charge state readout, showing ions form when electron count ≠
  proton count.
- **"Electrons fill shells in random order."** Electron Shells Interactive enforces the K→L→M
  filling order live as atomic number increases.
- **"All molecules look the same shape."** Molecular Shapes Interactive directly contrasts 180°,
  120°, and 109.5° bond angles across linear/trigonal-planar/tetrahedral geometries.
- **"All chemical bonds work the same way."** Bond Formation Interactive contrasts complete electron
  transfer (ionic) against shared pairs (covalent) against a delocalized electron sea (metallic).
- **"A unit cell and a crystal are the same thing."** Crystal Lattice Interactive shows a single
  unit cell at lattice size 1, then visibly repeating into a larger lattice as size increases.

## Verdict

`SimulationControlPanel`, `GuidedSimulationMode`, `createMasteryEmitter`, `ThreeDVisual`, and the
Visual Mastery architecture are all directly reusable for Chemistry with zero modification — the
same precedent Classical Mechanics already established for Quantum's pattern. Task 2–6 build five
new interactive components following this exact shape; no new control types, mastery engine values,
or persistence paths were needed.
