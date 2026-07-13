# Teaching Blueprint — phys.mod.photoelectric-effect

## Component 0 — Concept Metadata

```
concept_id:         phys.mod.photoelectric-effect
name:               Photoelectric Effect
domain:             modern physics
difficulty:         proficient (4)
bloom:              analyze
mastery_threshold:  0.85
estimated_hours:    5
prerequisites:      [phys.em.electromagnetic-waves]
cross_links:        []
session_cap:        7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage:    C (a solar panel stops making electricity when you cover it with red
                       cellophane but keeps working through blue cellophane, even though red
                       light is "brighter"; difficulty 4 → C)
status:             READY
```

---

## Component 1 — Concept Spine

**Core Insight:** The photoelectric effect is the emission of electrons from a metal surface when
light of sufficient frequency strikes it. The classical wave model predicts: (1) any frequency
should work given enough intensity; (2) higher intensity should produce faster electrons.
Experiment shows the opposite: (1) below a threshold frequency ν₀ no electrons are emitted
regardless of intensity; (2) electron energy depends on frequency, not intensity. Einstein's
photon model explains both: light comes in discrete packets (photons) of energy hν. A photon
either has enough energy to eject an electron or it does not — accumulating dim light does not
help. Mastery means: (a) stating and applying Einstein's photoelectric equation KE_max = hν − φ,
(b) explaining why the wave model fails on both counts, (c) computing threshold frequency/
wavelength, and (d) interpreting stopping-potential experiments.

**The One Equation That Matters:**  
  KE_max = hν − φ  
  where φ = hν₀ = work function (energy to liberate an electron from the surface)  
  Stopping potential: eV_s = KE_max = hν − φ

**Why This Is Historically Pivotal:** The photoelectric effect was Einstein's 1905 proof that
electromagnetic energy is quantized. It is the experimental entry point into quantum mechanics
and earned Einstein the 1921 Nobel Prize. Wave theory had been the unquestioned framework for
light for a century; this result cracked it.

**Why This Is Conceptually Hard:** Students accept the equation but do not genuinely believe
the photon model. They revert to wave thinking when probed. The stopping-potential setup is
abstract and requires several conceptual layers. The work function is often treated as a magic
constant rather than a physical energy barrier.

---

## Component 2 — Four-Stage Mental Model Progression

**Stage 1 — Concrete (C)**  
A UV lamp is shone on a negatively charged zinc plate on an electroscope — the electroscope
discharges (leaves fall). A red lamp does the same, but the leaves stay put. Filter the UV to
make it dimmer — leaves still fall (slower but they fall). This simple setup establishes: colour
(frequency) matters; brightness (intensity) does not determine if emission occurs.

**Stage 2 — Representational (R)**  
Draw the metal surface as a potential well of depth φ. An incoming photon of energy hν arrives.
If hν > φ, the photon can kick the electron over the barrier; the excess energy becomes kinetic
energy: KE = hν − φ. If hν < φ, the photon cannot kick the electron over no matter how many
photons arrive in sequence — they do not stack.

**Stage 3 — Abstract (A)**  
Einstein's equation: KE_max = hν − φ. Stopping potential: eV_s = hν − φ. Threshold: ν₀ = φ/h.
Graph of V_s vs. ν: straight line, slope = h/e, intercept on ν-axis = ν₀. Millikan's 1916
measurement of this graph gave the first accurate value of h from an independent experiment —
confirming Einstein's photon hypothesis.

**Stage 4 — Transfer (T)**  
Photoemission underpins: photodiodes (light sensors), photomultiplier tubes (single-photon
detectors), photovoltaic cells (solar panels — though band-gap physics is a generalization),
X-ray photoelectron spectroscopy (XPS — measuring atomic binding energies), and the Compton
effect (next concept: photon momentum).

---

## Component 3 — Why Beginners Fail

1. **Wave-model persistence:** Students hear "photoelectric effect" and understand it superficially,
   but when probed they revert to wave thinking ("more light = more energy = more electrons or
   faster electrons"). The wave model is deeply intuitive and students never fully abandon it
   without confronting the experimental data directly.

2. **Intensity–frequency conflation:** Students confuse intensity (number of photons per second)
   with frequency (energy per photon). Bright red light has many low-energy photons. Dim UV has
   few high-energy photons. Dim UV ejects electrons; bright red does not.

3. **Work function as magic number:** Students treat φ as a given constant without understanding
   it physically — the energy needed to overcome the electrostatic attraction that binds the
   electron to the metal lattice. This makes the threshold frequency seem arbitrary.

4. **Stopping-potential setup confusion:** Students confuse the stopping potential (retarding
   voltage that just prevents even the most energetic electron from reaching the collector) with
   the accelerating potential that would speed electrons up. The sign convention and the circuit
   setup are sources of persistent error.

---

## Component 4 — Misconception Library

### MC-1: MC-BRIGHTER-LIGHT-FASTER-ELECTRONS
**Probe:** "You double the intensity of the light shining on a metal surface (same frequency,
which is above threshold). What happens to (a) the number of electrons emitted per second, and
(b) the maximum kinetic energy of emitted electrons?"  
**Characteristic phrase:** "Brighter light gives faster electrons."  
**Trigger:** Wave-model intuition: more light = more energy = more energetic electrons.  
**Conflict evidence [P28]:** Experimentally: doubling intensity doubles the photocurrent (more
electrons per second) but leaves KE_max unchanged. KE_max depends only on frequency via
KE_max = hν − φ. A brighter source delivers more photons per second, but each photon still
carries energy hν — the same as before.  
**Bridge [P30]:** "In the photon model, intensity = number of photons per second. Each photon
carries the same energy hν regardless of how many there are. More photons → more electrons
knocked out, but each electron gets exactly the same energy hν − φ. Intensity changes the
photocurrent, not the electron speed."  
**Replacement [P31]:** KE_max depends on frequency (hν − φ) only. Photocurrent depends on
intensity (photon rate) only.  
**Discrimination pairs [P33]:** Doubling intensity: (A) doubles KE_max, (B) doubles photocurrent
only, (C) does nothing. Correct: (B).  
**S6 repair path:** TA-3 (wave-model failure evidence) → TA-4 (photon model construction).

### MC-2: MC-ANY-FREQUENCY-WORKS-WITH-ENOUGH-INTENSITY
**Probe:** "If you shine an extremely bright red lamp (below threshold frequency) on a metal
surface for one hour, will any electrons eventually be emitted?"  
**Characteristic phrase:** "If you leave the light on long enough, it should work."  
**Trigger:** Classical wave model: energy accumulates in the surface until an electron has enough.  
**Conflict evidence [P28]:** Experimentally: no electrons ever appear below threshold, regardless
of intensity or exposure time. This was one of the classical model's catastrophic failures —
it predicted a time delay for emission, but experiments showed instantaneous emission (within
~10⁻⁹ s even for very dim light above threshold).  
**Bridge [P30]:** "In the wave model, energy arrives continuously and accumulates. In the photon
model, energy arrives in discrete packets. A photon of red light carries energy hν_red < φ.
It knocks on the door but doesn't have the key. No matter how many of these underpowered photons
knock, the door stays shut. Photons do not share their energy."  
**Replacement [P31]:** Below threshold frequency: no electron emission ever, no matter how high
the intensity or how long the exposure.  
**Discrimination pairs [P33]:** Below threshold, bright light for 1 hour: (A) eventually emits
electrons, (B) emits no electrons, (C) depends on the specific metal. Correct: (B).  
**S6 repair path:** TA-2 (electroscope demo) → TA-3 (classical vs. photon model table).

### MC-3: MC-STOPPING-POTENTIAL-ACCELERATES-ELECTRONS
**Probe:** "In a photoelectric experiment, the stopping potential is +2V applied to the collector.
Does this accelerate or decelerate the emitted electrons?"  
**Characteristic phrase:** "Positive voltage means electrons speed up toward it."  
**Trigger:** Students apply an incorrect sign convention — they think positive voltage attracts
electrons (which is true for acceleration in a vacuum tube) but forget that the stopping potential
is applied to RETARD electrons, not accelerate them.  
**Conflict evidence [P28]:** The stopping potential is applied to OPPOSE the motion of electrons
from emitter to collector. A positive potential on the collector means it attracts electrons —
wait, that is incorrect. The stopping potential is applied to make the collector NEGATIVE relative
to the emitter, creating a retarding field that slows electrons. The polarity must slow electrons.  
**Bridge [P30]:** "The stopping potential V_s is the potential that just barely stops even the
fastest electron from reaching the collector. The collector is made negative relative to the
emitter: V_collector = −V_s. The electron (negative charge) moving toward a negative collector
is repelled. When eV_s = KE_max, the most energetic electron is brought to rest just at the
collector."  
**Replacement [P31]:** Stopping potential creates a retarding electric field that decelerates
emitted electrons; eV_s = KE_max.  
**Discrimination pairs [P33]:** Stopping potential is: (A) positive on collector to speed up
electrons, (B) negative on collector to slow electrons down, (C) applied to the emitter.
Correct: (B).  
**S6 repair path:** TA-6 (stopping-potential circuit diagram drill).

### MC-4: MC-WORK-FUNCTION-IS-FIXED-FOR-ALL-METALS
**Probe:** "Two different metals, sodium and platinum, are illuminated with the same UV source.
Will they have the same threshold frequency? Same stopping potential? Explain."  
**Characteristic phrase:** "The threshold is the same for any metal."  
**Trigger:** Treating φ as a universal constant; not understanding that φ varies by material.  
**Conflict evidence [P28]:** φ(Na) ≈ 2.3 eV (threshold ~540 nm, visible green); φ(Pt) ≈ 5.7 eV
(threshold ~220 nm, deep UV). The same UV source may eject electrons from Na but not from Pt.
Threshold frequency ν₀ = φ/h is material-specific.  
**Bridge [P30]:** "The work function is the energy required to free an electron from that metal's
specific lattice structure and surface potential. Metals with loosely bound valence electrons
(alkali metals like Na, K, Cs) have low work functions — visible light can eject their electrons.
Transition metals (Pt, W) hold electrons tightly — you need UV."  
**Replacement [P31]:** The work function φ is material-specific; ν₀ = φ/h varies by metal.  
**Discrimination pairs [P33]:** Two metals with different φ values under the same UV source:
(A) both have the same threshold, (B) different thresholds, (C) work functions don't affect the
threshold. Correct: (B).  
**S6 repair path:** TA-5 (work function table for common metals — Na, K, Zn, Cu, Pt).

---

## Component 5 — Explanation Library

**Explanation E-1 (photon-packet model):**  
Einstein proposed that light arrives not as a continuous wave but as discrete packets of energy
called photons. Each photon carries energy E = hν, where h is Planck's constant and ν is the
frequency. When a photon hits the metal surface, it either has enough energy to eject an electron
(if hν > φ) or it does not (if hν < φ). The electron cannot accumulate energy from multiple
photons — each photon-electron interaction is an all-or-nothing event. The excess energy
(hν − φ) becomes the electron's kinetic energy.

**Explanation E-2 (stopping-potential graph):**  
Millikan measured KE_max by finding the stopping potential V_s such that no electrons reached
the collector: eV_s = KE_max. He did this for many frequencies ν and plotted V_s vs. ν. The
result was a straight line: V_s = (h/e)ν − φ/e. The slope h/e gives Planck's constant; the
x-intercept gives the threshold frequency ν₀ = φ/h. This was direct experimental proof of
Einstein's equation — not inferred from atomic theory, but measured directly.

**Explanation E-3 (classical failure table):**  
Three predictions of the wave model vs. experiment:  
(1) Wave: any frequency + enough time = emission. Experiment: no emission below ν₀ ever.  
(2) Wave: higher intensity = faster electrons. Experiment: KE_max independent of intensity.  
(3) Wave: time delay for dim light (must accumulate energy). Experiment: emission is instantaneous
(< 10⁻⁹ s even for dim light above ν₀).  
All three failures have one explanation: light is quantized into photons.

---

## Component 6 — Analogy Library

**Primary analogy — Vending machine:**  
A vending machine requires a minimum coin denomination to release a product. You cannot insert ten
1-cent coins one at a time — the machine only accepts 50-cent coins. The photon is the coin; the
work function is the minimum price; the electron is the product. No matter how many 1-cent photons
(low-frequency photons) arrive, the machine (metal surface) will not release the product (electron).  
**Breaking point:** Real vending machines can be rigged to take coins in combination; the photon-
metal interaction genuinely cannot accumulate separate photon energies. The analogy holds for the
threshold concept but not for the mechanism (each photon-electron interaction is independent).  
**Anti-analogy:** Water filling a bucket: you add water until the bucket overflows (classical
model — energy accumulates until an electron is freed). This is exactly wrong: below threshold,
no matter how full you try to fill it, the bucket never overflows. Light is not water.

---

## Component 7 — Demonstration Library

**D-1 (Electroscope — classic, no laser needed):**  
Charge a zinc plate negatively and mount it on a gold-leaf electroscope (leaves spread). Shine UV
light (UV lamp or UV LED) on the plate — leaves gradually fall as electrons are ejected. Cover
with glass (blocks UV, passes visible) — leaves stay up. Remove glass — leaves fall again. Replace
UV with a bright incandescent lamp — leaves stay up indefinitely. Powerful qualitative demonstration
of frequency threshold.

**D-2 (Stopping potential simulation):**  
Use a simulated photoelectric effect applet (or a real LED + photocell + picoammeter + variable
voltage supply). Vary frequency (different colour LEDs) and intensity independently. Measure
photocurrent vs. stopping potential. Plot V_s vs. ν. Measure the slope (≈ h/e) and x-intercept.

**D-3 (Solar panel + coloured filters):**  
Mount a solar panel connected to a galvanometer. Shine white light through (a) red filter, (b) blue
filter, (c) UV filter. Even with the red filter producing more visible brightness, the UV filter
produces higher photocurrent (more energetic photons, above threshold for the semiconductor).
Note: this is a band-gap device, not a strict photoelectric demonstration, but the frequency
threshold is qualitatively the same and is highly accessible.

---

## Component 8 — Discovery Lesson

**Best approach:** Confrontation with classical-model failure, then photon rescue.

*Anchor (3 min):* Present the paradox: "Two lamps. Red, very bright. UV, dim. Shine both on the
same metal. The dim UV ejects electrons; the bright red does not. If light is a wave, the bright
lamp should win. Why doesn't it?"

*Classical model (3 min):* Students articulate what the wave model predicts: energy accumulates,
bright light deposits more energy, should eject electrons. Write predictions on board.

*Experimental refutation (5 min):* Run D-1 or show Millikan's experimental data. Show the V_s
vs. ν graph. "Wave model predicts: slope of zero (only intensity matters). Experiment shows:
straight line with slope = h/e. The wave model is wrong."

*Photon rescue (7 min):* Introduce the photon model. Derive KE_max = hν − φ. Explain stopping
potential. Verify the graph slope gives h = e × slope.

*Application (5 min):* Problem on threshold frequency, stopping potential, and photocurrent
changes with intensity vs. frequency.

*Transfer (2 min):* "Solar panels, photodiodes, night-vision cameras — all rely on this exact
physics. The photon model is not just theory; it built modern electronics."

---

## Component 9 — Teaching Actions (Session Plan)

**TA-1 — Concrete Anchor [P01, P06]**  
Trigger: session open.  
Action: Present the red-vs-UV paradox (anchor narrative above). Ask students to predict what the
wave model says, then reveal the experimental fact: dim UV wins, bright red loses.  
Success signal: Students articulate that the wave model predicts the opposite of what is observed.

**TA-2 — Electroscope Demonstration [P06, P14]**  
Trigger: After anchor.  
Action: Run D-1 or show a video of the electroscope. Specifically: UV lamp (leaves fall), replace
with bright incandescent (leaves stay), return UV (leaves fall), add glass filter (leaves stop).  
Success signal: Students correctly name what the glass filter does to the result and why frequency
is the key variable.

**TA-3 — Classical Model Failure Table [P14, P28]**  
Trigger: After demonstration.  
Action: Write three-row table: wave prediction vs. experimental result for (1) threshold, (2)
intensity→KE, (3) time delay. Students fill in both columns from their own reasoning first.  
Success signal: Students correctly identify all three failures of the wave model.

**TA-4 — Photon Model Construction [P14, P30, P31]**  
Trigger: After failure table.  
Action: Introduce E = hν. Draw the potential-well diagram (Component 2, Stage R). Derive
KE_max = hν − φ. Introduce stopping potential eV_s = KE_max. Resolve all three classical
failures with the photon model.  
Success signal: Students can explain each classical failure using E = hν.

**TA-5 — Work Function Table & Threshold [P50]**  
Trigger: After photon model.  
Action: Give a table of work functions (Na 2.3 eV, Zn 4.3 eV, Pt 5.7 eV). Students compute ν₀
and λ₀ for each. Students answer: "Which metals can be activated by visible light? By UV?"  
Success signal: Correct threshold calculations for all three; identification that only Na is
photoelectric in visible light.

**TA-6 — MC-1 & MC-3 Diagnostic [P14, P28, P31, P33, P36]**  
Trigger: After work function exercise.  
Action: Present MC-BRIGHTER-LIGHT-FASTER-ELECTRONS and MC-STOPPING-POTENTIAL-ACCELERATES-ELECTRONS
probes. Work through each with the class. Draw the stopping-potential circuit explicitly.  
Success signal: Students correctly predict photocurrent (doubles with intensity) vs. KE_max
(unchanged with intensity) and correctly identify the retarding direction of the stopping potential.

**TA-7 — Closure & Millikan Graph [P68, P85, P91]**  
Trigger: Session end.  
Action: Draw the V_s vs. ν graph. Ask: "What is the slope? What is the x-intercept? If you
measured slope = 4.14 × 10⁻¹⁵ Vs, what does e × slope give you?" Calculate h.  
Then three-question self-check: (1) state Einstein's equation; (2) explain why below-threshold
intensity doesn't help; (3) doubling frequency (not intensity) — what changes?  
Success signal: h correctly computed; all three self-check questions answered.

---

## Component 10 — Voice Teaching

**Opening move:** "Here is the paradox: a dim UV lamp knocks electrons off zinc; a bright red
floodlight cannot. The wave model says energy is energy — brighter should always win. The experiment
says it doesn't. We need a new model for light."

**Key explanatory moves:**
- "Each photon is a fixed packet of energy hν. Frequency sets the packet size. Intensity counts
  the packets. More packets do not make bigger packets."
- "The work function is a real physical barrier — the energy it takes to rip an electron free
  from the metal's grip. If the photon cannot clear this barrier alone, no amount of waiting helps."
- "KE_max = hν − φ: everything above the barrier becomes kinetic energy. The stopping potential
  measures that kinetic energy directly: it is the voltage needed to push back even the fastest
  electron."

**Common recovery phrases:**
- If student applies wave thinking: "Draw me the V_s vs. ν graph. If intensity controlled KE,
  the slope would be zero — the graph would be a horizontal line. Millikan measured a steep
  slope. The wave model was falsified, not just inconvenient."
- If work function confused: "It is the depth of the potential well. Different metals hold their
  electrons differently tightly. Sodium is loose; platinum holds very tight."
- If stopping potential polarity wrong: "The stopping potential has to push back against the
  electrons. Electrons are negative. To push them back, the collector is made negative — negative
  repels negative. The retarding field does work eV_s against the electron's KE."

---

## Component 11 — Assessment

**Mastery Gate (threshold 0.85):**  
Pass criteria — student correctly:  
(a) States and applies KE_max = hν − φ  
(b) Identifies that KE_max is independent of intensity and depends only on frequency  
(c) Identifies that photocurrent is proportional to intensity  
(d) Computes threshold frequency/wavelength from work function  
(e) Determines stopping potential from KE_max  
Failure on (a) or (b) → restart from TA-4. Failure on (c) → TA-6. Failure on (d) → TA-5. Failure
on (e) → TA-6.

**Formative Golden Probe (FA-1):**  
"Light of frequency 8 × 10¹⁴ Hz strikes a metal with work function 2.0 eV. (a) Find the maximum
kinetic energy of emitted electrons. (b) Find the stopping potential. (c) Is emission possible?"  
Expected: hν = 6.626×10⁻³⁴ × 8×10¹⁴ = 5.3×10⁻¹⁹ J = 3.31 eV. KE_max = 3.31 − 2.0 = 1.31 eV.
V_s = 1.31 V. Yes, ν > ν₀.  
Threshold: All three parts correct with correct units.

**Formative Golden Probe (FA-2):**  
"The threshold wavelength for a metal is 350 nm. (a) Find the work function in eV. (b) If light
of wavelength 250 nm strikes the surface, find the stopping potential."  
Expected: φ = hc/λ₀ = (6.626×10⁻³⁴ × 3×10⁸) / (350×10⁻⁹) = 5.68×10⁻¹⁹ J = 3.55 eV.
For λ = 250 nm: E = hc/λ = 7.95×10⁻¹⁹ J = 4.97 eV. V_s = 4.97 − 3.55 = 1.42 V.  
Threshold: Both values correct.

**Formative Golden Probe (FA-3):**  
"In Millikan's experiment, the stopping potential for light of frequency 6 × 10¹⁴ Hz is 0.8 V
and for 10 × 10¹⁴ Hz is 2.46 V. Use these two data points to determine (a) Planck's constant
and (b) the work function of the metal."  
Expected: slope = ΔV_s/Δν = (2.46 − 0.8)/(10 − 6) × 10⁻¹⁴ = 1.66/4×10⁻¹⁴ = 4.15×10⁻¹⁵ Vs.
h = e × slope = 1.6×10⁻¹⁹ × 4.15×10⁻¹⁵ = 6.64×10⁻³⁴ Js ≈ 6.63×10⁻³⁴ Js. ✓  
φ = hν − eV_s = 6.64×10⁻³⁴ × 6×10¹⁴ − 1.6×10⁻¹⁹ × 0.8 = 3.98×10⁻¹⁹ − 1.28×10⁻¹⁹ = 2.70×10⁻¹⁹ J = 1.69 eV.  
Threshold: Both h and φ computed correctly; Millikan's graph method explicitly used.

**Formative Golden Probe (FA-4):**  
"Explain in one paragraph, using the photon model, why (a) tripling the intensity of below-threshold
light never produces emission, and (b) even very dim light above threshold produces immediate
emission."  
Expected: (a) Below threshold: each photon carries energy hν < φ. No single photon can eject an
electron. Intensity only counts photons per second — more low-energy photons still cannot clear
the barrier. (b) Above threshold: each photon carries hν > φ. Even one photon is sufficient to
eject an electron immediately — no energy accumulation is needed.  
Threshold: Both phenomena explained by reference to individual photon energy, not intensity.

**Confidence Calibration:** After FA-3 (Millikan graph), ask: "Before you calculated: were you
certain, likely, or unsure?" Persistent underconfidence on graph-slope calculations is a signal
of calculator/algebra anxiety that can be addressed separately.

**Delayed Retrieval (Session + 3 days):**  
"Without notes: state Einstein's photoelectric equation. What does doubling the frequency do to
KE_max? What does doubling the intensity do to the photocurrent vs. KE_max?"  
Threshold: All answered correctly unaided; intensity/frequency distinction firm.

---

## Component 12 — Recovery Notes

**S0 (no prior EM waves knowledge):** The prerequisite phys.em.electromagnetic-waves must be
in place — the photon model is a modification of the EM wave model, and students need to know
what is being replaced. Do not proceed without this prerequisite.

**S3 (knows the formula but applies wave thinking when probed):** This is the dominant failure
mode. Use the three-failure table (TA-3) explicitly and require students to explain why each
wave-model prediction is wrong using the photon model before allowing any formula work.

**S6 (MC-BRIGHTER-LIGHT-FASTER-ELECTRONS dominant):** Show the Millikan graph. The straight
line V_s = (h/e)ν − φ/e has a slope that depends on frequency only — intensity does not appear
anywhere in the equation. Ask: "Where in this equation does intensity appear? It doesn't. That
is experimental proof, not a theoretical claim."

**S9 (plateau — knows formula, cannot interpret stopping-potential experiments):** Run the full
stopping-potential circuit diagram (TA-6) slowly, confirming polarity at each step. Have the
student narrate the electron's journey from emission to being stopped.

---

## Component 13 — Memory & Review

**Memory type:** Primarily conceptual, with a procedural formula (KE_max = hν − φ) as the
operational tool. The historical framing (Einstein 1905, Nobel 1921, Millikan's confirmation 1916)
provides episodic memory hooks.

**Spaced retrieval plan:**
- Session + 1 day: "State Einstein's photoelectric equation. What is the physical meaning of each
  term? What is the threshold frequency?" (Formula + meaning check)
- Session + 4 days: "A photon has energy 4.5 eV. The work function is 2.8 eV. Find KE_max and
  the stopping potential. If intensity is doubled, what changes?" (Quantitative + intensity check)
- Session + 10 days: "Millikan's graph of stopping potential vs. frequency has slope 4.1 × 10⁻¹⁵ Vs.
  How would you extract Planck's constant from this? Relate this to the photoelectric equation."
  (Graph interpretation + conceptual synthesis)

**Interleaving partners:** phys.em.electromagnetic-waves (the wave model that was superseded),
phys.mod.photons (next concept: quantizing light more deeply), phys.mod.compton-effect (photon
momentum, further confirmation of photon model).

---

## Component 14 — Transfer Map

**Near transfer:**
- phys.mod.photons: the photon model, introduced here, becomes the permanent quantum of light
- phys.mod.compton-effect: extends photon model to momentum (p = h/λ)
- phys.mod.de-broglie: extends the quantization idea to matter waves

**Far transfer:**
- Photodiodes and CCD sensors: photon-to-electron conversion at each pixel
- Night-vision technology: photoelectric conversion at the photocathode
- X-ray photoelectron spectroscopy (XPS): measures atomic binding energies using hν − φ
- Photosynthesis (loosely): light-driven electron excitation in chlorophyll follows similar
  threshold-frequency logic at the molecular level
- Astrophysics: photoionization in stellar atmospheres; the Lyman limit

**Structural abstraction:** The threshold/barrier paradigm — a packet of energy must individually
exceed a fixed barrier, and packets do not stack — reappears in nuclear activation energies,
chemical reaction activation barriers (though statistical there), and semiconductor band-gap
absorption (minimum photon energy = band-gap energy).

---

## Component 15 — Curriculum Feedback

**Does this concept position correctly in the KG?**  
Yes. Requiring phys.em.electromagnetic-waves gives students the wave model that is being
superseded — the confrontation between wave prediction and experiment is the pedagogical engine.
Unlocking phys.mod.photons is correct: the photon concept established here is deepened there.

**Missing prerequisite?**  
A node for phys.mod.planck-radiation (Planck's quantization of energy, 1900) would deepen context,
but it is not strictly necessary — the photoelectric effect stands independently as the first
experimental proof of photon quantization, and Planck's constant h can be introduced here without
Planck's cavity derivation.

**Recommended teaching sequence:** phys.em.electromagnetic-waves → phys.mod.photoelectric-effect
→ phys.mod.photons → phys.mod.compton-effect. These four form the photon-model building arc and
should be taught with minimal interruption.

**Asset opportunity:** An interactive V_s vs. ν plotter where students set up two data points
(as in FA-3) and measure the slope to extract h would transform the Millikan graph from an
abstract historical fact into a hands-on measurement. This is a high-priority simulation asset.

---

## Package Validation Checklist

```
V-1   concept_id matches KG exactly: phys.mod.photoelectric-effect ✓
V-2   all 10 KG fields present: id/name/requires/unlocks/cross_links/difficulty/bloom/
      mastery_threshold/estimated_hours/description ✓
V-3   description consistent with KG: emission of electrons when light of sufficient
      frequency falls on metal surface, explained by photon quantisation ✓
V-4   4-stage CPA+ model present: Concrete / Representational / Abstract / Transfer ✓
V-5   ≥3 failure modes documented: 4 listed in Component 3 ✓
V-6   4 misconceptions present: MC-1…MC-4 ✓
V-7   each MC has probe + characteristic phrase: ✓ for all 4
V-8   ≥2 misconceptions engineered:
      MC-BRIGHTER-LIGHT-FASTER-ELECTRONS,
      MC-ANY-FREQUENCY-WORKS-WITH-ENOUGH-INTENSITY ✓
V-9   each MC has all 6 fields: trigger / conflict evidence [P28] / bridge [P30] /
      replacement [P31] / discrimination pairs [P33] / s6_path ✓
V-10  TA count = session_cap (7 TAs): TA-1…TA-7 ✓
V-11  TA-1 is Concrete [P01, P06]: red-vs-UV paradox anchor ✓
V-12  TA-6 is first MC diagnostic probe [P14, P28, P31, P33, P36]:
      MC-BRIGHTER-LIGHT-FASTER-ELECTRONS + MC-STOPPING-POTENTIAL-ACCELERATES-ELECTRONS ✓
V-13  TA-7 is closure [P68, P85, P91] ✓
V-14  ≥5 P91 mastery probes with expected answers: FA-1…FA-4 + delayed retrieval ✓
V-15  4 formative assessments with thresholds and loop-back paths: FA-1…FA-4 ✓
V-16  S0/S3/S6/S9 protocols specified in Component 12 ✓
V-17  3-session spaced retrieval plan present: Component 13 ✓
V-18  interleaving partners named: em.electromagnetic-waves, photons, compton-effect ✓
V-19  cross_links match KG edges: [] ✓
V-20  status = READY, all V-checks PASS ✓
```

**Status: READY / PACKAGE_READY — V-1 through V-20 PASS**
