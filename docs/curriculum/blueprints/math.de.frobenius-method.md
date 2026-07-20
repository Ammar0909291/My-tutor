# Teaching Blueprint: Frobenius Method (`math.de.frobenius-method`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.de.frobenius-method` |
| name | Frobenius Method |
| domain | Differential Equations |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.7 → MAMR = ⌈0.7×5⌉ = 4/5 |
| estimated_hours | 8 |
| requires | `math.de.series-solution` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — attempting `math.de.series-solution`'s ordinary-point ansatz on one specific singular-point ODE and observing it fails, before naming the general Frobenius modification |
| description (KG) | For ODEs with a regular singular point at $x=0$, seeks solutions of the form $y=x^r\sum a_nx^n$. The indicial equation determines $r$. Three subcases based on root difference: distinct non-integer, integer, or equal roots. |

## Component 1 — Learning Objectives

- LO1: Recognize that `math.de.series-solution`'s own ansatz $y=\sum a_nx^n$ REQUIRES $x=0$ to be an ORDINARY point, and that at a REGULAR SINGULAR point, this ansatz fails — motivating the Frobenius MODIFICATION $y=x^r\sum a_nx^n$, which introduces an extra factor $x^r$ (with $r$ not necessarily a non-negative integer) to accommodate the singularity.
- LO2: Derive the INDICIAL EQUATION (a quadratic in $r$, obtained from the LOWEST-order term when substituting the Frobenius ansatz into the ODE) and solve it to determine the possible values of $r$ — recognizing this as the FIRST new step beyond `math.de.series-solution`'s own coefficient-recurrence procedure.
- LO3 (orientation level — full three-case derivation deferred): recognize, without full derivation, that the indicial equation's TWO roots $r_1,r_2$ (with $r_1\ge r_2$) determine THREE structurally different cases for the general solution — DISTINCT non-integer difference (both roots give independent Frobenius series solutions directly), INTEGER difference, and EQUAL roots (the latter two requiring a LOGARITHMIC term in the second solution) — previewing that the roots' relationship, not merely their individual values, governs the solution's structure.

## Component 2 — Prerequisite Check

Assumes mastery of `math.de.series-solution` (the ansatz $y=\sum a_nx^n$, substituted into an ODE to derive a coefficient recurrence, valid at an ORDINARY point).

## Component 3 — Core Explanation

**The ordinary-point ansatz fails at a singular point — Frobenius adds an $x^r$ factor to compensate**: `math.de.series-solution`'s ansatz $y=\sum_{n=0}^\infty a_nx^n$ implicitly assumes $y$ and its derivatives are all WELL-BEHAVED (analytic) at $x=0$ — valid precisely when $x=0$ is an ORDINARY point of the ODE. At a REGULAR SINGULAR point (where the ODE's coefficients have a controlled, specific TYPE of singularity), this simple power-series ansatz generally FAILS to capture the true solution's behavior near $x=0$ (which may blow up, or behave like a non-integer power of $x$). The FROBENIUS modification, $y=x^r\sum_{n=0}^\infty a_nx^n$, introduces the extra factor $x^r$ specifically to accommodate this — with $r$ now an UNKNOWN to be determined, not fixed at $0$ or a positive integer as the ordinary ansatz implicitly assumes.

**The indicial equation is the first new step, determining $r$ before finding the coefficients**: substituting the Frobenius ansatz into the ODE and collecting the LOWEST-order term (typically $x^{r-2}$ or similar, depending on the ODE's order) produces the INDICIAL EQUATION — a quadratic (for second-order ODEs) purely in $r$, with NO dependence on the coefficients $a_n$ yet. Solving this FIRST determines which value(s) of $r$ can make the ansatz work at all — only AFTER $r$ is known does the rest of the substitution (matching higher-order terms) produce the coefficient recurrence for $a_n$, analogous to (but building on top of) `math.de.series-solution`'s own recurrence-derivation procedure.

**The relationship between the indicial equation's two roots — not just their values — determines the solution structure (orientation level)**: with roots $r_1\ge r_2$ of the (generally quadratic) indicial equation, THREE cases arise: if $r_1-r_2$ is NOT an integer, both roots independently give valid Frobenius series solutions, and the general solution is simply their combination. If $r_1-r_2$ IS a positive integer, or if $r_1=r_2$ (equal roots), the SECOND solution (associated with $r_2$) generally requires an ADDITIONAL logarithmic term, $y_2=(\text{Frobenius series})+Cy_1\ln x$, because the naive series approach for $r_2$ can fail to produce a genuinely independent second solution. Full derivation of all three cases is deferred beyond this concept's core scope.

## Component 4 — Worked Examples

**Example 1 (LO1 — the ordinary ansatz failing, motivating the Frobenius modification, breaking MC-1)**: for the Euler-Cauchy-type ODE $x^2y''+xy'-y=0$ (with a regular singular point at $x=0$, since dividing by $x^2$ makes the coefficients singular there): attempting `math.de.series-solution`'s own ordinary ansatz $y=\sum a_nx^n$ (i.e., trying $r=0$) leads to a coefficient recurrence that, checked directly, does NOT produce the actual known solutions $y=x$ and $y=x^{-1}$ (verified by direct substitution: $y=x$ gives $x^2(0)+x(1)-x=0$ ✓, but $x^{-1}$ is not even representable as an ordinary power series $\sum a_nx^n$ starting at $n=0$ with $a_0\ne0$, since it blows up at $x=0$). This confirms $x=0$ genuinely requires the Frobenius modification, since a NON-integer-power (or negative-power) behavior is present.

**Example 2 (LO2 — deriving and solving the indicial equation, breaking MC-2)**: continuing Example 1 with the FROBENIUS ansatz $y=x^r\sum a_nx^n=\sum a_nx^{n+r}$ (with $a_0\ne0$): substituting, $y'=\sum a_n(n+r)x^{n+r-1}$, $y''=\sum a_n(n+r)(n+r-1)x^{n+r-2}$, giving $x^2y''+xy'-y=\sum a_n[(n+r)(n+r-1)+(n+r)-1]x^{n+r}=\sum a_n[(n+r)^2-1]x^{n+r}$. The LOWEST-order term ($n=0$, coefficient $a_0\ne0$) forces $r^2-1=0$ — the INDICIAL EQUATION, giving $r=\pm1$. This matches Example 1's directly-verified solutions $y=x$ (corresponding to $r=1$) and $y=x^{-1}$ (corresponding to $r=-1$) EXACTLY — confirming the indicial equation correctly identifies the two power-law behaviors present, obtained BEFORE any coefficient recurrence was needed.

**Example 3 (LO3, orientation level — the roots' difference determining structure, breaking MC-3)**: Example 2's roots $r_1=1,r_2=-1$ have DIFFERENCE $r_1-r_2=2$, an INTEGER — placing this example in the "integer difference" case, where the SECOND solution (for $r_2=-1$) can potentially require a logarithmic term $Cy_1\ln x$. In this PARTICULAR case, it turns out no logarithm is actually needed (the coefficient that would multiply $\ln x$ happens to vanish) — but had the equation been SLIGHTLY different (e.g. a genuinely resonant case), the log term would be forced. Contrast with a hypothetical case with roots $r_1=1.5,r_2=0.3$ (difference $1.2$, NOT an integer): there, BOTH roots automatically give independent Frobenius series with NO risk of a logarithmic complication — confirming that it is specifically the INTEGER-differences (and equal-roots) cases that require this extra structural care, not merely "large" or "small" root values.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Frobenius Ansatz Is a Targeted Fix for the Ordinary Ansatz's Failure (Primitive P11: Representation Shift)

State: "you're not learning an unrelated new technique — the extra factor $x^r$ is a specific, targeted fix for exactly the situation where `math.de.series-solution`'s ordinary ansatz fails to capture solutions that blow up or behave like non-integer powers near $x=0$." Walk Example 1's direct verification that the ordinary ansatz cannot represent $y=x^{-1}$.

- **MC-1 hook**: ask "is the Frobenius ansatz $y=x^r\sum a_nx^n$ an entirely unrelated technique from `math.de.series-solution`'s ordinary series ansatz, rather than a targeted modification of it?" — a "yes" answer reveals MC-1 (missing that Frobenius's extra factor $x^r$ is a specific fix for the ordinary ansatz's failure at a singular point).

### Teaching Action A02 — The Indicial Equation Comes First, Determining r Before Any Coefficients (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: the indicial equation $r^2-1=0$ was obtained PURELY from the lowest-order term, with NO coefficient recurrence needed yet, and its roots matched the already-known solutions exactly. State: "you determine $r$ FIRST, from the indicial equation alone — only after that do you proceed to find the coefficients, in an order that's the opposite of what you might expect if you tried to jump straight to a recurrence."

- **MC-2 hook**: ask "does applying the Frobenius method start with the same coefficient-recurrence derivation as `math.de.series-solution`'s ordinary method, with the indicial equation only appearing as an afterthought?" — a "yes" answer reveals MC-2 (missing that the indicial equation is derived FIRST and determines $r$ before any coefficient recurrence is found).

### Teaching Action A03 — It's the Roots' Difference, Not Their Individual Size, That Determines the Case (Primitive P06: Contrast Pair)

Contrast Example 3's integer-difference case ($r_1-r_2=2$, requiring extra care about a possible log term) against a hypothetical non-integer-difference case ($1.5$ and $0.3$, automatically safe). State: "what matters for classifying which of the three cases you're in is the DIFFERENCE between the two roots — whether it's an integer or not — not how large or small either root individually happens to be."

- **MC-3 hook**: ask "is whether a logarithmic term is needed in the second Frobenius solution determined by how LARGE the indicial equation's roots are, rather than by the relationship (difference) between them?" — a "yes" answer reveals MC-3 (missing that it is specifically the DIFFERENCE between the two roots — integer vs. non-integer, or equal — that determines the case).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Verify that $x=0$ is a regular singular point for $2x^2y''+3xy'-y=0$ (i.e., the coefficients, after dividing by the leading term, have the controlled singularity type Frobenius requires).
  2. Substitute the Frobenius ansatz into the ODE from problem 1 and derive its indicial equation.
  3. Solve problem 2's indicial equation, and state whether the two roots' difference is an integer, non-integer, or zero.
  4. Explain, in one or two sentences, why the ordinary series-solution ansatz alone would fail for the ODE in problem 1.
- **P76 (Transfer Probe, mode = independence)**: "A physicist analyzing a radially symmetric wave equation encounters the ODE $x^2y''+xy'+(x^2-\nu^2)y=0$ (Bessel's equation) near $x=0$, a regular singular point. (a) Set up the Frobenius ansatz and identify the general form of the indicial equation you would derive (without necessarily completing every algebraic step). (b) Explain why simply trying `math.de.series-solution`'s ordinary ansatz would be expected to fail for this equation, given the singularity at $x=0$. (c) If the indicial equation for a particular value of $\nu$ produced two roots differing by a positive integer, explain what additional structural complication the physicist should anticipate when constructing the second linearly independent solution."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | FROBENIUS-ASSUMED-UNRELATED-TECHNIQUE | Believing the Frobenius ansatz is an entirely unrelated technique from the ordinary series-solution ansatz, missing that it is a targeted fix for the ordinary ansatz's failure at a singular point | Foundational |
| MC-2 | INDICIAL-EQUATION-ASSUMED-AFTERTHOUGHT | Believing the Frobenius method starts with the same coefficient-recurrence derivation as the ordinary method, missing that the indicial equation is derived FIRST, determining $r$ before any coefficients | High |
| MC-3 | LOG-TERM-NEED-ASSUMED-DETERMINED-BY-ROOT-SIZE | Believing whether a logarithmic term is needed is determined by the roots' individual size, missing that it is the DIFFERENCE between the two roots that determines the case | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Frobenius Assumed Unrelated Technique") → P41 (detect: ask whether the Frobenius ansatz is entirely unrelated to the ordinary series-solution ansatz) → P64 (conceptual shift: re-walk Example 1's demonstration that the ordinary ansatz cannot represent $x^{-1}$, re-anchoring on "Frobenius's $x^r$ factor is a targeted fix for this exact failure").
- **B02 (targets MC-2)**: P27 (name it: "Indicial Equation Assumed Afterthought") → P41 (detect: ask whether the Frobenius method starts with the same coefficient-recurrence derivation as the ordinary method) → P64 (conceptual shift: re-walk Example 2's indicial-equation-first derivation, re-anchoring on "$r$ is determined FIRST, before any coefficient recurrence").
- **B03 (targets MC-3)**: P27 (name it: "Log Term Need Assumed Determined by Root Size") → P41 (detect: ask whether the need for a logarithmic term is determined by root size rather than the roots' difference) → P64 (conceptual shift: re-walk Example 3's integer-versus-non-integer-difference contrast, re-anchoring on "it's the DIFFERENCE between the roots that determines the case").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.de.series-solution` (the ordinary power-series ansatz and coefficient-recurrence procedure this concept's Frobenius modification directly extends).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: none listed in the KG for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 8 with an expert/apply tag supports the "3 TAs + gate" tier, with LO1 and LO2 given full computational depth (the ordinary-ansatz-failure demonstration and the complete indicial-equation derivation) and LO3 kept orientation-level, appropriately surveying the three-case classification without deriving the logarithmic-term formula in the integer/equal-root cases.
- **Division of labor**: `math.de.series-solution` owns the ordinary-point ansatz and its coefficient-recurrence procedure; this concept owns the SPECIFIC modification for regular singular points (the $x^r$ factor, the indicial equation, and the three-case classification) — deliberately using the SAME Euler-Cauchy-type ODE across Examples 1–3 so the ordinary-ansatz failure, the indicial-equation derivation, and the case-classification all connect to one running, exactly-solvable example whose true solutions ($x$ and $x^{-1}$) are independently verifiable.
- Example 3's deliberate choice to note that THIS particular integer-difference case happens to NOT need a log term (while still flagging that other cases genuinely would) was chosen to avoid the overcorrection of implying every integer-difference case automatically requires a logarithm, while still establishing the correct general classification principle.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (none listed in KG) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.7×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: attempting the ordinary ansatz and observing its failure precedes the general Frobenius modification) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
