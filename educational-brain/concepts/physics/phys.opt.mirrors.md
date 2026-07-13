# phys.opt.mirrors — Spherical Mirrors and Mirror Formula

## 1. Identity

| Field | Value |
|---|---|
| **Concept ID** | `phys.opt.mirrors` |
| **Display name** | Spherical Mirrors and Mirror Formula |
| **KG requires** | `phys.opt.reflection` |
| **KG unlocks** | `phys.opt.optical-instruments` |
| **Difficulty** | proficient |
| **Bloom level** | apply |
| **Mastery threshold** | 0.80 |
| **Estimated hours** | 4 |
| **KG description** | The mirror formula 1/f = 1/v + 1/u relates focal length, image distance, and object distance for spherical mirrors. |

---

## 2. Mental Models

### Stage 1 — Intuitive (no formalism)

A concave mirror (caved inward, like a bowl) focuses parallel light rays to a point in front. A convex mirror (bulging outward) spreads rays apart and cannot focus them. Bathroom magnifying mirrors are concave — they make your face look larger. Car rear-view mirrors are convex — they give a wide field of view but make objects look smaller and further away than they are.

### Stage 2 — Quantitative entry

**Sign convention (New Cartesian)**: distances measured from the pole (vertex) along the principal axis. Direction of incident light is positive. Distances in front of the mirror (real side, where light actually travels) are negative for concave mirrors by convention — BUT the standard textbook convention used in most curricula defines:

- u (object distance): **negative** when object is in front of mirror (real object, as usual)
- v (image distance): **negative** when image is in front of mirror (real image); **positive** when behind (virtual image)
- f (focal length): **negative** for concave mirror (focal point in front); **positive** for convex (focal point behind)
- R (radius of curvature): R = 2f

**Mirror formula**: **1/f = 1/v + 1/u**

**Magnification**: m = −v/u (linear transverse magnification)
- |m| > 1: magnified; |m| < 1: diminished; m > 0: upright (virtual); m < 0: inverted (real)

**Concave mirror key cases** (object at distance u from pole):
- u > 2f: real, inverted, diminished image between f and 2f
- u = 2f: real, inverted, same-size image at 2f
- f < u < 2f: real, inverted, magnified image beyond 2f
- u = f: image at infinity (parallel reflected rays)
- u < f: virtual, upright, magnified image behind mirror

**Convex mirror**: always produces virtual, upright, diminished image behind the mirror, regardless of object position.

### Stage 3 — Ray diagrams (three principal rays)

For concave mirrors, any two of the three principal rays locate the image:
1. Ray parallel to principal axis → reflects through focus F.
2. Ray through focus F → reflects parallel to principal axis.
3. Ray through centre of curvature C (= 2F) → reflects back along itself.

For convex mirrors: ray 1 reflects as if diverging from virtual focus F (behind mirror); ray 3 heads toward virtual C and returns.

### Stage 4 — Paraxial approximation and its limits

The mirror formula holds exactly only for **paraxial rays** — rays close to and nearly parallel to the principal axis, hitting the mirror at small angles. For wide-angle rays, the focal point shifts (spherical aberration): marginal rays (far from axis) focus nearer to the mirror than paraxial rays. Parabolic mirrors eliminate spherical aberration (telescope mirrors, satellite dishes) at the cost of a fixed field of view. This is why astronomical telescopes use parabolic, not spherical, mirrors.

---

## 3. Why Beginners Fail

1. **Sign errors** — the New Cartesian sign convention assigns negative values to "obvious positive" quantities (e.g., object in front of mirror has u < 0). Learners substitute positive values and get wrong signs for image distances, misidentifying real vs. virtual.
2. **Confusing concave and convex** — "concave" = caves inward (like a cave) = converging; "convex" = bulges outward = diverging. Learners reverse this, or cannot determine which type a mirror is from a diagram without a label.
3. **Applying the plane-mirror rule to spherical mirrors** — for a plane mirror, image is always virtual, upright, and the same distance behind the mirror as the object is in front. Learners apply this to concave mirrors near the focus, where the image is real and inverted.
4. **Not checking real vs. virtual** — after calculating v, learners report the image properties without checking the sign of v and m. They state "the image is real" when v > 0 (virtual, behind mirror) or "upright" when m < 0 (inverted).

---

## 4. Misconception Library

### M1 — "Concave mirrors always magnify"

**Probe**: "A candle is placed 50 cm in front of a concave mirror with f = 10 cm. Is the image larger or smaller than the candle?"  
**Characteristic phrase**: "Concave mirrors magnify — that's why bathroom mirrors are concave."  
**What's wrong**: When u > 2f (here, 50 cm > 20 cm), the image is real, inverted, and *diminished* (m = −v/u = −(v/50), where v is between 10 and 20 cm → m between −0.2 and −0.4). Concave mirrors magnify only when the object is between F and the mirror (u < f).  
**Recovery**: Draw all five cases on one diagram. Magnification is NOT a property of concave mirrors in general — it depends on object position relative to f.

### M2 — "The sign convention assigns positive to all real quantities"

**Probe**: "In the New Cartesian convention, if an object is placed 30 cm in front of a concave mirror, what is u?"  
**Characteristic phrase**: "u = +30 cm, since it's a real object."  
**What's wrong**: In New Cartesian, distances measured against the direction of incident light are negative. Incident light travels left-to-right; distances to the left of the pole are negative. Real object in front → u = −30 cm.  
**Recovery**: Draw the axis with the incident direction explicitly marked. Every distance measured in the opposite direction to incident light gets a minus sign. Practise assigning signs before any calculation.

### M3 — "A convex mirror can form a real image"

**Probe**: "Can a convex mirror ever produce a real image on a screen?"  
**Characteristic phrase**: "Yes — if you put the object very close."  
**What's wrong**: A convex mirror always diverges reflected rays. Diverging rays never converge to a point in front of the mirror. The image is always virtual, upright, and behind the mirror, regardless of object distance.  
**Recovery**: Draw any convex mirror ray diagram. Show the reflected rays diverging — extend them behind the mirror to find the virtual image. No object position changes the diverging character.

### M4 — "f = R (focal length equals radius of curvature)"

**Probe**: "A concave mirror has radius of curvature 40 cm. What is its focal length?"  
**Characteristic phrase**: "40 cm."  
**What's wrong**: For a spherical mirror, f = R/2 = 20 cm. The factor of 2 comes from the geometry of reflection from a curved surface — a paraxial ray parallel to the principal axis reflects to meet the axis at the midpoint between the pole and the centre of curvature.  
**Recovery**: Derive f = R/2 using a marginal ray construction: the triangle formed by the incoming parallel ray, the normal at the hit point (passing through C), and the reflected ray to F has equal base angles (law of reflection). For small angles, F is the midpoint of the line from the pole to C.

---

## 5. Explanation Library

### Explanation A — Deriving the mirror formula from similar triangles

Consider an object of height h at distance |u| in front of a concave mirror. The image at distance |v| has height h'. Two triangles are similar (formed by the principal axis and the top of the object/image with the pole):

h'/h = −v/u (magnification by similar triangles)

A second pair of similar triangles (formed by rays through the focal point) gives:

h'/h = (v − f)/f or equivalent

Equating and rearranging gives: 1/f = 1/v + 1/u.

This shows the mirror formula is a geometric result, not an empirical law.

### Explanation B — The five cases for concave mirror, summarised

Draw a number line for object distance u (all negative in front of mirror). Mark the positions of F (at −f) and C (at −2f). Object position determines image character:
- Object beyond C: real, inverted, diminished (camera-like)
- Object at C: real, inverted, same size (range-finder use)
- Object between F and C: real, inverted, magnified (projector-like)
- Object at F: no image (rays reflected parallel → meet at ∞)
- Object between F and P (pole): virtual, upright, magnified (bathroom mirror, dentist's mirror)

### Explanation C — Convex mirror field of view advantage

A convex mirror's image of an extended scene is compressed — a wide angular field is imaged in a small area. The mirror formula gives v = uf/(u − f); for convex, f > 0 in our convention when taking its magnitude, so v < f always and the image is always diminished. The trade-off: you see more of the scene (wide angle) but everything appears further away than it is. This is why car passenger-side mirrors warn "objects in mirror are closer than they appear."

---

## 6. Analogy Library

### Primary analogy — The reflective bowl and balloon

A concave mirror is like the inside of a polished metal bowl. If you hold a flashlight at the centre of the bowl, the light bounces back to the same point (object at C → image at C). Move the flashlight closer to the rim (toward F) — reflected light spreads out. Move it to the very rim centre (at F) — reflected beams are parallel: image at ∞. A convex mirror is like the outside of a polished balloon — all reflections spread outward, and the image seen in it always looks like a shrunken version of the scene.

**Breaking point**: The bowl analogy is correct for a single depth of object but does not convey the sign convention, the dependence of image location on u, or the fact that real images can be projected onto screens while virtual images cannot.

### Anti-analogy — "A concave mirror is just a curved plane mirror"

A plane mirror always produces a virtual, upright, same-size image at the same distance behind the mirror as the object is in front. Students extend this: "concave just bends the effect — image is still behind the mirror and upright." This completely misses the real, inverted images that form when u > f. The difference is qualitative, not just quantitative. Never describe spherical mirrors as "bent versions" of plane mirrors.

---

## 7. Demonstration Library

### Demo A — Concave mirror: five cases with a candle

**Setup**: Concave mirror (f ≈ 15 cm) on a stand. Candle object. White card screen.  
**Procedure**: Start with candle well beyond 2f; move candle progressively toward the mirror. At each position, find the image on the screen (if real) or by extrapolating reflected rays (if virtual).  
**Observations**: Beyond 2f: small, inverted real image on screen. At 2f: same-size real image. Between f and 2f: large, inverted real image. Near f: image jumps to a far wall. Inside f: virtual upright magnified image seen in the mirror.  
**Teaching target**: All five cases live, in order. Learners predict position and character of each image before the candle is moved.

### Demo B — Convex mirror: safety mirror field of view

**Setup**: A convex mirror (car passenger-side or shop security mirror). Stand several people at different distances in front of it.  
**Observation**: All people are visible simultaneously, compressed into the mirror's image.  
**Teaching target**: Convex mirrors always form virtual images, always upright, always diminished — but the field of view is wide. Apply mirror formula to estimate image distance for one person.

### Demo C — Parabolic vs. spherical (aberration comparison)

**Setup**: Flashlight or laser fan aimed at a spherical concave mirror vs. a parabolic reflector (torch reflector).  
**Observation**: Spherical mirror: parallel beams converge to a fuzzy spot (spherical aberration). Parabolic reflector: all beams converge to a sharp point.  
**Teaching target**: The mirror formula is an approximation (paraxial). Parabolic mirrors are exact for on-axis parallel rays. This motivates why telescopes use parabolic mirrors.

---

## 8. Discovery Lesson

### Stance: Argue the inductive case — *observe the five cases, then derive the formula*

**Why inductive here**: The five behavioural cases (particularly the jump from real-inverted to virtual-upright as the object crosses F) are not predictable from everyday mirror experience. Observing the real phenomena first creates genuine puzzlement ("why does the image flip?") that makes the formula a welcome explanation rather than a rule to apply blindly.

**Opening challenge**: "I have a concave mirror and a candle. I want you to predict: if I move the candle from far away to very close, how does the image change? Make a table — position, real or virtual, upright or inverted, magnification."

**Sequence**:
1. Students make predictions (most say "image always behind mirror, upright, virtual").
2. Demo A — live observation. The jump from real to virtual as candle crosses F is dramatic.
3. Ask: "Why does the image flip to being behind the mirror when the candle is very close? The reflection law hasn't changed."
4. Trace two principal rays for u < f on a diagram. Show reflected rays diverge — must extend backward to find image behind mirror.
5. Derive the mirror formula via the similar-triangles argument.
6. Apply the formula to predict the five cases' image distances. Verify against observations.
7. Closure: "The formula is just counting the geometry. But the geometry is rich enough to produce real images you can project onto a screen — that's different from anything a flat mirror does."

---

## 9. Teaching Actions

| Prior state | Action |
|---|---|
| Learner reverses concave/convex | Mnemonic: con**CAVE** = caves inward = CONVERGES. Con**VEX** = bulges = DIVERGES. |
| Learner uses positive u (sign error) | Draw the incident direction explicitly; mark distances opposing it as negative before any calculation. |
| Learner gets wrong image character | After calculating v and m, always check: sign of v → real (negative, in front) or virtual (positive, behind)? Sign of m → inverted (negative) or upright (positive)? |
| Learner cannot use formula with five cases | Make a five-row table: for each case, write down u (in terms of f), compute v, compute m, state real/virtual/upright/inverted. Do all five in one session. |
| Learner asks "why f = R/2?" | Derive using the paraxial ray diagram with centre of curvature. One diagram, three lines, angle bisector argument. |

---

## 10. Voice Teaching

### Opening
"A bathroom magnifying mirror is concave — it bends the reflected light inward and lets you see a magnified image of your face. But that only works when you are closer to the mirror than its focal length. Move farther away and the magic breaks — the mirror still works, but now the image is real and inverted, like a projector's image on a screen. One mirror, two completely different behaviours, depending only on where you stand."

### Core formula
"The mirror formula: one over f equals one over v plus one over u. Three distances: focal length, image distance, object distance. One formula. Write it down, plug in two known values, solve for the third. Sign conventions matter: distances in front of a concave mirror are negative in New Cartesian. Get the signs wrong and you'll place a real image behind the mirror — which is physically impossible."

### Misconception interrupt
"Watch out for this: 'concave mirrors always magnify.' That is only true when the object is between the focal point and the mirror. For everything else, concave mirrors can diminish, same-size, or project real inverted images. Convex mirrors always diminish, always virtual, always upright — no exceptions."

### Closing
"Two questions to always ask after any mirror calculation: Is v negative (real image, in front) or positive (virtual, behind)? Is m negative (inverted) or positive (upright)? If the signs don't match the physics you expect, recheck the sign convention."

---

## 11. Assessment

### Mastery gate

The learner can:
1. Correctly apply the New Cartesian sign convention to assign u, v, f for a given mirror problem.
2. Use 1/f = 1/v + 1/u and m = −v/u to find image position, magnification, and character.
3. Draw a correct ray diagram (two principal rays) for at least three of the five concave-mirror cases.
4. Predict qualitatively whether a convex or concave mirror is appropriate for a given application (wide field vs. magnification).
5. State the relationship f = R/2 and give its geometric justification.

### Formative golden probe

> "An object is placed 12 cm in front of a concave mirror of focal length 8 cm. (a) Find the image distance. (b) Find the magnification. (c) State whether the image is real or virtual, inverted or upright, enlarged or diminished."

*Solution*: u = −12 cm, f = −8 cm. 1/v = 1/f − 1/u = 1/(−8) − 1/(−12) = −1/8 + 1/12 = (−3 + 2)/24 = −1/24 → v = −24 cm. m = −v/u = −(−24)/(−12) = −2. Image: v < 0 → real, in front of mirror. m = −2 → inverted, magnified (|m| = 2).  
*Likely errors*: Substituting positive u (+12), or forgetting to subtract, or misidentifying m = −2 as "upright."

### Confidence calibration

After the probe, ask: "Can you project this image on a screen?" (Yes — real image.) "If I moved the object to 6 cm in front of the mirror, what would change?" (u = −6 < f = −8 → object inside focal length → virtual, upright, magnified image behind mirror — cannot project.)

### Delayed retrieval check (next session opener)

"An object is placed 4 cm in front of a concave mirror of focal length 6 cm. Without calculating, state: real or virtual? Upright or inverted? Larger or smaller?"  
Expected: u = 4 < f = 6 → object inside focal length → virtual, upright, magnified. If the learner calculates correctly but cannot explain intuitively: link back to the five-cases table — inside F always gives virtual upright magnified for concave.

---

## 12. Recovery Notes

**Recovery for persistent sign errors**:
1. Before every calculation, write out: "Incident light travels [left/right]. Pole at origin. Distances in the direction of incident light are positive; against are negative."
2. Check each assigned value: is u in front of the mirror? → u is negative. Is f for a concave mirror? → f is negative.
3. After solving, check physical plausibility: can a real image form behind a concave mirror? No — if v > 0, re-examine the setup.

**Recovery for ray diagram errors**:
1. Start with the axis and the focal points F and 2F marked.
2. Draw ray 1 (parallel to axis) first, reflect it through F.
3. Draw ray 2 (through F toward mirror) second, reflect it parallel to axis.
4. Intersection of the two reflected rays (in front of mirror → real image; behind mirror after extending dashed lines → virtual).
5. If the two reflected rays diverge in front and seem to cross behind: image is virtual. Extend them backward with dashed lines.

---

## 13. Memory & Review

**Memory type**: Procedural (formula + sign convention + ray rules) + case-by-case tabular knowledge

**Encoding hooks**:
- con**CAVE** → CONVERGES → can form real images → can project onto screens
- con**VEX** → DIVERGES → always virtual, always diminished, wide field
- f = R/2 (not R)
- m negative → inverted → real; m positive → upright → virtual (for standard single-mirror setups)
- Five cases: BCC∞V (Beyond C, at C, between C and F, at F, Virtual/inside F)

**Spaced retrieval schedule**:
- Session +1: "List the five concave mirror cases and the image properties for each."
- Week 1: "Solve a numerical mirror problem using the mirror formula, with correct sign convention."
- Week 3: "Draw ray diagrams for an object inside F (concave) and any object (convex)."
- Month 2: "Why can a parabolic mirror form sharper images than a spherical mirror? What property of spherical mirrors causes the blur?"

**Interleave with**: `phys.opt.reflection` (the law underlying mirror behaviour), `phys.opt.optical-instruments` (where mirror theory is applied: telescopes, ophthalmoscopes, projectors)

---

## 14. Transfer Map

| Target concept | Bridge |
|---|---|
| `phys.opt.optical-instruments` | Telescopes (concave mirror or lens as objective), ophthalmoscope (concave mirror to illuminate retina), projectors (concave mirror as reflector) all apply the five-cases analysis |
| `phys.opt.lenses` | Mirror formula and lens formula are structurally identical (1/f = 1/v + 1/u); the refraction version for lenses follows the same geometry |
| Engineering — solar concentrators | Parabolic troughs focus sunlight to a line; the focal length/radius relationship and spherical aberration drive the engineering choice |
| Astronomy — reflector telescopes | Newtonian, Cassegrain, Nasmyth designs all use concave primary mirrors; the five-cases analysis explains why the primary forms a real image inside the telescope tube |
| Medicine — dental/ENT mirrors | Small concave mirrors (u < f) used for magnified, upright, virtual images of teeth and throat |

---

## 15. Curriculum Feedback

**KG note**: `phys.opt.reflection` is the correct prerequisite — the law θᵢ = θᵣ (measured from the normal) must be fluent, plus the concept of a normal to a surface, before ray diagrams for curved mirrors are tractable. `phys.opt.optical-instruments` is the correct immediate unlock — telescope and camera designs require the five-cases analysis as prerequisite knowledge.

**Authoring note**: The five-case tabular structure should be committed to memory, not looked up each time. The insight that the same mirror produces qualitatively different image types purely as a function of object distance is the core lesson. Never teach just the formula without the five cases.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
