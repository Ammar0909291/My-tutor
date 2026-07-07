# Quantum Physics — Visual Learning Audit (Task 6)

**Status: design / audit only. No visuals implemented, no code changed.**
Maps the curriculum's visual needs against the **existing** visual engine (Sprints B–U) and proposes
new visual types — explicitly without building them.

---

## 1. Existing visual catalog (reusable as-is)

The platform ships 10 animated, step-revealed SVG visual types
(`src/lib/school/visuals/visualTypes.ts`), each driven by the Sprint R/R.1 playback engine and the
Sprint S/T/U narration-synchronization path (`revealStep`):

`number_line · fraction_bar · percentage_grid · coordinate_plane · geometry_shape · food_chain ·
water_cycle · solar_system · force_diagram · circuit_diagram`

### Directly reusable for quantum physics

| Existing visual | Reused for | Lessons |
|---|---|---|
| `coordinate_plane` | plotting wavefunctions ψ(x), |ψ|², energy levels, dispersion E(p) | L7.1, L8.1, L8.2, L14.2 |
| `number_line` | quantized energy ladders, position/momentum axes | L4.3, L8.1, L12.1 |
| `force_diagram` | Coulomb potential, potential wells/barriers (as 1D force/energy sketches) | L8.2, L8.3, L14.1 |
| `circuit_diagram` | analogy scaffolding for quantum-circuit notation (classical → quantum bridge) | L21.1 (intro only) |
| `geometry_shape` | orbital cross-sections, symmetry illustrations | L14.3, L29.2 |
| `percentage_grid` | probability-density / measurement-outcome distributions | L7.1, L10.3 |

**Reuse principle:** these need **no engine change** — quantum lessons can tag an existing
`VisualType`, and the existing narration-driven playback (Sprint U) already paces them.

---

## 2. New visual types required (design proposals only — DO NOT IMPLEMENT)

Each follows the existing contract: a pure step-count + an SVG renderer reading a single integer
`revealStep`, so it drops into the current engine with zero playback/narration changes.

| Proposed type | Purpose | Step build-up (narration-synced) | Anchor lessons |
|---|---|---|---|
| `wave_packet` | localized particle from superposed waves; group vs phase velocity | axis → single wave → sum of waves → localized packet → spreading | L6.3, L6.4 |
| `double_slit` | single-quantum interference build-up | source → slits → one detection → many detections → fringe pattern | L6.2 |
| `potential_well` | bound states & energy levels in a well | well outline → energy levels → ψ per level → |ψ|² → tunneling tail | L8.1, L8.2, L8.3 |
| `bloch_sphere` | single-qubit state geometry | sphere → axes (|0⟩,|1⟩) → state vector → rotation under a gate → measurement projection | L20.1, L20.2 |
| `quantum_circuit` | qubit lines + gates + measurement | qubit lines → single-qubit gate → CNOT → measurement → result | L21.1, L21.2 |
| `bloch_two_qubit` / `entanglement_pair` | correlated measurement of an entangled pair | pair prepared → separation → measure A → correlated B outcome → statistics | L19.2, L19.3 |
| `energy_level_diagram` | atomic levels & transitions | levels → electron occupancy → absorption arrow → emission arrow → spectral line | L4.3, L14.2, L17.3 |
| `spin_arrow` / `stern_gerlach` | spin measurement & splitting | beam → magnet field → split into up/down → detector counts | L13.3 |
| `bloch_rotation_timeline` | Rabi/precession dynamics over time | start state → small rotation → half → full flip → oscillation curve | L17.4 |
| `orbital_cloud` | hydrogen orbital probability clouds | nucleus → s-cloud → p-lobes → d-shape → radial nodes | L14.3 |

10 new visual types proposed; all conform to the existing `VisualType` + `revealStep` contract.

---

## 3. Animation opportunities

- **Progressive construction** (the engine's strength): energy ladders, wavefunction build-up,
  fringe accumulation, gate-by-gate circuit assembly.
- **Dynamics** (timer or narration mode): Rabi oscillations (L17.4), wave-packet spreading (L6.3),
  precession on the Bloch sphere (L20.2).
- **Cause→effect reveals:** measurement projection (superposition → single outcome) at L10.3, L20.1.

## 4. Narration-synchronization opportunities (Sprint S/T/U)

The narration-driven playback (Sprint U) is ideal where each spoken step maps to one construction step:

| Lesson | Narration → visual step mapping |
|---|---|
| L6.2 double slit | "fire one particle" → dot; "fire many" → pattern; "add which-path detector" → fringes vanish |
| L8.1 infinite well | "draw the well" → walls; "first level" → E₁; "its wavefunction" → ψ₁; "probability" → |ψ₁|² |
| L20.1 Bloch sphere | "here is |0⟩" → north pole; "apply H" → equator; "measure" → projection |
| L21.2 teleportation | "entangle" → pair; "Bell measure" → arrows; "classical bits" → channel; "recover state" → result |
| L4.3 line spectra | "electron drops" → arrow; "emits a photon" → wave; "we see a line" → spectral line |

All use the **existing** `onStepChange` / narration-step plumbing — no new sync engine.

## 5. Scope guardrails

- **Not implemented here.** This is an audit; building any renderer is a later, separate visual sprint.
- **Reuse-first:** 6 existing types cover early lessons immediately; 10 new types are additive and
  conform to the current engine contract, so no Sprint R/S/T/U rework is implied.
- **No engine change required** for either the reuse set or the proposed new set.

---

## Summary

- **Reusable existing visuals:** 6 of 10 map directly onto quantum lessons.
- **New visuals proposed:** 10 (design only), all engine-compatible.
- **Narration-sync candidates:** ≥5 high-value lessons identified.
- Quantum physics is visually rich and fits the existing animated/narrated pipeline without
  modifying it.
