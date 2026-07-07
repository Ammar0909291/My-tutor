# Classical Mechanics 3D Audit — Foundation Sprint, Task 1

**Status: audit only, precedes Tasks 2–12 of the same sprint.** Confirms exactly which existing
3D engine systems are reused unmodified for the Classical Mechanics 3D package, per
`docs/UNIVERSAL_3D_AUDIT.md`'s prior classification.

## Reuse determination

| System | Reused as-is? | How |
|---|---|---|
| `ThreeDVisual.tsx` | **Yes, unmodified** | Every new simulation (`ProjectileMotion3D`, `NewtonForces3D`, `MomentumCollision3D`, `CircularMotion3D`, `PendulumMotion3D`) mounts its `Scene` inside `<ThreeDVisual>` exactly like `QuantumTunneling3D`/`BlochSphere3D` do — same `Canvas`, lighting, `OrbitControls`, `prefers-reduced-motion` gating. Zero changes to this file. |
| `ParticleSystem3D.tsx` | **Pattern reused, not the component itself** | None of the five Mechanics sims render literal particle clouds, so the component isn't imported directly. Its `revealStep`-gated `useFrame` template (compute target state per step, animate via `useFrame`, gate visibility booleans off `revealStep`) is the structural pattern every new `Scene` copies — same as every quantum 3D sim already does. |
| Camera/light setup (inside `ThreeDVisual`) | **Yes, unmodified** | `cameraDistance` prop (already exposed by `ThreeDVisual`) is reused per-simulation exactly like `QuantumTunneling3D` passes `cameraDistance={11}` for its wider scene — no change to the lighting rig or `Canvas` config itself. |
| Narration synchronization (`VisualCard`'s `revealStep`/`narrationStep` plumbing, `synchronizedPlayback.ts`) | **Yes, unmodified** | All five new sims accept the same `{ revealStep?: number }` prop contract as every existing 3D visual. `VisualCard` drives `revealStep` identically whether the underlying component is 2D SVG, 3D quantum, or 3D mechanics — no new sync code. |
| `VisualCard.tsx` integration (switch dispatch, `VISUAL_STEP_COUNTS`) | **Extended, not redesigned** | Five new `case` branches and five new `VISUAL_STEP_COUNTS` entries are added (Task 9), following the exact pattern of the nine existing quantum `three_*` entries. The switch/step-count/revealStep/narration-sync machinery itself is untouched. |
| `visualTypes.ts` (`VisualType` union, `VISUAL_META`) | **Extended, not redesigned** | Five new `VisualType` union members + five new `VISUAL_META` entries, following the exact shape of the nine existing `three_*` entries. Mechanism unchanged. |
| `SimulationControlPanel.tsx`, `GuidedSimulationMode.tsx` | **Not used this sprint** | This sprint builds only the `revealStep`-gated (narration) versions, mirroring Quantum Physics Phase 1 (3D Quantum Simulations) before its later Interactive Layer phases. Interactive (student-controlled) versions of these five sims are a follow-up sprint, at which point these two components will be reused unmodified exactly as they were for Tunneling/Bloch/DoubleSlit/HydrogenOrbital. |
| `detectVisual.ts` | **Not touched this sprint** | Task 9 only requires VisualType registration (engine-side), not keyword-detection rules. Detection rules for Classical Mechanics topics are out of scope here — visuals are invoked via the `VISUAL:` tag / direct `VisualCard` usage (dev demo), same as how the nine `three_*` quantum types were registered before `QUANTUM_3D_RULES` existed in a later sprint. |

## New, generic (subject-independent) additions this sprint

| New file | Class | Notes |
|---|---|---|
| `Vector3D.tsx` | **Generic reusable / subject-independent** | Start/end position, arrow head, label, color, scalable length — zero mechanics-specific logic. Built once, reusable by any future subject needing a 3D arrow (electric/magnetic field vectors, velocity vectors, etc., per the sprint's own stated examples). |
| `ForceArrow3D.tsx` | **Generic reusable / subject-independent** | Thin wrapper over `Vector3D` adding magnitude/direction/label conventions. Mechanics is the first consumer (gravity, normal, friction, tension), but the component itself encodes no mechanics formulas — reusable by Chemistry (intermolecular force arrows) or any subject needing labeled force vectors. |

## Conclusion

All five Classical Mechanics simulations are built as net-new subject-specific `Scene` content
mounted on the unmodified `ThreeDVisual` host, following the exact structural precedent
`docs/UNIVERSAL_3D_AUDIT.md` already established for the nine quantum 3D simulations. The only
new *generic* engine surface added is the `Vector3D`/`ForceArrow3D` primitive pair (Task 2/3),
which Task 5 of the prior Phase 2 sprint had already identified as the highest-leverage missing
primitive — confirmed here by it being needed in 4 of the 5 new simulations (Newton Forces,
Momentum Collision, Circular Motion all use force/velocity vectors directly; Pendulum Motion
implicitly via tension, deferred to a label-only indicator for clarity).
