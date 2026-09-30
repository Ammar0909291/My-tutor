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
