# Teaching Blueprint: Group Action (`math.abst.group-action`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.abst.group-action` |
| name | Group Action |
| domain | Abstract Algebra |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 6 |
| requires | `math.abst.group-theory`, `math.found.function-set-theoretic` |
| unlocks | `math.abst.sylow-theorems` |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — verifying the two group-action axioms for a specific action before the general definition | 
| description (KG) | A group action of G on set X: a map G×X→X satisfying identity and compatibility. Orbit of x: Gx={gx:g∈G}. Stabilizer of x: Gₓ={g:gx=x}. Orbit-Stabilizer theorem: |Gx|·|Gₓ|=|G|. |

## Component 1 — Learning Objectives

- LO1: Define a **group action** of $G$ on $X$ as a map $G\times X\to X$ (written $g\cdot x$) satisfying BOTH: identity ($e\cdot x=x$ for all $x$) and compatibility ($g\cdot(h\cdot x)=(gh)\cdot x$ for all $g,h\in G,x\in X$) — and verify a specific map satisfies both axioms directly, reusing `math.found.function-set-theoretic`'s own verify-by-checking-cases procedure.
- LO2: Define the **orbit** $Gx=\{gx : g\in G\}$ (every place $x$ can be moved to) and the **stabilizer** $G_x=\{g\in G : gx=x\}$ (every element that fixes $x$), compute both directly for a specific action, and verify $G_x$ is ALWAYS a genuine SUBGROUP of $G$ — not merely an arbitrary subset — reusing `math.abst.group-theory`'s own subgroup-verification framework.
- LO3: State and numerically verify the **Orbit-Stabilizer theorem**, $|Gx|\cdot|G_x|=|G|$ — recognizing orbit size and stabilizer size are NOT independent quantities; their product is forced to equal $|G|$ exactly, for the same group acting on any element.

## Component 2 — Prerequisite Check

Assumes mastery of `math.abst.group-theory` (a group $(G,\cdot)$ satisfying closure, associativity, identity, inverses; subgroup verification) and `math.found.function-set-theoretic` (verifying a relation is a genuine function by checking specific required properties).

## Component 3 — Core Explanation

**Two axioms, both required**: a group action of $G$ on a set $X$ is a map $G\times X\to X$, written $g\cdot x$, satisfying BOTH: (i) **identity** — $e\cdot x=x$ for every $x\in X$ (the group's identity element does nothing); (ii) **compatibility** — $g\cdot(h\cdot x)=(gh)\cdot x$ for all $g,h\in G$ (applying $h$ then $g$ matches applying the single combined element $gh$). Verifying these axioms for a specific proposed action means checking specific cases directly, exactly as `math.found.function-set-theoretic` verifies any claimed function's defining properties — a map satisfying only ONE of the two axioms is not a genuine group action.

**Orbit and stabilizer, and the stabilizer's subgroup structure**: the **orbit** of $x$, $Gx=\{gx:g\in G\}$, collects every place $x$ can be sent by some group element — all the "positions" $x$ can reach under the action. The **stabilizer** of $x$, $G_x=\{g\in G:gx=x\}$, collects every group element that leaves $x$ fixed. Crucially, $G_x$ is not just an arbitrary subset — it is ALWAYS a genuine SUBGROUP of $G$: it contains $e$ (by the identity axiom), is closed under the group operation (if $g,h$ both fix $x$, so does $gh$, by compatibility), and closed under inverses (if $g$ fixes $x$, so does $g^{-1}$).

**Orbit-Stabilizer: orbit size and stabilizer size are linked, not independent**: the Orbit-Stabilizer theorem states $|Gx|\cdot|G_x|=|G|$ — for ANY element $x$, the orbit size and stabilizer size MULTIPLY to give exactly the group's own size. This is a genuine multiplicative constraint: a LARGER orbit forces a correspondingly SMALLER stabilizer (and vice versa), for the same group acting on different elements — the two quantities are never free to vary independently.

## Component 4 — Worked Examples

Throughout, let $G=D_3=\{e,r,r^2,s,sr,sr^2\}$ ($|G|=6$, the dihedral group from `math.abst.normal-subgroup`) act on $X=\{1,2,3\}$ (the three vertices of an equilateral triangle), where $r$ cyclically rotates $1\to2\to3\to1$ and $s$ fixes vertex $1$ while swapping $2\leftrightarrow3$.

**Example 1 (LO1 — verifying both axioms directly, breaking MC-1)**: Identity axiom: $e\cdot1=1$ (identity fixes every vertex) ✓. Compatibility axiom, checked for $g=r,h=s,x=1$: $s\cdot1=1$ (by definition of $s$), so $r\cdot(s\cdot1)=r\cdot1=2$. Separately, $(rs)\cdot1$: composing functions ($rs$ means "apply $s$ first, then $r$"), $(rs)(1)=r(s(1))=r(1)=2$ — MATCHES $r\cdot(s\cdot1)=2$ exactly, confirming the compatibility axiom for this specific case.

**Example 2 (LO2 — orbit, stabilizer, and the stabilizer's subgroup structure, breaking MC-2)**: Orbit of vertex $1$: $G\cdot1=\{e\cdot1,r\cdot1,r^2\cdot1,s\cdot1,sr\cdot1,sr^2\cdot1\}=\{1,2,3,1,\ldots\}=\{1,2,3\}$ (all three vertices reachable, since $D_3$ acts transitively on a triangle's vertices). Stabilizer of vertex $1$: $G_1=\{g\in G: g\cdot1=1\}=\{e,s\}$ (only the identity and the reflection fixing vertex $1$ leave it in place; the rotations $r,r^2$ move it, and the other reflections don't fix it either). Verify $G_1=\{e,s\}$ is a genuine subgroup: contains $e$ ✓; closed under the operation ($s\cdot s=s^2=e\in G_1$) ✓; closed under inverses ($s^{-1}=s\in G_1$) ✓ — a legitimate order-$2$ subgroup.

**Example 3 (LO3 — Orbit-Stabilizer verified numerically, breaking MC-3)**: $|Gx|=|\{1,2,3\}|=3$. $|G_x|=|\{e,s\}|=2$. Product: $3\times2=6=|G|=|D_3|$ ✓ — EXACTLY matching the Orbit-Stabilizer theorem's prediction. The orbit size ($3$) and stabilizer size ($2$) are not independently chosen numbers — their product is forced to equal $|G|=6$, for this or any other element's orbit-stabilizer pair under this same action.

## Component 5 — Teaching Actions

### Teaching Action A01 — Both Axioms Must Be Verified (Primitive P11: Representation Shift)

State: "a group action needs BOTH the identity axiom AND the compatibility axiom — checking one alone doesn't confirm the other, exactly like verifying any function's defining properties one at a time." Work Example 1's explicit check of both axioms for $D_3$ acting on the triangle's vertices.

- **MC-1 hook**: ask "if a map G×X→X satisfies the identity axiom, is that enough to confirm it's a genuine group action?" — a "yes" answer reveals MC-1 (missing that compatibility must ALSO be verified independently).

### Teaching Action A02 — The Stabilizer Is Always a Genuine Subgroup (Primitive P11: Representation Shift)

State: "$G_x$ isn't just some collection of elements that happen to fix $x$ — it's guaranteed to be a genuine subgroup, by the same closure/identity/inverse logic `math.abst.group-theory` already established." Work Example 2's full orbit and stabilizer computation, explicitly verifying the subgroup axioms for $G_1$.

- **MC-2 hook**: ask "is the stabilizer G_x just an arbitrary subset of G, or is it guaranteed to have extra structure?" — an "arbitrary subset" answer reveals MC-2 (missing that the stabilizer is always a genuine subgroup).

### Teaching Action A03 — Orbit and Stabilizer Sizes Are Linked, Not Independent (Primitive P06: Contrast Pair)

Present Example 3's direct verification: $|Gx|\cdot|G_x|=3\times2=6=|G|$, exactly. State: "these two numbers are never free to vary independently — their product is always forced to equal $|G|$, no matter which element you compute the orbit and stabilizer for."

- **MC-3 hook**: ask "are the orbit size and stabilizer size of an element independent quantities, unrelated to each other?" — a "yes" answer reveals MC-3 (missing the Orbit-Stabilizer theorem's precise multiplicative constraint).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. For the same $D_3$ action on $\{1,2,3\}$, compute the orbit and stabilizer of vertex $2$.
  2. Verify the Orbit-Stabilizer theorem numerically using your answer to problem 1.
  3. Explain why the stabilizer of any element under a group action is guaranteed to contain the identity element.
  4. Explain why a map satisfying only the identity axiom (but failing compatibility for some specific $g,h,x$) is not a genuine group action.
- **P76 (Transfer Probe, mode = independence)**: "A puzzle designer models a Rubik's-cube-like puzzle's set of possible moves as a group $G$ acting on the set $X$ of possible configurations. (a) Explain what the orbit of the solved configuration represents in this context (referencing which configurations are reachable). (b) Explain what the stabilizer of the solved configuration represents (referencing which move-sequences leave the solved state unchanged), and why this stabilizer is guaranteed to be a genuine subgroup of $G$, not just an arbitrary collection of moves. (c) If the puzzle designer discovers the orbit of the solved configuration is very large, explain, using the Orbit-Stabilizer theorem, what this implies about the size of the stabilizer, relative to $|G|$."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ONLY-ONE-GROUP-ACTION-AXIOM-VERIFIED | Believing verifying only the identity axiom (or only compatibility) is sufficient to confirm a genuine group action, missing that BOTH must hold | Foundational |
| MC-2 | STABILIZER-ASSUMED-ARBITRARY-SUBSET | Believing the stabilizer G_x is just an arbitrary subset of G, missing that it is always guaranteed to be a genuine subgroup | Foundational |
| MC-3 | ORBIT-AND-STABILIZER-SIZES-ASSUMED-INDEPENDENT | Believing orbit size and stabilizer size are independent, unrelated quantities, missing the Orbit-Stabilizer theorem's precise multiplicative constraint | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Only One Group Action Axiom Verified") → P41 (detect: ask a student to verify a proposed action and check whether they stop after confirming only one axiom) → P64 (conceptual shift: re-walk Example 1's explicit dual verification, re-anchoring on "both axioms are independently required — checking one says nothing about the other").
- **B02 (targets MC-2)**: P27 (name it: "Stabilizer Assumed Arbitrary Subset") → P41 (detect: ask a student whether the stabilizer of an element is guaranteed to have subgroup structure, and check for a "no") → P64 (conceptual shift: re-walk Example 2's explicit subgroup verification for $G_1$, re-anchoring on "the stabilizer always contains e, is closed under the operation, and closed under inverses — a genuine subgroup, every time").
- **B03 (targets MC-3)**: P27 (name it: "Orbit and Stabilizer Sizes Assumed Independent") → P41 (detect: ask a student whether orbit size and stabilizer size could be any two arbitrary numbers, and check for a "yes") → P64 (conceptual shift: re-walk Example 3's numerical verification (3×2=6=|G|), re-anchoring on "their product is forced to equal |G| exactly — a genuine multiplicative constraint, not two independent facts").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.abst.group-theory` (the group axioms and subgroup-verification framework this concept's stabilizer directly reuses), `math.found.function-set-theoretic` (the verify-by-checking-specific-cases procedure this concept's axiom verification directly reuses).
- **Unlocks**: `math.abst.sylow-theorems` (uses group actions and the Orbit-Stabilizer theorem as core machinery).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 6 with an expert/apply tag places this at a "3 TAs + gate" tier — A01 (both axioms verified), A02 (orbit/stabilizer computation and the stabilizer's subgroup structure), and A03 (the Orbit-Stabilizer theorem's constraint) each target a distinct LO, appropriate for a concept combining two already-mastered frameworks (group axioms, function verification) into one new structure plus one genuinely new counting theorem.
- All three worked examples deliberately reuse the SAME concrete group, $D_3$, acting on the same set of $3$ triangle vertices — directly reusing `math.abst.normal-subgroup`'s own $D_3$ setup (with its established $r,s$ relations) rather than introducing a fresh group, keeping cross-concept continuity intact and letting one fully worked concrete case carry every LO.
- $D_3$ acting on its own triangle's vertices was deliberately chosen (over an abstract or symbolic-only treatment) specifically because it gives a small, fully hand-verifiable instance of the Orbit-Stabilizer theorem (3×2=6), directly checkable without needing a larger or more abstract group.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: specific D3 action verified before the general definition) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
