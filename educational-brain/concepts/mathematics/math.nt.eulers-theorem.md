# math.nt.eulers-theorem

## Identity
- **KG ID**: `math.nt.eulers-theorem`
- **Domain**: math.nt (Number Theory)
- **Requires**: `math.nt.fermats-little-theorem`
- **Unlocks**: `math.nt.rsa-basics`
- **Cross-links**: none (KG lists none; Blueprint confirms).
- **Difficulty**: advanced
- **Bloom level**: understand
- **Mastery threshold**: 0.75 (⌈0.75×5⌉ = 4/5)
- **Estimated hours**: 5
- **Blueprint**: `docs/curriculum/blueprints/math.nt.eulers-theorem.md` (reused by reference throughout this entry).

## Learning Objective
The student will state Euler's Theorem (if gcd(a,n)=1, then a^φ(n)≡1 mod n) and recognize it as a direct generalization of Fermat's Little Theorem that literally reduces to it when n is prime, apply Euler's Theorem to a composite modulus where Fermat's Little Theorem does not apply at all, and recognize Euler's Theorem as the mathematical foundation of RSA encryption at an orientation level.

## Core Understanding
Per the Blueprint's Component 3: Euler's Theorem states that for gcd(a,n)=1, a^φ(n)≡1 (mod n), where φ(n) counts the integers in [1,n] coprime to n. When n=p is prime, every integer from 1 to p−1 is coprime to p, so φ(p)=p−1 exactly — Euler's Theorem's statement becomes literally a^(p−1)≡1 (mod p), Fermat's Little Theorem's own statement. This is not merely analogous; Euler's Theorem genuinely CONTAINS Fermat's Little Theorem as the special case n=prime. The genuine extension is composite moduli: Fermat's Little Theorem has nothing to say about them at all, while Euler's Theorem applies to ANY n (prime or composite) as long as gcd(a,n)=1, computing φ(n) directly. In RSA, the modulus n=pq (product of two large primes) gives φ(n)=(p−1)(q−1), trivially computed by whoever knows p and q but believed infeasible to determine from n alone without factoring it — Euler's Theorem is the exact mathematical fact underlying RSA's encryption/decryption exponents.

## Mental Models
1. **The literal-reduction model** (Blueprint TA-A01): when n is prime, φ(n)=n−1 exactly, so Euler's Theorem doesn't just resemble Fermat's Little Theorem — it becomes it, word for word.
2. **The composite-modulus-power model** (Blueprint TA-A02): Euler's Theorem's real additional value is handling composite moduli, where Fermat's Little Theorem simply has nothing to say.
3. **The known-versus-unknown-factorization model** (Blueprint TA-A03): φ(n) is easy to compute when n's factorization is known, and specifically hard when it isn't — an asymmetry RSA relies on directly.

## Why Students Fail
Per the Blueprint's Misconception Registry: the foundational failure is believing Euler's Theorem and Fermat's Little Theorem are separate facts that merely resemble each other, missing that Euler's Theorem literally reduces to Fermat's when n is prime. A high-severity failure is believing Euler's Theorem, like Fermat's Little Theorem, only applies to prime moduli, missing that its real power is applying to composite moduli too. A third failure is believing φ(n) is always easy to compute directly from n alone, missing that for n=pq (large unknown primes), computing φ(n) genuinely requires knowing the factorization.

## Misconceptions
Reused by reference from the Blueprint's Component 6 Misconception Registry, with birth-type classification added:

- **MC-1 — EULER-AND-FERMAT-ASSUMED-UNRELATED** (FOUNDATIONAL)
  - **Blueprint description**: believing Euler's Theorem and Fermat's Little Theorem are separate facts that merely resemble each other, missing that Euler's Theorem literally reduces to Fermat's when n is prime.
  - **Birth type**: Type 1, overgeneralization — the two theorems are introduced as distinctly-named results in sequence, so the default assumption is that distinct names mean distinct, unrelated facts, rather than one genuinely containing the other.
  - **Repair approach**: Blueprint Repair Action B01 — re-walking Example 1's exact reduction, showing φ(7)=6=p−1 exactly.

- **MC-2 — EULERS-THEOREM-ASSUMED-PRIME-ONLY** (High)
  - **Blueprint description**: believing Euler's Theorem, like Fermat's Little Theorem, only applies to prime moduli, missing that its real power is applying to composite moduli too.
  - **Birth type**: Type 1, overgeneralization — the immediately-preceding prerequisite concept's prime-only scope is carried over unchanged onto its generalization, missing that the entire point of generalizing was to remove that restriction.
  - **Repair approach**: Blueprint Repair Action B02 — re-walking Example 2's composite-modulus verification (n=10, φ(10)=4).

- **MC-3 — PHI-N-ASSUMED-ALWAYS-EASY** (Moderate)
  - **Blueprint description**: believing φ(n) is always easy to compute directly from n alone, missing that for n=pq (large unknown primes), computing φ(n) genuinely requires knowing the factorization.
  - **Birth type**: Type 2, perceptual intuition — small worked examples make φ(n) feel like a simple counting exercise, obscuring that the difficulty scales sharply once the factorization itself is unknown.
  - **Repair approach**: Blueprint Repair Action B03 — re-walking Example 3's RSA framing, re-anchoring on the known-versus-unknown-factorization asymmetry.

## Analogies
- **The contains-not-resembles framing** (Blueprint TA-A01): "when n is prime, φ(n)=n−1 exactly — so Euler's Theorem doesn't just look like Fermat's Little Theorem, it BECOMES it, word for word."

## Demonstrations
- The exact reduction φ(7)=6=p−1, showing Euler's Theorem literally becoming Fermat's Little Theorem for prime n=7 (Blueprint Example 1), targeting MC-1.
- The composite-modulus verification for n=10 (φ(10)=4), confirming 3^4≡1 (mod 10) where Fermat's Little Theorem has nothing to say (Blueprint Example 2), targeting MC-2.
- The RSA foundation preview: φ(n)=(p−1)(q−1) for n=pq, easy with known factorization, believed infeasible without it (Blueprint Example 3), targeting MC-3.

## Discovery Questions
1. "If n happens to be prime, what does Euler's Theorem's statement actually become?"
2. "Does Euler's Theorem only work for prime moduli, the same way Fermat's Little Theorem does?"
3. "Is computing φ(n) always easy, no matter how n is given to you?"

## Teaching Sequence
Follows the Blueprint's Component 5 exactly: TA-A01 (Euler's Theorem literally contains Fermat's, not just resembles it — Example 1, MC-1 hook) → TA-A02 (the real power is composite moduli — Example 2, MC-2 hook) → TA-A03 (computing φ(n) requires knowing the factorization — Example 3, MC-3 hook) → TA-A04 (Mastery Gate, P91).

## Tutor Actions
- **TELL: Explanation** — the literal reduction to Fermat's Little Theorem when n is prime (Blueprint TA-A01).
- **DO: Worked Example** — the composite-modulus verification for n=10 (Blueprint Example 2), targeting MC-2.
- **TELL: Explanation** — the known-versus-unknown-factorization asymmetry underlying RSA (Blueprint TA-A03), targeting MC-3.
- **TEST-THINKING: Prediction** — before computing φ(n) for a given n, ask whether its factorization is known, targeting MC-3.

## Voice Teaching Notes
When Euler's Theorem is stated for a prime modulus, ask "does that sound familiar — is this actually a theorem you already know?" as a standing check directly targeting MC-1's separate-facts assumption.

## Assessment Signals
- **P76 (transfer probe, independence mode per the Blueprint's Component 7 — cross_links=[])**: reused verbatim from the Blueprint's Component 5 A04 — the cryptographic modulus n=21=3×7 scenario, computing φ(21), verifying the theorem, and explaining the factorization-dependency RSA relies on.
- **P77 (mastery gate)**: the Blueprint's 4-item problem set (Component 5 A04), MAMR 4/5.

## Tutor Recovery Strategy
If MC-1 persists, require the student to compute φ(p) for several distinct primes and explicitly verify each equals p−1, before restating Euler's Theorem's relationship to Fermat's Little Theorem in their own words.

## Memory Hooks
- "For prime n, Euler's Theorem IS Fermat's Little Theorem — not just similar to it."
- "Euler's Theorem's whole extra power is handling composite moduli."
- "φ(n) is easy if you know the factorization — hard if you don't."

## Transfer Connections
- `math.nt.rsa-basics` (unlocks) fully develops the RSA foundation previewed here at orientation level.
- `math.nt.fermats-little-theorem` (requires) is the special-case statement this concept directly generalizes.

## Cross-Subject Connections
- Computer science / cryptography: Euler's Theorem is the exact mathematical fact underlying why RSA's encryption and decryption exponents work correctly together.

## Blueprint References
`docs/curriculum/blueprints/math.nt.eulers-theorem.md` — all worked examples, teaching actions, and the P76/P77 assessment items reused by reference, not restated in full.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None — the Blueprint's own cross-link finding (cross_links=[]) was independently re-verified at authoring time and remains accurate.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.nt Wave 6 part 1.
