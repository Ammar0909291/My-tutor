# Classical Mechanics Interactive Layer — Audit, Task 1

**Status: audit only, precedes Tasks 2–11 of the same sprint.**

## Reuse determination

| System | Reused unchanged? | How |
|---|---|---|
| `SimulationControlPanel.tsx` | **Yes, unmodified** | Same `SimulationControl[]` (slider/toggle/dropdown) + `onReset` + `highlightedControlId` contract as `QuantumTunnelingInteractive3D`/`BlochSphereInteractive3D`. Each of the 5 new interactive mechanics components builds its own `controls` array and renders `<SimulationControlPanel controls={...} onReset={...} highlightedControlId={...} />` verbatim. |
| `GuidedSimulationMode.tsx` | **Yes, unmodified** | Same `steps: GuidedStep[]` + render-prop `children({ highlightedControlId, ... })` contract used today for `QuantumTunnelingInteractive3D`. Task 7 wraps all 5 new interactive sims with it in the dev demo exactly as the existing demo wraps tunneling. |
| Quantum interactive simulations (`QuantumTunnelingInteractive3D.tsx`, `BlochSphereInteractive3D.tsx`, `DoubleSlitInteractive3D.tsx`, `HydrogenOrbitalInteractive3D.tsx`) | **Pattern reused, files untouched** | Structural template copied: local `useState` per parameter → derived physics quantities via `useMemo` → `ThreeDVisual` scene reading live state → `SimulationControlPanel` driving the same state → `createMasteryEmitter` wired to `handleChange`. None of these four files are modified. |
| Visual Mastery bridge (`createMasteryEmitter`, `VisualMasteryContext`, `VisualMasterySignal` from `src/lib/visuals/visualMastery.ts`) | **Yes, unmodified** | Same `onMasteryEvent`/`masteryContext` optional-prop pair, same `emit({ interacted, challengeAttempted, challengeCompleted })` call shape on every control change, same `visualType: 'quantum_interactive'` engine bucket (the existing generic "3D interactive" mastery bucket — not renamed/extended, per Task 8's "no new signal shape" constraint). No changes to `visualMastery.ts` or `teachingStrategy.ts`'s `VisualEngine` union. |
| `Vector3D.tsx` / `ForceArrow3D.tsx` (Classical Mechanics 3D Foundation Sprint) | **Yes, unmodified** | Reused directly inside each interactive `Scene` for live force/velocity vectors, same as the non-interactive sims. |
| `ThreeDVisual.tsx` | **Yes, unmodified** | Each interactive component mounts its own `Scene` inside `<ThreeDVisual>` directly (not through `VisualCard`/`revealStep`), matching the existing quantum interactive components — they are student-driven, not narration-driven, so they bypass `VisualCard` exactly as the four quantum interactive components already do. |

## Conclusion

100% of the interactivity infrastructure (`SimulationControlPanel`, `GuidedSimulationMode`, the
mastery-bridge helpers, and the `ThreeDVisual` host) is reused completely unchanged. This sprint
adds five new files following an already-proven structural template — no new control-panel
control kinds, no new guided-mode step shape, no new mastery signal fields, no changes to Tutor
Max, Educational Intelligence, Assessment Engine, Curriculum Engine, Narration Engine, Visual
Learning Engine, or Visual Mastery Engine.
