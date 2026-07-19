# Teaching Blueprint: Galois Theory (`math.abst.galois-theory`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.abst.galois-theory` |
| name | Galois Theory |
| domain | Abstract Algebra |
| difficulty | research |
| bloom | analyze |
| mastery_threshold | 0.65 → MAMR = ⌈0.65×5⌉ = 4/5 |
| estimated_hours | 12 |
| requires | `math.abst.algebraic-extension`, `math.abst.group-theory` |
| unlocks | `math.abst.galois-group` |
| cross_links | (none) |
| CPA_entry_stage | A (Abstract) — research-level learner already fluent in both field extensions and group theory; the two are unified directly via one rich concrete example |
| description (KG) | Studies field extensions via their automorphism groups. Fundamental theorem: a bijective correspondence between subfields of a Galois extension K/F and subgroups of Gal(K/F). Resolves classical impossibility problems. |

## Component 1 — Learning Objectives

- LO1: Define an $F$-automorphism of a field extension $K/F$ (a bijective RING homomorphism $K\to K$ fixing every element of $F$) and the **Galois group** $\text{Gal}(K/F)$ (all such automorphisms under composition, verified to be a genuine group), correctly distinguishing a valid $F$-automorphism from an arbitrary bijective relabeling of the extension's generators that fails to preserve the field operations.
- LO2: State and verify, on one complete concrete example, the **Fundamental Theorem of Galois Theory** — a bijective, **inclusion-reversing** correspondence between intermediate fields of a Galois extension $K/F$ and subgroups of $\text{Gal}(K/F)$: SMALLER subgroups correspond to LARGER intermediate fields, and vice versa.
- LO3 *(orientation-level, given the research-level scope of this concept)*: Recognize that Galois theory resolves the classical "solvability by radicals" problem — a polynomial's roots always EXIST (guaranteed by the Fundamental Theorem of Algebra), but they can only be WRITTEN via a nested-radical formula (built from $+,-,\times,\div,\sqrt[n]{\ }$ applied to the coefficients) when the polynomial's Galois group is a SOLVABLE group — explaining, at a landmark-result level, why the general quintic has no radical formula (Abel–Ruffini), without deriving solvable-group theory in full.

## Component 2 — Prerequisite Check

Assumes mastery of `math.abst.algebraic-extension` (minimal polynomials; $[F(\alpha):F]=\deg(m_\alpha)$; the Tower Law from `math.abst.field-extension`, including its own worked computation $[\mathbb{Q}(\sqrt2,\sqrt3):\mathbb{Q}]=4$) and `math.abst.group-theory` (group axioms; verifying a candidate structure is genuinely a group; group order and subgroups).

## Component 3 — Core Explanation

**A Galois group is the set of $F$-fixing symmetries of $K$**: an $F$-automorphism of $K/F$ is a bijective ring homomorphism $\sigma:K\to K$ satisfying $\sigma(a)=a$ for every $a\in F$ — it may permute elements of $K\setminus F$, but it must fix $F$ pointwise AND genuinely preserve both $+$ and $\times$ (an arbitrary relabeling of generators that breaks multiplicativity is not a valid automorphism at all). The set of all such automorphisms, under composition, forms the Galois group $\text{Gal}(K/F)$ — closure (composing two $F$-fixing automorphisms gives another), identity, and inverses (of bijective automorphisms) all hold directly, making it a genuine group in the sense already mastered in `math.abst.group-theory`.

**The Fundamental Theorem: a correspondence that REVERSES inclusion**: for a Galois extension $K/F$, every intermediate field $F\subseteq E\subseteq K$ corresponds to exactly one subgroup of $\text{Gal}(K/F)$ (specifically, the subgroup fixing $E$ pointwise), and this correspondence is a bijection. Crucially, it is INCLUSION-REVERSING: the LARGEST intermediate field ($K$ itself) corresponds to the SMALLEST subgroup ($\{\text{id}\}$), while the SMALLEST intermediate field ($F$ itself) corresponds to the LARGEST subgroup (all of $\text{Gal}(K/F)$) — bigger subfields have fewer symmetries fixing them, not more.

**Solvability by radicals is about EXPRESSING roots, not whether they exist**: every polynomial of degree $n$ has exactly $n$ roots in $\mathbb{C}$ (Fundamental Theorem of Algebra) — this is never in doubt. The genuinely hard question Galois theory answers is whether those roots can be written down using a FORMULA built from $+,-,\times,\div$ and radicals ($\sqrt{\ },\sqrt[3]{\ },\dots$) applied to the polynomial's coefficients. Galois's fundamental insight: this is possible exactly when the polynomial's Galois group is a SOLVABLE group. For degree $\le4$ (quadratic, cubic, quartic), the relevant Galois groups are always solvable, giving the classical formulas. For a general degree-5 (quintic) polynomial, the Galois group is the full symmetric group $S_5$, which is NOT solvable — so no radical formula can exist for the general quintic (Abel–Ruffini), even though its 5 roots exist and can be approximated numerically to any precision.

## Component 4 — Worked Examples

**Example 1 (LO1 — a valid $F$-automorphism must preserve multiplication, not just relabel generators, breaking MC-1)**: For $K=\mathbb{Q}(\sqrt2,\sqrt3)$, $F=\mathbb{Q}$ (recall $[\mathbb{Q}(\sqrt2,\sqrt3):\mathbb{Q}]=4$, already computed via the Tower Law in `math.abst.field-extension`'s own Example 2): consider the candidate map $\rho$ swapping $\sqrt2\leftrightarrow\sqrt3$ directly. Check multiplicativity: $\rho(\sqrt2\cdot\sqrt2)=\rho(2)=2$ (since $\rho$ fixes $\mathbb{Q}$), but $\rho(\sqrt2)\cdot\rho(\sqrt2)=\sqrt3\cdot\sqrt3=3\ne2$ — CONTRADICTION. This "swap" is NOT a valid field automorphism at all. Contrast with the genuine automorphism $\sigma:\sqrt2\mapsto-\sqrt2,\ \sqrt3\mapsto\sqrt3$ (extended to all of $K$ by fixing $\mathbb{Q}$ and preserving $+,\times$): checking $\sigma(\sqrt2\cdot\sqrt2)=\sigma(2)=2$ and $\sigma(\sqrt2)\cdot\sigma(\sqrt2)=(-\sqrt2)(-\sqrt2)=2$ — CONSISTENT. Only maps respecting the actual algebraic relations (like $(\sqrt2)^2=2$) can be genuine automorphisms.

**Example 2 (LO2 — the complete Fundamental Theorem correspondence, breaking MC-2)**: For $K=\mathbb{Q}(\sqrt2,\sqrt3)/\mathbb{Q}$, the full Galois group has exactly 4 elements (each determined by independently choosing $\sqrt2\mapsto\pm\sqrt2$ and $\sqrt3\mapsto\pm\sqrt3$): $\{\text{id},\sigma,\tau,\sigma\tau\}$, isomorphic to the Klein four-group $\mathbb{Z}/2\times\mathbb{Z}/2$. Its 5 subgroups correspond to 5 intermediate fields:

| Subgroup | Order | Fixed field | Field degree over $\mathbb{Q}$ |
|---|---|---|---|
| $\{\text{id}\}$ | 1 (smallest) | $K=\mathbb{Q}(\sqrt2,\sqrt3)$ | 4 (largest) |
| $\{\text{id},\sigma\}$ | 2 | $\mathbb{Q}(\sqrt3)$ | 2 |
| $\{\text{id},\tau\}$ | 2 | $\mathbb{Q}(\sqrt2)$ | 2 |
| $\{\text{id},\sigma\tau\}$ | 2 | $\mathbb{Q}(\sqrt6)$ | 2 |
| $\text{Gal}(K/\mathbb{Q})$ | 4 (largest) | $\mathbb{Q}$ | 1 (smallest) |

The SMALLEST subgroup ($\{\text{id}\}$, order 1) corresponds to the LARGEST field ($K$, degree 4); the LARGEST subgroup (order 4) corresponds to the SMALLEST field ($\mathbb{Q}$, degree 1) — the correspondence genuinely REVERSES size, exactly as the theorem states, not preserves it.

**Example 3 (LO3, orientation-level — roots exist, but a radical formula may not, breaking MC-3)**: every degree-5 polynomial has exactly 5 roots in $\mathbb{C}$ — never in question. But for a GENERAL quintic (generic coefficients), the Galois group is the full symmetric group $S_5$, which is NOT a solvable group (unlike $S_2,S_3,S_4$, all solvable, which is exactly why the quadratic, cubic, and quartic formulas exist). Abel–Ruffini's theorem states precisely that no formula built from $+,-,\times,\div$ and radicals of the coefficients can express the general quintic's roots — NOT because the roots fail to exist, but because the specific EXPRESSIBILITY condition (a solvable Galois group) fails. The roots can still be found numerically to any desired precision; they simply cannot be written as a finite radical expression.

## Component 5 — Teaching Actions

### Teaching Action A01 — Automorphisms Must Preserve Structure, Not Just Relabel (Primitive P28: Conflict Evidence)

Present Example 1's direct evidence: the naive $\sqrt2\leftrightarrow\sqrt3$ swap breaks multiplicativity ($3\ne2$), while the genuine sign-flip automorphism $\sigma$ preserves it consistently. State: "a Galois group element must be a genuine ring homomorphism, fixing $F$ and preserving both $+$ and $\times$ everywhere — not merely a bijection that looks like it permutes the extension's generators sensibly."

- **MC-1 hook**: ask "does any bijective relabeling of an extension's generators (like swapping $\sqrt2$ and $\sqrt3$) automatically define a valid element of the Galois group?" — a "yes" answer reveals MC-1 (missing the requirement that a genuine ring homomorphism must be verified, not merely a plausible-looking relabeling).

### Teaching Action A02 — The Correspondence Reverses Size (Primitive P06: Contrast Pair)

Contrast the two ends of Example 2's table: the trivial subgroup $\{\text{id}\}$ (smallest, order 1) paired with $K$ (largest field, degree 4), against the full group $\text{Gal}(K/\mathbb{Q})$ (largest, order 4) paired with $\mathbb{Q}$ (smallest field, degree 1). State: "more symmetries fixing a subfield means FEWER elements remain distinguishable — hence a bigger subgroup of fixing automorphisms corresponds to a SMALLER field, not a bigger one."

- **MC-2 hook**: ask "does a larger subgroup of $\text{Gal}(K/F)$ correspond to a larger intermediate field?" — a "yes" answer reveals MC-2 (believing the correspondence is inclusion-PRESERVING rather than inclusion-REVERSING).

### Teaching Action A03 — Roots Existing vs. Roots Being Expressible by a Formula (Primitive P11: Representation Shift)

State: "the Fundamental Theorem of Algebra already guarantees every quintic has 5 roots in $\mathbb{C}$ — Abel–Ruffini is not a statement about EXISTENCE, it's a statement about whether those roots can be WRITTEN using a finite radical formula." Work Example 3's contrast between solvable Galois groups (degree $\le4$, formulas exist) and the non-solvable $S_5$ (degree 5, generically, no formula).

- **MC-3 hook**: ask "does Abel–Ruffini's theorem mean the general quintic's roots don't actually exist, or can't be computed at all?" — a "yes" answer reveals MC-3 (conflating "no radical formula exists" with "the roots don't exist" or "can't be found numerically").

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Verify directly that $\tau:\sqrt2\mapsto\sqrt2,\sqrt3\mapsto-\sqrt3$ (fixing $\mathbb{Q}$) preserves multiplicativity on the relation $(\sqrt3)^2=3$.
  2. State which subgroup of $\text{Gal}(\mathbb{Q}(\sqrt2,\sqrt3)/\mathbb{Q})$ corresponds to the intermediate field $\mathbb{Q}(\sqrt2)$, and its order.
  3. Explain, without computing anything new, why $|\text{Gal}(K/\mathbb{Q})|=4=[\mathbb{Q}(\sqrt2,\sqrt3):\mathbb{Q}]$ is not a coincidence for this particular (Galois) extension.
  4. Explain the difference between "the general quintic has no radical formula for its roots" and "the general quintic has no roots."
- **P76 (Transfer Probe, mode = independence)**: "A student encounters the claim 'every polynomial equation can be solved using some formula involving roots, just like the quadratic formula.' (a) Using this lesson's roots-exist-vs-roots-expressible distinction, explain what is actually true and what is false about this claim for degree-5 polynomials. (b) The student then examines $\mathbb{Q}(\sqrt2,\sqrt3)/\mathbb{Q}$ and notices its Galois group has order 4, matching the extension's degree exactly, and asks whether this equality is guaranteed for EVERY field extension, or specifically for GALOIS extensions. Using this lesson's Fundamental Theorem framing, explain your answer. (c) A colleague claims 'since $S_5$ (the Galois group of the general quintic) has 120 elements, a large group, it should have "enough room" to be solvable, unlike smaller groups.' Explain, at the level of this lesson's landmark-result framing (without a full solvable-group proof), why group SIZE is not what determines solvability, referencing that $S_2,S_3,S_4$ (all smaller) ARE solvable while $S_5$ (larger) is not."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | GALOIS-AUTOMORPHISM-AS-ANY-RELABELING | Believing any bijective relabeling of an extension's generators defines a valid Galois group element, missing that it must be a genuine ring homomorphism preserving all algebraic relations | Foundational |
| MC-2 | GALOIS-CORRESPONDENCE-DIRECTION-PRESERVING | Believing the Fundamental Theorem's correspondence between subgroups and intermediate fields is inclusion-PRESERVING (bigger subgroup ↔ bigger field), missing that it is inclusion-REVERSING | Foundational |
| MC-3 | UNSOLVABILITY-BY-RADICALS-CONFLATED-WITH-NONEXISTENCE-OF-ROOTS | Believing Abel–Ruffini's theorem (the general quintic has no radical formula) means the quintic's roots don't exist or can't be found at all, missing that it is specifically about formula-expressibility, not existence or numerical computability | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Galois Automorphism as Any Relabeling") → P41 (detect: present the $\sqrt2\leftrightarrow\sqrt3$ swap and ask whether it is a valid Galois group element, checking for "yes") → P64 (conceptual shift: re-walk Example 1's multiplicativity contradiction, re-anchoring on "a genuine ring homomorphism must preserve every algebraic relation, not merely look like a sensible relabeling").
- **B02 (targets MC-2)**: P27 (name it: "Galois Correspondence Direction-Preserving") → P41 (detect: ask a student whether a larger subgroup corresponds to a larger intermediate field, checking for "yes") → P64 (conceptual shift: re-walk Example 2's full 5-row correspondence table, re-anchoring on "smallest subgroup ↔ largest field; largest subgroup ↔ smallest field — the correspondence reverses size").
- **B03 (targets MC-3)**: P27 (name it: "Unsolvability by Radicals Conflated with Nonexistence of Roots") → P41 (detect: ask a student what Abel–Ruffini's theorem implies about whether the general quintic's roots exist, checking for "they don't exist" or "can't be found at all") → P64 (conceptual shift: re-walk Example 3's roots-exist-vs-expressible distinction, re-anchoring on "the theorem is about formula-writability via radicals, never about existence or numerical computability").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.abst.algebraic-extension` (minimal polynomials and the $[F(\alpha):F]=\deg(m_\alpha)$ machinery, directly used to compute $[\mathbb{Q}(\sqrt2,\sqrt3):\mathbb{Q}]=4$ via the Tower Law from `math.abst.field-extension`), `math.abst.group-theory` (the group-axiom verification this concept applies to $\text{Gal}(K/F)$, and the solvable-group concept invoked in LO3).
- **Unlocks**: `math.abst.galois-group` (deepens the study of $\text{Gal}(K/F)$ as an object in its own right, building directly on this concept's definition and Fundamental Theorem statement).
- **Cross-link**: KG lists no cross_links for this concept (checked via `ls docs/curriculum/blueprints/` before setting P76_mode — none to check). $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 12 with a research/analyze tag is the largest budget in the corpus to date; per established precedent for capstone-scale concepts (e.g. `math.calc.fourier-series-intro`), LO1 and LO2 receive full worked-example depth while LO3 (solvability by radicals) is deliberately kept at ORIENTATION level — stating Abel–Ruffini and the solvable-group connection as a landmark result rather than deriving solvable-group theory or the full impossibility proof, which is well beyond a single concept's scope.
- **Division of labor**: `math.abst.algebraic-extension` owns minimal polynomials and the degree formula; `math.abst.group-theory` owns group-axiom verification in the abstract. This concept, `math.abst.galois-theory`, deliberately does not re-derive either; it owns the UNIFICATION of the two — defining $\text{Gal}(K/F)$ as a group of field automorphisms and stating (with one full concrete verification, not a general proof) the Fundamental Theorem connecting subgroup structure to subfield structure.
- Example 2's $\mathbb{Q}(\sqrt2,\sqrt3)/\mathbb{Q}$ was deliberately chosen as the corpus's single richest concrete Galois-theory example, reusing `math.abst.field-extension`'s own already-computed Tower Law result ($[\mathbb{Q}(\sqrt2,\sqrt3):\mathbb{Q}]=4$) rather than introducing an unfamiliar extension, so the full 5-subgroup/5-subfield correspondence could be verified completely and concretely within this concept's own budget, rather than left as an unverified abstract claim.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (no cross_links listed → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.65×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: research-level learner already fluent in both prerequisites, unified directly) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3 orientation-level) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
