# Teaching Blueprint: Uniqueness Proof (`math.found.uniqueness-proof`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.found.uniqueness-proof` |
| name | Uniqueness Proof |
| domain | Foundations |
| difficulty | developing |
| bloom | create |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 4 |
| requires | `math.found.existence-proof` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | A proof that demonstrates exactly one object satisfies a given property, typically by assuming two such objects exist and showing they must be equal. |
| related | `math.found.existence-proof` |
| aliases | proof of uniqueness |

## Component 1 — Learning Objectives

- LO1: Write a uniqueness proof using the standard technique: assume TWO objects $x_1,x_2$ both satisfy the property, then prove $x_1=x_2$.
- LO2: Combine an existence proof and a uniqueness proof into a full "there exists a UNIQUE $x$ such that..." claim, recognizing both halves are independently required.
- LO3: Recognize that a uniqueness proof alone (without existence) proves only "AT MOST one object satisfies $P$" — it does not, by itself, establish that any such object exists at all.

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.existence-proof` — uniqueness proofs are typically paired with (but logically distinct from) existence proofs, together forming the full "exists and is unique" claim.

## Component 3 — Core Explanation

A **uniqueness proof** shows that AT MOST one object satisfies a given property $P$. The standard technique: assume $x_1$ and $x_2$ BOTH satisfy $P$ (without assuming they're different), then derive $x_1=x_2$ through valid reasoning — proving that any two objects satisfying $P$ must in fact be the SAME object.

A uniqueness proof alone establishes only "at most one" — it says NOTHING about whether such an object actually exists. The full claim "there EXISTS a UNIQUE $x$ such that $P(x)$" genuinely requires BOTH an existence proof (`math.found.existence-proof`, establishing at least one) AND a uniqueness proof (establishing at most one) — together pinning down EXACTLY one.

## Component 4 — Worked Examples

**Example 1 (LO1 — the standard two-object technique)**: Prove "the equation $2x+3=11$ has a unique solution." Assume $x_1,x_2$ both satisfy $2x+3=11$. Then $2x_1+3=11=2x_2+3$, so $2x_1=2x_2$, so $x_1=x_2$. Hence any two solutions are equal — at most one solution exists. (Combined with the existence check $x=4$ works, this establishes exactly one solution.)

**Example 2 (LO2, LO3 — uniqueness without existence proves nothing alone, breaking MC-1)**: Consider the (false) equation "$x+1=x$" over the reals. A uniqueness-style argument: assume $x_1,x_2$ both satisfy $x+1=x$; then $x_1+1=x_1$ and $x_2+1=x_2$, giving (after simplification) $1=0$ in both cases — a contradiction reached from the ASSUMPTION itself, which actually shows NO $x$ satisfies the equation at all (vacuously, "any two solutions are equal" holds, since there are zero solutions to compare!). This illustrates precisely why uniqueness alone is insufficient: the "at most one" claim is technically true here (vacuously), yet there is no actual solution — existence must be checked SEPARATELY.

**Example 3 (LO1 — a genuine full existence-and-uniqueness result)**: Prove "every nonzero real number $a$ has a unique multiplicative inverse." Existence: $1/a$ satisfies $a\cdot(1/a)=1$. Uniqueness: assume $b_1,b_2$ both satisfy $a\cdot b_1=1$ and $a\cdot b_2=1$; then $a\cdot b_1=a\cdot b_2$, and since $a\ne0$, dividing (or multiplying both sides by $1/a$, itself independently justified) gives $b_1=b_2$. Both halves together establish the full "exists and is unique" claim.

## Component 5 — Teaching Actions

### Teaching Action A01 — Assume Two Objects, Prove They're Equal (Primitive P64: Conceptual Shift)

Work Example 1 in full, explicitly naming the two assumed objects $x_1,x_2$ (without presupposing $x_1\ne x_2$) and deriving $x_1=x_2$ as the proof's entire content.

- **MC-1 hook**: present Example 2's vacuous case and ask whether "at most one solution exists" is a meaningful, complete result on its own (revealing MC-1: treating a uniqueness proof by itself as establishing that a solution exists, when it only bounds the count from above, potentially at zero).

### Teaching Action A02 — Existence and Uniqueness Are Two Separate Halves (Primitive P06: Contrast Pair)

Contrast Example 2 (uniqueness holds vacuously, existence FAILS — no genuine solution) against Example 3 (both halves hold — a genuine unique inverse exists) to isolate that these are logically INDEPENDENT claims, both required for the full "exists and is unique" statement. State the rule: "always check existence and uniqueness as two separate proof obligations — proving one never substitutes for the other."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.75×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Prove the uniqueness half: "if $a>0$, the equation $x^2=a$ has at most one POSITIVE solution" (assume $x_1,x_2>0$ both satisfy $x_1^2=a=x_2^2$, derive $x_1=x_2$).
  2. Combine with an existence argument (informally citing that $\sqrt a$ exists) to state the full "exists and is unique" claim for item 1.
  3. Given a false equation like "$x=x+2$," explain why a uniqueness-style argument on it would still (vacuously) show "at most one solution," and why this is not a meaningful positive result.
  4. Prove both existence and uniqueness for "every real number has a unique additive inverse" ($-a$ satisfies $a+(-a)=0$; assume $b_1,b_2$ both satisfy $a+b_1=0=a+b_2$, derive $b_1=b_2$).
- **P76 (Transfer Probe, mode = independence)**: "A committee bylaw states: 'there is a unique person authorized to sign contracts on the organization's behalf.' (a) Explain what TWO separate things this claim asserts, using this lesson's existence/uniqueness distinction. (b) A new employee argues, 'the bylaw proves such a person exists, since it says so.' Explain why the WORD 'unique' in the bylaw's phrasing does not, by itself, logically guarantee that such an authorized person actually exists — connecting your answer to Example 2's vacuous-uniqueness case — and what separate evidence would be needed to confirm existence."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | UNIQUENESS-PROOF-MISTAKEN-FOR-EXISTENCE-PROOF | Believing a completed uniqueness proof (at most one) alone establishes that an object satisfying the property exists | Foundational |
| MC-2 | TWO-OBJECT-ASSUMPTION-MISREAD-AS-ASSUMING-DIFFERENCE | Starting a uniqueness proof by assuming $x_1\ne x_2$ (as if setting up a proof by contradiction against distinctness) rather than assuming both merely satisfy $P$, without presupposing they differ | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Uniqueness Proof Mistaken for Existence Proof") → P41 (detect: present Example 2's vacuous case and ask if a solution has been shown to exist) → P64 (conceptual shift: re-walk Example 2, clarifying the "at most one" result holds vacuously precisely because there are zero actual solutions).
- **B02 (targets MC-2)**: P27 ("Two-Object Assumption Misread as Assuming Difference") → P41 (detect: review a submitted uniqueness-proof attempt for an initial assumption of $x_1\ne x_2$) → P64 (conceptual shift: re-walk Example 1, clarifying $x_1,x_2$ are simply two NAMES for objects satisfying $P$ — possibly the same object, possibly not, which is exactly what the proof determines).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.existence-proof`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.found.existence-proof` (the companion half of the full "exists and is unique" claim).

## Component 8 — Teaching Notes

- estimated_hours = 4, matching `math.found.existence-proof`'s allocation, reflecting comparable conceptual difficulty in the reverse direction (bounding count from above rather than establishing a witness).
- MC-1 was ranked most severe because it represents a genuine LOGICAL gap of exactly the same shape as `math.found.existence-proof`'s own MC-1 (treating one proof mode as automatically covering the other) — reinforcing, from the opposite direction, that existence and uniqueness are structurally independent proof obligations.
- Example 2's vacuous-uniqueness case (a false equation trivially satisfying "at most one solution" since there are zero) was deliberately constructed as this concept's centerpiece precisely because it is the sharpest possible illustration of MC-1's danger — a technically correct uniqueness proof that provides zero positive information about the world.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.found.existence-proof`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2/LO3, Ex3→LO1) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
