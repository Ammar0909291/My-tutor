# Teaching Blueprint: Double Integrals (`math.calc.double-integrals`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.double-integrals` |
| name | Double Integrals |
| domain | Calculus |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 10 |
| requires | `math.calc.multiple-integrals` |
| unlocks | `math.calc.triple-integrals` |
| cross_links | none |
| CPA_entry_stage | P (Pictorial) — a circular/annular region that resists a clean Cartesian description, before the polar substitution |
| description (KG) | ∬_D f(x,y)dA computes volume under a surface over region D; evaluated by Fubini's theorem as an iterated integral; also in polar coordinates. |

## Component 1 — Learning Objectives

- LO1: Recognize that the Cartesian iterated-integral machinery for $\iint_D f(x,y)\,dA$ (signed volume, Fubini's Theorem, variable bounds for non-rectangular regions) — already fully established in `math.calc.multiple-integrals` — carries over unchanged here; this concept's distinct focus is evaluating double integrals over regions that are AWKWARD in Cartesian coordinates but NATURAL in **polar coordinates**.
- LO2: Convert a double integral to **polar coordinates** using $x=r\cos\theta$, $y=r\sin\theta$, and correctly apply the polar area element $dA = r\,dr\,d\theta$ — directly refuting the misconception that the area element simply becomes $dr\,d\theta$ with no extra factor of $r$.
- LO3: Correctly determine the $r$ and $\theta$ bounds for a polar region (e.g. a disk, an annulus, or a circular sector) directly from the region's geometric description, rather than by attempting to translate Cartesian bounds mechanically.

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.multiple-integrals` (the double integral as signed volume, iterated integration, Fubini's Theorem, and variable bounds for non-rectangular Cartesian regions — all directly reused, not re-taught, here).

## Component 3 — Core Explanation

**Division of labor with `math.calc.multiple-integrals`**: that prerequisite concept already fully established HOW to evaluate $\iint_D f(x,y)\,dA$ as an iterated integral in Cartesian coordinates, including Fubini's order-swap guarantee and the need for variable bounds over non-rectangular regions. This concept does **not** re-derive any of that — instead, it addresses a specific situation that Cartesian coordinates handle awkwardly: regions defined naturally by DISTANCE FROM THE ORIGIN and ANGLE (disks, annuli, circular sectors, or integrands featuring $x^2+y^2$), where switching to **polar coordinates** dramatically simplifies both the region's description and the integrand.

**The polar area element — why $dA=r\,dr\,d\theta$, not just $dr\,d\theta$**: converting $x=r\cos\theta,y=r\sin\theta$, a small "rectangular" piece of area in polar coordinates (bounded by two nearby radii $r,r+dr$ and two nearby angles $\theta,\theta+d\theta$) is NOT a small rectangle of dimensions $dr\times d\theta$ — it's a small, slightly curved wedge whose "width" in the angular direction depends on how far out from the origin it is: a wedge at large $r$ sweeps out more actual area for the same $d\theta$ than an identical $d\theta$ sweep close to the origin. Precisely, this wedge's area is $r\,dr\,d\theta$ — the extra factor of $r$ compensates for this radius-dependent widening, and it must **always** be included when converting $dA$ to polar form.

**Determining bounds directly from the region's geometry**: rather than trying to mechanically translate Cartesian bounds into polar ones, the most reliable approach is to describe the region NATURALLY in polar terms from the start: for a full disk of radius $R$ centered at the origin, $\theta$ ranges over $[0,2\pi)$ and $r$ ranges over $[0,R]$; for an annulus (a "ring" between two radii $R_1<R_2$), $r$ ranges over $[R_1,R_2]$ with $\theta$ still full-circle; for a circular sector (a "pie slice"), $\theta$ is restricted to the slice's angular range while $r$ still runs from $0$ to the sector's radius.

## Component 4 — Worked Examples

**Example 1 (LO1/LO2 — a disk integral, Cartesian awkward, polar natural)**: Compute $\iint_D e^{-(x^2+y^2)}\,dA$ where $D$ is the disk $x^2+y^2\le4$. In Cartesian coordinates, this integral has NO elementary antiderivative in $x$ or $y$ separately, making the Cartesian iterated-integral approach from `math.calc.multiple-integrals` essentially unworkable here. Converting to polar: $x^2+y^2=r^2$, so the integrand becomes $e^{-r^2}$, and $D$ (the disk of radius $2$) becomes simply $0\le r\le2$, $0\le\theta\le2\pi$. The integral becomes $\int_0^{2\pi}\int_0^2 e^{-r^2}\cdot r\,dr\,d\theta$ — now solvable directly (the inner integral is a simple u-substitution with $u=r^2$): $\int_0^2 re^{-r^2}\,dr = \left[-\frac12e^{-r^2}\right]_0^2 = -\frac12e^{-4}+\frac12 = \frac12(1-e^{-4})$. Then $\int_0^{2\pi}\frac12(1-e^{-4})\,d\theta = \pi(1-e^{-4})$.

**Example 2 (LO2 — the extra factor of r, verified against a known area, breaking MC-1)**: Compute the area of the disk $x^2+y^2\le R^2$ using $\iint_D 1\,dA$ in polar form: $\int_0^{2\pi}\int_0^R r\,dr\,d\theta = \int_0^{2\pi}\left[\frac{r^2}{2}\right]_0^Rd\theta = \int_0^{2\pi}\frac{R^2}{2}\,d\theta = \pi R^2$ — matching the well-known circle-area formula EXACTLY. Now check what happens WITHOUT the extra factor of $r$ (a common error): $\int_0^{2\pi}\int_0^R 1\,dr\,d\theta = \int_0^{2\pi}R\,d\theta = 2\pi R$ — a completely different (and dimensionally wrong — this is a LENGTH, not an area) result, proving the factor of $r$ is not optional decoration but essential to getting the correct area at all.

**Example 3 (LO3 — bounds for an annulus and a sector, described directly in polar terms)**: For the annulus between radius $1$ and radius $3$ (a full ring, no angular restriction): $r$ ranges over $[1,3]$, $\theta$ over $[0,2\pi)$ — read directly off the region's description, no Cartesian translation needed. For a quarter-disk sector of radius $2$ in the first quadrant only: $r$ ranges over $[0,2]$, but $\theta$ is restricted to $[0,\pi/2]$ (first quadrant only) — again read directly from the geometric description (which quadrant, which radius) rather than attempting to first write Cartesian inequalities and then convert them.

## Component 5 — Teaching Actions

### Teaching Action A01 — When Polar Beats Cartesian: An Integral Cartesian Can't Solve (Primitive P28: Conflict Evidence)

Present Example 1's motivating case: $\iint_D e^{-(x^2+y^2)}\,dA$ has no elementary Cartesian antiderivative, but converts to a directly solvable form in polar coordinates. State: "everything about SETTING UP an iterated integral — Fubini, variable bounds — you already know from `math.calc.multiple-integrals`. What's new here is recognizing when switching the entire coordinate SYSTEM, not just the bounds, makes an otherwise-stuck integral solvable."

### Teaching Action A02 — The Polar Area Element Needs the Extra r (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: computing the disk's area WITH the factor $r$ gives the correct $\pi R^2$; WITHOUT it gives $2\pi R$ (wrong, and even dimensionally suspicious — a length where an area is expected). State clearly: "$dA=r\,dr\,d\theta$ — that $r$ is not optional. It accounts for polar wedges getting geometrically WIDER the farther out from the origin you go, for the same angular sweep."

- **MC-1 hook**: ask "when converting $dA$ to polar coordinates, does it just become $dr\,d\theta$?" — a "yes" answer reveals MC-1 (omitting the essential factor of $r$, missing the geometric reason a polar area element isn't a simple rectangle).

### Teaching Action A03 — Reading Polar Bounds Directly From the Region's Shape (Primitive P11: Representation Shift)

Work Example 3's disk/annulus/sector bounds directly, emphasizing: "describe the region in NATIVE polar language first — how far out (r-range) and through what angular sweep (θ-range) — rather than starting from a Cartesian inequality and trying to translate it piece by piece."

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Compute the area of the disk $x^2+y^2\le9$ using a polar double integral, showing the factor of $r$ explicitly.
  2. Compute $\iint_D (x^2+y^2)\,dA$ where $D$ is the disk $x^2+y^2\le1$, converting to polar coordinates first.
  3. State the $r$ and $\theta$ bounds (no need to fully evaluate) for the region that is the upper half ($y\ge0$) of the annulus between radius $2$ and radius $5$.
  4. A student computes the area of a disk of radius $3$ using $\int_0^{2\pi}\int_0^3 1\,dr\,d\theta$ (omitting the factor of $r$) and gets $6\pi$. Explain what's wrong with this computation and provide the correct area.
- **P76 (Transfer Probe, mode = independence)**: "A physicist needs to compute the total charge on a circular metal disk of radius $5$ cm, where the charge density at a point depends only on its distance from the center: $\rho(x,y) = k/(1+x^2+y^2)$ for some constant $k$. (a) Explain why this integral, set up in Cartesian coordinates, would be difficult to evaluate directly, similar to Example 1's motivating case. (b) Convert the integral $\iint_D \rho(x,y)\,dA$ to polar coordinates, including the correct area element, and state the resulting iterated integral with correct bounds for this disk. (c) Explain why simply writing the integrand in terms of $r$ (i.e. $k/(1+r^2)$) without ALSO including the extra factor of $r$ from $dA$ would give a physically incorrect total charge, referencing Example 2's area-computation evidence."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | POLAR-AREA-ELEMENT-FACTOR-R-OMITTED | Converting $dA$ to polar coordinates as $dr\,d\theta$, omitting the essential extra factor of $r$ | Foundational |
| MC-2 | POLAR-BOUNDS-DERIVED-BY-MECHANICAL-CARTESIAN-TRANSLATION | Attempting to convert Cartesian bounds into polar bounds algebraically step by step, rather than reading the r and θ ranges directly from the region's natural geometric description | Foundational |
| MC-3 | CARTESIAN-TO-POLAR-SWITCH-APPLIED-UNNECESSARILY | Converting a double integral to polar coordinates even when the region and integrand are naturally suited to Cartesian coordinates, adding unnecessary complexity | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Polar-Area-Element Factor-r Omission") → P41 (detect: ask a student to compute a disk's area in polar coordinates and check whether they omit the factor of $r$) → P64 (conceptual shift: re-walk Example 2's direct comparison — with $r$ giving the correct $\pi R^2$, without it giving the wrong, dimensionally-suspicious $2\pi R$ — re-anchoring on "the wedge widens as $r$ grows; that's exactly what the extra factor accounts for").
- **B02 (targets MC-2)**: P27 (name it: "Mechanical Cartesian-to-Polar Bound Translation") → P41 (detect: ask a student to find the polar bounds for an annulus by first writing Cartesian inequalities and attempting to convert them algebraically, rather than reading the bounds directly) → P64 (conceptual shift: re-walk Example 3's direct geometric reading of bounds — "how far out, through what angles" — re-anchoring on describing the region NATIVELY in polar terms from the start).
- **B03 (targets MC-3)**: P27 (name it: "Unnecessary Polar Conversion") → P41 (detect: present a rectangular region with a simple polynomial integrand and ask whether polar coordinates would help) → P64 (conceptual shift: re-anchor on "polar coordinates help specifically when the region is circular/radial in nature OR the integrand features $x^2+y^2$ — for a rectangle with an ordinary polynomial integrand, Cartesian coordinates from `math.calc.multiple-integrals` remain the more direct approach").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.multiple-integrals` (the full Cartesian iterated-integral machinery — Fubini, variable bounds — this concept builds on without re-deriving, per the explicit division-of-labor note in Component 3).
- **Unlocks**: `math.calc.triple-integrals` (extending the coordinate-system-choice principle established here — polar/cylindrical/spherical coordinates — to three dimensions).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 10 with an advanced/apply tag places this at a "3 TAs + gate" tier — A01 (recognizing when polar coordinates help), A02 (the polar area element), and A03 (reading bounds directly from geometry) each target a distinct LO, appropriate for a concept whose primary new content is a coordinate-system-choice skill layered on already-mastered iterated-integral machinery.
- **Explicit division of labor with `math.calc.multiple-integrals`** (stated directly in Component 3): that concept fully owns Cartesian iterated integrals, Fubini's Theorem, and variable-bounds reasoning for non-rectangular Cartesian regions — none of that content is re-derived here. This concept's distinct contribution is exclusively the polar-coordinate conversion (the $r\,dr\,d\theta$ area element and reading polar bounds from geometry), avoiding duplicating the earlier concept's own worked examples and misconception coverage.
- Example 1 was deliberately chosen as an integral with NO elementary Cartesian antiderivative, making the motivation for switching coordinate systems entirely undeniable — a milder example solvable (if awkwardly) in Cartesian form would have left room to wonder whether polar conversion was merely a convenience rather than sometimes a necessity.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: a circular region resisting Cartesian description before the polar substitution) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
