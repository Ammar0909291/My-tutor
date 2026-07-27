# math.geom.quadrilateral

## Identity
- **KG ID**: `math.geom.quadrilateral`
- **Domain**: math.geom (Geometry)
- **Requires**: `math.geom.polygon`, `math.geom.parallel-lines`
- **Unlocks**: none listed in the KG.
- **Cross-links**: none (KG lists no cross-links for this concept; P76_mode = independence).
- **Difficulty**: developing
- **Bloom level**: understand
- **Mastery threshold**: 0.85 (⌈0.85×5⌉ = 5/5)
- **Estimated hours**: 5
- **Blueprint**: `docs/curriculum/blueprints/math.geom.quadrilateral.md` (reused by reference throughout this entry).

## Learning Objective
The student will define a quadrilateral as a four-sided polygon and its named sub-types (parallelogram, rectangle, rhombus, square, trapezoid, kite) by their specific additional side/angle constraints, correctly place a given quadrilateral within the containment hierarchy of these sub-types, and recognize (at orientation level) that the hierarchy's containments are provable logical consequences, not arbitrary conventions.

## Core Understanding
Per the Blueprint's Component 3: a quadrilateral is simply the four-sided case of `math.geom.polygon`; each named sub-type adds specific further constraints — a parallelogram requires both pairs of opposite sides parallel; a trapezoid requires only one pair; a rectangle requires all four angles right angles; a rhombus requires all four sides equal; a square requires both the rectangle condition and the rhombus condition; a kite requires two distinct pairs of adjacent sides equal. Because a square satisfies both the rectangle condition (right angles) and the rhombus condition (equal sides), a square is both a rectangle and a rhombus simultaneously — these categories nest rather than partition quadrilaterals into disjoint bins; every square is a rectangle, but not every rectangle is a square. These containments are provable logical consequences: since a square is defined to have all four angles 90°, it automatically satisfies a rectangle's defining condition regardless of its other properties — exactly the "stronger condition implies weaker condition" reasoning `math.geom.geometric-proof` formalizes.

## Mental Models
1. **The polygon-plus-constraint model** (Blueprint TA-A01, P11): each quadrilateral name is the polygon definition plus a precise additional condition on sides or angles, not a vague visual impression.
2. **The nested-not-partitioned model** (Blueprint TA-A02, P28): a single shape can genuinely satisfy several categories simultaneously — a square is a parallelogram, a rectangle, and a rhombus all at once, not forced to pick just one.
3. **The provable-containment model** (Blueprint TA-A03, P06): "square implies rectangle" isn't a naming convention — it's a step-by-step logical consequence derivable from the definitions themselves.

## Why Students Fail
Per the Blueprint's Misconception Registry: the foundational failure is believing quadrilateral classification is based on a rough visual impression, missing that each name corresponds to a precise, checkable side/angle condition. A second, high-severity failure is believing a quadrilateral must be classified as exactly one category, missing that categories genuinely nest — a shape can satisfy several simultaneously. A third failure is believing hierarchy containments (like "square implies rectangle") are arbitrary naming conventions, missing that they are provable logical consequences.

## Misconceptions
Reused by reference from the Blueprint's Component 6 Misconception Registry, with birth-type classification added:

- **MC-1 — QUADRILATERAL-CLASSIFICATION-ASSUMED-VISUAL-IMPRESSION** (Foundational)
  - **Blueprint description**: believing quadrilateral classification is based on a rough visual impression, missing that each name corresponds to a precise, checkable side/angle condition.
  - **Birth type**: Type 2, perceptual intuition — shapes that "look about right" for a category are accepted without explicitly checking the defining condition, since visual similarity is the most immediately available cue.
  - **Repair approach**: Blueprint Repair Action B01 — the precise trapezoid-versus-parallelogram distinction, checking one pair versus both pairs of parallel sides.

- **MC-2 — CATEGORIES-ASSUMED-MUTUALLY-EXCLUSIVE** (High)
  - **Blueprint description**: believing a quadrilateral must be classified as exactly one category, missing that categories genuinely nest.
  - **Birth type**: Type 1, overgeneralization — the everyday experience of naming things with one label at a time (a shape "is" a rectangle OR a rhombus) is over-generalized into these categories being mutually exclusive rather than nested.
  - **Repair approach**: Blueprint Repair Action B02 — verifying a square simultaneously satisfies the parallelogram, rectangle, and rhombus conditions.

- **MC-3 — CONTAINMENT-ASSUMED-ARBITRARY-CONVENTION** (Moderate)
  - **Blueprint description**: believing hierarchy containments are arbitrary naming conventions, missing that they are provable logical consequences.
  - **Birth type**: Type 3, language contamination — the terminology (rectangle, rhombus, square) feels like ordinary vocabulary assigned by convention, obscuring that the containments among them are mathematically derivable facts.
  - **Repair approach**: Blueprint Repair Action B03 — the step-by-step derivation that a right-angled rhombus's other three angles are forced to 90° too, using parallel-line angle facts.

## Analogies
- **The window-frame analogy** (Blueprint Component 5, P76): an architect specifying a frame with all four sides equal length (a rhombus) and wanting to also guarantee right-angle corners (making it a square) must specify the additional right-angle condition explicitly, since "nice proportions" alone is not a rigorous specification.

## Demonstrations
- Classifying a quadrilateral with exactly one pair of parallel sides as a trapezoid, not a parallelogram, by checking the precise condition (Blueprint A01, Example 1), targeting MC-1.
- Verifying a square simultaneously satisfies the parallelogram, rectangle, and rhombus conditions at once (Blueprint A02, Example 2), targeting MC-2.
- Deriving, step by step using parallel-line angle facts, that a rhombus with one right angle must have all four angles 90° — hence is a square (Blueprint A03, Example 3), targeting MC-3.

## Discovery Questions
1. "Is classifying a quadrilateral as a 'trapezoid' versus a 'parallelogram' based on how regular it looks, or on checking a precise condition?"
2. "Must a quadrilateral be classified as exactly one of parallelogram, rectangle, rhombus, or square?"
3. "Is 'every square is a rectangle' an arbitrary naming convention, or a provable fact?"

## Teaching Sequence
Follows the Blueprint's Component 5 exactly: A01 (each named sub-type adds a specific additional constraint) → A02 (a single shape can satisfy multiple nested categories at once) → A03 (containments are proven, not assumed by convention) → A04 (Mastery Gate, P91).

## Tutor Actions
- **TEST-THINKING: Error Analysis** — the precise trapezoid-versus-parallelogram check (Blueprint A01), targeting MC-1.
- **ORGANIZE: Concept Map** — the square's simultaneous membership in parallelogram, rectangle, and rhombus (Blueprint A02), targeting MC-2.
- **DO: Worked Example** — the step-by-step derivation that a right-angled rhombus is a square (Blueprint A03), targeting MC-3.
- **TELL: Explanation** — the general principle that quadrilateral sub-types nest rather than partition.

## Voice Teaching Notes
When a student classifies a quadrilateral, ask "which specific condition did you check — sides, angles, or both?" as a standing check directly targeting MC-1.

## Assessment Signals
- **P76 (transfer probe, independence mode per the Blueprint's Component 7 — cross_links = none)**: reused verbatim from the Blueprint's Component 5 A04 — the architect's window-frame scenario identifying the rhombus condition, the additional condition needed for a square, and why "nice proportions" isn't a rigorous specification.
- **P77 (mastery gate)**: the Blueprint's 4-item problem set plus P76 (Component 5 A04), MAMR 5/5.

## Tutor Recovery Strategy
If MC-2 persists, require the student to check all four sub-type conditions (parallelogram, rectangle, rhombus, trapezoid) explicitly for every given quadrilateral, listing every category it satisfies rather than stopping at the first match, until nesting is applied automatically.

## Memory Hooks
- "Each quadrilateral name is a precise condition — check it, don't just look at the shape."
- "A shape can satisfy several nested categories at once — these aren't exclusive boxes."
- "Square implies rectangle is provable, not just a naming choice."

## Transfer Connections
- `math.geom.polygon` and `math.geom.parallel-lines` (require) supply the general closed-figure definition and the parallel-side/angle-relationship machinery this concept's sub-type definitions and hierarchy derivations directly build on.
- `math.geom.geometric-proof` previews formal proof techniques for the "stronger condition implies weaker condition" reasoning this concept's containment hierarchy relies on.

## Cross-Subject Connections
- Chemistry: crystal lattice classifications (e.g. distinguishing square versus rhombic unit cells) rely on the same precise side/angle condition-checking this concept teaches.

## Blueprint References
`docs/curriculum/blueprints/math.geom.quadrilateral.md` — all worked examples, teaching actions, and the P76/P77 assessment items reused by reference, not restated in full.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None found at authoring time.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.geom Wave 8.
