# Chemistry 3D Foundation Sprint — Report

Builds the first production 3D package for Chemistry, reusing the Universal 3D Educational
Framework, `ThreeDVisual`, `VisualCard`, narration synchronization, and the `revealStep`
architecture exactly as proven by the Quantum Physics and Classical Mechanics 3D sprints.

## Architecture findings

See `docs/CHEMISTRY_3D_AUDIT.md` (Task 1) for the full review. Summary: `ThreeDVisual`,
`VisualCard`'s dispatch contract, and the narration/playback engine were already fully generic and
needed no changes beyond additive registration. The `Scene`-gated-by-`revealStep` authoring pattern
proven by Quantum and Classical Mechanics 3D components was reused verbatim for all five new
Chemistry components.

## Reusable primitives created (Task 2)

- `src/components/school/visuals/MolecularNode3D.tsx` — a labeled sphere at a position/radius/color.
  No chemistry-curriculum logic (no element data, no bonding rules) — purely geometric, mirroring
  `Vector3D`'s role as a generic building block.
- `src/components/school/visuals/Bond3D.tsx` — one or more parallel cylinders between two atom
  positions, with `bondOrder` (1/2/3) controlling strand count, plus an optional label. Reuses the
  same quaternion-aligned-cylinder technique as `Vector3D`. No valence/electronegativity logic.

## Visuals created

| Component | VisualType | Reveal sequence |
|---|---|---|
| `AtomicStructure3D.tsx` | `three_atomic_structure` | nucleus → proton/neutron display → electron shell → multiple shells → completed atom |
| `ElectronShells3D.tsx` | `three_electron_shells` | nucleus → K shell → L shell → M shell → electron population |
| `MolecularShapes3D.tsx` | `three_molecular_shapes` | atoms → bonds → geometry → bond angles → final molecule |
| `BondFormation3D.tsx` | `three_bond_formation` | separate atoms → valence electrons → approach → bond formation → stable molecule |
| `CrystalLattice3D.tsx` | `three_crystal_lattice` | unit cell → repeated structure → lattice growth → symmetry → completed crystal |

Each follows the exact `Scene` + `revealStep`-gated-JSX + `ThreeDVisual` wrapper shape used by every
existing 3D visual; each is built from `MolecularNode3D`/`Bond3D` plus plain Three.js primitives
(torus rings for electron shells, a wireframe sphere for tetrahedral geometry, a simple cubic grid
for the crystal lattice).

## Visual registration (Task 8)

- `src/lib/school/visuals/visualTypes.ts`: added the five `VisualType` union members and their
  `VISUAL_META` (`title`/`description`) entries.
- `src/components/school/visuals/VisualCard.tsx`: added the five imports, five
  `VISUAL_STEP_COUNTS` entries (5 steps each, matching every other 3D visual), and five `switch`
  cases in `VisualComponent`.

No detection wiring (`detectVisual.ts`) was touched — per this sprint's scope, only the Foundation
package (components + registration + dev demo) was built, not production lesson integration.

## Dev demo (Task 9)

`src/app/dev/visual-demo/VisualDemo.tsx`: added a `CHEMISTRY_3D_DEMOS` array and a "Chemistry 3D
Foundation" section, rendering all five visuals through the production `VisualCard` — identical
structure to the existing "Classical Mechanics 3D Foundation" section.

## Validation results (Task 10)

```
npx prisma generate   → succeeded
npx tsc --noEmit       → 1 pre-existing error (monaco-editor module, src/components/learn/LessonScreen.tsx)
                          — same error present before this sprint's changes, confirmed present in
                          the immediately prior (Classical Mechanics Production Integration) sprint's
                          validation run; not introduced by this sprint
npm run build           → fails at the same pre-existing monaco-editor error; no error from any
                          file touched in this sprint
```

No new type errors, lint errors, or build errors were introduced by this sprint's 7 new / 3
modified files.

## Files changed

**New (9 files):**
- `docs/CHEMISTRY_3D_AUDIT.md`
- `src/components/school/visuals/MolecularNode3D.tsx`
- `src/components/school/visuals/Bond3D.tsx`
- `src/components/school/visuals/AtomicStructure3D.tsx`
- `src/components/school/visuals/ElectronShells3D.tsx`
- `src/components/school/visuals/MolecularShapes3D.tsx`
- `src/components/school/visuals/BondFormation3D.tsx`
- `src/components/school/visuals/CrystalLattice3D.tsx`
- `docs/CHEMISTRY_3D_FOUNDATION_REPORT.md` (this file)

**Modified (3 files):**
- `src/lib/school/visuals/visualTypes.ts` (5 new `VisualType`s + `VISUAL_META` entries)
- `src/components/school/visuals/VisualCard.tsx` (5 imports, 5 `VISUAL_STEP_COUNTS`, 5 switch cases)
- `src/app/dev/visual-demo/VisualDemo.tsx` (new "Chemistry 3D Foundation" demo section)

No change to `ThreeDVisual.tsx`, `Vector3D.tsx`, `ForceArrow3D.tsx`, any Quantum or Classical
Mechanics simulation component, `SimulationControlPanel.tsx`, `GuidedSimulationMode.tsx`,
`src/lib/visuals/visualMastery.ts`, or `src/lib/school/visuals/detectVisual.ts`.

## Production readiness

**Foundation complete, not yet production-reachable from real lessons.** All five Chemistry 3D
visuals are built, registered in `VisualCard`/`VISUAL_STEP_COUNTS`/`visualTypes.ts`, and rendered
through the unmodified production `VisualCard`/`ThreeDVisual`/narration pipeline in the dev demo —
identical proof-of-integration to the Quantum and Classical Mechanics Foundation sprints. As with
those subjects' Foundation sprints, `detectVisual.ts` keyword wiring and interactive
(student-controlled) versions are deliberately out of scope here and were not started, per this
sprint's explicit instructions.

## Running instructions

```
cp .env.example .env   # set DATABASE_URL, AUTH_SECRET (openssl rand -base64 32), OPENROUTER_API_KEY
npm install
npx prisma db push
npm run dev            # http://localhost:3000 — view at /dev/visual-demo
npm run build           # prisma generate && next build — pre-existing monaco-editor error unrelated to this sprint
npx tsc --noEmit       # same pre-existing monaco-editor error; pre-existing stripe/subscription errors also expected on feature branches
```
