<!-- BLUEPRINT: math.arith.number-line -->
<!-- STATUS: PACKAGE_READY -->
<!-- SPEC VERSION: 1.0 -->

# Teaching Blueprint: Number Line
**Concept ID:** `math.arith.number-line`
**KG Fields:** difficulty=foundational | bloom=understand | estimated_hours=4 | mastery_threshold=0.9

---

## Component 0 — Metadata

| Field | Value |
|-------|-------|
| concept_id | math.arith.number-line |
| name | Number Line |
| difficulty | foundational |
| bloom | understand |
| estimated_hours | 4 |
| mastery_threshold | 0.9 |
| CPA_entry_stage | C (Concrete) |
| requires (Tier-1) | math.arith.counting |
| cross_links | math.geom.coordinate-plane (Tier 1) |
| P76_mode | cross-link probe |
| MAMR | 5/5 (⌈0.9 × 5⌉) |

---

## Component 1 — Cognitive Map

### Prior Knowledge Anchors
- **math.arith.counting**: the counting sequence $1,2,3,\ldots$ — the number line extends this sequence into a continuous geometric picture with direction and an origin, and (later) negative numbers

### Target Knowledge State
Student can correctly order numbers by their POSITION on the number line (further right = larger, further left = smaller), including negative numbers, WITHOUT relying on magnitude/absolute-value comparisons; correctly distinguish a number's DISTANCE from zero (its magnitude) from its actual ORDER on the line, recognizing a number far to the left (a very negative number) is SMALLER, not larger, despite having a large magnitude; and correctly recognize the number line is CONTINUOUSLY filled with numbers (including fractions and decimals between any two marked integers), not merely a sequence of isolated integer points with empty gaps between them.

### Conceptual Obstacles
1. Ordering negative numbers by their magnitude instead of their position — believing $-5$ is "bigger" than $-2$ because "5 is bigger than 2," rather than recognizing $-5$ sits FURTHER LEFT than $-2$ on the line, making it the SMALLER number ($-5<-2$)
2. Confusing a number's distance from zero (its magnitude/absolute value) with its actual order — treating "further from zero" as automatically "greater," which fails for negative numbers (very negative numbers are far from zero AND small, not large)
3. Treating the number line as containing only the marked integer points, with genuine gaps in between — missing that the line is CONTINUOUSLY filled with numbers (every fraction and decimal has its own exact position), the integers being merely convenient, evenly-spaced markers on an otherwise unbroken line

---

## Component 2 — Misconception Registry

| ID | Label | Description | Trigger |
|----|-------|-------------|---------|
| MC-1 | NEGATIVE-ORDERING-BY-MAGNITUDE | Student orders negative numbers by their magnitude (treating -5 as "bigger" than -2 since 5>2), rather than by their actual left-right position | Any comparison between two negative numbers |
| MC-2 | DISTANCE-FROM-ZERO-DETERMINES-ORDER | Student treats a number's distance from zero as determining its order (bigger distance = "bigger" number), failing for negative numbers | Any comparison involving a large-magnitude negative number against a smaller positive or less-negative number |
| MC-3 | NUMBER-LINE-HAS-GAPS | Student treats the number line as consisting only of marked integer points, with nothing filling the space between them | Any task asking to locate a fraction or decimal between two consecutive integers |

**Foundational Misconception:** MC-1 (NEGATIVE-ORDERING-BY-MAGNITUDE) — it is the single most common and consequential number-line error, since it inverts the entire ordering relationship for half of all integers (every negative number), and it directly enables MC-2 (which is really the same magnitude-based reasoning generalized and misapplied to comparisons that mix negative and positive numbers); a student who orders by magnitude rather than position will misread every subsequent number-line-based concept (inequalities, absolute value, coordinate geometry).

---

## Component 3 — Scaffolding Protocol

**Entry point:** C (Concrete) — foundational learner physically walks/marks positions on a drawn number line, comparing negative positions directly by which is further right, before any magnitude-based shortcut is introduced.

**Scaffolding sequence:**
1. **A01 P11 REPRESENTATION SHIFT** — C: marking and comparing points on a drawn number line, including negatives, by position; P: a picture contrasting position-based and magnitude-based readings; A: the formal ordering rule and the continuous-fill property
2. **A02 P06 CONTRAST PAIR** — $-5$ vs. $-2$ by position, not magnitude (MC-1); a large-magnitude negative vs. a small positive, ordered correctly (MC-2); locating fractions/decimals between integers, filling the "gaps" (MC-3)
3. **A03 P91 Gate** — mastery assessment

---

## Component 4 — Protocol A (Main Teaching Sequence)

### Teaching Action A01 — Position Decides Order, Not Magnitude

**Primitive:** P11 REPRESENTATION SHIFT
**Purpose:** Ground ordering in direct left-right position on a drawn number line, including negatives; state the formal ordering rule and the continuous-fill property

---

**[P11 — REPRESENTATION SHIFT]**

**Stage C — Concrete (a drawn number line, comparing $-5$ and $-2$ by position):**

```
   ←──┬───┬───┬───┬───┬───┬───┬───┬───┬───┬──→
     -6  -5  -4  -3  -2  -1   0   1   2   3
```

Locate $-5$ and $-2$ on the line: $-5$ is FURTHER LEFT than $-2$. Since numbers further LEFT are always SMALLER on the number line: **$-5 < -2$** (negative five is smaller/less than negative two), regardless of the fact that "5" (the magnitude) is bigger than "2."

**Stage P — Pictorial (position-based reading vs. magnitude-based reading, side by side):**

```
   POSITION-BASED (CORRECT):          MAGNITUDE-BASED (WRONG for negatives):
   -5 is further LEFT than -2          "5 > 2, so -5 > -2" ✗
   → -5 < -2 ✓                         (ignores that negative numbers
                                         REVERSE the usual size intuition)
```

**Stage A — Abstract (formal ordering rule and continuous fill):**

**Ordering rule:** for any two numbers $a,b$ on the number line, $a<b$ iff $a$ is positioned to the LEFT of $b$ — this rule applies uniformly to positive numbers, negative numbers, and zero, with no special case needed; magnitude (distance from zero) plays no direct role in deciding order.

**Continuous fill:** between any two marked integers (e.g. 2 and 3), infinitely many other numbers exist and have their own exact position — fractions like $2.5$, $2\frac13$, decimals like $2.7182\ldots$ — the number line has NO gaps; the integers are just convenient, evenly-spaced reference markers on an otherwise unbroken, continuously-filled line.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** Using the number line, determine which is larger: $-8$ or $-3$. State your reasoning in terms of POSITION, not magnitude.

**CORRECT:** $-3$ is larger. Position-based reasoning: $-8$ is further LEFT than $-3$ on the number line (further left = smaller), so $-3$ (positioned further right) is the larger number.
→ "Correct — the position-based reasoning ('further left = smaller') is the reliable method that works for every pair of numbers, not just this specific example." → Proceed to A02.

**PARTIAL:** Student gets the correct answer ($-3$ larger) but justifies it using magnitude ("3 is smaller than 8, so -3 is bigger"), arriving at the right conclusion via reasoning that happens to work here but isn't the reliable general method.
→ "The conclusion is right, but state it via POSITION, not magnitude comparison — magnitude-based reasoning ('smaller magnitude of the negative number = bigger overall') happens to give the right answer for THIS comparison, but it's really shorthand for the position fact: -3 sits further right than -8 on the line. Practicing the position-based justification directly (rather than a magnitude shortcut) will transfer more reliably to comparisons where the shortcut is less obvious."

**INCORRECT:** Student answers "$-8$ is larger, since 8 is bigger than 3" (MC-1).
→ "Check the actual number line: -8 is positioned FURTHER LEFT than -3 (locate both: -8 sits noticeably to the left of -3). Further left always means SMALLER, regardless of the number's magnitude. So -3 (further right) is the larger number, and -8 (further left, despite its bigger '8') is the smaller one. Magnitude and order work in OPPOSITE directions for negative numbers — this is exactly why comparing negatives by magnitude gives the wrong answer."

**NO_RESPONSE:** → "-3 is larger. -8 sits further left than -3 on the number line, and further left always means smaller — so -3 (further right) is the bigger number."

---

### Teaching Action A02 — Magnitude ≠ Order for Negatives; The Line Has No Gaps

**Primitive:** P06 CONTRAST PAIR
**Purpose:** Break MC-2 with a large-magnitude negative compared against a small positive; break MC-3 by explicitly locating fractions/decimals between integers

---

**[P06 — CONTRAST PAIR]**

**Contrast 1 — Large magnitude, but still the smaller number (MC-2):**

Compare $-100$ and $1$. $-100$ has a HUGE magnitude (distance 100 from zero); $1$ has a tiny magnitude (distance 1 from zero). Yet on the number line, $-100$ sits WAY to the left, and $1$ sits just slightly to the right of zero: **$-100 < 1$** — the number with the LARGER magnitude ($-100$) is actually the SMALLER number here, precisely because it's negative. "Bigger distance from zero" and "bigger number" are entirely different, independent properties — a number can be simultaneously "far from zero" (large magnitude) and "small" (very negative), and these two facts don't conflict at all.

**Contrast 2 — The line has no gaps: locating fractions between integers (MC-3):**

Between the integers 3 and 4, the number line is NOT empty — it contains $3.1, 3.25, 3\frac12, 3.9999,\ldots$, and every other real number strictly between 3 and 4, each with its own exact, unique position:

```
   3 ──┬────┬────┬────┬────┬── 4
      3.2  3.4  3.5  3.7  3.9
   (and INFINITELY many more positions exist between any two of these)
```

There is no smallest "gap" or "next number" after 3 — between any two numbers on the line, no matter how close, infinitely many other numbers can always be found positioned strictly between them. The integers are simply a convenient, evenly-spaced set of labeled reference points on a line that is, in reality, completely and continuously filled.

---

**[P49 — ADAPTIVE CHECKPOINT]**

**Prompt:** (a) Compare $-50$ and $2$: which is larger? Justify by position, not magnitude. (b) Is there a number on the line strictly between $5$ and $5.01$? If so, name one.

**CORRECT:** (a) $2$ is larger — $-50$ sits far to the left (very negative), $2$ sits just right of zero; position places $2$ well to the right of $-50$, making it larger despite $-50$'s much bigger magnitude. (b) Yes — e.g. $5.005$ sits strictly between $5$ and $5.01$ (and infinitely many other numbers do too, like $5.001, 5.0099$, etc.).
→ "Correct — (b) confirms the line's continuous-fill property extends even to extremely close pairs of numbers like 5 and 5.01." → Proceed to A03.

**PARTIAL:** Student gets (a) but in (b) hesitates, unsure whether numbers that close together could have anything genuinely "between" them.
→ "However close two DIFFERENT numbers are, there is always room for more numbers between them — this is a defining feature of the (real number) line, not a special case. Between 5 and 5.01, try averaging them: $(5+5.01)/2=5.005$, which sits exactly halfway between and is strictly greater than 5 and strictly less than 5.01. This averaging trick always works to find a number between any two distinct numbers, however close."

**INCORRECT:** Student answers (a) "-50 is larger, since 50 is a much bigger number than 2" (MC-1/MC-2).
→ "Check position, not magnitude: -50 is way out to the LEFT (very negative), while 2 is just slightly to the right of zero. Further left always means smaller — so 2 (positioned far to the right of -50) is the larger number, despite -50 having the bigger magnitude. This is exactly the trap of confusing 'far from zero' with 'a big number' — for negatives, being far from zero means being very SMALL, not large."

**NO_RESPONSE:** → "(a) 2 is larger — -50 sits far left (very negative and small), 2 sits just right of zero. (b) Yes, e.g. 5.005 sits strictly between 5 and 5.01."

---

### Teaching Action A03 — Mastery Gate (P91)

**Primitive:** P91 = P77→P55→P76→P55→P75→P55→P74→P55→P78
**Purpose:** Assess position-based ordering of negatives, magnitude/order discrimination, and continuous-fill recognition under transfer

---

**[P77 — MULTI-PROBLEM SET]** *(4 problems)*

**Problem 1:** Which is larger: $-12$ or $-7$?

*Solution:* $-7$ is larger ($-12$ sits further left).

**Problem 2:** Order these from smallest to largest: $-3, 5, -10, 0$.

*Solution:* $-10, -3, 0, 5$ (left to right on the number line).

**Problem 3:** Which has the larger MAGNITUDE, $-20$ or $6$? Which is the larger NUMBER?

*Solution:* $-20$ has the larger magnitude (20 vs. 6). $6$ is the larger number (position-wise, $6$ is to the right of $-20$).

**Problem 4:** Name a number strictly between $0.4$ and $0.5$.

*Solution:* Many valid answers, e.g. $0.45$ (or $0.41, 0.499$, etc.) — any number strictly between the two.

---

**[P55 — SCORE]**
Count correct responses. Record raw score S₁ (0–4) after P77.

---

**[P76 — TRANSFER PROBE]** *(P76_mode: cross-link probe — math.geom.coordinate-plane)*

**Prompt:** Recall from math.geom.coordinate-plane that the x-axis of the coordinate plane is itself a number line, extended perpendicular to a y-axis (also a number line).

(a) On the coordinate plane, points $A=(-7,0)$ and $B=(3,0)$ both lie on the x-axis. Using the number-line ordering rule (position, not magnitude), which point is further RIGHT — i.e., which has the larger x-coordinate?
(b) A student argues: "Since the coordinate plane has both an x-axis AND a y-axis, and each is 'a number line,' the whole 2D plane must have some overall left-to-right AND up-to-down ordering, similar to how a single number line orders numbers." Evaluate this claim — does "further right" or "further up" alone determine a single, well-defined order for POINTS in the 2D plane the way it does for numbers on ONE number line?
(c) Explain briefly why the number line's "further left = smaller" ordering rule transfers cleanly to comparing x-coordinates (or y-coordinates) separately on the coordinate plane, but does NOT by itself give a way to say one whole POINT $(x_1,y_1)$ is simply "less than" another point $(x_2,y_2)$ in the same total-ordering sense that works for plain numbers.

**Expected solution:**

(a) $B=(3,0)$ has the larger x-coordinate — its x-coordinate (3) is further RIGHT than $A$'s x-coordinate ($-7$) on the (horizontal) number line the x-axis represents, exactly the same position-based reasoning from A01/A02 applied directly to x-coordinates.

(b) The claim is **not correct** as a general ordering of 2D points. While EACH axis individually IS a genuine number line (with a well-defined left-to-right, or up-to-down, order), there is no single, universally agreed "the point further right AND further up is simply bigger" rule that handles ALL pairs of points consistently — e.g. compare $(5,-100)$ and $(-100,5)$: the first is further right (bigger x) but far lower (smaller y); the second is far left (smaller x) but higher (bigger y) — neither point is unambiguously "more right-and-up" than the other in every respect simultaneously, so no single overall order (matching the clean total order that works on one number line) applies to 2D points in general.

(c) The number line's ordering rule is a **one-dimensional** concept — it compares positions along a SINGLE line. The coordinate plane has TWO independent directions (x and y), and the ordering rule transfers perfectly to comparing x-coordinates alone (treating the x-axis as its own number line) or y-coordinates alone (treating the y-axis as its own number line) — but comparing entire POINTS (which combine an x AND a y value together) requires deciding how to weigh or combine two separate, independent number-line comparisons, and there is no single natural way to do this that preserves all the properties of ordinary numerical order (unlike numbers on one line, which have a single, unambiguous total order). This is exactly why "ordering" in 2D (and higher dimensions) requires additional structure or convention (e.g. distance from origin, or specific application-dependent rules) rather than a direct extension of the number line's simple left-right rule.

---

**[P55 — SCORE]**
Record transfer score S₂ (0 or 1) after P76.

Total score S = S₁ + S₂ (max 5).

---

**[P75 — MASTERY ASSESSMENT]**

MAMR: 5/5 (⌈0.9 × 5⌉ = ⌈4.5⌉ = 5)

- S ≥ 5: MASTERY ACHIEVED → proceed to P74
- S = 4: NEAR MASTERY → attempt repair on missed items; re-gate at next session
- S ≤ 3: MASTERY NOT ACHIEVED → execute Protocol B

---

**[P55 — SCORE]**
Record mastery determination (ACHIEVED / NEAR / NOT ACHIEVED).

---

**[P74 — ROUTING DECISION]**

- MASTERY ACHIEVED → unlock math.arith.negative-numbers and math.arith.ordering; record completion
- NEAR MASTERY → flag for Protocol B on specific missed item(s); re-assess next session
- MASTERY NOT ACHIEVED → execute Protocol B immediately

---

**[P55 — SCORE]**
Record routing outcome.

---

**[P78 — COMPLETION]**

Session record: concept math.arith.number-line assessed. Mastery status logged. Student directed to next concept or repair protocol per P74 routing.

---

## Component 5 — Protocol B (Misconception Repair)

### Repair Action B01 — NEGATIVE-ORDERING-BY-MAGNITUDE (MC-1)

**[P27 — MISCONCEPTION NAMING]**
"Ordering negative numbers by magnitude is NEGATIVE-ORDERING-BY-MAGNITUDE. Position on the number line (further left = smaller) determines order, not the size of the number ignoring its sign."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "Which is bigger, -9 or -4?"
- MC-1 response: "-9, since 9 is bigger than 4."

**[P64 — CONCEPTUAL SHIFT]**
"Locate both on the number line: -9 sits further LEFT than -4. Further left always means SMALLER, regardless of magnitude — so -4 (further right) is actually the bigger number, and -9 is the smaller one. The 'bigger digit' intuition works fine for positive numbers, but flips for negatives: a bigger magnitude on a negative number makes it FURTHER left, hence SMALLER."

Practice: Order -15, -3, -8 from smallest to largest using position on the number line.

---

### Repair Action B02 — DISTANCE-FROM-ZERO-DETERMINES-ORDER (MC-2)

**[P27 — MISCONCEPTION NAMING]**
"Treating distance from zero as determining order is DISTANCE-FROM-ZERO-DETERMINES-ORDER. Distance from zero (magnitude) and position-based order are different properties that only agree for positive numbers — they can disagree sharply for negatives."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "-30 is farther from zero than 5. Does that make -30 bigger?"
- MC-2 response: "Yes, since it's farther away."

**[P64 — CONCEPTUAL SHIFT]**
"Being far from zero and being a big number are independent facts. -30 IS far from zero (distance 30), but it's far to the LEFT (very negative), making it a SMALL number — smaller than 5, which is only slightly right of zero. 'Far from zero' only means 'big' when the number is positive; for a negative number, 'far from zero' actually means 'very small' (very negative)."

Practice: Compare -75 and 3: state which has the larger magnitude, and separately which is the larger number, confirming they're different questions with different answers.

---

### Repair Action B03 — NUMBER-LINE-HAS-GAPS (MC-3)

**[P27 — MISCONCEPTION NAMING]**
"Treating the number line as only containing marked integer points is NUMBER-LINE-HAS-GAPS. The line is continuously filled — between any two numbers, however close, infinitely many other numbers exist with their own exact positions."

**[P41 — MISCONCEPTION DETECTOR]**
Diagnostic: "Is there any number between 7 and 8?"
- MC-3 response: "No, 7 and 8 are right next to each other with nothing in between."

**[P64 — CONCEPTUAL SHIFT]**
"Try averaging: $(7+8)/2=7.5$ — a genuine number strictly between 7 and 8. In fact, infinitely many more exist too: 7.1, 7.25, 7.99999, and so on. The integers 7 and 8 are just convenient labeled markers; the actual line between them is completely filled with numbers, with no genuine 'gap' anywhere."

Practice: Name three different numbers strictly between 2 and 2.1, confirming the line remains filled even between very close integers-adjacent decimals.

---

## Component 6 — P89 Spaced Repetition Schedule

**[P89 — SPACED REPETITION]**

| Review | Delay | Focus |
|--------|-------|-------|
| SR-1 | +1 day | Order a fresh set of mixed positive/negative numbers by position |
| SR-2 | +3 days | Compare a fresh large-magnitude negative against a small positive, distinguishing magnitude from order |
| SR-3 | +7 days | Locate a fresh number strictly between two close decimals |
| SR-4 | +14 days | Reconstruct the coordinate-plane transfer probe's argument for why 1D ordering doesn't directly extend to a total order on 2D points |

Retrieval flag: if student orders negatives by magnitude (MC-1) or confuses distance-from-zero with order (MC-2), re-execute B01/B02 before continuing.

---

## Component 7 — Cross-Blueprint Dependencies

**[GR-8: Cross-link documentation]**

| Direction | Concept | Relationship |
|-----------|---------|---------------|
| Requires (Tier-1) | math.arith.counting | Supplies the counting sequence this concept extends into a continuous geometric picture with direction and an origin |
| Unlocks | math.arith.negative-numbers | The number line's leftward extension past zero is exactly where negative numbers are introduced and given meaning |
| Unlocks | math.arith.ordering | The formal ordering rule (position-based comparison) developed here becomes the general theory of that later concept |

**GR-9:** cross_links include math.geom.coordinate-plane (Tier 1) → P76_mode = cross-link probe (probe extends the number line's ordering rule to x-coordinates on the coordinate plane, then examines why the same rule does not directly extend to a total order on full 2D points).

---

## Component 8 — Teaching Notes

**Structural decisions:**
- h=4 → compact structure (2 main TAs + gate), matching other h=4, foundational/understand Tier-2 concepts
- bloom=understand → V-4 = N/A (no P07 required; position-based comparison and location tasks, not derivations)
- CPA_entry = C for a foundational learner: a physically drawn number line, used to compare negative positions directly, anchors position-based reasoning before any magnitude-based shortcut (which fails for negatives) can take hold

**Key teaching insight:** MC-1 is this concept's highest-leverage misconception because it inverts the ordering relationship for EVERY negative number, and the natural whole-number intuition ("bigger digit = bigger number") that serves students perfectly well for positives becomes actively counterproductive once negatives are introduced. A01 and A02 are sequenced to establish position-based reasoning FIRST (via direct number-line marking) before any magnitude-based shortcut is even mentioned, so the correct method is the default, not a correction applied after a wrong habit has formed.

**MC-2 as MC-1 generalized:** MC-2 is really MC-1's underlying error (confusing magnitude with order) generalized to comparisons that mix negative and positive numbers, rather than a wholly separate misconception — A02's Contrast 1 deliberately uses an EXTREME magnitude gap (-100 vs. 1) specifically to make the magnitude/order divergence unmistakable, reinforcing that "far from zero" and "big number" are simply different properties.

**Sequencing note (cross-link):** math.geom.coordinate-plane (Tier 1, already authored) is a genuine, actionable cross-link — the P76 transfer probe extends the number line's ordering rule to x-coordinates directly, then uses the extension's LIMITS (no natural total order on full 2D points) to deepen understanding of exactly what the one-dimensional ordering rule does and does not provide.

---

## Component 10 — Validation Checklist

| Code | Rule | Check | Status |
|------|------|-------|--------|
| V-1 | Concept ID matches KG | math.arith.number-line ✓ | PASS |
| V-2 | All Tier-1 requires have existing blueprints | math.arith.counting ✓ | PASS |
| V-3 | CPA entry = C for foundational difficulty | C (Concrete) ✓ | PASS |
| V-4 | bloom=understand → P07 N/A | bloom=understand; no P07; V-4=N/A ✓ | N/A |
| V-5 | GR-1: A01 opens with B-category primitive | P11 REPRESENTATION SHIFT ✓ | PASS |
| V-6 | GR-2: each non-gate TA has P49 with 4 branches | A01, A02 each have P49 CORRECT/PARTIAL/INCORRECT/NO_RESPONSE ✓ | PASS |
| V-7 | GR-3: gate TA (A03) is terminal | A03=P91; no further TAs ✓ | PASS |
| V-8 | GR-4: repair TAs open with P27+P41+P64 | B01, B02, B03 each: P27→P41→P64 ✓ | PASS |
| V-9 | GR-6: P91 terminal in its TA | P91 is A03; A03 is the last TA ✓ | PASS |
| V-10 | GR-7: P76 present in mastery gate | P76 in A03 between P77 and P75 ✓ | PASS |
| V-11 | GR-8: cross_links documented in Component 7 | requires and unlocks documented ✓ | PASS |
| V-12 | GR-9: P76 mode correct for cross_links | math.geom.coordinate-plane is Tier 1 → P76=cross-link probe ✓ | PASS |
| V-13 | GR-10: MAMR stated and enforced | MAMR=5/5 stated in C0 and P75 gate ✓ | PASS |
| V-14 | MAMR formula correct | ⌈0.9×5⌉=⌈4.5⌉=5; PASS=5/5 ✓ | PASS |
| V-15 | P91 structure complete | P77(4)→P55→P76(1)→P55→P75→P55→P74→P55→P78 ✓ | PASS |
| V-16 | P77 has exactly 4 problems | Problems 1–4 verified ✓ | PASS |
| V-17 | 3 misconceptions with FOUNDATIONAL declared | MC-1 FOUNDATIONAL, MC-2, MC-3 ✓ | PASS |
| V-18 | P89 spaced repetition present | Component 6 with 4 SR intervals ✓ | PASS |
| V-19 | Structure matches h | h=4 → compact (2 main TAs + gate); A01+A02+A03 ✓ | PASS |
| V-20 | P76 transfer probe is novel and correct | Coordinate-plane x-coordinate extension; 1D-order-doesn't-extend-to-2D argument ✓ | PASS |
| AIR | All internal references consistent | Concept IDs, MAMR, bloom, difficulty consistent throughout ✓ | PASS |
