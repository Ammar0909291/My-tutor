# Teaching Blueprint — phys.opt.mirrors

## Component 0 — Concept Identity

```yaml
concept_id: phys.opt.mirrors
name: "Curved Mirrors — Concave and Convex"
domain: optics
difficulty:
  label: proficient
  number: 4
bloom: apply
prerequisites:
  - phys.opt.reflection
mastery_threshold: 0.80
estimated_hours: 4
cross_links: []
session_cap: "7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)"
cpa_entry_stage: "C (anchor; difficulty 4 → C with accelerated P track)"
status: READY
```

---

## Component 1 — Concept Explanation (Multi-Level)

### Level 1 — Concrete Intuition

Look into the back of a shiny spoon — your face appears upright and small. Flip the spoon and look into the concave side — your face appears upright and magnified when close, then upside-down when you move away. This is curved mirror behavior. A concave mirror (reflecting surface curves inward, like a cave) can either magnify or invert depending on object distance. A convex mirror (reflecting surface curves outward, like the back of the spoon) always produces a small, upright, virtual image — which is why car rear-view mirrors and security mirrors are convex (they give a wide field of view).

### Level 2 — Developing Understanding

**Key terminology:**
- **Pole (P):** Centre of the mirror surface
- **Centre of curvature (C):** Centre of the sphere the mirror is part of; at distance R from P
- **Radius of curvature (R):** R = 2f
- **Principal focus (F):** Point where paraxial rays parallel to principal axis converge (concave) or appear to diverge from (convex); at distance f from P
- **Focal length (f):** f = R/2

**Sign convention (New Cartesian — distances measured from pole P):**
- Incident light travels left to right
- Distances measured in direction of incident light: positive
- Distances measured against incident light: negative
- Concave mirror: f = negative (F on same side as object)
- Convex mirror: f = positive (F on opposite side from object)

**Mirror formula:**
**1/v + 1/u = 1/f = 2/R**

Where u = object distance (negative for real object), v = image distance, f = focal length.

**Magnification:**
m = −v/u

| m sign | m magnitude | Image |
|--------|-------------|-------|
| m > 0 | any | Virtual, erect |
| m < 0 | any | Real, inverted |
| |m| > 1 | — | Magnified |
| |m| < 1 | — | Diminished |

**Concave mirror — image types by object position:**

| Object position | Image position | Type | Orientation | Size |
|----------------|---------------|------|-------------|------|
| At ∞ | At F | Real | Inverted | Point |
| Beyond C (u > 2f) | Between F and C | Real | Inverted | Diminished |
| At C (u = 2f) | At C (v = 2f) | Real | Inverted | Same size |
| Between C and F | Beyond C | Real | Inverted | Magnified |
| At F | At ∞ | Real | — | — |
| Between F and P | Behind mirror | Virtual | Erect | Magnified |

**Convex mirror:** Always produces virtual, erect, diminished image (regardless of object position). f > 0 in NC convention.

### Level 3 — Proficient Synthesis

**Ray diagram rules (3 standard rays for concave mirror):**
1. Ray parallel to principal axis → reflects through F (concave) or appears to come from F (convex)
2. Ray through F → reflects parallel to principal axis
3. Ray through C → reflects back on itself (normal incidence at curved surface)

**Power of a mirror:** P = 1/f (in diopters if f in metres). Concave: P > 0. Convex: P < 0.

**Derivation of mirror formula (geometric):**
For concave mirror with object AB at distance u, image A'B' at v:
Using similar triangles and the geometry of the focal length gives 1/v + 1/u = 1/f.

**Extended objects and real images:** A real image is formed when reflected rays actually converge. It can be projected on a screen. A virtual image is formed when reflected rays diverge — extensions behind the mirror appear to converge there; cannot be projected.

**Applications:**
- Concave: shaving/makeup mirror (object between F and P → virtual, erect, magnified), car headlights/torches (object at F → parallel beam), solar concentrators, telescope mirrors
- Convex: rear-view mirrors, security mirrors (wide field of view), road junction mirrors

---

## Component 2 — Worked Examples

### WE-1: Concave Mirror — Object Beyond C

**Problem:** A concave mirror has focal length f = −20 cm (using New Cartesian sign convention). An object is placed 30 cm in front of the mirror (u = −30 cm). Find:
(a) Image distance v.
(b) Magnification m.
(c) Nature of the image.

**Solution:**

**(a) Mirror formula:**
1/v + 1/u = 1/f
1/v = 1/f − 1/u = 1/(−20) − 1/(−30)
= −1/20 + 1/30
= −3/60 + 2/60
= −1/60

**v = −60 cm**

(Negative → image is on the same side as the object → real image)

**(b) Magnification:**
m = −v/u = −(−60)/(−30) = −60/30 = **−2**

(Negative → inverted; |m| = 2 → magnified)

**(c) Nature:** Real, inverted, magnified (2×). Located 60 cm from mirror on same side as object (in front of mirror).

---

### WE-2: Convex Mirror — Rear-View Application

**Problem:** A convex rear-view mirror has focal length f = +25 cm. A car is 150 cm behind the mirror (u = −150 cm). Find the image position and magnification. Explain why convex mirrors are preferred for rear-view.

**Solution:**

**Mirror formula:**
1/v = 1/f − 1/u = 1/25 − 1/(−150)
= 1/25 + 1/150
= 6/150 + 1/150
= 7/150

**v = 150/7 ≈ +21.4 cm**

(Positive → image behind mirror → virtual)

**Magnification:**
m = −v/u = −(+21.4)/(−150) = +21.4/150 = **+0.143**

(Positive → erect; |m| < 1 → diminished)

**Why convex for rear-view:** Convex mirror always produces upright (erect) image visible at a glance. The diminished image subtends a larger angular field of view — the driver sees a wider scene compressed into a small mirror. The trade-off: distances appear larger (objects look farther than they are) — hence the warning "Objects in mirror are closer than they appear."

---

### WE-3: Finding Object Position for Required Magnification

**Problem:** A dentist uses a concave mirror (f = −2.5 cm) to produce an upright image magnified 5 times of a tooth. How far from the mirror should the tooth be placed?

**Solution:**

For an upright (erect) image from a concave mirror: image must be virtual → v > 0 (behind mirror, using NC convention where concave f < 0).

Wait — with NC sign convention: real objects have u < 0. Virtual image of concave mirror (erect, magnified) has v > 0.

Given m = +5 (erect, magnified): m = −v/u → +5 = −v/u → v = −5u

Object at u (negative): v = −5u (positive since u is negative → v > 0 ✓)

Mirror formula:
1/v + 1/u = 1/f
1/(−5u) + 1/u = 1/(−2.5)
(−1 + 5)/(5u) = 1/(−2.5)
4/(5u) = −1/2.5 = −0.4
4 = 5u × (−0.4) = −2u
u = 4/(−2) = **−2.0 cm**

The tooth should be placed **2.0 cm** from the mirror (between the focus and the pole, since |f| = 2.5 cm and |u| = 2.0 cm < 2.5 cm).

Check: v = −5u = −5×(−2) = +10 cm (virtual image behind mirror) ✓
1/v + 1/u = 1/10 + 1/(−2) = 0.1 − 0.5 = −0.4 = 1/f = 1/(−2.5) = −0.4 ✓

---

## Component 3 — Misconception Engine

### MC-1: MC-CONCAVE-MIRROR-ALWAYS-FORMS-REAL-IMAGE

**trigger_signal:** Student states "concave mirrors always produce real inverted images" or "only convex mirrors can form virtual images."

**conflict_evidence [P28]:** Use the mirror formula: for f = −20 cm (concave) and u = −10 cm (object between F and P, since |f| = 20 cm and |u| = 10 cm < 20 cm): 1/v = 1/(−20) − 1/(−10) = −0.05 + 0.10 = +0.05 → v = +20 cm. A positive v means the image is behind the mirror — virtual. The magnification m = −v/u = −(+20)/(−10) = +2 > 0 → erect. This is exactly the dentist's magnifying mirror situation. A concave mirror forms a virtual, erect, magnified image when the object is inside the focal length.

**bridge_text [P30]:** Think of the concave mirror as having two "personalities" depending on where the object is. When the object is far (outside F), it converges rays to a real focus — real image. When the object is close (inside F), the reflected rays diverge — but their extensions behind the mirror converge, giving a virtual image. The focal point F is the boundary: outside F → real image; inside F → virtual image.

**replacement_text [P31]:** A concave mirror forms a VIRTUAL image when the object is placed between the pole and the focus (|u| < |f|). In this case v > 0 (image behind mirror), m > 0 (erect), and |m| > 1 (magnified). This is the operating principle of shaving mirrors, makeup mirrors, and dental examination mirrors. Both concave and convex mirrors can produce virtual images; neither is "always real" or "always virtual."

**discrimination_pairs [P33]:**
- "A concave mirror used as a shaving mirror must produce a real image so you can see your reflection" → FALSE: it produces a virtual, erect, magnified image (object is between F and P). Real images cannot be seen by looking into the mirror.
- "Convex mirrors always form virtual images; concave mirrors always form real images" → FALSE: concave mirrors form virtual images when u < f; the distinction is by object position, not mirror type alone.

**s6_path:** If student fails "which mirror forms virtual image" probe → assign ray diagram for object between F and P for concave mirror, confirm virtual image location before mastery gate.

---

### MC-2: MC-MAGNIFICATION-SIGN-GIVES-IMAGE-SIZE

**trigger_signal:** Student states "m = −2 means the image is half the size" or "m = −2 means the image is reduced" (confusing the sign with the magnitude).

**conflict_evidence [P28]:** Calculate WE-1: m = −2. A negative magnification means the image is inverted (upside-down), NOT smaller. The magnitude |m| = 2 means the image is twice the height of the object. Check: image height h' = m × h_object = (−2) × 3 cm = −6 cm (negative height = inverted, magnitude 6 cm = twice 3 cm). If it were smaller, we'd need |m| < 1. The sign and magnitude carry different information.

**bridge_text [P30]:** Magnification m = −v/u encodes two separate facts: (1) the sign tells orientation (positive = erect, negative = inverted); (2) the magnitude |m| tells size ratio (|m| > 1 = larger, |m| < 1 = smaller, |m| = 1 = same size). These are independent of each other — you can have m = −3 (inverted and 3× larger) or m = −0.5 (inverted and half size).

**replacement_text [P31]:** For magnification m: sign → orientation (m > 0: erect/virtual; m < 0: inverted/real), magnitude → size (|m| > 1: magnified; |m| < 1: diminished; |m| = 1: same). m = −2 means inverted AND 2× larger (magnified). m = −0.5 means inverted AND half size (diminished). Always separate the sign and magnitude information.

**discrimination_pairs [P33]:**
- "m = −3 means the image is one-third the size" → FALSE: |m| = 3 means 3× larger; negative sign means inverted.
- "m = +0.4 means the image is smaller but upright" → CORRECT: |m| = 0.4 < 1 (diminished), m > 0 (erect/virtual). ✓

**s6_path:** If student confuses sign with size → assign three rapid-fire m interpretation exercises (given m, state: real/virtual? erect/inverted? larger/smaller?) before mastery gate.

---

## Component 4 — Plausible Student States

| State | Description | Entry signal |
|-------|-------------|--------------|
| S0 | Knows concave/convex qualitatively from experience; no mathematical model; confuses mirror types | Cannot apply mirror formula; cannot draw ray diagrams |
| S3 | Can state the mirror formula; struggles with sign convention; treats all concave mirrors as forming real images | Makes NC sign errors; applies |m| = v/u without sign consideration |
| S6 | Correctly applies sign convention and mirror formula; uncertain about cases where concave gives virtual image; interprets magnification incorrectly | Correctly solves WE-1 and WE-2 but fails WE-3 setup |
| S9 | Applies mirror formula fluently in all cases; constructs ray diagrams accurately; correctly interprets m sign and magnitude; explains application choice (concave vs. convex) | Completes all three WEs correctly; explains rear-view mirror advantages and limitations |

---

## Component 5 — Session Script (TA Sequence)

> Session cap: 7 TAs. CPA entry: C (difficulty 4, accelerated P track).

**TA-1 [P01 — Session Open]**
"Look into the back of a spoon (convex side). What do you see? Now look into the concave side — first close, then at arm's length. Describe how the image changes. Today we build the mathematical model that explains this: the mirror formula 1/v + 1/u = 1/f. Starting question: for a concave mirror, can the image ever be upright? Write your prediction."
[Diagnose S0/S3 — checks whether student thinks concave always inverts]

**TA-2 [P06 — Concrete Anchor: Sign Convention]**
"[Display: New Cartesian coordinate system with mirror at origin, principal axis, C, F, P labeled.] Sign rule: distances measured from pole P. In the direction of incident light (left to right): positive. Against incident light: negative. Real object: u is always negative. Concave mirror: f negative (F is on same side as object). Convex mirror: f positive (F is behind mirror). Practice: u = −30 cm, f = −20 cm. Before computing, predict: will the image be real or virtual?"

**TA-3 [P28 — Conflict Evidence: MC-1]**
"Concave always real? Let's test. f = −20 cm. Object at u = −10 cm (inside focal length). Mirror formula: 1/v = 1/f − 1/u = 1/(−20) − 1/(−10) = −0.05 + 0.10 = +0.05 → v = +20 cm. Positive v = behind the mirror = virtual. And m = −(+20)/(−10) = +2 → erect and 2× magnified. This IS the shaving mirror. So: object outside F → real image; object inside F → virtual, erect, magnified. The focal point is the dividing line." [→ MC-1 discrimination pairs]

**TA-4 [P06 — Worked Examples walkthrough]**
"Now let's work through all three cases: beyond C → real, inverted, diminished (WE-1); convex → always virtual, erect, diminished (WE-2); finding object position for required m (WE-3). Take WE-1 first — complete the calculation of v and m." [→ WE-1 student practice → WE-2 → WE-3]

**TA-5 [P31 — Replacement: MC-2]**
"Magnification trap: m = −2. Students often say 'the image is half size.' Let's unpack: m = −v/u. Sign: negative → inverted. Magnitude: |m| = 2 → twice the object height. So m = −2 means inverted AND 2× bigger. Always separate: sign = orientation, magnitude = size ratio. Quick drill: what do m = −0.5, m = +3, and m = −1 each tell you?" [→ MC-2 drill]

**TA-6 [P51 — Check-in]**
"Ray diagram check: For a concave mirror with f = −10 cm and object at u = −25 cm, draw (or describe) the three standard rays and locate the image. Is the image between F and C, beyond C, or at C? Real or virtual? Check numerically."
[Confirms S6 → S9 transition; catches students who solve algebraically without geometric intuition]

**TA-7 [P36 — Mastery Probe + P68 + P85 + P91]**
"Final probe: (1) A concave mirror (f = −15 cm) has object at u = −10 cm. Find v, m, and describe the image fully. (2) A convex mirror (f = +30 cm) has object at u = −90 cm. Find image position, m, and explain the practical advantage over a plane mirror for this application. (3) A concave mirror (f = −25 cm) must produce an inverted image magnified 3×. Find u and v.

Closing thought: The 6.5-meter primary mirror of the James Webb Space Telescope is composed of 18 hexagonal concave gold-coated beryllium segments working together as one concave mirror — collecting infrared light from galaxies 13.6 billion light-years away.

Spaced retrieval: +1 day (sign convention and mirror formula setup), +4 days (magnification interpretation — sign vs. magnitude), +2 weeks (full image classification table for concave mirror)."

[P91 gate: threshold 0.80. Failure → review NC sign convention and concave virtual-image case before re-probe.]

---

## Component 6 — Assessment Probes

**P-1 (Foundational — identifies S3):** A concave mirror has f = −30 cm. An object is at u = −45 cm. Find v, m, and state: real or virtual? Erect or inverted? Magnified or diminished?

**P-2 (Developing — identifies S6):** A convex mirror has radius of curvature R = 40 cm. An object stands 60 cm in front of it. Find (a) focal length, (b) image distance, (c) magnification. Explain why the image is always virtual for a convex mirror using the mirror formula.

**P-3 (Proficient — identifies S9):** A concave mirror is used as a make-up mirror. If the person's face is 15 cm from the mirror and the focal length is −20 cm, find (a) image position, (b) magnification. Draw a qualitative ray diagram. Show that for any object inside the focal length, the concave mirror formula always gives a positive v (virtual image).

**P-4 (Mastery gate — confirms S9):** (a) An object is placed between the focus and pole of a concave mirror (f = −12 cm, u = −8 cm). Find v and m, classify the image. (b) A convex mirror (f = +15 cm) is used as a security mirror. For an object 3 m away, find image position and the angular field of view advantage over a plane mirror of equal size. (c) Derive the result that, for a concave mirror, the image is real if and only if |u| > |f|. Required: 3/3 at ≥0.80 accuracy.

---

## Component 7 — Visual / Simulation Specs

**VIS-1:** Interactive concave/convex mirror simulator. Drag object along principal axis (both sides of F). Displays: real-time ray diagram (3 standard rays), image position, v and m values, image description (real/virtual, erect/inverted, size ratio). Toggle between concave and convex. Color-codes real rays (solid) and virtual extensions (dashed).

**VIS-2:** Image position table (dynamic). Shows all 6 object positions for concave mirror (at ∞, beyond C, at C, between C and F, at F, between F and P) with computed v, m, and image type. Clicking any row shows the corresponding ray diagram.

**VIS-3:** Rear-view mirror field of view comparison. Side-by-side: plane mirror vs. convex mirror, same size. Shows the angular coverage of each (convex covers wider angle). Demonstrates why objects appear farther in convex mirror (scale distortion explained geometrically).

---

## Component 8 — Cross-Links

| Linked concept | Relationship | Direction |
|---------------|--------------|-----------|
| phys.opt.reflection | Reflection law at each point of curved surface is the basis for image formation | prerequisite |
| phys.opt.optical-instruments | Telescopes and microscopes use curved mirrors; Cassegrain telescope is a two-mirror system | downstream |

---

## Component 9 — Validation Checklist

| Code | Check | Status |
|------|-------|--------|
| V-1 | concept_id matches KG exactly | PASS — phys.opt.mirrors ✓ |
| V-2 | name matches KG | PASS — "Curved Mirrors — Concave and Convex" ✓ |
| V-3 | domain derived from prefix phys.opt → optics | PASS ✓ |
| V-4 | difficulty label+number consistent (proficient=4) | PASS ✓ |
| V-5 | bloom matches KG (apply) | PASS ✓ |
| V-6 | All prerequisites in KG requires list | PASS — reflection ✓ |
| V-7 | mastery_threshold = 0.80 | PASS ✓ |
| V-8 | estimated_hours matches KG (4) | PASS ✓ |
| V-9 | session_cap set | PASS — 7 TAs (PA-3 hard limit) ✓ |
| V-10 | cpa_entry_stage consistent with rules | PASS — C (difficulty 4, accelerated P track) ✓ |
| V-11 | ≥2 misconceptions with all 6 MC fields | PASS — MC-1, MC-2, all 6 fields each ✓ |
| V-12 | ≥3 worked examples with numeric solutions | PASS — WE-1 (concave beyond C), WE-2 (convex rear-view), WE-3 (find u for required m) ✓ |
| V-13 | 4 plausible student states S0/S3/S6/S9 | PASS ✓ |
| V-14 | Session script ≤ session_cap, correct Primitive codes | PASS — 7 TAs, P01/P06/P28/P06/P31/P51/P36+P68+P85+P91 ✓ |
| V-15 | ≥4 assessment probes at graduated difficulty | PASS — P-1 through P-4 ✓ |
| V-16 | ≥3 visual/simulation specs | PASS — VIS-1 through VIS-3 ✓ |
| V-17 | Cross-links table present | PASS — 2 entries ✓ |
| V-18 | No implementation code | PASS ✓ |
| V-19 | No other-subject curriculum authoring | PASS ✓ |
| V-20 | status: READY | PASS ✓ |

**Overall: READY — all 20 checks PASS**
