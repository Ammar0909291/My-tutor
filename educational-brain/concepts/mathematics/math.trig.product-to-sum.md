# math.trig.product-to-sum — Product-to-Sum and Sum-to-Product Formulas

## Identity
- **KG id**: `math.trig.product-to-sum`
- **Domain**: math.trig (Trigonometry)
- **Requires**: `math.trig.sum-difference-formulas`
- **Unlocks**: `math.calc.trig-integrals`
- **Cross-links**: `math.calc.trig-integrals` (not yet authored — independence mode)
- **Difficulty**: advanced · **Bloom level**: apply
- **Mastery threshold**: 0.7 · **Estimated hours**: 3

## Learning Objective
The learner derives all four product-to-sum formulas (not just the one `math.trig.sum-difference-formulas` already produced) by adding or subtracting pairs of sum/difference formulas, derives the reverse sum-to-product direction via the genuine substitution $A=\frac{X+Y}{2}, B=\frac{X-Y}{2}$, and applies both directions — the product-to-sum direction to convert a product into an integrable sum, the sum-to-product direction to explain physical beating phenomena.

## Core Understanding
`math.trig.sum-difference-formulas` already demonstrated, as its own capstone payoff, that adding $\sin(A+B)$ and $\sin(A-B)$ produces $\sin A\cos B=\frac12[\sin(A+B)+\sin(A-B)]$ — ONE product-to-sum formula, framed there as proof that the sum/difference formulas are generative rather than a closed lookup table. This concept does not re-derive that formula; it completes the family (the remaining three product-to-sum identities), adds the entirely new REVERSE direction (sum-to-product), and supplies the concept's own genuine application (integration).

**Completing the product-to-sum family**: the four sum/difference formulas are $\sin(A+B)=\sin A\cos B+\cos A\sin B$, $\sin(A-B)=\sin A\cos B-\cos A\sin B$, $\cos(A+B)=\cos A\cos B-\sin A\sin B$, $\cos(A-B)=\cos A\cos B+\sin A\sin B$. Adding or subtracting pairs of these in every combination produces all four product-to-sum identities:
- $\sin A\cos B=\frac12[\sin(A+B)+\sin(A-B)]$ (already derived by `sum-difference-formulas`)
- $\cos A\sin B=\frac12[\sin(A+B)-\sin(A-B)]$ (subtract instead of add)
- $\cos A\cos B=\frac12[\cos(A+B)+\cos(A-B)]$ (add the two cosine formulas)
- $\sin A\sin B=\frac12[\cos(A-B)-\cos(A+B)]$ (subtract the two cosine formulas — note the ORDER: $\cos(A-B)$ first, since $\cos(A+B)-\cos(A-B)$ would give the negative)

Each is obtained by the identical technique already modeled: add or subtract two known formulas so that the terms NOT wanted cancel, leaving the desired product term (halved).

**Sum-to-product is the reverse direction, and requires a genuine substitution, not just algebraic rearrangement**: starting from a SUM $\sin X+\sin Y$ and wanting to express it as a PRODUCT, the trick is to introduce new variables $A=\frac{X+Y}{2}$ and $B=\frac{X-Y}{2}$, so that $X=A+B$ and $Y=A-B$. Then $\sin X+\sin Y=\sin(A+B)+\sin(A-B)=2\sin A\cos B$ (by the already-derived product-to-sum formula, read backward), which in terms of the ORIGINAL variables $X,Y$ becomes $\sin X+\sin Y=2\sin\left(\frac{X+Y}{2}\right)\cos\left(\frac{X-Y}{2}\right)$. This is not simply "the same formula read the other way" — the substitution step (choosing $A,B$ as the half-sum and half-difference of $X,Y$) is a genuinely new algebraic move that must be understood, not merely swapped.

**The integration application is this concept's specific payoff**: $\int\sin(3x)\cos(x)\,dx$ has no elementary antiderivative as a product, but converting via $\sin A\cos B=\frac12[\sin(A+B)+\sin(A-B)]$ with $A=3x,B=x$ gives $\sin(3x)\cos(x)=\frac12[\sin(4x)+\sin(2x)]$, and each term integrates directly: $\int\frac12[\sin(4x)+\sin(2x)]\,dx=-\frac18\cos(4x)-\frac14\cos(2x)+C$.

## Mental Models
- **Add or subtract, and the unwanted term cancels.** Exactly the same technique `sum-difference-formulas` already modeled once — this concept simply exhausts all four pairings systematically rather than stopping at one.
- **Sum-to-product needs new variables, not just algebra flipped backward.** The substitution $A=\frac{X+Y}{2}, B=\frac{X-Y}{2}$ is the genuinely new idea — reading the product-to-sum formula "in reverse" only works after this renaming makes the forms match.
- **Products resist integration; sums invite it.** The entire practical motivation for these formulas is that $\int\sin(mx)\,dx$ is trivial while $\int\sin(mx)\cos(nx)\,dx$ (as a product) is not — the formulas are the bridge.

## Why Students Fail
None of this Blueprint's three misconceptions carries an explicit birth-type column, so each is independently classified here:
- **MC-1** is a **Type 1 (overgeneralization)**: having correctly learned ONE product-to-sum formula from `sum-difference-formulas`, a learner may assume the other three products convert the same way (same signs, same combination), rather than recognizing that each of the four products (sin·cos, cos·sin, cos·cos, sin·sin) requires its OWN specific add-or-subtract pairing to isolate.
- **MC-2** is a **Type 5 (instruction-induced)** gap: sum-to-product is typically taught as "the same formulas read backward," which conceals the genuinely new substitution step ($A=\frac{X+Y}{2}, B=\frac{X-Y}{2}$) that makes the reversal actually work — without that step made explicit, a learner has no way to reconstruct the formula from first principles and can only pattern-match a memorized result.
- **MC-3** is a **Type 5 (instruction-induced)** gap: because the derivations are purely algebraic (no diagram, no geometric picture), a learner may conclude the formulas are an arbitrary symbolic trick with no physical meaning, missing that sum-to-product literally IS the mathematics of acoustic beating (two close frequencies combining into an audible amplitude-modulated "beat").

## Misconceptions
**MC-1 — PRODUCT-TO-SUM-FORMULAS-CONFLATED** *(Foundational)*
- Surface form: applying the $\sin A\cos B$ combination rule (add the two sine formulas) to a $\cos A\cos B$ or $\sin A\sin B$ product, producing a formula with the wrong sign or the wrong trig function on the right-hand side.
- Root cause: over-generalizing from the one worked case (`sum-difference-formulas`'s $\sin A\cos B$) to all four products, without re-deriving which pair of sum/difference formulas and which operation (add vs. subtract) each specific product actually needs.
- Repair: re-derive all four side by side, explicitly naming which two formulas are combined and whether they are added or subtracted for each — $\sin A\cos B$ (add the two sine formulas), $\cos A\sin B$ (subtract them), $\cos A\cos B$ (add the two cosine formulas), $\sin A\sin B$ (subtract $\cos(A+B)$ FROM $\cos(A-B)$, not the reverse).

**MC-2 — SUM-TO-PRODUCT-TREATED-AS-INFORMAL-REVERSAL** *(Foundational)*
- Surface form: attempting to convert $\sin X+\sin Y$ to a product by simply "using the product-to-sum formula backward" without introducing $A=\frac{X+Y}{2}, B=\frac{X-Y}{2}$, and getting stuck or producing a formula in the wrong variables.
- Root cause: the reversal is presented as conceptually symmetric to the forward direction, hiding that a genuine substitution step is required to match $X,Y$ to $A,B$.
- Repair: walk the substitution explicitly — starting from the already-known $\sin(A+B)+\sin(A-B)=2\sin A\cos B$, set $X=A+B, Y=A-B$, solve for $A=\frac{X+Y}{2}, B=\frac{X-Y}{2}$, and substitute back to obtain $\sin X+\sin Y=2\sin\left(\frac{X+Y}{2}\right)\cos\left(\frac{X-Y}{2}\right)$ entirely in terms of $X,Y$.

**MC-3 — PRODUCT-TO-SUM-CONVERSIONS-ASSUMED-PURELY-ALGEBRAIC** *(Moderate)*
- Surface form: correctly executing the algebra without recognizing the formulas describe a real physical phenomenon (beating), treating the conversion as a symbol-manipulation exercise disconnected from any application.
- Root cause: the derivations are presented with no accompanying physical demonstration, so the formulas remain abstract manipulation rather than a description of an audible or measurable effect.
- Repair: connect sum-to-product directly to acoustic beating — two tones at close frequencies $f_1,f_2$ combine as $\sin(2\pi f_1 t)+\sin(2\pi f_2 t)=2\sin\left(2\pi\frac{f_1+f_2}{2}t\right)\cos\left(2\pi\frac{f_1-f_2}{2}t\right)$, a fast oscillation (the average frequency) whose amplitude is itself slowly modulated (the half-difference frequency) — the audible "beat" heard when two nearly-tuned instruments play together IS this cosine envelope.

## Analogies
- **The completion analogy**: `sum-difference-formulas` derived ONE product-to-sum identity as proof of concept — this concept is the systematic completion of that same technique across the remaining three cases, the way finishing a proof pattern for $n=2,3,4$ after seeing it work for $n=1$.
- **Anti-analogy — sum-to-product is NOT "the same formula, just read right-to-left."** This is MC-2's exact error: reading an equation backward works when both sides use the same variables, but the product-to-sum formula's right-hand side uses $A,B$ while the sum-to-product formula's left-hand side needs $X,Y$ — the substitution connecting them is new content, not a free relabeling.

## Demonstrations
1. **The four-formula derivation table**: deriving $\cos A\sin B$, $\cos A\cos B$, $\sin A\sin B$ side by side with $\sin A\cos B$ (already known), explicitly naming the operation (add/subtract) and the sign of the result for each — directly breaking MC-1.
2. **The sum-to-product substitution, worked forward**: starting from $\sin(A+B)+\sin(A-B)=2\sin A\cos B$, substituting $X=A+B, Y=A-B$ and solving for $A,B$ in terms of $X,Y$ to arrive at $\sin X+\sin Y=2\sin\left(\frac{X+Y}{2}\right)\cos\left(\frac{X-Y}{2}\right)$ — directly breaking MC-2.
3. **The beating-effect connection**: converting $\sin(5x)+\sin(3x)$ to $2\sin(4x)\cos(x)$, verifying numerically at $x=\frac{\pi}{2}$ (LHS: $\sin\frac{5\pi}{2}+\sin\frac{3\pi}{2}=1+(-1)=0$; RHS: $2\sin(2\pi)\cos\frac{\pi}{2}=2(0)(0)=0$ ✓), then framing $\cos(x)$'s slow variation as the beat envelope over the fast $\sin(4x)$ oscillation — directly breaking MC-3.

## Discovery Questions
1. "You already derived $\sin A\cos B=\frac12[\sin(A+B)+\sin(A-B)]$ by ADDING two sine formulas. What do you get if you SUBTRACT them instead?"
2. "If $X=A+B$ and $Y=A-B$, can you solve for $A$ and $B$ in terms of $X$ and $Y$? What formula does that let you rewrite?"
3. "Two speakers play tones at 440 Hz and 444 Hz. What do you predict you would hear — two separate pitches, or something else?"

## Teaching Sequence
1. **Anchor in `math.trig.sum-difference-formulas`**: state directly, "you already produced one of these formulas — today you get the other three, plus the reverse direction," making the division of labor explicit.
2. **Representation shift (breaks MC-1)**: the full four-formula derivation table, with each combination's operation named explicitly.
3. **Conflict evidence (breaks MC-2)**: the sum-to-product substitution worked forward step by step, showing the reversal is not free.
4. **Demonstration (breaks MC-3)**: the numerical verification of $\sin(5x)+\sin(3x)=2\sin(4x)\cos(x)$, then the beating-effect physical connection.
5. **Mastery gate**: 4-item problem set (derive $\cos A\sin B$ from scratch; derive $\sin A\sin B$ from scratch, explicitly noting the order of subtraction; convert a sum to a product using the substitution; compute a definite trig-product integral via conversion) plus 1 independence-mode transfer probe (the acoustic beating-effect scenario).

## Tutor Actions
- **Representation shift**: the complete four-formula derivation table, each entry naming its combination explicitly.
- **Conflict evidence**: the sum-to-product substitution $A=\frac{X+Y}{2}, B=\frac{X-Y}{2}$ worked in full.
- **Demonstration**: numerical verification of a sum-to-product conversion, then the acoustic-beating physical interpretation.
- **Mastery gate**, 4-item problem set plus 1 transfer probe requiring the beating-effect derivation and interpretation.

## Voice Teaching Notes
- Open with the explicit division-of-labor statement: "you derived one of these already — now finish the set," setting the expectation that this is completion, not new theory.
- For MC-1, before letting a learner apply any formula, ask "which two sum/difference formulas are you combining, and are you adding or subtracting?" as a standing check.
- For MC-2, never accept "just flip it" as a justification — always require the explicit $A=\frac{X+Y}{2}, B=\frac{X-Y}{2}$ substitution stated aloud.
- For MC-3, connect every sum-to-product conversion back to the beating picture at least once: "what would this sound like if $X$ and $Y$ were two close frequencies?"

## Assessment Signals
- **Early warning for MC-1**: correctly deriving one product-to-sum formula but applying its exact sign pattern to a different product without re-deriving.
- **Early warning for MC-2**: attempting to state a sum-to-product formula directly from the product-to-sum formula without performing the substitution, or producing a formula with $A,B$ still present instead of $X,Y$.
- **Early warning for MC-3**: correct algebra with no ability to explain what a sum-to-product conversion represents physically when asked directly.
- **Mastery evidence**: correctly deriving any of the four product-to-sum formulas on a fresh combination without prompting, and correctly executing the sum-to-product substitution on a novel pair of angles.

## Tutor Recovery Strategy
- On MC-1: re-derive the SPECIFIC product the learner got wrong from scratch, explicitly naming which sum/difference formulas are used and the operation — do not simply restate the correct formula.
- On MC-2: rework the substitution with a DIFFERENT pair of angles than already seen, requiring the learner to state $A=\frac{X+Y}{2}, B=\frac{X-Y}{2}$ explicitly before proceeding.
- On MC-3: pose a fresh two-frequency scenario (different numbers than already seen) and ask the learner to predict, then verify, the beat frequency.
- If a learner can derive all four formulas correctly but cannot apply them to an integration problem, treat this as a distinct application-transfer gap (not a derivation gap) and route to dedicated integration-conversion practice.

## Memory Hooks
- "Add or subtract, name the pair" — the four-formula derivation discipline.
- "New letters, not a free flip" — for the sum-to-product substitution.
- "Fast wiggle, slow envelope" — for the beating-effect interpretation.

## Transfer Connections
- **`math.trig.sum-difference-formulas`** (prerequisite, already authored): supplied the ONE product-to-sum derivation ($\sin A\cos B$) this concept completes into the full family of four, plus the reverse direction.
- **`math.calc.trig-integrals`** (unlocked and cross-linked, not yet authored — the entirely-unstarted trig-integration chain in `math.calc`): this concept's own integration worked example ($\int\sin(3x)\cos(x)\,dx$) is the exact technique that future entry will need as a prerequisite skill — product-to-sum conversion is what makes trigonometric-product integrals tractable.
- **`math.trig.reciprocal-identities`** (sibling, authored Batch 57): a parallel case of algebraic conversion tools that reduce a complex trig expression to a simpler standard form, though via a different mechanism (definitional substitution rather than formula combination).

## Cross-Subject Connections
- The Blueprint's own transfer probe uses an acoustic-physics context (beating between two close frequencies) as the application vehicle for the sum-to-product direction — a genuine physics application, though not a formal KG cross-link (the KG lists `cross_links: ['math.calc.trig-integrals']`, itself a mathematics concept, not a cross-subject link).

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.trig.product-to-sum.md`. All three worked examples (deriving $\cos A\cos B$ and $\sin A\sin B$ and $\cos A\sin B$; converting $\sin(5x)+\sin(3x)$ to $2\sin(4x)\cos(x)$ with numerical verification; computing $\int\sin(3x)\cos(x)\,dx$ via conversion), the complete misconception registry (MC-1, MC-2, MC-3, all Foundational/Moderate severity but none carrying an explicit birth-type column), and the transfer probe are reused by reference, never restated verbatim beyond the minimal illustrative excerpts above.
- Blueprint metadata (`requires`, `unlocks: math.calc.trig-integrals`, `cross_links: ['math.calc.trig-integrals']`, `difficulty`, `bloom`, `mastery_threshold`, `estimated_hours`) verified against the live KG — see Curriculum Feedback below: **zero discrepancy**, including on the cross-link's own unauthored status (the Blueprint's own `P76_mode: independence` correctly identifies `math.calc.trig-integrals` as not yet authored — confirmed via directory listing).
- Independent transfer probe (independence mode, per the Blueprint's own stated `P76_mode: independence`): the acoustic beating-effect scenario, contrasting sum-to-product with product-to-sum, reused by reference.

## Runtime Asset References
- No AssetIdentity (ADR 14) explanation or probe assets exist yet for this concept in `src/lib/teaching/assets/`. Per this program's established layer-ownership boundary, Layer 3/7 (DB-backed serving assets) is out of scope for this Educational Brain authoring campaign — this entry is Layer 2 (Educational Brain) content only.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy** for `requires`, `unlocks`, `cross_links`, `difficulty`, `bloom`, `mastery_threshold`, and `estimated_hours` — every field in the Blueprint's Component 0 metadata matches the live KG exactly (verified by direct Python query against `docs/mathematics/kg/graph.json`), including confirmation that the Blueprint's own claim that `math.calc.trig-integrals` is unauthored (justifying `P76_mode: independence`) is accurate.
- This entry, along with `math.trig.hyperbolic-functions` authored the same batch, deliberately targets reopening the currently-blocked `math.calc` domain — `math.calc.trig-integrals` needs only this concept as its `math.trig` prerequisite (its other prerequisites are already authored `math.calc` concepts), per the forward-planning note left in Batch 58's own ROADMAP entry.

## Version History
- **2026-09-13 (Batch 59)**: authored as part of the Mathematics Educational Brain completion campaign. Unblocked by the already-authored `math.trig.sum-difference-formulas` (Batch 57). One of four concepts authored this batch (companions: `math.trig.hyperbolic-functions`, `math.seq.partial-sums`, `math.seq.geometric-series`). `math.trig` moves from 17/25 toward 19/25 this batch. Deliberately selected, alongside `hyperbolic-functions`, to reopen the `math.calc` domain's frontier per Batch 58's forward-planning note.
