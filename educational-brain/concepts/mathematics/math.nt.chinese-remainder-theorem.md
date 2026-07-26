# math.nt.chinese-remainder-theorem

## Identity
- **KG ID**: `math.nt.chinese-remainder-theorem`
- **Domain**: math.nt (Number Theory)
- **Requires**: `math.nt.congruence`, `math.nt.gcd`
- **Unlocks**: none
- **Cross-links**: `math.abst.ring-theory` (authored — Blueprint verified via directory listing; P76_mode = cross-link probe).
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.75 (⌈0.75×5⌉ = 4/5)
- **Estimated hours**: 8
- **Blueprint**: `docs/curriculum/blueprints/math.nt.chinese-remainder-theorem.md` (reused by reference throughout this entry).

## Learning Objective
The student will state the Chinese Remainder Theorem precisely (for pairwise coprime moduli, a system of congruences has a unique solution modulo the product) and correctly identify when the hypothesis fails, solve a 2-modulus system by construction using gcd's own Bézout machinery rather than trial search, and recognize the theorem's deeper structural meaning as a ring isomorphism between Z/NZ and the product ring of the individual moduli.

## Core Understanding
Per the Blueprint's Component 3: given moduli n1,...,nk that are pairwise coprime (gcd(ni,nj)=1 for every pair), the system of congruences x≡a1 (mod n1),...,x≡ak (mod nk) always has a solution, unique modulo N=n1n2...nk. Without pairwise coprimality, the system can genuinely have no solution at all. Construction uses gcd's own Bézout machinery, not trial search: for two coprime moduli, Bézout's identity gives integers s,t with sn1+tn2=1, and x=a1tn2+a2sn1 solves both congruences directly — this reuses already-known tools, not new machinery. CRT is a ring isomorphism: the map φ:Z/NZ→Z/n1Z×...×Z/nkZ sending x mod N to (x mod n1,...,x mod nk) respects both ring operations, and CRT's existence-and-uniqueness claim is exactly the statement that φ is a bijection — surjective (existence) and injective (uniqueness) — making it a genuine ring isomorphism in ring-theory's own terms.

## Mental Models
1. **The checkable-hypothesis model** (Blueprint TA-A01): pairwise coprimality must be verified via gcd before applying the theorem — it is not automatic, and the system can genuinely have no solution without it.
2. **The reuse-not-reinvent model** (Blueprint TA-A02): CRT's construction directly reuses gcd's own Bézout coefficients — no new algorithmic machinery is needed.
3. **The structural-isomorphism model** (Blueprint TA-A03): "unique solution mod N" is not a standalone numeric fact — it is exactly the statement that Z/NZ and the product ring are the same ring, described two different ways.

## Why Students Fail
Per the Blueprint's Misconception Registry: the foundational failure is believing CRT guarantees a solution for any system of congruences regardless of the moduli's coprimality, missing that pairwise coprimality is a genuine, checkable hypothesis. A high-severity failure is believing the standard method for solving a CRT system is trial-and-error search rather than the direct Bézout-based construction reusing gcd's own machinery. A third failure is believing CRT's "unique solution modulo N" is a standalone numeric fact, missing its deeper reading as a ring isomorphism.

## Misconceptions
Reused by reference from the Blueprint's Component 6 Misconception Registry, with birth-type classification added:

- **MC-1 — PAIRWISE-COPRIME-HYPOTHESIS-ASSUMED-AUTOMATIC** (FOUNDATIONAL)
  - **Blueprint description**: believing CRT guarantees a solution for any system of congruences regardless of the moduli's coprimality, missing that pairwise coprimality is a genuine, checkable hypothesis.
  - **Birth type**: Type 5, instruction-induced — the theorem is often recalled in an abbreviated form ("the system has a unique solution mod N") that drops the pairwise-coprime qualifier, since the qualifier is stated once during setup but rarely re-emphasized during application.
  - **Repair approach**: Blueprint Repair Action B01 — re-walking Example 1's direct contradiction (x≡1 mod 4 forces odd, x≡0 mod 6 forces even) when the hypothesis genuinely fails.

- **MC-2 — CRT-SOLVED-BY-TRIAL-SEARCH** (High)
  - **Blueprint description**: believing the standard method for solving a CRT system is trial-and-error search rather than the direct Bézout-based construction reusing gcd's own machinery.
  - **Birth type**: Type 1, overgeneralization — small congruence systems are often small enough to solve by guess-and-check, and this habit is carried over unchanged to cases where the moduli are large and trial search becomes infeasible.
  - **Repair approach**: Blueprint Repair Action B02 — re-walking Example 2's direct Bézout-based construction, verified by substitution, with no search involved.

- **MC-3 — CRT-TREATED-AS-MERE-NUMERIC-COINCIDENCE** (Moderate)
  - **Blueprint description**: believing CRT's "unique solution modulo N" is a standalone numeric fact, missing its deeper reading as a ring isomorphism via ring-theory's own definitions.
  - **Birth type**: Type 3, language contamination — the theorem is typically introduced using only congruence/arithmetic vocabulary, with no explicit bridge to the ring-theoretic vocabulary that reveals its structural meaning.
  - **Repair approach**: Blueprint Repair Action B03 — re-walking Example 3's verified addition-respecting property of the map φ on a small concrete case.

## Analogies
- **The guarantee-versus-check framing** (Blueprint TA-A01): "before applying CRT, check pairwise coprimality using gcd's own computation — this isn't a formality; the theorem's guarantee genuinely fails without it."

## Demonstrations
- The contradiction directly confirming no solution exists for x≡1 (mod 4), x≡0 (mod 6), since gcd(4,6)=2≠1 (Blueprint Example 1), targeting MC-1.
- The full Bézout-based construction solving x≡2 (mod 5), x≡3 (mod 7), yielding x=17, verified by direct substitution (Blueprint Example 2), targeting MC-2.
- The concrete verification that the map φ:Z/15Z→Z/3Z×Z/5Z respects addition, using n1=3,n2=5 (Blueprint Example 3), targeting MC-3.

## Discovery Questions
1. "Does CRT guarantee a solution for ANY system of congruences, or only under a specific condition on the moduli?"
2. "Is the standard way to solve a CRT system to search through candidate values of x?"
3. "Is CRT's 'unique solution modulo N' claim just a numeric coincidence, or does it reflect something deeper?"

## Teaching Sequence
Follows the Blueprint's Component 5 exactly: TA-A01 (pairwise coprimality is a hypothesis to check, not automatic — Example 1, MC-1 hook) → TA-A02 (construct the solution via Bézout, don't search by trial — Example 2, MC-2 hook) → TA-A03 (CRT is a ring isomorphism, not just a numeric coincidence — Example 3, MC-3 hook) → TA-A04 (Mastery Gate, P91).

## Tutor Actions
- **TELL: Explanation** — the pairwise-coprime hypothesis as a genuine, checkable requirement (Blueprint TA-A01).
- **TEST-THINKING: Error Analysis** — the contradiction when the hypothesis fails (Blueprint Example 1), targeting MC-1.
- **DO: Worked Example** — the Bézout-based construction of x=17 (Blueprint Example 2), targeting MC-2.
- **ORGANIZE: Concept Map** — the ring-isomorphism reading of "unique solution mod N" (Blueprint Example 3), targeting MC-3.

## Voice Teaching Notes
Before applying CRT to any system, ask "are these moduli pairwise coprime — have you checked?" as a standing verbal gate directly targeting MC-1 before any construction begins.

## Assessment Signals
- **P76 (transfer probe, cross-link probe mode against `math.abst.ring-theory` per the Blueprint's Component 7 — cross_links includes an authored target)**: reused verbatim from the Blueprint's Component 5 A04 — the distributed-computing scenario recombining partial results across 3 coprime moduli, connecting to ring-theory's own definitions.
- **P77 (mastery gate)**: the Blueprint's 4-item problem set (Component 5 A04), MAMR 4/5.

## Tutor Recovery Strategy
If MC-2 persists, require the student to state the Bézout coefficients explicitly (from gcd's own machinery) before writing any candidate x, banning trial substitution as a first step until the construction method becomes automatic.

## Memory Hooks
- "Pairwise coprime is a hypothesis to check, not a given — no coprimality, no guarantee."
- "Construct with Bézout — don't search by trial."
- "Unique solution mod N means the two rings are structurally the same ring."

## Transfer Connections
- `math.nt.gcd` (requires) supplies the Euclidean algorithm and Bézout identity this concept's construction directly reuses.
- `math.abst.ring-theory` (cross-link, authored): CRT's existence-and-uniqueness claim is exactly the ring-isomorphism statement that concept's own axioms formalize.

## Cross-Subject Connections
- Computer science / cryptography: CRT underlies fast modular arithmetic and distributed computation splitting a large computation across coprime moduli.

## Blueprint References
`docs/curriculum/blueprints/math.nt.chinese-remainder-theorem.md` — all worked examples, teaching actions, and the P76/P77 assessment items reused by reference, not restated in full.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None — the Blueprint's own cross-link finding (`math.abst.ring-theory` authored) was independently re-verified at authoring time and remains accurate.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.nt Wave 6 part 1.
