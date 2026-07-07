# Universal 3D Audit — Phase 2, Task 1

**Status: audit only, no code changes.** Classifies every existing 3D component by reusability so
Phase 2's subject roadmaps (Tasks 2–4) and library plan (Task 6) can build on accurate ground truth.

## Classification

| Component | Class | Notes |
|---|---|---|
| `ThreeDVisual.tsx` | **Generic reusable / subject-independent** | The entire engine: `Canvas`, lighting, `OrbitControls`, `prefers-reduced-motion` gating, `revealStep` pass-through. Zero subject content. Every future 3D visual, any subject, mounts inside this unchanged. |
| `ParticleSystem3D.tsx` | **Generic reusable / subject-independent** | Generic particle field + movement + highlight pattern. Demonstrates the `revealStep`-gated `useFrame` template every subsequent simulation (quantum and otherwise) has copied. Reusable as-is for any "particles in motion" need (projectile trails, gas particles, electron clouds). |
| `ThreeDEngineStub.tsx` (`WaveSimulation3D`, `FieldVisualization3D`, `StructureVisualization3D`) | **Generic reusable / subject-independent (placeholders)** | Registered `VisualType`s with a shared icosahedron stub mesh. Subject-independent by design — never given quantum-specific content — and are exactly the three generic engine categories (wave, field, structure) that Classical Mechanics, Chemistry, and Math 3D will need real renderers for. |
| `SimulationControlPanel.tsx` | **Generic reusable / subject-independent** | Sliders/toggles/dropdowns/reset, typed via `SimulationControl[]`. Already proven subject-agnostic in Phase 1/2 (used identically by tunneling, Bloch sphere, double-slit, hydrogen orbital). No quantum-specific code anywhere in the file. |
| `GuidedSimulationMode.tsx` | **Generic reusable / subject-independent** | `steps: GuidedStep[]` + render-prop `children`. No subject content; only consumes whatever component is passed as children. |
| `DoubleSlit3D.tsx`, `QuantumTunneling3D.tsx`, `BlochSphere3D.tsx`, `SternGerlach3D.tsx`, `HydrogenOrbital3D.tsx` | **Quantum-specific** | Scene geometry and physics formulas (interference fringes, tunneling transmission, Bloch vector, spin splitting, orbital clouds) are quantum-domain content built on top of `ThreeDVisual`. Not reusable directly, but each is a worked example of the `revealStep`-gated `Scene` pattern other subjects should copy structurally.
| `DoubleSlitInteractive3D.tsx`, `QuantumTunnelingInteractive3D.tsx`, `BlochSphereInteractive3D.tsx`, `HydrogenOrbitalInteractive3D.tsx` | **Quantum-specific** | Same as above, plus live `SimulationControl[]` definitions tied to quantum formulas (transmission probability, fringe spacing, Bloch vector trig, orbital cloud shapes). The *pattern* (local `useState` parameters → `SimulationControlPanel` → live `Scene` recompute) is reusable; the formulas are not.
| `visualTypes.ts` (`three_*` union members + `VISUAL_META`) | **Generic reusable mechanism, quantum-specific entries today** | The `VisualType` union/`VISUAL_META` record mechanism is subject-agnostic and already proven to scale (19 SVG + 9 quantum + 5 three_* entries coexist). The five current `three_*` entries are quantum content; the mechanism itself needs no change to add Classical Mechanics/Chemistry/Math entries.
| `VisualCard.tsx` (switch dispatch, `VISUAL_STEP_COUNTS`) | **Generic reusable mechanism** | The switch/step-count/`revealStep`/narration-sync machinery is fully subject-agnostic — it dispatches on `VisualType`, with no knowledge of "quantum." Adding a new subject means adding switch cases and step counts, not changing the mechanism.
| `detectVisual.ts` (`QUANTUM_RULES`, `QUANTUM_3D_RULES`) | **Generic mechanism, quantum-specific tables** | `matchRules()` and the `detectVisual()`/`parseVisualTag()`/`buildVisualsSystemBlock()` contract are subject-independent (already proven across math/science/quantum branches). The keyword tables themselves are per-subject content, analogous to `MATH_RULES`/`SCIENCE_RULES` already in the same file.

## Summary

| Category | Count | Examples |
|---|---|---|
| Generic reusable / subject-independent | 6 | `ThreeDVisual`, `ParticleSystem3D`, `ThreeDEngineStub` (×3 types), `SimulationControlPanel`, `GuidedSimulationMode` |
| Generic reusable mechanism (subject-agnostic plumbing, currently holding quantum-only entries) | 3 | `visualTypes.ts`, `VisualCard.tsx` switch, `detectVisual.ts` rule-table pattern |
| Quantum-specific (worked examples, not directly reusable) | 9 | the 5 `*3D.tsx` + 4 `*Interactive3D.tsx` simulation files |

**Conclusion**: roughly two-thirds of the engine surface (`ThreeDVisual`, `ParticleSystem3D`,
`SimulationControlPanel`, `GuidedSimulationMode`, the `VisualType`/`VisualCard`/`detectVisual`
mechanisms) is already fully subject-independent and requires zero modification to support a new
subject. Only the actual simulation `Scene` content and keyword tables are quantum-specific and
need subject-specific replacements — exactly the work scoped in Tasks 2–4 below.
