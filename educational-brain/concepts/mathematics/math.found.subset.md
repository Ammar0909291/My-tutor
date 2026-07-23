# math.found.subset
**Educational Brain Entry** | Mathematics — Foundations
**KG node**: `math.found.subset` | difficulty: foundational | bloom: understand | estimated_hours: 2
**Standard**: EDUCATIONAL_BRAIN_STANDARD.md v1.0 | Entry version: 1.0 | Date: 2026-07-23

---

## 1. Concept Identity

**One-line definition**: Set A is a subset of set B (written A⊆B) when every element of A is also an element of B.

**Why this concept exists in the KG**: Subset is the primary ordering relation on sets — it underpins containment arguments in virtually every branch of mathematics. Without it, students cannot reason about set inclusion, write containment proofs, or understand set equality as mutual inclusion.

**Canonical KG node data**:
- requires: `math.found.set-membership`
- unlocks: (set operations, set equality, power set, and containment-based proofs)
- bloom: understand
- mastery_threshold: 0.75
- estimated_hours: 2

---

## 2. Blueprint References

Blueprint file: `docs/curriculum/blueprints/math.found.subset.md`

Key teaching objectives extracted (do not duplicate prose):
- LO1: Distinguish ∈ (element-of) from ⊆ (subset-of) with correct notation
- LO2: Verify subset relationships by checking every element of the candidate set
- LO3: Apply special cases: A⊆A (reflexivity), ∅⊆B (empty set is subset of everything), A⊆B and B⊆A iff A=B

Blueprint misconception registry (cited by ID, birth-type added):
- MC-1 ELEMENT-SUBSET-CONFUSION: writing x⊆A or A∈B when the correct relation is x∈A or A⊆B — Type 3 (notation-induced: the two symbols look similar and are taught in the same lesson)
- MC-2 EMPTY-SET-NOT-SUBSET: believing ∅ is not a subset of any set because it has no elements to check — Type 2 (perceptual intuition: "nothing can't be inside something")
- MC-3 PROPER-SUBSET-CONFUSION: treating ⊂ and ⊆ interchangeably or believing A⊆A is false — Type 5 (instruction-induced by texts that use ⊂ for proper subset without making the non-strict default explicit)

---

## 3. Mental Models

**Primary model — The Team Roster Check**: To decide if team A's roster is a subset of team B's roster, go through every name on A's list and check: is this person also on B's list? If every single name passes, A's roster ⊆ B's roster. One name missing from B's list breaks the subset claim.

**Secondary model — The Venn Diagram Containment**: A⊆B is the picture where the A circle sits entirely inside the B circle — no part of A sticks out. The empty set ∅ is a set with no circle at all: a circle with zero radius sits inside every other circle by default.

**Anti-model**: "A is a subset of B if A and B share some elements" — that is intersection, not subset. A⊆B requires ALL of A's elements to be in B, not just some.

---

## 4. Misconception Library

### MC-1: Element–Subset Symbol Confusion (Type 3 — notation-induced)
**Verbatim probe phrases**: "3⊆{1,2,3}" / "Is {a}∈{a,b,c}?" (using ∈ where ⊆ is meant) / "∅∈A for any A."
**Mechanism**: ∈ and ⊆ are introduced together, look superficially similar, and test the same containment intuition — notation contamination causes substitution.
**Diagnostic signature**: Mixes relations in written expressions; may compute correct answers while writing wrong symbol.
**Repair**: Force explicit type-checking: "Is the left side an element (a single object) or a set (a collection)?" Drill with typed categorisation before returning to mixed notation.
**Burned-collision note**: If the student correctly categorises types verbally but still writes wrong symbols, check whether they are confusing the test with actual practice. Use delayed practice (not same-session) after the category drill.

### MC-2: Empty-Set Non-Subset Intuition (Type 2 — perceptual intuition)
**Verbatim probe phrases**: "∅ can't be a subset — it has nothing in it." / "There's no element to check so it doesn't qualify."
**Mechanism**: Student applies a membership-checking heuristic ("I need to find at least one element that passes") rather than the correct universal quantifier logic ("there must be NO element that fails").
**Diagnostic signature**: Rejects ∅⊆B for specific B; often accepts ∅∈B (a different, usually false claim) instead.
**Repair**: Restate the definition as its logical contrapositive: "A⊆B is FALSE only if we can find an element in A that is NOT in B. For ∅ we cannot find any such element — so the condition for falsity cannot be met. ∅⊆B is vacuously true."
**Collision design**: Ask "Can you give me one element in ∅ that is NOT in B?" — student realizes they cannot, and the vacuous truth becomes self-evident rather than imposed.

### MC-3: Proper-Subset/Subset Conflation (Type 5 — instruction-induced)
**Verbatim probe phrases**: "A⊆A is false because a set can't be a subset of itself." / "⊆ means strictly smaller."
**Mechanism**: Some textbooks use ⊂ exclusively (for ⊆), while others use ⊂ for proper subset (A⊊B). Students who have seen only the strict-subset usage import that meaning into ⊆.
**Repair**: Make the ≤ analogy explicit: just as 5≤5 is true, A⊆A is true — ⊆ includes the "equals" case. If the student's prior text used ⊂ differently, name the convention conflict directly; do not pretend it does not exist.

---

## 5. Explanation Library

### Core explanation (concrete — preferred entry point)
A is a subset of B means: pick any element from A, and it will always be in B too. Check every element of A — if they all pass, write A⊆B.

Example: A = {2, 4} and B = {1, 2, 3, 4, 5}.
Check: 2 ∈ B? Yes. 4 ∈ B? Yes. Every element of A is in B, so A⊆B. ✓

Non-example: A = {2, 6} and B = {1, 2, 3, 4, 5}.
Check: 2 ∈ B? Yes. 6 ∈ B? No. One failure is enough — A⊄B.

Special cases worth knowing:
- A⊆A always: every element of A is certainly in A.
- ∅⊆B always: there is no element in ∅ to fail the check.
- A⊆B and B⊆A together mean A=B (this is how set equality is formally defined).

### Misconception-repair explanation (for MC-2)
The subset check is a "can you find a failure?" test, not a "can you find a success?" test. ∅ has nothing to offer as a failure witness — so ∅⊆B passes for every B. Vacuous truth is unintuitive but correct: the absence of counterexamples is itself confirmation.

---

## 6. Analogy Library

**Analogy**: Every chocolate in the "dark chocolate" tin must also be in the "all chocolates" tin. If the dark-chocolate tin is empty (∅), it automatically satisfies the condition — you cannot find a dark chocolate that fails to be in the all-chocolates tin, because you cannot find a dark chocolate at all.

**Anti-analogy to retire**: "A⊆B means A and B overlap." Overlap (intersection) requires shared elements but does not require all of A to be inside B. Reserve the word "overlap" for intersection, not subset.

---

## 7. Demonstration Library

**Concrete demonstration — Manual roster check**:
Given A = {cat, dog} and B = {cat, dog, fish, bird}, walk through element by element with the student naming each element and checking membership. Student records: cat→✓, dog→✓. Conclusion: A⊆B.

**Concrete demonstration — Find the counterexample**:
Given A = {1, 2, 7} and B = {1, 2, 3, 4, 5}: "Can you find one element of A that is NOT in B?" Student finds 7. Done — A⊄B. This trains the efficient falsification strategy (find one failure rather than checking every element).

**Concrete demonstration — Vacuous truth**:
"Here is an empty bag (∅). Check whether any item in the bag violates the rule 'everything in A must be in B'. Can you find an item that violates it?" Student picks up the bag, finds nothing. "So the rule was never violated. ∅⊆B."

---

## 8. Discovery vs. Direct Instruction

**Recommendation**: Brief discovery for the membership-checking procedure; direct instruction with explicit examples for the two special cases (A⊆A, ∅⊆B), since both are counterintuitive and argument-resistant without named explanation.

**Discovery sketch**: Pose "Is {2,4}⊆{1,2,3,4,5}?" and ask student to invent a checking procedure. Student typically devises element-by-element verification independently — confirm and name it as the formal definition. Then introduce ∅⊆B as a puzzle: "Now try ∅⊆B. Walk me through your checking procedure." When the procedure produces no steps, guide the interpretation.

---

## 9. Teaching Action Dispatch

| Student state | Recommended action | Source |
|---|---|---|
| MC-1 active (symbol confusion) | MATCHING: sort expressions into "element relation" vs "set relation" piles | Teaching Actions: ORGANIZE §3 |
| MC-2 active (∅ not subset) | THOUGHT EXPERIMENT: "Find a counterexample element in ∅" collision | Teaching Actions: TEST-THINKING §4 |
| MC-3 active (proper subset) | DIRECT INSTRUCTION: state the ⊆ vs ⊂ convention explicitly; use the ≤ analogy | Teaching Actions: TELL §1 |
| Correct but slow (FRAGILE) | DRILL: 10 rapid membership checks on varied sets | Teaching Actions: DO §3 |
| Ready for transfer | WORKED EXAMPLE: prove A=B by proving A⊆B and B⊆A | Teaching Actions: SHOW §1 |

---

## 10. Voice Teaching

**Register**: Warm and concrete. Subset is a student's first encounter with containment proof — keep the language procedural ("go through every element") rather than abstract ("for all x").

**Wait-time rule**: After presenting A and B, pause before checking any element — ask the student to begin the check themselves. Intervene only if the student checks in the wrong direction (checking elements of B against A, not elements of A against B).

**Load-bearing sentences**:
- "Subset is about A's elements, not B's — we start from A and ask: does B have this?"
- "One missing element is enough to break a subset claim."
- "For the empty set: name one element that fails. You can't — so it passes."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

---

## 11. Assessment Gate Set

**Gate 1 (RECOGNITION)**: Given A = {a, e} and B = {a, b, c, d, e, f}, state whether A⊆B and explain in one sentence. Pass: correct verdict with "every element of A is in B."

**Gate 2 (INDEPENDENT)**: Given A = {1, 3, 5} and C = {1, 2, 3, 4}, determine whether A⊆C, C⊆A, or neither. Pass: A⊄C (5∉C identified), C⊄A (2,4∉A identified).

**Gate 3 (SPECIAL CASES)**: State without a truth table: Is ∅⊆{1,2,3}? Is {1,2,3}⊆{1,2,3}? Justify each. Pass: both true with correct justifications (vacuous truth; reflexivity).

**Gate 4 (MISCONCEPTION probe)**: "A student wrote 3⊆{1,2,3}. What error did they make?" Pass: identifies that 3 is an element, not a set — the correct relation is 3∈{1,2,3}.

---

## 12. Concept-Specific Recovery Notes

**If Gate 2 fails**: Student is applying the check in the wrong direction (checking B⊆A instead of A⊆B). Restate: "We start from A and ask about B. A⊆B is a claim about A's elements."

**If Gate 3 fails (∅ case)**: MC-2 is active. Deploy the vacuous-truth collision: "Give me one element in ∅ that is not in the set." After the student cannot, explain that no counterexample = the claim stands.

**If Gate 4 fails**: MC-1 is active. Return to typed-categorisation drill before re-attempting notation practice.

---

## 13. Memory Typing

**Memory type**: Declarative definition + procedural check.

**Forgetting profile**: The checking procedure is durable after three or four successful applications. The special cases (∅⊆B, A⊆A) are fragile — they may be re-doubted at transfer even after being correctly assessed. Treat them as retrieval targets for later sessions.

**Spaced retrieval targets**:
- Session +1: Reproduce the definition from memory; apply to two examples.
- Session +7: Use A⊆B and B⊆A together to prove A=B for a concrete pair.
- Session +21: Transfer to set-equality proofs in a slightly different domain.

---

## 14. Transfer Map

**Near transfer**:
- Set equality (A=B iff A⊆B and B⊆A) — natural next step in this domain
- Power set (every element of the power set is a subset of A)

**Far transfer**:
- Implication as subset (in logic, P→Q corresponds to the set of P-worlds being a subset of Q-worlds)
- Divisibility as subset of factor sets in number theory
- Subgroup conditions in algebra (analogous containment + closure)

---

## 15. Curriculum Feedback

No structural KG issues found. Blueprint MC registry covers the three highest-frequency misconceptions accurately. Estimated hours (2) is appropriate for a student arriving with solid set-membership foundation.

---

## 16. Blueprint References (runtime)

Blueprint: `docs/curriculum/blueprints/math.found.subset.md`

---

## 17. Runtime Asset References

- Explanation Memory: Section 5 core + repair explanations are suitable seeds
- Probe assets: Gate 2 and Gate 4 are suitable MCQ/misconception-probe seeds
- Visual asset: Venn diagram showing circle-inside-circle containment, with empty-set case illustrated as a single point inside the outer circle — ADR 12 pipeline

---

## 18. Authoring Notes

MC birth-type classifications applied using `educational-brain/misconceptions/01-birth-types.md` diagnostic procedure. MC-1 (notation-induced) and MC-2 (perceptual intuition) are the highest-frequency repair targets — confirmed by Blueprint registry ordering.

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

- [ ] Layer 1 (Blueprint): ✅ EXISTS — `docs/curriculum/blueprints/math.found.subset.md`
- [ ] Layer 2 (Educational Brain): ✅ THIS ENTRY
- [ ] Layer 3/7 (Explanation/Probe DB assets): N/A — runtime/pipeline-owned
- [ ] Layer 5 (Lesson Assets): N/A — runtime-generated
- [ ] Layer 6 (Visualizations): N/A — ADR 12 pipeline-owned
- [ ] Layer 8 (Practice): N/A — runtime-generated
- [ ] Layer 9 (Adaptive Tutoring): N/A — `decide()` consumes this entry
- [ ] Layer 10 (Certification): Layers 1–2 complete ✅
