# math.func.domain-range — Domain and Range (Valid Inputs, Actual Outputs, Structural Range Reasoning)

## Identity
- **KG ID:** `math.func.domain-range`
- **Domain:** math.func (Functions)
- **Requires:** `math.func.function-concept`
- **Unlocks:** none
- **Cross-links:** none
- **Difficulty:** proficient
- **Bloom level:** understand
- **Mastery threshold:** 0.85 (MAMR 5/5)
- **Estimated hours:** 4

## Learning Objective
By the end of this concept, the student can: given a function defined by a formula, a graph, or a table, state its domain (all valid inputs) and range (all actual outputs), correctly identify natural domain restrictions (denominator $\ne0$, even-root radicand $\ge0$, logarithm argument $>0$), read domain and range from a graph via axis projection, and correctly compute the domain of a composed function by requiring both membership in the inner function's domain and the inner output's membership in the outer function's domain.

## Core Understanding
`math.func.function-concept` established that a function assigns exactly one output to each input, with domain, codomain, and range as its basic vocabulary. This concept develops FINDING the domain and range precisely — two genuinely different tasks requiring different reasoning styles.

DOMAIN IS FOUND BY ALGEBRAIC RESTRICTION: the domain is the set of all valid inputs, found by identifying what values of $x$ make the function's formula well-defined. Three natural restriction types recur: denominators cannot equal zero; even-root radicands must be non-negative; logarithm arguments must be strictly positive. For a composite expression, restrictions are found by working INSIDE-OUT, chaining each operation's own requirement.

RANGE IS FOUND BY STRUCTURAL REASONING, NOT SAMPLING: the range is the set of actual outputs — a genuinely different kind of question from domain-finding, and NOT solved by the same algebraic-restriction technique. Plugging in a handful of $x$-values only SAMPLES the range; it never proves the full set of achievable outputs, and can badly miss bounded or gap-containing ranges (a function like $\sin(x)$ has range exactly $[-1,1]$, never wider, no matter which finite sample of points is checked). The reliable method reasons about the function's STRUCTURE: identify its minimum/maximum output, determine whether every value in between is achieved (continuity via the Intermediate Value Theorem rules out gaps for continuous functions), and check for genuinely skipped values (e.g. $1/x$ never equals exactly 0). A more powerful ALGEBRAIC technique sets $y=f(x)$ and solves for $x$ (or $x^2$); the set of $y$-values for which this equation has a real solution IS the range — this is the inverse-function approach, and it requires separately checking whether boundary/limiting values are actually ACHIEVED or only ever approached.

DOMAIN OF A COMPOSITION REQUIRES TWO CONDITIONS, NOT ONE: for $(f\circ g)(x)=f(g(x))$, a value $x$ is in the domain of the composition if and only if BOTH (1) $x$ is in the domain of $g$ itself, AND (2) $g(x)$ (the inner function's OUTPUT) lands in the domain of $f$. Restricting the composition's domain comes from what the OUTER function $f$ requires of ITS input — which is $g(x)$, not $x$ directly — a subtlety that is easy to get backwards.

## Mental Models
1. **Rung 1 — domain and range are genuinely different sets, found by genuinely different methods.** Domain: algebraic restriction on inputs. Range: structural reasoning about achievable outputs. Confusing the method for one with the method for the other produces systematic errors.
2. **Rung 2 — "approaches but never reaches" and "achieves exactly" are different range-membership claims that must be checked separately at boundary values.** An exponential function approaches but never reaches 0; a bounded function reaching its true maximum genuinely achieves that value.
3. **Rung 3 — the domain of a composition is a constraint on the OUTER function's input, which is the INNER function's output — never a constraint the outer function places directly on $x$.**

## Why Students Fail
Having internalized a single, reliable, mechanical procedure for finding domain (spot the operation, apply its restriction rule), students naturally try to apply the SAME algebraic-restriction mindset to range, missing that range requires reasoning about the function's OUTPUT STRUCTURE — a genuinely different cognitive move that cannot be reduced to checking a formula for forbidden operations. Having correctly learned that $f(x)=x$ has domain equal to range (both all reals), students readily overgeneralize this coincidence into a belief that domain and range are always the same set for any function, missing that this equality is a special property of specific functions (like the identity) rather than a general law. Finally, when computing the domain of a composed function, students often apply the OUTER function's restriction directly to the raw variable $x$ rather than to the INNER function's output — a subtle but consequential error, since the restriction genuinely belongs to whatever the outer function actually receives as its input, which is the inner function's result, not $x$ itself.

## Misconceptions

### MC-1: RANGE-EQUALS-DOMAIN
- **Birth type:** Type 1 (overgeneralization) — per this Blueprint's own classification, independently confirmed
- **Description:** Assuming the range of a function always equals its domain, writing "domain = range = all reals" indiscriminately even for functions like $f(x)=x^2$ where this is false.
- **Why this birth type:** Overgeneralization from the true special case $f(x)=x$ (domain = range = $\mathbb{R}$) to a false universal claim, since this simplest possible example is often introduced first and its equality can be mistaken for a general property of functions rather than a coincidence of that one function.
- **Detection probe:** "What is the domain and range of $f(x)=x^2$?" A student with MC-1 answers "domain = range = all reals."
- **Repair:** Contrast $f(x)=x$ (domain = range = $\mathbb{R}$, genuinely equal) directly against $f(x)=x^2$ (domain = $\mathbb{R}$ but range = $[0,\infty)$, since negative outputs never occur — squaring any real number always produces a non-negative result).
- **Verification of death:** Given a novel function, the student computes domain and range as two INDEPENDENT questions, without assuming their equality by default.

### MC-2: DOMAIN-ONLY-EXCLUDES-ZEROS
- **Birth type:** Type 5 (instruction-induced) — per this Blueprint's own classification, independently confirmed
- **Description:** Identifying only denominator-zero restrictions as domain exclusions, forgetting radical restrictions (radicand $\ge0$) and logarithm restrictions (argument $>0$).
- **Why this birth type:** Instruction-induced: denominators are typically the FIRST and most heavily emphasized domain restriction introduced, and radical/logarithm restrictions, introduced later, are consequently under-weighted in a student's working checklist of "things that can go wrong."
- **Detection probe:** "What is the domain of $f(x)=\ln(\sqrt{x-1})$?" A student with MC-2, having no denominator to flag, may answer "all reals" or miss one of the two chained restrictions.
- **Repair:** Work the composite expression inside-out explicitly: the inner $\sqrt{x-1}$ requires $x-1\ge0\Rightarrow x\ge1$; the outer $\ln(\cdot)$ requires its argument STRICTLY positive, so $\sqrt{x-1}>0\Rightarrow x-1>0\Rightarrow x>1$; combining both gives domain $(1,\infty)$ — a genuinely two-layer restriction that a denominator-only checklist would have missed entirely.
- **Verification of death:** Given a composite expression involving a denominator, a radical, AND a logarithm, the student identifies and combines all applicable restrictions, not just the denominator check.

### MC-3: RANGE-IS-COMPUTED-NOT-REASONED
- **Birth type:** Type 1 (overgeneralization) — per this Blueprint's own classification, independently confirmed
- **Description:** Attempting to find the range by plugging in arbitrary $x$-values rather than reasoning about the function's output structure, missing the true range for functions with bounded or gap-containing outputs (like $f(x)=\sin(x)$).
- **Why this birth type:** Overgeneralization from the domain-finding method (an algebraic-restriction PROCEDURE) extended incorrectly to range-finding, which genuinely requires a different, structural style of reasoning rather than a mechanical check.
- **Detection probe:** "What is the range of $f(x)=\sin(x)$?" A student with MC-3 samples a few values (0, 1, 0, -1) and may fail to articulate the exact bound $[-1,1]$, or assume the range is unbounded since $x$ itself is unbounded.
- **Repair:** Reason structurally rather than sampling: $\sin(x)$ oscillates and is provably bounded between $-1$ and $1$ for EVERY real input, and every value strictly between $-1$ and $1$ (plus the endpoints themselves) is genuinely achieved — the range is exactly $[-1,1]$, a fact established by the function's known structural behavior, not by checking finitely many sample points.
- **Verification of death:** Given a bounded or otherwise structurally-constrained function, the student reasons from the function's known behavior (minimum/maximum, continuity, periodicity) to state the exact range, rather than sampling values.

## Analogies
1. **The mailbox-versus-delivered-mail analogy (targets MC-1).** The domain is like every address a mail carrier is ALLOWED to deliver to (a fixed set of valid addresses); the range is like the SPECIFIC addresses that actually received mail today. These can coincide (every valid address got mail) or differ sharply (only some addresses received anything) — knowing one set tells you nothing automatic about the other.
2. **The security-checkpoint-inside-a-checkpoint analogy (targets composition domain).** Passing through an inner checkpoint (the inner function's own domain requirement) is necessary but not sufficient — you must ALSO satisfy whatever the SECOND checkpoint (the outer function) requires of whatever you're carrying when you arrive there (the inner function's output), not what you carried when you started.

## Demonstrations
### Demonstration 1 — four representations of domain and range (mirrors Blueprint A01)
$f(x)=x^2$: domain $=\mathbb{R}$ (no algebraic restriction on inputs); range $=[0,\infty)$, found by projecting the parabola's graph onto the $y$-axis — the vertex sits at $(0,0)$ and the curve opens upward, so every non-negative $y$-value is achieved and no negative one ever is.

### Demonstration 2 — a domain-and-range pattern gallery (mirrors Blueprint A02)
$f(x)=1/x$: domain $=\mathbb{R}\setminus\{0\}$ (denominator restriction), range $=\mathbb{R}\setminus\{0\}$ (the reciprocal genuinely skips 0 but achieves every other real value). $f(x)=2^x$: domain $=\mathbb{R}$, range $=(0,\infty)$ (an exponential is always strictly positive, approaching but never reaching 0 as $x\to-\infty$, and growing without bound as $x\to\infty$). $f(x)=\sin(x)$: domain $=\mathbb{R}$, range $=[-1,1]$ (oscillates, bounded above and below, achieving both endpoints).

### Demonstration 3 — natural vs. restricted domain, and the domain of a composition (mirrors Blueprint A03)
For $f(x)=\sqrt{x}$ and $g(x)=x-3$, computing $(f\circ g)(x)=\sqrt{x-3}$: the domain of $g$ alone is all of $\mathbb{R}$, but the OUTER function $f$ requires its input (which is $g(x)=x-3$) to be non-negative — $x-3\ge0\Rightarrow x\ge3$. So the composition's domain is $[3,\infty)$, strictly narrower than $g$'s own domain, precisely because $f$'s restriction applies to $g$'s OUTPUT, not to $x$ directly.

## Discovery Questions
1. "For $f(x)=x$, domain and range are both all real numbers. Does this mean domain always equals range for every function?"
2. "You know how to find the domain of $\ln(x)$ (argument $>0$) and the domain of $\sqrt{x}$ (radicand $\ge0$). What restrictions would you need to combine for $\ln(\sqrt{x-1})$, and in what order?"
3. "If you plug in five different values of $x$ into $\sin(x)$ and get five different outputs between $-1$ and $1$, have you proven the range is exactly $[-1,1]$? What would actually prove it?"

## Teaching Sequence
Best taught by **direct instruction establishing the domain-restriction rules and range-reasoning method as two SEPARATE skills FIRST**, given the Concrete CPA entry stage — explicit tables, coordinate graphs with shading, and interval notation on number lines ground the abstract set-membership language concretely before generalizing.
1. Establish the four representations of domain and range via Demonstration 1, posing Discovery Question 1 before revealing the $f(x)=x^2$ counterexample to domain-equals-range.
2. Build the domain-and-range pattern gallery via Demonstration 2, posing Discovery Question 2 before working the chained-restriction example directly.
3. Introduce composition domain via Demonstration 3, posing Discovery Question 3 before confirming that sampling never proves a range.
4. Assess with the P77 problem set and the bounded-rational-function transfer probe (P76, independence mode).

## Tutor Actions
1. **On any domain question:** require the student to check ALL applicable restriction types (denominator, radical, logarithm) explicitly, not just the first one noticed.
2. **On any range question:** require structural reasoning (minimum/maximum, achievability, gaps) rather than accepting a sampled list of outputs as sufficient.
3. **On any composition-domain question:** require the student to state explicitly which function's requirement applies to which variable (the outer function's requirement applies to the inner function's OUTPUT).

## Voice Teaching Notes
1. **Register:** proficient/conceptual — this concept assumes fluency with function vocabulary from the prerequisite and introduces precise domain/range-finding techniques.
2. **Load-bearing sentence, spoken slowly:** "Domain is about what you're allowed to put in — range is about what actually comes out, and those need different reasoning."
3. **Wait time:** pause after Discovery Question 3, letting the student genuinely consider whether sampling proves a range before revealing why it does not.

## Assessment Signals
1. **Gate concept:** correctly finds the natural domain of a composite expression involving multiple restriction types.
2. **Range-reasoning fluency:** correctly determines the range of a novel function via structural reasoning (not sampling), including bounded and gap-containing cases.
3. **Domain-range independence:** explicitly treats domain and range as separate questions, never assuming their equality.
4. **Composition-domain fluency:** correctly computes the domain of $f\circ g$ by applying the two-step (inner-domain-then-outer-domain-of-output) rule.
5. **Transfer:** applies the inverse-function (solve-for-$x$) technique to find the range of a bounded rational function, correctly distinguishing "approaches" from "achieves" at endpoints.

## Tutor Recovery Strategy
If the student assumes domain always equals range, work several fresh function pairs (one where they coincide, several where they diverge sharply) until the independence is concrete. If the student checks only denominator restrictions, work a composite expression chaining all three restriction types (denominator, radical, logarithm) until the full checklist becomes automatic. If the student attempts to find range by sampling, require an explicit structural argument (minimum/maximum, continuity, boundedness) for every range question until sampling is abandoned as a method.

## Memory Hooks
1. "Domain is about inputs allowed in; range is about outputs that actually come out — different questions, different tools."
2. "Denominator, radical, logarithm — three restriction types, check all three every time."
3. "The outer function's rule applies to what it actually receives — the inner function's output, not raw $x$."

## Transfer Connections
- **`math.func.function-concept`:** the domain/codomain/range vocabulary and the vertical line test this concept's domain-finding and range-finding techniques build directly on.
- **`math.func.composition`:** the two-step domain-of-composition rule developed here (domain of the inner function AND inner output in the outer function's domain) is exactly the rule that concept's own composition machinery relies on.
- **`math.func.injectivity`/`math.func.surjectivity`:** surjectivity is defined precisely in terms of range equaling codomain — the range-finding skill developed here is a direct prerequisite for determining surjectivity correctly.

## Cross-Subject Connections
- **Physics and Engineering (measurement constraints, feasible operating ranges):** domain restrictions directly model physically meaningful constraints (a formula for time cannot take negative values; a formula involving a square root of a physical quantity requires that quantity to be non-negative).
- **Computer Science (input validation, type constraints):** the domain-restriction discipline (checking denominators, radicands, logarithm arguments before evaluating) directly parallels defensive input validation in software, where a function's valid input set must be checked before execution.

## Blueprint References
- Primary source: `docs/curriculum/blueprints/math.func.domain-range.md` — reused by reference throughout (Learning Objective, misconception register MC-1–MC-3, teaching action sequence A01–A03, worked pattern galleries, transfer probe on a bounded rational function's range via algebraic inversion, mode = independence per that Blueprint's own Component 8). Not restated verbatim; this entry adds the mental-model ladder, discovery-vs-direct-instruction argument, voice teaching notes, memory hooks, and cross-subject connections per `EDUCATIONAL_BRAIN_STANDARD.md`'s ownership boundary. All 3 misconceptions confirmed against this program's own taxonomy, matching the Blueprint's own birth-type classification: MC-1 Type 1, MC-2 Type 5, MC-3 Type 1.
- Cross-link: KG lists no cross-links for this concept — independence mode, matching the Blueprint's own declaration.

## Runtime Asset References
- No AssetIdentity rows exist for this concept yet (Layer 3/7 DB-backed assets are populated separately, by live LLM generation plus admin review or by deliberate seed-script batches — never by this authoring layer). This entry is Layer 1/2 content only.

## Curriculum Feedback
- No genuine Blueprint/KG metadata discrepancy found — requires, unlocks, cross_links, difficulty, bloom, mastery_threshold, and estimated_hours all match the live KG exactly.

## Version History
- **Batch 28** (2026-09-12): initial authoring, part 1 of 4 this batch (with `math.func.function-notation`, `math.func.injectivity`, `math.func.surjectivity`), resuming `math.func` as a standalone domain campaign (13 concepts topologically ready, all gated on the already-authored `math.func.function-concept`). Blueprint reused by reference; 3 misconceptions confirmed matching the Blueprint's own birth-type classification (MC-1 Type 1, MC-2 Type 5, MC-3 Type 1).
