# Blueprint: math.disc.catalan-numbers

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.disc.catalan-numbers |
| name | Catalan Numbers |
| Domain | math.disc |
| Difficulty | expert |
| Bloom level | apply |
| Estimated hours | 5 |
| Mastery threshold | 0.75 |
| MAMR | 4/5 |
| Prerequisites | math.disc.combinations, math.disc.recurrence-relation |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
The student computes Catalan numbers via the closed form Cₙ = C(2n,n)/(n+1) and via the recurrence Cₙ = Σₖ₌₀ⁿ⁻¹ Cₖ Cₙ₋₁₋ₖ; recognises Catalan numbers as the count of multiple combinatorial structures: balanced parenthesisation of n+1 factors, triangulations of convex (n+2)-gons, Dyck paths of length 2n, non-crossing partitions, binary trees with n+1 leaves; applies the ballot problem derivation (reflection principle) to derive the formula from the number of paths; and uses generating functions (C(x)=1+xC(x)²) to derive the closed form.

## Component 2 — CPA Entry Stage
**P — Pictorial** (draw all 5 Dyck paths of length 6 (n=3): paths from (0,0) to (6,6) using steps R=(1,0) and U=(0,1) that never go above the diagonal y=x — illustrate as staircase diagrams; beside them, list the 5=C₃ parenthesisations of 4 factors: ((ab)c)d, (a(bc))d, (ab)(cd), a((bc)d), a(b(cd)); annotate: "Cₙ counts both — this surprising coincidence is because both are counted by the same formula C₂ₙ/(n+1)")

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | CATALAN-NUMBER-IS-C(2n,n) | Student computes C(2n,n) and reports it as the nth Catalan number, forgetting to divide by n+1; loses the crucial factor that corrects for overcounting; writes Cₙ=C(2n,n) instead of Cₙ=C(2n,n)/(n+1) | Type 4 — notation-induced (C(2n,n) appears prominently in the derivation; students copy it from an intermediate step; the denominator n+1 is the correction factor from the ballot problem / reflection principle — it's algebraically added at the end and may be forgotten if the student doesn't follow the full derivation and just recalls "something with C(2n,n)") |
| MC-2 | ALL-CATALAN-STRUCTURES-ARE-EASILY-VISIBLE | Student can verify one Catalan structure (e.g., parenthesisations) but fails to BIJECTIVELY relate it to a second structure (e.g., triangulations); treats the appearance of Cₙ in multiple contexts as a coincidence rather than as evidence of a bijection; cannot construct the bijection explicitly | Type 1 — overgeneralisation (after seeing "Cₙ counts X" and "Cₙ counts Y," students accept this without building the bijection; the bijection is the mathematical content — it reveals WHY the two structures have the same count; building bijections between Catalan structures requires non-trivial combinatorial creativity that is rarely practiced explicitly) |
| MC-3 | RECURRENCE-ONLY-WORKS-FOR-PARENTHESISATIONS | Student memorises the Catalan recurrence Cₙ=ΣCₖCₙ₋₁₋ₖ in the context of parenthesisations and cannot see why it applies to Dyck paths or triangulations; treats the recurrence as context-specific rather than universally derived | Type 5 — instruction-induced (the recurrence is often derived first for parenthesisations: "the last multiplication splits the product into a left part (k factors) and right part (n−k factors)"; students associate the recurrence with that decomposition and don't notice that the same split applies to: Dyck paths (first return to the diagonal), triangulations (choosing the triangle containing the base edge), binary trees (left and right subtrees)) |

## Component 4 — Session TA Cap
**Cap = 7** (hrs = 5 → cap 7)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Catalan numbers — definition and first structures:**

**Catalan numbers:** C₀=1, C₁=1, C₂=2, C₃=5, C₄=14, C₅=42, C₆=132, …

**Closed form:** Cₙ = C(2n,n)/(n+1) = (2n)! / ((n+1)! n!).

**Recurrence:** Cₙ = Σₖ₌₀ⁿ⁻¹ Cₖ · Cₙ₋₁₋ₖ for n ≥ 1, with C₀=1. (Each term CₖCₙ₋₁₋ₖ corresponds to splitting the problem into two independent subproblems of sizes k and n−1−k.)

**Structure 1 — Balanced parenthesisations:** Cₙ = number of ways to fully parenthesise a product of n+1 factors.
- C₂=2: (ab)c and a(bc).
- Derivation: the last multiplication divides the n+1 factors into a left group of k+1 and right group of n−k, for k=0,…,n−1. Left contributes Cₖ parenthesisations, right contributes Cₙ₋₁₋ₖ → recurrence.

**Structure 2 — Dyck paths:** Cₙ = number of lattice paths from (0,0) to (2n,0) using steps U=(+1,+1) and D=(+1,−1) that never go below y=0 (or equivalently, paths from (0,0) to (n,n) using right and up steps that never cross above the diagonal y=x).

**Structure 3 — Triangulations:** Cₙ = number of triangulations of a convex polygon with n+2 vertices (a triangulation uses n−1 non-crossing diagonals to divide the polygon into n triangles).
- C₁=1: triangle (already a triangle). C₂=2: quadrilateral, 2 triangulations. C₃=5: pentagon.

**P49 checkpoint:**
- CORRECT → "Cₙ=C(2n,n)/(n+1). Recurrence: Cₙ=ΣCₖCₙ₋₁₋ₖ. Three structures: parenthesisations, Dyck paths, triangulations. Same recurrence from different 'first decomposition' in each structure." → A02
- PARTIAL (MC-1: forgets division by n+1) → "The formula C(2n,n) counts ALL lattice paths from (0,0) to (n,n). The CATALAN number Cₙ counts only those paths that NEVER go above the diagonal. The fraction of good paths is exactly 1/(n+1): Cₙ = C(2n,n)/(n+1). This 1/(n+1) factor comes from the ballot problem / reflection principle: the number of paths ABOVE the diagonal is C(2n,n)·n/(n+1), so paths BELOW = total − bad = C(2n,n) − C(2n,n)·n/(n+1) = C(2n,n)/(n+1). Never write Cₙ=C(2n,n) — that's off by a factor of n+1." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "C₃=5: list all 5 triangulations of a hexagon? No — of a PENTAGON (n+2=5, n=3). Label vertices 1,2,3,4,5. Each triangulation uses 2 non-crossing diagonals: {13,14}, {13,35}, {24,14}, {24,25}, {35,25}. Total: 5=C₃. ✓ Now list the 5 parenthesisations of 4 factors abcd: ((ab)c)d, (a(bc))d, (ab)(cd), a((bc)d), a(b(cd)). Total: 5. ✓" → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**Ballot problem derivation and generating functions:**

**Ballot problem / reflection principle:**
Cₙ = (number of paths (0,0)→(n,n) with steps R,U, never going above y=x).
Total monotone paths = C(2n,n). "Bad" paths (touching above the diagonal at some point): by the reflection principle, each bad path corresponds uniquely to an unrestricted path from (−1,1) to (n,n), which has count C(2n, n−1). (Reflect the initial portion up to the first violation across the line y=x+1.)
Good paths = C(2n,n) − C(2n,n−1) = C(2n,n) − C(2n,n)·n/(n+1) = **C(2n,n)/(n+1) = Cₙ**.

**Generating function derivation:**
Let C(x) = Σₙ₌₀^∞ Cₙxⁿ. The recurrence Cₙ = Σₖ₌₀ⁿ⁻¹ CₖCₙ₋₁₋ₖ says (for n≥1) that the coefficient of xⁿ in C(x)² shifted equals Cₙ. In fact: C(x) = 1 + x·C(x)².
Solve: xC(x)² − C(x) + 1 = 0 → C(x) = (1 − √(1−4x))/(2x).
Taylor expand: Cₙ = C(2n,n)/(n+1). ✓

**Additional Catalan structures (each counted by Cₙ):**
- Full binary trees with n+1 leaves (and n internal nodes).
- Non-crossing partitions of {1,2,…,2n} into n pairs.
- Sequences of +1/−1 of length 2n where all partial sums are ≥0 and total sum = 0 (ballot sequences).
- Stacks-sortable permutations of {1,…,n}.
- Convex polygon triangulations (stated above).

**P49 checkpoint:**
- CORRECT → "Ballot/reflection: bad paths→ paths from (−1,1)→(n,n) via bijection; good = C(2n,n)−C(2n,n−1) = Cₙ. GF: C(x)=1+xC(x)² → C(x)=(1−√(1−4x))/(2x). Multiple Catalan structures: binary trees, non-crossing partitions, ballot sequences." → Gate (P91)
- PARTIAL (MC-2: structures counted by Cₙ but no bijection) → "Knowing TWO structures are both counted by Cₙ is not a proof they are 'the same' — that requires a BIJECTION: a one-to-one correspondence that maps each element of structure A to exactly one element of structure B, with an inverse. Example bijection between Dyck paths and triangulations of a polygon: the 'canonical' bijection associates each step U of the Dyck path with a specific diagonal in the triangulation, and D steps with triangles. Building and verifying such bijections is the core skill in combinatorics. Without a bijection, you're only asserting a numerical coincidence." → TB-R02 → Gate
- INCORRECT → TB-R02 → Gate
- NO_RESPONSE → "Generating function for Catalan: C(x)=1+xC(x)². The '1' is the empty structure (n=0); the xC(x)² says each Catalan object of size n≥1 consists of an x (the 'root split') times two independent Catalan sub-objects whose sizes sum to n−1 (one for each factor of C(x)²). Extracting coefficients from (1−√(1−4x))/(2x): use the binomial series (1−4x)^{1/2}=Σ C(1/2,k)(−4x)^k, isolate 1−(1−4x)^{1/2}, divide by 2x, and the coefficient of xⁿ is C(2n,n)/(n+1)." → TB-R02 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 + MC-3 combined):**
Step 1 — "Deriving Cₙ=C(2n,n)/(n+1) in full. Total paths (0,0)→(n,n): C(2n,n) (choose which n of the 2n steps are R). Bad paths (touch or cross above y=x): each bad path first crosses above y=x at some point (i,i+1) (one step above the diagonal). Reflect the path from the start to that first crossing across the line y=x+1: this maps each bad path to a path starting at (0,2) going to (n,n) — i.e., a path with 1 extra U at the start: a path from (−1,1) to (n,n). Number of such reflected paths = C(2n, n−1) (choose which n−1 of 2n steps are R). Good paths = C(2n,n)−C(2n,n−1) = C(2n,n)·[1−n/(n+1)] = C(2n,n)/(n+1)."
Step 2 — "Why the recurrence is 'first decomposition' for each structure: for parenthesisations: the last multiplication splits n+1 factors into left (k+1) and right (n−k). For Dyck paths: split at the FIRST return to y=0 (the first time the path comes back down to 0 after rising); the left piece has 2k steps and the right has 2(n−k−1) steps → Cₙ=ΣCₖCₙ₋₁₋ₖ. For triangulations: the base edge of the polygon belongs to exactly one triangle; the vertex opposite the base decomposes the polygon into two smaller polygons. In each case, the SAME recurrence arises because the decomposition has the same 'choose a splitting point' structure."
Step 3 — "Small-n verification: C₀=1, C₁=1, C₂=2. Recurrence check: C₂=C₀C₁+C₁C₀=1·1+1·1=2. ✓ C₃=C₀C₂+C₁C₁+C₂C₀=2+1+2=5. ✓ Closed form: C₃=C(6,3)/4=20/4=5. ✓"

**TB-R02 (MC-2 BIJECTION CONSTRUCTION):**
Step 1 — "Building a bijection: Dyck paths ↔ triangulations (for n=2). Dyck paths of length 4 (two U's and two D's, never below 0): UUDD and UDUD. Triangulations of a quadrilateral (4 vertices 1,2,3,4): {13} (diagonal 1-3) and {24} (diagonal 2-4). Map UUDD → diagonal 1-3; UDUD → diagonal 2-4. Verify: this is a bijection (2 ↔ 2). The general bijection is defined recursively using the first-return decomposition."
Step 2 — "Bijection: Dyck paths ↔ parenthesisations (n=2). UUDD: interpret as '((ab)c)' — outer parentheses contain (ab) then c. UDUD: 'a(bc)'. For n=3: 5 Dyck paths ↔ 5 parenthesisations. The bijection encodes each U as 'open parenthesis' and each D as 'close parenthesis' (after verifying proper nesting)."
Step 3 — "Transfer exercise: verify C₄=14 by listing all full binary trees with 5 leaves. A full binary tree with n+1=5 leaves has n=4 internal nodes. Draw a few: left-skewed chain (4 internal nodes on the left); right-skewed; balanced (2 internal at each level of a 3-level tree). Count all 14 by systematic construction, grouping by the tree structure."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (5 items):**
1. Compute C₀ through C₅ using the recurrence Cₙ=ΣCₖCₙ₋₁₋ₖ. Verify each using the closed form Cₙ=C(2n,n)/(n+1).
2. List all Dyck paths of length 6 (n=3, using U and D steps) and verify there are exactly C₃=5. For each path, identify the corresponding balanced parenthesisation of 4 factors.
3. Use the reflection principle to derive the formula for the number of paths from (0,0) to (a,b) with a≥b using unit right and up steps that stay weakly below the diagonal y=x. Show the count is C(a+b,b)·(a−b+1)/(a+1).
4. Derive the Catalan generating function: starting from C(x)=1+xC(x)², solve the quadratic, take the branch with C(0)=1, and extract the coefficient of xⁿ using the generalised binomial theorem.
5. Show that the number of full binary trees with n+1 leaves is Cₙ. (Define: a full binary tree has every internal node having exactly 2 children. Prove by establishing the same recurrence as Cₙ: a tree with n+1 leaves has a root whose left subtree has k+1 leaves and right has n−k leaves, for k=0,…,n−1.)

**P55 — Reflect & Consolidate:** "Cₙ=C(2n,n)/(n+1). Recurrence: Cₙ=ΣCₖCₙ₋₁₋ₖ. Ballot derivation: good paths = total − bad (reflection) = C(2n,n)−C(2n,n−1)=Cₙ. GF: C(x)=1+xC(x)²=(1−√(1−4x))/(2x). Structures: parenthesisations, Dyck paths, triangulations, binary trees, ballot sequences — all counted by Cₙ via bijections sharing the same first-decomposition recurrence."

**P76 — Transfer Probe (Independence mode):**
(a) Asymptotic growth: Cₙ ~ 4ⁿ/(n^{3/2}√π) as n→∞ (from Stirling's approximation on C(2n,n)/(n+1)). Show that Cₙ₊₁/Cₙ → 4 as n→∞, so Catalan numbers grow like 4ⁿ but subexponentially corrected by n^{−3/2}. Contrast with the Fibonacci growth rate φⁿ≈1.618ⁿ — Catalan numbers grow much faster. (b) Super-Catalan (Motzkin and Schröder numbers): Motzkin numbers Mₙ count monotone lattice paths from (0,0) to (n,0) using U,H=(1,0),D steps never going below 0. They satisfy Mₙ=Mₙ₋₁+ΣMₖMₙ₋₁₋ₖ and Mₙ=Σ_{k=0}^{⌊n/2⌋} C(n,2k)Cₖ. Schröder numbers count larger-step Dyck paths. Explain how each family arises from relaxing a constraint on Dyck paths and how their generating functions differ from the Catalan GF. (c) Catalan numbers in non-crossing partitions and free probability: a non-crossing partition of {1,…,n} is a set partition where no two blocks "cross" (if a<b<c<d with a,c in one block and b,d in another, they cross). The number of non-crossing partitions of {1,…,n} is Cₙ. In free probability theory (Voiculescu), the free cumulants of a semicircle distribution are given by Catalan numbers. Explain why non-crossing partitions play the role in free probability that all set partitions play in classical probability (moment-cumulant relations).

**P75 — Mastery Assessment:**
"(a) How many ways can a convex octagon (8 vertices) be triangulated into triangles using non-crossing diagonals? State the answer as a Catalan number and compute it. (b) In a 10-person election, candidate A gets 7 votes and B gets 3. How many orderings of the votes are there in which A is always strictly ahead of B in the running tally? Express the answer using the ballot-problem formula from the reflection principle. (c) Prove that C₄=14 by listing all non-crossing partitions of {1,2,3,4} into pairs (note: n=4 gives C₃=5 Catalan, so be precise about which n value you're using). (d) Derive the recurrence Cₙ=ΣCₖCₙ₋₁₋ₖ directly from the generating function equation C(x)=1+xC(x)² by expanding C(x)² and matching coefficients of xⁿ."

**P74 — Routing Decision:**
- Score ≥ 5/5 → MASTERED
- Score 4/5 → REVIEW the reflection-principle derivation and the bijection between Catalan structures
- Score ≤ 3/5 → PREREQUISITE GAP in math.disc.combinations or math.disc.recurrence-relation; reassign

**P78 — Completion:** Catalan Numbers certified. Student computes Catalan numbers via closed form and recurrence; derives the formula via the ballot-problem / reflection principle; constructs the generating function C(x)=1+xC(x)²; identifies and bijectively relates multiple Catalan structures (parenthesisations, Dyck paths, triangulations, binary trees); and recognises the universal "first-decomposition" structure underlying the recurrence.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Asymptotic growth (Stirling → 4ⁿ/n^{3/2}√π); Motzkin/Schröder generalisations; Catalan numbers in free probability
Skill tested: Connect Catalan numbers to asymptotic combinatorics, related counting families, and applications in modern probability theory

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
