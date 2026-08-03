# Teaching Blueprint: Theorem (`math.found.theorem`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.found.theorem` |
| name | Theorem |
| domain | Foundations |
| difficulty | developing |
| bloom | understand |
| mastery_threshold | 0.80 → MAMR = ⌈0.80×5⌉ = 4/5 |
| estimated_hours | 3 |
| requires | `math.found.axiom`, `math.found.proof` |
| unlocks | `math.found.lemma`, `math.found.corollary` |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | A mathematical statement that has been rigorously proved to be true from axioms and previously established theorems. |
| related | `math.found.axiom`, `math.found.conjecture`, `math.found.lemma` |
| aliases | proposition, lemma, corollary |

## Component 1 — Learning Objectives

- LO1: Define "theorem" as a statement rigorously proved from axioms and/or previously established theorems, and distinguish it from an axiom (accepted without proof) and a conjecture (believed but not yet proved).
- LO2: Trace a given theorem's justification chain back through the specific axioms and prior theorems it ultimately rests on.
- LO3: Recognize that a theorem's TRUTH status is permanent once correctly proved — unlike a conjecture, a genuinely proved theorem cannot later be "disproved" (only a FLAWED proof can be retracted, in which case the statement reverts to conjecture status).

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.axiom` (statements accepted without proof) and `math.found.proof` (the rigor standard a theorem must meet) — a theorem is precisely a statement that has cleared that standard, resting ultimately on axioms.

## Component 3 — Core Explanation

A **theorem** is a mathematical statement that has been rigorously PROVED true, using logical deduction, from axioms and/or previously established theorems. This places it in a hierarchy: axioms are the foundation (accepted without proof); theorems are everything derived from them via valid proof; a **conjecture** is a statement believed likely true (often on strong evidence) but not yet proved, and is NOT yet a theorem no matter how much evidence supports it.

Once a statement is correctly proved a theorem, that status is permanent — mathematics does not have "theorems that later turn out false" in the way empirical science can have superseded laws; what CAN happen is a proof is later found to be FLAWED, in which case the statement's status reverts to conjecture (or is disproved) until a valid proof is found or the claim is refuted.

## Component 4 — Worked Examples

**Example 1 (LO1, LO2 — tracing the justification chain)**: The theorem "the sum of the interior angles of a triangle is $180°$" rests, in Euclidean geometry, on the parallel postulate (an axiom) together with previously established results about alternate interior angles formed by a transversal. Tracing back: theorem ← alternate-interior-angle theorem ← parallel postulate (axiom). Every step in this chain is either an axiom or itself a previously proved theorem — no step is "just accepted because it seems true."

**Example 2 (LO1, LO3 — theorem vs. conjecture, breaking MC-1)**: Goldbach's Conjecture ("every even integer greater than 2 is the sum of two primes") has been verified computationally for enormous ranges of numbers and is overwhelmingly believed true, yet it remains a CONJECTURE, not a theorem, because no general proof exists. Contrast: Fermat's Last Theorem was a conjecture for over 350 years (extensively evidence-supported) until Andrew Wiles's 1994 proof — at that exact moment, and only then, it became a theorem. Evidence and belief, however strong, never substitute for proof.

**Example 3 (LO3 — a retracted-proof scenario)**: If a published "theorem" is later found to rest on a step with no valid justification (a genuine proof error, not merely a stylistic gap), the STATEMENT itself does not thereby become false — it simply loses theorem status until a valid proof (possibly a different one) is found. The statement's truth value and its PROVEN status are two separate things; a true statement can temporarily lack a known valid proof.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Hierarchy: Axiom → Theorem, and Tracing the Chain (Primitive P11: Representation Shift)

Present the three-tier hierarchy (axiom → theorem, with conjecture as a separate not-yet-proved category) as a simple diagram, then work Example 1's tracing exercise, having the student name each link in the chain explicitly.

- **MC-1 hook**: present Example 2's Goldbach's Conjecture case and ask whether it should be called a "theorem" given the overwhelming computational evidence (revealing MC-1: treating strong evidence or wide belief as equivalent to proof).

### Teaching Action A02 — Evidence Is Not Proof (Primitive P06: Contrast Pair)

Contrast Goldbach's Conjecture (massive evidence, still not a theorem) against Fermat's Last Theorem's status change at the exact moment of Wiles's proof (previously also massively evidence-supported, yet still a conjecture until then) to isolate the single deciding factor: the existence of a valid proof, not the quantity or strength of evidence. State the rule: "in mathematics, evidence motivates conjectures and guides research, but only a valid proof converts a conjecture into a theorem."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.80×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Given a short statement and its proof outline, identify which lines are justified by axioms and which by previously established theorems.
  2. Explain, in one paragraph, why "the Collatz Conjecture has been verified for all starting values up to $2^{68}$" does NOT make it a theorem.
  3. Describe what happens to a statement's status if a published proof of it is later found to contain an unjustified step — does the statement become false, unproved, or unchanged?
  4. State whether every true mathematical statement must eventually be provable as a theorem, or whether this is itself an open question (connect to Gödel's incompleteness at a conceptual, non-technical level if the student has prior exposure — otherwise, accept "not all true statements are known to be provable" as sufficient).
- **P76 (Transfer Probe, mode = independence)**: "A student announces, 'I've checked this formula for the first 10,000 positive integers and it always works, so it's now a theorem.' (a) Explain precisely what is wrong with this claim, using the theorem/conjecture distinction from this lesson. (b) Describe what ADDITIONAL kind of argument (not just more numerical checking) would actually be needed to promote the claim to theorem status, referencing the axiom-and-prior-theorem chain from Example 1."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | EVIDENCE-MISTAKEN-FOR-PROOF | Believing strong numerical evidence, wide belief, or an unproven-but-plausible pattern is sufficient to call a statement a theorem | Foundational |
| MC-2 | THEOREM-ASSUMED-DISPROVABLE-BY-LATER-EVIDENCE | Believing a genuinely proved theorem could later be shown false by new evidence, analogous to empirical scientific laws | Moderate |
| MC-3 | THEOREM-CHAIN-TRACED-ONLY-ONE-STEP | Stopping the justification-chain trace at the first cited prior result, without recognizing that result itself traces further back to axioms | Minor |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Evidence Mistaken for Proof") → P41 (detect: present the Collatz-style scenario and ask if the pattern is now a theorem) → P64 (conceptual shift: re-walk Example 2's Goldbach/Fermat contrast, isolating the proof-existence as the sole deciding factor).
- **B02 (targets MC-2)**: P27 ("Theorem Assumed Disprovable by Later Evidence") → P41 (detect: ask whether a correctly-proved theorem could later "turn out false") → P64 (conceptual shift: distinguish "a flawed proof is retracted" from "a true theorem becomes false," using Example 3's retracted-proof scenario).
- **B03 (targets MC-3)**: P27 ("Justification Chain Traced Only One Step") → P41 (detect: ask the student to trace Example 1's theorem back to its ROOT axiom, not just the immediately-cited prior theorem) → P64 (re-walk the full chain: theorem ← alternate-interior-angle theorem ← parallel postulate, confirming the chain terminates at an axiom).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.axiom`, `math.found.proof`.
- **Unlocks**: `math.found.lemma` (a theorem used as a stepping-stone within a larger proof), `math.found.corollary` (a near-immediate consequence of a theorem).
- **Related**: `math.found.conjecture` (the not-yet-proved counterpart this concept is directly contrasted against).

## Component 8 — Teaching Notes

- estimated_hours = 3 and bloom = understand reflect that this concept is primarily conceptual/classificatory (recognizing what qualifies as a theorem and tracing its justification) rather than requiring the student to construct new proofs — that skill is exercised throughout the surrounding proof-technique concepts.
- MC-1 was ranked most severe because it represents a genuine misunderstanding of mathematics's epistemic standard — conflating inductive/empirical confidence with deductive certainty undermines the entire point of proof-based mathematics.
- Fermat's Last Theorem was deliberately chosen for Example 2/Teaching Action A02 because its 350-year conjecture-to-theorem transition is well-documented and vivid, making the "evidence accumulated for centuries, yet only the proof changed its status" point maximally concrete rather than abstract.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.found.axiom`, `math.found.proof`) |
| V-4 | unlocks concepts named accurately from KG | PASS (`math.found.lemma`, `math.found.corollary`) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.80×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO1/LO3, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
