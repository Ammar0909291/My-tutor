# Teaching Blueprint: Primality Testing (`math.nt.primality-testing`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.nt.primality-testing` |
| name | Primality Testing |
| domain | Number Theory |
| difficulty | expert |
| bloom | analyze |
| mastery_threshold | 0.7 → MAMR = ⌈0.7×5⌉ = 4/5 |
| estimated_hours | 10 |
| requires | `math.nt.fermats-little-theorem` |
| unlocks | `math.nt.rsa-basics` |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — testing a specific pseudoprime against the Fermat test before the general probabilistic-vs-deterministic distinction | 
| description (KG) | Algorithms for determining whether a number is prime; ranging from trial division to probabilistic (Miller-Rabin) and deterministic (AKS) polynomial-time tests. |

## Component 1 — Learning Objectives

- LO1: Apply **trial division** (checking divisibility by every integer up to $\sqrt n$) as the most basic primality test, and recognize its severe impracticality for large $n$ (requiring an infeasible number of candidate divisors), directly motivating the need for faster methods.
- LO2: Apply the **Fermat primality test**, using the CONTRAPOSITIVE of `math.nt.fermats-little-theorem`: if $a^{n-1}\not\equiv1\pmod n$ for some $a$ with $\gcd(a,n)=1$, then $n$ is DEFINITELY composite — but recognize that $a^{n-1}\equiv1\pmod n$ passing for some base $a$ is only EVIDENCE $n$ might be prime, never a proof.
- LO3: Recognize the existence of **Carmichael numbers** — composite numbers that pass the Fermat test for EVERY valid base — genuinely defeating the naive test no matter how many bases are tried, and correctly distinguish **probabilistic** tests (Miller-Rabin: overwhelming confidence, not absolute certainty) from **deterministic** tests (AKS: absolute mathematical certainty).

## Component 2 — Prerequisite Check

Assumes mastery of `math.nt.fermats-little-theorem` (if $p$ is prime and $p\nmid a$, then $a^{p-1}\equiv1\pmod p$; the hypothesis $p\nmid a$ is essential, and violating it produces a genuinely different result).

## Component 3 — Core Explanation

**Trial division: correct but impractically slow**: the most basic primality test checks whether any integer from $2$ up to $\sqrt n$ divides $n$ — if none does, $n$ is prime. This is completely correct, but for a large $n$ (say, hundreds of digits, as used in cryptography), the number of candidate divisors to check becomes utterly infeasible, motivating faster tests.

**The Fermat test: passing is evidence, not proof**: `math.nt.fermats-little-theorem` states that if $n$ is prime and $n\nmid a$, then $a^{n-1}\equiv1\pmod n$. Its CONTRAPOSITIVE gives a genuine primality test: if $a^{n-1}\not\equiv1\pmod n$ for some base $a$, then $n$ is DEFINITELY composite (since a prime $n$ would have forced the congruence to hold). But the CONVERSE direction does not automatically hold: $a^{n-1}\equiv1\pmod n$ passing for some (or even several) base(s) $a$ does NOT prove $n$ is prime — it is only evidence consistent with primality, since some composite numbers can pass this test for specific bases too.

**Carmichael numbers defeat the naive test for every base; probabilistic vs. deterministic tests**: certain composite numbers, called **Carmichael numbers**, pass the Fermat test for EVERY base $a$ coprime to them — no amount of additional base-testing under the plain Fermat test could ever correctly flag them as composite. This motivates stronger tests: **Miller-Rabin** is a refined PROBABILISTIC test that CAN detect Carmichael numbers (using additional structure beyond the plain Fermat congruence), giving overwhelming confidence but not absolute certainty after repeated random-base testing; **AKS** is a DETERMINISTIC, polynomial-time test giving absolute mathematical certainty of the correct answer, historically at the cost of being less practically efficient than probabilistic methods.

## Component 4 — Worked Examples

**Example 1 (LO1 — trial division, and its impracticality for large numbers)**: Is $97$ prime? Check divisibility by primes up to $\sqrt{97}\approx9.8$: $2,3,5,7$. $97$ is odd; digit sum $16$ is not divisible by $3$; doesn't end in $0$ or $5$; $97/7\approx13.86$ (not an integer) — no divisor found, so $97$ IS prime. For a $100$-digit number, however, trial division up to its square root would require testing an astronomically large number of candidates — utterly infeasible in practice, motivating faster methods.

**Example 2 (LO2 — Fermat test passing does not prove primality, breaking MC-1)**: For $n=341$ with base $a=2$: it is a known fact that $2^{340}\equiv1\pmod{341}$ — the Fermat test PASSES for base $2$. But $341=11\times31$ is actually **COMPOSITE**. This directly demonstrates that passing the Fermat test for a specific base does NOT prove primality — $341$ is the smallest Fermat pseudoprime to base $2$, a genuine composite number that fools the test for this particular base.

**Example 3 (LO3 — a Carmichael number fools every base, breaking MC-2 and MC-3)**: $n=561=3\times11\times17$ is the smallest **Carmichael number** — it passes the Fermat test ($a^{560}\equiv1\pmod{561}$) for EVERY base $a$ coprime to $561$, no matter which base is tried. No amount of additional base-testing under the plain Fermat test could ever correctly identify $561$ as composite. This is exactly why Miller-Rabin (using extra structure beyond the plain congruence) is needed — it CAN detect Carmichael numbers, but only gives overwhelming PROBABILISTIC confidence after multiple tests, in contrast to AKS, which gives absolute DETERMINISTIC certainty (at a historical cost in practical efficiency).

## Component 5 — Teaching Actions

### Teaching Action A01 — Trial Division Works, But Doesn't Scale (Primitive P11: Representation Shift)

State: "checking divisors up to $\sqrt n$ is completely correct — the problem is purely practical: for a huge $n$, there are simply too many candidates to check in any reasonable time." Work Example 1's full trial-division check for $97$.

### Teaching Action A02 — Passing the Fermat Test Is Evidence, Not Proof (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: $341$ passes the Fermat test for base $2$ ($2^{340}\equiv1\pmod{341}$), yet $341=11\times31$ is genuinely composite. State: "the Fermat test's CONTRAPOSITIVE gives you certainty when it fails — but passing for some base is only consistent with primality, never a proof of it."

- **MC-1 hook**: ask "if a^(n-1)≡1 (mod n) holds for some base a, does that prove n is prime?" — a "yes" answer reveals MC-1 (mistaking the Fermat test's converse for an automatic guarantee).

### Teaching Action A03 — Carmichael Numbers Fool Every Base; Probabilistic vs. Deterministic (Primitive P06: Contrast Pair)

Present Example 3's direct evidence: $561$ passes the Fermat test for EVERY coprime base, making exhaustive base-testing under the plain test fundamentally unable to catch it. Contrast Miller-Rabin's overwhelming-but-not-absolute confidence against AKS's absolute certainty. State: "testing more and more bases under the plain Fermat test would never catch a Carmichael number — you need a genuinely different kind of test, and even then, 'probabilistic' and 'deterministic' certainty are not the same thing."

- **MC-2 hook**: ask "if I test enough different bases under the Fermat test, will I eventually correctly identify any composite number?" — a "yes" answer reveals MC-2 (missing that Carmichael numbers pass for every valid base, defeating exhaustive base-testing entirely).
- **MC-3 hook**: ask "do probabilistic tests like Miller-Rabin and deterministic tests like AKS give the exact same kind of certainty about a number's primality?" — a "yes" answer reveals MC-3 (missing the fundamental distinction between overwhelming confidence and absolute mathematical certainty).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Use trial division to determine whether $113$ is prime.
  2. Explain why passing the Fermat test for base $a=2$ does not prove $n=561$ is prime, given that $561$ is actually composite.
  3. Explain why testing additional bases would not help correctly classify $561$ as composite under the plain Fermat test.
  4. Explain the difference between Miller-Rabin's "probably prime" conclusion and AKS's "definitely prime" conclusion.
- **P76 (Transfer Probe, mode = independence)**: "A cryptographic system needs to generate very large (hundreds of digits) prime numbers for use in encryption keys. (a) Explain why trial division is completely impractical for verifying primality at this scale. (b) The system uses the Fermat test with several random bases as a quick initial filter. Explain why passing this filter does not fully guarantee the number is prime, and what kind of number could still slip through undetected no matter how many bases are tried. (c) Explain why the system might use Miller-Rabin (rather than trial division) as a practical solution, and what trade-off it accepts by doing so, referencing the probabilistic-vs-deterministic distinction."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | FERMAT-TEST-PASSING-ASSUMED-TO-PROVE-PRIMALITY | Believing a^(n-1)≡1 (mod n) holding for some base a proves n is prime, missing that this is only evidence, never proof | Foundational |
| MC-2 | EXHAUSTIVE-BASE-TESTING-ASSUMED-TO-CATCH-EVERY-COMPOSITE | Believing testing enough different bases under the Fermat test eventually correctly identifies any composite number, missing that Carmichael numbers pass for every valid base | Foundational |
| MC-3 | PROBABILISTIC-AND-DETERMINISTIC-TESTS-ASSUMED-EQUIVALENT | Believing probabilistic tests like Miller-Rabin and deterministic tests like AKS give the exact same kind of certainty, missing the fundamental distinction between overwhelming confidence and absolute mathematical certainty | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Fermat Test Passing Assumed to Prove Primality") → P41 (detect: ask a student whether passing the Fermat test for one base proves primality, and check for a "yes") → P64 (conceptual shift: re-walk Example 2's $341$ pseudoprime, showing it passes for base $2$ yet is composite, re-anchoring on "the test's contrapositive gives certainty on failure — passing is only ever consistent with primality").
- **B02 (targets MC-2)**: P27 (name it: "Exhaustive Base-Testing Assumed to Catch Every Composite") → P41 (detect: ask a student whether testing enough bases would eventually catch any composite number, and check for a "yes") → P64 (conceptual shift: re-walk Example 3's Carmichael number $561$, passing for EVERY coprime base, re-anchoring on "some composite numbers fool the plain test no matter how many bases you try — a genuinely different test is needed").
- **B03 (targets MC-3)**: P27 (name it: "Probabilistic and Deterministic Tests Assumed Equivalent") → P41 (detect: ask a student whether Miller-Rabin and AKS give the same kind of certainty, and check for a "yes") → P64 (conceptual shift: re-emphasize the distinction from Example 3's discussion, re-anchoring on "overwhelming confidence after repeated random testing is genuinely different from absolute mathematical proof").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.nt.fermats-little-theorem` (the theorem whose contrapositive this concept's Fermat test directly uses, and whose essential hypothesis this concept's pseudoprime examples directly probe).
- **Unlocks**: `math.nt.rsa-basics` (RSA cryptography relies on efficiently generating large primes, directly using this concept's primality-testing machinery).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 10 with an expert/analyze tag places this among the corpus's larger concepts; scope was managed by giving LO1 and LO2 full worked-example depth (trial division, the Fermat test and its pseudoprime counterexample), while LO3's Miller-Rabin/AKS distinction is stated and motivated via the Carmichael-number example, without deriving either algorithm's internal mechanics in full — consistent with this corpus's established scoping precedent for large, applied concepts.
- Examples 2 and 3 deliberately use the two most famous, standard counterexamples in this area of number theory ($341$, the smallest Fermat pseudoprime to base $2$; $561$, the smallest Carmichael number) rather than invented examples, for the same reason this corpus favors canonical field examples for genuinely delicate points elsewhere (`math.fnal.spectral-theory`, `math.calc.curl-divergence`).
- This concept's LO2/LO3 progression (a specific pseudoprime, then a number defeating ALL bases) was deliberately structured to escalate the "passing isn't proof" lesson from "possible for one base" to "possible for every base," making the motivation for stronger tests (Miller-Rabin, AKS) feel earned rather than asserted.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.7×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: specific pseudoprime tested before the general probabilistic-vs-deterministic distinction) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
