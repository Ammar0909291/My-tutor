# math.alg.fractional-exponent

## Identity
- **KG ID**: `math.alg.fractional-exponent`
- **Domain**: math.alg (Algebra)
- **Requires**:
  - `math.alg.exponent-rules` — load-bearing part: a fractional exponent must obey every exponent law already established for integer exponents (product, power-of-a-power, etc.) — this concept extends the exponent system rather than starting a new one, and that extension only makes sense against an already-secure integer-exponent base.
  - `math.alg.radicals` — load-bearing part: the defining identity a^(m/n) = ⁿ√(aᵐ) is a statement of equivalence between two already-known objects (a power and a radical); without radicals already meaning something concrete, the definition has nothing to anchor to.
- **Unlocks**: none in the KG
- **Cross-links**: none in the KG
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.8 (MAMR = ⌈0.8×5⌉ = 4/5)
- **Estimated hours**: 4
- **Blueprint**: `docs/curriculum/blueprints/math.alg.fractional-exponent.md` (reused by reference throughout)

## Learning Objective
- The learner can convert between fractional-exponent notation a^(m/n) and radical notation ⁿ√(aᵐ) or (ⁿ√a)ᵐ, in both directions.
- The learner can correctly identify that the DENOMINATOR n of the fractional exponent is the root's index, and the NUMERATOR m is the power — never the reverse.
- The learner can choose, when evaluating by hand, the more efficient of the two equivalent computation orders — taking the root first, then raising to the power — to keep intermediate numbers manageable.

## Core Understanding
A fractional exponent a^(m/n) is defined so that it agrees with radical notation exactly: a^(m/n) = ⁿ√(aᵐ), and equivalently (ⁿ√a)ᵐ — these two forms are provably equal by the exponent power-of-a-power rule, ((a^(1/n))^m = a^(m/n) = (a^m)^(1/n)), and this is not a coincidence to be memorised twice, it is the single reason both orders of computation are valid. The bottom number of the fraction, n, is always the root's index — how many times a value must be multiplied by itself to recover the original — while the top number, m, is always the power the result is then raised to. Because both orders reach the identical answer, the practical choice between them is purely a matter of arithmetic convenience: taking the root first shrinks the base to a small number before any exponentiation happens, while raising to the power first can produce an enormous intermediate value that must then have a root extracted from it — both are mathematically correct, but one is dramatically easier to compute by hand. This concept exists specifically to unify two notational systems that otherwise look unrelated (exponents and radicals) into one coherent object, so that every later rule — including in contexts like growth and decay formulas where fractional powers appear naturally — can be handled with ordinary exponent manipulation rather than a separate radical-specific toolkit.

## Mental Models
1. **Beginner — the fraction has two jobs, and they don't switch.** The bottom number picks which root; the top number picks which power. a^(2/3): 3 is the root (bottom), 2 is the power (top). *Upgrade trigger*: an actual numeric evaluation, where "which job is which" alone doesn't yet suggest which order to compute in. *Shelf life*: one session, and it remains true forever — it just needs the computation-order model layered on next.
2. **Intermediate — root first, then power, because the numbers stay smaller.** 27^(4/3) computed as (∛27)⁴ = 3⁴ = 81 stays small throughout; computed as ∛(27⁴) = ∛531441 reaches the same answer through a much larger intermediate number. *Upgrade trigger*: needing to justify *why* both orders give the same answer, not just observing that they happen to. *Shelf life*: durable and practically load-bearing for the rest of this learner's mathematical life — this is the operational habit that matters most day to day.
3. **Advanced — a^(m/n) is a single, well-defined real number precisely because (a^(1/n))^m and (a^m)^(1/n) are provably equal, by the power-of-a-power exponent rule applied in either order.** The notation is not ambiguous or a convenient shorthand; it is a genuinely single value with two equivalent construction routes. *Upgrade trigger*: negative or fractional bases, or even-index roots of negative numbers, where the "provably equal" claim needs its domain restrictions made explicit (not required at this concept's own scope, but the natural next question).
4. **Expert — radicals were never a separate topic from exponents; they are exponents restricted to rational values, and fractional-exponent notation is the moment that becomes explicit.** Every rule already known for integer exponents (product of powers, power of a power, power of a product) continues to hold, unmodified, once exponents are allowed to be any rational number. *Shelf life*: permanent, and it is the model that makes irrational (and eventually complex) exponents feel like a continuation of the same idea rather than a new one, later in mathematics.

## Why Students Fail
The single most damaging failure is a structural misreading of the notation itself: the learner swaps which part of the fraction m/n controls the root and which controls the power, computing 16^(3/4) as (∛16)⁴ instead of the correct (⁴√16)³ — using the numerator as the root index and the denominator as the power. This is not a minor slip; it produces a genuinely different, usually messier computation (∛16 is not a clean integer, while ⁴√16 = 2 is), and because the error is structural rather than arithmetic, the learner can execute every subsequent step flawlessly and still arrive at a wrong or needlessly complicated answer with no local signal that anything went wrong. The second failure is not a validity error but an efficiency one: the learner computes the power before the root by default, without consciously choosing the more convenient order, because no explicit habit of comparing the two orders was ever built — 27^(4/3) gets attacked as ∛(27⁴), forcing arithmetic with 531,441 where 3⁴ = 81 would have sufficed, and the larger numbers involved measurably increase the chance of an arithmetic slip along the way even though the method itself is not wrong.

## Misconceptions
Reused by reference from the Blueprint's Component 6 registry (MC-1..MC-2) and its repair actions B01–B02, with birth-type classification added.

- **MC-1 — POWER-FIRST-COMPUTATION-ORDER-DEFAULTED-TO-INEFFICIENTLY** (moderate)
  - **Birth type**: Type 5, instruction-induced — without an explicit, deliberately built habit of comparing the two valid computation orders, the learner defaults to whichever order the notation is read left-to-right or top-to-bottom, which is not reliably the more efficient one.
  - **Characteristic phrase**: evaluating 27^(4/3) by computing 27⁴ = 531,441 first, then attempting ∛531,441.
  - **Detection probe** (verbatim, Blueprint P77 item 2): "Evaluate 32^(2/5), choosing the more efficient computational order." A learner who computes 32² = 1024 first, rather than ⁵√32 = 2 first, confirms MC-1.
  - **Repair**: Blueprint Repair Action B01 — re-work the identical problem root-first, placing the two intermediate-number sizes side by side so the size difference is directly visible rather than asserted.
  - **Verification of death**: given a new fractional-exponent evaluation, the learner takes the root first unprompted and can state why.

- **MC-2 — FRACTIONAL-EXPONENT-NUMERATOR-DENOMINATOR-ROLES-SWAPPED** (FOUNDATIONAL)
  - **Birth type**: Type 4, notation-induced — the fraction m/n gives no visual cue about which part means "root" and which means "power," and a learner without an explicit, rehearsed labeling habit is equally likely to guess either assignment.
  - **Characteristic phrase**: evaluating 16^(3/4) as (∛16)⁴ rather than the correct (⁴√16)³.
  - **Detection probe** (verbatim, Blueprint P41): present Example 3 (16^(3/4)) and check whether (∛16)⁴ or the correct (⁴√16)³ is computed.
  - **Repair**: Blueprint Repair Action B02 — restate the rule with an unambiguous verbal label, "denominator is always the root, numerator is always the power," and require this labeling to be stated explicitly before any computation begins.
  - **Verification of death**: given a′s new fractional exponent, the learner labels which number is the root index and which is the power correctly, unprompted, before computing anything.

## Analogies
- **Best — two independent labeled slots in the fraction.** The bottom slot always answers "which root," the top slot always answers "which power" — like a shipping label with a fixed "FROM" line and a fixed "TO" line that never swap roles no matter which specific values fill them. This directly targets MC-2 by giving the positions themselves a fixed, memorable identity independent of the numbers involved.
- **Alternative — choosing the shorter of two equivalent routes to the same destination.** (ⁿ√a)ᵐ and ⁿ√(aᵐ) are two roads to the identical destination; one road has smaller numbers to carry along the way. This targets MC-1 directly, framing the order choice as route-selection rather than as a rule to memorise.
- **Story analogy** — a recipe that can be halved-then-tripled or tripled-then-halved, reaching the same final quantity either way, but one order leaves smaller intermediate amounts to measure — mirrors the root-first-versus-power-first efficiency choice in an entirely non-mathematical setting.
- **ANTI-ANALOGY — "top number first, since you read top to bottom."** This has no mathematical basis and directly licenses MC-2 by turning notation-reading order into a (false) rule for which operation happens "first" in any privileged sense — both orders are always available regardless of which number is on top.
- **ANTI-ANALOGY — "it doesn't matter which order, they're the same anyway."** True about the *answer*, false and unhelpful about the *effort*; treating the orders as interchangeable in every respect is exactly what licenses MC-1's inefficient default.

## Demonstrations
- **The intermediate-number size race.** Evaluate 27^(4/3) both ways, live, writing out every intermediate value: (∛27)⁴ = 3⁴ = 81 alongside ∛(27⁴) = ∛531,441 = 81. *Predict which set of numbers will be smaller before computing either* — the visible size gap, not an assertion, is the demonstration, and it directly operationalises Blueprint B01's repair.
- **The label-first drill.** Before computing any fractional-exponent expression, require the learner to state aloud (or write) "the root index is ___, the power is ___" from the fraction alone, with no numbers substituted yet. This is Blueprint B02's repair, run as a standing pre-computation habit rather than a correction applied after an error.
- **The swap-and-compare.** For 16^(3/4), compute both the correct (⁴√16)³ = 8 and the swapped, incorrect (∛16)⁴ side by side, showing the swapped version does not even simplify to a clean number. This makes MC-2's consequence (a messier, not just different, computation) directly visible rather than asserted.

## Discovery Questions
Direct instruction wins for the definition itself — a^(m/n) = ⁿ√(aᵐ) = (ⁿ√a)ᵐ is a notational convention that unifies two already-known systems, and there is no genuine discovery path to *inventing* that convention; it must be stated and then its consistency (via the already-known power-of-a-power rule) demonstrated. What is discoverable, and should be surfaced as a question, is the efficiency comparison between the two equivalent computation orders: (1) **Need** — "Evaluate 27^(4/3). Try computing 27⁴ first, then the cube root." Let the arithmetic get genuinely unwieldy. (2) **Playground** — evaluate several fractional-exponent expressions both ways (root-first and power-first), recording which felt easier each time. (3) **Invention** — "Is there a pattern for which order is better?" (4) **Collision** — offer a case with a large base and small exponents where the difference is dramatic (e.g. 64^(5/6)) versus a case where both orders are comparably easy (e.g. 4^(3/2)), refining any overly rigid "always" rule the learner proposes. (5) **Formalisation** — taking the root first generally keeps numbers smaller, because it shrinks the base before any exponentiation occurs; the two orders are always mathematically equivalent regardless. (6) **Compression** — "Root first, when you have a choice — it's usually the shorter road to the same answer."

## Teaching Sequence
The role-labeling habit (TA-A01, targeting MC-2) is sequenced before the efficiency-comparison lesson (TA-A02, targeting MC-1), because a learner who has swapped the numerator/denominator roles is computing an entirely different (and often not even cleanly evaluable) expression — any efficiency judgment made on top of a role-swapped computation is meaningless, so the structural error must be cleared first. Both worked examples in the Blueprint's own Component 4 are deliberately built from perfect powers (8^(2/3), 27^(4/3), 16^(3/4)) specifically so that arithmetic difficulty never masks a role-labeling error — a learner who reaches a clean integer answer via the correct labeling, but a messy non-integer via the swapped one, receives an unambiguous signal about which computation was actually correct. The Blueprint's own Component 5 sequence (TA-A01 role-labeling via representation shift → TA-A02 efficiency contrast pair → TA-A03 mastery gate) is reused by reference and not restated turn-by-turn here.

## Tutor Actions
- **TEST-THINKING: Prediction / labeling** — the label-first drill, required before every computation until the role assignment is automatic and no longer needs to be stated aloud.
- **DO: Demonstration** — the intermediate-number size race, run live rather than presented as a finished comparison, so the size gap is discovered in the moment rather than asserted.
- **TEST-THINKING: Error Analysis** — the swap-and-compare, framed as "here's what happens if the roles get swapped" rather than as a hypothetical warning, making MC-2's consequence concrete.
- **Does NOT fit: introducing non-perfect-power bases before the role-labeling and efficiency habits are both secure.** Messy numbers obscure whether an error is a role-swap, an efficiency choice, or ordinary arithmetic, making diagnosis unreliable.
- **Does NOT fit: teaching this concept's notation without first re-confirming both prerequisite fluencies (integer exponent rules, radical simplification) are genuinely secure.** A gap in either prerequisite will surface here as a fractional-exponent-specific error it is not.

## Voice Teaching Notes
The load-bearing sentence is "bottom is the root, top is the power — always, every time." Slow down on "always" and on the words "bottom" and "top" themselves, since the whole misconception this concept is built around is a confusion of exactly those two positions. Listen for a learner stating the labels aloud confidently before computing versus reaching directly for a computation with no stated labeling step — the skipped labeling step is the strongest predictor of MC-2 firing, more reliable than watching the computation itself unfold. For the efficiency question, listen for hesitation or a visible pause before choosing a computation order — the pause is evidence the learner is genuinely comparing routes rather than defaulting reflexively, and it is the behaviour this concept is trying to install as a habit. Channel reality is owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals
- **(∛16)⁴-style role-swapped computation on 16^(3/4)** — MC-2, cleanly diagnostic on its own; route to the label-first drill, never to a bare restatement of "numerator is the power."
- **27⁴ computed before any root is taken, on an evaluation where root-first was clearly available** — MC-1; route to the intermediate-number size race so the cost is felt, not merely stated.
- **Correct labeling stated aloud but an arithmetic slip in the subsequent computation** — a narrower arithmetic-fluency gap, not this concept's own misconception; treat as ordinary arithmetic error correction, not as MC-1 or MC-2.
- **Both computation orders attempted and compared unprompted, with the smaller-numbers order chosen** — the strongest positive signal this concept produces; it indicates the efficiency habit has genuinely taken hold rather than merely being followed as an instruction.
- **Mastery trigger**: the Blueprint's TA-A03 gate, MAMR ⌈0.8×5⌉ = 4/5, including its P76 transfer probe (a biology growth-rate formula requiring both correct role-labeling and a justified efficient computation order) — a gate passed without that applied-context item does not certify that the notation genuinely transfers beyond drilled textbook problems.

## Tutor Recovery Strategy
The likely utterance is "which one is the root again?" or a frozen stare at the fraction in the exponent. The concept-specific smaller question grounds the moment directly in the labeling rule, stripped of any computation: **"In 2/3, which number tells you the root, and which tells you the power? Just the labels — don't compute anything yet."** Separating the labeling judgment from the arithmetic prevents the freeze from being compounded by a simultaneous computation demand. If the freeze is specifically about which order to compute in, shrink further: **"Which is smaller: the base itself, or the base raised to that big power?"** — a question the learner can answer from intuition alone, which then motivates taking the root (shrinking toward the smaller quantity) first. Generic machinery is owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks
- Concept type: **fact-plus-procedure** — the role-labeling identity is a fact to be recalled instantly and without hesitation, while the efficient-order choice is a procedural habit layered on top. Review the labeling fact via rapid-recall drilling (no computation attached) and the efficiency habit via full worked problems, separately, so a decay in one is diagnosable independent of the other.
- Concept-specific deviation: keep at least one item in review rotation where root-first and power-first are genuinely comparably easy (so the "always take the root first" heuristic doesn't calcify into an unthinking rule the learner applies even when it offers no advantage).
- Interleaving partners: `math.alg.exponent-rules` (every exponent law this concept's notation must remain consistent with, and the concept whose fluency gaps most often masquerade as fractional-exponent-specific errors) and `math.alg.radicals` (the other notational half of this concept's defining identity).

## Transfer Connections
- **Near**: no KG unlocks are recorded for this concept — it currently sits as a terminal leaf in `math.alg`'s dependency graph, but its content is a direct prerequisite in spirit for any future concept involving rational-exponent manipulation (e.g. simplifying expressions with mixed fractional exponents).
- **Far**: exponential growth and decay models in the sciences routinely use non-integer time exponents (e.g. half-life calculations at a fractional number of half-lives elapsed), where this concept's notation and evaluation strategy apply directly.
- **Real-world**: allometric scaling laws in biology (body-mass-to-metabolic-rate relationships expressed with fractional exponents like 3/4) and financial models using fractional-period compounding both rely on exactly this notation.
- **Expert transfer**: the general principle that a notation unifying two previously separate systems (here, exponents and radicals) is not merely a convenience but a genuine extension of one system's own internal rules — the same pattern recurs when integer exponents are later extended to irrational, and eventually complex, values.

## Cross-Subject Connections
- **Biology**, genuine: allometric scaling relationships (e.g. metabolic rate scaling with body mass raised to a fractional power, commonly 3/4) are a standard, real application of fractional-exponent notation, and the Blueprint's own P76 transfer probe uses exactly this context.
- **Physics/Chemistry**, real: half-life and exponential-decay calculations at a non-integer number of elapsed half-lives require evaluating a base raised to a fractional exponent.
- The KG records `cross_links: []` and `unlocks: []`. No specific missing edge is flagged as a probable omission — the biology/physics transfer, while genuine and already reflected in the Blueprint's own transfer probe, applies broadly across many concepts in those subjects' KGs rather than to one specific named node, consistent with an empty `cross_links` field.

## Blueprint References
`docs/curriculum/blueprints/math.alg.fractional-exponent.md`. Reused by reference, not restated: the Component 6 Misconception Registry (MC-1, MC-2), the repair actions B01–B02, the Component 5 teaching-action sequence (TA-A01 role-labeling via representation shift, TA-A02 efficiency contrast pair, TA-A03 mastery gate with its P76 biology growth-rate transfer probe), and the Component 1 learning objectives this entry's Learning Objective section restates in the Standard's own voice. This entry adds birth-type classification (including the finding that MC-2 is notation-induced by the fraction's own lack of any visual role-cue, while MC-1 is instruction-induced by the absence of an explicit order-comparison habit), the mental-model ladder culminating in the fractional-exponent-as-genuine-extension-of-integer-exponents view, the two anti-analogies, the argued direct-instruction call for the definition itself with one nested discovery arc for the efficiency comparison, the sequencing rationale for clearing the role-swap before the efficiency judgment, and the recovery-strategy shrink-to-labeling-only move.

## Runtime Asset References
No seeded `AssetIdentity` records exist for this concept. None were created here.

## Curriculum Feedback
None found. `unlocks: []` and `cross_links: []` are both reasonable reflections of this concept's current position as a terminal leaf whose cross-subject transfer (biology, physics) is broad rather than tied to one specific named node; no specific missing edge was identified during authoring.

## Version History
- v1.0 (2026-09-11): Initial authoring. Domain Certification Mode, math.alg Wave 4.
