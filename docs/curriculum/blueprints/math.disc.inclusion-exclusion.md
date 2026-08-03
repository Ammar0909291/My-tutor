# Teaching Blueprint: Inclusion-Exclusion Principle (`math.disc.inclusion-exclusion`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.disc.inclusion-exclusion` |
| name | Inclusion-Exclusion Principle |
| domain | Discrete Mathematics |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.disc.combinations`, `math.found.set-operations` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — Venn diagrams before symbolic alternating-sum formula |
| description (KG) | \|A₁∪⋯∪Aₙ\| = ∑\|Aᵢ\| − ∑\|Aᵢ∩Aⱼ\| + ⋯ (alternating). Applied to count objects with at least one property by inclusion/exclusion. Used to derive Euler's totient, derangement formula.

 |

## Component 1 — Learning Objectives

- LO1: Apply the two-set inclusion-exclusion formula $|A\cup B|=|A|+|B|-|A\cap B|$ to count elements with at least one of two properties.
- LO2: Apply the three-set inclusion-exclusion formula $|A\cup B\cup C|=|A|+|B|+|C|-|A\cap B|-|A\cap C|-|B\cap C|+|A\cap B\cap C|$, correctly tracking the alternating add/subtract pattern.
- LO3: Explain WHY simple addition of individual set sizes over-counts elements in multiple sets, and how each correction term compensates for a specific level of over/under-counting.

## Component 2 — Prerequisite Check

Assumes mastery of `math.disc.combinations` (used within applied inclusion-exclusion problems to count each intersection term) and `math.found.set-operations` (union and intersection, the operations this principle directly relates).

## Component 3 — Core Explanation

**Inclusion-exclusion** corrects for double-counting when finding the size of a union of overlapping sets. For two sets: $|A\cup B|=|A|+|B|-|A\cap B|$ — adding $|A|$ and $|B|$ counts elements in BOTH sets twice, so subtracting $|A\cap B|$ once corrects this. For three sets, the pattern continues with alternating signs: add all singles, subtract all pairwise intersections, add back the triple intersection (which was subtracted three times in the pairwise step but should only be excluded... actually included once, requiring this final correction).

The general pattern for $n$ sets alternates: $+\sum|A_i|-\sum|A_i\cap A_j|+\sum|A_i\cap A_j\cap A_k|-\cdots$, continuing through all intersection levels up to the full $n$-way intersection.

## Component 4 — Worked Examples

**Example 1 (LO1 — two-set case)**: Among 50 students, 30 study French, 25 study Spanish, and 12 study BOTH. How many study at least one language? $|F\cup S|=30+25-12=43$.

**Example 2 (LO2, LO3 — three-set case, breaking MC-1)**: Among 100 people, 50 like coffee, 40 like tea, 30 like juice; 20 like both coffee and tea, 15 like both coffee and juice, 10 like both tea and juice; 5 like all three. How many like at least one drink? $|C\cup T\cup J|=50+40+30-20-15-10+5=80$. A common error stops after subtracting the pairwise intersections (getting $50+40+30-20-15-10=75$), omitting the final "+5" correction — the triple intersection $C\cap T\cap J$ was subtracted three times in the pairwise terms (once in each of $C\cap T$, $C\cap J$, $T\cap J$) but should be excluded from the total only ONE net time, requiring it to be added back once.

**Example 3 (LO3 — the over-counting mechanism traced explicitly)**: An element in ALL THREE sets $C,T,J$ is counted 3 times in $|C|+|T|+|J|$ (once per set it belongs to), then subtracted 3 times in $|C\cap T|+|C\cap J|+|T\cap J|$ (since it's in every pairwise intersection too), leaving it counted $3-3=0$ times so far — but it genuinely belongs to the union and should be counted exactly once, so the final $+|C\cap T\cap J|$ term restores it to a net count of $0+1=1$. Tracing this element-by-element accounting is what justifies the alternating-sign pattern, rather than treating it as an arbitrary formula to memorize.

## Component 5 — Teaching Actions

### Teaching Action A01 — Two-Set Case via Venn Diagram (Primitive P11: Representation Shift)

Draw a two-circle Venn diagram for Example 1, shading the overlap region and explicitly counting it once in the union total, connecting the visual double-counted overlap directly to the "subtract $|A\cap B|$ once" correction.

### Teaching Action A02 — Three-Set Case: the Full Alternating Pattern (Primitive P06: Contrast Pair)

Work Example 2's correct full computation against the flawed truncated version (stopping after the pairwise subtraction). State the rule explicitly: "for three sets, the pattern is add-subtract-ADD — don't stop at the subtraction step; the triple intersection needs to be added back once more."

- **MC-1 hook**: this contrast directly targets MC-1 (dropping the final correction term) by showing the numeric discrepancy (75 vs. the correct 80).

### Teaching Action A03 — Tracing an Element's Count Justifies the Formula (Primitive P64: Conceptual Shift)

Work Example 3's element-by-element accounting explicitly for an element in all three sets, tallying its count contribution at each stage of the formula (+3, then −3, then +1, netting to the correct 1), grounding the abstract alternating-sign rule in a concrete mechanism.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.85×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Among 80 people, 45 own a car, 30 own a bike, and 15 own both. How many own at least one?
  2. Among 200 students, 100 take math, 90 take physics, 70 take chemistry; 40 take math and physics, 35 take math and chemistry, 30 take physics and chemistry; 15 take all three. How many take at least one subject?
  3. Given a flawed three-set computation that stops after the pairwise subtraction step, identify the missing term and correct the final answer.
  4. Explain, using an element-tracing argument like Example 3's, why the triple-intersection term in the three-set formula is ADDED rather than subtracted.
- **P76 (Transfer Probe, mode = independence)**: "A company surveys 300 employees about which of three benefits they use: gym membership (120), health insurance top-up (150), commuter pass (90). Overlaps: gym+insurance (40), gym+commuter (25), insurance+commuter (35), all three (10). (a) Compute the number of employees using at least one benefit. (b) An HR analyst computes only $120+150+90-40-25-35=260$ and stops there — explain precisely what this number actually represents (hint: trace what happened to employees using all three benefits) and what the correct final answer should be."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | TRIPLE-INTERSECTION-CORRECTION-OMITTED | Stopping the three-set inclusion-exclusion computation after subtracting pairwise intersections, omitting the final add-back of the triple intersection | Foundational |
| MC-2 | INTERSECTION-COUNTS-MISIDENTIFIED-FROM-PROBLEM-STATEMENT | Misreading which stated overlap value corresponds to which specific pairwise or triple intersection in a word problem | Moderate |
| MC-3 | UNION-SIZE-COMPUTED-AS-SIMPLE-SUM | Adding individual set sizes directly without any intersection correction, ignoring double-counting entirely | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Triple Intersection Correction Omitted") → P41 (detect: present Example 2 and check whether the final "+5" term is included) → P64 (conceptual shift: re-walk Example 3's element-tracing argument, showing the net count without the correction term is 0, not the required 1).
- **B02 (targets MC-2)**: P27 ("Intersection Counts Misidentified from Word Problem") → P41 (detect: review a submitted setup for a mismatched overlap value assigned to the wrong intersection term) → P64 (conceptual shift: re-read the problem statement phrase by phrase, explicitly labeling each stated overlap with its correct set-intersection notation before substituting into the formula).
- **B03 (targets MC-3)**: P27 ("Union Size Computed as Simple Sum") → P41 (detect: present Example 1 and check whether $|A|+|B|$ alone is reported without subtracting the overlap) → P64 (conceptual shift: re-draw the Venn diagram, visually confirming the overlap region is counted twice in the simple sum).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.disc.combinations`, `math.found.set-operations`.
- **Unlocks**: none recorded in the KG.
- **Related**: none declared; the KG description notes this principle is used to derive Euler's totient function and the derangement formula, both elsewhere in the curriculum.

## Component 8 — Teaching Notes

- estimated_hours = 4 reflects that while the two-set case is straightforward, the three-set (and general $n$-set) alternating pattern requires genuine conceptual grounding (LO3) to apply reliably rather than memorize error-pronely.
- MC-1 was ranked most severe because the three-set formula's truncated (missing-final-term) version is not obviously wrong on inspection — it looks like a complete, reasonable computation, making the error easy to make and hard to self-catch without the element-tracing justification.
- Example 3's explicit per-element count-tracing was deliberately included as its own dedicated Teaching Action (A03) rather than folded into the formula statement, since research on this topic consistently shows students who can execute the formula mechanically often cannot explain WHY the alternating signs are necessary — a genuine gap between procedural and conceptual fluency this concept must close.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.disc.combinations`, `math.found.set-operations`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: Venn diagrams before symbols) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2/LO3, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
