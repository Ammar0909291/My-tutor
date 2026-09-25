/**
 * THE LAUNCH SET — the topics real learners will meet first.
 *
 * Owner decision, 2026-09-24: no school boards; launch with physics
 * mechanics; until the product is good enough for real learners, synthetic
 * students on this set stand in for real traffic
 * (docs/architecture/ARCHITECTURE_ROADMAP_TO_10.md §0, items 0.7 / 0.8).
 *
 * 26 topics from `docs/physics/kg/graph.json`, the foundational → proficient
 * core of `phys.mech.*`, in prerequisite order: every in-domain prerequisite
 * of a topic appears earlier in this list (pinned by a test). The advanced
 * rotation / gravitation / fluids / analytical-mechanics branches are left
 * out on purpose — they are not where a first learner starts.
 *
 * Prerequisites outside mechanics that the path assumes are already known:
 * phys.meas.units, phys.meas.scalars-vectors, phys.meas.vector-addition,
 * phys.meas.vector-products.
 */
export const PHYSICS_MECHANICS_LAUNCH_SET: readonly string[] = [
  'phys.mech.displacement',
  'phys.mech.velocity',
  'phys.mech.acceleration',
  'phys.mech.kinematics-1d',
  'phys.mech.force',
  'phys.mech.newtons-first-law',
  'phys.mech.newtons-second-law',
  'phys.mech.newtons-third-law',
  'phys.mech.free-body-diagram',
  'phys.mech.normal-force',
  'phys.mech.tension',
  'phys.mech.friction',
  'phys.mech.inclined-plane',
  'phys.mech.kinematics-2d',
  'phys.mech.projectile-motion',
  'phys.mech.circular-motion',
  'phys.mech.work',
  'phys.mech.kinetic-energy',
  'phys.mech.potential-energy',
  'phys.mech.work-energy-theorem',
  'phys.mech.conservation-of-energy',
  'phys.mech.power',
  'phys.mech.momentum',
  'phys.mech.impulse',
  'phys.mech.conservation-of-momentum',
  'phys.mech.collisions-elastic',
]

export const LAUNCH_SUBJECT = 'physics'
