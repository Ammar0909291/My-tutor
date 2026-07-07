# Visual Coverage Audit — Sprint J, Task 1

Audits every curriculum concept area against the four existing visual
engines (`graph`, `number_line`, `geometry`, `process_flow`) as they stand
**after** this sprint's Task 2–6 additions. No new engines, renderers, or
schema fields are proposed here beyond the two optional fields
(`NumberLineConcept.bound`/`title`, `GraphConcept.title`) already added in
Task 2–4 — this is a coverage *survey*, not new design.

Classification: **Covered** (a real, deterministic detection path exists and
produces a correct visual) / **Partial** (some phrasings/sub-cases work,
others structurally can't with the current engines) / **Missing** (no path
exists, and none is being proposed this sprint either).

## Mathematics

| Topic | Coverage | Detail |
|---|---|---|
| Linear/non-linear equations | **Covered** | `graph` engine — unchanged since Sprint B/F/G/H |
| Integers / number-line comparison | **Covered** | `number_line` engine — unchanged since Sprint C |
| Geometry (triangle/rectangle/circle/angle, dimensioned) | **Covered** | `geometry` engine — unchanged since Sprint D |
| **Fractions** (placement, e.g. "place 3/4 on a number line") | **Covered (new)** | `number_line` engine, `detectFractionConcept()` — fraction string parsed to a decimal, placed on a tight `[0,1]`-or-wider `bound`, labelled back as a fraction by the existing `fractionLabel()` renderer helper |
| **Fractions** (comparison, e.g. "which is bigger, 1/2 or 3/4") | **Covered (new)** | Same path — 2+ fraction matches is treated as a strong signal on its own, no keyword required |
| **Percentages** (placement/comparison) | **Covered (new)** | `number_line` engine, `detectPercentageConcept()` — values plotted on a fixed `[0,100]` scale; the literal `%` sign is an unambiguous signal |
| **Ratios** (e.g. "ratio of 2:3") | **Covered (new)** | `number_line` engine, `detectRatioConcept()` — `a:b` converted to its two parts-of-a-whole (`a/(a+b)`, `b/(a+b)`) and placed on a `[0,1]` scale; requires the literal word "ratio" to avoid misfiring on times/references |
| **Proportions** (e.g. "is 2/4 proportional to 3/6?") | **Partial** | A proportion stated as two fractions is covered by the fraction-comparison path above (both fractions get placed/compared); a proportion stated as two ratios (`a:b = c:d`) is not specifically parsed — `detectRatioConcept()` only extracts the *first* `a:b` match in the text |
| **Coordinate geometry — two points / a line** | **Covered (new)** | `graph` engine, `detectCoordinateLine()` — two `(x, y)` pairs are turned into their connecting line's `y = mx + b` equation and rendered through the completely unmodified Graph Engine; the title carries both points and the computed distance |
| **Coordinate geometry — a single point** | **Missing** | The Graph Engine is strictly a `y = f(x)` function plotter with no point-marker primitive; a lone coordinate cannot be visualized without a renderer change, which is out of this sprint's scope. Same conclusion as Sprint I. |
| **Coordinate geometry — quadrants** | **Partial** | No explicit "this point is in Quadrant II" visual exists; the two-point line view at least shows *where* points sit relative to the axes via the graph's pan/zoom, but there's no labelled quadrant overlay |
| **Statistics — mean/median/range** | **Covered (new)** | `number_line` engine, `detectStatisticsConcept()` — the dataset's own values plus the computed mean are highlighted, with mean/median/range stated in the spec's `title`; requires an explicit "mean of"/"median of"/"range of"/"average of" phrase |
| **Statistics — mode** | **Missing** | Not requested in this sprint's brief (only mean/median/range were named) and not implemented |
| **Statistics — distribution / histogram shape** | **Missing** | Explicitly out of scope ("No chart engine") |
| **Probability — single value on a scale** | **Covered (new)** | `number_line` engine, `detectProbabilityConcept()` — a fraction, percentage, or bare 0–1 decimal probability value placed on a fixed `[0,1]` probability scale |
| **Probability — comparing two events** | **Covered (new)** | Same path, multiple values collected (capped at 4) and placed on the same `[0,1]` scale |
| **Probability — compound/conditional events** | **Missing** | Not requested this sprint; would need new combinatorial logic, not just wiring |

## Science

| Topic | Coverage | Detail |
|---|---|---|
| Photosynthesis / respiration / digestion / food chain / energy flow / water cycle / rock cycle / carbon cycle / states of matter / chemical reactions | **Covered** | `process_flow` engine, fixed `PROCESS_DEFINITIONS` — unchanged since Sprint E/I |
| Any process outside the fixed list (mitosis, nitrogen cycle, etc.) | **Missing** | Same documented boundary as Sprint I — new curriculum-authored detection content, not in this sprint's brief either |
| Data/statistics within a science context (e.g. "find the mean reaction time") | **Covered (new)** | Reuses the same Task 5 statistics path — detection is text-shape-based, not subject-gated |

## Geography

| Topic | Coverage | Detail |
|---|---|---|
| Water cycle / rock cycle / carbon cycle | **Covered** | `process_flow` engine — unchanged since Sprint E |
| Map/coordinate-based content (e.g. latitude/longitude as a coordinate pair) | **Partial** | If phrased as two literal `(x, y)`-style pairs with a coordinate keyword, the new Task 4 line-detection path will technically fire, but it produces a *math* line/distance visual, not a geographic one — accurate for distance-between-two-points style questions, a poor fit for anything else |
| Ratios/percentages in a geography context (e.g. population percentages, scale ratios on a map) | **Covered (new)** | Reuses the Task 3 percentage/ratio paths — again, detection is text-shape-based, not subject-gated |
| Any other geography concept (climate zones, landforms, plate tectonics, etc.) | **Missing** | No engine maps onto these; not in scope |

## History

| Topic | Coverage | Detail |
|---|---|---|
| Any history concept (timelines, causes/effects, dates, treaties) | **Missing** | None of the four engines models a chronological timeline; building a Timeline Engine is explicitly forbidden this sprint. A history question containing two coincidental "(year, year)"-shaped parenthetical numbers could theoretically misfire the new coordinate-line detector, but this is vanishingly unlikely given the explicit `COORDINATE_KEYWORDS` gate (`coordinate`, `point`, `plot`, `distance`, `quadrant`) |

## Economics

| Topic | Coverage | Detail |
|---|---|---|
| Percentages (e.g. "inflation rose by 5%", "interest rate of 3%") | **Covered (new)** | Reuses the Task 3 percentage path |
| Ratios (e.g. "debt-to-income ratio of 2:1") | **Covered (new)** | Reuses the Task 3 ratio path |
| Statistics on economic data (mean/median/range of prices, GDP figures, etc.) | **Covered (new)** | Reuses the Task 5 statistics path |
| Supply/demand curves, market graphs | **Partial** | If a supply/demand relationship happens to be stated as an explicit `y = mx + b`-shaped equation, the existing Graph Engine renders it (same as any other linear equation) — but no economics-specific curve detection (non-linear supply/demand shapes, equilibrium-point labelling) exists or is proposed |
| Any other economics concept (market structures, fiscal policy, etc.) | **Missing** | No engine maps onto these |

## Summary

This sprint closes the highest-value gaps that the four existing engines can
structurally support: fractions, percentages, ratios, probability, basic
statistics, and point-to-point coordinate geometry are now all **Covered**,
purely by adding detection/builder logic — zero new engines, zero renderer
changes beyond the two new optional spec fields. The remaining **Partial**/
**Missing** rows are either (a) structurally impossible without a renderer
change (a lone point, quadrant labelling, chart/histogram shapes, compound
probability) or (b) entire subject areas (history, most of geography, most
of economics) that have no natural mapping onto a graph/number-line/
geometry/process-flow shape at all — both categories are explicitly out of
this sprint's "reuse the four existing engines only" scope, same reasoning
Sprint I used for bare coordinates and non-fixed science processes.
