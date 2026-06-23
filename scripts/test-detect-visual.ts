/**
 * Standalone test harness for detectVisual() — src/lib/school/visuals/detectVisual.ts.
 * Pure keyword matching, no DB/network. Run with:  npx tsx scripts/test-detect-visual.ts
 *
 * Covers:
 *   1. Subject-slug gate: unsupported subjects → null regardless of keywords.
 *   2. 3D-rule priority: the 3D rule set is checked FIRST for physics/chemistry/
 *      mathematics/quantum_physics/computer_science, so explicit 3D-specific text
 *      wins over the 2D fallback.
 *   3. 2D fallback: text that matches only the 2D rules (no 3D cue) still lands
 *      on the correct 2D visual under the right subject.
 *   4. Cross-subject isolation: a keyword that fires under one subject does NOT
 *      fire under a different subject where its rule set is absent.
 *   5. null path: matched-subject but no keyword → null.
 */

import { detectVisual } from '../src/lib/school/visuals/detectVisual'

let pass = 0
let fail = 0
function check(name: string, cond: boolean, extra?: string) {
  if (cond) pass++
  else fail++
  console.log(`[${cond ? '✓ pass' : '✗ FAIL'}] ${name}${extra && !cond ? `  — ${extra}` : ''}`)
}

console.log('\n=== detectVisual() deterministic harness ===\n')

// ── 1. Subject-slug gate ──────────────────────────────────────────────────────
// Subjects with no visual support must return null even when the chapter title
// contains a keyword that would match if the subject were supported.
check('unsupported subject "history" → null (even with "fraction" keyword)',
  detectVisual({ subjectSlug: 'history', chapterTitle: 'Fraction of the population in 1857' }) === null)
check('unsupported subject "english" → null (even with "graph" keyword)',
  detectVisual({ subjectSlug: 'english', chapterTitle: 'Graph of themes across poems' }) === null)
check('empty subjectSlug → null',
  detectVisual({ subjectSlug: '', chapterTitle: 'Electric circuit' }) === null)

// ── 2. mathematics: 3D rule fires first when keyword is explicit ──────────────
check('mathematics + "vector components" → three_vector_visualization (3D rule, not 2D)',
  detectVisual({ subjectSlug: 'mathematics', chapterTitle: 'Vector components and direction' }) === 'three_vector_visualization')
check('mathematics + "coordinate system" → three_coordinate_system (3D)',
  detectVisual({ subjectSlug: 'mathematics', chapterTitle: '3D coordinate system and xyz axes' }) === 'three_coordinate_system')
check('mathematics + "geometric solids" → three_geometric_solids, not 2D geometry (priority guard)',
  detectVisual({ subjectSlug: 'mathematics', chapterTitle: 'Geometric solids and volume and surface area' }) === 'three_geometric_solids')

// ── 3. mathematics: 2D fallback fires when no 3D keyword present ─────────────
check('mathematics + "fraction" → fraction_bar (2D fallback, no 3D keyword)',
  detectVisual({ subjectSlug: 'mathematics', chapterTitle: 'Fractions and numerator denominator' }) === 'fraction_bar')
check('mathematics + "number line" → number_line (2D fallback)',
  detectVisual({ subjectSlug: 'mathematics', chapterTitle: 'Integers on the number line' }) === 'number_line')
check('mathematics + "triangle" → geometry_shape (2D fallback)',
  detectVisual({ subjectSlug: 'mathematics', chapterTitle: 'Triangle and polygon geometry' }) === 'geometry_shape')
check('mathematics + no keyword → null',
  detectVisual({ subjectSlug: 'mathematics', chapterTitle: 'Introduction to sets' }) === null)

// ── 4. physics: 3D mechanics rules ───────────────────────────────────────────
check('physics + "projectile motion" → three_projectile_motion (3D wins)',
  detectVisual({ subjectSlug: 'physics', chapterTitle: 'Projectile motion and launch angle' }) === 'three_projectile_motion')
check('physics + "pendulum" → three_pendulum_motion (3D)',
  detectVisual({ subjectSlug: 'physics', chapterTitle: 'Simple pendulum and oscillation' }) === 'three_pendulum_motion')
check('physics + "collision" → three_momentum_collision (3D)',
  detectVisual({ subjectSlug: 'physics', chapterTitle: 'Elastic collision and conservation of momentum' }) === 'three_momentum_collision')

// ── 5. physics: 2D SCIENCE_RULES fallback ────────────────────────────────────
check('physics + "electric circuit" → circuit_diagram (2D fallback — no 3D mechanics match)',
  detectVisual({ subjectSlug: 'physics', chapterTitle: 'Electric circuit and resistance' }) === 'circuit_diagram')
check('physics + "force" / "motion" (no 3D cue) → force_diagram via SCIENCE_RULES fallback',
  detectVisual({ subjectSlug: 'physics', chapterTitle: 'Forces and motion' }) === 'force_diagram')

// ── 6. chemistry: 3D chemistry rules ─────────────────────────────────────────
check('chemistry + "molecular shape" → three_molecular_shapes (3D)',
  detectVisual({ subjectSlug: 'chemistry', chapterTitle: 'Molecular geometry and bond angle' }) === 'three_molecular_shapes')
check('chemistry + "crystal lattice" → three_crystal_lattice (3D)',
  detectVisual({ subjectSlug: 'chemistry', chapterTitle: 'Crystal lattice and unit cell structure' }) === 'three_crystal_lattice')
check('chemistry + "electron shell" → three_electron_shells (3D)',
  detectVisual({ subjectSlug: 'chemistry', chapterTitle: 'Electron shells and shell configuration' }) === 'three_electron_shells')

// ── 7. chemistry: 2D SCIENCE_RULES fallback ──────────────────────────────────
check('chemistry + "food chain" → food_chain (2D fallback — no chemistry 3D match)',
  detectVisual({ subjectSlug: 'chemistry', chapterTitle: 'Energy flow in a food chain' }) === 'food_chain')

// ── 8. quantum_physics: QUANTUM_3D_RULES checked first ───────────────────────
check('quantum_physics + "3d orbital" → three_hydrogen_orbital (3D wins over 2D wave_function)',
  detectVisual({ subjectSlug: 'quantum_physics', chapterTitle: '3d hydrogen orbital shapes in 3d' }) === 'three_hydrogen_orbital')

// ── 9. quantum_physics: 2D QUANTUM_RULES fallback ────────────────────────────
check('quantum_physics + "double slit" (no 3D cue) → double_slit (2D fallback)',
  detectVisual({ subjectSlug: 'quantum_physics', chapterTitle: 'Double slit experiment and interference pattern' }) === 'double_slit')
check('quantum_physics + "wavefunction" → wave_function (2D)',
  detectVisual({ subjectSlug: 'quantum_physics', chapterTitle: 'The wavefunction and probability density' }) === 'wave_function')

// ── 10. computer_science (3D only, no 2D fallback) ───────────────────────────
check('computer_science + "data structure" → three_data_structure',
  detectVisual({ subjectSlug: 'computer_science', chapterTitle: 'Array and linked list data structure' }) === 'three_data_structure')
check('computer_science + "algorithm" → three_algorithm_visualization',
  detectVisual({ subjectSlug: 'computer_science', chapterTitle: 'Sorting algorithm and searching' }) === 'three_algorithm_visualization')
check('computer_science + unrecognised keyword → null',
  detectVisual({ subjectSlug: 'computer_science', chapterTitle: 'History of computing pioneers' }) === null)

// ── 11. science slug (generic) ───────────────────────────────────────────────
check('science + "water cycle" → water_cycle',
  detectVisual({ subjectSlug: 'science', chapterTitle: 'Water cycle and evaporation condensation' }) === 'water_cycle')
check('science + "solar system" → solar_system',
  detectVisual({ subjectSlug: 'science', chapterTitle: 'Solar system planets and orbit' }) === 'solar_system')
check('science + no keyword → null',
  detectVisual({ subjectSlug: 'science', chapterTitle: 'Introduction to laboratory safety' }) === null)

// ── 12. lessonTitle used in match when chapterTitle alone doesn't match ───────
check('lessonTitle contributes to match when chapterTitle alone is bare',
  detectVisual({ subjectSlug: 'mathematics', chapterTitle: 'Chapter 3', lessonTitle: 'Fraction of integers' }) === 'fraction_bar')

// ── 13. Cross-subject isolation ───────────────────────────────────────────────
// "vector" keyword only fires for mathematics (MATHEMATICS_3D_RULES),
// not for science where there is no rule matching "vector".
check('science + "vector" keyword → null (not in science rule sets)',
  detectVisual({ subjectSlug: 'science', chapterTitle: 'Introduction to vectors' }) === null)

console.log(`\n=== ${pass} passed, ${fail} failed ===\n`)
process.exit(fail === 0 ? 0 : 1)
