# math.func.step-function

## Identity
- **KG ID**: `math.func.step-function`
- **Domain**: math.func (Functions)
- **Requires**: `math.func.piecewise-function`
- **Unlocks**: none listed in the KG
- **Cross-links**: none listed in the KG
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.75 (MAMR 4/5)
- **Estimated hours**: 3
- **CPA stage**: Concrete (parking fees, temperature truncation, postal rates — real quantized-value scenarios before floor/ceiling notation is introduced)

## Learning Objective
By the end of this concept, the learner can:
1. Evaluate the floor function $\lfloor x \rfloor$ and the ceiling function $\lceil x \rceil$ for both positive and negative real inputs.
2. Sketch the staircase graph of a floor or ceiling function with the correct open/closed endpoint convention at each step.
3. Identify that both functions have a jump discontinuity at every integer value.
4. Apply floor/ceiling reasoning to real-world quantization and rounding scenarios (parking fees, postal rates, unit pricing).
5. Distinguish floor from ceiling, including correctly evaluating both at negative non-integer inputs, where the naive "just drop the decimal" instinct fails.

## Core Understanding
`math.func.piecewise-function` established that a single function can be defined by different rules on different pieces of its domain. The step function is a specific, extremely common FAMILY of piecewise function: one where every piece is a constant (a flat horizontal segment), and the function jumps abruptly from one constant value to the next at specific boundary points — most commonly, at every integer.

**FLOOR ROUNDS DOWN TO THE NEAREST INTEGER; CEILING ROUNDS UP — AND "DOWN"/"UP" MEAN TOWARD $-\infty$ AND $+\infty$, NOT TOWARD ZERO.** $\lfloor x \rfloor$ is the greatest integer less than or equal to $x$; $\lceil x \rceil$ is the least integer greater than or equal to $x$. For positive numbers, this matches the everyday intuition of "drop the decimal" for floor: $\lfloor 3.7 \rfloor = 3$. But for NEGATIVE numbers, dropping the decimal is wrong: $\lfloor -2.3 \rfloor = -3$, not $-2$, because $-3$ is the greatest integer that is still less than or equal to $-2.3$ ($-2$ is GREATER than $-2.3$, so it fails the "less than or equal" requirement). This negative-number case is the single most important verification point for genuine floor understanding, because it is exactly where the "drop the decimal" shortcut — which happens to work for positive numbers — breaks.

**THE GRAPH IS A STAIRCASE, AND EVERY STEP HAS EXACTLY ONE CLOSED END AND ONE OPEN END.** For $\lfloor x \rfloor$, each horizontal segment includes its LEFT endpoint (closed dot) and excludes its RIGHT endpoint (open dot) — the function "holds" its value from an integer up to (but not including) the next integer. For $\lceil x \rceil$, the convention is mirrored: open on the left, closed on the right. Getting the open/closed assignment backwards draws a graph that either double-defines or leaves undefined the exact integer boundary points.

**THE FUNCTION IS DEFINED EVERYWHERE, BUT IT IS NOT CONTINUOUS ANYWHERE NEAR AN INTEGER.** Every integer value of $x$ is a jump discontinuity: the function value changes abruptly rather than sliding smoothly from one step to the next. This is a genuinely different kind of "always defined" than the smooth, unbroken curves a learner has seen in every earlier `math.func` concept — floor and ceiling are the first functions in this domain sequence whose entire graph is built from a deliberate, permanent pattern of breaks.

**KEY IDENTITY: $\lfloor x \rfloor = \lceil x \rceil$ IF AND ONLY IF $x$ IS AN INTEGER.** For any non-integer $x$, floor and ceiling give two DIFFERENT adjacent integers (floor below, ceiling above); they only coincide exactly at integers, where there's nothing to round.

## Mental Models
1. **Rung 1 — The staircase, not the ramp.** Every other function graph the learner has drawn in `math.func` (lines, curves, even piecewise combinations of continuous pieces) has been a connected path. The step function is genuinely a staircase: flat treads, vertical (but not actually drawn) risers, and the risers are exactly where the jumps happen.
2. **Rung 2 — Floor and ceiling as two different rounding directions on a number line, not two versions of the same operation.** Placing $x$ on a number line, floor walks LEFT to the nearest integer; ceiling walks RIGHT. For a positive number between two integers, this feels like "round down" and "round up" — but the rule is about direction on the number line, which is why negative numbers reverse the everyday intuition.
3. **Rung 3 — The fractional part as the leftover.** $\{x\} = x - \lfloor x \rfloor$ is always between 0 (inclusive) and 1 (exclusive), and it's the "leftover" after floor has taken the integer part — a sawtooth wave with period 1, connecting this concept forward to periodic behavior.

## Why Students Fail
MC-1 (floor/ceiling swap) happens because the two words "floor" and "ceiling" carry everyday spatial connotations (floor = low, ceiling = high) that get mapped onto "rounds down" and "rounds up" correctly in the abstract, but the mapping breaks down under the pressure of actually computing — a learner recalls "floor is the low one" but momentarily executes the ceiling rule while believing they're doing floor, because the two operations are procedurally so similar (find the nearest integer in a given direction) that the LANGUAGE, not the math, is the only thing distinguishing them in memory. MC-2 (step function is continuous) happens because every function this learner has met in `math.func` up to this point — even the pieces of a piecewise function — connects smoothly at its boundaries when values are chosen sensibly, so the learner over-generalizes "functions I meet in this course are continuous" into a default assumption that silently persists until directly confronted with a genuine jump. MC-3 (closed dot on wrong side) happens because the open/closed convention is an arbitrary-feeling notational rule with no obvious "why" attached — floor could just as easily have been defined the other way around — so without deliberate practice tying the convention back to the actual DEFINITION (greatest integer $\le x$, meaning the value AT the integer itself belongs to the segment starting there), the two options (closed-left/open-right vs. open-left/closed-right) are equally memorable and easily swapped.

## Misconceptions

### MC-1: FLOOR-CEILING-SWAP
- **Birth type**: Type 3 — Language contamination (adopted directly from the Blueprint's own explicit classification)
- **Description**: The learner correctly recalls that floor rounds down and ceiling rounds up in the abstract, but swaps which operation ($\lfloor \cdot \rfloor$ or $\lceil \cdot \rceil$) performs which action when actually computing.
- **Why this birth type**: The two operations are procedurally near-identical (locate the nearest integer in a stated direction) and are distinguished almost entirely by which of two similar-sounding words and near-identical symbols is attached — a pure naming/notation collision rather than a conceptual one.
- **Detection probe**: "Compute $\lceil 4.2 \rceil$." — a learner holding this misconception answers $4$ (the floor value) instead of $5$.
- **Repair**: Anchor each symbol to its own physical shape: $\lfloor \cdot \rfloor$'s brackets open downward like a floor you stand on (push down); $\lceil \cdot \rceil$'s brackets open upward like a ceiling above you (push up). Practice reading the SYMBOL SHAPE aloud before computing, rather than relying on memory of "which word means which."
- **Verification of death**: Given a mixed set of floor and ceiling expressions with no verbal scaffolding, the learner computes all correctly at a rate consistent with mastery, including at least one negative-number case.

### MC-2: STEP-FUNCTION-IS-CONTINUOUS
- **Birth type**: Type 1 — Overgeneralization (adopted directly from the Blueprint's own explicit classification)
- **Description**: The learner assumes the step function's graph connects smoothly between steps, or believes it is "basically continuous except for a few special points that don't really count."
- **Why this birth type**: Every function graph encountered so far in the `math.func` domain has been an unbroken curve or line; the step function is the first deliberately, permanently discontinuous function in the sequence, and the learner extends the pattern "functions I've seen are continuous" past its actual scope.
- **Detection probe**: "Is $\lfloor x \rfloor$ continuous at $x=2$?" — a learner holding this misconception says yes, or hedges that it's "close enough."
- **Repair**: Graph $\lfloor x \rfloor$ zoomed in tightly around $x=2$ and have the learner trace the graph with a finger from just below $2$ to just above $2$ — the finger must physically lift off the flat segment and jump to a new height, making the discontinuity a felt, not just stated, fact.
- **Verification of death**: The learner correctly identifies EVERY integer as a jump discontinuity for a given floor or ceiling function, and explicitly distinguishes this from the smooth graphs of every earlier `math.func` concept.

### MC-3: CLOSED-DOT-ON-WRONG-SIDE
- **Birth type**: Type 5 — Instruction-induced (adopted directly from the Blueprint's own explicit classification)
- **Description**: When sketching the staircase graph, the learner places the closed (filled) dot on the wrong end of a step — e.g., closed on the right for floor instead of closed on the left.
- **Why this birth type**: The open/closed convention is taught as a graphing rule to memorize, disconnected from the algebraic definition that actually determines it — without that link, the rule is arbitrary from the learner's point of view and the two options are equally plausible to misremember.
- **Detection probe**: "Sketch $\lfloor x \rfloor$ for $x$ between 1 and 3. Which end of the segment from $y=2$ is closed?" — a learner holding this misconception places the closed dot at $x=3$ (right) instead of $x=2$ (left).
- **Repair**: Return to the definition: $\lfloor 2 \rfloor = 2$ exactly (the integer belongs to ITS OWN segment, the one starting there), so the dot AT $x=2$ on the $y=2$ step must be closed (included), and the dot approaching $x=3$ from the left must be open (that value belongs to the NEXT segment, $y=3$, once $x$ reaches 3). Derive the convention from the definition every time, rather than reciting it as a memorized rule.
- **Verification of death**: Given a fresh floor or ceiling graphing task, the learner justifies the open/closed placement by referring back to the definition (which integer the value "belongs to") rather than reciting a rule from memory.

## Analogies
1. **Elevator floor announcement (for floor function)**: an elevator between floors 2 and 3 announces "Floor 2" the entire time it's between them — it doesn't announce "Floor 3" until it has actually reached floor 3. This is exactly floor's closed-left/open-right convention: you're credited with the LOWER floor for the entire interval until you arrive at the next one.
2. **The library due-date stamp (for MC-2, continuity)**: a book due exactly at midnight is either "on time" or "late" with nothing in between — there's no smooth transition through "slightly late." Step functions model exactly this kind of all-or-nothing quantized reality, which is precisely why they can't be smooth curves.
3. **Postal weight brackets (for real-world application)**: a letter weighing anywhere from 0g up to (but not including) 50g costs one price; at exactly 50g, it jumps to the next price bracket — a direct real-world instance of the closed-left/open-right convention this concept teaches abstractly.

## Demonstrations
1. **D1 — Elevator floor tracing.** Walk through an elevator's floor number as a function of height traveled, building the staircase graph live and narrating each flat "floor" segment and each jump.
2. **D2 — The negative-number check.** Compute $\lfloor -2.3 \rfloor$ live, deliberately inviting the "drop the decimal" wrong answer of $-2$ first, then showing on a number line why $-3$ is the correct greatest integer not exceeding $-2.3$.
3. **D3 — Zoomed-in discontinuity.** Graph $\lfloor x \rfloor$ zoomed tightly around an integer boundary, physically tracing the jump with a finger to make the discontinuity felt rather than merely stated (directly targeting MC-2).

## Discovery Questions
1. "For positive numbers, floor feels like 'just drop the decimal point.' Try that shortcut on $\lfloor -2.3 \rfloor$. Does it still give the right answer? Why might negative numbers break it?"
2. "If $\lfloor 2 \rfloor = 2$ exactly, which step does the value $2$ belong to — the step ending at $2$, or the step starting at $2$? What does that tell you about which end of each step should be the closed dot?"
3. "Every function you've graphed in this unit so far has been one unbroken curve or line. Does the floor function's graph connect smoothly at each integer? What would it mean if it didn't?"

## Teaching Sequence
Entry stage: Concrete (parking fees, postal rates, temperature truncation — quantized real-world scenarios — before any floor/ceiling notation appears).
1. Elevator floor tracing (D1) — build the staircase intuition and the closed-left/open-right convention from a physical scenario, before symbolic notation.
2. Introduce $\lfloor x \rfloor$/$\lceil x \rceil$ notation, immediately paired with the negative-number check (D2) to pre-empt MC-1 and the "drop the decimal" shortcut trap.
3. Zoomed-in discontinuity (D3) directly confronting MC-2.
4. Open/closed convention derived from the definition (targeting MC-3), then transfer probe (P76: the fractional part function $\{x\} = x - \lfloor x \rfloor$ as a sawtooth wave, periodicity, and the floor addition lemma).

## Tutor Actions
1. On every floor/ceiling computation involving a negative number, explicitly pause and ask the learner to verify their answer against the definition ("greatest integer $\le x$" or "least integer $\ge x$") rather than accepting a "drop the decimal" shortcut without challenge.
2. When a learner sketches a staircase graph, ask them to justify the open/closed placement at ONE specific integer by appeal to the definition, before accepting the whole graph as correct.
3. After any correct floor/ceiling computation, occasionally ask "is this function continuous at [some nearby integer]?" as a standing check against MC-2 resurfacing even once computation itself is fluent.

## Voice Teaching Notes
- **Register**: proficient/apply — concrete, procedural, and example-driven; this concept rewards direct rule application more than abstract argument, so keep explanations tied to specific numeric examples throughout.
- **Load-bearing sentence**: "Floor asks: what's the biggest whole number that's still not more than this? Ceiling asks: what's the smallest whole number that's not less than this?"
- **Wait time note**: after presenting a negative-number floor/ceiling problem, allow enough silence for the "drop the decimal" instinct to surface and be stated out loud before correcting it — the wrong instinct voiced is more repairable than one left silent.

## Assessment Signals
1. Correctly evaluates floor and ceiling for at least one positive and one negative non-integer input.
2. Correctly sketches a staircase segment with the open/closed dots on the correct sides, justified by the definition.
3. Correctly identifies that a given floor or ceiling function has a jump discontinuity at a stated integer.
4. Correctly applies floor or ceiling reasoning to a real-world quantized scenario (a pricing tier, a rounding rule) without being told which operation to use.
5. **P76 Transfer Probe** (independence mode): given the fractional part function $\{x\} = x - \lfloor x \rfloor$, correctly identifies it as a sawtooth wave with period 1 and states the floor addition lemma's basic behavior.

## Tutor Recovery Strategy
If a learner has just been corrected on the negative-number floor case (MC-1) and appears to be overcorrecting by second-guessing every POSITIVE case too, explicitly reassure that the "drop the decimal" shortcut IS valid for positive numbers — the lesson is that it fails for negatives, not that it's always wrong. If a learner insists the step function graph "must" connect (MC-2) even after the zoomed-in tracing demonstration, return to the elevator analogy and ask them to physically describe what happens the instant the elevator passes a floor boundary — forcing a concrete, first-person account of the jump rather than an abstract graph reading.

## Memory Hooks
1. "Floor pushes down, ceiling pushes up — read the bracket shape, not just the word."
2. "The integer belongs to the step that starts there, not the one that ends there — closed on the side where the value truly sits."
3. "No ramps here — only stairs. Every integer is a jump, not a slope."

## Transfer Connections
- `math.func.piecewise-function` — this concept's own prerequisite; the step function is the specific all-constant-pieces family within the broader piecewise framework that concept establishes.
- `math.func.function-concept` and `math.func.function-notation` — floor/ceiling remain genuine functions (one output per input) despite the jumps, directly reusing the evaluation model those concepts establish.
- `math.func.periodic-function` — the fractional part function $\{x\}$, introduced in this entry's transfer probe, is this concept's most direct forward bridge into periodic behavior (period exactly 1).

## Cross-Subject Connections
- Computer science: integer division and modular arithmetic (`math.nt.divisibility`) are computed via floor internally, and quantized digital representations (pixel indices, discretized time steps) are direct real-world floor/ceiling applications.
- Economics/commerce: tiered pricing (postal rates, parking fees, tax brackets) is a direct real-world instance of step-function behavior, and correctly reasoning about which side of a boundary a given value falls on (open vs. closed) has genuine financial consequences.

## Blueprint References
- `docs/curriculum/blueprints/math.func.step-function.md` — fully reused by reference. All 3 misconceptions' birth types adopted directly from the Blueprint's own classification (MC-1 Type 3, MC-2 Type 1, MC-3 Type 5), independently confirmed rather than re-derived.
- No cross-link listed in the KG for this concept; none to verify.

## Runtime Asset References
No AssetIdentity rows exist for this concept yet — Layer 3/7 (DB-backed Explanation/Probe assets) is populated separately by production LLM-generation-plus-admin-review or deliberate seed-script batches, per this program's own layer-ownership mapping. This Educational Brain entry is the Layer 2 authored source those future runtime assets will draw from.

## Curriculum Feedback
No genuine Blueprint/KG metadata discrepancy found — requires, unlocks, cross_links, difficulty, bloom, mastery_threshold, and estimated_hours all match the live KG exactly (unlocks and cross_links both empty per the KG, matching the Blueprint's own declaration).

## Version History
- **Batch 33** (2026-09-13): initial authoring, part 3 of 3 this batch (with `math.func.vertex-form`, `math.func.polynomial-function`), continuing `math.func` as a standalone domain campaign. Blueprint reused by reference; 3 misconceptions adopted at the Blueprint's own classified birth types (MC-1 Type 3, MC-2 Type 1, MC-3 Type 5).
