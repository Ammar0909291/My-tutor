# Teaching Blueprint: Divide-and-Conquer Recurrences (`math.disc.divide-conquer-recurrence`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.disc.divide-conquer-recurrence` |
| name | Divide-and-Conquer Recurrences |
| domain | Discrete Mathematics |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 4/5 |
| estimated_hours | 4 |
| requires | `math.disc.recurrence-relation`, `math.alg.logarithm` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | T(n) = aT(n/b) + f(n). Master Theorem gives asymptotic solution in three cases depending on comparison of f(n) to n^{log_b a}. Applies to analysis of recursive algorithms (merge sort, binary search).

 |

## Component 1 — Learning Objectives

- LO1: Identify the parameters $a$, $b$, and $f(n)$ from a divide-and-conquer recurrence $T(n)=aT(n/b)+f(n)$.
- LO2: Apply the Master Theorem's three cases by comparing $f(n)$ to $n^{\log_ba}$ (the "watershed" function), determining which case applies and stating the resulting asymptotic solution.
- LO3: Correctly distinguish the three cases' STRICT comparison requirements (polynomially smaller, equal, or polynomially larger — not merely "smaller/equal/larger" in a loose sense) and recognize when the Master Theorem does NOT apply at all.

## Component 2 — Prerequisite Check

Assumes mastery of `math.disc.recurrence-relation` (recurrences in general) and `math.alg.logarithm` (computing $\log_ba$, the exponent central to this technique).

## Component 3 — Core Explanation

A **divide-and-conquer recurrence** $T(n)=aT(n/b)+f(n)$ describes an algorithm that divides a problem of size $n$ into $a$ subproblems of size $n/b$ each, plus $f(n)$ extra work to combine results. The **Master Theorem** gives the asymptotic growth of $T(n)$ by comparing $f(n)$ against the WATERSHED function $n^{\log_ba}$:

- **Case 1** ($f(n)=O(n^{\log_ba-\epsilon})$ for some $\epsilon>0$, i.e. $f(n)$ is POLYNOMIALLY SMALLER): $T(n)=\Theta(n^{\log_ba})$ — the subdivision work dominates.
- **Case 2** ($f(n)=\Theta(n^{\log_ba})$, i.e. $f(n)$ MATCHES the watershed): $T(n)=\Theta(n^{\log_ba}\log n)$ — an extra log factor appears.
- **Case 3** ($f(n)=\Omega(n^{\log_ba+\epsilon})$ for some $\epsilon>0$, i.e. $f(n)$ is POLYNOMIALLY LARGER, plus a regularity condition): $T(n)=\Theta(f(n))$ — the combine step dominates.

If $f(n)$ is neither polynomially smaller, equal, nor polynomially larger (e.g. differs only by a logarithmic factor), the Master Theorem does NOT apply, and a different technique is needed.

## Component 4 — Worked Examples

**Example 1 (LO1, LO2 — merge sort, Case 2)**: Merge sort's recurrence is $T(n)=2T(n/2)+n$ (splits into $a=2$ halves, $b=2$, combine cost $f(n)=n$ for merging). Watershed: $n^{\log_22}=n^1=n$. Since $f(n)=n=\Theta(n^1)$, this matches the watershed exactly — Case 2 applies: $T(n)=\Theta(n\log n)$.

**Example 2 (LO2, LO3 — binary search, Case 1)**: Binary search's recurrence is $T(n)=T(n/2)+O(1)$ (one subproblem, $a=1$, $b=2$, constant combine work $f(n)=O(1)$). Watershed: $n^{\log_21}=n^0=1$. Since $f(n)=O(1)=O(n^0)$ matches the watershed... actually this IS Case 2 as well ($f(n)=\Theta(n^{\log_ba})=\Theta(1)$): $T(n)=\Theta(\log n)$. Contrast with a hypothetical $T(n)=4T(n/2)+n$: watershed $n^{\log_24}=n^2$; since $f(n)=n$ is POLYNOMIALLY SMALLER than $n^2$ (specifically $O(n^{2-1})$), this is genuinely Case 1: $T(n)=\Theta(n^2)$ — the recursive subdivision work dominates, and the linear combine cost is asymptotically irrelevant.

**Example 3 (LO3 — a case where the Master Theorem does not apply, breaking MC-1)**: Consider $T(n)=2T(n/2)+n\log n$. Watershed: $n^{\log_22}=n$. Comparing $f(n)=n\log n$ to $n$: it is LARGER than $n$, but only by a logarithmic factor, NOT a polynomial factor ($n\log n\ne\Omega(n^{1+\epsilon})$ for any fixed $\epsilon>0$, since $\log n$ grows slower than any positive power of $n$) — so this does NOT satisfy Case 3's polynomially-larger requirement, and it also doesn't match Case 2's exact watershed match. The Master Theorem, in this basic form, simply does NOT apply here (the correct answer, $T(n)=\Theta(n\log^2n)$, requires a more refined version of the theorem, or the recursion tree method directly). A common error forces this into "Case 3, since $f(n)$ is bigger" without checking the required POLYNOMIAL (not just any) gap.

## Component 5 — Teaching Actions

### Teaching Action A01 — Identify a, b, f(n), and the Watershed (Primitive P64: Conceptual Shift)

Work Example 1 in full, explicitly extracting $a$, $b$, $f(n)$ from the recurrence, computing the watershed $n^{\log_ba}$, and comparing it against $f(n)$ before applying the matching case.

### Teaching Action A02 — Contrasting the Three Cases on Related Examples (Primitive P06: Contrast Pair)

Work Example 2's two sub-cases (the true Case-2 binary-search recurrence and the hypothetical Case-1 $4T(n/2)+n$ variant) side by side, showing how a DIFFERENT value of $a$ (changing the watershed) shifts which case applies for the same $f(n)$ form. State the rule: "always recompute the watershed for the SPECIFIC $a,b$ given — don't assume a case based on memorized examples with different parameters."

### Teaching Action A03 — The Gap Must Be Polynomial, Not Just Any Difference (Primitive P06: Contrast Pair, second pairing)

Work Example 3, showing $f(n)=n\log n$ is neither polynomially smaller, exactly matching, nor polynomially larger than the watershed $n$ — the Master Theorem's basic form simply has NO case covering this gap. State the rule: "Case 1 and Case 3 require a genuine POLYNOMIAL gap (some fixed $\epsilon>0$) — a merely logarithmic difference is a real gap in the theorem's coverage, not automatically Case 3."

- **MC-1 hook**: this directly targets MC-1 (forcing a case based on a loose "bigger/smaller" comparison rather than the required polynomial-gap condition).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.85×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Given $T(n)=3T(n/2)+n$, identify $a,b,f(n)$, compute the watershed, and determine which Master Theorem case applies.
  2. Given $T(n)=T(n/2)+n$, determine which case applies and state the asymptotic solution.
  3. Given $T(n)=8T(n/2)+n^2$, determine which case applies and state the asymptotic solution.
  4. Explain, in one sentence, why the Master Theorem's cases require a POLYNOMIAL (not merely any) gap between $f(n)$ and the watershed.
- **P76 (Transfer Probe, mode = independence)**: "A matrix-multiplication algorithm recursively splits an $n\times n$ matrix multiplication into 7 subproblems of size $n/2$ (Strassen's algorithm), with $O(n^2)$ combine work: $T(n)=7T(n/2)+O(n^2)$. (a) Identify $a,b,f(n)$, compute the watershed $n^{\log_27}$ (note $\log_27\approx2.81$), and determine which Master Theorem case applies. (b) Compare this asymptotic result to the naive $O(n^3)$ matrix multiplication algorithm, and explain in one sentence why Strassen's recursive approach is asymptotically faster."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | POLYNOMIAL-GAP-REQUIREMENT-IGNORED | Assigning Case 1 or Case 3 based on a loose "bigger/smaller" comparison of $f(n)$ to the watershed, without checking the required strict polynomial gap | Foundational |
| MC-2 | WATERSHED-MISCOMPUTED-FROM-WRONG-PARAMETERS | Computing $n^{\log_ba}$ using the wrong values of $a$ or $b$, or confusing which is which, from the original recurrence | Foundational |
| MC-3 | MASTER-THEOREM-APPLIED-TO-NON-CONFORMING-RECURRENCE | Applying the Master Theorem to a recurrence not in the exact $T(n)=aT(n/b)+f(n)$ form (e.g. subproblems of unequal size, or additional terms) | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Polynomial Gap Requirement Ignored") → P41 (detect: present Example 3 and check whether Case 3 is (incorrectly) assigned) → P64 (conceptual shift: re-check the polynomial-gap condition explicitly, showing $n\log n$ is not $\Omega(n^{1+\epsilon})$ for any fixed $\epsilon>0$).
- **B02 (targets MC-2)**: P27 ("Watershed Miscomputed from Wrong Parameters") → P41 (detect: review a submitted watershed computation for swapped or incorrect $a,b$ values) → P64 (conceptual shift: re-derive by explicitly restating "$a$ = number of subproblems, $b$ = factor by which size shrinks" before recomputing $n^{\log_ba}$).
- **B03 (targets MC-3)**: P27 ("Master Theorem Applied to Non-Conforming Recurrence") → P41 (detect: present a recurrence with unequal-size subproblems and check whether the Master Theorem is applied anyway) → P64 (conceptual shift: verify the recurrence's exact form against $T(n)=aT(n/b)+f(n)$ before proceeding, flagging any structural mismatch).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.disc.recurrence-relation`, `math.alg.logarithm`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.disc.algorithm-complexity` (the broader analysis context this technique serves).

## Component 8 — Teaching Notes

- estimated_hours = 4 reflects that the Master Theorem's mechanical application (LO1, LO2) is moderately quick to learn, but correctly recognizing its LIMITS (LO3) requires genuine conceptual care this concept must build deliberately.
- MC-1 was ranked most severe because the polynomial-gap requirement is the single most commonly glossed-over detail in informal treatments of the Master Theorem, and Example 3's logarithmic-gap case is a realistic, commonly-encountered recurrence pattern (appearing in several real divide-and-conquer algorithms) where this shortcut genuinely fails.
- The Strassen's-algorithm transfer probe was deliberately chosen as a genuine, historically significant application (asymptotically faster matrix multiplication via a non-integer effective exponent $\log_27\approx2.81$) to demonstrate the Master Theorem's real practical payoff beyond textbook toy recurrences.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.disc.recurrence-relation`, `math.alg.logarithm`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO2/LO3, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
