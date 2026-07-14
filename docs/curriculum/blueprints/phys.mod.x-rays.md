# Teaching Blueprint — phys.mod.x-rays

## Component 0 — Concept Metadata

```
concept_id:         phys.mod.x-rays
name:               X-Rays and Their Properties
domain:             modern physics
difficulty:         proficient (4)
bloom:              understand
mastery_threshold:  0.75
estimated_hours:    4
prerequisites:      [phys.mod.photons]
cross_links:        []
session_cap:        6 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
status:             READY
```

---

## Component 1 — Concept Spine

**Core Insight:** X-rays are high-energy electromagnetic radiation (λ ~ 0.01–10 nm, E ~ 0.1–100 keV)
produced when high-speed electrons decelerate abruptly on hitting a metal target (bremsstrahlung)
or when inner-shell electrons are ejected and replaced (characteristic X-rays). They travel at c,
obey E = hf, and have two key properties: (1) they penetrate soft tissue but are absorbed by bone
and metal (enabling medical imaging), and (2) their wavelength is comparable to atomic spacings,
enabling crystal diffraction (Bragg's law: 2d sin θ = nλ).

**Two Production Mechanisms:**  
1. **Bremsstrahlung (continuous spectrum):** electron decelerates → emits photon of energy up to
   eV_accelerating (cut-off wavelength λ_min = hc/(eV)).  
2. **Characteristic X-rays (line spectrum):** incoming electron ejects inner-shell electron →
   outer-shell electron falls in → emits photon of energy = ΔE between shells (element-specific).

**Bragg's Law (crystallography):** 2d sin θ = nλ where d = crystal plane spacing, θ = glancing
angle. Used to determine crystal structures and (historically) confirmed de Broglie wavelengths.

---

## Component 2 — Four-Stage Mental Model Progression

**Stage 1 — Concrete (C)**  
A chest X-ray: the patient's lungs appear dark (X-rays pass through), ribs appear white (X-rays
absorbed), any metal implants appear bright white. The same radiation that penetrates tissue
cannot penetrate bone or metal — the difference in absorption is the imaging mechanism.

**Stage 2 — Representational (R)**  
Draw the X-ray tube: cathode (hot filament) emits electrons; electrons accelerate through voltage V
to the anode (tungsten target); electrons decelerate abruptly → bremsstrahlung photons emitted.
Maximum photon energy = eV. Draw the continuous spectrum with the characteristic lines superimposed.

**Stage 3 — Abstract (A)**  
Cut-off wavelength: λ_min = hc/(eV). Characteristic line energies: ΔE = E_outer − E_inner for
each element (unique fingerprint). Bragg diffraction: 2d sin θ = nλ. X-ray attenuation in
material: I = I₀ e^{−μx} where μ = linear attenuation coefficient (tissue vs. bone vs. lead differ
by orders of magnitude).

**Stage 4 — Transfer (T)**  
X-ray crystallography (Rosalind Franklin, Watson and Crick — DNA double helix structure 1953);
XPS (X-ray photoelectron spectroscopy — surface chemical analysis); CT scanners (cross-sectional
imaging via multiple X-ray projections); X-ray astronomy (Chandra telescope observes hot gas
in galaxy clusters).

---

## Component 3 — Why Beginners Fail

1. **Confusing bremsstrahlung with characteristic X-rays:** Both come from the same tube but have
   different origins. Bremsstrahlung is a continuous spectrum from electron deceleration;
   characteristic lines are discrete and element-specific.

2. **Forgetting the cut-off wavelength:** Students expect all photon energies to be possible.
   The minimum wavelength (maximum photon energy = eV) is a direct consequence of energy conservation
   and E = hf.

3. **Misapplying Bragg's law (θ is the glancing angle, not the normal incidence angle):** Students
   confuse the glancing angle θ with the angle of incidence measured from the surface normal.
   In Bragg's law, θ is measured from the crystal plane surface (not the normal to it).

4. **Treating X-rays as qualitatively different from light:** Students think X-rays are a
   different type of radiation. X-rays are EM waves — same nature as visible light, just much
   higher frequency. E = hf applies identically.

---

## Component 4 — Misconception Library

### MC-1: MC-XRAY-DIFFERENT-FROM-LIGHT
**Probe:** "Are X-rays fundamentally different from visible light, or are they the same type of
radiation? Explain."  
**Characteristic phrase:** "X-rays are not light — they're radiation."  
**Trigger:** Everyday language distinguishes "X-rays" from "light"; radiation has negative connotations.  
**Conflict evidence [P28]:** Both X-rays and visible light are electromagnetic waves. Both travel
at c. Both obey E = hf. Both are quantised as photons. The only difference is frequency/wavelength:
visible light λ ~ 400–700 nm; X-rays λ ~ 0.01–10 nm. X-rays are just very high-frequency light.  
**Bridge [P30]:** "The EM spectrum is continuous: radio, microwave, infrared, visible, UV, X-rays,
gamma rays. X-rays are the section with λ ~ 0.01–10 nm. They obey all the same equations as visible
light — just with much higher energy per photon."  
**Replacement [P31]:** X-rays are high-frequency EM radiation; same physics as visible light
(E = hf, travel at c, can diffract); differ only in wavelength/energy range.  
**Discrimination pairs [P33]:** X-rays vs. visible light: (A) completely different types of
radiation, (B) same EM wave type — differ only in frequency, (C) X-rays are particles, light
is a wave. Correct: (B).  
**S6 repair path:** TA-2 (EM spectrum overview; X-rays placed on the same continuum).

### MC-2: MC-BRAGG-ANGLE-FROM-NORMAL
**Probe:** "In Bragg diffraction, the angle θ = 30°. Is this measured from the crystal plane
surface or from the normal to the crystal plane?"  
**Characteristic phrase:** "θ is the angle of incidence from the normal — like Snell's law."  
**Trigger:** Students carry over the reflection/refraction convention where angles are measured
from the normal.  
**Conflict evidence [P28]:** In Bragg's law, θ is the glancing angle — measured from the crystal
plane surface, not its normal. If θ_Bragg = 30°, the angle from the normal is 60°. The formula
2d sin 30° = 2d × 0.5 = d; using 60° would give 2d × sin 60° = 2d × 0.866 = 1.73d — wrong.  
**Bridge [P30]:** "Bragg derived his formula using the glancing angle — the angle the beam makes
with the surface of the crystal plane. If the beam just grazes the surface (θ → 0), there is no
penetration; if it hits perpendicular (θ = 90°), it goes straight in. The glancing angle
convention is the opposite of the optics normal-incidence convention."  
**Replacement [P31]:** In 2d sin θ = nλ, θ is the glancing angle (from the crystal plane surface).  
**Discrimination pairs [P33]:** Bragg angle θ is measured: (A) from the normal to the crystal
plane, (B) from the crystal plane surface (glancing angle), (C) from the diffracted beam direction.
Correct: (B).  
**S6 repair path:** TA-4 (draw the Bragg geometry explicitly, labelling the glancing angle).

### MC-3: MC-ALL-PHOTON-ENERGIES-FROM-XRAY-TUBE
**Probe:** "In a bremsstrahlung spectrum, can the tube produce photons with energy greater than
eV (where V is the accelerating voltage)?"  
**Characteristic phrase:** "The tube produces a range of energies including very high ones."  
**Trigger:** Students do not apply energy conservation to the cut-off.  
**Conflict evidence [P28]:** An electron accelerated through voltage V gains kinetic energy eV.
In a single bremsstrahlung event converting all KE to one photon: hf_max = eV → λ_min = hc/(eV).
No photon can have more energy than the electron that produced it. Higher-energy photons are
physically impossible (violate energy conservation).  
**Bridge [P30]:** "The electron carries energy eV into the target. When it produces a photon,
conservation of energy means the photon can have at most eV. The cut-off wavelength is a
hard limit — not a peak but a boundary beyond which no photons exist."  
**Replacement [P31]:** Maximum photon energy = eV; minimum wavelength λ_min = hc/(eV). No photons
above this energy from a tube operating at voltage V.  
**Discrimination pairs [P33]:** A 50 kV X-ray tube: photon energy range is (A) any value up to
and beyond 50 keV, (B) 0 to 50 keV (with hard cut-off at 50 keV), (C) only at 50 keV.
Correct: (B).  
**S6 repair path:** TA-3 (draw the bremsstrahlung spectrum with cut-off; compare to characteristic
lines).

### MC-4: MC-CHARACTERISTIC-XRAYS-FROM-OUTER-SHELL
**Probe:** "How are characteristic X-rays produced? Does the outer shell electron being ejected
or an inner shell electron being ejected cause them?"  
**Characteristic phrase:** "The outer electrons are easier to remove — they must produce the X-rays."  
**Trigger:** Students think "easier to remove" = "more likely to produce X-rays."  
**Conflict evidence [P28]:** Characteristic X-rays require the incoming electron to eject an inner-
shell (K or L) electron. The resulting vacancy is filled by an outer-shell electron falling in, and
the energy difference (between outer and inner shells) is emitted as a characteristic X-ray photon.
Inner-shell binding energies are in the keV range → X-ray energies. Outer-shell removal produces
UV or visible light (valence electron excitation), not X-rays.  
**Bridge [P30]:** "The energy of the emitted photon = the energy difference between the shells.
Inner-shell to outer-shell energy gap = keV (X-ray range). Outer-to-outer gap = eV (UV/visible).
The large gap requires an inner-shell vacancy — which only a high-energy electron can create."  
**Replacement [P31]:** Characteristic X-rays are produced when an inner-shell electron is ejected
and an outer-shell electron falls to fill the vacancy, emitting a photon of energy = ΔE(outer−inner).  
**Discrimination pairs [P33]:** Characteristic X-rays are produced by: (A) outer-shell electron
removal, (B) inner-shell electron removal followed by outer→inner transition, (C) electron
deceleration. Correct: (B) [and (C) gives bremsstrahlung, not characteristic].  
**S6 repair path:** TA-5 (atomic energy-level diagram; label K, L, M shells; draw characteristic
emission arrow).

---

## Component 5 — Explanation Library

**Explanation E-1 (bremsstrahlung):**  
An electron accelerated through voltage V arrives at the anode with kinetic energy eV. When it
decelerates abruptly in the target (because the nucleus's Coulomb field deflects it), it emits a
photon. The photon energy can be any value from 0 to eV (depending on how much energy is lost
in a single deceleration event). The continuous spectrum results from many such events with
varying energy loss. The hard cut-off at λ_min = hc/(eV) is where the electron loses all its
energy in one photon.

**Explanation E-2 (characteristic lines):**  
A high-energy electron (energy > inner-shell binding energy) ejects a K-shell electron. The
atom is now in an excited state with a K-shell vacancy. An L-shell electron falls into the K-shell,
emitting a photon of energy E_L − E_K. This is a characteristic X-ray — its energy is fixed by
the atomic structure, independent of the tube voltage (as long as V > E_K/e). It appears as a
sharp line on the continuous bremsstrahlung spectrum.

**Explanation E-3 (Bragg diffraction — 2-minute derivation):**  
Parallel X-rays hit crystal planes separated by d at glancing angle θ. The ray hitting the second
plane travels an extra path = 2d sin θ. Constructive interference when 2d sin θ = nλ. This
allows: (a) known λ → measure d (crystal structure), or (b) known d → measure λ (X-ray
wavelength measurement or, in reverse, electron wavelength — Davisson-Germer).

---

## Component 6 — Analogy Library

**Primary analogy — Car braking on gravel:**  
A car driving fast over rough gravel decelerates erratically — sometimes losing a lot of speed
quickly, sometimes gradually. Each "bump" produces a sound (like a photon). The maximum sound
energy per bump = the car's kinetic energy. No bump can produce more sound than the car has energy.
This is bremsstrahlung: continuous random emission up to a maximum energy set by the electron's KE.  
**Breaking point:** Car braking involves bulk mechanical energy; X-ray bremsstrahlung involves
quantum electromagnetic emission. The car analogy correctly conveys the continuous spectrum and
the energy cut-off but not the photon discreteness.  
**Anti-analogy:** A laser — monochromatic, single frequency, coherent. X-rays from a tube are
the opposite: broadband, incoherent, continuous spectrum. Synchrotron sources can produce
quasi-monochromatic X-rays, but standard tubes cannot.

---

## Component 7 — Demonstration Library

**D-1 (Medical X-ray image — visual):**  
Show a chest X-ray or hand X-ray. Identify: soft tissue (dark, low absorption), bone (white,
high absorption), metal (bright white — any implants). Ask: "Why does X-ray imaging work?
What physical property allows bones to block X-rays?" (Higher atomic number → more photoelectric
absorption and Compton scatter.)

**D-2 (Bremsstrahlung spectrum — graph reading):**  
Show a graph of X-ray intensity vs. wavelength for two tube voltages (e.g., 50 kV and 80 kV).
Students identify: (a) the cut-off wavelength for each; (b) the position of characteristic lines
(independent of voltage); (c) why the cut-off shifts to shorter λ at higher voltage.

**D-3 (Bragg diffraction calculation):**  
Sodium chloride crystal: d = 0.282 nm. X-rays (λ = 0.154 nm, Cu Kα line). Find the first-order
Bragg angle: sin θ = λ/(2d) = 0.154/(2 × 0.282) = 0.273 → θ = 15.8°. This is how X-ray
crystallography locates diffraction peaks.

---

## Component 8 — Discovery Lesson

*Anchor (2 min):* Show a hand X-ray. "Soft tissue is invisible; bones are clear. The X-rays
must interact differently with different materials. What physical property causes this?"

*Production (5 min):* Draw the X-ray tube (D-2). Explain bremsstrahlung (continuous deceleration
events → photons of varying energy up to eV). State cut-off: λ_min = hc/(eV).

*Characteristic lines (5 min):* Draw atomic shells. Incoming electron ejects K-shell electron.
L-shell electron falls in → characteristic photon. These lines are element-fingerprints.

*Bragg diffraction (5 min):* Derive 2d sin θ = nλ from path-difference argument (D-3). Students
calculate θ for NaCl at λ = 0.154 nm.

*Transfer (3 min):* "The same Bragg law confirmed de Broglie wavelengths (Davisson-Germer) and
revealed DNA's structure (Franklin, 1952). X-ray crystallography is how we know the shape of
every protein in medicine."

---

## Component 9 — Teaching Actions (Session Plan)

**TA-1 — Concrete Anchor [P01, P06]**  
Trigger: session open.  
Action: Show medical X-ray (D-1). "Bones block X-rays; tissue doesn't. Why?" Establish that
different materials interact differently with high-energy photons.  
Success signal: Students identify differential absorption as the imaging mechanism.

**TA-2 — EM Spectrum Placement [P14]**  
Trigger: After anchor.  
Action: Draw the EM spectrum from radio to gamma rays. Place X-rays (λ = 0.01–10 nm, E = 0.1–100 keV).
Address MC-1: "X-rays obey E = hf exactly like visible light — same physics, different frequency."  
Success signal: Students place X-rays correctly on the EM spectrum and identify them as EM waves.

**TA-3 — Bremsstrahlung and Cut-off [P14, P28]**  
Trigger: After spectrum.  
Action: Draw the X-ray tube; derive λ_min = hc/(eV). Show the continuous spectrum graph (D-2).
Address MC-3.  
Success signal: Students compute λ_min for a given tube voltage; correctly identify the cut-off.

**TA-4 — Bragg Diffraction [P14, P30]**  
Trigger: After bremsstrahlung.  
Action: Derive 2d sin θ = nλ from path-difference geometry. Address MC-2 (glancing angle
definition). Calculate θ for NaCl (D-3).  
Success signal: Students correctly apply Bragg's law; use the glancing angle, not normal incidence.

**TA-5 — Characteristic X-rays [P14, P28]**  
Trigger: After Bragg.  
Action: Draw atomic K, L, M shells. Show characteristic emission process (inner-shell ejection
→ outer→inner transition). Address MC-4.  
Success signal: Students correctly describe characteristic X-ray production and why the lines are
element-specific.

**TA-6 — Closure & Self-Assessment [P68, P85, P91]**  
Trigger: Session end.  
Action: Three questions — (1) a 60 kV tube: find λ_min; (2) NaCl crystal (d = 0.282 nm) with
λ = 0.071 nm: find first-order Bragg angle; (3) explain in one sentence the origin of
characteristic vs. bremsstrahlung X-rays.  
Success signal: All three correct.

---

## Component 10 — Voice Teaching

**Opening move:** "X-rays and visible light are both EM waves. The only difference: X-rays have
λ ~ 0.1 nm — a thousand times shorter than visible light. That short wavelength means: (1) energy
per photon is huge (keV, enough to ionise atoms), and (2) the wavelength matches atomic spacings,
so crystals diffract X-rays like diffraction gratings diffract light."

**Key explanatory moves:**
- "Bremsstrahlung: every deceleration event produces one photon, energy ≤ eV. Cut-off at λ_min =
  hc/(eV): energy conservation prevents photons more energetic than the electron."
- "Characteristic lines: inner-shell ejection → outer electron falls in → fixed ΔE → characteristic
  photon. These lines do not shift with tube voltage — they are the atom's fingerprint."
- "Bragg: the glancing angle θ is from the surface, not the normal. 2d sin θ = nλ: constructive
  interference when the extra path (2d sin θ) is an integer wavelength."

---

## Component 11 — Assessment

**Mastery Gate (threshold 0.75):**  
Pass criteria:  
(a) Compute λ_min from tube voltage  
(b) Apply Bragg's law (with correct angle convention)  
(c) Explain bremsstrahlung vs. characteristic line production  
(d) State that X-rays are EM waves obeying E = hf  
Failure on (a) → TA-3. Failure on (b) → TA-4. Failure on (c) → TA-5.

**Formative Golden Probe (FA-1):**  
"An X-ray tube operates at 80 kV. Find the minimum wavelength of emitted X-rays."  
Expected: λ_min = hc/(eV) = 1240 eV·nm / (80,000 eV) = 0.0155 nm.  
Threshold: Correct answer with correct units.

**Formative Golden Probe (FA-2):**  
"X-rays of wavelength 0.154 nm are diffracted from a crystal with d = 0.282 nm. Find the angle
for first-order Bragg diffraction."  
Expected: sin θ = λ/(2d) = 0.154/(0.564) = 0.273; θ = 15.8°.  
Threshold: Correct angle; glancing angle convention used.

**Formative Golden Probe (FA-3):**  
"Explain in two sentences why characteristic X-ray wavelengths are independent of the tube
accelerating voltage (above threshold)."  
Expected: Characteristic X-rays come from specific inner-to-outer shell transitions with fixed
energy differences determined by atomic structure. The tube voltage only needs to exceed the
threshold to eject the inner-shell electron; above that, the photon energy is set by the shell
energy gap, not the tube voltage.  
Threshold: Both sentences physically correct.

**Formative Golden Probe (FA-4):**  
"Why can X-rays diffract from crystals but visible light cannot? What property determines this?"  
Expected: Diffraction requires the grating spacing to be comparable to the wavelength. Crystal
planes are spaced 0.1–0.5 nm apart. X-ray wavelengths (0.01–10 nm) match this scale. Visible
light (400–700 nm) is 1000× larger — no diffraction from atomic planes.  
Threshold: Ratio argument explicitly given; numbers compared.

**Delayed Retrieval (Session + 3 days):**  
"State Bragg's law. Compute λ_min for a 100 kV tube. Explain the origin of characteristic X-rays."  
Threshold: All three correct unaided.

---

## Component 12 — Recovery Notes

**S0 (no photons background):** The prerequisite phys.mod.photons is essential — E = hf and
λ_min = hc/(eV) both require the photon model. Without it, these are memorised formulas.

**S3 (confuses bremsstrahlung with characteristic):** Draw both on the same spectrum graph:
continuous bremsstrahlung background + sharp characteristic line peaks. Ask student to point
to each and explain its origin before any calculation.

**S6 (Bragg angle confusion):** Draw the Bragg geometry twice — once with the glancing angle
labelled, once with the normal-incidence angle labelled. Show that the two angles are
complementary (add to 90°). Have the student verify with sin θ_glancing = cos θ_normal.

**S9 (knows formulas, cannot explain why crystal spacing matters):** Compute λ_visible/d_crystal
ratio. Show it is ~1000. "Diffraction requires slit width ~ wavelength. For visible light, atomic
planes are 1000× too small. For X-rays, the ratio is ~1. That is why X-rays diffract from crystals
and visible light does not."

---

## Component 13 — Memory & Review

**Spaced retrieval plan:**
- Session + 1 day: "State Bragg's law and λ_min formula. Compute both for a 40 kV tube with
  d = 0.20 nm crystal at λ = 0.031 nm."
- Session + 4 days: "Explain bremsstrahlung and characteristic X-rays in two sentences each."
- Session + 8 days: "A crystal gives a first-order Bragg peak at θ = 20° with X-rays of λ =
  0.071 nm. Find d."

**Interleaving partners:** phys.mod.photons (E = hf foundation), phys.mod.de-broglie (Bragg
law also confirmed electron matter waves), phys.mod.compton-effect (X-rays in Compton scattering
experiment).

---

## Component 14 — Transfer Map

**Near transfer:** Bragg diffraction (also used in neutron diffraction, electron diffraction);
λ_min formula (direct energy conservation application of E = hf)

**Far transfer:** X-ray crystallography (protein structures, drug design); XPS surface analysis;
CT imaging; X-ray astronomy; synchrotron radiation facilities

---

## Component 15 — Curriculum Feedback

Correct KG positioning. phys.mod.photons prerequisite provides E = hf and the photon model.
No unlocks in the KG — terminal node. The Bragg law is also used in phys.mod.de-broglie but
there is no cross-link in the KG; a cross-link suggestion: phys.mod.de-broglie.

---

## Package Validation Checklist

```
V-1   concept_id: phys.mod.x-rays ✓
V-2   all 10 KG fields present ✓
V-3   description consistent with KG ✓
V-4   4-stage CPA+ model ✓
V-5   ≥3 failure modes: 4 listed ✓
V-6   4 misconceptions MC-1…MC-4 ✓
V-7   probe + characteristic phrase for all ✓
V-8   ≥2 engineered MCs: MC-XRAY-DIFFERENT-FROM-LIGHT, MC-ALL-PHOTON-ENERGIES-FROM-XRAY-TUBE ✓
V-9   all 6 MC fields ✓
V-10  6 TAs ✓
V-11  TA-1 Concrete ✓
V-12  TA-3 first MC diagnostic ✓
V-13  TA-6 closure ✓
V-14  ≥5 mastery probes: FA-1…FA-4 + delayed retrieval ✓
V-15  4 FAs with thresholds and loop-back ✓
V-16  S0/S3/S6/S9 protocols ✓
V-17  3-session spaced retrieval ✓
V-18  interleaving partners named ✓
V-19  cross_links [] ✓
V-20  status READY ✓
```

**Status: READY / PACKAGE_READY — V-1 through V-20 PASS**
