# Teaching Blueprint: Continued Fractions (`math.nt.continued-fractions`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.nt.continued-fractions` |
| name | Continued Fractions |
| domain | Number Theory |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 6 |
| requires | `math.nt.euclidean-algorithm`, `math.seq.convergent` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — computing the continued fraction expansion of one specific rational number before naming the general representation |
| description (KG) | Representations of real numbers as nested fractions $a_0+\dfrac{1}{a_1+\dfrac{1}{a_2+\cdots}}$; rational numbers terminate; quadratic irrationals have periodic CFs. |

## Component 1 — Learning Objectives

- LO1: Compute the continued fraction expansion $a_0+\cfrac{1}{a_1+\cfrac{1}{a_2+\cdots}}$ of a RATIONAL number by REPEATEDLY applying `math.nt.euclidean-algorithm`'s own "replace $(a,b)$ with $(b,a\bmod b)$" division process — recognizing the continued fraction algorithm as the Euclidean algorithm's steps, recorded as coefficients rather than merely computing a final GCD.
- LO2: Recognize that a continued fraction TERMINATES if and only if the original number is RATIONAL — directly because `math.nt.euclidean-algorithm`'s repeated division process itself terminates in finitely many steps precisely for rational inputs (reaching remainder $0$), while an IRRATIONAL number's expansion continues forever.
- LO3 (orientation level — full periodicity-theorem proof deferred): recognize, without full derivation, that QUADRATIC IRRATIONALS (numbers like $\sqrt2$, roots of quadratics with integer coefficients) have EVENTUALLY PERIODIC continued fraction expansions — a genuinely surprising structural fact, connecting to `math.seq.convergent`'s own $\varepsilon$-$N$ convergence machinery for making sense of what an infinite continued fraction actually CONVERGES to.

## Component 2 — Prerequisite Check

Assumes mastery of `math.nt.euclidean-algorithm` (computing $\gcd(a,b)$ by repeatedly replacing $(a,b)$ with $(b,a\bmod b)$) and `math.seq.convergent` (the $\varepsilon$-$N$ definition of a sequence converging to a limit $L$).

## Component 3 — Core Explanation

**The continued fraction algorithm IS the Euclidean algorithm, with coefficients recorded**: `math.nt.euclidean-algorithm` computes $\gcd(a,b)$ by repeatedly dividing and taking remainders, DISCARDING the quotients along the way, keeping only the final GCD. The continued fraction expansion of $a/b$ instead RECORDS those discarded quotients as the coefficients $a_0,a_1,a_2,\dots$: at each step, write $\frac{a}{b}=a_0+\frac{1}{b/r}$ where $a_0=\lfloor a/b\rfloor$ (the Euclidean algorithm's quotient) and $r$ is the remainder — then repeat the SAME division process on $b/r$. This is not a separate algorithm; it is the Euclidean algorithm's own division steps, with the quotients kept instead of thrown away.

**A continued fraction terminates exactly when the number is rational — directly from the Euclidean algorithm's own termination**: `math.nt.euclidean-algorithm` is guaranteed to terminate in finitely many steps for ANY rational starting pair $(a,b)$ (remainders strictly decrease, eventually reaching $0$). Since the continued fraction expansion IS this same division process, it INHERITS this termination guarantee: a RATIONAL number's continued fraction expansion is always FINITE, terminating exactly when the Euclidean algorithm would reach remainder $0$. An IRRATIONAL number, having no such "exact division" structure, produces an INFINITE continued fraction that never terminates.

**Quadratic irrationals have eventually periodic expansions — a genuinely deep structural fact (orientation level)**: while a general irrational number's continued fraction expansion can look essentially "random" (no discernible pattern in its coefficients), numbers that are roots of QUADRATIC equations with integer coefficients (like $\sqrt2$, $\sqrt3$, the golden ratio $\phi$) have expansions that EVENTUALLY REPEAT periodically — a striking, non-obvious structural theorem (Lagrange's theorem on continued fractions). Making sense of what the INFINITE nested expression actually converges TO requires `math.seq.convergent`'s own $\varepsilon$-$N$ machinery, applied to the sequence of successive finite "convergents" (truncations) of the infinite expansion. Full proof of the periodicity theorem is deferred beyond this concept's core scope.

## Component 4 — Worked Examples

**Example 1 (LO1 — the continued fraction algorithm as recorded Euclidean-algorithm quotients, breaking MC-1)**: for $\frac{67}{29}$: applying `math.nt.euclidean-algorithm`'s division steps while RECORDING each quotient: $67=2\times29+9$ (quotient $a_0=2$, remainder $9$); $29=3\times9+2$ (quotient $a_1=3$, remainder $2$); $9=4\times2+1$ (quotient $a_2=4$, remainder $1$); $2=2\times1+0$ (quotient $a_3=2$, remainder $0$ — the Euclidean algorithm terminates here, confirming $\gcd(67,29)=1$). Recording the quotients $2,3,4,2$ gives the continued fraction $67/29=2+\cfrac{1}{3+\cfrac{1}{4+\cfrac{1}{2}}}$ — the EXACT SAME division steps as the Euclidean algorithm, just tracked as coefficients rather than reduced to a single GCD.

**Example 2 (LO2 — termination directly tied to rationality, breaking MC-2)**: Example 1's continued fraction for $\frac{67}{29}$ TERMINATED after 4 steps, EXACTLY when `math.nt.euclidean-algorithm`'s own division process reached remainder $0$ — a direct consequence of $67/29$ being rational. Contrast with $\sqrt2$: computing its continued fraction expansion (using $\sqrt2=1+(\sqrt2-1)$, then repeatedly taking reciprocals and floors) gives $a_0=1,a_1=2,a_2=2,a_3=2,\dots$ — continuing FOREVER with no termination, precisely because $\sqrt2$ is irrational and no finite division process can exactly reduce it to a zero remainder.

**Example 3 (LO3, orientation level — $\sqrt2$'s periodic pattern and convergents, breaking MC-3)**: Example 2's expansion for $\sqrt2$, $[1;2,2,2,2,\dots]$, is EVENTUALLY PERIODIC (in fact immediately periodic, with period $1$: the coefficient $2$ repeating forever) — a specific instance of the general quadratic-irrational periodicity fact, since $\sqrt2$ is a root of $x^2-2=0$. Truncating this infinite expansion at successive points gives the CONVERGENTS: $1,\;1+\frac12=\frac32=1.5,\;1+\cfrac{1}{2+\frac12}=\frac75\approx1.4,\;\frac{17}{12}\approx1.4167,\dots$ — a sequence that, via `math.seq.convergent`'s own $\varepsilon$-$N$ definition, genuinely CONVERGES to $\sqrt2\approx1.41421$, getting closer with each additional term, giving precise meaning to what the infinite nested expression "equals."

## Component 5 — Teaching Actions

### Teaching Action A01 — Continued Fractions Record What the Euclidean Algorithm Discards (Primitive P11: Representation Shift)

State: "you're not learning a new algorithm from scratch — the continued fraction expansion is exactly the Euclidean algorithm's own division steps, with the quotients WRITTEN DOWN instead of thrown away once you have the GCD." Walk Example 1's parallel computation of $67/29$'s continued fraction alongside the Euclidean algorithm steps.

- **MC-1 hook**: ask "is computing a continued fraction expansion a separate algorithm, unrelated to the Euclidean algorithm's own division process?" — a "yes" answer reveals MC-1 (missing that continued fractions record exactly the Euclidean algorithm's own discarded quotients).

### Teaching Action A02 — Termination and Rationality Are the Same Fact, Viewed Two Ways (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: $67/29$'s expansion terminated (rational), while $\sqrt2$'s continued forever (irrational) — a direct, exceptionless correspondence. State: "a continued fraction terminating isn't a separate property to check — it's the SAME fact as the number being rational, inherited directly from the Euclidean algorithm's own guaranteed termination for rational inputs."

- **MC-2 hook**: ask "is it possible for a continued fraction expansion to terminate even though the original number is irrational, or to continue forever even though the number is rational?" — a "yes" answer reveals MC-2 (missing that termination and rationality are the exact same fact, inherited from the Euclidean algorithm's own termination behavior).

### Teaching Action A03 — Quadratic Irrationals' Periodicity Is a Genuinely Special, Non-Universal Structural Fact (Primitive P06: Contrast Pair)

Contrast $\sqrt2$'s CLEANLY periodic expansion (Example 3, period $1$) against a "generic" irrational number, whose continued fraction expansion has NO discernible repeating pattern at all. State: "periodicity isn't automatic for every irrational number — it's a special structural property specifically tied to being a root of a QUADRATIC equation with integer coefficients, a genuinely deep and non-obvious theorem."

- **MC-3 hook**: ask "does every irrational number's continued fraction expansion eventually become periodic, the same way $\sqrt2$'s does?" — a "yes" answer reveals MC-3 (missing that periodicity is a special property of quadratic irrationals specifically, not a universal feature of all irrational continued fractions).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Compute the continued fraction expansion of $\frac{43}{19}$, showing each Euclidean-algorithm division step alongside the recorded quotient.
  2. Explain why your answer to problem 1 is guaranteed to terminate, citing the connection to the Euclidean algorithm.
  3. Compute the first 3 coefficients of $\sqrt3$'s continued fraction expansion (using $\sqrt3=1+(\sqrt3-1)$ as the starting point, then repeatedly taking reciprocals and floors).
  4. Explain, without full proof, why $\sqrt3$'s continued fraction expansion is expected to be eventually periodic, while a "generic" irrational number's expansion is not.
- **P76 (Transfer Probe, mode = independence)**: "A cryptographic algorithm relies on continued fraction expansions of rational approximations to break certain RSA-related weaknesses (the Wiener attack), specifically exploiting the FINITE, computable nature of a rational number's expansion. (a) Explain, citing the direct connection to the Euclidean algorithm, why a rational approximation's continued fraction expansion is guaranteed to be computable in finitely many steps. (b) If the underlying true value being approximated were actually irrational rather than rational, explain what would happen to the continued fraction computation, and why this matters for the algorithm's practical termination. (c) A colleague suggests that since $\sqrt2$ has such a clean periodic pattern, ALL square roots of integers must have similarly simple periodic continued fractions — evaluate this claim, distinguishing which numbers this periodicity fact actually applies to."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | CONTINUED-FRACTION-ASSUMED-SEPARATE-ALGORITHM | Believing computing a continued fraction expansion is a separate algorithm unrelated to the Euclidean algorithm, missing that it records exactly the Euclidean algorithm's own discarded quotients | Foundational |
| MC-2 | TERMINATION-ASSUMED-INDEPENDENT-OF-RATIONALITY | Believing a continued fraction could terminate for an irrational number or continue forever for a rational one, missing that termination and rationality are the exact same fact | High |
| MC-3 | PERIODICITY-ASSUMED-UNIVERSAL-FOR-IRRATIONALS | Believing every irrational number's continued fraction expansion eventually becomes periodic, missing that periodicity is special to quadratic irrationals specifically | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Continued Fraction Assumed Separate Algorithm") → P41 (detect: ask whether computing a continued fraction is a separate algorithm unrelated to the Euclidean algorithm) → P64 (conceptual shift: re-walk Example 1's parallel Euclidean-algorithm/continued-fraction computation, re-anchoring on "continued fractions record exactly the Euclidean algorithm's own discarded quotients").
- **B02 (targets MC-2)**: P27 (name it: "Termination Assumed Independent of Rationality") → P41 (detect: ask whether termination and rationality could come apart) → P64 (conceptual shift: re-walk Example 2's terminating-versus-infinite contrast, re-anchoring on "termination and rationality are the exact same fact").
- **B03 (targets MC-3)**: P27 (name it: "Periodicity Assumed Universal for Irrationals") → P41 (detect: ask whether every irrational number's expansion eventually becomes periodic) → P64 (conceptual shift: re-walk Example 3's quadratic-irrational-specific periodicity, re-anchoring on "periodicity is special to quadratic irrationals, not universal").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.nt.euclidean-algorithm` (the repeated-division process this concept's coefficients directly record) and `math.seq.convergent` (the $\varepsilon$-$N$ convergence definition needed to make sense of an infinite continued fraction's convergents).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: none listed in the KG for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 6 with an advanced/apply tag supports the "3 TAs + gate" tier, with LO1 and LO2 given full computational depth (the parallel Euclidean-algorithm computation and the terminating-versus-infinite contrast) and LO3 kept orientation-level, appropriately surveying the periodicity theorem and convergents without proving Lagrange's theorem in full.
- **Division of labor**: `math.nt.euclidean-algorithm` owns the general repeated-division process; `math.seq.convergent` owns the general $\varepsilon$-$N$ convergence definition. This concept owns COMBINING these: recording Euclidean-algorithm quotients as continued fraction coefficients, and applying convergence machinery to make sense of infinite expansions — deliberately choosing $67/29$ (a moderately sized rational, requiring exactly 4 genuine division steps) so the parallel with the Euclidean algorithm is fully hand-verifiable without excessive computation.
- Example 3's deliberate choice of $\sqrt2$ (the simplest, most immediately period-1 quadratic irrational) was chosen to make the periodicity phenomenon and the convergents' approach toward the true value both maximally transparent, before Teaching Action A03 explicitly warns this periodicity does not generalize to all irrationals.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (none listed in KG) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: computing one specific rational's expansion precedes the general representation and periodicity theory) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
