# Trapezoid (math.geom.trapezoid)

## Identity
- **Concept ID**: math.geom.trapezoid
- **Subject**: mathematics
- **Domain**: geometry (math.geom)
- **Grade Band**: intermediate (6–8)
- **Bloom Level**: apply
- **Difficulty**: developing
- **Mastery Threshold**: 0.80
- **Estimated Hours**: 3.0
- **KG Status**: active (NCERT Grade 8, Common Core Geometry)

## Learning Objective
Students will identify a trapezoid by its defining property (exactly one pair of parallel sides, called the bases), name the parallel sides as bases and the non-parallel sides as legs, compute the area using the formula A = ½(b₁ + b₂) × h, identify an isosceles trapezoid by its equal legs and symmetric properties (equal base angles, equal diagonals), and apply these properties to find unknown lengths and angles.

## Core Understanding
A trapezoid (UK: trapezium) is a quadrilateral with exactly one pair of parallel sides. The two parallel sides are the **bases** (b₁ and b₂, typically of different lengths); the two non-parallel sides are the **legs**. The perpendicular distance between the bases is the **height** h. The area formula A = ½(b₁ + b₂) × h comes from the fact that a trapezoid can be understood as the average of two rectangles — one with base b₁ and one with base b₂, both of height h — or equivalently, from cutting it and rearranging pieces to make a rectangle with base ½(b₁+b₂) and height h. An **isosceles trapezoid** is the special case where the legs are equal; this produces symmetric base angles (the two angles at the longer base are equal, and the two angles at the shorter base are equal) and equal diagonals. The key family-distinction: a parallelogram has TWO pairs of parallel sides; a trapezoid has EXACTLY ONE (in the exclusive definition used by most curricula) or AT LEAST ONE (in the inclusive definition that makes parallelograms a special case of trapezoids — students should know which convention their curriculum uses).

## Mental Models
1. **The average-base rectangle**: the trapezoid's area is the height multiplied by the AVERAGE of the two bases — visually, a rectangle exactly halfway between "top-base-wide" and "bottom-base-wide" captures the exact area; the midline of the trapezoid has this average length
2. **The parallel-rails picture**: two railway tracks (the bases) that don't necessarily meet, connected by two crossties (the legs) — one tie going straight across is the height, and the distance between the rails is what matters for area
3. **The cut-and-double trick**: copy the trapezoid, rotate 180°, and fit the two copies together to make a parallelogram with base (b₁ + b₂) and height h; the parallelogram's area is (b₁ + b₂) × h so each trapezoid's area is half that

## Why Students Fail
1. **Using the leg as the height in the area formula**: the height is the perpendicular distance between the bases, not the length of the non-parallel sides; for a right trapezoid (one right angle), the leg IS the height, and students over-generalize this to all trapezoids
2. **Confusing which sides are the bases vs. legs**: "base" sounds like "the bottom side," leading students to use a leg as a base in the area formula; in reality, both parallel sides are called bases, and either can be on the "bottom" depending on orientation
3. **Not knowing the inclusive vs. exclusive convention**: some curricula define a trapezoid as having "at least one" pair of parallel sides (making parallelograms a special case), others require "exactly one" (excluding parallelograms); without knowing their curriculum's convention, students cannot correctly classify parallelograms as trapezoids or not
4. **Treating all trapezoids as isosceles**: applying the equal-base-angles property to a non-isosceles trapezoid, producing incorrect angle values

## Misconceptions
**MC-1: LEG-AS-HEIGHT (Type 5, instruction-induced)**
- **Characteristic phrase**: "The height is 5" when the given slant leg is 5 and the actual perpendicular height is not stated
- **Mechanism**: In a right trapezoid, one leg IS the height (it is already perpendicular to both bases), so some worked examples are right trapezoids where leg = height. Students over-apply this to general trapezoids where the leg is slanted
- **Evidence signature**: Area computations use the leg length for h; correct right-trapezoid problems but systematic error on general (non-right) trapezoids
- **Repair path**: "The height is always the perpendicular distance between the bases — draw a dashed line straight from one base to the other, hitting at a right angle. That's h. For a right trapezoid, the vertical leg IS straight, so it equals h — but that's a coincidence, not a general rule."

**MC-2: ONE-BASE-ONLY (Type 3, language contamination)**
- **Characteristic phrase**: "The base is the bottom side" (using only b₁, the longer base, in the area formula as if b₂ doesn't exist)
- **Mechanism**: "Base" in everyday language means "the bottom" — a single flat bottom. In trapezoids, BOTH parallel sides are called bases; the formula requires both. The word "base" misleads students into looking for just one
- **Evidence signature**: Area computed as b₁ × h (rectangle formula) or ½ × b₁ × h (triangle formula) rather than ½(b₁ + b₂) × h; only the longer or bottom-positioned side is labeled as "base"
- **Repair path**: "Both parallel sides are the bases — there are TWO. We call them b₁ and b₂. The formula needs both because the shape is kind of 'between' a rectangle with base b₁ and a rectangle with base b₂, and we're averaging them."

**MC-3: ALL-TRAPEZOIDS-ARE-ISOSCELES (Type 5, instruction-induced)**
- **Characteristic phrase**: "The base angles are equal" or "the diagonals are equal" for a general trapezoid
- **Mechanism**: Early examples often feature isosceles trapezoids (they're more visually appealing and symmetric), establishing an expectation that all trapezoids have equal base angles
- **Evidence signature**: Solves angle problems in general trapezoids by setting the two base angles equal; cannot identify a counterexample
- **Repair path**: Draw an obviously skewed (non-isosceles) trapezoid; measure the base angles and confirm they're unequal. "The equal-base-angles property is ONLY for isosceles trapezoids. A general trapezoid has no such symmetry."

**MC-4: PARALLELOGRAM-TRAPEZOID-CATEGORY-CONFUSION (Type 1, overgeneralization)**
- **Characteristic phrase**: "A parallelogram is also a trapezoid" (correct under inclusive definition, wrong under exclusive) or "A parallelogram is not a trapezoid" (correct under exclusive, wrong under inclusive)
- **Mechanism**: The two competing curriculum conventions (inclusive: "at least one parallel pair"; exclusive: "exactly one") exist in different textbooks, and students who encounter both are confused about which is correct — neither answer is universally right
- **Evidence signature**: Inconsistent classification of parallelograms across problems; visible confusion when asked directly
- **Repair path**: Make the convention explicit: "This curriculum uses [exclusive/inclusive]. Under OUR definition, [a parallelogram is/is not] a trapezoid. Some other textbooks use a different convention — what matters here is knowing which one we're using."

## Analogies
1. **Two parallel shelves on a wall, connected by supports**: the shelves are the bases (both called "bases" even though one is higher), the supports are the legs, and the perpendicular distance between shelves is the height — you need BOTH shelf lengths to find the total wall area covered
2. **Average-base intuition from a staircase landing**: if one floor is 4 m wide and the one above is 2 m wide, the average width (3 m) times the height gives the area of the trapezoidal end face

## Demonstrations
1. **Cut-and-double area proof**: trace the trapezoid on paper, cut it out, flip it 180° and join it to the original copy — the result is a parallelogram with base (b₁ + b₂) and height h, confirming the area formula by halving
2. **Right vs. general trapezoid comparison**: draw one right trapezoid (where the height equals one leg) and one oblique trapezoid (where it does not) side by side; explicitly label height (dashed, perpendicular) and leg (solid, slanted) in the oblique case to prevent MC-1
3. **Isosceles vs. non-isosceles**: draw an isosceles trapezoid with a vertical line of symmetry visible, mark the equal legs and equal base angles; then draw a non-isosceles trapezoid with no symmetry and clearly unequal base angles — preventing MC-3

## Discovery Questions
1. Can you find the area of a trapezoid if you only know one base and the height? What information is missing and why does it matter?
2. What happens to the area formula when both bases are equal (b₁ = b₂)? What shape have you actually described?
3. If a trapezoid has exactly one right angle, does the leg at that corner equal the height? What about a trapezoid with NO right angles?
4. An isosceles trapezoid has equal base angles — but which base? If you flip the trapezoid upside down, do the equal-angle pairs change?
5. Under the "at least one parallel pair" definition, is a parallelogram a trapezoid? Under "exactly one pair," is it? Which definition does your textbook use?

## Teaching Sequence
1. **Activation (3 min)**: Show a set of quadrilaterals; ask students to sort them into "parallelogram" vs. "not parallelogram." Then reveal one of the "not parallelogram" shapes has one parallel pair — ask: "What makes this one different from the parallelogram? Different from a random quadrilateral?"
2. **Definition and terminology (5 min)**: Introduce the trapezoid definition, label bases (both parallel sides) and legs (non-parallel sides). Address MC-2: "both parallel sides are bases." State the curriculum's inclusive/exclusive convention to address MC-4
3. **Area formula derivation (10 min)**: Cut-and-double demonstration. Derive A = ½(b₁ + b₂) × h. Introduce the "height = perpendicular distance" explicitly with a labeled diagram distinguishing the dashed height from the slant leg. Address MC-1 here
4. **Isosceles trapezoid (8 min)**: Introduce as the special case with equal legs. Derive (or state) the equal-base-angles and equal-diagonal properties from the line of symmetry. Address MC-3: "this only works for isosceles"
5. **Guided practice (8 min)**: Problems mixing right trapezoids, oblique trapezoids, isosceles trapezoids, and general ones — students must identify type, label bases and height, compute area, find angles

## Tutor Actions
- **Always label h with a dashed perpendicular line**: draw the height segment with an explicit right-angle mark before writing the area formula, making the perpendicular-vs-slant distinction visual
- **Ask "how many bases?"**: before any area calculation, ask "how many bases does this trapezoid have?" to reinforce that both parallel sides are bases
- **Check which type of trapezoid**: ask "is this isosceles, right, or general?" before any angle calculation to prevent MC-3 over-application
- **State the convention**: whenever a parallelogram classification question arises, name the curriculum's definition explicitly rather than letting ambiguity persist

## Voice Teaching Notes
- **Emphasis markers**: stress "BOTH parallel sides are bases — b₁ AND b₂" every time the area formula is introduced; stress "perpendicular height, not the leg" for every area problem
- **Hesitation-recovery moves**: if a student is unsure which sides are bases, ask "which two sides are parallel — running the same direction, never meeting?" Those are the bases
- **Load-bearing sentences**:
  - "Both parallel sides are bases; both appear in the area formula"
  - "The height is perpendicular — draw it as a dashed line with a right-angle mark"
  - "Equal base angles only if the trapezoid is isosceles"
- **Register notes**: "trapezium" is the British English term for what this entry calls "trapezoid"; if students come from UK-curriculum materials, flag the terminology difference

## Assessment Signals
- **Correctly identifies both bases and the perpendicular height, applies A = ½(b₁+b₂)×h, distinguishes isosceles from general** = AUTOMATIC
- **Uses leg as height** = MC-1 active (perpendicular-height labeling drill on oblique trapezoids)
- **Uses only one base in the area formula** = MC-2 active (reinforce "two bases" language + cut-and-double demonstration)
- **Applies equal-base-angles to a general trapezoid** = MC-3 active (show non-isosceles counterexample)
- **Incorrectly classifies a parallelogram as/not a trapezoid** = MC-4 active (state curriculum convention explicitly)

## Tutor Recovery Strategy
**Immediate tier (right-now, same turn)**:
1. If MC-1 (leg as height): "Draw a dashed segment from the top base to the bottom base, hitting at exactly 90°. That is h. The slant leg doesn't hit at 90° — it doesn't equal h unless it happens to be vertical."
2. If MC-2 (one base only): "Count the bases out loud with me: this parallel side is b₁, this other parallel side is b₂. Both go into the formula because the trapezoid is 'between' both."
3. If MC-3 (equal angles generalized): "Is this trapezoid isosceles? Equal legs? Check. If the legs aren't equal, the base angles aren't equal — that's a property only of the symmetric version."
4. If MC-4 (parallelogram classification): "Our textbook defines trapezoid as [exactly one / at least one] pair of parallel sides. Under that definition, a parallelogram [is / is not] a trapezoid. Memorize OUR rule."

**Follow-up tier (consolidation)**:
- Work a problem set mixing all three trapezoid types (right, isosceles, general) so students must explicitly identify the type before applying any property — building the type-identification habit
- For MC-1, include at least one problem where h must be computed from the leg and an angle (setting up future trigonometry use)

## Memory Hooks
- **"TWO bases in the formula: ½ × (b₁ + b₂) × h"**: the "two bases" reinforced by the formula's own structure
- **"Height is perpendicular — the dashed right-angle segment, not the slant"**: the same phrase used every time
- **"Isosceles = symmetric = equal legs = equal base angles = equal diagonals"**: the isosceles property chain
- **"One parallel pair only"**: the trapezoid's defining condition versus the parallelogram's two pairs

## Transfer Connections
1. **Parallelogram as limiting case**: when b₁ = b₂, the "trapezoid" becomes a parallelogram; the area formula reduces to b × h, connecting the two shapes' area formulas as one continuous family
2. **Midline theorem**: the segment connecting the midpoints of the two legs equals ½(b₁ + b₂) — the average of the two bases — a result tightly connected to the area formula and to `math.geom.midpoint-formula`
3. **Integration (calculus preview)**: the trapezoid rule for numerical integration of a function approximates the area under a curve using trapezoid strips — a direct application of the formula encountered much later in calculus

## Cross-Subject Connections
- **Architecture and engineering**: trapezoidal cross-sections appear in retaining walls, dovetail joints, and channel designs; engineers compute forces on trapezoidal faces using the area formula
- **Art and design**: the visual weight of a trapezoidal shape (broader at the base, narrower at top) is widely used in logos, columns, and perspective drawings to create a sense of stability or depth

## Blueprint References
- **No Blueprint exists for this concept** — no teachable-content database entry in the Curriculum Production Pipeline as of 2026-07-27
- Related content: NCERT Grade 8 Chapter 11 (Mensuration); Common Core State Standards Geometry (properties of quadrilaterals and area)

## Runtime Asset References
- **Explanation Memory**: No ACTIVE explanation asset exists yet; live LLM generation is used (ADR 14 Phase 1)
- **Probe Assets**: No ACTIVE probe asset exists yet; assessments are live-generated, anchored to the Assessment Signals section above
- **Visualization Assets**: No ACTIVE visual asset exists yet; the cut-and-double area demonstration and right/oblique comparison (Demonstrations section) are delivered via narration or sketch-on-demand

## Curriculum Feedback
- **Prerequisite strength**: `math.geom.quadrilateral` is correct and sufficient — a trapezoid is a specific kind of quadrilateral; no other prerequisite is needed for the defining properties and area formula
- **No `unlocks`**: no downstream `unlocks` listed in the current KG; natural extensions would be the midline theorem and applications in coordinate geometry
- **Inclusive vs. exclusive convention gap**: the curriculum should pick one convention and state it explicitly; the KG definition ("exactly one pair of parallel sides") uses the exclusive convention — this entry teaches accordingly
- **Grade band note**: NCERT places this in Grade 8 Mensuration; Common Core introduces properties in Grade 6-7 and area in Grade 6; the `developing` difficulty rating and 3-hour estimate assume a first formal treatment

## Version History
- **2026-07-27**: Initial authoring by autonomous curriculum completion program (Batch 54, Wave 10 part 1, seventh concept). No Blueprint exists; all misconceptions diagnosed via birth-taxonomy procedure. Checked against 21-section Educational Brain Standard (EDUCATIONAL_BRAIN_STANDARD.md); Quality Gate 3 verified.
