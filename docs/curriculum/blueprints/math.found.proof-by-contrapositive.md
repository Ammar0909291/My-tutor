# Teaching Blueprint: Proof by Contrapositive (`math.found.proof-by-contrapositive`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.found.proof-by-contrapositive` |
| name | Proof by Contrapositive |
| domain | Foundations |
| difficulty | developing |
| bloom | create |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.found.proof`, `math.found.logical-connectives` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | A proof of P→Q by instead proving ¬Q→¬P, exploiting the logical equivalence of a conditional and its contrapositive. |

## Component 1 — Learning Objectives

- LO1: Form the contrapositive $\neg Q\Rightarrow\neg P$ of a given conditional $P\Rightarrow Q$, correctly negating both parts.
- LO2: Prove $P\Rightarrow Q$ by directly proving $\neg Q\Rightarrow\neg P$ instead, citing the logical equivalence of a conditional and its contrapositive.
- LO3: Recognize when contrapositive is the natural choice — typically when $\neg Q$ gives a more concrete, algebraically-workable starting point than $P$ does.

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.proof` and `math.found.logical-connectives` (negation, and the equivalence $P\Rightarrow Q \equiv \neg Q\Rightarrow\neg P$ this technique exploits).

## Component 3 — Core Explanation

The **contrapositive** of $P\Rightarrow Q$ is $\neg Q\Rightarrow\neg P$. These two statements are logically EQUIVALENT — always the same truth value — so proving one proves the other. **Proof by contrapositive** proves $P\Rightarrow Q$ by instead directly proving $\neg Q\Rightarrow\neg P$ (assume $\neg Q$, derive $\neg P$ through a direct chain), which is often easier when negating $Q$ yields a cleaner algebraic hypothesis than $P$ itself provides.

This differs from proof by contradiction: contrapositive still proves a conditional statement directly (just a logically-equivalent one), with no explicit impossibility $R\land\neg R$ ever exhibited — it is structurally a direct proof of a DIFFERENT (but equivalent) conditional.

## Component 4 — Worked Examples

**Example 1 (LO1, LO2 — canonical case)**: Prove "if $n^2$ is even, then $n$ is even" ($P$: $n^2$ even; $Q$: $n$ even). Direct proof struggles ($n^2=2k\Rightarrow n=\sqrt{2k}$ is not obviously "even" — this is exactly Example 2's flaw from `math.found.direct-proof`). Instead prove the contrapositive $\neg Q\Rightarrow\neg P$: "if $n$ is odd, then $n^2$ is odd." Assume $n$ is odd, so $n=2k+1$. Then $n^2=(2k+1)^2=4k^2+4k+1=2(2k^2+2k)+1$, which is odd. Since $\neg Q\Rightarrow\neg P$ is proved, $P\Rightarrow Q$ holds. $\blacksquare$

**Example 2 (LO1 — correctly negating both parts, breaking MC-1)**: For $P\Rightarrow Q$ = "if $x>2$, then $x^2>4$," the contrapositive is "if $x^2\le4$, then $x\le2$" — negating STRICT $>$ to NON-STRICT $\le$ (not to $<$). A common error negates $x>2$ to $x<2$, silently dropping the boundary case $x=2$; the correct negation of "$x>2$" is "$x\le2$," which must include equality.

**Example 3 (LO3 — recognizing when contrapositive is the natural choice)**: For "if $ab$ is irrational, then $a$ or $b$ is irrational," the hypothesis $P$ ("$ab$ irrational") is hard to manipulate forward directly, while $\neg Q$ ("both $a$ and $b$ are rational") gives an immediate algebraic handle ($a=p/q$, $b=r/s\Rightarrow ab=pr/qs$, manifestly rational) — making contrapositive clearly preferable here over attempting a direct proof from $P$.

## Component 5 — Teaching Actions

### Teaching Action A01 — Form the Contrapositive, Then Prove It Directly (Primitive P64: Conceptual Shift)

Work Example 1 in full: first show the direct-proof attempt stalling (linking explicitly to the flaw registered in `math.found.direct-proof`'s Example 2), then form and prove the contrapositive cleanly. State the governing principle: "$P\Rightarrow Q$ and $\neg Q\Rightarrow\neg P$ are the SAME claim in different clothing — proving either proves both."

- **MC-1 hook**: ask the student to form the contrapositive of "if $x>2$, then $x^2>4$" and check whether they negate $>$ to $\le$ or incorrectly to $<$ (revealing MC-1: negating a strict inequality to another strict inequality, dropping the boundary case).

### Teaching Action A02 — Negating Both Parts Precisely, and Choosing Contrapositive Deliberately (Primitive P06: Contrast Pair)

**Contrast 1 (targets MC-1)**: Work Example 2's correct negation ($x>2\rightsquigarrow x\le2$) against the flawed one ($x>2\rightsquigarrow x<2$), showing the flawed version silently excludes $x=2$ from consideration. State the rule: "negating a strict inequality always produces a non-strict one, and vice versa — never forget the boundary."

**Contrast 2 (targets MC-2, LO3)**: Contrast Example 3 (contrapositive gives an immediate algebraic handle) against Example 1 revisited from `math.found.direct-proof` (direct proof was awkward there too) to reinforce: "reach for contrapositive when the NEGATED conclusion is easier to work with forward than the original hypothesis is."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.75×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Form the contrapositive of "if $n$ is prime and $n>2$, then $n$ is odd," negating both parts precisely.
  2. Prove by contrapositive: "if $3n+2$ is odd, then $n$ is odd."
  3. Given the conditional "if $x+y\ge10$, then $x\ge5$ or $y\ge5$," form its contrapositive and explain why it is easier to prove directly than the original.
  4. State the contrapositive of "if a quadrilateral is a square, then it is a rectangle," and verify it is a true statement (irrespective of whether the original is easy or hard to prove directly).
- **P76 (Transfer Probe, mode = independence)**: "A claim states: 'if a graph has more edges than $\binom{n}{2}-n+2$ (for $n$ vertices), then it is connected' — assume the details of this bound are correct for this task. (a) Form the contrapositive of this claim, negating both the edge-count condition and 'connected' precisely. (b) Explain, in general terms (without needing graph-theory machinery), why starting from 'the graph is DISCONNECTED' (the negated conclusion) might give a more concrete structural handle — e.g. a description of two separate components — than starting from the original edge-count hypothesis."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | STRICT-INEQUALITY-NEGATED-TO-STRICT | Negating $>$ to $<$ (or $<$ to $>$) instead of the correct non-strict form ($\le$ or $\ge$), silently dropping the boundary case | Foundational |
| MC-2 | CONTRAPOSITIVE-CONFUSED-WITH-CONVERSE | Forming $Q\Rightarrow P$ (the converse, NOT logically equivalent to $P\Rightarrow Q$) instead of $\neg Q\Rightarrow\neg P$ (the true contrapositive) | Foundational |
| MC-3 | CONTRAPOSITIVE-CHOSEN-WITHOUT-CAUSE | Reaching for contrapositive by default/habit rather than recognizing the specific structural cue (negated conclusion gives an easier forward handle) that motivates the choice | Minor |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Strict Inequality Negated to Strict") → P41 (detect: present Example 2's task and check whether $\le$ or $<$ is produced) → P64 (conceptual shift: enumerate the number line for $x>2$ vs. its true complement $x\le2$, showing $x=2$ belongs to the complement).
- **B02 (targets MC-2)**: P27 ("Contrapositive Confused with Converse") → P41 (detect: ask the student to state the contrapositive of a simple conditional; check if $Q\Rightarrow P$ is produced instead of $\neg Q\Rightarrow\neg P$) → P64 (conceptual shift: display all four related statements — conditional, converse, inverse, contrapositive — side by side for one example, marking only the contrapositive as logically equivalent to the original).
- **B03 (targets MC-3)**: P27 ("Contrapositive Chosen Without Cause") → P41 (detect: ask the student to justify, in one sentence, WHY contrapositive was chosen for a given problem) → P64 (re-walk Example 3, naming the specific structural cue — negated conclusion gives an immediate algebraic handle — that justified the choice).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.proof`, `math.found.logical-connectives`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.found.direct-proof` (Example 1 here directly references and resolves that blueprint's own flawed-attempt example), `math.found.proof-by-contradiction`.

## Component 8 — Teaching Notes

- estimated_hours = 5 (slightly less than direct proof and contradiction's 6) reflects that once the contrapositive is correctly formed, the remaining proof work is structurally identical to a direct proof already mastered — the genuinely new cognitive load is confined to LO1's negation step.
- MC-1 and MC-2 are both foundational because each produces a LOGICALLY DIFFERENT statement than intended: MC-1's dropped boundary case can make the "proved" contrapositive strictly weaker than needed; MC-2's converse is not equivalent to the original at all, so "proving" it proves nothing about $P\Rightarrow Q$.
- Example 1 was deliberately chosen to be the SAME statement flagged as a direct-proof failure in `math.found.direct-proof`'s own Component 4 (Example 2) — reused by explicit cross-reference rather than re-derived, demonstrating concretely why this technique exists as a distinct tool.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.found.proof`, `math.found.logical-connectives`) |
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
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO1, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
