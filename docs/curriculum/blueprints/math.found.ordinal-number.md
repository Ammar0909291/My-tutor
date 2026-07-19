# Teaching Blueprint: Ordinal Number (`math.found.ordinal-number`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.found.ordinal-number` |
| name | Ordinal Number |
| domain | Foundations |
| difficulty | expert |
| bloom | analyze |
| mastery_threshold | 0.7 → MAMR = ⌈0.7×5⌉ = 4/5 |
| estimated_hours | 12 |
| requires | `math.found.set-theory-axiomatic` |
| unlocks | `math.found.cardinal-arithmetic` |
| cross_links | (none) |
| CPA_entry_stage | C (Concrete) — begins with explicit von Neumann constructions of 0,1,2,3 before the transfinite extension |
| description (KG) | A generalization of natural numbers to describe the order type of well-ordered sets, extending counting into the transfinite. |

## Component 1 — Learning Objectives

- LO1: Construct **von Neumann ordinals** purely from set theory — each ordinal IS the set of all smaller ordinals ($0=\varnothing$, $1=\{0\}$, $2=\{0,1\}$, $3=\{0,1,2\}$, …) — recognizing this requires no new primitive notion beyond `math.found.set-theory-axiomatic`'s own already-mastered machinery.
- LO2: Extend counting into the **transfinite** via $\omega$ (the first infinite ordinal, the set of all finite ordinals) and its successors $\omega+1,\omega+2,\dots$ — and recognize that ordinal ADDITION is **NOT commutative**: $1+\omega=\omega$, yet $\omega+1\ne\omega$.
- LO3 *(orientation-level, given the exceptional scope of this concept)*: Distinguish ordinals (**order type** of a well-ordered set) from cardinals (**size**) — recognizing $\omega$ and $\omega+1$ are DIFFERENT ordinals yet have the SAME cardinality, a divergence with no finite analogue.

## Component 2 — Prerequisite Check

Assumes mastery of `math.found.set-theory-axiomatic` (ZFC's Axiom of Separation and restricted comprehension; sets built purely from set-theoretic operations).

## Component 3 — Core Explanation

**Each ordinal is literally the set of all smaller ordinals — no new primitive required**: the von Neumann construction defines $0=\varnothing$ (the empty set, containing no smaller ordinals — correctly, since there are none), and each subsequent ordinal as the set of ALL ordinals that came before it: $1=\{0\}$, $2=\{0,1\}$, $3=\{0,1,2\}$, and so on. Membership itself encodes the ordering: $2\in3$ exactly because $2<3$. This is a purely set-theoretic construction, built entirely from operations already mastered in `math.found.set-theory-axiomatic` — no separate "counting number" primitive is introduced.

**Ordinals extend counting past every finite number, and addition is order-dependent**: $\omega$, the set of ALL finite ordinals $\{0,1,2,3,\dots\}$, is itself a genuine ordinal — the first INFINITE one. Beyond it come $\omega+1,\omega+2,\dots$, and eventually $\omega+\omega=\omega\cdot2$, and so on, extending "counting" indefinitely into the transfinite. Crucially, ordinal addition is NOT commutative: adding a finite number BEFORE an infinite sequence ($1+\omega$) just reproduces the same infinite pattern shifted, giving $\omega$ back exactly; but adding AFTER ($\omega+1$) genuinely creates a new element beyond the entire infinite sequence, giving a strictly LARGER ordinal.

**Ordinals track order type; cardinals track size — these diverge in the infinite**: an ordinal describes the ORDER TYPE of a well-ordered set (every nonempty subset has a least element) — a structural, positional notion. A cardinal describes SIZE (cardinality) — how many elements, with no reference to order. For finite sets these coincide (a set with $n$ elements has both ordinal and cardinal "size" $n$), but they genuinely diverge once infinite: $\omega$ and $\omega+1$ are different ORDINALS (different order types — $\omega+1$ has a distinguished "last" element, $\omega$ does not) yet have the identical CARDINALITY.

## Component 4 — Worked Examples

**Example 1 (LO1 — explicit von Neumann construction, breaking MC-1)**: $0=\varnothing$ (empty set). $1=\{0\}=\{\varnothing\}$ (a set containing exactly the one smaller ordinal, $0$). $2=\{0,1\}=\{\varnothing,\{\varnothing\}\}$ (containing both smaller ordinals). $3=\{0,1,2\}$. Verify: is $2\in3$? YES, since $3=\{0,1,2\}$ literally lists $2$ as a member — this membership relation IS the ordering "$2<3$," constructed entirely from sets already mastered, with no separate counting primitive introduced.

**Example 2 (LO2 — ordinal addition is not commutative, breaking MC-2)**: $\omega=\{0,1,2,3,\dots\}$, the set of all finite ordinals, the first infinite ordinal. Compute $1+\omega$: informally, placing one element BEFORE the $\omega$-sequence and then continuing through all of $\omega$ still produces an $\omega$-length sequence with the same order type — $1+\omega=\omega$. Now compute $\omega+1$: placing one element AFTER the entire $\omega$-sequence gives $\omega+1=\{0,1,2,\dots,\omega\}$ — this set contains $\omega$ itself as its top element, something $\omega$ itself never contains (no finite ordinal or $\omega$ has "itself" as a member of a set with that exact structure) — $\omega+1\ne\omega$; it is strictly LARGER. So $1+\omega=\omega$ but $\omega+1\ne\omega$ — ordinal addition is order-dependent, not commutative.

**Example 3 (orientation-level — ordinals and cardinals diverge, breaking MC-3)**: $\omega$ (order type of $\{0,1,2,\dots\}$) and $\omega+1$ (order type of $\{0,1,2,\dots,\omega\}$) are DIFFERENT ordinals — Example 2 already showed $\omega+1$ is strictly larger. Yet both have the identical CARDINALITY: a bijection exists mapping $\omega+1$'s elements to $\omega$'s (send the "extra" top element $\omega$ to $0$, and shift every finite element up by one position) — both are countably infinite, $|\omega|=|\omega+1|=\aleph_0$. Order type and size are genuinely different notions, agreeing for finite sets but diverging here.

## Component 5 — Teaching Actions

### Teaching Action A01 — Ordinals Are Built Purely From Sets, No New Primitive (Primitive P11: Representation Shift)

State: "each ordinal literally IS the set of all smaller ordinals — membership encodes order directly, with no separate 'counting number' concept introduced from outside set theory." Work Example 1's explicit construction of $0,1,2,3$.

- **MC-1 hook**: ask "does defining ordinals require introducing some new primitive notion beyond ordinary sets?" — a "yes" answer reveals MC-1 (missing that each ordinal is purely the set of smaller ordinals, built entirely from already-mastered set-theoretic machinery).

### Teaching Action A02 — 1 + ω = ω, But ω + 1 ≠ ω (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: $1+\omega=\omega$ (adding before doesn't change the pattern) while $\omega+1\ne\omega$ (adding after creates a genuinely new top element). State: "ordinal addition genuinely depends on order — adding a finite number before an infinite sequence is invisible, but adding after it creates something new."

- **MC-2 hook**: ask "is ordinal addition commutative, the way ordinary number addition is?" — a "yes" answer reveals MC-2 (missing the order-dependent asymmetry between $1+\omega$ and $\omega+1$).

### Teaching Action A03 — Order Type and Size Diverge in the Infinite (Primitive P06: Contrast Pair)

Contrast $\omega$ and $\omega+1$: genuinely DIFFERENT ordinals (different order types, per Example 2), yet the SAME cardinality (per Example 3's explicit bijection). State: "ordinals and cardinals coincide for finite sets, but they measure genuinely different things — order type versus size — and these split apart once you go infinite."

- **MC-3 hook**: ask "are 'ordinal' and 'cardinal' just two names for the same underlying notion of counting?" — a "yes" answer reveals MC-3 (missing that ordinals track order type while cardinals track size, and these diverge in the infinite).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Construct the von Neumann ordinal $4$ explicitly, listing its elements.
  2. Explain why $\omega+2\ne\omega$, using the same reasoning as Example 2's $\omega+1$ case.
  3. Compute (informally) $2+\omega$, and explain why it equals $\omega$, not some larger ordinal.
  4. Explain why $\omega$ and $\omega\cdot2$ (i.e., $\omega+\omega$) have the same cardinality despite being different ordinals.
- **P76 (Transfer Probe, mode = independence)**: "A computer scientist studying well-ordered data structures encounters a sequence indexed first by all natural numbers, then followed by one additional special 'terminator' element after all of them. (a) Using this lesson's ordinal framework, identify the order type of this indexed structure (in terms of $\omega$), and explain why it is NOT simply $\omega$ itself. (b) A colleague argues 'since both this structure and the plain natural numbers are countably infinite, they must have the exact same order type as well as the same size.' Explain specifically why this argument conflates two different notions. (c) The colleague also proposes that ordinal addition should be commutative 'since all forms of addition in mathematics ultimately behave the same way.' Using the $1+\omega$ vs. $\omega+1$ example, explain why this general claim is false for ordinals."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ORDINALS-ASSUMED-TO-NEED-NEW-PRIMITIVE | Believing ordinals require a new primitive notion beyond ordinary sets, missing that each ordinal is purely the set of smaller ordinals | Foundational |
| MC-2 | ORDINAL-ADDITION-ASSUMED-COMMUTATIVE | Believing ordinal addition is commutative like ordinary addition, missing the order-dependent asymmetry between 1+ω and ω+1 | Foundational |
| MC-3 | ORDINAL-AND-CARDINAL-CONFLATED | Believing "ordinal" and "cardinal" are the same notion, missing that they diverge in the infinite (ω and ω+1 differ as ordinals but share a cardinality) | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Ordinals Assumed to Need New Primitive") → P41 (detect: ask a student whether defining ordinals requires introducing a new counting primitive, checking for "yes") → P64 (conceptual shift: re-walk Example 1's explicit set-theoretic construction of 0,1,2,3, re-anchoring on "each ordinal is literally the set of smaller ordinals").
- **B02 (targets MC-2)**: P27 (name it: "Ordinal Addition Assumed Commutative") → P41 (detect: ask a student whether 1+ω equals ω+1, checking for "yes") → P64 (conceptual shift: re-walk Example 2's contrast, re-anchoring on "adding before is invisible; adding after creates something genuinely new").
- **B03 (targets MC-3)**: P27 (name it: "Ordinal and Cardinal Conflated") → P41 (detect: ask a student whether ω and ω+1, being 'the same size,' must also be the same ordinal, checking for "yes") → P64 (conceptual shift: re-walk Example 3's explicit bijection alongside the order-type distinction, re-anchoring on "order type and size are different notions that diverge in the infinite").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.found.set-theory-axiomatic` (the Axiom of Separation and set-theoretic machinery this concept's von Neumann construction is built entirely from).
- **Unlocks**: `math.found.cardinal-arithmetic` (deepens the cardinal-vs-ordinal distinction this concept introduces at orientation level, into a full theory of infinite cardinalities).
- **Cross-link**: KG lists no cross_links for this concept (checked via `ls docs/curriculum/blueprints/` before setting P76_mode — none to check). $P76_{mode}=$ **independence**.

## Component 8 — Teaching Notes

- estimated_hours = 12 with an expert/analyze tag places this among the corpus's larger concepts; per established precedent for capstone-scale concepts, LO1 and LO2 receive full concrete worked-example depth while LO3 (the ordinal/cardinal distinction) is deliberately kept at ORIENTATION level, previewing rather than fully developing the cardinal-arithmetic theory `math.found.cardinal-arithmetic` (the unlocks target) will cover in depth.
- **Division of labor**: `math.found.set-theory-axiomatic` owns ZFC's axioms and restricted comprehension in general. This concept, `math.found.ordinal-number`, deliberately does not re-derive that framework; it owns the SPECIFIC von Neumann construction, the transfinite extension of counting, and the order-type/size distinction that motivates treating cardinals as their own separate concept.
- Example 3's use of $\omega$ vs. $\omega+1$ (rather than a more exotic pair) was deliberately chosen to directly build on Example 2's own already-established asymmetry, letting a single concrete pair of ordinals carry both the "different order type" point (LO2) and the "same cardinality" point (LO3) without introducing new unfamiliar ordinals.

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
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.7×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: explicit von Neumann constructions of 0,1,2,3 before the transfinite extension) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3 orientation-level) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
