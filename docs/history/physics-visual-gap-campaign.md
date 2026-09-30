# Physics visual gap campaign (2026-09-30, owner instruction: "Keep running physics concepts. Check visuals and missing visuals. Fix everything in visuals and in concepts if any defects")

## The audit (local, no production traffic, no DB egress)

`resolveVisual` over all 238 physics KG concepts, on an ordinary turn and on "show me a diagram".

| Class | Count (before) | Meaning |
|---|---|---|
| CONCEPT | 43 | An own figure, served as a figure OF the concept |
| GENERAL | 32 | Only a "general illustration" (scope.ts INSUFFICIENT_FOR_CONCEPT) of something related |
| NONE | 163 | No deterministic figure; relies on Tier-3 live generation, often declined or critic-rejected |

GENERAL includes displacement/velocity/acceleration (number line), newtons-third-law, tension,
inclined-plane, work, momentum/impulse (a collision), angular momentum, universal-gravitation and
gravitational-field (an orbit), hookes-law, ideal-gas/thermodynamic-processes/carnot (an empty
coordinate plane), shm and shm-energy (a pendulum), ohms-law/electric-current/dc-circuits (a series
circuit).

NONE includes, among core school topics: units/dimensions/errors, kinetic and potential energy,
work-energy, conservation of energy, power, centre of mass, moment of inertia, pressure,
buoyancy, Bernoulli, temperature, thermal expansion, heat transfer, specific heat, phase changes,
kinetic theory, spring-mass, damped/forced oscillation, wave properties, longitudinal waves,
superposition, standing waves, sound, Doppler, beats, reflection, dispersion, diffraction,
polarization, charge, Coulomb's law, electric field, Gauss, potential, capacitance, magnetic field,
Lorentz force, Biot-Savart, Ampère, solenoid, Faraday, Lenz, AC, EM waves, photoelectric effect,
radioactivity, nuclear reactions, semiconductors and p-n junction. Advanced topics (Hamiltonian
mechanics, QM formalism, statistical mechanics, particle physics, relativity) are also NONE.

## Batch 1 — ten authored figures (physicsCoreScenes.ts)

Each figure is grounded in its KG description and draws what that description defines. Numbers are
computed, not eyeballed. Each was rendered in Chromium at 1280 px and checked by eye.

| Concept | Figure |
|---|---|
| phys.opt.reflection | Flat mirror, normal, incident and reflected rays at 35°, θi = θr. **Left the retired register** (its old concave-mirror image diagram had none of these), following the 18 bio.cell rows removed on 2026-09-24; registry row no longer names ray_optics. |
| phys.em.coulombs-law | Two like charges at r with equal and opposite forces; the same pair at 2r with arrows ¼ as long (1/r²). |
| phys.em.electric-field | Field arrows out of +q, into −q; a test charge with E = F/q₀. |
| phys.em.magnetic-field | Bar magnet, loops leaving N and entering S, direction marks, "lines crowd: strong field". |
| phys.wave.standing-waves | 3rd harmonic, both extreme shapes, 4 nodes incl. both ends, antinodes midway, λ = 2L/3. |
| phys.wave.doppler-effect | Wavefronts centred on the source's past positions (vs = 0.5 vw): bunched ahead, spread behind. |
| phys.mech.conservation-of-energy | Falling ball at three heights with PE/KE bars that always sum to the same total. |
| phys.therm.heat-transfer | Conduction rod, convection loop in a pan, radiation waves. |
| phys.mech.buoyancy | Floating block, displaced water marked, buoyant force = weight (equilibrium). |
| phys.mech.hookes-law | Spring at natural length and stretched by x; restoring force opposite to x, F = −kx. Removed from INSUFFICIENT_FOR_CONCEPT. |

Tests: `physicsCoreScenesBatch1.test.ts`. It checks each figure's physics, not just its presence:
- equal angles for reflection;
- F/4 at 2r for Coulomb's law;
- field direction for the electric field;
- N→S for the magnetic field;
- the node positions for standing waves;
- the wavefront centres for Doppler;
- the constant PE + KE total;
- equal forces for buoyancy;
- the restoring-force direction for Hooke's law.

It also checks that everything stays inside ±5 and that each concept is served at concept scope.
Retired register 25 → 24; INSUFFICIENT_FOR_CONCEPT 46 → 45. The tests that used reflection as
their "retired" example now use phys.em.potentiometer, which is still retired.

## Concept defect fixed in the same batch: authoring notes shown to learners

Production (2026-09-30, refraction) served "RETRIEVAL PRACTICE (P-3b style, lateral shift): For the
glass slab above (…)" through the Quick check prose path. Two causes:
1. `stripAuthoringLabel` knew DIAGNOSTIC/FORMATIVE/… but not RETRIEVAL PRACTICE, TRANSFER or MASTERY
   GATE — 384 authored stems. The Quick check prose path (`formatProbeAsFollowUp`) did not call it
   at all.
2. 125 stems end with a grader's note, "Pass criterion (5-probe bank, 4/5 at threshold 0.80): …".
Fixed at presentation: all labels plus the trailing note are stripped, on both paths.
`dependsOnEarlierItem` keeps the two follow-ups written for an earlier item ("For the glass slab
above", "For the two-loop circuit above") from being served on their own. `authoringLabelCoverage.test.ts`
runs every stem in the corpus through the strip.

## Next batches (queue, most-taught first)

- Mechanics: kinetic/potential energy, work-energy, power, pressure, Bernoulli, centre of mass,
  moment of inertia, newtons-third-law, inclined-plane, tension, work (F-d area),
  momentum/impulse (force-time).
- Thermal: thermal expansion, phase changes (heating curve), kinetic theory, ideal-gas
  (P-V isotherm), Carnot (P-V cycle).
- Waves: wave properties (labelled wave), longitudinal waves, superposition, sound, beats,
  spring-mass, damped oscillations.
- Optics and E&M: dispersion (prism), diffraction/single slit, polarization, capacitance,
  Lorentz force, solenoid, Faraday/Lenz, AC sine.
- Modern: photoelectric effect, radioactive decay curve, p-n junction.

## Batch 2 — twelve more figures (physicsCoreScenes.ts)

| Concept | Figure |
|---|---|
| phys.mech.kinetic-energy | The same cart at v and 2v; KE bar 4× (½mv²). |
| phys.mech.potential-energy | Ball at h and 2h above a zero level; PE bar 2× (mgh). |
| phys.mech.work | F at 30° on a box moved d; component F cos θ drawn; W = F d cos θ. Left the general list. |
| phys.mech.newtons-third-law | Two skaters: "force on A by B" and "force on B by A", equal and opposite. Left the general list. |
| phys.mech.inclined-plane | 30° slope; mg resolved into mg sin θ along and mg cos θ into the slope; N balances mg cos θ. Left the general list. |
| phys.mech.pressure-fluids | Tank; four equal arrows at each of two depths, longer deeper; P = P₀ + ρgh. |
| phys.mech.impulse | F–t pulse with the area under it marked impulse J = Δp. Left the general list; collision generator removed from its row. |
| phys.therm.thermal-expansion | Rod at T and at T + ΔT with ΔL marked; ΔL = αL₀ΔT. |
| phys.therm.phase-transitions | Heating curve with flat melting and (longer) boiling plateaus; labelled not to scale. |
| phys.therm.ideal-gas-law | Two P–V isotherms, T₂ = 2T₁; PV constant along each (asserted). Left the general list. |
| phys.wave.wave-properties | Crest, trough, amplitude and wavelength labelled; v = fλ. |
| phys.wave.longitudinal-waves | Particles at x + A sin kx (A·k < 1): compressions at λ/2, rarefactions at λ; particle motion parallel to travel. |

Found and fixed while authoring:
- The first longitudinal figure put 93 objects in one step, above `validateSceneSpec`'s 50-per-step
  bound. It is now two rows (46).
- Both batch test files now run every figure through `validateSceneSpec`.

Tests: `physicsCoreScenesBatch2.test.ts` checks the physics of each figure. INSUFFICIENT_FOR_CONCEPT
45 → 40. The live-generation test fixture (a concept with no asset) moved from kinetic-energy to
phys.mech.power, with its fake generated scene rewritten in power's vocabulary — the same move made
earlier from calorimetry to kinetic-energy.

Coverage after batches 1–2 (local audit): 43 + 22 = 65 physics concepts with their own figure;
GENERAL 32 → 26; NONE 163 → 147.

## Live testing paused: Vercel platform protection

After a day of scripted QA sessions, production began answering the scripted client with a Vercel
403 (`{"error":{"code":"403","message":"Forbidden","id":"cle1::…"}}`) on /api/learn/chat, and with
HTML at login. The project has no custom firewall config (`get_firewall_config` → not found), so
this is Vercel's built-in protection. It was not worked around; live QA is paused.

One consequence: two disposable accounts were registered (201, 07:02:49 and 07:03:11 UTC,
`qa-r3-…@mytutor-qa.invalid`), but the scripted login then failed, so their generated passwords
were lost. **They still exist and need manual deletion by the owner.**
`scripts/qa/liveAccount.ts` now retries the login with backoff, and on final failure names the
account, so this cannot silently recur.

## Batch 3 (2026-09-30): eleven more concepts

| Concept | Figure |
|---|---|
| phys.mech.bernoulli | Pipe narrowing A₁ → A₂; v₂/v₁ = A₁/A₂ (continuity, asserted); gauge column shorter over the narrow part; P + ½ρv² + ρgh = constant. |
| phys.mech.center-of-mass | 3 kg and 1 kg on a light rod; centre of mass at the computed mass-weighted average (¼ of the way from the heavy mass); pivot there. |
| phys.mech.moment-of-inertia | Same dumbbell masses at r and 3r about one axis; I_far = 9 × I_close (I = Σmr²). |
| phys.wave.spring-mass | Mass on a spring with ±A marked; position–time trace x = −A cos ωt (released from −A); T = 2π√(m/k). |
| phys.wave.damped-oscillations | Oscillation inside the ±A e^(−bt) envelope (asserted point by point). |
| phys.wave.superposition | Two waves and their point-by-point sum, y = y₁ + y₂ (asserted). |
| phys.wave.beats | Sum of two close frequencies with its envelope; one beat marked loud → soft → loud; f_beat = \|f₁ − f₂\|. |
| phys.opt.dispersion | White light into a prism; red bent least, green more, blue most (asserted), toward the base. |
| phys.opt.single-slit | (sin β/β)² brightness: wide central maximum, side maxima < 5 % of it, dark minima. |
| phys.em.capacitance | Parallel plates on a battery (long line = + terminal on the +Q plate); field + → −; C = Q/V. |
| phys.em.solenoid | Coil of turns; straight, evenly spaced field lines inside running toward N; B = μ₀nI. |

Found and fixed while rendering each figure at 1280 px (local dev server):
- Spring–mass: the first trace started at equilibrium moving up, contradicting "pulled down and let
  go". Now x = −A cos ωt, starting at the bottom (asserted).
- Dispersion: the colour names were crowded at the ray tips and repeated by the step-3 labels. The
  names now sit just past each tip, and "bent least/most" sit on the rays themselves.
- Moment of inertia: no label read as a formula to the explainer (Σ and ² are not ASCII digits), so
  the headline chip fell back to the whole step-3 narration and was cut off. The result label now
  reads `I_far = 9 × I_close`.

Tests: `physicsCoreScenesBatch3.test.ts`. `visualFailClosed.test.ts`'s no-asset stand-ins moved
from moment-of-inertia / center-of-mass (now authored) to phys.qm.wkb-approximation /
phys.stat.ising-model, chosen far from the campaign frontier so the next batch does not move them.
phys.mech.power stays unauthored on purpose (it is the live-generation test fixture).

Coverage after batches 1–3 (local resolver audit, all 238 physics concepts through
`resolveVisualForTurn` with a diagram request): 102 answer with a figure (65 + 11 = 76 with their own
concept figure, the rest a general illustration), 136 still answer "no figure". Next queue (unauthored, high-traffic school concepts): photoelectric effect, radioactive
decay, p-n junction, polarization, diffraction/wave optics, magnetic force (Lorentz), Faraday/Lenz,
AC basics, electric potential, Gauss's law, sound waves, wave speed, Kepler's laws, escape velocity.

Live QA was still blocked by the Vercel 403 during this batch. The firewall API answers "Seawall
Config not found" (no project firewall config to edit), so the owner needs to act in the Vercel
dashboard (Firewall / Attack Challenge / bot protection for the scripted client). A request-level
bypass for QA traffic was deliberately not added.

## Batch 4 (2026-09-30): electromagnetism, AC, modern physics, wave optics

New module `src/lib/teaching/sceneGenerators/physicsCoreScenesB4.ts` (batch 1–3 helpers are now
exported from physicsCoreScenes.ts and reused, not copied).

| Concept | Figure |
|---|---|
| phys.em.electric-potential | Equipotential circles around +Q labelled with V = kQ/r (12, 6, 4, 3 V); radial field lines crossing them at right angles. |
| phys.em.magnetic-force | B into the page (drawn ×); +q moving right; F computed as v × B (up); circular path r = mv/(qB) bending toward F. |
| phys.em.magnetic-flux | Same loop square-on (all 5 lines pass, Φ = BA) and tilted 60° (3 pass, Φ = BA cos 60° = 0.5 BA). |
| phys.em.faradays-law | Φ(t) rise/hold/fall and ε = −dΦ/dt computed by finite difference: negative, zero, positive. |
| phys.em.lenzs-law | N pole approaching a coil; induced field inside the coil opposite to the increasing magnet field; near face becomes N. |
| phys.em.ac-basics | Sinusoid with peak V₀ = 3 V, period T, and V_rms = V₀/√2 = 2.12 V line. Left the retirement register. |
| phys.em.rc-circuits | Charging curve V₀(1 − e^(−t/τ)); 0.63 V₀ at t = τ = RC; 5τ marked. Left the retirement register. |
| phys.em.electromagnetic-waves | E (vertical) and B (oblique depth projection) in phase, both ⟂ travel; c = 3 × 10⁸ m/s; λ marked. |
| phys.mod.photoelectric-effect | Light ejecting e⁻ from a metal; KE_max vs f: zero below f₀, slope h above, extension meets −φ. |
| phys.mod.radioactive-decay | N = N₀e^(−λt) with N₀/2, N₀/4, N₀/8 at T½, 2T½, 3T½ (asserted); T½ = ln 2/λ. |
| phys.opt.polarization | Unpolarized → vertical polarizer (I₀/2) → crossed polarizer: I = I₁cos²90° = 0. |
| phys.opt.diffraction | Plane wavefronts spaced λ through a gap ≈ λ, leaving as circular wavefronts with the same spacing. |

Found while rendering:
- **The explainer's label budget.** At the default (intermediate) level a figure shows at most 9
  labels at once (`visualComplexity.ts` `maxLabels`) and holds back the lowest-priority ones (ink,
  then reference). Nothing told authors. Measured casualties: the magnetic-force field marks (20
  "×" text labels — now drawn as crossed lines), the decay curve's N₀, and batch 1's Coulomb's law
  (one "+q₂" of four; the repeated pair is now unlabelled). New guard:
  `physicsFigureLabelBudget.test.ts` holds every campaign figure within the budget.
- RC and polarization headline chips fell back to a whole narration sentence; each now has a
  formula-shaped result label (`V = 0.63 V₀`, `no light: I = 0`).
- The Faraday "ε = 0" note sat on the curve and hijacked the headline chip; it is now a plain aid
  note above the zero segment.

Retirement register: phys.em.rc-circuits and phys.em.ac-basics removed from RETIRED_VISUAL_BINDINGS
and RETIRED_ASSET_FINGERPRINTS (reflection precedent), 24 → 22. Pinned tests updated; where
rc-circuits was the "unrelated retired concept" example, a still-retired sibling replaced it (not
lc-circuits in the two files that inject lc-circuits as their replaced concept).

## Batch 5 (2026-09-30): thermal physics and sound

New module `physicsCoreScenesB5.ts`.

| Concept | Figure |
|---|---|
| phys.therm.temperature | Same gas at 200 K and 800 K; velocity arrows 2× longer (speed ∝ √T, asserted); T ∝ average KE. |
| phys.therm.zeroth-law | A and B each in contact with thermometer C, both reading 30 °C; so A–B in equilibrium, no heat flows. |
| phys.therm.specific-heat | ΔT vs Q for equal masses of aluminium and water; slope ratio = c_water/c_Al = 4.67 (asserted); Q = mcΔT. |
| phys.therm.kinetic-theory | Gas molecules; one bounce reverses the momentum into the wall (Δp = 2mv); force on wall; P = ⅓ρ⟨v²⟩. |
| phys.therm.internal-energy | Molecules with bonds (PE) and velocity arrows (KE); U = ΣKE + ΣPE. |
| phys.therm.second-law | Heat arrow hot → cold; cold → hot crossed out ("never by itself"). |
| phys.therm.entropy | Gas behind a partition vs spread through the whole box; ΔS > 0. |
| phys.therm.heat-engines | Q_H = 100 J in, W = 40 J out, Q_C = 60 J rejected (computed); η = W/Q_H = 0.4. |
| phys.therm.refrigerators | Q_C = 60 J pulled up from cold, W = 20 J in, Q_H = 80 J out; COP = 3; all heat arrows point cold → hot (asserted). |
| phys.wave.forced-oscillations | A(ω) = 1/√((ω₀² − ω²)² + (γω)²) for light and heavy damping; peak at f₀ (asserted). |
| phys.wave.sound-waves | Air layers displaced by A sin kx; pressure ∝ −dξ/dx; compressions where the layers bunch (asserted). |
| phys.wave.sound-intensity | Spheres at r and 2r; same cone covers 4× the area; I = P/4πr²; at 2r: I/4, −6 dB (computed). |
| phys.wave.wave-speed | Same frequency on a light string and a 4× heavier one: v halves, λ halves (asserted); v = √(T/μ). |

Found while rendering: the first particle scatter (an LCG) clumped all six particles into one
corner of the temperature box; replaced with the R2 low-discrepancy sequence. Zeroth law showed only
one "30 °C" reading (B's contact now has its own). Specific heat, heat engine and refrigerator
headline chips picked the wrong line (a narration sentence, "W = 40 J", "W = 20 J"); result labels
were recoloured / added so the chip states the concept's own result.

## Batch 6 (2026-09-30): photons, matter waves, nuclear physics, relativity

New module `physicsCoreScenesB6.ts`.

| Concept | Figure |
|---|---|
| phys.mod.photons | Red/green/violet photon packets (λ ∝ 1/f) with energy bars E = hf: 1.78, 2.32, 3.1 eV (h in eV·s, asserted). |
| phys.mod.de-broglie | Electron packets at p and 2p; λ and λ/2 marked (asserted); λ = h/p. |
| phys.mod.x-rays | Tube: hot cathode, electrons across 50 kV, metal target emitting X-rays; E_max = eV = 50 keV. |
| phys.mod.radioactivity | α stopped by paper, β by aluminium, γ through lead (arrow endpoints asserted against the barriers). |
| phys.mod.nuclear-reactions | ¹⁴N + ⁴He → ¹⁷O + ¹H; A: 18 = 18, Z: 9 = 9 (summed). |
| phys.mod.binding-energy | Measured B/A for 11 nuclei on a log-A axis; peak Fe-56 8.79 MeV; He-4 spike; fusion H-2 → He-4, fission U-238 → Sn-120. |
| phys.mod.nuclear-fission | n + U-235 → Ba + Kr + 3 n, ≈ 200 MeV; three further U nuclei: chain reaction. |
| phys.mod.nuclear-fusion | D + T → ⁴He + n; Q from the mass defect = 17.59 MeV (computed from atomic masses). |
| phys.mod.compton-effect | Photon scattered at 60° with λ′ > λ; electron recoil direction from p_in − p_out; Δλ = 2.426 pm × (1 − cos 60°) = 1.21 pm. |
| phys.rel.postulates | Train at v; passenger and platform both measure c for the light pulse; "not c + v". |
| phys.rel.time-dilation | Light clock at rest vs at 0.6c; diagonal leg = γ × rest leg, γ = 1.25 (asserted). |
| phys.rel.length-contraction | Rod at rest vs at 0.8c: L = L₀/γ = 0.6 L₀ (asserted). |
| phys.rel.mass-energy | e⁻ + e⁺ → two back-to-back γ; m_e c² = 0.511 MeV (computed from m_e, c). |

Found while rendering: the first binding-energy figure used the semi-empirical mass formula, which
peaks at A ≈ 63 — it labelled the wrong nucleus as the peak. Replaced with tabulated measured values
(peak Fe-56 asserted). On a linear A axis every light nucleus was squashed against the vertical
axis, hiding the He-4 spike fusion climbs to; the axis is now logarithmic (labelled so).

## Batch 7 (2026-09-30): measurement, mechanics, gravitation

New module `physicsCoreScenesB7.ts`.

| Concept | Figure |
|---|---|
| phys.meas.units | The seven SI base quantities and units round "SI"; 1 N = 1 kg·m/s². |
| phys.meas.dimensions | v = u + at term by term ([L T⁻¹] each: consistent) vs v = u + at² ([L] ≠ [L T⁻¹]: inconsistent). |
| phys.meas.errors | Five readings vs true 10.0 cm; mean 9.92, absolute error 0.08 cm, relative 0.8 % (computed). |
| phys.meas.significant-figures | Rod on a mm ruler read as 4.37 cm: 4.3 certain, 7 estimated → 3 s.f. (computed). |
| phys.meas.unit-conversion | 72 km/h × 1000 m/km ÷ 3600 s/h = 20 m/s. |
| phys.mech.work-energy-theorem | 2 kg cart, 6 N over 3 m: W = Fd = 18 J = ΔKE (1 J → 19 J bars, asserted). |
| phys.mech.angular-kinematics | Disc swept through θ = 60°; points at r and 2r with tangential v and 2v (asserted ⟂ radius); ω = Δθ/Δt, v = ωr. |
| phys.mech.rolling-motion | Point velocities v(1 + y/R): top 2v, centre v, contact 0 (asserted); v = ωR. Left the retirement register. |
| phys.mech.gravitational-potential | U = −GMm/r: negative, deepest at the surface, rising to zero at infinity (monotone, asserted). |
| phys.mech.keplers-laws | e = 0.5 ellipse, Sun at a focus; two equal-time sectors from Kepler's equation — equal areas (asserted numerically); T² ∝ a³. Left the register; its circular-orbit generator removed from the registry row. |
| phys.mech.escape-velocity | Newton's cannon: exact conics for k = 0.7 (falls back), 1 (circle), √2 (parabola, escapes); Earth v_esc = 11.19 km/s from G, M, R. |
| phys.mech.stress-strain | Typical ductile-metal curve (shape only): linear to the elastic limit (slope E), plastic, breaks. |
| phys.therm.third-law | S(T) ∝ T³ near 0 K, still rising (ln form) above; 0 K: S = 0, Ω = 1. |

Found while rendering:
- Boxes around text (dimensions, unit conversion) came out empty with the text beside them: the label
  placer moves a label off its box's edges. Boxes removed; the coloured labels carry the grouping.
- Work–energy's headline chip read "KE = 19 J"; the result label is now `W = Fd = 18 J = ΔKE`.
- Third law: the first curve saturated to a plateau (unphysical: entropy keeps rising with T); now
  ln(1 + T³), ∝ T³ near zero.
- Escape velocity: launching from the surface made the "falls back" path end at its first point;
  now Newton's cannon (launch above a smaller Earth), and the figure was scaled up.

Retirement register 22 → 20 (rolling-motion, keplers-laws). Fixtures moved: visualFailClosed's
no-asset stand-ins (meas.errors, escape-velocity → qm.s-matrix-basics, stat.monte-carlo-basics);
tests that used a now-authored physics concept as "a concept with no figure" (conceptExcursion,
visualGrounding, visualSessionRestore — their fake `phys.meas.dimensional-analysis` id resolved to
phys.meas.dimensions through the learner's message) now use eng.phonics.rhyming, because physics is
heading to full coverage and English has no visuals. visualRetiredBindings' scene-generator case
(Kepler) has no remaining retired example; retirement beating a generator stays covered by
visualRetirementLifecycle's injected replacement.

## Batch 8 (2026-09-30): electrostatics, magnetostatics, Maxwell, optics

New module `physicsCoreScenesB8.ts`.

| Concept | Figure |
|---|---|
| phys.em.electric-charge | Rod and cloth before/after rubbing: 3 electrons move; rod −3e, cloth +3e, total 0; q = ne. |
| phys.em.gauss-law | +Q with 8 field lines; two surfaces each crossed by all 8 (asserted); a charge-free surface ON a line: in = out, Φ = 0 (asserted). |
| phys.em.dielectrics | Same Q: vacuum (4 lines) vs κ = 2 slab with aligned dipoles (2 lines); E = E₀/κ, C = κC₀. |
| phys.em.energy-capacitor | V = Q/C line for 2 μF to 6 V; shaded triangle U = ½CV² = 36 μJ. |
| phys.em.biot-savart | Current element I dl, r at 60°, dB into the page (dl × r̂ asserted), a quarter at 2r. |
| phys.em.amperes-law | Wire out of page; B anticlockwise on loops r and 2r, half as long at 2r (asserted); ∮B·dl = μ₀I. |
| phys.em.magnetic-materials | Same B: M against it (dia), weakly along (para), strongly along (ferro) — qualitative lengths. |
| phys.em.magnetic-dipole | Current loop, m = NIA, field lines from r = L sin²θ (closed through the loop, asserted). |
| phys.em.maxwells-equations | Four panels, one per equation, and c = 1/√(μ₀ε₀). |
| phys.opt.nature-of-light | Wide opening → straight rays; opening ≈ λ → spreading waves. |
| phys.opt.optical-instruments | Magnifying glass: f = 2, u = −1.2 → virtual upright image v = −3, m = 2.5 (asserted). |
| phys.opt.wave-optics | Huygens: wavelets from points on a wavefront; new front = envelope at ct (asserted). |
| phys.opt.brewsters-law | n = 1.5: θ_B = 56.3°, refracted 33.7°, 90° between reflected and refracted (asserted); reflected fully polarized. |

Found while rendering: Gauss's "no charge inside" surface first sat between field lines (showed
nothing) — now centred on a line. Ampère and magnetic-materials arrows too short to read; lengthened.
The magnetic-dipole chip picked a narration sentence (a ")" made it formula-shaped); reworded.
Maxwell's c label collided with the panels.

**Resolver defect surfaced by this batch (fixed).** Giving Nature of Light a figure meant a Total
Internal Reflection learner asking "show me a ray diagram" would be shown "Light: rays or waves?":
"ray" matched math "Ray", which the same-subject re-read turned into "Nature of Light: Ray and Wave
Models" (before, the same mis-resolution showed no figure at all). Fix: the lesson's own authored
figure text (labels + narration, new `visual/authoredFigureText.ts`) is now part of
requestedConcept's lesson vocabulary, so the existing L3 rule keeps a lesson's own word from opening
a detour. Shared by the teaching target and the figure (the V1 invariant holds). Two rejected
attempts first: a "word before a medium noun" filter broke "viscosity diagram" / "vector diagram"
requests, and a same-domain variant broke "vector visualization" from a phys.meas lesson. Tests:
rayDiagramIsAMedium.test.ts; four tests that pinned "ray bending in a refraction lesson →
nature-of-light" now pin it from dispersion (whose figure never says "ray") and assert refraction
keeps its own lesson. diagramRequestServesAFigure's live-generation block moved from
energy-capacitor (now authored) to phys.mech.power with power-vocabulary figures.

## Batch 9 (2026-09-30): the retired circuit concepts, semiconductors, shell model

New module `physicsCoreScenesB9.ts` (adds resistor zig-zag, cell, galvanometer and coil helpers).

| Concept | Figure |
|---|---|
| phys.em.wheatstone-bridge | Diamond of P, Q, R, S with galvanometer G = 0; S = QR/P = 300 Ω (balance asserted). |
| phys.em.potentiometer | Uniform wire AB with driver cell (2 V); test cell + G to the jockey at l = 60 cm; E = V_AB·l/L = 1.2 V. |
| phys.em.self-inductance | I(t) ramp / hold / fast switch-off; ε = −L dI/dt by finite difference: small, zero, large spike (asserted). |
| phys.em.mutual-inductance | Transformer: 4-turn primary, 8-turn secondary on one core; V_s = V_p·N_s/N_p = 24 V. |
| phys.em.lc-circuits | U_C = cos², U_L = sin², total constant (sum asserted); f = 1/(2π√LC) = 1.59 kHz for 10 mH, 1 μF. |
| phys.mod.energy-bands | Two levels splitting into six as atoms approach (spread ∝ overlap); valence band, gap, conduction band. |
| phys.mod.semiconductor-classification | Conductor (overlap), semiconductor (1.1 eV), insulator (5.5 eV). |
| phys.mod.intrinsic-semiconductors | Electron–hole pairs across the gap; σ(T) rising steeply vs a metal's falling. |
| phys.mod.extrinsic-semiconductors | Si lattice with P donor (spare e⁻, n-type) and B acceptor (hole, p-type); neutral overall. |
| phys.mod.pn-junction | Holes / electrons, depletion region with fixed ions, built-in field n → p (asserted), barrier V₀. |
| phys.mod.diode-rectification | Shockley curve I_s = 1e-14 A, nV_T = 0.026 V: blocks in reverse, turns on ≈ 0.66 V. |
| phys.mod.nuclear-models | Shell-model levels (2j + 1 each); gaps give the magic numbers 2, 8, 20, 28, 50 (computed). |

Found while rendering: the first diode used nV_T = 0.05, putting turn-on at 1.04 V — past the plotted
range, so the forward curve never rose. Potentiometer and transformer headline chips picked the wrong
line (balance length; a narration sentence); recoloured / reworded.

**No physics concept remains in the retirement register** (20 → 15; chemistry and CS rows only).
Fixtures that used physics circuit concepts as "still retired" examples now use chemistry ones;
visualLifecycleFinalization and visualRetirementLifecycle, which inject a replacement for a retired
concept, moved from lc-circuits to chem.solid.defects (with defect-vocabulary fixture figures);
visualSemanticMoat's emf test now asserts the seven circuit-card siblings own figures and emf is
still demoted.
