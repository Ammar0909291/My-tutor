# 3D Quantum Simulations Phase 1 — Foundation Audit (Task 1)

**Status: audit only.** Reviews the Universal 3D Engine Foundation (Sprint 1) to confirm what is
reusable before building five production quantum 3D simulations. No code changed in this task.

## What already exists

- **`ThreeDVisual.tsx`** (`src/components/school/visuals/`) — the shared React Three Fiber scene host:
  `<Canvas>` with `dpr={[1,2]}`, perspective camera (`cameraDistance` prop), ambient + two directional
  lights, `OrbitControls` (pan disabled, `autoRotate` gated by `prefers-reduced-motion`), responsive
  `aspect-ratio` layout, `touchAction:'none'` for mobile, `role="img"` + `ariaLabel`. Accepts
  `children` (scene contents) and a pass-through `revealStep`. **Fully reusable as the wrapper for all
  five new simulations.**
- **`ParticleSystem3D.tsx`** — the first production demo and the canonical pattern: a `revealStep`-gated
  scene component rendered inside `<ThreeDVisual>`, using `useFrame` for animation and per-step boolean
  gates (`revealStep >= N`). **Reused as the structural template for each new simulation.**
- **VisualCard integration** — `VisualCard.tsx` owns the exhaustive `VISUAL_STEP_COUNTS:
  Record<VisualType, number>` map and the `VisualComponent` switch (no `default` arm; TypeScript forces
  a case + step count per type). Adding a `VisualType` requires: union member + `VISUAL_META` entry
  (`visualTypes.ts`), `VISUAL_STEP_COUNTS` entry, switch case + import (`VisualCard.tsx`).
- **Narration synchronization** — `useTeachingPlayback` + `synchronizedPlayback.ts`'s
  `visualStepForSegment()` map narration segment N → `revealStep` N, renderer-agnostic. Confirmed: a
  component taking `{ revealStep?: number }` is automatically narration-compatible with **zero new
  code**.
- **RevealStep architecture** — `revealStep: number` flows from `useTeachingPlayback` (timer or
  narration mode) into `VisualComponent` and onward to each scene; each scene gates its stages on
  `revealStep >= N`.
- **Existing 3D registrations** — `three_particle_system` (production), plus three foundation stubs
  (`three_wave_simulation`, `three_field_visualization`, `three_structure_visualization`).

## What can be reused (no modification)

- `ThreeDVisual.tsx` wrapper — used verbatim by all five new simulations.
- `useTeachingPlayback`, `synchronizedPlayback.ts`, `narrationProgress.ts`, `VisualPlaybackControls.tsx`
  — the entire playback/narration/controls stack, untouched.
- The `revealStep`-gated `useFrame` animation pattern from `ParticleSystem3D.tsx`.
- The `@react-three/fiber` + `@react-three/drei` + `three` dependency set already installed in Sprint 1.

## What must be implemented (this sprint)

1. Five new scene components, each `revealStep`-gated and wrapped in `<ThreeDVisual>`:
   `DoubleSlit3D.tsx`, `QuantumTunneling3D.tsx`, `BlochSphere3D.tsx`, `SternGerlach3D.tsx`,
   `HydrogenOrbital3D.tsx`.
2. Five new `VisualType` registrations: `three_double_slit`, `three_quantum_tunneling`,
   `three_bloch_sphere`, `three_stern_gerlach`, `three_hydrogen_orbital` (union + `VISUAL_META` +
   `VISUAL_STEP_COUNTS` + switch cases + imports).
3. A "Quantum Physics 3D Simulations" dev-demo section.

No new engine, no new playback/narration architecture, no changes to Tutor Max / Educational
Intelligence / Assessment / Curriculum / existing 2D visuals — purely additive, exactly like the
2D quantum visual expansion sprints.
