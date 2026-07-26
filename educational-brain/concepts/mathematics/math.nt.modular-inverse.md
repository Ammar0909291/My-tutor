# math.nt.modular-inverse

## Identity
- **KG ID**: `math.nt.modular-inverse`
- **Domain**: math.nt (Number Theory)
- **Requires**: `math.nt.modular-arithmetic`, `math.nt.extended-euclidean-algorithm`
- **Unlocks**: `math.nt.rsa-basics`
- **Cross-links**: none (KG lists none; Blueprint confirms).
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.8 (⌈0.8×5⌉ = 4/5)
- **Estimated hours**: 5
- **Blueprint**: `docs/curriculum/blueprints/math.nt.modular-inverse.md` (reused by reference throughout this entry).

## Learning Objective
The student will state the modular inverse's definition (b such that ab≡1 mod n) and recognize the already-known existence criterion gcd(a,n)=1 as exactly the condition this concept constructs an inverse for, compute a modular inverse directly by reading the coefficient x off the Extended Euclidean Algorithm's own output, and apply modular inverses to solve a linear congruence ax≡c (mod n) as the modular analogue of division.

## Core Understanding
Per the Blueprint's Component 3: the existence criterion is already known from math.nt.modular-arithmetic (a has an inverse mod n iff gcd(a,n)=1) — this concept supplies the EFFICIENT construction, replacing exhaustive trial search with direct computation. The Extended Euclidean Algorithm's own output directly IS the inverse: that algorithm computes x,y with ax+ny=gcd(a,n); when gcd(a,n)=1, this becomes ax+ny=1, and reducing modulo n (since ny≡0 mod n) gives ax≡1 (mod n) — exactly the defining property of a modular inverse. No separate new algorithm is needed. Solving linear congruences ax≡c (mod n) is the modular analogue of division: multiply both sides by a's modular inverse to isolate x, exactly as ordinary division isolates x in ax=c — this multiply-by-inverse technique is the key mechanism underlying RSA-style decryption.

## Mental Models
1. **The detect-versus-construct model** (Blueprint TA-A01): the existence question was already settled elsewhere; this concept's entire job is efficient construction, not re-establishing when an inverse exists.
2. **The output-is-the-answer model** (Blueprint TA-A02): the Extended Euclidean Algorithm's coefficient x, already computed as part of its standard output, IS the modular inverse directly — no additional step.
3. **The multiply-by-inverse-as-division model** (Blueprint TA-A03): since modular arithmetic has no direct division operator, multiplying by the inverse plays exactly the algebraic role ordinary division plays.

## Why Students Fail
Per the Blueprint's Misconception Registry: the foundational failure is believing this concept re-derives or re-establishes the existence criterion, missing that it's already known and the new content is purely the construction method. A high-severity failure is believing an additional computation is needed after running the Extended Euclidean Algorithm to find the modular inverse, missing that its own x coefficient directly is the inverse. A third failure is believing there is a direct modular "division" operation to isolate x in ax≡c (mod n), missing that multiplying by the modular inverse is the substitute technique.

## Misconceptions
Reused by reference from the Blueprint's Component 6 Misconception Registry, with birth-type classification added:

- **MC-1 — EXISTENCE-CRITERION-ASSUMED-RE-DERIVED-HERE** (FOUNDATIONAL)
  - **Blueprint description**: believing this concept re-derives or re-establishes the modular-inverse existence criterion, missing that it is already known from math.nt.modular-arithmetic and this concept's job is construction.
  - **Birth type**: Type 1, overgeneralization — every prior new concept in the sequence introduced its own existence/definition question from scratch, so the default expectation is that this one does too, rather than building directly on an already-settled prior result.
  - **Repair approach**: Blueprint Repair Action B01 — re-walking Example 1's direct citation of the already-known criterion (gcd(15,26)=1), re-anchoring on "the existence question is settled — this concept constructs."

- **MC-2 — EXTENDED-EUCLIDEAN-OUTPUT-ASSUMED-TO-NEED-FURTHER-PROCESSING** (High)
  - **Blueprint description**: believing an additional computation is needed after the Extended Euclidean Algorithm to find the modular inverse, missing that its own x coefficient directly is the inverse.
  - **Birth type**: Type 5, instruction-induced — the Extended Euclidean Algorithm is typically taught as producing "the gcd and some coefficients," without emphasizing that in the gcd=1 case those coefficients ARE immediately usable as a named, separately-important object (the modular inverse).
  - **Repair approach**: Blueprint Repair Action B02 — re-walking Example 2's direct read-off of x=7 as the inverse, verified by direct multiplication.

- **MC-3 — MODULAR-DIVISION-ASSUMED-DIRECT-OPERATION** (Moderate)
  - **Blueprint description**: believing there is a direct modular "division" operation to isolate x in ax≡c (mod n), missing that multiplying by the modular inverse is the substitute technique.
  - **Birth type**: Type 1, overgeneralization — ordinary arithmetic's division operation is carried over wholesale as an available modular operation, without recognizing modular arithmetic genuinely lacks a direct division primitive.
  - **Repair approach**: Blueprint Repair Action B03 — re-walking Example 3's multiply-by-inverse technique, contrasted directly against ordinary division.

## Analogies
- **The efficient-construction framing** (Blueprint TA-A01): modular-arithmetic already told you WHETHER an inverse exists; this concept's entire job is constructing it efficiently, replacing exhaustive search with direct computation.
- **The modular-division analogy** (Blueprint TA-A03): multiplying by the modular inverse plays exactly the algebraic role ordinary division plays, since modular arithmetic has no direct division operator.

## Demonstrations
- The gcd(15,26)=1 existence check as the already-settled launching point (Blueprint Example 1), targeting MC-1.
- The full Extended Euclidean Algorithm run on (15,26), reading off x=7 directly as the modular inverse, verified by direct multiplication (Blueprint Example 2), targeting MC-2.
- Solving 15x≡9 (mod 26) by multiplying both sides by the constructed inverse 7 (Blueprint Example 3), targeting MC-3.

## Discovery Questions
1. "You already know an inverse exists when gcd(a,n)=1 — so what's actually new here?"
2. "After running the Extended Euclidean Algorithm, do you need to do anything else to get the modular inverse, or is it already sitting in the output?"
3. "How do you 'divide' in modular arithmetic, if there's no division operator?"

## Teaching Sequence
Follows the Blueprint's Component 5 exactly: TA-A01 (the existence question is already settled — this concept constructs, not detects) → TA-A02 (the Extended Euclidean Algorithm's own output IS the inverse, no extra step) → TA-A03 (multiplying by the inverse is the modular analogue of division) → TA-A04 (Mastery Gate, P91).

## Tutor Actions
- **TELL: Explanation** — the existence criterion is already settled; this concept's job is construction (Blueprint TA-A01).
- **DO: Worked Example** — the full Extended Euclidean Algorithm run on (15,26), reading off x=7 as the inverse (Blueprint Example 2).
- **TEST-THINKING: Prediction** — before accepting an inverse answer, verify by direct multiplication that it genuinely gives 1 mod n, targeting MC-2.
- **DO: Worked Example** — solving a linear congruence by multiplying by the constructed inverse (Blueprint Example 3), targeting MC-3.

## Voice Teaching Notes
After a student runs the Extended Euclidean Algorithm, ask "is there anything left to compute, or do you already have your answer?" as a standing check directly targeting MC-2's "further processing" assumption.

## Assessment Signals
- **P76 (transfer probe, independence mode per the Blueprint's Component 7 — no cross-link target listed)**: reused verbatim from the Blueprint's Component 5 A04 — the simplified RSA-style decryption scenario computing d as the modular inverse of e=13 modulo φ=40.
- **P77 (mastery gate)**: the Blueprint's 4-item problem set (Component 5 A04), MAMR 4/5.

## Tutor Recovery Strategy
If MC-2 persists, require the student to state explicitly, immediately after completing an Extended Euclidean Algorithm run, "is x itself (reduced mod n) my answer?" before allowing any further step, until the direct read-off becomes automatic.

## Memory Hooks
- "The existence question is already answered — this concept just builds the inverse."
- "The x from the Extended Euclidean Algorithm IS the inverse — nothing more to compute."
- "No division in modular arithmetic — multiply by the inverse instead."

## Transfer Connections
- `math.nt.rsa-basics` (unlocks) uses modular inverse computation directly for RSA decryption, previewed in this concept's core explanation and transfer probe.
- `math.nt.extended-euclidean-algorithm` (requires) supplies the Bézout-coefficient computation this concept's construction directly reuses.

## Cross-Subject Connections
- Computer science / cryptography: modular inverse computation is the core arithmetic primitive underlying RSA decryption and other public-key cryptosystems.

## Blueprint References
`docs/curriculum/blueprints/math.nt.modular-inverse.md` — all worked examples, teaching actions, and the P76/P77 assessment items reused by reference, not restated in full.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None — the Blueprint's own cross-link finding (cross_links=[]) was independently re-verified at authoring time and remains accurate.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.nt Wave 5 part 1.
