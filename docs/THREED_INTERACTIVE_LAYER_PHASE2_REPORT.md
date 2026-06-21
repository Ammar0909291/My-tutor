# 3D Interactive Simulation Layer Phase 2 — Report (Task 8)

**Status: complete, additive only.** Completes the items deferred from Phase 1 (Double Slit and
Hydrogen Orbital interactivity, Guided Simulation Mode, Visual Mastery bridge) and adds a
read-only production-integration audit. No architecture redesign, no existing simulation replaced,
no Tutor Max / Educational Intelligence / Assessment / Curriculum changes.

## Task completion

| Task | Status |
|---|---|
| 1 — Double Slit interactivity | **Done** — `DoubleSlitInteractive3D.tsx` |
| 2 — Hydrogen Orbital interactivity | **Done** — `HydrogenOrbitalInteractive3D.tsx` |
| 3 — `GuidedSimulationMode.tsx` | **Done** |
| 4 — Visual Mastery bridge | **Done** — minimal additive bridge on all four interactive components |
| 5 — Production lesson integration audit | **Done** (audit only, no implementation per instruction) |
| 6 — Dev demo | **Done** |
| 7 — Validation | **Done** |
| 8 — This report | **Done** |

## Files changed

| File | Change |
|---|---|
| `src/components/school/visuals/DoubleSlitInteractive3D.tsx` | **new** — slit width / slit separation / wavelength sliders, live fringe-spacing readout, wavelength-tinted fringe color |
| `src/components/school/visuals/HydrogenOrbitalInteractive3D.tsx` | **new** — 1s/2s/2p/3d dropdown selector, live cloud switch (extends the Phase 1 cloud-point generator with a 3d cloverleaf shape) |
| `src/components/school/visuals/GuidedSimulationMode.tsx` | **new** — generic step-through wrapper: instruction banner, Next/Previous/Reset, render-prop exposing `highlightedControlId`/`highlightedSceneObjectId` per step |
| `src/components/school/visuals/QuantumTunnelingInteractive3D.tsx` | +optional `highlightedControlId`, `onMasteryEvent`, `masteryContext` props (passed through to `SimulationControlPanel` / the new mastery bridge); behavior unchanged when omitted |
| `src/components/school/visuals/BlochSphereInteractive3D.tsx` | same additive props as above |
| `src/app/dev/visual-demo/VisualDemo.tsx` | +2 imports, +1 import for `GuidedSimulationMode`; extends "Interactive Quantum Simulations" with the two new simulations; adds a "Guided Simulation Mode" section |
| `docs/THREED_INTERACTIVE_LAYER_PHASE2_REPORT.md` | new — this report |

**Not touched**: `ThreeDVisual.tsx`, `DoubleSlit3D.tsx`, `QuantumTunneling3D.tsx`, `BlochSphere3D.tsx`,
`SternGerlach3D.tsx`, `HydrogenOrbital3D.tsx`, `SimulationControlPanel.tsx` (used as-is — its
`highlightedControlId` prop, built in Phase 1 anticipating this exact use, needed no changes),
`visualTypes.ts`, `VisualCard.tsx`, `useTeachingPlayback.ts`, `synchronizedPlayback.ts`,
`narrationProgress.ts`, `detectVisual.ts`, `learn/chat/route.ts`, `visualMastery.ts`, or any
Tutor Max / Educational Intelligence / Assessment / Curriculum file.

## Guided Simulation Mode (Task 3)

`GuidedSimulationMode` is a generic, subject-agnostic wrapper: it takes a `steps: GuidedStep[]`
array (`{ instruction, highlightedControlId?, highlightedSceneObjectId? }`) and a render-prop
`children` function, and owns a local 1-indexed `revealStep`-style step pointer (`useState`, not
narration-derived). It renders an instruction banner plus Next/Previous/Reset, and passes the
current step's `highlightedControlId` down to whatever the caller renders — in the dev demo this is
`QuantumTunnelingInteractive3D`'s new `highlightedControlId` prop, which forwards straight into
`SimulationControlPanel`'s existing highlight outline (built in Phase 1 for exactly this purpose).

This deliberately does **not** consume `narrationTimeline`/`useTeachingPlayback` — Task 3 explicitly
required "no new narration architecture," and the existing narration system is wired through
`VisualCard`, which these interactive (non-`revealStep`) components do not use (see Phase 1's
architecture decision, restated below). Instead it reuses the same *paradigm* as `revealStep` (a
1-indexed integer step pointer with Next/Previous/Reset), so a future sprint could drive this
component's step pointer from real narration with no contract change, exactly as `VisualCard`
already does for the revealStep-gated simulations.

`highlightedSceneObjectId` is defined on `GuidedStep` and threaded through the render-prop for
future use (e.g. a Scene component highlighting a specific mesh by id), but no Scene in this sprint
consumes it yet — only `highlightedControlId` has a live consumer today (the dev-demo's guided
tunneling example). This is intentionally minimal: adding scene-object highlighting to one
simulation now would create inconsistent behavior across the other three, so it's left for a
follow-up once more simulations adopt the guided wrapper.

## Visual Mastery bridge (Task 4)

Phase 1 concluded interactive simulations are open-ended exploration tools with no single "correct"
parameter value, so a *graded* bridge (à la `QuantumVisualChallenge`'s MCQ) doesn't fit without
inventing new challenge-spec surface area. This sprint adds the **safest possible additive bridge**
instead: each of the four interactive components now accepts optional `onMasteryEvent` /
`masteryContext` props and, when supplied, calls the existing `createMasteryEmitter({ visualType:
'quantum_interactive', ... })` — the same factory and the same `visualType` value
`QuantumVisualChallenge` already uses, so no new `VisualMasteryEngine` value, no new emission
contract, and `emit()` is a guaranteed no-op when the props are omitted (zero behavior change for
every existing caller, including the Phase 1 dev-demo usages which still don't pass these props).

Signal semantics, chosen to fit "exploration" rather than "correctness":
- `interacted: true` on every control change (the student touched the simulation).
- `challengeAttempted: true` on every control change (there is no separate "submit" step).
- `challengeCompleted: true` once the student has touched a *threshold* of distinct controls —
  tunneling/double-slit: all 3 sliders touched at least once; Bloch sphere: both theta and phi (2);
  hydrogen orbital: all 4 orbitals selected at least once. This treats "explored the full parameter
  space" as the mastery signal for an open-ended simulation, reusing the exact same
  `VisualMasterySignal`/`summarizeVisualMastery` aggregation pipeline unchanged — no new mastery
  engine, no new persistence path.

Not wired into the dev demo's collector by default (the demo's existing
`MASTERY_DEMO_SPECS`/`handleMasteryEvent` plumbing is left untouched, per "no redesign"); the new
props exist on the components and are ready for the dev demo or a real lesson surface to pass
`onMasteryEvent={recordMasteryEvent}` whenever desired, exactly like `QuantumVisualChallenge` does.

## Task 5 — Production lesson integration audit (no implementation)

**Current path**: `Tutor Response → detectVisual()/parseVisualTag() → VisualType → VisualCard →
VisualComponent switch`. Traced in `src/app/api/learn/chat/route.ts` (calls
`detectVisual`/`buildVisualsSystemBlock`/`parseVisualTag` from `src/lib/school/visuals/detectVisual.ts`)
and `src/components/school/visuals/VisualCard.tsx`.

**Finding — blocker 1 (pre-existing, not introduced by this sprint)**: `detectVisual.ts`'s keyword
rule tables (`QUANTUM_RULES`) and its hard-coded `VALID`/`all` type lists in `parseVisualTag()` and
`buildVisualsSystemBlock()` only ever reference the nine 2D quantum `VisualType`s
(`double_slit`, `wave_function`, `potential_well`, `quantum_tunneling`, `bloch_sphere`,
`energy_level_diagram`, `quantum_circuit`, `stern_gerlach`, `entanglement_pair`). **None of the five
`three_*` 3D quantum `VisualType`s are reachable from a real lesson today** — not even the
non-interactive, revealStep-gated ones shipped in Quantum 3D Phase 1. This is an existing gap, not
something this sprint created.

**Finding — blocker 2**: even if a `three_*` type were added to `detectVisual`'s tables, `VisualCard`
always renders through `useTeachingPlayback`'s timer/narration `revealStep` contract — it has no
slot for the four new interactive (non-`revealStep`) components, which take no `revealStep` prop at
all and manage their own `useState`.

**Finding — blocker 3**: the interactive components have no `VisualType` membership, so they cannot
be returned by `detectVisual()` or matched by `parseVisualTag()`'s `VALID` set without first deciding
how a parameter-driven, open-ended widget should behave inside a card whose chrome
(`VisualPlaybackControls`: Play/Pause/Replay/speed) assumes a finite, autoplaying sequence — those
controls have no meaning for a student-driven simulation.

**Safest no-redesign integration path** (recommended, not implemented this sprint):
1. Add the five `three_*` types (already registered) to `QUANTUM_RULES`/`VALID`/`all` in
   `detectVisual.ts` first — this alone would let the *existing, non-interactive* 3D simulations
   start appearing in real lessons with zero new components, since they already speak the
   `VisualCard`/`revealStep` contract end-to-end. Lowest-risk, highest-value first step.
2. For the *interactive* components specifically: introduce a second, parallel switch path inside
   `VisualCard` (or a small sibling wrapper) gated by a new boolean such as `interactive: true` on
   `VISUAL_META`, which — only for those types — renders the bare interactive component (no
   `VisualPlaybackControls`, since Play/Pause/Replay/speed don't apply) instead of the
   `revealStep`-driven `VisualComponent`. This is additive (`VisualCard`'s existing branch is
   untouched for every other type) rather than a redesign of the playback contract.
3. Register four new `VisualType`s (`three_double_slit_interactive`, `three_quantum_tunneling_interactive`,
   `three_bloch_sphere_interactive`, `three_hydrogen_orbital_interactive`) and matching
   `VISUAL_META`/keyword rules, reusing the components built in Phase 1/2 unchanged.

This audit deliberately stops at "document the path" — no code in `detectVisual.ts`, `route.ts`,
`visualTypes.ts`, or `VisualCard.tsx` was changed this sprint, per "Do NOT implement yet."

## Educational review

- **Double slit**: slit width is decoupled from fringe spacing (only wavelength/separation affect
  it), directly visible because changing width alone never moves the fringe bars, while wavelength/
  separation do — reinforcing the actual physics (`spacing ∝ λ/d`) over the common misconception
  that a wider slit changes fringe spacing.
- **Hydrogen orbital**: adding 3d alongside 1s/2s/2p continues the "every orbital is a cloud, never
  a flat ring" message established in Phase 1, now across four distinct shapes (sphere, bimodal
  sphere, dumbbell, cloverleaf) selected live rather than only seen in a fixed reveal sequence.
- **Guided mode**: turns free exploration into a directed mini-lesson (raise height → widen barrier →
  raise energy) that visually reinforces the same "barrier height is fixed" point Phase 1's caption
  makes in text, now reinforced by which control lights up at each step.

## Validation results (Task 7)

| Command | Result |
|---|---|
| `npx prisma generate` | exit 0 ✓ |
| `npx tsc --noEmit -p tsconfig.json` | **0 new errors.** Only the pre-existing, unrelated `Cannot find module 'monaco-editor'` (`LessonScreen.tsx:646`) remains. |
| `npm run build` | Next.js compile step **succeeded** (`✓ Compiled successfully`), no new ESLint errors. Build pipeline stops at the same pre-existing `monaco-editor` type-check step as every prior sprint — confirmed unrelated to any file this sprint touched. |

## Future roadmap

1. Implement the Task 5 integration path above, starting with step 1 (lowest risk: wire the five
   already-registered, non-interactive `three_*` types into `detectVisual.ts`).
2. Build the `interactive: true` `VisualCard` branch (step 2) and register the four interactive
   components as `VisualType`s (step 3), enabling them in real lessons.
3. Extend `GuidedSimulationMode` usage to the other three interactive simulations and give
   `highlightedSceneObjectId` a real consumer in at least one Scene.
4. Wire `onMasteryEvent`/`masteryContext` from a real lesson surface once Task 5's integration
   ships, reusing the bridge built this sprint unchanged.

## Running instructions

```
cp .env.example .env   # set DATABASE_URL, AUTH_SECRET (openssl rand -base64 32), OPENROUTER_API_KEY
npm install
npx prisma db push
npm run dev            # http://localhost:3000 → /dev/visual-demo → "Interactive Quantum Simulations" / "Guided Simulation Mode"
npm run build           # prisma generate && next build (pre-existing monaco-editor type error is expected)
npx tsc --noEmit         # pre-existing monaco-editor error is expected on this branch
```

## STOP AFTER REPORT

Additive only. No architecture/engine redesign, no Tutor Max, Educational Intelligence, Assessment,
or Curriculum changes. No existing simulation replaced or modified. Production lesson integration
documented, not implemented, per explicit instruction. Committed only after validation confirmed
zero new errors.
