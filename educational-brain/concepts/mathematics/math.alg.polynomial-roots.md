# math.alg.polynomial-roots

## Identity
- **KG ID**: `math.alg.polynomial-roots`
- **Domain**: math.alg (Algebra)
- **Requires**:
  - `math.alg.factor-theorem` — load-bearing part: this entire concept is built on the equivalence
    "a is a root of p(x) iff (x−a) is a factor of p(x)," which is exactly the Factor Theorem; without
    it already secure, "root" and "factor" have no established connection to reason from.
  - `math.alg.quadratic-equation` — load-bearing part: the quadratic formula is the first place a
    learner meets genuinely complex roots (via a negative discriminant); without that concrete
    encounter already secure, the abstract statement "roots can be complex" has no anchoring example.
- **Unlocks**: `math.alg.fundamental-theorem-algebra`
- **Cross-links**: `math.cx.complex-numbers-analysis` (Blueprint authored, confirmed via directory
  listing this batch, and its content — modulus, argument, polar form, conjugation — was read and
  genuinely reused in the transfer probe below; **no Educational Brain entry exists yet** for that
  concept, since the math.cx domain has not been started — see Curriculum Feedback below)
- **Difficulty**: proficient
- **Bloom level**: analyze
- **Mastery threshold**: 0.8 (MAMR = ⌈0.8×5⌉ = 4/5)
- **Estimated hours**: 8
- **Blueprint**: `docs/curriculum/blueprints/math.alg.polynomial-roots.md` (reused by reference
  throughout)
- **KG children** (not yet authored — `math.alg.rational-root-theorem`,
  `math.alg.fundamental-theorem-algebra`): this entry states the Fundamental Theorem of Algebra
  informally, as an already-usable fact for root-counting; the rigorous statement and proof-sketch
  are deferred to that child concept, per the Blueprint's own explicit scoping.

## Learning Objective
- The learner can define a root of a polynomial p(x) as a value x=a with p(a)=0, and connect this
  directly to the Factor Theorem: a is a root if and only if (x−a) is a factor of p(x).
- The learner can state that a degree-n polynomial has exactly n roots counting multiplicity over
  ℂ (the informal Fundamental Theorem of Algebra), and correctly account for multiplicity — a
  repeated factor (x−a)^k contributes k roots at the same value a, not merely one, distinguishing
  the count of DISTINCT root values from the count of roots WITH multiplicity.
- The learner can apply the Conjugate Root Theorem — for a polynomial with REAL coefficients,
  complex (non-real) roots always occur in conjugate pairs a+bi and a−bi — to find a missing root
  or determine a full root set from a partial one, while correctly verifying the real-coefficients
  hypothesis before applying the theorem's conclusion.

## Core Understanding
A root (or zero) of a polynomial p(x) is a value x=a satisfying p(a)=0, and by the already-secure
Factor Theorem, this is exactly equivalent to (x−a) being a factor of p(x) — root-finding and
factor-finding are the same question asked two ways. The Fundamental Theorem of Algebra, stated
here informally as an already-usable fact (its rigorous proof-sketch belongs to its own dedicated
child concept), guarantees that a degree-n polynomial has EXACTLY n roots, counting multiplicity,
over the complex numbers — meaning p(x) factors completely as a product of n linear factors, whose
roots (the r_i values) need not all be distinct. When a factor (x−a) appears k times in this
complete factorisation, a is a root of MULTIPLICITY k, and it counts as k roots toward the total of
n even though it is a single repeated value — this distinction (distinct root VALUES versus roots
counted WITH multiplicity) is essential, since only the multiplicity-weighted count is guaranteed
to match the degree. The Conjugate Root Theorem adds a second, powerful constraint specifically for
polynomials with REAL coefficients: if a+bi (with b≠0) is a root, its complex conjugate a−bi is
ALSO automatically a root — non-real roots of a real-coefficient polynomial can never appear
"alone," they always arrive in matched pairs. This theorem's guarantee depends entirely on its
hypothesis: it requires every coefficient of the polynomial to be real, and a genuinely
complex-coefficient polynomial gives no such guarantee at all — checking this hypothesis before
applying the theorem's conclusion is not optional formality but a genuine precondition.

## Mental Models
1. **Beginner — a root is a value that makes the polynomial equal zero, and the Factor Theorem
   connects it directly to a matching factor.** For p(x)=(x−3)(x+2), the roots are x=3 and x=−2.
   *Upgrade trigger*: a repeated factor, like (x−3)², where "how many roots" has two different
   possible answers depending on whether repetition is counted. *Shelf life*: one session.
2. **Intermediate — counting roots WITH multiplicity (not just distinct values) is what makes the
   total always match the polynomial's degree.** (x−3)²(x+2) has 2 distinct root values but 3 roots
   counted with multiplicity, matching its degree of 3. *Upgrade trigger*: a polynomial with a
   negative discriminant in one of its quadratic factors, introducing genuinely complex (non-real)
   roots into the count for the first time in this concept's own context. *Shelf life*: durable once
   the distinct-versus-multiplicity distinction is habitually checked.
3. **Advanced — for a REAL-coefficient polynomial specifically, non-real roots are never solitary;
   the Conjugate Root Theorem forces them to arrive in matched pairs, and this pairing can be used
   both to GENERATE a missing root and to CONFIRM that a root list is complete.** *Upgrade trigger*:
   a genuinely complex-coefficient polynomial, where the theorem's real-coefficients hypothesis
   fails and no such pairing is guaranteed — requiring the hypothesis itself to be checked, not
   assumed.
4. **Expert — the root-counting theorem (a stopping condition: "have I found them all?") and the
   conjugate-pairing theorem (a generating tool: "what root does this one force to also exist?")
   combine into a single reasoning chain for reconstructing a polynomial's complete root set from
   partial information.** *Shelf life*: permanent, and it is exactly the composite reasoning this
   concept's own unlock, `math.alg.fundamental-theorem-algebra`, formalises with full rigour.

## Why Students Fail
The single most frequent failure, and the one the Blueprint marks foundational, is counting only
DISTINCT root values rather than roots weighted by multiplicity — for a degree-4 polynomial like
(x−1)^4, answering "1 root" instead of the correct "4 roots, all at x=1" — a failure that directly
breaks the Fundamental Theorem of Algebra's own promise (the multiplicity-counted total always
matches the degree), since the distinct-value count of 1 does not match the degree of 4 at all,
while the multiplicity-weighted count of 4 does. The second failure is failing to recognise that a
real-coefficient polynomial's non-real roots must occur in conjugate pairs, missing a root the
theorem would otherwise supply for free — given a real-coefficient polynomial with one known
non-real root, not automatically including its conjugate in the full root list, leaving the
reconstructed root set genuinely incomplete even when every other piece of reasoning was correct.
The third failure is the mirror image of the second: applying the Conjugate Root Theorem's
conclusion WITHOUT first verifying its real-coefficients hypothesis — for a genuinely
complex-coefficient polynomial like q(x)=x−i (whose only root is x=i), incorrectly assuming the
conjugate −i must also be a root, when in fact q(−i)=−i−i=−2i≠0 confirms it is not; this is not a
failure of the theorem itself but a failure to check whether the theorem's precondition (real
coefficients) actually holds before invoking its guarantee.

## Misconceptions
Reused by reference from the Blueprint's Component 6 registry (MC-1..MC-3), with birth-type
classification added.

- **MC-1 — DISTINCT-ROOTS-NOT-MULTIPLICITY** (FOUNDATIONAL)
  - **Birth type**: Type 1, overgeneralisation — the everyday, informal sense of "how many roots"
    (how many distinct values) is applied without adjustment to a context requiring the
    multiplicity-weighted count, since the two notions coincide whenever no factor repeats and the
    distinction is never forced to surface.
  - **Characteristic phrase**: for the degree-4 polynomial (x−1)^4, answering "1 root" instead of
    the correct 4 (all at x=1).
  - **Detection probe** (verbatim, Blueprint): asking how many roots (x−1)^4 (a degree-4
    polynomial) has — an answer of "1" confirms MC-1.
  - **Repair**: Blueprint Repair Action B01 — re-anchor on the factored form directly: three
    identical linear factors still means three roots, by the same logic that three identical items
    in a list is a count of three, not one.
  - **Verification of death**: given a mixed set of polynomials with repeated and distinct roots,
    the learner correctly reports the multiplicity-weighted total (matching the degree) every time,
    distinguishing it explicitly from the distinct-value count when asked.

- **MC-2 — CONJUGATE-PAIRING-NOT-APPLIED** (moderate)
  - **Birth type**: Type 1, overgeneralisation — real-coefficient roots (rational or irrational)
    are not automatically paired with anything, so the habit of "each root stands on its own" is
    overgeneralised to non-real roots too, where it is specifically false for real-coefficient
    polynomials.
  - **Characteristic phrase**: given a real-coefficient polynomial with one known non-real root,
    failing to include its conjugate in the reconstructed full root list.
  - **Detection probe** (verbatim, Blueprint): given a real-coefficient polynomial with a known
    non-real root, asking for the FULL root list and checking whether the conjugate is included —
    an incomplete list confirms MC-2.
  - **Repair**: Blueprint Repair Action B02 — re-derive from the theorem statement directly:
    non-real roots of a real-coefficient polynomial are never "solo," they arrive in matched pairs
    by the theorem's own guarantee.
  - **Verification of death**: given a real-coefficient polynomial with a known non-real root, the
    learner automatically includes its conjugate in the full root list, unprompted.

- **MC-3 — CONJUGATE-THEOREM-APPLIED-WITHOUT-REAL-COEFFICIENTS-CHECK** (moderate)
  - **Birth type**: Type 5, instruction-induced — the theorem's conclusion (conjugate pairing) is
    memorable and easy to apply mechanically, while its precondition (real coefficients) is a
    checkable but easily-skipped hypothesis, especially when no genuinely complex-coefficient
    counterexample has been encountered to make the hypothesis's necessity concrete.
  - **Characteristic phrase**: for q(x)=x−i (a genuinely complex-coefficient polynomial with known
    root i), incorrectly assuming −i must also be a root by the same reasoning as the
    real-coefficient case.
  - **Detection probe** (verbatim, Blueprint): given q(x)=x−i, asking whether the conjugate of its
    known root must also be a root — a "yes" answer confirms MC-3.
  - **Repair**: Blueprint Repair Action B03 — re-anchor on checking the hypothesis first: real
    coefficients only; a complex-coefficient polynomial gives no such guarantee, and q(−i)=−2i≠0
    confirms directly that the conjugate pairing fails here.
  - **Verification of death**: given a mix of real-coefficient and genuinely complex-coefficient
    polynomials, the learner correctly applies conjugate pairing only to the real-coefficient
    cases, explicitly checking the hypothesis first every time.

## Analogies
- **A guest list where repeated invitations to the same person still count as separate seats
  reserved.** Counting roots with multiplicity is like a seating chart where the same guest,
  invited three times by mistake, still occupies three reserved seats — the SEAT count (matching
  the degree) is what matters, not the count of distinct guest NAMES. *Where it holds*: the
  "repetition still counts toward the total" structure, directly targeting MC-1. *Where it breaks*:
  a seating chart has no equivalent of "complex" seats — this analogy covers only the multiplicity
  distinction, not the conjugate-pairing behaviour, which needs its own separate teaching.
- **A matched pair of dance partners who must both be present or neither can perform.** For a
  real-coefficient polynomial, a non-real root and its conjugate are like two dance partners
  choreographed as an inseparable pair — if one is on the root list, the other is guaranteed to be
  there too; but this pairing rule only applies within THIS specific dance company (real-coefficient
  polynomials) — a different company (complex-coefficient polynomials) has no such rule at all.
  *Where it holds*: the "guaranteed pairing, but only under a specific condition" structure,
  directly targeting both MC-2 and MC-3. *Where it breaks*: dance partners are paired by external
  choreography; the conjugate pairing here is a PROVABLE mathematical consequence of the
  coefficients being real, not an arbitrary rule — the theorem's derivation (though not required at
  this level) is what actually grounds the guarantee.

## Demonstrations
1. **Multiplicity counting on a degree-3 example, establishing the base skill and directly
   confronting MC-1.** p(x)=(x−3)²(x+2). Roots: x=3 (multiplicity 2), x=−2 (multiplicity 1).
   Degree = 2+1 = 3. Total roots counting multiplicity = 2+1 = 3, matching the degree exactly.
   Distinct root VALUES: only 2 (namely 3 and −2) — explicitly contrasted against the
   multiplicity-weighted total of 3.
2. **Conjugate pairing on a real-coefficient cubic, directly confronting MC-2.** A real-coefficient
   cubic p(x) has known roots x=2 and x=1+2i. By the Conjugate Root Theorem (coefficients confirmed
   real), x=1−2i must ALSO be a root. Since p is degree 3 and all 3 roots are now known
   (2, 1+2i, 1−2i), p(x)=a(x−2)(x−(1+2i))(x−(1−2i)) for some leading coefficient a.
3. **A genuinely complex-coefficient counterexample, directly confronting MC-3.** q(x)=x−i (degree
   1, genuinely complex coefficient −i). Its only root is x=i. Its conjugate, −i, is NOT a root:
   q(−i)=−i−i=−2i≠0. This is not a violation of the Conjugate Root Theorem — the theorem's
   hypothesis (real coefficients) simply does not hold here, so no pairing is guaranteed at all.
4. **A composite application combining both theorems as a single reasoning chain.** A real-
   coefficient degree-5 polynomial has known roots 3 (multiplicity 2), −1, and 2+i. Known roots so
   far, counting multiplicity: 3, 3, −1, 2+i — that is 4 roots counted so far. By the Conjugate Root
   Theorem (real coefficients confirmed), 2−i must also be a root — bringing the count to 5,
   matching the degree exactly, with no further undetermined roots remaining. This combines the
   conjugate theorem as a GENERATING tool ("what root does this one force to also exist?") with the
   counting theorem as a STOPPING CONDITION ("have I found them all?").

## Discovery Questions
- "(x−1)^4 is a degree-4 polynomial. How many roots does it have? Is the answer the number of
  DIFFERENT values, or something else?" — surfaces MC-1 by requiring the learner to reconcile the
  two possible readings of "how many roots."
- "You have a real-coefficient polynomial with a known root of 3−2i. Is that the ONLY non-real root,
  or does the fact that the coefficients are real tell you something else must also be a root?" —
  surfaces MC-2 by directing attention to the theorem's guarantee.
- "For q(x)=x−i, does the Conjugate Root Theorem apply the same way it did for the real-coefficient
  examples? What do you need to check first before assuming it does?" — surfaces MC-3 by requiring
  the hypothesis check to be stated explicitly before any conclusion is drawn.

## Teaching Sequence
1. **Anchor**: connect to the already-secure Factor Theorem — a root and a matching linear factor
   are the same fact stated two ways, and this concept extends that single-root connection into a
   full root-COUNTING and root-PAIRING theory.
2. **Establish multiplicity counting first, with the distinct-versus-weighted distinction made
   explicit from the start** (Demonstration 1), directly pre-empting MC-1.
3. **Introduce the Conjugate Root Theorem on a genuine real-coefficient example**
   (Demonstration 2), stating the theorem's guarantee precisely, directly pre-empting MC-2.
4. **Immediately contrast with a genuinely complex-coefficient counterexample**
   (Demonstration 3), placed directly beside the real-coefficient case, directly pre-empting MC-3
   by making the hypothesis's necessity concrete rather than abstract.
5. **Combine both theorems in a single composite reasoning chain** (Demonstration 4), explicitly
   modelling the generate-then-confirm sequence at the analyze-level Bloom target this concept
   carries.
6. **Practice mixed problems** deliberately combining multiplicity counting, conjugate-pair
   generation, and real-vs-complex-coefficient hypothesis checks, always requiring the reasoning
   chain to be shown explicitly.
7. **Bridge forward**: state explicitly that this concept's informal use of the Fundamental Theorem
   of Algebra will be formalised with full rigour in `math.alg.fundamental-theorem-algebra`.

## Tutor Actions
- Before accepting any "how many roots" answer, ask "is that the number of distinct values, or the
  number counting multiplicity? Which one does the degree actually guarantee?" — this single
  question directly defends against MC-1.
- Before accepting any "final" root list for a real-coefficient polynomial with a known non-real
  root, ask "does the theorem force anything else to also be a root here?" — targeting MC-2
  directly.
- Before accepting any conjugate-pairing conclusion, ask "are the coefficients of this polynomial
  genuinely all real? How do you know?" — targeting MC-3 directly, at the exact point the
  hypothesis check is needed.
- Never accept a reconstructed root list as complete without an explicit multiplicity total shown
  and confirmed against the polynomial's degree.

## Voice Teaching Notes
- When counting roots with multiplicity aloud, narrate the repetition explicitly: "x equals one...
  counted once... twice... three times... four roots total" — audibly counting each repetition
  individually reinforces the multiplicity-weighted total, directly targeting MC-1.
- When stating the Conjugate Root Theorem aloud, place clear emphasis on the precondition: "for a
  REAL-coefficient polynomial... a non-real root's conjugate is ALSO automatically a root" — the
  audible emphasis on "real-coefficient" reinforces the hypothesis as load-bearing, targeting MC-3.
- When working the complex-coefficient counterexample aloud, use a genuinely surprised or
  cautionary tone: "wait — does this one actually work the same way? Let's check" — modelling
  hesitation-then-verification rather than automatic pattern application, targeting MC-3.

## Assessment Signals
- **Correct + fast + distinguishes distinct-value from multiplicity-weighted counts unprompted,
  checks the real-coefficients hypothesis before every conjugate-pairing claim** → MASTERED; ready
  for `math.alg.fundamental-theorem-algebra`.
- **Root count reported as distinct values only, not matching the degree** → MC-1 active; needs the
  multiplicity-counting repair.
- **A real-coefficient polynomial's known non-real root is not automatically paired with its
  conjugate in the final root list** → MC-2 active; needs the conjugate-pairing-generation repair.
- **Conjugate pairing applied to a polynomial without checking whether its coefficients are
  genuinely real** → MC-3 active; needs the hypothesis-check repair.
- **Cannot connect "root" to "factor" at all** → prerequisite gap in `math.alg.factor-theorem`, not
  specific to this concept's counting/pairing content; route back to that concept.

## Tutor Recovery Strategy
If a learner has just had MC-1 pointed out and expresses confusion that "the same number keeps
showing up," validate directly that this repetition IS the point — a repeated root is not a
mistake or a redundancy to simplify away, it is a genuine, countable feature of the polynomial that
the Fundamental Theorem of Algebra's own promise depends on being counted correctly. If MC-2 and
MC-3 are confused with each other (a learner correctly checks the hypothesis but then still fails
to generate the missing conjugate, or vice versa), separate the two explicitly: one is "did you
remember to check IF the theorem applies" (MC-3) and the other is "given that it applies, did you
remember to USE its conclusion" (MC-2) — these are two distinct steps in the same reasoning chain,
and conflating them in a correction risks fixing the wrong one.

## Memory Hooks
- "Count every repeat — multiplicity, not just names" — the multiplicity-counting rule, directly
  targeting MC-1.
- "Real coefficients, complex roots travel in pairs" — the Conjugate Root Theorem's core guarantee,
  directly targeting MC-2.
- "Check the coefficients are real BEFORE you pair" — the hypothesis-check discipline, directly
  targeting MC-3.

## Transfer Connections
- **`math.alg.fundamental-theorem-algebra`** (direct unlock): this concept's informal use of the
  root-counting theorem is exactly what that concept will state and justify with full rigour.
- **`math.alg.factor-theorem`** (prerequisite, reused): the root/factor equivalence this entire
  concept is built on.
- **`math.alg.quadratic-equation`** (prerequisite, reused): the quadratic formula is the first
  concrete encounter with genuinely complex roots (via a negative discriminant), which this concept
  generalises into a full theory of root counting and pairing.
- **`math.cx.complex-numbers-analysis`** (cross-link, Blueprint authored, EB entry not yet
  authored): this concept's transfer probe directly reuses that concept's modulus and conjugation
  machinery (|z|=√(x²+y²), |z|²=z·z̄) applied to a conjugate root pair this concept's own theorem
  produces — a genuine, content-verified connection, not a restatement.

## Cross-Subject Connections
- **Physics** (`phys.` wave mechanics, quantum mechanics): the characteristic polynomial of a
  physical system (e.g. in oscillation or stability analysis) has roots whose multiplicity and
  reality directly determine physical behaviour (a repeated root often signals a resonance or
  critically-damped condition) — this concept's root-counting and multiplicity discipline
  transfers directly.
- **Computer science** (`cs.` algorithm analysis, control systems): the roots of a system's
  characteristic polynomial determine stability in control theory and signal processing — real
  versus complex roots, and their multiplicities, directly determine whether a system's response
  decays, oscillates, or grows, reusing this concept's classification scheme without modification.

## Blueprint References
- `docs/curriculum/blueprints/math.alg.polynomial-roots.md` — Component 0 (metadata: difficulty
  proficient, bloom analyze, mastery_threshold 0.8, estimated_hours 8, requires
  [math.alg.factor-theorem, math.alg.quadratic-equation], unlocks
  [math.alg.fundamental-theorem-algebra], cross_links [math.cx.complex-numbers-analysis]);
  Component 6 (Misconception Registry MC-1..MC-3, reused above with birth-type classification
  added); Component 4 (worked examples for (x−3)²(x+2), a real-coefficient cubic with roots 2 and
  1+2i, and q(x)=x−i, reused directly in the Demonstrations above); the P76 transfer probe (a
  cross-link probe against `math.cx.complex-numbers-analysis`, computing |z| two independent ways
  for a conjugate root pair of x²−6x+13, genuine cross-link mode since that Blueprint is confirmed
  authored) — held in the Blueprint's own mastery-gate item bank, not restated here per the
  Standard's ownership boundary.

## Runtime Asset References
- No AssetIdentity rows exist yet for this concept (mathematics EB authoring is ahead of the
  AssetIdentity seeding campaign for math.alg — see CLAUDE.md's "Mathematics Educational Brain
  serving-asset campaign" section for the seeding mechanism this concept will use once authored
  content is selected for transcription).

## Curriculum Feedback
- **Cross-link target Blueprint exists, but its Educational Brain entry does not yet** — this
  concept's own cross-link, `math.cx.complex-numbers-analysis`, has an authored Blueprint (verified
  via directory listing this batch, and its content was genuinely read and reused in the P76
  transfer probe per the Blueprint's own Component 8 note), but the math.cx domain itself has not
  been started in the Educational Brain tree (0/? concepts authored, per `scripts/math/state.ts`).
  This is not a defect — the Blueprint-level cross-link reference is legitimate and content-
  verified — but is recorded here as a standing note: when `math.cx.complex-numbers-analysis`'s own
  Educational Brain entry is eventually authored (in a future math.cx domain campaign), it should
  cross-reference this concept's transfer probe back, completing the connection in both directions.
- No genuine content-overlap or metadata discrepancy was found between this Blueprint and any
  already-authored math.alg sibling entry.

## Version History
- 2026-09-11 — Initial authoring (Batch 9 / math.alg Wave 11 of the Mathematics Educational Brain
  completion campaign). Blueprint reused by reference in full. No KG or Blueprint file modified.
