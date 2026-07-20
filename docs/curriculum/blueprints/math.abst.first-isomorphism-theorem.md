# Teaching Blueprint: First Isomorphism Theorem (`math.abst.first-isomorphism-theorem`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.abst.first-isomorphism-theorem` |
| name | First Isomorphism Theorem |
| domain | Abstract Algebra |
| difficulty | advanced |
| bloom | understand |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 6 |
| requires | `math.abst.quotient-group`, `math.abst.group-homomorphism` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — verifying the isomorphism for one specific homomorphism before naming the general theorem |
| description (KG) | If $\varphi:G\to H$ is a homomorphism, then $G/\ker(\varphi)\cong\mathrm{im}(\varphi)$. The quotient by the kernel is isomorphic to the image. Generalizes to rings and modules. Proved by showing the induced map $\bar{G}\to\mathrm{im}(\varphi)$ is an isomorphism. |

## Component 1 — Learning Objectives

- LO1: State the theorem $G/\ker(\varphi)\cong\mathrm{im}(\varphi)$, recognizing it as connecting THREE objects already separately studied: `math.abst.group-homomorphism`'s own $\ker(\varphi)$ and $\mathrm{im}(\varphi)$, and `math.abst.quotient-group`'s own construction $G/N$ (here with $N=\ker(\varphi)$, which `math.abst.group-homomorphism` already certified is NORMAL, making the quotient well-defined).
- LO2: Construct the INDUCED MAP $\bar\varphi:G/\ker(\varphi)\to\mathrm{im}(\varphi)$, $\bar\varphi(g\ker(\varphi))=\varphi(g)$, and verify it is WELL-DEFINED (doesn't depend on which representative $g$ is chosen from its coset) — recognizing well-definedness as the step that genuinely REQUIRES quotienting by $\ker(\varphi)$ specifically, not any arbitrary normal subgroup.
- LO3 (orientation level — full generalization to rings/modules deferred): recognize, without full derivation, that the SAME theorem statement and proof STRUCTURE (kernel, image, induced map, well-definedness via the kernel) apply essentially unchanged to RING and MODULE homomorphisms — a single unifying pattern across different algebraic structures, previewing that the specific algebraic category matters far less than the underlying kernel/image/quotient relationship.

## Component 2 — Prerequisite Check

Assumes mastery of `math.abst.quotient-group` ($G/N=\{gN:g\in G\}$, well-defined when $N\trianglelefteq G$) and `math.abst.group-homomorphism` ($\varphi:G\to H$ with $\varphi(ab)=\varphi(a)\varphi(b)$; $\ker(\varphi)$ normal in $G$; $\mathrm{im}(\varphi)$ a subgroup of $H$).

## Component 3 — Core Explanation

**The theorem connects three already-separately-studied objects into one statement**: `math.abst.group-homomorphism` already established that $\ker(\varphi)=\{g\in G:\varphi(g)=e_H\}$ is a NORMAL subgroup of $G$, and $\mathrm{im}(\varphi)$ is a subgroup of $H$. Since $\ker(\varphi)$ is normal, `math.abst.quotient-group`'s own construction $G/N$ applies DIRECTLY with $N=\ker(\varphi)$, giving a well-defined quotient group $G/\ker(\varphi)$. The First Isomorphism Theorem's content is the CLAIM that this specific quotient group is ISOMORPHIC to $\mathrm{im}(\varphi)$ — a genuinely new fact connecting these three already-understood pieces, not merely restating any one of them.

**The induced map's well-definedness is the crux, and it genuinely requires quotienting by $\ker(\varphi)$ specifically**: define $\bar\varphi:G/\ker(\varphi)\to\mathrm{im}(\varphi)$ by $\bar\varphi(g\ker(\varphi))=\varphi(g)$. Checking this is WELL-DEFINED means verifying: if $g_1\ker(\varphi)=g_2\ker(\varphi)$ (the SAME coset, possibly written with different representatives), then $\varphi(g_1)=\varphi(g_2)$ (the SAME output) — otherwise $\bar\varphi$ wouldn't even be a genuine function. This holds PRECISELY because $g_1\ker(\varphi)=g_2\ker(\varphi)$ means $g_1^{-1}g_2\in\ker(\varphi)$, so $\varphi(g_1^{-1}g_2)=e_H$, forcing $\varphi(g_1)=\varphi(g_2)$ — a computation that would FAIL if you tried quotienting by any OTHER normal subgroup instead of $\ker(\varphi)$ specifically.

**The same pattern generalizes to rings and modules essentially unchanged (orientation level)**: for RING homomorphisms, the analogous statement is $R/\ker(\varphi)\cong\mathrm{im}(\varphi)$ (with $\ker(\varphi)$ now a two-sided IDEAL rather than a normal subgroup, and the quotient a quotient RING); for MODULE homomorphisms, similarly with submodules. The PROOF STRUCTURE — define the induced map, verify well-definedness via the kernel, verify it's an isomorphism — carries over with essentially no conceptual change, only the specific algebraic vocabulary (subgroup vs. ideal vs. submodule) shifting. This reflects a DEEP unifying pattern across algebra, not a coincidental notational similarity. Full derivation of the ring/module versions is deferred beyond this concept's core scope.

## Component 4 — Worked Examples

**Example 1 (LO1 — identifying the three connected objects for a concrete homomorphism, breaking MC-1)**: for $\varphi:\mathbb{Z}\to\mathbb{Z}/6\mathbb{Z}$, $\varphi(n)=n\bmod6$ (a homomorphism from the integers under addition to the integers mod 6): $\ker(\varphi)=\{n\in\mathbb{Z}:n\bmod6=0\}=6\mathbb{Z}$ (already certified normal, since $\mathbb{Z}$ is abelian, so every subgroup is normal — directly from `math.abst.group-homomorphism`). $\mathrm{im}(\varphi)=\mathbb{Z}/6\mathbb{Z}$ itself (the map is surjective). The quotient $\mathbb{Z}/\ker(\varphi)=\mathbb{Z}/6\mathbb{Z}$ (using `math.abst.quotient-group`'s own construction) — and the theorem claims $\mathbb{Z}/6\mathbb{Z}\cong\mathbb{Z}/6\mathbb{Z}$, which is trivially true here (in fact IDENTICAL, not merely isomorphic) — a simple but genuine instance connecting all three pieces.

**Example 2 (LO2 — verifying the induced map's well-definedness, breaking MC-2)**: for a LESS trivial case, $\varphi:S_3\to\{1,-1\}$ (the sign homomorphism, sending even permutations to $1$ and odd permutations to $-1$): $\ker(\varphi)=A_3$ (the alternating group, the even permutations). Checking well-definedness of $\bar\varphi:S_3/A_3\to\{1,-1\}$: take TWO different representatives of the SAME coset, say the coset $A_3$ itself represented by the identity $e$ or by $(1\,2\,3)$ (both even, both in $A_3$) — $\varphi(e)=1$ and $\varphi((1\,2\,3))=1$, MATCHING as required. Now take the OTHER coset, represented by a transposition like $(1\,2)$ or by $(1\,3\,2)(1\,2)$ (both odd) — both give $\varphi=-1$, again matching. This concrete verification confirms $\bar\varphi$ is genuinely well-defined SPECIFICALLY because we quotiented by $\ker(\varphi)=A_3$; had we quotiented by a DIFFERENT subgroup not equal to the kernel, this consistency would generally fail.

**Example 3 (LO3, orientation level — the ring version following the identical pattern, breaking MC-3)**: for the ring homomorphism $\varphi:\mathbb{Z}\to\mathbb{Z}/n\mathbb{Z}$, $\varphi(k)=k\bmod n$ (a RING homomorphism, not just a group one, since it also respects multiplication): $\ker(\varphi)=n\mathbb{Z}$ is now recognized as an IDEAL (not merely a normal subgroup) of $\mathbb{Z}$, and the ring version of the theorem gives $\mathbb{Z}/n\mathbb{Z}\cong\mathrm{im}(\varphi)=\mathbb{Z}/n\mathbb{Z}$ — the SAME statement structure as Example 1's group case, with "normal subgroup" replaced by "ideal" and "quotient group" replaced by "quotient ring," but the underlying kernel/image/induced-map argument proceeding IDENTICALLY.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Theorem Connects Three Objects You Already Understand Separately (Primitive P11: Representation Shift)

State: "$\ker(\varphi)$, $\mathrm{im}(\varphi)$, and the quotient construction $G/N$ are all things you already know separately — this theorem's genuine new content is the CLAIM that combining them this specific way gives an isomorphism, not a restatement of any one piece alone." Walk Example 1's identification of all three pieces for $\varphi:\mathbb{Z}\to\mathbb{Z}/6\mathbb{Z}$.

- **MC-1 hook**: ask "does the First Isomorphism Theorem simply restate the definition of $\ker(\varphi)$ or $\mathrm{im}(\varphi)$, without adding any genuinely new information?" — a "yes" answer reveals MC-1 (missing that the theorem's content is the isomorphism CONNECTING these already-separately-understood objects).

### Teaching Action A02 — Well-Definedness Genuinely Requires the Kernel Specifically (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: checking well-definedness for DIFFERENT representatives of the SAME coset of $A_3$ genuinely worked out consistently, precisely because $A_3=\ker(\varphi)$. State: "well-definedness isn't automatic for any quotient you might pick — it specifically requires quotienting by the KERNEL, because that's exactly the subgroup whose elements all map to the identity, making different representatives agree."

- **MC-2 hook**: ask "would the induced map $\bar\varphi$ still be well-defined if you quotiented by some OTHER normal subgroup instead of $\ker(\varphi)$ specifically?" — a "yes" answer reveals MC-2 (missing that well-definedness genuinely depends on quotienting by the kernel specifically, not any arbitrary normal subgroup).

### Teaching Action A03 — The Same Pattern Genuinely Recurs in Rings, Not by Coincidence (Primitive P06: Contrast Pair)

Contrast Example 1's group-theoretic statement ($\mathbb{Z}/\ker(\varphi)\cong\mathrm{im}(\varphi)$) against Example 3's ring-theoretic statement (identical structure, different vocabulary). State: "this isn't a coincidental notational similarity between separate theorems — it's the SAME underlying kernel/image/induced-map argument, working identically whether you're in the world of groups, rings, or modules."

- **MC-3 hook**: ask "is the ring-theoretic version of the First Isomorphism Theorem a separate theorem requiring an entirely different proof strategy from the group-theoretic version?" — a "yes" answer reveals MC-3 (missing that the identical kernel/image/induced-map proof structure applies essentially unchanged).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. For $\varphi:\mathbb{Z}\to\mathbb{Z}/4\mathbb{Z}$, $\varphi(n)=n\bmod4$, identify $\ker(\varphi)$, $\mathrm{im}(\varphi)$, and state what the First Isomorphism Theorem concludes.
  2. Verify well-definedness of the induced map $\bar\varphi$ for problem 1 by checking two different representatives of the same coset.
  3. Explain, in one or two sentences, why quotienting by $\ker(\varphi)$ specifically (rather than an arbitrary normal subgroup) is essential for well-definedness.
  4. State the ring-theoretic analogue of the First Isomorphism Theorem, identifying what replaces "normal subgroup" and "quotient group" in that setting.
- **P76 (Transfer Probe, mode = independence)**: "Consider the determinant map $\det:GL_2(\mathbb{R})\to\mathbb{R}^\times$ (from invertible $2\times2$ matrices under multiplication to the nonzero reals under multiplication), a genuine group homomorphism. (a) Identify $\ker(\det)$ (the special linear group $SL_2(\mathbb{R})$) and $\mathrm{im}(\det)$, and state what the First Isomorphism Theorem concludes about $GL_2(\mathbb{R})/SL_2(\mathbb{R})$. (b) Explain why the induced map from $GL_2(\mathbb{R})/SL_2(\mathbb{R})$ to $\mathbb{R}^\times$ is well-defined, citing the kernel-based argument directly. (c) A colleague asks whether this same isomorphism-theorem argument could be applied if $\det$ were instead viewed as a RING homomorphism (respecting matrix addition and multiplication) — explain what would need to change in the argument's vocabulary, citing the pattern from the ring-theoretic version."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | THEOREM-ASSUMED-MERE-RESTATEMENT | Believing the theorem simply restates the definition of $\ker(\varphi)$ or $\mathrm{im}(\varphi)$, missing that its genuine content is the isomorphism connecting these already-understood objects | Foundational |
| MC-2 | WELL-DEFINEDNESS-ASSUMED-INDEPENDENT-OF-KERNEL-CHOICE | Believing the induced map would be well-defined for any normal subgroup, not specifically the kernel, missing that well-definedness genuinely requires the kernel | High |
| MC-3 | RING-VERSION-ASSUMED-SEPARATE-THEOREM | Believing the ring-theoretic version requires an entirely different proof strategy, missing that the identical kernel/image/induced-map structure applies unchanged | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Theorem Assumed Mere Restatement") → P41 (detect: ask whether the theorem simply restates the definition of $\ker(\varphi)$ or $\mathrm{im}(\varphi)$) → P64 (conceptual shift: re-walk Example 1's three-object identification, re-anchoring on "the genuine content is the isomorphism connecting these objects").
- **B02 (targets MC-2)**: P27 (name it: "Well-Definedness Assumed Independent of Kernel Choice") → P41 (detect: ask whether the induced map would be well-defined for any normal subgroup) → P64 (conceptual shift: re-walk Example 2's explicit representative-consistency verification, re-anchoring on "well-definedness genuinely requires the kernel specifically").
- **B03 (targets MC-3)**: P27 (name it: "Ring Version Assumed Separate Theorem") → P41 (detect: ask whether the ring-theoretic version requires an entirely different proof strategy) → P64 (conceptual shift: re-walk Example 3's structurally-identical ring statement, re-anchoring on "the same kernel/image/induced-map structure applies unchanged").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.abst.quotient-group` ($G/N$ and its well-definedness for normal $N$, directly instantiated here with $N=\ker(\varphi)$) and `math.abst.group-homomorphism` ($\ker(\varphi)$ and $\mathrm{im}(\varphi)$, the two objects this theorem connects via the quotient).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: none listed in the KG for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 6 with an advanced/understand tag supports the "3 TAs + gate" tier, with LO1 and LO2 given full conceptual and computational depth (the three-object connection and the explicit well-definedness verification) and LO3 kept orientation-level, appropriately surveying the ring/module generalization without proving those versions in full.
- **Division of labor**: `math.abst.quotient-group` owns the general $G/N$ construction; `math.abst.group-homomorphism` owns $\ker(\varphi)$ and $\mathrm{im}(\varphi)$ individually. This concept owns the CONNECTING isomorphism and its well-definedness proof — deliberately choosing the sign homomorphism $S_3\to\{1,-1\}$ for Example 2 (rather than a purely abelian example like Example 1) specifically because its non-abelian setting makes the well-definedness check for DIFFERENT representatives of the same coset a genuinely non-trivial, illustrative verification.
- Example 3's deliberate choice to reuse the SAME underlying map ($\mathbb{Z}\to\mathbb{Z}/n\mathbb{Z}$, viewed now as a ring rather than group homomorphism) as a close cousin of Example 1 was chosen to make the group-versus-ring structural parallel as directly comparable as possible, isolating the vocabulary shift (subgroup→ideal) as the only real difference.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (none listed in KG) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: verifying the isomorphism for one specific homomorphism precedes the general theorem statement) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
