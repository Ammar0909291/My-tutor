# Blueprint: math.de.undetermined-coefficients

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.de.undetermined-coefficients |
| name | Method of Undetermined Coefficients |
| Domain | math.de |
| Difficulty | advanced |
| Bloom level | apply |
| Estimated hours | 5 |
| Mastery threshold | 0.85 |
| MAMR | 5/5 |
| Prerequisites | math.de.second-order-linear, math.de.char-equation |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
The student applies the method of undetermined coefficients to find a particular solution yₚ of ay'' + by' + cy = g(x) when g(x) is a polynomial, exponential, sine, cosine, or product thereof; selects the correct trial function (including the modification rule when any term of the trial function solves the homogeneous equation); determines the coefficients by substitution; and forms the general solution y = yₕ + yₚ.

## Component 2 — CPA Entry Stage
**P — Pictorial** (draw a table: left column = form of g(x), right column = trial yₚ; rows: polynomial of degree n → Aₙxⁿ+⋯+A₀; eᵃˣ → Aeᵃˣ; sin(bx) or cos(bx) → A sin(bx)+B cos(bx); eᵃˣ·polynomial → eᵃˣ·(Aₙxⁿ+⋯+A₀); annotate below: "MODIFICATION RULE: if any term of yₚ duplicates a term of yₕ, multiply yₚ by x (or x² if needed)")

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | ONLY-MATCHING-THE-LEAD-TERM | When g(x) is a polynomial of degree n, student uses only Axⁿ as yₚ instead of the full Aₙxⁿ + Aₙ₋₁xⁿ⁻¹ + ⋯ + A₀; the lower-degree terms are needed because differentiation lowers degree | Type 5 — instruction-induced (simple examples with g=constant → yₚ=A work fine; students extrapolate that for g=x they only need yₚ=Ax, not realizing differentiation of Ax produces a constant that must cancel against bA and cAx separately, requiring a constant term A₀) |
| MC-2 | FORGETTING-MODIFICATION-RULE | Student uses the standard trial function even when part of it is already in yₕ, leading to a system of equations with no solution (the undetermined coefficients come out as 0=1) | Type 5 — instruction-induced (the basic method is taught first for cases where the trial function doesn't overlap yₕ; when it does, the system degenerates and students just report "no solution" rather than recognising the need to multiply by x) |
| MC-3 | SINE-ONLY-TRIAL-FOR-SINE-FORCING | When g(x) = sin(bx), student uses yₚ = A sin(bx) only, omitting the cosine term B cos(bx); substituting into the ODE produces a cosine term on the left that can't be cancelled | Type 1 — overgeneralisation (g has only sine → yₚ should have only sine seems logical; students don't realise that differentiating A sin produces A cos, which needs a separate B coefficient to cancel) |

## Component 4 — Session TA Cap
**Cap = 7** (hrs = 5 → cap 7)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**The trial function table and substitution:**

**Structure of the general solution:** y = yₕ + yₚ, where yₕ is the homogeneous solution (two-constant, from char. equation) and yₚ is one particular solution.

**When to use this method:** g(x) must be a combination of: polynomials, eᵃˣ, sin(bx), cos(bx), and their products.

**Trial function table:**

| g(x) | Trial yₚ |
|------|---------|
| Pₙ(x) (degree n) | Aₙxⁿ + ⋯ + A₁x + A₀ |
| eᵃˣ | Aeᵃˣ |
| sin(bx) or cos(bx) | A sin(bx) + B cos(bx) |
| eᵃˣ · Pₙ(x) | eᵃˣ(Aₙxⁿ + ⋯ + A₀) |
| eᵃˣ · sin(bx) | eᵃˣ(A sin(bx) + B cos(bx)) |

**Modification rule:** If any term of the trial yₚ satisfies the homogeneous equation ay''+by'+cy=0, multiply yₚ by x. If it still overlaps, multiply by x².

**Worked example 1 — polynomial:**
y'' − 3y' + 2y = x². Try yₚ = Ax² + Bx + C.
yₚ'' − 3yₚ' + 2yₚ = 2A − 3(2Ax+B) + 2(Ax²+Bx+C) = 2Ax² + (2B−6A)x + (2A−3B+2C) = x².
Match: 2A=1→A=1/2; 2B−6A=0→B=3/2; 2A−3B+2C=0→C=7/4.
yₚ = x²/2 + 3x/2 + 7/4.

**Worked example 2 — modification rule:**
y'' − 4y' + 4y = e²ˣ. yₕ = (C₁+C₂x)e²ˣ. Trial e²ˣ is in yₕ; xe²ˣ is in yₕ. Multiply by x²: try yₚ = Ax²e²ˣ.
yₚ'' − 4yₚ' + 4yₚ = A(2e²ˣ + 4·2xe²ˣ + 4x²e²ˣ − 4(2xe²ˣ + 2x²e²ˣ·?) ... →
Direct computation: yₚ=Ax²e²ˣ, yₚ'=A(2xe²ˣ+2x²e²ˣ), yₚ''=A(2e²ˣ+8xe²ˣ+4x²e²ˣ).
yₚ''−4yₚ'+4yₚ = A·2e²ˣ = e²ˣ → A=1/2.
yₚ = x²e²ˣ/2.

**P49 checkpoint:**
- CORRECT → "Trial yₚ from table. Check overlap with yₕ → modify by x or x². Substitute, match coefficients. y=yₕ+yₚ." → A02
- PARTIAL (MC-2: forgot modification rule) → "If substituting the trial yₚ gives 0=nonzero (inconsistent system), the trial function duplicates a term in yₕ. STOP — multiply yₚ by x. Re-substitute. If still inconsistent, multiply by x². The modification rule applies once for each resonant term." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "y'' + 4y = cos 2x. yₕ = C₁cos2x+C₂sin2x. Trial: yₚ = Acos2x+Bsin2x overlaps yₕ → multiply by x: yₚ = x(Acos2x+Bsin2x). yₚ'' = A(−4xcos2x+2·(−2sin2x))... after computation: yₚ''= (−4Ax+4B)cos2x+(−4Bx−4A)sin2x. yₚ''+4yₚ = 4Bcos2x−4Asin2x = cos2x → B=1/4, A=0. yₚ = (x/4)sin2x." → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Products and sums — the superposition principle:**

**Products of the listed types:** g(x) = xeˣ sin x: trial = eˣ[(Ax+B)sin x + (Cx+D)cos x].
Rule: combine all individual trial factors (polynomial × exponential × trig).

**Superposition:** If g = g₁ + g₂, find yₚ₁ for g₁ and yₚ₂ for g₂ separately; then yₚ = yₚ₁ + yₚ₂.
This avoids solving one large system.

**When NOT to use this method:** g(x) = tan x, sec x, ln x, 1/x — these are NOT sums of polynomials/exponentials/trig, so the trial function table doesn't apply. Use variation of parameters instead.

**P49 checkpoint:**
- CORRECT → "Products → combine all trial factors. Superposition: split g, solve separately, add. Fails for tan/sec/ln — use VoP." → Gate (P91)
- PARTIAL (MC-3: sine-only trial) → "When g(x) contains sin(bx) OR cos(bx), the trial ALWAYS has BOTH A sin(bx) AND B cos(bx). Differentiating A sin(bx) produces A·b·cos(bx), which needs a B coefficient to cancel when substituted. Even if g has only sin, the trial must include cos." → TB-R02 → Gate
- INCORRECT → TB-R02 → Gate
- NO_RESPONSE → "y'' + y = 3eˣ + 2x. g₁=3eˣ → yₚ₁=Aeˣ; A−0+A=3eˣ... wait: A+A·0'+A=3 → yₚ₁''+yₚ₁=2Aeˣ=3eˣ → A=3/2. g₂=2x → yₚ₂=Bx+C; 0+0+Bx+C=2x → B=2, C=0. yₚ=3eˣ/2+2x." → TB-R02 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 + MC-2 combined):**
Step 1 — "Full polynomial trial: for g(x) = xⁿ or any polynomial of degree n, use yₚ = Aₙxⁿ + Aₙ₋₁xⁿ⁻¹ + ⋯ + A₀. All n+1 terms. Dropping any of them means you cannot match all coefficient equations."
Step 2 — "Modification rule diagnosis: substitute your trial yₚ into the ODE and collect terms. If the coefficient equations have no solution (e.g., 0 = 5), the trial contains a homogeneous solution. Multiply the ENTIRE trial by x and retry."
Step 3 — "Double modification (x²): needed only when every term of yₚ AND x·yₚ both appear in yₕ. This happens when the characteristic equation has a repeated root equal to the forcing term's α (for eᵃˣ forcing) or ±bi (for sin/cos forcing at resonance)."

**TB-R02 (MC-3 SINE-ONLY TRIAL):**
Step 1 — "Rule: whenever the trial involves sin(bx), include cos(bx) too (and vice versa). The pair {sin(bx), cos(bx)} is closed under differentiation — you need both to cancel all oscillatory terms after substitution."
Step 2 — "Exception: if g(x) = eᵃˣ sin(bx), trial = eᵃˣ(A sin(bx) + B cos(bx)). Still include both trig functions, even though g has only the sine form."
Step 3 — "After substituting: collect sin and cos terms separately; each must independently equal its coefficient in g(x). You get two equations in A and B."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (5 items):**
1. Find the general solution: y'' − 5y' + 6y = 2eˣ.
2. Find yₚ for: y'' + 2y' + y = x² + 1. (Full polynomial trial; note the double root r=−1.)
3. Find the general solution: y'' + 4y = sin 2x. (Identify resonance, apply modification rule.)
4. Find yₚ for: y'' − y' = xeˣ. (Trial: eˣ(Ax+B); check if eˣ appears in yₕ first.)
5. Find the general solution: y'' + y = x sin x. (Trial: (Ax+B)sin x + (Cx+D)cos x; verify no modification needed since r=±i and trial terms xsin x, xcos x are NOT in yₕ = C₁sin x+C₂cos x.)

**P55 — Reflect & Consolidate:** "y'' + by' + cy = g(x). General: y=yₕ+yₚ. Trial yₚ from table (polynomial → full degree; eᵃˣ → Aeᵃˣ; sin/cos → BOTH). Modification rule: if trial ⊂ yₕ, multiply by x (or x²). Superposition for sums. Not applicable: tan/sec/ln/1/x."

**P76 — Transfer Probe (Independence mode):**
(a) Exponential response formula: for ay''+by'+cy=eˢˣ, if s is NOT a root of the characteristic polynomial p(s)=as²+bs+c, then yₚ=eˢˣ/p(s). When s IS a root of multiplicity k, yₚ=xᵏeˢˣ/p⁽ᵏ⁾(s). Verify this formula reproduces the modification rule. (b) Complex exponential shortcut: to solve y''+y=cos x, write g=Re[eⁱˣ], solve y''+y=eⁱˣ for complex yₚ=eⁱˣ/p(i), take the real part. Show how this unifies the sin/cos trial. (c) The method fails for ay''+by'+cy=tan x. The Wronskian is W=e^{−∫(b/a)dx}. The variation of parameters formula gives yₚ=y₂∫(y₁g/W)dx − y₁∫(y₂g/W)dx. Why can the undetermined-coefficients method not handle tan x?

**P75 — Mastery Assessment:**
"(a) Solve: y'' − 4y = 4x² + 2xeˣ. (Split by superposition.) (b) Solve: y'' + 4y' + 4y = e^{−2x}. (Identify double root r=−2; apply x² modification.) (c) For the forced oscillator y'' + ω²y = F₀sin(ωt) (resonance), show that the particular solution grows as yₚ = −(F₀/2ω)t cos(ωt). What is the physical interpretation of the t factor? (d) Consider y'' + 3y' + 2y = eˢˣ for various values of s. For which values of s does the modification rule apply? For those values, find the modified trial function."

**P74 — Routing Decision:**
- Score ≥ 5/5 → MASTERED
- Score 4/5 → REVIEW the modification rule and the full-polynomial trial
- Score ≤ 3/5 → PREREQUISITE GAP in math.de.char-equation or math.de.second-order-linear; reassign

**P78 — Completion:** Undetermined Coefficients certified. Student selects the correct trial function; applies the modification rule when needed; determines all coefficients by substitution; uses superposition for sums; recognises when VoP is required instead.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Exponential response formula; complex exponential shortcut; limitation vs. variation of parameters
Skill tested: Generalise the trial-function pattern to formula-level understanding and complex exponential methods

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
