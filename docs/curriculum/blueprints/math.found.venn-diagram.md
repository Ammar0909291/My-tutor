# Teaching Blueprint: Venn Diagram (`math.found.venn-diagram`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.found.venn-diagram` |
| name | Venn Diagram |
| domain | Foundations |
| difficulty | foundational |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.found.set-operations` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — this concept formalizes the pictorial stage informally used throughout `math.found.set-operations`'s own teaching |
| description (KG) | A visual representation of sets and their relationships using overlapping circles within a universal rectangle. |
| related | `math.found.set-operations` |
| aliases | Euler diagram, set diagram |

## Component 1 — Learning Objectives

- LO1: Draw a correctly-labeled Venn diagram for two or three sets within a universal rectangle, shading a specified region (e.g. $A\cup B$, $A\cap B\cap C$, $A\setminus B$).
- LO2: Read a shaded Venn diagram and correctly state, in set notation, which combination of operations it represents.
- LO3: Use a Venn diagram to verify a set identity (e.g. De Morgan's law) by shading both sides separately and confirming the shaded regions match exactly.

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.set-operations` (union, intersection, difference, complement) — this concept formalizes the informal overlapping-circle sketches already used to teach those operations into a standard, general-purpose diagram tool.

## Component 3 — Core Explanation

A **Venn diagram** represents sets as overlapping circles inside a rectangle (the rectangle representing the universal set $U$). Each region of the diagram — formed by the circles' overlaps and the space outside them — corresponds to exactly one combination of membership/non-membership in each set. With $n$ sets, a complete Venn diagram has $2^n$ distinct regions (including the "outside all circles" region, representing membership in none).

Venn diagrams are especially useful for VERIFYING set identities: shade the region described by each side of a claimed identity independently, then check whether the two shaded pictures are identical.

## Component 4 — Worked Examples

**Example 1 (LO1 — shading a compound region)**: For sets $A,B,C$ inside $U$, shade $A\cap B\cap C^c$: identify the region inside BOTH the $A$ and $B$ circles but OUTSIDE the $C$ circle — one specific lens-shaped sub-region of the three-circle diagram.

**Example 2 (LO2 — reading an unlabeled shaded region, breaking MC-1)**: A diagram shows two overlapping circles, $A$ and $B$, with ONLY the non-overlapping part of $A$ shaded (the part of $A$'s circle outside $B$). This represents $A\setminus B$ — NOT $A\cap B$ (which would be just the overlap, not shaded here) and NOT $A\cup B$ (which would include all of both circles). Reading the picture requires precisely identifying which sub-regions are shaded, not assuming based on which circles are "involved."

**Example 3 (LO3 — verifying De Morgan's law visually)**: Draw two overlapping circles $A,B$ in $U$. Shade $(A\cup B)^c$: everything OUTSIDE both circles. Separately, shade $A^c\cap B^c$: the region outside $A$ AND outside $B$ — which is, by direct inspection, the exact same "outside both circles" region. The two shaded pictures match exactly, visually confirming $(A\cup B)^c=A^c\cap B^c$.

## Component 5 — Teaching Actions

### Teaching Action A01 — Every Region Corresponds to Exactly One Membership Combination (Primitive P11: Representation Shift)

Draw a three-circle diagram, labeling all 8 regions ($2^3$) with their exact membership pattern (e.g. "in $A$ and $B$, not $C$"), then work Example 1's specific shading task against this labeled map.

- **MC-1 hook**: present Example 2's shaded diagram and ask the student to name the operation it represents; check whether they answer "$A\cap B$" or "$A\cup B$" based on which circles appear in the picture, rather than precisely which sub-regions are actually shaded (revealing MC-1: reading a Venn diagram by which sets are drawn rather than by which specific regions are shaded).

### Teaching Action A02 — Verify an Identity by Shading Both Sides Separately (Primitive P64: Conceptual Shift)

Work Example 3 in full, shading the LHS and RHS as two physically SEPARATE diagrams before comparing, mirroring `math.found.complement`'s own independent-verification principle for De Morgan's law, now applied visually.

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.85×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Draw a two-circle Venn diagram and shade $A\cup B$ entirely.
  2. Draw a two-circle Venn diagram and shade $B\setminus A$ specifically (not $A\setminus B$).
  3. Given a three-circle diagram with only the very center region (all three circles overlapping) shaded, state the corresponding set expression ($A\cap B\cap C$).
  4. Use two separate Venn diagrams to verify $(A\cap B)^c=A^c\cup B^c$ by shading each side and comparing.
- **P76 (Transfer Probe, mode = independence)**: "A market-research firm surveys customers on three product features: 'likes Feature X,' 'likes Feature Y,' 'likes Feature Z.' (a) Sketch (describe in words, region by region, if you cannot draw) a three-circle Venn diagram representing these three groups, and identify which region represents 'customers who like exactly Feature X alone, and neither Y nor Z.' (b) The firm wants to identify 'customers who like at least one of X or Y, but do NOT like Z.' Express this using set notation and describe precisely which region(s) of the Venn diagram this corresponds to."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | DIAGRAM-READ-BY-SETS-DRAWN-NOT-REGIONS-SHADED | Interpreting a Venn diagram based on which circles are present rather than precisely which sub-regions are shaded | Foundational |
| MC-2 | ASYMMETRIC-OPERATION-SHADED-SYMMETRICALLY | When shading $A\setminus B$ or a similarly directional operation, shading the wrong "side" of the overlap, treating the operation as if it were symmetric | Foundational |
| MC-3 | REGION-COUNT-MISCOUNTED-FOR-MULTIPLE-SETS | Failing to identify all $2^n$ distinct regions for $n$ overlapping circles, missing some combination of memberships (e.g. forgetting the "in none of the sets" outer region) | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Diagram Read by Sets Drawn") → P41 (detect: present Example 2 and ask for the operation represented; check for a set-drawn-based rather than shading-based answer) → P64 (conceptual shift: re-examine the diagram region by region, confirming only the non-overlap part of $A$ is shaded).
- **B02 (targets MC-2)**: P27 ("Asymmetric Operation Shaded Symmetrically") → P41 (detect: ask the student to shade $B\setminus A$ after already shading $A\setminus B$; check whether the same region is shaded both times) → P64 (conceptual shift: reuse `math.found.set-difference`'s asymmetry result directly, re-shading each direction separately and confirming they differ).
- **B03 (targets MC-3)**: P27 ("Region Count Miscounted") → P41 (detect: ask the student to enumerate all regions of a three-circle diagram; check for fewer than 8 named regions) → P64 (conceptual shift: systematically list all $2^3$ membership combinations, mapping each to its diagram region, including the "outside all circles" region).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.set-operations`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.found.set-difference` (MC-2's repair reuses its asymmetry result by direct reference), `math.found.complement` (Example 3 mirrors its independent-verification approach to De Morgan's law, now visually).

## Component 8 — Teaching Notes

- estimated_hours = 3 (higher than the isolated-operation entries' 1 hour each) reflects that this concept requires genuine SPATIAL reasoning and drawing skill in addition to the set-theoretic content already mastered, and covers up to three-set diagrams (8 regions), a meaningfully larger scope than any single operation alone.
- MC-1 and MC-2 are both ranked foundational because each represents a failure to translate PRECISELY between the visual and symbolic representations — the entire purpose of this concept is that translation, so either failure undermines the tool's core value.
- Example 2 was deliberately designed as a "trap" — a diagram where the shaded region is neither the full union nor the full intersection, but a genuinely different, asymmetric operation — specifically to make MC-1's danger vivid rather than assuming students will automatically read diagrams region-by-region.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.found.set-operations`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: formalizes prior informal sketches) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
