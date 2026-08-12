# Teaching Blueprint: Strong Induction (`math.found.strong-induction`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.found.strong-induction` |
| name | Strong Induction |
| domain | Foundations |
| difficulty | developing |
| bloom | create |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 4 |
| requires | `math.found.proof-by-induction` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | A variant of induction in which the inductive step may use the truth of the statement for all values up to n, not just n alone. |
| related | `math.found.well-ordering-principle` |

## Component 1 — Learning Objectives

- LO1: State the strong-induction principle: to prove $P(n)$ for all $n\ge n_0$, prove the base case $P(n_0)$, then prove that $P(n_0),\ldots,P(n)$ ALL true together imply $P(n+1)$.
- LO2: Identify when ordinary (weak) induction's single prior case $P(n)$ is insufficient and the full range $P(n_0),\ldots,P(n)$ is genuinely needed to derive $P(n+1)$.
- LO3: Write a strong-induction proof for a recursively-structured claim (e.g. every integer $>1$ has a prime factorization) that fails under ordinary induction's single-prior-case assumption.

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.proof-by-induction` (the base case + inductive step skeleton; strong induction differs only in what the inductive step is allowed to assume).

## Component 3 — Core Explanation

**Strong induction** proves $P(n)$ for all $n\ge n_0$ by: (1) **Base case**: prove $P(n_0)$; (2) **Strong inductive step**: assuming $P(n_0), P(n_0+1),\ldots, P(n)$ are ALL true (the "strong" inductive hypothesis), prove $P(n+1)$. This differs from ordinary induction, which assumes only the single case $P(n)$ to derive $P(n+1)$.

Strong induction is genuinely necessary (not just a stylistic preference) whenever the natural recursive step for $n+1$ might depend on an EARLIER value other than $n$ itself — e.g. a recurrence like $a_{n}=a_{\lfloor n/2\rfloor}+1$ needs a value far below $n-1$. Strong and weak induction are logically equivalent in what they can prove (each can be derived from the other), but strong induction is often the natural PROOF STRATEGY when the recursive structure genuinely reaches back further than one step.

## Component 4 — Worked Examples

**Example 1 (LO1, LO3 — canonical strong-induction proof)**: Prove every integer $n\ge2$ has a prime factorization. Base case: $n=2$ is itself prime, so $2$ is its own (trivial) prime factorization. Strong inductive step: assume every integer $k$ with $2\le k\le n$ has a prime factorization; consider $n+1$. Either $n+1$ is prime (done, it is its own factorization), or $n+1=ab$ for integers $2\le a,b\le n$ — and by the STRONG hypothesis (covering all of $2,\ldots,n$, not just $n$ itself), both $a$ and $b$ already have prime factorizations, so $n+1$'s factorization is their combination. $\blacksquare$

**Example 2 (LO2 — why weak induction genuinely fails here, breaking MC-1)**: If only $P(n)$ (weak induction's single prior case) were assumed in Example 1, the case "$n+1=ab$" would be stuck: $a$ and $b$ are generally NOT equal to $n$ — they could be much smaller (e.g. $n+1=15=3\times5$, with $a=3,b=5$ both far below $n=14$) — so weak induction's single assumption $P(14)$ says nothing about $P(3)$ or $P(5)$. Only the STRONG hypothesis, covering the entire range $2,\ldots,n$, reaches $a$ and $b$ wherever they fall.

**Example 3 (LO1 — a second clean case, postage stamps)**: Prove every postage value $n\ge8$ (cents) can be made using only 3¢ and 5¢ stamps. Base cases: $8=3+5$, $9=3+3+3$, $10=5+5$. Strong inductive step: assume all values from 8 up to $n$ (for $n\ge10$) are achievable; for $n+1$, since $n+1-3\ge8$ (as $n\ge10$), by the strong hypothesis $n+1-3$ is achievable, so adding one more 3¢ stamp achieves $n+1$. $\blacksquare$

## Component 5 — Teaching Actions

### Teaching Action A01 — The Strong Hypothesis Reaches Back Further Than One Step (Primitive P64: Conceptual Shift)

Work Example 1 in full, pausing at the factorization step "$n+1=ab$" to highlight explicitly that $a,b$ are generally NOT $n$ itself, so only assuming ALL of $P(2),\ldots,P(n)$ (not just $P(n)$) makes the step valid.

- **MC-1 hook**: present Example 2's explicit breakdown ($15=3\times5$, both factors far below $14$) and ask the student whether weak induction's single hypothesis $P(14)$ alone would suffice (revealing MC-1: assuming any inductive step can always be rescued by the single immediately-prior case, regardless of the recursive structure's actual reach).

### Teaching Action A02 — Multiple Base Cases When the Step Reaches Back Several Places (Primitive P06: Contrast Pair)

Contrast Example 3's THREE base cases ($n=8,9,10$) against ordinary induction's usual single base case, explaining why: the inductive step here needs $n+1-3\ge8$ (the smallest valid postage value), which only holds once $n\ge10$ — so $n=8,9,10$ must each be separately verified before the general step takes over. State the rule: "when the inductive step reaches back a fixed distance (here, 3), enough base cases must be verified directly to 'seed' every value the step will ever look back to."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.75×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. State the strong-induction principle precisely, contrasting its inductive hypothesis with ordinary induction's.
  2. Prove by strong induction: every integer $n\ge2$ can be written as a sum of distinct powers of 2 (binary representation), explaining why the step for $n+1$ may need a value far below $n$.
  3. Determine, for the recurrence $a_n=a_{n-2}+a_{n-3}$ with given base values $a_0,a_1,a_2$, how many base cases must be directly verified before a strong-induction step can begin, and why.
  4. Explain in one sentence why strong and weak induction are logically equivalent in proving power, even though strong induction is the more natural CHOICE for certain recursive structures.
- **P76 (Transfer Probe, mode = independence)**: "A vending machine only accepts 4¢ and 7¢ tokens. (a) Determine, by direct search, the smallest value $N$ such that every integer amount $\ge N$ can be made using some combination of 4¢ and 7¢ tokens (you do not need the general Chicken McNugget formula — just verify small cases directly). (b) Using strong induction starting from $N$, explain — following Example 3's postage-stamp structure — exactly how many base cases above $N$ must be checked before the general inductive step (adding one 4¢ token to a smaller achievable amount) can take over, and why."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | SINGLE-PRIOR-CASE-ASSUMED-SUFFICIENT | Believing the single immediately-prior case $P(n)$ always suffices for the inductive step, missing that some recursive structures reach back to arbitrary earlier values | Foundational |
| MC-2 | BASE-CASE-COUNT-NOT-MATCHED-TO-STEP-REACH | Verifying only one base case regardless of how far back the inductive step actually reaches, leaving some small values un-seeded | Foundational |
| MC-3 | STRONG-AND-WEAK-INDUCTION-ASSUMED-DIFFERENT-IN-POWER | Believing strong induction can prove genuinely MORE statements than weak induction, rather than recognizing they are logically equivalent in what they can establish | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Single Prior Case Assumed Sufficient") → P41 (detect: present Example 1's factorization step and ask what $P(n)$ alone would need to say about $a$ and $b$) → P64 (conceptual shift: walk Example 2's explicit $15=3\times5$ breakdown, showing $P(14)$ says nothing about $P(3)$ or $P(5)$).
- **B02 (targets MC-2)**: P27 ("Base Case Count Not Matched to Step Reach") → P41 (detect: present the postage-stamp step "$n+1-3$" and ask how many base cases are needed before it's always valid) → P64 (conceptual shift: re-walk Example 3, showing $n=8,9,10$ are each needed since the step only reaches back exactly 3).
- **B03 (targets MC-3)**: P27 ("Strong/Weak Induction Assumed Unequal in Power") → P41 (detect: ask whether a statement provable by strong induction could, in principle, also be proved by (possibly more awkward) weak induction) → P64 (conceptual shift: sketch how strong induction's hypothesis can itself be proved by an auxiliary weak induction on a "conjunction up to $n$" statement, establishing the equivalence).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.proof-by-induction`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.found.well-ordering-principle` (an alternative formulation of the same underlying guarantee about $\mathbb{N}$, not yet authored in this domain pass).

## Component 8 — Teaching Notes

- estimated_hours = 4 (below direct/contradiction/contrapositive's 5-6) reflects that strong induction is a targeted VARIANT of an already-mastered technique (`math.found.proof-by-induction`), not a wholly new proof architecture.
- MC-1 and MC-2 are tied for foundational severity because both stem from the same root confusion — underestimating how far back a recursive structure reaches — manifesting respectively in the inductive step (MC-1) and the base cases (MC-2).
- The postage-stamp example (Example 3) was deliberately chosen over a single, more abstract example because it makes the "how far back does the step reach" question numerically concrete (exactly 3), directly supporting Teaching Action A02's contrast on base-case count.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.found.proof-by-induction`) |
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
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO3, Ex2→LO2, Ex3→LO1) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
