# Teaching Blueprint: Euler's Theorem (`math.nt.eulers-theorem`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.nt.eulers-theorem` |
| name | Euler's Theorem |
| domain | Number Theory |
| difficulty | advanced |
| bloom | understand |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.nt.fermats-little-theorem` |
| unlocks | `math.nt.rsa-basics` |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — advanced learner already fluent in Fermat's Little Theorem; the generalization is introduced directly |
| description (KG) | If GCD(a, n) = 1, then a^φ(n) ≡ 1 (mod n), where φ(n) is Euler's totient function; generalizes Fermat's Little Theorem. |

## Component 1 — Learning Objectives

- LO1: State **Euler's Theorem**: if $\gcd(a,n)=1$, then $a^{\varphi(n)}\equiv1\pmod n$, where $\varphi(n)$ is Euler's totient function (the count of integers in $[1,n]$ coprime to $n$) — and recognize this as a DIRECT generalization of `math.nt.fermats-little-theorem`'s $a^{p-1}\equiv1\pmod p$: when $n=p$ is PRIME, $\varphi(p)=p-1$ exactly, so Euler's Theorem reduces LITERALLY to Fermat's Little Theorem.
- LO2: Apply Euler's Theorem to a COMPOSITE modulus (where Fermat's Little Theorem does not apply at all, since it requires a prime modulus) — correctly computing $\varphi(n)$ for a small composite $n$ and verifying the theorem's conclusion directly.
- LO3 (orientation level — full treatment deferred to the unlocked child): recognize Euler's Theorem as the mathematical foundation of RSA encryption, where the modulus $n=pq$ (a product of two large primes) makes $\varphi(n)=(p-1)(q-1)$ computable ONLY by someone who knows the factorization of $n$ — deferred to `math.nt.rsa-basics`.

## Component 2 — Prerequisite Check

Assumes mastery of `math.nt.fermats-little-theorem` ($a^{p-1}\equiv1\pmod p$ for prime $p$ with $p\nmid a$, and the genuine failure of the conclusion when the hypothesis is violated).

## Component 3 — Core Explanation

**Euler's Theorem as a generalization, literally reducing to Fermat's**: Euler's Theorem states that for $\gcd(a,n)=1$, $a^{\varphi(n)}\equiv1\pmod n$, where $\varphi(n)$ counts the integers in $[1,n]$ coprime to $n$. When $n=p$ is PRIME, every integer from $1$ to $p-1$ is coprime to $p$ (since $p$ has no divisors besides $1$ and itself), so $\varphi(p)=p-1$ EXACTLY — and Euler's Theorem's statement $a^{\varphi(p)}\equiv1\pmod p$ becomes literally $a^{p-1}\equiv1\pmod p$, `math.nt.fermats-little-theorem`'s own statement. This is not merely analogous; Euler's Theorem genuinely CONTAINS Fermat's Little Theorem as the special case $n=$ prime.

**The genuine extension — composite moduli**: Fermat's Little Theorem has nothing to say about composite moduli at all. Euler's Theorem's real additional power is applying to ANY $n$ (prime or composite), as long as $\gcd(a,n)=1$ — computing $\varphi(n)$ directly (by counting coprime integers, or via known formulas like $\varphi(pq)=(p-1)(q-1)$ for distinct primes $p,q$) and using it in place of $p-1$.

**Foundation of RSA (orientation level)**: in RSA encryption, the modulus $n=pq$ is a product of two large primes, giving $\varphi(n)=(p-1)(q-1)$ — a quantity trivially computed by whoever KNOWS $p$ and $q$, but believed computationally infeasible to determine from $n$ alone without factoring it (large-number factoring is believed to be hard). Euler's Theorem, $a^{\varphi(n)}\equiv1\pmod n$, is the exact mathematical fact underlying why RSA's encryption and decryption exponents work correctly together. Full development is the dedicated subject of `math.nt.rsa-basics`.

## Component 4 — Worked Examples

**Example 1 (LO1 — Euler's Theorem reducing exactly to Fermat's for prime n, breaking MC-1)**: for $n=p=7$ (prime), $\varphi(7)=6$ (every integer $1$–$6$ is coprime to $7$, since $7$ is prime) — EXACTLY matching $p-1=6$ from `math.nt.fermats-little-theorem`'s own $p=7$ example. Euler's Theorem then states $a^6\equiv1\pmod7$ for $\gcd(a,7)=1$ — literally the SAME statement as Fermat's Little Theorem's $a^{p-1}\equiv1\pmod p$ for this $p$. Euler's Theorem doesn't merely resemble Fermat's — it LITERALLY becomes it when $n$ happens to be prime.

**Example 2 (LO2 — applying Euler's Theorem to a composite modulus, breaking MC-2)**: for $n=10$ (composite — Fermat's Little Theorem does not apply here at all), compute $\varphi(10)$: integers $1$–$10$ coprime to $10$ are $\{1,3,7,9\}$ (excluding $2,4,5,6,8,10$, which share a factor with $10$) — so $\varphi(10)=4$. Euler's Theorem predicts $a^4\equiv1\pmod{10}$ for any $a$ with $\gcd(a,10)=1$. Verify with $a=3$: $3^1=3$, $3^2=9$, $3^3=27\equiv7$, $3^4=81\equiv1\pmod{10}$ ✓ — confirmed directly, on a modulus where Fermat's Little Theorem itself has nothing to say.

**Example 3 (LO3, orientation level — RSA foundation preview)**: in RSA, the modulus $n=pq$ is chosen as a product of two large primes, so $\varphi(n)=(p-1)(q-1)$ — easily computed by whoever knows $p$ and $q$, but believed computationally infeasible to determine from $n$ alone without factoring it. Euler's Theorem, $a^{\varphi(n)}\equiv1\pmod n$, is precisely the mathematical fact making RSA's encryption/decryption exponents work correctly together — full development deferred to `math.nt.rsa-basics`.

## Component 5 — Teaching Actions

### Teaching Action A01 — Euler's Theorem Literally Contains Fermat's, Not Just Resembles It (Primitive P11: Representation Shift)

State: "when $n$ is prime, $\varphi(n)=n-1$ exactly — so Euler's Theorem doesn't just look like Fermat's Little Theorem, it BECOMES it, word for word." Work Example 1's direct reduction, showing $\varphi(7)=6=p-1$ exactly.

- **MC-1 hook**: ask "are Euler's Theorem and Fermat's Little Theorem two separate facts that happen to look similar, or is one a direct generalization of the other?" — a "separate facts" answer reveals MC-1 (missing that Euler's Theorem literally reduces to Fermat's Little Theorem when $n$ is prime).

### Teaching Action A02 — The Real Power Is Composite Moduli, Where Fermat's Says Nothing (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: Euler's Theorem correctly predicts $3^4\equiv1\pmod{10}$ on a COMPOSITE modulus where Fermat's Little Theorem simply doesn't apply at all. State: "this is exactly where Euler's Theorem earns its keep — Fermat's theorem has nothing to say about composite moduli, but Euler's Theorem handles them directly, as long as $\gcd(a,n)=1$."

- **MC-2 hook**: ask "does Euler's Theorem, like Fermat's Little Theorem, only apply when the modulus is prime?" — a "yes" answer reveals MC-2 (missing that Euler's Theorem's entire additional power is applying to composite moduli too).

### Teaching Action A03 — Computing φ(n) Requires Knowing the Factorization (Primitive P06: Contrast Pair)

Contrast computing $\varphi(n)$ when $n$'s factorization is KNOWN (trivial, via $(p-1)(q-1)$) against computing it from $n$ alone when the factorization is UNKNOWN (believed computationally infeasible for large $n$). State: "$\varphi(n)$ isn't hard to compute in general — it's specifically hard when you don't know how $n$ factors, and that asymmetry is exactly what RSA relies on."

- **MC-3 hook**: ask "is $\varphi(n)$ always easy to compute directly from $n$ alone, regardless of how $n$ is presented?" — a "yes" answer reveals MC-3 (missing that computing $\varphi(pq)$ genuinely requires knowing the factorization $p,q$).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Compute $\varphi(11)$ ($11$ is prime) and verify it equals $p-1=10$, confirming Euler's Theorem reduces to Fermat's Little Theorem for this prime.
  2. Compute $\varphi(15)$ ($15=3\times5$, composite) by counting integers $1$–$15$ coprime to $15$, and state what Euler's Theorem predicts for $a^{\varphi(15)}\bmod15$ when $\gcd(a,15)=1$.
  3. Verify Euler's Theorem directly for $n=15$, $a=2$ (check $\gcd(2,15)=1$, then compute $2^{\varphi(15)}\bmod15$ using your answer from problem 2).
  4. Explain why Euler's Theorem, unlike Fermat's Little Theorem, can be applied directly to a modulus like $n=15$, and explain what makes this generalization valuable for cryptographic applications (referencing this lesson's RSA preview).
- **P76 (Transfer Probe, mode = independence)**: "A cryptographic system uses modulus $n=21=3\times7$. (a) Compute $\varphi(21)$ directly, by either counting coprime integers or using the fact that $\varphi(pq)=(p-1)(q-1)$ for distinct primes $p,q$. (b) Verify Euler's Theorem for $a=2$ (check $\gcd(2,21)=1$ first), computing $2^{\varphi(21)}\bmod21$. (c) Explain why someone who only knows $n=21$ (without being told it factors as $3\times7$) would need to factor $n$ first before being able to compute $\varphi(21)$ directly via the $(p-1)(q-1)$ formula — and why this exact difficulty is what RSA encryption relies on for larger $n$."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | EULER-AND-FERMAT-ASSUMED-UNRELATED | Believing Euler's Theorem and Fermat's Little Theorem are separate facts that merely resemble each other, missing that Euler's Theorem literally reduces to Fermat's when $n$ is prime | Foundational |
| MC-2 | EULERS-THEOREM-ASSUMED-PRIME-ONLY | Believing Euler's Theorem, like Fermat's Little Theorem, only applies to prime moduli, missing that its real power is applying to composite moduli too | High |
| MC-3 | PHI-N-ASSUMED-ALWAYS-EASY | Believing $\varphi(n)$ is always easy to compute directly from $n$ alone, missing that for $n=pq$ (large unknown primes), computing $\varphi(n)$ genuinely requires knowing the factorization | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Euler and Fermat Assumed Unrelated") → P41 (detect: ask whether Euler's Theorem and Fermat's Little Theorem are separate facts) → P64 (conceptual shift: re-walk Example 1's exact reduction, re-anchoring on "$\varphi(p)=p-1$ exactly — Euler's Theorem literally becomes Fermat's for prime $n$").
- **B02 (targets MC-2)**: P27 (name it: "Euler's Theorem Assumed Prime-Only") → P41 (detect: ask whether Euler's Theorem only applies to prime moduli) → P64 (conceptual shift: re-walk Example 2's composite-modulus verification, re-anchoring on "this is exactly where Euler's Theorem's extra power shows up").
- **B03 (targets MC-3)**: P27 (name it: "φ(n) Assumed Always Easy") → P41 (detect: ask whether $\varphi(n)$ is always easy to compute from $n$ alone) → P64 (conceptual shift: re-walk Example 3's RSA framing, re-anchoring on "computing $\varphi(n)$ genuinely requires the factorization when $n=pq$ is large and unknown").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.nt.fermats-little-theorem` (the special-case statement $a^{p-1}\equiv1\pmod p$ this concept directly generalizes, and its own hypothesis-violation example this concept's structure mirrors).
- **Unlocks**: `math.nt.rsa-basics` (will fully develop the RSA foundation previewed at orientation level in LO3; not yet authored).
- **Cross-link**: KG lists no cross_links for this concept (checked via `ls docs/curriculum/blueprints/` before setting P76_mode — none to check). $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 5 with an advanced/understand tag supports the "3 TAs + gate" tier, with LO1 and LO2 at full computational depth (the exact prime-case reduction and a genuine composite-modulus verification) and LO3 kept orientation-level, appropriately deferring RSA's full development to this concept's own unlocked child.
- **Division of labor**: `math.nt.fermats-little-theorem` owns the prime-modulus special case and its own hypothesis-violation demonstration; this concept owns the GENERALIZATION to arbitrary $n$ via Euler's totient function, deliberately reusing that concept's own $p=7$ example in Example 1 so the reduction to Fermat's theorem is verified on already-familiar numbers rather than a fresh, unrelated case.
- Example 2's choice of $n=10$ (rather than a larger composite) was deliberate — small enough that $\varphi(10)=4$ and the verification $3^4\equiv1\pmod{10}$ can be checked by hand in four short steps, keeping the composite-modulus demonstration as concrete and checkable as Example 1's prime case.

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
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: advanced learner already fluent in Fermat's Little Theorem; generalization introduced directly) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
