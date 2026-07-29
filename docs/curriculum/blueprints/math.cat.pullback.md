# Teaching Blueprint: Pullback and Pushout (`math.cat.pullback`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.cat.pullback` |
| name | Pullback and Pushout |
| domain | Category Theory |
| difficulty | research |
| bloom | apply |
| mastery_threshold | 0.6 → MAMR = ⌈0.6×5⌉ = 3/5 |
| estimated_hours | 4 |
| requires | `math.cat.limits` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — direct definition, grounded immediately in the already-taught general limit concept and its $\mathbf{Set}$ instance |
| description (KG) | Pullback of f:A→C, g:B→C: the limit of the diagram A→C←B. In Set: {(a,b)∈A×B : f(a)=g(b)}. Pushout: colimit of A←C→B. Pullbacks compute fiber products; pushouts glue spaces. Essential in topology, algebraic geometry, type theory. |

## Component 1 — Learning Objectives

- LO1: Define the **pullback** of $f:A\to C$ and $g:B\to C$ (a "cospan" $A\to C\leftarrow B$) as the limit of that diagram — an object $P$ with morphisms $p_A:P\to A,p_B:P\to B$ satisfying $f\circ p_A=g\circ p_B$, universal among all such pairs — and recognize it as a specific instance of the general limit concept applied to the cospan diagram shape.
- LO2: Compute the pullback in $\mathbf{Set}$ as $P=\{(a,b)\in A\times B : f(a)=g(b)\}$ (the **fiber product**), with $p_A,p_B$ the two coordinate projections, and correctly compute this set for specific $f,g$.
- LO3: Define the **pushout** as the dual (colimit) of a "span" $A\leftarrow C\to B$, describe its role as "gluing" two objects along a shared piece $C$, and correctly distinguish when a pullback (fiber-product, "intersecting over a common target") versus a pushout (gluing, "joining over a common source") is the appropriate construction for a given situation.

## Component 2 — Prerequisite Check

Assumes mastery of `math.cat.limits` (cones, universal properties, and the specific claim, previewed there, that the pullback is the limit of a cospan diagram $A\to C\leftarrow B$).

## Component 3 — Core Explanation

The **pullback** of $f:A\to C$ and $g:B\to C$ (both mapping INTO the same object $C$ — a "cospan") is an object $P$ with morphisms $p_A:P\to A$ and $p_B:P\to B$ such that $f\circ p_A = g\circ p_B$ (both composite routes from $P$ to $C$ agree), universal among all such commuting squares: any other object $P'$ with maps $p'_A,p'_B$ satisfying $f\circ p'_A=g\circ p'_B$ factors uniquely through $P$. This is exactly the limit (per `math.cat.limits`) of the cospan diagram shape $A\to C\leftarrow B$.

**In $\mathbf{Set}$, the pullback is the fiber product**: $P=\{(a,b)\in A\times B : f(a)=g(b)\}$, with $p_A,p_B$ the two coordinate projections restricted to this subset. Intuitively: pairs $(a,b)$ that "agree when mapped to $C$." When $C$ is a single point and $f,g$ are the unique maps to it, the pullback reduces exactly to the ordinary product $A\times B$ (every pair trivially "agrees" at the single point) — the pullback strictly generalizes the product.

**The pushout (dual, colimit of a span)**: given $A\xleftarrow{f}C\xrightarrow{g}B$ (both maps OUT of a shared object $C$ — a "span"), the pushout is an object $Q$ with maps $q_A:A\to Q,q_B:B\to Q$ such that $q_A\circ f=q_B\circ g$, universal among such. Intuitively, the pushout **glues** $A$ and $B$ together, identifying the image of $C$ in $A$ with the image of $C$ in $B$ — the categorical formalization of "take two spaces and glue them along a shared subspace."

**Fiber product versus gluing — dual, not interchangeable operations**: a pullback takes two maps INTO a common target and produces the set of "agreeing" pairs (a SUBSET-like, restrictive construction — narrowing $A\times B$ down to where $f,g$ coincide). A pushout takes two maps OUT of a common source and produces a glued, IDENTIFIED object (an ENLARGING/quotienting construction — combining $A$ and $B$ while merging the shared part). Confusing the two — using a pullback's cospan shape when a pushout's span shape is needed, or vice versa — produces the wrong universal property entirely.

## Component 4 — Worked Examples

**Example 1 (LO1/LO2 — computing a pullback directly, in $\mathbf{Set}$)**: Let $A=\{1,2,3\}$, $B=\{x,y,z\}$, $C=\{\text{even},\text{odd}\}$, with $f:A\to C$ sending $1{\mapsto}\text{odd},2{\mapsto}\text{even},3{\mapsto}\text{odd}$, and $g:B\to C$ sending $x{\mapsto}\text{even},y{\mapsto}\text{odd},z{\mapsto}\text{even}$. The pullback is $P=\{(a,b):f(a)=g(b)\}$: checking all 9 pairs, the agreeing ones are $(1,y)$ [both odd], $(2,x)$ [both even], $(2,z)$ [both even], $(3,y)$ [both odd] — so $P=\{(1,y),(2,x),(2,z),(3,y)\}$, a 4-element fiber product, with $p_A,p_B$ the obvious coordinate projections.

**Example 2 (LO3 — computing a pushout directly, and its gluing role, breaking MC-1)**: Let $C=\{*\}$ (a single shared point), $A=\{1,2\}$, $B=\{p,q\}$, with $f:C\to A,f(*)=1$ and $g:C\to B,g(*)=p$ (both mapping the single shared point INTO $A$ and $B$ respectively). The pushout glues $f(*)=1\in A$ together with $g(*)=p\in B$: $Q = (A\sqcup B)/{\sim}$ where $\sim$ identifies $1\sim p$ only, giving $Q=\{[1{=}p],2,q\}$, a 3-element set — literally $A$ and $B$ "glued together" at the single shared point, exactly matching the informal description of gluing two spaces along a shared subspace (here, a single point, as in gluing two line segments at an endpoint to form a "V" shape).

**Example 3 (LO1 — pullback as literally the limit already defined, and reducing to the ordinary product, closing the loop from `math.cat.limits`)**: Let $C=\{*\}$ be a one-point set with $f:A\to\{*\},g:B\to\{*\}$ the unique (necessarily constant) maps. Then $f(a)=g(b)=*$ for EVERY pair $(a,b)$ — the "agreement" condition is vacuous — so $P=\{(a,b)\in A\times B : f(a)=g(b)\} = A\times B$, the full ordinary product, exactly recovering `math.cat.limits`' Example 1 (the product as a discrete-diagram limit) as a special case of the pullback where the shared target $C$ carries no information at all.

## Component 5 — Teaching Actions

### Teaching Action A01 — Pullback as Fiber Product, Generalizing the Ordinary Product (Primitive P11: Representation Shift)

State: "you already know the product $A\times B$ from `math.cat.limits` — the pullback generalizes it by adding a shared target $C$ that the two factors must AGREE with, rather than being entirely independent." Work Example 3's reduction (pullback over a one-point $C$ = ordinary product) to make the generalization concrete, then work Example 1's genuine fiber-product computation with a non-trivial $C$.

- **MC-2 hook**: ask "is the pullback just the product $A\times B$, computed the same way regardless of $f$ and $g$?" — an answer of "yes" reveals MC-2 (missing that the pullback genuinely restricts to the agreeing pairs, and equals the FULL product only in the degenerate one-point-$C$ case).

### Teaching Action A02 — Pushout as Gluing, Genuinely Dual to the Pullback (Primitive P06: Contrast Pair)

**Contrast (targets MC-1)**: place Example 1's pullback (cospan $A\to C\leftarrow B$, produces a RESTRICTED subset of $A\times B$) directly beside Example 2's pushout (span $A\leftarrow C\to B$, produces an ENLARGED/glued set from $A$ and $B$). Count elements explicitly in each: pullback narrows down from $|A\times B|=9$ to $|P|=4$; pushout combines $|A|+|B|=4$ down to $|Q|=3$ (via identification, not restriction). State: "the arrows point OPPOSITE directions in the two diagram shapes — cospan (into $C$) for pullback, span (out of $C$) for pushout — and this is not a superficial labeling difference; it produces genuinely dual, structurally different constructions."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Compute the pullback of $f:\{1,2,3,4\}\to\{\text{even},\text{odd}\}$ and $g:\{5,6,7\}\to\{\text{even},\text{odd}\}$ (using the standard parity of each number), listing all agreeing pairs.
  2. Explain, using Example 3's argument, why the pullback over a one-point $C$ reduces to the ordinary product $A\times B$.
  3. For $A=\{p,q\},B=\{r,s\}$, $C=\{*\}$, $f(*)=p,g(*)=r$, compute the pushout explicitly, listing its elements.
  4. Explain, in your own words, why a pullback (cospan) and a pushout (span) point their defining arrows in opposite directions, and why this makes them dual rather than the same construction under a different name.
- **P76 (Transfer Probe, mode = independence)**: "In topology, gluing two circles together at a single point to form a 'figure-eight' space is a pushout: $A=\text{circle},B=\text{circle},C=\{*\}$ (a single point), with $f,g$ each including the point into one location on each circle. (a) Using this lesson's pushout definition, explain why the resulting figure-eight IS the pushout, in the sense that it is the universal way of gluing the two circles at that one point. (b) In database design, a JOIN between two tables sharing a common key column is instead a PULLBACK, not a pushout (the tables map INTO the shared key values, a cospan). Explain, using this lesson's distinction between cospan-pullback and span-pushout, why database JOINs are structurally a pullback and not a pushout, even though both 'combine two things using a shared piece.'"
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 3/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | PULLBACK-PUSHOUT-DIRECTION-CONFUSED | Confusing the cospan (into $C$, pullback) and span (out of $C$, pushout) diagram shapes, treating them as interchangeable or as "the same construction, just relabeled" | Foundational |
| MC-2 | PULLBACK-ASSUMED-ALWAYS-EQUALS-PRODUCT | Believing the pullback always equals the ordinary product $A\times B$ regardless of $f,g,C$, missing that it genuinely restricts to the agreeing pairs except in the degenerate one-point-$C$ case | Foundational |
| MC-3 | PUSHOUT-ELEMENT-COUNT-MISCOMPUTED-AS-SIMPLE-SUM | Believing the pushout $Q$ always has exactly $|A|+|B|$ elements (a plain disjoint union, ignoring the identifications forced by $f,g$), rather than the smaller count after gluing shared elements together | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Pullback/Pushout Direction Confused") → P41 (detect: ask which diagram shape (cospan or span) defines the pullback) → P64 (conceptual shift: re-walk the explicit arrow-direction contrast in Component 5's A02).
- **B02 (targets MC-2)**: P27 (name it: "Pullback Assumed Always Equals Product") → P41 (detect: present Example 1's non-trivial pullback, with $|P|=4\neq|A\times B|=9$, and ask if this contradicts "pullback = product") → P64 (conceptual shift: re-walk Example 3's degenerate one-point-$C$ case as the ONLY scenario where pullback literally equals the full product).
- **B03 (targets MC-3)**: P27 (name it: "Pushout Element Count Miscomputed as Simple Sum") → P41 (detect: ask a student to predict $|Q|$ for Example 2's setup before working through the identification) → P64 (conceptual shift: re-count Example 2's pushout explicitly, showing $|Q|=3<|A|+|B|=4$ due to the forced identification $1\sim p$).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.cat.limits` (the general universal-cone definition of a limit, and the specific claim, previewed there, that the pullback is the limit of a cospan diagram — this concept fully expands and computes that claim).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 4 with a research/apply tag and mastery_threshold = 0.6 (MAMR 3/5) matches this corpus's `math.cat.limits` blueprint's own established pattern for this domain's research-tier concepts — the "2 main TAs + gate" structure (A01: pullback as fiber product, generalizing the product; A02: pushout as genuinely dual gluing) directly continues that blueprint's own deferred promise to give pullbacks "a detailed, dedicated treatment," and this Blueprint's own sibling `math.cat.equalizer` establishes the parallel pattern for the OTHER named limit type `math.cat.limits` deferred.
- Example 1's parity-based $f,g$ were deliberately chosen (rather than more arbitrary functions) so the fiber-product computation could be verified by direct, checkable enumeration (9 pairs, 4 agreeing) without requiring any machinery beyond basic set comparison — keeping the computational LO2 genuinely independent of the conceptual LO1/LO3 material.
- The database-JOIN transfer probe deliberately mirrors `math.cat.limits`' own JOIN-as-pullback transfer probe (both concern the identical categorical fact, since a pullback IS a limit) but is reframed here as a CONTRAST against the topology-gluing pushout example specifically, to reinforce this blueprint's central MC-1 concern (cospan/span direction confusion) rather than merely repeating the earlier blueprint's point.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.cat.limits`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.6×5⌉=3) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract, grounded directly in the already-taught limit concept) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO3, Ex3→LO1) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
