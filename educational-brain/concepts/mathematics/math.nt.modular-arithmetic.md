# math.nt.modular-arithmetic

## Identity
- **KG ID**: `math.nt.modular-arithmetic`
- **Domain**: math.nt (Number Theory)
- **Requires**: `math.nt.division-algorithm`, `math.arith.remainder`
- **Unlocks**: `math.nt.congruence`, `math.nt.chinese-remainder-theorem`, `math.nt.modular-inverse`
- **Cross-links**: `math.abst.ring-theory` (authored — Blueprint verified via directory listing; P76_mode = cross-link probe), `math.disc.boolean-circuits` (not yet authored).
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.8 (⌈0.8×5⌉ = 4/5)
- **Estimated hours**: 12
- **Blueprint**: `docs/curriculum/blueprints/math.nt.modular-arithmetic.md` (reused by reference throughout this entry).

## Learning Objective
The student will define and compute addition, subtraction, and multiplication modulo n on the residue set {0,1,...,n-1}, correctly reduce negative and large intermediate results to their unique nonnegative representative, and recognize that while modular arithmetic inherits the same algebraic laws (commutativity, associativity, distributivity) as ordinary arithmetic, not every nonzero residue has a multiplicative inverse — determining by direct search which residues do, for a small modulus.

## Core Understanding
Per the Blueprint's Component 3: modular arithmetic works on the finite residue set {0,1,...,n-1} for a fixed modulus n. To compute (a+b) mod n, (a−b) mod n, or (a×b) mod n: perform the operation ordinarily first, then reduce the result to its remainder upon division by n via the Division Algorithm — always landing in {0,...,n-1}, never negative, regardless of the intermediate value. Negative intermediate results (e.g. 3−8=−5) are reduced the same way (mod 7: −5=7(−1)+2, so −5≡2). Large intermediate results (e.g. 8×9=72) are reduced identically. Modular arithmetic satisfies the same algebraic laws ordinary integer arithmetic does — addition and multiplication modulo n are commutative and associative, and multiplication distributes over addition — because modular reduction is compatible with these operations. But NOT every nonzero residue has a multiplicative inverse: a residue a has a multiplicative inverse (some b with ab≡1 mod n) only when gcd(a,n)=1 — for prime moduli every nonzero residue automatically qualifies, but for composite moduli, residues sharing a common factor with n genuinely have none (e.g. modulo 6, the residue 2 has no inverse, since gcd(2,6)=2≠1).

## Mental Models
1. **The clock-face model** (Blueprint TA-A01): a 12-hour clock naturally wraps around — 3 hours after 10 o'clock is 1 o'clock, not 13 — modular arithmetic generalizes this wrap-around to any modulus n.
2. **The compute-then-reduce model**: every operation is performed ordinarily first (possibly producing a negative or oversized intermediate value), THEN reduced via the Division Algorithm to land in {0,...,n-1}.
3. **The same-laws-different-inverses model** (Blueprint TA-A02): modular arithmetic inherits ordinary arithmetic's structural laws wholesale, but the existence of multiplicative inverses is a genuinely separate question, governed by gcd(a,n)=1.

## Why Students Fail
Per the Blueprint's Misconception Registry: the foundational failure is over-generalizing ordinary nonzero-real-number arithmetic's "every nonzero number has an inverse" property onto modular arithmetic, without checking gcd(a,n)=1 — a property that genuinely fails for many modulus/residue pairs. A second failure is leaving a negative intermediate computation (from subtraction) as the final "modular" answer, rather than reducing it to the correct nonnegative residue via the Division Algorithm. A third failure is believing the residue set for modulus n is {1,...,n} rather than the correct {0,...,n-1}, miscounting which boundary value is included.

## Misconceptions
Reused by reference from the Blueprint's Component 6 Misconception Registry, with birth-type classification added:

- **MC-1 — EVERY-NONZERO-RESIDUE-ASSUMED-TO-HAVE-INVERSE** (FOUNDATIONAL)
  - **Blueprint description**: believing every nonzero residue modulo n has a multiplicative inverse, over-generalizing from ordinary nonzero-real-number arithmetic, without checking gcd(a,n)=1.
  - **Birth type**: Type 1, overgeneralization — the universal-inverse property of ordinary nonzero real numbers is carried over wholesale onto the new residue system, without testing whether the new system actually preserves it.
  - **Repair approach**: Blueprint Repair Action B01 — working through Example 3's exhaustive search showing no residue modulo 6 multiplies with 2 to give 1, connecting the failure to gcd(2,6)=2≠1.

- **MC-2 — NEGATIVE-INTERMEDIATE-RESULT-LEFT-UNREDUCED** (FOUNDATIONAL)
  - **Blueprint description**: leaving a negative intermediate computation as the final "modular" answer, rather than reducing it to the correct nonnegative residue in {0,...,n-1} via the Division Algorithm.
  - **Birth type**: Type 5, instruction-induced — addition and multiplication modulo n rarely produce negative intermediates, so the reduction habit is under-practiced specifically for the subtraction case where it is most needed.
  - **Repair approach**: Blueprint Repair Action B02 — re-deriving via the Division Algorithm explicitly, showing the negative intermediate must still be expressed as bq+r with 0≤r<b.

- **MC-3 — MODULUS-CONFUSED-WITH-RESIDUE-SET-SIZE-OFF-BY-ONE** (Moderate)
  - **Blueprint description**: believing the residue set for modulus n is {1,...,n} (or otherwise miscounting the boundary), rather than the correct {0,...,n-1}.
  - **Birth type**: Type 3, language contamination — everyday counting language ("1 through n") is the default counting frame, and it takes an explicit correction to recognize the residue set starts at 0 and stops one short of n.
  - **Repair approach**: Blueprint Repair Action B03 — re-anchoring on "the residues are the POSSIBLE REMAINDERS from the Division Algorithm, ranging from 0 up to but not including n."

## Analogies
- **The clock-face analogy** (Blueprint TA-A01): the everyday experience of a 12-hour clock wrapping past 12 back to 1, generalized to any modulus n.

## Demonstrations
- The three operations worked with negative and large intermediate results, modulo 7 (Blueprint Example 1): (5+4) mod 7=2; (3−8) mod 7=2; (6×5) mod 7=2.
- Commutativity and distributivity verified directly modulo 5 (Blueprint Example 2), confirming the same-laws claim.
- The exhaustive search for 2's inverse modulo 6 (none found) contrasted directly against the same search modulo 7 (4 found), targeting MC-1 (Blueprint Example 3).

## Discovery Questions
1. "If 3 hours after 10 o'clock is 1 o'clock, not 13 — what rule turns 13 into 1?"
2. "Does every nonzero number modulo n have a multiplicative inverse, the same way every nonzero real number does?"
3. "When you subtract and get a negative number, is that your final modular answer — or is there one more step?"

## Teaching Sequence
Follows the Blueprint's Component 5 exactly: TA-A01 (the three operations via the clock-face anchor, MC-1 hook) → TA-A02 (same algebraic laws but inverses not guaranteed, contrast pair using Examples 2 and 3) → TA-A03 (Mastery Gate, P91).

## Tutor Actions
- **SHOW: Analogy** — the 12-hour clock-face wrap-around (Blueprint TA-A01).
- **DO: Worked Example** — the three operations with negative/large-result reduction, modulo 7 (Blueprint Example 1).
- **TEST-THINKING: Error Analysis** — the exhaustive inverse search modulo 6 versus modulo 7 (Blueprint Example 3), targeting MC-1.
- **TELL: Explanation** — the precise rule: a residue has an inverse mod n exactly when gcd(a,n)=1 (Blueprint TA-A02, Contrast 2).

## Voice Teaching Notes
Ask "does every nonzero residue have an inverse here?" before any inverse-related claim is accepted as final — this standing check directly targets MC-1's overgeneralization before it calcifies into a default assumption.

## Assessment Signals
- **P76 (transfer probe, cross-link probe mode against `math.abst.ring-theory` per the Blueprint's Component 7 — cross_links includes an authored target)**: reused verbatim from the Blueprint's Component 5 A03 — confirming Z/6Z's ring axioms and explaining why it is a ring but not a field, contrasted with Z/7Z.
- **P77 (mastery gate)**: the Blueprint's 4-item problem set (Component 5 A03), MAMR 4/5.

## Tutor Recovery Strategy
If MC-1 persists, require the student to run an exhaustive by-hand search for the inverse of a specific residue under a composite modulus before accepting any general inverse-existence claim, until checking gcd(a,n)=1 becomes the automatic first step.

## Memory Hooks
- "Compute ordinarily first, then reduce to {0,...,n-1} — always nonnegative, never negative."
- "Same laws as ordinary arithmetic — but inverses need gcd(a,n)=1, not just 'nonzero'."
- "The residue set has exactly n values: 0 through n−1, not 1 through n."

## Transfer Connections
- `math.nt.congruence` (unlocks) defines the relation a≡b (mod n) directly using this concept's residue system.
- `math.nt.chinese-remainder-theorem` (unlocks) combines modular arithmetic across multiple coprime moduli.
- `math.nt.modular-inverse` (unlocks) gives a dedicated deep treatment of exactly when and how to compute the multiplicative inverses this concept introduces.
- `math.abst.ring-theory` (cross-link, authored): Z/nZ is named there as a standard commutative-ring example; this concept's inverse-existence finding is exactly what distinguishes a ring from a field.

## Cross-Subject Connections
- Computer science / cryptography: modular arithmetic is foundational to cryptographic systems and to digital-circuit design via modular counters.

## Blueprint References
`docs/curriculum/blueprints/math.nt.modular-arithmetic.md` — all worked examples, teaching actions, and the P76/P77 assessment items reused by reference, not restated in full.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None — the Blueprint's own mixed cross-link finding (`math.abst.ring-theory` authored, `math.disc.boolean-circuits` not) was independently re-verified at authoring time and remains accurate.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.nt Wave 4.
