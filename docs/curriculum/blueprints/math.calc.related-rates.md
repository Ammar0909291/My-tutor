# Teaching Blueprint: Related Rates (`math.calc.related-rates`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.related-rates` |
| name | Related Rates |
| domain | Calculus |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 6 |
| requires | `math.calc.implicit-differentiation` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — diagram the changing quantities before differentiating |
| description (KG) | Using implicit differentiation with respect to time to relate the rates of change of multiple related quantities; e.g., expanding balloon radius and volume.

 |

## Component 1 — Learning Objectives

- LO1: Set up a related-rates problem by identifying an EQUATION relating the quantities involved (from geometry or a given relationship), then differentiate BOTH sides with respect to TIME $t$ using implicit differentiation — every variable quantity gets a $\frac{d(\cdot)}{dt}$ term via the chain rule.
- LO2: Correctly distinguish GIVEN rates (known numerical values, often at a specific instant) from the UNKNOWN rate being solved for, and substitute numerical values ONLY AFTER differentiating — never before.
- LO3: Recognize that a well-posed related-rates problem specifies the instant at which rates are evaluated, and that quantities may be genuinely CONSTANT (rate 0) at that instant even if they vary at other times.

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.implicit-differentiation` — related rates is exactly implicit differentiation performed with respect to time.

## Component 3 — Core Explanation

**Related rates** problems connect the rates of change of several quantities that are related by some equation, typically geometric (e.g. a sphere's volume and radius). The method: (1) identify an equation relating the quantities (e.g. $V=\frac{4}{3}\pi r^3$ for a sphere); (2) differentiate BOTH sides with respect to TIME $t$, treating each variable as an (implicit) function of $t$ — so $\frac{dV}{dt}=4\pi r^2\frac{dr}{dt}$ (a chain-rule application, since $r$ itself depends on $t$); (3) substitute the GIVEN numerical values (both the known rate and the quantity's value at the instant in question) to solve for the UNKNOWN rate.

A crucial ordering rule: substitute numbers ONLY AFTER differentiating symbolically. Substituting a specific numerical value for a variable BEFORE differentiating would incorrectly treat that variable as a CONSTANT (with derivative 0), destroying the very relationship the problem is asking about.

Rates can genuinely be ZERO at a specified instant (e.g. a ball at the peak of its trajectory has vertical velocity 0) — this doesn't indicate an error, but a real feature of the specific instant being examined.

## Component 4 — Worked Examples

**Example 1 (LO1 — setting up and differentiating, breaking MC-1)**: A spherical balloon's volume $V=\frac{4}{3}\pi r^3$ is being inflated; find $\frac{dV}{dt}$ in terms of $r$ and $\frac{dr}{dt}$. Differentiate BOTH sides with respect to $t$: $\frac{dV}{dt}=\frac{4}{3}\pi\cdot3r^2\cdot\frac{dr}{dt}=4\pi r^2\frac{dr}{dt}$ (chain rule: $r$ is a function of $t$). A common error substitutes a specific numerical radius (e.g. $r=5$) INTO the equation BEFORE differentiating, producing $V=\frac{4}{3}\pi(5)^3=$ a fixed NUMBER — differentiating a constant gives 0, destroying the relationship entirely; the radius must stay as the SYMBOL $r$ throughout differentiation, with numbers substituted only afterward.

**Example 2 (LO2 — substituting after differentiating)**: Continuing Example 1, given $\frac{dr}{dt}=2$ cm/s when $r=5$ cm, find $\frac{dV}{dt}$ at that instant. Substitute NOW (after differentiating): $\frac{dV}{dt}=4\pi(5)^2(2)=200\pi$ cm³/s.

**Example 3 (LO3 — a rate that is genuinely zero, breaking MC-2)**: A ladder of fixed length 10 ft leans against a wall, with the base sliding away at $\frac{dx}{dt}=2$ ft/s. Using $x^2+y^2=100$ (Pythagorean relationship), differentiate: $2x\frac{dx}{dt}+2y\frac{dy}{dt}=0$. At the instant when the ladder is exactly HORIZONTAL on the ground ($x=10$, $y=0$), solving for $\frac{dy}{dt}$ gives a DIVISION BY ZERO (since $y=0$ appears as a coefficient) — this signals that $\frac{dy}{dt}$ is genuinely UNDEFINED (infinite) at this precise instant, a real physical feature (the top of the ladder is moving infinitely fast at the exact instant it touches the ground), not a computational error to "fix." A common error assumes any algebraic breakdown (like division by zero) in a related-rates problem must indicate a setup mistake, rather than recognizing that some specific instants genuinely produce degenerate (zero or undefined) rates as a real feature of the geometry.

## Component 5 — Teaching Actions

### Teaching Action A01 — Differentiate Symbolically First, Substitute Numbers After (Primitive P64: Conceptual Shift)

Work Example 1, explicitly keeping $r$ symbolic through differentiation, contrasting with the incorrect early-substitution approach.

- **MC-1 hook**: check whether numerical substitution happens only after differentiation.

### Teaching Action A02 — Substituting Given Values to Solve for the Unknown Rate (reused procedure)

Work Example 2, explicitly separating "given" quantities from the "unknown" being solved for.

### Teaching Action A03 — Degenerate Rates (Zero or Undefined) Can Be Genuine, Not Errors (Primitive P06: Contrast Pair)

Work Example 3, explicitly interpreting the division-by-zero result as a real physical feature of that specific instant, rather than assuming a setup mistake.

- **MC-2 hook**: this directly targets MC-2 (assuming any degenerate result must indicate an error).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.75×5⌉ = 4/5.

- **P77 (4-problem set)**:
  1. For a cube with side length $s$, differentiate $V=s^3$ with respect to time to find $\frac{dV}{dt}$ in terms of $s$ and $\frac{ds}{dt}$.
  2. A circle's area $A=\pi r^2$ grows with $\frac{dr}{dt}=3$ cm/s. Find $\frac{dA}{dt}$ when $r=4$ cm.
  3. Explain, in one sentence, why substituting a numerical value for a variable BEFORE differentiating in a related-rates problem is incorrect.
  4. For the ladder problem (Example 3), explain what it physically means for $\frac{dy}{dt}$ to become undefined at $y=0$.
- **P76 (Transfer Probe, mode = independence)**: "Water is draining from a conical tank (radius shrinking proportionally with height, related by the cone's geometry) at a known rate $\frac{dV}{dt}=-5$ m³/min. (a) Set up the geometric relationship between the cone's volume $V$, radius $r$, and height $h$ (using the fact that $r$ and $h$ are proportional for a fixed cone shape), then differentiate with respect to time to relate $\frac{dV}{dt}$, $\frac{dh}{dt}$, and $h$. (b) Explain why you must NOT substitute the tank's current numerical water height into the volume equation before completing the differentiation step."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | NUMERICAL-VALUES-SUBSTITUTED-BEFORE-DIFFERENTIATING | Substituting a specific numerical value for a variable before differentiating, incorrectly treating it as a constant and destroying the relationship | Foundational |
| MC-2 | DEGENERATE-RATE-RESULT-ASSUMED-TO-BE-A-SETUP-ERROR | Assuming any zero or undefined rate result must indicate a setup mistake, rather than recognizing it can be a genuine feature of that specific instant | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Numerical Values Substituted Before Differentiating") → P41 (detect: present Example 1 and check whether a number is substituted before differentiating) → P64 (conceptual shift: re-work the problem keeping the variable symbolic throughout differentiation, substituting only at the final step).
- **B02 (targets MC-2)**: P27 ("Degenerate Rate Result Assumed to Be a Setup Error") → P41 (detect: present Example 3 and check whether the division-by-zero result is (incorrectly) treated as a mistake) → P64 (conceptual shift: re-examine the specific geometric instant, confirming the degenerate result reflects genuine physical behavior).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.implicit-differentiation`.
- **Unlocks**: none recorded in the KG.

## Component 8 — Teaching Notes

- estimated_hours = 6 (among the higher hour counts in the domain) reflects that related-rates problems require genuine multi-step setup (identifying the right geometric relationship, differentiating correctly, and substituting in the right order) rather than a single formula application.
- MC-1 was ranked Foundational because it is the single most common and most destructive error in this topic — students often bring numbers in too early out of habit from earlier, more static problems.
- The conical-tank transfer probe was deliberately chosen as a classic, high-value related-rates scenario (requiring an extra proportionality step between $r$ and $h$) that directly reinforces the "don't substitute early" discipline under a slightly more complex setup.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.calc.implicit-differentiation`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: diagram changing quantities before differentiating) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
