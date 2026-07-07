# Data Science 3D — Foundation Audit

Read-only audit before building the Data Science 3D Foundation visuals, mirroring the Mathematics,
Computer Science, and Universal 3D audits. No existing architecture is modified by this sprint.

## Primitives & scene patterns reviewed

- **`ThreeDVisual`** — universal scene host (Canvas, lights, OrbitControls, reduced-motion,
  responsive sizing). Reused unchanged as the host for all five Data Science visuals.
- **`MolecularNode3D`** — generic labeled sphere (`position`, `radius`, `label`, `color`). Already
  proven subject-independent (Chemistry atoms, Mathematics points, CS nodes). Directly reusable as a
  Data Science **data point / scatter point / cluster member / cluster center**.
- **`Vector3D`** — generic labeled arrow (`start`, `end`, `color`, `label`, `thickness`). Reusable
  for **axes**, **trend lines**, and **correlation direction lines**.
- **`Bond3D`** — generic connector between two points. Reusable for **pipeline-stage connectors**.
- **`Html`** (drei) — labels/captions, same usage as every Foundation component.
- **Reusable scene pattern** — every Foundation component uses the same `Scene({ revealStep })` +
  boolean reveal-gate shape, wrapped by an exported component rendering
  `<ThreeDVisual><Scene/></ThreeDVisual>`. The Mathematics `SurfaceVisualization3D` and CS
  `DataStructureVisualization3D` also establish the **inline `boxGeometry` mesh** pattern for
  box-shaped elements (histogram bars, bar charts) — reused here directly.
- **Reusable geometry generation** — the CS sprint's deterministic pseudo-random helper (a seeded
  LCG producing stable point/height arrays) is the established way to generate stable scatter data
  without animation; Data Science reuses this same approach inline for scatter clouds and histograms.

## Reusable primitives (no new primitive required)

| Data Science need | Reused primitive |
|---|---|
| Data points / scatter points / cluster members / centers | `MolecularNode3D` |
| Axes, trend lines, correlation direction lines | `Vector3D` |
| Pipeline-stage connectors | `Bond3D` |
| Histogram bars / bar charts | inline `boxGeometry` meshes (same as `MemoryStorage3D` / `DataStructureVisualization3D`) |
| Distribution curve | a strip of small `MolecularNode3D` markers tracing the curve |
| Labels / captions | `Html` (drei) |
| Stable scatter/histogram data | seeded deterministic helper (same approach as `AlgorithmVisualization3D`) |

**New primitives required: none.** Data Science is fully expressible with the existing universal
primitives plus the inline `boxGeometry` meshes every Foundation component already uses. Per the
sprint rule "if existing primitives are sufficient, DO NOT create new primitives," no new primitive
is created.

> Note on `ParticleSystem3D`: the Universal 3D audit roadmap projected Data Science as a potential
> consumer of `ParticleSystem3D`. However, `ParticleSystem3D` is an **animated** particle engine
> (`useFrame`-driven motion/proximity), whereas Foundation visuals are **revealStep-gated static
> snapshots**. Using `MolecularNode3D` for scatter points keeps these five visuals consistent with
> the established Foundation pattern (static, step-revealed). `ParticleSystem3D` adoption, if ever
> desired, belongs to a future Interactive layer — not this Foundation sprint.

## Constraints honoured

Additive only. No changes to `detectVisual.ts`, Tutor Max, Educational Intelligence, Assessment,
Curriculum, Visual Mastery, the Interactive layer, Guided mode, or production integration. No file
moves. No existing primitive or Foundation component modified.
