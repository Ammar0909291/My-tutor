# Circle Circumference (math.geom.circle-circumference)

## Identity
- **Concept ID**: math.geom.circle-circumference
- **Subject**: mathematics
- **Domain**: geometry (math.geom)
- **Grade Band**: intermediate (6–8)
- **Bloom Level**: apply
- **Difficulty**: developing
- **Mastery Threshold**: 0.90
- **Estimated Hours**: 3.0
- **KG Status**: active (NCERT Grade 7, Common Core Grade 7, Cambridge IGCSE)

## Learning Objective
Students will use the formulas C = 2πr and C = πd to compute the circumference of a circle, apply the inverse (solving for r or d given C), explain that π is the exact ratio of circumference to diameter for any circle, use π ≈ 3.14 or the π key on a calculator appropriately depending on context, and estimate circumferences to verify plausibility of computed answers.

## Core Understanding
The circumference of a circle is its perimeter — the distance around the boundary. The foundational fact is that the ratio C/d is the same constant for every circle, regardless of size: that constant is π (pi, ≈ 3.14159…). This gives C = πd directly. Since diameter = 2 × radius, C = 2πr is an equivalent form. Neither form is "more correct" — the choice depends on which measurement is given. π is irrational (non-terminating, non-repeating decimal), so any decimal approximation introduces rounding error; problems that ask for an "exact" answer keep π in symbolic form. A key estimation anchor: for any circle, the circumference is slightly more than 3 diameters (since π ≈ 3.14) — this should be the automatic plausibility check for any computed answer.

## Mental Models
1. **The unrolling model**: imagine unwrapping the circumference as a straight line; it is slightly more than 3 diameter-lengths long — this viscerally connects π to the "three-and-a-bit diameters" estimate and makes π feel like a measured constant, not an arbitrary symbol
2. **The two-formula card**: C = 2πr (radius input) and C = πd (diameter input) written side by side with the instruction "match the formula to the given measurement" — prevents the most common plugging-in error by making the choice a one-step lookup rather than a recall task
3. **The string-and-ruler**: wrapping a string around a circular object and measuring its length vs. measuring the diameter, confirming C/d ≈ 3.14 — anchors π empirically before it is introduced symbolically

## Why Students Fail
1. **Plugging diameter into C = 2πr or radius into C = πd**: the two formula variants use different inputs; students who remember one formula apply it regardless of what is given, halving or doubling when they should not
2. **Using π = 3 or π = 22/7 in contexts requiring greater precision**: π = 22/7 is a fraction approximation (error ~0.04%); using it when the problem requires more decimal places or exact symbolic form gives subtly wrong answers
3. **Forgetting to square the radius in area vs. circumference**: students mix up C = 2πr (circumference) and A = πr² (area); both have π and r, but one multiplies r once, the other squares it — errors emerge under time pressure
4. **Treating "exact answer" and "decimal approximation" as interchangeable**: when a problem asks to "leave the answer in terms of π," students compute a decimal; when a problem provides a decimal approximation for π and expects a decimal answer, students leave a π symbol — both are wrong in their respective contexts

## Misconceptions
**MC-1: WRONG-FORMULA-VARIANT (Type 5, instruction-induced)**
- **Characteristic phrase**: "The circumference is 2π × 14 = 87.96 cm" when the problem gives diameter = 14 (should be πd = 43.98 cm, or first halve: r = 7, then 2π × 7)
- **Mechanism**: C = 2πr is taught first and becomes the default; when diameter is given, students plug it in directly without converting to radius, doubling the correct answer
- **Evidence signature**: circumference answers exactly double the correct value; student cannot state which formula uses radius and which uses diameter without the card
- **Repair path**: "Two paths, same answer. C = 2πr: you need the radius — halve the diameter first. C = πd: you need the diameter — use it directly. Which one does the problem give you?"

**MC-2: π-IS-EXACTLY-22/7-OR-3 (Type 5, instruction-induced)**
- **Characteristic phrase**: "I got 44 cm" (using π = 22/7) vs. the expected 43.98 cm (using π ≈ 3.14159)
- **Mechanism**: π = 22/7 is a useful approximation taught early; students promote it to exact status rather than understanding it as an approximation that introduces small errors; similarly, π ≈ 3 is sometimes used for estimation and migrates into exact calculations
- **Evidence signature**: answers differ from expected by a systematic small percentage; student insists the fraction form is "exact"
- **Repair path**: "22/7 is an approximation — π is irrational, so it has no exact fractional form. For exact answers, leave the π symbol. For approximations, use the π key on the calculator (more decimal places) or 22/7 only when the problem specifies it."

**MC-3: CIRCUMFERENCE-AREA-FORMULA-SWAP (Type 1, overgeneralization)**
- **Characteristic phrase**: "The circumference of a circle with r = 5 is π × 25 = 78.5 cm" (using A = πr² instead of C = 2πr = 31.4 cm)
- **Mechanism**: C = 2πr and A = πr² both use π and r; under retrieval pressure or when both formulas are recently learned, students apply the wrong one — usually A = πr² for a circumference question, since squaring feels like it "does more"
- **Evidence signature**: circumference answer equals the circle's area in the same unit; large discrepancy from any plausibility check (C should be ≈ 3 × diameter ≈ 6r, not πr²)
- **Repair path**: "Circumference = the distance AROUND — like a fence around a circular garden; area = the space INSIDE. C = 2πr has one r (linear). A = πr² has r squared (area unit, cm²). The exponent tells you which you computed."

**MC-4: EXACT-VS-APPROXIMATE-CONTEXT-CONFUSION (Type 4, notation-induced)**
- **Characteristic phrase**: "The circumference is 10π cm… so 31.4 cm" when the problem says "express in terms of π"
- **Mechanism**: students treat "10π cm" and "31.4 cm" as equivalent and interchangeable; they do not register that "express in terms of π" means stop at the symbolic form; conversely, when a decimal is expected, they leave "10π"
- **Evidence signature**: gives decimals where symbolic form is needed; gives symbolic form where decimal is expected; cannot explain why one form is "more exact"
- **Repair path**: "Express in terms of π means your final answer HAS the π symbol — stop there: 10π cm. If the problem wants a decimal, use your calculator: 10 × 3.14159… The symbol form is exact; the decimal is an approximation."

## Analogies
1. **The fence analogy**: building a circular garden — the circumference is the length of fencing needed; just as a rectangular perimeter is the total length of all four sides, the circumference is the total length of the circular boundary
2. **The wheel revolution analogy**: a wheel with diameter d rolls exactly one circumference length (πd) along the ground per full revolution — this connects C = πd to a physical, measurable quantity and shows why π matters in everyday engineering

## Demonstrations
1. **String measurement**: wrap a piece of string around 3 different circular objects (tin can, roll of tape, cup); measure the string length (circumference) and the diameter of each; compute the ratio C/d and confirm it is approximately 3.14 for all three — discovering π empirically
2. **Rolling wheel**: mark a point on a cylinder's rim; roll it along a ruler until the mark returns to the bottom; read off the circumference directly; compare to π × diameter — making the "one revolution = one circumference" model concrete

## Discovery Questions
1. Measure the diameter of a circular lid and compute its circumference. Then wrap a string around the lid and measure the string length. How close are the two values?
2. A wheel makes exactly 100 full revolutions and covers 62.8 m. What is the diameter of the wheel?
3. Which is larger: the circumference of a circle with radius 7 cm, or the perimeter of a square with side 11 cm? Estimate before computing.
4. A circle's circumference is 50π cm. What is its radius? What is its diameter?
5. If you double the radius of a circle, what happens to its circumference? What if you halve the radius?

## Teaching Sequence
1. **Activation (3 min)**: Ask "how would you measure the distance around a circular table?" — surface the idea that circumference is a perimeter; establish the measurement challenge (you can't use a straight ruler directly)
2. **Empirical π discovery (7 min)**: String-and-ruler demo with 2–3 objects of different sizes; students compute C/d for each; establish π ≈ 3.14 as a universal constant for circles
3. **Formula pair (5 min)**: Write C = πd and C = 2πr side by side; explain the derivation (C = πd; d = 2r; substitute: C = 2πr). Drill which formula needs which input. Address MC-1 explicitly with a radius/diameter mix problem
4. **Exact vs. approximate (4 min)**: Work one problem two ways — leave the answer as "10π cm" (exact) and compute "31.4 cm" (approximate); establish when each is required. Address MC-4
5. **Area vs. circumference disambiguation (3 min)**: Write both formulas; identify the exponent difference; run the plausibility check (circumference ≈ 6r, area ≈ 3r²). Address MC-3
6. **Practice (8 min)**: Mixed problems — given r, find C; given d, find C; given C, find r; one "express in terms of π" and one decimal answer

## Tutor Actions
- **Always write both formula variants** before each problem and let the student choose which applies — builds the matching habit
- **Run the plausibility check**: after every computed circumference, confirm "C ≈ 3 × d — does your answer pass this test?"
- **Distinguish exact from approximate at every step**: after computing "6π cm", ask "is this exact or approximate? What would the approximate decimal be?"
- **Track which input the problem gives** before writing any formula: "What is given — radius or diameter?" — stated aloud before the formula is chosen

## Voice Teaching Notes
- **Emphasis markers**: stress "match the formula to what you're given — radius or diameter, not both"; stress "π is the ratio, not an approximation"
- **Hesitation-recovery moves**: if the student is unsure which formula to use, ask "what did the problem give you — a radius or a diameter? That decides which formula."
- **Load-bearing sentences**:
  - "Circumference = π × diameter = 2π × radius — three things, same length"
  - "C/d = π for every circle, always"
  - "Estimate first: circumference ≈ three diameters"
- **Register notes**: "circumference" is the formal term; avoid "perimeter of a circle" as a primary term (though it is correct), as it blurs the distinction students will need when solving problems

## Assessment Signals
- **Correctly computes C from r and from d, solves inverse for r and d, gives exact and approximate answers on request** = AUTOMATIC
- **Doubles or halves the correct answer** = MC-1 active (which-formula-for-which-input drill)
- **Answer is exactly πr² numerically** = MC-3 active (exponent reminder + plausibility check)
- **Gives decimal when exact is requested** = MC-4 active (exact-vs-approximate context question)
- **Uses 22/7 and insists it is exact** = MC-2 active (π-is-irrational statement + calculator comparison)

## Tutor Recovery Strategy
**Immediate tier (right-now, same turn)**:
1. If MC-1 (wrong variant): "Stop. What did the problem give you: radius or diameter? [answer] Then use C = [2πr / πd]. Never use the r-formula when you have d without halving first."
2. If MC-2 (π = 22/7 is exact): "22/7 = 3.142857…; the true π = 3.14159… They differ in the 3rd decimal. 22/7 is an approximation, not the exact value. Exact answers keep the π symbol."
3. If MC-3 (area formula used): "You computed πr² — that is the area formula. The circumference formula is 2πr, no squaring. Your units should be cm, not cm²."
4. If MC-4 (context confusion): "The problem says 'in terms of π', so your answer stops at the π symbol. Write 6π cm and stop — don't evaluate to a decimal."

**Follow-up tier (consolidation)**:
- Six-problem mixed set: 2 with radius only, 2 with diameter only, 1 inverse (find r given C), 1 "leave in terms of π" — builds the matching habit across all variants
- For MC-3: pair circumference and area problems on the same circle; student computes both with the correct formula each time, comparing the two answers — making the magnitude difference visible

## Memory Hooks
- **"C = πd or C = 2πr — the formula matches your input"**: the formula-choice rule as one compact sentence
- **"π ≈ 3.14 — circumference is a little more than three diameters"**: the estimation anchor
- **"No exponent = circumference; r² = area"**: the formula disambiguation shortcut

## Transfer Connections
1. **Circle area** (`math.geom.circle-area`): A = πr² is the immediate next formula; the radius/diameter confusion (MC-1 here) propagates identically into area problems — solving it here reduces errors there
2. **Circle parts** (`math.geom.circle-parts`): fluent understanding of radius vs. diameter terminology (established in circle-parts) is the prerequisite vocabulary for choosing the correct formula variant
3. **Arc length** (advanced): arc length = (θ/360°) × 2πr is the circumference formula scaled by the fraction of the full circle; the circumference formula is literally the θ = 360° special case

## Cross-Subject Connections
- **Physics (circular motion)**: the distance traveled in one revolution by a rotating object equals its circumference; C = 2πr appears directly in orbital period calculations and angular-to-linear velocity conversions
- **Engineering (wheel design)**: tire labelling (e.g., "205/55 R16") encodes the radius; a mechanic computing tyre circumference for odometer calibration uses C = 2πr directly

## Blueprint References
- **No Blueprint exists for this concept** — no `docs/curriculum/blueprints/math.geom.circle-circumference.md` file exists in this repository. References: NCERT Grade 7 Chapter 11 (Perimeter and Area), Common Core Grade 7 (Geometry: circumference of a circle), Cambridge IGCSE Mathematics (circumference and π).

## Runtime Asset References
- **Explanation Memory**: No ACTIVE explanation asset exists yet; live LLM generation is used (ADR 14 Phase 1)
- **Probe Assets**: No ACTIVE probe asset exists yet; assessments are live-generated, anchored to the Assessment Signals section above
- **Visualization Assets**: No ACTIVE visual asset exists yet; an animation showing the "unrolling" of a circle's circumference into a straight line of length πd would be the highest-value visual asset for this concept

## Curriculum Feedback
- **Prerequisite fit**: `math.geom.circle` and `math.geom.perimeter` are both correct prerequisites; the perimeter prerequisite ensures students already understand "distance around a closed figure" before meeting the circular special case
- **No `unlocks`**: this concept has no downstream `unlocks` in the current KG; natural extensions include arc length (fraction of circumference), circle area, and applications in circular motion
- **Grade band note**: NCERT introduces C = 2πr at Grade 7; the inverse (solving for r from C) appears at Grade 8; the 3-hour estimate covers the full forward-and-inverse range at the developing level

## Version History
- **2026-07-28**: Initial authoring by autonomous curriculum completion program (Batch 55, Wave 10 part 1, second concept). No Blueprint exists; all misconceptions diagnosed via birth-taxonomy procedure. Checked against 21-section Educational Brain Standard (EDUCATIONAL_BRAIN_STANDARD.md); Quality Gate 3 verified.
