# math.alg.factoring-gcf

## Identity
- **KG ID**: `math.alg.factoring-gcf`
- **Domain**: math.alg (Algebra)
- **Requires**:
  - `math.alg.factoring` — load-bearing part: this concept is a focused fluency drill on the FIRST
    step of that concept's own decision tree (extract the GCF); without the surrounding strategy
    already secure, GCF extraction has no context as "step one of a larger procedure" and risks
    being taught as an isolated trick rather than the entry point it actually is.
- **Unlocks**: none directly in the KG (GCF fluency is a supporting skill for `math.alg.factoring`
  itself and for `math.alg.factoring-trinomials`, which requires this concept)
- **Cross-links**: `math.nt.gcd` (the formal number-theoretic definition of GCD via prime
  factorisation/Euclidean algorithm; this concept uses GCF operationally on monomials, that concept
  provides the theoretical foundation — not yet authored, P76 uses independence mode)
- **Difficulty**: developing
- **Bloom level**: apply
- **Mastery threshold**: 0.9 (MAMR = ⌈0.9×5⌉ = 5/5)
- **Estimated hours**: 3
- **Blueprint**: `docs/curriculum/blueprints/math.alg.factoring-gcf.md` (reused by reference
  throughout)

## Learning Objective
- The learner can compute the Greatest Common Factor of a set of monomials by finding the
  numerical GCF of the coefficients AND, separately, the lowest shared power of each variable
  present in every term — not the numerical GCF alone.
- The learner can divide each term of a polynomial by the computed GCF, correctly subtracting
  exponents for the variable part (not merely dividing the coefficient and copying the variable
  unchanged), to produce the residual sum inside the parentheses.
- The learner can verify a GCF extraction by expanding GCF × (residual) and confirming it exactly
  reproduces the original polynomial, treating this verification as a non-negotiable final step
  rather than an optional check.

## Core Understanding
Factoring out the GCF is the distributive law run in reverse: given a·b + a·c, recognising the
shared factor a and rewriting as a(b + c). For a polynomial with several terms, the Greatest
Common Factor is not a single number to spot by inspection — it is the product of two independently
computed pieces: the numerical GCF of every term's coefficient (found exactly as with plain
integers), and, for each variable that appears in every term, that variable raised to the LOWEST
power occurring across all terms (because only that lowest power is guaranteed to divide every
term without leaving a negative exponent behind). Once the full GCF is assembled, each term is
divided by it — dividing the coefficients normally, and subtracting exponents for the variable
part (x^m ÷ x^k = x^(m−k)) — to produce the residual expression that goes inside the parentheses.
The entire procedure is verified, at zero additional cost, by multiplying the GCF back through the
residual and confirming the original polynomial is exactly reproduced; this single habit catches
nearly every error the procedure is prone to, because a wrong GCF or a wrong residual term will
fail to reconstruct the original when expanded.

## Mental Models
1. **Beginner — GCF extraction is grouping tiles into equal-sized piles.** 12 red tiles and 8 blue
   tiles split into 4 equal groups of (3 red + 2 blue) mirrors 12 + 8 = 4(3 + 2); the "4" is the
   GCF. *Upgrade trigger*: an expression with variable terms, where "tiles" has no direct physical
   analogue for x² or x³. *Shelf life*: one session.
2. **Intermediate — the GCF has two independently computed parts: a numerical part and a variable
   part, and both must be found.** Numerical GCF via the same integer algorithm already known;
   variable part via the LOWEST shared exponent. *Upgrade trigger*: a multi-variable expression
   (two or more distinct variables each needing their own lowest-power check), or a negative
   leading coefficient requiring the sign convention. *Shelf life*: durable once both parts are
   habitually checked together.
3. **Advanced — every GCF extraction is provisional until verified by re-expansion; verification
   is the actual mastery skill, not extraction alone.** GCF × residual must reconstruct the
   original exactly, term by term. *Upgrade trigger*: a three-or-more-term polynomial where a
   single arithmetic slip in one term's quotient would otherwise go undetected without the
   verification habit.
4. **Expert — GCF extraction is the entry gate of the full factoring decision tree
   (`math.alg.factoring`), and its own correctness is what everything downstream depends on.** A
   wrong GCF at this stage propagates as a wrong "final" factorisation no matter how correctly the
   later classification-by-term-count steps are performed. *Shelf life*: permanent, and it is
   exactly the connection this concept's own prerequisite already establishes from the other
   direction.

## Why Students Fail
The single most frequent failure, and the one the Blueprint marks FOUNDATIONAL, is computing the
numerical GCF of the coefficients correctly while entirely ignoring the variable factor that is
also shared across every term — for 6x² + 4x, correctly finding GCF(6,4) = 2 but stopping there,
producing 2(3x² + 2x) instead of the complete 2x(3x + 2); the variable part is treated as inert
"content" that travels along with each term rather than as a genuine factor subject to the same
extraction logic as the numerical coefficient. The second major failure is a specific confusion
between two structurally opposite rules: when a shared variable appears at different powers across
terms (e.g. x³ in one term, x² in another), the learner takes the HIGHEST power present rather than
the lowest — this is exactly the rule used for finding a Least Common Multiple (needed when adding
fractions), misapplied here to a Greatest Common Factor problem, where only the lowest power is
guaranteed to divide every term evenly. The third failure occurs after the GCF has been correctly
identified: when dividing each term by the GCF to build the residual, the learner divides the
numerical coefficients correctly but fails to subtract exponents for the variable part — writing,
for instance, 12x³ ÷ 4x = 3x³ (carrying the original exponent unchanged) instead of the correct
3x² (12÷4=3, and x³÷x¹=x²) — a monomial-division arithmetic slip distinct from either of the first
two conceptual errors, and one the mandatory verification-by-expansion step is specifically
designed to catch.

## Misconceptions
Reused by reference from the Blueprint's Component 2 registry (MC-1..MC-3) and its repair actions
B01–B03, with birth-type classification added.

- **MC-1 — MISSING-VARIABLE-IN-GCF** (FOUNDATIONAL)
  - **Birth type**: Type 1, overgeneralisation — the learner's fluent integer-GCF algorithm is
    applied to the coefficients and then treated as the complete answer, with the variable factor
    never recognised as a second, independent thing that must also be extracted.
  - **Characteristic phrase**: for 6x² + 4x, stating "numerical GCF is 2 → 2(3x² + 2x)," leaving
    the shared x factor un-extracted.
  - **Detection probe** (verbatim, Blueprint P41): "GCF(8x³, 12x²). (A) GCF = 4 (only numerical
    part). (B) GCF = 4x² (numerical GCF × common variable factor x^min(3,2))." — choosing (A)
    confirms MC-1.
  - **Repair**: Blueprint Repair Action B01 — verify directly that the proposed extra factor (x²)
    genuinely divides every term (8x³÷x²=8x ✓; 12x²÷x²=12 ✓), then state the two-part rule: the
    GCF of a set of monomials has a numerical component AND a variable component, and BOTH must be
    extracted.
  - **Verification of death**: given a mixed set of monomial-GCF problems, the learner
    spontaneously checks for and extracts a shared variable factor without being prompted.

- **MC-2 — HIGHEST-POWER-IN-GCF** (foundational)
  - **Birth type**: Type 1, overgeneralisation — the LCM rule (take the HIGHEST shared power,
    needed when finding a common denominator for adding fractions) is applied to a GCF problem,
    where the correct rule is structurally the opposite (take the LOWEST shared power).
  - **Characteristic phrase**: for 4x³ + 8x², claiming the common factor is x³, producing an
    invalid expression such as x³(4 + 8x²/x³) with a non-polynomial fractional exponent term.
  - **Detection probe** (verbatim, Blueprint P41): "GCF(x³, x²). Can x³ divide x²? (A) Yes — x³
    divides anything. (B) No — x²÷x³=x^(−1), not a polynomial term." — choosing (A) confirms MC-2.
  - **Repair**: Blueprint Repair Action B02 — restate the rule with its justification: GCF(x^a,
    x^b) = x^min(a,b) because the GCF must divide BOTH terms, and any power higher than the
    minimum fails to divide the term with the lower exponent. Memory device: GCF uses the smallest
    (minimum) exponent; LCM uses the largest (maximum) exponent — never confuse them.
  - **Verification of death**: given several pairs of same-variable-different-power monomials, the
    learner correctly identifies the lower power as the GCF's variable exponent every time,
    without hesitation.

- **MC-3 — QUOTIENT-ARITHMETIC-ERROR** (moderate)
  - **Birth type**: Type 4, notation-induced — the exponent-subtraction rule for dividing monomials
    (x^m ÷ x^k = x^(m−k)) is not applied consistently; the coefficient is divided correctly but the
    variable part is carried over unchanged rather than having its exponent reduced.
  - **Characteristic phrase**: "12x³ ÷ 4x = 3x³" (coefficient divided correctly; exponent left
    unchanged instead of reduced to x²).
  - **Detection probe** (verbatim, Blueprint P41): "Compute 12x³÷4x. (A) 12÷4=3; carry x³
    unchanged → 3x³. (B) 12÷4=3; x³÷x=x^(3−1)=x² → 3x²." — choosing (A) confirms MC-3.
  - **Repair**: Blueprint Repair Action B03 — verify option (B) directly by multiplying back:
    4x × 3x² = 12x³ ✓ (while 4x × 3x³ = 12x⁴ ≠ 12x³, exposing option A's error). State the rule:
    (ax^m) ÷ (bx^k) = (a÷b)·x^(m−k) — both parts must be divided, coefficients by ordinary
    division, variables by subtracting exponents.
  - **Verification of death**: given a GCF extraction requiring several term-by-term divisions,
    the learner correctly reduces every variable exponent and, unprompted, verifies by re-expanding
    GCF × residual against the original.

## Analogies
- **Splitting a shared grocery bill into itemised shares.** A shared restaurant bill of $60 for 3
  identical dishes splits as $60 = 20 + 20 + 20 = 20(1+1+1); the $20 is the "GCF" of the bill.
  *Where it holds*: the extraction-and-verification structure (check that 20×3 reconstructs 60).
  *Where it breaks* (stated explicitly, not left implicit): a restaurant bill has no equivalent of
  a "variable factor" — the analogy only illustrates the numerical half of the GCF, and must be
  paired with the tile-grouping demonstration below to cover the variable half.
- **A universal remote controlling several devices at once.** One remote (the GCF) "controls" every
  term simultaneously, the way one button press (multiply by GCF) reproduces every original term
  from its residual counterpart. *Where it holds*: the "one shared thing, many controlled outputs"
  structure. *Where it breaks*: a remote's buttons don't have "powers" the way a shared variable
  factor does — this analogy illustrates only the qualitative idea of a shared controller, not the
  minimum-exponent computation, which must be taught directly rather than extracted from the
  metaphor.

## Demonstrations
1. **Tile grouping for the pure-numerical case, establishing the extraction-and-verification
   pattern.** 12 red tiles and 8 blue tiles split into 4 equal groups: 3 red + 2 blue per group.
   12 + 8 = 4·3 + 4·2 = 4(3+2). Verify: 4·3+4·2 = 12+8 ✓.
2. **The bridge from integer GCF to monomial GCF, directly confronting MC-1.** Factor 6x² + 4x.
   Numerical: GCF(6,4)=2. Variable: lowest shared power of x across {x², x¹} is x¹. Combined
   GCF = 2x. 6x²÷2x=3x; 4x÷2x=2. Result: 2x(3x+2). Verify: 2x·3x+2x·2 = 6x²+4x ✓.
3. **A three-term, multi-variable extraction with a negative leading coefficient, directly
   confronting MC-2 and demonstrating the sign convention.** Factor −6x³y + 9x²y² − 3x²y.
   Numerical GCF(6,9,3)=3; convention: factor a negative sign with the GCF when the leading term is
   negative → use −3x²y. Variable x: min power in {x³,x²,x²}=x²; variable y: min power in
   {y,y²,y}=y. GCF = −3x²y. −6x³y÷(−3x²y)=2x; 9x²y²÷(−3x²y)=−3y; −3x²y÷(−3x²y)=1. Result:
   −3x²y(2x−3y+1). Verify: (−3x²y)(2x)=−6x³y ✓; (−3x²y)(−3y)=9x²y² ✓; (−3x²y)(1)=−3x²y ✓.
4. **A quotient-arithmetic stress test, directly confronting MC-3.** Factor 18x⁴ − 12x³ + 6x².
   GCF(18,12,6)=6; variable: min power in {x⁴,x³,x²}=x². GCF=6x². 18x⁴÷6x²=3x²; −12x³÷6x²=−2x;
   6x²÷6x²=1. Result: 6x²(3x²−2x+1). Verify: 6x²·3x²=18x⁴ ✓; 6x²·(−2x)=−12x³ ✓; 6x²·1=6x² ✓. Note
   the residual 3x²−2x+1 has discriminant 4−12=−8<0 — it is irreducible, so the factorisation is
   genuinely complete (a direct, concrete link forward to `math.alg.factoring`'s own discriminant
   verification tool).

## Discovery Questions
- "You correctly found the numerical GCF of 6x² and 4x is 2. Is 2 the whole story, or is there
  something else the two terms also have in common?" — surfaces MC-1 directly, inviting the
  learner to notice the shared variable factor themselves.
- "Does x³ divide evenly into x²? Try it: what is x² ÷ x³? Is the result a valid polynomial term?"
  — surfaces MC-2 through direct computation rather than a stated rule, letting the learner
  discover why the highest power fails.
- "You wrote 12x³ ÷ 4x = 3x³. If that's right, what should 4x times 3x³ give you back? Compute it
  and compare to 12x³." — surfaces MC-3 via the exact verification habit this concept is meant to
  install, using the learner's own error as the demonstration.

## Teaching Sequence
1. **Anchor**: connect explicitly to the already-secure `math.alg.factoring` — this concept is a
   focused fluency drill on that concept's own first step, GCF extraction, not a new independent
   topic.
2. **Ground the numerical half first**: a pure-integer example (Demonstration 1) confirms the
   already-known integer-GCF algorithm before any variable is introduced.
3. **Bridge to the variable half explicitly**: Demonstration 2, naming both parts (numerical,
   variable) as independently required, directly pre-empting MC-1.
4. **Contrast GCF against LCM directly**: state and demonstrate why the variable part uses the
   LOWEST shared power (Demonstration 2/4), directly pre-empting MC-2, using the "GCF=minimum,
   LCM=maximum" memory device.
5. **Install monomial division as its own explicit skill**: practice (ax^m)÷(bx^k)=(a÷b)x^(m−k) in
   isolation before embedding it in a full extraction, pre-empting MC-3.
6. **Introduce the negative-leading-coefficient convention** (Demonstration 3) as a style
   convention, not a new rule — acknowledged but not over-emphasised at this developing level.
7. **Install verification-by-expansion as non-negotiable**: every worked example and every
   assessment item ends with GCF × residual reconstructing the original.
8. **Bridge forward**: state explicitly that this fluency is the entry step of the full
   `math.alg.factoring` decision tree — a correct GCF here is what every later step in that
   concept's procedure depends on.

## Tutor Actions
- After any proposed GCF, ask "does this factor divide EVERY term, with no remainder and no
  negative exponent?" before accepting it — this single check simultaneously guards against MC-1
  (an incomplete GCF still technically divides every term, but so would a smaller, incomplete
  factor — pair this with an explicit "is this the LARGEST such factor?" follow-up) and MC-2 (an
  over-large proposed factor will fail this check outright).
- When a learner proposes a variable exponent for the GCF, ask them to name the power of that
  variable in EACH term individually before committing to an answer — this makes the "take the
  lowest" comparison explicit rather than implicit, directly targeting MC-2.
- After any division step, ask "what do you get if you multiply your GCF by your answer? Does it
  reconstruct the original term?" — this is the direct operational form of the verification habit,
  targeting MC-3 at the moment the error is made rather than after the fact.
- Never accept a "factored" answer without the full expand-and-check step shown, even when the
  answer is correct — the habit must be built as a reflex, not treated as optional once confidence
  is high.

## Voice Teaching Notes
- Speak the two-part GCF rule as a genuine two-beat phrase every time: "numerical part... AND
  variable part" — with real separation between the two, so the learner hears that both are
  independently required rather than one flowing automatically from the other.
- When contrasting GCF and LCM aloud, use contrasting emphasis on the comparison words: "GCF —
  SMALLEST shared power... LCM — LARGEST shared power" — spoken opposition mirrors the conceptual
  opposition the Blueprint's memory device is built on.
- When demonstrating verification, narrate the multiplication back out loud, term by term ("GCF
  times first term... does that give me back the first original term? Yes.") rather than silently
  writing it — hearing the check performed models the habit as an audible, repeatable ritual.

## Assessment Signals
- **Correct + fast + verifies unprompted** → MASTERED; ready to resume `math.alg.factoring`'s full
  decision tree with a secure first step, and `math.alg.factoring-trinomials` becomes reachable.
- **Numerical GCF correct, variable factor missing** → MC-1 active; needs the two-part-rule repair
  before advancing.
- **Variable exponent taken as the highest rather than lowest shared power** → MC-2 active; needs
  the GCF-vs-LCM contrast repair.
- **GCF correctly identified but division/residual arithmetic wrong** → MC-3 active; needs the
  monomial-division repair, reinforced with the verification habit.
- **Cannot compute even the pure-numerical GCF** → prerequisite gap in basic integer GCF, not a
  factoring-specific misconception; route back to that foundational skill rather than re-teaching
  this concept's variable-extension content.

## Tutor Recovery Strategy
If a learner has just had MC-1 pointed out and shows frustration at "missing something obvious,"
reframe immediately: the numerical GCF algorithm they already know is not wrong, it is simply
incomplete for polynomial terms — affirm the correct half of their work explicitly before
introducing the missing half, rather than treating the whole answer as a failure. If a learner
repeatedly reverts to the highest-power rule (MC-2) after correction, suspect genuine LCM/GCF
term confusion rather than carelessness — pause GCF practice and briefly confirm the learner can
still correctly state which rule (highest vs. lowest power) applies to LCM in isolation, since a
learner who has lost that distinction entirely needs it re-anchored before the GCF-specific rule
can be trusted to stick.

## Memory Hooks
- "Two parts, every time: number AND letter" — a short, repeatable framing installing the two-part
  GCF structure as a reflex, directly targeting MC-1.
- "GCF is small, LCM is tall" — a compact rhyme distinguishing the minimum-exponent rule (GCF) from
  the maximum-exponent rule (LCM), directly targeting MC-2.
- "Divide the number, subtract the power" — the precise two-clause instruction for dividing a
  monomial by a monomial, directly targeting MC-3.
- "Multiply back to check" — the standing verification reflex, applicable to every extraction
  regardless of which misconception (if any) is active.

## Transfer Connections
- **`math.alg.factoring`** (prerequisite, reused): this concept is a focused fluency drill on that
  concept's own first decision-tree step; mastery here is what makes every later step of that
  concept's procedure reliable.
- **`math.alg.factoring-trinomials`** (direct unlock, requires this concept): non-monic and monic
  trinomial factoring via the ac-method assumes the learner can already cleanly extract a GCF
  before attempting the trinomial-specific pattern — a residual trinomial with an unextracted GCF
  still hiding inside it will resist the ac-method's number search.
- **`math.nt.gcd`** (cross-link, not yet authored): the formal number-theoretic GCD (via prime
  factorisation or the Euclidean algorithm) is the theoretical foundation this concept uses
  operationally on monomials without deriving from first principles; when that concept is
  authored, a genuine cross-link probe connecting "monomial GCF as applied GCD" becomes possible.

## Cross-Subject Connections
- **Chemistry** (`chem.` stoichiometry, empirical formula determination): finding the empirical
  formula of a compound from a molecular formula (e.g. C₆H₁₂O₆ → CH₂O) is literally a GCF
  extraction on the subscripts — the identical "find the largest shared factor, divide every
  quantity by it" procedure taught here, applied to atom counts instead of polynomial coefficients.
- **Computer science** (`cs.` algorithm complexity, factoring/simplification routines): symbolic
  algebra systems and expression simplifiers implement exactly this GCF-then-cancel procedure as
  one of their most basic operations — a learner who has internalised the two-part GCF rule
  understands, at a conceptual level, what such software is actually doing.

## Blueprint References
- `docs/curriculum/blueprints/math.alg.factoring-gcf.md` — Component 0 (metadata: difficulty
  developing, bloom apply, mastery_threshold 0.9, estimated_hours 3, requires
  [math.alg.factoring], cross_links [math.nt.gcd]); Component 2 (Misconception Registry MC-1..MC-3,
  reused above with birth-type classification added); Component 4 (worked examples for 15x³y² +
  10x²y³, 18x⁴−12x³+6x², −6x³y+9x²y²−3x²y, reused directly in the Demonstrations above); the P76
  transfer probe (factor 4x⁴−12x³+8x² completely, independence mode, `math.nt.gcd` not yet a Tier
  1 concept) — held in the Blueprint's own mastery-gate item bank, not restated here per the
  Standard's ownership boundary.

## Runtime Asset References
- No AssetIdentity rows exist yet for this concept (mathematics EB authoring is ahead of the
  AssetIdentity seeding campaign for math.alg — see CLAUDE.md's "Mathematics Educational Brain
  serving-asset campaign" section for the seeding mechanism this concept will use once authored
  content is selected for transcription).

## Curriculum Feedback
- **No overlap found with `math.alg.factoring`'s own MC-1 (GCF-THEN-DONE)**: that misconception is
  about STOPPING after a correctly-computed GCF extraction without checking the residual for
  further factorability; this concept's three misconceptions are all about correctly COMPUTING the
  GCF itself (missing the variable part, taking the wrong power, dividing incorrectly) — a
  genuinely distinct failure surface at an earlier procedural stage, not a duplication. Recorded
  explicitly here so a future authoring session does not mistake the two for the same finding.
- No genuine content-overlap or metadata discrepancy was found between this Blueprint and any
  already-authored sibling entry.

## Version History
- 2026-09-11 — Initial authoring (Batch 6 / math.alg Wave 8 of the Mathematics Educational Brain
  completion campaign). Blueprint reused by reference in full. No KG or Blueprint file modified.
