# math.calc.sequence-limits — Limits of Sequences

## Identity
- **KG id**: `math.calc.sequence-limits`
- **Domain**: math.calc (Calculus)
- **Requires**: `math.calc.limits`, `math.seq.sequence`
- **Unlocks**: `math.seq.series-convergence`
- **Cross-links**: `math.seq.convergent`
- **Difficulty**: advanced · **Bloom level**: apply
- **Mastery threshold**: 0.8 · **Estimated hours**: 5

## Learning Objective
The learner computes $\lim_{n\to\infty} a_n$ for a sequence $a_n$ using three techniques — algebraic manipulation of indeterminate forms, l'Hôpital's rule applied through the continuous extension of $n$, and the squeeze theorem — and justifies which technique a given sequence calls for.

## Core Understanding
A sequence limit asks the same question `math.calc.limits` already answers for continuous functions — "what value does the output approach as the input grows without bound?" — but restricted to a countable, integer-indexed input. That restriction is what makes the three techniques here genuinely new rather than a restatement of `math.calc.limits`:

1. **Indeterminate-form resolution.** A ratio of two divergent expressions, such as $\frac{2n^2+3n}{5n^2-1}$, is written as $\infty/\infty$ before evaluation — and $\infty/\infty$ is not a number, so it cannot be the answer. Dividing every term by the highest power of $n$ in the denominator turns the expression into a ratio of terms that individually converge (constants and terms of the form $c/n^k \to 0$), and *then* the limit laws apply term by term. The shape $\infty/\infty$ is a description of the problem, never a solution to it.
2. **l'Hôpital's rule via continuous extension.** A sequence $a_n = f(n)$ is defined only on the integers, so "derivative of $a_n$" is not literally meaningful — but if $f(x)$ (the same formula with $x$ real) is differentiable and $\lim_{x\to\infty} f(x)$ exists, that limit equals $\lim_{n\to\infty} f(n)$. This licenses differentiating numerator and denominator **separately** (never applying the quotient rule to the whole fraction) and re-evaluating the new ratio's limit — repeating if necessary.
3. **The squeeze theorem.** When $a_n$ is trapped between two other sequences, $b_n \le a_n \le c_n$, and *both* bounding sequences converge to the *same* limit $L$, then $a_n \to L$ too. A bound alone proves nothing: $-1 \le \sin n \le 1$ bounds $\sin n$ but the two bounds don't converge to a common value (they're constants), so the theorem doesn't fire until the whole expression is scaled — e.g. $-\frac{1}{n} \le \frac{\sin n}{n} \le \frac{1}{n}$, where both sides now converge to 0.

The organizing idea across all three: an indeterminate shape is a *diagnosis*, not a *result* — it tells you which of the three tools to reach for, and the tool does the actual work.

## Mental Models
- **The shape is a doctor's diagnosis, not a prescription.** Seeing $\infty/\infty$ or $\infty - \infty$ tells you *that* something needs treatment, never *what the treatment produces*. The same shape can resolve to 0, to a finite nonzero number, or genuinely diverge, depending on the relative growth rates hidden inside it.
- **Racing terms.** In a ratio of polynomials, only the highest-power term in each half of the race matters as $n\to\infty$ — every lower-power term becomes negligible in comparison, which is *why* dividing through by the highest power isolates the surviving ratio.
- **The sandwich.** For the squeeze theorem: picture $a_n$ physically pinched between two slices of bread ($b_n$ below, $c_n$ above). If the two slices are pressed together at $L$, the filling has nowhere else to go.
- **Borrowing a continuous ruler.** l'Hôpital's rule works on sequences by temporarily pretending the integer-only sequence is a continuous function, using the continuous function's derivative tools, then reading the answer back off at integer points — the sequence never actually "has" a derivative itself.

## Why Students Fail
The three techniques fail through three structurally different mechanisms, independently classified since this Blueprint (like virtually every math.calc Blueprint in this campaign) carries no explicit birth-type column:

- **MC-1** is a **Type 1 (overgeneralization)** of the everyday habit "if I can name the shape of the answer, I've answered the question." Naming $\infty/\infty$ *feels* like a completed computation because the learner has successfully classified the problem — but classification is the first step, not the last.
- **MC-2** is a **Type 1 (overgeneralization)** of the quotient rule, imported wholesale from ordinary differentiation. The learner has one differentiation tool for "fraction of two functions" (the quotient rule) and applies it reflexively, not realizing l'Hôpital's rule is a *different* operation on the *same-looking* fraction — differentiate top and bottom independently, don't combine them.
- **MC-3** is a **Type 5 (instruction-induced)** gap: most first exposures to the squeeze theorem use a trivial bounding pair (like $-1\le\sin n\le1$) as a *motivating example* without stressing that the bounds must also *converge to the same value* — so the learner absorbs "find any true bounding inequality" and drops the convergence requirement, which is the entire mechanism that makes the theorem work.

## Misconceptions
**MC-1 — INDETERMINATE-FORM-AS-DIRECT-ANSWER** *(Foundational, Type 1)*
- Surface form: "The limit is $\infty/\infty$" offered as the final answer to $\lim_{n\to\infty}\frac{2n^2+3n}{5n^2-1}$.
- Root cause: treating a recognized *shape* as though naming it were the same as evaluating it.
- Repair: divide every term by the highest power of $n$ present in the denominator ($n^2$ here) *before* taking the limit: $\frac{2+3/n}{5-1/n^2} \to \frac{2}{5}$. Contrast directly against the wrong "$\infty/\infty = 1$" answer — the two indeterminate ratios $\frac{2n^2+3n}{5n^2-1}$ and, say, $\frac{n^2}{5n^2-1}$ both look like $\infty/\infty$ but converge to different values ($2/5$ vs $1/5$), which is the cleanest proof that the shape alone carries no information about the value.

**MC-2 — LHOPITAL-CONFLATED-WITH-QUOTIENT-RULE** *(Foundational, Type 1)*
- Surface form: for $\lim_{n\to\infty}\frac{\ln n}{n}$, differentiating "the whole fraction" via the quotient rule to get $\frac{1/x \cdot x - \ln x \cdot 1}{x^2} = \frac{1-\ln x}{x^2}$, then trying to take *that* limit.
- Root cause: the quotient rule is the learner's only prior tool for "derivative of a fraction," so it fires by habit even though l'Hôpital's rule is a structurally different operation.
- Repair: contrast pair. l'Hôpital's rule differentiates numerator and denominator **separately and independently**: $\frac{d}{dx}\ln x = 1/x$ and $\frac{d}{dx}x = 1$, giving the new ratio $\frac{1/x}{1} \to 0$ — a clean, directly-evaluable limit. The quotient-rule result $\frac{1-\ln x}{x^2}$ is an unrelated expression that does not even resolve the original indeterminate form. Naming the rule correctly ("differentiate top, differentiate bottom, form a *new* ratio") is the fix, not a computational correction.

**MC-3 — SQUEEZE-BOUND-WITHOUT-COMMON-LIMIT** *(Moderate, Type 5)*
- Surface form: citing $-1 \le \sin n \le 1$ as sufficient justification that $\lim_{n\to\infty}\frac{\sin n}{n} = 0$, without noticing the bound itself needs to be scaled.
- Root cause: instruction that introduces the squeeze theorem with an already-convergent trivial bound, never demonstrating the failure case where a true bound does *not* converge to a common value.
- Repair: representation shift. The trivial bound $-1\le\sin n\le1$ is true but useless here — both bounds are *constants*, not sequences converging to anything (they don't move as $n\to\infty$; they don't apply to $\frac{\sin n}{n}$ at all until scaled). Divide through by $n$: $-\frac{1}{n} \le \frac{\sin n}{n} \le \frac{1}{n}$. Now both bounding sequences converge to 0 as $n\to\infty$, and the squeeze theorem gives $\frac{\sin n}{n} \to 0$.

## Analogies
- **The racing-cars analogy (indeterminate forms):** two cars race toward infinity; the ratio of their positions as $n\to\infty$ depends only on their *relative speeds* (the highest-power terms), not on the fact that both eventually go arbitrarily far. Dividing by the highest power is "factoring out the speed of the faster car" so what remains is a comparison of what's left.
- **The sandwich/pinch analogy (squeeze theorem):** already stated above under Mental Models — worth repeating aloud with the learner as a physical gesture (hands pressing together toward a point) whenever a squeeze problem appears, since the gesture directly encodes "both bounds must meet."
- **Anti-analogy — l'Hôpital's rule is NOT "cross-multiply and simplify."** Some learners try to reframe l'Hôpital's rule as an algebraic simplification trick. It is not: it is a genuinely new theorem (built on the Mean Value Theorem, `math.calc.mean-value-theorem`, already authored) that licenses replacing an indeterminate ratio with the ratio of derivatives. Treating it as algebra invites exactly the MC-2 quotient-rule confusion.

## Demonstrations
1. **Indeterminate-form derivation, live.** Compute $\lim_{n\to\infty}\frac{2n^2+3n}{5n^2-1}$ by dividing every term by $n^2$: $\frac{2+3/n}{5-1/n^2} \to \frac{2+0}{5-0} = \frac{2}{5}$. Immediately contrast with $\lim_{n\to\infty}\frac{n^2}{5n^2-1} \to \frac{1}{5}$ — same $\infty/\infty$ shape, different answer, proving the shape alone is uninformative.
2. **l'Hôpital's rule, contrast pair.** Show the WRONG quotient-rule attempt on $\lim_{n\to\infty}\frac{\ln n}{n}$ side by side with the CORRECT separate-differentiation attempt, ending at $\frac{1/x}{1}\to 0$ vs. the dead-end $\frac{1-\ln x}{x^2}$.
3. **Squeeze theorem, scaled bound.** Start from the useless constant bound $-1\le\sin n\le1$, ask "does this tell us anything about $\frac{\sin n}{n}$ yet?" (no — wrong object, no convergence), then divide through by $n$ to reveal $-\frac1n\le\frac{\sin n}{n}\le\frac1n \to 0$.

## Discovery Questions
1. "$\lim_{n\to\infty}\frac{2n^2+3n}{5n^2-1}$ and $\lim_{n\to\infty}\frac{n^2}{5n^2-1}$ both look like $\infty/\infty$. Are they the same limit? Compute both and see."
2. "If $a_n \to L$ and you can show $-c_n \le a_n - L \le c_n$ for some sequence $c_n \to 0$, what can you conclude? What if $c_n \to 5$ instead of $0$?"
3. "l'Hôpital's rule differentiates numerator and denominator separately. Try differentiating $\frac{\ln n}{n}$ as a whole fraction (quotient rule) instead — does the result look like it's getting simpler or more complicated?"

## Teaching Sequence
1. **Anchor in `math.calc.limits`.** Restate: a limit asks what value is approached, and an indeterminate shape ($\infty/\infty$, $\infty-\infty$) is a diagnosis requiring a specific tool, never itself an answer — directly reusing that concept's own MC-1 (INDETERMINATE-FORM-AS-DIRECT-ANSWER, verbatim name shared with this concept's own MC-1 — see Transfer Connections) as the entry point.
2. **Technique 1 — algebraic resolution.** Work the racing-terms example (2n²+3n)/(5n²−1) to break MC-1's fresh instance in the sequence-limit setting.
3. **Technique 2 — l'Hôpital's rule via continuous extension.** Introduce the idea of extending $a_n=f(n)$ to a continuous $f(x)$, justify the extension informally (if $f(x)\to L$ as a continuous limit, the sequence must follow along the integers), then apply separate differentiation to $\frac{\ln n}{n}$, contrasting against the quotient-rule dead end to break MC-2.
4. **Technique 3 — the squeeze theorem.** Introduce the sandwich picture, apply it first to the useless constant bound (to make the gap visible), then to the scaled bound that actually works, breaking MC-3.
5. **Synthesis.** Given a fresh sequence, the learner must first classify which of the three techniques applies (algebraic manipulation for a polynomial ratio, l'Hôpital's rule for a ratio involving logs/exponentials/genuinely differentiable pieces, or the squeeze theorem for anything oscillating), then execute it.
6. **Mastery gate**, 4-item problem set plus 1 transfer probe (independence mode — see Curriculum Feedback).

## Tutor Actions
- **Conflict evidence (MC-1):** show two different $\infty/\infty$ ratios converging to different finite values, forcing the learner to abandon "the shape is the answer."
- **Contrast pair (MC-2):** side-by-side wrong quotient-rule derivative vs. correct separate-term derivative for the same fraction.
- **Representation shift (MC-3):** re-derive the useless trivial bound into the working scaled bound live, narrating why the scaling step is necessary rather than optional.
- **Mastery gate**, 4-item problem set (one per technique plus one synthesis item requiring technique identification) plus 1 transfer probe.

## Voice Teaching Notes
- Say the shape name aloud as a question, not a statement: "this is shaped like infinity over infinity — is that itself a value, or a signal that we need to dig further?" — forces the learner to articulate the diagnosis-vs-answer distinction rather than silently accept it.
- For l'Hôpital's rule, narrate the two derivatives as physically separate actions: "put your hand over the denominator, differentiate only the numerator... now cover the numerator, differentiate only the denominator... now put the two new pieces back together as a ratio." The gesture reinforces "separate, then recombine," directly countering the quotient-rule reflex.
- For the squeeze theorem, use the sandwich gesture (hands closing toward a point) every time — a spoken description alone tends not to stick as well as the paired gesture, per this campaign's established `math.geom`/`math.calc` voice-note convention of pairing an abstract inequality with a concrete physical action.

## Assessment Signals
- **Early warning for MC-1:** a learner states "$\infty/\infty$" (or "$\infty-\infty$") as a final answer with no further algebraic step — treat this as diagnostic evidence the misconception is live, not merely an incomplete answer.
- **Early warning for MC-2:** any appearance of the quotient-rule expression $\frac{f'g-fg'}{g^2}$ during an l'Hôpital's-rule problem is a direct signal of the conflation, even before the final numeric answer is checked.
- **Early warning for MC-3:** citing a bound without checking (or stating) that both sides converge to the *same* value — e.g. writing $-1\le\sin n\le1$ and jumping straight to a limit conclusion without the intervening scaling step.
- **Mastery evidence:** correctly classifying which of the three techniques a fresh, unseen sequence calls for, before executing it — technique *selection* is the higher-order skill this concept ultimately targets, beyond correct execution of a technique already named for the learner.

## Tutor Recovery Strategy
- On MC-1: never simply state "that's not the answer" — supply the second $\infty/\infty$ example with a *different* limit value immediately, so the learner discovers the shape's uninformativeness directly rather than being told to trust it.
- On MC-2: do not re-explain the quotient rule (the learner already knows it correctly for ordinary derivatives) — instead isolate the two separate differentiations physically (cover-one-term technique above) so the *procedure* itself becomes visibly different from the quotient rule, rather than arguing in the abstract that "they're different."
- On MC-3: return to the failed trivial-bound case explicitly before showing the working scaled bound — the repair only lands if the learner sees *why* the naive bound fails, not just *that* a different bound succeeds.
- If a learner fails at the technique-selection level (correctly executes a technique once told which one to use, but cannot choose it independently), return to the synthesis step of the Teaching Sequence rather than re-drilling any single technique in isolation.

## Memory Hooks
- "A shape is a diagnosis, not a prescription" — for MC-1, repeated as the standing rule for every indeterminate form encountered in this campaign's calculus domain (first stated for `math.calc.limits` itself).
- "Separate then recombine, never the quotient rule" — for l'Hôpital's rule, paired with the cover-one-term gesture.
- "Both slices must meet" — for the squeeze theorem, paired with the closing-hands gesture.

## Transfer Connections
- **`math.calc.limits`**: this concept's own MC-1 is the *identical* mechanism (naming $\infty/\infty$ as an answer) already documented for continuous-function limits, now recurring in the discrete/sequence setting — the third time this specific misconception has been tracked across this campaign (also seen in `math.calc.riemann-sums`' own MC-3, per that entry's own cross-reference to `math.calc.limits`).
- **`math.calc.mean-value-theorem`**: l'Hôpital's rule is built on the Mean Value Theorem (specifically its Cauchy generalization); this concept treats that dependency as background justification rather than re-deriving it, consistent with this program's Blueprint-reuse-by-reference discipline.
- **`math.seq.series-convergence`** (unlocked by this concept, not yet authored): the nth-term test for series divergence directly reuses sequence-limit computation — if $\lim_{n\to\infty}a_n \ne 0$, the series $\sum a_n$ diverges. This concept supplies the exact computational toolkit that test depends on.

## Cross-Subject Connections
- **Physics** (`phys.mech.*`, not yet cross-linked in the KG for this concept): sequence limits underlie the mathematical treatment of discrete-time approximations converging to continuous motion (e.g., a discretized position sequence converging to a continuous trajectory as the time step shrinks) — a natural future cross-link candidate, not claimed here since the KG's own `cross_links` field for this concept names only `math.seq.convergent`.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.calc.sequence-limits.md` (older 10-component format: Metadata, Cognitive Map — not present as a separate numbered component in this Blueprint's own text but folded into Learning Objectives, Prerequisite Check, Core Explanation, Worked Examples, Teaching Actions, Misconception Registry, Cross-Blueprint Dependencies, Teaching Notes, Validation Checklist). All three worked examples (racing-terms polynomial ratio, l'Hôpital's-rule log-over-linear ratio, squeeze-theorem oscillating ratio) and all three misconceptions (MC-1/MC-2/MC-3, none carrying an explicit birth-type column) are reused by reference, never restated verbatim beyond the minimal illustrative excerpts above.
- **Curriculum Feedback — P76_mode discrepancy, resolved.** The Blueprint's own Component 7 (Cross-Blueprint Dependencies) states: *"Cross-link: KG lists `math.seq.convergent` as a cross-link — **authored** (checked via `ls docs/curriculum/blueprints/` before setting P76_mode). $P76_{mode}=$ **cross-link probe**..."* This check verifies **Blueprint-file** existence, not **Educational-Brain-entry** existence — and a direct check (`ls educational-brain/concepts/mathematics/ | grep -i convergent`) confirms `math.seq.convergent` has **no Educational Brain entry yet** (it appears in this same batch's own frontier computation as an unauthored, topologically-ready candidate). This is the same class of Blueprint-staleness-adjacent finding first identified in Batch 48 for `math.calc.optimization.md`/`math.calc.multivariable-extrema.md` (whose Blueprints likewise checked Blueprint-file existence rather than EB-entry existence for their own `math.opt.*` cross-links). Per this program's own established convention: **this entry's own P76 transfer probe below uses INDEPENDENCE mode** rather than the Blueprint's stated "cross-link probe" mode, since genuinely engaging `math.seq.convergent`'s formal ε-N content would require that concept's own not-yet-written Educational Brain entry. The Blueprint itself is left unmodified; this finding is recorded here for a future session authoring `math.seq.convergent` to close.
- Independent transfer probe (independence mode, per the resolution above): "A sequence is defined by $a_n = \frac{3n^2 - n}{n^2 + 2}$. (a) Identify the indeterminate shape and resolve it algebraically to find $\lim_{n\to\infty}a_n$. (b) A second learner claims $\lim_{n\to\infty}\frac{\sin(n^2)}{n} = 0$ by the squeeze theorem — verify this claim by identifying valid bounding sequences that converge to the same limit." *(Expected: (a) divide by $n^2$: $\frac{3-1/n}{1+2/n^2}\to 3$. (b) $-1\le\sin(n^2)\le1$ scaled by $1/n$: $-\frac1n\le\frac{\sin(n^2)}{n}\le\frac1n$, both $\to0$, so the claim is correct.)*

## Runtime Asset References
- No AssetIdentity (ADR 14) explanation or probe assets exist yet for this concept in `src/lib/teaching/assets/`. Per this program's established layer-ownership boundary, Layer 3/7 (DB-backed serving assets) is out of scope for this Educational Brain authoring campaign — this entry is Layer 2 (Educational Brain) content only.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy** for `requires`, `unlocks`, `cross_links`, `difficulty`, `bloom`, `mastery_threshold`, and `estimated_hours` — every field in the Blueprint's Component 0 metadata table matches the live KG exactly (verified by direct Python query against `docs/mathematics/kg/graph.json`).
- **The P76_mode/Blueprint-staleness finding is the substantive item this batch**, fully described in Blueprint References above: the Blueprint's declared "cross-link probe" mode for its P76 transfer probe rests on a Blueprint-file-existence check rather than an EB-entry-existence check, and since `math.seq.convergent` has no EB entry yet, this entry's own transfer probe uses independence mode instead. This is the second occurrence of this specific finding pattern this campaign (first: Batch 48, `math.opt.*` siblings of `math.calc.optimization`/`math.calc.multivariable-extrema`).

## Version History
- **2026-09-12 (Batch 53)**: authored as part of the Mathematics Educational Brain completion campaign. Closes the sole topologically-ready `math.calc` frontier candidate at this point in the campaign (requires `math.calc.limits`+`math.seq.sequence`, both already authored). `math.calc` moves from 62/76 to 63/76. Resolves and records a Blueprint-staleness-adjacent P76_mode finding regarding `math.seq.convergent` (see Blueprint References / Curriculum Feedback). Unlocks `math.seq.series-convergence` (not yet authored).
