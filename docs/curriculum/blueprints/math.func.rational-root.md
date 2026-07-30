# Blueprint: math.func.rational-root

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.func.rational-root |
| Title | Rational Root Theorem |
| Domain | math.func |
| Difficulty | proficient |
| Bloom level | analyze |
| Estimated hours | 4 |
| Mastery threshold | 0.75 |
| MAMR | 4/5 |
| Prerequisites | math.func.polynomial-function, math.alg.polynomial-roots |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
Given a polynomial with integer coefficients, the student states the Rational Root Theorem (any rational root p/q in lowest terms satisfies: p divides the constant term a₀ and q divides the leading coefficient aₙ), generates the complete list of candidate rational roots, tests candidates using synthetic or polynomial division, uses confirmed roots to factor the polynomial and reduce its degree, and correctly interprets a failed RRT test (no rational roots exist — irrational or complex roots may still exist).

## Component 2 — CPA Entry Stage
**C — Concrete** (explicit factored polynomial (x−2)(x+3)(2x−1) expanded to 2x³+3x²−11x+6, then working backwards: candidate 1/2 confirmed by synthetic division; shows how factors relate to the candidate list)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | ALL-CANDIDATES-ARE-ROOTS | Student lists ±(factors of a₀)/(factors of aₙ) and declares all of them to be roots without testing; assumes the theorem guarantees roots, not merely candidates | Type 5 — instruction-induced (the candidate list is presented as "the possible rational roots," and students conflate "possible" with "actual" — the theorem only filters down to a finite list; testing is always required) |
| MC-2 | RRT-FINDS-ALL-ROOTS | Student, after finding no rational roots, concludes the polynomial has no roots at all; does not consider irrational or complex roots | Type 1 — overgeneralization (the RRT is the ONLY root-finding technique students know at this stage; absence of rational roots is incorrectly interpreted as absence of all roots, because the tool's failure is confused with the problem's having no solution) |
| MC-3 | LEADING-COEFFICIENT-IGNORED | Student uses only factors of a₀ (the constant term) as candidates, forgetting to divide by factors of aₙ (the leading coefficient); always checks only ±(integer divisors of a₀), missing candidates like ±1/2, ±3/2, etc. | Type 5 — instruction-induced (leading-coefficient-1 polynomials are taught first, where the candidates are simply ±(factors of a₀); when aₙ≠1 is introduced, the extra division step is missed because the earlier pattern is too deeply set) |

## Component 4 — Session TA Cap
**Cap = 6** (hrs = 4 → cap 6)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**The Rational Root Theorem — four representations:**

| Representation | Content |
|---|---|
| Statement | If f(x)=aₙxⁿ+…+a₁x+a₀ has integer coefficients and p/q (in lowest terms) is a rational root, then p | a₀ and q | aₙ |
| Candidate list | All ±(factors of a₀)/(factors of aₙ) give the finite set of candidates to test |
| Synthetic division | Test each candidate p/q: if the remainder is 0, it IS a root; if nonzero, it is NOT |
| Factor connection | x=r is a root iff (x−r) is a factor of f(x); confirmed root → divide out (x−r) to reduce degree |

**Why the theorem works (brief):** If f(p/q)=0, multiply through by qⁿ: aₙpⁿ + aₙ₋₁pⁿ⁻¹q + … + a₀qⁿ = 0. Rearranging: aₙpⁿ = −q(aₙ₋₁pⁿ⁻¹+…+a₀qⁿ⁻¹), so q | aₙpⁿ. Since gcd(p,q)=1, q | aₙ. Similarly p | a₀.

**Worked example:** f(x)=2x³−3x²−11x+6.
- a₀=6: factors ±1, ±2, ±3, ±6.
- aₙ=2: factors ±1, ±2.
- Candidates: ±1, ±2, ±3, ±6, ±1/2, ±3/2. (12 candidates.)

Testing x=3: f(3)=2(27)−3(9)−11(3)+6=54−27−33+6=0. ✓ Root!
Synthetic division by (x−3): 2x³−3x²−11x+6 ÷ (x−3) = 2x²+3x−2.
Factor 2x²+3x−2=(2x−1)(x+2). Roots: x=1/2 and x=−2.
All roots: x=3, x=1/2, x=−2. All rational. ✓ (All appeared in the candidate list.)

**P49 checkpoint:**
- CORRECT → "RRT: candidates are ±(factors of a₀)/(factors of aₙ). Test each by substitution or synthetic division. Remainder=0 → root; remainder≠0 → not a root. RRT only finds RATIONAL roots — others may exist." → A02
- PARTIAL (generates candidates correctly but tests by plugging into the expanded polynomial, making arithmetic errors) → "Synthetic division is faster for testing candidates than direct substitution. The remainder is f(candidate) — if it's 0, the candidate is a root." → TB-R03 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "For f(x)=x²−5x+6: factors of 6 are ±1, ±2, ±3, ±6. Leading coeff=1, so only ±1 in denominator. Test x=2: f(2)=4−10+6=0. Does x=2 work?" → TB-R01 → A02

### A02 — P41 MISCONCEPTION DETECTOR + P64 MC-2 gate
**No rational roots ≠ no roots — gate:**

**Gate question (MC-2):** "f(x)=x²−2. Candidates from RRT: ±1, ±2. Test each: f(1)=−1≠0; f(−1)=−1≠0; f(2)=2≠0; f(−2)=2≠0. Does f have any roots?"

Yes. f(x)=x²−2=0 → x=±√2. These are IRRATIONAL roots — not in the candidate list, because √2 is not a ratio of integers. The polynomial has two real roots; RRT simply could not find them because they are not rational.

**The correct conclusion after exhausting all RRT candidates:**
"This polynomial has NO rational roots." This is a negative result about one type of root — it says nothing about irrational or complex roots.

**Three cases after RRT:**
1. Some candidates pass the test → found rational root(s); factor and reduce.
2. All candidates fail → no rational roots; continue with:
   a. Quadratic formula (if degree 2 or after reduction to degree 2).
   b. Numerical methods (Newton's, bisection).
   c. Complex roots accepted.
3. Degree 1 after all rational roots found → remaining linear factor's root (rational).

**RRT as a filter:** RRT shrinks the search space from infinitely many rationals to a finite list. It doesn't claim all roots are in the list — only that rational ones (if any) must be.

**P49 checkpoint:**
- CORRECT → "RRT gives CANDIDATES for rational roots only. Exhausting the list without finding a root means no rational roots — irrational and complex roots may still exist. For degree 2 with no rational roots: use the quadratic formula." → A03
- PARTIAL (identifies rational vs. irrational distinction but doesn't know what to do next) → "After RRT fails: if degree is 2, apply the quadratic formula to the remaining quadratic. For higher degree, numerical methods or advanced techniques." → TB-R02 → A03
- INCORRECT → TB-R02 → A03
- NO_RESPONSE → "After confirming x=√2 is a root of x²−2=0: is √2 a rational number? Could RRT have listed it as a candidate? What does this tell you about RRT's limitations?" → TB-R02 → A03

### A03 — P06 CONTRAST PAIR
**Full root-finding workflow; leading coefficient ≠ 1 case:**

**Contrast 1 — monic (aₙ=1) vs. non-monic (aₙ≠1):**

f(x)=x³−6x²+11x−6. aₙ=1, a₀=6. Candidates: ±{1,2,3,6}.
g(x)=6x³−11x²−3x+2. aₙ=6, a₀=2. Candidates: ±{1,2}/(±{1,2,3,6}) = ±{1, 2, 1/2, 1/3, 2/3, 1/6}.

The non-monic case generates fractional candidates — often missed if students only list ±(factors of a₀).

**Testing g(x)=6x³−11x²−3x+2 at x=2:**
g(2)=6(8)−11(4)−3(2)+2=48−44−6+2=0. ✓ Root!
Divide: 6x³−11x²−3x+2 ÷ (x−2) = 6x²+x−1=(2x+1)(3x−1). Roots: x=−1/2 and x=1/3.
All roots: x=2, −1/2, 1/3. All on the candidate list. ✓

**Contrast 2 — Reducing degree progressively:**
f(x)=2x⁴−3x³−11x²+9x+15.
Step 1: Candidates: ±{1,3,5,15,1/2,3/2,5/2,15/2}.
Step 2: Test x=−1: f(−1)=2+3−11−9+15=0. ✓ Divide out (x+1): quotient 2x³−5x²−6x+15.
Step 3: Test candidates on 2x³−5x²−6x+15. Try x=3/2: 2(27/8)−5(9/4)−6(3/2)+15=27/4−45/4−9+15=−18/4+6=0. ✓ Divide out (x−3/2) or equivalently (2x−3): quotient x²−3+0=x²−3 wait: 2x³−5x²−6x+15 ÷ (x−3/2) → rewrite: try (2x−3): 2x³−5x²−6x+15 = (2x−3)(x²−x−5). Roots of x²−x−5: irrational (x=(1±√21)/2). RRT exhausted for this factor.
Complete roots: x=−1, x=3/2, x=(1±√21)/2.

**P49 checkpoint:**
- CORRECT → "Non-monic polynomials: candidates = ±(factors of a₀)/(factors of aₙ). Confirmed roots reduce degree: divide out confirmed factors, apply RRT to quotient. When degree 2 survives, apply quadratic formula." → Gate (P91)
- PARTIAL (lists all candidates but misses fractional ones) → "When leading coefficient is 6 (not 1), the denominator of the candidate fraction can be 2, 3, or 6 — not just 1. This creates fractional candidates: ±1/2, ±1/3, ±1/6." → TB-R03 → Gate
- INCORRECT → TB-R03 → Gate
- NO_RESPONSE → "For g(x)=6x³−11x²−3x+2: write all factors of 2 (numerator) and all factors of 6 (denominator). Form all possible fractions ±p/q in lowest terms." → TB-R03 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 ALL-CANDIDATES-ARE-ROOTS):**
Step 1 — "The Rational Root Theorem says: IF p/q is a rational root, THEN p|a₀ and q|aₙ. This is a NECESSARY condition, not a sufficient one. Candidates are roots only if they PASS the test. Many candidates will fail." Step 2 — f(x)=x²−5x+6. Candidates: ±1, ±2, ±3, ±6. But f has only 2 roots (x=2 and x=3) — not 8. The other candidates (1,−1,−2,−3,6,−6) are NOT roots: f(1)=2≠0, f(−1)=12≠0, etc. Step 3 — "Always test: substitute each candidate into f or use synthetic division. Only those giving remainder 0 are actual roots. The theorem guarantees the candidates; testing determines which ones are roots."

**TB-R02 (MC-2 RRT-FINDS-ALL-ROOTS):**
Step 1 — "Rational Root Theorem only finds RATIONAL roots — fractions p/q with integers p and q. Irrational numbers (√2, ∛3, π) are not rational and will NEVER appear on the candidate list. Complex roots (2+3i) are also not rational. The theorem is silent about these." Step 2 — f(x)=x²−3. No rational roots (check ±1, ±3 — all fail). Yet f(√3)=3−3=0 and f(−√3)=0. The polynomial has two real roots — both irrational. RRT missed them by design: they are outside the theorem's scope. Step 3 — "After exhausting RRT candidates: the polynomial may still have roots — just not rational ones. Use the quadratic formula, numerical methods, or advanced algebra to continue."

**TB-R03 (MC-3 LEADING-COEFFICIENT-IGNORED):**
Step 1 — "When the leading coefficient aₙ≠1: the denominator of each candidate p/q must divide aₙ, not just 1. So candidates include fractions with aₙ's factors in the denominator — these are not just integers." Step 2 — f(x)=2x²−5x+2. a₀=2 (factors ±1, ±2); aₙ=2 (factors ±1, ±2). Candidates: ±1/1, ±2/1, ±1/2, ±2/2=±1. Distinct list: ±1, ±2, ±1/2. Test x=1/2: f(1/2)=2(1/4)−5(1/2)+2=1/2−5/2+2=0. ✓ Root x=1/2 — a fractional candidate that would be missed if aₙ=2 were ignored. Step 3 — "Always list factors of BOTH a₀ AND aₙ. Form ALL fractions ±(factor of a₀)/(factor of aₙ). Reduce duplicates. This complete list is the only guarantee you won't miss a rational root."

## Component 7 — P91 Gate Sequence (Mastery)

**P77 — Problem Set (4 items):**
1. List all rational root candidates for: (a) f(x)=x³−4x²+x+6; (b) g(x)=3x³−x²−3x+1; (c) h(x)=2x⁴+x³−3x−2.
2. For f(x)=x³−6x²+11x−6: test x=1, 2, 3 using synthetic division. Factor f completely. State all zeros.
3. For g(x)=2x³−5x²+1: apply RRT completely. If some roots are irrational, use the quadratic formula on the remaining factor.
4. True or false: "If the Rational Root Theorem gives no rational roots, the polynomial has no real roots." Justify with a counterexample.

**P55 — Reflect & Consolidate:** "RRT candidates: ±p/q where p|a₀ and q|aₙ. Test by substitution or synthetic division. Confirm → factor out, reduce degree, repeat. Exhaust list → no rational roots; irrational/complex roots may still exist. Non-monic: don't forget fractional candidates."

**P76 — Transfer Probe (Independence mode):**
f(x)=x³+px+q has no rational roots for any choice of p, q with p²+4q>0. (a) Under what condition on p and q does f have three real roots? (Use the discriminant of the depressed cubic.) (b) Show that x³−3x+1 satisfies that condition: compute the discriminant and verify all three roots are real but irrational. (c) Apply RRT to x³−3x+1 and confirm no rational roots. (d) Use trigonometric substitution x=2cos(θ) to show the three roots are 2cos(2π/9), 2cos(8π/9), 2cos(14π/9).

**P55 — Reflect & Consolidate:** "The depressed cubic (no x² term) connects RRT failure to discriminant analysis and trigonometric solutions. When all rational candidates fail for a cubic with three real roots, the roots are irrational and can be expressed via trigonometric substitution. This is the historical origin of the casus irreducibilis: real irrational roots that cannot be expressed without complex arithmetic in the Cardano formula."

**P75 — Mastery Assessment:**
"f(x)=6x⁴−7x³−11x²+2x+2. (a) List all rational root candidates. (b) Use synthetic division to confirm x=2 is a root and find the cubic quotient. (c) From the cubic quotient, find any remaining rational roots. (d) For any remaining quadratic factor, determine whether its roots are rational, irrational, or complex. (e) Write f(x) as a product of linear and/or irreducible quadratic factors."

**P55 — Reflect & Consolidate:** "The RRT workflow: list candidates → test → factor out each confirmed root → reapply RRT to quotient → when degree 2, apply quadratic formula. The combination of RRT + synthetic division + quadratic formula solves any degree-4 polynomial that has rational roots, producing a complete factorization."

**P74 — Routing Decision:**
- Score ≥ 4/5 → MASTERED; math.func.rational-root complete
- Score 3/5 → REVIEW non-monic candidate list and irrational-root limitation; replay A01–A02
- Score ≤ 2/5 → PREREQUISITE GAP in math.func.polynomial-function or math.alg.polynomial-roots; reassign

**P78 — Completion:** Rational Root Theorem certified. Student generates the complete candidate list (including fractional candidates for non-monic polynomials), tests via synthetic division, reduces degree by factoring out confirmed roots, correctly interprets RRT failure as a statement about rational roots only, and integrates RRT with the quadratic formula for a complete polynomial factorization workflow.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Cubic discriminant; casus irreducibilis; trigonometric solution of the depressed cubic; connecting RRT failure to irrational-root existence
Skill tested: Apply discriminant to confirm three real roots; apply RRT to confirm they are irrational; use trigonometric substitution to express them exactly

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
