# math.alg.absolute-value-equations

## Identity
- **KG ID**: `math.alg.absolute-value-equations`
- **Domain**: math.alg (Algebra)
- **Requires**:
  - `math.arith.absolute-value` — load-bearing part: this concept's entire case-splitting method depends on the already-established fact that absolute value measures distance from zero and is therefore always nonnegative; without that fact, neither "why two cases" nor "why no solution when set equal to a negative" has any grounding.
  - `math.alg.linear-equation-1var` — load-bearing part: once an absolute value equation is split into cases, each resulting case is an ordinary linear equation, solved with the already-secured balance-and-isolation technique.
- **Unlocks**: none in the KG
- **Cross-links**: none in the KG
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.8 (MAMR = ⌈0.8×5⌉ = 4/5)
- **Estimated hours**: 6
- **Blueprint**: `docs/curriculum/blueprints/math.alg.absolute-value-equations.md` (reused by reference throughout)

## Learning Objective
- The learner can solve |expression| = k (for k ≥ 0) by splitting into the two cases expression = k and expression = −k, and taking the union of both cases' solutions.
- The learner can recognise, by checking the sign of k *before* attempting to split into cases, that |expression| = k has no solution at all when k is negative.
- The learner can solve absolute value inequalities, correctly distinguishing |expression| < k (a connected "between" interval, an AND-region) from |expression| > k (two disconnected "outside" pieces, an OR-region).

## Core Understanding
An absolute value equation |expression| = k asks: what values make the *distance from zero* of "expression" equal to k? Because a single distance value k corresponds to exactly two points on the number line (k units to the right of zero, and k units to the left), the expression itself must equal either k or −k, which is the entire justification for the two-case split — it is not an arbitrary algebraic trick but a direct restatement of what absolute value already means. This justification simultaneously explains the equation's degenerate case: if k is negative, no distance can ever equal a negative number (distance is a nonnegative quantity by definition), so the equation has no solution at all, and this can — and must — be determined by inspecting the sign of k before any case-splitting is attempted, since splitting a genuinely unsolvable equation produces meaningless candidate values that will fail to check out. Absolute value inequalities extend the same distance-from-zero idea to a range rather than a single value, but the two possible inequality directions produce genuinely different geometric shapes: |expression| < k asks for points *closer to zero than k*, which is a single connected region between −k and k (both conditions must hold simultaneously — an AND/conjunction); |expression| > k asks for points *farther from zero than k*, which necessarily falls into two separate, disconnected pieces (either past k on the positive side or past −k on the negative side — an OR/disjunction), because there is no way to be simultaneously far from zero in only one direction.

## Mental Models
1. **Beginner — a distance of k means two possible locations, k to the right or k to the left of zero.** |x| = 5 means x is at +5 or at −5. *Upgrade trigger*: an equation set equal to a negative number, where "two possible locations" has no answer because no distance can be negative in the first place. *Shelf life*: one session.
2. **Intermediate — check the sign of the right-hand side before doing anything else.** Before splitting |expression| = k into cases, confirm k ≥ 0; if k < 0, stop immediately, there is no solution. *Upgrade trigger*: an absolute value *inequality*, where "check the sign" alone gives no guidance about which logical structure (AND or OR) applies to which inequality direction. *Shelf life*: durable and remains correct permanently as a standing habit for equations.
3. **Advanced — visualise the inequality on a number line before writing any symbolic split.** |expression| < k traps the expression's value in the connected zone between −k and k; |expression| > k pushes it into one of two zones beyond those same two boundary points. *Upgrade trigger*: needing to justify, rather than merely recall, why these two directions produce structurally different (connected versus disconnected) solution shapes.
4. **Expert — absolute value equations and inequalities are all instances of a single distance-based case analysis, and the "AND versus OR" split is forced by which side of the boundary points the target region lies on.** *Shelf life*: permanent, and it is the model that generalises cleanly to absolute value equations and inequalities involving more complex expressions, and eventually to the analogous case-splitting required when solving inequalities involving other nonnegative-valued expressions.

## Why Students Fail
The single most damaging failure in the equation case is splitting into two cases without first checking whether the right-hand side is even a valid distance: facing |3x+1| = −4, the learner proceeds directly to "3x+1 = −4 or 3x+1 = 4," producing two candidate values that, when substituted back into the original equation, both fail to check out — because the sign check that would have caught the equation as unsolvable in one step was skipped in favour of jumping straight to the (familiar, comfortable) case-splitting procedure. The second major failure, specific to inequalities, is applying the same logical structure to both inequality directions rather than recognising they are genuinely different: a learner who has correctly learned that |expression| < k produces a connected "between" interval may apply that identical structure to |expression| > k, or vice versa, because both cases superficially "split into two conditions" and the surface similarity masks a deep structural difference — one direction requires both conditions to hold at once (AND, one interval), the other requires either condition to hold (OR, two disconnected pieces). A third, narrower failure appears specifically in equations embedded within a larger context: having performed a case split correctly, the learner fails to verify each resulting candidate against the *original* absolute value equation, missing that a case can occasionally produce a value that does not actually check out — most commonly when the absolute value expression is not perfectly isolated before splitting.

## Misconceptions
Reused by reference from the Blueprint's Component 6 registry (MC-1..MC-3) and its repair actions B01–B03, with birth-type classification added.

- **MC-1 — ABSOLUTE-VALUE-EQUATION-SPLIT-WITHOUT-CHECKING-SIGN** (FOUNDATIONAL)
  - **Birth type**: Type 1, overgeneralisation of the case-splitting procedure applied unconditionally, without the prerequisite sign check that determines whether splitting is even valid.
  - **Characteristic phrase**: given |3x+1| = −4, splitting directly into "3x+1 = −4 or 3x+1 = 4" rather than recognising immediately that no solution exists.
  - **Detection probe** (verbatim, Blueprint P41): present |3x+1| = −4 and check whether case-splitting is attempted before the sign of −4 is examined.
  - **Repair**: Blueprint Repair Action B01 — re-state the check-first rule explicitly: verify the right-hand side is nonnegative before any splitting is attempted; if it is negative, stop, the equation has no solution.
  - **Verification of death**: given |2x+5| = −3, the learner states immediately, without attempting any algebra, that there is no solution, and can explain why (distance cannot be negative).

- **MC-2 — ABSOLUTE-VALUE-INEQUALITY-AND-OR-STRUCTURE-CONFUSED** (foundational)
  - **Birth type**: Type 1, overgeneralisation — both inequality directions "split into two conditions" on the surface, and without an explicit distinguishing rule, the learner applies whichever structure (AND or OR) was more recently practised to both cases indiscriminately.
  - **Characteristic phrase**: solving |x−2| < 5 and |x−2| > 5 with the identical logical structure, rather than the correct connected-interval-versus-two-disconnected-pieces distinction.
  - **Detection probe** (verbatim, Blueprint P41): present Example 3's two inequality directions and check whether the same structure is applied to both.
  - **Repair**: Blueprint Repair Action B02 — re-draw both cases on a number line, visually confirming the connected "between" region for < against the two disconnected "outside" pieces for >.
  - **Verification of death**: given |2x−1| > 9, the learner produces two disconnected pieces (x < −4 or x > 5), correctly distinct in structure from a between-interval answer.

- **MC-3 — ABSOLUTE-VALUE-SOLUTIONS-NOT-VERIFIED** (moderate)
  - **Birth type**: Type 1, overgeneralisation of "the case-split procedure was executed correctly, so both resulting values are solutions" — a reasonable inference in the simplest cases, but one that does not hold once the absolute value expression is embedded within a larger equation context.
  - **Characteristic phrase**: reporting both case-split candidates as solutions without substituting either back into the original equation.
  - **Detection probe** (verbatim, Blueprint P41): review a submitted case-split solution for a missing verification step.
  - **Repair**: Blueprint Repair Action B03 — re-substitute each candidate solution back into the *original* absolute value equation, confirming both sides genuinely match.
  - **Verification of death**: given a solved absolute value equation, the learner substitutes both candidates back into the original equation unprompted, before reporting a final answer.

## Analogies
- **Best — a fixed distance from home has exactly two possible destinations.** If a location is exactly 5 miles from home, it could be 5 miles north or 5 miles south — two genuine possibilities, never more, never fewer, and never a distance that is itself negative. This directly grounds the two-case split and, just as directly, the impossibility of a negative distance target.
- **Alternative — the number line as a target range.** For |expression| < k, picture a target zone stretching from −k to k on the number line; for |expression| > k, picture everything *outside* that same zone, split by the zone itself into two separate regions. This targets MC-2 directly by giving the AND/OR distinction a spatial, rather than purely symbolic, footing.
- **Story analogy** — a security perimeter: being "within" a fixed radius of a checkpoint is one connected zone (AND: both far-enough-this-way and far-enough-that-way), while being "beyond" that radius genuinely splits into two disconnected regions (OR: either past one edge or past the other).
- **ANTI-ANALOGY — "split into two cases whenever you see absolute value bars."** This is technically true for equations but dangerously incomplete on its own: it gives no signal that the sign of the right-hand side must be checked *first*, licensing MC-1 directly.
- **ANTI-ANALOGY — "less-than means AND, greater-than means OR — just memorise which is which."** This produces correct answers without genuine understanding and is fragile under pressure; the correct anchor is the number-line picture (which region is being described), not a memorised keyword pairing that MC-2 shows is easily scrambled.

## Demonstrations
- **The sign-check-first collision.** Attempt to solve |3x+1| = −4 by case-splitting anyway, reaching two candidate values, then substitute both back into the original equation and show neither checks out — then repeat, this time checking the sign of −4 first and stopping immediately. *Predict, before splitting, whether the sign check alone can already answer the problem* — the wasted work in the first attempt is the demonstration, operationalising Blueprint B01's repair.
- **The AND-versus-OR number-line pair.** Draw |x−2| < 5 and |x−2| > 5 on two number lines side by side, shading the connected between-region for the first and the two disconnected outside-regions for the second. *Predict, before shading, whether each will produce one connected region or two separate ones* — this operationalises Blueprint B02's repair as a standing visual habit.
- **The verification-catch, run on an embedded case.** Present a case-split solution where one candidate genuinely fails to check out (constructed so the Blueprint's own MC-3 scenario is directly observable), and require substitution of both candidates into the original equation before either is accepted.

## Discovery Questions
Direct instruction wins for the core two-case split itself, since it is a direct, necessary consequence of the already-secured definition of absolute value as distance from zero — there is nothing to discover beyond stating that definition's implication clearly. What is genuinely discoverable, and central to this concept's own distinguishing content, is the AND-versus-OR structural distinction for inequalities: (1) **Need** — "Solve |x−2| < 5 and |x−2| > 5. Are the answer shapes the same or different?" (2) **Playground** — plot several values that satisfy each inequality on a number line, observing which values cluster together and which fall into separate groups. (3) **Invention** — "How would you describe, in your own words, the difference between the two solution pictures?" (4) **Collision** — offer a learner-proposed rule that treats both directions identically (e.g. "always two separate pieces"), and test it against |x−2| < 5's actual, connected solution set. (5) **Formalisation** — "less than" traps the expression between two bounds (one connected region, both conditions must hold — AND); "greater than" pushes it beyond one bound or the other (two disconnected pieces, either condition suffices — OR). (6) **Compression** — "Between means AND, one piece. Beyond means OR, two pieces. Picture the number line, don't just memorise the words."

## Teaching Sequence
The sign-check-first discipline for equations (TA-A01/TA-A02, targeting MC-1) is sequenced before absolute value inequalities are introduced (TA-A03, targeting MC-2), because the sign-check habit — "is this even solvable before I do any work?" — is a simpler, single-condition version of the more complex structural judgment inequalities require, and establishing it first on the easier case builds the general disposition to check *before* mechanically executing a procedure. Within the equation content, the two-case split itself is taught before the sign-check exception is emphasised, so that the exception is understood as a genuine boundary condition on an otherwise-correct procedure, rather than the procedure itself being taught as inherently uncertain. Inequalities (TA-A03) are deliberately taught via direct side-by-side contrast of both directions in the same lesson, rather than one direction followed much later by the other, specifically because MC-2 is a *confusion between* the two structures, and confusable content must be taught adjacently, not sequentially, for the contrast to do its diagnostic work. The Blueprint's own Component 5 sequence (TA-A01 two-case split via conceptual shift, TA-A02 sign-check-first contrast pair, TA-A03 AND-versus-OR contrast pair, TA-A04 mastery gate) is reused by reference and not restated turn-by-turn here.

## Tutor Actions
- **DO: Demonstration** — the sign-check-first collision, run on the learner's own attempted case-split of an unsolvable equation, so the wasted-work realisation is felt directly rather than merely warned about.
- **ORGANIZE: Number-line construction** — the AND-versus-OR pair, built live rather than presented as finished diagrams, so the connected-versus-disconnected shape is discovered in the moment.
- **TEST-THINKING: Prediction** — "is this even solvable?" asked as a mandatory first question for every absolute value equation, before any case-splitting is attempted, until the check is automatic.
- **TEST-THINKING: Error Analysis** — "a student solved |x+4|<6 and got two separate intervals. What went wrong?" — stronger than direct correction because it requires locating the specific structural confusion rather than simply re-stating the correct rule.
- **Does NOT fit: teaching the case-split procedure with only nonnegative right-hand-side examples for an extended period before introducing the negative case.** This produces false confidence and never gives MC-1 an opportunity to surface before an assessment does.
- **Does NOT fit: teaching the two inequality directions in separate, widely-spaced lessons.** MC-2 is fundamentally a confusion *between* the two structures, and separating their instruction removes the direct contrast that most effectively prevents the confusion from forming.

## Voice Teaching Notes
The load-bearing sentence for equations is "check the sign first — before you split anything." Slow down on "before." Listen for a learner who begins writing "or" (the case-split connective) immediately upon reading an absolute value equation, without any preceding pause to consider the right-hand side's sign — the absent pause predicts MC-1 reliably. For inequalities, listen for whether the learner names the shape of the answer ("this will be one connected piece" or "this will be two separate pieces") *before* writing any symbolic inequality — stating the expected shape in advance is the behaviour this concept is building toward, and its absence, replaced by a rote "less than means..." recitation, signals the memorised-keyword fragility MC-2's anti-analogy warns against. Channel reality is owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals
- **Case-splitting attempted on an equation with a negative right-hand side** — MC-1, and the wasted subsequent work (both candidates failing to check out) is itself diagnostic; route to the sign-check-first collision, never to a bare restatement of "check the sign."
- **The same logical structure (AND or OR) applied to both an absolute value < and an absolute value > inequality** — MC-2, cleanly diagnostic when both are solved in the same session; route to the AND-versus-OR number-line pair.
- **A case-split equation solution reported without substitution back into the original equation** — MC-3; less severe when the check would trivially pass, but should still be routed to the verification-catch demonstration to build the standing habit.
- **An unprompted sign check stated before any case-splitting begins** — the strongest positive signal for MC-1's repair; do not require this to be prompted once it appears reliably.
- **Mastery trigger**: the Blueprint's TA-A04 gate, MAMR ⌈0.8×5⌉ = 4/5, including its P76 manufacturing-tolerance transfer probe, whose paired in-tolerance/out-of-tolerance scenario specifically tests whether the AND-versus-OR distinction transfers to a genuinely applied context rather than remaining a memorised symbolic rule.

## Tutor Recovery Strategy
The likely utterance at an unsolvable equation is confusion at getting "two answers that don't work" after case-splitting an equation set equal to a negative. The concept-specific smaller question returns to the distance definition directly: **"Can a distance ever be a negative number? What does |anything| always have to be — positive, negative, or could it be either?"** — re-grounding the impossibility in a fact the learner already holds rather than in a procedural rule to memorise. If the freeze is specifically at an inequality's AND-versus-OR structure, shrink to a concrete instance: **"Pick a number that's close to 2, like 3. Does it satisfy |x−2|<5? Now pick a number far away, like 20. Does that satisfy |x−2|<5?"** — building the connected-region intuition from specific test points before any symbolic interval is written. Generic machinery is owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks
- Concept type: **procedure**, with an embedded judgment at its head (equations: is this solvable at all? inequalities: which logical structure applies?) rather than a single mechanical operation. Review by *application on mixed input* every cycle, including at least one equation with a negative right-hand side and both inequality directions represented.
- Concept-specific deviation: keep the sign-check-first habit and the AND-versus-OR number-line visualisation both in active rotation even once the case-splitting mechanics are fluent — both are judgment calls that decay faster than pure procedure, since a learner can execute the algebra correctly while still applying it to the wrong structural case.
- Interleaving partners: `math.arith.absolute-value` (the distance-from-zero definition this concept's every rule is a direct consequence of) and `math.alg.linear-equation-1var` (the case-solving machinery every resulting equation depends on).

## Transfer Connections
- **Near**: no KG unlocks are recorded for this concept — it currently sits as a terminal leaf, but its case-splitting discipline is the direct conceptual ancestor of similarly structured case analyses in later concepts involving piecewise or sign-dependent definitions.
- **Far**: any measurement or tolerance context expressed as "within k of a target value" (an AND/connected-interval structure) versus "beyond k of a target value" (an OR/disconnected structure) — the Blueprint's own manufacturing-tolerance transfer probe is the canonical instance, but the structural pattern recurs broadly in error-bound and threshold reasoning.
- **Real-world**: quality control tolerance specifications, GPS/location proximity ("within range" versus "out of range"), and any deviation-from-target measurement all use exactly this AND/OR structural distinction.
- **Expert transfer**: the general habit of checking a problem's solvability *before* committing to a procedure (the sign-check-first discipline) and of matching a problem's logical connective (AND versus OR) to its geometric or set-theoretic shape — both recur throughout later mathematics wherever a case analysis is required.

## Cross-Subject Connections
- **Engineering/Manufacturing**, genuine: tolerance specifications expressed as an acceptable deviation from a target value are a direct, standard application of absolute value inequalities, exactly as the Blueprint's own P76 transfer probe demonstrates.
- **Physics**, real: measurement uncertainty and error bounds (a measured value within ± some tolerance of a true value) are naturally expressed and reasoned about using absolute value inequalities.
- The KG records `cross_links: []`. No specific missing edge is flagged as a probable omission — the manufacturing/physics transfer, while genuine and already reflected directly in the Blueprint's own transfer probe, is general-purpose rather than tied to one specific named concept elsewhere in the KG.

## Blueprint References
`docs/curriculum/blueprints/math.alg.absolute-value-equations.md`. Reused by reference, not restated: the Component 6 Misconception Registry (MC-1..MC-3), the repair actions B01–B03, the Component 5 teaching-action sequence (TA-A01 two-case split via conceptual shift, TA-A02 sign-check-first contrast pair, TA-A03 AND-versus-OR contrast pair, TA-A04 mastery gate with its P76 manufacturing-tolerance transfer probe), and the Component 1 learning objectives this entry's Learning Objective section restates in the Standard's own voice. This entry adds birth-type classification, the mental-model ladder culminating in the unified distance-based case-analysis view, the two anti-analogies, the argued direct-instruction call for the two-case split with one nested discovery arc for the AND-versus-OR distinction specifically, the sequencing rationale for teaching both inequality directions adjacently rather than sequentially, and the recovery-strategy shrink-to-already-secured-fact moves for both misconception classes.

## Runtime Asset References
No seeded `AssetIdentity` records exist for this concept. None were created here.

## Curriculum Feedback
None found. `cross_links: []` is a reasonable reflection of this concept's genuinely general-purpose (rather than one specific named) cross-subject transfer character; no specific missing edge was identified during authoring.

## Version History
- v1.0 (2026-09-11): Initial authoring. Domain Certification Mode, math.alg Wave 5.
