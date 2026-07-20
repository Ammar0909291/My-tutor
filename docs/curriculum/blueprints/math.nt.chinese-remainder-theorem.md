# Teaching Blueprint: Chinese Remainder Theorem (`math.nt.chinese-remainder-theorem`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.nt.chinese-remainder-theorem` |
| name | Chinese Remainder Theorem |
| domain | Number Theory |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 8 |
| requires | `math.nt.congruence`, `math.nt.gcd` |
| unlocks | none |
| cross_links | `math.abst.ring-theory` (authored earlier — see Component 7) |
| CPA_entry_stage | A (Abstract) — advanced learner already solves single congruences; the task is SYSTEMS of congruences and the structural ring-isomorphism reading of the result |
| description (KG) | If $n_1,\ldots,n_k$ are pairwise coprime, the system $x\equiv a_i\pmod{n_i}$ has a unique solution modulo $n_1\cdots n_k$; has applications in cryptography and fast arithmetic. |

## Component 1 — Learning Objectives

- LO1: State the Chinese Remainder Theorem precisely: for PAIRWISE COPRIME $n_1,\ldots,n_k$, the system $x\equiv a_i\pmod{n_i}$ (for $i=1,\ldots,k$) has a solution, and that solution is UNIQUE modulo $N=n_1\cdots n_k$ — and correctly identify when the pairwise-coprime hypothesis fails (using `math.nt.gcd`'s own gcd computation), recognizing the theorem's guarantee does not apply without it.
- LO2: Solve a 2-modulus system by CONSTRUCTION, using `math.nt.gcd`'s own Euclidean-algorithm/Bézout machinery to find the specific combining coefficients, rather than by trial search — and verify the constructed solution satisfies BOTH original congruences directly by substitution.
- LO3 (cross-link objective): Recognize the theorem's DEEPER structural meaning via `math.abst.ring-theory`'s own axioms: CRT is precisely the statement that the ring $\mathbb{Z}/N\mathbb{Z}$ is RING-ISOMORPHIC to the product ring $\mathbb{Z}/n_1\mathbb{Z}\times\cdots\times\mathbb{Z}/n_k\mathbb{Z}$ (component-wise addition and multiplication) — the "unique solution modulo $N$" language IS exactly the statement that this map is a bijection respecting both ring operations, verified directly on a small case.

## Component 2 — Prerequisite Check

Assumes mastery of `math.nt.congruence` (congruence as an equivalence relation partitioning $\mathbb{Z}$ into residue classes) and `math.nt.gcd` (the greatest common divisor, computed via the Euclidean algorithm, and Bézout's identity expressing $\gcd(a,b)$ as an integer combination $ax+by$).

## Component 3 — Core Explanation

**The theorem's hypothesis and guarantee, stated precisely**: given moduli $n_1,\ldots,n_k$ that are PAIRWISE coprime (meaning $\gcd(n_i,n_j)=1$ for every pair $i\ne j$ — checkable directly via `math.nt.gcd`), the system of congruences $x\equiv a_1\pmod{n_1},\ldots,x\equiv a_k\pmod{n_k}$ ALWAYS has a solution, and any two solutions differ by a multiple of $N=n_1n_2\cdots n_k$ — i.e., the solution is unique modulo $N$. Without pairwise coprimality, the system can genuinely have NO solution at all (e.g. $x\equiv1\pmod4$ and $x\equiv0\pmod6$ has no solution, since $\gcd(4,6)=2\ne1$ and the two congruences impose incompatible parity constraints), so checking the hypothesis via `math.nt.gcd` first is not optional.

**Construction uses `math.nt.gcd`'s own Bézout machinery, not trial search**: for two coprime moduli $n_1,n_2$, `math.nt.gcd`'s Bézout identity gives integers $s,t$ with $sn_1+tn_2=1$. Then $x=a_1tn_2+a_2sn_1$ solves BOTH congruences: modulo $n_1$, the term $a_1tn_2\equiv a_1(1-sn_1)\equiv a_1\pmod{n_1}$ (using $tn_2=1-sn_1$) and $a_2sn_1\equiv0\pmod{n_1}$, so $x\equiv a_1\pmod{n_1}$; symmetrically $x\equiv a_2\pmod{n_2}$. This directly REUSES `math.nt.gcd`'s Euclidean-algorithm-derived Bézout coefficients as the construction's core ingredient — CRT does not require inventing new machinery, only assembling already-known tools.

**CRT is a ring isomorphism, and "unique solution mod $N$" is exactly the bijection statement**: `math.abst.ring-theory` already establishes what a ring is and what ring operations mean. The map $\phi:\mathbb{Z}/N\mathbb{Z}\to\mathbb{Z}/n_1\mathbb{Z}\times\cdots\times\mathbb{Z}/n_k\mathbb{Z}$ sending $x\bmod N\mapsto(x\bmod n_1,\ldots,x\bmod n_k)$ respects BOTH ring operations: $\phi(x+y)=\phi(x)+\phi(y)$ and $\phi(xy)=\phi(x)\phi(y)$, using component-wise addition/multiplication on the product — this is automatic from how modular reduction interacts with $+,\times$. CRT's existence-and-uniqueness claim is EXACTLY the statement that $\phi$ is a BIJECTION: existence of a solution to any target tuple $(a_1,\ldots,a_k)$ means $\phi$ is SURJECTIVE (every tuple is hit); uniqueness modulo $N$ means $\phi$ is INJECTIVE (different residues mod $N$ give different tuples). A bijective map respecting both ring operations is precisely a RING ISOMORPHISM, in `math.abst.ring-theory`'s own terms.

## Component 4 — Worked Examples

**Example 1 (LO1 — checking the pairwise-coprime hypothesis and its necessity, breaking MC-1)**: for the system $x\equiv1\pmod4$, $x\equiv0\pmod6$: checking `math.nt.gcd`'s own computation, $\gcd(4,6)=2\ne1$ — the pairwise-coprime hypothesis FAILS. Directly testing: $x\equiv1\pmod4$ forces $x$ ODD; $x\equiv0\pmod6$ forces $x$ EVEN — a direct contradiction, confirming NO solution exists, exactly as expected once the hypothesis check fails. Contrast: for $x\equiv1\pmod4,x\equiv2\pmod9$, $\gcd(4,9)=1$ — the theorem DOES guarantee a solution here.

**Example 2 (LO2 — constructing the solution via Bézout, breaking MC-2)**: solve $x\equiv2\pmod5$, $x\equiv3\pmod7$ ($\gcd(5,7)=1$, hypothesis satisfied). `math.nt.gcd`'s Euclidean algorithm/Bézout gives $3\times5+(-2)\times7=15-14=1$, so $s=3,t=-2$ works for $sn_1+tn_2=1$ with $n_1=5,n_2=7$. Construction: $x=a_1tn_2+a_2sn_1=2\times(-2)\times7+3\times3\times5=-28+45=17$. Verifying directly: $17\bmod5=2$ ✓, $17\bmod7=3$ ✓ — both original congruences satisfied, confirming $x=17$ (and by uniqueness, $x\equiv17\pmod{35}$) is the solution, obtained via Bézout construction rather than searching through candidates by trial.

**Example 3 (LO3 — CRT as a ring isomorphism, verified concretely, breaking MC-3)**: for $n_1=3,n_2=5$ ($N=15$), listing the map $\phi:\mathbb{Z}/15\mathbb{Z}\to\mathbb{Z}/3\mathbb{Z}\times\mathbb{Z}/5\mathbb{Z}$ for a few values: $\phi(7)=(7\bmod3,7\bmod5)=(1,2)$; $\phi(11)=(2,1)$. Checking the ring-homomorphism property on addition: $7+11=18\equiv3\pmod{15}$, and $\phi(3)=(0,3)$; separately, $\phi(7)+\phi(11)=(1,2)+(2,1)=(1+2\bmod3,2+1\bmod5)=(0,3)$ — MATCHING exactly, confirming $\phi(7+11)=\phi(7)+\phi(11)$ concretely. Since $\phi$ is verified to hit all $15$ distinct pairs in $\mathbb{Z}/3\mathbb{Z}\times\mathbb{Z}/5\mathbb{Z}$ (a bijection, by CRT's existence+uniqueness guarantee) while respecting addition (and, by an analogous check, multiplication), this concretely instantiates `math.abst.ring-theory`'s own definition of a ring isomorphism.

## Component 5 — Teaching Actions

### Teaching Action A01 — Pairwise Coprimality Is a Hypothesis to CHECK, Not an Automatic Given (Primitive P11: Representation Shift)

State: "before applying CRT, check pairwise coprimality using `math.nt.gcd`'s own computation — this isn't a formality, since the theorem's guarantee genuinely fails to apply without it, and the system can have no solution at all." Walk Example 1's contradiction.

- **MC-1 hook**: ask "does the Chinese Remainder Theorem guarantee a solution for ANY system of congruences, regardless of whether the moduli are pairwise coprime?" — a "yes" answer reveals MC-1 (missing that pairwise coprimality is a genuine, checkable hypothesis, not automatic).

### Teaching Action A02 — Construct the Solution via Bézout, Don't Search by Trial (Primitive P28: Conflict Evidence)

Present Example 2's direct construction: $x=a_1tn_2+a_2sn_1=17$, obtained ENTIRELY from `math.nt.gcd`'s own Bézout coefficients, verified correct by direct substitution — no trial-and-error search through candidate values. State: "CRT's construction directly reuses the SAME Bézout machinery from `math.nt.gcd` — you already have the tool needed; solving a CRT system by trial search, especially for large moduli, throws that tool away unnecessarily."

- **MC-2 hook**: ask "is the standard way to solve a CRT system to search through candidate values of $x$ until one satisfying all congruences is found?" — a "yes" answer reveals MC-2 (missing the direct Bézout-based construction, which scales far better and directly reuses `math.nt.gcd`'s own machinery).

### Teaching Action A03 — CRT Is a Ring Isomorphism, Not Just a Numeric Coincidence (Primitive P06: Contrast Pair)

Contrast treating "unique solution mod $N$" as a standalone numeric fact against Example 3's direct verification that the map $\phi$ respects ADDITION (and, analogously, multiplication) — genuinely instantiating `math.abst.ring-theory`'s own ring-isomorphism definition. State: "CRT isn't just a clever trick for solving congruence systems — it's telling you $\mathbb{Z}/N\mathbb{Z}$ and the product $\mathbb{Z}/n_1\mathbb{Z}\times\cdots\times\mathbb{Z}/n_k\mathbb{Z}$ are STRUCTURALLY the same ring, just described two different ways."

- **MC-3 hook**: ask "is CRT's 'unique solution modulo $N$' claim just a standalone numeric fact, or does it reflect a deeper structural (ring-isomorphism) relationship?" — a "just numeric" answer reveals MC-3 (missing the ring-isomorphism reading verified in Example 3).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Check whether the system $x\equiv3\pmod8$, $x\equiv1\pmod{12}$ satisfies CRT's pairwise-coprime hypothesis, using `math.nt.gcd`'s computation, and state whether a solution is guaranteed.
  2. Solve $x\equiv1\pmod3$, $x\equiv4\pmod5$ using the Bézout construction method (show the Bézout coefficients explicitly).
  3. Verify your solution from problem 2 directly satisfies both original congruences.
  4. Explain, citing `math.abst.ring-theory`'s own ring-isomorphism definition, why CRT's "unique solution mod $N$" claim is equivalent to a specific map being bijective and operation-respecting.
- **P76 (Transfer Probe, mode = cross-link probe engaging `math.abst.ring-theory`)**: "A distributed-computing system splits a large integer computation across 3 processors, each working modulo a different pairwise-coprime modulus ($n_1=97,n_2=101,n_3=103$, all prime), then needs to recombine the 3 partial results into the final answer modulo $N=n_1n_2n_3$. (a) Using CRT's guarantee, explain why the recombination step is guaranteed to produce a UNIQUE correct answer modulo $N$, and what property of the chosen moduli makes this valid. (b) Using `math.abst.ring-theory`'s own definitions, explain why the ENTIRE computation (not just the final recombination) can validly be done independently modulo each $n_i$ and then recombined — i.e., why performing $+,\times$ separately in each $\mathbb{Z}/n_i\mathbb{Z}$ and then applying CRT gives the SAME answer as performing $+,\times$ directly in $\mathbb{Z}/N\mathbb{Z}$. (c) Explain what would go wrong with this entire scheme if two of the three chosen moduli shared a common factor."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | PAIRWISE-COPRIME-HYPOTHESIS-ASSUMED-AUTOMATIC | Believing CRT guarantees a solution for any system of congruences regardless of the moduli's coprimality, missing that pairwise coprimality is a genuine, checkable hypothesis | Foundational |
| MC-2 | CRT-SOLVED-BY-TRIAL-SEARCH | Believing the standard method for solving a CRT system is trial-and-error search rather than the direct Bézout-based construction reusing `math.nt.gcd`'s own machinery | High |
| MC-3 | CRT-TREATED-AS-MERE-NUMERIC-COINCIDENCE | Believing CRT's "unique solution modulo $N$" is a standalone numeric fact, missing its deeper reading as a ring isomorphism via `math.abst.ring-theory`'s own definitions | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Pairwise Coprime Hypothesis Assumed Automatic") → P41 (detect: ask whether CRT applies regardless of coprimality) → P64 (conceptual shift: re-walk Example 1's direct contradiction when the hypothesis fails).
- **B02 (targets MC-2)**: P27 (name it: "CRT Solved by Trial Search") → P41 (detect: ask whether trial search is the standard CRT-solving method) → P64 (conceptual shift: re-walk Example 2's Bézout-based construction).
- **B03 (targets MC-3)**: P27 (name it: "CRT Treated as Mere Numeric Coincidence") → P41 (detect: ask whether CRT's claim reflects a deeper structural relationship) → P64 (conceptual shift: re-walk Example 3's verified addition-respecting property of $\phi$).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.nt.congruence` (the congruence relation and residue classes this concept's systems are built from) and `math.nt.gcd` (the Euclidean algorithm and Bézout identity this concept's construction directly reuses).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.abst.ring-theory`, checked via `ls docs/curriculum/blueprints/` and confirmed ALREADY authored. $P76_{mode}=$ **cross-link probe**, engaging `math.abst.ring-theory`'s own ring-isomorphism definition directly in Component 3's structural reading of CRT and the P76 transfer probe.

## Component 8 — Teaching Notes

- estimated_hours = 8 with an advanced/apply tag supports the "3 TAs + gate" tier, with LO1 establishing the hypothesis's necessity, LO2 given full constructive depth via the Bézout method, and LO3 grounding the theorem's deeper meaning in a directly verified ring-isomorphism check.
- **Division of labor**: `math.nt.gcd` already owns the Euclidean algorithm and Bézout identity machinery (verified by grep — no CRT-specific content); `math.abst.ring-theory` already owns the general ring axioms but contains no isomorphism or product-ring content (verified by grep — no "isomorphism" or "product ring" language found there). This concept owns the CRT statement itself, its Bézout-based construction (directly reusing, not reinventing, `math.nt.gcd`'s machinery), and the genuinely new ring-isomorphism/product-ring reading not present in `math.abst.ring-theory` itself.
- Example 3's deliberate choice of small moduli ($n_1=3,n_2=5$) was made specifically to make the full bijection (all 15 pairs) and the addition-respecting verification checkable by direct computation, giving LO3's structural claim concrete, falsifiable support rather than an abstract assertion.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.abst.ring-theory` confirmed authored → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: advanced learner already solves single congruences; task is systems and the structural reading) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
