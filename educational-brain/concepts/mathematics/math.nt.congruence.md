# math.nt.congruence

## Identity
- **KG ID**: `math.nt.congruence`
- **Domain**: math.nt (Number Theory)
- **Requires**: `math.nt.modular-arithmetic`, `math.found.equivalence-relation`
- **Unlocks**: `math.nt.residue-classes`
- **Cross-links**: none (KG lists none; Blueprint confirms).
- **Difficulty**: proficient
- **Bloom level**: understand
- **Mastery threshold**: 0.8 (⌈0.8×5⌉ = 4/5)
- **Estimated hours**: 6
- **Blueprint**: `docs/curriculum/blueprints/math.nt.congruence.md` (reused by reference throughout this entry).

## Learning Objective
The student will define a≡b (mod n) as n|(a−b) and correctly distinguish congruence from literal equality, prove congruence is an equivalence relation by directly reusing the already-mastered reflexive/symmetric/transitive checking procedure, and apply the resulting partition of the integers into exactly n residue classes as a direct instance of the Partition Theorem.

## Core Understanding
Per the Blueprint's Component 3: congruence is divisibility of the difference, a genuinely weaker condition than equality — a≡b (mod n) means n|(a−b), holding for many distinct integer pairs, not just when a=b literally. Verifying congruence is an equivalence relation reuses the already-mastered three-step procedure directly, with no new technique: reflexive (n|(a−a)=n|0, always true), symmetric (n|(a−b) implies n|(b−a), since b−a=−(a−b)), transitive (n|(a−b) and n|(b−c) implies n|(a−c), since a−c=(a−b)+(b−c), a sum of two multiples of n). Applying the equivalence-relation framework's own Partition Theorem directly: Z partitions into EXACTLY n residue classes — one per possible remainder 0,1,...,n−1 — each infinite, with every integer belonging to exactly one.

## Mental Models
1. **The weaker-than-equality model** (Blueprint TA-A01): congruence relates genuinely distinct integers whenever their difference is a multiple of n — it's a family relation, not an identity relation.
2. **The reused-checklist model** (Blueprint TA-A02): proving congruence is an equivalence relation is the exact same reflexive/symmetric/transitive checklist already mastered, applied to one specific relation — not new proof machinery.
3. **The fixed-count-partition model** (Blueprint TA-A03): the number of residue classes is locked to exactly n by the modulus itself, directly following from the Partition Theorem, never more or fewer.

## Why Students Fail
Per the Blueprint's Misconception Registry: the foundational failure is believing a≡b (mod n) means a and b are literally the same integer, missing that congruence is a weaker relation holding for many distinct integer pairs. A second failure is believing proving congruence is an equivalence relation requires new proof techniques, missing that it directly reuses the already-established reflexive/symmetric/transitive checking procedure. A third failure is believing the number of residue classes modulo a fixed n could vary or differ from n itself, missing that the Partition Theorem fixes the count at exactly n.

## Misconceptions
Reused by reference from the Blueprint's Component 6 Misconception Registry, with birth-type classification added:

- **MC-1 — CONGRUENCE-CONFLATED-WITH-EQUALITY** (FOUNDATIONAL)
  - **Blueprint description**: believing a≡b (mod n) means a and b are literally the same integer, missing that congruence is a weaker relation holding for many distinct integer pairs.
  - **Birth type**: Type 3, language contamination — the symbol ≡ visually resembles = and is read aloud with similar cadence ("a is congruent to b"), inviting the same-meaning assumption ordinary equality carries.
  - **Repair approach**: Blueprint Repair Action B01 — re-walking Example 1's 7≡2 (mod 5) (true, distinct integers) alongside 7≡3 (mod 5) (false), re-anchoring on "congruence is divisibility of the difference, not equality."

- **MC-2 — CONGRUENCE-EQUIVALENCE-PROOF-ASSUMED-TO-NEED-NEW-MACHINERY** (Moderate)
  - **Blueprint description**: believing proving congruence is an equivalence relation requires new proof techniques, missing that it directly reuses the already-established reflexive/symmetric/transitive checking procedure.
  - **Birth type**: Type 1, overgeneralization — each new named relation students encounter has often required a genuinely new proof strategy in prior contexts, so the pattern "new relation means new proof" is over-applied here where it doesn't hold.
  - **Repair approach**: Blueprint Repair Action B02 — re-walking Example 2's direct reflexive/symmetric/transitive verifications, re-anchoring on "this is the same checklist already mastered, applied to one specific relation."

- **MC-3 — RESIDUE-CLASS-COUNT-ASSUMED-VARIABLE** (FOUNDATIONAL)
  - **Blueprint description**: believing the number of residue classes modulo a fixed n could vary or differ from n itself, missing that the Partition Theorem fixes the count at exactly n.
  - **Birth type**: Type 2, perceptual intuition — with infinitely many integers to sort, it can feel intuitively surprising that they collapse into only finitely many (exactly n) classes, inviting doubt about whether the count is really fixed.
  - **Repair approach**: Blueprint Repair Action B03 — re-walking Example 3's complete 4-class enumeration for n=4, re-anchoring on "the Partition Theorem fixes the count at exactly n, always."

## Analogies
- **The direct-reuse framing** (Blueprint TA-A02): "proving congruence is an equivalence relation isn't a new kind of proof — it's the exact same reflexive/symmetric/transitive checklist you already mastered, applied to this specific relation."

## Demonstrations
- The contrasting divisibility checks 7≡2 (mod 5) [true] versus 7≡3 (mod 5) [false] (Blueprint Example 1), targeting MC-1.
- The full reflexive/symmetric/transitive verification for ≡ (mod n) using direct algebraic argument (Blueprint Example 2), targeting MC-2.
- The complete enumeration of all 4 residue classes modulo 4, showing every integer belongs to exactly one (Blueprint Example 3), targeting MC-3.

## Discovery Questions
1. "Does a≡b (mod n) mean a and b are literally the same number — or something weaker?"
2. "Do you need a brand-new proof technique to show congruence is an equivalence relation, or have you already learned the technique that applies here?"
3. "Could the number of residue classes modulo a fixed n be more than n, or fewer?"

## Teaching Sequence
Follows the Blueprint's Component 5 exactly: TA-A01 (congruence relates distinct integers, selectively — Example 1, MC-1 hook) → TA-A02 (the equivalence-relation proof reuses the established procedure — Example 2, MC-2 hook) → TA-A03 (exactly n residue classes, no more no fewer — Example 3, MC-3 hook) → TA-A04 (Mastery Gate, P91).

## Tutor Actions
- **TELL: Explanation** — congruence as divisibility of the difference, a weaker relation than equality (Blueprint TA-A01).
- **TEST-THINKING: Error Analysis** — the contrast 7≡2 (mod 5) versus 7≡3 (mod 5) (Blueprint Example 1), targeting MC-1.
- **DO: Worked Example** — the direct reflexive/symmetric/transitive verification (Blueprint Example 2), targeting MC-2.
- **ORGANIZE: Concept Map** — the complete 4-class partition of the integers modulo 4 (Blueprint Example 3), targeting MC-3.

## Voice Teaching Notes
When a student states "a≡b (mod n)," ask "does that mean a and b are the same number?" as a standing verbal check — a fast, low-cost probe directly targeting MC-1 before it becomes a silent background assumption.

## Assessment Signals
- **P76 (transfer probe, independence mode per the Blueprint's Component 7 — cross_links=[])**: reused verbatim from the Blueprint's Component 5 A04 — the cryptographic key-grouping scenario testing same-residue-class membership, equivalence-relation reuse, and the exact residue-class count.
- **P77 (mastery gate)**: the Blueprint's 4-item problem set (Component 5 A04), MAMR 4/5.

## Tutor Recovery Strategy
If MC-1 persists, require the student to find, for a fixed small modulus, at least three distinct pairs of unequal integers that are all congruent to each other, before accepting any claim about what congruence "means" — repeat until the equality/congruence distinction is automatic.

## Memory Hooks
- "Congruent means the difference is a multiple of n — not that the numbers are the same."
- "Same checklist, new relation: reflexive, symmetric, transitive — nothing new to invent."
- "Exactly n residue classes, always — the Partition Theorem fixes the count."

## Transfer Connections
- `math.nt.residue-classes` (unlocks) deepens the study of the residue classes this concept establishes via the Partition Theorem.
- `math.found.equivalence-relation` (requires) supplies the general reflexive/symmetric/transitive framework and Partition Theorem this concept applies directly.

## Cross-Subject Connections
- Computer science / cryptography: grouping keys or data by residue class underlies hash-table bucketing and modular cryptographic protocols.

## Blueprint References
`docs/curriculum/blueprints/math.nt.congruence.md` — all worked examples, teaching actions, and the P76/P77 assessment items reused by reference, not restated in full.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None — the Blueprint's own cross-link finding (cross_links=[]) was independently re-verified at authoring time and remains accurate.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.nt Wave 5 part 1.
