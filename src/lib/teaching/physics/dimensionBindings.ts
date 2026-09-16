/**
 * Deterministic Physics Verifier — per-concept dimension bindings.
 *
 * Design: `docs/architecture/DETERMINISTIC_PHYSICS_VERIFIER_DESIGN.md` §5.2,
 * §6 row 2 ("Bindings for ONE domain — `phys.mech.*` only... every symbol
 * hand-bound; every canonical entry copied from existing authored text,
 * never written fresh"), §4.3 (why bindings are per-concept, not global).
 *
 * Batch 0 shipped this file with types only and an empty registry. This
 * batch populates `CONCEPT_DIMENSION_BINDINGS` for 24 `phys.mech.*`
 * concepts — a deliberate subset of the 55 `phys.mech.*` concepts
 * represented in `src/tests/support/physicsVerifierCorpus.ts`'s
 * CORRECT_CONTROLS, chosen for authored-equation cleanliness and grounding
 * confidence over raw completeness (§5.3 Gate B's own philosophy — "an
 * unbound symbol is a correct outcome, not a defect" — applied here at the
 * CONCEPT level: an unbound concept is a correct, honest outcome too). The
 * 8 excluded advanced analytical-mechanics concepts (Lagrangian/Hamiltonian
 * formalism, canonical transformations, Poisson brackets) use dot-notation
 * (θ̇), partial derivatives (∂L/∂θ̇), and curly-brace Poisson-bracket
 * notation that Batch 0's parser has no representation for at all — binding
 * their symbols would produce entries no equation in that family could ever
 * be checked against, so they are left for a future batch alongside actual
 * parser support.
 *
 * ── §4.3 IN PRACTICE: THE SAME LETTER, TWO DIFFERENT PHYSICAL QUANTITIES,
 *    WITHIN phys.mech.* ITSELF ──────────────────────────────────────────
 * The design doc's own measurement (§4.3) demonstrated symbol overloading
 * ACROSS domains (T: period/tension/temperature). Building these 24
 * bindings found the identical phenomenon WITHIN mechanics alone: `L` means
 * ANGULAR MOMENTUM in `phys.mech.angular-momentum` (`L = Iω`,
 * dimension [ML²T⁻¹]) but ROD LENGTH in `phys.mech.moment-of-inertia`
 * (`d = L/2`, the parallel-axis-theorem derivation for a thin rod,
 * dimension [L]) — both concepts are bound below with `L` given a
 * DIFFERENT `Dimension` in each `symbols` map, which is exactly what a
 * global table could not do and per-concept bindings can. Likewise `T`
 * means PERIOD in `phys.mech.hookes-law` (`T = 2π√(m/k)`), not tension —
 * `phys.mech.tension`'s own binding uses `T` for the force instead, in yet
 * a third, independent `symbols` map.
 *
 * ── TWO NOTATION GAPS FOUND WHILE GROUNDING THESE BINDINGS, NEITHER FIXED
 *    (Batch 0's parser is explicitly out of scope this batch) ───────────
 * (1) Leibniz derivative notation (`dU/dx`, `dL/dt`) tokenizes under
 * Batch 0's parser as ordinary adjacent-symbol multiplication — `d` and `U`
 * are two zero-whitespace-adjacent letters, so `dU` parses as `d * U`, not
 * as "the derivative of U". Binding `d` to any Dimension here would be
 * FABRICATING a meaning for a differential operator, not grounding a real
 * physical symbol — so `d` is deliberately never bound in
 * `conservative-forces` or `angular-momentum` below, and their one
 * derivative-notation equation each (`F = −dU/dx`, `τ_net = dL/dt`) is
 * excluded from `canonical` for that reason (not silently dropped —
 * recorded in each binding's own comment). This is the concept-level
 * instance of "skip, don't guess": Gate B (§5.3) would abstain on the
 * unbound `d` anyway if the equation were included; excluding it here is
 * the authoring-time version of the same discipline.
 * (2) A handful of authored equations use trigonometric function calls
 * (`cos30°`, `cosθ`, `sinθ`) or the `×` cross-product operator
 * (`τ = r × F`, `L = r × p`) — real, correct physics, but Batch 1 already
 * reported both as parser gaps (`× `, implicit function calls) and Batch 0
 * is untouched this batch. These equations ARE included in `canonical`
 * (every symbol they use is groundable — θ is dimensionless, r is a
 * length, F is a force) and their symbols ARE bound; they simply cannot be
 * dimension-VERIFIED via `analyzeEquation` yet, which the validation test
 * for this batch reports honestly as "parse failure, not a mismatch."
 *
 * ── EXTRACTION-NOISE EXCLUSIONS (residual imprecision Batch 1 already
 *    flagged as reported-not-fixed, recurring here in a few new equations) ──
 * `phys.mech.gravitational-potential`'s "r = infinity" (a value, not a
 * relation between quantities), `phys.mech.conservation-of-momentum`'s
 * "v = 0 → v" (a stray arrow character from the source markdown),
 * `phys.mech.power`'s "P = W/t and P" (a truncated duplicate of the clean
 * "P = W/t" already present), `phys.mech.tension`'s "T = mg for a hanging
 * mass" (a duplicate of the clean "T = mg" with trailing prose attached),
 * `phys.mech.torque`'s "θ = 0° or 180°" (a value statement, not a
 * relation), `phys.mech.angular-momentum`'s "p = mv ✓" (a duplicate of the
 * clean "p = mv" with a trailing checkmark glyph), and
 * `phys.mech.center-of-mass`'s "CM = geometric centre" (a true English
 * sentence, not a symbolic physical relation dimensional analysis applies
 * to) are all excluded from `canonical` for these reasons, each noted
 * in-line rather than silently omitted.
 */

// Dimension is defined in dimensions.ts (the algebra module) and re-exported
// here rather than redeclared, so there is exactly one definition to drift.
export type { Dimension } from './dimensions'

import type { Dimension } from './dimensions'

/**
 * One canonical rendering of an equation as authored/expected for a concept,
 * paired with a human-readable gloss. Not consumed by anything this batch —
 * carried in the type so Batch 2+ has a place to put corpus text without a
 * second type-shape decision later.
 */
export interface ConceptCanonicalEquation {
  readonly text: string
  readonly gloss: string
}

/**
 * Per-concept binding: which Dimension each symbol used in that concept's
 * equations denotes, plus the canonical equation forms the concept teaches.
 */
export interface ConceptDimensionBinding {
  readonly conceptId: string
  readonly symbols: Readonly<Record<string, Dimension>>
  readonly canonical: ReadonlyArray<ConceptCanonicalEquation>
}

// ── Shared Dimension values for the 7 SI base exponents (M, L, T, I, Θ, N, J).
// These are ORDINARY PHYSICAL FACTS (a mass is always [M], a force is always
// [MLT⁻²]) reused across concepts for brevity and to eliminate transcription
// risk across ~90 symbol entries below — this is NOT the global-table
// mistake §4.3 warns against. The mistake §4.3 identifies is reusing a
// SYMBOL NAME's MEANING across concepts (assuming "T" always means the same
// physical quantity); reusing the numeric Dimension value that "a force"
// always has is dimensionally definitional, not a per-corpus convention.
// Every concept's own `symbols` map below independently decides which of
// these values, if any, each of ITS symbol names denotes. ──
const ZERO: Dimension = { M: 0, L: 0, T: 0, I: 0, Θ: 0, N: 0, J: 0 }
const DIMENSIONLESS: Dimension = ZERO
const MASS: Dimension = { ...ZERO, M: 1 }
const LENGTH: Dimension = { ...ZERO, L: 1 }
const TIME: Dimension = { ...ZERO, T: 1 }
const AREA: Dimension = { ...ZERO, L: 2 }
const VOLUME: Dimension = { ...ZERO, L: 3 }
const VELOCITY: Dimension = { ...ZERO, L: 1, T: -1 } // m/s
const ACCELERATION: Dimension = { ...ZERO, L: 1, T: -2 } // m/s^2
const FORCE: Dimension = { ...ZERO, M: 1, L: 1, T: -2 } // newton, kg m/s^2
const MOMENTUM: Dimension = { ...ZERO, M: 1, L: 1, T: -1 } // kg m/s
const ENERGY: Dimension = { ...ZERO, M: 1, L: 2, T: -2 } // joule, kg m^2/s^2
const TORQUE: Dimension = ENERGY // N.m, dimensionally identical to energy
const POWER: Dimension = { ...ZERO, M: 1, L: 2, T: -3 } // watt, kg m^2/s^3
const PRESSURE: Dimension = { ...ZERO, M: 1, L: -1, T: -2 } // pascal, N/m^2
const DENSITY: Dimension = { ...ZERO, M: 1, L: -3 } // kg/m^3
const SPRING_CONSTANT: Dimension = { ...ZERO, M: 1, T: -2 } // N/m
const ANGULAR_VELOCITY: Dimension = { ...ZERO, T: -1 } // rad/s (radian is dimensionless)
const ANGULAR_ACCELERATION: Dimension = { ...ZERO, T: -2 } // rad/s^2
const MOMENT_OF_INERTIA: Dimension = { ...ZERO, M: 1, L: 2 } // kg m^2
const ANGULAR_MOMENTUM: Dimension = { ...ZERO, M: 1, L: 2, T: -1 } // kg m^2/s
// Newton's gravitational constant G: from F = Gm1m2/r^2, G = F r^2 / (m1 m2).
const GRAVITATIONAL_CONSTANT: Dimension = { ...ZERO, M: -1, L: 3, T: -2 }

// Note on naming: the `Dimension` interface's own `N` field (exponent of
// "amount of substance", mol) and the physics SYMBOL `"N"` used below for
// NORMAL FORCE are unrelated — one is a TypeScript interface field, the
// other a string key in a per-concept `Record<string, Dimension>`. Neither
// concept below binds `N` to an amount-of-substance dimension.

export const CONCEPT_DIMENSION_BINDINGS: Readonly<Record<string, ConceptDimensionBinding>> = {
  'phys.mech.acceleration': {
    conceptId: 'phys.mech.acceleration',
    symbols: {
      a: ACCELERATION,
      Δv: VELOCITY,
      Δt: TIME,
      v_avg: VELOCITY,
      Δx: LENGTH,
    },
    canonical: [
      { text: 'a = Δv / Δt', gloss: 'Average acceleration is the change in velocity divided by the time taken (Blueprint TA-2/P08 notation).' },
      { text: 'a = Δv/Δt', gloss: 'The same rate-of-change definition of acceleration, written without spacing around the division.' },
      { text: 'v_avg = Δx/Δt', gloss: 'Average velocity — cited in this concept\'s own prerequisite check (PD-1) as the definition the student must already hold before acceleration is introduced.' },
    ],
  },

  'phys.mech.newtons-second-law': {
    conceptId: 'phys.mech.newtons-second-law',
    symbols: {
      a: ACCELERATION,
      F_net: FORCE,
      m: MASS,
      g: ACCELERATION, // gravitational field strength near Earth's surface, same dimension as acceleration
      // "ΣF" is NOT a single symbol under Batch 0's tokenizer, found while
      // verifying this binding: unlike "Δ", "Σ" has no special one-letter
      // prefix rule in dimensions.ts's parseAtom — it tokenizes as its own
      // bare one-character symbol "Σ", immediately followed by an
      // implicit-multiplication "F". "Σ" (summation) is dimensionless in
      // every use, so binding it alone — rather than fabricating a meaning
      // for a compound key the parser never actually looks up — lets
      // "ΣF" correctly verify as Σ[dimensionless] × F[force] = force.
      Σ: DIMENSIONLESS,
      F: FORCE,
    },
    canonical: [
      { text: 'a = F_net/m', gloss: 'Newton\'s Second Law rearranged to solve for acceleration from the net force and mass (Blueprint TA-2/P08 notation).' },
      { text: 'a = mg/m', gloss: 'The special case where the only force is weight (mg): acceleration reduces to g.' },
      { text: 'a = ΣF / m', gloss: 'Newton\'s Second Law using the explicit summation notation for net force.' },
    ],
  },

  'phys.mech.momentum': {
    conceptId: 'phys.mech.momentum',
    symbols: {
      F: FORCE,
      m: MASS,
      a: ACCELERATION,
      F_net: FORCE,
      Δp: MOMENTUM,
      Δt: TIME,
    },
    canonical: [
      { text: 'F = ma', gloss: 'Newton\'s Second Law in its acceleration form, cited in this concept\'s spine as the form momentum generalizes beyond ("Newton\'s 2nd Law in its most general form").' },
      { text: 'F_net = Δp/Δt', gloss: 'Newton\'s Second Law in momentum form — the more fundamental statement that still works when mass changes (Component 1, "Newton\'s 2nd Law in momentum form").' },
    ],
  },

  'phys.mech.impulse': {
    conceptId: 'phys.mech.impulse',
    symbols: {
      F: FORCE,
      Δp: MOMENTUM,
      Δt: TIME,
      F_avg: FORCE,
      J: MOMENTUM, // impulse shares momentum's dimension (N.s = kg.m/s)
      J_net: MOMENTUM,
    },
    canonical: [
      { text: 'F = Δp/Δt', gloss: 'Newton\'s Second Law in impulse form: average force equals the rate of momentum change (Component 1, "Key properties").' },
      { text: 'F_avg = Δp/Δt', gloss: 'The same relation, naming the force explicitly as an average over the contact time.' },
      { text: 'J = Δp', gloss: 'The Impulse-Momentum Theorem: impulse equals the change in momentum (Component 1, "Formal Definitions").' },
      { text: 'J_net = Δp', gloss: 'The theorem restated with the net impulse explicit.' },
    ],
  },

  'phys.mech.friction': {
    conceptId: 'phys.mech.friction',
    symbols: {
      f: FORCE,
      μ: DIMENSIONLESS, // coefficient of friction — a ratio, no units
      m: MASS,
      g: ACCELERATION,
      N: FORCE, // normal force
      f_k: FORCE,
      μ_k: DIMENSIONLESS,
    },
    canonical: [
      { text: 'f = μmg', gloss: 'The misconception form this concept exists to correct: friction as coefficient times WEIGHT (mg), valid only when the surface is horizontal with no vertical applied force (§ MC-FRICTION-USES-WEIGHT).' },
      { text: 'f = μN', gloss: 'Friction as coefficient times the NORMAL force — correct in general, since N is read from the free-body diagram rather than assumed to equal weight.' },
      { text: 'f_k = μ_k N', gloss: 'Kinetic friction: coefficient of kinetic friction times the normal force, constant once sliding (Blueprint §6, "f_k = μ_k N (kinetic, sliding)"). Does not currently parse for a reason distinct from the trig gaps below: Batch 0\'s implicit multiplication only bridges ZERO whitespace (its own documented design, not a bug), and this authored form has a space before "N" — it needs an explicit "*" to be machine-checkable as written.' },
      { text: 'N = mg', gloss: 'The normal force equals weight — but only on flat ground with no other vertical force, per TA-2\'s own explicit caveat.' },
      { text: 'N = mg cos30°', gloss: 'The normal force on a 30° incline: only the weight component perpendicular to the surface presses into it (TA-2 worked comparison). Known parser gap (Batch 1): the trigonometric function call "cos30°" is not yet parsed by dimensions.ts.' },
      { text: 'N = mg cosθ', gloss: 'The general incline case: N = mg cosθ is always less than mg for θ > 0 (§ MC-FRICTION-USES-WEIGHT\'s own conflict evidence). Same known parser gap as above.' },
    ],
    // "f_k = μ_kN" (no space before N, unlike the entry above) excluded: a
    // genuine symbol-boundary ambiguity, not a binding gap. Batch 0's
    // underscore-decoration rule greedily consumes every following
    // alphanumeric character, so "μ_kN" tokenizes as ONE opaque symbol
    // literally named "μ_kN" rather than "μ_k" and "N" multiplied — found
    // while verifying this binding. Assigning that opaque string a
    // Dimension would require asserting what it "should" mean rather than
    // grounding a real symbol the parser can actually isolate, so it is
    // left out; the physically identical, correctly-spaced "f_k = μ_k N"
    // above is kept instead (itself unparseable for the different,
    // documented whitespace reason).
  },

  'phys.mech.free-body-diagram': {
    conceptId: 'phys.mech.free-body-diagram',
    symbols: {
      W: FORCE, // weight
      m: MASS,
      g: ACCELERATION,
      // "ΣF" decomposes into "Σ" × "F" under Batch 0's tokenizer, not one
      // symbol — see phys.mech.newtons-second-law's binding for the full
      // explanation of this finding.
      Σ: DIMENSIONLESS,
      F: FORCE,
      a: ACCELERATION,
    },
    canonical: [
      { text: 'W = mg', gloss: 'Weight is mass times the gravitational field strength — always present on a free-body diagram, per the Learning Objective\'s own "weight always" rule.' },
      { text: 'ΣF = ma', gloss: 'The payoff of a completed free-body diagram: summing the drawn forces along an axis gives Newton\'s Second Law (Learning Objective 3, "write the net force equation").' },
    ],
  },

  'phys.mech.universal-gravitation': {
    conceptId: 'phys.mech.universal-gravitation',
    symbols: {
      g: ACCELERATION,
      G: GRAVITATIONAL_CONSTANT,
      M: MASS,
      R: LENGTH,
    },
    canonical: [
      { text: 'g = GM/R²', gloss: 'Surface gravitational field strength derived from the universal law of gravitation applied at a body\'s own surface (Blueprint, "Near Earth\'s surface: F = mg where g = GM_E/R_E²").' },
    ],
  },

  'phys.mech.gravitational-field': {
    conceptId: 'phys.mech.gravitational-field',
    symbols: {
      F: FORCE,
      G: GRAVITATIONAL_CONSTANT,
      // Batch 0's SUBSCRIPT_DIGITS table maps the Unicode subscript
      // characters (₁, ₂, ...) to plain ASCII digits when forming a
      // symbol's name, so "m₁" in the authored text is tokenized as the
      // symbol NAMED "m1" (ASCII "1"), not "m₁" — found while verifying
      // this binding (the literal-Unicode-subscript key was never looked
      // up by the real parser). Bound here using the form the parser
      // actually produces.
      m1: MASS,
      m2: MASS,
      r: LENGTH,
      m: MASS,
      g: ACCELERATION,
    },
    canonical: [
      { text: 'F = Gm₁m₂/r²', gloss: 'Newton\'s law of universal gravitation between two masses separated by distance r (Component 2, "where M is the mass of the source body and r is the distance").' },
      { text: 'F = mg', gloss: 'The gravitational force on a test mass m in a field of strength g.' },
      { text: 'g = F/m (N/kg)', gloss: 'Gravitational field strength defined as force per unit mass, independent of the test mass used to probe it (§ MC-FIELD-IS-FORCE\'s own replacement text). Not currently parseable: the trailing "(N/kg)" unit annotation was captured as part of the equation text by the extraction script, a residual noise case per Batch 1\'s own documented limits.' },
    ],
  },

  'phys.mech.gravitational-potential': {
    conceptId: 'phys.mech.gravitational-potential',
    symbols: {
      E: ENERGY,
      U: ENERGY,
      g: ACCELERATION,
      F: FORCE,
      m: MASS,
      G: GRAVITATIONAL_CONSTANT,
      M: MASS,
      r: LENGTH,
      // Deliberately NOT bound: "KE". Found while verifying this binding —
      // Batch 0's tokenizer has no rule at all for a BARE multi-letter
      // symbol name with no Δ-prefix, no subscript, and no underscore
      // suffix; "KE" is read as the one-letter symbol "K" immediately
      // followed by an implicit-multiplication "E", never as one
      // "kinetic energy" symbol. There is no textually-grounded dimension
      // to give the bare letters "K" or "E" individually (unlike "Σ" above,
      // which is universally dimensionless by definition) — binding either
      // would be fabricating a meaning, so both equations below that use
      // "KE" are included in canonical (they are genuinely authored) but
      // correctly report as unbound rather than a false pass or a false
      // dimensional mismatch.
    },
    // "r = infinity" excluded: a boundary-condition VALUE (the reference
    // point for zero potential energy), not a relation between two
    // physical quantities — dimensional analysis does not apply to it.
    canonical: [
      { text: 'E = KE + U', gloss: 'Total mechanical energy is the sum of kinetic and gravitational potential energy.' },
      { text: 'g = F/m', gloss: 'Gravitational field strength as force per unit mass, restated in this concept without the unit annotation.' },
      { text: 'U = -GMm/r', gloss: 'Gravitational potential energy with the reference level at infinity, always negative for a bound system.' },
      { text: 'E = −GMm/2r', gloss: 'The total energy of a circular orbit — exactly half the potential energy at that radius, the standard orbital-mechanics result.' },
      { text: 'KE = −E', gloss: 'For a circular orbit, kinetic energy equals the negative of the total energy — a direct consequence of the virial theorem for an inverse-square force.' },
    ],
  },

  'phys.mech.escape-velocity': {
    conceptId: 'phys.mech.escape-velocity',
    symbols: {
      U: ENERGY,
      G: GRAVITATIONAL_CONSTANT,
      M: MASS,
      m: MASS,
      r: LENGTH,
      v_e: VELOCITY,
    },
    canonical: [
      { text: 'U = −GMm/r', gloss: 'Gravitational potential energy at radius r, the starting point for the energy-conservation derivation of escape velocity ("Escape velocity derives directly from U = −GMm/r").' },
      { text: 'v_e = √(2GM/r)', gloss: 'Escape velocity: the minimum launch speed for an unpropelled object to reach infinity with zero speed left, derived by setting total mechanical energy to zero.' },
    ],
  },

  'phys.mech.hookes-law': {
    conceptId: 'phys.mech.hookes-law',
    symbols: {
      a: ACCELERATION,
      k: SPRING_CONSTANT,
      m: MASS,
      x: LENGTH,
      F: FORCE,
      // Deliberately NOT bound: "PE" — same bare-multi-letter tokenizer
      // gap as "KE" (see phys.mech.gravitational-potential's binding for
      // the full explanation). "PE = ½kx²" below is genuinely authored
      // and kept in canonical, but reports as unbound rather than verified.
      T: TIME, // PERIOD of oscillation in this concept — NOT tension (see file header, §4.3 illustration)
      k_eq: SPRING_CONSTANT,
      // Same ASCII-subscript-form fix as gravitational-field's m1/m2.
      k1: SPRING_CONSTANT,
      k2: SPRING_CONSTANT,
    },
    canonical: [
      { text: 'a = −(k/m)x', gloss: 'The equation of motion for a mass on a spring, the restoring acceleration proportional to displacement (simple harmonic motion).' },
      { text: 'F = kx', gloss: 'Hooke\'s Law: restoring force proportional to extension, valid within the elastic limit (Blueprint §6, "F = restoring force... x = extension or compression").' },
      { text: 'k = F/x', gloss: 'Hooke\'s Law rearranged to define the spring constant from a measured force and extension.' },
      { text: 'PE = ½kx²', gloss: 'Elastic potential energy stored in a stretched or compressed spring.' },
      { text: 'T = 2π√(m/k)', gloss: 'The period of oscillation of a mass-spring system — T here denotes PERIOD, a dimension of TIME, distinct from tension elsewhere in this corpus.' },
      // KNOWN CORPUS DEFECT, found while verifying this binding — reported,
      // not fixed (physicsVerifierCorpus.ts is Batch 1's fixture, out of
      // this batch's scope). analyzeEquation correctly reports this text as
      // a genuine dimensional MISMATCH (LHS [MT⁻²], RHS [M⁻¹T²]) — but the
      // mismatch is a CORPUS EXTRACTION ARTIFACT, not a physics error or a
      // binding error. The real authored text (docs/physics/teaching-
      // assets/assets.json, phys.mech.hookes-law asset) is
      // "1/k_eq = 1/k₁ + 1/k₂ — the same force stretches each in turn" —
      // Batch 1's extraction regex requires its LHS capture to start at a
      // LETTER, so the leading "1/" was silently dropped, changing a
      // dimensionally-consistent equation (both sides [M⁻¹T²], the
      // reciprocal of a spring constant) into this dimensionally-WRONG one.
      // k_eq is bound above to SPRING_CONSTANT because that IS its real
      // physical dimension — the mismatch this equation reports is the
      // extraction defect surfacing, exactly as this batch's own
      // verification step is designed to catch.
      { text: 'k_eq = 1/k₁ + 1/k₂', gloss: 'The equivalent spring constant for two springs in series (each spring\'s compliance adds) — see the KNOWN CORPUS DEFECT comment above this entry: the real authored equation is "1/k_eq = 1/k₁ + 1/k₂".' },
    ],
  },

  'phys.mech.kinetic-energy': {
    conceptId: 'phys.mech.kinetic-energy',
    symbols: {
      W: ENERGY,
      F: FORCE,
      d: LENGTH,
      W_net: ENERGY,
      // Deliberately NOT bound: "ΔKE". A second, distinct instance of the
      // bare-multi-letter tokenizer gap: "Δ" only prepends to the SINGLE
      // letter immediately following it ("Δv", "ΔU" work), so "ΔKE"
      // tokenizes as "ΔK" (Δ + the one letter "K") immediately followed by
      // an implicit-multiplication "E" — never as "the change in KE".
      // "W_net = ΔKE" below is genuinely authored and kept in canonical,
      // but correctly reports as unbound rather than verified.
    },
    canonical: [
      { text: 'W = Fd cosθ', gloss: 'Work done by a force at an angle θ to the displacement d. Known parser gap (Batch 1): the trigonometric function call "cosθ" is not yet parsed by dimensions.ts.' },
      { text: 'W_net = ΔKE', gloss: 'The Work-Energy Theorem: the net work done on an object equals its change in kinetic energy.' },
    ],
  },

  'phys.mech.potential-energy': {
    conceptId: 'phys.mech.potential-energy',
    symbols: {
      // Deliberately NOT bound: "EPE" — the same bare-multi-letter
      // tokenizer gap as "KE"/"PE" (see phys.mech.gravitational-potential's
      // binding). "EPE = ½kx²" below is genuinely authored and kept in
      // canonical, but correctly reports as unbound rather than verified.
      k: SPRING_CONSTANT,
      x: LENGTH,
      W: ENERGY,
      F: FORCE,
      d: LENGTH,
    },
    canonical: [
      { text: 'EPE = ½kx²', gloss: 'Elastic potential energy stored in a spring extended or compressed by x.' },
      { text: 'W = Fd', gloss: 'Work done by a constant force over a displacement d (used here as the mechanism that transfers energy into a potential-energy store).' },
    ],
  },

  'phys.mech.conservative-forces': {
    conceptId: 'phys.mech.conservative-forces',
    symbols: {
      F: FORCE,
      U: ENERGY,
      k: SPRING_CONSTANT,
      x: LENGTH,
      m: MASS,
      g: ACCELERATION,
      h: LENGTH,
      W: ENERGY,
      W_cons: ENERGY,
      ΔU: ENERGY,
    },
    // "F = −dU/dx" excluded: Leibniz derivative notation. Under Batch 0's
    // current tokenizer, "dU" parses as the ADJACENT-SYMBOL PRODUCT d*U (an
    // implicit multiplication, not a derivative) — see file header. Binding
    // "d" to any Dimension here would fabricate a meaning for a
    // differential operator rather than ground a real physical symbol, so
    // it is left unbound and this one equation is excluded from canonical.
    canonical: [
      { text: 'U = ½kx²', gloss: 'The potential energy function for a spring force, one of the two worked examples deriving F = −dU/dx in reverse ("U = ½kx² → F = −d(½kx²)/dx = −kx (Hooke\'s law)").' },
      { text: 'U = mgh', gloss: 'Gravitational potential energy, the other worked example of a conservative-force potential ("Gravity: F = −mg ĵ → U = mgy").' },
      { text: 'W = −mgh', gloss: 'The work done by gravity when an object rises by h — negative of the potential energy gained.' },
      { text: 'W_cons = −ΔU', gloss: 'The general relation for any conservative force: the work it does equals the negative of the potential-energy change (Blueprint §6, "W_A→B = −ΔU").' },
    ],
  },

  'phys.mech.conservation-of-energy': {
    conceptId: 'phys.mech.conservation-of-energy',
    symbols: {
      E_total: ENERGY, // single letter + underscore-suffix: correctly forms ONE symbol
      m: MASS,
      g: ACCELERATION,
      h: LENGTH,
      // Deliberately NOT bound: "KE", "PE", "GPE", "PE_i", "KE_f", "PE_f".
      // All are the same bare-multi-letter tokenizer gap as "KE" elsewhere
      // in this file — including the underscore-suffixed forms: "PE_i"
      // tokenizes as "P" (no decoration; the NEXT character is "E", not a
      // subscript digit or underscore, so "P" gets none) immediately
      // followed by "E_i" (which DOES correctly form one symbol, since "_i"
      // decorates the single letter "E" right before it) — i.e. "PE_i" is
      // P × E_i, not one "PE_i" symbol. Only the LAST letter before a
      // decoration can ever receive it; "E_total" above is spared only
      // because it is already a single letter. Every equation below using
      // one of these six names is genuinely authored and kept in
      // canonical, but reports as unbound rather than verified.
    },
    canonical: [
      { text: 'E_total = KE + PE', gloss: 'Total mechanical energy is the sum of kinetic and potential energy, constant when only conservative forces act (Component profile, "E_total = KE + PE = constant").' },
      { text: 'GPE = mgh', gloss: 'Gravitational potential energy, one of the two energy stores this conservation law tracks.' },
      { text: 'PE = constant', gloss: 'A degenerate case cited in the misconception register: potential energy alone does not stay constant as energy converts to kinetic — only the TOTAL is conserved.' },
      { text: 'PE_i = KE_f + PE_f', gloss: 'A worked-example instance of conservation: all initial potential energy converts to a mix of final kinetic and potential energy.' },
    ],
  },

  'phys.mech.conservation-of-momentum': {
    conceptId: 'phys.mech.conservation-of-momentum',
    symbols: {
      // "Σp_before"/"Σp_after" decompose the same way "ΣF" does elsewhere
      // in this file: "Σ" tokenizes as its own bare symbol (dimensionless),
      // implicitly multiplied by "p_before"/"p_after" (each of which DOES
      // correctly form one symbol, since the underscore decorates the
      // single letter "p" immediately before it).
      Σ: DIMENSIONLESS,
      p_before: MOMENTUM,
      p_after: MOMENTUM,
    },
    // "v = 0 → v" excluded: an extraction-noise fragment carrying a stray
    // arrow character from the source markdown, not a genuine equation.
    canonical: [
      { text: 'Σp_before = Σp_after', gloss: 'The Law of Conservation of Momentum: total momentum before an interaction equals total momentum after, when no external net force acts (Component 1, "Formal Statement").' },
    ],
  },

  'phys.mech.power': {
    conceptId: 'phys.mech.power',
    symbols: {
      F: FORCE,
      P: POWER,
      v: VELOCITY,
      W: ENERGY,
      t: TIME,
      m: MASS,
      g: ACCELERATION,
      h: LENGTH,
    },
    // "P = W/t and P" excluded: a truncated duplicate of the clean
    // "P = W/t" already present below, with trailing prose ("and P...")
    // captured by the extraction script — residual noise, not a second
    // equation.
    canonical: [
      { text: 'F = P/v', gloss: 'Power rearranged to find the force an engine delivers at a given speed (Component 1, "P = Fv is useful for engines").' },
      { text: 'P = W/t', gloss: 'Average power: the rate at which work is done (Formal Definitions).' },
      { text: 't = W/P', gloss: 'The same relation rearranged to find the time needed to do a given amount of work at a given power.' },
      { text: 'W = mgh', gloss: 'The work done lifting a mass m through height h, used in the concept\'s own Worked Example 1 to compute average power.' },
    ],
  },

  'phys.mech.pressure-fluids': {
    conceptId: 'phys.mech.pressure-fluids',
    symbols: {
      F: FORCE,
      P: PRESSURE,
      A: AREA,
      // ASCII-subscript-form fix, same finding as gravitational-field's
      // m1/m2 above: the parser produces "P0"/"F1"/"F2"/"A1"/"A2" (ASCII
      // digits), not the literal Unicode-subscript spelling.
      P0: PRESSURE,
      ρ: DENSITY,
      g: ACCELERATION,
      h: LENGTH,
      P_gauge: PRESSURE,
      F2: FORCE,
      F1: FORCE,
      A2: AREA,
      A1: AREA,
    },
    canonical: [
      { text: 'F = PA', gloss: 'The force exerted by a fluid at pressure P over an area A, perpendicular to the surface (Blueprint §6, "P = F/A (pressure = normal force per unit area)").' },
      { text: 'P = F/A', gloss: 'The definition of pressure: normal force per unit area.' },
      { text: 'P = P₀ + ρgh', gloss: 'Hydrostatic pressure at depth h below a fluid surface at reference pressure P₀ (the Pascal\'s-principle bridge text\'s own formula).' },
      { text: 'P_gauge = ρgh', gloss: 'Gauge pressure — the hydrostatic pressure above the reference (atmospheric) pressure.' },
      { text: 'F₂ = F₁(A₂/A₁)', gloss: 'Pascal\'s principle applied to a hydraulic system: force scales with the ratio of piston areas.' },
    ],
  },

  'phys.mech.buoyancy': {
    conceptId: 'phys.mech.buoyancy',
    symbols: {
      F_buoy: FORCE,
      ρ_fluid: DENSITY,
      V_submerged: VOLUME,
      g: ACCELERATION,
      V: VOLUME,
      m: MASS,
      ρ: DENSITY,
      F_b: FORCE,
      V_displaced: VOLUME,
    },
    canonical: [
      { text: 'F_buoy = ρ_fluid × V_submerged × g', gloss: 'Archimedes\' Principle: buoyant force equals the weight of fluid displaced (Blueprint §6, "buoyant force = weight of fluid displaced"). Known parser gap (Batch 1): the "×" multiplication symbol is not yet parsed as an operator by dimensions.ts.' },
      { text: 'V = m/ρ', gloss: 'Volume from mass and density, used to compare an object\'s average density against the fluid\'s to predict floating or sinking.' },
      { text: 'F_b = ρ_fluid V_displaced g', gloss: 'Archimedes\' Principle written without the "×" symbol — the same relation as F_buoy above. Still does not parse, for a DIFFERENT reason found while verifying this binding: the authored text separates each factor with a SPACE ("ρ_fluid V_displaced g"), and Batch 0\'s implicit multiplication only bridges ZERO whitespace (its own documented design) — the same whitespace friction as friction\'s "f_k = μ_k N" above.' },
    ],
  },

  'phys.mech.tension': {
    conceptId: 'phys.mech.tension',
    symbols: {
      T: FORCE, // tension in this concept — NOT period (see file header, §4.3 illustration)
      m2: MASS, // ASCII-subscript-form fix, same finding as gravitational-field's m1/m2
      g: ACCELERATION,
      m: MASS,
    },
    // "T = mg for a hanging mass" excluded: a duplicate of the clean
    // "T = mg" below with trailing prose ("for a hanging mass") captured
    // by the extraction script — the same relation, not a second equation.
    canonical: [
      { text: 'T = m₂g', gloss: 'The tension supporting a hanging mass m₂ (an Atwood-machine-style worked example).' },
      { text: 'T = mg', gloss: 'Tension equals weight for a single mass in static equilibrium, hanging at rest.' },
    ],
  },

  'phys.mech.torque': {
    conceptId: 'phys.mech.torque',
    symbols: {
      τ: TORQUE,
      r: LENGTH,
      F: FORCE,
    },
    // "θ = 0° or 180°" excluded: a value statement (the two angles at which
    // torque vanishes), not a relation between physical quantities.
    canonical: [
      { text: 'τ = r × F', gloss: 'Torque as the cross product of the position vector and the applied force (Formal Definition). Known parser gap (Batch 1): the "×" multiplication symbol is not yet parsed as an operator by dimensions.ts.' },
    ],
  },

  'phys.mech.moment-of-inertia': {
    conceptId: 'phys.mech.moment-of-inertia',
    symbols: {
      d: LENGTH,
      L: LENGTH, // ROD LENGTH in this concept — NOT angular momentum (see file header, §4.3 illustration)
      I: MOMENT_OF_INERTIA,
      M: MASS,
      R: LENGTH,
      I_cm: MOMENT_OF_INERTIA,
      m: MASS,
      r: LENGTH,
      I_end: MOMENT_OF_INERTIA,
      α: ANGULAR_ACCELERATION,
      τ: TORQUE,
      F: FORCE,
      θ: DIMENSIONLESS, // angle in radians — dimensionless in SI
      // "Σmr²" decomposes into "Σ" × "m" × "r²" — same finding as "ΣF"
      // elsewhere in this file.
      Σ: DIMENSIONLESS,
    },
    canonical: [
      { text: 'd = L/2', gloss: 'The distance from a thin rod\'s centre to its end (half the rod length) — used in deriving the parallel-axis result for rotation about the rod\'s end.' },
      { text: 'I = ½MR²', gloss: 'The moment of inertia of a solid disc or cylinder about its central axis (the "Common results" table).' },
      { text: 'I = I_cm + Md²', gloss: 'The Parallel Axis Theorem: moment of inertia about any axis equals the centre-of-mass moment plus Md², where d is the distance between the axes.' },
      { text: 'I = Σmr²', gloss: 'Moment of inertia of an extended body as the sum over all particles of mass times distance-squared ("Extended body" definition).' },
      { text: 'I_end = I_cm + Md²', gloss: 'The Parallel Axis Theorem applied specifically to find a rod\'s moment of inertia about its end.' },
      { text: 'α = τ/I', gloss: 'Newton\'s Second Law for rotation, rearranged to find angular acceleration from torque and moment of inertia.' },
      { text: 'τ = Iα', gloss: 'Newton\'s Second Law for rotation ("Σ τ = I α... Newton\'s 2nd Law for rotation").' },
      { text: 'τ = rF sinθ', gloss: 'Torque as the magnitude form of the cross product, using the perpendicular component of the force. Known parser gap (Batch 1): the trigonometric function call "sinθ" is not yet parsed by dimensions.ts.' },
    ],
  },

  'phys.mech.angular-momentum': {
    conceptId: 'phys.mech.angular-momentum',
    symbols: {
      I: MOMENT_OF_INERTIA,
      M: MASS,
      R: LENGTH,
      J: MOMENTUM, // LINEAR impulse, cited in this concept's own linear/rotational analog table
      F: FORCE,
      Δt: TIME,
      // Deliberately NOT bound: "KE" — the same bare-multi-letter
      // tokenizer gap as elsewhere in this file (see
      // phys.mech.gravitational-potential's binding). "KE = ½Iω²" below is
      // genuinely authored and kept in canonical, but reports as unbound
      // rather than verified.
      ω: ANGULAR_VELOCITY,
      L: ANGULAR_MOMENTUM, // ANGULAR MOMENTUM in this concept — NOT rod length (see file header, §4.3 illustration)
      r: LENGTH,
      p: MOMENTUM,
      m: MASS,
      v: VELOCITY,
      ΔL: ANGULAR_MOMENTUM,
      τ: TORQUE,
      τ_net: TORQUE,
    },
    // "p = mv ✓" excluded: a duplicate of the clean "p = mv" below with a
    // trailing checkmark glyph from a discrimination-pairs list — the same
    // relation, not a second equation.
    // "τ_net = dL/dt" excluded: Leibniz derivative notation, the same
    // tokenizer limitation as conservative-forces' "F = −dU/dx" above — "d"
    // is deliberately left unbound in this concept too, for the identical
    // reason (see file header).
    canonical: [
      { text: 'I = MR²', gloss: 'The moment of inertia of a point mass at distance R from the rotation axis, used here to compute an object\'s angular momentum L = Iω.' },
      { text: 'J = FΔt', gloss: 'LINEAR impulse, cited in this concept\'s own linear/rotational analog table (Component 1, "Impulse J = Δp" vs "Angular impulse = ΔL = τΔt") for comparison — not itself an angular-momentum relation.' },
      { text: 'KE = ½Iω²', gloss: 'Rotational kinetic energy, the rotational analog of ½mv², expressed in terms of the same I and ω this concept\'s angular momentum uses.' },
      { text: 'L = Iω', gloss: 'Angular momentum of a rigid body rotating about a fixed axis (Formal Definitions).' },
      { text: 'L = r × p', gloss: 'Angular momentum of a particle as the cross product of its position and linear momentum (Formal Definitions). Known parser gap (Batch 1): the "×" multiplication symbol is not yet parsed as an operator by dimensions.ts.' },
      { text: 'p = mv', gloss: 'Linear momentum, cited in this concept\'s analog table as the linear counterpart to L = Iω.' },
      { text: 'ΔL = τΔt', gloss: 'Angular impulse: the change in angular momentum equals net torque times the time it acts (Component 1, "Angular impulse = ΔL = τΔt").' },
      { text: 'τ = ΔL/Δt', gloss: 'The angular-impulse relation rearranged to find torque from a measured change in angular momentum over time.' },
      { text: 'τ_net = ΔL/Δt', gloss: 'Newton\'s Second Law for rotation in angular-momentum form — the most general statement, valid even when I changes (Core Insight, "the most general form of Newton\'s 2nd Law for rotation").' },
    ],
  },

  'phys.mech.center-of-mass': {
    conceptId: 'phys.mech.center-of-mass',
    symbols: {
      F_ext: FORCE,
      M: MASS,
      a_cm: ACCELERATION,
      p: MOMENTUM,
      v_cm: VELOCITY,
    },
    // "CM = geometric centre" excluded: a true English sentence (the
    // special case where the centre of mass coincides with the geometric
    // centre for a uniform object), not a symbolic relation between
    // physical quantities — dimensional analysis does not apply to it.
    canonical: [
      { text: 'F_ext = Ma_cm', gloss: 'Newton\'s Second Law applied to a system\'s centre of mass: the net EXTERNAL force accelerates the CM as if all the mass were concentrated there.' },
      { text: 'p = Mv_cm', gloss: 'A system\'s total momentum equals its total mass times the velocity of its centre of mass.' },
    ],
  },
}
