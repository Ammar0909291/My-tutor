# math.alg.inequality-2var

## Identity
- **KG ID**: `math.alg.inequality-2var`
- **Domain**: math.alg (Algebra)
- **Requires**:
  - `math.alg.inequality-1var` — load-bearing part: the general relations (<, ≤, >, ≥) and the solid-versus-dashed/included-versus-excluded distinction are already established there for a single variable; this concept transplants that same distinction onto a boundary that is now a line rather than a point.
  - `math.alg.linear-equation-2var` — load-bearing part: graphing the boundary line ax + by = c is the first of this concept's three steps, and it is exactly `math.alg.linear-equation-2var`'s own content, reused wholesale rather than re-derived.
- **Unlocks**: none in the KG
- **Cross-links**: `math.opt.linear-programming` (real, present in the live KG's `cross_links` field — see Curriculum Feedback for a discrepancy with the Blueprint's own metadata table)
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.8 (MAMR = ⌈0.8×5⌉ = 4/5)
- **Estimated hours**: 5
- **Blueprint**: `docs/curriculum/blueprints/math.alg.inequality-2var.md` (reused by reference throughout)

## Learning Objective
- The learner can graph a two-variable linear inequality by first graphing its boundary line ax + by = c.
- The learner can correctly determine whether that boundary line is drawn solid (≤ or ≥, the boundary itself is included) or dashed (< or >, the boundary is excluded), by checking the actual inequality symbol rather than applying a fixed convention.
- The learner can determine which half-plane to shade by testing a specific point not on the boundary line — recognising when the usual default test point, the origin, cannot be used because it lies on the line, and selecting an alternative in that case.

## Core Understanding
A two-variable linear inequality's solution set is not a line or a curve but an entire half-plane — every point on one side of a dividing boundary — and the three-step graphing procedure (draw the boundary, style it correctly, shade the correct side) is nothing more than `math.alg.linear-equation-2var`'s own line-graphing skill with two genuinely new judgments layered on top. The solid-versus-dashed distinction is not an arbitrary drawing convention to memorise; it is a direct, checkable consequence of the inequality symbol itself — a point exactly on the boundary line satisfies the *equation* ax + by = c, and whether that point also satisfies the *inequality* ax + by ≤ c (yes, since equality is permitted) or ax + by < c (no, since equality is excluded) is precisely what determines whether the boundary belongs to the solution set, and therefore whether it is drawn solid or dashed. The shading decision works because a boundary line divides the entire plane into exactly two regions, and every point within one region gives the same true/false answer when substituted into the inequality — so testing any single convenient point (the origin, whenever it is not itself on the boundary) and observing whether it satisfies the inequality tells you, by that shared-truth-value property, which entire half-plane to shade. The one case this default breaks is precisely when the boundary line happens to pass through the origin — a₍0₎ + b₍0₎ = c only when c = 0 — in which case the origin gives no information (it is a boundary point, not a test of either side) and a different point must be chosen instead.

## Mental Models
1. **Beginner — draw the line, then pick a side.** For 2x + y < 6, draw the line 2x + y = 6, then shade whichever side the origin sits on if the origin makes the inequality true. *Upgrade trigger*: an inequality including equality (≤ or ≥), where "just draw the line" gives no instruction about whether the line itself should be solid or dashed. *Shelf life*: one session.
2. **Intermediate — the inequality symbol itself determines the line style; check it, don't assume it.** ≤ and ≥ include the boundary (solid); < and > exclude it (dashed) — verified by checking whether a point exactly on the line satisfies the strict or non-strict version. *Upgrade trigger*: a boundary line that happens to pass through the origin, where the default test point gives zero information about which side to shade. *Shelf life*: durable and remains correct permanently.
3. **Advanced — every point in one half-plane shares the same truth value against the inequality, which is why a single test point suffices.** The boundary line is the only place where the expression ax + by equals c exactly; everywhere else, it is either consistently greater or consistently less, region by region. *Upgrade trigger*: multiple simultaneous inequalities (a feasible region), where each boundary's half-plane must be intersected with every other's, and the single-inequality graphing procedure becomes one step in a larger construction.
4. **Expert — a linear inequality's solution set is a closed or open half-plane, and a system of such inequalities defines a convex feasible region — the geometric object linear programming optimises over.** *Shelf life*: permanent, and it is the model that makes this concept's own stated forward application (`math.opt.linear-programming`) feel like an immediate continuation rather than a new topic.

## Why Students Fail
The most foundational failure treats the solid-versus-dashed choice as a fixed, memorised convention disconnected from the actual inequality symbol in front of the learner — producing a dashed line for x − y ≥ 2 (which should be solid, since a point exactly on the line, like (2,0), genuinely satisfies x − y ≥ 2) because "dashed" was learned as *the* way inequalities are drawn, without the underlying check (does a boundary point satisfy the inequality?) ever being connected to the choice. The second major failure is procedural and occurs at the test-point step: the learner defaults to testing the origin out of habit, without first checking whether the origin actually lies on the boundary line — for y > 2x, the boundary passes directly through (0,0), so testing the origin produces the false statement "0 > 0" with no useful information about which side to shade, and a learner who does not catch this either shades arbitrarily or, worse, proceeds as if the origin test had produced a meaningful result. A third, narrower failure occurs even when the correct test point and a correct true/false evaluation are both obtained: the learner then shades the half-plane on the *wrong* side — the one not containing the point that tested true, or vice versa — inverting the entire solution region despite every prior step being executed correctly.

## Misconceptions
Reused by reference from the Blueprint's Component 6 registry (MC-1..MC-3) and its repair actions B01–B03, with birth-type classification added.

- **MC-1 — BOUNDARY-LINE-STYLE-NOT-MATCHED-TO-INEQUALITY-SYMBOL** (FOUNDATIONAL)
  - **Birth type**: Type 5, instruction-induced — solid/dashed is frequently demonstrated on a small set of examples without the underlying "does a boundary point satisfy the inequality?" check ever being made explicit as the *reason*, so the learner absorbs a fixed convention rather than a derivable rule.
  - **Characteristic phrase**: drawing a dashed boundary for x − y ≥ 2, regardless of the ≥ symbol permitting equality.
  - **Detection probe** (verbatim, Blueprint P41): present x − y ≥ 2 and check whether a dashed line is used despite the ≥ symbol.
  - **Repair**: Blueprint Repair Action B01 — check directly whether a point on the boundary line satisfies the inequality (it does, for ≥), deriving the solid-line convention from that check rather than asserting it as a rule.
  - **Verification of death**: given a mixed set of inequalities across all four symbols, the learner correctly determines line style for each by checking the symbol, not by defaulting to one style.

- **MC-2 — ORIGIN-USED-AS-TEST-POINT-WITHOUT-CHECKING-IT-IS-OFF-THE-LINE** (foundational)
  - **Birth type**: Type 1, overgeneralisation of "the origin is the convenient default test point" (true in the majority of cases) into "the origin always works," without the prerequisite check that it does not itself lie on the boundary.
  - **Characteristic phrase**: testing the origin against y > 2x (whose boundary passes through the origin), producing the uninformative "0 > 0" and proceeding as if this settled the shading question.
  - **Detection probe** (verbatim, Blueprint P41): present y > 2x and check whether the origin is used as a test point despite lying on the boundary.
  - **Repair**: Blueprint Repair Action B02 — verify whether (0,0) satisfies the boundary *equation* first, before attempting to use it as a test point for the inequality; if it does, select any other convenient point instead.
  - **Verification of death**: given a boundary line passing through the origin, the learner selects an alternative test point unprompted, without attempting the origin first.

- **MC-3 — SHADED-HALF-PLANE-REVERSED** (moderate)
  - **Birth type**: Type 1, overgeneralisation — a correct true/false evaluation of the test point is not reliably connected back to "which side, physically, does this point sit on," so the shading choice can be inverted even when every computation up to that point was correct.
  - **Characteristic phrase**: correctly determining the test point satisfies the inequality, then shading the half-plane that does NOT contain it.
  - **Detection probe** (verbatim, Blueprint P41): review a submitted graph for shading on the wrong side relative to the test point's result.
  - **Repair**: Blueprint Repair Action B03 — re-verify the test point's true/false result, then explicitly re-confirm the shaded region visually contains that same point when the result was true.
  - **Verification of death**: given a fresh inequality, the learner's shaded region visibly contains their own correctly-evaluated true test point, every time.

## Analogies
- **Best — the two sides of a fence, tested by standing on one side.** The fence (boundary line) divides a field into two regions; standing at one specific spot and checking a rule ("am I allowed here?") tells you which entire side the rule permits, because the whole side shares the same answer. This is the Blueprint's own P64 conceptual-shift framing and it directly grounds why a single test point suffices.
- **Alternative — a coin balanced exactly on its edge.** A boundary point is like a coin resting exactly on its edge — neither clearly heads nor tails; whether that edge-balanced state "counts" as satisfying the inequality (solid line) or not (dashed line) is a genuine yes/no question with a definite, checkable answer, not an arbitrary drawing style.
- **Story analogy** — a property line running straight through your own front door: standing exactly at the doorway (the origin, on the boundary) tells you nothing about whether you're "inside" or "outside" the property, so you'd need to step to one clear side or the other to find out — directly modelling MC-2's repair.
- **ANTI-ANALOGY — "strict inequalities are always dashed, so use dashed unless told otherwise."** This licenses MC-1 by inverting the correct dependency: the symbol determines the style, not the other way around, and "unless told otherwise" implies a default that does not actually exist.
- **ANTI-ANALOGY — "always test the origin — it's the easiest point."** True as a default, dangerous as an unconditional rule; the correct frame is "test the origin, UNLESS it lies on the boundary, in which case pick a different point" — the condition is not optional.

## Demonstrations
- **The boundary-point satisfaction check.** For x − y ≥ 2, substitute a point exactly on the line (e.g. (2,0)) directly into the inequality, showing it evaluates true — then repeat for a strict inequality's boundary, showing it evaluates false. *Predict, before substituting, whether the boundary point will satisfy each inequality* — the derived (not asserted) solid/dashed conclusion is the demonstration, operationalising Blueprint B01's repair.
- **The origin-on-the-line collision.** Attempt to test the origin against y > 2x, showing the substitution produces "0 > 0," a statement that is neither informative nor immediately obviously false without careful reading — then select and test an alternative point, showing it produces a genuine, useful true/false result. *Predict, before substituting the origin, whether it lies on the boundary* — checking this first is exactly Blueprint B02's repair, made into a standing habit.
- **The shade-check-back verification.** After determining a test point satisfies the inequality, physically point to (or circle) that test point on the graph and confirm the shaded region visibly contains it — a direct visual reconciliation step that catches MC-3 before the graph is finalised.

## Discovery Questions
Direct instruction wins for the three-step procedure itself (boundary, style, shade) — it is a direct, mechanical extension of `math.alg.linear-equation-2var`'s already-secured line-graphing skill, layered with two checkable judgments, not a principle to re-derive from scratch. What is genuinely discoverable, and central to this concept's own distinguishing content, is the solid-versus-dashed justification: (1) **Need** — "Graph x − y ≥ 2. Should the boundary line itself be part of the answer, or not?" (2) **Playground** — test several points exactly on various boundary lines against their own inequalities (some ≤/≥, some strict), recording which boundary points satisfy their inequality and which don't. (3) **Invention** — "What's the rule connecting the inequality symbol to whether the boundary is included?" (4) **Collision** — offer a learner-proposed rule based on a superficial feature (e.g. "the symbol's shape") and test it against a case it gets wrong. (5) **Formalisation** — ≤ and ≥ include the boundary (a boundary point genuinely satisfies the inequality) → solid; < and > exclude it → dashed. (6) **Compression** — "Check whether the line itself is 'allowed' by plugging in a point on it. Allowed → solid. Not allowed → dashed."

## Teaching Sequence
The boundary-plus-style skill (TA-A01/TA-A02, targeting MC-1) must be secure before the origin-exception case (TA-A03, targeting MC-2) is introduced, because a learner who has not yet connected line style to the actual inequality symbol will produce an unreliable graph regardless of whether the correct test point is chosen — the two judgments (style, then shading) must each be independently trustworthy before their interaction (a correctly-styled but wrongly-shaded graph, or vice versa) can be meaningfully diagnosed. Within the test-point content, the "usually the origin works" default is taught first, on examples where it succeeds, before the exception (boundary through the origin) is introduced — establishing the general pattern before its edge case, so the exception reads as a genuine special case requiring a check, not as evidence the default itself is unreliable. The Blueprint's own Component 5 sequence (TA-A01 full three-step process via conceptual shift, TA-A02 solid-versus-dashed contrast pair, TA-A03 origin-on-the-boundary contrast pair, TA-A04 mastery gate) is reused by reference and not restated turn-by-turn here.

## Tutor Actions
- **DO: Demonstration** — the boundary-point satisfaction check, run on the learner's own inequality rather than a fixed example, so the solid/dashed conclusion is derived, not merely asserted.
- **TEST-THINKING: Prediction** — "does the origin lie on this boundary?" asked as a mandatory first question before any shading attempt, until the check is automatic.
- **DO: Worked example, the origin-on-the-line collision** — run live so the uninformative "0 > 0" result is genuinely experienced rather than described in the abstract.
- **TEST-THINKING: Error Analysis** — "a student's graph shades the side NOT containing their own correctly-tested point. What went wrong?" — stronger than direct correction because it requires locating a reconciliation failure rather than a computational one.
- **Does NOT fit: drilling only inequalities whose boundary avoids the origin.** This never gives MC-2 a chance to surface, producing false confidence in a test-point habit that will fail on the first boundary-through-origin case encountered.
- **Does NOT fit: teaching solid/dashed as a lookup table (symbol → style) without the underlying boundary-point check.** This is the exact instruction pattern the Blueprint's own Teaching Notes identify as the source of MC-1.

## Voice Teaching Notes
The load-bearing sentence is "check the symbol — does it allow the boundary itself, or not?" Slow down on "allow," reinforcing that this is a genuine yes/no test, not a memorised pairing. Listen for a learner stating a line style before or without reference to the specific inequality symbol in front of them ("dashed, like usual") — the absence of symbol-checking language predicts MC-1. For the test-point step, listen for whether the learner pauses to check "is this point on the line?" before substituting the origin, versus reaching for it reflexively — the reflexive reach, especially on a boundary line with a zero constant term, predicts MC-2. A confident, unprompted "let me check the shaded side actually contains my test point" is the strongest positive signal this concept produces. Channel reality is owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals
- **A dashed line drawn for a ≤ or ≥ inequality, or solid for a strict one** — MC-1; route to the boundary-point satisfaction check, never to a bare restatement of "check the symbol."
- **The origin substituted into an inequality whose boundary passes through it, with the resulting (uninformative or trivially-true) statement treated as meaningful** — MC-2, cleanly diagnostic; route to the origin-on-the-line collision.
- **A correct test-point evaluation followed by shading on the opposite side** — MC-3; route to the shade-check-back verification, emphasising the visual reconciliation step specifically.
- **A boundary-through-the-origin case correctly identified and an alternative test point selected unprompted** — the strongest positive signal for MC-2's repair; do not require this to be scaffolded once it appears reliably.
- **Mastery trigger**: the Blueprint's TA-A04 gate, MAMR ⌈0.8×5⌉ = 4/5, including its P76 factory-feasible-region transfer probe, whose part (b) requires reasoning about a specific point's membership without fully re-drawing the graph — a gate passed without that applied-point-test component does not certify the test-point technique's transfer beyond drilled graphing exercises.

## Tutor Recovery Strategy
The likely utterance is "why is this one solid and that one dashed — I thought they were always the same?" — a genuinely well-posed question exposing exactly the MC-1 gap. The concept-specific smaller question returns to the boundary-satisfaction check on the simplest possible case: **"Take any point right on this line. Plug it into the inequality. Is the statement true or false?"** — letting the learner derive the line style from a fact they can compute directly, rather than being told a rule. If the freeze is specifically at choosing a test point, shrink to the check itself: **"Does (0,0) make the LEFT side of the boundary line's equation equal zero? If yes, that point is ON the line — pick a different one."** Generic machinery is owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks
- Concept type: **procedure**, with two embedded judgments (line style, test-point validity) layered on top of the already-known line-graphing skill. Review by *application on mixed input* every cycle, including at least one boundary-through-the-origin item and both a ≤/≥ and a strict inequality.
- Concept-specific deviation: keep the shade-check-back verification step in active rotation even once the mechanics feel fluent — MC-3 is the misconception most likely to persist silently, since a wrong-side shading error produces a plausible-looking (just inverted) graph rather than an obviously broken one.
- Interleaving partners: `math.alg.linear-equation-2var` (the line-graphing skill this concept's first step directly reuses) and `math.alg.inequality-1var` (the general solid/dashed and inclusion logic this concept transplants onto a two-dimensional boundary).

## Transfer Connections
- **Near**: no KG unlocks are recorded for this concept — it currently sits as a terminal leaf, but the KG's own genuine cross-link to `math.opt.linear-programming` names its direct forward application: a system of such inequalities together defines a feasible region.
- **Far**: any decision problem involving a resource constraint expressed as an inequality between two quantities — the Blueprint's own factory transfer probe (labor-hour budget across two products) is the canonical shape, and it recurs throughout operations research and economics.
- **Real-world**: budget or capacity constraints expressed as "at most" or "at least" relationships between two variable quantities — any situation where a single linear limit bounds a two-dimensional choice.
- **Expert transfer**: the general principle that a system of linear constraints defines a convex feasible region, and that optimisation over such a region (linear programming) reduces to checking the objective function only at the region's corner points — a principle this concept's own graphing skill is the direct geometric foundation for.

## Cross-Subject Connections
- **Economics**, genuine: resource-constrained production decisions (the Blueprint's own factory transfer probe) are a standard application of two-variable inequality graphing, directly feeding into linear programming's feasible-region concept.
- **Operations research/Computer science**, real: constraint satisfaction and optimisation problems routinely begin by expressing resource or capacity limits as linear inequalities exactly of this form.
- The KG records a genuine cross-link to `math.opt.linear-programming`, correctly reflected above under Transfer Connections and here — this is the concept's most direct and load-bearing forward connection, not a general-purpose transfer.

## Blueprint References
`docs/curriculum/blueprints/math.alg.inequality-2var.md`. Reused by reference, not restated: the Component 6 Misconception Registry (MC-1..MC-3), the repair actions B01–B03, the Component 5 teaching-action sequence (TA-A01 full three-step graphing process, TA-A02 solid-versus-dashed contrast pair, TA-A03 origin-on-the-boundary contrast pair, TA-A04 mastery gate with its P76 factory feasible-region transfer probe), and the Component 1 learning objectives this entry's Learning Objective section restates in the Standard's own voice. This entry adds birth-type classification, the mental-model ladder culminating in the feasible-region/linear-programming preview, the two anti-analogies, the argued direct-instruction call for the three-step procedure with one nested discovery arc for the solid-versus-dashed justification specifically, the sequencing rationale for securing line style before the origin-exception case, and the recovery-strategy shrink-to-derivable-fact moves for both misconception classes.

## Runtime Asset References
No seeded `AssetIdentity` records exist for this concept. None were created here.

## Curriculum Feedback
A genuine metadata discrepancy found and resolved in favour of the KG, per this program's standing rule: this concept's own Blueprint (Component 0's metadata table and Component 7's Cross-Blueprint Dependencies) states `cross_links: (none)` and "Related: none declared," but the live KG's `cross_links` field for `math.alg.inequality-2var` genuinely lists `math.opt.linear-programming` — matching the KG's own `related` field and the Blueprint's own prose description ("used in linear programming to define feasible regions") and P76 transfer-probe design (a linear-programming-style multi-constraint scenario). This entry follows the KG as authoritative and reflects the real cross-link in its Cross-Subject Connections section above; recorded here as a genuine Blueprint/KG metadata mismatch for the Curriculum Production Pipeline's attention, not fixed (no Blueprint or KG file was modified by this program).

## Version History
- v1.0 (2026-09-11): Initial authoring. Domain Certification Mode, math.alg Wave 6.
