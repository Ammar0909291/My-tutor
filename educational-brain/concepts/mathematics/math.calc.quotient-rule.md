# math.calc.quotient-rule

## Identity
- **KG ID**: `math.calc.quotient-rule`
- **Domain**: math.calc (Calculus)
- **Requires**:
  - `math.calc.product-rule` — load-bearing part: the quotient rule is derivable from the product rule combined with the chain rule, and shares its "identify the two pieces first" structure.
- **Unlocks**: none in the KG.
- **Cross-links**: none in the KG (`P76_mode=independence`, per the Blueprint).
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 3
- **Blueprint**: `docs/curriculum/blueprints/math.calc.quotient-rule.md` (reused by reference throughout)

## Learning Objective
- The learner can state and apply the Quotient Rule $\left(\frac{f}{g}\right)'=\frac{f'g-fg'}{g^2}$, correctly identifying which function is $f$ (numerator) and which is $g$ (denominator) before substituting.
- The learner can correctly preserve the ORDER of subtraction in the numerator ($f'g-fg'$, never $fg'-f'g$), recognizing the quotient rule is order-sensitive precisely because subtraction doesn't commute.
- The learner can recognize when the Product Rule (rewriting $f/g$ as $f\cdot g^{-1}$ with the chain rule) would also work, but state why the quotient rule's direct formula is usually more efficient for a genuine quotient.

## Core Understanding
The Quotient Rule, $\left(\frac{f}{g}\right)'=\frac{f'g-fg'}{g^2}$, extends the Product Rule's own "derivative of one times the other, added together" structure to division — but with a crucial structural difference: the numerator involves SUBTRACTION, and subtraction does not commute, so the ORDER genuinely matters. It must be $f'g-fg'$ (derivative of the TOP times the BOTTOM, minus the TOP times the derivative of the BOTTOM), never the reverse $fg'-f'g$, which produces the exact NEGATIVE of the correct answer — a stark contrast with the Product Rule, where $f'g+fg'=fg'+f'g$ and the order genuinely doesn't matter, because addition commutes. The rule can technically be DERIVED by rewriting $f/g=f\cdot g^{-1}$ and applying the Product Rule together with the Chain Rule (since $(g^{-1})'=-g^{-2}g'$), but for a genuine quotient, the direct Quotient Rule formula reaches the same answer in one step, avoiding the extra Chain Rule application the rewriting route requires.

## Mental Models
1. **Beginner — memorize the formula $\left(\frac{f}{g}\right)'=\frac{f'g-fg'}{g^2}$.** Plug in the four pieces and the denominator squared. *Upgrade trigger*: mislabeling which function is $f$ and which is $g$, since the formula alone doesn't visually anchor "top" and "bottom." *Shelf life*: about one lesson.
2. **Intermediate — $f$ is always the numerator (top), $g$ is always the denominator (bottom); the order in the numerator is fixed.** Label explicitly before substituting. *Upgrade trigger*: needing to explain WHY the order matters here but not in the Product Rule — this model uses the rule correctly without yet articulating the reason.
3. **Advanced — subtraction doesn't commute, and that's exactly why order matters here but not in the Product Rule.** $fg'-f'g=-(f'g-fg')$, the exact negative — a direct algebraic consequence, not an arbitrary convention. *Upgrade trigger*: needing to decide whether the Quotient Rule or a simplify-then-Product-Rule route is more efficient for a specific case.
4. **Expert — the Quotient Rule is a special case of the Product Rule plus the Chain Rule applied to $g^{-1}$.** $(f\cdot g^{-1})'=f'g^{-1}+f(-g^{-2}g')=\frac{f'}{g}-\frac{fg'}{g^2}=\frac{f'g-fg'}{g^2}$ — deriving the formula rather than merely applying it. *Shelf life*: permanent.

## Why Students Fail
The dominant failure is a straightforward labeling error: the formula's abstract $f$ and $g$ don't visually anchor to "which one is on top" the way the concrete fraction itself does, so a learner assigns the denominator's expression to $f$ and the numerator's to $g$ (or vice versa) before substituting, producing an entirely different, algebraically wrong result (MC-1, NUMERATOR-AND-DENOMINATOR-SWAPPED-AS-F-AND-G). A second, distinct failure comes directly from the Product Rule's own recently-learned order-INDEPENDENCE: having just internalized that $f'g+fg'=fg'+f'g$ (true, since addition commutes), a learner carries that same order-flexibility into the Quotient Rule's numerator, writing $fg'-f'g$ instead of the required $f'g-fg'$ — an overgeneralization of the sibling rule's genuine commutativity into a setting (subtraction) where it does not hold, producing the exact negative of the correct derivative (MC-2, QUOTIENT-RULE-SUBTRACTION-ORDER-REVERSED).

## Misconceptions
Reused by reference from the Blueprint's Component 6 registry (MC-1, MC-2) and its Protocol B repair actions B01–B02. **The Blueprint's Misconception Registry carries a Severity column (both "Foundational") but no explicit birth-type column**; both classifications below are independently assigned here.

- **MC-1 — NUMERATOR-AND-DENOMINATOR-SWAPPED-AS-F-AND-G** (the Blueprint's own "Foundational" misconception, shared severity with MC-2)
  - **Birth type**: Type 4, notation-induced. The formula's abstract letters $f$ and $g$ carry no visual anchor to "top" or "bottom" position, unlike the concrete fraction $\frac{f(x)}{g(x)}$ itself — the notation invites a labeling slip the moment the concrete fraction is abstracted into letters.
  - **Characteristic phrase**: assigning the denominator's expression to $f$ (treating it as the "first" function named) rather than the numerator.
  - **Detection probe** (verbatim, Blueprint's B01 P41): present Example 1 ($h(x)=x^2/(x+1)$) and check whether $f$/$g$ are correctly assigned as numerator/denominator.
  - **Repair**: Blueprint Repair Action B01 — explicitly re-label which expression sits on TOP (numerator, $f$) and BOTTOM (denominator, $g$) before substituting into the formula, every time.
  - **Verification of death**: given a fresh quotient, the learner writes "$f=$" and "$g=$" labels directly under the numerator and denominator respectively, before touching the formula.

- **MC-2 — QUOTIENT-RULE-SUBTRACTION-ORDER-REVERSED** (the Blueprint's own "Foundational" misconception)
  - **Birth type**: Type 1, overgeneralization of the Product Rule's own genuine order-independence (a true fact, since addition commutes) into the Quotient Rule's subtraction, where order genuinely matters.
  - **Characteristic phrase**: writing the numerator as $fg'-f'g$ instead of $f'g-fg'$.
  - **Detection probe** (verbatim, Blueprint's B02 P41): present Example 2 ($h(x)=\sin x/x$) and check whether the numerator's subtraction order is reversed.
  - **Repair**: Blueprint Repair Action B02 — re-derive using the fixed mnemonic "derivative of the TOP times the bottom, MINUS the top times the derivative of the BOTTOM," in that order, every time.
  - **Verification of death**: given a fresh quotient, the learner writes the numerator in the correct fixed order without hesitation, and can state why reversing it would flip the sign.

## Analogies
- **Best — a race with a head start, ordered by who finishes first.** "$A$ minus $B$" and "$B$ minus $A$" describe the same race from opposite perspectives — one gives the lead, the other gives the deficit, and they're exact negatives of each other. The Quotient Rule's numerator is exactly this kind of order-sensitive subtraction.
- **Alternative — a name tag that says "TOP" and "BOTTOM," not "$f$" and "$g$."** Physically labeling the numerator "TOP" and the denominator "BOTTOM" before ever writing $f$ or $g$ directly counters MC-1's abstraction-induced mislabeling.
- **ANTI-ANALOGY — "the Quotient Rule works just like the Product Rule, just with a minus sign somewhere."** This vague phrasing licenses MC-2 directly, since it doesn't specify WHERE the minus sign's order matters. Say "the Quotient Rule's numerator has a FIXED order because subtraction isn't symmetric — unlike the Product Rule's addition" instead.

## Demonstrations
- **The mislabeled-$f$-and-$g$ contrast.** Compute $h(x)=x^2/(x+1)$'s derivative correctly (labeling $f=x^2$, $g=x+1$), then recompute with the labels deliberately swapped. *Predict whether the swapped labels will give the same answer first.* Getting a different, wrong result is the demonstration for MC-1.
- **The order-reversal sign flip.** Compute $h(x)=\sin x/x$'s derivative in the correct order ($f'g-fg'$) and the reversed order ($fg'-f'g$) side by side. *Predict whether they'll be the same, opposite, or unrelated before computing.* Getting exact negatives of each other is the demonstration for MC-2.
- **The two-methods agreement.** Differentiate $h(x)=3/(x^2+1)$ via the Quotient Rule directly AND via rewriting as $3(x^2+1)^{-1}$ with the Chain Rule. *Predict which will take less work before computing both.* The identical answer via less effort is the demonstration motivating the Quotient Rule's own efficiency.

## Discovery Questions
Direct instruction is the argued call for the rule's formula itself (it directly extends the already-established Product Rule with a subtraction structure, rather than being independently rediscoverable at this level), but the order-sensitivity of the subtraction (MC-2) is genuinely discoverable by direct numeric comparison.
1. **Need** — "Compute the numerator of the Quotient Rule for $\sin x/x$ in the order $f'g-fg'$. Now compute it in the reversed order $fg'-f'g$. Are they the same?" They are exact negatives.
2. **Playground** — try the same reversed-order comparison on a couple more quotients.
3. **Invention** — "Why would reversing the order always give the negative, rather than some unrelated number?" Let the learner connect it to how subtraction, unlike addition, isn't symmetric.
4. **Collision** — confront a learner who reversed the order believing it wouldn't matter with the direct sign-flip evidence.
5. **Formalisation** — state the fixed order explicitly, with the mnemonic.
6. **Compression** — "Top's derivative times bottom, minus top times bottom's derivative — that order, every time."

## Teaching Sequence
The $f$/$g$ labeling discipline (MC-1) must be established FIRST, since the order-sensitivity issue (MC-2) is meaningless without first correctly identifying which expression is which — a learner who has mislabeled $f$ and $g$ cannot even meaningfully discuss "the correct order" yet. The order-sensitivity contrast (MC-2) should immediately follow, using the Product Rule's own already-known order-independence as the explicit point of comparison, per the Blueprint's own A02 — this concept's entire value depends on the learner noticing the CONTRAST with what they already know, not treating the Quotient Rule as an unrelated fresh formula. The efficiency comparison (A03, simplify-then-Product-Rule versus direct Quotient Rule) is introduced LAST, once both misconceptions are resolved, since it is a judgment call about EFFICIENCY rather than a correctness issue, and introducing it earlier risks conflating "which method is easier" with "which method is correct" as one confused question. Turn-level scripts for A01–A04 are owned by the Blueprint's Component 5 and are not restated here.

## Tutor Actions
- **DO: Worked Example** — the mislabeled-$f$-and-$g$ contrast on $h(x)=x^2/(x+1)$, with the learner labeling $f$ and $g$ explicitly before substituting. First action; anchors correct labeling concretely.
- **TEST-THINKING: Prediction** — "Will $fg'-f'g$ give the same answer as $f'g-fg'$?" asked BEFORE computing either, using the Product Rule's own known order-independence as the explicit point of contrast. Surfaces MC-2 in one turn.
- **DO: Demonstration** — the two-methods agreement (direct Quotient Rule vs. rewrite-and-Chain-Rule), run with the learner comparing effort as well as answers.
- **TEST-THINKING: Error Analysis** — "A student computed $\frac{d}{dx}\left[\frac{\sin x}{x}\right]$ with the numerator as $(\sin x)(1)-(\cos x)(x)$. What's wrong?" targets MC-2 directly.
- **Does NOT fit: introducing the Chain Rule's own full treatment here.** This concept uses the Chain Rule only as a comparison route (A03); the Chain Rule's own content is a separate concept, not to be taught in depth here.

## Voice Teaching Notes
The load-bearing sentence is "top's derivative times bottom, MINUS top times bottom's derivative — in that fixed order, every time." Say it every time the Quotient Rule is applied, not just the first. Listen for a learner who, given a quotient, hesitates or asks "which one is $f$ again?" — that specific hesitation is the tell for MC-1. Listen for a learner who writes the numerator's two terms in either order interchangeably, without treating the order as fixed — that casualness is the tell for MC-2. Channel reality is owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals
- **Mislabels which function is $f$ (numerator) and which is $g$ (denominator)** — MC-1. Route to the mislabeled-$f$-and-$g$ contrast, on the exact quotient in question.
- **Reverses the subtraction order in the numerator** — MC-2. Route to the order-reversal sign flip, on the exact quotient in question.
- **Labels $f$ and $g$ correctly and applies the fixed subtraction order fluently** — the intended target state.
- **Mastery trigger**: the Blueprint's A04 gate, MAMR 5/5 (⌈0.85×5⌉). The 4-item P77 set plus the P76 independence-mode transfer probe (an average-cost-function derivation, explicitly requiring an explanation of what goes wrong under the reversed order) must include at least one item requiring the learner to articulate WHY the order matters, not merely apply the formula correctly — a gate made only of correct-application items certifies mechanics without certifying the conceptual discrimination against MC-2.

## Tutor Recovery Strategy
The likely utterance here is "why does the order matter here, when it didn't matter for the Product Rule?" — a reasonable question given how recently the Product Rule's own flexibility was learned. The concept-specific smaller question returns to simple arithmetic: **"Is $5-3$ the same as $3-5$? Now is $5+3$ the same as $3+5$?"** The learner confirms addition is symmetric but subtraction isn't, on ground they already own from basic arithmetic. Then return: "the Product Rule's formula uses addition — order-free. The Quotient Rule's numerator uses subtraction — order matters, for the exact same reason $5-3\ne3-5$." If the frustration is instead about labeling $f$ and $g$, shrink to the bare check: **"Point to the TOP of the fraction. Point to the BOTTOM. Now write $f=$ under the top and $g=$ under the bottom."** Generic machinery is owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks
- Concept type: **procedure with two embedded precision requirements** (correct labeling and fixed order are both procedural precision points, not conceptual judgments). Review by *requiring the learner to write out the $f=$/$g=$ labels and the correctly-ordered numerator EXPLICITLY*, never accepting a bare final answer, since skipping the visible labeling/ordering step lets both MC-1 and MC-2 pass undetected even when the final numeric answer happens to be right (e.g. on a symmetric quotient where the order doesn't visibly matter).
- Concept-specific deviation: keep at least one quotient where reversing the order would produce a VISIBLY different (not just sign-flipped-but-coincidentally-equal) answer permanently in the review rotation.
- Interleaving partners: `math.calc.product-rule` (the discriminating partner for MC-2 — reviewing the Product Rule's own order-independence alongside this concept's order-DEPENDENCE keeps the contrast alive) and the upcoming Chain Rule, which this concept's own A03 already previews as an alternative (if less efficient) route.

## Transfer Connections
- **Near**: the Chain Rule (a direct sibling, needed for the rewrite-based derivation of this concept's own formula, and for differentiating quotients whose factors are themselves composite).
- **Far**: the general Leibniz-rule family (product and quotient rules for higher-order derivatives, met in more advanced treatments), which extends this concept's own two-term structure.
- **Real-world**: the Blueprint's own transfer probe — average cost per unit as total cost divided by quantity — is a direct, literal economics application, not a metaphor.
- **Expert transfer**: recognizing when an operation's ORDER-SENSITIVITY (subtraction, division, matrix multiplication, function composition) demands a fixed convention, versus when an operation's order-independence (addition, multiplication of numbers) permits flexibility — the same discriminating habit recurs across mathematics.

## Cross-Subject Connections
- **Economics**, genuine and central: the Blueprint's own transfer probe (average cost as total cost over quantity, differentiated to find how average cost changes) is a standard, literal application of the Quotient Rule in economic analysis.
- **Physics**, real: rate quantities expressed as one changing quantity divided by another (e.g. density as mass over volume, both potentially varying) are differentiated via this exact rule.
- **Engineering**, real: efficiency ratios (output over input, both varying) analyzed for their own rate of change use the Quotient Rule directly.
- The KG records `cross_links: []`, and no strong cross-subject KG omission is flagged here — the economics connection, while genuine and central to this concept's own transfer probe, is an application rather than a structural KG dependency.

## Blueprint References
`docs/curriculum/blueprints/math.calc.quotient-rule.md`. Reused by reference, not restated: the Component 1 Learning Objectives, the Component 4 Worked Examples (Example 1 the labeling basics, Example 2 the order-sensitivity contrast, Example 3 the two-methods efficiency comparison), the Component 5 teaching actions (A01 P64 conceptual shift, A02 P06 contrast pair, A03 P11 representation shift, A04 P91 mastery gate at MAMR 5/5), the Component 6 Misconception Registry (MC-1, MC-2) and repair actions (B01, B02), the P77 four-item problem set, and the P76 independence-mode transfer probe (the average-cost-function derivation). This entry adds independent birth-type classification for both misconceptions (the Blueprint marks severities but assigns no birth type), the mental-model ladder, the anti-analogy, and the argued direct-instruction-for-the-formula / guided-discovery-for-the-order-sensitivity split.

## Runtime Asset References
No seeded `AssetIdentity` records exist for this concept. None were created here.

## Curriculum Feedback
No Blueprint/KG metadata discrepancy was found for this concept — the Blueprint's stated unlocks (none) and cross_links (none) match the live KG's own fields exactly, confirmed by direct query. Recorded as a positive finding, continuing the pattern begun in Batch 38 — this batch's fifth consecutive zero-discrepancy entry.

## Version History
- v1.0 (2026-09-12): Initial authoring. Mathematics Educational Brain completion campaign, math.calc Wave (Batch 41).
