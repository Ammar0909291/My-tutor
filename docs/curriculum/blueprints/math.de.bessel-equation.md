# Teaching Blueprint: Bessel's Equation (`math.de.bessel-equation`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.de.bessel-equation` |
| name | Bessel's Equation |
| domain | Differential Equations |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.7 → MAMR = ⌈0.7×5⌉ = 4/5 |
| estimated_hours | 7 |
| requires | `math.de.frobenius-method` |
| unlocks | none |
| cross_links | `math.fnal.special-functions` (not yet authored — see Component 7) |
| CPA_entry_stage | C (Concrete) — applying `math.de.frobenius-method`'s procedure to the specific case ν=0 before naming the general family and its two solution types |
| description (KG) | $x^2y''+xy'+(x^2-\nu^2)y=0$; solutions are Bessel functions $J_\nu(x)$ and $Y_\nu(x)$. Arise in problems with cylindrical symmetry; $J_\nu$ regular at origin, $Y_\nu$ singular. |

## Component 1 — Learning Objectives

- LO1: Recognize Bessel's equation $x^2y''+xy'+(x^2-\nu^2)y=0$ as a CONCRETE instance of `math.de.frobenius-method`'s general setup — $x=0$ is a regular singular point — and set up (though not necessarily fully solve) the Frobenius ansatz and resulting indicial equation for it.
- LO2: Recognize $J_\nu(x)$ and $Y_\nu(x)$ as the TWO independent solutions this Frobenius analysis produces, distinguished by their behavior AT the origin: $J_\nu$ (the "Bessel function of the first kind") is REGULAR (finite) at $x=0$, while $Y_\nu$ (the "Bessel function of the second kind") is SINGULAR (blows up) there — correctly selecting which solution is physically admissible based on the problem's boundary requirements.
- LO3 (orientation level — full solution-family derivation deferred): recognize, without full derivation, that Bessel's equation arises NATURALLY (not as an arbitrary example) from problems with CYLINDRICAL SYMMETRY — e.g. separating variables in the 2D or 3D wave/heat/Laplace equation in cylindrical or polar coordinates produces EXACTLY this equation for the radial part, previewing its connection to `math.fnal.special-functions`'s broader catalogue of equation-generated special functions.

## Component 2 — Prerequisite Check

Assumes mastery of `math.de.frobenius-method` (the ansatz $y=x^r\sum a_nx^n$ for a regular singular point, the indicial equation, and the three-case classification by root difference).

## Component 3 — Core Explanation

**Bessel's equation is a specific application of `math.de.frobenius-method`'s general procedure, not a new technique**: writing Bessel's equation in the standard Frobenius setup — dividing by $x^2$ to identify $x=0$ as a regular singular point — and substituting the Frobenius ansatz $y=x^r\sum a_nx^n$ produces an indicial equation from the lowest-order term. This is EXACTLY `math.de.frobenius-method`'s own procedure, applied to this specific ODE — no new solving technique is introduced here, only a concrete worked instance.

**$J_\nu$ and $Y_\nu$ are distinguished by their behavior at the origin, which determines physical admissibility**: solving Bessel's equation via Frobenius produces (for non-integer $\nu$) two independent solutions corresponding to the indicial equation's roots $r=\pm\nu$: $J_\nu(x)$ (built from $r=+\nu$) is REGULAR — finite and well-defined — AT $x=0$, while $Y_\nu(x)$ (needed to complete a basis, especially when $\nu$ is an integer, per `math.de.frobenius-method`'s integer-difference case) is SINGULAR, blowing up as $x\to0$. In PHYSICAL problems where the domain includes the origin (e.g. a solid cylinder, not a hollow tube), $Y_\nu$ must be DISCARDED (its coefficient set to zero) since a physically meaningful solution cannot blow up at the center — only $J_\nu$ is admissible there.

**Bessel's equation arises naturally from cylindrical symmetry, not as an arbitrary textbook example (orientation level)**: separating variables in the 2D wave equation, heat equation, or Laplace's equation using POLAR or CYLINDRICAL coordinates (appropriate for problems with circular/cylindrical geometry — a drumhead, a cylindrical waveguide, heat flow in a cylindrical rod) produces, for the RADIAL part of the separated solution, exactly Bessel's equation (with $\nu$ determined by the ANGULAR separation constant). This is why Bessel functions appear so pervasively in physics and engineering — they are not an isolated curiosity but the natural radial building block for an entire class of physically important problems, connecting to `math.fnal.special-functions`'s broader catalogue of similarly equation-generated function families. Full derivation of this separation-of-variables connection is deferred beyond this concept's core scope.

## Component 4 — Worked Examples

**Example 1 (LO1 — setting up Bessel's equation via the Frobenius procedure, breaking MC-1)**: for Bessel's equation with $\nu=0$: $x^2y''+xy'+x^2y=0$. Substituting the Frobenius ansatz $y=\sum a_nx^{n+r}$: $y'=\sum a_n(n+r)x^{n+r-1}$, $y''=\sum a_n(n+r)(n+r-1)x^{n+r-2}$, giving $x^2y''+xy'+x^2y=\sum a_n(n+r)(n+r-1)x^{n+r}+\sum a_n(n+r)x^{n+r}+\sum a_nx^{n+r+2}$. Collecting the LOWEST-order term ($n=0$, from the first two sums): $a_0[r(r-1)+r]x^r=a_0r^2x^r=0$, giving the indicial equation $r^2=0$ — a REPEATED root $r=0$ (matching `math.de.frobenius-method`'s equal-roots case). This is the SAME setup procedure already learned, applied here concretely.

**Example 2 (LO2 — $J_\nu$ regular, $Y_\nu$ singular, selecting the physical solution, breaking MC-2)**: for a problem modeling the vibration of a solid circular drumhead (radius $R$, INCLUDING the center $x=0$ in the domain): the general solution to the radial Bessel equation is $y=c_1J_\nu(x)+c_2Y_\nu(x)$. Since $Y_\nu(x)\to-\infty$ (or oscillates unboundedly) as $x\to0$, but the drumhead's PHYSICAL displacement must remain finite everywhere, including at the center — this FORCES $c_2=0$, leaving only $y=c_1J_\nu(x)$ as the physically admissible solution. Had the problem instead concerned an ANNULAR (ring-shaped) drumhead, excluding the origin from the domain, BOTH $J_\nu$ and $Y_\nu$ would remain admissible, since neither singularity at $x=0$ would fall inside the physical domain.

**Example 3 (LO3, orientation level — cylindrical symmetry generating Bessel's equation naturally, breaking MC-3)**: separating variables for the 2D wave equation $\frac{\partial^2u}{\partial t^2}=c^2\nabla^2u$ on a circular drumhead, writing $u(r,\theta,t)=R(r)\Theta(\theta)T(t)$: the ANGULAR separation forces $\Theta(\theta)=\cos(n\theta)$ or $\sin(n\theta)$ for integer $n$ (periodicity in $\theta$), and substituting back, the RADIAL function $R(r)$ satisfies EXACTLY Bessel's equation with $\nu=n$ (the same integer from the angular separation). This is not an artificial construction — the geometry of the circular drumhead DIRECTLY produces Bessel's equation as the natural radial equation, confirming why $J_n(x)$ functions (not some other arbitrary special function) are the correct building blocks for circular-drumhead vibration modes.

## Component 5 — Teaching Actions

### Teaching Action A01 — Bessel's Equation Is a Concrete Application, Not a New Method (Primitive P11: Representation Shift)

State: "solving Bessel's equation doesn't require a new technique — it's exactly `math.de.frobenius-method`'s own procedure (Frobenius ansatz, indicial equation), applied to this specific, famous ODE." Walk Example 1's direct application of the Frobenius setup to $\nu=0$.

- **MC-1 hook**: ask "does solving Bessel's equation require learning a genuinely new solution technique, beyond what `math.de.frobenius-method` already covers?" — a "yes" answer reveals MC-1 (missing that Bessel's equation is solved by exactly the same Frobenius procedure, applied to this specific ODE).

### Teaching Action A02 — Physical Domains Determine Which Solution Is Admissible (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: a solid drumhead's physical requirement (finite displacement at the center) FORCES discarding $Y_\nu$ entirely, while an annular drumhead would keep BOTH solutions. State: "you can't just write down 'the general solution' and stop — whether $Y_\nu$ survives depends entirely on whether the physical domain includes the singular point at the origin."

- **MC-2 hook**: ask "should the general solution $y=c_1J_\nu(x)+c_2Y_\nu(x)$ always be kept in full, regardless of the physical problem's domain?" — a "yes" answer reveals MC-2 (missing that $Y_\nu$'s singularity at the origin forces it to be discarded whenever the physical domain includes $x=0$).

### Teaching Action A03 — Bessel's Equation Emerges Naturally From Cylindrical Geometry, Not Arbitrarily (Primitive P06: Contrast Pair)

Contrast a hypothetical view of Bessel's equation as "just one example problem among many, chosen somewhat arbitrarily for practice" against Example 3's direct derivation showing it emerges INEVITABLY from separating variables in circular/cylindrical geometry. State: "Bessel's equation isn't an arbitrary textbook exercise — it's the equation that circular and cylindrical symmetry FORCES you to solve, the moment you separate variables in that geometry."

- **MC-3 hook**: ask "is Bessel's equation essentially an arbitrary example ODE, chosen somewhat randomly for Frobenius-method practice, unconnected to any specific physical geometry?" — a "yes" answer reveals MC-3 (missing that it arises inevitably from separating variables in problems with cylindrical/circular symmetry).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Set up the Frobenius ansatz for Bessel's equation with $\nu=1$, and derive the resulting indicial equation.
  2. State whether the roots from problem 1 have a difference that is an integer, non-integer, or zero, and what this implies (citing `math.de.frobenius-method`) about the solution structure.
  3. For a physical problem on a solid cylindrical rod (domain includes the central axis, $r=0$), explain which Bessel function(s) should appear in the physically admissible solution, and why.
  4. Explain, in one or two sentences, why Bessel's equation arises specifically from problems with cylindrical or circular symmetry.
- **P76 (Transfer Probe, mode = independence)**: "An engineer models heat conduction in a solid cylindrical rod of radius $R$, with the temperature satisfying a Bessel-type radial equation with $\nu=0$ after separation of variables. (a) Explain, citing the Frobenius setup, why the radial solution takes the form $c_1J_0(r)+c_2Y_0(r)$. (b) Since the rod is SOLID (includes the central axis $r=0$), determine which term must vanish and why, citing the physical requirement of finite temperature. (c) If the engineer instead modeled heat conduction in a HOLLOW cylindrical pipe (excluding the central axis from the domain), explain how the admissible solution set would change, and why."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | BESSEL-ASSUMED-NEW-TECHNIQUE | Believing solving Bessel's equation requires a genuinely new technique, missing that it is exactly the Frobenius method applied to this specific ODE | Foundational |
| MC-2 | GENERAL-SOLUTION-ASSUMED-ALWAYS-KEPT-IN-FULL | Believing the full general solution $c_1J_\nu+c_2Y_\nu$ should always be kept regardless of the physical domain, missing that $Y_\nu$'s singularity forces it out whenever the origin is included | High |
| MC-3 | BESSEL-EQUATION-ASSUMED-ARBITRARY-EXAMPLE | Believing Bessel's equation is an arbitrary example ODE unconnected to any specific geometry, missing that it arises inevitably from cylindrical/circular symmetry | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Bessel Assumed New Technique") → P41 (detect: ask whether solving Bessel's equation requires a genuinely new technique) → P64 (conceptual shift: re-walk Example 1's direct Frobenius setup for $\nu=0$, re-anchoring on "exactly the same Frobenius procedure, applied to this specific ODE").
- **B02 (targets MC-2)**: P27 (name it: "General Solution Assumed Always Kept in Full") → P41 (detect: ask whether the full general solution should always be kept regardless of domain) → P64 (conceptual shift: re-walk Example 2's solid-versus-annular-drumhead contrast, re-anchoring on "the physical domain determines which solution is admissible").
- **B03 (targets MC-3)**: P27 (name it: "Bessel Equation Assumed Arbitrary Example") → P41 (detect: ask whether Bessel's equation is an arbitrary example unconnected to any specific geometry) → P64 (conceptual shift: re-walk Example 3's separation-of-variables derivation, re-anchoring on "it arises inevitably from cylindrical/circular symmetry").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.de.frobenius-method` (the ansatz, indicial equation, and case classification this concept's entire solution procedure directly reuses).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.fnal.special-functions`, checked via `ls docs/curriculum/blueprints/` and confirmed NOT YET authored. $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 7 with an expert/apply tag supports the "3 TAs + gate" tier, with LO1 and LO2 given full computational and conceptual depth (the direct Frobenius setup and the physical-domain-based solution selection) and LO3 kept orientation-level, appropriately previewing the separation-of-variables origin without deriving the full 2D wave-equation separation.
- **Division of labor**: `math.de.frobenius-method` owns the general Frobenius ansatz/indicial-equation/case-classification procedure; this concept owns the SPECIFIC application to Bessel's equation and the physical interpretation of its two solution types — deliberately using $\nu=0$ throughout Examples 1–2 (the simplest, most commonly encountered case) so the indicial-equation derivation and the physical-domain selection connect to one concrete, easily-visualized running case (a circular drumhead).
- Example 2's deliberate choice to contrast a SOLID versus an ANNULAR domain (rather than only stating the solid-domain rule) was chosen to make MC-2's "always keep both solutions" misconception concretely falsifiable in one direction, while still establishing that domain-dependence is genuinely a two-way distinction, not merely "always discard $Y_\nu$."

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.fnal.special-functions` confirmed unauthored → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.7×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: applying the Frobenius procedure to the specific case $\nu=0$ precedes the general family and its two solution types) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
