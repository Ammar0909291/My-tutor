# Teaching Blueprint: Functor (`math.cat.functor`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.cat.functor` |
| name | Functor |
| domain | Category Theory |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.cat.category` |
| unlocks | `math.cat.natural-transformation`, `math.cat.adjunction` |
| cross_links | `math.abst.group-homomorphism` (not yet authored), `math.linalg.linear-map` (**authored** — verified via `ls`; P76_mode = cross-link probe against this target, see Component 7) |
| CPA_entry_stage | A (Abstract) — direct definition grounded immediately in the already-familiar $\mathbf{Set}$/$\mathbf{Grp}$ examples from `math.cat.category` |
| description (KG) | A structure-preserving map between categories: F sends objects to objects and morphisms to morphisms, preserving composition and identities. Contravariant functor: reverses arrows. Examples: forgetful functors, free functors, homology, π₁. |

## Component 1 — Learning Objectives

- LO1: Define a **functor** $F:\mathcal{C}\to\mathcal{D}$ as an assignment sending each object $A\in\mathrm{Ob}(\mathcal{C})$ to an object $F(A)\in\mathrm{Ob}(\mathcal{D})$, and each morphism $f:A\to B$ in $\mathcal{C}$ to a morphism $F(f):F(A)\to F(B)$ in $\mathcal{D}$, satisfying two preservation laws: $F(g\circ f)=F(g)\circ F(f)$ and $F(1_A)=1_{F(A)}$.
- LO2: Distinguish a **covariant functor** (preserves the direction of arrows, as in LO1) from a **contravariant functor** (reverses arrow direction: sends $f:A\to B$ to $F(f):F(B)\to F(A)$, with the composition law correspondingly reversed: $F(g\circ f)=F(f)\circ F(g)$).
- LO3: Recognize and verify the "structure-preserving" property concretely for named example functors — the **forgetful functor** (e.g. $\mathbf{Grp}\to\mathbf{Set}$, discarding the group structure and keeping only the underlying set) and the **free functor** (e.g. $\mathbf{Set}\to\mathbf{Grp}$, building the free group on a set) — and connect the general functor definition to the already-known concept of a linear map as a specific functor instance.

## Component 2 — Prerequisite Check

Assumes mastery of `math.cat.category` (the four ingredients of a category and its two axioms — objects, morphisms, composition, identity).

## Component 3 — Core Explanation

A **functor** $F:\mathcal{C}\to\mathcal{D}$ is a structure-preserving map between two categories, consisting of two coordinated pieces:
- An **object map**: sends each $A\in\mathrm{Ob}(\mathcal{C})$ to some $F(A)\in\mathrm{Ob}(\mathcal{D})$.
- A **morphism map**: sends each $f:A\to B$ in $\mathcal{C}$ to some $F(f):F(A)\to F(B)$ in $\mathcal{D}$.

satisfying two preservation laws:
1. **Preserves composition**: $F(g\circ f) = F(g)\circ F(f)$.
2. **Preserves identities**: $F(1_A) = 1_{F(A)}$.

("Structure-preserving" here means precisely: the functor doesn't just move objects and morphisms around arbitrarily — it respects the *category's own operations*, composition and identity, exactly.)

**Covariant vs. contravariant**: a functor as defined above is **covariant** — it preserves the direction of arrows ($f:A\to B$ becomes $F(f):F(A)\to F(B)$, same direction). A **contravariant** functor instead **reverses** arrow direction: $f:A\to B$ becomes $F(f):F(B)\to F(A)$ (note the swap), and correspondingly the composition law reverses order: $F(g\circ f) = F(f)\circ F(g)$ (not $F(g)\circ F(f)$).

**Named examples**: a **forgetful functor** (e.g. $U:\mathbf{Grp}\to\mathbf{Set}$) sends a group to its underlying set (forgetting the group operation) and sends a group homomorphism to the "same" function, now just viewed as a function of sets (forgetting that it preserves the operation). A **free functor** (e.g. $F:\mathbf{Set}\to\mathbf{Grp}$) goes the opposite direction, building the "most general possible" group generated freely by a given set's elements, with no relations beyond the group axioms themselves.

## Component 4 — Worked Examples

**Example 1 (LO1 — verifying the preservation laws concretely)**: Consider the forgetful functor $U:\mathbf{Grp}\to\mathbf{Set}$. Take groups $A=(\mathbb{Z},+)$, $B=(\mathbb{Z}/6\mathbb{Z},+)$, and the homomorphism $\phi(n)=n\bmod6$. $U(A)=\mathbb{Z}$ (as a bare set), $U(B)=\mathbb{Z}/6\mathbb{Z}$ (as a bare set), $U(\phi)=\phi$ (the exact same function, just no longer required to respect $+$). Check composition preservation with a second homomorphism $\psi:\mathbb{Z}/6\mathbb{Z}\to\mathbb{Z}/2\mathbb{Z}$, $\psi(n)=n\bmod2$: $U(\psi\circ\phi) = \psi\circ\phi$ (as bare functions) $= U(\psi)\circ U(\phi)$ — trivially true here, since $U$ doesn't actually change any function, only reinterprets its type. Check identity preservation: $U(1_A)$ (the identity homomorphism on $\mathbb{Z}$) is $1_{U(A)}$ (the identity function on the bare set $\mathbb{Z}$) — again trivially true.

**Example 2 (LO2 — a contravariant functor, breaking MC-1)**: The **dual space functor** (in $\mathbf{Vect}_k$) sends a vector space $V$ to its dual space $V^*$ (linear functionals $V\to k$), and sends a linear map $T:V\to W$ to its **dual map** $T^*:W^*\to V^*$ (note the direction reversal!) defined by $T^*(\phi) = \phi\circ T$ for $\phi\in W^*$. If $S:U\to V$ and $T:V\to W$, then $(T\circ S)^* = S^*\circ T^*$ — the composite's dual reverses the ORDER, exactly the contravariant composition law, not $T^*\circ S^*$ as a naive covariant guess would suggest.

**Example 3 (LO3 — linear maps as a functor's morphism-level action)**: The identity functor $\mathrm{id}_{\mathbf{Vect}_k}:\mathbf{Vect}_k\to\mathbf{Vect}_k$ trivially sends each vector space to itself and each linear map to itself, and preserves composition/identity trivially — establishing that the category $\mathbf{Vect}_k$ (whose morphisms ARE linear maps, per `math.linalg.linear-map`) always admits at least this one functor to itself, the baseline every more interesting functor is compared against.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Two-Piece Definition, Grounded in the Forgetful Functor (Primitive P11: Representation Shift)

Recall the four category ingredients from `math.cat.category`. State: "a functor maps ONE category's objects-and-morphisms structure to ANOTHER category's — but it can't just move things around randomly; it has to respect how composition and identity work in both categories." Work Example 1's forgetful functor $U:\mathbf{Grp}\to\mathbf{Set}$ concretely, showing both the object map (group ↦ its underlying set) and morphism map (homomorphism ↦ the same function, type reinterpreted), then verify both preservation laws hold (trivially, since $U$ doesn't change any actual function, only "forgets" which functions were required to be homomorphisms).

- **MC-1 hook**: present the dual-space functor's action on a composite $T\circ S$ (Example 2) and ask "what should $(T\circ S)^*$ equal — $S^*\circ T^*$ or $T^*\circ S^*$?" — an answer of $T^*\circ S^*$ (naively preserving the original order) reveals MC-1 (assuming all functors are covariant and preserve composition order, not recognizing contravariant functors reverse it).

### Teaching Action A02 — Covariant vs. Contravariant, and Forgetful vs. Free (Primitive P06: Contrast Pair)

**Contrast 1 (targets MC-1)**: Place the forgetful functor's composition law (Example 1, order preserved: $U(g\circ f)=U(g)\circ U(f)$) directly beside the dual-space functor's (Example 2, order reversed: $(T\circ S)^*=S^*\circ T^*$). State the rule precisely: "covariant: same order. Contravariant: swap the order AND swap the arrow direction — these two reversals always come together, never one without the other."

**Contrast 2 (targets MC-2, forgetful vs. free as opposite directions)**: Contrast the forgetful functor $U:\mathbf{Grp}\to\mathbf{Set}$ (loses information — many different groups can share the same underlying set, so you can't reconstruct the group from $U$'s output alone) with the free functor $F:\mathbf{Set}\to\mathbf{Grp}$ (adds structure — builds the freest possible group generated by a set's elements, with no assumed relations). Ask: "does applying the forgetful functor then the free functor get you back where you started?" (Generally no — $F(U(G))$ is typically a much bigger, "freer" group than $G$ itself, since $U$ discarded $G$'s specific relations and $F$ only reconstructs the most general possible structure, not the original one.) This directly targets the assumption that "undoing" a structure-forgetting functor with a structure-adding functor recovers the original object.

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Verify that the forgetful functor $U:\mathbf{Top}\to\mathbf{Set}$ (sending a topological space to its underlying set, and a continuous map to the same function) satisfies the identity-preservation law explicitly.
  2. For a contravariant functor $F$ with $F(g\circ f)=F(f)\circ F(g)$, and given morphisms $f:A\to B$, $g:B\to C$, $h:C\to D$, write out (in the correct reversed order) what $F(h\circ g\circ f)$ equals in terms of $F(f),F(g),F(h)$.
  3. Explain, using the free-group-on-a-set idea, why $F(U(G))$ is generally NOT isomorphic to the original group $G$ for a forgetful functor $U$ followed by a free functor $F$.
  4. A student claims "every functor between categories with the same kind of objects must be covariant." Give a reason this claim is false, referencing the dual-space functor example.
- **P76 (Transfer Probe, mode = cross-link probe against `math.linalg.linear-map`)**: "Recall from your `math.linalg.linear-map` lesson that a linear map $T:V\to W$ satisfies $T(u+v)=T(u)+T(v)$ and $T(cv)=cT(v)$, and is the morphism type for the category $\mathbf{Vect}_k$. Using THIS lesson's functor framework: (a) verify that the identity assignment (sending each vector space to itself and each linear map to itself) satisfies both functor preservation laws trivially, confirming $\mathbf{Vect}_k$ has (at minimum) its own identity functor. (b) The forgetful functor $U:\mathbf{Vect}_k\to\mathbf{Set}$ sends a vector space to its underlying set and a linear map to the same function, now viewed as an ordinary set function (forgetting linearity). Using that lesson's own non-example — a function like $\psi(x)=x^2$ that is NOT linear — explain why $\psi$ is a perfectly valid morphism in the TARGET category $\mathbf{Set}$ after applying $U$'s object map to $V=W=\mathbb{R}$, even though $\psi$ itself was never a valid $\mathbf{Vect}_{\mathbb{R}}$-morphism to begin with (i.e., $\psi$ was never actually in the image of $U$'s morphism map — this is a subtlety about what $U$ CAN produce, not a violation of $U$'s functor laws). *Component 7 note: `math.abst.group-homomorphism`, this concept's other named cross-link, is not yet authored, so this probe uses only the authored `math.linalg.linear-map` connection.*"
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | CONTRAVARIANT-COMPOSITION-ORDER-NOT-REVERSED | Assuming all functors preserve composition order like covariant functors, not recognizing contravariant functors reverse both arrow direction and composition order together | Foundational |
| MC-2 | FORGETFUL-THEN-FREE-ASSUMED-IDENTITY | Believing applying a forgetful functor followed by a free functor (or vice versa) recovers the original object, rather than recognizing genuine information loss/addition occurs | Moderate |
| MC-3 | FUNCTOR-ASSUMED-TO-PRESERVE-ALL-PROPERTIES | Believing a functor automatically preserves every property of objects/morphisms (e.g. injectivity, surjectivity) rather than only composition and identity specifically | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Contravariant Order Not Reversed") → P41 (detect: ask for $(T\circ S)^*$ in terms of $S^*, T^*$ for the dual-space functor, checking if order is preserved instead of reversed) → P64 (conceptual shift: re-derive directly from the dual map's defining formula, $T^*(\phi)=\phi\circ T$, tracing through a specific composite explicitly).
- **B02 (targets MC-2)**: P27 (name it: "Forgetful/Free Round-Trip Assumption") → P41 (detect: ask whether $F(U(G))\cong G$ for a specific group $G$ with nontrivial relations, like $\mathbb{Z}/6\mathbb{Z}$) → P64 (conceptual shift: re-anchor on "the free functor only knows the SET it's given — it has no way to know $G$'s original relations were ever there, since $U$ discarded them").
- **B03 (targets MC-3)**: P27 (name it: "Functor Preserves-Everything Overgeneralization") → P41 (detect: ask whether a functor must send an injective morphism to an injective morphism) → P64 (conceptual shift: re-anchor on the precise definition — only composition and identity are guaranteed preserved; other properties may or may not transfer, and require separate proof if claimed).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.cat.category` (the source and target categories, and their composition/identity structure, that a functor must respect).
- **Unlocks**: `math.cat.natural-transformation` (a natural transformation is a morphism BETWEEN functors — functors are the essential prerequisite objects), `math.cat.adjunction` (adjunctions are pairs of functors with a specific relationship, generalizing the forgetful/free pair introduced here).
- **Cross-link**: KG lists `math.abst.group-homomorphism` and `math.linalg.linear-map` as cross-links. Verified via directory listing that `math.abst.group-homomorphism` is **not yet authored**, while `docs/curriculum/blueprints/math.linalg.linear-map.md` **is already authored**. Per the established P76_mode rule (applied per-target when cross-links are mixed status, a first for this corpus), this blueprint uses a genuine **cross-link probe** against the authored target only — directly reusing that blueprint's linearity definition and its non-example ($\psi(x)=x^2$) to illustrate the forgetful functor's action on $\mathbf{Vect}_k$. A future revision, once `math.abst.group-homomorphism` is authored, may add a second cross-link probe connecting this concept's forgetful/free functor pair directly to the group-homomorphism-based examples ($\mathbf{Grp}\to\mathbf{Set}$) already used informally in this blueprint's own Examples 1 and Teaching Notes.

## Component 8 — Teaching Notes

- estimated_hours = 5 with an expert/apply tag places this at the "2 main TAs + gate" tier — A01 (the two-piece definition grounded in the forgetful functor) and A02 (covariant/contravariant contrast plus forgetful/free contrast) jointly cover all three LOs, appropriate for this domain's established sizing pattern.
- This is the first blueprint in the corpus with a MIXED cross-link status (one target authored, one not) — rather than defaulting the whole blueprint to independence mode because not ALL targets are ready, this blueprint treats each cross-link target independently, writing a genuine cross-link probe against the one that IS ready (`math.linalg.linear-map`) while explicitly noting the other's absence — establishing a refined version of the P76_mode rule for future multi-cross-link concepts.
- The dual-space functor (Example 2) was chosen as the contravariant example specifically because it builds on `math.linalg.linear-map`'s own vocabulary (linear maps, vector spaces) already available from this same authoring pass, keeping the entire blueprint's example set within one consistent, previously-established mathematical world rather than introducing an unrelated new domain just for the contravariant case.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.cat.category`) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (mixed: one absent, one present → cross-link probe against the present one) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe against authored target) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract, grounded directly in category examples) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
