# math.alg.rational-expressions-addition

## Identity
- **KG ID**: `math.alg.rational-expressions-addition`
- **Domain**: math.alg (Algebra)
- **Requires**:
  - `math.alg.rational-expressions` — load-bearing part: this concept is a focused specialisation
    of that concept's own addition/subtraction operation (already introduced there via one direct
    numeric contrast); without domain-restriction awareness and basic simplification already
    secure, the LCD-building and persistence-of-exclusions content here has no foundation to extend.
- **Unlocks**: none directly in the KG (this concept is itself a direct prerequisite of
  `math.alg.rational-equations`, per that Blueprint's own metadata — see Curriculum Feedback below
  for a genuine KG/Blueprint discrepancy on this exact point)
- **Cross-links**: none in the KG
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.8 (MAMR = ⌈0.8×5⌉ = 4/5)
- **Estimated hours**: 6
- **Blueprint**: `docs/curriculum/blueprints/math.alg.rational-expressions-addition.md` (reused by
  reference throughout)
- **KG note**: this concept's parent in the KG is `math.alg.rational-expressions`, whose own
  Educational Brain entry already introduced addition/subtraction via one direct numeric contrast
  (per that concept's own compression strategy); this entry is the dedicated deep-dive the parent
  entry's own "KG children" note anticipated.

## Learning Objective
- The learner can add or subtract two rational expressions with the SAME denominator by combining
  numerators directly over the shared denominator, without altering the denominator itself.
- The learner can add or subtract two rational expressions with DIFFERENT denominators by first
  FACTORING each denominator to find the genuine Least Common Denominator (LCD) — never by
  multiplying the unfactored denominators together, which produces an unnecessarily large,
  harder-to-simplify common denominator whenever the denominators share a factor.
- The learner can correctly convert each fraction to the LCD by multiplying BOTH numerator and
  denominator by the same missing factor, and can correctly state that any value excluded by the
  ORIGINAL denominators remains excluded from the final simplified result, even after a factor
  cancels during simplification.

## Core Understanding
Adding or subtracting rational expressions extends the already-fluent numeric-fraction rule
directly: with the SAME denominator, combine the numerators over that one shared denominator (A/D +
B/D = (A+B)/D); with DIFFERENT denominators, a genuine common denominator must be found first. The
efficient way to find that common denominator — the Least Common Denominator, or LCD — is to factor
each denominator completely FIRST and then build the LCD from the union of those factored pieces,
rather than simply multiplying the two unfactored denominators together, which frequently produces
a far larger common denominator than necessary whenever the two denominators share one or more
factors (e.g. for denominators x²−1 and x+1, the genuine LCD is (x+1)(x−1), not the unnecessarily
large (x²−1)(x+1) that direct multiplication would produce). Once the LCD is identified, each
fraction is converted by multiplying BOTH its numerator and denominator by whatever factor is
missing from its own original denominator to reach the LCD — a step that must never touch only the
denominator, since multiplying a fraction's denominator alone changes its value. Throughout, the
domain restriction established by the ORIGINAL, pre-combination denominators must be tracked and
preserved: a value that made any original denominator zero remains excluded from the combined
result's domain permanently, regardless of whether that exclusion is still visible in the final
simplified denominator after any subsequent cancellation.

## Mental Models
1. **Beginner — same denominator, just add the tops; different denominators, find a shared
   bottom first.** Directly mirrors already-fluent numeric fraction addition. *Upgrade trigger*: a
   pair of denominators that share a factor, where "just multiply them together" produces a
   needlessly large common denominator. *Shelf life*: one session.
2. **Intermediate — the genuine LCD comes from factoring each denominator first, not from blindly
   multiplying unfactored denominators together.** Factor, identify shared factors, build the LCD
   from the union of distinct factors at their highest needed power. *Upgrade trigger*: a
   combination result that, after adding, still has a factor common to numerator and denominator —
   revealing that simplification is a separate, final step even after successful addition.
   *Shelf life*: durable once "factor before combining" becomes automatic.
3. **Advanced — the domain restriction is a property of the ORIGINAL expressions being combined,
   and it survives regardless of what happens during simplification afterward.** A value excluded
   by any original denominator remains excluded from the final answer's domain even if it is no
   longer visible in the simplified denominator. *Upgrade trigger*: a combination whose FINAL
   simplified denominator, taken alone, would suggest a different (smaller) set of exclusions than
   the true, original-derived set.
4. **Expert — rational-expression addition is the exact algebraic scaffolding for clearing
   denominators in rational equations, where the same LCD-finding technique is applied to BOTH
   sides of an equation rather than to combine two expressions into one.** *Shelf life*: permanent,
   and it is precisely the connection this concept's own downstream concept,
   `math.alg.rational-equations`, depends on directly.

## Why Students Fail
The most common failure, ranked moderate rather than foundational in the Blueprint's own registry
because it produces a technically-workable-but-inefficient result rather than a wrong one, is
computing a "common denominator" by multiplying the two unfactored denominators together directly,
skipping the factoring step that would reveal any shared factors — for 1/(x²−1) + 2/(x+1), missing
that x+1 is already a FACTOR of x²−1 and instead using the unnecessarily large product
(x²−1)(x+1) as the common denominator, which still yields a correct final answer after
simplification but at substantially higher computational cost and error risk. The second and most
consequential failure, marked foundational, is losing track of a value excluded by the ORIGINAL
expression's denominator once a canceling factor removes it from the simplified form — treating the
simplified result as equivalent to the original for every input, including the excluded value,
which is a subtle but genuine error about what algebraic equivalence actually means (two
expressions that agree everywhere except at one excluded point are not identical functions, however
similar their formulas look). The third failure occurs during the LCD-conversion step itself:
changing a fraction's denominator to match the LCD without correspondingly rescaling its numerator
by the identical factor — producing a numerator that no longer represents the same value as the
original fraction, since multiplying only the denominator (not both parts by the same factor)
changes what the fraction actually equals.

## Misconceptions
Reused by reference from the Blueprint's Component 6 registry (MC-1..MC-3), with birth-type
classification added.

- **MC-1 — LCD-COMPUTED-AS-PRODUCT-OF-UNFACTORED-DENOMINATORS** (moderate)
  - **Birth type**: Type 5, instruction-induced — the "multiply the denominators together" shortcut
    generalises the numeric-fraction case where denominators rarely share obvious factors, without
    the explicit habit of checking for shared factors via factoring first being installed as the
    default.
  - **Characteristic phrase**: for 1/(x²−1) + 2/(x+1), using (x²−1)(x+1) as the common denominator
    instead of the genuine, smaller LCD (x+1)(x−1).
  - **Detection probe**: present Example 2 and check whether denominators are factored before
    combining — an unfactored product confirms MC-1.
  - **Repair**: Blueprint Repair Action B01 — re-factor each denominator explicitly, identifying the
    shared factor before forming the genuine LCD; state the rule: always factor each denominator
    FIRST, since the true LCD often shares factors that direct multiplication misses.
  - **Verification of death**: given a pair of denominators sharing a factor, the learner factors
    both before attempting to combine, and correctly identifies the smaller, genuine LCD every
    time.

- **MC-2 — DOMAIN-RESTRICTION-DROPPED-AFTER-CANCELLATION** (FOUNDATIONAL)
  - **Birth type**: Type 4, notation-induced — identical mechanism to `math.alg.rational-
    expressions`'s own MC-1 (DOMAIN-FROM-SIMPLIFIED-FORM-ONLY): once cancellation removes an
    excluded factor from view, the domain-restriction rule is applied to whatever denominator is
    currently visible rather than to the original, pre-cancellation expression.
  - **Characteristic phrase**: for (x²−4)/(x−2) simplifying to x+2, treating the simplified
    expression as equivalent to the original for ALL x, including x=2 (where the original was
    undefined).
  - **Detection probe**: present Example 3 and check whether x≠2 is stated alongside the simplified
    answer x+2 — omission confirms MC-2.
  - **Repair**: Blueprint Repair Action B02 — re-examine the ORIGINAL, pre-cancellation
    expression's denominator explicitly, confirming the excluded value BEFORE any simplification
    occurs, so the restriction is anchored to the source rather than to whatever form is currently
    on the page.
  - **Verification of death**: given several combination-then-simplification problems each
    involving a cancelled factor, the learner correctly states the full domain restriction
    (including the cancelled value) every time, sourced from the original denominators.

- **MC-3 — NUMERATOR-NOT-RESCALED-WHEN-CONVERTING-TO-COMMON-DENOMINATOR** (foundational)
  - **Birth type**: Type 1, overgeneralisation — the mechanical act of "changing the denominator to
    match the LCD" is performed without the paired requirement (multiply the numerator by the
    identical factor) being treated as equally mandatory, since only the denominator's visible
    change is the salient, attention-grabbing part of the conversion.
  - **Characteristic phrase**: converting a fraction to a new denominator by writing the LCD
    underneath while leaving the original numerator unchanged, producing a fraction with a
    different value than the original.
  - **Detection probe**: review a submitted conversion for a numerator left unscaled after the
    denominator changed — an unscaled numerator confirms MC-3.
  - **Repair**: Blueprint Repair Action B03 — re-derive the equivalent fraction explicitly,
    multiplying numerator AND denominator by the same missing factor, emphasising that this is the
    identical "multiply by 1" principle already fluent from numeric-fraction conversion.
  - **Verification of death**: given several LCD-conversion problems, the learner correctly
    rescales the numerator by the exact same factor applied to the denominator, every time,
    without being prompted.

## Analogies
- **Exchanging currency at a fixed rate, applied to both sides of a transaction.** Converting a
  fraction to the LCD is like converting a price to a different currency: the EXCHANGE RATE
  (the missing factor) must be applied to both the amount AND however the total is denominated —
  applying it to only one side produces a nonsensical mismatched value. *Where it holds*: the
  "apply the same factor to both parts" requirement, directly targeting MC-3. *Where it breaks*: a
  currency exchange rate is a single fixed multiplier chosen externally, while the LCD-conversion
  factor must be DERIVED by comparing the fraction's own denominator against the target LCD — the
  analogy illustrates the "apply to both" discipline, not the derivation itself.
- **A shared moving-in date with an unavoidable exclusion.** The domain restriction persisting after
  cancellation is like a lease agreement's exclusion clause: even after a tenant moves out (the
  factor cancels from view), the fact that a specific date was once off-limits for occupancy (the
  excluded value) remains a permanent historical fact about the original lease, regardless of what
  the current, simplified agreement says. *Where it holds*: the "cancellation changes appearance,
  never the underlying original fact" structure, directly targeting MC-2. *Where it breaks*: a
  lease's exclusion has no equivalent of "shared across multiple original denominators being
  combined" — the analogy illustrates single-source persistence, and must be paired with the direct
  algebraic demonstration for the multi-denominator combination case.

## Demonstrations
1. **Same-denominator addition, establishing the base rule.** Add 3x/(x+2) + 5/(x+2) = (3x+5)/(x+2)
   (domain restriction: x≠−2).
2. **Factored-LCD combination, directly confronting MC-1.** Add 1/(x²−1) + 2/(x+1). Factor first:
   x²−1=(x+1)(x−1). LCD=(x+1)(x−1) — note x+1 is already a factor of x²−1, so the genuine LCD is
   NOT the product of both unfactored denominators. Convert: 1/[(x+1)(x−1)] + 2(x−1)/[(x+1)(x−1)]
   = [1+2(x−1)]/[(x+1)(x−1)] = (2x−1)/[(x+1)(x−1)].
3. **Domain-restriction persistence after cancellation, directly confronting MC-2.** Simplify
   (x²−4)/(x−2). Factor: [(x+2)(x−2)]/(x−2) = x+2 — but this is valid only for x≠2, since the
   original expression is UNDEFINED at x=2 even though the simplified form x+2 is perfectly
   well-defined there; the simplified and original expressions agree everywhere except at that one
   excluded point.
4. **A full addition with no shared factors, directly confronting MC-3.** Subtract 5/(x+1) −
   2/(x−1). No shared factors; LCD = (x+1)(x−1) (the full product). Convert: BOTH numerator and
   denominator of each fraction scaled by the missing factor — 5(x−1)/[(x+1)(x−1)] −
   2(x+1)/[(x+1)(x−1)] = [5(x−1)−2(x+1)]/[(x+1)(x−1)] = (5x−5−2x−2)/[(x+1)(x−1)] =
   (3x−7)/[(x+1)(x−1)]. Verify each conversion step: 5/(x+1) genuinely equals 5(x−1)/[(x+1)(x−1)]
   because both numerator and denominator were multiplied by the identical factor (x−1).

## Discovery Questions
- "For 1/(x²−1) + 2/(x+1), before you multiply the two denominators together, check: is x+1
  already hiding inside x²−1 once you factor it? What does that tell you about the smallest common
  denominator you actually need?" — surfaces MC-1 by requiring the factoring check before the
  shortcut is attempted.
- "You simplified (x²−4)/(x−2) to x+2. Go back to the ORIGINAL expression — is there a value of x
  where it's undefined? Does your simplified answer still need to exclude that value?" — surfaces
  MC-2 by forcing attention back to the source expression.
- "You changed a fraction's denominator to match the LCD. What did you do to its numerator? Should
  it have changed too?" — surfaces MC-3 by making the paired requirement explicit.

## Teaching Sequence
1. **Anchor**: connect explicitly to the already-secure same-denominator addition already
   introduced in `math.alg.rational-expressions` — this concept deepens the different-denominator
   case with the full LCD-building procedure.
2. **Ground the same-denominator case first** (Demonstration 1), confirming the direct-combination
   rule before any complication is introduced.
3. **Teach factored-LCD-building explicitly, contrasted against the flawed shortcut**
   (Demonstration 2), directly pre-empting MC-1.
4. **Install the domain-restriction-persistence habit as a standing rule**, reinforced with
   Demonstration 3, directly pre-empting MC-2 — anchored explicitly to the ORIGINAL denominators,
   not the current simplified form.
5. **Teach LCD conversion with the paired numerator-rescaling requirement made explicit from the
   first example** (Demonstration 4), directly pre-empting MC-3.
6. **Practice mixed problems** deliberately combining shared-factor and no-shared-factor
   denominators, always requiring the factoring-first check and the domain-restriction statement
   from the original denominators.
7. **Bridge forward**: state explicitly that this concept's LCD-finding technique is the exact tool
   `math.alg.rational-equations` applies to clear denominators from BOTH sides of an equation.

## Tutor Actions
- Before accepting any common denominator, ask "did you factor each denominator first, or did you
  just multiply them together?" — targeting MC-1 directly.
- After any simplification involving a cancelled factor, ask "what was the domain restriction on
  the ORIGINAL expression, before you simplified?" — targeting MC-2 directly, at the exact point
  the error would be made.
- After any LCD conversion, ask "what did you multiply the denominator by? Did you multiply the
  numerator by the exact same thing?" — targeting MC-3 directly.
- Never accept a combined rational expression without the domain restriction stated from the
  original (pre-combination) denominators, even when the final simplified answer is otherwise
  correct.

## Voice Teaching Notes
- When building an LCD aloud, narrate the factoring-first discipline explicitly: "factor first...
  now, is anything shared?" — spoken as a genuine two-step ritual, targeting MC-1.
- When stating a domain restriction aloud after simplification, place audible emphasis on
  "ORIGINAL": "go back to the ORIGINAL denominators" — reused deliberately from
  `math.alg.rational-expressions`'s own established voice-teaching convention for the identical
  underlying rule.
- When performing an LCD conversion aloud, speak both parts of the multiplication together every
  time: "top AND bottom, times the same thing" — reinforcing the paired requirement audibly,
  targeting MC-3.

## Assessment Signals
- **Correct + fast + factors denominators before combining unprompted** → MASTERED; ready for
  `math.alg.rational-equations`.
- **Combination correct but uses an unfactored, oversized common denominator** → MC-1 active; needs
  the factor-first repair.
- **Simplification correct, domain restriction incomplete or sourced from the simplified form** →
  MC-2 active; needs the original-denominator-anchoring repair.
- **LCD conversion leaves a numerator unscaled** → MC-3 active; needs the paired-rescaling repair.
- **Cannot find a common denominator at all, even for same-value denominators** → prerequisite gap
  in `math.alg.rational-expressions`'s own basic simplification/domain content, not specific to
  this concept's LCD-building extension; route back accordingly.

## Tutor Recovery Strategy
If a learner has just had MC-1 pointed out and shows frustration that their (correct but
inefficient) answer was "wrong," clarify immediately that the FINAL simplified answer was very
likely still correct — the correction is about efficiency and error-risk, not correctness of the
end result; frame the factoring-first habit as a genuine time-saver rather than a required
correction to a wrong answer. If MC-2 persists after one correction, avoid simply repeating the
rule — instead have the learner substitute the excluded value directly into the ORIGINAL
(uncombined) expression and observe the undefined result firsthand, since a concrete, self-produced
demonstration of undefinedness is more durable than an abstract restated rule.

## Memory Hooks
- "Factor first, every time" — reused deliberately from `math.alg.factoring-gcf`'s and
  `math.alg.rational-expressions`'s established opening habit, directly targeting MC-1.
- "The original denominator never forgets" — reused verbatim from `math.alg.rational-expressions`'s
  identical hook for the identical persistence rule, directly targeting MC-2.
- "Top and bottom, same factor, every time" — the paired-rescaling rule, directly targeting MC-3.

## Transfer Connections
- **`math.alg.rational-equations`** (per the Blueprint's own metadata, this concept's direct
  prerequisite — see Curriculum Feedback below for the genuine KG/Blueprint discrepancy on this
  point): clearing denominators from both sides of a rational equation applies this concept's
  LCD-finding technique directly, to an equation rather than to combining two expressions.
- **`math.alg.rational-expressions`** (prerequisite, reused): this concept deepens that concept's
  own compressed introduction to addition/subtraction into a full, dedicated procedure.
- **`math.alg.rational-expressions-multiplication`** (sibling, this same wave): both concepts share
  the identical domain-restriction-persistence discipline, applied to different operations.

## Cross-Subject Connections
- **Physics** (`phys.` circuits): combining two resistances' reciprocal terms in a parallel-circuit
  formula is a direct application of this concept's LCD-building procedure — the Blueprint's own
  transfer probe uses exactly this scenario.
- **Chemistry** (`chem.` rate laws, equilibrium): combining multiple rate or equilibrium terms
  expressed as rational expressions in concentration variables reuses this concept's LCD-finding
  and domain-restriction discipline directly.

## Blueprint References
- `docs/curriculum/blueprints/math.alg.rational-expressions-addition.md` — Component 0 (metadata:
  difficulty proficient, bloom apply, mastery_threshold 0.80, estimated_hours 6, requires
  [math.alg.rational-expressions]); Component 6 (Misconception Registry MC-1..MC-3, reused above
  with birth-type classification added); Component 4 (worked examples for 1/(x²−1)+2/(x+1) and
  (x²−4)/(x−2), reused directly in the Demonstrations above); the P76 transfer probe (a
  parallel-circuit resistance combination requiring LCD-building and domain-restriction reasoning,
  independence mode) — held in the Blueprint's own mastery-gate item bank, not restated here per
  the Standard's ownership boundary.

## Runtime Asset References
- No AssetIdentity rows exist yet for this concept (mathematics EB authoring is ahead of the
  AssetIdentity seeding campaign for math.alg — see CLAUDE.md's "Mathematics Educational Brain
  serving-asset campaign" section for the seeding mechanism this concept will use once authored
  content is selected for transcription).

## Curriculum Feedback
- **Genuine KG/Blueprint metadata discrepancy found, resolved toward the KG (authoritative), per
  standing rule**: this concept's own Blueprint (Component 0, `requires`) lists only
  `math.alg.rational-expressions` as its prerequisite, matching the live KG exactly — but
  `math.alg.rational-equations`' own Blueprint (Component 0, `requires`) states its prerequisite as
  `math.alg.rational-expressions-addition` (this concept), while the live KG lists
  `math.alg.rational-equations`' `requires` as `math.alg.rational-expressions` directly (verified
  by direct KG query this batch). This is a genuine cross-Blueprint discrepancy — one Blueprint
  believes this concept is a mandatory stepping-stone, the KG's own edge does not encode that
  dependency. Not fixed (no KG or Blueprint file modified); recorded here and in
  `math.alg.rational-equations`'s own entry, resolved toward the KG for topological-readiness
  purposes (this is why `math.alg.rational-equations` was correctly computed as ready alongside
  this concept in the same wave, rather than waiting for this concept specifically).
- **Genuine mechanism overlap, not duplication, with `math.alg.rational-expressions`'s own MC-1
  (DOMAIN-FROM-SIMPLIFIED-FORM-ONLY)**: this concept's MC-2
  (DOMAIN-RESTRICTION-DROPPED-AFTER-CANCELLATION) is the identical Type-4 mechanism, applied
  specifically within the addition/subtraction context — correctly authored as intentional depth
  (the parent concept introduces the general rule, this concept drills it in the multi-denominator
  combination case), cross-referenced explicitly rather than silently duplicated.

## Version History
- 2026-09-11 — Initial authoring (Batch 7 / math.alg Wave 9 of the Mathematics Educational Brain
  completion campaign). Blueprint reused by reference in full. No KG or Blueprint file modified.
