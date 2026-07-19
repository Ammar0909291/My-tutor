# Teaching Blueprint: Deductive Reasoning (`math.found.deductive-reasoning`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.found.deductive-reasoning` |
| name | Deductive Reasoning |
| domain | Foundations |
| difficulty | foundational |
| bloom | analyze |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 3 |
| requires | `math.found.logic` |
| unlocks | `math.found.proof` |
| cross_links | (none) |
| CPA_entry_stage | C (Concrete) — begins with a concrete syllogism before the abstract validity/soundness distinction |
| description (KG) | Reasoning from general principles to specific conclusions in a logically valid manner; the mode of mathematical proof. |

## Component 1 — Learning Objectives

- LO1: Define deductive reasoning as reasoning from general premises to a specific conclusion via **logically valid** steps — recognizing VALIDITY is a property of the argument's FORM, not of whether its premises or conclusion happen to be actually true.
- LO2: Distinguish **validity** from **soundness** — a valid argument's conclusion follows necessarily from its premises (correct form, regardless of truth); a SOUND argument is valid AND has actually true premises, which alone guarantees a true conclusion.
- LO3: Recognize deductive reasoning as **the mode of mathematical proof** — connecting directly to `math.found.proof`'s own framework, since every mathematical proof is fundamentally a chain of deductive steps from established facts to a specific conclusion.

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.logic` (valid reasoning principles, the structure of mathematical statements, deductive rules).

## Component 3 — Core Explanation

**Validity is about FORM, not about the actual truth of premises or conclusion**: a deductive argument is VALID if its conclusion follows NECESSARILY from its premises — meaning IF the premises were true, the conclusion would HAVE to be true too. This is a purely structural (formal) property: an argument can be perfectly valid even with FALSE premises (and consequently a false conclusion) — validity says nothing about whether the premises actually hold in reality, only that the LOGICAL CONNECTION between premises and conclusion is airtight.

**Soundness adds the requirement that premises are actually true**: a SOUND argument is one that is BOTH valid (correct form) AND has premises that are actually TRUE. Soundness is what actually guarantees a true conclusion — a merely valid (but unsound) argument, with false premises, gives no such guarantee, even though its logical structure is impeccable.

**Deductive reasoning IS how mathematical proof works**: every mathematical proof is a chain of deductive steps — starting from definitions, axioms, or previously-established theorems (the "premises"), and applying valid logical inference at each step to reach a specific conclusion. `math.found.proof`'s entire framework is deductive reasoning applied within a specific mathematical context.

## Component 4 — Worked Examples

**Example 1 (LO1 — validity depends on form, not truth, breaking MC-1)**: "All cats can fly. Fluffy is a cat. Therefore, Fluffy can fly." — this argument is VALID: IF both premises were true, the conclusion would necessarily follow — the logical FORM is airtight. Yet the first premise is actually FALSE (cats cannot fly), so the conclusion is also false. Contrast: "All mammals breathe air. Fluffy is a mammal. Therefore, Fluffy breathes air." — the IDENTICAL logical form, but now both premises are actually true, so the conclusion is guaranteed true. Both arguments share the exact same valid structure; only the actual truth of their premises differs.

**Example 2 (LO2 — valid but not sound, vs. valid and sound, breaking MC-2)**: Revisiting Example 1's "all cats can fly" argument: it is VALID (correct logical form) but NOT SOUND (since "all cats can fly" is false) — soundness requires both validity AND true premises, and this argument fails the second requirement. The "mammals breathe air" argument, by contrast, IS sound: valid form, and both premises are actually true, so its conclusion is genuinely guaranteed. Validity alone (Example 1's flying-cats case) is not enough to trust a conclusion — soundness is the stronger, truth-guaranteeing property.

**Example 3 (LO3 — deductive reasoning as the engine of mathematical proof, breaking MC-3)**: A proof that "the sum of two even integers is even": let $a=2m$ and $b=2n$ for integers $m,n$ (using the DEFINITION of "even" — a premise). Then $a+b=2m+2n=2(m+n)$, which IS even by the same definition (since $m+n$ is an integer) — a conclusion following NECESSARILY from the premises via valid algebraic steps. This is exactly the deductive-reasoning pattern from Examples 1–2 (general premises → valid steps → specific guaranteed conclusion), now applied within an actual mathematical proof, confirming deductive reasoning is not a separate topic from proof but its very mechanism.

## Component 5 — Teaching Actions

### Teaching Action A01 — Valid Form Can Coexist with False Premises (Primitive P06: Contrast Pair)

Contrast Example 1's two syllogisms: identical logical form, but one with a false premise (flying cats) and one with true premises (mammals breathing air). State: "validity is about whether the conclusion NECESSARILY follows from the premises — it says nothing about whether those premises are actually true."

- **MC-1 hook**: ask "does an argument's validity depend on whether its premises and conclusion are actually true?" — a "yes" answer reveals MC-1 (conflating validity, a formal property, with the actual truth of premises/conclusion).

### Teaching Action A02 — Soundness Requires Validity Plus True Premises (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: the flying-cats argument is valid yet unsound (false premise), while the mammals argument is both valid and sound. State: "validity alone doesn't guarantee a true conclusion — soundness, which additionally requires actually true premises, is what does."

- **MC-2 hook**: ask "are 'valid' and 'sound' just two words for the same property of an argument?" — a "yes" answer reveals MC-2 (conflating validity with the stronger soundness property).

### Teaching Action A03 — Proof Is Deductive Reasoning Applied to Mathematics (Primitive P11: Representation Shift)

State: "a mathematical proof isn't a different kind of reasoning from the syllogisms you just analyzed — it's the identical deductive pattern, applied to mathematical definitions and facts instead of everyday claims about cats." Work Example 3's even-plus-even proof, mapping its steps back onto the general/specific deductive pattern.

- **MC-3 hook**: ask "is deductive reasoning a separate topic from how actual mathematical proofs work?" — a "yes" answer reveals MC-3 (missing that proof IS deductive reasoning, applied in a mathematical context).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Construct a valid argument with at least one false premise, and explain why it is still valid despite this.
  2. Determine whether "All prime numbers are odd. 2 is a prime number. Therefore, 2 is odd." is valid, and separately whether it is sound.
  3. Explain the difference between validity and soundness using your own example (not from this lesson).
  4. Identify the general premises, the valid deductive steps, and the specific conclusion in a proof that "the product of two odd integers is odd."
- **P76 (Transfer Probe, mode = independence)**: "A debate coach teaches students to construct logically airtight arguments, and one student produces an argument that is perfectly valid in form but relies on a premise the coach knows to be factually false. (a) Using this lesson's validity/soundness distinction, explain whether the coach should praise the argument's LOGICAL STRUCTURE, its ACTUAL RELIABILITY, both, or neither. (b) A classmate argues 'since the argument is valid, its conclusion must be worth taking seriously, regardless of whether the premise is true.' Explain specifically why this argument is flawed. (c) The coach then points out that professional mathematical proofs use exactly this same deductive structure, and asks the student to explain the connection. Using this lesson's proof example, explain how a mathematical proof's use of definitions and established facts as premises parallels the syllogism's structure."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | VALIDITY-CONFLATED-WITH-TRUTH | Believing an argument's validity depends on whether its premises and conclusion are actually true, missing that validity is a purely formal (structural) property | Foundational |
| MC-2 | VALIDITY-AND-SOUNDNESS-CONFLATED | Believing "valid" and "sound" are interchangeable terms, missing that soundness additionally requires actually true premises | Foundational |
| MC-3 | DEDUCTIVE-REASONING-TREATED-AS-SEPARATE-FROM-PROOF | Believing deductive reasoning is a separate topic unrelated to how mathematical proofs actually work, missing that proof is deductive reasoning applied to mathematics | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Validity Conflated with Truth") → P41 (detect: ask a student whether an argument with a false premise can still be valid, checking for "no") → P64 (conceptual shift: re-walk Example 1's flying-cats-vs-mammals contrast, re-anchoring on "validity is about the logical connection, not the actual truth of the premises").
- **B02 (targets MC-2)**: P27 (name it: "Validity and Soundness Conflated") → P41 (detect: ask a student whether "valid" and "sound" mean the same thing, checking for "yes") → P64 (conceptual shift: re-walk Example 2's valid-but-unsound vs. valid-and-sound contrast, re-anchoring on "soundness needs validity plus actually true premises").
- **B03 (targets MC-3)**: P27 (name it: "Deductive Reasoning Treated as Separate from Proof") → P41 (detect: ask a student whether deductive reasoning and mathematical proof are unrelated topics, checking for "yes") → P64 (conceptual shift: re-walk Example 3's even-plus-even proof mapped onto the general deductive pattern, re-anchoring on "proof IS deductive reasoning, applied mathematically").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.logic` (valid reasoning and deductive rules this concept's validity/soundness distinction builds directly on).
- **Unlocks**: `math.found.proof` (deepens this concept's LO3 connection — proof as deductive reasoning applied to a full mathematical framework).
- **Cross-link**: KG lists no cross_links for this concept (checked via `ls docs/curriculum/blueprints/` before setting P76_mode — none to check). $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 3 with a foundational/analyze tag places this at a compact "3 TAs + gate" tier, appropriately terse given the concept builds directly on `math.found.logic`'s already-mastered reasoning framework, adding only the validity/soundness distinction and the direct connection to mathematical proof.
- **Division of labor**: `math.found.logic` owns valid reasoning and deductive rules in general. This concept, `math.found.deductive-reasoning`, deliberately does not re-teach that framework; it owns the specific validity/soundness distinction (a frequently-confused pair) and the explicit framing of mathematical proof as deductive reasoning's primary application.
- Example 3 was deliberately connected explicitly back to Examples 1-2's syllogism structure (general premises → valid steps → specific conclusion) rather than presented as an unrelated new topic, since `math.found.proof` (the unlocks target) is authored and this concept's job is to establish, clearly, that proof IS this same reasoning pattern before that concept deepens it.

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
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: concrete syllogism before the abstract validity/soundness distinction) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
