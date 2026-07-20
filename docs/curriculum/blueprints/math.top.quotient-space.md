# Teaching Blueprint: Quotient Space (`math.top.quotient-space`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.top.quotient-space` |
| name | Quotient Space |
| domain | Topology |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.65 → MAMR = ⌈0.65×5⌉ = 4/5 |
| estimated_hours | 6 |
| requires | `math.top.topological-space`, `math.found.equivalence-relation` |
| unlocks | none |
| cross_links | `math.abst.quotient-group` (authored earlier — see Component 7) |
| CPA_entry_stage | C (Concrete) — constructing the circle by gluing interval endpoints before naming the general quotient topology |
| description (KG) | Given $f:X\to Y$, the quotient topology on $Y$ is the FINEST topology making $f$ continuous. Examples: circle $S^1=[0,1]$ with endpoints identified; torus = square with edges identified. Constructs new spaces from old by gluing. |

## Component 1 — Learning Objectives

- LO1: Define the quotient topology on $Y$ (given a surjective $f:X\to Y$) as the FINEST topology making $f$ continuous — a set $U\subseteq Y$ is open iff $f^{-1}(U)$ is open in $X$ — recognizing this as building a NEW topological space FROM an existing one (`math.top.topological-space`'s own open-set axioms), governed by which subsets $f$ "sees" as open through its preimages.
- LO2: Recognize $f$ as typically arising from `math.found.equivalence-relation`'s own equivalence classes: $Y=X/\!\sim$ (the set of equivalence classes) with $f(x)=[x]$ the natural quotient map — "gluing together" points identified by $\sim$, and construct the CIRCLE $S^1=[0,1]/\!\sim$ (identifying $0\sim1$) as a concrete instance.
- LO3 (orientation level — full universal-property/algebraic-topology-connection deferred): recognize, without full derivation, that `math.abst.quotient-group`'s own $G/N$ construction is a STRUCTURAL ANALOGUE of this topological quotient — both "collapse" equivalent elements to a single point/class via a natural surjection, and both are characterized by a UNIVERSAL PROPERTY (finest/largest structure making the natural map well-behaved) — previewing that "quotient" is one recurring construction pattern across different mathematical categories, not independently invented each time.

## Component 2 — Prerequisite Check

Assumes mastery of `math.top.topological-space` (a set $X$ with open sets $\tau$ satisfying the union/intersection axioms) and `math.found.equivalence-relation` (reflexive, symmetric, transitive; partitioning a set into equivalence classes).

## Component 3 — Core Explanation

**The quotient topology is the FINEST topology on $Y$ making $f$ continuous — built from $X$'s own open sets**: `math.top.topological-space` already established what a topology (collection of open sets) must satisfy. Given a SURJECTIVE map $f:X\to Y$, the quotient topology DEFINES $U\subseteq Y$ to be open PRECISELY when $f^{-1}(U)$ is open in $X$ — this is the LARGEST (finest) collection of open sets on $Y$ for which $f$ is guaranteed continuous, since continuity REQUIRES $f^{-1}(U)$ open for every open $U$, and this definition takes exactly as many $U$'s as that requirement allows.

**Quotient spaces typically arise from equivalence relations, gluing points together**: `math.found.equivalence-relation`'s own equivalence classes partition $X$ into disjoint pieces; setting $Y=X/\!\sim$ (the SET of equivalence classes) and $f(x)=[x]$ (sending each point to its own class) gives the NATURAL quotient map. The quotient TOPOLOGY on $Y=X/\!\sim$ then makes precise, topologically, the informal idea of "gluing together" all points in the same equivalence class into a single point of $Y$ — e.g. identifying the two ENDPOINTS of $[0,1]$ (setting $0\sim1$) glues them into one point, producing the CIRCLE $S^1$.

**Quotient groups are a structural analogue — the same "collapse via universal property" pattern, in a different category (orientation level)**: `math.abst.quotient-group`'s $G/N$ construction ALSO collapses elements (those differing by an element of $N$) into single classes, via a natural surjection $G\to G/N$ — and, analogously to this concept's "finest topology making $f$ continuous," the quotient group is characterized by its OWN universal property (any homomorphism killing $N$ factors uniquely through $G/N$). This is not a coincidental terminological overlap: "quotient" names ONE recurring construction pattern — collapse via an equivalence relation, characterized by a universal property — appearing across topology, group theory, and elsewhere in mathematics, applied to whatever structure is relevant in each setting. Full development of this universal-property connection across categories is deferred beyond this concept's core scope.

## Component 4 — Worked Examples

**Example 1 (LO1 — verifying the quotient topology via preimages, breaking MC-1)**: for $f:[0,1]\to S^1$ (mapping $t\mapsto(\cos2\pi t,\sin2\pi t)$, identifying $0$ and $1$ to the same point): a set $U\subseteq S^1$ containing the "glued" point (corresponding to both $0$ and $1$) is OPEN in the quotient topology if and only if $f^{-1}(U)$ — which must include a NEIGHBORHOOD of BOTH $0$ AND $1$ in $[0,1]$ (since both map into $U$) — is open in $[0,1]$. This means $U$ must look like a small arc straddling the glued point on BOTH sides (both the $t$-near-$0$ side and the $t$-near-$1$ side), confirming the quotient topology genuinely encodes the "wraparound" gluing, not merely inheriting $[0,1]$'s topology naively.

**Example 2 (LO2 — the circle as a concrete equivalence-relation quotient, breaking MC-2)**: define $\sim$ on $[0,1]$ by $x\sim y$ iff $x=y$ OR $\{x,y\}=\{0,1\}$ (identifying exactly the two endpoints, otherwise every point is its own class) — a genuine `math.found.equivalence-relation` (reflexive, symmetric, transitive, easily checked). The quotient set $[0,1]/\!\sim$ has EXACTLY one class containing both $0$ and $1$ (call it $[0]=[1]$), and every other point $t\in(0,1)$ forms its own singleton class. Equipping $[0,1]/\!\sim$ with the quotient topology from the natural map $f(t)=[t]$ produces EXACTLY the circle $S^1$ — a concrete, fully specified instance of Component 3's general "gluing" construction.

**Example 3 (LO3, orientation level — the structural parallel with quotient groups, breaking MC-3)**: for $\mathbb{Z}/6\mathbb{Z}$ (`math.abst.quotient-group`'s own construction, with $N=6\mathbb{Z}$): the natural surjection $\mathbb{Z}\to\mathbb{Z}/6\mathbb{Z}$ COLLAPSES all integers differing by a multiple of $6$ into a single class — structurally the SAME pattern as Example 2's circle construction collapsing $0$ and $1$ into one point. Both constructions: (a) start with an equivalence relation on the original structure, (b) form the quotient by taking equivalence classes as the new elements, (c) equip the quotient with the "best" structure (finest topology / well-defined group operation) making the natural map behave correctly. The SPECIFIC details differ (topological open sets vs. group operations), but the ORGANIZING PATTERN — collapse via equivalence, characterize by a universal property — is genuinely the same across both settings.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Quotient Topology Is Defined by What f "Sees" Through Preimages (Primitive P11: Representation Shift)

State: "you're not inventing a new topology from scratch — the quotient topology is EXACTLY determined by which sets $U$ have open preimage under $f$, the largest such collection that keeps $f$ continuous." Walk Example 1's direct verification of which sets around the glued point are open in $S^1$.

- **MC-1 hook**: ask "is the quotient topology on $Y$ chosen somewhat freely, as long as it's a valid topology in `math.top.topological-space`'s sense, rather than being fully determined by $f$'s preimages?" — a "yes" answer reveals MC-1 (missing that the quotient topology is PRECISELY determined — the finest topology making $f$ continuous, via the preimage condition).

### Teaching Action A02 — The Circle Is a Fully Concrete, Specifiable Equivalence-Relation Quotient (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: the equivalence relation identifying ONLY $0$ and $1$ was explicitly checked (reflexive, symmetric, transitive), and the resulting quotient space was shown to be EXACTLY $S^1$, not merely "something circle-like." State: "'gluing the endpoints of an interval' isn't a vague informal picture — it's a fully specifiable equivalence relation, and the quotient construction turns that specification into an actual, precisely-defined topological space."

- **MC-2 hook**: ask "is 'the circle as $[0,1]$ with endpoints identified' merely an informal, intuitive picture, rather than a mathematically precise construction built from an actual equivalence relation and quotient topology?" — a "yes" answer reveals MC-2 (missing that this is a fully precise construction, built explicitly from `math.found.equivalence-relation`'s own machinery).

### Teaching Action A03 — Quotient Groups and Quotient Spaces Share a Genuine Organizing Pattern (Primitive P06: Contrast Pair)

Contrast the topological quotient (Example 2, gluing via open-set preimages) against the group-theoretic quotient (Example 3, $\mathbb{Z}/6\mathbb{Z}$, collapsing via a well-defined operation) — different specific mechanisms, same organizing pattern. State: "'quotient' isn't a coincidental shared word between topology and group theory — both constructions collapse elements via an equivalence relation and characterize the result by a universal property, just instantiated in different mathematical categories."

- **MC-3 hook**: ask "is the word 'quotient' in 'quotient space' and 'quotient group' a coincidental terminological overlap between two fundamentally unrelated constructions?" — a "yes" answer reveals MC-3 (missing that both instantiate the same collapse-via-equivalence-relation, universal-property-characterized construction pattern).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. State the precise condition for $U\subseteq Y$ to be open in the quotient topology induced by $f:X\to Y$.
  2. Define an equivalence relation on the unit square $[0,1]\times[0,1]$ that identifies opposite edges (both pairs), and state what familiar surface the resulting quotient space is (the torus).
  3. Verify that "identify $0$ and $1$ in $[0,1]$" satisfies all three equivalence-relation properties (reflexive, symmetric, transitive).
  4. Explain, in one or two sentences, the structural parallel between forming a quotient space and forming a quotient group.
- **P76 (Transfer Probe, mode = cross-link probe engaging `math.abst.quotient-group`)**: "A topologist wants to construct the Möbius strip by taking a rectangle $[0,1]\times[0,1]$ and identifying $(0,y)$ with $(1,1-y)$ for each $y$ (a 'twisted' gluing of one pair of opposite edges). (a) Explain why this identification defines a genuine equivalence relation on the rectangle, citing `math.found.equivalence-relation`'s three properties. (b) Describe, in terms of preimages under the natural quotient map, what it would mean for a set $U$ in the resulting quotient space to be open. (c) A student familiar with `math.abst.quotient-group`'s $G/N$ construction asks whether this topological gluing is 'the same kind of thing' as forming a quotient group — using the universal-property parallel from Example 3, explain in what sense they ARE structurally analogous, and in what sense they remain genuinely different constructions (different categories, different specific mechanisms)."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | QUOTIENT-TOPOLOGY-ASSUMED-FREELY-CHOSEN | Believing the quotient topology is chosen somewhat freely as long as it's a valid topology, missing that it is precisely determined by $f$'s preimages | Foundational |
| MC-2 | GLUING-ASSUMED-MERELY-INFORMAL | Believing "gluing endpoints" descriptions like the circle construction are only informal pictures, missing that they are fully precise equivalence-relation-based constructions | High |
| MC-3 | QUOTIENT-TERMINOLOGY-ASSUMED-COINCIDENTAL | Believing "quotient" in quotient space and quotient group is a coincidental shared word between unrelated constructions, missing the shared collapse-via-equivalence, universal-property pattern | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Quotient Topology Assumed Freely Chosen") → P41 (detect: ask whether the quotient topology is chosen somewhat freely) → P64 (conceptual shift: re-walk Example 1's preimage-based verification, re-anchoring on "precisely determined by $f$'s preimages").
- **B02 (targets MC-2)**: P27 (name it: "Gluing Assumed Merely Informal") → P41 (detect: ask whether "gluing" descriptions are only informal pictures) → P64 (conceptual shift: re-walk Example 2's explicit equivalence-relation verification for the circle, re-anchoring on "fully precise, equivalence-relation-based constructions").
- **B03 (targets MC-3)**: P27 (name it: "Quotient Terminology Assumed Coincidental") → P41 (detect: ask whether "quotient" is a coincidental shared term) → P64 (conceptual shift: re-walk Example 3's structural parallel with $\mathbb{Z}/6\mathbb{Z}$, re-anchoring on "the same collapse-via-equivalence, universal-property pattern").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.top.topological-space` (the open-set axioms this concept's quotient topology satisfies, built from $X$'s own topology) and `math.found.equivalence-relation` (the reflexive/symmetric/transitive relation typically underlying the quotient map $f$).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.abst.quotient-group`, checked via `ls docs/curriculum/blueprints/` and confirmed ALREADY authored. $P76_{mode}=$ **cross-link probe**, engaging `math.abst.quotient-group`'s own $G/N$ construction directly in Component 3's structural-parallel argument and the P76 transfer probe.

## Component 8 — Teaching Notes

- estimated_hours = 6 with an expert/apply tag and a notably reduced mastery_threshold (0.65, MAMR 4/5) supports the "3 TAs + gate" tier at genuinely demanding scope, with LO1 and LO2 given full concrete construction (the preimage verification and the fully explicit circle equivalence relation) and LO3 kept orientation-level, appropriately surveying the universal-property parallel with quotient groups without formalizing universal properties across categories.
- **Division of labor**: `math.top.topological-space` owns the general open-set axioms; `math.found.equivalence-relation` owns the general equivalence-relation machinery. This concept owns COMBINING these into the quotient-topology construction — deliberately using the circle $S^1=[0,1]/\!\sim$ throughout Examples 1–2 as one continuous, fully worked construction (first verifying openness via preimages, then verifying the underlying equivalence relation explicitly), before Example 3 deliberately switches domains (to $\mathbb{Z}/6\mathbb{Z}$) to make the cross-category structural parallel concrete rather than asserted abstractly.
- Example 2's deliberate choice to write out the FULL equivalence relation explicitly (rather than leaving "identify the endpoints" as an informal description) was chosen specifically to counter MC-2 as directly as possible — showing precisely what "gluing" means as a formal mathematical object.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.abst.quotient-group` confirmed authored → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.65×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: constructing the circle by gluing interval endpoints precedes the general quotient topology definition) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
