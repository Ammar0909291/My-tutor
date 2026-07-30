# Blueprint: math.nt.linear-diophantine

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.nt.linear-diophantine |
| name | Linear Diophantine Equations |
| Domain | math.nt |
| Difficulty | advanced |
| Bloom level | apply |
| Estimated hours | 8 |
| Mastery threshold | 0.75 |
| MAMR | 4/5 |
| Prerequisites | math.nt.bezout-identity, math.nt.gcd |
| Cross-links | — |
| Unlocks | math.nt.general-diophantine |

## Component 1 — Learning Objective
The student determines whether the linear Diophantine equation ax+by=c has integer solutions (necessary and sufficient condition: gcd(a,b)|c); finds one particular solution (x₀,y₀) by scaling the Bézout coefficients; writes the complete solution set as x=x₀+(b/d)t, y=y₀−(a/d)t for t∈ℤ (where d=gcd(a,b)); interprets solutions geometrically as lattice points on a line; and applies the solvability criterion to practical problems involving integer constraints.

## Component 2 — CPA Entry Stage
**C — Concrete** (use coloured coins of value 3¢ and 5¢: can you make exactly 7¢? Try: one 5¢+one 3¢−one 1¢ doesn't work with whole coins, but 1×5+1×3−(?)... actually: 5×3−2×5=5, nope; try: 4×5−1×(5+3+3+4)... direct: can you solve 3x+5y=7? Yes: x=4, y=−1 — which means 4 coins of 3¢ and "minus 1 coin" of 5¢; or equivalently x=−1, y=2)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | LINEAR-DIOPHANTINE-ALWAYS-HAS-SOLUTION | Student believes ax+by=c always has integer solutions because "it's just a linear equation"; doesn't know the gcd(a,b)|c condition | Type 1 — overgeneralization (linear equations over ℝ always have solutions; students extend this to ℤ without recognising that the integer constraint is highly restrictive) |
| MC-2 | ONE-SOLUTION-MEANS-UNIQUE-INTEGER-SOLUTION | Student finds one particular solution (x₀,y₀) and concludes it is the only integer solution | Type 1 — overgeneralization (the continuous version y=(c−ax)/b has infinitely many real solutions but students correctly learn "one" for the integer version without recognising the countably infinite integer family) |
| MC-3 | NEGATIVE-SOLUTIONS-MUST-BE-EXCLUDED | Student discards solutions where x or y is negative, thinking "you can't have negative coins/items"; doesn't recognise the abstract integer domain | Type 3 — language contamination (word problems use physical quantities (apples, coins, hours) that must be non-negative; students apply this domain restriction to the mathematical equation itself rather than to the problem context only) |

## Component 4 — Session TA Cap
**Cap = 10** (hrs = 8 → cap 10)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Four representations of ax+by=c:**

| Representation | Content |
|---|---|
| Lattice points | Solutions are integer coordinate points on the line c=ax+by; if gcd(a,b)=d, lattice points lie at spacing b/d in x-direction and a/d in y-direction |
| Bézout connection | If as₀+bt₀=d (Bézout) and d|c (say c=dk), then x₀=ks₀, y₀=kt₀ is a particular solution: a(ks₀)+b(kt₀)=k(as₀+bt₀)=kd=c |
| Complete solution | x=x₀+(b/d)t, y=y₀−(a/d)t for all t∈ℤ; the parametric line through (x₀,y₀) with direction vector (b/d,−a/d) |
| Solvability filter | Before solving: check d=gcd(a,b). If d∤c → no solution. If d|c → reduce to (a/d)x+(b/d)y=c/d with gcd(a/d,b/d)=1, then apply Bézout. |

**Worked example: 14x+21y=35**
- d=gcd(14,21)=7; c=35; 7|35 ✓ (c/d=5)
- Reduced equation: 2x+3y=5
- Bézout for gcd(2,3)=1: 1×3+(−1)×2=1, so 5×3+(−5)×2=5 → (x₀,y₀)=(−5,5)
- Check: 14(−5)+21(5)=−70+105=35 ✓
- Complete solution: x=−5+3t, y=5−2t (since b/d=21/7=3, a/d=14/7=2)
- Verify at t=2: x=1, y=1: 14+21=35 ✓; at t=3: x=4, y=−1: 56−21=35 ✓

**Geometric picture:** the line 14x+21y=35 passes through infinitely many lattice points {…,(−5,5),(−2,3),(1,1),(4,−1),…} spaced 3 apart in x and 2 apart in y.

**P49 checkpoint:**
- CORRECT → "Solvable iff gcd(a,b)|c. Particular solution: scale Bézout coefficients by c/gcd. Complete family: x=x₀+(b/d)t, y=y₀−(a/d)t. Geometric: equally-spaced lattice points on a line." → A02
- PARTIAL (finds particular solution but can't write the family) → "One solution (x₀,y₀) gives ALL solutions. The key insight: if (x₀,y₀) satisfies ax+by=c and (x,y) also satisfies it, then a(x−x₀)+b(y−y₀)=0, so a/d·(x−x₀)=−b/d·(y−y₀). Since gcd(a/d,b/d)=1, we need (b/d)|(x−x₀), so x−x₀=bt/d for some t, and then y−y₀=−at/d." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "Does 6x+9y=20 have integer solutions? Does 6x+9y=21? For the solvable one, find a particular solution." → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Patterns in the solution set:**

**Non-negative solutions (context-dependent):** when a word problem requires x,y≥0, find the range of t: x₀+(b/d)t≥0 and y₀−(a/d)t≥0. This gives a finite number of non-negative solutions (or possibly none).

**Example — coin problem:** How many ways to make change for 11 using coins of value 3 and 7?
- 3x+7y=11; d=gcd(3,7)=1; 1|11 ✓
- Bézout: 5×3+(−2)×7=1, so (x₀,y₀)=(55,−22)... cleaner: try small values. y=1: 3x=4, not integer. y=−1: 3x=18, x=6 ✓. So (x₀,y₀)=(6,−1).
- Complete: x=6+7t, y=−1−3t
- Non-negative: x≥0 → t≥−6/7 → t≥0; y≥0 → −1−3t≥0 → t≤−1/3 → t≤−1. No t satisfies both t≥0 and t≤−1. No non-negative solution — 11 cannot be made from 3¢ and 7¢ coins.

**Number of non-negative solutions:** for ax+by=c with a,b,d=gcd(a,b)>0, the number of non-negative solutions equals ⌊c/(ab/d)⌋+ε where ε∈{0,1} depends on alignment — or computed directly from the range of valid t.

**Systems of Diophantine equations (two equations, three variables):** not reducible to one linear equation; requires different methods (see math.nt.general-diophantine).

**P49 checkpoint:**
- CORRECT → "Complete solution family parameterised by t∈ℤ. Non-negative solutions: intersect the family with x,y≥0 to find valid t-range. Solvability in ℕ is a separate question from solvability in ℤ." → A03
- PARTIAL (treats every application as requiring non-negative solutions) → "The equation ax+by=c always has integer solutions (when d|c) regardless of sign. The non-negative requirement comes from the CONTEXT, not the mathematics. Separate the two: first check ℤ-solvability (mathematical), then restrict to ℕ solutions (contextual)." → TB-R02 → A03
- INCORRECT → TB-R02 → A03
- NO_RESPONSE → "Solve 5x+8y=3 completely. Then find all non-negative solutions. Are there any?" → TB-R02 → A03

### A03 — P41 MISCONCEPTION DETECTOR + P64 MC-1 gate
**Solvability gate:**

**Gate question (MC-1):** "Without solving, determine whether 15x+25y=11 has integer solutions. Explain your reasoning."

No. gcd(15,25)=5 and 5∤11 (since 11=5×2+1). By the theorem, ax+by=c has integer solutions iff gcd(a,b)|c. Since 5∤11, no integer solutions exist.

**P49 checkpoint:**
- CORRECT → "Check gcd first. If gcd∤c, done (no solutions). If gcd|c, proceed to find particular solution and write the family." → Gate (P91)
- PARTIAL → TB-R03 → Gate
- INCORRECT → TB-R03 → Gate
- NO_RESPONSE → "What is gcd(15,25)? Does it divide 11? Does it divide 10?" → TB-R03 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 LINEAR-DIOPHANTINE-ALWAYS-HAS-SOLUTION):**
Step 1 — "Consider 2x+4y=3. The left side 2x+4y=2(x+2y) is always EVEN. But 3 is odd. So 2x+4y=3 is impossible — no integer x,y satisfies it. gcd(2,4)=2 and 2∤3, confirming no solution." Step 2 — "More generally, any linear combination of a and b is always a multiple of gcd(a,b) (from Bézout: the set {ax+by: x,y∈ℤ}=gcd(a,b)ℤ). So c must be a multiple of gcd(a,b) for a solution to exist." Step 3 — "Over ℝ, any linear equation in two variables has infinitely many solutions. The integer constraint is much stronger: only multiples of gcd(a,b) are reachable."

**TB-R02 (MC-2 ONE-SOLUTION-MEANS-UNIQUE-INTEGER-SOLUTION):**
Step 1 — "If (x₀,y₀) solves ax+by=c and (x₁,y₁) also solves it, subtract: a(x₁−x₀)+b(y₁−y₀)=0. The general integer solution to au+bv=0 is u=b/d·t, v=−a/d·t. So x₁=x₀+b/d·t and y₁=y₀−a/d·t for some integer t." Step 2 — "Example: 14x+21y=35 has particular solution (1,1). Another solution: t=1 gives (4,−1): 14×4+21×(−1)=56−21=35 ✓. Another: t=−1 gives (−2,3): 14×(−2)+21×3=−28+63=35 ✓. Infinitely many." Step 3 — "The family {(x₀+3t, y₀−2t) : t∈ℤ} for this example gives infinitely many lattice points on the line 14x+21y=35."

**TB-R03 (MC-3 NEGATIVE-SOLUTIONS-MUST-BE-EXCLUDED):**
Step 1 — "The equation ax+by=c lives in ℤ×ℤ (all integers). The MATHEMATICAL problem has no sign restriction. After solving in ℤ, the CONTEXTUAL problem may add x≥0 and y≥0." Step 2 — "Example: 'a farmer buys chickens (3 coins) and sheep (7 coins) for exactly 34 coins.' Here x,y≥0. But the math equation 3x+7y=34 is solved first in ℤ: particular solution (x₀,y₀)=(−7,7) is valid in ℤ but invalid as a chicken count. The parametric family x=−7+7t, y=7−3t with t≥2 gives the non-negative solutions: t=2 (7,1), t=3 (14,−2) — only t=2 has both non-negative." Step 3 — "Always solve in ℤ first, then apply the contextual restriction to filter the family. Never reject negative solutions at the mathematical stage."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (4 items):**
1. Solve completely (find all integer solutions, or prove no solution exists): (a) 12x+18y=24; (b) 25x+35y=15; (c) 17x+19y=1.
2. A store sells two items costing $6 and $14. In how many ways can a customer spend exactly $100? Find all solutions with non-negative quantities.
3. Prove: if ax+by=c has one solution, then it has infinitely many. (Explicitly construct infinitely many from one.)
4. Two integer solutions to 5x+8y=1 are (5,−3) and (−3,2). Verify both. Write the parametric family and show these are two members of it.

**P55 — Reflect & Consolidate:** "ax+by=c solvable iff d=gcd(a,b)|c. Particular solution: scale Bézout coefficients by c/d. Complete family: x=x₀+(b/d)t, y=y₀−(a/d)t. Non-negative solutions: restrict t to a valid range from both inequalities. Infinitely many ℤ-solutions; finitely many ℕ-solutions."

**P76 — Transfer Probe (Independence mode):**
(a) The Frobenius Coin Problem: given coprime positive integers a,b, the largest integer that CANNOT be represented as xa+yb with x,y≥0 is ab−a−b (the Frobenius number). Verify this formula for a=3,b=5. Find a non-negative representation of 8=3x+5y and show 7 cannot be so represented. (b) Prove: if gcd(a,b)=1, then every integer n>ab−a−b CAN be represented as xa+yb with x,y≥0. (Hint: using Bézout, find a ℤ-solution; then adjust t to make both coordinates non-negative.) (c) Determine the Frobenius number for a=6, b=10. Does gcd(6,10)=1? What does this mean?

**P55 — Reflect & Consolidate:** "Frobenius number ab−a−b exists only when gcd(a,b)=1. If gcd(a,b)>1, then multiples of gcd(a,b) like ab itself cannot be represented (a=6,b=10 — cannot make 1,2,3,4,5,7,8,9,11,13 and many others, in fact infinitely many non-representable values since odd multiples of 5 and non-multiples of 2 are out of reach). The Frobenius problem for three or more coprime generators is much harder (NP-hard in general)."

**P75 — Mastery Assessment:**
"Solve completely and interpret: (a) 91x+77y=455; (b) A vending machine dispenses items of value 35¢ and 45¢. Can you pay exactly $1.00 using any combination (possibly zero) of items of each type? If yes, find all ways; if no, explain why. (c) Prove that if gcd(a,b)=1 and c>0, then ax−by=c has at least one solution with x,y>0 (both strictly positive). (Hint: use the parametric family and adjust t.)"

**P55 — Reflect & Consolidate:** "91x+77y=455: gcd(91,77)=7, 7|455 ✓, one family. Vending: 35x+45y=100, gcd(35,45)=5, 5|100 ✓ — solvable in ℤ; check non-negative: x=2, y=0 works (2×35=70 — actually 70≠100... 35x+45y=100: try y=0: 35x=100, x=100/35 not integer; y=2: 35x=10, no; y=1: 35x=55, no... gcd=5, 100/5=20, 7x+9y=20: y=1: 7x=11, no; y=0: 7x=20, no; y=2: 7x=2, no; y=3: 7x=-7, no... so no non-negative solution). Strict-positive proof: adjust t until x,y>0 — works since b/d and a/d are both positive."

**P74 — Routing Decision:**
- Score ≥ 4/5 → MASTERED; math.nt.linear-diophantine complete
- Score 3/5 → REVIEW the solvability condition and the parametric family; replay A01
- Score ≤ 2/5 → PREREQUISITE GAP in math.nt.bezout-identity; reassign

**P78 — Completion:** Linear Diophantine Equations certified. Student checks gcd solvability condition; finds particular solutions via Bézout scaling; writes the complete parametric family; restricts to non-negative solutions for contextual problems; applies the Frobenius number concept.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Frobenius Coin Problem; non-representable integers; proof that every sufficiently large integer is representable
Skill tested: Apply parametric family to non-negative constraint problems; prove existence of positive solutions

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
