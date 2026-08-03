# Teaching Blueprint: Mathematical Modeling (`math.found.mathematical-modeling`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.found.mathematical-modeling` |
| name | Mathematical Modeling |
| domain | Foundations |
| difficulty | developing |
| bloom | create |
| mastery_threshold | 0.70 → MAMR = ⌈0.70×5⌉ = 4/5 |
| estimated_hours | 12 |
| requires | `math.found.problem-solving`, `math.found.abstraction` |
| unlocks | (none in KG) |
| cross_links | `math.stats.statistical-modeling`, `math.opt.formulation` (**neither yet authored** — verified via `ls`; P76_mode = independence, see Component 7) |
| CPA_entry_stage | C (Concrete) — a tangible real scenario before any symbolic formulation |
| description (KG) | The process of translating a real-world situation into mathematical language, solving the mathematical problem, and interpreting the solution back in context. |

## Component 1 — Learning Objectives

- LO1: Translate a stated real-world scenario into a mathematical formulation (define variables, state relationships as equations/inequalities/functions).
- LO2: Solve the resulting mathematical problem using appropriate prior tools, then **interpret the solution back in the original context**, checking whether it is meaningful (e.g. a negative count, a fractional person) given real-world constraints.
- LO3: Identify a model's simplifying assumptions and state at least one limitation this introduces.

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.problem-solving` (the general four-phase process this concept specializes for real-world translation) and `math.found.abstraction` (stripping a concrete situation to its essential mathematical structure — the core skill LO1 exercises).

## Component 3 — Core Explanation

Mathematical modeling is a three-stage cycle: **(1) Formulate** — translate the real situation into mathematical objects (variables, equations, functions), explicitly stating simplifying assumptions; **(2) Solve** — apply mathematical tools to the formulated problem; **(3) Interpret and validate** — translate the mathematical answer back into the original context, checking it makes real-world sense, and revising the model if it doesn't.

This differs from a pure "word problem" in one crucial way: models make ASSUMPTIONS explicit and open to revision (e.g. "assume the tank drains at a constant rate" is a choice, not a given fact), whereas a word problem typically hands the student a single, unambiguous mathematical relationship already decided.

## Component 4 — Worked Examples

**Example 1 (LO1, LO2 — full cycle)**: "A water tank holds 500 L and drains at 20 L/min. How long until it is empty?" Formulate: let $t$ = minutes elapsed, volume $V(t) = 500 - 20t$. Solve: set $V(t)=0 \Rightarrow t=25$. Interpret: 25 minutes — a sensible, non-negative real-world duration.

**Example 2 (LO2, LO3 — solution rejected by context, breaking MC-1)**: "A rectangular garden has perimeter 20 m and area 30 m². Find its dimensions." Formulate: $2(l+w)=20 \Rightarrow l+w=10$; $lw=30$. Solve the quadratic $l(10-l)=30 \Rightarrow l^2-10l+30=0$, giving $l = 5 \pm \sqrt{-5}$ — **no real solution**. Interpret: the model reveals that NO rectangle with these two constraints exists (the maximum possible area for perimeter 20 is $25$ m² at $l=w=5$), so the real-world premise itself must be re-examined, not just the arithmetic.

**Example 3 (LO3 — assumptions and limitation, breaking MC-2)**: Revisit Example 1's tank model: it assumes a CONSTANT drain rate. State the limitation explicitly: "if the drain rate actually slows as water pressure drops (a common real phenomenon), the true emptying time would be LONGER than 25 minutes — the model's constant-rate assumption is a simplification, not a certainty."

## Component 5 — Teaching Actions

### Teaching Action A01 — Formulate, Solve, Interpret as One Cycle (Primitive P64: Conceptual Shift)

Work Example 1 end to end, narrating each of the three stages explicitly and labeling them ("Formulate," "Solve," "Interpret"). Emphasize that INTERPRET is not optional — a numeric answer without a context-check is an incomplete model.

- **MC-1 hook**: give Example 2's garden problem and see whether the student reports "no real solution" as a final answer without connecting it back to what that means about the garden's plausible dimensions (revealing MC-1: treating a mathematical solve-step's output as automatically meaningful without checking against real-world constraints).

### Teaching Action A02 — Assumptions Are Choices, Not Facts (Primitive P06: Contrast Pair)

Contrast Example 1's model (constant drain rate assumed) against a verbally-described alternative (rate slows over time) without solving the alternative — the point is recognizing that the FIRST model's simplicity was a deliberate choice with a stated cost (Example 3), not an inevitability. State the rule: "every model rests on assumptions; naming them is part of the model, not an afterthought."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.70×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. "A car rental costs \$40 plus \$0.25/mile. Formulate the total cost $C$ as a function of miles $m$ driven, then find $m$ if $C=\$65$."
  2. Formulate and solve: "Two pipes fill a pool; one alone takes 6 hours, the other 4 hours. Working together, how long?" (state the rate-addition assumption explicitly).
  3. Given a formulated model whose solve step yields a negative time value, state what this reveals about the model or its inputs (interpretation check).
  4. State one simplifying assumption in problem 2's pipe model and one real-world condition under which it would fail.
- **P76 (Transfer Probe, mode = independence)**: "A small bakery models daily profit as $P(x) = 8x - 0.5x^2 - 20$, where $x$ is loaves baked (formulated from a linear revenue-per-loaf term, a cost term assumed to grow quadratically with overproduction waste, and a fixed \$20 overhead). (a) Find the number of loaves $x$ that maximizes profit and the resulting profit. (b) State one assumption baked into this model (e.g. the quadratic waste-cost term) and describe a real change in the bakery's operations that would make this assumption invalid." *Component 7 note: this scenario was designed independently rather than cross-linking to `math.stats.statistical-modeling`/`math.opt.formulation`, neither of which is yet authored.*
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | SOLUTION-ACCEPTED-WITHOUT-CONTEXT-CHECK | Reporting a mathematical solve-step's raw output as the final answer without checking it against real-world plausibility (sign, magnitude, integrality) | Foundational |
| MC-2 | MODEL-ASSUMPTIONS-TREATED-AS-FACTS | Treating a model's simplifying assumptions (constant rate, linearity, etc.) as guaranteed truths about the situation rather than deliberate, revisable choices | Moderate |
| MC-3 | VARIABLES-DEFINED-AMBIGUOUSLY | Introducing a variable without stating precisely what it represents (units, what quantity, at what time), causing downstream equation-writing errors | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Solution Without Context Check") → P41 (detect: present Example 2's garden problem; check whether the student flags the no-real-solution result as meaningful about the garden, not just an algebra dead-end) → P64 (conceptual shift: walk the interpret stage explicitly, connecting "no real $l$" to "no such rectangle exists").
- **B02 (targets MC-2)**: P27 ("Assumption Mistaken for Fact") → P41 (detect: ask the student to name the tank model's rate assumption; check if they initially say "the rate IS constant" rather than "the model ASSUMES it's constant") → P64 (conceptual shift: work Example 3, showing how a different real drain behavior changes the true time while the model's number stays 25).
- **B03 (targets MC-3)**: P27 ("Ambiguous Variable Definition") → P41 (detect: ask the student to state, in one sentence, exactly what a variable they introduced represents, including units) → P64 (model a precise definition: "let $t$ = minutes elapsed since draining began").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.problem-solving`, `math.found.abstraction`.
- **Unlocks**: none recorded in the KG.
- **Cross-link**: KG lists `math.stats.statistical-modeling` and `math.opt.formulation` as cross-links. Verified via directory listing that neither blueprint yet exists. Per the established P76_mode rule, this blueprint uses **independence** mode. A future revision may add genuine cross-link probes once those subjects author their modeling-specific concepts.

## Component 8 — Teaching Notes

- estimated_hours = 12 and bloom = create reflect that this is the first concept in the domain requiring the student to GENERATE a full formulation from an unstructured real scenario, not merely apply a given one — a substantially higher cognitive load than prior foundational concepts.
- MC-1 was given the highest severity because skipping the interpret stage defeats modeling's entire purpose: a technically-correct solve with an unchecked, nonsensical real-world answer is a failed model, not a partial success.
- The bakery transfer probe's part (b) was designed to require genuine critical distance from one's own model — recognizing a self-authored assumption's fragility, not just critiquing someone else's — directly extending MC-2's correction into a generative context.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.found.problem-solving`, `math.found.abstraction`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (both confirmed absent → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.70×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: real scenario before symbols) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO2/LO3, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
