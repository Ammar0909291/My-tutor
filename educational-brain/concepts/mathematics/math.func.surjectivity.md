# math.func.surjectivity — Surjective (Onto) Function (Range Equals Codomain, Independence from Injectivity)

## Identity
- **KG ID:** `math.func.surjectivity`
- **Domain:** math.func (Functions)
- **Requires:** `math.func.function-concept`
- **Unlocks:** `math.func.bijection`
- **Cross-links:** none
- **Difficulty:** proficient
- **Bloom level:** understand
- **Mastery threshold:** 0.8 (MAMR 4/5)
- **Estimated hours:** 3

## Learning Objective
By the end of this concept, the student can: (1) define $f:A\to B$ as surjective (onto) if every $b\in B$ has at least one $a\in A$ with $f(a)=b$, and determine whether a given function is surjective by checking this condition directly; (2) connect surjectivity to the equivalent statement "range equals codomain," using this equivalence to quickly disqualify a function via a single unreached codomain element; (3) correctly distinguish surjectivity (every output hit) from injectivity (no two inputs sharing an output) as independent properties, recognizing a function can be surjective without being injective, or vice versa.

## Core Understanding
`math.func.function-concept` established domain, codomain, and rule. This concept develops SURJECTIVITY — a property about whether the entire declared target set is genuinely covered by the function's outputs.

SURJECTIVITY: EVERY CODOMAIN ELEMENT IS HIT: $f:A\to B$ is surjective (or onto) if every element $b\in B$ has AT LEAST ONE $a\in A$ with $f(a)=b$ — formally, $\forall b\in B,\exists a\in A: f(a)=b$. Multiple domain elements are permitted to map to the SAME codomain element (surjectivity doesn't care about this at all) — the only requirement is that NOTHING in the codomain is left completely unreached.

THE RANGE-EQUALS-CODOMAIN CHARACTERIZATION: the range (or image) of $f$ is the ACTUAL set of output values produced, $\{f(a):a\in A\}$ — always a subset of the codomain $B$, but not necessarily all of it. $f$ is surjective EXACTLY when range $=B$, the entire codomain. To DISQUALIFY surjectivity, finding just ONE codomain element with no preimage anywhere in the domain is sufficient — there is no need to check every remaining element once a single failure is found.

SURJECTIVITY IS COMPLETELY INDEPENDENT OF INJECTIVITY: surjectivity asks whether every OUTPUT gets covered (freely allowing multiple inputs to share one output); injectivity (a separate property) asks whether DIFFERENT inputs always give different outputs. These are two independent yes/no questions — a function can be surjective and non-injective, injective and non-surjective, both, or neither, and checking one property provides no information about the other. Critically, surjectivity is a property of the SPECIFIC stated codomain: changing the declared target set (even without altering the function's actual rule at all) can flip a function from surjective to non-surjective, since surjectivity is always evaluated against whatever codomain was declared.

## Mental Models
1. **Rung 1 — surjectivity is about whether the ENTIRE target set gets reached, never about how many times each element is reached or from how many inputs.** A codomain element hit by five different inputs still counts as "reached" exactly the same as one hit by a single input.
2. **Rung 2 — disqualifying surjectivity needs only ONE missed codomain element; confirming it needs EVERY codomain element checked (or an equivalent range-equals-codomain argument).** The asymmetry between disproof and proof matters.
3. **Rung 3 — surjectivity and injectivity are two independent axes describing a function, not two versions of the same idea.** A function's position on one axis says nothing about its position on the other.

## Why Students Fail
Having just learned injectivity as a related "one-to-one"-flavored property, students often conflate the two ideas entirely, assuming a surjective function must also somehow avoid collisions between inputs, missing that surjectivity is exclusively about OUTPUT coverage and says nothing whatsoever about whether multiple inputs share an output. Having correctly internalized that every function, by definition, sends each of its domain elements SOMEWHERE in the codomain (a property every function trivially satisfies), students can mistakenly believe this automatically satisfies surjectivity, missing that surjectivity asks the OPPOSITE-direction question — whether every codomain element is reached FROM somewhere, not whether every domain element goes somewhere. Finally, having seen that confirming surjectivity in general requires checking that EVERY codomain element is reached, students can overestimate how much work is needed to DISPROVE surjectivity, missing that finding a single unreached codomain element is entirely sufficient — a much lighter burden than the confirmation case.

## Misconceptions

### MC-1: SURJECTIVE-CONFLATED-WITH-INJECTIVE
- **Birth type:** Type 6 (analogy overextension) — per this Blueprint's own "Foundational" severity rating, independently confirmed as an overextension of the two properties' surface-level similarity (both "special kinds of function") into a false implication between them
- **Description:** Believing surjectivity implies (or is the same as) injectivity, rather than recognizing these as independent properties.
- **Why this birth type:** Analogy overextension: both properties are introduced as special, named function characteristics close together in the curriculum, and their shared "special property" framing invites treating them as two versions of the same underlying idea rather than two genuinely orthogonal axes.
- **Detection probe:** "Must every surjective function also be injective?" A student with MC-1 answers "yes."
- **Repair:** Work $h(x)=x^2$ from $\mathbb{R}\to[0,\infty)$: every non-negative output is hit by SOME input (surjective), yet $h(2)=h(-2)=4$ shows two DIFFERENT inputs sharing an output (not injective) — a clean demonstration that surjectivity holds while injectivity fails, decisively refuting any implication between them.
- **Verification of death:** Given a function, the student checks surjectivity and injectivity as two entirely separate questions, never assuming one from the other.

### MC-2: ALL-DOMAIN-ELEMENTS-MAPPED-ASSUMED-SUFFICIENT
- **Birth type:** Type 1 (overgeneralization) — per this Blueprint's own "Foundational" severity rating, independently confirmed as mistaking a trivially-automatic fact (every function maps every domain element somewhere) for the genuinely non-automatic surjectivity claim
- **Description:** Believing that since every domain element maps to SOME codomain element (a property every function trivially has), the function must automatically be surjective.
- **Why this birth type:** Overgeneralization from the correct, automatic fact that functions are always well-defined (every input goes somewhere) to a mistaken belief that this alone establishes surjectivity, which is actually about the OPPOSITE direction — whether the codomain is fully covered from the domain side.
- **Detection probe:** "Every element of the domain maps to something in the codomain — doesn't that mean the function is surjective?" A student with MC-2 answers "yes."
- **Repair:** Present $g:\{1,2,3\}\to\{x,y,z\}$ with $g(1)=x,g(2)=x,g(3)=y$: every domain element DOES map somewhere (as every function guarantees), yet $z$ has no preimage at all — the function is NOT surjective despite satisfying the trivial "every input maps somewhere" property, decisively separating the two claims.
- **Verification of death:** Given a function, the student checks each CODOMAIN element for a preimage (the actual surjectivity question), rather than citing "every domain element maps somewhere" as evidence.

### MC-3: SINGLE-COUNTEREXAMPLE-NOT-RECOGNIZED-AS-SUFFICIENT
- **Birth type:** Type 1 (overgeneralization) — per this Blueprint's own "Moderate" severity rating, independently confirmed as overestimating the confirmation burden and applying it incorrectly to the (much lighter) disproof case
- **Description:** Believing that disqualifying surjectivity requires exhaustively checking many or all codomain elements, rather than recognizing a single unreached element as sufficient.
- **Why this birth type:** Overgeneralization from the genuinely heavier CONFIRMATION burden (every codomain element must be checked to CONFIRM surjectivity) applied incorrectly to the DISPROOF case, which requires only one counterexample.
- **Detection probe:** "How many codomain elements do you need to check to prove a function is NOT surjective?" A student with MC-3 overestimates, suggesting most or all must be checked.
- **Repair:** Emphasize the logical asymmetry directly: proving surjectivity requires checking that EVERY codomain element has a preimage (a universal claim), but DISPROVING it requires only ONE codomain element with no preimage (an existential counterexample) — exactly as one counterexample suffices to refute any universal claim.
- **Verification of death:** Given a non-surjective function, the student identifies and states a single unreached codomain element as complete, sufficient evidence, without checking additional elements unnecessarily.

## Analogies
1. **The class-attendance-versus-roll-call analogy (targets MC-1 and MC-2).** Every student showing up to SOME class period (every domain element mapping somewhere) doesn't mean every class period has at least one student present (surjectivity onto the codomain) — these are opposite-direction coverage questions, and a function can satisfy one without the other.
2. **The single-empty-seat analogy (targets MC-3).** To prove a stadium is NOT completely full, you only need to find ONE empty seat — you don't need to walk the entire venue checking every seat. Disproving surjectivity works the same way: one unreached codomain element settles it.

## Demonstrations
### Demonstration 1 — verifying surjectivity via an arrow diagram (mirrors Blueprint Ex1)
$f:\{1,2,3\}\to\{a,b\}$ with $f(1)=a,f(2)=a,f(3)=b$: checking every codomain element — is $a$ reached? Yes, by 1 or 2. Is $b$ reached? Yes, by 3. Every codomain element is hit, so $f$ is surjective, even though both 1 and 2 map to the same output $a$ — surjectivity doesn't care about that repetition at all.

### Demonstration 2 — a single counterexample disqualifies surjectivity (mirrors Blueprint Ex2)
$g:\{1,2,3\}\to\{x,y,z\}$ with $g(1)=x,g(2)=x,g(3)=y$: checking $z$ specifically — is anything mapped to $z$? No. Since $z\in$ codomain has no preimage, $g$ is NOT surjective (range $=\{x,y\}\ne$ codomain $\{x,y,z\}$), settled by this one missing element alone.

### Demonstration 3 — surjective but not injective (mirrors Blueprint Ex3)
$h:\mathbb{R}\to[0,\infty)$ with $h(x)=x^2$: every $b\ge0$ has some real $a=\sqrt b$ with $a^2=b$, so $h$ is surjective. But $h(2)=4=h(-2)$ shows two different inputs sharing an output, so $h$ is NOT injective. This single function demonstrates surjectivity and non-injectivity coexisting, directly confirming the properties' independence.

## Discovery Questions
1. "You've shown that every non-negative number can be written as $x^2$ for some real $x$. Does this ALSO mean different values of $x$ always give different values of $x^2$?"
2. "Every element of a function's domain maps to SOMETHING in the codomain — that's just how functions work. Does this fact, by itself, tell you the function is surjective?"
3. "To prove a function is surjective, you'd need to check every codomain element. How many codomain elements do you need to check to prove it's NOT surjective?"

## Teaching Sequence
Best taught by the **Pictorial CPA entry stage — an arrow diagram before the formal quantifier statement**, matching the Blueprint's own CPA justification; the visual "does every dot on the right have an arrow" framing grounds the abstract $\forall b\exists a$ statement concretely before generalizing.
1. Introduce surjectivity via the arrow diagram in Demonstration 1, posing Discovery Question 1 before working Demonstration 3's surjective-but-not-injective case directly.
2. Work the counterexample-based disqualification in Demonstration 2, posing Discovery Question 3 before confirming the asymmetry between confirmation and disproof.
3. Contrast surjectivity and injectivity explicitly via Demonstration 3, posing Discovery Question 2 before ruling out the "every domain element maps somewhere" misconception.
4. Assess with the P77 problem set and the employee-team-assignment transfer probe (P76, independence mode).

## Tutor Actions
1. **On any surjectivity claim:** require the student to check the codomain side (is every element reached?), never the domain side (does every element map somewhere?).
2. **On any surjectivity-versus-injectivity question:** require the student to check both properties independently and explicitly, never inferring one from the other.
3. **On any surjectivity disproof:** accept a single unreached codomain element as complete, sufficient evidence — do not require exhaustive checking.

## Voice Teaching Notes
1. **Register:** proficient/conceptual — this concept assumes fluency with domain/codomain vocabulary and introduces a precise quantifier-based definition.
2. **Load-bearing sentence, spoken slowly:** "Surjective asks if every target gets hit — it says nothing about how many arrows land on each one."
3. **Wait time:** pause after Discovery Question 1, letting the student genuinely consider whether surjectivity implies injectivity before revealing they are independent.

## Assessment Signals
1. **Gate concept:** correctly determines surjectivity for a novel function by checking codomain coverage directly.
2. **Range-codomain fluency:** correctly computes the range and compares it to the stated codomain to determine surjectivity.
3. **Independence discrimination:** explicitly checks surjectivity and injectivity as two separate questions, correctly identifying functions with each possible combination.
4. **Efficient disproof:** disqualifies surjectivity via a single unreached codomain element, without unnecessary exhaustive checking.
5. **Transfer:** applies surjectivity reasoning to a real-world team-assignment scenario (P76), correctly identifying how changing the codomain (adding an unassigned team) can flip a surjective assignment to non-surjective without altering the underlying rule.

## Tutor Recovery Strategy
If the student conflates surjectivity with injectivity, work $h(x)=x^2$ (surjective but not injective) and a second example (injective but not surjective) side by side until the independence is concrete. If the student assumes "every domain element maps somewhere" is sufficient, work a fresh function with an explicitly unreached codomain element until the domain-side/codomain-side distinction is automatic. If the student over-checks to disprove surjectivity, require the student to state the single unreached element immediately upon finding it, without further verification.

## Memory Hooks
1. "Surjective is about outputs covered, not inputs colliding — a separate question from injective."
2. "Every function sends inputs somewhere — that's automatic. Surjective asks if every target got reached, which isn't."
3. "One missing codomain element disproves surjectivity — you don't need to check the rest."

## Transfer Connections
- **`math.func.function-concept`:** the domain/codomain/rule structure surjectivity is defined relative to.
- **`math.func.injectivity`:** the independent, companion property this concept is repeatedly contrasted against — jointly required (both properties holding simultaneously) for a function to be a bijection.
- **`math.func.bijection`:** a bijection is defined as a function that is both surjective and injective — this concept supplies exactly half of that definition, with `math.func.injectivity` supplying the other half.

## Cross-Subject Connections
- **Computer Science (hash table coverage, load balancing):** surjectivity models whether a distribution scheme genuinely reaches every available bucket or server, a direct concern in load-balancing and hash-table design.
- **Economics and Operations Research (resource allocation coverage):** surjectivity directly models whether every available resource, team, or category in an allocation problem is genuinely utilized by at least one assignment.

## Blueprint References
- Primary source: `docs/curriculum/blueprints/math.func.surjectivity.md` — reused by reference throughout (Learning Objectives, worked examples Ex1–Ex3, misconception inventory MC-1–MC-3, transfer probe P76 on employee-team assignment and the codomain-change subtlety, mode = independence per that Blueprint's own Component 7). Not restated verbatim; this entry adds the mental-model ladder, discovery-vs-direct-instruction argument, voice teaching notes, memory hooks, and cross-subject connections per `EDUCATIONAL_BRAIN_STANDARD.md`'s ownership boundary. All 3 misconceptions confirmed against this program's own taxonomy: MC-1 Type 6 (analogy overextension, independently classified — the Blueprint itself does not pre-assign a birth type for this entry), MC-2 Type 1, MC-3 Type 1.
- Cross-link: KG lists no cross-links for this concept — independence mode, matching the Blueprint's own declaration.

## Runtime Asset References
- No AssetIdentity rows exist for this concept yet (Layer 3/7 DB-backed assets are populated separately, by live LLM generation plus admin review or by deliberate seed-script batches — never by this authoring layer). This entry is Layer 1/2 content only.

## Curriculum Feedback
- No genuine Blueprint/KG metadata discrepancy found — requires, unlocks, cross_links, difficulty, bloom, mastery_threshold, and estimated_hours all match the live KG exactly (unlocks `math.func.bijection`, confirmed against the live KG).

## Version History
- **Batch 28** (2026-09-12): initial authoring, part 4 of 4 this batch (with `math.func.domain-range`, `math.func.function-notation`, `math.func.injectivity`), resuming `math.func` as a standalone domain campaign, closing this batch's frontier subset. Blueprint reused by reference; 3 misconceptions birth-type classified (MC-1 Type 6, MC-2 Type 1, MC-3 Type 1 — the Blueprint pre-assigns severities but not birth types, all independently derived).
