# math.nt.rsa-basics

## Identity
- **KG ID**: `math.nt.rsa-basics`
- **Domain**: math.nt (Number Theory)
- **Requires**: `math.nt.eulers-theorem`, `math.nt.primality-testing`, `math.nt.modular-inverse`
- **Unlocks**: none
- **Cross-links**: none (KG lists none).
- **Difficulty**: advanced
- **Bloom level**: analyze
- **Mastery threshold**: 0.7 (⌈0.7×5⌉ = 4/5)
- **Estimated hours**: 10
- **Blueprint**: none exists yet for this concept as of this entry's authoring date; misconceptions authored directly via the birth-taxonomy diagnostic procedure (`educational-brain/misconceptions/01-birth-types.md`).

## Learning Objective
The student will describe RSA's number-theoretic key-generation procedure (choose large primes p,q; n=pq; public exponent e coprime to φ(n); private exponent d=e⁻¹ mod φ(n)), correctly identify that RSA's security rests on the computational difficulty of factoring n rather than on keeping the algorithm secret, and explain why computing the private exponent d genuinely requires knowing the prime factorization of n.

## Core Understanding
This concept is a capstone synthesis of `math.nt.eulers-theorem`, `math.nt.primality-testing`, and `math.nt.modular-inverse`. RSA key generation: choose two large primes p,q (using primality testing); compute n=pq and φ(n)=(p−1)(q−1) (only computable directly by whoever knows p and q); choose a public exponent e with gcd(e,φ(n))=1 (exactly the condition modular-inverse's existence criterion requires); compute the private exponent d=e⁻¹ mod φ(n) (using the extended Euclidean algorithm, exactly as modular-inverse teaches). Encryption computes c=m^e mod n; decryption computes m=c^d mod n; correctness relies directly on Euler's Theorem, since ed≡1 (mod φ(n)) makes (m^e)^d=m^(ed)≡m (mod n). RSA's public key is (n,e) — fully public — while its security rests entirely on the fact that computing φ(n) (and hence d) from n alone, without knowing its prime factorization, is believed computationally infeasible for large n, exactly the asymmetry Euler's Theorem's own Blueprint previewed.

## Mental Models
1. **The public-algorithm-secret-factorization model**: the RSA algorithm itself is fully public knowledge — the only genuine secret is the prime factorization of n.
2. **The constrained-exponent model**: the public exponent e cannot be chosen arbitrarily — it must satisfy gcd(e,φ(n))=1, exactly the condition needed for a modular inverse to exist.
3. **The factorization-gated-computation model**: computing the private exponent d requires computing φ(n) first, which genuinely requires knowing p and q — not derivable from n and e alone.

## Why Students Fail
The foundational failure is believing RSA's security comes from keeping the algorithm or method secret, rather than recognizing the algorithm is fully public and security rests entirely on the computational difficulty of factoring n. A second failure is believing the public exponent e can be any number, missing the requirement that e must be coprime to φ(n) for a modular inverse to exist. A third failure is believing the private exponent d can be computed directly from the public key (n,e) alone without knowing the factorization of n, missing that computing φ(n) genuinely requires knowing p and q — this IS RSA's entire security foundation.

## Misconceptions
Authored directly via the birth-taxonomy diagnostic procedure (no Blueprint exists for this concept):

- **RSA-SECURITY-ASSUMED-TO-COME-FROM-SECRET-ALGORITHM** (FOUNDATIONAL)
  - **Description**: believing RSA's security relies on keeping the algorithm or method secret, rather than the computational difficulty of factoring n.
  - **Birth type**: Type 2, perceptual intuition — everyday "secret code" intuitions (a hidden cipher method, a secret decoder ring) carry over from historical cryptography, where secrecy of METHOD genuinely mattered, obscuring that modern public-key cryptography's security model is fundamentally different.
  - **Repair approach**: state explicitly that (n,e) and the entire RSA algorithm are published openly — verify by naming the actual public standard — and that security depends solely on factoring difficulty, not procedural secrecy.

- **PUBLIC-EXPONENT-E-ASSUMED-TO-BE-ARBITRARY** (Foundational)
  - **Description**: believing the public exponent e can be any number, missing the requirement that gcd(e,φ(n))=1.
  - **Birth type**: Type 5, instruction-induced — the "choose e" step is often stated casually without immediately re-connecting it to the already-mastered coprimality requirement for a modular inverse to exist.
  - **Repair approach**: attempt to choose an e sharing a common factor with φ(n) and show directly that no modular inverse d exists, re-anchoring on modular-inverse's own existence criterion.

- **PRIVATE-EXPONENT-D-ASSUMED-COMPUTABLE-FROM-PUBLIC-KEY-ALONE** (Moderate)
  - **Description**: believing d can be computed directly from the public key (n,e) alone without knowing the prime factorization of n.
  - **Birth type**: Type 1, overgeneralization — since e and d are related by a simple modular-inverse relationship, it's tempting to assume anyone possessing e and n could invert that relationship directly, missing that computing φ(n) first genuinely requires knowing p and q.
  - **Repair approach**: attempt to compute φ(n) for a specific n whose factorization is withheld, confirming directly that φ(n) cannot be found without factoring n first.

## Analogies
- **The public-blueprint-secret-key framing**: RSA is like publishing the complete blueprint for a lock (the algorithm) while keeping only the actual key blank (the factorization) secret — knowing how the lock works doesn't let you pick it without the key.

## Demonstrations
- Naming the RSA algorithm as a published, fully public cryptographic standard, refuting the secret-algorithm misconception.
- Attempting to choose e sharing a common factor with φ(n) and confirming no modular inverse exists.
- Attempting to compute φ(n) from n alone (factorization withheld), confirming the computation genuinely requires knowing p and q.

## Discovery Questions
1. "Is the RSA algorithm itself secret, or is it published for anyone to read?"
2. "Can the public exponent e be any number you like?"
3. "If you only know n and e (not p and q), can you compute d?"

## Teaching Sequence
1. Walk the full key-generation procedure (p,q → n → φ(n) → e → d), reusing eulers-theorem/primality-testing/modular-inverse by reference at each step.
2. State explicitly that the algorithm is fully public; only the factorization is secret, refuting the secret-algorithm misconception.
3. Attempt an invalid e (sharing a factor with φ(n)) to show the coprimality requirement is not optional.
4. Attempt to compute φ(n) without the factorization, confirming the factorization-gated-computation model.
5. Mastery gate: given small p,q, walk full key generation; explain why RSA's security does not depend on hiding the algorithm.

## Tutor Actions
- **TELL: Explanation** — the full key-generation procedure, reusing eulers-theorem/primality-testing/modular-inverse by reference.
- **TEST-THINKING: Error Analysis** — attempting an invalid e sharing a common factor with φ(n), targeting the arbitrary-e misconception.
- **TEST-THINKING: Prediction** — attempting to compute φ(n) without the factorization, targeting the computable-from-public-key misconception.
- **ORGANIZE: Concept Map** — mapping which parts of RSA are public versus secret, targeting the secret-algorithm misconception.

## Voice Teaching Notes
When a student describes RSA's security, ask "is it the algorithm that's secret, or something else?" as a standing check directly targeting the secret-algorithm misconception.

## Assessment Signals
- **Transfer probe (independence mode — no cross-link listed in the KG for this concept)**: "A colleague claims RSA would be more secure if the algorithm itself were kept confidential rather than published. Using this lesson's understanding of what actually makes RSA secure, explain precisely why this claim is mistaken."
- **Mastery gate (4-item problem set)**: (1) for p=3,q=11, compute n and φ(n); (2) choose a valid public exponent e for this φ(n), justifying via the coprimality requirement; (3) compute the private exponent d; (4) explain why an eavesdropper who knows n and e cannot easily compute d. MAMR 4/5.

## Tutor Recovery Strategy
If the secret-algorithm misconception persists, have the student locate and read a public description of the RSA algorithm's exact steps, confirming directly that nothing about the procedure itself is hidden.

## Memory Hooks
- "RSA's algorithm is public — only the factorization of n is secret."
- "e must be coprime to φ(n), or no private key d exists."
- "Computing d needs φ(n), and φ(n) needs the factorization — that's RSA's whole security story."

## Transfer Connections
- `math.nt.eulers-theorem` (requires) supplies the exact mathematical fact (a^φ(n)≡1 mod n) making RSA's encryption/decryption exponents work correctly.
- `math.nt.primality-testing` (requires) supplies the method for generating the large primes p,q RSA depends on.
- `math.nt.modular-inverse` (requires) supplies the exact method for computing the private exponent d from e and φ(n).

## Cross-Subject Connections
- Computer science / cybersecurity: RSA is the foundational public-key cryptosystem underlying secure web communication (TLS/SSL), digital signatures, and key exchange.

## Blueprint References
None — no Blueprint exists for this concept as of this entry's authoring date.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None found at authoring time.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.nt Wave 7.
