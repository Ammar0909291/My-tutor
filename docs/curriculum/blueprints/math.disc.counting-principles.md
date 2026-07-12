# Teaching Blueprint — math.disc.counting-principles

## Component 0 — Metadata
concept_id: math.disc.counting-principles
concept_name: Counting Principles
blueprint_version: 1.0
spec_version: Teaching Blueprint Specification v1.0
status: PACKAGE_READY
difficulty: developing
bloom: apply
estimated_hours: 3
mastery_threshold: 0.95
CPA_entry_stage: C
requires: [math.arith.multiplication, math.found.set-theory]
cross_links: []
P76_mode: independence

---

## Component 1 — Cognitive Map

**Core concept:** Two fundamental counting principles. Multiplication principle: if task A can be done in m ways and task B in n ways independently, then A followed by B can be done in m×n ways. Addition principle: if task A can be done in m ways or task B in n ways (mutually exclusive), then either A or B can be done in m+n ways.

**Conceptual progression:**
1. The question "how many ways?" requires distinguishing AND (sequential/independent) from OR (exclusive-choice) scenarios.
2. Multiplication principle: independent sequential tasks multiply their counts.
3. Addition principle: mutually exclusive choices add their counts.
4. Extension: the multiplication principle chains across more than two tasks (m₁×m₂×…×mₖ for k independent sequential choices).

**CPA arc (entry: C):**
- Concrete: physical objects — shirt-and-trousers combinations laid out on a table; a tree diagram of all meal+drink pairs; a lock with digit wheels
- Pictorial: systematic tree diagrams; 2D grids showing all pairs; tables of combinations
- Abstract: multiplication principle formula m×n; addition principle formula m+n; n-stage extension m₁×m₂×…×mₖ

**Prior knowledge activated:** multiplication as repeated addition; set theory (sets are collections with distinct elements; union and intersection); finite cardinality of sets

**Threshold concept:** The AND/OR distinction — recognising whether choices are made sequentially-and-independently (→ multiply) or as one-among-mutually-exclusive-options (→ add). This single classification step determines which principle applies.

---

## Component 2 — Misconception Registry

### MC-1: ADDITION-NOT-MULTIPLICATION [FOUNDATIONAL]
**Description:** Learner adds m+n for sequential independent tasks instead of multiplying m×n.
**Surface form:** Given 4 shirts and 3 trousers, says there are 4+3=7 outfit combinations.
**Root cause:** Intuitively treats "two things" as additive; has not yet grasped that each shirt pairs with EVERY trouser, generating a Cartesian product rather than a union.
**Trigger condition:** Any problem where two or more independent sequential selections are made.
**Repair target:** TA-B01.

### MC-2: MULTIPLICATION-NOT-ADDITION
**Description:** Learner multiplies m×n for mutually exclusive choices instead of adding m+n.
**Surface form:** A café offers 5 hot or 3 cold drinks. Learner says 5×3=15 total choices (as if ordering both).
**Root cause:** Over-applies the multiplication principle from the first MC; conflates "choosing one from each" with "choosing one from either."
**Trigger condition:** Any problem where choices are exclusive (only one category can be selected).
**Repair target:** TA-B02.

### MC-3: INDEPENDENCE-IGNORED
**Description:** Learner applies the multiplication principle without verifying that tasks are independent (i.e., that the number of ways to do task B does not depend on how task A was done).
**Surface form:** Given 5 flavours and 3 toppings where one topping is "no topping," multiplies 5×3 but then adds 5 for the no-topping case again (double-counting).
**Root cause:** Applies the formula mechanically without checking whether the same option appears in multiple stages.
**Trigger condition:** Problems where choices at one stage affect available choices at another.
**Repair target:** TA-B02.

---

## Component 3 — Scaffolding Protocol

**Entry diagnostic:** Present: "A coin is flipped and a die is rolled. How many outcomes are possible?" If correct (12) → begin TA-A01. If learner says 8 (addition error) → TA-B01.

**Scaffolding ladder:**
1. Tree diagram for two small sets (2 shirts × 2 trousers) — count leaves directly
2. Extend tree to 4×3 — observe counting the grid instead of drawing all branches
3. Generalise to m×n for independent sequential choices
4. Contrast with a menu: "choose one main or one dessert" — tree shows OR structure, branches don't combine

**Pacing gate:** Must score ≥ 5/5 on P91 to earn mastery credit (MAMR = 95%).

---

## Component 4 — Protocol A (Main Instruction Path)

### TA-A01 — Multiplication Principle
**Primitive sequence:** P03 → P49

**P03 — ANALOGY BRIDGE:**
> "Imagine planning an outfit. You have 3 shirts (red, blue, green) and 4 trousers (black, grey, white, navy). How many complete outfits can you make? You can pair red with any of 4 trousers — that's 4 outfits. Blue with any of 4 — another 4. Green with any of 4 — another 4. Total: 4+4+4 = 3×4 = 12 outfits."

Concrete anchor: Draw the 3×4 grid. Each row is a shirt; each column is a trouser; each cell is an outfit. Count cells: 12.

Formal statement — Multiplication Principle: If task A can be done in m ways and task B can be done in n ways, and B's options don't depend on which A is chosen (independent), then the number of ways to do BOTH A and B is m×n.

Chain extension: add a 2-option belt → 12×2 = 24 outfits. Add a k-stage: m₁×m₂×…×mₖ.

Addition Principle contrast: now instead of shirt AND trousers, you're choosing ONE item to wear for a warm day — either ONE of 3 shirts or ONE of 4 shorts (mutually exclusive). Now there's no pairing — just 3+4=7 choices.

Key distinction: **AND → multiply; OR (mutually exclusive) → add.**

**P49 — ADAPTIVE CHECKPOINT:**
"A lock has 4 position wheels. The first has 3 symbols, the second has 5 symbols, the third has 4 symbols, and the fourth has 6 symbols. How many possible lock combinations are there?"

- CORRECT (3×5×4×6=360): "Exactly — 4 independent sequential choices multiply: 3×5×4×6=360." → TA-A02
- PARTIAL (multiplied some but not all stages): "Good start — continue chaining: once you have the product of the first k stages, multiply by stage k+1. All 4 stages: 3×5×4×6=360." → TA-A02
- INCORRECT (added: 3+5+4+6=18): "You've added, but each wheel is chosen independently AND sequentially — every symbol on wheel 1 can pair with every symbol on wheel 2. The count is 3×5×4×6=360." → TA-B01
- NO_RESPONSE: "Each wheel is independent. Wheel 1: 3 choices. For each of those 3, wheel 2 gives 5 — so 3×5=15. For each of those 15, wheel 3 gives 4 — so 15×4=60. For each of those 60, wheel 4 gives 6 — so 60×6=360." → TA-A02

---

### TA-A02 — Both Principles in Context
**Primitive sequence:** P07 → P49

**P07 — WORKED EXAMPLE PAIR:**

*Worked Example 1: Pure multiplication principle*
A username must consist of 1 letter (A–Z) followed by 1 digit (0–9). How many distinct usernames exist?
Stage 1: 26 choices (letters). Stage 2: 10 choices (digits). Independent and sequential → 26×10 = 260 usernames.

*Worked Example 2: Addition principle correctly applied*
A school board votes for a field trip. Students can go to Museum A (1 option), Museum B (1 option), or choose from 5 parks. A student can only go to ONE destination. How many destination choices are there?
Museum A, Museum B, or one of 5 parks — mutually exclusive single choices: 1+1+5=7.

*Counter-example trap:* If the same problem asked "how many ways can a student visit A museum AND a park," the answer is 2×5=10 (multiplication). The word "and" vs. "or" is the cue.

**P49 — ADAPTIVE CHECKPOINT:**
"A café menu offers 5 hot drinks and 3 cold drinks. A customer orders one drink. How many choices does the customer have?"

- CORRECT (5+3=8): "Right — the customer picks ONE drink. Hot or cold: mutually exclusive. Addition: 5+3=8." → TA-A03
- PARTIAL (added correctly but labelled it as multiplication principle): "Your arithmetic is right. The reason it's addition is that the customer picks only ONE item from two mutually exclusive categories — not one from each." → TA-A03
- INCORRECT (5×3=15): "15 would be the number of ways to order both a hot drink AND a cold drink. But the customer orders only ONE. Hot and cold are mutually exclusive — apply addition: 5+3=8." → TA-B02
- NO_RESPONSE: "The customer picks exactly one drink. Options are: any of 5 hot drinks, or any of 3 cold drinks. Picking a hot drink and picking a cold drink can't both happen — they're exclusive. So total: 5+3=8." → TA-A03

---

### TA-A03 — Mastery Gate (P91)
**Primitive sequence:** P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

MAMR: 95% → PASS requires ⌈0.95 × 5⌉ = 5/5 (4 P77 items + 1 P76 item).

**P77 — MULTI-PROBLEM SET (4 items):**

Item 1: A wardrobe has 4 shirts and 3 pairs of trousers. How many shirt-and-trouser outfits are possible? [Answer: 4×3=12]
Item 2: A café offers 5 hot drinks and 3 cold drinks. A customer chooses exactly one drink. How many options? [Answer: 5+3=8]
Item 3: A lock has 3 digit wheels each with digits 0–9. How many different lock combinations exist? [Answer: 10×10×10=1000]
Item 4: True or False — if there are 4 routes from A to B and 6 routes from B to C, there are 10 routes from A to C via B. [Answer: FALSE — it's 4×6=24; the routes are chosen sequentially and independently]

**P55 — SCORE:** Record items correct out of 4.

**P76 — TRANSFER PROBE (independence mode — cross_links: []):**
A school prints ID cards with the format [capital letter][capital letter][digit] (e.g., AB7).

(a) How many distinct ID cards are possible? [Answer: 26×26×10=6760]
(b) How many ID cards have the letter 'M' as the first character? [Answer: 1×26×10=260]
(c) How many ID cards have the first two characters the SAME letter (e.g., AA3, BB5)? [Answer: 26×1×10=260 — second letter must match first, leaving only 1 choice for position 2]
(d) Are the ID cards in (b) and (c) mutually exclusive? Could a card satisfy both? [Answer: Yes — MA5 satisfies (b) (first letter M) but NOT (c) (first two letters are M and A, not the same). MM7 satisfies (c) (MM) and also (b) (first letter M). So they OVERLAP — not mutually exclusive. You cannot simply add the counts.]

**P55 — SCORE:** Record P76 correct (1) or incorrect (0).

**P75 — MASTERY ASSESSMENT:** Total score = P77 score + P76 score (max 5).

**P55 — SCORE:** Final score out of 5.

**P74 — ROUTING DECISION:**
- Score 5/5 → PASS → P78 COMPLETION
- Score < 5/5 → FAIL → Route to TA-B01 (multiplication-as-addition errors) or TA-B02 (addition-as-multiplication / independence errors)

**P55 — SCORE:** Log routing outcome.

**P78 — COMPLETION:**
> "Counting principles: mastered. You can correctly identify when to multiply (AND, sequential-independent) and when to add (OR, mutually exclusive), chain the multiplication principle across multiple stages, and recognise when sets overlap making simple addition invalid. This is the foundation of all combinatorics."

---

## Component 5 — Protocol B (Repair Path)

### TA-B01 — Repair: Addition-Not-Multiplication
**Primitive sequence:** P27 → P41 → P64

**P27 — MISCONCEPTION NAMING:**
> "The error here is ADDITION-NOT-MULTIPLICATION. When choosing a shirt AND trousers, some learners add 4+3=7 instead of multiplying 4×3=12. This misses that each shirt can be paired with every trouser — that's a Cartesian product, not a union."

**P41 — MISCONCEPTION DETECTOR:**
> "Draw the tree: for shirt RED, you can pair with BLACK, GREY, WHITE, NAVY — that's 4 outfits from RED alone. For shirt BLUE: another 4. For shirt GREEN: another 4. Total leaves = 4+4+4 = 3×4 = 12. Adding 3+4=7 would give you the number of items in the wardrobe, not the number of combinations."

**P64 — CONCEPTUAL SHIFT:**
> "The word AND signals that both choices must be made. Every choice at stage 1 multiplies by every available choice at stage 2. The tree has m×n leaves, not m+n. Think of the grid: 3 rows × 4 columns = 12 cells."

→ TA-A02

---

### TA-B02 — Repair: Multiplication-Not-Addition / Independence-Ignored
**Primitive sequence:** P27 → P41 → P64

**P27 — MISCONCEPTION NAMING:**
> "Two related errors: MULTIPLICATION-NOT-ADDITION (multiplying m×n when choices are mutually exclusive — you're picking ONE item, not one from each category) and INDEPENDENCE-IGNORED (applying multiplication without checking if one stage's count depends on another stage's outcome)."

**P41 — MISCONCEPTION DETECTOR:**
> "Café problem: 5 hot, 3 cold. You pick ONE drink. If you could order a hot AND cold, you'd have 5×3=15 combinations. But you can't — you pick either hot OR cold. The 5 hot options and 3 cold options don't pair up; they're separate choices. Count: 5+3=8."

**P64 — CONCEPTUAL SHIFT:**
> "The OR signal means mutually exclusive. Ask: 'Am I choosing one from EACH group, or one from EITHER group?' If choosing one from EACH → multiply. If choosing one from EITHER (not both) → add. For independence: check if stage B's options change depending on what stage A was. If they do, the count at stage B varies — list cases separately rather than applying one fixed multiplication."

→ TA-A02

---

## Component 6 — P89 Spaced Repetition Schedule

```
P89:
  concept_id: math.disc.counting-principles
  MAMR: 0.95
  intervals: [1, 3, 7, 14, 30]
  session_1_probe: "A sandwich shop offers 4 breads, 5 fillings, and 3 sauces. How many sandwiches?"
  session_3_probe: "A team jersey comes in 6 colours or 3 patterns (not both). How many options?"
  session_7_probe: "A password has 2 letters then 3 digits. How many passwords have no repeated digits?"
  session_14_probe: "How many 3-letter words (repeated letters allowed) can be formed from A–Z?"
  session_30_probe: "Explain when the multiplication and addition principles each apply. Give an original example of each."
```

---

## Component 7 — Cross-Blueprint Dependencies

**Requires (prerequisites with blueprints):**
- math.arith.multiplication — multiplication as repeated addition; m×n operation [BLUEPRINT EXISTS]
- math.found.set-theory — sets and cardinality; Cartesian product concept [BLUEPRINT EXISTS]

**Unlocks:**
- math.disc.combinatorics — permutations and combinations (extend counting to ordered/unordered selections)

**Cross-links:** [] — no Tier 1 cross-links.

**GR-8 satisfied:** all prerequisite and unlock relationships documented.
**GR-9 satisfied:** P76 independence mode applied (cross_links empty).

---

## Component 8 — Teaching Notes

**Pedagogical priority:** The AND/OR distinction (TA-A01, P03) must be established before any formula is applied. Learners who memorise "multiply for counting problems" without the AND/OR classifier will produce MC-2 errors consistently.

**Tree diagrams:** Always show the tree for small examples before jumping to the formula. The tree makes visible that m×n counts the leaves, not the branches.

**Language cues:** train learners to look for words like "and," "followed by," "then" (→ multiply) versus "or," "either," "choose one" (→ add). These are the surface markers for the underlying structural distinction.

**V-3 check (CPA_ENTRY=C for developing difficulty):** TA-A01 opens with the outfit-and-grid concrete anchor before introducing the formal statement — V-3 satisfied.

**GR-10 — MAMR enforcement:** MAMR = 95%. A learner who scores 4/5 on the P91 gate does NOT receive mastery credit and routes to repair (TA-B01 or TA-B02), then retakes the gate. A score of 5/5 is required.

---

## Component 10 — Validation Checklist

### Grammar Rules
- [x] GR-1: TA-A01 opens with P03 (B-category primitive for developing/apply)
- [x] GR-2: Each non-gate TA (A01, A02) contains P49
- [x] GR-3: TA-A03 is terminal (P91 contains P74 → P78 PASS or repair branch)
- [x] GR-4: Repair TAs B01 and B02 open with P27 + P41 + P64
- [x] GR-6: P91 is terminal within TA-A03; no further TAs follow PASS
- [x] GR-7: P76 present in TA-A03 (mastery gate)
- [x] GR-8: Cross-blueprint dependencies documented in Component 7
- [x] GR-9: cross_links = [] → P76 independence mode applied; probe uses ID-card context
- [x] GR-10: MAMR = 95% stated; PASS threshold = 5/5 enforced in P74 routing

### Structural Validators
- [x] V-1: concept_id matches KG entry (math.disc.counting-principles)
- [x] V-2: difficulty=developing, bloom=apply, h=3, thresh=0.95 match KG
- [x] V-3: CPA_ENTRY=C (developing difficulty → concrete entry); TA-A01 opens with outfit-grid concrete anchor
- [x] V-4: All 3 MCs have FOUNDATIONAL flag on MC-1 only
- [x] V-5: P03 correctly anchors TA-A01 (analogy bridge for outfit-grid)
- [x] V-6: P07 present in TA-A02 (bloom=apply requires worked example pair)
- [x] V-7: P91 structure complete: P77(4 items)→P55→P76→P55→P75→P55→P74→P55→P78
- [x] V-8: PASS criterion: ⌈0.95 × 5⌉ = 5/5 — 4 P77 items + 1 P76 = n=5
- [x] V-9: P74 routes PASS → P78, FAIL → TA-B01 or TA-B02
- [x] V-10: All repair TAs (B01, B02) terminate by routing back to a main TA
- [x] V-11: P49 has four branches (CORRECT/PARTIAL/INCORRECT/NO_RESPONSE) in each TA
- [x] V-12: P77 items are distinct, non-repetitive, cover multiplication, addition, chain, and T/F facets
- [x] V-13: P76 probe is genuine transfer (ID card format with overlap analysis, not textbook repetition)
- [x] V-14: Spaced repetition schedule (P89) present with 5 intervals
- [x] V-15: Component 7 documents requires, unlocks, cross_links explicitly
- [x] V-16: TA chain is lean for h=3 (2 main TAs + gate — within spec)
- [x] V-17: MCs link to repair TAs in Component 2
- [x] V-18: P49 NO_RESPONSE branch gives complete worked demonstration
- [x] V-19: P78 completion statement summarizes what mastery enables
- [x] V-20: Teaching Notes (Component 8) include MAMR restatement and V-3 check note

### AIR Assessment
- Actionable: P49 branches provide specific re-routing and feedback for each response type ✓
- Irreversible: AND/OR distinction established concretely before any formula; tree diagram grounds the multiplication principle ✓
- Robust: Lean TA chain matches h=3 scope; P91 gate enforces 95% threshold ✓

**STATUS: PACKAGE_READY**
