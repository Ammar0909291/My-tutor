# Visualization Opportunities

**Date:** 2026-06-19
**Sprint:** Visual Learning Foundation — Sprint A (Phase 1)
**Scope:** Mapping only. No implementation.

This maps high-value visual concepts per subject the platform currently supports. For each: **Concept → Visualization Type → Educational Value → Implementation Difficulty**.

**Legend**
- **Educational value:** ⭐ low · ⭐⭐ medium · ⭐⭐⭐ high · ⭐⭐⭐⭐ very high
- **Difficulty:** 🟢 Easy (static or simple parameterized SVG) · 🟡 Medium (data-driven SVG / light math) · 🔴 Hard (interactive / simulation / heavy math)
- **Status:** `EXISTS(static)` = a fixed parameterless SVG already ships (see audit §0); `NEW` = not built.

---

## Mathematics

| Concept | Visualization Type | Educational Value | Difficulty | Status |
|---|---|---|---|---|
| Fractions | `fraction_bar` (parameterized: numerator/denominator) | ⭐⭐⭐⭐ | 🟢 | EXISTS(static) → needs payload |
| Ratios & proportion | `ratio_bar` / two-fraction comparison | ⭐⭐⭐ | 🟢 | NEW |
| Percentages | `percentage_grid` (parameterized: value) | ⭐⭐⭐ | 🟢 | EXISTS(static) → needs payload |
| Number line / integers | `number_line` (parameterized: range, marks) | ⭐⭐⭐ | 🟢 | EXISTS(static) → needs payload |
| **Function graphs** `y=f(x)` | `graph` (plot an equation) | ⭐⭐⭐⭐ | 🟡 | NEW — **top MVP** |
| Coordinate systems / plotting points | `coordinate_plane` (parameterized: points, lines) | ⭐⭐⭐⭐ | 🟡 | EXISTS(static) → needs payload |
| Linear equations / slope | `graph` (line + intercepts) | ⭐⭐⭐⭐ | 🟡 | NEW (subset of graph) |
| Quadratics / parabolas | `graph` (curve + roots/vertex) | ⭐⭐⭐⭐ | 🟡 | NEW (subset of graph) |
| Geometry (triangles, circles, polygons) | `geometry` (shapes with labelled sides/angles) | ⭐⭐⭐⭐ | 🟡 | EXISTS(static) → needs payload |
| Area & perimeter | `geometry` (annotated dimensions) | ⭐⭐⭐ | 🟡 | NEW |
| Algebra (expression structure) | `process_flow` / step boxes | ⭐⭐ | 🟢 | NEW |

---

## Science (umbrella `science` slug; CBSE/UP combine phys/chem/bio at lower grades)

| Concept | Visualization Type | Educational Value | Difficulty | Status |
|---|---|---|---|---|
| Food chains / webs | `food_chain` (parameterized organisms) | ⭐⭐⭐ | 🟢 | EXISTS(static) → needs payload |
| Water cycle | `process_flow` (cyclic) | ⭐⭐⭐ | 🟢 | EXISTS(static) |
| Solar system | `diagram` (orbits) | ⭐⭐ | 🟢 | EXISTS(static) |

---

## Physics

| Concept | Visualization Type | Educational Value | Difficulty | Status |
|---|---|---|---|---|
| Motion (distance–time, velocity–time) | `graph` | ⭐⭐⭐⭐ | 🟡 | NEW (reuses graph engine) |
| Force & free-body diagrams | `force_diagram` (parameterized vectors) | ⭐⭐⭐⭐ | 🟡 | EXISTS(static) → needs payload |
| Velocity / acceleration | `graph` + vector arrows | ⭐⭐⭐ | 🟡 | NEW |
| Electric circuits | `circuit_diagram` (parameterized components) | ⭐⭐⭐⭐ | 🟡 | EXISTS(static) → needs payload |
| Waves / optics | `diagram` (ray/wave) | ⭐⭐⭐ | 🔴 | NEW |

---

## Chemistry

| Concept | Visualization Type | Educational Value | Difficulty | Status |
|---|---|---|---|---|
| Atoms / atomic structure | `diagram` (Bohr model: shells, electrons) | ⭐⭐⭐⭐ | 🟡 | NEW |
| Molecules / bonding | `diagram` (atoms + bonds) | ⭐⭐⭐ | 🔴 | NEW |
| Reactions / equations | `process_flow` (reactants → products) | ⭐⭐⭐ | 🟡 | NEW |
| Periodic trends | `graph` / grid | ⭐⭐ | 🟡 | NEW |

---

## Biology

| Concept | Visualization Type | Educational Value | Difficulty | Status |
|---|---|---|---|---|
| Cell structure | `diagram` (labelled parts) | ⭐⭐⭐⭐ | 🟡 | NEW |
| Organ systems | `diagram` (labelled) | ⭐⭐⭐ | 🔴 | NEW |
| Photosynthesis | `process_flow` (inputs → outputs) | ⭐⭐⭐⭐ | 🟢 | NEW |
| Life cycles / classification | `process_flow` / tree | ⭐⭐ | 🟢 | NEW |

---

## English

| Concept | Visualization Type | Educational Value | Difficulty | Status |
|---|---|---|---|---|
| Sentence structure / parsing | `tree` (parse tree) | ⭐⭐ | 🟡 | NEW |
| Story arc / plot | `timeline` / arc | ⭐⭐ | 🟢 | NEW |
| Tenses | `timeline` (past/present/future) | ⭐⭐ | 🟢 | NEW |

> English is largely text-first; visuals are nice-to-have, low priority.

---

## History

| Concept | Visualization Type | Educational Value | Difficulty | Status |
|---|---|---|---|---|
| Chronology of events | `timeline` (events with dates) | ⭐⭐⭐⭐ | 🟢 | NEW — high value, easy |
| Cause → effect chains | `process_flow` | ⭐⭐⭐ | 🟢 | NEW |
| Dynasties / successions | `timeline` / tree | ⭐⭐⭐ | 🟢 | NEW |

> Note: History/Geography are present in CBSE/UP **Social Science** catalogs; they are not standalone top-level subjects today.

---

## Geography

| Concept | Visualization Type | Educational Value | Difficulty | Status |
|---|---|---|---|---|
| Maps / location | `map` (annotated) | ⭐⭐⭐⭐ | 🔴 | NEW (needs map assets/lib) |
| Climate systems | `diagram` / `process_flow` | ⭐⭐⭐ | 🟡 | NEW |
| Landforms / water bodies | `diagram` | ⭐⭐ | 🟡 | NEW |

---

## Computer Science

| Concept | Visualization Type | Educational Value | Difficulty | Status |
|---|---|---|---|---|
| Variables & memory | `diagram` (boxes/slots) | ⭐⭐⭐ | 🟢 | NEW |
| Loops | `process_flow` (flowchart with back-edge) | ⭐⭐⭐⭐ | 🟡 | NEW |
| Functions | `process_flow` (call/return) | ⭐⭐⭐ | 🟡 | NEW |
| Algorithms (sort/search) | `process_flow` / step trace | ⭐⭐⭐⭐ | 🔴 | NEW (animation = hard) |
| Data structures | `diagram` (array/list/tree) | ⭐⭐⭐ | 🟡 | NEW |

---

## Cross-subject pattern: only a few renderer "families" are needed

Almost every concept above collapses into a small set of reusable renderers:

1. **`graph`** — plot `y = f(x)` / data series → covers math functions, linear/quadratic, physics motion, periodic trends. **Highest leverage.**
2. **`geometry`** — labelled 2D shapes → math geometry, area/perimeter.
3. **`process_flow`** — ordered/cyclic steps → reactions, photosynthesis, water cycle, loops, functions, cause→effect.
4. **`timeline`** — dated events → history, tenses, story arc.
5. **`diagram`** — labelled static figure → atoms, cells, circuits, force, memory boxes, maps.
6. **`number/fraction/percentage`** — the existing arithmetic primitives, made parameterized.

This means the **architecture should standardize on ~6 renderer families with typed payloads**, not 30+ bespoke components. See `VISUAL_LEARNING_ARCHITECTURE.md`.

---

## Highest-value, lowest-difficulty quadrant (the MVP candidates)

| Rank | Concept family | Value | Difficulty | Why |
|---|---|---|---|---|
| 1 | **Math graphs (`graph`, `y=f(x)`)** | ⭐⭐⭐⭐ | 🟡 | One engine serves math + physics; currently *faked* by a static coordinate plane |
| 2 | **History timelines (`timeline`)** | ⭐⭐⭐⭐ | 🟢 | Pure data → SVG; trivial; high comprehension gain |
| 3 | **Science/CS process flows (`process_flow`)** | ⭐⭐⭐⭐ | 🟡 | Reusable across photosynthesis, reactions, loops, functions |
| 4 | **Parameterize existing arithmetic visuals** | ⭐⭐⭐ | 🟢 | Make `fraction_bar`/`number_line`/`percentage_grid` show the *actual* numbers |

See `VISUAL_LEARNING_ROADMAP.md` for sequencing and the MVP recommendation.
