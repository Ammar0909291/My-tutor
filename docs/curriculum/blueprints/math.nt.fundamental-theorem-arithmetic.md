# Teaching Blueprint: Fundamental Theorem of Arithmetic (`math.nt.fundamental-theorem-arithmetic`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.nt.fundamental-theorem-arithmetic` |
| name | Fundamental Theorem of Arithmetic |
| domain | Number Theory |
| difficulty | proficient |
| bloom | understand |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 5 |
| requires | `math.nt.prime-factorization` |
| unlocks | `math.nt.gcd`, `math.nt.lcm` |
| cross_links | `math.abst.ufd` (**not yet authored** — verified via `ls`; P76_mode = independence, see Component 7) |
| CPA_entry_stage | C (Concrete) — factor trees before the uniqueness statement |
| description (KG) | Every integer greater than 1 is either prime or can be expressed uniquely (up to order) as a product of prime numbers. |

## Component 1 — Learning Objectives

- LO1: State the **Fundamental Theorem of Arithmetic** precisely: every integer $n>1$ is either prime, or can be expressed as a product of primes, and this factorization is **unique up to the order** the factors are written in.
- LO2: Correctly interpret "**unique up to order**" — two factorizations that use the SAME prime factors with the SAME multiplicities, merely listed in a different sequence, count as the SAME factorization, not two different ones — and distinguish this from a genuinely DIFFERENT factorization (different primes or different multiplicities).
- LO3: Recognize the theorem's two SEPARATE claims — **existence** (a factorization exists at all) and **uniqueness** (it's the only one, up to order) — and explain why both parts require justification (existence is comparatively easy to see via repeated division; uniqueness is the theorem's deeper, non-obvious content).

## Component 2 — Prerequisite Check

Assumes mastery of `math.nt.prime-factorization` (writing a composite integer as a product of prime powers).

## Component 3 — Core Explanation

**The Fundamental Theorem of Arithmetic**: every integer $n>1$ is either **prime**, or can be written as a **product of primes**, and this factorization is **unique up to the order** of the factors.

**"Unique up to order" precisely explained**: for $n=60$, one valid factorization is $2\times2\times3\times5$; another way to WRITE the same fact is $5\times3\times2\times2$ or $2\times3\times2\times5$ — these are all considered the SAME factorization, since they use the identical multiset of prime factors ($\{2,2,3,5\}$), merely reordered. A genuinely DIFFERENT factorization would require different primes or different exponents — e.g. there is no OTHER valid way to write 60 as a product of primes using, say, three 2's instead of two, or a 7 instead of a 5.

**Two separate claims — existence and uniqueness**:
- **Existence**: every $n>1$ CAN be factored into primes — reasonably easy to see: if $n$ is prime, done; if composite, it has a divisor $d$ with $1<d<n$, and both $d$ and $n/d$ can (by strong induction on smaller numbers) themselves be factored into primes, giving a factorization of $n$.
- **Uniqueness**: this factorization is the ONLY one (up to order) — this is the theorem's genuinely deep content, NOT obvious from existence alone, and requires a real proof (typically using Euclid's Lemma: if a prime $p$ divides a product $ab$, then $p$ divides $a$ or $p$ divides $b$ — a fact that, notably, is specific to PRIME numbers and fails for composite divisors).

## Component 4 — Worked Examples

**Example 1 (LO1 — factoring and confirming uniqueness up to order)**: Factor $84$: $84=2\times42=2\times2\times21=2\times2\times3\times7$. So $84=2^2\times3\times7$. Any other valid prime factorization of 84 must use EXACTLY these primes with EXACTLY these exponents — there is no alternative factorization like $2\times2\times2\times\ldots$ using a different combination that also multiplies to 84.

**Example 2 (LO2 — same factorization, different order, breaking MC-1)**: Two students factor 90 differently: Student A gets $2\times3\times3\times5$; Student B gets $3\times5\times2\times3$ (starting by dividing by 3 first, then 5, then 2, then 3 again). Are these different factorizations? NO — both use the exact multiset $\{2,3,3,5\}$ — merely written in a different order. This IS the same factorization, exactly as the theorem's "unique up to order" clause anticipates.

**Example 3 (LO3 — existence vs. uniqueness as separate claims)**: Existence for $n=17$: since 17 is prime, it "factors" trivially as itself (a factorization with one prime factor). Existence for $n=100$: divide repeatedly, $100=2\times50=2\times2\times25=2\times2\times5\times5=2^2\times5^2$ — a factorization exists, found mechanically via repeated division. The UNIQUENESS claim is a genuinely separate, stronger statement: not merely that SOME factorization can be found (which the repeated-division process above already demonstrates), but that NO other combination of primes could ALSO multiply to give 100 — e.g., there is no way to write 100 using a 3 or a 7 as one of the prime factors, no matter how the search is conducted; this stronger "no alternative exists" guarantee is what Euclid's Lemma-based proof actually establishes, beyond the comparatively simple existence argument.

## Component 5 — Teaching Actions

### Teaching Action A01 — Existence via Factor Trees (Primitive P11: Representation Shift)

Start concrete: build a factor tree for 84, branching by dividing repeatedly until only primes remain, working Example 1 explicitly. State: "this factor-tree process ALWAYS terminates in a valid prime factorization — that's the EXISTENCE half of the theorem, and it's the comparatively easy part to see."

Shift representation to the "unique up to order" statement: work Example 2's two-students scenario, showing both factor $90$ into the identical multiset of primes, merely in different orders — confirming this counts as ONE factorization, not two.

- **MC-1 hook**: ask "do Student A and Student B (from Example 2) get two DIFFERENT valid factorizations of 90, since they wrote the factors in different orders?" — a "yes" answer reveals MC-1 (treating differently-ORDERED but equal-content factorizations as genuinely distinct, rather than recognizing "unique up to order" explicitly identifies them).

### Teaching Action A02 — Existence vs. Uniqueness as Two Separate Claims (Primitive P06: Contrast Pair)

**Contrast 1 (targets MC-1)**: Revisit Example 2, explicitly separating "these are the same multiset $\{2,3,3,5\}$" (same factorization) from a genuinely hypothetical DIFFERENT factorization like "$\{2,3,15\}$" (not actually valid, since 15 isn't prime — but illustrating what a genuinely different, and here invalid, factorization attempt would look like). State the precise rule: "compare the MULTISET of prime factors (which primes, and how many of each) — if two factorizations have the identical multiset, they're the SAME factorization; order of writing is irrelevant."

**Contrast 2**: Work through Example 3's existence-vs-uniqueness distinction explicitly — state that existence (SOME factorization can always be found, shown via the mechanical factor-tree process) is logically weaker than uniqueness (NO alternative factorization exists) — the theorem asserts BOTH, but they require fundamentally different kinds of justification, with uniqueness being the genuinely deep, non-obvious half (relying on Euclid's Lemma, itself a nontrivial fact specific to primes).

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Find the prime factorization of 120, and state it in the standard $p_1^{e_1}p_2^{e_2}\cdots$ form.
  2. Two students factor 45 differently: one gets $3\times3\times5$, the other gets $5\times3\times3$. Are these the same factorization? Justify using the theorem's "unique up to order" clause.
  3. Explain, in your own words, why "existence" (a factorization can be found) is a logically WEAKER claim than "uniqueness" (no other factorization exists), using an example.
  4. A student claims 36 can be factored BOTH as $2^2\times3^2$ and as $4\times9$. Explain why these are not two genuinely different PRIME factorizations, addressing what's different about the second expression.
- **P76 (Transfer Probe, mode = independence)**: "A cryptographic system's security relies partly on the fact that a large composite number (the product of two large primes) has essentially only ONE way to be factored into primes — meaning if an attacker could find ANY valid prime factorization, it would necessarily reveal the SAME two secret primes the system was built from, no matter what method or order of discovery was used. (a) Using this lesson's uniqueness claim, explain why this guarantee — that no alternative, different factorization could exist — is precisely what makes 'finding A factorization' equivalent to 'finding THE (unique) intended factorization' in this security context. (b) Explain briefly why this guarantee would be far less useful for security purposes if the Fundamental Theorem of Arithmetic only guaranteed EXISTENCE (a factorization exists) without also guaranteeing UNIQUENESS (it's the only one)."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | REORDERED-FACTORIZATION-TREATED-AS-DIFFERENT | Believing two factorizations using the identical multiset of primes, merely written in a different order, count as genuinely different factorizations | Foundational |
| MC-2 | EXISTENCE-AND-UNIQUENESS-CONFLATED-AS-ONE-CLAIM | Not recognizing existence (a factorization can be found) and uniqueness (no alternative exists) as two logically separate claims requiring separate justification | Moderate |
| MC-3 | NON-PRIME-FACTOR-GROUPINGS-TREATED-AS-VALID-ALTERNATIVE-FACTORIZATIONS | Treating an expression like $36=4\times9$ (factors that aren't themselves prime) as a genuinely different valid "prime factorization" alternative to $36=2^2\times3^2$, rather than recognizing it simply isn't a prime factorization at all | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Reordered Factorization Treated as Different") → P41 (detect: present two differently-ordered but identical-multiset factorizations and ask if they're different) → P64 (conceptual shift: re-anchor on "compare the MULTISET — which primes, how many of each — order of writing carries no mathematical meaning here").
- **B02 (targets MC-2)**: P27 (name it: "Existence/Uniqueness Conflation") → P41 (detect: ask a student to state the Fundamental Theorem of Arithmetic and check whether they distinguish the two claims or state only one) → P64 (conceptual shift: work through Example 3's explicit separation — the factor-tree process demonstrates existence mechanically; uniqueness is a separate, stronger, non-obvious guarantee).
- **B03 (targets MC-3)**: P27 (name it: "Non-Prime Grouping Treated as Alternative Factorization") → P41 (detect: present $36=4\times9$ and ask if this is a different valid prime factorization from $2^2\times3^2$) → P64 (conceptual shift: re-anchor on "a PRIME factorization requires every factor to actually BE prime — 4 and 9 aren't primes, so $4\times9$ isn't a prime factorization at all, just an ordinary factoring; break it down further and you land back on the same $2^2\times3^2$").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.nt.prime-factorization` (the mechanical process of factoring a composite number into primes, this theorem's existence claim formalizes and whose uniqueness this theorem additionally guarantees).
- **Unlocks**: `math.nt.gcd` (computing the GCD via prime factorizations relies directly on this theorem's uniqueness guarantee, comparing matched prime-power exponents), `math.nt.lcm` (similarly for the LCM).
- **Cross-link**: KG lists `math.abst.ufd` as a cross-link. Verified via directory listing that no blueprint yet exists at `docs/curriculum/blueprints/math.abst.ufd.md`. Per the established P76_mode rule, this blueprint uses **independence** mode. A future revision, once that concept is authored, may add a genuine cross-link probe connecting this concept's specific integer-factorization uniqueness directly to the general abstract-algebra notion of a Unique Factorization Domain (UFD) — the Fundamental Theorem of Arithmetic is precisely the statement that $\mathbb{Z}$ is a UFD.

## Component 8 — Teaching Notes

- estimated_hours = 5 with a proficient/understand tag places this at the "2 main TAs + gate" tier — A01 (existence via factor trees, plus the "unique up to order" clarification) and A02 (the existence-vs-uniqueness contrast) jointly cover all three LOs.
- MC-1 (reordered factorization treated as different) was given the most direct teaching attention because it is the single most common surface-level confusion about a theorem whose name ("unique") might otherwise seem to promise something stricter than it actually does — students correctly performing factor-tree computations sometimes doubt their own correct answer when a classmate's differently-ordered result looks superficially different.
- The cryptography transfer probe was chosen because the uniqueness guarantee (not merely existence) is precisely what makes RSA-style factoring-based security meaningful — an attacker who found "a" factorization would have found "the" factorization, which is exactly the practical payoff of the theorem's stronger (uniqueness) half, giving this often-taken-for-granted theorem genuine applied stakes.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.nt.prime-factorization`) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.abst.ufd` confirmed absent → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: factor trees before uniqueness statement) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
