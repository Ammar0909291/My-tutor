# Teaching Blueprint: Seifert-van Kampen Theorem (`math.top.van-kampen`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.top.van-kampen` |
| name | Seifert-van Kampen Theorem |
| domain | Topology |
| difficulty | research |
| bloom | apply |
| mastery_threshold | 0.65 → MAMR = ⌈0.65×5⌉ = 4/5 |
| estimated_hours | 7 |
| requires | `math.top.fundamental-group` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — research-level learner already computes $\pi_1$ for standard spaces directly; the task is computing $\pi_1$ of a COMPOUND space by DECOMPOSING it into simpler pieces |
| description (KG) | If $X=U\cup V$ with $U,V$ open and $U\cap V$ path-connected, then $\pi_1(X)$ is the amalgamated free product $\pi_1(U)*_{\pi_1(U\cap V)}\pi_1(V)$. Allows computing $\pi_1$ of a space from the $\pi_1$ of pieces. Computes $\pi_1$ of surfaces and CW complexes. |

## Component 1 — Learning Objectives

- LO1: State the theorem's precise hypotheses and conclusion — for $X=U\cup V$ with $U,V$ OPEN and $U\cap V$ PATH-CONNECTED, $\pi_1(X)\cong\pi_1(U)*_{\pi_1(U\cap V)}\pi_1(V)$ (the amalgamated free product) — and correctly verify these hypotheses hold for a specific decomposition of a space BEFORE attempting to apply the theorem, recognizing the hypotheses are not automatic.
- LO2: Apply the theorem to compute $\pi_1$ of a space built by gluing two pieces along a SIMPLY CONNECTED intersection (where the amalgamation collapses to an ordinary free product, since $\pi_1(U\cap V)=\{e\}$ imposes no relations) — using `math.top.fundamental-group`'s own already-computed $\pi_1(S^1)=\mathbb{Z}$ as one of the pieces in a standard wedge-of-circles computation.
- LO3: Apply the theorem to a case where $U\cap V$ has NONTRIVIAL fundamental group, producing genuine AMALGAMATION (relations identifying elements of $\pi_1(U)$ with elements of $\pi_1(V)$ via $\pi_1(U\cap V)$'s images) — correctly identifying which relations the amalgamation imposes, and contrasting this with LO2's simpler free-product case.

## Component 2 — Prerequisite Check

Assumes mastery of `math.top.fundamental-group` ($\pi_1(X,x_0)=$ homotopy classes of based loops, with concatenation; $\pi_1(S^1)=\mathbb{Z}$; $\pi_1(S^n)=0$ for $n\ge2$; simply connected means $\pi_1=\{e\}$).

## Component 3 — Core Explanation

**The theorem's hypotheses, checked before use, not assumed automatic**: van Kampen's theorem requires THREE conditions on a decomposition $X=U\cup V$: (1) $U,V$ are OPEN subsets of $X$; (2) their intersection $U\cap V$ is PATH-CONNECTED (a single piece, not several disconnected pieces); (3) $X$ is covered by exactly these two pieces. If ANY of these fail — especially path-connectedness of $U\cap V$, the condition most often overlooked — the theorem's stated conclusion does not apply, and a more careful (often more complicated) version of the theorem for disconnected intersections would be needed instead.

**When $U\cap V$ is simply connected, amalgamation collapses to an ordinary free product**: the amalgamated free product $\pi_1(U)*_{\pi_1(U\cap V)}\pi_1(V)$ imposes relations coming from $\pi_1(U\cap V)$'s images in both $\pi_1(U)$ and $\pi_1(V)$. When $\pi_1(U\cap V)=\{e\}$ (simply connected intersection), there are NO nontrivial elements to map anywhere, so NO relations are imposed beyond the free product's own structure — giving simply $\pi_1(X)\cong\pi_1(U)*\pi_1(V)$, the ORDINARY free product (elements of $\pi_1(U)$ and $\pi_1(V)$ combined with no identifications between them at all). This is the simplest, most common application case — building compound spaces like wedges of circles.

**When $U\cap V$ has nontrivial $\pi_1$, genuine amalgamation occurs**: if $\pi_1(U\cap V)\ne\{e\}$, its elements map into BOTH $\pi_1(U)$ (via the inclusion $U\cap V\hookrightarrow U$) and $\pi_1(V)$ (via $U\cap V\hookrightarrow V$) — and the amalgamated product $\pi_1(U)*_{\pi_1(U\cap V)}\pi_1(V)$ takes the free product $\pi_1(U)*\pi_1(V)$ and adds RELATIONS identifying each element's image under the first inclusion with its image under the second — genuinely gluing the two group structures together at the shared overlap's own fundamental-group structure, not just combining them independently.

## Component 4 — Worked Examples

**Example 1 (LO1 — checking hypotheses before applying the theorem, breaking MC-1)**: for $X=$ a wedge of two circles $S^1\vee S^1$ (two circles joined at a single point $p$), a NAIVE decomposition attempt might try $U=$ one circle, $V=$ the other circle — but $U\cap V=\{p\}$, a SINGLE POINT, which IS path-connected (trivially), and $U,V$ must be enlarged slightly to be OPEN (e.g. each circle plus a small open neighborhood of $p$ reaching into the other circle) to satisfy the openness hypothesis — a genuine technical adjustment the theorem's hypotheses require, not skippable. Verifying: with this adjustment, $U\cap V$ deformation-retracts to the single point $p$ (still simply connected), and $U,V$ are open, satisfying all three hypotheses before the theorem is invoked.

**Example 2 (LO2 — computing $\pi_1(S^1\vee S^1)$ via the simply-connected-intersection case, breaking MC-2)**: continuing Example 1's verified decomposition: $U$ deformation-retracts to the first circle, so $\pi_1(U)\cong\pi_1(S^1)=\mathbb{Z}$ (directly reusing `math.top.fundamental-group`'s own already-computed result); similarly $\pi_1(V)\cong\mathbb{Z}$. Since $U\cap V$ is simply connected ($\pi_1(U\cap V)=\{e\}$), the amalgamation collapses: $\pi_1(S^1\vee S^1)\cong\mathbb{Z}*\mathbb{Z}$, the ORDINARY free product of two copies of $\mathbb{Z}$ — the free group on two generators, with NO relations between the two circles' respective loops, confirming LO2's collapse-to-free-product case concretely on the standard wedge-of-circles example.

**Example 3 (LO3 — genuine amalgamation via a nontrivial intersection, breaking MC-3)**: for $X=$ two tori glued along a common circle (a more elaborate CW-complex construction), suppose $U,V$ are open neighborhoods of the two tori with $U\cap V\simeq S^1$ (the gluing circle itself, up to homotopy) — so $\pi_1(U\cap V)\cong\mathbb{Z}$, NONTRIVIAL. Van Kampen's theorem gives $\pi_1(X)\cong\pi_1(U)*_{\mathbb{Z}}\pi_1(V)$ — a genuine amalgamated product, where the generator of $\pi_1(U\cap V)\cong\mathbb{Z}$ is identified with SPECIFIC elements inside $\pi_1(U)$ and $\pi_1(V)$ (namely, the images of the gluing circle's loop as seen from within each torus's own fundamental group) — a strictly richer computation than Example 2's simple free product, since the amalgamation imposes a genuine relation tying the two pieces' group structures together at the gluing circle.

## Component 5 — Teaching Actions

### Teaching Action A01 — Check the Three Hypotheses BEFORE Applying the Theorem (Primitive P11: Representation Shift)

State: "van Kampen's theorem isn't a plug-and-compute formula you can apply to ANY decomposition $X=U\cup V$ — openness and path-connectedness of $U\cap V$ are genuine conditions to verify FIRST, sometimes requiring you to slightly enlarge your natural decomposition to make it open, as in Example 1." Walk Example 1's verification.

- **MC-1 hook**: ask "can van Kampen's theorem be applied to ANY decomposition $X=U\cup V$ of a space into two pieces, or must specific hypotheses be verified first?" — an "any decomposition" answer reveals MC-1 (missing that openness and path-connected intersection are genuine, checkable prerequisites).

### Teaching Action A02 — Simply Connected Intersection Collapses Amalgamation to a Free Product (Primitive P28: Conflict Evidence)

Present Example 2's direct computation: $\pi_1(S^1\vee S^1)\cong\mathbb{Z}*\mathbb{Z}$ obtained by DIRECTLY combining the two already-known $\pi_1(S^1)=\mathbb{Z}$ pieces with no relations, precisely because the intersection is simply connected. State: "when the overlap $U\cap V$ has trivial $\pi_1$, there's genuinely nothing to amalgamate — you just get the plain free product of the two pieces' fundamental groups, reusing `math.top.fundamental-group`'s own already-computed building blocks directly."

- **MC-2 hook**: ask "when $U\cap V$ is simply connected, does the amalgamated free product formula still impose extra relations between $\pi_1(U)$ and $\pi_1(V)$, or does it collapse to their ordinary free product?" — an "extra relations still imposed" answer reveals MC-2 (missing that a trivial $\pi_1(U\cap V)$ has nothing to map, collapsing the amalgamation).

### Teaching Action A03 — Nontrivial Intersection Genuinely Glues the Two Pieces' Groups Together (Primitive P06: Contrast Pair)

Contrast Example 2's relation-free free-product case against Example 3's genuinely amalgamated case, where the gluing circle's fundamental group forces a real identification between elements of $\pi_1(U)$ and $\pi_1(V)$. State: "when $U\cap V$ carries nontrivial loops, those loops' images inside BOTH pieces must be identified with each other — the computation isn't just combining two separate answers, it's genuinely fusing them together at the shared overlap."

- **MC-3 hook**: ask "does a nontrivial $\pi_1(U\cap V)$ change the resulting computation from Example 2's simple free-product case, or does the answer stay the same regardless of the intersection's fundamental group?" — a "stays the same" answer reveals MC-3 (missing that a nontrivial intersection genuinely changes the computation via real amalgamation relations).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. For a wedge of THREE circles $S^1\vee S^1\vee S^1$, state (without full derivation) what $\pi_1$ should be, generalizing Example 2's two-circle computation.
  2. Explain why the decomposition $U=$ one circle, $V=$ the other circle (with NO enlargement near the wedge point) would fail to satisfy van Kampen's openness hypothesis directly.
  3. For a space $X=U\cup V$ where $U\cap V$ is simply connected, $\pi_1(U)\cong\mathbb{Z}_2$, and $\pi_1(V)\cong\mathbb{Z}_3$, state $\pi_1(X)$.
  4. Explain, in your own words, the difference between the free-product case and the genuinely amalgamated case, referencing what role $\pi_1(U\cap V)$ plays in each.
- **P76 (Transfer Probe, mode = independence — no cross-link target listed in the KG for this concept)**: "A topologist is computing the fundamental group of a genus-2 surface (a two-holed torus) by decomposing it as $X=U\cup V$, where $U$ and $V$ are each a one-holed torus (with a disc removed), glued along a circle $U\cap V\simeq S^1$. (a) Using this lesson's theorem, explain what data the topologist needs to compute FIRST (about $U$, $V$, and their intersection) before applying van Kampen's theorem to find $\pi_1(X)$. (b) Since $U\cap V\simeq S^1$ has NONTRIVIAL fundamental group $\mathbb{Z}$ (not the simply-connected case of Example 2), explain why the resulting computation for $\pi_1(X)$ will involve genuine amalgamation relations rather than simply collapsing to a free product. (c) Contrast this decomposition with a DIFFERENT hypothetical one where $U\cap V$ happened to be simply connected instead, and explain how the resulting computation's STRUCTURE (not necessarily its specific answer) would differ."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | VAN-KAMPEN-HYPOTHESES-ASSUMED-AUTOMATIC | Believing van Kampen's theorem applies to any decomposition $X=U\cup V$ without checking hypotheses, missing that openness and path-connectedness of $U\cap V$ are genuine, checkable conditions | Foundational |
| MC-2 | SIMPLY-CONNECTED-INTERSECTION-ASSUMED-TO-STILL-IMPOSE-RELATIONS | Believing the amalgamated free product formula still imposes extra relations even when $U\cap V$ is simply connected, missing that a trivial $\pi_1(U\cap V)$ collapses the formula to an ordinary free product | High |
| MC-3 | NONTRIVIAL-INTERSECTION-ASSUMED-NOT-TO-CHANGE-COMPUTATION | Believing a nontrivial $\pi_1(U\cap V)$ does not genuinely change the resulting computation from the simpler free-product case | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Van Kampen Hypotheses Assumed Automatic") → P41 (detect: ask whether the theorem applies to any decomposition without checking hypotheses) → P64 (conceptual shift: re-walk Example 1's hypothesis verification, including the necessary open-neighborhood enlargement).
- **B02 (targets MC-2)**: P27 (name it: "Simply Connected Intersection Assumed to Still Impose Relations") → P41 (detect: ask whether a simply connected $U\cap V$ still imposes extra relations) → P64 (conceptual shift: re-walk Example 2's direct free-product computation for $S^1\vee S^1$).
- **B03 (targets MC-3)**: P27 (name it: "Nontrivial Intersection Assumed Not to Change Computation") → P41 (detect: ask whether a nontrivial $\pi_1(U\cap V)$ changes the resulting computation) → P64 (conceptual shift: re-walk Example 3's genuinely amalgamated two-tori computation, contrasted against Example 2).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.top.fundamental-group` ($\pi_1(S^1)=\mathbb{Z}$ and the general definition of $\pi_1$, reused directly as the building-block computation for this concept's decomposition-based approach).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists none for this concept. $P76_{mode}=$ **independence** (no cross-link target to check).

## Component 8 — Teaching Notes

- estimated_hours = 7 with a research/apply tag supports the "3 TAs + gate" tier, with LO1 establishing the hypothesis-checking discipline, LO2 given full computational depth via the standard wedge-of-circles free-product case, and LO3 contrasted directly against LO2 via a genuinely amalgamated example.
- **Division of labor**: `math.top.fundamental-group` already owns the definition of $\pi_1$ itself and specific already-computed values like $\pi_1(S^1)=\mathbb{Z}$ (verified by grep — no van Kampen/amalgamated-product/decomposition content found there, and its own Unlocks section explicitly names this concept as its natural extension). This concept owns the DECOMPOSITION-based computational technique itself: the theorem's precise hypotheses, the free-product collapse case, and the genuinely amalgamated case — none of which appear in the prerequisite.
- Example 2's deliberate choice of the STANDARD wedge-of-circles example (rather than a more exotic space) was made specifically because it is the most common, most immediately generalizable application of the simply-connected-intersection case, directly setting up problem 1 of the mastery gate's natural three-circle generalization.

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
| V-15 | CPA_entry_stage justified | PASS (Abstract: research-level learner already computes $\pi_1$ directly; task is decomposition-based computation) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
