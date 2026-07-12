# Teaching Blueprint — math.geom.similar-triangles

## Component 0 — Metadata
concept_id: math.geom.similar-triangles
concept_name: Similar Triangles
blueprint_version: 1.0
spec_version: Teaching Blueprint Specification v1.0
status: PACKAGE_READY
difficulty: proficient
bloom: apply
estimated_hours: 8
mastery_threshold: 0.85
CPA_entry_stage: P
requires: [math.geom.triangle, math.arith.ratios]
cross_links: [math.trig.right-triangle-trig]
P76_mode: cross-link-probe

---

## Component 1 — Cognitive Map

**Core concept:** Two triangles are similar (△ABC ~ △DEF) if they have the same shape but possibly different sizes: corresponding angles are equal and corresponding sides are proportional. Similarity is established by AA (two matching angles), SAS (matching angle with proportional adjacent sides), or SSS (all three pairs of sides proportional). The ratio of corresponding sides is the scale factor k; all lengths scale by k and area by k².

**Conceptual progression:**
1. Shape without size: similar triangles are scaled copies — same angles, proportional sides.
2. Criteria: AA is the most used (third angle is forced by angle-sum=180°); SAS and SSS require ratio checks.
3. Scale factor: if △ABC ~ △DEF and AB/DE=k, then BC/EF=k and CA/FD=k.
4. Applications: indirect measurement (heights of buildings, widths of rivers) via shadow or sight-line triangles.
5. Connection to trigonometry: sin, cos, tan are well-defined because all right triangles with the same acute angle are similar, so the side ratios are constant regardless of triangle size.

**CPA arc (entry: P):**
- Pictorial: diagrams of two similar triangles with vertex labels; correspondence arrows; scale factor k labelled on one pair of sides; shadow/tree diagram for indirect measurement
- Abstract: ratio equations AB/DE=BC/EF=CA/FD=k; AA/SAS/SSS criteria; proportion equation a/b=c/d → ad=bc

**Prior knowledge activated:** triangle angle sum = 180° (math.geom.triangle); ratio and proportion (math.arith.ratios); Pythagorean theorem for right triangles

---

## Component 2 — Misconception Registry

### MC-1: CONGRUENT-MEANS-SIMILAR [FOUNDATIONAL]
**Description:** Learner conflates congruence (same shape and same size, k=1) with similarity (same shape, any size). Believes that "similar" implies the triangles must be different in size, or conversely that congruent triangles are not similar.
**Surface form:** "These two triangles are the same size, so they're congruent, not similar."
**Root cause:** Everyday language: "similar" means "somewhat alike but different." In mathematics, similar is a precise property (equal angles, proportional sides) that includes the case k=1 (congruence). The learner applies the everyday meaning.
**Trigger condition:** Any problem involving two triangles with equal angles but the same or different size.
**Repair target:** TA-B01.

### MC-2: AA-NEEDS-THREE-ANGLES
**Description:** Learner believes that AA (two equal angles) is insufficient to establish similarity — all three angles must be verified.
**Surface form:** "You only gave me two equal angles. I need to check the third angle too."
**Root cause:** Overgeneralisation of completeness: if two angles are given, the third "hasn't been verified." Learner has not internalised that the angle-sum constraint (∠A+∠B+∠C=180°) forces the third angle once two are known.
**Trigger condition:** AA similarity problems; problems where only two angles are compared.
**Repair target:** TA-B02.

### MC-3: CORRESPONDENCE-ORDER-DOESNT-MATTER
**Description:** Learner sets up side ratios without respecting vertex correspondence — matches sides by position in the figure (e.g., both left sides) rather than by the paired vertices in the similarity statement △ABC ~ △DEF.
**Surface form:** "△ABC ~ △DEF, so AB/DF = BC/DE because those are the bottom sides."
**Root cause:** Vertex order in the similarity statement is rarely explained explicitly; learner reads the diagram visually rather than symbolically. This leads to cross-multiplying incorrect pairs and getting wrong answers.
**Trigger condition:** Any problem requiring side lengths from a similarity statement, especially when triangles are oriented differently.
**Repair target:** TA-B03.

---

## Component 3 — Scaffolding Protocol

**Entry assessment:** "In △PQR and △XYZ, ∠P=50° and ∠X=50°; ∠Q=70° and ∠Y=70°. Are the triangles similar? By which criterion?" If the learner identifies AA and concludes ∠R=∠Z=60°, proceed to A01. If the learner asks for more information before concluding, address MC-2 first.

**Scaffolding ladder:**
- Rung 1 (pictorial): provide two similar triangles with vertex labels; learner draws correspondence arrows and writes the ratio equation.
- Rung 2 (proportion): learner sets up cross-multiplication to find one missing side.
- Rung 3 (full apply): learner identifies similarity criterion, writes scale factor, and finds all missing sides.

**Pacing note:** h=8 estimated hours; A01–A02 in sessions 1–2; A03 + mastery gate in sessions 3–4.

---

## Component 4 — Protocol A (Main Sequence)

### TA-A01 [B-category: P03 — ANALOGY BRIDGE]

**Opening primitive: P03**

SOURCE DOMAIN: Maps and blueprints.
"A road map of a city and the city itself have the same shape — every turn and street matches — but the map is scaled down by, say, 1:50000. A blueprint and the building share the same proportions. No matter how big the real building is, the blueprint's ratios are identical."

TARGET DOMAIN: Similar triangles.
"△ABC ~ △DEF means △ABC is a 'map' of △DEF (or vice versa). Every angle is preserved exactly; every side length scales by the same factor k."

BRIDGE MAPPING:
| Map analogy | Similar triangles |
|---|---|
| Map is a scaled copy of terrain | △ABC is a scaled copy of △DEF |
| Scale factor (e.g., 1:50000) | Scale factor k = AB/DE |
| Every distance on map × scale = real distance | Every side in △ABC × k = corresponding side in △DEF |
| Directions and angles preserved | ∠A=∠D, ∠B=∠E, ∠C=∠F |
| Larger map = same shape, different size | Congruent triangles = k=1 (same size) |

KEY POINT: k can be any positive number. k>1 means △ABC is larger; k<1 means smaller; k=1 means congruent (same size and shape — congruence is a special case of similarity).

**Assessment primitive: P49**

PROBE: "△ABC ~ △PQR. AB=4, BC=6, CA=5. PQ=10. Find QR and RP."
- CORRECT: k=PQ/AB=10/4=5/2; QR=BC×k=6×(5/2)=15; RP=CA×k=5×(5/2)=12.5 → "Correct. Scale factor 5/2 applied uniformly to all three sides." → proceed to A02.
- PARTIAL: finds k but applies only to one side → "Good — k=5/2 is right. Apply the same factor to EVERY corresponding side: QR=BC×k=6×(5/2)=15; RP=CA×k=5×(5/2)=12.5. All three ratios must be equal."
- INCORRECT: mixes up vertex correspondence (e.g., AB/QR) → Repair with B03 (CORRESPONDENCE-ORDER-DOESNT-MATTER).
- NO_RESPONSE: "△ABC ~ △PQR tells you which vertices correspond: A↔P, B↔Q, C↔R. So AB corresponds to PQ; BC corresponds to QR; CA corresponds to RP. Scale factor k=PQ/AB=10/4=5/2. Multiply every △ABC side by k."

---

### TA-B01 — Repair for MC-1 (CONGRUENT-MEANS-SIMILAR)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'similar means different size; congruent means same size — these are mutually exclusive categories.' In mathematics, congruent triangles are a special case of similar triangles."

**P41 — MISCONCEPTION DETECTOR**
"Two identical equilateral triangles, each with side 5 cm. Are they similar?
(A) No — they're congruent, not similar.
(B) Yes — their angles are all 60°, and the scale factor k=1."
[If A: learner holds MC-1.]

**P64 — CONCEPTUAL SHIFT**
"Similarity requires equal angles and proportional sides (any k>0). Congruence requires equal angles and EQUAL sides (k=1 specifically). So every congruent triangle pair is similar (k=1 satisfies proportionality), but not every similar pair is congruent. Similarity ⊃ Congruence. The word 'similar' in mathematics is broader than in everyday English — it includes identical size."

→ Return to A01.

---

### TA-A02 [B-category: P07 — WORKED EXAMPLE PAIR]

**Opening primitive: P07**

WORKED EXAMPLE 1 — AA similarity, find missing sides:
Given: △ABC with ∠A=40°, ∠B=60°, and △DEF with ∠D=40°, ∠E=60°. Side lengths AB=6, BC=8, CA=7. DE=9.

Step 1 — Establish similarity: ∠A=∠D=40°, ∠B=∠E=60° → by AA, △ABC ~ △DEF. (Third angles: ∠C=∠F=80° are forced by angle-sum 180°.)
Step 2 — Identify correspondence: A↔D, B↔E, C↔F. So AB↔DE, BC↔EF, CA↔FD.
Step 3 — Compute scale factor: k=DE/AB=9/6=3/2.
Step 4 — Find EF: EF=BC×k=8×(3/2)=12.
Step 5 — Find FD: FD=CA×k=7×(3/2)=10.5.
Verify: DE/AB=9/6=3/2, EF/BC=12/8=3/2, FD/CA=10.5/7=3/2 ✓. All ratios equal k.

WORKED EXAMPLE 2 — Indirect measurement via shadow:
Setup: A vertical stick of height 2 m casts a shadow of 3 m on flat ground. At the same time, a tree casts a shadow of 18 m. Find the height of the tree.

Step 1 — Draw two right triangles: △STICK (height=2, shadow=3, hypotenuse=sunray) and △TREE (height=h, shadow=18, hypotenuse=sunray).
Step 2 — Establish similarity: both right triangles have a right angle (vertical stick/tree ⊥ ground) and the same sun angle (parallel rays at the same time of day). By AA: △STICK ~ △TREE.
Step 3 — Correspondence: height↔height, shadow↔shadow. Ratio: 2/h=3/18.
Step 4 — Solve: 2/h=1/6 → h=12 m.
Verify: scale factor k=18/3=6; tree height=2×6=12 m ✓.

**Assessment primitive: P49**

PROBE: "A lamp post 5 m tall casts a 4 m shadow. A building's shadow is 28 m at the same time. How tall is the building?"
- CORRECT: k=28/4=7; height=5×7=35 m → "Correct. Same sun angle → AA similarity; scale factor 7; building height 35 m."
- PARTIAL: sets up ratio correctly but arithmetic error → "The ratio setup is right: 5/h=4/28. Cross-multiply: 5×28=4h → 140=4h → h=35 m."
- INCORRECT: adds heights and shadows → Repair with B02 (AA-NEEDS-THREE-ANGLES) if conceptual; if procedural, re-demonstrate WE2 step-by-step.
- NO_RESPONSE: "Draw two right triangles: lamp (height 5, shadow 4) and building (height h, shadow 28). Same sun angle → AA. Corresponding sides: 5/h=4/28. Cross-multiply to find h."

---

### TA-B02 — Repair for MC-2 (AA-NEEDS-THREE-ANGLES)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'two equal angles are not enough — I need all three to be sure the triangles are similar.' This ignores the angle-sum constraint."

**P41 — MISCONCEPTION DETECTOR**
"△ABC has ∠A=50° and ∠B=70°. What is ∠C? Do you need to measure ∠C to know it?"

**P64 — CONCEPTUAL SHIFT**
"∠C = 180°−50°−70° = 60°. You ALWAYS know the third angle once you know two — the angle-sum theorem forces it. Therefore, if △ABC and △DEF share two equal angles, the third angles are automatically equal too. AA is not 'incomplete' — it is exactly sufficient because the third angle is determined by the other two. You never need to check all three separately."

→ Return to A02.

---

### TA-A03 [B-category: P06 — CONTRAST PAIR]

**Opening primitive: P06**

PAIR A — Similar triangles (same shape, any size):
- Equal angles; proportional sides; scale factor k can be any positive number.
- SSS-similarity: AB/DE=BC/EF=CA/FD=k (ratios, not equal lengths).
- AA-similarity: two equal angles → automatically similar (third angle forced).
- Area scales by k²: if k=3, the larger triangle has 9× the area.
- Example: △ABC (sides 3,4,5) ~ △DEF (sides 6,8,10); k=2; areas 6 and 24 (ratio 4=k²).

PAIR B — Congruent triangles (same shape AND same size):
- Equal angles; EQUAL sides (not just proportional); k=1 is the only allowed scale.
- SSS-congruence: AB=DE, BC=EF, CA=FD (equal lengths, not ratios).
- SAS-congruence, ASA-congruence, AAS-congruence — all require specific side EQUALITY.
- Area is identical (k²=1); triangles are exact copies.
- Example: △ABC (sides 3,4,5) ≅ △PQR (sides 3,4,5); k=1; areas equal.

CRITICAL CONTRASTS:
| Feature | Similarity | Congruence |
|---|---|---|
| Angles | Equal | Equal |
| Sides | Proportional (ratio k) | Equal (k=1) |
| Scale factor k | Any k>0 | k=1 only |
| Area relationship | Area ratio k² | Area ratio 1 |
| SSS criterion | AB/DE=BC/EF=CA/FD | AB=DE, BC=EF, CA=FD |
| Contains the other? | Similarity ⊃ Congruence | Congruence ⊂ Similarity |

"Every congruent pair is similar (k=1); not every similar pair is congruent."

**Assessment primitive: P49**

PROBE: "△ABC has sides 5,7,9. △PQR has sides 10,14,18. Are they similar? Congruent? What is k?"
- CORRECT: "Similar: 10/5=14/7=18/9=2; k=2; SSS-similarity. Not congruent: sides are not equal." → proceed to A04.
- PARTIAL: identifies similar but says congruent too → "Similar is correct — k=2 ✓. But congruent requires k=1 (equal sides). Since 5≠10, they are similar but not congruent."
- INCORRECT: claims not similar because sizes differ → Repair with B01 (CONGRUENT-MEANS-SIMILAR).
- NO_RESPONSE: "Compute the ratios of corresponding sides: 10/5, 14/7, 18/9. If all three ratios are equal, SSS-similarity holds. If that ratio is 1 (sides are equal), also congruent."

---

### TA-B03 — Repair for MC-3 (CORRESPONDENCE-ORDER-DOESNT-MATTER)

**Opening primitive: P27 — MISCONCEPTION NAMING**
"The claim is: 'I can match sides visually — left side to left side, bottom to bottom.' This ignores vertex correspondence, leading to wrong ratios."

**P41 — MISCONCEPTION DETECTOR**
"△ABC ~ △DEF. Which side of △DEF corresponds to AB?
(A) DF — because both are on the left in the diagram.
(B) DE — because A↔D and B↔E by the order in '△ABC ~ △DEF'."
[If A: learner holds MC-3.]

**P64 — CONCEPTUAL SHIFT**
"The similarity statement △ABC ~ △DEF is an ordered statement: the FIRST vertex of △ABC corresponds to the FIRST vertex of △DEF, the SECOND to the SECOND, the THIRD to the THIRD. A↔D, B↔E, C↔F. So AB corresponds to DE (not DF); BC corresponds to EF; CA corresponds to FD. Always read the correspondence FROM the letter order, not from the diagram orientation. Draw correspondence arrows between vertices if needed."

→ Return to A01.

---

## Component 5 — Protocol B (Repair Sequences)

### TA-B01 — Repair for MC-1 (CONGRUENT-MEANS-SIMILAR)
See TA-B01 in Component 4. Opens P27+P41+P64; returns to A01.

### TA-B02 — Repair for MC-2 (AA-NEEDS-THREE-ANGLES)
See TA-B02 in Component 4. Opens P27+P41+P64; returns to A02.

### TA-B03 — Repair for MC-3 (CORRESPONDENCE-ORDER-DOESNT-MATTER)
See TA-B03 in Component 4. Opens P27+P41+P64; returns to A01.

---

## Component 6 — P89 Spaced Repetition

**Interval schedule:** Day 1 (initial), Day 3, Day 10, Day 30.

**Day 3 prompt:**
"△PQR ~ △XYZ with PQ=5, QR=8, RP=6. The perimeter of △XYZ is 57. Find the scale factor and all sides of △XYZ."
[Expected: perimeter of △PQR=19. k=57/19=3. XY=15, YZ=24, ZX=18.]

**Day 10 prompt:**
"A 1.8 m person casts a 2.4 m shadow. A nearby flagpole casts a 16 m shadow at the same time. How tall is the flagpole? Identify the similarity criterion used."
[Expected: AA (right angle + equal sun angle). k=16/2.4=20/3. Height=1.8×(20/3)=12 m.]

**Day 30 prompt:**
"In right triangle △ABC with right angle at C, point D is on AB such that CD ⊥ AB. Prove that △ACD ~ △ABC and △CBD ~ △ABC. What is CD² in terms of AD and DB?"
[Expected: ∠A=∠A (shared), ∠ACD=∠ACB=90° → △ACD ~ △ABC by AA. Similarly ∠B=∠B, ∠BCD=90° → △CBD ~ △ABC. From △ACD~△ABC: AC/AB=AD/AC → AC²=AB·AD. From △CBD~△ABC: BC/AB=DB/BC → BC²=AB·DB. From △ACD~△CBD: CD/BD=AD/CD → CD²=AD·DB (geometric mean relation).]

---

## Component 7 — Cross-Blueprint Dependencies

**Prerequisite blueprints (must be PACKAGE_READY before delivery):**
- math.geom.triangle — triangle angle-sum property (180°), types of triangles; needed for AA criterion
- math.arith.ratios — ratio and proportion; cross-multiplication; a/b=c/d ↔ ad=bc

**Unlocked blueprints:**
- math.trig.right-triangle-trig — sin/cos/tan defined as ratios in similar right triangles (this concept directly enables that definition)

**Cross-link (T1 — P76 cross-link probe mode):**
- math.trig.right-triangle-trig (T1): the definition of sin/cos/tan is justified by the fact that all right triangles with the same acute angle are similar — the ratio opposite/hypotenuse is the same for any triangle size

---

## Component 8 — Teaching Notes

**Pedagogical priority:** Vertex correspondence (MC-3) is the most common source of wrong answers in application problems. Reinforce it in every worked example: always write correspondence arrows and reference the vertex order in the similarity statement.

**AA is the workhorse:** In most applications — shadow problems, sight-line problems, geometric proofs — AA is the only criterion needed. SSS-similarity and SAS-similarity are used in proofs and are worth covering in A03's contrast, but AA should be fully fluent before introducing them.

**Scale factor and area:** The area ratio k² is a preview of integration and scaling ideas. Mention it explicitly in A03 but do not require mastery here.

**Bridge to trigonometry:** The P76 probe makes the connection explicit: sin θ is the ratio opposite/hypotenuse. This ratio is DEFINED by similar triangles — every right triangle with angle θ is similar to every other, so the ratio is constant. Without similar triangles, trigonometry has no rigorous foundation.

---

## Component 10 — Validation Checklist

### Structural Checks
- [x] V-1: Component 0 metadata complete (all 9 fields populated)
- [x] V-2: All TAs in main sequence open with a B-category primitive (GR-1) — A01: P03, A02: P07, A03: P06
- [x] V-3: N/A — CPA_entry_stage=P (proficient difficulty); concrete anchor not required
- [x] V-4: Every non-gate TA contains P49 with all 4 branches (GR-2) — A01, A02, A03 each have CORRECT/PARTIAL/INCORRECT/NO_RESPONSE
- [x] V-5: Terminal TA is mastery gate (P91) (GR-3) — A04 is P91
- [x] V-6: Repair TAs open with P27+P41+P64 (GR-4) — B01, B02, B03 all comply
- [x] V-7: Mastery gate is terminal — P91 in A04 is the final TA (GR-6)
- [x] V-8: P76 present in mastery gate (GR-7)
- [x] V-9: Cross-Blueprint Dependencies documented in Component 7 (GR-8)
- [x] V-10: P76 mode = cross-link-probe; cross_link math.trig.right-triangle-trig is T1; probe justifies sin/cos/tan via similar triangles (GR-9)

### Content Checks
- [x] V-11: bloom=apply; P07 used in A02 (WORKED EXAMPLE PAIR) ✓
- [x] V-12: Misconception registry has 3 MCs; MC-1 marked FOUNDATIONAL
- [x] V-13: Repair sequence exists for each MC — B01 (MC-1), B02 (MC-2), B03 (MC-3)
- [x] V-14: P76 cross-link probe is a novel transfer problem (sin θ constant across all similar right triangles)
- [x] V-15: P77 has exactly 4 items; P76 is 1 item; n=5 total

### Mastery Gate Checks
- [x] V-16: MAMR stated — PASS = ⌈0.85 × 5⌉ = 5 out of 5
- [x] V-17: PASS criterion enforced in P74 routing decision
- [x] V-18: P78 COMPLETION block present
- [x] V-19: P75 MASTERY ASSESSMENT present with PASS/FAIL branching
- [x] V-20: All scoring (P55) entries reference the same MAMR threshold

### AIR Check
- [x] AIR: All mathematical content (AA/SAS/SSS criteria, scale factor, shadow measurement, sin/cos ratios) consistent with KG description and standard geometry pedagogy; no fabricated identities

**STATUS: PACKAGE_READY**

---

## Component 4 (continued) — Protocol A, TA-A04 [MASTERY GATE: P91]

### P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78

**MAMR: PASS = ⌈0.85 × 5⌉ = 5 out of 5**

---

#### P77 — MULTI-PROBLEM SET (4 items)

**Item 1:**
"△PQR ~ △XYZ with PQ=5, QR=6. XY=10. Find YZ."
[Expected: k=XY/PQ=10/5=2; YZ=QR×k=6×2=12.]

**Item 2:**
True or False: "All congruent triangles are similar."
[Expected: TRUE. Congruent triangles have k=1, which satisfies the similarity condition. Congruence is a special case of similarity.]

**Item 3:**
"Two angles of △ABC are 50° and 70°. Two angles of △DEF are 50° and 60°. Are the triangles similar?"
[Expected: NO. △ABC has angles 50°, 70°, 60°. △DEF has angles 50°, 60°, 70°. Wait — △DEF has 50°+60°=110°, so third angle is 70°. So △ABC and △DEF both have angles 50°, 60°, 70° → they ARE similar by AA. Let me reconsider.

Actually, if △ABC has angles 50° and 70°, then the third is 60°. Triangle △DEF has angles 50° and 60°, so the third is 70°. Both triangles have angles {50°, 60°, 70°} — they are similar by AA (any two angles match).

Let me revise Item 3 to be genuinely non-similar:
"Two angles of △ABC are 50° and 70°. Two angles of △DEF are 50° and 55°. Are the triangles similar?"
[Expected: △ABC angles: 50°, 70°, 60°. △DEF angles: 50°, 55°, 75°. Only the 50° angle matches; the second angles 70°≠55°. Not similar by AA.]

**Item 4:**
"A 3 m post casts a 4 m shadow. A building casts a 28 m shadow at the same time. How tall is the building?"
[Expected: k=28/4=7; building height=3×7=21 m.]

---

#### P55 — SCORE after P77
Score each item 1 point for correct, 0 for incorrect. Record score /4.

---

#### P76 — TRANSFER PROBE (cross-link probe mode: math.trig.right-triangle-trig)

"Consider two right triangles, both with a right angle at C (and C') and the same acute angle θ at A (and A'):
- △ABC: legs BC=3, AC=4, hypotenuse AB=5.
- △A'B'C': legs B'C'=6, A'C'=8, hypotenuse A'B'=10.

(a) Are △ABC and △A'B'C' similar? Which criterion? What is k?
(b) Compute BC/AB and B'C'/A'B'. Are they equal?
(c) What does this say about the ratio 'opposite/hypotenuse' for angle θ, regardless of triangle size?"

[Expected:
(a) Both have ∠C=∠C'=90° and ∠A=∠A'=θ → AA similarity. k=10/5=2.
(b) BC/AB=3/5=0.6; B'C'/A'B'=6/10=0.6. Equal. ✓
(c) The ratio opposite/hypotenuse = 3/5 = 6/10 = 0.6, the same in both triangles despite different sizes. This ratio depends only on θ, not on which triangle. This is why sin θ is well-defined as 'opposite/hypotenuse' — it has the same value for all right triangles with angle θ, because they are all similar to each other.]

---

#### P55 — SCORE after P76
Score P76 as 1 point if (b) both ratios equal 3/5 is correct and (c) states the ratio is constant because triangles are similar (or equivalent reasoning), 0 otherwise.

---

#### P75 — MASTERY ASSESSMENT

Total score = P77 score (0–4) + P76 score (0–1) = 0–5.
PASS threshold: ≥ 5 out of 5.
- PASS (5/5): Learner can find missing sides using scale factor, knows congruence is a special case of similarity, can apply AA to indirect measurement, and understands why sin/cos are well-defined.
- FAIL (<5/5): Identify which items failed; route to repair.

---

#### P55 — SCORE (mastery total)
Record final score and PASS/FAIL status in session memory.

---

#### P74 — ROUTING DECISION

- PASS: → P78 COMPLETION
- FAIL on Item 1 (incorrect side correspondence): → TA-B03 (CORRESPONDENCE-ORDER-DOESNT-MATTER repair), then re-gate
- FAIL on Item 2 (congruence not similar): → TA-B01 (CONGRUENT-MEANS-SIMILAR repair), then re-gate
- FAIL on Item 3 (incorrect AA conclusion): → TA-B02 (AA-NEEDS-THREE-ANGLES), verify angle computation; then re-gate
- FAIL on Item 4 or P76 (setup of similar triangles in context): → Return to A02 (WE2 shadow problem), re-demonstrate, then re-gate
- FAIL on multiple items: → TA-B03 first (correspondence is most common error), then remaining repairs; re-gate

---

#### P55 — SCORE (post-repair if applicable)
Re-administer two fresh equivalent items + P76 equivalent. Apply MAMR 5/5. Record repair score separately.

---

#### P78 — COMPLETION

"You have demonstrated mastery of similar triangles: AA criterion, scale factor computation, vertex correspondence, indirect measurement applications, and the fundamental connection to trigonometry.

Key anchors to carry forward:
- △ABC ~ △DEF means A↔D, B↔E, C↔F; always use vertex order to establish correspondence.
- AA is sufficient: two equal angles determine the third (angle-sum=180°).
- Scale factor k: all sides multiply by k; area multiplies by k².
- Indirect measurement: equal sun angles + right angle → AA similarity → ratio equation.
- Trigonometry foundation: all right triangles with the same acute angle θ are similar, so sin θ = opposite/hypotenuse is the same for every such triangle.

Next concept: math.trig.right-triangle-trig — sin, cos, tan defined and computed using these ratios."
