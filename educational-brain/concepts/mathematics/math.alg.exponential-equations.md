# math.alg.exponential-equations

## Identity
- **KG ID**: `math.alg.exponential-equations`
- **Domain**: math.alg (Algebra)
- **Requires**:
  - `math.alg.exponential-function` — load-bearing part: this concept solves equations where the
    variable sits inside the exponent of a function of the form $a^x$; without the exponential
    function's own already-secured definition and one-to-one property, neither solution strategy
    below (same-base or logarithm) has a foundation to stand on.
- **Unlocks**: none recorded in the KG (see Curriculum Feedback below for a genuine
  requires/unlocks asymmetry involving this concept and `math.alg.logarithm`)
- **Cross-links**: none declared in the KG
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.80 (MAMR = ⌈0.80×5⌉ = 4/5)
- **Estimated hours**: 5
- **Blueprint**: `docs/curriculum/blueprints/math.alg.exponential-equations.md` (reused by
  reference throughout)
- **KG note**: the KG description states both solution strategies precisely — "solved using
  logarithms or by expressing both sides as powers of the same base" — matching the Blueprint's
  own LO1/LO2 split exactly, with LO3 (recognizing WHICH strategy applies) as the concept's real
  judgment-based content.

## Learning Objective
- The learner can solve an exponential equation by expressing BOTH SIDES as powers of the SAME
  base, then equating the exponents directly — the SAME-BASE method.
- The learner can solve an exponential equation that does NOT have a convenient common base by
  taking the LOGARITHM of both sides and applying the power rule to bring the exponent down as a
  multiplicative factor.
- The learner can recognize WHEN the same-base method is applicable (both sides can genuinely be
  rewritten as powers of one common base) versus when logarithms are genuinely necessary —
  choosing the right strategy rather than defaulting to one method regardless of fit.

## Core Understanding
An **exponential equation** has the unknown variable appearing in an EXPONENT. Two solution
strategies apply, and the concept's real content is knowing which to reach for.

**Same-base method**: if both sides can be rewritten as powers of the SAME base, e.g.
$a^{f(x)}=a^{g(x)}$, then — since $a^x$ is one-to-one for $a>0, a\ne1$ (a distinct input can never
produce the same output as a different input) — the EXPONENTS themselves must be equal:
$f(x)=g(x)$, reducing the problem to a simpler equation solvable by already-known techniques. This
method only works when a genuine common base can be found; it cannot be forced onto a case where
no such rewriting exists.

**Logarithm method**: when no convenient common base exists, take the LOGARITHM of both sides (any
consistent base works, commonly base 10 or $e$), using the power rule $\log(a^x)=x\log a$ to bring
the exponent DOWN as a multiplicative factor on the side it actually belongs to, then solve
algebraically for $x$ as an ordinary linear equation in $x$.

The deciding judgment (LO3) is whether the two sides genuinely share a common base after
rewriting — the same-base method is the SIMPLER technique and should be tried first, but forcing
it onto a case with no clean common base (e.g. $3^x=20$, where 20 is not a power of 3) produces
either a premature abandonment or an invalid approximation; recognizing this failure early and
switching to logarithms is exactly what this method-selection skill requires.

## Mental Models
1. **Beginner — an exponential equation is solved by "moving the exponent down somehow," without
   a clear, reliable procedure for either strategy.** *Upgrade trigger*: being given a clean
   same-base case (like $2^{x+1}=8$) and asked to solve it step by step — revealing whether the
   rewrite-to-common-base-then-equate-exponents procedure, or something less systematic, is being
   applied. *Shelf life*: brief once the same-base method is demonstrated concretely.
2. **Intermediate — reliably applies the same-base method when a common base is obvious, but
   either gets stuck or forces an invalid rewrite when no clean common base exists, rather than
   recognizing this as the specific signal to switch to logarithms.** *Upgrade trigger*: being
   presented with an equation like $3^x=20$ and asked to solve it — revealing whether the
   learner correctly identifies the absence of a clean common base as the trigger for the
   logarithm method, or attempts to force the same-base approach regardless. *Shelf life*:
   persists until directly confronted with a genuinely non-common-base scenario, since practice
   sets are often segregated by method.
3. **Advanced — correctly diagnoses, for any exponential equation, whether a common base exists
   before choosing a method, and applies the logarithm method's power-rule step correctly,
   bringing the exponent down on the correct side.** *Upgrade trigger*: the Blueprint's own P76
   transfer probe (a bacteria-growth model requiring both the method-selection judgment and an
   explicit account of how the power rule operates on a compound exponent like $t/3$) — testing
   whether the method-selection skill and the power-rule mechanics both transfer to a realistic,
   less-clean scenario. *Shelf life*: durable once the diagnostic check (common base or not) is
   applied as a genuine first step rather than a guess.
4. **Expert — recognizes that the same-base method is really a special case of the logarithm
   method (taking $\log_a$ of both sides of $a^{f(x)}=a^{g(x)}$ directly gives $f(x)=g(x)$ with no
   further work, since $\log_a(a^n)=n$), so the two strategies are not fundamentally different
   techniques but the same underlying logarithmic reasoning, with the same-base case simply
   collapsing to a shortcut.** *Shelf life*: permanent, and this unifying view directly reuses
   `math.alg.logarithm`'s own inverse-function framing of $\log_a(a^n)=n$.

## Why Students Fail
The single most consequential failure, ranked foundational per the Blueprint's own registry, is
MC-1: attempting to force the same-base method when no clean common base actually exists between
the two sides, rather than recognizing this as exactly the scenario logarithms exist to handle — a
learner with this misconception either abandons the problem prematurely or makes an invalid
approximate substitution. The second failure, also foundational, is MC-2: misapplying the
logarithm power rule $\log(a^x)=x\log a$ — for instance distributing the exponent to BOTH sides'
bases incorrectly, or computing $\log(3^x)$ as $3\log x$ (swapping which quantity the exponent
multiplies) instead of the correct $x\log3$ — a genuine misunderstanding of the mechanism that
makes the entire logarithm method work, not a minor arithmetic slip. The third failure, MC-3
(moderate), is not verifying a found solution by substituting back into the original exponential
equation, missing a possible arithmetic error made along the way.

## Misconceptions
Reused by reference from the Blueprint's Component 6 registry (MC-1..MC-3), with birth-type
classification added.

- **MC-1 — SAME-BASE-METHOD-FORCED-WITHOUT-A-GENUINE-COMMON-BASE** (foundational)
  - **Birth type**: Type 1, overgeneralization — the same-base method, learned and successfully
    applied first (since it is the simpler technique and typically introduced before logarithms),
    over-generalizes into "this is how exponential equations are solved," without the learner
    checking, each time, whether a genuine common base actually exists in the specific equation
    at hand.
  - **Characteristic phrase**: attempting to force $3^x=20$ into same-base form, either abandoning
    the problem or substituting an invalid approximate rewrite for 20.
  - **Detection probe** (verbatim, Blueprint): present $3^x=20$ and check whether a forced/invalid
    same-base attempt is made.
  - **Repair**: Blueprint Repair Action B01 — explicitly test whether the target number is a
    clean power of the given base BEFORE attempting the same-base method, switching to logarithms
    when it isn't.
  - **Verification of death**: given a new equation, the learner first checks for a genuine
    common base and correctly switches to the logarithm method when none exists, without
    attempting a forced rewrite.

- **MC-2 — LOGARITHM-POWER-RULE-MISAPPLIED** (foundational — ranked most severe per the
  Blueprint's own Teaching Notes, "the single mechanism making the logarithm method work at all")
  - **Birth type**: Type 4, notation-induced — the power rule $\log(a^x)=x\log a$ requires
    tracking precisely WHICH quantity the exponent belongs to and moving it correctly, and the
    compact notation invites misapplications like distributing the exponent to the wrong term or
    swapping which factor it multiplies.
  - **Characteristic phrase**: writing $x\log3=x\log20$ (incorrectly distributing the exponent to
    both sides) or computing $\log(3^x)$ as $3\log x$ (swapping which quantity the exponent
    multiplies) instead of the correct $x\log3$.
  - **Detection probe** (verbatim, Blueprint): present Example 3 ($3^x=20$ solved via logarithms)
    and check whether $x\log3=\log20$ or a flawed variant is produced.
  - **Repair**: Blueprint Repair Action B02 — re-derive the power rule application step by step,
    explicitly identifying which side's exponent is being brought down.
  - **Verification of death**: given a new logarithm-method equation, the learner applies the
    power rule correctly on the first attempt, bringing the exponent down as a multiplier on the
    correct side only.

- **MC-3 — EXPONENTIAL-EQUATION-SOLUTION-LEFT-UNCHECKED** (moderate)
  - **Birth type**: Type 1, overgeneralization — treating the algebraic solving process itself as
    sufficient confirmation of correctness, the same way a learner might trust a simpler linear
    equation's solution without checking, over-generalizing that habit onto a more
    error-prone multi-step process (logarithm evaluation, power-rule application) where a slip is
    more likely and less obvious.
  - **Characteristic phrase**: presenting a final numeric answer with no substitution back into
    the original equation to confirm it.
  - **Detection probe** (verbatim, Blueprint): review a submitted solution for a missing
    verification step.
  - **Repair**: Blueprint Repair Action B03 — re-substitute the found value back into the original
    equation, confirming both sides approximately match.
  - **Verification of death**: the learner routinely substitutes a found solution back into the
    original equation as a final step, without being prompted to do so.

## Analogies
- **Translating between two languages, versus giving up when no direct word exists.** The
  same-base method is like finding that a word translates DIRECTLY, one-to-one, into another
  language — quick and exact when it works. When no direct translation exists, giving up (or
  guessing) is not the answer — instead, a skilled translator uses a DIFFERENT technique
  (paraphrase, context) to convey the same meaning. The logarithm method is that fallback
  technique: it always works, even when the "direct translation" (common base) doesn't exist.
  *Where it holds*: the "a simpler direct method sometimes doesn't apply, and that's the signal to
  switch approaches, not to force it or give up" structure, directly targeting MC-1. *Where it
  breaks*: language translation doesn't have a clean mathematical analogue for the power RULE
  itself — the mechanics of the logarithm method must be taught via its own worked demonstration,
  not inferred from this analogy.
- **A zoom lens bringing a small detail (the exponent) into full view.** The logarithm power rule
  "zooms in" on the exponent and brings it down to ordinary, algebra-solvable size — the exponent
  was always THERE, controlling the equation's behavior, but hidden inside the exponentiation;
  taking the logarithm makes it directly visible and workable. *Where it holds*: conveys the power
  rule's PURPOSE (revealing the hidden exponent) vividly. *Where it breaks*: a zoom lens doesn't
  convey WHICH side's exponent gets revealed or how the multiplication structure works — that
  precision must come from the actual worked demonstration, not the analogy.

## Demonstrations
1. **The same-base method, directly supporting LO1.** Solve $2^{x+1}=8$. Rewrite $8=2^3$:
   $2^{x+1}=2^3$. Since the bases match, equate exponents: $x+1=3 \Rightarrow x=2$.
2. **Recognizing when same-base doesn't apply, directly confronting MC-1.** Solve $3^x=20$. Since
   20 is NOT a clean power of 3 (no integer or simple fraction $k$ gives $3^k=20$), the same-base
   method doesn't directly apply — logarithms are needed instead. This is exactly the scenario
   logarithms exist to handle, not a dead end.
3. **The logarithm method with correct power-rule application, directly confronting MC-2.** Solve
   $3^x=20$ using logarithms. Take $\log$ of both sides: $\log(3^x)=\log(20)$. Apply the power
   rule correctly: $x\log3=\log20$ (the exponent $x$ multiplies the LOG OF THE BASE it actually
   belonged to). Solve: $x=\frac{\log20}{\log3}\approx\frac{1.301}{0.477}\approx2.727$.

## Discovery Questions
- "Can $20$ be written as $3$ raised to some clean power? Try a few values." — surfaces MC-1 by
  having the learner discover the absence of a common base directly, rather than being told.
- "After taking $\log$ of both sides of $3^x=20$, where exactly does the $x$ go — does it
  multiply $\log3$, or $\log20$, or something else?" — surfaces MC-2 by forcing explicit
  attention to which term the power rule acts on.
- "You solved for $x$ — how could you CHECK that your answer is actually correct, using only the
  original equation?" — surfaces MC-3 by inviting the verification habit directly.

## Teaching Sequence
1. **Anchor**: connect explicitly to `math.alg.exponential-function`'s already-secured definition
   and one-to-one property — state plainly that the same-base method relies directly on that
   one-to-one property to justify equating exponents.
2. **Establish the same-base method concretely** (Demonstration 1), directly supporting LO1.
3. **Confront the "no clean common base" case directly** (Demonstration 2), directly pre-empting
   MC-1, framing it as the SIGNAL to switch methods rather than a failure of the same-base
   approach.
4. **Work the logarithm method with careful attention to the power rule** (Demonstration 3),
   directly pre-empting MC-2, explicitly narrating which side's exponent is being brought down.
5. **Practice mixed problems** deliberately requiring the method-selection judgment (LO3), correct
   execution of either method, and solution verification (pre-empting MC-3) to each be produced
   without prompting which is needed.
6. **Bridge forward**: name explicitly that `math.alg.logarithmic-equations` (a sibling concept
   also unlocked from `math.alg.logarithm`) is the companion equation type — where the unknown
   appears INSIDE a logarithm rather than in an exponent — and that `math.alg.change-of-base` will
   be needed for logarithm computations in bases not directly available on a calculator.

## Tutor Actions
- Before accepting a same-base rewrite, ask "is this ACTUALLY a power of the target base, or are
  you forcing it?" — targeting MC-1 directly.
- Before accepting a power-rule application, ask the learner to state explicitly which quantity
  the exponent is multiplying — targeting MC-2 directly.
- Before accepting a final answer, ask "how would you check this?" — targeting MC-3 directly, as a
  standing habit rather than an occasional reminder.
- Never let a same-base attempt proceed on an unverified rewrite — always confirm the proposed
  common base genuinely produces the target value when raised to the proposed exponent.

## Voice Teaching Notes
- When checking for a common base aloud, test explicitly and audibly: "is 20 a power of 3? Three
  to the what... no clean match — so we switch methods" — targeting MC-1.
- When applying the power rule aloud, narrate which side is being acted on: "the exponent belongs
  to THIS side — so it multiplies THIS log" — targeting MC-2.
- When finishing a solution aloud, always add the verification step as a spoken habit: "now let's
  check — does this actually work in the original equation?" — targeting MC-3.

## Assessment Signals
- **Correct + fast + correctly diagnoses same-base-versus-logarithm unprompted, applies the power
  rule without error, verifies the final solution as a routine step** → MASTERED.
- **Forces an invalid same-base rewrite when no common base exists** → MC-1 active; needs the
  common-base-check repair.
- **Misapplies the power rule (wrong side, or swapped multiplication)** → MC-2 active; needs the
  step-by-step power-rule repair.
- **Presents a final answer with no verification** → MC-3 active; needs the
  substitute-back-in repair.
- **Cannot evaluate the exponential function itself, or cannot state its one-to-one property** →
  prerequisite gap in `math.alg.exponential-function`, not specific to this concept's own content;
  route back accordingly.

## Tutor Recovery Strategy
If a learner has just had MC-1 corrected and reacts with "but the same-base method worked every
time before" — validate this directly: the method genuinely IS reliable whenever a common base
exists, and the learner's confidence in it is well-earned from correct prior use. Frame the
correction as "you're applying a method that works perfectly — the only new step is checking
FIRST whether it applies here, before diving in," not as a correction of a flawed technique. If
MC-2 persists after one correction, avoid re-stating the power rule abstractly again — instead
have the learner apply it to several DIFFERENT equations in a row, each time explicitly naming
which side's exponent is being moved, so the correct pattern becomes a practiced motion rather
than a rule to recall.

## Memory Hooks
- "Real common base, or forced one? Check before you commit." — directly targeting MC-1.
- "The exponent multiplies the log of ITS OWN base — never the other side." — directly targeting
  MC-2.
- "Solved it? Now prove it — plug it back in." — directly targeting MC-3.

## Transfer Connections
- **`math.alg.exponential-function`** (prerequisite, reused): supplies the one-to-one property
  the same-base method directly relies on, and the general function structure both solution
  strategies operate on.
- **`math.alg.logarithm`** (related, not a KG-declared requirement of this concept, per the
  discrepancy recorded in Curriculum Feedback below): supplies the power rule and inverse-function
  reasoning this concept's logarithm method directly reuses.
- **`math.alg.logarithmic-equations`** (sibling concept, both unlocked from `math.alg.logarithm`):
  the companion equation type where the unknown appears inside a logarithm rather than in an
  exponent.
- **`math.alg.change-of-base`** (a further sibling concept, per the Blueprint's own Component 7
  "Related" field): needed for logarithm computations in bases not directly available, a
  practical extension of this concept's own logarithm-method technique.

## Cross-Subject Connections
- **Biology/microbiology** (the Blueprint's own P76 transfer probe): a bacteria population
  modeled by $P(t)=P_0\times2^{t/3}$, doubling every 3 hours, gives a realistic scientific
  modeling scenario where determining "when will the population reach 10 times its initial size"
  requires solving a genuine exponential equation with no clean common base — directly grounding
  the method-selection judgment (MC-1) in a practical stake.
- **Finance**: compound-interest and investment-growth problems ("when will this investment
  double?") are structurally identical exponential equations, typically requiring the logarithm
  method since round-number growth targets rarely align with a clean common base.

## Blueprint References
- `docs/curriculum/blueprints/math.alg.exponential-equations.md` — Component 0 (metadata:
  difficulty proficient, bloom apply, mastery_threshold 0.80, estimated_hours 5, requires
  [math.alg.exponential-function], no unlocks, no cross_links); Component 6 (Misconception
  Registry MC-1..MC-3, reused above with birth-type classification added); Component 4 (worked
  examples for the same-base method, the no-common-base recognition case, and the logarithm
  method's power-rule application, reused directly in the Demonstrations above); the P76 transfer
  probe (a bacteria-growth scenario requiring method-selection judgment and an explicit account of
  the power rule's mechanics on a compound exponent, independence mode) — held in the Blueprint's
  own mastery-gate item bank, not restated here per the Standard's ownership boundary.

## Runtime Asset References
- No AssetIdentity rows exist yet for this concept (mathematics EB authoring is ahead of the
  AssetIdentity seeding campaign for math.alg — see CLAUDE.md's "Mathematics Educational Brain
  serving-asset campaign" section for the seeding mechanism this concept will use once authored
  content is selected for transcription).

## Curriculum Feedback
- **Genuine requires/unlocks asymmetry found and resolved by following the KG's `requires` field
  as authoritative for this program's own frontier computation, per established convention**: this
  concept's own KG `unlocks` field lists `math.alg.logarithm` (implying exponential-equations is a
  prerequisite for logarithm), yet `math.alg.logarithm`'s own KG `requires` field lists ONLY
  `math.alg.exponential-function` — NOT this concept. This program's frontier computation
  correctly used `requires` (not `unlocks`) throughout, so this asymmetry did not cause any
  concept to be authored out of order; it is recorded here, and cross-referenced from
  `math.alg.logarithm`'s own Curriculum Feedback (authored earlier in this same batch), as a
  standing note for a future KG-maintenance pass, not fixed (no KG file modified by this program).
- No genuine content-overlap was found between this Blueprint and any already-authored mathematics
  sibling entry.

## Version History
- 2026-09-11 — Initial authoring (Batch 16 / math.alg-unblocking cross-domain excursion continued,
  part 2 of 3, of the Mathematics Educational Brain completion campaign). Blueprint reused by
  reference in full. No KG or Blueprint file modified.
