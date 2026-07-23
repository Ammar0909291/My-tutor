# math.found.relation
**Educational Brain Entry** | Mathematics — Foundations
**KG node**: `math.found.relation` | difficulty: developing | bloom: understand | estimated_hours: 6
**Standard**: EDUCATIONAL_BRAIN_STANDARD.md v1.0 | Entry version: 1.0 | Date: 2026-07-23

---

## 1. Concept Identity

**One-line definition**: A (binary) relation from A to B is any subset R of the Cartesian product A×B — a collection of ordered pairs (a,b) indicating which elements of A are related to which elements of B.

**Why this concept exists in the KG**: Relations are the general abstraction underlying functions, equivalences, and order — every function is a relation with extra constraints, and students who do not grasp the "subset of A×B" structure will later misunderstand why functions are special and why reflexivity/symmetry/transitivity matter.

**Canonical KG node data**:
- requires: `math.found.cartesian-product`
- unlocks: (function, equivalence relation, partial order, and their properties)
- bloom: understand
- mastery_threshold: 0.75
- estimated_hours: 6

---

## 2. Blueprint References

Blueprint file: `docs/curriculum/blueprints/math.found.relation.md`

Key teaching objectives extracted (do not duplicate prose):
- LO1: Define a relation as a subset of A×B; determine whether a given set of pairs constitutes a relation
- LO2: Represent a relation in multiple forms: enumerated pairs, arrow diagram, relation matrix, and algebraic predicate
- LO3: Identify domain, codomain, and image (range) of a relation and distinguish image from codomain
- LO4: Recognise that relations impose no uniqueness or totality constraints — contrast with functions

Blueprint misconception registry (cited by ID, birth-type added):
- MC-1 RELATION=FUNCTION: assuming every relation is a function (each element of A maps to exactly one element of B) — Type 5 (instruction-induced: functions are taught first and become the default mental model for "relates")
- MC-2 IMAGE=CODOMAIN: conflating the image (actual outputs reached) with the codomain (declared target set) — Type 3 (language contamination: "range" used interchangeably for both in many textbooks)
- MC-3 RELATION-MUST-BE-RULE: believing every relation must be definable by an algebraic formula or rule, rather than any arbitrary subset of pairs — Type 1 (overgeneralization from school experience with formula-defined functions)

---

## 3. Mental Models

**Primary model — The Directed Connection Graph**: Draw the elements of A on the left, elements of B on the right. A relation draws arrows from some elements of A to some elements of B — any pattern at all. One element of A can point to many B-elements, or none. One element of B can receive many arrows, or none. There are no rules about how many arrows must leave or arrive.

**Secondary model — The Membership Check**: A relation is just a subset of the set of all possible pairs A×B. Before the relation is declared, every possible pair (a,b) is either IN the relation or NOT. The relation IS the set of pairs that are in.

**Anti-model**: "A relation means every a in A points to exactly one b in B" — that is a function, not a relation. A relation is freer: a can point to nothing, or to many things.

---

## 4. Misconception Library

### MC-1: Relation as Function (Type 5 — instruction-induced)
**Verbatim probe phrases**: "Is {(1,2),(1,3),(2,4)} a valid relation? No — 1 maps to both 2 and 3." / "A relation has to be well-defined."
**Mechanism**: Students learn functions first; "well-defined" (one output per input) becomes the default criterion for any relational structure. The more general concept of relation is filtered through the function template.
**Diagnostic signature**: Rejects multi-valued or partial relations; spontaneously applies the vertical-line test.
**Repair**: Present the definition explicitly: a relation is any subset of A×B, with no constraint on how many times any element appears on the left or right. Then show {(1,2),(1,3)} is a perfectly valid relation — draw the arrow diagram. Ask: "What additional rule would turn this relation into a function?" (One output per input.) Student sees that function = relation + extra rule, not the default.

### MC-2: Image Equals Codomain (Type 3 — language contamination)
**Verbatim probe phrases**: "The range of R is B." / "The codomain is everything the relation outputs."
**Mechanism**: Many sources use "range" for both image and codomain, or define range = codomain. Students carry this ambiguity.
**Diagnostic signature**: Does not distinguish B (declared codomain) from the set of actually-reached elements.
**Repair**: Explicitly contrast: R = {(1,3),(2,3)} from A={1,2,3} to B={1,2,3,4,5}. Codomain = B = {1,2,3,4,5}. Image = {3} (only 3 is actually reached). "The codomain is the declared destination; the image is where you actually land."
**Burned-collision note**: Some prior curricula use "range = image" consistently. Name this as a convention conflict, not a student error — they learned a different (valid) convention, and here we use the domain/codomain/image triple.

### MC-3: Relations Must Have Rules (Type 1 — overgeneralization)
**Verbatim probe phrases**: "What's the formula for this relation?" / "You can't just list random pairs — what's the pattern?"
**Mechanism**: School mathematics almost exclusively uses relations defined by formulas (y = 2x, y = x²) — students over-generalise to "relations require a defining rule."
**Diagnostic signature**: Demands an algebraic formula when given an enumerated relation; uncomfortable with arbitrary pair sets.
**Repair**: Present a relation as a list of pairs: R = {(Alice, Bob), (Alice, Carol), (Bob, Dana)} on a set of people. "What is the formula?" There is none. "Is it a valid relation?" Yes — it is just the 'is-friends-with' relation, captured as a set of pairs. Arbitrary subsets of A×B are allowed.

---

## 5. Explanation Library

### Core explanation (concrete — preferred entry point)
A relation from set A to set B is a set of ordered pairs (a,b) where a∈A and b∈B. That is all — it is any selection of pairs from A×B.

Example: A = {1,2,3}, B = {a,b,c}.
A×B has 9 possible pairs: (1,a),(1,b),(1,c),(2,a),(2,b),(2,c),(3,a),(3,b),(3,c).
Any subset of these 9 is a valid relation. For example:
R = {(1,a),(1,b),(3,c)} is a relation from A to B. Element 2 relates to nothing; element 1 relates to two things — both are allowed.

**Multiple representations of the same relation**:
1. Set of pairs: R = {(1,a),(1,b),(3,c)}
2. Arrow diagram: 1→a, 1→b, 2 (no arrows), 3→c
3. Relation matrix (rows=A, cols=B): mark 1 at each (row,col) pair in R, 0 elsewhere.
4. Predicate: (x,y)∈R iff (x=1 and y∈{a,b}) or (x=3 and y=c)

**Domain, codomain, image**:
- Codomain: B = {a,b,c} (the declared target set)
- Domain: A = {1,2,3} (the declared source set)
- Image of R: {a,b,c} — the elements of B that are actually related to by some a∈A. (Here: a,b,c — all three. But if R = {(1,a)}, the image is just {a}, even though B = {a,b,c}.)

### Misconception-repair explanation (for MC-1)
A function is a relation with a constraint: each element of A relates to exactly one element of B. A relation by itself has no such constraint. You can think of relations as the "general case" and functions as the "special case." Every function is a relation; most relations are not functions.

---

## 6. Analogy Library

**Analogy**: A relation is like a social network follow graph. Person A can follow 0, 1, or many people. Person B can be followed by 0, 1, or many people. There is no rule requiring everyone to follow exactly one person. The relation is just the set of (follower, followed) pairs.

**Analogy for image vs codomain**: The codomain is the set of all airport destinations that COULD be reached from an airport; the image is the set of destinations that flights ACTUALLY go to. Many airports in the codomain may have no direct flight.

**Anti-analogy to retire**: "A relation is like a function, but it can be multi-valued." This framing still treats function as the default and relation as the exception — invert it. Relations are the general concept; functions are relations with extra rules.

---

## 7. Demonstration Library

**Demonstration 1 — Any subset is valid**:
List all 4 pairs in {1,2}×{a,b}: (1,a),(1,b),(2,a),(2,b). Ask student to "pick any pairs they like." Whatever they pick is a valid relation. Include the empty selection (∅ is a valid — trivial — relation) and the full selection (all 4 pairs is also valid).

**Demonstration 2 — Four representations**:
Take R = {(1,2),(1,3),(2,3)} on A=B={1,2,3}. Build all four representations together: pair listing → arrow diagram → relation matrix → predicate ("x relates to y if y > x"). Student sees all four are the same object in different clothes.

**Demonstration 3 — Image vs codomain**:
Relation R from {1,2,3} to {1,2,3,4,5}: R = {(1,2),(2,2),(3,4)}.
Codomain: {1,2,3,4,5}. Image: {2,4}. "Which elements of the codomain are never reached?" 1, 3, 5. "Those are in the codomain but not in the image."

---

## 8. Discovery vs. Direct Instruction

**Recommendation**: Discovery for the "any subset is valid" insight; direct instruction for the domain/codomain/image vocabulary triple and the function-vs-relation distinction.

**Discovery sketch**: Present a social network of 4 people and a list of who follows whom. "Is this a valid mathematical structure?" Let student grapple with how to formalise it. Guide toward: pair (follower, followed) — list all such pairs. Introduce the term "relation" after the student has already constructed one. Then ask: "What if we required each person to follow exactly one other person?" — this leads the student to discover the function constraint independently.

---

## 9. Teaching Action Dispatch

| Student state | Recommended action | Source |
|---|---|---|
| MC-1 active (relation=function) | ERROR ANALYSIS: present a multi-valued relation, ask "what's wrong?" — reveal nothing is wrong | Teaching Actions: TEST-THINKING §5 |
| MC-2 active (image=codomain) | WORKED EXAMPLE: build codomain and image for the same relation side by side | Teaching Actions: SHOW §1 |
| MC-3 active (needs a formula) | DEMONSTRATION: social-network example with no formula | Teaching Actions: SHOW §3 |
| FRAGILE on representations | MATCHING: given four representations of the same relation, match them | Teaching Actions: ORGANIZE §3 |
| Ready for transfer | THOUGHT EXPERIMENT: "Can a relation have the empty set as its image? What would that look like?" | Teaching Actions: TEST-THINKING §4 |

---

## 10. Voice Teaching

**Register**: Exploratory and generative. Relation is a deliberately general concept — lean into that generality. "What would happen if we allowed…?" is more productive than "Here is the definition."

**Wait-time**: After showing a multi-valued example, wait for the student to respond before validating. Students often spontaneously reject it (MC-1) — the wait surfaces the misconception before the correction.

**Load-bearing sentences**:
- "A relation is just a set of pairs — any pairs at all."
- "A function is a relation with a rule: each input has exactly one output."
- "The image is where you actually land; the codomain is where you were aiming."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

---

## 11. Assessment Gate Set

**Gate 1 (DEFINITION)**: Is R = {(1,3),(1,4),(2,3)} a valid relation from {1,2} to {3,4,5}? Justify. Pass: YES — it is a subset of {1,2}×{3,4,5}; the fact that 2 maps to one element and 1 maps to two elements is acceptable.

**Gate 2 (REPRESENTATION)**: Draw the arrow diagram for the relation R = {(a,1),(a,2),(b,1),(c,3)} from {a,b,c} to {1,2,3}. Pass: correct diagram with a→1, a→2, b→1, c→3 and no spurious arrows.

**Gate 3 (IMAGE vs CODOMAIN)**: Given R = {(1,2),(2,2)} from A={1,2,3} to B={1,2,3,4}, state the image of R and explain how it differs from the codomain. Pass: image = {2}; codomain = {1,2,3,4}; student explains that 1,3,4 are in the codomain but unreached.

**Gate 4 (FUNCTION DISTINCTION)**: Which of these is a function and which is only a relation? (i) {(1,a),(2,a),(3,b)}; (ii) {(1,a),(1,b),(2,c)}. Pass: (i) is a function (each left element has exactly one right partner); (ii) is a relation but not a function (1 maps to both a and b).

---

## 12. Concept-Specific Recovery Notes

**If Gate 1 fails**: MC-1 is active. Run Error Analysis: show the pair listing and ask "Which rule is violated?" — student names a function rule. Confirm that no function rule applies here because the definition of relation has no such rule.

**If Gate 3 fails**: MC-2 is active. Run the Demonstration 3 codomain/image contrast. Emphasise: codomain is declared before the relation is defined; image is computed after.

**If Gate 4 fails**: Prerequisite gap in distinguishing function from relation. Re-expose the function definition and explicitly place function as a special case of relation.

---

## 13. Memory Typing

**Memory type**: Declarative + representational (multiple equivalent representations must all be mastered).

**Forgetting profile**: The pair-listing definition is robust. The image/codomain distinction is fragile — it collapses to "image = codomain" within weeks without reinforcement. The multi-representation equivalence (pairs ↔ arrows ↔ matrix) requires periodic cross-translation practice to remain accessible.

**Spaced retrieval targets**:
- Session +1: Convert a pair listing to an arrow diagram and a relation matrix.
- Session +7: Identify image vs codomain for a new relation.
- Session +21: Use the relation concept in the definition of a function: "A function is a relation such that…"

---

## 14. Transfer Map

**Near transfer**:
- Function (relation + uniqueness + totality constraints)
- Equivalence relation (relation + reflexivity + symmetry + transitivity)
- Partial order (relation + reflexivity + antisymmetry + transitivity)

**Far transfer**:
- Database join operations (Cartesian product with subset selection)
- Graph theory (directed graph = binary relation on a vertex set)
- Social network analysis (edges as relation pairs)

---

## 15. Curriculum Feedback

No structural KG issues found. The three misconceptions are well-supported by the Blueprint. Estimated hours (6) reflects the need to master both the concept and four representations, plus the function-distinction refinement.

---

## 16. Blueprint References (runtime)

Blueprint: `docs/curriculum/blueprints/math.found.relation.md`

---

## 17. Runtime Asset References

- Explanation Memory: Section 5 core explanation (multiple representations) and MC-1 repair explanation are suitable seeds
- Probe assets: Gate 4 (function-distinction) is a strong misconception-probe seed
- Visual asset: arrow diagram with no-constraint arrows (one-to-many and zero allowed) — ADR 12

---

## 18. Authoring Notes

MC-1 (relation=function) is the highest-frequency misconception at this node and warrants the first teaching action slot. The image/codomain vocabulary triple was chosen over the domain/range usage because the domain/codomain/image triple is more precise and avoids the "range = codomain or image?" ambiguity documented in MC-2. Birth-type classifications applied using `educational-brain/misconceptions/01-birth-types.md`.

---

## 19. Open Questions

None.

---

## 20. Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-23 | Human Curator (Domain Certification Mode, Wave 6) | Initial entry |

---

## 21. Certification Status

- [ ] Layer 1 (Blueprint): ✅ EXISTS — `docs/curriculum/blueprints/math.found.relation.md`
- [ ] Layer 2 (Educational Brain): ✅ THIS ENTRY
- [ ] Layer 3/7 (Explanation/Probe DB assets): N/A — runtime/pipeline-owned
- [ ] Layer 5 (Lesson Assets): N/A — runtime-generated
- [ ] Layer 6 (Visualizations): N/A — ADR 12 pipeline-owned
- [ ] Layer 8 (Practice): N/A — runtime-generated
- [ ] Layer 9 (Adaptive Tutoring): N/A — `decide()` consumes this entry
- [ ] Layer 10 (Certification): Layers 1–2 complete ✅
