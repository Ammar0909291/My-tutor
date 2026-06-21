# Data Science 3D Foundation Sprint — Report

Adds Data Science as the sixth Universal 3D subject using the proven Foundation pattern only,
mirroring the Quantum / Classical Mechanics / Chemistry / Mathematics / Computer Science Foundation
sprints exactly. Additive only — no Interactive layer, Guided mode, Visual Mastery, production
integration, or `detectVisual.ts` changes.

## Files changed

**New components (5):**
- `src/components/school/visuals/StatisticalDistribution3D.tsx`
- `src/components/school/visuals/DataVisualization3D.tsx`
- `src/components/school/visuals/Correlation3D.tsx`
- `src/components/school/visuals/Clustering3D.tsx`
- `src/components/school/visuals/MachineLearningPipeline3D.tsx`

**New docs (2):**
- `docs/DATA_SCIENCE_3D_AUDIT.md`
- `docs/DATA_SCIENCE_3D_FOUNDATION_REPORT.md` (this file)

**Modified (3):**
- `src/lib/school/visuals/visualTypes.ts` — five new `three_*` types added to the `VisualType` union
  and to `VISUAL_META`.
- `src/components/school/visuals/VisualCard.tsx` — five imports, five `VISUAL_STEP_COUNTS: 5` entries,
  and five `switch` cases added.
- `src/app/dev/visual-demo/VisualDemo.tsx` — `DATA_SCIENCE_3D_DEMOS` constant and a "Data Science 3D
  Foundation" section rendering all five through the production `VisualCard`.

No existing component, primitive, or any other file was modified.

## Reveal steps (per the spec)

| Component | Type | Steps |
|---|---|---|
| `StatisticalDistribution3D` | `three_statistical_distribution` | axes → data points → histogram → distribution curve → summary statistics |
| `DataVisualization3D` | `three_data_visualization` | dataset → bar chart → scatter plot → trend line → comparison view |
| `Correlation3D` | `three_correlation` | axes → random points → positive correlation → negative correlation → correlation comparison |
| `Clustering3D` | `three_clustering` | dataset → unclassified points → cluster centers → cluster assignment → final grouped clusters |
| `MachineLearningPipeline3D` | `three_ml_pipeline` | raw data → cleaning → feature preparation → model → prediction output |

All five follow the established `Scene({ revealStep })` + boolean reveal-gate shape, wrapped by an
exported component rendering `<ThreeDVisual><Scene/></ThreeDVisual>` — identical to every other
Foundation component.

## Reused primitives

| Primitive | Used for |
|---|---|
| `ThreeDVisual` | Scene host for all five (unchanged) |
| `MolecularNode3D` | Data points, scatter points, cluster members, cluster centers, distribution-curve markers, pipeline stages |
| `Vector3D` | Axes, trend lines, correlation direction lines, the mean line |
| `Bond3D` | Pipeline-stage connectors |
| inline `boxGeometry` meshes | Histogram bars, bar charts (same pattern as `MemoryStorage3D` / `DataStructureVisualization3D`) |
| `Html` (drei) | Labels and captions |

## New primitives created

**None.** Per the audit (`docs/DATA_SCIENCE_3D_AUDIT.md`) and the sprint rule, Data Science is fully
expressible with the existing universal primitives plus the inline `boxGeometry` meshes already used
throughout the Foundation layer. `ParticleSystem3D` (which the Universal 3D roadmap projected as a
Data Science consumer) is an animated `useFrame`-driven engine and is intentionally **not** used
here, since Foundation visuals are static revealStep-gated snapshots; any `ParticleSystem3D` adoption
belongs to a future Interactive layer.

## Validation results

```
npx prisma generate   → Generated Prisma Client v6.19.3 (success)
npx tsc --noEmit       → exit 0, ZERO errors
npm run build           → "✓ Compiled successfully"
runtime smoke test      → npm run dev, GET /dev/visual-demo
                          → ✓ Compiled /dev/visual-demo (1968 modules)
                          → HTTP 200, ~655 KB, 0 crash markers in rendered HTML
                          → "Data Science 3D Foundation" section + all five visuals
                            present in the rendered output
```

No new type errors, no regressions; the five existing 3D subjects and all prior sections are
unaffected (no existing file was edited beyond the additive registration/demo sites).

## Educational review

- **Statistical distribution** — axes → scattered data → histogram bars → a bell curve over them →
  a center mean line, teaching the shape of a normal distribution and that "spread" is the width
  (and, by contrast, what a skewed/wider distribution would look like).
- **Data visualization** — the same dataset shown as a bar chart, then as a scatter plot with a
  trend line, then side by side, teaching that different chart types reveal relationships and trends
  differently.
- **Correlation** — random points (no pattern), then an upward cloud + line (positive), then a
  downward cloud + line (negative), then both compared, teaching correlation direction and strength.
- **Clustering** — gray unclassified points, then cluster centers, then points colored by nearest
  center, then final grouped clusters, teaching similarity-based grouping/segmentation.
- **ML pipeline** — raw data → cleaning → features → model → prediction, revealed left to right with
  connectors, teaching the end-to-end training and prediction workflow.

## Production readiness

**Not yet production-reachable.** All five Data Science 3D visuals are built on the unmodified
Universal 3D Engine, registered in `visualTypes.ts` / `VISUAL_META` / `VISUAL_STEP_COUNTS` /
`VisualCard`, and rendered end-to-end through the production `VisualCard` (Play/Pause/Replay, speed,
narration) in the dev demo. As with every prior subject's Foundation sprint, the **Interactive layer
and production integration are intentionally deferred** — no `detectVisual.ts` rule table, `VALID`
set, or `buildVisualsSystemBlock` entry was added, and `data_science` was not added to
`VISUAL_SUBJECTS`, so these visuals are not yet selected from real lessons. That wiring is a separate,
later sprint.

## Data Science Foundation Readiness

**Foundation complete.** All five Data Science 3D Foundation visuals are implemented on the existing
Universal 3D Educational Engine with no new primitives, registered through the exact existing
pattern (`visualTypes.ts` union + `VISUAL_META`, `VisualCard` imports + `VISUAL_STEP_COUNTS` + switch
cases), demonstrated through the production `VisualCard` in the dev demo, and verified by a clean
`npx tsc --noEmit`, a successful `npm run build`, and a runtime smoke test (HTTP 200, all five
visuals rendered, zero crash markers). Interactive layer and production integration are intentionally
out of scope and deferred to later sprints.

## Run locally

```
cp .env.example .env   # set DATABASE_URL, AUTH_SECRET (openssl rand -base64 32), OPENROUTER_API_KEY
npm install
npx prisma db push
npm run dev            # http://localhost:3000  → /dev/visual-demo (dev-only) → "Data Science 3D Foundation"
npm run build          # prisma generate && next build
npx tsc --noEmit       # passes with zero errors
```
