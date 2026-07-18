# Teaching Blueprint: Category (`math.cat.category`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.cat.category` |
| name | Category |
| domain | Category Theory |
| difficulty | expert |
| bloom | understand |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.found.function-set-theoretic`, `math.abst.algebraic-structure` |
| unlocks | `math.cat.functor` |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — direct axiomatic definition grounded immediately in already-familiar concrete examples (Set, Grp), rather than a separate concrete opener |
| description (KG) | A category C consists of: a class of objects Ob(C), for each pair (A,B) a set Hom(A,B) of morphisms, composition ∘ (associative), and identity morphisms 1_A. Examples: Set (sets + functions), Grp (groups + homomorphisms), Top (spaces + continuous maps), Vect_k (vector spaces + linear maps). |

## Component 1 — Learning Objectives

- LO1: State the definition of a **category** $\mathcal{C}$: a class of **objects** $\mathrm{Ob}(\mathcal{C})$, for each pair of objects $(A,B)$ a set $\mathrm{Hom}(A,B)$ of **morphisms** (arrows) from $A$ to $B$, a **composition** operation $\circ$ combining compatible morphisms, and an **identity morphism** $1_A$ for each object.
- LO2: Verify the two category axioms — **associativity** of composition ($h\circ(g\circ f) = (h\circ g)\circ f$ whenever the compositions are defined) and the **identity law** ($1_B\circ f = f = f\circ 1_A$ for $f:A\to B$) — for a specific concrete category.
- LO3: Recognize the four named example categories ($\mathbf{Set}$: sets and functions; $\mathbf{Grp}$: groups and homomorphisms; $\mathbf{Top}$: topological spaces and continuous maps; $\mathbf{Vect}_k$: vector spaces and linear maps) as instances of the single abstract category definition, correctly identifying what serves as "objects" and "morphisms" in each.

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.function-set-theoretic` (functions as a specific kind of relation — the model for "morphism" in the category $\mathbf{Set}$) and `math.abst.algebraic-structure` (sets with operations satisfying axioms — the model for the various algebraic-structure categories like $\mathbf{Grp}$).

## Component 3 — Core Explanation

A **category** $\mathcal{C}$ consists of four ingredients:
1. A class of **objects** $\mathrm{Ob}(\mathcal{C})$ (a "class" rather than necessarily a set, since e.g. "all sets" is too large to be a set itself — a technical point not central to first understanding).
2. For each ordered pair of objects $(A,B)$, a set $\mathrm{Hom}(A,B)$ of **morphisms** (or arrows) from $A$ to $B$, written $f:A\to B$.
3. A **composition** operation: for $f:A\to B$ and $g:B\to C$, a composite morphism $g\circ f:A\to C$.
4. For each object $A$, an **identity morphism** $1_A:A\to A$.

**Two axioms** these ingredients must satisfy:
- **Associativity**: for $f:A\to B$, $g:B\to C$, $h:C\to D$, $h\circ(g\circ f) = (h\circ g)\circ f$ — composing three (or more) morphisms in a row gives the same result regardless of how you group the composition.
- **Identity law**: for any $f:A\to B$, $1_B\circ f = f$ and $f\circ 1_A = f$ — composing with the identity morphism (on either side, matched appropriately) does nothing.

**Four standard examples**, each an instance of this one abstract pattern:
- $\mathbf{Set}$: objects = sets, morphisms = functions between them, composition = ordinary function composition, identity = the identity function.
- $\mathbf{Grp}$: objects = groups, morphisms = group homomorphisms, composition = function composition (which is automatically still a homomorphism), identity = the identity homomorphism.
- $\mathbf{Top}$: objects = topological spaces, morphisms = continuous maps, composition = function composition (composites of continuous maps are continuous), identity = the identity map.
- $\mathbf{Vect}_k$: objects = vector spaces over a field $k$, morphisms = linear maps, composition = function composition (composites of linear maps are linear), identity = the identity linear map.

**The unifying insight**: in every one of these examples, "morphism" specializes to whatever kind of *structure-preserving* function is appropriate for that category's objects — a category doesn't require morphisms to literally be functions at all (more exotic categories exist where they aren't), but every example named here happens to use actual functions, with the "preserving structure" requirement varying by category.

## Component 4 — Worked Examples

**Example 1 (LO1/LO3 — identifying the ingredients in Set)**: In $\mathbf{Set}$, take objects $A=\{1,2\}$, $B=\{a,b,c\}$, $C=\{x,y\}$. $\mathrm{Hom}(A,B)$ is the set of all functions $A\to B$ (there are $3^2=9$ of them). Given $f:A\to B$ with $f(1)=a,f(2)=b$, and $g:B\to C$ with $g(a)=x,g(b)=x,g(c)=y$, the composite $g\circ f:A\to C$ satisfies $(g\circ f)(1)=g(a)=x$, $(g\circ f)(2)=g(b)=x$. The identity morphism $1_A:A\to A$ sends each element to itself.

**Example 2 (LO2 — verifying associativity and identity concretely)**: Using Example 1's $f,g$ plus $h:C\to\{p,q\}$ with $h(x)=p,h(y)=q$: compute $(h\circ g)\circ f$ and $h\circ(g\circ f)$ separately. $(h\circ g)(a)=h(x)=p$, $(h\circ g)(b)=h(x)=p$; so $((h\circ g)\circ f)(1)=(h\circ g)(a)=p$, $((h\circ g)\circ f)(2)=(h\circ g)(b)=p$. Separately: $(g\circ f)(1)=x$, so $(h\circ(g\circ f))(1)=h(x)=p$ — matches. Both orderings give the same function, confirming associativity holds (as it must, since ordinary function composition is always associative). Check identity: $1_B\circ f = f$ — composing $f$ with $B$'s identity first changes nothing, since $1_B(f(1))=f(1)=a$, etc.

**Example 3 (LO3 — recognizing Grp as a category instance, breaking MC-1)**: In $\mathbf{Grp}$, objects are groups like $(\mathbb{Z},+)$ and $(\mathbb{Z}/6\mathbb{Z},+)$. A morphism $\phi:\mathbb{Z}\to\mathbb{Z}/6\mathbb{Z}$ must be a **group homomorphism** — not just ANY function between the underlying sets, but one respecting the group operation: $\phi(a+b)=\phi(a)+\phi(b)$. The reduction-mod-6 map $\phi(n) = n\bmod 6$ qualifies. But a function like $\psi(n) = n^2 \bmod 6$ (squaring then reducing) is a perfectly good function $\mathbb{Z}\to\mathbb{Z}/6\mathbb{Z}$, yet is **not** a valid morphism in $\mathbf{Grp}$, since $\psi(1+1)=\psi(2)=4$ but $\psi(1)+\psi(1)=1+1=2\neq4$ — it fails to preserve the group operation, disqualifying it from $\mathrm{Hom}_{\mathbf{Grp}}(\mathbb{Z},\mathbb{Z}/6\mathbb{Z})$ even though it's a valid morphism in $\mathbf{Set}$.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Four Ingredients, Grounded Directly in Set (Primitive P11: Representation Shift)

Start directly in the already-familiar territory of functions between sets (from `math.found.function-set-theoretic`). Work Example 1, explicitly labeling each piece: "the sets are the OBJECTS; the functions between them are the MORPHISMS; composing functions is the category's COMPOSITION; each set's identity function is its IDENTITY MORPHISM." State: "you've been working inside the category $\mathbf{Set}$ this whole time, without the name — this lesson gives the pattern a name and shows it generalizes far beyond sets and functions."

Shift representation to the fully abstract definition (the four ingredients, stated for a general $\mathcal{C}$), immediately re-grounding each abstract piece back in the Example 1 instantiation just completed.

- **MC-1 hook**: present Example 3's setup and ask "is $\psi(n)=n^2\bmod 6$ a valid morphism from $\mathbb{Z}$ to $\mathbb{Z}/6\mathbb{Z}$ IN THE CATEGORY $\mathbf{Grp}$?" — a "yes" (since it's obviously a valid function between the underlying sets) reveals MC-1 (assuming any function between the objects' underlying sets automatically qualifies as a morphism, regardless of the category's specific structure-preservation requirement).

### Teaching Action A02 — Verifying the Axioms, and Morphisms as Structure-Preserving (Primitive P06: Contrast Pair)

**Contrast 1**: Work Example 2's explicit associativity verification, both groupings computed side by side, landing on the identical result — making concrete what "the axiom holds" actually means as a checkable fact, not just an assumed property.

**Contrast 2 (targets MC-1, structure-preservation across categories)**: Place the valid homomorphism $\phi(n)=n\bmod6$ directly beside the invalid $\psi(n)=n^2\bmod6$ from Example 3. Verify $\phi$ preserves the operation ($\phi(a+b)=\phi(a)+\phi(b)$, checkable directly) while $\psi$ fails this same check. State the general rule: "in $\mathbf{Set}$, ANY function between the object-sets is a morphism — no extra requirement. In $\mathbf{Grp}$, $\mathbf{Top}$, and $\mathbf{Vect}_k$, morphisms must ADDITIONALLY preserve the relevant structure (group operation, continuity, linearity respectively) — being a category doesn't specify what that extra requirement is; each named example category makes its own choice, and you must check the SPECIFIC category's requirement, not assume $\mathbf{Set}$'s 'anything goes' rule carries over."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. In the category $\mathbf{Set}$, let $A=\{1,2,3\}$, $B=\{x,y\}$. How many morphisms are in $\mathrm{Hom}(A,B)$? (Count all functions $A\to B$.)
  2. Give an example of a function $\mathbb{R}\to\mathbb{R}$ that IS a valid morphism in $\mathbf{Set}$ but is NOT a valid morphism in $\mathbf{Vect}_{\mathbb{R}}$ (i.e., not linear), when both $\mathbb{R}$'s are viewed as the same 1-dimensional vector space.
  3. For three morphisms $f:A\to B$, $g:B\to C$, $h:C\to D$ in any category, write out both groupings of their triple composition and state which axiom guarantees they're equal.
  4. Explain why $1_B \circ f = f$ (the identity law) for $f:A\to B$, using the concrete case of $f$ being a function between sets and $1_B$ the identity function on $B$.
- **P76 (Transfer Probe, mode = independence)**: "A software system models user-interface 'screens' as objects and 'valid navigation transitions' between screens as morphisms — a transition is only valid if it preserves certain required application state (e.g., a logged-in-only screen can only transition to another logged-in-accessible screen). (a) Identify what plays the role of objects and morphisms in this system. (b) Explain, using this lesson's structure-preservation contrast (Set vs. Grp), why NOT every possible function between screens (in the loose 'any UI event could jump anywhere' sense) should count as a valid morphism in this category — what is the 'preserved structure' analogous to a group homomorphism's operation-preservation? (c) If transition A→B and B→C are both valid, explain using the category axioms why the composite transition A→C being valid (and unambiguous regardless of how you think about the chaining) is guaranteed by this lesson's associativity axiom."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ANY-FUNCTION-ASSUMED-VALID-MORPHISM | Assuming any function between the underlying sets of two objects automatically qualifies as a morphism in every category, ignoring category-specific structure-preservation requirements (e.g. treating a non-homomorphism as a valid Grp morphism) | Foundational |
| MC-2 | COMPOSITION-ASSUMED-COMMUTATIVE | Confusing associativity (which composition order of grouping gives the same result) with commutativity (whether $f\circ g = g\circ f$), incorrectly assuming morphism composition can generally be reordered | Moderate |
| MC-3 | IDENTITY-MORPHISM-ASSUMED-UNIQUE-ACROSS-OBJECTS | Believing a single identity morphism serves all objects in a category (like a universal "do nothing" arrow), rather than each object having its OWN distinct identity morphism | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Any-Function-Valid-Morphism Assumption") → P41 (detect: present a non-structure-preserving function like $\psi(n)=n^2\bmod6$ and ask if it's a valid $\mathbf{Grp}$ morphism) → P64 (conceptual shift: re-derive by directly checking the homomorphism property, $\phi(a+b)\stackrel{?}{=}\phi(a)+\phi(b)$, showing the specific failure).
- **B02 (targets MC-2)**: P27 (name it: "Associativity/Commutativity Conflation") → P41 (detect: ask whether $g\circ f = f\circ g$ is guaranteed by the category axioms) → P64 (conceptual shift: re-anchor on the precise axiom wording — associativity is about GROUPING of the SAME order ($h\circ(g\circ f)$ vs $(h\circ g)\circ f$, same left-to-right sequence), never about reordering which morphism comes first).
- **B03 (targets MC-3)**: P27 (name it: "Universal Identity Assumption") → P41 (detect: ask whether $1_A$ and $1_B$ for two different objects $A,B$ are "the same morphism") → P64 (conceptual shift: re-anchor on the definition — each object $A$ has its OWN identity morphism $1_A:A\to A$; these are generally distinct morphisms for distinct objects, even though they play analogous roles).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.function-set-theoretic` (functions as the model for $\mathbf{Set}$'s morphisms, and the general notion of composable maps), `math.abst.algebraic-structure` (sets-with-operations as the model for $\mathbf{Grp}$ and the other algebraic-structure categories).
- **Unlocks**: `math.cat.functor` (a functor is a structure-preserving map BETWEEN categories — this concept's definition of a category is the essential prerequisite object that functors act on).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 5 with an expert/understand tag places this at the "2 main TAs + gate" tier — A01 (the four ingredients, grounded directly in the already-familiar $\mathbf{Set}$ category) and A02 (axiom verification plus the structure-preservation contrast across categories) jointly cover all three LOs, appropriate for an understand-level concept whose difficulty is abstraction and precise definition-matching rather than computational technique.
- CPA_entry_stage is marked Abstract, but — unlike the measure-theory strand's Abstract entries, which opened with the bare axioms directly — this concept's abstract definition is introduced by IMMEDIATELY re-deriving it from the learner's own pre-existing, comfortable knowledge of functions between sets (Example 1 doubles as both the worked example and the representation-shift anchor); this was a deliberate choice given category theory's reputation for feeling untethered from familiar mathematics, and directly addresses that risk by making $\mathbf{Set}$ the very first, fully concrete instantiation before any other example is introduced.
- MC-1 (any-function-assumed-valid-morphism) was elevated to Foundational severity and given the most teaching attention (both the A01 hook and the entirety of A02 Contrast 2), because it is the single most common conceptual error when learners meet multiple example categories for the first time: over-generalizing $\mathbf{Set}$'s permissive "any function counts" rule to categories with genuine structure-preservation requirements.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract, grounded directly in Set; justified in Teaching Notes) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO3, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
