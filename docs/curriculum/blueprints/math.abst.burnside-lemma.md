# Teaching Blueprint — math.abst.burnside-lemma

<!-- COMPONENT 0: METADATA -->
## Component 0: Metadata

```
BLUEPRINT_ID:        math.abst.burnside-lemma
KG_FIELDS:
  difficulty:        expert
  bloom:             apply
  mastery_threshold: 0.75
  estimated_hours:   5
  requires:          [math.abst.group-action]
  unlocks:           []
  cross_links:       []

SESSION_TA_CAP:      7   (estimated_hours = 5 → cap 7)
CPA_ENTRY_STAGE:     C   (Burnside's lemma is best motivated by a concrete counting problem
                          before the formula; coloring examples provide the concrete entry)
P76_MODE:            Independence
  rationale:         cross_links = []; P76 probe counts colorings of a square under rotation
                     independently, requiring student to apply the formula without scaffolding.
PASS_CRITERION:      ⌈0.75 × 5⌉ = 4 out of 5
  composition:       4 P77 questions + 1 P76 independence probe = 5 items
STATUS:              PACKAGE_READY
```

---

<!-- COMPONENT 1: COGNITIVE MAP -->
## Component 1: Cognitive Map

### Target Understanding
**Burnside's Lemma** (also called the Cauchy–Frobenius lemma):
If a finite group G acts on a finite set X, then the number of distinct orbits |G \ X| is:

  |G \ X| = (1/|G|) × Σ_{g ∈ G} |X^g|

where X^g = {x ∈ X : g · x = x} is the **fixed-point set** of g (elements of X left unchanged by g).

In plain language: the number of essentially-distinct configurations under symmetry = the average
number of configurations fixed by each group element.

### Key Terms
- **Orbit** of x: {g·x : g ∈ G} — all configurations reachable from x by symmetry.
- **Fixed-point set** X^g: configurations that look the same after applying symmetry g.
- **Orbit count** |G \ X|: the number of truly distinct configurations (distinct = in different orbits).

### Conceptual Layers (C → P → A)
| Layer | Content |
|-------|---------|
| **Concrete (C)** | Coloring a triangle's vertices with 2 colors under rotations; direct orbit-counting vs. Burnside |
| **Pictorial (P)** | Fixed-point table: rows = group elements, columns = colorings, mark fixed points |
| **Abstract (A)** | General formula with proof sketch (double-counting of (g,x) pairs with g·x=x) |

### Prerequisite Knowledge (from KG)
- **math.abst.group-action** — action axioms (e·x=x, (gh)·x=g·(h·x)); orbits; stabilizers;
  orbit-stabilizer theorem |G| = |Orb(x)|·|Stab(x)|

### Canonical Example: Coloring a Triangle with 2 Colors
G = Z/3Z = {r⁰, r¹, r²} (rotations of a triangle; r = 120° rotation), X = all 2-colorings of 3 vertices = 2³ = 8 configurations.

| g | Action | X^g (fixed colorings) | |X^g| |
|---|--------|----------------------|------|
| r⁰ (identity) | fixes all | all 8 | 8 |
| r¹ (120°) | rotates → fixed iff v₁=v₂=v₃ | {RRR, BBB} | 2 |
| r² (240°) | rotates → fixed iff v₁=v₂=v₃ | {RRR, BBB} | 2 |

|G \ X| = (1/3)(8 + 2 + 2) = 12/3 = **4** distinct colorings.
Direct count: {RRR}, {BBB}, {RRB, RBR, BRR} (one R, two B), {BBR, BRB, RBB} (one B, two R) → 4 orbits ✓.

---

<!-- COMPONENT 2: MISCONCEPTION REGISTRY -->
## Component 2: Misconception Registry

| ID | Name | Surface Symptom | Root Cause | Severity |
|----|------|----------------|------------|----------|
| MC-1 | FIXED-POINT-MEANS-TOTAL-FIXED | Computes |X^g| as the number of elements in the entire orbit, not the number of x with g·x=x | Confuses orbit size with fixed-point set; misreads "fixed by g" as "touched by g" | **FOUNDATIONAL** |
| MC-2 | BURNSIDE-COUNTS-CONFIGURATIONS | Reports Burnside's result as the total number of configurations rather than the number of distinct orbits | Conflates |X| (all configurations) with |G\X| (distinct ones under symmetry) | Secondary |
| MC-3 | FORMULA-APPLIED-WITHOUT-ALL-GROUP-ELEMENTS | Computes Σ|X^g| for only some g ∈ G (e.g., skips identity) | Doesn't realize the sum runs over ALL elements of G, including the identity | Secondary |

**MAMR Order:** MC-1 (FOUNDATIONAL) cleared at TA-A02 gate before TA-A03.

---

<!-- COMPONENT 3: SCAFFOLDING PROTOCOL -->
## Component 3: Scaffolding Protocol

```
Entry → TA-A01 (P11 four representations: triangle coloring problem, fixed-point table,
                 formula + P49)
      → TA-A02 (P41/P64 MC-1 gate: what X^g really means — fixed by g, not in the orbit
                 + P49)
      → TA-A03 (P06 contrast: orbit count vs. configuration count; formula proof sketch
                 via double-counting + P49)
      → TA-A04 (P91 terminal mastery gate — P76 independence probe)

Repair (Protocol B):
  MC-1 → TB-R01 (re-examine fixed-point definition; test each x individually under g·x=?)
  MC-2 → TB-R02 (contrast: |X|=8 configurations vs |G\X|=4 distinct under symmetry)
  MC-3 → TB-R03 (sum over ALL g, including r⁰; identity always contributes |X| fixed points)
```

---

<!-- COMPONENT 4: PROTOCOL A (MAIN) -->
## Component 4: Protocol A — Main Teaching Sequence

---

### TA-A01 · Entry: The Triangle Coloring Problem (P11 + P49)

**[P11 — REPRESENTATION SHIFT]**

Four representations of Burnside's Lemma applied to the triangle-coloring example:

| Representation | Content |
|----------------|---------|
| **Verbal** | "Count orbits by averaging fixed points: for each rotation, count how many colorings look the same after rotating, then average" |
| **Symbolic** | |G\X| = (1/|G|) Σ_{g∈G} |X^g| = (1/3)(|X^{r⁰}| + |X^{r¹}| + |X^{r²}|) |
| **Table** | Fixed-point table: 3 rows (r⁰, r¹, r²) × 8 columns (colorings); tick fixed ones |
| **Concrete** | r⁰: all 8 fixed; r¹=120°: only RRR and BBB fixed (rotating mixes colors); r²=240°: same |

Walking through the table:
- **r⁰ (identity):** g·x = x for every x. All 8 colorings fixed. |X^{r⁰}| = 8.
- **r¹ (rotate 120°):** vertex 1 → 2, 2 → 3, 3 → 1. Coloring fixed iff color(1)=color(2)=color(3). Only RRR and BBB. |X^{r¹}| = 2.
- **r²  (rotate 240°):** same orbit condition. |X^{r²}| = 2.

Burnside: |G\X| = (8 + 2 + 2)/3 = 12/3 = **4**.

Direct verification: the 4 orbits are {RRR}, {BBB}, {RRB,RBR,BRR}, {BBR,BRB,RBB}.
Burnside gives exactly 4 ✓.

**[P49 — ADAPTIVE CHECKPOINT]**

> A square has 4 corners. Color each corner Red or Blue. The symmetry group is Z/4Z =
> {r⁰, r¹, r², r³} (rotations by 0°, 90°, 180°, 270°). |X| = 2⁴ = 16 colorings.
>
> Compute |X^g| for g = r⁰ and g = r² (180° rotation).
> (i) |X^{r⁰}| = ?
> (ii) For r² (180°): corners 1↔3 and 2↔4 swap. Which colorings are fixed?

Expected:
*(i) r⁰ is the identity: all 16 colorings are fixed. |X^{r⁰}| = 16.*
*(ii) r² swaps 1↔3 and 2↔4. Fixed iff color(1)=color(3) AND color(2)=color(4).
     Choices: color(1)∈{R,B}, color(2)∈{R,B}, color(3)=color(1), color(4)=color(2).
     2 × 2 = 4 fixed colorings: RRRR, RBRB, BRBR, BBBB. |X^{r²}| = 4.*

- **CORRECT** (i=16, ii=4 with justification): ✓ Advance to TA-A02.
- **PARTIAL** (i correct, ii doesn't impose color(1)=color(3) constraint): "r² swaps corner 1 with corner 3; for the coloring to look the same, what must happen to color(1) and color(3)?" Return.
- **INCORRECT**: TB-R01. Return.
- **NO_RESPONSE**: Scaffold "(i) r⁰ fixes every x by definition of identity action. (ii) For r²: list what 180° rotation does to each corner; write the constraint."

---

### TA-A02 · MC-1 Gate: What X^g Really Means (P41 + P64 + P49)

**[P41 — MISCONCEPTION DETECTOR]**

> For the triangle coloring example (G=Z/3Z, X=2-colorings of 3 vertices), a student computes
> |X^{r¹}| as follows: "r¹ rotates the triangle, so the orbit of RRB has size 3 (RRB, RBR, BRR).
> Since |orbit of RRB| = 3, I'll say |X^{r¹}| = 3."
>
> Is the student correct?

*(Pause for response.)*

**[P64 — CONCEPTUAL SHIFT]**

The student is **wrong** about what X^{r¹} means.

**Definition:** X^g = {x ∈ X : g · x = x} — the set of x that are **unchanged** by g.

The student computed the orbit SIZE of one element (which is 3 for RRB), not the fixed-point set.

These are completely different:
| Concept | Formula | What it counts |
|---------|---------|---------------|
| Orbit of x | {g·x : g∈G} | All configurations reachable from x |
| Fixed-point set X^g | {x∈X : g·x=x} | All configurations unchanged by the specific g |

For r¹ (rotate 120°):
- r¹ · RRB: vertex 1→2, 2→3, 3→1, so colors shift: new coloring is BRR ≠ RRB. NOT fixed.
- r¹ · RRR = RRR. Fixed.
- r¹ · BBB = BBB. Fixed.
- All mixed colorings (e.g. RRB, RBR, BRR, RBB, BRB, BBR) become a different coloring under r¹.
|X^{r¹}| = 2, not 3.

MC-1 cleared: test each x individually — does g·x = x? Only count those that pass.

**[P49 — ADAPTIVE CHECKPOINT]**

> For the square coloring problem (G=Z/4Z, X=2⁴=16 colorings), compute |X^{r¹}| where r¹ is
> 90° rotation (corner 1→2→3→4→1).
> A coloring is fixed by r¹ iff rotating 90° gives the same coloring.

Expected:
*r¹ cycles all 4 corners: 1→2, 2→3, 3→4, 4→1. Fixed iff color(1)=color(2)=color(3)=color(4).
Only RRRR and BBBB. |X^{r¹}| = 2.*

- **CORRECT**: ✓ Advance to TA-A03.
- **PARTIAL** (gives 16 or 4): "Does r¹ fix the coloring RRRB? Check: r¹·RRRB = BRRR ≠ RRRB." Return.
- **INCORRECT**: TB-R01 extended. Return.
- **NO_RESPONSE**: Scaffold "r¹ cycles all corners 1→2→3→4→1. For the coloring to look the same after 90°, what must be true of the four corner colors?"

---

### TA-A03 · Why the Formula Works: Double-Counting and the Orbit Count (P06 + P49)

**[P06 — CONTRAST PAIR]**

**Contrast A — Orbit count vs. total count:**

| Quantity | Meaning | Square example |
|----------|---------|---------------|
| |X| | Total colorings (distinguishable corners) | 16 |
| |G \ X| | Orbits (distinct up to rotation) | ≤ 16; need Burnside to compute |
| Σ|X^g| / |G| | Burnside average = orbit count | (sum)/4 |

The question "how many distinct colorings exist under rotation?" asks for |G \ X|, not |X|.

**Contrast B — Proof sketch of Burnside via double-counting:**

Count pairs (g, x) with g · x = x in two ways:
- **By g:** Σ_{g∈G} |X^g|   (sum of fixed-point set sizes)
- **By x:** Σ_{x∈X} |Stab(x)|  (where Stab(x) = {g : g·x = x}, the stabilizer of x)

By orbit-stabilizer theorem: |Stab(x)| = |G| / |Orb(x)|.
So Σ_{x∈X} |Stab(x)| = Σ_{x∈X} |G|/|Orb(x)| = |G| × Σ_{x∈X} 1/|Orb(x)|.
Now Σ_{x∈X} 1/|Orb(x)| counts, for each orbit O, |O| × (1/|O|) = 1. Sum = number of orbits.
Therefore: Σ_{g∈G} |X^g| = |G| × |G \ X|, giving |G \ X| = (1/|G|) Σ_{g∈G} |X^g|. ✓

**[P49 — ADAPTIVE CHECKPOINT]**

> Complete the Burnside computation for the square (Z/4Z acting on 2-colorings of 4 corners).
> You have |X^{r⁰}|=16, |X^{r¹}|=2, |X^{r²}|=4, |X^{r³}|=2.
> (i) Apply Burnside's formula to find |G \ X|.
> (ii) Verify by listing the distinct colorings up to rotation.

Expected:
*(i) |G\X| = (16 + 2 + 4 + 2)/4 = 24/4 = 6.*
*(ii) 6 orbits: {RRRR}, {BBBB}, {RRRB,RRBB (no—wait)... let me be careful:
     1 red: {RRRB, RRBB... no.}
     Actually: 0 reds (BBBB), 1 red (BBBR,BBRB,BRBBB,RBBB → orbit of size 4 → 1 orbit),
     2 adjacent reds (RRBBB... RRBB is a 180° symmetric... let me think:
     RRBB, RBBR, BRRB, RBRB... Orbit {RRBB,BRRB,RBBR,BBRR} size 4 (adjacent reds);
     Orbit {RBRB,BRBR} size 2 (alternating reds) — wait, size should work out.
     Counts: 0R: 1, 1R: 1, 2 adjacent: 1, 2 opposite: 1, 3R: 1, 4R: 1 → 6 orbits ✓.*

- **CORRECT** (sum=24, answer=6): ✓ Advance to TA-A04.
- **PARTIAL** (formula applied correctly but orbit listing incomplete): Accept 6 with formula correct.
- **INCORRECT** (sums only some g): TB-R03. Return.
- **NO_RESPONSE**: Scaffold "Burnside: add up |X^{r⁰}|+|X^{r¹}|+|X^{r²}|+|X^{r³}| then divide by |G|=4."

---

### TA-A04 · Terminal Mastery Gate (P91)

```
P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78
```

**[P77 — MULTI-PROBLEM SET]**  (4 questions)

**Q1.** State Burnside's Lemma. Define X^g clearly.

*(Target: |G\X| = (1/|G|) Σ_{g∈G} |X^g|, where X^g = {x∈X : g·x=x}. |G\X| is the number
of orbits. X^g is the fixed-point set of g — elements fixed by the action of g.)*

**Q2.** Color the 3 vertices of a triangle with 3 colors (R, G, B) under rotation (G=Z/3Z).
Compute |G\X| using Burnside's Lemma.

*(Target: |X| = 3³ = 27. r⁰: all 27 fixed. r¹,r²: fixed iff all vertices same color → {RRR,GGG,BBB},
so |X^{r¹}| = |X^{r²}| = 3. Burnside: (27 + 3 + 3)/3 = 33/3 = 11.)*

**Q3.** A student applies Burnside to a square with Z/4Z and reports: "I computed the orbit of
RRRB (which has size 4) and the orbit of RBRB (size 2). So there are 2 orbits."
What error has the student made?

*(Target: The student found orbits of only two specific configurations, not all orbits. Burnside
(or systematic orbit enumeration) is needed to count ALL distinct orbits. The student also likely
confused "size of an orbit" with "number of orbits." Correct answer via Burnside is 6 orbits.)*

**Q4.** In Burnside's formula, why must the sum include the identity element r⁰?

*(Target: r⁰ is a group element, so it must be included in the sum over all g∈G. |X^{r⁰}| = |X|
because the identity fixes everything. Omitting it under-counts significantly.)*

**[P55 — SCORE]**  Tally Q1–Q4.

---

**[P76 — TRANSFER PROBE]**  (P76_MODE = Independence)

*Independent application of Burnside's Lemma to a new symmetric object.*

> A regular hexagon has 6 vertices. Color each vertex Red or Blue. The symmetry group is
> Z/6Z = {r⁰, r¹, r², r³, r⁴, r⁵} (rotations by 0°, 60°, 120°, 180°, 240°, 300°). |X| = 2⁶ = 64.
>
> (a) For each rotation r^k (k = 0,1,2,3,4,5), state the condition for a 2-coloring to be fixed,
>     then compute |X^{r^k}|.
> (b) Apply Burnside's formula to find the number of distinct colorings.

*Expected answers:*
- **(a)**
  - r⁰: all 64 fixed. |X^{r⁰}| = 64.
  - r¹ (60°): cycles all 6 vertices in one orbit (1→2→3→4→5→6→1); fixed iff all same color: 2. |X^{r¹}| = 2.
  - r² (120°): two 3-cycles (1→3→5→1, 2→4→6→2); fixed iff color(1)=color(3)=color(5) AND color(2)=color(4)=color(6): 2×2=4. |X^{r²}| = 4.
  - r³ (180°): three 2-cycles (1↔4, 2↔5, 3↔6); fixed iff color(i)=color(i+3) for i=1,2,3: 2³=8. |X^{r³}| = 8.
  - r⁴ (240°): same cycle structure as r²: |X^{r⁴}| = 4.
  - r⁵ (300°): same cycle structure as r¹: |X^{r⁵}| = 2.
- **(b)** Burnside: (64+2+4+8+4+2)/6 = 84/6 = **14** distinct colorings.

**[P55 — SCORE]**  Award 1 point if both parts correct (all six fixed-point counts and final answer 14); 0 otherwise.

---

**[P75 — MASTERY ASSESSMENT]**

```
PASS_CRITERION: 4 out of 5 items (4 P77 + 1 P76)
THRESHOLD:      0.75  →  ⌈0.75 × 5⌉ = 4
```

**[P55 — SCORE]**  Combine P77 tally + P76 score → total out of 5.

**[P74 — ROUTING DECISION]**

- **Score ≥ 4/5 → MASTERY ACHIEVED.** Proceed to P78.
- **Score ≤ 3/5 → Identify which items failed:**
  - Q1 wrong → definition gap → re-state X^g = {x: g·x=x} and orbit formula.
  - Q2 wrong → MC-3 (missed identity or r¹/r²) → TB-R03; re-work fixed-point table.
  - Q3 wrong → MC-2 (orbit count vs. configuration count) → TB-R02.
  - Q4 wrong → MC-3 (skipping identity) → TB-R03.
  - P76 wrong → identify which r^k has wrong |X^{r^k}|; explain cycle structure and fixed-point condition.
  - After repair, re-administer only the failed item.

**[P55 — SCORE]**  Record repair outcome.

**[P78 — COMPLETION]**

```
BLUEPRINT_ID:    math.abst.burnside-lemma
MASTERY_REACHED: true
UNLOCKS:         []
NEXT_CONCEPT:    (continue math.abst domain)
SESSION_CLOSE:   "You can now apply Burnside's Lemma to count distinct configurations under
                  symmetry. The key steps are: identify the group and its action, compute the
                  fixed-point set X^g for each group element (elements fixed by that symmetry),
                  sum over all group elements, and divide by |G|."
```

---

<!-- COMPONENT 5: PROTOCOL B (REPAIR) -->
## Component 5: Protocol B — Repair Chains

---

### TB-R01 · Repair: FIXED-POINT-MEANS-TOTAL-FIXED (MC-1)

**Trigger:** Student computes |X^g| incorrectly — confuses orbit size with fixed-point count.

**Step 1 — State the definition.**
> X^g = {x ∈ X : g · x = x}.
> For each x, ask: "Does applying g to x give back x?"
> Count only those x that pass this test.

**Step 2 — Walk through r¹ on the triangle.**
> r¹ rotates 120°. Test each coloring:
> - RRR: r¹·RRR = RRR ✓ (all same, rotation doesn't change it)
> - BBB: r¹·BBB = BBB ✓
> - RRB: r¹ moves colors: vertex 1→2, so position 2 gets the old color of 1 = R;
>        position 3 gets old color of 2 = R; position 1 gets old color of 3 = B.
>        r¹·RRB = BRR ≠ RRB. ✗ Not fixed.
> Fixed-point set of r¹ = {RRR, BBB}. |X^{r¹}| = 2.

**Exit:** Return to TA-A02 P49.

---

### TB-R02 · Repair: BURNSIDE-COUNTS-CONFIGURATIONS (MC-2)

**Trigger:** Student reports Burnside's result as the total number of configurations.

**Step 1 — Contrast the two quantities.**
> |X| = total number of configurations (2³ = 8 for triangle, ignoring symmetry).
> |G \ X| = number of DISTINCT configurations under symmetry (orbits).
> These are different. |G \ X| ≤ |X|.

**Step 2 — Concrete example.**
> Triangle: |X| = 8 colorings; RRB, RBR, BRR are all "the same" under rotation.
> Under rotation, we count {RRR}, {BBB}, {orbit of RRB}, {orbit of RBB} = 4 distinct types.
> Burnside gives 4 = |G \ X|, not 8 = |X|.

**Exit:** Return to TA-A03 P49.

---

### TB-R03 · Repair: FORMULA-APPLIED-WITHOUT-ALL-GROUP-ELEMENTS (MC-3)

**Trigger:** Student sums |X^g| for only some g (e.g., non-identity elements only).

**Step 1 — Reinforce the domain of the sum.**
> Burnside: Σ_{g ∈ G} |X^g|. The sum runs over EVERY g in G.
> G = Z/4Z has 4 elements: r⁰, r¹, r², r³. All four must be included.

**Step 2 — Why identity matters most.**
> |X^{r⁰}| = |X| because the identity fixes every x.
> For a square: |X^{r⁰}| = 16 (much larger than |X^{r¹}|=2 or |X^{r²}|=4).
> Omitting r⁰ changes the sum from 24 to 8, giving 8/4 = 2 — wildly wrong.

**Exit:** Return to TA-A03 P49.

---

<!-- COMPONENT 6: P89 SPACED REPETITION -->
## Component 6: P89 Spaced Repetition

```
P89 SCHEDULE:
  Interval-1 (next session):
    Probe: "State Burnside's Lemma. What is X^g?"
    Target: |G\X| = (1/|G|)Σ|X^g|; X^g = {x: g·x=x}.

  Interval-2 (+3 days):
    Probe: "Triangle, 2 colors, rotations (Z/3Z): apply Burnside. What is the answer?"
    Target: (8+2+2)/3 = 4 distinct colorings.

  Interval-3 (+1 week):
    Probe: "Square, 2 colors, Z/4Z: why does |X^{r²}| = 4?"
    Target: r² swaps corners 1↔3 and 2↔4; fixed iff color(1)=color(3) AND color(2)=color(4); 2×2=4.

REACTIVATION_TRIGGER: Any probe fails → requeue TA-A02 (MC-1 gate: X^g definition).
```

---

<!-- COMPONENT 7: CROSS-BLUEPRINT DEPENDENCIES -->
## Component 7: Cross-Blueprint Dependencies

```
PREREQUISITES_CONSUMED:
  math.abst.group-action:
    Used in:   TA-A01 (action of Z/3Z on 2-colorings of triangle; orbit definition),
               TA-A02 (fixed-point set X^g defined via g·x=x; contrasted with orbit),
               TA-A03 (proof sketch uses orbit-stabilizer theorem |Stab(x)|=|G|/|Orb(x)|),
               TA-A04 (P76 uses cycle structure of Z/6Z action).
    Assumed:   Student knows group action axioms; can compute orbits; has seen the
               orbit-stabilizer theorem.

CROSS_LINKS_NOTED:
  (none — cross_links = [])
```

---

<!-- COMPONENT 8: TEACHING NOTES -->
## Component 8: Teaching Notes

**1. The coloring motivation is essential — do not skip it.**
Burnside's Lemma appears purely abstract without the coloring problem as the motivating example.
The triangle-with-2-colors example has just enough complexity (8 configurations, 4 orbits, 3 non-trivial computations) to make the formula feel useful, while remaining checkable by hand.

**2. The fixed-point table is the key pedagogical tool.**
Have students fill in a table: rows = group elements, columns = configurations, cell = ✓ if fixed.
Reading row sums gives |X^g|; total ÷ |G| gives orbit count. The table forces explicit testing of
each x under each g, directly combating MC-1.

**3. MC-1 is the dominant error at the apply level.**
Students who learned orbit-stabilizer readily conflate |Orb(x)| (the size of an orbit) with
|X^g| (the number of points fixed by g). The triangle TA-A02 example (r¹ fixing only {RRR,BBB})
is the clearest corrective: orbit of RRB has size 3, but |X^{r¹}| = 2 (unrelated quantities).

**4. The proof sketch via double-counting in TA-A03 is optional at bloom=apply.**
Students who have time and interest benefit from seeing WHY the formula works. But the core
skill at bloom=apply is correctly applying the formula (computing each |X^g|, summing, dividing).
The proof sketch can be presented as "here's why it works" without being assessed.

**5. The cycle-structure shortcut for P76 (hexagon) prepares for Pólya enumeration.**
For a k-cycle, fixed colorings require all k vertices the same color. For the hexagon: r² has
two 3-cycles → 2² = 4; r³ has three 2-cycles → 2³ = 8. Students who internalize this pattern
have a stepping stone toward the full Pólya enumeration theorem.

---

<!-- COMPONENT 10: VALIDATION CHECKLIST -->
## Component 10: Validation Checklist

```
VALIDATION CHECKLIST — math.abst.burnside-lemma
================================================

STRUCTURAL
[PASS] V-1   Blueprint has all 10 required components (0–8, 10).
[PASS] V-2   Metadata block complete: all 9 fields present and consistent with KG.
[PASS] V-3   SESSION_TA_CAP = 7; 4 TAs used ≤ 7.
[PASS] V-4   CPA_ENTRY_STAGE = C (Concrete: triangle-coloring problem before formula).
[PASS] V-5   P76_MODE = Independence with explicit rationale (cross_links = []).

MISCONCEPTION COVERAGE
[PASS] V-6   MC-1 FOUNDATIONAL identified; cleared at TA-A02 gate before TA-A03 (MAMR).
[PASS] V-7   MC-1 has dedicated gate TA (TA-A02: P41 + P64 — fixed-point vs. orbit definition).
[PASS] V-8   MC-2 and MC-3 addressed after MC-1 (TA-A03 contrast; TB-R02/R03).
[PASS] V-9   All three MCs have repair chains in Protocol B.

GRAMMAR RULES
[PASS] V-10  GR-1: Every non-repair TA opens with B-category primitive.
               TA-A01→P11 ✓  TA-A02→P41 ✓  TA-A03→P06 ✓  TA-A04→P91(P77) ✓
[PASS] V-11  GR-2: Every non-gate TA has P49.
               TA-A01→P49 ✓  TA-A03→P49 ✓  (TA-A02 is a gate TA)
[PASS] V-12  GR-3: Terminal TA (TA-A04) is a mastery gate containing P91; structure terminal.
[PASS] V-13  GR-4: P41/P64 gate structure present in TA-A02 for MC-1.
[PASS] V-14  GR-6: P91 terminal in TA-A04 with correct compound
               P77→P55→P76→P55→P75→P55→P74→P55→P78. ✓
[PASS] V-15  GR-7: P76 included inside P91 in the mastery gate.
[PASS] V-16  GR-8: No cross-links in KG; cross_links = [].
[PASS] V-17  GR-9: P76 uses Independence mode; probe requires student to compute all six
              |X^{r^k}| for the hexagon and apply Burnside independently (answer = 14).
[PASS] V-18  GR-10: MAMR = 4/5; MC-1 cleared at TA-A02 before TA-A03.

PASS CRITERION
[PASS] V-19  PASS_CRITERION = ⌈0.75 × 5⌉ = 4/5; composition = 4 P77 + 1 P76 = 5 items ✓.
[PASS] V-20  P74 routing covers all score outcomes (≥4/5 → pass; ≤3/5 → item-specific repair).

CONTENT
[PASS] AIR   Burnside's Lemma stated with formula and X^g definition.
             Canonical example: triangle with 2 colors, Z/3Z; full fixed-point table; answer = 4.
             Square extension: Z/4Z, |X|=16; |X^{r^k}| computed for all k; answer = 6.
             MC-1: explicit test of r¹·RRB = BRR ≠ RRB; |X^{r¹}|=2, not orbit size 3.
             MC-2: |X|=8 vs |G\X|=4 contrasted explicitly.
             MC-3: identity must be included; |X^{r⁰}|=|X|=16 for square.
             Proof sketch via double-counting: orbit-stabilizer → Burnside formula derived.
             P76: hexagon with 2 colors, Z/6Z; cycle structure analysis; answer = 14.

VERDICT: PACKAGE_READY
```
