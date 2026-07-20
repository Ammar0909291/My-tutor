# Teaching Blueprint: Cardinality (`math.found.cardinality`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.found.cardinality` |
| name | Cardinality |
| domain | Foundations |
| difficulty | developing |
| bloom | analyze |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 8 |
| requires | `math.found.power-set`, `math.found.function-set-theoretic` |
| unlocks | `math.found.countable-set`, `math.found.uncountable-set` |
| cross_links | none |
| CPA_entry_stage | P (Pictorial) — developing learner starts by pairing up elements of small finite sets visually before generalizing "same size" to a formal bijection-based definition |
| description (KG) | The number of elements in a set; for infinite sets, the size is measured via bijections and gives rise to the theory of infinite cardinal numbers. |

## Component 1 — Learning Objectives

- LO1 (cross-link objective): Recognize that "two sets have the SAME cardinality" is defined via a BIJECTION between them — directly reusing `math.found.function-set-theoretic`'s own injective+surjective definition of bijective — rather than by literally counting elements, and correctly verify a specific bijection between two small finite sets to confirm equal cardinality.
- LO2: Apply the bijection-based definition to INFINITE sets, where literal counting is impossible, by exhibiting an explicit bijection between $\mathbb{N}$ and a proper subset of itself (e.g. the even numbers) — and correctly interpret this as showing an infinite set CAN have the same cardinality as one of its own proper subsets, a genuinely counterintuitive fact that has no finite-set analogue.
- LO3: Use `math.found.power-set`'s own $2^{|A|}$ counting result to motivate Cantor's diagonal argument informally: state (without full proof) that $|\mathcal{P}(A)|>|A|$ for EVERY set $A$ (finite or infinite), and correctly verify this strict inequality using `math.found.power-set`'s own formula for a specific finite $A$, previewing why this guarantees infinitely many DIFFERENT sizes of infinity.

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.power-set` (the power set $\mathcal{P}(A)$ and its counting formula $|\mathcal{P}(A)|=2^{|A|}$ for finite $A$) and `math.found.function-set-theoretic` (functions as relations; injective, surjective, and bijective classifications).

## Component 3 — Core Explanation

**"Same cardinality" means a bijection exists — not literal counting**: `math.found.function-set-theoretic` already defines bijective (injective AND surjective — a perfect one-to-one correspondence). Two sets $A,B$ are DEFINED to have the same cardinality, written $|A|=|B|$, iff there EXISTS a bijection $f:A\to B$. For finite sets, this matches the intuitive counting notion exactly (a bijection between two finite sets forces them to have the same number of elements) — but the DEFINITION itself never mentions counting at all, only the existence of a pairing. This is the crucial shift that makes the definition extend to infinite sets, where "counting" has no direct meaning.

**Infinite sets can be bijective with their own proper subsets — genuinely impossible for finite sets**: consider $\mathbb{N}=\{0,1,2,3,\ldots\}$ and its proper subset of even numbers $E=\{0,2,4,6,\ldots\}$. The map $f:\mathbb{N}\to E$, $f(n)=2n$, is a bijection (injective: $2n_1=2n_2\Rightarrow n_1=n_2$; surjective: every even number $2k$ is hit by $f(k)$) — so by the DEFINITION above, $|\mathbb{N}|=|E|$, even though $E$ is a proper subset missing infinitely many elements of $\mathbb{N}$. For any FINITE set, a bijection to a proper subset is IMPOSSIBLE (removing even one element strictly decreases the count) — this is precisely what makes infinite sets qualitatively different, and is sometimes taken as the very definition of "infinite": a set is infinite iff it admits a bijection with a proper subset of itself.

**The power set is ALWAYS strictly larger — Cantor's diagonal argument, previewed via the counting formula**: `math.found.power-set` already proves $|\mathcal{P}(A)|=2^{|A|}$ for FINITE $A$, and $2^n>n$ for every natural number $n$ — so $|\mathcal{P}(A)|>|A|$ strictly, for every finite $A$. Cantor's diagonal argument (not proven in full here) shows this strict inequality $|\mathcal{P}(A)|>|A|$ holds for EVERY set $A$, including INFINITE ones — meaning $\mathcal{P}(\mathbb{N})$ is a STRICTLY LARGER infinity than $\mathbb{N}$ itself, and $\mathcal{P}(\mathcal{P}(\mathbb{N}))$ larger still, and so on forever. This directly explains why there isn't just "one size of infinity" — the power-set operation always produces something strictly bigger, generating an endless hierarchy of increasingly large infinite cardinalities.

## Component 4 — Worked Examples

**Example 1 (LO1 — verifying a bijection to confirm equal cardinality, breaking MC-1)**: for $A=\{1,2,3\}$ and $B=\{p,q,r\}$, the map $f(1)=p,f(2)=q,f(3)=r$ is checked against `math.found.function-set-theoretic`'s own definitions: injective (no two inputs share an output — verified directly from the listing) and surjective (every element of $B$ is hit — $p,q,r$ all appear as outputs), hence bijective. Since a bijection EXISTS, $|A|=|B|=3$ — confirming the definitional route (find a bijection) reaches the same conclusion as naive counting for finite sets, but via the mechanism (existence of a pairing) that will be needed for infinite sets.

**Example 2 (LO2 — $\mathbb{N}$ bijective with its own proper subset, breaking MC-2)**: verifying $f(n)=2n$ is a bijection from $\mathbb{N}$ to the even numbers $E$: injective, since $f(n_1)=f(n_2)\Rightarrow2n_1=2n_2\Rightarrow n_1=n_2$; surjective, since every even number $m$ equals $f(m/2)$ for some $n=m/2\in\mathbb{N}$. So $|\mathbb{N}|=|E|$ — DESPITE $E\subsetneq\mathbb{N}$ being a proper subset (e.g. $1,3,5,\ldots\notin E$). This is IMPOSSIBLE for any finite set (removing infinitely many elements while somehow keeping "the same size" has no finite analogue), directly confirming LO2's counterintuitive claim with an explicit, verified bijection rather than an abstract assertion.

**Example 3 (LO3 — the power set is always strictly larger, verified for a small finite case, breaking MC-3)**: for $A=\{a,b,c\}$ ($|A|=3$), `math.found.power-set`'s formula gives $|\mathcal{P}(A)|=2^3=8$. Checking $8>3$ — confirmed, a strict inequality. Repeating for $A=\{a\}$ ($|A|=1$): $|\mathcal{P}(A)|=2^1=2>1$ — again strict. This pattern ($2^n>n$ for every $n\ge0$, including the boundary case $n=0$ giving $2^0=1>0$) holds for every finite set checked, illustrating (without proving the infinite case) the general phenomenon Cantor's diagonal argument establishes for ALL sets: the power set is always strictly bigger than the original.

## Component 5 — Teaching Actions

### Teaching Action A01 — Same Cardinality Means "A Bijection Exists," Not "Count and Compare" (Primitive P11: Representation Shift)

State: "cardinality equality isn't defined by counting and comparing numbers — it's defined by whether a bijection EXISTS, reusing `math.found.function-set-theoretic`'s own injective+surjective definitions directly; for finite sets this always agrees with counting, but the definition itself never counts." Walk Example 1's bijection verification.

- **MC-1 hook**: ask "is 'same cardinality' fundamentally defined by counting elements and comparing the resulting numbers, or by the existence of a bijection?" — a "counting" answer reveals MC-1 (missing that the DEFINITION is bijection-existence, which happens to agree with counting only for finite sets).

### Teaching Action A02 — Infinite Sets Can Match Their Own Proper Subsets in Size (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: the explicitly verified bijection $f(n)=2n$ between $\mathbb{N}$ and its proper subset $E$. State: "for ANY finite set, matching a proper subset bijectively is flatly impossible — removing elements always shrinks the count. But $\mathbb{N}$ and its even numbers ARE genuinely bijective, which is exactly why infinite sets behave so differently from finite intuition."

- **MC-2 hook**: ask "can an infinite set ever be put in bijection with one of its own proper subsets?" — a "no, that's impossible, just like for finite sets" answer reveals MC-2 (over-extending finite-set intuition to infinite sets, where this genuinely becomes possible).

### Teaching Action A03 — The Power Set Is ALWAYS Strictly Bigger, Generating Infinitely Many Sizes of Infinity (Primitive P06: Contrast Pair)

Contrast the tempting assumption "infinity is just one size, or at most a couple of sizes" against Example 3's repeated verification that $|\mathcal{P}(A)|>|A|$ strictly for every finite $A$ checked, extended (via Cantor's diagonal argument, stated without proof) to hold for infinite $A$ too. State: "if the power set is ALWAYS strictly bigger, and you can keep taking power sets forever ($\mathcal{P}(\mathbb{N})$, then $\mathcal{P}(\mathcal{P}(\mathbb{N}))$, and so on), there isn't just one infinity — there's an endless hierarchy of strictly larger infinite cardinalities."

- **MC-3 hook**: ask "are there only one or two different 'sizes' of infinity, or can there be infinitely many distinct infinite cardinalities?" — a "one or two" answer reveals MC-3 (missing that the strict power-set inequality generates an unbounded hierarchy of distinct infinite sizes).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Verify (citing `math.found.function-set-theoretic`'s own definitions) that $f(x)=x+1$ is a bijection from $\{1,2,3,4\}$ to $\{2,3,4,5\}$, confirming both sets have the same cardinality.
  2. Construct an explicit bijection between $\mathbb{N}$ and the set of positive odd numbers, and verify it is injective and surjective.
  3. Using `math.found.power-set`'s own formula, compute $|\mathcal{P}(A)|$ for a set $A$ with 4 elements, and confirm the strict inequality $|\mathcal{P}(A)|>|A|$.
  4. Explain, in your own words, why "an infinite set can be bijective with a proper subset of itself" is impossible for finite sets but possible for infinite ones.
- **P76 (Transfer Probe, mode = independence — no cross-link target listed in the KG for this concept)**: "A library is digitizing its infinite (hypothetically unbounded) catalog of book titles, and wants to assign each book a unique 'shelf code' drawn from the natural numbers $\mathbb{N}$, while also wanting to reserve every EVEN-numbered code for a separate 'featured books' sub-catalog of the SAME total size as the full catalog. (a) Using this lesson's bijection-based definition of cardinality, explain why it is mathematically possible for the 'featured books' sub-catalog (using only even codes) to have the SAME cardinality as the entire catalog, even though it uses only half the available codes. (b) Contrast this directly with what would happen if the catalog were FINITE instead — explain concretely why the same reservation scheme would be impossible to make bijective with the full finite catalog. (c) If the library later wanted to catalog EVERY POSSIBLE SUBSET of collections of books (i.e., every possible reading list drawable from the catalog), explain, citing `math.found.power-set`'s own formula, why this new catalog is guaranteed to be strictly larger than the original book catalog, no matter how large the original already is."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | CARDINALITY-EQUALITY-ASSUMED-TO-BE-COUNTING | Believing "same cardinality" is fundamentally defined by counting elements and comparing numbers, missing that it is defined by bijection existence, which only happens to coincide with counting for finite sets | Foundational |
| MC-2 | INFINITE-SET-ASSUMED-CANNOT-MATCH-PROPER-SUBSET | Believing (by over-extending finite-set intuition) that an infinite set can never be put in bijection with one of its own proper subsets | High |
| MC-3 | INFINITY-ASSUMED-SINGLE-SIZE | Believing there is only one (or a small fixed number of) size(s) of infinity, missing that the strict power-set inequality generates an unbounded hierarchy of distinct infinite cardinalities | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Cardinality Equality Assumed to Be Counting") → P41 (detect: ask whether cardinality equality is fundamentally about counting or about bijection existence) → P64 (conceptual shift: re-walk Example 1's bijection verification route).
- **B02 (targets MC-2)**: P27 (name it: "Infinite Set Assumed Cannot Match Proper Subset") → P41 (detect: ask whether an infinite set can be bijective with its own proper subset) → P64 (conceptual shift: re-walk Example 2's explicit $f(n)=2n$ bijection).
- **B03 (targets MC-3)**: P27 (name it: "Infinity Assumed Single Size") → P41 (detect: ask whether there is only one size of infinity) → P64 (conceptual shift: re-walk Example 3's repeated strict-inequality verification and its extension via Cantor's diagonal argument).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.power-set` (the $2^{|A|}$ counting formula this concept's strict-inequality argument directly reuses) and `math.found.function-set-theoretic` (the injective/surjective/bijective definitions this concept's same-cardinality definition is built on directly).
- **Unlocks**: `math.found.countable-set` and `math.found.uncountable-set` (both classify sets using this concept's bijection-based cardinality definition, applied specifically against $\mathbb{N}$).
- **Cross-link**: KG lists none for this concept. $P76_{mode}=$ **independence** (no cross-link target to check).

## Component 8 — Teaching Notes

- estimated_hours = 8 with a developing/analyze tag supports the "3 TAs + gate" tier, with LO1 grounding the definition directly in already-known bijection machinery, LO2 given full depth via a fully verified counterintuitive infinite-set example, and LO3 previewing Cantor's diagonal argument via a concrete, checkable finite-case pattern rather than an unmotivated abstract statement.
- **Division of labor**: `math.found.power-set` already owns the $2^{|A|}$ counting formula for finite sets (verified by grep and by its own metadata, which explicitly unlocks this concept); `math.found.function-set-theoretic` already owns the injective/surjective/bijective definitions in full depth (verified by grep — includes a worked classification table). This concept owns the genuinely NEW material: the bijection-based DEFINITION of cardinality equality, its application to infinite sets (including the proper-subset phenomenon), and the informal preview of Cantor's diagonal argument via the strict power-set inequality — none of which appear in either prerequisite.
- Example 3's deliberate choice to check the strict inequality $|\mathcal{P}(A)|>|A|$ on TWO different finite sizes (3 and 1, including near the $n=0$ boundary pattern) rather than just one was made to make the PATTERN (not just a single coincidental instance) visible before extending it, via Cantor's argument, to the genuinely non-obvious infinite case.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (`math.found.countable-set`, `math.found.uncountable-set`) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (none listed in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: developing learner pairs small finite sets visually before generalizing to bijections) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
