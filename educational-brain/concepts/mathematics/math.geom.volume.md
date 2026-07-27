# math.geom.volume

## Identity
- **KG ID**: `math.geom.volume`
- **Domain**: math.geom (Geometry)
- **Requires**: `math.geom.solid-3d`
- **Unlocks**: none listed in the KG.
- **Cross-links**: `math.calc.volume-revolution` (not yet authored — no Blueprint on disk; P76_mode = independence per the Blueprint's own determination).
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.8 (⌈0.8×5⌉ = 4/5)
- **Estimated hours**: 5
- **Blueprint**: `docs/curriculum/blueprints/math.geom.volume.md` (reused by reference throughout this entry).

## Learning Objective
The student will compute volume for standard solids (prisms, pyramids, cylinders, cones, spheres) using their respective formulas, recognize that different solid types require genuinely different formulas because their shapes distribute space differently, and recognize (at orientation level) that volume can be computed generally by integrating cross-sectional area, previewing where the standard formulas' constants actually come from.

## Core Understanding
Per the Blueprint's Component 3: volume measures three-dimensional enclosed space; standard solids each have a specific closed-form formula — a rectangular prism has volume l×w×h, a cylinder πr²h, a sphere ⁴⁄₃πr³, a cone or pyramid ⅓×(base area)×h — with no single universal formula applicable to every solid type directly. The ⅓ factor for cones/pyramids (versus none for cylinders/prisms) reflects a real geometric difference: a prism/cylinder keeps the same cross-sectional area all the way up, while a cone/pyramid's cross-section shrinks continuously to a point at the apex, genuinely containing less material by exactly that factor. Rather than each formula being an independent memorized fact, volume can be computed generally by integrating cross-sectional area A(x) along the solid's height: V=∫A(x)dx; applying this to a cone (where the radius shrinks linearly, so area shrinks quadratically) produces the familiar ⅓ factor directly via integration.

## Mental Models
1. **The solid-specific-formula model** (Blueprint TA-A01, P11): each solid type has its own volume formula — the task is identifying which type of solid you have and applying the right formula for it, not finding one universal rule.
2. **The genuine-shrinkage model** (Blueprint TA-A02, P28): the ⅓ factor for pyramids/cones reflects a real geometric difference — the cross-section genuinely shrinks to nothing at the apex, containing exactly three times less material than the same-base-same-height prism.
3. **The integration-derives-the-formulas model** (Blueprint TA-A03, P06): standard volume formulas aren't arbitrary — they can be derived from the single general method of integrating cross-sectional area.

## Why Students Fail
Per the Blueprint's Misconception Registry: the foundational failure is believing there is a single universal volume formula applicable to any solid, missing that each solid type genuinely requires its own specific formula. A second, high-severity failure is believing the cone/pyramid's ⅓ factor is an arbitrary memorized constant, missing that it directly reflects the cross-section shrinking to the apex. A third failure is believing standard volume formulas are simply given facts with no underlying general method, missing that they can be derived from integrating cross-sectional area.

## Misconceptions
Reused by reference from the Blueprint's Component 6 Misconception Registry, with birth-type classification added:

- **MC-1 — VOLUME-ASSUMED-SINGLE-UNIVERSAL-FORMULA** (Foundational)
  - **Blueprint description**: believing there is a single universal volume formula applicable to any solid, missing that each solid type genuinely requires its own specific formula.
  - **Birth type**: Type 1, overgeneralization — `math.geom.area`'s own unifying "one measure, many derivable formulas" framing is over-extended to volume without recognizing that volume formulas genuinely differ in structure (not merely in constants) across solid families.
  - **Repair approach**: Blueprint Repair Action B01 — applying the cylinder and sphere formulas directly, side by side, confirming neither substitutes for the other.

- **MC-2 — ONE-THIRD-FACTOR-ASSUMED-ARBITRARY** (High)
  - **Blueprint description**: believing the ⅓ factor is an arbitrary memorized constant, missing that it directly reflects the cross-section shrinking to the apex.
  - **Birth type**: Type 4, notation-induced — the bare fraction ⅓ appearing in a formula carries no visible connection to any geometric cause, inviting rote memorization without understanding.
  - **Repair approach**: Blueprint Repair Action B02 — the exact same-base-same-height pyramid-versus-prism ratio, confirmed to be precisely 3, not approximately.

- **MC-3 — STANDARD-FORMULAS-ASSUMED-UNDERIVABLE** (Moderate)
  - **Blueprint description**: believing standard volume formulas are simply given facts with no underlying general method, missing that they can be derived from integrating cross-sectional area.
  - **Birth type**: Type 5, instruction-induced — formulas are typically presented and drilled as given facts at this level, without the cross-sectional-integration derivation that would connect them to one another.
  - **Repair approach**: Blueprint Repair Action B03 — the explicit cross-sectional integration of a cone, producing the ⅓ factor directly from ∫x²dx.

## Analogies
- **The silo analogy** (Blueprint Component 5, P76): a cylindrical silo topped with a cone of the same radius requires computing each portion's volume separately using its own formula — treating the whole structure as one uniform cylinder would ignore the cone's genuinely shrinking cross-section.

## Demonstrations
- Computing a cylinder's volume (90π) and a sphere's volume (500π/3) using their respective solid-specific formulas (Blueprint A01, Example 1), targeting MC-1.
- Comparing a pyramid's volume (32) against a same-base-same-height prism's volume (96), confirming the exact 1:3 ratio (Blueprint A02, Example 2), targeting MC-2.
- Deriving the cone's ⅓πR²h formula directly by integrating its linearly-shrinking cross-sectional area (Blueprint A03, Example 3), targeting MC-3.

## Discovery Questions
1. "Is there a single universal volume formula that applies to every solid type directly?"
2. "If you double a pyramid and its matching prism's shared base and height, is the pyramid's ⅓ factor just an arbitrary constant, or does it reflect something real about the shapes?"
3. "Are the standard volume formulas (cylinder, cone, sphere) simply given facts, with no underlying method connecting them?"

## Teaching Sequence
Follows the Blueprint's Component 5 exactly: A01 (volume formulas are solid-specific, applied directly) → A02 (the 1/3 factor reflects a real geometric difference) → A03 (standard formulas are themselves derivable) → A04 (Mastery Gate, P91).

## Tutor Actions
- **DO: Worked Example** — applying the cylinder and sphere formulas directly (Blueprint A01), targeting MC-1.
- **TEST-THINKING: Error Analysis** — the exact same-base-same-height pyramid-versus-prism ratio (Blueprint A02), targeting MC-2.
- **SHOW: Demonstration** — deriving the cone's ⅓ factor via cross-sectional integration (Blueprint A03), targeting MC-3.
- **TELL: Explanation** — why each solid family requires its own formula, tied to how its cross-section behaves along its height.

## Voice Teaching Notes
Before accepting a volume computation, ask "which specific solid type is this, and which formula matches it?" as a standing check directly targeting MC-1.

## Assessment Signals
- **P76 (transfer probe, independence mode per the Blueprint's Component 7 — cross_links target `math.calc.volume-revolution` confirmed unauthored via directory check)**: reused verbatim from the Blueprint's Component 5 A04 — the cylindrical-silo-with-a-cone-top scenario computing total volume, explaining why the whole structure can't be treated as one cylinder, and sketching a cross-sectional-integration verification.
- **P77 (mastery gate)**: the Blueprint's 4-item problem set plus P76 (Component 5 A04), MAMR 4/5.

## Tutor Recovery Strategy
If MC-2 persists, require the student to compute both a pyramid's and its same-base-same-height prism's volumes explicitly and state the ratio numerically, for several different base/height combinations, until the ⅓ relationship is recognized as a consistent geometric fact rather than a memorized constant.

## Memory Hooks
- "Each solid type has its own volume formula — identify the type first."
- "The 1/3 factor is real — a pyramid's cross-section genuinely shrinks to nothing, holding exactly a third of the matching prism's volume."
- "Standard volume formulas can be derived by integrating cross-sectional area — they aren't arbitrary."

## Transfer Connections
- `math.geom.solid-3d` (requires) supplies the classification of prisms, pyramids, cones, cylinders, and spheres this concept's formulas apply to.
- `math.calc.volume-revolution` (cross-link, unauthored) will fully formalize the cross-sectional-integration method previewed here.

## Cross-Subject Connections
- Chemistry: computing the volume of reaction vessels or molecular models of standard geometric shapes relies directly on these same solid-specific formulas.

## Blueprint References
`docs/curriculum/blueprints/math.geom.volume.md` — all worked examples, teaching actions, and the P76/P77 assessment items reused by reference, not restated in full.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None — the Blueprint's own cross-link finding (`math.calc.volume-revolution` unauthored, independence mode) was independently re-verified at authoring time and remains accurate.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.geom Wave 8.
