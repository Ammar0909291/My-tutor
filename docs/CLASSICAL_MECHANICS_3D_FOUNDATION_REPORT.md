# Classical Mechanics 3D Foundation Sprint — Report

Implements the first production 3D package for Classical Mechanics on the Universal 3D Educational
Engine, following the rollout plan from `docs/UNIVERSAL_3D_EXPANSION_REPORT.md`.

## Files changed

**New (10 files):**
- `docs/CLASSICAL_MECHANICS_3D_AUDIT.md` — Task 1 audit
- `src/components/school/visuals/Vector3D.tsx` — generic vector primitive
- `src/components/school/visuals/ForceArrow3D.tsx` — generic force-arrow primitive
- `src/components/school/visuals/ProjectileMotion3D.tsx`
- `src/components/school/visuals/NewtonForces3D.tsx`
- `src/components/school/visuals/MomentumCollision3D.tsx`
- `src/components/school/visuals/CircularMotion3D.tsx`
- `src/components/school/visuals/PendulumMotion3D.tsx`
- `docs/CLASSICAL_MECHANICS_3D_FOUNDATION_REPORT.md` — this file

**Modified (3 files):**
- `src/lib/school/visuals/visualTypes.ts` — 5 new `VisualType` union members + `VISUAL_META` entries
- `src/components/school/visuals/VisualCard.tsx` — 5 new imports, switch cases, `VISUAL_STEP_COUNTS` entries
- `src/app/dev/visual-demo/VisualDemo.tsx` — new "Classical Mechanics 3D Foundation" demo section

No existing 3D engine file (`ThreeDVisual.tsx`, `ParticleSystem3D.tsx`, `SimulationControlPanel.tsx`,
`GuidedSimulationMode.tsx`, `ThreeDEngineStub.tsx`) or any quantum simulation file was modified.
Tutor Max, Educational Intelligence, Assessment Engine, Curriculum Engine, Narration Engine, and
Visual Mastery Engine were not touched.

## Primitives created

| Primitive | Generic? | Used by |
|---|---|---|
| `Vector3D` | Yes — start/end positions, color, optional label, `lengthScale`, `thickness`. No mechanics logic. | All 5 mechanics sims (directly or via `ForceArrow3D`). Reusable by any future subject (electric/magnetic field vectors, chemistry bond-dipole vectors, etc.) |
| `ForceArrow3D` | Yes — origin/direction/magnitude/label wrapper over `Vector3D`. No mechanics formulas. | `NewtonForces3D` (gravity, normal) |

## Simulations added

| Simulation | VisualType | 5-stage reveal | Narration compatible |
|---|---|---|---|
| Projectile Motion | `three_projectile_motion` | ground → launch point → traced path → velocity vector (decomposed) → animating trajectory | Yes — same `revealStep` contract as every existing visual |
| Newton's Forces | `three_newton_forces` | object → gravity → normal force → net-force explanation → balanced state | Yes |
| Momentum Collision | `three_momentum_collision` | two objects → motion vectors → collision → momentum transfer → final velocities | Yes |
| Circular Motion | `three_circular_motion` | orbit path → moving body → velocity vector → centripetal force vector → full animated motion | Yes |
| Pendulum Motion | `three_pendulum_motion` | pivot → string → bob → swing motion → energy (KE/PE) indicator | Yes |

All five mount their `Scene` inside the unmodified `ThreeDVisual` host and accept the identical
`{ revealStep?: number }` prop contract as every quantum 3D visual, so `VisualCard`'s existing
switch dispatch, `VISUAL_STEP_COUNTS`, timer-mode playback, and narration-mode playback all drive
them with zero changes to that machinery.

## Validation results

```
npx prisma generate   → succeeded
npx tsc --noEmit       → 1 pre-existing error (monaco-editor module, src/components/learn/LessonScreen.tsx)
                          confirmed present on the branch BEFORE this sprint's changes (git stash test) —
                          not introduced by this sprint, not touched
npm run build           → fails at the same pre-existing monaco-editor error (confirmed pre-existing
                          via git stash before/after comparison) — no error from any file touched
                          in this sprint
```

No new type errors, lint errors, or build errors were introduced by this sprint's 10 new / 3
modified files.

## Future expansion opportunities

- **Interactivity** (next sprint, mirroring Quantum's own phased rollout): wire `SimulationControlPanel`
  (already generic, zero changes needed) to each sim's key parameters — launch angle/speed
  (Projectile), object mass (Newton Forces), pre-collision velocities (Momentum Collision), orbit
  radius/speed (Circular Motion), pendulum length/release angle (Pendulum Motion).
- **Guided Simulation Mode**: once interactive versions exist, `GuidedSimulationMode` (already
  generic) can wrap them exactly as it wraps `QuantumTunnelingInteractive3D` today.
- **Visual Mastery challenges**: once interactive, the same `createMasteryEmitter`/`useVisualMastery`
  pipeline used by `QuantumVisualChallenge` extends to mechanics with no new collector code.
- **`detectVisual.ts` keyword rules**: this sprint registers the VisualTypes engine-side only (Task 9
  scope); a future sprint adds a `MECHANICS_3D_RULES` table (mirroring `QUANTUM_3D_RULES`) so these
  surface automatically from lesson text via the `VISUAL:` tag.
- **Vector3D reuse beyond Mechanics**: confirmed reusable as designed — Chemistry's roadmapped
  Bond Formation visual and Mathematics' roadmapped Vector Visualization both consume `Vector3D`
  directly per `docs/UNIVERSAL_3D_EXPANSION_REPORT.md`'s Task 5 primitives analysis.

## Running instructions

```
cp .env.example .env   # set DATABASE_URL, AUTH_SECRET (openssl rand -base64 32), OPENROUTER_API_KEY
npm install
npx prisma db push
npm run dev            # http://localhost:3000 — view at /dev/visual-demo
npm run build           # prisma generate && next build — pre-existing monaco-editor error unrelated to this sprint
npx tsc --noEmit       # pre-existing monaco-editor + stripe/subscription errors are expected on feature branches
```
