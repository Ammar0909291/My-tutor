# math.alg.rational-inequality

## Identity
- **KG ID**: `math.alg.rational-inequality`
- **Domain**: math.alg (Algebra)
- **Requires**:
  - `math.alg.rational-expressions` — load-bearing part: this concept's very subject matter (a
    ratio of polynomials) and its domain-restriction awareness (denominator zeros are excluded)
    are both direct extensions of that concept's own already-secured content.
  - `math.alg.polynomial-inequality` — load-bearing part: the entire sign-chart procedure (find
    critical points, test a representative value in each interval, determine the sign there) is
    reused UNCHANGED from that concept; this concept's genuinely new content is specifically about
    WHERE the critical points come from (now two sources, not one) and how endpoint inclusion
    differs between them.
- **Unlocks**: none in the KG
- **Cross-links**: none declared in the KG
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.75 (MAMR = ⌈0.75×5⌉ = 4/5)
- **Estimated hours**: 6
- **Blueprint**: `docs/curriculum/blueprints/math.alg.rational-inequality.md` (reused by reference
  throughout)
- **KG note**: the KG description states the form precisely — "$p(x)/q(x)>0$ (with $q\ne0$); solved
  using a sign chart based on zeros of $p$ AND $q$" — the explicit inclusion of $q$'s zeros as
  critical points, alongside $p$'s, is this concept's central extension of the already-authored
  polynomial-inequality technique, and its own Curriculum Feedback section below fulfills the
  forward-work note left in that entry's own Transfer Connections and Curriculum Feedback sections.

## Learning Objective
- The learner can solve a rational inequality $p(x)/q(x)>0$ (or $<,\ge,\le$) by finding the zeros
  of BOTH the numerator $p(x)$ AND the denominator $q(x)$, and constructing a sign chart using ALL
  of these as critical points.
- The learner can correctly determine endpoint inclusion by SOURCE: a numerator zero may be
  included when the inequality is non-strict ($\le,\ge$), following the same rule as ordinary
  polynomial inequalities; a denominator zero is ALWAYS excluded, regardless of the inequality's
  strictness, because the expression is undefined there.
- The learner can explain why a rational inequality generally CANNOT be solved by directly
  cross-multiplying the denominator to the other side (as with an equation), since the
  denominator's sign is unknown (it depends on $x$) and multiplying by a negative quantity would
  need to flip the inequality's direction.

## Core Understanding
A rational inequality $p(x)/q(x)>0$ (or $<,\ge,\le$) is solved by the SAME sign-chart procedure
already secured in `math.alg.polynomial-inequality` — find critical points, test a representative
value in each resulting interval, and record the sign of the expression there — but with ONE
genuinely new complication: critical points now come from TWO sources, not one. The zeros of the
numerator $p(x)$ behave exactly as before (the expression equals zero there, so a non-strict
inequality includes that point). The zeros of the denominator $q(x)$ are a new kind of critical
point: the expression is UNDEFINED there, not zero, so these points are excluded from the solution
set UNCONDITIONALLY — no strictness of the inequality symbol can ever include a point where the
expression simply doesn't exist.

The second genuinely new complication is that a rational inequality cannot generally be solved by
the equation-solving instinct of cross-multiplying the denominator across. Multiplying BOTH SIDES
of an inequality by a NEGATIVE quantity flips its direction — and since $q(x)$'s sign depends on
$x$ (it may be positive for some $x$ and negative for others within the very domain being solved
over), there is no single, safe direction to apply the flip in advance. The reliable fix is to move
everything to ONE side first (so the inequality reads "[rational expression] $>0$"), combine into a
single fraction, and THEN apply the sign-chart method to the whole expression — never
cross-multiplying a variable, sign-unknown denominator directly.

## Mental Models
1. **Beginner — a rational inequality is solved the same way as a polynomial inequality, using
   only the numerator's zeros as critical points.** This model works correctly on the FRACTION'S
   VALUE at each test point, since dividing doesn't change a sign-testing procedure's basic
   mechanics — but it silently omits the denominator's zeros as critical points, and so produces an
   incomplete or wrong sign chart the moment the denominator actually changes sign somewhere in the
   domain. *Upgrade trigger*: being asked to solve an inequality where the denominator has a real
   zero inside the relevant interval — revealing whether that zero was noticed as a required
   critical point. *Shelf life*: brief — the omission surfaces on the very first example with a
   denominator zero inside the tested range.
2. **Intermediate — correctly finds critical points from both numerator and denominator, but treats
   endpoint inclusion uniformly (governed only by the inequality's strictness symbol), without
   distinguishing which SOURCE a critical point came from.** This model gets Example 1's strict
   case right by coincidence (both endpoints excluded there for different valid reasons) but fails
   the moment a non-strict inequality is paired with a denominator zero. *Upgrade trigger*: being
   asked to solve a NON-STRICT rational inequality whose critical points include a denominator
   zero — revealing whether that specific zero is (wrongly) included along with the numerator zero,
   or correctly excluded regardless of the symbol. *Shelf life*: persists until directly
   confronted with this exact combination.
3. **Advanced — correctly separates critical points by source (numerator zeros follow the
   inequality's strictness; denominator zeros are always excluded), and never cross-multiplies a
   variable-sign denominator directly, always moving everything to one side first.** *Upgrade
   trigger*: encountering an applied scenario (the Blueprint's own chemistry-concentration transfer
   probe) requiring the full procedure to be executed and the cross-multiplication trap to be
   explained, not just avoided by instinct. *Shelf life*: durable once both the source-dependent
   endpoint rule and the cross-multiplication danger are internalized as SEPARATE, independently
   justified rules rather than a single memorized recipe.
4. **Expert — recognizes that a denominator zero's unconditional exclusion and the
   cross-multiplication danger are the SAME underlying fact viewed two ways: the denominator's sign
   is not fixed across the domain, so neither "is this point in the solution set" nor "does
   multiplying by this flip the inequality" can be answered without first localizing where the
   denominator is positive, negative, or undefined — which the sign chart itself is what
   determines.** *Shelf life*: permanent, and this unifying view makes both of the concept's two
   new complications feel like one coherent idea rather than two unrelated rules to memorize.

## Why Students Fail
The single most frequent failure, ranked foundational (matching the Blueprint's own registry), is
MC-3: constructing a sign chart using only the numerator's zeros as critical points, missing the
denominator's zeros entirely — the most basic omission, since it means the sign chart itself is
incomplete before any endpoint-inclusion question even arises. The second failure, also ranked
foundational, is MC-1: including a denominator zero as a valid solution point for a non-strict
inequality, over-applying the correct rule ("non-strict inequalities include their zero endpoints")
without checking WHICH kind of zero is in question — a numerator zero making the expression equal
zero, versus a denominator zero making it undefined, a genuinely different situation the
non-strict-symbol rule was never meant to cover. The third failure, also foundational, is MC-2:
cross-multiplying a rational inequality by its denominator directly, exactly as one would with an
equation, ignoring that the denominator's SIGN is unknown across the domain and so the
inequality's direction cannot be safely determined in advance.

## Misconceptions
Reused by reference from the Blueprint's Component 6 registry (MC-1..MC-3), with birth-type
classification added.

- **MC-1 — DENOMINATOR-ZERO-INCLUDED-FOR-NON-STRICT-INEQUALITY** (foundational)
  - **Birth type**: Type 1, overgeneralization — the correct rule "a non-strict inequality includes
    its zero endpoints" (secured in `math.alg.polynomial-inequality`, where every critical point IS
    a genuine zero of the expression) is applied uniformly to EVERY critical point in a rational
    inequality, without noticing that a denominator zero is a fundamentally different kind of
    point — one where the expression is undefined, not zero — that the original rule was never
    designed to cover.
  - **Characteristic phrase**: including a denominator's zero in the solution set for $\ge$ or
    $\le$, reasoning "the inequality is non-strict, so the endpoint counts."
  - **Detection probe** (verbatim, Blueprint): present Example 2 (solve $(x-3)/(x+2)\ge0$) and
    check whether $x=-2$ is incorrectly included alongside the correctly-included $x=3$.
  - **Repair**: Blueprint Repair Action B01 — re-check that the expression is genuinely UNDEFINED
    (not just zero) at the denominator's zero, confirming it can never satisfy any inequality.
  - **Verification of death**: given a non-strict rational inequality with a denominator zero among
    its critical points, the learner correctly excludes that specific point while correctly
    including any qualifying numerator zero, and can state in one sentence why the two cases
    differ.

- **MC-2 — RATIONAL-INEQUALITY-CROSS-MULTIPLIED-DIRECTLY** (foundational)
  - **Birth type**: Type 1, overgeneralization — cross-multiplication is a safe, standard,
    well-practiced move for solving rational EQUATIONS; that procedural habit over-generalizes
    directly to rational INEQUALITIES, where it is unsafe precisely because equations have no
    "direction" that a sign flip could corrupt, while inequalities do.
  - **Characteristic phrase**: writing "$x+1>x-2$" (or similar) directly from
    "$(x+1)/(x-2)>1$" without first checking or accounting for the denominator's sign.
  - **Detection probe** (verbatim, Blueprint): present Example 3 (solve $(x+1)/(x-2)>1$) and check
    whether direct cross-multiplication is attempted.
  - **Repair**: Blueprint Repair Action B02 — re-derive using the move-to-one-side approach,
    comparing the (wrong) cross-multiplied result against the (correct) sign-chart result to show
    the discrepancy directly.
  - **Verification of death**: given a rational inequality in the form
    "[expression]/[expression] $>$ [nonzero value]," the learner moves everything to one side and
    combines into a single fraction BEFORE applying the sign chart, without attempting direct
    cross-multiplication.

- **MC-3 — SIGN-CHART-CRITICAL-POINTS-MISSING-DENOMINATOR-ZEROS** (foundational)
  - **Birth type**: Type 5, instruction-induced — the sign-chart procedure was first learned and
    heavily practiced in `math.alg.polynomial-inequality`, where EVERY critical point comes from a
    single polynomial's zeros; that procedural pattern (find zeros of "the expression," treated as
    one undifferentiated source) carries over directly, without the new step of separately checking
    the denominator being explicitly triggered.
  - **Characteristic phrase**: constructing a sign chart for $p(x)/q(x)$ using only the roots of
    $p(x)=0$, with no separate check of $q(x)=0$.
  - **Detection probe** (verbatim, Blueprint): review a submitted sign chart for missing
    denominator-zero critical points.
  - **Repair**: Blueprint Repair Action B03 — re-derive the full critical-point list explicitly,
    checking BOTH $p(x)=0$ and $q(x)=0$ separately before constructing the chart.
  - **Verification of death**: given any rational inequality, the learner's first step is
    explicitly finding the zeros of BOTH numerator and denominator, before constructing any sign
    chart.

## Analogies
- **A road with two different kinds of "stop here" signs.** A numerator zero is like a sign that
  says "the road is level here" (the inequality's value is exactly zero — whether that counts
  depends on whether "exactly zero" satisfies the inequality, i.e. its strictness). A denominator
  zero is like a sign that says "the road doesn't exist here" (a genuine gap, not a level spot) —
  no strictness rule about "does level count" could ever apply to a gap in the road itself.
  *Where it holds*: the "two visually similar markers meaning fundamentally different things"
  structure, directly targeting MC-1. *Where it breaks*: a road gap is a fixed physical fact,
  while whether a given $x$-value is a numerator or denominator zero depends on doing the algebra
  first — the analogy conveys the CONCEPTUAL distinction, not the procedural step of finding which
  is which, which must be taught via the actual worked examples.
- **Cross-multiplying an inequality with an unknown-sign denominator is like flipping a coin before
  knowing which side is "heads."** In an equation, cross-multiplication is safe because equality
  has no direction to flip. In an inequality, multiplying by a negative number flips the direction —
  and since the denominator's sign genuinely varies across the domain being solved over, committing
  to a direction (flip or don't flip) before knowing the sign is exactly like calling "heads" before
  the coin is even in the air. *Where it holds*: the "committing to an outcome before the
  determining fact is known" structure, directly targeting MC-2. *Where it breaks*: a coin flip is
  genuinely random and unknowable in advance; the denominator's sign is NOT random — it is fully
  determined by $x$, and the sign chart is precisely the tool that determines it region by region,
  which is why moving everything to one side and using the chart is the reliable fix, not mere
  caution.

## Demonstrations
1. **Constructing a sign chart from both sources, directly confronting MC-3.** Solve $(x-3)/(x+2)>0$.
   Critical points: numerator zero at $x=3$, denominator zero at $x=-2$ — BOTH found before testing
   any interval. Testing $x=-3$: $(-3-3)/(-3+2)=(-6)/(-1)=6>0$ ✓. Testing $x=0$:
   $(0-3)/(0+2)=(-3)/2<0$ ✗. Testing $x=4$: $(4-3)/(4+2)=1/6>0$ ✓. Solution:
   $(-\infty,-2)\cup(3,\infty)$ — with $x=-2$ excluded (denominator zero, undefined) and $x=3$
   excluded (strict inequality).
2. **Endpoint inclusion by source, directly confronting MC-1.** Solve the non-strict version of the
   same inequality, $(x-3)/(x+2)\ge0$, using the identical sign chart from Demonstration 1.
   Solution: $(-\infty,-2)\cup[3,\infty)$ — $x=3$ is NOW included (non-strict inequality, numerator
   zero), but $x=-2$ remains EXCLUDED regardless of the symbol change — the denominator zero can
   NEVER be included, no matter how the inequality's strictness changes.
3. **The cross-multiplication trap and its fix, directly confronting MC-2.** Solve $(x+1)/(x-2)>1$.
   A flawed direct cross-multiplication gives "$x+1>x-2$," simplifying to "$1>-2$" — always true,
   incorrectly suggesting every $x\ne2$ works. The correct approach moves everything to one side
   FIRST: $(x+1)/(x-2)-1>0 \Rightarrow (x+1-(x-2))/(x-2)>0 \Rightarrow 3/(x-2)>0$ — now a genuine
   rational inequality solvable by the sign-chart method: since the numerator (3) is always
   positive, this holds exactly when $x-2>0$, i.e. $x>2$ — a far more restrictive (and correct)
   answer than the flawed "always true" result.

## Discovery Questions
- "You have $(x+1)/(x-5)>0$. Before testing anything, what are ALL the points that could change
  this expression's sign — and where do they come from?" — surfaces MC-3 by requiring the learner
  to name both sources explicitly before any testing begins.
- "$(x-3)/(x+2)\ge0$ has critical points at $x=3$ and $x=-2$. The symbol is non-strict — does that
  mean BOTH points are included?" — surfaces MC-1 directly by testing whether the strictness rule
  is applied uniformly or source-dependently.
- "Can you solve $(x+1)/(x-2)>1$ by cross-multiplying, the same way you would solve
  $(x+1)/(x-2)=1$?" — surfaces MC-2 by inviting the equation-solving instinct and requiring the
  learner to explain why it does or doesn't transfer.

## Teaching Sequence
1. **Anchor**: connect explicitly to `math.alg.polynomial-inequality`'s already-secured sign-chart
   procedure and `math.alg.rational-expressions`'s domain-restriction awareness — state plainly
   that the sign-chart MECHANICS are unchanged; only the source of critical points and the
   endpoint-inclusion rule are new.
2. **Work the full two-source sign chart** (Demonstration 1), directly pre-empting MC-3, explicitly
   narrating "first, BOTH sets of zeros — then test."
3. **Contrast endpoint inclusion by source on the non-strict version of the same problem**
   (Demonstration 2), directly pre-empting MC-1, re-checking both endpoints explicitly rather than
   re-deriving from scratch.
4. **Expose the cross-multiplication trap and its fix side by side** (Demonstration 3), directly
   pre-empting MC-2, showing the flawed and correct approaches on the SAME problem so the
   discrepancy in their answers is directly visible.
5. **Practice mixed problems** deliberately requiring the two-source critical-point search, the
   source-dependent endpoint check, and the move-to-one-side approach (rather than
   cross-multiplication) to each be produced without prompting which step is needed.
6. **Bridge forward**: state explicitly that `math.alg.rational-equations` is the EQUATION
   counterpart, where cross-multiplication IS safe (after appropriate domain checks) — precisely
   because equations have no direction to flip, sharpening by contrast exactly why this concept's
   MC-2 danger is specific to inequalities.

## Tutor Actions
- Before accepting any sign chart for a rational inequality, ask "where did EACH critical point
  come from — numerator or denominator?" — targeting MC-3 directly.
- Before accepting a solution set including a denominator zero, ask "is the expression actually
  DEFINED at that point?" — targeting MC-1 directly, regardless of the inequality's strictness
  symbol.
- Before accepting any cross-multiplication step on a rational inequality, ask "do you know the
  sign of what you're multiplying by, for every $x$ in this problem?" — targeting MC-2 directly.
- Never accept "move to one side" as skippable once a cross-multiplication attempt is spotted —
  this is the concept's single most load-bearing procedural habit.

## Voice Teaching Notes
- When identifying critical points aloud, explicitly separate the two searches: "numerator zeros...
  now denominator zeros..." — the audible two-step structure reinforces that both sources must be
  checked, targeting MC-3.
- When checking endpoint inclusion aloud, name the SOURCE before applying the rule: "this one's
  from the denominator — so it's out, no matter what the inequality symbol says" — targeting MC-1.
- When narrating the cross-multiplication trap aloud, voice genuine hesitation before the flawed
  move: "I could cross-multiply here... but wait — do I know the sign of that denominator? No — so
  I won't" — the audible pause models the exact check a fluent solver performs internally,
  targeting MC-2.

## Assessment Signals
- **Correct + fast + finds critical points from both sources unprompted, correctly excludes
  denominator zeros regardless of strictness, never attempts direct cross-multiplication** →
  MASTERED.
- **Sign chart uses only numerator zeros, missing denominator zeros entirely** → MC-3 active; needs
  the two-source critical-point repair.
- **Includes a denominator zero in a non-strict inequality's solution set** → MC-1 active; needs
  the undefined-not-zero repair.
- **Cross-multiplies a rational inequality directly, as if solving an equation** → MC-2 active;
  needs the move-to-one-side repair.
- **Cannot construct any sign chart, even for a simple polynomial inequality** → prerequisite gap
  in `math.alg.polynomial-inequality`, not specific to this concept's own two-source extension;
  route back accordingly.

## Tutor Recovery Strategy
If a learner has just had MC-3 pointed out and reacts with "but I always found the zeros before, in
the last lesson" — validate this directly: the sign-chart PROCEDURE they already know is correct
and unchanged; the only new step is that "the zeros" now has two separate sources to check, not
one. Frame the correction as "you're not doing anything wrong that you weren't doing before — you
just have one more place to look now," not as a procedural error in the technique itself. If MC-2
persists after one correction, avoid simply re-stating "don't cross-multiply" — instead, have the
learner work the SAME problem both ways (their flawed cross-multiplication, and the move-to-one-
side approach) side by side, so the two different final answers make the danger concrete and
self-evident rather than an instruction to obey.

## Memory Hooks
- "Numerator zero or denominator zero — check both before you chart" — the two-source
  critical-point rule, directly targeting MC-3.
- "Zero can be included. Undefined never is." — the source-dependent endpoint rule, directly
  targeting MC-1.
- "Unknown sign? Move it to one side — never cross-multiply blind." — the cross-multiplication
  danger and its fix, directly targeting MC-2.

## Transfer Connections
- **`math.alg.rational-expressions`** (prerequisite, reused): supplies the domain-restriction
  awareness (denominator zeros are undefined) this concept's MC-1 repair depends on directly.
- **`math.alg.polynomial-inequality`** (prerequisite, reused): supplies the entire sign-chart
  procedure this concept extends unchanged — this concept adds only the second critical-point
  source and the source-dependent endpoint rule on top of it.
- **`math.alg.rational-equations`** (sibling concept, per the Blueprint's own Component 7
  "Related" field): the EQUATION counterpart, where cross-multiplication IS safe after appropriate
  domain checks — a direct, illuminating contrast to this concept's own MC-2, since the safety
  difference traces entirely to equations having no direction to flip.

## Cross-Subject Connections
- **Chemistry** (concentration/ratio modeling): the Blueprint's own P76 transfer probe uses exactly
  this scenario — a reagent-quantity ratio modeled as a rational inequality, requiring both the
  correct move-to-one-side solution and an explanation of why a lab technician's direct
  cross-multiplication shortcut is unsafe — giving this concept's abstract algebraic caution
  concrete applied stakes (a technician's flawed shortcut could yield a genuinely wrong operating
  range).
- **Economics / optimization** (not a KG cross-link, general domain knowledge): rational
  inequalities of this same form arise naturally when comparing two rates or ratios (e.g. cost per
  unit as one quantity varies), where a "domain gap" (denominator zero) often corresponds to a
  genuinely meaningless or undefined operating condition, mirroring this concept's own
  undefined-not-zero distinction.

## Blueprint References
- `docs/curriculum/blueprints/math.alg.rational-inequality.md` — Component 0 (metadata: difficulty
  proficient, bloom apply, mastery_threshold 0.75, estimated_hours 6, requires
  [math.alg.rational-expressions, math.alg.polynomial-inequality], no cross_links); Component 6
  (Misconception Registry MC-1..MC-3, reused above with birth-type classification added);
  Component 4 (worked examples for the two-source sign chart, the source-dependent endpoint
  contrast, and the cross-multiplication trap with its fix, reused directly in the Demonstrations
  above); the P76 transfer probe (a chemistry reagent-concentration scenario requiring the correct
  move-to-one-side solution and an explanation of the cross-multiplication danger, independence
  mode) — held in the Blueprint's own mastery-gate item bank, not restated here per the Standard's
  ownership boundary.

## Runtime Asset References
- No AssetIdentity rows exist yet for this concept (mathematics EB authoring is ahead of the
  AssetIdentity seeding campaign for math.alg — see CLAUDE.md's "Mathematics Educational Brain
  serving-asset campaign" section for the seeding mechanism this concept will use once authored
  content is selected for transcription).

## Curriculum Feedback
- **Fulfills a standing forward-work note**: `math.alg.polynomial-inequality`'s own already-
  authored entry (Batch 12) explicitly named this concept, `math.alg.rational-inequality`, as an
  unauthored sibling in both its Transfer Connections ("extends this exact sign-chart technique to
  rational expressions, reusing the identical root-finding-then-testing structure") and its
  Curriculum Feedback section ("recorded as a standing forward-work note for when it is reached in
  a future wave"). This entry fulfills that note; the technique reuse is confirmed accurate —
  Demonstration 1 above directly reuses the polynomial-inequality sign-chart mechanics unchanged,
  extending only the critical-point search to a second source.
- No genuine content-overlap or metadata discrepancy was found between this Blueprint and any
  already-authored math.alg sibling entry.

## Version History
- 2026-09-11 — Initial authoring (Batch 13 / math.alg Wave 13, part 2 of 2, of the Mathematics
  Educational Brain completion campaign). Blueprint reused by reference in full. No KG or Blueprint
  file modified.
