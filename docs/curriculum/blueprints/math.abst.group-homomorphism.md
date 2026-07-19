# Teaching Blueprint: Group Homomorphism (`math.abst.group-homomorphism`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.abst.group-homomorphism` |
| name | Group Homomorphism |
| domain | Abstract Algebra |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.9 → MAMR = ⌈0.9×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.abst.group-theory` |
| unlocks | `math.abst.group-isomorphism`, `math.abst.first-isomorphism-theorem` |
| cross_links | `math.linalg.linear-map` (**authored** — verified via `ls`; P76_mode = cross-link probe, see Component 7) |
| CPA_entry_stage | A (Abstract) — direct definition, grounded immediately in a concrete group example |
| description (KG) | A map φ:G→H with φ(ab)=φ(a)φ(b). Preserves group structure. ker(φ) = {g∈G : φ(g)=eH} is a normal subgroup of G. im(φ) is a subgroup of H. |

## Component 1 — Learning Objectives

- LO1: Define a **group homomorphism** $\varphi:G\to H$ as a map satisfying $\varphi(ab)=\varphi(a)\varphi(b)$ for all $a,b\in G$ (using $G$'s operation on the left, $H$'s operation on the right), and verify this property directly for a given map.
- LO2: Define the **kernel** $\ker(\varphi)=\{g\in G : \varphi(g)=e_H\}$ and the **image** $\mathrm{im}(\varphi)=\{\varphi(g):g\in G\}$, compute both for a specific homomorphism, and state (without full proof) that $\ker(\varphi)$ is always a **normal subgroup** of $G$ while $\mathrm{im}(\varphi)$ is always a subgroup of $H$.
- LO3: Correctly verify that $\varphi(e_G)=e_H$ and $\varphi(g^{-1})=\varphi(g)^{-1}$ are **automatic consequences** of the single defining property $\varphi(ab)=\varphi(a)\varphi(b)$ — not separate conditions requiring independent verification — and use the kernel to determine whether a homomorphism is **injective** (trivial kernel $\{e_G\}$ iff injective).

## Component 2 — Prerequisite Check

Assumes mastery of `math.abst.group-theory` (the group axioms; identity, inverses).

## Component 3 — Core Explanation

A **group homomorphism** $\varphi:G\to H$ (between groups $G,H$) is a map satisfying:
$$\varphi(ab) = \varphi(a)\varphi(b) \quad \text{for all } a,b\in G$$
(the product on the left is computed in $G$; the product on the right is computed in $H$) — a homomorphism "preserves the group operation," translating a computation in $G$ into the corresponding computation in $H$.

**Automatic consequences** (NOT separate axioms to check): from $\varphi(ab)=\varphi(a)\varphi(b)$ alone:
- $\varphi(e_G)=e_H$: since $\varphi(e_G)=\varphi(e_Ge_G)=\varphi(e_G)\varphi(e_G)$, and canceling $\varphi(e_G)$ from both sides (valid in the group $H$) gives $e_H=\varphi(e_G)$.
- $\varphi(g^{-1})=\varphi(g)^{-1}$: since $\varphi(g)\varphi(g^{-1})=\varphi(gg^{-1})=\varphi(e_G)=e_H$, so $\varphi(g^{-1})$ IS the inverse of $\varphi(g)$ in $H$, by the uniqueness of inverses.

**Kernel and image**: $\ker(\varphi)=\{g\in G:\varphi(g)=e_H\}$ (everything mapping to the identity) is always a **normal subgroup** of $G$ (a fact stated here, proof deferred to the normal-subgroup context). $\mathrm{im}(\varphi)=\{\varphi(g):g\in G\}\subseteq H$ is always a **subgroup** of $H$ (its own group under $H$'s operation, restricted to just the image).

**Kernel determines injectivity**: $\varphi$ is **injective** (one-to-one) **iff** $\ker(\varphi)=\{e_G\}$ (the TRIVIAL kernel, containing only the identity). This gives a practical, efficient test: to check injectivity, find ALL elements mapping to $e_H$ — if only $e_G$ does, $\varphi$ is injective; if anything else also maps to $e_H$, it isn't.

## Component 4 — Worked Examples

**Example 1 (LO1 — verifying the homomorphism property)**: Let $\varphi:(\mathbb{Z},+)\to(\mathbb{Z}/6\mathbb{Z},+)$, $\varphi(n)=n\bmod6$. Verify $\varphi(a+b)=\varphi(a)+\varphi(b)$ for $a=8,b=5$: $\varphi(8+5)=\varphi(13)=13\bmod6=1$. Separately: $\varphi(8)+\varphi(5) = (8\bmod6)+(5\bmod6) = 2+5=7\equiv1\pmod6$. Both sides give 1 — confirmed.

**Example 2 (LO2/LO3 — kernel and image, injectivity test, breaking MC-1)**: For the same $\varphi(n)=n\bmod6$: $\ker(\varphi)=\{n\in\mathbb{Z} : n\bmod6=0\}=6\mathbb{Z}=\{\ldots,-12,-6,0,6,12,\ldots\}$ — NOT just $\{0\}$! Since $\ker(\varphi)\neq\{0\}$ (it contains 6, for instance, and $6\neq0$ but $\varphi(6)=0=\varphi(0)$), $\varphi$ is **NOT injective** — confirmed directly: $\varphi(0)=0$ and $\varphi(6)=0$ too, two different inputs mapping to the same output. $\mathrm{im}(\varphi) = \mathbb{Z}/6\mathbb{Z}$ (the entire target, since every residue is achieved) — $\varphi$ IS surjective, just not injective.

**Example 3 (LO3 — automatic consequences verified directly)**: For the same $\varphi$, verify $\varphi(e_G)=e_H$: $e_G=0$ (additive identity in $\mathbb{Z}$), $\varphi(0)=0\bmod6=0=e_H$ (additive identity in $\mathbb{Z}/6\mathbb{Z}$) ✓. Verify $\varphi(g^{-1})=\varphi(g)^{-1}$ for $g=4$ (so $g^{-1}=-4$ additively): $\varphi(-4) = -4\bmod6 = 2$ (since $-4=6(-1)+2$). Separately: $\varphi(4)=4$, and its additive inverse in $\mathbb{Z}/6\mathbb{Z}$ is $-4\bmod6=2$ — matches $\varphi(-4)=2$ exactly, confirming the automatic consequence held without any separate verification effort beyond the basic homomorphism property.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Homomorphism Property, and Its Automatic Consequences (Primitive P11: Representation Shift)

State the defining property directly: "a homomorphism translates group operations correctly — do the operation in $G$ then map, or map then do the operation in $H$; either order gives the same result." Work Example 1's direct verification.

Shift representation to the automatic consequences: derive $\varphi(e_G)=e_H$ and $\varphi(g^{-1})=\varphi(g)^{-1}$ algebraically from the single defining property (Component 3's derivations), then work Example 3's concrete numerical confirmation.

- **MC-1 hook**: present Example 2's kernel $\ker(\varphi)=6\mathbb{Z}$ (containing 6, not just 0) and ask "since $\varphi(0)=0=e_H$, is $\{0\}$ the whole kernel?" — an answer of "yes" (assuming the kernel only ever contains the identity) reveals MC-1 (believing the kernel is automatically trivial, rather than checking directly which elements genuinely map to $e_H$).

### Teaching Action A02 — Kernel Determines Injectivity, Not Assumed Trivial (Primitive P06: Contrast Pair)

**Contrast 1 (targets MC-1)**: Work Example 2's full kernel computation ($6\mathbb{Z}$, genuinely NOT just $\{0\}$) directly beside a hypothetical injective homomorphism's kernel (which WOULD be exactly $\{0\}$) — state the rule: "the kernel always contains $e_G$ (a consequence of $\varphi(e_G)=e_H$, already established) — but whether it contains ANYTHING ELSE is a genuine, separate question requiring direct computation, not an assumption."

**Contrast 2**: Connect the kernel-size finding directly to injectivity: "$\ker(\varphi)=\{e_G\}$ (trivial) $\iff$ $\varphi$ is injective. Here, since $\ker(\varphi)=6\mathbb{Z}\neq\{0\}$, $\varphi$ is genuinely NOT injective — confirmed directly by finding two different inputs (0 and 6) mapping to the same output (0), exactly as the kernel test predicted."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. For $\varphi:(\mathbb{Z},+)\to(\mathbb{Z}/4\mathbb{Z},+)$, $\varphi(n)=n\bmod4$, verify $\varphi(6+3)=\varphi(6)+\varphi(3)$ directly.
  2. Find $\ker(\varphi)$ for the map in problem 1, and use it to determine whether $\varphi$ is injective.
  3. For $\psi:(\mathbb{R},+)\to(\mathbb{R}^+,\times)$, $\psi(x)=e^x$ (a homomorphism from additive reals to multiplicative positive reals), verify $\psi(e_G)=e_H$ directly (i.e., confirm $\psi(0)=1$).
  4. Explain why $\varphi(g^{-1})=\varphi(g)^{-1}$ is an AUTOMATIC consequence of the homomorphism property, rather than something requiring separate verification for each homomorphism encountered.
- **P76 (Transfer Probe, mode = cross-link probe against `math.linalg.linear-map`)**: "Recall from your `math.linalg.linear-map` lesson that a linear map $T:V\to W$ satisfies $T(u+v)=T(u)+T(v)$ (additivity) and $T(cv)=cT(v)$ (homogeneity), and that this concept was described there as related to, but not fully explained as, a special case of a more general structure-preserving-map idea. (a) Using THIS lesson's group homomorphism definition, verify that $T$'s additivity property, $T(u+v)=T(u)+T(v)$, is EXACTLY the group homomorphism property $\varphi(ab)=\varphi(a)\varphi(b)$, applied to the additive groups $(V,+)$ and $(W,+)$ specifically (i.e., a linear map's underlying additive structure makes it, in particular, a group homomorphism between the vector spaces' additive groups). (b) Explain what ADDITIONAL property (homogeneity, $T(cv)=cT(v)$) a linear map has that a general group homomorphism between $(V,+)$ and $(W,+)$ is NOT required to have — i.e., why every linear map is a group homomorphism (of the additive groups), but not every group homomorphism between two vector spaces' additive groups is necessarily a linear map."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | KERNEL-ASSUMED-TRIVIAL-WITHOUT-CHECKING | Believing the kernel automatically contains only the identity element, without directly computing which elements genuinely map to $e_H$ | Foundational |
| MC-2 | AUTOMATIC-CONSEQUENCES-TREATED-AS-SEPARATE-AXIOMS | Believing $\varphi(e_G)=e_H$ and $\varphi(g^{-1})=\varphi(g)^{-1}$ are separate conditions that must be independently verified for each homomorphism, rather than automatic consequences of the single defining property | Moderate |
| MC-3 | HOMOMORPHISM-ASSUMED-BIJECTIVE-BY-DEFAULT | Believing every homomorphism is automatically bijective (both injective and surjective), rather than recognizing a homomorphism can be neither, either, or both | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Kernel Assumed Trivial") → P41 (detect: present the mod-6 reduction homomorphism and ask if its kernel is just $\{0\}$ without computing) → P64 (conceptual shift: work through the direct computation, finding $\ker(\varphi)=6\mathbb{Z}$, a genuinely larger set).
- **B02 (targets MC-2)**: P27 (name it: "Automatic Consequences Treated as Separate Axioms") → P41 (detect: ask a student to verify $\varphi(g^{-1})=\varphi(g)^{-1}$ "from scratch" for a new homomorphism, checking whether they recognize it follows automatically) → P64 (conceptual shift: re-derive the general algebraic argument from Component 3, showing it holds for ANY homomorphism, not needing separate proof each time).
- **B03 (targets MC-3)**: P27 (name it: "Homomorphism Assumed Bijective") → P41 (detect: present the mod-6 reduction homomorphism, confirmed non-injective, and ask if it's still "a valid homomorphism") → P64 (conceptual shift: re-anchor on "homomorphism only requires preserving the operation — bijectivity is a SEPARATE, additional property (defining an isomorphism specifically), never automatic").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.abst.group-theory` (the group axioms this concept's structure-preserving maps operate between).
- **Unlocks**: `math.abst.group-isomorphism` (an isomorphism is a BIJECTIVE homomorphism — this concept's kernel/injectivity machinery is the direct prerequisite tool), `math.abst.first-isomorphism-theorem` (relates $\ker(\varphi)$, $\mathrm{im}(\varphi)$, and cosets in a single unifying structural theorem).
- **Cross-link**: KG lists `math.linalg.linear-map` as a cross-link. Verified via directory listing that `docs/curriculum/blueprints/math.linalg.linear-map.md` **is already authored** (confirmed: additivity $T(u+v)=T(u)+T(v)$ and homogeneity $T(cv)=cT(v)$). The P76 transfer probe above directly requires the learner to recognize a linear map's additivity as exactly a group homomorphism property applied to the additive groups $(V,+),(W,+)$, and to articulate homogeneity as the genuinely ADDITIONAL structure a linear map carries beyond bare group homomorphism — closing the loop that `math.linalg.linear-map`'s own Teaching Notes left open (that blueprint noted this connection was not yet formally available since this concept wasn't authored at the time).

## Component 8 — Teaching Notes

- estimated_hours = 4 with an advanced/apply tag places this at the "2 main TAs + gate" tier — A01 (the homomorphism property and its automatic consequences) and A02 (kernel-determines-injectivity, correcting the trivial-kernel assumption) jointly cover all three LOs.
- MC-1 (kernel assumed trivial without checking) was made this blueprint's central focus because $\varphi(e_G)=e_H$ (always true) can be easily over-extended into "so the kernel is JUST $\{e_G\}$" — Example 2's mod-6 reduction map was deliberately chosen as a familiar, easily-verified case where the kernel is genuinely much larger, making the distinction between "$e_G$ is always in the kernel" and "the kernel is ONLY $e_G$" concrete and checkable.
- The cross-link probe to `math.linalg.linear-map` was specifically designed to complete a connection that concept's own Teaching Notes explicitly flagged as pending (that blueprint's Component 7 notes this concept, `math.abst.group-homomorphism`, was not yet authored at the time, deferring the connection) — this is a rare instance in the corpus of a cross-link probe closing a loop the EARLIER blueprint itself anticipated and named in advance.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.abst.group-theory`) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.linalg.linear-map` confirmed present → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe, genuine additivity/homogeneity connection) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.9×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract, grounded directly in a concrete group example) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2/LO3, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
