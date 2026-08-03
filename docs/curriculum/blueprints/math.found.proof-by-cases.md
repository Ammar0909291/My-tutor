# Teaching Blueprint: Proof by Cases (`math.found.proof-by-cases`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.found.proof-by-cases` |
| name | Proof by Cases |
| domain | Foundations |
| difficulty | developing |
| bloom | create |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 4 |
| requires | `math.found.proof` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | A proof that partitions all possible situations into finitely many cases and proves the statement separately for each case. |
| related | `math.found.direct-proof` |

## Component 1 — Learning Objectives

- LO1: Partition a claim's possibility space into finitely many cases that are jointly EXHAUSTIVE (cover every possibility, no gaps) and prove the statement within each case separately.
- LO2: Verify a proposed case split is genuinely exhaustive by checking no possibility is left uncovered — cases need not be mutually exclusive, but must jointly cover everything.
- LO3: Choose a case split whose individual cases are each easier to handle directly than the undivided general claim.

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.proof` (what a valid proof requires) — this concept structures a proof as several smaller direct sub-proofs, one per case.

## Component 3 — Core Explanation

**Proof by cases** proves a claim by splitting all possible situations into finitely many cases $C_1,\ldots,C_k$ that together cover EVERY possibility (jointly exhaustive), then proving the claim separately within each $C_i$. Since every possibility falls into at least one case, and the claim holds in each case, it holds universally.

The critical requirement is EXHAUSTIVENESS — if some possibility falls into none of the listed cases, the proof has a genuine gap, regardless of how carefully each individual case was handled. Cases MAY overlap (this doesn't break exhaustiveness), but nothing may be left uncovered.

## Component 4 — Worked Examples

**Example 1 (LO1, LO3 — canonical case split)**: Prove "for any integer $n$, $n^2+n$ is even." Case 1: $n$ is even, so $n=2k$; then $n^2+n=4k^2+2k=2(2k^2+k)$, even. Case 2: $n$ is odd, so $n=2k+1$; then $n^2+n=(2k+1)^2+(2k+1)=4k^2+6k+2=2(2k^2+3k+1)$, even. Since every integer is either even or odd (an exhaustive split), $n^2+n$ is even in every case, hence always. $\blacksquare$

**Example 2 (LO2 — an exhaustiveness gap, breaking MC-1)**: A flawed proof of "$|x|+|y|\ge|x+y|$" splits into "Case 1: $x,y\ge0$" and "Case 2: $x,y<0$" only — this MISSES the case where $x$ and $y$ have opposite signs entirely (e.g. $x=5,y=-3$), leaving a genuine gap; the correct split needs (at least) "same sign" vs. "opposite signs" (or four sign-combination cases) to be truly exhaustive.

**Example 3 (LO1, LO2 — overlapping-but-exhaustive cases are fine)**: Prove "for any real $x$, $\max(x,0)\ge0$." Case 1: $x\ge0$ (then $\max(x,0)=x\ge0$). Case 2: $x\le0$ (then $\max(x,0)=0\ge0$). These two cases OVERLAP at $x=0$ (both apply), which is perfectly acceptable — exhaustiveness only requires that every real $x$ falls into at least one case, and it does; overlap causes no gap.

## Component 5 — Teaching Actions

### Teaching Action A01 — Partition, Then Prove Each Case Directly (Primitive P64: Conceptual Shift)

Work Example 1 in full, explicitly stating the exhaustiveness justification ("every integer is even or odd — no third option") before working each case as its own small direct proof.

- **MC-1 hook**: present Example 2's flawed two-case split and ask the student whether every $(x,y)$ pair is covered (revealing MC-1: accepting a case split without checking that it is truly exhaustive, especially missing "mixed" or boundary configurations).

### Teaching Action A02 — Overlap Is Fine; Gaps Are Not (Primitive P06: Contrast Pair)

Contrast Example 3 (cases overlap at $x=0$, still valid, since exhaustiveness — not exclusivity — is the requirement) against Example 2 (cases don't overlap but DO leave a gap, invalidating the proof). State the rule explicitly: "cases may double-cover some possibilities without harm; they must never leave any possibility uncovered."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.75×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Prove by cases: "for any integer $n$, $n^3-n$ is divisible by 3" using $n\equiv0,1,2\pmod3$ as the case split (verify this split is exhaustive first).
  2. Given a proposed 3-case split of "for any real $x\ne0$, $x^2>0$" into "$x>1$," "$0<x<1$," "$x<0$," identify the missing case (the boundary $x=1$ is covered by "$x>1$" if inclusive — check the exact boundary conventions stated) and correct the split if a genuine gap exists.
  3. Prove by cases: "for any two integers $a,b$, $\max(a,b)+\min(a,b)=a+b$," splitting on $a\ge b$ vs. $a<b$.
  4. Explain why a case split into "$x$ is prime" and "$x$ is composite" is NOT exhaustive over all positive integers, and name the missing case.
- **P76 (Transfer Probe, mode = independence)**: "A store's shipping-cost rule is described as: 'if the order weighs under 5 kg, shipping is \$4; if the order weighs 5 kg or more, shipping is \$4 plus \$1 per additional kg over 5.' (a) Identify the two cases this rule splits into, and verify they are jointly exhaustive over all possible order weights $w\ge0$ (check the boundary at exactly $w=5$ kg carefully). (b) A colleague proposes an alternative three-case split — 'under 5 kg,' 'exactly 5 kg,' 'over 5 kg' — and asks whether the extra case is necessary for exhaustiveness or merely redundant. Answer, connecting your reasoning to Example 3's overlap-is-fine principle."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | CASE-SPLIT-ACCEPTED-WITHOUT-EXHAUSTIVENESS-CHECK | Proceeding to prove each listed case without verifying that every possibility genuinely falls into at least one case | Foundational |
| MC-2 | OVERLAPPING-CASES-ASSUMED-INVALID | Believing cases must be mutually exclusive (non-overlapping) for a proof by cases to be valid, when only joint exhaustiveness is actually required | Moderate |
| MC-3 | BOUNDARY-VALUE-DROPPED-BETWEEN-CASES | Splitting a continuous or ordered range (e.g. "$x>0$" and "$x<0$") in a way that silently omits a boundary value (e.g. $x=0$) from both cases | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Case Split Accepted Without Exhaustiveness Check") → P41 (detect: present Example 2's flawed split and ask the student to test a specific mixed-sign pair against both listed cases) → P64 (conceptual shift: enumerate all sign combinations explicitly — same-sign and opposite-sign — showing the original two cases miss the opposite-sign configuration entirely).
- **B02 (targets MC-2)**: P27 ("Overlapping Cases Assumed Invalid") → P41 (detect: present Example 3's overlapping split and ask if it's valid) → P64 (conceptual shift: re-state the exhaustiveness requirement precisely — "every possibility in at least one case" — and confirm overlap at $x=0$ doesn't violate it).
- **B03 (targets MC-3)**: P27 ("Boundary Value Dropped Between Cases") → P41 (detect: present a case split like "$x>0$"/"$x<0$" over all reals and ask what happens at $x=0$) → P64 (conceptual shift: require the student to explicitly assign every boundary point to at least one case, revising the split's inequalities to $\ge$/$<$ or similar).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.proof`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.found.direct-proof` (each individual case within a proof-by-cases is itself typically a small direct proof, reusing that concept's machinery rather than a new proof architecture).

## Component 8 — Teaching Notes

- estimated_hours = 4 reflects that the individual case-proofs reuse `math.found.direct-proof`'s machinery directly; the genuinely new skill this concept adds is exhaustiveness verification (LO2), not proof technique within each case.
- MC-1 and MC-3 are both ranked foundational because each represents the SAME underlying failure (an unverified gap in coverage) at different granularities — MC-1 at the level of the whole case list, MC-3 specifically at shared boundary points between adjacent cases.
- Example 3 (overlapping-but-valid cases) was deliberately included alongside Example 2 (non-overlapping-but-invalid) specifically to decouple two properties students conflate — exclusivity and exhaustiveness — which is why Teaching Action A02 contrasts them directly rather than treating overlap as an afterthought.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.found.proof`) |
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
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO3, Ex2→LO2, Ex3→LO1/LO2) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
