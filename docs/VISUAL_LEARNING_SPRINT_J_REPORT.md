# Visual Learning Sprint J — Coverage Expansion Report

Expands educational coverage using **only** the four existing visual
engines (`graph`, `number_line`, `geometry`, `process_flow`). No new
renderer types, no Timeline/Physics-Sim/Chemistry-Sim/Universal-Learning
engines, no chart engine, no database/curriculum/Tutor-Max-prompt changes.

## 1. Files Changed

| File | Change |
|---|---|
| `src/lib/visuals/visualConceptDetector.ts` | Added 6 new detection helpers (`detectFractionConcept`, `detectPercentageConcept`, `detectRatioConcept`, `detectProbabilityConcept`, `detectStatisticsConcept`, `detectCoordinateLine`) and their supporting parsers (`extractFractions`, `extractPercentages`, `extractRatio`, `extractCoordinatePoints`, `extractDataset`, `computeStats`, `fractionBound`, `formatEquationFromPoints`, `distanceBetween`), wired into `detectVisualConcept()`'s priority chain. Added two new **optional** fields: `GraphConcept.title?` and `NumberLineConcept.bound?`/`title?`. No new `DetectedConcept` variants — every new concept resolves to the existing `'graph'` or `'number_line'` kind. |
| `src/lib/visuals/visualSpecBuilder.ts` | `buildGraphSpec()` now accepts an optional `title`; `buildNumberLineSpec()` now takes the full `NumberLineConcept` (was: a bare `highlight: number[]`) so it can honor an explicit `bound` instead of always falling back to `niceBound(maxAbs)`. No schema changes — both new fields already existed as optional properties on `graphSpecSchema`/`numberLineSpecSchema`. |
| `src/app/dev/visual-demo/VisualDemo.tsx` | Added a "Sprint J" showcase section (Task 7) — 8 tutor-style text fixtures for fractions, percentages, ratios, coordinate geometry, statistics, and probability, run through the real `buildVisualSpec()` detector, same convention as every prior sprint's fixture list on this dev-only page. |
| `docs/VISUAL_COVERAGE_AUDIT.md` (new) | Task 1 — full Covered/Partial/Missing audit across Mathematics, Science, Geography, History, Economics, reflecting the state *after* this sprint's additions. |
| `docs/VISUAL_LEARNING_SPRINT_J_REPORT.md` (new) | This report. |

`teachingStrategy.ts` was **not modified** — its existing exhaustive switch on `concept.kind` already covers `'graph'` and `'number_line'`, and every new Sprint J concept resolves to one of those two kinds, so the existing rules (graph: `interaction: true, assessment: true`; number_line: `interaction: true, assessment: false`) apply automatically with zero new cases. `visualSpec.ts` (the zod schemas) and every `*Renderer.tsx` were **not modified** — confirmed in Task 2 (the `NumberLineRenderer`'s existing `fractionLabel()` helper already formats e.g. `0.625` as `"5/8"`) and Task 4 (the `GraphRenderer`'s existing `y=f(x)` pipeline already compiles a computed `"y = 2x - 1"` string with no changes).

## 2. Coverage Expansion

Six new concept areas now produce a real visual, all via the two existing engines:

| Task | Concept | Engine reused | How |
|---|---|---|---|
| 2 | Fractions — placement & comparison | `number_line` | Fraction strings (`3/4`, `5/8`) parsed to decimals, placed on a tight `[0,1]`-or-wider bound; the renderer's pre-existing `fractionLabel()` displays them back as fractions, not decimals |
| 3 | Percentages | `number_line` | `%`-suffixed values placed on a fixed `[0,100]` scale |
| 3 | Ratios | `number_line` | `a:b` converted to its two parts-of-a-whole (`a/(a+b)`, `b/(a+b)`) on a `[0,1]` scale |
| 4 | Coordinate geometry — two points / distance | `graph` | Two `(x, y)` pairs converted to their connecting line's `y = mx + b` equation, rendered through the unmodified Graph Engine; the spec's `title` states both points and the computed distance |
| 5 | Statistics — mean/median/range | `number_line` | The dataset's own values plus the computed mean are highlighted; mean/median/range stated in the spec's `title` |
| 6 | Probability — single value & comparison | `number_line` | A fraction/percentage/decimal probability value (or several) placed on a fixed `[0,1]` probability scale |

Full Covered/Partial/Missing breakdown across all five subject areas (Mathematics, Science, Geography, History, Economics) is in `docs/VISUAL_COVERAGE_AUDIT.md` (Task 1). In short: every concept the four engines can structurally represent is now Covered; a standalone coordinate point, quadrant labelling, chart/histogram shapes, compound probability, and entire subjects with no graph/number-line/geometry/process-shape (most of history, most of geography, most of economics) remain Missing/Partial by design — closing those would require a renderer change or a new engine, both out of this sprint's scope.

## 3. Demonstrations

Ran the real `planVisualTeaching()` pipeline (via `npx tsx`) against representative text for all six new concepts plus four pre-existing concepts, confirming both new coverage and zero regression in one pass:

```
Fraction placement   → number_line, highlight=[0.75], bound=[0,1], title="Fraction on a Number Line"
Fraction comparison  → number_line, highlight=[0.5,0.75], bound=[0,1], title="Comparing Fractions"
Percentage            → number_line, highlight=[75], bound=[0,100], title="Percentage on a Scale of 100"
Percentage comparison → number_line, highlight=[25,60], bound=[0,100], title="Comparing Percentages"
Ratio 2:3              → number_line, highlight=[0.4,0.6], bound=[0,1], title="Ratio 2:3 as Parts of a Whole"
Coordinate geometry    → graph, equation="y = 2x - 1", title="Line through (2, 3) and (5, 9) — distance ≈ 6.71",
                          challenge={targetSlope:2, targetIntercept:-1} (inherited automatically, zero new code)
Statistics             → number_line, highlight=[4,8,6,5,3,5.67], title="Mean = 5.67, Median = 5.5, Range = 5"
Probability (fraction)  → number_line, highlight=[0.1667], bound=[0,1], title="Probability Scale"
Probability (percent)   → number_line, highlight=[0.3], bound=[0,1], title="Probability Scale"
-- unchanged from Sprint B-I --
Linear graph y=2x+1    → graph, challenge={targetSlope:2, targetIntercept:1}      (identical to before)
Integers -5 vs 3       → number_line, highlight=[-5,3], bound=[-5,5]              (identical to before)
Triangle area task     → geometry/triangle, challenge={targetArea:12, ...}        (identical to before)
Photosynthesis         → process_flow, 5 fixed steps, challenge={}               (identical to before)
No visual concept      → strategy.visualization=null, spec=null                  (identical to before)
```

A persistent showcase of the same six new concepts (Task 7) was also added to the dev-only `/dev/visual-demo` page, rendered through the real `buildVisualSpec()` detector — visually inspectable, not just console output.

Two real detection bugs were found and fixed during this verification (not present in the final code):
1. Probability's decimal-extraction step initially reused the generic integer/decimal extractor, which also matched the bare numerator/denominator digits inside an already-handled `"1/6"` fraction pattern, producing a spurious extra highlighted value. Fixed by requiring a literal decimal point (`\d+\.\d+`) for the "bare decimal" probability case.
2. Percentage detection (no keyword gate, fires on any `%`) was outrunning probability detection in priority order, so `"the probability of rain is 30%"` was mislabeled "Percentage on a Scale of 100" instead of "Probability Scale". Fixed by moving the probability check earlier in `detectVisualConcept()`'s chain, ahead of the generic percentage check.

## 4. Educational Impact

- **Fractions/percentages/ratios/probability** are now visualized on an appropriately-scaled number line instead of not at all — a student asked to compare `1/2` and `3/4`, or place `75%` on a scale, or see a `2:3` ratio as parts of a whole, now gets the same kind of concrete, interactive (drag-enabled) visual that integer comparisons have had since Sprint C.
- **Coordinate geometry** (two points → a line + distance) reuses the Graph Engine's existing pan/zoom and — because the derived equation is always a recognizable `y = mx + b` form — automatically inherits live slope/intercept grading via the unchanged Teaching Strategy Engine, with no new assessment code at all.
- **Statistics** (mean/median/range) turns an abstract calculation into a visual: the actual data points plus the computed mean appear together on a number line, with the three summary statistics spelled out in the title — closer to "see it" than "just compute it."
- All six additions are **automatic and free** everywhere `planVisualTeaching()`/`buildVisualSpec()` is already called — Learn, Practice, Assessment, and Mock Tests (wired in Sprint I) — with no changes to any of those call sites. A practice question containing "find the mean of 12, 15, 18, 9" will show the new statistics visual the next time a student opens that quiz, with zero additional engineering.

## 5. Remaining Gaps

- A standalone coordinate point (no second point to form a line) still cannot be visualized — the Graph Engine has no point-marker primitive, and adding one is a renderer change, out of scope.
- No quadrant-labelling overlay on the Graph Engine.
- No chart/histogram visualization for statistical distributions (explicitly out of scope — "No chart engine").
- No compound/conditional probability (e.g. "probability of A and B").
- No mode (only mean/median/range, as named in the brief).
- No detection for ratio-equals-ratio proportions stated as `a:b = c:d` (only the first `a:b` is currently extracted); fraction-stated proportions (`2/4 = 3/6`) are covered indirectly via the fraction-comparison path.
- Geography/History/Economics concepts with no natural graph/number-line/geometry/process-flow shape (climate zones, landforms, timelines, market structures, etc.) remain entirely unaddressed — same category of gap as Sprint I's "most of history, language, literature" conclusion, just itemized per-subject this time in `docs/VISUAL_COVERAGE_AUDIT.md`.
- As in every prior sprint: no connection between Concept Detection and a learner profile/topic-mastery context — every call site still passes raw text only.

## Regression Verification (Task 8)

- `npx tsc --noEmit` → clean, no errors.
- `npm run build` → succeeded (`prisma generate && next build`); all routes compiled, including `/dev/visual-demo` (bundle grew by ~0.6 kB from the new showcase section — new fixture data only, no new dependency).
- `git diff --stat` confirms only three source files changed (`visualConceptDetector.ts`, `visualSpecBuilder.ts`, `VisualDemo.tsx`) plus the two new docs — no renderer (`GraphRenderer.tsx`, `NumberLineRenderer.tsx`, `GeometryRenderer.tsx`, `ProcessFlowRenderer.tsx`), schema (`visualSpec.ts`), teaching-strategy (`teachingStrategy.ts`), or any Practice/Assessment/Mock/Learn integration file (Sprint I's wiring) was touched.
- Re-ran `planVisualTeaching()` via `npx tsx` against the same four Sprint B–I example strings used in the Sprint H/I reports (linear graph, integers, geometry, photosynthesis) — all four produced byte-identical strategy/spec output to before this sprint, confirming zero regression.
- No database, curriculum, or Tutor Max prompt was modified.
