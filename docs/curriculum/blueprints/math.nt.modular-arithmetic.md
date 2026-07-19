# Teaching Blueprint: Modular Arithmetic (`math.nt.modular-arithmetic`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.nt.modular-arithmetic` |
| name | Modular Arithmetic |
| domain | Number Theory |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 12 |
| requires | `math.nt.division-algorithm`, `math.arith.remainder` |
| unlocks | `math.nt.congruence`, `math.nt.chinese-remainder-theorem`, `math.nt.modular-inverse` |
| cross_links | `math.abst.ring-theory` (**authored** — verified via `ls`; P76_mode = cross-link probe), `math.disc.boolean-circuits` (not yet authored), see Component 7 |
| CPA_entry_stage | C (Concrete) — a clock face before the abstract residue system |
| description (KG) | Arithmetic on a finite set of residues {0, 1, …, n−1}, where arithmetic operations are defined modulo n; foundational to cryptography. |

## Component 1 — Learning Objectives

- LO1: Define arithmetic **modulo $n$** on the finite residue set $\{0,1,\ldots,n-1\}$ — addition, subtraction, and multiplication are performed ordinarily, then reduced by taking the remainder upon division by $n$ (via the Division Algorithm) — and compute $(a+b)\bmod n$, $(a-b)\bmod n$, $(a\times b)\bmod n$ for given values.
- LO2: Correctly handle **negative results** and **results requiring multiple reductions** (e.g. a product far exceeding $n$) by consistently reducing to the unique representative in $\{0,\ldots,n-1\}$, using the Division Algorithm's remainder convention (never a negative residue).
- LO3: Recognize that modular arithmetic on $\mathbb{Z}/n\mathbb{Z}$ satisfies the SAME algebraic laws (commutativity, associativity, distributivity) as ordinary integer arithmetic — but that **not every nonzero residue has a multiplicative inverse** (unlike ordinary nonzero real numbers), and correctly identify which residues do and don't have inverses for a small modulus by direct search.

## Component 2 — Prerequisite Check

Assumes mastery of `math.nt.division-algorithm` (the existence/uniqueness of $q,r$ with $a=bq+r$, $0\leq r<b$ — the remainder computation THIS concept performs repeatedly) and `math.arith.remainder` (the informal remainder operation).

## Component 3 — Core Explanation

**Modular arithmetic** works on the finite set of residues $\{0,1,\ldots,n-1\}$ (for a fixed modulus $n$). To compute $(a+b)\bmod n$, $(a-b)\bmod n$, or $(a\times b)\bmod n$: perform the operation ORDINARILY first, then reduce the result to its remainder upon division by $n$ (via the Division Algorithm — ALWAYS landing in $\{0,\ldots,n-1\}$, never negative, regardless of how the intermediate computation turned out).

**Handling negative and large intermediate results**: subtraction can produce a negative intermediate value (e.g. $3-8=-5$) — reduce it using the Division Algorithm's convention, giving a nonnegative result in $\{0,\ldots,n-1\}$ (e.g. mod 7: $-5 = 7(-1)+2$, so $-5\equiv2\pmod7$). Multiplication can produce a result far exceeding $n$ (e.g. $8\times9=72$) — reduce the SAME way, dividing by $n$ and keeping only the remainder.

**Modular arithmetic satisfies the same algebraic laws as ordinary arithmetic** — addition and multiplication modulo $n$ are commutative, associative, and multiplication distributes over addition — EXACTLY the same structural laws ordinary integer arithmetic satisfies (this is not a coincidence; it follows because modular reduction is compatible with these operations).

**But NOT every nonzero residue has a multiplicative inverse**: in ordinary arithmetic, every nonzero real number has a multiplicative inverse ($\frac1x$ for $x\neq0$). In $\mathbb{Z}/n\mathbb{Z}$, a residue $a$ has a multiplicative inverse (some $b$ with $ab\equiv1\pmod n$) **only when $\gcd(a,n)=1$** — some nonzero residues genuinely have NO inverse (e.g., modulo 6, the residue 2 has no multiplicative inverse, since $\gcd(2,6)=2\neq1$).

## Component 4 — Worked Examples

**Example 1 (LO1/LO2 — the three operations, including negative/large reductions)**: Modulo 7: $(5+4)\bmod7 = 9\bmod7=2$. $(3-8)\bmod7$: $3-8=-5$, and $-5=7(-1)+2$, so $(3-8)\bmod7=2$. $(6\times5)\bmod7 = 30\bmod7$: $30=7(4)+2$, so $=2$.

**Example 2 (LO3 — same algebraic laws hold)**: Verify commutativity and distributivity modulo 5: $(3\times4)\bmod5 = 12\bmod5=2$; $(4\times3)\bmod5=12\bmod5=2$ — matches, confirming commutativity. Distributivity: $2\times(3+4)\bmod5 = 2\times7\bmod5=14\bmod5=4$; separately $(2\times3+2\times4)\bmod5=(6+8)\bmod5=14\bmod5=4$ — matches, confirming distributivity holds modulo 5 exactly as it does for ordinary integers.

**Example 3 (LO3 — not every residue has an inverse, breaking MC-1)**: Modulo 6, search for a multiplicative inverse of 2 (some $b\in\{0,\ldots,5\}$ with $2b\equiv1\pmod6$): $2\times0=0$, $2\times1=2$, $2\times2=4$, $2\times3=6\equiv0$, $2\times4=8\equiv2$, $2\times5=10\equiv4$ — NONE of these ever equal 1. Residue 2 has **no multiplicative inverse modulo 6** (confirmed by $\gcd(2,6)=2\neq1$). Contrast: modulo 7 (a PRIME modulus), search for the inverse of 2: $2\times4=8\equiv1\pmod7$ — found! Residue 2 DOES have an inverse (namely 4) modulo 7, since $\gcd(2,7)=1$.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Three Operations, via a Clock Face (Primitive P11: Representation Shift)

Start concrete: a 12-hour clock face naturally "wraps around" — 3 hours after 10 o'clock is 1 o'clock, not 13 o'clock. State: "modular arithmetic is exactly this wrap-around idea, generalized to any modulus $n$, not just 12." Work Example 1's three operations explicitly, showing the "compute ordinarily, then reduce via the Division Algorithm" procedure for addition, subtraction (including a negative intermediate result), and multiplication (including a large intermediate result).

- **MC-1 hook**: ask "does every nonzero number modulo $n$ have a multiplicative inverse, the same way every nonzero real number does?" — a "yes" answer reveals MC-1 (over-generalizing ordinary real-number arithmetic's every-nonzero-has-an-inverse property to modular arithmetic, where this genuinely fails for many moduli/residue pairs).

### Teaching Action A02 — Same Algebraic Laws, But Inverses Are Not Guaranteed (Primitive P06: Contrast Pair)

**Contrast 1**: Work Example 2's commutativity and distributivity verifications explicitly, establishing that modular arithmetic genuinely inherits ordinary arithmetic's structural laws — this sets up the CONTRAST that follows, since one might otherwise assume EVERY property of ordinary arithmetic carries over identically.

**Contrast 2 (targets MC-1)**: Work Example 3's direct search for 2's inverse modulo 6 (exhaustively checking all six residues, finding none work) directly beside the SAME search modulo 7 (finding 4 works immediately). State the precise rule: "a residue $a$ has an inverse modulo $n$ exactly when $\gcd(a,n)=1$ — for PRIME moduli, EVERY nonzero residue automatically satisfies this (since a prime shares no common factor with any smaller positive number), but for composite moduli, some residues (those sharing a common factor with $n$) genuinely have no inverse at all."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Compute $(9+8)\bmod5$, $(4-11)\bmod5$, and $(7\times8)\bmod5$.
  2. Verify associativity of multiplication modulo 4 using specific values $2,3,3$: compute $(2\times3)\times3\bmod4$ and $2\times(3\times3)\bmod4$, confirming they match.
  3. Search (by direct trial) for a multiplicative inverse of 3 modulo 8, and separately for a multiplicative inverse of 4 modulo 8. Explain why one exists and the other doesn't, using $\gcd$.
  4. Explain why every nonzero residue modulo a PRIME number $p$ automatically has a multiplicative inverse, using the $\gcd(a,n)=1$ criterion.
- **P76 (Transfer Probe, mode = cross-link probe against `math.abst.ring-theory`)**: "Recall from your `math.abst.ring-theory` lesson that a ring requires $(R,+)$ to be an abelian group, multiplication to be associative, and multiplication to distribute over addition — and that $\mathbb{Z}/n\mathbb{Z}$ (the residues modulo $n$) was named there as a standard example of a commutative ring. (a) Using THIS lesson's verified facts (Example 2's commutativity/distributivity checks), confirm explicitly which of that ring's required axioms $\mathbb{Z}/6\mathbb{Z}$ satisfies. (b) That ring-theory lesson's axioms do NOT require every nonzero element to have a multiplicative inverse (that stronger requirement defines a FIELD, not merely a ring) — using this lesson's finding that 2 has no inverse modulo 6, explain why $\mathbb{Z}/6\mathbb{Z}$ is a genuine ring but NOT a field, while $\mathbb{Z}/7\mathbb{Z}$ (where every nonzero residue has an inverse, since 7 is prime) IS both a ring and a field."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | EVERY-NONZERO-RESIDUE-ASSUMED-TO-HAVE-INVERSE | Believing every nonzero residue modulo $n$ has a multiplicative inverse, over-generalizing from ordinary nonzero-real-number arithmetic, without checking $\gcd(a,n)=1$ | Foundational |
| MC-2 | NEGATIVE-INTERMEDIATE-RESULT-LEFT-UNREDUCED | Leaving a negative intermediate computation (e.g. from subtraction) as the final "modular" answer, rather than reducing it to the correct nonnegative residue in $\{0,\ldots,n-1\}$ via the Division Algorithm | Foundational |
| MC-3 | MODULUS-CONFUSED-WITH-RESIDUE-SET-SIZE-OFF-BY-ONE | Believing the residue set for modulus $n$ is $\{1,\ldots,n\}$ (or otherwise miscounting the boundary), rather than the correct $\{0,\ldots,n-1\}$ | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Universal-Inverse Overgeneralization") → P41 (detect: ask whether 2 has a multiplicative inverse modulo 6, checking for an unverified "yes") → P64 (conceptual shift: work through Example 3's exhaustive search, showing directly that no residue modulo 6 multiplies with 2 to give 1, and connecting the failure to $\gcd(2,6)=2\neq1$).
- **B02 (targets MC-2)**: P27 (name it: "Unreduced Negative Result") → P41 (detect: check whether a student's answer to a modular subtraction problem is left as a negative number rather than reduced to $\{0,\ldots,n-1\}$) → P64 (conceptual shift: re-derive via the Division Algorithm explicitly — the negative intermediate value must still be expressed as $bq+r$ with $0\leq r<b$, exactly as that concept established).
- **B03 (targets MC-3)**: P27 (name it: "Residue Set Boundary Miscounted") → P41 (detect: ask a student to list the full residue set for modulus 5, checking whether they include 0 and exclude 5) → P64 (conceptual shift: re-anchor on "the residues are the POSSIBLE REMAINDERS from the Division Algorithm — which range from 0 up to (but not including) $n$ itself, giving exactly $n$ values: $\{0,1,\ldots,n-1\}$").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.nt.division-algorithm` (the remainder computation this concept performs repeatedly to reduce every arithmetic result), `math.arith.remainder` (the informal remainder operation this concept builds a full arithmetic system upon).
- **Unlocks**: `math.nt.congruence` (the congruence relation $a\equiv b\pmod n$ is defined directly using this concept's residue system), `math.nt.chinese-remainder-theorem` (combines modular arithmetic across multiple coprime moduli), `math.nt.modular-inverse` (a dedicated deep treatment of exactly when and how to compute the multiplicative inverses this concept introduces).
- **Cross-link**: KG lists `math.abst.ring-theory` and `math.disc.boolean-circuits` as cross-links. Verified via directory listing that `docs/curriculum/blueprints/math.abst.ring-theory.md` **is already authored** (confirmed by reading its content: the R1-R7 ring axioms, $\mathbb{Z}/n\mathbb{Z}$ named as a standard commutative-ring example, and explicit distinguishing of ring axioms from the stronger field requirement of universal multiplicative inverses). `math.disc.boolean-circuits` remains unauthored. Per the established mixed-cross-link-status rule, this blueprint uses a genuine **cross-link probe** against the authored `math.abst.ring-theory` target — directly requiring the learner to verify $\mathbb{Z}/6\mathbb{Z}$'s ring axioms and correctly classify it as a ring-but-not-field, using this concept's own inverse-existence finding.

## Component 8 — Teaching Notes

- estimated_hours = 12 with a proficient/apply tag reflects genuinely broad content — three operations, negative/large-result handling, and the inverse-existence subtlety — the "2 main TAs + gate" structure (A01: the three operations via the clock-face anchor; A02: same-laws-but-not-guaranteed-inverses contrast) was kept to two despite the hour count, since the underlying skill (reduce via the Division Algorithm consistently, then reason about which algebraic properties transfer and which don't) is conceptually unified.
- MC-1 (every nonzero residue assumed to have an inverse) was made this blueprint's central focus, and the cross-link probe to `math.abst.ring-theory` was deliberately designed to reinforce it from a SECOND angle — connecting the concrete inverse-existence failure (2 has no inverse mod 6) to the abstract ring-vs-field distinction that concept already established, giving the same correction two independent, mutually-reinforcing groundings.
- The cryptography-foundational framing named in the KG's own description was deliberately not developed into a dedicated worked example or transfer probe in this blueprint, since RSA-style cryptographic applications require modular EXPONENTIATION and modular inverses at a depth genuinely belonging to `math.nt.modular-inverse` (this concept's own unlock) rather than this foundational arithmetic-operations concept — avoiding scope creep into content the dedicated successor concept owns.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (mixed: `math.abst.ring-theory` present → cross-link probe; `math.disc.boolean-circuits` absent, noted) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe against authored target) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: clock face before abstract residue system) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO3, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
