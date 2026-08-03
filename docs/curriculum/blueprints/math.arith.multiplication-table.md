# Teaching Blueprint: Multiplication Table (`math.arith.multiplication-table`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.arith.multiplication-table` |
| name | Multiplication Table |
| domain | Arithmetic |
| difficulty | foundational |
| bloom | remember |
| mastery_threshold | 0.95 → MAMR = ⌈0.95×5⌉ = 5/5 |
| estimated_hours | 8 |
| requires | `math.arith.multiplication` |
| unlocks | (none in KG) |
| cross_links | (none) |
| CPA_entry_stage | P (Pictorial) — array/grid models before pure memorized recall |
| description (KG) | The memorized table of products for integers 1 through 12, enabling rapid mental multiplication. |

## Component 1 — Learning Objectives

- LO1: Instantly recall any product of two integers from 1 through 12 (e.g. $7\times8=56$) without re-deriving it by repeated addition.
- LO2: Exploit the table's symmetry ($a\times b=b\times a$) to halve the effective memorization load.
- LO3: Use known "anchor" facts (e.g. $\times10$, $\times5$, squares) to quickly reconstruct a forgotten or uncertain product rather than resorting to full repeated addition.

## Component 2 — Prerequisite Check

Assumes mastery of `math.arith.multiplication` (what multiplication means and computes) — this concept is the MEMORIZED, instant-recall layer built on top of that conceptual understanding.

## Component 3 — Core Explanation

The **multiplication table** is the complete set of products $a\times b$ for integers $a,b$ from 1 to 12, held in memory for instant recall rather than re-derived by repeated addition each time. Fluency here is foundational because nearly every later arithmetic and algebraic procedure (long multiplication, division, fraction operations, factoring) assumes these facts are available instantly, not computed from scratch.

Two structural properties reduce the effective memorization burden: **commutativity** ($a\times b=b\times a$, so $7\times8$ and $8\times7$ are the SAME fact, not two to memorize) and **anchor facts** (multiples of 10, multiples of 5, and perfect squares are typically the fastest-learned and can help reconstruct nearby products, e.g. $7\times8 = 7\times10 - 7\times2 = 70-14=56$).

## Component 4 — Worked Examples

**Example 1 (LO1 — instant recall)**: Asked "$9\times7$?", state $63$ immediately, without counting $9+9+9+9+9+9+9$ or any other derivation.

**Example 2 (LO2 — commutative symmetry, breaking MC-1)**: A student who has memorized $6\times4=24$ but hesitates on $4\times6$ has not yet internalized that these are the IDENTICAL fact reordered — $4\times6=24$ automatically, by commutativity, requiring no separate memorization. Practicing "half the table" (all pairs with $a\le b$) and relying on symmetry for the rest is a legitimate, load-halving strategy, not a shortcut to be suspicious of.

**Example 3 (LO3 — anchor-fact reconstruction)**: If $7\times8$ is momentarily uncertain, reconstruct it from the well-known $\times10$ anchor: $7\times8 = 7\times(10-2) = 7\times10-7\times2=70-14=56$. This is FASTER and more reliable than recounting from scratch, and reinforces the underlying distributive structure rather than treating each fact as an isolated, arbitrary item.

## Component 5 — Teaching Actions

### Teaching Action A01 — Grid/Array Model Before Pure Recall (Primitive P11: Representation Shift)

Present a $12\times12$ array grid, having the student locate specific products as rectangular array areas (e.g. a $7$-by-$8$ grid of dots, counted in groups, equals $56$) before transitioning to flash-card-style instant recall drilling of the same facts.

- **MC-1 hook**: present $4\times6$ immediately after drilling $6\times4$ to fluency, and observe whether the student re-derives it from scratch or recognizes it instantly as the same fact (revealing MC-1: treating $a\times b$ and $b\times a$ as two independent facts requiring separate memorization).

### Teaching Action A02 — Anchor Facts Reconstruct Uncertain Ones (Primitive P06: Contrast Pair)

Contrast a slow, uncertain recall attempt at $7\times8$ against the fast anchor-based reconstruction from Example 3 ($7\times10-7\times2$), showing the anchor method arrives at the same answer far more reliably than guessing or hesitating. State the rule: "when a fact isn't instantly certain, a nearby $\times10$ or $\times5$ anchor plus a quick adjustment beats guessing."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.95×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. State the products $9\times6$, $8\times12$, $11\times7$, $12\times12$ instantly (timed recall).
  2. Given that $9\times7=63$ is memorized, state $7\times9$ without re-deriving, and explain why no new memorization was needed.
  3. Reconstruct $6\times9$ using a $\times10$ or $\times5$ anchor fact, showing the adjustment step.
  4. Identify which of a list of 6 products are perfect squares (e.g. $6\times6$, $8\times8$) and state their values from memory.
- **P76 (Transfer Probe, mode = independence)**: "A student has memorized all products where the smaller factor is 1 through 6, but has not yet drilled products where BOTH factors are 7 through 12 (e.g. $9\times11$). (a) Using commutativity, explain which products in the full 1-12 table this student can already answer instantly despite not directly memorizing them. (b) For a product like $9\times11$ that isn't covered by either the memorized range or commutativity, propose an anchor-fact reconstruction strategy (e.g. using $9\times10$) to compute it quickly."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | COMMUTATIVE-PAIRS-TREATED-AS-SEPARATE-FACTS | Re-memorizing or hesitating on $b\times a$ after already mastering $a\times b$, not recognizing they are the identical fact by commutativity | Moderate |
| MC-2 | ANCHOR-RECONSTRUCTION-ARITHMETIC-ERROR | Making an arithmetic slip during anchor-based reconstruction (e.g. miscomputing the adjustment amount), producing a wrong final product despite a sound strategy | Moderate |
| MC-3 | SQUARE-PRODUCTS-TREATED-AS-UNRELATED-TO-NON-SQUARE-NEIGHBORS | Not recognizing that a known square (e.g. $7\times7=49$) can anchor a NEARBY non-square product (e.g. $7\times8=49+7=56$), missing this reconstruction shortcut | Minor |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Commutative Pairs Treated as Separate Facts") → P41 (detect: present Example 2's $6\times4$/$4\times6$ pair and check for hesitation or re-derivation on the second) → P64 (conceptual shift: display both as the SAME array grid rotated 90°, showing the total dot count is unchanged regardless of orientation).
- **B02 (targets MC-2)**: P27 ("Anchor Reconstruction Arithmetic Error") → P41 (detect: review a submitted anchor-based reconstruction attempt for an arithmetic slip in the adjustment step) → P64 (re-walk Example 3's reconstruction line by line, verifying each intermediate subtraction/addition explicitly).
- **B03 (targets MC-3)**: P27 ("Square Anchors Not Used for Neighbors") → P41 (detect: ask the student to reconstruct $7\times8$ given that $7\times7=49$ is already known; check whether they use this specific anchor or default to a $\times10$ approach instead) → P64 (conceptual shift: demonstrate $7\times8=7\times7+7=49+7=56$, naming squares as an additional class of anchor fact alongside $\times10$/$\times5$).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.arith.multiplication`.
- **Unlocks**: none recorded in the KG.
- **Related**: informally a prerequisite skill for `math.arith.long-multiplication` and `math.arith.long-division` (both assume instant single-digit product recall within their column procedures).

## Component 8 — Teaching Notes

- estimated_hours = 8 and mastery_threshold = 0.95 (the highest threshold among this batch) reflect that this is a pure fluency/automaticity target — every later multi-digit procedure assumes these 144 facts are available with near-zero latency, so even small recall gaps compound heavily downstream.
- MC-1 was ranked the most significant misconception because failing to exploit commutativity roughly DOUBLES the effective memorization burden for no benefit — it is a purely wasted cognitive investment, not merely a stylistic inefficiency.
- Anchor-fact reconstruction (Teaching Action A02, MC-2/MC-3) was deliberately emphasized as a FALLBACK strategy for the small number of facts that remain shaky after drilling, rather than a substitute for memorization — the goal remains instant recall, with anchoring reserved as a fast recovery path, not the primary retrieval method.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.arith.multiplication`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk | PASS (none declared) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.95×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: array grids before pure recall) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
