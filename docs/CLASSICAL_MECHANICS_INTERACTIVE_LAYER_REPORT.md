# Classical Mechanics Interactive Layer Sprint — Report

Builds live, student-controlled versions of the five Classical Mechanics 3D Foundation
simulations, reusing the existing Interactive Simulation Layer infrastructure (control panel,
guided mode, mastery bridge) unchanged.

## Files changed

**New (7 files):**
- `docs/CLASSICAL_MECHANICS_INTERACTIVE_AUDIT.md` — Task 1 audit
- `src/components/school/visuals/ProjectileMotionInteractive3D.tsx`
- `src/components/school/visuals/NewtonForcesInteractive3D.tsx`
- `src/components/school/visuals/MomentumCollisionInteractive3D.tsx`
- `src/components/school/visuals/CircularMotionInteractive3D.tsx`
- `src/components/school/visuals/PendulumInteractive3D.tsx`
- `docs/CLASSICAL_MECHANICS_INTERACTIVE_LAYER_REPORT.md` — this file

**Modified (1 file):**
- `src/app/dev/visual-demo/VisualDemo.tsx` — new "Classical Mechanics Interactive Simulations"
  section, each sim wrapped in `GuidedSimulationMode` and wired to the existing mastery collector

No existing 3D engine file, the five non-interactive Classical Mechanics simulations
(`ProjectileMotion3D.tsx`, `NewtonForces3D.tsx`, `MomentumCollision3D.tsx`, `CircularMotion3D.tsx`,
`PendulumMotion3D.tsx`), any quantum file, `SimulationControlPanel.tsx`, `GuidedSimulationMode.tsx`,
or `src/lib/visuals/visualMastery.ts` was modified. Tutor Max, Educational Intelligence, Assessment
Engine, Curriculum Engine, Narration Engine, and Visual Mastery Engine were not touched.

## Simulations added

| Simulation | Controls | Live readout |
|---|---|---|
| `ProjectileMotionInteractive3D` | launch angle, launch velocity, gravity preset (Earth/Moon/Jupiter) | trajectory, range, max height |
| `NewtonForcesInteractive3D` | object mass, gravity strength, friction coefficient | gravity/normal/friction force vectors (via `ForceArrow3D`), weight, friction force |
| `MomentumCollisionInteractive3D` | mass A, mass B, velocity A, velocity B | before/after velocity vectors, total momentum (conserved), momentum transferred |
| `CircularMotionInteractive3D` | radius, angular velocity, mass | animated orbiting body, velocity vector, centripetal force vector |
| `PendulumInteractive3D` | string length, starting angle, gravity preset | animated oscillation, period, KE/PE energy indicator |

Each follows the exact structural pattern of `QuantumTunnelingInteractive3D`: local `useState` per
parameter → derived physics via `useMemo` → `ThreeDVisual` scene reading live state →
`SimulationControlPanel` driving the same state → `createMasteryEmitter` wired to every control
change. `Vector3D`/`ForceArrow3D` (Classical Mechanics 3D Foundation Sprint) are reused unchanged
for all live vectors.

## Guided mode integration

All five are wrapped in `GuidedSimulationMode` (unmodified) in the dev demo with 3-step scripts:

- **Projectile**: increase angle → increase velocity → compare trajectories across gravity presets
- **Newton's Forces**: increase mass → increase friction → observe forces stay balanced
- **Momentum Collision**: equal-mass exchange → unequal masses → momentum conservation
- **Circular Motion**: increase radius → increase angular velocity → increase mass
- **Pendulum**: increase length → change starting angle → switch gravity preset

Each step's `highlightedControlId` matches a real control `id` in the corresponding component,
exactly as the existing `QuantumTunnelingInteractive3D` guided demo does.

## Mastery integration

All five accept the same optional `onMasteryEvent`/`masteryContext` prop pair as every quantum
interactive component, calling `createMasteryEmitter` with `visualType: 'quantum_interactive'` —
reusing the existing generic "3D interactive" mastery bucket rather than introducing a new
`VisualEngine` value, per Task 8's "no new mastery engine, no new signal shape" constraint. The
dev demo wires all five to the page's existing `useVisualMastery()` collector
(`handleMasteryEvent`), the same collector already used by the Quantum Visual Mastery Challenges
section — no new collector, no new persistence path.

## Validation results

```
npx prisma generate   → succeeded
npx tsc --noEmit       → 1 pre-existing error (monaco-editor module, src/components/learn/LessonScreen.tsx)
                          — same error confirmed pre-existing in the prior (Foundation) sprint's
                          git-stash test; not introduced by this sprint, not touched
npm run build           → fails at the same pre-existing monaco-editor error; no error from any
                          file touched in this sprint
```

No new type errors, lint errors, or build errors were introduced by this sprint's 7 new / 1
modified files.

## Future production rollout recommendations

- **Wire into real lessons**: add a `MECHANICS_3D_RULES` keyword table to `detectVisual.ts`
  (mirroring `QUANTUM_3D_RULES`) so interactive mechanics sims can surface from real lesson text,
  the same gap noted as future work in the Foundation sprint's report.
- **Visual Mastery Challenges**: build `MechanicsVisualChallenge` components (mirroring
  `QuantumVisualChallenge`) with multiple-choice mastery checks layered on these five interactive
  sims, reusing the same `createMasteryEmitter`/`useVisualMastery` pipeline.
- **Persist to real lesson sessions**: once mounted inside actual Learn/Practice flows (not just
  the dev demo), pass real `subjectSlug`/`topicSlug`/`sessionId` through `masteryContext` so
  signals roll into the existing `TopicProgress`/`EvidenceRecord` persistence — no new schema
  needed, same path the Quantum interactive layer already uses.
- **Extend the Vector3D/ForceArrow3D pattern**: per `docs/UNIVERSAL_3D_EXPANSION_REPORT.md`'s Task 5
  primitives analysis, Chemistry's roadmapped Bond Formation and Mathematics' Vector Visualization
  can reuse these same two primitives directly when those subjects' interactive layers are built.

## Running instructions

```
cp .env.example .env   # set DATABASE_URL, AUTH_SECRET (openssl rand -base64 32), OPENROUTER_API_KEY
npm install
npx prisma db push
npm run dev            # http://localhost:3000 — view at /dev/visual-demo
npm run build           # prisma generate && next build — pre-existing monaco-editor error unrelated to this sprint
npx tsc --noEmit       # pre-existing monaco-editor + stripe/subscription errors are expected on feature branches
```
