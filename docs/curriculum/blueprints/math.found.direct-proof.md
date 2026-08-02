# Teaching Blueprint: Direct Proof (`math.found.direct-proof`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.found.direct-proof` |
| name | Direct Proof |
| domain | Foundations |
| difficulty | developing |
| bloom | create |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 6 |
| requires | `math.found.proof`, `math.found.rules-of-inference` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) — this concept extends the already-abstract notion of proof with a specific structural technique |
| description (KG) | A proof that directly derives the conclusion from the hypothesis through a chain of logical deductions, without requiring assumptions of the negation. |

## Component 1 — Learning Objectives

- LO1: Write a direct proof of a statement "if P then Q" by assuming P and deriving Q through a chain of valid logical deductions, each justified by a rule of inference or a previously established fact.
- LO2: Distinguish a valid direct-proof chain (each step follows necessarily from the last) from an invalid one (a step that merely "sounds plausible" but isn't logically forced).
- LO3: Recognize when direct proof is the natural choice — typically when the hypothesis provides a concrete algebraic/structural handle to manipulate forward.

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.proof` (what a proof is and requires) and `math.found.rules-of-inference` (the specific valid inference patterns — modus ponens, etc. — direct proof chains together).

## Component 3 — Core Explanation

A **direct proof** of "if $P$ then $Q$" ($P\Rightarrow Q$) assumes $P$ is true, then derives $Q$ through a sequence of steps $P\Rightarrow S_1 \Rightarrow S_2 \Rightarrow \cdots \Rightarrow Q$, where each arrow is justified by a rule of inference, a definition, or a previously proven result. This is "direct" because it never detours through the statement's negation — contrast this with `math.found.proof-by-contradiction` (assumes $\neg Q$ and derives an absurdity) or `math.found.proof-by-contrapositive` (proves $\neg Q\Rightarrow\neg P$ instead).

Direct proof is the natural first attempt whenever the hypothesis $P$ can be manipulated forward using algebra or definitions to reach $Q$ in a small number of concrete steps.

## Component 4 — Worked Examples

**Example 1 (LO1 — canonical direct proof)**: Prove "if $n$ is even, then $n^2$ is even." Assume $n$ is even, so $n=2k$ for some integer $k$ (by the definition of even). Then $n^2=(2k)^2=4k^2=2(2k^2)$. Since $2k^2$ is an integer, $n^2$ is $2\times(\text{an integer})$, so $n^2$ is even. $\blacksquare$

**Example 2 (LO2 — spotting an invalid "direct proof," breaking MC-1)**: A flawed attempt to prove "if $n^2$ is even, then $n$ is even": *"$n^2=2k$, so $n=\sqrt{2k}$, and since $2k$ is even, $n$ is even."* This is INVALID — taking a square root does not preserve "evenness" as a property in any established rule of inference; the step from "$2k$ is even" to "$\sqrt{2k}$ is even" is an unjustified leap, not a licensed deduction. (This particular statement is in fact more naturally proved by contrapositive — see `math.found.proof-by-contrapositive`.)

**Example 3 (LO1, LO3 — a second clean direct chain)**: Prove "if $a$ and $b$ are both odd, then $a+b$ is even." Assume $a=2j+1$, $b=2k+1$ for integers $j,k$. Then $a+b=2j+1+2k+1=2(j+k+1)$, which is $2\times(\text{an integer})$, so $a+b$ is even. $\blacksquare$

## Component 5 — Teaching Actions

### Teaching Action A01 — The Direct Chain: Assume P, Derive Q Step by Step (Primitive P64: Conceptual Shift)

Work Example 1 line by line, explicitly labeling which definition or algebraic rule licenses each step ("by definition of even," "by algebra," "by definition of even again"). Emphasize that EVERY arrow needs a stated justification — an unjustified leap breaks the proof even if the conclusion happens to be true.

- **MC-1 hook**: present Example 2's flawed square-root argument and ask the student to identify the unjustified step (revealing MC-1: accepting a step because the CONCLUSION seems plausible, without checking that the step itself is a licensed deduction).

### Teaching Action A02 — Each Step Must Be Independently Justified (Primitive P06: Contrast Pair)

Contrast Example 1's valid chain (every arrow licensed by a named rule) against Example 2's invalid one (an arrow with no valid license). State the rule explicitly: "a proof's TRUTH is not enough — every individual step must be independently justifiable, or the argument isn't a proof, even if it reaches a true conclusion by luck."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.75×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Write a direct proof: "if $n$ is a multiple of 3, then $n^2$ is a multiple of 3." (Note: this uses the property genuinely, unlike Example 2's flawed case, since $3\mid n^2\Rightarrow 3\mid(3m)^2=9m^2$ follows directly.)
  2. Identify the unjustified step in a given flawed "direct proof" of "if $x>0$ then $x^2>x$" (which fails for $0<x<1$) and explain what additional hypothesis would fix it.
  3. Write a direct proof: "if $a$ divides $b$ and $b$ divides $c$, then $a$ divides $c$."
  4. State, without proving, whether "if $n$ is even, then $n+1$ is odd" is a good candidate for direct proof, and justify why.
- **P76 (Transfer Probe, mode = independence)**: "A colleague claims to have directly proved 'every integer greater than 1 has a prime factor' with the single line: 'obviously it does, since we can always keep dividing.' (a) Explain why this is not a valid direct proof, identifying which specific step lacks a stated justification. (b) Sketch, in outline, what a properly justified direct (or alternative) proof of this claim would need to establish at each step."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | PLAUSIBLE-CONCLUSION-SUBSTITUTED-FOR-JUSTIFIED-STEP | Accepting a proof step because the eventual conclusion seems true, without verifying that the step itself follows from a valid rule of inference or definition | Foundational |
| MC-2 | HYPOTHESIS-NEVER-EXPLICITLY-INVOKED | Writing a chain of true statements about the general topic without ever explicitly using the given hypothesis $P$ as the starting assumption | Moderate |
| MC-3 | DEFINITION-SUBSTITUTION-SKIPPED | Working with terms like "even" or "divisible" only informally, without substituting the formal definition (e.g. $n=2k$) needed to manipulate the claim algebraically | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Plausible Conclusion, Unjustified Step") → P41 (detect: present Example 2's flawed proof; check whether the student flags the square-root step specifically, or only says "the conclusion is false so somewhere it's wrong") → P64 (conceptual shift: require the student to name the SPECIFIC missing justification, not just that an error exists).
- **B02 (targets MC-2)**: P27 ("Hypothesis Not Invoked") → P41 (detect: review a submitted proof attempt and check whether "$P$" is explicitly assumed as the first line) → P64 (re-walk Example 1, pointing to the exact line "Assume $n$ is even" as the hypothesis-invocation step).
- **B03 (targets MC-3)**: P27 ("Definition Substitution Skipped") → P41 (detect: ask the student to prove a divisibility claim and check whether they substitute $n=2k$-style algebraic forms or reason only in words) → P64 (conceptual shift: re-derive Example 3, explicitly substituting $a=2j+1$, $b=2k+1$ before any algebra).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.proof`, `math.found.rules-of-inference`.
- **Unlocks**: none recorded in the KG; informally the base case against which `math.found.proof-by-contradiction` and `math.found.proof-by-contrapositive` are contrasted.
- **Related**: `math.found.proof-by-contradiction`, `math.found.proof-by-contrapositive` (siblings under `math.found.proof`, each covering when direct proof is NOT the natural choice).

## Component 8 — Teaching Notes

- estimated_hours = 6 and bloom = create reflect that direct proof is the first concept requiring the student to GENERATE a full justified chain, not just recognize or verify one.
- MC-1 was ranked most severe because it is the single failure mode that most undermines what a proof even is — a chain of "true-sounding" but unjustified steps looks superficially like a proof while providing none of a proof's actual guarantee.
- Example 2's flawed square-root argument was deliberately chosen because its CONCLUSION happens to be provable (just not by this broken method, and more naturally by contrapositive) — this was designed so the repair (B01) trains scrutinizing the STEP, not just the conclusion's truth value.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.found.proof`, `math.found.rules-of-inference`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
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
| V-15 | CPA_entry_stage justified | PASS (Abstract: extends the already-abstract proof concept) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2/LO3, Ex3→LO1) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
