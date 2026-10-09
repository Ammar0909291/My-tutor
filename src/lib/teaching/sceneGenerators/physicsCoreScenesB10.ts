/**
 * Physics visual gap campaign, batch 10 (2026-09-30): particle physics. Same
 * rules as physicsCoreScenes.ts; every figure stays within the intermediate
 * label budget. Numbers are standard measured values (PDG), stated as such.
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { P, r2, circlePoints, rect, fnPath, type V3 } from './physicsCoreScenes'

/** A wavy (boson) line between two points. */
function wavy(a: V3, b: V3, color: string, waves = 5, amp = 0.16): SceneObject {
  const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy)
  const nx = -dy / L, ny = dx / L
  const pts: V3[] = []
  for (let i = 0; i <= waves * 12; i++) { const t = i / (waves * 12), s = amp * Math.sin(t * waves * 2 * Math.PI); pts.push(P(a[0] + dx * t + nx * s, a[1] + dy * t + ny * s)) }
  return curve(pts, color)
}

// ── 1. The four fundamental forces ───────────────────────────────────────────

/** KG: "differ in relative strength, range, and the particles they act on." Strengths relative to the strong force, log scale. */
export const FORCES: Array<{ n: string; rel: number; range: string; color: string }> = [
  { n: 'strong', rel: 1, range: '10⁻¹⁵ m', color: ROLE.input },
  { n: 'electromagnetic', rel: 1 / 137, range: 'infinite', color: ROLE.output },
  { n: 'weak', rel: 1e-6, range: '10⁻¹⁸ m', color: ROLE.aid },
  { n: 'gravity', rel: 6e-39, range: 'infinite', color: ROLE.result },
]
export function buildFourForcesScene(): SceneSpec {
  const X0 = -1.6, SX = 6.0 / 40 // 40 decades across 6 units
  const bars: SceneObject[] = []
  FORCES.forEach((f, i) => {
    const y = 2.4 - i * 1.5
    const L = Math.max(0.08, (40 + Math.log10(f.rel)) * SX)
    bars.push(line(P(X0, y), P(X0 + L, y), f.color, 0.3), label(`${f.n}: range ${f.range}`, P(X0 - 1.9, y), f.color, 'detail'))
  })
  return {
    id: 'phys-four-forces',
    title: 'The four fundamental forces',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Compare the four fundamental forces on a log scale of strength: strong ≫ electromagnetic ≫ weak ≫ gravity, with their ranges.',
    ariaLabel: 'Four bars on a logarithmic strength scale. The strong force is the longest bar, electromagnetism slightly shorter (about one hundredth), the weak force shorter still (about a millionth), and gravity by far the shortest — about 10 to the minus 38 of the strong force. Ranges are listed beside each.',
    steps: [
      { narration: 'Every interaction in nature comes from one of four forces.', objects: bars.filter((o) => o.type === 'label') },
      { narration: 'Their strengths, relative to the strong force, on a logarithmic scale (each unit of length is a factor of ten).', objects: bars.filter((o) => o.type !== 'label') },
      { narration: 'Gravity is about 10³⁸ times weaker than the strong force — it dominates only because masses add up and it has infinite range, while the strong and weak forces act only inside nuclei.', objects: [label('log scale: gravity ≈ 10⁻³⁸ × strong', P(1.2, -3.8), ROLE.result, 'primary')] },
    ],
  }
}

// ── 2. Particle classification ───────────────────────────────────────────────

/**
 * The tree, as data: every node's name, where it sits, and what it is a child of.
 * (Exported so a test can read the structure the figure DRAWS rather than the labels it prints.)
 *
 * MEASURED at 390px and 1280px: with "hadrons: made of quarks" and "leptons: fundamental"
 * (20+ characters each) only 4.8 units apart, the label solver had to push them ~100px
 * apart, and the tree came out scrambled — "leptons" printed above "particles", "hadrons"
 * below its own children. The names are now short and sit above their qualifiers, spaced so
 * that every label keeps its place under its parent at both widths.
 */
export const PARTICLE_TREE: Array<{ id: string; name: string; note?: string; at: V3; parent: string | null; step: 1 | 2 | 3 }> = [
  { id: 'particles', name: 'particles', at: P(0, 4.2), parent: null, step: 1 },
  { id: 'hadrons', name: 'hadrons', note: 'made of quarks', at: P(-3.1, 2.6), parent: 'particles', step: 1 },
  { id: 'leptons', name: 'leptons', note: 'fundamental', at: P(3.1, 2.6), parent: 'particles', step: 1 },
  { id: 'baryons', name: 'baryons', note: 'p, n', at: P(-4.5, -1.4), parent: 'hadrons', step: 2 },
  { id: 'mesons', name: 'mesons', note: 'π, K', at: P(-1.7, -1.4), parent: 'hadrons', step: 2 },
  { id: 'lepton-list', name: 'e, μ, τ, ν', at: P(3.1, -1.4), parent: 'leptons', step: 3 },
]

/** KG: "hadrons (composite particles built from quarks, subject to the strong force) or leptons (fundamental particles not subject to the strong force)." */
export function buildParticleClassificationScene(): SceneSpec {
  const node = (id: string) => PARTICLE_TREE.find((n) => n.id === id)!
  // An edge runs from just under the parent's (name + note) to just over the child's name.
  const edge = (childId: string) => {
    const child = node(childId), parent = node(child.parent!)
    const below = parent.note ? 1.95 : 0.45
    return line(P(parent.at[0], parent.at[1] - below), P(child.at[0], child.at[1] + 0.45), ROLE.aid, 0.03)
  }
  // One name per node. A branch carries its qualifier on a second line under the name; the leaves'
  // examples (p, n / π, K) live in the step narration instead of as two more labels, which keeps
  // the figure inside the explainer's nine-label budget (physicsFigureLabelBudget): past it the
  // renderer holds back the lowest-priority labels, and "particles", the root, is the first to go.
  // (Folding an example into its leaf's label — "mesons: π, K" — was measured: the two leaves are
  // then wider than the room between them and one is pushed 24-30 px off its place.)
  const nameOf = (id: string, role: string, tier: 'primary' | 'detail') => label(node(id).name, node(id).at, role, tier)
  const noteOf = (id: string, role: string) => label(node(id).note!, P(node(id).at[0], node(id).at[1] - 1.25), role, 'detail')
  return {
    id: 'phys-particle-classification',
    title: 'Classifying particles',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the basic family tree: hadrons (made of quarks, feel the strong force) split into baryons and mesons; leptons are fundamental and do not feel the strong force.',
    ariaLabel: 'A tree. Particles divide into hadrons and leptons. Hadrons divide into baryons, such as the proton and neutron, and mesons, such as the pion. Leptons include the electron, muon and neutrinos.',
    steps: [
      { narration: 'Particles fall into two big families.', objects: [nameOf('particles', ROLE.ink, 'primary'), edge('hadrons'), edge('leptons'), nameOf('hadrons', ROLE.input, 'primary'), noteOf('hadrons', ROLE.input), nameOf('leptons', ROLE.output, 'primary'), noteOf('leptons', ROLE.output)] },
      { narration: `Hadrons feel the strong force. Baryons (${node('baryons').note}) are made of three quarks; mesons (${node('mesons').note}) of a quark and an antiquark.`, objects: [edge('baryons'), edge('mesons'), nameOf('baryons', ROLE.input, 'detail'), nameOf('mesons', ROLE.input, 'detail')] },
      { narration: 'Leptons do not feel the strong force: the electron, muon, tau and their neutrinos.', objects: [edge('lepton-list'), nameOf('lepton-list', ROLE.output, 'detail'), label('strong force: hadrons only', P(0, -4.7), ROLE.result, 'primary')] },
    ],
  }
}

// ── 3. Antimatter: pair production ───────────────────────────────────────────

/** KG: "matter-antimatter pairs annihilate into energy, and sufficient energy can produce a particle-antiparticle pair." Threshold 2mₑc² = 1.022 MeV. */
export const ME_MEV = 0.511
export function buildAntimatterScene(): SceneSpec {
  const V: V3 = P(-0.6, 0)
  const arcE = circlePoints(V[0], V[1] + 1.6, 1.6, -Math.PI / 2, Math.PI * 0.35, 30)   // curls up
  const arcP = circlePoints(V[0], V[1] - 1.6, 1.6, Math.PI / 2, -Math.PI * 0.35, 30)   // curls down
  return {
    id: 'phys-antimatter',
    title: 'Antimatter: pair production',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show a gamma photon with at least 2mₑc² = 1.022 MeV turning into an electron and a positron — same mass, opposite charge, so they curve opposite ways in a magnetic field.',
    ariaLabel: 'A gamma-ray photon comes in from the left and at one point turns into two particles. In a magnetic field the electron curls one way and the positron curls the other way with the same radius: equal mass, opposite charge.',
    steps: [
      { narration: `A gamma photon with energy of at least 2mₑc² = ${r2(2 * ME_MEV)} MeV passes near a nucleus.`, objects: [wavy(P(-4.6, 0), V, ROLE.aid, 6), label(`γ: E ≥ 2mₑc² = ${r2(2 * ME_MEV)} MeV`, P(-2.6, 0.7), ROLE.aid, 'primary')] },
      { narration: 'It turns into a particle and its antiparticle: an electron and a positron.', objects: [dot(V, ROLE.result, 0.1), curve(arcE, ROLE.output), label('e⁻', P(V[0] + 1.9, V[1] + 2.0), ROLE.output, 'primary'), curve(arcP, ROLE.input), label('e⁺', P(V[0] + 1.9, V[1] - 2.0), ROLE.input, 'primary')] },
      { narration: 'Same mass, opposite charge: in a magnetic field they curve with the same radius in opposite directions. Meeting again, they would annihilate back into photons.', objects: [label('same mass, opposite charge', P(2.0, -3.8), ROLE.result, 'primary')] },
    ],
  }
}

// ── 4. Quarks ────────────────────────────────────────────────────────────────

/** KG: "carrying fractional electric charge and one of six flavors; they are never observed in isolation." */
export const QUARKS: Array<{ s: string; q: string; gen: number; up: boolean }> = [
  { s: 'u', q: '+⅔', gen: 1, up: true }, { s: 'd', q: '−⅓', gen: 1, up: false },
  { s: 'c', q: '+⅔', gen: 2, up: true }, { s: 's', q: '−⅓', gen: 2, up: false },
  { s: 't', q: '+⅔', gen: 3, up: true }, { s: 'b', q: '−⅓', gen: 3, up: false },
]
export function buildQuarksScene(): SceneSpec {
  const pos = (g: number, up: boolean): V3 => P(-3.0 + (g - 1) * 2.4, up ? 1.2 : -0.9)
  return {
    id: 'phys-quarks',
    title: 'The six quarks',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the six quark flavours in three generations: up-type (+⅔) and down-type (−⅓), always confined inside hadrons.',
    ariaLabel: 'Six quarks in a grid of three generations. The top row, up, charm and top, each have charge plus two thirds. The bottom row, down, strange and bottom, each have charge minus one third.',
    steps: [
      { narration: 'Quarks come in six flavours, arranged in three generations of two.', objects: QUARKS.map((q) => dot(pos(q.gen, q.up), q.up ? ROLE.input : ROLE.output, 0.4)) },
      { narration: 'Up, charm and top carry charge +⅔ e; down, strange and bottom carry −⅓ e.', objects: [label('u  c  t: +⅔ e', P(-0.6, 2.3), ROLE.input, 'primary'), label('d  s  b: −⅓ e', P(-0.6, -2.0), ROLE.output, 'primary'), label('generation 1 · 2 · 3', P(-0.6, 3.4), ROLE.ink, 'detail')] },
      { narration: 'Quarks are never seen alone: they are always confined in hadrons whose total charge is a whole number.', objects: [label('confined in hadrons', P(0, -3.4), ROLE.result, 'primary')] },
    ],
  }
}

// ── 5. Leptons ───────────────────────────────────────────────────────────────

/** KG: "the electron, muon, and tau each form a generation together with a corresponding neutrino." Masses in MeV/c². */
export const LEPTON_MASS = { e: 0.511, mu: 105.7, tau: 1776.9 }
export function buildLeptonsScene(): SceneSpec {
  const x = [-3.0, -0.2, 2.6]
  const bars = [LEPTON_MASS.e, LEPTON_MASS.mu, LEPTON_MASS.tau].map((m, i) => line(P(x[i] - 0.6, -2.6), P(x[i] - 0.6, -2.6 + Math.log10(m * 10) * 0.9), ROLE.output, 0.2))
  return {
    id: 'phys-leptons',
    title: 'The leptons',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the three generations of leptons — electron, muon, tau (charge −1) each paired with a neutrino (charge 0) — with their very different masses; none feel the strong force.',
    ariaLabel: 'Three columns for the three generations. Each has a charged lepton — electron, muon, tau — with charge minus one, and a neutral neutrino. Bars on a log scale show the masses: 0.511, 105.7 and 1777 MeV.',
    steps: [
      { narration: 'Three charged leptons, each with charge −1: the electron, the muon and the tau.', objects: [label(`e: ${LEPTON_MASS.e} MeV`, P(x[0], 2.0), ROLE.output, 'detail'), label(`μ: ${LEPTON_MASS.mu} MeV`, P(x[1], 2.0), ROLE.output, 'detail'), label(`τ: ${LEPTON_MASS.tau} MeV`, P(x[2], 2.0), ROLE.output, 'detail'), ...bars] },
      { narration: 'Each is paired with its own neutral, almost massless neutrino.', objects: [label('νₑ   ν_μ   ν_τ: charge 0', P(0, 3.2), ROLE.aid, 'primary')] },
      { narration: 'Masses on a log scale: each generation is much heavier than the last. Leptons never feel the strong force.', objects: [label('no strong force', P(0, -3.4), ROLE.result, 'primary')] },
    ],
  }
}

// ── 6. Neutrinos: the beta spectrum ──────────────────────────────────────────

/**
 * KG: "nearly massless leptons that interact only via the weak force." Beta
 * decay n → p + e⁻ + ν̄: the electron's energy is a CONTINUOUS spectrum up to
 * Q = 0.782 MeV (allowed shape ∝ p E (Q − T)²) — the missing energy is carried
 * off by the neutrino, which is why Pauli proposed it.
 */
export const BETA_Q = 0.782
export function betaSpectrum(T: number): number {
  if (T <= 0 || T >= BETA_Q) return 0
  const E = T + 0.511, p = Math.sqrt(E * E - 0.511 * 0.511)
  return p * E * (BETA_Q - T) ** 2
}
export function buildNeutrinoScene(): SceneSpec {
  const X0 = -3.8, Y0 = -2.4, SX = 8.0 / 0.85, H = 4.4
  let peak = 0
  for (let t = 0; t < BETA_Q; t += 0.001) peak = Math.max(peak, betaSpectrum(t))
  const x = (t: number) => X0 + t * SX
  return {
    id: 'phys-neutrinos',
    title: 'Neutrinos and the beta spectrum',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show that in beta decay the electron comes out with any energy up to Q, not always Q: the missing energy is carried by an almost undetectable neutrino.',
    ariaLabel: 'A graph of the number of electrons against their kinetic energy in neutron beta decay. It is a broad hump from zero up to 0.782 MeV, not a single sharp line. The energy the electron does not carry goes to an antineutrino.',
    steps: [
      { narration: 'A free neutron decays: n → p + e⁻ + … . Measure the energy of the electrons that come out.', objects: [arrow(P(X0, Y0), P(x(0.85) + 0.2, Y0), ROLE.reference), arrow(P(X0, Y0), P(X0, Y0 + H + 0.6), ROLE.reference), label('electron energy (MeV)', P(1.6, Y0 - 0.5), ROLE.ink, 'detail'), label('number', P(X0 + 0.7, Y0 + H + 0.9), ROLE.ink, 'detail')] },
      { narration: `If only two particles were produced, every electron would have the same energy, Q = ${BETA_Q} MeV. Instead they have every energy from 0 up to Q.`, objects: [curve(fnPath((xx) => Y0 + (H * betaSpectrum((xx - X0) / SX)) / peak, X0, x(BETA_Q), 120), ROLE.output), line(P(x(BETA_Q), Y0), P(x(BETA_Q), Y0 + H), ROLE.input, 0.03), label(`Q = ${BETA_Q} MeV`, P(x(BETA_Q), Y0 + H + 0.4), ROLE.input, 'primary')] },
      { narration: 'The missing energy is carried off by a third particle that interacts only through the weak force: the (anti)neutrino. It passes through the Earth almost untouched.', objects: [label('missing energy → ν̄', P(0.8, 1.2), ROLE.result, 'primary')] },
    ],
  }
}

// ── 7. The quark model of hadrons ────────────────────────────────────────────

/** KG: "Baryons are composed of three quarks and mesons of a quark-antiquark pair; the quark model predicts the charge." */
export const QCHARGE: Record<string, number> = { u: 2 / 3, d: -1 / 3, 'd̄': 1 / 3, 'ū': -2 / 3 }
export const HADRONS: Array<{ n: string; q: string[] }> = [{ n: 'proton', q: ['u', 'u', 'd'] }, { n: 'neutron', q: ['u', 'd', 'd'] }, { n: 'π⁺', q: ['u', 'd̄'] }]
export function hadronCharge(q: string[]): number { return Math.round(q.reduce((t, x) => t + QCHARGE[x], 0) * 1000) / 1000 }
export function buildHadronQuarkScene(): SceneSpec {
  const cx = [-3.0, 0, 3.0]
  const objs: SceneObject[] = []
  const labels: SceneObject[] = []
  HADRONS.forEach((h, i) => {
    objs.push(curve(circlePoints(cx[i], 0.4, 1.1, 0, 2 * Math.PI, 40), ROLE.reference))
    h.q.forEach((q, k) => { const a = Math.PI / 2 + (k * 2 * Math.PI) / h.q.length; objs.push(dot(P(cx[i] + 0.5 * Math.cos(a), 0.4 + 0.5 * Math.sin(a)), q.startsWith('u') ? ROLE.input : ROLE.output, 0.2)) })
    const c = hadronCharge(h.q)
    labels.push(label(`${h.n} = ${h.q.join('')}: ${c > 0 ? '+' : ''}${c}`, P(cx[i], -1.3), ROLE.ink, 'detail'))
  })
  return {
    id: 'phys-hadron-quarks',
    title: 'Hadrons from quarks',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show hadrons as quark combinations whose charges add to whole numbers: proton uud (+1), neutron udd (0), and the meson π⁺ = u d̄ (+1).',
    ariaLabel: 'Three circles containing quarks. The proton holds two up quarks and one down: total charge plus one. The neutron holds one up and two down: charge zero. The positive pion holds an up quark and an anti-down quark: charge plus one.',
    steps: [
      { narration: 'Baryons are three quarks; mesons are a quark and an antiquark. Red: up (+⅔); blue: down (−⅓) or anti-down (+⅓).', objects: objs },
      { narration: 'Add the charges: uud = ⅔ + ⅔ − ⅓ = +1 (proton); udd = ⅔ − ⅓ − ⅓ = 0 (neutron); u d̄ = ⅔ + ⅓ = +1 (π⁺).', objects: labels },
      { narration: 'The quark model predicts every hadron\'s charge — always a whole number, even though quarks carry thirds.', objects: [label('baryons: qqq · mesons: q q̄', P(0, 2.6), ROLE.result, 'primary')] },
    ],
  }
}

// ── 8. Gauge bosons ──────────────────────────────────────────────────────────

/** KG: "Each fundamental force is mediated by an exchange particle." Masses GeV/c². */
export const BOSONS: Array<{ force: string; b: string; mass: string; color: string }> = [
  { force: 'electromagnetism', b: 'photon γ', mass: '0', color: ROLE.output },
  { force: 'strong', b: 'gluon g', mass: '0', color: ROLE.input },
  { force: 'weak', b: 'W±, Z', mass: '80.4, 91.2 GeV', color: ROLE.aid },
]
export function buildGaugeBosonsScene(): SceneSpec {
  const rows: SceneObject[] = []
  BOSONS.forEach((b, i) => {
    const y = 2.4 - i * 2.2
    rows.push(dot(P(-1.8, y), ROLE.reference, 0.18), dot(P(1.8, y), ROLE.reference, 0.18), wavy(P(-1.6, y), P(1.6, y), b.color, 5, 0.18))
    rows.push(label(`${b.force}: ${b.b}, m = ${b.mass}`, P(0, y + 0.75), b.color, 'detail'))
  })
  return {
    id: 'phys-gauge-bosons',
    title: 'Force carriers',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show each force acting by exchanging a boson: photons for electromagnetism, gluons for the strong force, W and Z for the weak force (massive, hence short-ranged).',
    ariaLabel: 'Three rows, each showing two particles exchanging a wavy force carrier. Electromagnetism exchanges a massless photon; the strong force exchanges massless gluons; the weak force exchanges W and Z bosons of about 80 and 91 GeV.',
    steps: [
      { narration: 'In particle physics a force is an exchange: two particles swap a force-carrying boson.', objects: rows.filter((o) => o.type !== 'label') },
      { narration: 'Photons carry electromagnetism, gluons the strong force, W and Z bosons the weak force.', objects: rows.filter((o) => o.type === 'label') },
      { narration: 'The W and Z are very heavy, which is why the weak force has such a short range. Gravity\'s carrier, the graviton, has never been observed.', objects: [label('heavy carrier → short range', P(0, -3.8), ROLE.result, 'primary')] },
    ],
  }
}

// ── 9. The strong interaction: confinement ───────────────────────────────────

/** KG: "confinement means the force grows with separation." Quark–antiquark potential V(r) = −a/r + kr (Cornell). */
export function cornell(r: number): number { return -0.4 / r + 0.9 * r }
export function buildStrongInteractionScene(): SceneSpec {
  const X0 = -3.8, Y0 = -1.0, SX = 2.0, SY = 1.0
  return {
    id: 'phys-strong-interaction',
    title: 'The strong force and confinement',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the quark–antiquark potential V = −a/r + kr: unlike gravity or electricity it keeps rising with distance, so pulling quarks apart only creates new quark pairs — free quarks are never seen.',
    ariaLabel: 'A graph of the potential energy between a quark and an antiquark against their separation. Close together it dips, but then it rises in a straight line forever. Below, a stretched gluon string between two quarks snaps into two quark pairs.',
    steps: [
      { narration: 'The potential energy between a quark and an antiquark, against their separation.', objects: [arrow(P(X0, Y0), P(X0 + 3.6 * SX / 2 + 2.2, Y0), ROLE.reference), line(P(X0, Y0 - 1.6), P(X0, 4.2), ROLE.reference, 0.04), label('separation r', P(1.6, Y0 - 0.5), ROLE.ink, 'detail'), label('energy V', P(X0 + 0.8, 4.4), ROLE.ink, 'detail'), curve(fnPath((x) => Y0 + SY * cornell((x - X0) / SX), X0 + 0.35, X0 + 4.0 * SX, 120), ROLE.input)] },
      { narration: 'At large separation it rises in a straight line: the force (its slope) stays constant however far apart they are. The field between them forms a string of gluons.', objects: [label('V = −a/r + kr', P(1.8, 3.0), ROLE.result, 'primary')] },
      { narration: 'Pull hard enough and the string snaps — but the energy makes a new quark–antiquark pair. You get two mesons, never a lone quark.', objects: [dot(P(-3.0, -3.4), ROLE.input, 0.16), line(P(-2.8, -3.4), P(-1.6, -3.4), ROLE.aid, 0.05), dot(P(-1.4, -3.4), ROLE.output, 0.16), dot(P(0.4, -3.4), ROLE.input, 0.16), line(P(0.6, -3.4), P(1.4, -3.4), ROLE.aid, 0.05), dot(P(1.6, -3.4), ROLE.output, 0.16), label('string snaps → new pair', P(2.6, -2.7), ROLE.aid, 'detail')] },
    ],
  }
}

// ── 10. The weak interaction: beta decay at the quark level ──────────────────

/** KG: "beta decay is a weak-interaction process in which a down quark converts to an up quark." d → u + W⁻, W⁻ → e⁻ + ν̄ₑ. Charges balance at every vertex. */
export const WEAK_VERTEX = { d: -1 / 3, u: 2 / 3, W: -1, e: -1, nubar: 0 }
export function buildWeakInteractionScene(): SceneSpec {
  const v1: V3 = P(-0.6, 0), v2: V3 = P(1.8, 1.4)
  return {
    id: 'phys-weak-interaction',
    title: 'The weak interaction: beta decay',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show beta decay at the quark level: a down quark turns into an up quark by emitting a W⁻ boson, which decays into an electron and an antineutrino — changing a neutron (udd) into a proton (uud).',
    ariaLabel: 'A Feynman diagram with time running upward. A down quark comes in from below and leaves as an up quark. At that point a wavy W minus boson is emitted to the right, and it splits into an electron and an electron antineutrino.',
    steps: [
      { narration: 'Inside a neutron (udd), one down quark changes into an up quark. Time runs upward.', objects: [arrow(P(-0.6, -3.4), v1, ROLE.output), label('d (−⅓)', P(-1.5, -2.4), ROLE.output, 'primary'), arrow(v1, P(-0.6, 3.4), ROLE.input), label('u (+⅔)', P(-1.5, 2.4), ROLE.input, 'primary'), arrow(P(-4.4, -3.4), P(-4.4, 3.4), ROLE.reference), label('time', P(-4.0, 3.8), ROLE.ink, 'detail')] },
      { narration: 'It does so by emitting a W⁻ boson — the weak force\'s carrier. Charge balances: −⅓ = +⅔ + (−1).', objects: [dot(v1, ROLE.aid, 0.1), wavy(v1, v2, ROLE.aid, 4), label('W⁻', P(0.4, 1.3), ROLE.aid, 'primary'), label('charge: −⅓ = +⅔ − 1', P(2.2, -1.2), ROLE.result, 'detail')] },
      { narration: 'The W⁻ immediately decays into an electron and an electron antineutrino. The neutron has become a proton: n → p + e⁻ + ν̄ₑ.', objects: [arrow(v2, P(3.6, 3.4), ROLE.result), label('e⁻', P(3.9, 3.0), ROLE.result, 'primary'), arrow(v2, P(4.2, 1.0), ROLE.reference), label('ν̄ₑ', P(4.3, 0.5), ROLE.reference, 'primary')] },
    ],
  }
}

// ── 11. Electroweak unification ──────────────────────────────────────────────

/**
 * KG: "At sufficiently high energy, the electromagnetic and weak interactions
 * merge." The weak interaction's effective strength grows as (E/M_W)² until,
 * near M_W ≈ 80 GeV, it matches electromagnetism's (log–log sketch).
 */
export const M_W = 80.4
export function weakEffective(eGeV: number): number { return Math.min(1, (eGeV / M_W) ** 2) }
export function buildElectroweakScene(): SceneSpec {
  const X0 = -4.0, Y0 = -2.6, SX = 1.6, SY = 0.9 // x: log10(E / GeV) from −2 to 3
  const x = (lg: number) => X0 + (lg + 2) * SX
  const y = (lgS: number) => Y0 + (lgS + 6) * SY
  const lgMw = Math.log10(M_W)
  return {
    id: 'phys-electroweak',
    title: 'Electroweak unification',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the weak interaction\'s effective strength rising with collision energy until, near the W mass (~80 GeV), it matches electromagnetism: above that the two are one electroweak force.',
    ariaLabel: 'A log–log graph of effective interaction strength against energy. Electromagnetism is a flat line. The weak interaction starts far below and rises steeply, meeting the electromagnetic line at about 80 GeV, the W boson mass; beyond it they coincide.',
    steps: [
      { narration: 'Effective strength of each interaction against collision energy (both axes logarithmic).', objects: [arrow(P(X0, Y0), P(x(3) + 0.2, Y0), ROLE.reference), arrow(P(X0, Y0), P(X0, y(0.6)), ROLE.reference), label('energy (GeV, log)', P(2.4, Y0 - 0.5), ROLE.ink, 'detail'), label('strength (log)', P(X0 + 1.0, y(0.6) + 0.4), ROLE.ink, 'detail'), line(P(X0, y(0)), P(x(3), y(0)), ROLE.output, 0.05), label('electromagnetic', P(x(-1), y(0) + 0.45), ROLE.output, 'primary')] },
      { narration: 'At everyday energies the weak interaction is feeble — but its strength grows as (E/M_W)².', objects: [// Start where the weak strength enters the plotted range (10⁻⁶), not below the axis.
        curve(fnPath((xx) => y(Math.log10(weakEffective(10 ** ((xx - X0) / SX - 2)))), x(lgMw - 3), x(3), 100), ROLE.aid), label('weak', P(x(0.2), y(Math.log10(weakEffective(10 ** 0.2))) - 0.5), ROLE.aid, 'primary')] },
      { narration: `Near the W mass, about ${Math.round(M_W)} GeV, the two become equally strong: above it they are a single electroweak interaction.`, objects: [line(P(x(lgMw), Y0), P(x(lgMw), y(0)), ROLE.result, 0.03), label(`unify ≈ ${Math.round(M_W)} GeV`, P(x(lgMw), y(0) + 1.0), ROLE.result, 'primary')] },
    ],
  }
}

// ── 12. The Higgs mechanism ──────────────────────────────────────────────────

/**
 * KG: "explains why the W and Z bosons and the fundamental fermions are
 * massive while the photon and gluon are massless, via interaction with the
 * Higgs field." V(φ) = −μ²φ² + λφ⁴: the minimum sits at φ = v ≠ 0.
 */
export function higgsV(phi: number): number { return -1.6 * phi * phi + 0.5 * phi ** 4 }
export function higgsVev(): number { return r2(Math.sqrt(1.6 / (2 * 0.5))) }
export function buildHiggsScene(): SceneSpec {
  const SX = 1.4, SY = 1.0, Y0 = 0.6
  const v = higgsVev()
  return {
    id: 'phys-higgs',
    title: 'The Higgs mechanism',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the Higgs potential V = −μ²φ² + λφ⁴, whose lowest energy is NOT at zero field: the universe settles at φ = v, and particles that couple to this field gain mass in proportion to how strongly they couple.',
    ariaLabel: 'A curve shaped like a W, the Higgs potential: a hump at zero field and two dips at plus and minus v. A ball rests in one of the dips: the field has a non-zero value everywhere. Particles that interact with it — W, Z, top quark — are heavy; the photon and gluon do not interact and are massless.',
    steps: [
      { narration: 'The Higgs field\'s energy against its value: V = −μ²φ² + λφ⁴. The hump means zero field is NOT the lowest-energy state.', objects: [line(P(-4.2, Y0), P(4.2, Y0), ROLE.reference, 0.02), curve(fnPath((x) => Y0 + SY * higgsV(x / SX), -2.1 * SX, 2.1 * SX, 140), ROLE.output), label('V(φ) = −μ²φ² + λφ⁴', P(0, 3.6), ROLE.output, 'primary')] },
      { narration: `So the field settles in a dip, at φ = v ≠ 0, everywhere in the universe.`, objects: [dot(P(v * SX, Y0 + SY * higgsV(v) + 0.25), ROLE.result, 0.25), label('vacuum: φ = v ≠ 0', P(v * SX + 0.4, Y0 + SY * higgsV(v) - 0.6), ROLE.result, 'primary')] },
      { narration: 'Particles that interact with this ever-present field gain mass — the stronger the coupling, the heavier (W, Z, top quark). The photon and gluon do not couple: they stay massless.', objects: [label('strong coupling → heavy: W, Z, t', P(-1.6, -2.8), ROLE.input, 'detail'), label('no coupling → massless: γ, g', P(-1.6, -3.6), ROLE.aid, 'detail')] },
    ],
  }
}

// ── 13. Conservation laws in particle reactions ──────────────────────────────

/** KG: "Baryon number and lepton number are conserved in every known particle interaction." B and L tallied for an allowed and a forbidden reaction. */
export const BL: Record<string, [number, number]> = { n: [1, 0], p: [1, 0], 'e⁻': [0, 1], 'e⁺': [0, -1], 'ν̄ₑ': [0, -1], γ: [0, 0] }
export function tally(side: string[]): [number, number] { return side.reduce((t, x) => [t[0] + BL[x][0], t[1] + BL[x][1]], [0, 0] as [number, number]) }
export function buildParticleConservationScene(): SceneSpec {
  const allowed = { l: ['n'], r: ['p', 'e⁻', 'ν̄ₑ'] }, forbidden = { l: ['p'], r: ['e⁺', 'γ'] }
  const [aL, aR, fL, fR] = [tally(allowed.l), tally(allowed.r), tally(forbidden.l), tally(forbidden.r)]
  return {
    id: 'phys-particle-conservation',
    title: 'Baryon and lepton number',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show how to test a reaction: add up baryon number B and lepton number L on each side. Neutron decay balances both; the proposed decay p → e⁺ + γ breaks B, so it never happens, however much energy is available.',
    ariaLabel: 'Two reactions with their baryon and lepton numbers tallied. Neutron decay into a proton, electron and antineutrino: B is 1 on both sides and L is 0 on both sides, so it is allowed. Proton decay into a positron and a photon: B goes from 1 to 0, so it is forbidden.',
    steps: [
      { narration: 'Neutron decay: n → p + e⁻ + ν̄ₑ. Count baryon number B and lepton number L on each side.', objects: [label('n → p + e⁻ + ν̄ₑ', P(-1.4, 2.4), ROLE.ink, 'primary'), label(`B: ${aL[0]} = ${aR[0]} ✓   L: ${aL[1]} = ${aR[1]} ✓`, P(-1.4, 1.4), ROLE.result, 'detail'), label('allowed', P(3.2, 2.4), ROLE.result, 'primary')] },
      { narration: 'A proposed proton decay: p → e⁺ + γ. Count again.', objects: [label('p → e⁺ + γ', P(-1.4, -0.8), ROLE.ink, 'primary'), label(`B: ${fL[0]} ≠ ${fR[0]} ✗   L: ${fL[1]} ≠ ${fR[1]} ✗`, P(-1.4, -1.8), ROLE.input, 'detail'), label('forbidden', P(3.2, -0.8), ROLE.input, 'primary')] },
      { narration: 'A reaction that changes B or L never happens, however much energy is available. (No proton decay has ever been seen.)', objects: [label('B and L conserved', P(0, -3.4), ROLE.result, 'primary')] },
    ],
  }
}

// ── 14. Feynman diagrams ─────────────────────────────────────────────────────

/** KG: "vertices where incoming and outgoing particle lines meet an exchanged force-carrier line." Electron–electron scattering by photon exchange. */
export function buildFeynmanScene(): SceneSpec {
  const vL: V3 = P(-1.4, 0), vR: V3 = P(1.4, 0)
  return {
    id: 'phys-feynman',
    title: 'Reading a Feynman diagram',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show how to read a Feynman diagram: time runs up; two electrons come in, exchange a virtual photon between two vertices, and leave deflected.',
    ariaLabel: 'A Feynman diagram with time running upward. Two electron lines come in from the bottom, one on each side. Each meets a vertex, where a wavy photon line joins the two vertices. From each vertex an electron line leaves toward the top, deflected.',
    steps: [
      { narration: 'Time runs upward. Two electrons approach from below.', objects: [arrow(P(-4.4, -3.4), P(-4.4, 3.4), ROLE.reference), label('time', P(-4.0, 3.8), ROLE.ink, 'detail'), arrow(P(-2.8, -3.0), vL, ROLE.output), arrow(P(2.8, -3.0), vR, ROLE.output), label('e⁻ in', P(-2.9, -3.5), ROLE.output, 'detail')] },
      { narration: 'At each vertex an electron line meets a photon line: the electrons exchange a virtual photon. That exchange is the electromagnetic force.', objects: [dot(vL, ROLE.result, 0.1), dot(vR, ROLE.result, 0.1), wavy(vL, vR, ROLE.aid, 5), label('γ', P(0, 0.6), ROLE.aid, 'primary'), label('vertex', P(-1.4, -0.6), ROLE.result, 'detail')] },
      { narration: 'Both electrons leave deflected — they repelled. Charge is conserved at every vertex.', objects: [arrow(vL, P(-3.0, 3.0), ROLE.output), arrow(vR, P(3.0, 3.0), ROLE.output), label('e⁻ out', P(-3.0, 3.5), ROLE.output, 'detail')] },
    ],
  }
}

// ── 15. Accelerators and detectors ───────────────────────────────────────────

/**
 * KG: "applying conservation of energy and momentum to the detected collision
 * products reveals the mass … of new particles." Two photons of 62.5 GeV,
 * back-to-back: invariant mass m = √(2E₁E₂(1 − cos θ)) = 125 GeV (the Higgs).
 */
// 63.5 GeV each at 160°: m = 2E sin(80°) ≈ 125 GeV, the Higgs mass.
export const PHOTON_E = [63.5, 63.5]
export function invariantMass(e1: number, e2: number, thetaDeg: number): number { return r2(Math.sqrt(2 * e1 * e2 * (1 - Math.cos((thetaDeg * Math.PI) / 180)))) }
export function buildAcceleratorScene(): SceneSpec {
  const th = 160 // opening angle between the photons
  const a1 = Math.PI / 2 - ((180 - th) * Math.PI) / 360 + 0.2, a2 = a1 + (th * Math.PI) / 180
  return {
    id: 'phys-accelerator',
    title: 'Finding a particle in a collider',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show two beams colliding in a detector, and how the energies and directions of the products give the mass of the particle that briefly existed: m = √(2E₁E₂(1 − cos θ)).',
    ariaLabel: 'Two proton beams enter from left and right and collide at the centre of a detector drawn as rings. Two photon tracks fly out in nearly opposite directions, each with about 62.5 GeV. Combining their energies and the angle between them gives a mass of about 125 GeV.',
    steps: [
      { narration: 'Two beams of protons, accelerated to nearly the speed of light, collide at the centre of a detector.', objects: [curve(circlePoints(0, 0, 1.6, 0, 2 * Math.PI, 48), ROLE.reference), curve(circlePoints(0, 0, 3.0, 0, 2 * Math.PI, 64), ROLE.reference), arrow(P(-4.8, 0), P(-0.3, 0), ROLE.input), arrow(P(4.8, 0), P(0.3, 0), ROLE.input), label('beams', P(-3.8, 0.45), ROLE.input, 'detail')] },
      { narration: `A short-lived particle forms and decays into two photons, which the detector records: each about ${PHOTON_E[0]} GeV, ${th}° apart.`, objects: [wavy(P(0, 0), P(3.0 * Math.cos(a1), 3.0 * Math.sin(a1)), ROLE.aid, 6), wavy(P(0, 0), P(3.0 * Math.cos(a2), 3.0 * Math.sin(a2)), ROLE.aid, 6), label(`γ: ${PHOTON_E[0]} GeV`, P(3.4 * Math.cos(a1) + 0.6, 3.4 * Math.sin(a1)), ROLE.aid, 'detail'), label(`γ: ${PHOTON_E[1]} GeV`, P(3.4 * Math.cos(a2) - 0.6, 3.4 * Math.sin(a2)), ROLE.aid, 'detail')] },
      { narration: `Energy and momentum conservation give the parent's mass: m = √(2E₁E₂(1 − cos θ)) = ${invariantMass(PHOTON_E[0], PHOTON_E[1], th)} GeV — the Higgs boson's mass.`, objects: [label(`m = √(2E₁E₂(1 − cos θ)) = ${invariantMass(PHOTON_E[0], PHOTON_E[1], th)} GeV`, P(0, -3.9), ROLE.result, 'primary')] },
    ],
  }
}

// ── 16. The Standard Model ───────────────────────────────────────────────────

/** KG: "organizes all known quarks, leptons, gauge bosons, and the Higgs boson into a single framework." */
export const SM_ROWS: Array<{ t: string; color: string }> = [
  { t: 'u   c   t', color: ROLE.input }, { t: 'd   s   b', color: ROLE.input },
  { t: 'e   μ   τ', color: ROLE.output }, { t: 'νₑ  ν_μ  ν_τ', color: ROLE.output },
]
export function buildStandardModelScene(): SceneSpec {
  // Group outlines only, drawn well clear of the text: MEASURED elsewhere in the
  // campaign, a label inside a small box is pushed off the box's edges.
  const cells: SceneObject[] = [...rect(-4.6, 0.5, -0.8, 3.3, ROLE.input), ...rect(-4.6, -2.8, -0.8, 0.0, ROLE.output)]
  return {
    id: 'phys-standard-model',
    title: 'The Standard Model',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show the Standard Model\'s particles: six quarks and six leptons in three generations, the force-carrying gauge bosons, and the Higgs boson.',
    ariaLabel: 'A table of the Standard Model. Three columns of generations hold the quarks (up, charm, top; down, strange, bottom) and the leptons (electron, muon, tau and their neutrinos). To the right, the gauge bosons (gluon, photon, Z and W) and the Higgs boson.',
    steps: [
      { narration: 'Matter particles (fermions): quarks and leptons, in three generations.', objects: [...cells, ...SM_ROWS.map((r, j) => label(r.t, P(-2.7, 2.4 - j * 1.45 - (j > 1 ? 0.6 : 0)), r.color, 'detail')), label('quarks', P(-2.7, 3.6), ROLE.input, 'primary'), label('leptons', P(-2.7, -3.3), ROLE.output, 'primary')] },
      { narration: 'Force carriers (gauge bosons): gluons, photons, Z and W.', objects: [label('g  γ  Z  W', P(1.4, 0.9), ROLE.aid, 'detail'), label('bosons', P(1.4, 3.6), ROLE.aid, 'primary')] },
      { narration: 'And the Higgs boson, whose field gives particles their mass. Everything we know of, except gravity, fits in this table.', objects: [label('H', P(3.7, 0.9), ROLE.result, 'primary')] },
    ],
  }
}
