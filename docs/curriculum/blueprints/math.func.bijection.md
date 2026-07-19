# Teaching Blueprint: Bijective Function (`math.func.bijection`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.func.bijection` |
| name | Bijective Function |
| domain | Functions |
| difficulty | proficient |
| bloom | understand |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 3 |
| requires | `math.func.injectivity`, `math.func.surjectivity` |
| unlocks | `math.func.inverse-functions`, `math.found.cardinality` |
| cross_links | `math.found.cardinality` |
| CPA_entry_stage | C (Concrete) — verifying both properties for a specific function, and directly failing to build an inverse for two "almost bijective" functions, before the general definition | 
| description (KG) | A function that is both injective and surjective; establishes a perfect pairing between domain and codomain; uniquely invertible. |

## Component 1 — Learning Objectives

- LO1: Define a function as **bijective** exactly when it is BOTH injective (`math.func.injectivity`) AND surjective (`math.func.surjectivity`) simultaneously, and verify bijectivity by checking both properties directly, reusing each prerequisite's own established checking procedure.
- LO2: Recognize the joint consequence of injective + surjective together — every codomain element has **EXACTLY ONE** preimage (surjectivity guarantees "at least one," injectivity additionally rules out "more than one") — a genuinely stronger "perfect pairing" between domain and codomain than either property alone provides.
- LO3: State that a function has a genuine **inverse function** if and only if it is bijective, and correctly show WHY: attempting to build an inverse for a non-injective function produces multiple outputs for some input (not a function at all), while attempting it for a non-surjective function leaves some inputs undefined (not a total function on the intended domain).

## Component 2 — Prerequisite Check

Assumes mastery of `math.func.injectivity` ($f(a)=f(b)\Rightarrow a=b$; different inputs give different outputs) and `math.func.surjectivity` (every codomain element has at least one preimage; range equals codomain).

## Component 3 — Core Explanation

**Bijective: both properties, checked together**: a function $f:A\to B$ is **bijective** exactly when it is BOTH injective AND surjective at once. Verifying bijectivity means running BOTH prerequisites' own established checks on the same function — confirm no two domain elements share an output (injective), and confirm every codomain element is hit by some domain element (surjective). Neither check substitutes for the other; both are required simultaneously.

**The joint consequence: exactly one preimage, not just "at least one"**: `math.func.surjectivity` alone guarantees every $b\in B$ has AT LEAST one preimage. `math.func.injectivity` alone guarantees no output is shared by two different inputs. Combined, they guarantee every $b\in B$ has EXACTLY one preimage — at least one (from surjectivity) and no more than one (from injectivity, which rules out two different domain elements both mapping to $b$). This "exactly one" correspondence is the precise mathematical meaning of a **perfect pairing** between $A$ and $B$ — every element of each set corresponds to exactly one element of the other.

**Why bijectivity is exactly the condition for a genuine inverse function**: given $f:A\to B$, the natural candidate for an inverse "swaps the arrows": $f^{-1}(b)=a$ whenever $f(a)=b$. For this to be a genuine FUNCTION (single-valued, defined on all of $B$), TWO things must hold: (1) every $b\in B$ must have SOME $a$ mapping to it (else $f^{-1}$ is undefined there — this needs surjectivity), and (2) every $b\in B$ must have AT MOST one such $a$ (else $f^{-1}(b)$ would have to equal two different things at once, violating the very definition of a function — this needs injectivity). Only when BOTH hold — i.e., $f$ is bijective — does $f^{-1}$ exist as a genuine, well-defined function.

## Component 4 — Worked Examples

**Example 1 (LO1 — verifying bijectivity directly)**: $f:\{1,2,3\}\to\{a,b,c\}$ with $f(1)=a,f(2)=b,f(3)=c$. Injective: all three outputs are distinct ✓. Surjective: $a,b,c$ are all hit (by $1,2,3$ respectively) ✓. Both properties hold — $f$ is bijective.

**Example 2 (LO1/LO2 — two "almost bijective" failures, breaking MC-1)**: $g:\{1,2\}\to\{a,b,c\}$ with $g(1)=a,g(2)=b$: injective (distinct outputs) ✓, but NOT surjective ($c$ has no preimage) ✗ — not bijective. Separately, $h:\{1,2,3\}\to\{a,b\}$ with $h(1)=a,h(2)=a,h(3)=b$: surjective ($a,b$ both hit) ✓, but NOT injective ($1$ and $2$ both map to $a$) ✗ — also not bijective. Neither having ONLY injectivity nor ONLY surjectivity is enough; both examples fail to be bijective despite each satisfying one of the two properties perfectly.

**Example 3 (LO2/LO3 — exactly one preimage, and why the inverse construction fails without both properties, breaking MC-2 and MC-3)**: For $f$ from Example 1 (genuinely bijective): every codomain element has EXACTLY one preimage ($a\leftarrow1$, $b\leftarrow2$, $c\leftarrow3$), so $f^{-1}:\{a,b,c\}\to\{1,2,3\}$ with $f^{-1}(a)=1,f^{-1}(b)=2,f^{-1}(c)=3$ is a genuine, well-defined function. Now attempt the same construction for $h$ from Example 2 (surjective, NOT injective): "$h^{-1}(a)$" would need to equal BOTH $1$ and $2$ simultaneously (since $h(1)=h(2)=a$) — this is **NOT a function at all**, since a function cannot assign two different outputs to the same input. And for $g$ from Example 2 (injective, NOT surjective): "$g^{-1}(c)$" is simply **undefined** — no domain element of $g$ maps to $c$, so $g^{-1}$ isn't even defined on all of its intended domain $\{a,b,c\}$. Both failures are exactly why bijectivity — not either property alone — is required for a genuine inverse function.

## Component 5 — Teaching Actions

### Teaching Action A01 — Checking Both Properties Together (Primitive P11: Representation Shift)

State: "bijective means injective AND surjective, checked as two separate, complete verifications on the same function — neither one is optional, and neither substitutes for the other." Work Example 1's full dual verification.

### Teaching Action A02 — Neither Property Alone Is Enough (Primitive P06: Contrast Pair)

Present Example 2's two failures side by side: $g$ (injective but not surjective) and $h$ (surjective but not injective) — both fail to be bijective, each missing exactly the OTHER property. State: "having one of the two properties perfectly does not compensate for missing the other — bijection genuinely needs both, simultaneously, on the same function."

- **MC-1 hook**: ask "if a function is injective, is it automatically bijective (or vice versa, for surjective)?" — a "yes" answer reveals MC-1 (treating the two properties as interchangeable or assuming one implies the other).

### Teaching Action A03 — Exactly One Preimage, and Why the Inverse Construction Genuinely Fails Without Both Properties (Primitive P28: Conflict Evidence)

Present Example 3's direct evidence: $f$'s bijectivity gives every codomain element EXACTLY one preimage, producing a genuine inverse function; $h$'s failed injectivity forces "$h^{-1}(a)$" to be two things at once (not a function); $g$'s failed surjectivity leaves "$g^{-1}(c)$" undefined (not total). State: "surjectivity alone only guarantees 'at least one' preimage — bijection needs 'exactly one,' and that extra guarantee, from injectivity, is precisely what keeps the inverse construction from breaking."

- **MC-2 hook**: ask "if every codomain element has at least one preimage, is that enough for a perfect one-to-one correspondence?" — a "yes" answer reveals MC-2 (missing that "at least one" and "exactly one" are different guarantees, with the latter needing injectivity too).
- **MC-3 hook**: ask "if I swap a function's domain and codomain roles to build an inverse, is the result automatically a valid inverse function, regardless of whether the original was bijective?" — a "yes" answer reveals MC-3 (missing that non-injectivity produces a multi-valued non-function, and non-surjectivity produces an undefined-somewhere non-function).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Verify $f:\{1,2,3,4\}\to\{w,x,y,z\}$ with $f(1)=w,f(2)=x,f(3)=y,f(4)=z$ is bijective, checking both properties.
  2. For $g:\{1,2,3\}\to\{p,q,r,s\}$ with $g(1)=p,g(2)=q,g(3)=r$, determine which of injective/surjective holds and which fails, and state whether $g$ is bijective.
  3. Construct the inverse function for problem 1's $f$, listing $f^{-1}$'s complete mapping.
  4. Explain why attempting to construct an inverse for problem 2's $g$ would leave some codomain element's "inverse value" undefined, and name that element.
- **P76 (Transfer Probe, mode = independence)**: "A theater assigns each of its 100 numbered seats to exactly one ticket holder for a sold-out show, with every ticket holder assigned to exactly one seat and every seat assigned to exactly one ticket holder. (a) Explain why this seat-assignment function is bijective, referencing both required properties. (b) Explain what it would mean, physically, for the assignment to fail surjectivity (some seat left completely unassigned) versus failing injectivity (two ticket holders assigned to the exact same seat) — describe both failure scenarios concretely. (c) Explain why the theater could reliably use this assignment to look up 'which ticket holder is in seat 47' (i.e., use the inverse function) only because the original assignment is genuinely bijective, not merely because every seat happens to have someone in it."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | INJECTIVE-OR-SURJECTIVE-ASSUMED-SUFFICIENT-FOR-BIJECTIVE | Believing injective alone (or surjective alone) is sufficient for bijectivity, or that one property automatically implies the other | Foundational |
| MC-2 | AT-LEAST-ONE-PREIMAGE-ASSUMED-SUFFICIENT-FOR-PERFECT-PAIRING | Believing surjectivity's "at least one preimage per codomain element" guarantee is enough for a perfect one-to-one correspondence, missing that bijection additionally requires "at most one" from injectivity | Foundational |
| MC-3 | INVERSE-RELATION-ASSUMED-ALWAYS-A-VALID-FUNCTION | Believing swapping a function's domain and codomain roles always produces a valid inverse function, regardless of whether the original function was bijective | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Injective or Surjective Assumed Sufficient for Bijective") → P41 (detect: ask a student whether an injective function is automatically bijective, and check for a "yes") → P64 (conceptual shift: re-walk Example 2's two contrasting failures, $g$ (injective, not surjective) and $h$ (surjective, not injective), re-anchoring on "bijective needs BOTH properties, checked separately and completely, on the same function").
- **B02 (targets MC-2)**: P27 (name it: "At-Least-One-Preimage Assumed Sufficient for Perfect Pairing") → P41 (detect: ask a student whether "every codomain element has at least one preimage" alone establishes a perfect one-to-one correspondence, and check for a "yes") → P64 (conceptual shift: re-walk Example 3's $h$, showing "$h^{-1}(a)$" forced to be two values at once despite surjectivity holding, re-anchoring on "exactly one preimage needs BOTH 'at least one' (surjective) AND 'at most one' (injective)").
- **B03 (targets MC-3)**: P27 (name it: "Inverse Relation Assumed Always a Valid Function") → P41 (detect: ask a student whether swapping a function's arrows always produces a valid inverse function, and check for a "yes") → P64 (conceptual shift: re-walk Example 3's two failed constructions ($h^{-1}$ multi-valued, $g^{-1}$ undefined somewhere), re-anchoring on "the swapped relation is only guaranteed to be a genuine FUNCTION when the original was bijective").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.func.injectivity` (the "no shared outputs" property this concept combines with surjectivity), `math.func.surjectivity` (the "every codomain element hit" property this concept combines with injectivity).
- **Unlocks**: `math.func.inverse-functions` (bijectivity is exactly the gatekeeping condition that concept's genuine inverse functions require, per LO3), `math.found.cardinality` (bijections are the standard tool for comparing the "size" of sets, including infinite ones).
- **Cross-link**: KG lists `math.found.cardinality` as a cross-link — **not yet authored** (checked via `ls docs/curriculum/blueprints/` before setting P76_mode). $P76_{mode}=$ **independence**; a future revision may add a genuine cross-link transfer probe into cardinality comparison once that entry exists.

## Component 8 — Teaching Notes

- estimated_hours = 3 with a proficient/understand tag places this at a "3 TAs + gate" tier, appropriately compact given the concept directly combines two already-mastered prerequisites into one new joint property, plus one significant consequence (the inverse-function gatekeeping role) rather than introducing substantial new machinery.
- Examples 2 and 3 deliberately reuse the SAME two "almost bijective" functions ($g$: injective-not-surjective; $h$: surjective-not-injective) across both LO1/LO2 (the property-checking contrast) and LO2/LO3 (the failed-inverse-construction evidence) — letting the SAME two counterexamples carry the entire lesson's weight, rather than introducing fresh functions for each objective, matching this corpus's established near-identical-pair technique.
- This concept's cross-link to `math.found.cardinality` is left in independence mode per the standard rule, but Component 7 explicitly names bijection's role there (comparing set sizes, including infinite sets) so a future author of that concept can locate this connection immediately.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (math.found.cardinality unauthored → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: specific function verified, and inverse construction directly attempted and failed for two counterexamples, before the general definition) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO1/LO2, Ex3→LO2/LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
