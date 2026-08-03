# Teaching Blueprint: Derivatives of Trigonometric Functions (`math.calc.derivative-trig`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.derivative-trig` |
| name | Derivatives of Trigonometric Functions |
| domain | Calculus |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 6 |
| requires | `math.calc.derivative-rules`, `math.trig.trig-functions`, `math.calc.squeeze-theorem` |
| unlocks | `math.calc.derivative-inverse-trig` |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) |
| description (KG) | d/dx(sin x) = cos x; d/dx(cos x) = −sin x; d/dx(tan x) = sec²x; and their reciprocals; all derivable from the definition and squeeze theorem.

 |

## Component 1 — Learning Objectives

- LO1: State the six trigonometric derivatives: $\frac{d}{dx}\sin x=\cos x$, $\frac{d}{dx}\cos x=-\sin x$ (WITH the negative sign — a commonly dropped detail), $\frac{d}{dx}\tan x=\sec^2x$, and their reciprocal-function counterparts.
- LO2: Recognize that ALL six derivatives are ultimately derivable from `math.calc.squeeze-theorem`'s $\lim_{x\to0}\frac{\sin x}{x}=1$ result COMBINED with the derivative's limit definition — $\sin x$ and $\cos x$'s derivatives are the FOUNDATIONAL pair, and the other four (tan, cot, sec, csc) are derived from these two via the QUOTIENT rule (since $\tan x=\sin x/\cos x$, etc.), not independently re-derived from the limit definition each time.
- LO3: Apply the CHAIN RULE when the trig function's argument is itself a function of $x$: $\frac{d}{dx}\sin(g(x))=\cos(g(x))\cdot g'(x)$ — a common omission is forgetting the chain-rule factor $g'(x)$.

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.derivative-rules` (the general rules combining these with other functions), `math.trig.trig-functions` (the six functions themselves), and `math.calc.squeeze-theorem` (the key limit result underlying the sin/cos derivations).

## Component 3 — Core Explanation

The six trigonometric derivatives are: $\frac{d}{dx}\sin x=\cos x$; $\frac{d}{dx}\cos x=-\sin x$ (note the NEGATIVE sign — easy to overlook); $\frac{d}{dx}\tan x=\sec^2x$; $\frac{d}{dx}\cot x=-\csc^2x$; $\frac{d}{dx}\sec x=\sec x\tan x$; $\frac{d}{dx}\csc x=-\csc x\cot x$.

These are NOT six independent facts to memorize in isolation. The FOUNDATIONAL pair, $\sin x$ and $\cos x$'s derivatives, come DIRECTLY from the derivative's limit definition combined with the Squeeze-Theorem result $\lim_{h\to0}\frac{\sin h}{h}=1$ (and the related $\lim_{h\to0}\frac{\cos h-1}{h}=0$). The remaining FOUR (tan, cot, sec, csc) are then derived using the QUOTIENT rule on $\tan x=\sin x/\cos x$, $\cot x=\cos x/\sin x$, $\sec x=1/\cos x$, $\csc x=1/\sin x$ — building on the sin/cos derivatives already established, rather than re-deriving each from the limit definition independently.

When the trig function's ARGUMENT is a function $g(x)$ (not just $x$ itself), the CHAIN RULE applies: $\frac{d}{dx}\sin(g(x))=\cos(g(x))\cdot g'(x)$ — the outer trig-derivative rule applied to the inside function, multiplied by the inside function's OWN derivative.

## Component 4 — Worked Examples

**Example 1 (LO1 — the sign on cos's derivative, breaking MC-1)**: Differentiate $f(x)=\cos x$ at a specific evaluation point to confirm the negative sign matters. Since $\cos x$ is DECREASING on $(0,\pi/2)$ (from $\cos(0)=1$ down toward $\cos(\pi/2)=0$), its derivative there must be NEGATIVE — consistent with $f'(x)=-\sin x$ being negative on that interval (since $\sin x>0$ there). A common error writes $\frac{d}{dx}\cos x=\sin x$ (dropping the negative sign) — this would incorrectly predict a POSITIVE derivative where $\cos x$ is actually decreasing, a sign contradiction that a quick graphical sanity check (as done here) immediately catches.

**Example 2 (LO2 — deriving tan's derivative from sin/cos via the quotient rule)**: Derive $\frac{d}{dx}\tan x$ using the quotient rule on $\tan x=\frac{\sin x}{\cos x}$. $\frac{d}{dx}\left(\frac{\sin x}{\cos x}\right)=\frac{(\cos x)(\cos x)-(\sin x)(-\sin x)}{\cos^2x}=\frac{\cos^2x+\sin^2x}{\cos^2x}=\frac{1}{\cos^2x}=\sec^2x$ — confirming the standard result, DERIVED from the already-known sin/cos derivatives rather than treated as an independent fact.

**Example 3 (LO3 — chain rule with a trig function, breaking MC-2)**: Differentiate $h(x)=\sin(3x^2)$. Let $g(x)=3x^2$ (so $g'(x)=6x$). $h'(x)=\cos(3x^2)\cdot6x=6x\cos(3x^2)$. A common error writes $h'(x)=\cos(3x^2)$ alone, OMITTING the chain-rule factor $6x$ — forgetting that whenever the trig function's argument is anything other than plain $x$, the chain rule's extra multiplication is mandatory.

## Component 5 — Teaching Actions

### Teaching Action A01 — Sign-Checking cos(x)'s Derivative via the Graph's Increasing/Decreasing Behavior (Primitive P64: Conceptual Shift)

Work Example 1, explicitly using the graph's monotonic behavior as a sanity check on the derivative's sign.

- **MC-1 hook**: check whether the negative sign on $\cos x$'s derivative is preserved.

### Teaching Action A02 — Deriving the Other Four Trig Derivatives from sin/cos via the Quotient Rule (Primitive P11: Representation Shift)

Work Example 2, explicitly reusing the quotient rule and the already-established sin/cos derivatives.

### Teaching Action A03 — Chain Rule Factor Is Mandatory Whenever the Argument Isn't Plain x (Primitive P06: Contrast Pair)

Work Example 3, contrasting the correct chain-rule application against the incorrect omission.

- **MC-2 hook**: this directly targets MC-2 (omitting the chain-rule factor).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.85×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. Differentiate $f(x)=\sin x+\cos x$, being careful with signs.
  2. Derive $\frac{d}{dx}\sec x$ using the quotient rule on $\sec x=1/\cos x$.
  3. Differentiate $f(x)=\cos(5x)$.
  4. Differentiate $f(x)=\tan(x^2+1)$.
- **P76 (Transfer Probe, mode = independence)**: "An engineer models the vertical displacement of a swinging pendulum as $y(t)=A\cos(\omega t)$ (amplitude $A$, angular frequency $\omega$), and needs the pendulum's instantaneous VELOCITY $y'(t)$ at any moment. (a) Differentiate $y(t)$ with respect to time, being careful with both the negative sign on cosine's derivative AND the chain-rule factor from the $\omega t$ argument. (b) Explain what would go physically wrong (in terms of predicting the wrong direction of motion) if the negative sign were accidentally dropped from the derivative."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | NEGATIVE-SIGN-DROPPED-FROM-COSINES-DERIVATIVE | Writing d/dx(cos x) = sin x, omitting the required negative sign | Foundational |
| MC-2 | CHAIN-RULE-FACTOR-OMITTED-FOR-TRIG-FUNCTION-OF-A-FUNCTION | Omitting the chain-rule factor g'(x) when differentiating a trig function of a non-trivial argument g(x) | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Negative Sign Dropped from Cosine's Derivative") → P41 (detect: present Example 1 and check whether the negative sign is included) → P64 (conceptual shift: re-verify using the graph's increasing/decreasing behavior as a sign sanity check).
- **B02 (targets MC-2)**: P27 ("Chain Rule Factor Omitted for Trig Function of a Function") → P41 (detect: present Example 3 and check whether $g'(x)=6x$ is included) → P64 (conceptual shift: re-identify $g(x)$ explicitly and re-multiply by $g'(x)$).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.derivative-rules`, `math.trig.trig-functions`, `math.calc.squeeze-theorem`.
- **Unlocks**: `math.calc.derivative-inverse-trig`.

## Component 8 — Teaching Notes

- estimated_hours = 6 and mastery_threshold = 0.85 (the highest in this batch) reflect the genuine importance of these six foundational derivatives, used pervasively throughout the rest of calculus.
- Both misconceptions were ranked Foundational because each is an extremely common, easily-repeated error with real downstream consequences (a sign error propagates through any subsequent calculation).
- The pendulum transfer probe was deliberately chosen because a dropped negative sign would predict the pendulum swinging in the WRONG direction at a given instant, giving the sign-error misconception concrete, checkable physical consequences.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.calc.derivative-rules`, `math.trig.trig-functions`, `math.calc.squeeze-theorem`) |
| V-4 | unlocks concepts named accurately from KG | PASS (`math.calc.derivative-inverse-trig`) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
