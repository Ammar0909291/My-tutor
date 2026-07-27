# math.geom.area

## Identity
- **KG ID**: `math.geom.area`
- **Domain**: math.geom (Geometry)
- **Requires**: `math.geom.area-polygon`
- **Unlocks**: `math.geom.surface-area`, `math.calc.integral-area`
- **Cross-links**: `math.calc.integral-area` (not yet authored — no Blueprint on disk; P76_mode = independence per the Blueprint's own determination).
- **Difficulty**: developing
- **Bloom level**: apply
- **Mastery threshold**: 0.9 (⌈0.9×5⌉ = 5/5)
- **Estimated hours**: 3
- **Blueprint**: `docs/curriculum/blueprints/math.geom.area.md` (reused by reference throughout this entry).

## Learning Objective
The student will state the general definition of area as an invariant, additive two-dimensional measure and distinguish it from perimeter, derive that scaling every linear dimension by k scales area by k² (not k), and justify the circle area formula A=πr² as the limit of the regular-polygon technique as the number of sides grows.

## Core Understanding
Per the Blueprint's Component 3: area assigns a single non-negative number to a two-dimensional region, satisfying invariance (congruent figures have equal area regardless of position or orientation) and additivity (a figure partitioned into non-overlapping pieces has total area equal to the sum of the pieces' areas, the same no matter how it's cut). Every area formula is a specific consequence of these two properties, not an unrelated fact to memorize per shape. Scaling every linear dimension of a figure by factor k scales its area by k², not k — a direct consequence of additivity, since a k×k enlargement decomposes into exactly k² copies of the original unit, not k. The circle's area formula is not an isolated fact: inscribing regular n-gons of increasing n inside a fixed circle, the polygon's area (computable via `math.geom.area-polygon`'s own technique) converges toward πR² as n grows — the circle's area is the limit this same polygon-decomposition technique converges to, a limit `math.calc.integral-area` makes fully rigorous.

## Mental Models
1. **The invariance-and-additivity model** (Blueprint TA-A01, P06): area is a measure defined by two properties — congruent figures have equal area, and any valid decomposition of a figure gives the same total area, regardless of how it's cut.
2. **The squared-scaling model** (Blueprint TA-A02, P28): linear scaling by k always scales area by k², since scaling affects both dimensions of the figure simultaneously.
3. **The polygon-limit model** (Blueprint TA-A03, P11): A=πr² is not a separate formula to memorize — it's the limit of the exact regular-polygon technique already mastered, applied with more and more sides.

## Why Students Fail
Per the Blueprint's Misconception Registry: the foundational failure is believing a larger perimeter implies a larger area (or vice versa), missing that area and perimeter are independent measurements of the same figure. A second failure is believing that scaling a figure's linear dimensions by k scales its area by k as well, missing that area scales by k². A third failure is believing A=πr² is an arbitrary, unrelated formula to memorize, missing that it is the limit of the regular-polygon decomposition technique as the number of sides grows.

## Misconceptions
Reused by reference from the Blueprint's Component 6 Misconception Registry, with birth-type classification added:

- **MC-1 — AREA-PERIMETER-CONFLATED** (Foundational)
  - **Blueprint description**: believing larger perimeter implies larger area (or vice versa), missing that area and perimeter are independent measurements.
  - **Birth type**: Type 3, language contamination — everyday language often uses "bigger" loosely for both size measures, blurring that area and perimeter are genuinely independent quantities of the same figure.
  - **Repair approach**: Blueprint Repair Action B01 — the two-decomposition consistency check alongside a same-perimeter-different-area counter-example.

- **MC-2 — LINEAR-SCALING-OF-AREA** (Foundational)
  - **Blueprint description**: believing that scaling a figure's linear dimensions by k scales its area by k as well, missing that area scales by k².
  - **Birth type**: Type 1, overgeneralization — the correct rule for scaling a single length (multiply by k) is over-generalized directly to area, without accounting for area being a two-dimensional quantity affected in both directions simultaneously.
  - **Repair approach**: Blueprint Repair Action B02 — the direct 3×4 versus 6×8 rectangle contrast, confirming area quadruples (k²), not doubles (k).

- **MC-3 — CIRCLE-AREA-AS-ISOLATED-FORMULA** (Moderate)
  - **Blueprint description**: believing A=πr² is an arbitrary, unrelated formula to memorize, missing that it is the limit of the regular-polygon decomposition technique.
  - **Birth type**: Type 4, notation-induced — the circle formula is typically introduced as a standalone equation with π as a special constant, obscuring its direct connection to the already-mastered polygon-area technique.
  - **Repair approach**: Blueprint Repair Action B03 — the convergent numerical sequence of regular n-gon areas approaching π as n grows.

## Analogies
- **The city-planner analogy** (Blueprint Component 5, P76): comparing two irregularly-shaped parks surveyed by decomposing them into different sets of triangular/rectangular plots — their total areas are validly comparable regardless of decomposition method, and a shorter perimeter alone tells nothing about which park is larger.

## Demonstrations
- Decomposing an L-shaped figure two different ways, both giving the same total area of 24, alongside a same-perimeter-different-area counter-example (Blueprint A01, Example 1), targeting MC-1.
- Scaling a 3×4 rectangle (area 12) by k=2 to a 6×8 rectangle (area 48, not 24), confirmed by decomposing it into four copies of the original (Blueprint A02, Example 2), targeting MC-2.
- The convergent sequence of regular n-gon areas inscribed in a unit circle (2.598, 3.000, 3.106, 3.140, ...) climbing toward π (Blueprint A03, Example 3), targeting MC-3.

## Discovery Questions
1. "If a figure has a large perimeter, must it also have a large area?"
2. "If you double the side lengths of a shape, does its area also just double?"
3. "Is the circle's area formula A=πr² a completely unrelated fact from everything learned about polygon areas?"

## Teaching Sequence
Follows the Blueprint's Component 5 exactly: A01 (area vs. perimeter, and decomposition-independence) → A02 (scaling squares, not doubles) → A03 (the circle area formula is not an isolated fact) → A04 (Mastery Gate, P91).

## Tutor Actions
- **ORGANIZE: Concept Map** — the area-versus-perimeter contrast, including a same-perimeter-different-area counter-example (Blueprint A01), targeting MC-1.
- **TEST-THINKING: Error Analysis** — the doubled-sides-versus-quadrupled-area contrast (Blueprint A02), targeting MC-2.
- **DO: Worked Example** — the convergent regular-polygon-area sequence approaching π (Blueprint A03), targeting MC-3.
- **TELL: Explanation** — area as a measure defined by invariance and additivity, not a per-shape formula collection.

## Voice Teaching Notes
When a student predicts a scaled area, ask "did you square the scale factor, or just multiply once?" as a standing check directly targeting MC-2.

## Assessment Signals
- **P76 (transfer probe, independence mode per the Blueprint's Component 7 — cross_links target `math.calc.integral-area` confirmed unauthored via directory check)**: reused verbatim from the Blueprint's Component 5 A04 — the city-planner scenario comparing two differently-decomposed parks, refuting a perimeter-implies-area claim, and estimating a circular pond's area via polygon approximation.
- **P77 (mastery gate)**: the Blueprint's 4-item problem set plus P76 (Component 5 A04), MAMR 5/5.

## Tutor Recovery Strategy
If MC-2 persists, require the student to explicitly compute the new area by direct decomposition (counting scaled unit copies) rather than applying a scale factor formula from memory, for several different scale factors, until the k² relationship is derived reliably each time rather than assumed.

## Memory Hooks
- "Area and perimeter are independent — a longer boundary doesn't mean more area."
- "Scaling every side by k scales area by k² — never just k."
- "The circle's area formula is the limit of the polygon technique you already know, not a separate fact."

## Transfer Connections
- `math.geom.surface-area` (unlocks) extends the additivity/decomposition idea to the surfaces of 3D solids.
- `math.calc.integral-area` (unlocks, cross-link) makes the polygon-to-circle limiting process from this concept's LO3 fully rigorous via integration.
- `math.geom.area-polygon` (requires) supplies the triangle-decomposition technique and the regular-polygon shortcut this concept's circle-limiting argument directly reuses.

## Cross-Subject Connections
- Physics: pressure calculations (force per unit area) rely directly on this concept's invariant, additive area measure.

## Blueprint References
`docs/curriculum/blueprints/math.geom.area.md` — all worked examples, teaching actions, and the P76/P77 assessment items reused by reference, not restated in full.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None — the Blueprint's own cross-link finding (`math.calc.integral-area` unauthored, independence mode) was independently re-verified at authoring time and remains accurate.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.geom Wave 8.
