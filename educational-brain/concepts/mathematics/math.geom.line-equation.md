## Identity

- **KG ID**: `math.geom.line-equation`
- **Name**: Equations of Lines
- **Domain**: Geometry
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 8
- **Requires**: `math.geom.slope`
- **Unlocks**: `math.alg.system-linear-equations`
- **Cross-links**: `math.func.linear-function`

## Learning Objective

Represent a line in slope-intercept form (y = mx + b), point-slope form (y − y₁ = m(x − x₁)), and standard form (ax + by = c); convert fluently between all three forms; and select the most efficient form given what information the problem actually provides.

## Core Understanding

A line in the plane has infinitely many equivalent algebraic representations. Three forms are canonical:

1. **Slope-intercept form**: y = mx + b. Reads off slope m and y-intercept b directly. Fastest when both are already known, or when graphing.
2. **Point-slope form**: y − y₁ = m(x − x₁). Works with any known point (x₁, y₁), not just the y-intercept. Fastest when a slope and any one point are given — no extra solve-for-b step needed.
3. **Standard form**: ax + by = c (integers, a ≥ 0 by convention). Compact for systems of equations; intercepts read directly by setting x = 0 or y = 0.

All three describe the same geometric line — they are algebraic rearrangements of one another.

**Form-selection principle**: the most efficient starting form is determined by what information is given, not by which form was taught first. Given a non-intercept point and a slope, point-slope form is one write-down step; forcing slope-intercept form requires an extra algebraic step to find b.

## Mental Models

- **The picture before the formula**: graph the line first — mark the y-intercept, trace the slope to a second point. That picture is the shared geometric reality that all three forms encode differently.
- **Three envelopes, one letter**: slope-intercept, point-slope, and standard form are three different envelopes carrying the same letter (the line). The sender puts the letter in the envelope that makes delivery easiest.
- **Efficiency test**: before writing any form, ask "what have I been handed?" If handed a slope and the y-intercept → use y = mx + b immediately. If handed a slope and a non-intercept point → write point-slope immediately. If given two points → compute m first, then apply point-slope. Converting to slope-intercept afterwards is optional, not mandatory.

## Why Students Fail

Students who have been introduced to slope-intercept form first develop a strong habit of always reaching for y = mx + b regardless of what the problem gives them. When the given point is not the y-intercept, they add an unnecessary intermediate step (substituting into y = mx + b to solve for b) even when point-slope form would give the answer in one step. The three forms also appear as three different formulas to memorize rather than as one line expressed three ways, leading to the belief that a line in point-slope form is a different mathematical object than the same line in standard form.

## Misconceptions

### MC-1 — POINT-SLOPE-FORM-AVOIDED
**Birth type**: Type 1 (overgeneralization — slope-intercept form generalized as the universal starting point regardless of given information)
**Mechanism**: The student can write slope-intercept form fluently and has internalized it as the "default" equation of a line. When the y-intercept is not directly given, they back-compute it (substituting the given non-intercept point into y = mx + b and solving for b) rather than writing point-slope form directly.
**Diagnostic probe**: "A line has slope −3 and passes through (5, 2). Write its equation." Watch for an intermediate step `2 = −3(5) + b → b = 17 → y = −3x + 17` rather than the direct `y − 2 = −3(x − 5)`.
**Characteristic phrases**: "First I find b…" / "I always use y = mx + b" / "There's only one formula for a line."

### MC-2 — INTERCEPTS-EXTRACTED-VIA-CONVERSION-ONLY
**Birth type**: Type 1 (overgeneralization — slope-intercept form generalized as the necessary intermediary for all information extraction)
**Mechanism**: When given a line in standard form (ax + by = c) and asked for its intercepts, the student converts to slope-intercept form first rather than setting x = 0 or y = 0 directly in the standard form. This adds algebra that standard form was designed to avoid.
**Diagnostic probe**: "The line 3x + 4y = 12 crosses the x-axis at what point?" Watch for a full conversion to y = (−3/4)x + 3 before finding the x-intercept, rather than setting y = 0 directly: 3x = 12 → x = 4.
**Characteristic phrases**: "Let me convert it first" / "I need it in y = mx + b to see the intercepts."

### MC-3 — FORMS-TREATED-AS-DIFFERENT-LINES
**Birth type**: Type 1 (overgeneralization — the surface appearance of distinct formulas leads to the belief that distinct objects are described)
**Mechanism**: Having been exposed to slope-intercept form first, the student perceives point-slope or standard form as different equations for different lines rather than as algebraic rearrangements of the same equation. This produces errors when asked to verify that two given equations represent the same line, or when asked to convert.
**Diagnostic probe**: Show y = 2x + 3 and y − 3 = 2(x − 0) side by side and ask "are these the same line?" — a student with MC-3 may say no.
**Characteristic phrases**: "They look different so they must be different lines" / "Point-slope form gives a different answer than slope-intercept form."

## Analogies

- **Currency exchange**: the same amount of money expressed in dollars, euros, and yen. The amounts look different but represent the same value. Converting between currencies doesn't change what you have — it just expresses it in the most locally useful unit. Choosing the form to write a line equation is choosing which currency is easiest to hand over, given what you started with.
- **Address formats**: a location can be described as a street address, GPS coordinates, or a landmark description. All three locate the same place; the most useful format depends on who you're giving directions to.

## Demonstrations

1. **Graph-then-algebra**: draw a specific line on a coordinate plane (e.g., through (1,5) and (3,11)). Label the y-intercept where the line crosses the y-axis. Write slope-intercept form directly from the picture. Now cover the y-intercept label and ask: "if you only knew the point (3,11) and the slope, how would you write the equation without finding where it crosses the y-axis?" — introduce point-slope form as the answer to that question.
2. **Standard-form intercept efficiency**: write 2x + 5y = 10. Ask: "where does this line cross the x-axis?" — students using conversion will set up the full conversion first; demonstrate that setting y = 0 directly gives 2x = 10 → x = 5 in two steps. Repeat for y-intercept by setting x = 0: 5y = 10 → y = 2 in two steps. Name this "reading off a standard-form line."
3. **Three-forms one line**: start with the line through (2, −1) with slope 3. Write all three forms simultaneously on the board: point-slope `y + 1 = 3(x − 2)`, expand to slope-intercept `y = 3x − 7`, rearrange to standard `3x − y = 7`. Draw the same single line below. "Three envelopes, same letter."

## Discovery Questions

- "Given only a slope and a random point on a line (not the y-intercept), can you write the equation of the line in one step? Which form?"
- "If two equations look different on paper, how can you be sure they represent the same line?"
- "When would you choose standard form over slope-intercept form? Can you think of a situation where it saves steps?"

## Teaching Sequence

1. Activate prior knowledge: slope computation from two points.
2. Pictorial: graph a line, identify slope and y-intercept visually.
3. Introduce slope-intercept form as direct encoding of the picture.
4. Problem: "what if the given point isn't the y-intercept?" — lead to point-slope form.
5. Work a contrast pair (see Demonstrations §2): same slope, different given points, different optimal forms.
6. Introduce standard form: when it appears in problems, reading intercepts directly without converting.
7. Show all three for the same line — algebraic conversion proofs confirming equivalence.
8. Form-selection drill: students choose the most efficient form before writing any equation.
9. Assessment gate (see Assessment Signals).

## Tutor Actions

- **Blueprint Teaching Action A01**: slope-intercept and point-slope form, starting pictorial.
- **Blueprint Teaching Action A02**: standard form and explicit form-selection strategy via a contrast pair.
- **Blueprint Teaching Action A03**: mastery gate (4-problem set → transfer probe → scoring → routing).
- **MC-1 intervention**: give a slope and a non-intercept point, observe whether the student reaches for point-slope form or adds an unnecessary b-solve step. Name MC-1 explicitly if the extra step appears; demonstrate the point-slope shortcut.
- **MC-3 intervention**: show two different-looking forms of the same line, ask if they're the same, then convert algebraically on the board with the student watching.

## Voice Teaching Notes

- Use "which form fits what you were handed?" as a recurring question before the student writes anything.
- When a student says "I always use y = mx + b," say "that works, but let me show you a shortcut for this type" — not a correction of a wrong step, but an upgrade to a faster tool.
- Latency signal: a long pause before writing the equation often means the student is back-computing b — ask "what were you given in this problem?" to redirect to form-selection.
- Register note: the word "form" is mathematics-register vocabulary. Check early that the student understands "same line, different form" is about representation, not identity.

## Assessment Signals

- **Entry check**: compute slope from two points (confirms `math.geom.slope` mastery before starting).
- **Form-recognition probes**: present a line in each of the three forms and ask what information is immediately readable from that form without any algebra.
- **MC-1 probe**: slope and non-intercept point given → observe whether point-slope form is used directly.
- **MC-2 probe**: standard form equation → ask for x- and y-intercepts → observe whether conversion precedes reading.
- **MC-3 probe**: two different-form equations for the same line → "same or different line?"
- **Transfer probe**: real-context problem where the slope and a non-y-intercept data point are given — requires recognizing point-slope form as the efficient entry, then converting to answer a specific question (see Blueprint Component 5, P76 transfer probe).
- **Mastery gate**: 5/5 problems (MAMR ⌈0.85 × 5⌉ = 5/5) including at least one transfer probe.

## Tutor Recovery Strategy

- **MC-1**: Blueprint B01 — name it ("Point-Slope Avoidance"), detect it with a targeted probe, then re-anchor with the efficiency demonstration: point-slope form writes down immediately; slope-intercept form adds a step. Have the student time both approaches.
- **MC-2**: Blueprint B02 — name it ("Standard-Form Intercept Blindness"), detect with a targeted probe, then re-derive: "setting y = 0 directly in ax + by = c is the same algebraic move as isolating y in slope-intercept — you're just skipping the part where you rearrange first."
- **MC-3**: Blueprint B03 — name it ("Forms-as-Different-Lines Belief"), detect by asking directly, then convert a single line through all three forms in one continuous chain of algebra, with the student writing each step, confirming they're rearranging not replacing.

## Memory Hooks

- **Mnemonic for three forms**: SPS — Slope-intercept (graph-friendly), Point-Slope (point-and-slope-friendly), Standard (systems-and-intercepts-friendly).
- **Point-slope as "auto-fill"**: y − y₁ = m(x − x₁) — plug in whatever you're given (m and (x₁, y₁)) and you're done.
- **Standard-form intercept trick**: "set the one you don't want to zero, solve for the one you do."

## Transfer Connections

- `math.alg.system-linear-equations`: two lines in any form → solving the system gives their intersection point; standard form makes elimination natural.
- `math.func.linear-function`: f(x) = mx + b is slope-intercept form using function notation; the same object, alternative notation for the output variable.
- `math.geom.slope`: the m in every form comes directly from slope computation over two points.
- `math.geom.parallel-lines`: parallel lines share the same m, differ only in b.

## Cross-Subject Connections

- Physics: linear kinematics (d = d₀ + vt) is slope-intercept form in disguise; point-slope form appears when an experiment gives velocity and a reading at a non-origin time.
- Economics: supply/demand lines, cost functions — standard form and intercept-reading appear in break-even analysis.

## Blueprint References

- Blueprint: `docs/curriculum/blueprints/math.geom.line-equation.md` (PACKAGE_READY)
- This entry cites: Component 0 (metadata), Component 3 (Core Explanation), Components 4–5 (Worked Examples, Teaching Actions A01–A03), Component 6 (Misconception Registry MC-1 to MC-3, Protocol B repair actions B01–B03).
- Misconception Registries cited by ID: MC-1 → Blueprint MC-1 (birth type Type 1 added here), MC-2 → Blueprint MC-2 (birth type Type 1), MC-3 → Blueprint MC-3 (birth type Type 1).
- Worked examples, P91 gate macro, MAMR computation, transfer probe, P76 mode (independence) referenced in Blueprint Component 5 — not restated here.

## Runtime Asset References

- Explanation assets: `math.geom.line-equation:EXPLANATION:en` (DRAFT, populated by live-capture path; HUMAN_CURATOR seed pending)
- Probe assets: `math.geom.line-equation:PROBE:en` (DRAFT, live-capture; each probe should target one MC from the registry above)

## Curriculum Feedback

- Blueprint MC-1 mechanism is described as "not recognizing point-slope form as efficient" — birth type is Type 1 (overgeneralization), not Type 5 (instruction-induced), because the learner isn't following a wrong explicit rule from a teacher; they're extending a correct rule ("slope-intercept form works") beyond its optimal domain.
- The KG description exactly matches the Blueprint's three-form structure.

## Version History

- v1.0 (2026-07-28): Initial entry. Blueprint-grounded (PACKAGE_READY Blueprint cited). Birth types added to MC-1–3.
