# Blueprint: math.nt.rsa-basics

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.nt.rsa-basics |
| name | RSA Cryptosystem Basics |
| Domain | math.nt |
| Difficulty | advanced |
| Bloom level | analyze |
| Estimated hours | 10 |
| Mastery threshold | 0.70 |
| MAMR | 4/5 |
| Prerequisites | math.nt.eulers-theorem, math.nt.primality-testing, math.nt.modular-inverse |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
The student describes the RSA key-generation procedure (choose large primes p,q; compute n=pq and φ(n)=(p−1)(q−1); select public exponent e with gcd(e,φ(n))=1; compute private exponent d≡e⁻¹(mod φ(n))); verifies that decryption reverses encryption via Euler's Theorem (m^(ed)≡m(mod n) for valid messages); identifies integer factoring as the presumed hard subproblem; explains why a small public key (e.g. e=65537) doesn't weaken security; and analyses what breaks if p or q is revealed, if e and φ(n) are both known, or if p≈q.

## Component 2 — CPA Entry Stage
**C — Concrete** (use toy primes p=3, q=5; n=15, φ(15)=8; choose e=3 (gcd(3,8)=1); d=3⁻¹ mod 8 = 3 (since 3×3=9≡1); encrypt m=2: 2³=8 mod 15 = 8; decrypt: 8³=512≡512−34×15=512−510=2 mod 15 ✓; the message 2 is recovered)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | RSA-SECURITY-COMES-FROM-EULER-THEOREM | Student believes RSA's security is mathematical — because computing ed≡1(mod φ(n)) or applying Euler's Theorem is hard | Type 5 — instruction-induced (RSA is introduced via Euler's Theorem, which IS the correctness proof; students conflate correctness with security; the actual security assumption — factoring n is computationally hard — is a separate, empirical conjecture, not the mathematics they just learned) |
| MC-2 | DECRYPTION-IS-THE-REVERSE-ALGORITHM-OF-ENCRYPTION | Student thinks decryption applies a different kind of operation from encryption — e.g. "encryption multiplies, decryption divides" or "encryption uses modular exponentiation, decryption uses logarithms" | Type 3 — language contamination ("encrypt" and "decrypt" sound like opposite operations; the mathematical elegance that both are modular exponentiation (just with different exponents e and d) is unexpected and counterintuitive to students used to XOR-based or substitution ciphers) |
| MC-3 | SMALL-PUBLIC-EXPONENT-WEAKENS-RSA | Student believes using e=3 or e=65537 makes RSA weaker because "the exponent is too small to be secure" | Type 1 — overgeneralization (in symmetric cryptography, key size directly measures security; students apply this intuition to RSA's exponent; the actual security comes from the modulus n's size, not from e's size — e=65537 is standard and secure) |

## Component 4 — Session TA Cap
**Cap = 12** (hrs = 10 → cap 12)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Four views of RSA:**

| Representation | Content |
|---|---|
| Procedural steps | Key gen: choose p,q prime; n=pq; φ(n)=(p−1)(q−1); pick e with gcd(e,φ(n))=1; d=e⁻¹ mod φ(n). Encrypt: c=mᵉ mod n. Decrypt: m=cᵈ mod n. |
| Mathematical proof | c^d=(m^e)^d=m^(ed)(mod n). ed≡1(mod φ(n)) so ed=kφ(n)+1 for some k∈ℤ. By Euler: m^(kφ(n))=(m^φ(n))^k≡1^k=1(mod n) when gcd(m,n)=1. So m^(ed)=m·m^(kφ(n))≡m·1=m(mod n). |
| Key asymmetry | Public key (e,n): freely distributed. Private key (d,n): kept secret. Computing d from (e,n) requires knowing φ(n), which requires knowing p and q, which requires factoring n. |
| Security layers | (1) Factoring n is hard for large n. (2) Even with n factored, computing d from e and φ(n) is just extended Euclidean (fast). So the whole system rests on layer (1). |

**Worked toy example (p=61, q=53):**
- n=61×53=3233
- φ(n)=60×52=3120
- e=17 (gcd(17,3120)=1 since 17 is prime and 17∤3120)
- d=17⁻¹ mod 3120: extended Euclidean gives d=2753 (verify: 17×2753=46801=15×3120+1 ✓)
- Encrypt m=65: 65^17 mod 3233 = 2790 (computed by repeated squaring)
- Decrypt: 2790^2753 mod 3233 = 65 ✓

**Why φ(n)=(p−1)(q−1):** φ is multiplicative and gcd(p,q)=1, so φ(pq)=φ(p)φ(q)=(p−1)(q−1).

**P49 checkpoint:**
- CORRECT → "RSA: n=pq; φ(n)=(p−1)(q−1); e public; d=e⁻¹ mod φ(n) private. Encryption and decryption are both modular exponentiation. Correctness via Euler. Security via factoring hardness." → A02
- PARTIAL (cannot verify decryption correctness) → "Trace through: c=mᵉ mod n. Then c^d=(mᵉ)^d=m^(ed) mod n. We chose d so that ed≡1(mod φ(n)), meaning ed=1+kφ(n). So m^(ed)=m¹×(m^φ(n))^k. By Euler's Theorem (assuming gcd(m,n)=1), m^φ(n)≡1(mod n), so (m^φ(n))^k≡1. Thus m^(ed)≡m(mod n)." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "In the toy example p=3, q=5: what is n? φ(n)? Choose e=3. Find d. Encrypt m=4." → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**What breaks RSA:**

**Scenario analysis:**
| If an attacker knows… | They can compute… | Attack succeeds? |
|---|---|---|
| n (public) only | Cannot factor n (assumed hard) | No |
| n, e (public key) | Cannot compute d without φ(n) | No |
| n AND φ(n) | d=e⁻¹ mod φ(n) via extended Euclidean | YES |
| p or q | The other factor = n/p or n/q; then φ(n) | YES |
| p ≈ q (n has balanced factors) | Fermat factoring: test n=(x+y)(x−y)=x²−y² for small y starting at ⌈√n⌉ | YES (fast if factors close) |
| p−1 smooth (Pollard p−1) | Weak primes exploitable | YES |

**Why e=65537=2^16+1 is standard:** (1) It's prime, so gcd(65537,φ(n))=1 is easy to verify. (2) It has only two 1-bits in binary, making mᵉ fast to compute (square-and-multiply needs only 17 multiplications). (3) Small e alone cannot reveal m — the security is in n, not e.

**Why p≈q is dangerous:** if p,q≈√n, Fermat factoring finds them in O(1) steps. Good RSA requires |p−q| >> n^(1/4).

**Padded plaintext concern:** if m is small relative to n, mᵉ<n and no modular reduction occurs — an attacker computes the real eth root of c over ℤ. Solution: pad m with random bytes (OAEP padding). Pure textbook RSA without padding is insecure.

**P49 checkpoint:**
- CORRECT → "Knowing p or q breaks RSA instantly. Knowing φ(n) breaks RSA. Balanced p≈q enables Fermat attack. Small e is fine; small n is not. Padding prevents cube-root attacks on small messages." → A03
- PARTIAL (doesn't understand why knowing φ(n) is equivalent to knowing the factorisation) → "If you know φ(n)=(p−1)(q−1) AND n=pq, you have two equations: p+q=n−φ(n)+1 and p×q=n. These are a quadratic's coefficients: t²−(p+q)t+pq=0. Solving gives p and q directly. So knowing φ(n) is as good as factoring n." → TB-R02 → A03
- INCORRECT → TB-R02 → A03
- NO_RESPONSE → "If an attacker knows n=3233 and φ(n)=3120, can they find p and q? Set up the equations and solve." → TB-R02 → A03

### A03 — P41 MISCONCEPTION DETECTOR + P64 MC-1 gate
**Security source gate:**

**Gate question (MC-1):** "A student says 'RSA is secure because even if you know e and n, you'd need to invert the Euler Theorem computation to find d — and Euler Theorem computations are one-way.' Is this correct?"

Incorrect. Given e and φ(n), computing d=e⁻¹ mod φ(n) takes O(log φ(n)) time via the Extended Euclidean Algorithm — it is fast, not hard. The security comes EXCLUSIVELY from the fact that computing φ(n) from n (without knowing the factors) requires factoring n. Once you have φ(n), finding d is trivial. The Euler Theorem is the CORRECTNESS mechanism (proves decryption works), not the SECURITY mechanism.

**P49 checkpoint:**
- CORRECT → "Security = hardness of factoring n. Given φ(n), finding d is fast (Euclidean). The mathematical machinery (Euler, modular exponentiation) enables correct key pairs; factoring hardness prevents an adversary from generating the same key pair." → Gate (P91)
- PARTIAL → TB-R03 → Gate
- INCORRECT → TB-R03 → Gate
- NO_RESPONSE → "Given n=3233 and φ(n)=3120, find d for e=17 using the Extended Euclidean Algorithm. How many steps does it take? Is this 'hard'?" → TB-R03 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-2 DECRYPTION-IS-THE-REVERSE-ALGORITHM-OF-ENCRYPTION):**
Step 1 — "Both encryption and decryption use IDENTICAL algorithms: raise to a power, reduce mod n. Encryption: mᵉ mod n. Decryption: c^d mod n. The only difference is the exponent used — e (public) for encryption, d (private) for decryption." Step 2 — "This works because ed≡1(mod φ(n)) ensures that the two operations are inverses of each other algebraically. The modular exponentiation 'wraps around' in a way that applying exponents e and d consecutively brings you back to the original." Step 3 — "Contrast with XOR ciphers where XOR is its own inverse; here, modular exponentiation with different exponents play the role of 'encryption' and 'decryption' — both the same type of operation."

**TB-R02 (MC-3 SMALL-PUBLIC-EXPONENT-WEAKENS-RSA):**
Step 1 — "RSA's security parameter is n, not e. The modulus n=pq must be large (currently ≥2048 bits) because factoring must be hard. The exponent e=65537 is chosen for SPEED, not security: it has binary representation 10000000000000001, so mᵉ requires only 17 multiplications via square-and-multiply (vs. 2048 for a random e of similar size)." Step 2 — "An attacker with public key (e,n) needs to find d, which requires φ(n), which requires factoring n. Whether e=3 or e=65537 or any other value, this bottleneck is the same." Step 3 — "The only attack where small e matters: if the same message m is sent to 3 recipients all using e=3 but different n₁,n₂,n₃, the Chinese Remainder Theorem can recover m³ exactly (no reduction mod n occurred if m<n^(1/3)), then take the real cube root. But this is a padding-absence attack, not an e-size attack."

**TB-R03 (MC-1 RSA-SECURITY-COMES-FROM-EULER-THEOREM):**
Step 1 — "Euler's Theorem proves correctness: m^(ed)≡m — decryption undoes encryption. This is a mathematical FACT, not a hardness assumption. It would hold even if n were easy to factor." Step 2 — "Security is a COMPUTATIONAL claim: we BELIEVE factoring n is hard for large n. This is NOT proven (factoring might be easy — it just hasn't been found). RSA's security is an engineering assumption about today's and near-future computers, not a theorem." Step 3 — "Distinction: mathematics → guarantees correctness; complexity theory → reasons about what's computationally feasible. Both are needed for a cryptosystem: the math makes the algorithm work, the complexity assumption makes it secure."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (4 items):**
1. RSA setup: p=11, q=13. Compute n, φ(n). Choose e=7. Find d. Encrypt m=5. Decrypt to recover m.
2. An attacker intercepts a message encrypted with RSA (n=15, e=3). They also obtain φ(n)=8 through a side channel. Can they find d? Decrypt c=13.
3. Why would choosing p=q=17 (so n=289) be a terrible choice for RSA? What does the Fermat factoring attack give immediately?
4. RSA correctness proof: suppose ed=kφ(n)+1 for some k. Prove that m^(ed)≡m(mod n) for all m with gcd(m,n)=1. (Use Euler's Theorem explicitly.)

**P55 — Reflect & Consolidate:** "RSA: key generation relies on finding modular inverse (Extended Euclidean). Correctness relies on Euler's Theorem. Security relies on factoring hardness (unproven but widely believed). Small e is fine for security; balanced p≈q and knowing φ(n) are fatal weaknesses."

**P76 — Transfer Probe (Independence mode):**
(a) A variant called textbook ElGamal: choose prime p, generator g mod p, private key x, public key y=g^x mod p. Encrypt m as (g^k mod p, m·y^k mod p) for random k. The discrete logarithm problem (finding x from g^x mod p) is presumed hard — analogously to RSA's factoring problem. Explain the structural parallel: what plays the role of e, d, n, and the hard problem? (b) RSA can also be used for digital signatures: sign m by computing s=m^d mod n; verify by checking m≡s^e(mod n). Explain why signing and verifying work correctly. (c) If an RSA private key d is recovered by an adversary, and the user generates a new key pair but keeps the SAME n=pq, is the new key pair secure? Explain.

**P55 — Reflect & Consolidate:** "Parallel: ElGamal's private x ≅ RSA's d; public y ≅ e; prime p ≅ n; discrete log ≅ factoring. Digital signatures work by swapping roles of public and private: the signer computes with d (secret), the verifier with e (public) — the same Euler-theorem correctness applies. Reusing n after key compromise: NO — the attacker knows n's factorisation from the first compromise and can immediately compute any new private key from the new public key."

**P75 — Mastery Assessment:**
"RSA implementation analysis: a programmer implements RSA with p=10007, q=10009 (twin primes). (a) Is n=p×q? Compute n. (b) Why is this choice of p and q particularly dangerous? (c) The programmer also reuses the same n across 500 users, assigning each a different e. An attacker intercepts two ciphertexts c₁,c₂ encrypted under the same n with public exponents e₁,e₂ satisfying gcd(e₁,e₂)=1. How can the attacker recover m without factoring n? (Hint: Bézout + common-modulus attack.) (d) Would RSA still work mathematically if n were a product of THREE primes p,q,r instead of two? What would φ(n) be?"

**P55 — Reflect & Consolidate:** "Twin-prime danger: Fermat factoring finds p,q in O(1) steps since n=(p−1)(p+1) and |p−q|=2. Common-modulus attack: find s₁,s₂ with s₁e₁+s₂e₂=1 (Bézout); then c₁^s₁·c₂^s₂=(mᵉ¹)^s₁·(mᵉ²)^s₂=m^(s₁e₁+s₂e₂)=m¹=m. Three-prime RSA: works mathematically; φ(pqr)=(p−1)(q−1)(r−1); key generation same; factoring n is still the hard problem."

**P74 — Routing Decision:**
- Score ≥ 4/5 → MASTERED; math.nt.rsa-basics complete
- Score 3/5 → REVIEW the correctness proof via Euler's Theorem and the factoring-hardness security argument; replay A02
- Score ≤ 2/5 → PREREQUISITE GAP in math.nt.eulers-theorem or math.nt.modular-inverse; reassign

**P78 — Completion:** RSA Basics certified. Student executes key generation, encryption, and decryption; proves correctness via Euler's Theorem; identifies integer factoring as the security assumption; analyses attack scenarios (knowing p, knowing φ(n), p≈q, padding absence); explains why small e is harmless and small n is catastrophic.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: ElGamal parallel; digital signatures; key reuse danger; three-prime RSA; common-modulus attack
Skill tested: Analogise RSA structure to discrete-log cryptosystems; reason about specific attack scenarios

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
