# Teaching Blueprint: Predicate Logic in Discrete Mathematics (`math.disc.predicate-logic-disc`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.disc.predicate-logic-disc` |
| name | Predicate Logic in Discrete Mathematics |
| domain | Discrete Mathematics |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.found.predicate-logic`, `math.disc.propositional-logic` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | First-order logic with quantifiers ∀ and ∃. Proof techniques: direct, contrapositive, contradiction, induction, counterexample. Proof by induction especially critical in discrete settings.

 |

## Component 1 — Learning Objectives

- LO1: Select an appropriate proof technique (direct, contrapositive, contradiction, induction, or counterexample) for a given discrete-mathematics claim, justifying the choice based on the claim's structure.
- LO2: Apply proof by induction to a claim about a discrete structure indexed by a natural number (e.g. a formula for a sum, a property of a sequence, a graph-theoretic claim for all $n$).
- LO3: Disprove a FALSE universally-quantified claim by producing a single counterexample, and recognize this is the ONLY valid way to disprove such a claim (no amount of confirming cases suffices).

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.predicate-logic` (quantifiers $\forall,\exists$ and their formal meaning) and `math.disc.propositional-logic` (the connectives this concept's proof techniques combine with quantified statements).

## Component 3 — Core Explanation

This concept applies **first-order (predicate) logic** — statements built from predicates and the quantifiers $\forall$ (for all) and $\exists$ (there exists) — to the standard PROOF TECHNIQUES of discrete mathematics: **direct proof** (assume the hypothesis, derive the conclusion), **proof by contrapositive**, **proof by contradiction**, **proof by counterexample** (for disproving universal claims), and especially **proof by induction** — critically important in discrete settings because so many discrete structures (sequences, graphs, recursively-defined sets) are naturally indexed by the natural numbers.

Selecting the RIGHT technique for a given claim is a genuine skill: a claim of the form "$\forall n, P(n)$" where $P(n+1)$ can be derived from $P(n)$ is a natural induction candidate; a claim believed FALSE is best attacked by searching for a counterexample rather than attempting a doomed direct proof.

## Component 4 — Worked Examples

**Example 1 (LO1, LO2 — recognizing an induction candidate)**: Prove "$\forall n\ge1$, the sum $1+2+\cdots+n=\frac{n(n+1)}{2}$." This is a natural induction candidate because the claim is indexed by $n$ and the $n+1$ case builds directly on the $n$ case (add $(n+1)$ to both sides). Base case $n=1$: $1=\frac{1\cdot2}{2}=1$ ✓. Inductive step: assume true for $n$, then for $n+1$: $1+\cdots+n+(n+1)=\frac{n(n+1)}{2}+(n+1)=\frac{n(n+1)+2(n+1)}{2}=\frac{(n+1)(n+2)}{2}$, matching the formula at $n+1$. $\blacksquare$

**Example 2 (LO3 — disproving a universal claim, breaking MC-1)**: A claim states "$\forall n\ge1$, $n^2-n+41$ is prime." Testing small values: $n=1$ gives $41$ (prime), $n=2$ gives $43$ (prime), ..., in fact this holds for $n=1$ through $40$! But at $n=41$: $41^2-41+41=41^2$, which is clearly NOT prime (it's $41\times41$). This single counterexample at $n=41$ fully disproves the universal claim, DESPITE 40 consecutive confirming cases — a common error treats a long run of confirming examples as strong evidence the claim is likely true (or even as a substitute for proof), when in fact the claim was false all along and just happened to hold for many small cases before failing.

**Example 3 (LO1 — selecting contradiction over direct proof)**: Prove "there is no smallest positive rational number." A DIRECT proof struggles (there's no natural starting hypothesis to manipulate forward). Instead, PROOF BY CONTRADICTION fits naturally: assume such a smallest positive rational $q$ exists; then $q/2$ is also a positive rational and $q/2<q$, contradicting $q$'s assumed minimality. The claim's NEGATIVE/non-existence structure ("there is no...") is a strong structural cue favoring contradiction over a direct approach.

## Component 5 — Teaching Actions

### Teaching Action A01 — Recognizing When Induction Is the Natural Fit (Primitive P64: Conceptual Shift)

Work Example 1 in full, explicitly naming the structural cue that suggested induction ("indexed by $n$, and the $n+1$ case builds on the $n$ case") before executing the base case and inductive step.

### Teaching Action A02 — One Counterexample Disproves, No Matter How Many Cases Confirmed First (Primitive P06: Contrast Pair)

Work Example 2's dramatic 40-consecutive-primes-then-failure case, showing the sheer number of confirming cases provides ZERO protection against a single counterexample. State the rule: "a universal claim is disproven by exactly one counterexample, however long it takes to find — no number of confirming cases beforehand changes this."

- **MC-1 hook**: this directly targets MC-1 (treating many confirming cases as evidence approaching proof) by presenting the 40-case run before revealing the failure at $n=41$.

### Teaching Action A03 — Structural Cues for Technique Selection (Primitive P64: Conceptual Shift, second instance)

Work Example 3, explicitly naming the "there is no..." / non-existence phrasing as the cue that motivated choosing contradiction over a direct approach, building a small mental checklist of structural cues (indexed-by-$n$ → induction; non-existence claim → contradiction; believed false → counterexample search) for LO1's selection skill.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.85×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Prove by induction: $\forall n\ge1$, $1+3+5+\cdots+(2n-1)=n^2$.
  2. Disprove the claim "$\forall n\ge0$, $2^n+1$ is prime" by finding a counterexample (hint: check $n=5$).
  3. Select and justify an appropriate proof technique for "there is no largest even integer," then carry out the proof.
  4. Explain, in one sentence, why testing a claim for many specific values of $n$ can never substitute for a genuine proof of a universal claim.
- **P76 (Transfer Probe, mode = independence)**: "A programmer claims: 'for every positive integer $n$, my sorting function correctly sorts any list of $n$ items — I've tested it on lists of size 1 through 1000 and it always works.' (a) Explain, using this lesson's counterexample-disproof idea, why this testing evidence — however extensive — does not constitute a proof that the function works for ALL $n$. (b) Propose, in general terms, what kind of argument (naming the proof technique) WOULD be needed to genuinely establish the function's correctness for every possible list size, and explain why this technique is a natural fit for a claim about 'every $n$.'"
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | MANY-CONFIRMING-CASES-TREATED-AS-APPROACHING-PROOF | Believing a long run of confirming test cases provides meaningful evidence toward proving a universal claim, rather than recognizing a single counterexample fully disproves it regardless of prior confirmations | Foundational |
| MC-2 | PROOF-TECHNIQUE-CHOSEN-WITHOUT-STRUCTURAL-JUSTIFICATION | Selecting a proof technique arbitrarily or by habit rather than recognizing the specific structural cue (indexed claim, non-existence claim, etc.) that motivates the choice | Moderate |
| MC-3 | INDUCTIVE-STEP-ASSUMES-THE-CONCLUSION | In an induction proof, circularly assuming the very statement being proved (for $n+1$) rather than deriving it FROM the $n$-case assumption | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Confirming Cases Treated as Approaching Proof") → P41 (detect: present Example 2's 40-consecutive-primes case and ask whether the claim is "probably true" at that point) → P64 (conceptual shift: reveal the $n=41$ failure, explicitly connecting this lesson to the general evidence-vs-proof distinction).
- **B02 (targets MC-2)**: P27 ("Proof Technique Chosen Without Structural Justification") → P41 (detect: ask the student to justify, in one sentence, WHY a chosen technique fits a given claim) → P64 (conceptual shift: re-walk Example 3's explicit cue-identification, requiring the same justification step for a new claim).
- **B03 (targets MC-3)**: P27 ("Inductive Step Assumes the Conclusion") → P41 (detect: review a submitted inductive step for a derivation that starts from the $n+1$ statement rather than the $n$-case assumption) → P64 (conceptual shift: re-derive Example 1's inductive step explicitly starting from the assumed $n$-case formula and building FORWARD to the $n+1$ case, never assuming the target directly).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.predicate-logic`, `math.disc.propositional-logic`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.found.proof-by-induction`, `math.found.proof-by-contradiction` (this concept applies those already-authored general techniques specifically within discrete-mathematics contexts, reused by reference rather than re-derived).

## Component 8 — Teaching Notes

- estimated_hours = 4 reflects that this concept is primarily an APPLICATION and technique-selection layer over already-established proof machinery (`math.found.proof-by-induction`, etc.), specialized to discrete structures.
- MC-1 was ranked most severe because the $n^2-n+41$ example (a genuine, historically notable case — Euler's prime-generating polynomial) makes vivid just how misleading extensive confirming evidence can be, directly countering a very natural but incorrect intuition that "enough examples" approximates proof.
- The sorting-algorithm transfer probe was deliberately chosen to connect this lesson's abstract mathematical principle to a genuinely consequential real-world analog (software testing vs. formal verification), reinforcing that the evidence-vs-proof distinction has real stakes beyond pure mathematics.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.found.predicate-logic`, `math.disc.propositional-logic`) |
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
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO3, Ex3→LO1) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
