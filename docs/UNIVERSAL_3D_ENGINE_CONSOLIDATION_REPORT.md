# Universal 3D Engine — Consolidation Report

Final synthesis of `docs/UNIVERSAL_3D_ENGINE_AUDIT.md`, produced before considering a Computer
Science subject. Read-only — no code modified.

## Architecture map

```
ThreeDVisual.tsx (Canvas, lights, OrbitControls, reduced-motion handling)  ← every visual renders through this
        │
        ├── Primitives: Vector3D, ForceArrow3D, MolecularNode3D, Bond3D, ParticleSystem3D, ThreeDEngineStub
        │
        ├── Subject Foundation components (revealStep-gated, narration-driven)
        │      Quantum (5) · Classical Mechanics (5) · Chemistry (5) · Mathematics (5)
        │
        ├── Subject Interactive components (SimulationControlPanel + createMasteryEmitter)
        │      Quantum (4) · Classical Mechanics (5) · Chemistry (5) · Mathematics (5)
        │
        └── Framework
               visualTypes.ts (VisualType union + VISUAL_META)
               detectVisual.ts (per-subject MatchRule tables → VisualType)
               VisualCard.tsx (VISUAL_STEP_COUNTS + switch dispatch)
               synchronizedPlayback.ts / narrationProgress.ts / VisualPlaybackControls.tsx
               GuidedSimulationMode.tsx (dev-demo step scripts)
               visualMastery.ts (createMasteryEmitter → quantum_interactive bucket)
```

72 `.tsx` files under `src/components/school/visuals/`; ~4,331 lines across Foundation components
alone, with Interactive components adding a comparable amount. Four subjects have been built on
this architecture with **zero structural changes** to `ThreeDVisual.tsx`, the narration/playback
layer, `SimulationControlPanel.tsx`, or `GuidedSimulationMode.tsx` — the strongest available
evidence the core is sound.

## Reusable primitive map

| Primitive | Reuse status | Consumers today | Realistic future reach |
|---|---|---|---|
| `ThreeDVisual` | Universal | All 44 components | All future subjects |
| `Vector3D` | Already reusable | Mechanics, Mathematics | EM, Astrophysics, Data Science |
| `MolecularNode3D` | Already reusable | Chemistry, Mathematics | CS (graph nodes), Data Science (points), Astrophysics (bodies) |
| `SimulationControlPanel` / `GuidedSimulationMode` / `createMasteryEmitter` | Universal | All 19 Interactive | All future subjects |
| `Bond3D` | Potentially reusable | Chemistry only | CS (graph edges), Data Science (network links) |
| Comparison-row pattern | Potentially reusable | Mechanics, Mathematics | CS (algorithm comparison), Data Science (distributions) |
| Height-field surface builder | Potentially reusable | Mathematics only | Data Science (loss surfaces), AI (decision boundaries), Relativity (spacetime grid) |
| `ParticleSystem3D` | Built, unused | None | Data Science would be its first real consumer |
| `ForceArrow3D` | Legacy duplicate | Mechanics (Newton's laws) only | None — retire in favor of `Vector3D` |

## Performance review

No critical or high-risk findings. Geometry/particle counts are low-poly and small everywhere
measured (24-segment surfaces, ≤65-point particle arrays). `useFrame` appears in 13 files, each
independent — a real CPU multiplier only on `/dev/visual-demo` (40+ simultaneous visuals,
dev-only), not in production where `VisualCard` renders exactly one visual per lesson. The one
concrete, fixable-later inefficiency: the Interactive surface variant rebuilds its full
`PlaneGeometry` on every control change with no debouncing, and every Interactive component's
`controls` array is a fresh literal each render (unmemoized) — both low-risk at current scale.

## Scalability review

The playback/narration/mastery layers scale at O(1) per new visual (just another
`VISUAL_STEP_COUNTS` entry / `defaultConcept` string) and need no changes for 50, 100, or 500+
visuals. The entire scaling risk is concentrated in two hand-maintained, linearly-growing
artifacts: `VisualCard.tsx`'s `switch` + static-import list, and `detectVisual.ts`'s per-subject
`if (subjectSlug === ...)` rule-table chain. Both work fine today (~45 types, 4 subjects) but
should become registry/table-driven before a 5th or 6th subject, well ahead of becoming a
correctness problem.

## Subject readiness review

| Subject | Difficulty | Primitive reuse | Educational impact |
|---|---|---|---|
| Electromagnetism | Medium | High (Vector3D, MolecularNode3D) | High |
| Astrophysics | Low | High (Mechanics trajectory + MolecularNode3D) | Medium-High |
| Computer Science | Low–Medium | High (MolecularNode3D + Bond3D as graph) | High |
| Data Science | Medium | Medium (first real ParticleSystem3D + surface use) | High |
| Artificial Intelligence | Medium | High, but only after CS + Data Science exist | High |
| Relativity | Medium | High (surface builder = spacetime grid) | Medium-High |

**Recommended build order:** Electromagnetism/Astrophysics → Computer Science → Data Science → AI
→ Relativity (full reasoning in `docs/UNIVERSAL_3D_ENGINE_AUDIT.md` Task 8).

## Technical debt ranking

- **Critical:** none.
- **High:** `VisualCard.tsx` switch/import scalability ceiling (future); mastery-emission
  boilerplate copy-pasted across all 19 Interactive components (immediate, cosmetic).
- **Medium:** `ForceArrow3D` redundancy; unused `ParticleSystem3D`; dead `ThreeDEngineStub` types;
  `detectVisual.ts` rule-table copy-paste pattern; 1,284-line `VisualDemo.tsx`; single
  `quantum_interactive` mastery bucket losing subject granularity.
- **Low:** comparison-row duplication (2 files); surface-geometry technique duplication (2 files);
  unmemoized `controls` arrays.

Full detail, file locations, and severity reasoning for every item: see
`docs/UNIVERSAL_3D_ENGINE_AUDIT.md` Task 2 and Task 9.

## What should be built next and why?

**1. Immediate next sprint:** A small, low-risk **consolidation sprint** — not a new subject —
covering the cheapest, highest-value items from the debt list: extract a `useControlMastery` hook
to remove the 19x-duplicated mastery-emission boilerplate, retire `ForceArrow3D` in favor of
`Vector3D` in the two Mechanics files that still use it, and remove or explicitly adopt
`ParticleSystem3D`/`ThreeDEngineStub`'s dead types. This is cheap (no new primitives, no new
subject risk), reduces real maintenance debt, and de-risks every subsequent subject sprint by
shrinking the amount of boilerplate that gets copy-pasted a 5th, 6th, 7th time. Recommended
**before** Computer Science, since CS is exactly the kind of subject that would otherwise copy the
same mastery-wiring boilerplate again.

**2. Next 5 recommended sprints (in order):**
1. Consolidation sprint (above).
2. Electromagnetism 3D Foundation + Interactive + Production Integration — lowest new-primitive
   cost, extends `Vector3D`/`MolecularNode3D` directly, strong Physics-track precedent already
   proven by Quantum/Mechanics.
3. Computer Science 3D Foundation — graph/tree node-edge renderer (extends `MolecularNode3D` +
   `Bond3D`), unlocking the primitive AI will need later.
4. Data Science 3D Foundation — first real `ParticleSystem3D` consumer, extends the height-field
   surface builder for regression/loss-surface visuals.
5. `VisualCard.tsx` / `detectVisual.ts` registry-driven refactor — converts the hand-maintained
   switch and per-subject `if` chain into table-driven dispatch, done once two more subjects'
   worth of real usage exists to design the registry shape against (not earlier, to avoid
   over-engineering against guessed requirements).

**3. Long-term 3D roadmap:** Artificial Intelligence and Relativity follow naturally once Computer
Science and Data Science exist (both reuse those subjects' new primitives almost for free —
neural-network layers extend the CS graph-node pattern, decision boundaries and spacetime grids
reuse the Data Science/Mathematics surface builder). Astrophysics can be folded in alongside
Electromagnetism since both lean on the same Mechanics-era trajectory/vector primitives. Beyond
that, the architecture itself does not need a redesign to keep growing — `ThreeDVisual`,
narration/playback, `SimulationControlPanel`, `GuidedSimulationMode`, and `createMasteryEmitter`
have already proven they scale across 4 subjects unmodified, and the only structural work the
roadmap requires is the registry-driven `VisualCard`/`detectVisual` refactor (item 5 above),
ideally landed once, around subject 6–7, rather than repeatedly patched per subject.
