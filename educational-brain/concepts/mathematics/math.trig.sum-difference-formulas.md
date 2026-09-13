# math.trig.sum-difference-formulas — Sum and Difference Formulas

## Identity
- **KG id**: `math.trig.sum-difference-formulas`
- **Domain**: math.trig (Trigonometry)
- **Requires**: `math.trig.trig-identities`
- **Unlocks**: `math.trig.double-angle-formulas`
- **Cross-links**: none
- **Difficulty**: proficient · **Bloom level**: apply
- **Mastery threshold**: 0.8 · **Estimated hours**: 6

## Learning Objective
The learner derives $\cos(A-B)=\cos A\cos B+\sin A\sin B$ from the unit-circle distance formula, obtains $\cos(A+B)$, $\sin(A+B)$, and $\sin(A-B)$ from it, derives the cofunction identities as a direct special case, and uses the sum/difference formulas as a generative foundation to derive a further identity (the product-to-sum formula).

## Core Understanding
`math.trig.trig-identities` already STATES and USES the sum/difference formulas $\sin(A\pm B)$, $\cos(A\pm B)$ — for exact-value computation (e.g. $\cos75°$) and double-angle derivation — but explicitly defers their DERIVATION as "beyond this concept's scope." This concept exclusively supplies that deferred derivation, deliberately not re-teaching what `trig-identities` already covers.

**The derivation**: place two points on the unit circle, $P=(\cos A,\sin A)$ and $Q=(\cos B,\sin B)$. Compute the distance $PQ$ TWO independent ways. First, via the coordinate distance formula: $PQ^2=(\cos A-\cos B)^2+(\sin A-\sin B)^2$, which expands and collapses (using the Pythagorean identity twice) to $2-2\cos A\cos B-2\sin A\sin B$. Second, via the Law of Cosines applied to the triangle formed by $P$, $Q$, and the origin (two sides of length $1$, included angle $A-B$): $PQ^2=1^2+1^2-2(1)(1)\cos(A-B)=2-2\cos(A-B)$. Setting the two expressions equal and simplifying gives $\cos(A-B)=\cos A\cos B+\sin A\sin B$ — the ONE formula from which every other formula in this family follows.

Substituting $B\to-B$ (using the even-odd properties $\cos(-B)=\cos B$, $\sin(-B)=-\sin B$) gives $\cos(A+B)=\cos A\cos B-\sin A\sin B$. Using the cofunction relationship, $\sin(A+B)=\sin A\cos B+\cos A\sin B$, and substituting $B\to-B$ again gives $\sin(A-B)=\sin A\cos B-\cos A\sin B$.

The **cofunction identities** fall out as a PURE special case: setting $A=90°$ in the just-derived difference formula, $\cos(90°-B)=\cos90°\cos B+\sin90°\sin B=0\cdot\cos B+1\cdot\sin B=\sin B$ — no separate geometric argument is needed.

The concept's payoff demonstration is that these formulas are **generative**, not merely a computational tool used one at a time: adding $\sin(A+B)$ and $\sin(A-B)$ directly gives $2\sin A\cos B$, yielding the **product-to-sum formula** $\sin A\cos B=\frac12[\sin(A+B)+\sin(A-B)]$ — a genuinely new identity obtained by pure algebraic combination, with no additional geometry required, directly instantiating the KG's own description of these formulas as "fundamental for deriving all other trig identities."

## Mental Models
- **One derivation, four formulas.** $\cos(A-B)$ is derived from first principles; every other sum/difference formula follows from it by substitution ($B\to-B$) or the cofunction relationship — nothing else needs an independent geometric argument.
- **Two ways to measure the same distance.** The entire derivation is the simple idea of computing one quantity ($PQ^2$) via two different methods and setting the results equal — a technique reusable wherever two descriptions of the same geometric fact are available.
- **The formulas are generative, not just computational.** Combining two already-known formulas algebraically (adding or subtracting) produces genuinely NEW identities — the formulas are a starting point for further derivation, not merely a fixed lookup table.

## Why Students Fail
All three of this Blueprint's misconceptions carry explicit severity ratings but no birth-type column, so each is independently classified here:
- **MC-1** is a **Type 5 (instruction-induced)** gap: if a learner's only exposure to these formulas is via `math.trig.trig-identities`'s own application-focused treatment (computing one exact value at a time), the formulas' deeper generative role — that combining them produces further identities — is never demonstrated, so it is reasonable to conclude they are purely a one-at-a-time computational tool.
- **MC-2** is a **Type 5 (instruction-induced)** gap: the cofunction identities are commonly TAUGHT as a standalone geometric fact (e.g. via complementary angles in a right triangle) well before this concept, so without an explicit reconnection, they remain filed as an unrelated separate fact rather than being recognized as a special case of the difference formula.
- **MC-3** is a **Type 1 (overgeneralization)**: a learner comfortable stating the Law of Cosines in its standard $a,b,c$-labeled form may not recognize the origin-$P$-$Q$ triangle's two radius-length sides and included angle $A-B$ as an instance of that same theorem, and either skip the step or misidentify which angle is included.

## Misconceptions
**MC-1 — SUM-DIFFERENCE-FORMULAS-TREATED-AS-ISOLATED-COMPUTATIONAL-TOOLS** *(Foundational)*
- Surface form: viewing the sum/difference formulas as useful only one at a time for computing individual exact values, missing their role as a generative foundation.
- Root cause: prior exposure (via `trig-identities`) demonstrates only the application-focused use, never the combination-produces-new-identities use.
- Repair: add $\sin(A+B)$ and $\sin(A-B)$ directly — the two cross terms cancel, leaving $2\sin A\cos B$, an entirely NEW identity (the product-to-sum formula) obtained purely by combining two already-known formulas, with no additional derivation required.

**MC-2 — COFUNCTION-IDENTITIES-MEMORIZED-AS-SEPARATE-UNRELATED-FACTS** *(Foundational)*
- Surface form: treating $\sin(90°-\theta)=\cos\theta$ and its siblings as independent facts to memorize, rather than a direct consequence of the difference formula.
- Root cause: cofunction identities are commonly taught earlier, via a different (right-triangle complementary-angle) argument, with no later reconnection to the sum/difference formulas.
- Repair: substitute $A=90°$ directly into $\cos(A-B)=\cos A\cos B+\sin A\sin B$ — $\cos(90°-B)=0\cdot\cos B+1\cdot\sin B=\sin B$ — showing the cofunction identity is simply what the difference formula SAYS at one specific angle, not a separate geometric fact.

**MC-3 — LAW-OF-COSINES-STEP-IN-THE-DERIVATION-SKIPPED-OR-MISAPPLIED** *(Moderate)*
- Surface form: failing to correctly apply the Law of Cosines to the origin-$P$-$Q$ triangle — using the wrong angle, or omitting the derivation step and simply asserting the formula.
- Root cause: not recognizing the abstract origin-$P$-$Q$ configuration as a concrete instance of the Law of Cosines' standard $a,b,c$-labeled form.
- Repair: explicitly identify the triangle's two known sides (both length $1$, the radius) and the included angle between them (exactly $A-B$, the angular separation of $P$ and $Q$) — this identification is the entire geometric content the Law of Cosines step depends on.

## Analogies
- **The two-methods-one-answer analogy**: exactly like `math.trig.law-of-cosines`' own derivation (two right triangles' shared altitude, set equal), this concept computes one quantity two independent ways and equates the results — the same proof technique reused in a different geometric setting.
- **Anti-analogy — the sum/difference formulas are NOT a closed, static list.** This is MC-1's exact error, worth naming explicitly: unlike a fixed lookup table, these four formulas can be algebraically combined to produce entirely new identities the learner has never seen stated anywhere.

## Demonstrations
1. **The full unit-circle derivation**: two points $P,Q$ on the unit circle, distance computed both via the coordinate formula and the Law of Cosines, equated and simplified to $\cos(A-B)=\cos A\cos B+\sin A\sin B$ — directly breaking MC-3 by making the Law of Cosines' role explicit.
2. **The cofunction special case**: substitute $A=90°$ into the just-derived formula, obtaining $\cos(90°-B)=\sin B$ directly — directly breaking MC-2.
3. **The product-to-sum generation**: add $\sin(A+B)$ and $\sin(A-B)$ to obtain $\sin A\cos B=\frac12[\sin(A+B)+\sin(A-B)]$ — directly breaking MC-1 by demonstrating a genuinely new identity produced from pure combination.

## Discovery Questions
1. "The distance between two points on the unit circle can be computed with the coordinate distance formula AND with the Law of Cosines. What happens if you set the two results equal?"
2. "Is $\cos(90°-B)=\sin B$ a separate fact you need to memorize, or does it fall directly out of the difference formula you just derived?"
3. "If you already know $\sin(A+B)$ and $\sin(A-B)$ separately, can you combine them to produce a NEW identity you haven't seen before?"

## Teaching Sequence
1. **Anchor in `math.trig.trig-identities`**: state directly, "you used the sum/difference formulas there, but their derivation was deferred — here it is," making the division of labor explicit before beginning.
2. **Representation shift (breaks MC-3)**: the full two-points-on-the-unit-circle derivation, emphasizing the Law of Cosines step's exact geometric setup (two radius-length sides, included angle $A-B$).
3. **Special-case demonstration (breaks MC-2)**: the cofunction identity's direct derivation from the difference formula at $A=90°$.
4. **Conflict evidence (breaks MC-1)**: the product-to-sum formula's derivation by combining $\sin(A+B)$ and $\sin(A-B)$, framed explicitly as "these formulas generate new identities — they aren't just a fixed lookup table."
5. **Mastery gate**: 4-item problem set (re-derive $\cos(A-B)$ showing both computations of $PQ^2$; derive the SINE cofunction identity in parallel; subtract (rather than add) the two sine formulas to derive a different product-to-sum identity; explain in own words why deriving cofunction identities beats memorizing them) plus 1 independence-mode transfer probe (a signal-processing product-to-sum derivation and application).

## Tutor Actions
- **Representation shift**: the full unit-circle derivation of $\cos(A-B)$, with explicit Law-of-Cosines setup.
- **Special-case demonstration**: substituting $A=90°$ to obtain the cofunction identity directly.
- **Conflict evidence**: the product-to-sum formula's derivation by pure combination, framed as a generative payoff.
- **Mastery gate**, 4-item problem set plus 1 transfer probe requiring an original product-to-sum derivation and application.

## Voice Teaching Notes
- Open with the explicit division-of-labor statement: "you've used these formulas before — now you'll see WHERE they come from," setting the expectation that this concept fills a specific, previously-flagged gap rather than repeating prior content.
- For MC-2, whenever a cofunction identity is needed, say "don't recall it — derive it: what happens if you plug $A=90°$ into the difference formula?" as a standing habit.
- For MC-1, after any successful application of the sum/difference formulas, ask "can these be combined to make something new?" as a recurring prompt, reinforcing the generative framing beyond this concept's own mastery gate.

## Assessment Signals
- **Early warning for MC-1**: correctly applying the sum/difference formulas to compute individual values but expressing surprise or confusion when asked to combine two of them algebraically.
- **Early warning for MC-2**: being unable to derive a cofunction identity from the difference formula, or treating a request to derive it as a request to recall a separately memorized fact.
- **Early warning for MC-3**: omitting the Law of Cosines step entirely, or applying it with the wrong included angle when re-deriving the formula.
- **Mastery evidence**: correctly re-deriving any one of the four sum/difference formulas from the unit-circle argument without prompting, and correctly combining two known formulas to produce a genuinely new identity on a fresh transfer task.

## Tutor Recovery Strategy
- On MC-1: re-walk the product-to-sum derivation with a DIFFERENT combination (e.g. subtracting instead of adding) than already seen, re-anchoring on "combine algebraically, generate something new" — repetition of the same single example does not fix a conceptual gap about the formulas' generative nature.
- On MC-2: re-derive a fresh cofunction identity (e.g. the sine version, $\sin(90°-B)=\cos B$) from the difference formula, rather than re-stating the cosine version already seen — the misconception is about the DERIVATION relationship, not about one specific identity.
- On MC-3: rework the full derivation with the learner explicitly stating the triangle's two sides and included angle before applying the Law of Cosines formula — the misconception is a missing geometric-identification step, not a computational error.
- If a learner correctly derives $\cos(A-B)$ but cannot obtain the other three formulas from it, treat the substitution-and-cofunction chain as a distinct sub-skill and route to dedicated practice deriving formulas FROM other formulas.

## Memory Hooks
- "Two ways to measure the same distance — set them equal" — the derivation technique.
- "Plug in 90° — the cofunction identity is already there" — for MC-2.
- "Add or subtract known formulas — generate something new" — for MC-1.

## Transfer Connections
- **`math.trig.trig-identities`** (prerequisite, already authored): the concept that already STATES and APPLIES these formulas, explicitly deferring their derivation to this concept — the division of labor is exact and stated directly in both entries.
- **`math.trig.double-angle-formulas`** (unlocked, not yet authored): a genuine KG-level content-overlap risk is flagged by the Blueprint itself — `trig-identities`'s own LO3 already derives the double-angle formulas as an application of the sum formulas, while the KG separately lists this concept as unlocking a dedicated `double-angle-formulas` concept; the Blueprint recommends that future entry focus on the RIGOROUS derivation of all three cosine double-angle forms and half-angle formulas, rather than re-teaching the basic substitution already shown in `trig-identities`.
- **`math.trig.reciprocal-identities`** (sibling, authored this same batch): a parallel case of formulas serving as a generative foundation — the reciprocal identities are the algebraic conversion tool that reduces any six-function expression back to the sin/cos form these sum/difference formulas operate on.

## Cross-Subject Connections
- No cross-links are declared in the KG for this concept (`cross_links: []`); the Blueprint's own transfer probe uses a signal-processing context (product-to-sum conversion for signal analysis) purely as an application vehicle, not a formal cross-subject curriculum link, consistent with the KG's own record.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.trig.sum-difference-formulas.md` (mixed-numbering format — Components 0-8 and 10 present, Component 9 intentionally omitted). All three worked examples (the full unit-circle derivation, the cofunction special-case substitution, the product-to-sum generation by combination), the complete misconception registry (MC-1 Foundational, MC-2 Foundational, MC-3 Moderate, none carrying an explicit birth-type column), and the transfer probe are reused by reference, never restated verbatim beyond the minimal illustrative excerpts above.
- Blueprint metadata (`requires`, `unlocks: math.trig.double-angle-formulas`, `cross_links: []`, `difficulty`, `bloom`, `mastery_threshold`, `estimated_hours`) verified against the live KG — see Curriculum Feedback below: **zero discrepancy**.
- Independent transfer probe (independence mode, per the Blueprint's own stated `P76_mode: independence`): "A signal-processing engineer needs to simplify the product $\cos(3t)\sin(5t)$ appearing in a signal analysis, converting it into a sum of sines and cosines for further processing. (a) Using the same combination technique (adding or subtracting the sum/difference formulas), derive a product-to-sum identity for $\cos A\sin B$ (note: this is $\cos$ times $\sin$, not $\sin$ times $\cos$ as in the worked example — determine whether the same combination or a different one is needed). (b) Apply your derived identity to simplify $\cos(3t)\sin(5t)$ into a sum of two terms. (c) Explain why being able to DERIVE this identity on the spot is a direct benefit of understanding these formulas as a generative foundation." *(Expected: (a) Starting from $\sin(A+B)=\sin A\cos B+\cos A\sin B$ and $\sin(A-B)=\sin A\cos B-\cos A\sin B$, SUBTRACTING gives $\sin(A+B)-\sin(A-B)=2\cos A\sin B$, so $\cos A\sin B=\frac12[\sin(A+B)-\sin(A-B)]$ — note this requires SUBTRACTION, not addition, distinguishing it from the worked example's $\sin A\cos B$ case. (b) With $A=3t,B=5t$: $\cos(3t)\sin(5t)=\frac12[\sin(8t)-\sin(-2t)]=\frac12[\sin(8t)+\sin(2t)]$. (c) Deriving on the spot avoids needing to memorize a large, easily-confused family of product-to-sum formulas as separate facts — one generative technique covers all of them.)*

## Runtime Asset References
- No AssetIdentity (ADR 14) explanation or probe assets exist yet for this concept in `src/lib/teaching/assets/`. Per this program's established layer-ownership boundary, Layer 3/7 (DB-backed serving assets) is out of scope for this Educational Brain authoring campaign — this entry is Layer 2 (Educational Brain) content only.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy** for `requires`, `unlocks`, `cross_links`, `difficulty`, `bloom`, `mastery_threshold`, and `estimated_hours` — every field in the Blueprint's Component 0 metadata table matches the live KG exactly (verified by direct Python query against `docs/mathematics/kg/graph.json`). A genuine content-overlap risk flagged by the Blueprint itself is carried forward here (not resolved, since the KG is frozen): `trig-identities`'s own LO3 already derives double-angle formulas from the sum formulas, while this concept separately unlocks a dedicated `math.trig.double-angle-formulas` concept in the KG — future authoring of that concept should focus on RIGOROUS derivation of all three cosine double-angle forms plus half-angle formulas, per this Blueprint's own explicit recommendation, rather than re-teaching the basic substitution already covered in `trig-identities`.

## Version History
- **2026-09-12 (Batch 57)**: authored as part of the Mathematics Educational Brain completion campaign. Unblocked by the already-authored `math.trig.trig-identities` (Batch 55). One of four `math.trig` concepts authored this batch (companions: `math.trig.special-angles`, `math.trig.amplitude-period-phase`, `math.trig.reciprocal-identities`). `math.trig` moves from 14/25 to 15/25 this batch. Unlocks `math.trig.double-angle-formulas` (not yet authored, carrying a flagged content-overlap risk against `trig-identities`' own LO3).
