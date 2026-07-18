# Teaching Blueprint: Equations of Lines (`math.geom.line-equation`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.geom.line-equation` |
| name | Equations of Lines |
| domain | Geometry |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 8 |
| requires | `math.geom.slope` |
| unlocks | `math.alg.system-linear-equations` |
| cross_links | `math.func.linear-function` (**not yet authored** — verified via `ls`; P76_mode = independence, see Component 7) |
| CPA_entry_stage | P (Pictorial) — a graphed line before the three algebraic forms |
| description (KG) | y = mx + b (slope-intercept), y − y₁ = m(x − x₁) (point-slope), ax + by = c (standard form); three equivalent representations of a line. |

## Component 1 — Learning Objectives

- LO1: Write the equation of a line in **slope-intercept form** ($y=mx+b$) given its slope $m$ and $y$-intercept $b$, or given two points (first computing $m$, then solving for $b$).
- LO2: Write the equation of a line in **point-slope form** ($y-y_1 = m(x-x_1)$) given a slope and any one point on the line, and correctly convert between point-slope and slope-intercept forms.
- LO3: Write the equation of a line in **standard form** ($ax+by=c$), convert fluently between all three forms, and select the most efficient form for a given problem (e.g. point-slope when given a point and slope directly, without needing to first solve for $b$).

## Component 2 — Prerequisite Check

Assumes mastery of `math.geom.slope` (slope as $\frac{y_2-y_1}{x_2-x_1}$, computed from two points).

## Component 3 — Core Explanation

A line can be written in three equivalent algebraic forms:

1. **Slope-intercept form**: $y = mx+b$, where $m$ is the slope and $b$ is the $y$-intercept (the value of $y$ when $x=0$). Most convenient when the slope and $y$-intercept are directly known, or when graphing quickly (plot $b$ on the $y$-axis, then use $m$ to find a second point).

2. **Point-slope form**: $y-y_1 = m(x-x_1)$, where $m$ is the slope and $(x_1,y_1)$ is **any** known point on the line (not necessarily the $y$-intercept). Most convenient when a slope and a single point (of any kind) are given directly — it avoids the extra step of solving for $b$ that slope-intercept form would require.

3. **Standard form**: $ax+by=c$ (with $a,b,c$ typically taken as integers, $a\geq0$ by convention). Useful for certain algebraic manipulations (e.g. solving systems of linear equations by elimination) and for finding intercepts quickly by setting $x=0$ or $y=0$.

**All three describe the exact same line** — they are algebraically equivalent, just rearranged. Converting between them is a matter of algebraic manipulation: e.g., point-slope $y-y_1=m(x-x_1)$ expands to $y = mx - mx_1+y_1$, which is slope-intercept form with $b=y_1-mx_1$.

**Choosing the efficient form**: given a point and a slope directly (not necessarily the $y$-intercept), point-slope form requires zero extra algebra to write down; slope-intercept form requires first solving for $b$ using the given point.

## Component 4 — Worked Examples

**Example 1 (LO1 — slope-intercept form from two points)**: Find the line through $(1,5)$ and $(3,11)$. Slope: $m=\frac{11-5}{3-1}=\frac{6}{2}=3$. Using point $(1,5)$: $5=3(1)+b \Rightarrow b=2$. Equation: $y=3x+2$.

**Example 2 (LO2 — point-slope form, avoiding unnecessary steps)**: A line has slope $m=-2$ and passes through $(4,-1)$ (not the $y$-intercept). Point-slope form directly: $y-(-1) = -2(x-4)$, i.e. $y+1=-2(x-4)$. Expanding to slope-intercept form for comparison: $y+1=-2x+8 \Rightarrow y=-2x+7$.

**Example 3 (LO3 — standard form and conversion)**: Convert $y=\frac{2}{3}x-4$ to standard form. Multiply through by 3 to clear the fraction: $3y = 2x-12$. Rearrange to $ax+by=c$ form with $a\geq0$: $-2x+3y=-12$, or equivalently (multiplying by $-1$ to make $a$ positive) $2x-3y=12$.

## Component 5 — Teaching Actions

### Teaching Action A01 — Slope-Intercept and Point-Slope Forms (Primitive P11: Representation Shift)

Start pictorial: graph a line, marking its $y$-intercept and using the slope to find a second point. State: "$y=mx+b$ directly encodes this picture — $b$ is where you start on the $y$-axis, $m$ is how you move for each step right." Work Example 1 (finding $m$ and $b$ from two points).

Shift representation: "what if you're given a point that ISN'T the $y$-intercept?" — introduce point-slope form as the direct-write alternative, working Example 2. Show the expansion from point-slope to slope-intercept form as pure algebra, confirming they describe the same line.

- **MC-1 hook**: give a slope and a non-intercept point, and ask students to "write the equation" — an attempt to force it into $y=mx+b$ by first solving an unnecessary system, rather than using point-slope form directly, reveals MC-1 (not recognizing point-slope form as the efficient choice when the given point isn't the intercept).

### Teaching Action A02 — Standard Form and Form-Selection Strategy (Primitive P06: Contrast Pair)

**Contrast 1**: Work Example 3, converting slope-intercept to standard form. Show finding the $x$-intercept quickly from standard form ($ax+by=c$, set $y=0$: $x=c/a$) versus the extra algebra needed to find the $x$-intercept from slope-intercept form — motivating why standard form has its own genuine use, not just historical convention.

**Contrast 2 (targets MC-2, choosing the efficient form)**: Present two problems side by side: (a) "slope 4, passes through $(0,7)$" (the $y$-intercept is given directly — slope-intercept form is immediate, $y=4x+7$) versus (b) "slope 4, passes through $(2,7)$" (not the intercept — point-slope form is immediate, $y-7=4(x-2)$, while slope-intercept form would require an extra solve-for-$b$ step). Ask which form is more efficient for each, and why — breaking the assumption that slope-intercept form is always the "default" starting point regardless of what's given.

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Find the slope-intercept equation of the line through $(2,-3)$ and $(6,5)$.
  2. Write, in point-slope form, the equation of a line with slope $\frac12$ passing through $(-4,3)$; then convert it to slope-intercept form.
  3. Convert $y=-\frac34x+6$ to standard form with integer coefficients and $a\geq0$.
  4. A line is given in standard form as $5x+2y=10$. Find both its $x$-intercept and $y$-intercept directly from this form (without converting to slope-intercept form first).
- **P76 (Transfer Probe, mode = independence)**: "A phone plan charges a flat $\$20$ monthly fee plus $\$0.10$ per text message beyond the free allotment; a customer who sent 50 extra texts last month was billed $\$25$. (a) Using the given rate ($\$0.10$ per text = the slope) and the one known data point (50 extra texts, \$25 billed), write the billing equation in POINT-SLOPE form directly, without first finding the flat fee. (b) Convert this to slope-intercept form and confirm the flat fee (the $y$-intercept) matches the stated \$20. (c) Explain why point-slope form was the more efficient choice to start with here, given what information was actually provided."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | POINT-SLOPE-FORM-AVOIDED | Defaulting to slope-intercept form even when given a slope and a non-intercept point, requiring an unnecessary extra algebraic step instead of using point-slope form directly | Moderate |
| MC-2 | INTERCEPTS-EXTRACTED-VIA-CONVERSION-ONLY | Converting standard form to slope-intercept form before finding intercepts, rather than reading intercepts directly off standard form by setting $x=0$ or $y=0$ | Moderate |
| MC-3 | FORMS-TREATED-AS-DIFFERENT-LINES | Believing slope-intercept, point-slope, and standard forms of the "same" equation can represent genuinely different lines, rather than recognizing them as algebraically equivalent rearrangements | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Point-Slope Avoidance") → P41 (detect: give a slope and non-intercept point and check whether the student attempts an unnecessary intermediate step to reach slope-intercept form first) → P64 (conceptual shift: re-anchor on "point-slope form works with ANY point — write it down directly, convert only if the problem specifically needs slope-intercept or standard form").
- **B02 (targets MC-2)**: P27 (name it: "Standard-Form Intercept Blindness") → P41 (detect: give a standard-form equation and ask for its intercepts, checking whether the student converts to slope-intercept form first unnecessarily) → P64 (conceptual shift: re-derive by setting $x=0$ (solve for $y$-intercept) or $y=0$ (solve for $x$-intercept) directly in standard form).
- **B03 (targets MC-3)**: P27 (name it: "Forms-as-Different-Lines Belief") → P41 (detect: give the same line in two different forms and ask if they're the same line) → P64 (conceptual shift: re-derive by direct algebraic conversion from one form to the other, confirming they're identical equations rearranged).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.geom.slope` (the slope value $m$ that all three forms depend on).
- **Unlocks**: `math.alg.system-linear-equations` (solving systems of two line equations directly uses these forms, especially standard form for elimination).
- **Cross-link**: KG lists `math.func.linear-function` as a cross-link. Verified via directory listing that no blueprint yet exists at `docs/curriculum/blueprints/math.func.linear-function.md`. Per the established P76_mode rule, this blueprint uses **independence** mode. A future revision, once that concept is authored, may add a genuine cross-link probe connecting these three line-equation forms directly to the function-notation view $f(x)=mx+b$ and function transformations.

## Component 8 — Teaching Notes

- estimated_hours = 8 with a proficient/apply tag places this at the "2 main TAs + gate" tier — A01 (slope-intercept and point-slope forms) and A02 (standard form plus the form-selection strategy) jointly cover all three LOs; despite three distinct forms being taught, the underlying content (all algebraically equivalent, differing only in which piece of given information is most directly usable) is conceptually unified enough that a third TA was not needed.
- The form-selection strategy (A02, Contrast 2) was deliberately elevated to its own explicit teaching moment rather than left implicit, because MC-1 (avoiding point-slope form) is a persistent efficiency-blindness pattern — students who can correctly execute all three forms in isolation still often default to the "first-taught" form regardless of what's actually efficient for the given information.
- The phone-plan transfer probe was chosen specifically to require the LEAST-efficient starting form (slope-intercept, which would need extra algebra) to be recognized as inferior to point-slope form given the problem's actual data shape (a rate and one data point, not the flat fee directly) — testing genuine strategic form-selection, not just mechanical form-writing.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.geom.slope`) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.func.linear-function` confirmed absent → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: graphed line before algebraic forms) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
