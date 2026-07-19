# Teaching Blueprint: Congruent Triangles (`math.geom.congruent-triangles`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.geom.congruent-triangles` |
| name | Congruent Triangles |
| domain | Geometry |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 10 |
| requires | `math.geom.triangle` |
| unlocks | `math.geom.geometric-proof` |
| cross_links | (none) |
| CPA_entry_stage | C (Concrete) — begins with direct side-length comparison before the general criteria |
| description (KG) | Two triangles are congruent if they have the same shape and size; established by the congruence criteria SSS, SAS, ASA, AAS, and HL (for right triangles). |

## Component 1 — Learning Objectives

- LO1: Define triangle **congruence** (identical shape AND size — all corresponding sides EQUAL and all corresponding angles EQUAL) and distinguish it from **similarity** (`math.geom.similar-triangles` — same shape, possibly different size, corresponding sides only PROPORTIONAL) — congruence is the special case of similarity with scale factor $k=1$.
- LO2: Apply the valid congruence criteria — SSS, SAS, ASA, AAS, and HL (right triangles only) — to determine congruence from just 3 corresponding parts, correctly requiring EQUAL (not merely proportional) measurements throughout.
- LO3: Recognize which combinations of 3 corresponding parts do **NOT** reliably establish congruence — specifically AAA (three equal angles, which only guarantees similarity) and SSA (two sides and a non-included angle, the genuinely ambiguous case) — and correctly reject them as valid criteria.

## Component 2 — Prerequisite Check

Assumes mastery of `math.geom.triangle` (triangle definition, sides, angles, the angle-sum property).

## Component 3 — Core Explanation

**Congruence requires EQUAL corresponding parts, not merely proportional ones**: two triangles are congruent if every corresponding side has the SAME length and every corresponding angle has the SAME measure — an exact match in both shape and size. This is stronger than similarity (`math.geom.similar-triangles`), which only requires corresponding angles equal and corresponding SIDES proportional (by some scale factor $k$, not necessarily $k=1$). Congruence is precisely the special case $k=1$: same shape, same size, no scaling at all.

**The five valid criteria pin down a triangle's full shape and size from just 3 measurements**: SSS (three sides equal), SAS (two sides and the INCLUDED angle between them equal), ASA (two angles and the INCLUDED side between them equal), AAS (two angles and a non-included side equal), and HL (hypotenuse and one leg, for right triangles specifically) — each of these 3-measurement combinations is sufficient to force the ENTIRE triangle's shape and size, leaving no freedom for a genuinely different triangle to also satisfy the same measurements.

**Not every combination of 3 corresponding parts works — AAA and SSA both fail**: AAA (three equal angles) fixes only the SHAPE (this is exactly similarity's own AA criterion, since the third angle is forced by the angle-sum property) — it says nothing about absolute SIZE, so two triangles can share all three angles while being genuinely different sizes. SSA (two sides and a non-included angle — an angle NOT between the two given sides) is the "ambiguous case": the given measurements can sometimes be satisfied by TWO genuinely different, non-congruent triangles, because solving for the missing angle (opposite one of the given sides) can yield two valid solutions.

## Component 4 — Worked Examples

**Example 1 (LO1 — congruence vs. similarity, breaking MC-1)**: $\triangle ABC$ with sides $3,4,5$ and $\triangle DEF$ with sides $6,8,10$ (each side of $DEF$ exactly DOUBLE the corresponding side of $ABC$) — same shape (all angles match, since the sides are proportional with ratio $k=2$) but NOT the same size. These triangles are SIMILAR, not congruent. Contrast: $\triangle ABC$ ($3,4,5$) and $\triangle GHI$ (also $3,4,5$, identical side lengths) — same shape AND same size, scale factor $k=1$ exactly — these ARE congruent. The distinguishing test: are corresponding sides literally EQUAL (congruence) or merely proportional with $k\ne1$ (similarity only)?

**Example 2 (LO2/LO3 — AAA gives only similarity, never congruence, breaking MC-2)**: $\triangle ABC$ has angles $50°,60°,70°$, and $\triangle DEF$ ALSO has angles $50°,60°,70°$ — all three angles match (AAA). But $\triangle ABC$ has sides approximately $3,4,5$ (in some unit) while $\triangle DEF$ has sides approximately $6,8,10$ — same angles, genuinely DIFFERENT sizes. Matching all three angles establishes ONLY similarity, NEVER congruence, since angle-equality alone says nothing about absolute side length. Contrast with a genuine congruence criterion, SAS: if two sides AND the angle INCLUDED between them are equal (not just proportional), the triangle's entire size and shape are uniquely pinned down.

**Example 3 (LO3 — the SSA ambiguous case, breaking MC-3)**: $\triangle ABC$ with $AB=8$, $BC=5$, and $\angle A=30°$ (an angle NOT between the two given sides $AB$ and $BC$ — it is opposite $BC$). This SSA information does NOT uniquely determine the triangle: solving for the angle opposite the other given side can yield TWO different valid solutions (one acute, one obtuse), producing two genuinely different, non-congruent triangles that both satisfy the identical given measurements ($AB=8$, $BC=5$, $\angle A=30°$) — the classic "ambiguous case." Contrast with ASA (two angles and the INCLUDED side) or SAS (two sides and the INCLUDED angle) — both of these ARE valid criteria, each uniquely determining the triangle, unlike SSA.

## Component 5 — Teaching Actions

### Teaching Action A01 — Congruence Is Similarity's Special Case, k = 1 (Primitive P06: Contrast Pair)

Contrast Example 1's two triangle pairs: the $3,4,5$/$6,8,10$ pair (similar, $k=2$, not congruent) against the $3,4,5$/$3,4,5$ pair (congruent, $k=1$). State: "congruence is not a different idea from similarity — it's the exact special case where the scale factor between the two triangles is $1$."

- **MC-1 hook**: ask "if two triangles have the same shape (matching angles), are they automatically congruent?" — a "yes" answer reveals MC-1 (conflating congruence with similarity, missing the requirement that corresponding sides be equal, not merely proportional).

### Teaching Action A02 — AAA Fixes Shape, Never Size (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: two triangles sharing all three angles ($50°,60°,70°$) yet having genuinely different side lengths ($3,4,5$ vs. $6,8,10$). State: "matching all three angles only ever guarantees similarity — it is the AA/AAA criterion for SIMILARITY, and it can never, by itself, establish congruence."

- **MC-2 hook**: ask "if two triangles have all three corresponding angles equal, does that establish congruence?" — a "yes" answer reveals MC-2 (believing AAA is a valid congruence criterion, when it only ever establishes similarity).

### Teaching Action A03 — SSA Is Ambiguous, Unlike ASA or SAS (Primitive P11: Representation Shift)

State: "not every 3-measurement combination pins down a unique triangle — SSA specifically can produce two genuinely different triangles from the identical given measurements, unlike the five valid criteria." Work Example 3's two-solution ambiguous case, contrasted against ASA/SAS's uniqueness.

- **MC-3 hook**: ask "is SSA (two sides and a non-included angle) a valid criterion for triangle congruence, just like SAS?" — a "yes" answer reveals MC-3 (missing the ambiguous case, where SSA measurements can be satisfied by two non-congruent triangles).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Given $\triangle ABC$ with sides $5,6,7$ and $\triangle DEF$ with sides $10,12,14$, state whether they are congruent, similar, or both, and justify.
  2. Given two triangles sharing angles $40°,80°,60°$ but no side information, state the strongest conclusion you can draw (congruent, similar, or neither) and why.
  3. Explain, using the ambiguous case, why SSA cannot be used to certify two triangles as congruent even when the given three measurements match exactly.
  4. Identify which of the five valid congruence criteria (SSS, SAS, ASA, AAS, HL) applies when given two angles and the side between them, and explain why this differs from AAS.
- **P76 (Transfer Probe, mode = independence)**: "A carpenter is verifying that two triangular braces, cut to the same design, are truly identical in size before installing them as a matched pair. (a) The carpenter measures all three angles of both braces and finds them identical. Using this lesson's AAA-vs-congruence distinction, explain why this measurement alone does NOT confirm the braces are the same size. (b) The carpenter then measures two sides and an angle NOT between them on each brace, finding all three measurements identical between the two braces. Using this lesson's SSA ambiguous-case reasoning, explain why this still does not confirm congruence, even though three corresponding measurements match. (c) A colleague suggests 'since we've now checked angles (part a) AND two sides plus an angle (part b), that's plenty of information — surely combining these checks confirms congruence.' Explain specifically what is still missing, and name a genuine, valid congruence criterion (SSS, SAS, ASA, AAS, or HL) the carpenter could use instead to properly confirm the braces are identical."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | CONGRUENCE-CONFLATED-WITH-SIMILARITY | Believing matching shape (equal angles) alone establishes congruence, missing that congruence additionally requires corresponding sides to be EQUAL, not merely proportional | Foundational |
| MC-2 | AAA-TREATED-AS-CONGRUENCE-CRITERION | Believing three matching angles (AAA) establishes triangle congruence, missing that it only ever establishes similarity, since angle-equality alone says nothing about absolute size | Foundational |
| MC-3 | SSA-TREATED-AS-VALID-CRITERION | Believing SSA (two sides and a non-included angle) is a valid congruence criterion like SAS, missing the ambiguous case where two non-congruent triangles can satisfy identical SSA measurements | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Congruence Conflated with Similarity") → P41 (detect: ask a student whether two triangles with equal angles must be congruent, checking for "yes") → P64 (conceptual shift: re-walk Example 1's $3,4,5$ vs. $6,8,10$ contrast against the $3,4,5$ vs. $3,4,5$ case, re-anchoring on "congruence needs equal sides, not just proportional ones").
- **B02 (targets MC-2)**: P27 (name it: "AAA Treated as Congruence Criterion") → P41 (detect: present two triangles with matching angles but different side lengths and ask whether they are congruent, checking for "yes") → P64 (conceptual shift: re-walk Example 2's $50°,60°,70°$ pair with genuinely different sizes, re-anchoring on "AAA only ever establishes similarity, never congruence").
- **B03 (targets MC-3)**: P27 (name it: "SSA Treated as Valid Criterion") → P41 (detect: present SSA measurements and ask whether they establish congruence, checking for "yes") → P64 (conceptual shift: re-walk Example 3's two-solution ambiguous case, re-anchoring on "SSA can produce two genuinely different triangles from the same measurements — it is not a valid criterion").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.geom.triangle` (the basic triangle definition and angle-sum property this concept's criteria build on).
- **Unlocks**: `math.geom.geometric-proof` (uses congruence criteria as standard justification steps in formal two-column proofs).
- **Cross-link**: KG lists no cross_links for this concept (checked via `ls docs/curriculum/blueprints/` before setting P76_mode — none to check). $P76_{mode}=$ **independence**. Note: although not a formal `requires` or `cross_links` entry, this concept's LO1 directly connects to already-authored `math.geom.similar-triangles`, framing congruence as similarity's $k=1$ special case, without re-teaching that concept's own AA/SAS/SSS similarity criteria or scale-factor content.

## Component 8 — Teaching Notes

- estimated_hours = 10 with a proficient/apply tag reflects the BREADTH of five distinct valid criteria (SSS, SAS, ASA, AAS, HL) plus two invalid combinations (AAA, SSA) requiring careful discrimination — not additional conceptual depth per criterion, each of which is comparatively simple once the congruence-vs-similarity distinction (LO1) is established.
- **Division of labor**: `math.geom.similar-triangles` owns similarity's own AA/SAS/SSS criteria (the PROPORTIONAL-sides versions) and scale-factor/area-scaling content. This concept, `math.geom.congruent-triangles`, deliberately does not re-teach those; it owns the EQUAL-measurement congruence criteria as a genuinely distinct set, explicitly contrasting cases where the SAME letter combination (SAS, SSS) means "proportional" in one concept and "equal" in the other — the single most likely source of confusion between the two concepts, addressed head-on in TA-A01/MC-1.
- Example 3's SSA ambiguous case was deliberately worked with specific numbers ($AB=8$, $BC=5$, $\angle A=30°$) rather than left as an abstract warning, since the two-solution phenomenon is far more convincing when a learner can see it is a genuine geometric possibility rather than an arbitrary exception to memorize.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (no cross_links listed → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: direct side-length comparison before the general criteria) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2/LO3, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
