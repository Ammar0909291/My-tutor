# math.func.injectivity — Injective (One-to-One) Function (General Proof, the Non-Automatic Direction, the Horizontal Line Test)

## Identity
- **KG ID:** `math.func.injectivity`
- **Domain:** math.func (Functions)
- **Requires:** `math.func.function-concept`
- **Unlocks:** `math.func.inverse-functions`
- **Cross-links:** none
- **Difficulty:** proficient
- **Bloom level:** understand
- **Mastery threshold:** 0.8 (MAMR 4/5)
- **Estimated hours:** 3

## Learning Objective
By the end of this concept, the student can: (1) define injective (one-to-one) — $f(a)=f(b)\Rightarrow a=b$ for ALL $a,b$ in the domain — and prove injectivity for a specific function using a general algebraic argument valid for arbitrary $a,b$, never by checking a handful of sample pairs; (2) correctly distinguish injectivity's defining direction from the trivially-automatic direction ($a=b\Rightarrow f(a)=f(b)$) every function already satisfies; (3) apply the horizontal line test, correctly recognizing that a single horizontal line crossing the graph twice disqualifies the whole function from being injective, regardless of how many other lines cross only once.

## Core Understanding
`math.func.function-concept` established that a function assigns exactly one output to each input, introducing "many-to-one" as an allowed pattern and the vertical line test as its graphical check. This concept develops INJECTIVITY — the specific, stronger property that rules many-to-one behavior back OUT.

INJECTIVITY IS A UNIVERSAL "FOR ALL" CLAIM, PROVEN GENERALLY: $f$ is injective if $f(a)=f(b)\Rightarrow a=b$ for EVERY pair $a,b$ in the domain — equivalently, different inputs never collide onto the same output. Proving this requires a GENERAL argument valid for arbitrary symbols $a,b$ (typically: assume $f(a)=f(b)$ symbolically and algebraically derive $a=b$). Checking that a few SPECIFIC sample pairs happen to give different outputs is never a proof — injectivity claims this holds for EVERY pair, including ones never checked, and a genuine failure could exist among the untested pairs.

THE DIRECTION THAT MATTERS IS NOT AUTOMATIC — THE OTHER DIRECTION ALREADY IS: every function, by `math.func.function-concept`'s own definition (exactly one output per input), ALREADY guarantees $a=b\Rightarrow f(a)=f(b)$ trivially — plugging in the identical input twice obviously gives the identical output twice, a fact of well-definedness true of every function without exception. Injectivity is specifically about the OPPOSITE, genuinely non-automatic direction: $f(a)=f(b)\Rightarrow a=b$. Many perfectly valid functions (explicitly "many-to-one," per the prerequisite's own vocabulary) have DIFFERENT inputs sharing the SAME output — exactly what injectivity rules out.

THE HORIZONTAL LINE TEST: ONE FAILURE DISQUALIFIES EVERYTHING: paralleling the vertical line test (checks "is this a function at all"), the horizontal line test checks whether any horizontal line crosses the graph more than once — meaning two different $x$-values share the same $y$-value. A function is injective exactly when EVERY horizontal line crosses its graph AT MOST once. As with the universal algebraic claim, a SINGLE horizontal line crossing twice is entirely sufficient to disqualify the whole function from injectivity — there is no partial credit for "most lines only cross once."

## Mental Models
1. **Rung 1 — injectivity is proven by a general symbolic argument or refuted by a single genuine counterexample — never confirmed by sampling.** A handful of checked pairs, however many, never constitutes a proof of a universal claim.
2. **Rung 2 — every function already satisfies "same input, same output" automatically; injectivity is specifically about the converse, which is not automatic.** Confusing the two directions is confusing a trivial fact with the actual property being tested.
3. **Rung 3 — injectivity is all-or-nothing: one failing horizontal line is a complete, permanent disqualification, exactly as one counterexample pair disproves the algebraic claim.** There is no notion of "mostly injective."

## Why Students Fail
Having just learned to verify claims about specific numbers by trying a few examples — a habit that works well for many everyday mathematical tasks — students naturally extend this sampling approach to injectivity, missing that injectivity is a genuinely UNIVERSAL claim over an infinite set of pairs, where checking finitely many pairs can never rule out a failure hiding among the untested ones. Having just learned that a function guarantees exactly one output per input (the prerequisite's core definition), students can conflate this automatic guarantee — restating it as "$a=b\Rightarrow f(a)=f(b)$" — with injectivity itself, missing that injectivity is specifically about the CONVERSE direction, which requires a genuinely separate argument. Finally, having encountered the horizontal line test as analogous to the already-familiar vertical line test, students can treat injectivity as a matter of DEGREE (how many lines cross more than once, versus how many cross exactly once), missing that the property is strictly all-or-nothing — a single failing line settles the question completely, with no partial credit for otherwise-good behavior.

## Misconceptions

### MC-1: INJECTIVITY-CONFIRMED-BY-SAMPLING
- **Birth type:** Type 1 (overgeneralization, per this Blueprint's own "Foundational" severity rating, independently confirmed as an overgeneralization of ordinary example-checking habits)
- **Description:** Believing injectivity can be confirmed by checking a handful of sample input pairs and observing different outputs, missing that it is a universal "for all" claim requiring a general proof.
- **Why this birth type:** Overgeneralization from the everyday habit of verifying a pattern via a few examples, extended incorrectly to a genuinely universal claim spanning infinitely many pairs, where a failure could exist among any of the untested ones.
- **Detection probe:** "I checked that $f(1)\ne f(2)$, $f(2)\ne f(3)$, and $f(0)\ne f(5)$, and all gave different outputs. Have I proven $f$ is injective?" A student with MC-1 answers "yes."
- **Repair:** Contrast Example 1's general algebraic proof (works for arbitrary $a,b$, hence for every pair) against Example 2's counterexample for $g(x)=x^2$ ($g(2)=g(-2)=4$) — a pair that MIGHT easily have been missed by sampling different numbers, showing that only a general proof or an actual counterexample settles the question.
- **Verification of death:** Given an injectivity claim, the student produces either a general symbolic proof or a genuine counterexample, never a sampled list of checked pairs as evidence.

### MC-2: INJECTIVITY-DIRECTION-CONFUSED-WITH-AUTOMATIC-WELL-DEFINEDNESS
- **Birth type:** Type 1 (overgeneralization, per this Blueprint's own "Foundational" severity rating, independently confirmed — confusing an always-true fact about functions with the specific non-automatic claim being tested)
- **Description:** Confusing injectivity's defining direction ($f(a)=f(b)\Rightarrow a=b$) with the trivially-automatic direction every function already satisfies ($a=b\Rightarrow f(a)=f(b)$).
- **Why this birth type:** Overgeneralization from the correct, always-true statement (a function's well-definedness) to a mistaken belief that restating this trivial fact somehow establishes injectivity, when injectivity is specifically about the logically distinct converse direction.
- **Detection probe:** "Is '$a=b$ implies $f(a)=f(b)$' the same statement as injectivity?" A student with MC-2 answers "yes."
- **Repair:** Work $g(x)=x^2$ directly: the trivial direction ($2=2\Rightarrow g(2)=g(2)$) is true but says nothing useful; the actual injectivity claim ($g(a)=g(b)\Rightarrow a=b$) genuinely FAILS here, since $g(2)=g(-2)=4$ with $2\ne-2$ — the two directions have opposite truth values for this function, proving they are not the same statement.
- **Verification of death:** Given a function, the student states explicitly that the automatic direction is a property of every function and irrelevant to injectivity, testing only the genuinely non-automatic converse.

### MC-3: HORIZONTAL-LINE-TEST-TREATED-AS-DEGREE-OF-INJECTIVITY
- **Birth type:** Type 1 (overgeneralization, per this Blueprint's own "Moderate" severity rating, independently confirmed — treating an all-or-nothing property as a matter of degree)
- **Description:** Believing a function can still be "mostly injective" if only one horizontal line crosses its graph twice while most others cross at most once.
- **Why this birth type:** Overgeneralization from everyday intuitions about "mostly good" performance (where a single flaw is tolerable among many successes) applied incorrectly to a strict logical property that admits no partial satisfaction.
- **Detection probe:** "If only one horizontal line crosses a graph twice, but every other line crosses at most once, is the function still injective?" A student with MC-3 answers "yes" or "mostly."
- **Repair:** Work $g(x)=x^2$'s horizontal line test explicitly: the line $y=4$ crosses twice (at $x=2$ and $x=-2$), while $y=-1$ crosses zero times and $y=0$ crosses exactly once at $x=0$ — despite this otherwise well-behaved pattern, the single failing line at $y=4$ is entirely sufficient to disqualify the ENTIRE function, exactly parallel to how one counterexample pair disproves the algebraic claim.
- **Verification of death:** Given a graph with even one horizontal line crossing twice, the student states definitively that the function is not injective, regardless of how well-behaved every other horizontal line is.

## Analogies
1. **The lock-and-key-collision analogy (targets MC-1 and MC-2).** A lock system is only truly "one key per door" if NO two different keys can ever open the same door — checking that a handful of specific key pairs open different doors tells you nothing about whether some OTHER pair, never tested, might collide. The system is only safe if you can prove, for ANY two distinct keys, they never open the same door — a general guarantee, not a sample.
2. **The single-failed-inspection analogy (targets MC-3).** A building passes fire-safety inspection only if EVERY exit door meets code — a single non-compliant door fails the entire inspection, regardless of how many other doors are perfectly fine. The horizontal line test works identically: one crossing-twice line fails the whole function.

## Demonstrations
### Demonstration 1 — a general algebraic proof of injectivity (mirrors Blueprint Ex1)
For $f(x)=3x+2$ on $\mathbb{R}$: assuming $f(a)=f(b)$ for arbitrary $a,b$ gives $3a+2=3b+2\Rightarrow3a=3b\Rightarrow a=b$. Since this argument used only arbitrary symbols (never specific numbers), it holds for EVERY possible pair — $f$ is genuinely injective.

### Demonstration 2 — a genuine counterexample disproves injectivity (mirrors Blueprint Ex2)
For $g(x)=x^2$ on $\mathbb{R}$: checking $g(2)=4$ and $g(-2)=4$ reveals TWO DIFFERENT inputs ($2\ne-2$) sharing the SAME output — a genuine counterexample to $g(a)=g(b)\Rightarrow a=b$. So $g$ is NOT injective, even though the trivial direction ($2=2\Rightarrow g(2)=g(2)$) remains true and entirely beside the point. Sampling a different pair, like $g(1)=1$ versus $g(2)=4$ (different outputs), would never have revealed this specific failure.

### Demonstration 3 — the horizontal line test, one failure disqualifies everything (mirrors Blueprint Ex3)
For $f(x)=3x+2$: any horizontal line $y=k$ meets the graph at the UNIQUE solution $x=(k-2)/3$ — exactly one intersection for every $k$, matching the algebraic proof (injective). For $g(x)=x^2$: the line $y=4$ crosses at BOTH $x=2$ and $x=-2$ — two intersections. Even though $y=-1$ crosses zero times and $y=0$ crosses exactly once, this ONE failing line at $y=4$ is entirely sufficient to disqualify $g$ from being injective — no partial credit for the well-behaved lines.

## Discovery Questions
1. "If I check three or four different pairs of inputs and each pair gives different outputs, have I proven the function is injective?"
2. "Is 'if $a=b$ then $f(a)=f(b)$' the same statement as injectivity? What direction does injectivity actually claim?"
3. "If only one horizontal line crosses a graph twice, but every other horizontal line crosses at most once, is the function still injective?"

## Teaching Sequence
Best taught by the **Concrete CPA entry stage — proving one specific function injective and finding a genuine counterexample pair for another BEFORE the general "for all" definition is stated abstractly**, matching the Blueprint's own CPA justification; the concrete-first ordering grounds the universal quantifier in tangible, worked cases before generalizing.
1. Work Demonstration 1's full general proof for $f(x)=3x+2$, posing Discovery Question 1 before revealing why sampling never suffices.
2. Work Demonstration 2's counterexample for $g(x)=x^2$, posing Discovery Question 2 before contrasting the trivial and non-automatic directions explicitly.
3. Introduce the horizontal line test via Demonstration 3, posing Discovery Question 3 before confirming the all-or-nothing nature of the property.
4. Assess with the P77 problem set and the employee-ID-assignment transfer probe (P76, independence mode).

## Tutor Actions
1. **On any injectivity claim:** require either a general symbolic proof (arbitrary $a,b$) or an explicit counterexample pair — never a sampled list of checked pairs.
2. **On any confusion between the two directions:** explicitly ask which direction is being tested, and confirm the automatic direction is irrelevant to the injectivity question.
3. **On any horizontal-line-test application:** require the student to check EVERY relevant line, and state that a single failure is total disqualification, never a matter of degree.

## Voice Teaching Notes
1. **Register:** proficient/conceptual — this concept assumes fluency with basic function vocabulary and introduces a precise universal-quantifier definition requiring careful proof discipline.
2. **Load-bearing sentence, spoken slowly:** "One failing pair, or one failing line, is enough — injectivity has no partial credit."
3. **Wait time:** pause after Discovery Question 2, letting the student genuinely articulate the difference between the two directions before confirming which one injectivity actually tests.

## Assessment Signals
1. **Gate concept:** correctly proves or refutes injectivity for a novel function using a general argument or genuine counterexample, never sampling.
2. **Direction discrimination:** explicitly distinguishes injectivity's defining direction from the automatic well-definedness direction.
3. **Horizontal-line-test fluency:** correctly applies the horizontal line test and states that any single failure is a complete disqualification.
4. **Counterexample construction:** given a non-injective function, produces a genuine counterexample pair (not merely asserts non-injectivity).
5. **Transfer:** applies injectivity reasoning to a real-world unique-identifier scenario (P76), correctly identifying both a genuinely injective assignment rule and one at risk of collision.

## Tutor Recovery Strategy
If the student treats sampling as sufficient proof, require a general symbolic argument on every fresh injectivity claim until sampling is abandoned as a method. If the student confuses the two directions, work the $g(x)=x^2$ example repeatedly, stating both directions explicitly and their (differing) truth values, until the distinction is automatic. If the student treats the horizontal line test as a matter of degree, work fresh graphs with exactly one failing line among many well-behaved ones until the all-or-nothing verdict is expected rather than surprising.

## Memory Hooks
1. "A proof needs every pair, not just the ones you happened to check."
2. "Same input, same output is automatic — different inputs, same output is what injectivity actually forbids."
3. "One crossing-twice line kills injectivity — there's no partial credit."

## Transfer Connections
- **`math.func.function-concept`:** the vertical line test this concept's horizontal line test directly parallels, and the "many-to-one is allowed" vocabulary this concept specifically rules out.
- **`math.func.inverse-functions`:** a function has a genuine inverse function exactly when it is injective — this concept's property is the precise gatekeeping condition that concept builds on directly.
- **`math.func.surjectivity`:** injectivity and surjectivity are independent properties of a function, jointly required for a function to be a bijection — checking one tells you nothing about the other.

## Cross-Subject Connections
- **Computer Science (hash functions, unique identifiers):** injectivity is the exact mathematical property required of a genuinely collision-free identifier-assignment scheme, directly modeling the design goal of cryptographic hash functions and database primary keys.
- **Cryptography (encryption functions):** a valid encryption scheme must be injective (distinct plaintexts must never encrypt to the same ciphertext), or decryption would be ambiguous.

## Blueprint References
- Primary source: `docs/curriculum/blueprints/math.func.injectivity.md` — reused by reference throughout (Learning Objectives, worked examples Ex1–Ex3, misconception inventory MC-1–MC-3, transfer probe P76 on employee-ID uniqueness, mode = independence per that Blueprint's own Component 7). Not restated verbatim; this entry adds the mental-model ladder, discovery-vs-direct-instruction argument, voice teaching notes, memory hooks, and cross-subject connections per `EDUCATIONAL_BRAIN_STANDARD.md`'s ownership boundary. All 3 misconceptions confirmed against this program's own taxonomy, matching the Blueprint's own birth-type classification as overgeneralizations (Type 1) throughout.
- Cross-link: KG lists no cross-links for this concept — independence mode, matching the Blueprint's own declaration.

## Runtime Asset References
- No AssetIdentity rows exist for this concept yet (Layer 3/7 DB-backed assets are populated separately, by live LLM generation plus admin review or by deliberate seed-script batches — never by this authoring layer). This entry is Layer 1/2 content only.

## Curriculum Feedback
- No genuine Blueprint/KG metadata discrepancy found — requires, unlocks, cross_links, difficulty, bloom, mastery_threshold, and estimated_hours all match the live KG exactly (unlocks `math.func.inverse-functions`, confirmed against the live KG).

## Version History
- **Batch 28** (2026-09-12): initial authoring, part 3 of 4 this batch (with `math.func.domain-range`, `math.func.function-notation`, `math.func.surjectivity`), resuming `math.func` as a standalone domain campaign. Blueprint reused by reference; 3 misconceptions confirmed matching the Blueprint's own birth-type classification (all Type 1, overgeneralization).
