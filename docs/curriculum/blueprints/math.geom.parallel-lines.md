# Teaching Blueprint: Parallel Lines (`math.geom.parallel-lines`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.geom.parallel-lines` |
| name | Parallel Lines |
| domain | Geometry |
| difficulty | developing |
| bloom | understand |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 6 |
| requires | `math.geom.angle-pairs`, `math.geom.line` |
| unlocks | `math.geom.quadrilateral`, `math.geom.geometric-proof` |
| cross_links | none |
| CPA_entry_stage | P (Pictorial) — two parallel lines cut by a transversal, all eight angles marked, before the formal relationship names |
| description (KG) | Lines that never meet; when cut by a transversal they produce equal corresponding angles, alternate interior angles, and co-interior supplementary angles. |

## Component 1 — Learning Objectives

- LO1: Define **parallel lines** as two lines (in the same plane) that never meet, and identify a **transversal** — a third line crossing both parallel lines, creating EIGHT angles total (four at each intersection).
- LO2: State and apply the three transversal-angle relationships — **corresponding angles** (equal, same relative position at each intersection), **alternate interior angles** (equal, on opposite sides of the transversal, between the two parallel lines), and **co-interior angles** (supplementary, same side of the transversal, between the two parallel lines) — directly deriving these from `math.geom.angle-pairs`'s own vertical-angle and linear-pair relationships rather than treating them as three independent new facts to memorize.
- LO3: Apply the **converse** of these relationships: if a transversal crossing two lines produces EQUAL corresponding angles (or equal alternate interior angles, or supplementary co-interior angles), the two lines MUST be parallel — directly refuting the misconception that these angle relationships are one-directional facts (usable only to deduce angle measures FROM known-parallel lines), missing that the SAME relationships can be used in reverse to PROVE two lines are parallel in the first place.

## Component 2 — Prerequisite Check

Assumes mastery of `math.geom.angle-pairs` (complementary/supplementary sums, vertical angles equal, linear pairs supplementary) and `math.geom.line` (a line as a one-dimensional figure determined by two points).

## Component 3 — Core Explanation

**Parallel lines and the transversal**: two lines in the same plane are **parallel** if they never intersect, no matter how far extended (written $\ell_1\parallel\ell_2$). A **transversal** is a third line that crosses BOTH parallel lines, creating two separate intersection points and a total of EIGHT angles (four angles at each intersection point).

**The three angle relationships, derived from already-known machinery**: labeling the eight angles by position, three specific relationships hold whenever the two crossed lines are genuinely parallel: **corresponding angles** (occupying the SAME relative position at each intersection — e.g. both "upper-left") are EQUAL; **alternate interior angles** (between the two parallel lines, on OPPOSITE sides of the transversal) are EQUAL; **co-interior angles** (also called same-side interior angles — between the two parallel lines, on the SAME side of the transversal) are SUPPLEMENTARY (sum to $180°$). These are not three independent facts: corresponding angles being equal is the FOUNDATIONAL fact (following from the parallel-lines structure itself); alternate interior angles being equal then follows by combining a corresponding angle with its VERTICAL angle (`math.geom.angle-pairs`'s own already-established equal-vertical-angles fact); and co-interior angles being supplementary follows by combining an alternate interior angle with its LINEAR PAIR partner (`math.geom.angle-pairs`'s own already-established supplementary-linear-pair fact).

**The converse — using the relationships in reverse to PROVE parallelism**: each of these three relationships is genuinely reversible: if a transversal crossing two lines happens to produce EQUAL corresponding angles (or equal alternate interior angles, or supplementary co-interior angles), this is enough to CONCLUDE the two lines must be parallel — you don't need to already know the lines are parallel to use the angle relationship; observing the angle relationship IS sufficient evidence to establish parallelism in the first place. This converse direction is precisely what `math.geom.geometric-proof` will use to formally PROVE two lines are parallel from angle measurements alone.

## Component 4 — Worked Examples

**Example 1 (LO1 — identifying the transversal and its eight angles)**: Two parallel lines $\ell_1,\ell_2$ are crossed by a transversal $t$. At the intersection with $\ell_1$, four angles are formed (labeled $1,2,3,4$ going clockwise from upper-left); at the intersection with $\ell_2$, four more (labeled $5,6,7,8$, same clockwise convention) — eight angles total, all directly identifiable once the two intersection points and the transversal's path are marked.

**Example 2 (LO2 — deriving alternate interior angles from corresponding angles and vertical angles)**: Given $\angle1=70°$ (upper-left at the FIRST intersection) and the lines are parallel: the CORRESPONDING angle at the second intersection, $\angle5$ (also upper-left there), is also $70°$ (corresponding angles equal, the foundational parallel-lines fact). Now, $\angle5$ and $\angle7$ (lower-right at the second intersection) are VERTICAL angles to each other (directly opposite, per `math.geom.angle-pairs`), so $\angle7=70°$ also. If $\angle7$ happens to be the "alternate interior" position relative to $\angle1$ (opposite side of the transversal, between the two lines), this DERIVES the alternate-interior-angles-equal fact directly from corresponding angles plus vertical angles — no new independent principle was needed.

**Example 3 (LO3 — the converse, proving parallelism from an angle relationship, breaking MC-1)**: Two lines $m,n$ are crossed by a transversal, and it is measured that the corresponding angles at each intersection are BOTH exactly $55°$ (equal). A student might think "I can only use this fact if I already know $m\parallel n$" — but the CONVERSE says the OPPOSITE: observing that the corresponding angles are equal is ITSELF sufficient evidence to conclude $m\parallel n$, even if nobody stated the lines were parallel beforehand. This is a genuinely different logical direction from Example 2 (which assumed parallel lines to DEDUCE an angle) — here, the angle relationship is used to ESTABLISH parallelism as a conclusion.

## Component 5 — Teaching Actions

### Teaching Action A01 — Parallel Lines and the Transversal's Eight Angles (Primitive P11: Representation Shift)

Draw two parallel lines crossed by a transversal, labeling all eight angles. State: "every transversal crossing two lines creates two clusters of four angles each — the SAME clock-position layout repeated at both intersections." Work Example 1's direct identification.

### Teaching Action A02 — Deriving the Three Relationships From Already-Known Facts (Primitive P11: Representation Shift)

Work Example 2's full derivation chain: corresponding angles equal (the foundational parallel-lines fact) $\to$ combined with vertical angles (already known) $\to$ alternate interior angles equal $\to$ combined with linear pairs (already known) $\to$ co-interior angles supplementary. State: "you're not memorizing three unrelated rules — you're combining ONE new fact (corresponding angles) with TWO already-known facts (vertical angles, linear pairs) to get the other two."

### Teaching Action A03 — The Converse: Angle Relationships Prove Parallelism (Primitive P28: Conflict Evidence)

Present Example 3's direct reversal: equal corresponding angles, observed directly, used to CONCLUDE parallelism rather than assumed FROM it. State: "these relationships run in BOTH directions — parallel lines guarantee the angle facts, AND observing the angle facts guarantees the lines are parallel. Don't treat this as a one-way street."

- **MC-1 hook**: ask "if you measure a transversal's corresponding angles and find them equal, but nobody told you the two lines were parallel, can you conclude anything?" — a "no, I'd need to already know they're parallel first" answer reveals MC-1 (missing that the converse licenses concluding parallelism directly from the observed angle equality).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Two parallel lines are crossed by a transversal, and one angle measures $115°$. Find the measure of its corresponding angle, its alternate interior angle (if applicable to that position), and its co-interior partner (if applicable).
  2. Explain, using vertical angles, why alternate interior angles must be equal, given that corresponding angles are equal.
  3. Explain, using linear pairs, why co-interior angles must be supplementary, given that alternate interior angles are equal.
  4. Two lines are crossed by a transversal, and the alternate interior angles are measured to be $82°$ and $82°$ (equal). Using the converse, what can you conclude about the two lines, even without being told anything about them in advance?
- **P76 (Transfer Probe, mode = independence)**: "A surveyor is checking whether two property boundary lines are truly parallel by measuring the angles a straight fence line (acting as a transversal) makes when it crosses both boundaries. (a) Explain what SPECIFIC angle measurements the surveyor should look for (and what relationship among them) to CONCLUDE the two boundary lines are parallel, using the converse relationships from this lesson. (b) If the surveyor measures the co-interior angles as $95°$ and $89°$ (not summing to $180°$), explain what this tells them about the two boundary lines. (c) Explain why the surveyor needs to check only ONE of the three relationships (corresponding, alternate interior, or co-interior) to draw a valid conclusion, rather than needing to verify all three."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ANGLE-RELATIONSHIPS-TREATED-AS-ONE-DIRECTIONAL | Believing the corresponding/alternate-interior/co-interior angle relationships can only be used to deduce angles FROM known-parallel lines, missing that the converse allows concluding parallelism FROM observed angle relationships | Foundational |
| MC-2 | THREE-ANGLE-RELATIONSHIPS-TREATED-AS-INDEPENDENT-FACTS | Memorizing corresponding/alternate-interior/co-interior as three unrelated rules, rather than recognizing alternate-interior and co-interior are directly derivable from corresponding angles plus already-known vertical-angle and linear-pair facts | Foundational |
| MC-3 | TRANSVERSAL-ANGLE-POSITIONS-MISIDENTIFIED | Confusing which specific pair of the eight angles counts as "corresponding," "alternate interior," or "co-interior," especially when the transversal is drawn at an unusual angle | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Angle-Relationships-One-Directional Assumption") → P41 (detect: ask whether measuring equal corresponding angles, with no prior information about the lines, lets you conclude anything) → P64 (conceptual shift: re-walk Example 3's direct converse application, re-anchoring on "the relationship works in BOTH directions — parallel implies equal angles, AND equal angles implies parallel").
- **B02 (targets MC-2)**: P27 (name it: "Three-Relationships-as-Independent-Facts Memorization") → P41 (detect: ask a student to explain WHY alternate interior angles are equal, checking whether they can derive it from corresponding angles plus vertical angles, or only recite it) → P64 (conceptual shift: re-walk Example 2's full derivation chain, re-anchoring on "one new fact plus two already-known facts gives you all three relationships").
- **B03 (targets MC-3)**: P27 (name it: "Transversal Angle Position Misidentification") → P41 (detect: present a transversal diagram with an unusual angle of crossing and ask a student to identify a specific alternate interior angle pair) → P64 (conceptual shift: re-walk Example 1's systematic clockwise labeling convention, re-anchoring on "identify 'between the parallel lines' and 'same/opposite side of the transversal' as the two questions that pin down each relationship's name, regardless of the transversal's specific angle").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.geom.angle-pairs` (the vertical-angle and linear-pair facts this concept's derivation chain directly builds on), `math.geom.line` (the line definition this concept's parallel/transversal structure is built from).
- **Unlocks**: `math.geom.quadrilateral` (properties of parallelograms rely directly on parallel-line angle relationships), `math.geom.geometric-proof` (the converse relationships established here are a standard tool for formally proving lines parallel).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 6 with a developing/understand tag places this at a "3 TAs + gate" tier — A01 (identifying the transversal structure), A02 (deriving the three relationships from already-known facts), and A03 (the converse) each target a distinct LO, appropriate for a concept synthesizing `math.geom.angle-pairs`'s machinery into a new geometric context.
- MC-1 (the converse being under-appreciated) was given the most teaching weight because it is the single most consequential gap for the immediately-unlocked `math.geom.geometric-proof` — proofs of parallelism from angle measurements require exactly this reversed-direction reasoning, and a student who only knows the forward direction cannot construct such proofs at all.
- Example 2's derivation chain (corresponding → vertical angles → alternate interior → linear pairs → co-interior) was deliberately worked as an explicit chain of already-known facts, rather than presenting the three relationships as a flat list, directly targeting MC-2 and reinforcing `math.geom.angle-pairs` as genuinely load-bearing prerequisite content rather than a box to check off.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS (both) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: two parallel lines with a transversal, all eight angles marked) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
