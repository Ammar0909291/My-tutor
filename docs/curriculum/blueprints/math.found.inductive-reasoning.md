# Teaching Blueprint: Inductive Reasoning (`math.found.inductive-reasoning`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.found.inductive-reasoning` |
| name | Inductive Reasoning |
| domain | Foundations |
| difficulty | foundational |
| bloom | analyze |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 3 |
| requires | `math.found.pattern-recognition` |
| unlocks | `math.found.conjecture` |
| cross_links | (none) |
| CPA_entry_stage | C (Concrete) |
| description (KG) | Reasoning from specific observations to general conclusions; in mathematics, this is conjectural and not logically certain (distinguished from mathematical induction, a proof technique). |
| related | `math.found.deductive-reasoning`, `math.found.pattern-recognition` |
| aliases | induction, scientific induction, empirical generalization |

## Component 1 — Learning Objectives

- LO1: Define inductive reasoning as inferring a general conclusion from specific observed cases, and state that its conclusions are CONJECTURAL, not logically certain.
- LO2: Generate a plausible general conjecture from a set of specific numeric or pattern-based observations.
- LO3: Distinguish inductive reasoning (this concept) from mathematical/proof-by-induction (`math.found.proof-by-induction`) — a genuinely rigorous PROOF technique despite the similar name — recognizing the two are entirely different in logical strength.

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.pattern-recognition` (spotting regularities in specific cases) — inductive reasoning is the act of generalizing from those spotted patterns into a broader conjectural claim.

## Component 3 — Core Explanation

**Inductive reasoning** infers a general conclusion from a finite number of SPECIFIC observed cases — e.g. noticing $1+3=4$, $1+3+5=9$, $1+3+5+7=16$ are all perfect squares, and conjecturing "the sum of the first $n$ odd numbers is always $n^2$." This conclusion is **conjectural**: no finite number of confirming instances logically GUARANTEES the general claim holds for ALL cases (this is the same asymmetry established in `math.found.conjecture`) — inductive reasoning generates plausible hypotheses, not proofs.

This is crucially distinct from **mathematical induction** (`math.found.proof-by-induction`), a fully rigorous DEDUCTIVE proof technique that, despite sharing the word "induction," provides logical certainty once correctly executed (base case + inductive step). Confusing the two names is a common and consequential error: one produces guesses, the other produces proofs.

## Component 4 — Worked Examples

**Example 1 (LO2 — generating a conjecture from observations)**: Observing $2+2=4$, $3+3=6$, $10+10=20$ — each an even result — a student inductively conjectures "the sum of a number and itself is always even." This is a REASONABLE conjecture (later provable: $n+n=2n$, always even) generated purely from pattern-spotting, not yet from a general argument.

**Example 2 (LO1, LO3 — a case where the pattern breaks, illustrating conjectural risk, breaking MC-1)**: The expression $n^2+n+41$ gives a PRIME number for $n=0,1,2,\ldots,39$ — forty consecutive prime outputs, extremely compelling evidence. Yet at $n=40$: $40^2+40+41=1681=41^2$, NOT prime — the pattern breaks. A student who treated the 40 confirming cases as a PROOF (rather than a still-conjectural pattern) would have been decisively wrong; inductive evidence, however extensive, never logically guarantees the general claim.

**Example 3 (LO3 — the name-collision distinguished explicitly)**: "Mathematical induction," despite its name, is NOT an instance of inductive reasoning — it is a fully deductive technique: correctly proving a base case and a valid inductive step logically GUARANTEES the conclusion for all $n$, with the same certainty as any other valid proof. The historical naming (borrowed from the same root as "inductive reasoning") is a linguistic coincidence, not a logical kinship — see `math.found.proof-by-induction` for the actual technique.

## Component 5 — Teaching Actions

### Teaching Action A01 — Generalize from Specific Cases, Flagging the Result as Conjectural (Primitive P64: Conceptual Shift)

Work Example 1, explicitly labeling the final generalization "CONJECTURE" (not "theorem" or "fact"), reinforcing that pattern-spotting produces a hypothesis requiring further justification, per `math.found.conjecture`.

- **MC-1 hook**: present Example 2's 40-consecutive-primes pattern and ask the student whether this "proves" the formula always gives primes (revealing MC-1: treating a large but finite number of confirming instances as logically sufficient to establish a general claim).

### Teaching Action A02 — Inductive Reasoning vs. Mathematical Induction: Same Name, Different Logic (Primitive P06: Contrast Pair)

Work Example 3 directly, placing inductive reasoning (conjectural, evidence-based, can be wrong regardless of how much evidence supports it) side by side with mathematical induction (deductive, rigorous, logically certain once correctly executed). State the rule explicitly: "the shared word 'induction' is a historical accident of naming — one process generates guesses; the other proves things with full certainty. Never assume they carry the same logical weight."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.75×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Given the observations $3^2-1=8$, $5^2-1=24$, $7^2-1=48$ (all divisible by 8), generate a general conjecture about odd numbers squared minus one.
  2. Explain why testing the conjecture from item 1 for 100 more odd numbers, all confirming it, would still not constitute a PROOF.
  3. State, in one sentence, the key logical difference between inductive reasoning and mathematical induction, despite their shared name.
  4. Given a sequence $1,4,9,16,25,\ldots$ observed to be perfect squares, state the inductively-generated conjecture for the $n$th term, and describe what kind of argument (not just more observed terms) would be needed to actually PROVE it.
- **P76 (Transfer Probe, mode = independence)**: "A quality-control engineer tests 500 units from a new production line and finds every single one meets spec, concluding 'this production line reliably produces units meeting spec.' (a) Explain, using this lesson's concept, what kind of reasoning this conclusion represents, and why 500 confirming units — however reassuring — do not logically guarantee the 501st unit will also meet spec. (b) A colleague objects, 'but mathematical induction lets us prove things for infinitely many cases with certainty — why can't we use the same idea here?' Explain, using the distinction from this lesson, why the engineer's situation is fundamentally different from a genuine mathematical-induction proof."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | FINITE-CONFIRMING-CASES-TREATED-AS-PROOF | Believing a sufficiently large or thorough number of confirming instances logically establishes a general claim, rather than merely supporting a conjecture | Foundational |
| MC-2 | INDUCTIVE-REASONING-CONFLATED-WITH-MATHEMATICAL-INDUCTION | Assuming inductive reasoning and mathematical induction share the same logical certainty because of their shared name | Foundational |
| MC-3 | CONJECTURE-GENERATION-SKIPPED-DIRECT-TO-UNSUPPORTED-CLAIM | Stating a general claim without first identifying and citing the specific observed cases that motivated it, undermining the traceability of the inductive process | Minor |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Finite Confirming Cases Treated as Proof") → P41 (detect: present Example 2's 40-prime pattern and ask if it's proven) → P64 (conceptual shift: reveal the $n=40$ counterexample, showing the pattern's eventual break despite extensive prior confirmation).
- **B02 (targets MC-2)**: P27 ("Inductive Reasoning Conflated with Mathematical Induction") → P41 (detect: ask whether mathematical induction is "just a formalized version of guessing from examples") → P64 (conceptual shift: re-walk Example 3's explicit distinction, emphasizing mathematical induction's deductive certainty).
- **B03 (targets MC-3)**: P27 ("Conjecture Generation Skipped to Unsupported Claim") → P41 (detect: ask the student to state a conjecture without first listing the observed cases that suggested it) → P64 (conceptual shift: require explicit citation of the motivating cases, per Example 1's structure, before accepting the generalization).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.pattern-recognition`.
- **Unlocks**: `math.found.conjecture` (the direct output of inductive reasoning — a generalization not yet proved).
- **Related**: `math.found.deductive-reasoning`, `math.found.proof-by-induction` (the name-collision concept this entry explicitly disambiguates against).

## Component 8 — Teaching Notes

- estimated_hours = 3 reflects that while the core idea (generalizing from cases) is intuitive, the name-collision disambiguation (LO3) requires deliberate, explicit teaching attention, since the shared terminology is a genuine and well-documented source of confusion even among more advanced students.
- MC-2 was ranked foundational (not merely a vocabulary quibble) because conflating the two concepts' logical STRENGTH — not just their names — leads students to either distrust genuinely valid mathematical-induction proofs or over-trust merely-suggestive inductive patterns.
- The $n^2+n+41$ prime-generating polynomial (Example 2) is a well-known historical case (Euler's polynomial) retained deliberately because its dramatic 40-case run before breaking makes MC-1's danger vivid and memorable rather than abstract.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.found.pattern-recognition`) |
| V-4 | unlocks concepts named accurately from KG | PASS (`math.found.conjecture`) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: specific numeric observations before generalization) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO2, Ex2→LO1, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
