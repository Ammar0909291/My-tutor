# math.func.composition — Function Composition (Order Matters, the Two-Gate Domain Rule, Decomposition for the Chain Rule)

## Identity
- **KG ID:** `math.func.composition`
- **Domain:** math.func (Functions)
- **Requires:** `math.func.function-concept`
- **Unlocks:** `math.calc.chain-rule`
- **Cross-links:** `math.calc.chain-rule`
- **Difficulty:** proficient
- **Bloom level:** apply
- **Mastery threshold:** 0.8 (MAMR 4/5)
- **Estimated hours:** 5

## Learning Objective
By the end of this concept, the student can: (1) correctly compute $(f\circ g)(x)=f(g(x))$, identifying $g$ as the inner function (applied first) and $f$ as the outer function (applied second), reading $f\circ g$ as "$f$ AFTER $g$"; (2) correctly determine the domain of a composition via the two-gate rule — $x$ must be in the domain of $g$, AND $g(x)$ must be in the domain of $f$; (3) verify that composition is not commutative in general, and decompose a given composite expression $h(x)$ into inner and outer functions $g$ and $f$ such that $h=f\circ g$, the exact skill the chain rule depends on.

## Core Understanding
`math.func.function-concept` established what a function is and how a single function maps inputs to outputs. This concept develops COMPOSITION — chaining two functions so that one function's output becomes the next function's input.

COMPOSITION FEEDS ONE FUNCTION'S OUTPUT INTO ANOTHER'S INPUT, RIGHT-TO-LEFT: $(f\circ g)(x)=f(g(x))$ means $g$ acts FIRST (on the original input $x$), and $f$ acts SECOND (on $g$'s output). Reading the symbol $\circ$ as "AFTER" — $f\circ g$ means "$f$ after $g$" — correctly identifies $g$ as the inner (first) function and $f$ as the outer (second) function, matching an assembly line where one station processes raw material first, and a second station processes that station's output.

THE DOMAIN OF A COMPOSITION REQUIRES TWO GATES, BOTH OPEN: for $x$ to be in the domain of $f\circ g$, TWO conditions must BOTH hold: (1) $x$ must be in the domain of $g$ (so $g$ can even be evaluated at $x$), AND (2) $g(x)$ — the OUTPUT of $g$ — must be in the domain of $f$ (so $f$ can be evaluated at that output). Checking only the first gate and forgetting the second is a genuine, common gap: a value can pass cleanly into $g$ and yet produce an output that $f$ cannot accept.

COMPOSITION IS NOT COMMUTATIVE: unlike ordinary multiplication of numbers, $f\circ g$ and $g\circ f$ are, in general, DIFFERENT functions — feeding $g$ into $f$ is a structurally different process from feeding $f$ into $g$, since the two functions are typically different operations (adding, squaring, taking a reciprocal) that interact differently depending on the order applied. Some SPECIFIC pairs happen to commute (e.g. two linear functions through the origin, $f(x)=2x$ and $g(x)=3x$, both give $6x$ either order) — but this is a coincidence of that specific pair, never a general rule to assume.

DECOMPOSING A COMPOSITE EXPRESSION IS THE SKILL THE CHAIN RULE REQUIRES: given a composite expression like $h(x)=(2x+1)^3$, identifying the OUTERMOST operation (cubing) as $f(u)=u^3$ and the expression being cubed (the INNER part, $2x+1$) as $g(x)=2x+1$ verifies $h=f\circ g$. This decomposition — reliably identifying "what is inside" versus "what is applied to it" — is exactly the structural prerequisite the chain rule of differential calculus depends on to differentiate composite functions.

## Mental Models
1. **Rung 1 — in $f\circ g$, the function on the RIGHT runs first.** Reading the symbol as "$f$ AFTER $g$" correctly identifies the inner (first) and outer (second) function every time, resisting the natural but incorrect left-to-right reading.
2. **Rung 2 — a composition's domain has two independent gates, and BOTH must be open.** Passing the first gate (being in $g$'s domain) says nothing about whether the resulting output can pass the second gate (being in $f$'s domain).
3. **Rung 3 — composition order genuinely changes the result, because the two functions being chained are typically different operations that interact differently in either order.** Commuting pairs exist but are the exception, never the default assumption.

## Why Students Fail
Because the symbol $\circ$ sits between $f$ and $g$ visually similarly to how a left-to-right reading order applies to ordinary text and to multiplication ($f\times g$ reads $f$ then $g$), students very commonly read $f\circ g$ as "$f$ first, then $g$" — precisely backward from the correct convention, where the function on the RIGHT actually runs first. Having internalized the mechanics of substitution well enough to compute $f(g(x))$ correctly, students under time pressure often check only whether $x$ itself is in $g$'s domain, forgetting the SECOND, equally necessary gate — that $g(x)$, the resulting output, must ALSO land within $f$'s domain — a gap invisible unless the intermediate output is explicitly checked. Finally, having just learned that ordinary multiplication is commutative, and encountering composition notation that superficially resembles multiplication, students extend this commutativity assumption to composition, missing that composition is a structurally different KIND of operation (chaining, not combining) that does not inherit commutativity from arithmetic.

## Misconceptions

### MC-1: COMPOSITION-REVERSED
- **Birth type:** Type 3 (language contamination) — per this Blueprint's own "FOUNDATIONAL" priority, independently confirmed
- **Description:** Believing $(f\circ g)(x)=g(f(x))$ — applying $f$ first, then $g$ — the exact reverse of the correct convention.
- **Why this birth type:** Language contamination: reading $f\circ g$ left-to-right, as one would read ordinary text or a multiplication expression ($f\times g$), invites the false belief that $f$ acts first; the $\circ$ symbol's visual placement between the two function names encourages this natural but incorrect left-to-right reading.
- **Detection probe:** "Let $f(x)=x^2$ and $g(x)=x+3$. Compute $(f\circ g)(2)$." A student with MC-2 computes $g(f(2))=g(4)=7$ instead of the correct $f(g(2))=f(5)=25$.
- **Repair:** Emphasize explicitly: "$f\circ g$ means $f$ AFTER $g$ — $g$ runs first." Use the assembly-line analogy (a two-stage factory where station $g$ processes raw material first, and station $f$ processes $g$'s output second) and verify $(f\circ g)(2)=f(g(2))=f(5)=25$ directly, step by step.
- **Verification of death:** Given $f\circ g$, the student consistently identifies $g$ as the function applied first (the inner function) and $f$ as applied second (the outer function), regardless of how the expression is phrased.

### MC-2: DOMAIN-IGNORED
- **Birth type:** Type 1 (overgeneralization) — per this Blueprint's own classification (unprioritized, addressed after MC-1), independently confirmed
- **Description:** Believing the domain of $f\circ g$ is simply the domain of $g$, ignoring the additional constraint that $g(x)$ must also lie in the domain of $f$.
- **Why this birth type:** Overgeneralization from the mechanics of substitution (compute $g(x)$, then substitute into $f$) without extending the same care to checking whether the resulting output is actually acceptable to $f$ — students focus on the computational mechanics and skip the second domain check.
- **Detection probe:** "For $f(x)=\sqrt{x}$ (domain $x\ge0$) and $g(x)=x-4$, what is the domain of $(f\circ g)(x)$?" A student with MC-2 answers $\mathbb{R}$ (the full domain of $g$), missing the second gate.
- **Repair:** Apply the two-gate framing explicitly: Gate 1, $x\in\text{dom}(g)=\mathbb{R}$ (always open); Gate 2, $g(x)=x-4\ge0\Rightarrow x\ge4$ (open only when $x\ge4$) — so $\text{dom}(f\circ g)=[4,\infty)$, genuinely narrower than $g$'s own domain.
- **Verification of death:** Given a composition, the student explicitly checks BOTH gates — membership in $g$'s domain AND $g(x)$'s membership in $f$'s domain — before stating the composition's domain.

### MC-3: COMPOSITION-COMMUTATIVE
- **Birth type:** Type 1 (overgeneralization) — per this Blueprint's own classification, independently confirmed
- **Description:** Believing $f\circ g=g\circ f$ always, so the order of composition doesn't matter, extending ordinary multiplication's commutativity incorrectly to function composition.
- **Why this birth type:** Overgeneralization: multiplication of numbers is commutative, and students extend this familiar property to function composition without recognizing that composition is a structurally different operation (chaining outputs into inputs) rather than simply combining two values.
- **Detection probe:** "For $f(x)=x+1$ and $g(x)=2x$, is $f\circ g$ the same function as $g\circ f$?" A student with MC-3 answers "yes."
- **Repair:** Compute both directly: $(f\circ g)(x)=f(2x)=2x+1$ versus $(g\circ f)(x)=g(x+1)=2(x+1)=2x+2$ — these differ by exactly 1 for every $x$, a decisive counterexample. Note (without overgeneralizing in the other direction) that some SPECIFIC pairs, like $f(x)=2x$ and $g(x)=3x$, do happen to commute (both give $6x$) — a coincidence of that pair, not a general rule.
- **Verification of death:** Given a fresh pair of functions, the student computes $f\circ g$ and $g\circ f$ independently, expecting them to differ by default, and only accepts equality when directly verified.

## Analogies
1. **The two-stage assembly line analogy (targets MC-1).** A factory has Station G (melts and molds raw plastic into tubes) and Station F (cuts tubes to length and labels them). The finished product is the result of Station G THEN Station F — running Station F first (labeling before tubes even exist) simply fails. $(f\circ g)(x)$ works identically: $g$ must run first, feeding its result to $f$.
2. **The two-checkpoint airport analogy (targets MC-2).** Two security checkpoints must BOTH be cleared: Checkpoint G requires a valid ticket; Checkpoint F requires your bag to weigh under 10 kg. Passing Checkpoint G doesn't guarantee passing Checkpoint F — both conditions are independently necessary, exactly like the composition's two domain gates.

## Demonstrations
### Demonstration 1 — order matters, computed directly (mirrors Blueprint TA-A01)
$f(x)=x^2$, $g(x)=x+3$: $(f\circ g)(x)=f(g(x))=f(x+3)=(x+3)^2$, while $(g\circ f)(x)=g(f(x))=g(x^2)=x^2+3$. At $x=2$: $(f\circ g)(2)=f(5)=25$ while $(g\circ f)(2)=g(4)=7$ — genuinely different results, confirming $f\circ g\ne g\circ f$.

### Demonstration 2 — the two-gate domain rule and decomposition (mirrors Blueprint TA-A02)
For $f(x)=1/x$ (domain $x\ne0$) and $g(x)=x^2-4$: $(f\circ g)(x)=1/(x^2-4)$. Gate 1: $x\in\text{dom}(g)=\mathbb{R}$ (always open). Gate 2: $g(x)=x^2-4\ne0\Rightarrow x\ne\pm2$. Combined domain: $\mathbb{R}\setminus\{-2,2\}$ — excluding exactly the two points where the denominator vanishes. Decomposing $h(x)=(3x-2)^4$: the outermost operation is raising to the 4th power, so $f(u)=u^4$ (outer) and $g(x)=3x-2$ (inner), verified by $f(g(x))=(3x-2)^4=h(x)$.

### Demonstration 3 — non-commutativity across three pairs, and the chain-rule preview (mirrors Blueprint TA-A03)
Pair 1: $f(x)=x+1$, $g(x)=2x$: $(f\circ g)(x)=2x+1$ versus $(g\circ f)(x)=2x+2$ — DIFFERENT. Pair 2: $f(x)=x^2$, $g(x)=x+3$: $(x+3)^2$ versus $x^2+3$ — DIFFERENT. Pair 3: $f(x)=2x$, $g(x)=3x$: both give $6x$ — SAME (a coincidence of this specific linear pair, not a general rule). Decomposing $h(x)=(2x+1)^3$ into $f(u)=u^3$ (outer), $g(x)=2x+1$ (inner) directly previews the chain rule: $h'(x)=f'(g(x))\cdot g'(x)=3(2x+1)^2\cdot2$.

## Discovery Questions
1. "In $f\circ g$, does $f$ or $g$ run first? Compute $(f\circ g)(2)$ for $f(x)=x^2$ and $g(x)=x+3$ to check your answer."
2. "$g(x)=x-4$ has domain $\mathbb{R}$. Does that mean $f(g(x))=\sqrt{x-4}$ also has domain $\mathbb{R}$?"
3. "Multiplication of numbers is commutative. Is function composition also commutative? Test it with $f(x)=x+1$ and $g(x)=2x$."

## Teaching Sequence
Best taught by the **Concrete CPA entry stage — specific numbers through two specific functions, verified by substitution, BEFORE the symbolic definition**, matching the Blueprint's own CPA progression (Concrete → Pictorial → Abstract); the assembly-line analogy and numerical verification ground the order convention before generalizing to arrow diagrams and formal domain rules.
1. Establish the "right-to-left, $g$-first" convention via Demonstration 1, posing Discovery Question 1 and correcting MC-1 immediately via the assembly-line analogy, per this concept's own FOUNDATIONAL-priority MAMR ordering (MC-1 must clear before MC-2 or MC-3 content proceeds).
2. Introduce the two-gate domain rule and decomposition via Demonstration 2, posing Discovery Question 2 before confirming both gates are independently necessary.
3. Work the three-pair non-commutativity pattern via Demonstration 3, posing Discovery Question 3 before previewing the chain-rule connection.
4. Assess with the P77 problem set and the chain-rule-preview transfer probe (P76, cross-link mode per the Blueprint's own Tier-1 classification of `math.calc.chain-rule`).

## Tutor Actions
1. **On any composition computation:** require the student to state explicitly which function is inner (runs first) and which is outer (runs second) before computing.
2. **On any composition-domain question:** require both gates checked explicitly — membership in $g$'s domain, and $g(x)$'s membership in $f$'s domain.
3. **On any $f\circ g$-versus-$g\circ f$ question:** require independent computation of both orders before any equality claim is accepted.

## Voice Teaching Notes
1. **Register:** proficient/applied — this concept assumes fluency with function evaluation from the prerequisite and introduces a genuinely order-sensitive chained operation.
2. **Load-bearing sentence, spoken slowly:** "$f\circ g$ means $f$ AFTER $g$ — the function on the right runs first."
3. **Wait time:** pause after Discovery Question 1, letting the student genuinely attempt both possible readings before confirming which is correct via direct computation.

## Assessment Signals
1. **Gate concept:** correctly computes $(f\circ g)(x)$ and $(g\circ f)(x)$ for a novel pair, identifying inner and outer functions correctly.
2. **Two-gate domain fluency:** correctly determines the domain of a composition by checking both gates independently.
3. **Non-commutativity discrimination:** correctly verifies whether a specific pair of functions commutes under composition, without assuming commutativity by default.
4. **Decomposition fluency:** given a composite expression, correctly identifies the outer and inner functions, verifying the decomposition by direct substitution.
5. **Transfer:** decomposes a fresh composite expression and correctly applies the chain-rule structure (identifying $f'(u)$, $g'(x)$, and the product $f'(g(x))\cdot g'(x)$) at a preview level, without computing derivatives from scratch.

## Tutor Recovery Strategy
If the student reverses composition order, work several fresh pairs with the assembly-line framing and explicit step-by-step substitution until "$g$ runs first" is automatic. If the student ignores the second domain gate, work several fresh compositions with a genuinely restrictive outer function until checking both gates becomes standard practice. If the student assumes commutativity, work fresh pairs computing both orders explicitly until non-equality is the expected default, distinguishing genuinely coincidental commuting pairs when they arise.

## Memory Hooks
1. "$f\circ g$ is $f$ AFTER $g$ — the right-hand function goes first."
2. "Two gates, both must open: $x$ in $g$'s domain, AND $g(x)$ in $f$'s domain."
3. "Composition genuinely depends on order — swapping f and g usually changes everything."

## Transfer Connections
- **`math.func.function-concept`:** the function-as-mapping idea this concept extends by chaining two mappings, where the codomain of the inner function becomes (part of) the domain of the outer.
- **`math.func.function-operations`:** the pointwise-product-versus-composition distinction introduced there is the direct entry point into this concept's full theory.
- **`math.calc.chain-rule`** (cross-link, currently unauthored): decomposing a composite function into inner and outer parts is the exact structural skill the chain rule's derivative formula, $h'(x)=f'(g(x))\cdot g'(x)$, requires — this entry's own transfer probe previews that connection directly.

## Cross-Subject Connections
- **Computer Science (function pipelines, higher-order functions):** composition directly models chaining transformations in a data pipeline, where output-to-input order determines the final result.
- **Physics (composite rates of change, unit conversion chains):** composed functions model chained physical relationships (e.g. converting between unit systems through an intermediate quantity), where the chain rule later provides the tool to differentiate such chains.

## Blueprint References
- Primary source: `docs/curriculum/blueprints/math.func.composition.md` — reused by reference throughout (Cognitive Map, misconception registry MC-1–MC-3, the full teaching-action sequence TA-A01–TA-A04, the P76 transfer probe previewing the chain rule, cross-link mode per that Blueprint's own Component 7/GR-9 classification of `math.calc.chain-rule` as a Tier-1 cross-link). Not restated verbatim; this entry adds the mental-model ladder, discovery-vs-direct-instruction argument, voice teaching notes, memory hooks, and cross-subject connections per `EDUCATIONAL_BRAIN_STANDARD.md`'s ownership boundary. All 3 misconceptions confirmed against this program's own taxonomy: MC-1 Type 3 (language contamination — the left-to-right reading of the $\circ$ symbol), MC-2 Type 1, MC-3 Type 1.
- Cross-link: `math.calc.chain-rule` is confirmed genuinely unauthored (neither Blueprint nor Educational Brain entry exists, math.calc domain 0/76) — this entry's own transfer probe content, reused directly from the Blueprint's self-contained P76 (decomposing $(2x+1)^3$ and previewing the chain-rule derivative formula), stands independently of that concept's own future authoring, matching the Blueprint's own design intent.

## Runtime Asset References
- No AssetIdentity rows exist for this concept yet (Layer 3/7 DB-backed assets are populated separately, by live LLM generation plus admin review or by deliberate seed-script batches — never by this authoring layer). This entry is Layer 1/2 content only.

## Curriculum Feedback
- No genuine Blueprint/KG metadata discrepancy found — requires, unlocks, cross_links, difficulty, bloom, mastery_threshold, and estimated_hours all match the live KG exactly.
- Confirmed genuinely unauthored: `math.calc.chain-rule` (no Blueprint, no EB entry) — recorded here as a standing forward note for whenever the `math.calc` domain is eventually opened; that future entry should incorporate this concept's own decomposition skill directly by reference rather than re-deriving it.

## Version History
- **Batch 29** (2026-09-12): initial authoring, part 2 of 4 this batch (with `math.func.function-operations`, `math.func.monotonic-function`, `math.func.bijection`), continuing `math.func` as a standalone domain campaign. Blueprint reused by reference; 3 misconceptions birth-type classified (MC-1 Type 3, MC-2 Type 1, MC-3 Type 1).
