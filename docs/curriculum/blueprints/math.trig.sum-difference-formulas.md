# Teaching Blueprint: Sum and Difference Formulas (`math.trig.sum-difference-formulas`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.trig.sum-difference-formulas` |
| name | Sum and Difference Formulas |
| domain | Trigonometry |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 6 |
| requires | `math.trig.trig-identities` |
| unlocks | `math.trig.double-angle-formulas` |
| cross_links | none |
| CPA_entry_stage | P (Pictorial) — two points on the unit circle at angles A and B, with the chord between them, before the algebraic derivation |
| description (KG) | sin(A±B) = sinAcosB ± cosAsinB; cos(A±B) = cosAcosB ∓ sinAsinB; fundamental for deriving all other trig identities. |

## Component 1 — Learning Objectives

- LO1: **Derive** $\cos(A-B)=\cos A\cos B+\sin A\sin B$ from the unit-circle distance formula — filling the exact gap `math.trig.trig-identities` explicitly deferred (that concept stated the formulas and used them, but its own Teaching Notes name the derivation "beyond this concept's scope") — then obtain $\cos(A+B)$, $\sin(A+B)$, and $\sin(A-B)$ from it via substitution and the cofunction relationship.
- LO2: Derive the **cofunction identities** ($\sin(90°-\theta)=\cos\theta$, $\cos(90°-\theta)=\sin\theta$) as a direct special case of the difference formulas, recognizing them as a CONSEQUENCE of the sum/difference formulas rather than a separate, unrelated fact to memorize.
- LO3: Use the sum/difference formulas as a **foundation to derive a further identity** (the product-to-sum formula $\sin A\cos B=\frac12[\sin(A+B)+\sin(A-B)]$), directly demonstrating the KG's own framing of these formulas as "fundamental for deriving all other trig identities" — refuting the misconception that the sum/difference formulas are merely one more item on a list of formulas to apply, rather than a generative foundation other identities are built from.

## Component 2 — Prerequisite Check

Assumes mastery of `math.trig.trig-identities` (which already STATES and APPLIES the sum/difference formulas $\sin(A\pm B)$, $\cos(A\pm B)$ for exact-value computation and double-angle derivation, explicitly deferring their formal derivation) and, within it, the Pythagorean identity $\sin^2\theta+\cos^2\theta=1$.

## Component 3 — Core Explanation

**Explicit division of labor with `math.trig.trig-identities`**: that prerequisite concept already fully covers USING the sum/difference formulas — computing exact values like $\cos(75°)$ by decomposing into known angles, and deriving the double-angle formulas by substituting $B=A$. This concept does **not** re-teach that application content. Instead, it fills the SPECIFIC gap that concept's own Teaching Notes name directly: deriving the formulas from first principles, rather than merely stating and using them.

**Deriving $\cos(A-B)$ from the unit-circle distance formula**: place two points on the unit circle, $P=(\cos A,\sin A)$ and $Q=(\cos B,\sin B)$. The straight-line distance between them can be computed TWO ways. First, directly via the distance formula: $PQ^2 = (\cos A-\cos B)^2+(\sin A-\sin B)^2 = \cos^2A-2\cos A\cos B+\cos^2B+\sin^2A-2\sin A\sin B+\sin^2B = 2-2\cos A\cos B-2\sin A\sin B$ (using the Pythagorean identity twice to collapse $\cos^2A+\sin^2A=1$ and $\cos^2B+\sin^2B=1$). Second, via the Law of Cosines applied to the triangle formed by $P$, $Q$, and the origin (two sides of length $1$, with included angle $A-B$ between them): $PQ^2 = 1^2+1^2-2(1)(1)\cos(A-B) = 2-2\cos(A-B)$. Setting the two expressions for $PQ^2$ equal: $2-2\cos A\cos B-2\sin A\sin B = 2-2\cos(A-B)$, which simplifies directly to $\cos(A-B)=\cos A\cos B+\sin A\sin B$.

**Obtaining the other three formulas from this one**: substituting $B\to-B$ into the just-derived formula (using $\cos(-B)=\cos B$ and $\sin(-B)=-\sin B$, already known even-odd properties) gives $\cos(A+B)=\cos A\cos B-\sin A\sin B$. Using the cofunction relationship $\sin\theta=\cos(90°-\theta)$: $\sin(A+B) = \cos(90°-(A+B)) = \cos((90°-A)-B) = \cos(90°-A)\cos B+\sin(90°-A)\sin B = \sin A\cos B+\cos A\sin B$ (substituting the cofunction identities themselves, derived next in LO2). Substituting $B\to-B$ into this gives $\sin(A-B)=\sin A\cos B-\cos A\sin B$.

**A generative foundation — deriving further identities**: adding the two sine formulas, $\sin(A+B)+\sin(A-B) = 2\sin A\cos B$, gives directly the **product-to-sum formula** $\sin A\cos B = \frac12[\sin(A+B)+\sin(A-B)]$ — a genuinely new identity, obtained purely by algebraic combination of the sum/difference formulas, with no additional geometric argument required. This is a direct demonstration of the KG's own description: these formulas are not just one more computational tool, but the generative starting point other identities are algebraically derived from.

## Component 4 — Worked Examples

**Example 1 (LO1 — the full unit-circle derivation of cos(A-B))**: Following Component 3's argument exactly: two points $P=(\cos A,\sin A)$, $Q=(\cos B,\sin B)$ on the unit circle, distance computed both via the coordinate distance formula (giving $2-2\cos A\cos B-2\sin A\sin B$, using the Pythagorean identity twice) and via the Law of Cosines on the origin-$P$-$Q$ triangle (giving $2-2\cos(A-B)$). Equating and simplifying yields $\cos(A-B)=\cos A\cos B+\sin A\sin B$ — the ONE formula from which all others in this family follow.

**Example 2 (LO2 — deriving the cofunction identities as a direct consequence)**: Using the just-derived $\cos(A-B)=\cos A\cos B+\sin A\sin B$ with $A=90°$: $\cos(90°-B) = \cos90°\cos B+\sin90°\sin B = 0\cdot\cos B+1\cdot\sin B = \sin B$. So $\cos(90°-B)=\sin B$ — the cofunction identity, obtained as a PURE special case (setting $A=90°$) of the general difference formula, not as an independent geometric fact requiring its own separate argument.

**Example 3 (LO3 — deriving the product-to-sum formula, breaking MC-1)**: A student who has memorized $\sin(A+B)$ and $\sin(A-B)$ as two separate, disconnected facts might not realize they can be COMBINED to produce new information. Adding them directly: $\sin(A+B)+\sin(A-B) = [\sin A\cos B+\cos A\sin B]+[\sin A\cos B-\cos A\sin B] = 2\sin A\cos B$. Dividing by $2$: $\sin A\cos B = \frac12[\sin(A+B)+\sin(A-B)]$ — a genuinely useful NEW identity (converting a product into a sum, useful in integration and signal processing), obtained purely by adding two already-known formulas together — no new geometric argument, no new memorization, just algebraic combination of what's already established.

## Component 5 — Teaching Actions

### Teaching Action A01 — Deriving cos(A−B) From the Unit Circle, Filling the Deferred Gap (Primitive P11: Representation Shift)

State directly: "in `math.trig.trig-identities`, you used these formulas but were told their derivation was deferred. Here's that derivation." Work Example 1's full two-ways-to-compute-distance argument, emphasizing the Law of Cosines step as the key geometric input.

### Teaching Action A02 — Cofunction Identities as a Special Case, Not a Separate Fact (Primitive P11: Representation Shift)

State: "the cofunction identity $\cos(90°-B)=\sin B$ isn't a new geometric fact you need to memorize separately — it falls right out of the difference formula the moment you plug in $A=90°$." Work Example 2's direct substitution.

### Teaching Action A03 — Combining Formulas to Generate New Identities (Primitive P28: Conflict Evidence)

Present Example 3's direct demonstration: adding $\sin(A+B)$ and $\sin(A-B)$ produces the product-to-sum formula immediately, with no new derivation required. State: "these formulas aren't just tools for computing one exact value at a time — add or subtract them together, and you generate entirely NEW identities for free. This is exactly what the KG description means by 'fundamental for deriving all other trig identities.'"

- **MC-1 hook**: ask "are the sum and difference formulas mainly useful one at a time, for computing individual exact values?" — a "yes" answer reveals MC-1 (treating the formulas as isolated computational tools rather than recognizing their generative role — combining them algebraically produces further identities directly).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Following Example 1's argument, re-derive $\cos(A-B)$ using the unit-circle distance formula, showing both computations of $PQ^2$ explicitly.
  2. Using the difference formula, derive the SINE cofunction identity $\sin(90°-B)=\cos B$ (parallel to Example 2's cosine version).
  3. Subtract $\sin(A-B)$ from $\sin(A+B)$ (rather than adding, as in Example 3) to derive a DIFFERENT product-to-sum-style identity, showing your algebra explicitly.
  4. Explain, in your own words, why deriving the cofunction identities as a special case of the difference formula is preferable to memorizing them as an unrelated separate fact.
- **P76 (Transfer Probe, mode = independence)**: "A signal-processing engineer needs to simplify the product $\cos(3t)\sin(5t)$ appearing in a signal analysis, converting it into a sum of sines and cosines (rather than a product) for further processing. (a) Using the same combination technique from Example 3 (adding or subtracting the sum/difference formulas), derive a product-to-sum identity for $\cos A\sin B$ (note: this is $\cos$ times $\sin$, not $\sin$ times $\cos$ as in Example 3 — work out whether the same combination or a different one is needed). (b) Apply your derived identity to simplify $\cos(3t)\sin(5t)$ into a sum of two sine (or cosine) terms. (c) Explain why being able to DERIVE this identity on the spot (rather than needing to have it memorized as a separate formula) is a direct benefit of understanding the sum/difference formulas as a generative foundation, per this lesson's framing."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | SUM-DIFFERENCE-FORMULAS-TREATED-AS-ISOLATED-COMPUTATIONAL-TOOLS | Viewing the sum/difference formulas as useful only one at a time for computing individual exact values, missing their generative role as a foundation other identities can be algebraically derived from | Foundational |
| MC-2 | COFUNCTION-IDENTITIES-MEMORIZED-AS-SEPARATE-UNRELATED-FACTS | Treating the cofunction identities ($\sin(90°-\theta)=\cos\theta$, etc.) as independent facts to memorize, rather than recognizing them as a direct special case ($A=90°$) of the difference formula | Foundational |
| MC-3 | LAW-OF-COSINES-STEP-IN-THE-DERIVATION-SKIPPED-OR-MISAPPLIED | Failing to correctly apply the Law of Cosines to the origin-P-Q triangle (e.g. using the wrong angle, or omitting the step entirely and asserting the formula without derivation) | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Sum-Difference-Formulas-as-Isolated-Tools View") → P41 (detect: ask a student whether the sum/difference formulas have any use beyond computing one exact value at a time) → P64 (conceptual shift: re-walk Example 3's direct derivation of the product-to-sum formula by simply adding two already-known formulas together, re-anchoring on "combine them algebraically and you generate NEW identities for free").
- **B02 (targets MC-2)**: P27 (name it: "Cofunction Identities Memorized Separately") → P41 (detect: ask a student to explain WHY $\cos(90°-B)=\sin B$ is true, checking whether they can derive it or only recite it) → P64 (conceptual shift: re-walk Example 2's direct substitution $A=90°$ into the difference formula, re-anchoring on "this isn't a separate geometric fact — it's what the difference formula says when you plug in a specific angle").
- **B03 (targets MC-3)**: P27 (name it: "Law-of-Cosines Derivation Step Skipped") → P41 (detect: ask a student to derive $\cos(A-B)$ from scratch and check whether they correctly set up the Law of Cosines with the included angle $A-B$) → P64 (conceptual shift: re-walk Example 1's full derivation step by step, re-anchoring on "the triangle formed by the origin and the two unit-circle points has two sides of length 1 and an included angle of exactly $A-B$ — that's the geometric fact the Law of Cosines step depends on").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.trig.trig-identities` (which already states and applies the sum/difference formulas for exact-value computation and double-angle derivation — this concept exclusively supplies the formal derivation that concept's own Teaching Notes explicitly defer, avoiding any duplication of that concept's application-focused content).
- **Unlocks**: `math.trig.double-angle-formulas` (though note: `math.trig.trig-identities`'s own LO3 already derives the double-angle formulas as an application of the sum formulas — a genuine KG-level content overlap between these two downstream concepts that a future revision of `math.trig.double-angle-formulas` will need to explicitly address via its own division-of-labor statement, since the Canonical KG v1 is frozen and this corpus does not modify it).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 6 with a proficient/apply tag places this at a "3 TAs + gate" tier — A01 (the unit-circle derivation), A02 (cofunction identities as a special case), and A03 (generating new identities by combination) each target a distinct LO, appropriate for a concept whose entire content is filling a specific, previously-flagged derivation gap.
- **Explicit division of labor with `math.trig.trig-identities`** (stated directly in Component 3): that concept already fully owns APPLYING the sum/difference formulas (exact-value computation, double-angle derivation) — its own Teaching Notes explicitly state the formulas' "full derivation via rotation matrices or geometric construction is deferred as beyond this concept's scope." This blueprint supplies exactly that deferred derivation, and its Examples/Teaching Actions deliberately avoid re-deriving exact values like $\cos(75°)$ or double-angle formulas already covered there.
- A genuine content-overlap risk was identified and flagged explicitly (Component 7): the KG has `math.trig.trig-identities` deriving double-angle formulas as ITS OWN application (LO3) while ALSO listing this concept as unlocking `math.trig.double-angle-formulas` as a separate future concept. Since the Canonical KG v1 is frozen and not subject to modification by this corpus, this note flags the issue for whoever authors `math.trig.double-angle-formulas` next, so that future blueprint can make its own explicit division-of-labor decision (likely: focus on the RIGOROUS derivation of all three cosine double-angle forms and half-angle formulas, rather than re-teaching the basic substitution already shown in `math.trig.trig-identities`).

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (overlap risk explicitly flagged in Component 7/8) |
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
| V-15 | CPA_entry_stage justified | PASS (Pictorial: two unit-circle points and their chord before the algebraic derivation) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
