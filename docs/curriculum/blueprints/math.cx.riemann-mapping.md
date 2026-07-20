# Teaching Blueprint: Riemann Mapping Theorem (`math.cx.riemann-mapping`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.cx.riemann-mapping` |
| name | Riemann Mapping Theorem |
| domain | Complex Analysis |
| difficulty | research |
| bloom | analyze |
| mastery_threshold | 0.65 → MAMR = ⌈0.65×5⌉ = 4/5 |
| estimated_hours | 8 |
| requires | `math.cx.conformal-mapping` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — research-level learner already understands conformal maps between specific domains; the task is the universal EXISTENCE theorem covering essentially every simply connected domain |
| description (KG) | Every simply connected proper open subset of $\mathbb{C}$ is biholomorphic to the unit disc. The map is unique up to a Möbius transformation of the disc. Proved using normal families and Montel's theorem. |

## Component 1 — Learning Objectives

- LO1 (cross-link objective): State the theorem precisely — every SIMPLY CONNECTED PROPER open subset $\Omega\subsetneq\mathbb{C}$ (i.e., $\Omega\ne\mathbb{C}$ itself, and with no "holes") admits a BIHOLOMORPHIC map (a holomorphic bijection, exactly `math.cx.conformal-mapping`'s own conformal-map notion, since a holomorphic bijection is automatically conformal wherever its derivative is nonzero) onto the unit disc $\mathbb{D}$ — and correctly identify, for a list of candidate domains, which satisfy the theorem's hypotheses (simply connected AND proper) and which do not.
- LO2: State the UNIQUENESS clause precisely — the biholomorphism $\Omega\to\mathbb{D}$ is not unique outright, but unique UP TO composing with a Möbius transformation of the disc (i.e., fixing one interior point's image and one direction pins down a UNIQUE such map) — and correctly count the remaining degrees of freedom before and after such normalizing conditions are imposed.
- LO3: Explain, at a conceptual (non-fully-rigorous) level, WHY both hypotheses are genuinely necessary — using $\mathbb{C}$ itself (proper subset hypothesis fails) and an annulus (simply connected hypothesis fails) as concrete counterexamples where the conclusion demonstrably breaks — and state the proof's high-level strategy (constructing the map as a limit within a normal family via Montel's theorem) without executing the full proof.

## Component 2 — Prerequisite Check

Assumes mastery of `math.cx.conformal-mapping` (a holomorphic bijection is conformal wherever $f'\ne0$; conformal maps used to transfer complicated domains to simpler ones for PDE applications).

## Component 3 — Core Explanation

**The theorem's astonishing scope, stated precisely**: `math.cx.conformal-mapping` already establishes what a conformal (biholomorphic) map is and why they're useful for transferring problems between domains. The Riemann Mapping Theorem says this transfer is ALWAYS possible, for an enormous class of domains: ANY simply connected proper open subset $\Omega$ of $\mathbb{C}$ — no matter how geometrically bizarre its boundary — is biholomorphic to the single, maximally simple reference domain, the unit disc $\mathbb{D}=\{z:|z|<1\}$. This is a genuine EXISTENCE theorem: it guarantees such a map exists without necessarily providing an explicit formula for it (unlike, say, a specific Möbius transformation between two half-planes, which can be written down directly).

**Uniqueness up to a Möbius transformation of the disc — three real degrees of freedom remain**: given that SOME biholomorphism $f:\Omega\to\mathbb{D}$ exists, it is far from unique — composing $f$ with ANY automorphism of $\mathbb{D}$ (a Möbius transformation of the disc to itself) gives another equally valid biholomorphism $\Omega\to\mathbb{D}$. The automorphisms of $\mathbb{D}$ form a 3-real-parameter family (matching the 3 real degrees of freedom of a Möbius disc automorphism). To pin down a UNIQUE map, exactly 3 real conditions must be imposed — the standard normalization fixes a chosen point $z_0\in\Omega$ to map to $0\in\mathbb{D}$ (2 real conditions, since $z_0\mapsto0$ is a complex — hence 2-real-dimensional — condition) and fixes the DERIVATIVE'S argument at $z_0$ to be positive real (1 more real condition) — together uniquely determining the map.

**Both hypotheses are genuinely necessary, and the proof's high-level strategy**: the PROPER-subset hypothesis ($\Omega\ne\mathbb{C}$) is necessary because $\mathbb{C}$ itself cannot be biholomorphic to the BOUNDED disc $\mathbb{D}$ (Liouville's theorem: a bounded entire function is constant, so any holomorphic map $\mathbb{C}\to\mathbb{D}$ would have to be constant, never a bijection). The SIMPLY-CONNECTED hypothesis is necessary because a domain with a "hole" (like an annulus) has different topology from the disc (which has none) — and biholomorphic maps, being homeomorphisms, must preserve this topological structure, so a holed domain simply cannot be biholomorphic to a hole-free one. The proof itself (not executed in full here) constructs the desired map as a LIMIT within a carefully chosen NORMAL FAMILY of candidate maps, using Montel's theorem (a compactness result for families of holomorphic functions) to guarantee such a limit exists and has the required properties.

## Component 4 — Worked Examples

**Example 1 (LO1 — classifying candidate domains against both hypotheses, breaking MC-1)**: checking four candidates: (a) the open unit square $\{x+iy:0<x<1,0<y<1\}$ — simply connected (no holes) AND a proper subset of $\mathbb{C}$ — the theorem APPLIES, guaranteeing a biholomorphism to $\mathbb{D}$. (b) the upper half-plane $\{z:\operatorname{Im}(z)>0\}$ — simply connected and proper — the theorem APPLIES (and here an EXPLICIT map, the Cayley transform, happens to be known from `math.cx.conformal-mapping`'s own toolkit, though the theorem guarantees existence regardless). (c) $\mathbb{C}$ itself — NOT a proper subset — the theorem does NOT apply. (d) an annulus $\{z:1<|z|<2\}$ — NOT simply connected (it has a hole) — the theorem does NOT apply, and indeed no such biholomorphism to $\mathbb{D}$ exists for an annulus.

**Example 2 (LO2 — counting degrees of freedom before and after normalization, breaking MC-2)**: for $\Omega=$ the upper half-plane, SOME biholomorphism $f_0:\Omega\to\mathbb{D}$ exists (e.g. the Cayley transform $f_0(z)=\frac{z-i}{z+i}$). Composing with ANY of the 3-real-parameter family of disc automorphisms $\phi_a(w)=e^{i\theta}\frac{w-a}{1-\bar aw}$ (for $a\in\mathbb{D}$, $\theta\in\mathbb{R}$ — 3 real parameters: $\operatorname{Re}(a),\operatorname{Im}(a),\theta$) gives infinitely many OTHER valid biholomorphisms $\phi_a\circ f_0:\Omega\to\mathbb{D}$. Imposing the standard normalization (fix $z_0=i\in\Omega$ to map to $0\in\mathbb{D}$: 2 real conditions; fix $f'(i)$ to have positive real argument: 1 more real condition) uses up all 3 degrees of freedom, pinning down a UNIQUE map — confirming LO2's precise counting.

**Example 3 (LO3 — verifying both hypotheses are genuinely necessary via concrete counterexamples, breaking MC-3)**: for $\Omega=\mathbb{C}$ (proper-subset hypothesis fails): any holomorphic $f:\mathbb{C}\to\mathbb{D}$ is bounded (its image lies in $\mathbb{D}$, which is bounded), and Liouville's theorem forces any BOUNDED entire function to be CONSTANT — a constant function can never be a bijection, so NO biholomorphism $\mathbb{C}\to\mathbb{D}$ can exist, confirming the proper-subset hypothesis is genuinely load-bearing, not a technicality. For $\Omega=\{z:1<|z|<2\}$ (simply-connected hypothesis fails): a loop encircling the inner boundary circle cannot be continuously shrunk to a point WITHIN the annulus (it would have to cross the missing inner disc) — a topological obstruction that $\mathbb{D}$ (where every loop CAN shrink to a point) simply does not share, so no homeomorphism (hence no biholomorphism) between them can exist.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Theorem Guarantees a Conformal Map to the Disc for an Enormous Class of Domains (Primitive P11: Representation Shift)

State: "`math.cx.conformal-mapping` already tells you what a conformal map IS and why it's useful — the Riemann Mapping Theorem tells you one ALWAYS EXISTS to the disc, for essentially any simply connected proper domain, no matter how complicated its boundary looks." Walk Example 1's four-way classification.

- **MC-1 hook**: ask "does the Riemann Mapping Theorem apply to EVERY open subset of $\mathbb{C}$, or only to a specific restricted class?" — an "every open subset" answer reveals MC-1 (missing that both the simply-connected and proper-subset hypotheses are genuine restrictions, not automatic).

### Teaching Action A02 — Uniqueness Requires Exactly 3 Real Normalizing Conditions (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: infinitely many biholomorphisms exist (parametrized by the 3-real-parameter disc-automorphism family) UNTIL exactly 3 real conditions (a point-image plus a derivative-argument condition) are imposed, at which point the map becomes unique. State: "the theorem's map isn't unique outright — 'unique up to a Möbius transformation of the disc' means there's a whole 3-real-parameter family of valid maps, and you need to spend exactly those 3 degrees of freedom via normalizing conditions to pin down one specific map."

- **MC-2 hook**: ask "once the Riemann Mapping Theorem guarantees a biholomorphism to $\mathbb{D}$ exists, is that map automatically unique, or does uniqueness require additional normalizing conditions?" — an "automatically unique" answer reveals MC-2 (missing the genuine 3-real-parameter family of valid maps prior to normalization).

### Teaching Action A03 — Both Hypotheses Are Load-Bearing, Not Technicalities (Primitive P06: Contrast Pair)

Contrast the tempting assumption that the theorem's hypotheses are minor technical fine print against Example 3's two concrete, fully-reasoned counterexamples ($\mathbb{C}$ via Liouville's theorem; the annulus via a genuine topological obstruction) where DROPPING either hypothesis makes the conclusion demonstrably FALSE. State: "these aren't technicalities to skim past — drop the proper-subset condition and Liouville's theorem directly blocks any such map from existing; drop simply-connectedness and a topological obstruction (an unshrinkable loop) blocks it just as directly."

- **MC-3 hook**: ask "are the theorem's 'simply connected' and 'proper subset' hypotheses minor technical fine print, or genuinely necessary conditions whose failure breaks the conclusion?" — a "minor technicalities" answer reveals MC-3 (missing the concrete counterexamples demonstrating both hypotheses' necessity).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. For the open right half-plane $\{z:\operatorname{Re}(z)>0\}$, determine whether the Riemann Mapping Theorem applies, and justify using both hypotheses explicitly.
  2. Explain why the theorem's biholomorphism to $\mathbb{D}$, once known to exist for some domain, is not automatically unique.
  3. State the standard normalization (2 conditions on point-image, 1 on derivative argument) that pins down a unique Riemann map, and explain why together they use up exactly 3 real degrees of freedom.
  4. Explain, using Liouville's theorem, why the theorem cannot apply to $\Omega=\mathbb{C}$.
- **P76 (Transfer Probe, mode = independence — no cross-link target listed in the KG for this concept)**: "A numerical-methods researcher is designing software to compute conformal maps for solving PDEs on arbitrary simply connected 2D domains (e.g. irregularly-shaped physical regions), by first mapping each domain to the unit disc, solving the PDE there (where explicit solution techniques are well developed), and mapping the solution back. (a) Using the Riemann Mapping Theorem, explain why this general strategy is guaranteed to be applicable to essentially any such simply connected physical region, regardless of how irregular its boundary is. (b) The researcher's software requires a UNIQUE map for each domain (for reproducibility). Explain what specific normalizing choices the software needs to make, and why these are both necessary and sufficient to guarantee uniqueness. (c) A colleague suggests extending the software to handle a domain shaped like a washer (an annular region with a hole in the middle). Explain, citing this lesson's topological argument, why the Riemann Mapping Theorem as stated cannot be directly applied to such a domain."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | THEOREM-HYPOTHESES-ASSUMED-UNRESTRICTIVE | Believing the Riemann Mapping Theorem applies to every open subset of $\mathbb{C}$, missing that simply-connectedness and being a proper subset are genuine, necessary restrictions | Foundational |
| MC-2 | RIEMANN-MAP-ASSUMED-AUTOMATICALLY-UNIQUE | Believing the biholomorphism guaranteed by the theorem is automatically unique, missing the genuine 3-real-parameter family of valid maps prior to normalization | High |
| MC-3 | THEOREM-HYPOTHESES-ASSUMED-TECHNICAL | Believing the theorem's hypotheses are minor technical fine print rather than genuinely load-bearing conditions whose failure demonstrably breaks the conclusion | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Theorem Hypotheses Assumed Unrestrictive") → P41 (detect: ask whether the theorem applies to every open subset of $\mathbb{C}$) → P64 (conceptual shift: re-walk Example 1's four-way classification, including the two cases where the theorem does NOT apply).
- **B02 (targets MC-2)**: P27 (name it: "Riemann Map Assumed Automatically Unique") → P41 (detect: ask whether the guaranteed biholomorphism is automatically unique) → P64 (conceptual shift: re-walk Example 2's 3-real-parameter family and the specific normalizing conditions needed).
- **B03 (targets MC-3)**: P27 (name it: "Theorem Hypotheses Assumed Technical") → P41 (detect: ask whether the hypotheses are minor technicalities or genuinely necessary) → P64 (conceptual shift: re-walk Example 3's two concrete, fully-reasoned counterexamples).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.cx.conformal-mapping` (the biholomorphism/conformal-map notion this theorem's existence claim is stated in terms of directly).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists none for this concept. $P76_{mode}=$ **independence** (no cross-link target to check).

## Component 8 — Teaching Notes

- estimated_hours = 8 with a research/analyze tag supports the "3 TAs + gate" tier, with LO1 establishing the theorem's precise scope via a fully classified four-domain example, LO2 given full depth via an explicit degrees-of-freedom count, and LO3 grounding both hypotheses' necessity in genuine, reasoned counterexamples rather than asserted restrictions.
- **Division of labor**: `math.cx.conformal-mapping` already owns the general definition of a conformal/biholomorphic map and its basic properties, and explicitly names this concept as its own natural extension in its own Unlocks section (verified by grep — "math.cx.riemann-mapping (the Riemann Mapping Theorem guarantees a conformal map exists...)"). This concept owns the full existence-and-uniqueness theorem, its scope-defining hypotheses (verified necessary via concrete counterexamples), and a high-level (non-executed) preview of the normal-families proof strategy — none of which are covered in the prerequisite.
- Example 3's deliberate choice of TWO different counterexamples (one for each hypothesis, rather than a single combined failure) was made specifically so each hypothesis's necessity could be isolated and verified independently, rather than leaving open the question of whether just one of the two hypotheses alone would have sufficed.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (none listed in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.65×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: research-level learner already understands specific conformal maps; task is the universal existence theorem) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
