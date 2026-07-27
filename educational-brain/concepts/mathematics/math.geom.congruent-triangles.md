# math.geom.congruent-triangles

## Identity
- **KG ID**: `math.geom.congruent-triangles`
- **Domain**: math.geom (Geometry)
- **Requires**: `math.geom.triangle`
- **Unlocks**: `math.geom.geometric-proof`
- **Cross-links**: none (KG lists no cross-links for this concept; P76_mode = independence).
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85 (⌈0.85×5⌉ = 5/5)
- **Estimated hours**: 10
- **Blueprint**: `docs/curriculum/blueprints/math.geom.congruent-triangles.md` (reused by reference throughout this entry).

## Learning Objective
The student will define triangle congruence (identical shape AND size — corresponding sides and angles all equal) as the k=1 special case of similarity, apply the five valid congruence criteria (SSS, SAS, ASA, AAS, HL) requiring equal, not merely proportional, measurements, and correctly reject AAA and SSA as invalid congruence criteria.

## Core Understanding
Per the Blueprint's Component 3: two triangles are congruent if every corresponding side has the same length and every corresponding angle has the same measure — an exact match in both shape and size, which is precisely the k=1 special case of similarity (same shape, any size). Five criteria — SSS (three sides equal), SAS (two sides and the included angle equal), ASA (two angles and the included side equal), AAS (two angles and a non-included side equal), and HL (hypotenuse and one leg, right triangles only) — each pin down a triangle's entire shape and size from just 3 measurements, leaving no freedom for a genuinely different triangle to also satisfy them. Not every 3-measurement combination works: AAA (three equal angles) fixes only shape, never size, since the third angle is forced by the angle-sum property regardless of the triangle's absolute scale; SSA (two sides and a non-included angle) is genuinely ambiguous — the given measurements can be satisfied by two different, non-congruent triangles, since solving for the missing angle opposite one given side can yield two valid solutions.

## Mental Models
1. **The k=1-special-case model** (Blueprint TA-A01, P06): congruence is not a separate idea from similarity — it is the exact special case where the scale factor between two similar triangles equals 1.
2. **The shape-without-size model** (Blueprint TA-A02, P28): matching all three angles (AAA) only ever fixes shape, never absolute size — two triangles can share every angle while genuinely differing in scale.
3. **The two-solutions model** (Blueprint TA-A03, P11): SSA measurements, unlike the five valid criteria, can be satisfied by two genuinely different triangles — the classic ambiguous case.

## Why Students Fail
Per the Blueprint's Misconception Registry: the foundational failure is believing matching shape (equal angles) alone establishes congruence, missing that congruence additionally requires corresponding sides to be equal, not merely proportional. A second failure is believing three matching angles (AAA) establishes congruence, missing that it only ever establishes similarity, since angle-equality alone says nothing about absolute size. A third failure is treating SSA (two sides and a non-included angle) as a valid congruence criterion like SAS, missing the ambiguous case where two non-congruent triangles can satisfy identical SSA measurements.

## Misconceptions
Reused by reference from the Blueprint's Component 6 Misconception Registry, with birth-type classification added:

- **MC-1 — CONGRUENCE-CONFLATED-WITH-SIMILARITY** (Foundational)
  - **Blueprint description**: believing matching shape (equal angles) alone establishes congruence, missing that congruence additionally requires corresponding sides to be equal, not merely proportional.
  - **Birth type**: Type 3, language contamination — "same shape" is used loosely in everyday speech to mean "the same," carrying over into mathematics where "same shape" (similarity) and "same shape and size" (congruence) are genuinely distinct, stricter and looser categories.
  - **Repair approach**: Blueprint Repair Action B01 — the direct contrast between a 3,4,5/6,8,10 similar-but-not-congruent pair and a 3,4,5/3,4,5 genuinely congruent pair.

- **MC-2 — AAA-TREATED-AS-CONGRUENCE-CRITERION** (Foundational)
  - **Blueprint description**: believing three matching angles (AAA) establishes triangle congruence, missing that it only ever establishes similarity.
  - **Birth type**: Type 1, overgeneralization — since matching angles is genuinely sufficient for similarity, this sufficiency is over-generalized to the stronger claim of congruence, without checking that absolute side length is also determined.
  - **Repair approach**: Blueprint Repair Action B02 — direct evidence of two triangles sharing all three angles (50°,60°,70°) yet having genuinely different side lengths.

- **MC-3 — SSA-TREATED-AS-VALID-CRITERION** (Moderate)
  - **Blueprint description**: believing SSA (two sides and a non-included angle) is a valid congruence criterion like SAS, missing the ambiguous case where two non-congruent triangles can satisfy identical SSA measurements.
  - **Birth type**: Type 6, analogy overextension — since SAS (two sides and the INCLUDED angle) is a valid criterion, learners over-extend this pattern to any two-sides-plus-angle combination, without noticing that SSA's angle is not included between the given sides.
  - **Repair approach**: Blueprint Repair Action B03 — the worked two-solution ambiguous case (AB=8, BC=5, ∠A=30°), contrasted against ASA/SAS's genuine uniqueness.

## Analogies
- **The matched-braces analogy** (Blueprint Component 5, P76): a carpenter verifying two triangular braces are truly identical in size, not merely matching in angle-measurements or ambiguous SSA measurements, before installing them as a matched pair — directly requiring a genuine congruence criterion.

## Demonstrations
- The 3,4,5 vs. 6,8,10 (similar, k=2, not congruent) versus 3,4,5 vs. 3,4,5 (congruent, k=1) contrast (Blueprint A01, Example 1), targeting MC-1.
- Two triangles sharing all three angles (50°,60°,70°) but having genuinely different side lengths (Blueprint A02, Example 2), targeting MC-2.
- The SSA two-solution ambiguous case worked numerically (AB=8, BC=5, ∠A=30° yielding two valid, non-congruent triangles) (Blueprint A03, Example 3), targeting MC-3.

## Discovery Questions
1. "If two triangles have the same shape (matching angles), are they automatically congruent?"
2. "If two triangles have all three corresponding angles equal, does that establish congruence?"
3. "Is SSA (two sides and a non-included angle) a valid criterion for triangle congruence, just like SAS?"

## Teaching Sequence
Follows the Blueprint's Component 5 exactly: A01 (congruence as similarity's special case, k=1) → A02 (AAA fixes shape, never size) → A03 (SSA is ambiguous, unlike ASA or SAS) → A04 (Mastery Gate, P91).

## Tutor Actions
- **ORGANIZE: Concept Map** — congruence positioned as similarity's k=1 special case (Blueprint A01), targeting MC-1.
- **TEST-THINKING: Error Analysis** — the AAA-shares-angles-but-differs-in-size evidence (Blueprint A02), targeting MC-2.
- **DO: Worked Example** — the SSA two-solution ambiguous case, computed explicitly (Blueprint A03), targeting MC-3.
- **TELL: Explanation** — the five valid criteria (SSS, SAS, ASA, AAS, HL) as each uniquely pinning down a triangle's shape and size (Blueprint A01).

## Voice Teaching Notes
When a student claims two triangles are congruent from matching angles alone, ask "have you confirmed the sides are equal, or only that the shape matches?" as a standing check directly targeting MC-1 and MC-2.

## Assessment Signals
- **P76 (transfer probe, independence mode per the Blueprint's Component 7 — no cross_links listed)**: reused verbatim from the Blueprint's Component 5 A04 — the carpenter's-braces scenario distinguishing AAA (shape only), SSA (ambiguous), and a genuine valid criterion for confirming true congruence.
- **P77 (mastery gate)**: the Blueprint's 4-item problem set plus P76 (Component 5 A04), MAMR 5/5.

## Tutor Recovery Strategy
If MC-2 or MC-3 persists, require the student to name which specific criterion (SSS, SAS, ASA, AAS, or HL) applies before ever declaring two triangles congruent, explicitly rejecting AAA and SSA as candidates each time, until the discrimination becomes automatic.

## Memory Hooks
- "Congruence is similarity with scale factor exactly 1 — same shape AND same size."
- "AAA only ever proves same shape — never same size."
- "SSA can describe two different triangles — it's not a valid congruence test."

## Transfer Connections
- `math.geom.geometric-proof` (unlocks) uses these congruence criteria as standard justification steps in formal two-column proofs.
- `math.geom.triangle` (requires) supplies the basic triangle definition and angle-sum property this concept's criteria build on.
- `math.geom.similar-triangles` connects directly to this concept's LO1, framing congruence as similarity's k=1 special case without re-teaching similarity's own AA/SAS/SSS criteria.

## Cross-Subject Connections
- Physics: rigid-body and structural-symmetry arguments routinely rely on congruence criteria to establish that two components are truly identical, not merely similar in shape.

## Blueprint References
`docs/curriculum/blueprints/math.geom.congruent-triangles.md` — all worked examples, teaching actions, and the P76/P77 assessment items reused by reference, not restated in full.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None found at authoring time.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.geom Wave 6.
