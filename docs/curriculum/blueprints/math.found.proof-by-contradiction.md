# Teaching Blueprint: Proof by Contradiction (`math.found.proof-by-contradiction`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.found.proof-by-contradiction` |
| name | Proof by Contradiction |
| domain | Foundations |
| difficulty | developing |
| bloom | create |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 6 |
| requires | `math.found.proof`, `math.found.logical-connectives` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) | 
| description (KG) | A proof technique that assumes the negation of the statement to be proved and derives a contradiction, thereby establishing the original statement. |

## Component 1 — Learning Objectives

- LO1: Write a proof by contradiction: assume $\neg Q$ (the negation of the target statement), derive a logical contradiction (a statement $R\land\neg R$), and conclude $Q$ must be true.
- LO2: Correctly negate a compound or quantified statement as the starting assumption (e.g. negating "$\sqrt2$ is irrational" to "$\sqrt2$ is rational, i.e. $\sqrt2=a/b$ in lowest terms").
- LO3: Distinguish a genuine contradiction (two statements that cannot both be true) from a merely surprising or unwanted — but not actually contradictory — result.

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.proof` and `math.found.logical-connectives` (negation $\neg$ and conjunction $\land$, needed to state "$R\land\neg R$" precisely).

## Component 3 — Core Explanation

**Proof by contradiction** proves $Q$ by assuming $\neg Q$ and showing this assumption leads logically to some statement $R$ that is simultaneously also false ($\neg R$) — an impossible state $R\land\neg R$. Since assuming $\neg Q$ produces an impossibility, $\neg Q$ cannot be true, so $Q$ must be true. Symbolically: $(\neg Q\Rightarrow(R\land\neg R))\Rightarrow Q$.

This differs from direct proof by starting from the OPPOSITE of the goal rather than the hypothesis, and differs from proof by contrapositive (which proves $\neg Q\Rightarrow\neg P$ for a conditional $P\Rightarrow Q$, never invoking an actual contradiction) in that contradiction always ends by exhibiting an explicit impossibility.

## Component 4 — Worked Examples

**Example 1 (LO1, LO2 — the classical case)**: Prove "$\sqrt2$ is irrational." Assume the negation: $\sqrt2$ is rational, so $\sqrt2=a/b$ for integers $a,b$ with no common factor (lowest terms). Squaring: $2=a^2/b^2 \Rightarrow a^2=2b^2$, so $a^2$ is even, so $a$ is even (by the even-square lemma), so $a=2k$. Substituting: $(2k)^2=2b^2\Rightarrow 4k^2=2b^2\Rightarrow b^2=2k^2$, so $b^2$ is even, so $b$ is even. But then both $a$ and $b$ are even, **contradicting** the assumption that $a/b$ was in lowest terms (no common factor). Since assuming $\sqrt2$ rational led to a contradiction, $\sqrt2$ is irrational. $\blacksquare$

**Example 2 (LO3 — surprising vs. genuinely contradictory, breaking MC-1)**: A student, attempting to prove "there is no largest prime," assumes a largest prime $p$ exists, and computes $N=p!+1$, finding $N$ is a very large number. Simply being "large" or "unusual" is NOT a contradiction — the actual contradiction requires showing $N$ has a prime factor greater than $p$ (since $N$ is not divisible by any prime $\le p$, by construction, yet must have SOME prime factor), directly contradicting "$p$ is the largest prime." Size alone proves nothing; the contradiction must be a genuine logical impossibility.

**Example 3 (LO2 — correctly negating a quantified statement)**: To disprove-by-contradiction the claim "every integer $n>1$ has a prime factor $\le\sqrt n$" one must assume its precise negation: "there exists an integer $n>1$ with NO prime factor $\le\sqrt n$" — not the vaguer "some integers don't have prime factors," which misstates what is actually being negated (the bound $\le\sqrt n$, not the existence of a prime factor at all).

## Component 5 — Teaching Actions

### Teaching Action A01 — Assume the Negation, Chase It to an Impossibility (Primitive P64: Conceptual Shift)

Work Example 1 in full, pausing explicitly at the moment the contradiction emerges ("both $a$ and $b$ even" vs. "chosen in lowest terms") and naming it: "this is the impossibility — two statements that cannot both hold."

- **MC-1 hook**: present Example 2's largest-prime sketch and ask the student to identify exactly what the contradiction is (revealing MC-1: accepting "the number got large/weird" as sufficient, rather than pinpointing the specific two mutually-exclusive statements).

### Teaching Action A02 — Precise Negation of the Target Statement (Primitive P06: Contrast Pair)

Contrast a correct negation (Example 1's "$\sqrt2=a/b$ in lowest terms," Example 3's precise quantified negation) against a vague or incorrect one (e.g. negating "some integers don't have prime factors" instead of Example 3's precise form). State the rule: "before chasing a contradiction, write the negation with the same precision as the original claim — an imprecise negation chases the wrong impossibility."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.75×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. Write the precise negation used as the starting assumption to prove "there is no smallest positive rational number" by contradiction.
  2. Prove by contradiction: "if $n^2$ is odd, then $n$ is odd" (assume $n$ even, derive $n^2$ even, contradicting the hypothesis).
  3. Given a partially-worked contradiction proof, identify the exact two statements ($R$ and $\neg R$) that constitute the contradiction.
  4. Explain, for the claim "the sum of a rational and an irrational number is irrational," why assuming the sum IS rational (rather than assuming the irrational number is rational) is the correct starting negation.
- **P76 (Transfer Probe, mode = independence)**: "A game-theory argument claims: 'in this game, no strategy can guarantee a win for the second player.' A proof by contradiction is attempted by assuming a winning strategy $S$ exists for the second player. (a) Outline, in general terms, what kind of impossibility the proof would need to derive from the existence of $S$ to complete the contradiction (it need not be a real, verified game argument). (b) Explain why merely showing $S$ 'seems complicated' or 'requires many steps' would NOT constitute a valid contradiction, connecting this to Example 2's largest-prime lesson."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | SURPRISE-MISTAKEN-FOR-CONTRADICTION | Treating an unusual, large, or complicated intermediate result as itself a contradiction, without identifying the specific pair of mutually exclusive statements | Foundational |
| MC-2 | NEGATION-STATED-IMPRECISELY | Negating the target claim vaguely or incorrectly rather than with the same logical precision as the original statement, especially for quantified or compound claims | Foundational |
| MC-3 | HYPOTHESIS-DROPPED-DURING-DERIVATION | Losing track of the original hypothesis $P$ partway through the contradiction chain, deriving a contradiction unrelated to the actual assumption made | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Surprise Mistaken for Contradiction") → P41 (detect: present Example 2's sketch and ask the student to state the contradiction in the form "$R$ and not-$R$") → P64 (conceptual shift: walk the full largest-prime argument, explicitly naming $R$ = "$N$ has a prime factor $>p$" and $\neg R$ = "$p$ is the largest prime, so no prime exceeds it").
- **B02 (targets MC-2)**: P27 ("Imprecise Negation") → P41 (detect: ask the student to state the negation of a quantified claim like Example 3's and check for imprecision) → P64 (conceptual shift: re-derive the negation symbol-by-symbol, swapping $\forall\leftrightarrow\exists$ and negating the inner predicate exactly).
- **B03 (targets MC-3)**: P27 ("Hypothesis Dropped Mid-Derivation") → P41 (detect: review a submitted contradiction proof and check whether the final contradiction actually traces back to the assumed negation) → P64 (re-walk Example 1, tracing every line back to the initial assumption "$\sqrt2=a/b$ in lowest terms").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.proof`, `math.found.logical-connectives`.
- **Unlocks**: none recorded in the KG.
- **Related**: `math.found.direct-proof`, `math.found.proof-by-contrapositive` (siblings; this concept's Teaching Notes below justify why $\sqrt2$'s irrationality is the canonical choice over these alternatives).

## Component 8 — Teaching Notes

- estimated_hours = 6 mirrors `math.found.direct-proof`'s allocation; both require generating a full multi-step justified chain, with contradiction's added cognitive load of correctly negating the target first.
- MC-1 and MC-2 are tied for foundational severity because each independently invalidates the entire proof: MC-1 means no real contradiction was ever found; MC-2 means the wrong claim was even being chased.
- $\sqrt2$'s irrationality was chosen as the canonical example (rather than, e.g., the infinitude of primes, used instead in Example 2 as a secondary illustration) because its contradiction (both $a,b$ even, violating "lowest terms") is unusually crisp and requires no separate lemma beyond `math.found.direct-proof`'s own even-square result — reinforcing that concept by reference rather than duplicating its derivation.

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
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO3, Ex3→LO2) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
