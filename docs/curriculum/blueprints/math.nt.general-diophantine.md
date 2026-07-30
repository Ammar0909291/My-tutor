# Blueprint: math.nt.general-diophantine

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.nt.general-diophantine |
| name | General Diophantine Equations |
| Domain | math.nt |
| Difficulty | expert |
| Bloom level | analyze |
| Estimated hours | 20 |
| Mastery threshold | 0.65 |
| MAMR | 4/5 |
| Prerequisites | math.nt.linear-diophantine |
| Cross-links | math.nt.algebraic-number-theory |
| Unlocks | — |

## Component 1 — Learning Objective
The student classifies polynomial Diophantine equations by their expected behaviour (degree, number of variables, geometric genus); states key landmark results including Fermat's Last Theorem (no integer solutions to xⁿ+yⁿ=zⁿ for n≥3 with xyz≠0), the Hasse-Minkowski theorem for quadratic forms (local-global principle for quadratic equations), and Thue's theorem (finitely many solutions for |f(x,y)|=c when f is irreducible of degree ≥3); applies the method of infinite descent to prove simple impossibility results; and recognises that deciding integer solvability of general Diophantine equations is undecidable (Hilbert's Tenth Problem).

## Component 2 — CPA Entry Stage
**P — Pictorial** (lattice point diagram: draw the circle x²+y²=25 and mark all integer solutions: (0,±5),(±5,0),(±3,±4),(±4,±3) = 12 points; then draw x²+y²=3 — no lattice points; draw x³+y³=35 — only (2,3) and (3,2); these pictures motivate why "degree matters" for number of solutions)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | ALL-POLYNOMIAL-EQUATIONS-HAVE-INTEGER-SOLUTIONS | Student extends the ℝ-solvability of any non-degenerate polynomial equation to ℤ-solvability; believes every polynomial equation with integer coefficients has integer solutions | Type 1 — overgeneralization (over ℝ most polynomial equations have solutions; students don't recognise the integer constraint as fundamentally more restrictive; Fermat's Last Theorem is the canonical counterexample) |
| MC-2 | LOCAL-GLOBAL-PRINCIPLE-IS-UNIVERSAL | Student applies the Hasse-Minkowski theorem (solvable mod p for all p + solvable in ℝ implies solvable in ℤ) to degree-3 and higher polynomial equations; thinks "if it works everywhere locally, it works globally" in all cases | Type 5 — instruction-induced (Hasse-Minkowski is proven for quadratic forms and presented as a natural principle; students don't know it fails for cubics and higher — the Selmer curve 3x³+4y³+5z³=0 is the textbook counterexample) |
| MC-3 | DEGREE-ALONE-DETERMINES-SOLUTION-FINITENESS | Student believes higher degree always means fewer solutions; thinks x⁵+y⁵=n always has finitely many solutions regardless of n and structure | Type 1 — overgeneralization (Fermat's Last Theorem for n≥3 does have no nontrivial solutions, but Pell's equation x²−Dy²=1 of degree 2 has infinitely many; the genus of the algebraic curve, not just degree, governs finiteness) |

## Component 4 — Session TA Cap
**Cap = 22** (hrs = 20 → cap 22)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**The landscape of Diophantine equations — four vantage points:**

| Vantage | Content |
|---|---|
| Classical examples | Pythagorean: x²+y²=z² (infinitely many); Pell: x²−Dy²=1 (infinitely many); FLT: xⁿ+yⁿ=zⁿ n≥3 (none, nontrivial); Catalan: xᵃ−yᵇ=1 (only 3²−2³=1) |
| Geometric genus | Genus 0 → typically infinitely many rational solutions (parametrisable); Genus 1 → finitely many or infinitely many (elliptic curve rank); Genus ≥2 → finitely many (Faltings' theorem) |
| Local-global | Quadratics: solvable mod pᵏ for all p and in ℝ ⟺ solvable in ℚ (Hasse-Minkowski). Fails for cubics+: Selmer 3x³+4y³+5z³=0 is locally solvable everywhere but has no rational solution. |
| Undecidability | Hilbert's Tenth Problem (1900): find an algorithm to decide integer solvability. Matiyasevich (1970): impossible — no such algorithm exists. Individual equations may be decided by ad hoc methods; no universal procedure exists. |

**Method of infinite descent (Fermat):**

To prove x²+y²=z² has no primitive solution with x even, y,z odd — actually they all exist via Pythagorean triples. Classic descent example: prove √2 ∉ ℚ.

Descent proof template for x⁴+y⁴=z²:
1. Suppose (x,y,z) is a solution with z minimal.
2. Derive from the Pythagorean structure a smaller solution (x′,y′,z′) with z′<z.
3. Contradiction with minimality of z. Therefore no solution exists.

The method requires (a) a well-founded order (z>0 decreasing), (b) the assumption of a minimal solution, (c) construction of a strictly smaller solution.

**P49 checkpoint:**
- CORRECT → "Diophantine equations: solvability varies wildly by degree, number of variables, and algebraic structure. FLT says no nontrivial solutions for xⁿ+yⁿ=zⁿ (n≥3). Genus governs finiteness. Local-global holds for degree 2 (Hasse-Minkowski) but fails for degree 3+. Hilbert's 10th: undecidable in general." → A02
- PARTIAL (doesn't know what "local-global" means) → "Local-global for Diophantines: an equation that has solutions mod p for every prime p AND in the real numbers is called 'locally solvable everywhere'. If local solvability implied global (ℤ/ℚ) solvability, we'd have an efficient existence test. Hasse-Minkowski shows this works for quadratic equations. The Selmer curve 3x³+4y³+5z³=0 has no rational point despite being locally solvable everywhere — the local-global principle breaks for degree 3." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "Does x²+y²=3 have integer solutions? How about x²+y²=5? Try to find them." → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Patterns across Diophantine families:**

**Quadratic Diophantine equations (two variables):**
- x²+y²=n: solvable iff every prime p≡3(mod 4) divides n to an even power (Fermat's two-square theorem)
- x²−Dy²=1 (Pell): always infinitely many solutions for D non-square (see math.nt.pells-equation)
- ax²+bxy+cy²=n: solved by theory of binary quadratic forms; solvability related to class numbers

**Elliptic curves (degree 3, genus 1):**
- E: y²=x³+ax+b defines an elliptic curve when discriminant ≠0
- Rational solutions form a finitely-generated abelian group (Mordell's theorem): E(ℚ)≅ℤʳ×T (T finite torsion group, r = rank)
- If r=0: finitely many rational solutions; if r>0: infinitely many
- Integer solutions: finitely many (Siegel's theorem)

**Degree ≥4 curves (genus ≥2):**
- Faltings' Theorem (Mordell Conjecture, proved 1983): any curve of genus ≥2 over ℚ has only finitely many rational points
- xⁿ+yⁿ=1 for n≥4 is genus ≥2 → finitely many rational solutions (known explicitly: only trivial ones)

**Summary table:**
| Family | Variable count | Typical behavior |
|---|---|---|
| Linear ax+by=c | 2 | 0 or ∞ solutions |
| Quadratic (non-Pell) | 2 | 0 or ∞ or finite |
| Pell x²−Dy²=1 | 2 | ∞ solutions always (D non-square) |
| Elliptic curves | 2 | Finitely many integers; ≤ finitely many rationals if rank 0 |
| Genus ≥2 curves | 2 | Finitely many rationals (Faltings) |

**P49 checkpoint:**
- CORRECT → "Genus governs finiteness: genus 0 → often ∞; genus 1 (elliptic) → depends on rank; genus ≥2 → finitely many (Faltings). Quadratic forms: Hasse-Minkowski. Integer vs rational solutions differ significantly." → A03
- PARTIAL (confuses rational and integer solutions) → "Diophantine equations over ℚ (rational solutions) and over ℤ (integer solutions) are different problems. Example: y²=x³−2 has infinitely many rational points but only finitely many integer solutions (in fact just (3,±5) — proved by Baker's theory of linear forms in logarithms). Siegel's theorem: any elliptic curve has only finitely many integer points." → TB-R02 → A03
- INCORRECT → TB-R02 → A03
- NO_RESPONSE → "List all integer solutions to x²+y²=25. How many are there? Is this consistent with the behavior expected for quadratic equations?" → TB-R02 → A03

### A03 — P41 MISCONCEPTION DETECTOR + P64 MC-2 gate
**Local-global failure gate:**

**Gate question (MC-2):** "A student claims: 'If an equation has solutions mod p for every prime p and has a real solution, then by the Hasse-Minkowski theorem it has a rational solution.' Identify the error."

Hasse-Minkowski applies specifically to QUADRATIC FORMS (homogeneous polynomials of degree 2). For degree 3 and higher, the local-global principle fails. The Selmer curve 3x³+4y³+5z³=0 has solutions modulo every prime p and in ℝ (take any real cubic root), yet has no rational solution. The student has over-generalised a theorem that only holds in a restricted setting. Always check whether the theorem's hypotheses apply before invoking it.

**P49 checkpoint:**
- CORRECT → "Hasse-Minkowski: quadratic forms only. Counterexample for degree 3: Selmer curve. Local-global principle is a non-trivial fact about degree 2, not a general truth." → Gate (P91)
- PARTIAL → TB-R03 → Gate
- INCORRECT → TB-R03 → Gate
- NO_RESPONSE → "Hasse-Minkowski applies to which degree of polynomial equations? For which degrees does it fail to apply?" → TB-R03 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 ALL-POLYNOMIAL-EQUATIONS-HAVE-INTEGER-SOLUTIONS):**
Step 1 — "Over ℝ, yes, most equations have solutions. But integers are sparse — most real solutions are not integers. Example: x²+y²=3. Over ℝ: x=1.7, y=0 is a solution (1.7²+0²=2.89... not exactly — try x=√3≈1.73, y=0: yes ✓). Over ℤ: only x=0,±1,±2,y=0,±1,±2 can satisfy x²+y²=3 if |x|,|y|≤2. Check all: (0,0)→0, (1,0)→1, (1,1)→2, (1,2)→5 — none gives 3. No integer solutions." Step 2 — "Fermat's Last Theorem is the most famous example: xⁿ+yⁿ=zⁿ looks solvable (and IS solvable over ℝ: take x=y=z=1.26…), but no solution with xyz≠0 and x,y,z positive integers exists for n≥3." Step 3 — "The rule is: integer solvability must be verified, not assumed. The GCD condition for linear equations generalises to much more complex conditions for higher degrees."

**TB-R02 (MC-3 DEGREE-ALONE-DETERMINES-SOLUTION-FINITENESS):**
Step 1 — "Pell's equation x²−2y²=1 has degree 2 but infinitely many solutions: (3,2),(17,12),(99,70),… growing without bound. The sequence is generated by (3+2√2)ⁿ." Step 2 — "On the other hand, x⁴+y⁴=z⁴ has degree 4 and no nontrivial solutions (Fermat's Last Theorem for n=4, proved already by Fermat using descent). So degree 4 gives fewer solutions than degree 2 in this case." Step 3 — "The key invariant is GENUS: the topological genus of the algebraic curve defined by the equation. Genus 0 → often infinitely many; genus 1 (elliptic curves) → depends on the Mordell-Weil rank; genus ≥2 → finitely many rational solutions (Faltings 1983). Degree alone doesn't determine genus."

**TB-R03 (MC-2 LOCAL-GLOBAL-PRINCIPLE-IS-UNIVERSAL):**
Step 1 — "Hasse-Minkowski is a theorem about QUADRATIC FORMS: homogeneous degree-2 equations like ax²+by²+cz²=0. It says local solvability (mod every prime, and in ℝ) implies global solvability (in ℚ). This was proved in 1921 by Hasse and Minkowski." Step 2 — "The Selmer curve 3x³+4y³+5z³=0 (degree 3) shows local-global fails for cubics. It's solvable: modulo 5 (x=1,y=0,z≡... works), modulo every other prime, and in ℝ. But no rational solution exists. This was a major discovery — the 'Brauer-Manin obstruction' explains such failures." Step 3 — "In fact for genus ≥1 curves, failing local-global is the norm rather than the exception. Only for genus 0 curves (rational curves) and forms is the local-global principle reliably true."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (4 items):**
1. Use infinite descent to prove x²+y²=z² has no primitive solution where x,y,z are all odd. (Consider residues modulo 4: odd²≡1 mod 4; then 1+1≡2 and z²≡2 mod 4 is impossible since z² must be 0 or 1 mod 4.)
2. The equation x²+y²=n is solvable in ℤ iff in the prime factorisation of n, every prime p≡3(mod 4) appears to an even power. Verify this for n=5,10,15,25. For which n≤20 is x²+y²=n solvable?
3. The Catalan conjecture (now Mihailescu's theorem): the only solution to xᵃ−yᵇ=1 with x,y,a,b>1 is 3²−2³=1. Verify this solution. Find all solutions to x²−y²=1 (note: a=b=2 here, not covered by Catalan since xy≠0 requires x,y>0).
4. Classify the following Diophantine equations by expected number of solutions (0, finite, or infinite) using genus and degree reasoning: (a) x²+3y²=7; (b) y²=x³−x; (c) x³+y³=z³; (d) x²−5y²=1.

**P55 — Reflect & Consolidate:** "General Diophantine equations: no universal algorithm (Hilbert's 10th, Matiyasevich). Genus governs solution count. FLT: no nontrivial solutions for degree ≥3 homogeneous. Hasse-Minkowski: local-global for degree 2 only. Infinite descent: a powerful ad hoc technique for impossibility proofs."

**P76 — Transfer Probe (Cross-link mode: math.nt.algebraic-number-theory):**
The equation x²+5=y³ has the unique integer solution (x,y)=(±2,3). The proof uses the ring ℤ[√−5]. (a) Factor x²+5=(x+√−5)(x−√−5) in ℤ[√−5]. Why does this factorisation help? (b) Show that gcd(x+√−5, x−√−5)=1 in this ring (assuming gcd(x,y)=1 in ℤ). (c) Explain why ℤ[√−5] is NOT a UFD (unique factorisation domain): show that 6=2×3=(1+√−5)(1−√−5) gives two distinct factorisations into irreducibles. (d) This breakdown of UFD forces the use of ideal factorisation (math.nt.algebraic-number-theory) to complete the proof. Explain in one sentence why algebraic number theory is necessary for Diophantine equations involving non-linear terms.

**P55 — Reflect & Consolidate:** "ℤ[√−5] lacks UFD: 6 has two distinct factorisations. Ideal factorisation recovers unique factorisation at the ideal level. Diophantine equations with x²+D or Norms of algebraic integers naturally live in rings ℤ[√−D]; when these rings lack UFD, elementary methods fail and algebraic number theory provides the necessary toolkit."

**P75 — Mastery Assessment:**
"(a) Prove that xⁿ+yⁿ=zⁿ has no solutions with x=y=1 for n≥3. (b) Explain in your own words why Hilbert's Tenth Problem being undecidable doesn't mean all Diophantine equations are hard — give an example of an equation where solvability is decidable. (c) The equation x²+y²=z² is parametrised by x=m²−n², y=2mn, z=m²+n². Use this to count the number of primitive Pythagorean triples (z,y) with z<100. (d) Why does Faltings' theorem imply xⁿ+yⁿ=1 has only finitely many rational solutions for n≥4? What is the genus of the curve xⁿ+yⁿ=1?"

**P55 — Reflect & Consolidate:** "Genus of xⁿ+yⁿ=1 (as a projective curve) = (n−1)(n−2)/2. For n=4: genus=3 ≥2, so Faltings applies. For n=3: genus=1 (elliptic curve) — finitely many integral solutions (Siegel), but potentially infinitely many rational ones depending on rank. Hilbert's 10th undecidability: no UNIVERSAL algorithm, but specific families (linear, Pell, etc.) are perfectly decidable."

**P74 — Routing Decision:**
- Score ≥ 4/5 → MASTERED; math.nt.general-diophantine complete
- Score 3/5 → REVIEW the genus classification and the local-global principle; replay A02
- Score ≤ 2/5 → PREREQUISITE GAP in math.nt.linear-diophantine; reassign

**P78 — Completion:** General Diophantine Equations certified. Student classifies equations by genus and expected solution count; states FLT, Faltings, Hasse-Minkowski, and undecidability; applies infinite descent for impossibility; recognises when algebraic number theory is needed.

## Component 8 — P76 Transfer Probe Detail
**Mode: Cross-link** (cross_links = [math.nt.algebraic-number-theory])
Target: ℤ[√−5] factorisation failure; ideal factorisation motivation; connection of Diophantine geometry to algebraic number theory
Skill tested: Recognise UFD failure; explain why ANT is needed for higher-degree Diophantines; apply genus to determine finiteness

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
