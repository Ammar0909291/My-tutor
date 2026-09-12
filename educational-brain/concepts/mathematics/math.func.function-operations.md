# math.func.function-operations — Operations on Functions (Pointwise Operations, the Combined Domain, Product vs. Composition)

## Identity
- **KG ID:** `math.func.function-operations`
- **Domain:** math.func (Functions)
- **Requires:** `math.func.function-concept`
- **Unlocks:** `math.func.composition`
- **Cross-links:** none
- **Difficulty:** proficient
- **Bloom level:** apply
- **Mastery threshold:** 0.8 (MAMR 4/5)
- **Estimated hours:** 3

## Learning Objective
By the end of this concept, the student can: (1) define the four pointwise operations on functions — $(f+g)(x)$, $(f-g)(x)$, $(fg)(x)$, $(f/g)(x)$ — and determine the resulting domain as the intersection of the original domains (with an additional exclusion for division wherever the denominator function is zero); (2) compute these pointwise operations concretely on specific functions, correctly identifying the combined domain; (3) distinguish the pointwise product $(fg)(x)$ from composition $(f\circ g)(x)$, and correctly state that composition is not commutative, unlike pointwise addition and multiplication which are.

## Core Understanding
`math.func.function-concept` established what a function is. This concept develops the ALGEBRA OF FUNCTIONS — treating functions themselves as objects that can be combined, exactly as numbers are combined by arithmetic operations.

POINTWISE OPERATIONS COMBINE OUTPUT VALUES, AND THE DOMAIN IS THE INTERSECTION: $(f+g)(x)=f(x)+g(x)$, $(f-g)(x)=f(x)-g(x)$, and $(fg)(x)=f(x)g(x)$ each combine the two functions' OUTPUTS at each shared input — this only makes sense where BOTH $f(x)$ and $g(x)$ are defined, so the combined function's domain is the INTERSECTION of $f$'s domain and $g$'s domain. For $(f/g)(x)=f(x)/g(x)$, an ADDITIONAL restriction applies: any $x$ where $g(x)=0$ must be excluded too, since division by zero remains undefined regardless of what the intersection alone would allow.

THE COMBINED DOMAIN CAN EXCLUDE POINTS EITHER FUNCTION ALONE WOULD PERMIT: simply combining the algebraic FORMULAS of $f$ and $g$ is only half the task — the combined function's domain must be tracked separately, since a point excluded from EITHER original function cannot appear in the combination, even if the other function would happily accept it.

$(fg)(x)$ IS THE POINTWISE PRODUCT, GENUINELY DIFFERENT FROM COMPOSITION, WHICH IS NOT COMMUTATIVE: $(fg)(x)=f(x)\cdot g(x)$ multiplies the two OUTPUT values together at the same shared input. Composition $(f\circ g)(x)=f(g(x))$ instead feeds $g$'s output into $f$ as an entirely NEW input — a structurally different operation, generally producing a different expression. Furthermore, while pointwise addition and multiplication are commutative (inherited directly from ordinary arithmetic: $f+g=g+f$, $fg=gf$), composition is genuinely NOT commutative: $f\circ g$ and $g\circ f$ are, in general, different functions entirely.

## Mental Models
1. **Rung 1 — a point excluded by either original function is automatically excluded from any pointwise combination.** The combined domain can only ever shrink relative to either factor alone, never grow.
2. **Rung 2 — $(fg)(x)$ multiplies two outputs at the SAME input; $(f\circ g)(x)$ feeds one output into the other function as a NEW input.** These share superficially similar-looking notation but represent genuinely different mathematical operations.
3. **Rung 3 — commutativity is a property of specific operations, not a universal fact about combining functions.** Pointwise addition and multiplication inherit commutativity from ordinary arithmetic; composition does not, because feeding $g$ into $f$ is a structurally different process from feeding $f$ into $g$.

## Why Students Fail
Having learned to find a single function's domain by checking its own formula, students can default to reporting only ONE of the two original functions' domains when asked for a combined operation's domain, missing that BOTH must be intersected — a restriction from either function alone is enough to exclude a point from the combination, even when the OTHER function would have permitted it there. Having seen the notations $(fg)(x)$ and $f(g(x))$ appear in similar algebraic contexts, students can conflate the pointwise product with composition, computing one when the other was intended, since both notations involve two function names placed in close proximity. Finally, having correctly learned that ordinary numerical multiplication and addition are commutative, and having just learned that pointwise function addition and multiplication inherit this same commutativity, students naturally extend the pattern to composition as well, missing that composition is a structurally different KIND of operation (feeding output into input, rather than combining two outputs directly) that does not inherit commutativity from arithmetic at all.

## Misconceptions

### MC-1: COMBINED-DOMAIN-ASSUMED-FROM-ONE-FUNCTION-ONLY
- **Birth type:** Type 1 (overgeneralization) — per this Blueprint's own "Foundational" severity rating, independently confirmed
- **Description:** Believing the domain of a combined function like $(f+g)(x)$ is automatically one of the original functions' domains, missing that it is the intersection of both.
- **Why this birth type:** Overgeneralization from the habit of checking a single function's own domain, extended incorrectly to a combined operation without recognizing that a SECOND function's own restrictions must also be intersected in.
- **Detection probe:** "For $f(x)=\sqrt{x}$ (domain $x\ge0$) and $g(x)=1/(x-3)$ (domain $x\ne3$), what is the domain of $(f+g)(x)$?" A student with MC-1 may report only $x\ge0$, forgetting $g$'s restriction.
- **Repair:** Compute the combined domain directly as the intersection: $x\ge0$ AND $x\ne3$, giving $[0,3)\cup(3,\infty)$ — genuinely EXCLUDING $x=3$, a point $f$ alone would have permitted ($f(3)=\sqrt3$ is perfectly defined), but which must be excluded because $g$ is undefined there.
- **Verification of death:** Given two functions with different domain restrictions, the student computes the combined domain as the genuine intersection of both, never defaulting to just one function's domain.

### MC-2: POINTWISE-PRODUCT-CONFLATED-WITH-COMPOSITION
- **Birth type:** Type 4 (notation-induced) — per this Blueprint's own "Foundational" severity rating, independently confirmed
- **Description:** Believing $(fg)(x)$ means $f(g(x))$, missing that it means the pointwise product $f(x)\cdot g(x)$, a genuinely different operation.
- **Why this birth type:** Notation-induced: both $(fg)(x)$ and $f(g(x))$ involve the symbols $f$ and $g$ placed in close visual proximity, and without deliberate attention to the specific notational convention used, the two can be conflated.
- **Detection probe:** "For $f(x)=x+1$ and $g(x)=x^2$, is $(fg)(x)$ the same as $f(g(x))$?" A student with MC-2 answers "yes."
- **Repair:** Compute both explicitly and side by side: $(fg)(x)=f(x)\cdot g(x)=(x+1)(x^2)=x^3+x^2$ (the pointwise product) versus $(f\circ g)(x)=f(g(x))=f(x^2)=x^2+1$ (composition) — genuinely different expressions from the identical pair of functions.
- **Verification of death:** Given expressions written as $(fg)(x)$ and $(f\circ g)(x)$, the student computes each correctly according to its own distinct definition, never conflating the two.

### MC-3: COMPOSITION-ASSUMED-COMMUTATIVE
- **Birth type:** Type 1 (overgeneralization) — per this Blueprint's own "Moderate" severity rating, independently confirmed
- **Description:** Believing function composition is commutative like pointwise addition and multiplication, missing that $f\circ g$ and $g\circ f$ are generally different functions.
- **Why this birth type:** Overgeneralization from pointwise addition and multiplication's genuine commutativity (inherited from ordinary arithmetic) extended incorrectly to composition, a structurally different KIND of operation that does not inherit this property.
- **Detection probe:** "Is function composition commutative, the same way addition and multiplication of functions are?" A student with MC-3 answers "yes."
- **Repair:** Compute both orders explicitly for $f(x)=x+1$, $g(x)=x^2$: $(f\circ g)(x)=f(g(x))=x^2+1$ versus $(g\circ f)(x)=g(f(x))=(x+1)^2=x^2+2x+1$ — these DIFFER (by the $2x+1$ term), decisively refuting commutativity, in sharp contrast with $(f+g)(x)=(g+f)(x)$, which are genuinely identical.
- **Verification of death:** Given a fresh pair of functions, the student computes $f\circ g$ and $g\circ f$ separately, expecting them to differ unless a specific reason suggests otherwise, never assuming equality by default.

## Analogies
1. **The two-key-lock analogy (targets MC-1).** A combined operation requiring input from two separate functions is like a safe requiring two separate keys — if EITHER key doesn't work at a given setting, the safe won't open there, regardless of whether the other key would have worked fine on its own.
2. **The recipe-versus-assembly-line analogy (targets MC-2 and MC-3).** $(fg)(x)$ is like combining two separately-prepared ingredients side by side in one dish (order of preparation doesn't matter — mixing flour and sugar gives the same result either way). $(f\circ g)(x)$ is like an assembly line where one station's OUTPUT becomes the next station's INPUT — running the stations in the opposite order genuinely changes what comes out at the end.

## Demonstrations
### Demonstration 1 — the combined domain excludes points either function alone would allow (mirrors Blueprint Ex1)
$f(x)=\sqrt{x}$ (domain $x\ge0$), $g(x)=1/(x-3)$ (domain $x\ne3$): $(f+g)(x)=\sqrt{x}+1/(x-3)$ has combined domain $[0,3)\cup(3,\infty)$ — genuinely excluding $x=3$, a point $f$ alone would have permitted, because $g$ is undefined there.

### Demonstration 2 — the pointwise product versus composition (mirrors Blueprint Ex2)
$f(x)=x+1$, $g(x)=x^2$: $(fg)(x)=f(x)\cdot g(x)=(x+1)(x^2)=x^3+x^2$ (the pointwise product) is a completely different expression from $(f\circ g)(x)=f(g(x))=f(x^2)=x^2+1$ (composition, feeding $g$'s output into $f$ as a new input).

### Demonstration 3 — composition is not commutative, unlike pointwise operations (mirrors Blueprint Ex3)
Using the same $f(x)=x+1$, $g(x)=x^2$: $(f\circ g)(x)=x^2+1$ while $(g\circ f)(x)=g(x+1)=(x+1)^2=x^2+2x+1$ — genuinely different, confirming composition's non-commutativity. Contrast: $(f+g)(x)=x+1+x^2$ and $(g+f)(x)=x^2+x+1$ are IDENTICAL expressions (ordinary addition is commutative), and $(fg)(x)=(gf)(x)$ always, by ordinary multiplication's commutativity — composition genuinely behaves differently.

## Discovery Questions
1. "For $(f+g)(x)$, is the domain automatically the same as $f$'s domain, or does $g$'s own domain matter too?"
2. "Does $(fg)(x)$ mean the same thing as $f(g(x))$? Compute both for $f(x)=x+1$ and $g(x)=x^2$ and compare."
3. "Addition and multiplication of functions are commutative, just like ordinary arithmetic. Is composition also commutative?"

## Teaching Sequence
Best taught by the **Concrete CPA entry stage — a direct domain-intersection example BEFORE the general rules**, matching the Blueprint's own CPA justification; grounding the intersection rule in one worked case makes the general principle concrete before stating it abstractly.
1. Work Demonstration 1's domain-intersection computation directly, posing Discovery Question 1 before stating the general intersection rule.
2. Work Demonstration 2's product-versus-composition contrast, posing Discovery Question 2 before confirming the two notations are genuinely distinct.
3. Work Demonstration 3's non-commutativity evidence, posing Discovery Question 3 before contrasting with pointwise addition's genuine commutativity.
4. Assess with the P77 problem set and the data-pipeline transfer probe (P76, independence mode).

## Tutor Actions
1. **On any pointwise-operation domain question:** require the student to state BOTH original domains explicitly and compute the intersection, never defaulting to one function's domain alone.
2. **On any $(fg)(x)$-versus-$f(g(x))$ question:** require the student to compute both separately and compare, never assuming they are the same operation.
3. **On any composition-order question:** require the student to compute $f\circ g$ and $g\circ f$ independently before claiming they are equal.

## Voice Teaching Notes
1. **Register:** proficient/applied — this concept assumes fluency with function evaluation from the prerequisite and introduces the algebra of functions as a new layer.
2. **Load-bearing sentence, spoken slowly:** "A restriction from either function shrinks the combined domain — it never grows back."
3. **Wait time:** pause after Discovery Question 2, letting the student genuinely compute both expressions before confirming they differ.

## Assessment Signals
1. **Gate concept:** correctly computes all four pointwise operations and their combined domain, including the extra division-by-zero exclusion.
2. **Notation discrimination:** correctly distinguishes $(fg)(x)$ from $(f\circ g)(x)$, computing each according to its own definition.
3. **Commutativity discrimination:** correctly identifies pointwise addition/multiplication as commutative and composition as generally non-commutative, verifying with direct computation.
4. **Domain-tracking fluency:** correctly identifies a point excluded by only one of two functions as excluded from their pointwise combination.
5. **Transfer:** applies the pointwise-versus-composition distinction to a data-pipeline scenario (P76), correctly diagnosing an implementation error and explaining why swapping composition order changes the result.

## Tutor Recovery Strategy
If the student reports only one function's domain for a combined operation, work several fresh pairs with genuinely different domain restrictions until the intersection rule is automatic. If the student conflates the pointwise product with composition, require both computations side by side on every fresh pair of functions until the distinction is reliable. If the student assumes composition is commutative, work several fresh pairs computing both orders explicitly until non-equality is the expected default.

## Memory Hooks
1. "Combining functions combines their restrictions too — the domain only ever shrinks."
2. "$(fg)(x)$ multiplies outputs; $f(g(x))$ feeds one output into the other as a new input."
3. "Addition and multiplication of functions don't care about order — composition genuinely does."

## Transfer Connections
- **`math.func.function-concept`:** the domain/evaluation framework this concept's pointwise operations directly build on.
- **`math.func.composition`:** this concept's own product-versus-composition distinction and non-commutativity finding are the direct entry point into that concept's full theory of composition.
- **`math.func.domain-range`:** the domain-intersection technique developed here directly reuses that concept's own domain-restriction reasoning, applied now to combined rather than single functions.

## Cross-Subject Connections
- **Computer Science (function composition in software pipelines):** the product-versus-composition distinction directly models the difference between combining two independent computations' results versus chaining one computation's output into the next.
- **Signal Processing (combining and cascading systems):** pointwise operations model parallel-combined signals (sum, product); composition models cascaded (series) systems, where the order of stages genuinely matters.

## Blueprint References
- Primary source: `docs/curriculum/blueprints/math.func.function-operations.md` — reused by reference throughout (Learning Objectives, worked examples Ex1–Ex3, misconception inventory MC-1–MC-3, transfer probe P76 on a data-processing pipeline, mode = independence per that Blueprint's own Component 7). Not restated verbatim; this entry adds the mental-model ladder, discovery-vs-direct-instruction argument, voice teaching notes, memory hooks, and cross-subject connections per `EDUCATIONAL_BRAIN_STANDARD.md`'s ownership boundary. All 3 misconceptions confirmed against this program's own taxonomy, matching the Blueprint's own birth-type implications: MC-1 Type 1, MC-2 Type 4, MC-3 Type 1.
- Cross-link: KG lists no cross-links for this concept — independence mode, matching the Blueprint's own declaration.

## Runtime Asset References
- No AssetIdentity rows exist for this concept yet (Layer 3/7 DB-backed assets are populated separately, by live LLM generation plus admin review or by deliberate seed-script batches — never by this authoring layer). This entry is Layer 1/2 content only.

## Curriculum Feedback
- No genuine Blueprint/KG metadata discrepancy found — requires, unlocks, cross_links, difficulty, bloom, mastery_threshold, and estimated_hours all match the live KG exactly (unlocks `math.func.composition`, confirmed against the live KG).

## Version History
- **Batch 29** (2026-09-12): initial authoring, part 1 of 4 this batch (with `math.func.composition`, `math.func.monotonic-function`, `math.func.bijection`), continuing `math.func` as a standalone domain campaign. Blueprint reused by reference; 3 misconceptions confirmed matching the Blueprint's own birth-type implications (MC-1 Type 1, MC-2 Type 4, MC-3 Type 1).
