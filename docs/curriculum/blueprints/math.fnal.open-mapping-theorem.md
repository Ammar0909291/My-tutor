# Teaching Blueprint: Open Mapping Theorem (`math.fnal.open-mapping-theorem`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.fnal.open-mapping-theorem` |
| name | Open Mapping Theorem |
| domain | Functional Analysis |
| difficulty | expert |
| bloom | understand |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.fnal.banach-space`, `math.fnal.bounded-operator` |
| unlocks | `math.fnal.closed-graph-theorem` |
| cross_links | `math.real.baire-category` |
| CPA_entry_stage | A (Abstract) — expert learner already fluent in Banach spaces and bounded operators; the theorem's hypotheses are checked directly against concrete cases |
| description (KG) | A surjective bounded linear operator between Banach spaces is open (images of open sets are open). Consequence: a bijective bounded linear operator has a bounded inverse. Proved using the Baire category theorem. |

## Component 1 — Learning Objectives

- LO1: State the Open Mapping Theorem precisely — a **surjective** bounded linear operator $T:X\to Y$ between **Banach spaces** is **open** (images of open sets are open) — correctly distinguishing "open" (IMAGES of open sets are open) from continuity/boundedness (PREIMAGES of open sets are open, already guaranteed for every bounded operator) — the opposite direction.
- LO2: Apply the key corollary — a **bijective** bounded linear operator between Banach spaces has a **bounded inverse** — recognizing this as a genuinely surprising "automatic continuity" result, and correctly identifying that **completeness of BOTH spaces** is essential to it, via a concrete counterexample when completeness fails.
- LO3 *(orientation-level, given the theorem's proof depends on the Baire Category theorem, itself not yet authored)*: Recognize that the theorem's proof genuinely relies on completeness through the **Baire Category theorem**, without deriving that argument in full.

## Component 2 — Prerequisite Check

Assumes mastery of `math.fnal.banach-space` (complete normed vector space) and `math.fnal.bounded-operator` ($T$ bounded iff $\|T\|=\sup_{\|x\|\le1}\|Tx\|<\infty$, equivalently continuous everywhere).

## Component 3 — Core Explanation

**"Open" is about images, the opposite direction from continuity**: `math.fnal.bounded-operator` already established that every bounded linear operator is continuous — meaning PREIMAGES of open sets are open ($T^{-1}(\text{open})$ is open). The Open Mapping Theorem concerns the OPPOSITE direction: whether IMAGES of open sets are open ($T(\text{open})$ is open) — a genuinely different, stronger property that does NOT hold for every bounded operator; it specifically requires $T$ to be SURJECTIVE and both $X,Y$ to be Banach (complete).

**Completeness of BOTH spaces is essential to the bounded-inverse corollary**: the theorem's most quoted consequence — a bijective bounded linear operator $T:X\to Y$ between Banach spaces automatically has a BOUNDED inverse $T^{-1}$ — is a genuinely surprising fact: mere bijectivity and boundedness of $T$ force boundedness of $T^{-1}$ too, with no separate argument needed. This relies critically on completeness: a bijective bounded linear operator between merely NORMED (incomplete) spaces can fail to have a bounded inverse.

**The proof uses the Baire Category theorem, which itself needs completeness**: the Open Mapping Theorem's proof shows that some ball in $Y$ is covered by countably many scaled translates of $T$'s image of a ball in $X$, and applies the Baire Category theorem (a deep fact: a complete metric space cannot be written as a countable union of nowhere-dense sets) to conclude one of these translates has nonempty interior, forcing openness. This machinery genuinely requires BOTH $X$ and $Y$ to be complete — dropping completeness anywhere breaks the argument, exactly matching why the bounded-inverse corollary fails without it.

## Component 4 — Worked Examples

**Example 1 (LO1 — open vs. continuous are opposite directions, and surjectivity is essential, breaking MC-1 and MC-3)**: Let $T:\mathbb{R}^2\to\mathbb{R}^2$, $T(x,y)=(x,0)$ — a bounded linear PROJECTION, but NOT surjective (its image is only the $x$-axis, not all of $\mathbb{R}^2$). $T$ is certainly continuous (bounded, so preimages of open sets are open — already guaranteed). But is $T$ OPEN? Take the open unit disk $D$ in $\mathbb{R}^2$: $T(D)$ is the open interval $(-1,1)$ on the $x$-axis, EMBEDDED in $\mathbb{R}^2$ — this set has EMPTY INTERIOR in $\mathbb{R}^2$ (it is only 1-dimensional), so it is NOT an open subset of the codomain $\mathbb{R}^2$. $T$ fails to be open, precisely because it is not surjective — confirming surjectivity is a genuinely necessary hypothesis, and confirming "open" (images of open sets) is a different, stronger property from continuity (preimages of open sets), which $T$ already satisfies.

**Example 2 (LO2 — completeness is essential to the bounded-inverse corollary, breaking MC-2)**: Let $X=c_{00}$, the space of finitely-supported sequences, with the sup norm — a normed space that is NOT complete (NOT Banach; it is a dense but proper subspace of the complete space $c_0$). Define $T:c_{00}\to c_{00}$ by $T(x_1,x_2,x_3,\dots)=(x_1,x_2/2,x_3/3,\dots)$ — linear, bounded ($\|Tx\|\le\|x\|$), and bijective onto $c_{00}$ (its own image). The inverse is $T^{-1}(x_1,x_2,x_3,\dots)=(x_1,2x_2,3x_3,\dots)$. Testing on $e_n'=(0,\dots,1/n,\dots,0)$ (the $n$-th standard basis vector scaled by $1/n$, so $\|e_n'\|=1/n$): $T^{-1}(e_n')=(0,\dots,n\cdot(1/n),\dots,0)=e_n$, with $\|T^{-1}(e_n')\|=1$. The ratio $\|T^{-1}(e_n')\|/\|e_n'\|=1/(1/n)=n\to\infty$ as $n\to\infty$ — $T^{-1}$ is UNBOUNDED, despite $T$ being a bijective bounded linear operator. This does NOT contradict the theorem's corollary, because $c_{00}$ with the sup norm is NOT complete — exactly the missing hypothesis.

**Example 3 (orientation-level — the Baire Category theorem is the essential completeness-dependent tool, breaking any residual assumption that the theorem's power is "free")**: the theorem's proof genuinely uses the Baire Category theorem — a complete metric space cannot be covered by countably many nowhere-dense sets — applied to $Y$ (and implicitly relying on $X$'s completeness too, via the operator's construction) to force some image-ball to have nonempty interior. Example 2's failure, precisely when completeness is dropped, is exactly what this machinery would be unable to guarantee without both spaces being Banach — the deep dependency on completeness is not incidental to the proof technique, but its central engine.

## Component 5 — Teaching Actions

### Teaching Action A01 — Open (Images) Is the Opposite Direction from Continuous (Preimages) (Primitive P11: Representation Shift)

State: "every bounded operator is already continuous — preimages of open sets are open, guaranteed. The Open Mapping Theorem asks the OPPOSITE question: are images of open sets open? — a genuinely different, stronger property." Work Example 1's projection map, continuous but not open.

- **MC-1 hook**: ask "does boundedness (continuity) of a linear operator already guarantee that it maps open sets to open sets?" — a "yes" answer reveals MC-1 (conflating the open-mapping property with continuity, the opposite direction).

### Teaching Action A02 — Surjectivity Is a Genuinely Necessary Hypothesis (Primitive P28: Conflict Evidence)

Present Example 1's direct evidence: the non-surjective projection $T(x,y)=(x,0)$ fails to be open, its image of an open disk having empty interior in the codomain. State: "a bounded linear operator that isn't surjective can genuinely fail to be open — surjectivity isn't a technical footnote, it's required."

- **MC-3 hook**: ask "is every bounded linear operator between Banach spaces automatically open, regardless of whether it is surjective?" — a "yes" answer reveals MC-3 (missing that surjectivity is a necessary hypothesis for the theorem's conclusion).

### Teaching Action A03 — Completeness Is Essential to the Bounded-Inverse Corollary (Primitive P06: Contrast Pair)

Contrast Example 2's failure ($T^{-1}$ unbounded, on the incomplete $c_{00}$) against what the theorem would guarantee on a genuine Banach space. State: "the striking 'bijective + bounded implies bounded inverse' fact genuinely needs BOTH spaces to be complete — drop completeness, and the corollary can fail, exactly as this concrete counterexample shows."

- **MC-2 hook**: ask "does the bounded-inverse corollary hold for any bijective bounded linear operator, even between merely normed (not necessarily complete) spaces?" — a "yes" answer reveals MC-2 (missing that completeness of both spaces is essential to the corollary).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Explain the difference between "T is continuous" and "T is open," in terms of preimages vs. images of open sets.
  2. Give an example (other than the projection in Example 1) of a bounded linear operator that is not open, and explain which hypothesis it fails.
  3. Explain why $T^{-1}$ being unbounded in Example 2 does not contradict the Open Mapping Theorem's corollary.
  4. State all the hypotheses the Open Mapping Theorem requires (spaces, linearity, boundedness, surjectivity), and explain what would need to be verified before applying it to a new operator.
- **P76 (Transfer Probe, mode = independence)**: "A numerical analyst constructs a bijective bounded linear operator $T$ between two normed vector spaces used to model a discretized system, and wants to conclude the inverse operator (needed for solving the system) is automatically bounded. (a) State what additional property of the two spaces must be verified before applying the Open Mapping Theorem's corollary. (b) The analyst discovers one of the spaces is a proper, non-complete subspace of a larger Banach space (analogous to $c_{00}$ inside $c_0$). Using this lesson's counterexample reasoning, explain what could go wrong if the analyst assumes the inverse is bounded anyway. (c) A colleague argues 'since $T$ itself is bounded and bijective, the inverse operator must be given by a perfectly well-defined linear formula, so it should automatically be bounded too, regardless of completeness.' Explain specifically why this argument is incorrect, referencing Example 2's explicit unbounded-ratio computation."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | OPEN-MAPPING-CONFLATED-WITH-CONTINUITY | Believing boundedness/continuity of an operator already guarantees images of open sets are open, missing that this is the opposite direction from continuity's preimage property | Foundational |
| MC-2 | COMPLETENESS-NOT-REQUIRED-FOR-BOUNDED-INVERSE-COROLLARY | Believing the bounded-inverse corollary holds for bijective bounded operators between any normed spaces, missing that completeness of BOTH spaces is essential | Foundational |
| MC-3 | SURJECTIVITY-NOT-REQUIRED-FOR-OPENNESS | Believing every bounded linear operator between Banach spaces is automatically open regardless of surjectivity, missing that surjectivity is a necessary hypothesis | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Open Mapping Conflated with Continuity") → P41 (detect: ask a student whether boundedness alone guarantees an operator is open, checking for "yes") → P64 (conceptual shift: re-walk Example 1's projection map, continuous yet not open, re-anchoring on "open is about images; continuity is about preimages — opposite directions").
- **B02 (targets MC-2)**: P27 (name it: "Completeness Not Required for Bounded-Inverse Corollary") → P41 (detect: ask a student whether the bounded-inverse corollary holds for any normed (not necessarily complete) spaces, checking for "yes") → P64 (conceptual shift: re-walk Example 2's $c_{00}$ counterexample, $T^{-1}$ genuinely unbounded there, re-anchoring on "completeness of both spaces is essential to the corollary").
- **B03 (targets MC-3)**: P27 (name it: "Surjectivity Not Required for Openness") → P41 (detect: ask a student whether every bounded operator between Banach spaces is automatically open, checking for "yes") → P64 (conceptual shift: re-walk Example 1's non-surjective projection failing to be open, re-anchoring on "surjectivity is a genuinely necessary hypothesis").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.fnal.banach-space` (the completeness hypothesis both LO2 and LO3 depend on), `math.fnal.bounded-operator` (the continuity/boundedness property this concept's "open" property is contrasted against).
- **Unlocks**: `math.fnal.closed-graph-theorem` (a related consequence of the same completeness/Baire-category machinery).
- **Cross-link**: KG lists `math.real.baire-category` as a cross-link — **not yet authored** (checked via `ls docs/curriculum/blueprints/` before setting P76_mode). $P76_{mode}=$ **independence**; a future revision may add a genuine cross-link transfer probe once that entry exists, connecting this concept's LO3 orientation-level mention of the Baire Category theorem to that concept's own full treatment.

## Component 8 — Teaching Notes

- estimated_hours = 5 with an expert/understand tag places this at a "3 TAs + gate" tier; LO3 (the Baire Category proof mechanism) is deliberately kept at ORIENTATION level, since `math.real.baire-category` itself is not yet authored — stating the dependency honestly without deriving that theorem's own argument here.
- **Division of labor**: `math.fnal.banach-space` owns completeness; `math.fnal.bounded-operator` owns the continuity/boundedness equivalence. This concept, `math.fnal.open-mapping-theorem`, deliberately does not re-teach either; it owns the NEW "openness" property (the opposite direction from continuity), the surjectivity requirement, and the striking bounded-inverse corollary's genuine dependence on completeness of both spaces.
- Example 2's $c_{00}$ counterexample was deliberately chosen as the standard textbook instance for exactly this purpose (a bijective bounded operator with genuinely unbounded inverse on an incomplete space) rather than an invented example, since it is the most direct, checkable illustration of why completeness cannot be dropped from the corollary.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (math.real.baire-category unauthored → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already fluent in prerequisites; hypotheses checked directly against concrete cases) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3 orientation-level) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
