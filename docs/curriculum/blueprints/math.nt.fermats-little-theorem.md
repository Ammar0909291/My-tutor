# Teaching Blueprint: Fermat's Little Theorem (`math.nt.fermats-little-theorem`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.nt.fermats-little-theorem` |
| name | Fermat's Little Theorem |
| domain | Number Theory |
| difficulty | advanced |
| bloom | understand |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.nt.modular-arithmetic`, `math.nt.prime-number` |
| unlocks | `math.nt.eulers-theorem`, `math.nt.primality-testing` |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — verifying the pattern numerically for a small prime before the general statement |
| description (KG) | If p is prime and p ∤ a, then aᵖ⁻¹ ≡ 1 (mod p); fundamental to primality testing and RSA cryptography. |

## Component 1 — Learning Objectives

- LO1: State **Fermat's Little Theorem**: if $p$ is prime and $p\nmid a$ (i.e., $p$ does NOT divide $a$), then $a^{p-1}\equiv1\pmod p$ — and verify this directly for small examples.
- LO2: Correctly identify that the theorem's hypothesis **$p\nmid a$ is essential** — if $p$ divides $a$ (i.e., $a\equiv0\pmod p$), the conclusion $a^{p-1}\equiv1$ genuinely FAILS (since $a^{p-1}\equiv0\pmod p$ instead, not 1) — and correctly check this hypothesis before applying the theorem.
- LO3: Apply the theorem to efficiently compute $a^k\bmod p$ for LARGE exponents $k$, by reducing $k$ modulo $(p-1)$ first (using the theorem's periodicity), avoiding a direct, infeasibly large computation.

## Component 2 — Prerequisite Check

Assumes mastery of `math.nt.modular-arithmetic` (arithmetic on residues, and the notion of a multiplicative inverse existing precisely when $\gcd(a,n)=1$ — directly relevant since $p\nmid a$ for prime $p$ is exactly the condition $\gcd(a,p)=1$) and `math.nt.prime-number` (the definition of primality).

## Component 3 — Core Explanation

**Fermat's Little Theorem**: if $p$ is prime and $p\nmid a$ (equivalently, $\gcd(a,p)=1$, since $p$'s only divisors are 1 and itself), then:
$$a^{p-1} \equiv 1 \pmod p$$

**Why $p\nmid a$ is essential**: if $p$ DOES divide $a$ (i.e., $a\equiv0\pmod p$), then $a^{p-1}\equiv0^{p-1}=0\pmod p$ — genuinely NOT 1 (assuming $p-1\geq1$, i.e. $p\geq2$, always true for primes). The theorem's conclusion straightforwardly fails when the hypothesis is violated — this isn't a subtle edge case to worry about abstractly, it's a directly checkable, immediate failure.

**Practical use — reducing large exponents**: since $a^{p-1}\equiv1\pmod p$, it follows that $a^{p-1+k}\equiv a^k\pmod p$ for ANY additional exponent $k$ — i.e., the sequence of powers $a^1,a^2,a^3,\ldots\pmod p$ is eventually PERIODIC with period dividing $p-1$. This means to compute $a^N\bmod p$ for a huge exponent $N$, you can first reduce $N$ modulo $(p-1)$ (getting a much smaller equivalent exponent $r$, with $0\leq r<p-1$), then compute the far more manageable $a^r\bmod p$ instead — giving the SAME answer as the original (infeasibly large) computation.

## Component 4 — Worked Examples

**Example 1 (LO1 — verifying the theorem directly)**: For $p=7$, $a=3$ (check $7\nmid3$, satisfied): compute $3^{6}\bmod7$. $3^1=3$, $3^2=9\equiv2$, $3^3=3\times2=6$, $3^4=3\times6=18\equiv4$, $3^5=3\times4=12\equiv5$, $3^6=3\times5=15\equiv1\pmod7$. Confirmed: $3^{p-1}=3^6\equiv1\pmod7$, exactly as the theorem predicts.

**Example 2 (LO2 — hypothesis violated, genuine failure, breaking MC-1)**: For $p=7$, $a=14$ (note $7\mid14$, VIOLATING $p\nmid a$): compute $14^6\bmod7$. Since $14\equiv0\pmod7$, $14^6\equiv0^6=0\pmod7$ — genuinely NOT 1. This directly confirms that when the hypothesis $p\nmid a$ fails, the theorem's conclusion fails too — not merely "the theorem doesn't apply, so who knows," but a definite, computable, DIFFERENT result (0, not 1).

**Example 3 (LO3 — reducing a large exponent via periodicity)**: Compute $3^{100}\bmod7$. Since $p-1=6$, reduce the exponent $100\bmod6$: $100=6(16)+4$, so $100\equiv4\pmod6$. By Fermat's Little Theorem's periodicity, $3^{100}\equiv3^4\pmod7$. From Example 1's computation, $3^4\equiv4\pmod7$. So $3^{100}\equiv4\pmod7$ — computed via a small, manageable exponent (4) instead of the infeasible direct approach of actually computing $3^{100}$ (an enormous number) and then reducing.

## Component 5 — Teaching Actions

### Teaching Action A01 — Verifying the Theorem, and the Essential Hypothesis (Primitive P11: Representation Shift)

Start concrete: work Example 1's full power sequence for $p=7,a=3$ by hand, computing each power modulo 7 step by step, landing on 1 exactly at the 6th power. State: "this ALWAYS happens for prime $p$ and $a$ not divisible by $p$ — that's Fermat's Little Theorem."

Shift representation to the hypothesis-violation case: work Example 2's direct computation showing $14^6\equiv0\pmod7$ when $7\mid14$ — a genuinely different, computable outcome.

- **MC-1 hook**: ask "does $a^{p-1}\equiv1\pmod p$ hold for EVERY integer $a$ and prime $p$, or only under a specific condition?" — an answer suggesting it holds universally (without the $p\nmid a$ qualifier) reveals MC-1 (forgetting or overlooking the essential divisibility hypothesis).

### Teaching Action A02 — Reducing Large Exponents via Periodicity (Primitive P06: Contrast Pair)

**Contrast 1 (targets MC-1)**: Place Example 1 ($p\nmid a$, conclusion holds, $\equiv1$) directly beside Example 2 ($p\mid a$, conclusion genuinely fails, $\equiv0$ instead) — state the rule with full precision: "ALWAYS check $p\nmid a$ FIRST — if $p$ divides $a$, the theorem doesn't apply, and in fact you can directly compute $a^{p-1}\equiv0$, a completely different outcome."

**Contrast 2**: Work Example 3's exponent-reduction procedure explicitly, contrasting the INFEASIBLE direct approach (literally computing $3^{100}$, an enormous 48-digit number, before reducing) against the EFFICIENT theorem-based approach (reduce the exponent modulo $p-1$ FIRST, then compute a small power) — state: "this is exactly the computational trick that makes modular exponentiation practical for cryptographic-scale numbers — reduce the EXPONENT using Fermat's theorem before ever computing the (otherwise astronomically large) power directly."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Verify Fermat's Little Theorem directly for $p=5$, $a=2$ (compute $2^4\bmod5$).
  2. For $p=5$, $a=10$ (note $5\mid10$), compute $10^4\bmod5$ directly, and explain why this does NOT contradict Fermat's Little Theorem.
  3. Using exponent reduction, compute $2^{53}\bmod11$ (hint: reduce 53 modulo $11-1=10$ first).
  4. Explain, in your own words, why checking $p\nmid a$ is a required first step before applying Fermat's Little Theorem, using a specific example where skipping this check would give a wrong prediction.
- **P76 (Transfer Probe, mode = independence)**: "An RSA-style cryptographic system needs to compute $7^{1{,}000{,}003} \bmod 13$ as part of a key-generation step — computing $7^{1{,}000{,}003}$ directly (as an actual enormous number) before reducing would be computationally infeasible. (a) Using Fermat's Little Theorem, explain how to reduce this problem to a MUCH smaller, directly computable exponent (hint: $13-1=12$; find $1{,}000{,}003\bmod12$). (b) Verify that $\gcd(7,13)=1$ (i.e., $13\nmid7$) BEFORE applying the theorem, and explain why this check is a required first step, not an optional formality, referencing what would go wrong if the base and modulus shared a common factor instead."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | HYPOTHESIS-P-DOES-NOT-DIVIDE-A-OVERLOOKED | Applying Fermat's Little Theorem's conclusion without first checking that $p$ does not divide $a$, overlooking that the conclusion genuinely fails (giving 0, not 1) when this hypothesis is violated | Foundational |
| MC-2 | LARGE-EXPONENT-COMPUTED-DIRECTLY-WITHOUT-REDUCTION | Attempting to compute $a^N\bmod p$ for a large $N$ by direct computation rather than first reducing the exponent modulo $p-1$ using the theorem's periodicity | Moderate |
| MC-3 | EXPONENT-REDUCED-MODULO-P-INSTEAD-OF-P-MINUS-1 | When reducing a large exponent, mistakenly reducing modulo $p$ rather than the correct $p-1$ (the actual period established by the theorem) | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "P-Divides-A Hypothesis Overlooked") → P41 (detect: present $a=14,p=7$ and ask if $a^{p-1}\equiv1\pmod p$ should hold, checking whether the student verifies $p\nmid a$ first) → P64 (conceptual shift: compute $14^6\bmod7$ directly, showing the actual result is 0, not 1, confirming the hypothesis's necessity).
- **B02 (targets MC-2)**: P27 (name it: "Direct Large-Exponent Computation") → P41 (detect: present a large-exponent modular computation and check whether the student attempts direct computation instead of exponent reduction) → P64 (conceptual shift: re-anchor on "reduce the EXPONENT modulo $p-1$ first — this is always valid by the theorem's periodicity, and turns an infeasible computation into a trivial one").
- **B03 (targets MC-3)**: P27 (name it: "Wrong Modulus for Exponent Reduction") → P41 (detect: check whether a student reduces the exponent modulo $p$ instead of $p-1$) → P64 (conceptual shift: re-derive from the theorem's own statement — the period is $p-1$ (since $a^{p-1}\equiv1$ is what repeats), not $p$ itself).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.nt.modular-arithmetic` (the residue arithmetic this theorem's congruence is stated in, and the $\gcd(a,n)=1$ criterion directly relevant to the $p\nmid a$ hypothesis), `math.nt.prime-number` (the primality of $p$, essential to the theorem's statement).
- **Unlocks**: `math.nt.eulers-theorem` (Euler's Theorem generalizes this result to composite moduli, using Euler's totient function in place of $p-1$), `math.nt.primality-testing` (Fermat's Little Theorem is the basis of the Fermat primality test).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 5 with an advanced/understand tag places this at the "2 main TAs + gate" tier — A01 (verifying the theorem and its essential hypothesis) and A02 (large-exponent reduction via periodicity) jointly cover all three LOs.
- MC-1 (hypothesis overlooked) was made this blueprint's central focus because the theorem's statement is often recalled in an abbreviated form ("$a^{p-1}\equiv1\pmod p$ for prime $p$") that drops the crucial $p\nmid a$ qualifier — Example 2 was deliberately chosen to make the hypothesis's failure mode directly computable and unambiguous (genuinely landing on 0, a different definite value, rather than an ill-defined or merely "inapplicable" outcome).
- The RSA-key-generation transfer probe was chosen because exponent reduction via Fermat's Little Theorem is a genuine, foundational computational technique underlying practical cryptographic systems, directly named in the KG's own description — giving this theorem's efficiency payoff concrete, real-world stakes beyond an abstract number-theoretic curiosity.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: numerical verification before general statement) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
