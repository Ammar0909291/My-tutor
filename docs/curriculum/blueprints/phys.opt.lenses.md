# Teaching Blueprint: phys.opt.lenses

## 0. Concept Profile

concept_id: phys.opt.lenses
name: Thin Lenses and Lens Formula (KG-verified; request alias: Thin Lenses — Convex and Concave)
domain: Optics (Physics)
difficulty: proficient (4)
bloom: apply
prerequisites: [phys.opt.refraction]
mastery_threshold: 0.80
estimated_hours: 5
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (anchor; difficulty 4 → C with accelerated P track)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. States the thin lens formula 1/f = 1/v − 1/u and the New Cartesian sign convention: incident light travels left to right; all distances measured from the optical centre; distances along the direction of incident light are positive; distances against it are negative; real objects always give u < 0; convex lens f > 0; concave lens f < 0.
2. For a given object distance u and focal length f, computes v using the lens formula, states whether the image is real (v > 0) or virtual (v < 0), and explains the physical meaning of the sign.
3. Applies magnification m = v/u — the lens formula carries no negative sign, unlike the mirror formula m = −v/u — and interprets: m > 0 means erect; m < 0 means inverted; |m| > 1 means magnified; |m| < 1 means diminished.
4. Classifies all six image cases for a convex lens (object at infinity, beyond 2F, at 2F, between F and 2F, at F, inside F) and states the universal concave-lens rule: a real object always produces a virtual, erect, diminished image.
5. Applies power P = 1/f (diopters, f in metres) and the in-contact combined-lens formula 1/f_total = 1/f_1 + 1/f_2 (equivalently P_total = P_1 + P_2), and recognises this formula is invalid when the two lenses are separated by a non-zero distance.

A student who imports m = −v/u from the mirror chapter into a lens problem, or sums lens powers without checking the in-contact condition, or concludes that a convex lens always produces a real image regardless of object position, has NOT achieved mastery — these are the three most dangerous transfer errors from the mirrors chapter and all three propagate directly into optical-instruments problems downstream.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | No prior exposure to thin lenses or lens formula | Cannot write 1/f = 1/v − 1/u; does not know the sign convention for u | Protocol A (Concrete) |
| S3 | Knows the lens formula but imports the mirror magnification sign | Correctly computes v; then gives m = −v/u → wrong erect/inverted conclusion | Misconception Engine → Protocol C |
| S6 | Anxiety over sign convention; freezes at sign assignment | Recalls the formula correctly but stalls on "is u positive or negative here?" | Protocol F (Low Pressure) |
| S9 | Overconfident; sums lens powers without checking the contact condition | Rapidly writes P_total = P_1 + P_2 for a non-contact configuration without hesitation | Protocol G (Challenge-First) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"Write the thin lens formula and tell me the sign of u for a real object placed to the left of the lens."
  Writes 1/f = 1/v − 1/u and states u < 0 → S3. Enter Protocol C.
  Writes a formula but cannot state the sign rule → DB-2.
  Cannot recall any formula → DB-2.

DB-2 (application probe):
"A convex lens has focal length 20 cm. An object is placed 30 cm in front of it (u = −30 cm). Find the image distance v."
  Correctly uses 1/v = 1/f + 1/u → v = +60 cm → S3. Enter Protocol C.
  Attempts the formula but gets the wrong v, or uses an unrelated formula → S0. Enter Protocol A.
  "I do not know where to start" → S0. Enter Protocol A.
  Pause or distress signal → add S6 flag → confidence question → route (score 1–2: S6/F; score 3–5: S0/A with S6 adaptations).

DB-3 (confidence calibration):
"How confident are you with lens calculations — 1 to 5?"
  1–2 → add S6 flag; apply Protocol F adaptations throughout.
  4–5 with DB-2 errors → add S9 flag; override to Protocol G (challenge-first).

## 4. Prerequisite Check

PD-1 (for phys.opt.refraction):
"State Snell's law and describe what happens to a ray of light as it passes from air into glass."
  Cannot state n_1 sin θ_1 = n_2 sin θ_2 or cannot describe bending toward the normal → flag PREREQ-GAP-REFRACTION.
  In-session minimum repair: one P06 anchor (Snell's law demonstration — straw bent in a glass of water; bending toward the normal when entering denser medium) — then resume Protocol A TA-1. Deep gap → schedule phys.opt.refraction (S4 route) and suspend this session.

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: C → P → A
Entry condition: no prior exposure to thin lens formula (DB-1 = cannot recall formula; DB-2 = cannot start).
Success exit: correctly computes v and m for a convex lens problem, correctly identifies image nature (real/virtual, erect/inverted), and passes P91 all 5 CORRECT.
Failure exit: on MC-MAGNIFICATION-MIRROR-SIGN signal → Misconception Engine, then resume at TA-5. On sign-convention collapse → add S6 flag → Protocol F adaptations from next TA onward.
Duration: ~90–110 min (may span 2 sessions).

[TA-1: Concrete Exploration — Rays and the Focal Point]
P01
→ P04[content: "A thin lens refracts light twice — once at the entry surface and once at the exit surface. Because the lens is thin (thickness much smaller than the focal length), both refractions are treated as a single event at the optical centre. This approximation is what lets us write a clean two-term formula."]
→ P06[content: hold a convex lens (magnifying glass) in direct sunlight and move it slowly toward a white sheet of paper; observe the spot of concentrated light sharpen to a bright point at one particular distance — that distance from lens to paper is the focal length f; measure and record it; then move the lens slightly closer or farther and observe the spot expanding again]
→ P13[think-aloud: "The sun is so far away that its rays arrive practically parallel. A convex lens bends every parallel ray so that all of them meet at one point: the principal focus F. The distance from the optical centre to F is f, the focal length. A concave lens does the opposite: parallel rays emerge diverging after passing through — they appear to have come from a focus F on the same side as the incoming rays. Because this focus is on the incoming side, f is assigned a negative value."]
→ P34[question: "If you repeated the sunlight experiment with a concave lens instead of the magnifying glass, what would you expect to see on the paper? Would you get a focused bright spot?"] → P55
→ success_path[student identifies no focused spot: rays diverge after the concave lens, no real focus on the far side] → P49 → P05[curiosity: "A convex lens is called a converging lens — yet we will find in TA-3 that there is one object position where it produces a diverging beam. Keep that puzzle in mind as we build up the formula."]

[TA-2: Lens Formula and Sign Convention]
P02
→ P07[modality: a labelled diagram — optical centre O on the principal axis; object arrow on the left at distance |u| from O; real-image arrow on the right at distance |v| from O; labels mark 'incident-light side' (left of O = negative under New Cartesian) and 'transmitted-light side' (right of O = positive); a separate small sketch for the virtual-image case showing the image on the same side as the object]
→ P08[notation: "New Cartesian sign rules: (a) all distances measured from the optical centre O; (b) distances in the direction of incident light (rightward) are positive; (c) distances against incident light (leftward) are negative; (d) real object → u < 0 always; (e) convex lens → f > 0; (f) concave lens → f < 0; (g) real image → v > 0; (h) virtual image → v < 0 (on the same side as the object). Thin lens formula: 1/f = 1/v − 1/u. Rearranged for computation: 1/v = 1/f + 1/u."]
// GR-3 satisfied: P07 preceded P08 (V-8 PASS)
→ P13[think-aloud: "WE-1: f = +20 cm, u = −30 cm. 1/v = 1/20 + 1/(−30) = 3/60 − 2/60 = 1/60. So v = +60 cm. Positive v: real image, on the far side of the lens, inverted. Magnification: m = v/u = (+60)/(−30) = −2. Negative m: inverted. |m| = 2: twice the object size."]
→ P34[question: "Use the same convex lens (f = +20 cm) but move the object to u = −10 cm — inside the focal length. Compute v step by step."] → P55
→ success_path[v = −20 cm] → P49 → P36[probe: "v came out negative. What does that tell you about where the image is located?"] → P55
→ failure_path → P50 → P52[narrow: "1/v = 1/20 + 1/(−10) = 1/20 − 2/20 = −1/20. So v = −20 cm. Negative v means the image is on the SAME side as the object — it is a virtual image. This is exactly how a magnifying glass works: object inside F, large virtual image behind the lens on the same side."] → re-elicit → P55
→ P05[curiosity: "The focal length f itself comes from the lens shape and material. For a lens of refractive index n with front-surface radius R_1 and back-surface radius R_2: 1/f = (n − 1)(1/R_1 − 1/R_2). This is the Lensmaker's equation — VIS-3 shows the geometry. We will not use it in calculations today, but it explains why grinding the surface curvature changes the focal length."]

[TA-3: Convex Lens — Six Image Cases]
P02
→ P07[modality: VIS-2 — a six-row image-formation table with columns: object position, computed v (sign and magnitude), image nature (real/virtual), orientation (erect/inverted), relative size; VIS-1 — an interactive lens ray-diagram simulator showing the three principal rays for each of the six cases]
→ P13[think-aloud: "Systematically apply 1/v = 1/f + 1/u with f = +20 cm. Case 1 — u → −∞: 1/v = 1/20 + 0 → v = +20 cm; real, inverted, point image at F. Case 2 — u = −60 cm (beyond 2F): 1/v = 1/20 − 1/60 = 2/60 → v = +30 cm; real, inverted, diminished. Case 3 — u = −40 cm (at 2F): 1/v = 1/20 − 1/40 = 1/40 → v = +40 cm = 2f; real, inverted, same size. Case 4 — u = −30 cm (between F and 2F): v = +60 cm; real, inverted, magnified. Case 5 — u = −20 cm (at F): 1/v = 1/20 − 1/20 = 0 → v → ±∞; no image forms at any finite distance. Case 6 — u = −10 cm (inside F): 1/v = 1/20 − 1/10 = −1/20 → v = −20 cm; virtual, erect, magnified — this is the magnifying-glass mode."]
→ P34[question: "Complete the table row for u = −40 cm (object at 2F, f = +20 cm): compute v, then state the image nature, orientation, and size relative to the object."] → P55
→ success_path[v = +40 cm; real, inverted, same size] → P49
→ failure_path → P50 → P52[narrow: "1/v = 1/20 + 1/(−40) = 2/40 − 1/40 = 1/40. So v = +40 cm. The image lands at 2F on the far side — real, inverted, and exactly the same size as the object. This symmetric case (object at 2F → image at 2F) is a useful memory anchor."] → re-elicit → P55
→ P36[probe: "The lens is called 'converging' — yet case 6 gives a diverging beam on the far side. How do you reconcile the two?"] → P55

[TA-4: Concave Lens — The Always-Virtual Rule]
P02
→ P13[think-aloud: "WE-2: f = −15 cm, u = −25 cm. 1/v = 1/(−15) + 1/(−25) = −5/75 − 3/75 = −8/75. v = −75/8 = −9.375 cm. Negative: virtual, same side as object. m = v/u = (−9.375)/(−25) = +0.375 → erect, diminished. Now try f = −30 cm, u = −15 cm: 1/v = 1/(−30) + 1/(−15) = −1/30 − 2/30 = −3/30 → v = −10 cm. Negative again. m = (−10)/(−15) = +0.667 → erect, diminished again. The pattern is invariant."]
→ P34[question: "Try f = −20 cm, u = −60 cm. Compute v and m. State the image nature and orientation."] → P55
→ success_path[v = −15 cm; m = +0.25; virtual, erect, diminished] → P49
→ failure_path → P50 → P52[narrow: "1/v = 1/(−20) + 1/(−60) = −3/60 − 1/60 = −4/60. v = −15 cm. m = (−15)/(−60) = +0.25. Again: negative v, positive m less than one. Can you now state the rule that holds for a concave lens regardless of where the real object is placed?"] → re-elicit → P55
→ P08[notation: "Concave lens universal rule: for any real object u < 0 and f < 0, we have 1/v = 1/f + 1/u where both terms are negative, so 1/v < 0 → v < 0 always → image always virtual, always erect (m = v/u > 0 since both negative), always diminished (|m| < 1 because |v| < |u|). No exceptions for real objects."]

[TA-5: Magnification — m = v/u (Not the Mirror Formula)]
P02
→ P54 // the mirror-to-lens magnification sign transfer error is the most common first-attempt mistake at this stage; must prime before elicitation
→ P08[notation: "Lens: m = v/u. Mirror: m = −v/u. These differ by a sign. The geometric reason: for a mirror, the object and its image are on the same side of the reflecting surface, introducing a geometric negative in the derivation. For a lens, the object and image are on opposite sides of the refracting surface — no such geometric negative arises. Never import the mirror's minus sign into a lens problem."]
→ P13[think-aloud: "WE-1 revisited: v = +60 cm, u = −30 cm → m = (+60)/(−30) = −2. Negative: inverted. Magnitude 2: twice the size. A student using the mirror formula would get m = −(+60)/(−30) = +2 → erect — the wrong orientation. WE-2 revisited: v = −9.375 cm, u = −25 cm → m = (−9.375)/(−25) = +0.375 → erect, diminished. The correct formula gives the right orientation automatically from the signs — no memorising of image tables is needed."]
→ P34[question: "A lens gives v = +30 cm for u = −30 cm. Compute m using the lens formula. State whether the image is erect or inverted. What would the mirror formula give for the same numbers?"] → P55
→ success_path[m = −1, inverted; mirror formula gives +1, erect — wrong] → P49 → P36[probe: "In this case both formulas give |m| = 1 but opposite signs. For what category of problems does the sign error in m change a physically important conclusion — for example, whether the image on a camera sensor is the right way up?"] → P55
→ failure_path → P50 → P52[narrow: "m = v/u = (+30)/(−30) = −1. Inverted, same size. The mirror formula would give m = −(+30)/(−30) = +1 — erect, which is wrong. The magnitudes are the same; only the orientation flips. That orientation error matters whenever you need to describe what a camera records or how a projector displays text."] → re-elicit → P55

[TA-6: Misconception Probe — Validity of Combined-Lens and Thin-Lens Formulas]
P02
→ P54 // two validity boundaries must be explicit before the student attempts diagnostic problems
→ P41[diagnostic-1: "Two lenses: f_1 = +20 cm, f_2 = −30 cm, separated by 10 cm. A student computes P_total = 5 + (−3.33) = 1.67 D and reports f_total = 60 cm. Is this valid?"] → P55
→ [if "no — the lenses are not in contact; P_1 + P_2 requires d = 0"] → P49 → P36[probe: "What formula replaces P_1 + P_2 when the separation d is non-zero?"] → P55
→ [if "yes — powers always add"] → SIGNAL:MISCONCEPTION:MC-POWER-SEPARATED → misconception_repair_chain[MC-POWER-SEPARATED]
→ P41[diagnostic-2: "WE-3: f_1 = +20 cm, f_2 = −30 cm, in contact (d = 0). Compute f_total and P_total."] → P55
→ success_path[1/f_total = 1/20 + 1/(−30) = 1/60 → f_total = +60 cm; P_total = 5 − 3.33 = +1.67 D] → P49
→ failure_path → P52[narrow: "1/f_total = 1/f_1 + 1/f_2 = 1/20 + 1/(−30) = 3/60 − 2/60 = 1/60. f_total = +60 cm. In diopters: P_1 = 1/0.20 = +5 D; P_2 = 1/(−0.30) = −3.33 D; P_total = +1.67 D. The positive f_total confirms the combined system behaves as a converging lens."] → re-elicit → P55
→ P41[diagnostic-3: "A glass lens has thickness 8 cm and focal length 5 cm. Can you apply 1/f = 1/v − 1/u directly to find where it forms an image?"] → P55
→ [if "no — thickness 8 cm exceeds focal length 5 cm; the thin-lens approximation breaks down"] → P49
→ [if "yes — always valid"] → P30[bridge: "The thin lens formula is derived assuming the lens thickness is negligible compared to the focal length. Here thickness = 8 cm and focal length = 5 cm — the approximation fails. Thick-lens equations that account for two separate principal planes are required."] → P31[replacement: "Before applying 1/f = 1/v − 1/u, confirm that thickness << focal length. For standard NCERT and exam problems this is always satisfied; for real compound optical instruments it must be verified explicitly."]

[TA-7: Formative Assessment (P90) + Mastery Gate (P91)]
P02
→ P90_expansion:
    P79[predict: "A concave lens is placed in front of a very distant tree. Before calculating anything — predict whether the image will be real or virtual, erect or inverted, and give the reasoning in one sentence."] → P55
    → P49 → P51[check: did the student apply the always-virtual rule from TA-4 without computing, or did they reach for the formula first? A student who applies the rule directly has internalised it; a student who computes is still formula-dependent — note the difference.]
    → P35[open: "Explain in your own words why the magnification formula for a lens is m = v/u while for a mirror it is m = −v/u. What geometric difference between the two instruments drives this?"] → P55
→ P91_expansion:
    P77[generate: "Write a lens problem — choose your own lens type, focal length, and object position — in which the image is virtual. State the condition on object position that guarantees a virtual image for a convex lens specifically."] → P55 → CORRECT
    P76[transfer: "A camera uses a convex lens of focal length 5 cm to photograph a subject 50 cm away. Find v and m, and describe what the image looks like on the sensor."] → P55 → CORRECT
    P75[boundary: "When does the formula P_total = P_1 + P_2 fail for two thin lenses? State the corrected formula for separated lenses."] → P55 → CORRECT
    P74[classify: "A lens produces v = −20 cm for u = −30 cm. Is the lens converging or diverging? Compute f and P."] → P55 → CORRECT
    P78[explain: "In your own words: state the thin lens formula with its sign convention, interpret what a negative v tells you about the image, and give the one condition under which P_total = P_1 + P_2 is exact."] → P55 → CORRECT
→ P68 → P85[regulation_tail: "You have worked through all seven cases of image formation and the full toolkit: sign convention, 1/f = 1/v − 1/u, m = v/u, and the in-contact power rule. Every thin-lens problem in this course reduces to these three tools applied carefully."] → P62[schedule: first retrieval in 2 days]

### Protocol B — Counterexample-First
Not applicable: no S1 state in this concept's matrix. Students who recall a formula but lack sign-convention fluency are routed to Protocol F (S6). Students who recall the formula and compute correctly but apply the wrong magnification sign enter the Misconception Engine and Protocol C.

### Protocol C — Guided Questioning
Serves: S3 (knows lens formula; imports mirror magnification sign m = −v/u)
CPA entry: P
Entry condition: computes v correctly from the lens formula; substitutes m = −v/u → wrong orientation conclusion.
Success exit: correctly applies m = v/u and interprets the sign of m consistently across real and virtual image cases.
Failure exit: if sign-convention anxiety emerges alongside the magnification error → add S6 flag → Protocol F adaptations from next TA onward.
Key deltas: enter at TA-5; open with P36 ("where does the minus sign in the mirror magnification formula come from geometrically?") before the first elicitation; run P28 conflict evidence for MC-MAGNIFICATION-MIRROR-SIGN before first attempt (do not skip P28 — this is Protocol C, not F); P51 check on orientation interpretation after each worked example; converge on TA-7 P90/P91.

### Protocol D — Prerequisite Repair (S4)
Serves: S4; entry PREREQ-GAP-REFRACTION; success = n_1 sin θ_1 = n_2 sin θ_2 re-established and student can describe bending toward the normal → return to Protocol A TA-1; failure = schedule phys.opt.refraction, suspend this session.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: C
Success exit: correctly assigns signs to u, v, and f and applies the lens formula to solve one convex-lens and one concave-lens problem without stalling.
Failure exit: shorten session to a single complete calculation, bank it as a win, reschedule.
Key deltas: NO P28 (V-10/GR-5); conflict language replaced entirely by P30 bridge; keep the sign-convention reference diagram (from P07 in TA-2) visible throughout every TA; P85 regulation_tail after each TA rather than only at session end; in TA-3, present only cases 1 and 6 initially (the two clearest extremes: object at infinity → real image at F; object inside F → virtual image) — do not run all six cases until sign anxiety is resolved; defer TA-6 diagnostic-3 (thick-lens boundary) until the student is settled.

### Protocol G — Challenge-First (S9, overconfident power-adder)
Serves: S9; entry DB-3 confidence 4–5 with MC-POWER-SEPARATED error (rapid unsolicited P_1 + P_2 for a separated-lens configuration).
Success exit: student corrects the power-addition rule to the in-contact condition and applies 1/f = 1/f_1 + 1/f_2 − d/(f_1 f_2) for separated lenses without prompting.
Failure exit: Misconception Engine[MC-POWER-SEPARATED].
Key deltas: P54 before the first problem; open with a separated-lens problem (f_1 = +30 cm, f_2 = +20 cm, d = 10 cm); let the student commit to P_1 + P_2 first (do not correct early); then compute the correct result using 1/f = 1/f_1 + 1/f_2 − d/(f_1 f_2) together; surface the numerical discrepancy explicitly (P55 — let the tension sit); introduce the contact condition; no premature confirmation.

## 6. Misconception Engine

### MC-CONVEX-ALWAYS-CONVERGES: "A convex lens always produces a converging beam regardless of object position"
trigger_signal: student concludes a real image for an object placed inside F, or states that the rays after a convex lens are always convergent no matter where the object is.
conflict_evidence [P28]: "TA-3 case 6 — f = +20 cm, u = −10 cm → 1/v = 1/20 − 1/10 = −1/20 → v = −20 cm. Negative v: the image is on the SAME side as the object. The rays on the far side of the lens are diverging — they only appear to come from the virtual image point behind the lens. A convex lens converges parallel incoming rays — that is what the label 'converging' means. With the object inside F, the lens still refracts each ray toward the axis, but not by enough to make them actually cross on the far side. The 'converging' label describes the lens's effect on parallel rays, not a guarantee for every possible input configuration."
bridge_text [P30]: "Whether a convex lens produces a real or virtual image depends on the object distance, not just the lens type. The formula decides: 1/v = 1/f + 1/u. If v > 0, the image is real and the exiting beam converges. If v < 0, the image is virtual and the exiting beam diverges. Let the sign of v answer the question every time."
replacement_text [P31]: "Before labelling an image real or virtual: compute v from the lens formula. The sign of v is the only reliable indicator — not the lens type alone, not a diagram drawn from memory."
discrimination_pairs [P33]: ["convex lens, object beyond F: v > 0 → real, converging exit beam ✓", "convex lens, object inside F: v < 0 → virtual, diverging exit beam — magnifying-glass mode ✓", "concave lens, any real object: v always negative → virtual image ✓"]
s6_path: skip P28; hold a magnifying glass close to printed text and ask the student to describe what they see — "is that image on the paper between us, or does it appear to be behind the lens?" — establish that it is virtual; then P30.

### MC-MAGNIFICATION-MIRROR-SIGN: "Lens magnification is m = −v/u (incorrectly imported from the mirror formula)"
trigger_signal: student writes m = −v/u for a lens problem; or identifies an inverted image as erect (or an erect image as inverted) because of the spurious negative sign.
conflict_evidence [P28]: "WE-1: v = +60 cm, u = −30 cm. Lens formula (correct) gives m = (+60)/(−30) = −2 → inverted. Mirror formula (incorrect import) gives m = −(+60)/(−30) = +2 → erect. The ray diagram for this case — object beyond 2F, real image on the far side — unambiguously shows an inverted image. The mirror formula gives the wrong orientation for a lens. Geometric cause: for a mirror, the object and image are on the same side of the reflective surface, which introduces a geometric negative in the derivation of m. For a lens, the object and image are on opposite sides of the transmitting surface — that geometric negative does not arise."
bridge_text [P30]: "Mirror: m = −v/u (same-side geometry → geometric negative in derivation). Lens: m = v/u (opposite-side geometry → no geometric negative). Write both side by side and learn the structural reason, not just the symbol difference."
replacement_text [P31]: "For any lens problem: m = v/u. For any mirror problem: m = −v/u. These never cross over into each other."
discrimination_pairs [P33]: ["convex lens, real image (v > 0, u < 0): m = v/u < 0 → inverted ✓", "convex lens, virtual image (v < 0, u < 0): m = v/u > 0 → erect ✓", "concave lens (v < 0, u < 0): m = v/u is positive and less than 1 → erect, diminished ✓"]
s6_path: skip P28; draw the lens with object on the left and image on the right for a real case; show by similar triangles that m = image height / object height = v/u with no minus sign; then P30.

### MC-POWER-SEPARATED: "Lens powers always add: P_total = P_1 + P_2 regardless of separation between the lenses"
trigger_signal: student sums powers for two lenses separated by a non-zero distance d without checking or acknowledging the in-contact condition.
conflict_evidence [P28]: "Consider f_1 = +20 cm and f_2 = +30 cm placed in contact: 1/f = 1/20 + 1/30 = 3/60 + 2/60 = 5/60 → f = 12 cm. Now separate them by d = 10 cm: 1/f = 1/20 + 1/30 − 10/(20 × 30) = 5/60 − 1/60 = 4/60 → f = 15 cm. The contact formula predicts f = 12 cm; the separated formula gives f = 15 cm — a 25% error in focal length. For a telescope or microscope design, a 25% focal-length error is a design-breaking mistake."
bridge_text [P30]: "P_1 + P_2 is exact only when d = 0 (lenses physically touching). For d > 0, the correct combined focal length formula is 1/f = 1/f_1 + 1/f_2 − d/(f_1 f_2). As the separation d grows, the correction term d/(f_1 f_2) grows and the contact approximation fails increasingly badly."
replacement_text [P31]: "Before adding powers: check whether d = 0. If yes, P_total = P_1 + P_2 is exact. If no, use 1/f = 1/f_1 + 1/f_2 − d/(f_1 f_2)."
discrimination_pairs [P33]: ["two spectacle lenses in a frame touching: P_total = P_1 + P_2 ✓", "eye-piece and objective of a telescope (separated by f_1 + f_2 in normal adjustment): must use the d-correction formula ✓", "two thin lenses cemented together: d = 0 → same as in-contact ✓"]
s6_path: skip P28; compute both formulas side by side for simple numbers and ask the student which answer they trust — then P30.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "A lens gives v = −20 cm for u = −30 cm. Converging or diverging? Compute f and P." | CORRECT = 1/f = 1/v − 1/u = 1/(−20) − 1/(−30) = −3/60 + 2/60 = −1/60 → f = −60 cm → diverging (concave); P = −1.67 D |
| P74 (classify) | "P_1 + P_2 — always valid? State the one condition under which it is exact." | CORRECT = valid only when lenses are in contact (d = 0) |
| P75 (boundary) | "When does the thin lens formula 1/f = 1/v − 1/u break down?" | CORRECT = when the lens thickness is not negligible compared to f (thick lens), or for non-paraxial rays (large angles) |
| P76 (transfer) | "Camera: convex lens f = 5 cm, subject 50 cm away. Find v and m." | CORRECT = 1/v = 1/5 + 1/(−50) = 9/50 → v = 50/9 ≈ 5.56 cm; m = (50/9)/(−50) = −1/9 ≈ −0.111 (real, inverted, strongly diminished) |
| P77 (generate) | "Write a problem where a convex lens produces a virtual image. State the required condition on object distance." | CORRECT = object inside focal length: |u| < f; any valid numerical example |
| P78 (explain) | "State the lens formula with sign convention, interpret a negative v, and give the condition for P_total = P_1 + P_2." | CORRECT = 1/f = 1/v − 1/u; New Cartesian signs; negative v → virtual image, same side as object; condition → lenses in contact (d = 0) |
| P79 (predict) | "Concave lens, very distant object — predict image nature before computing." | CORRECT = virtual, erect, diminished (concave lens universal rule holds for any real object) |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Write a lens problem where the image is virtual — choose the lens type and object position — and solve it completely." → expected: CORRECT
P76: "Camera lens f = 5 cm, object at 50 cm. Find v, m, and describe the image on the sensor." → expected: CORRECT
P75: "When does P_total = P_1 + P_2 fail? State the corrected formula for separated lenses." → expected: CORRECT
P74: "Given v = −20 cm and u = −30 cm — converging or diverging lens? Compute f." → expected: CORRECT
P78: "In your own words: state the lens formula with sign convention, interpret a negative v, and give the in-contact condition for power addition." → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (2 days): "Convex lens, f = +25 cm, object at u = −100 cm. Find v and m. Describe the image fully."
Interval 2 (5 days): "Concave lens, f = −20 cm, object at u = −30 cm. Find v and m. Confirm the image is virtual using the sign of v alone — no ray diagram."
Interval 3 (10 days): "Two thin convex lenses in contact: f_1 = +15 cm, f_2 = +30 cm. Find f_total and P_total."
Interval 4 (21 days): "Convex lens, f = +10 cm, object at u = −10 cm. Compute v. Interpret the result physically — what does it tell you about the image, and why?"
Interval 5 (60 days): "Explain to a classmate: how do you determine whether a lens image is real or virtual using only the lens formula — without drawing a ray diagram? Give one example where the result surprises a student who relies on the lens type alone rather than computing."

---
V-check status:
- V-1 all 10 KG fields ✓ · V-2 NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → state ✓ · V-4 every plausible state (S0, S3, S6, S9[, S4 via PD-1]) has a Protocol ✓ · V-5 every Protocol success+failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 elicitations followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-2: P07 → P08; TA-4: P08 consolidates after TA-3 P07; TA-5: P08 follows TA-2 P07 cross-TA) ✓ · V-9 Schema Repair via P41 gate (TA-6 diagnostics-1/2/3) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68→P85→P62 ✓ · V-12 no >3 consecutive C without E break ✓ · V-13 P54 before high-difficulty first-attempt (TA-5, TA-6, Protocol G) ✓ · V-14 assessment not first (TA-7 last) ✓ · V-15 Named Compounds expanded (P90_expansion, P91_expansion in TA-7) ✓ · V-16 IC-1..20 ✓ · V-17 AIR invariants per TA ✓ · V-18 P90 before P91 (both in TA-7; P90_expansion precedes P91_expansion) ✓ · V-19 P91 5 probes (P77→P76→P75→P74→P78) ✓ · V-20 P89 intervals authored (5 intervals at 2/5/10/21/60 days) ✓
status: READY
PACKAGE_READY
